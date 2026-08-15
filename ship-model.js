import * as THREE from 'three';

/* ----------------------------------------------------------------------
   SHIP MESH — F-35A LIGHTNING II, ported from the user's reference
   airframe (loft-based fuselage, extruded wing/stabilator/tail shapes,
   DSI intake, lathe-profile nozzle). Shared between space-adventure.js
   (the ship in flight) and space-landing.html (the same ship, landed) —
   one real model, not a copy that can drift out of sync.
   ---------------------------------------------------------------------- */
export function shipSectionPts(w, ht, hb, sy) {
  return [[0, ht], [0.45 * w, 0.94 * ht], [0.82 * w, 0.55 * ht], [w, sy], [0.87 * w, (sy - hb) / 2], [0.55 * w, -hb * 0.92], [0, -hb],
          [-0.55 * w, -hb * 0.92], [-0.87 * w, (sy - hb) / 2], [-w, sy], [-0.82 * w, 0.55 * ht], [-0.45 * w, 0.94 * ht]];
}
export function shipLoftGeo(stations, tipZ) {
  const N = 12, S = stations.length;
  const pos = new Float32Array((S * N + 1) * 3);
  stations.forEach((st, s) => {
    const pts = shipSectionPts(st[1], st[2], st[3], st[4]);
    pts.forEach((p, i) => { const k = (s * N + i) * 3; pos[k] = p[0]; pos[k + 1] = p[1]; pos[k + 2] = st[0]; });
  });
  pos[S * N * 3] = 0; pos[S * N * 3 + 1] = 0; pos[S * N * 3 + 2] = tipZ;
  const idx = [];
  for (let s = 0; s < S - 1; s++) for (let p = 0; p < N; p++) {
    const a = s * N + p, b = s * N + (p + 1) % N, c = (s + 1) * N + p, d = (s + 1) * N + (p + 1) % N;
    idx.push(a, b, c, b, d, c);
  }
  const tip = S * N;
  for (let p = 0; p < N; p++) idx.push(tip, (p + 1) % N, p);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
export function shipWingGeo(side) {
  const sh = new THREE.Shape();
  sh.moveTo(0, 2.35); sh.lineTo(5.35 * side, -1.7); sh.lineTo(5.35 * side, -3.2); sh.lineTo(0, -2.95); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 2, steps: 1 });
  g.rotateX(Math.PI / 2); g.computeBoundingBox();
  const bb = g.boundingBox; g.translate(0, -(bb.min.y + bb.max.y) / 2, 0);
  return g;
}
export function shipStabGeo(side) {
  const sh = new THREE.Shape();
  sh.moveTo(0.3 * side, 0.55); sh.lineTo(3.3 * side, -1.2); sh.lineTo(3.3 * side, -2.4); sh.lineTo(0.3 * side, -2.0); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.07, bevelSegments: 2, steps: 1 });
  g.rotateX(Math.PI / 2); g.computeBoundingBox();
  const bb = g.boundingBox; g.translate(0, -(bb.min.y + bb.max.y) / 2, 0);
  return g;
}
export function shipVtailGeo() {
  const sh = new THREE.Shape();
  sh.moveTo(-4.9, 0); sh.lineTo(-6.6, 2.2); sh.lineTo(-8.0, 2.2); sh.lineTo(-7.8, 0); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2, steps: 1 });
  g.rotateY(-Math.PI / 2); g.computeBoundingBox();
  const bb = g.boundingBox; g.translate(-(bb.min.x + bb.max.x) / 2, 0, 0);
  return g;
}

export const SHIP_SCALE = 0.3;
const shipEdgeMat = new THREE.LineBasicMaterial({ color: 0x0b0d10, transparent: true, opacity: 0.55 });
export function addShipEdges(mesh, thr) {
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, thr || 22), shipEdgeMat));
}

/* the scene's world lights favor the nose side, but the chase camera
   mostly sees the ship from behind/above — without its own light the
   hull reads as a near-black silhouette back there. These travel with
   the ship, so they stay right regardless of the world light rig.
   Shared by every ship model so a new one doesn't reintroduce the bug. */
function attachChaseLights(group) {
  const chaseFill = new THREE.PointLight(0xcfe0ff, 2.4, 16, 2);
  chaseFill.position.set(0, 2.4, 5);
  group.add(chaseFill);
  const bellyFill = new THREE.PointLight(0xffe9c9, 1, 12, 2);
  bellyFill.position.set(0, -1.6, -3);
  group.add(bellyFill);
}

export function buildShip() {
  const group = new THREE.Group();
  const inner = new THREE.Group();
  inner.scale.setScalar(SHIP_SCALE);
  inner.rotation.y = Math.PI;
  group.add(inner);

  const hullMat = new THREE.MeshStandardMaterial({ color: 0x8a94a3, roughness: 0.48, metalness: 0.55, flatShading: true });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x22262c, roughness: 0.55, metalness: 0.55, flatShading: true });
  const canopyMat = new THREE.MeshPhysicalMaterial({ color: 0xf7c96b, metalness: 0.2, roughness: 0.08, transparent: true, opacity: 0.42, clearcoat: 1, side: THREE.DoubleSide });
  const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x34393f, metalness: 0.85, roughness: 0.4, side: THREE.DoubleSide });

  attachChaseLights(group);

  /* fuselage — loft through hand-placed stations, nose to tail */
  const ST = [[7.70, .10, .09, .08, .01], [7.30, .30, .26, .22, .03], [6.60, .52, .44, .38, .05], [5.80, .68, .58, .50, .06],
    [5.00, .80, .68, .56, .08], [4.10, .92, .76, .60, .10], [3.10, 1.04, .80, .62, .10], [2.00, 1.14, .80, .64, .08],
    [0.80, 1.22, .78, .66, .06], [-0.60, 1.26, .74, .66, .04], [-2.00, 1.24, .70, .62, .02], [-3.40, 1.16, .66, .58, 0],
    [-4.80, 1.02, .60, .52, -.02], [-6.00, .86, .54, .46, -.04], [-7.00, .72, .48, .40, -.05], [-7.70, .62, .44, .36, -.05]];
  const fuse = new THREE.Mesh(shipLoftGeo(ST, 7.85), hullMat);
  inner.add(fuse);
  addShipEdges(fuse, 24);

  /* canopy */
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), canopyMat);
  canopy.scale.set(0.58, 0.5, 1.8);
  canopy.position.set(0, 0.62, 3.35);
  inner.add(canopy);

  /* DSI diverterless intakes */
  [1, -1].forEach((side) => {
    const bump = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), hullMat);
    bump.scale.set(0.3, 0.27, 0.66);
    bump.position.set(1.02 * side, -0.06, 3.25);
    inner.add(bump);
    const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 1.1, 14, 1, true), darkMat);
    duct.rotation.z = Math.PI / 2;
    duct.position.set(0.72 * side, -0.02, 2.0);
    inner.add(duct);
  });

  /* wings + stabilators */
  [1, -1].forEach((side) => {
    const w = new THREE.Mesh(shipWingGeo(side), hullMat);
    w.position.set(0.2 * side, -0.18, -0.2);
    inner.add(w);
    addShipEdges(w, 18);
    const st = new THREE.Mesh(shipStabGeo(side), hullMat);
    st.position.set(0.15 * side, -0.1, -5.6);
    inner.add(st);
    addShipEdges(st, 18);
  });

  /* twin canted vertical tails */
  const vtGeo = shipVtailGeo();
  [1, -1].forEach((side) => {
    const v = new THREE.Mesh(vtGeo, hullMat);
    v.position.set(0.98 * side, 0.42, 0);
    v.rotation.z = -0.5 * side;
    inner.add(v);
    addShipEdges(v, 18);
  });

  /* engine nozzle, lathe profile */
  const nozzle = new THREE.Mesh(new THREE.LatheGeometry(
    [new THREE.Vector2(0.46, 0), new THREE.Vector2(0.55, -0.02), new THREE.Vector2(0.585, -0.12),
     new THREE.Vector2(0.575, -0.3), new THREE.Vector2(0.545, -0.48), new THREE.Vector2(0.5, -0.6)], 24), nozzleMat);
  nozzle.rotation.x = Math.PI / 2;
  nozzle.position.z = -7.62;
  inner.add(nozzle);

  /* nose radome cap */
  const radome = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 10), darkMat);
  radome.rotation.x = Math.PI / 2;
  radome.position.set(0, 0.02, 7.75);
  inner.add(radome);

  /* EOTS sensor ball, tucked under the nose ahead of the intakes */
  const eots = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), canopyMat);
  eots.position.set(0, -0.24, 6.5);
  inner.add(eots);

  /* ventral ridge + dorsal spine — greebled panel strips */
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 6.5), darkMat);
  ridge.position.set(0, -1.12, -0.5);
  inner.add(ridge);
  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 3.2), darkMat);
  spine.position.set(0, 1.14, 1.2);
  inner.add(spine);

  /* wing fences — small vertical fins along the upper wing surface */
  [1, -1].forEach((side) => {
    [2.4, 3.9].forEach((d, i) => {
      const fence = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.5), darkMat);
      fence.position.set(d * side, 0.05, -0.7 - i * 0.5);
      inner.add(fence);
    });
  });

  /* exhaust petals ring around the nozzle rim */
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.1), darkMat);
    petal.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.5, -7.55);
    petal.rotation.z = a;
    inner.add(petal);
  }

  /* rudder hinge lines on the twin canted tails */
  [1, -1].forEach((side) => {
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.1, 0.03), darkMat);
    hinge.position.set(1.55 * side, 1.0, 0.3);
    hinge.rotation.z = -0.5 * side;
    inner.add(hinge);
  });

  /* afterburner flame + glow, in un-scaled group space so per-frame
     flicker/scale logic elsewhere keeps working */
  const exhaustMat = new THREE.MeshBasicMaterial({ color: 0xff9a50, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.1, 10), exhaustMat);
  flame.rotation.x = -Math.PI / 2;
  flame.position.z = 7.62 * SHIP_SCALE + 0.55;
  group.add(flame);
  const glowSprite = makeGlowSprite(0xffb877, 0.65);
  glowSprite.material.opacity = 0.6;
  glowSprite.position.z = 7.62 * SHIP_SCALE + 0.25;
  group.add(glowSprite);

  group.userData.flame = flame;
  group.userData.glow = glowSprite;
  return group;
}

/* SHIP MESH — alternate twin-engine interceptor, ported from the
   EMBERSTAR SAGA reference's ship-building technique (box fuselage,
   extruded delta wings with cyan wingtip lights and amber strips,
   twin engine nacelles, twin exhausts). A second real, selectable
   ship — not a recolor of the F-35 — built directly at the same
   world scale/orientation convention (nose toward -z, exhaust
   toward +z) so it drops into the game exactly like buildShip(). */
export function buildShipAlt() {
  const group = new THREE.Group();
  attachChaseLights(group);

  const hull = new THREE.MeshStandardMaterial({ color: 0xaebfc9, metalness: 0.75, roughness: 0.35, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: 0x232e3a, metalness: 0.7, roughness: 0.5, flatShading: true });
  const amber = new THREE.MeshStandardMaterial({ color: 0xff9f2e, emissive: 0xff7a00, emissiveIntensity: 0.85, metalness: 0.3, roughness: 0.4 });
  const cyanGlow = new THREE.MeshBasicMaterial({ color: 0x8feeff });
  const canopyMat = new THREE.MeshPhysicalMaterial({ color: 0x9fdcff, emissive: 0x1c4a66, transparent: true, opacity: 0.85, clearcoat: 1, clearcoatRoughness: 0.15 });

  const add = (mesh, x, y, z, rx, ry, rz) => {
    mesh.position.set(x || 0, y || 0, z || 0);
    if (rx) mesh.rotation.x = rx;
    if (ry) mesh.rotation.y = ry;
    if (rz) mesh.rotation.z = rz;
    group.add(mesh);
    return mesh;
  };

  add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 3.4), hull));
  add(new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 2.6), dark), 0, 0.32, -0.2);

  const noseGroup = new THREE.Group();
  noseGroup.rotation.x = -Math.PI / 2;
  noseGroup.position.set(0, 0, -2.35);
  noseGroup.add(new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.4, 4), hull));
  group.add(noseGroup);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), canopyMat);
  canopy.scale.set(0.9, 0.72, 1.5);
  add(canopy, 0, 0.34, -0.55);

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0); wingShape.lineTo(2.7, -1.5); wingShape.lineTo(2.7, -2.05); wingShape.lineTo(0.5, -1.15); wingShape.lineTo(0, -0.55); wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
  const wingR = new THREE.Mesh(wingGeo, dark);
  wingR.rotation.x = -Math.PI / 2;
  add(wingR, 0.2, -0.05, -0.2);
  const wingL = wingR.clone();
  wingL.scale.x = -1;
  add(wingL, -0.2, -0.05, -0.2);

  [1, -1].forEach((side) => {
    add(new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.95), hull), 2.78 * side, 0.02, 1.05);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 6), dark);
    barrel.rotation.x = Math.PI / 2;
    add(barrel, 2.78 * side, 0.02, 0.35);
    add(new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), cyanGlow), 2.78 * side, 0.02, -0.06);
    add(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 1.3), amber), 0.62 * side, 0.28, 0.95);
    const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 1.1, 10), dark);
    nacelle.rotation.x = Math.PI / 2;
    add(nacelle, 0.55 * side, -0.06, 1.4);
    add(new THREE.Mesh(new THREE.CircleGeometry(0.19, 10), cyanGlow), 0.55 * side, -0.06, 1.96);
  });

  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0); finShape.lineTo(1.7, 0); finShape.lineTo(1.7, 1.1); finShape.lineTo(1.15, 0.62); finShape.closePath();
  const fin = new THREE.Mesh(new THREE.ExtrudeGeometry(finShape, { depth: 0.09, bevelEnabled: false }), dark);
  fin.rotation.y = -Math.PI / 2;
  add(fin, 0.045, 0.22, 0.35);

  const exhaustMat = new THREE.MeshBasicMaterial({ color: 0xffa050, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const flameGroup = new THREE.Group();
  const glowGroup = new THREE.Group();
  [1, -1].forEach((side) => {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 10, 1, true), exhaustMat);
    cone.rotation.x = Math.PI / 2;
    cone.position.set(0.55 * side, -0.06, 2.5);
    flameGroup.add(cone);
    const sp = makeGlowSprite(0xffb877, 0.9);
    sp.material.opacity = 0.6;
    sp.position.set(0.55 * side, -0.06, 2.05);
    glowGroup.add(sp);
  });
  group.add(flameGroup, glowGroup);

  group.userData.flame = flameGroup;
  group.userData.glow = glowGroup;
  return group;
}

export function makeGlowTexture() {
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
export function makeGlowSprite(hex, scale) {
  if (!GLOW_TEX) GLOW_TEX = makeGlowTexture();
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW_TEX, color: hex, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  sp.scale.setScalar(scale);
  return sp;
}
