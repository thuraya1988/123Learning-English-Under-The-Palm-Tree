import { motion } from 'framer-motion';
import { Lock, Quote } from 'lucide-react';
import { useGameStore } from '@/lib/store';

interface Proverb {
  en: string;
  ar: string;
  icon: string;
}

const PROVERBS: Proverb[] = [
  { en: 'Patience is the key to relief.', ar: 'الصبر مفتاح الفرج', icon: '🌴' },
  { en: 'The sea has its own language.', ar: 'للبحر لغته', icon: '🌊' },
  { en: 'A friend in need is a friend indeed.', ar: 'الصديق وقت الضيق', icon: '🤝' },
  { en: 'Drop by drop, the valley fills.', ar: 'قطرة قطرة يمتلئ الوادي', icon: '💧' },
  { en: 'The palm tree gives shade to all.', ar: 'النخلة تظلل الجميع', icon: '🌴' },
  { en: 'Whoever digs a well drinks from it.', ar: 'من حفر بئراً شرب منه', icon: '⚒️' },
  { en: 'Wisdom sails further than the dhow.', ar: 'الحكمة تسافر أبعد من السفينة', icon: '⛵' },
  { en: 'The mountain keeps its secrets.', ar: 'الجبل يحفظ أسراره', icon: '⛰️' },
  { en: 'Kind words open heavy doors.', ar: 'الكلمة الطيبة تفتح الأبواب', icon: '🚪' },
  { en: 'Frankincense rises with the morning.', ar: 'اللبان يصعد مع الصباح', icon: '🌅' },
];

function ProverbCard({ p, unlocked }: { p: Proverb; unlocked: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={`shrink-0 w-64 rounded-3xl border-2 p-4 shadow-lg select-none ${
        unlocked
          ? 'bg-paper border-brass/50 shadow-brass/20'
          : 'bg-paper/70 border-white/60'
      }`}
      style={unlocked ? { boxShadow: '0 8px 24px rgba(217,164,65,0.25)' } : undefined}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl" aria-hidden>
          {p.icon}
        </span>
        <Quote size={16} className={unlocked ? 'text-brass' : 'text-ink/20'} />
      </div>
      {unlocked ? (
        <>
          <p className="mt-2 font-bold text-ink leading-snug">{p.en}</p>
          <p className="mt-1 font-arabic text-door text-lg leading-snug" dir="rtl">
            {p.ar}
          </p>
        </>
      ) : (
        <p className="mt-3 flex items-center gap-1.5 font-bold text-ink/40 text-sm">
          <Lock size={14} /> Find it in the games!
        </p>
      )}
    </motion.div>
  );
}

/** Auto-scrolling proverb strip; pause on hover. Gold glow when unlocked. */
export default function ProverbMarquee() {
  const games = useGameStore((s) => s.games);
  const caveStars = Object.values(games.cave.stars).reduce((a, b) => a + b, 0);
  const khareefStars = Object.values(games.khareef.stars).reduce((a, b) => a + b, 0);
  const unlockedCount = Math.min(PROVERBS.length, caveStars * 2 + khareefStars);
  const doubled = [...PROVERBS, ...PROVERBS];

  return (
    <div className="relative overflow-hidden py-2 group">
      <div
        className="flex gap-4 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ['--marquee-x' as string]: '-50%' }}
      >
        {doubled.map((p, i) => (
          <ProverbCard key={i} p={p} unlocked={i % PROVERBS.length < unlockedCount} />
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-foam to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-foam to-transparent" />
    </div>
  );
}
