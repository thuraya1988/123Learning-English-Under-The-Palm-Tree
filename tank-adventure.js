import * as THREE from 'three';

/* ============================================================
   TANK ADVENTURE — مهمة سمائل
   Drive through Samail's desert; each round shows 4 sentence
   crates — 3 grammatically correct, 1 wrong. Shoot the wrong one.
   All sentences are grounded in "Under the Palm Tree" (Malood the
   goat, John's wasp sting, Saeed, Sadoo's palm climb, Uncle Nasser).
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
}

/* ---------------- GRAMMAR CONTENT (grounded in the novel) ---------------- */
const RULES = [
  { key: 'past', label: 'الماضي البسيط · Past Simple' },
  { key: 'cont', label: 'المضارع المستمر · Present Continuous' },
  { key: 'can', label: 'القدرة · Can' },
  { key: 'will', label: 'المستقبل · Will' },
  { key: 'must', label: 'الإلزام · Must / Mustn\'t' },
  { key: 'should', label: 'النصيحة · Should / Shouldn\'t' },
];

const SENTENCES = {
  past: [
    { correct: 'A wasp stung John near the falaj.', wrong: 'A wasp stinged John near the falaj.' },
    { correct: "Malood ate Thuraya's notebook.", wrong: "Malood eated Thuraya's notebook." },
    { correct: 'The children walked to school yesterday.', wrong: 'The children walk to school yesterday.' },
    { correct: 'Uncle Nasser drove the truck to Samail.', wrong: 'Uncle Nasser drived the truck to Samail.' },
    { correct: "Sophia washed her clothes in the falaj.", wrong: "Sophia washing her clothes in the falaj yesterday." },
  ],
  cont: [
    { correct: 'The children are swimming in the pools.', wrong: 'The children is swimming in the pools.' },
    { correct: 'Sadoo is climbing the palm tree.', wrong: 'Sadoo is climb the palm tree.' },
    { correct: 'John is eating a chili pepper.', wrong: 'John eating a chili pepper.' },
    { correct: 'We are having a picnic at Tawi Zahir.', wrong: 'We are have a picnic at Tawi Zahir.' },
    { correct: "Malood is chewing Thuraya's book.", wrong: "Malood chewing Thuraya's book." },
  ],
  can: [
    { correct: 'Sadoo can climb tall palm trees.', wrong: 'Sadoo can climbs tall palm trees.' },
    { correct: 'Ali can draw beautiful pictures.', wrong: 'Ali can to draw beautiful pictures.' },
    { correct: 'Noora can ask many questions.', wrong: 'Noora cans ask many questions.' },
    { correct: 'John can speak village Arabic.', wrong: 'John can speaking village Arabic.' },
    { correct: 'Malood can eat almost anything.', wrong: 'Malood can eating almost anything.' },
  ],
  will: [
    { correct: 'Sadoo will climb the tall palm tree.', wrong: 'Sadoo will climbs the tall palm tree.' },
    { correct: 'Saeed will offer chili to Sadoo.', wrong: 'Saeed will offering chili to Sadoo.' },
    { correct: 'We will find the honey and ghee.', wrong: 'We will finds the honey and ghee.' },
    { correct: 'Mansoor will pass his exam.', wrong: 'Mansoor wills pass his exam.' },
    { correct: 'Thuraya will teach the new lesson.', wrong: 'Thuraya will teaching the new lesson.' },
  ],
  must: [
    { correct: 'You must tell the truth.', wrong: 'You must to tell the truth.' },
    { correct: "Mansoor mustn't take things without asking.", wrong: "Mansoor mustn't takes things without asking." },
    { correct: 'We must respect the falaj water.', wrong: 'We must respecting the falaj water.' },
    { correct: "Students mustn't be late for school.", wrong: "Students mustn't to be late for school." },
    { correct: "Khalil mustn't play tricks on Thuraya.", wrong: "Khalil mustn't playing tricks on Thuraya." },
  ],
  should: [
    { correct: 'We should respect our elders.', wrong: 'We should respecting our elders.' },
    { correct: "You shouldn't eat with your left hand.", wrong: "You shouldn't eating with your left hand." },
    { correct: 'John should try the grilled grasshopper.', wrong: 'John should tries the grilled grasshopper.' },
    { correct: 'We should welcome every guest.', wrong: 'We should welcomes every guest.' },
    { correct: "Sophia shouldn't be afraid of new food.", wrong: "Sophia shouldn't afraid of new food." },
  ],
};

const FACTS = [
  { title: 'الفلج — نظام ري عمره آلاف السنين', text: 'نظام الفلج اللي تسبح فيه شخصيات الرواية موروث عالمي عند اليونسكو، ويعود تاريخه إلى نحو 2500 سنة قبل الميلاد — ولسا يزوّد عُمان بجزء كبير من مياهها اليوم.' },
  { title: 'الوسم — توقيع القبيلة', text: 'الوسم علامة قبلية قديمة كانت تُحفر على جلد الحيوانات أو تُرسم كتوقيع يميّز كل قبيلة عن غيرها — تقليد عربي عريق يذكّرنا بفخر ثريا بانتمائها لقبيلة آل النعابي.' },
  { title: 'الصلح — تقليد المصالحة', text: 'لما تعتذر القرية عن اتهام شيب خلف ظلماً، هذا يعكس تقليد "الصلح" العربي الأصيل — حل النزاعات بالتسامح والاعتذار بدل الخصومة.' },
  { title: 'الخنجر العُماني', text: 'الخنجر رمز وطني عُماني يظهر على شعار الدولة والعملة، وتعود جذوره إلى القرنين الخامس عشر والسادس عشر — رمز للفخر والهوية.' },
  { title: 'القهوة العربية والمجلس', text: 'المجلس والقهوة العربية (اليوم جزء من التراث الإنساني عند اليونسكو منذ 2015) هما قلب الضيافة العُمانية — وفيهم تحل مشاكل القرية زي قضية سعيد ومدرسته.' },
  { title: 'أكل الجراد المشوي', text: 'أكل الجراد المشوي (مشاوي) تقليد عربي موثّق من القرن السادس عشر — نفس اللحظة اللي جرّب فيها جون هذا الطبق الغريب عليه أول مرة!' },
];

/* ---------------- MENU WIRING ---------------- */
function initMenu() {
  $('#startMissionBtn').addEventListener('click', () => {
    showScreen('screen-game');
    startMission();
  });
  const best = Number(localStorage.getItem('palm_tank_best') || 0);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
}

/* ---------------- TANK MESH ---------------- */
function buildTank() {
  const group = new THREE.Group();
  const hullMat = new THREE.MeshStandardMaterial({ color: 0x5c6b3f, roughness: 0.75, metalness: 0.15, flatShading: true });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2c331e, roughness: 0.8, flatShading: true });
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.9 });

  const hull = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.7, 3.4), hullMat);
  hull.position.y = 0.55;
  group.add(hull);

  const glacis = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.9), hullMat);
  glacis.position.set(0, 0.5, -1.9);
  glacis.rotation.x = 0.5;
  group.add(glacis);

  [-1, 1].forEach((s) => {
    const track = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 3.7), trackMat);
    track.position.set(s * 1.05, 0.3, 0);
    group.add(track);
    for (let i = 0; i < 6; i++) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.44, 10), darkMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(s * 1.05, 0.28, -1.5 + i * 0.62);
      group.add(wheel);
    }
  });

  const turretGroup = new THREE.Group();
  turretGroup.position.set(0, 0.95, 0.1);
  const turretGeo = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0, -0.35), new THREE.Vector2(0.62, -0.32), new THREE.Vector2(0.68, -0.05),
      new THREE.Vector2(0.6, 0.18), new THREE.Vector2(0.32, 0.3), new THREE.Vector2(0, 0.34),
    ],
    16
  );
  const turret = new THREE.Mesh(turretGeo, hullMat);
  turretGroup.add(turret);

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 2.4, 10), darkMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, -0.02, -1.5);
  turretGroup.add(barrel);
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.22, 10), darkMat);
  muzzle.rotation.x = Math.PI / 2;
  muzzle.position.set(0, -0.02, -2.6);
  turretGroup.add(muzzle);

  const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 12), darkMat);
  hatch.position.set(0.2, 0.36, 0.3);
  turretGroup.add(hatch);

  group.add(turretGroup);
  group.userData.turret = turretGroup;
  group.userData.dims = { l: 3.4, w: 2.0 };
  return group;
}

/* ---------------- SIGN CRATE (sentence target) ---------------- */
function buildCrate() {
  const g = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3f, roughness: 0.9 });
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.6, 0.14), woodMat);
  post.position.y = 0.8;
  g.add(post);
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 0.08), woodMat);
  board.position.y = 1.55;
  g.add(board);

  const label = makeLabelSprite('');
  label.position.set(0, 1.55, 0.1);
  g.add(label);

  const glow = makeGlowSprite(0xffe08a, 2.6);
  glow.position.set(0, 1.55, -0.1);
  g.add(glow);

  g.userData.board = board;
  g.userData.label = label;
  g.userData.glow = glow;
  return g;
}

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
let GLOW_TEX = null;
function makeGlowSprite(hex, scale) {
  if (!GLOW_TEX) GLOW_TEX = makeGlowTexture();
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW_TEX, color: hex, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
  sp.scale.setScalar(scale);
  return sp;
}
function makeLabelSprite(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 200;
  const ctx = c.getContext('2d');
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthTest: false }));
  sp.scale.set(3.4, 1.3, 1);
  sp.userData.ctx = ctx;
  sp.userData.tex = sp.material.map;
  setLabelText(sp, text);
  return sp;
}
function setLabelText(sprite, text) {
  const ctx = sprite.userData.ctx;
  ctx.clearRect(0, 0, 512, 200);
  ctx.fillStyle = 'rgba(245,237,216,0.96)';
  roundRect(ctx, 8, 8, 496, 184, 18);
  ctx.fill();
  ctx.fillStyle = '#4A3520';
  ctx.font = '700 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  wrapText(ctx, text, 256, 100, 460, 46);
  sprite.userData.tex.needsUpdate = true;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrapText(ctx, text, cx, cy, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  lines.push(line);
  const startY = cy - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineHeight));
}

/* ---------------- GAME ---------------- */
let renderer, scene, camera, clock;
let tank, rockPool = [], cratePool = [];
let animFrameId = null;
let audioCtx;

const BOUND_X = 7;
let gs;

function startMission() {
  cleanupScene();
  gs = {
    running: true,
    paused: false,
    speed: 12,
    score: 0,
    correctCount: 0,
    hp: 100,
    tankX: 0,
    targetX: 0,
    ruleIndex: 0,
    roundsCleared: 0,
    round: null,
    roundTimer: 0,
    rockTimer: 1.6,
    turretAngle: 0,
    pointer: { x: 0, y: 0 },
  };

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xE3B36A, 20, 105);

  camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 300);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  $('#scene3d').appendChild(renderer.domElement);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(200, 16, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { top: { value: new THREE.Color(0xFBDFA0) }, bot: { value: new THREE.Color(0xE3934F) } },
      vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vPos; uniform vec3 top; uniform vec3 bot; void main(){ float h = normalize(vPos).y * 0.5 + 0.5; gl_FragColor = vec4(mix(bot, top, h), 1.0); }`,
    })
  );
  scene.add(sky);

  scene.add(new THREE.HemisphereLight(0xFBDFA0, 0x8C6A3F, 0.7));
  const sun = new THREE.DirectionalLight(0xFFE8B0, 1.3);
  sun.position.set(-20, 30, -10);
  scene.add(sun);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 400), new THREE.MeshStandardMaterial({ color: 0xD9A05B, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -100;
  scene.add(ground);

  rockPool = buildDecorPool();
  cratePool = buildCratePool();

  tank = buildTank();
  tank.position.set(0, 0, 0);
  scene.add(tank);

  bindControls();
  startEngineAudio();
  onResize();
  addEventListener('resize', onResize);

  nextRound();
  animFrameId = requestAnimationFrame(loop);
}

function buildDecorPool() {
  const items = [];
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x8C6A3F, roughness: 1 });
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x6B7A3A, roughness: 1 });
  for (let i = 0; i < 20; i++) {
    const isRock = Math.random() > 0.4;
    const mesh = isRock
      ? new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + Math.random() * 0.7), rockMat)
      : new THREE.Mesh(new THREE.ConeGeometry(0.4 + Math.random() * 0.3, 1.0 + Math.random() * 0.6, 6), bushMat);
    mesh.userData.isRock = isRock;
    mesh.userData.hazard = isRock && Math.random() < 0.5;
    if (mesh.userData.hazard) mesh.material = new THREE.MeshStandardMaterial({ color: 0x6b5a44, roughness: 1 });
    mesh.visible = false;
    scene.add(mesh);
    items.push({ mesh, active: false });
  }
  return items;
}
function spawnRock() {
  const r = rockPool.find((x) => !x.active);
  if (!r) return;
  r.active = true;
  r.mesh.visible = true;
  const onPath = Math.random() < 0.35;
  const x = onPath ? (Math.random() - 0.5) * BOUND_X * 1.4 : (Math.random() < 0.5 ? -1 : 1) * (BOUND_X * 0.9 + Math.random() * 6);
  r.mesh.position.set(x, r.mesh.userData.isRock ? 0.4 : 0.5, -140 - Math.random() * 30);
}

function buildCratePool() {
  const items = [];
  for (let i = 0; i < 4; i++) {
    const g = buildCrate();
    g.visible = false;
    scene.add(g);
    items.push({ g, active: false, isWrong: false, bob: Math.random() * Math.PI * 2 });
  }
  return items;
}

/* ---------------- ROUND LOGIC ---------------- */
function nextRound() {
  const rule = RULES[gs.ruleIndex % RULES.length];
  $('#ruleLabel').textContent = rule.label;
  const bank = SENTENCES[rule.key];
  const target = bank[Math.floor(Math.random() * bank.length)];

  const decoyPool = Object.values(SENTENCES).flat().filter((s) => s !== target);
  const decoys = [];
  while (decoys.length < 3) {
    const pick = decoyPool[Math.floor(Math.random() * decoyPool.length)];
    if (!decoys.includes(pick)) decoys.push(pick);
  }

  const entries = [
    { text: target.wrong, isWrong: true },
    { text: decoys[0].correct, isWrong: false },
    { text: decoys[1].correct, isWrong: false },
    { text: decoys[2].correct, isWrong: false },
  ].sort(() => Math.random() - 0.5);

  const slots = [-4.2, -1.4, 1.4, 4.2];
  entries.forEach((e, i) => {
    const c = cratePool[i];
    c.active = true;
    c.g.visible = true;
    c.isWrong = e.isWrong;
    setLabelText(c.g.userData.label, e.text);
    c.g.userData.glow.material.color.setHex(0xffe08a);
    c.g.position.set(slots[i] + (Math.random() - 0.5) * 0.4, 0, -110 - Math.random() * 8);
  });

  gs.round = { resolved: false };
  gs.roundTimer = 16;
}

function resolveCrate(crate) {
  if (!crate || !crate.active || gs.round.resolved) return;
  gs.round.resolved = true;
  spawnBurst(crate.g.position.clone().add(new THREE.Vector3(0, 1.55, 0)), crate.isWrong ? 0x7dff8a : 0xff4d5e);
  if (crate.isWrong) {
    gs.score += 100;
    gs.correctCount++;
    gs.roundsCleared++;
    playTone(880, 0.12);
  } else {
    gs.hp = Math.max(0, gs.hp - 18);
    playTone(180, 0.2, 'sawtooth');
  }
  cratePool.forEach((c) => { c.active = false; c.g.visible = false; });
  gs.ruleIndex++;
  setTimeout(() => {
    if (!gs.running || gs.paused) return;
    if (gs.roundsCleared > 0 && gs.roundsCleared % 3 === 0) {
      showFact();
    } else {
      nextRound();
    }
  }, 650);
}

function showFact() {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
  $('#factTitle').textContent = fact.title;
  $('#factText').textContent = fact.text;
  $('#factPopup').classList.add('active');
  gs.paused = true;
}
function hideFact() {
  $('#factPopup').classList.remove('active');
  gs.paused = false;
  nextRound();
}

/* ---------------- CONTROLS ---------------- */
function bindControls() {
  gs.keys = {};
  gs.keyHandler = (e) => { gs.keys[e.key.toLowerCase()] = e.type === 'keydown'; };
  addEventListener('keydown', gs.keyHandler);
  addEventListener('keyup', gs.keyHandler);

  gs.pointerHandler = (e) => {
    const t = e.touches ? e.touches[0] : e;
    if (!t) return;
    gs.pointer.x = (t.clientX / innerWidth) * 2 - 1;
    gs.pointer.y = -(t.clientY / innerHeight) * 2 + 1;
  };
  addEventListener('mousemove', gs.pointerHandler);
  addEventListener('touchmove', gs.pointerHandler, { passive: true });

  gs.raycaster = new THREE.Raycaster();
  gs.tapHandler = (e) => {
    if (gs.paused || !gs.running) return;
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const ndc = new THREE.Vector2((t.clientX / innerWidth) * 2 - 1, -(t.clientY / innerHeight) * 2 + 1);
    gs.raycaster.setFromCamera(ndc, camera);
    const meshes = cratePool.filter((c) => c.active).map((c) => c.g.userData.board);
    const hits = gs.raycaster.intersectObjects(meshes, false);
    if (hits.length) {
      const crate = cratePool.find((c) => c.g.userData.board === hits[0].object);
      resolveCrate(crate);
    }
  };
  addEventListener('click', gs.tapHandler);
  addEventListener('touchend', gs.tapHandler);

  $('#pauseBtn').addEventListener('click', togglePause);
  $('#goRestartBtn').addEventListener('click', () => { showScreen('screen-game'); startMission(); });
  $('#goMenuBtn').addEventListener('click', () => { showScreen('screen-menu'); });
  $('#factContinueBtn').addEventListener('click', hideFact);
}
function togglePause() {
  if ($('#factPopup').classList.contains('active')) return;
  gs.paused = !gs.paused;
  $('#pauseBtn').textContent = gs.paused ? '▶️' : '⏸️';
}

/* ---------------- PARTICLES / AUDIO ---------------- */
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
  update(dt);
  renderer.render(scene, camera);
}

function update(dt) {
  const left = gs.keys['a'] || gs.keys['arrowleft'];
  const right = gs.keys['d'] || gs.keys['arrowright'];
  const steer = (left ? -1 : 0) + (right ? 1 : 0);
  gs.targetX = THREE.MathUtils.clamp(gs.targetX + steer * dt * 6, -BOUND_X, BOUND_X);
  gs.tankX = THREE.MathUtils.lerp(gs.tankX, gs.targetX, dt * 4);
  tank.position.x = gs.tankX;
  tank.rotation.y = THREE.MathUtils.lerp(tank.rotation.y, -steer * 0.18, dt * 6);

  const rc = new THREE.Raycaster();
  rc.setFromCamera(gs.pointer, camera);
  const groundY = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.95);
  const hitPoint = new THREE.Vector3();
  if (rc.ray.intersectPlane(groundY, hitPoint)) {
    const dx = hitPoint.x - tank.position.x;
    const dz = hitPoint.z - tank.position.z;
    const angle = Math.atan2(dx, dz) - tank.rotation.y;
    gs.turretAngle = THREE.MathUtils.lerp(gs.turretAngle, angle, dt * 6);
    tank.userData.turret.rotation.y = gs.turretAngle;
  }

  const moveZ = gs.speed * dt;
  gs.score = gs.score;

  camera.position.lerp(new THREE.Vector3(tank.position.x * 0.6, 4.4, tank.position.z + 8.5), dt * 4);
  camera.lookAt(tank.position.x, 1.1, tank.position.z - 6);

  gs.rockTimer -= dt;
  if (gs.rockTimer <= 0) { spawnRock(); gs.rockTimer = 1.2 + Math.random() * 1.0; }
  rockPool.forEach((r) => {
    if (!r.active) return;
    r.mesh.position.z += moveZ;
    r.mesh.rotation.y += dt * 0.2;
    if (r.mesh.position.z > 10) { r.active = false; r.mesh.visible = false; return; }
    if (r.mesh.userData.hazard) {
      const d = r.mesh.position.distanceTo(tank.position);
      if (d < 1.8) {
        gs.hp = Math.max(0, gs.hp - 14);
        spawnBurst(r.mesh.position.clone().add(new THREE.Vector3(0, 0.6, 0)), 0xffb347);
        r.active = false;
        r.mesh.visible = false;
        playTone(140, 0.25, 'sawtooth');
      }
    }
  });

  cratePool.forEach((c) => {
    if (!c.active) return;
    c.g.position.z += moveZ;
    c.bob += dt * 2;
    c.g.userData.glow.material.opacity = 0.3 + Math.sin(c.bob) * 0.12;
  });
  if (gs.round && !gs.round.resolved) {
    gs.roundTimer -= dt;
    const anyPassed = cratePool.some((c) => c.active && c.g.position.z > 10);
    if (gs.roundTimer <= 0 || anyPassed) {
      gs.round.resolved = true;
      cratePool.forEach((c) => { c.active = false; c.g.visible = false; });
      gs.ruleIndex++;
      setTimeout(() => { if (gs.running && !gs.paused) nextRound(); }, 300);
    }
  }

  updateBursts(dt);
  updateHud();

  if (gs.hp <= 0) endMission();
}

function onResize() {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function updateHud() {
  $('#hud-score').textContent = `النقاط: ${gs.score}`;
  $('#hud-round').textContent = `الجولة: ${gs.roundsCleared + 1}`;
  $('#hpBar i').style.width = `${gs.hp}%`;
}

function endMission() {
  if (!gs.running) return;
  gs.running = false;
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopAudio();
  removeEventListener('resize', onResize);
  removeEventListener('keydown', gs.keyHandler);
  removeEventListener('keyup', gs.keyHandler);
  removeEventListener('mousemove', gs.pointerHandler);
  removeEventListener('touchmove', gs.pointerHandler);
  removeEventListener('click', gs.tapHandler);
  removeEventListener('touchend', gs.tapHandler);

  const best = Math.max(gs.score, Number(localStorage.getItem('palm_tank_best') || 0));
  localStorage.setItem('palm_tank_best', String(best));

  $('#goScore').textContent = String(gs.score);
  $('#goCorrect').textContent = String(gs.correctCount);
  $('#goBest').textContent = String(best);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
  showScreen('screen-gameover');
}

function cleanupScene() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopAudio();
  removeEventListener('resize', onResize);
  if (gs) {
    if (gs.keyHandler) { removeEventListener('keydown', gs.keyHandler); removeEventListener('keyup', gs.keyHandler); }
    if (gs.pointerHandler) { removeEventListener('mousemove', gs.pointerHandler); removeEventListener('touchmove', gs.pointerHandler); }
    if (gs.tapHandler) { removeEventListener('click', gs.tapHandler); removeEventListener('touchend', gs.tapHandler); }
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
