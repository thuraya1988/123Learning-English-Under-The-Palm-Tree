/// <reference lib="webworker" />
// SGP4 propagation worker.
//
// For each request it returns TWO exact SGP4 samples (position+velocity at
// t0 and at t1). The renderer cubic-Hermite-interpolates between them in the
// vertex shader, so curved orbits stay correct even at high time-warp.
// Every message carries a generation id so stale workers are ignored.

import * as satellite from 'satellite.js'

const INV_RE = 1 / 6371 // km -> Earth radii

export type PropagatorRequest =
  | { type: 'init'; gen: number; l1: string[]; l2: string[] }
  | { type: 'propagate'; gen: number; t0: number; t1: number }

export type PropagatorResponse =
  | { type: 'ready'; gen: number; count: number }
  | {
      type: 'frame'
      gen: number
      t0: number
      t1: number
      p0: ArrayBuffer
      v0: ArrayBuffer
      p1: ArrayBuffer
      v1: ArrayBuffer
    }
  | { type: 'failure'; gen: number; stage: 'init' | 'propagate'; message: string }

let recs: (satellite.SatRec | null)[] = []
let gen = -1
// last successfully propagated positions/velocities (Earth radii)
let lastP0 = new Float32Array(0)
let lastV0 = new Float32Array(0)
let lastP1 = new Float32Array(0)
let lastV1 = new Float32Array(0)

function post(msg: PropagatorResponse, transfer?: Transferable[]) {
  ;(self as unknown as Worker).postMessage(msg, transfer ?? [])
}

function propagateAll(t0: number, t1: number) {
  const d0 = new Date(t0)
  const d1 = new Date(t1)
  const n = recs.length
  for (let i = 0; i < n; i++) {
    const rec = recs[i]
    if (!rec) continue
    const j = i * 3
    try {
      const pv = satellite.propagate(rec, d0)
      const p = pv?.position
      const v = pv?.velocity
      if (p && v && isFinite(p.x) && isFinite(p.y) && isFinite(p.z)) {
        lastP0[j] = p.x * INV_RE
        lastP0[j + 1] = p.y * INV_RE
        lastP0[j + 2] = p.z * INV_RE
        lastV0[j] = v.x * INV_RE
        lastV0[j + 1] = v.y * INV_RE
        lastV0[j + 2] = v.z * INV_RE
      }
    } catch {
      /* keep last */
    }
    try {
      const pv = satellite.propagate(rec, d1)
      const p = pv?.position
      const v = pv?.velocity
      if (p && v && isFinite(p.x) && isFinite(p.y) && isFinite(p.z)) {
        lastP1[j] = p.x * INV_RE
        lastP1[j + 1] = p.y * INV_RE
        lastP1[j + 2] = p.z * INV_RE
        lastV1[j] = v.x * INV_RE
        lastV1[j + 1] = v.y * INV_RE
        lastV1[j + 2] = v.z * INV_RE
      }
    } catch {
      /* keep last */
    }
  }
}

self.onmessage = (e: MessageEvent<PropagatorRequest>) => {
  const msg = e.data
  try {
    if (msg.type === 'init') {
      gen = msg.gen
      const n = msg.l1.length
      recs = new Array(n)
      lastP0 = new Float32Array(n * 3)
      lastV0 = new Float32Array(n * 3)
      lastP1 = new Float32Array(n * 3)
      lastV1 = new Float32Array(n * 3)
      for (let i = 0; i < n; i++) {
        try {
          recs[i] = satellite.twoline2satrec(msg.l1[i], msg.l2[i])
        } catch {
          recs[i] = null
        }
      }
      post({ type: 'ready', gen, count: n })
      return
    }

    if (msg.type === 'propagate') {
      if (msg.gen !== gen || recs.length === 0) return
      propagateAll(msg.t0, msg.t1)
      const p0 = lastP0.slice()
      const v0 = lastV0.slice()
      const p1 = lastP1.slice()
      const v1 = lastV1.slice()
      post(
        {
          type: 'frame',
          gen: msg.gen,
          t0: msg.t0,
          t1: msg.t1,
          p0: p0.buffer,
          v0: v0.buffer,
          p1: p1.buffer,
          v1: v1.buffer,
        },
        [p0.buffer, v0.buffer, p1.buffer, v1.buffer],
      )
    }
  } catch (err) {
    post({
      type: 'failure',
      gen: msg.gen,
      stage: msg.type === 'init' ? 'init' : 'propagate',
      message: err instanceof Error ? err.message : String(err),
    })
  }
}

self.onmessageerror = () => {
  post({ type: 'failure', gen, stage: 'propagate', message: 'messageerror' })
}
