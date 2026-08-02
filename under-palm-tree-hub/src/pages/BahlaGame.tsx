import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Text, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Lightbulb, BookOpen } from 'lucide-react';
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
const TERRA = '#C97B4A';
const CLAY = '#A95F3B';
const DOOR = '#1E8C82';
const BRASS = '#D9A441';
const GLOW = '#7DF9E8';
const INDIGO = '#2B2D5C';
const WATER = '#3ED6C5';
const PALM = '#4FBF67';
const PALM_D = '#2F9E4F';
const TRUNK = '#8A5A33';
const PAPER = '#FFF9EE';

const RIDDLE_COUNT = 8;

type Phase = 'riddle' | 'story' | 'finale' | 'done';

interface Story {
  title: string;
  text: string;
  q: string;
  choices: string[];
  answer: number;
}

const STORIES: Story[] = [
  {
    title: 'The Wall the Jinn Built',
    text: 'Long ago, the people of Bahla woke to find a huge wall around their oasis. The elders say friendly jinn built it in a single night to protect the town. In the morning, the grateful people left sweet dates and cool water by the gate for their unseen helpers.',
    q: 'Why did the jinn build the wall?',
    choices: ['To protect the town', 'To hide treasure', 'To block the wind', 'To trap the people'],
    answer: 0,
  },
  {
    title: 'The Potter of Bahla',
    text: 'Salim the potter shaped clay jars every day beside the old fort. One evening he found his wheel spinning by itself, and ten perfect jars stood in a row. A small voice giggled from the shadows. From then on, Salim always left one jar empty — "for my jinn friend," he smiled.',
    q: 'What did Salim find one evening?',
    choices: ['Ten perfect jars made by his jinn friend', 'A broken wheel', 'A bag of gold coins', 'A lost camel'],
    answer: 0,
  },
  {
    title: 'The Lantern of the Courtyard',
    text: 'Every dusk, old Maryam lit the lantern in the fort courtyard. Travelers said its light never went out, even in the strongest wind. Maryam whispered that a tiny jinn curled up inside the glass and kept the flame warm all night long.',
    q: 'What kept the lantern burning?',
    choices: ['A tiny jinn kept the flame warm', 'Special oil from the souq', 'A very thick glass', 'The evening breeze'],
    answer: 0,
  },
];

/* ================= 3D pieces ================= */

function Lantern({ position }: { position: [number, number, number] }) {
  const flame = useRef<Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = 0.85 + Math.sin(t * 9 + position[0] * 7) * 0.1 + Math.sin(t * 23) * 0.05;
    if (flame.current)
      (flame.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 * flicker;
    if (light.current) light.current.intensity = 1.6 * flicker;
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.42, 6]} />
        <meshStandardMaterial color={BRASS} flatShading />
      </mesh>
      <mesh ref={flame}>
        <sphereGeometry args={[0.09, 6, 6]} />
        <meshStandardMaterial color="#FFB54D" emissive="#FFB54D" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.14, 0.16, 6]} />
        <meshStandardMaterial color={BRASS} flatShading />
      </mesh>
      <pointLight ref={light} color="#FFB54D" intensity={1.6} distance={7} />
    </group>
  );
}

function CrenellatedWall({
  position,
  rotationY = 0,
  length,
}: {
  position: [number, number, number];
  rotationY?: number;
  length: number;
}) {
  const count = Math.floor(length / 0.9);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
        <boxGeometry args={[length, 3.2, 0.7]} />
        <meshStandardMaterial color={TERRA} flatShading />
      </mesh>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} castShadow position={[-length / 2 + 0.5 + i * 0.9, 3.45, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.7]} />
          <meshStandardMaterial color={CLAY} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function CourtyardDoor({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  const studs = useMemo(() => {
    const arr: [number, number][] = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) arr.push([c * 0.7 - 0.35, r * 0.6 - 0.9]);
    return arr;
  }, []);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* arch frame */}
      <mesh castShadow position={[0, 1.3, 0]}>
        <boxGeometry args={[2, 2.6, 0.35]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
      {/* teal carved door */}
      <mesh castShadow position={[0, 1.15, 0.1]}>
        <boxGeometry args={[1.4, 2.3, 0.14]} />
        <meshStandardMaterial color={DOOR} flatShading />
      </mesh>
      {studs.map(([x, y], i) => (
        <mesh key={i} position={[x, y + 1.15, 0.2]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color={BRASS} emissive={BRASS} emissiveIntensity={0.4} flatShading />
        </mesh>
      ))}
      {/* arch top */}
      <mesh castShadow position={[0, 2.6, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.3, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
    </group>
  );
}

function PottedPalm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.6, 8]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.1, 0]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.07, 0.12, 1.2, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} castShadow position={[Math.sin(i * 2.1) * 0.22, 1.8 + (i % 2) * 0.1, Math.cos(i * 2.1) * 0.22]}>
          <icosahedronGeometry args={[0.4 - i * 0.05, 0]} />
          <meshStandardMaterial color={i % 2 ? PALM_D : PALM} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Fountain() {
  const jet = useRef<Mesh>(null);
  const water = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (jet.current) {
      jet.current.scale.y = 1 + Math.sin(t * 6) * 0.15;
      (jet.current.material as THREE.MeshStandardMaterial).opacity = 0.65 + Math.sin(t * 8) * 0.1;
    }
    if (water.current) water.current.rotation.y = t * 0.3;
  });
  return (
    <group position={[0, 0, -3.4]}>
      <mesh receiveShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.5, 10]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
      <mesh ref={water} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.52, 0]}>
        <circleGeometry args={[1.45, 12]} />
        <meshStandardMaterial color={WATER} flatShading transparent opacity={0.9} />
      </mesh>
      <mesh ref={jet} position={[0, 1.1, 0]}>
        <coneGeometry args={[0.22, 1.2, 6]} />
        <meshStandardMaterial color={GLOW} transparent opacity={0.7} flatShading />
      </mesh>
      <Sparkles count={20} color={GLOW} size={2.5} speed={0.8} scale={[2.5, 1.6, 2.5]} position={[0, 1, 0]} />
    </group>
  );
}

/** The friendly guardian jinn — materializes from the fountain. */
function Jinn({ visible, celebrating }: { visible: boolean; celebrating: boolean }) {
  const g = useRef<Group>(null);
  const orb1 = useRef<Mesh>(null);
  const orb2 = useRef<Mesh>(null);
  const orb3 = useRef<Mesh>(null);
  const scaleRef = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    scaleRef.current += ((visible ? 1 : 0) - scaleRef.current) * 0.06;
    if (!g.current) return;
    const s = scaleRef.current;
    g.current.visible = s > 0.02;
    g.current.scale.setScalar(Math.max(0.001, s * (celebrating ? 1.15 : 1)));
    g.current.position.y = 1.9 + Math.sin(t * 1.6) * 0.18;
    g.current.rotation.y = Math.sin(t * 0.7) * 0.25;
    // juggling orbs
    [orb1, orb2, orb3].forEach((r, i) => {
      if (!r.current) return;
      const a = t * 2 + (i * Math.PI * 2) / 3;
      r.current.position.set(Math.cos(a) * 0.9, Math.sin(a) * 0.5 + 0.7, Math.sin(a * 0.5) * 0.3);
    });
  });
  return (
    <group ref={g} position={[0, 1.9, -1.6]}>
      {/* ghost body */}
      <mesh castShadow>
        <sphereGeometry args={[0.75, 10, 8]} />
        <meshStandardMaterial color={GLOW} transparent opacity={0.75} emissive={GLOW} emissiveIntensity={0.5} flatShading />
      </mesh>
      {/* wisp tail */}
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 1, 8]} />
        <meshStandardMaterial color={GLOW} transparent opacity={0.5} emissive={GLOW} emissiveIntensity={0.6} flatShading />
      </mesh>
      {/* eyes */}
      <mesh position={[-0.24, 0.15, 0.62]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={INDIGO} />
      </mesh>
      <mesh position={[0.24, 0.15, 0.62]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={INDIGO} />
      </mesh>
      <mesh position={[-0.2, 0.19, 0.7]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.28, 0.19, 0.7]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* smile */}
      <mesh position={[0, -0.12, 0.66]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.16, 0.035, 6, 12, Math.PI]} />
        <meshStandardMaterial color={INDIGO} />
      </mesh>
      {/* brass lamp */}
      <mesh position={[0.75, -0.3, 0.2]}>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial color={BRASS} emissive={BRASS} emissiveIntensity={0.5} flatShading />
      </mesh>
      <mesh position={[0.92, -0.28, 0.2]} rotation={[0, 0, -0.8]}>
        <coneGeometry args={[0.07, 0.25, 6]} />
        <meshStandardMaterial color={BRASS} flatShading />
      </mesh>
      {/* juggling orbs */}
      {[orb1, orb2, orb3].map((r, i) => (
        <mesh key={i} ref={r}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial
            color={['#FFD93D', '#FF7A66', '#E5599C'][i]}
            emissive={['#FFD93D', '#FF7A66', '#E5599C'][i]}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
      <pointLight color={GLOW} intensity={2.4} distance={8} />
      <Sparkles count={30} color={GLOW} size={3} speed={1.2} scale={[2.5, 3, 2.5]} />
    </group>
  );
}

interface TabletProps {
  index: number;
  label: string;
  state: 'idle' | 'correct' | 'wrong' | 'dim';
  onPick: (i: number) => void;
  playHover: () => void;
}

/** Floating stone riddle tablet with glowing rune border. */
function Tablet({ index, label, state, onPick, playHover }: TabletProps) {
  const g = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const flyT = useRef(-1);
  useEffect(() => {
    if (state === 'correct') flyT.current = 0;
  }, [state]);
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    const target = hovered && state === 'idle' ? 1.08 : 1;
    g.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    if (state === 'correct') {
      // fly to the chest
      flyT.current += delta * 1.1;
      const p = Math.min(1, flyT.current);
      const from = new THREE.Vector3((index - 1) * 3.2, 2.1, 1.2);
      const to = new THREE.Vector3(3.4, 0.9, -2.2);
      g.current.position.lerpVectors(from, to, p * p);
      g.current.position.y += Math.sin(p * Math.PI) * 1.6;
      g.current.rotation.z = p * 0.6;
      g.current.scale.setScalar(1 - p * 0.6);
    } else {
      g.current.position.y = 2.1 + Math.sin(t * 1.4 + index * 1.7) * 0.12;
      g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, hovered ? -0.18 : 0, 0.1);
      g.current.rotation.z = THREE.MathUtils.lerp(g.current.rotation.z, state === 'wrong' ? Math.sin(t * 30) * 0.06 : 0, 0.4);
    }
  });
  const borderColor = state === 'correct' ? '#FFD93D' : state === 'wrong' ? '#FF7A66' : hovered ? GLOW : BRASS;
  return (
    <group
      ref={g}
      position={[(index - 1) * 3.2, 2.1, 1.2]}
      onClick={(e) => {
        e.stopPropagation();
        if (state === 'idle') onPick(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        playHover();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[2.6, 1.5, 0.18]} />
        <meshStandardMaterial
          color={state === 'dim' ? '#8A8073' : '#B8AE9C'}
          flatShading
          emissive={state === 'correct' ? '#FFD93D' : '#000000'}
          emissiveIntensity={state === 'correct' ? 0.35 : 0}
        />
      </mesh>
      {/* rune border */}
      <mesh position={[0, 0, 0.1]}>
        <ringGeometry args={[0.85, 0.95, 4]} />
        <meshStandardMaterial color={borderColor} emissive={borderColor} emissiveIntensity={1.2} side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, 0, 0.12]}
        fontSize={0.19}
        maxWidth={2.3}
        lineHeight={1.25}
        color={state === 'dim' ? '#5C554B' : '#21323B'}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {label}
      </Text>
      {hovered && state === 'idle' && (
        <pointLight color={GLOW} intensity={1.4} distance={3} />
      )}
    </group>
  );
}

/** Treasure chest that pops open with golden light. */
function Chest({ open, burstKey }: { open: boolean; burstKey: number }) {
  const lid = useRef<Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const pop = useRef(0);
  useEffect(() => {
    if (burstKey > 0) pop.current = 1;
  }, [burstKey]);
  useFrame((_, delta) => {
    if (lid.current) {
      const target = open ? -1.6 : 0;
      lid.current.rotation.x += (target - lid.current.rotation.x) * 0.08;
    }
    if (light.current) {
      light.current.intensity += ((open ? 3.5 : 0) - light.current.intensity) * 0.1;
      if (pop.current > 0) {
        light.current.intensity = 6 * pop.current;
        pop.current = Math.max(0, pop.current - delta * 1.4);
      }
    }
  });
  return (
    <group position={[3.4, 0.35, -2.2]} rotation={[0, -0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.1, 0.7, 0.8]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      <mesh ref={lid} castShadow position={[0, 0.35, -0.4]}>
        <boxGeometry args={[1.1, 0.35, 0.8]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0.41]}>
        <boxGeometry args={[0.16, 0.22, 0.05]} />
        <meshStandardMaterial color={BRASS} emissive={BRASS} emissiveIntensity={0.6} />
      </mesh>
      {open && (
        <>
          <mesh position={[0, 0.35, 0]}>
            <icosahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#FFD93D" emissive="#FFD93D" emissiveIntensity={1.6} flatShading />
          </mesh>
          <Sparkles count={50} color="#FFD93D" size={4} speed={2} scale={[2, 2.5, 2]} position={[0, 0.6, 0]} />
        </>
      )}
      <pointLight ref={light} color="#FFD93D" intensity={0} distance={8} />
    </group>
  );
}

interface FortSceneProps {
  options: string[];
  tabletStates: ('idle' | 'correct' | 'wrong' | 'dim')[];
  jinnVisible: boolean;
  chestOpen: boolean;
  burstKey: number;
  celebrating: boolean;
  onPick: (i: number) => void;
  playHover: () => void;
}

function FortScene({ options, tabletStates, jinnVisible, chestOpen, burstKey, celebrating, onPick, playHover }: FortSceneProps) {
  const cam = useRef<Group>(null);
  useFrame(({ clock, camera }) => {
    // slow cinematic pan
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.12) * 2;
    camera.lookAt(0, 1.8, -1);
  });
  return (
    <>
      <color attach="background" args={[INDIGO]} />
      <Stars radius={60} depth={20} count={1400} factor={3} saturation={0.4} fade speed={0.6} />
      {/* mosaic floor rings */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
        <circleGeometry args={[11, 24]} />
        <meshStandardMaterial color="#E8DCC8" flatShading />
      </mesh>
      {[3, 5, 7].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01 + i * 0.004, -1]}>
          <ringGeometry args={[r - 0.25, r, 32]} />
          <meshStandardMaterial color={[DOOR, PAPER, BRASS][i]} flatShading />
        </mesh>
      ))}
      {/* walls */}
      <CrenellatedWall position={[0, 0, -9]} length={20} />
      <CrenellatedWall position={[-9.5, 0, -1]} rotationY={Math.PI / 2} length={17} />
      <CrenellatedWall position={[9.5, 0, -1]} rotationY={Math.PI / 2} length={17} />
      {/* doors */}
      <CourtyardDoor position={[-4, 0, -8.6]} />
      <CourtyardDoor position={[4, 0, -8.6]} />
      {/* arched niches with lanterns */}
      {[-7, -2.3, 2.3, 7].map((x, i) => (
        <group key={i} position={[x, 2.4, -8.5]}>
          <mesh>
            <boxGeometry args={[1, 1.2, 0.4]} />
            <meshStandardMaterial color={CLAY} flatShading />
          </mesh>
          <Lantern position={[0, 0, 0.35]} />
        </group>
      ))}
      <Lantern position={[-9, 2.6, -4]} />
      <Lantern position={[9, 2.6, -4]} />
      {/* potted palms */}
      <PottedPalm position={[-7.5, 0, 2.5]} />
      <PottedPalm position={[7.5, 0, 2.5]} />
      <PottedPalm position={[-7.5, 0, -6]} scale={0.85} />
      <PottedPalm position={[7.5, 0, -6.5]} scale={0.9} />
      <Fountain />
      <group ref={cam}>
        <Jinn visible={jinnVisible} celebrating={celebrating} />
      </group>
      {options.map((label, i) => (
        <Tablet key={`${label}-${i}`} index={i} label={label} state={tabletStates[i]} onPick={onPick} playHover={playHover} />
      ))}
      <Chest open={chestOpen} burstKey={burstKey} />
      {/* dusk warm fill */}
      <pointLight position={[0, 5, 4]} color="#FF9E7A" intensity={0.7} distance={20} />
    </>
  );
}

/* ================= Page ================= */

export default function BahlaGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const storedStars = useGameStore((s) => s.games.bahla.stars[1] ?? 0);

  const riddles = useMemo<GameQuestion[]>(() => {
    const levels = getGameQuestions('bahla');
    const all = levels.flatMap((l) => l.questions);
    return Array.from({ length: RIDDLE_COUNT }, (_, i) => all[i % all.length]);
  }, []);

  // story breaks after riddle 2, 4, 6 (0-based after indexes 1, 3, 5)
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('riddle');
  const [storyIdx, setStoryIdx] = useState(0);
  const [storySelected, setStorySelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [tabletStates, setTabletStates] = useState<('idle' | 'correct' | 'wrong' | 'dim')[]>(['idle', 'idle', 'idle']);
  const [burst, setBurst] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [giggle, setGiggle] = useState(false);
  const [typed, setTyped] = useState(0);
  const [typeDone, setTypeDone] = useState(false);

  const riddle = riddles[riddleIdx];
  const treasure = correct / RIDDLE_COUNT;
  const story = STORIES[storyIdx] ?? null;
  const showStory = phase === 'story' && story != null;

  // typewriter for riddle text (18ms/char), skippable on click
  useEffect(() => {
    if (phase !== 'riddle' || !riddle) return;
    setTyped(0);
    setTypeDone(false);
    const len = riddle.q.length;
    const iv = setInterval(() => {
      setTyped((n) => {
        if (n + 1 >= len) {
          clearInterval(iv);
          setTypeDone(true);
        }
        return Math.min(len, n + 1);
      });
    }, 18);
    return () => clearInterval(iv);
  }, [phase, riddleIdx, riddle]);

  const skipType = () => {
    if (!typeDone && riddle) {
      setTyped(riddle.q.length);
      setTypeDone(true);
    }
  };

  const advance = useCallback(
    (newCorrect: number) => {
      setTabletStates(['idle', 'idle', 'idle']);
      setHintUsed(false);
      setGiggle(false);
      const next = riddleIdx + 1;
      if (next >= RIDDLE_COUNT) {
        setPhase('finale');
        setChestOpen(true);
        setBurstKey((k) => k + 1);
        play('magic');
        play('success');
        setTimeout(() => {
          setPhase('done');
          const acc = newCorrect / RIDDLE_COUNT;
          const stars = acc >= 0.85 ? 3 : acc >= 0.6 ? 2 : acc >= 0.35 ? 1 : 0;
          recordResult('bahla', 1, scoreRef.current, stars);
        }, 2800);
      } else if (next % 2 === 0 && STORIES[next / 2 - 1]) {
        setStoryIdx(next / 2 - 1);
        setStorySelected(null);
        setPhase('story');
        setRiddleIdx(next);
      } else {
        setRiddleIdx(next);
        play('magic'); // jinn re-materializes with the next riddle
      }
    },
    [riddleIdx, play, recordResult],
  );

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const pick = (i: number) => {
    if (phase !== 'riddle' || !riddle || tabletStates[i] !== 'idle') return;
    const right = i === riddle.answer;
    if (right) {
      const pts = hintUsed ? 85 : 100;
      setScore((s) => s + pts);
      setCorrect((c) => {
        const nc = c + 1;
        setTimeout(() => advance(nc), 1700);
        return nc;
      });
      setTabletStates(riddle.choices.map((_, j) => (j === i ? 'correct' : 'dim')));
      play('magic');
      play('star');
      setBurst(true);
      setChestOpen(true);
      setBurstKey((k) => k + 1);
      setTimeout(() => {
        setBurst(false);
        setChestOpen(false);
      }, 1500);
    } else {
      setTabletStates((prev) => prev.map((s, j) => (j === i ? 'wrong' : s)));
      play('error');
      setGiggle(true);
      setTimeout(() => {
        setTabletStates((prev) => prev.map((s, j) => (j === i ? 'idle' : s)));
      }, 900);
    }
  };

  const useHint = () => {
    if (hintUsed || phase !== 'riddle') return;
    setHintUsed(true);
    setScore((s) => Math.max(0, s - 15));
    setGiggle(true);
    play('hover');
  };

  const answerStory = (i: number) => {
    if (storySelected != null || !story) return;
    setStorySelected(i);
    const right = i === story.answer;
    if (right) {
      setScore((s) => s + 50);
      play('success');
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
    } else {
      play('error');
    }
    setTimeout(() => {
      setPhase('riddle');
      setStorySelected(null);
      play('magic');
    }, 1600);
  };

  const stars = correct / RIDDLE_COUNT >= 0.85 ? 3 : correct / RIDDLE_COUNT >= 0.6 ? 2 : correct / RIDDLE_COUNT >= 0.35 ? 1 : 0;

  const options = phase === 'riddle' && riddle ? riddle.choices : [];
  const visibleStates = phase === 'riddle' ? tabletStates : options.map(() => 'dim' as const);

  return (
    <div className="relative flex-1 overflow-hidden bg-[#2B2D5C]">
      <div className="absolute inset-0">
        <SceneCanvas
          camera={{ position: [0, 4.5, 10], fov: 50 }}
          fog={{ color: INDIGO, near: 18, far: 45 }}
        >
          <FortScene
            options={options}
            tabletStates={visibleStates}
            jinnVisible={phase === 'riddle' || phase === 'finale'}
            chestOpen={chestOpen}
            burstKey={burstKey}
            celebrating={phase === 'finale' || phase === 'done'}
            onPick={pick}
            playHover={() => play('hover')}
          />
        </SceneCanvas>
      </div>

      <GameHUD title="Bahla: Fort of Riddles" cefr="B1" score={score} stars={storedStars} />

      {/* treasure meter */}
      <div className="absolute top-20 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-96 z-40 bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-2 flex items-center gap-3">
        <Gem size={16} className="text-fuchsia shrink-0" style={{ color: '#E5599C' }} />
        <div className="relative flex-1 h-3 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8B6FE8] to-[#7DF9E8]"
            animate={{ width: `${treasure * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <motion.div
            className="absolute inset-y-0 w-8 bg-white/40 rounded-full"
            animate={{ x: ['-2rem', '22rem'] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
          />
        </div>
        <span className="text-xs font-extrabold text-ink">{correct}/{RIDDLE_COUNT}</span>
      </div>

      <StarBurst show={burst} />

      {/* riddle parchment card */}
      <div className="absolute inset-x-0 bottom-0 z-40 p-4 pb-6 flex flex-col items-center gap-3 pointer-events-none">
        <AnimatePresence>
          {giggle && phase === 'riddle' && (
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="pointer-events-auto bg-paper/95 backdrop-blur rounded-3xl border-2 border-[#7DF9E8]/60 shadow-xl p-4 max-w-sm flex items-start gap-3"
            >
              <Mascot className="w-14 h-14 shrink-0" />
              <div>
                <p className="font-display font-extrabold text-[#1E8C82] text-sm">
                  {hintUsed ? 'The jinn whispers…' : 'The jinn giggles… try again!'}
                </p>
                <p className="text-sm text-ink/70">{riddle?.fact ?? 'Think of Omani heritage!'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'riddle' && riddle && (
            <motion.div
              key={`r-${riddleIdx}`}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={skipType}
              className="pointer-events-auto w-full max-w-xl rounded-3xl shadow-xl border-4 border-[#1E8C82] bg-[#FFF9EE]/95 backdrop-blur p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-white bg-[#8B6FE8] rounded-full px-3 py-1">
                  Riddle {riddleIdx + 1} of {RIDDLE_COUNT}
                </span>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    useHint();
                  }}
                  disabled={hintUsed}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold shadow border-2 ${
                    hintUsed
                      ? 'bg-ink/10 text-ink/40 border-transparent'
                      : 'bg-white text-[#A95F3B] border-[#D9A441]/50 hover:bg-[#D9A441]/10'
                  }`}
                >
                  <Lightbulb size={14} /> Jinn whisper (−15)
                </motion.button>
              </div>
              <p className="font-display font-bold text-lg sm:text-xl text-ink min-h-16">
                {riddle.q.slice(0, typed)}
                {!typeDone && <span className="animate-pulse text-[#1E8C82]">▌</span>}
              </p>
              <p className="text-xs text-ink/50 mt-2">Tap a glowing tablet above to answer.</p>
            </motion.div>
          )}

          {showStory && (
            <motion.div
              key={`s-${storyIdx}`}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="pointer-events-auto w-full max-w-xl flex flex-col gap-3"
            >
              <div className="rounded-3xl shadow-xl border-4 border-[#D9A441] bg-[#FFF9EE]/95 backdrop-blur p-6">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white bg-[#C97B4A] rounded-full px-3 py-1 mb-2">
                  <BookOpen size={12} /> A Bahla Tale
                </span>
                <h3 className="font-display font-extrabold text-xl text-ink">{story.title}</h3>
                <p className="text-ink/75 mt-2 leading-relaxed">{story.text}</p>
              </div>
              <QuestionCard
                question={{ q: story.q, choices: story.choices, answer: story.answer }}
                onAnswer={answerStory}
                selected={storySelected}
                showHint={false}
              />
            </motion.div>
          )}

          {phase === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-paper/80 backdrop-blur rounded-full px-6 py-2.5 font-display font-extrabold text-[#1E8C82] shadow-lg border-2 border-white/60"
            >
              The treasure of words bursts open in golden light!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ResultModal
        open={phase === 'done'}
        stars={stars}
        score={score}
        title="Treasure Unlocked!"
        message={`You solved ${correct}/${RIDDLE_COUNT} riddles. The jinn of Bahla bow to your wisdom!`}
        onReplay={() => {
          play('click');
          setRiddleIdx(0);
          setScore(0);
          setCorrect(0);
          setTabletStates(['idle', 'idle', 'idle']);
          setChestOpen(false);
          setHintUsed(false);
          setGiggle(false);
          setPhase('riddle');
        }}
        onContinue={() => {
          play('click');
          navigate('/progress');
        }}
      />
    </div>
  );
}
