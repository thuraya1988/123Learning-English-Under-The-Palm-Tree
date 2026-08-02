// Tutorial: 4-step bilingual onboarding (walk / sparkles / puzzles / spirits).

import { UI } from '../data/ui-text.js';

export class Tutorial {
  constructor(el, audio, onDone) {
    this.el = el;
    this.audio = audio;
    this.onDone = onDone;
    this.step = 0;
    this.lang = 'ar';
    el.innerHTML = `
      <div class="panel-card tut-card" role="dialog" aria-modal="true">
        <h2 class="panel-title"></h2>
        <div class="tut-icon" aria-hidden="true"></div>
        <h3 class="tut-step-title"></h3>
        <p class="tut-body"></p>
        <div class="tut-foot">
          <div class="tut-dots"></div>
          <button class="btn tut-next" type="button"></button>
        </div>
      </div>`;
    this.$title = el.querySelector('.panel-title');
    this.$icon = el.querySelector('.tut-icon');
    this.$stepTitle = el.querySelector('.tut-step-title');
    this.$body = el.querySelector('.tut-body');
    this.$dots = el.querySelector('.tut-dots');
    this.$next = el.querySelector('.tut-next');
    this.$next.addEventListener('click', () => this.advance());
  }

  open(lang) {
    this.lang = lang;
    this.step = 0;
    this.el.classList.add('open');
    this.render();
  }

  get isOpen() { return this.el.classList.contains('open'); }

  advance() {
    this.audio.tick();
    this.step++;
    if (this.step >= UI.tutSteps.length) {
      this.el.classList.remove('open');
      this.onDone();
    } else {
      this.render();
    }
  }

  render() {
    const s = UI.tutSteps[this.step];
    const lang = this.lang;
    this.$title.textContent = UI.tutTitle[lang];
    this.$stepTitle.textContent = s.title[lang];
    this.$body.textContent = s.body[lang];
    this.$dots.innerHTML = UI.tutSteps.map((_, i) =>
      `<i class="${i === this.step ? 'on' : ''}"></i>`).join('');
    this.$next.textContent = this.step === UI.tutSteps.length - 1 ? UI.tutStart[lang] : UI.tutNext[lang];
    this.$icon.dataset.step = this.step;
    this.$next.focus();
  }
}
