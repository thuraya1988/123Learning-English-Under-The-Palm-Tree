import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { animals } from './data';
import { createParticleSystem, createTextTexture, disposeScene } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay } from './ui';

export default function AnimalsWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ next: () => void; prev: () => void } | null>(null);
  const [index, setIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f0a);
    scene.fog = new THREE.FogExp2(0x0a0f0a, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const warmLight = new THREE.PointLight(0xc9a96e, 30, 20);
    warmLight.position.set(3, 5, 5);
    scene.add(warmLight);
    const rimLight = new THREE.DirectionalLight(0x4ade80, 0.4);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const animalGroup = new THREE.Group();
    scene.add(animalGroup);

    let current = 0;

    const clearGroup = () => {
      while (animalGroup.children.length > 0) {
        const child = animalGroup.children[0] as THREE.Mesh;
        if (child.geometry) child.geometry.dispose();
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        if (mat) {
          if (mat.map) mat.map.dispose();
          mat.dispose();
        }
        animalGroup.remove(child);
      }
    };

    const createAnimalScene = (i: number) => {
      clearGroup();
      const animal = animals[i];
      const color = new THREE.Color(animal.color);

      const bodyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1 });
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1, 12, 32), bodyMaterial);
      body.rotation.z = Math.PI / 2;
      animalGroup.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), bodyMaterial);
      head.position.set(0.8, 0.3, 0);
      animalGroup.add(head);

      const legGeometry = new THREE.CylinderGeometry(0.1, 0.08, 0.6, 24);
      [[-0.3, -0.5, 0.2], [-0.3, -0.5, -0.2], [0.3, -0.5, 0.2], [0.3, -0.5, -0.2]].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeometry, bodyMaterial);
        leg.position.set(x, y, z);
        animalGroup.add(leg);
      });

      const statusRing = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 0.96, 64),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
      );
      statusRing.lookAt(camera.position);
      animalGroup.add(statusRing);

      const nameTexture = createTextTexture(animal.name + '\n' + animal.latin, {
        width: 512, height: 256, textColor: animal.color, font: 'bold 36px "Noto Naskh Arabic", serif',
        bgColor1: 'transparent', bgColor2: 'transparent', border: false,
      });
      const nameMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.5, 1.25),
        new THREE.MeshBasicMaterial({ map: nameTexture, transparent: true }),
      );
      nameMesh.position.y = -1.5;
      animalGroup.add(nameMesh);
    };

    createAnimalScene(0);
    createParticleSystem(scene, 100, { color: '#4ade80', range: 8, opacity: 0.3 });

    const switchTo = (i: number) => {
      current = i;
      setIndex(i);
      tweens.to(animalGroup.scale, { x: 0.1, y: 0.1, z: 0.1 }, {
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          createAnimalScene(i);
          tweens.to(animalGroup.scale, { x: 1, y: 1, z: 1 }, { duration: 0.4, ease: 'power2.out' });
        },
      });
    };

    apiRef.current = {
      next: () => switchTo((current + 1) % animals.length),
      prev: () => switchTo((current - 1 + animals.length) % animals.length),
    };

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      animalGroup.rotation.y = Math.sin(time * 0.5) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      tweens.killAll();
      window.removeEventListener('resize', onResize);
      disposeScene(scene, renderer);
    };
  }, []);

  const animal = animals[index];

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.prev()}>⬅️ السابق</GameButton>
        <GameButton onClick={() => setInfoOpen(true)}>ℹ️ معلومات</GameButton>
        <GameButton onClick={() => apiRef.current?.next()}>التالي ➡️</GameButton>
      </div>
      <InfoOverlay open={infoOpen} onClose={() => setInfoOpen(false)}>
        <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
          {animal.name}
        </h2>
        <p className="text-[#7c3aed] text-base mb-2 italic">{animal.latin}</p>
        <p className="mb-4">
          الحالة: <span className="text-[#c9a96e]">{animal.status}</span> — السنة: {animal.year}
        </p>
        <p className="opacity-80 leading-loose">{animal.desc}</p>
      </InfoOverlay>
    </div>
  );
}
