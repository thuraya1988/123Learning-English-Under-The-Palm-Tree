import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { shops, type Shop } from './data';
import { createParticleSystem, createTextTexture, disposeScene, eventToNdc, findUserData } from './shared';
import { TweenManager } from './tween';
import { GameButton, InfoOverlay, TagChips } from './ui';

export default function HeritageMarket() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ left: () => void; right: () => void; enter: () => void } | null>(null);
  const [shopIndex, setShopIndex] = useState(0);
  const [openShop, setOpenShop] = useState<Shop | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tweens = new TweenManager();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1510);
    scene.fog = new THREE.FogExp2(0x1a1510, 0.04);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const warmLight = new THREE.PointLight(0xffd700, 40, 20);
    warmLight.position.set(5, 8, 5);
    scene.add(warmLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(20, 64),
      new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.9 }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const heritageGroup = new THREE.Group();
    scene.add(heritageGroup);

    let currentShopIndex = 0;

    shops.forEach((shop, index) => {
      const shopGroup = new THREE.Group();
      const color = new THREE.Color(shop.color);

      const shopMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2.5, 1.5),
        new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
      );
      shopMesh.position.y = 1.25;
      shopGroup.add(shopMesh);

      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.2, 1),
        new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.7 }),
      );
      awning.position.set(0, 2.6, 0.8);
      shopGroup.add(awning);

      const signTexture = createTextTexture(shop.name, {
        width: 256, height: 64, font: 'bold 20px "Noto Naskh Arabic", serif',
        textColor: '#ffffff', bgColor1: shop.color, bgColor2: shop.color, border: false,
      });
      const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 0.45),
        new THREE.MeshBasicMaterial({ map: signTexture }),
      );
      sign.position.set(0, 2.8, 0.76);
      shopGroup.add(sign);

      shop.items.forEach((item, i) => {
        const itemMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 24, 24),
          new THREE.MeshStandardMaterial({ color: 0xc9a96e, emissive: 0xc9a96e, emissiveIntensity: 0.2, roughness: 0.4 }),
        );
        itemMesh.position.set(-0.6 + i * 0.6, 1.5, 0.8);
        itemMesh.userData = { item, shopIndex: index };
        shopGroup.add(itemMesh);
      });

      shopGroup.position.set((index - 2) * 4, 0, -2);
      shopGroup.userData = { shop, index };
      heritageGroup.add(shopGroup);
    });

    createParticleSystem(scene, 80, { color: '#ffaa44', range: 12, opacity: 0.4 });

    const enterCurrent = () => {
      setOpenShop(shops[currentShopIndex]);
    };

    apiRef.current = {
      left: () => {
        tweens.to(heritageGroup.position, { x: heritageGroup.position.x + 4 }, { duration: 0.8, ease: 'power2.out' });
        currentShopIndex = Math.max(0, currentShopIndex - 1);
        setShopIndex(currentShopIndex);
      },
      right: () => {
        tweens.to(heritageGroup.position, { x: heritageGroup.position.x - 4 }, { duration: 0.8, ease: 'power2.out' });
        currentShopIndex = Math.min(shops.length - 1, currentShopIndex + 1);
        setShopIndex(currentShopIndex);
      },
      enter: enterCurrent,
    };

    const raycaster = new THREE.Raycaster();
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(eventToNdc(event, renderer.domElement), camera);
      const intersects = raycaster.intersectObjects(heritageGroup.children, true);
      if (intersects.length > 0) {
        const obj = findUserData(intersects[0].object, 'shop');
        if (obj) {
          currentShopIndex = obj.userData.index as number;
          setShopIndex(currentShopIndex);
          enterCurrent();
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
      heritageGroup.children.forEach((shopG, i) => {
        shopG.children.forEach((child) => {
          if (child.userData && child.userData.item) {
            child.position.y = 1.5 + Math.sin(time * 2 + i) * 0.1;
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
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '70vh', position: 'relative' }} />
      <p className="text-center text-[#c9a96e] opacity-70 text-sm mb-2">
        المحل الحالي: {shops[shopIndex].name}
      </p>
      <div className="flex justify-center gap-4 p-4 mb-4 flex-wrap">
        <GameButton onClick={() => apiRef.current?.left()}>⬅️ يسار</GameButton>
        <GameButton onClick={() => apiRef.current?.enter()}>🚪 دخول المحل</GameButton>
        <GameButton onClick={() => apiRef.current?.right()}>يمين ➡️</GameButton>
      </div>
      <InfoOverlay open={openShop !== null} onClose={() => setOpenShop(null)}>
        {openShop && (
          <>
            <h2 className="text-[#c9a96e] text-3xl mb-4" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              {openShop.name}
            </h2>
            <p className="text-[#7c3aed] text-base mb-4">{openShop.type}</p>
            <p className="opacity-80 leading-loose">{openShop.desc}</p>
            <TagChips items={openShop.items} />
          </>
        )}
      </InfoOverlay>
    </div>
  );
}
