import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createParticleSystem, createTextTexture, disposeScene, eventToNdc } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay } from './ui';

const portalColors = [0xc9a96e, 0x7c3aed, 0x4ade80, 0xf4a6c0, 0x64b4dc];

export default function PalmPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ enter: () => void; rotate: () => void; changeColor: () => void } | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.03);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const portalLight = new THREE.PointLight(portalColors[0], 40, 20);
    portalLight.position.set(0, 0, 2);
    scene.add(portalLight);

    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    let currentPortalColor = 0;
    const localDisposables: Array<{ dispose: () => void }> = [];

    const clearPortal = () => {
      while (portalGroup.children.length > 0) {
        const child = portalGroup.children[0] as THREE.Mesh;
        if (child.geometry) child.geometry.dispose();
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        if (mat) {
          if (mat.map) mat.map.dispose();
          mat.dispose();
        }
        portalGroup.remove(child);
      }
    };

    const createPortal = () => {
      clearPortal();
      const color = new THREE.Color(portalColors[currentPortalColor]);
      portalLight.color = color;

      const outerRing = new THREE.Mesh(
        new THREE.TorusGeometry(2, 0.1, 24, 128),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8, roughness: 0.3, metalness: 0.7 }),
      );
      portalGroup.add(outerRing);

      const innerRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.5, 0.05, 24, 128),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.7 }),
      );
      innerRing.rotation.x = Math.PI / 2;
      portalGroup.add(innerRing);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 48, 48),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.3, roughness: 0.1, metalness: 0.9 }),
      );
      portalGroup.add(sphere);

      const palmTexture = createTextTexture('🌴', {
        width: 128, height: 128, font: '80px serif', textColor: '#ffffff',
        bgColor1: 'transparent', bgColor2: 'transparent', border: false,
      });
      localDisposables.push(palmTexture);
      const palm = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ map: palmTexture, transparent: true }),
      );
      palm.position.z = 0.5;
      portalGroup.add(palm);
    };

    createPortal();
    const portalParticles = createParticleSystem(scene, 300, { color: '#c9a96e', range: 8, opacity: 0.6 });

    const enter = () => {
      tweens.to(portalGroup.scale, { x: 0.1, y: 0.1, z: 0.1 }, { duration: 0.5, ease: 'power2.in' });
      window.setTimeout(() => {
        setEntered(true);
        tweens.to(portalGroup.scale, { x: 1, y: 1, z: 1 }, { duration: 0.5, ease: 'power2.out' });
      }, 500);
    };

    apiRef.current = {
      enter,
      rotate: () => {
        tweens.to(portalGroup.rotation, { y: portalGroup.rotation.y + Math.PI * 2 }, { duration: 2, ease: 'power2.inOut' });
      },
      changeColor: () => {
        currentPortalColor = (currentPortalColor + 1) % portalColors.length;
        createPortal();
      },
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(portalGroup.children, true);
      if (intersects.length > 0) enter();
    };
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('click', onClick);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      portalGroup.rotation.z = time * 0.5;
      if (portalGroup.children[0]) portalGroup.children[0].rotation.z = time * 0.3;
      if (portalGroup.children[1]) portalGroup.children[1].rotation.x = Math.PI / 2 + Math.sin(time) * 0.2;
      if (portalGroup.children[2]) portalGroup.children[2].scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      portalParticles.rotation.y = time * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      tweens.killAll();
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);
      disposeScene(scene, renderer);
      localDisposables.forEach((d) => d.dispose());
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.enter()}>✨ دخول</GameButton>
        <GameButton onClick={() => apiRef.current?.rotate()}>🌀 دوران</GameButton>
        <GameButton onClick={() => apiRef.current?.changeColor()}>🎨 لون جديد</GameButton>
      </div>
      <InfoOverlay open={entered} onClose={() => setEntered(false)}>
        <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
          🌴 أهلاً بك في عالم Under Palm Tree
        </h2>
        <p className="opacity-80 leading-loose mt-4">
          لقد دخلت البوابة السحرية! هنا تبدأ رحلتك في عالم القرية الرقمية.
          <br />
          <br />
          اكتشف الألعاب التعليمية، تعلم عن التراث العماني، واستمتع بالمغامرة.
        </p>
        <div className="mt-6">
          <GameButton onClick={() => setEntered(false)}>ابدأ المغامرة 🚀</GameButton>
        </div>
      </InfoOverlay>
    </div>
  );
}
