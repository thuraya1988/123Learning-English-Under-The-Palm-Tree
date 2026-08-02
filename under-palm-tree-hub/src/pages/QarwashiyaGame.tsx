import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore, type GameId, type GameProgress } from '@/lib/store';

// Custom id for this port; persisted under games.qarwashiya via a guarded cast.
const QW_ID = 'qarwashiya' as GameId;

// ===================== UNDER THE PALM TREE: AL-QARWASHIYA CHRONICLES =====================
// Faithful React port of the 36-level canvas exploration game.

const TOTAL_LEVELS = 36;

interface WeatherDef { rain: number; wind: number; fog: number; sand: number; snow: number }
interface TimeDef { light: number; sky: string; ambient: string }
interface VocabDef { word: string; ar: string; x: number; y: number; desc: string; collected?: boolean }
interface ItemDef { name: string; arName: string; x: number; y: number; type: string; collected?: boolean }
interface DialogueLine { ar: string; en: string }
interface NPCDef { name: string; arName: string; x: number; y: number; color: string; dialogues: DialogueLine[]; met?: boolean }
interface LevelTheme { name: string; arName: string; weather: keyof typeof weatherTypes; time: keyof typeof timeModes; desc: string; arDesc: string }

// ===================== WEATHER & ENVIRONMENT SYSTEMS =====================
const weatherTypes = {
  clear: { rain: 0, wind: 0.3, fog: 0, sand: 0, snow: 0 },
  lightRain: { rain: 0.3, wind: 0.4, fog: 0.1, sand: 0, snow: 0 },
  heavyRain: { rain: 0.8, wind: 0.7, fog: 0.3, sand: 0, snow: 0 },
  thunderstorm: { rain: 1.0, wind: 0.9, fog: 0.2, sand: 0, snow: 0 },
  sandstorm: { rain: 0, wind: 1.5, fog: 0.5, sand: 1.0, snow: 0 },
  foggy: { rain: 0, wind: 0.2, fog: 0.8, sand: 0, snow: 0 },
  snow: { rain: 0, wind: 0.5, fog: 0.3, sand: 0, snow: 0.7 },
  blizzard: { rain: 0, wind: 1.2, fog: 0.6, sand: 0, snow: 1.0 },
  windy: { rain: 0, wind: 1.0, fog: 0, sand: 0.2, snow: 0 },
  dust: { rain: 0, wind: 0.6, fog: 0.4, sand: 0.6, snow: 0 },
} satisfies Record<string, WeatherDef>;

const timeModes = {
  dawn: { light: 0.3, sky: '#2a1a3a', ambient: '#4a3a5a' },
  morning: { light: 0.6, sky: '#3a4a5a', ambient: '#5a6a7a' },
  noon: { light: 1.0, sky: '#4a6a8a', ambient: '#6a8aaa' },
  afternoon: { light: 0.8, sky: '#5a4a3a', ambient: '#7a6a5a' },
  sunset: { light: 0.5, sky: '#8a4a2a', ambient: '#9a5a3a' },
  dusk: { light: 0.3, sky: '#3a2a4a', ambient: '#4a3a5a' },
  night: { light: 0.1, sky: '#0a0a1a', ambient: '#1a1a2a' },
  midnight: { light: 0.05, sky: '#050510', ambient: '#0a0a15' },
} satisfies Record<string, TimeDef>;

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// ===================== BUILDING SYSTEM =====================
interface WindowPane { x: number; y: number; on: boolean; flicker: boolean; color: string }

class Building {
  x: number; y: number; w: number; h: number;
  type: string; name: string; nameAr: string;
  height: number; color: string;
  hasInterior: boolean; interior: { type: string } | null;
  doorOpen = false; lightsOn = false;
  windows: WindowPane[] = [];
  neon: boolean; neonColor: string;

  constructor(x: number, y: number, w: number, h: number, type: string, name: string, nameAr: string, interior: { type: string } | null = null) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.type = type;
    this.name = name; this.nameAr = nameAr;
    this.height = type === 'tower' ? 120 : type === 'mosque' ? 80 : 40 + Math.random() * 30;
    this.color = this.getColor();
    this.hasInterior = interior !== null;
    this.interior = interior;
    this.generateWindows();
    this.neon = Math.random() > 0.7;
    this.neonColor = Math.random() > 0.5 ? '#00d4aa' : '#d63384';
  }

  getColor() {
    const colors: Record<string, string[]> = {
      house: ['#3d2518', '#4a2e1e', '#5a3a2a', '#6a4a3a'],
      mosque: ['#8a7a6a', '#9a8a7a', '#7a6a5a'],
      shop: ['#4a3a2a', '#5a4a3a', '#6a5a4a'],
      school: ['#3a4a5a', '#4a5a6a', '#5a6a7a'],
      barn: ['#5a4a2a', '#6a5a3a', '#7a6a4a'],
      well: ['#4a4a4a', '#5a5a5a'],
      tower: ['#3a3a4a', '#4a4a5a', '#5a5a6a'],
      tent: ['#8a6a4a', '#9a7a5a', '#7a5a3a'],
    };
    const c = colors[this.type] || colors.house;
    return c[Math.floor(Math.random() * c.length)];
  }

  generateWindows() {
    const rows = Math.floor(this.h / 30);
    const cols = Math.floor(this.w / 25);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.5) {
          this.windows.push({
            x: 10 + c * 25, y: 15 + r * 30,
            on: Math.random() > 0.4,
            flicker: Math.random() > 0.8,
            color: Math.random() > 0.6 ? '#00d4aa' : '#d4a843',
          });
        }
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, lightLevel: number, playerX: number, playerY: number, timeOfDay: number) {
    const h3d = this.height;
    const shadowLen = 15 + h3d * 0.25;
    const timeOffset = Math.sin(timeOfDay * Math.PI * 2) * 0.5 + 0.5;
    const shadowDirX = Math.cos(Math.PI / 4 + timeOffset * 0.5) * shadowLen;
    const shadowDirY = Math.sin(Math.PI / 4 + timeOffset * 0.5) * shadowLen * 0.5;

    // Shadow
    ctx.save();
    ctx.globalAlpha = 0.25 * (1 - lightLevel * 0.5);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.h);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x + this.w + shadowDirX, this.y + this.h + shadowDirY);
    ctx.lineTo(this.x + shadowDirX, this.y + this.h + shadowDirY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    const wallColor = this.adjustBrightness(this.color, -15);
    const roofColor = this.adjustBrightness(this.color, -25);

    // Left wall
    ctx.fillStyle = wallColor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - h3d * 0.25, this.y - h3d);
    ctx.lineTo(this.x - h3d * 0.25, this.y + this.h - h3d);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.closePath();
    ctx.fill();

    // Roof/Top
    ctx.fillStyle = roofColor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    if (this.type === 'mosque') {
      ctx.lineTo(this.x + this.w * 0.5, this.y - h3d * 1.5);
    } else if (this.type === 'tower') {
      ctx.lineTo(this.x + this.w * 0.7, this.y - h3d);
      ctx.lineTo(this.x + this.w * 0.3, this.y - h3d);
    } else {
      ctx.lineTo(this.x + this.w - h3d * 0.25, this.y - h3d);
      ctx.lineTo(this.x - h3d * 0.25, this.y - h3d);
    }
    ctx.closePath();
    ctx.fill();

    // Right wall
    ctx.fillStyle = this.adjustBrightness(this.color, -8);
    ctx.beginPath();
    ctx.moveTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w - h3d * 0.25, this.y - h3d);
    ctx.lineTo(this.x + this.w - h3d * 0.25, this.y + this.h - h3d);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.closePath();
    ctx.fill();

    // Front face
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // Texture
    ctx.fillStyle = this.adjustBrightness(this.color, 8);
    for (let i = 0; i < this.w; i += 20) {
      for (let j = 0; j < this.h; j += 12) {
        if ((i + j) % 30 === 0) ctx.fillRect(this.x + i, this.y + j, 18, 10);
      }
    }

    // Top border
    ctx.fillStyle = this.type === 'mosque' ? '#d4a843' : '#8b4513';
    ctx.fillRect(this.x - 3, this.y - 4, this.w + 6, 6);

    // Door
    const doorW = this.type === 'mosque' ? 40 : 24;
    const doorH = this.type === 'mosque' ? 50 : 40;
    ctx.fillStyle = '#1a0a0a';
    ctx.fillRect(this.x + this.w / 2 - doorW / 2, this.y + this.h - doorH, doorW, doorH);
    ctx.strokeStyle = '#5a3a2a';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + this.w / 2 - doorW / 2, this.y + this.h - doorH, doorW, doorH);

    // Door glow at night
    if (lightLevel < 0.4) {
      ctx.shadowColor = '#d4a843';
      ctx.shadowBlur = 8;
      ctx.fillStyle = 'rgba(212, 168, 67, 0.2)';
      ctx.fillRect(this.x + this.w / 2 - doorW / 2 + 2, this.y + this.h - doorH + 2, doorW - 4, doorH - 4);
      ctx.shadowBlur = 0;
    }

    // Enter indicator
    if (this.hasInterior && dist(playerX, playerY, this.x + this.w / 2, this.y + this.h) < 50) {
      ctx.fillStyle = '#00d4aa';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('[E] ENTER', this.x + this.w / 2, this.y - 10);
      ctx.textAlign = 'left';
    }

    // Windows
    this.windows.forEach((win) => {
      const wx = this.x + win.x;
      const wy = this.y + win.y;
      ctx.fillStyle = '#1a0a0a';
      ctx.fillRect(wx - 1, wy - 1, 18, 18);
      ctx.strokeStyle = '#5a3a2a';
      ctx.lineWidth = 1;
      ctx.strokeRect(wx, wy, 16, 16);

      if (win.on && lightLevel < 0.7) {
        const flick = win.flicker ? (Math.sin(Date.now() / 200 + win.x) > 0.3 ? 1 : 0.5) : 1;
        ctx.globalAlpha = flick;
        ctx.fillStyle = win.color;
        ctx.shadowColor = win.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(wx + 1, wy + 1, 14, 14);
        ctx.shadowBlur = 0;

        if (lightLevel < 0.5) {
          ctx.globalAlpha = flick * 0.12;
          ctx.fillStyle = win.color;
          ctx.beginPath();
          ctx.moveTo(wx + 1, wy + 15);
          ctx.lineTo(wx + 15, wy + 15);
          ctx.lineTo(wx + 25, wy + 50);
          ctx.lineTo(wx - 10, wy + 50);
          ctx.closePath();
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    });

    // Minaret for mosque
    if (this.type === 'mosque') {
      const mx = this.x + this.w * 0.8;
      const my = this.y - h3d;
      ctx.fillStyle = '#9a8a7a';
      ctx.fillRect(mx - 8, my - 80, 16, 80);
      ctx.fillStyle = '#d4a843';
      ctx.beginPath();
      ctx.arc(mx, my - 80, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4a843';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mx, my - 85, 6, 0, Math.PI * 1.5);
      ctx.stroke();
    }

    // Neon sign
    if (this.neon && lightLevel < 0.8) {
      const flick = Math.sin(Date.now() / 200) > 0.1 ? 1 : 0.3;
      ctx.globalAlpha = flick;
      ctx.fillStyle = this.neonColor;
      ctx.shadowColor = this.neonColor;
      ctx.shadowBlur = 12;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.nameAr, this.x + this.w / 2, this.y - 15);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.textAlign = 'left';
    }

    // Name label
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(this.x + this.w / 2 - 40, this.y - 30, 80, 14);
    ctx.fillStyle = '#d4a843';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.nameAr, this.x + this.w / 2, this.y - 20);
    ctx.textAlign = 'left';
  }

  adjustBrightness(hex: string, amount: number) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }
}

// ===================== PLANT & ANIMAL SYSTEMS =====================
interface Blade { angle: number; height: number; width: number; sway: number; swaySpeed: number; color: string }

class GrassPatch {
  x: number; y: number; type: string; blades: Blade[] = [];
  constructor(x: number, y: number, type = 'grass') {
    this.x = x; this.y = y; this.type = type;
    const count = type === 'tall' ? 5 + Math.floor(Math.random() * 4) : 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      this.blades.push({
        angle: (Math.random() - 0.5) * 0.6,
        height: type === 'tall' ? 15 + Math.random() * 20 : 8 + Math.random() * 12,
        width: 2 + Math.random() * 2,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 1 + Math.random() * 2,
        color: type === 'tall'
          ? `rgb(${30 + Math.random() * 20}, ${80 + Math.random() * 40}, ${30 + Math.random() * 20})`
          : `rgb(${40 + Math.random() * 20}, ${90 + Math.random() * 30}, ${40 + Math.random() * 20})`,
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D, wind: number) {
    this.blades.forEach((blade) => {
      const sway = Math.sin((Date.now() / 1000) * blade.swaySpeed + blade.sway) * wind;
      const tipX = this.x + Math.sin(blade.angle + sway) * blade.height * 0.3;
      const tipY = this.y - blade.height + Math.cos(blade.angle + sway) * blade.height * 0.1;
      ctx.strokeStyle = blade.color;
      ctx.lineWidth = blade.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(this.x + (tipX - this.x) * 0.5, this.y - blade.height * 0.5, tipX, tipY);
      ctx.stroke();
    });
  }
}

interface PalmLeaf { angle: number; length: number; curve: number; sway: number }

class PalmTree {
  x: number; y: number; height: number; trunkCurve: number; leaves: PalmLeaf[] = [];
  constructor(x: number, y: number, height = 80) {
    this.x = x; this.y = y; this.height = height;
    this.trunkCurve = (Math.random() - 0.5) * 25;
    const count = 7 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      this.leaves.push({
        angle: ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.4,
        length: 25 + Math.random() * 30,
        curve: (Math.random() - 0.5) * 18,
        sway: Math.random() * Math.PI * 2,
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D, wind: number) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(this.x + 8, this.y + 4, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#5a3a1a';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(this.x + this.trunkCurve * 0.5, this.y - this.height * 0.5, this.x + this.trunkCurve, this.y - this.height);
    ctx.stroke();

    ctx.strokeStyle = '#4a2e1a';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const t = i / 5;
      ctx.beginPath();
      ctx.moveTo(this.x + this.trunkCurve * t - 3, this.y - this.height * t);
      ctx.lineTo(this.x + this.trunkCurve * t + 3, this.y - this.height * t);
      ctx.stroke();
    }

    this.leaves.forEach((leaf) => {
      const sway = Math.sin(Date.now() / 1000 + leaf.sway) * wind * 0.3;
      const sx = this.x + this.trunkCurve;
      const sy = this.y - this.height;
      const ex = sx + Math.cos(leaf.angle + sway) * leaf.length;
      const ey = sy + Math.sin(leaf.angle + sway) * leaf.length * 0.3;
      const cx = sx + Math.cos(leaf.angle + sway) * leaf.length * 0.5 + leaf.curve;
      const cy = sy + Math.sin(leaf.angle + sway) * leaf.length * 0.15 - 10;

      ctx.strokeStyle = '#2a5a3a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cx, cy, ex, ey);
      ctx.stroke();
      ctx.strokeStyle = '#1a4a2a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cx, cy, ex, ey);
      ctx.stroke();
    });
  }
}

class Animal {
  x: number; y: number; type: string;
  vx: number; vy: number; frame = 0; dir: string;
  constructor(x: number, y: number, type: string) {
    this.x = x; this.y = y; this.type = type;
    this.vx = (Math.random() - 0.5) * 30;
    this.vy = (Math.random() - 0.5) * 20;
    this.dir = this.vx > 0 ? 'right' : 'left';
  }

  update(dt: number, bounds: { x: number; y: number; w: number; h: number }) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if (this.x < bounds.x || this.x > bounds.x + bounds.w) { this.vx *= -1; this.dir = this.vx > 0 ? 'right' : 'left'; }
    if (this.y < bounds.y || this.y > bounds.y + bounds.h) this.vy *= -1;
    this.frame += dt * 4;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.dir === 'left') ctx.scale(-1, 1);

    const bob = Math.sin(this.frame) * 2;

    if (this.type === 'sheep') {
      ctx.fillStyle = '#c8b8a0';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d8c8b0';
      ctx.beginPath();
      ctx.arc(-3, -2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(10, -5 + bob, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 8); ctx.lineTo(-5, 16 + Math.sin(this.frame) * 2);
      ctx.moveTo(5, 8); ctx.lineTo(5, 16 - Math.sin(this.frame) * 2);
      ctx.stroke();
    } else if (this.type === 'chicken') {
      ctx.fillStyle = '#e8d5b5';
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(8, -8 + bob, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d63384';
      ctx.beginPath();
      ctx.arc(8, -13 + bob, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4a843';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-3, 6); ctx.lineTo(-3, 14 + Math.sin(this.frame) * 3);
      ctx.moveTo(3, 6); ctx.lineTo(3, 14 - Math.sin(this.frame) * 3);
      ctx.stroke();
    } else if (this.type === 'camel') {
      ctx.fillStyle = '#8a7a5a';
      ctx.fillRect(-15, -5, 30, 16);
      ctx.beginPath();
      ctx.ellipse(-5, -12, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(12, -20, 6, 20);
      ctx.fillRect(10, -28, 10, 10);
      ctx.strokeStyle = '#6a5a3a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, 10); ctx.lineTo(-10, 28 + Math.sin(this.frame) * 2);
      ctx.moveTo(10, 10); ctx.lineTo(10, 28 - Math.sin(this.frame) * 2);
      ctx.stroke();
    } else if (this.type === 'goat') {
      ctx.fillStyle = '#9a8a7a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a7a6a';
      ctx.beginPath();
      ctx.arc(10, -6 + bob, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4a843';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, -10); ctx.lineTo(5, -18);
      ctx.moveTo(12, -10); ctx.lineTo(15, -18);
      ctx.stroke();
      ctx.strokeStyle = '#5a4a3a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 6); ctx.lineTo(-5, 14 + Math.sin(this.frame) * 2);
      ctx.moveTo(5, 6); ctx.lineTo(5, 14 - Math.sin(this.frame) * 2);
      ctx.stroke();
    }

    ctx.restore();
  }
}

interface CloudPuff { dx: number; dy: number; r: number }

class Cloud {
  x: number; y: number; size: number; vx: number; puffs: CloudPuff[] = [];
  constructor(x: number, y: number, size: number) {
    this.x = x; this.y = y; this.size = size;
    this.vx = 10 + Math.random() * 20;
    for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
      this.puffs.push({
        dx: (Math.random() - 0.5) * size * 0.8,
        dy: (Math.random() - 0.5) * size * 0.3,
        r: size * (0.3 + Math.random() * 0.4),
      });
    }
  }

  update(dt: number, worldW: number) {
    this.x += this.vx * dt;
    if (this.x > worldW + 100) this.x = -100;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(200, 200, 220, 0.6)';
    this.puffs.forEach((p) => {
      ctx.beginPath();
      ctx.arc(this.x + p.dx, this.y + p.dy, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

class Particle {
  x: number; y: number; type: string; life = 1; vx: number; vy: number; size: number;
  constructor(x: number, y: number, type: string) {
    this.x = x; this.y = y; this.type = type;
    this.vx = (Math.random() - 0.5) * 50;
    this.vy = type === 'rain' ? 200 + Math.random() * 150 : (Math.random() - 0.5) * 50;
    this.size = type === 'rain' ? 1 + Math.random() : 2 + Math.random() * 3;
  }

  update(dt: number, worldW: number, worldH: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if (this.type === 'rain') {
      this.vx -= 30 * dt;
      if (this.y > worldH) { this.y = -20; this.x = Math.random() * worldW; }
      if (this.x < 0) this.x = worldW;
    } else if (this.type === 'snow') {
      this.vx += Math.sin(Date.now() / 1000 + this.x) * 10 * dt;
      if (this.y > worldH) { this.y = -10; this.x = Math.random() * worldW; }
    } else if (this.type === 'sand') {
      this.vx += 80 * dt;
      if (this.x > worldW) { this.x = -10; this.y = Math.random() * worldH; }
    } else if (this.type === 'leaf') {
      this.vx += Math.sin(Date.now() / 500 + this.y) * 20 * dt;
      this.vy += 10 * dt;
      this.life -= dt * 0.3;
      if (this.life <= 0) { this.life = 1; this.x = Math.random() * worldW; this.y = -10; }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life;
    if (this.type === 'rain') {
      ctx.strokeStyle = 'rgba(150, 180, 200, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - 3, this.y + 8 + this.size * 2);
      ctx.stroke();
    } else if (this.type === 'snow') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'sand') {
      ctx.fillStyle = 'rgba(200, 180, 140, 0.6)';
      ctx.fillRect(this.x, this.y, this.size, this.size);
    } else if (this.type === 'leaf') {
      ctx.fillStyle = `rgba(${60 + Math.random() * 40}, ${120 + Math.random() * 40}, ${40 + Math.random() * 20}, ${this.life * 0.7})`;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.size * 2, this.size, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

class LightOrb {
  x: number; y: number; vx: number; vy: number; color: string; size: number; pulse: number;
  constructor(x: number, y: number, color: string) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 15;
    this.vy = (Math.random() - 0.5) * 15;
    this.color = color;
    this.size = 2 + Math.random() * 4;
    this.pulse = Math.random() * Math.PI * 2;
  }

  update(dt: number, worldW: number, worldH: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if (this.x < 0 || this.x > worldW) this.vx *= -1;
    if (this.y < 0 || this.y > worldH) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 1000 + this.pulse);
    ctx.globalAlpha = pulse * 0.8;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

// ===================== 36 LEVEL DEFINITIONS =====================
const levelThemes: Record<number, LevelTheme> = {
  1: { name: 'Al-Qarwashiya Village', arName: 'قرية القرواشية', weather: 'clear', time: 'morning', desc: 'The ancient village at dawn. Explore mud-brick houses and meet the elder.', arDesc: 'القرية القديمة عند الفجر. استكشف البيوت الطينية وقابل الشيخ.' },
  2: { name: 'Morning Market', arName: 'سوق الصباح', weather: 'clear', time: 'morning', desc: 'The market awakens. Traders set up their stalls.', arDesc: 'السوق يصحو. التجار ينصبون أكشاكهم.' },
  3: { name: 'Windy Plains', arName: 'السهول الريحية', weather: 'windy', time: 'noon', desc: 'Strong winds sweep across the open plains.', arDesc: 'رياح قوية تجتاح السهول المفتوحة.' },
  4: { name: 'Rainy Afternoon', arName: 'بعد الظهر الممطر', weather: 'lightRain', time: 'afternoon', desc: 'Gentle rain falls on the village streets.', arDesc: 'مطر خفيف يهطل على شوارع القرية.' },
  5: { name: 'Sunset Over Falaj', arName: 'غروب فوق الفلج', weather: 'clear', time: 'sunset', desc: 'Golden light reflects on the ancient water channels.', arDesc: 'ضوء ذهبي ينعكس على قنوات الماء القديمة.' },
  6: { name: 'Night Village', arName: 'القرية الليلية', weather: 'clear', time: 'night', desc: 'Lanterns illuminate the quiet streets.', arDesc: 'الفوانيس تضيء الشوارع الهادئة.' },
  7: { name: 'Thunderstorm', arName: 'العاصفة الرعدية', weather: 'thunderstorm', time: 'dusk', desc: 'Lightning cracks the sky. Seek shelter!', arDesc: 'البرق يشق السماء. ابحث عن ملجأ!' },
  8: { name: 'Foggy Dawn', arName: 'ضباب الفجر', weather: 'foggy', time: 'dawn', desc: 'Thick fog hides the village paths.', arDesc: 'ضباب كثيف يخفي دروب القرية.' },
  9: { name: 'Sand Storm', arName: 'عاصفة الرمال', weather: 'sandstorm', time: 'noon', desc: 'A fierce sandstorm engulfs the desert.', arDesc: 'عاصفة رمال عنيفة تبتلع الصحراء.' },
  10: { name: 'Midnight Mystery', arName: 'لغز منتصف الليل', weather: 'clear', time: 'midnight', desc: 'The village sleeps. Ancient secrets awaken.', arDesc: 'القرية تنام. الأسرار القديمة تستيقظ.' },
  11: { name: 'Poultry Farm', arName: 'مزرعة الدواجن', weather: 'clear', time: 'morning', desc: 'Chickens roam freely. Collect fresh eggs.', arDesc: 'الدجاج يتجول بحرية. اجمع البيض الطازج.' },
  12: { name: 'Sheep Pasture', arName: 'مرعى الأغنام', weather: 'clear', time: 'afternoon', desc: 'Sheep graze on golden grass. Shepherds watch.', arDesc: 'الأغنام ترعى العشب الذهبي. الرعاة يراقبون.' },
  13: { name: 'Camel Caravan', arName: 'قافلة الجمال', weather: 'dust', time: 'noon', desc: 'A caravan rests at the oasis. Trade stories.', arDesc: 'قافلة تستريح عند الواحة. تبادل القصص.' },
  14: { name: 'Goat Mountain', arName: 'جبل الماعز', weather: 'windy', time: 'morning', desc: 'Mountain goats climb the rocky cliffs.', arDesc: 'الماعز الجبلية تتسلق الصخور.' },
  15: { name: 'Snowy Peak', arName: 'القمم الثلجية', weather: 'snow', time: 'dawn', desc: 'Rare snow covers the mountain village.', arDesc: 'ثلج نادر يغطي قرية الجبل.' },
  16: { name: 'Blizzard Pass', arName: 'ممر العاصفة الثلجية', weather: 'blizzard', time: 'night', desc: 'A blizzard rages. Find the safe path.', arDesc: 'عاصفة ثلجية تعصف. ابحث عن الطريق الآمن.' },
  17: { name: 'Cloudy Valley', arName: 'وادي الغيوم', weather: 'foggy', time: 'afternoon', desc: 'Clouds drift through the valley.', arDesc: 'الغيوم تتجول عبر الوادي.' },
  18: { name: 'Stormy Sea', arName: 'البحر العاصف', weather: 'thunderstorm', time: 'dusk', desc: 'Waves crash against the rocky shore.', arDesc: 'الأمواج تتصادم مع الشاطئ الصخري.' },
  19: { name: 'Desert Oasis', arName: 'واحة الصحراء', weather: 'clear', time: 'noon', desc: 'Palm trees surround the cool water pool.', arDesc: 'النخيل تحيط ببركة الماء البارد.' },
  20: { name: 'Date Plantation', arName: 'مزرعة التمر', weather: 'clear', time: 'morning', desc: 'Date palms heavy with fruit. Harvest season.', arDesc: 'نخيل التمر مثقلة بالثمار. موسم الحصاد.' },
  21: { name: 'Ancient Mosque', arName: 'المسجد القديم', weather: 'clear', time: 'dawn', desc: 'The call to prayer echoes through stone walls.', arDesc: 'الأذان يتردد عبر الجدران الحجرية.' },
  22: { name: 'School Courtyard', arName: 'ساحة المدرسة', weather: 'clear', time: 'morning', desc: 'Children learn English under the palm tree.', arDesc: 'الأطفال يتعلمون الإنجليزية تحت النخلة.' },
  23: { name: 'Majlis Gathering', arName: 'مجلس القرية', weather: 'clear', time: 'afternoon', desc: 'Elders discuss stories and wisdom.', arDesc: 'المشايخ يناقشون القصص والحكمة.' },
  24: { name: 'Pottery Workshop', arName: 'ورشة الفخار', weather: 'clear', time: 'noon', desc: 'Clay spins on the wheel. Ancient art lives.', arDesc: 'الطين يدور على الدولاب. الفن القديم يحيا.' },
  25: { name: 'Weaving House', arName: 'بيت النسيج', weather: 'clear', time: 'morning', desc: 'Looms create patterns of Omani heritage.', arDesc: 'الأنوال تنشئ أنماط التراث العماني.' },
  26: { name: 'Coffee Roastery', arName: 'محمصة القهوة', weather: 'clear', time: 'afternoon', desc: 'The scent of Omani coffee fills the air.', arDesc: 'رائحة القهوة العمانية تملأ الجو.' },
  27: { name: 'Frankincense Trail', arName: 'طريق اللبان', weather: 'dust', time: 'noon', desc: 'Follow the ancient trade route.', arDesc: 'اتبع طريق التجارة القديم.' },
  28: { name: 'Honey Apiary', arName: 'منحل العسل', weather: 'clear', time: 'morning', desc: 'Bees buzz around Sidr trees.', arDesc: 'النحل يزن حول أشجار السدر.' },
  29: { name: 'Fishing Village', arName: 'قرية الصيادين', weather: 'clear', time: 'sunset', desc: "Boats return with the day's catch.", arDesc: 'القوارب تعود بصيد اليوم.' },
  30: { name: 'Salt Flats', arName: 'سبخات الملح', weather: 'clear', time: 'noon', desc: 'Crystalline salt stretches to the horizon.', arDesc: 'ملح بلوري يمتد حتى الأفق.' },
  31: { name: 'Cave of Echoes', arName: 'كهف الأصداء', weather: 'foggy', time: 'night', desc: 'Ancient voices whisper in the darkness.', arDesc: 'أصوات قديمة تهمس في الظلام.' },
  32: { name: 'Waterfall Garden', arName: 'حديقة الشلال', weather: 'clear', time: 'morning', desc: 'Water cascades through tropical plants.', arDesc: 'الماء يتدفق عبر النباتات الاستوائية.' },
  33: { name: 'Star Observatory', arName: 'مرصد النجوم', weather: 'clear', time: 'midnight', desc: 'Ancient astronomers mapped the skies.', arDesc: 'علماء الفلك القدماء رسموا السماء.' },
  34: { name: 'Rose Garden', arName: 'حديقة الورد', weather: 'clear', time: 'sunset', desc: 'Roses of Jabal Al Akhdar bloom.', arDesc: 'ورود الجبل الأخضر تتفتح.' },
  35: { name: 'Fortress Ruins', arName: 'أطلال الحصن', weather: 'sandstorm', time: 'dusk', desc: 'An ancient fort stands against time.', arDesc: 'حصن قديم يقف في وجه الزمن.' },
  36: { name: 'The Grand Finale', arName: 'الختام العظيم', weather: 'clear', time: 'sunset', desc: 'Celebrate the journey under the palm tree.', arDesc: 'احتفل بالرحلة تحت النخلة.' },
};

const levelVocabularies: Record<number, VocabDef[]> = {
  1: [
    { word: 'Village', ar: 'القرية', x: 300, y: 200, desc: 'A small community of houses' },
    { word: 'Palm Tree', ar: 'النخلة', x: 800, y: 400, desc: 'Symbol of Oman - dates and shade' },
    { word: 'Elder', ar: 'الشيخ', x: 1200, y: 300, desc: 'Respected leader of the village' },
    { word: 'Heritage', ar: 'التراث', x: 500, y: 800, desc: 'Traditions passed through generations' },
    { word: 'Stone', ar: 'الحجر', x: 1500, y: 600, desc: 'Building material of ancient houses' },
  ],
  2: [
    { word: 'Market', ar: 'السوق', x: 400, y: 300, desc: 'Place of trade and commerce' },
    { word: 'Merchant', ar: 'التاجر', x: 900, y: 500, desc: 'One who sells goods' },
    { word: 'Trade', ar: 'التجارة', x: 1300, y: 400, desc: 'Exchange of goods' },
    { word: 'Bargain', ar: 'المساومة', x: 1600, y: 700, desc: 'Negotiating a price' },
    { word: 'Currency', ar: 'العملة', x: 700, y: 900, desc: 'Money used for exchange' },
  ],
  3: [
    { word: 'Wind', ar: 'الريح', x: 300, y: 300, desc: 'Moving air across the land' },
    { word: 'Plains', ar: 'السهول', x: 700, y: 500, desc: 'Flat open grasslands' },
    { word: 'Storm', ar: 'العاصفة', x: 1100, y: 400, desc: 'Violent weather disturbance' },
    { word: 'Dust', ar: 'الغبار', x: 1500, y: 600, desc: 'Fine particles in the air' },
    { word: 'Breeze', ar: 'النسيم', x: 500, y: 800, desc: 'Gentle wind' },
  ],
  4: [
    { word: 'Rain', ar: 'المطر', x: 300, y: 400, desc: 'Water falling from clouds' },
    { word: 'Wet', ar: 'مبلل', x: 700, y: 600, desc: 'Covered with water' },
    { word: 'Puddle', ar: 'البركة', x: 1100, y: 500, desc: 'Small pool of water' },
    { word: 'Umbrella', ar: 'المظلة', x: 1500, y: 800, desc: 'Protection from rain' },
    { word: 'Rainbow', ar: 'قوس المطر', x: 500, y: 1000, desc: 'Colorful arc after rain' },
  ],
  5: [
    { word: 'Sunset', ar: 'الغروب', x: 300, y: 400, desc: 'Sun disappearing below horizon' },
    { word: 'Golden', ar: 'ذهبي', x: 700, y: 600, desc: 'Color of precious metal' },
    { word: 'Reflection', ar: 'الانعكاس', x: 1100, y: 500, desc: 'Light bouncing off surface' },
    { word: 'Channel', ar: 'القناة', x: 1500, y: 800, desc: 'Water pathway' },
    { word: 'Evening', ar: 'المساء', x: 500, y: 1000, desc: 'Time between day and night' },
  ],
  6: [
    { word: 'Night', ar: 'الليل', x: 300, y: 400, desc: 'Darkness after sunset' },
    { word: 'Lantern', ar: 'الفانوس', x: 700, y: 600, desc: 'Portable light source' },
    { word: 'Stars', ar: 'النجوم', x: 1100, y: 500, desc: 'Distant lights in sky' },
    { word: 'Quiet', ar: 'الهدوء', x: 1500, y: 800, desc: 'Absence of noise' },
    { word: 'Moon', ar: 'القمر', x: 500, y: 1000, desc: "Earth's natural satellite" },
  ],
  7: [
    { word: 'Thunder', ar: 'الرعد', x: 300, y: 400, desc: 'Sound of lightning' },
    { word: 'Lightning', ar: 'البرق', x: 700, y: 600, desc: 'Electrical discharge in sky' },
    { word: 'Shelter', ar: 'الملجأ', x: 1100, y: 500, desc: 'Place of protection' },
    { word: 'Danger', ar: 'الخطر', x: 1500, y: 800, desc: 'Possibility of harm' },
    { word: 'Flash', ar: 'الوميض', x: 500, y: 1000, desc: 'Sudden burst of light' },
  ],
  8: [
    { word: 'Fog', ar: 'الضباب', x: 300, y: 400, desc: 'Thick cloud near ground' },
    { word: 'Mist', ar: 'السديم', x: 700, y: 600, desc: 'Light fog' },
    { word: 'Hidden', ar: 'مخفي', x: 1100, y: 500, desc: 'Concealed from view' },
    { word: 'Mystery', ar: 'اللغز', x: 1500, y: 800, desc: 'Something unexplained' },
    { word: 'Path', ar: 'الدرب', x: 500, y: 1000, desc: 'Way through fog' },
  ],
  9: [
    { word: 'Sand', ar: 'الرمال', x: 300, y: 400, desc: 'Fine grains of rock' },
    { word: 'Desert', ar: 'الصحراء', x: 700, y: 600, desc: 'Dry sandy landscape' },
    { word: 'Heat', ar: 'الحرارة', x: 1100, y: 500, desc: 'High temperature' },
    { word: 'Oasis', ar: 'الواحة', x: 1500, y: 800, desc: 'Water source in desert' },
    { word: 'Dune', ar: 'الكثيب', x: 500, y: 1000, desc: 'Hill of sand' },
  ],
  10: [
    { word: 'Midnight', ar: 'منتصف الليل', x: 300, y: 400, desc: 'Middle of the night' },
    { word: 'Secret', ar: 'السر', x: 700, y: 600, desc: 'Hidden knowledge' },
    { word: 'Ancient', ar: 'القديم', x: 1100, y: 500, desc: 'Very old' },
    { word: 'Whisper', ar: 'الهمس', x: 1500, y: 800, desc: 'Soft spoken words' },
    { word: 'Shadow', ar: 'الظل', x: 500, y: 1000, desc: 'Dark shape from light' },
  ],
  11: [
    { word: 'Chicken', ar: 'الدجاج', x: 300, y: 400, desc: 'Domestic bird for eggs' },
    { word: 'Egg', ar: 'البيضة', x: 700, y: 600, desc: 'Oval food from birds' },
    { word: 'Farm', ar: 'المزرعة', x: 1100, y: 500, desc: 'Land for agriculture' },
    { word: 'Feed', ar: 'العلف', x: 1500, y: 800, desc: 'Food for animals' },
    { word: 'Coop', ar: 'القن', x: 500, y: 1000, desc: 'House for chickens' },
  ],
  12: [
    { word: 'Sheep', ar: 'الخروف', x: 300, y: 400, desc: 'Wool-producing animal' },
    { word: 'Wool', ar: 'الصوف', x: 700, y: 600, desc: 'Fiber from sheep' },
    { word: 'Graze', ar: 'الرعي', x: 1100, y: 500, desc: 'Animals eating grass' },
    { word: 'Pasture', ar: 'المرعى', x: 1500, y: 800, desc: 'Land for grazing' },
    { word: 'Shepherd', ar: 'الراعي', x: 500, y: 1000, desc: 'One who tends sheep' },
  ],
  13: [
    { word: 'Camel', ar: 'الجمل', x: 300, y: 400, desc: 'Desert transport animal' },
    { word: 'Caravan', ar: 'القافلة', x: 700, y: 600, desc: 'Group of travelers' },
    { word: 'Oasis', ar: 'الواحة', x: 1100, y: 500, desc: 'Water in desert' },
    { word: 'Trade', ar: 'التجارة', x: 1500, y: 800, desc: 'Exchange of goods' },
    { word: 'Journey', ar: 'الرحلة', x: 500, y: 1000, desc: 'Long travel' },
  ],
  14: [
    { word: 'Goat', ar: 'الماعز', x: 300, y: 400, desc: 'Mountain climbing animal' },
    { word: 'Mountain', ar: 'الجبل', x: 700, y: 600, desc: 'High natural elevation' },
    { word: 'Climb', ar: 'التسلق', x: 1100, y: 500, desc: 'Ascend a slope' },
    { word: 'Rock', ar: 'الصخرة', x: 1500, y: 800, desc: 'Hard natural material' },
    { word: 'Horn', ar: 'القرن', x: 500, y: 1000, desc: 'Pointed growth on head' },
  ],
  15: [
    { word: 'Snow', ar: 'الثلج', x: 300, y: 400, desc: 'Frozen water crystals' },
    { word: 'Cold', ar: 'البرد', x: 700, y: 600, desc: 'Low temperature' },
    { word: 'Peak', ar: 'القمم', x: 1100, y: 500, desc: 'Top of mountain' },
    { word: 'White', ar: 'أبيض', x: 1500, y: 800, desc: 'Color of snow' },
    { word: 'Freeze', ar: 'التجمد', x: 500, y: 1000, desc: 'Turn to ice' },
  ],
  16: [
    { word: 'Blizzard', ar: 'العاصفة الثلجية', x: 300, y: 400, desc: 'Severe snow storm' },
    { word: 'Pass', ar: 'الممر', x: 700, y: 600, desc: 'Way through mountains' },
    { word: 'Survive', ar: 'البقاء', x: 1100, y: 500, desc: 'Stay alive' },
    { word: 'Warmth', ar: 'الدفء', x: 1500, y: 800, desc: 'Heat and comfort' },
    { word: 'Shelter', ar: 'الملجأ', x: 500, y: 1000, desc: 'Protection from storm' },
  ],
  17: [
    { word: 'Cloud', ar: 'الغيمة', x: 300, y: 400, desc: 'Visible mass of water' },
    { word: 'Valley', ar: 'الوادي', x: 700, y: 600, desc: 'Low land between hills' },
    { word: 'Drift', ar: 'التجول', x: 1100, y: 500, desc: 'Move slowly' },
    { word: 'Mist', ar: 'السديم', x: 1500, y: 800, desc: 'Thin fog' },
    { word: 'Sky', ar: 'السماء', x: 500, y: 1000, desc: 'Atmosphere above earth' },
  ],
  18: [
    { word: 'Sea', ar: 'البحر', x: 300, y: 400, desc: 'Large body of salt water' },
    { word: 'Wave', ar: 'الموجة', x: 700, y: 600, desc: 'Moving ridge of water' },
    { word: 'Shore', ar: 'الشاطئ', x: 1100, y: 500, desc: 'Land beside water' },
    { word: 'Rocky', ar: 'صخري', x: 1500, y: 800, desc: 'Covered with rocks' },
    { word: 'Crash', ar: 'التحطم', x: 500, y: 1000, desc: 'Violent impact' },
  ],
  19: [
    { word: 'Oasis', ar: 'الواحة', x: 300, y: 400, desc: 'Green area in desert' },
    { word: 'Pool', ar: 'البركة', x: 700, y: 600, desc: 'Small body of water' },
    { word: 'Palm', ar: 'النخلة', x: 1100, y: 500, desc: 'Tropical tree' },
    { word: 'Cool', ar: 'بارد', x: 1500, y: 800, desc: 'Moderately cold' },
    { word: 'Rest', ar: 'الراحة', x: 500, y: 1000, desc: 'Stop to relax' },
  ],
  20: [
    { word: 'Date', ar: 'التمر', x: 300, y: 400, desc: 'Sweet fruit of palm' },
    { word: 'Harvest', ar: 'الحصاد', x: 700, y: 600, desc: 'Gathering crops' },
    { word: 'Plantation', ar: 'المزرعة', x: 1100, y: 500, desc: 'Large cultivated area' },
    { word: 'Sweet', ar: 'حلو', x: 1500, y: 800, desc: 'Pleasing taste' },
    { word: 'Season', ar: 'الموسم', x: 500, y: 1000, desc: 'Period of the year' },
  ],
  21: [
    { word: 'Mosque', ar: 'المسجد', x: 300, y: 400, desc: 'Islamic place of worship' },
    { word: 'Prayer', ar: 'الصلاة', x: 700, y: 600, desc: 'Religious devotion' },
    { word: 'Minaret', ar: 'المئذنة', x: 1100, y: 500, desc: 'Tower of mosque' },
    { word: 'Call', ar: 'النداء', x: 1500, y: 800, desc: 'Invitation to prayer' },
    { word: 'Faith', ar: 'الإيمان', x: 500, y: 1000, desc: 'Strong belief' },
  ],
  22: [
    { word: 'School', ar: 'المدرسة', x: 300, y: 400, desc: 'Place of learning' },
    { word: 'Student', ar: 'الطالب', x: 700, y: 600, desc: 'One who learns' },
    { word: 'Teacher', ar: 'المعلم', x: 1100, y: 500, desc: 'One who teaches' },
    { word: 'Lesson', ar: 'الدرس', x: 1500, y: 800, desc: 'Period of teaching' },
    { word: 'Knowledge', ar: 'المعرفة', x: 500, y: 1000, desc: 'Information and skills' },
  ],
  23: [
    { word: 'Majlis', ar: 'المجلس', x: 300, y: 400, desc: 'Sitting room for guests' },
    { word: 'Gathering', ar: 'الاجتماع', x: 700, y: 600, desc: 'Group meeting' },
    { word: 'Elder', ar: 'الشيخ', x: 1100, y: 500, desc: 'Respected older person' },
    { word: 'Wisdom', ar: 'الحكمة', x: 1500, y: 800, desc: 'Deep knowledge' },
    { word: 'Story', ar: 'القصة', x: 500, y: 1000, desc: 'Narrative tale' },
  ],
  24: [
    { word: 'Pottery', ar: 'الفخار', x: 300, y: 400, desc: 'Clay vessels and art' },
    { word: 'Wheel', ar: 'الدولاب', x: 700, y: 600, desc: 'Spinning tool' },
    { word: 'Clay', ar: 'الطين', x: 1100, y: 500, desc: 'Wet earth material' },
    { word: 'Art', ar: 'الفن', x: 1500, y: 800, desc: 'Creative expression' },
    { word: 'Craft', ar: 'الحرفة', x: 500, y: 1000, desc: 'Skilled work' },
  ],
  25: [
    { word: 'Weave', ar: 'النسج', x: 300, y: 400, desc: 'Make fabric' },
    { word: 'Loom', ar: 'النول', x: 700, y: 600, desc: 'Weaving machine' },
    { word: 'Pattern', ar: 'النمط', x: 1100, y: 500, desc: 'Repeated design' },
    { word: 'Thread', ar: 'الخيط', x: 1500, y: 800, desc: 'Thin strand' },
    { word: 'Color', ar: 'اللون', x: 500, y: 1000, desc: 'Visual property' },
  ],
  26: [
    { word: 'Coffee', ar: 'القهوة', x: 300, y: 400, desc: 'Roasted bean drink' },
    { word: 'Roast', ar: 'التحميص', x: 700, y: 600, desc: 'Cook with dry heat' },
    { word: 'Aroma', ar: 'الرائحة', x: 1100, y: 500, desc: 'Pleasant smell' },
    { word: 'Bean', ar: 'الحبة', x: 1500, y: 800, desc: 'Seed of coffee' },
    { word: 'Scent', ar: 'العطر', x: 500, y: 1000, desc: 'Distinctive smell' },
  ],
  27: [
    { word: 'Frankincense', ar: 'اللبان', x: 300, y: 400, desc: 'Omani aromatic resin' },
    { word: 'Trail', ar: 'المسار', x: 700, y: 600, desc: 'Path through land' },
    { word: 'Route', ar: 'الطريق', x: 1100, y: 500, desc: 'Way to destination' },
    { word: 'Ancient', ar: 'القديم', x: 1500, y: 800, desc: 'Very old' },
    { word: 'Incense', ar: 'البخور', x: 500, y: 1000, desc: 'Fragrant smoke' },
  ],
  28: [
    { word: 'Honey', ar: 'العسل', x: 300, y: 400, desc: 'Sweet bee product' },
    { word: 'Bee', ar: 'النحلة', x: 700, y: 600, desc: 'Insect that makes honey' },
    { word: 'Hive', ar: 'الخلية', x: 1100, y: 500, desc: 'Bee home' },
    { word: 'Buzz', ar: 'الطنين', x: 1500, y: 800, desc: 'Bee sound' },
    { word: 'Sweet', ar: 'حلو', x: 500, y: 1000, desc: 'Pleasing taste' },
  ],
  29: [
    { word: 'Fish', ar: 'السمك', x: 300, y: 400, desc: 'Aquatic animal' },
    { word: 'Boat', ar: 'القارب', x: 700, y: 600, desc: 'Water vessel' },
    { word: 'Catch', ar: 'الصيد', x: 1100, y: 500, desc: 'Fish captured' },
    { word: 'Net', ar: 'الشبكة', x: 1500, y: 800, desc: 'Fishing tool' },
    { word: 'Ocean', ar: 'المحيط', x: 500, y: 1000, desc: 'Large sea' },
  ],
  30: [
    { word: 'Salt', ar: 'الملح', x: 300, y: 400, desc: 'Mineral for seasoning' },
    { word: 'Crystal', ar: 'البلورة', x: 700, y: 600, desc: 'Solid geometric form' },
    { word: 'Flat', ar: 'مسطح', x: 1100, y: 500, desc: 'Level surface' },
    { word: 'Horizon', ar: 'الأفق', x: 1500, y: 800, desc: 'Line where earth meets sky' },
    { word: 'Mineral', ar: 'المعدن', x: 500, y: 1000, desc: 'Natural substance' },
  ],
  31: [
    { word: 'Cave', ar: 'الكهف', x: 300, y: 400, desc: 'Natural underground space' },
    { word: 'Echo', ar: 'الصدى', x: 700, y: 600, desc: 'Reflected sound' },
    { word: 'Dark', ar: 'الظلام', x: 1100, y: 500, desc: 'Absence of light' },
    { word: 'Whisper', ar: 'الهمس', x: 1500, y: 800, desc: 'Soft voice' },
    { word: 'Ancient', ar: 'القديم', x: 500, y: 1000, desc: 'Very old' },
  ],
  32: [
    { word: 'Waterfall', ar: 'الشلال', x: 300, y: 400, desc: 'Falling water' },
    { word: 'Garden', ar: 'الحديقة', x: 700, y: 600, desc: 'Cultivated plants' },
    { word: 'Cascade', ar: 'الشلالات', x: 1100, y: 500, desc: 'Small waterfall' },
    { word: 'Tropical', ar: 'استوائي', x: 1500, y: 800, desc: 'Hot climate' },
    { word: 'Green', ar: 'أخضر', x: 500, y: 1000, desc: 'Color of plants' },
  ],
  33: [
    { word: 'Star', ar: 'النجمة', x: 300, y: 400, desc: 'Distant sun' },
    { word: 'Observatory', ar: 'المرصد', x: 700, y: 600, desc: 'Building for astronomy' },
    { word: 'Astronomer', ar: 'عالم الفلك', x: 1100, y: 500, desc: 'Star scientist' },
    { word: 'Map', ar: 'الخريطة', x: 1500, y: 800, desc: 'Chart of stars' },
    { word: 'Sky', ar: 'السماء', x: 500, y: 1000, desc: 'Above earth' },
  ],
  34: [
    { word: 'Rose', ar: 'الوردة', x: 300, y: 400, desc: 'Beautiful flower' },
    { word: 'Bloom', ar: 'التفتح', x: 700, y: 600, desc: 'Open flower' },
    { word: 'Fragrance', ar: 'العطر', x: 1100, y: 500, desc: 'Pleasant smell' },
    { word: 'Petal', ar: 'البتلة', x: 1500, y: 800, desc: 'Flower part' },
    { word: 'Garden', ar: 'الحديقة', x: 500, y: 1000, desc: 'Cultivated area' },
  ],
  35: [
    { word: 'Fortress', ar: 'الحصن', x: 300, y: 400, desc: 'Strong building for defense' },
    { word: 'Ruin', ar: 'الأطلال', x: 700, y: 600, desc: 'Destroyed building' },
    { word: 'Defense', ar: 'الدفاع', x: 1100, y: 500, desc: 'Protection from attack' },
    { word: 'History', ar: 'التاريخ', x: 1500, y: 800, desc: 'Past events' },
    { word: 'Time', ar: 'الزمن', x: 500, y: 1000, desc: 'Passing of moments' },
  ],
  36: [
    { word: 'Journey', ar: 'الرحلة', x: 300, y: 400, desc: 'Long travel' },
    { word: 'Celebrate', ar: 'الاحتفال', x: 700, y: 600, desc: 'Mark an occasion' },
    { word: 'Complete', ar: 'الإكمال', x: 1100, y: 500, desc: 'Finish fully' },
    { word: 'Memory', ar: 'الذكرى', x: 1500, y: 800, desc: 'Recollection' },
    { word: 'Victory', ar: 'النصر', x: 500, y: 1000, desc: 'Winning achievement' },
  ],
};

// ===================== LEVEL NPCs =====================
const levelNPCDefs: Record<number, NPCDef[]> = {
  1: [
    { name: 'Sheikh Abdullah', arName: 'الشيخ عبدالله', x: 900, y: 500, color: '#d4a843', dialogues: [
      { ar: 'أهلاً وسهلاً في قرية القرواشية! هذه القرية عمرها أكثر من 500 سنة.', en: 'Welcome to Al-Qarwashiya! This village is over 500 years old.' },
      { ar: 'انظر حولك... النخيل، البيوت الحجرية، والفلج. هذا هو عُمان الحقيقي.', en: 'Look around... palm trees, stone houses, and the falaj. This is the real Oman.' },
      { ar: 'اجمع المفردات المبعثرة في القرية. كل كلمة تحمل قصة من تراثنا.', en: 'Collect the scattered vocabulary words. Each word carries a story from our heritage.' },
    ]},
    { name: 'Thuraya', arName: 'ثريا', x: 400, y: 700, color: '#8b1a3a', dialogues: [
      { ar: 'مرحباً! أنا ثريا. أكتب رواية عن هذه القرية الجميلة.', en: 'Hello! I am Thuraya. I am writing a novel about this beautiful village.' },
      { ar: 'هل رأيت النخلة الكبيرة؟ تحتها تجد أجمل الذكريات.', en: 'Have you seen the big palm tree? Under it, you find the most beautiful memories.' },
    ]},
    { name: 'Yara', arName: 'يارا', x: 1400, y: 400, color: '#d63384', dialogues: [
      { ar: 'أنا يارا! أحب استكشاف القرية مع أصدقائي.', en: 'I am Yara! I love exploring the village with my friends.' },
      { ar: 'الشيخ عبدالله يعرف كل شيء عن تاريخ القرية. اسأله!', en: 'Sheikh Abdullah knows everything about the village history. Ask him!' },
    ]},
  ],
  2: [
    { name: 'Merchant Ali', arName: 'التاجر علي', x: 800, y: 450, color: '#d4a843', dialogues: [
      { ar: 'مرحباً يا مسافر! عندي أفضل البضائع في السوق.', en: 'Welcome traveler! I have the best goods in the market.' },
      { ar: 'الصباح الباكر هو أفضل وقت للتسوق. الأسعار منخفضة!', en: 'Early morning is the best time for shopping. Prices are low!' },
    ]},
  ],
  3: [
    { name: 'Wind Whisperer', arName: 'همس الرياح', x: 600, y: 400, color: '#00d4aa', dialogues: [
      { ar: 'الرياح تحمل أسراراً قديمة. استمع إليها!', en: 'The winds carry ancient secrets. Listen to them!' },
      { ar: 'في السهول المفتوحة، الرياح هي ملكتنا.', en: 'In the open plains, the wind is our queen.' },
    ]},
  ],
  4: [
    { name: 'Rain Dancer', arName: 'راقص المطر', x: 700, y: 500, color: '#00d4aa', dialogues: [
      { ar: 'المطر نعمة من السماء. نحتفل به!', en: 'Rain is a blessing from the sky. We celebrate it!' },
      { ar: 'انظر كيف تتلألأ قطرات المطر على النخيل.', en: 'See how raindrops sparkle on the palm trees.' },
    ]},
  ],
  5: [
    { name: 'Sunset Poet', arName: 'شاعر الغروب', x: 1200, y: 600, color: '#d4a843', dialogues: [
      { ar: 'الغروب هنا يشبه اللوحة الذهبية. انظر!', en: 'The sunset here is like a golden painting. Look!' },
      { ar: 'عندما تغرب الشمس، تبدأ الحكايات.', en: 'When the sun sets, the stories begin.' },
    ]},
  ],
  6: [
    { name: 'Night Guardian', arName: 'حارس الليل', x: 500, y: 500, color: '#8b1a3a', dialogues: [
      { ar: 'القرية تنام، لكن الأسرار تستيقظ.', en: 'The village sleeps, but secrets awaken.' },
      { ar: 'الفوانيس تضيء الطريق للمسافرين.', en: 'Lanterns light the way for travelers.' },
    ]},
  ],
  7: [
    { name: 'Storm Chaser', arName: 'مطارد العواصف', x: 800, y: 600, color: '#00d4aa', dialogues: [
      { ar: 'العاصفة قادمة! ابحث عن ملجأ!', en: 'The storm is coming! Find shelter!' },
      { ar: 'البرق يشق السماء كسيف ذهبي.', en: 'Lightning splits the sky like a golden sword.' },
    ]},
  ],
  8: [
    { name: 'Fog Walker', arName: 'سائر الضباب', x: 600, y: 400, color: '#a09080', dialogues: [
      { ar: 'الضباب يخفي الأشياء ويكشف أسراراً.', en: 'Fog hides things and reveals secrets.' },
      { ar: 'في الضباب، كل صوت يصدى بشكل مختلف.', en: 'In fog, every sound echoes differently.' },
    ]},
  ],
  9: [
    { name: 'Desert Nomad', arName: 'بدو الصحراء', x: 900, y: 700, color: '#d4a843', dialogues: [
      { ar: 'عاصفة الرمال تغطي كل شيء! احمِ نفسك!', en: 'The sandstorm covers everything! Protect yourself!' },
      { ar: 'الصحراء جميلة لكنها قاسية.', en: 'The desert is beautiful but harsh.' },
    ]},
  ],
  10: [
    { name: 'Midnight Sage', arName: 'حكيم منتصف الليل', x: 1000, y: 900, color: '#8b1a3a', dialogues: [
      { ar: 'في منتصف الليل، تتكشف الأسرار.', en: 'At midnight, secrets are revealed.' },
      { ar: 'أنا أعرف قصصاً لم يسمعها أحد منذ قرون.', en: 'I know stories no one has heard for centuries.' },
    ]},
  ],
  11: [
    { name: 'Farmer Khalid', arName: 'الفلاح خالد', x: 600, y: 500, color: '#d4a843', dialogues: [
      { ar: 'الدجاج يبيض كل صباح. انظر إلى البيض الطازج!', en: 'The chickens lay eggs every morning. Look at the fresh eggs!' },
      { ar: 'الدواجن مصدر رزقنا. نعتني بها جيداً.', en: 'Poultry is our livelihood. We take good care of them.' },
    ]},
  ],
  12: [
    { name: 'Shepherd Omar', arName: 'الراعي عمر', x: 800, y: 600, color: '#d4a843', dialogues: [
      { ar: 'الأغنام ترعى على العشب الذهبي. منظر جميل!', en: 'The sheep graze on golden grass. A beautiful sight!' },
      { ar: 'الصوف من أغنامنا يصنع أفضل الملابس.', en: 'Wool from our sheep makes the best clothes.' },
    ]},
  ],
  13: [
    { name: 'Caravan Leader', arName: 'زعيم القافلة', x: 1000, y: 700, color: '#d4a843', dialogues: [
      { ar: 'الجمال تستريح في الواحة. حان وقت الشاي!', en: 'The camels rest at the oasis. Tea time!' },
      { ar: 'قافلتنا تجوب الصحراء منذ أجيال.', en: 'Our caravan has crossed the desert for generations.' },
    ]},
  ],
  14: [
    { name: 'Mountain Guide', arName: 'دليل الجبل', x: 700, y: 500, color: '#00d4aa', dialogues: [
      { ar: 'الماعز تتسلق الصخور بسهولة. انظر!', en: 'The goats climb rocks with ease. Look!' },
      { ar: 'الجبل يحمل أسراراً قديمة.', en: 'The mountain holds ancient secrets.' },
    ]},
  ],
  15: [
    { name: 'Snow Elder', arName: 'شيخ الثلج', x: 600, y: 400, color: '#a09080', dialogues: [
      { ar: 'الثلج نادر هنا. نحتفل به!', en: 'Snow is rare here. We celebrate it!' },
      { ar: 'القمم البيضاء تذكرنا بجمال الطبيعة.', en: "White peaks remind us of nature's beauty." },
    ]},
  ],
  16: [
    { name: 'Blizzard Survivor', arName: 'ناجي العاصفة', x: 800, y: 600, color: '#00d4aa', dialogues: [
      { ar: 'العاصفة الثلجية خطيرة! ابحث عن الملجأ!', en: 'The blizzard is dangerous! Find shelter!' },
      { ar: 'الثلج يغطي كل شيء. لا تضع!', en: 'Snow covers everything. Do not get lost!' },
    ]},
  ],
  17: [
    { name: 'Cloud Dreamer', arName: 'حالم الغيوم', x: 700, y: 500, color: '#a09080', dialogues: [
      { ar: 'الغيوم تتجول عبر الوادي كأبرياء.', en: 'Clouds wander through the valley like innocents.' },
      { ar: 'كل غيمة تحمل حلماً.', en: 'Every cloud carries a dream.' },
    ]},
  ],
  18: [
    { name: 'Sea Captain', arName: 'الكابتن البحري', x: 900, y: 600, color: '#00d4aa', dialogues: [
      { ar: 'الأمواج تتصادم مع الشاطئ. قوية!', en: 'The waves crash against the shore. Powerful!' },
      { ar: 'البحر يعطي ويأخذ.', en: 'The sea gives and takes.' },
    ]},
  ],
  19: [
    { name: 'Oasis Keeper', arName: 'حارس الواحة', x: 800, y: 500, color: '#d4a843', dialogues: [
      { ar: 'الواحة هي الحياة في الصحراء. الماء والظل.', en: 'The oasis is life in the desert. Water and shade.' },
      { ar: 'النخيل تحمي الواحة من الشمس القاسية.', en: 'Palm trees protect the oasis from the harsh sun.' },
    ]},
  ],
  20: [
    { name: 'Date Farmer', arName: 'فلاح التمر', x: 700, y: 600, color: '#d4a843', dialogues: [
      { ar: 'موسم الحصاد! التمر ناضج وجميل.', en: 'Harvest season! The dates are ripe and beautiful.' },
      { ar: 'نخيلنا تعطي أجود أنواع التمر.', en: 'Our palms give the finest dates.' },
    ]},
  ],
  21: [
    { name: 'Imam', arName: 'الإمام', x: 900, y: 600, color: '#d4a843', dialogues: [
      { ar: 'الأذان يتردد في المسجد القديم. سلام.', en: 'The call to prayer echoes in the old mosque. Peace.' },
      { ar: 'المسجد هو قلب القرية.', en: 'The mosque is the heart of the village.' },
    ]},
  ],
  22: [
    { name: 'Teacher John', arName: 'المعلم جون', x: 600, y: 400, color: '#00d4aa', dialogues: [
      { ar: 'أهلاً بك في مدرسة القرواشية! هنا نعلم الأطفال.', en: 'Welcome to Al-Qarwashiya School! Here we teach children.' },
      { ar: 'اللغة الإنجليزية تفتح أبواباً جديدة.', en: 'English opens new doors.' },
    ]},
  ],
  23: [
    { name: 'Village Elder', arName: 'شيخ القرية', x: 800, y: 500, color: '#d4a843', dialogues: [
      { ar: 'المجلس هو مكان الحكمة والقصص.', en: 'The Majlis is the place of wisdom and stories.' },
      { ar: 'كل قصة تحمل درساً.', en: 'Every story carries a lesson.' },
    ]},
  ],
  24: [
    { name: 'Potter', arName: 'الخزاف', x: 700, y: 600, color: '#d4a843', dialogues: [
      { ar: 'الطين يتحول إلى فن بأيدينا.', en: 'Clay turns into art with our hands.' },
      { ar: 'كل قطعة فخار تحمل روحاً.', en: 'Every pottery piece carries a soul.' },
    ]},
  ],
  25: [
    { name: 'Weaver', arName: 'النساجة', x: 600, y: 500, color: '#d4a843', dialogues: [
      { ar: 'الأنوال تنشئ أنماطاً جميلة.', en: 'The looms create beautiful patterns.' },
      { ar: 'كل نمط يحكي قصة.', en: 'Every pattern tells a story.' },
    ]},
  ],
  26: [
    { name: 'Coffee Master', arName: 'سيد القهوة', x: 700, y: 500, color: '#d4a843', dialogues: [
      { ar: 'قهوتنا العمانية مشهورة في كل العالم.', en: 'Our Omani coffee is famous worldwide.' },
      { ar: 'القهوة تجمع الناس.', en: 'Coffee brings people together.' },
    ]},
  ],
  27: [
    { name: 'Incense Trader', arName: 'تاجر اللبان', x: 800, y: 600, color: '#d4a843', dialogues: [
      { ar: 'اللبان العماني أغلى من الذهب.', en: 'Omani frankincense is worth more than gold.' },
      { ar: 'اتبع طريق التجارة القديم.', en: 'Follow the ancient trade route.' },
    ]},
  ],
  28: [
    { name: 'Beekeeper', arName: 'نحال العسل', x: 600, y: 500, color: '#d4a843', dialogues: [
      { ar: 'النحل يصنع العسل من زهور السدر.', en: 'Bees make honey from Sidr flowers.' },
      { ar: 'عسل السدر هو أفضل أنواع العسل.', en: 'Sidr honey is the best kind of honey.' },
    ]},
  ],
  29: [
    { name: 'Fisherman', arName: 'الصياد', x: 900, y: 600, color: '#00d4aa', dialogues: [
      { ar: 'القوارب تعود بالصيد. يوم جيد!', en: 'The boats return with the catch. A good day!' },
      { ar: 'البحر يعطي بسخاء.', en: 'The sea gives generously.' },
    ]},
  ],
  30: [
    { name: 'Salt Collector', arName: 'جامع الملح', x: 700, y: 500, color: '#a09080', dialogues: [
      { ar: 'الملح البلوري يمتد حتى الأفق.', en: 'Crystalline salt stretches to the horizon.' },
      { ar: 'الملح هو كنز الصحراء.', en: 'Salt is the treasure of the desert.' },
    ]},
  ],
  31: [
    { name: 'Cave Explorer', arName: 'مستكشف الكهف', x: 800, y: 600, color: '#00d4aa', dialogues: [
      { ar: 'الكهف يحمل أصداء الماضي.', en: 'The cave holds echoes of the past.' },
      { ar: 'استمع... هل تسمع الأصوات القديمة؟', en: 'Listen... do you hear the ancient voices?' },
    ]},
  ],
  32: [
    { name: 'Garden Keeper', arName: 'حارس الحديقة', x: 700, y: 500, color: '#00d4aa', dialogues: [
      { ar: 'الشلال يغني أغنية الحياة.', en: 'The waterfall sings the song of life.' },
      { ar: 'الحديقة الاستوائية هي جنة صغيرة.', en: 'The tropical garden is a small paradise.' },
    ]},
  ],
  33: [
    { name: 'Astronomer', arName: 'عالم الفلك', x: 800, y: 600, color: '#a09080', dialogues: [
      { ar: 'النجوم تحكي قصصاً منذ آلاف السنين.', en: 'The stars have told stories for thousands of years.' },
      { ar: 'انظر إلى السماء... كم نجمة ترى؟', en: 'Look at the sky... how many stars do you see?' },
    ]},
  ],
  34: [
    { name: 'Rose Gardener', arName: 'بستاني الورد', x: 600, y: 500, color: '#d63384', dialogues: [
      { ar: 'ورود الجبل الأخضر تفتح في الغروب.', en: 'The roses of Jabal Al Akhdar bloom at sunset.' },
      { ar: 'رائحة الورد تملأ الهواء.', en: 'The scent of roses fills the air.' },
    ]},
  ],
  35: [
    { name: 'Fortress Guardian', arName: 'حارس الحصن', x: 900, y: 700, color: '#8b1a3a', dialogues: [
      { ar: 'الحصن القديم يقف شامخاً في وجه الزمن.', en: 'The ancient fort stands tall against time.' },
      { ar: 'هنا دافع أجدادنا عن أرضهم.', en: 'Here our ancestors defended their land.' },
    ]},
  ],
  36: [
    { name: 'Thuraya', arName: 'ثريا', x: 700, y: 600, color: '#d4a843', dialogues: [
      { ar: 'أنا فخورة بك! لقد أكملتَ جميع المستويات الـ 36.', en: 'I am proud of you! You have completed all 36 levels.' },
      { ar: 'الآن أنت تعرف الكثير عن تراث عُمان وثقافتها. استمر في التعلم!', en: 'Now you know a lot about Omani heritage and culture. Keep learning!' },
      { ar: 'شكراً لك على هذه الرحلة الرائعة تحت النخلة.', en: 'Thank you for this wonderful journey Under the Palm Tree.' },
    ]},
  ],
};

// ===================== LEVEL GENERATION =====================
interface LevelData {
  num: number; name: string; arName: string; desc: string; arDesc: string;
  width: number; height: number;
  weather: WeatherDef; time: TimeDef;
  buildings: Building[]; grass: GrassPatch[]; palms: PalmTree[];
  animals: Animal[]; particles: Particle[]; clouds: Cloud[]; orbs: LightOrb[];
  falaj: { x: number; y: number; w: number; h: number }[];
  lanterns: { x: number; y: number; flicker: number; size: number; color: string }[];
  vocab: VocabDef[]; npcs: NPCDef[]; items: ItemDef[];
  exit: { x: number; y: number; w: number; h: number };
}

function generateLevel(levelNum: number): LevelData {
  const theme = levelThemes[levelNum];
  const weather = weatherTypes[theme.weather];
  const time = timeModes[theme.time];
  const w = 2400;
  const h = 1800;

  const buildings: Building[] = [];
  const buildingTypes = ['house', 'house', 'house', 'shop', 'school', 'barn', 'well', 'tower'];
  if (levelNum === 21) buildingTypes.push('mosque', 'mosque');
  if (levelNum === 22) buildingTypes.push('school', 'school');
  if (levelNum === 23) buildingTypes.push('house', 'house');
  if (levelNum === 29) buildingTypes.push('shop', 'shop');
  if (levelNum === 35) buildingTypes.push('tower', 'tower');

  const rows = 5 + Math.floor(levelNum / 5);
  const cols = 6 + Math.floor(levelNum / 6);
  const cellW = w / cols;
  const cellH = h / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.3) {
        const bx = c * cellW + 20 + Math.random() * (cellW - 200);
        const by = r * cellH + 20 + Math.random() * (cellH - 180);
        const bw = 120 + Math.random() * 80;
        const bh = 100 + Math.random() * 80;
        const btype = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
        const bname = btype === 'mosque' ? 'Mosque' : btype === 'school' ? 'School' : btype === 'shop' ? 'Shop' : 'House';
        const bnameAr = btype === 'mosque' ? 'مسجد' : btype === 'school' ? 'مدرسة' : btype === 'shop' ? 'متجر' : 'بيت';
        buildings.push(new Building(bx, by, bw, bh, btype, bname, bnameAr, btype === 'house' || btype === 'mosque' ? { type: btype } : null));
      }
    }
  }

  if (levelNum === 21) {
    buildings.push(new Building(w / 2 - 100, h / 2 - 80, 200, 160, 'mosque', 'Grand Mosque', 'المسجد الكبير', { type: 'mosque' }));
  }

  const grass: GrassPatch[] = [];
  const grassCount = 200 + Math.floor(Math.random() * 200);
  for (let i = 0; i < grassCount; i++) {
    const gx = Math.random() * w;
    const gy = Math.random() * h;
    let inside = false;
    for (const b of buildings) {
      if (gx > b.x - 30 && gx < b.x + b.w + 30 && gy > b.y - 30 && gy < b.y + b.h + 30) { inside = true; break; }
    }
    if (!inside) grass.push(new GrassPatch(gx, gy, Math.random() > 0.7 ? 'tall' : 'grass'));
  }

  const palms: PalmTree[] = [];
  const palmCount = 15 + Math.floor(Math.random() * 20);
  for (let i = 0; i < palmCount; i++) {
    const px = Math.random() * w;
    const py = Math.random() * h;
    let inside = false;
    for (const b of buildings) {
      if (px > b.x - 50 && px < b.x + b.w + 50 && py > b.y - 50 && py < b.y + b.h + 50) { inside = true; break; }
    }
    if (!inside) palms.push(new PalmTree(px, py, 50 + Math.random() * 60));
  }

  const animals: Animal[] = [];
  if (levelNum === 11) for (let i = 0; i < 15; i++) animals.push(new Animal(Math.random() * w, Math.random() * h, 'chicken'));
  if (levelNum === 12) for (let i = 0; i < 10; i++) animals.push(new Animal(Math.random() * w, Math.random() * h, 'sheep'));
  if (levelNum === 13) for (let i = 0; i < 5; i++) animals.push(new Animal(Math.random() * w, Math.random() * h, 'camel'));
  if (levelNum === 14) for (let i = 0; i < 8; i++) animals.push(new Animal(Math.random() * w, Math.random() * h, 'goat'));

  const particles: Particle[] = [];
  const particleCount = weather.rain > 0 ? 200 : weather.snow > 0 ? 150 : weather.sand > 0 ? 300 : 50;
  for (let i = 0; i < particleCount; i++) {
    let type = 'rain';
    if (weather.snow > 0) type = 'snow';
    if (weather.sand > 0) type = 'sand';
    if (weather.rain === 0 && weather.snow === 0 && weather.sand === 0) type = 'leaf';
    particles.push(new Particle(Math.random() * w, Math.random() * h, type));
  }

  const clouds: Cloud[] = [];
  if (weather.fog > 0 || weather.rain > 0) {
    for (let i = 0; i < 8 + Math.floor(weather.fog * 10); i++) {
      clouds.push(new Cloud(Math.random() * w, 50 + Math.random() * 150, 40 + Math.random() * 60));
    }
  }

  const orbs: LightOrb[] = [];
  if (time.light < 0.4) {
    for (let i = 0; i < 20; i++) {
      orbs.push(new LightOrb(Math.random() * w, Math.random() * h, Math.random() > 0.5 ? '#00d4aa' : '#d4a843'));
    }
  }

  const falaj = levelNum % 3 === 0
    ? [
        { x: 0, y: h * 0.5, w, h: 40 },
        { x: w * 0.5, y: h * 0.5, w: 40, h: h * 0.5 },
      ]
    : [];

  const lanterns: LevelData['lanterns'] = [];
  if (time.light < 0.5) {
    for (let i = 0; i < 30; i++) {
      lanterns.push({
        x: Math.random() * w, y: Math.random() * h,
        flicker: Math.random() * Math.PI * 2,
        size: 3 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#d4a843' : '#ff6b35',
      });
    }
  }

  return {
    num: levelNum,
    name: theme.name,
    arName: theme.arName,
    desc: theme.desc,
    arDesc: theme.arDesc,
    width: w, height: h,
    weather, time,
    buildings, grass, palms, animals, particles, clouds, orbs, falaj, lanterns,
    vocab: (levelVocabularies[levelNum] || []).map((v) => ({ ...v, collected: false })),
    npcs: (levelNPCDefs[levelNum] || []).map((n) => ({ ...n, met: false })),
    items: [
      { name: 'Ancient Key', arName: 'المفتاح القديم', x: Math.random() * w * 0.8 + 100, y: Math.random() * h * 0.8 + 100, type: 'key', collected: false },
      { name: 'Omani Coin', arName: 'عملة عمانية', x: Math.random() * w * 0.8 + 100, y: Math.random() * h * 0.8 + 100, type: 'item', collected: false },
    ],
    exit: { x: w - 80, y: h - 100, w: 60, h: 80 },
  };
}

// ===================== REACT COMPONENT =====================
type Screen = 'start' | 'playing' | 'dialogue' | 'transition' | 'win';

interface PlayerState {
  x: number; y: number; width: number; height: number; speed: number;
  dir: string; frame: number; frameTime: number; moving: boolean;
  insideBuilding: boolean; currentBuilding: Building | null;
}

interface TransitionInfo { level: number; desc: string; vocab: number; items: number; npcs: number }

interface GameApi {
  startLevel: (n: number) => void;
  nextLevel: () => void;
  nextDialogue: () => void;
  restart: () => void;
  action: () => void;
  touchInput: Record<string, boolean>;
}

export default function QarwashiyaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<GameApi | null>(null);

  const [screen, setScreen] = useState<Screen>('start');
  const [hudLevel, setHudLevel] = useState('1 / ' + TOTAL_LEVELS);
  const [mission, setMission] = useState('Explore the village');
  const [chips, setChips] = useState<string[]>([]);
  const [dialogue, setDialogue] = useState<DialogueLine | null>(null);
  const [quest, setQuest] = useState<{ msg: string; id: number } | null>(null);
  const [trans, setTrans] = useState<TransitionInfo | null>(null);
  const [winVocab, setWinVocab] = useState<VocabDef[]>([]);
  const [startLevelNum, setStartLevelNum] = useState(1);

  const progress = useGameStore(
    (s) => (s.games as Record<string, GameProgress | undefined>)['qarwashiya'],
  );
  const recordResult = useGameStore((s) => s.recordResult);
  const recordRef = useRef(recordResult);
  recordRef.current = recordResult;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- mutable game state ----
    let gameState: Screen = 'start';
    let currentLevel = 1;
    let frameCount = 0;
    let lastTime = 0;
    let timeOfDay = 0.5;
    let dayNightCycle = true;
    const cycleSpeed = 0.0002;
    let windStrength = 0.5;
    let lightningFlash = 0;
    let rafId = 0;
    let disposed = false;

    const player: PlayerState = {
      x: 100, y: 100, width: 24, height: 24, speed: 140,
      dir: 'down', frame: 0, frameTime: 0, moving: false,
      insideBuilding: false, currentBuilding: null,
    };
    const keys: Record<string, boolean> = {};
    const touchInput: Record<string, boolean> = { up: false, down: false, left: false, right: false };
    const camera = { x: 0, y: 0 };

    let vocabCollected: VocabDef[] = [];
    let itemsFound: ItemDef[] = [];
    let npcsMet: NPCDef[] = [];
    let levelVocab: VocabDef[] = [];
    let levelItems: ItemDef[] = [];
    let levelNPCsMet: NPCDef[] = [];
    let dialogueQueue: DialogueLine[] = [];
    let dialogueIndex = 0;
    let currentLevelData: LevelData | null = null;
    let questTimer: ReturnType<typeof setTimeout> | null = null;

    const setState = (s: Screen) => { gameState = s; if (!disposed) setScreen(s); };

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    }

    function showQuest(msg: string) {
      if (questTimer) clearTimeout(questTimer);
      if (!disposed) setQuest({ msg, id: Date.now() });
      questTimer = setTimeout(() => { if (!disposed) setQuest(null); }, 3000);
    }

    function updateDialogueUI() {
      const d = dialogueQueue[dialogueIndex];
      if (!disposed) setDialogue(d ?? null);
    }

    function showDialogue(npc: NPCDef) {
      setState('dialogue');
      dialogueQueue = [...npc.dialogues];
      dialogueIndex = 0;
      updateDialogueUI();
    }

    function nextDialogue() {
      dialogueIndex++;
      if (dialogueIndex < dialogueQueue.length) {
        updateDialogueUI();
      } else {
        closeDialogue();
      }
    }

    function closeDialogue() {
      setState('playing');
      if (!disposed) setDialogue(null);
      dialogueQueue = [];
      dialogueIndex = 0;
    }

    function updateVocabUI() {
      if (!disposed) setChips(vocabCollected.map((v) => v.word));
    }

    function checkLevelComplete() {
      const lvl = currentLevelData;
      if (!lvl) return;
      const vocabNeeded = Math.min(3, lvl.vocab.length);
      const itemsNeeded = Math.min(1, lvl.items.length);
      const npcsNeeded = Math.min(1, lvl.npcs.length);
      if (levelVocab.length >= vocabNeeded && levelItems.length >= itemsNeeded && levelNPCsMet.length >= npcsNeeded) {
        showQuest('Level Complete! Find the exit.');
      }
    }

    function collectVocab(vocab: VocabDef) {
      if (!vocabCollected.find((v) => v.word === vocab.word)) {
        vocabCollected.push(vocab);
        levelVocab.push(vocab);
        showQuest('Collected: ' + vocab.word + ' = ' + vocab.ar);
        updateVocabUI();
        checkLevelComplete();
      }
    }

    function collectItem(item: ItemDef) {
      if (!itemsFound.find((i) => i.name === item.name)) {
        itemsFound.push(item);
        levelItems.push(item);
        showQuest('Found: ' + item.name + ' (' + item.arName + ')');
        checkLevelComplete();
      }
    }

    function meetNPC(npc: NPCDef) {
      if (!npcsMet.find((n) => n.name === npc.name)) {
        npcsMet.push(npc);
        levelNPCsMet.push(npc);
      }
      showDialogue(npc);
    }

    function startLevel(levelNum: number) {
      currentLevel = levelNum;
      currentLevelData = generateLevel(levelNum);

      player.x = 100;
      player.y = 100;
      player.insideBuilding = false;

      levelVocab = [];
      levelItems = [];
      levelNPCsMet = [];

      if (!disposed) {
        setHudLevel(levelNum + ' / ' + TOTAL_LEVELS);
        setMission(currentLevelData.name);
      }
      setState('playing');
      showQuest(currentLevelData.name + ' | ' + currentLevelData.arName);
    }

    function showLevelTransition() {
      setState('transition');
      const lvl = currentLevelData;
      if (!lvl) return;
      if (!disposed) {
        setTrans({
          level: currentLevel,
          desc: lvl.desc + ' | ' + lvl.arDesc,
          vocab: levelVocab.length,
          items: levelItems.length,
          npcs: levelNPCsMet.length,
        });
      }
      // Persist to hub store (guarded — never break the game if store shape differs)
      try {
        const totalVocab = lvl.vocab.length;
        const stars = Math.min(
          3,
          1 + (levelVocab.length >= totalVocab ? 1 : 0) + (levelItems.length >= lvl.items.length ? 1 : 0),
        );
        const score = levelVocab.length * 100 + levelItems.length * 150 + levelNPCsMet.length * 100;
        recordRef.current(QW_ID, currentLevel, score, stars);
      } catch {
        /* store unavailable */
      }
    }

    function nextLevel() {
      if (!disposed) setTrans(null);
      if (currentLevel < TOTAL_LEVELS) {
        startLevel(currentLevel + 1);
      } else {
        showWinScreen();
      }
    }

    function showWinScreen() {
      setState('win');
      if (!disposed) setWinVocab([...vocabCollected]);
    }

    function restartGame() {
      vocabCollected = [];
      itemsFound = [];
      npcsMet = [];
      currentLevelData = null;
      if (!disposed) {
        setWinVocab([]);
        setTrans(null);
      }
      updateVocabUI();
      setState('start');
    }

    // ===================== RENDERING =====================
    function drawFalaj(c: CanvasRenderingContext2D, fl: LevelData['falaj']) {
      fl.forEach((f) => {
        c.fillStyle = '#0d2a2a';
        c.fillRect(f.x, f.y, f.w, f.h);
        c.fillStyle = 'rgba(0, 212, 170, 0.3)';
        c.fillRect(f.x + 5, f.y + 8, f.w - 10, f.h - 16);
        c.fillStyle = 'rgba(0, 212, 170, 0.5)';
        c.fillRect(f.x + 10, f.y + 12, f.w - 20, f.h - 24);
        c.strokeStyle = 'rgba(0, 255, 200, 0.4)';
        c.lineWidth = 1;
        for (let i = 0; i < f.w; i += 30) {
          c.beginPath();
          c.moveTo(f.x + i + (Date.now() / 50) % 30, f.y + 15);
          c.lineTo(f.x + i + 15 + (Date.now() / 50) % 30, f.y + f.h - 15);
          c.stroke();
        }
      });
    }

    function drawSky(c: CanvasRenderingContext2D, timeMode: TimeDef, lightLevel: number, w: number, h: number) {
      c.fillStyle = timeMode.sky;
      c.fillRect(0, 0, w, h);

      if (lightLevel < 0.3) {
        c.fillStyle = '#fff';
        for (let i = 0; i < 150; i++) {
          const sx = (i * 137.5 + 1000) % w;
          const sy = (i * 73.3 + 500) % (h * 0.5);
          const twinkle = Math.sin(Date.now() / 1000 + i) * 0.5 + 0.5;
          c.globalAlpha = twinkle * 0.8;
          c.fillRect(sx, sy, 1 + (i % 2), 1 + (i % 2));
        }
        c.globalAlpha = 1;
      }

      if (lightLevel > 0.4) {
        const sunAngle = (timeOfDay - 0.25) * Math.PI * 2;
        const sunX = Math.cos(sunAngle) * 600 + w / 2;
        const sunY = Math.sin(sunAngle) * 300 + 200;
        if (sunY > 0) {
          c.fillStyle = 'rgba(255, 220, 100, 0.8)';
          c.shadowColor = '#ffd700';
          c.shadowBlur = 30;
          c.beginPath();
          c.arc(sunX, sunY, 30, 0, Math.PI * 2);
          c.fill();
          c.shadowBlur = 0;
          c.strokeStyle = 'rgba(255, 220, 100, 0.2)';
          c.lineWidth = 2;
          for (let i = 0; i < 8; i++) {
            const rayAngle = ((Math.PI * 2) / 8) * i + Date.now() / 5000;
            c.beginPath();
            c.moveTo(sunX + Math.cos(rayAngle) * 35, sunY + Math.sin(rayAngle) * 35);
            c.lineTo(sunX + Math.cos(rayAngle) * 60, sunY + Math.sin(rayAngle) * 60);
            c.stroke();
          }
        }
      }

      if (lightLevel < 0.4) {
        const moonAngle = (timeOfDay - 0.75) * Math.PI * 2;
        const moonX = Math.cos(moonAngle) * 600 + w / 2;
        const moonY = Math.sin(moonAngle) * 300 + 200;
        if (moonY > 0) {
          c.fillStyle = 'rgba(200, 200, 220, 0.8)';
          c.shadowColor = '#ccc';
          c.shadowBlur = 20;
          c.beginPath();
          c.arc(moonX, moonY, 25, 0, Math.PI * 2);
          c.fill();
          c.shadowBlur = 0;
          c.fillStyle = 'rgba(180, 180, 200, 0.3)';
          c.beginPath();
          c.arc(moonX - 5, moonY - 3, 5, 0, Math.PI * 2);
          c.fill();
          c.beginPath();
          c.arc(moonX + 6, moonY + 4, 4, 0, Math.PI * 2);
          c.fill();
        }
      }
    }

    function drawGround(c: CanvasRenderingContext2D, w: number, h: number, lightLevel: number) {
      const brightness = Math.floor(30 * lightLevel);
      c.fillStyle = `rgb(${30 + brightness}, ${22 + brightness}, ${16 + brightness})`;
      c.fillRect(0, 0, w, h);

      c.fillStyle = `rgb(${35 + brightness}, ${27 + brightness}, ${21 + brightness})`;
      for (let i = 0; i < w; i += 60) {
        for (let j = 0; j < h; j += 60) {
          if ((i + j) % 120 === 0) c.fillRect(i, j, 56, 56);
        }
      }

      c.fillStyle = `rgb(${40 + brightness}, ${32 + brightness}, ${26 + brightness})`;
      for (let i = 0; i < 100; i++) {
        const rx = (i * 347 + 100) % w;
        const ry = (i * 523 + 200) % h;
        c.beginPath();
        c.arc(rx, ry, 2 + (i % 3), 0, Math.PI * 2);
        c.fill();
      }
    }

    function drawPlayer(c: CanvasRenderingContext2D, x: number, y: number) {
      c.save();
      c.translate(x, y);
      const bob = Math.sin(frameCount * 0.15) * 2;

      c.fillStyle = 'rgba(0,0,0,0.3)';
      c.beginPath();
      c.ellipse(0, 24, 14, 5, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#e8d5b5';
      c.beginPath();
      c.moveTo(-10, -5);
      c.lineTo(-12, 20);
      c.lineTo(12, 20);
      c.lineTo(10, -5);
      c.fill();

      c.fillStyle = '#c8a880';
      c.beginPath();
      c.arc(0, -12 + bob, 9, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#8b1a3a';
      c.beginPath();
      c.arc(0, -16 + bob, 9, Math.PI, 0);
      c.fill();

      c.fillStyle = '#3a2a1a';
      c.fillRect(-4, -13 + bob, 2, 2);
      c.fillRect(2, -13 + bob, 2, 2);

      c.strokeStyle = '#e8d5b5';
      c.lineWidth = 4;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(-10, -2);
      c.lineTo(-16, 8 + Math.sin(frameCount * 0.2) * 3);
      c.stroke();
      c.beginPath();
      c.moveTo(10, -2);
      c.lineTo(16, 8 - Math.sin(frameCount * 0.2) * 3);
      c.stroke();

      c.restore();
    }

    function drawNPC(c: CanvasRenderingContext2D, npc: NPCDef, lightLevel: number) {
      c.save();
      c.translate(npc.x, npc.y);
      const bob = Math.sin(frameCount * 0.1 + npc.x) * 2;

      c.fillStyle = 'rgba(0,0,0,0.3)';
      c.beginPath();
      c.ellipse(0, 24, 14, 5, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = npc.color;
      c.beginPath();
      c.moveTo(-10, -5);
      c.lineTo(-12, 20);
      c.lineTo(12, 20);
      c.lineTo(10, -5);
      c.fill();

      c.fillStyle = '#c8a880';
      c.beginPath();
      c.arc(0, -12 + bob, 9, 0, Math.PI * 2);
      c.fill();

      if (npc.name === 'Thuraya' || npc.name === 'Yara' || npc.name.includes('Weaver') || npc.name.includes('Rose')) {
        c.fillStyle = '#2a1a1a';
        c.beginPath();
        c.arc(0, -14 + bob, 10, Math.PI, 0);
        c.fill();
      } else {
        c.fillStyle = '#8b1a3a';
        c.beginPath();
        c.arc(0, -16 + bob, 9, Math.PI, 0);
        c.fill();
      }

      c.fillStyle = '#3a2a1a';
      c.fillRect(-4, -13 + bob, 2, 2);
      c.fillRect(2, -13 + bob, 2, 2);

      c.fillStyle = 'rgba(0,0,0,0.6)';
      c.fillRect(-40, -38, 80, 16);
      if (lightLevel < 0.4) {
        c.shadowColor = npc.color;
        c.shadowBlur = 5;
      }
      c.fillStyle = npc.color;
      c.font = '9px sans-serif';
      c.textAlign = 'center';
      c.fillText(npc.arName, 0, -27);
      c.shadowBlur = 0;

      if (dist(player.x, player.y, npc.x, npc.y) < 60) {
        c.fillStyle = '#00d4aa';
        c.font = 'bold 10px sans-serif';
        c.fillText('E / TAP', 0, -45);
      }

      c.textAlign = 'left';
      c.restore();
    }

    function drawVocabItem(c: CanvasRenderingContext2D, vocab: VocabDef) {
      if (vocab.collected) return;
      c.save();
      c.translate(vocab.x, vocab.y);
      const float = Math.sin(frameCount * 0.05 + vocab.x) * 5;
      const glow = 15 + Math.sin(frameCount * 0.1) * 5;

      c.fillStyle = 'rgba(0, 212, 170, 0.2)';
      c.beginPath();
      c.arc(0, float, glow, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#00d4aa';
      c.shadowColor = '#00d4aa';
      c.shadowBlur = 10;
      c.beginPath();
      c.arc(0, float, 10, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;

      c.fillStyle = '#e8d5b5';
      c.font = 'bold 8px sans-serif';
      c.textAlign = 'center';
      c.fillText('?', 0, float + 3);

      if (dist(player.x, player.y, vocab.x, vocab.y) < 80) {
        c.fillStyle = 'rgba(0,0,0,0.7)';
        c.fillRect(-40, float - 35, 80, 18);
        c.fillStyle = '#00d4aa';
        c.font = '9px sans-serif';
        c.fillText(vocab.word, 0, float - 22);
      }

      c.textAlign = 'left';
      c.restore();
    }

    function drawItem(c: CanvasRenderingContext2D, item: ItemDef) {
      if (item.collected) return;
      c.save();
      c.translate(item.x, item.y);
      const float = Math.sin(frameCount * 0.05 + item.x) * 3;

      c.fillStyle = 'rgba(212, 168, 67, 0.3)';
      c.beginPath();
      c.arc(0, float, 12, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#d4a843';
      c.shadowColor = '#d4a843';
      c.shadowBlur = 8;
      c.beginPath();
      c.arc(0, float, 8, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;

      c.fillStyle = '#1a0a0f';
      c.font = 'bold 8px sans-serif';
      c.textAlign = 'center';
      c.fillText('★', 0, float + 3);

      if (dist(player.x, player.y, item.x, item.y) < 60) {
        c.fillStyle = 'rgba(0,0,0,0.7)';
        c.fillRect(-40, float - 30, 80, 14);
        c.fillStyle = '#d4a843';
        c.font = '8px sans-serif';
        c.fillText(item.name, 0, float - 20);
      }

      c.textAlign = 'left';
      c.restore();
    }

    function drawExit(c: CanvasRenderingContext2D, exit: LevelData['exit']) {
      c.save();
      c.translate(exit.x + exit.w / 2, exit.y + exit.h / 2);
      const pulse = Math.sin(frameCount * 0.1) * 5;

      c.fillStyle = 'rgba(139, 26, 58, 0.3)';
      c.beginPath();
      c.ellipse(0, 0, 30 + pulse, 40 + pulse, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#8b1a3a';
      c.fillRect(-25, -40, 50, 80);
      c.fillStyle = '#d4a843';
      c.fillRect(-20, -35, 40, 70);

      c.fillStyle = '#8b1a3a';
      c.font = 'bold 12px sans-serif';
      c.textAlign = 'center';
      c.fillText('EXIT', 0, 5);
      c.fillText('>', 0, 20);

      c.textAlign = 'left';
      c.restore();
    }

    function drawLightning(c: CanvasRenderingContext2D, w: number, h: number) {
      if (lightningFlash > 0) {
        c.fillStyle = `rgba(255, 255, 255, ${lightningFlash})`;
        c.fillRect(0, 0, w, h);
        lightningFlash -= 0.05;
      }

      if (Math.random() < 0.005 && currentLevelData && currentLevelData.weather.rain > 0.7) {
        lightningFlash = 0.8;
        c.strokeStyle = 'rgba(255, 255, 200, 0.9)';
        c.lineWidth = 3;
        c.shadowColor = '#fff';
        c.shadowBlur = 20;
        let lx = Math.random() * w;
        let ly = 0;
        c.beginPath();
        c.moveTo(lx, ly);
        while (ly < h * 0.7) {
          lx += (Math.random() - 0.5) * 100;
          ly += 30 + Math.random() * 50;
          c.lineTo(lx, ly);
        }
        c.stroke();
        c.shadowBlur = 0;
      }
    }

    function drawMinimap() {
      const minimap = minimapRef.current;
      const lvl = currentLevelData;
      if (!minimap || !lvl) return;
      const mCtx = minimap.getContext('2d');
      if (!mCtx) return;

      const scaleX = minimap.width / lvl.width;
      const scaleY = minimap.height / lvl.height;

      mCtx.fillStyle = 'rgba(10,10,15,0.9)';
      mCtx.fillRect(0, 0, minimap.width, minimap.height);

      mCtx.fillStyle = 'rgba(139, 26, 58, 0.4)';
      lvl.buildings.forEach((b) => mCtx.fillRect(b.x * scaleX, b.y * scaleY, b.w * scaleX, b.h * scaleY));

      mCtx.fillStyle = '#d4a843';
      lvl.npcs.forEach((npc) => {
        mCtx.beginPath();
        mCtx.arc(npc.x * scaleX, npc.y * scaleY, 3, 0, Math.PI * 2);
        mCtx.fill();
      });

      mCtx.fillStyle = '#00d4aa';
      lvl.vocab.forEach((v) => {
        if (!v.collected) {
          mCtx.beginPath();
          mCtx.arc(v.x * scaleX, v.y * scaleY, 2, 0, Math.PI * 2);
          mCtx.fill();
        }
      });

      mCtx.fillStyle = '#8b1a3a';
      mCtx.fillRect(lvl.exit.x * scaleX, lvl.exit.y * scaleY, 6, 8);

      mCtx.fillStyle = '#fff';
      mCtx.beginPath();
      mCtx.arc(player.x * scaleX, player.y * scaleY, 3, 0, Math.PI * 2);
      mCtx.fill();

      mCtx.strokeStyle = 'rgba(255,255,255,0.3)';
      mCtx.lineWidth = 1;
      if (canvas) mCtx.strokeRect(camera.x * scaleX, camera.y * scaleY, canvas.width * scaleX, canvas.height * scaleY);
    }

    function render() {
      if (!currentLevelData || !ctx || !canvas) return;
      const lvl = currentLevelData;
      const lightLevel = lvl.time.light;

      ctx.fillStyle = lvl.time.sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-camera.x, -camera.y);

      drawSky(ctx, lvl.time, lightLevel, lvl.width, lvl.height);
      drawGround(ctx, lvl.width, lvl.height, lightLevel);
      lvl.grass.forEach((g) => g.draw(ctx, windStrength));
      lvl.palms.forEach((p) => p.draw(ctx, windStrength));
      if (lvl.falaj.length > 0) drawFalaj(ctx, lvl.falaj);

      const sortedBuildings = [...lvl.buildings].sort((a, b) => a.y - b.y);
      sortedBuildings.forEach((b) => b.draw(ctx, lightLevel, player.x, player.y, timeOfDay));

      lvl.clouds.forEach((c) => c.draw(ctx));
      lvl.particles.forEach((p) => p.draw(ctx));
      lvl.orbs.forEach((o) => o.draw(ctx));

      lvl.lanterns.forEach((l) => {
        const flicker = 0.6 + 0.4 * Math.sin(Date.now() / 300 + l.flicker);
        ctx.globalAlpha = flicker;
        ctx.fillStyle = l.color;
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      lvl.vocab.forEach((v) => drawVocabItem(ctx, v));
      lvl.items.forEach((i) => drawItem(ctx, i));
      drawExit(ctx, lvl.exit);

      const sortedNPCs = [...lvl.npcs].sort((a, b) => a.y - b.y);
      sortedNPCs.forEach((npc) => drawNPC(ctx, npc, lightLevel));

      lvl.animals.forEach((a) => a.draw(ctx));
      drawPlayer(ctx, player.x, player.y);

      ctx.strokeStyle = 'rgba(139, 26, 58, 0.5)';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, lvl.width, lvl.height);

      drawLightning(ctx, lvl.width, lvl.height);
      ctx.restore();

      drawMinimap();

      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height / 3, canvas.width / 2, canvas.height / 2, canvas.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, `rgba(0,0,0,${0.2 + (1 - lightLevel) * 0.4})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (lightLevel < 0.5) {
        ctx.fillStyle = `rgba(10, 10, 30, ${0.3 - lightLevel * 0.6})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      if (lvl.weather.fog > 0) {
        ctx.fillStyle = `rgba(200, 200, 220, ${lvl.weather.fog * 0.3})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      if (lvl.weather.sand > 0) {
        ctx.fillStyle = `rgba(200, 180, 140, ${lvl.weather.sand * 0.2})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // ===================== UPDATE =====================
    function update(dt: number) {
      if (gameState !== 'playing') return;
      const lvl = currentLevelData;
      if (!lvl || !canvas) return;

      if (dayNightCycle) {
        timeOfDay += cycleSpeed;
        if (timeOfDay > 1) timeOfDay -= 1;
      }

      windStrength = 0.3 + Math.sin(Date.now() / 3000) * 0.3 + lvl.weather.wind * 0.5;

      let dx = 0, dy = 0;
      if (keys['ArrowUp'] || keys['w'] || keys['W'] || touchInput.up) dy = -1;
      if (keys['ArrowDown'] || keys['s'] || keys['S'] || touchInput.down) dy = 1;
      if (keys['ArrowLeft'] || keys['a'] || keys['A'] || touchInput.left) dx = -1;
      if (keys['ArrowRight'] || keys['d'] || keys['D'] || touchInput.right) dx = 1;

      if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        dx /= len; dy /= len;

        const newX = player.x + dx * player.speed * dt;
        const newY = player.y + dy * player.speed * dt;

        let collided = false;
        for (const b of lvl.buildings) {
          if (newX + 12 > b.x && newX - 12 < b.x + b.w && newY + 12 > b.y && newY - 12 < b.y + b.h) {
            collided = true;
            break;
          }
        }

        if (!collided) {
          player.x = newX;
          player.y = newY;
        }

        player.x = Math.max(15, Math.min(lvl.width - 15, player.x));
        player.y = Math.max(15, Math.min(lvl.height - 15, player.y));

        if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? 'right' : 'left';
        else player.dir = dy > 0 ? 'down' : 'up';
      }

      camera.x = player.x - canvas.width / 2;
      camera.y = player.y - canvas.height / 2;
      camera.x = Math.max(0, Math.min(lvl.width - canvas.width, camera.x));
      camera.y = Math.max(0, Math.min(lvl.height - canvas.height, camera.y));

      lvl.animals.forEach((a) => a.update(dt, { x: 0, y: 0, w: lvl.width, h: lvl.height }));
      lvl.particles.forEach((p) => p.update(dt, lvl.width, lvl.height));
      lvl.clouds.forEach((c) => c.update(dt, lvl.width));
      lvl.orbs.forEach((o) => o.update(dt, lvl.width, lvl.height));

      lvl.vocab.forEach((v) => {
        if (!v.collected && dist(player.x, player.y, v.x, v.y) < 40) {
          v.collected = true;
          collectVocab(v);
        }
      });

      lvl.items.forEach((i) => {
        if (!i.collected && dist(player.x, player.y, i.x, i.y) < 40) {
          i.collected = true;
          collectItem(i);
        }
      });

      lvl.npcs.forEach((npc) => {
        if (!npc.met && dist(player.x, player.y, npc.x, npc.y) < 50) {
          npc.met = true;
          meetNPC(npc);
        }
      });

      const exit = lvl.exit;
      if (player.x > exit.x && player.x < exit.x + exit.w && player.y > exit.y && player.y < exit.y + exit.h) {
        const vocabNeeded = Math.min(3, lvl.vocab.length);
        const itemsNeeded = Math.min(1, lvl.items.length);
        const npcsNeeded = Math.min(1, lvl.npcs.length);
        if (levelVocab.length >= vocabNeeded && levelItems.length >= itemsNeeded && levelNPCsMet.length >= npcsNeeded) {
          showLevelTransition();
        } else {
          showQuest('Complete objectives first! | أكمل المهام أولاً');
        }
      }
    }

    // ===================== GAME LOOP =====================
    function gameLoop(timestamp: number) {
      if (disposed) return;
      frameCount++;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      update(dt);
      render();
      rafId = requestAnimationFrame(gameLoop);
    }

    // ===================== EVENTS =====================
    const onResize = () => resizeCanvas();
    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      keys[e.code] = true;

      if (gameState === 'dialogue') {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          nextDialogue();
        }
      }

      if (gameState === 'playing') {
        if (e.key === 'e' || e.key === 'E') {
          const lvl = currentLevelData;
          lvl?.npcs.forEach((npc) => {
            if (dist(player.x, player.y, npc.x, npc.y) < 60) meetNPC(npc);
          });
        }
        if (e.key === 't' || e.key === 'T') {
          dayNightCycle = !dayNightCycle;
          showQuest(dayNightCycle ? 'Day/Night cycle ON' : 'Day/Night cycle PAUSED');
        }
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
      keys[e.code] = false;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const action = () => {
      if (gameState === 'dialogue') {
        nextDialogue();
      } else if (gameState === 'playing') {
        currentLevelData?.npcs.forEach((npc) => {
          if (dist(player.x, player.y, npc.x, npc.y) < 60) meetNPC(npc);
        });
      }
    };

    apiRef.current = {
      startLevel: (n: number) => { resizeCanvas(); lastTime = performance.now(); startLevel(n); },
      nextLevel,
      nextDialogue,
      restart: restartGame,
      action,
      touchInput,
    };

    resizeCanvas();
    rafId = requestAnimationFrame((t) => { lastTime = t; gameLoop(t); });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (questTimer) clearTimeout(questTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      apiRef.current = null;
    };
  }, []);

  const unlocked = progress?.unlockedLevel ?? 1;
  const starsMap = progress?.stars ?? {};

  const beginJourney = () => {
    const lvl = Math.min(Math.max(1, startLevelNum), Math.min(unlocked, TOTAL_LEVELS));
    apiRef.current?.startLevel(lvl);
  };

  const setDir = (dir: string, val: boolean) => {
    const api = apiRef.current;
    if (api) api.touchInput[dir] = val;
  };

  return (
    <div className="qw-root fixed inset-0 z-40 overflow-hidden bg-[#0a0a0f] text-[#e8d5b5]">
      <style>{QW_CSS}</style>

      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* UI layer */}
      <div className="pointer-events-none absolute inset-0 z-10 [&>*]:pointer-events-auto">
        {/* HUD */}
        <div id="qw-hud">
          <div className="hud-panel">
            <div className="label">Level</div>
            <div id="qw-level">{hudLevel}</div>
          </div>
          <div className="hud-panel">
            <div className="label">Mission</div>
            <div style={{ fontSize: 11, color: '#a09080' }}>{mission}</div>
          </div>
          <div className="hud-panel">
            <div className="label">Vocabulary</div>
            <div id="qw-vocab">
              {chips.map((cword) => (
                <div key={cword} className="vocab-chip collected">{cword}</div>
              ))}
            </div>
          </div>
          <Link
            to="/arcade"
            className="hud-panel no-underline"
            style={{ color: '#d4a843', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}
          >
            ← Back to Arcade
          </Link>
        </div>

        <canvas id="qw-minimap" ref={minimapRef} width={140} height={100} />

        {/* Quest notification */}
        <div id="qw-quest" className={quest ? 'show' : ''}>{quest?.msg}</div>

        {/* Dialogue */}
        {screen === 'dialogue' && dialogue && (
          <div id="qw-dialogue" style={{ display: 'block' }} onClick={() => apiRef.current?.nextDialogue()}>
            <div className="ar">{dialogue.ar}</div>
            <div className="en">{dialogue.en}</div>
            <div className="next-hint">Press SPACE / E or Tap to continue</div>
          </div>
        )}

        {/* Mobile controls */}
        <div id="qw-mobile">
          <div className="dpad">
            {(['up', 'down', 'left', 'right'] as const).map((dir) => (
              <div
                key={dir}
                className={`dpad-btn dpad-${dir}`}
                onPointerDown={(e) => { e.preventDefault(); setDir(dir, true); }}
                onPointerUp={() => setDir(dir, false)}
                onPointerLeave={() => setDir(dir, false)}
                onPointerCancel={() => setDir(dir, false)}
              >
                {dir === 'up' ? '▲' : dir === 'down' ? '▼' : dir === 'left' ? '◀' : '▶'}
              </div>
            ))}
          </div>
        </div>
        <div id="qw-action" onClick={() => apiRef.current?.action()}>ACT</div>
      </div>

      {/* Start screen */}
      {screen === 'start' && (
        <div id="qw-start">
          <h1>Under The Palm Tree</h1>
          <div className="subtitle">تحت النخلة</div>
          <div className="author">Al-Qarwashiya Chronicles</div>
          <div className="desc">
            Journey through 36 levels inspired by the novel. Explore Al-Qarwashiya village,
            navigate markets, survive storms, uncover mysteries, and collect vocabulary
            across the soul of Oman.
          </div>
          <div className="level-preview">
            {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map((n) => {
              const locked = n > unlocked;
              const completed = (starsMap[n] ?? 0) > 0 || n < unlocked;
              return (
                <button
                  key={n}
                  disabled={locked}
                  onClick={() => setStartLevelNum(n)}
                  className={
                    'level-dot' +
                    (n === startLevelNum ? ' active' : '') +
                    (completed ? ' completed' : '') +
                    (locked ? ' locked' : '')
                  }
                >
                  {locked ? '·' : n}
                </button>
              );
            })}
          </div>
          <button id="qw-startBtn" onClick={beginJourney}>
            {startLevelNum > 1 ? `Begin Level ${startLevelNum}` : 'Begin the Journey'}
          </button>
          <Link to="/arcade" className="mt-5 text-xs uppercase tracking-[0.25em] text-[#a09080] no-underline hover:text-[#d4a843]">
            ← Back to Arcade
          </Link>
        </div>
      )}

      {/* Level transition */}
      {screen === 'transition' && trans && (
        <div id="qw-transition">
          <h1>Level {trans.level} Complete</h1>
          <div className="subtitle">اكتمل المستوى {trans.level}</div>
          <div className="desc">{trans.desc}</div>
          <div className="level-stats">
            <div className="stat-box"><div className="stat-value">{trans.vocab}</div><div className="stat-label">Words Collected</div></div>
            <div className="stat-box"><div className="stat-value">{trans.items}</div><div className="stat-label">Items Found</div></div>
            <div className="stat-box"><div className="stat-value">{trans.npcs}</div><div className="stat-label">NPCs Met</div></div>
          </div>
          <button id="qw-nextBtn" onClick={() => apiRef.current?.nextLevel()}>Continue Journey</button>
        </div>
      )}

      {/* Win screen */}
      {screen === 'win' && (
        <div id="qw-win">
          <h1>Journey Complete!</h1>
          <div className="ar-title">اكتملت الرحلة!</div>
          <p>You have completed all {TOTAL_LEVELS} levels of Under The Palm Tree.</p>
          <div className="vocab-summary">
            {winVocab.map((v) => (
              <div key={v.word} className="vocab-chip collected" style={{ fontSize: 12, padding: '4px 12px' }}>
                {v.word} = {v.ar}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button id="qw-restartBtn" onClick={() => apiRef.current?.restart()}>Play Again</button>
            <Link to="/arcade" id="qw-arcadeBtn">Back to Arcade</Link>
          </div>
        </div>
      )}
    </div>
  );
}

const QW_CSS = `
.qw-root { font-family: 'Inter', system-ui, sans-serif; user-select: none; -webkit-user-select: none; }
#qw-hud { position:absolute; top:8px; left:8px; right:8px; display:flex; justify-content:space-between; align-items:flex-start; gap:8px; }
.hud-panel { background:rgba(10,10,15,0.9); border:1px solid #8b1a3a; border-radius:10px; padding:8px 14px; color:#e8d5b5; font-size:12px; backdrop-filter:blur(6px); min-width:80px; }
.hud-panel .label { color:#00d4aa; font-size:9px; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:3px; font-weight:700; }
#qw-level { color:#d4a843; font-weight:bold; font-size:14px; }
#qw-vocab { display:flex; gap:5px; flex-wrap:wrap; max-width:220px; }
.vocab-chip { background:rgba(26,10,26,0.8); border:1px solid #d63384; border-radius:12px; padding:2px 8px; font-size:10px; color:#ff6b9d; transition:all 0.3s ease; }
.vocab-chip.collected { border-color:#00d4aa; color:#00d4aa; box-shadow:0 0 8px rgba(0,212,170,0.4); animation:qwChipPulse 2s infinite; }
@keyframes qwChipPulse { 0%,100%{box-shadow:0 0 4px rgba(0,212,170,0.3)} 50%{box-shadow:0 0 12px rgba(0,212,170,0.6)} }
#qw-dialogue { position:absolute; bottom:110px; left:50%; transform:translateX(-50%); width:92%; max-width:650px; background:rgba(10,10,15,0.97); border:2px solid #8b1a3a; border-radius:16px; padding:20px; box-shadow:0 0 30px rgba(139,26,58,0.3); cursor:pointer; }
#qw-dialogue .ar { color:#e8d5b5; font-size:16px; line-height:1.7; margin-bottom:6px; direction:rtl; text-align:right; font-family:'Amiri', serif; }
#qw-dialogue .en { color:#a09080; font-size:13px; line-height:1.6; margin-bottom:10px; font-style:italic; }
#qw-dialogue .next-hint { color:#d63384; font-size:11px; text-align:center; animation:qwHintPulse 1.8s infinite; }
@keyframes qwHintPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
#qw-quest { position:absolute; top:70px; left:50%; transform:translateX(-50%) translateY(-100px); background:rgba(139,26,58,0.95); border:1px solid #d4a843; border-radius:12px; padding:12px 24px; color:#e8d5b5; font-size:14px; text-align:center; opacity:0; transition:all 0.5s cubic-bezier(0.68,-0.55,0.265,1.55); max-width:90%; font-weight:500; z-index:20; pointer-events:none; }
#qw-quest.show { opacity:1; transform:translateX(-50%) translateY(0); }
#qw-transition { position:absolute; inset:0; background:rgba(10,10,15,0.98); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:200; padding:20px; }
#qw-transition h1 { color:#d4a843; font-size:clamp(22px,5vw,42px); text-align:center; margin-bottom:8px; font-family:'Cinzel', serif; }
#qw-transition .subtitle { color:#8b1a3a; font-size:clamp(14px,3vw,20px); margin-bottom:20px; text-align:center; font-family:'Amiri', serif; }
#qw-transition .desc { color:#a09080; font-size:14px; max-width:500px; text-align:center; line-height:1.7; margin-bottom:30px; padding:0 20px; }
#qw-transition .level-stats { display:flex; gap:20px; margin-bottom:25px; flex-wrap:wrap; justify-content:center; }
.stat-box { background:rgba(139,26,58,0.3); border:1px solid #8b1a3a; border-radius:10px; padding:12px 20px; text-align:center; }
.stat-box .stat-value { color:#00d4aa; font-size:20px; font-weight:700; }
.stat-box .stat-label { color:#a09080; font-size:10px; text-transform:uppercase; letter-spacing:1px; }
#qw-nextBtn { background:#8b1a3a; border:2px solid #d4a843; color:#e8d5b5; padding:14px 45px; font-size:16px; border-radius:10px; cursor:pointer; transition:all 0.3s; font-family:'Cinzel', serif; }
#qw-nextBtn:hover { background:#a01e42; box-shadow:0 0 20px rgba(139,26,58,0.5); transform:scale(1.05); }
#qw-mobile { position:absolute; bottom:20px; left:20px; display:none; }
.dpad { position:relative; width:140px; height:140px; }
.dpad-btn { position:absolute; width:46px; height:46px; background:rgba(139,26,58,0.5); border:2px solid #d63384; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; touch-action:none; transition:all 0.1s; cursor:pointer; }
.dpad-btn:active { background:rgba(214,51,132,0.8); transform:scale(0.92); }
.dpad-up { top:0; left:47px; } .dpad-down { bottom:0; left:47px; } .dpad-left { top:47px; left:0; } .dpad-right { top:47px; right:0; }
#qw-action { position:absolute; bottom:30px; right:30px; width:70px; height:70px; background:rgba(0,212,170,0.25); border:2px solid #00d4aa; border-radius:50%; display:none; align-items:center; justify-content:center; color:#00d4aa; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; transition:all 0.15s; cursor:pointer; }
#qw-action:active { background:rgba(0,212,170,0.6); transform:scale(0.92); }
#qw-start { position:absolute; inset:0; background:linear-gradient(180deg,#0a0a0f 0%,#1a0a0f 50%,#0a0a0f 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:100; overflow-y:auto; padding:30px 0; }
#qw-start::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 30%, rgba(139,26,58,0.15) 0%, transparent 60%); pointer-events:none; }
#qw-start h1 { color:#d4a843; font-size:clamp(26px,7vw,52px); text-align:center; margin-bottom:6px; font-family:'Cinzel', serif; text-shadow:0 0 30px rgba(212,168,67,0.3); letter-spacing:2px; }
#qw-start .subtitle { color:#8b1a3a; font-size:clamp(14px,3vw,22px); margin-bottom:8px; text-align:center; font-family:'Amiri', serif; }
#qw-start .author { color:#a09080; font-size:12px; margin-bottom:25px; letter-spacing:3px; text-transform:uppercase; }
#qw-start .desc { color:#a09080; font-size:14px; max-width:480px; text-align:center; line-height:1.7; margin-bottom:30px; padding:0 20px; }
.level-preview { display:flex; gap:6px; margin-bottom:25px; flex-wrap:wrap; justify-content:center; max-width:480px; }
.level-dot { width:36px; height:36px; border-radius:50%; border:2px solid #3a1a1a; background:transparent; display:flex; align-items:center; justify-content:center; font-size:11px; color:#5a3a3a; font-weight:700; transition:all 0.3s; cursor:pointer; }
.level-dot.locked { opacity:0.4; cursor:not-allowed; }
.level-dot.active { border-color:#d4a843; color:#d4a843; box-shadow:0 0 10px rgba(212,168,67,0.3); }
.level-dot.completed { border-color:#00d4aa; color:#00d4aa; background:rgba(0,212,170,0.1); }
#qw-startBtn { background:#8b1a3a; border:2px solid #d4a843; color:#e8d5b5; padding:16px 50px; font-size:16px; border-radius:10px; cursor:pointer; transition:all 0.3s; font-family:'Cinzel', serif; }
#qw-startBtn:hover { background:#a01e42; box-shadow:0 0 25px rgba(139,26,58,0.5); transform:translateY(-2px); }
#qw-win { position:absolute; inset:0; background:rgba(10,10,15,0.97); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:100; padding:20px; overflow-y:auto; }
#qw-win h1 { color:#00d4aa; font-size:36px; margin-bottom:8px; font-family:'Cinzel', serif; }
#qw-win .ar-title { color:#d4a843; font-size:20px; margin-bottom:15px; font-family:'Amiri', serif; }
#qw-win p { color:#e8d5b5; font-size:15px; margin-bottom:15px; text-align:center; max-width:450px; line-height:1.6; }
#qw-win .vocab-summary { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:450px; margin-bottom:25px; max-height:30vh; overflow-y:auto; }
#qw-restartBtn, #qw-arcadeBtn { background:#8b1a3a; border:2px solid #d4a843; color:#e8d5b5; padding:14px 35px; font-size:14px; border-radius:10px; cursor:pointer; font-family:'Cinzel', serif; text-decoration:none; display:inline-flex; align-items:center; }
#qw-restartBtn:hover, #qw-arcadeBtn:hover { background:#a01e42; }
#qw-minimap { position:absolute; top:70px; right:10px; width:140px; height:100px; background:rgba(10,10,15,0.85); border:1px solid #8b1a3a; border-radius:8px; }
@media (max-width:768px) {
  #qw-mobile { display:block; }
  #qw-action { display:flex; }
  #qw-dialogue { bottom:180px; }
  #qw-minimap { width:100px; height:70px; top:65px; }
}
`;
