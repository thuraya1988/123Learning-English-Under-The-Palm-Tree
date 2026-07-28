/* ============================================
   Card Room 3D library — walkable first-person hallway
   Model: "The Mansion interiors" (sketchfab.com/3d-models/the-mansion-interiors-a6a788778bb047929c69a09621099e29)
   by Veterock (sketchfab.com/windofglass), licensed CC-BY-4.0.

   اللاعب فعليًا يمشي داخل الردهة (مو خلفية زخرفية خلف قائمة مسطحة) —
   WASD/أسهم + سحب للنظر (بدون كاميرا ولا تتبع يد، بناءً على الملاحظات)،
   وثلاث هوت سبوتات مضيئة بالردهة توديه للكروت/الستارة/البورتال بالتسلسل.
   ============================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const canvas = document.getElementById('mansion-bg');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f140a);
// ضباب أبعد (كان يقطع الرؤية عند ٥٥ وحدة بس) — حتى تبين الردهة ممتدة وفيها
// أكثر من غرفة وحدة، مو تحس إنها صندوق مقفول
scene.fog = new THREE.Fog(0x1f140a, 10, 95);

const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.05, 300);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

scene.add(new THREE.AmbientLight(0xd4c5a9, 1.9));
const keyLight = new THREE.DirectionalLight(0xffe0b0, 1.3);
keyLight.position.set(10, 20, 20);
scene.add(keyLight);
const rimLight = new THREE.PointLight(0x8b1a3a, 2.5, 60);
rimLight.position.set(-10, 5, -40);
scene.add(rimLight);
// إضاءة متحركة تتبع اللاعب — الردهة عميقة والضباب البعيد يبلعها بدونها
const torch = new THREE.PointLight(0xffcf9e, 1.4, 14);
scene.add(torch);

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
loader.load('assets/mansion-interiors.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, () => { /* still walkable (empty hallway) without the model if this fails to load */ });

// ===================== الردهة القابلة للمشي فيها =====================
// تأكدنا فيزيائيًا (raycast) إن فيه ردهة خشبية ضيقة بعرض ~١.٧ وحدة، أرضيتها
// y=0، تمتد من z=-140 إلى z=+15 تقريبًا — هذا هو المسار المسموح للاعب يمشي فيه
const EYE_HEIGHT = 1.6;
const BOUNDS = { xMin: -0.65, xMax: 0.65, zMin: -138, zMax: 13 };
camera.position.set(0, EYE_HEIGHT, -115);

// ===================== الهوت سبوتات الثلاثة =====================
const STAGES = ['hotspot1', 'hotspot2', 'hotspot3'];
const HOTSPOT_DEFS = [
  { stage: 'hotspot1', pos: [0, 1.5, -97], icon: '🃏', label: 'Cards' },
  { stage: 'hotspot2', pos: [-0.5, 1.3, -45], icon: '🧵', label: 'Curtain' },
  { stage: 'hotspot3', pos: [0.5, 1.3, 6], icon: '🕳️', label: 'Portal' },
];

function makeLabelSprite(text) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(10,8,13,0.0)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.font = 'bold 40px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#00d4aa';
  ctx.shadowColor = 'rgba(0,212,170,0.9)';
  ctx.shadowBlur = 14;
  ctx.fillText(text, c.width / 2, c.height / 2);
  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.4, 0.7, 1);
  return sprite;
}

// كانت الهوت سبوتات صغيرة (نصف قطر ٠.١٦) وما فيه أي طريقة تضغطونها غير زر
// يدوي منفصل — الحين أكبر، وتنضغط باللمس/الكليك مباشرة عليها (نطاق تسامح كبير)
const hotspots = HOTSPOT_DEFS.map((def, i) => {
  const group = new THREE.Group();
  group.position.set(def.pos[0], def.pos[1], def.pos[2]);

  const geo = new THREE.IcosahedronGeometry(0.32, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x00d4aa, emissive: 0x00d4aa, emissiveIntensity: 1.2,
    roughness: 0.3, transparent: true, opacity: 0.95
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  const glow = new THREE.PointLight(0x00d4aa, 2.2, 8);
  group.add(glow);

  const label = makeLabelSprite(String(i + 1));
  label.position.set(0, 0.6, 0);
  group.add(label);

  group.visible = false;
  scene.add(group);
  return { def, group, mesh, glow, t: Math.random() * 10 };
});

function refreshHotspots() {
  const stage = sessionStorage.getItem('palmtree_stage') || 'hotspot1';
  hotspots.forEach(h => { h.group.visible = h.def.stage === stage; });
}
refreshHotspots();
window.libraryRefreshHotspots = refreshHotspots;

function activeHotspot() {
  return hotspots.find(h => h.group.visible) || null;
}

// ===================== الإدخال (لمس/كيبورد) — بدون كاميرا ولا تتبع يد =====================
const keys = {};
const touchMove = {};
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') tryInteract();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

function setupTouchBtn(id, code) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const on = (ev) => { ev.preventDefault(); touchMove[code] = true; };
  const off = (ev) => { ev.preventDefault(); touchMove[code] = false; };
  btn.addEventListener('touchstart', on, { passive: false });
  btn.addEventListener('touchend', off);
  btn.addEventListener('mousedown', on);
  btn.addEventListener('mouseup', off);
}
setupTouchBtn('lib-up', 'KeyW');
setupTouchBtn('lib-down', 'KeyS');
setupTouchBtn('lib-left', 'KeyA');
setupTouchBtn('lib-right', 'KeyD');
document.getElementById('lib-interact')?.addEventListener('touchstart', (e) => { e.preventDefault(); tryInteract(); });
document.getElementById('lib-interact')?.addEventListener('click', () => tryInteract());
function isDown(code) { return !!(keys[code] || touchMove[code]); }

// نظرة حرة — سحب بالماوس (قفل مؤشر بالديسكتوب) أو باللمس بالجوال، بدون كاميرا حقيقية
// السبب الحقيقي إن الهوت سبوت ما كان يبين: هوت سبوت ١ عند z=-98 وهو أكبر من
// نقطة بداية اللاعب z=-108 — يعني هوت سبوت ١ كان خلف اللاعب فعليًا عند yaw=0
// (الأمام = z أصغر)، لازم يلتفت بالكامل عشان يشوفه. نبدأ الآن ملتفتين نحوه مباشرة
let yaw = Math.PI, pitch = 0;
const LOOK_SENS = 0.0028, TOUCH_LOOK_SENS = 0.0048;
let dragDist = 0; // نفرّق بين لمسة/كليك ثابتة (نعتبرها ضغطة) وسحب حقيقي للنظر

// الضغط/اللمس مباشرة على الرقم المضيء يفعّل التفاعل — بدل ما يعتمد بس على
// زر منفصل صغير. نستخدم مسافة على الشاشة (مو raycast دقيق) عشان يكون فيه
// تسامح كبير باللمس على الجوال
function tryHotspotTap(clientX, clientY) {
  const h = activeHotspot();
  if (!h) return false;
  const rect = canvas.getBoundingClientRect();
  const v = h.group.position.clone().project(camera);
  if (v.z > 1) return false; // خلف الكاميرا
  const sx = (v.x * 0.5 + 0.5) * rect.width + rect.left;
  const sy = (-v.y * 0.5 + 0.5) * rect.height + rect.top;
  const dist = Math.hypot(clientX - sx, clientY - sy);
  if (dist < 70) { tryInteract(); return true; }
  return false;
}

canvas.addEventListener('click', (e) => {
  if (dragDist < 12 && tryHotspotTap(e.clientX, e.clientY)) return;
  if (!('ontouchstart' in window) && document.pointerLockElement !== canvas) canvas.requestPointerLock();
});
document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === canvas) {
    yaw -= e.movementX * LOOK_SENS;
    pitch -= e.movementY * LOOK_SENS;
    pitch = Math.max(-0.9, Math.min(0.9, pitch));
  }
});
const lookTouch = { id: null, lastX: 0, lastY: 0 };
canvas.addEventListener('touchstart', (e) => {
  // ما نستخدم لمسات على أزرار المشي/التفاعل كنظرة
  if (e.target.closest('.lib-btn')) return;
  if (lookTouch.id !== null) return;
  const t = e.changedTouches[0];
  lookTouch.id = t.identifier; lookTouch.lastX = t.clientX; lookTouch.lastY = t.clientY;
  dragDist = 0;
}, { passive: true });
canvas.addEventListener('touchmove', (e) => {
  for (const t of e.changedTouches) {
    if (t.identifier === lookTouch.id) {
      const dx = t.clientX - lookTouch.lastX, dy = t.clientY - lookTouch.lastY;
      yaw -= dx * TOUCH_LOOK_SENS;
      pitch -= dy * TOUCH_LOOK_SENS;
      pitch = Math.max(-0.9, Math.min(0.9, pitch));
      dragDist += Math.hypot(dx, dy);
      lookTouch.lastX = t.clientX; lookTouch.lastY = t.clientY;
    }
  }
}, { passive: true });
canvas.addEventListener('touchend', (e) => {
  for (const t of e.changedTouches) { if (t.identifier === lookTouch.id) lookTouch.id = null; }
});

function tryInteract() {
  const h = activeHotspot();
  if (!h) return;
  const d = camera.position.distanceTo(h.group.position);
  if (d < 3) {
    window.libraryEnterHotspot?.(h.def.stage);
  }
}

const velocity = new THREE.Vector3();
let lastTime = performance.now();
const promptEl = document.getElementById('lib-prompt');

// كان الحلقة تكمل تشتغل بالخلفية حتى بعد فتح شاشة الكروت المسطحة (٢D) —
// فتلمّح "اضغطوا E" ترجع تبين فوق شاشة القراءة لأن الحلقة نفسها تعيد إظهارها
// كل فريم حسب المسافة، بدون ما تعرف إن المشهد الثلاثي مو ظاهر أصلاً
let libraryActive = true;
window.libraryPause = () => { libraryActive = false; promptEl?.classList.add('hidden'); };
window.libraryResume = () => { libraryActive = true; };

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  if (!libraryActive) { renderer.render(scene, camera); return; }

  const fwd = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(fwd.z, 0, -fwd.x);
  const move = new THREE.Vector3();
  if (isDown('KeyW') || isDown('ArrowUp')) move.add(fwd);
  if (isDown('KeyS') || isDown('ArrowDown')) move.sub(fwd);
  if (isDown('KeyD') || isDown('ArrowRight')) move.add(right);
  if (isDown('KeyA') || isDown('ArrowLeft')) move.sub(right);

  if (move.lengthSq() > 0) move.normalize().multiplyScalar(2.6);
  velocity.x += (move.x - velocity.x) * 0.2;
  velocity.z += (move.z - velocity.z) * 0.2;

  const nextX = camera.position.x + velocity.x * dt;
  const nextZ = camera.position.z + velocity.z * dt;
  camera.position.x = Math.max(BOUNDS.xMin, Math.min(BOUNDS.xMax, nextX));
  camera.position.z = Math.max(BOUNDS.zMin, Math.min(BOUNDS.zMax, nextZ));

  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;

  torch.position.set(camera.position.x, camera.position.y + 0.3, camera.position.z);

  hotspots.forEach(h => {
    h.t += dt;
    h.mesh.rotation.y += dt * 0.6;
    const pulse = 1 + Math.sin(h.t * 2.4) * 0.18;
    h.mesh.scale.setScalar(pulse);
    h.glow.intensity = 1.1 + Math.sin(h.t * 2.4) * 0.5;
  });

  const active = activeHotspot();
  if (active && promptEl) {
    const d = camera.position.distanceTo(active.group.position);
    promptEl.classList.toggle('hidden', d >= 3);
  }

  renderer.render(scene, camera);
}
requestAnimationFrame(animate);
