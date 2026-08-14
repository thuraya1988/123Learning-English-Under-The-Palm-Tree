import * as THREE from 'three';
import { RAY_VERT, RAY_FRAG, COMPOSITE_VERT, COMPOSITE_FRAG } from './black-hole-shaders.js';
import { buildShip, makeGlowTexture, makeGlowSprite } from './ship-model.js';

let GLOW_TEX = null;

/* ============================================================
   SPACE ADVENTURE — مغامرة الفضاء
   Core structure: endless flight through the solar system,
   tap/shoot the orb carrying the correct English meaning of
   the word shown, dodge asteroids, avoid the black hole.
   Assets reused: F-35 style ship, Earth/Moon/Sun flybys,
   black-hole hazard, procedural engine flame.

   Vocabulary content: every word, emoji and meaning below is
   taken verbatim (or trimmed to its first clause) from the real
   glossary entries (class="vw", data-w/data-e/data-m) embedded
   in Palm_Tree_ENGLISH-TTS.html — nothing invented, per
   data/storyReference.ts's "do not invent vocabulary" rule.
   Round mechanic: match the English word to its real English
   meaning, not a translation (the novel's glossary is
   English-only).
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
}

/* ---------------- VOCABULARY BANK (real words from the novel's glossary) ---------------- */
const WORD_BANK = [
  { en: 'Falaj', emoji: '💧', meaning: "An ancient Omani irrigation channel carved from stone" },
  { en: 'Goat', emoji: '🐐', meaning: 'A four-legged farm animal with hooves and sometimes horns' },
  { en: 'Wadi', emoji: '🏞️', meaning: 'A dry riverbed or valley that fills with water only during rains' },
  { en: 'Khanjar', emoji: '🗡️', meaning: 'The curved ceremonial dagger of Oman, worn at the belt' },
  { en: 'Kummah', emoji: '🧢', meaning: 'The traditional embroidered cap worn by Omani men' },
  { en: 'Turban', emoji: '🧣', meaning: 'A length of cloth wound around the head' },
  { en: 'Hijab', emoji: '🧕', meaning: 'A head covering worn by Muslim women as a sign of modesty' },
  { en: 'Kabsa', emoji: '🍚', meaning: 'Spiced rice cooked with meat' },
  { en: 'Frankincense', emoji: '🌿', meaning: 'A sweet-smelling resin burned as incense' },
  { en: 'Hospitality', emoji: '☕', meaning: 'The friendly reception and treatment of guests' },
  { en: 'Emblem', emoji: '🇴🇲', meaning: 'The official symbol at the centre of the Omani flag' },
  { en: 'Tribe', emoji: '👥', meaning: 'A social group made up of many families who share a common ancestor' },
  { en: 'Ghost', emoji: '👻', meaning: 'The spirit of a dead person, believed to appear to the living' },
  { en: 'Sorcerer', emoji: '🧙', meaning: 'A person believed to practise magic' },
  { en: 'Kind', emoji: '💙', meaning: 'Gentle and caring in the way a person looks at someone' },
  { en: 'Generous', emoji: '💝', meaning: 'Kind and willing to give freely' },
  { en: 'Proud', emoji: '🙇', meaning: "Feeling satisfaction about an achievement" },
  { en: 'Gratitude', emoji: '🙏', meaning: 'A feeling of being thankful' },
  { en: 'Patience', emoji: '⏳', meaning: 'The quality of waiting calmly without hurrying' },
  { en: 'Hero', emoji: '🦸', meaning: 'A person admired for their courage or outstanding achievements' },
  { en: 'Crescent', emoji: '🌙', meaning: 'A curved shape like a thin moon' },
  { en: 'Earth', emoji: '🌍', meaning: 'The solid ground; our whole planet' },
  { en: 'Nest', emoji: '🐝', meaning: 'A structure built by bees or wasps to live in' },
  { en: 'Frog', emoji: '🐸', meaning: 'A small amphibious animal' },
  { en: 'Sandals', emoji: '👡', meaning: 'Simple open shoes, usually with a strap' },
  { en: 'Flock', emoji: '🐑', meaning: 'A group of sheep or goats moving together' },
];

/* ---------------- MENU WIRING ---------------- */
function initMenu() {
  $('#startFlightBtn').addEventListener('click', () => {
    showScreen('screen-game');
    startFlight();
  });
  const best = Number(localStorage.getItem('palm_space_best') || 0);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
}


/* SHIP MESH — F-35A LIGHTNING II — shared with space-landing.html via ship-model.js (real reused code, not a duplicate). */
/* ---------------- CELESTIAL BODIES — real NASA-derived texture maps
   already vendored in the site (public/textures/globe/), not procedural
   placeholders. ---------------------------------------------------- */
const GLOBE_TEX = 'public/textures/globe/';
const texLoader = new THREE.TextureLoader();
function loadColorTex(file) {
  const t = texLoader.load(GLOBE_TEX + file);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function loadDataTex(file) {
  return texLoader.load(GLOBE_TEX + file);
}
function buildEarth() {
  const g = new THREE.Group();
  const earth = new THREE.Mesh(new THREE.SphereGeometry(14, 48, 36), new THREE.MeshPhongMaterial({
    map: loadColorTex('earth_atmos_2048.jpg'),
    specularMap: loadDataTex('earth_specular_2048.jpg'),
    normalMap: loadDataTex('earth_normal_2048.jpg'),
    normalScale: new THREE.Vector2(0.85, 0.85),
    emissiveMap: loadColorTex('earth_lights_2048.png'),
    emissive: 0xffffff,
    emissiveIntensity: 1.4,
    specular: 0x333333,
    shininess: 12,
  }));
  g.add(earth);
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(14.12, 48, 36), new THREE.MeshLambertMaterial({
    map: loadColorTex('earth_clouds_1024.png'),
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  }));
  g.add(clouds);
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(14.6, 32, 24), new THREE.MeshBasicMaterial({ color: 0x7fc8ff, transparent: true, opacity: 0.18, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  g.add(atmo);
  g.userData.spin = earth;
  g.userData.cloudSpin = clouds;
  return g;
}
function buildMoon() {
  const moon = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 24), new THREE.MeshPhongMaterial({ map: loadColorTex('moon_1024.jpg'), shininess: 2 }));
  return moon;
}
function buildSun() {
  const g = new THREE.Group();
  const sun = new THREE.Mesh(new THREE.SphereGeometry(20, 24, 18), new THREE.MeshBasicMaterial({ color: 0xffcf6b }));
  g.add(sun);
  const glow = makeGlowSprite(0xffb347, 70);
  g.add(glow);
  return g;
}

/* ---------------- BLACK HOLE HAZARD ----------------
   Visually this hazard is the real GARGANTUA Schwarzschild raytracer
   (black-hole-shaders.js, ported from experiments/gargantua/) rendered
   as a full-screen backdrop behind the ship — see buildBlackHoleFX()/
   renderBlackHoleFX() below. This group only carries the hazard's
   world position for spawn/collision math; the old placeholder
   sphere+torus+particle mesh stays in the scene as a live fallback —
   loop() shows it only on frames where the raytracer backdrop didn't
   actually draw (WebGL limits, a caught runtime error, etc.), so a
   failure never leaves the hazard with nothing visible at all. */
function buildBlackHole() {
  const g = new THREE.Group();
  const core = new THREE.Mesh(new THREE.SphereGeometry(2.2, 24, 18), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  g.add(core);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.28, 10, 40), new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: 0.85 }));
  ring.rotation.x = Math.PI / 2.4;
  g.add(ring);
  const glow = makeGlowSprite(0x8b5cf6, 10);
  g.add(glow);

  const pCount = 90;
  const positions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 3;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
    positions[i * 3 + 2] = Math.sin(a) * r;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xbfa0ff, size: 0.22, transparent: true, opacity: 0.8 }));
  g.add(particles);

  g.userData.core = core;
  g.userData.ring = ring;
  g.userData.glow = glow;
  g.userData.particles = particles;
  return g;
}

/* ---- GARGANTUA backdrop: real geodesic raytracer, driven by the actual
   game camera position/orientation relative to the hazard so the lensing
   lines up with where the hazard sits on screen. RS (event-horizon radius
   in the shader's own units) is mapped to the hazard's old core radius
   (2.2 world units) so distance/collision numbers stay meaningful. ---- */
const BH_RS_SCALE = 2.2;
let bhScene, bhCam, bhUniforms, bhRT, bhCompScene, bhCompCam, bhCompUniforms;
let BH_FX_OK = true;
function buildBlackHoleFX() {
  try {
    bhScene = new THREE.Scene();
    bhCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    bhUniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3(0, 0, 30) },
      uCamTarget: { value: new THREE.Vector3(0, 0, 0) },
      uFov: { value: 1 },
      uSteps: { value: 90 },
      uRotSign: { value: 1 },
      uDebug: { value: 0 },
      uDin: { value: 2.75 },
      uDout: { value: 40 },
      uDopMax: { value: 1.85 },
      uOpNear: { value: 0.90 },
      uOpFar: { value: 0.80 },
      uDiskBright: { value: 1.1 },
      uStarBright: { value: 1 },
      uSkyFloor: { value: 0.02 },
      uRotSpeed: { value: 1 },
    };
    const bhMat = new THREE.ShaderMaterial({ vertexShader: RAY_VERT, fragmentShader: RAY_FRAG, uniforms: bhUniforms, depthTest: false, depthWrite: false });
    bhScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bhMat));

    const rtType = THREE.HalfFloatType;
    bhRT = new THREE.WebGLRenderTarget(2, 2, { type: rtType, depthBuffer: false });

    bhCompScene = new THREE.Scene();
    bhCompCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    bhCompUniforms = {
      tDiffuse: { value: bhRT.texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uVignette: { value: 0.9 },
      uGrain: { value: 0.035 },
      uCA: { value: 0.0025 },
    };
    const compMat = new THREE.ShaderMaterial({ vertexShader: COMPOSITE_VERT, fragmentShader: COMPOSITE_FRAG, uniforms: bhCompUniforms, depthTest: false, depthWrite: false });
    bhCompScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), compMat));
  } catch (e) {
    BH_FX_OK = false;
  }
}
// The full geodesic march is one of the most expensive real-time shaders
// there is (a dependent per-pixel raymarch loop). Rendered as a passing
// background hazard — not the whole point of the screen, like the
// standalone showcase is — it only needs to read as "a real black hole",
// so the march itself runs at a small fixed internal resolution and is
// refreshed every few frames; only the cheap composite (grain/vignette/
// chromatic aberration) re-draws every frame, at full output size, so
// motion still reads smooth even while the disk data itself updates less often.
const BH_MARCH_W = 360, BH_MARCH_H = 203;
const BH_MARCH_EVERY = 3;
let bhMarchCounter = 0;
function resizeBlackHoleFX() {
  if (!BH_FX_OK || !renderer) return;
  bhRT.setSize(BH_MARCH_W, BH_MARCH_H);
  bhUniforms.uRes.value.set(BH_MARCH_W, BH_MARCH_H);
  const size = new THREE.Vector2();
  renderer.getDrawingBufferSize(size);
  bhCompUniforms.uRes.value.copy(size);
}
const BH_FORWARD = new THREE.Vector3();
const BH_REL = new THREE.Vector3();
function renderBlackHoleFX(dt) {
  if (!BH_FX_OK) return false;
  try {
    bhUniforms.uTime.value += dt;
    BH_REL.subVectors(camera.position, blackHole.position).multiplyScalar(1 / BH_RS_SCALE);
    camera.getWorldDirection(BH_FORWARD);
    bhUniforms.uCamPos.value.copy(BH_REL);
    bhUniforms.uCamTarget.value.copy(BH_REL).add(BH_FORWARD);
    bhUniforms.uFov.value = 0.5 / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    // the raytracer's composite pass does its own manual ACES + outputs
    // display-ready color, so the renderer's own tonemap/encoding must sit
    // out for these two passes — restored before the main scene renders
    const prevTM = renderer.toneMapping, prevCS = renderer.outputColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    if (bhMarchCounter <= 0) {
      bhMarchCounter = BH_MARCH_EVERY;
      const prevTarget = renderer.getRenderTarget();
      renderer.setRenderTarget(bhRT);
      renderer.render(bhScene, bhCam);
      renderer.setRenderTarget(prevTarget);
    }
    bhMarchCounter--;
    bhCompUniforms.uTime.value = bhUniforms.uTime.value;
    renderer.render(bhCompScene, bhCompCam);

    renderer.toneMapping = prevTM;
    renderer.outputColorSpace = prevCS;
    return true;
  } catch (e) {
    BH_FX_OK = false;
    return false;
  }
}

/* ---------------- STARBORNE GARDEN ----------------
   A drifting field of connected, glowing neon particles — ported from
   the user's reference "Starborne Garden" (2D canvas epicycloid particle
   swarm with proximity connection-lines) straight into real 3D: the
   reference's own x/y/z formulas become actual Three.js world
   coordinates instead of a fake perspective projection, and the
   proximity-line pass is rebuilt every frame the same way the reference
   does it, just in 3D. Space spiders 🕷️ patrol inside the field as the
   zone's actual hazard — the garden itself is just the drifting light
   show around them. */
const SG_SCALE = 1 / 22;              // reference used pixel-space radii; this maps them to world units
const SG_COUNT = 500;
const SG_CONNECT_R = 80 * SG_SCALE;
const SG_MAX_LINES = 2600;
const NEON_HUES = [320, 185, 95, 210, 45, 275, 155];
let starGarden = null;
let sgSpiders = [];
function buildSpaceSpider() {
  const hue = NEON_HUES[Math.floor(Math.random() * NEON_HUES.length)];
  const glowColor = new THREE.Color(`hsl(${hue}, 100%, 65%)`);
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0c0a10, roughness: 0.5, metalness: 0.5, emissive: glowColor, emissiveIntensity: 0.35 });
  const abdomen = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), bodyMat);
  abdomen.scale.set(1, 0.8, 1.2);
  g.add(abdomen);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), bodyMat);
  head.position.z = 0.32;
  g.add(head);
  const eyeMat = new THREE.MeshBasicMaterial({ color: glowColor });
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), eyeMat);
    eye.position.set(0.09 * s, 0.04, 0.43);
    g.add(eye);
  }
  // legs glow — dark body, bright neon limbs, so the silhouette reads as a
  // spider (not a blob) against both the black void and the bright garden
  const legMat = new THREE.MeshStandardMaterial({ color: 0x0c0a10, emissive: glowColor, emissiveIntensity: 1.1, roughness: 0.4 });
  const legs = [];
  for (let i = 0; i < 8; i++) {
    const side = i < 4 ? 1 : -1;
    const row = i % 4;
    const hip = new THREE.Group();
    hip.position.set(0.16 * side, 0.02, 0.26 - row * 0.17);
    hip.rotation.z = side * 0.95;
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.036, 0.5, 5), legMat);
    upper.position.y = -0.25;
    hip.add(upper);
    const knee = new THREE.Group();
    knee.position.y = -0.5;
    hip.add(knee);
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.026, 0.42, 5), legMat);
    lower.position.y = -0.21;
    knee.rotation.x = side * 0.75;
    knee.add(lower);
    g.add(hip);
    legs.push({ hip, knee, side, phase: (i % 4) * 1.4 });
  }
  g.userData.legs = legs;
  g.userData.glowColor = glowColor;
  g.userData.walkT = Math.random() * 10;
  g.userData.wanderPhase = Math.random() * Math.PI * 2;
  g.scale.setScalar(1.6);
  return g;
}
function buildStarGarden() {
  const g = new THREE.Group();
  g.visible = false;

  const positions = new Float32Array(SG_COUNT * 3);
  const colors = new Float32Array(SG_COUNT * 3);
  const state = [];
  const tmpColor = new THREE.Color();
  for (let i = 0; i < SG_COUNT; i++) {
    const hue = NEON_HUES[Math.floor(Math.random() * NEON_HUES.length)] + (Math.random() * 20 - 10);
    state.push({
      n: Math.floor(Math.random() * 3) + 1,
      a: (Math.random() * 5 + 2) * SG_SCALE,
      baseRadius: (Math.random() * 200 + 50) * SG_SCALE,
      omega: (Math.random() * 0.01) - 0.005,
      theta: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.002 + 0.001,
      hue,
    });
    tmpColor.setHSL(hue / 360, 1, 0.68);
    colors[i * 3] = tmpColor.r; colors[i * 3 + 1] = tmpColor.g; colors[i * 3 + 2] = tmpColor.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  if (!GLOW_TEX) GLOW_TEX = makeGlowTexture();
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.16, map: GLOW_TEX, vertexColors: true, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  }));
  g.add(points);

  const linePositions = new Float32Array(SG_MAX_LINES * 2 * 3);
  const lineColors = new Float32Array(SG_MAX_LINES * 2 * 3);
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
  lGeo.setDrawRange(0, 0);
  const lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  g.add(lines);

  const spiders = [];
  for (let i = 0; i < 4; i++) {
    const spider = buildSpaceSpider();
    const a = (i / 4) * Math.PI * 2 + Math.random();
    const r = 1.6 + Math.random() * 2.2;
    spider.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.6, (Math.random() - 0.5) * 2.5);
    g.add(spider);
    spiders.push({ group: spider, alive: true });
  }

  g.userData.points = points;
  g.userData.lines = lines;
  g.userData.state = state;
  g.userData.spiders = spiders;
  g.userData.time = 0;
  return g;
}
const SG_SPAWN_Z = -180;
function spawnStarGarden() {
  if (!starGarden) return;
  starGarden.visible = true;
  starGarden.position.set((Math.random() - 0.5) * BOUND_X * 1.4, (Math.random() - 0.5) * BOUND_Y * 0.8, SG_SPAWN_Z);
  starGarden.userData.time = 0;
  starGarden.userData.spiders.forEach((s, i) => {
    s.alive = true;
    s.group.visible = true;
    const a = (i / 4) * Math.PI * 2 + Math.random();
    const r = 1.6 + Math.random() * 2.2;
    s.group.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.6, (Math.random() - 0.5) * 2.5);
  });
}
const _sgColor = new THREE.Color();
function updateStarGarden(dt, moveZ) {
  const g = starGarden;
  if (!g || !g.visible) return;
  g.position.z += moveZ;
  const t = (g.userData.time += dt) * 1000;

  const state = g.userData.state;
  const posAttr = g.userData.points.geometry.attributes.position;
  const colAttr = g.userData.points.geometry.attributes.color;
  for (let i = 0; i < SG_COUNT; i++) {
    const p = state[i];
    p.theta += p.speed;
    const r = p.baseRadius + p.a * Math.cos(p.n * p.theta + p.omega * t);
    const x = Math.cos(p.theta) * r;
    const y = Math.sin(p.theta) * r;
    const z = Math.sin(p.theta * 0.7) * r * 0.3;
    posAttr.setXYZ(i, x, y, z);
    p.sx = x; p.sy = y; p.sz = z;
    const hue = (p.hue + t * 0.01) % 360;
    _sgColor.setHSL(((hue + 360) % 360) / 360, 1, 0.68);
    colAttr.setXYZ(i, _sgColor.r, _sgColor.g, _sgColor.b);
  }
  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;

  const lPos = g.userData.lines.geometry.attributes.position;
  const lCol = g.userData.lines.geometry.attributes.color;
  let li = 0;
  for (let i = 0; i < SG_COUNT && li < SG_MAX_LINES; i++) {
    const p1 = state[i];
    for (let j = i + 1; j < SG_COUNT && li < SG_MAX_LINES; j++) {
      const p2 = state[j];
      const dx = p1.sx - p2.sx, dy = p1.sy - p2.sy, dz = p1.sz - p2.sz;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > SG_CONNECT_R * SG_CONNECT_R) continue;
      const k = li * 2;
      lPos.setXYZ(k, p1.sx, p1.sy, p1.sz);
      lPos.setXYZ(k + 1, p2.sx, p2.sy, p2.sz);
      _sgColor.setHSL(((p1.hue + p2.hue) / 2 % 360) / 360, 1, 0.7);
      lCol.setXYZ(k, _sgColor.r, _sgColor.g, _sgColor.b);
      lCol.setXYZ(k + 1, _sgColor.r, _sgColor.g, _sgColor.b);
      li++;
    }
  }
  lPos.needsUpdate = true;
  lCol.needsUpdate = true;
  g.userData.lines.geometry.setDrawRange(0, li * 2);

  g.userData.spiders.forEach((s) => {
    if (!s.alive) return;
    const sp = s.group;
    sp.userData.walkT += dt * 6;
    sp.userData.legs.forEach((leg) => {
      const swing = Math.sin(sp.userData.walkT + leg.phase) * 0.5;
      leg.hip.rotation.x = swing;
      leg.knee.rotation.z = Math.abs(swing) * 0.6;
    });
    sp.userData.wanderPhase += dt * 0.5;
    sp.position.x += Math.sin(sp.userData.wanderPhase) * dt * 0.3;
    sp.position.y += Math.cos(sp.userData.wanderPhase * 0.7) * dt * 0.2;
    sp.rotation.y += dt * 0.8;

    const worldPos = new THREE.Vector3();
    sp.getWorldPosition(worldPos);
    const d = worldPos.distanceTo(ship.position);
    if (d < 1.1 && gs.invuln <= 0) {
      gs.hull = Math.max(0, gs.hull - 14);
      gs.invuln = 0.8;
      spawnBurst(worldPos, sp.userData.glowColor.getHex());
      s.alive = false;
      sp.visible = false;
      playTone(180, 0.22, 'square');
    }
  });

  if (g.position.z > 40) { g.visible = false; }
}

/* ---------------- GAME ---------------- */
let renderer, scene, camera, clock;
let ship, stars, nebulaA, nebulaB, launchPad;
let asteroidPool = [], orbPool = [], milestonePool = [];
let blackHole;
let animFrameId = null;
let audioCtx;

const BOUND_X = 6, BOUND_Y = 3.6;
let gs;

const LAUNCH_IGNITE = 1.1;
const LAUNCH_DUR = 6.5;

function startFlight() {
  cleanupScene();
  gs = {
    running: true,
    paused: false,
    phase: 'launch',
    launchT: 0,
    speed: 18,
    distance: 0,
    score: 0,
    wordsCorrect: 0,
    shield: 60,
    hull: 100,
    shipX: 0,
    shipY: 0,
    targetX: 0,
    targetY: 0,
    invuln: 0,
    round: null,
    roundTimer: 0,
    asteroidTimer: 1.5,
    holeActive: false,
    holeTimer: 10 + Math.random() * 5,
    gardenTimer: 16 + Math.random() * 8,
  };

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x040814, 0.006);

  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 900);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  $('#scene3d').appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x3a4f66, 1.0));
  const key = new THREE.DirectionalLight(0xfff0da, 1.2);
  key.position.set(-20, 15, -10);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x6f9bd6, 0.55);
  fill.position.set(20, 6, 12);
  scene.add(fill);
  scene.add(new THREE.HemisphereLight(0x8fb6ff, 0x11151c, 0.5));

  stars = buildStarfield();
  scene.add(stars);
  nebulaA = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: 0x7fb0ff, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false }));
  nebulaA.position.set(-120, 30, -300);
  nebulaA.scale.setScalar(240);
  scene.add(nebulaA);
  nebulaB = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: 0xff9ad5, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false }));
  nebulaB.position.set(140, -20, -380);
  nebulaB.scale.setScalar(220);
  scene.add(nebulaB);

  asteroidPool = buildAsteroidPool();
  orbPool = buildOrbPool();
  milestonePool = buildMilestonePool();
  BH_FX_OK = true;
  buildBlackHoleFX();
  resizeBlackHoleFX();
  blackHole = buildBlackHole();
  blackHole.visible = false;
  scene.add(blackHole);

  starGarden = buildStarGarden();
  scene.add(starGarden);

  ship = buildShip();
  scene.add(ship);

  launchPad = buildLaunchPad();
  scene.add(launchPad);
  ship.position.set(0, LAUNCH_GROUND_Y, 0);
  camera.position.set(4.5, LAUNCH_GROUND_Y + 1.6, 8);
  camera.lookAt(0, LAUNCH_GROUND_Y + 1.5, 0);
  $('#launchBanner').style.display = 'block';
  $('#launchLbl').textContent = '🚀 استعدّوا للإطلاق';
  $('#launchWord').textContent = 'العد التنازلي…';

  bindControls();
  startEngineAudio();
  onResize();
  addEventListener('resize', onResize);

  animFrameId = requestAnimationFrame(loop);
}

const LAUNCH_GROUND_Y = -8;
function buildLaunchPad() {
  const g = new THREE.Group();
  const padMat = new THREE.MeshStandardMaterial({ color: 0x3a3f48, roughness: 0.9, metalness: 0.1 });
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(6, 6.6, 0.6, 24), padMat);
  pad.position.set(0, LAUNCH_GROUND_Y - 1.6, 0);
  g.add(pad);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb877, transparent: true, opacity: 0.75 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.5, 32), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0, LAUNCH_GROUND_Y - 1.28, 0);
  g.add(ring);
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x5a626e, roughness: 0.7, metalness: 0.3 });
  [-1, 1].forEach((s) => {
    const tower = new THREE.Mesh(new THREE.BoxGeometry(0.35, 6, 0.35), towerMat);
    tower.position.set(s * 3.4, LAUNCH_GROUND_Y + 1.4, -1.2);
    g.add(tower);
  });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(220, 32), new THREE.MeshStandardMaterial({ color: 0x1c2233, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, LAUNCH_GROUND_Y - 1.9, 0);
  g.add(ground);
  return g;
}

function buildStarfield() {
  const n = 1800;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 300 + Math.random() * 250;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.cos(ph);
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 200;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, transparent: true, opacity: 0.85 });
  return new THREE.Points(geo, mat);
}

function buildAsteroidPool() {
  const items = [];
  const mat = new THREE.MeshStandardMaterial({ color: 0x8c8478, roughness: 1, flatShading: true });
  for (let i = 0; i < 14; i++) {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    const posAttr = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let j = 0; j < posAttr.count; j++) {
      v.fromBufferAttribute(posAttr, j).normalize().multiplyScalar(0.7 + Math.random() * 0.5);
      posAttr.setXYZ(j, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(0.4 + Math.random() * 0.6);
    mesh.visible = false;
    scene.add(mesh);
    items.push({ mesh, active: false, rx: (Math.random() - 0.5) * 2, ry: (Math.random() - 0.5) * 2 });
  }
  return items;
}
function spawnAsteroid() {
  const a = asteroidPool.find((x) => !x.active);
  if (!a) return;
  a.active = true;
  a.mesh.visible = true;
  a.mesh.position.set((Math.random() - 0.5) * BOUND_X * 2, (Math.random() - 0.5) * BOUND_Y * 2, -150 - Math.random() * 40);
}

function buildOrbPool() {
  const items = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 16), new THREE.MeshStandardMaterial({ color: 0x5ee6ff, emissive: 0x2b8ba3, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.2, transparent: true, opacity: 0.92 }));
    g.add(core);
    const glow = makeGlowSprite(0x8feeff, 3.2);
    g.add(glow);
    const label = makeLabelSprite();
    label.position.y = 1.95;
    g.add(label);
    g.visible = false;
    scene.add(g);
    items.push({ g, core, glow, label, active: false, correct: false, bob: Math.random() * Math.PI * 2 });
  }
  return items;
}
function makeLabelSprite() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 220;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sp.scale.set(2.3, 2.0, 1);
  sp.userData.canvas = c;
  sp.userData.ctx = ctx;
  sp.userData.tex = tex;
  return sp;
}
function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = w;
      if (lines.length === maxLines - 1) break;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const rest = words.slice(lines.join(' ').split(' ').length).join(' ');
  if (rest && lines.length >= maxLines) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}
function setLabelText(sprite, emoji, meaning) {
  const c = sprite.userData.canvas;
  const ctx = sprite.userData.ctx;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,.7)';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#fff';

  ctx.font = '54px Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, c.width / 2, 42);

  ctx.font = '600 25px Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';
  const lines = wrapLines(ctx, meaning, c.width - 16, 4);
  const lineHeight = 30;
  const startY = 98;
  lines.forEach((l, i) => ctx.fillText(l, c.width / 2, startY + i * lineHeight));
  sprite.userData.tex.needsUpdate = true;
}

function buildMilestonePool() {
  const earth = buildEarth();
  const moon = buildMoon();
  const sun = buildSun();
  [earth, moon, sun].forEach((m) => { m.visible = false; scene.add(m); });
  return [
    { g: earth, active: false, kind: 'earth' },
    { g: moon, active: false, kind: 'moon' },
    { g: sun, active: false, kind: 'sun' },
  ];
}
function spawnMilestone() {
  const m = milestonePool.find((x) => !x.active);
  if (!m) return;
  m.active = true;
  m.g.visible = true;
  const side = Math.random() < 0.5 ? -1 : 1;
  m.g.position.set(side * (60 + Math.random() * 40), (Math.random() - 0.5) * 30, -400 - Math.random() * 60);
}

/* ---------------- WORD ROUND ---------------- */
let currentWord = null, usedRecently = [];
function nextWord() {
  let pick;
  do {
    pick = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
  } while (WORD_BANK.length > 3 && usedRecently.includes(pick.en));
  usedRecently.push(pick.en);
  if (usedRecently.length > 3) usedRecently.shift();
  currentWord = pick;
  $('#targetWord').textContent = pick.en;
  spawnRound(pick);
}
function spawnRound(word) {
  orbPool.forEach((o) => { o.active = false; o.g.visible = false; });
  const decoys = WORD_BANK.filter((w) => w.en !== word.en).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [word, ...decoys].sort(() => Math.random() - 0.5);
  const slots = [-3.9, -1.3, 1.3, 3.9];
  options.forEach((opt, i) => {
    const o = orbPool[i];
    if (!o) return;
    o.active = true;
    o.g.visible = true;
    o.correct = opt.en === word.en;
    o.entry = opt;
    setLabelText(o.label, opt.emoji, opt.meaning);
    o.g.position.set(slots[i] + (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 2.2, -120 - Math.random() * 10);
  });
  gs.round = { resolved: false };
  gs.roundTimer = 14;
}

/* ---------------- CONTROLS ---------------- */
function bindControls() {
  gs.pointer = { x: 0, y: 0 };
  gs.pointerHandler = (e) => {
    const t = e.touches ? e.touches[0] : e;
    if (!t) return;
    gs.pointer.x = (t.clientX / innerWidth) * 2 - 1;
    gs.pointer.y = -(t.clientY / innerHeight) * 2 + 1;
    gs.targetX = gs.pointer.x * BOUND_X;
    gs.targetY = gs.pointer.y * BOUND_Y;
  };
  addEventListener('mousemove', gs.pointerHandler);
  addEventListener('touchmove', gs.pointerHandler, { passive: true });
  addEventListener('touchstart', gs.pointerHandler, { passive: true });

  gs.raycaster = new THREE.Raycaster();
  gs.tapHandler = (e) => {
    if (gs.paused || !gs.running) return;
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const ndc = new THREE.Vector2((t.clientX / innerWidth) * 2 - 1, -(t.clientY / innerHeight) * 2 + 1);
    gs.raycaster.setFromCamera(ndc, camera);
    const meshes = orbPool.filter((o) => o.active).map((o) => o.core);
    const hits = gs.raycaster.intersectObjects(meshes, false);
    if (hits.length) {
      const orb = orbPool.find((o) => o.core === hits[0].object);
      resolveOrb(orb);
    }
  };
  addEventListener('click', gs.tapHandler);
  addEventListener('touchend', gs.tapHandler);

  $('#pauseBtn').addEventListener('click', togglePause);
  $('#goRestartBtn').addEventListener('click', () => { showScreen('screen-game'); startFlight(); });
  $('#goMenuBtn').addEventListener('click', () => { showScreen('screen-menu'); });
}
function togglePause() {
  gs.paused = !gs.paused;
  $('#pauseBtn').textContent = gs.paused ? '▶️' : '⏸️';
}

function resolveOrb(orb) {
  if (!orb || !orb.active || gs.round.resolved) return;
  gs.round.resolved = true;
  spawnBurst(orb.g.position, orb.correct ? 0x7dff8a : 0xff4d5e);
  if (orb.correct) {
    gs.score += 100;
    gs.wordsCorrect++;
    playTone(880, 0.12);
  } else {
    gs.shield = Math.max(0, gs.shield - 15);
    playTone(180, 0.2, 'sawtooth');
    if (gs.shield <= 0 && gs.hull > 0) gs.hull = Math.max(0, gs.hull - 10);
  }
  orbPool.forEach((o) => { o.active = false; o.g.visible = false; });
  setTimeout(() => { if (gs.running && !gs.paused) nextWord(); }, 650);
}

/* ---------------- PARTICLES ---------------- */
let burstParticles = [];
function spawnBurst(pos, color) {
  for (let i = 0; i < 14; i++) {
    const mat = new THREE.SpriteMaterial({ map: GLOW_TEX, color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
    const sp = new THREE.Sprite(mat);
    sp.position.copy(pos);
    sp.scale.setScalar(0.4);
    scene.add(sp);
    const dir = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    burstParticles.push({ sp, vel: dir.multiplyScalar(3 + Math.random() * 3), life: 0.6 });
  }
}
function updateBursts(dt) {
  for (let i = burstParticles.length - 1; i >= 0; i--) {
    const p = burstParticles[i];
    p.life -= dt;
    if (p.life <= 0) { scene.remove(p.sp); burstParticles.splice(i, 1); continue; }
    p.sp.position.addScaledVector(p.vel, dt);
    p.sp.material.opacity = Math.max(0, p.life / 0.6);
  }
}

/* ---------------- AUDIO ---------------- */
function startEngineAudio() {
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
}
function playTone(freq, dur, type) {
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type || 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.12, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur + 0.03);
}
function stopAudio() {
  if (audioCtx) { try { audioCtx.close(); } catch (e) {} }
  audioCtx = null;
}

/* ---------------- LOOP ---------------- */
function loop() {
  if (!gs.running) return;
  animFrameId = requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (gs.paused) { renderer.render(scene, camera); return; }
  if (gs.phase === 'launch') updateLaunch(dt); else update(dt);
  if (gs.holeActive) {
    const fxDrawn = renderBlackHoleFX(dt);
    const u = blackHole.userData;
    u.core.visible = u.ring.visible = u.glow.visible = u.particles.visible = !fxDrawn;
    if (fxDrawn) {
      renderer.autoClear = false;
      renderer.clearDepth();
      renderer.render(scene, camera);
      renderer.autoClear = true;
    } else {
      renderer.render(scene, camera);
    }
  } else {
    renderer.render(scene, camera);
  }
}

function updateLaunch(dt) {
  gs.launchT += dt;
  const t = gs.launchT;
  const flame = ship.userData.flame, glow = ship.userData.glow;

  if (t < LAUNCH_IGNITE) {
    const k = t / LAUNCH_IGNITE;
    flame.scale.set(1, 0.3 + k * 0.5, 1);
    glow.scale.setScalar(0.6 + k * 0.4);
    ship.position.y = LAUNCH_GROUND_Y + Math.sin(t * 60) * 0.02 * k;
    if (Math.random() < dt * 18) spawnBurst(new THREE.Vector3(ship.position.x + (Math.random() - 0.5) * 1.5, LAUNCH_GROUND_Y - 1.2, (Math.random() - 0.5) * 1.5), 0xffcf8a);
    $('#launchWord').textContent = 'الإشعال… 🔥';
  } else {
    const at = Math.min(1, (t - LAUNCH_IGNITE) / (LAUNCH_DUR - LAUNCH_IGNITE));
    const ease = 1 - Math.pow(1 - at, 2);
    ship.position.y = LAUNCH_GROUND_Y + ease * 42;
    const flick = 0.85 + Math.sin(clock.elapsedTime * 40) * 0.15;
    flame.scale.set(1, (1.1 + at * 0.6) * flick, 1);
    glow.scale.setScalar(1.3 * flick);
    if (Math.random() < dt * 26) {
      spawnBurst(new THREE.Vector3(ship.position.x + (Math.random() - 0.5) * 1.2, ship.position.y - 1.6, (Math.random() - 0.5) * 1.2), 0xffb877);
    }
    $('#launchWord').textContent = at < 1 ? 'الانطلاق! 🚀' : 'ندخل الفضاء…';

    const camT = Math.min(1, at * 1.3);
    camera.position.set(
      THREE.MathUtils.lerp(4.5, ship.position.x * 0.5, camT),
      ship.position.y + 1.6,
      ship.position.z + 8
    );
    camera.lookAt(ship.position.x, ship.position.y, ship.position.z - 10);

    const skyMix = Math.min(1, at * 1.6);
    scene.fog.density = THREE.MathUtils.lerp(0.0015, 0.006, skyMix);
    stars.material.opacity = THREE.MathUtils.lerp(0.15, 0.85, skyMix);
  }

  updateBursts(dt);

  if (t >= LAUNCH_DUR) {
    gs.phase = 'flight';
    ship.position.set(0, 0, 0);
    ship.userData.flame.scale.set(1, 1, 1);
    ship.userData.glow.scale.setScalar(1.1);
    scene.remove(launchPad);
    stars.material.opacity = 0.85;
    scene.fog.density = 0.006;
    $('#launchBanner').style.display = 'none';
    nextWord();
  }
}

function update(dt) {
  gs.shipX = THREE.MathUtils.lerp(gs.shipX, gs.targetX, dt * 4);
  gs.shipY = THREE.MathUtils.lerp(gs.shipY, gs.targetY, dt * 4);
  ship.position.x = gs.shipX;
  ship.position.y = gs.shipY;
  ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, (gs.targetX - gs.shipX) * -0.15, dt * 6);
  ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, (gs.targetY - gs.shipY) * 0.1, dt * 6);
  const flick = 0.85 + Math.sin(clock.elapsedTime * 40) * 0.15;
  ship.userData.flame.scale.set(1, flick, 1);
  ship.userData.glow.scale.setScalar(1.1 * flick);

  const moveZ = gs.speed * dt;
  gs.distance += moveZ;
  gs.score = gs.score; // score changes only via events; distance tracked separately

  camera.position.lerp(new THREE.Vector3(ship.position.x * 0.5, ship.position.y * 0.5 + 1.2, ship.position.z + 8), dt * 4);
  camera.lookAt(ship.position.x, ship.position.y, ship.position.z - 10);

  stars.position.z += moveZ * 0.2;
  if (stars.position.z > 200) stars.position.z -= 200;

  gs.asteroidTimer -= dt;
  if (gs.asteroidTimer <= 0) { spawnAsteroid(); gs.asteroidTimer = 1.1 + Math.random() * 1.0; }
  asteroidPool.forEach((a) => {
    if (!a.active) return;
    a.mesh.position.z += moveZ;
    a.mesh.rotation.x += a.rx * dt;
    a.mesh.rotation.y += a.ry * dt;
    if (a.mesh.position.z > 12) { a.active = false; a.mesh.visible = false; return; }
    const d = a.mesh.position.distanceTo(ship.position);
    if (d < 1.6 && gs.invuln <= 0) {
      gs.hull = Math.max(0, gs.hull - 18);
      gs.invuln = 0.8;
      spawnBurst(a.mesh.position, 0xffb347);
      a.active = false;
      a.mesh.visible = false;
      playTone(140, 0.25, 'sawtooth');
    }
  });
  gs.invuln = Math.max(0, gs.invuln - dt);

  orbPool.forEach((o) => {
    if (!o.active) return;
    o.g.position.z += moveZ;
    o.bob += dt * 2;
    o.g.position.y += Math.sin(o.bob) * 0.003;
  });
  if (gs.round && !gs.round.resolved) {
    gs.roundTimer -= dt;
    if (gs.roundTimer <= 0 || (orbPool.find((o) => o.active) && orbPool.find((o) => o.active).g.position.z > 12)) {
      gs.round.resolved = true;
      orbPool.forEach((o) => { o.active = false; o.g.visible = false; });
      setTimeout(() => { if (gs.running && !gs.paused) nextWord(); }, 300);
    }
  }

  milestonePool.forEach((m) => {
    if (!m.active) return;
    m.g.position.z += moveZ * 0.8;
    if (m.g.userData.spin) m.g.userData.spin.rotation.y += dt * 0.1;
    if (m.g.userData.cloudSpin) m.g.userData.cloudSpin.rotation.y += dt * 0.14;
    if (m.g.position.z > 40) { m.active = false; m.g.visible = false; }
  });
  if (Math.random() < dt * 0.06) spawnMilestone();

  if (!gs.holeActive) {
    gs.holeTimer -= dt;
    if (gs.holeTimer <= 0) spawnBlackHole();
  } else {
    blackHole.position.z += moveZ * 0.85;
    blackHole.userData.baseX += Math.sin(gs.distance * 0.04) * dt * 1.2;
    blackHole.position.x = blackHole.userData.baseX;
    blackHole.userData.ring.rotation.z += dt * 2;
    blackHole.userData.particles.rotation.y += dt * 3;
    const distAhead = -blackHole.position.z;
    $('#hud-warning').style.display = distAhead < 45 && distAhead > -6 ? 'inline-block' : 'none';
    const d = blackHole.position.distanceTo(ship.position);
    if (d < 3.4) {
      endFlight('hole');
    } else if (blackHole.position.z > 14) {
      blackHole.visible = false;
      gs.holeActive = false;
      $('#hud-warning').style.display = 'none';
      gs.holeTimer = 14 + Math.random() * 8;
    }
  }

  if (!starGarden.visible) {
    gs.gardenTimer -= dt;
    if (gs.gardenTimer <= 0) { spawnStarGarden(); gs.gardenTimer = 22 + Math.random() * 10; }
  } else {
    updateStarGarden(dt, moveZ * 0.8);
  }

  updateBursts(dt);
  updateHud();

  if (gs.hull <= 0) endFlight('hull');
}

function spawnBlackHole() {
  gs.holeActive = true;
  blackHole.visible = true;
  blackHole.userData.baseX = (Math.random() - 0.5) * BOUND_X * 1.6;
  blackHole.position.set(blackHole.userData.baseX, (Math.random() - 0.5) * BOUND_Y, -170);
}

function onResize() {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  resizeBlackHoleFX();
}

function updateHud() {
  $('#hud-score').textContent = `النقاط: ${gs.score}`;
  $('#speedVal').textContent = Math.floor(gs.distance);
  $('#shieldBar i').style.width = `${(gs.shield / 60) * 100}%`;
  $('#hullBar i').style.width = `${gs.hull}%`;
  $('#hullBar').classList.toggle('low', gs.hull <= 30);
}

function endFlight(reason) {
  if (!gs.running) return;
  gs.running = false;
  $('#launchBanner').style.display = 'none';
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopAudio();
  removeEventListener('resize', onResize);
  removeEventListener('mousemove', gs.pointerHandler);
  removeEventListener('touchmove', gs.pointerHandler);
  removeEventListener('touchstart', gs.pointerHandler);
  removeEventListener('click', gs.tapHandler);
  removeEventListener('touchend', gs.tapHandler);

  const best = Math.max(gs.score, Number(localStorage.getItem('palm_space_best') || 0));
  localStorage.setItem('palm_space_best', String(best));

  $('#goTitle').textContent = reason === 'hole' ? '🌀 سحبك الثقب الأسود!' : '💥 تضررت المركبة!';
  $('#goScore').textContent = String(gs.score);
  $('#goWords').textContent = String(gs.wordsCorrect);
  $('#goBest').textContent = String(best);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
  showScreen('screen-gameover');
}

function cleanupScene() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopAudio();
  removeEventListener('resize', onResize);
  if (gs) {
    if (gs.pointerHandler) {
      removeEventListener('mousemove', gs.pointerHandler);
      removeEventListener('touchmove', gs.pointerHandler);
      removeEventListener('touchstart', gs.pointerHandler);
    }
    if (gs.tapHandler) {
      removeEventListener('click', gs.tapHandler);
      removeEventListener('touchend', gs.tapHandler);
    }
  }
  burstParticles = [];
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
  scene = null;
}

/* ---------------- INIT ---------------- */
initMenu();
