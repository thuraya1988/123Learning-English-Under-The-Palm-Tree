import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, Star } from 'lucide-react';

interface ResultModalProps {
  open: boolean;
  stars: number; // 0-3
  score: number;
  title?: string;
  message?: string;
  onReplay: () => void;
  onContinue: () => void;
}

/** End-of-round modal: stars earned, score, replay/continue. */
export default function ResultModal({
  open,
  stars,
  score,
  title = 'Round Complete!',
  message,
  onReplay,
  onContinue,
}: ResultModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-paper rounded-3xl shadow-2xl border-2 border-white/60 p-8 w-full max-w-md text-center"
          >
            <img
              src="/mascot-fulous.png"
              alt="Fulous the turtle"
              className="w-24 h-24 mx-auto -mt-16 drop-shadow-lg"
            />
            <h2 className="font-display font-extrabold text-3xl text-ink mt-2">
              {title}
            </h2>
            <div className="flex justify-center gap-2 my-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, type: 'spring' }}
                >
                  <Star
                    size={44}
                    className={
                      i < stars ? 'text-sunshine' : 'text-ink/15'
                    }
                    fill={i < stars ? '#FFD93D' : 'currentColor'}
                  />
                </motion.span>
              ))}
            </div>
            <p className="font-extrabold text-door text-xl">{score} points</p>
            {message && <p className="text-ink/60 mt-2">{message}</p>}
            <div className="flex justify-center gap-3 mt-6">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onReplay}
                className="rounded-full px-5 py-2.5 font-bold text-ink bg-white border-2 border-ink/10 shadow flex items-center gap-2"
              >
                <RotateCcw size={16} /> Replay
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onContinue}
                className="rounded-full px-5 py-2.5 font-bold text-white bg-gradient-to-r from-turquoise to-palm shadow-lg flex items-center gap-2"
              >
                Continue <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
