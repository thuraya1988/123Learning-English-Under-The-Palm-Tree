// Painted village map: 6 districts, progressive unlock, per-district progress
// dots, tap to travel. Graceful painted fallback if map-village.jpg is missing.

import { UI } from '../data/ui-text.js';
import { DISTRICTS, RELICS_PER_DISTRICT } from '../data/worlds.js';

export class VillageMap {
  constructor(el, audio, onTravel, onClose) {
    this.el = el;
    this.audio = audio;
    this.onTravel = onTravel;
    this.onCloseCb = onClose;
    this.lang = 'ar';
    el.innerHTML = `
      <div class="panel-card map-card" role="dialog" aria-modal="true">
        <div class="panel-head">
          <h2 class="panel-title"></h2>
          <button class="panel-close" type="button"></button>
        </div>
        <div class="map-canvas"></div>
      </div>`;
    this.$title = el.querySelector('.panel-title');
    this.$map = el.querySelector('.map-canvas');
    el.querySelector('.panel-close').addEventListener('click', () => this.close());
    el.addEventListener('click', (e) => { if (e.target === el) this.close(); });
  }

  open(lang, state) {
    this.lang = lang;
    this.state = state;
    this.el.classList.add('open');
    this.$title.textContent = UI.mapTitle[lang];
    this.el.querySelector('.panel-close').textContent = UI.close[lang];
    this.render();
  }

  close() {
    this.el.classList.remove('open');
    this.onCloseCb();
  }

  get isOpen() { return this.el.classList.contains('open'); }

  render() {
    const lang = this.lang;
    const { foundSet, freedSpirits, unlocked, current } = this.state;
    this.$map.innerHTML = '';
    // painted backdrop (with graceful fallback color)
    const bg = document.createElement('div');
    bg.className = 'map-bg';
    const img = new Image();
    img.onload = () => { bg.style.backgroundImage = 'url(./assets/v4/map-village.jpg)'; bg.classList.add('has-img'); };
    img.src = './assets/v4/map-village.jpg';
    this.$map.appendChild(bg);

    for (const [dId, d] of Object.entries(DISTRICTS)) {
      const isUnlocked = unlocked.includes(dId);
      const found = d.relics.filter(r => foundSet.has(r.id)).length;
      const freed = freedSpirits.includes(dId);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'map-pin' + (isUnlocked ? '' : ' locked') + (freed ? ' freed' : '') + (current === dId ? ' current' : '');
      b.style.left = (d.mapPos.x * 100) + '%';
      b.style.top = (d.mapPos.y * 100) + '%';
      b.setAttribute('aria-label', d.name[lang]);
      b.innerHTML = `
        <span class="mp-name">${d.name[lang]}</span>
        <span class="mp-dots">${d.relics.map(r =>
          `<i class="${foundSet.has(r.id) ? 'on' : ''}"></i>`).join('')}<i class="spirit-dot ${freed ? 'on' : ''}"></i></span>
        <span class="mp-state">${
          current === dId ? UI.here[lang] :
          !isUnlocked ? UI.locked[lang] :
          freed ? UI.freed[lang] : `${found}/${RELICS_PER_DISTRICT}`}</span>`;
      if (isUnlocked) {
        b.addEventListener('click', () => {
          this.audio.tick();
          this.close();
          this.onTravel(dId);
        });
      } else {
        b.disabled = true;
      }
      this.$map.appendChild(b);
    }
  }
}
