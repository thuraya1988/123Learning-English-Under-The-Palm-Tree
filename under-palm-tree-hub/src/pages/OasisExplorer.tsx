import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type StoryKey = 'bustan' | 'falaj' | 'bayt' | 'jibal';

const STORIES: Record<StoryKey, { title: string; text: string }> = {
  bustan: {
    title: '🌳 Samail Grove',
    text: 'Samail oasis is one of the largest oases in Oman, with thousands of date palms spread along Wadi Samail. These groves are irrigated by the ancient Omani falaj system that is centuries old. Green stretches between the Hajar mountains make Samail a true oasis in the heart of the desert.',
  },
  falaj: {
    title: '💧 Falaj Samail',
    text: 'Falaj Samail is part of the ancient Omani aflaj network listed as UNESCO World Heritage. It carries water from deep in the mountains through underground channels to the groves and fields. The falaj system is one of the oldest irrigation systems in the world — a feat of Omani engineering.',
  },
  bayt: {
    title: '🏠 Omani Mud House',
    text: 'Samail houses feature traditional Omani architecture: mud and gypsum walls, square ventilation towers, and carved wooden doors. These homes were designed to withstand extreme heat and keep interiors cool. Every house tells the story of families who lived here for generations.',
  },
  jibal: {
    title: '⛰️ Hajar Mountains',
    text: 'Samail is embraced by the Hajar mountain range, formed millions of years ago. They act as a natural fortress protecting the oasis from sandstorms and provide a source of groundwater. These mountains hold caves and rock inscriptions thousands of years old, witnesses to civilizations that passed through.',
  },
};

interface HudState {
  time: string;
  temp: string;
  hum: string;
  dir: string;
  compassDeg: number;
}

const TIME_NAMES = ['Midnight', 'Dawn', 'Sunrise', 'Morning', 'Noon', 'Afternoon', 'Sunset', 'Evening'];
const DIRS = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

export default function OasisExplorer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<{ title: string; text: string } | null>(null);
  const [hud, setHud] = useState<HudState>({
    time: 'Dawn',
    temp: '28°C',
    hum: '45%',
    dir: 'North',
    compassDeg: 0,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ─── Scene basics ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1520, 0.008);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      500,
    );
    camera.position.set(35, 25, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 15;
    controls.maxDistance = 80;
    controls.target.set(0, 2, 0);

    // ─── Lights ───
    scene.add(new THREE.AmbientLight(0x4466aa, 0.4));

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    sunLight.position.set(30, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    scene.add(sunLight);

    const warmLight = new THREE.PointLight(0xf4d58d, 0.6, 30);
    warmLight.position.set(0, 8, 0);
    scene.add(warmLight);

    // ─── Sky ───
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunPos: { value: new THREE.Vector3(30, 40, 20) },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uSunPos;
        varying vec3 vWorldPos;
        void main() {
          vec3 dir = normalize(vWorldPos);
          float sunDot = max(dot(dir, normalize(uSunPos)), 0.0);
          vec3 dawn = vec3(0.15, 0.1, 0.25);
          vec3 day = vec3(0.35, 0.55, 0.85);
          vec3 horizon = vec3(0.85, 0.6, 0.35);
          float h = dir.y;
          vec3 col = mix(horizon, day, smoothstep(0.0, 0.4, h));
          col = mix(dawn, col, smoothstep(-0.1, 0.2, h));
          col += vec3(1.0, 0.85, 0.5) * pow(sunDot, 128.0) * 2.0;
          col += vec3(1.0, 0.7, 0.3) * pow(sunDot, 8.0) * 0.4;
          float stars = step(0.997, fract(sin(dot(dir.xz * 400.0, vec2(12.9898,78.233))) * 43758.5453));
          col += stars * smoothstep(0.3, -0.1, h) * 0.3;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(200, 48, 48), skyMat));

    // ─── Terrain ───
    const terrainGeo = new THREE.PlaneGeometry(120, 120, 128, 128);
    {
      const pos = terrainGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        let h = 0;
        const distFromCenter = Math.abs(x) * 0.08;
        h -= Math.max(0, 2 - distFromCenter) * 1.5;
        h += Math.sin(x * 0.15) * Math.cos(y * 0.12) * 1.5;
        h += Math.sin(x * 0.3 + 1) * Math.cos(y * 0.25) * 0.8;
        h += (Math.random() - 0.5) * 0.15;
        const edgeDist = Math.max(Math.abs(x), Math.abs(y)) / 60;
        h += Math.pow(edgeDist, 2) * 8;
        pos.setZ(i, h);
      }
      terrainGeo.computeVertexNormals();
    }
    const terrainMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vHeight;
        void main() {
          vNormal = normalMatrix * normal;
          vPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vHeight = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vHeight;
        void main() {
          vec3 lightDir = normalize(vec3(30, 40, 20));
          float diff = max(dot(normalize(vNormal), lightDir), 0.0);
          float amb = 0.3;
          vec3 sand = vec3(0.76, 0.65, 0.42);
          vec3 rock = vec3(0.45, 0.38, 0.32);
          vec3 darkRock = vec3(0.25, 0.2, 0.18);
          vec3 wadi = vec3(0.55, 0.48, 0.35);
          float slope = 1.0 - normalize(vNormal).z;
          vec3 col = mix(sand, rock, smoothstep(0.3, 0.7, slope));
          col = mix(col, darkRock, smoothstep(5.0, 12.0, vHeight));
          col = mix(col, wadi, smoothstep(-1.0, 0.5, vHeight) * (1.0 - smoothstep(0.5, 2.0, vHeight)));
          col *= (amb + diff * 0.7);
          col += vec3(0.08, 0.04, 0.0) * (1.0 - smoothstep(0.0, 60.0, length(vPos.xz)));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // ─── Hajar mountains (smooth shading, high segments) ───
    function createMountain(x: number, z: number, height: number, radius: number, color: number) {
      const geo = new THREE.ConeGeometry(radius, height, 32, 8);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * radius * 0.12);
        pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * height * 0.03);
        pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * radius * 0.12);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.9,
        metalness: 0.05,
        flatShading: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, height / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const snowGeo = new THREE.ConeGeometry(radius * 0.3, height * 0.15, 24);
      const snowMat = new THREE.MeshStandardMaterial({ color: 0xeeddcc, roughness: 0.5 });
      const snow = new THREE.Mesh(snowGeo, snowMat);
      snow.position.set(x, height * 0.92, z);
      scene.add(snow);
      return mesh;
    }

    const mountainColors = [0x6b5b4f, 0x7a6b5e, 0x5c4e42, 0x8a7a6d];
    [
      [-45, -30, 22, 12, mountainColors[0]],
      [-35, -40, 18, 10, mountainColors[1]],
      [40, -35, 25, 14, mountainColors[2]],
      [50, -20, 16, 9, mountainColors[3]],
      [-30, 40, 20, 11, mountainColors[0]],
      [35, 45, 19, 10, mountainColors[2]],
      [-50, 5, 15, 8, mountainColors[1]],
      [55, 10, 17, 9, mountainColors[3]],
    ].forEach(([x, z, h, r, c]) => createMountain(x, z, h, r, c));

    // ─── Wadi ───
    {
      const shape = new THREE.Shape();
      shape.moveTo(-30, -3);
      shape.quadraticCurveTo(-15, -2, 0, -1.5);
      shape.quadraticCurveTo(15, -1, 30, -2.5);
      shape.lineTo(30, 2.5);
      shape.quadraticCurveTo(15, 1, 0, 1.5);
      shape.quadraticCurveTo(-15, 2, -30, 3);
      shape.closePath();

      const wadi = new THREE.Mesh(
        new THREE.ShapeGeometry(shape, 32),
        new THREE.MeshStandardMaterial({ color: 0x8b7d6b, roughness: 0.95, metalness: 0 }),
      );
      wadi.rotation.x = -Math.PI / 2;
      wadi.position.y = 0.05;
      wadi.receiveShadow = true;
      scene.add(wadi);

      const stream = new THREE.Mesh(
        new THREE.PlaneGeometry(28, 0.8, 20, 1),
        new THREE.MeshStandardMaterial({
          color: 0x6b8b9b,
          roughness: 0.7,
          metalness: 0.1,
          transparent: true,
          opacity: 0.6,
        }),
      );
      stream.rotation.x = -Math.PI / 2;
      stream.position.set(0, 0.08, 0);
      scene.add(stream);
    }

    // ─── Falaj (irrigation) ───
    const falajPoints: { mesh: THREE.Mesh; baseY: number }[] = [];
    function createFalaj(x: number, z: number) {
      const channel = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.15, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x5a7a6a, roughness: 0.8 }),
      );
      channel.position.set(x, 0.12, z);
      channel.castShadow = true;
      scene.add(channel);

      const waterMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float wave = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
            vec3 col = mix(vec3(0.2, 0.45, 0.55), vec3(0.35, 0.65, 0.75), wave);
            float edge = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
            gl_FragColor = vec4(col, 0.7 * edge);
          }
        `,
        transparent: true,
      });
      const water = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 0.4), waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.set(x, 0.2, z);
      scene.add(water);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x88ddff, transparent: true }),
      );
      glow.position.set(x, 0.5, z);
      scene.add(glow);
      falajPoints.push({ mesh: glow, baseY: 0.5 });
    }
    createFalaj(-8, -2);
    createFalaj(5, -1);
    createFalaj(12, -2.5);

    // ─── Palm trees ───
    function createPalmTree(x: number, z: number, tall = false) {
      const group = new THREE.Group();
      const trunkH = tall ? 6 + Math.random() * 2 : 4 + Math.random() * 1.5;

      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.3, trunkH * 0.3, 0.2),
        new THREE.Vector3(-0.2, trunkH * 0.7, -0.1),
        new THREE.Vector3(0.1, trunkH, 0.1),
      );
      const trunk = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 20, 0.2, 12, false),
        new THREE.MeshStandardMaterial({ color: 0x6b5b3a, roughness: 0.95, metalness: 0 }),
      );
      trunk.castShadow = true;
      group.add(trunk);

      const leafCount = tall ? 10 : 7;
      for (let i = 0; i < leafCount; i++) {
        const angle = (i / leafCount) * Math.PI * 2;
        const leafLen = tall ? 3.5 : 2.5;
        const leafCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(angle) * leafLen * 0.4, -0.3, Math.sin(angle) * leafLen * 0.4),
          new THREE.Vector3(Math.cos(angle) * leafLen * 0.8, -1.2, Math.sin(angle) * leafLen * 0.8),
          new THREE.Vector3(Math.cos(angle) * leafLen, -2, Math.sin(angle) * leafLen),
        );
        const leaf = new THREE.Mesh(
          new THREE.TubeGeometry(leafCurve, 14, 0.08, 8, false),
          new THREE.MeshStandardMaterial({
            color: 0x2d6b1e,
            roughness: 0.8,
            metalness: 0,
            side: THREE.DoubleSide,
          }),
        );
        leaf.position.y = trunkH;
        leaf.castShadow = true;
        group.add(leaf);
      }

      if (tall) {
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          const cluster = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.7 }),
          );
          cluster.position.set(Math.cos(a) * 0.8, trunkH - 1.5, Math.sin(a) * 0.8);
          group.add(cluster);
        }
      }

      group.position.set(x, 0, z);
      scene.add(group);
      return group;
    }

    const palms: THREE.Group[] = [];
    const palmPositions: [number, number, boolean][] = [
      [-6, -5, false], [-4, -6, true], [-2, -4, false], [0, -5.5, true],
      [3, -4.5, false], [6, -6, true], [8, -4, false], [10, -5.5, false],
      [-8, 3, true], [-5, 4, false], [-3, 2.5, true], [0, 3.5, false],
      [4, 3, true], [7, 4.5, false], [9, 2, true], [11, 3.5, false],
      [-7, -1, false], [5, -2, true], [13, -1, false],
    ];
    palmPositions.forEach(([x, z, t]) => palms.push(createPalmTree(x, z, t)));

    // ─── Mud houses (smooth shading, higher segments) ───
    function createMudHouse(x: number, z: number, rotation = 0) {
      const group = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2.5, 3.5, 2, 2, 2),
        new THREE.MeshStandardMaterial({ color: 0xc4a872, roughness: 0.95, metalness: 0 }),
      );
      body.position.y = 1.25;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      const tower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.7, 3.5, 24),
        new THREE.MeshStandardMaterial({ color: 0xb89a65, roughness: 0.9 }),
      );
      tower.position.set(1.2, 1.75, 1.4);
      tower.castShadow = true;
      group.add(tower);

      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 0.2, 3.9),
        new THREE.MeshStandardMaterial({ color: 0xa89060, roughness: 0.9 }),
      );
      roof.position.y = 2.6;
      group.add(roof);

      const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.4, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 }),
      );
      door.position.set(0, 0.7, 1.76);
      group.add(door);

      for (const dx of [-0.8, 0.8]) {
        const win = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.4, 0.1),
          new THREE.MeshStandardMaterial({
            color: 0x8ec5d6,
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0x334455,
            emissiveIntensity: 0.3,
          }),
        );
        win.position.set(dx, 1.6, 1.76);
        group.add(win);
      }

      group.position.set(x, 0, z);
      group.rotation.y = rotation;
      scene.add(group);
      return group;
    }
    createMudHouse(-10, 6, 0.3);
    createMudHouse(-6, 8, -0.2);
    createMudHouse(8, 7, 0.5);

    // ─── Birds ───
    interface BirdData {
      speed: number;
      wingPhase: number;
      radius: number;
      center: THREE.Vector3;
    }
    const birds: THREE.Group[] = [];
    for (let i = 0; i < 6; i++) {
      const group = new THREE.Group();
      const wingGeo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0, 0, 0, -1.5, 0.3, -0.3, -0.5, 0.1, 0,
        0, 0, 0, 1.5, 0.3, -0.3, 0.5, 0.1, 0,
      ]);
      wingGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      wingGeo.computeVertexNormals();
      group.add(new THREE.Mesh(wingGeo, new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide })));
      const data: BirdData = {
        speed: 3 + Math.random() * 2,
        wingPhase: Math.random() * Math.PI * 2,
        radius: 15 + Math.random() * 20,
        center: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          12 + Math.random() * 8,
          (Math.random() - 0.5) * 30,
        ),
      };
      group.userData = data as unknown as Record<string, unknown>;
      scene.add(group);
      birds.push(group);
    }

    // ─── Desert dust ───
    const dustGeo = new THREE.BufferGeometry();
    {
      const count = 200;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = Math.random() * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
        sizes[i] = 0.05 + Math.random() * 0.15;
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      dustGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    }
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xd4b896,
        size: 0.12,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      }),
    );
    scene.add(dust);

    // ─── Ibn Majid character + explore points ───
    const ibnMajid = new THREE.Group();
    {
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.3, 1.4, 24),
        new THREE.MeshStandardMaterial({ color: 0xf5f0e8, roughness: 0.8 }),
      );
      body.position.y = 1.0;
      ibnMajid.add(body);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.7 }),
      );
      head.position.y = 1.85;
      ibnMajid.add(head);

      const turban = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 24, 18),
        new THREE.MeshStandardMaterial({ color: 0xfaf5e8, roughness: 0.6 }),
      );
      turban.position.y = 1.95;
      turban.scale.set(1, 0.7, 1);
      ibnMajid.add(turban);

      ibnMajid.position.set(0, 0, 5);
      scene.add(ibnMajid);
    }

    const explorePoints = [
      { x: 15, z: -10, label: 'Samail Fort' },
      { x: -12, z: 12, label: 'Old Well' },
      { x: 5, z: 15, label: 'Palm Souq' },
      { x: -20, z: -5, label: 'Rock Inscriptions' },
    ];
    explorePoints.forEach((p) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf4d58d, transparent: true, opacity: 0.7 }),
      );
      dot.position.set(p.x, 1.5, p.z);
      dot.userData = { label: p.label };
      scene.add(dot);

      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.15, 3, 12),
        new THREE.MeshBasicMaterial({ color: 0xf4d58d, transparent: true, opacity: 0.2 }),
      );
      beam.position.set(p.x, 1.5, p.z);
      scene.add(beam);
    });

    // ─── Dust fog ───
    const dustFogMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float n = sin(vUv.x * 5.0 + uTime * 0.3) * cos(vUv.y * 4.0 + uTime * 0.2);
          float alpha = smoothstep(0.3, 0.8, n) * 0.08;
          gl_FragColor = vec4(0.8, 0.7, 0.5, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const dustFog = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), dustFogMat);
    dustFog.rotation.x = -Math.PI / 2;
    dustFog.position.y = 0.5;
    scene.add(dustFog);

    // ─── Click → explore points ───
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      for (const hit of intersects) {
        const label = hit.object.userData?.label as string | undefined;
        if (label) {
          setInfo({
            title: '📍 ' + label,
            text: `Exploration point in Samail — ${label}`,
          });
          break;
        }
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    // ─── Animation loop ───
    const clock = new THREE.Clock();
    let raf = 0;
    let hudAccumulator = 0;

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      skyMat.uniforms.uTime.value = t;
      dustFogMat.uniforms.uTime.value = t;
      scene.traverse((child) => {
        const mat = (child as THREE.Mesh).material as THREE.Material | undefined;
        const withUniforms = mat as unknown as { uniforms?: { uTime?: { value: number } } };
        if (withUniforms?.uniforms?.uTime) withUniforms.uniforms.uTime.value = t;
      });

      palms.forEach((palm, i) => {
        palm.rotation.z = Math.sin(t * 0.8 + i * 0.5) * 0.03;
        palm.rotation.x = Math.cos(t * 0.6 + i * 0.3) * 0.02;
      });

      falajPoints.forEach((fp, i) => {
        fp.mesh.position.y = fp.baseY + Math.sin(t * 2 + i) * 0.1;
        (fp.mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 3 + i * 2) * 0.3;
      });

      birds.forEach((bird) => {
        const d = bird.userData as unknown as BirdData;
        const angle = t * d.speed * 0.1;
        bird.position.x = d.center.x + Math.cos(angle) * d.radius;
        bird.position.z = d.center.z + Math.sin(angle) * d.radius;
        bird.position.y = d.center.y + Math.sin(t * 0.5 + d.wingPhase) * 1.5;
        bird.rotation.y = -angle + Math.PI / 2;
        if (bird.children[0]) bird.children[0].rotation.z = Math.sin(t * 8 + d.wingPhase) * 0.4;
      });

      {
        const pos = dust.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          pos.setX(i, pos.getX(i) + Math.sin(t * 0.2 + i) * 0.01);
          pos.setY(i, pos.getY(i) + Math.cos(t * 0.15 + i * 0.5) * 0.005);
          if (pos.getY(i) > 15) pos.setY(i, 0);
        }
        pos.needsUpdate = true;
      }

      const walkPath = Math.sin(t * 0.15) * 8;
      ibnMajid.position.x = walkPath;
      ibnMajid.position.z = 5 + Math.cos(t * 0.1) * 3;
      ibnMajid.rotation.y = Math.atan2(Math.cos(t * 0.15) * 8 * 0.15, -Math.sin(t * 0.1) * 3 * 0.1);
      ibnMajid.position.y = Math.abs(Math.sin(t * 3)) * 0.08;

      const sunAngle = t * 0.05;
      sunLight.position.x = Math.cos(sunAngle) * 40;
      sunLight.position.y = 20 + Math.sin(sunAngle) * 20;
      sunLight.intensity = 1.0 + Math.sin(sunAngle) * 0.8;

      // HUD (throttled to ~4fps to avoid re-render churn)
      hudAccumulator += 1;
      if (hudAccumulator % 15 === 0) {
        const hours = Math.floor((t * 0.5) % 24);
        const camAngle = Math.atan2(camera.position.x, camera.position.z);
        const dirIdx = Math.floor(((camAngle + Math.PI) / (Math.PI * 2)) * 8) % 8;
        setHud({
          time: TIME_NAMES[Math.floor(hours / 3)],
          temp: Math.floor(28 + Math.sin(t * 0.3) * 8) + '°C',
          hum: Math.floor(45 + Math.cos(t * 0.2) * 15) + '%',
          dir: DIRS[dirIdx],
          compassDeg: -camAngle * (180 / Math.PI),
        });
      }

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const storyCards: { key: StoryKey; icon: string; title: string; desc: string }[] = [
    { key: 'bustan', icon: '🌳', title: 'Samail Grove', desc: 'A green oasis of thousands of palms' },
    { key: 'falaj', icon: '💧', title: 'Falaj Samail', desc: 'Ancient irrigation feeding the land' },
    { key: 'bayt', icon: '🏠', title: 'Mud House', desc: 'Omani architecture defying time' },
    { key: 'jibal', icon: '⛰️', title: 'Hajar Mountains', desc: 'A natural fortress guarding the oasis' },
  ];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a1a] font-sans">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Header */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#0a0a1a]/90 to-transparent px-8 py-4">
        <h1 className="text-2xl tracking-widest text-[#f4d58d] [text-shadow:0_0_20px_rgba(244,213,141,0.4)]">
          🌴 Samail
        </h1>
        <p className="mt-1 text-xs text-[#8a9bb5]">
          An oasis nestled between the Hajar mountains — palms, falaj, and history
        </p>
      </div>

      {/* Back link */}
      <Link
        to="/arcade"
        className="absolute top-4 right-8 z-30 rounded-lg border border-[#f4d58d]/30 bg-[#0f1220]/80 px-4 py-2 text-xs text-[#f4d58d] backdrop-blur transition hover:bg-[#f4d58d]/15"
      >
        ← Back to Arcade
      </Link>

      {/* HUD */}
      <div className="absolute top-24 right-8 z-20 flex flex-col gap-2">
        {[
          ['🕐 Time', hud.time],
          ['🌡️ Temp', hud.temp],
          ['💧 Humidity', hud.hum],
          ['🧭 Heading', hud.dir],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/5 bg-[#0f1220]/70 px-3 py-2 text-xs text-[#6a7b95]"
          >
            {label}: <span className="font-semibold text-[#f4d58d]">{value}</span>
          </div>
        ))}
      </div>

      {/* Compass */}
      <div className="absolute bottom-28 right-8 z-20 h-16 w-16">
        <svg
          viewBox="0 0 60 60"
          className="h-full w-full drop-shadow-[0_0_8px_rgba(244,213,141,0.3)]"
          style={{ transform: `rotate(${hud.compassDeg}deg)` }}
        >
          <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(244,213,141,0.2)" strokeWidth="1" />
          <polygon points="30,6 27,28 30,24 33,28" fill="#e74c3c" opacity="0.8" />
          <polygon points="30,54 27,32 30,36 33,32" fill="#f4d58d" opacity="0.6" />
          <text x="30" y="4" textAnchor="middle" fill="#e74c3c" fontSize="7" fontWeight="bold">N</text>
          <text x="30" y="59" textAnchor="middle" fill="#6a7b95" fontSize="7">S</text>
          <text x="57" y="33" textAnchor="middle" fill="#6a7b95" fontSize="7">E</text>
          <text x="3" y="33" textAnchor="middle" fill="#6a7b95" fontSize="7">W</text>
        </svg>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-28 left-8 z-20 text-[11px] leading-6 text-[#4a5a75]">
        🖱️ Drag to orbit
        <br />
        🔍 Scroll to zoom
        <br />
        📍 Click the glowing dots to explore
        <br />
        📖 Click the cards for stories
      </div>

      {/* Info panel */}
      <div
        className={`absolute top-1/2 right-8 z-30 w-72 -translate-y-1/2 rounded-2xl border border-[#f4d58d]/15 bg-[#0f1220]/90 p-6 backdrop-blur-xl transition-opacity duration-500 ${
          info ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          onClick={() => setInfo(null)}
          className="absolute top-3 right-4 text-[#6a7b95] hover:text-[#f4d58d]"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="mb-2 text-lg text-[#f4d58d]">{info?.title}</h3>
        <p className="text-[13px] leading-7 text-[#8a9bb5]">{info?.text}</p>
      </div>

      {/* Story cards */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {storyCards.map((c) => (
          <button
            key={c.key}
            onClick={() => setInfo(STORIES[c.key])}
            className="min-w-40 rounded-xl border border-[#f4d58d]/20 bg-[#141928]/85 px-4 py-3 text-left backdrop-blur transition hover:-translate-y-1 hover:border-[#f4d58d]/60 hover:shadow-[0_8px_25px_rgba(244,213,141,0.15)]"
          >
            <div className="mb-1 text-2xl">{c.icon}</div>
            <div className="text-sm font-semibold text-[#f4d58d]">{c.title}</div>
            <div className="mt-1 text-[11px] leading-5 text-[#6a7b95]">{c.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
