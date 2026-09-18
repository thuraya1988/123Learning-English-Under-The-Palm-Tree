/* عُدّةُ المركبات — ما تشترك فيه المركباتُ الثلاثَ عشرةَ وميرا.
 *
 * كلُّ مركبةٍ وصلتنا صفحةً قائمةً بذاتها: سماءٌ وأرضٌ وفيزياءٌ وكاميرا،
 * وسبعون بالمئةِ منها مكرَّرٌ حرفًا حرفًا. فجُمعَ المكرَّرُ هنا مرّةً
 * واحدة، وبقيَ في كلِّ ملفِّ مركبةٍ ما يخصُّها وحدَها: شكلُها.
 *
 * والفارقُ الوحيدُ الذي أُقحم: المركباتُ العشرُ الأولى كانت PBR
 * (MeshStandardMaterial بمعدنٍ وخشونة)، وميرا والدرّاجةُ الناريّةُ
 * والميني فان كانت كرتونيّةً (MeshToonMaterial بحدٍّ أسود). ولا يجتمع
 * الأسلوبان في مشهدٍ واحدٍ إلّا قبيحًا. وميرا هي البطلةُ ولا تُبدَّل،
 * فصار الكلُّ كرتونيًّا: `TOON` تقرأ لونَ الخامة القديمةِ وخريطتَها
 * وتُهمل المعدنَ والخشونة.
 */

/* ——— تدرّجُ الظلّ الكرتونيّ: ثلاثُ درجاتٍ حادّةٌ لا تدرّجٌ ناعم ——— */
export function gradientMap(THREE, steps = 4) {
  const d = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) d[i] = Math.round((i / (steps - 1)) * 255);
  const t = new THREE.DataTexture(d, steps, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
}

/* الخصائصُ التي تفهمها الخامةُ الكرتونيّة — وما عداها يُطرح بلا تحذير */
const TOON_KEYS = ['color', 'map', 'emissive', 'emissiveIntensity', 'emissiveMap',
  'transparent', 'opacity', 'side', 'alphaTest', 'alphaMap', 'depthWrite',
  'toneMapped', 'name', 'wireframe', 'fog'];

export function makeKit(THREE, opts = {}) {
  const gradTex = opts.gradientMap || gradientMap(THREE, opts.steps || 4);
  const outlineMat = new THREE.MeshBasicMaterial({ color: 0x12131a, side: THREE.BackSide });
  const mats = [];

  /* ——— الخامة: تُبنى من وصفٍ PBR أو كرتونيٍّ سواءً بسواء ——— */
  function TOON(o) {
    if (typeof o === 'number') o = { color: o };
    const p = { gradientMap: gradTex };
    for (const k of TOON_KEYS) if (o[k] !== undefined) p[k] = o[k];
    /* الزجاجُ في PBR يُوصف بـ transmission أو opacity — وكلاهما شفافيّة */
    if (o.transmission > 0 || (o.opacity !== undefined && o.opacity < 1)) {
      p.transparent = true;
      p.opacity = o.opacity !== undefined ? o.opacity : 0.34;
    }
    /* المعدنُ اللامعُ يُعوَّض ببريقٍ باعثٍ خفيفٍ حتى لا يصير طينًا */
    if (o.metalness >= 0.85 && p.emissive === undefined) {
      p.emissive = new THREE.Color(p.color || 0xffffff).multiplyScalar(0.22);
    }
    const m = new THREE.MeshToonMaterial(p);
    mats.push(m);
    return m;
  }

  /* ——— الحدُّ الأسود: نسخةٌ مقلوبةُ الوجهِ من الشبكة نفسِها ——— */
  function outline(mesh, s = 1.045) {
    const o = new THREE.Mesh(mesh.geometry, outlineMat);
    o.scale.setScalar(s);
    o.userData.outline = true;
    mesh.add(o);
    return mesh;
  }

  /* ——— نسيجٌ من لوحةِ رسم: للحروف واللافتات لا للمعدن ——— */
  function ctex(w, h, painter, srgb = true) {
    if (typeof h === 'function') { painter = h; h = w; }
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    painter(g, w, h);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = opts.anisotropy || 4;
    if (srgb && THREE.SRGBColorSpace) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  const hexA = (h, a) => {
    const n = typeof h === 'number' ? h : parseInt(String(h).replace('#', ''), 16);
    return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
  };

  /* رشُّ نقطٍ عشوائيّةٍ — تُستعمل في الطلاء والقماش والمطّاط */
  function speckle(g, w, h, n, cols, a0, a1, s0, s1) {
    for (let i = 0; i < n; i++) {
      g.fillStyle = hexA(cols[(Math.random() * cols.length) | 0], a0 + Math.random() * (a1 - a0));
      const s = s0 + Math.random() * (s1 - s0);
      g.fillRect(Math.random() * w, Math.random() * h, s, s);
    }
  }
  function scratches(g, w, h, n, col, a0, a1, l0, l1, lw = 1) {
    g.lineWidth = lw;
    for (let i = 0; i < n; i++) {
      const x = Math.random() * w, y = Math.random() * h, a = Math.random() * Math.PI * 2;
      const l = l0 + Math.random() * (l1 - l0);
      g.strokeStyle = hexA(col, a0 + Math.random() * (a1 - a0));
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
  }
  function mottle(g, w, h, n, r0, r1, cols, a0, a1) {
    for (let i = 0; i < n; i++) {
      g.fillStyle = hexA(cols[(Math.random() * cols.length) | 0], a0 + Math.random() * (a1 - a0));
      g.beginPath();
      g.arc(Math.random() * w, Math.random() * h, r0 + Math.random() * (r1 - r0), 0, Math.PI * 2);
      g.fill();
    }
  }

  /* نقطةٌ ناعمةٌ للجسيمات: غبار، رذاذ، دخان */
  function softDot() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(.5, 'rgba(255,255,255,.5)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  /* ——— بناءُ الأشكال ——— */
  const P = (m, x, y, z, rx = 0, ry = 0, rz = 0) => {
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz); return m;
  };
  function B(w, h, d, mat, x, y, z, parent, name, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
    m.castShadow = m.receiveShadow = true;
    if (name) m.name = name;
    if (parent) parent.add(m);
    return m;
  }
  function C(rt, rb, h, mat, x, y, z, parent, name, rx = 0, ry = 0, rz = 0, seg = 18) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
    m.castShadow = m.receiveShadow = true;
    if (name) m.name = name;
    if (parent) parent.add(m);
    return m;
  }
  function S(r, mat, x, y, z, parent, name, seg = 16) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg >> 1)), mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    if (name) m.name = name;
    if (parent) parent.add(m);
    return m;
  }
  const axisX = g => { g.rotateZ(Math.PI / 2); return g; };

  /* أنبوبٌ بين نقطتين — العمودُ الفقريُّ لهياكل الدرّاجات */
  const _up = new THREE.Vector3(0, 1, 0), _dir = new THREE.Vector3();
  function tube(parent, p1, p2, r, mat, name) {
    _dir.subVectors(p2, p1);
    const len = _dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), mat);
    m.position.copy(p1).addScaledVector(_dir, 0.5);
    m.quaternion.setFromUnitVectors(_up, _dir.clone().normalize());
    m.castShadow = m.receiveShadow = true;
    if (name) m.name = name;
    if (parent) parent.add(m);
    return m;
  }

  /* ——— إطارٌ وجَنَط: كلُّ عجلةٍ في كلِّ مركبةٍ تُبنى منهما ——— */
  function tireGeo(THREE_, r = 0.36, w = 0.26, grooves = 10) {
    const g = new THREE.TorusGeometry(r * 0.82, r * 0.18, 10, 22);
    g.rotateY(Math.PI / 2);
    return g;
  }
  function wheel(mat, opts2 = {}) {
    const r = opts2.r || 0.36, w = opts2.w || 0.26;
    const g = new THREE.Group();
    const tyre = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, opts2.seg || 20), mat.tyre || mat);
    axisX(tyre.geometry);
    tyre.castShadow = true;
    g.add(tyre);
    if (mat.rim) {
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.62, r * 0.62, w * 1.02, opts2.seg || 20), mat.rim);
      axisX(rim.geometry);
      g.add(rim);
      const lugs = opts2.lugs === undefined ? 5 : opts2.lugs;
      for (let i = 0; i < lugs; i++) {
        const a = (i / lugs) * Math.PI * 2;
        const s = new THREE.Mesh(new THREE.BoxGeometry(w * 1.06, r * 0.9, r * 0.13), mat.rim);
        s.rotation.x = a;
        g.add(s);
      }
    }
    return g;
  }

  return {
    THREE, gradTex, outlineMat, mats,
    M: TOON, TOON, outline, ctex, hexA, speckle, scratches, mottle, softDot,
    P, B, C, S, axisX, tube, wheel, tireGeo,
    dispose() {
      mats.forEach(m => m.dispose());
      gradTex.dispose();
      outlineMat.dispose();
    }
  };
}
