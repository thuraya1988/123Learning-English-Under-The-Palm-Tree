import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { ArrowLeft, Glasses, LogOut } from 'lucide-react';
import { useSfx } from '@/lib/sfx';

type XRNavigator = Navigator & {
  xr?: {
    isSessionSupported: (mode: string) => Promise<boolean>;
    requestSession: (
      mode: string,
      opts?: { requiredFeatures?: string[] },
    ) => Promise<XRSession>;
  };
};

/** Rounded name label sprite drawn on a canvas. */
function makeLabelSprite(text: string, bg = 'rgba(21,154,173,0.92)') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(4, 4, 248, 64, 20);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 38);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.6, 0.45, 1);
  return sprite;
}

function std(color: number, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05, ...opts });
}

function buildVillage(scene: THREE.Scene) {
  // Green oasis grass ground (smooth circle)
  const ground = new THREE.Mesh(new THREE.CircleGeometry(30, 64), std(0x58c472));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Turquoise falaj water channel winding through the village
  const falaj = new THREE.Group();
  const channel = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.5, 16, 64, Math.PI * 1.2),
    std(0x3ed6c5, { roughness: 0.25, metalness: 0.1, emissive: 0x0a5f58, emissiveIntensity: 0.25 }),
  );
  channel.rotation.x = -Math.PI / 2;
  channel.rotation.z = 0.4;
  channel.position.y = 0.06;
  falaj.add(channel);
  // stone banks
  const banks = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.62, 16, 64, Math.PI * 1.2),
    std(0xcfe8d8, { roughness: 0.9 }),
  );
  banks.rotation.x = -Math.PI / 2;
  banks.rotation.z = 0.4;
  banks.position.y = 0.03;
  falaj.add(banks);
  scene.add(falaj);

  // Houses — smooth stylized (rounded roofs via capsules/spheres, bright colors)
  const houseColors = [0xffb54d, 0x3ed6c5, 0xff7a66, 0x8b6fe8, 0xffd93d, 0x4fbf67];
  const positions: [number, number][] = [
    [-4, -4],
    [4, -3],
    [-3, 4],
    [5, 5],
    [-6, 1],
    [3, -7],
  ];
  positions.forEach(([x, z], i) => {
    const house = new THREE.Group();
    const walls = new THREE.Mesh(
      new THREE.CapsuleGeometry(1.05, 1.1, 8, 24),
      std(houseColors[i % houseColors.length]),
    );
    walls.position.y = 1.1;
    walls.scale.y = 0.85;
    house.add(walls);
    const roof = new THREE.Mesh(new THREE.SphereGeometry(1.15, 32, 24), std(0xfff9ee));
    roof.scale.set(1, 0.55, 1);
    roof.position.y = 2.05;
    house.add(roof);
    const door = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.6, 6, 16), std(0x8b5e34));
    door.position.set(0, 0.55, 1.05);
    house.add(door);
    const winL = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), std(0x159aad, { emissive: 0x159aad, emissiveIntensity: 0.4 }));
    winL.position.set(-0.6, 1.2, 0.95);
    house.add(winL);
    const winR = winL.clone();
    winR.position.x = 0.6;
    house.add(winR);
    house.position.set(x, 0, z);
    scene.add(house);
  });

  // Mosque — smooth dome + minaret, cream + turquoise
  const mosque = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 2.2, 32), std(0xfff9ee));
  body.position.y = 1.1;
  mosque.add(body);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 24), std(0x3ed6c5));
  dome.scale.y = 0.85;
  dome.position.y = 2.6;
  mosque.add(dome);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), std(0xffd93d, { emissive: 0xffd93d, emissiveIntensity: 0.4 }));
  finial.position.y = 3.95;
  mosque.add(finial);
  const minaret = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 5, 20), std(0xfff9ee));
  minaret.position.set(2.6, 2.5, 0);
  mosque.add(minaret);
  const minaretCap = new THREE.Mesh(new THREE.SphereGeometry(0.34, 20, 16), std(0x3ed6c5));
  minaretCap.position.set(2.6, 5.1, 0);
  mosque.add(minaretCap);
  mosque.position.set(0, 0, -8);
  scene.add(mosque);
  const mosqueLabel = makeLabelSprite('مسجد القرية · Mosque');
  mosqueLabel.position.set(0, 4.6, -8);
  scene.add(mosqueLabel);

  // Palm trees — smooth trunks + arcing smooth leaves
  const leafMat = std(0x2f9e4f, { side: THREE.DoubleSide });
  const trunkMat = std(0xa9713f);
  for (let i = 0; i < 12; i++) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 3, 16), trunkMat);
    trunk.position.y = 1.5;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), std(0x4fbf67));
    crown.position.y = 3.05;
    tree.add(crown);
    for (let j = 0; j < 7; j++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), leafMat);
      leaf.scale.set(1.1, 0.12, 0.35);
      const ang = (j / 7) * Math.PI * 2;
      leaf.position.set(Math.sin(ang) * 0.9, 3.05 - 0.15, Math.cos(ang) * 0.9);
      leaf.rotation.y = ang;
      leaf.rotation.z = -0.35;
      tree.add(leaf);
    }
    // coconuts
    for (let j = 0; j < 3; j++) {
      const nut = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), std(0x8b5e34));
      nut.position.set(Math.sin(j * 2.1) * 0.2, 2.9, Math.cos(j * 2.1) * 0.2);
      tree.add(nut);
    }
    const angle = (i / 12) * Math.PI * 2;
    tree.position.set(Math.sin(angle) * 8.5, 0, Math.cos(angle) * 8.5);
    tree.rotation.y = angle;
    scene.add(tree);
  }

  // Well — smooth ring + turquoise water
  const well = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.28, 16, 32), std(0xc97b4a));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.35;
  well.add(ring);
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.05, 0.35, 32, 1, true), std(0xc97b4a, { side: THREE.DoubleSide }));
  wall.position.y = 0.18;
  well.add(wall);
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(0.85, 32),
    std(0x3ed6c5, { roughness: 0.15, emissive: 0x0a5f58, emissiveIntensity: 0.3 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.22;
  well.add(water);
  well.position.set(0, 0, 2);
  scene.add(well);
  const wellLabel = makeLabelSprite('بئر النخلة · Well', 'rgba(47,158,79,0.92)');
  wellLabel.position.set(0, 1.6, 2);
  scene.add(wellLabel);

  // NPCs from the novel — smooth capsule bodies + name labels
  const npcs = [
    { name: 'صوفيا · Sophia', color: 0xff69b4 },
    { name: 'ثريا · Thuria', color: 0x2f9e4f },
    { name: 'جون · John', color: 0xff8c00 },
    { name: 'الإسكندر · Alexander', color: 0x4169e1 },
  ];
  npcs.forEach((n, i) => {
    const npc = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.55, 8, 20), std(n.color));
    body.position.y = 0.55;
    npc.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 20), std(0xf5c6a0));
    head.position.y = 1.15;
    npc.add(head);
    const label = makeLabelSprite(n.name, 'rgba(33,50,59,0.88)');
    label.position.y = 1.75;
    npc.add(label);
    npc.position.set(-2.4 + i * 1.6, 0, 0.5);
    scene.add(npc);
  });

  // House labels
  const sophiaHouse = makeLabelSprite('بيت صوفيا', 'rgba(229,89,156,0.9)');
  sophiaHouse.position.set(-4, 3.1, -4);
  scene.add(sophiaHouse);
  const johnHouse = makeLabelSprite('بيت جون', 'rgba(255,179,77,0.95)');
  johnHouse.position.set(4, 3.1, -3);
  scene.add(johnHouse);

  // Floating bright clouds
  for (let i = 0; i < 6; i++) {
    const cloud = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(0.8 - j * 0.15, 20, 16),
        std(0xffffff, { roughness: 1 }),
      );
      puff.position.set(j * 0.9 - 0.9, j === 1 ? 0.25 : 0, 0);
      cloud.add(puff);
    }
    const a = (i / 6) * Math.PI * 2;
    cloud.position.set(Math.sin(a) * 14, 8 + (i % 3), Math.cos(a) * 14);
    scene.add(cloud);
  }
}

export default function VrVillage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sessionRef = useRef<XRSession | null>(null);
  const [vrSupported, setVrSupported] = useState<boolean | null>(null);
  const [inVr, setInVr] = useState(false);
  const [vrMessage, setVrMessage] = useState<string | null>(null);
  const { play } = useSfx();

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 25, 45);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.6, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.xr.enabled = true;
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const hemi = new THREE.HemisphereLight(0xbfefff, 0x58c472, 0.5);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff2d0, 1.1);
    sun.position.set(10, 20, 10);
    scene.add(sun);

    buildVillage(scene);

    // Mouse-look fallback (non-VR)
    const onMouseMove = (e: MouseEvent) => {
      if (renderer.xr.isPresenting) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      camera.rotation.order = 'YXZ';
      camera.rotation.y = mouseX * 0.5;
      camera.rotation.x = mouseY * 0.3;
    };
    document.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      // gentle idle bob of the camera in non-VR
      if (!renderer.xr.isPresenting) camera.position.y = 1.6 + Math.sin(t * 0.8) * 0.02;
      renderer.render(scene, camera);
    });

    // WebXR support check
    const xrNav = navigator as XRNavigator;
    if (xrNav.xr) {
      xrNav.xr
        .isSessionSupported('immersive-vr')
        .then((supported) => setVrSupported(supported))
        .catch(() => setVrSupported(false));
    } else {
      setVrSupported(false);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.setAnimationLoop(null);
      void sessionRef.current?.end().catch(() => undefined);
      sessionRef.current = null;
      mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Sprite) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose?.();
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => {
            const sm = mat as THREE.SpriteMaterial;
            sm.map?.dispose?.();
            mat.dispose();
          });
        }
      });
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  const enterVR = async () => {
    play('magic');
    const xrNav = navigator as XRNavigator;
    if (!xrNav.xr || !rendererRef.current) return;
    try {
      const session = await xrNav.xr.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
      });
      sessionRef.current = session;
      await rendererRef.current.xr.setSession(session);
      setInVr(true);
      session.addEventListener('end', () => {
        sessionRef.current = null;
        setInVr(false);
      });
    } catch {
      setVrMessage(
        '⚠️ لا يوجد جهاز VR متصل. لتجربة VR استخدم: Google Cardboard أو Oculus Quest',
      );
    }
  };

  const exitVR = () => {
    play('click');
    void sessionRef.current?.end().catch(() => undefined);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-foam">
      <div ref={mountRef} style={{ position: 'fixed', inset: 0 }} />

      {!inVr && (
        <>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center bg-paper/90 border-2 border-turquoise/40 px-5 py-2.5 rounded-2xl shadow-md">
            <h1 className="font-display text-base font-extrabold text-ink">
              🥽 جولة افتراضية في قرية النخلة
            </h1>
            <p className="text-xs text-ink/60">
              استخدم الماوس للنظر | اضغط VR للدخول للواقع الافتراضي
            </p>
          </div>

          <Link
            to="/arcade"
            onClick={() => play('click')}
            className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 bg-paper/90 border-2 border-turquoise/40 rounded-full px-3.5 py-2 text-xs font-bold text-deepsea shadow-md hover:bg-turquoise/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            عودة
          </Link>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            {vrMessage && (
              <div className="bg-coral/15 border-2 border-coral/50 text-ink text-xs font-semibold rounded-xl px-4 py-2 max-w-xs text-center">
                {vrMessage}
              </div>
            )}
            <button
              onClick={enterVR}
              disabled={vrSupported === false}
              className="inline-flex items-center gap-2 bg-gradient-to-l from-turquoise to-deepsea text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <Glasses className="w-5 h-5" />
              {vrSupported === false ? '❌ المتصفح لا يدعم VR' : '🥽 دخول VR'}
            </button>
          </div>
        </>
      )}

      {inVr && (
        <button
          onClick={exitVR}
          className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 bg-coral text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      )}
    </div>
  );
}
