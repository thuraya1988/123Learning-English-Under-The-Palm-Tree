// Hotspots: faint sparkles marking hidden relic spots in the scene.
// Rendered as focusable DOM buttons (keyboard-accessible) positioned over the
// canvas each frame from world coordinates + camera.

export class Hotspots {
  constructor(layer, lang) {
    this.layer = layer;   // absolutely-positioned div over the canvas
    this.lang = lang;
    this.spots = [];      // { relic, el }
    this.onActivate = null;
  }

  setLang(l) { this.lang = l; }

  // spots: array of relic defs not yet found
  build(spots) {
    this.clear();
    for (const relic of spots) {
      const el = document.createElement('button');
      el.className = 'sparkle';
      el.type = 'button';
      const name = relic.name[this.lang] || relic.name.en;
      el.setAttribute('aria-label', name);
      el.dataset.relic = relic.id;
      el.innerHTML = '<span class="spark-dot"></span><span class="spark-ring"></span>';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onActivate) this.onActivate(relic);
      });
      this.layer.appendChild(el);
      this.spots.push({ relic, el });
    }
  }

  remove(relicId) {
    const i = this.spots.findIndex(s => s.relic.id === relicId);
    if (i >= 0) { this.spots[i].el.remove(); this.spots.splice(i, 1); }
  }

  clear() {
    this.layer.innerHTML = '';
    this.spots = [];
  }

  // worldW maps fraction -> world px; scene.toScreenX converts to screen.
  layout(worldW, groundY, scene) {
    for (const s of this.spots) {
      const wx = s.relic.spot.x * worldW;
      const wy = s.relic.spot.y * window.innerHeight;
      const sx = scene.toScreenX(wx);
      s.el.style.transform = `translate(${sx - 18}px, ${wy - 18}px)`;
      s.el.style.display = (sx < -40 || sx > window.innerWidth + 40) ? 'none' : '';
    }
  }
}
