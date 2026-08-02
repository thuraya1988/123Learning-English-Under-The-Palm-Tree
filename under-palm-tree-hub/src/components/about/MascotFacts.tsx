import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSfx } from '@/lib/sfx';

const FACTS = [
  'Did you know? Bahla Fort is a UNESCO World Heritage site.',
  'Did you know? Omani dhows once sailed as far as China and East Africa.',
  'Did you know? Frankincense from Dhofar was once worth more than gold.',
  'Did you know? The aflaj water channels of Oman are over 2,000 years old.',
  'Did you know? Green turtles nest on Omani beaches every year.',
  'Did you know? The khareef monsoon turns Salalah green every summer.',
];

/** Fulous peeks from a corner; click for a rotating fun fact + SFX. */
export default function MascotFacts({ className = '' }: { className?: string }) {
  const { play } = useSfx();
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <div className={`pointer-events-none ${className}`}>
      <AnimatePresence>
        {idx !== null && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="pointer-events-auto absolute bottom-20 right-0 w-56 bg-paper rounded-3xl rounded-br-md shadow-xl border-2 border-white/60 p-3 text-sm font-bold text-ink/80"
          >
            {FACTS[idx]}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1, rotate: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          play('click');
          setIdx((i) => (i === null ? 0 : (i + 1) % FACTS.length));
        }}
        aria-label="Fulous fun fact"
        className="pointer-events-auto absolute bottom-0 right-0"
      >
        <motion.img
          src="/mascot-fulous.png"
          alt="Fulous the sea turtle"
          className="w-20 h-20 drop-shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </div>
  );
}
