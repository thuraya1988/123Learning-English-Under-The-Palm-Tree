import { useEffect, useState } from 'react'
import type { SimClock } from '@/hooks/useSimClock'
import { formatClockDate, formatClockTime } from '@/lib/satellites'

interface ClockCardProps {
  clock: SimClock
}

export default function ClockCard({ clock }: ClockCardProps) {
  const [tick, setTick] = useState({ sim: 0, wall: 0 })

  useEffect(() => {
    const id = setInterval(() => setTick({ sim: clock.getTime(), wall: Date.now() }), 200)
    return () => clearInterval(id)
  }, [clock])

  const now = tick.sim
  const live =
    clock.playing && clock.speed === 1 && now > 0 && Math.abs(now - tick.wall) < 2500

  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a0e14]/70 px-2.5 py-2 backdrop-blur-xl md:gap-4 md:px-5 md:py-2.5">
      <div className="font-mono text-base font-medium tabular-nums tracking-wider text-slate-100 md:text-2xl">
        {now > 0 ? formatClockTime(now) : '--:--:--'}
      </div>
      <div className="text-right">
        <div className="font-mono text-[9px] tracking-wider text-slate-400 md:text-[11px]">
          {now > 0 ? formatClockDate(now) : ''}
        </div>
        {!clock.playing ? (
          <div className="mt-0.5 flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wider text-slate-400">
            <svg viewBox="0 0 10 10" className="h-2 w-2 fill-current">
              <rect x="1" y="1" width="3" height="8" />
              <rect x="6" y="1" width="3" height="8" />
            </svg>
            PAUSED
          </div>
        ) : live ? (
          <div className="mt-0.5 flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wider text-emerald-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            LIVE
          </div>
        ) : (
          <div className="mt-0.5 flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wider text-amber-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            {clock.speed > 0 ? '+' : ''}
            {clock.speed}× TIME
          </div>
        )}
      </div>
    </div>
  )
}
