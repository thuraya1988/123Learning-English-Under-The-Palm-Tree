import { useCallback, useMemo, useRef, useState } from 'react'

export interface SimClock {
  /** Authoritative simulated time (ms epoch), computed from anchors. */
  getTime: () => number
  speed: number
  playing: boolean
  setSpeed: (s: number) => void
  pause: () => void
  resume: () => void
  /** Restore current UTC, 1x speed, playing state. */
  goNow: () => void
}

/**
 * Anchor-based simulation clock:
 *   simTime = simAnchor + (performance.now() - wallAnchor) * speed
 * Immune to setInterval throttling in background tabs — the authoritative
 * time is always derived, never accumulated.
 */
export function useSimClock(): SimClock {
  const simAnchor = useRef(0)
  const wallAnchor = useRef(0)
  const inited = useRef(false)
  const speedRef = useRef(1)
  const playingRef = useRef(true)
  const [speed, setSpeedState] = useState(1)
  const [playing, setPlaying] = useState(true)

  // lazy init: keeps render pure (no impure calls during render)
  const ensure = useCallback(() => {
    if (!inited.current) {
      simAnchor.current = Date.now()
      wallAnchor.current = performance.now()
      inited.current = true
    }
  }, [])

  const getTime = useCallback(() => {
    ensure()
    if (!playingRef.current) return simAnchor.current
    return (
      simAnchor.current +
      (performance.now() - wallAnchor.current) * speedRef.current
    )
  }, [ensure])

  // Re-anchor before any speed change so there is no time jump.
  const reanchor = useCallback(() => {
    simAnchor.current = getTime()
    wallAnchor.current = performance.now()
  }, [getTime])

  const setSpeed = useCallback(
    (s: number) => {
      reanchor()
      speedRef.current = s
      setSpeedState(s)
      if (!playingRef.current) {
        playingRef.current = true
        setPlaying(true)
      }
    },
    [reanchor],
  )

  const pause = useCallback(() => {
    if (!playingRef.current) return
    simAnchor.current = getTime() // freeze exact current sim time
    wallAnchor.current = performance.now()
    playingRef.current = false
    setPlaying(false)
  }, [getTime])

  const resume = useCallback(() => {
    if (playingRef.current) return
    ensure()
    wallAnchor.current = performance.now() // continue from frozen time
    playingRef.current = true
    setPlaying(true)
  }, [ensure])

  const goNow = useCallback(() => {
    simAnchor.current = Date.now()
    wallAnchor.current = performance.now()
    inited.current = true
    speedRef.current = 1
    playingRef.current = true
    setSpeedState(1)
    setPlaying(true)
  }, [])

  // stable identity so consumers don't re-subscribe every render
  return useMemo(
    () => ({ getTime, speed, playing, setSpeed, pause, resume, goNow }),
    [getTime, speed, playing, setSpeed, pause, resume, goNow],
  )
}
