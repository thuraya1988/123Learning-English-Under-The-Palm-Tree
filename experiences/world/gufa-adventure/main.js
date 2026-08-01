// ============================================================================
// GUFA FOLKLORE ADVENTURE — "Under the Palm Tree"
// A first-person procedural journey in a traditional woven Omani gufa through
// a village falaj. Everything (geometry, textures, sound) is generated at
// runtime. Requires WebGPU (three.js r170 WebGPURenderer + TSL).
// ============================================================================

import * as THREE from 'three/webgpu';
import {
  Fn, uniform, time, deltaTime,
  positionLocal, normalLocal, positionWorld, normalWorld, cameraPosition,
  uv, vec2, vec3, vec4, float, int, color,
  mix, smoothstep, step, clamp, saturate, pow, dot, cross, normalize, length,
  abs, sin, cos, fract, floor, exp, exp2, max, min, reflect, negate,
  pass, instanceIndex, hash
} from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20240613);
function rand(a, b) { return a + (b - a) * rng(); }
function randInt(a, b) { return Math.floor(rand(a, b + 1)); }

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// Boot: WebGPU capability check + loading screen
// ---------------------------------------------------------------------------
const loadingBar = $('loading-bar');
const loadingStatus = $('loading-status');
function setProgress(p, msg) {
  loadingBar.style.width = `${Math.round(p * 100)}%`;
  if (msg) loadingStatus.textContent = msg;
}
function showError(msg) {
  $('loading-screen').classList.add('hidden');
  if (msg) $('error-message').innerHTML = msg;
  $('error-screen').style.display = 'flex';
}

// Debug/diagnostic query params (also used by automated headless checks):
//   ?forcewebgl=1  -> run the WebGPURenderer on its WebGL2 fallback backend
//   ?debugwater=1  -> render the water with an unlit solid-magenta node
const QS = new URLSearchParams(location.search);
const FORCE_WEBGL = QS.get('forcewebgl') === '1';
const DEBUG_WATER = QS.get('debugwater') === '1';

async function checkWebGPU() {
  if (FORCE_WEBGL) return true;
  if (!navigator.gpu) return false;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch (e) { return false; }
}

// ---------------------------------------------------------------------------
// Global game state
// ---------------------------------------------------------------------------
const NUM_LEVELS = 100;
const QUESTIONS_PER_GATE = 3;    // short optional bonus riddle set at the gate
const PASS_SCORE = 0;            // bonus quiz never blocks the ride
const CHANNEL_HALF_WIDTH = 3.2;
const SAVE_KEY = 'gufa-folklore-save-v1';
const BASE_SPEED = 14;           // rushing current: world units / second at 1.0x (slowed from 21 for readability)
const TOKENS_TARGET = 9;         // correct tokens that complete a segment early

const state = {
  running: false,
  paused: false,
  pauseOverlay: false,     // user-initiated pause (Esc / button)
  dist: 0,               // distance travelled along the path
  speed: 8,              // current world units / second (acceleration ramp)
  speedMul: 1.0,
  lateral: 0,            // steering offset within channel
  lateralVel: 0,
  yaw: 0, pitch: 0,      // free look
  roll: 0,               // camera roll into curves (smoothed)
  level: 1,
  score: 0,
  streak: 0,
  bestStreak: 0,
  gateIndex: 0,          // next gate to hit
  inQuiz: false,
  gateAnim: 0,           // 0 closed .. 1 open
  gateOpening: false,
  finished: false,
  flow: 2,               // 0 calm, 1 flowing, 2 rushing (default: rushing!)
  muted: false,
  narrator: true,
  highQuality: true,
  tod: 0.30,             // time of day 0..1 (dawn..night)
  save: null,            // loaded save data { level, score, best:{} }
  // --- token-run gameplay ---
  topic: '',             // topic word for this segment
  tokCorrect: 0,         // correct tokens collected this segment
  tokWrong: 0,           // wrong tokens hit this segment
  tokSpawnDist: 0,       // spawn cursor ahead of the boat
  surge: false,          // target met: speed burst to the gate
  drop: 0,               // ramp-drop airtime timer (0 = inactive)
  dropY: 0,
  scrapeCd: 0,           // edge-scrape cooldown
  // --- khamaseen wind event ---
  wind: 0,               // 0 calm .. 1 full gust (smoothed)
  windTimer: 30,         // seconds until next gust
  windActive: 0,         // seconds left in the current gust
};

// Per-segment difficulty easing: later levels run faster, with denser wrong
// tokens and rarer correct ones (and the quiz draws from the harder pool).
function levelSpeedMul(level) { return 1 + ((level - 1) / (NUM_LEVELS - 1)) * 0.45; }
function wrongRatioFor(level) { return 0.35 + ((level - 1) / (NUM_LEVELS - 1)) * 0.35; }

// Difficulty easing: later levels draw from the harder (later) part of each
// level's 100-question pool and give fewer free retries before a penalty.
function freeRetriesFor(level) { return level <= 25 ? 1 : 0; }
function poolStartFor(level, poolLen) {
  const f = (level - 1) / (NUM_LEVELS - 1);
  const window = Math.min(poolLen, 40);
  return Math.floor(f * Math.max(0, poolLen - window));
}

// ---------------------------------------------------------------------------
// TSL helpers: hash / value noise / fbm  (self-contained, no external nodes)
// ---------------------------------------------------------------------------
const hash2 = Fn(([p]) => {
  return fract(sin(dot(p, vec2(127.1, 311.7))).mul(43758.5453123));
});

const vnoise2 = Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  const u = f.mul(f).mul(float(3.0).sub(f.mul(2.0))).toVar();
  const a = hash2(i);
  const b = hash2(i.add(vec2(1.0, 0.0)));
  const c = hash2(i.add(vec2(0.0, 1.0)));
  const d = hash2(i.add(vec2(1.0, 1.0)));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
});

const fbm2 = Fn(([p]) => {
  const v = float(0.0).toVar();
  const amp = float(0.5).toVar();
  const pp = vec2(p.x, p.y).toVar();
  for (let i = 0; i < 6; i++) {
    v.addAssign(amp.mul(vnoise2(pp)));
    pp.assign(pp.mul(2.03).add(vec2(19.7, 7.3)));
    amp.mulAssign(0.5);
  }
  return v;
});

const hash3 = Fn(([p]) => {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))).mul(43758.5453123));
});

const vnoise3 = Fn(([p]) => {
  const i = floor(p).toVar();
  const f = fract(p).toVar();
  const u = f.mul(f).mul(float(3.0).sub(f.mul(2.0))).toVar();
  const a = mix(hash3(i), hash3(i.add(vec3(1, 0, 0))), u.x);
  const b = mix(hash3(i.add(vec3(0, 1, 0))), hash3(i.add(vec3(1, 1, 0))), u.x);
  const c = mix(hash3(i.add(vec3(0, 0, 1))), hash3(i.add(vec3(1, 0, 1))), u.x);
  const d = mix(hash3(i.add(vec3(0, 1, 1))), hash3(i.add(vec3(1, 1, 1))), u.x);
  return mix(mix(a, b, u.y), mix(c, d, u.y), u.z);
});

const fbm3 = Fn(([p]) => {
  const v = float(0.0).toVar();
  const amp = float(0.5).toVar();
  const pp = vec3(p.x, p.y, p.z).toVar();
  for (let i = 0; i < 4; i++) {
    v.addAssign(amp.mul(vnoise3(pp)));
    pp.assign(pp.mul(2.11).add(vec3(13.1, 7.7, 5.9)));
    amp.mulAssign(0.5);
  }
  return v;
});

// ---------------------------------------------------------------------------
// Time-of-day palettes (JS-side lerp -> shared uniforms)
// Warm, cinematic grades — soft key light, gentle contrast, atmospheric haze.
// ---------------------------------------------------------------------------
const PALETTES = [
  { name: 'Dawn',   t: 0.00, zen: 0x4a5c78, hor: 0xe8b07e, sun: 0xffe0b0, sunI: 1.05, fog: 0xd9b48e, waterDeep: 0x1c3a3e, waterShallow: 0x3d6a60, amb: 0.45, sunEl: 0.10, cloudLit: 0xf7d8b4, cloudSh: 0x9a93a4, night: 0.0 },
  { name: 'Day',    t: 0.30, zen: 0x6f9cc4, hor: 0xd8e2dc, sun: 0xfff3da, sunI: 1.45, fog: 0xd4dcd2, waterDeep: 0x1d4a4a, waterShallow: 0x4a8574, amb: 0.72, sunEl: 0.85, cloudLit: 0xfffaf0, cloudSh: 0xbcb6ac, night: 0.0 },
  { name: 'Golden', t: 0.55, zen: 0x6a6f9a, hor: 0xf0b878, sun: 0xffd090, sunI: 1.3, fog: 0xe2bc90, waterDeep: 0x22464a, waterShallow: 0x4d7a68, amb: 0.55, sunEl: 0.28, cloudLit: 0xf7dcae, cloudSh: 0xa3949c, night: 0.0 },
  { name: 'Dusk',   t: 0.75, zen: 0x3c3a5e, hor: 0xc9826a, sun: 0xffab74, sunI: 0.8, fog: 0xa37c6e, waterDeep: 0x1a333c, waterShallow: 0x3a5c58, amb: 0.36, sunEl: 0.06, cloudLit: 0xdfa08a, cloudSh: 0x645e78, night: 0.05 },
  { name: 'Night',  t: 1.00, zen: 0x0a0e1c, hor: 0x1c2438, sun: 0xd8dcff, sunI: 0.25, fog: 0x141a26, waterDeep: 0x0a181e, waterShallow: 0x1a3036, amb: 0.17, sunEl: 0.45, cloudLit: 0x3c4260, cloudSh: 0x14161f, night: 1.0 },
];

function lerpPalette(t) {
  let a = PALETTES[0], b = PALETTES[PALETTES.length - 1];
  for (let i = 0; i < PALETTES.length - 1; i++) {
    if (t >= PALETTES[i].t && t <= PALETTES[i + 1].t) { a = PALETTES[i]; b = PALETTES[i + 1]; break; }
  }
  const f = clampf((t - a.t) / Math.max(1e-5, b.t - a.t), 0, 1);
  const L = (ka, kb) => {
    const ca = new THREE.Color(ka), cb = new THREE.Color(kb);
    return ca.lerp(cb, f);
  };
  return {
    name: f < 0.5 ? a.name : b.name,
    zen: L(a.zen, b.zen), hor: L(a.hor, b.hor), sun: L(a.sun, b.sun),
    fog: L(a.fog, b.fog), waterDeep: L(a.waterDeep, b.waterDeep), waterShallow: L(a.waterShallow, b.waterShallow),
    cloudLit: L(a.cloudLit, b.cloudLit), cloudSh: L(a.cloudSh, b.cloudSh),
    sunI: a.sunI + (b.sunI - a.sunI) * f,
    amb: a.amb + (b.amb - a.amb) * f,
    sunEl: a.sunEl + (b.sunEl - a.sunEl) * f,
    night: a.night + (b.night - a.night) * f,
  };
}
function clampf(v, a, b) { return Math.max(a, Math.min(b, v)); }

// Shared atmosphere uniforms (used by sky, water, fog sync)
const uZenith = uniform(new THREE.Color(0x6f9cc4));
const uHorizon = uniform(new THREE.Color(0xd8e2dc));
const uSunColor = uniform(new THREE.Color(0xfff3da));
const uSunGlow = uniform(1.0);
const uSunDir = uniform(new THREE.Vector3(0, 1, 0));
const uCloudLit = uniform(new THREE.Color(0xfffaf0));
const uCloudSh = uniform(new THREE.Color(0xbcb6ac));
const uCloudCover = uniform(0.45);
const uNight = uniform(0.0);
const uWaterDeep = uniform(new THREE.Color(0x1d4a4a));
const uWaterShallow = uniform(new THREE.Color(0x4a8574));
const uFlowAmp = uniform(1.0);
const uFlowSpeed = uniform(1.0);
const uRush = uniform(0.0);      // 0..1 speed-driven white-water streaks
const uWind = uniform(0.0);      // 0..1 khamaseen gust strength (palm sway)
// Hint ripple pulse: xy = world xz centre, z = start time (s), w = active
const uRipple = uniform(new THREE.Vector4(0, 0, -100, 0));

// ---------------------------------------------------------------------------
// Sky: ONE analytic function shared by the sky dome and water reflections
// ---------------------------------------------------------------------------
const skyColorFn = Fn(([dirRaw]) => {
  const d = normalize(dirRaw).toVar();
  const sd = dot(d, uSunDir).toVar();
  const h = clamp(d.y, -0.08, 1.0).toVar();
  const grad = mix(uHorizon, uZenith, pow(saturate(h), 0.55)).toVar();

  // sun disk + halo
  const disk = smoothstep(0.9992, 0.99965, sd);
  const halo = pow(saturate(sd), 18.0).mul(0.35).add(pow(saturate(sd), 90.0).mul(0.5));
  const col = grad.add(uSunColor.mul(disk.mul(5.0))).add(uSunColor.mul(halo).mul(uSunGlow)).toVar();

  // procedural drifting clouds (projected onto a virtual plane)
  const py = max(d.y, 0.03).toVar();
  const cuv = d.xz.div(py.add(0.18)).mul(0.55).add(vec2(time.mul(0.006), time.mul(0.0022))).toVar();
  const cn = fbm2(cuv).toVar();
  const cmask = smoothstep(uCloudCover, uCloudCover.add(0.3), cn)
    .mul(smoothstep(0.0, 0.06, d.y)).toVar();
  const lit = clamp(sd.mul(0.5).add(0.55), 0.0, 1.0);
  const cloudCol = mix(uCloudSh, uCloudLit, lit).toVar();
  col.assign(mix(col, cloudCol, cmask.mul(0.85)));

  // stars at night
  const sp = d.mul(230.0).toVar();
  const star = step(0.9985, hash3(floor(sp))).mul(smoothstep(0.05, 0.3, d.y));
  const twinkle = sin(time.mul(2.0).add(hash3(floor(sp)).mul(40.0))).mul(0.4).add(0.6);
  col.assign(col.add(vec3(star.mul(twinkle).mul(uNight).mul(1.4))));

  // moon glow at night (opposite-ish to sun, fixed direction)
  const moonDir = normalize(vec3(-0.4, 0.55, -0.6));
  const md = dot(d, moonDir);
  const moon = smoothstep(0.9995, 0.99985, md).mul(3.0).add(pow(saturate(md), 60.0).mul(0.3));
  col.assign(col.add(vec3(0.75, 0.82, 1.0).mul(moon).mul(uNight)));

  return col;
});

// ---------------------------------------------------------------------------
// Path: the falaj channel spline
// ---------------------------------------------------------------------------
const PATH_LEN = 60000;
const pathPoints = [];
{
  const r = mulberry32(777);
  const N = 640;
  let px = 0, pz = 0, heading = 0;
  const stepLen = PATH_LEN / N;
  for (let i = 0; i < N; i++) {
    pathPoints.push(new THREE.Vector3(px, 0, pz));
    if (i > 2) {
      // winding S-curves: biased random walk with periodic swing
      heading += (r() - 0.5) * 0.85 + Math.sin(i * 0.31) * 0.11;
      heading = clampf(heading, -0.62, 0.62);
    }
    px += Math.sin(heading) * stepLen;
    pz -= Math.cos(heading) * stepLen;
  }
}
const curve = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.5);
const curveLen = curve.getLength();
const GATE_SPACING = curveLen / (NUM_LEVELS + 2);

// Rapids zones + drop ramps, derived deterministically per segment so every
// level has whitewater stretches and the occasional airtime moment.
const rapidsZones = [];   // { from, to } in path distance
const dropDists = [];     // path distances with a small drop/ramp
{
  for (let i = 0; i < NUM_LEVELS; i++) {
    const segStart = GATE_SPACING * (i + 0.5);
    if (i % 3 === 1 || i % 5 === 3) {
      rapidsZones.push({ from: segStart + GATE_SPACING * 0.28, to: segStart + GATE_SPACING * 0.62 });
    }
    if (i % 4 === 2) dropDists.push(segStart + GATE_SPACING * 0.7);
  }
}
function inRapids(d) {
  for (const z of rapidsZones) if (d >= z.from && d <= z.to) return true;
  return false;
}

function pathAt(d, out) {
  const t = clampf(d / curveLen, 0, 1);
  return curve.getPointAt(t, out);
}
function tangentAt(d, out) {
  const t = clampf(d / curveLen, 0, 1);
  return curve.getTangentAt(t, out);
}

// ---------------------------------------------------------------------------
// Water: ribbon geometry along the channel + Gerstner-wave TSL material
// ---------------------------------------------------------------------------
const WAVE_DATA = [
  { dir: [1.0, 0.15], amp: 0.055, len: 7.5, speed: 1.4, q: 0.28 },
  { dir: [0.85, -0.5], amp: 0.040, len: 4.2, speed: 1.9, q: 0.30 },
  { dir: [-0.35, 1.0], amp: 0.030, len: 2.6, speed: 2.4, q: 0.26 },
  { dir: [0.6, 0.8], amp: 0.020, len: 1.5, speed: 3.1, q: 0.22 },
  { dir: [-0.9, -0.35], amp: 0.012, len: 0.9, speed: 3.8, q: 0.18 },
];

// Displacement: returns vec3 (Gerstner displacement of a flat point)
const gerstnerDisp = Fn(([xz]) => {
  const dx = float(0).toVar();
  const dy = float(0).toVar();
  const dz = float(0).toVar();
  const t = time.mul(uFlowSpeed);
  for (const w of WAVE_DATA) {
    const k = (Math.PI * 2) / w.len;
    const d = vec2(w.dir[0], w.dir[1]);
    const ph = dot(d, xz).mul(k).sub(t.mul(w.speed * k));
    const a = w.amp;
    dx.addAssign(d.x.mul(w.q * a).mul(cos(ph)));
    dy.addAssign(sin(ph).mul(a));
    dz.addAssign(d.y.mul(w.q * a).mul(cos(ph)));
  }
  // clamp troughs so waves never dip below the channel bed (-0.42):
  // without this, deep troughs in fast flow pierce the bed and read as sandbars
  return vec3(dx, max(dy.mul(uFlowAmp), float(-0.13)), dz);
});

// Analytic swell normal from dH/dx, dH/dz (stable, no finite differences)
const gerstnerNormal = Fn(([xz]) => {
  const dHx = float(0).toVar();
  const dHz = float(0).toVar();
  const t = time.mul(uFlowSpeed);
  for (const w of WAVE_DATA) {
    const k = (Math.PI * 2) / w.len;
    const d = vec2(w.dir[0], w.dir[1]);
    const ph = dot(d, xz).mul(k).sub(t.mul(w.speed * k));
    const c = cos(ph).mul(k * w.amp).mul(uFlowAmp);
    dHx.addAssign(d.x.mul(c));
    dHz.addAssign(d.y.mul(c));
  }
  // capillary detail: animated fbm gradient (cheap 2-tap approx)
  const cp = xz.mul(2.6).add(vec2(t.mul(0.9), t.mul(-0.7)));
  const n0 = fbm2(cp);
  const nx = fbm2(cp.add(vec2(0.18, 0.0)));
  const nz = fbm2(cp.add(vec2(0.0, 0.18)));
  const capAmp = float(0.22).mul(uFlowAmp).add(0.05);
  dHx.addAssign(nx.sub(n0).mul(capAmp));
  dHz.addAssign(nz.sub(n0).mul(capAmp));
  // hint ripple: radial wavelets pushing the normal outward
  const rp = xz.sub(uRipple.xy).toVar();
  const rdist = length(rp).toVar();
  const rage = time.sub(uRipple.z).toVar();
  const ring = sin(rdist.mul(9.0).sub(rage.mul(7.0)))
    .mul(exp(rdist.mul(-0.9))).mul(exp(rage.mul(-1.1)))
    .mul(step(0.0, rage)).mul(uRipple.w);
  dHx.addAssign(ring.mul(0.35));
  dHz.addAssign(ring.mul(0.22));
  return normalize(vec3(dHx.negate(), 1.0, dHz.negate()));
});

function makeWaterMaterial() {
  if (DEBUG_WATER) {
    // diagnostic: unlit solid magenta, no displacement — separates geometry/
    // placement problems from shader problems in headless captures
    const dm = new THREE.MeshBasicNodeMaterial();
    dm.colorNode = vec3(1.0, 0.0, 1.0);
    return dm;
  }
  const mat = new THREE.MeshStandardNodeMaterial();
  mat.roughness = 0.08;
  mat.metalness = 0.0;

  const disp = gerstnerDisp(positionLocal.xz);
  mat.positionNode = positionLocal.add(disp);

  const N = gerstnerNormal(positionLocal.xz).toVar();
  mat.normalNode = N;

  mat.colorNode = Fn(() => {
  const V = normalize(cameraPosition.sub(positionWorld)).toVar();
  const fres = pow(saturate(float(1.0).sub(dot(N, V))), 5.0).toVar();

  // reflection: reflect view around normal, sample the SAME sky function
  const Rraw = reflect(negate(V), N);
  const R = vec3(Rraw.x, abs(Rraw.y), Rraw.z).toVar(); // keep reflections above horizon
  const skyRef = skyColorFn(R).toVar();

  // base water color: deep vs shallow by fresnel + flow foam noise
  const foamN = fbm2(positionLocal.xz.mul(1.4).add(vec2(time.mul(-1.2), time.mul(0.4)))).toVar();
  const base = mix(uWaterDeep, uWaterShallow, foamN.mul(0.35)).toVar();

  // edge foam along the stone banks (uv.x near 0 or 1) + crest foam
  const uEdge = uv().x;
  const edge = smoothstep(0.10, 0.02, min(uEdge, float(1.0).sub(uEdge))).toVar();
  const crest = smoothstep(0.05, 0.14, disp.y.mul(uFlowAmp)).toVar();
  const foamMask = clamp(edge.mul(0.9).add(crest.mul(0.35)), 0.0, 1.0)
    .mul(smoothstep(0.35, 0.75, foamN.add(0.35))).toVar();

  // rushing white-water streaks: long thin lanes stretched along the flow
  // direction (uv.y), peeling off both banks and mid-channel when uRush rises
  const streakN = fbm2(vec2(uv().x.mul(9.0), uv().y.mul(2400.0).sub(time.mul(uFlowSpeed.mul(14.0))))).toVar();
  const streakLanes = smoothstep(0.58, 0.78, streakN).toVar();
  const sideBand = smoothstep(0.30, 0.06, min(uEdge, float(1.0).sub(uEdge))).mul(0.9)
    .add(smoothstep(0.75, 0.95, streakN).mul(0.35)).toVar();
  foamMask.assign(clamp(foamMask.add(streakLanes.mul(sideBand).mul(uRush)), 0.0, 1.0));

  const col = mix(base, skyRef, fres.mul(0.75).add(0.08)).toVar();

  // sun glitter: sharp specular from the analytic sky sun direction
  const spec = pow(saturate(dot(R, uSunDir)), 640.0).mul(6.0)
    .mul(smoothstep(0.3, 0.8, fbm2(positionLocal.xz.mul(3.0).add(time.mul(0.5)))));
  col.assign(col.add(uSunColor.mul(spec)));

  // backlit crests: light shining through wave tops
  const back = pow(saturate(dot(negate(V), uSunDir)), 3.0)
    .mul(smoothstep(0.02, 0.12, disp.y.mul(uFlowAmp)));
  col.assign(col.add(uWaterShallow.mul(back.mul(0.8))));

  // foam
  col.assign(mix(col, vec3(0.92, 0.93, 0.9), foamMask));

  // hint ripple pulse: expanding luminous rings guiding toward a choice
  const rp = positionLocal.xz.sub(uRipple.xy).toVar();
  const rdist = length(rp).toVar();
  const rage = time.sub(uRipple.z).toVar();
  const ring = smoothstep(0.75, 0.98, sin(rdist.mul(9.0).sub(rage.mul(7.0))))
    .mul(exp(rdist.mul(-0.55))).mul(exp(rage.mul(-0.9)))
    .mul(step(0.0, rage)).mul(uRipple.w).toVar();
  col.assign(col.add(vec3(0.85, 0.78, 0.62).mul(ring.mul(0.8))));
  return col;
  })();
  return mat;
}

const WATER_Y = -0.25;   // above the bed (-0.42), below the wall tops (~0.74)

function buildWaterGeometry() {
  const SEG_LEN = 6800;          // along channel
  const SEG_W = 8;               // across channel
  const width = CHANNEL_HALF_WIDTH * 2 + 1.6;
  const pos = [], uvs = [], idx = [];
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  for (let i = 0; i <= SEG_LEN; i++) {
    const d = (i / SEG_LEN) * curveLen;
    pathAt(d, p); tangentAt(d, t);
    const sx = -t.z, sz = t.x;
    for (let j = 0; j <= SEG_W; j++) {
      const f = j / SEG_W - 0.5;
      pos.push(p.x + sx * f * width, WATER_Y, p.z + sz * f * width);
      uvs.push(j / SEG_W, i / SEG_LEN);
    }
  }
  for (let i = 0; i < SEG_LEN; i++) {
    for (let j = 0; j < SEG_W; j++) {
      const a = i * (SEG_W + 1) + j, b = a + SEG_W + 1;
      // wound so faces point UP (+Y): side(x+) x along(t) => up; the previous
      // order faced down and the whole surface was backface-culled from above
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// ---------------------------------------------------------------------------
// GUFA: traditional round woven palm-frond boat.
// Lathe hull with high segment counts, woven TSL pattern (interlaced frond
// strips via two orthogonal noise-modulated weaves), concentric coiled ribs,
// thick rim coil, and a woven floor mat. Smooth shading everywhere.
// ---------------------------------------------------------------------------
const GUFA_R = 0.95;   // rim radius
const GUFA_H = 0.52;   // hull height

function gufaWovenMaterial(cDark, cMid, cLight, roughBase = 0.8) {
  const mat = new THREE.MeshStandardNodeMaterial({ roughness: roughBase, side: THREE.DoubleSide });
  // Interlaced weave built purely in TSL from positionLocal:
  // ring weave (along y) x diagonal frond weave, combined over/under.
  const ringBand = sin(positionLocal.y.mul(95.0).add(fbm3(positionLocal.mul(9.0)).mul(5.0))).mul(0.5).add(0.5);
  const radBand = sin(positionLocal.x.mul(60.0).add(positionLocal.z.mul(60.0)).add(fbm3(positionLocal.mul(7.0)).mul(8.0))).mul(0.5).add(0.5);
  // over/under interlace: xor-ish combination of the two weaves
  const weave = ringBand.mul(radBand).mul(2.0).sub(ringBand.add(radBand).sub(1.0)).abs();
  const fiberN = fbm3(positionLocal.mul(28.0));
  mat.colorNode = mix(
    mix(color(cDark), color(cMid), ringBand.mul(0.6).add(0.2)),
    color(cLight), weave.mul(0.45).add(fiberN.mul(0.25))
  );
  // noise-driven roughness variation (dry fronds vs polished wear)
  mat.roughnessNode = clamp(float(roughBase).sub(weave.mul(0.18)).add(fiberN.mul(0.25)), 0.35, 1.0);
  // subtle normal perturbation from the weave so it catches the light
  const nBump = weave.mul(0.35).add(fiberN.mul(0.2));
  mat.normalNode = normalize(normalLocal.add(vec3(
    sin(positionLocal.y.mul(95.0)).mul(nBump).mul(0.35),
    0.0,
    sin(positionLocal.x.mul(60.0).add(positionLocal.z.mul(60.0))).mul(nBump).mul(0.35)
  )));
  return mat;
}

function buildBoat() {
  const boat = new THREE.Group();

  // ---- hull: smooth bowl lathe, high radial segments, no faceting ----
  const profile = [];
  const PN = 26;
  for (let i = 0; i <= PN; i++) {
    const f = i / PN;                       // 0 bottom .. 1 rim
    const r = GUFA_R * (0.22 + 0.78 * Math.sin(f * Math.PI * 0.52)); // flared bowl
    profile.push(new THREE.Vector2(r, f * GUFA_H));
  }
  const hullGeo = new THREE.LatheGeometry(profile, 96);
  const frondMat = gufaWovenMaterial(0x5a4028, 0x8a6a44, 0xb08a5a, 0.82);
  const hull = new THREE.Mesh(hullGeo, frondMat);
  hull.material.side = THREE.DoubleSide;
  boat.add(hull);

  // ---- concentric coiled ribs: stacked torus rings following the profile ----
  const coilMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.75 });
  {
    const fiberN = fbm3(positionLocal.mul(34.0));
    coilMat.colorNode = mix(color(0x3f2d1b), color(0x7a5a36), fiberN);
    coilMat.roughnessNode = clamp(float(0.7).add(fiberN.mul(0.3)), 0.4, 1.0);
  }
  const RIBS = 9;
  for (let i = 1; i <= RIBS; i++) {
    const f = i / (RIBS + 1);
    const r = GUFA_R * (0.22 + 0.78 * Math.sin(f * Math.PI * 0.52));
    const ribGeo = new THREE.TorusGeometry(r + 0.012, 0.017, 12, 96);
    ribGeo.rotateX(Math.PI / 2);
    const rib = new THREE.Mesh(ribGeo, coilMat);
    rib.position.y = f * GUFA_H;
    boat.add(rib);
  }

  // ---- thick rim coil (double coil, bound) ----
  const rimMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.7 });
  {
    const wraps = sin(positionLocal.x.mul(140.0).add(positionLocal.z.mul(140.0))).mul(0.5).add(0.5);
    const fiberN = fbm3(positionLocal.mul(40.0));
    rimMat.colorNode = mix(color(0x4c3820), color(0x99713f), wraps.mul(0.5).add(fiberN.mul(0.5)));
  }
  const rimGeo = new THREE.TorusGeometry(GUFA_R + 0.005, 0.045, 18, 128);
  rimGeo.rotateX(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = GUFA_H;
  boat.add(rim);
  const rim2Geo = new THREE.TorusGeometry(GUFA_R - 0.055, 0.028, 14, 112);
  rim2Geo.rotateX(Math.PI / 2);
  const rim2 = new THREE.Mesh(rim2Geo, coilMat);
  rim2.position.y = GUFA_H - 0.05;
  boat.add(rim2);

  // ---- woven floor mat: slightly domed disc with radial weave ----
  const floorMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  {
    const spokes = sin(positionLocal.x.mul(48.0)).mul(sin(positionLocal.z.mul(48.0))).mul(0.5).add(0.5);
    const fiberN = fbm3(positionLocal.mul(22.0));
    floorMat.colorNode = mix(color(0x6a4c2c), color(0xa07c4e), spokes.mul(0.5).add(fiberN.mul(0.5)));
  }
  const floorGeo = new THREE.CircleGeometry(GUFA_R * 0.5, 64, 0, Math.PI * 2);
  floorGeo.rotateX(-Math.PI / 2);
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = 0.12;
  boat.add(floor);

  // ---- a small coiled rope + clay water jar (lived-in detail) ----
  const ropeGeo = new THREE.TorusGeometry(0.12, 0.032, 12, 48);
  ropeGeo.rotateX(Math.PI / 2);
  const rope = new THREE.Mesh(ropeGeo, rimMat);
  rope.position.set(0.32, 0.15, -0.25);
  boat.add(rope);
  const jarPts = [];
  for (let i = 0; i <= 16; i++) {
    const f = i / 16;
    jarPts.push(new THREE.Vector2(
      0.02 + Math.sin(f * Math.PI) * 0.11 * (1 - f * 0.35), f * 0.26));
  }
  const jarMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.85 });
  jarMat.colorNode = mix(color(0x7c5233), color(0xa5713f), fbm3(positionLocal.mul(18.0)));
  const jar = new THREE.Mesh(new THREE.LatheGeometry(jarPts, 48), jarMat);
  jar.position.set(-0.3, 0.12, -0.3);
  boat.add(jar);

  return boat;
}

// ---------------------------------------------------------------------------
// Gates: carved stone arches (pillars + half-torus arch band + keystone),
// noise-displaced for a hand-carved look, plus ONE animated stone slab that
// grinds downward into the earth with dust when the gate opens.
// ---------------------------------------------------------------------------
const gateDists = [];
for (let i = 0; i < NUM_LEVELS; i++) gateDists.push(GATE_SPACING * (i + 1.5));

function gateFrame(i) {
  const p = pathAt(gateDists[i], new THREE.Vector3());
  const t = tangentAt(gateDists[i], new THREE.Vector3());
  const yaw = Math.atan2(t.x, t.z);
  return { p, yaw };
}

function carvedStoneMaterial() {
  const stoneMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.92 });
  // chisel marks + plaster/weathering variation
  const carve = fbm3(positionLocal.mul(6.0));
  const grain = fbm3(positionLocal.mul(vec3(0.5, 3.0, 0.5)));
  stoneMat.colorNode = mix(
    mix(color(0x8a7a62), color(0xc9b89a), carve),
    color(0x6e5f4c), grain.mul(0.35)
  );
  stoneMat.roughnessNode = clamp(float(0.95).sub(carve.mul(0.2)), 0.6, 1.0);
  // noise displacement: carved, worn surface (vertex stage)
  stoneMat.positionNode = positionLocal.add(
    normalLocal.mul(fbm3(positionLocal.mul(3.2)).sub(0.5).mul(0.09))
  );
  return stoneMat;
}

function buildGateInstances(scene) {
  const stoneMat = carvedStoneMaterial();
  const pillarGeo = new THREE.CylinderGeometry(0.48, 0.62, 4.2, 24, 6);
  const baseGeo = new THREE.CylinderGeometry(0.72, 0.85, 0.5, 24, 2);
  const archSpan = CHANNEL_HALF_WIDTH + 1.1;
  // half-torus arch band
  const archGeo = new THREE.TorusGeometry(archSpan, 0.42, 16, 48, Math.PI);
  const keyGeo = new RoundedBoxGeometry(0.55, 0.9, 0.8, 3, 0.08);

  const pillars = new THREE.InstancedMesh(pillarGeo, stoneMat, NUM_LEVELS * 2);
  const bases = new THREE.InstancedMesh(baseGeo, stoneMat, NUM_LEVELS * 2);
  const arches = new THREE.InstancedMesh(archGeo, stoneMat, NUM_LEVELS);
  const keys = new THREE.InstancedMesh(keyGeo, stoneMat, NUM_LEVELS);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), qArch = new THREE.Quaternion(), s = new THREE.Vector3(1, 1, 1);
  const off = CHANNEL_HALF_WIDTH + 1.1;
  for (let i = 0; i < NUM_LEVELS; i++) {
    const { p, yaw } = gateFrame(i);
    q.setFromEuler(new THREE.Euler(0, yaw, 0));
    // arch torus lies in XY plane by default; yaw maps its span axis (+X) to
    // the channel side vector (tz, -tx) so it stands ACROSS the channel
    // (the old +PI/2 turned it edge-on, parallel to the flow)
    qArch.setFromEuler(new THREE.Euler(0, yaw, 0));
    const sx = Math.cos(yaw), sz = -Math.sin(yaw);
    m.compose(new THREE.Vector3(p.x + sx * off, 1.7, p.z + sz * off), q, s);
    pillars.setMatrixAt(i * 2, m);
    m.compose(new THREE.Vector3(p.x - sx * off, 1.7, p.z - sz * off), q, s);
    pillars.setMatrixAt(i * 2 + 1, m);
    m.compose(new THREE.Vector3(p.x + sx * off, -0.15, p.z + sz * off), q, s);
    bases.setMatrixAt(i * 2, m);
    m.compose(new THREE.Vector3(p.x - sx * off, -0.15, p.z - sz * off), q, s);
    bases.setMatrixAt(i * 2 + 1, m);
    m.compose(new THREE.Vector3(p.x, 3.8, p.z), qArch, s);
    arches.setMatrixAt(i, m);
    m.compose(new THREE.Vector3(p.x, 3.8 + archSpan + 0.28, p.z), q, s);
    keys.setMatrixAt(i, m);
  }
  scene.add(pillars, bases, arches, keys);
}

function buildAnimatedGate(scene) {
  // a single carved stone slab that grinds down into the earth when opened
  const slabMat = carvedStoneMaterial();
  const slabW = CHANNEL_HALF_WIDTH * 2 + 0.9;
  const slabGeo = new RoundedBoxGeometry(slabW, 3.6, 0.5, 4, 0.06);
  const slab = new THREE.Mesh(slabGeo, slabMat);
  const group = new THREE.Group();
  group.add(slab);
  slab.position.y = 0;
  group.position.y = 1.65;
  scene.add(group);

  // ---- dust pool: small puffs spawned while the slab grinds open ----
  const DUST_N = 70;
  const dustGeo = new THREE.SphereGeometry(0.09, 10, 8);
  const dustMat = new THREE.MeshBasicNodeMaterial({ transparent: true, opacity: 0.45, depthWrite: false });
  dustMat.colorNode = mix(color(0xb9a37e), color(0xd9c8a4), hash(instanceIndex.add(1)));
  const dust = new THREE.InstancedMesh(dustGeo, dustMat, DUST_N);
  dust.frustumCulled = false;
  const dustP = [];
  for (let i = 0; i < DUST_N; i++) dustP.push({ life: -1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, s: 1 });
  scene.add(dust);

  return { group, slab, dust, dustP, dustCursor: 0 };
}

function spawnDust(gate, x, y, z, spread = 1.6) {
  const d = gate.dustP[gate.dustCursor];
  gate.dustCursor = (gate.dustCursor + 1) % gate.dustP.length;
  d.life = rand(0.7, 1.5);
  d.maxLife = d.life;
  d.x = x + rand(-spread, spread);
  d.y = y + rand(0, 0.4);
  d.z = z + rand(-0.4, 0.4);
  d.vx = rand(-0.5, 0.5); d.vy = rand(0.5, 1.4); d.vz = rand(-0.5, 0.5);
  d.s = rand(0.6, 1.6);
}

const dustM = new THREE.Matrix4(), dustQ = new THREE.Quaternion(), dustS = new THREE.Vector3();
function updateDust(gate, dt) {
  let any = false;
  for (let i = 0; i < gate.dustP.length; i++) {
    const d = gate.dustP[i];
    if (d.life > 0) {
      any = true;
      d.life -= dt;
      d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
      d.vy *= (1 - dt * 0.8);
      const f = Math.max(0, d.life / d.maxLife);
      const sc = d.s * (1.6 - f) * f * 2.2;
      dustS.set(sc, sc, sc);
    } else {
      dustS.set(0, 0, 0);
    }
    dustM.compose(new THREE.Vector3(d.x, d.y, d.z), dustQ, dustS);
    gate.dust.setMatrixAt(i, dustM);
  }
  if (any) gate.dust.instanceMatrix.needsUpdate = true;
}

// ---------------------------------------------------------------------------
// Village generation along both banks — all procedural, smooth-shaded,
// noise-driven surfaces. Nothing lowpoly: high segment counts, bevelled
// edges (RoundedBox), displacement and wetness detail near the waterline.
// ---------------------------------------------------------------------------
function plasterColor(cA, cB, scale = 0.5) {
  const n = fbm3(positionWorld.mul(scale));
  return mix(color(cA), color(cB), n);
}

function buildVillage(scene) {
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sv = new THREE.Vector3();
  const eu = new THREE.Euler();

  // ---- stone banks edging the falaj (continuous both banks) ----
  // Water-worn: noise streaks + height-based darkening/wetness near waterline,
  // lower roughness (sheen) where wet.
  const wallMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.95 });
  {
    const base = plasterColor(0x8f8069, 0xc4b494, 0.9);
    const streaks = fbm3(positionWorld.mul(vec3(0.6, 4.5, 0.6)));
    // wetness band: world y below ~0.45 darkens & saturates
    const wet = smoothstep(0.55, 0.1, positionWorld.y).toVar();
    wallMat.colorNode = mix(
      base.mul(streaks.mul(0.35).add(0.75)),
      color(0x4e4234), wet.mul(0.55).add(streaks.mul(wet).mul(0.25))
    );
    wallMat.roughnessNode = clamp(float(0.95).sub(wet.mul(0.55)).sub(streaks.mul(0.1)), 0.3, 1.0);
  }
  // length axis is local Z: yaw = atan2(t.x, t.z) aligns +Z with the tangent,
  // so stones run ALONG the banks (previously the long axis was across the channel)
  const wallGeo = new RoundedBoxGeometry(0.55, 0.85, 1.0, 4, 0.12);
  // chunked along the channel so frustum culling works over 60 km
  const WALL_SEG = 15;                      // path length per wall stone
  const WALL_CHUNK = 480;                   // path length per instanced chunk
  const stonesPerChunk = Math.ceil(WALL_CHUNK / WALL_SEG) * 2;
  const wallChunks = Math.ceil(curveLen / WALL_CHUNK);
  for (let c = 0; c < wallChunks; c++) {
    const chunk = new THREE.InstancedMesh(wallGeo, wallMat, stonesPerChunk);
    let wi = 0;
    const d0 = c * WALL_CHUNK;
    const dEnd = Math.min(curveLen, d0 + WALL_CHUNK);
    for (let d = d0; d < dEnd - 0.01; d += WALL_SEG) {
      const d2 = Math.min(curveLen, d + WALL_SEG);
      pathAt(d, p); tangentAt(d, t);
      const p2 = pathAt(d2, new THREE.Vector3());
      const segLen = p.distanceTo(p2);
      const yaw = Math.atan2(t.x, t.z);
      q.setFromEuler(eu.set(0, yaw, 0));
      const sx = -t.z, sz = t.x;
      const off = CHANNEL_HALF_WIDTH + 0.55;
      sv.set(1, 1, segLen * 1.06);
      m.compose(new THREE.Vector3(p.x + sx * off, 0.32, p.z + sz * off), q, sv);
      chunk.setMatrixAt(wi++, m);
      m.compose(new THREE.Vector3(p.x - sx * off, 0.32, p.z - sz * off), q, sv);
      chunk.setMatrixAt(wi++, m);
    }
    chunk.count = wi;
    chunk.instanceMatrix.needsUpdate = true;
    chunk.castShadow = true;
    scene.add(chunk);
  }

  // ---- ground strip (banks) ----
  const groundMat = new THREE.MeshStandardNodeMaterial({ roughness: 1.0 });
  groundMat.colorNode = plasterColor(0xa88f6a, 0xcbb78d, 0.25);
  const groundGeo = new THREE.PlaneGeometry(320, 80, 48, 10);
  groundGeo.rotateX(-Math.PI / 2);
  const GROUND_STEP = 72;
  const grounds = new THREE.InstancedMesh(groundGeo, groundMat, Math.ceil(curveLen / GROUND_STEP));
  let gi = 0;
  for (let d = 0; d < curveLen; d += GROUND_STEP) {
    pathAt(d, p); tangentAt(d, t);
    q.setFromEuler(eu.set(0, Math.atan2(t.x, t.z), 0));
    sv.set(1, 1, 1);
    m.compose(new THREE.Vector3(p.x, -0.42, p.z), q, sv);
    grounds.setMatrixAt(gi++, m);
  }
  grounds.count = gi;
  grounds.receiveShadow = true;
  scene.add(grounds);

  // ---- dense palm FARM: groves in rows along both banks, chunked so the
  // frustum culls far-away sections. Trunk + merged drooping canopy + dates.
  const PALM_CHUNK = 480;             // path length per chunk
  const ROW_OFFS = [7.2, 11.5, 16.5, 22.5, 29];  // lateral grove rows
  const ROW_STEP = 9.0;               // along-path spacing within a row
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.30, 7.0, 16, 14);
  trunkGeo.translate(0, 3.5, 0);
  // gentle bend + slight surface irregularity
  {
    const pa = trunkGeo.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const y = pa.getY(i);
      pa.setX(i, pa.getX(i) + Math.pow(y / 7.0, 2) * 0.7);
    }
    trunkGeo.computeVertexNormals();
  }
  const trunkMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.95 });
  trunkMat.colorNode = (() => {
    // ring texture via noise-modulated sine bands
    const rings = sin(positionLocal.y.mul(9.0).add(fbm3(positionLocal.mul(2.0)).mul(6.0))).mul(0.5).add(0.5);
    return mix(color(0x5f4630), color(0x8a6b4a), rings.mul(0.7).add(fbm3(positionLocal.mul(1.5)).mul(0.3)));
  })();

  // canopy: 14 drooping fronds built from bent, tapered planes merged
  const fronds = [];
  const FRONDS = 14;
  for (let f = 0; f < FRONDS; f++) {
    const fg = new THREE.PlaneGeometry(0.55, 3.4, 3, 16);
    const pa = fg.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const y = pa.getY(i) + 1.7;             // 0..3.4 along frond
      const f2 = y / 3.4;
      pa.setZ(i, -Math.pow(f2, 2.0) * 1.9 + Math.sin(f2 * 9.0 + f) * 0.05); // droop + ripple
      pa.setX(i, pa.getX(i) * (1.0 - f2 * 0.7));
      pa.setY(i, y * (1.0 - 0.25 * f2));
    }
    fg.computeVertexNormals();
    const ang = (f / FRONDS) * Math.PI * 2 + (f % 2) * 0.3;
    fg.rotateX(-Math.PI / 2 + 0.55 + (f % 3) * 0.18);
    fg.rotateY(ang);
    fg.translate(0.7, 7.0, 0);
    fronds.push(fg);
  }
  const canopyGeo = mergeGeometries(fronds);
  const canopyMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.85, side: THREE.DoubleSide });
  canopyMat.colorNode = (() => {
    const n = fbm3(positionWorld.mul(1.2));
    return mix(color(0x2e5c30), color(0x5e8a42), n);
  })();

  const dateGeo = new THREE.SphereGeometry(0.22, 16, 12);
  const dateMat = new THREE.MeshStandardNodeMaterial({ color: 0xb96a2c, roughness: 0.6 });

  // wind sway: canopies lean + shiver with the khamaseen gust uniform
  canopyMat.positionNode = positionLocal.add(vec3(
    sin(positionLocal.y.mul(1.3).add(time.mul(7.0))).mul(0.10).add(0.55).mul(uWind).mul(positionLocal.y.div(7.0)),
    sin(positionLocal.x.mul(2.0).add(time.mul(9.0))).mul(0.05).mul(uWind),
    cos(positionLocal.y.mul(1.1).add(time.mul(6.0))).mul(0.08).mul(uWind).mul(positionLocal.y.div(7.0))
  ));

  const palmPositions = [];
  const palmsPerChunk = Math.ceil(PALM_CHUNK / ROW_STEP) * ROW_OFFS.length;
  const palmChunks = Math.ceil(curveLen / PALM_CHUNK);
  for (let c = 0; c < palmChunks; c++) {
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, palmsPerChunk);
    const canopies = new THREE.InstancedMesh(canopyGeo, canopyMat, palmsPerChunk);
    const dates = new THREE.InstancedMesh(dateGeo, dateMat, palmsPerChunk);
    let pi = 0;
    const d0 = c * PALM_CHUNK;
    const dEnd = Math.min(curveLen - 4, d0 + PALM_CHUNK);
    for (let d = d0; d < dEnd; d += ROW_STEP) {
      for (let r2 = 0; r2 < ROW_OFFS.length; r2++) {
        if (rng() < 0.16) continue;                    // gaps in the grove
        const sign = (r2 % 2 === 0) ? 1 : -1;
        const off = ROW_OFFS[r2] + rand(-1.4, 1.4);
        const dd = d + rand(-2.5, 2.5);
        pathAt(dd, p); tangentAt(dd, t);
        const sx = -t.z * sign, sz = t.x * sign;
        const px = p.x + sx * off, pz = p.z + sz * off;
        const sc = rand(0.75, 1.35);
        const ry = rand(0, Math.PI * 2);
        q.setFromEuler(eu.set(0, ry, 0));
        sv.set(sc, sc, sc);
        m.compose(new THREE.Vector3(px, -0.4, pz), q, sv);
        if (pi < palmsPerChunk) {
          trunks.setMatrixAt(pi, m);
          canopies.setMatrixAt(pi, m);
          const da = ry + rand(0, 2.4);
          m.compose(
            new THREE.Vector3(px + 0.7 * sc + Math.cos(da) * 0.5 * sc, 6.55 * sc - 0.4, pz + Math.sin(da) * 0.5 * sc),
            q, new THREE.Vector3(sc, sc * 1.4, sc));
          dates.setMatrixAt(pi, m);
          pi++;
        }
        if (palmPositions.length < 400 && rng() < 0.05) palmPositions.push(new THREE.Vector3(px, 0, pz));
      }
    }
    trunks.count = pi; canopies.count = pi; dates.count = pi;
    trunks.instanceMatrix.needsUpdate = true;
    canopies.instanceMatrix.needsUpdate = true;
    dates.instanceMatrix.needsUpdate = true;
    trunks.castShadow = true; canopies.castShadow = true;
    scene.add(trunks, canopies, dates);
  }

  // ---- undergrowth bushes among the palms (chunked like the farm) ----
  const bushGeo = new THREE.SphereGeometry(0.9, 20, 14);
  {
    const pa = bushGeo.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const n = (Math.sin(pa.getX(i) * 6.1) + Math.cos(pa.getY(i) * 5.3) + Math.sin(pa.getZ(i) * 7.7)) * 0.14;
      pa.setXYZ(i, pa.getX(i) * (1 + n), Math.max(-0.1, pa.getY(i) * 0.62 * (1 + n)) + 0.5, pa.getZ(i) * (1 + n));
    }
    bushGeo.computeVertexNormals();
  }
  const bushMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.95 });
  bushMat.colorNode = (() => {
    const n = fbm3(positionWorld.mul(2.6));
    return mix(color(0x4a5a2e), color(0x7a7a42), n);
  })();
  const BUSH_CHUNK = 480;
  const bushesPerChunk = 46;
  for (let c = 0; c < Math.ceil(curveLen / BUSH_CHUNK); c++) {
    const bushes = new THREE.InstancedMesh(bushGeo, bushMat, bushesPerChunk);
    let bi = 0;
    const d0 = c * BUSH_CHUNK;
    const dEnd = Math.min(curveLen - 4, d0 + BUSH_CHUNK);
    for (let i = 0; i < bushesPerChunk; i++) {
      const dd = rand(d0, dEnd);
      pathAt(dd, p); tangentAt(dd, t);
      const sign = rng() < 0.5 ? 1 : -1;
      const off = rand(5.4, 30);
      const px = p.x + (-t.z) * sign * off, pz = p.z + t.x * sign * off;
      const sc = rand(0.5, 1.5);
      q.setFromEuler(eu.set(0, rand(0, 6.28), 0));
      sv.set(sc, sc, sc);
      m.compose(new THREE.Vector3(px, -0.42, pz), q, sv);
      bushes.setMatrixAt(bi++, m);
    }
    bushes.instanceMatrix.needsUpdate = true;
    scene.add(bushes);
  }

  // ---- irrigation side-channels: narrow dark water strips branching off ----
  const sideMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.12 });
  sideMat.colorNode = (() => {
    const n = fbm2(positionWorld.xz.mul(1.5).add(vec2(0, time.mul(-0.8))));
    return mix(uWaterDeep, uWaterShallow, n.mul(0.4).add(0.1));
  })();
  const sideGeo = new RoundedBoxGeometry(1.4, 0.1, 26, 2, 0.04);
  const sideCount = Math.floor(curveLen / 260);
  const sides = new THREE.InstancedMesh(sideGeo, sideMat, sideCount);
  for (let i = 0; i < sideCount; i++) {
    const dd = 130 + i * 260 + rand(-40, 40);
    pathAt(dd, p); tangentAt(dd, t);
    const sign = i % 2 === 0 ? 1 : -1;
    const off = CHANNEL_HALF_WIDTH + 13;
    const px = p.x + (-t.z) * sign * off, pz = p.z + t.x * sign * off;
    q.setFromEuler(eu.set(0, Math.atan2(t.x, t.z), 0));
    sv.set(1, 1, 1);
    m.compose(new THREE.Vector3(px, -0.18, pz), q, sv);
    sides.setMatrixAt(i, m);
  }
  scene.add(sides);

  // ---- leafy trees ----
  const leafCount = 520;
  const lTrunkGeo = new THREE.CylinderGeometry(0.14, 0.24, 2.6, 12, 6);
  lTrunkGeo.translate(0, 1.3, 0);
  const lCanopyGeo = new THREE.SphereGeometry(1.6, 28, 20);
  {
    const pa = lCanopyGeo.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const n = (Math.sin(pa.getX(i) * 5.1) + Math.cos(pa.getY(i) * 4.3) + Math.sin(pa.getZ(i) * 6.7)) * 0.06;
      pa.setXYZ(i, pa.getX(i) * (1 + n), pa.getY(i) * 0.8 * (1 + n) + 3.2, pa.getZ(i) * (1 + n));
    }
    lCanopyGeo.computeVertexNormals();
  }
  const lCanopyMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  lCanopyMat.colorNode = (() => {
    const n = fbm3(positionWorld.mul(2.2));
    return mix(color(0x3d6e34), color(0x6e9a44), n);
  })();
  const lTrunks = new THREE.InstancedMesh(lTrunkGeo, trunkMat, leafCount);
  const lCanopies = new THREE.InstancedMesh(lCanopyGeo, lCanopyMat, leafCount);
  for (let i = 0; i < leafCount; i++) {
    const d = rand(10, curveLen - 10);
    pathAt(d, p); tangentAt(d, t);
    const sign = rng() < 0.5 ? 1 : -1;
    const off = rand(7, 34);
    const px = p.x + (-t.z) * sign * off, pz = p.z + t.x * sign * off;
    const sc = rand(0.7, 1.5);
    q.setFromEuler(eu.set(0, rand(0, 6.28), 0));
    sv.set(sc, sc, sc);
    m.compose(new THREE.Vector3(px, -0.4, pz), q, sv);
    lTrunks.setMatrixAt(i, m);
    lCanopies.setMatrixAt(i, m);
  }
  scene.add(lTrunks, lCanopies);

  // ---- mud-brick houses: plaster noise, RECESSED doors/windows with frames ----
  const houseCount = 420;
  const houseGeo = new RoundedBoxGeometry(1, 1, 1, 5, 0.07);
  const houseMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.95 });
  houseMat.colorNode = (() => {
    const n = fbm3(positionWorld.mul(0.8));
    const streaks = fbm3(positionWorld.mul(vec3(0.3, 2.0, 0.3)));
    const patches = fbm3(positionWorld.mul(2.6));
    return mix(color(0xc9a877), color(0xe4cba0), n.mul(0.6).add(streaks.mul(0.25)).add(patches.mul(0.15)));
  })();
  houseMat.roughnessNode = clamp(float(0.9).add(fbm3(positionWorld.mul(3.0)).mul(0.2).sub(0.1)), 0.6, 1.0);
  const doorGeo = new RoundedBoxGeometry(0.62, 1.1, 0.1, 3, 0.03);
  const doorMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.8 });
  doorMat.colorNode = (() => {
    const g = fbm3(positionWorld.mul(vec3(0.5, 4.0, 0.5)));
    return mix(color(0x4a2e16), color(0x7d5228), g);
  })();
  const winGeo = new RoundedBoxGeometry(0.34, 0.42, 0.08, 3, 0.02);
  const winMat = new THREE.MeshStandardNodeMaterial({ color: 0x241c14, roughness: 0.5 });
  // protruding plaster frames make the openings read as recessed
  const frameGeo = new RoundedBoxGeometry(0.5, 0.6, 0.06, 2, 0.02);
  const doorFrameGeo = new RoundedBoxGeometry(0.8, 1.3, 0.07, 2, 0.03);
  const houses = new THREE.InstancedMesh(houseGeo, houseMat, houseCount);
  const doors = new THREE.InstancedMesh(doorGeo, doorMat, houseCount);
  const doorFrames = new THREE.InstancedMesh(doorFrameGeo, houseMat, houseCount);
  const windows = new THREE.InstancedMesh(winGeo, winMat, houseCount * 2);
  const winFrames = new THREE.InstancedMesh(frameGeo, houseMat, houseCount * 2);
  for (let i = 0; i < houseCount; i++) {
    const d = rand(14, curveLen - 14);
    pathAt(d, p); tangentAt(d, t);
    const sign = rng() < 0.5 ? 1 : -1;
    const off = rand(12, 38);
    const px = p.x + (-t.z) * sign * off, pz = p.z + t.x * sign * off;
    const w = rand(3.4, 6.2), h = rand(2.6, 4.4), dep = rand(3.0, 5.2);
    const ry = rand(0, Math.PI * 2);
    q.setFromEuler(eu.set(0, ry, 0));
    sv.set(w, h, dep);
    m.compose(new THREE.Vector3(px, h / 2 - 0.4, pz), q, sv);
    houses.setMatrixAt(i, m);
    // recessed door on +z face: frame proud of the wall, leaf set back
    const cosr = Math.cos(ry), sinr = Math.sin(ry);
    const dzF = dep / 2 + 0.03;         // frame plane
    const dzD = dep / 2 - 0.02;         // recessed door leaf
    sv.set(1.4, 1.4, 1.4);
    m.compose(new THREE.Vector3(px + sinr * dzD, 0.38, pz + cosr * dzD), q, sv);
    doors.setMatrixAt(i, m);
    m.compose(new THREE.Vector3(px + sinr * dzF, 0.42, pz + cosr * dzF), q, sv);
    doorFrames.setMatrixAt(i, m);
    for (let k = 0; k < 2; k++) {
      const wxo = (k === 0 ? -w * 0.28 : w * 0.28);
      m.compose(new THREE.Vector3(
        px + sinr * dzD + cosr * wxo, h * 0.55, pz + cosr * dzD - sinr * wxo), q, sv);
      windows.setMatrixAt(i * 2 + k, m);
      m.compose(new THREE.Vector3(
        px + sinr * dzF + cosr * wxo, h * 0.55, pz + cosr * dzF - sinr * wxo), q, sv);
      winFrames.setMatrixAt(i * 2 + k, m);
    }
  }
  scene.add(houses, doors, doorFrames, windows, winFrames);

  // ---- ancient fort: cylindrical tower + crenellations ----
  const fortD = curveLen * 0.32;
  pathAt(fortD, p); tangentAt(fortD, t);
  const fortPos = new THREE.Vector3(p.x + (-t.z) * 30, 0, p.z + t.x * 30);
  const fortMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  fortMat.colorNode = plasterColor(0xb08d5e, 0xd9bd8a, 0.45);
  fortMat.positionNode = positionLocal.add(normalLocal.mul(fbm3(positionLocal.mul(1.4)).sub(0.5).mul(0.12)));
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 6.2, 14, 48, 8), fortMat);
  tower.position.set(fortPos.x, 6.6, fortPos.z);
  scene.add(tower);
  const crenGeo = new RoundedBoxGeometry(1.0, 0.9, 0.5, 3, 0.08);
  const crens = new THREE.InstancedMesh(crenGeo, fortMat, 18);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    q.setFromEuler(eu.set(0, -a, 0));
    sv.set(1, 1, 1);
    m.compose(new THREE.Vector3(fortPos.x + Math.cos(a) * 5.0, 14.0, fortPos.z + Math.sin(a) * 5.0), q, sv);
    crens.setMatrixAt(i, m);
  }
  scene.add(crens);
  const fortWall = new THREE.Mesh(new RoundedBoxGeometry(16, 4.5, 1.6, 4, 0.25), fortMat);
  fortWall.position.set(fortPos.x + 9, 1.8, fortPos.z + 4);
  fortWall.rotation.y = 0.4;
  scene.add(fortWall);

  // ---- mosque: hall + dome + minaret ----
  const mosD = curveLen * 0.56;
  pathAt(mosD, p); tangentAt(mosD, t);
  const mosPos = new THREE.Vector3(p.x - (-t.z) * 26, 0, p.z - t.x * 26);
  const mosqueMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.85 });
  mosqueMat.colorNode = plasterColor(0xe8ddc4, 0xf7efdd, 0.6);
  const hall = new THREE.Mesh(new RoundedBoxGeometry(9, 4.2, 7, 5, 0.18), mosqueMat);
  hall.position.set(mosPos.x, 1.7, mosPos.z);
  scene.add(hall);
  const domeMat = new THREE.MeshStandardNodeMaterial({ color: 0x4a7a6a, roughness: 0.4, metalness: 0.15 });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.6, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
  dome.position.set(mosPos.x, 3.8, mosPos.z);
  scene.add(dome);
  const minaret = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.95, 11, 24, 6), mosqueMat);
  minaret.position.set(mosPos.x + 6.2, 5.0, mosPos.z - 2);
  scene.add(minaret);
  const minTop = new THREE.Mesh(new THREE.SphereGeometry(0.95, 24, 16), domeMat);
  minTop.position.set(mosPos.x + 6.2, 10.8, mosPos.z - 2);
  scene.add(minTop);

  // ---- school ----
  const schD = curveLen * 0.72;
  pathAt(schD, p); tangentAt(schD, t);
  const schPos = new THREE.Vector3(p.x + (-t.z) * 24, 0, p.z + t.x * 24);
  const schoolMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  schoolMat.colorNode = plasterColor(0xd9c9a2, 0xf0e3c0, 0.5);
  const school = new THREE.Mesh(new RoundedBoxGeometry(12, 4.5, 6, 5, 0.14), schoolMat);
  school.position.set(schPos.x, 1.85, schPos.z);
  school.rotation.y = Math.atan2(t.x, t.z);
  scene.add(school);
  const schoolTrim = new THREE.Mesh(new RoundedBoxGeometry(12.2, 0.5, 6.2, 3, 0.1), new THREE.MeshStandardNodeMaterial({ color: 0x7a5c40, roughness: 0.7 }));
  schoolTrim.position.copy(school.position); schoolTrim.position.y = 4.2;
  schoolTrim.rotation.copy(school.rotation);
  scene.add(schoolTrim);

  // ---- village shop: awning fabric (animated wave) + goods ----
  const shpD = curveLen * 0.45;
  pathAt(shpD, p); tangentAt(shpD, t);
  const shopPos = new THREE.Vector3(p.x - (-t.z) * 16, 0, p.z - t.x * 16);
  const shopMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  shopMat.colorNode = plasterColor(0xcaa06a, 0xe8c892, 0.7);
  const shop = new THREE.Mesh(new RoundedBoxGeometry(5.5, 3.4, 4.2, 5, 0.12), shopMat);
  shop.position.set(shopPos.x, 1.3, shopPos.z);
  shop.rotation.y = Math.atan2(t.x, t.z) + Math.PI / 2;
  scene.add(shop);

  // awning: woven stripes + gentle wind wave animated in the vertex stage
  const awnMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.85, side: THREE.DoubleSide });
  awnMat.colorNode = (() => {
    const s = step(0.5, fract(positionLocal.x.mul(0.9)));
    const weave = fbm3(positionLocal.mul(14.0)).mul(0.2);
    return mix(mix(color(0x9c4453), color(0xe8dcc2), s), color(0x6e3038), weave);
  })();
  awnMat.positionNode = positionLocal.add(vec3(
    0, 0,
    sin(positionLocal.x.mul(2.4).add(time.mul(2.2))).mul(0.07)
      .add(sin(positionLocal.x.mul(5.1).sub(time.mul(3.4))).mul(0.03))
      .mul(positionLocal.y.add(1.1).mul(0.5).add(0.5)) // freer at the outer edge
  ));
  const awnGeo = new THREE.PlaneGeometry(5.6, 2.2, 24, 10);
  const awning = new THREE.Mesh(awnGeo, awnMat);
  awning.rotation.set(-0.5, shop.rotation.y, 0, 'YXZ');
  const aw = new THREE.Vector3(0, 2.6, 2.6).applyEuler(shop.rotation);
  awning.position.set(shopPos.x + aw.x, 2.6, shopPos.z + aw.z);
  scene.add(awning);

  // goods: smooth lathe pots + woven baskets in front of the shop
  const potPts = [];
  for (let i = 0; i <= 18; i++) {
    const f = i / 18;
    potPts.push(new THREE.Vector2(0.02 + Math.sin(f * Math.PI) * 0.30 * (1 - f * 0.28) + f * 0.05, f * 0.62));
  }
  const potGeo = new THREE.LatheGeometry(potPts, 40);
  const potMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.8 });
  potMat.colorNode = mix(color(0x8a5a34), color(0xb57c46), fbm3(positionLocal.mul(9.0)));
  const basketPts = [];
  for (let i = 0; i <= 14; i++) {
    const f = i / 14;
    basketPts.push(new THREE.Vector2(0.05 + f * 0.34, f * f * 0.34));
  }
  const basketGeo = new THREE.LatheGeometry(basketPts, 40);
  const basketMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.9, side: THREE.DoubleSide });
  {
    const weave = sin(positionLocal.y.mul(60.0)).mul(sin(positionLocal.x.mul(46.0).add(positionLocal.z.mul(46.0)))).mul(0.5).add(0.5);
    basketMat.colorNode = mix(color(0x6e4e2a), color(0xa8824e), weave.mul(0.6).add(fbm3(positionLocal.mul(16.0)).mul(0.4)));
  }
  const fwd = new THREE.Vector3(0, 0, 1).applyEuler(shop.rotation);
  const rgt = new THREE.Vector3(1, 0, 0).applyEuler(shop.rotation);
  for (let i = 0; i < 5; i++) {
    const pot = new THREE.Mesh(potGeo, potMat);
    const a = (i - 2) * 0.85;
    pot.position.set(
      shopPos.x + fwd.x * 3.1 + rgt.x * a, -0.35,
      shopPos.z + fwd.z * 3.1 + rgt.z * a);
    pot.scale.setScalar(rand(0.8, 1.25));
    scene.add(pot);
  }
  for (let i = 0; i < 4; i++) {
    const bk = new THREE.Mesh(basketGeo, basketMat);
    const a = (i - 1.5) * 1.05 + 0.4;
    bk.position.set(
      shopPos.x + fwd.x * 4.1 + rgt.x * a, -0.38,
      shopPos.z + fwd.z * 4.1 + rgt.z * a);
    bk.scale.setScalar(rand(0.9, 1.3));
    scene.add(bk);
  }

  return { palmPositions, shopDist: shpD };
}

// ---------------------------------------------------------------------------
// Birds (flapping silhouettes), a dedicated hint bird (directed flyby),
// and butterflies
// ---------------------------------------------------------------------------
function buildBirds(scene) {
  const birdMat = new THREE.MeshBasicNodeMaterial({ color: 0x2a241c, side: THREE.DoubleSide });
  const wingGeo = new THREE.PlaneGeometry(1.4, 0.5, 4, 1);
  const flock = new THREE.Group();
  const birds = [];
  for (let i = 0; i < 14; i++) {
    const b = new THREE.Group();
    const wl = new THREE.Mesh(wingGeo, birdMat);
    const wr = new THREE.Mesh(wingGeo, birdMat);
    wl.position.x = -0.7; wr.position.x = 0.7;
    const gl = new THREE.Group(), gr = new THREE.Group();
    gl.add(wl); gr.add(wr);
    b.add(gl, gr);
    b.userData = {
      gl, gr,
      phase: rand(0, Math.PI * 2),
      radius: rand(18, 55),
      height: rand(24, 55),
      speed: rand(0.05, 0.11) * (rng() < 0.5 ? 1 : -1),
      centerD: rand(0.05, 0.9) * curveLen,
      flap: rand(6, 10),
    };
    flock.add(b);
    birds.push(b);
  }
  scene.add(flock);
  return birds;
}

// A single tame bird used for wrong-answer hints: it flutters across the
// player's view when triggered.
function buildHintBird(scene) {
  const mat = new THREE.MeshBasicNodeMaterial({ side: THREE.DoubleSide });
  mat.colorNode = mix(color(0x6b4a30), color(0xc9a878), fbm3(positionLocal.mul(6.0)));
  const wingGeo = new THREE.PlaneGeometry(0.9, 0.34, 4, 1);
  const b = new THREE.Group();
  const wl = new THREE.Mesh(wingGeo, mat); wl.position.x = -0.45;
  const wr = new THREE.Mesh(wingGeo, mat); wr.position.x = 0.45;
  const gl = new THREE.Group(), gr = new THREE.Group();
  gl.add(wl); gr.add(wr);
  b.add(gl, gr);
  b.visible = false;
  scene.add(b);
  return { mesh: b, gl, gr, t: -1, dur: 2.6, from: new THREE.Vector3(), to: new THREE.Vector3() };
}

function triggerHintBird(hintBird, camera) {
  // fly across the view, left-to-right or right-to-left, slightly above eye level
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
  const center = camera.position.clone().add(dir.multiplyScalar(9)).add(new THREE.Vector3(0, 1.2, 0));
  const sgn = Math.random() < 0.5 ? 1 : -1;
  hintBird.from.copy(center).add(right.clone().multiplyScalar(-6 * sgn)).add(new THREE.Vector3(0, 0.6, 0));
  hintBird.to.copy(center).add(right.clone().multiplyScalar(6 * sgn)).add(new THREE.Vector3(0, -0.2, 0));
  hintBird.t = 0;
  hintBird.mesh.visible = true;
  AudioSys.chirp();
}

function updateHintBird(hintBird, dt, tSec) {
  if (hintBird.t < 0) return;
  hintBird.t += dt;
  const f = hintBird.t / hintBird.dur;
  if (f >= 1) { hintBird.t = -1; hintBird.mesh.visible = false; return; }
  // gentle arc with a bob
  const e = f;
  hintBird.mesh.position.lerpVectors(hintBird.from, hintBird.to, e);
  hintBird.mesh.position.y += Math.sin(f * Math.PI) * 0.8 + Math.sin(tSec * 6.0) * 0.08;
  const dir = hintBird.to.clone().sub(hintBird.from).normalize();
  hintBird.mesh.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI / 2;
  const flap = Math.sin(tSec * 16.0) * 0.85;
  hintBird.gl.rotation.z = flap;
  hintBird.gr.rotation.z = -flap;
}

function buildButterflies(scene, palmPositions) {
  const mat = new THREE.MeshBasicNodeMaterial({ side: THREE.DoubleSide });
  mat.colorNode = mix(color(0xc98d4a), color(0x9c4453), fbm3(positionLocal.mul(8.0)));
  const wingGeo = new THREE.PlaneGeometry(0.22, 0.18, 2, 1);
  const list = [];
  const group = new THREE.Group();
  const n = Math.min(16, palmPositions.length);
  for (let i = 0; i < n; i++) {
    const b = new THREE.Group();
    const gl = new THREE.Group(), gr = new THREE.Group();
    const wl = new THREE.Mesh(wingGeo, mat); wl.position.x = -0.11;
    const wr = new THREE.Mesh(wingGeo, mat); wr.position.x = 0.11;
    gl.add(wl); gr.add(wr);
    b.add(gl, gr);
    const base = palmPositions[randInt(0, palmPositions.length - 1)];
    b.userData = { gl, gr, base: base.clone().add(new THREE.Vector3(rand(-2, 2), rand(0.8, 2.4), rand(-2, 2))), phase: rand(0, 6.28), speed: rand(1.2, 2.2) };
    group.add(b);
    list.push(b);
  }
  scene.add(group);
  return list;
}

// ---------------------------------------------------------------------------
// TOKENS: floating labelled orbs that stream toward the player down the
// channel. Correct tokens (facts belonging to the topic) glow warm
// burgundy/amber; wrong distractors are cooler/dimmer. Labels are canvas
// textures generated at runtime (no asset files).
// ---------------------------------------------------------------------------
const TOKEN_N = 110;
const tokenPool = [];
let tokenGroup = null;

function shortLabel(text, maxWords = 3, maxChars = 26) {
  let s = String(text || '').trim().replace(/\s+/g, ' ');
  const words = s.split(' ');
  if (words.length > maxWords) s = words.slice(0, maxWords).join(' ');
  if (s.length > maxChars) s = s.slice(0, maxChars - 1).trim() + '…';
  return s;
}

function makeLabelSprite() {
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 160;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(3.4, 1.06, 1);
  return { spr, cv, tex };
}

function drawLabel(tok) {
  const ctx = tok.label.cv.getContext('2d');
  const W = 512, H = 160;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = tok.correct ? 'rgba(46,26,20,0.82)' : 'rgba(24,30,40,0.78)';
  ctx.strokeStyle = tok.correct ? 'rgba(226,150,110,0.9)' : 'rgba(140,160,185,0.55)';
  ctx.lineWidth = 5;
  const r = 34;
  ctx.beginPath();
  ctx.roundRect(8, 18, W - 16, H - 36, r);
  ctx.fill(); ctx.stroke();
  ctx.font = '600 44px "Segoe UI", Tahoma, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = tok.correct ? '#f2ddb8' : '#c2cbd4';
  ctx.fillText(tok.text, W / 2, H / 2 + 4, W - 60);
  tok.label.tex.needsUpdate = true;
}

function buildTokens(scene) {
  tokenGroup = new THREE.Group();
  const orbGeo = new THREE.SphereGeometry(0.62, 32, 24);
  for (let i = 0; i < TOKEN_N; i++) {
    const mat = new THREE.MeshStandardNodeMaterial({ roughness: 0.25, metalness: 0.1 });
    const orb = new THREE.Mesh(orbGeo, mat);
    const label = makeLabelSprite();
    const g = new THREE.Group();
    g.add(orb); label.spr.position.y = 1.05; g.add(label.spr);
    g.visible = false;
    tokenGroup.add(g);
    tokenPool.push({
      mesh: g, orb, mat, label,
      active: false, correct: false, dist: 0, lat: 0, text: '',
      bob: rand(0, 6.28), fade: 1,
    });
  }
  scene.add(tokenGroup);
}

function tokenColor(tok) {
  // warm burgundy/amber vs cool slate — never gold, never green
  if (tok.correct) {
    tok.mat.color.setHex(0x7a3038);
    tok.mat.emissive = new THREE.Color(0xd06a4a);
    tok.mat.emissiveIntensity = 1.35;
  } else {
    tok.mat.color.setHex(0x3a4450);
    tok.mat.emissive = new THREE.Color(0x5a708a);
    tok.mat.emissiveIntensity = 0.4;
  }
}

// question-derived vocabulary
function correctLabelsFor(levelData) {
  const out = [];
  for (const q of levelData.questions) {
    if (q.choices && typeof q.answer === 'number' && q.choices[q.answer]) {
      out.push(shortLabel(q.choices[q.answer]));
    }
  }
  return out.length ? out : ['falaj water'];
}
let distractorCache = null;
function distractorLabels() {
  if (distractorCache) return distractorCache;
  const set = new Set();
  const bank = window.QUESTION_BANK || [];
  for (const L of bank) {
    for (const q of (L.questions || [])) {
      if (!q.choices) continue;
      q.choices.forEach((c, i) => { if (i !== q.answer) set.add(shortLabel(c)); });
      if (set.size > 900) break;
    }
    if (set.size > 900) break;
  }
  distractorCache = Array.from(set);
  if (!distractorCache.length) distractorCache = ['sand dune', 'high mountain', 'deep well'];
  return distractorCache;
}

function freeToken() {
  for (const t of tokenPool) if (!t.active) return t;
  return null;
}

const _tp = new THREE.Vector3(), _tt = new THREE.Vector3();
function placeToken(tok) {
  const d = clampf(tok.dist, 0, curveLen - 0.01);
  pathAt(d, _tp); tangentAt(d, _tt);
  const bobY = -0.05 + Math.sin(tok.bob + currentTSec * 2.2) * 0.16;
  tok.mesh.position.set(_tp.x + (-_tt.z) * tok.lat, 0.75 + bobY, _tp.z + _tt.x * tok.lat);
  tok.mesh.rotation.y = Math.atan2(_tt.x, _tt.z);
}

// Spawn a loose pattern of tokens ahead of the boat between d0..d1.
function spawnTokensAhead() {
  const levelData = quiz.levelData || getLevel(state.gateIndex + 1);
  const good = correctLabelsFor(levelData);
  const bad = distractorLabels();
  const wrongRatio = wrongRatioFor(state.gateIndex + 1);
  const ahead0 = state.dist + 55, ahead1 = state.dist + 260;
  const gateD = state.gateIndex < NUM_LEVELS ? gateDists[state.gateIndex] - 18 : curveLen - 10;
  if (state.tokSpawnDist < ahead0) state.tokSpawnDist = ahead0;
  const LANES = [-2.0, 0, 2.0];
  while (state.tokSpawnDist < Math.min(ahead1, gateD)) {
    const d = state.tokSpawnDist;
    // pattern: 1-3 tokens per wave in loose lanes, with a gentle weave
    const wave = Math.floor(d / 14);
    const nTok = randInt(1, rng() < 0.55 ? 2 : 3);
    const lanes = LANES.slice().sort(() => rng() - 0.5);
    let placedCorrect = false;
    for (let k = 0; k < nTok; k++) {
      const tok = freeToken();
      if (!tok) break;
      const isCorrect = k === 0 ? !placedCorrect && rng() > wrongRatio : rng() > wrongRatio;
      if (isCorrect) placedCorrect = true;
      tok.active = true;
      tok.correct = isCorrect;
      tok.fade = 0;
      tok.dist = d + rand(-2, 2);
      tok.lat = clampf(lanes[k] + Math.sin(wave * 0.9 + k) * 0.9 + rand(-0.3, 0.3), -CHANNEL_HALF_WIDTH + 0.9, CHANNEL_HALF_WIDTH - 0.9);
      tok.text = isCorrect ? good[randInt(0, good.length - 1)] : bad[randInt(0, bad.length - 1)];
      tok.bob = rand(0, 6.28);
      tokenColor(tok);
      drawLabel(tok);
      placeToken(tok);
      tok.mesh.visible = true;
    }
    state.tokSpawnDist += rand(16, 25); // wider gaps between waves — more time to react
  }
}

// ---------------------------------------------------------------------------
// Burst particles (collect sparkles, wrong splashes, edge scrape sparks) and
// bow spray foam — small instanced pools updated on the CPU.
// ---------------------------------------------------------------------------
function makeParticlePool(scene, n, colorA, colorB, size = 0.08) {
  const geo = new THREE.SphereGeometry(size, 8, 6);
  const mat = new THREE.MeshBasicNodeMaterial({ transparent: true, opacity: 0.9, depthWrite: false });
  mat.colorNode = mix(color(colorA), color(colorB), hash(instanceIndex.add(1)));
  const mesh = new THREE.InstancedMesh(geo, mat, n);
  mesh.frustumCulled = false;
  scene.add(mesh);
  const parts = [];
  for (let i = 0; i < n; i++) parts.push({ life: -1, maxLife: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, s: 1, g: 0 });
  return { mesh, parts, cursor: 0 };
}
function emit(pool, x, y, z, vx, vy, vz, life, s, g = 0) {
  const pt = pool.parts[pool.cursor];
  pool.cursor = (pool.cursor + 1) % pool.parts.length;
  pt.life = life; pt.maxLife = life;
  pt.x = x; pt.y = y; pt.z = z; pt.vx = vx; pt.vy = vy; pt.vz = vz; pt.s = s; pt.g = g;
}
const _pm = new THREE.Matrix4(), _pq = new THREE.Quaternion(), _ps = new THREE.Vector3();
function updatePool(pool, dt) {
  let any = false;
  for (let i = 0; i < pool.parts.length; i++) {
    const pt = pool.parts[i];
    if (pt.life > 0) {
      any = true;
      pt.life -= dt;
      pt.vy -= pt.g * dt;
      pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.z += pt.vz * dt;
      const f = Math.max(0, pt.life / pt.maxLife);
      _ps.setScalar(Math.max(0.001, pt.s * f));
    } else _ps.set(0, 0, 0);
    _pm.compose(new THREE.Vector3(pt.x, pt.y, pt.z), _pq, _ps);
    pool.mesh.setMatrixAt(i, _pm);
  }
  if (any) pool.mesh.instanceMatrix.needsUpdate = true;
}

let burstPool, splashPool, sprayPool, motePool, hazePool;

function collectBurst(pos, warm = true) {
  const pool = warm ? burstPool : splashPool;
  for (let i = 0; i < 14; i++) {
    const a = rand(0, 6.28), sp = rand(1.2, 3.6);
    emit(pool, pos.x, pos.y, pos.z,
      Math.cos(a) * sp, rand(1.5, 4.2), Math.sin(a) * sp,
      rand(0.45, 0.9), rand(0.6, 1.5), warm ? 4.5 : 7.5);
  }
}

function collectToken(tok) {
  tok.active = false;
  tok.mesh.visible = false;
  const pos = tok.mesh.position;
  if (tok.correct) {
    const speedFactor = state.speed / BASE_SPEED;
    const pts = Math.round((100 + state.streak * 12) * speedFactor);
    state.score += pts;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.tokCorrect++;
    collectBurst(pos, true);
    AudioSys.collectChime(state.streak);
    if (state.tokCorrect >= TOKENS_TARGET && !state.surge && state.gateIndex < NUM_LEVELS) {
      state.surge = true;
      toast('Topic complete! The current surges you toward the gate…', 3200);
      Narrator.speak('The falaj knows you understand. Hold on — the current surges!');
    }
  } else {
    const penalty = 40;
    state.score = Math.max(0, state.score - penalty);
    state.streak = 0;
    state.tokWrong++;
    collectBurst(pos, false);
    AudioSys.splash();
    const fx = $('ripple-fx');
    fx.classList.remove('flash');
    void fx.offsetWidth;             // restart the CSS animation
    fx.classList.add('flash');
  }
  updateHUD();
}

// Player-triggered jump — reuses the same airtime arc as the scripted ramp drops
// (state.drop / state.dropY), so a jump both looks right and lets you clear a
// wrong token in your lane instead of only being able to steer around it.
function triggerJump() {
  if (!state.running || state.inQuiz || state.paused || state.finished) return;
  if (state.drop > 0) return; // already airborne
  state.drop = 0.0001;
  AudioSys.whoosh();
}

const _tv = new THREE.Vector3();
function updateTokens(dt) {
  if (!state.running || state.inQuiz || state.finished) return;
  spawnTokensAhead();
  const magnet = state.wind > 0.25;    // khamaseen pulls tokens to the boat
  for (const tok of tokenPool) {
    if (!tok.active) continue;
    const rel = tok.dist - state.dist;
    if (tok.fade < 1) { tok.fade = Math.min(1, tok.fade + dt * 2); tok.mesh.scale.setScalar(Math.max(0.01, tok.fade)); }
    if (magnet && rel > 0 && rel < 45) {
      tok.lat += (state.lateral - tok.lat) * Math.min(1, dt * 1.6 * state.wind);
    }
    placeToken(tok);
    // gentle spin/bob animation on the orb itself
    tok.orb.rotation.y += dt * 1.5;
    if (rel < 1.2) {
      if (Math.abs(tok.lat - state.lateral) < 1.45) {
        // a jump lets you sail clean over a wrong token instead of just steering around it
        if (tok.correct || state.drop <= 0.05) collectToken(tok);
      } else if (rel < -4) {
        tok.active = false; tok.mesh.visible = false;   // missed, no penalty
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Dust motes drifting in the light near the camera.
// ---------------------------------------------------------------------------
function buildMotes(scene) {
  motePool = makeParticlePool(scene, 60, 0xd8c9a8, 0xf0e3c0, 0.035);
  for (const pt of motePool.parts) {
    pt.life = 1e9; pt.maxLife = 1e9;   // persistent; repositioned relative to camera
    pt.s = rand(0.5, 1.4);
  }
}
function updateMotes(dt, camPos) {
  for (let i = 0; i < motePool.parts.length; i++) {
    const pt = motePool.parts[i];
    if (pt.x === 0 && pt.y === 0) {
      pt.x = camPos.x + rand(-9, 9); pt.y = camPos.y + rand(-1, 4); pt.z = camPos.z + rand(-9, 9);
    }
    pt.x += Math.sin(currentTSec * 0.4 + i) * dt * 0.35 + state.wind * dt * 6;
    pt.y += Math.cos(currentTSec * 0.3 + i * 1.7) * dt * 0.2;
    pt.z += Math.cos(currentTSec * 0.35 + i * 0.9) * dt * 0.35;
    // wrap around the camera
    if (Math.abs(pt.x - camPos.x) > 10) pt.x = camPos.x + rand(-9, 9) * Math.sign(pt.x - camPos.x) * -1;
    if (Math.abs(pt.z - camPos.z) > 10) pt.z = camPos.z + rand(-9, 9) * Math.sign(pt.z - camPos.z) * -1;
    _ps.setScalar(pt.s * (0.7 + Math.sin(currentTSec * 1.2 + i) * 0.3));
    _pm.compose(new THREE.Vector3(pt.x, pt.y, pt.z), _pq, _ps);
    motePool.mesh.setMatrixAt(i, _pm);
  }
  motePool.mesh.instanceMatrix.needsUpdate = true;
}

// ---------------------------------------------------------------------------
// Khamaseen wind: hot gust every ~45-90 s — sand haze streaming past, palms
// thrash (uWind), whoosh audio, speed surge + token magnet.
// ---------------------------------------------------------------------------
function buildHaze(scene) {
  hazePool = makeParticlePool(scene, 160, 0xc99a5e, 0xe2c08a, 0.14);
}
function triggerWind() {
  if (state.windActive > 0) return;
  state.windActive = 8;
  state.windTimer = rand(45, 90);
  AudioSys.whoosh();
  $('wind-banner').classList.add('visible');
  $('wind-fx').classList.add('visible');
  setTimeout(() => $('wind-banner').classList.remove('visible'), 4200);
  Narrator.speak('Khamaseen! The hot wind rides with you — the orbs drift to your hand!');
}
function updateWind(dt, camPos) {
  state.windTimer -= dt;
  if (state.windTimer <= 0 && state.running && !state.inQuiz && !state.finished) triggerWind();
  if (state.windActive > 0) {
    state.windActive -= dt;
    if (state.windActive <= 0) $('wind-fx').classList.remove('visible');
  }
  const target = state.windActive > 0 ? 1 : 0;
  state.wind += (target - state.wind) * Math.min(1, dt * 2.2);
  uWind.value = state.wind;
  // sand haze particles streaming past the camera, denser at screen edges
  if (state.wind > 0.05 && !reducedMotion) {
    const n = Math.round(state.wind * 9);
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.28);
      emit(hazePool,
        camPos.x + Math.cos(a) * rand(6, 16), camPos.y + rand(-1.5, 5), camPos.z + Math.sin(a) * rand(6, 16),
        rand(-3, 3) + state.wind * rand(-22, -12), rand(-0.5, 0.8), rand(-3, 3),
        rand(0.5, 1.1), rand(1.2, 2.6));
    }
  }
  updatePool(hazePool, dt);
}

// ---------------------------------------------------------------------------
// Audio: fully synthesized with WebAudio (no files).
// Layers: water, oud-like plucked melody (maqam-ish, sparse), village
// ambience (birds, distant murmurs), market layer near the shop, SFX.
// ---------------------------------------------------------------------------
const AudioSys = {
  ctx: null, master: null, waterGain: null, waterFilter: null,
  noiseBuf: null,
  oudTimer: 4, murmurTimer: 12, marketTimer: 2, marketLevel: 0,
  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = state.muted ? 0 : 0.9;
      this.master.connect(this.ctx.destination);
      // shared brown-ish noise buffer
      const len = this.ctx.sampleRate * 2;
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const ch = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = last * 0.94 + w * 0.06;
        ch[i] = last * 3.0;
      }
      this.noiseBuf = buf;
      // water ambience: looped noise through lowpass
      const src = this.ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      this.waterFilter = this.ctx.createBiquadFilter();
      this.waterFilter.type = 'lowpass';
      this.waterFilter.frequency.value = 500;
      this.waterGain = this.ctx.createGain();
      this.waterGain.gain.value = 0.18;
      src.connect(this.waterFilter).connect(this.waterGain).connect(this.master);
      src.start();
    } catch (e) { /* audio unavailable — game continues silently */ }
  },
  setMuted(m) {
    state.muted = m;
    if (this.master) this.master.gain.linearRampToValueAtTime(m ? 0 : 0.9, this.ctx.currentTime + 0.1);
  },
  setFlow(f) {
    if (!this.ctx) return;
    const freq = [380, 650, 1100][f];
    const g = [0.10, 0.18, 0.30][f];
    this.waterFilter.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + 0.5);
    this.waterGain.gain.linearRampToValueAtTime(g, this.ctx.currentTime + 0.5);
  },
  tone(freq, dur, type = 'sine', vol = 0.25, when = 0) {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g).connect(this.master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  },
  // oud-like pluck: two slightly detuned triangles through a lowpass, fast decay
  pluck(freq, vol = 0.05, when = 0) {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime + when;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1400; lp.Q.value = 0.5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + 1.3);
    lp.connect(g).connect(this.master);
    for (const det of [-4, 3]) {
      const o = this.ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = freq;
      o.detune.value = det;
      o.connect(lp);
      o.start(t0); o.stop(t0 + 1.4);
    }
  },
  // sparse maqam-ish melodic loop (Hijaz-flavoured scale on D)
  updateOud(dt) {
    if (!this.ctx || state.muted) return;
    this.oudTimer -= dt;
    if (this.oudTimer <= 0) {
      this.oudTimer = rand(4.0, 9.0);
      const scale = [146.83, 155.56, 185.0, 196.0, 220.0, 233.08, 261.63, 293.66];
      const root = scale[randInt(0, scale.length - 1)];
      const notes = rng() < 0.35 ? 2 : 1;
      for (let i = 0; i < notes; i++) {
        const n = i === 0 ? root : scale[randInt(0, scale.length - 1)];
        this.pluck(n, 0.035 + rng() * 0.02, i * rand(0.3, 0.55));
      }
    }
  },
  // distant village voice murmur: short band-passed noise bursts
  murmur(vol = 0.022) {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 0.7 + Math.random() * 0.5;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 320 + Math.random() * 380;
    bp.Q.value = 2.2;
    const g = this.ctx.createGain();
    const dur = 0.3 + Math.random() * 0.4;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.08);
    // wobble like speech cadence
    for (let i = 1; i < 4; i++) g.gain.linearRampToValueAtTime(vol * (0.3 + Math.random() * 0.7), t0 + dur * (i / 4));
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + dur + 0.05);
  },
  updateVillage(dt) {
    if (!this.ctx || state.muted) return;
    this.murmurTimer -= dt;
    if (this.murmurTimer <= 0) {
      this.murmurTimer = rand(16, 42);
      this.murmur(0.018);
    }
  },
  // market layer near the shop: denser murmurs + soft pottery clinks
  updateMarket(dt, proximity) {
    if (!this.ctx || state.muted) return;
    this.marketLevel += (proximity - this.marketLevel) * Math.min(1, dt * 1.5);
    if (this.marketLevel < 0.05) return;
    this.marketTimer -= dt;
    if (this.marketTimer <= 0) {
      this.marketTimer = rand(1.5, 5.0) / (0.4 + this.marketLevel);
      if (rng() < 0.55) {
        this.murmur(0.02 * this.marketLevel);
      } else {
        // gentle clay-pot clink
        this.tone(1450 + Math.random() * 700, 0.12, 'triangle', 0.02 * this.marketLevel);
      }
    }
  },
  click() { this.tone(880, 0.06, 'triangle', 0.07); },
  // warm chime for a correct answer
  correct() {
    this.tone(523, 0.3, 'sine', 0.2);
    this.tone(784, 0.4, 'sine', 0.18, 0.09);
    this.tone(1046, 0.55, 'sine', 0.12, 0.18);
    this.tone(1568, 0.4, 'sine', 0.05, 0.22);
  },
  // soft low thunk for a wrong answer (gentle, not harsh)
  wrong() {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(110, t0);
    o.frequency.exponentialRampToValueAtTime(70, t0 + 0.25);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.22, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
    o.connect(g).connect(this.master);
    o.start(t0); o.stop(t0 + 0.45);
    this.tone(196, 0.18, 'sine', 0.06, 0.05);
  },
  // soft water ping for the ripple hint
  ripplePing() {
    this.tone(660, 0.5, 'sine', 0.08);
    this.tone(990, 0.6, 'sine', 0.05, 0.12);
  },
  // stone grinding open: swept lowpassed noise + low rumble, then a fanfare
  gateOpen() {
    if (!this.ctx || state.muted) { this.fanfare(); return; }
    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf; src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(240, t0);
    lp.frequency.exponentialRampToValueAtTime(90, t0 + 1.5);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.35, t0 + 0.12);
    g.gain.setValueAtTime(0.35, t0 + 1.2);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.7);
    src.connect(lp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 1.8);
    const o = this.ctx.createOscillator();
    o.type = 'sine'; o.frequency.setValueAtTime(48, t0);
    const og = this.ctx.createGain();
    og.gain.setValueAtTime(0.0, t0);
    og.gain.linearRampToValueAtTime(0.16, t0 + 0.2);
    og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.6);
    o.connect(og).connect(this.master);
    o.start(t0); o.stop(t0 + 1.7);
    this.fanfare(1.4);
  },
  fanfare(when = 0) {
    const notes = [523, 659, 784, 1046, 784, 1046];
    notes.forEach((n, i) => this.tone(n, 0.4, 'triangle', 0.2, when + i * 0.13));
  },
  chirp() {
    if (!this.ctx || state.muted) return;
    const base = 2200 + Math.random() * 1600;
    const t0 = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = 'sine';
      const st = t0 + i * 0.09;
      o.frequency.setValueAtTime(base + Math.random() * 500, st);
      o.frequency.exponentialRampToValueAtTime(base * 0.7, st + 0.07);
      g.gain.setValueAtTime(0, st);
      g.gain.linearRampToValueAtTime(0.05, st + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.08);
      o.connect(g).connect(this.master);
      o.start(st); o.stop(st + 0.1);
    }
  },

  // ---- adaptive darbuka/frame-drum loop ----------------------------------
  // Tempo follows boat speed; layer intensity follows the collect streak.
  drum: { bpm: 96, next: 0, stepIdx: 0, intensity: 0 },
  doum(when, vol = 0.30) {
    // low frame-drum thump: pitched sine drop + filtered noise body
    const t0 = when;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t0);
    o.frequency.exponentialRampToValueAtTime(52, t0 + 0.16);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.30);
    o.connect(g).connect(this.master);
    o.start(t0); o.stop(t0 + 0.35);
  },
  tek(when, vol = 0.10) {
    // rim 'tek': short band-passed noise click
    const t0 = when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 1.6;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 2800; bp.Q.value = 1.4;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 0.09);
  },
  shaker(when, vol = 0.05) {
    const t0 = when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 2.2;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 5200;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.05);
    src.connect(hp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 0.06);
  },
  // lookahead scheduler; call every frame with normalised speed & streak
  updateDrums(dt, speedNorm, streak) {
    if (!this.ctx || state.muted || !state.running) return;
    const d = this.drum;
    d.bpm = 88 + speedNorm * 68;                       // 88..~156 bpm
    d.intensity = Math.min(1, 0.25 + speedNorm * 0.35 + Math.min(streak, 12) * 0.05);
    const stepDur = 60 / d.bpm / 2;                    // 8th notes
    const now = this.ctx.currentTime;
    if (d.next < now) d.next = now + 0.05;
    while (d.next < now + 0.22) {
      const s = d.stepIdx % 8;
      // maqsum-ish pattern: DOUM - tek - DOUM tek - tek (extra doum on high streak)
      if (s === 0 || s === 4) this.doum(d.next, 0.30 * d.intensity + 0.08);
      else if (s === 6 && streak >= 6) this.doum(d.next, 0.18 * d.intensity);
      else if (s === 2 || s === 5 || s === 7) this.tek(d.next, 0.11 * d.intensity);
      if (d.intensity > 0.55) this.shaker(d.next + stepDur * 0.5, 0.05 * d.intensity);
      d.next += stepDur;
      d.stepIdx++;
    }
  },
  // ---- new SFX for the collection run ------------------------------------
  collectChime(streak = 0) {
    // rising warm chime, pitch climbs gently with the streak
    const lift = Math.min(streak, 12) * 18;
    this.tone(620 + lift, 0.22, 'sine', 0.20);
    this.tone(930 + lift * 1.5, 0.3, 'sine', 0.16, 0.06);
    this.tone(1240 + lift * 2, 0.4, 'sine', 0.10, 0.12);
  },
  splash() {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 1.2;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2600, t0);
    lp.frequency.exponentialRampToValueAtTime(500, t0 + 0.4);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.3, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.55);
    src.connect(lp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 0.6);
    this.tone(140, 0.25, 'sine', 0.10, 0.02);
  },
  scrape() {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 0.9;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.22, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 0.45);
  },
  whoosh() {
    if (!this.ctx || state.muted) return;
    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf; src.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 0.6;
    bp.frequency.setValueAtTime(300, t0);
    bp.frequency.exponentialRampToValueAtTime(1400, t0 + 2.0);
    bp.frequency.exponentialRampToValueAtTime(350, t0 + 7.0);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.34, t0 + 1.4);
    g.gain.setValueAtTime(0.34, t0 + 4.5);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 7.5);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t0); src.stop(t0 + 7.8);
  },
};

// ---------------------------------------------------------------------------
// Narrator: Web Speech API with mandatory subtitles (accessibility).
// ---------------------------------------------------------------------------
const Narrator = {
  voice: null, available: false, subTimer: null,
  init() {
    this.available = typeof window.speechSynthesis !== 'undefined';
    if (!this.available) { state.narrator = false; return; }
    const pick = () => {
      try {
        const vs = window.speechSynthesis.getVoices() || [];
        this.voice =
          vs.find(v => /^en/i.test(v.lang) && /natural|warm|female|zira|samantha|google us english|aria/i.test(v.name)) ||
          vs.find(v => /^en[-_]US/i.test(v.lang)) ||
          vs.find(v => /^en/i.test(v.lang)) || null;
      } catch (e) { /* keep default voice */ }
    };
    pick();
    try { window.speechSynthesis.onvoiceschanged = pick; } catch (e) {}
  },
  subtitle(text, who = 'Narrator', ms = 6000) {
    const bar = $('subtitle-bar');
    bar.querySelector('.who').textContent = who;
    $('subtitle-text').textContent = text;
    bar.classList.add('visible');
    clearTimeout(this.subTimer);
    this.subTimer = setTimeout(() => bar.classList.remove('visible'), ms);
  },
  speak(text, who = 'Narrator') {
    // subtitles ALWAYS shown, even when the voice is toggled off
    this.subtitle(text, who, Math.max(4500, Math.min(12000, text.length * 75)));
    if (!this.available || !state.narrator || state.muted) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (this.voice) u.voice = this.voice;
      u.rate = 0.95;
      u.pitch = 1.0;
      u.volume = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) { /* narration unavailable — subtitles remain */ }
  },
  stop() {
    if (this.available) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  },
};

// ---------------------------------------------------------------------------
// Question bank contract: window.QUESTION_BANK (from questions.js).
// If missing/incomplete, generate graceful placeholders so the game runs.
// ---------------------------------------------------------------------------
const THEMES = ['proverbs', 'tales', 'legends', 'beliefs'];
function placeholderLevel(id) {
  const theme = THEMES[(id - 1) % THEMES.length];
  const qs = [];
  for (let i = 0; i < 20; i++) {
    qs.push({
      q: `Village knowledge (${theme} #${id}.${i + 1}): What is a falaj?`,
      choices: [
        'A traditional water channel that carries water to farms and villages',
        'A type of desert sand dune',
        'A sailing ship used for pearl diving',
        'A mountain fortress tower',
      ],
      answer: 0,
      lore: 'Omani aflaj channels have carried water for over 2,000 years — five are UNESCO World Heritage sites!',
    });
  }
  return { id, title: `Falaj Gate ${id}`, theme, questions: qs };
}

function getLevel(id) {
  const bank = window.QUESTION_BANK;
  if (Array.isArray(bank)) {
    const lvl = bank.find((l) => l && l.id === id);
    if (lvl && Array.isArray(lvl.questions) && lvl.questions.length > 0) {
      return {
        id,
        title: lvl.title || `Falaj Gate ${id}`,
        theme: lvl.theme || 'proverbs',
        questions: lvl.questions.filter((q) => q && q.q && Array.isArray(q.choices) && q.choices.length >= 2),
      };
    }
  }
  return placeholderLevel(id);
}

// Difficulty easing: early levels sample the whole pool; later levels draw
// from the harder (later) part of the level's 100-question pool.
function pickQuestions(level, n, levelId = 1) {
  const start = poolStartFor(levelId, level.questions.length);
  const pool = level.questions.slice(start);
  const out = [];
  while (out.length < n && pool.length > 0) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  let i = 0;
  while (out.length < n) { out.push(level.questions[i % level.questions.length]); i++; }
  return out;
}

// ---------------------------------------------------------------------------
// Save system (localStorage): progress + per-level best score & badge.
// Badge tiers by accuracy: bronze < 0.8, linen < 0.95, burgundy >= 0.95
// (muted metallic/earth UI tones only — no bright gold).
// ---------------------------------------------------------------------------
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || typeof s.level !== 'number') return null;
    s.best = s.best && typeof s.best === 'object' ? s.best : {};
    return s;
  } catch (e) { return null; }
}
function writeSave() {
  try {
    const s = state.save || { level: 1, score: 0, best: {} };
    s.level = Math.max(s.level || 1, state.level);
    s.score = Math.max(s.score || 0, state.score);
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    state.save = s;
  } catch (e) { /* storage unavailable — play session continues */ }
}
function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  state.save = null;
}
function badgeFor(accuracy) {
  if (accuracy >= 0.95) return { tier: 'burgundy', label: 'Master' };
  if (accuracy >= 0.8) return { tier: 'linen', label: 'Woven' };
  return { tier: 'bronze', label: 'Apprentice' };
}
function recordLevelResult(levelId, accuracy, gateScore) {
  try {
    const s = state.save || { level: 1, score: 0, best: {} };
    const prev = s.best[levelId];
    if (!prev || accuracy > prev.accuracy || (accuracy === prev.accuracy && gateScore > prev.score)) {
      s.best[levelId] = { score: gateScore, accuracy, badge: badgeFor(accuracy).tier };
    }
    state.save = s;
    writeSave();
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// Quiz UI — riddles carved into the gate stone. Wrong answers never fail:
// they trigger a gentle in-world hint (elder voice / bird flyby / ripple
// pulse) and the player retries with a score penalty.
// ---------------------------------------------------------------------------
const quiz = {
  levelData: null, questions: [], idx: 0, correct: 0, answered: false,
  mistakes: 0, totalMistakes: 0, gateScore: 0, freeRetries: 0,
  els: {
    overlay: $('quiz-overlay'), main: $('quiz-main'), result: $('quiz-result'),
    title: $('quiz-level-title'), theme: $('quiz-theme'), counter: $('quiz-counter'),
    correctEl: $('quiz-correct'), question: $('quiz-question'), choices: $('quiz-choices'),
    feedback: $('quiz-feedback'), nextBtn: $('quiz-next-btn'),
    resultTitle: $('quiz-result-title'), resultText: $('quiz-result-text'),
    continueBtn: $('quiz-continue-btn'),
  },
  open(levelId) {
    this.levelData = getLevel(levelId);
    if (this.levelData.questions.length === 0) this.levelData = placeholderLevel(levelId);
    this.questions = pickQuestions(this.levelData, QUESTIONS_PER_GATE, levelId);
    this.idx = 0; this.correct = 0; this.totalMistakes = 0; this.gateScore = 0;
    this.freeRetries = freeRetriesFor(levelId);
    state.inQuiz = true;
    this.els.overlay.classList.add('visible');
    this.els.main.style.display = 'block';
    this.els.result.style.display = 'none';
    this.els.title.textContent = `Gate ${levelId} — ${this.levelData.title}`;
    this.els.theme.textContent = `${this.levelData.theme} · optional bonus riddles`;
    $('quiz-skip-btn').style.display = 'block';
    document.exitPointerLock?.();
    this.showQuestion();
  },
  showQuestion() {
    const q = this.questions[this.idx];
    this.answered = false;
    this.mistakes = 0;
    this.els.counter.textContent = `Bonus riddle ${this.idx + 1} / ${QUESTIONS_PER_GATE}`;
    this.els.correctEl.textContent = `Solved: ${this.correct} · +${100 + state.streak * 10} each`;
    this.els.question.textContent = q.q;
    this.els.feedback.textContent = '';
    this.els.nextBtn.classList.remove('visible');
    this.els.choices.innerHTML = '';
    q.choices.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-choice';
      btn.innerHTML = `<span class="key">${i + 1}</span>${c}`;
      btn.setAttribute('aria-label', `choice ${i + 1}: ${c}`);
      btn.addEventListener('click', () => this.answer(i));
      this.els.choices.appendChild(btn);
    });
    this.els.choices.firstChild?.focus();
    // narrator reads the riddle aloud (subtitle always on)
    Narrator.speak(q.q);
  },
  answer(i) {
    if (this.answered) return;
    const q = this.questions[this.idx];
    const btns = Array.from(this.els.choices.children);
    if (btns[i].disabled) return;
    const ok = i === q.answer;
    if (ok) {
      this.answered = true;
      this.correct++;
      // score penalty for needing hints: half points if any mistake
      const pts = Math.round((100 + state.streak * 10) * (this.mistakes === 0 ? 1 : 0.5));
      state.score += pts;
      this.gateScore += pts;
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      btns.forEach((b) => (b.disabled = true));
      btns[i].classList.add('correct');
      this.els.feedback.innerHTML = `<b>The stone accepts your answer.</b> +${pts} ${q.lore ? `<span class="lore">${q.lore}</span>` : ''}`;
      AudioSys.correct();
      Narrator.stop();
      this.els.correctEl.textContent = `Solved: ${this.correct} · +${100 + state.streak * 10} each`;
      this.els.nextBtn.textContent = this.idx + 1 < QUESTIONS_PER_GATE ? 'Next riddle ➜' : 'See result ➜';
      this.els.nextBtn.classList.add('visible');
      this.els.nextBtn.focus();
    } else {
      // NO hard fail: mark the wrong choice, give a gentle hint, allow retry
      this.mistakes++;
      this.totalMistakes++;
      state.streak = 0;
      btns[i].classList.add('wrong');
      btns[i].disabled = true;
      AudioSys.wrong();
      let penalty = 0;
      if (this.mistakes > this.freeRetries) {
        penalty = 25;
        state.score = Math.max(0, state.score - penalty);
      }
      const hintHtml = this.giveHint(q, this.mistakes - 1);
      this.els.feedback.innerHTML =
        `<b>Not quite — the stone stays silent.</b> ${penalty ? `(−${penalty}) ` : ''}${hintHtml}<br>Try again, traveller.`;
      // move focus to first remaining choice for keyboard players
      const nextFree = btns.find((b) => !b.disabled);
      nextFree?.focus();
    }
    updateHUD();
  },
  // Cycle hint types: (a) elder voice, (b) bird flyby, (c) ripple pulse
  giveHint(q, hintNum) {
    const type = hintNum % 3;
    if (type === 0) {
      const line = q.lore
        ? `An elder under the palm tree strokes his beard: "${q.lore}"`
        : 'An elder under the palm tree whispers: "Listen to the water, and remember the old stories."';
      Narrator.speak(line, 'Elder');
      return `<span class="hint">🌴 The elder shares a memory… (see subtitles)</span>`;
    } else if (type === 1) {
      triggerHintBird(hintBird, camera);
      Narrator.subtitle('A palm dove flutters across the water — watch where it flies.', 'Narrator', 4000);
      return `<span class="hint">🕊 A bird flutters across the view, urging you onward.</span>`;
    } else {
      // ripple pulse toward the correct choice: map answer index across channel
      const frac = q.choices.length > 1 ? q.answer / (q.choices.length - 1) : 0.5;
      const lat = (frac - 0.5) * 2 * (CHANNEL_HALF_WIDTH - 1.2);
      const ahead = clampf(state.dist + 10, 0, curveLen - 0.01);
      const pp = pathAt(ahead, new THREE.Vector3());
      const tt = tangentAt(ahead, new THREE.Vector3());
      const rx = pp.x + (-tt.z) * lat, rz = pp.z + tt.x * lat;
      uRipple.value.set(rx, rz, currentTSec, 1);
      AudioSys.ripplePing();
      Narrator.subtitle('The water itself ripples… look where the rings spread.', 'Narrator', 4500);
      return `<span class="hint">〰 The falaj ripples toward the answer — watch the water.</span>`;
    }
  },
  next() {
    if (!this.answered) return;
    AudioSys.click();
    if (this.idx + 1 < QUESTIONS_PER_GATE) {
      this.idx++;
      this.showQuestion();
    } else {
      this.finish();
    }
  },
  finish(skipped = false) {
    this.els.main.style.display = 'none';
    this.els.result.style.display = 'block';
    $('quiz-skip-btn').style.display = 'none';
    Narrator.stop();
    // gate result blends the collection run (main) with the bonus riddles
    const tokTotal = state.tokCorrect + state.tokWrong;
    const tokAcc = tokTotal > 0 ? state.tokCorrect / tokTotal : 1;
    const quizAcc = skipped ? tokAcc
      : (QUESTIONS_PER_GATE) / (QUESTIONS_PER_GATE + this.totalMistakes + (QUESTIONS_PER_GATE - this.correct));
    const accuracy = clampf(tokAcc * 0.7 + quizAcc * 0.3, 0, 1);
    const badge = badgeFor(accuracy);
    const bonus = Math.round(120 * accuracy + state.tokCorrect * 12 + this.correct * 60);
    state.score += bonus;
    this.gateScore += bonus;
    recordLevelResult(state.gateIndex + 1, accuracy, this.gateScore);
    this.els.resultTitle.textContent = '🎉 The Arch Grinds Open!';
    this.els.resultText.innerHTML =
      `Run: <b>${state.tokCorrect}</b> true tokens collected` +
      `${state.tokWrong ? `, ${state.tokWrong} cold splashes` : ' without a single cold splash'}. ` +
      (skipped ? 'You rode straight past the riddles. '
        : `Bonus riddles: ${this.correct}/${QUESTIONS_PER_GATE}. `) +
      `+${bonus} bonus · Badge: <span class="badge ${badge.tier}">${badge.label}</span>. ` +
      `The stone slab grinds aside — the falaj races onward!`;
    Narrator.speak('Well ridden, traveller. The gate opens before you.');
    this.els.result.dataset.passed = '1';
    this.els.continueBtn.focus();
    updateHUD();
  },
  skip() {
    AudioSys.click();
    this.finish(true);
  },
  close() {
    this.els.overlay.classList.remove('visible');
    state.inQuiz = false;
    AudioSys.click();
    Narrator.stop();
    state.gateOpening = true;
    state.level = Math.min(NUM_LEVELS, state.gateIndex + 2);
    AudioSys.gateOpen();
    writeSave();
    if (state.gateIndex >= NUM_LEVELS - 1) {
      state.finished = true;
    }
    updateHUD();
  },
};

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
function updateHUD() {
  $('hud-level').textContent = `Level ${state.level} / ${NUM_LEVELS}`;
  $('hud-score').textContent = `Score: ${state.score}`;
  const best = state.save && state.save.best ? state.save.best[state.gateIndex + 1] : null;
  $('hud-best').innerHTML = best
    ? `Best: <span class="badge ${best.badge}">${badgeFor(best.accuracy).label}</span>`
    : 'Best: —';
  const st = $('hud-streak');
  st.textContent = state.streak >= 4 ? `🔥 Streak: ${state.streak}` : `Streak: ${state.streak}`;
  st.classList.toggle('hot', state.streak >= 4);
  $('hud-speed').textContent = `Speed: ${Math.round(state.speed * 3.6)} km/h`;
  // progress: distance through this segment toward the gate
  const segStart = state.gateIndex > 0 ? gateDists[state.gateIndex - 1] : 0;
  const gateD = state.gateIndex < NUM_LEVELS ? gateDists[state.gateIndex] : curveLen;
  $('progress-bar').style.width = `${(clampf((state.dist - segStart) / Math.max(1, gateD - segStart), 0, 1) * 100).toFixed(1)}%`;
  $('hud-topic-sub').textContent =
    state.gateIndex < NUM_LEVELS
      ? `${state.tokCorrect}/${TOKENS_TARGET} true tokens · gate ${state.gateIndex + 1} ahead`
      : 'final stretch';
}

// Set the topic word for the segment: the level title, engraved top-center.
function startSegment() {
  const levelData = getLevel(state.gateIndex + 1);
  quiz.levelData = levelData;
  state.topic = (levelData.title || `Gate ${state.gateIndex + 1}`).toUpperCase();
  $('hud-topic-word').textContent = state.topic;
  state.tokCorrect = 0;
  state.tokWrong = 0;
  state.surge = false;
  // clear leftover tokens from the previous segment
  for (const tok of tokenPool) { tok.active = false; tok.mesh.visible = false; }
  state.tokSpawnDist = state.dist + 50;
}

let toastTimer = null;
function toast(msg, ms = 3500) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), ms);
}

// ---------------------------------------------------------------------------
// Scene assembly
// ---------------------------------------------------------------------------
let renderer, scene, camera, postProcessing, boat, gate, birds, butterflies, hintBird;
let shopDist = 0;
const camTmp = { p: new THREE.Vector3(), t: new THREE.Vector3() };

async function initScene() {
  const canvas = $('game-canvas');
  renderer = new THREE.WebGPURenderer({ canvas, antialias: true, forceWebGL: FORCE_WEBGL });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  await renderer.init();
  setProgress(0.25, 'Renderer ready — building sky…');

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xd4dcd2, 70, 950);   // atmospheric haze

  camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(0, 1, 8);

  // cinematic lighting: soft warm key + gentle fill
  const sun = new THREE.DirectionalLight(0xfff3da, 1.9);
  sun.position.set(40, 80, 20);
  const hemi = new THREE.HemisphereLight(0xcfd8d0, 0x8a7a5a, 0.85);
  scene.add(sun, hemi);
  scene.userData.sun = sun;
  scene.userData.hemi = hemi;

  // sky dome (shares skyColorFn with the water reflection)
  const skyGeo = new THREE.SphereGeometry(1800, 48, 28);
  const skyMat = new THREE.MeshBasicNodeMaterial({ side: THREE.BackSide, fog: false });
  skyMat.colorNode = skyColorFn(positionLocal);
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.frustumCulled = false;
  scene.add(sky);
  scene.userData.sky = sky;
  setProgress(0.4, 'Filling the falaj with water…');

  // water
  const water = new THREE.Mesh(buildWaterGeometry(), makeWaterMaterial());
  water.frustumCulled = false;
  scene.add(water);
  scene.userData.water = water;
  setProgress(0.55, 'Building the village…');

  // village + gates + gufa
  const { palmPositions, shopDist: sd } = buildVillage(scene);
  shopDist = sd;
  setProgress(0.75, 'Carving the 100 stone arches…');
  buildGateInstances(scene);
  gate = buildAnimatedGate(scene);
  boat = buildBoat();
  scene.add(boat);
  setProgress(0.85, 'Weaving palm fronds…');

  birds = buildBirds(scene);
  butterflies = buildButterflies(scene, palmPositions);
  hintBird = buildHintBird(scene);

  // collection-run gameplay objects + particle pools
  buildTokens(scene);
  burstPool = makeParticlePool(scene, 90, 0xe8a06a, 0xc76a58, 0.07);   // warm sparkles
  splashPool = makeParticlePool(scene, 90, 0xbfd4d8, 0x8fb0b8, 0.08);  // cold splash
  sprayPool = makeParticlePool(scene, 140, 0xf2f2ea, 0xd8e2da, 0.075); // bow spray
  buildMotes(scene);
  buildHaze(scene);

  // long palm shadows across the water
  const sunLight = scene.userData.sun;
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 260;
  sunLight.shadow.camera.left = -70;
  sunLight.shadow.camera.right = 70;
  sunLight.shadow.camera.top = 70;
  sunLight.shadow.camera.bottom = -70;
  sunLight.shadow.bias = -0.0015;
  scene.add(sunLight.target);
  water.receiveShadow = true;

  // post-processing: subtle bloom
  postProcessing = new THREE.PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  postProcessing.outputNode = sceneColor.add(bloom(sceneColor, 0.3, 0.22, 0.85));
  setProgress(0.95, 'Final touches…');

  positionGateDoor(0);
  applyTimeOfDay(state.tod);
  applyFlow(state.flow);
  window.addEventListener('resize', onResize);
}

function onResize() {
  if (!renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ---------------------------------------------------------------------------
// Time of day / flow application
// ---------------------------------------------------------------------------
function applyTimeOfDay(t) {
  const p = lerpPalette(t);
  uZenith.value.copy(p.zen);
  uHorizon.value.copy(p.hor);
  uSunColor.value.copy(p.sun);
  uCloudLit.value.copy(p.cloudLit);
  uCloudSh.value.copy(p.cloudSh);
  uWaterDeep.value.copy(p.waterDeep);
  uWaterShallow.value.copy(p.waterShallow);
  uSunGlow.value = p.sunI;
  uNight.value = p.night;
  const az = 0.6 + t * 2.2;
  const el = Math.max(0.04, p.sunEl);
  uSunDir.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el) * 0.4 + 0.3).normalize();
  if (scene) {
    scene.fog.color.copy(p.fog);
    const sun = scene.userData.sun, hemi = scene.userData.hemi;
    if (sun) {
      sun.color.copy(p.sun);
      sun.intensity = p.sunI * 1.75 + 0.15;
      sun.position.copy(uSunDir.value).multiplyScalar(120);
    }
    if (hemi) hemi.intensity = p.amb * 1.15;
  }
  $('tod-label').textContent = p.name;
}

function applyFlow(f) {
  state.flow = f;
  uFlowAmp.value = [0.35, 1.0, 2.0][f];
  uFlowSpeed.value = [0.5, 1.0, 1.9][f];
  AudioSys.setFlow(f);
}

// ---------------------------------------------------------------------------
// Gate slab animation: the carved stone slab grinds down into the earth,
// shaking loose dust, then the gate resets at the next arch.
// ---------------------------------------------------------------------------
function positionGateDoor(i) {
  const { p, yaw } = gateFrame(i);
  gate.group.position.set(p.x, 1.65, p.z);
  gate.group.rotation.y = yaw;
  gate.slab.position.y = 0;
  state.gateAnim = 0;
  state.gateOpening = false;
}

function updateGateDoor(dt) {
  if (!state.gateOpening) return;
  state.gateAnim = Math.min(1, state.gateAnim + dt * 0.55);
  const e = state.gateAnim * state.gateAnim;   // slow start, grinding momentum
  // slab sinks into the ground with a shaking grind
  const shake = Math.sin(state.gateAnim * 55.0) * 0.03 * (1 - state.gateAnim);
  gate.slab.position.y = -e * 3.9;
  gate.slab.position.x = shake;
  gate.slab.rotation.z = shake * 0.15;
  // dust bursts from the base while grinding
  if (state.gateAnim < 0.9 && !reducedMotion) {
    const gp = gate.group.position;
    for (let k = 0; k < 2; k++) spawnDust(gate, gp.x, -0.1, gp.z, 2.4);
  }
  if (state.gateAnim >= 1) {
    state.gateOpening = false;
    state.gateIndex++;
    if (state.gateIndex < NUM_LEVELS) {
      positionGateDoor(state.gateIndex);
      startSegment();
    }
    updateHUD();
  }
}

// ---------------------------------------------------------------------------
// CPU mirror of wave height (for gufa bobbing) — same 5 Gerstner waves
// ---------------------------------------------------------------------------
function waveHeightAt(x, z, tSec) {
  let y = 0;
  const fs = uFlowSpeed.value, fa = uFlowAmp.value;
  const t = tSec * fs;
  for (const w of WAVE_DATA) {
    const k = (Math.PI * 2) / w.len;
    const ph = (w.dir[0] * x + w.dir[1] * z) * k - t * w.speed * k;
    y += w.amp * Math.sin(ph);
  }
  return y * fa;
}

// ---------------------------------------------------------------------------
// Input: pointer-lock look, touch drag, keyboard, pause
// ---------------------------------------------------------------------------
const keys = new Set();
const touchSteer = { left: false, right: false };
function setPaused(on, showOverlay = true) {
  state.pauseOverlay = on && showOverlay;
  state.paused = on || document.hidden;
  $('pause-overlay').classList.toggle('visible', state.pauseOverlay);
  if (state.paused) Narrator.stop();
  if (on) writeSave();
}

function setupInput() {
  const canvas = $('game-canvas');
  canvas.addEventListener('click', () => {
    AudioSys.init();
    Narrator.init();
    if (!state.inQuiz && state.running && !state.paused) canvas.requestPointerLock?.();
  });
  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas && !state.inQuiz && !state.paused) {
      state.yaw -= e.movementX * 0.0022;
      state.pitch = clampf(state.pitch - e.movementY * 0.0022, -1.2, 1.2);
    }
  });
  // touch drag look
  let lastTouch = null;
  canvas.addEventListener('touchstart', (e) => {
    AudioSys.init();
    Narrator.init();
    lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (!lastTouch || state.inQuiz || state.paused) return;
    const t = e.touches[0];
    state.yaw -= (t.clientX - lastTouch.x) * 0.005;
    state.pitch = clampf(state.pitch - (t.clientY - lastTouch.y) * 0.005, -1.2, 1.2);
    lastTouch = { x: t.clientX, y: t.clientY };
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (state.running && !state.inQuiz) setPaused(!state.paused);
      return;
    }
    if (state.paused) return;
    if (state.inQuiz) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const i = parseInt(e.key, 10) - 1;
        if (i < quiz.els.choices.children.length) quiz.answer(i);
      } else if (e.key === 'Enter') {
        if (quiz.els.nextBtn.classList.contains('visible')) quiz.next();
        else if (quiz.els.result.style.display !== 'none') quiz.close();
      }
      return;
    }
    keys.add(e.code);
    if (e.code === 'KeyM') toggleSound();
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') { e.preventDefault(); triggerJump(); }
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));

  // touch steer + jump buttons (Subway-Surfers style controls for touch devices,
  // which otherwise only had look-drag and no way to steer at all)
  const bindHold = (el, onDown, onUp) => {
    if (!el) return;
    const down = (e) => { e.preventDefault(); el.classList.add('pressed'); onDown(); };
    const up = (e) => { el.classList.remove('pressed'); onUp(); };
    el.addEventListener('touchstart', down, { passive: false });
    el.addEventListener('touchend', up);
    el.addEventListener('touchcancel', up);
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseup', up);
    el.addEventListener('mouseleave', up);
  };
  bindHold($('touch-left'), () => { touchSteer.left = true; }, () => { touchSteer.left = false; });
  bindHold($('touch-right'), () => { touchSteer.right = true; }, () => { touchSteer.right = false; });
  const jumpBtn = $('touch-jump');
  if (jumpBtn) {
    const doJump = (e) => { e.preventDefault(); AudioSys.init(); Narrator.init(); triggerJump(); };
    jumpBtn.addEventListener('touchstart', doJump, { passive: false });
    jumpBtn.addEventListener('mousedown', doJump);
  }

  // quiz buttons
  quiz.els.nextBtn.addEventListener('click', () => quiz.next());
  quiz.els.continueBtn.addEventListener('click', () => quiz.close());
  $('quiz-skip-btn').addEventListener('click', () => quiz.skip());

  // pause button + overlay resume
  $('pause-btn').addEventListener('click', () => { AudioSys.init(); setPaused(true); });
  $('resume-btn').addEventListener('click', () => { AudioSys.click(); setPaused(false); });

  document.addEventListener('visibilitychange', () => {
    state.paused = document.hidden || state.pauseOverlay;
    if (document.hidden) { Narrator.stop(); writeSave(); }
  });
}

// ---------------------------------------------------------------------------
// UI panel wiring
// ---------------------------------------------------------------------------
function toggleSound() {
  AudioSys.init();
  const m = !state.muted;
  AudioSys.setMuted(m);
  $('sound-btn').textContent = m ? 'Off' : 'On';
  $('sound-btn').classList.toggle('active', !m);
}

function toggleNarrator() {
  Narrator.init();
  state.narrator = !state.narrator;
  if (!state.narrator) Narrator.stop();
  $('narrator-btn').textContent = state.narrator ? 'Narrator: On' : 'Narrator: Off';
  $('narrator-btn').classList.toggle('active', state.narrator);
  if (state.narrator) Narrator.speak('The narrator returns to your side, traveller.');
}

function setupPanel() {
  const panel = $('controls-panel');
  const btn = $('toggle-panel-btn');
  btn.classList.add('visible');
  $('pause-btn').classList.add('visible');
  const toggle = () => panel.classList.toggle('visible');
  btn.addEventListener('click', toggle);
  window.addEventListener('keydown', (e) => { if (e.code === 'KeyP' && !state.inQuiz && !state.paused) toggle(); });

  $('tod-slider').addEventListener('input', (e) => {
    state.tod = e.target.value / 100;
    applyTimeOfDay(state.tod);
  });
  $('flow-btns').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-flow]');
    if (!b) return;
    document.querySelectorAll('#flow-btns button').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    applyFlow(parseInt(b.dataset.flow, 10));
    AudioSys.click();
  });
  $('speed-slider').addEventListener('input', (e) => {
    state.speedMul = e.target.value / 100;
    $('speed-label').textContent = `${state.speedMul.toFixed(1)}x`;
  });
  $('sound-btn').addEventListener('click', toggleSound);
  $('narrator-btn').addEventListener('click', toggleNarrator);
  $('quality-btn').addEventListener('click', () => {
    state.highQuality = !state.highQuality;
    renderer.setPixelRatio(state.highQuality ? Math.min(window.devicePixelRatio || 1, 1.75) : 1.0);
    $('quality-btn').textContent = state.highQuality ? 'Quality: High' : 'Quality: Fast';
    toast(state.highQuality ? 'High quality rendering' : 'Fast rendering mode');
  });
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------
let lastT = 0, fpsFrames = 0, fpsTime = 0, chirpTimer = 3;
let currentTSec = 0;   // render-loop clock (same base as the TSL `time` node)
const lookTarget = { yaw: 0, pitch: 0 };

function update(dt, tSec) {
  currentTSec = tSec;
  // steering + rushing forward current
  let speedNorm = 0;
  if (!state.inQuiz && state.running && !state.finished) {
    let steer = 0;
    if (keys.has('KeyA') || keys.has('ArrowLeft') || touchSteer.left) steer -= 1;
    if (keys.has('KeyD') || keys.has('ArrowRight') || touchSteer.right) steer += 1;
    state.lateralVel += (steer * 6.0 - state.lateralVel) * Math.min(1, dt * 6);
    state.lateral += state.lateralVel * dt;
    state.scrapeCd = Math.max(0, state.scrapeCd - dt);
    // stone edge: scrape spark/foam burst + slowdown, never death
    const maxLat = CHANNEL_HALF_WIDTH - 0.55;
    if (Math.abs(state.lateral) > maxLat) {
      state.lateral += (Math.sign(state.lateral) * maxLat - state.lateral) * Math.min(1, dt * 8);
      if (state.scrapeCd <= 0) {
        state.scrapeCd = 0.45;
        AudioSys.scrape();
        for (let i = 0; i < 8; i++) {
          emit(splashPool, boat.position.x + Math.sign(state.lateral) * 0.9, 0.25, boat.position.z,
            rand(-1, 1), rand(1.5, 3.5), rand(-1, 1), rand(0.3, 0.6), rand(0.7, 1.3), 7);
        }
        state.speed *= 0.82;
      }
    }

    // acceleration ramp: the current builds after each gate, surges when the
    // topic is complete, in rapids, and under the khamaseen gust
    const flowBoost = [0.7, 1.0, 1.35][state.flow];
    const rapids = inRapids(state.dist);
    let target = BASE_SPEED * state.speedMul * levelSpeedMul(state.gateIndex + 1) * flowBoost;
    if (rapids) target *= 1.22;
    if (state.wind > 0.2) target *= 1 + state.wind * 0.3;
    if (state.surge) target *= 2.1;
    state.speed += (target - state.speed) * Math.min(1, dt * (state.surge ? 1.6 : 0.35));
    state.dist += state.speed * dt;
    speedNorm = clampf(state.speed / (BASE_SPEED * 1.6), 0, 1);

    // water shader responds to speed: faster flow + white-water streaks
    uFlowSpeed.value = [0.5, 1.0, 1.9][state.flow] * (0.8 + speedNorm * 0.9) * (rapids ? 1.35 : 1);
    uFlowAmp.value = [0.35, 1.0, 2.0][state.flow] * (rapids ? 1.3 : 1);
    uRush.value += ((rapids ? 1 : 0.35 + speedNorm * 0.45) - uRush.value) * Math.min(1, dt * 2);

    // drop / ramp airtime moments
    if (state.drop <= 0) {
      for (const dd of dropDists) {
        if (state.dist >= dd && state.dist - state.speed * dt < dd) {
          state.drop = 0.0001;
          AudioSys.whoosh();
          break;
        }
      }
    }
    if (state.drop > 0) {
      state.drop += dt;
      const f = state.drop / 1.35;
      if (f >= 1) {
        state.drop = 0; state.dropY = 0;
        // landing splash
        for (let i = 0; i < 16; i++) {
          emit(splashPool, boat.position.x + rand(-1, 1), 0.2, boat.position.z + rand(-1, 1),
            rand(-2, 2), rand(2, 5), rand(-2, 2), rand(0.4, 0.8), rand(1, 1.8), 8);
        }
        AudioSys.splash();
      } else {
        state.dropY = Math.sin(f * Math.PI) * 1.15;   // small airborne arc
      }
    }

    // bow spray: foam thrown off the gufa's prow, denser with speed
    if (!reducedMotion) {
      const n = Math.round(speedNorm * (rapids ? 8 : 4));
      const bowA = Math.atan2(camTmp.t.x, camTmp.t.z);
      for (let i = 0; i < n; i++) {
        const side = rng() < 0.5 ? -1 : 1;
        emit(sprayPool,
          boat.position.x + Math.sin(bowA) * 1.0 + Math.cos(bowA) * side * 0.7,
          0.1 + rand(0, 0.3),
          boat.position.z + Math.cos(bowA) * 1.0 - Math.sin(bowA) * side * 0.7,
          Math.cos(bowA) * side * rand(1, 3), rand(1.2, 3.2), -Math.sin(bowA) * side * rand(1, 3),
          rand(0.3, 0.7), rand(0.6, 1.4), 6);
      }
    }

    // tokens: spawn stream + collision
    updateTokens(dt);

    // gate trigger: arrive -> badge + optional bonus riddles
    if (state.gateIndex < NUM_LEVELS && state.dist >= gateDists[state.gateIndex] - 14 && !state.inQuiz && !state.gateOpening) {
      state.dist = gateDists[state.gateIndex] - 14;   // wait at the gate stone
      quiz.open(state.gateIndex + 1);
    }
  }

  // gufa + seated camera placement (low inside the woven boat)
  const d = clampf(state.dist, 0, curveLen - 0.01);
  pathAt(d, camTmp.p);
  tangentAt(d, camTmp.t);
  const pathYaw = Math.atan2(camTmp.t.x, camTmp.t.z);
  const sx = -camTmp.t.z, sz = camTmp.t.x;
  const bx = camTmp.p.x + sx * state.lateral;
  const bz = camTmp.p.z + sz * state.lateral;
  const bob = waveHeightAt(bx, bz, tSec);
  const dropY = state.dropY || 0;
  boat.position.set(bx, -0.12 + bob * 0.8 + dropY, bz);
  boat.rotation.set(
    Math.sin(tSec * 1.3) * 0.02 + state.lateralVel * 0.012 - dropY * 0.12,
    pathYaw + Math.PI + state.lateralVel * -0.04,
    state.lateralVel * 0.035 + Math.sin(tSec * 0.9) * 0.012
  );

  // curvature: roll into the curves like a rollercoaster
  const tanA = camTmp.t.clone();
  const tanB = tangentAt(Math.min(curveLen - 0.01, d + 14), new THREE.Vector3());
  const turnRate = Math.atan2(tanB.x, tanB.z) - Math.atan2(tanA.x, tanA.z);
  const wrapped = Math.atan2(Math.sin(turnRate), Math.cos(turnRate));
  const targetRoll = reducedMotion ? 0 : clampf(wrapped * 2.2, -0.22, 0.22) * (0.4 + speedNorm * 0.6)
    + state.lateralVel * 0.028;
  state.roll += (targetRoll - state.roll) * Math.min(1, dt * 4);

  // damped look
  const damp = Math.min(1, dt * 9);
  lookTarget.yaw += (state.yaw - lookTarget.yaw) * damp;
  lookTarget.pitch += (state.pitch - lookTarget.pitch) * damp;
  const driftYaw = reducedMotion ? 0 : Math.sin(tSec * 0.11) * 0.03;
  const driftPitch = reducedMotion ? 0 : Math.sin(tSec * 0.07 + 2) * 0.015;
  // micro-shake scaled with speed (more violent in rapids)
  const shakeAmp = reducedMotion ? 0 : 0.004 + speedNorm * 0.016 * (inRapids(d) ? 1.7 : 1);
  const shX = (Math.sin(tSec * 37.0) + Math.sin(tSec * 23.7)) * shakeAmp;
  const shY = (Math.sin(tSec * 41.3) + Math.sin(tSec * 29.1)) * shakeAmp;

  // seated low inside the gufa: woven rim/bow bobs at the bottom edge of view
  camera.position.set(bx + shX * 0.4, 0.92 + bob * 0.55 + dropY * 0.9 + shY * 0.4, bz);
  camera.rotation.set(lookTarget.pitch + driftPitch - 0.06 + shY, pathYaw + Math.PI + lookTarget.yaw + driftYaw + shX, state.roll, 'YXZ');

  // sun shadow frustum follows the boat so palm shadows stretch over the water
  const sunL = scene.userData.sun;
  if (sunL) {
    sunL.position.copy(uSunDir.value).multiplyScalar(140).add(boat.position);
    sunL.target.position.copy(boat.position);
    sunL.target.updateMatrixWorld();
  }

  // sky follows camera
  if (scene.userData.sky) scene.userData.sky.position.copy(camera.position);

  // particles + wind + motes
  updatePool(burstPool, dt);
  updatePool(splashPool, dt);
  updatePool(sprayPool, dt);
  updateMotes(dt, camera.position);
  updateWind(dt, camera.position);

  // gate slab animation + dust
  updateGateDoor(dt);
  updateDust(gate, dt);

  // hint bird flyby
  updateHintBird(hintBird, dt, tSec);

  // birds
  for (const b of birds) {
    const u = b.userData;
    const a = tSec * u.speed + u.phase;
    const center = pathAt(u.centerD, camTmp.p);
    b.position.set(center.x + Math.cos(a) * u.radius, u.height + Math.sin(tSec * 0.5 + u.phase) * 2, center.z + Math.sin(a) * u.radius);
    b.rotation.y = -a + (u.speed > 0 ? Math.PI : 0);
    const flap = Math.sin(tSec * u.flap + u.phase) * 0.7;
    u.gl.rotation.z = flap;
    u.gr.rotation.z = -flap;
  }
  // butterflies
  for (const b of butterflies) {
    const u = b.userData;
    const a = tSec * u.speed + u.phase;
    b.position.set(
      u.base.x + Math.sin(a * 0.9) * 1.2,
      u.base.y + Math.sin(a * 1.7) * 0.4,
      u.base.z + Math.cos(a * 0.7) * 1.2
    );
    b.rotation.y = a * 0.9;
    const flap = Math.sin(tSec * 14 + u.phase) * 1.0;
    u.gl.rotation.y = flap;
    u.gr.rotation.y = -flap;
  }

  // ambience layers: drums drive with speed/streak; oud in calm moments only
  if (state.running) {
    if (state.inQuiz || state.finished) AudioSys.updateOud(dt);
    else AudioSys.updateDrums(dt, speedNorm, state.streak);
    AudioSys.updateVillage(dt);
    const prox = clampf(1 - Math.abs(state.dist - shopDist) / 90, 0, 1);
    AudioSys.updateMarket(dt, prox * prox);
  }

  // random birdsong
  chirpTimer -= dt;
  if (chirpTimer <= 0) {
    chirpTimer = rand(3, 9);
    if (!reducedMotion) AudioSys.chirp();
  }

  // journey finished
  if (state.finished && !state.celebrated) {
    state.celebrated = true;
    toast(`🏆 Journey complete! Final score: ${state.score} · Best streak: ${state.bestStreak}`, 12000);
    Narrator.speak('You have passed every gate, traveller. The whole village sings your name beneath the palm trees.');
    AudioSys.fanfare();
    clearSave();
  }

  updateHUD();
}

function loop(tMs) {
  const tSec = tMs / 1000;
  let dt = Math.min(0.05, tSec - lastT || 0.016);
  lastT = tSec;

  // fps counter
  fpsFrames++; fpsTime += dt;
  if (fpsTime >= 0.5) {
    $('hud-fps').textContent = `FPS: ${Math.round(fpsFrames / fpsTime)}`;
    fpsFrames = 0; fpsTime = 0;
  }

  if (!state.paused) {
    update(dt, tSec);
    postProcessing.render();
  }
}

// ---------------------------------------------------------------------------
// Save / resume prompt
// ---------------------------------------------------------------------------
function offerResume(save) {
  return new Promise((resolve) => {
    $('resume-text').textContent =
      `Continue your journey from Level ${save.level}? ` +
      `Your score of ${save.score} and ${Object.keys(save.best || {}).length} gate badge(s) are kept.`;
    $('resume-overlay').classList.add('visible');
    $('resume-continue-btn').addEventListener('click', () => {
      $('resume-overlay').classList.remove('visible');
      resolve(true);
    }, { once: true });
    $('resume-new-btn').addEventListener('click', () => {
      $('resume-overlay').classList.remove('visible');
      resolve(false);
    }, { once: true });
  });
}

async function applyResumeChoice(save) {
  const cont = await offerResume(save);
  if (cont) {
    state.save = save;
    state.level = clampf(save.level, 1, NUM_LEVELS);
    state.score = save.score || 0;
    state.gateIndex = state.level - 1;
    state.dist = Math.max(0, gateDists[state.gateIndex] - 45);
    positionGateDoor(state.gateIndex);
    toast(`Welcome back — resuming at gate ${state.level}.`);
  } else {
    clearSave();
    state.level = 1; state.score = 0; state.gateIndex = 0; state.dist = 0;
    positionGateDoor(0);
  }
  updateHUD();
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
(async function boot() {
  setProgress(0.05, 'Checking WebGPU support…');
  const ok = await checkWebGPU();
  if (!ok) { showError(); return; }
  setProgress(0.12, 'WebGPU found — starting renderer…');
  try {
    Narrator.init();
    setupInput();
    await initScene();
  } catch (err) {
    console.error(err);
    showError(`Initialization failed: ${String(err && err.message || err)}<br><br>Please update your browser and GPU drivers and reload.`);
    return;
  }
  setupPanel();
  updateHUD();
  setProgress(1, 'Ready!');
  renderer.setAnimationLoop(loop);
  setTimeout(() => {
    $('loading-screen').classList.add('hidden');
    $('hud').classList.add('visible');
  }, 400);

  // resume prompt if a journey is in progress
  const save = loadSave();
  if (save && save.level > 1) {
    await applyResumeChoice(save);
  }
  startSegment();
  state.running = true;
  toast(`Hold tight! The falaj is rushing — collect the warm orbs that belong to “${state.topic}”, dodge the cold ones.`, 6000);

  // headless validation hooks (read-only-ish; used by automated checks)
  window.__game = {
    state, tokenPool, AudioSys, quiz, gateDists, curveLen, scene, camera, renderer, boat, pathAt,
    TOKENS_TARGET, BASE_SPEED,
    forceWind: triggerWind,
    triggerJump,
    collectFirst: (wantCorrect) => {
      const t = tokenPool.find((x) => x.active && x.correct === wantCorrect);
      if (t) collectToken(t);
      return !!t;
    },
    uniforms: { uRush, uWind, uFlowSpeed },
  };
})();
