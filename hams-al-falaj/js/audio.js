// Procedural WebAudio ambience — no audio files.
// v4: bulletproof unlock. The AudioContext is created on the very FIRST
// pointer/keydown gesture (capture-phase listeners on window) and resume() is
// re-attempted on every subsequent gesture until state === 'running'.
// Ambient loops start when begin() is called (the splash "Begin" gesture).
// No console output in normal operation.

export class Ambience {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = localStorage.getItem('hams-muted') === '1';
    this._breathCur = 0;
    this._loopsStarted = false;
    this._listening = false;
    this._birdTimer = 3;
    this._boundGesture = () => this._onGesture();
    // capture-phase: fires before anything can stopPropagation
    const opts = { capture: true, passive: true };
    window.addEventListener('pointerdown', this._boundGesture, opts);
    window.addEventListener('keydown', this._boundGesture, opts);
    window.addEventListener('touchstart', this._boundGesture, opts);
  }

  get running() { return !!(this.ctx && this.ctx.state === 'running'); }

  _ensureCtx() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 1;
        this.master.connect(this.ctx.destination);
      } catch (_) { /* audio unsupported — stay silent */ }
    }
    return this.ctx;
  }

  _onGesture() {
    const ctx = this._ensureCtx();
    if (!ctx) return;
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
  }

  // Called from the splash "Begin" click (a user gesture). Starts all loops.
  begin() {
    this._onGesture();
    if (this._loopsStarted || !this.ctx) return;
    this._loopsStarted = true;
    const ctx = this.ctx;
    const noiseBuf = this._noiseBuffer(ctx, 2);

    // ---- wind ----
    {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf; src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 320; lp.Q.value = 0.4;
      const g = ctx.createGain(); g.gain.value = 0.05;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.02;
      lfo.connect(lfoG); lfoG.connect(g.gain);
      const lfo2 = ctx.createOscillator(); lfo2.frequency.value = 0.045;
      const lfo2G = ctx.createGain(); lfo2G.gain.value = 140;
      lfo2.connect(lfo2G); lfo2G.connect(lp.frequency);
      src.connect(lp); lp.connect(g); g.connect(this.master);
      src.start(); lfo.start(); lfo2.start();
    }

    // ---- water trickle ----
    {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf; src.loop = true; src.playbackRate.value = 1.7;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 0.8;
      const bp2 = ctx.createBiquadFilter();
      bp2.type = 'bandpass'; bp2.frequency.value = 900; bp2.Q.value = 1.2;
      const g = ctx.createGain(); g.gain.value = 0;
      src.connect(bp); bp.connect(bp2); bp2.connect(g); g.connect(this.master);
      src.start();
      this._waterGain = g.gain;
    }

    // ---- breathing swell (listen puzzle) ----
    {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf; src.loop = true; src.playbackRate.value = 0.6;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 480; bp.Q.value = 0.6;
      const env = ctx.createGain(); env.gain.value = 0;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.22;
      const shaper = ctx.createWaveShaper();
      const curve = new Float32Array(256);
      for (let i = 0; i < 256; i++) {
        const x = (i / 255) * 2 - 1;
        curve[i] = x > 0 ? Math.pow(Math.sin(x * Math.PI / 2), 1.4)
                         : Math.pow(Math.sin((-x) * Math.PI / 2), 2.2) * 0.55;
      }
      shaper.curve = curve;
      lfo.connect(shaper); shaper.connect(env.gain);
      src.connect(bp); bp.connect(env);
      this._breathBus = ctx.createGain();
      this._breathBus.gain.value = 0.028;
      env.connect(this._breathBus); this._breathBus.connect(this.master);
      src.start(); lfo.start();
    }
  }

  _noiseBuffer(ctx, seconds) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      last = last * 0.94 + w * 0.06;
      d[i] = last * 6;
    }
    return buf;
  }

  _chirp() {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    const t0 = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    const base = 2400 + Math.random() * 1400;
    const notes = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < notes; i++) {
      const ts = t0 + i * (0.09 + Math.random() * 0.05);
      o.frequency.setValueAtTime(base * (0.9 + Math.random() * 0.3), ts);
      o.frequency.exponentialRampToValueAtTime(base * (1.05 + Math.random() * 0.35), ts + 0.07);
    }
    g.gain.setValueAtTime(0, t0);
    for (let i = 0; i < notes; i++) {
      const ts = t0 + i * (0.09 + Math.random() * 0.05);
      g.gain.linearRampToValueAtTime(0.016, ts + 0.02);
      g.gain.linearRampToValueAtTime(0.0005, ts + 0.09);
    }
    o.connect(g); g.connect(this.master);
    o.start(t0); o.stop(t0 + 0.6);
  }

  // Short confirmation chime — proves to the user that sound works.
  chime() {
    const ctx = this._ensureCtx();
    if (!ctx) return;
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    const t0 = ctx.currentTime + 0.05;
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const ts = t0 + i * 0.09;
      g.gain.setValueAtTime(0, ts);
      g.gain.linearRampToValueAtTime(0.12, ts + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, ts + 0.5);
      o.connect(g); g.connect(this.master);
      o.start(ts); o.stop(ts + 0.55);
    });
  }

  // Soft click for UI feedback.
  tick() {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 1400;
    g.gain.setValueAtTime(0.04, t0);
    g.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.08);
    o.connect(g); g.connect(this.master);
    o.start(t0); o.stop(t0 + 0.1);
  }

  // Magical shimmer when a relic is found.
  found() {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime;
    [880, 1108.7, 1318.5, 1760].forEach((f, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const ts = t0 + i * 0.07;
      g.gain.setValueAtTime(0, ts);
      g.gain.linearRampToValueAtTime(0.08, ts + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ts + 0.6);
      o.connect(g); g.connect(this.master);
      o.start(ts); o.stop(ts + 0.65);
    });
  }

  setListening(on) { this._listening = on; }
  setWater(level) { this._waterLevel = level; }

  update(dt) {
    if (!this.ctx || !this._loopsStarted) return;
    const t = this.ctx.currentTime;
    const targetWater = Math.min(0.11, (this._waterLevel || 0) * 0.11);
    if (this._waterGain) this._waterGain.setTargetAtTime(targetWater, t, 0.4);
    this._breathCur += ((this._listening ? 1 : 0) - this._breathCur) * Math.min(1, dt * 2.2);
    if (this._breathBus) this._breathBus.gain.setTargetAtTime(0.028 + this._breathCur * 0.13, t, 0.3);
    this._birdTimer -= dt;
    if (this._birdTimer <= 0) {
      this._birdTimer = 4 + Math.random() * 8;
      if (Math.random() < 0.7) this._chirp();
    }
  }

  setMuted(m) {
    this.muted = m;
    localStorage.setItem('hams-muted', m ? '1' : '0');
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.12);
    }
    if (!m) this.chime(); // audible confirmation when unmuting
  }
  toggleMuted() { this.setMuted(!this.muted); return this.muted; }

  suspend() { if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {}); }
  resume() { this._onGesture(); }
}
