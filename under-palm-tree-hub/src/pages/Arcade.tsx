import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useSfx } from '@/lib/sfx';

interface ArcadeItem {
  route: string;
  emoji: string;
  title: string;
  arabic: string;
  blurb: string;
  tag: string;
  accent: string;
  gradient: string;
}

const ITEMS: ArcadeItem[] = [
  {
    route: '/game/super-khanjar',
    emoji: '⚔️',
    title: 'Super Khanjari',
    arabic: 'الخنجر الخارق',
    blurb: 'A 2D platformer adventure through Samail, 1973.',
    tag: 'A2 · Platformer',
    accent: '#FFB54D',
    gradient: 'from-mango to-coral',
  },
  {
    route: '/game/qarwashiya',
    emoji: '🌆',
    title: 'Al-Qarwashiya Chronicles',
    arabic: 'حكايات القرواشية',
    blurb: 'A 36-level cyberpunk vocabulary quest.',
    tag: 'B1 · Vocab Quest',
    accent: '#8B6FE8',
    gradient: 'from-violet2 to-fuchsia2',
  },
  {
    route: '/scene/cyber-city',
    emoji: '🏙️',
    title: 'Cyber City 3D',
    arabic: 'المدينة السيبرانية',
    blurb: 'Explore a realistic 3D cyberpunk city scene.',
    tag: 'B1 · 3D Scene',
    accent: '#7DF9E8',
    gradient: 'from-jinn-indigo to-deepsea',
  },
  {
    route: '/explore/oasis-3d',
    emoji: '🌴',
    title: 'Samail Oasis Explorer',
    arabic: 'واحة سمائل',
    blurb: 'Wander a lush 3D oasis and learn its words.',
    tag: 'A1 · Explorer',
    accent: '#4FBF67',
    gradient: 'from-turquoise to-palm',
  },
  {
    route: '/explore/map-3d',
    emoji: '🗺️',
    title: 'World Map 3D',
    arabic: 'خريطة العالم',
    blurb: 'Spin the globe and discover places in English.',
    tag: 'A2 · Explorer',
    accent: '#3ED6C5',
    gradient: 'from-deepsea to-turquoise',
  },
  {
    route: '/explore/oman-map',
    emoji: '🇴🇲',
    title: 'Oman Governorates Map',
    arabic: 'محافظات عُمان',
    blurb: 'Learning map of the governorates + quiz.',
    tag: 'A2 · Map Quiz',
    accent: '#D9A441',
    gradient: 'from-brass to-mango',
  },
  {
    route: '/vr',
    emoji: '🥽',
    title: 'VR Village Tour',
    arabic: 'جولة القرية',
    blurb: 'Step inside the village with WebXR.',
    tag: 'Mixed · VR',
    accent: '#E5599C',
    gradient: 'from-fuchsia2 to-violet2',
  },
  {
    route: '/ar',
    emoji: '📱',
    title: 'AR Story Friends',
    arabic: 'أصدقاء الحكاية',
    blurb: 'Bring novel characters into your room.',
    tag: 'Mixed · AR',
    accent: '#FF7A66',
    gradient: 'from-coral to-fuchsia2',
  },
  {
    route: '/gallery/ten-games',
    emoji: '🎪',
    title: 'Ten Omani Mini-Games',
    arabic: 'عشر ألعاب عمانية',
    blurb: 'A gallery of ten quick heritage mini-games.',
    tag: 'Mixed · Gallery',
    accent: '#FFD93D',
    gradient: 'from-sunshine to-mango',
  },
];

function ArcadeCard({ item, index }: { item: ArcadeItem; index: number }) {
  const navigate = useNavigate();
  const { play } = useSfx();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.05 + index * 0.06, type: 'spring', stiffness: 160, damping: 18 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 overflow-hidden flex flex-col"
    >
      {/* illustration area */}
      <div
        className={`relative h-32 grid place-items-center bg-gradient-to-br ${item.gradient}`}
      >
        <motion.span
          className="text-6xl drop-shadow-lg select-none"
          animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.span>
        <span
          className="absolute top-2 right-2 text-[10px] font-extrabold uppercase tracking-[0.12em] rounded-full px-2 py-0.5 text-white"
          style={{ backgroundColor: item.accent }}
        >
          {item.tag}
        </span>
      </div>
      {/* body */}
      <div className="flex flex-col gap-1 p-4 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display font-extrabold text-ink text-lg leading-tight">
            {item.title}
          </h3>
          <span className="font-arabic text-door text-sm shrink-0">{item.arabic}</span>
        </div>
        <p className="text-sm text-ink/70 flex-1">{item.blurb}</p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            play('click');
            navigate(item.route);
          }}
          className={`mt-3 self-start flex items-center gap-1.5 rounded-full px-5 py-2 font-display font-extrabold text-sm text-white bg-gradient-to-r ${item.gradient} shadow-[0_4px_0_rgba(0,0,0,0.18)]`}
        >
          <Play size={15} /> Play
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Arcade() {
  const navigate = useNavigate();
  const { play } = useSfx();
  return (
    <div
      className="relative flex-1 overflow-y-auto bg-gradient-to-b from-foam via-turquoise/20 to-palm/20"
      style={{ minHeight: 'calc(100dvh - 4rem)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6">
        {/* header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-extrabold text-4xl sm:text-5xl text-ink"
          >
            🎪 Arcade Wing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-arabic text-2xl text-door"
          >
            جناح الألعاب
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-ink/70 font-bold max-w-xl"
          >
            New worlds beyond the village — platformers, cyberpunk quests, 3D
            explorers, VR & AR adventures.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              play('click');
              navigate('/');
            }}
            className="mt-2 flex items-center gap-2 rounded-full px-6 py-3 font-display font-extrabold text-white bg-gradient-to-r from-turquoise to-palm shadow-[0_5px_0_rgba(0,0,0,0.18)]"
          >
            <ArrowLeft size={18} /> Back to Village
          </motion.button>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
          {ITEMS.map((item, i) => (
            <ArcadeCard key={item.route} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
