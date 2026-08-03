import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, BookOpen, Volume2, VolumeX, Star } from 'lucide-react';
import SceneCanvas from '@/components/SceneCanvas';
import HubWorld from '@/scenes/HubWorld';
import Mascot from '@/components/Mascot';
import { useSfx } from '@/lib/sfx';
import { GAMES } from '@/lib/questions';
import { useGameStore } from '@/lib/store';
import type { GameId } from '@/lib/store';

const TIPS = [
  'Did you know? Omani sailors crossed the Indian Ocean in wooden dhows — no engines!',
  'Falaj channels have watered Omani farms for over 2,000 years. The word "falaj" means "to divide".',
  'Frankincense from Salalah was once worth more than gold!',
  'In Bahla, people tell tales of clever jinn who built the fort walls in one night.',
  'Try greeting a friend with "Marhaba!" — it means "hello" in Arabic.',
  'The khareef season turns Salalah green with mist and waterfalls every summer.',
];

function IntroSplash({ onStart }: { onStart: () => void }) {
  const { play } = useSfx();
  const titleWords = ['Under', 'the', 'Palm', 'Tree'];
  return (
    <motion.div
      className="absolute inset-0 z-50 grid place-items-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <img
        src="/splash-hero.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <motion.img
          src="/logo-hub.png"
          alt="Under the Palm Tree logo"
          className="w-28 h-28 drop-shadow-xl"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12 }}
        />
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-white drop-shadow-lg flex flex-wrap justify-center gap-x-3">
          {titleWords.map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="font-arabic text-2xl text-sunshine drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          حديقة الحكايات
        </motion.p>
        <motion.p
          className="text-white/95 font-bold text-lg drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          Learn English through Omani tales
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            delay: 1,
            scale: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            play('magic');
            onStart();
          }}
          className="mt-2 rounded-full px-8 py-4 font-display font-extrabold text-xl text-white bg-gradient-to-r from-mango to-coral shadow-[0_6px_0_rgba(0,0,0,0.2)]"
        >
          Start Exploring
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { play, muted, toggleMute } = useSfx();
  const games = useGameStore((s) => s.games);
  const [started, setStarted] = useState(
    () => sessionStorage.getItem('hub-seen') === '1',
  );
  const [hovered, setHovered] = useState<GameId | null>(null);
  const [showHintChip, setShowHintChip] = useState(true);
  const [tipIndex, setTipIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setShowHintChip(false), 6000);
    return () => clearTimeout(t);
  }, [started]);

  const start = () => {
    sessionStorage.setItem('hub-seen', '1');
    setStarted(true);
  };

  const hoveredMeta = hovered ? GAMES.find((g) => g.id === hovered)! : null;
  const hoveredStars = hovered
    ? Object.values(games[hovered].stars).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="relative flex-1" style={{ minHeight: 'calc(100dvh - 4rem)' }}>
      <div className="absolute inset-0">
        <SceneCanvas camera={{ position: [14, 9, 14], fov: 45 }}>
          <HubWorld
            play={play}
            onPortalClick={(id) => {
              const meta = GAMES.find((g) => g.id === id)!;
              setTimeout(() => navigate(meta.route), 350);
            }}
            onPortalHover={setHovered}
            onMascotClick={() =>
              setTipIndex((i) => ((i ?? -1) + 1) % TIPS.length)
            }
          />
        </SceneCanvas>
      </div>

      <AnimatePresence>{!started && <IntroSplash onStart={start} />}</AnimatePresence>

      {/* top-left logo */}
      {started && (
        <div className="absolute top-3 left-3 z-40 flex items-center gap-2 bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg pl-1 pr-4 py-1">
          <img src="/logo-hub.png" alt="" className="w-9 h-9" />
          <div className="leading-tight">
            <p className="font-display font-extrabold text-door text-sm">
              Under the Palm Tree
            </p>
            <p className="font-arabic text-xs text-ink/60">حديقة الحكايات</p>
          </div>
        </div>
      )}

      {/* top-right buttons */}
      {started && (
        <div className="absolute top-3 right-3 z-40 flex gap-2">
          {[
            { icon: <Map size={18} />, label: 'Progress', to: '/progress' },
            { icon: <BookOpen size={18} />, label: 'About', to: '/about' },
          ].map((b) => (
            <motion.button
              key={b.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                play('click');
                navigate(b.to);
              }}
              className="flex items-center gap-1.5 bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-2 font-bold text-sm text-ink"
            >
              {b.icon} {b.label}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={{ boxShadow: ['0 0 0 0 rgba(255,217,61,0.7)', '0 0 0 8px rgba(255,217,61,0)'] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            onClick={() => {
              play('magic');
              navigate('/arcade');
            }}
            className="flex items-center gap-1.5 rounded-full border-2 border-white/70 shadow-lg px-4 py-2 font-display font-extrabold text-sm text-white bg-gradient-to-r from-mango to-coral"
          >
            🎪 Arcade Wing
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              toggleMute();
              play('click');
            }}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="w-10 h-10 grid place-items-center bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg text-ink"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
        </div>
      )}

      {/* bottom hint chip */}
      <AnimatePresence>
        {started && showHintChip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-ink/70 text-white text-sm font-bold rounded-full px-5 py-2 backdrop-blur"
          >
            Drag to explore · Click a glowing portal to play
          </motion.div>
        )}
      </AnimatePresence>

      {/* portal hover tooltip */}
      <AnimatePresence>
        {started && hoveredMeta && (
          <motion.div
            key={hoveredMeta.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-paper/95 backdrop-blur rounded-3xl border-2 border-white/60 shadow-xl px-6 py-4 w-[min(92vw,24rem)]"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: hoveredMeta.accent }}
              />
              <h3 className="font-display font-extrabold text-ink">
                {hoveredMeta.title}
              </h3>
              <span className="ml-auto text-[10px] font-extrabold uppercase tracking-[0.12em] bg-door text-white rounded-full px-2 py-0.5">
                {hoveredMeta.cefr}
              </span>
            </div>
            <p className="text-sm text-ink/70 mt-1">{hoveredMeta.tagline}</p>
            <div className="flex gap-0.5 mt-2">
              {[0, 1, 2].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < hoveredStars ? 'text-sunshine' : 'text-ink/15'}
                  fill={i < hoveredStars ? '#FFD93D' : 'currentColor'}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fulous hint bubble */}
      <AnimatePresence>
        {started && tipIndex !== null && (
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-4 right-4 z-40 bg-paper/95 backdrop-blur rounded-3xl border-2 border-white/60 shadow-xl p-4 w-[min(88vw,20rem)]"
          >
            <div className="flex items-start gap-3">
              <Mascot className="w-14 h-14 shrink-0" />
              <div>
                <p className="font-display font-extrabold text-door text-sm">
                  Fulous says:
                </p>
                <p className="text-sm text-ink/80">{TIPS[tipIndex]}</p>
              </div>
            </div>
            <button
              onClick={() => setTipIndex(null)}
              className="absolute top-2 right-3 text-ink/40 hover:text-ink font-bold"
              aria-label="Close tip"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
