import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { treasures, type Treasure } from './data';
import { createParticleSystem, disposeScene, eventToNdc } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay, TagChips, Toast, useToast } from './ui';

export default function FrankincenseTreasure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ explore: () => void; collect: () => void; findTreasure: () => void } | null>(null);
  const [found, setFound] = useState<{ treasure: Treasure; total: number } | null>(null);
  const [toast, showToast] = useToast();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1f0a);
    scene.fog = new THREE.FogExp2(0x0a1f0a, 0.04);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sunLight = new THREE.DirectionalLight(0xffd700, 1);
    sunLight.position.set(5, 10, 5);
    scene.add(sunLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(15, 64),
      new THREE.MeshStandardMaterial({ color: 0x1a3a1a, roughness: 0.9 }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const cacaoGroup = new THREE.Group();
    scene.add(cacaoGroup);

    const trees: THREE.Group[] = [];
    let totalPoints = 0;
    let collectedResin = 0;

    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5a3c, roughness: 0.55 });
    const resinMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a96e, emissive: 0xc9a96e, emissiveIntensity: 0.5, roughness: 0.3 });

    for (let i = 0; i < 8; i++) {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 3, 24), trunkMaterial);
      trunk.position.y = 1.5;
      treeGroup.add(trunk);

      const leaf = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), leafMaterial);
      leaf.position.y = 3.5;
      treeGroup.add(leaf);

      const resinGeometry = new THREE.SphereGeometry(0.11, 20, 20);
      for (let j = 0; j < 3; j++) {
        const resin = new THREE.Mesh(resinGeometry, resinMaterial);
        resin.position.set(0.25, 1 + j * 0.5, 0);
        resin.userData = { isResin: true, treeIndex: i };
        treeGroup.add(resin);
      }

      treeGroup.position.set((Math.random() - 0.5) * 12, 0, (Math.random() - 0.5) * 12 - 3);
      treeGroup.userData = { hasTreasure: Math.random() > 0.7, treeIndex: i };
      cacaoGroup.add(treeGroup);
      trees.push(treeGroup);
    }

    createParticleSystem(scene, 100, { color: '#4ade80', range: 15, opacity: 0.3 });

    const doCollect = () => {
      collectedResin += 1;
      totalPoints += 10;
      trees.forEach((tree) => {
        tree.children.forEach((child) => {
          if (child.userData && child.userData.isResin) {
            tweens.to(child.scale, { x: 1.5, y: 1.5, z: 1.5 }, { duration: 0.3, yoyo: true, repeat: 1 });
          }
        });
      });
      showToast('جمعت ' + collectedResin + ' صمغة! النقاط: ' + totalPoints);
    };

    const doFindTreasure = () => {
      if (collectedResin < 5) {
        showToast('تحتاج 5 صمغات على الأقل للبحث عن الكنز!');
        return;
      }
      collectedResin -= 5;
      const treasure = treasures[Math.floor(Math.random() * treasures.length)];
      totalPoints += treasure.points;
      setFound({ treasure, total: totalPoints });
    };

    apiRef.current = {
      explore: () => {
        const randomTree = trees[Math.floor(Math.random() * trees.length)];
        tweens.to(camera.position, { x: randomTree.position.x, z: randomTree.position.z + 3 }, { duration: 1.5, ease: 'power2.out' });
      },
      collect: doCollect,
      findTreasure: doFindTreasure,
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(cacaoGroup.children, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj.userData.treeIndex === undefined) {
          obj = obj.parent;
        }
        if (obj && obj.userData.hasTreasure) {
          doFindTreasure();
        } else if (intersects[0].object.userData && intersects[0].object.userData.isResin) {
          doCollect();
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
      trees.forEach((tree, i) => {
        tree.rotation.y = Math.sin(time * 0.2 + i) * 0.05;
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
        <GameButton onClick={() => apiRef.current?.explore()}>🧭 استكشاف</GameButton>
        <GameButton onClick={() => apiRef.current?.collect()}>🫧 جمع الصمغ</GameButton>
        <GameButton onClick={() => apiRef.current?.findTreasure()}>💎 البحث عن الكنز</GameButton>
      </div>
      <Toast message={toast} />
      <InfoOverlay open={found !== null} onClose={() => setFound(null)}>
        {found && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              🌟 {found.treasure.title}
            </h2>
            <p className="opacity-80 leading-loose mt-4 whitespace-pre-line">
              {found.treasure.desc}
              {'\n\n'}
              نقاطك: {found.total}
            </p>
            <TagChips items={found.treasure.items} />
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
