import { useCallback, useEffect, useRef, useState } from 'react'
import type { GlobeEngine } from '@/lib/globe-engine'
import type { Dataset } from '@/lib/satellites'
import type { SimClock } from '@/hooks/useSimClock'
import type {
  PropagatorRequest,
  PropagatorResponse,
} from '@/workers/propagator.worker'

const INIT_TIMEOUT_MS = 12000

export interface PropagatorState {
  /** non-null when the worker is unavailable (degraded mode banner) */
  degraded: string | null
}

interface PendingFrame {
  t0: number
  t1: number
  p0: Float32Array
  v0: Float32Array
  p1: Float32Array
  v1: Float32Array
}

/**
 * Owns the SGP4 worker for the current dataset and feeds the renderer
 * two-sample Hermite intervals through a real TWO-STAGE buffer:
 *
 *  - The worker is asked for the next interval early (forward buffer), so a
 *    result often arrives BEFORE the active interval expires.
 *  - An early result is stored in `pendingRef` and is NOT activated — the
 *    shader would otherwise clamp every satellite to the future interval's
 *    first sample, causing a visible jump + freeze each cycle.
 *  - The pending interval is only activated once simulated time reaches
 *    pending.t0. A first or overdue frame is applied immediately.
 *  - While a pending interval exists, no further interval is requested.
 */
export function usePropagator(
  dataset: Dataset | null,
  engineRef: React.RefObject<GlobeEngine | null>,
  clock: SimClock,
) {
  const [degraded, setDegraded] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const genRef = useRef(0)
  const readyRef = useRef(false)
  const inFlightRef = useRef(false)
  /** interval currently displayed (ms), null before first frame */
  const activeT0Ref = useRef<number | null>(null)
  const activeT1Ref = useRef<number | null>(null)
  const playingRef = useRef(clock.playing)
  playingRef.current = clock.playing
  /** early future frame, not yet activated */
  const pendingRef = useRef<PendingFrame | null>(null)
  const firstFrameRef = useRef(false)
  const deadMarkedRef = useRef(false)
  const initTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const speedRef = useRef(clock.speed)
  speedRef.current = clock.speed

  /** Interval length in simulated seconds, scaled to |time warp|. */
  const intervalFor = useCallback((absSpeed: number) => {
    return Math.min(Math.max(absSpeed * 1.5, 2), 240)
  }, [])

  const requestInterval = useCallback((t0: number, t1: number) => {
    const w = workerRef.current
    if (!w || inFlightRef.current) return
    inFlightRef.current = true
    const msg: PropagatorRequest = { type: 'propagate', gen: genRef.current, t0, t1 }
    w.postMessage(msg)
  }, [])

  /** Activate an interval now: upload buffers + reveal replacement groups. */
  const activate = useCallback(
    (frame: PendingFrame) => {
      engineRef.current?.updateInterval(
        frame.t0,
        frame.t1,
        frame.p0,
        frame.v0,
        frame.p1,
        frame.v1,
      )
      activeT0Ref.current = frame.t0
      activeT1Ref.current = frame.t1
      if (!firstFrameRef.current) {
        firstFrameRef.current = true
        // first valid interval of this generation: swap in replacement groups
        engineRef.current?.revealReplacement()
        const { p0, p1 } = frame
        const dead: number[] = []
        for (let i = 0; i < p0.length; i += 3) {
          const deadAt0 = p0[i] === 0 && p0[i + 1] === 0 && p0[i + 2] === 0
          const deadAt1 = p1[i] === 0 && p1[i + 1] === 0 && p1[i + 2] === 0
          if (deadAt0 && deadAt1) dead.push(i / 3)
        }
        if (dead.length) engineRef.current?.markDead(dead)
      }
    },
    [engineRef],
  )

  // worker lifecycle, one per dataset generation
  useEffect(() => {
    if (!dataset) return
    const gen = ++genRef.current
    readyRef.current = false
    inFlightRef.current = false
    activeT0Ref.current = null
    activeT1Ref.current = null
    pendingRef.current = null
    firstFrameRef.current = false
    deadMarkedRef.current = false

    const worker = new Worker(
      new URL('../workers/propagator.worker.ts', import.meta.url),
      { type: 'module' },
    )
    workerRef.current = worker

    const fail = (message: string) => {
      if (genRef.current !== gen) return
      inFlightRef.current = false
      readyRef.current = false
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
      setDegraded(message)
    }

    initTimerRef.current = setTimeout(
      () => fail('Propagation worker did not initialize in time'),
      INIT_TIMEOUT_MS,
    )

    worker.onmessage = (e: MessageEvent<PropagatorResponse>) => {
      const msg = e.data
      if (msg.gen !== gen || genRef.current !== gen) return // stale worker
      if (msg.type === 'ready') {
        if (initTimerRef.current) clearTimeout(initTimerRef.current)
        readyRef.current = true
        setDegraded(null)
        // request the first frame immediately, in the direction of travel
        const now = clock.getTime()
        const dur = intervalFor(Math.abs(speedRef.current)) * 1000
        if (speedRef.current < 0) requestInterval(now - dur, now)
        else requestInterval(now, now + dur)
        return
      }
      if (msg.type === 'frame') {
        inFlightRef.current = false
        const frame: PendingFrame = {
          t0: msg.t0,
          t1: msg.t1,
          p0: new Float32Array(msg.p0),
          v0: new Float32Array(msg.v0),
          p1: new Float32Array(msg.p1),
          v1: new Float32Array(msg.v1),
        }
        const now = clock.getTime()
        const dir = speedRef.current < 0 ? -1 : 1
        const due =
          activeT1Ref.current === null ||
          (dir > 0 ? now >= frame.t0 : now <= frame.t1)
        if (due) {
          // first frame, or one that is already due: apply immediately
          activate(frame)
        } else {
          // early future frame: park it until its time comes
          pendingRef.current = frame
        }
        return
      }
      if (msg.type === 'failure') {
        fail(msg.message)
      }
    }
    worker.onerror = (e) => fail(e.message || 'worker error')
    worker.onmessageerror = () => fail('worker messageerror')

    const initMsg: PropagatorRequest = {
      type: 'init',
      gen,
      l1: dataset.sats.map((s) => s.l1),
      l2: dataset.sats.map((s) => s.l2),
    }
    worker.postMessage(initMsg)

    return () => {
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
      worker.terminate()
      if (workerRef.current === worker) workerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset])

  // scheduler: activate pending intervals on time, keep the forward buffer full
  useEffect(() => {
    const id = setInterval(() => {
      if (!readyRef.current || !playingRef.current) return
      const now = clock.getTime()
      const dir = speedRef.current < 0 ? -1 : 1

      // activate the pending interval once simulated time reaches its start
      const pending = pendingRef.current
      if (pending) {
        const due = dir > 0 ? now >= pending.t0 : now <= pending.t1
        if (due) {
          pendingRef.current = null
          activate(pending)
        } else {
          return // a pending interval exists: do not request another one
        }
      }

      if (inFlightRef.current) return
      const durMs = intervalFor(Math.abs(speedRef.current)) * 1000
      const leadMs = Math.max(durMs * 0.35, Math.abs(speedRef.current) * 600)
      if (dir > 0) {
        const activeT1 = activeT1Ref.current
        if (activeT1 === null || now > activeT1 - leadMs) {
          // chain intervals when possible so motion is seamless
          const t0 = activeT1 !== null && now <= activeT1 ? activeT1 : now
          requestInterval(t0, t0 + durMs)
        }
      } else {
        const activeT0 = activeT0Ref.current
        if (activeT0 === null || now < activeT0 + leadMs) {
          const t1 = activeT0 !== null && now >= activeT0 ? activeT0 : now
          requestInterval(t1 - durMs, t1)
        }
      }
    }, 120)
    return () => clearInterval(id)
  }, [clock, intervalFor, requestInterval, activate])

  // Note: a still-valid interval is deliberately NOT restarted when playback
  // speed changes — only the duration of future intervals adapts.

  return { degraded } satisfies PropagatorState
}
