import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Cloud } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, MapPin } from 'lucide-react';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import SceneCanvas from '@/components/SceneCanvas';
import GameHUD from '@/components/GameHUD';
import QuestionCard from '@/components/QuestionCard';
import StarBurst from '@/components/StarBurst';
import ResultModal from '@/components/ResultModal';
import { getGameQuestions } from '@/lib/questions';
import type { GameQuestion } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import { useSfx } from '@/lib/sfx';

/* ---------- palette ---------- */
const GRASS = '#4FBF67';
const GRASS_D = '#2F9E4F';
const GRASS_L = '#9FE870';
const WATER = '#3ED6C5';
const FOAM = '#EAFDF9';
const MIST = '#CFE8D8';
const FOREST = '#1F5C45';
const TRUNK = '#8A5A33';
const ROSE = '#E5599C';
const GOLD = '#FFD93D';
const AMBER = '#FFB54D';
const STONE = '#C9C2B4';

const WAYPOINTS = 6;
const Q_PER_WP = 2;

/** waypoint positions along the winding trail (x, y, z) */
const TRAIL: [number, number, number][] = [
  [-10, 0.6, 8],
  [-5, 1.4, 3],
  [0, 2.2, 6],
  [4, 3.0, 0],
  [8, 3.8, 4],
  [11, 4.8, -3],
];

const NPCS = [
  { name: 'Salma the Rose Farmer', color: ROSE },
  { name: 'Khalfan the Coconut Vendor', color: '#B8E34D' },
  { name: 'Maryam the Harvester', color: AMBER },
  { name: 'Bu Said the Waterfall Jinn', color: WATER },
  { name: 'Aisha the Storyteller', color: '#8B6FE8' },
  { name: 'The Frankincense Keeper', color: GOLD },
];

/* ---------- terraced hill ---------- */
function Terraces() {
  const levels = 5;
  return (
    <group>
      {Array.from({ length: levels }).map((_, i) => (
        <mesh
          key={i}
          receiveShadow
          position={[0, i * 1.1 - 0.6, 0]}
        >
          <cylinderGeometry args={[16 - i * 2.6, 17 - i * 2.6, 1.1, 14]} />
          <meshStandardMaterial
            color={i % 2 ? GRASS : GRASS_D}
            flatShading
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[60, 24]} />
        <meshStandardMaterial color={FOREST} flatShading />
      </mesh>
    </group>
  );
}

/* ---------- winding stone path ---------- */
function Path() {
  return (
    <group>
      {TRAIL.slice(0, -1).map((p, i) => {
        const q = TRAIL[i + 1];
        const dx = q[0] - p[0];
        const dz = q[2] - p[2];
        const len = Math.hypot(dx, dz);
        return (
          <group
            key={i}
            position={[(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + 0.03, (p[2] + q[2]) / 2]}
            rotation={[0, Math.atan2(dx, dz), 0]}
          >
            <mesh receiveShadow>
              <boxGeometry args={[1.1, 0.08, len + 0.6]} />
              <meshStandardMaterial color={STONE} flatShading />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- waterfall ---------- */
function Waterfall({ position }: { position: [number, number, number] }) {
  const strip = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (strip.current) {
      const m = strip.current.material as MeshStandardMaterial;
      m.opacity = 0.75 + Math.sin(t * 6) * 0.15;
    }
  });
  return (
    <group position={position}>
      <mesh ref={strip} position={[0, -0.5, 0]}>
        <planeGeometry args={[1.2, 3.2]} />
        <meshStandardMaterial
          color={FOAM}
          emissive={FOAM}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
          side={2}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.05, 0.8]}>
        <circleGeometry args={[1.4, 10]} />
        <meshStandardMaterial color={WATER} emissive={WATER} emissiveIntensity={0.3} />
      </mesh>
      <Sparkles count={20} scale={[2.5, 2, 2.5]} size={3} speed={1.4} color={FOAM} position={[0, -1.8, 0.6]} />
    </group>
  );
}

/* ---------- pomegranate tree ---------- */
function Tree({ position, seed = 0 }: { position: [number, number, number]; seed?: number }) {
  const crown = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crown.current) crown.current.rotation.z = Math.sin(t * 0.8 + seed) * 0.05;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.24, 1.2, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      <group ref={crown} position={[0, 1.6, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.95, 7, 6]} />
          <meshStandardMaterial color={GRASS_L} flatShading />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + seed;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.7, 0.2, Math.sin(a) * 0.7]}>
              <sphereGeometry args={[0.12, 6, 5]} />
              <meshStandardMaterial color="#E5484D" flatShading />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ---------- rose bush ---------- */
function RoseBush({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.55, 6, 5]} />
        <meshStandardMaterial color={GRASS_D} flatShading />
      </mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.35, 0.4, Math.sin(a) * 0.35]}>
            <sphereGeometry args={[0.14, 6, 5]} />
            <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.25} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------- coconut palm ---------- */
function Palm({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 2.2, 6]} />
        <meshStandardMaterial color={TRUNK} flatShading />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.7 + 0.3, 2.3, Math.sin(a) * 0.7]}
            rotation={[0.5, -a, 0]}
          >
            <coneGeometry args={[0.28, 1.4, 4]} />
            <meshStandardMaterial color={GRASS} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------- frankincense tree with glowing resin ---------- */
function FrankincenseTree({ position, resin }: { position: [number, number, number]; resin: number }) {
  const drops = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    drops.current?.children.forEach((c, i) => {
      const m = (c as Mesh).material as MeshStandardMaterial;
      m.emissiveIntensity = 1 + Math.sin(t * 3 + i) * 0.5;
    });
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.22, 0.4, 1.8, 6]} />
        <meshStandardMaterial color="#C9B18A" flatShading />
      </mesh>
      <mesh position={[-0.5, 1.6, 0]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.12, 0.2, 1.2, 5]} />
        <meshStandardMaterial color="#C9B18A" flatShading />
      </mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.9, 2.3, Math.sin(a) * 0.9]} castShadow>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color={i % 2 ? GRASS_L : GRASS} flatShading />
          </mesh>
        );
      })}
      <group ref={drops}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          const lit = i < resin;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.55, 1.4 + (i % 3) * 0.4, Math.sin(a) * 0.55]}>
              <sphereGeometry args={[0.12, 6, 5]} />
              <meshStandardMaterial
                color={AMBER}
                emissive={lit ? AMBER : '#000000'}
                emissiveIntensity={lit ? 1.4 : 0}
                flatShading
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ---------- waypoint NPC ---------- */
function Npc({
  index,
  active,
  done,
}: {
  index: number;
  active: boolean;
  done: boolean;
}) {
  const [x, y, z] = TRAIL[index];
  const body = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (body.current) {
      body.current.position.y = active ? Math.abs(Math.sin(t * 4)) * 0.25 : 0;
      body.current.rotation.y = active ? Math.sin(t * 2) * 0.3 : 0;
    }
  });
  const color = NPCS[index].color;
  return (
    <group position={[x + 1.2, y, z]}>
      <group ref={body}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <capsuleGeometry args={[0.32, 0.5, 4, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={active ? color : '#000000'}
            emissiveIntensity={active ? 0.4 : 0}
            flatShading
          />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 6]} />
          <meshStandardMaterial color="#F2C89B" flatShading />
        </mesh>
        {/* waving arm */}
        {active && (
          <mesh position={[0.4, 1, 0]} rotation={[0, 0, -1]}>
            <capsuleGeometry args={[0.09, 0.4, 3, 6]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        )}
      </group>
      {/* done marker */}
      {done && (
        <mesh position={[0, 1.9, 0]}>
          <sphereGeometry args={[0.16, 8, 6]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} />
        </mesh>
      )}
    </group>
  );
}

/* ---------- glowing next-waypoint marker ---------- */
function Marker({ index }: { index: number }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = 0.4 + Math.sin(t * 2.5) * 0.15;
      ref.current.rotation.y = t * 1.5;
      const s = 1 + Math.sin(t * 3) * 0.12;
      ref.current.scale.setScalar(s);
    }
  });
  if (index >= WAYPOINTS) return null;
  const [x, y, z] = TRAIL[index];
  return (
    <mesh ref={ref} position={[x, y + 0.4, z]}>
      <octahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.6} flatShading />
    </mesh>
  );
}

/* ---------- hopping goat ---------- */
function Goat({ progress }: { progress: number }) {
  const ref = useRef<Group>(null);
  const seg = Math.min(WAYPOINTS - 2, Math.floor(progress));
  const f = progress - seg;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    const p = TRAIL[seg];
    const q = TRAIL[Math.min(WAYPOINTS - 1, seg + 1)];
    const hop = Math.abs(Math.sin(t * 5)) * 0.5;
    ref.current.position.set(
      p[0] - 1 + (q[0] - p[0]) * f,
      p[1] + (q[1] - p[1]) * f + hop,
      p[2] + (q[2] - p[2]) * f,
    );
    ref.current.rotation.y = Math.atan2(q[0] - p[0], q[2] - p[2]);
  });
  return (
    <group ref={ref}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.55, 0.4, 0.35]} />
        <meshStandardMaterial color={FOAM} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.62, 0.28]}>
        <boxGeometry args={[0.24, 0.26, 0.24]} />
        <meshStandardMaterial color={FOAM} flatShading />
      </mesh>
      {[-0.08, 0.08].map((x) => (
        <mesh key={x} position={[x, 0.82, 0.32]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.05, 0.22, 4]} />
          <meshStandardMaterial color={STONE} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- drifting mist puffs ---------- */
function MistPuffs() {
  const ref = useRef<Group>(null);
  const puffs = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        p: [((i * 41) % 24) - 12, 2 + (i % 4), ((i * 29) % 18) - 9] as [number, number, number],
        s: 1.6 + (i % 3),
        seed: i * 1.3,
      })),
    [],
  );
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current?.children.forEach((c, i) => {
      c.position.x = puffs[i].p[0] + Math.sin(t * 0.25 + puffs[i].seed) * 2.2;
    });
  });
  return (
    <group ref={ref}>
      {puffs.map((p, i) => (
        <mesh key={i} position={p.p}>
          <sphereGeometry args={[p.s, 8, 6]} />
          <meshStandardMaterial color={MIST} transparent opacity={0.28} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- rainbow at finale ---------- */
function Rainbow({ show }: { show: boolean }) {
  if (!show) return null;
  const colors = ['#FF7A66', '#FFB54D', '#FFD93D', '#9FE870', '#3ED6C5', '#8B6FE8'];
  return (
    <group position={[0, 6, -14]}>
      {colors.map((c, i) => (
        <mesh key={c} rotation={[0, 0, 0]}>
          <torusGeometry args={[10 - i * 0.5, 0.22, 6, 24, Math.PI]} />
          <meshStandardMaterial color={c} transparent opacity={0.55} emissive={c} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- mountain village ---------- */
function Village({ lit }: { lit: boolean }) {
  return (
    <group position={[11, 4.8, -7]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[(i - 1) * 1.8, 0, (i % 2) * 1.4]}>
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.2, 1.1, 1.2]} />
            <meshStandardMaterial color="#FFFFFF" flatShading />
          </mesh>
          <mesh castShadow position={[0, 1.3, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.95, 0.7, 4]} />
            <meshStandardMaterial color="#1E8C82" flatShading />
          </mesh>
          {/* lantern */}
          <mesh position={[0.7, 0.9, 0.7]}>
            <sphereGeometry args={[0.1, 6, 5]} />
            <meshStandardMaterial
              color={GOLD}
              emissive={GOLD}
              emissiveIntensity={lit ? 2 : 0.15}
            />
          </mesh>
        </group>
      ))}
      {lit && <pointLight position={[0, 3, 0]} color={GOLD} intensity={10} distance={12} />}
    </group>
  );
}

/* ---------- camera rig ---------- */
function CameraRig({ wp }: { wp: number }) {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const i = Math.min(WAYPOINTS - 1, wp);
    const [x, y, z] = TRAIL[i];
    const tx = x + 9;
    const ty = y + 7;
    const tz = z + 9;
    camera.position.x += (tx + Math.sin(t * 0.4) * 0.3 - camera.position.x) * 0.03;
    camera.position.y += (ty - camera.position.y) * 0.03;
    camera.position.z += (tz - camera.position.z) * 0.03;
    camera.lookAt(x, y + 1, z);
  });
  return null;
}

/* ---------- page ---------- */
type Phase = 'dialogue' | 'question' | 'celebrate' | 'done';

export default function KhareefGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const totalStars = useGameStore((s) => s.totalStars());

  const questions = useMemo<GameQuestion[]>(() => {
    const levels = getGameQuestions('khareef');
    return levels.flatMap((l) => l.questions).slice(0, WAYPOINTS * Q_PER_WP);
  }, []);

  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [resin, setResin] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('dialogue');
  const [burst, setBurst] = useState(false);
  const [retry, setRetry] = useState(false);
  const [result, setResult] = useState(false);

  const wp = Math.min(WAYPOINTS - 1, Math.floor(qi / Q_PER_WP));
  const npc = NPCS[wp];
  const finished = phase === 'celebrate' || phase === 'done';

  const answer = (i: number) => {
    const q = questions[qi];
    if (!q || selected != null) return;
    setSelected(i);
    if (i === q.answer) {
      play('star');
      setBurst(true);
      const gained = retry ? 60 : 100;
      setScore((s) => s + gained);
      setTimeout(() => {
        setBurst(false);
        setSelected(null);
        setRetry(false);
        const next = qi + 1;
        if (next % Q_PER_WP === 0) {
          setResin((r) => r + 1);
          play('magic');
          if (next >= questions.length) {
            setPhase('done');
            play('success');
            const stars = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : 1;
            recordResult('khareef', 1, score + gained, stars);
            setTimeout(() => setResult(true), 1600);
          } else {
            setPhase('celebrate');
            setTimeout(() => {
              setQi(next);
              setPhase('dialogue');
            }, 1600);
          }
        } else {
          setQi(next);
        }
      }, 900);
    } else {
      play('error');
      setMistakes((m) => m + 1);
      setTimeout(() => {
        setSelected(null);
        setRetry(true);
      }, 900);
    }
  };

  const replay = () => {
    play('click');
    setQi(0);
    setScore(0);
    setMistakes(0);
    setResin(0);
    setSelected(null);
    setRetry(false);
    setPhase('dialogue');
    setResult(false);
  };

  const starsEarned = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : 1;

  return (
    <div className="relative flex-1 min-h-[100dvh] overflow-hidden bg-mist">
      <div className="absolute inset-0">
        <SceneCanvas
          camera={{ position: [10, 8, 10], fov: 48 }}
          fog={{ color: MIST, near: 20, far: 55 }}
        >
          <CameraRig wp={finished ? WAYPOINTS - 1 : wp} />
          <Terraces />
          <Path />
          <Waterfall position={[-2, 3.6, -4]} />
          <Waterfall position={[6, 2.4, -6]} />
          <Tree position={[-8, 0.6, 5]} seed={1} />
          <Tree position={[2, 2.2, 8]} seed={2} />
          <Tree position={[7, 3.8, 1]} seed={3} />
          <RoseBush position={[-6, 1.4, 1]} />
          <RoseBush position={[1, 2.2, 4]} />
          <RoseBush position={[5, 3, 3]} />
          <Palm position={[-11, 0.6, 10]} />
          <Palm position={[3, 2.2, 9]} />
          <FrankincenseTree position={[11, 4.8, -1]} resin={resin} />
          <Village lit={phase === 'done'} />
          <Rainbow show={phase === 'done'} />
          {TRAIL.map((_, i) => (
            <Npc key={i} index={i} active={i === wp && !finished} done={i < wp || phase === 'done'} />
          ))}
          <Marker index={finished ? WAYPOINTS : wp} />
          <Goat progress={Math.min(WAYPOINTS - 1.01, wp + (finished ? 0.9 : 0.15))} />
          <MistPuffs />
          <Cloud position={[-8, 9, -6]} speed={0.2} opacity={0.5} segments={10} bounds={[4, 1.5, 4]} color="#FFFFFF" />
          <Cloud position={[8, 10, 2]} speed={0.25} opacity={0.45} segments={10} bounds={[5, 1.5, 5]} color="#FFFFFF" />
          <Sparkles count={50} scale={[24, 8, 20]} size={3} speed={0.5} color="#9FE870" position={[0, 4, 0]} />
          <Sparkles count={30} scale={[20, 6, 16]} size={2.5} speed={0.4} color={ROSE} position={[0, 3, 2]} />
        </SceneCanvas>
      </div>

      <GameHUD title="Khareef Quest" cefr="Mixed" score={score} stars={totalStars} />

      {/* resin counter + trail progress */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <div className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow px-4 py-1.5 flex items-center gap-2 font-extrabold text-ink">
          <Droplet size={16} style={{ color: AMBER }} fill={AMBER} />
          <span>{resin}/{WAYPOINTS} resin drops</span>
        </div>
        <div className="flex gap-1.5">
          {TRAIL.map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i === wp && !finished ? 1.25 : 1 }}
              className="w-7 h-7 rounded-full grid place-items-center border-2 border-white/60 shadow"
              style={{
                backgroundColor: i < wp || phase === 'done' ? GRASS_L : i === wp ? GOLD : '#C9C2B4',
              }}
            >
              <MapPin size={13} className="text-ink" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 p-4 flex flex-col items-center gap-3 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 'dialogue' && (
            <motion.div
              key={`dlg-${wp}`}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="pointer-events-auto w-full max-w-lg bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white shadow shrink-0"
                  style={{ backgroundColor: npc.color }}
                />
                <div>
                  <p className="font-display font-extrabold text-ink">{npc.name}</p>
                  <p className="text-sm text-ink/60 font-bold">
                    Waypoint {wp + 1} of {WAYPOINTS}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-ink/80 font-bold">
                {wp === 0 && 'Ahlan! The khareef mist has made the mountains green. Help me with my harvest questions and I will show you the trail.'}
                {wp === 1 && 'Coconuts for the festival! Answer my questions and the path upward is yours.'}
                {wp === 2 && 'The pomegranates are heavy this season. Show me your English and we will pick them together!'}
                {wp === 3 && 'I keep the waterfalls singing. Listen well, traveller — my questions flow fast like the water!'}
                {wp === 4 && 'Sit by the fire, little one. I will tell you a khareef festival tale — then you must remember it well.'}
                {wp === 5 && 'You have climbed far! Answer my final questions and the frankincense tree will give you its golden tears.'}
              </p>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  play('click');
                  setPhase('question');
                }}
                className="mt-4 rounded-full px-5 py-2.5 font-bold text-white bg-gradient-to-r from-turquoise to-palm shadow-lg"
              >
                I'm ready!
              </motion.button>
            </motion.div>
          )}

          {phase === 'question' && questions[qi] && (
            <div key={qi} className="pointer-events-auto w-full flex justify-center">
              <QuestionCard
                question={questions[qi]}
                onAnswer={answer}
                selected={selected}
              />
            </div>
          )}

          {phase === 'celebrate' && (
            <motion.div
              key={`cel-${wp}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto rounded-full px-6 py-3 font-display font-extrabold text-lg text-ink shadow-xl"
              style={{ backgroundColor: AMBER }}
            >
              A resin drop glows in Fulous's satchel! The goat hops onward…
            </motion.div>
          )}

          {phase === 'done' && !result && (
            <motion.div
              key="finale"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="pointer-events-auto rounded-full px-6 py-3 font-display font-extrabold text-lg text-white shadow-xl bg-gradient-to-r from-palm to-turquoise"
            >
              The village lanterns light up — khareef festival time!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 z-40 bg-paper/80 backdrop-blur rounded-full px-4 py-1.5 text-sm font-bold text-ink border-2 border-white/60">
        {qi}/{questions.length} quest tasks
      </div>

      <StarBurst show={burst} />
      <ResultModal
        open={result}
        stars={starsEarned}
        score={score}
        title="Festival Complete!"
        message="Fulous delivered the frankincense to the mountain village. Lanterns glow, the rainbow shines — and the proverbs you met await you on the About page."
        onReplay={replay}
        onContinue={() => {
          play('click');
          navigate('/');
        }}
      />
    </div>
  );
}
