import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { perfumes, type Perfume } from './data';
import { createParticleSystem, createTextTexture, disposeScene, eventToNdc, findUserData } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay, TagChips, Toast, useToast } from './ui';

export default function PerfumeGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ collect: () => void; distill: () => void; mix: () => void } | null>(null);
  const [activePerfume, setActivePerfume] = useState<Perfume | null>(null);
  const [toast, showToast] = useToast();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0a0a);
    scene.fog = new THREE.FogExp2(0x0f0a0a, 0.03);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const warmLight = new THREE.PointLight(0xc9a96e, 30, 20);
    warmLight.position.set(3, 5, 3);
    scene.add(warmLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(10, 64),
      new THREE.MeshStandardMaterial({ color: 0x1a0a10, roughness: 0.9 }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const perfumeGroup = new THREE.Group();
    scene.add(perfumeGroup);

    const flowers: THREE.Group[] = [];
    let collectedFrankincense = 0;

    perfumes.forEach((perfume, index) => {
      const flowerGroup = new THREE.Group();
      const color = new THREE.Color(perfume.color);

      const petalGeometry = new THREE.SphereGeometry(0.3, 24, 24);
      const petalMaterial = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, roughness: 0.4 });
      for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        const angle = (i / 5) * Math.PI * 2;
        petal.position.set(Math.cos(angle) * 0.4, 0.5, Math.sin(angle) * 0.4);
        petal.scale.y = 0.5;
        petal.userData.isPetal = true;
        flowerGroup.add(petal);
      }

      const center = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.5, roughness: 0.3 }),
      );
      center.position.y = 0.5;
      flowerGroup.add(center);

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1, 16),
        new THREE.MeshStandardMaterial({ color: 0x2d5a3c, roughness: 0.7 }),
      );
      stem.position.y = 0;
      flowerGroup.add(stem);

      const labelTexture = createTextTexture(perfume.name, {
        width: 256, height: 64, font: 'bold 18px "Noto Naskh Arabic", serif',
        textColor: '#ffffff', bgColor1: 'transparent', bgColor2: 'transparent', border: false,
      });
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.375),
        new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true }),
      );
      label.position.y = -0.8;
      flowerGroup.add(label);

      flowerGroup.position.set((index - 1.5) * 2.5, 0, -1);
      flowerGroup.userData = { perfume, index };
      perfumeGroup.add(flowerGroup);
      flowers.push(flowerGroup);
    });

    createParticleSystem(scene, 150, { color: '#c9a96e', range: 10, opacity: 0.5 });

    const showPerfume = (perfume: Perfume) => setActivePerfume(perfume);

    apiRef.current = {
      collect: () => {
        collectedFrankincense += 1;
        flowers.forEach((flower) => {
          tweens.to(flower.scale, { x: 1.2, y: 1.2, z: 1.2 }, { duration: 0.3, yoyo: true, repeat: 1 });
        });
        showToast('جمعت ' + collectedFrankincense + ' قطعة لبان!');
      },
      distill: () => {
        if (collectedFrankincense < 3) {
          showToast('تحتاج على الأقل 3 قطع لبان للتقطير!');
          return;
        }
        collectedFrankincense -= 3;
        flowers.forEach((flower) => {
          const petal = flower.children[0] as THREE.Mesh;
          const mat = petal.material as THREE.MeshStandardMaterial;
          tweens.to(mat, { emissiveIntensity: 1 }, { duration: 1, yoyo: true, repeat: 1 });
        });
        showToast('تم تقطير العطر بنجاح!');
      },
      mix: () => {
        showPerfume(perfumes[Math.floor(Math.random() * perfumes.length)]);
      },
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(perfumeGroup.children, true);
      if (intersects.length > 0) {
        const obj = findUserData(intersects[0].object, 'perfume');
        if (obj) showPerfume(obj.userData.perfume as Perfume);
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
      flowers.forEach((flower, i) => {
        flower.rotation.y = Math.sin(time * 0.5 + i) * 0.1;
        flower.children.forEach((child, j) => {
          if (child.userData.isPetal) {
            child.position.y = 0.5 + Math.sin(time * 2 + i + j) * 0.05;
          }
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.collect()}>🌿 جمع اللبان</GameButton>
        <GameButton onClick={() => apiRef.current?.distill()}>⚗️ تقطير</GameButton>
        <GameButton onClick={() => apiRef.current?.mix()}>🌸 مزج العطر</GameButton>
      </div>
      <Toast message={toast} />
      <InfoOverlay open={activePerfume !== null} onClose={() => setActivePerfume(null)}>
        {activePerfume && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              {activePerfume.name}
            </h2>
            <p className="opacity-80 leading-loose">{activePerfume.desc}</p>
            <TagChips items={activePerfume.ingredients} />
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
