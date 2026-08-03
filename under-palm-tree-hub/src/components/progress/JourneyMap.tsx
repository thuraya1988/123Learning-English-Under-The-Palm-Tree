import { useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import type { Group } from 'three';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { GameId, GameProgress } from '@/lib/store';

/* ---------- palette ---------- */
const GRASS = '#4FBF67';
const GRASS_D = '#2F9E4F';
const GRASS_L = '#9FE870';
const STAGE = {
  A1: '#4FBF67',
  A2: '#3ED6C5',
  B1: '#8B6FE8',
  B2: '#D9A441',
} as const;
const GREY = '#9AA7AB';
const STAR = '#FFD93D';
const LOCKED_STAR = '#C7CFD2';

export interface JourneyNode {
  id: GameId;
  title: string;
  cefr: string;
  stage: keyof typeof STAGE;
  pos: [number, number];
}

export const NODES: JourneyNode[] = [
  { id: 'falaj', title: 'Falaj Word Flow', cefr: 'A1', stage: 'A1', pos: [-11, 6] },
  { id: 'souq', title: 'Souq Spelling Market', cefr: 'A1–A2', stage: 'A1', pos: [-6.5, 0.5] },
  { id: 'dhow', title: 'Dhow Voyager', cefr: 'A2–B1', stage: 'A2', pos: [-1, 4.5] },
  { id: 'bahla', title: 'Bahla: Fort of Riddles', cefr: 'B1', stage: 'B1', pos: [3.5, -1] },
  { id: 'cave', title: 'Jinn Cave Escape', cefr: 'B1–B2+', stage: 'B1', pos: [8.5, 3] },
  { id: 'khareef', title: 'Frankincense Trail', cefr: 'Mixed', stage: 'B2', pos: [11.5, -3.5] },
];

/* ---------- landmark minis ---------- */
function FalajWheel() {
  const wheel = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (wheel.current) wheel.current.rotation.z = clock.getElapsedTime() * 0.6;
  });
  return (
    <group position={[0, 0.55, 0]}>
      <mesh castShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshStandardMaterial color="#1E8C82" flatShading />
      </mesh>
      <group ref={wheel} position={[0, 0.35, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.07, 6, 12]} />
          <meshStandardMaterial color="#8A5A33" flatShading />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color="#D9A441" flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SouqStall() {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.6, 0.7]} />
        <meshStandardMaterial color="#8A5A33" flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[1.15, 0.12, 0.9]} />
        <meshStandardMaterial color="#E5599C" flatShading />
      </mesh>
      {[-0.25, 0.05, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0.2]}>
          <sphereGeometry args={[0.12, 6, 5]} />
          <meshStandardMaterial color={['#FFB54D', '#B8E34D', '#FF7A66'][i]} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function DhowMini() {
  return (
    <group position={[0, 0.25, 0]} rotation={[0, 0.5, 0]}>
      <mesh castShadow scale={[1, 0.5, 2.2]}>
        <sphereGeometry args={[0.45, 7, 5]} />
        <meshStandardMaterial color="#8A5A33" flatShading />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.1, 5]} />
        <meshStandardMaterial color="#5C3A1E" flatShading />
      </mesh>
      <mesh castShadow position={[0.02, 0.65, 0]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.45, 0.9, 3]} />
        <meshStandardMaterial color="#FFF9EE" flatShading />
      </mesh>
    </group>
  );
}

function FortTower() {
  return (
    <group position={[0, 0.55, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.55, 1.1, 8]} />
        <meshStandardMaterial color="#C97B4A" flatShading />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.5, 0.42, 0.18, 8]} />
        <meshStandardMaterial color="#A95F3B" flatShading />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.4, 0.78, Math.sin(a) * 0.4]}>
            <boxGeometry args={[0.14, 0.16, 0.14]} />
            <meshStandardMaterial color="#A95F3B" flatShading />
          </mesh>
        );
      })}
      <mesh position={[0, 0.1, 0.5]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.22, 0.4, 0.06]} />
        <meshStandardMaterial color="#1E8C82" flatShading />
      </mesh>
    </group>
  );
}

function CrystalCave() {
  const glow = useRef<Group>(null);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 2.4) * 0.08;
    glow.current?.scale.setScalar(s);
  });
  return (
    <group position={[0, 0.35, 0]}>
      <mesh castShadow scale={[1, 0.7, 1]}>
        <sphereGeometry args={[0.55, 7, 5]} />
        <meshStandardMaterial color="#2B2D5C" flatShading />
      </mesh>
      <group ref={glow}>
        {(
          [
            [-0.2, 0.35, 0.2, '#7DF9E8'],
            [0.15, 0.45, 0.1, '#8B6FE8'],
            [0.05, 0.3, 0.35, '#7DF9E8'],
          ] as const
        ).map(([x, y, z, c], i) => (
          <mesh key={i} castShadow position={[x, y, z]} rotation={[0.2, i, 0.1]}>
            <coneGeometry args={[0.1, 0.45, 5]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function FrankincenseTree() {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh castShadow position={[0, 0.2, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.09, 0.14, 0.7, 6]} />
        <meshStandardMaterial color="#8A5A33" flatShading />
      </mesh>
      {(
        [
          [0, 0.75, 0, 0.42],
          [0.3, 0.6, 0.1, 0.3],
          [-0.28, 0.62, -0.08, 0.28],
        ] as const
      ).map(([x, y, z, r], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <sphereGeometry args={[r, 7, 5]} />
          <meshStandardMaterial color={i % 2 ? '#2F9E4F' : '#4FBF67'} flatShading />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.15 - i * 0.15, 0.42 - i * 0.06, 0.12]}>
          <sphereGeometry args={[0.05, 6, 5]} />
          <meshStandardMaterial color="#FFD93D" emissive="#FFB54D" emissiveIntensity={0.5} flatShading />
        </mesh>
      ))}
    </group>
  );
}

const LANDMARKS: Record<GameId, ComponentType> = {
  falaj: FalajWheel,
  souq: SouqStall,
  dhow: DhowMini,
  bahla: FortTower,
  cave: CrystalCave,
  khareef: FrankincenseTree,
};

/* ---------- path segments ---------- */
function PathSegment({
  from,
  to,
  color,
  completed,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
  completed: boolean;
}) {
  const { mid, len, angle } = useMemo(() => {
    const mx = (from[0] + to[0]) / 2;
    const mz = (from[1] + to[1]) / 2;
    const dx = to[0] - from[0];
    const dz = to[1] - from[1];
    return {
      mid: [mx, mz] as const,
      len: Math.max(0.5, Math.hypot(dx, dz) - 2.6),
      angle: Math.atan2(dx, dz),
    };
  }, [from, to]);
  return (
    <group position={[mid[0], 0.06, mid[1]]} rotation={[0, angle, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.65, len]} />
        <meshStandardMaterial
          color={completed ? color : GREY}
          transparent
          opacity={completed ? 0.95 : 0.5}
        />
      </mesh>
      {!completed &&
        Array.from({ length: Math.max(2, Math.floor(len / 0.8)) }).map((_, i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.01, -len / 2 + 0.4 + i * 0.8]}
          >
            <planeGeometry args={[0.2, 0.28]} />
            <meshStandardMaterial color="#EAFDF9" />
          </mesh>
        ))}
    </group>
  );
}

/* ---------- star trio ---------- */
function StarTrio({ earned, locked }: { earned: number; locked: boolean }) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g.current?.children.forEach((c, i) => {
      c.position.y = (i === 1 ? 0.16 : 0) + Math.sin(t * 2 + i * 1.1) * 0.07;
      c.rotation.y = t * 1.2 + i;
    });
  });
  const n = Math.min(3, earned);
  return (
    <group ref={g} position={[0, 2.15, 0]}>
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={i} position={[x, i === 1 ? 0.16 : 0, 0]} scale={i === 1 ? 1.15 : 0.9}>
          <octahedronGeometry args={[0.17, 0]} />
          <meshStandardMaterial
            color={i < n && !locked ? STAR : LOCKED_STAR}
            emissive={i < n && !locked ? STAR : '#000000'}
            emissiveIntensity={i < n && !locked ? 0.55 : 0}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- node island ---------- */
interface NodeIslandProps {
  node: JourneyNode;
  progress: GameProgress;
  locked: boolean;
  selected: boolean;
  onSelect: (id: GameId) => void;
}

function NodeIsland({ node, progress, locked, selected, onSelect }: NodeIslandProps) {
  const g = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const Landmark = LANDMARKS[node.id];
  const stars = Object.values(progress.stars).reduce((a, b) => a + b, 0);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const sway = locked ? Math.sin(t * 1.5 + node.pos[0]) * 0.04 : 0;
    const target = (hovered ? 1.1 : 1) * (selected ? 1.08 : 1);
    const s = g.current.scale.x + (target - g.current.scale.x) * 0.15;
    g.current.scale.setScalar(s);
    g.current.rotation.z = sway;
  });

  const ring = locked ? GREY : STAGE[node.stage];

  return (
    <group position={[node.pos[0], 0, node.pos[1]]}>
      <group
        ref={g}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* island base */}
        <mesh castShadow position={[0, -0.45, 0]}>
          <cylinderGeometry args={[1.35, 0.8, 0.9, 9]} />
          <meshStandardMaterial color={locked ? '#7C8A8E' : GRASS_D} flatShading />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.16, 9]} />
          <meshStandardMaterial color={locked ? GREY : GRASS} flatShading />
        </mesh>
        <mesh position={[0.35, 0.12, -0.3]}>
          <sphereGeometry args={[0.35, 6, 5]} />
          <meshStandardMaterial color={locked ? GREY : GRASS_L} flatShading />
        </mesh>
        {/* stage ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
          <ringGeometry args={[1.05, 1.28, 24]} />
          <meshStandardMaterial
            color={ring}
            emissive={hovered || selected ? ring : '#000000'}
            emissiveIntensity={hovered || selected ? 0.8 : 0}
          />
        </mesh>
        <Landmark />
        <StarTrio earned={stars} locked={locked} />
        {/* padlock */}
        {locked && (
          <group position={[0, 1.35, 0.7]}>
            <mesh>
              <boxGeometry args={[0.28, 0.24, 0.12]} />
              <meshStandardMaterial color="#5B6B70" flatShading />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <torusGeometry args={[0.1, 0.035, 6, 10, Math.PI]} />
              <meshStandardMaterial color="#5B6B70" flatShading />
            </mesh>
          </group>
        )}
      </group>
      {stars > 0 && !locked && (
        <Sparkles count={14} scale={[3, 2.5, 3]} position={[0, 1.4, 0]} size={3} speed={0.4} color={STAR} />
      )}
    </group>
  );
}

/* ---------- camera rig ---------- */
function CameraRig({
  controls,
  focus,
}: {
  controls: React.RefObject<OrbitControlsImpl | null>;
  focus: [number, number] | null;
}) {
  const target = useMemo(() => new Vector3(), []);
  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    if (focus) target.set(focus[0], 0.8, focus[1]);
    else target.set(0, 0.5, 0.5);
    c.target.lerp(target, 0.06);
    c.update();
  });
  return null;
}

/* ---------- main scene ---------- */
interface JourneyMapProps {
  games: Record<GameId, GameProgress>;
  lockedIds: Set<GameId>;
  selected: GameId | null;
  onSelect: (id: GameId | null) => void;
  className?: string;
}

export default function JourneyMap({
  games,
  lockedIds,
  selected,
  onSelect,
  className,
}: JourneyMapProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const focusNode = selected ? NODES.find((n) => n.id === selected)!.pos : null;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 12, 16], fov: 45 }}
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
        onPointerMissed={() => onSelect(null)}
      >
        <fog attach="fog" args={['#BDEFF2', 26, 55]} />
        <ambientLight intensity={0.55} />
        <hemisphereLight args={['#BDEFF2', '#7CB98A', 0.7]} />
        <directionalLight
          position={[10, 14, 6]}
          intensity={1.2}
          color="#FFE3B3"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-18}
          shadow-camera-right={18}
          shadow-camera-top={18}
          shadow-camera-bottom={-18}
        />
        {/* sea */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <circleGeometry args={[70, 32]} />
          <meshStandardMaterial color="#159AAD" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
          <circleGeometry args={[26, 28]} />
          <meshStandardMaterial color="#3ED6C5" transparent opacity={0.85} />
        </mesh>

        {/* path segments colored by destination stage */}
        {NODES.slice(1).map((n, i) => {
          const prev = NODES[i];
          const prevStars = Object.values(games[prev.id].stars).reduce((a, b) => a + b, 0);
          return (
            <PathSegment
              key={n.id}
              from={prev.pos}
              to={n.pos}
              color={STAGE[n.stage]}
              completed={prevStars > 0}
            />
          );
        })}

        {NODES.map((n) => (
          <NodeIsland
            key={n.id}
            node={n}
            progress={games[n.id]}
            locked={lockedIds.has(n.id)}
            selected={selected === n.id}
            onSelect={onSelect}
          />
        ))}

        <Sparkles count={60} scale={[30, 8, 20]} position={[0, 3, 0]} size={2} speed={0.25} color="#EAFDF9" />

        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          minDistance={8}
          maxDistance={26}
          minPolarAngle={0.5}
          maxPolarAngle={1.25}
        />
        <CameraRig controls={controlsRef} focus={focusNode} />
      </Canvas>
    </div>
  );
}
