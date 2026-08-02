import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TarotGame from '@/components/tengames/TarotGame';
import TimeWindow from '@/components/tengames/TimeWindow';
import OmanGlobe from '@/components/tengames/OmanGlobe';
import AnimalsWorld from '@/components/tengames/AnimalsWorld';
import PalmGarden from '@/components/tengames/PalmGarden';
import HeritageMarket from '@/components/tengames/HeritageMarket';
import PerfumeGarden from '@/components/tengames/PerfumeGarden';
import OmaniArchive from '@/components/tengames/OmaniArchive';
import PalmPortal from '@/components/tengames/PalmPortal';
import FrankincenseTreasure from '@/components/tengames/FrankincenseTreasure';

interface GameDef {
  id: string;
  navLabel: string;
  titleAr: string;
  titleEn: string;
  subtitle: string;
  icon: string;
  component: ComponentType;
}

const GAMES: GameDef[] = [
  { id: 'tarot', navLabel: '1. ورق العُماني', titleAr: 'ورق العُماني', titleEn: 'Omani Tarot', subtitle: 'اكتشف 10 شخصيات عمانية خالدة — اضغط على الكرت لقلبه', icon: '🃏', component: TarotGame },
  { id: 'window', navLabel: '2. نافذة الزمن', titleAr: 'نافذة الزمن', titleEn: 'Window to Time', subtitle: 'رحلة من عام 1973 إلى 2024 — شاهد تحول عُمان', icon: '🪟', component: TimeWindow },
  { id: 'earth', navLabel: '3. كرة عمان', titleAr: 'كرة عمان', titleEn: 'Oman Globe', subtitle: 'بث مباشر من حول العالم — اضغط على النقاط المضيئة', icon: '🌍', component: OmanGlobe },
  { id: 'animals', navLabel: '4. عالم الحيوان', titleAr: 'عالم الحيوان العماني', titleEn: 'Omani Animals', subtitle: 'اكتشف الحيوانات منذ 1973 — اضغط للتنقل بينها', icon: '🦁', component: AnimalsWorld },
  { id: 'garden', navLabel: '5. حديقة النخيل', titleAr: 'حديقة النخيل', titleEn: 'Palm Garden', subtitle: 'زرع، ري، وحصاد التمور — اضغط على النخلة للتفاعل', icon: '🌴', component: PalmGarden },
  { id: 'heritage', navLabel: '6. سوق الماضي', titleAr: 'سوق الماضي', titleEn: 'Heritage Market', subtitle: 'تجول في سوق مسقط القديم — اضغط على البائعين لسماع قصصهم', icon: '🏪', component: HeritageMarket },
  { id: 'petal', navLabel: '7. دوحة العطور', titleAr: 'دوحة العطور', titleEn: 'Perfume Garden', subtitle: 'عالم اللبان والورد العماني — اضغط على الزهرة لاستنشاق عطرها', icon: '🌸', component: PerfumeGarden },
  { id: 'darwin', navLabel: '8. أرشيف العُماني', titleAr: 'أرشيف العُماني', titleEn: 'Omani Archive', subtitle: 'مكتبة رقمية تفاعلية — اضغط على المخطوطة لقراءتها', icon: '📚', component: OmaniArchive },
  { id: 'hero', navLabel: '9. باب النخلة', titleAr: 'باب النخلة', titleEn: 'Palm Portal', subtitle: 'المدخل السحري لعالم Under Palm Tree — ادخل البوابة', icon: '🚪', component: PalmPortal },
  { id: 'cacao', navLabel: '10. كنز اللبان', titleAr: 'كنز اللبان', titleEn: 'Frankincense Treasure', subtitle: 'مغامرة في غابات ظفار — اضغط لجمع اللبان واكتشاف الأسرار', icon: '💰', component: FrankincenseTreasure },
];

export default function TenGamesGallery() {
  const [activeId, setActiveId] = useState(GAMES[0].id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const active = GAMES.find((g) => g.id === activeId) ?? GAMES[0];
  const ActiveComponent = active.component;

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-[#0a0a0f] text-[#f5f0e8]" style={{ fontFamily: '"Noto Naskh Arabic", "Outfit", serif' }}>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[5000] bg-[#0a0a0f] flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl"
            >
              🌴
            </motion.div>
            <div className="text-[#c9a96e] text-xl" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
              تحت النخلة...
            </div>
            <div className="w-52 h-[3px] bg-[rgba(201,169,110,0.2)] rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="h-full bg-[#c9a96e]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-8 py-3 flex justify-between items-center gap-4 bg-gradient-to-b from-[rgba(10,10,15,0.95)] via-[rgba(10,10,15,0.7)] to-transparent backdrop-blur-md border-b border-[rgba(201,169,110,0.1)]">
        <div className="flex items-center gap-4">
          <Link to="/arcade" className="text-[rgba(245,240,232,0.7)] hover:text-[#c9a96e] text-sm transition-colors whitespace-nowrap">
            → الأركيد
          </Link>
          <span className="text-[#c9a96e] text-lg whitespace-nowrap" style={{ fontFamily: '"Noto Naskh Arabic", serif' }}>
            🌴 Under Palm Tree
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              className={
                g.id === activeId
                  ? 'whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-[#c9a96e] bg-[rgba(201,169,110,0.15)] text-[#c9a96e] transition-all'
                  : 'whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-transparent text-[rgba(245,240,232,0.6)] hover:text-[#c9a96e] transition-all'
              }
            >
              {g.navLabel}
            </button>
          ))}
        </div>
      </nav>

      {/* Active game section */}
      <main className="pt-20 pb-8">
        <AnimatePresence mode="wait">
          <motion.section
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-[#c9a96e] text-4xl md:text-5xl text-center px-4 pt-6 pb-2 [text-shadow:0_0_30px_rgba(201,169,110,0.3)]"
              style={{ fontFamily: '"Noto Naskh Arabic", serif' }}
            >
              {active.icon} {active.titleAr}
            </h1>
            <p className="text-center text-[rgba(245,240,232,0.45)] text-sm tracking-wide uppercase">{active.titleEn}</p>
            <p className="text-center opacity-60 text-base mt-1 mb-4">{active.subtitle}</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto max-w-xs opacity-30 mb-2" />
            <ActiveComponent />
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 text-center opacity-40 text-sm border-t border-[rgba(201,169,110,0.1)]">
        <p>Under Palm Tree — مشروع تعليمي تفاعلي يحتفي بالتراث العماني</p>
        <p className="mt-2 opacity-60">تم التطوير باستخدام Three.js + React + المصادر المفتوحة</p>
        <p className="mt-4 text-xs">
          المصادر: Kenney (CC0) | Poly Haven (CC0) | OpenGameArt | Freesound (CC0) |<br />
          Meshy.ai (CC0) | Blender (GPL) | Krita (GPL) | Godot (MIT) | ComfyUI (GPL)
        </p>
      </footer>
    </div>
  );
}
