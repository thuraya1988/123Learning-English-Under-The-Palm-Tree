// Smoky gradual reveals: spirits and relic art never pop in. Entrance =
// smoke-puff particles gathering + swirling, artwork fades from
// blur/grayscale/transparent to full color over ~1.2s with soft glow and
// sparkle accents. Reduced motion = simple fade.

const TAU = Math.PI * 2;

// Spirits are soft oval-vignette cards (feathered alpha, not hard cutouts).
// Render the source image into an offscreen canvas masked by a radial
// feathered oval, with a warm painterly backdrop behind the figure.
const _vigCache = new Map();
function featherOval(img, size) {
  const key = img.src + '@' + Math.round(size);
  if (_vigCache.has(key)) return _vigCache.get(key);
  if (!img.complete || !img.naturalWidth) return null;
  const w = Math.round(size), h = Math.round(size * 1.05);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  // soft painterly glow card behind the figure
  const bg = x.createRadialGradient(w / 2, h * 0.45, 6, w / 2, h * 0.45, w * 0.55);
  bg.addColorStop(0, 'rgba(252,244,220,0.95)');
  bg.addColorStop(0.7, 'rgba(232,214,175,0.55)');
  bg.addColorStop(1, 'rgba(232,214,175,0)');
  x.fillStyle = bg;
  x.fillRect(0, 0, w, h);
  // image, cover-fit
  const ir = img.naturalWidth / img.naturalHeight, cr = w / h;
  let dw, dh;
  if (ir > cr) { dh = h; dw = h * ir; } else { dw = w; dh = w / ir; }
  x.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  // feathered oval alpha mask
  x.globalCompositeOperation = 'destination-in';
  const m = x.createRadialGradient(w / 2, h * 0.48, w * 0.18, w / 2, h * 0.48, w * 0.52);
  m.addColorStop(0, 'rgba(0,0,0,1)');
  m.addColorStop(0.72, 'rgba(0,0,0,0.9)');
  m.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = m;
  x.save();
  x.translate(w / 2, h * 0.48);
  x.scale(1, (h * 0.55) / (w * 0.52));
  x.translate(-w / 2, -h * 0.48);
  x.beginPath(); x.arc(w / 2, h * 0.48, w * 0.52, 0, TAU); x.fill();
  x.restore();
  x.globalCompositeOperation = 'source-over';
  _vigCache.set(key, c);
  return c;
}

export class SmokyReveal {
  constructor() {
    this.active = false;
    this.reduced = false;
    this.puffs = [];
    this.sparks = [];
    this.t = 0;
    this.duration = 1.2;
  }

  // x, y in screen px; img = HTMLImageElement (may be broken -> color card)
  start(x, y, img, size, onDone) {
    this.active = true;
    this.t = 0;
    this.x = x; this.y = y;
    this.img = img;
    this.imgOk = !!(img && img.complete && img.naturalWidth > 0);
    this.size = size || Math.min(window.innerWidth, window.innerHeight) * 0.4;
    this._vignette = this.imgOk ? featherOval(img, this.size) : null;
    // image may still be loading: upgrade mid-reveal when it arrives
    if (img && !this.imgOk) {
      img.addEventListener('load', () => {
        if (this.img !== img) return;
        this.imgOk = true;
        this._vignette = featherOval(img, this.size);
      }, { once: true });
    }
    this.onDone = onDone;
    this.puffs = [];
    this.sparks = [];
    const n = this.reduced ? 0 : 26;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU;
      this.puffs.push({
        a, r0: this.size * (0.7 + Math.random() * 0.6),
        sz: 8 + Math.random() * 18,
        spin: (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 2),
        off: Math.random() * TAU,
      });
    }
    for (let i = 0; i < 14; i++) {
      this.sparks.push({ a: Math.random() * TAU, r: Math.random(), p: Math.random() * 9 });
    }
  }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    for (const p of this.puffs) p.a += p.spin * dt;
    for (const s of this.sparks) s.p += dt;
    if (this.t >= this.duration + 0.6) {
      this.active = false;
      if (this.onDone) this.onDone();
    }
  }

  draw(ctx) {
    if (!this.active) return;
    const k = Math.min(1, this.t / this.duration); // reveal progress
    const ease = 1 - Math.pow(1 - k, 3);

    ctx.save();
    ctx.translate(this.x, this.y);

    // swirl smoke (gathers inward as reveal progresses)
    for (const p of this.puffs) {
      const r = p.r0 * (1 - ease * 0.85);
      const px = Math.cos(p.a) * r, py = Math.sin(p.a) * r * 0.8;
      const alpha = 0.35 * (1 - k) + 0.05;
      const g = ctx.createRadialGradient(px, py, 0, px, py, p.sz);
      g.addColorStop(0, `rgba(210,205,200,${alpha})`);
      g.addColorStop(1, 'rgba(210,205,200,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, p.sz, 0, TAU); ctx.fill();
    }

    // artwork: blur + gray -> full color (canvas filter; reduced = plain fade)
    const s = this.size;
    ctx.save();
    ctx.globalAlpha = this.reduced ? k : Math.min(1, ease * 1.4);
    if (!this.reduced && ctx.filter !== undefined) {
      const blur = Math.max(0, (1 - k) * 10);
      const gray = (1 - k) * 100;
      ctx.filter = `blur(${blur.toFixed(1)}px) grayscale(${gray.toFixed(0)}%)`;
    }
    // magical glow
    ctx.shadowColor = 'rgba(255,235,180,0.9)';
    ctx.shadowBlur = 30 * (1 - Math.abs(k - 0.7));
    if (this.imgOk) {
      if (!this._vignette) this._vignette = featherOval(this.img, s);
      if (this._vignette) ctx.drawImage(this._vignette, -s / 2, -s * 0.62);
      else ctx.drawImage(this.img, -s / 2, -s * 0.62, s, s * 1.05);
    } else {
      // graceful fallback: painted spirit silhouette card
      const g = ctx.createRadialGradient(0, -s * 0.1, 4, 0, -s * 0.1, s * 0.5);
      g.addColorStop(0, 'rgba(170,225,215,0.95)');
      g.addColorStop(1, 'rgba(120,180,175,0.15)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.1, s * 0.32, s * 0.45, 0, 0, TAU);
      ctx.fill();
      // eyes
      ctx.fillStyle = 'rgba(40,80,80,0.8)';
      ctx.beginPath(); ctx.arc(-s * 0.09, -s * 0.22, s * 0.02, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(s * 0.09, -s * 0.22, s * 0.02, 0, TAU); ctx.fill();
    }
    ctx.restore();

    // sparkle accents
    if (!this.reduced) {
      for (const sp of this.sparks) {
        const life = (sp.p * 1.4) % 1;
        const rr = s * 0.5 * (0.3 + sp.r * 0.5);
        const px = Math.cos(sp.a) * rr, py = Math.sin(sp.a) * rr * 0.9 - s * 0.1;
        const al = Math.sin(life * Math.PI) * k;
        ctx.fillStyle = `rgba(255,240,190,${al})`;
        ctx.beginPath(); ctx.arc(px, py, 1.6 + sp.r * 1.4, 0, TAU); ctx.fill();
      }
    }
    ctx.restore();
  }
}
