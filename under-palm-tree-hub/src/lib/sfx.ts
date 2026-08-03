import { useCallback, useRef } from 'react';
import { useGameStore } from './store';

export type SfxName =
  | 'click'
  | 'hover'
  | 'success'
  | 'error'
  | 'splash'
  | 'wind'
  | 'magic'
  | 'star';

let ctx: AudioContext | null = null;
function getCtx(): AudioContext {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(
  ac: AudioContext,
  opts: {
    freq: number;
    time?: number;
    dur?: number;
    type?: OscillatorType;
    gain?: number;
    slideTo?: number;
  },
) {
  const { freq, time = 0, dur = 0.15, type = 'sine', gain = 0.18, slideTo } =
    opts;
  const t0 = ac.currentTime + time;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noise(
  ac: AudioContext,
  opts: {
    time?: number;
    dur?: number;
    gain?: number;
    freq?: number;
    q?: number;
    slideTo?: number;
  },
) {
  const { time = 0, dur = 0.3, gain = 0.12, freq = 1200, q = 1, slideTo } =
    opts;
  const t0 = ac.currentTime + time;
  const len = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(freq, t0);
  if (slideTo) filter.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  filter.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t0);
}

const RECIPES: Record<SfxName, (ac: AudioContext) => void> = {
  click: (ac) => tone(ac, { freq: 660, type: 'triangle', dur: 0.08 }),
  hover: (ac) => tone(ac, { freq: 880, type: 'sine', dur: 0.04, gain: 0.06 }),
  success: (ac) => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone(ac, { freq: f, time: i * 0.09, type: 'triangle', dur: 0.22 }),
    );
  },
  error: (ac) =>
    tone(ac, { freq: 220, slideTo: 160, type: 'sine', dur: 0.25, gain: 0.14 }),
  splash: (ac) =>
    noise(ac, { dur: 0.35, freq: 900, slideTo: 300, gain: 0.15, q: 0.8 }),
  wind: (ac) =>
    noise(ac, { dur: 0.8, freq: 400, slideTo: 1400, gain: 0.08, q: 0.6 }),
  magic: (ac) => {
    [1046.5, 1318.5, 1568, 2093].forEach((f, i) =>
      tone(ac, { freq: f, time: i * 0.06, dur: 0.3, gain: 0.1 }),
    );
    noise(ac, { dur: 0.5, freq: 4000, gain: 0.03, q: 2 });
  },
  star: (ac) => {
    tone(ac, { freq: 1568, dur: 0.18, gain: 0.12 });
    tone(ac, { freq: 2093, time: 0.08, dur: 0.25, gain: 0.1 });
  },
};

/** WebAudio-synthesized SFX hook. Respects persisted mute from the store. */
export function useSfx() {
  const muted = useGameStore((s) => s.muted);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const lastHover = useRef(0);

  const play = useCallback(
    (name: SfxName) => {
      if (muted) return;
      if (name === 'hover') {
        const now = performance.now();
        if (now - lastHover.current < 60) return;
        lastHover.current = now;
      }
      try {
        RECIPES[name](getCtx());
      } catch {
        /* audio not available */
      }
    },
    [muted],
  );

  return { play, muted, toggleMute };
}
