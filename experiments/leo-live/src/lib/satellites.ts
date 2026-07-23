// Satellite data model: TLE parsing, validation, classification, grouping.
//
// The catalog is merged from five CelesTrak feeds:
//   active                -> classified by name into stations/gps/.../other
//   visual                -> "Brightest" layer (overrides the active class)
//   cosmos-2251-debris    -> Debris · Cosmos-2251
//   iridium-33-debris     -> Debris · Iridium-33
//   fengyun-1c-debris     -> Debris · Fengyun-1C
// Every object appears in exactly one layer; layer counts sum to the total.

export interface SatInfo {
  name: string
  norad: number
  l1: string
  l2: string
  /** UI group index (see UI_GROUPS). */
  group: number
  /** TLE epoch as ms since Unix epoch. */
  epochMs: number
}

export interface UiGroupDef {
  key: string
  label: string
  color: string
  size: number
}

/** UI layers, in render order. Counts are computed from the loaded data. */
export const UI_GROUPS: UiGroupDef[] = [
  { key: 'stations', label: 'Space Stations', color: '#ffd166', size: 2.6 },
  { key: 'gps', label: 'GPS', color: '#4ade80', size: 1.5 },
  { key: 'glonass', label: 'GLONASS', color: '#a3e635', size: 1.5 },
  { key: 'galileo', label: 'Galileo', color: '#2dd4bf', size: 1.5 },
  { key: 'weather', label: 'Weather', color: '#f472b6', size: 1.5 },
  { key: 'oneweb', label: 'OneWeb', color: '#a78bfa', size: 1.35 },
  { key: 'starlink', label: 'Starlink', color: '#38bdf8', size: 1.15 },
  { key: 'brightest', label: 'Brightest', color: '#e8eef7', size: 1.7 },
  { key: 'debris-cosmos', label: 'Debris · Cosmos-2251', color: '#fb7185', size: 1.0 },
  { key: 'debris-iridium', label: 'Debris · Iridium-33', color: '#fb923c', size: 1.0 },
  { key: 'debris-fengyun', label: 'Debris · Fengyun-1C', color: '#ef4444', size: 1.0 },
  { key: 'other', label: 'Other Active', color: '#9aa7bd', size: 1.0 },
]

const G = {
  Stations: 0,
  Gps: 1,
  Glonass: 2,
  Galileo: 3,
  Weather: 4,
  OneWeb: 5,
  Starlink: 6,
  Brightest: 7,
  DebrisCosmos: 8,
  DebrisIridium: 9,
  DebrisFengyun: 10,
  Other: 11,
} as const

const WEATHER_PREFIXES = [
  'NOAA', 'GOES', 'METEOSAT', 'METOP', 'FENGYUN', 'FY-', 'HIMAWARI',
  'ELECTRO-L', 'DMSP', 'GOMS', 'INSAT', 'KALPANA', 'GEO-KOMPSAT', 'ARSAT',
]

/** Classify an active-catalog name into a UI group index. */
function classifyActive(nameRaw: string): number {
  const n = nameRaw.trim().toUpperCase()
  if (
    n.includes('ISS') || n.includes('ZARYA') || n.includes('TIANGONG') ||
    n.startsWith('CSS') || n.includes('TIANHE') || n.includes('WENTIAN') ||
    n.includes('MENGTIAN')
  ) {
    return G.Stations
  }
  if (n.startsWith('GPS ') || n.startsWith('NAVSTAR')) return G.Gps
  if (n.includes('GLONASS')) return G.Glonass
  if (n.includes('GALILEO') || n.startsWith('GSAT')) return G.Galileo
  if (n.startsWith('STARLINK')) return G.Starlink
  if (n.startsWith('ONEWEB')) return G.OneWeb
  for (const p of WEATHER_PREFIXES) if (n.startsWith(p)) return G.Weather
  return G.Other // includes BeiDou, Iridium, everything else
}

/** Parse the TLE epoch (line 1 columns 19-32: YYDDD.DDDDDDDD) to ms. */
export function tleEpochMs(l1: string): number {
  const yy = parseInt(l1.substring(18, 20), 10)
  const day = parseFloat(l1.substring(20, 32))
  if (!isFinite(yy) || !isFinite(day)) return 0
  const year = yy < 57 ? 2000 + yy : 1900 + yy
  return Date.UTC(year, 0, 1) + (day - 1) * 86400000
}

interface RawSat {
  name: string
  norad: number
  l1: string
  l2: string
  epochMs: number
}

function parse3le(text: string): RawSat[] {
  const lines = text.split(/\r?\n/)
  const out: RawSat[] = []
  let name = ''
  let l1 = ''
  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.startsWith('1 ') && line.length >= 60) {
      l1 = line
    } else if (line.startsWith('2 ') && line.length >= 60 && l1) {
      const norad = parseInt(l1.substring(2, 7), 10)
      if (isFinite(norad)) {
        out.push({
          name: (name.trim() || `NORAD ${norad}`).replace(/\s+/g, ' '),
          norad,
          l1,
          l2: line,
          epochMs: tleEpochMs(l1),
        })
      }
      name = ''
      l1 = ''
    } else if (line.length > 0 && !line.startsWith('#')) {
      name = line
      l1 = ''
    }
  }
  return out
}

/** Texts of the five feeds; supplementals may be null if unavailable. */
export interface FeedTexts {
  active: string
  visual: string | null
  cosmos2251: string | null
  iridium33: string | null
  fengyun1c: string | null
}

/**
 * Merge all feeds into validated, NORAD-deduplicated, group-sorted records.
 * Precedence: debris clouds first, then classified active objects, then the
 * visual feed overrides matched objects into the Brightest layer.
 */
export function mergeFeeds(feeds: FeedTexts): SatInfo[] {
  const byNorad = new Map<number, SatInfo>()

  const add = (r: RawSat, group: number, override: boolean) => {
    if (!override && byNorad.has(r.norad)) return
    byNorad.set(r.norad, { ...r, group })
  }

  for (const [text, group] of [
    [feeds.cosmos2251, G.DebrisCosmos],
    [feeds.iridium33, G.DebrisIridium],
    [feeds.fengyun1c, G.DebrisFengyun],
  ] as const) {
    if (!text) continue
    for (const r of parse3le(text)) add(r, group, false)
  }

  for (const r of parse3le(feeds.active)) add(r, classifyActive(r.name), false)

  if (feeds.visual) {
    for (const r of parse3le(feeds.visual)) add(r, G.Brightest, true)
  }

  const sats = [...byNorad.values()]
  sats.sort((a, b) => a.group - b.group)
  return sats
}

/** The active feed must parse to at least this many objects to be accepted. */
export const MIN_VALID_SATS = 1000

export function isValidTleText(text: string): boolean {
  if (!text || text.length < 1000) return false
  const l1 = text.indexOf('\n1 ')
  const l2 = text.indexOf('\n2 ')
  return (text.startsWith('1 ') || l1 >= 0) && l2 >= 0
}

export type DataSource = 'live' | 'cached' | 'snapshot'

export interface Dataset {
  sats: SatInfo[]
  counts: number[]
  /** median TLE epoch in the set (ms) */
  epochMs: number
  source: DataSource
  /** when the data was fetched from the network (ms) */
  fetchedAt: number
  /** total deduplicated objects */
  total: number
}

export function buildDataset(
  sats: SatInfo[],
  source: DataSource,
  fetchedAt: number,
): Dataset {
  const counts = new Array(UI_GROUPS.length).fill(0)
  const epochs: number[] = []
  for (const s of sats) {
    counts[s.group]++
    if (s.epochMs > 0) epochs.push(s.epochMs)
  }
  // median epoch is robust against a few future-dated or stale TLEs
  epochs.sort((a, b) => a - b)
  const epoch = epochs.length ? epochs[Math.floor(epochs.length / 2)] : 0
  return { sats, counts, epochMs: epoch, source, fetchedAt, total: sats.length }
}

/** "3h 12m" / "2d 4h" style age string from the median TLE epoch. */
export function tleAge(epochMs: number, nowMs: number): string {
  if (!epochMs) return 'unknown'
  const mins = Math.max(0, Math.round((nowMs - epochMs) / 60000))
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  if (h < 48) return `${h}h ${mins % 60}m`
  return `${Math.floor(h / 24)}d ${h % 24}h`
}

export function formatUtc(ms: number): string {
  const d = new Date(ms)
  const p = (v: number) => String(v).padStart(2, '0')
  return (
    `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
    `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`
  )
}

/** Short clock helpers for the HUD clock card. */
export function formatClockTime(ms: number): string {
  const d = new Date(ms)
  const p = (v: number) => String(v).padStart(2, '0')
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`
}

export function formatClockDate(ms: number): string {
  const d = new Date(ms)
  const p = (v: number) => String(v).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} UTC`
}
