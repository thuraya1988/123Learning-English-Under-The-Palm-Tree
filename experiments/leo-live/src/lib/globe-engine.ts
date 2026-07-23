// GlobeEngine: imperative three.js scene for the live satellite globe.
//
// Scene frame = ECI (z = north pole). The Earth mesh rotates by GMST, so ECI
// satellite positions from SGP4 line up with the ground directly.
//
// Satellite motion: the worker supplies TWO exact SGP4 samples per interval
// (p0,v0 @ t0, p1,v1 @ t1) and the vertex shader cubic-Hermite-interpolates
// between them — curved orbits stay correct at any time warp. Interpolation
// is clamped to the sample interval, so satellites can never fly off their
// orbits along straight lines when the worker falls behind.

import * as THREE from 'three'
import * as satellite from 'satellite.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

export interface EngineCallbacks {
  getSimTime: () => number // ms epoch (simulated)
  onSelect: (index: number | null) => void
  onHover: (index: number | null, clientX: number, clientY: number) => void
  onContextLost: () => void
  onContextRestored: () => void
  /** reported ~once per second */
  onFps?: (fps: number) => void
  /** Fill `past` (t-P/2..t) and `future` (t..t+P/2) with unit ECI points. */
  orbitProvider: (
    index: number,
    simMs: number,
    past: Float32Array,
    future: Float32Array,
  ) => void
  footprintProvider: (
    index: number,
    simMs: number,
  ) => { x: number; y: number; z: number; ang: number } | null
}

interface GroupRuntime {
  points: THREE.Points
  mat: THREE.ShaderMaterial
  offset: number
  count: number
  p0: Float32Array
  v0: Float32Array
  p1: Float32Array
  v1: Float32Array
  sizes: Float32Array
}

const SAT_VERT = /* glsl */ `
attribute vec3 aV0;
attribute vec3 aP1;
attribute vec3 aV1;
attribute vec3 aColor;
attribute float aSize;
uniform float uS;    // seconds since t0 (CPU float64 -> float32)
uniform float uDur;  // interval duration in seconds
uniform float uScale;
uniform float uPixelRatio;
varying vec3 vColor;
void main() {
  float s = clamp(uS / uDur, 0.0, 1.0);
  float s2 = s * s;
  float s3 = s2 * s;
  float h00 = 2.0 * s3 - 3.0 * s2 + 1.0;
  float h10 = s3 - 2.0 * s2 + s;
  float h01 = -2.0 * s3 + 3.0 * s2;
  float h11 = s3 - s2;
  vec3 p = h00 * position + h10 * uDur * aV0 + h01 * aP1 + h11 * uDur * aV1;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float ps = aSize * uScale * uPixelRatio * (3.1 / -mv.z);
  gl_PointSize = clamp(ps, 1.0, 48.0);
}
`

const SAT_FRAG = /* glsl */ `
varying vec3 vColor;
uniform float uIntensity;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float core = smoothstep(0.30, 0.10, d);
  float halo = smoothstep(0.5, 0.12, d) * 0.5;
  vec3 col = vColor * (0.5 + uIntensity * core);
  gl_FragColor = vec4(col, max(halo, core));
}
`

const EARTH_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vPosW = wp.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

const EARTH_FRAG = /* glsl */ `
uniform sampler2D uDay;
uniform sampler2D uNight;
uniform vec3 uSunDir;
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec3 n = normalize(vNormalW);
  float sd = dot(n, uSunDir);
  float dayMix = smoothstep(-0.05, 0.15, sd);
  vec3 dayT = texture2D(uDay, vUv).rgb;
  float luma = dot(dayT, vec3(0.299, 0.587, 0.114));
  dayT = clamp(mix(vec3(luma), dayT, 1.28), 0.0, 1.0); // livelier oceans
  vec3 nightT = texture2D(uNight, vUv).rgb;
  float lit = clamp(sd * 1.1, 0.0, 1.0);
  vec3 col = dayT * lit * 0.78 + dayT * 0.02;
  col += nightT * (1.0 - dayMix) * 0.85;
  vec3 v = normalize(cameraPosition - vPosW);
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.5);
  col += vec3(0.20, 0.40, 0.72) * rim * (0.15 + 0.85 * dayMix) * 0.4;
  gl_FragColor = vec4(col, 1.0);
}
`

const ATMO_VERT = /* glsl */ `
varying vec3 vN;
void main() {
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const ATMO_FRAG = /* glsl */ `
varying vec3 vN;
void main() {
  float intensity = pow(max(0.60 - dot(normalize(vN), vec3(0.0, 0.0, 1.0)), 0.0), 4.5);
  gl_FragColor = vec4(0.30, 0.55, 1.05, 1.0) * intensity * 1.6;
}
`

const ORBIT_SIDE = 96
const FOOT_POINTS = 96
const EARTH_R_SCENE = 1.0

function makeRingTexture(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = 96
  const ctx = c.getContext('2d')!
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 7
  ctx.beginPath()
  ctx.arc(48, 48, 32, 0, Math.PI * 2)
  ctx.stroke()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class GlobeEngine {
  private container: HTMLElement
  private cb: EngineCallbacks
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private earth: THREE.Mesh
  private earthMat: THREE.ShaderMaterial
  private groups: GroupRuntime[] = []
  /** hidden replacement set during a dataset swap (old groups keep rendering) */
  private replacement: GroupRuntime[] | null = null
  private desiredVisible: boolean[] = []
  private qualityCap = 1.5
  private appliedW = 0
  private appliedH = 0
  private appliedDpr = 0
  private resizeObserver: ResizeObserver | null = null
  private raf = 0
  private hidden = false
  private contextLost = false
  private t0 = 0 // interval start, s
  private t1 = 1 // interval end, s
  private selected: number | null = null
  private hoverIdx: number | null = null
  private marker: THREE.Sprite
  private orbitPast: THREE.Line
  private orbitFuture: THREE.Line
  private pastGeo: THREE.BufferGeometry
  private futureGeo: THREE.BufferGeometry
  private footLine: THREE.Line
  private footGeo: THREE.BufferGeometry
  private showOrbit = true
  private showFoot = true
  private follow = false
  private lastOrbitReal = 0
  private lastOrbitSim = -1e15
  private lastFootReal = 0
  private disposed = false
  private tmpV = new THREE.Vector3()
  private tmpV2 = new THREE.Vector3()
  private downPos = { x: 0, y: 0 }
  private lastHoverCheck = 0
  private frameTimes: number[] = []
  private dprReduced = false
  private lastFrameT = 0
  private fpsCount = 0
  private fpsWindowStart = 0

  constructor(container: HTMLElement, cb: EngineCallbacks) {
    this.container = container
    this.cb = cb

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setClearColor(0x04060a, 1)
    container.appendChild(this.renderer.domElement)

    const initW = Math.max(1, container.clientWidth)
    const initH = Math.max(1, container.clientHeight)
    this.camera = new THREE.PerspectiveCamera(42, initW / initH, 0.05, 400)
    this.camera.up.set(0, 0, 1)
    // large, dominant Earth; lower edge may bleed off the viewport
    this.camera.position.set(1.0, -2.75, 1.35)
    this.applyViewOffset()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.minDistance = 1.35
    this.controls.maxDistance = 30
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.25

    // --- Earth ---
    const loader = new THREE.TextureLoader()
    const dayTex = loader.load(`${import.meta.env.BASE_URL}textures/earth-day.jpg`)
    const nightTex = loader.load(`${import.meta.env.BASE_URL}textures/earth-night.jpg`)
    dayTex.colorSpace = THREE.SRGBColorSpace
    nightTex.colorSpace = THREE.SRGBColorSpace
    dayTex.anisotropy = 4
    nightTex.anisotropy = 4

    const geo = new THREE.SphereGeometry(1, 96, 96)
    geo.rotateX(Math.PI / 2) // poles -> +z, lon0 -> +x
    this.earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uDay: { value: dayTex },
        uNight: { value: nightTex },
        uSunDir: { value: new THREE.Vector3(1, 0, 0) },
      },
      vertexShader: EARTH_VERT,
      fragmentShader: EARTH_FRAG,
    })
    this.earth = new THREE.Mesh(geo, this.earthMat)
    this.scene.add(this.earth)

    // --- narrow atmospheric rim (may bloom; Earth must not) ---
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.09, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    )
    this.scene.add(atmo)

    this.scene.add(this.makeStars())

    // --- selection marker ---
    this.marker = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeRingTexture(),
        color: 0xffffff,
        transparent: true,
        depthWrite: false,
      }),
    )
    this.marker.scale.setScalar(0.05)
    this.marker.visible = false
    this.scene.add(this.marker)

    // --- orbit path: past (red) + future (blue) ---
    this.pastGeo = new THREE.BufferGeometry()
    this.pastGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(ORBIT_SIDE * 3), 3),
    )
    this.pastGeo.setDrawRange(0, 0)
    this.orbitPast = new THREE.Line(
      this.pastGeo,
      new THREE.LineBasicMaterial({
        color: 0xff6b6b,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.orbitPast.frustumCulled = false
    this.scene.add(this.orbitPast)

    this.futureGeo = new THREE.BufferGeometry()
    this.futureGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(ORBIT_SIDE * 3), 3),
    )
    this.futureGeo.setDrawRange(0, 0)
    this.orbitFuture = new THREE.Line(
      this.futureGeo,
      new THREE.LineBasicMaterial({
        color: 0x63b3ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.orbitFuture.frustumCulled = false
    this.scene.add(this.orbitFuture)

    // --- ground footprint circle ---
    this.footGeo = new THREE.BufferGeometry()
    this.footGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array((FOOT_POINTS + 1) * 3), 3),
    )
    this.footGeo.setDrawRange(0, 0)
    this.footLine = new THREE.Line(
      this.footGeo,
      new THREE.LineBasicMaterial({
        color: 0x9fd8ff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true, // occluded on the far side
      }),
    )
    this.footLine.frustumCulled = false
    this.scene.add(this.footLine)

    // --- selective bloom: threshold 1.0 keeps Earth/stars out of the glow ---
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(initW, initH), 0.55, 0.35, 1.0)
    this.composer.addPass(this.bloom)
    this.composer.addPass(new OutputPass())
    this.applySize()

    // --- events ---
    const el = this.renderer.domElement
    el.addEventListener('pointerdown', this.onPointerDown)
    el.addEventListener('pointerup', this.onPointerUp)
    el.addEventListener('pointermove', this.onPointerMove)
    el.addEventListener('webglcontextlost', this.onContextLost, false)
    el.addEventListener('webglcontextrestored', this.onContextRestored, false)
    // the container may resize without a window resize event
    this.resizeObserver = new ResizeObserver(() => this.applySize())
    this.resizeObserver.observe(container)
    document.addEventListener('visibilitychange', this.onVisibility)

    this.loop()
  }

  private makeStars(): THREE.Points {
    const N = 1400
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      let x = Math.random() * 2 - 1
      let y = Math.random() * 2 - 1
      let z = Math.random() * 2 - 1
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      const r = 60 + Math.random() * 120
      x = (x / len) * r
      y = (y / len) * r
      z = (z / len) * r
      pos.set([x, y, z], i * 3)
      const b = 0.2 + Math.random() * 0.45 // sparse and restrained, under bloom threshold
      col.set([b, b, Math.min(0.8, b + 0.1)], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const m = new THREE.PointsMaterial({
      size: 1.0,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    })
    const p = new THREE.Points(g, m)
    p.frustumCulled = false
    return p
  }

  /** Shift Earth right of center on wide layouts to make room for the panel. */
  private applyViewOffset() {
    const w = Math.max(1, this.container.clientWidth)
    const h = Math.max(1, this.container.clientHeight)
    if (w >= 1024 && w > h) {
      // shift Earth right and slightly down, keeping it clear of the HUD
      this.camera.setViewOffset(
        w,
        h,
        -Math.round(w * 0.09),
        -Math.round(h * 0.05),
        w,
        h,
      )
    } else {
      this.camera.clearViewOffset()
    }
  }

  /**
   * Pixel-budget DPR control: a 4K/high-DPI viewport with EffectComposer +
   * bloom can otherwise allocate several hundred MB of framebuffers and lose
   * the WebGL context on integrated GPUs.
   */
  private computeDpr(w: number, h: number): number {
    const pixelBudgetDpr = Math.sqrt(5_000_000 / (w * h))
    return Math.max(
      0.5,
      Math.min(window.devicePixelRatio || 1, this.qualityCap, pixelBudgetDpr),
    )
  }

  /** Apply container size + DPR; a no-op when neither actually changed. */
  private applySize = () => {
    const w = Math.max(1, this.container.clientWidth)
    const h = Math.max(1, this.container.clientHeight)
    const dpr = this.computeDpr(w, h)
    if (w === this.appliedW && h === this.appliedH && dpr === this.appliedDpr) return
    this.appliedW = w
    this.appliedH = h
    this.appliedDpr = dpr
    this.camera.aspect = w / h
    this.applyViewOffset()
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h)
    this.composer.setPixelRatio(dpr)
    this.composer.setSize(w, h)
    for (const g of this.groups) g.mat.uniforms.uPixelRatio.value = dpr
    if (this.replacement) {
      for (const g of this.replacement) g.mat.uniforms.uPixelRatio.value = dpr
    }
  }

  /** Track set currently receiving propagation buffers. */
  private newestGroups(): GroupRuntime[] {
    return this.replacement ?? this.groups
  }

  private disposeGroups(list: GroupRuntime[]) {
    for (const g of list) {
      this.scene.remove(g.points)
      g.points.geometry.dispose()
      g.mat.dispose()
    }
  }

  /**
   * Atomic dataset replacement: the old groups (retiredGroups) stay visible
   * while the replacement is built HIDDEN and its worker warms up. Only when
   * the replacement's first valid interval arrives does `revealReplacement`
   * swap visibility — satellites never disappear during a data upgrade.
   */
  buildSatellites(defs: { color: string; size: number; count: number }[]) {
    // discard a previous never-revealed replacement, keep the visible set
    if (this.replacement) {
      this.disposeGroups(this.replacement)
      this.replacement = null
    }
    const list: GroupRuntime[] = []
    let offset = 0
    for (const def of defs) {
      const n = Math.max(def.count, 1)
      const geo = new THREE.BufferGeometry()
      const p0 = new Float32Array(n * 3)
      const v0 = new Float32Array(n * 3)
      const p1 = new Float32Array(n * 3)
      const v1 = new Float32Array(n * 3)
      const col = new Float32Array(n * 3)
      const siz = new Float32Array(n)
      const c = new THREE.Color(def.color)
      for (let i = 0; i < n; i++) {
        col.set([c.r, c.g, c.b], i * 3)
        siz[i] = def.size
      }
      geo.setAttribute('position', new THREE.BufferAttribute(p0, 3))
      geo.setAttribute('aV0', new THREE.BufferAttribute(v0, 3))
      geo.setAttribute('aP1', new THREE.BufferAttribute(p1, 3))
      geo.setAttribute('aV1', new THREE.BufferAttribute(v1, 3))
      geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(siz, 1))
      const mat = new THREE.ShaderMaterial({
        vertexShader: SAT_VERT,
        fragmentShader: SAT_FRAG,
        uniforms: {
          uS: { value: 0 },
          uDur: { value: 1 },
          uScale: { value: 1 },
          uPixelRatio: { value: this.appliedDpr || 1 },
          uIntensity: { value: 2.1 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true, // Earth hides far-side satellites
      })
      const points = new THREE.Points(geo, mat)
      points.frustumCulled = false
      points.visible = false // hidden until first valid interval arrives
      this.scene.add(points)
      list.push({
        points,
        mat,
        offset,
        count: def.count,
        p0,
        v0,
        p1,
        v1,
        sizes: siz,
      })
      offset += def.count
    }
    this.replacement = list
  }

  /** Swap the hidden replacement in and dispose of the retired groups. */
  revealReplacement() {
    if (!this.replacement) return
    const retired = this.groups
    this.groups = this.replacement
    this.replacement = null
    // restore each group's enabled/disabled state
    for (let i = 0; i < this.groups.length; i++) {
      this.groups[i].points.visible = this.desiredVisible[i] !== false
    }
    this.disposeGroups(retired)
  }

  setGroupVisible(i: number, v: boolean) {
    this.desiredVisible[i] = v
    if (this.groups[i] && !this.replacement) this.groups[i].points.visible = v
  }

  /** Receive a new two-sample SGP4 interval (flat arrays across all groups). */
  updateInterval(
    t0Ms: number,
    t1Ms: number,
    p0: Float32Array,
    v0: Float32Array,
    p1: Float32Array,
    v1: Float32Array,
  ) {
    for (const g of this.newestGroups()) {
      const o = g.offset * 3
      const n = g.count * 3
      g.p0.set(p0.subarray(o, o + n))
      g.v0.set(v0.subarray(o, o + n))
      g.p1.set(p1.subarray(o, o + n))
      g.v1.set(v1.subarray(o, o + n))
      const at = g.points.geometry.attributes
      ;(at.position as THREE.BufferAttribute).needsUpdate = true
      ;(at.aV0 as THREE.BufferAttribute).needsUpdate = true
      ;(at.aP1 as THREE.BufferAttribute).needsUpdate = true
      ;(at.aV1 as THREE.BufferAttribute).needsUpdate = true
      g.mat.uniforms.uDur.value = Math.max((t1Ms - t0Ms) / 1000, 0.001)
    }
    this.t0 = t0Ms / 1000
    this.t1 = t1Ms / 1000
  }

  setShowOrbit(v: boolean) {
    this.showOrbit = v
    this.orbitPast.visible = v && this.selected !== null
    this.orbitFuture.visible = v && this.selected !== null
    this.lastOrbitSim = -1e15
  }

  setShowFootprint(v: boolean) {
    this.showFoot = v
    this.footLine.visible = v && this.selected !== null
  }

  setFollow(v: boolean) {
    this.follow = v
  }

  setSelected(index: number | null, color?: string) {
    this.selected = index
    this.marker.visible = index !== null
    if (color) this.marker.material.color.set(color)
    this.orbitPast.visible = index !== null && this.showOrbit
    this.orbitFuture.visible = index !== null && this.showOrbit
    this.footLine.visible = index !== null && this.showFoot
    this.lastOrbitSim = -1e15
    if (index === null) {
      this.pastGeo.setDrawRange(0, 0)
      this.futureGeo.setDrawRange(0, 0)
      this.footGeo.setDrawRange(0, 0)
      this.controls.target.set(0, 0, 0)
    }
  }

  /** Zero the size of satellites that failed to propagate (dead/decayed). */
  markDead(globalIndices: number[]) {
    for (const g of this.groups) {
      const attr = g.points.geometry.getAttribute('aSize') as THREE.BufferAttribute
      let dirty = false
      for (const idx of globalIndices) {
        if (idx >= g.offset && idx < g.offset + g.count) {
          attr.setX(idx - g.offset, 0)
          g.sizes[idx - g.offset] = 0
          dirty = true
        }
      }
      if (dirty) attr.needsUpdate = true
    }
  }

  /** Current interpolated ECI position of a satellite (unit space). */
  eciPosition(index: number, out: THREE.Vector3): THREE.Vector3 | null {
    const simS = this.cb.getSimTime() / 1000
    const dur = Math.max(this.t1 - this.t0, 0.001)
    const s = Math.min(Math.max((simS - this.t0) / dur, 0), 1)
    const s2 = s * s
    const s3 = s2 * s
    const h00 = 2 * s3 - 3 * s2 + 1
    const h10 = s3 - 2 * s2 + s
    const h01 = -2 * s3 + 3 * s2
    const h11 = s3 - s2
    for (const g of this.groups) {
      if (index >= g.offset && index < g.offset + g.count) {
        const i = (index - g.offset) * 3
        out.set(
          h00 * g.p0[i] + h10 * dur * g.v0[i] + h01 * g.p1[i] + h11 * dur * g.v1[i],
          h00 * g.p0[i + 1] + h10 * dur * g.v0[i + 1] + h01 * g.p1[i + 1] + h11 * dur * g.v1[i + 1],
          h00 * g.p0[i + 2] + h10 * dur * g.v0[i + 2] + h01 * g.p1[i + 2] + h11 * dur * g.v1[i + 2],
        )
        return out
      }
    }
    return null
  }

  /** Segment camera->satellite versus Earth sphere. */
  private isOccluded(p: THREE.Vector3): boolean {
    const c = this.camera.position
    // visible hemisphere test
    if (p.dot(this.tmpV2.copy(c).normalize()) < -0.05) {
      // still might be visible near the limb; fall through to precise test
    }
    const dx = p.x - c.x
    const dy = p.y - c.y
    const dz = p.z - c.z
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
    if (len < 1e-6) return false
    const b = (c.x * dx + c.y * dy + c.z * dz) / len // C . dir
    const cc = c.x * c.x + c.y * c.y + c.z * c.z - EARTH_R_SCENE * EARTH_R_SCENE
    const disc = b * b - cc
    if (disc <= 0) return false
    const t = -b - Math.sqrt(disc)
    return t > 0 && t < len - 1e-3
  }

  /** Nearest selectable satellite to a screen point (client coords). */
  private pick(clientX: number, clientY: number, thresholdPx: number): number | null {
    // during a dataset swap the visible groups use the old index space —
    // skip picking for that brief window rather than select the wrong object
    if (this.replacement) return null
    const rect = this.renderer.domElement.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const v = this.tmpV
    let best: number | null = null
    let bestD = thresholdPx
    for (const g of this.groups) {
      if (!g.points.visible) continue
      for (let i = 0; i < g.count; i++) {
        if (g.sizes[i] === 0) continue // dead/decayed
        const idx = this.eciPosition(g.offset + i, v)
        if (!idx) continue
        if (v.lengthSq() < 1) continue // inside Earth
        v.project(this.camera)
        if (v.z > 1) continue
        const sx = (v.x * 0.5 + 0.5) * rect.width
        const sy = (-v.y * 0.5 + 0.5) * rect.height
        if (sx < -20 || sx > rect.width + 20 || sy < -20 || sy > rect.height + 20) continue
        const d = Math.hypot(sx - x, sy - y)
        if (d < bestD) {
          // precise occlusion check only for the current best candidate
          this.eciPosition(g.offset + i, v)
          if (this.isOccluded(v)) continue
          bestD = d
          best = g.offset + i
        }
      }
    }
    return best
  }

  private onPointerDown = (e: PointerEvent) => {
    this.downPos = { x: e.clientX, y: e.clientY }
    this.controls.autoRotate = false
  }

  private onPointerUp = (e: PointerEvent) => {
    const moved = Math.hypot(e.clientX - this.downPos.x, e.clientY - this.downPos.y)
    if (moved > 5) return // globe drag — never a selection
    const idx = this.pick(e.clientX, e.clientY, 12)
    this.cb.onSelect(idx)
  }

  private onPointerMove = (e: PointerEvent) => {
    const now = performance.now()
    if (now - this.lastHoverCheck < 120) return
    this.lastHoverCheck = now
    const idx = this.pick(e.clientX, e.clientY, 8)
    if (idx !== this.hoverIdx) {
      this.hoverIdx = idx
      this.renderer.domElement.style.cursor = idx !== null ? 'pointer' : 'grab'
    }
    this.cb.onHover(idx, e.clientX, e.clientY)
  }

  private onContextLost = (e: Event) => {
    e.preventDefault()
    this.contextLost = true
    cancelAnimationFrame(this.raf)
    this.cb.onContextLost()
  }

  private onContextRestored = () => {
    this.contextLost = false
    this.cb.onContextRestored()
    this.loop()
  }

  private onVisibility = () => {
    this.hidden = document.hidden
    if (!this.hidden && !this.contextLost && !this.disposed) {
      cancelAnimationFrame(this.raf)
      this.loop()
    }
  }

  private updateSun(simMs: number) {
    const jd = satellite.jday(new Date(simMs))
    const sun = satellite.sunPos(jd).rsun
    const len = Math.sqrt(sun.x * sun.x + sun.y * sun.y + sun.z * sun.z) || 1
    ;(this.earthMat.uniforms.uSunDir.value as THREE.Vector3).set(
      sun.x / len,
      sun.y / len,
      sun.z / len,
    )
  }

  /** FPS meter + quality cap reduction if the device cannot keep up. */
  private monitorPerf(now: number) {
    // fps meter, reported ~once per second
    this.fpsCount++
    if (this.fpsWindowStart === 0) this.fpsWindowStart = now
    const windowMs = now - this.fpsWindowStart
    if (windowMs >= 1000) {
      this.cb.onFps?.(Math.round((this.fpsCount * 1000) / windowMs))
      this.fpsCount = 0
      this.fpsWindowStart = now
    }
    if (this.dprReduced) return
    if (this.lastFrameT) this.frameTimes.push(now - this.lastFrameT)
    if (this.frameTimes.length >= 120) {
      const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      this.frameTimes.length = 0
      if (avg > 40 && this.qualityCap > 1) {
        this.dprReduced = true
        this.qualityCap = 1
        this.applySize()
      }
    }
    this.lastFrameT = now
  }

  private loop = () => {
    if (this.disposed || this.contextLost) return
    if (this.hidden) return // paused while the tab is hidden
    this.raf = requestAnimationFrame(this.loop)
    const simMs = this.cb.getSimTime()
    const simS = simMs / 1000

    this.earth.rotation.z = satellite.gstime(new Date(simMs))
    this.updateSun(simMs)

    const uS = Math.min(Math.max(simS - this.t0, 0), Math.max(this.t1 - this.t0, 0.001))
    for (const g of this.groups) g.mat.uniforms.uS.value = uS

    if (this.selected !== null) {
      const p = this.eciPosition(this.selected, this.tmpV)
      if (p) {
        this.marker.position.copy(p)
        const pulse = 0.045 + 0.01 * Math.sin(performance.now() * 0.005)
        this.marker.scale.setScalar(pulse)
        if (this.follow) this.controls.target.lerp(p, 0.25)
      }
      const nowReal = performance.now()
      if (
        this.showOrbit &&
        nowReal - this.lastOrbitReal > 400 &&
        Math.abs(simMs - this.lastOrbitSim) > 6000
      ) {
        const pa = this.pastGeo.getAttribute('position') as THREE.BufferAttribute
        const fu = this.futureGeo.getAttribute('position') as THREE.BufferAttribute
        this.cb.orbitProvider(
          this.selected,
          simMs,
          pa.array as Float32Array,
          fu.array as Float32Array,
        )
        this.pastGeo.setDrawRange(0, ORBIT_SIDE)
        this.futureGeo.setDrawRange(0, ORBIT_SIDE)
        pa.needsUpdate = true
        fu.needsUpdate = true
        this.lastOrbitReal = nowReal
        this.lastOrbitSim = simMs
      }
      if (this.showFoot && nowReal - this.lastFootReal > 250) {
        this.lastFootReal = nowReal
        const f = this.cb.footprintProvider(this.selected, simMs)
        if (f) {
          const attr = this.footGeo.getAttribute('position') as THREE.BufferAttribute
          const arr = attr.array as Float32Array
          const c = new THREE.Vector3(f.x, f.y, f.z).normalize()
          const up = Math.abs(c.z) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1)
          const t1v = new THREE.Vector3().crossVectors(c, up).normalize()
          const t2v = new THREE.Vector3().crossVectors(c, t1v).normalize()
          const R = 1.0028
          const cosA = Math.cos(f.ang)
          const sinA = Math.sin(f.ang)
          for (let i = 0; i <= FOOT_POINTS; i++) {
            const a = (i / FOOT_POINTS) * Math.PI * 2
            const dx = Math.cos(a) * sinA
            const dy = Math.sin(a) * sinA
            arr.set(
              [
                (c.x * cosA + t1v.x * dx + t2v.x * dy) * R,
                (c.y * cosA + t1v.y * dx + t2v.y * dy) * R,
                (c.z * cosA + t1v.z * dx + t2v.z * dy) * R,
              ],
              i * 3,
            )
          }
          this.footGeo.setDrawRange(0, FOOT_POINTS + 1)
          attr.needsUpdate = true
        } else {
          this.footGeo.setDrawRange(0, 0)
        }
      }
    }

    this.controls.update()
    this.composer.render()
    this.monitorPerf(performance.now())
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    const el = this.renderer.domElement
    el.removeEventListener('pointerdown', this.onPointerDown)
    el.removeEventListener('pointerup', this.onPointerUp)
    el.removeEventListener('pointermove', this.onPointerMove)
    el.removeEventListener('webglcontextlost', this.onContextLost)
    el.removeEventListener('webglcontextrestored', this.onContextRestored)
    this.resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.controls.dispose()
    this.disposeGroups(this.groups)
    if (this.replacement) this.disposeGroups(this.replacement)
    this.groups = []
    this.replacement = null
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line || obj instanceof THREE.Sprite) {
        obj.geometry?.dispose()
        const mat = obj.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else if (mat) {
          const withMap = mat as THREE.Material & { map?: THREE.Texture }
          withMap.map?.dispose()
          mat.dispose()
        }
      }
    })
    for (const pass of this.composer.passes) {
      ;(pass as { dispose?: () => void }).dispose?.()
    }
    this.composer.dispose()
    this.renderer.dispose()
    el.remove()
  }
}
