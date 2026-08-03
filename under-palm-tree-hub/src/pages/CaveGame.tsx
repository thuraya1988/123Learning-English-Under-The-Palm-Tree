import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorOpen, Gem, Volume2 } from 'lucide-react';
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
const ROCK = '#2B2D5C';
const ROCK_D = '#20224A';
const CYAN = '#7DF9E8';
const TURQ = '#3ED6C5';
const VIOLET = '#8B6FE8';
const GOLD = '#FFD93D';
const MOSS = '#2F9E4F';

const CHAMBERS = 4;
const Q_PER_CHAMBER = 3;
const CHAMBER_DEPTH = 16; // z distance between chamber centers

/* ---------- glowing crystal ---------- */
function Crystal({
  position,
  scale = 1,
  color = CYAN,
  seed = 0,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  seed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const m = ref.current.material as MeshStandardMaterial;
      m.emissiveIntensity = 1.1 + Math.sin(t * 2 + seed) * 0.45;
      ref.current.rotation.y = t * 0.3 + seed;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        flatShading
      />
    </mesh>
  );
}

/* ---------- rune-locked carved door ---------- */
function Door({
  z,
  lit,
  open,
  exit,
}: {
  z: number;
  lit: number;
  open: boolean;
  exit?: boolean;
}) {
  const doorRef = useRef<Group>(null);
  useFrame((_, dt) => {
    if (doorRef.current) {
      const target = open ? -Math.PI * 0.65 : 0;
      doorRef.current.rotation.y +=
        (target - doorRef.current.rotation.y) * Math.min(1, dt * 2.2);
    }
  });
  const frame = exit ? GOLD : '#B08A4F';
  return (
    <group position={[0, 0, z]}>
      {/* frame */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[3.4, 4.6, 0.5]} />
        <meshStandardMaterial color={frame} flatShading />
      </mesh>
      {/* swinging door leaf */}
      <group ref={doorRef} position={[-1.35, 2.1, 0.35]}>
        <mesh position={[1.35, 0, 0]} castShadow>
          <boxGeometry args={[2.7, 4.0, 0.18]} />
          <meshStandardMaterial
            color="#1E8C82"
            emissive={exit ? GOLD : '#000000'}
            emissiveIntensity={exit ? 0.25 : 0}
            flatShading
          />
        </mesh>
        {/* brass studs */}
        {[-0.9, 0, 0.9].map((x) =>
          [1.2, 0, -1.2].map((y) => (
            <mesh key={`${x}${y}`} position={[1.35 + x, y, 0.12]}>
              <sphereGeometry args={[0.09, 6, 5]} />
              <meshStandardMaterial color="#D9A441" flatShading />
            </mesh>
          )),
        )}
      </group>
      {/* light beam when open */}
      {open && (
        <mesh position={[0, 2.1, 0.9]}>
          <planeGeometry args={[2.6, 4]} />
          <meshStandardMaterial
            color={exit ? GOLD : CYAN}
            emissive={exit ? GOLD : CYAN}
            emissiveIntensity={1.4}
            transparent
            opacity={0.35}
          />
        </mesh>
      )}
      {/* runes */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.9, 5.1, 0.3]}>
          <sphereGeometry args={[0.22, 8, 6]} />
          <meshStandardMaterial
            color={i < lit ? CYAN : '#3A3D6E'}
            emissive={i < lit ? CYAN : '#000000'}
            emissiveIntensity={i < lit ? 1.6 : 0}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- one cave chamber ---------- */
function Chamber({
  index,
  lit,
  doorOpen,
}: {
  index: number;
  lit: number;
  doorOpen: boolean;
}) {
  const z = -index * CHAMBER_DEPTH;
  const exit = index === CHAMBERS - 1;
  const crystals = useMemo(() => {
    const arr: {
      p: [number, number, number];
      s: number;
      c: string;
      seed: number;
    }[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + index;
      const r = 5.2 + ((i * 37 + index * 11) % 3);
      arr.push({
        p: [Math.cos(a) * r, 0.4 + ((i * 13) % 4) * 0.9, z + Math.sin(a) * 5],
        s: 0.5 + ((i * 7 + index) % 4) * 0.28,
        c: i % 3 === 0 ? VIOLET : i % 3 === 1 ? CYAN : TURQ,
        seed: i * 1.7 + index,
      });
    }
    return arr;
  }, [index, z]);

  return (
    <group position={[0, 0, z]}>
      {/* floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8.5, 12]} />
        <meshStandardMaterial color={index % 2 ? ROCK : ROCK_D} flatShading />
      </mesh>
      {/* moss patches */}
      {[-3.5, 2.8, 0.5].map((x, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.02, (i - 1) * 3]}
        >
          <circleGeometry args={[1.1 - i * 0.2, 7]} />
          <meshStandardMaterial color={MOSS} flatShading />
        </mesh>
      ))}
      {/* rock walls */}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 8.6;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 2.4, Math.sin(a) * r]}
            rotation={[0, a, 0]}
            castShadow
          >
            <dodecahedronGeometry args={[3.4, 0]} />
            <meshStandardMaterial
              color={i % 2 ? ROCK : ROCK_D}
              flatShading
            />
          </mesh>
        );
      })}
      {/* stalactites */}
      {[-2.5, 1.5, 4].map((x, i) => (
        <mesh key={i} position={[x, 6.2, (i - 1) * 2.5]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 2.6 + i * 0.5, 6]} />
          <meshStandardMaterial color={ROCK_D} flatShading />
        </mesh>
      ))}
      {/* ceiling cap */}
      <mesh position={[0, 7.4, 0]}>
        <sphereGeometry args={[9, 10, 6]} />
        <meshStandardMaterial color={ROCK_D} flatShading side={2} />
      </mesh>
      {/* turquoise pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.4, 0.05, 2.5]}>
        <circleGeometry args={[1.6, 10]} />
        <meshStandardMaterial
          color={TURQ}
          emissive={TURQ}
          emissiveIntensity={0.35}
          transparent
          opacity={0.9}
        />
      </mesh>
      {crystals.map((c, i) => (
        <Crystal key={i} position={c.p} scale={c.s} color={c.c} seed={c.seed} />
      ))}
      <pointLight position={[3, 3, 0]} color={CYAN} intensity={6} distance={14} />
      <pointLight position={[-4, 2, -3]} color={VIOLET} intensity={5} distance={12} />
      {exit && <pointLight position={[0, 3, -4]} color={GOLD} intensity={7} distance={15} />}
      <Door z={-6.8} lit={lit} open={doorOpen} exit={exit} />
    </group>
  );
}

/* ---------- camera rig: dolly through chambers ---------- */
function CameraRig({ progress }: { progress: number }) {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const tz = 6 - progress * CHAMBER_DEPTH;
    camera.position.x += (Math.sin(t * 0.5) * 0.25 - camera.position.x) * 0.04;
    camera.position.y += (4 + Math.sin(t * 0.8) * 0.15 - camera.position.y) * 0.04;
    camera.position.z += (tz - camera.position.z) * 0.03;
    camera.lookAt(0, 2, camera.position.z - 9);
  });
  return null;
}

/* ---------- fireflies ---------- */
function Fireflies({ progress }: { progress: number }) {
  return (
    <group position={[0, 3, -progress * CHAMBER_DEPTH]}>
      <Sparkles count={60} scale={[12, 5, 14]} size={4} speed={0.4} color={CYAN} />
      <Sparkles count={30} scale={[10, 4, 12]} size={3} speed={0.3} color={GOLD} />
    </group>
  );
}

/* ---------- page ---------- */
type Phase = 'passage' | 'question' | 'feedback' | 'door' | 'done';

const PASSAGES = [
  'Deep in the green hills of Oman, old sailors tell of a cave where crystals sing at night. A kind water spirit guards its doors. She opens them only for travellers who listen carefully and answer with a patient heart.',
  'The villagers say the cave teaches wisdom, not magic. Each door carries three runes, and each rune wakes when a traveller understands an old Omani proverb. "Patience is the key to relief," the spirit whispers.',
  'Further inside, the walls glow like the sea at dawn. Here the spirit tells of henna nights, of shared falaj water, and of guests welcomed as gifts. Every story hides a question for the listener.',
  'The last chamber shines with golden light. Beyond the final door, sunrise waits over the valley. The spirit smiles: "You listened well, traveller. Carry these proverbs with you, and the path will always open."',
];

export default function CaveGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const totalStars = useGameStore((s) => s.totalStars());

  const questions = useMemo<GameQuestion[]>(() => {
    const levels = getGameQuestions('cave');
    return levels.flatMap((l) => l.questions).slice(0, CHAMBERS * Q_PER_CHAMBER);
  }, []);

  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('passage');
  const [burst, setBurst] = useState(false);
  const [retry, setRetry] = useState(false);
  const [result, setResult] = useState(false);
  const [listening, setListening] = useState(false);

  const chamber = Math.min(CHAMBERS - 1, Math.floor(qi / Q_PER_CHAMBER));
  const runes = qi % Q_PER_CHAMBER;
  const finishedCount = qi;
  const progress = chamber + (phase === 'door' || phase === 'done' ? 0.55 : 0);

  const speak = () => {
    play('click');
    try {
      const u = new SpeechSynthesisUtterance(PASSAGES[chamber]);
      u.rate = 0.92;
      u.onend = () => setListening(false);
      setListening(true);
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {
      /* speech unavailable */
    }
  };

  const answer = (i: number) => {
    const q = questions[qi];
    if (!q || selected != null) return;
    setSelected(i);
    if (i === q.answer) {
      play('star');
      setBurst(true);
      setScore((s) => s + (retry ? 60 : 100));
      setTimeout(() => {
        setBurst(false);
        setSelected(null);
        setRetry(false);
        const next = qi + 1;
        if (next % Q_PER_CHAMBER === 0) {
          play('magic');
          setPhase('door');
          setTimeout(() => {
            if (next >= questions.length) {
              setPhase('done');
              play('success');
              const stars = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : 1;
              recordResult('cave', 1, score + (retry ? 60 : 100), stars);
              setResult(true);
            } else {
              setQi(next);
              setPhase('passage');
            }
          }, 1800);
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
    setSelected(null);
    setRetry(false);
    setPhase('passage');
    setResult(false);
  };

  const starsEarned = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : 1;

  return (
    <div className="relative flex-1 min-h-[100dvh] overflow-hidden bg-[#1A1B3A]">
      <div className="absolute inset-0">
        <SceneCanvas
          camera={{ position: [0, 4, 9], fov: 50 }}
          fog={{ color: '#1E2F4A', near: 8, far: 34 }}
        >
          <CameraRig progress={progress} />
          {Array.from({ length: CHAMBERS }).map((_, i) => (
            <Chamber
              key={i}
              index={i}
              lit={i < chamber ? Q_PER_CHAMBER : i === chamber ? runes : 0}
              doorOpen={i < chamber || (i === chamber && (phase === 'door' || phase === 'done'))}
            />
          ))}
          <Fireflies progress={progress} />
          {/* sunrise burst beyond the exit */}
          <mesh position={[0, 3, -CHAMBERS * CHAMBER_DEPTH - 8]}>
            <sphereGeometry args={[4, 12, 8]} />
            <meshStandardMaterial
              color={GOLD}
              emissive={GOLD}
              emissiveIntensity={phase === 'done' ? 2.2 : 0.6}
            />
          </mesh>
        </SceneCanvas>
      </div>

      <GameHUD title="Jinn Cave Escape" cefr="B1–B2+" score={score} stars={totalStars} />

      {/* chamber pips */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {Array.from({ length: CHAMBERS }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: i === chamber ? 1.25 : 1 }}
            className="w-8 h-8 rounded-full grid place-items-center border-2 border-white/60 shadow"
            style={{
              backgroundColor: i < chamber ? CYAN : i === chamber ? VIOLET : '#3A3D6E',
            }}
          >
            <Gem size={14} className="text-white" />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 p-4 flex flex-col items-center gap-3 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 'passage' && (
            <motion.div
              key={`passage-${chamber}`}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="pointer-events-auto w-full max-w-xl rounded-3xl border-2 p-6 shadow-xl backdrop-blur"
              style={{
                backgroundColor: 'rgba(43,45,92,0.85)',
                borderColor: CYAN,
                boxShadow: `0 0 30px ${CYAN}44`,
              }}
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-2" style={{ color: CYAN }}>
                Chamber {chamber + 1} of {CHAMBERS} — Bu Darya speaks
              </p>
              <p className="font-bold text-foam leading-relaxed" style={{ color: '#EAFDF9' }}>
                {PASSAGES[chamber]}
              </p>
              <div className="flex gap-3 mt-4">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={speak}
                  className="rounded-full px-4 py-2 font-bold text-sm flex items-center gap-2 text-[#2B2D5C]"
                  style={{ backgroundColor: CYAN }}
                >
                  <Volume2 size={16} />
                  {listening ? 'Listening…' : 'Play'}
                  {listening && (
                    <span className="flex gap-0.5 items-end h-3">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ height: [4, 12, 4] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                          className="w-1 rounded bg-[#2B2D5C]"
                        />
                      ))}
                    </span>
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    play('magic');
                    setPhase('question');
                  }}
                  className="rounded-full px-5 py-2 font-bold text-sm text-[#2B2D5C] flex items-center gap-2"
                  style={{ backgroundColor: GOLD }}
                >
                  <DoorOpen size={16} /> Face the runes
                </motion.button>
              </div>
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

          {phase === 'door' && (
            <motion.div
              key={`door-${chamber}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto rounded-full px-6 py-3 font-display font-extrabold text-lg text-[#2B2D5C] shadow-xl"
              style={{ backgroundColor: GOLD }}
            >
              The runes glow… the door swings open!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* progress hint */}
      <div className="absolute bottom-4 left-4 z-40 bg-paper/80 backdrop-blur rounded-full px-4 py-1.5 text-sm font-bold text-ink border-2 border-white/60">
        {finishedCount}/{questions.length} runes lit
      </div>

      <StarBurst show={burst} />
      <ResultModal
        open={result}
        stars={starsEarned}
        score={score}
        title="You escaped!"
        message="The sunrise greets you outside the cave. You carry Omani proverbs in your satchel — see their stories on the About page."
        onReplay={replay}
        onContinue={() => {
          play('click');
          navigate('/');
        }}
      />
    </div>
  );
}
