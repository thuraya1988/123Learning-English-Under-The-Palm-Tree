// HAMS AL-FALAJ v4 — main orchestrator.

import { Ambience } from './audio.js';
import { Scene } from './engine/scene.js';
import { Boy } from './engine/boy.js';
import { Ambient } from './engine/ambient.js';
import { SmokyReveal } from './engine/smoke.js';
import { Hotspots } from './engine/hotspots.js';
import { Puzzles } from './engine/puzzles.js';
import { Hud } from './ui/hud.js';
import { Journal } from './ui/journal.js';
import { VillageMap } from './ui/map.js';
import { Tutorial } from './ui/tutorial.js';
import { Dialogue } from './ui/dialogue.js';
import { UI } from './data/ui-text.js';
import { DISTRICTS, RELICS_PER_DISTRICT, INTRO, OUTRO } from './data/worlds.js';

const SAVE_KEY = 'hams-v4';
const ORDER = Object.keys(DISTRICTS).sort((a, b) => DISTRICTS[a].order - DISTRICTS[b].order);

// ---------------- state ----------------
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.found)) return s;
  } catch (_) {}
  return null;
}
const state = loadState() || {
  found: [],          // relic ids
  freed: [],          // district ids whose spirit is freed
  unlocked: ['falaj'],
  current: 'falaj',
  lang: localStorage.getItem('hams-lang') || 'ar',
  tutorialSeen: false,
  reduced: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
const foundSet = new Set(state.found);

// ---------------- DOM ----------------
const $ = id => document.getElementById(id);
const canvas = $('game');
const sparkLayer = $('sparkles');
const puzzleRoot = $('puzzle-root');
const splash = $('splash');
const appEl = $('app');

// ---------------- modules ----------------
const audio = new Ambience();
const scene = new Scene(canvas);
const boy = new Boy();
const ambient = new Ambient();
const smoke = new SmokyReveal();
const hotspots = new Hotspots(sparkLayer, state.lang);
const dialogue = new Dialogue($('dialogue'), audio);
const puzzles = new Puzzles(puzzleRoot, audio, {
  lang: state.lang, reduced: state.reduced,
  onSolved: relic => relicFound(relic),
  onClose: () => {},
});
const hud = new Hud($('hud'), audio, {
  onJournal: () => journal.open(state.lang, foundSet, state.freed),
  onMap: () => mapPanel.open(state.lang, mapState()),
  onHelp: () => tutorial.open(state.lang),
  onLang: toggleLang,
});
const journal = new Journal($('journal'), audio, () => {});
const mapPanel = new VillageMap($('map'), audio, travelTo, () => {});
const tutorial = new Tutorial($('tutorial'), audio, () => {
  state.tutorialSeen = true; save();
});

function mapState() {
  return { foundSet, freedSpirits: state.freed, unlocked: state.unlocked, current: state.current };
}

// ---------------- language ----------------
function applyLang() {
  const l = state.lang;
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('hams-lang', l);
  hud.setLang(l);
  hotspots.setLang(l);
  puzzles.setLang(l);
  $('begin-btn').textContent = state.found.length ? UI.continue[l] : UI.begin[l];
  $('splash-title').textContent = UI.title[l];
  $('splash-sub').textContent = UI.subtitle[l];
  const padToggleBtn = $('pad-toggle');
  if (padToggleBtn) { padToggleBtn.textContent = UI.padToggle[l]; padToggleBtn.setAttribute('aria-label', UI.padToggle[l]); }
  refreshDistrictUI();
}
function toggleLang() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  save();
  applyLang();
}

// ---------------- district flow ----------------
function refreshDistrictUI() {
  const d = DISTRICTS[state.current];
  hud.setDistrict(d.name[state.lang], d.sub[state.lang]);
  const found = d.relics.filter(r => foundSet.has(r.id)).length + (state.freed.includes(state.current) ? 1 : 0);
  hud.setProgress(found, RELICS_PER_DISTRICT);
}

function loadDistrict(id, entryX) {
  state.current = id;
  save();
  const d = DISTRICTS[id];
  scene.setDistrict(d);
  scene.setBloom(state.freed.includes(id));
  ambient.configure(d.ambient, state.reduced);
  smoke.reduced = state.reduced;
  boy.reduced = state.reduced;
  puzzles.reduced = state.reduced;
  audio.setWater(d.water ? 0.7 : 0.12);
  const startX = entryX != null ? entryX : scene.worldW * 0.15;
  boy.place(startX, scene.groundYAt(startX));
  hotspots.build(d.relics.filter(r => !foundSet.has(r.id)));
  refreshDistrictUI();
}

function travelTo(id) {
  loadDistrict(id);
}

function relicFound(relic) {
  foundSet.add(relic.id);
  state.found = [...foundSet];
  save();
  puzzles.close();
  hotspots.remove(relic.id);
  refreshDistrictUI();
  // smoky mini-reveal of the relic at its scene position
  const wx = relic.spot.x * scene.worldW;
  const sx = Math.min(Math.max(scene.toScreenX(wx), 90), scene.vw - 90);
  const sy = relic.spot.y * scene.vh;
  const img = new Image();
  const dId = state.current;
  img.src = `./assets/v4/relics/${dId}-${relic.id.split('-')[1]}.jpg`;
  smoke.start(sx, sy - 40, img, Math.min(220, scene.vh * 0.32), () => {
    const d = DISTRICTS[state.current];
    const remaining = d.relics.filter(r => !foundSet.has(r.id));
    if (remaining.length === 0 && !state.freed.includes(state.current)) {
      spiritSequence(d);
    }
  });
}

// ---------------- spirit sequence ----------------
function spiritSequence(d) {
  const spiritImg = new Image();
  spiritImg.src = d.spirit.img;
  const sx = d.spirit.pos.x * scene.vw;
  const sy = d.spirit.pos.y * scene.vh;
  boy.walkTo(boy.x); // stop
  smoke.start(sx, sy, spiritImg, Math.min(scene.vw, scene.vh) * 0.55, () => {
    dialogue.show(d.spirit.beats, state.lang, d.spirit.name[state.lang], () => {
      state.freed.push(state.current);
      scene.setBloom(true);
      refreshDistrictUI();
      // unlock next district
      const nextIdx = ORDER.indexOf(state.current) + 1;
      let unlockedNew = false;
      if (nextIdx < ORDER.length && !state.unlocked.includes(ORDER[nextIdx])) {
        state.unlocked.push(ORDER[nextIdx]);
        unlockedNew = true;
      }
      save();
      toast(unlockedNew ? UI.newDistrict[state.lang] : UI.spiritFreed[state.lang]);
      if (state.freed.length === ORDER.length) {
        setTimeout(() => dialogue.show([OUTRO], state.lang, UI.title[state.lang], () => {}), 800);
      }
    });
  });
}

// ---------------- toast ----------------
let toastTimer = null;
function toast(text) {
  const t = $('toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ---------------- input: click-to-walk + keys ----------------
let keyDir = 0;
canvas.addEventListener('pointerdown', (e) => {
  if (anyPanelOpen() || boy.climbing) return;
  // walk to clicked world x along the ground line
  const wx = e.clientX + scene.camX;
  boy.walkTo(wx);
});

// ---------------- v4.4: jump, palm climbing, landmark captions ----------------
const captionEl = $('caption');
const promptEl = $('climb-prompt');
const jumpBtn = $('jump-btn');
let captionHold = 0;

// climbable palms in world px (trunk x, crown height)
function palmWorlds() {
  const d = DISTRICTS[state.current];
  return (d.palms || []).map(p => ({ x: p.x * scene.worldW, topH: Math.round(scene.vh * 0.40) })); // reach the painted crown
}
function nearestPalm() {
  if (boy.climbing) return null;
  let best = null, bestD = 76;
  for (const p of palmWorlds()) {
    const dx = Math.abs(p.x - boy.x);
    if (dx < bestD) { bestD = dx; best = p; }
  }
  return best;
}
function startClimb(p) {
  if (!boy.startClimb(p, () => {
    // dates sparkle at the crown — a small reward moment
    if (audio.chime) audio.chime();
    const sp = document.createElement('div');
    sp.className = 'palm-spark';
    sp.style.left = scene.toScreenX(p.x) + 'px';
    sp.style.top = (scene.groundYAt(p.x) - p.topH - 50) + 'px';
    sparkLayer.appendChild(sp);
    setTimeout(() => sp.remove(), 1500);
  })) return;
}
function tryJumpOrClimb() {
  const p = nearestPalm();
  if (p) startClimb(p);
  else boy.jump();
}
promptEl.addEventListener('click', (e) => {
  e.stopPropagation();
  const p = nearestPalm();
  if (p) startClimb(p);
});
jumpBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!anyPanelOpen() && !dialogue.isOpen) tryJumpOrClimb();
});
// v4.5: the standalone jump button is superseded by the control pad's اقفز
// button; keep it hidden so the two never overlap.

let promptShown = false;
function updateClimbPrompt() {
  const p = nearestPalm();
  const blocked = anyPanelOpen() || dialogue.isOpen;
  // hysteresis: show at <76px, only hide again beyond 120px — no edge flicker
  const dx = p ? Math.abs(p.x - boy.x) : Infinity;
  if (blocked || dx > (promptShown ? 120 : 1e9)) promptShown = false;
  else if (dx < 76) promptShown = true;
  const climbBtn = $('pad-climb');
  if (climbBtn) climbBtn.disabled = !(p && !blocked);
  if (!promptShown || !p) { promptEl.classList.remove('show'); return; }
  const sx = scene.toScreenX(p.x);
  promptEl.style.transform = `translate(${Math.round(sx - 34)}px, ${Math.round(scene.groundYAt(p.x) - 170)}px)`;
  promptEl.classList.add('show');
}
function updateCaption(dt) {
  const d = DISTRICTS[state.current];
  const fx = boy.x / Math.max(1, scene.worldW);
  const lm = (d.landmarks || []).find(l => fx >= l.x0 && fx <= l.x1);
  if (lm) {
    const txt = `${lm.caption.ar} · ${lm.caption.en}`;
    if (captionEl.textContent !== txt) captionEl.textContent = txt;
    captionEl.classList.add('show');
    captionHold = 1.4;
  } else if (captionHold > 0) {
    captionHold -= dt;
    if (captionHold <= 0) captionEl.classList.remove('show');
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (puzzles.isOpen) { puzzles.close(); return; }
    if (journal.isOpen) { journal.close(); return; }
    if (mapPanel.isOpen) { mapPanel.close(); return; }
    if (tutorial.isOpen) { tutorial.el.classList.remove('open'); return; }
    return;
  }
  if (e.key === 'Enter') {
    if (dialogue.isOpen) { dialogue.advance(); e.preventDefault(); return; }
    if (tutorial.isOpen) { tutorial.advance(); e.preventDefault(); return; }
    if (anyPanelOpen()) return;
    // interact with nearest sparkle on screen
    const near = nearestSparkle();
    if (near) { hotspots.onActivate && hotspots.onActivate(near); }
    return;
  }
  if (anyPanelOpen() || dialogue.isOpen) return;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keyDir = -1; e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keyDir = 1; e.preventDefault(); }
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    e.preventDefault();
    if (!boy.climbing) boy.moveDepth(-1); // أمام — up the path band (further, smaller)
  }
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault();
    if (!boy.climbing) boy.moveDepth(1);  // خلف — toward the viewer (nearer, bigger)
  }
  if (e.key === ' ') {
    e.preventDefault();
    tryJumpOrClimb();   // near a palm trunk: climb; otherwise: jump
  }
  if (e.key === 'e' || e.key === 'E') {
    const p = nearestPalm();
    if (p) { e.preventDefault(); startClimb(p); }
  }
});
window.addEventListener('keyup', (e) => {
  const k = e.key;
  if ((k === 'ArrowLeft' || k === 'a' || k === 'A') && keyDir === -1) keyDir = 0;
  if ((k === 'ArrowRight' || k === 'd' || k === 'D') && keyDir === 1) keyDir = 0;
});

function nearestSparkle() {
  let best = null, bestD = 90;
  for (const s of hotspots.spots) {
    const wx = s.relic.spot.x * scene.worldW;
    const d = Math.abs(wx - boy.x);
    if (d < bestD) { bestD = d; best = s.relic; }
  }
  return best;
}

hotspots.onActivate = (relic) => {
  boy.walkTo(relic.spot.x * scene.worldW);
  boy.interactPose();
  setTimeout(() => puzzles.open(relic), state.reduced ? 100 : 450);
};

function anyPanelOpen() {
  return puzzles.isOpen || journal.isOpen || mapPanel.isOpen || tutorial.isOpen;
}

// ---------------- main loop ----------------
let last = performance.now();
let paused = false;
function frame(now) {
  requestAnimationFrame(frame);
  if (paused) { last = now; return; }
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  // key-walking (locked while climbing a palm)
  if (keyDir !== 0 && !anyPanelOpen() && !dialogue.isOpen && !boy.climbing) {
    boy.targetX = null;
    boy.facing = keyDir;
    const moved = boy.maxSpeed * dt;
    boy.x += keyDir * moved;
    boy.phase += moved * boy.strideRate; // distance-synced cadence
  }
  boy.x = Math.max(30, Math.min(scene.worldW - 30, boy.x));
  // feet follow the painted walkway path + gentle depth offset (±40px band)
  boy.y = scene.groundYAt(boy.x) + boy.depthOffset;

  boy.update(dt);
  // key-walking: update() clears walking when targetX is null, so re-assert after
  if (keyDir !== 0 && !anyPanelOpen() && !dialogue.isOpen && !boy.climbing) boy.walking = true;
  scene.follow(boy.x, dt);
  // when the boy stands still, the world keeps its gentle LEFTWARD slide
  const idle = !boy.walking && keyDir === 0;
  scene.update(dt, idle);
  ambient.update(dt);
  smoke.update(dt);
  audio.update(dt);

  scene.draw(now);
  ambient.draw(scene.ctx, scene.vw, scene.vh, scene.camX, scene.worldW, DISTRICTS[state.current].water);
  scene.ctx.save();
  scene.ctx.translate(-scene.camX, 0);   // boy is drawn in WORLD coordinates
  boy.draw(scene.ctx);
  scene.ctx.restore();
  smoke.draw(scene.ctx);
  hotspots.layout(scene.worldW, scene.groundY, scene);
  updateClimbPrompt();
  updateCaption(dt);
}

// ---------------- splash ----------------
$('begin-btn').addEventListener('click', () => {
  audio.begin();           // the gesture that unlocks + starts loops
  audio.chime();           // audible proof
  splash.classList.add('hidden');
  appEl.classList.add('live');
  const start = () => {
    if (!state.tutorialSeen) tutorial.open(state.lang);
    else if (!state.found.length) dialogue.show(INTRO, state.lang, UI.title[state.lang], () => {});
  };
  start();
});
$('splash-lang').addEventListener('click', (e) => { e.stopPropagation(); toggleLang(); });

// ---------------- pause on hidden tab / resize ----------------
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { paused = true; audio.suspend(); }
  else { paused = false; audio.resume(); }
});
window.addEventListener('resize', () => {
  scene.resize();
  boy.y = scene.groundYAt(boy.x) + boy.depthOffset;
});

// ---------------- v4.5: on-screen control pad ----------------
// Four direction arrows (يمين/يسار walk, أمام/خلف depth) + اقفز + تسلق.
// Always visible on touch devices; toggleable on desktop via the أزرار chip.
const padEl = $('pad');
const padToggle = $('pad-toggle');
const coarse = (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || 'ontouchstart' in window;
if (coarse) padEl.classList.add('show');
padToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  padEl.classList.toggle('show');
});
// hold-to-walk arrows share the keyboard's keyDir state
for (const btn of padEl.querySelectorAll('.pad-btn')) {
  const act = btn.dataset.act;
  const dir = act === 'left' ? -1 : act === 'right' ? 1 : 0;
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault(); e.stopPropagation();
    if (anyPanelOpen() || dialogue.isOpen) return;
    if (dir) { keyDir = dir; boy.targetX = null; }
    else if (act === 'far') boy.moveDepth(-1);
    else if (act === 'near') boy.moveDepth(1);
    else if (act === 'jump') tryJumpOrClimb();
    else if (act === 'climb') { const p = nearestPalm(); if (p) startClimb(p); }
  });
  const release = () => { if (dir && keyDir === dir) keyDir = 0; };
  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointercancel', release);
  btn.addEventListener('pointerleave', release);
}

// ---------------- boot ----------------
applyLang();
loadDistrict(state.current);
requestAnimationFrame(frame);

// test hooks (no console output)
window.__hams = {
  state, audio, boy, scene, hotspots, puzzles, smoke, dialogue,
  foundSet,
  openPuzzle: (relicId) => {
    const d = DISTRICTS[state.current];
    const r = d.relics.find(x => x.id === relicId);
    if (r) puzzles.open(r);
  },
  relic: (i) => DISTRICTS[state.current].relics[i],
  travelTo, applyLang,
};
