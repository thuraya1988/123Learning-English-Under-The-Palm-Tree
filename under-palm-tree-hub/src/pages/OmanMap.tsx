import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, BookOpen, Target, Puzzle } from 'lucide-react';
import { useSfx } from '@/lib/sfx';

interface PlaceInfo {
  en: string;
  ar: string;
  fact: string;
}

const REGIONS: Record<string, PlaceInfo> = {
  musandam: { en: 'Musandam', ar: 'مسندم', fact: 'تعرف بـ "جبال عمان" وتطل على مضيق هرمز' },
  'batinah-north': { en: 'Al Batinah North', ar: 'شمال الباطنة', fact: 'تضم مدينة صحار التاريخية' },
  'batinah-south': { en: 'Al Batinah South', ar: 'جنوب الباطنة', fact: 'منطقة زراعية غنية بالنخيل' },
  muscat: { en: 'Muscat', ar: 'مسقط', fact: 'عاصمة عمان وقلبها التجاري والسياسي' },
  dakhiliyah: { en: 'Al Dakhiliyah', ar: 'الداخلية', fact: 'تضم قلعة نزوى التاريخية' },
  'sharqiyah-north': { en: 'Al Sharqiyah North', ar: 'شمال الشرقية', fact: 'تطل على بحر العرب' },
  'sharqiyah-south': { en: 'Al Sharqiyah South', ar: 'جنوب الشرقية', fact: 'تضم مدينة صور ووادي شاب' },
  dhahirah: { en: 'Al Dhahirah', ar: 'الظاهرة', fact: 'منطقة زراعية وتاريخية' },
  wusta: { en: 'Al Wusta', ar: 'الوسطى', fact: 'منطقة صحراوية واسعة' },
  dhofar: { en: 'Dhofar', ar: 'ظفار', fact: 'تشتهر بموسم الخريف واللبان' },
  buraimi: { en: 'Al Buraimi', ar: 'البريمي', fact: 'منطقة حدودية مع الإمارات' },
  desert: { en: 'Empty Quarter', ar: 'الربع الخالي', fact: 'أكبر صحراء رملية في العالم' },
};

const CITIES: Record<string, PlaceInfo> = {
  sohar: { en: 'Sohar', ar: 'صحار', fact: 'مسقط جون جريفيث في الرواية' },
  muscat: { en: 'Muscat', ar: 'مسقط', fact: 'عاصمة عمان' },
  nizwa: { en: 'Nizwa', ar: 'نزوى', fact: 'قلعة نزوى - أقدم قلعة في عمان' },
  sur: { en: 'Sur', ar: 'صور', fact: 'مدينة السفن التقليدية' },
  salalah: { en: 'Salalah', ar: 'صلالة', fact: 'عاصمة الخريف' },
  buraimi: { en: 'Al Buraimi', ar: 'البريمي', fact: 'واحة تاريخية' },
  ibri: { en: 'Ibri', ar: 'عبري', fact: 'مدينة تاريخية' },
  haima: { en: 'Haima', ar: 'هيماء', fact: 'وسط عمان' },
  rustaq: { en: 'Rustaq', ar: 'رستاق', fact: 'قلعة رستاق التاريخية' },
};

const REGION_PATHS: { key: string; d: string }[] = [
  { key: 'musandam', d: 'M50,20 L80,15 L90,35 L60,40 Z' },
  { key: 'batinah-north', d: 'M80,35 L120,30 L130,55 L90,60 Z' },
  { key: 'batinah-south', d: 'M90,60 L130,55 L140,80 L100,85 Z' },
  { key: 'muscat', d: 'M130,55 L160,50 L170,80 L140,85 Z' },
  { key: 'dakhiliyah', d: 'M120,85 L160,80 L170,120 L130,125 Z' },
  { key: 'sharqiyah-north', d: 'M160,80 L200,75 L210,110 L170,115 Z' },
  { key: 'sharqiyah-south', d: 'M170,115 L210,110 L220,150 L180,155 Z' },
  { key: 'dhahirah', d: 'M80,85 L120,80 L130,120 L90,125 Z' },
  { key: 'wusta', d: 'M130,125 L180,120 L190,180 L140,185 Z' },
  { key: 'dhofar', d: 'M180,155 L220,150 L230,220 L190,225 Z' },
  { key: 'buraimi', d: 'M60,80 L90,75 L95,100 L65,105 Z' },
  { key: 'desert', d: 'M90,125 L140,120 L150,180 L100,185 Z' },
];

const CITY_DOTS: { key: string; cx: number; cy: number; r: number }[] = [
  { key: 'sohar', cx: 105, cy: 45, r: 5 },
  { key: 'rustaq', cx: 115, cy: 70, r: 4 },
  { key: 'muscat', cx: 150, cy: 65, r: 6 },
  { key: 'nizwa', cx: 145, cy: 100, r: 5 },
  { key: 'sur', cx: 185, cy: 95, r: 4 },
  { key: 'salalah', cx: 200, cy: 130, r: 5 },
  { key: 'ibri', cx: 105, cy: 100, r: 4 },
  { key: 'haima', cx: 160, cy: 150, r: 4 },
  { key: 'buraimi', cx: 78, cy: 90, r: 4 },
];

const REGION_LABELS: { key: string; x: number; y: number }[] = [
  { key: 'musandam', x: 70, y: 32 },
  { key: 'desert', x: 120, y: 155 },
];

const CITY_LABELS: { key: string; x: number; y: number }[] = [
  { key: 'sohar', x: 105, y: 42 },
  { key: 'muscat', x: 150, y: 62 },
  { key: 'nizwa', x: 145, y: 97 },
  { key: 'sur', x: 185, y: 92 },
  { key: 'salalah', x: 200, y: 127 },
  { key: 'buraimi', x: 78, y: 87 },
];

const QUIZ = [
  { q: 'ما هي عاصمة عمان؟', options: ['نزوى', 'مسقط', 'صلالة', 'صحار'], correct: 1 },
  { q: 'What is the capital of Oman?', options: ['Nizwa', 'Muscat', 'Salalah', 'Sohar'], correct: 1 },
  { q: 'أين تقع قلعة نزوى؟', options: ['الداخلية', 'مسقط', 'ظفار', 'البريمي'], correct: 0 },
  { q: 'Where is Sohar located?', options: ['South', 'North Batinah', 'Dhofar', 'Muscat'], correct: 1 },
  { q: 'ما اسم أكبر صحراء رملية في العالم؟', options: ['الصحراء الكبرى', 'الربع الخالي', 'صحراء النفود', 'صحراء الكalahari'], correct: 1 },
];

const LS_KEY = 'upt_map_score';

interface MapStats {
  score: number;
  words: number;
  correct: number;
}

function loadStats(): MapStats {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const d = JSON.parse(raw) as Partial<MapStats>;
      return { score: d.score ?? 0, words: d.words ?? 0, correct: d.correct ?? 0 };
    }
  } catch {
    /* ignore */
  }
  return { score: 0, words: 0, correct: 0 };
}

export default function OmanMap() {
  const { play } = useSfx();
  const [stats, setStats] = useState<MapStats>(loadStats);
  const [info, setInfo] = useState<PlaceInfo | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizResult, setQuizResult] = useState('');
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    [],
  );

  const showInfo = (data: PlaceInfo, regionKey?: string) => {
    play('click');
    if (regionKey) setActiveRegion(regionKey);
    setInfo(data);
    setStats((s) => ({ ...s, score: s.score + 5, words: s.words + 1 }));
  };

  const startQuiz = () => {
    play('magic');
    setQuizActive(true);
    setQuizIdx(0);
    setQuizDone(false);
    setQuizResult('');
  };

  const answerQuiz = (idx: number) => {
    if (quizDone || quizResult) return;
    const q = QUIZ[quizIdx];
    if (idx === q.correct) {
      play('success');
      setQuizResult('✅ صحيح! +10 نقاط');
      setStats((s) => ({ ...s, score: s.score + 10, correct: s.correct + 1 }));
    } else {
      play('error');
      setQuizResult('❌ حاول مرة أخرى!');
    }
    advanceTimer.current = window.setTimeout(() => {
      setQuizResult('');
      if (quizIdx + 1 >= QUIZ.length) {
        setQuizDone(true);
      } else {
        setQuizIdx(quizIdx + 1);
      }
    }, 1500);
  };

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-foam py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-start mb-4">
          <Link
            to="/arcade"
            className="inline-flex items-center gap-2 rounded-full bg-paper border-2 border-turquoise/40 px-4 py-2 text-sm font-bold text-deepsea shadow-sm hover:bg-turquoise/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            عودة إلى الألعاب
          </Link>
        </div>

        <h1 className="font-display text-center text-2xl sm:text-3xl font-extrabold text-ink mb-1">
          🗺️ خريطة سلطنة عمان التعليمية
        </h1>
        <p className="text-center text-sm text-ink/60 mb-5">
          اضغط على أي محافظة لتتعلم اسمها بالإنجليزي!
        </p>

        <div className="bg-paper rounded-2xl border-2 border-turquoise/30 shadow-md p-4 sm:p-6 max-w-xl mx-auto">
          <svg viewBox="0 0 400 300" className="w-full h-auto">
            {REGION_PATHS.map((r) => (
              <path
                key={r.key}
                d={r.d}
                onClick={() => showInfo(REGIONS[r.key], r.key)}
                className="cursor-pointer transition-all duration-300"
                fill={activeRegion === r.key ? 'rgba(62,214,197,0.45)' : 'rgba(79,191,103,0.18)'}
                stroke={activeRegion === r.key ? '#159AAD' : 'rgba(21,154,173,0.55)'}
                strokeWidth={activeRegion === r.key ? 3 : 1.5}
              />
            ))}
            {CITY_DOTS.map((c) => (
              <circle
                key={c.key}
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                onClick={(e) => {
                  e.stopPropagation();
                  showInfo(CITIES[c.key]);
                }}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                fill="#FFB54D"
                stroke="#fff"
                strokeWidth={1.5}
              />
            ))}
            {REGION_LABELS.map((l) => (
              <text
                key={l.key}
                x={l.x}
                y={l.y}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill="#21323B"
                fontSize={11}
                fontWeight={600}
              >
                {REGIONS[l.key].ar}
              </text>
            ))}
            {CITY_LABELS.map((l) => (
              <text
                key={l.key}
                x={l.x}
                y={l.y}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill="#21323B"
                fontSize={11}
                fontWeight={600}
              >
                {CITIES[l.key].ar}
              </text>
            ))}
          </svg>
        </div>

        <div className="mt-4 bg-paper rounded-2xl border-2 border-palm/30 shadow-sm p-4 min-h-[120px]">
          {!info ? (
            <div className="text-ink font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-deepsea" />
              اضغط على أي محافظة أو مدينة!
            </div>
          ) : (
            <>
              <div className="text-ink text-lg font-extrabold mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-deepsea" />
                {info.ar}
              </div>
              <div dir="ltr" className="text-right text-deepsea text-lg font-bold">
                {info.en}
              </div>
              <div className="text-ink/60 text-sm mb-1">{info.ar}</div>
              <div className="text-ink/70 text-sm leading-relaxed">💡 {info.fact}</div>
            </>
          )}
        </div>

        <div className="flex justify-center gap-3 sm:gap-5 mt-4 flex-wrap">
          <div className="bg-paper border-2 border-sunshine/60 rounded-xl px-4 py-2 text-sm font-bold text-ink shadow-sm">
            🌴 نقاط: <span className="text-deepsea">{stats.score}</span>
          </div>
          <div className="bg-paper border-2 border-turquoise/60 rounded-xl px-4 py-2 text-sm font-bold text-ink shadow-sm">
            <BookOpen className="inline w-4 h-4 ml-1 text-deepsea" />
            كلمات: <span className="text-deepsea">{stats.words}</span>
          </div>
          <div className="bg-paper border-2 border-palm/60 rounded-xl px-4 py-2 text-sm font-bold text-ink shadow-sm">
            <Target className="inline w-4 h-4 ml-1 text-palm-dark" />
            إجابات: <span className="text-deepsea">{stats.correct}</span>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="mt-5 mx-auto flex items-center gap-2 bg-gradient-to-l from-turquoise to-deepsea text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-md hover:scale-[1.03] active:scale-95 transition-transform"
        >
          <Puzzle className="w-4 h-4" />
          ابدأ اختبار المحافظات
        </button>

        {quizActive && (
          <div className="mt-4 bg-paper rounded-2xl border-2 border-deepsea/30 shadow-sm p-4">
            {quizDone ? (
              <>
                <div className="text-center text-ink font-bold mb-2">🎉 اكتمل الاختبار!</div>
                <div className="text-center text-deepsea font-bold text-sm">
                  أحسنت! تعلمت {stats.words} كلمة
                </div>
              </>
            ) : (
              <>
                <div className="text-center text-ink text-sm font-bold mb-3">
                  {QUIZ[quizIdx].q}
                </div>
                <div>
                  {QUIZ[quizIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => answerQuiz(i)}
                      className="block w-full bg-mist/60 hover:bg-turquoise/20 border border-turquoise/40 text-ink py-2.5 mb-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizResult && (
                  <div className="text-center text-sm font-bold text-ink mt-2">{quizResult}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
