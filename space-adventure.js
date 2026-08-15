import * as THREE from 'three';
import { RAY_VERT, RAY_FRAG, COMPOSITE_VERT, COMPOSITE_FRAG } from './black-hole-shaders.js';
import { MANDELBROT_VERT, MANDELBROT_FRAG } from './mandelbrot-shaders.js';
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
/* real star classification colors — picked fresh each time the sun
   milestone spawns, so it isn't always the same yellow ball */
const STAR_COLORS = [
  { core: 0xfff6e8, glow: 0xfff2d0, name: 'white' },
  { core: 0xffe066, glow: 0xffcf6b, name: 'yellow' },
  { core: 0xff9d4d, glow: 0xff8a3d, name: 'orange' },
];
function buildSun() {
  const g = new THREE.Group();
  const sun = new THREE.Mesh(new THREE.SphereGeometry(20, 24, 18), new THREE.MeshBasicMaterial({ color: 0xffcf6b }));
  g.add(sun);
  const corona1 = makeGlowSprite(0xffb347, 70);
  g.add(corona1);
  const corona2 = makeGlowSprite(0xffb347, 110);
  corona2.material.opacity = 0.35;
  g.add(corona2);
  const corona3 = makeGlowSprite(0xffb347, 150);
  corona3.material.opacity = 0.16;
  g.add(corona3);
  g.userData.sunMesh = sun;
  g.userData.coronas = [corona1, corona2, corona3];
  g.userData.flareSpin = 0;
  return g;
}
const SUN_DANGER_COLOR = new THREE.Color(0xff2b1a);
function paintSun(g) {
  const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  g.userData.coreBase = new THREE.Color(c.core);
  g.userData.glowBase = new THREE.Color(c.glow);
  g.userData.sunMesh.material.color.copy(g.userData.coreBase);
  g.userData.coronas.forEach((sp) => sp.material.color.copy(g.userData.glowBase));
}
/* proximity to the sun eases the whole game into slow motion (dt itself
   is scaled — real-time effects like the exhaust flame flicker, which
   read clock.elapsedTime directly, keep running at full speed through
   it) and flying into the star's core blends its glow toward red as a
   danger cue, on top of the usual HUD warning. */
function updateSunProximity(dt) {
  const sunEntry = milestonePool.find((m) => m.kind === 'sun' && m.active);
  let sunDist = Infinity;
  if (sunEntry) sunDist = ship.position.distanceTo(sunEntry.g.position);
  const targetScale = sunDist < 32 ? THREE.MathUtils.clamp(sunDist / 32, 0.3, 1) : 1;
  gs.timeScale = THREE.MathUtils.lerp(gs.timeScale ?? 1, targetScale, dt * 2.5);

  const coreDanger = sunDist < 15 ? THREE.MathUtils.clamp(1 - sunDist / 15, 0, 1) : 0;
  if (sunEntry) {
    sunEntry.g.userData.sunMesh.material.color.copy(sunEntry.g.userData.coreBase).lerp(SUN_DANGER_COLOR, coreDanger);
    sunEntry.g.userData.coronas.forEach((sp) => sp.material.color.copy(sunEntry.g.userData.glowBase).lerp(SUN_DANGER_COLOR, coreDanger));
  }
  $('#hud-sun').style.display = coreDanger > 0.35 ? 'inline-block' : 'none';
  return gs.timeScale;
}

/* a drifting cloud of glowing colored threads with twinkling stars
   woven through it — same construction as the reference star-cloud
   (CatmullRomCurve3 threads + a custom twinkle shader for the points).
   Sized and positioned so the ship flies THROUGH it (near the flight
   corridor, like the crystal network / star garden zones) instead of
   past it at a distance — the threads should fill the whole screen,
   not sit as a small distant ball. */
function buildNebulaCloud() {
  const g = new THREE.Group();
  const threadCount = 70;
  const starCount = 520;
  const cloudRadius = 26;

  const threadPositions = [];
  const threadColors = [];
  for (let i = 0; i < threadCount; i++) {
    const points = [];
    const numPoints = 14;
    const startAngle = Math.random() * Math.PI * 2;
    const startRadius = Math.random() * cloudRadius * 0.5;
    const yOffset = (Math.random() - 0.5) * cloudRadius * 1.5;
    for (let j = 0; j < numPoints; j++) {
      const t = j / numPoints;
      const angle = startAngle + t * Math.PI * 2 * (0.5 + Math.random() * 0.5);
      const radius = startRadius + Math.sin(t * Math.PI) * cloudRadius * (0.3 + Math.random() * 0.4);
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3.5;
      const y = yOffset + Math.sin(t * Math.PI * 2) * 3.5 + (Math.random() - 0.5) * 2.2;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3.5;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(28);
    const hue = 0.55 + Math.random() * 0.3;
    const color = new THREE.Color().setHSL(hue, 0.75, 0.6);
    for (let k = 0; k < curvePoints.length - 1; k++) {
      threadPositions.push(curvePoints[k].x, curvePoints[k].y, curvePoints[k].z, curvePoints[k + 1].x, curvePoints[k + 1].y, curvePoints[k + 1].z);
      for (let c = 0; c < 2; c++) threadColors.push(color.r, color.g, color.b);
    }
  }
  const threadGeo = new THREE.BufferGeometry();
  threadGeo.setAttribute('position', new THREE.Float32BufferAttribute(threadPositions, 3));
  threadGeo.setAttribute('color', new THREE.Float32BufferAttribute(threadColors, 3));
  const threadMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
  const threads = new THREE.LineSegments(threadGeo, threadMat);
  g.add(threads);

  const starPositions = [];
  const starColors = [];
  const starOpacities = [];
  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = Math.random() * cloudRadius * 0.8;
    starPositions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
    const hue = 0.55 + Math.random() * 0.3;
    const sColor = new THREE.Color().setHSL(hue, 0.4 + Math.random() * 0.5, 0.75 + Math.random() * 0.25);
    starColors.push(sColor.r, sColor.g, sColor.b);
    starOpacities.push(0.4 + Math.random() * 0.6);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  starGeo.setAttribute('opacity', new THREE.Float32BufferAttribute(starOpacities, 1));
  const starMat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      attribute float opacity;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vOpacity;
      uniform float time;
      void main() {
        vColor = color;
        float sparkle = 0.5 + 0.5 * sin(time * 2.0 + opacity * 100.0);
        vOpacity = opacity * (0.3 + 0.7 * sparkle);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (3.0 + opacity * 4.0) * (60.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, vOpacity * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const starPts = new THREE.Points(starGeo, starMat);
  g.add(starPts);

  g.userData.nebulaMat = starMat;
  g.userData.nebulaTime = 0;
  return g;
}

/* "Erid" — a small dense volcanic-ocean world lit by a nearby red dwarf
   companion star, ported from the reference's real simplex-noise
   fragment shaders (turbulent glowing surface, layered atmosphere,
   cloud deck, star corona + lens flare) rather than swapped for flat
   materials. Joins the milestone flyby pool alongside earth/moon/sun. */
const ERID_NOISE_GLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * snoise(p); p *= 2.02;
    f += 0.2500 * snoise(p); p *= 2.03;
    f += 0.1250 * snoise(p); p *= 2.01;
    f += 0.0625 * snoise(p);
    return f;
  }
`;
function buildEridFlareTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,220,1.0)');
  grad.addColorStop(0.1, 'rgba(255,200,100,0.8)');
  grad.addColorStop(0.3, 'rgba(255,100,30,0.4)');
  grad.addColorStop(0.6, 'rgba(200,50,10,0.15)');
  grad.addColorStop(1, 'rgba(100,20,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
function buildErid() {
  const g = new THREE.Group();
  const STAR_LOCAL = new THREE.Vector3(34, 10, -22);

  const planetVert = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const planetFrag = `
    uniform float uTime;
    uniform vec3 uStarPos;
    varying vec3 vNormal;
    varying vec3 vPosition;
    ${ERID_NOISE_GLSL}
    void main() {
      vec3 pos = vPosition * 0.6;
      float t = uTime * 0.05;
      float n1 = fbm(pos + vec3(t, 0.0, 0.0));
      float n2 = fbm(pos * 1.5 + vec3(0.0, t * 1.3, 0.0));
      float n3 = snoise(pos * 3.0 + vec3(t * 0.7, 0.0, 0.0));
      float fire = smoothstep(0.0, 0.6, n1 * 0.7 + n2 * 0.3);
      float detail = n3 * 0.5 + 0.5;
      vec3 darkOcean = vec3(0.02, 0.01, 0.015);
      vec3 fireColor = vec3(1.0, 0.35, 0.05);
      vec3 hotFire = vec3(1.0, 0.7, 0.2);
      vec3 surfaceColor = mix(darkOcean, fireColor, fire * 0.8);
      surfaceColor = mix(surfaceColor, hotFire, fire * detail * 0.4);
      vec3 lightDir = normalize(uStarPos - vPosition);
      float NdotL = max(dot(vNormal, lightDir), 0.0);
      float rim = pow(1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0), 3.0);
      vec3 finalColor = surfaceColor * (0.15 + NdotL * 0.85);
      finalColor += fireColor * fire * 0.3 * (0.5 + 0.5 * sin(uTime + n1 * 6.0));
      finalColor += vec3(1.0, 0.5, 0.2) * rim * 0.4 * NdotL;
      finalColor += darkOcean * (1.0 - NdotL) * 0.5;
      finalColor += vec3(0.15, 0.03, 0.0) * fire * (1.0 - NdotL) * 0.5;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
  const planetMat = new THREE.ShaderMaterial({
    vertexShader: planetVert, fragmentShader: planetFrag,
    uniforms: { uTime: { value: 0 }, uStarPos: { value: STAR_LOCAL.clone() } },
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(10, 48, 36), planetMat);
  g.add(planet);

  const atmoVert = `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const atmoFrag = `
    uniform vec3 uStarPos;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);
      vec3 lightDir = normalize(uStarPos - vWorldPos);
      float facing = max(dot(vNormal, lightDir), 0.0);
      vec3 atmoColor = mix(vec3(0.6, 0.15, 0.05), vec3(1.0, 0.4, 0.1), facing);
      float alpha = fresnel * (0.5 + facing * 0.5);
      gl_FragColor = vec4(atmoColor, alpha);
    }
  `;
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(11.3, 40, 40), new THREE.ShaderMaterial({
    vertexShader: atmoVert, fragmentShader: atmoFrag,
    uniforms: { uStarPos: { value: STAR_LOCAL.clone() } },
    blending: THREE.AdditiveBlending, side: THREE.FrontSide, transparent: true, depthWrite: false,
  }));
  g.add(atmosphere);

  const outer = new THREE.Mesh(new THREE.SphereGeometry(13, 40, 40), new THREE.ShaderMaterial({
    vertexShader: atmoVert,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 4.0);
        gl_FragColor = vec4(vec3(0.8, 0.2, 0.05), fresnel * 0.4);
      }
    `,
    uniforms: { uStarPos: { value: STAR_LOCAL.clone() } },
    blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
  }));
  g.add(outer);

  const cloudFrag = `
    uniform float uTime;
    uniform vec3 uStarPos;
    varying vec3 vNormal;
    varying vec3 vPosition;
    ${ERID_NOISE_GLSL}
    void main() {
      vec3 pos = vPosition * 0.5;
      float t = uTime * 0.08;
      float n = fbm(pos + vec3(t * 0.5, t * 0.3, 0.0));
      float n2 = snoise(pos * 2.0 + vec3(-t * 0.4, 0.0, t * 0.2));
      float cloud = smoothstep(0.1, 0.6, n * 0.7 + n2 * 0.3);
      vec3 lightDir = normalize(uStarPos - vPosition);
      float NdotL = max(dot(vNormal, lightDir), 0.0);
      vec3 cloudColor = mix(vec3(0.15, 0.05, 0.02), vec3(0.9, 0.5, 0.25), NdotL);
      gl_FragColor = vec4(cloudColor, cloud * 0.55);
    }
  `;
  const cloudMat = new THREE.ShaderMaterial({
    vertexShader: planetVert, fragmentShader: cloudFrag,
    uniforms: { uTime: { value: 0 }, uStarPos: { value: STAR_LOCAL.clone() } },
    transparent: true, depthWrite: false, side: THREE.FrontSide,
  });
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(10.5, 40, 40), cloudMat);
  g.add(clouds);

  const starFrag = `
    uniform float uTime;
    varying vec2 vUv;
    ${ERID_NOISE_GLSL}
    void main() {
      float t = uTime * 0.3;
      vec3 p = vec3(vUv * 4.0, t);
      float n = fbm(p) * 0.5 + 0.5;
      float n2 = snoise(p * 2.0 + vec3(t * 0.5));
      vec3 hot = vec3(1.0, 0.95, 0.7);
      vec3 mid = vec3(1.0, 0.5, 0.15);
      vec3 cool = vec3(0.8, 0.15, 0.0);
      vec3 color = mix(cool, mid, n);
      color = mix(color, hot, pow(n, 2.0) * 0.6);
      color += vec3(1.0, 0.8, 0.4) * (n2 * 0.3 + 0.3);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  const starMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: starFrag,
    uniforms: { uTime: { value: 0 } },
  });
  const starMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 28, 28), starMat);
  starMesh.position.copy(STAR_LOCAL);
  g.add(starMesh);

  [[7.3, 0.35], [11.4, 0.15], [18.2, 0.06]].forEach(([r, op]) => {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), new THREE.MeshBasicMaterial({
      color: 0xff3300, transparent: true, opacity: op, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    }));
    glow.position.copy(STAR_LOCAL);
    g.add(glow);
  });

  const starLight = new THREE.PointLight(0xff5522, 1.6, 160, 1.5);
  starLight.position.copy(STAR_LOCAL);
  g.add(starLight);

  const flare = new THREE.Sprite(new THREE.SpriteMaterial({
    map: buildEridFlareTexture(), blending: THREE.AdditiveBlending, transparent: true, opacity: 0.9, depthWrite: false,
  }));
  flare.scale.setScalar(30);
  flare.position.copy(STAR_LOCAL);
  g.add(flare);

  g.userData.spin = planet;
  g.userData.cloudSpin = clouds;
  g.userData.starSpin = starMesh;
  g.userData.shaderMats = [planetMat, cloudMat, starMat];
  g.userData.shaderTime = 0;
  g.userData.flareSprite = flare;
  g.userData.flareBaseScale = 30;
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
const SG_SPAWN_Z = -240;
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

/* ---------------- INTERFERENCE ZONE — junk cleanup ----------------
   The user's own Mandelbrot fractal reference (mandelbrot-shaders.js,
   same escape-time math and 5 color modes, ported verbatim) is the
   zone's backdrop — not a decorative fractal to look at, but the
   ship's garbled signal. Junk debris litters the zone; clearing it
   calms the fractal back down (zoom eases out, colors settle) exactly
   like the user's own framing: "clean up the junk so the frequencies
   come back." */
let staticScene, staticCam, staticUniforms;
let ST_FX_OK = true;
function buildStaticFX() {
  try {
    staticScene = new THREE.Scene();
    staticCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    staticUniforms = {
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_center: { value: new THREE.Vector2(-0.745, 0.1) },
      u_zoom: { value: 1 },
      u_maxIterations: { value: 140 },
      u_colorMode: { value: 0 },
      u_opacity: { value: 0.9 },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: MANDELBROT_VERT, fragmentShader: MANDELBROT_FRAG, uniforms: staticUniforms, depthTest: false, depthWrite: false, transparent: true });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('a_position', new THREE.BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    staticScene.add(new THREE.Mesh(geo, mat));
  } catch (e) {
    ST_FX_OK = false;
  }
}
function resizeStaticFX() {
  if (!ST_FX_OK || !renderer) return;
  const size = new THREE.Vector2();
  renderer.getDrawingBufferSize(size);
  staticUniforms.u_resolution.value.copy(size);
}
function renderStaticFX(dt) {
  if (!ST_FX_OK) return false;
  try {
    const junkFrac = staticZone.userData.junkTotal > 0 ? staticZone.userData.junkRemaining / staticZone.userData.junkTotal : 0;
    staticUniforms.u_center.value.x += Math.sin(staticZone.userData.time * 0.15) * dt * 0.01;
    staticUniforms.u_center.value.y += Math.cos(staticZone.userData.time * 0.11) * dt * 0.01;
    staticZone.userData.zoomTarget = 1 + junkFrac * 5.5;
    staticUniforms.u_zoom.value = THREE.MathUtils.lerp(staticUniforms.u_zoom.value, staticZone.userData.zoomTarget, dt * 0.8);
    if (junkFrac > 0.15 && Math.random() < dt * 1.5) staticUniforms.u_colorMode.value = Math.floor(Math.random() * 5);
    else if (junkFrac <= 0.15) staticUniforms.u_colorMode.value = 4;

    const prevTM = renderer.toneMapping, prevCS = renderer.outputColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.render(staticScene, staticCam);
    renderer.toneMapping = prevTM;
    renderer.outputColorSpace = prevCS;
    return true;
  } catch (e) {
    ST_FX_OK = false;
    return false;
  }
}

function buildJunkPiece() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x5a5650, roughness: 0.75, metalness: 0.55, flatShading: true });
  const rustMat = new THREE.MeshStandardMaterial({ color: 0x8a4a2c, roughness: 0.85, metalness: 0.2, flatShading: true });
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.6), mat);
  panel.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  g.add(panel);
  const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), rustMat);
  strut.rotation.z = Math.PI / 2.3;
  strut.position.set(0.2, 0.1, -0.1);
  g.add(strut);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), rustMat);
  dish.position.set(-0.25, -0.15, 0.2);
  dish.rotation.x = Math.random() * Math.PI;
  g.add(dish);
  g.userData.spin = new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4);
  return g;
}
function buildStaticZone() {
  const g = new THREE.Group();
  g.visible = false;
  const junk = [];
  for (let i = 0; i < 7; i++) {
    const piece = buildJunkPiece();
    g.add(piece);
    junk.push({ group: piece, alive: true });
  }
  g.userData.junk = junk;
  g.userData.junkTotal = junk.length;
  g.userData.junkRemaining = junk.length;
  g.userData.time = 0;
  g.userData.zoomTarget = 1;
  return g;
}
let staticZone = null;
const ST_SPAWN_Z = -270;
function spawnStaticZone() {
  if (!staticZone) return;
  staticZone.visible = true;
  staticZone.position.set((Math.random() - 0.5) * BOUND_X * 1.2, (Math.random() - 0.5) * BOUND_Y * 0.7, ST_SPAWN_Z);
  staticZone.userData.time = 0;
  staticUniforms.u_zoom.value = 1;
  staticZone.userData.junk.forEach((j, i) => {
    j.alive = true;
    j.group.visible = true;
    const a = (i / staticZone.userData.junk.length) * Math.PI * 2;
    const r = 1.4 + Math.random() * 2.4;
    j.group.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.6, (Math.random() - 0.5) * 2.2);
  });
  staticZone.userData.junkRemaining = staticZone.userData.junk.length;
  $('#staticJunkCount').textContent = staticZone.userData.junkRemaining;
  $('#hud-static').style.display = 'inline-block';
}
function updateStaticZone(dt, moveZ) {
  const g = staticZone;
  if (!g || !g.visible) return;
  g.position.z += moveZ;
  g.userData.time += dt;

  g.userData.junk.forEach((j) => {
    if (!j.alive) return;
    const sp = j.group;
    sp.rotation.x += sp.userData.spin.x * dt;
    sp.rotation.y += sp.userData.spin.y * dt;
    sp.rotation.z += sp.userData.spin.z * dt;
    const worldPos = new THREE.Vector3();
    sp.getWorldPosition(worldPos);
    if (worldPos.distanceTo(ship.position) < 1.5) {
      j.alive = false;
      sp.visible = false;
      g.userData.junkRemaining--;
      $('#staticJunkCount').textContent = g.userData.junkRemaining;
      spawnBurst(worldPos, 0xffd166);
      playTone(320, 0.15, 'triangle');
      gs.score += 30;
      if (g.userData.junkRemaining <= 0) {
        playTone(660, 0.35, 'sine');
        setTimeout(() => { if (g.visible) { g.visible = false; $('#hud-static').style.display = 'none'; } }, 900);
      }
    }
  });

  if (g.position.z > 40) { g.visible = false; $('#hud-static').style.display = 'none'; }
}

/* ---------------- KILLER CUBES ----------------
   Tumbling cubes, one glowing red face and one glowing green face
   placed at random positions in the six-face material array. Tap the
   cube the instant its RED face is turned toward you; tapping while
   green faces you costs points instead. Spin isn't constant — every
   cube drifts between a slow tumble and sudden fast bursts, so the
   red face doesn't arrive on a predictable beat. */
const CUBE_NEUTRAL = new THREE.MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.55, metalness: 0.6, flatShading: true });
function buildCubeFaceMats() {
  const redIdx = Math.floor(Math.random() * 6);
  let greenIdx = Math.floor(Math.random() * 6);
  while (greenIdx === redIdx) greenIdx = Math.floor(Math.random() * 6);
  const mats = [];
  for (let i = 0; i < 6; i++) {
    if (i === redIdx) mats.push(new THREE.MeshStandardMaterial({ color: 0xff2b3d, emissive: 0xaa0010, emissiveIntensity: 0.8, roughness: 0.4, flatShading: true }));
    else if (i === greenIdx) mats.push(new THREE.MeshStandardMaterial({ color: 0x2bff6b, emissive: 0x0aaa30, emissiveIntensity: 0.8, roughness: 0.4, flatShading: true }));
    else mats.push(CUBE_NEUTRAL);
  }
  return { mats, redIdx, greenIdx };
}
function buildCubePool() {
  const items = [];
  for (let i = 0; i < 6; i++) {
    const { mats, redIdx, greenIdx } = buildCubeFaceMats();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), mats);
    mesh.visible = false;
    scene.add(mesh);
    items.push({
      mesh, redIdx, greenIdx, active: false,
      spin: new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4),
      burstT: 1.5 + Math.random() * 2, burstUntil: 0,
    });
  }
  return items;
}
function spawnCube() {
  const c = cubePool.find((x) => !x.active);
  if (!c) return;
  c.active = true;
  c.mesh.visible = true;
  c.mesh.position.set((Math.random() - 0.5) * BOUND_X * 2, (Math.random() - 0.5) * BOUND_Y * 2, -140 - Math.random() * 40);
  c.burstT = 1.2 + Math.random() * 2;
  c.burstUntil = 0;
}
function hitCube(cube, hitIndex) {
  cube.active = false;
  cube.mesh.visible = false;
  if (hitIndex === cube.redIdx) {
    gs.score += 45;
    spawnBurst(cube.mesh.position, 0xff2b3d);
    playTone(520, 0.18, 'square');
  } else if (hitIndex === cube.greenIdx) {
    gs.score = Math.max(0, gs.score - 25);
    spawnBurst(cube.mesh.position, 0x2bff6b);
    playTone(140, 0.22, 'sawtooth');
  } else {
    spawnBurst(cube.mesh.position, 0x8899aa);
    playTone(300, 0.1, 'sine');
  }
}

/* ---------------- CRYSTAL NETWORK ----------------
   A precision-flying hazard: a cluster of glowing crystal nodes linked
   by delicate organic branches — the same "silk fiber" construction
   technique as the user's neural-network reference files (nodes with a
   glow, CatmullRomCurve3 tube branches between them), just recolored
   icy/crystalline instead of a tech-diagram palette. The ship has to
   thread through the gaps: touch a branch and it shatters (and hurts),
   clearing the whole lattice untouched pays out a precision bonus. */
const CRYSTAL_COLORS = [0x8fe8ff, 0xb98fff, 0xff8fd6, 0x9fffcf];
function buildCrystalBranch(start, end, color) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  mid.x += (Math.random() - 0.5) * 1.2;
  mid.y += (Math.random() - 0.5) * 1.2;
  mid.z += (Math.random() - 0.5) * 0.8;
  const curve = new THREE.CatmullRomCurve3([start, mid, end]);
  const geo = new THREE.TubeGeometry(curve, 16, 0.05, 6, false);
  const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9, roughness: 0.3, metalness: 0.1, transparent: true, opacity: 0.85 });
  const mesh = new THREE.Mesh(geo, mat);
  const samples = [];
  for (let i = 0; i <= 6; i++) samples.push(curve.getPoint(i / 6));
  return { mesh, curve, samples, alive: true };
}
function buildCrystalNetwork() {
  const g = new THREE.Group();
  g.visible = false;
  const nodeCount = 7;
  const nodePositions = [];
  for (let i = 0; i < nodeCount; i++) {
    nodePositions.push(new THREE.Vector3((Math.random() - 0.5) * 6.5, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3.5));
  }
  const nodeColor = 0xd8f6ff;
  const nodeMat = new THREE.MeshStandardMaterial({ color: nodeColor, emissive: nodeColor, emissiveIntensity: 1.1, roughness: 0.25 });
  nodePositions.forEach((p) => {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), nodeMat);
    node.position.copy(p);
    g.add(node);
    const glow = makeGlowSprite(0xbfeeff, 1.4);
    glow.position.copy(p);
    g.add(glow);
  });

  const branches = [];
  for (let i = 0; i < nodePositions.length; i++) {
    const linksFrom = 1 + Math.floor(Math.random() * 2);
    for (let k = 0; k < linksFrom; k++) {
      const j = (i + 1 + Math.floor(Math.random() * (nodePositions.length - 1))) % nodePositions.length;
      if (j === i) continue;
      const color = CRYSTAL_COLORS[Math.floor(Math.random() * CRYSTAL_COLORS.length)];
      const b = buildCrystalBranch(nodePositions[i], nodePositions[j], color);
      g.add(b.mesh);
      branches.push(b);
    }
  }
  g.userData.branches = branches;
  g.userData.brokenCount = 0;
  g.userData.time = 0;
  return g;
}
let crystalNetwork = null;
const CN_SPAWN_Z = -300;
function spawnCrystalNetwork() {
  if (!crystalNetwork) return;
  crystalNetwork.visible = true;
  crystalNetwork.position.set((Math.random() - 0.5) * BOUND_X * 0.9, (Math.random() - 0.5) * BOUND_Y * 0.6, CN_SPAWN_Z);
  crystalNetwork.userData.time = 0;
  crystalNetwork.userData.brokenCount = 0;
  crystalNetwork.userData.branches.forEach((b) => {
    b.alive = true;
    b.mesh.visible = true;
    b.mesh.material.opacity = 0.85;
    b.mesh.scale.setScalar(1);
  });
}
function updateCrystalNetwork(dt, moveZ) {
  const g = crystalNetwork;
  if (!g || !g.visible) return;
  g.position.z += moveZ;
  g.userData.time += dt;

  const worldP = new THREE.Vector3();
  g.userData.branches.forEach((b) => {
    if (!b.alive) return;
    let hit = false;
    for (const s of b.samples) {
      worldP.copy(s).add(g.position);
      if (worldP.distanceTo(ship.position) < 0.65) { hit = true; break; }
    }
    if (hit) {
      b.alive = false;
      g.userData.brokenCount++;
      spawnBurst(worldP, b.mesh.material.color.getHex());
      playTone(220, 0.18, 'triangle');
      if (gs.invuln <= 0) {
        gs.hull = Math.max(0, gs.hull - 10);
        gs.invuln = 0.5;
      }
      let shrink = 1;
      const shatterId = setInterval(() => {
        shrink -= 0.15;
        if (shrink <= 0) { b.mesh.visible = false; clearInterval(shatterId); return; }
        b.mesh.scale.setScalar(Math.max(0.01, shrink));
        b.mesh.material.opacity = Math.max(0, shrink * 0.85);
      }, 30);
    }
  });

  if (g.position.z > 40) {
    g.visible = false;
    const total = g.userData.branches.length;
    const clean = total - g.userData.brokenCount;
    if (clean > 0) {
      gs.score += clean * 8;
      if (clean === total) playTone(880, 0.3, 'sine');
    }
  }
}

let nebulaCloud = null;
const NC_SPAWN_Z = -330;
function spawnNebulaCloud() {
  if (!nebulaCloud) return;
  nebulaCloud.visible = true;
  nebulaCloud.position.set((Math.random() - 0.5) * BOUND_X * 0.6, (Math.random() - 0.5) * BOUND_Y * 0.5, NC_SPAWN_Z);
  nebulaCloud.userData.nebulaTime = 0;
}
function updateNebulaCloud(dt, moveZ) {
  const g = nebulaCloud;
  if (!g || !g.visible) return;
  g.position.z += moveZ;
  g.userData.nebulaTime += dt;
  g.userData.nebulaMat.uniforms.time.value = g.userData.nebulaTime;
  g.rotation.y += dt * 0.06;
  if (g.position.z > 40) g.visible = false;
}

/* ---------------- GAME ---------------- */
let renderer, scene, camera, clock;
let ship, stars, deepSpaceDecor, nebulaA, nebulaB, launchPad;
let asteroidPool = [], orbPool = [], milestonePool = [], cubePool = [];
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
    cubeTimer: 4 + Math.random() * 3,
    holeActive: false,
    holeTimer: 10 + Math.random() * 5,
    gardenTimer: 16 + Math.random() * 8,
    staticTimer: 24 + Math.random() * 10,
    crystalTimer: 20 + Math.random() * 12,
    nebulaTimer: 28 + Math.random() * 14,
    timeScale: 1,
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
  deepSpaceDecor = buildDeepSpaceDecor();
  scene.add(deepSpaceDecor);
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
  cubePool = buildCubePool();
  BH_FX_OK = true;
  buildBlackHoleFX();
  resizeBlackHoleFX();
  blackHole = buildBlackHole();
  blackHole.visible = false;
  scene.add(blackHole);

  starGarden = buildStarGarden();
  scene.add(starGarden);

  ST_FX_OK = true;
  buildStaticFX();
  resizeStaticFX();
  staticZone = buildStaticZone();
  scene.add(staticZone);

  crystalNetwork = buildCrystalNetwork();
  scene.add(crystalNetwork);

  nebulaCloud = buildNebulaCloud();
  nebulaCloud.visible = false;
  scene.add(nebulaCloud);

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

/* dense, varied starfield — plain white points read as empty black-on-
   black from a distance, so most stars get a warm/cool tint and a
   handful are drawn bigger/brighter to read as "real" stars, not haze */
/* real per-star twinkle (soft round sprite + phase-shifted size pulse),
   ported from the reference's starfield shader technique instead of a
   flat PointsMaterial — .material.uniforms.uOpacity stands in for the
   plain .material.opacity the launch-sequence sky transition used to
   set directly. */
function buildStarfield() {
  const n = 3400;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const siz = new Float32Array(n);
  const pha = new Float32Array(n);
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const r = 260 + Math.random() * 300;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.cos(ph);
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 200;
    const roll = Math.random();
    if (roll < 0.14) c.setHSL(0.58, 0.55, 0.75);       // cool blue-white
    else if (roll < 0.26) c.setHSL(0.11, 0.6, 0.72);   // warm amber
    else c.setHSL(0, 0, 0.9 + Math.random() * 0.1);    // near-white
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    siz[i] = 1.1 + Math.random() * 2.4;
    pha[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(pha, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.85 } },
    vertexShader: `
      attribute vec3 color;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      varying vec3 vColor;
      varying float vTw;
      void main() {
        vColor = color;
        vTw = 0.6 + 0.4 * sin(uTime * (0.5 + fract(aPhase) * 1.2) + aPhase * 6.2831);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (0.7 + 0.4 * vTw);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = pow(smoothstep(0.5, 0.0, d), 2.0);
        gl_FragColor = vec4(vColor * vTw, a * uOpacity);
      }
    `,
  });
  return new THREE.Points(geo, mat);
}

/* far-background decoration — small drifting planets and asteroid
   silhouettes well outside the play area, purely visual, so deep space
   reads as a real populated sky instead of an empty black void. */
function buildDeepSpaceDecor() {
  const g = new THREE.Group();
  const planetHues = [0.58, 0.08, 0.34, 0.02, 0.75, 0.5];
  for (let i = 0; i < 9; i++) {
    const hue = planetHues[i % planetHues.length];
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(hue, 0.5, 0.42 + Math.random() * 0.15) });
    const p = new THREE.Mesh(new THREE.SphereGeometry(2 + Math.random() * 5, 12, 9), mat);
    const a = Math.random() * Math.PI * 2;
    const r = 140 + Math.random() * 90;
    p.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 90, Math.sin(a) * r - 260 - Math.random() * 260);
    g.add(p);
  }
  const rockMat = new THREE.MeshBasicMaterial({ color: 0x39352f });
  for (let i = 0; i < 22; i++) {
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6 + Math.random() * 1.4, 0), rockMat);
    const a = Math.random() * Math.PI * 2;
    const r = 60 + Math.random() * 130;
    rock.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 60, Math.sin(a) * r - 180 - Math.random() * 200);
    rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    g.add(rock);
  }
  return g;
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
  const erid = buildErid();
  [earth, moon, sun, erid].forEach((m) => { m.visible = false; scene.add(m); });
  return [
    { g: earth, active: false, kind: 'earth' },
    { g: moon, active: false, kind: 'moon' },
    { g: sun, active: false, kind: 'sun' },
    { g: erid, active: false, kind: 'erid' },
  ];
}
function spawnMilestone() {
  const m = milestonePool.find((x) => !x.active);
  if (!m) return;
  m.active = true;
  m.g.visible = true;
  const side = Math.random() < 0.5 ? -1 : 1;
  m.g.position.set(side * (60 + Math.random() * 40), (Math.random() - 0.5) * 30, -400 - Math.random() * 60);
  if (m.kind === 'sun') paintSun(m.g);
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
      return;
    }
    const cubeMeshes = cubePool.filter((c) => c.active).map((c) => c.mesh);
    const cubeHits = gs.raycaster.intersectObjects(cubeMeshes, false);
    if (cubeHits.length) {
      const cube = cubePool.find((c) => c.mesh === cubeHits[0].object);
      hitCube(cube, cubeHits[0].face.materialIndex);
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
  let backdropDrawn = false;
  if (gs.holeActive) {
    backdropDrawn = renderBlackHoleFX(dt);
    const u = blackHole.userData;
    u.core.visible = u.ring.visible = u.glow.visible = u.particles.visible = !backdropDrawn;
  } else if (staticZone.visible) {
    backdropDrawn = renderStaticFX(dt);
  }
  if (backdropDrawn) {
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(scene, camera);
    renderer.autoClear = true;
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
    stars.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.15, 0.85, skyMix);
    stars.material.uniforms.uTime.value = clock.elapsedTime;
  }

  updateBursts(dt);

  if (t >= LAUNCH_DUR) {
    gs.phase = 'flight';
    ship.position.set(0, 0, 0);
    ship.userData.flame.scale.set(1, 1, 1);
    ship.userData.glow.scale.setScalar(1.1);
    scene.remove(launchPad);
    stars.material.uniforms.uOpacity.value = 0.85;
    scene.fog.density = 0.006;
    $('#launchBanner').style.display = 'none';
    nextWord();
  }
}

function update(dt) {
  const timeScale = updateSunProximity(dt);
  dt *= timeScale;

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
  stars.material.uniforms.uTime.value = clock.elapsedTime;
  deepSpaceDecor.position.z += moveZ * 0.06;
  if (deepSpaceDecor.position.z > 260) deepSpaceDecor.position.z -= 260;

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

  gs.cubeTimer -= dt;
  if (gs.cubeTimer <= 0) { spawnCube(); gs.cubeTimer = 5 + Math.random() * 4; }
  cubePool.forEach((c) => {
    if (!c.active) return;
    c.mesh.position.z += moveZ;
    if (c.mesh.position.z > 12) { c.active = false; c.mesh.visible = false; return; }
    c.burstT -= dt;
    if (c.burstT <= 0) {
      c.burstUntil = 0.35 + Math.random() * 0.35;
      c.burstT = 1.5 + Math.random() * 2.5;
    }
    const fast = c.burstUntil > 0;
    if (fast) c.burstUntil -= dt;
    const rate = fast ? 7 : 1;
    c.mesh.rotation.x += c.spin.x * dt * rate;
    c.mesh.rotation.y += c.spin.y * dt * rate;
    c.mesh.rotation.z += c.spin.z * dt * rate;
  });

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
    if (m.g.userData.starSpin) m.g.userData.starSpin.rotation.y += dt * 0.05;
    if (m.g.userData.shaderMats) {
      m.g.userData.shaderTime += dt;
      m.g.userData.shaderMats.forEach((mat) => { mat.uniforms.uTime.value = m.g.userData.shaderTime; });
    }
    if (m.g.userData.flareSprite) {
      const pulse = 1 + Math.sin(m.g.userData.shaderTime * 2) * 0.05;
      m.g.userData.flareSprite.scale.setScalar(m.g.userData.flareBaseScale * pulse);
    }
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

  if (!staticZone.visible) {
    gs.staticTimer -= dt;
    if (gs.staticTimer <= 0) { spawnStaticZone(); gs.staticTimer = 26 + Math.random() * 12; }
  } else {
    updateStaticZone(dt, moveZ * 0.8);
  }

  if (!crystalNetwork.visible) {
    gs.crystalTimer -= dt;
    if (gs.crystalTimer <= 0) { spawnCrystalNetwork(); gs.crystalTimer = 20 + Math.random() * 12; }
  } else {
    updateCrystalNetwork(dt, moveZ * 0.8);
  }

  if (!nebulaCloud.visible) {
    gs.nebulaTimer -= dt;
    if (gs.nebulaTimer <= 0) { spawnNebulaCloud(); gs.nebulaTimer = 28 + Math.random() * 14; }
  } else {
    updateNebulaCloud(dt, moveZ * 0.8);
  }

  updateBursts(dt);
  updateHud();

  if (gs.hull <= 0) endFlight('hull');
}

function spawnBlackHole() {
  gs.holeActive = true;
  blackHole.visible = true;
  blackHole.userData.baseX = (Math.random() - 0.5) * BOUND_X * 1.6;
  blackHole.position.set(blackHole.userData.baseX, (Math.random() - 0.5) * BOUND_Y, -210);
}

function onResize() {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  resizeBlackHoleFX();
  resizeStaticFX();
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
