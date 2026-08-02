import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { globeLocations } from './data';
import { createParticleSystem, disposeScene, eventToNdc, findUserData } from './shared';
import { TweenManager } from './tween';
import { GameButton, Toast, useToast } from './ui';

export default function OmanGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ toggleRotate: () => void; resetView: () => void } | null>(null);
  const [toast, showToast] = useToast(4000);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Canvas earth texture (same continents as original)
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512;
    earthCanvas.height = 256;
    const eCtx = earthCanvas.getContext('2d')!;
    eCtx.fillStyle = '#1a3a5c';
    eCtx.fillRect(0, 0, 512, 256);
    eCtx.fillStyle = '#2d5a3c';
    eCtx.fillRect(220, 100, 80, 60);
    eCtx.fillRect(240, 80, 40, 30);
    eCtx.fillRect(300, 60, 120, 80);
    eCtx.fillRect(260, 40, 60, 40);
    eCtx.fillRect(60, 60, 50, 100);
    eCtx.fillRect(80, 40, 30, 40);
    eCtx.fillRect(420, 140, 50, 30);
    eCtx.fillStyle = '#c9a96e';
    eCtx.fillRect(265, 105, 15, 10);
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 96, 96),
      new THREE.MeshStandardMaterial({ map: earthTexture, roughness: 0.7, metalness: 0.1 }),
    );
    scene.add(earthMesh);

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.62, 96, 96),
      new THREE.MeshBasicMaterial({ color: 0x4a9acc, transparent: true, opacity: 0.1, side: THREE.BackSide }),
    );
    scene.add(atmosphereMesh);

    createParticleSystem(scene, 500, { color: '#ffffff', range: 20, opacity: 0.8, pointSize: 0.02 });

    globeLocations.forEach((loc) => {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lon + 180) * (Math.PI / 180);
      const radius = 1.52;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xc9a96e, emissive: 0xc9a96e, emissiveIntensity: 0.8, roughness: 0.3 }),
      );
      marker.position.set(x, y, z);
      marker.userData.location = loc;

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.07, 0.095, 48),
        new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
      );
      ring.position.set(x, y, z);
      ring.lookAt(0, 0, 0);
      marker.add(ring);
      earthMesh.add(marker);
    });

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    let isRotating = true;
    apiRef.current = {
      toggleRotate: () => {
        isRotating = !isRotating;
      },
      resetView: () => {
        tweens.to(camera.position, { x: 0, y: 0, z: 5 }, { duration: 1, ease: 'power2.out' });
        tweens.to(earthMesh.rotation, { x: 0, y: 0, z: 0 }, { duration: 1, ease: 'power2.out' });
      },
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(earthMesh.children, true);
      if (intersects.length > 0) {
        const obj = findUserData(intersects[0].object, 'location');
        if (obj) {
          const loc = obj.userData.location as { name: string; desc: string };
          showToast(`${loc.name} — ${loc.desc}\n\nمصدر البث: Windy Webcams API (مجاني)`);
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
      if (isRotating) {
        earthMesh.rotation.y += 0.002;
        atmosphereMesh.rotation.y += 0.002;
      }
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
        <GameButton onClick={() => apiRef.current?.toggleRotate()}>🌍 دوران</GameButton>
        <GameButton onClick={() => apiRef.current?.resetView()}>🔄 إعادة</GameButton>
      </div>
      <Toast message={toast} />
    </div>
  );
}
