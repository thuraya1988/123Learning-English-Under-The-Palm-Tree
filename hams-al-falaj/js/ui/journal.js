// Relic Journal: parchment panel with found-relic thumbnails (bilingual name
// + one-line lore) and per-district progress. Graceful painted fallback card
// when a thumbnail file is missing.

import { UI } from '../data/ui-text.js';
import { DISTRICTS, RELICS_PER_DISTRICT } from '../data/worlds.js';

export class Journal {
  constructor(el, audio, onClose) {
    this.el = el;
    this.audio = audio;
    this.onClose = onClose;
    this.lang = 'ar';
    el.innerHTML = `
      <div class="panel-card parchment" role="dialog" aria-modal="true">
        <div class="panel-head">
          <h2 class="panel-title"></h2>
          <button class="panel-close" type="button"></button>
        </div>
        <div class="journal-body"></div>
      </div>`;
    this.$title = el.querySelector('.panel-title');
    this.$body = el.querySelector('.journal-body');
    el.querySelector('.panel-close').addEventListener('click', () => this.close());
    el.addEventListener('click', (e) => { if (e.target === el) this.close(); });
  }

  open(lang, foundSet, freedSpirits) {
    this.lang = lang;
    this.el.classList.add('open');
    this.$title.textContent = UI.journalTitle[lang];
    this.el.querySelector('.panel-close').textContent = UI.close[lang];
    this.render(foundSet, freedSpirits);
  }

  close() {
    this.el.classList.remove('open');
    this.onClose();
  }

  get isOpen() { return this.el.classList.contains('open'); }

  render(foundSet, freedSpirits = []) {
    const lang = this.lang;
    this.$body.innerHTML = '';
    let any = false;
    for (const [dId, d] of Object.entries(DISTRICTS)) {
      const freed = freedSpirits.includes(dId);
      const sec = document.createElement('section');
      sec.className = 'journal-district';
      const found = d.relics.filter(r => foundSet.has(r.id)).length + (freed ? 1 : 0);
      sec.innerHTML = `<h3>${d.name[lang]} <span class="jd-count">${found}/${RELICS_PER_DISTRICT}</span></h3>`;
      const grid = document.createElement('div');
      grid.className = 'journal-grid';
      for (const relic of d.relics) {
        const cell = document.createElement('div');
        cell.className = 'journal-cell' + (foundSet.has(relic.id) ? ' found' : '');
        if (foundSet.has(relic.id)) {
          any = true;
          const n = relic.id.split('-')[1];
          cell.innerHTML = `
            <div class="jc-thumb" data-img="./assets/v4/relics/${dId}-${n}.jpg">
              <span class="jc-fallback">${relic.name[lang][0]}</span>
            </div>
            <div class="jc-name">${relic.name[lang]}</div>
            <div class="jc-lore">${relic.lore[lang]}</div>`;
          const img = new Image();
          img.onload = () => {
            const th = cell.querySelector('.jc-thumb');
            th.style.backgroundImage = `url(./assets/v4/relics/${dId}-${n}.jpg)`;
            th.classList.add('has-img');
          };
          img.src = `./assets/v4/relics/${dId}-${n}.jpg`;
        } else {
          cell.innerHTML = `<div class="jc-thumb jc-unknown">?</div><div class="jc-name jc-mystery">${lang === 'ar' ? 'أثرٌ منسيّ' : 'forgotten relic'}</div>`;
        }
        grid.appendChild(cell);
      }
      // 7th discovery: the Great Relic, granted when the spirit is freed
      const g = document.createElement('div');
      g.className = 'journal-cell great' + (freed ? ' found' : '');
      if (freed) {
        any = true;
        g.innerHTML = `
          <div class="jc-thumb jc-great-thumb">
            <span class="jc-fallback">${d.greatRelic.name[lang][0]}</span>
          </div>
          <div class="jc-name">${d.greatRelic.name[lang]}</div>
          <div class="jc-lore">${d.greatRelic.lore[lang]}</div>`;
        const simg = new Image();
        simg.onload = () => {
          const th = g.querySelector('.jc-thumb');
          th.style.backgroundImage = `url(${d.spirit.img})`;
          th.classList.add('has-img');
        };
        simg.src = d.spirit.img;
      } else {
        g.innerHTML = `<div class="jc-thumb jc-unknown jc-great-thumb">?</div><div class="jc-name jc-mystery">${lang === 'ar' ? 'الأثر الأعظم' : 'the great relic'}</div>`;
      }
      grid.appendChild(g);
      sec.appendChild(grid);
      this.$body.appendChild(sec);
    }
    if (!any) {
      const p = document.createElement('p');
      p.className = 'journal-empty';
      p.textContent = UI.emptyJournal[lang];
      this.$body.prepend(p);
    }
  }
}
