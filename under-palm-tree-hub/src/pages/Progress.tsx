import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BookOpenCheck,
  Droplets,
  Flame,
  Lock,
  Play,
  RotateCcw,
  Settings,
  Ship,
  Sparkles as SparklesIcon,
  Star,
  TreePalm,
  Trophy,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GAMES, getGameMeta } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import type { GameId } from '@/lib/store';
import { useSfx } from '@/lib/sfx';
import JourneyMap, { NODES } from '@/components/progress/JourneyMap';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ---------- CEFR level math ---------- */
const LEVELS = [
  { id: 'a1', label: 'A1', min: 0, next: 4, desc: 'Can understand words' },
  { id: 'a2', label: 'A2', min: 4, next: 10, desc: 'Can spell & build sentences' },
  { id: 'b1', label: 'B1', min: 10, next: 18, desc: 'Can solve riddles & grammar' },
  { id: 'b2', label: 'B2', min: 18, next: 18, desc: 'Can discuss ideas' },
] as const;

function levelFor(totalStars: number) {
  let idx = 0;
  LEVELS.forEach((l, i) => {
    if (totalStars >= l.min) idx = i;
  });
  const cur = LEVELS[idx];
  const nextDef = LEVELS[Math.min(idx + 1, LEVELS.length - 1)];
  const span = Math.max(1, nextDef.min - cur.min);
  const pct =
    idx === LEVELS.length - 1
      ? 1
      : Math.min(1, (totalStars - cur.min) / span);
  return { ...cur, index: idx, pct };
}

const STAGE_ORDER = ['A1', 'A2', 'B1', 'B2'];

/* ---------- badges ---------- */
interface BadgeDef {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  hint: string;
  earned: (stars: Record<GameId, number>, total: number) => boolean;
}

const BADGES: BadgeDef[] = [
  { id: 'splash', label: 'First Splash', icon: Droplets, color: '#3ED6C5', hint: 'Earn a star in Falaj Word Flow', earned: (s) => s.falaj >= 1 },
  { id: 'spelling', label: 'Spelling Star', icon: Star, color: '#E5599C', hint: 'Earn 3 stars in the Souq', earned: (s) => s.souq >= 3 },
  { id: 'captain', label: 'Sea Captain', icon: Ship, color: '#159AAD', hint: 'Earn 3 stars in Dhow Voyager', earned: (s) => s.dhow >= 3 },
  { id: 'riddle', label: 'Riddle Master', icon: BookOpenCheck, color: '#C97B4A', hint: 'Earn 3 stars in Bahla', earned: (s) => s.bahla >= 3 },
  { id: 'cave', label: 'Cave Explorer', icon: SparklesIcon, color: '#8B6FE8', hint: 'Earn 3 stars in the Jinn Cave', earned: (s) => s.cave >= 3 },
  { id: 'khareef', label: 'Khareef Hero', icon: TreePalm, color: '#4FBF67', hint: 'Earn 3 stars on the Frankincense Trail', earned: (s) => s.khareef >= 3 },
  { id: 'proverb', label: 'Proverb Collector', icon: Trophy, color: '#D9A441', hint: 'Collect 15 stars in total', earned: (_s, t) => t >= 15 },
];

const SEEN_KEY = 'palm-tree-badges-seen';

/* ---------- avatar chip ---------- */
const AVATARS = [
  { id: 'fulous', img: '/mascot-fulous.png', label: 'Fulous' },
  { id: 'goat', emoji: '🐐', label: 'Mountain Goat' },
  { id: 'dolphin', emoji: '🐬', label: 'Dolphin' },
  { id: 'falcon', emoji: '🦅', label: 'Falcon' },
] as const;

/* ---------- level ring ---------- */
function LevelRing({ pct, badge }: { pct: number; badge: string }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={R} fill="none" stroke="#EAFDF9" strokeWidth="12" />
        <motion.circle
          cx="64"
          cy="64"
          r={R}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - pct) }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3ED6C5" />
            <stop offset="100%" stopColor="#4FBF67" />
          </linearGradient>
        </defs>
      </svg>
      <motion.img
        src={badge}
        alt="CEFR level badge"
        className="absolute inset-0 m-auto w-20 h-20 drop-shadow-md"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
      />
    </div>
  );
}

/* ==================================================================== */
export default function Progress() {
  const games = useGameStore((s) => s.games);
  const playerName = useGameStore((s) => s.playerName);
  const { play } = useSfx();

  const [selected, setSelected] = useState<GameId | null>(null);
  const [avatar, setAvatar] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [newBadges, setNewBadges] = useState<BadgeDef[]>([]);

  const starsByGame = useMemo(() => {
    const out = {} as Record<GameId, number>;
    GAMES.forEach((g) => {
      out[g.id] = Object.values(games[g.id].stars).reduce((a, b) => a + b, 0);
    });
    return out;
  }, [games]);

  const totalStars = useMemo(
    () => Object.values(starsByGame).reduce((a, b) => a + b, 0),
    [starsByGame],
  );
  const levelsCompleted = useMemo(
    () =>
      GAMES.reduce(
        (n, g) => n + Object.keys(games[g.id].stars).length,
        0,
      ),
    [games],
  );
  const bestScore = useMemo(
    () =>
      GAMES.reduce(
        (m, g) =>
          Math.max(m, ...Object.values(games[g.id].scores).map((v) => v), 0),
        0,
      ),
    [games],
  );
  const level = levelFor(totalStars);

  const lockedIds = useMemo(() => {
    const set = new Set<GameId>();
    NODES.forEach((n) => {
      const stageIdx = STAGE_ORDER.indexOf(n.stage);
      if (stageIdx > level.index + 1) set.add(n.id);
    });
    return set;
  }, [level.index]);

  const earnedBadges = useMemo(
    () => BADGES.filter((b) => b.earned(starsByGame, totalStars)),
    [starsByGame, totalStars],
  );

  /* load SFX: staggered stars for completed games */
  useEffect(() => {
    const count = Math.min(6, GAMES.filter((g) => starsByGame[g.id] > 0).length);
    const timers: number[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(window.setTimeout(() => play('star'), 500 + i * 180));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* new badge reveal */
  useEffect(() => {
    try {
      const seen: string[] = JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]');
      const fresh = earnedBadges.filter((b) => !seen.includes(b.id));
      if (fresh.length > 0 && localStorage.getItem(SEEN_KEY) !== null) {
        setNewBadges(fresh);
        play('magic');
      }
      localStorage.setItem(SEEN_KEY, JSON.stringify(earnedBadges.map((b) => b.id)));
    } catch {
      /* storage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnedBadges.length]);

  const handleSelect = (id: GameId | null) => {
    if (id) play('click');
    setSelected(id);
  };

  const resetProgress = () => {
    play('click');
    localStorage.removeItem('palm-tree-hub');
    localStorage.removeItem(SEEN_KEY);
    window.location.reload();
  };

  const selMeta = selected ? getGameMeta(selected) : null;
  const selStars = selected ? starsByGame[selected] : 0;
  const selBest = selected
    ? Math.max(0, ...Object.values(games[selected].scores))
    : 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* header strip */}
      <div className="bg-gradient-to-r from-turquoise/25 via-foam to-palm/20 border-b-2 border-white/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              play('click');
              setAvatar((a) => (a + 1) % AVATARS.length);
            }}
            title="Tap to change your explorer buddy"
            className="w-12 h-12 rounded-full bg-paper border-2 border-white shadow-md grid place-items-center text-2xl overflow-hidden shrink-0"
          >
            {AVATARS[avatar].id === 'fulous' ? (
              <img src="/mascot-fulous.png" alt="Fulous" className="w-10 h-10" />
            ) : (
              <span aria-hidden>{'emoji' in AVATARS[avatar] ? AVATARS[avatar].emoji : ''}</span>
            )}
          </motion.button>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink leading-tight">
              My Learning Journey — <span className="font-arabic text-door">رحلتي</span>
            </h1>
            <p className="text-sm font-bold text-ink/60">
              {playerName} · sailing from A1 to B2+ across the archipelago
            </p>
          </div>
          <div className="ml-auto relative">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                play('click');
                setSettingsOpen((o) => !o);
              }}
              aria-label="Settings"
              className="w-10 h-10 rounded-full bg-paper/90 border-2 border-white/60 shadow grid place-items-center text-ink/60 hover:text-door"
            >
              <Settings size={18} />
            </motion.button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="absolute right-0 top-12 z-30 bg-paper rounded-2xl shadow-xl border-2 border-white/60 p-3 w-48"
                >
                  <button
                    onClick={() => {
                      play('click');
                      setConfirmReset(true);
                      setSettingsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-bold text-coral hover:bg-coral/10"
                  >
                    <RotateCcw size={15} /> Reset progress
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* map area */}
      <div className="relative flex-1 min-h-[72dvh] bg-gradient-to-b from-[#BDEFF2] to-foam">
        <JourneyMap
          games={games}
          lockedIds={lockedIds}
          selected={selected}
          onSelect={handleSelect}
        />

        {/* left panel */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="absolute left-3 top-3 bottom-3 w-[19rem] max-w-[85vw] overflow-y-auto pointer-events-none"
        >
          <div className="bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-5 pointer-events-auto">
            <LevelRing pct={level.pct} badge={`/badge-cefr-${level.id}.png`} />
            <p className="text-center mt-2 font-display font-extrabold text-door text-lg">
              Level {level.label}
            </p>
            <p className="text-center text-xs font-bold text-ink/50">
              {level.index < LEVELS.length - 1
                ? `${Math.round(level.pct * 100)}% to ${LEVELS[level.index + 1].label}`
                : 'Top level reached — shabash!'}
            </p>

            {/* stats */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                {
                  icon: Star,
                  label: 'Total stars',
                  value: totalStars,
                  color: '#FFD93D',
                  pop: true,
                },
                { icon: BookOpenCheck, label: 'Levels done', value: levelsCompleted, color: '#3ED6C5' },
                { icon: Flame, label: 'Best score', value: bestScore, color: '#FF7A66' },
                { icon: Award, label: 'Badges', value: earnedBadges.length, color: '#8B6FE8' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/70 rounded-2xl border border-white px-3 py-2 flex items-center gap-2"
                >
                  <s.icon size={18} style={{ color: s.color }} fill={s.pop ? s.color : 'none'} />
                  <div>
                    <motion.p
                      key={s.value}
                      initial={{ scale: s.pop ? 1.6 : 1 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                      className="font-display font-extrabold text-ink leading-none"
                    >
                      {s.value}
                    </motion.p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* badges shelf */}
            <p className="mt-4 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-ink/40">
              Badge shelf
            </p>
            <div className="grid grid-cols-4 gap-2">
              {BADGES.map((b) => {
                const earned = b.earned(starsByGame, totalStars);
                return (
                  <motion.div
                    key={b.id}
                    whileHover={{ rotate: earned ? [0, -8, 8, 0] : 0, scale: 1.08 }}
                    title={earned ? b.label : `${b.label} — ${b.hint}`}
                    className="aspect-square rounded-2xl grid place-items-center border-2"
                    style={{
                      backgroundColor: earned ? `${b.color}22` : '#21323B08',
                      borderColor: earned ? b.color : 'transparent',
                    }}
                  >
                    <b.icon
                      size={22}
                      style={{ color: earned ? b.color : '#9AA7AB' }}
                      className={earned ? '' : 'grayscale opacity-50'}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* legend */}
            <p className="mt-4 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-ink/40">
              Path legend
            </p>
            <div className="space-y-1.5">
              {LEVELS.map((l, i) => (
                <div key={l.id} className="flex items-center gap-2 text-xs font-bold text-ink/70">
                  <span
                    className="w-6 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#4FBF67', '#3ED6C5', '#8B6FE8', '#D9A441'][i],
                    }}
                  />
                  <span className="font-display font-extrabold text-ink">{l.label}</span>
                  <span className="text-ink/50">{l.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* node detail card */}
        <AnimatePresence>
          {selMeta && (
            <motion.div
              key={selMeta.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[26rem] max-w-[92vw] bg-paper/95 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-5"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 text-ink/40 hover:text-ink"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selMeta.accent }} />
                <h3 className="font-display font-extrabold text-lg text-ink">{selMeta.title}</h3>
                <span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-ink/40">
                  {selMeta.cefr}
                </span>
              </div>
              <p className="text-sm text-ink/60 font-semibold mt-1">{selMeta.tagline}</p>
              <div className="flex items-center gap-1 mt-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Star
                      size={26}
                      className={i < Math.min(3, selStars) ? 'text-sunshine' : 'text-ink/15'}
                      fill={i < Math.min(3, selStars) ? '#FFD93D' : 'none'}
                    />
                  </motion.span>
                ))}
                <span className="ml-2 text-sm font-bold text-ink/60">
                  {selStars}★ · best {selBest}
                </span>
              </div>
              {lockedIds.has(selMeta.id) && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-ink/50">
                  <Lock size={13} /> Suggested after you reach{' '}
                  {LEVELS[Math.max(0, STAGE_ORDER.indexOf(NODES.find((n) => n.id === selMeta.id)!.stage) - 1)].label}{' '}
                  — brave explorers may sail ahead!
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <Link to={selMeta.route} onClick={() => play('click')}>
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-display font-extrabold text-white bg-gradient-to-r from-turquoise to-palm shadow-[0_4px_0_#2F9E4F]"
                  >
                    <Play size={18} /> Play
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-3 right-4 text-[11px] font-bold text-ink/40 bg-paper/70 rounded-full px-3 py-1 pointer-events-none hidden sm:block"
        >
          Drag to orbit · click an island to see your progress
        </motion.p>
      </div>

      {/* new badge reveal overlay */}
      <AnimatePresence>
        {newBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setNewBadges([])}
          >
            <motion.div
              initial={{ scale: 0.6, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper rounded-3xl shadow-2xl border-2 border-white/60 p-8 text-center max-w-sm w-full"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-brass">
                New badge earned!
              </p>
              <div className="flex justify-center gap-4 my-5">
                {newBadges.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.15, type: 'spring', stiffness: 260, damping: 15 }}
                    className="w-20 h-20 rounded-3xl grid place-items-center shadow-lg"
                    style={{ backgroundColor: `${b.color}22`, border: `2px solid ${b.color}` }}
                  >
                    <b.icon size={36} style={{ color: b.color }} />
                  </motion.div>
                ))}
              </div>
              {newBadges.map((b) => (
                <p key={b.id} className="font-display font-extrabold text-ink text-xl">
                  {b.label}
                </p>
              ))}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  play('success');
                  setNewBadges([]);
                }}
                className="mt-5 px-8 py-2.5 rounded-full font-display font-extrabold text-white bg-gradient-to-r from-mango to-coral shadow-[0_4px_0_#E05A45]"
              >
                Wonderful!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* reset confirm */}
      <AnimatePresence>
        {confirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-paper rounded-3xl shadow-2xl border-2 border-white/60 p-6 max-w-sm w-full text-center"
            >
              <RotateCcw className="mx-auto text-coral" size={32} />
              <h3 className="font-display font-extrabold text-xl text-ink mt-2">
                Reset all progress?
              </h3>
              <p className="text-sm font-semibold text-ink/60 mt-1">
                Stars, badges and unlocked levels will return to the beginning of the journey.
              </p>
              <div className="flex gap-3 justify-center mt-5">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    play('click');
                    setConfirmReset(false);
                  }}
                  className="px-5 py-2 rounded-full font-bold text-ink/70 bg-ink/5"
                >
                  Keep exploring
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={resetProgress}
                  className="px-5 py-2 rounded-full font-display font-extrabold text-white bg-gradient-to-r from-mango to-coral shadow-[0_4px_0_#E05A45]"
                >
                  Reset
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
