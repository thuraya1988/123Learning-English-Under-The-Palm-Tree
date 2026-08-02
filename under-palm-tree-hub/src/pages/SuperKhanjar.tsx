import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useSfx } from '@/lib/sfx';
import type { SfxName } from '@/lib/sfx';
import { useGameStore } from '@/lib/store';
import type { GameId } from '@/lib/store';

/* ------------------------------------------------------------------ */
/* Engine (ported from the standalone Super Khanjari HTML5 game)       */
/* ------------------------------------------------------------------ */

const TILE_SIZE = 48;
const VIEW_W = 960;
const VIEW_H = 540;

const TILES = {
  EMPTY: 0,
  GROUND: 1,
  PLATFORM: 2,
  PALM_TRUNK: 3,
  PALM_LEAVES: 4,
  HOUSE_WALL: 5,
  HOUSE_ROOF: 6,
  HOUSE_DOOR: 7,
  SPIKE: 8,
  GRASS: 10,
  ROCK: 11,
} as const;

type GameStateName =
  | 'start'
  | 'playing'
  | 'paused'
  | 'quiz'
  | 'levelComplete'
  | 'gameover'
  | 'certificate';

interface WordPair {
  ar: string;
  en: string;
}
interface Quiz {
  q: string;
  o: string[];
  a: number;
}
interface Ent {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  onGround: boolean;
  facing?: number;
  anim: number;
}
interface WordItem {
  x: number;
  y: number;
  word: WordPair;
  collected: boolean;
  float: number;
  scale: number;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  gravity: number;
  rotation: number;
  rotSpeed: number;
}
interface Popup {
  text: string;
  x: number;
  y: number;
  t: number;
}

export interface UiSnapshot {
  state: GameStateName;
  score: number;
  level: number;
  lives: number;
  words: number;
  quiz: Quiz | null;
  levelName: string;
}

const QUIZZES: Quiz[] = [
  { q: 'ما معنى "Peace"؟', o: ['حرب', 'سلام', 'فرح', 'حزن'], a: 1 },
  { q: 'ما معنى "Palm"؟', o: ['شجرة', 'نخلة', 'ورد', 'صبار'], a: 1 },
  { q: 'ما معنى "Bread"؟', o: ['لحم', 'خبز', 'أرز', 'تمر'], a: 1 },
  { q: 'ما معنى "Water"؟', o: ['نار', 'ماء', 'هواء', 'تراب'], a: 1 },
  { q: 'ما معنى "Sun"؟', o: ['قمر', 'نجم', 'شمس', 'سحاب'], a: 2 },
  { q: 'ما معنى "Friend"؟', o: ['عدو', 'صديق', 'جار', 'أخ'], a: 1 },
  { q: 'ما معنى "Love"؟', o: ['كراهية', 'حب', 'احترام', 'خوف'], a: 1 },
  { q: 'ما معنى "Mountain"؟', o: ['وادي', 'جبل', 'هضبة', 'سهل'], a: 1 },
  { q: 'ما معنى "Moon"؟', o: ['شمس', 'قمر', 'نجم', 'كوكب'], a: 1 },
  { q: 'ما معنى "School"؟', o: ['بيت', 'مدرسة', 'مسجد', 'مستشفى'], a: 1 },
  { q: 'ما معنى "Teacher"؟', o: ['طالب', 'معلم', 'طبيب', 'مهندس'], a: 1 },
  { q: 'ما معنى "Language"؟', o: ['لغة', 'كلام', 'صوت', 'حرف'], a: 0 },
];

const WORD_LIST: WordPair[] = [
  { ar: 'سلام', en: 'Peace' },
  { ar: 'نخلة', en: 'Palm' },
  { ar: 'خبز', en: 'Bread' },
  { ar: 'ماء', en: 'Water' },
  { ar: 'شمس', en: 'Sun' },
  { ar: 'بيت', en: 'House' },
  { ar: 'بحر', en: 'Sea' },
  { ar: 'جبل', en: 'Mountain' },
  { ar: 'صديق', en: 'Friend' },
  { ar: 'عائلة', en: 'Family' },
  { ar: 'حب', en: 'Love' },
  { ar: 'فرح', en: 'Joy' },
  { ar: 'قمر', en: 'Moon' },
  { ar: 'نجم', en: 'Star' },
  { ar: 'ورد', en: 'Flower' },
  { ar: 'كتاب', en: 'Book' },
  { ar: 'مدرسة', en: 'School' },
  { ar: 'طالب', en: 'Student' },
  { ar: 'معلم', en: 'Teacher' },
  { ar: 'لغة', en: 'Language' },
];

const LEVEL_NAMES = ['سمائل ١٩٧٣', 'الجبل الأخضر', 'الصحراء'];

interface EngineHooks {
  onUi: (snap: UiSnapshot) => void;
  sfx: (name: SfxName) => void;
  onComplete: (score: number, deaths: number) => void;
}

class TileMap {
  data: number[][];
  height: number;
  width: number;
  constructor(data: number[][]) {
    this.data = data;
    this.height = data.length;
    this.width = data[0].length;
  }
  get(x: number, y: number) {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) return TILES.EMPTY;
    return this.data[y][x];
  }
  isSolid(x: number, y: number) {
    const t = this.get(x, y);
    return (
      t === TILES.GROUND ||
      t === TILES.PLATFORM ||
      t === TILES.HOUSE_WALL ||
      t === TILES.HOUSE_ROOF ||
      t === TILES.PALM_TRUNK ||
      t === TILES.ROCK
    );
  }
  isPlatform(x: number, y: number) {
    const t = this.get(x, y);
    return t === TILES.PLATFORM || t === TILES.PALM_LEAVES;
  }
  isSpike(x: number, y: number) {
    return this.get(x, y) === TILES.SPIKE;
  }
  draw(ctx: CanvasRenderingContext2D, camera: { x: number; y: number; w: number; h: number }) {
    const sx = Math.floor(camera.x / TILE_SIZE);
    const ex = Math.ceil((camera.x + camera.w) / TILE_SIZE);
    const sy = Math.floor(camera.y / TILE_SIZE);
    const ey = Math.ceil((camera.y + camera.h) / TILE_SIZE);
    for (let y = sy; y <= ey; y++)
      for (let x = sx; x <= ex; x++) {
        const tile = this.get(x, y);
        if (tile === TILES.EMPTY) continue;
        this.drawTile(ctx, tile, x * TILE_SIZE, y * TILE_SIZE);
      }
  }
  drawTile(ctx: CanvasRenderingContext2D, tile: number, x: number, y: number) {
    switch (tile) {
      case TILES.GROUND:
        ctx.fillStyle = '#C4A77D';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#B8956A';
        ctx.fillRect(x, y, TILE_SIZE, 4);
        ctx.fillStyle = '#A68B5B';
        ctx.fillRect(x + 2, y + 6, TILE_SIZE - 4, TILE_SIZE - 8);
        ctx.strokeStyle = '#9E8B6B';
        ctx.lineWidth = 1;
        for (const ly of [12, 24, 36]) {
          ctx.beginPath();
          ctx.moveTo(x + 4, y + ly);
          ctx.lineTo(x + TILE_SIZE - 4, y + ly);
          ctx.stroke();
        }
        break;
      case TILES.PLATFORM:
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(x, y + TILE_SIZE - 4, TILE_SIZE, 4);
        ctx.fillStyle = '#A68B5B';
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 8);
        break;
      case TILES.PALM_TRUNK:
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + 18, y, 12, TILE_SIZE);
        ctx.strokeStyle = '#6B3410';
        ctx.lineWidth = 1;
        for (const [sy, ey] of [
          [4, 8],
          [16, 20],
          [28, 32],
          [40, 44],
        ]) {
          ctx.beginPath();
          ctx.moveTo(x + 18, y + sy);
          ctx.lineTo(x + 30, y + ey);
          ctx.stroke();
        }
        break;
      case TILES.PALM_LEAVES:
        ctx.fillStyle = '#2E7D32';
        for (let i = 0; i < 5; i++) {
          const angle = (i - 2) * 0.4;
          ctx.save();
          ctx.translate(x + 24, y + 24);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.ellipse(0, -18, 6, 20, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = '#1B5E20';
        ctx.beginPath();
        ctx.ellipse(x + 24, y + 8, 5, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      case TILES.HOUSE_WALL:
        ctx.fillStyle = '#C4A77D';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#A68B5B';
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        ctx.strokeStyle = '#9E8B6B';
        ctx.lineWidth = 1;
        for (const ly of [12, 24, 36]) {
          ctx.beginPath();
          ctx.moveTo(x + 4, y + ly);
          ctx.lineTo(x + TILE_SIZE - 4, y + ly);
          ctx.stroke();
        }
        break;
      case TILES.HOUSE_ROOF:
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#A0522D';
        ctx.beginPath();
        ctx.moveTo(x - 4, y + TILE_SIZE);
        ctx.lineTo(x + 24, y - 4);
        ctx.lineTo(x + 52, y + TILE_SIZE);
        ctx.fill();
        break;
      case TILES.HOUSE_DOOR:
        ctx.fillStyle = '#5C4033';
        ctx.fillRect(x + 8, y, 32, TILE_SIZE);
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(x + 12, y + 4, 24, TILE_SIZE - 8);
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 8, y, 32, TILE_SIZE);
        break;
      case TILES.SPIKE:
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + 8, y + 24, 32, 24);
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 24);
        ctx.lineTo(x + 16, y + 8);
        ctx.lineTo(x + 24, y + 24);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 24, y + 24);
        ctx.lineTo(x + 32, y + 8);
        ctx.lineTo(x + 40, y + 24);
        ctx.fill();
        break;
      case TILES.GRASS:
        ctx.fillStyle = '#C4A77D';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#4FBF67';
        for (const [gx, gy] of [
          [4, 32],
          [20, 28],
          [36, 34],
        ]) {
          ctx.beginPath();
          ctx.moveTo(x + gx, y + 48);
          ctx.lineTo(x + gx + 4, y + gy);
          ctx.lineTo(x + gx + 8, y + 48);
          ctx.fill();
        }
        break;
      case TILES.ROCK:
        ctx.fillStyle = '#8B7355';
        ctx.beginPath();
        ctx.arc(x + 24, y + 36, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#9E8B6B';
        ctx.beginPath();
        ctx.arc(x + 20, y + 32, 8, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }
}

class Engine {
  ctx: CanvasRenderingContext2D;
  hooks: EngineHooks;
  keys: Record<string, boolean> = {};
  touch = { left: false, right: false, jump: false };
  particles: Particle[] = [];
  popups: Popup[] = [];
  camera = { x: 0, y: 0, w: VIEW_W, h: VIEW_H, shake: 0 };
  state: GameStateName = 'start';
  score = 0;
  level = 1;
  lives = 3;
  wordsCollected = 0;
  deaths = 0;
  player: Ent = { x: 100, y: 300, w: 36, h: 48, vx: 0, vy: 0, onGround: false, facing: 1, anim: 0 };
  gravity = 0.6;
  friction = 0.85;
  speed = 5;
  jumpPower = -13;
  map: TileMap | null = null;
  enemies: Ent[] = [];
  words: WordItem[] = [];
  clouds: { x: number; y: number; w: number; s: number }[] = [];
  frameCount = 0;
  invincible = 0;
  quiz: Quiz | null = null;
  quizLock = false;
  raf = 0;
  timers: number[] = [];
  destroyed = false;

  constructor(canvas: HTMLCanvasElement, hooks: EngineHooks) {
    this.ctx = canvas.getContext('2d')!;
    this.hooks = hooks;
    for (let i = 0; i < 8; i++)
      this.clouds.push({
        x: i * 200 + Math.random() * 100,
        y: 30 + Math.random() * 80,
        w: 60 + Math.random() * 50,
        s: 0.3 + Math.random() * 0.5,
      });
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    const loop = () => {
      if (this.destroyed) return;
      this.update();
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.timers.forEach((t) => window.clearTimeout(t));
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  later(fn: () => void, ms: number) {
    const t = window.setTimeout(() => {
      if (!this.destroyed) fn();
    }, ms);
    this.timers.push(t);
  }

  onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
    if (['Space', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    if ((e.code === 'Escape' || e.code === 'KeyP') && (this.state === 'playing' || this.state === 'paused')) {
      if (this.state === 'playing') this.pause();
      else this.resume();
    }
  };
  onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  get left() {
    return this.keys['ArrowLeft'] || this.keys['KeyA'] || this.touch.left;
  }
  get right() {
    return this.keys['ArrowRight'] || this.keys['KeyD'] || this.touch.right;
  }
  get jump() {
    return this.keys['ArrowUp'] || this.keys['Space'] || this.keys['KeyW'] || this.touch.jump;
  }

  emit(x: number, y: number, color: string, count: number, speed: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * speed + 1;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.6,
        color,
        size: 2 + Math.random() * 4,
        gravity: 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  pushUi(quiz: Quiz | null = this.quiz) {
    this.hooks.onUi({
      state: this.state,
      score: this.score,
      level: this.level,
      lives: this.lives,
      words: this.wordsCollected,
      quiz,
      levelName: LEVEL_NAMES[this.level - 1] ?? LEVEL_NAMES[0],
    });
  }

  generateLevel(lvl: number) {
    const W = 60 + lvl * 20;
    const H = 20;
    const map: number[][] = [];
    for (let y = 0; y < H; y++) {
      map[y] = [];
      for (let x = 0; x < W; x++) map[y][x] = 0;
    }
    for (let x = 0; x < W; x++) {
      for (let y = H - 3; y < H; y++) map[y][x] = 1;
      map[H - 4][x] = Math.random() > 0.7 ? 10 : 0;
    }
    for (let i = 0; i < 15 + lvl * 5; i++) {
      const px = 5 + Math.floor(Math.random() * (W - 10));
      const py = 8 + Math.floor(Math.random() * 6);
      const pw = 3 + Math.floor(Math.random() * 4);
      for (let x = px; x < px + pw && x < W; x++) map[py][x] = 2;
    }
    for (let i = 0; i < 3 + lvl; i++) {
      const hx = 10 + Math.floor(Math.random() * (W - 20));
      const hy = H - 7;
      for (let x = hx; x < hx + 4; x++) {
        map[hy][x] = 5;
        map[hy - 1][x] = 5;
      }
      for (let x = hx; x < hx + 4; x++) map[hy - 2][x] = 6;
      map[hy - 1][hx + 1] = 7;
      map[hy - 1][hx + 2] = 7;
    }
    for (let i = 0; i < 4 + lvl * 2; i++) {
      const px = 5 + Math.floor(Math.random() * (W - 10));
      const py = H - 5 - Math.floor(Math.random() * 4);
      map[py][px] = 3;
      map[py - 1][px] = 3;
      map[py - 2][px] = 4;
    }
    for (let i = 0; i < 2 + lvl; i++) {
      const sx = 10 + Math.floor(Math.random() * (W - 20));
      map[H - 4][sx] = 8;
    }
    this.map = new TileMap(map);
    this.player.x = 100;
    this.player.y = 200;
    this.player.vx = 0;
    this.player.vy = 0;
    this.camera.x = 0;
    this.camera.y = 0;
    this.enemies = [];
    for (let i = 0; i < 2 + lvl * 2; i++)
      this.enemies.push({
        x: 400 + i * 300 + Math.random() * 200,
        y: 100,
        w: 40,
        h: 32,
        vx: -1.5 - lvl * 0.3,
        vy: 0,
        onGround: false,
        anim: 0,
      });
    this.words = [];
    for (let i = 0; i < 5 + lvl * 2; i++) {
      const w = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
      this.words.push({
        x: 300 + i * 250 + Math.random() * 100,
        y: 150 + Math.random() * 200,
        word: w,
        collected: false,
        float: Math.random() * 6,
        scale: 1,
      });
    }
  }

  start() {
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.wordsCollected = 0;
    this.deaths = 0;
    this.generateLevel(1);
    this.state = 'playing';
    this.pushUi(null);
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pushUi();
  }
  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.pushUi();
  }
  restartLevel() {
    this.lives = 3;
    this.generateLevel(this.level);
    this.state = 'playing';
    this.pushUi(null);
  }
  quitToMenu() {
    this.state = 'start';
    this.quiz = null;
    this.pushUi(null);
  }
  nextLevel() {
    this.level++;
    if (this.level > 3) {
      this.showCertificate();
      return;
    }
    this.generateLevel(this.level);
    this.state = 'playing';
    this.pushUi(null);
  }

  showQuiz() {
    if (this.state !== 'playing') return;
    this.state = 'quiz';
    this.quizLock = false;
    this.quiz = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
    this.pushUi();
  }

  answerQuiz(i: number): boolean {
    if (!this.quiz || this.quizLock) return false;
    this.quizLock = true;
    const correct = i === this.quiz.a;
    if (correct) {
      this.hooks.sfx('success');
      this.score += 100;
      this.later(() => {
        this.quiz = null;
        this.state = 'playing';
        this.pushUi(null);
      }, 1100);
    } else {
      this.hooks.sfx('error');
      this.lives--;
      this.later(() => {
        this.quiz = null;
        if (this.lives <= 0) this.gameOver();
        else {
          this.state = 'playing';
          this.pushUi(null);
        }
      }, 1000);
    }
    this.pushUi();
    return correct;
  }

  levelComplete() {
    this.state = 'levelComplete';
    this.hooks.sfx('magic');
    this.pushUi();
  }

  showCertificate() {
    this.state = 'certificate';
    this.hooks.sfx('success');
    this.hooks.onComplete(this.score, this.deaths);
    this.pushUi();
  }

  gameOver() {
    this.state = 'gameover';
    this.hooks.sfx('error');
    this.pushUi();
  }

  aabb(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  hurtPlayer() {
    this.lives--;
    this.deaths++;
    this.invincible = 60;
    this.camera.shake = 8;
    this.hooks.sfx('error');
    this.emit(this.player.x + 18, this.player.y + 24, '#FF6B66', 12, 5);
    this.pushUi();
    if (this.lives <= 0) this.gameOver();
  }

  handleCollision(ent: Ent) {
    if (!this.map) return;
    const ts = TILE_SIZE;
    const tx = Math.floor((ent.x + ent.w / 2) / ts);
    if (
      this.map.isSolid(tx, Math.floor(ent.y / ts)) ||
      this.map.isSolid(tx, Math.floor((ent.y + ent.h) / ts))
    ) {
      if (ent.vx > 0) ent.x = tx * ts - ent.w - 1;
      else if (ent.vx < 0) ent.x = (tx + 1) * ts + 1;
      if (ent !== this.player) ent.vx *= -1;
      ent.vx = 0;
    }
    const ty2 = Math.floor((ent.y + ent.h) / ts);
    if (
      this.map.isSolid(Math.floor(ent.x / ts), ty2) ||
      this.map.isSolid(Math.floor((ent.x + ent.w) / ts), ty2)
    ) {
      if (ent.vy > 0) {
        ent.y = ty2 * ts - ent.h;
        ent.vy = 0;
        ent.onGround = true;
      }
    }
    const ty3 = Math.floor(ent.y / ts);
    if (
      this.map.isSolid(Math.floor(ent.x / ts), ty3) ||
      this.map.isSolid(Math.floor((ent.x + ent.w) / ts), ty3)
    ) {
      if (ent.vy < 0) {
        ent.y = (ty3 + 1) * ts;
        ent.vy = 0;
      }
    }
    const ty4 = Math.floor((ent.y + ent.h) / ts);
    if (
      ent.vy >= 0 &&
      (this.map.isPlatform(Math.floor(ent.x / ts), ty4) ||
        this.map.isPlatform(Math.floor((ent.x + ent.w) / ts), ty4))
    ) {
      const platY = ty4 * ts;
      if (ent.y + ent.h - ent.vy <= platY + 2) {
        ent.y = platY - ent.h;
        ent.vy = 0;
        ent.onGround = true;
      }
    }
    if (this.map.isSpike(Math.floor((ent.x + ent.w / 2) / ts), Math.floor((ent.y + ent.h - 2) / ts))) {
      if (ent === this.player && this.invincible <= 0) this.hurtPlayer();
    }
  }

  update() {
    if (this.state !== 'playing' || !this.map) return;
    this.frameCount++;
    this.invincible = Math.max(0, this.invincible - 1);
    const p = this.player;
    if (this.left) {
      p.vx -= 1;
      p.facing = -1;
    }
    if (this.right) {
      p.vx += 1;
      p.facing = 1;
    }
    p.vx *= this.friction;
    p.vx = Math.max(-this.speed, Math.min(this.speed, p.vx));
    if (this.jump && p.onGround) {
      p.vy = this.jumpPower;
      p.onGround = false;
      this.hooks.sfx('hover');
      this.emit(p.x + 18, p.y + 48, '#C4A77D', 6, 3);
    }
    p.vy += this.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.onGround = false;
    this.handleCollision(p);
    if (p.y > this.map.height * TILE_SIZE + 100) {
      this.lives = 0;
      this.deaths++;
      this.pushUi();
      this.gameOver();
      return;
    }
    // camera follow
    const tx = p.x - this.camera.w / 2 + p.w / 2;
    const ty = p.y - this.camera.h / 2 + p.h / 2;
    this.camera.x += (tx - this.camera.x) * 0.08;
    this.camera.y += (ty - this.camera.y) * 0.06;
    this.camera.x = Math.max(0, Math.min(this.camera.x, this.map.width * TILE_SIZE - this.camera.w));
    this.camera.y = Math.max(-50, Math.min(this.camera.y, this.map.height * TILE_SIZE - this.camera.h));
    if (this.camera.shake > 0) {
      this.camera.x += (Math.random() - 0.5) * this.camera.shake;
      this.camera.y += (Math.random() - 0.5) * this.camera.shake;
      this.camera.shake *= 0.9;
      if (this.camera.shake < 0.5) this.camera.shake = 0;
    }
    this.enemies.forEach((e) => {
      e.vy += this.gravity;
      e.x += e.vx;
      e.y += e.vy;
      e.onGround = false;
      e.anim++;
      this.handleCollision(e);
      if (e.x <= 0 || e.x >= this.map!.width * TILE_SIZE - e.w) e.vx *= -1;
      if (this.invincible <= 0 && this.aabb(p, e)) {
        if (p.vy > 0 && p.y + p.h < e.y + e.h / 2) {
          e.vx = 0;
          e.y = 1000;
          p.vy = -8;
          this.score += 50;
          this.hooks.sfx('splash');
          this.emit(e.x + 20, e.y + 16, '#A0522D', 15, 5);
          this.pushUi();
        } else {
          this.hurtPlayer();
        }
      }
    });
    this.enemies = this.enemies.filter((e) => e.y < 1000);
    this.words.forEach((w) => {
      if (w.collected) return;
      w.float += 0.06;
      w.scale = 1 + Math.sin(w.float * 0.5) * 0.1;
      if (this.aabb(p, { x: w.x, y: w.y, w: 40, h: 30 })) {
        w.collected = true;
        this.score += 20;
        this.wordsCollected++;
        this.hooks.sfx('star');
        this.emit(w.x + 20, w.y + 15, '#FFB54D', 15, 5);
        this.popups.push({ text: w.word.en + ' = ' + w.word.ar, x: w.x + 20, y: w.y - 14, t: 0 });
        this.pushUi();
        if (this.wordsCollected % 3 === 0) this.later(() => this.showQuiz(), 500);
      }
    });
    this.clouds.forEach((c) => {
      c.x -= c.s;
      if (c.x + c.w < -100) c.x = this.map!.width * TILE_SIZE + 100;
    });
    this.particles = this.particles.filter((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += pt.gravity;
      pt.life -= 0.016 / pt.maxLife;
      pt.rotation += pt.rotSpeed;
      return pt.life > 0;
    });
    this.popups = this.popups.filter((pp) => (pp.t += 0.016) < 1.8);
    if (p.x > (this.map.width - 5) * TILE_SIZE) this.levelComplete();
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    const grad = ctx.createLinearGradient(0, 0, 0, VIEW_H);
    grad.addColorStop(0, '#8FDDF0');
    grad.addColorStop(0.5, '#EAF6EE');
    grad.addColorStop(1, '#F3E3C2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);
    // distant mountains
    ctx.fillStyle = '#B9A87F';
    for (let i = 0; i < 10; i++) {
      const mx = i * 300 - (this.camera.x * 0.3) % 3000;
      ctx.beginPath();
      ctx.moveTo(mx, 400);
      ctx.lineTo(mx + 150, 300);
      ctx.lineTo(mx + 300, 400);
      ctx.fill();
    }
    // sun
    ctx.fillStyle = '#FFD93D';
    ctx.beginPath();
    ctx.arc(this.camera.x + 830, 70, 34, 0, Math.PI * 2);
    ctx.fill();
    this.clouds.forEach((c) => {
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.w / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c.x + c.w / 3, c.y - 5, c.w / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c.x + c.w / 2, c.y, c.w / 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    if (this.map) this.map.draw(ctx, this.camera);
    this.words.forEach((w) => {
      if (w.collected) return;
      const fy = w.y + Math.sin(w.float) * 6;
      ctx.save();
      ctx.translate(w.x + 20, fy + 10);
      ctx.scale(w.scale, w.scale);
      ctx.translate(-(w.x + 20), -(fy + 10));
      ctx.shadowColor = '#FFB54D';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = '#FFB54D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w.x + 20, fy + 10, 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,213,61,0.18)';
      ctx.beginPath();
      ctx.arc(w.x + 20, fy + 10, 23, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#B8860B';
      ctx.font = 'bold 15px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(w.word.en, w.x + 20, fy + 5);
      ctx.fillStyle = '#1E8C82';
      ctx.font = 'bold 13px Amiri, serif';
      ctx.fillText(w.word.ar, w.x + 20, fy + 21);
      ctx.restore();
    });
    this.enemies.forEach((e) => this.drawEnemy(ctx, e));
    if (this.invincible % 4 < 2) this.drawPlayer(ctx);
    this.particles.forEach((pt) => {
      ctx.globalAlpha = Math.max(0, pt.life);
      ctx.save();
      ctx.translate(pt.x, pt.y);
      ctx.rotate(pt.rotation);
      ctx.fillStyle = pt.color;
      if (pt.size > 3) {
        ctx.beginPath();
        ctx.arc(0, 0, pt.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size);
      }
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    // word popups
    this.popups.forEach((pp) => {
      const k = pp.t / 1.8;
      ctx.save();
      ctx.globalAlpha = 1 - k * k;
      ctx.translate(pp.x, pp.y - k * 50);
      ctx.font = 'bold 17px Amiri, Nunito, serif';
      ctx.textAlign = 'center';
      const w = ctx.measureText(pp.text).width + 24;
      ctx.fillStyle = 'rgba(255,249,238,0.95)';
      ctx.strokeStyle = '#FFB54D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -16, w, 26, 10);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#21323B';
      ctx.fillText(pp.text, 0, 3);
      ctx.restore();
    });
    ctx.restore();
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    const p = this.player;
    const x = p.x;
    const y = p.y;
    const f = p.facing ?? 1;
    ctx.save();
    ctx.translate(x + 18, y + 24);
    ctx.scale(f, 1);
    ctx.translate(-(x + 18), -(y + 24));
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(x + 18, y + 50, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    const legOff = p.onGround ? Math.sin(this.frameCount * 0.3) * 5 : 0;
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(x + 10, y + 38, 8, 10 + legOff);
    ctx.fillRect(x + 22, y + 38, 8, 10 - legOff);
    ctx.fillStyle = '#5C4033';
    ctx.fillRect(x + 9, y + 46 + legOff, 10, 4);
    ctx.fillRect(x + 21, y + 46 - legOff, 10, 4);
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(x + 6, y + 16, 30, 24);
    ctx.strokeStyle = '#E0E0C0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 16);
    ctx.lineTo(x + 12, y + 40);
    ctx.moveTo(x + 30, y + 16);
    ctx.lineTo(x + 30, y + 40);
    ctx.stroke();
    ctx.fillStyle = '#5C4033';
    ctx.fillRect(x + 8, y + 30, 26, 4);
    ctx.fillStyle = '#FFB54D';
    ctx.fillRect(x + 19, y + 30, 4, 4);
    // khanjar dagger
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(x + 32, y + 22);
    ctx.lineTo(x + 40, y + 28);
    ctx.lineTo(x + 32, y + 34);
    ctx.fill();
    ctx.fillStyle = '#FFD93D';
    ctx.fillRect(x + 30, y + 20, 4, 6);
    // head
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(x + 21, y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(x + 17, y + 8, 3, 3);
    ctx.fillRect(x + 24, y + 8, 3, 3);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 19, y + 13, 4, 2);
    // mussar (turban)
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x + 8, y + 1, 26, 7);
    ctx.fillRect(x + 5, y + 4, 7, 12);
    ctx.fillRect(x + 30, y + 4, 7, 12);
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(x + 12, y + 3, 3, 3);
    ctx.fillRect(x + 20, y + 3, 3, 3);
    ctx.fillRect(x + 28, y + 3, 3, 3);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + 10, y + 3, 22, 4);
    ctx.fillStyle = '#333';
    ctx.fillRect(x + 12, y + 4, 18, 2);
    const armSwing = p.onGround ? Math.sin(this.frameCount * 0.3) * 6 : -6;
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(x + 2, y + 18 + armSwing, 6, 16);
    ctx.fillRect(x + 34, y + 18 - armSwing, 6, 16);
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(x + 5, y + 34 + armSwing, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 37, y + 34 - armSwing, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawEnemy(ctx: CanvasRenderingContext2D, e: Ent) {
    const x = e.x;
    const y = e.y;
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(x + 20, y + 36, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(x + 6, y + 12, 32, 18);
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 1;
    for (let i = 0; i < 18; i += 5) {
      ctx.beginPath();
      ctx.moveTo(x + 6, y + 12 + i);
      ctx.lineTo(x + 38, y + 12 + i);
      ctx.stroke();
    }
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(x + 10, y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.ellipse(x + 4, y + 12, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(x + 1, y + 10, 4, 3);
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 5, y + 4);
    ctx.lineTo(x - 2, y - 6);
    ctx.moveTo(x + 15, y + 4);
    ctx.lineTo(x + 22, y - 6);
    ctx.stroke();
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(x + 4, y + 6, 4, 3);
    ctx.fillRect(x + 12, y + 6, 4, 3);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x + 5, y + 6, 2, 2);
    ctx.fillRect(x + 13, y + 6, 2, 2);
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 2, y + 4);
    ctx.lineTo(x + 8, y + 7);
    ctx.moveTo(x + 18, y + 4);
    ctx.lineTo(x + 12, y + 7);
    ctx.stroke();
    const legAnim = Math.sin(e.anim * 0.5) * 4;
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(x + 8, y + 28, 7, 10 + legAnim);
    ctx.fillRect(x + 18, y + 28, 7, 10 - legAnim);
    ctx.fillRect(x + 28, y + 28, 7, 10 + legAnim);
    ctx.fillRect(x + 36, y + 28, 7, 10 - legAnim);
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(x + 7, y + 38 + legAnim, 9, 4);
    ctx.fillRect(x + 17, y + 38 - legAnim, 9, 4);
    ctx.fillRect(x + 27, y + 38 + legAnim, 9, 4);
    ctx.fillRect(x + 37, y + 38 - legAnim, 9, 4);
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(x + 40, y + 18, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#C0392B';
    ctx.font = 'bold 11px Amiri, serif';
    ctx.textAlign = 'left';
    ctx.fillText('مالود!', x + 8, y - 6);
  }

  downloadCertificate(playerName: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#FFF9EE';
    ctx.fillRect(0, 0, 800, 600);
    ctx.strokeStyle = '#3ED6C5';
    ctx.lineWidth = 10;
    ctx.strokeRect(14, 14, 772, 572);
    ctx.strokeStyle = '#FFB54D';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 740, 540);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1E8C82';
    ctx.font = 'bold 52px Amiri, serif';
    ctx.fillText('شهادة إنجاز', 400, 130);
    ctx.fillStyle = '#21323B';
    ctx.font = 'bold 34px Amiri, serif';
    ctx.fillText('سوبر خنجر', 400, 195);
    ctx.fillStyle = '#B8860B';
    ctx.font = '26px Amiri, serif';
    ctx.fillText(playerName, 400, 270);
    ctx.fillStyle = '#555';
    ctx.font = '20px Amiri, serif';
    ctx.fillText('أكمل مغامرة سوبر خنجر بنجاح', 400, 330);
    ctx.fillStyle = '#4FBF67';
    ctx.font = 'bold 30px Nunito, sans-serif';
    ctx.fillText('النقاط: ' + this.score, 400, 410);
    ctx.fillStyle = '#999';
    ctx.font = '16px Nunito, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('ar-OM'), 400, 490);
    const link = document.createElement('a');
    link.download = 'super-khanjari-certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  }
}

/* ------------------------------------------------------------------ */
/* React shell                                                         */
/* ------------------------------------------------------------------ */

const initialUi: UiSnapshot = {
  state: 'start',
  score: 0,
  level: 1,
  lives: 3,
  words: 0,
  quiz: null,
  levelName: LEVEL_NAMES[0],
};

const cardCls =
  'bg-paper/95 backdrop-blur rounded-3xl border-4 border-white/70 shadow-2xl px-8 py-8 max-w-lg w-[92%] text-center';
const btnPrimary =
  'rounded-2xl bg-turquoise text-white font-arabic font-bold text-xl px-8 py-3 shadow-lg border-b-4 border-door transition-transform hover:scale-105 active:scale-95';
const btnSecondary =
  'rounded-2xl bg-paper text-ink font-arabic font-bold text-base px-6 py-2.5 shadow border-2 border-turquoise transition-transform hover:scale-105 active:scale-95';

export default function SuperKhanjar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const { play, muted, toggleMute } = useSfx();
  const sfxRef = useRef(play);
  sfxRef.current = play;
  const recordResult = useGameStore((s) => s.recordResult);
  const playerName = useGameStore((s) => s.playerName);
  const [ui, setUi] = useState<UiSnapshot>(initialUi);
  const [showHowTo, setShowHowTo] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new Engine(canvas, {
      onUi: (snap) => setUi(snap),
      sfx: (n) => sfxRef.current(n),
      onComplete: (score, deaths) => {
        const stars = deaths === 0 ? 3 : deaths <= 2 ? 2 : 1;
        recordResult('super-khanjar' as GameId, 1, score, stars);
      },
    });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [recordResult]);

  useEffect(() => {
    if (ui.state !== 'quiz') {
      setPicked(null);
      setLastCorrect(null);
    }
  }, [ui.state, ui.quiz]);

  const eng = useCallback(() => engineRef.current, []);

  const setTouch = useCallback(
    (key: 'left' | 'right' | 'jump', v: boolean) => {
      const e = eng();
      if (e) e.touch[key] = v;
    },
    [eng],
  );

  const touchBtn = (key: 'left' | 'right' | 'jump', label: string) => (
    <button
      aria-label={key}
      className="w-16 h-16 rounded-full bg-paper/70 backdrop-blur border-2 border-white/70 text-2xl text-ink shadow-lg select-none touch-none active:bg-turquoise/50 active:scale-95"
      onPointerDown={(e) => {
        e.preventDefault();
        setTouch(key, true);
      }}
      onPointerUp={() => setTouch(key, false)}
      onPointerLeave={() => setTouch(key, false)}
      onPointerCancel={() => setTouch(key, false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );

  const inGame = ui.state === 'playing' || ui.state === 'paused' || ui.state === 'quiz';
  const healthPct = Math.max(0, (ui.lives / 3) * 100);

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-foam via-mist to-paper flex items-center justify-center p-2 sm:p-4">
      <div
        className="relative w-full max-w-[960px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/70"
        style={{ aspectRatio: '16 / 9' }}
        dir="rtl"
      >
        <canvas
          ref={canvasRef}
          width={VIEW_W}
          height={VIEW_H}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* top HUD bar */}
        <div className="absolute top-0 inset-x-0 z-40 p-2 sm:p-3 flex items-center gap-2" dir="ltr">
          <Link
            to="/arcade"
            aria-label="Back to arcade"
            onClick={() => play('click')}
            className="w-10 h-10 rounded-full bg-paper/90 backdrop-blur border-2 border-white/60 shadow-lg grid place-items-center text-ink shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-3 py-1 flex items-center gap-2">
            <span className="font-arabic font-bold text-ink text-sm sm:text-base">سوبر خنجر</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-door text-white rounded-full px-2 py-0.5">
              A1
            </span>
          </div>
          <div className="flex-1" />
          {inGame && (
            <>
              <div className="bg-paper/90 backdrop-blur rounded-full border-2 border-white/60 shadow-lg px-3 py-1 flex items-center gap-2 font-extrabold text-ink text-xs sm:text-sm">
                <span className="text-sunshine">★</span>
                <span>{ui.score}</span>
                <span className="text-ink/40">·</span>
                <span className="font-arabic">كلمات {ui.words}</span>
                <span className="text-ink/40">·</span>
                <span className="font-arabic hidden sm:inline">{ui.levelName}</span>
              </div>
              <button
                aria-label="Pause"
                onClick={() => {
                  play('click');
                  const e = eng();
                  if (!e) return;
                  if (ui.state === 'paused') e.resume();
                  else e.pause();
                }}
                className="w-10 h-10 rounded-full bg-paper/90 backdrop-blur border-2 border-white/60 shadow-lg grid place-items-center text-ink shrink-0"
              >
                {ui.state === 'paused' ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </>
          )}
          <button
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => {
              toggleMute();
              play('click');
            }}
            className="w-10 h-10 rounded-full bg-paper/90 backdrop-blur border-2 border-white/60 shadow-lg grid place-items-center text-ink shrink-0"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* health bar */}
        {inGame && (
          <div className="absolute top-14 sm:top-16 right-3 z-30 w-28 h-3 rounded-full bg-white/50 border border-white/70 overflow-hidden shadow">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${healthPct}%`,
                background:
                  ui.lives > 1
                    ? 'linear-gradient(90deg,#4FBF67,#2F9E4F)'
                    : 'linear-gradient(90deg,#FFB54D,#FF7A66)',
              }}
            />
          </div>
        )}

        {/* touch controls */}
        {ui.state === 'playing' && (
          <div className="absolute bottom-3 inset-x-0 z-30 flex justify-between px-4 pointer-events-none sm:hidden">
            <div className="flex gap-3 pointer-events-auto">
              {touchBtn('left', '◀')}
              {touchBtn('right', '▶')}
            </div>
            <div className="pointer-events-auto">{touchBtn('jump', '▲')}</div>
          </div>
        )}

        <AnimatePresence>
          {/* start screen */}
          {ui.state === 'start' && !showHowTo && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-foam/85 via-paper/80 to-mango/30 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ y: 24, scale: 0.96 }}
                animate={{ y: 0, scale: 1 }}
                className={cardCls}
              >
                <h1 className="font-arabic font-bold text-4xl sm:text-5xl text-door mb-1">
                  سوبر خنجر
                </h1>
                <div className="font-display font-extrabold text-mango tracking-wide mb-4">
                  Super Khanjari
                </div>
                <p className="font-arabic text-ink/80 text-lg leading-9 mb-6">
                  بطل عماني في قرية سمائل ١٩٧٣
                  <br />
                  اقفز على البيوت الطينية والنخيل
                  <br />
                  اجمع الكلمات الإنجليزية الذهبية
                  <br />
                  وتجنب مطاردة مالود الماعز!
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    className={btnPrimary}
                    onClick={() => {
                      play('click');
                      eng()?.start();
                    }}
                  >
                    ابدأ المغامرة
                  </button>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      play('click');
                      setShowHowTo(true);
                    }}
                  >
                    كيف ألعب؟
                  </button>
                </div>
                <div className="mt-5 text-xs text-ink/50 font-bold" dir="ltr">
                  Space / ▲ jump &nbsp;|&nbsp; ◀ ▶ move
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* how to play */}
          {ui.state === 'start' && showHowTo && (
            <motion.div
              key="howto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-foam/85 backdrop-blur-sm p-4"
            >
              <motion.div initial={{ y: 24 }} animate={{ y: 0 }} className={cardCls}>
                <h2 className="font-arabic font-bold text-3xl text-door mb-4">دليل اللعب</h2>
                <p className="font-arabic text-right text-ink/85 text-lg leading-9 mb-6">
                  • <b>الحركة:</b> أسهم ◀ ▶ أو أزرار الشاشة
                  <br />
                  • <b>القفز:</b> سهم ▲ أو المسافة
                  <br />
                  • <b>الهدف:</b> اجمع الكلمات الذهبية
                  <br />
                  • <b>كل 3 كلمات:</b> مواجهة كويز بوس
                  <br />
                  • <b>تجنب:</b> مالود الماعز والأشواك
                  <br />
                  • <b>الفوز:</b> أكمل ٣ مستويات واحصل على الشهادة
                </p>
                <button
                  className={btnSecondary}
                  onClick={() => {
                    play('click');
                    setShowHowTo(false);
                  }}
                >
                  رجوع
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* pause menu */}
          {ui.state === 'paused' && (
            <motion.div
              key="pause"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-foam/80 backdrop-blur-sm p-4"
            >
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className={cardCls}>
                <h2 className="font-arabic font-bold text-3xl text-door mb-6">توقف</h2>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    className={btnPrimary}
                    onClick={() => {
                      play('click');
                      eng()?.resume();
                    }}
                  >
                    استمرار
                  </button>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      play('click');
                      eng()?.restartLevel();
                    }}
                  >
                    إعادة المستوى
                  </button>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      play('click');
                      eng()?.quitToMenu();
                    }}
                  >
                    القائمة الرئيسية
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* quiz boss */}
          {ui.state === 'quiz' && ui.quiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-deepsea/30 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                className="bg-paper rounded-3xl border-4 border-mango shadow-2xl px-6 py-6 w-[92%] max-w-md"
              >
                <div className="font-arabic font-bold text-xl sm:text-2xl text-ink mb-5 leading-8">
                  {ui.quiz.q}
                </div>
                {ui.quiz.o.map((opt, i) => {
                  let cls =
                    'block w-full text-right font-arabic font-bold text-lg px-4 py-3 my-2 rounded-xl border-2 transition-all';
                  if (picked === null) {
                    cls += ' bg-white border-brass/50 text-ink hover:border-turquoise hover:bg-foam hover:-translate-x-1';
                  } else if (i === ui.quiz!.a) {
                    cls += ' bg-palm-light/40 border-palm text-forest scale-[1.02]';
                  } else if (i === picked) {
                    cls += ' bg-coral/20 border-coral text-ink';
                  } else {
                    cls += ' bg-white border-ink/10 text-ink/40';
                  }
                  return (
                    <button
                      key={i}
                      disabled={picked !== null}
                      className={cls}
                      onClick={() => {
                        setPicked(i);
                        const ok = eng()?.answerQuiz(i) ?? false;
                        setLastCorrect(ok);
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
                {picked !== null && (
                  <div
                    className={
                      'mt-3 font-arabic font-bold ' +
                      (lastCorrect ? 'text-palm-dark' : 'text-coral')
                    }
                  >
                    {lastCorrect ? 'أحسنت! +100 نقطة' : 'إجابة خاطئة!'}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* level complete */}
          {ui.state === 'levelComplete' && (
            <motion.div
              key="lvl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-foam/85 backdrop-blur-sm p-4"
            >
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={cardCls}>
                <h2 className="font-arabic font-bold text-3xl text-palm-dark mb-2">مستوى مكتمل!</h2>
                <div className="text-5xl my-3 text-sunshine">★</div>
                <p className="font-arabic text-lg text-ink/80 mb-2">
                  أحسنت! أكملت {ui.levelName}
                </p>
                <div className="font-extrabold text-mango text-2xl mb-6">
                  النقاط: {ui.score}
                </div>
                <button
                  className={btnPrimary}
                  onClick={() => {
                    play('click');
                    eng()?.nextLevel();
                  }}
                >
                  المستوى التالي ◀
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* game over */}
          {ui.state === 'gameover' && (
            <motion.div
              key="over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-coral/25 backdrop-blur-sm p-4"
            >
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className={cardCls}>
                <h2 className="font-arabic font-bold text-3xl text-coral mb-3">
                  انتهت المغامرة
                </h2>
                <p className="font-arabic text-ink/80 text-lg leading-8 mb-3">
                  مالود الماعز أمسك بك!
                  <br />
                  لكن البطل العماني لا يستسلم
                </p>
                <div className="font-extrabold text-mango text-2xl mb-6">
                  النقاط: {ui.score}
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    className={btnPrimary}
                    onClick={() => {
                      play('click');
                      eng()?.restartLevel();
                    }}
                  >
                    حاول مرة أخرى
                  </button>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      play('click');
                      eng()?.quitToMenu();
                    }}
                  >
                    القائمة الرئيسية
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* certificate */}
          {ui.state === 'certificate' && (
            <motion.div
              key="cert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-foam/85 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, rotate: -1 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-paper rounded-3xl border-8 border-double border-turquoise shadow-2xl px-8 py-8 w-[92%] max-w-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full border-4 border-mango grid place-items-center text-3xl text-mango bg-white shadow">
                  ★
                </div>
                <h2 className="font-arabic font-bold text-4xl text-door mb-2">شهادة إنجاز</h2>
                <div className="font-arabic font-bold text-2xl text-ink my-2">{playerName}</div>
                <div className="font-arabic text-ink/70 mb-2">
                  أكمل مغامرة سوبر خنجر بنجاح
                </div>
                <div className="font-extrabold text-mango text-2xl my-2">
                  النقاط: {ui.score}
                </div>
                <div className="text-ink/50 text-sm mb-5">
                  {new Date().toLocaleDateString('ar-OM')}
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    className={btnPrimary}
                    onClick={() => {
                      play('click');
                      eng()?.downloadCertificate(playerName);
                    }}
                  >
                    حفظ الشهادة
                  </button>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      play('click');
                      eng()?.quitToMenu();
                    }}
                  >
                    العب مرة أخرى
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
