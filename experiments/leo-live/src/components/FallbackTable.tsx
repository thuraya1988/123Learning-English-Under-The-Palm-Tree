import { useEffect, useState } from 'react'
import * as satellite from 'satellite.js'
import type { Dataset } from '@/lib/satellites'
import { UI_GROUPS, formatUtc } from '@/lib/satellites'

interface Row {
  name: string
  norad: number
  lat: string
  lon: string
  alt: string
}

/** Static, non-WebGL fallback: group counts + live station table. */
export default function FallbackTable({ dataset }: { dataset: Dataset | null }) {
  const [rows, setRows] = useState<Row[]>([])
  const [nowMs, setNowMs] = useState(0)

  useEffect(() => {
    if (!dataset) return
    const stations = dataset.sats.filter((s) => s.group === 0)
    const recs = stations
      .map((s) => {
        try {
          return { s, rec: satellite.twoline2satrec(s.l1, s.l2) }
        } catch {
          return null
        }
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)

    const update = () => {
      const now = new Date()
      const gmst = satellite.gstime(now)
      const out: Row[] = []
      for (const { s, rec } of recs) {
        try {
          const pv = satellite.propagate(rec, now)
          const p = pv?.position
          if (!p || !isFinite(p.x)) continue
          const geo = satellite.eciToGeodetic(p, gmst)
          out.push({
            name: s.name,
            norad: s.norad,
            lat: `${satellite.degreesLat(geo.latitude).toFixed(2)}°`,
            lon: `${satellite.degreesLong(geo.longitude).toFixed(2)}°`,
            alt: `${geo.height.toFixed(0)} km`,
          })
        } catch {
          /* skip */
        }
      }
      setRows(out)
      setNowMs(Date.now())
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [dataset])

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 text-slate-200">
      <h1 className="font-mono text-xl font-semibold tracking-[0.34em]"><span className="logo-o">O</span>RBIT VEIL</h1>
      <p className="mt-1 text-xs text-slate-400">
        Real-time orbital satellite visualization · CelesTrak TLE × SGP4 propagation
      </p>
      <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-xs text-amber-200">
        WebGL is unavailable in this browser, so the interactive 3D globe cannot
        be shown. Below is a static summary computed from the same TLE data.
      </div>
      {dataset && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {UI_GROUPS.map((g, i) => (
              <div key={g.key} className="rounded-lg border border-white/10 px-3 py-2">
                <div className="text-[11px] text-slate-500">{g.label}</div>
                <div className="text-lg tabular-nums text-slate-100">
                  {(dataset.counts[i] ?? 0).toLocaleString()}
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-white/10 px-3 py-2">
              <div className="text-[11px] text-slate-500">Total objects</div>
              <div className="text-lg tabular-nums text-slate-100">
                {dataset.total.toLocaleString()}
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-sm font-semibold text-slate-300">
            Space stations — live position{nowMs > 0 ? ` (${formatUtc(nowMs)})` : ''}
          </h2>
          <table className="mt-2 w-full text-xs">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-500">
                <th className="py-1.5 pr-4 font-medium">Name</th>
                <th className="py-1.5 pr-4 font-medium">NORAD</th>
                <th className="py-1.5 pr-4 font-medium">Lat</th>
                <th className="py-1.5 pr-4 font-medium">Lon</th>
                <th className="py-1.5 font-medium">Alt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.norad} className="border-b border-white/5">
                  <td className="py-1.5 pr-4">{r.name}</td>
                  <td className="py-1.5 pr-4 tabular-nums text-slate-400">#{r.norad}</td>
                  <td className="py-1.5 pr-4 tabular-nums">{r.lat}</td>
                  <td className="py-1.5 pr-4 tabular-nums">{r.lon}</td>
                  <td className="py-1.5 tabular-nums">{r.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
