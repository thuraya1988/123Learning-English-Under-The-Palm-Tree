// Said — a young Omani boy. Primary rendering: hand-painted sprite frames
// (assets/v4/boy/, generated + sliced with PIL). If the sprites are missing
// or fail to load, falls back to the original fully code-drawn boy
// (kept intact below as _drawCodeBoy).
// States: idle (breathe/blink/sway), walk (8-frame cycle, flip, bob,
// dust puffs), interact (reach pose).

const TAU = Math.PI * 2;
const SPRITE_BASE = 'assets/v4/boy/';
const WALK_FRAMES = 8; // walk-1.png .. walk-8.png

function roughStroke(ctx, draw, color, width, passes = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  for (let p = 0; p < passes; p++) {
    ctx.save();
    ctx.translate((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2);
    ctx.globalAlpha *= 0.5;
    draw();
    ctx.stroke();
    ctx.restore();
  }
}

export class Boy {
  constructor() {
    this.x = 0;             // world x
    this.y = 0;             // ground line y (set by scene)
    this.targetX = null;
    this.maxSpeed = 222;    // px per second (~17% faster: confident long stride)
    this.vel = 0;           // eased current speed (accelerate over ~0.15s)
    this.speed = 222;       // legacy alias kept in sync for main.js key-walking
    this.strideRate = 9.42 / 222; // walk phase per px -> ~12 fps cadence at max speed
    this.facing = 1;        // 1 right, -1 left
    this.flip = 1;          // eased flip for turn animation
    this.phase = 0;         // walk cycle phase
    this.walking = false;
    this.blinkT = 2 + Math.random() * 3;
    this.blink = 0;
    this.breath = 0;
    this.reach = 0;         // interact pose amount 0..1
    this._reachT = 0;
    this.puffs = [];        // footstep dust
    this.airborne = false;  // jump in flight
    this.vy = 0;            // jump vertical velocity (px/s)
    this.altitude = 0;      // px above the ground line (jump or climb)
    this.climbing = null;   // { palm, phase: 'up'|'top'|'down', t, onTop }
    this.scale = 1.65;      // ~22% taller so he reads against the painted doors
    this.depthOffset = 0;   // px within the path band: -40 far .. +40 near
    this.depthTarget = 0;
    this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- painted sprite frames (graceful fallback to code-drawn) ----
    this._spritesOk = false;
    this._sprites = { walk: [], idle: null, reach: null, jump: null, climb: [] };
    this._loadSprites();
  }

  async _loadSprites() {
    // probe quietly first: a fetch 404 doesn't log a console error, so the
    // code-drawn fallback stays clean when sprites are absent
    try {
      const probe = await fetch(SPRITE_BASE + 'idle.png', { method: 'HEAD' });
      if (!probe.ok) return;
    } catch { return; }
    const jobs = [];
    const walk = [];
    for (let i = 1; i <= WALK_FRAMES; i++) walk.push(null);
    const mk = (src, assign) => new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => { assign(img); res(); };
      img.onerror = () => rej(new Error('missing sprite ' + src));
      img.src = SPRITE_BASE + src;
    });
    for (let i = 1; i <= WALK_FRAMES; i++) {
      jobs.push(mk(`walk-${i}.png`, img => { walk[i - 1] = img; }));
    }
    jobs.push(mk('idle.png', img => { this._sprites.idle = img; }));
    jobs.push(mk('reach.png', img => { this._sprites.reach = img; }));
    // optional v4.4 frames — missing files fall back gracefully, never reject
    const opt = (src, assign) => new Promise((res) => {
      const img = new Image();
      img.onload = () => { assign(img); res(); };
      img.onerror = () => res();
      img.src = SPRITE_BASE + src;
    });
    jobs.push(opt('jump.png', img => { this._sprites.jump = img; }));
    jobs.push(opt('climb-1.png', img => { this._sprites.climb[0] = img; }));
    jobs.push(opt('climb-2.png', img => { this._sprites.climb[1] = img; }));
    Promise.all(jobs).then(() => {
      this._sprites.walk = walk;
      this._spritesOk = true;
    }).catch(() => {
      this._spritesOk = false; // code-drawn fallback stays active
    });
  }

  place(x, y) { this.x = x; this.y = y; this.targetX = null; this.depthOffset = 0; this.depthTarget = 0; }

  // gentle depth: أمام/خلف nudge within the walkable band (±40px), eased
  moveDepth(dir) { this.depthTarget = Math.max(-40, Math.min(40, this.depthTarget + dir * 20)); }

  // depth scale: 0.9 far (up the path) .. 1.1 near (front edge)
  _depthK() { return 1 + (this.depthOffset / 40) * 0.1; }

  walkTo(x) {
    this.targetX = Math.max(20, x);
  }

  interactPose() { this._reachT = 0.9; }

  // ~0.6s gravity arc; horizontal control stays with the caller
  jump() {
    if (this.airborne || this.climbing) return false;
    this.airborne = true;
    this.vy = 470;
    return true;
  }

  // climb a palm trunk: up -> pause at the crown -> down, then resume
  startClimb(palm, onTop) {
    if (this.climbing) return false;
    this.targetX = null;
    this.walking = false;
    this.vel = 0;
    this.airborne = false;
    this.altitude = 0;
    this.x = palm.x;             // stick to the trunk
    this.facing = 1;
    this.climbing = { palm, phase: 'up', t: 0, onTop: onTop || null };
    return true;
  }

  update(dt) {
    this.breath += dt;
    // ease depth offset toward target
    this.depthOffset += (this.depthTarget - this.depthOffset) * Math.min(1, dt * 8);
    // blink
    this.blinkT -= dt;
    if (this.blinkT <= 0) { this.blink = 1; this.blinkT = 2.2 + Math.random() * 3.4; }
    if (this.blink > 0) this.blink = Math.max(0, this.blink - dt * 7);

    // reach pose decay
    if (this._reachT > 0) { this._reachT -= dt; }
    this.reach += ((this._reachT > 0 ? 1 : 0) - this.reach) * Math.min(1, dt * 8);

    // jump physics — gravity arc with a dust burst on landing
    if (this.airborne) {
      this.altitude += this.vy * dt;
      this.vy -= 1500 * dt;
      if (this.altitude <= 0) {
        this.altitude = 0;
        this.airborne = false;
        for (const dir of [-1, 1]) {
          this.puffs.push({ x: this.x + dir * 8, y: this.y, r: 4, a: 0.35, vx: dir * 26, vy: -10 });
        }
      }
    }

    // palm climbing state machine (horizontal movement locked by caller)
    if (this.climbing) {
      const c = this.climbing;
      const topH = c.palm.topH || 200;
      c.t += dt;
      this.phase += dt * 6; // shimmy cadence for climb-frame alternation
      if (c.phase === 'up') {
        const k = Math.min(1, c.t / 1.6);
        this.altitude = topH * (k * k * (3 - 2 * k)); // smoothstep ascent
        if (k >= 1) { c.phase = 'top'; c.t = 0; if (c.onTop) c.onTop(); }
      } else if (c.phase === 'top') {
        this.altitude = topH;
        if (c.t >= 1.3) { c.phase = 'down'; c.t = 0; }
      } else {
        const k = Math.min(1, c.t / 1.3);
        this.altitude = topH * (1 - k * k);
        if (k >= 1) { this.climbing = null; this.altitude = 0; }
      }
    }

    // movement
    if (this.climbing) {
      this.walking = false;
    } else if (this.targetX != null) {
      const dx = this.targetX - this.x;
      if (Math.abs(dx) < 4) {
        this.targetX = null;
        this.walking = false;
        this.vel = 0;
      } else {
        const dir = Math.sign(dx);
        this.facing = dir;
        this.walking = true;
        // ease-in acceleration over ~0.15s; ease-out near the target
        const dist = Math.abs(dx);
        const target = Math.min(this.maxSpeed, Math.max(60, dist * 2.5));
        this.vel += (target - this.vel) * Math.min(1, dt / 0.15);
        const step = this.vel * dt;
        const moved = Math.min(step, dist);
        this.x += dir * moved;
        const prevPhase = this.phase;
        // phase synced to actual distance walked -> feet never slide
        this.phase += moved * this.strideRate * (this.reduced ? 0.6 : 1);
        // footstep dust at each stride contact
        if (Math.floor(this.phase / Math.PI) !== Math.floor(prevPhase / Math.PI)) {
          this.puffs.push({ x: this.x - dir * 6, y: this.y, r: 3, a: 0.3, vx: -dir * 8, vy: -6 });
        }
      }
    } else {
      this.walking = false;
      this.phase *= 0.9;
    }
    // flip ease toward facing
    this.flip += (this.facing - this.flip) * Math.min(1, dt * 10);

    // dust puffs — slow fade so they read as soft haze, never as a flicker pop
    for (const p of this.puffs) {
      p.r += dt * 9; p.a -= dt * 0.55; p.x += p.vx * dt; p.y += p.vy * dt;
    }
    this.puffs = this.puffs.filter(p => p.a > 0);
  }

  draw(ctx) {
    if (this._spritesOk) this._drawSprite(ctx);
    else this._drawCodeBoy(ctx);
  }

  // ============ painted sprite rendering ============

  _drawSprite(ctx) {
    const s = 1.05 * this.scale * this._depthK();
    const dy = this.altitude;    // jump arc / climb height above the ground
    const bob = this.reduced || this.climbing ? 0
      : (this.walking ? Math.abs(Math.sin(this.phase)) * 3 : Math.sin(this.breath * 1.8) * 0.8);

    // dust puffs behind character
    for (const p of this.puffs) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = 'rgba(214,196,168,0.7)';
      ctx.beginPath(); ctx.ellipse(p.x, p.y - 2, p.r * 1.6, p.r, 0, 0, TAU); ctx.fill();
      ctx.restore();
    }

    // soft ground shadow
    ctx.save();
    ctx.fillStyle = 'rgba(60,45,30,0.22)';
    ctx.beginPath(); ctx.ellipse(this.x, this.y + 3, 20 * s, 5 * s, 0, 0, TAU); ctx.fill();
    ctx.restore();

    // pick base frame — ALWAYS drawn fully opaque
    let img;
    if (this.climbing) {
      const cs = this._sprites.climb.filter(Boolean);
      img = cs.length ? cs[Math.floor(this.phase / 4) % cs.length] : this._sprites.reach;
      // at the crown, hold the reach pose — picking dates
      if (this.climbing.phase === 'top' && this._sprites.reach) img = this._sprites.reach;
      if (!img) img = this._sprites.idle;
    } else if (this.airborne) {
      img = this._sprites.jump || this._sprites.walk[2] || this._sprites.idle;
    } else if (this.walking) {
      // ~12 fps at full pace: phase advances with distance walked
      const idx = Math.floor(this.phase / TAU * WALK_FRAMES) % WALK_FRAMES;
      img = this._sprites.walk[(idx + WALK_FRAMES) % WALK_FRAMES];
    } else {
      img = this._sprites.idle;
    }
    if (!img) return;

    // draw height matches the code-drawn boy's footprint (~76 units)
    const drawH = 76 * s;
    const drawW = drawH * (img.width / img.height);

    ctx.save();
    // crisp sprite sampling + integer-snapped position (no sub-pixel blur)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // NO idle breathing squash/stretch: uniform scale keeps the sprite crisp
    ctx.translate(Math.round(this.x), Math.round(this.y - dy - bob));
    ctx.scale(this.flip, 1);
    ctx.globalAlpha = 1;
    ctx.drawImage(img, Math.round(-drawW / 2), Math.round(-drawH), Math.round(drawW), Math.round(drawH));
    // reach pose drawn as an OVERLAY on top of the opaque boy — he never
    // becomes translucent or "disappears" during the crossfade
    if (this.reach > 0.02 && !this.walking && this._sprites.reach) {
      const r = this._sprites.reach;
      const rw = drawH * (r.width / r.height);
      ctx.globalAlpha = Math.min(1, this.reach);
      ctx.drawImage(r, Math.round(-rw / 2), Math.round(-drawH), Math.round(rw), Math.round(drawH));
    }
    ctx.restore();
  }

  // ============ code-drawn fallback (original rendering, kept intact) ============

  _drawCodeBoy(ctx) {
    const s = 1.05 * this.scale * this._depthK(); // overall scale
    const bob = this.walking ? Math.abs(Math.sin(this.phase)) * 3 : Math.sin(this.breath * 1.8) * 0.8;
    const swing = this.walking ? Math.sin(this.phase) : 0;

    // dust puffs behind character
    for (const p of this.puffs) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = 'rgba(214,196,168,0.7)';
      ctx.beginPath(); ctx.ellipse(p.x, p.y - 2, p.r * 1.6, p.r, 0, 0, TAU); ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x, this.y - bob - this.altitude);
    ctx.scale(this.flip * s, s); // no breathing squash: keeps rendering crisp

    const ink = 'rgba(88,66,48,0.55)';

    // ---- soft ground shadow ----
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(60,45,30,0.22)';
    ctx.beginPath(); ctx.ellipse(this.x, this.y + 3, 20 * s, 5 * s, 0, 0, TAU); ctx.fill();
    ctx.restore();

    // ---- legs (under dishdasha hem, show when walking) ----
    const legSwing = swing * 9;
    ctx.fillStyle = '#caa27c'; // skin
    for (const side of [-1, 1]) {
      const lx = side * 4;
      const lift = side === 1 ? Math.max(0, swing) : Math.max(0, -swing);
      ctx.save();
      ctx.translate(lx, -14);
      ctx.rotate((side === 1 ? swing : -swing) * 0.35);
      // shin
      this._rr(ctx, -2.5, 0, 5, 14 - lift * 3, 2.5);
      ctx.fill();
      // sandal
      ctx.fillStyle = '#8a5a34';
      this._rr(ctx, -4, 13 - lift * 3, 9, 3.6, 1.8);
      ctx.fill();
      ctx.fillStyle = '#caa27c';
      ctx.restore();
    }

    // ---- dishdasha (white robe), flares with walk ----
    const flare = 4 + Math.abs(swing) * 3;
    const grad = ctx.createLinearGradient(-16, -58, 16, -8);
    grad.addColorStop(0, '#fdfaf2');
    grad.addColorStop(0.6, '#f3ecdc');
    grad.addColorStop(1, '#e0d4bc');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-8, -58);                       // left shoulder
    ctx.quadraticCurveTo(-13, -40, -12 - flare, -10);
    ctx.quadraticCurveTo(0, -6, 12 + flare, -10);
    ctx.quadraticCurveTo(13, -40, 8, -58);     // right shoulder
    ctx.quadraticCurveTo(0, -54, -8, -58);
    ctx.closePath();
    ctx.fill();
    roughStroke(ctx, () => {
      ctx.beginPath();
      ctx.moveTo(-8, -58);
      ctx.quadraticCurveTo(-13, -40, -12 - flare, -10);
      ctx.quadraticCurveTo(0, -6, 12 + flare, -10);
      ctx.quadraticCurveTo(13, -40, 8, -58);
    }, ink, 1.4);
    // collar + placket
    ctx.strokeStyle = 'rgba(160,140,110,0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(0, -44); ctx.stroke();
    // tassel (furakha)
    ctx.beginPath(); ctx.moveTo(3, -52); ctx.quadraticCurveTo(5, -48, 4, -45); ctx.stroke();
    // painterly fold strokes
    ctx.strokeStyle = 'rgba(190,175,150,0.5)';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 6, -38);
      ctx.quadraticCurveTo(i * 7 + swing * 2, -24, i * 8, -12);
      ctx.stroke();
    }

    // ---- arms ----
    const reach = this.reach;
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(side * 9, -52);
      let rot;
      if (side === 1 && reach > 0) {
        rot = -1.2 * reach; // reach forward
      } else {
        rot = (side === 1 ? -swing : swing) * 0.4 + side * 0.08;
      }
      ctx.rotate(rot);
      ctx.fillStyle = grad;
      this._rr(ctx, -3, 0, 6, 20, 3);
      ctx.fill();
      ctx.strokeStyle = ink; ctx.lineWidth = 1;
      this._rr(ctx, -3, 0, 6, 20, 3);
      ctx.stroke();
      // hand
      ctx.fillStyle = '#caa27c';
      ctx.beginPath(); ctx.arc(0, 22, 3.2, 0, TAU); ctx.fill();
      ctx.restore();
    }

    // ---- head ----
    ctx.save();
    ctx.translate(0, -66);
    // face
    const faceGrad = ctx.createRadialGradient(-2, -2, 2, 0, 0, 10);
    faceGrad.addColorStop(0, '#d9b28c');
    faceGrad.addColorStop(1, '#c09668');
    ctx.fillStyle = faceGrad;
    ctx.beginPath(); ctx.ellipse(0, 0, 8.2, 9, 0, 0, TAU); ctx.fill();
    roughStroke(ctx, () => { ctx.beginPath(); ctx.ellipse(0, 0, 8.2, 9, 0, 0, TAU); }, ink, 1.2);
    // eyes (blink squashes them)
    const eyeOpen = 1 - this.blink;
    ctx.fillStyle = '#3a2a1c';
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(side * 3.1, -0.5);
      ctx.scale(1, Math.max(0.08, eyeOpen));
      ctx.beginPath(); ctx.arc(0, 0, 1.3, 0, TAU); ctx.fill();
      ctx.restore();
    }
    // soft smile
    ctx.strokeStyle = 'rgba(90,60,40,0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0.8, 3, 2.6, 0.25 * Math.PI, 0.75 * Math.PI); ctx.stroke();
    // cheek blush
    ctx.fillStyle = 'rgba(200,120,90,0.25)';
    ctx.beginPath(); ctx.ellipse(4.5, 2.5, 1.8, 1.1, 0, 0, TAU); ctx.fill();

    // ---- kumma cap (embroidered Omani cap) ----
    ctx.save();
    ctx.translate(0, -6.2);
    const capGrad = ctx.createLinearGradient(0, -7, 0, 2);
    capGrad.addColorStop(0, '#f7f1e2');
    capGrad.addColorStop(1, '#e4d8bf');
    ctx.fillStyle = capGrad;
    ctx.beginPath();
    ctx.moveTo(-8.4, 0);
    ctx.quadraticCurveTo(-8.6, -6.5, 0, -7.4);
    ctx.quadraticCurveTo(8.6, -6.5, 8.4, 0);
    ctx.quadraticCurveTo(0, 1.6, -8.4, 0);
    ctx.closePath(); ctx.fill();
    roughStroke(ctx, () => {
      ctx.beginPath();
      ctx.moveTo(-8.4, 0);
      ctx.quadraticCurveTo(-8.6, -6.5, 0, -7.4);
      ctx.quadraticCurveTo(8.6, -6.5, 8.4, 0);
    }, ink, 1.2);
    // embroidery: tiny cross-hatch pattern
    ctx.strokeStyle = 'rgba(140,90,70,0.55)';
    ctx.lineWidth = 0.7;
    for (let i = -3; i <= 3; i++) {
      const ex = i * 2.2;
      const ey = -3.4 + Math.abs(i) * 0.5;
      ctx.beginPath(); ctx.moveTo(ex - 0.8, ey - 0.8); ctx.lineTo(ex + 0.8, ey + 0.8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex + 0.8, ey - 0.8); ctx.lineTo(ex - 0.8, ey + 0.8); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(90,120,110,0.5)';
    ctx.beginPath(); ctx.moveTo(-7.5, -0.6); ctx.quadraticCurveTo(0, 0.8, 7.5, -0.6); ctx.stroke();
    ctx.restore();

    ctx.restore(); // head
    ctx.restore(); // body
  }

  _rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
