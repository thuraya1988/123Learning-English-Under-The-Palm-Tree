// Dialogue panel: bottom bilingual narrative beats, click/Enter to advance.

import { UI } from '../data/ui-text.js';

export class Dialogue {
  constructor(el, audio) {
    this.el = el;
    this.audio = audio;
    this.lang = 'ar';
    this.beats = [];
    this.idx = 0;
    this.onDone = null;
    el.innerHTML = `
      <div class="dlg-card">
        <div class="dlg-speaker"></div>
        <p class="dlg-text"></p>
        <div class="dlg-hint"></div>
      </div>`;
    this.$speaker = el.querySelector('.dlg-speaker');
    this.$text = el.querySelector('.dlg-text');
    this.$hint = el.querySelector('.dlg-hint');
    el.addEventListener('click', () => this.advance());
  }

  get isOpen() { return this.el.classList.contains('open'); }

  show(beats, lang, speaker, onDone) {
    this.beats = beats;
    this.lang = lang;
    this.idx = 0;
    this.onDone = onDone;
    this.el.classList.add('open');
    this.$speaker.textContent = speaker || '';
    this.$hint.textContent = UI.dlgHint[lang];
    this.render();
  }

  advance() {
    if (!this.isOpen) return;
    this.audio.tick();
    this.idx++;
    if (this.idx >= this.beats.length) {
      this.el.classList.remove('open');
      const cb = this.onDone; this.onDone = null;
      if (cb) cb();
    } else {
      this.render();
    }
  }

  render() {
    this.$text.textContent = this.beats[this.idx][this.lang] || this.beats[this.idx].en;
  }
}
