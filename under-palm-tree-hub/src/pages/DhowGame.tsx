import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Sky, Cloud, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Ship, Wind } from 'lucide-react';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';
import SceneCanvas from '@/components/SceneCanvas';
import GameHUD from '@/components/GameHUD';
import QuestionCard from '@/components/QuestionCard';
import StarBurst from '@/components/StarBurst';
import ResultModal from '@/components/ResultModal';
import Mascot from '@/components/Mascot';
import { getGameQuestions } from '@/lib/questions';
import type { GameQuestion } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import { useSfx } from '@/lib/sfx';

/* ---------- palette ---------- */
const WATER = '#3ED6C5';
const DEEPSEA = '#159AAD';
const FOAM = '#EAFDF9';
const PALM = '#4FBF67';
const PALM_D = '#2F9E4F';
const PALM_L = '#9FE870';
const TRUNK = '#8A5A33';
const HULL = '#9A6A3F';
const HULL_D = '#6E4A2A';
const TERRA = '#C97B4A';
const SAND_FREE_GRASS = '#7FD06A';

const LEGS = 8;
const NM_PER_LEG = 12;

type Phase = 'sailing' | 'question' | 'celebrate' | 'done';

/* ================= 3D pieces ================= */

/** Faceted two-tone sea with vertex bob. */
function Sea() {
  const mesh = useRef<Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(140, 140, 36, 36);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c1 = new THREE.Color(WATER);
    const c2 = new THREE.Color(DEEPSEA);
    for (let i = 0; i < pos.count; i++) {
      const c = Math.random() > 0.5 ? c1 : c2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);
  const base = useMemo(() => {
    const pos = geo.attributes.position;
    const arr = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) arr[i] = pos.getY(i);
    return arr;
  }, [geo]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, base[i] + Math.sin(t * 1.4 + x * 0.35 + z * 0.25) * 0.22);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <mesh ref={mesh} geometry={geo} position={[0, -0.6, -30]}>
      <meshStandardMaterial vertexColors flatShading roughness={0.7} />
    </mesh>
  );
}

function Palm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.9, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.09, 0.16, 1.8, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          castShadow
          position={[Math.sin(i * 2.1) * 0.28, 1.9 + (i % 2) * 0.12, Math.cos(i * 2.1) * 0.28]}
        >
          <icosahedronGeometry args={[0.5 - i * 0.06, 0]} />
          <meshStandardMaterial color={[PALM, PALM_D, PALM_L][i]} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Lighthouse({ position }: { position: [number, number, number] }) {
  const lamp = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (lamp.current) {
      const m = lamp.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.6 + Math.sin(clock.getElapsedTime() * 3) * 0.7;
    }
  });
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.32, 0.48, 1.8, 8]} />
        <meshStandardMaterial color="#FFF9EE" flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.35, 8]} />
        <meshStandardMaterial color="#FF7A66" flatShading />
      </mesh>
      <mesh ref={lamp} position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.26, 8, 8]} />
        <meshStandardMaterial
          color="#FFD93D"
          emissive="#FFD93D"
          emissiveIntensity={1.8}
          flatShading
        />
      </mesh>
      <mesh castShadow position={[0, 2.3, 0]}>
        <coneGeometry args={[0.4, 0.5, 8]} />
        <meshStandardMaterial color="#FF7A66" flatShading />
      </mesh>
      <pointLight position={[0, 2, 0]} color="#FFD93D" intensity={2.2} distance={9} />
    </group>
  );
}

function MiniFort({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.8, 0.95, 1.4, 10]} />
        <meshStandardMaterial color={TERRA} flatShading />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} castShadow position={[Math.cos(a) * 0.72, 1.5, Math.sin(a) * 0.72]}>
            <boxGeometry args={[0.22, 0.24, 0.22]} />
            <meshStandardMaterial color={TERRA} flatShading />
          </mesh>
        );
      })}
      <mesh castShadow position={[0, 0.35, 0.82]}>
        <boxGeometry args={[0.4, 0.7, 0.1]} />
        <meshStandardMaterial color="#1E8C82" flatShading />
      </mesh>
    </group>
  );
}

interface IslandProps {
  kind: 'palm' | 'lighthouse' | 'fort';
  z: number;
  x: number;
  active: boolean;
}

/** An island that drifts toward the dhow while sailing. */
function Island({ kind, z, x, active }: IslandProps) {
  return (
    <group position={[x, 0, z]}>
      <mesh receiveShadow position={[0, -0.25, 0]}>
        <cylinderGeometry args={[2.4, 3, 0.9, 9]} />
        <meshStandardMaterial color={SAND_FREE_GRASS} flatShading />
      </mesh>
      {kind === 'palm' && (
        <>
          <Palm position={[-0.8, 0.2, 0.3]} />
          <Palm position={[0.9, 0.2, -0.4]} scale={0.8} />
          <Palm position={[0.2, 0.2, 0.9]} scale={0.65} />
        </>
      )}
      {kind === 'lighthouse' && <Lighthouse position={[0, 0.2, 0]} />}
      {kind === 'fort' && <MiniFort position={[0, 0.2, 0]} />}
      {/* glowing dock ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[2.7, 3.05, 24]} />
        <meshStandardMaterial
          color={active ? '#FFD93D' : FOAM}
          emissive={active ? '#FFD93D' : WATER}
          emissiveIntensity={active ? 1.4 : 0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

/** White foam ring around the hull. */
function FoamRing() {
  const ring = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring.current) {
      const s = 1 + Math.sin(t * 2) * 0.06;
      ring.current.scale.set(s, s, 1);
      (ring.current.material as THREE.MeshStandardMaterial).opacity =
        0.5 + Math.sin(t * 2) * 0.15;
    }
  });
  return (
    <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
      <ringGeometry args={[1.3, 1.9, 24]} />
      <meshStandardMaterial color={FOAM} transparent opacity={0.6} />
    </mesh>
  );
}

interface DhowProps {
  wind: number; // 0 droop .. 1 full sail
  celebrating: boolean;
}

/** Low-poly wooden dhow with lateen sail. */
function Dhow({ wind, celebrating }: DhowProps) {
  const boat = useRef<Group>(null);
  const sail = useRef<Mesh>(null);
  const flag = useRef<Mesh>(null);
  const sailGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 3.1);
    shape.lineTo(2.3, 0.5);
    shape.lineTo(0, 0);
    const g = new THREE.ShapeGeometry(shape);
    g.translate(-0.1, 0, 0);
    return g;
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (boat.current) {
      boat.current.position.y = Math.sin(t * 1.2) * 0.15;
      boat.current.rotation.z = Math.sin(t * 0.9) * 0.04;
      boat.current.rotation.x = Math.sin(t * 0.7) * 0.02;
    }
    if (sail.current) {
      // billow: scale-x pulse when wind is earned; droop to 0.7 when idle
      const billow = 0.7 + wind * (0.3 + Math.sin(t * 4) * 0.06);
      sail.current.scale.x += (billow - sail.current.scale.x) * 0.08;
    }
    if (flag.current) flag.current.rotation.y = Math.sin(t * (3 + wind * 6)) * 0.5;
    if (celebrating && boat.current) {
      boat.current.rotation.y = Math.sin(t * 2) * 0.12;
    }
  });
  return (
    <group ref={boat}>
      {/* hull */}
      <mesh castShadow position={[0, 0, 0]} scale={[1, 0.7, 2.6]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshStandardMaterial color={HULL} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.28, 0]} scale={[0.8, 0.3, 2.2]}>
        <sphereGeometry args={[0.85, 8, 6]} />
        <meshStandardMaterial color={HULL_D} flatShading />
      </mesh>
      {/* raised stern */}
      <mesh castShadow position={[0, 0.5, -1.9]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[1, 0.7, 0.5]} />
        <meshStandardMaterial color={HULL_D} flatShading />
      </mesh>
      {/* bow sprit */}
      <mesh castShadow position={[0, 0.45, 2.3]} rotation={[Math.PI / 2.6, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.4, 5]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      {/* mast */}
      <mesh castShadow position={[0, 1.6, 0.2]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.06, 0.09, 3.6, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      {/* lateen sail */}
      <mesh ref={sail} geometry={sailGeo} position={[-0.05, 0.6, 0.25]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <meshStandardMaterial color="#FFF9EE" flatShading side={THREE.DoubleSide} />
      </mesh>
      {/* flag */}
      <mesh ref={flag} position={[0.02, 3.55, 0.35]}>
        <boxGeometry args={[0.5, 0.22, 0.02]} />
        <meshStandardMaterial color="#FF7A66" flatShading />
      </mesh>
      {/* lantern */}
      <mesh position={[0, 0.9, -2.1]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial color="#FFD93D" emissive="#FFD93D" emissiveIntensity={1.6} />
      </mesh>
      <FoamRing />
      {wind > 0.5 && (
        <Sparkles count={26} color={FOAM} size={3} speed={1.6} scale={[4, 2, 3]} position={[-1.5, 1.6, 0]} />
      )}
      {celebrating && (
        <Sparkles count={90} color="#FFD93D" size={5} speed={2.4} scale={[8, 6, 8]} position={[0, 2, 0]} />
      )}
    </group>
  );
}

/** Wind swoosh trails behind the sail. */
function WindTrails({ strength }: { strength: number }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current?.children.forEach((c, i) => {
      c.position.x = -1 - ((t * (2 + i)) % 6);
      const m = (c as Mesh).material as THREE.MeshStandardMaterial;
      m.opacity = strength * (0.5 - (c.position.x + 4) * 0.06);
    });
  });
  if (strength <= 0.05) return null;
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1, 1.4 + i * 0.6, -0.2 + i * 0.2]} rotation={[0, 0, 0.1]}>
          <torusGeometry args={[0.8 + i * 0.2, 0.03, 6, 20, Math.PI]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Dolphins arc-jumping beside the boat on correct answers. */
function Dolphins({ jumpKey }: { jumpKey: number }) {
  const d1 = useRef<Group>(null);
  const d2 = useRef<Group>(null);
  const start = useRef(-10);
  useEffect(() => {
    if (jumpKey > 0) start.current = performance.now() / 1000;
  }, [jumpKey]);
  useFrame(() => {
    const t = performance.now() / 1000 - start.current;
    [d1, d2].forEach((ref, i) => {
      const g = ref.current;
      if (!g) return;
      const local = t - i * 0.35;
      if (local > 0 && local < 1.4) {
        const p = local / 1.4;
        g.visible = true;
        g.position.set(2.2 + i * 0.8, -0.6 + Math.sin(p * Math.PI) * 1.8, -1 + p * 2.4 - i);
        g.rotation.z = -Math.cos(p * Math.PI) * 0.9;
      } else {
        g.visible = false;
      }
    });
  });
  const dolphin = (ref: React.RefObject<Group | null>) => (
    <group ref={ref} visible={false}>
      <mesh castShadow>
        <coneGeometry args={[0.28, 1.3, 6]} />
        <meshStandardMaterial color={DEEPSEA} flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.16, 0.4, 4]} />
        <meshStandardMaterial color={WATER} flatShading />
      </mesh>
    </group>
  );
  return (
    <>
      {dolphin(d1)}
      {dolphin(d2)}
    </>
  );
}

/** Distant misty green mountains + gulls. */
function Horizon() {
  const gulls = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    gulls.current?.children.forEach((c, i) => {
      c.position.x = Math.sin(t * 0.3 + i * 2) * 12;
      c.position.y = 6 + Math.sin(t * 1.1 + i) * 0.6;
      c.position.z = -18 - i * 4;
    });
  });
  return (
    <>
      {[-30, -12, 8, 26].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -55 - (i % 2) * 8]}>
          <coneGeometry args={[9 + (i % 3) * 3, 7 + (i % 2) * 3, 6]} />
          <meshStandardMaterial color="#1F5C45" flatShading transparent opacity={0.75} />
        </mesh>
      ))}
      <group ref={gulls}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <torusGeometry args={[0.35, 0.04, 4, 10, Math.PI]} />
            <meshStandardMaterial color="#FFFFFF" flatShading />
          </mesh>
        ))}
      </group>
      <Cloud position={[-14, 9, -35]} speed={0.15} opacity={0.5} segments={10} bounds={[8, 1.5, 1]} color="#FFFFFF" />
      <Cloud position={[16, 11, -40]} speed={0.12} opacity={0.45} segments={10} bounds={[9, 1.5, 1]} color="#FFF3E0" />
    </>
  );
}

interface VoyageSceneProps {
  wind: number;
  sailing: boolean;
  celebrating: boolean;
  legZ: number[]; // z position of each upcoming island
  activeLeg: number;
  jumpKey: number;
}

function VoyageScene({ wind, sailing, celebrating, legZ, activeLeg, jumpKey }: VoyageSceneProps) {
  const world = useRef<Group>(null);
  useFrame((_, delta) => {
    if (sailing && world.current) {
      world.current.position.z += delta * (2 + wind * 5);
    }
  });
  const kinds: IslandProps['kind'][] = ['palm', 'fort', 'palm', 'lighthouse', 'fort', 'palm', 'fort', 'lighthouse'];
  return (
    <>
      <Sky sunPosition={[40, 26, -60]} turbidity={6} rayleigh={1.6} />
      <Horizon />
      <Sea />
      <group>
        <Dhow wind={wind} celebrating={celebrating} />
        <WindTrails strength={wind} />
        <Dolphins jumpKey={jumpKey} />
      </group>
      <group ref={world}>
        {legZ.map((z, i) => (
          <Island key={i} kind={kinds[i % kinds.length]} z={z} x={i % 2 === 0 ? -4.5 : 4.5} active={i === activeLeg} />
        ))}
      </group>
      <Text
        position={[0, 7.5, -20]}
        fontSize={1.1}
        color="#1E8C82"
        outlineColor="#EAFDF9"
        outlineWidth={0.05}
        anchorX="center"
      >
        Dhow Voyager
      </Text>
    </>
  );
}

/* ================= Page ================= */

interface ChipState {
  chips: string[];
  placed: string[];
}

export default function DhowGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const storedStars = useGameStore((s) => s.games.dhow.stars[1] ?? 0);

  const questions = useMemo<GameQuestion[]>(() => {
    const levels = getGameQuestions('dhow');
    const a2 = levels.find((l) => l.cefr === 'A2')?.questions ?? levels[0]?.questions ?? [];
    const b1 = levels.find((l) => l.cefr.startsWith('B1'))?.questions ?? levels[1]?.questions ?? a2;
    const pick = (arr: GameQuestion[], n: number, off: number) =>
      Array.from({ length: n }, (_, i) => arr[(off + i) % arr.length]);
    return [...pick(a2, 4, 0), ...pick(b1, 4, 0)];
  }, []);

  const [leg, setLeg] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [wind, setWind] = useState(0);
  const [nm, setNm] = useState(0);
  const [burst, setBurst] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [jumpKey, setJumpKey] = useState(0);
  const [chipState, setChipState] = useState<ChipState | null>(null);
  const [chipWrong, setChipWrong] = useState(false);

  // sentence-building legs: 0 and 2 use word chips built from the correct choice
  const isChipLeg = leg % 4 === 0 || leg % 4 === 2;
  const q = questions[leg];

  const buildChips = useCallback((question: GameQuestion): ChipState => {
    const words = question.choices[question.answer].replace(/[.!?]$/, '').split(' ');
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    // avoid identical order
    if (shuffled.join(' ') === words.join(' ')) shuffled.reverse();
    return { chips: shuffled, placed: [] };
  }, []);

  useEffect(() => {
    if (phase === 'question' && q && isChipLeg) setChipState(buildChips(q));
    else setChipState(null);
    setChipWrong(false);
  }, [phase, leg, q, isChipLeg, buildChips]);

  const legZ = useMemo(() => Array.from({ length: LEGS }, (_, i) => -26 - i * 22), []);

  const finishLeg = useCallback(
    (wasRight: boolean) => {
      const newCorrect = correct + (wasRight ? 1 : 0);
      setCorrect(newCorrect);
      if (wasRight) {
        play('wind');
        play('success');
        setWind(1);
        setJumpKey((k) => k + 1);
        setBurst(true);
        setTimeout(() => setBurst(false), 800);
      } else {
        play('error');
        play('splash');
        setWind(0);
        setHintOpen(true);
      }
      setTimeout(
        () => {
          setSelected(null);
          setHintOpen(false);
          if (leg + 1 >= LEGS) {
            setPhase('celebrate');
            play('magic');
            setTimeout(() => {
              setPhase('done');
              const acc = newCorrect / LEGS;
              const stars = acc >= 0.85 ? 3 : acc >= 0.6 ? 2 : acc >= 0.35 ? 1 : 0;
              const finalScore = score + (wasRight ? 0 : 0); // score already updated
              recordResult('dhow', 1, scoreRef.current, stars);
              void finalScore;
            }, 2600);
          } else {
            setLeg((l) => l + 1);
            setPhase('sailing');
            setTimeout(() => {
              setWind((w) => Math.max(0, w - 0.4));
              setPhase('question');
            }, 2600);
          }
        },
        wasRight ? 1400 : 2100,
      );
    },
    [correct, leg, play, recordResult, score],
  );

  // keep a live score ref for recordResult
  const scoreRef = useRef(score);
  scoreRef.current = score;

  // animate nm counter while sailing
  useEffect(() => {
    if (phase !== 'sailing') return;
    const from = leg * NM_PER_LEG;
    const to = (leg + 1) * NM_PER_LEG;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / 2400);
      setNm(Math.round(from + (to - from) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, leg]);

  const answer = (i: number) => {
    if (selected != null || phase !== 'question') return;
    setSelected(i);
    const right = i === q.answer;
    if (right) setScore((s) => s + 100);
    finishLeg(right);
  };

  const placeChip = (chip: string, idx: number) => {
    if (!chipState || phase !== 'question') return;
    play('click');
    const chips = [...chipState.chips];
    chips.splice(idx, 1);
    const placed = [...chipState.placed, chip];
    setChipState({ chips, placed });
    if (chips.length === 0) {
      const target = q.choices[q.answer].replace(/[.!?]$/, '');
      const right = placed.join(' ') === target;
      if (right) {
        setScore((s) => s + 100);
        setSelected(q.answer);
        finishLeg(true);
      } else {
        play('error');
        play('splash');
        setChipWrong(true);
        setHintOpen(true);
        setTimeout(() => {
          setChipState(buildChips(q));
          setChipWrong(false);
        }, 1400);
      }
    }
  };

  const removeChip = (idx: number) => {
    if (!chipState || phase !== 'question') return;
    play('hover');
    const placed = [...chipState.placed];
    const [chip] = placed.splice(idx, 1);
    setChipState({ chips: [...chipState.chips, chip], placed });
  };

  const stars = correct / LEGS >= 0.85 ? 3 : correct / LEGS >= 0.6 ? 2 : correct / LEGS >= 0.35 ? 1 : 0;

  return (
    <div className="relative flex-1 overflow-hidden bg-foam">
      <div className="absolute inset-0">
        <SceneCanvas camera={{ position: [0, 6, 12], fov: 50 }} fog={{ color: '#BDEFF2', near: 30, far: 85 }}>
          <VoyageScene
            wind={phase === 'sailing' || phase === 'celebrate' ? Math.max(wind, 0.6) : wind}
            sailing={phase === 'sailing'}
            celebrating={phase === 'celebrate' || phase === 'done'}
            legZ={legZ}
            activeLeg={leg}
            jumpKey={jumpKey}
          />
        </SceneCanvas>
      </div>

      <GameHUD title="Dhow Voyager" cefr="A2–B1" score={score} stars={storedStars} />

      {/* distance counter */}
      <div className="absolute top-20 left-3 z-40 bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-1.5 flex items-center gap-2 font-extrabold text-ink">
        <Ship size={16} className="text-door" />
        <motion.span key={nm} initial={{ scale: 1.15 }} animate={{ scale: 1 }}>
          {nm} nm sailed
        </motion.span>
      </div>

      {/* voyage progress bar */}
      <div className="absolute top-[7.5rem] left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-2 flex items-center gap-1.5">
        <Compass size={15} className="text-door mr-1" />
        {Array.from({ length: LEGS }).map((_, i) => (
          <motion.span
            key={i}
            animate={i === leg ? { scale: [1, 1.3, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className={`w-3.5 h-3.5 rounded-full border-2 ${
              i < leg
                ? 'bg-turquoise border-turquoise'
                : i === leg
                  ? 'bg-sunshine border-sunshine'
                  : 'bg-white border-ink/15'
            }`}
          />
        ))}
        <Wind size={15} className="text-turquoise ml-1" />
      </div>

      <StarBurst show={burst} />

      {/* question / chip-builder overlay */}
      <div className="absolute inset-x-0 bottom-0 z-40 p-4 pb-6 flex flex-col items-center gap-3 pointer-events-none">
        <AnimatePresence>
          {hintOpen && (
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="pointer-events-auto bg-paper/95 backdrop-blur rounded-3xl border-2 border-turquoise/50 shadow-xl p-4 max-w-sm flex items-start gap-3"
            >
              <Mascot className="w-14 h-14 shrink-0" />
              <div>
                <p className="font-display font-extrabold text-door text-sm">Fulous bubbles up a hint!</p>
                <p className="text-sm text-ink/70">{q?.fact ?? 'Read the sentence again, sailor!'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'question' && q && !isChipLeg && (
            <div className="pointer-events-auto w-full max-w-lg" key={`q-${leg}`}>
              <QuestionCard question={q} onAnswer={answer} selected={selected} showHint={false} />
            </div>
          )}
          {phase === 'question' && q && isChipLeg && chipState && (
            <motion.div
              key={`c-${leg}`}
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={
                chipWrong
                  ? { x: [0, -12, 12, -8, 8, 0], scale: 1, opacity: 1, y: 0 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="pointer-events-auto bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-6 w-full max-w-lg"
            >
              <p className="font-display font-extrabold text-xl text-ink mb-1">
                Build the sentence to catch the wind!
              </p>
              <p className="text-xs text-ink/50 mb-3">Tap the word chips in the right order.</p>
              {/* placed tray */}
              <div className="min-h-14 rounded-2xl border-2 border-dashed border-turquoise/50 bg-turquoise/10 p-2 flex flex-wrap gap-2 mb-4">
                {chipState.placed.map((w, i) => (
                  <motion.button
                    layout="position"
                    key={`${w}-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => removeChip(i)}
                    className="rounded-full bg-door text-white font-bold px-3.5 py-1.5 text-sm shadow"
                  >
                    {w}
                  </motion.button>
                ))}
                {chipState.placed.length === 0 && (
                  <span className="text-ink/40 text-sm self-center px-2">Your sentence appears here…</span>
                )}
              </div>
              {/* chip pool */}
              <div className="flex flex-wrap gap-2">
                {chipState.chips.map((w, i) => (
                  <motion.button
                    layout="position"
                    key={`${w}-${i}`}
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => placeChip(w, i)}
                    className="rounded-full bg-white hover:bg-turquoise/15 text-ink font-bold px-3.5 py-1.5 text-sm shadow border-2 border-white/60"
                  >
                    {w}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          {phase === 'sailing' && (
            <motion.div
              key="sailing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-paper/80 backdrop-blur rounded-full px-6 py-2.5 font-display font-extrabold text-door shadow-lg border-2 border-white/60"
            >
              Full sails! Onward to the next island…
            </motion.div>
          )}
          {phase === 'celebrate' && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-paper/80 backdrop-blur rounded-full px-6 py-2.5 font-display font-extrabold text-door shadow-lg border-2 border-white/60"
            >
              The Al Ayjah lighthouse welcomes you home!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ResultModal
        open={phase === 'done'}
        stars={stars}
        score={score}
        title="Voyage Complete!"
        message={`You sailed ${LEGS * NM_PER_LEG} nm and answered ${correct}/${LEGS} correctly. Sindbad would be proud!`}
        onReplay={() => {
          play('click');
          setLeg(0);
          setScore(0);
          setCorrect(0);
          setNm(0);
          setWind(0);
          setSelected(null);
          setPhase('question');
        }}
        onContinue={() => {
          play('click');
          navigate('/progress');
        }}
      />
    </div>
  );
}
