import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#FFD93D', '#3ED6C5', '#FF7A66', '#9FE870', '#E5599C'];

/** DOM particle burst shown on a correct answer. Render when `show` is true. */
export default function StarBurst({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-50 grid place-items-center">
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const dist = 90 + (i % 3) * 35;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  scale: [0, 1.2, 0.6],
                  opacity: [1, 1, 0],
                  rotate: 180,
                }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute text-2xl"
                style={{ color: COLORS[i % COLORS.length] }}
              >
                ★
              </motion.span>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
