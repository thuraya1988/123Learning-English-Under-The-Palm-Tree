export class UI {
  constructor() {
    this.elements = {
      loading: document.getElementById('loading-screen'),
      loaderBar: document.getElementById('loader-bar'),
      loaderStatus: document.getElementById('loader-status'),
      charMenu: document.getElementById('char-menu'),
      hud: document.getElementById('hud'),
      pauseMenu: document.getElementById('pause-menu'),
      notifications: document.getElementById('notification-area'),
      crosshair: document.getElementById('crosshair'),
      webIndicator: document.getElementById('web-indicator'),
      hudSpeed: document.getElementById('hud-speed'),
      hudAlt: document.getElementById('hud-alt'),
      hudAnchor: document.getElementById('hud-anchor'),
      hudFps: document.getElementById('hud-fps'),
      timeDisplay: document.getElementById('time-display'),
      zoneDisplay: document.getElementById('zone-display'),
      playBtn: document.getElementById('play-btn'),
      qualitySelect: document.getElementById('quality-select')
    };

    this.selectedChar = null;
    this.onPlay = null;
    this.onQualityChange = null;
    this._setupEvents();
    this.frameCount = 0;
    this.lastFpsTime = performance.now();
  }

  // iOS Safari (and some Android webviews) can silently drop the synthetic
  // 'click' after a touch that also ended a momentum-scroll — the tap looks
  // like nothing happened. Handle touchend ourselves (ignoring touches that
  // moved, so real scroll/drag gestures aren't mistaken for taps) and
  // suppress the follow-up click so the handler never double-fires.
  _bindTap(el, handler) {
    let startX = 0, startY = 0, dragged = false, handledByTouch = false;
    el.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY; dragged = false;
    }, { passive: true });
    el.addEventListener('touchmove', e => {
      const t = e.touches[0];
      if (Math.abs(t.clientX - startX) > 10 || Math.abs(t.clientY - startY) > 10) dragged = true;
    }, { passive: true });
    el.addEventListener('touchend', e => {
      if (dragged) return;
      handledByTouch = true;
      e.preventDefault();
      handler(e);
      setTimeout(() => { handledByTouch = false; }, 400);
    });
    el.addEventListener('click', e => {
      if (handledByTouch) return;
      handler(e);
    });
  }

  _setupEvents() {
    // Character selection
    document.querySelectorAll('.char-card').forEach(card => {
      this._bindTap(card, () => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedChar = card.dataset.char;
        this.elements.playBtn.disabled = false;
      });
    });

    // Play button
    this._bindTap(this.elements.playBtn, () => {
      if (this.elements.playBtn.disabled) return;
      if (this.selectedChar && this.onPlay) {
        this.onPlay(this.selectedChar, this.elements.qualitySelect.value);
      }
    });

    // Quality
    this.elements.qualitySelect.addEventListener('change', (e) => {
      if (this.onQualityChange) this.onQualityChange(e.target.value);
    });

    // Pause buttons
    this._bindTap(document.getElementById('btn-resume'), () => this.hidePause());
    this._bindTap(document.getElementById('btn-restart'), () => {
      this.hidePause();
      if (this.onRestart) this.onRestart();
    });
    this._bindTap(document.getElementById('btn-quality'), () => {
      const opts = ['low', 'medium', 'high'];
      const cur = this.elements.qualitySelect.value;
      const next = opts[(opts.indexOf(cur) + 1) % opts.length];
      this.elements.qualitySelect.value = next;
      if (this.onQualityChange) this.onQualityChange(next);
      this.notify(`Quality: ${next.toUpperCase()}`);
    });
    this._bindTap(document.getElementById('btn-menu'), () => {
      location.reload();
    });

    // Touch-only pause button (mirrors the ESC key for devices with no keyboard)
    const touchPause = document.getElementById('touch-pause-btn');
    if (touchPause) {
      this._bindTap(touchPause, () => { if (this.onPause) this.onPause(); });
    }
  }

  setLoadingProgress(pct, status) {
    this.elements.loaderBar.style.width = pct + '%';
    if (status) this.elements.loaderStatus.textContent = status;
  }

  hideLoading() {
    this.elements.loading.classList.add('hidden');
    setTimeout(() => this.elements.loading.style.display = 'none', 800);
  }

  showCharMenu() {
    this.elements.charMenu.classList.remove('hidden');
  }

  hideCharMenu() {
    this.elements.charMenu.classList.add('hidden');
  }

  showHUD() {
    this.elements.hud.classList.add('active');
  }

  hideHUD() {
    this.elements.hud.classList.remove('active');
  }

  showPause() {
    this.elements.pauseMenu.classList.add('active');
  }

  hidePause() {
    this.elements.pauseMenu.classList.remove('active');
  }

  updateHUD(speed, altitude, anchor, zone, timeOfDay) {
    this.elements.hudSpeed.textContent = Math.round(speed * 3.6); // m/s to km/h
    this.elements.hudAlt.textContent = Math.round(altitude);
    this.elements.hudAnchor.textContent = anchor ? 'LOCKED' : 'SCANNING';
    this.elements.hudAnchor.style.color = anchor ? '#4ADE80' : '#F87171';
    this.elements.zoneDisplay.textContent = zone || 'Unknown Sector';

    // Time display
    const hours = Math.floor(timeOfDay * 24);
    const mins = Math.floor((timeOfDay * 24 % 1) * 60);
    this.elements.timeDisplay.textContent = `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`;

    // FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsTime >= 1000) {
      this.elements.hudFps.textContent = this.frameCount;
      this.frameCount = 0;
      this.lastFpsTime = now;
    }
  }

  setCrosshairMode(mode) {
    this.elements.crosshair.className = 'crosshair' + (mode === 'dot' ? ' dot' : '');
  }

  setWebIndicator(active) {
    this.elements.webIndicator.classList.toggle('active', active);
  }

  notify(msg, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    this.elements.notifications.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.4s forwards';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
}
