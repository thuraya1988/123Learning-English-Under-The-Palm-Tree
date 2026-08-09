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

  _setupEvents() {
    // Character selection
    document.querySelectorAll('.char-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedChar = card.dataset.char;
        this.elements.playBtn.disabled = false;
      });
    });

    // Play button
    this.elements.playBtn.addEventListener('click', () => {
      if (this.selectedChar && this.onPlay) {
        this.onPlay(this.selectedChar, this.elements.qualitySelect.value);
      }
    });

    // Quality
    this.elements.qualitySelect.addEventListener('change', (e) => {
      if (this.onQualityChange) this.onQualityChange(e.target.value);
    });

    // Pause buttons
    document.getElementById('btn-resume').addEventListener('click', () => this.hidePause());
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.hidePause();
      if (this.onRestart) this.onRestart();
    });
    document.getElementById('btn-quality').addEventListener('click', () => {
      const opts = ['low', 'medium', 'high'];
      const cur = this.elements.qualitySelect.value;
      const next = opts[(opts.indexOf(cur) + 1) % opts.length];
      this.elements.qualitySelect.value = next;
      if (this.onQualityChange) this.onQualityChange(next);
      this.notify(`Quality: ${next.toUpperCase()}`);
    });
    document.getElementById('btn-menu').addEventListener('click', () => {
      location.reload();
    });
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
