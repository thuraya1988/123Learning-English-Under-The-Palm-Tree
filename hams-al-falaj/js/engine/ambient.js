// Ambient "alive" overlays per district. All drawn procedurally on the main
// canvas each frame: swaying palm fronds, smoke curls, water shimmer + ripple
// rings, birds/gulls, hanging fabrics & lanterns, dust/fireflies, heat
// shimmer, waterfall mist, dragonflies, paper plane, chalk dust, bobbing dhow.
// District config comes from worlds.js (district.ambient array).
// UNIFIED DIRECTION RULE (v4.2): every horizontal drift is LEFTWARD-ONLY
// (negative vx), matching the scene's gentle leftward world slide. Vertical
// bobbing / flapping / swaying is allowed; nothing may drift rightward.

const TAU = Math.PI * 2;
const rnd = (a, b) => a + Math.random() * (b - a);

export class Ambient {
  constructor() {
    this.sets = [];
    this.t = 0;
    this.particles = [];
    this.reduced = false;
  }

  configure(sets, reduced) {
    this.sets = sets || [];
    this.reduced = reduced;
    this.particles = [];
    this._seed();
  }

  _seed() {
    const has = s => this.sets.includes(s);
    if (has('birds') || has('gulls')) {
      for (let i = 0; i < 3; i++) this.particles.push(this._bird(true));
    }
    if (has('smoke')) {
      for (let i = 0; i < 2; i++) this.particles.push({ kind: 'smoke', x: rnd(0.2, 0.8), y: rnd(0.3, 0.5), p: rnd(0, 9) });
    }
    if (has('waterShimmer')) {
      for (let i = 0; i < 3; i++) this.particles.push({ kind: 'ripple', x: rnd(0.1, 0.9), y: rnd(0.84, 0.94), r: 0, max: rnd(30, 60), delay: rnd(0, 4) });
    }
    if (has('dust')) for (let i = 0; i < 14; i++) this.particles.push({ kind: 'dust', x: Math.random(), y: Math.random(), vx: -rnd(1.5, 4), vy: rnd(-2, 2), p: rnd(0, 9) });
    if (has('fireflies')) for (let i = 0; i < 8; i++) this.particles.push({ kind: 'fly', x: Math.random(), y: rnd(0.5, 0.85), vx: -rnd(0.006, 0.014), p: rnd(0, 9) });
    if (has('chalk')) for (let i = 0; i < 10; i++) this.particles.push({ kind: 'chalk', x: rnd(0.2, 0.7), y: rnd(0.3, 0.7), vx: -rnd(1, 3), vy: rnd(-6, -2), p: rnd(0, 9) });
    if (has('dragonflies')) for (let i = 0; i < 2; i++) this.particles.push({ kind: 'dfly', x: Math.random(), y: rnd(0.55, 0.75), vx: -rnd(0.04, 0.07), p: rnd(0, 9) });
    if (has('paperPlane')) this.particles.push({ kind: 'plane', x: 1.1, y: rnd(0.25, 0.4), vx: -rnd(0.05, 0.08), p: rnd(0, 9) });
    if (has('fabrics')) for (let i = 0; i < 4; i++) this.particles.push({ kind: 'fabric', x: 0.15 + i * 0.2, y: rnd(0.16, 0.28), h: rnd(40, 70), hue: i });
    if (has('flags')) for (let i = 0; i < 3; i++) this.particles.push({ kind: 'flag', x: 0.2 + i * 0.3, y: rnd(0.18, 0.3) });
    if (has('mist')) for (let i = 0; i < 6; i++) this.particles.push({ kind: 'mist', x: rnd(0.3, 0.7), y: rnd(0.55, 0.75), r: rnd(20, 60), p: rnd(0, 9) });
  }

  _bird(anywhere) {
    // birds fly LEFTWARD only (unified world drift); respawn at the right edge
    return { kind: 'bird', x: anywhere ? Math.random() * 1.2 - 0.1 : 1.08, y: rnd(0.12, 0.4), vx: -rnd(0.03, 0.07), p: rnd(0, 9), gull: this.sets.includes('gulls') };
  }

  update(dt) {
    this.t += dt;
    const speed = this.reduced ? 0.3 : 1;
    for (const p of this.particles) {
      switch (p.kind) {
        case 'bird':
          p.x += p.vx * dt * speed;
          if (p.x < -0.15) Object.assign(p, this._bird(false));
          break;
        case 'smoke': p.p += dt * 0.5 * speed; break;
        case 'ripple':
          p.delay -= dt;
          if (p.delay <= 0) { p.r += dt * 22 * speed; if (p.r > p.max) { p.r = 0; p.x = rnd(0.1, 0.9); p.delay = rnd(1, 5); } }
          break;
        case 'dust': case 'chalk':
          p.x += p.vx * dt * 0.001 * speed; p.y += p.vy * dt * 0.001 * speed; p.p += dt;
          if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
          break;
        case 'fly':
          // gentle leftward drift + vertical bobbing only
          p.p += dt * speed; p.x += p.vx * dt * speed; p.y += Math.cos(p.p * 0.9) * dt * 0.008;
          if (p.x < -0.05) p.x = 1.05;
          break;
        case 'dfly':
          // leftward patrol, vertical darting only
          p.p += dt * speed; p.x += p.vx * dt * speed; p.y += dt * 0.03 * Math.sin(p.p * 1.3);
          if (p.x < -0.1) p.x = 1.1;
          break;
        case 'plane':
          p.p += dt; p.x += p.vx * dt * speed; p.y += Math.sin(p.p * 1.2) * dt * 0.02;
          if (p.x < -0.15) { p.x = 1.15; p.y = rnd(0.2, 0.4); }
          break;
        case 'mist': p.p += dt * 0.3 * speed; break;
        default: break;
      }
    }
  }

  // Draw overlays. camX/worldW let foreground layers parallax ahead of camera.
  draw(ctx, vw, vh, camX, worldW, districtWater) {
    const t = this.t;
    ctx.save();

    // (full-width shimmer band removed — it streaked across sand/pots; ripples remain)

    // ---- dhow reflection bobbing (harbor) ----
    if (this.sets.includes('dhow')) {
      const bx = vw * 0.62 - camX * 0.15, by = vh * 0.60;
      const bob = Math.sin(t * 0.9) * 3;
      ctx.save();
      ctx.translate(bx, by + bob);
      ctx.fillStyle = 'rgba(80,55,35,0.85)';
      ctx.beginPath(); // hull
      ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-40, 16, 0, 18); ctx.quadraticCurveTo(44, 16, 54, -4);
      ctx.quadraticCurveTo(20, 6, -50, 0); ctx.fill();
      ctx.strokeStyle = 'rgba(60,40,25,0.9)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(10, -52); ctx.stroke(); // mast
      ctx.fillStyle = 'rgba(240,230,205,0.85)';
      ctx.beginPath(); ctx.moveTo(10, -50); ctx.quadraticCurveTo(38, -34, 12, -8); ctx.closePath(); ctx.fill();
      // reflection
      ctx.globalAlpha = 0.25;
      ctx.scale(1, -0.6);
      ctx.translate(0, -36);
      ctx.fillStyle = '#3d2c1e';
      ctx.beginPath();
      ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-40, 16, 0, 18); ctx.quadraticCurveTo(44, 16, 54, -4);
      ctx.quadraticCurveTo(20, 6, -50, 0); ctx.fill();
      ctx.restore();
    }

    // ---- particles ----
    for (const p of this.particles) {
      const X = p.x * vw, Y = p.y * vh;
      switch (p.kind) {
        case 'bird': {
          const flap = Math.sin(t * (p.gull ? 5 : 8) + p.p) * (p.gull ? 0.5 : 0.9);
          ctx.strokeStyle = p.gull ? 'rgba(250,250,245,0.85)' : 'rgba(60,50,40,0.75)';
          ctx.lineWidth = p.gull ? 2 : 1.6;
          ctx.beginPath();
          ctx.moveTo(X - 7, Y - flap * 4);
          ctx.quadraticCurveTo(X, Y + 2, X + 7, Y - flap * 4);
          ctx.stroke();
          break;
        }
        case 'smoke': {
          // incense/chimney curl rising
          for (let k = 0; k < 5; k++) {
            const pp = (p.p * 0.4 + k * 0.2) % 1;
            const yy = Y - pp * vh * 0.25;
            // incense rises and leans LEFT with the unified drift
            const xx = X - pp * vh * 0.05 + Math.sin(pp * 6 + t) * 6 * pp;
            ctx.fillStyle = `rgba(230,225,215,${0.16 * (1 - pp)})`;
            ctx.beginPath(); ctx.arc(xx, yy, 4 + pp * 14, 0, TAU); ctx.fill();
          }
          break;
        }
        case 'ripple': {
          if (p.r > 0) {
            ctx.strokeStyle = `rgba(190,240,230,${0.35 * (1 - p.r / p.max)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(X, Y, p.r, p.r * 0.3, 0, 0, TAU); ctx.stroke();
          }
          break;
        }
        case 'dust': {
          ctx.fillStyle = `rgba(235,220,190,${0.18 + 0.12 * Math.sin(p.p)})`;
          ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, TAU); ctx.fill();
          break;
        }
        case 'chalk': {
          ctx.fillStyle = `rgba(250,248,240,${0.25 + 0.15 * Math.sin(p.p * 2)})`;
          ctx.beginPath(); ctx.arc(X, Y, 1.3, 0, TAU); ctx.fill();
          break;
        }
        case 'fly': {
          const glow = 0.4 + 0.6 * Math.max(0, Math.sin(p.p * 2));
          ctx.fillStyle = `rgba(255,235,150,${glow})`;
          ctx.beginPath(); ctx.arc(X, Y, 1.8, 0, TAU); ctx.fill();
          ctx.fillStyle = `rgba(255,235,150,${glow * 0.25})`;
          ctx.beginPath(); ctx.arc(X, Y, 5, 0, TAU); ctx.fill();
          break;
        }
        case 'dfly': {
          const wing = Math.sin(p.p * 30) * 0.5;
          ctx.strokeStyle = 'rgba(90,140,160,0.8)';
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(X - 6, Y); ctx.lineTo(X + 6, Y); ctx.stroke();
          ctx.strokeStyle = 'rgba(180,220,235,0.7)';
          ctx.beginPath(); ctx.moveTo(X - 2, Y); ctx.lineTo(X - 7, Y - 3 - wing * 3); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(X - 2, Y); ctx.lineTo(X - 7, Y + 3 + wing * 3); ctx.stroke();
          break;
        }
        case 'plane': {
          ctx.save();
          ctx.translate(X, Y);
          ctx.scale(-1, 1); // nose points LEFT (unified drift direction)
          ctx.rotate(Math.sin(p.p * 1.2) * 0.15 - 0.08);
          ctx.fillStyle = 'rgba(252,250,242,0.95)';
          ctx.beginPath();
          ctx.moveTo(0, 0); ctx.lineTo(22, 6); ctx.lineTo(0, 12); ctx.lineTo(5, 6);
          ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(150,140,120,0.6)'; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.restore();
          break;
        }
        case 'mist': {
          const rr = p.r + Math.sin(p.p) * 12;
          const g = ctx.createRadialGradient(X, Y, 0, X, Y, rr);
          g.addColorStop(0, 'rgba(235,245,245,0.14)');
          g.addColorStop(1, 'rgba(235,245,245,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(X, Y, rr, 0, TAU); ctx.fill();
          break;
        }
        case 'fabric': {
          // hanging souq fabric, swaying
          const cols = ['#a4453f', '#3f7f78', '#c9a24a', '#7a5a8a'];
          const sway = Math.sin(t * 0.8 + p.x * 9) * (this.reduced ? 2 : 7);
          ctx.save();
          ctx.translate(X, Y);
          ctx.rotate(sway * 0.02);
          ctx.fillStyle = cols[p.hue % cols.length] + 'dd';
          ctx.beginPath();
          ctx.moveTo(-14, 0); ctx.lineTo(14, 0);
          ctx.quadraticCurveTo(14 + sway, p.h * 0.6, sway, p.h);
          ctx.quadraticCurveTo(-14 + sway, p.h * 0.6, -14, 0);
          ctx.fill();
          ctx.strokeStyle = 'rgba(60,40,30,0.4)'; ctx.lineWidth = 1; ctx.stroke();
          ctx.restore();
          break;
        }
        case 'flag': {
          const sway = Math.sin(t * 1.4 + p.x * 7) * (this.reduced ? 1 : 5);
          ctx.strokeStyle = 'rgba(70,50,35,0.8)'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y - 34); ctx.stroke();
          ctx.fillStyle = 'rgba(164,69,63,0.9)';
          ctx.beginPath();
          ctx.moveTo(X, Y - 34);
          ctx.quadraticCurveTo(X + 14 + sway, Y - 32, X + 24 + sway, Y - 28);
          ctx.lineTo(X, Y - 24);
          ctx.closePath(); ctx.fill();
          break;
        }
      }
    }

    // ---- heat shimmer (fort): horizontal wobble bands ----
    if (this.sets.includes('heat') && !this.reduced) {
      ctx.save();
      ctx.globalAlpha = 0.05;
      for (let i = 0; i < 4; i++) {
        const y = vh * (0.45 + i * 0.09);
        ctx.fillStyle = '#fff';
        for (let x = 0; x < vw; x += 40) {
          ctx.fillRect(x, y + Math.sin(x * 0.05 + t * 3 + i * 2) * 3, 30, 2);
        }
      }
      ctx.restore();
    }

    // (code-drawn foreground fronds removed — flat shapes clashed with the painted art)

    ctx.restore();
  }
}
