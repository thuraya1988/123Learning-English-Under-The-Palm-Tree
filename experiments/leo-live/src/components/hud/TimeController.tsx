import type { SimClock } from '@/hooks/useSimClock'

const SPEEDS = [-240, -60, -10, 10, 60, 240]

interface TimeControllerProps {
  clock: SimClock
}

export default function TimeController({ clock }: TimeControllerProps) {
  const live = clock.playing && clock.speed === 1
  return (
    <div className="pointer-events-auto flex items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-[#0a0e14]/75 p-1.5 backdrop-blur-xl">
      {SPEEDS.map((s) => {
        const active = clock.playing && clock.speed === s
        return (
          <button
            key={s}
            onClick={() => clock.setSpeed(s)}
            className={`min-w-[44px] rounded-full px-2 py-2 font-mono text-[11px] tabular-nums transition-colors md:py-1.5 ${
              active
                ? 'bg-sky-400/25 text-sky-200'
                : 'text-slate-400 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            {s > 0 ? `+${s}×` : `${s}×`}
          </button>
        )
      })}
      <button
        onClick={() => (clock.playing ? clock.pause() : clock.resume())}
        title={clock.playing ? 'Pause' : 'Resume'}
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-300 hover:bg-white/10"
      >
        {clock.playing ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
            <rect x="1.5" y="1" width="3.2" height="10" rx="0.6" />
            <rect x="7.3" y="1" width="3.2" height="10" rx="0.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
            <path d="M3 1.4v9.2c0 .8.9 1.3 1.6.9l7-4.6c.6-.4.6-1.4 0-1.8l-7-4.6c-.7-.4-1.6.1-1.6.9z" />
          </svg>
        )}
      </button>
      <button
        onClick={() => clock.goNow()}
        className={`ml-1 flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] tracking-wider transition-colors md:py-1.5 ${
          live
            ? 'bg-emerald-400 text-emerald-950'
            : 'border border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10'
        }`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            live ? 'bg-emerald-900' : 'bg-emerald-400'
          }`}
        />
        LIVE
      </button>
    </div>
  )
}
