import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { omanHistory, historyYears } from './data';
import { createParticleSystem, createTextTexture, disposeScene, eventToNdc } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay, TagChips } from './ui';

export default function TimeWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<(year: number) => void>(() => {});
  const [currentYear, setCurrentYear] = useState(2024);
  const [infoYear, setInfoYear] = useState<number | null>(null);

  const showInfo = useCallback((year: number) => setInfoYear(year), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0a0a);
    scene.fog = new THREE.FogExp2(0x0f0a0a, 0.03);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const warmLight = new THREE.PointLight(0xc9a96e, 30, 30);
    warmLight.position.set(5, 5, 5);
    scene.add(warmLight);
    const coolLight = new THREE.PointLight(0x7c3aed, 15, 20);
    coolLight.position.set(-5, 3, 3);
    scene.add(coolLight);

    // Window frame
    const frameGroup = new THREE.Group();
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.8 });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.2, 0.3), frameMaterial);
    frame.position.z = -0.2;
    frame.castShadow = true;
    frameGroup.add(frame);
    const paneGeometry = new THREE.PlaneGeometry(1.8, 2.3);
    const paneMaterial = new THREE.MeshPhysicalMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.15, roughness: 0.1, metalness: 0.1 });
    [[-1, 1.2], [1, 1.2], [-1, -1.2], [1, -1.2]].forEach(([x, y]) => {
      const pane = new THREE.Mesh(paneGeometry, paneMaterial);
      pane.position.set(x, y, 0);
      frameGroup.add(pane);
    });
    const barMaterial = new THREE.MeshStandardMaterial({ color: 0x2a1a0a });
    const barH = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 0.15), barMaterial);
    barH.position.z = 0.1;
    const barV = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 0.15), barMaterial);
    barV.position.z = 0.1;
    frameGroup.add(barH, barV);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 0.8), frameMaterial);
    sill.position.set(0, -2.7, 0.3);
    frameGroup.add(sill);
    scene.add(frameGroup);

    const windowGroup = new THREE.Group();
    scene.add(windowGroup);

    const disposables: Array<{ dispose: () => void }> = [];

    const createYearScene = (year: number) => {
      while (windowGroup.children.length > 0) {
        const child = windowGroup.children[0] as THREE.Mesh;
        windowGroup.remove(child);
      }
      const data = omanHistory[year];
      const color = new THREE.Color(data.color);

      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = 512;
      bgCanvas.height = 512;
      const bgCtx = bgCanvas.getContext('2d')!;
      const bgGrad = bgCtx.createLinearGradient(0, 0, 0, 512);
      bgGrad.addColorStop(0, data.color);
      bgGrad.addColorStop(1, '#0a0a0f');
      bgCtx.fillStyle = bgGrad;
      bgCtx.fillRect(0, 0, 512, 512);
      bgCtx.fillStyle = 'rgba(255,255,255,0.1)';
      bgCtx.font = 'bold 80px serif';
      bgCtx.textAlign = 'center';
      bgCtx.fillText(year.toString(), 256, 200);
      const bgTexture = new THREE.CanvasTexture(bgCanvas);
      const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 4.6), new THREE.MeshBasicMaterial({ map: bgTexture }));
      bgPlane.position.z = -0.1;
      windowGroup.add(bgPlane);

      // Smooth floating orbs (refined: spheres instead of boxes)
      for (let i = 0; i < 8; i++) {
        const size = 0.12 + Math.random() * 0.18;
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(size, 32, 32),
          new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.4 }),
        );
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1 + Math.random() * 0.5;
        mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, Math.random() * 2 - 1);
        mesh.userData = { originalY: mesh.position.y, speed: 0.5 + Math.random(), offset: Math.random() * Math.PI * 2 };
        windowGroup.add(mesh);
      }

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 48, 48),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.7 }),
      );
      sphere.position.z = 0.5;
      sphere.userData = { isCentral: true, year };
      windowGroup.add(sphere);

      const labelTexture = createTextTexture(year.toString(), {
        width: 256, height: 128, textColor: '#ffffff', font: 'bold 48px serif',
        bgColor1: 'transparent', bgColor2: 'transparent', border: false,
      });
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.75),
        new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, opacity: 0.8 }),
      );
      label.position.set(0, -1.8, 0.3);
      windowGroup.add(label);
      disposables.push(bgTexture, labelTexture);
    };

    createYearScene(2024);
    createParticleSystem(scene, 150, { color: '#c9a96e', range: 10, opacity: 0.4 });

    travelRef.current = (year: number) => {
      setCurrentYear(year);
      tweens.to(windowGroup.scale, { x: 0.1, y: 0.1, z: 0.1 }, {
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          createYearScene(year);
          tweens.to(windowGroup.scale, { x: 1, y: 1, z: 1 }, { duration: 0.5, ease: 'power2.out' });
        },
      });
      window.setTimeout(() => showInfo(year), 600);
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(windowGroup.children, true);
      if (intersects.length > 0 && intersects[0].object.userData.isCentral) {
        showInfo(intersects[0].object.userData.year as number);
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
      windowGroup.children.forEach((child) => {
        if (child.userData.originalY !== undefined) {
          child.position.y = child.userData.originalY + Math.sin(time * child.userData.speed + child.userData.offset) * 0.2;
          child.rotation.x = Math.sin(time * 0.5 + child.userData.offset) * 0.3;
          child.rotation.y = Math.cos(time * 0.3 + child.userData.offset) * 0.3;
        }
        if (child.userData.isCentral) {
          child.rotation.y = time * 0.5;
        }
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
      disposables.forEach((d) => d.dispose());
    };
  }, [showInfo]);

  const info = infoYear !== null ? omanHistory[infoYear] : null;

  return (
    <div>
      <div className="flex justify-center gap-4 p-4 flex-wrap">
        {historyYears.map((year) => (
          <GameButton key={year} active={year === currentYear} onClick={() => travelRef.current(year)}>
            {year}
          </GameButton>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 p-4 mx-auto max-w-3xl">
        {historyYears.map((year, i) => (
          <div key={year} className="contents">
            {i > 0 && <div className="flex-1 h-0.5 max-w-24 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />}
            <button
              onClick={() => travelRef.current(year)}
              data-year={year}
              title={String(year)}
              className={
                year === currentYear
                  ? 'group relative w-4 h-4 rounded-full bg-[#c9a96e] border-2 border-[#c9a96e] scale-125 transition-all duration-300'
                  : 'group relative w-4 h-4 rounded-full bg-[rgba(201,169,110,0.3)] border-2 border-[#c9a96e] hover:bg-[#c9a96e] hover:scale-125 transition-all duration-300'
              }
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {year}
              </span>
            </button>
          </div>
        ))}
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <InfoOverlay open={info !== null} onClose={() => setInfoYear(null)}>
        {info && infoYear !== null && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              عام {infoYear}
            </h2>
            <p className="text-[#7c3aed] text-lg mb-4">{info.title}</p>
            <p className="opacity-80 leading-loose">{info.desc}</p>
            <TagChips items={info.tags} />
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
