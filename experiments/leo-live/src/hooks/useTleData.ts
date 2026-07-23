import { useCallback, useEffect, useRef, useState } from 'react'
import {
  buildDataset,
  isValidTleText,
  MIN_VALID_SATS,
  mergeFeeds,
} from '@/lib/satellites'
import type { Dataset, FeedTexts } from '@/lib/satellites'
import { cacheGet, cacheSet } from '@/lib/tle-cache'

const CELESTRAK = 'https://celestrak.org/NORAD/elements/gp.php'
const SNAP = `${import.meta.env.BASE_URL}data`

interface FeedDef {
  key: keyof FeedTexts
  liveUrl: string
  snapUrl: string
  required: boolean
}

const FEEDS: FeedDef[] = [
  {
    key: 'active',
    liveUrl: `${CELESTRAK}?GROUP=active&FORMAT=tle`,
    snapUrl: `${SNAP}/tle-snapshot.txt`,
    required: true,
  },
  {
    key: 'visual',
    liveUrl: `${CELESTRAK}?GROUP=visual&FORMAT=tle`,
    snapUrl: `${SNAP}/tle-visual.txt`,
    required: false,
  },
  {
    key: 'cosmos2251',
    liveUrl: `${CELESTRAK}?GROUP=cosmos-2251-debris&FORMAT=tle`,
    snapUrl: `${SNAP}/tle-cosmos-2251-debris.txt`,
    required: false,
  },
  {
    key: 'iridium33',
    liveUrl: `${CELESTRAK}?GROUP=iridium-33-debris&FORMAT=tle`,
    snapUrl: `${SNAP}/tle-iridium-33-debris.txt`,
    required: false,
  },
  {
    key: 'fengyun1c',
    liveUrl: `${CELESTRAK}?GROUP=fengyun-1c-debris&FORMAT=tle`,
    snapUrl: `${SNAP}/tle-fengyun-1c-debris.txt`,
    required: false,
  },
]

export const TLE_TTL_MS = 2 * 3600 * 1000
const CACHE_KEY = 'bundle-v2'

export interface TleDataState {
  /** 'loading' only until the first usable dataset exists. */
  status: 'loading' | 'ready' | 'error'
  dataset: Dataset | null
  error: string | null
}

async function fetchText(url: string, timeoutMs: number): Promise<string> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(t)
  }
}

function validate(feeds: FeedTexts) {
  if (!isValidTleText(feeds.active)) throw new Error('invalid TLE structure')
  const sats = mergeFeeds(feeds)
  const activeCount = sats.filter((s) => s.group !== 8 && s.group !== 9 && s.group !== 10).length
  if (activeCount < MIN_VALID_SATS) {
    throw new Error(`too few satellites (${activeCount})`)
  }
  return sats
}

/**
 * Data pipeline:
 *  1. bundled snapshots (5 feeds in parallel) -> immediate first render
 *  2. IndexedDB cache (fresh < 2h) -> upgrade to CACHED
 *  3. CelesTrak live fetch in background -> upgrade to LIVE + re-cache
 * Generation ids ignore stale responses; the old dataset stays active until
 * a complete validated replacement is ready.
 */
export function useTleData() {
  const [state, setState] = useState<TleDataState>({
    status: 'loading',
    dataset: null,
    error: null,
  })
  const genRef = useRef(0)
  const busyRef = useRef(false)
  const snapTextsRef = useRef<FeedTexts | null>(null)
  const invalidate = useCallback(() => {
    genRef.current += 1
  }, [])

  const apply = useCallback(
    (feeds: FeedTexts, source: Dataset['source'], fetchedAt: number) => {
      const sats = validate(feeds)
      setState({
        status: 'ready',
        dataset: buildDataset(sats, source, fetchedAt),
        error: null,
      })
    },
    [],
  )

  const loadSnapshots = useCallback(async (): Promise<FeedTexts> => {
    if (snapTextsRef.current) return snapTextsRef.current
    const texts = await Promise.all(
      FEEDS.map(async (f) => {
        try {
          return await fetchText(f.snapUrl, 30000)
        } catch (err) {
          if (f.required) throw err
          return null
        }
      }),
    )
    const feeds = Object.fromEntries(
      FEEDS.map((f, i) => [f.key, texts[i]]),
    ) as unknown as FeedTexts
    snapTextsRef.current = feeds
    return feeds
  }, [])

  /** Background live refresh; never disturbs the UI on failure. */
  const refreshLive = useCallback(async () => {
    if (busyRef.current) return
    busyRef.current = true
    const myGen = genRef.current
    try {
      const results = await Promise.allSettled(
        FEEDS.map((f) => fetchText(f.liveUrl, 20000)),
      )
      if (genRef.current !== myGen) return
      const base = snapTextsRef.current ?? (await loadSnapshots())
      const feeds = { ...base }
      let liveCount = 0
      results.forEach((r, i) => {
        if (r.status === 'fulfilled' && isValidTleText(r.value)) {
          feeds[FEEDS[i].key] = r.value
          liveCount++
        }
      })
      const activeLive = results[0].status === 'fulfilled'
      if (!activeLive) return // keep current dataset silently
      const fetchedAt = Date.now()
      apply(feeds, 'live', fetchedAt)
      if (liveCount === FEEDS.length) {
        void cacheSet({ key: CACHE_KEY, texts: feeds, fetchedAt })
      }
    } catch {
      /* 403 / timeout / offline: keep current dataset */
    } finally {
      busyRef.current = false
    }
  }, [apply, loadSnapshots])

  const initialLoad = useCallback(async () => {
    const gen = ++genRef.current
    const isStale = () => genRef.current !== gen

    // 1. snapshots first — the globe must appear within ~2 seconds
    try {
      const feeds = await loadSnapshots()
      if (isStale()) return
      apply(feeds, 'snapshot', Date.now())
    } catch (err) {
      if (isStale()) return
      setState({
        status: 'error',
        dataset: null,
        error: err instanceof Error ? err.message : String(err),
      })
      // continue anyway: live fetch below may still succeed
    }

    // 2. fresh cache from a previous session -> CACHED
    try {
      const cached = await cacheGet(CACHE_KEY)
      if (cached && Date.now() - cached.fetchedAt < TLE_TTL_MS) {
        if (isStale()) return
        apply(cached.texts, 'cached', cached.fetchedAt)
      }
    } catch {
      /* invalid cache — ignore */
    }

    // 3. live fetch in background
    void refreshLive()
  }, [apply, loadSnapshots, refreshLive])

  useEffect(() => {
    void initialLoad()
    const id = setInterval(() => void refreshLive(), TLE_TTL_MS)
    return () => {
      invalidate() // ignore in-flight responses after unmount
      clearInterval(id)
    }
  }, [initialLoad, refreshLive, invalidate])

  return state
}
