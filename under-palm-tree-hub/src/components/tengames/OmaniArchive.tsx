import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { scrolls, type Scroll } from './data';
import { createParticleSystem, createTextTexture, disposeScene, eventToNdc, findUserData } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay } from './ui';

export default function OmaniArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ next: () => void; prev: () => void; open: () => void } | null>(null);
  const [openScroll, setOpenScroll] = useState<Scroll | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const candleLight = new THREE.PointLight(0xffaa44, 40, 15);
    candleLight.position.set(0, 3, 3);
    scene.add(candleLight);

    const darwinGroup = new THREE.Group();
    scene.add(darwinGroup);
    const scrollMeshes: THREE.Group[] = [];
    let currentScrollIndex = 0;

    scrolls.forEach((scroll, index) => {
      const scrollGroup = new THREE.Group();

      const scrollMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 2, 32),
        new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.8 }),
      );
      scrollMesh.rotation.z = Math.PI / 2;
      scrollGroup.add(scrollMesh);

      const endGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 32);
      const endMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.6 });
      const end1 = new THREE.Mesh(endGeometry, endMaterial);
      end1.rotation.z = Math.PI / 2;
      end1.position.x = -1;
      const end2 = new THREE.Mesh(endGeometry, endMaterial);
      end2.rotation.z = Math.PI / 2;
      end2.position.x = 1;
      scrollGroup.add(end1, end2);

      const labelTexture = createTextTexture(scroll.title, {
        width: 256, height: 64, font: 'bold 16px "Noto Naskh Arabic", serif',
        textColor: '#8b4513', bgColor1: 'transparent', bgColor2: 'transparent', border: false,
      });
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.375),
        new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true }),
      );
      label.position.y = -0.8;
      scrollGroup.add(label);

      scrollGroup.position.set((index - 1.5) * 2.5, 0, -1);
      scrollGroup.userData = { scroll, index };
      darwinGroup.add(scrollGroup);
      scrollMeshes.push(scrollGroup);
    });

    createParticleSystem(scene, 100, { color: '#ffaa44', range: 8, opacity: 0.3 });

    apiRef.current = {
      open: () => setOpenScroll(scrolls[currentScrollIndex]),
      next: () => {
        currentScrollIndex = (currentScrollIndex + 1) % scrolls.length;
        tweens.to(darwinGroup.position, { x: -currentScrollIndex * 2.5 }, { duration: 0.8, ease: 'power2.out' });
      },
      prev: () => {
        currentScrollIndex = (currentScrollIndex - 1 + scrolls.length) % scrolls.length;
        tweens.to(darwinGroup.position, { x: -currentScrollIndex * 2.5 }, { duration: 0.8, ease: 'power2.out' });
      },
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(darwinGroup.children, true);
      if (intersects.length > 0) {
        const obj = findUserData(intersects[0].object, 'scroll');
        if (obj) {
          currentScrollIndex = obj.userData.index as number;
          setOpenScroll(scrolls[currentScrollIndex]);
        }
      }
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
      scrollMeshes.forEach((scroll, i) => {
        scroll.rotation.y = Math.sin(time * 0.3 + i) * 0.1;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      tweens.killAll();
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);
      disposeScene(scene, renderer);
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.prev()}>⬅️ السابق</GameButton>
        <GameButton onClick={() => apiRef.current?.open()}>📜 فتح</GameButton>
        <GameButton onClick={() => apiRef.current?.next()}>التالي ➡️</GameButton>
      </div>
      <InfoOverlay open={openScroll !== null} onClose={() => setOpenScroll(null)}>
        {openScroll && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              {openScroll.title}
            </h2>
            <p className="text-[#7c3aed] text-base mb-4">المؤلف: {openScroll.author}</p>
            <p className="opacity-80 leading-loose text-lg">{openScroll.content}</p>
            <p className="opacity-50 text-xs mt-4">التاريخ: {openScroll.year}</p>
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
