'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type SoundKey = 'bell' | 'opening' | 'break' | 'dismissal'

type SoundMeta = {
  icon: string
  name: string
  file: string
}

type BellEvent = {
  time: string
  icon: string
  name: string
  sound: SoundKey
}

const REPO_RAW = 'https://raw.githubusercontent.com/thuraya1988/123Learning-English-Under-The-Palm-Tree/main/'
const SPECIAL_DATE = '2026-09-06'

const SOUNDS: Record<SoundKey, SoundMeta> = {
  bell: { icon: '🔔', name: 'جرس المدرسة', file: 'Music-one.mp3' },
  opening: { icon: '🎬', name: 'بداية الفعاليات', file: 'صوت ثاني .mp3' },
  break: { icon: '🛝', name: 'خلفية الفسحة', file: 'ملتقى.mp3' },
  dismissal: { icon: '👋', name: 'نهاية الدوام', file: 'نهايه الدوام ووقت المغادره .mp3' },
}

const EVENTS: BellEvent[] = [
  { time: '10:45', icon: '👩‍🏫', name: 'حضور المعلمات', sound: 'bell' },
  { time: '12:10', icon: '📣', name: 'بدء الطابور', sound: 'bell' },
  { time: '13:00', icon: '🤝', name: 'انتهاء فعاليات الفريق', sound: 'bell' },
  { time: '13:10', icon: '📚', name: 'تسليم الكتب لطالبات الحلقة الثانية', sound: 'bell' },
  { time: '13:20', icon: '🛝', name: 'فسحة الحلقة الأولى', sound: 'break' },
  { time: '13:40', icon: '🛝', name: 'فسحة الحلقة الثانية', sound: 'break' },
  { time: '14:15', icon: '👋', name: 'انصراف الطلبة', sound: 'dismissal' },
]

const soundUrl = (file: string) => REPO_RAW + encodeURIComponent(file)

export default function BellPage() {
  const refs = {
    bell: useRef<HTMLAudioElement>(null),
    opening: useRef<HTMLAudioElement>(null),
    break: useRef<HTMLAudioElement>(null),
    dismissal: useRef<HTMLAudioElement>(null),
  }

  const [clock, setClock] = useState('--:--:--')
  const [dateText, setDateText] = useState('')
  const [status, setStatus] = useState('🔸 جاري فحص الأصوات الأربعة في GitHub…')
  const [ready, setReady] = useState<Record<SoundKey, 'loading' | 'ready' | 'error'>>({
    bell: 'loading', opening: 'loading', break: 'loading', dismissal: 'loading',
  })
  const [enabled, setEnabled] = useState(false)
  const [auto, setAuto] = useState(true)
  const [vibrate, setVibrate] = useState(true)
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const fired = useRef(new Set<string>())

  const readyCount = useMemo(() => Object.values(ready).filter(v => v === 'ready').length, [ready])

  const stopAll = () => {
    Object.values(refs).forEach(ref => {
      const a = ref.current
      if (a) {
        a.pause()
        a.currentTime = 0
      }
    })
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate?.(0)
  }

  const playSound = async (key: SoundKey, label?: string) => {
    stopAll()
    const a = refs[key].current
    const meta = SOUNDS[key]
    if (!a) return
    try {
      a.volume = 1
      a.muted = false
      a.currentTime = 0
      await a.play()
      setStatus(`✅ يعمل الآن: ${label || meta.name} — ${meta.file}`)
      if (vibrate && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([300, 120, 300])
      }
    } catch {
      setStatus('⚠️ المتصفح منع التشغيل. اضغطي «تفعيل الأصوات الأربعة» مرة واحدة ثم أعيدي المحاولة.')
    }
  }

  const unlockAll = async () => {
    const audios = (Object.keys(refs) as SoundKey[])
      .map(k => refs[k].current)
      .filter((a): a is HTMLAudioElement => Boolean(a))

    try {
      audios.forEach(a => {
        a.muted = false
        a.volume = 0
        a.currentTime = 0
      })
      const plays = audios.map(a => a.play())
      await Promise.allSettled(plays)
      audios.forEach(a => {
        a.pause()
        a.currentTime = 0
        a.volume = 1
      })
      setEnabled(true)
      setStatus('✅ تم تفعيل الأصوات. اختبري الأزرار الأربعة الآن قبل الدوام.')
    } catch {
      setStatus('⚠️ تعذر تفعيل بعض الأصوات. جربي كل زر تشغيل يدويًا مرة واحدة.')
    }
  }

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      const ss = String(d.getSeconds()).padStart(2, '0')
      setClock(`${hh}:${mm}:${ss}`)
      setDateText(new Intl.DateTimeFormat('ar-OM-u-nu-latn', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }).format(d))

      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const hm = `${hh}:${mm}`
      let found: number | null = null

      if (dateKey === SPECIAL_DATE && auto) {
        EVENTS.forEach((event, index) => {
          if (event.time === hm) {
            found = index
            const fireKey = `${event.time}-${index}`
            if (!fired.current.has(fireKey)) {
              fired.current.add(fireKey)
              void playSound(event.sound, event.name)
            }
          }
        })
      }
      setActiveEvent(found)
    }

    tick()
    const id = window.setInterval(tick, 500)
    return () => window.clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, vibrate])

  useEffect(() => {
    if (readyCount === 4) setStatus('✅ تم العثور على الأصوات الأربعة وربطها من GitHub.')
  }, [readyCount])

  const stateLabel = (state: 'loading' | 'ready' | 'error') =>
    state === 'ready' ? '✅ جاهز' : state === 'error' ? '❌ تعذر التحميل' : 'تحميل…'

  return (
    <div dir="rtl" className="bellRoot">
      <style jsx global>{`
        .bellRoot{--navy3:#0a1526;--navy2:#10203c;--navy:#1b2b4b;--beige3:#fbf8f1;--beige:#f3ecdd;--beige2:#e9dfc9;--beiged:#d8c9a8;--bur:#7c1f33;--bur2:#5e1526;--green:#25765a;--red:#a52f43;min-height:100vh;background:var(--beige3);color:var(--navy);font-family:Cairo,Tahoma,Arial,sans-serif;padding-bottom:48px}
        .bellHeader{background:linear-gradient(145deg,var(--navy3),var(--navy2));color:white;padding:22px 16px}
        .bellTop,.bellMain{max-width:1080px;margin:auto}.bellTop{display:flex;justify-content:space-between;gap:14px;align-items:center;flex-wrap:wrap}
        .bellHeader h1{margin:0;font-size:25px;font-weight:900}.bellHeader p{margin:4px 0 0;color:var(--beige2);font-size:13px}.pill{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);padding:8px 13px;border-radius:999px;font-size:12px;font-weight:800}
        .bellMain{padding:18px 14px}.bellGrid{display:grid;grid-template-columns:340px 1fr;gap:17px;align-items:start}.bellCard{background:white;border:1px solid var(--beige2);border-radius:20px;padding:18px;box-shadow:0 10px 28px rgba(27,43,75,.07);margin-bottom:15px}
        .heroBell{background:linear-gradient(145deg,var(--bur2),var(--bur));color:white}.heroBell p{color:#f4dde2;line-height:1.8;margin-bottom:0}.clockBell{font-size:48px;font-weight:900;text-align:center;direction:ltr}.dateBell{text-align:center;color:#65708a;font-size:12px}.statusBell{margin-top:10px;padding:10px;border-radius:12px;background:var(--beige);font-size:12px;font-weight:800;line-height:1.7}
        .btnBell{border:0;border-radius:12px;padding:12px 13px;font:800 13px Cairo,Tahoma,sans-serif;cursor:pointer}.btnBell:active{transform:scale(.985)}.primaryBell{background:var(--bur);color:white}.beigeBell{background:var(--beige);color:var(--navy);border:1px solid var(--beiged)}.dangerBell{background:#fae7ea;color:var(--red);border:1px solid #e9c3ca}.fullBell{width:100%}
        .switchBell{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--beige);border-radius:12px;padding:10px;margin-top:9px}.noteBell{font-size:11px;line-height:1.8;color:#5d6980}.soundsBell{display:grid;grid-template-columns:1fr 1fr;gap:10px}.soundBell{border:1px solid var(--beige2);border-radius:15px;padding:13px;background:var(--beige3)}.soundBell strong,.soundBell small{display:block}.soundBell small{font-size:10px;color:#647089;overflow-wrap:anywhere}.loadBell{display:inline-block;margin-top:6px;font-size:10px;font-weight:900}.load-ready{color:var(--green)}.load-error{color:var(--red)}.load-loading{color:#6b7280}
        .eventBell{display:grid;grid-template-columns:70px 36px 1fr 155px;align-items:center;gap:8px;border:1px solid var(--beige2);border-radius:14px;padding:11px;margin-bottom:8px}.eventBell.active{border-color:var(--bur);box-shadow:0 0 0 2px rgba(124,31,51,.08)}.eventTime{direction:ltr;font-weight:900;color:var(--bur)}.eventName{font-weight:900}.eventTag{font-size:9px;text-align:center;border-radius:999px;padding:5px;background:var(--navy);color:white;font-weight:800;overflow-wrap:anywhere}.manualBell{border:2px solid rgba(124,31,51,.25)}
        @media(max-width:800px){.bellGrid{grid-template-columns:1fr}}@media(max-width:520px){.soundsBell{grid-template-columns:1fr}.eventBell{grid-template-columns:60px 30px 1fr}.eventTag{grid-column:1/-1}.clockBell{font-size:42px}}
      `}</style>

      <header className="bellHeader">
        <div className="bellTop">
          <div><h1>🔔 نظام الجرس المدرسي الذكي</h1><p>مدرسة ملتقى المعارف — الأحد 6/9/2026</p></div>
          <div className="pill">{readyCount === 4 ? '✅ 4/4 أصوات جاهزة' : `الأصوات الجاهزة: ${readyCount}/4`}</div>
        </div>
      </header>

      <main className="bellMain">
        <section className="bellCard heroBell">
          <h2 style={{marginTop:0}}>الأصوات الحقيقية مربوطة من GitHub</h2>
          <p>كل ملف مربوط باسمه الأصلي حرفيًا. اضغطي «تفعيل الأصوات الأربعة» مرة واحدة من جهاز المدرسة ثم اختبري كل صوت قبل بدء الدوام.</p>
        </section>

        <div className="bellGrid">
          <aside>
            <section className="bellCard">
              <div className="clockBell">{clock}</div>
              <div className="dateBell">{dateText}</div>
              <div className="statusBell">{status}</div>
            </section>

            <section className="bellCard">
              <h3>🎛️ التشغيل</h3>
              <button className="btnBell primaryBell fullBell" onClick={unlockAll}>🔊 تفعيل الأصوات الأربعة</button>
              <div className="switchBell"><span>⚙️ التشغيل التلقائي ليوم الأحد</span><input type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)}/></div>
              <div className="switchBell"><span>📳 الاهتزاز</span><input type="checkbox" checked={vibrate} onChange={e=>setVibrate(e.target.checked)}/></div>
              <button className="btnBell dangerBell fullBell" style={{marginTop:9}} onClick={stopAll}>⏹ إيقاف كل الأصوات</button>
              <p className="noteBell">على جهاز المدرسة اربطي الصوت بـ Bluetooth أو AUX/LINE IN، واتركي الصفحة مفتوحة والجهاز مستيقظًا.</p>
            </section>

            <section className="bellCard manualBell">
              <h3>🎬 بداية الفعاليات</h3>
              <p className="noteBell">هذا الصوت يدوي لأن الجدول المرسل لا يحدد له وقتًا مستقلًا.</p>
              <button className="btnBell primaryBell fullBell" onClick={()=>void playSound('opening')}>▶ تشغيل صوت البداية الآن</button>
            </section>
          </aside>

          <section>
            <div className="bellCard">
              <h3>🔊 اختبار كل ملف مستقل</h3>
              <div className="soundsBell">
                {(Object.keys(SOUNDS) as SoundKey[]).map(key => {
                  const m = SOUNDS[key]
                  return <div className="soundBell" key={key}>
                    <strong>{m.icon} {m.name}</strong>
                    <small>{m.file}</small>
                    <span className={`loadBell load-${ready[key]}`}>{stateLabel(ready[key])}</span>
                    <button className="btnBell beigeBell fullBell" style={{marginTop:8}} onClick={()=>void playSound(key)}>▶ تشغيل</button>
                  </div>
                })}
              </div>
            </div>

            <div className="bellCard">
              <h3>📅 جدول الأحد والأصوات المرتبطة</h3>
              {EVENTS.map((event,index)=><div key={`${event.time}-${index}`} className={`eventBell ${activeEvent===index?'active':''}`}>
                <div className="eventTime">{event.time}</div><div>{event.icon}</div><div className="eventName">{event.name}</div><div className="eventTag">{SOUNDS[event.sound].file}</div>
              </div>)}
            </div>
          </section>
        </div>

        {(Object.keys(SOUNDS) as SoundKey[]).map(key => <audio
          key={key}
          ref={refs[key]}
          preload="metadata"
          playsInline
          src={soundUrl(SOUNDS[key].file)}
          onLoadedMetadata={()=>setReady(v=>({...v,[key]:'ready'}))}
          onCanPlay={()=>setReady(v=>({...v,[key]:'ready'}))}
          onError={()=>setReady(v=>({...v,[key]:'error'}))}
        />)}
      </main>
    </div>
  )
}
