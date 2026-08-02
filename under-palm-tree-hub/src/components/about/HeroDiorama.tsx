import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Float, Sparkles } from '@react-three/drei';
import type { Group } from 'three';

/* Low-poly mini diorama: palm island + dhow + fort tower on clouds. */
function Diorama() {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.getElapsedTime() * 0.18;
  });
  return (
    <group ref={g} position={[0, -0.6, 0]}>
      {/* island */}
      <mesh castShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.7, 1.1, 1, 10]} />
        <meshStandardMaterial color="#2F9E4F" flatShading />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.7, 1.7, 0.18, 10]} />
        <meshStandardMaterial color="#4FBF67" flatShading />
      </mesh>
      {/* falaj swirl */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0.1, 0.5]}>
        <circleGeometry args={[0.45, 10]} />
        <meshStandardMaterial color="#3ED6C5" />
      </mesh>
      {/* palm */}
      <group position={[-0.7, 0.1, -0.4]}>
        <mesh castShadow position={[0, 0.55, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.09, 0.16, 1.1, 6]} />
          <meshStandardMaterial color="#8A5A33" flatShading />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              castShadow
              position={[Math.cos(a) * 0.32 - 0.18, 1.15, Math.sin(a) * 0.32]}
              rotation={[0.7, -a, 0]}
            >
              <coneGeometry args={[0.16, 0.8, 4]} />
              <meshStandardMaterial color={i % 2 ? '#2F9E4F' : '#9FE870'} flatShading />
            </mesh>
          );
        })}
      </group>
      {/* dhow */}
      <group position={[0.9, 0.1, 0.8]} rotation={[0, -0.7, 0]} scale={0.85}>
        <mesh castShadow scale={[1, 0.5, 2.2]}>
          <sphereGeometry args={[0.4, 7, 5]} />
          <meshStandardMaterial color="#8A5A33" flatShading />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1, 5]} />
          <meshStandardMaterial color="#5C3A1E" flatShading />
        </mesh>
        <mesh castShadow position={[0.02, 0.6, 0]} rotation={[0, 0, -0.15]}>
          <coneGeometry args={[0.4, 0.8, 3]} />
          <meshStandardMaterial color="#FFF9EE" flatShading />
        </mesh>
      </group>
      {/* fort tower */}
      <group position={[-0.2, 0.35, 0.75]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.42, 0.85, 8]} />
          <meshStandardMaterial color="#C97B4A" flatShading />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.38, 0.32, 0.14, 8]} />
          <meshStandardMaterial color="#A95F3B" flatShading />
        </mesh>
      </group>
      {/* frankincense tree */}
      <group position={[0.6, 0.1, -0.7]} scale={0.8}>
        <mesh castShadow position={[0, 0.25, 0]} rotation={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.08, 0.13, 0.6, 6]} />
          <meshStandardMaterial color="#8A5A33" flatShading />
        </mesh>
        <mesh castShadow position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.36, 7, 5]} />
          <meshStandardMaterial color="#1F5C45" flatShading />
        </mesh>
      </group>
      <Sparkles count={30} scale={[4, 3, 4]} position={[0, 1.2, 0]} size={2.5} speed={0.3} color="#FFD93D" />
    </group>
  );
}

export default function HeroDiorama({ className }: { className?: string }) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2.4, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <fog attach="fog" args={['#BDEFF2', 9, 20]} />
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#BDEFF2', '#7CB98A', 0.7]} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.2}
          color="#FFE3B3"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
            <Diorama />
          </Float>
          <Cloud position={[-2.4, -1.5, -1]} speed={0.15} opacity={0.55} segments={12} color="#EAFDF9" />
          <Cloud position={[2.6, -1.2, -1.5]} speed={0.2} opacity={0.5} segments={12} color="#ffffff" />
          <Cloud position={[0, -1.9, 0.5]} speed={0.18} opacity={0.45} segments={14} color="#EAFDF9" />
        </Suspense>
      </Canvas>
    </div>
  );
}
