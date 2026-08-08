import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const QUALITY_PRESETS = {
  high: {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    shadowMapSize: 2048,
    shadows: true,
    bloom: true,
    bloomStrength: 0.4,
    bloomRadius: 0.5,
    bloomThreshold: 0.85,
    fogDensity: 0.008,
    drawDistance: 800,
    instanceCount: { buildings: 3000, props: 2000, cars: 200 },
    antialias: true
  },
  medium: {
    pixelRatio: Math.min(window.devicePixelRatio, 1.5),
    shadowMapSize: 1024,
    shadows: true,
    bloom: true,
    bloomStrength: 0.3,
    bloomRadius: 0.4,
    bloomThreshold: 0.9,
    fogDensity: 0.012,
    drawDistance: 500,
    instanceCount: { buildings: 1800, props: 1000, cars: 100 },
    antialias: true
  },
  low: {
    pixelRatio: 1,
    shadowMapSize: 512,
    shadows: false,
    bloom: false,
    bloomStrength: 0,
    bloomRadius: 0,
    bloomThreshold: 1,
    fogDensity: 0.018,
    drawDistance: 300,
    instanceCount: { buildings: 800, props: 400, cars: 40 },
    antialias: false
  }
};

export class Engine {
  constructor(container, quality = 'medium') {
    this.container = container;
    this.quality = quality;
    this.preset = QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium;
    this.clock = new THREE.Clock();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.lights = {};
    this.fog = null;
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2B1D3B);
    this.fog = new THREE.FogExp2(0x2B1D3B, this.preset.fogDensity);
    this.scene.fog = this.fog;

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, this.preset.drawDistance);
    this.camera.position.set(0, 20, 40);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.preset.antialias,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(this.preset.pixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = this.preset.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Post-processing
    if (this.preset.bloom) {
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        this.preset.bloomStrength,
        this.preset.bloomRadius,
        this.preset.bloomThreshold
      );
      this.composer.addPass(bloomPass);
      const outputPass = new OutputPass();
      this.composer.addPass(outputPass);
    }

    // Lights
    this.setupLights();

    // Resize handler
    window.addEventListener('resize', () => this.onResize());

    return this;
  }

  setupLights() {
    // Ambient
    this.lights.ambient = new THREE.AmbientLight(0x404060, 0.6);
    this.scene.add(this.lights.ambient);

    // Directional (Sun/Moon)
    this.lights.sun = new THREE.DirectionalLight(0xFFD4A3, 1.5);
    this.lights.sun.position.set(50, 100, 50);
    this.lights.sun.castShadow = this.preset.shadows;
    if (this.preset.shadows) {
      this.lights.sun.shadow.mapSize.width = this.preset.shadowMapSize;
      this.lights.sun.shadow.mapSize.height = this.preset.shadowMapSize;
      this.lights.sun.shadow.camera.near = 0.5;
      this.lights.sun.shadow.camera.far = 300;
      this.lights.sun.shadow.camera.left = -100;
      this.lights.sun.shadow.camera.right = 100;
      this.lights.sun.shadow.camera.top = 100;
      this.lights.sun.shadow.camera.bottom = -100;
      this.lights.sun.shadow.bias = -0.0005;
    }
    this.scene.add(this.lights.sun);

    // Hemisphere for sky bounce
    this.lights.hemi = new THREE.HemisphereLight(0x87CEEB, 0x3D2817, 0.4);
    this.scene.add(this.lights.hemi);

    // City glow (warm)
    this.lights.cityGlow = new THREE.PointLight(0xE85D4E, 0.5, 200);
    this.lights.cityGlow.position.set(0, 30, 0);
    this.scene.add(this.lights.cityGlow);
  }

  setTimeOfDay(timeOfDay) {
    // timeOfDay: 0-1 (0=dawn, 0.25=noon, 0.5=dusk, 0.75=midnight, 1=dawn)
    const t = timeOfDay;

    let sunColor, sunIntensity, ambientColor, ambientIntensity, hemiSky, hemiGround, fogColor, exposure;

    if (t < 0.2) { // Dawn
      sunColor = new THREE.Color(0xFF8C42); sunIntensity = 0.8;
      ambientColor = new THREE.Color(0x504060); ambientIntensity = 0.4;
      hemiSky = 0xFF8C42; hemiGround = 0x3D2817;
      fogColor = new THREE.Color(0x6B4F3A); exposure = 0.9;
    } else if (t < 0.4) { // Day
      sunColor = new THREE.Color(0xFFF5E1); sunIntensity = 2.0;
      ambientColor = new THREE.Color(0x8090B0); ambientIntensity = 0.7;
      hemiSky = 0x87CEEB; hemiGround = 0x5A7D4A;
      fogColor = new THREE.Color(0xA0C4E8); exposure = 1.1;
    } else if (t < 0.6) { // Dusk (default)
      sunColor = new THREE.Color(0xFF6B4A); sunIntensity = 1.2;
      ambientColor = new THREE.Color(0x604050); ambientIntensity = 0.5;
      hemiSky = 0xFF6B4A; hemiGround = 0x3D2817;
      fogColor = new THREE.Color(0x2B1D3B); exposure = 1.0;
    } else { // Night
      sunColor = new THREE.Color(0x4466AA); sunIntensity = 0.3;
      ambientColor = new THREE.Color(0x202040); ambientIntensity = 0.3;
      hemiSky = 0x1A1A3E; hemiGround = 0x0A0A1A;
      fogColor = new THREE.Color(0x0A0A1A); exposure = 0.8;
    }

    this.lights.sun.color.lerp(sunColor, 0.05);
    this.lights.sun.intensity = THREE.MathUtils.lerp(this.lights.sun.intensity, sunIntensity, 0.05);
    this.lights.ambient.color.lerp(ambientColor, 0.05);
    this.lights.ambient.intensity = THREE.MathUtils.lerp(this.lights.ambient.intensity, ambientIntensity, 0.05);
    this.lights.hemi.color.setHex(hemiSky);
    this.lights.hemi.groundColor.setHex(hemiGround);
    this.fog.color.lerp(fogColor, 0.02);
    this.scene.background.lerp(fogColor, 0.02);
    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(this.renderer.toneMappingExposure, exposure, 0.02);
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }

  render() {
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  setQuality(level) {
    this.quality = level;
    this.preset = QUALITY_PRESETS[level] || QUALITY_PRESETS.medium;
    this.renderer.setPixelRatio(this.preset.pixelRatio);
    this.renderer.shadowMap.enabled = this.preset.shadows;
    this.fog.density = this.preset.fogDensity;
    this.camera.far = this.preset.drawDistance;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.renderer.dispose();
    if (this.composer) this.composer.dispose();
    window.removeEventListener('resize', () => this.onResize());
  }
}
