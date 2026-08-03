import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { omaniFigures, type OmaniFigure } from './data';
import { createParticleSystem, disposeScene, eventToNdc, findUserData, wrapArabicText } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay } from './ui';

function createCardTexture(figure: OmaniFigure, isBack: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  if (isBack) {
    const gradient = ctx.createLinearGradient(0, 0, 512, 768);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#2a1a4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 768);
    ctx.strokeStyle = '#c9a96e';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 472, 728);
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, 392, 648);
    ctx.fillStyle = '#c9a96e';
    ctx.font = '120px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌴', 256, 384);
    ctx.font = '40px serif';
    ctx.fillText('✦', 40, 40);
    ctx.fillText('✦', 472, 40);
    ctx.fillText('✦', 40, 728);
    ctx.fillText('✦', 472, 728);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 512, 768);
    gradient.addColorStop(0, '#2a1a4e');
    gradient.addColorStop(0.5, '#1a0a2e');
    gradient.addColorStop(1, '#0a0a15');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 768);
    ctx.strokeStyle = figure.color || '#c9a96e';
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, 482, 738);
    ctx.fillStyle = figure.color || '#c9a96e';
    ctx.font = '100px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(figure.symbol, 256, 200);
    ctx.fillStyle = '#f5f0e8';
    ctx.font = 'bold 32px "Noto Naskh Arabic", serif';
    wrapArabicText(ctx, figure.name, 400, 256, 350);
    ctx.fillStyle = figure.color || '#c9a96e';
    ctx.font = '22px "Noto Naskh Arabic", serif';
    ctx.fillText(figure.role, 256, 480);
    ctx.fillStyle = 'rgba(245, 240, 232, 0.5)';
    ctx.font = '18px "Outfit", sans-serif';
    ctx.fillText(figure.year, 256, 550);
    ctx.fillStyle = 'rgba(201, 169, 110, 0.3)';
    ctx.fillRect(156, 600, 200, 1);
    ctx.fillStyle = '#c9a96e';
    ctx.font = '30px serif';
    ctx.fillText('✦', 256, 640);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface CardData {
  figure: OmaniFigure;
  index: number;
  originalPos: THREE.Vector3;
  originalRotY: number;
  isSelected: boolean;
}

export default function TarotGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ shuffle: () => void; reset: () => void; deselectAll: () => void } | null>(null);
  const [selected, setSelected] = useState<OmaniFigure | null>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const showDetail = useCallback((figure: OmaniFigure) => setSelected(figure), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a15);
    scene.fog = new THREE.FogExp2(0x0a0a15, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const spotLight = new THREE.SpotLight(0xc9a96e, 60, 40, Math.PI / 6, 0.5, 1);
    spotLight.position.set(5, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    const purpleLight = new THREE.PointLight(0x7c3aed, 20, 20);
    purpleLight.position.set(-5, 5, 5);
    scene.add(purpleLight);

    const cards: THREE.Group[] = [];
    const cardGeometry = new THREE.PlaneGeometry(1.4, 2.0);
    omaniFigures.forEach((figure, index) => {
      const frontTexture = createCardTexture(figure, false);
      const backTexture = createCardTexture(figure, true);
      const cardGroup = new THREE.Group();
      const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture, side: THREE.FrontSide, roughness: 0.4, metalness: 0.1 });
      const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture, side: THREE.FrontSide, roughness: 0.4, metalness: 0.1 });
      const frontMesh = new THREE.Mesh(cardGeometry, frontMaterial);
      frontMesh.position.z = 0.01;
      const backMesh = new THREE.Mesh(cardGeometry, backMaterial);
      backMesh.rotation.y = Math.PI;
      backMesh.position.z = -0.01;
      cardGroup.add(frontMesh, backMesh);
      const angle = (index - (omaniFigures.length - 1) / 2) * 0.35;
      const radius = 5;
      cardGroup.position.set(Math.sin(angle) * radius, Math.sin(index * 0.5) * 0.3, Math.cos(angle) * radius - 3);
      cardGroup.rotation.y = -angle * 0.5;
      const data: CardData = {
        figure,
        index,
        originalPos: cardGroup.position.clone(),
        originalRotY: cardGroup.rotation.y,
        isSelected: false,
      };
      cardGroup.userData.cardData = data;
      scene.add(cardGroup);
      cards.push(cardGroup);
    });

    createParticleSystem(scene, 200, { color: '#c9a96e', range: 15 });

    const raycaster = new THREE.Raycaster();

    const deselectCard = (card: THREE.Group) => {
      const data = card.userData.cardData as CardData;
      data.isSelected = false;
      tweens.to(card.rotation, { y: data.originalRotY }, { duration: 0.6, ease: 'power2.inOut' });
      tweens.to(card.position, { x: data.originalPos.x, y: data.originalPos.y, z: data.originalPos.z }, { duration: 0.6, ease: 'power2.out' });
      tweens.to(card.scale, { x: 1, y: 1, z: 1 }, { duration: 0.6, ease: 'power2.out' });
    };

    const selectCard = (card: THREE.Group) => {
      const data = card.userData.cardData as CardData;
      data.isSelected = true;
      tweens.to(card.rotation, { y: card.rotation.y + Math.PI }, { duration: 0.8, ease: 'power2.inOut' });
      tweens.to(card.position, { x: 0, y: 0.5, z: 4 }, { duration: 0.8, ease: 'power2.out' });
      tweens.to(card.scale, { x: 1.3, y: 1.3, z: 1.3 }, { duration: 0.8, ease: 'power2.out' });
      window.setTimeout(() => showDetail(data.figure), 900);
    };

    const pickCard = (ndc: THREE.Vector2) => {
      raycaster.setFromCamera(ndc, camera);
      const intersects = raycaster.intersectObjects(cards, true);
      if (intersects.length > 0) {
        const card = findUserData(intersects[0].object, 'cardData') as THREE.Group | null;
        if (!card) return;
        const data = card.userData.cardData as CardData;
        if (data.isSelected) {
          deselectCard(card);
        } else {
          cards.forEach((c) => {
            if ((c.userData.cardData as CardData).isSelected && c !== card) deselectCard(c);
          });
          selectCard(card);
        }
      }
    };

    const onClick = (event: MouseEvent) => pickCard(eventToNdc(event, renderer.domElement));
    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      pickCard(eventToNdc(event.touches[0], renderer.domElement));
    };
    const onTouchMove = (event: TouchEvent) => event.preventDefault();
    const onMouseMove = (event: MouseEvent) => {
      const ndc = eventToNdc(event, renderer.domElement);
      raycaster.setFromCamera(ndc, camera);
      const intersects = raycaster.intersectObjects(cards, true);
      let hovering = false;
      cards.forEach((card) => {
        const data = card.userData.cardData as CardData;
        if (data.isSelected) return;
        const isHovered = intersects.length > 0 && (intersects[0].object === card || intersects[0].object.parent === card);
        if (isHovered) {
          hovering = true;
          tweens.to(card.scale, { x: 1.1, y: 1.1, z: 1.1 }, { duration: 0.3 });
        } else {
          tweens.to(card.scale, { x: 1, y: 1, z: 1 }, { duration: 0.3 });
        }
      });
      document.body.style.cursor = hovering ? 'pointer' : 'default';
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
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });

    apiRef.current = {
      shuffle: () => {
        cards.forEach((card, index) => {
          const data = card.userData.cardData as CardData;
          if (data.isSelected) deselectCard(card);
          const newAngle = (Math.random() - 0.5) * Math.PI;
          const newRadius = 4 + Math.random() * 3;
          const newX = Math.sin(newAngle) * newRadius;
          const newZ = Math.cos(newAngle) * newRadius - 2;
          const newY = (Math.random() - 0.5) * 2;
          tweens.to(card.position, { x: newX, y: newY, z: newZ }, { duration: 1, ease: 'power2.inOut', delay: index * 0.05 });
          tweens.to(card.rotation, { y: newAngle * 0.5 + (Math.random() - 0.5) * 0.5 }, { duration: 1, ease: 'power2.inOut', delay: index * 0.05 });
          data.originalPos.set(newX, newY, newZ);
          data.originalRotY = newAngle * 0.5;
        });
      },
      reset: () => {
        cards.forEach((card, index) => {
          const data = card.userData.cardData as CardData;
          if (data.isSelected) deselectCard(card);
          const angle = (index - (omaniFigures.length - 1) / 2) * 0.35;
          const radius = 5;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - 3;
          const y = Math.sin(index * 0.5) * 0.3;
          tweens.to(card.position, { x, y, z }, { duration: 0.8, ease: 'power2.inOut', delay: index * 0.05 });
          tweens.to(card.rotation, { y: -angle * 0.5 }, { duration: 0.8, ease: 'power2.inOut', delay: index * 0.05 });
          data.originalPos.set(x, y, z);
          data.originalRotY = -angle * 0.5;
        });
      },
      deselectAll: () => {
        cards.forEach((card) => {
          if ((card.userData.cardData as CardData).isSelected) deselectCard(card);
        });
      },
    };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      cards.forEach((card, index) => {
        const data = card.userData.cardData as CardData;
        if (!data.isSelected) {
          card.position.y = data.originalPos.y + Math.sin(time + index) * 0.1;
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
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      document.body.style.cursor = 'default';
      disposeScene(scene, renderer);
    };
  }, [showDetail]);

  return (
    <div>
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.shuffle()}>🔀 خلط الأوراق</GameButton>
        <GameButton onClick={() => apiRef.current?.reset()}>↩️ إعادة الترتيب</GameButton>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <InfoOverlay
        open={selected !== null}
        onClose={() => {
          setSelected(null);
          apiRef.current?.deselectAll();
        }}
      >
        {selected && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              {selected.symbol} {selected.name}
            </h2>
            <p className="text-[#7c3aed] text-base mb-4">{selected.role}</p>
            <p className="opacity-80 leading-loose mb-4">{selected.bio}</p>
            <p className="opacity-50 text-xs">{selected.year}</p>
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
