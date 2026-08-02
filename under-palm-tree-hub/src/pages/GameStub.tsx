import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Mascot from '@/components/Mascot';
import { getGameMeta } from '@/lib/questions';
import type { GameId } from '@/lib/store';

export default function GameStub({ gameId }: { gameId: GameId }) {
  const meta = getGameMeta(gameId);
  return (
    <div className="flex-1 grid place-items-center p-6 bg-gradient-to-b from-foam to-turquoise/20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-8 max-w-md text-center"
      >
        <Mascot className="w-24 h-24 mx-auto" />
        <span
          className="inline-block mt-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white rounded-full px-3 py-1"
          style={{ backgroundColor: meta.accent }}
        >
          {meta.cefr}
        </span>
        <h1 className="font-display font-extrabold text-3xl text-ink mt-2">
          {meta.title}
        </h1>
        <p className="text-ink/70 mt-2">{meta.tagline}</p>
        <p className="mt-4 text-sm font-bold text-door">
          This game is being built — check back soon!
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-white bg-gradient-to-r from-turquoise to-palm shadow-lg"
        >
          <ArrowLeft size={16} /> Back to the Hub
        </Link>
      </motion.div>
    </div>
  );
}
