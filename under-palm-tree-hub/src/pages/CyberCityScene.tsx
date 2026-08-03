import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// ===================== CYBERPUNK 3D REALTIME CITY =====================
// React port of the three.js cyberpunk city scene (npm three, no CDN).
// Fixes extraction artifacts (broken case/keywords) and adds cleanup.

function createNoiseCanvas(width: number, height: number, scale = 1, type: 'roughness' | 'normal' | 'metal' | 'random' = 'roughness') {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const imgData = ctx.createImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      let val: number;
      if (type === 'roughness') {
        val = 100 + Math.random() * 80 + Math.sin(x / scale) * 20 + Math.cos(y / scale) * 20;
      } else if (type === 'normal') {
        val = 128 + (Math.random() - 0.5) * 40;
      } else if (type === 'metal') {
        val = Math.sin(x / scale) + Math.cos(y / scale) > 0 ? 220 : 30;
      } else {
        val = Math.random() * 255;
      }
      val = Math.max(0, Math.min(255, val));
      imgData.data[i] = val;
      imgData.data[i + 1] = type === 'normal' ? 128 + (Math.random() - 0.5) * 30 : val;
      imgData.data[i + 2] = type === 'normal' ? 255 : val;
      imgData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return c;
}

function createGridCanvas(size: number) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  const step = size / 20;
  for (let i = 0; i <= size; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = '#f0f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, size / 2);
  ctx.lineTo(size, size / 2);
  ctx.stroke();
  ctx.strokeStyle = '#0ff';
  ctx.beginPath();
  ctx.moveTo(size / 2, 0);
  ctx.lineTo(size / 2, size);
  ctx.stroke();
  return c;
}

function createSkyboxCanvas() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#000011');
  grad.addColorStop(0.5, '#0a001a');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = Math.random() > 0.9 ? '#0ff' : '#fff';
    ctx.globalAlpha = Math.random() * 0.8;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 2, Math.random() * 2);
  }
  ctx.globalAlpha = 1;
  return c;
}

export default function CyberCityScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let rafId = 0;

    const setP = (p: number) => { if (!disposed) setProgress(p); };

    // ─── Renderer ───
    setP(10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── Scene ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.015);

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(8, 5, 12);

    // ─── Controls ───
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 30;
    controls.target.set(0, 2, 0);

    // ─── Procedural textures ───
    setP(25);
    const floorRoughTex = new THREE.CanvasTexture(createNoiseCanvas(512, 512, 8, 'roughness'));
    floorRoughTex.wrapS = floorRoughTex.wrapT = THREE.RepeatWrapping;
    floorRoughTex.repeat.set(4, 4);

    const floorNormalTex = new THREE.CanvasTexture(createNoiseCanvas(512, 512, 8, 'normal'));
    floorNormalTex.wrapS = floorNormalTex.wrapT = THREE.RepeatWrapping;
    floorNormalTex.repeat.set(4, 4);

    const floorGridTex = new THREE.CanvasTexture(createGridCanvas(512));
    floorGridTex.wrapS = floorGridTex.wrapT = THREE.RepeatWrapping;
    floorGridTex.repeat.set(8, 8);

    const skyTex = new THREE.CanvasTexture(createSkyboxCanvas());
    skyTex.mapping = THREE.EquirectangularReflectionMapping;

    // ─── Environment (HDRi simulation) ───
    setP(40);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromEquirectangular(skyTex).texture;
    scene.environment = envMap;
    scene.background = new THREE.Color(0x020205);

    // ─── Lighting ───
    setP(50);
    scene.add(new THREE.AmbientLight(0x404060, 0.3));

    const sunLight = new THREE.DirectionalLight(0xffaaee, 2);
    sunLight.position.set(-5, 10, -5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    fillLight.position.set(5, 3, 5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff00ff, 3, 20);
    rimLight.position.set(0, 8, -8);
    scene.add(rimLight);

    // ─── Floor (PBR) ───
    setP(60);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorGridTex,
      normalMap: floorNormalTex,
      roughnessMap: floorRoughTex,
      roughness: 0.3,
      metalness: 0.7,
      envMap,
      envMapIntensity: 0.5,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ─── Cyberpunk buildings ───
    setP(70);
    const buildings = new THREE.Group();
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.2,
      metalness: 0.9,
      envMap,
      envMapIntensity: 1.0,
    });
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 2,
      roughness: 0.1,
      metalness: 0.0,
    });
    const windowMat2 = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 2,
      roughness: 0.1,
      metalness: 0.0,
    });

    const winGeo = new THREE.PlaneGeometry(0.8, 1.2);

    function createBuilding(x: number, z: number, w: number, h: number, d: number) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, buildingMat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      buildings.add(mesh);

      const rows = Math.floor(h / 3);
      const cols = Math.floor(w / 2);
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.4) {
            const mat = Math.random() > 0.5 ? windowMat : windowMat2;
            const win = new THREE.Mesh(winGeo, mat);
            win.position.set(x - w / 2 + 1 + c * 2, r * 3, z + d / 2 + 0.01);
            buildings.add(win);
          }
        }
      }

      // Neon edges
      const edgeGeo = new THREE.BoxGeometry(w + 0.1, h + 0.1, d + 0.1);
      const edgeMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const edge = new THREE.Mesh(edgeGeo, edgeMat);
      edge.position.set(x, h / 2, z);
      buildings.add(edge);
    }

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const bdist = 8 + Math.random() * 25;
      const x = Math.cos(angle) * bdist;
      const z = Math.sin(angle) * bdist;
      const w = 2 + Math.random() * 4;
      const h = 5 + Math.random() * 20;
      const d = 2 + Math.random() * 4;
      createBuilding(x, z, w, h, d);
    }
    scene.add(buildings);

    // ─── Central monument ───
    setP(80);
    const monumentGroup = new THREE.Group();

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.1,
      metalness: 1.0,
      envMap,
      envMapIntensity: 1.5,
    });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.5, 0.5, 32), baseMat);
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    monumentGroup.add(base);

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 3,
      roughness: 0.0,
      metalness: 0.1,
      transmission: 0.6,
      thickness: 1.0,
      envMap,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.8, 64, 64), coreMat);
    core.position.y = 2.5;
    monumentGroup.add(core);

    const legMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.95,
      envMap,
      envMapIntensity: 1.2,
    });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.04, 3, 8), legMat);
      leg.position.set(Math.cos(angle) * 1.2, 1.5, Math.sin(angle) * 1.2);
      leg.rotation.z = Math.cos(angle) * 0.5;
      leg.rotation.x = Math.sin(angle) * 0.5;
      leg.castShadow = true;
      monumentGroup.add(leg);

      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00ffff : 0xff00ff }),
      );
      tip.position.set(0, -1.5, 0);
      leg.add(tip);
    }

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.05, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    );
    ring.position.y = 2.5;
    ring.rotation.x = Math.PI / 2;
    monumentGroup.add(ring);

    const ring2 = ring.clone();
    ring2.scale.set(1.5, 1.5, 1.5);
    ring2.rotation.x = Math.PI / 3;
    ring2.material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    monumentGroup.add(ring2);

    scene.add(monumentGroup);

    // ─── Neon dust particles ───
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      const col = Math.random() > 0.5 ? new THREE.Color(0x00ffff) : new THREE.Color(0xff00ff);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Post processing (Bloom) ───
    setP(90);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.6,
      0.4,
      0.85,
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // ─── Animation ───
    setP(100);
    const loadTimer = setTimeout(() => { if (!disposed) setLoaded(true); }, 500);

    const clock = new THREE.Clock();

    function animate() {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      controls.update();

      ring.rotation.z = time * 0.5;
      ring2.rotation.z = -time * 0.3;
      ring2.rotation.x = Math.PI / 3 + Math.sin(time) * 0.1;

      core.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      coreMat.emissiveIntensity = 2 + Math.sin(time * 3) * 1;

      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(time + pos[i * 3]) * 0.01;
        if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      rimLight.position.x = Math.sin(time * 0.5) * 10;
      rimLight.position.z = Math.cos(time * 0.5) * 10;

      composer.render();
    }

    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(loadTimer);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      composer.dispose();
      pmremGenerator.dispose();
      envMap.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          const mat = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
      [floorRoughTex, floorNormalTex, floorGridTex, skyTex].forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Loading overlay */}
      <div
        className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? 'none' : 'auto' }}
      >
        <h2
          className="mb-5 animate-pulse text-2xl font-bold tracking-[0.3em] text-cyan-300 md:text-3xl"
          style={{ textShadow: '0 0 20px #0ff', fontFamily: 'monospace' }}
        >
          CYBERPUNK REALTIME
        </h2>
        <div className="h-[3px] w-[300px] overflow-hidden rounded-sm bg-[#111]">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0ff, #f0f)',
              boxShadow: '0 0 10px #0ff',
            }}
          />
        </div>
        <p className="mt-4 text-xs text-neutral-500">جاري بناء المشهد الواقعي...</p>
      </div>

      {/* UI overlay */}
      <div className="pointer-events-none absolute right-5 top-5 z-10 text-cyan-300" style={{ textShadow: '0 0 10px #0ff' }}>
        <h1 className="mb-2 text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'monospace' }}>
          CYBERPUNK 3D
        </h1>
        <p className="text-xs leading-7 text-neutral-400" dir="rtl">
          محرك: Three.js WebGL2
          <br />
          إضاءة: PBR + HDRi
          <br />
          تأثير: Bloom + Tone Mapping
          <br />
          الظلال: PCF Soft Shadows
        </p>
      </div>

      {/* Back to Arcade */}
      <Link
        to="/arcade"
        className="absolute left-5 top-5 z-10 rounded-full border border-cyan-400/30 bg-black/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 no-underline backdrop-blur transition hover:border-cyan-300 hover:text-white"
        style={{ textShadow: '0 0 10px #0ff' }}
      >
        ← Back to Arcade
      </Link>

      {/* Controls hint */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-cyan-400/20 bg-black/50 px-5 py-2 text-center text-[11px] text-neutral-400">
        🖱️ اسحب للدوران | عجلة الماوس للتقريب | لمس متعدد للجوال
      </div>
    </div>
  );
}
