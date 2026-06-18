/*!
 * Palm Tree SFX & Music — Under The Palm Tree
 *
 * Drops in life: click feedback on every button, ding/chime on correct,
 * soft thump on wrong, victory arpeggio on win, optional ambient drone.
 *
 * Everything is synthesized live with the Web Audio API — no audio files
 * are loaded, so the script is small and works offline.
 *
 * Public surface (all idempotent and safe to call anywhere):
 *   window.palmSfx.click()      → soft tick
 *   window.palmSfx.correct()    → bright two-note chime
 *   window.palmSfx.wrong()      → low soft thud
 *   window.palmSfx.win()        → 4-note arpeggio
 *   window.palmSfx.reveal()     → gentle sweep
 *   window.palmSfx.toggleMusic()/start/stop  → ambient drone
 *   window.palmSfx.setMuted(bool) / .toggleMute()
 *
 * Behaviour:
 * - Auto-binds a click tick to <button>, .btn, [role="button"], a.card.
 * - Watches buttons for .correct / .wrong class additions and plays the
 *   matching cue automatically (so existing games don't need new code).
 * - Adds a small floating 🔊/🔇 toggle in the bottom-right corner,
 *   skipped if the page already has a similar control.
 * - Honours window.PALM_SFX_DISABLED = true on a per-page opt-out.
 * - Persists mute / music preference in localStorage.
 */
(function () {
  if (window.__palmSfxInstalled) return;
  window.__palmSfxInstalled = true;
  if (window.PALM_SFX_DISABLED) return;

  var LS_MUTE  = "palm_sfx_muted";
  var LS_MUSIC = "palm_sfx_music_on";

  var state = {
    ctx: null,
    masterGain: null,
    musicNodes: null,
    musicOn: localStorage.getItem(LS_MUSIC) === "1",
    muted:   localStorage.getItem(LS_MUTE)  === "1",
    primed:  false,
  };

  function ctx() {
    if (!state.ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      state.ctx = new AC();
      state.masterGain = state.ctx.createGain();
      state.masterGain.gain.value = state.muted ? 0 : 0.6;
      state.masterGain.connect(state.ctx.destination);
    }
    return state.ctx;
  }

  // Some browsers suspend the audio context until a user gesture.
  function prime() {
    var c = ctx();
    if (!c) return;
    if (c.state === "suspended") c.resume();
    state.primed = true;
    if (state.musicOn) startMusic();
  }
  ["pointerdown","keydown","touchstart"].forEach(function (ev) {
    window.addEventListener(ev, prime, { once: true, passive: true });
  });

  // ---------- tone helpers ------------------------------------------------

  function tone(opts) {
    var c = ctx();
    if (!c || state.muted) return;
    var now = c.currentTime;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = opts.type || "sine";
    osc.frequency.setValueAtTime(opts.freq, now);
    if (opts.glide) osc.frequency.exponentialRampToValueAtTime(opts.glide, now + opts.dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(opts.vol || 0.25, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + opts.dur);
    osc.connect(g).connect(state.masterGain);
    osc.start(now);
    osc.stop(now + opts.dur + 0.05);
  }

  function seq(notes, type) {
    var c = ctx();
    if (!c) return;
    var t0 = c.currentTime;
    notes.forEach(function (n, i) {
      setTimeout(function () { tone({ type: type || "sine", freq: n.f, dur: n.d, vol: n.v || 0.22 }); },
                 i * 70);
    });
  }

  // ---------- public sound effects ---------------------------------------

  function click()   { tone({ type: "square", freq: 720, dur: 0.05, vol: 0.10 }); }
  function correct() {
    seq([{ f: 660, d: 0.12 }, { f: 880, d: 0.18 }], "triangle");
  }
  function wrong()   { tone({ type: "sine", freq: 180, glide: 110, dur: 0.32, vol: 0.30 }); }
  function win() {
    var notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach(function (f, i) {
      setTimeout(function () { tone({ type: "triangle", freq: f, dur: 0.22, vol: 0.26 }); }, i * 110);
    });
  }
  function reveal() { tone({ type: "sine", freq: 440, glide: 880, dur: 0.32, vol: 0.18 }); }

  // ---------- ambient drone (background music) --------------------------

  function startMusic() {
    if (state.musicNodes) return;
    var c = ctx();
    if (!c) return;
    var g = c.createGain();
    g.gain.value = 0.0001;
    g.connect(state.masterGain);
    g.gain.exponentialRampToValueAtTime(0.07, c.currentTime + 2);
    // Two detuned saw oscillators — a slow, warm pad in A minor flavour.
    var roots = [110, 110 * 1.005, 164.81];
    var oscs = roots.map(function (f) {
      var o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(g);
      o.start();
      return o;
    });
    // Slow LFO on the gain for breathing.
    var lfo = c.createOscillator();
    var lfoGain = c.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(g.gain);
    lfo.start();
    state.musicNodes = { g: g, oscs: oscs, lfo: lfo };
  }
  function stopMusic() {
    if (!state.musicNodes) return;
    var c = ctx();
    var nodes = state.musicNodes;
    nodes.g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.8);
    setTimeout(function () {
      nodes.oscs.forEach(function (o) { try { o.stop(); } catch (e) {} });
      try { nodes.lfo.stop(); } catch (e) {}
    }, 900);
    state.musicNodes = null;
  }
  function toggleMusic() {
    state.musicOn = !state.musicOn;
    localStorage.setItem(LS_MUSIC, state.musicOn ? "1" : "0");
    if (state.musicOn) { prime(); startMusic(); } else stopMusic();
    refreshToggleUI();
  }

  // ---------- mute --------------------------------------------------------

  function setMuted(v) {
    state.muted = !!v;
    localStorage.setItem(LS_MUTE, state.muted ? "1" : "0");
    if (state.masterGain) {
      state.masterGain.gain.cancelScheduledValues(ctx().currentTime);
      state.masterGain.gain.setTargetAtTime(state.muted ? 0 : 0.6, ctx().currentTime, 0.05);
    }
    refreshToggleUI();
  }
  function toggleMute() { setMuted(!state.muted); }

  // ---------- floating control ------------------------------------------

  var toggleEl = null;
  function ensureToggle() {
    if (toggleEl || document.querySelector(".palm-sfx-toggle")) return;
    var wrap = document.createElement("div");
    wrap.className = "palm-sfx-toggle";
    wrap.style.cssText = [
      "position:fixed", "bottom:14px", "right:14px",
      "z-index:99999",
      "display:flex", "gap:6px",
      "font:13px/1 system-ui,-apple-system,Segoe UI,sans-serif",
    ].join(";");
    wrap.innerHTML =
      '<button type="button" data-sfx="mute" aria-label="Sound" ' +
      'style="all:unset;cursor:pointer;background:rgba(0,0,0,.55);color:#fff;width:36px;height:36px;' +
      'border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);' +
      'box-shadow:0 4px 14px rgba(0,0,0,.25)">🔊</button>' +
      '<button type="button" data-sfx="music" aria-label="Music" ' +
      'style="all:unset;cursor:pointer;background:rgba(0,0,0,.55);color:#fff;width:36px;height:36px;' +
      'border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);' +
      'box-shadow:0 4px 14px rgba(0,0,0,.25)">🎵</button>';
    wrap.addEventListener("click", function (e) {
      var t = e.target.closest("[data-sfx]");
      if (!t) return;
      e.stopPropagation();
      if (t.dataset.sfx === "mute")  toggleMute();
      if (t.dataset.sfx === "music") toggleMusic();
    });
    document.body.appendChild(wrap);
    toggleEl = wrap;
    refreshToggleUI();
  }
  function refreshToggleUI() {
    if (!toggleEl) return;
    var m = toggleEl.querySelector('[data-sfx="mute"]');
    var s = toggleEl.querySelector('[data-sfx="music"]');
    if (m) { m.textContent = state.muted ? "🔇" : "🔊"; m.style.opacity = state.muted ? 0.55 : 1; }
    if (s) { s.textContent = "🎵"; s.style.opacity = state.musicOn ? 1 : 0.45; }
  }

  // ---------- auto-bind clicks ------------------------------------------

  function isClickable(el) {
    if (!el || el.dataset.palmSfxQuiet === "1") return false;
    if (el.matches && el.matches(".palm-sfx-toggle, .palm-sfx-toggle *")) return false;
    return (
      el.tagName === "BUTTON" ||
      (el.tagName === "A" && el.classList.contains("card")) ||
      el.classList.contains("btn") ||
      el.classList.contains("button") ||
      el.classList.contains("step-btn") ||
      el.classList.contains("ingredient-card") ||
      el.classList.contains("level-btn") ||
      el.classList.contains("option") ||
      el.classList.contains("choice") ||
      el.classList.contains("tile") ||
      el.getAttribute && el.getAttribute("role") === "button"
    );
  }

  document.addEventListener("pointerdown", function (e) {
    var t = e.target.closest && e.target.closest(
      "button, .btn, .button, .step-btn, .ingredient-card, .level-btn, .option, .choice, .tile, a.card, [role='button']"
    );
    if (t && isClickable(t)) click();
  }, { passive: true });

  // ---------- watch for .correct / .wrong class additions ---------------

  function classObserver() {
    if (!window.MutationObserver) return;
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type !== "attributes" || m.attributeName !== "class") continue;
        var el = m.target;
        var cls = el.className && el.className.toString ? el.className.toString() : "";
        if (/\bcorrect\b/.test(cls) && !el.dataset.palmSfxCue) {
          el.dataset.palmSfxCue = "1";
          correct();
        } else if (/\bwrong\b/.test(cls) && !el.dataset.palmSfxCue) {
          el.dataset.palmSfxCue = "1";
          wrong();
        }
      }
    });
    mo.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  // ---------- boot --------------------------------------------------------

  function boot() {
    ensureToggle();
    classObserver();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // ---------- expose ------------------------------------------------------

  window.palmSfx = {
    click: click,
    correct: correct,
    wrong: wrong,
    win: win,
    reveal: reveal,
    startMusic: function () { state.musicOn = true; localStorage.setItem(LS_MUSIC, "1"); prime(); startMusic(); refreshToggleUI(); },
    stopMusic:  function () { state.musicOn = false; localStorage.setItem(LS_MUSIC, "0"); stopMusic(); refreshToggleUI(); },
    toggleMusic: toggleMusic,
    setMuted: setMuted,
    toggleMute: toggleMute,
    isMuted: function () { return state.muted; },
    isMusicOn: function () { return state.musicOn; },
  };
})();
