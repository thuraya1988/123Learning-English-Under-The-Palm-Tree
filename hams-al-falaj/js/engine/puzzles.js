// Puzzle framework. Four types, all DOM-modal over the canvas:
//   hidden   — examine card after the sparkle is found
//   sequence — tap glowing symbols in the order hinted by a riddle
//   listen   — breathing audio swell, then pick what the whisper said
//   restore  — drag 3 broken pieces onto the relic silhouette
// All text comes from the relic's data in js/data/worlds.js.

import { SYMBOLS } from '../data/worlds.js';

// simple hand-drawn line icons (no emoji)
const ICONS = {
  water: '<path d="M16 4 C10 14 7 19 7 23 a9 9 0 0 0 18 0 C25 19 22 14 16 4 Z"/>',
  palm: '<path d="M16 30 V16 M16 16 C10 12 6 12 4 15 M16 16 C22 12 26 12 28 15 M16 16 C13 10 11 8 8 8 M16 16 C19 10 21 8 24 8 M16 16 V6"/>',
  sun: '<circle cx="16" cy="16" r="6"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3"/>',
  moon: '<path d="M22 4 a12 12 0 1 0 6 20 a10 10 0 0 1 -6 -20 Z"/>',
  star: '<path d="M16 4 l3.4 7.4 8 .8 -6 5.4 1.8 7.9 -7.2 -4.2 -7.2 4.2 1.8 -7.9 -6 -5.4 8 -.8 Z"/>',
  mountain: '<path d="M3 27 L12 8 L17 19 L21 12 L29 27 Z"/>',
  fish: '<path d="M4 16 C10 9 20 9 25 16 C20 23 10 23 4 16 Z M25 16 l4 -4 v8 Z"/><circle cx="10" cy="14" r="1.2"/>',
  book: '<path d="M16 8 C12 5 7 5 4 6 v20 c3 -1 8 -1 12 2 c4 -3 9 -3 12 -2 V6 c-3 -1 -8 -1 -12 2 Z M16 8 v20"/>',
  key: '<circle cx="10" cy="12" r="5"/><path d="M14 15 L26 27 M22 23 l3 -3 M25 26 l3 -3"/>',
  boat: '<path d="M4 22 h24 l-4 6 h-16 Z M16 22 V6 M16 6 l9 12 h-9"/>',
};
export function symbolIcon(name) {
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

export class Puzzles {
  constructor(root, audio, opts) {
    this.root = root;         // overlay container
    this.audio = audio;
    this.lang = opts.lang || 'ar';
    this.reduced = !!opts.reduced;
    this.onSolved = opts.onSolved;   // (relic) => {}
    this.onClose = opts.onClose || (() => {});
    this.active = null;
  }

  get isOpen() { return !!this.active; }

  setLang(l) { this.lang = l; }

  open(relic) {
    this.close();
    const type = relic.puzzle.type;
    const wrap = document.createElement('div');
    wrap.className = 'puzzle-panel card';
    wrap.dataset.type = type;
    this.root.appendChild(wrap);
    this.root.classList.add('open');
    this.active = { relic, wrap };
    if (type === 'hidden') this._buildHidden(relic, wrap);
    else if (type === 'sequence') this._buildSequence(relic, wrap);
    else if (type === 'listen') this._buildListen(relic, wrap);
    else if (type === 'restore') this._buildRestore(relic, wrap);
  }

  close() {
    if (this.active) {
      this.audio.setListening(false);
      this.active.wrap.remove();
      this.active = null;
    }
    this.root.classList.remove('open');
  }

  _t(o) { return o[this.lang] || o.en; }

  _solve() {
    const relic = this.active.relic;
    this.audio.setListening(false);
    this.audio.found();
    this.onSolved(relic);
  }

  _closeBtn(wrap) {
    const b = document.createElement('button');
    b.className = 'puz-close';
    b.type = 'button';
    b.setAttribute('aria-label', '×');
    b.textContent = '×';
    b.addEventListener('click', () => { this.close(); this.onClose(); });
    wrap.appendChild(b);
  }

  // ---------- (a) hidden-spot: examine then take ----------
  _buildHidden(relic, wrap) {
    wrap.innerHTML = `
      <h3>${this._t(relic.name)}</h3>
      <p class="pz-text">${this._t(relic.puzzle.examine)}</p>
      <button class="btn pz-take" type="button">${this.lang === 'ar' ? 'خُذ الأثر' : 'Take the relic'}</button>`;
    this._closeBtn(wrap);
    wrap.querySelector('.pz-take').addEventListener('click', () => this._solve());
  }

  // ---------- (b) sequence ----------
  _buildSequence(relic, wrap) {
    const p = relic.puzzle;
    wrap.innerHTML = `
      <h3>${this._t(relic.name)}</h3>
      <p class="pz-text pz-riddle">${this._t(p.riddle)}</p>
      <div class="pz-symbols"></div>
      <p class="pz-progress"></p>`;
    this._closeBtn(wrap);
    const box = wrap.querySelector('.pz-symbols');
    const progress = wrap.querySelector('.pz-progress');
    // shuffle symbol order on screen
    const order = [...p.symbols].sort(() => Math.random() - 0.5);
    let idx = 0;
    for (const sym of order) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pz-sym';
      b.innerHTML = symbolIcon(sym);
      b.setAttribute('aria-label', SYMBOLS[sym][this.lang] || sym);
      b.addEventListener('click', () => {
        if (sym === p.symbols[idx]) {
          b.classList.add('done');
          b.disabled = true;
          idx++;
          this.audio.tick();
          progress.textContent = '●'.repeat(idx) + '○'.repeat(p.symbols.length - idx);
          if (idx >= p.symbols.length) setTimeout(() => this._solve(), 350);
        } else {
          // wrong: reset with a soft shake
          idx = 0;
          progress.textContent = '○'.repeat(p.symbols.length);
          box.classList.remove('shake');
          void box.offsetWidth;
          box.classList.add('shake');
          box.querySelectorAll('.pz-sym').forEach(x => { x.classList.remove('done'); x.disabled = false; });
        }
      });
      box.appendChild(b);
    }
    progress.textContent = '○'.repeat(p.symbols.length);
  }

  // ---------- (c) listen ----------
  _buildListen(relic, wrap) {
    const p = relic.puzzle;
    wrap.innerHTML = `
      <h3>${this._t(relic.name)}</h3>
      <p class="pz-text">${this._t(p.prompt)}</p>
      <div class="pz-breath" aria-hidden="true"><span></span></div>
      <div class="pz-options" hidden></div>`;
    this._closeBtn(wrap);
    this.audio.setListening(true);
    const opts = wrap.querySelector('.pz-options');
    // breathing swell for a moment, then reveal options
    const delay = this.reduced ? 900 : 2600;
    this._listenTimer = setTimeout(() => {
      this.audio.setListening(false);
      wrap.querySelector('.pz-breath').classList.add('still');
      opts.hidden = false;
      p.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn pz-opt';
        b.textContent = this._t(opt);
        b.addEventListener('click', () => {
          if (i === p.correct) this._solve();
          else {
            b.classList.add('wrong');
            b.disabled = true;
            this.audio.setListening(true);
            setTimeout(() => this.audio.setListening(false), 1200);
          }
        });
        opts.appendChild(b);
      });
    }, delay);
  }

  // ---------- (d) restore: drag 3 pieces onto the silhouette ----------
  _buildRestore(relic, wrap) {
    wrap.innerHTML = `
      <h3>${this._t(relic.name)}</h3>
      <p class="pz-text">${this._t(relic.puzzle.hint)}</p>
      <div class="pz-stage">
        <div class="pz-silhouette">
          <div class="pz-slot" data-slot="0"></div>
          <div class="pz-slot" data-slot="1"></div>
          <div class="pz-slot" data-slot="2"></div>
        </div>
        <div class="pz-tray">
          <div class="pz-piece" data-piece="0"></div>
          <div class="pz-piece" data-piece="1"></div>
          <div class="pz-piece" data-piece="2"></div>
        </div>
      </div>`;
    this._closeBtn(wrap);
    let placed = 0;
    const slots = [...wrap.querySelectorAll('.pz-slot')];
    const pieces = [...wrap.querySelectorAll('.pz-piece')];
    // shuffle slots-vs-piece mapping not needed: any piece to any slot
    for (const piece of pieces) {
      piece.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        piece.setPointerCapture(e.pointerId);
        piece.classList.add('dragging');
        const rect = wrap.getBoundingClientRect();
        const move = (ev) => {
          piece.style.left = (ev.clientX - rect.left - 30) + 'px';
          piece.style.top = (ev.clientY - rect.top - 30) + 'px';
        };
        move(e);
        const up = (ev) => {
          piece.removeEventListener('pointermove', move);
          piece.removeEventListener('pointerup', up);
          piece.classList.remove('dragging');
          // snap to a free slot if close
          for (const slot of slots) {
            if (slot.dataset.filled) continue;
            const sr = slot.getBoundingClientRect();
            const dx = ev.clientX - (sr.left + sr.width / 2);
            const dy = ev.clientY - (sr.top + sr.height / 2);
            if (Math.hypot(dx, dy) < 70) {
              slot.dataset.filled = '1';
              slot.classList.add('filled');
              piece.style.display = 'none';
              placed++;
              this.audio.tick();
              if (placed >= 3) setTimeout(() => this._solve(), 350);
              return;
            }
          }
          // not placed: return to tray
          piece.style.left = '';
          piece.style.top = '';
        };
        piece.addEventListener('pointermove', move);
        piece.addEventListener('pointerup', up);
      });
      // keyboard accessibility: click a piece then a slot
      piece.tabIndex = 0;
      piece.setAttribute('role', 'button');
      piece.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          const free = slots.find(s => !s.dataset.filled);
          if (free) {
            free.dataset.filled = '1'; free.classList.add('filled');
            piece.style.display = 'none';
            placed++;
            this.audio.tick();
            if (placed >= 3) setTimeout(() => this._solve(), 350);
          }
        }
      });
    }
  }
}
