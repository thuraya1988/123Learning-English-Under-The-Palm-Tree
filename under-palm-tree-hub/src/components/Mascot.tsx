import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

/**
 * "Fulous" the green sea turtle.
 * Default export: 2D image for HUD / DOM contexts.
 * `Fulous3D`: smooth, squishy stylized 3D version for R3F scenes.
 */
export default function Mascot({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <img
      src="/mascot-fulous.png"
      alt="Fulous the green sea turtle"
      className={className}
    />
  );
}

interface Fulous3DProps {
  position?: [number, number, number];
  scale?: number;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

const BODY = '#7BC96F';
const DARK = '#4E9E4F';
const SHELL = '#2E8B74';
const BELLY = '#F3E5C0';
const BRASS = '#D9A441';

/** Procedural smooth Fulous: bobbing, blinking, waving flipper. */
export function Fulous3D({
  position = [0, 0, 0],
  scale = 1,
  onClick,
  onPointerOver,
  onPointerOut,
}: Fulous3DProps) {
  const g = useRef<Group>(null);
  const eyeL = useRef<Group>(null);
  const eyeR = useRef<Group>(null);
  const flipper = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (g.current) g.current.position.y = position[1] + Math.sin(t * 1.8) * 0.05;
    // blink every ~3s
    const blink = Math.sin(t * 2.1) > 0.985 ? 0.15 : 1;
    if (eyeL.current) eyeL.current.scale.y = blink;
    if (eyeR.current) eyeR.current.scale.y = blink;
    // wave flipper
    if (flipper.current)
      flipper.current.rotation.z = -0.5 + Math.sin(t * 3) * 0.35;
  });

  return (
    <group
      ref={g}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* shell */}
      <mesh castShadow position={[0, 0.28, -0.12]}>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.1} />
      </mesh>
      {/* woven shell trim */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.42, 0.42, -0.12 + Math.sin(a) * 0.42]}
            rotation={[Math.PI / 2, 0, -a]}
          >
            <coneGeometry args={[0.07, 0.1, 16]} />
            <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.6} />
          </mesh>
        );
      })}
      {/* belly */}
      <mesh position={[0, 0.1, 0.18]}>
        <sphereGeometry args={[0.4, 32, 24]} />
        <meshStandardMaterial color={BELLY} roughness={0.6} metalness={0} />
      </mesh>
      {/* head */}
      <mesh castShadow position={[0, 0.42, 0.5]}>
        <sphereGeometry args={[0.34, 32, 24]} />
        <meshStandardMaterial color={BODY} roughness={0.5} metalness={0.05} />
      </mesh>
      {/* eyes */}
      {([-0.13, 0.13] as const).map((x, i) => (
        <group
          key={x}
          ref={i === 0 ? eyeL : eyeR}
          position={[x, 0.5, 0.74]}
        >
          <mesh>
            <sphereGeometry args={[0.09, 24, 18]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.045, 16, 12]} />
            <meshStandardMaterial color="#21323B" roughness={0.15} metalness={0.1} />
          </mesh>
        </group>
      ))}
      {/* flippers */}
      <mesh position={[-0.5, 0.1, 0.15]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.15, 0.48, 16]} />
        <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.05} />
      </mesh>
      <group ref={flipper} position={[0.5, 0.3, 0.15]}>
        <mesh position={[0.18, 0.12, 0]} rotation={[0, 0, -1.2]}>
          <coneGeometry args={[0.15, 0.48, 16]} />
          <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.05} />
        </mesh>
      </group>
      {/* back legs */}
      {([-0.3, 0.3] as const).map((x) => (
        <mesh key={x} position={[x, 0.02, -0.45]}>
          <sphereGeometry args={[0.14, 24, 18]} />
          <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
