import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Sparkles, Text } from '@react-three/drei';
import type { Group } from 'three';
import WordIcon, { iconFor } from '@/components/games/WordIcon';
import type { SfxName } from '@/lib/sfx';

/* ---------- palette ---------- */
const GRASS = '#4FBF67';
const GRASS_D = '#2F9E4F';
const GRASS_L = '#9FE870';
const WATER = '#3ED6C5';
const FOAM = '#EAFDF9';
const STONE = '#C9C2B4';
const STONE_D = '#A8A294';
const TRUNK = '#8A5A33';
const FUCH = '#E5599C';
const SUN = '#FFD93D';
const WOOD = '#8A5A33';

/** target beds (channel ends) */
const BEDS: [number, number][] = [
  [-4.5, 3.4],
  [0, 4.8],
  [4.5, 3.4],
];
const POOL: [number, number] = [0, -4.6];

export interface FalajSceneProps {
  /** the 3 words of the current round */
  items: string[];
  /** display permutation for the orbs (slot -> item index) */
  orbOrder: number[];
  /** matched flags per index */
  matched: boolean[];
  /** selected orb index or null */
  selected: number | null;
  /** increments on every wrong match (orb shake) */
  mistakeId: number;
  /** fountain finale */
  celebrate: boolean;
  onOrbClick: (i: number) => void;
  onTokenClick: (i: number) => void;
  play: (n: SfxName) => void;
}

/* ---------- camera sway + pointer parallax ---------- */
function CameraRig() {
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.getElapsedTime();
    const tx = pointer.x * 1.2 + Math.sin(t * 0.3) * 0.25;
    const ty = 10 + pointer.y * 0.6;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.position.z = 12;
    camera.lookAt(0, 0.8, 0);
  });
  return null;
}

/* ---------- garden ground ---------- */
function Garden() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[11, 24]} />
        <meshStandardMaterial color={GRASS} flatShading />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[11, 8.5, 2.2, 24]} />
        <meshStandardMaterial color={GRASS_D} flatShading />
      </mesh>
      {(
        [
          [-7, -2, 2],
          [7, -1.5, 1.8],
          [-6.5, 5.5, 1.6],
          [6.5, 5.8, 1.7],
          [0, -8, 2.4],
        ] as const
      ).map(([x, z, r], i) => (
        <mesh key={i} receiveShadow position={[x, 0.04, z]}>
          <sphereGeometry args={[r, 7, 5]} />
          <meshStandardMaterial color={i % 2 ? GRASS : GRASS_L} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- palm ---------- */
function Palm({
  position,
  scale = 1,
  phase = 0,
}: {
  position: [number, number, number];
  scale?: number;
  phase?: number;
}) {
  const top = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (top.current) top.current.rotation.z = Math.sin(t * 0.8 + phase) * 0.07;
  });
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 1.2, 0]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.14, 0.22, 2.6, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      <group ref={top} position={[0.15, 2.6, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              castShadow
              position={[Math.cos(a) * 0.7, 0.15, Math.sin(a) * 0.7]}
              rotation={[0, -a, 0.5]}
              scale={[1.4, 0.35, 0.55]}
            >
              <sphereGeometry args={[0.55, 6, 4]} />
              <meshStandardMaterial
                color={i % 2 ? GRASS : GRASS_D}
                flatShading
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ---------- decorative flower ---------- */
function Flower({
  position,
  color,
  phase,
  pop,
}: {
  position: [number, number, number];
  color: string;
  phase: number;
  pop: number;
}) {
  const g = useRef<Group>(null);
  const popT = useRef(-10);
  const prevPop = useRef(pop);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pop !== prevPop.current) {
      prevPop.current = pop;
      popT.current = t;
    }
    const dt = t - popT.current;
    const boost = dt < 0.5 ? Math.sin((dt / 0.5) * Math.PI) * 0.7 : 0;
    const sway = 1 + Math.sin(t * 1.6 + phase) * 0.05;
    g.current?.scale.setScalar(sway + boost);
  });
  return (
    <group ref={g} position={position}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.38, 5]} />
        <meshStandardMaterial color={GRASS_D} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.13, 6, 5]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.17, 0.42, Math.sin(a) * 0.17]}
          >
            <sphereGeometry args={[0.09, 6, 4]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------- source pool ---------- */
function SourcePool({ celebrate }: { celebrate: boolean }) {
  const water = useRef<Group>(null);
  const fountain = useRef<Group>(null);
  const fish = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    water.current?.children.forEach((c, i) => {
      c.position.y = 0.02 * Math.sin(t * 2 + i);
    });
    if (fountain.current) {
      const s = celebrate ? 1 + Math.sin(t * 6) * 0.12 : 0.0001;
      fountain.current.scale.set(1, s, 1);
      fountain.current.visible = celebrate;
    }
    if (fish.current) {
      const cycle = (t * 0.35) % 1;
      const jump = Math.max(0, Math.sin(cycle * Math.PI * 2));
      fish.current.position.set(0.4, 1.55 + jump * 0.8, 0.2);
      fish.current.rotation.z = cycle * Math.PI * 2;
    }
  });
  return (
    <group position={[POOL[0], 0, POOL[1]]}>
      {/* raised stone base */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[2, 2.3, 1.1, 10]} />
        <meshStandardMaterial color={STONE} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.12, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.18, 10]} />
        <meshStandardMaterial color={STONE_D} flatShading />
      </mesh>
      {/* glowing water */}
      <group ref={water} position={[0, 1.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.8, 16]} />
          <meshStandardMaterial
            color={WATER}
            emissive={WATER}
            emissiveIntensity={0.45}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <circleGeometry args={[1.1, 12]} />
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
      {/* jumping fish */}
      <group ref={fish}>
        <WordIcon kind="fish" />
      </group>
      {/* celebration fountain */}
      <group ref={fountain} position={[0, 1.3, 0]} visible={false}>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.22, 0.5, 2.8, 8]} />
          <meshStandardMaterial
            color={WATER}
            emissive={WATER}
            emissiveIntensity={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 2.9, 0]}>
          <sphereGeometry args={[0.45, 8, 6]} />
          <meshStandardMaterial
            color={FOAM}
            emissive={WATER}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
      <Sparkles
        position={[0, 2, 0]}
        count={celebrate ? 60 : 22}
        scale={celebrate ? [6, 5, 6] : [4, 2.5, 4]}
        size={celebrate ? 6 : 3.5}
        speed={celebrate ? 1.6 : 0.5}
        color={FOAM}
      />
    </group>
  );
}

/* ---------- channel with flowing water ---------- */
function Channel({ index, flowing }: { index: number; flowing: boolean }) {
  const [x2, z2] = BEDS[index];
  const [x1, z1] = [POOL[0] + (x2 > 0 ? 0.9 : x2 < 0 ? -0.9 : 0), POOL[1] + 1.4];
  const len = Math.hypot(x2 - x1, z2 - z1);
  const angle = Math.atan2(x2 - x1, z2 - z1);
  const chevrons = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    chevrons.current?.children.forEach((c, i) => {
      const p = (t * 0.45 + i / 6) % 1;
      c.position.z = -len / 2 + p * len;
      (c as unknown as { visible: boolean }).visible = flowing;
    });
  });
  return (
    <group
      position={[(x1 + x2) / 2, 0, (z1 + z2) / 2]}
      rotation={[0, angle, 0]}
    >
      {/* stone bed */}
      <mesh receiveShadow position={[0, 0.09, 0]}>
        <boxGeometry args={[1, 0.18, len + 0.6]} />
        <meshStandardMaterial color={STONE} flatShading />
      </mesh>
      {/* side walls */}
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} castShadow position={[x, 0.24, 0]}>
          <boxGeometry args={[0.12, 0.2, len + 0.6]} />
          <meshStandardMaterial color={STONE_D} flatShading />
        </mesh>
      ))}
      {/* water strip */}
      <mesh position={[0, 0.2, 0]} visible={flowing}>
        <boxGeometry args={[0.72, 0.07, len + 0.6]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER}
          emissiveIntensity={flowing ? 0.55 : 0}
        />
      </mesh>
      {/* scrolling chevrons */}
      <group ref={chevrons} position={[0, 0.26, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} visible={flowing}>
            <coneGeometry args={[0.14, 0.3, 3]} />
            <meshStandardMaterial
              color={FOAM}
              emissive={FOAM}
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- wooden water wheel ---------- */
function WaterWheel({
  position,
  spinning,
}: {
  position: [number, number, number];
  spinning: boolean;
}) {
  const wheel = useRef<Group>(null);
  const speed = useRef(0);
  useFrame((_, dt) => {
    speed.current += ((spinning ? 3 : 0) - speed.current) * 0.05;
    if (wheel.current) wheel.current.rotation.z += speed.current * dt;
  });
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.14, 0.7, 0.14]} />
        <meshStandardMaterial color={WOOD} flatShading />
      </mesh>
      <group ref={wheel} position={[0, 0.75, 0]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.07, 6, 10]} />
          <meshStandardMaterial color={WOOD} flatShading />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i / 4) * Math.PI]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color={WOOD} flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- picture token at a channel end ---------- */
function Token({
  index,
  word,
  matched,
  onClick,
  play,
}: {
  index: number;
  word: string;
  matched: boolean;
  onClick: () => void;
  play: (n: SfxName) => void;
}) {
  const [hover, setHover] = useState(false);
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    g.current.position.y = 1.5 + Math.sin(t * 1.6 + index * 2) * 0.1;
    g.current.rotation.y = t * 0.5 + index;
    const s = (hover ? 1.12 : 1) * (matched ? 1.05 : 1);
    g.current.scale.setScalar(s);
  });
  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hover]);
  return (
    <group position={[BEDS[index][0], 0, BEDS[index][1]]}>
      {/* flower bed ring */}
      <mesh receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.15, 1.3, 0.14, 9]} />
        <meshStandardMaterial color={matched ? GRASS_L : STONE} flatShading />
      </mesh>
      {/* pedestal */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.42, 0.9, 7]} />
        <meshStandardMaterial color={STONE_D} flatShading />
      </mesh>
      {/* floating token */}
      <group
        ref={g}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          play('hover');
        }}
        onPointerOut={() => setHover(false)}
      >
        <mesh>
          <torusGeometry args={[0.85, 0.06, 6, 14]} />
          <meshStandardMaterial
            color={matched ? SUN : WATER}
            emissive={matched ? SUN : WATER}
            emissiveIntensity={hover ? 0.9 : 0.45}
          />
        </mesh>
        <WordIcon kind={iconFor(word)} />
      </group>
      {matched && (
        <Sparkles position={[0, 1.6, 0]} count={18} scale={2.4} size={4} speed={0.9} color={SUN} />
      )}
    </group>
  );
}

/* ---------- word orb ---------- */
function Orb({
  index,
  word,
  selected,
  matched,
  mistakeId,
  onClick,
  play,
}: {
  index: number;
  word: string;
  selected: boolean;
  matched: boolean;
  mistakeId: number;
  onClick: () => void;
  play: (n: SfxName) => void;
}) {
  const [hover, setHover] = useState(false);
  const g = useRef<Group>(null);
  const shakeT = useRef(-10);
  const prevMistake = useRef(mistakeId);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    if (mistakeId !== prevMistake.current) {
      prevMistake.current = mistakeId;
      if (selected) shakeT.current = t;
    }
    const baseX = (index - 1) * 2.4;
    const dt = t - shakeT.current;
    const shake = dt < 0.45 ? Math.sin(dt * 45) * 0.22 * (1 - dt / 0.45) : 0;
    g.current.position.set(
      baseX + shake,
      2.7 + Math.sin(t * 2 + index * 2.1) * 0.12,
      -1.8,
    );
    g.current.rotation.y = t * 0.8 + index;
    const target = matched ? 0.001 : selected ? 1.18 : hover ? 1.1 : 1;
    const cur = g.current.scale.x;
    g.current.scale.setScalar(cur + (target - cur) * 0.15);
    g.current.visible = g.current.scale.x > 0.02;
  });
  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hover]);
  return (
    <group
      ref={g}
      onClick={(e) => {
        e.stopPropagation();
        if (!matched) onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!matched) {
          setHover(true);
          play('hover');
        }
      }}
      onPointerOut={() => setHover(false)}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.62, 10, 8]} />
        <meshStandardMaterial
          color={selected ? SUN : WATER}
          emissive={selected ? SUN : WATER}
          emissiveIntensity={hover || selected ? 0.85 : 0.5}
          transparent
          opacity={0.92}
        />
      </mesh>
      <Billboard>
        <Text
          fontSize={0.34}
          color="#21323B"
          fontWeight={800}
          outlineWidth={0.03}
          outlineColor="#FFF9EE"
          anchorX="center"
          anchorY="middle"
        >
          {word}
        </Text>
      </Billboard>
    </group>
  );
}

/* ---------- butterflies ---------- */
function Butterfly({ phase, center }: { phase: number; center: [number, number, number] }) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    if (!g.current) return;
    g.current.position.set(
      center[0] + Math.sin(t * 0.6) * 2.2,
      center[1] + Math.sin(t * 1.7) * 0.35,
      center[2] + Math.cos(t * 0.6) * 2.2,
    );
    g.current.rotation.y = Math.atan2(Math.cos(t * 0.6), -Math.sin(t * 0.6));
    const flap = Math.sin(t * 14) * 0.7;
    g.current.children[0].rotation.y = flap;
    g.current.children[1].rotation.y = -flap;
  });
  return (
    <group ref={g}>
      <mesh position={[0.07, 0, 0]}>
        <boxGeometry args={[0.14, 0.02, 0.1]} />
        <meshStandardMaterial color={FUCH} flatShading />
      </mesh>
      <mesh position={[-0.07, 0, 0]}>
        <boxGeometry args={[0.14, 0.02, 0.1]} />
        <meshStandardMaterial color={SUN} flatShading />
      </mesh>
    </group>
  );
}

/* ---------- scene root ---------- */
export default function FalajScene({
  items,
  orbOrder,
  matched,
  selected,
  mistakeId,
  celebrate,
  onOrbClick,
  onTokenClick,
  play,
}: FalajSceneProps) {
  const flowers = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return s / 2147483647;
      };
    };
    const r = rng(42);
    return Array.from({ length: 22 }).map((_, i) => {
      const a = r() * Math.PI * 2;
      const rad = 3.5 + r() * 6.5;
      return {
        pos: [Math.cos(a) * rad, 0, Math.sin(a) * rad] as [number, number, number],
        color: i % 3 === 0 ? FUCH : i % 3 === 1 ? SUN : FOAM,
        phase: r() * 6,
      };
    });
  }, []);

  return (
    <group>
      <CameraRig />
      <Garden />
      <Palm position={[-8, 0, -3]} scale={1.2} phase={0} />
      <Palm position={[8, 0, -2.5]} scale={1.1} phase={1.5} />
      <Palm position={[-7.5, 0, 4]} scale={0.95} phase={3} />
      <Palm position={[7.6, 0, 4.4]} scale={1} phase={4.5} />
      <Palm position={[3.2, 0, -7.5]} scale={1.15} phase={2} />
      {flowers.map((f, i) => (
        <Flower
          key={i}
          position={f.pos}
          color={f.color}
          phase={f.phase}
          pop={matched.filter(Boolean).length}
        />
      ))}
      <SourcePool celebrate={celebrate} />
      {BEDS.map((_, i) => (
        <Channel key={i} index={i} flowing={matched[i]} />
      ))}
      {BEDS.map(([x, z], i) => (
        <WaterWheel
          key={i}
          position={[POOL[0] + (x > 0 ? 1.1 : x < 0 ? -1.1 : 0.35) + (x === 0 ? 0 : 0), 0, POOL[1] + 1.8 + (z - POOL[1]) * 0.08]}
          spinning={matched[i]}
        />
      ))}
      {items.map((w, i) => (
        <Token
          key={`${w}-${i}`}
          index={i}
          word={w}
          matched={matched[i]}
          onClick={() => onTokenClick(i)}
          play={play}
        />
      ))}
      {orbOrder.map((itemIdx, slot) => (
        <Orb
          key={`${items[itemIdx]}-${itemIdx}`}
          index={slot}
          word={items[itemIdx]}
          selected={selected === itemIdx}
          matched={matched[itemIdx]}
          mistakeId={mistakeId}
          onClick={() => onOrbClick(itemIdx)}
          play={play}
        />
      ))}
      <Butterfly phase={0} center={[-4, 2.4, 1]} />
      <Butterfly phase={3} center={[4.5, 2.6, 0]} />
      <Sparkles position={[0, 1.5, 2]} count={26} scale={[14, 3, 12]} size={2.5} speed={0.35} color={FOAM} />
    </group>
  );
}
