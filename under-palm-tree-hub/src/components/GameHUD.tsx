import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Volume2, VolumeX } from 'lucide-react';
import { useSfx } from '@/lib/sfx';

interface GameHUDProps {
  title: string;
  cefr: string;
  score: number;
  stars?: number;
}

/** Shared top bar for game screens. */
export default function GameHUD({ title, cefr, score, stars = 0 }: GameHUDProps) {
  const navigate = useNavigate();
  const { play, muted, toggleMute } = useSfx();
  return (
    <div className="absolute top-0 inset-x-0 z-40 p-3 flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          play('click');
          navigate('/');
        }}
        aria-label="Back to hub"
        className="w-11 h-11 rounded-full bg-paper/90 backdrop-blur border-2 border-white/60 shadow-lg grid place-items-center text-ink"
      >
        <ArrowLeft size={20} />
      </motion.button>

      <div className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-1.5 flex items-center gap-2">
        <span className="font-display font-extrabold text-ink">{title}</span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] bg-door text-white rounded-full px-2 py-0.5">
          {cefr}
        </span>
      </div>

      <div className="flex-1" />

      <div className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-4 py-1.5 flex items-center gap-2 font-extrabold text-ink">
        <Star size={16} className="text-sunshine" fill="#FFD93D" />
        <span>{stars}</span>
        <span className="text-ink/40">·</span>
        <span>{score} pts</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          toggleMute();
          play('click');
        }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="w-11 h-11 rounded-full bg-paper/90 backdrop-blur border-2 border-white/60 shadow-lg grid place-items-center text-ink"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>
    </div>
  );
}
