import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Text, Sky, Cloud } from '@react-three/drei';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { Fulous3D } from '@/components/Mascot';
import { GAMES } from '@/lib/questions';
import type { GameId } from '@/lib/store';
import { useGameStore } from '@/lib/store';
import type { SfxName } from '@/lib/sfx';

/* ---------- palette ---------- */
const GRASS = '#4FBF67';
const GRASS_D = '#2F9E4F';
const GRASS_L = '#9FE870';
const WATER = '#3ED6C5';
const DEEPSEA = '#159AAD';
const FOAM = '#EAFDF9';
const STONE = '#C9C2B4';
const CLAY = '#A95F3B';
const TERRA = '#C97B4A';
const DOOR = '#1E8C82';
const TRUNK = '#8A5A33';
const FUCH = '#E5599C';

/** positions of the six landmarks/portals */
export const PORTAL_SPOTS: Record<GameId, [number, number]> = {
  falaj: [-6.5, 4.5],
  souq: [-8.5, -1.5],
  dhow: [7.5, -5.5],
  bahla: [0.5, -8],
  cave: [8.5, 2.5],
  khareef: [-6, -7],
};

interface HubProps {
  onPortalClick: (id: GameId) => void;
  onPortalHover: (id: GameId | null) => void;
  onMascotClick: () => void;
  play: (n: SfxName) => void;
}

/** Glossy animated water: gentle opacity shimmer, smooth highlights. */
function WaterMaterial({ opacity = 0.92 }: { opacity?: number }) {
  const ref = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.opacity = opacity + Math.sin(t * 1.6) * 0.05;
      ref.current.emissiveIntensity = 0.28 + Math.sin(t * 2.2) * 0.08;
    }
  });
  return (
    <meshStandardMaterial
      ref={ref}
      color={WATER}
      emissive={WATER}
      emissiveIntensity={0.3}
      roughness={0.12}
      metalness={0.3}
      transparent
      opacity={opacity}
    />
  );
}

/* ---------- ground island ---------- */
function Island() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[16, 48]} />
        <meshStandardMaterial roughness={0.9} metalness={0} color={GRASS} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[16, 12, 2.2, 32]} />
        <meshStandardMaterial roughness={0.9} metalness={0} color={GRASS_D} />
      </mesh>
      {(
        [
          [-3, 2, 2.2],
          [4, 4.5, 1.8],
          [-1, -4, 2.6],
          [6, 0.5, 1.6],
        ] as const
      ).map(([x, z, r], i) => (
        <mesh key={i} receiveShadow position={[x, 0.05, z]}>
          <sphereGeometry args={[r, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={i % 2 ? GRASS : GRASS_L} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <circleGeometry args={[60, 48]} />
        <meshStandardMaterial roughness={0.2} metalness={0.3} color={DEEPSEA} />
      </mesh>
    </group>
  );
}

/* ---------- falaj channel ---------- */
const CHANNEL_PTS: [number, number][] = [
  [0, -10.5],
  [-1.5, -7],
  [-3.2, -3.5],
  [-4.6, 0],
  [-5.6, 2.5],
  [-6.2, 4.2],
];

function Channel() {
  const chevrons = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    chevrons.current?.children.forEach((c, i) => {
      const p = (t * 0.35 + i / 8) % 1;
      const seg = Math.min(
        CHANNEL_PTS.length - 2,
        Math.floor(p * (CHANNEL_PTS.length - 1)),
      );
      const f = p * (CHANNEL_PTS.length - 1) - seg;
      const [x1, z1] = CHANNEL_PTS[seg];
      const [x2, z2] = CHANNEL_PTS[seg + 1];
      c.position.set(x1 + (x2 - x1) * f, 0.09, z1 + (z2 - z1) * f);
      c.rotation.y = Math.atan2(x2 - x1, z2 - z1);
    });
  });
  return (
    <group>
      {CHANNEL_PTS.slice(0, -1).map(([x1, z1], i) => {
        const [x2, z2] = CHANNEL_PTS[i + 1];
        const len = Math.hypot(x2 - x1, z2 - z1);
        return (
          <group
            key={i}
            position={[(x1 + x2) / 2, 0, (z1 + z2) / 2]}
            rotation={[0, Math.atan2(x2 - x1, z2 - z1), 0]}
          >
            <mesh receiveShadow position={[0, 0.04, 0]}>
              <boxGeometry args={[0.9, 0.1, len + 0.4]} />
              <meshStandardMaterial roughness={0.55} metalness={0.06} color={STONE} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <boxGeometry args={[0.55, 0.06, len + 0.4]} />
              <WaterMaterial />
            </mesh>
          </group>
        );
      })}
      <group ref={chevrons}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.09, 3]} />
            <meshBasicMaterial color={FOAM} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SpringHouse() {
  return (
    <group position={[0, 0, -10.8]}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.6, 1, 1.4]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={STONE} />
      </mesh>
      <mesh castShadow position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.3, 0.8, 4]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={CLAY} />
      </mesh>
    </group>
  );
}

function Bridge({
  position,
  rotY = 0,
}: {
  position: [number, number, number];
  rotY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.8, 0.18, 0.9]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={TERRA} />
      </mesh>
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} castShadow position={[x, 0.15, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.3, 32]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={CLAY} />
        </mesh>
      ))}
    </group>
  );
}

function Pond() {
  const frog = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (frog.current)
      frog.current.position.y = Math.max(0, Math.sin(t * 2.2)) * 0.35 + 0.12;
  });
  return (
    <group position={[-7.5, 0, 6.5]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial roughness={0.2} metalness={0.3} color={DEEPSEA} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <circleGeometry args={[2.1, 48]} />
        <WaterMaterial />
      </mesh>
      {(
        [
          [-0.8, 0.5],
          [0.9, -0.6],
          [0.3, 1.2],
        ] as const
      ).map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, i]} position={[x, 0.1, z]}>
          <circleGeometry args={[0.35, 48]} />
          <meshStandardMaterial roughness={0.9} metalness={0} color={GRASS_D} />
        </mesh>
      ))}
      <group ref={frog} position={[0.9, 0.12, -0.6]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={GRASS_L} />
        </mesh>
        <mesh position={[0, 0.14, 0.1]}>
          <sphereGeometry args={[0.06, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- palms & flora ---------- */
function Palm({
  position,
  s = 1,
  phase = 0,
}: {
  position: [number, number, number];
  s?: number;
  phase?: number;
}) {
  const fronds = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fronds.current) fronds.current.rotation.z = Math.sin(t + phase) * 0.06;
  });
  return (
    <group position={position} scale={s}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          castShadow
          position={[Math.sin(i * 0.25) * 0.25, 0.35 + i * 0.55, 0]}
        >
          <cylinderGeometry
            args={[0.16 - i * 0.015, 0.19 - i * 0.015, 0.6, 6]}
          />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={TRUNK} />
        </mesh>
      ))}
      <group ref={fronds} position={[Math.sin(4 * 0.25) * 0.25, 3.2, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              castShadow
              position={[Math.cos(a) * 0.8, -0.15, Math.sin(a) * 0.8]}
              rotation={[Math.PI / 5, -a + Math.PI / 2, 0]}
            >
              <coneGeometry args={[0.28, 1.9, 4]} />
              <meshStandardMaterial
                color={i % 2 ? GRASS_D : GRASS}
               
              />
            </mesh>
          );
        })}
        <mesh>
          <sphereGeometry args={[0.22, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color="#B5651D" />
        </mesh>
      </group>
    </group>
  );
}

function Bush({
  position,
  color = FUCH,
}: {
  position: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      {(
        [
          [-0.3, 0.2, 0],
          [0.3, 0.22, 0.1],
          [0, 0.4, -0.15],
        ] as const
      ).map(([x, y, z], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <sphereGeometry args={[0.32, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={color} />
        </mesh>
      ))}
    </group>
  );
}

function GrassTuft({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[(i - 1) * 0.12, 0.15, 0]}
          rotation={[0, 0, (i - 1) * 0.25]}
        >
          <coneGeometry args={[0.07, 0.35, 4]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={GRASS_L} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- water wheel (falaj garden) ---------- */
function WaterWheel({ position }: { position: [number, number, number] }) {
  const wheel = useRef<Group>(null);
  useFrame((_, dt) => {
    if (wheel.current) wheel.current.rotation.z += dt * 0.8;
  });
  return (
    <group position={position} rotation={[0, 0.6, 0]}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={TRUNK} />
      </mesh>
      <group ref={wheel} position={[0, 1, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.55, 0.09, 16, 64]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={CLAY} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
            <boxGeometry args={[0.08, 1.1, 0.12]} />
            <meshStandardMaterial roughness={0.55} metalness={0.06} color={TRUNK} />
          </mesh>
        ))}
      </group>
      {(
        [
          [-1, 0.6],
          [-0.6, 1],
          [0.9, 0.8],
        ] as const
      ).map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 32]} />
            <meshStandardMaterial roughness={0.9} metalness={0} color={GRASS_D} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.12, 32, 24]} />
            <meshStandardMaterial roughness={0.55} metalness={0.06} color={i % 2 ? '#FFD93D' : FUCH} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- souq ---------- */
function Souq({ position }: { position: [number, number, number] }) {
  const awnings = [FUCH, '#FFB54D', DOOR];
  return (
    <group position={position} rotation={[0, 0.9, 0]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[(i - 1) * 2.1, 0, (i % 2) * 0.5]}>
          <mesh castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[1.6, 1, 1.1]} />
            <meshStandardMaterial roughness={0.55} metalness={0.06} color="#CAA27A" />
          </mesh>
          <mesh castShadow position={[0, 1.25, 0.25]} rotation={[0.35, 0, 0]}>
            <boxGeometry args={[1.8, 0.08, 1]} />
            <meshStandardMaterial roughness={0.55} metalness={0.06} color={awnings[i]} />
          </mesh>
          <mesh position={[0.6, 1.05, 0.6]}>
            <sphereGeometry args={[0.12, 32, 24]} />
            <meshStandardMaterial
              color="#FFD93D"
              emissive="#FFD93D"
              emissiveIntensity={0.9}
             
            />
          </mesh>
          {[-0.4, 0.15].map((x, j) => (
            <mesh key={j} castShadow position={[x, 0.18, 0.75]}>
              <sphereGeometry args={[0.18, 32, 24]} />
              <meshStandardMaterial roughness={0.55} metalness={0.06} color={j ? TERRA : CLAY} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ---------- dhow harbor ---------- */
function Harbor({ position }: { position: [number, number, number] }) {
  const dhow = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dhow.current) {
      dhow.current.position.y = 0.15 + Math.sin(t * 1.3) * 0.12;
      dhow.current.rotation.z = Math.sin(t * 1.1) * 0.05;
    }
  });
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.05, -1.5]}>
        <circleGeometry args={[4, 48]} />
        <meshStandardMaterial roughness={0.2} metalness={0.3} color={DEEPSEA} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.07, -1.5]}>
        <circleGeometry args={[3.6, 48]} />
        <WaterMaterial />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]} rotation={[0, -0.7, 0]}>
        <boxGeometry args={[0.9, 0.15, 3.2]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={TRUNK} />
      </mesh>
      <group ref={dhow} position={[2.2, 0.15, -2.2]} rotation={[0, 0.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.45, 0.7]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={CLAY} />
        </mesh>
        <mesh castShadow position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 32]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color="#5C3A21" />
        </mesh>
        <mesh castShadow position={[0.35, 1.1, 0]} rotation={[0, 0, -0.15]}>
          <coneGeometry args={[0.55, 1.4, 3]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color="#FFF9EE" side={2} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Bahla fort ---------- */
function Fort({ position }: { position: [number, number, number] }) {
  const lantern = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = lantern.current?.material as
      | { emissiveIntensity?: number }
      | undefined;
    if (m && m.emissiveIntensity !== undefined)
      m.emissiveIntensity = 0.7 + Math.sin(t * 2) * 0.25;
  });
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 3, 32]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={TERRA} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            castShadow
            position={[Math.cos(a) * 1.35, 3.2, Math.sin(a) * 1.35]}
          >
            <boxGeometry args={[0.35, 0.4, 0.35]} />
            <meshStandardMaterial roughness={0.55} metalness={0.06} color={TERRA} />
          </mesh>
        );
      })}
      <mesh castShadow position={[0, 0.7, 1.75]}>
        <boxGeometry args={[0.9, 1.4, 0.15]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={DOOR} />
      </mesh>
      {[-0.9, 0.9].map((x) => (
        <mesh
          key={x}
          ref={x < 0 ? lantern : undefined}
          position={[x, 1.2, 1.7]}
        >
          <sphereGeometry args={[0.14, 32, 24]} />
          <meshStandardMaterial
            color="#FFB54D"
            emissive="#FFB54D"
            emissiveIntensity={0.8}
           
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- jinn cave ---------- */
function Cave({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.9, 0]}>
      <mesh castShadow position={[0, 1, -0.6]}>
        <sphereGeometry args={[2.6, 32, 24]} />
        <meshStandardMaterial roughness={0.9} metalness={0} color={GRASS_D} />
      </mesh>
      <mesh position={[0, 0.8, 1.5]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color="#2B2D5C" />
      </mesh>
      {(
        [
          [-1.2, 0.3, 1.6, 0.7],
          [1.1, 0.25, 1.8, 0.5],
          [0.4, 0.2, 2.3, 0.4],
        ] as const
      ).map(([x, y, z, h], i) => (
        <mesh
          key={i}
          castShadow
          position={[x, y + h / 2, z]}
          rotation={[0, i, 0.15]}
        >
          <coneGeometry args={[0.18, h, 5]} />
          <meshStandardMaterial
            color="#7DF9E8"
            emissive="#7DF9E8"
            emissiveIntensity={1.1}
           
          />
        </mesh>
      ))}
      <Sparkles
        count={24}
        scale={[4, 3, 4]}
        position={[0, 1.5, 1]}
        size={4}
        speed={0.4}
        color="#7DF9E8"
      />
    </group>
  );
}

/* ---------- khareef mountain ---------- */
function Mountain({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} castShadow position={[0, 0.5 + i * 0.8, -i * 0.4]}>
          <cylinderGeometry args={[2.6 - i * 0.7, 3 - i * 0.7, 0.9, 32]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color={i % 2 ? GRASS : GRASS_D} />
        </mesh>
      ))}
      <mesh position={[0.9, 1.4, 1.4]}>
        <boxGeometry args={[0.25, 1.6, 0.08]} />
        <meshStandardMaterial
          color={FOAM}
          emissive={FOAM}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh castShadow position={[-0.6, 2.6, -0.6]}>
        <cylinderGeometry args={[0.09, 0.12, 0.9, 32]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color="#7A5230" />
      </mesh>
      {(
        [
          [-0.9, 3.2, -0.6],
          [-0.3, 3.3, -0.5],
          [-0.6, 3.45, -0.9],
        ] as const
      ).map(([x, y, z], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <sphereGeometry args={[0.35, 32, 24]} />
          <meshStandardMaterial roughness={0.55} metalness={0.06} color="#3E8E5A" />
        </mesh>
      ))}
      {[-0.75, -0.5].map((x, i) => (
        <mesh key={i} position={[x, 2.9, -0.35]}>
          <sphereGeometry args={[0.06, 32, 24]} />
          <meshStandardMaterial
            color="#FFD93D"
            emissive="#FFD93D"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      <Cloud
        position={[0, 3.4, 0]}
        speed={0.2}
        opacity={0.35}
        segments={8}
        bounds={[3, 0.6, 2]}
        color="#CFE8D8"
      />
    </group>
  );
}

/* ---------- portal ---------- */
function Portal({
  id,
  onClick,
  onHover,
  play,
}: {
  id: GameId;
  onClick: (id: GameId) => void;
  onHover: (id: GameId | null) => void;
  play: (n: SfxName) => void;
}) {
  const meta = GAMES.find((g) => g.id === id)!;
  const [x, z] = PORTAL_SPOTS[id];
  const ring = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const stars = useGameStore((s) =>
    Object.values(s.games[id].stars).reduce((a, b) => a + b, 0),
  );

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    if (ring.current) {
      ring.current.rotation.y += dt * (hovered ? 2.2 : 0.5);
      ring.current.position.y = 1.7 + Math.sin(t * 1.5) * 0.15;
      const target = hovered ? 1.08 : 1;
      ring.current.scale.setScalar(
        ring.current.scale.x + (target - ring.current.scale.x) * 0.15,
      );
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh receiveShadow castShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.9, 1.05, 0.3, 32]} />
        <meshStandardMaterial roughness={0.55} metalness={0.06} color={STONE} />
      </mesh>
      <group ref={ring} position={[0, 1.7, 0]}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(id);
            play('hover');
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            play('magic');
            onClick(id);
          }}
        >
          <torusGeometry args={[0.85, 0.12, 16, 64]} />
          <meshStandardMaterial
            color={meta.accent}
            emissive={meta.accent}
            emissiveIntensity={hovered ? 1.4 : 0.8}
           
          />
        </mesh>
        <mesh>
          <circleGeometry args={[0.78, 48]} />
          <meshBasicMaterial
            color={meta.accent}
            transparent
            opacity={hovered ? 0.4 : 0.22}
          />
        </mesh>
        <Sparkles count={14} scale={2.2} size={5} speed={0.5} color={meta.accent} />
      </group>
      <Text
        position={[0, 3, 0]}
        fontSize={0.34}
        color="#21323B"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#FFF9EE"
      >
        {`${meta.title} · ${meta.cefr}`}
      </Text>
      {stars > 0 && (
        <Text
          position={[0, 2.62, 0]}
          fontSize={0.22}
          color="#D9A441"
          anchorX="center"
        >
          {`★ ${stars}`}
        </Text>
      )}
    </group>
  );
}

/* ---------- gulls & butterflies ---------- */
function Gulls() {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g.current?.children.forEach((c, i) => {
      const a = t * 0.25 + (i * Math.PI * 2) / 5;
      c.position.set(
        7.5 + Math.cos(a) * 5,
        5 + Math.sin(t + i) * 0.4,
        -5.5 + Math.sin(a) * 5,
      );
      c.rotation.y = -a;
    });
  });
  return (
    <group ref={g}>
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={i}>
          <mesh rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.5, 0.04, 0.12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh rotation={[0, 0, -0.4]} position={[0.35, 0, 0]}>
            <boxGeometry args={[0.5, 0.04, 0.12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Butterflies() {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g.current?.children.forEach((c, i) => {
      c.position.set(
        -6.5 + Math.sin(t * 0.7 + i * 2) * 1.5,
        1 + Math.sin(t * 2 + i) * 0.4,
        4.5 + Math.cos(t * 0.5 + i * 3) * 1.5,
      );
      const flap = Math.abs(Math.sin(t * 10 + i)) * 0.8;
      (c.children[0] as Mesh).rotation.z = flap;
      (c.children[1] as Mesh).rotation.z = -flap;
    });
  });
  return (
    <group ref={g}>
      {[FUCH, '#FFD93D', '#8B6FE8'].map((col, i) => (
        <group key={i}>
          <mesh position={[-0.08, 0, 0]}>
            <circleGeometry args={[0.1, 3]} />
            <meshBasicMaterial color={col} side={2} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <circleGeometry args={[0.1, 3]} />
            <meshBasicMaterial color={col} side={2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- wandering Fulous ---------- */
const TURTLE_PATH: [number, number][] = [
  [-7, 5.2],
  [-4, 3],
  [-2, 0.5],
  [-5, -0.5],
  [-7.5, 1.5],
];

function WanderingFulous({
  onMascotClick,
  play,
}: {
  onMascotClick: () => void;
  play: (n: SfxName) => void;
}) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.06;
    const p = t % 1;
    const seg = Math.floor(p * TURTLE_PATH.length);
    const f = p * TURTLE_PATH.length - seg;
    const [x1, z1] = TURTLE_PATH[seg % TURTLE_PATH.length];
    const [x2, z2] = TURTLE_PATH[(seg + 1) % TURTLE_PATH.length];
    if (g.current) {
      g.current.position.set(x1 + (x2 - x1) * f, 0, z1 + (z2 - z1) * f);
      g.current.rotation.y = Math.atan2(x2 - x1, z2 - z1);
    }
  });
  return (
    <group ref={g}>
      <Fulous3D
        onClick={() => {
          play('click');
          onMascotClick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      />
    </group>
  );
}

/* ---------- controls: auto-rotate pauses 4s on interaction ---------- */
function Controls() {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const resumeAt = useRef(0);
  useFrame(() => {
    if (controls.current)
      controls.current.autoRotate = performance.now() > resumeAt.current;
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      enablePan={false}
      minPolarAngle={0.9}
      maxPolarAngle={1.35}
      minDistance={8}
      maxDistance={26}
      autoRotate
      autoRotateSpeed={0.3}
      onStart={() => {
        resumeAt.current = performance.now() + 4000;
      }}
    />
  );
}

/* ---------- main scene ---------- */
export default function HubWorld({
  onPortalClick,
  onPortalHover,
  onMascotClick,
  play,
}: HubProps) {
  const palms = useMemo(() => {
    let s = 42;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    const out: { pos: [number, number, number]; s: number; phase: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const a = rand() * Math.PI * 2;
      const r = 10.5 + rand() * 4;
      out.push({
        pos: [Math.cos(a) * r, 0, Math.sin(a) * r],
        s: 0.8 + rand() * 0.5,
        phase: rand() * Math.PI * 2,
      });
    }
    return out;
  }, []);

  return (
    <>
      <Sky sunPosition={[-30, 18, -20]} turbidity={6} rayleigh={2.5} />
      <Cloud position={[-12, 9, -14]} speed={0.15} opacity={0.5} segments={10} bounds={[5, 1, 3]} color="#ffffff" />
      <Cloud position={[12, 10, -8]} speed={0.1} opacity={0.4} segments={10} bounds={[4, 1, 3]} color="#FFF9EE" />

      <Island />
      <Channel />
      <SpringHouse />
      <Bridge position={[-3.2, 0, -3.5]} rotY={Math.atan2(-1.7, 3.5)} />
      <Bridge position={[-5.6, 0, 2.5]} rotY={Math.atan2(-1, 2.5)} />
      <Pond />

      <WaterWheel position={[-4.5, 0, 3.2]} />
      <Souq position={[-8.5, 0, -2.8]} />
      <Harbor position={[7.5, 0, -5.5]} />
      <Fort position={[0.5, 0, -9.5]} />
      <Cave position={[9.5, 0, 3]} />
      <Mountain position={[-7.5, 0, -8.5]} />

      {palms.map((p, i) => (
        <Palm key={i} position={p.pos} s={p.s} phase={p.phase} />
      ))}
      <Bush position={[-5, 0, 5.8]} />
      <Bush position={[-9.5, 0, 0.8]} />
      <Bush position={[3, 0, 6.5]} color="#8B6FE8" />
      <Bush position={[6, 0, 4.8]} />
      {(
        [
          [2, 2],
          [-2, 5],
          [5, -1],
          [-4, -5.5],
          [1.5, -5],
          [-9, 4],
          [9, 0],
          [4, 6.8],
        ] as const
      ).map(([x, z], i) => (
        <GrassTuft key={i} position={[x, 0, z]} />
      ))}

      {(Object.keys(PORTAL_SPOTS) as GameId[]).map((id) => (
        <Portal
          key={id}
          id={id}
          onClick={onPortalClick}
          onHover={onPortalHover}
          play={play}
        />
      ))}

      <Gulls />
      <Butterflies />
      <WanderingFulous onMascotClick={onMascotClick} play={play} />

      <Sparkles count={30} scale={[5, 3, 5]} position={[9, 1.5, 3]} size={3} speed={0.3} color="#FFD93D" />

      <Controls />
    </>
  );
}
