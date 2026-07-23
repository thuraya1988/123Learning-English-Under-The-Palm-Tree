import { UI_GROUPS, formatUtc } from '@/lib/satellites'
import type { SatInfo } from '@/lib/satellites'

export interface Telemetry {
  lat: number
  lon: number
  alt: number
  speed: number
  period: number
  incl: number
}

interface DetailPanelProps {
  sat: SatInfo
  telemetry: Telemetry | null
  showOrbit: boolean
  showFoot: boolean
  follow: boolean
  onToggleOrbit: () => void
  onToggleFoot: () => void
  onToggleFollow: () => void
  onClose: () => void
}

function fmtLat(lat: number): string {
  return `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`
}
function fmtLon(lon: number): string {
  return `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`
}

export default function DetailPanel({
  sat,
  telemetry,
  showOrbit,
  showFoot,
  follow,
  onToggleOrbit,
  onToggleFoot,
  onToggleFollow,
  onClose,
}: DetailPanelProps) {
  const group = UI_GROUPS[sat.group]
  const metrics: [string, string][] = telemetry
    ? [
        ['Altitude', `${telemetry.alt.toFixed(1)} km`],
        ['Speed', `${telemetry.speed.toFixed(2)} km/s`],
        ['Latitude', fmtLat(telemetry.lat)],
        ['Longitude', fmtLon(telemetry.lon)],
        ['Period', `${telemetry.period.toFixed(1)} min`],
        ['Inclination', `${telemetry.incl.toFixed(2)}°`],
      ]
    : []

  return (
    <div
      className="pointer-events-auto absolute z-20 rounded-xl border border-white/10 bg-[#0a0e14]/80 backdrop-blur-xl
        max-md:inset-x-3 max-md:bottom-[92px] max-md:max-h-[46vh] max-md:overflow-y-auto
        md:right-7 md:top-1/2 md:w-[300px] md:-translate-y-1/2"
    >
      <div className="flex items-start justify-between gap-2 px-4 pt-4">
        <div className="min-w-0">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: group?.color ?? '#9aa7bd' }}
          >
            {group?.label ?? 'Unknown'}
          </div>
          <div className="mt-1 truncate font-mono text-base font-semibold tracking-wide text-white">
            {sat.name}
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-slate-500">
            NORAD {sat.norad}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-white/10 hover:text-slate-200"
          aria-label="Close"
        >
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 stroke-current" strokeWidth="1.4">
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
      </div>

      {telemetry ? (
        <div className="mt-3 grid grid-cols-2 gap-1.5 px-4">
          {metrics.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                {k}
              </div>
              <div className="mt-0.5 font-mono text-[13px] tabular-nums text-slate-100">
                {v}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 px-4 text-xs text-slate-500">
          Propagation unavailable for this object.
        </div>
      )}

      <div className="mt-2 px-4 font-mono text-[10px] tracking-wider text-slate-600">
        TLE {sat.epochMs ? formatUtc(sat.epochMs) : 'unknown'}
      </div>

      <div className="mt-3 flex gap-1.5 px-4 pb-4">
        {(
          [
            ['Orbit', showOrbit, onToggleOrbit],
            ['Footprint', showFoot, onToggleFoot],
            ['Follow', follow, onToggleFollow],
          ] as const
        ).map(([label, val, fn]) => (
          <button
            key={label}
            onClick={fn}
            className={`flex-1 rounded-lg border px-2 py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
              val
                ? 'border-sky-400/40 bg-sky-400/15 text-sky-200'
                : 'border-white/10 text-slate-400 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
