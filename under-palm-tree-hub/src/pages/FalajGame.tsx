import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SceneCanvas from '@/components/SceneCanvas';
import GameHUD from '@/components/GameHUD';
import QuestionCard from '@/components/QuestionCard';
import ResultModal from '@/components/ResultModal';
import StarBurst from '@/components/StarBurst';
import FalajScene from '@/scenes/FalajScene';
import { getGameQuestions, getLevelQuestions } from '@/lib/questions';
import type { GameQuestion } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import { useSfx } from '@/lib/sfx';

const ROUND_SIZE = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FalajGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const progress = useGameStore((s) => s.games.falaj);
  const levels = useMemo(() => getGameQuestions('falaj'), []);
  const [level, setLevel] = useState(() =>
    Math.min(progress.unlockedLevel, levels.length),
  );
  const levelMeta = levels[level - 1];

  const [session, setSession] = useState<GameQuestion[]>([]);
  const [round, setRound] = useState(0);
  const [orbOrder, setOrbOrder] = useState<number[]>([0, 1, 2]);
  const [matched, setMatched] = useState<boolean[]>([false, false, false]);
  const [selected, setSelected] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [mistakeId, setMistakeId] = useState(0);
  const [score, setScore] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [burst, setBurst] = useState(false);
  const [pops, setPops] = useState<{ id: number; val: number }[]>([]);
  const timers = useRef<number[]>([]);

  const startLevel = useCallback(
    (lv: number) => {
      const qs = shuffle(getLevelQuestions('falaj', lv)).slice(
        0,
        ROUND_SIZE * 3,
      );
      // pad if the level has fewer questions than a full session
      while (qs.length < ROUND_SIZE * 3 && qs.length > 0) qs.push(...qs);
      setSession(qs.slice(0, ROUND_SIZE * 3));
      setRound(0);
      setOrbOrder(shuffle([0, 1, 2]));
      setMatched([false, false, false]);
      setSelected(null);
      setMistakes(0);
      setScore(0);
      setCelebrate(false);
      setShowResult(false);
      setPops([]);
    },
    [],
  );

  useEffect(() => {
    startLevel(level);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [level, startLevel]);

  const roundQuestions = session.slice(
    round * ROUND_SIZE,
    round * ROUND_SIZE + ROUND_SIZE,
  );
  const items = roundQuestions.map((q) => q.choices[q.answer]);
  const totalRounds = Math.max(1, Math.ceil(session.length / ROUND_SIZE));

  const addPop = (val: number) => {
    const id = Date.now() + Math.random();
    setPops((p) => [...p, { id, val }]);
    timers.current.push(
      window.setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 1100),
    );
  };

  const finishSession = useCallback(
    (finalScore: number, finalMistakes: number) => {
      setCelebrate(true);
      play('magic');
      const stars = finalMistakes <= 0 ? 3 : finalMistakes <= 2 ? 2 : 1;
      timers.current.push(
        window.setTimeout(() => {
          recordResult('falaj', level, finalScore, stars);
          setShowResult(true);
          [0, 1, 2].forEach((i) =>
            timers.current.push(
              window.setTimeout(() => play('star'), 400 + i * 250),
            ),
          );
        }, 1900),
      );
    },
    [level, play, recordResult],
  );

  const handleOrbClick = (i: number) => {
    if (matched[i] || celebrate) return;
    play('click');
    setSelected(selected === i ? null : i);
  };

  const handleTokenClick = (j: number) => {
    if (matched[j] || celebrate) return;
    if (selected == null) {
      play('hover');
      return;
    }
    if (selected === j) {
      // correct match: orb i matches picture with same index
      const next = matched.map((m, k) => (k === j ? true : m));
      setMatched(next);
      setSelected(null);
      setScore((s) => s + 100);
      addPop(100);
      play('splash');
      timers.current.push(window.setTimeout(() => play('success'), 120));
      setBurst(true);
      timers.current.push(window.setTimeout(() => setBurst(false), 750));
      if (next.every(Boolean)) {
        if (round + 1 >= totalRounds) {
          finishSession(score + 100, mistakes);
        } else {
          timers.current.push(
            window.setTimeout(() => {
              setRound((r) => r + 1);
              setOrbOrder(shuffle([0, 1, 2]));
              setMatched([false, false, false]);
              setSelected(null);
              play('wind');
            }, 1600),
          );
        }
      }
    } else {
      play('error');
      setMistakes((m) => m + 1);
      setMistakeId((id) => id + 1);
    }
  };

  const stars =
    mistakes <= 0 ? 3 : mistakes <= 2 ? 2 : 1;
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);

  return (
    <div className="relative flex-1 min-h-[100dvh] overflow-hidden bg-foam">
      <div className="absolute inset-0">
        <SceneCanvas
          camera={{ position: [0, 10, 12], fov: 42 }}
          fog={{ color: '#BDEFF2', near: 22, far: 48 }}
        >
          <FalajScene
            items={items}
            orbOrder={orbOrder}
            matched={matched}
            selected={selected}
            mistakeId={mistakeId}
            celebrate={celebrate}
            onOrbClick={handleOrbClick}
            onTokenClick={handleTokenClick}
            play={play}
          />
        </SceneCanvas>
      </div>

      <GameHUD
        title="Falaj Word Flow"
        cefr={levelMeta?.cefr ?? 'A1'}
        score={score}
        stars={totalStars}
      />

      {/* floating score popups */}
      <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center">
        <AnimatePresence>
          {pops.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: 0, opacity: 1, scale: 0.8 }}
              animate={{ y: -90, opacity: 0, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute font-display font-extrabold text-3xl text-sunshine drop-shadow-[0_2px_4px_rgba(33,50,59,0.4)]"
            >
              +{p.val}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <StarBurst show={burst} />

      {/* round instruction card */}
      <div className="absolute bottom-4 inset-x-0 z-40 flex flex-col items-center gap-2 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={round}
              question={{
                q:
                  selected == null
                    ? `Round ${round + 1}/${totalRounds} — Tap a word orb, then its picture!`
                    : `Now tap the picture that matches "${items[selected]}"!`,
                choices: [],
                answer: 0,
                fact:
                  selected == null
                    ? 'The falaj has carried water to Omani gardens for 2,000 years.'
                    : undefined,
              }}
              onAnswer={() => {}}
              showHint
            />
          </AnimatePresence>
        </div>
      </div>

      <ResultModal
        open={showResult}
        stars={stars}
        score={score}
        title={celebrate ? 'The Garden Blooms!' : 'Round Complete!'}
        message={
          level < levels.length
            ? `${levelMeta?.title ?? ''} complete — the water flows on to level ${level + 1}!`
            : 'You mastered every falaj channel in the oasis!'
        }
        onReplay={() => {
          play('click');
          startLevel(level);
        }}
        onContinue={() => {
          play('click');
          if (level < levels.length) {
            setLevel(level + 1);
          } else {
            navigate('/');
          }
        }}
      />
    </div>
  );
}
