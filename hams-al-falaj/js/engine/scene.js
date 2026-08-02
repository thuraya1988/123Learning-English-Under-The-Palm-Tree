// Painted scene renderer: THREE hand-painted layers (far / mid / fore) with
// cohesive Lost-in-Play-style parallax. ALL drift & pan motion flows in ONE
// unified direction: the world slides gently LEFTWARD past the camera
// (camera pans right), never reversing. The mid layer is the gameplay plane
// and stays locked to the camera (1.0) so the boy, hotspots and spirits keep
// perfect registration; far/fore parallax ratios follow 0.15 / 0.45 / 0.85
// relative to the camera, normalized so mid = 1.0.

const REL_FAR  = 0.15 / 0.45;  // ≈ 0.33  — slowest, atmospheric
const REL_MID  = 1.0;          // gameplay plane (boy / hotspots / spirits)
const REL_FORE = 0.85 / 0.45;  // ≈ 1.89  — fastest, closest to viewer

const IDLE_DRIFT_PX_S = 14;    // gentle constant LEFTWARD world slide when idle

export class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.vw = 0; this.vh = 0; this.dpr = 1;
    this.camX = 0;
    this.worldW = 0;       // full scene width in px (can exceed viewport)
    this.groundY = 0;
    this.layers = { far: null, mid: null, fore: null }; // {img, ok}
    this.district = null;
    this.bloom = 0;        // permanent glow after spirit freed (0..1 target)
    this._bloomTarget = 0;
    this._camTarget = 0;
    this._drift = 0;       // accumulated idle drift (px) — only ever grows
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.vw = w; this.vh = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this._layout();
  }

  _layout() {
    // Scene is drawn to cover viewport height at 16:9 pano width. v4.4: the
    // paintings were doubled (original + right-hand continuation), so the
    // world is twice as wide for long back-and-forth walks.
    const base = Math.max(this.vw * 3.2, this.vh * (16 / 9) * 2.1);
    this.worldW = Math.round(base);
    this.groundY = Math.round(this.vh * 0.82);
    this._camTarget = this._clampCam(this._camTarget);
    this.camX = this._clampCam(this.camX);
  }

  _clampCam(x) {
    return Math.max(0, Math.min(Math.max(0, this.worldW - this.vw), x));
  }

  setDistrict(district, onload) {
    this.district = district;
    // derive layer paths: ./assets/v4/district-<id>.jpg -> layer-<id>-{far,mid,fore}.png
    const m = /district-([a-z]+)\./.exec(district.img || '');
    const id = m ? m[1] : null;
    let pending = 3;
    const done = () => { if (--pending === 0 && onload) onload(); };
    for (const name of ['far', 'mid', 'fore']) {
      const layer = { img: new Image(), ok: false };
      layer.img.onload = () => { layer.ok = true; done(); };
      layer.img.onerror = () => { layer.ok = false; done(); };
      layer.img.src = id ? `./assets/v4/layer-${id}-${name}.${name === 'fore' ? 'png' : 'jpg'}` : '';
      this.layers[name] = layer;
    }
    this.bloom = 0;
    this._bloomTarget = 0;
  }

  setBloom(on) { this._bloomTarget = on ? 1 : 0; }

  // Walkable path: per-district polyline (world fractions) traced on the
  // painted walkway. Returns the ground y (px) for a world x (px), linearly
  // interpolated between path points; falls back to the flat ground line.
  groundYAt(wx) {
    const path = this.district && this.district.path;
    if (!path || path.length < 2) return this.groundY;
    const fx = Math.max(0, Math.min(1, wx / Math.max(1, this.worldW)));
    let i = 0;
    while (i < path.length - 2 && fx > path[i + 1][0]) i++;
    const [x0, y0] = path[i];
    const [x1, y1] = path[i + 1];
    const t = x1 > x0 ? Math.max(0, Math.min(1, (fx - x0) / (x1 - x0))) : 0;
    return (y0 + (y1 - y0) * t) * this.vh;
  }

  // camera follows the boy (plus any accumulated one-way idle drift)
  follow(x, dt) {
    this._camTarget = this._clampCam(x - this.vw * 0.5 + this._drift);
    this.camX += (this._camTarget - this.camX) * Math.min(1, dt * 3.5);
  }

  // idle=true when the boy is standing still: the world keeps sliding
  // LEFTWARD (camera pans right) at a constant, gentle, never-reversing pace.
  update(dt, idle) {
    this.bloom += (this._bloomTarget - this.bloom) * Math.min(1, dt * 1.5);
    if (idle) {
      // drift only accumulates — the pan never reverses (capped to a subtle sway)
      this._drift = Math.min(this._drift + IDLE_DRIFT_PX_S * dt, this.vw * 0.25);
    }
  }

  draw(time) {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.vw, this.vh);
    const { far, mid, fore } = this.layers;
    const camRange = Math.max(1, this.worldW - this.vw);

    // ---- far layer: parallax 0.33, hazy atmospheric treatment baked in ----
    const farCam = this.camX * REL_FAR;
    const farW = this.vw + camRange * REL_FAR;   // exactly covers its travel
    if (far.ok) {
      ctx.drawImage(far.img, -farCam, 0, farW, this.vh);
    } else if (mid.ok) {
      ctx.save();
      ctx.filter = 'blur(3px) saturate(0.85) brightness(1.1)';
      ctx.drawImage(mid.img, -farCam, 0, farW, this.vh);
      ctx.restore();
    } else {
      this._fallbackSky(ctx, farCam * 0.2);
    }

    // ---- mid layer: parallax 1.0 — the gameplay plane, full sharpness ----
    if (mid.ok) {
      ctx.drawImage(mid.img, -this.camX * REL_MID, 0, this.worldW, this.vh);
    } else {
      this._fallbackScene(ctx, time);
    }

    // ---- freed-spirit bloom overlay (permanent magical glow) ----
    if (this.bloom > 0.01 && this.district) {
      ctx.save();
      ctx.globalAlpha = this.bloom * 0.9;
      ctx.fillStyle = this.district.bloomColor || 'rgba(255,220,140,0.2)';
      ctx.fillRect(0, 0, this.vw, this.vh);
      // warm god-ray shimmer
      const g = ctx.createRadialGradient(this.vw * 0.5, this.vh * 0.3, 10, this.vw * 0.5, this.vh * 0.3, this.vh * 0.9);
      g.addColorStop(0, 'rgba(255,240,200,0.25)');
      g.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.vw, this.vh);
      ctx.restore();
    }

    // ---- fore layer: parallax 1.89 — painted silhouettes pass in FRONT ----
    if (fore.ok) {
      const foreCam = this.camX * REL_FORE;
      const foreW = this.vw + camRange * REL_FORE;
      ctx.drawImage(fore.img, -foreCam, 0, foreW, this.vh);
    }

    // ---- vignette ----
    const vg = ctx.createRadialGradient(this.vw / 2, this.vh / 2, this.vh * 0.45, this.vw / 2, this.vh / 2, this.vh * 0.95);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(50,35,20,0.28)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, this.vw, this.vh);
  }

  // world x -> screen x
  toScreenX(wx) { return wx - this.camX; }

  // ---- graceful painted fallback card ----
  _fallbackSky(ctx, off) {
    const g = ctx.createLinearGradient(0, 0, 0, this.vh);
    g.addColorStop(0, '#cfe4e0');
    g.addColorStop(0.55, '#eadfc4');
    g.addColorStop(1, '#d9c39a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.vw, this.vh);
    // distant mountains
    ctx.fillStyle = 'rgba(150,125,100,0.5)';
    ctx.beginPath();
    ctx.moveTo(0, this.vh * 0.55);
    for (let x = 0; x <= this.vw; x += this.vw / 8) {
      ctx.lineTo(x + this.vw / 16, this.vh * (0.38 + 0.1 * Math.sin(x * 0.01 + off)));
      ctx.lineTo(x + this.vw / 8, this.vh * 0.55);
    }
    ctx.lineTo(this.vw, this.vh); ctx.lineTo(0, this.vh);
    ctx.closePath(); ctx.fill();
  }

  _fallbackScene(ctx, time) {
    // ground band + a few painted palms so a missing asset still reads "village"
    const gy = this.groundY;
    const g = ctx.createLinearGradient(0, gy - this.vh * 0.15, 0, this.vh);
    g.addColorStop(0, '#e3d2ab');
    g.addColorStop(1, '#c8a878');
    ctx.fillStyle = g;
    ctx.fillRect(0, gy - this.vh * 0.15, this.vw, this.vh);
    ctx.fillStyle = 'rgba(120,90,60,0.35)';
    for (let i = 0; i < 6; i++) {
      const wx = ((i + 0.5) / 6) * this.worldW;
      const sx = wx - this.camX;
      if (sx < -80 || sx > this.vw + 80) continue;
      const ph = 60 + (i % 3) * 18;
      ctx.save();
      ctx.translate(sx, gy - 20);
      ctx.fillRect(-3, -ph, 6, ph);
      for (let f = 0; f < 6; f++) {
        const a = -Math.PI * (0.15 + f * 0.14) + Math.sin(time * 0.001 + i) * 0.05;
        ctx.beginPath();
        ctx.moveTo(0, -ph);
        ctx.quadraticCurveTo(Math.cos(a) * 26, -ph + Math.sin(a) * 26, Math.cos(a) * 44, -ph + Math.sin(a) * 44 + 10);
        ctx.lineTo(0, -ph);
        ctx.fill();
      }
      ctx.restore();
    }
    // water band if the district has water
    if (this.district && this.district.water) {
      ctx.fillStyle = 'rgba(90,170,170,0.4)';
      ctx.fillRect(0, gy + this.vh * 0.06, this.vw, this.vh * 0.06);
    }
  }
}
