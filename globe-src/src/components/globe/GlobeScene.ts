import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { countries } from '@/data/countries';

// Hosted locally (public/textures/globe/) instead of hotlinked from
// raw.githubusercontent.com — that's a code repo, not a CDN, and it was
// prone to stalling/failing on flaky mobile connections, leaving the globe
// stuck on "Loading Globe..." indefinitely.
const TEXTURE_URLS = {
  day: '../public/textures/globe/earth_atmos_2048.jpg',
  bump: '../public/textures/globe/earth_normal_2048.jpg',
  clouds: '../public/textures/globe/earth_clouds_1024.png',
  specular: '../public/textures/globe/earth_specular_2048.jpg',
  night: '../public/textures/globe/earth_lights_2048.png',
};

export interface GlobeCallbacks {
  onCountryHover: (countryId: string | null) => void;
  onCountryClick: (countryId: string) => void;
  onLoadComplete: () => void;
}

export class GlobeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private earthGroup: THREE.Group;
  private starGroup: THREE.Group;
  private cloudMesh!: THREE.Mesh;
  private atmosphereMesh!: THREE.Mesh;
  private nightLightsMesh!: THREE.Mesh;
  private earthMesh!: THREE.Mesh;
  private highlightMesh!: THREE.Mesh;
  private highlightCanvas!: HTMLCanvasElement;
  private highlightCtx!: CanvasRenderingContext2D;
  private highlightTexture!: THREE.CanvasTexture;
  private markerGroup: THREE.Group;
  private markers: THREE.Mesh[] = [];
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private callbacks: GlobeCallbacks;
  private isDragging = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private _isLoaded = false;
  private animationId: number | null = null;
  private hoveredCountry: string | null = null;
  private container: HTMLElement;
  private sunDirection: THREE.Vector3;
  private starData: { baseRotation: number; twinkleSpeed: number }[] = [];
  private onResizeBound: () => void;
  private onFlyToCountryBound: (e: Event) => void;
  private onResetCameraBound: () => void;

  constructor(container: HTMLElement, callbacks: GlobeCallbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-10, -10);
    this.sunDirection = new THREE.Vector3(5, 3, 5).normalize();

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 3.5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 1.4;
    this.controls.maxDistance = 7.5;
    this.controls.zoomSpeed = 0.65;
    this.controls.enablePan = false;

    // Groups
    this.earthGroup = new THREE.Group();
    this.starGroup = new THREE.Group();
    this.markerGroup = new THREE.Group();
    this.scene.add(this.earthGroup);
    this.scene.add(this.starGroup);
    this.scene.add(this.markerGroup);

    // Lights
    this.setupLights();

    // Event listeners
    this.onResizeBound = this.onResize.bind(this);
    this.onFlyToCountryBound = this.onFlyToCountry.bind(this);
    this.onResetCameraBound = this.resetCamera.bind(this);
    window.addEventListener('resize', this.onResizeBound);
    window.addEventListener('flyToCountry', this.onFlyToCountryBound);
    window.addEventListener('resetCamera', this.onResetCameraBound);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.renderer.domElement.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
    this.renderer.domElement.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    this.renderer.domElement.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
    this.renderer.domElement.addEventListener('click', this.onClick.bind(this));

    // Init
    this.init();
  }

  private setupLights() {
    // Strong ambient to reveal earth details
    const ambient = new THREE.AmbientLight(0x887777, 0.6);
    this.scene.add(ambient);

    // Hemisphere light - warm sky, cool ground
    const hemiLight = new THREE.HemisphereLight(0xC8A882, 0x4A2A30, 0.5);
    this.scene.add(hemiLight);

    // Main sun light - warm and bright
    const sun = new THREE.DirectionalLight(0xFFE8D0, 2.0);
    sun.position.copy(this.sunDirection.clone().multiplyScalar(10));
    sun.castShadow = false;
    this.scene.add(sun);

    // Rim light from opposite side (subtle)
    const rimLight = new THREE.DirectionalLight(0x8B5E6F, 0.4);
    rimLight.position.set(-5, 2, -5);
    this.scene.add(rimLight);

    // Subtle fill light
    const fillLight = new THREE.PointLight(0xA67C52, 0.3, 20);
    fillLight.position.set(0, 5, 3);
    this.scene.add(fillLight);
  }

  private async init() {
    try {
      await this.loadTextures();
      this.createStarfield();
      this.createEarth();
      this.createClouds();
      this.createAtmosphere();
      this.createNightLights();
      this.createCountryMarkers();
      this.createHighlightOverlay();
      this._isLoaded = true;
      this.callbacks.onLoadComplete();
      this.animate();
    } catch (err) {
      console.error('Globe init error:', err);
      this.createFallbackEarth();
      this.createStarfield();
      this._isLoaded = true;
      this.callbacks.onLoadComplete();
      this.animate();
    }
  }

  private loadTextures(): Promise<void> {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymous';
      const textures: Record<string, THREE.Texture> = {};
      let loaded = 0;
      const total = Object.keys(TEXTURE_URLS).length;
      const timeout = setTimeout(() => reject(new Error('Texture load timeout')), 15000);

      Object.entries(TEXTURE_URLS).forEach(([key, url]) => {
        loader.load(
          url,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = 16;
            textures[key] = texture;
            loaded++;
            if (loaded === total) {
              clearTimeout(timeout);
              (this as any)._textures = textures;
              resolve();
            }
          },
          undefined,
          () => {
            // On error, load a procedural color texture
            console.warn(`Failed to load ${key} texture, using fallback`);
            const fallbackTexture = this.createFallbackTexture(key);
            textures[key] = fallbackTexture;
            loaded++;
            if (loaded === total) {
              clearTimeout(timeout);
              (this as any)._textures = textures;
              resolve();
            }
          }
        );
      });
    });
  }

  private createFallbackTexture(key: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (key === 'day') {
      // Procedural earth with continents
      // Ocean
      ctx.fillStyle = '#1a3a4a';
      ctx.fillRect(0, 0, 1024, 512);
      // Land masses (simplified shapes)
      ctx.fillStyle = '#2d4a2d';
      // North America
      ctx.beginPath(); ctx.ellipse(200, 150, 80, 50, -0.2, 0, Math.PI * 2); ctx.fill();
      // South America
      ctx.beginPath(); ctx.ellipse(260, 320, 45, 70, 0.2, 0, Math.PI * 2); ctx.fill();
      // Europe/Africa
      ctx.beginPath(); ctx.ellipse(480, 160, 60, 40, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(490, 280, 50, 80, 0, 0, Math.PI * 2); ctx.fill();
      // Asia
      ctx.beginPath(); ctx.ellipse(680, 140, 120, 70, 0, 0, Math.PI * 2); ctx.fill();
      // Australia
      ctx.beginPath(); ctx.ellipse(800, 340, 50, 35, 0, 0, Math.PI * 2); ctx.fill();
      // Green tint for vegetation
      ctx.fillStyle = '#3d5a3d';
      ctx.beginPath(); ctx.ellipse(200, 150, 70, 40, -0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(680, 140, 100, 55, 0, 0, Math.PI * 2); ctx.fill();
    } else if (key === 'bump' || key === 'specular') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1024, 512);
      // Land is brighter (bump/specular)
      ctx.fillStyle = '#333333';
      ctx.beginPath(); ctx.ellipse(200, 150, 80, 50, -0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(260, 320, 45, 70, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(480, 160, 60, 40, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(490, 280, 50, 80, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(680, 140, 120, 70, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(800, 340, 50, 35, 0, 0, Math.PI * 2); ctx.fill();
    } else if (key === 'clouds') {
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 1024, 512);
      // White clouds
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const rx = 20 + Math.random() * 60;
        const ry = 10 + Math.random() * 30;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1024, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private get textures() {
    return (this as any)._textures || {};
  }

  private createEarth() {
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const material = new THREE.MeshPhongMaterial({
      map: this.textures.day,
      specularMap: this.textures.specular,
      specular: new THREE.Color(0x111111),
      bumpMap: this.textures.bump,
      bumpScale: 0.05,
      shininess: 25,
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x000000),
      reflectivity: 0.3,
    });
    this.earthMesh = new THREE.Mesh(geometry, material);
    this.earthMesh.name = 'earth';
    this.earthGroup.add(this.earthMesh);
  }

  private createFallbackEarth() {
    // Create a procedural earth with visible continents
    const dayTex = this.createFallbackTexture('day');
    const bumpTex = this.createFallbackTexture('bump');
    const specTex = this.createFallbackTexture('specular');
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: dayTex,
      bumpMap: bumpTex,
      bumpScale: 0.05,
      specularMap: specTex,
      specular: new THREE.Color(0x222222),
      shininess: 25,
    });
    this.earthMesh = new THREE.Mesh(geometry, material);
    this.earthMesh.name = 'earth';
    this.earthGroup.add(this.earthMesh);
    // Also add fallback clouds
    const cloudGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: this.createFallbackTexture('clouds'),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    this.cloudMesh.rotation.y = Math.PI;
    this.earthGroup.add(this.cloudMesh);
  }

  private createClouds() {
    const geometry = new THREE.SphereGeometry(1.01, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: this.textures.clouds,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.cloudMesh = new THREE.Mesh(geometry, material);
    this.cloudMesh.rotation.y = Math.PI;
    this.earthGroup.add(this.cloudMesh);

    gsap.to(material, { opacity: 0.8, duration: 1.0, delay: 0.5 });
  }

  private createAtmosphere() {
    const geometry = new THREE.SphereGeometry(1.15, 64, 64);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 burgundy = vec3(0.45, 0.18, 0.24);
          vec3 earthy = vec3(0.65, 0.38, 0.28);
          vec3 color = mix(burgundy, earthy, intensity * 2.0);
          gl_FragColor = vec4(color, 1.0) * intensity * 1.8;
        }
      `,
      uniforms: {},
    });
    this.atmosphereMesh = new THREE.Mesh(geometry, material);
    (this.atmosphereMesh.material as THREE.ShaderMaterial).transparent = true;
    (this.atmosphereMesh.material as THREE.ShaderMaterial).opacity = 0;
    this.earthGroup.add(this.atmosphereMesh);

    gsap.to(this.atmosphereMesh.material as THREE.ShaderMaterial, { opacity: 1, duration: 1.0, delay: 0.3 });
  }

  private createNightLights() {
    const geometry = new THREE.SphereGeometry(1.005, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: this.textures.night,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.nightLightsMesh = new THREE.Mesh(geometry, material);
    this.earthGroup.add(this.nightLightsMesh);

    gsap.to(material, { opacity: 0.7, duration: 1.0, delay: 0.7 });
  }

  private createStarfield() {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 1600 : 4200;
    const geometry = new THREE.SphereGeometry(0.028, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 40;

      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      this.starData.push({
        baseRotation: dummy.rotation.y,
        twinkleSpeed: 0.1 + Math.random() * 0.3,
      });
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    this.starGroup.add(instancedMesh);
    instancedMesh.visible = false;
    gsap.delayedCall(0.1, () => { instancedMesh.visible = true; });
    this.createCosmos();
  }

  private moonPivot: THREE.Group | null = null;
  private galaxySprite: THREE.Sprite | null = null;
  private cosmosBuilt = false;

  private radialSprite(stops: [number, string][], size = 256): THREE.Texture {
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private createCosmos() {
    if (this.cosmosBuilt) return;
    this.cosmosBuilt = true;

    // ---- Sun: warm glowing sprite far to the upper right ----
    const sunTex = this.radialSprite([
      [0, 'rgba(255,255,240,1)'],
      [0.18, 'rgba(255,238,170,0.95)'],
      [0.42, 'rgba(255,190,90,0.5)'],
      [0.7, 'rgba(255,150,50,0.16)'],
      [1, 'rgba(255,140,40,0)'],
    ], 512);
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sunTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
    }));
    sun.position.set(30, 12, -34);
    sun.scale.setScalar(14);
    this.starGroup.add(sun);

    // ---- Galaxy: soft violet nebula far to the left ----
    const galTex = this.radialSprite([
      [0, 'rgba(240,230,255,0.9)'],
      [0.2, 'rgba(190,150,255,0.5)'],
      [0.5, 'rgba(120,90,220,0.22)'],
      [0.8, 'rgba(70,60,160,0.08)'],
      [1, 'rgba(40,30,90,0)'],
    ], 512);
    const galaxy = new THREE.Sprite(new THREE.SpriteMaterial({
      map: galTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
      rotation: 0.6,
    }));
    galaxy.position.set(-34, 16, -40);
    galaxy.scale.set(30, 14, 1);
    this.starGroup.add(galaxy);
    this.galaxySprite = galaxy;

    // ---- Moon: textured sphere slowly orbiting the earth ----
    const moonTex = new THREE.TextureLoader().load(
      '../public/textures/globe/moon_1024.jpg'
    );
    moonTex.colorSpace = THREE.SRGBColorSpace;
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 24, 24),
      new THREE.MeshStandardMaterial({ map: moonTex, roughness: 1 })
    );
    moon.position.set(3.6, 0, 0);
    const pivot = new THREE.Group();
    pivot.rotation.x = 0.18;
    pivot.add(moon);
    this.scene.add(pivot);
    this.moonPivot = pivot;
    const moonLight = new THREE.DirectionalLight(0xfff2d0, 1.2);
    moonLight.position.set(30, 12, -34);
    this.scene.add(moonLight);

    // ---- Shooting stars: streaks that cross the sky every few seconds ----
    const meteorTex = this.radialSprite([
      [0, 'rgba(255,255,255,1)'],
      [0.25, 'rgba(200,225,255,0.8)'],
      [1, 'rgba(150,190,255,0)'],
    ], 128);
    const spawnMeteor = () => {
      const mat = new THREE.SpriteMaterial({
        map: meteorTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0,
      });
      const m = new THREE.Sprite(mat);
      const sx = -20 + Math.random() * 40;
      const sy = 10 + Math.random() * 14;
      const sz = -18 - Math.random() * 14;
      m.position.set(sx, sy, sz);
      m.scale.setScalar(0.9 + Math.random() * 0.8);
      this.starGroup.add(m);
      const dx = 8 + Math.random() * 10;
      const dy = -(6 + Math.random() * 6);
      gsap.to(mat, { opacity: 1, duration: 0.15 });
      gsap.to(m.position, {
        x: sx + dx, y: sy + dy, duration: 1.1, ease: 'power1.in',
        onUpdate: () => { m.scale.x = m.scale.y * (1.6 + 2.4 * mat.opacity); },
      });
      gsap.to(mat, {
        opacity: 0, duration: 0.5, delay: 0.65,
        onComplete: () => { this.starGroup.remove(m); mat.dispose(); },
      });
      gsap.delayedCall(2.5 + Math.random() * 4.5, spawnMeteor);
    };
    gsap.delayedCall(2, spawnMeteor);
  }

  private createCountryMarkers() {
    const dotGeo = new THREE.CircleGeometry(0.025, 16);

    countries.forEach((country, index) => {
      const hasLive = country.content.some((c) => c.isLive);
      const color = hasLive ? 0x9B4D5E : 0xA67C52;
      const dotMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const marker = new THREE.Mesh(dotGeo, dotMat);

      const phi = (90 - country.lat) * Math.PI / 180;
      const theta = (country.lon + 180) * Math.PI / 180;
      marker.position.set(
        -1.02 * Math.sin(phi) * Math.cos(theta),
        1.02 * Math.cos(phi),
        1.02 * Math.sin(phi) * Math.sin(theta)
      );
      marker.lookAt(0, 0, 0);

      marker.userData = { countryId: country.id, hasLive };
      this.markerGroup.add(marker);
      this.markers.push(marker);

      gsap.to(dotMat, { opacity: 0.8, duration: 0.5, delay: 1.5 + index * 0.05 });

      if (hasLive) {
        gsap.to(marker.scale, {
          x: 1.5,
          y: 1.5,
          duration: 1.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2 + index * 0.05,
        });
      }
    });
  }

  private createHighlightOverlay() {
    this.highlightCanvas = document.createElement('canvas');
    this.highlightCanvas.width = 2048;
    this.highlightCanvas.height = 1024;
    this.highlightCtx = this.highlightCanvas.getContext('2d')!;
    this.highlightCtx.clearRect(0, 0, 2048, 1024);

    this.highlightTexture = new THREE.CanvasTexture(this.highlightCanvas);
    const geometry = new THREE.SphereGeometry(1.002, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: this.highlightTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });
    this.highlightMesh = new THREE.Mesh(geometry, material);
    this.highlightMesh.visible = false;
    this.earthGroup.add(this.highlightMesh);
  }

  private highlightCountry(countryId: string | null) {
    if (!countryId) {
      this.highlightMesh.visible = false;
      this.highlightCtx.clearRect(0, 0, 2048, 1024);
      this.highlightTexture.needsUpdate = true;
      return;
    }

    const country = countries.find((c) => c.id === countryId);
    if (!country) return;

    // Convert lat/lon to UV coordinates
    const u = (country.lon + 180) / 360;
    const v = (90 - country.lat) / 180;

    this.highlightCtx.clearRect(0, 0, 2048, 1024);
    const cx = u * 2048;
    const cy = (1 - v) * 1024;

    // Draw radial glow at country center
    const gradient = this.highlightCtx.createRadialGradient(cx, cy, 0, cx, cy, 120);
    gradient.addColorStop(0, 'rgba(155, 77, 94, 0.45)');
    gradient.addColorStop(0.5, 'rgba(155, 77, 94, 0.18)');
    gradient.addColorStop(1, 'rgba(155, 77, 94, 0)');

    this.highlightCtx.fillStyle = gradient;
    this.highlightCtx.beginPath();
    this.highlightCtx.arc(cx, cy, 120, 0, Math.PI * 2);
    this.highlightCtx.fill();

    this.highlightTexture.needsUpdate = true;
    this.highlightMesh.visible = true;
  }

  private getCountryFromUV(uv: THREE.Vector2): string | null {
    // Convert UV to lat/lon
    const lon = uv.x * 360 - 180;
    const lat = 90 - uv.y * 180;

    // Find closest country by distance
    let closestId: string | null = null;
    let closestDist = Infinity;

    for (const country of countries) {
      const d = Math.sqrt(
        Math.pow(lat - country.lat, 2) +
        Math.pow(lon - country.lon, 2)
      );
      if (d < closestDist && d < 30) {
        closestDist = d;
        closestId = country.id;
      }
    }

    return closestId;
  }

  private onMouseMove(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.renderer.domElement.style.cursor = 'grab';
  }

  private onMouseDown() {
    this.isDragging = false;
    this.renderer.domElement.style.cursor = 'grabbing';
  }

  private onMouseUp() {
    this.renderer.domElement.style.cursor = 'grab';
  }

  private onTouchStart(event: TouchEvent) {
    this.isDragging = false;
    if (event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  private onTouchMove(event: TouchEvent) {
    if (event.touches.length > 0) {
      const dx = event.touches[0].clientX - this.touchStartX;
      const dy = event.touches[0].clientY - this.touchStartY;
      // Only count it as a drag once the finger has actually moved —
      // a tap always has a whisper of jitter and must still register as a click.
      if (Math.sqrt(dx * dx + dy * dy) > 8) {
        this.isDragging = true;
      }
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
    }
  }

  private onTouchEnd() {
    // Touch end handled by click
  }

  private onClick(event: MouseEvent) {
    if (this.isDragging) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.earthMesh);

    if (intersects.length > 0) {
      const uv = intersects[0].uv;
      if (uv) {
        const countryId = this.getCountryFromUV(uv);
        if (countryId) {
          this.callbacks.onCountryClick(countryId);
        }
      }
    }
  }

  private checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.earthMesh);

    if (intersects.length > 0) {
      const uv = intersects[0].uv;
      if (uv) {
        const countryId = this.getCountryFromUV(uv);
        if (countryId !== this.hoveredCountry) {
          this.hoveredCountry = countryId;
          this.highlightCountry(countryId);
          this.callbacks.onCountryHover(countryId);
          this.renderer.domElement.style.cursor = countryId ? 'pointer' : 'grab';
        }
      }
    } else if (this.hoveredCountry) {
      this.hoveredCountry = null;
      this.highlightCountry(null);
      this.callbacks.onCountryHover(null);
      this.renderer.domElement.style.cursor = 'grab';
    }
  }

  flyToCountry(lat: number, lon: number) {
    const distance = 2.5;
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;

    const targetX = -(distance * Math.sin(phi) * Math.cos(theta));
    const targetY = distance * Math.cos(phi);
    const targetZ = distance * Math.sin(phi) * Math.sin(theta);

    gsap.to(this.camera.position, {
      duration: 1.0,
      x: targetX,
      y: targetY,
      z: targetZ,
      ease: 'power2.inOut',
    });

    gsap.to(this.controls.target, {
      duration: 1.0,
      x: 0,
      y: 0,
      z: 0,
      ease: 'power2.inOut',
    });
  }

  resetCamera() {
    gsap.to(this.camera.position, {
      duration: 0.8,
      x: 0,
      y: 0,
      z: 3.5,
      ease: 'power2.inOut',
    });
  }

  updateMarkers(searchQuery: string, activeFilters: Set<string>) {
    this.markers.forEach((marker) => {
      const countryId = marker.userData.countryId as string;
      const country = countries.find((c) => c.id === countryId);
      if (!country) return;

      let matchesSearch = true;
      let matchesFilter = true;

      if (searchQuery) {
        matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      if (activeFilters.size > 0 && !activeFilters.has('all')) {
        matchesFilter = country.content.some((item) => activeFilters.has(item.type));
      }

      const shouldShow = matchesSearch && matchesFilter;
      gsap.to(marker.material as THREE.MeshBasicMaterial, {
        opacity: shouldShow ? 0.8 : 0.1,
        duration: 0.3,
      });
    });
  }

  private onResize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private animateStars(time: number) {
    const instancedMesh = this.starGroup.children[0] as THREE.InstancedMesh;
    if (!instancedMesh) return;

    const dummy = new THREE.Object3D();
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < Math.min(this.starData.length, instancedMesh.count); i++) {
      instancedMesh.getMatrixAt(i, matrix);
      matrix.decompose(position, rotation, scale);
      dummy.position.copy(position);
      dummy.rotation.setFromQuaternion(rotation);
      dummy.rotation.y = this.starData[i].baseRotation + time * this.starData[i].twinkleSpeed;
      dummy.scale.copy(scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    if (!this.isDragging && this._isLoaded) {
      this.earthGroup.rotation.y += 0.0005;
    }

    if (this.cloudMesh) {
      this.cloudMesh.rotation.y = Math.PI + time * 0.02;
    }

    this.animateStars(time);
    if (this.moonPivot) this.moonPivot.rotation.y += 0.0009;
    if (this.galaxySprite) this.galaxySprite.material.rotation += 0.0004;
    this.checkHover();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onFlyToCountry(e: Event) {
    const { lat, lon } = (e as CustomEvent).detail;
    this.flyToCountry(lat, lon);
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResizeBound);
    window.removeEventListener('flyToCountry', this.onFlyToCountryBound);
    window.removeEventListener('resetCamera', this.onResetCameraBound);
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
