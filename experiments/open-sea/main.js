import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import {
  Fn, pass, uniform, float, vec2, vec3, vec4,
  sin, cos, dot, cross, normalize, mix, pow, max, clamp,
  fract, floor, smoothstep, distance, reflect,
  positionLocal, positionWorld, cameraPosition
} from 'three/tsl';

/* ============================================================
   DOM references
   ============================================================ */
const loaderEl = document.getElementById('loader');
const loaderTitleEl = document.getElementById('loaderTitle');
const loaderStatusEl = document.getElementById('loaderStatus');
const loaderBarEl = document.getElementById('loaderBar');
const uiEl = document.getElementById('ui');
const seaSlider = document.getElementById('seaState');
const seaValueEl = document.getElementById('seaValue');
const timeSlider = document.getElementById('timeOfDay');
const timeLabelEl = document.getElementById('timeLabel');
const driftBtn = document.getElementById('drift');
const fpsEl = document.getElementById('fps');

/* ============================================================
   Uniforms — shared by ocean and sky so both always agree
   ============================================================ */
const timeUniform = uniform(0);
const seaUniform = uniform(0.25 + (Number(seaSlider.value) / 100) * 1.5);
const sunDirUniform = uniform(new THREE.Vector3(0, 1, 0));
const sunColorUniform = uniform(new THREE.Color(1, 1, 1));
const horizonColorUniform = uniform(new THREE.Color(0.52, 0.68, 0.82));
const zenithColorUniform = uniform(new THREE.Color(0.07, 0.2, 0.42));
const deepColorUniform = uniform(new THREE.Color(0.015, 0.09, 0.11));
const shallowColorUniform = uniform(new THREE.Color(0.06, 0.32, 0.36));

/* ============================================================
   Gerstner swell — five directional components, constants
   precomputed on the CPU once
   ============================================================ */
const WAVE_PARAMS = [
  { dir: [1.0, 0.0], wavelength: 60.0, steepness: 0.12 },
  { dir: [0.6, 0.8], wavelength: 31.0, steepness: 0.12 },
  { dir: [-0.7, 0.7], wavelength: 18.0, steepness: 0.09 },
  { dir: [0.3, -0.95], wavelength: 9.5, steepness: 0.07 },
  { dir: [-0.35, -0.94], wavelength: 5.0, steepness: 0.05 }
];

const WAVES = WAVE_PARAMS.map(({ dir, wavelength, steepness }) => {
  const len = Math.hypot(dir[0], dir[1]);
  const k = (2 * Math.PI) / wavelength;   // wave number
  return {
    dx: dir[0] / len,
    dz: dir[1] / len,
    k,
    c: Math.sqrt(9.8 * k),                // angular propagation term
    steepness
  };
});

// phase: f = k * (dot(direction, xz) - time * c)
const wavePhase = (w, xz, time) =>
  float(w.k).mul(dot(vec2(w.dx, w.dz), xz).sub(time.mul(w.c)));

// displaced surface point for a given parametric xz
const wavePosition = Fn(([xz, time, sea]) => {
  const p = vec3(xz.x, 0.0, xz.y).toVar();
  for (const w of WAVES) {
    const a = float(w.steepness).mul(sea).div(w.k); // amplitude = steepness / k
    const f = wavePhase(w, xz, time);
    p.x.addAssign(a.mul(w.dx).mul(cos(f)));
    p.y.addAssign(a.mul(sin(f)));
    p.z.addAssign(a.mul(w.dz).mul(cos(f)));
  }
  return p;
});

// analytic tangent/binormal derivatives — stable broad normals, no dFdx
const waveNormal = Fn(([xz, time, sea]) => {
  const tangent = vec3(1.0, 0.0, 0.0).toVar();
  const binormal = vec3(0.0, 0.0, 1.0).toVar();
  for (const w of WAVES) {
    const q = float(w.steepness).mul(sea); // q = steepness * sea = a * k
    const f = wavePhase(w, xz, time);
    const s = sin(f);
    const co = cos(f);
    tangent.x.subAssign(q.mul(w.dx * w.dx).mul(s));
    tangent.y.addAssign(q.mul(w.dx).mul(co));
    tangent.z.subAssign(q.mul(w.dx * w.dz).mul(s));
    binormal.x.subAssign(q.mul(w.dx * w.dz).mul(s));
    binormal.y.addAssign(q.mul(w.dz).mul(co));
    binormal.z.subAssign(q.mul(w.dz * w.dz).mul(s));
  }
  return normalize(cross(binormal, tangent));
});

// signed crest height, drives tint / subsurface / foam
const waveCrest = Fn(([xz, time, sea]) => {
  const h = float(0.0).toVar();
  for (const w of WAVES) {
    const a = float(w.steepness).mul(sea).div(w.k);
    h.addAssign(a.mul(sin(wavePhase(w, xz, time))));
  }
  return h;
});

/* ============================================================
   Procedural gradient noise + 3-octave FBM
   ============================================================ */
const hash2 = Fn(([p]) => {
  const h = vec2(
    dot(p, vec2(127.1, 311.7)),
    dot(p, vec2(269.5, 183.3))
  );
  return fract(sin(h).mul(43758.5453)).mul(2.0).sub(1.0);
});

const gradNoise = Fn(([p]) => {
  const i = floor(p);
  const f = fract(p);
  // quintic interpolation curve f^3 * (f * (f * 6 - 15) + 10)
  const u = f.mul(f).mul(f.mul(f.mul(6.0).sub(15.0)).add(10.0));
  const n00 = dot(hash2(i), f);
  const n10 = dot(hash2(i.add(vec2(1.0, 0.0))), f.sub(vec2(1.0, 0.0)));
  const n01 = dot(hash2(i.add(vec2(0.0, 1.0))), f.sub(vec2(0.0, 1.0)));
  const n11 = dot(hash2(i.add(vec2(1.0, 1.0))), f.sub(vec2(1.0, 1.0)));
  return mix(mix(n00, n10, u.x), mix(n01, n11, u.x), u.y);
});

const fbm = Fn(([p]) =>
  gradNoise(p)
    .add(gradNoise(p.mul(2.04).add(vec2(17.3, 9.1))).mul(0.5))
    .add(gradNoise(p.mul(4.11).add(vec2(42.7, 28.6))).mul(0.25))
);

// animated capillary-scale detail height field
const detailHeight = Fn(([xz, time]) => {
  const driftA = vec2(time.mul(0.55), time.mul(0.32));
  const driftB = vec2(time.mul(-0.4), time.mul(0.5));
  return fbm(xz.mul(0.85).add(driftA)).add(fbm(xz.mul(2.1).add(driftB)).mul(0.45));
});

/* ============================================================
   Shared analytic sky — used by the dome AND water reflection
   ============================================================ */
const skyColor = Fn(([rawDir]) => {
  const dir = normalize(rawDir).toVar();
  const up = clamp(dir.y, -0.15, 1.0);
  const sky = mix(horizonColorUniform, zenithColorUniform, pow(max(up, 0.0), 0.42)).toVar();

  // below-horizon haze so reflections never hit black
  const hazeColor = deepColorUniform.mul(1.4).add(horizonColorUniform.mul(0.25));
  sky.assign(mix(sky, hazeColor, smoothstep(-0.15, 0.0, dir.y).oneMinus()));

  const s = max(dot(dir, sunDirUniform), 0.0);
  sky.addAssign(sunColorUniform.mul(pow(s, 10.0)).mul(0.18));                 // wide halo
  sky.addAssign(sunColorUniform.mul(smoothstep(0.9994, 0.9998, s)).mul(30.0)); // sun disk
  return sky;
});

/* ============================================================
   Ocean material — MeshBasicNodeMaterial, all lighting manual
   ============================================================ */
const oceanMaterial = new THREE.MeshBasicNodeMaterial();
oceanMaterial.positionNode = wavePosition(positionLocal.xz, timeUniform, seaUniform);
oceanMaterial.colorNode = Fn(() => {
  const P = positionWorld.toVar();
  const xz = P.xz;

  // broad analytic normal + finite-difference FBM detail normal
  const n0 = waveNormal(xz, timeUniform, seaUniform);
  const h0 = detailHeight(xz, timeUniform);
  const hx = detailHeight(xz.add(vec2(0.1, 0.0)), timeUniform);
  const hz = detailHeight(xz.add(vec2(0.0, 0.1)), timeUniform);
  const detail = vec3(h0.sub(hx), 0.0, h0.sub(hz))
    .mul(float(1.5).mul(seaUniform.mul(0.6).add(0.4)));
  const N = normalize(n0.add(detail)).toVar();

  const V = normalize(cameraPosition.sub(P)).toVar();
  const crest = waveCrest(xz, timeUniform, seaUniform).toVar();

  // body color, plus backlit subsurface crest glow before the fresnel mix
  const body = mix(
    deepColorUniform,
    shallowColorUniform,
    clamp(crest.mul(0.35).add(0.45), 0.0, 1.0)
  ).toVar();
  const sss = pow(max(dot(V, sunDirUniform), 0.0), 3.0).mul(max(crest, 0.0)).mul(0.18);
  body.addAssign(mix(shallowColorUniform, sunColorUniform, 0.5).mul(sss));

  // sky reflection, ray clamped just above the horizon
  const R = reflect(V.negate(), N).toVar();
  R.y.assign(max(R.y, 0.04));
  R.assign(normalize(R));

  // Schlick fresnel
  const fresnel = float(0.02).add(
    float(0.98).mul(pow(max(dot(N, V), 0.0).oneMinus(), 5.0))
  );
  const color = mix(body, skyColor(R), fresnel).toVar();

  // sun specular: tight noise-broken glitter + broad sheen
  const H = normalize(sunDirUniform.add(V));
  const glitterNoise = fbm(xz.mul(2.1).add(vec2(timeUniform.mul(-0.4), timeUniform.mul(0.5))))
    .mul(0.5).add(0.5);
  const glitter = pow(max(dot(N, H), 0.0), 500.0).mul(mix(0.4, 3.4, glitterNoise));
  const sheen = pow(max(dot(N, H), 0.0), 48.0).mul(0.12);
  color.addAssign(sunColorUniform.mul(glitter.add(sheen)));

  // sparse broken foam on high crests
  const foamNoise = fbm(xz.mul(1.1).add(vec2(timeUniform.mul(0.22), timeUniform.mul(0.14))))
    .mul(0.5).add(0.5);
  const foam = smoothstep(0.5, 0.95, foamNoise).mul(smoothstep(1.0, 2.0, crest));
  color.assign(mix(color, vec3(0.82, 0.88, 0.9), clamp(foam.mul(0.85), 0.0, 1.0)));

  // atmospheric concealment of the finite plane edge
  const camDist = distance(cameraPosition, P);
  color.assign(mix(color, horizonColorUniform, smoothstep(150.0, 290.0, camDist)));

  return vec4(color, 1.0);
})();

/* ============================================================
   Sky dome material — same sky function + horizon cloud band
   ============================================================ */
const skyMaterial = new THREE.MeshBasicNodeMaterial();
skyMaterial.side = THREE.BackSide;
skyMaterial.depthWrite = false;
skyMaterial.colorNode = Fn(() => {
  const dir = normalize(positionWorld).toVar();
  const color = skyColor(dir).toVar();

  // procedural clouds confined to a low band near the horizon
  const band = smoothstep(0.03, 0.16, dir.y)
    .mul(smoothstep(0.22, 0.6, dir.y).oneMinus());
  const cloudUV = dir.xz.div(dir.y.add(0.18)).mul(0.55);
  const cloudDrift = vec2(timeUniform.mul(0.006), timeUniform.mul(0.003));
  const cloudNoise = fbm(cloudUV.add(cloudDrift)).mul(0.5).add(0.5);
  const clouds = smoothstep(0.62, 0.95, cloudNoise).mul(band);
  const cloudColor = mix(vec3(0.92, 0.9, 0.87), sunColorUniform, 0.25);
  color.assign(mix(color, cloudColor, clamp(clouds.mul(0.6), 0.0, 1.0)));

  return vec4(color, 1.0);
})();

/* ============================================================
   Time-of-day palettes
   ============================================================ */
const DAY = {
  zenith: [0.07, 0.2, 0.42],
  horizon: [0.52, 0.68, 0.82],
  sun: [1.0, 0.93, 0.8],
  intensity: 1.6,
  deep: [0.015, 0.09, 0.11],
  shallow: [0.06, 0.32, 0.36]
};
const DUSK = {
  zenith: [0.03, 0.05, 0.16],
  horizon: [0.85, 0.36, 0.16],
  sun: [1.0, 0.42, 0.14],
  intensity: 2.6,
  deep: [0.02, 0.045, 0.075],
  shallow: [0.09, 0.15, 0.2]
};

const lerp = (a, b, t) => a + (b - a) * t;
const mixRGB = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const smoothstepJS = (e0, e1, x) => {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
};

function applyTimeOfDay(t) {
  const elevation = lerp(-0.05, 0.62, t);
  const azimuth = lerp(-0.9, 0.9, t);
  const ce = Math.cos(elevation);
  sunDirUniform.value.set(
    ce * Math.sin(azimuth),
    Math.sin(elevation),
    -ce * Math.cos(azimuth)
  );

  // daylight blend: 0 at/below the horizon, 1 once the sun is high
  const w = smoothstepJS(0.0, 0.42, elevation);
  zenithColorUniform.value.setRGB(...mixRGB(DUSK.zenith, DAY.zenith, w));
  horizonColorUniform.value.setRGB(...mixRGB(DUSK.horizon, DAY.horizon, w));
  deepColorUniform.value.setRGB(...mixRGB(DUSK.deep, DAY.deep, w));
  shallowColorUniform.value.setRGB(...mixRGB(DUSK.shallow, DAY.shallow, w));
  const sunBase = mixRGB(DUSK.sun, DAY.sun, w);
  const intensity = lerp(DUSK.intensity, DAY.intensity, w);
  sunColorUniform.value.setRGB(
    sunBase[0] * intensity,
    sunBase[1] * intensity,
    sunBase[2] * intensity
  );

  timeLabelEl.textContent =
    t < 0.12 ? 'Dusk' : t < 0.3 ? 'Golden Hour' : t < 0.62 ? 'Afternoon' : 'Midday';
}

function applySeaState(v) {
  seaUniform.value = 0.25 + (v / 100) * 1.5;
  seaValueEl.textContent = v;
}

/* ============================================================
   Scene setup
   ============================================================ */
let renderer, scene, camera, controls, postProcessing;
let revealed = false;
let prevTime = 0;
let fpsAccum = 0;
let fpsFrames = 0;

async function init() {
  renderer = new THREE.WebGPURenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#05070a');

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.5,
    8000
  );
  camera.position.set(0, 5.5, 17);

  const oceanGeometry = new THREE.PlaneGeometry(420, 420, 440, 440);
  oceanGeometry.rotateX(-Math.PI / 2);
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.frustumCulled = false; // vertex displacement must never cull the mesh
  scene.add(ocean);

  const sky = new THREE.Mesh(new THREE.SphereGeometry(4000, 48, 24), skyMaterial);
  sky.renderOrder = -1;
  sky.frustumCulled = false;
  scene.add(sky);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4;
  controls.maxDistance = 120;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI * 0.495; // never dip below the sea
  controls.target.set(0, 1.5, 0);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.25;

  // post chain: scene pass + TSL bloom
  postProcessing = new THREE.PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode('output');
  postProcessing.outputNode = sceneColor.add(bloom(sceneColor, 0.4, 0.3, 0.9));

  await renderer.init();

  applySeaState(Number(seaSlider.value));
  applyTimeOfDay(Number(timeSlider.value) / 100);
  bindUI();

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);

  prevTime = performance.now();
  renderer.setAnimationLoop(frame);
}

/* ============================================================
   UI bindings — uniforms only, nothing is ever rebuilt
   ============================================================ */
function bindUI() {
  seaSlider.addEventListener('input', () => applySeaState(Number(seaSlider.value)));
  timeSlider.addEventListener('input', () => applyTimeOfDay(Number(timeSlider.value) / 100));
  driftBtn.addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    driftBtn.classList.toggle('active', controls.autoRotate);
    driftBtn.setAttribute('aria-pressed', String(controls.autoRotate));
  });
}

/* ============================================================
   Animation loop + lifecycle
   ============================================================ */
function frame(nowMs) {
  const dt = Math.min((nowMs - prevTime) / 1000, 0.1); // clamp stall jumps
  prevTime = nowMs;

  timeUniform.value += dt;
  controls.update();
  postProcessing.render();

  // rolling FPS, refreshed about twice per second
  fpsAccum += dt;
  fpsFrames++;
  if (fpsAccum >= 0.5) {
    fpsEl.textContent = String(Math.round(fpsFrames / fpsAccum));
    fpsAccum = 0;
    fpsFrames = 0;
  }

  if (!revealed) {
    revealed = true;
    loaderEl.classList.add('hidden');
    uiEl.classList.add('revealed');
  }
}

function onVisibilityChange() {
  if (document.hidden) {
    renderer.setAnimationLoop(null);
  } else {
    prevTime = performance.now(); // avoid a shader-time jump on resume
    renderer.setAnimationLoop(frame);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ============================================================
   Boot + failure states
   ============================================================ */
function showError(title, message) {
  loaderTitleEl.textContent = title;
  loaderTitleEl.classList.add('error');
  loaderBarEl.style.display = 'none';
  loaderStatusEl.textContent = message;
}

if (!navigator.gpu) {
  showError(
    'WebGPU Unavailable',
    'This experience needs WebGPU. Please use a current version of Chrome or Edge with WebGPU support enabled.'
  );
} else {
  init().catch((err) => {
    console.error(err);
    showError(
      'Initialization Failed',
      `${err && err.message ? err.message : err} — make sure hardware acceleration is enabled and your browser is up to date.`
    );
  });
}
