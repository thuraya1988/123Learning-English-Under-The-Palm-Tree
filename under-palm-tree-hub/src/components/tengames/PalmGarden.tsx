import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createParticleSystem, disposeScene } from './shared';
import { TweenManager } from './tween';
import { GameButton } from './ui';

export default function PalmGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ plant: () => void; water: () => void; harvest: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1f15);
    scene.fog = new THREE.FogExp2(0x0a1f15, 0.04);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sunLight = new THREE.DirectionalLight(0xffd700, 1.2);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(15, 64),
      new THREE.MeshStandardMaterial({ color: 0x1a3a2f, roughness: 0.9 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const palms: THREE.Group[] = [];
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.55 });
    const dateMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5 });

    const createPalm = (x: number, z: number) => {
      const palmGroup = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 2, 24), trunkMaterial);
      trunk.position.y = 1;
      trunk.castShadow = true;
      palmGroup.add(trunk);

      const leafGeometry = new THREE.ConeGeometry(0.5, 1.5, 24);
      for (let i = 0; i < 6; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.y = 2;
        leaf.rotation.z = Math.PI / 3;
        leaf.rotation.y = (i / 6) * Math.PI * 2;
        leaf.position.x = Math.cos(leaf.rotation.y) * 0.3;
        leaf.position.z = Math.sin(leaf.rotation.y) * 0.3;
        leaf.castShadow = true;
        palmGroup.add(leaf);
      }

      const dateGeometry = new THREE.SphereGeometry(0.09, 20, 20);
      for (let i = 0; i < 8; i++) {
        const date = new THREE.Mesh(dateGeometry, dateMaterial);
        date.position.y = 1.8;
        date.position.x = Math.cos((i / 8) * Math.PI * 2) * 0.4;
        date.position.z = Math.sin((i / 8) * Math.PI * 2) * 0.4;
        date.userData.isDate = true;
        palmGroup.add(date);
      }

      palmGroup.position.set(x, 0, z);
      scene.add(palmGroup);
      palms.push(palmGroup);
    };

    for (let i = 0; i < 5; i++) {
      createPalm((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    }

    createParticleSystem(scene, 100, { color: '#4ade80', range: 15, opacity: 0.3 });

    apiRef.current = {
      plant: () => {
        const x = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;
        createPalm(x, z);
        const palm = palms[palms.length - 1];
        palm.scale.set(0.001, 0.001, 0.001);
        tweens.to(palm.scale, { x: 1, y: 1, z: 1 }, { duration: 0.8, ease: 'back.out' });
      },
      water: () => {
        palms.forEach((palm) => {
          tweens.to(palm.scale, { x: 1.2, y: 1.2, z: 1.2 }, { duration: 0.3, yoyo: true, repeat: 1 });
        });
      },
      harvest: () => {
        palms.forEach((palm) => {
          palm.children.forEach((child) => {
            if (child.userData.isDate && child.scale.x < 2) {
              tweens.to(child.scale, { x: 1.5, y: 1.5, z: 1.5 }, { duration: 0.5, ease: 'elastic.out' });
            }
          });
        });
      },
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
      palms.forEach((palm, i) => {
        palm.rotation.y = Math.sin(time * 0.3 + i) * 0.05;
      });
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

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.plant()}>🌱 زرع نخلة</GameButton>
        <GameButton onClick={() => apiRef.current?.water()}>💧 ري</GameButton>
        <GameButton onClick={() => apiRef.current?.harvest()}>🌴 حصاد</GameButton>
      </div>
    </div>
  );
}
