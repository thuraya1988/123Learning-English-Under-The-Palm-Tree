import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Home, Play } from 'lucide-react';
import { useSfx } from '@/lib/sfx';
import ProverbMarquee from '@/components/about/ProverbMarquee';
import MascotFacts from '@/components/about/MascotFacts';

const HeroDiorama = lazy(() => import('@/components/about/HeroDiorama'));

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ---------- data ---------- */
const STORIES = [
  {
    img: '/about-heritage-1.png',
    title: 'Doors & Forts',
    arabic: 'أبواب وحصون',
    paras: [
      'The carved wooden doors of Oman guard homes, forts and a thousand family stories. Each brass stud and teal panel tells of the majlis within — a place of welcome, coffee and conversation.',
      'Bahla Fort, a UNESCO World Heritage site, is wrapped in legends of jinn who built its walls in a single night. In Fort of Riddles, you solve their puzzles in English to climb the old tower.',
    ],
    game: 'Play: Fort of Riddles',
    route: '/game/bahla',
  },
  {
    img: '/about-heritage-2.png',
    title: "The Sea & Sindbad's Legacy",
    arabic: 'البحر والسندباد',
    paras: [
      'For centuries the shipyards of Sur built wooden dhows by hand — vessels that carried Omani sailors, pearl divers and traders as far as India, Africa and China. Many say Sindbad himself sailed from these shores.',
      'Sailors spoke of Bu Darya, a kind sea spirit who guided lost ships home through the waves. In Dhow Voyager, every sentence you build catches the wind between the islands.',
    ],
    game: 'Play: Dhow Voyager',
    route: '/game/dhow',
  },
  {
    img: '/about-heritage-3.png',
    title: 'Green Salalah & Frankincense',
    arabic: 'صلالة واللبان',
    paras: [
      'Every summer the khareef monsoon wraps Salalah in mist, turning the mountains green with waterfalls and coconut palms — a hidden garden of Arabia.',
      'Here grow the frankincense trees of Wadi Dawkah, whose glowing resin was once worth more than gold. On the Frankincense Trail, story quests lead you through the misty hills.',
    ],
    game: 'Play: Khareef Quest',
    route: '/game/khareef',
  },
];

const TIMELINE = [
  { badge: '/badge-cefr-a1.png', label: 'A1', line: 'Match words', color: '#4FBF67' },
  { badge: '/badge-cefr-a2.png', label: 'A2', line: 'Spell & build sentences', color: '#3ED6C5' },
  { badge: '/badge-cefr-b1.png', label: 'B1', line: 'Solve riddles & grammar', color: '#8B6FE8' },
  { badge: '/badge-cefr-b2.png', label: 'B2', line: 'Master proverbs & stories', color: '#D9A441' },
];

const NAV_CHIPS = [
  { id: 'stories', label: 'Stories' },
  { id: 'proverbs', label: 'Proverbs' },
  { id: 'learning', label: 'Learning' },
  { id: 'credits', label: 'Credits' },
];

function PatternDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`h-10 bg-[url('/pattern-omani.svg')] bg-repeat-x bg-[length:auto_40px] opacity-80 ${
        flip ? '-scale-x-100' : ''
      }`}
    />
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ==================================================================== */
export default function About() {
  const { play } = useSfx();

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-foam via-white to-foam">
      {/* sticky mini-nav */}
      <div className="sticky top-16 z-40 flex justify-center px-3 pointer-events-none">
        <div className="pointer-events-auto mt-2 flex gap-1 bg-paper/90 backdrop-blur rounded-full shadow-lg border-2 border-white/60 p-1.5">
          {NAV_CHIPS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                play('click');
                scrollTo(c.id);
              }}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-ink/60 hover:bg-turquoise/20 hover:text-door transition-colors"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- 1. HERO ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/splash-hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foam/60 via-transparent to-foam" />
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-6 grid md:grid-cols-2 gap-6 items-center min-h-[70dvh]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-door"
            >
              About &amp; Heritage
            </motion.p>
            <h1 className="font-display font-extrabold text-ink leading-[1.05] text-4xl sm:text-5xl lg:text-[56px] mt-2 tracking-[-0.01em]">
              {'The Stories Behind the Games'.split(' ').map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.28em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              className="font-arabic text-door text-2xl mt-2"
              dir="rtl"
              lang="ar"
            >
              حكايات من عُمان
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.62 }}
              className="text-ink/60 font-semibold text-lg mt-3 max-w-md"
            >
              Six games. One magical heritage. English from first words to big ideas.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                play('click');
                scrollTo('stories');
              }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-door"
            >
              Scroll for the tales
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <ChevronDown size={18} />
              </motion.span>
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="h-72 sm:h-96"
          >
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-turquoise/30 border-t-turquoise animate-spin" />
                </div>
              }
            >
              <HeroDiorama />
            </Suspense>
          </motion.div>
        </div>
      </section>

      <PatternDivider />

      {/* ---------- 2. HERITAGE CARDS ---------- */}
      <section id="stories" className="scroll-mt-28 py-14 bg-gradient-to-b from-foam via-turquoise/10 to-foam">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-ink text-center tracking-[-0.01em]"
          >
            Heritage Stories
          </motion.h2>
          {STORIES.map((s, i) => {
            const imgLeft = i % 2 === 0;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, x: imgLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="bg-paper rounded-3xl shadow-xl border-2 border-white/60 overflow-hidden"
              >
                <div className="h-8 bg-[url('/pattern-omani.svg')] bg-repeat-x bg-[length:auto_32px]" />
                <div className={`grid md:grid-cols-2 gap-0 ${imgLeft ? '' : 'md:[direction:rtl]'}`}>
                  <div className="overflow-hidden [direction:ltr]">
                    <motion.img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover aspect-[4/3]"
                      initial={{ scale: 1.12 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 1, ease: EASE }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                  <div className="p-6 sm:p-8 [direction:ltr]">
                    <p className="font-arabic text-door text-xl" dir="rtl" lang="ar">
                      {s.arabic}
                    </p>
                    <h3 className="font-display font-extrabold text-2xl text-ink mt-1">
                      {s.title}
                    </h3>
                    {s.paras.map((p) => (
                      <p key={p.slice(0, 20)} className="text-ink/70 font-semibold mt-3 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    <Link to={s.route} onClick={() => play('click')}>
                      <motion.span
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-display font-extrabold text-white bg-gradient-to-r from-mango to-coral shadow-[0_4px_0_#E05A45]"
                      >
                        <Play size={17} /> {s.game}
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <PatternDivider flip />

      {/* ---------- 3. PROVERBS ---------- */}
      <section id="proverbs" className="scroll-mt-28 py-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center px-4"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-[-0.01em]">
            Folklore &amp; Proverbs
          </h2>
          <p className="text-ink/60 font-semibold mt-2">
            Collect Omani proverbs inside the Jinn Cave and the Khareef Quest — earned cards glow gold.
          </p>
        </motion.div>
        <div className="mt-8">
          <ProverbMarquee />
        </div>
        <MascotFacts className="absolute right-4 bottom-0 w-56 h-40 hidden md:block" />
      </section>

      <PatternDivider />

      {/* ---------- 4. HOW LEARNING WORKS ---------- */}
      <section id="learning" className="scroll-mt-28 py-14 bg-gradient-to-b from-foam via-mist/40 to-foam">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-ink text-center tracking-[-0.01em]"
          >
            How Learning Works
          </motion.h2>
          <p className="text-center text-ink/60 font-semibold mt-2">
            A gentle CEFR climb from A1 first words to B2 big ideas.
          </p>
          <div className="relative mt-10">
            {/* dashed connector */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="hidden md:block absolute top-12 left-[12%] right-[12%] border-t-4 border-dashed border-door/30 origin-left"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.6, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.img
                    src={t.badge}
                    alt={`CEFR ${t.label} badge`}
                    className="w-24 h-24 drop-shadow-lg"
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                  />
                  <p
                    className="mt-3 font-display font-extrabold text-lg"
                    style={{ color: t.color }}
                  >
                    {t.label}
                  </p>
                  <p className="text-sm font-bold text-ink/60">{t.line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PatternDivider flip />

      {/* ---------- 5. CREDITS ---------- */}
      <section id="credits" className="scroll-mt-28 py-14">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-8 text-center"
          >
            <img src="/logo-hub.png" alt="Under the Palm Tree logo" className="w-20 h-20 mx-auto" />
            <h2 className="font-display font-extrabold text-2xl text-ink mt-3">
              Credits &amp; Tech
            </h2>
            <p className="text-ink/70 font-semibold mt-3 leading-relaxed">
              Built with React Three Fiber, low-poly love, and Omani stories. Headings
              in <span className="font-display">Baloo 2</span>, body in Nunito, Arabic
              accents in <span className="font-arabic">Amiri</span>. Every cove, fort and
              palm is procedural geometry — flat-shaded and texture-free in the spirit of
              open, CC0-style assets. All sound effects are synthesized live with the
              WebAudio API; not a single audio file was harmed.
            </p>
            <p className="text-ink/50 font-semibold text-sm mt-3">
              شكراً — thank you to the storytellers of Oman, from the falaj gardens to the
              jinn caves.
            </p>
            <Link to="/" onClick={() => play('click')}>
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full font-display font-extrabold text-white bg-gradient-to-r from-turquoise to-palm shadow-[0_4px_0_#2F9E4F]"
              >
                <Home size={18} /> Back to Village
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
