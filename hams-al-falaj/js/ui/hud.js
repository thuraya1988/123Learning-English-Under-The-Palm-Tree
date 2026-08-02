// HUD: district title + progress, buttons for journal, map, help, sound
// toggle (shows REAL state, inline SVG — no emoji), language toggle.

import { UI } from '../data/ui-text.js';

const SVG_SOUND_ON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9 H3 v6 h3 l5 4 Z" fill="currentColor" stroke="none"/><path d="M15 9 a4 4 0 0 1 0 6"/><path d="M18 6 a8 8 0 0 1 0 12"/></svg>';
const SVG_SOUND_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9 H3 v6 h3 l5 4 Z" fill="currentColor" stroke="none"/><line x1="15" y1="9" x2="21" y2="15"/><line x1="21" y1="9" x2="15" y2="15"/></svg>';

export class Hud {
  constructor(el, audio, callbacks) {
    this.el = el;
    this.audio = audio;
    this.cb = callbacks;
    this.lang = 'ar';
    el.innerHTML = `
      <div class="hud-left">
        <div class="hud-title"><span class="hud-district"></span><span class="hud-progress"></span></div>
      </div>
      <div class="hud-btns">
        <button class="hud-btn" id="hud-journal" type="button"></button>
        <button class="hud-btn" id="hud-map" type="button"></button>
        <button class="hud-btn" id="hud-help" type="button" aria-label="?">?</button>
        <button class="hud-btn" id="hud-sound" type="button"></button>
        <button class="hud-btn" id="hud-lang" type="button"></button>
      </div>`;
    this.$district = el.querySelector('.hud-district');
    this.$progress = el.querySelector('.hud-progress');
    this.$journal = el.querySelector('#hud-journal');
    this.$map = el.querySelector('#hud-map');
    this.$help = el.querySelector('#hud-help');
    this.$sound = el.querySelector('#hud-sound');
    this.$lang = el.querySelector('#hud-lang');

    this.$journal.addEventListener('click', () => { audio.tick(); this.cb.onJournal(); });
    this.$map.addEventListener('click', () => { audio.tick(); this.cb.onMap(); });
    this.$help.addEventListener('click', () => { audio.tick(); this.cb.onHelp(); });
    this.$lang.addEventListener('click', () => { audio.tick(); this.cb.onLang(); });
    this.$sound.addEventListener('click', () => {
      const muted = audio.toggleMuted();
      this.renderSound(muted);
    });
    this.renderSound(audio.muted);
  }

  renderSound(muted) {
    this.$sound.innerHTML = muted ? SVG_SOUND_OFF : SVG_SOUND_ON;
    this.$sound.classList.toggle('muted', muted);
    this.$sound.setAttribute('aria-label', this.lang === 'ar'
      ? (muted ? 'الصوت: صامت' : 'الصوت: يعمل')
      : (muted ? 'Sound: off' : 'Sound: on'));
  }

  setLang(l) {
    this.lang = l;
    this.$journal.textContent = UI.journal[l];
    this.$map.textContent = UI.map[l];
    this.$lang.textContent = l === 'ar' ? 'English' : 'العربية';
    this.renderSound(this.audio.muted);
  }

  setDistrict(name, sub) {
    this.$district.textContent = name;
    this.$district.title = sub || '';
  }

  setProgress(found, total) {
    this.$progress.textContent = `${found}/${total}`;
  }
}
