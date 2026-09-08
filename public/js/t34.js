/* T-34/85 — الدبّابةُ المعتمَدة، مبنيّةٌ بالشفرة لا بملفِّ مجسّم.
 *
 * أرسلتْها ثريّا صفحةً قائمةً بذاتها، فنُقلت هنا وحدةً مشترَكة ليقرأها
 * العارضُ واللعبةُ معًا، فلا تُكتَب مرّتين ولا تفترقان.
 *
 *   import { buildT34 } from './public/js/t34.js';
 *   const tank = buildT34(THREE, { mergeGeometries, facing:-1, scale:0.62 });
 *   scene.add(tank);
 *   tank.userData.turret.rotation.y = …;   // البرج يدور
 *   tank.userData.gun.rotation.x    = …;   // والمدفع يرتفع
 *
 * facing: ‎+1‎ فوّهةُ المدفع نحو ‎+Z‎ (كما في صفحتها)، و‎-1‎ نحو ‎-Z‎
 * (كما تتوقّعه لعبةُ «مهمّة سمائل»). scale: يُصغَّر بها الطولُ كلُّه.
 */

/* ============ التكسية: تُرسَم ولا تُحمَّل، فلا ملفَّ ولا انتظار ============ */
function canvasTexture(THREE, size, painter, repeat, aniso) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  painter(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  if (aniso) t.anisotropy = aniso;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };

function mottle(g, s, n, r0, r1, cols, a0, a1) {
  for (let i = 0; i < n; i++) {
    const x = Math.random() * s, y = Math.random() * s, r = r0 + Math.random() * (r1 - r0);
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    const c = cols[(Math.random() * cols.length) | 0];
    gr.addColorStop(0, hexA(c, a0 + Math.random() * (a1 - a0)));
    gr.addColorStop(1, hexA(c, 0));
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
}
function speckle(g, s, n, cols, a0, a1, sz0, sz1) {
  for (let i = 0; i < n; i++) {
    g.globalAlpha = a0 + Math.random() * (a1 - a0);
    g.fillStyle = cols[(Math.random() * cols.length) | 0];
    const w = sz0 + Math.random() * (sz1 - sz0);
    g.fillRect(Math.random() * s, Math.random() * s, w, w * (0.6 + Math.random() * 0.8));
  }
  g.globalAlpha = 1;
}
function scratches(g, s, n, col, a0, a1, l0, l1, w) {
  g.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    g.strokeStyle = col; g.globalAlpha = a0 + Math.random() * (a1 - a0); g.lineWidth = w || 1;
    const x = Math.random() * s, y = Math.random() * s, an = Math.random() * Math.PI * 2;
    const l = l0 + Math.random() * (l1 - l0);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * l, y + Math.sin(an) * l); g.stroke();
  }
  g.globalAlpha = 1;
}
function chipsPaint(g, s, n) {
  for (let i = 0; i < n; i++) {
    const x = Math.random() * s, y = Math.random() * s;
    g.fillStyle = Math.random() < 0.45 ? 'rgba(124,88,52,0.9)' : 'rgba(162,156,138,0.95)';
    const k = 1 + (Math.random() * 3 | 0);
    for (let j = 0; j < k; j++) {
      g.beginPath();
      g.arc(x + (Math.random() * 8 - 4), y + (Math.random() * 8 - 4), 0.8 + Math.random() * 2.6, 0, 6.283);
      g.fill();
    }
  }
}
const paintOlive = (g, s) => {
  g.fillStyle = '#59613e'; g.fillRect(0, 0, s, s);
  mottle(g, s, 26, 50, 150, ['#767e52', '#3d4430', '#68714a', '#4a5236'], 0.10, 0.22);
  speckle(g, s, 7000, ['#6b734b', '#494f35', '#7b8357', '#3f4631', '#5d6544'], 0.04, 0.14, 1, 2.2);
  scratches(g, s, 55, 'rgba(200,196,178,1)', 0.10, 0.35, 8, 46, 1);
  scratches(g, s, 30, 'rgba(28,30,22,1)', 0.10, 0.28, 6, 34, 1);
  chipsPaint(g, s, 46);
  mottle(g, s, 10, 20, 60, ['#3a352a', '#2f2b22'], 0.08, 0.16);
};
const paintCast = (g, s) => {
  g.fillStyle = '#545c3a'; g.fillRect(0, 0, s, s);
  mottle(g, s, 70, 8, 34, ['#6d7550', '#3c4330', '#7c8459', '#474f35'], 0.12, 0.26);
  mottle(g, s, 18, 40, 120, ['#616a44', '#383f2c'], 0.10, 0.18);
  speckle(g, s, 6000, ['#676f49', '#434a33', '#757d53', '#4e5638'], 0.05, 0.16, 1, 2);
  scratches(g, s, 35, 'rgba(198,194,176,1)', 0.08, 0.28, 6, 36, 1);
  chipsPaint(g, s, 30);
  scratches(g, s, 14, 'rgba(30,33,24,1)', 0.10, 0.2, 20, 70, 2.5);
};
const paintRust = (g, s) => {
  g.fillStyle = '#453829'; g.fillRect(0, 0, s, s);
  mottle(g, s, 40, 25, 95, ['#5d452e', '#6e4a2a', '#33271c', '#77502f', '#8a5a33', '#4c3a28'], 0.16, 0.34);
  speckle(g, s, 9000, ['#5d452e', '#6e4a2a', '#33271c', '#96683c', '#77502f', '#3d2f21'], 0.06, 0.22, 1, 2.4);
  scratches(g, s, 50, 'rgba(168,150,120,1)', 0.08, 0.26, 6, 40, 1);
  speckle(g, s, 800, ['#a9713c', '#b98049'], 0.10, 0.30, 1, 1.8);
  mottle(g, s, 14, 15, 50, ['#241c14'], 0.12, 0.24);
};
const paintRubber = (g, s) => {
  g.fillStyle = '#242629'; g.fillRect(0, 0, s, s);
  speckle(g, s, 2600, ['#2e3134', '#1a1c1f', '#34373b'], 0.10, 0.30, 1, 2);
  scratches(g, s, 20, 'rgba(90,94,98,1)', 0.06, 0.16, 5, 26, 1);
};
const paintGrille = (g, s) => {
  g.fillStyle = '#39402c'; g.fillRect(0, 0, s, s);
  g.fillStyle = '#171b12';
  for (let y = 8; y < s; y += 22) g.fillRect(6, y, s - 12, 9);
  speckle(g, s, 1500, ['#4a5238', '#2c3222', '#5d6544'], 0.08, 0.20, 1, 2);
};

/* ============ بناءُ الدبّابة ============ */
export function buildT34(THREE, opts = {}) {
  const { mergeGeometries, facing = 1, scale = 1, anisotropy = 4 } = opts;
  if (!mergeGeometries) throw new Error('buildT34: مرّري mergeGeometries من BufferGeometryUtils');

  const tex = f => canvasTexture(THREE, 512, f, null, anisotropy);
  const texOlive = tex(paintOlive), texCast = tex(paintCast), texRust = tex(paintRust);
  const texRubber = canvasTexture(THREE, 256, paintRubber, null, anisotropy);
  const texGrille = canvasTexture(THREE, 256, paintGrille, [1.5, 2.5], anisotropy);

  const mats = [];
  const mat = o => { const m = new THREE.MeshStandardMaterial(o); m.envMapIntensity = 0.5; mats.push(m); return m; };
  const matOlive      = mat({ map: texOlive, bumpMap: texOlive, bumpScale: 0.05, roughness: 0.82, metalness: 0.12 });
  const matCast       = mat({ map: texCast, bumpMap: texCast, bumpScale: 0.09, roughness: 0.86, metalness: 0.10 });
  const matRust       = mat({ map: texRust, bumpMap: texRust, bumpScale: 0.12, roughness: 0.95, metalness: 0.22 });
  const matRubber     = mat({ map: texRubber, bumpMap: texRubber, bumpScale: 0.03, roughness: 0.96, metalness: 0.0 });
  const matWheelOlive = mat({ map: texOlive, bumpMap: texOlive, bumpScale: 0.05, roughness: 0.85, metalness: 0.12, color: 0xb8ae94 });
  const matGrille     = mat({ map: texGrille, bumpMap: texGrille, bumpScale: 0.05, roughness: 0.9, metalness: 0.15 });
  const matDark       = mat({ color: 0x2b2d26, roughness: 0.9, metalness: 0.15 });
  const matDarkSteel  = mat({ color: 0x3c403a, roughness: 0.55, metalness: 0.5 });
  const matWood       = mat({ color: 0x6b5236, roughness: 0.9, metalness: 0.0 });
  const matLens       = mat({ color: 0xdbcdbd, emissive: 0x947450, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.1 });
  const matGlass      = mat({ color: 0x1c2420, roughness: 0.15, metalness: 0.5 });
  const matBore       = mat({ color: 0x0e100d, roughness: 1.0, metalness: 0.0 });

  const root = new THREE.Group();      /* يحمل المقياسَ والاتّجاه */
  const tank = new THREE.Group();      /* الهيكلُ بإحداثيّاته الأصليّة */
  root.add(tank);

  const addMesh = (geo, m, x, y, z, rx, ry, rz, parent) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    if (rx || ry || rz) o.rotation.set(rx || 0, ry || 0, rz || 0);
    o.castShadow = true; o.receiveShadow = true;
    (parent || tank).add(o); return o;
  };
  const addBox = (w, h, d, m, x, y, z, rx = 0, ry = 0, rz = 0, p) =>
    addMesh(new THREE.BoxGeometry(w, h, d), m, x, y, z, rx, ry, rz, p);
  const addCyl = (rt, rb, h, m, x, y, z, rx = 0, ry = 0, rz = 0, seg = 24, p) =>
    addMesh(new THREE.CylinderGeometry(rt, rb, h, seg), m, x, y, z, rx, ry, rz, p);
  const addSphere = (r, m, x, y, z, rx = 0, ry = 0, rz = 0, p, ws = 32, hs = 20) =>
    addMesh(new THREE.SphereGeometry(r, ws, hs), m, x, y, z, rx, ry, rz, p);
  const addTorus = (R, tube, m, x, y, z, rx = 0, ry = 0, rz = 0, p) =>
    addMesh(new THREE.TorusGeometry(R, tube, 10, 36), m, x, y, z, rx, ry, rz, p);
  const addCircle = (r, m, x, y, z, p) =>
    addMesh(new THREE.CircleGeometry(r, 28), m, x, y, z, 0, 0, 0, p);
  const plate = (w, th, yA, zA, yB, zB, m, x = 0) => {
    const dy = yB - yA, dz = zB - zA;
    return addMesh(new THREE.BoxGeometry(w, th, Math.hypot(dy, dz)), m,
      x, (yA + yB) / 2, (zA + zB) / 2, -Math.atan2(dy, dz), 0, 0);
  };

  /* ---- الهيكلُ والدروع ---- */
  addBox(2.46, 0.55, 5.2, matRust, 0, 0.955, 0);
  addBox(2.40, 0.45, 4.4, matOlive, 0, 1.455, -0.2);
  plate(2.4, 0.08, 1.68, 2.05, 1.16, 2.95, matOlive);
  plate(2.4, 0.08, 1.16, 2.95, 0.68, 2.55, matOlive);
  plate(2.4, 0.08, 1.68, -2.45, 1.05, -2.95, matOlive);
  plate(2.4, 0.08, 1.05, -2.95, 0.68, -2.55, matRust);
  addBox(2.4, 0.06, 1.55, matOlive, 0, 1.71, -1.68);

  for (const s of [-1, 1]) {                       /* رفارف */
    addBox(0.6, 0.045, 6.0, matOlive, s * 1.32, 1.42, 0);
    plate(0.6, 0.04, 1.42, 3.0, 1.12, 3.32, matOlive, s * 1.32);
    plate(0.6, 0.04, 1.42, -3.0, 1.14, -3.32, matOlive, s * 1.32);
  }
  addBox(0.52, 0.035, 0.85, matGrille, -0.55, 1.755, -1.7);
  addBox(0.52, 0.035, 0.85, matGrille, 0.55, 1.755, -1.7);
  addCyl(0.13, 0.13, 0.07, matDark, 0, 1.775, -1.25, 0, 0, 0, 20);
  addCyl(0.24, 0.24, 0.045, matOlive, 0, 1.765, -2.1, 0, 0, 0, 28);

  const hatch = new THREE.Group();                 /* فتحةُ السائق */
  hatch.position.set(0.55, 1.43, 2.57); hatch.rotation.x = 0.524; tank.add(hatch);
  addCyl(0.31, 0.31, 0.05, matOlive, 0, 0.01, 0, 0, 0, 0, 32, hatch);
  addCyl(0.28, 0.28, 0.04, matOlive, 0, 0.05, 0, 0, 0, 0, 32, hatch);
  addBox(0.16, 0.06, 0.12, matDark, 0, 0.08, 0.16, 0, 0, 0, hatch);
  addBox(0.12, 0.035, 0.02, matGlass, 0, 0.08, 0.225, 0, 0, 0, hatch);
  addBox(0.05, 0.03, 0.14, matDarkSteel, 0.13, 0.075, -0.06, 0, 0, 0, hatch);

  addSphere(0.085, matCast, -0.55, 1.41, 2.615);   /* رشّاشُ الهيكل */
  {
    const dir = new THREE.Vector3(0, -0.5, 0.866).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const b = addCyl(0.02, 0.02, 0.42, matDark, 0, 0, 0, 0, 0, 0, 14);
    b.position.set(-0.55, 1.41, 2.615).addScaledVector(dir, 0.24);
    b.quaternion.copy(q);
  }
  {                                                /* الكشّاف */
    const lamp = new THREE.Group();
    const n = new THREE.Vector3(0, -0.77, 0.64).normalize();
    lamp.position.set(0.72, 0.906, 2.80);
    lamp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    tank.add(lamp);
    addBox(0.07, 0.12, 0.06, matDarkSteel, 0, 0, -0.05, 0, 0, 0, lamp);
    addCyl(0.088, 0.094, 0.08, matOlive, 0, 0, 0.01, Math.PI / 2, 0, 0, 24, lamp);
    addTorus(0.085, 0.011, matDarkSteel, 0, 0, 0.05, 0, 0, 0, lamp);
    addCircle(0.074, matLens, 0, 0, 0.052, lamp);
  }
  addBox(0.05, 0.08, 0.10, matDarkSteel, 0.85, 0.80, 2.78);
  addBox(0.05, 0.08, 0.10, matDarkSteel, -0.85, 0.80, 2.78);
  addBox(0.17, 0.025, 0.26, matDarkSteel, -1.32, 1.455, 0.95);
  addCyl(0.014, 0.014, 0.70, matWood, -1.32, 1.455, 1.55, Math.PI / 2, 0, 0, 10);
  addBox(0.05, 0.10, 0.03, matDarkSteel, 1.32, 1.47, 0.75);
  addCyl(0.013, 0.013, 0.60, matWood, 1.32, 1.455, 1.15, Math.PI / 2, 0, 0, 10);
  addBox(0.34, 0.14, 0.44, matOlive, 1.33, 1.51, -2.30);

  for (const s of [-1, 1]) {                       /* خزّاناتُ الوقود */
    addCyl(0.26, 0.26, 1.0, matOlive, s * 0.8, 1.99, -2.15, Math.PI / 2, 0, 0, 28);
    addTorus(0.268, 0.014, matDark, s * 0.8, 1.99, -1.90);
    addTorus(0.268, 0.014, matDark, s * 0.8, 1.99, -2.40);
    addTorus(0.255, 0.012, matDark, s * 0.8, 1.99, -1.66);
    addTorus(0.255, 0.012, matDark, s * 0.8, 1.99, -2.64);
    addCyl(0.055, 0.055, 0.05, matDark, s * 0.8, 2.27, -1.95, 0, 0, 0, 14);
    addBox(0.10, 0.34, 0.12, matDark, s * 0.8, 1.83, -1.85);
    addBox(0.10, 0.34, 0.12, matDark, s * 0.8, 1.83, -2.45);
  }

  /* ---- البرج ---- */
  const turret = new THREE.Group();
  turret.position.set(0, 1.64, 0.1);
  tank.add(turret);
  const profile = [[0.05, 0.00], [0.55, 0.00], [0.86, 0.06], [0.95, 0.18], [0.92, 0.34],
    [0.80, 0.50], [0.60, 0.62], [0.35, 0.70], [0.00, 0.73]].map(p => new THREE.Vector2(p[0], p[1]));
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 48), matCast);
  body.scale.set(1, 1, 1.18); body.castShadow = body.receiveShadow = true;
  turret.add(body);
  const bustle = addSphere(1, matCast, 0, 0.38, -0.95, 0, 0, 0, turret);
  bustle.scale.set(0.62, 0.34, 0.45);
  addBox(0.86, 0.62, 0.44, matCast, 0, 0.38, 1.26, 0, 0, 0, turret);
  addCyl(0.32, 0.34, 0.86, matCast, 0, 0.38, 1.30, 0, 0, Math.PI / 2, 24, turret);

  /* ---- مدفع ٨٥ ملم ---- */
  const gun = new THREE.Group();
  gun.position.set(0, 0.38, 1.35);
  turret.add(gun);
  addCyl(0.095, 0.105, 0.75, matOlive, 0, 0, 0.42, Math.PI / 2, 0, 0, 24, gun);
  addCyl(0.055, 0.072, 2.95, matOlive, 0, 0, 2.27, Math.PI / 2, 0, 0, 24, gun);
  addCyl(0.074, 0.074, 0.13, matOlive, 0, 0, 3.80, Math.PI / 2, 0, 0, 24, gun);
  addTorus(0.064, 0.011, matDarkSteel, 0, 0, 3.70, 0, 0, 0, gun);
  addCircle(0.054, matBore, 0, 0, 3.868, gun);
  addCyl(0.02, 0.02, 0.60, matDark, 0.24, 0.38, 1.72, Math.PI / 2, 0, 0, 14, turret);

  /* ---- قبّةُ القائد ورشّاشُها ---- */
  const cup = new THREE.Group(); cup.position.set(-0.45, 0, -0.35); turret.add(cup);
  addCyl(0.26, 0.27, 0.24, matCast, 0, 0.78, 0, 0, 0, 0, 28, cup);
  addTorus(0.252, 0.013, matDark, 0, 0.865, 0, Math.PI / 2, 0, 0, cup);
  const dome = addSphere(0.255, matCast, 0, 0.90, 0, 0, 0, 0, cup); dome.scale.set(1, 0.5, 1);
  const dt = new THREE.Group(); dt.position.set(-0.45, 0.95, -0.62); dt.rotation.set(-0.5, -0.35, 0);
  turret.add(dt);
  addCyl(0.02, 0.02, 0.16, matDarkSteel, 0, -0.06, 0, 0, 0, 0, 12, dt);
  addBox(0.055, 0.07, 0.36, matDark, 0, 0.02, 0.05, 0, 0, 0, dt);
  addCyl(0.017, 0.017, 0.50, matDark, 0, 0.02, 0.42, Math.PI / 2, 0, 0, 12, dt);
  addCyl(0.011, 0.021, 0.09, matDark, 0, 0.02, 0.70, Math.PI / 2, 0, 0, 12, dt);
  addCyl(0.085, 0.085, 0.035, matDark, 0, 0.085, 0.02, 0, 0, 0, 20, dt);
  addBox(0.04, 0.05, 0.16, matWood, 0, 0.005, -0.19, 0.15, 0, 0, dt);
  addCyl(0.30, 0.30, 0.07, matCast, 0.50, 0.68, -0.30, 0, 0, 0, 28, turret);
  addCyl(0.27, 0.27, 0.05, matOlive, 0.50, 0.735, -0.30, 0, 0, 0, 28, turret);
  addBox(0.05, 0.03, 0.12, matDarkSteel, 0.62, 0.77, -0.30, 0, 0, 0, turret);
  addCyl(0.21, 0.21, 0.05, matOlive, 0.30, 0.66, 0.55, 0, 0, 0, 24, turret);
  addCyl(0.028, 0.032, 0.06, matDark, 0.58, 0.56, -0.72, 0, 0, 0, 12, turret);
  addCyl(0.005, 0.005, 0.95, matDark, 0.66, 1.02, -0.79, -0.18, 0, -0.22, 8, turret);
  addBox(0.07, 0.06, 0.16, matDarkSteel, 0.88, 0.42, 0.25, 0, 0.5, 0, turret);
  addBox(0.07, 0.06, 0.16, matDarkSteel, -0.88, 0.42, 0.25, 0, -0.5, 0, turret);

  /* ---- الجنازير والعجلات ---- */
  const axisX = g => { g.rotateZ(Math.PI / 2); return g; };
  const wheelSteelGeo = mergeGeometries([
    axisX(new THREE.CylinderGeometry(0.42, 0.42, 0.055, 28)).translate(0.062, 0, 0),
    axisX(new THREE.CylinderGeometry(0.42, 0.42, 0.055, 28)).translate(-0.062, 0, 0),
    axisX(new THREE.CylinderGeometry(0.135, 0.135, 0.17, 20)),
    axisX(new THREE.CylinderGeometry(0.05, 0.125, 0.06, 16)).translate(0.115, 0, 0),
    new THREE.TorusGeometry(0.29, 0.02, 8, 28).rotateY(Math.PI / 2).translate(0.092, 0, 0),
    new THREE.TorusGeometry(0.29, 0.02, 8, 28).rotateY(Math.PI / 2).translate(-0.092, 0, 0)
  ]);
  const wheelRubberGeo = axisX(new THREE.CylinderGeometry(0.365, 0.365, 0.10, 28));
  const wheelPos = [];
  for (const s of [-1, 1]) for (const z of [-2.3, -1.15, 0, 1.15, 2.3, 3.05])
    wheelPos.push(new THREE.Vector3(s * 1.28, 0.42, z));
  const wheelSteel = new THREE.InstancedMesh(wheelSteelGeo, matWheelOlive, wheelPos.length);
  const wheelRubber = new THREE.InstancedMesh(wheelRubberGeo, matRubber, wheelPos.length);
  const dummy = new THREE.Object3D(), tint = new THREE.Color();
  wheelPos.forEach((p, i) => {
    dummy.position.copy(p); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
    wheelSteel.setMatrixAt(i, dummy.matrix); wheelRubber.setMatrixAt(i, dummy.matrix);
    tint.setHSL(0.10, 0.12, 0.78 + Math.random() * 0.17); wheelSteel.setColorAt(i, tint);
  });
  wheelSteel.instanceMatrix.needsUpdate = wheelRubber.instanceMatrix.needsUpdate = true;
  if (wheelSteel.instanceColor) wheelSteel.instanceColor.needsUpdate = true;
  wheelSteel.castShadow = wheelSteel.receiveShadow = true;
  wheelRubber.castShadow = wheelRubber.receiveShadow = true;
  tank.add(wheelSteel, wheelRubber);

  {                                                /* العجلةُ المسنّنة */
    const teeth = [];
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2;
      const g = new THREE.BoxGeometry(0.06, 0.12, 0.055);
      g.applyMatrix4(new THREE.Matrix4().makeRotationX(a)
        .multiply(new THREE.Matrix4().makeTranslation(0, 0.375, 0)));
      teeth.push(g);
    }
    const sprocketGeo = mergeGeometries([
      axisX(new THREE.CylinderGeometry(0.33, 0.33, 0.10, 24)),
      axisX(new THREE.CylinderGeometry(0.12, 0.12, 0.17, 16)),
      axisX(new THREE.CylinderGeometry(0.05, 0.11, 0.05, 12)).translate(0.10, 0, 0),
      ...teeth
    ]);
    for (const s of [-1, 1]) {
      const m = new THREE.Mesh(sprocketGeo, matRust);
      m.position.set(s * 1.28, 0.42, -3.05);
      m.castShadow = m.receiveShadow = true;
      tank.add(m);
    }
  }

  const trackPts = [
    [3.52, 0.42], [3.38, 0.75], [3.05, 0.90], [2.20, 0.91], [1.20, 0.895],
    [0.00, 0.89], [-1.20, 0.895], [-2.20, 0.91], [-3.05, 0.90], [-3.38, 0.75],
    [-3.52, 0.42], [-3.30, 0.10], [-2.20, 0.055], [-1.10, 0.045], [0.00, 0.04],
    [1.10, 0.045], [2.20, 0.055], [3.30, 0.10]
  ].map(p => new THREE.Vector3(0, p[1], p[0]));
  const curve = new THREE.CatmullRomCurve3(trackPts, true, 'catmullrom', 0.5);
  const perim = curve.getLength();
  const NLINKS = Math.round(perim / 0.175);
  const pitch = perim / NLINKS;
  const linkGeo = mergeGeometries([
    new THREE.BoxGeometry(0.46, 0.055, pitch * 1.04),
    new THREE.BoxGeometry(0.46, 0.05, 0.04).translate(0, -0.05, pitch * 0.25),
    new THREE.BoxGeometry(0.06, 0.11, 0.085).translate(0, 0.08, 0),
    new THREE.BoxGeometry(0.05, 0.08, pitch * 0.9).translate(0.255, -0.008, 0),
    new THREE.BoxGeometry(0.05, 0.08, pitch * 0.9).translate(-0.255, -0.008, 0)
  ]);
  const XB = new THREE.Vector3(1, 0, 0);
  const tracks = [];
  for (const s of [-1, 1]) {
    const inst = new THREE.InstancedMesh(linkGeo, matRust, NLINKS);
    for (let i = 0; i < NLINKS; i++) {
      const u = i / NLINKS;
      const p = curve.getPointAt(u), tg = curve.getTangentAt(u).normalize();
      const YB = new THREE.Vector3().crossVectors(tg, XB);
      dummy.position.set(s * 1.28, p.y, p.z);
      dummy.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(XB, YB, tg));
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      tint.setHSL(0.07 + Math.random() * 0.04, 0.30, 0.78 + Math.random() * 0.27);
      inst.setColorAt(i, tint);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.castShadow = inst.receiveShadow = true;
    tank.add(inst);
    tracks.push(inst);
  }

  /* الاتّجاهُ والمقياس: صفحتُها تُوجّه المدفعَ نحو ‎+Z‎، ولعبةُ سمائل
     تتوقّعه نحو ‎-Z‎ — فتُدار المجموعةُ بدل أن تُعاد كتابةُ الإحداثيّات. */
  if (facing < 0) root.rotation.y = Math.PI;
  if (scale !== 1) root.scale.setScalar(scale);

  root.userData.turret = turret;
  root.userData.gun = gun;
  root.userData.tracks = tracks;
  root.userData.mats = mats;
  root.userData.dims = { l: 7.0 * scale, w: 2.9 * scale, h: 2.6 * scale };
  return root;
}
