import * as THREE from 'three';

/* ============================================================
   RACING ADVENTURE — سباق الصحراء
   Core structure: car customization + paint editor + endless
   desert road with traffic dodging + tornado hazard.
   Educational content (vocabulary/questions) wires in later.
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
}

/* ---------------- CAR STATE ---------------- */
const carState = {
  type: 'sport',
  color: '#C9422A',
  skin: 'normal',
  hasCustom: false,
};

const CAR_COLORS = ['#C9422A', '#2A5FA3', '#2E7D4F', '#E3B36A', '#3A3A3A', '#F5EDD8'];

/* ---------------- MENU WIRING ---------------- */
function initMenu() {
  $('#carTypes').addEventListener('click', (e) => {
    const card = e.target.closest('.car-type-card');
    if (!card) return;
    carState.type = card.dataset.type;
    $$('.car-type-card').forEach((c) => c.classList.toggle('selected', c === card));
  });
  $$('.car-type-card')[0].classList.add('selected');

  const swWrap = $('#colorSwatches');
  CAR_COLORS.forEach((hex, i) => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch' + (i === 0 ? ' selected' : '');
    sw.style.background = hex;
    sw.dataset.color = hex;
    sw.addEventListener('click', () => {
      carState.color = hex;
      $$('.color-swatch').forEach((s) => s.classList.remove('selected'));
      sw.classList.add('selected');
    });
    swWrap.appendChild(sw);
  });

  $('#skinPresets').addEventListener('click', (e) => {
    const chip = e.target.closest('.skin-chip');
    if (!chip) return;
    if (chip.dataset.skin === 'custom' && !carState.hasCustom) {
      openPaintEditor();
      return;
    }
    carState.skin = chip.dataset.skin;
    $$('.skin-chip').forEach((c) => c.classList.toggle('selected', c === chip));
  });
  $$('.skin-chip')[0].classList.add('selected');

  $('#openPaintBtn').addEventListener('click', openPaintEditor);
  $('#startRaceBtn').addEventListener('click', () => {
    showScreen('screen-game');
    startRace();
  });

  const best = Number(localStorage.getItem('palm_racing_best') || 0);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
}

function selectSkinChip(skin) {
  carState.skin = skin;
  $$('.skin-chip').forEach((c) => c.classList.toggle('selected', c.dataset.skin === skin));
}

/* ---------------- PAINT EDITOR ---------------- */
const PAINT_COLORS = ['#1a1a1a', '#F5EDD8', '#C9422A', '#E3B36A', '#2A5FA3', '#2E7D4F', '#8C6A3F', '#360304', '#FFFFFF'];
let paintCtx, paintTool = 'brush', paintColor = PAINT_COLORS[2], brushSize = 10;
let paintHistory = [], paintHistoryIndex = -1;
let drawing = false, startX = 0, startY = 0, snapshotBeforeShape = null;
const carSkinCanvas = document.createElement('canvas');
carSkinCanvas.width = 512;
carSkinCanvas.height = 384;

function initPaint() {
  const canvas = $('#paintCanvas');
  paintCtx = canvas.getContext('2d');
  paintCtx.fillStyle = '#f2ede0';
  paintCtx.fillRect(0, 0, canvas.width, canvas.height);
  pushHistory();

  const palWrap = $('#paintPalette');
  PAINT_COLORS.forEach((hex, i) => {
    const sw = document.createElement('div');
    sw.className = 'paint-color' + (i === 2 ? ' active' : '');
    sw.style.background = hex;
    sw.addEventListener('click', () => {
      paintColor = hex;
      $('#customColor').value = hex;
      $$('.paint-color').forEach((c) => c.classList.remove('active'));
      sw.classList.add('active');
    });
    palWrap.appendChild(sw);
  });

  $('#customColor').addEventListener('input', (e) => {
    paintColor = e.target.value;
    $$('.paint-color').forEach((c) => c.classList.remove('active'));
  });
  $('#brushSize').addEventListener('input', (e) => { brushSize = Number(e.target.value); });

  $('#paintTools').addEventListener('click', (e) => {
    const btn = e.target.closest('.paint-tool');
    if (!btn) return;
    const tool = btn.dataset.tool;
    if (tool === 'undo') { undoPaint(); return; }
    if (tool === 'clear') { clearPaint(); return; }
    paintTool = tool;
    $$('.paint-tool').forEach((t) => t.classList.toggle('active', t === btn));
  });

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return {
      x: ((t.clientX - rect.left) / rect.width) * canvas.width,
      y: ((t.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const onDown = (e) => {
    e.preventDefault();
    const p = getPos(e);
    drawing = true;
    startX = p.x; startY = p.y;
    if (paintTool === 'brush' || paintTool === 'eraser') {
      paintCtx.beginPath();
      paintCtx.moveTo(p.x, p.y);
    } else if (paintTool === 'fill') {
      floodFill(Math.round(p.x), Math.round(p.y), paintColor);
      pushHistory();
      drawing = false;
    } else if (paintTool === 'picker') {
      const px = paintCtx.getImageData(p.x, p.y, 1, 1).data;
      paintColor = `#${[px[0], px[1], px[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
      $('#customColor').value = paintColor;
      $$('.paint-color').forEach((c) => c.classList.remove('active'));
      drawing = false;
    } else if (['line', 'rect', 'circle'].includes(paintTool)) {
      snapshotBeforeShape = paintCtx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };
  const onMove = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const p = getPos(e);
    if (paintTool === 'brush' || paintTool === 'eraser') {
      paintCtx.lineWidth = brushSize;
      paintCtx.lineCap = 'round';
      paintCtx.lineJoin = 'round';
      paintCtx.strokeStyle = paintTool === 'eraser' ? '#f2ede0' : paintColor;
      paintCtx.lineTo(p.x, p.y);
      paintCtx.stroke();
    } else if (['line', 'rect', 'circle'].includes(paintTool)) {
      paintCtx.putImageData(snapshotBeforeShape, 0, 0);
      paintCtx.strokeStyle = paintColor;
      paintCtx.lineWidth = brushSize;
      paintCtx.lineCap = 'round';
      paintCtx.beginPath();
      if (paintTool === 'line') {
        paintCtx.moveTo(startX, startY);
        paintCtx.lineTo(p.x, p.y);
      } else if (paintTool === 'rect') {
        paintCtx.rect(startX, startY, p.x - startX, p.y - startY);
      } else if (paintTool === 'circle') {
        const r = Math.hypot(p.x - startX, p.y - startY);
        paintCtx.arc(startX, startY, r, 0, Math.PI * 2);
      }
      paintCtx.stroke();
    }
  };
  const onUp = () => {
    if (!drawing) return;
    drawing = false;
    pushHistory();
  };

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  $('#paintBackBtn').addEventListener('click', () => showScreen('screen-menu'));
  $('#paintSaveBtn').addEventListener('click', () => {
    carSkinCanvas.getContext('2d').clearRect(0, 0, 512, 384);
    carSkinCanvas.getContext('2d').drawImage(canvas, 0, 0);
    carState.hasCustom = true;
    selectSkinChip('custom');
    showScreen('screen-menu');
  });
}

function pushHistory() {
  const canvas = $('#paintCanvas');
  paintHistory = paintHistory.slice(0, paintHistoryIndex + 1);
  paintHistory.push(paintCtx.getImageData(0, 0, canvas.width, canvas.height));
  if (paintHistory.length > 20) paintHistory.shift();
  paintHistoryIndex = paintHistory.length - 1;
}
function undoPaint() {
  if (paintHistoryIndex <= 0) return;
  paintHistoryIndex--;
  paintCtx.putImageData(paintHistory[paintHistoryIndex], 0, 0);
}
function clearPaint() {
  const canvas = $('#paintCanvas');
  paintCtx.fillStyle = '#f2ede0';
  paintCtx.fillRect(0, 0, canvas.width, canvas.height);
  pushHistory();
}
function floodFill(x, y, hexColor) {
  const canvas = $('#paintCanvas');
  const { width, height } = canvas;
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const img = paintCtx.getImageData(0, 0, width, height);
  const data = img.data;
  const idx = (px, py) => (py * width + px) * 4;
  const target = idx(x, y);
  const tr = data[target], tg = data[target + 1], tb = data[target + 2], ta = data[target + 3];
  const fr = parseInt(hexColor.slice(1, 3), 16), fg = parseInt(hexColor.slice(3, 5), 16), fb = parseInt(hexColor.slice(5, 7), 16);
  if (tr === fr && tg === fg && tb === fb && ta === 255) return;
  const tol = 32;
  const matches = (i) => Math.abs(data[i] - tr) <= tol && Math.abs(data[i + 1] - tg) <= tol && Math.abs(data[i + 2] - tb) <= tol;
  const stack = [[x, y]];
  let guard = width * height;
  while (stack.length && guard-- > 0) {
    const [cx, cy] = stack.pop();
    if (cx < 0 || cy < 0 || cx >= width || cy >= height) continue;
    const i = idx(cx, cy);
    if (!matches(i)) continue;
    data[i] = fr; data[i + 1] = fg; data[i + 2] = fb; data[i + 3] = 255;
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  paintCtx.putImageData(img, 0, 0);
}
function openPaintEditor() {
  showScreen('screen-paint');
}

/* ---------------- CAR MESH BUILDER ---------------- */
function buildCarMesh(type, colorHex, skin) {
  const group = new THREE.Group();
  const bodyColor = new THREE.Color(skin === 'taxi' ? '#F0C020' : colorHex);
  const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.45, metalness: 0.35 });

  if (skin === 'custom' && carState.hasCustom) {
    const tex = new THREE.CanvasTexture(carSkinCanvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    bodyMat.map = tex;
    bodyMat.color.set('#ffffff');
  }

  const dims = {
    sport: { l: 4.2, w: 1.9, h: 0.85, cabinH: 0.55 },
    suv: { l: 4.4, w: 2.0, h: 1.25, cabinH: 0.85 },
    classic: { l: 4.0, w: 1.85, h: 1.0, cabinH: 0.6 },
  }[type];

  const body = new THREE.Mesh(new THREE.BoxGeometry(dims.w, dims.h, dims.l), bodyMat);
  body.position.y = dims.h / 2 + 0.35;
  group.add(body);

  const cabinMat = new THREE.MeshStandardMaterial({ color: 0x1a2430, roughness: 0.15, metalness: 0.2, transparent: true, opacity: 0.85 });
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.78, dims.cabinH, dims.l * 0.5), cabinMat);
  cabin.position.set(0, dims.h + 0.35 + dims.cabinH / 2 - 0.05, -dims.l * 0.05);
  group.add(cabin);

  // wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 16);
  const wheels = [];
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sz]) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx * (dims.w / 2 + 0.02), 0.36, sz * (dims.l / 2 - 0.6));
    group.add(wheel);
    wheels.push(wheel);
  });
  group.userData.wheels = wheels;

  // headlights
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xfff6d8, emissiveIntensity: 1.2 });
  [-1, 1].forEach((sx) => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.06), headMat);
    hl.position.set(sx * dims.w * 0.32, dims.h * 0.55 + 0.35, -dims.l / 2 - 0.02);
    group.add(hl);
    const spot = new THREE.SpotLight(0xfff2c8, 8, 22, Math.PI / 6, 0.5, 1.2);
    spot.position.copy(hl.position);
    spot.target.position.set(sx * dims.w * 0.32, 0, -dims.l / 2 - 10);
    group.add(spot, spot.target);
  });

  // taillight
  const tailMat = new THREE.MeshStandardMaterial({ color: 0xff2233, emissive: 0xff2233, emissiveIntensity: 1.4 });
  const tail = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.7, 0.14, 0.06), tailMat);
  tail.position.set(0, dims.h * 0.55 + 0.35, dims.l / 2 + 0.02);
  group.add(tail);
  const brakeLight = new THREE.PointLight(0xff2233, 0, 4);
  brakeLight.position.copy(tail.position);
  group.add(brakeLight);
  group.userData.tailMat = tailMat;
  group.userData.brakeLight = brakeLight;

  // skin extras
  if (skin === 'racing') {
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.22, 0.03, dims.l * 0.98), stripeMat);
    stripe.position.set(0, dims.h + 0.36, 0);
    group.add(stripe);
  } else if (skin === 'police') {
    const barMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.5, 0.12, 0.3), barMat);
    bar.position.set(0, dims.h + dims.cabinH + 0.42, -dims.l * 0.05);
    group.add(bar);
    const redMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x0033ff, emissive: 0x0033ff, emissiveIntensity: 1 });
    const red = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.24, 0.1, 0.24), redMat);
    const blue = new THREE.Mesh(new THREE.BoxGeometry(dims.w * 0.24, 0.1, 0.24), blueMat);
    red.position.set(-dims.w * 0.13, dims.h + dims.cabinH + 0.42, -dims.l * 0.05);
    blue.position.set(dims.w * 0.13, dims.h + dims.cabinH + 0.42, -dims.l * 0.05);
    group.add(red, blue);
    group.userData.beacons = [red, blue];
  } else if (skin === 'taxi') {
    const signMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xF0C020, emissiveIntensity: 0.6 });
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.3), signMat);
    sign.position.set(0, dims.h + dims.cabinH + 0.46, -dims.l * 0.05);
    group.add(sign);
  }

  group.userData.dims = dims;
  return group;
}

/* ---------------- TORNADO HAZARD ---------------- */
function createTornado() {
  const group = new THREE.Group();
  const funnelGeo = new THREE.CylinderGeometry(0.45, 3.0, 14, 18, 6, true);
  const funnelMat = new THREE.MeshStandardMaterial({
    color: 0xC9AA80, transparent: true, opacity: 0.55, side: THREE.DoubleSide, roughness: 1,
  });
  const funnel = new THREE.Mesh(funnelGeo, funnelMat);
  funnel.position.y = 7;
  group.add(funnel);

  const dustRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.6, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0xE3B36A, transparent: true, opacity: 0.55 })
  );
  dustRing.rotation.x = Math.PI / 2;
  dustRing.position.y = 0.25;
  group.add(dustRing);

  const pCount = 140;
  const positions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 3 + 0.4;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = Math.random() * 12;
    positions[i * 3 + 2] = Math.sin(a) * r;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x8C6A3F, size: 0.22, transparent: true, opacity: 0.85 }));
  group.add(particles);

  group.userData.funnel = funnel;
  group.userData.particles = particles;
  group.userData.dustRing = dustRing;
  return group;
}

/* ---------------- GAME ---------------- */
let renderer, scene, camera, clock;
let playerCar, road, decorPool = [], trafficPool = [], tornado;
let animFrameId = null;
let audioCtx, engineOsc, engineFilter, engineGain;

const LANE_X = [-2.6, 0, 2.6];
const ROAD_HALF_WIDTH = 4.4;

let gs; // game state

function startRace() {
  cleanupScene();
  gs = {
    running: true,
    paused: false,
    camMode: 'chase',
    speed: 6,
    maxSpeed: 34,
    steer: 0,
    playerX: 0,
    distance: 0,
    score: 0,
    braking: false,
    tornadoActive: false,
    tornadoTimer: 8 + Math.random() * 4,
    tornadoWarned: false,
    trafficTimer: 2,
  };

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xE8B77A, 20, 110);

  camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 300);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  $('#scene3d').appendChild(renderer.domElement);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(200, 16, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { top: { value: new THREE.Color(0xFBDFA0) }, bot: { value: new THREE.Color(0xF5A56B) } },
      vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vPos; uniform vec3 top; uniform vec3 bot; void main(){ float h = normalize(vPos).y * 0.5 + 0.5; gl_FragColor = vec4(mix(bot, top, h), 1.0); }`,
    })
  );
  scene.add(sky);

  scene.add(new THREE.HemisphereLight(0xFBDFA0, 0x8C6A3F, 0.65));
  const sun = new THREE.DirectionalLight(0xFFE8B0, 1.3);
  sun.position.set(-20, 30, -10);
  scene.add(sun);

  const groundMat = new THREE.MeshStandardMaterial({ color: 0xD9A05B, roughness: 1 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 400), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -100;
  scene.add(ground);

  road = buildRoadPool();
  decorPool = buildDecorPool();
  trafficPool = buildTrafficPool();
  tornado = createTornado();
  tornado.visible = false;
  scene.add(tornado);

  playerCar = buildCarMesh(carState.type, carState.color, carState.skin);
  playerCar.position.set(0, 0, 0);
  scene.add(playerCar);

  bindGameControls();
  startEngineAudio();
  onResize();
  addEventListener('resize', onResize);

  animFrameId = requestAnimationFrame(loop);
}

function buildRoadPool() {
  const segLen = 40;
  const segCount = 6;
  const mat = new THREE.MeshStandardMaterial({ color: 0x4A4038, roughness: 0.95 });
  const lineMat = new THREE.MeshStandardMaterial({ color: 0xF5EDD8, roughness: 0.6 });
  const group = new THREE.Group();
  const segs = [];
  for (let i = 0; i < segCount; i++) {
    const seg = new THREE.Group();
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_HALF_WIDTH * 2, segLen), mat);
    plane.rotation.x = -Math.PI / 2;
    seg.add(plane);
    [-1.3, 1.3].forEach((lx) => {
      for (let d = 0; d < 4; d++) {
        const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 3), lineMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(lx, 0.01, -d * 10 + segLen / 2 - 4);
        seg.add(dash);
      }
    });
    seg.position.z = -i * segLen;
    group.add(seg);
    segs.push(seg);
  }
  scene.add(group);
  return { group, segs, segLen, segCount };
}

function buildDecorPool() {
  const items = [];
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x8C6A3F, roughness: 1 });
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x6B7A3A, roughness: 1 });
  for (let i = 0; i < 24; i++) {
    const isRock = Math.random() > 0.5;
    const mesh = isRock
      ? new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.5), rockMat)
      : new THREE.Mesh(new THREE.ConeGeometry(0.35 + Math.random() * 0.3, 0.9 + Math.random() * 0.6, 6), bushMat);
    const side = i % 2 === 0 ? -1 : 1;
    mesh.position.set(side * (ROAD_HALF_WIDTH + 1.5 + Math.random() * 6), mesh.geometry.parameters.height ? mesh.geometry.parameters.height / 2 : 0.4, -Math.random() * 220);
    scene.add(mesh);
    items.push(mesh);
  }
  return items;
}

function buildTrafficPool() {
  const items = [];
  const colors = [0x2A5FA3, 0x2E7D4F, 0x3A3A3A, 0xE3B36A, 0xF5EDD8];
  for (let i = 0; i < 6; i++) {
    const car = buildCarMesh(['sport', 'suv', 'classic'][i % 3], colors[i % colors.length], 'normal');
    car.visible = false;
    car.userData.active = false;
    scene.add(car);
    items.push(car);
  }
  return items;
}

function spawnTraffic() {
  const car = trafficPool.find((c) => !c.userData.active);
  if (!car) return;
  car.userData.active = true;
  car.visible = true;
  const lane = LANE_X[Math.floor(Math.random() * 3)];
  car.position.set(lane, 0, -160 - Math.random() * 30);
  car.userData.lane = lane;
}

function bindGameControls() {
  gs.keys = {};
  gs.keyHandler = (e) => {
    gs.keys[e.key] = e.type === 'keydown';
    if (e.type === 'keydown' && (e.key === 'c' || e.key === 'C')) toggleCamera();
    if (e.type === 'keydown' && e.key === 'p') togglePause();
  };
  addEventListener('keydown', gs.keyHandler);
  addEventListener('keyup', gs.keyHandler);

  const holdBtn = (el, onFlag, offFlag) => {
    const start = (e) => { e.preventDefault(); gs.keys[onFlag] = true; };
    const end = (e) => { e.preventDefault(); gs.keys[onFlag] = false; };
    el.addEventListener('touchstart', start, { passive: false });
    el.addEventListener('touchend', end);
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', end);
    el.addEventListener('mouseleave', end);
  };
  holdBtn($('#btnLeft'), 'touchLeft');
  holdBtn($('#btnRight'), 'touchRight');
  holdBtn($('#btnBrake'), 'touchBrake');

  $('#camToggleBtn').addEventListener('click', toggleCamera);
  $('#pauseBtn').addEventListener('click', togglePause);
  $('#goRestartBtn').addEventListener('click', () => { showScreen('screen-game'); startRace(); });
  $('#goMenuBtn').addEventListener('click', () => { showScreen('screen-menu'); });
}

function toggleCamera() {
  gs.camMode = gs.camMode === 'chase' ? 'cockpit' : 'chase';
}
function togglePause() {
  gs.paused = !gs.paused;
  $('#pauseBtn').textContent = gs.paused ? '▶️' : '⏸️';
  if (engineGain) engineGain.gain.value = gs.paused ? 0 : 0.05;
}

function startEngineAudio() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    engineOsc = audioCtx.createOscillator();
    engineOsc.type = 'sawtooth';
    engineFilter = audioCtx.createBiquadFilter();
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 300;
    engineGain = audioCtx.createGain();
    engineGain.gain.value = 0.05;
    engineOsc.connect(engineFilter).connect(engineGain).connect(audioCtx.destination);
    engineOsc.start();
  } catch (err) {
    audioCtx = null;
  }
}
function stopEngineAudio() {
  if (engineOsc) { try { engineOsc.stop(); } catch (e) {} }
  if (audioCtx) { try { audioCtx.close(); } catch (e) {} }
  audioCtx = engineOsc = engineFilter = engineGain = null;
}

function loop() {
  if (!gs.running) return;
  animFrameId = requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (gs.paused) { renderer.render(scene, camera); return; }
  update(dt);
  renderer.render(scene, camera);
}

function update(dt) {
  const left = gs.keys['ArrowLeft'] || gs.keys['a'] || gs.keys['A'] || gs.keys['touchLeft'];
  const right = gs.keys['ArrowRight'] || gs.keys['d'] || gs.keys['D'] || gs.keys['touchRight'];
  gs.braking = !!(gs.keys['ArrowDown'] || gs.keys['s'] || gs.keys['S'] || gs.keys[' '] || gs.keys['touchBrake']);

  const steerTarget = (left ? -1 : 0) + (right ? 1 : 0);
  gs.steer = THREE.MathUtils.lerp(gs.steer, steerTarget, dt * 5);
  gs.playerX += gs.steer * dt * 7.5;
  gs.playerX = THREE.MathUtils.clamp(gs.playerX, -ROAD_HALF_WIDTH + 0.9, ROAD_HALF_WIDTH - 0.9);

  const targetSpeed = gs.braking ? gs.maxSpeed * 0.35 : gs.maxSpeed;
  gs.speed = THREE.MathUtils.lerp(gs.speed, targetSpeed, dt * (gs.braking ? 2.2 : 0.6));

  playerCar.position.x = gs.playerX;
  playerCar.rotation.z = -gs.steer * 0.18;
  playerCar.rotation.y = -gs.steer * 0.12;
  playerCar.userData.wheels.forEach((w) => (w.rotation.x += gs.speed * dt * 2));
  playerCar.userData.tailMat.emissiveIntensity = gs.braking ? 3 : 1.2;
  if (playerCar.userData.brakeLight) playerCar.userData.brakeLight.intensity = gs.braking ? 6 : 0;

  const moveZ = gs.speed * dt;
  gs.distance += moveZ;
  gs.score = Math.floor(gs.distance) ;

  // recycle road
  road.segs.forEach((seg) => {
    seg.position.z += moveZ;
    if (seg.position.z > road.segLen) seg.position.z -= road.segLen * road.segCount;
  });

  // recycle decor
  decorPool.forEach((d) => {
    d.position.z += moveZ;
    if (d.position.z > 15) d.position.z -= 230;
  });

  // traffic
  gs.trafficTimer -= dt;
  if (gs.trafficTimer <= 0) {
    spawnTraffic();
    gs.trafficTimer = 2.4 + Math.random() * 1.6;
  }
  trafficPool.forEach((car) => {
    if (!car.userData.active) return;
    car.position.z += moveZ * 0.72;
    car.userData.wheels.forEach((w) => (w.rotation.x += gs.speed * dt * 1.4));
    if (car.position.z > 10) { car.userData.active = false; car.visible = false; }
    else if (Math.abs(car.position.x - gs.playerX) < 1.55 && Math.abs(car.position.z) < 2.3) {
      endRace('crash');
    }
  });

  // tornado
  if (!gs.tornadoActive) {
    gs.tornadoTimer -= dt;
    if (gs.tornadoTimer <= 0) spawnTornado();
  } else {
    tornado.position.z += moveZ * 0.9;
    tornado.userData.baseX += Math.sin(gs.distance * 0.05) * dt * 1.5;
    tornado.position.x = tornado.userData.baseX;
    tornado.userData.funnel.rotation.y += dt * 6;
    tornado.userData.particles.rotation.y -= dt * 4;
    tornado.userData.dustRing.rotation.z += dt * 3;

    const ahead = -tornado.position.z + (-0); // z is negative ahead; convert to distance ahead of player at z=0
    const distAhead = -tornado.position.z;
    $('#hud-warning').style.display = distAhead < 45 && distAhead > -6 ? 'inline-block' : 'none';

    if (Math.abs(tornado.position.x - gs.playerX) < 1.9 && Math.abs(tornado.position.z) < 2.6) {
      endRace('tornado');
    } else if (tornado.position.z > 12) {
      tornado.visible = false;
      gs.tornadoActive = false;
      $('#hud-warning').style.display = 'none';
      gs.tornadoTimer = 10 + Math.random() * 6;
      gs.score += 25;
    }
  }

  if (engineGain && audioCtx) {
    engineOsc.frequency.setTargetAtTime(80 + gs.speed * 9, audioCtx.currentTime, 0.05);
    engineFilter.frequency.setTargetAtTime(250 + gs.speed * 20, audioCtx.currentTime, 0.05);
  }

  updateCamera(dt);
  updateHud();
}

function spawnTornado() {
  gs.tornadoActive = true;
  tornado.visible = true;
  tornado.userData.baseX = LANE_X[Math.floor(Math.random() * 3)];
  tornado.position.set(tornado.userData.baseX, 0, -150);
}

function updateCamera(dt) {
  if (gs.camMode === 'chase') {
    const desired = new THREE.Vector3(playerCar.position.x * 0.6, 4.2, playerCar.position.z + 8.5);
    camera.position.lerp(desired, dt * 4);
    camera.lookAt(playerCar.position.x, 1.1, playerCar.position.z - 4);
  } else {
    const dims = playerCar.userData.dims;
    const cockpitPos = new THREE.Vector3(playerCar.position.x, dims.h + 0.55, playerCar.position.z - dims.l * 0.1);
    camera.position.lerp(cockpitPos, dt * 8);
    camera.lookAt(playerCar.position.x + gs.steer * 3, dims.h + 0.3, playerCar.position.z - 20);
  }
}

function updateHud() {
  $('#hud-distance').textContent = `المسافة: ${Math.floor(gs.distance)}م`;
  $('#hud-score').textContent = `النقاط: ${gs.score}`;
  const kmh = Math.round(gs.speed * 9);
  $('#speedVal').textContent = kmh;
  const gear = kmh < 15 ? '1' : kmh < 60 ? '2' : kmh < 130 ? '3' : kmh < 220 ? '4' : '5';
  $('#gearVal').textContent = gear;
}

function onResize() {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function endRace(reason) {
  if (!gs.running) return;
  gs.running = false;
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopEngineAudio();
  removeEventListener('resize', onResize);
  removeEventListener('keydown', gs.keyHandler);
  removeEventListener('keyup', gs.keyHandler);

  const best = Math.max(gs.score, Number(localStorage.getItem('palm_racing_best') || 0));
  localStorage.setItem('palm_racing_best', String(best));

  $('#goTitle').textContent = reason === 'tornado' ? '🌪️ سحبك الإعصار!' : '💥 اصطدمتِ بسيارة!';
  $('#goDistance').textContent = `${Math.floor(gs.distance)}م`;
  $('#goScore').textContent = String(gs.score);
  $('#goBest').textContent = String(best);
  $('#bestScoreLabel').textContent = `أفضل نتيجة: ${best}`;
  showScreen('screen-gameover');
}

function cleanupScene() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  stopEngineAudio();
  removeEventListener('resize', onResize);
  if (gs && gs.keyHandler) {
    removeEventListener('keydown', gs.keyHandler);
    removeEventListener('keyup', gs.keyHandler);
  }
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
  scene = null;
}

/* ---------------- INIT ---------------- */
initMenu();
initPaint();
