// Tiny rAF tween engine replacing GSAP for this gallery (offline-safe).

export type EaseName =
  | 'power2.in'
  | 'power2.out'
  | 'power2.inOut'
  | 'back.out'
  | 'elastic.out'
  | 'linear';

const easings: Record<EaseName, (t: number) => number> = {
  linear: (t) => t,
  'power2.in': (t) => t * t,
  'power2.out': (t) => 1 - (1 - t) * (1 - t),
  'power2.inOut': (t) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)),
  'back.out': (t) => {
    const c = 1.70158;
    const u = t - 1;
    return 1 + (c + 1) * u * u * u + c * u * u;
  },
  'elastic.out': (t) => {
    if (t === 0 || t === 1) return t;
    const c4 = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

export interface TweenOptions {
  duration?: number; // seconds
  ease?: EaseName;
  delay?: number; // seconds
  yoyo?: boolean;
  repeat?: number; // number of extra repeats (0 = play once)
  onComplete?: () => void;
}

/** Animate numeric properties of an object. Returns a cancel function. */
export function tweenTo(
  target: object,
  props: Record<string, number>,
  options: TweenOptions = {},
): () => void {
  const tgt = target as Record<string, number>;
  const duration = (options.duration ?? 0.8) * 1000;
  const delay = (options.delay ?? 0) * 1000;
  const ease = easings[options.ease ?? 'power2.out'];
  const repeats = options.repeat ?? 0;
  const yoyo = options.yoyo ?? false;

  const keys = Object.keys(props);
  const from: Record<string, number> = {};
  keys.forEach((k) => {
    from[k] = tgt[k];
  });

  let raf = 0;
  let cancelled = false;
  const start = performance.now() + delay;

  const tick = (now: number) => {
    if (cancelled) return;
    if (now < start) {
      raf = requestAnimationFrame(tick);
      return;
    }
    const elapsed = now - start;
    const cycle = Math.floor(elapsed / duration);
    let t = Math.min((elapsed % duration) / duration, 1);
    const isLastCycle = cycle >= repeats;
    if (isLastCycle) t = 1;

    let progress = ease(t);
    if (yoyo && cycle % 2 === 1) progress = 1 - progress;

    keys.forEach((k) => {
      tgt[k] = from[k] + (props[k] - from[k]) * progress;
    });

    if (isLastCycle && elapsed >= duration * (repeats + 1)) {
      // Ensure final value: yoyo returns to start, otherwise end value.
      keys.forEach((k) => {
        tgt[k] = yoyo ? from[k] : props[k];
      });
      options.onComplete?.();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}

/** Global tween registry so scenes can cancel everything on unmount. */
export class TweenManager {
  private cancels: Array<() => void> = [];

  to(target: object, props: Record<string, number>, options: TweenOptions = {}): void {
    const cancel = tweenTo(target, props, options);
    this.cancels.push(cancel);
  }

  killAll(): void {
    this.cancels.forEach((c) => c());
    this.cancels = [];
  }
}
