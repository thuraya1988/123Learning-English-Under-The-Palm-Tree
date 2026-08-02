import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Lightbulb, Volume2 } from 'lucide-react';
import SceneCanvas from '@/components/SceneCanvas';
import GameHUD from '@/components/GameHUD';
import QuestionCard from '@/components/QuestionCard';
import ResultModal from '@/components/ResultModal';
import StarBurst from '@/components/StarBurst';
import SouqScene from '@/scenes/SouqScene';
import type { TileState } from '@/scenes/SouqScene';
import { getGameQuestions, getLevelQuestions } from '@/lib/questions';
import type { GameQuestion } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import { useSfx } from '@/lib/sfx';

const WORDS_PER_SESSION = 10;
const DISTRACTORS = 'abcdefghijklmnopqrstuvwxyz';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTiles(word: string): TileState[] {
  const letters = word.split('').map((letter) => ({ letter, used: false }));
  const pool = DISTRACTORS.split('').filter((c) => !word.includes(c));
  const extra = shuffle(pool).slice(0, word.length >= 6 ? 2 : 3);
  return shuffle([...letters, ...extra.map((letter) => ({ letter, used: false }))]);
}

function speak(text: string) {
  try {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  } catch {
    /* speech unavailable */
  }
}

export default function SouqGame() {
  const navigate = useNavigate();
  const { play } = useSfx();
  const recordResult = useGameStore((s) => s.recordResult);
  const progress = useGameStore((s) => s.games.souq);
  const levels = useMemo(() => getGameQuestions('souq'), []);
  const [level, setLevel] = useState(() =>
    Math.min(progress.unlockedLevel, levels.length),
  );
  const levelMeta = levels[level - 1];

  const [session, setSession] = useState<GameQuestion[]>([]);
  const [round, setRound] = useState(0);
  const [tiles, setTiles] = useState<TileState[]>([]);
  const [filled, setFilled] = useState(0); // letters placed so far
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [cheerId, setCheerId] = useState(0);
  const [shakeId, setShakeId] = useState(0);
  const [burst, setBurst] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pops, setPops] = useState<{ id: number; val: number }[]>([]);
  const roundStart = useRef(0);
  const timers = useRef<number[]>([]);

  const word = session.length
    ? session[Math.min(round, session.length - 1)].choices[
        session[Math.min(round, session.length - 1)].answer
      ].toLowerCase()
    : '';

  const setupRound = useCallback((qs: GameQuestion[], r: number) => {
    const w = qs[r].choices[qs[r].answer].toLowerCase();
    setTiles(buildTiles(w));
    setFilled(0);
    roundStart.current = performance.now();
  }, []);

  const startLevel = useCallback(
    (lv: number) => {
      const qs = shuffle(getLevelQuestions('souq', lv)).slice(
        0,
        WORDS_PER_SESSION,
      );
      setSession(qs);
      setRound(0);
      setMistakes(0);
      setStreak(0);
      setScore(0);
      setShowResult(false);
      setPops([]);
      if (qs.length) setupRound(qs, 0);
    },
    [setupRound],
  );

  useEffect(() => {
    startLevel(level);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [level, startLevel]);

  const addPop = (val: number) => {
    const id = Date.now() + Math.random();
    setPops((p) => [...p, { id, val }]);
    timers.current.push(
      window.setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 1100),
    );
  };

  const finishSession = useCallback(
    (finalScore: number, finalMistakes: number) => {
      const stars = finalMistakes <= 2 ? 3 : finalMistakes <= 5 ? 2 : 1;
      timers.current.push(
        window.setTimeout(() => {
          recordResult('souq', level, finalScore, stars);
          setShowResult(true);
          [0, 1, 2].forEach((i) =>
            timers.current.push(
              window.setTimeout(() => play('star'), 400 + i * 250),
            ),
          );
        }, 1500),
      );
    },
    [level, play, recordResult],
  );

  const completeWord = useCallback(
    (nextFilled: number) => {
      if (nextFilled !== word.length) return;
      // speed-scaled points: 120 base minus 4 per second, min 40
      const secs = (performance.now() - roundStart.current) / 1000;
      const pts = Math.max(40, Math.round(120 - secs * 4));
      const newScore = score + pts;
      setScore(newScore);
      addPop(pts);
      setCheerId((c) => c + 1);
      play('success');
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 3) play('magic');
      setBurst(true);
      timers.current.push(window.setTimeout(() => setBurst(false), 750));
      if (round + 1 >= session.length) {
        finishSession(newScore, mistakes);
      } else {
        timers.current.push(
          window.setTimeout(() => {
            setRound((r) => r + 1);
            setupRound(session, round + 1);
          }, 1400),
        );
      }
    },
    [word, score, streak, round, session, mistakes, play, finishSession, setupRound],
  );

  const handleTileClick = (i: number) => {
    const tile = tiles[i];
    if (!tile || tile.used || showResult) return;
    if (tile.letter === word[filled]) {
      play('click');
      const next = tiles.map((t, k) => (k === i ? { ...t, used: true } : t));
      setTiles(next);
      const nextFilled = filled + 1;
      setFilled(nextFilled);
      completeWord(nextFilled);
    } else {
      play('error');
      setMistakes((m) => m + 1);
      setStreak(0);
      setShakeId((s) => s + 1);
    }
  };

  const handleHint = () => {
    if (filled >= word.length || showResult) return;
    play('click');
    setScore((s) => Math.max(0, s - 20));
    const need = word[filled];
    const idx = tiles.findIndex((t) => !t.used && t.letter === need);
    if (idx >= 0) {
      const next = tiles.map((t, k) => (k === idx ? { ...t, used: true } : t));
      setTiles(next);
      const nextFilled = filled + 1;
      setFilled(nextFilled);
      completeWord(nextFilled);
    }
  };

  const handleItemClick = () => {
    if (word) speak(word.split('').join(', ') + '. ' + word);
  };

  const stars = mistakes <= 2 ? 3 : mistakes <= 5 ? 2 : 1;
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
  const question = session[Math.min(round, session.length - 1)];

  return (
    <div className="relative flex-1 min-h-[100dvh] overflow-hidden bg-foam">
      <div className="absolute inset-0">
        <SceneCanvas
          camera={{ position: [0, 5, 11], fov: 45 }}
          fog={{ color: '#F6DDB8', near: 20, far: 42 }}
        >
          <SouqScene
            word={word}
            tiles={tiles}
            cheerId={cheerId}
            onTileClick={handleTileClick}
            onItemClick={handleItemClick}
            play={play}
          />
        </SceneCanvas>
      </div>

      <GameHUD
        title="Souq Spelling Market"
        cefr={levelMeta?.cefr ?? 'A1–A2'}
        score={score}
        stars={totalStars}
      />

      {/* streak flame */}
      <div className="absolute top-16 right-3 z-40">
        <AnimatePresence>
          {streak >= 2 && (
            <motion.div
              key={streak}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-3 py-1.5 flex items-center gap-1.5 font-extrabold text-coral"
            >
              <Flame size={16} fill="#FF7A66" />
              <span>×{streak}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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

      {/* bottom overlay: answer slots + prompt */}
      <div className="absolute bottom-4 inset-x-0 z-40 flex flex-col items-center gap-3 px-4 pointer-events-none">
        {/* answer slots */}
        {word && (
          <motion.div
            key={`${word}-${shakeId}`}
            animate={
              shakeId > 0 ? { x: [0, -10, 10, -8, 8, -3, 0] } : { x: 0 }
            }
            transition={{ duration: 0.45 }}
            className="flex items-center gap-1.5"
          >
            {word.split('').map((ch, i) => (
              <span
                key={i}
                className={`w-9 h-11 rounded-xl grid place-items-center font-display font-extrabold text-xl border-b-4 shadow ${
                  i < filled
                    ? 'bg-turquoise text-white border-deepsea'
                    : 'bg-paper/90 text-ink/25 border-ink/15'
                }`}
              >
                {i < filled ? ch.toUpperCase() : '·'}
              </span>
            ))}
            {/* hint button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleHint}
              aria-label="Reveal a letter (-20 pts)"
              className="pointer-events-auto ml-2 w-11 h-11 rounded-full bg-sunshine border-2 border-white/60 shadow-lg grid place-items-center text-ink"
            >
              <Lightbulb size={18} />
            </motion.button>
            {/* listen button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                play('click');
                handleItemClick();
              }}
              aria-label="Hear the word"
              className="pointer-events-auto w-11 h-11 rounded-full bg-paper/90 border-2 border-white/60 shadow-lg grid place-items-center text-door"
            >
              <Volume2 size={18} />
            </motion.button>
          </motion.div>
        )}

        {/* vendor prompt */}
        {question && (
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait">
              <QuestionCard
                key={round}
                question={{
                  q: `The vendor holds up a ${word.toUpperCase()} — spell it! (${
                    round + 1
                  }/${session.length})`,
                  choices: [],
                  answer: 0,
                  fact: question.fact,
                }}
                onAnswer={() => {}}
                showHint
              />
            </AnimatePresence>
          </div>
        )}
      </div>

      <ResultModal
        open={showResult}
        stars={stars}
        score={score}
        title="The Souq Cheers!"
        message={
          level < levels.length
            ? `${levelMeta?.title ?? ''} complete — a new stall opens at level ${level + 1}!`
            : 'You spelled your way through the whole souq!'
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
