import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Hand, Sparkles } from 'lucide-react';
import { useSfx } from '@/lib/sfx';

interface CharacterDef {
  emoji: string;
  name: string;
  ar: string;
  word: string;
  wordAr: string;
  color: string;
}

const CHARACTERS: Record<string, CharacterDef> = {
  john: { emoji: '👨‍🦰', name: 'John Griffith', ar: 'جون جريفيث', word: 'Adventure', wordAr: 'مغامرة', color: '#FF8C00' },
  sophia: { emoji: '👩‍⚕️', name: 'Sophia', ar: 'صوفيا', word: 'Nurse', wordAr: 'ممرضة', color: '#E5599C' },
  thuria: { emoji: '👩‍💼', name: 'Thuria', ar: 'ثريا', word: 'Leader', wordAr: 'قائدة', color: '#2F9E4F' },
  alexander: { emoji: '👨‍💼', name: 'Alexander', ar: 'الإسكندر', word: 'Friend', wordAr: 'صديق', color: '#4169E1' },
  palm: { emoji: '🌴', name: 'Palm Tree', ar: 'نخلة', word: 'Heritage', wordAr: 'تراث', color: '#4FBF67' },
};

const CHAR_KEYS = Object.keys(CHARACTERS);
const LS_KEY = 'upt_ar_progress';

interface Placed {
  x: number;
  y: number;
  char: string;
  scale: number;
  targetScale: number;
  time: number;
}

function readProgress(): { words: string[]; count: number } {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as { words: string[]; count: number };
  } catch {
    /* ignore */
  }
  return { words: [], count: 0 };
}

function saveProgress(word: string) {
  const data = readProgress();
  if (!data.words.includes(word)) {
    data.words.push(word);
    data.count++;
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function ArCharacters() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const placedRef = useRef<Placed[]>([]);
  const tapRef = useRef({ x: 0.5, y: 0.5 });
  const selectedRef = useRef('john');
  const rafRef = useRef(0);
  const cardTimer = useRef<number | null>(null);

  const [started, setStarted] = useState(false);
  const [denied, setDenied] = useState(false);
  const [selected, setSelected] = useState('john');
  const [wordCard, setWordCard] = useState<CharacterDef | null>(null);
  const [wordsCount, setWordsCount] = useState(() => readProgress().count);
  const { play } = useSfx();

  selectedRef.current = selected;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();

    placedRef.current.forEach((item) => {
      if (item.scale < item.targetScale) item.scale += 0.05;
      const floatY = Math.sin((now - item.time) * 0.003) * 20;
      const x = item.x * canvas.width;
      const y = item.y * canvas.height + floatY;
      const size = 80 * item.scale * (canvas.width / 400);
      const char = CHARACTERS[item.char];

      // shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(x, y + size * 0.4, size * 0.5, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // emoji
      ctx.font = `${size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char.emoji, x, y);

      // name tag (bright turquoise pill)
      ctx.fillStyle = 'rgba(21,154,173,0.9)';
      roundRectPath(ctx, x - size * 0.6, y - size * 0.8, size * 1.2, 24, 10);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(char.ar, x, y - size * 0.8 + 12);

      // english word
      ctx.fillStyle = char.color;
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(char.word, x, y + size * 0.6);
    });

    // placement indicator
    const ix = tapRef.current.x * canvas.width;
    const iy = tapRef.current.y * canvas.height;
    ctx.strokeStyle = '#FFB54D';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(ix, iy, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const startCamera = async () => {
    play('click');
    setDenied(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      setStarted(true);
    } catch (e) {
      console.error('Camera error:', e);
      setDenied(true);
    }
  };

  // Wire the stream to the video element once the camera view is mounted
  useEffect(() => {
    if (!started) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const stream = streamRef.current;
    if (!video || !canvas || !stream) return;

    video.srcObject = stream;
    const onMeta = () => {
      canvas.width = video.videoWidth || window.innerWidth;
      canvas.height = video.videoHeight || window.innerHeight;
      rafRef.current = requestAnimationFrame(animate);
    };
    video.addEventListener('loadedmetadata', onMeta);
    void video.play().catch(() => undefined);

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      cancelAnimationFrame(rafRef.current);
    };
  }, [started, animate]);

  // Stop the camera when leaving the page
  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      cancelAnimationFrame(rafRef.current);
      if (cardTimer.current) window.clearTimeout(cardTimer.current);
    },
    [],
  );

  const updateTap = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    tapRef.current = {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
  };

  const placeCharacter = () => {
    const char = CHARACTERS[selectedRef.current];
    play('magic');
    placedRef.current.push({
      x: tapRef.current.x,
      y: tapRef.current.y,
      char: selectedRef.current,
      scale: 0,
      targetScale: 1,
      time: Date.now(),
    });
    setWordCard(char);
    if (cardTimer.current) window.clearTimeout(cardTimer.current);
    cardTimer.current = window.setTimeout(() => setWordCard(null), 3000);
    saveProgress(char.word);
    setWordsCount(readProgress().count);
  };

  return (
    <div dir="rtl" className="fixed inset-0 z-[60] bg-foam overflow-hidden">
      {!started ? (
        /* Start screen — bright theme */
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-foam via-paper to-mist">
          <Link
            to="/arcade"
            onClick={() => play('click')}
            className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-paper border-2 border-turquoise/40 rounded-full px-3.5 py-2 text-xs font-bold text-deepsea shadow-md hover:bg-turquoise/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            عودة
          </Link>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-turquoise to-deepsea grid place-items-center shadow-lg mb-4">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mb-3">
            📱 Under Palm Tree AR
          </h1>
          <p className="text-ink/70 text-sm leading-relaxed max-w-md">
            وجه الكاميرا على أي مكان في غرفتك!
          </p>
          <p className="text-ink/70 text-sm leading-relaxed max-w-md">
            اضغط على شخصية ثم اضغط "ضع الشخصية" ليظهر بطل الرواية في عالمك الحقيقي!
          </p>
          <p className="text-deepsea text-sm font-bold mt-1">
            💡 كل شخصية تعلمك كلمة إنجليزية جديدة
          </p>
          <button
            onClick={startCamera}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-l from-turquoise to-deepsea text-white px-10 py-3.5 rounded-xl text-base font-bold shadow-lg hover:scale-[1.03] active:scale-95 transition-transform"
          >
            <Camera className="w-5 h-5" />
            فتح الكاميرا
          </button>
          {denied && (
            <p className="mt-4 text-coral text-sm font-bold bg-coral/10 border-2 border-coral/40 rounded-xl px-4 py-2">
              ❌ يجب السماح بالوصول للكاميرا. تحقق من إعدادات المتصفح ثم حاول مجددًا.
            </p>
          )}
        </div>
      ) : (
        /* Camera view */
        <div className="relative w-full h-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <canvas
            ref={canvasRef}
            onClick={(e) => updateTap(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              const t = e.touches[0];
              if (t) updateTap(t.clientX, t.clientY);
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}
          />

          {/* UI layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-paper/90 border-2 border-turquoise/40 px-5 py-2 rounded-2xl text-center shadow-md">
              <h1 className="text-sm font-extrabold text-ink">🌴 AR قرية النخلة</h1>
              <p className="text-[11px] text-ink/60">اختر شخصية ثم اضغط "ضع الشخصية"</p>
              <p className="text-[11px] font-bold text-deepsea mt-0.5">
                <Sparkles className="inline w-3 h-3 ml-1" />
                كلمات تعلمتها: {wordsCount}
              </p>
            </div>

            <Link
              to="/arcade"
              onClick={() => play('click')}
              className="pointer-events-auto absolute top-3 right-3 inline-flex items-center gap-1.5 bg-paper/90 border-2 border-turquoise/40 rounded-full px-3.5 py-2 text-xs font-bold text-deepsea shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              عودة
            </Link>

            {/* word card */}
            <div
              className={`absolute top-24 left-1/2 -translate-x-1/2 bg-paper border-2 border-mango px-6 py-3.5 rounded-2xl text-center shadow-xl transition-transform duration-500 ${
                wordCard ? 'translate-y-0' : '-translate-y-[150%]'
              }`}
            >
              <div dir="ltr" className="text-deepsea text-xl font-extrabold">
                {wordCard?.word ?? '-'}
              </div>
              <div className="text-ink text-base font-bold">{wordCard?.wordAr ?? '-'}</div>
              <div className="text-ink/50 text-xs">
                {wordCard ? `${wordCard.name} - ${wordCard.ar}` : '-'}
              </div>
            </div>

            {/* character selector */}
            <div className="pointer-events-auto absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2.5">
              {CHAR_KEYS.map((key) => {
                const c = CHARACTERS[key];
                const isSel = selected === key;
                return (
                  <button
                    key={key}
                    title={c.ar}
                    onClick={() => {
                      setSelected(key);
                      play('hover');
                    }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl bg-paper/90 shadow-md transition-all border-[3px] ${
                      isSel
                        ? 'border-mango scale-110 shadow-[0_0_16px_rgba(255,181,77,0.6)]'
                        : 'border-white/60 active:scale-90'
                    }`}
                  >
                    {c.emoji}
                  </button>
                );
              })}
            </div>

            <button
              onClick={placeCharacter}
              className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-gradient-to-l from-mango to-coral text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform"
            >
              <Hand className="w-5 h-5" />
              ضع الشخصية هنا
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
