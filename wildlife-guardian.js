import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/* ═══════════════════ CORE ═══════════════════ */
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xe8d9b8, 60, 420);
const camera = new THREE.PerspectiveCamera(58, innerWidth/innerHeight, 0.05, 900);

/* ═══════════════════ NOISE / TERRAIN MATH ═══════════════════ */
function hash2(ix, iz){
  let n = (ix*374761393 + iz*668265263)|0;
  n = ((n ^ (n>>13)) * 1274126177)|0;
  return (((n ^ (n>>16))>>>0) / 4294967295);
}
function vnoise(x, z){
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x-ix, fz = z-iz;
  const sx = fx*fx*(3-2*fx), sz = fz*fz*(3-2*fz);
  const a = hash2(ix,iz), b = hash2(ix+1,iz), c = hash2(ix,iz+1), d = hash2(ix+1,iz+1);
  return a + (b-a)*sx + (c-a)*sz + (a-b-c+d)*sx*sz;
}
function fbm(x, z){ return vnoise(x,z)*0.55 + vnoise(x*2.13,z*2.13)*0.26 + vnoise(x*4.4,z*4.4)*0.12; }
function sstep(a, b, x){ const t = Math.max(0, Math.min(1, (x-a)/(b-a))); return t*t*(3-2*t); }
function wadiZ(x){ return Math.sin(x*0.012)*45 + Math.sin(x*0.004+1.7)*70; }
function terrainH(x, z){
  let h = fbm(x*0.006+7, z*0.006+3)*10 - 3 + fbm(x*0.03, z*0.03)*1.4;
  const mN = sstep(-150, -380, z);
  const mE = sstep(210, 390, x);
  h += mN*(24 + fbm(x*0.01, z*0.01)*30);
  h += mE*(16 + fbm(x*0.013+5, z*0.013)*22);
  const d = z - wadiZ(x);
  h -= Math.exp(-(d*d)/(18*18)) * 6.5;
  return h;
}
function distToWadi(x, z){ return Math.abs(z - wadiZ(x)); }

/* ═══════════════════ ZONES ═══════════════════ */
const zones = [
  { name:'PALM OASIS',      cx:-180, cz:wadiZ(-180), r:115, health:34, water:70 },
  { name:'WADI CORRIDOR',   cx:  20, cz:wadiZ(20),   r:135, health:26, water:22 },
  { name:'DRY PLAIN',       cx: 150, cz:175,         r:145, health:20, water:10 },
  { name:'MOUNTAIN RESERVE',cx: -40, cz:-255,        r:165, health:46, water:35 },
];
function zoneAt(x, z){
  let best = null, bd = 1e9;
  for (const zn of zones){
    const d = Math.hypot(x-zn.cx, z-zn.cz);
    if (d < zn.r && d < bd){ bd = d; best = zn; }
  }
  return best;
}
function zoneIndex(zn){ return zones.indexOf(zn); }

/* ═══════════════════ SKY / LIGHTS / TIME ═══════════════════ */
const hemi = new THREE.HemisphereLight(0xcfe3ec, 0x8a7a55, 0.7);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d2, 2.4);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -45; sun.shadow.camera.right = 45;
sun.shadow.camera.top = 45; sun.shadow.camera.bottom = -45;
sun.shadow.camera.near = 5; sun.shadow.camera.far = 500;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.05;
scene.add(sun, sun.target);
const moonL = new THREE.DirectionalLight(0x8aa0c8, 0);
scene.add(moonL);

/* stars */
const starGeo = new THREE.BufferGeometry();
{
  const sp = [];
  for (let i=0;i<600;i++){
    const a = Math.random()*Math.PI*2, e = Math.random()*Math.PI*0.48+0.05;
    sp.push(Math.cos(a)*Math.cos(e)*700, Math.sin(e)*700, Math.sin(a)*Math.cos(e)*700);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
}
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color:0xffffff, size:1.6, sizeAttenuation:false, transparent:true, opacity:0 }));
scene.add(stars);

let timeOfDay = 0.30;
let timeSpeed = 1;
function sunAngles(){
  const a = (timeOfDay - 0.25) * Math.PI * 2;
  return { el:Math.sin(a), x:Math.cos(a) };
}
const skyDay = new THREE.Color(0x8fb8d8), skyDusk = new THREE.Color(0xe8a05c), skyNight = new THREE.Color(0x0c1424);
const fogDay = new THREE.Color(0xe8d9b8), fogDusk = new THREE.Color(0xd8a878), fogNight = new THREE.Color(0x141c28);
function daylight(){ return Math.max(0, Math.min(1, sunAngles().el*2.4 + 0.12)); }

/* ═══════════════════ TERRAIN ═══════════════════ */
const TSIZE = 800, TSEG = 190;
const terrGeo = new THREE.PlaneGeometry(TSIZE, TSIZE, TSEG, TSEG);
terrGeo.rotateX(-Math.PI/2);
{
  const pos = terrGeo.attributes.position;
  for (let i=0;i<pos.count;i++)
    pos.setY(i, terrainH(pos.getX(i), pos.getZ(i)));
  terrGeo.computeVertexNormals();
}
const terrColors = new Float32Array(terrGeo.attributes.position.count*3);
terrGeo.setAttribute('color', new THREE.BufferAttribute(terrColors, 3));
const terrMat = new THREE.MeshStandardMaterial({ vertexColors:true, roughness:1, metalness:0 });
const terrain = new THREE.Mesh(terrGeo, terrMat);
terrain.receiveShadow = true;
scene.add(terrain);

const ponds = [
  { x:-180, r:27, flow:1,   blocked:false, name:'OASIS SPRING' },
  { x:  20, r:30, flow:0,   blocked:true,  name:'WADI CHANNEL' },
  { x: 210, r:24, flow:1,   blocked:false, name:'UPSTREAM POOL' },
];
for (const p of ponds){ p.cz = wadiZ(p.x); p.y = terrainH(p.x, p.cz) + 1.5; }
const waterMeshes = [];
const waterMatBase = new THREE.MeshStandardMaterial({ color:0x3f8fb0, transparent:true, opacity:0.86, roughness:0.25, metalness:0.1 });
for (const p of ponds){
  const wm = new THREE.Mesh(new THREE.CircleGeometry(p.r, 36), waterMatBase.clone());
  wm.rotation.x = -Math.PI/2;
  wm.position.set(p.x, p.y, p.cz);
  wm.userData.pond = p;
  scene.add(wm);
  waterMeshes.push(wm);
}
function moistureAt(x, z){
  let m = Math.exp(-(distToWadi(x,z)**2)/(42*42)) * 0.9;
  for (const p of ponds){
    if (p.flow <= 0.1) continue;
    m = Math.max(m, Math.exp(-(Math.hypot(x-p.x, z-p.cz)**2)/(55*55)) * p.flow);
  }
  return Math.min(1, m);
}
function recolorTerrain(){
  const pos = terrGeo.attributes.position, col = terrGeo.attributes.color, nrm = terrGeo.attributes.normal;
  const c = new THREE.Color(), sand = new THREE.Color(0xc9a86a), rock = new THREE.Color(0x8a7a66),
        green = new THREE.Color(0x5d7f38), pale = new THREE.Color(0xd6c290);
  for (let i=0;i<pos.count;i++){
    const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
    const slope = 1 - nrm.getY(i);
    c.copy(sand).lerp(pale, fbm(x*0.05, z*0.05)*0.7);
    if (slope > 0.3) c.lerp(rock, Math.min(1, (slope-0.3)*3));
    const zn = zoneAt(x, z);
    const moist = moistureAt(x, z) * (zn ? 0.45 + 0.55*zn.health/100 : 0.4);
    c.lerp(green, Math.min(0.85, moist*1.15));
    if (y < -3.4) c.lerp(new THREE.Color(0xb09a72), 0.5);
    col.setXYZ(i, c.r, c.g, c.b);
  }
  col.needsUpdate = true;
}
recolorTerrain();

/* ═══════════════════ VEGETATION ═══════════════════ */
const rand = (()=>{ let s = 12345; return ()=>{ s = (s*16807)%2147483647; return (s-1)/2147483646; };})();
function scatter(n, minD, placeFn){
  const out = [];
  for (let i=0;i<n;i++){
    const x = (rand()*2-1)*380, z = (rand()*2-1)*380;
    if (terrainH(x,z) > 26) continue;
    const zn = zoneAt(x, z);
    const p = placeFn(x, z, zn);
    if (p) out.push(p);
  }
  return out;
}
const palmDefs = [];
{
  const spots = [];
  for (let i=0;i<26;i++){ const a = rand()*Math.PI*2, d = rand()*70;
    spots.push([-180+Math.cos(a)*d, wadiZ(-180)+Math.sin(a)*d]); }
  for (let i=0;i<12;i++){ const x = -320 + rand()*620; spots.push([x, wadiZ(x)+(rand()*2-1)*22]); }
  for (const [x,z] of spots){
    const h = terrainH(x, z);
    if (h > 4 || h < -6) continue;
    palmDefs.push({ x, z, y:h, health: 30+rand()*60, pest:rand()<0.35, waterLow:rand()<0.3, treated:false, lean:(rand()-0.5)*0.22, rot:rand()*Math.PI*2 });
  }
}
const trunkGeo = new THREE.CylinderGeometry(0.15, 0.27, 4.8, 8);
trunkGeo.translate(0, 2.4, 0);
const frondGeo = (()=>{
  const g = new THREE.PlaneGeometry(0.5, 3.3, 1, 7);
  g.translate(0, 1.65, 0);
  const p = g.attributes.position;
  for (let i=0;i<p.count;i++){
    const t = p.getY(i)/3.3;
    p.setX(i, p.getX(i)*(1-t*0.72));
    p.setZ(i, t*t*1.25);
  }
  g.computeVertexNormals();
  return g;
})();
const palmTrunkMat = new THREE.MeshStandardMaterial({ color:0x8a6f4a, roughness:0.95 });
const frondMat = new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.9, side:THREE.DoubleSide });
const trunkInst = new THREE.InstancedMesh(trunkGeo, palmTrunkMat, palmDefs.length);
const frondInst = new THREE.InstancedMesh(frondGeo, frondMat, palmDefs.length*7);
trunkInst.castShadow = frondInst.castShadow = true;
{
  const dm = new THREE.Object3D(); const tint = new THREE.Color();
  palmDefs.forEach((pd, i) => {
    dm.position.set(pd.x, pd.y, pd.z);
    dm.rotation.set(pd.lean, pd.rot, 0);
    dm.scale.setScalar(0.85+rand()*0.4);
    dm.updateMatrix();
    trunkInst.setMatrixAt(i, dm.matrix);
    const topY = 4.6*dm.scale.y;
    for (let f=0; f<7; f++){
      const az = f/7*Math.PI*2 + rand()*0.3;
      dm.position.set(pd.x, pd.y+topY, pd.z);
      dm.rotation.set(0, az, 0);
      dm.rotateX(0.75+rand()*0.45);
      dm.scale.setScalar(dm.scale.x);
      dm.updateMatrix();
      frondInst.setMatrixAt(i*7+f, dm.matrix);
    }
    const sick = pd.health < 50;
    tint.set(sick ? 0xb3a048 : 0x3f7a34);
    for (let f=0; f<7; f++) frondInst.setColorAt(i*7+f, tint);
  });
  frondInst.instanceColor.needsUpdate = true;
}
scene.add(trunkInst, frondInst);
function updatePalmTint(i){
  const pd = palmDefs[i]; const tint = new THREE.Color();
  tint.set(0xb3a048).lerp(new THREE.Color(0x3f7a34), Math.max(0, Math.min(1, (pd.health-30)/60)));
  for (let f=0; f<7; f++) frondInst.setColorAt(i*7+f, tint);
  frondInst.instanceColor.needsUpdate = true;
}
const acaciaDefs = scatter(26, 0, (x, z, zn)=>{
  if (terrainH(x,z) > 8 || moistureAt(x,z) < 0.14) return null;
  return { x, z, y:terrainH(x,z), s:0.8+rand()*0.8 };
});
const acTrunkGeo = new THREE.CylinderGeometry(0.09, 0.16, 2.6, 7); acTrunkGeo.translate(0,1.3,0);
const acCrownGeo = new THREE.CylinderGeometry(2.2, 1.5, 0.7, 9); acCrownGeo.translate(0, 2.9, 0);
const acTrunkInst = new THREE.InstancedMesh(acTrunkGeo, palmTrunkMat, acaciaDefs.length);
const acCrownInst = new THREE.InstancedMesh(acCrownGeo, new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.95 }), acaciaDefs.length);
acTrunkInst.castShadow = acCrownInst.castShadow = true;
{
  const dm = new THREE.Object3D(); const tint = new THREE.Color();
  acaciaDefs.forEach((ad, i) => {
    dm.position.set(ad.x, ad.y, ad.z); dm.rotation.set(0, rand()*6.28, 0); dm.scale.setScalar(ad.s);
    dm.updateMatrix();
    acTrunkInst.setMatrixAt(i, dm.matrix); acCrownInst.setMatrixAt(i, dm.matrix);
    const zn = zoneAt(ad.x, ad.z);
    tint.set(0x8a8a4a).lerp(new THREE.Color(0x4a7a34), (zn?zn.health:40)/100);
    acCrownInst.setColorAt(i, tint);
  });
  acCrownInst.instanceColor.needsUpdate = true;
}
scene.add(acTrunkInst, acCrownInst);
const grassGeo = new THREE.ConeGeometry(0.11, 0.5, 5); grassGeo.translate(0,0.25,0);
const shrubGeo = new THREE.IcosahedronGeometry(0.55, 0); shrubGeo.scale(1, 0.72, 1); shrubGeo.translate(0,0.34,0);
const grassMat = new THREE.MeshStandardMaterial({ color:0xffffff, roughness:1 });
const shrubMat = grassMat;
const GRASS_N = 750, SHRUB_N = 170;
const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, GRASS_N);
const shrubInst = new THREE.InstancedMesh(shrubGeo, shrubMat, SHRUB_N);
grassInst.receiveShadow = shrubInst.receiveShadow = true;
const grassRec = [], shrubRec = [];
{
  const dm = new THREE.Object3D();
  let gi = 0, si = 0;
  for (let i=0;i<GRASS_N*2 && gi<GRASS_N;i++){
    const x = (rand()*2-1)*370, z = (rand()*2-1)*370, y = terrainH(x,z);
    if (y > 14) continue;
    const zn = zoneAt(x,z);
    grassRec.push({ x, y, z, s:0.7+rand()*0.9, rot:rand()*6.28, rnd:rand(), zn:zn?zoneIndex(zn):-1 });
    gi++;
  }
  for (let i=0;i<SHRUB_N*2 && si<SHRUB_N;i++){
    const x = (rand()*2-1)*370, z = (rand()*2-1)*370, y = terrainH(x,z);
    if (y > 18) continue;
    const zn = zoneAt(x,z);
    shrubRec.push({ x, y, z, s:0.6+rand()*1.0, rot:rand()*6.28, rnd:rand(), zn:zn?zoneIndex(zn):-1 });
    si++;
  }
}
scene.add(grassInst, shrubInst);
const dummyV = new THREE.Object3D();
const tintC = new THREE.Color();
const dryC = new THREE.Color(0xb3a36a), greenC = new THREE.Color(0x6f8f3f), shrubDry = new THREE.Color(0x9a8f5a), shrubGreen = new THREE.Color(0x557a36);
function refreshVeg(zIdx){
  grassRec.forEach((r, i) => {
    if (r.zn !== zIdx && zIdx >= 0) return;
    const h = r.zn >= 0 ? zones[r.zn].health/100 : 0.35;
    const hidden = h < 0.34 && r.rnd < 0.45;
    dummyV.position.set(r.x, r.y, r.z);
    dummyV.rotation.set(0, r.rot, 0);
    dummyV.scale.setScalar(hidden ? 0.0001 : r.s*(0.55+0.55*h));
    dummyV.updateMatrix();
    grassInst.setMatrixAt(i, dummyV.matrix);
    tintC.copy(dryC).lerp(greenC, h).offsetHSL(0, 0, (r.rnd-0.5)*0.06);
    grassInst.setColorAt(i, tintC);
  });
  shrubRec.forEach((r, i) => {
    if (r.zn !== zIdx && zIdx >= 0) return;
    const h = r.zn >= 0 ? zones[r.zn].health/100 : 0.35;
    const hidden = h < 0.3 && r.rnd < 0.5;
    dummyV.position.set(r.x, r.y, r.z);
    dummyV.rotation.set(0, r.rot, 0);
    dummyV.scale.setScalar(hidden ? 0.0001 : r.s*(0.6+0.5*h));
    dummyV.updateMatrix();
    shrubInst.setMatrixAt(i, dummyV.matrix);
    tintC.copy(shrubDry).lerp(shrubGreen, h).offsetHSL(0, 0, (r.rnd-0.5)*0.05);
    shrubInst.setColorAt(i, tintC);
  });
  grassInst.instanceMatrix.needsUpdate = shrubInst.instanceMatrix.needsUpdate = true;
  grassInst.instanceColor.needsUpdate = shrubInst.instanceColor.needsUpdate = true;
}
refreshVeg(-1);
const rockGeo = new THREE.DodecahedronGeometry(1, 0);
const rockMat = new THREE.MeshStandardMaterial({ color:0x93846e, roughness:1 });
const ROCK_N = 120;
const rockInst = new THREE.InstancedMesh(rockGeo, rockMat, ROCK_N);
rockInst.castShadow = rockInst.receiveShadow = true;
{
  let ri = 0;
  for (let i=0;i<ROCK_N*3 && ri<ROCK_N;i++){
    const x = (rand()*2-1)*380, z = (rand()*2-1)*380, y = terrainH(x,z);
    dummyV.position.set(x, y+0.1, z);
    dummyV.rotation.set(rand()*3, rand()*3, rand()*3);
    dummyV.scale.set(0.4+rand()*1.7, 0.3+rand()*1.1, 0.4+rand()*1.7);
    dummyV.updateMatrix();
    rockInst.setMatrixAt(ri++, dummyV.matrix);
  }
  rockInst.count = ri;
}
scene.add(rockInst);

/* ═══════════════════ TRACTOR VEHICLE (RT-85 asset, reused as the ranger vehicle) ═══════════════════ */
const maxAniso = renderer.capabilities.getMaxAnisotropy();
function canvasTexture(size, painter, repeat){
  const c = document.createElement('canvas'); c.width = c.height = size;
  painter(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = maxAniso;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function hexA(hex, a){ const n = parseInt(hex.slice(1),16);
  return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function mottle(g,s,n,r0,r1,cols,a0,a1){
  for (let i=0;i<n;i++){
    const x = Math.random()*s, y = Math.random()*s, r = r0 + Math.random()*(r1-r0);
    const gr = g.createRadialGradient(x,y,0,x,y,r);
    const c = cols[(Math.random()*cols.length)|0];
    gr.addColorStop(0, hexA(c, a0+Math.random()*(a1-a0)));
    gr.addColorStop(1, hexA(c, 0));
    g.fillStyle = gr; g.fillRect(x-r, y-r, r*2, r*2);
  }
}
function speckle(g,s,n,cols,a0,a1,sz0,sz1){
  for (let i=0;i<n;i++){
    g.globalAlpha = a0 + Math.random()*(a1-a0);
    g.fillStyle = cols[(Math.random()*cols.length)|0];
    const w = sz0 + Math.random()*(sz1-sz0);
    g.fillRect(Math.random()*s, Math.random()*s, w, w*(0.6+Math.random()*0.8));
  }
  g.globalAlpha = 1;
}
function scratches(g,s,n,col,a0,a1,l0,l1,w){
  g.lineCap='round';
  for (let i=0;i<n;i++){
    g.strokeStyle = col; g.globalAlpha = a0+Math.random()*(a1-a0); g.lineWidth = w||1;
    const x = Math.random()*s, y = Math.random()*s, an = Math.random()*Math.PI*2;
    const l = l0 + Math.random()*(l1-l0);
    g.beginPath(); g.moveTo(x,y); g.lineTo(x+Math.cos(an)*l, y+Math.sin(an)*l); g.stroke();
  }
  g.globalAlpha = 1;
}
function chips(g,s,n,metal,oxide){
  for (let i=0;i<n;i++){
    const x = Math.random()*s, y = Math.random()*s;
    g.fillStyle = Math.random()<0.5 ? oxide : metal;
    const k = 1+(Math.random()*3|0);
    for (let j=0;j<k;j++){
      g.beginPath();
      g.arc(x+(Math.random()*8-4), y+(Math.random()*8-4), 0.8+Math.random()*2.6, 0, 6.283);
      g.fill();
    }
  }
}
function paintOrange(g,s){
  g.fillStyle = '#d4701f'; g.fillRect(0,0,s,s);
  mottle(g,s,26,50,150,['#e8892f','#a34e12','#ef9a42','#8a4210'],0.10,0.22);
  speckle(g,s,7000,['#dd7c26','#b25814','#ef9a42','#954a10','#cf6c1c'],0.05,0.14,1,2.2);
  scratches(g,s,60,'rgba(230,220,204,1)',0.10,0.34,8,46,1);
  scratches(g,s,26,'rgba(60,32,14,1)',0.10,0.26,6,34,1);
  chips(g,s,56,'rgba(172,164,150,0.95)','rgba(128,86,46,0.9)');
  mottle(g,s,14,20,60,['#4a3826','#33281c'],0.08,0.16);
}
function paintRust(g,s){
  g.fillStyle='#453829'; g.fillRect(0,0,s,s);
  mottle(g,s,40,25,95,['#5d452e','#6e4a2a','#33271c','#77502f','#8a5a33','#4c3a28'],0.16,0.34);
  speckle(g,s,9000,['#5d452e','#6e4a2a','#33271c','#96683c','#77502f','#3d2f21'],0.06,0.22,1,2.4);
  scratches(g,s,50,'rgba(168,150,120,1)',0.08,0.26,6,40,1);
  speckle(g,s,800,['#a9713c','#b98049'],0.10,0.30,1,1.8);
}
function paintRubber(g,s){
  g.fillStyle='#232528'; g.fillRect(0,0,s,s);
  speckle(g,s,3000,['#2e3134','#1a1c1f','#34373b','#3d4045'],0.10,0.30,1,2);
  scratches(g,s,24,'rgba(96,100,104,1)',0.06,0.16,5,26,1);
}
const texOrange = canvasTexture(512, paintOrange);
const texRust   = canvasTexture(512, paintRust);
const texRubber = canvasTexture(256, paintRubber);

const vmats = [];
function vmat(opts){ const m = new THREE.MeshStandardMaterial(opts); m.envMapIntensity = 0.5; vmats.push(m); return m; }
const matBody   = vmat({ map:texOrange, bumpMap:texOrange, bumpScale:0.05, roughness:0.55, metalness:0.3 });
const matHub    = vmat({ map:texOrange, bumpMap:texOrange, bumpScale:0.04, roughness:0.5, metalness:0.3, color:0xffd9b0 });
const matTire   = vmat({ map:texRubber, bumpMap:texRubber, bumpScale:0.08, roughness:0.96, metalness:0 });
const matMud    = vmat({ map:texRust, bumpMap:texRust, bumpScale:0.12, roughness:0.95, metalness:0.2 });
const matSteel  = vmat({ color:0x4a4e52, roughness:0.45, metalness:0.65 });
const matDark   = vmat({ color:0x26282a, roughness:0.9, metalness:0.2 });
const matSeat   = vmat({ color:0x3f7a3a, roughness:0.9, metalness:0 });
const matStripe = vmat({ color:0x2c5a2c, roughness:0.6, metalness:0.2 });
const matTank   = vmat({ map:texOrange, bumpMap:texOrange, bumpScale:0.04, roughness:0.5, metalness:0.35, color:0xf5c890 });
const matAmber  = vmat({ color:0xffb020, emissive:0xffa030, emissiveIntensity:0.9, roughness:0.4 });
const matEco    = vmat({ color:0x6fae62, roughness:0.45, metalness:0.25 });
const matRedL   = vmat({ color:0xc02818, emissive:0xd02020, emissiveIntensity:0.7, roughness:0.4 });
const matLens   = vmat({ color:0xfff2c8, emissive:0xc8a850, emissiveIntensity:0.9, roughness:0.3 });

const veh = new THREE.Group();
veh.name = 'RangerTractor';
scene.add(veh);
function addMesh(geo, material, x,y,z, rx,ry,rz, parent){
  const m = new THREE.Mesh(geo, material);
  m.position.set(x,y,z);
  if (rx||ry||rz) m.rotation.set(rx||0, ry||0, rz||0);
  m.castShadow = true; m.receiveShadow = true;
  (parent || veh).add(m);
  return m;
}
function addBox(w,h,d, mtl, x,y,z, rx=0,ry=0,rz=0, p){ return addMesh(new THREE.BoxGeometry(w,h,d), mtl, x,y,z,rx,ry,rz,p); }
function addCyl(rt,rb,h, mtl, x,y,z, rx=0,ry=0,rz=0, seg=24, p){ return addMesh(new THREE.CylinderGeometry(rt,rb,h,seg), mtl, x,y,z,rx,ry,rz,p); }
function addTorus(R,tb, mtl, x,y,z, rx=0,ry=0,rz=0, p){ return addMesh(new THREE.TorusGeometry(R,tb,10,32), mtl, x,y,z,rx,ry,rz,p); }
function addCircle(r, mtl, x,y,z, p){ return addMesh(new THREE.CircleGeometry(r,24), mtl, x,y,z,0,0,0,p); }
function axisX(geo){ geo.rotateZ(Math.PI/2); return geo; }

/* chassis + body */
addBox(0.55,0.3,2.9, matMud, 0,0.62,0.2);
addBox(0.7,0.06,2.2, matMud, 0,0.44,0.3);
addBox(0.9,0.14,1.5, matBody, 0,1.3,1.0);
addBox(0.82,0.5,1.45, matBody, 0,1.02,1.0);
addBox(0.44,0.015,0.7, matBody, 0,1.385,0.95);
addBox(0.7,0.1,0.5, matBody, 0,1.38,0.62);
addBox(0.84,0.42,0.26, matBody, 0,1.12,0.32);
addBox(0.015,0.07,1.15, matStripe, -0.435,1.12,1.0);
addBox(0.015,0.07,1.15, matStripe,  0.435,1.12,1.0);
addBox(0.78,0.4,0.05, matDark, 0,1.05,1.77);
for (let i=0;i<5;i++) addBox(0.62,0.022,0.025, matSteel, 0, 0.9+i*0.075, 1.795);
addTorus(0.05,0.012, matSteel, 0,0.72,1.8, 0,0,0);
for (const s of [-1,1]){
  addTorus(0.1,0.015, matSteel, s*0.3,1.16,1.79);
  addCircle(0.088, matLens, s*0.3,1.16,1.795);
  addCyl(0.025,0.025,0.02, matAmber, s*0.34,1.34,1.79, Math.PI/2,0,0, 10);
}
for (const s of [-1,1])
  for (let i=0;i<6;i++)
    addBox(0.015,0.16,0.05, matDark, s*0.415,1.05,0.55+i*0.15);
addBox(0.2,0.18,0.1, matSteel, 0,0.6,1.88);
for (let i=0;i<3;i++) addCyl(0.16,0.16,0.055, matMud, 0,0.6,1.96+i*0.06, Math.PI/2,0,0, 20);
addCyl(0.045,0.045,0.55, matSteel, -0.26,1.75,1.15, 0,0,0, 12);
addCyl(0.07,0.05,0.09, matDark, -0.26,2.06,1.15, 0,0,0, 14);
addCyl(0.06,0.06,0.12, matSteel, -0.26,1.44,1.15, 0,0,0, 12);
addCyl(0.045,0.05,0.95, matSteel, 0.3,1.82,1.18, 0,0,0, 12);
addCyl(0.085,0.085,0.34, matSteel, 0.3,1.72,1.18, 0,0,0, 14);
addCyl(0.055,0.02,0.08, matDark, 0.3,2.33,1.18, 0,0,0, 12);
addBox(0.02,0.5,0.13, matSteel, 0.41,1.85,1.18);
const exhaustAnchor = new THREE.Object3D();
exhaustAnchor.position.set(0.3,2.36,1.18);
veh.add(exhaustAnchor);
addBox(1.02,0.12,0.16, matSteel, 0,0.4,1.32);
for (const s of [-1,1]){
  addCyl(0.045,0.045,0.16, matSteel, s*0.56,0.48,1.32, 0,0,0, 10);
  addBox(0.09,0.04,0.66, matSteel, s*0.56,0.52,1.0, 0.12,0,0);
  addBox(0.09,0.04,0.5, matSteel, s*0.56,0.56,1.02, 0.2,0,0);
}
for (const s of [-1,1]){
  const fender = new THREE.Mesh(
    new THREE.CylinderGeometry(0.86,0.86,0.46,22,1,true,0,Math.PI).rotateZ(Math.PI/2), matBody);
  fender.material.side = THREE.DoubleSide;
  fender.position.set(s*0.86, 0.72, -0.95);
  fender.castShadow = fender.receiveShadow = true;
  veh.add(fender);
  addBox(0.46,0.05,0.62, matBody, s*0.86, 1.42, -0.44);
  addBox(0.55,0.4,0.03, matDark, s*0.86, 0.52, -1.34, 0.12,0,0);
  addCircle(0.03, matRedL, s*0.86, 1.28, -1.3);
  addCyl(0.014,0.014,0.55, matSteel, s*0.52,1.9,0.42, 0,0,0, 8);
}
for (const s of [-1,1]){
  addBox(0.3,0.035,0.24, matSteel, s*0.78,0.86,0.2);
  addBox(0.05,0.3,0.05, matSteel, s*0.72,0.7,0.2);
}
for (const s of [-1,1]){
  addBox(0.06,0.95,0.06, matBody, s*0.44,1.82,0.34);
  addBox(0.06,0.95,0.06, matBody, s*0.47,1.82,-0.86);
  addBox(0.12,0.09,0.015, matDark, s*0.56,2.08,0.5);
  addCyl(0.01,0.01,0.14, matSteel, s*0.52,2.03,0.46, 0,0,0.6*s, 8);
}
addBox(1.06,0.07,1.5, matBody, 0,2.3,-0.26);
addBox(1.0,0.05,0.05, matDark, 0,2.24,0.42);
for (const s of [-1,1]){
  addBox(0.11,0.08,0.07, matDark, s*0.3,2.28,0.47);
  addCircle(0.035, matAmber, s*0.3,2.28,0.507);
}
addBox(0.46,0.1,0.42, matSeat, 0,1.36,-0.48);
addBox(0.46,0.44,0.09, matSeat, 0,1.62,-0.72, -0.18,0,0);
addTorus(0.06,0.012, matSteel, -0.12,1.27,-0.5, Math.PI/2,0,0);
addTorus(0.06,0.012, matSteel,  0.12,1.27,-0.5, Math.PI/2,0,0);
addCyl(0.05,0.05,0.3, matSteel, 0,1.18,-0.5, 0,0,0, 10);
addBox(0.5,0.32,0.14, matMud, 0,0.9,-1.28);
for (const s of [-1,1]) addBox(0.07,0.07,0.8, matMud, s*0.35,0.52,-1.3, 0.12,0,0);
addCyl(0.025,0.025,0.6, matSteel, 0,0.95,-1.42, 1.15,0,0, 10);
addBox(0.5,0.06,0.3, matMud, 0,0.42,-1.58);
addCyl(0.045,0.045,0.16, matSteel, 0,0.45,-1.66, Math.PI/2,0,0, 14);
addTorus(0.09,0.025, matSteel, 0,0.5,-1.72, Math.PI/2,0,0);
addBox(0.35,0.2,0.3, matMud, 0.86,1.55,-0.5);
addBox(0.22,0.3,0.12, matSteel, -0.86,1.6,0.05);
addCyl(0.03,0.03,0.04, matDark, -0.86,1.77,0.05, 0,0,0, 10);

/* wheels */
function buildWheelGeo(R, width, lugs){
  const rubber = [axisX(new THREE.CylinderGeometry(R, R, width, 26))];
  for (let i=0;i<lugs;i++){
    const a = i/lugs*Math.PI*2;
    const g = new THREE.BoxGeometry(width+0.02, 0.14, R*0.24);
    g.applyMatrix4(new THREE.Matrix4().makeRotationX(a)
      .multiply(new THREE.Matrix4().makeTranslation(0, R+0.05, 0)));
    rubber.push(g);
  }
  const painted = [
    axisX(new THREE.CylinderGeometry(R*0.62, R*0.62, width+0.05, 20)),
    axisX(new THREE.CylinderGeometry(R*0.2, R*0.2, width+0.16, 14)),
    axisX(new THREE.CylinderGeometry(R*0.07, R*0.18, 0.08, 12)).translate(0,(width+0.16)/2+0.03,0),
  ];
  for (let i=0;i<6;i++){
    const a = i/6*Math.PI*2;
    const b = new THREE.CylinderGeometry(0.02,0.02,0.04,8);
    b.rotateZ(Math.PI/2);
    b.translate((width+0.05)/2+0.015, Math.cos(a)*R*0.38, Math.sin(a)*R*0.38);
    painted.push(b);
  }
  return { rubber: mergeGeometries(rubber), painted: mergeGeometries(painted) };
}
const rearGeo = buildWheelGeo(0.7, 0.34, 16);
const frontGeo = buildWheelGeo(0.35, 0.2, 10);
function makeSpin(name, x, y, z, geo){
  const spin = new THREE.Group();
  spin.name = name;
  spin.position.set(x,y,z);
  veh.add(spin);
  const t = new THREE.Mesh(geo.rubber, matTire);
  const p = new THREE.Mesh(geo.painted, matHub);
  t.castShadow = t.receiveShadow = p.castShadow = p.receiveShadow = true;
  spin.add(t, p);
  return spin;
}
const rearSpinL = makeSpin('RearSpinL', -0.82,0.7,-0.95, rearGeo);
const rearSpinR = makeSpin('RearSpinR',  0.82,0.7,-0.95, rearGeo);
function makeFrontPivot(name, x){
  const pivot = new THREE.Group();
  pivot.name = name;
  pivot.position.set(x, 0.35, 1.32);
  veh.add(pivot);
  const spin = new THREE.Group();
  pivot.add(spin);
  const t = new THREE.Mesh(frontGeo.rubber, matTire);
  const p = new THREE.Mesh(frontGeo.painted, matHub);
  t.castShadow = t.receiveShadow = p.castShadow = p.receiveShadow = true;
  spin.add(t, p);
  return { pivot, spin };
}
const frontL = makeFrontPivot('PivotL', -0.56);
const frontR = makeFrontPivot('PivotR',  0.56);
const wheelPivots = [
  { pivot:rearSpinL, spin:rearSpinL, front:false },
  { pivot:rearSpinR, spin:rearSpinR, front:false },
  { pivot:frontL.pivot, spin:frontL.spin, front:true },
  { pivot:frontR.pivot, spin:frontR.spin, front:true },
];

/* water tank + spray cannon */
addBox(0.85,0.06,1.05, matBody, 0,1.4,-0.95);
addBox(0.5,0.06,0.1, matSteel, 0,1.46,-0.72);
addBox(0.5,0.06,0.1, matSteel, 0,1.46,-1.18);
addCyl(0.3,0.3,0.78, matTank, 0,1.74,-0.95, Math.PI/2,0,0, 24);
addTorus(0.31,0.015, matDark, 0,1.74,-0.72);
addTorus(0.31,0.015, matDark, 0,1.74,-1.18);
addCyl(0.05,0.05,0.08, matDark, 0,2.08,-0.82, 0,0,0, 12);
addCyl(0.018,0.018,0.22, matSteel, 0.31,1.74,-0.95, 0,0,0, 8);
addBox(0.22,0.2,0.22, matEco, 0.36,1.55,-0.52);
addCyl(0.05,0.05,0.14, matSteel, 0.36,1.7,-0.52, 0,0,0, 12);
{
  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.3,1.52,-0.62),
    new THREE.Vector3(0.52,1.72,-0.35),
    new THREE.Vector3(0.52,2.15,0.0),
    new THREE.Vector3(0.32,2.3,0.12),
    new THREE.Vector3(0.12,2.36,0.18),
  ]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(hoseCurve, 28, 0.022, 8), matDark);
  hose.castShadow = true;
  veh.add(hose);
}
addBox(0.1,0.06,0.12, matSteel, 0.12,2.35,0.15);
const cannon = new THREE.Group();
cannon.name = 'WaterCannon';
cannon.position.set(0.12,2.42,0.2);
cannon.rotation.x = -0.26;
veh.add(cannon);
addCyl(0.03,0.038,0.42, matSteel, 0,0,0.18, Math.PI/2,0,0, 14, cannon);
addCyl(0.042,0.042,0.06, matDark, 0,0,0.4, Math.PI/2,0,0, 14, cannon);
addBox(0.02,0.02,0.14, matDark, 0,-0.06,0.05, 0,0,0, cannon);
addBox(0.025,0.05,0.025, matDark, 0,-0.09,-0.01, 0,0,0, cannon);
const nozzle = new THREE.Object3D();
nozzle.position.set(0,0,0.46);
cannon.add(nozzle);
const ecoNozzle = new THREE.Object3D();
ecoNozzle.position.set(0, 1.0, 1.85);
veh.add(ecoNozzle);

/* front loader arm (waste collection) */
const loader = new THREE.Group();
loader.name = 'LoaderArm';
loader.position.set(0, 0.85, 0.95);
loader.rotation.x = 0.12;
veh.add(loader);
for (const s of [-1,1]){
  addBox(0.07,0.13,1.5, matSteel, s*0.45,0,0.72, 0.1,0,0, loader);
  addBox(0.06,0.5,0.07, matSteel, s*0.45,-0.24,1.32, 0,0,0, loader);
}
addBox(0.95,0.09,0.09, matSteel, 0,0.02,0.62, 0.1,0,0, loader);
addBox(0.9,0.08,0.08, matSteel, 0,-0.28,1.05, 0,0,0, loader);
for (const s of [-1,1]){
  addCyl(0.035,0.035,0.55, matDark, s*0.4,0.12,0.42, 1.25,0,0, 10, loader);
  addCyl(0.02,0.02,0.4, matSteel, s*0.4,-0.05,0.78, 1.25,0,0, 10, loader);
}
const bucket = new THREE.Group();
bucket.name = 'Bucket';
bucket.position.set(0,-0.42,1.38);
loader.add(bucket);
addBox(1.15,0.5,0.05, matSteel, 0,0.18,-0.24, -0.15,0,0, bucket);
addBox(1.15,0.05,0.52, matSteel, 0,-0.06,0.02, 0,0,0, bucket);
addBox(0.05,0.5,0.55, matSteel, -0.575,0.12,0, 0,0,0, bucket);
addBox(0.05,0.5,0.55, matSteel,  0.575,0.12,0, 0,0,0, bucket);
addBox(1.15,0.07,0.04, matDark, 0,-0.05,0.28, 0,0,0, bucket);
const bucketTip = new THREE.Object3D();
bucketTip.position.set(0,-0.1,0.35);
bucket.add(bucketTip);
const wasteBin = new THREE.Group();
wasteBin.position.set(0,0,-2.1);
veh.add(wasteBin);
addBox(1.3, 0.7, 0.8, matEco, 0,1.15,0, 0,0,0, wasteBin);
addBox(1.2, 0.08, 0.7, matDark, 0,1.52,0, 0,0,0, wasteBin);

/* headlights */
const headL = new THREE.SpotLight(0xffe9b0, 0, 40, 0.5, 0.55, 1.4);
const headR = new THREE.SpotLight(0xffe9b0, 0, 40, 0.5, 0.55, 1.4);
headL.position.set(-0.3,1.2,1.8); headR.position.set(0.3,1.2,1.8);
const headTgt = new THREE.Object3D(); headTgt.position.set(0, 0, 16);
veh.add(headL, headR, headTgt);
headL.target = headR.target = headTgt;

/* ═══════════ COCKPIT (mounted at the tractor's driver seat) ═══════════ */
const cockpit = new THREE.Group();
veh.add(cockpit);
/* steering wheel already modeled on the tractor (the big outer wheel); add a matching
   small dashboard wheel for the first-person view */
const steerGroup = new THREE.Group();
steerGroup.position.set(0, 1.46, 0.13);
steerGroup.rotation.x = -0.55;
cockpit.add(steerGroup);
const wheelMesh = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.022, 8, 24), matDark);
steerGroup.add(wheelMesh);
addBox(0.3, 0.02, 0.02, matDark, 0, 0, 0, 0,0,0, steerGroup);
addBox(0.02, 0.02, 0.3, matDark, 0, 0, 0, 0,0,0, steerGroup);
/* screens (canvas textures) mounted on the dashboard */
function makeScreen(w, h, px, py){
  const c = document.createElement('canvas'); c.width = px; c.height = py;
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace;
  const ms = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map:tx, side:THREE.DoubleSide }));
  cockpit.add(ms);
  return { c, g:c.getContext('2d'), tx, ms };
}
const scrMain = makeScreen(0.5, 0.3, 320, 200);
scrMain.ms.position.set(0, 1.62, 0.62); scrMain.ms.rotation.set(-0.35, Math.PI, 0);
const scrMap = makeScreen(0.28, 0.28, 220, 220);
scrMap.ms.position.set(0.4, 1.58, 0.5); scrMap.ms.rotation.set(-0.4, Math.PI-0.28, 0);
const scrMission = makeScreen(0.58, 0.13, 420, 96);
scrMission.ms.position.set(-0.02, 2.24, -0.24); scrMission.ms.rotation.set(0.5, Math.PI, 0);
/* gauges */
function makeGauge(x, label){
  const c = document.createElement('canvas'); c.width = c.height = 120;
  const g = c.getContext('2d');
  g.fillStyle = '#101810'; g.fillRect(0,0,120,120);
  g.strokeStyle = '#9db97a'; g.lineWidth = 4;
  g.beginPath(); g.arc(60,60,54,0,6.29); g.stroke();
  for (let i=0;i<=10;i++){
    const a = Math.PI*0.75 + i/10*Math.PI*1.5;
    g.strokeStyle = '#cfe0a8'; g.lineWidth = 2;
    g.beginPath();
    g.moveTo(60+Math.cos(a)*44, 60+Math.sin(a)*44);
    g.lineTo(60+Math.cos(a)*52, 60+Math.sin(a)*52);
    g.stroke();
  }
  g.fillStyle = '#9db97a'; g.font = '700 13px Chakra Petch'; g.textAlign = 'center';
  g.fillText(label, 60, 96);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.12,0.12), new THREE.MeshBasicMaterial({ map:tx, side:THREE.DoubleSide }));
  face.position.set(x, 1.18, 0.34); face.rotation.set(-1.15, Math.PI, 0);
  cockpit.add(face);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.05, 0.004),
    new THREE.MeshBasicMaterial({ color:0xe8b23a }));
  needle.position.set(x, 1.185, 0.345);
  needle.rotation.x = -1.15;
  cockpit.add(needle);
  return needle;
}
const gaugeWater = makeGauge(-0.24, 'WATER');
const gaugeEco = makeGauge(0.24, 'ECO');
/* buttons */
const cockpitButtons = [];
function makeButton(x, z, color, label, action){
  const c = document.createElement('canvas'); c.width = 96; c.height = 40;
  const g = c.getContext('2d');
  g.fillStyle = '#18201a'; g.fillRect(0,0,96,40);
  g.fillStyle = '#d6e6a8'; g.font = '700 15px Chakra Petch'; g.textAlign = 'center';
  g.fillText(label, 48, 26);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.035, 0.05),
    new THREE.MeshStandardMaterial({ color, emissive:color, emissiveIntensity:0.25, roughness:0.5 }));
  cap.position.set(x, 1.12, z);
  cap.userData = { action, baseY:1.12, pressT:0 };
  cockpit.add(cap);
  const tag = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.035), new THREE.MeshBasicMaterial({ map:tx, side:THREE.DoubleSide }));
  tag.position.set(x, 1.1, z+0.045); tag.rotation.set(-0.9, Math.PI, 0);
  cockpit.add(tag);
  cockpitButtons.push(cap);
}
makeButton(-0.16, 0.42, 0x6fae62, 'SCAN', 'scan');
makeButton(-0.02, 0.42, 0x4a8ab0, 'TRACK', 'track');
makeButton(0.12, 0.42, 0xe8b23a, 'ARM', 'arm');
makeButton(-0.16, 0.3, 0x4aa0c8, 'WATER', 'water');
makeButton(-0.02, 0.3, 0x8ac860, 'ECO', 'eco');
makeButton(0.12, 0.3, 0xc8a04a, 'PLANT', 'plant');
const warnLight = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8),
  new THREE.MeshStandardMaterial({ color:0xe8b23a, emissive:0xe8b23a, emissiveIntensity:0 }));
warnLight.position.set(0.3, 1.7, 0.55);
cockpit.add(warnLight);
/* cockpit camera rig anchored at the driver's seat, looking forward over the hood */
const lookYaw = new THREE.Group();
lookYaw.position.set(0, 1.9, -0.35);
veh.add(lookYaw);
const lookPitch = new THREE.Group();
lookYaw.add(lookPitch);
lookPitch.add(camera);
camera.position.set(0,0,0);

/* ═══════════════════ WILDLIFE ═══════════════════ */
const SPECIES = {
  oryx:    { name:'Arabian Oryx', sci:'Oryx leucoryx', habitat:'Desert plains and gravel flats',
    diet:'Grasses, herbs and bulbs', behavior:'Nomadic herds; can sense rainfall from far away',
    threats:'Past habitat loss and hunting — now fully protected', status:'VULNERABLE · REINTRODUCED',
    fact:'The Arabian Oryx was the first animal ever returned to the wild after disappearing from it.' },
  gazelle: { name:'Arabian Gazelle', sci:'Gazella arabica', habitat:'Open plains and wadi edges',
    diet:'Leaves, shoots and desert plants', behavior:'Alert herds; stots when alarmed',
    threats:'Habitat pressure and disturbance', status:'VULNERABLE',
    fact:'Gazelles can leap straight up into the air — a display called stotting.' },
  ibex:    { name:'Nubian Ibex', sci:'Capra nubiana', habitat:'Rocky mountain slopes and cliffs',
    diet:'Mountain grasses and shrubs', behavior:'Sure-footed climber; lives in small groups',
    threats:'Disturbance and fragmented habitat', status:'VULNERABLE',
    fact:'Males carry huge curved horns that can grow over a metre long.' },
  fox:     { name:'Red Fox', sci:'Vulpes vulpes arabica', habitat:'Deserts and rocky valleys',
    diet:'Insects, fruit and small prey', behavior:'Nocturnal; rests in dens during the day',
    threats:'Roads and reduced prey', status:'LEAST CONCERN',
    fact:'Its oversized ears help radiate heat and hear prey moving underground.' },
};
const animals = [];
const animalProxies = [];
function buildQuadruped(cfg){
  const g = new THREE.Group();
  const bm = new THREE.MeshStandardMaterial({ color:cfg.body, roughness:0.9 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(cfg.w, cfg.h, cfg.l), bm);
  body.position.y = cfg.legH + cfg.h/2;
  body.castShadow = true;
  g.add(body);
  const legs = [];
  for (const [lx, lz] of [[-1,1],[1,1],[-1,-1],[1,-1]]){
    const lg = new THREE.Group();
    lg.position.set(lx*cfg.w*0.38, cfg.legH, lz*cfg.l*0.38);
    const lm = new THREE.Mesh(new THREE.BoxGeometry(cfg.legW, cfg.legH, cfg.legW),
      new THREE.MeshStandardMaterial({ color:cfg.legs||cfg.body, roughness:0.9 }));
    lm.position.y = -cfg.legH/2;
    lm.castShadow = true;
    lg.add(lm);
    g.add(lg);
    legs.push(lg);
  }
  const neck = new THREE.Group();
  neck.position.set(0, cfg.legH + cfg.h*0.75, cfg.l*0.5);
  g.add(neck);
  const headM = new THREE.Mesh(new THREE.BoxGeometry(cfg.w*0.7, cfg.h*0.66, cfg.l*0.34), bm);
  headM.position.set(0, cfg.h*0.32, cfg.l*0.14);
  headM.castShadow = true;
  neck.add(headM);
  if (cfg.horns === 'straight'){
    for (const s of [-1,1]){
      const hn = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.03, 0.7, 6),
        new THREE.MeshStandardMaterial({ color:0xd8d2c0, roughness:0.6 }));
      hn.position.set(s*cfg.w*0.2, cfg.h*0.75, 0);
      hn.rotation.x = -0.25;
      neck.add(hn);
    }
  } else if (cfg.horns === 'curved'){
    for (const s of [-1,1]){
      const hn = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 6, 10, Math.PI*0.9),
        new THREE.MeshStandardMaterial({ color:0x6a5a48, roughness:0.7 }));
      hn.position.set(s*cfg.w*0.24, cfg.h*0.62, -0.02);
      hn.rotation.set(0, Math.PI/2*s, Math.PI*0.65);
      neck.add(hn);
    }
  } else if (cfg.horns === 'short'){
    for (const s of [-1,1]){
      const hn = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.02, 0.22, 6),
        new THREE.MeshStandardMaterial({ color:0x3a342c, roughness:0.7 }));
      hn.position.set(s*cfg.w*0.22, cfg.h*0.7, 0);
      neck.add(hn);
    }
  }
  if (cfg.ears){
    for (const s of [-1,1]){
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 6), bm);
      ear.position.set(s*cfg.w*0.26, cfg.h*0.72, -0.02);
      neck.add(ear);
    }
  }
  if (cfg.tail){
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.4), bm);
    tl.position.set(0, cfg.legH + cfg.h*0.8, -cfg.l*0.55);
    g.add(tl);
  }
  if (cfg.facePatch){
    const fp = new THREE.Mesh(new THREE.BoxGeometry(cfg.w*0.72, cfg.h*0.3, cfg.l*0.1),
      new THREE.MeshStandardMaterial({ color:cfg.facePatch, roughness:0.9 }));
    fp.position.set(0, cfg.h*0.42, cfg.l*0.28);
    neck.add(fp);
  }
  return { group:g, legs, neck, body };
}
const SPECIES_CFG = {
  oryx:    { w:0.62, h:0.62, l:1.35, legH:0.85, legW:0.09, body:0xf2efe6, legs:0x8a6a4a, facePatch:0x6a4a2e, horns:'straight', tail:true },
  gazelle: { w:0.42, h:0.42, l:0.95, legH:0.55, legW:0.06, body:0xc9995c, legs:0xb08048, horns:'short', tail:true },
  ibex:    { w:0.5, h:0.55, l:1.1, legH:0.7, legW:0.08, body:0x9a8a78, legs:0x7a6a5a, horns:'curved', tail:true },
  fox:     { w:0.26, h:0.24, l:0.55, legH:0.26, legW:0.045, body:0xd2691e, legs:0x8a4a1e, ears:true, tail:true },
};
const SPECIES_ZONE = { oryx:[2,1], gazelle:[0,1], ibex:[3], fox:[2] };
function spawnAnimal(sp, zn){
  const cfg = SPECIES_CFG[sp];
  const b = buildQuadruped(cfg);
  const a = Math.random()*Math.PI*2, d = Math.random()*zn.r*0.7;
  const x = zn.cx + Math.cos(a)*d, z = zn.cz + Math.sin(a)*d;
  b.group.position.set(x, terrainH(x,z), z);
  scene.add(b.group);
  const proxy = new THREE.Mesh(new THREE.SphereGeometry(Math.max(cfg.l*0.75, 1.1), 8, 6),
    new THREE.MeshBasicMaterial({ visible:false }));
  proxy.position.y = cfg.legH + cfg.h/2;
  b.group.add(proxy);
  const an = { sp, zn, mesh:b.group, legs:b.legs, neck:b.neck, body:b.body, proxy,
    state:'graze', timer:2+Math.random()*4, tx:x, tz:z, speed:0, phase:Math.random()*6.28,
    restY:0, nocturnal: sp==='fox' };
  proxy.userData.animal = an;
  animals.push(an);
  animalProxies.push(proxy);
}
function despawnAnimal(an){
  scene.remove(an.mesh);
  const i = animalProxies.indexOf(an.proxy);
  if (i>=0) animalProxies.splice(i,1);
  const j = animals.indexOf(an);
  if (j>=0) animals.splice(j,1);
}
function updatePopulations(){
  for (const sp in SPECIES_ZONE){
    for (const zi of SPECIES_ZONE[sp]){
      const zn = zones[zi];
      const want = Math.max(0, Math.min(5, Math.floor(zn.health/20)));
      const have = animals.filter(a => a.sp === sp && a.zn === zn).length;
      if (have < want) spawnAnimal(sp, zn);
      else if (have > want + 1 && Math.random() < 0.3){
        const victim = animals.find(a => a.sp === sp && a.zn === zn);
        if (victim && Math.hypot(victim.mesh.position.x-veh.position.x, victim.mesh.position.z-veh.position.z) > 80)
          despawnAnimal(victim);
      }
    }
  }
}
updatePopulations();
function isNight(){ const d = daylight(); return d < 0.22; }
function updateAnimals(dt){
  const night = isNight();
  for (const an of animals){
    an.mesh.visible = an.nocturnal ? night : true;
    if (!an.mesh.visible) continue;
    const p = an.mesh.position;
    const dv = Math.hypot(p.x-veh.position.x, p.z-veh.position.z);
    const restNow = !an.nocturnal && night;
    if (an.state !== 'flee' && dv < (an.sp==='fox'?14:19) && Math.abs(speed) > 0.4){
      an.state = 'flee';
      an.timer = 2.5;
      const away = Math.atan2(p.x-veh.position.x, p.z-veh.position.z);
      an.tx = p.x + Math.sin(away)*45;
      an.tz = p.z + Math.cos(away)*45;
    }
    an.timer -= dt;
    if (an.timer <= 0){
      if (restNow){ an.state = 'rest'; an.timer = 8+Math.random()*8; }
      else {
        an.state = Math.random() < 0.55 ? 'graze' : 'walk';
        an.timer = 3+Math.random()*6;
        const a = Math.random()*Math.PI*2, d = Math.random()*an.zn.r*0.6;
        an.tx = an.zn.cx + Math.cos(a)*d;
        an.tz = an.zn.cz + Math.sin(a)*d;
      }
    }
    let spd = 0;
    if (an.state === 'walk') spd = 1.1;
    if (an.state === 'flee') spd = an.sp==='fox' ? 5.2 : 4.2;
    if (spd > 0){
      const dx = an.tx-p.x, dz = an.tz-p.z;
      const d = Math.hypot(dx,dz);
      if (d > 1.5){
        const vx = dx/d*spd, vz = dz/d*spd;
        p.x += vx*dt; p.z += vz*dt;
        an.mesh.rotation.y = Math.atan2(vx, vz);
        an.phase += dt*spd*3.2;
        for (let li=0; li<4; li++)
          an.legs[li].rotation.x = Math.sin(an.phase + li*Math.PI)*0.45;
        an.neck.rotation.x = Math.sin(an.phase*0.5)*0.05;
      } else if (an.state === 'flee') an.state = 'graze';
    } else {
      for (const lg of an.legs) lg.rotation.x *= 0.9;
      if (an.state === 'graze') an.neck.rotation.x = 0.5 + Math.sin(elapsed*1.3+an.phase)*0.08;
      else an.neck.rotation.x *= 0.9;
    }
    p.y = terrainH(p.x, p.z) + (restNow ? -0.25 : 0);
    an.body.position.y = (SPECIES_CFG[an.sp].legH + SPECIES_CFG[an.sp].h/2) * (restNow ? 0.55 : 1);
  }
}
/* birds */
const birdMeshes = [];
for (let i=0;i<14;i++){
  const bg = new THREE.Group();
  const bm = new THREE.MeshStandardMaterial({ color:0x3a3f38, roughness:0.9, side:THREE.DoubleSide });
  const wA = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.2), bm);
  const wB = wA.clone();
  wA.position.x = -0.35; wB.position.x = 0.35;
  const bd = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.4, 6), bm);
  bd.rotation.x = Math.PI/2;
  bg.add(wA, wB, bd);
  bg.userData = { wA, wB, on:false, a:Math.random()*6.28, r:30+Math.random()*50, h:14+Math.random()*10, zn:zones[i%4], spd:0.25+Math.random()*0.3 };
  scene.add(bg);
  birdMeshes.push(bg);
}
function updateBirds(dt){
  const total = zones.reduce((s,z)=>s+z.health,0);
  const want = Math.min(14, Math.floor(total/55));
  birdMeshes.forEach((b, i) => {
    const u = b.userData;
    const on = i < want && daylight() > 0.25;
    b.visible = on;
    if (!on) return;
    u.a += dt*u.spd;
    const c = u.zn;
    b.position.set(c.cx+Math.cos(u.a)*u.r, terrainH(c.cx,c.cz)+u.h, c.cz+Math.sin(u.a)*u.r);
    b.rotation.y = -u.a;
    const flap = Math.sin(elapsed*9+i)*0.7;
    u.wA.rotation.z = flap; u.wB.rotation.z = -flap;
  });
}
/* tracks */
const trackSets = [];
function makeTrackSet(x0, z0, x1, z1, sp){
  const rec = { sp, pts:[], end:new THREE.Vector3(x1, 0, z1) };
  const n = 14;
  for (let i=0;i<=n;i++){
    const t = i/n;
    const x = x0+(x1-x0)*t + Math.sin(t*9)*2, z = z0+(z1-z0)*t + Math.cos(t*7)*2;
    rec.pts.push(new THREE.Vector3(x, terrainH(x,z)+0.03, z));
  }
  trackSets.push(rec);
}
makeTrackSet(-200, wadiZ(-180)+45, -135, wadiZ(-180)+95, 'gazelle');
makeTrackSet(120, 120, 195, 195, 'oryx');
makeTrackSet(-60, -180, -20, -235, 'ibex');
const trackGeo = new THREE.CircleGeometry(0.16, 6); trackGeo.rotateX(-Math.PI/2);
const trackPtMat = new THREE.MeshBasicMaterial({ color:0x4a3c28, transparent:true, opacity:0.55 });
const trackCount = trackSets.reduce((s,t)=>s+t.pts.length, 0);
const trackInst = new THREE.InstancedMesh(trackGeo, trackPtMat, trackCount);
{
  let ti = 0;
  for (const ts of trackSets){
    ts.pts.forEach((p, i) => {
      dummyV.position.copy(p);
      dummyV.rotation.set(0, i%2 ? 0.4 : -0.4, 0);
      dummyV.scale.set(1, 1, i%2?1.4:1.4);
      dummyV.updateMatrix();
      trackInst.setMatrixAt(ti++, dummyV.matrix);
    });
  }
}
scene.add(trackInst);

/* ═══════════════════ WASTE / DEBRIS ═══════════════════ */
const wasteItems = [];
const wasteMat = { plastic:new THREE.MeshStandardMaterial({ color:0xc8d4dc, roughness:0.4 }),
  bottle:new THREE.MeshStandardMaterial({ color:0x7ab8a0, roughness:0.3, transparent:true, opacity:0.85 }),
  branch:new THREE.MeshStandardMaterial({ color:0x6a5238, roughness:0.95 }),
  sack:new THREE.MeshStandardMaterial({ color:0xb0a890, roughness:0.9 }),
  can:new THREE.MeshStandardMaterial({ color:0xa0a8b0, roughness:0.35, metalness:0.6 }) };
function makeWaste(kind, x, z, scale=1){
  let ms;
  if (kind === 'bottle') ms = new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.3,8), wasteMat.bottle);
  else if (kind === 'branch') ms = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,1.4,6), wasteMat.branch);
  else if (kind === 'sack') ms = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.3,0.3), wasteMat.sack);
  else if (kind === 'can') ms = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.2,10), wasteMat.can);
  else ms = new THREE.Mesh(new THREE.PlaneGeometry(0.4,0.4), wasteMat.plastic);
  ms.rotation.set(Math.random()*0.6-0.3, Math.random()*6.28, Math.random()*0.6-0.3);
  if (kind === 'plastic') ms.rotation.x = -Math.PI/2 + 0.2;
  ms.position.set(x, terrainH(x,z)+0.15*scale, z);
  ms.scale.setScalar(scale);
  ms.castShadow = true;
  ms.userData = { isWaste:true, kind, collected:false };
  scene.add(ms);
  wasteItems.push(ms);
  return ms;
}
const blockageItems = [];
{
  const bx = 62, bz = wadiZ(62);
  blockageItems.push(makeWaste('branch', bx-1.5, bz-1, 1.4));
  blockageItems.push(makeWaste('branch', bx+1.2, bz+0.6, 1.2));
  blockageItems.push(makeWaste('sack', bx, bz, 1.5));
  blockageItems.push(makeWaste('plastic', bx-0.6, bz+1.2, 1.4));
  blockageItems.push(makeWaste('bottle', bx+0.8, bz-1.1, 1.3));
}
for (let i=0;i<10;i++){
  const zn = zones[i%4];
  const a = Math.random()*6.28, d = 20+Math.random()*zn.r*0.6;
  makeWaste(['bottle','can','sack','plastic'][i%4], zn.cx+Math.cos(a)*d, zn.cz+Math.sin(a)*d, 1);
}

/* ═══════════════════ PLANTED FLORA ═══════════════════ */
const planted = [];
const saplingGeo = new THREE.ConeGeometry(0.5, 1.2, 7);
const saplingMat = new THREE.MeshStandardMaterial({ color:0x5d8f3f, roughness:0.9 });
function plantSeed(x, z){
  const g = new THREE.Group();
  const ms = new THREE.Mesh(saplingGeo, saplingMat);
  ms.castShadow = true;
  g.add(ms);
  g.position.set(x, terrainH(x,z), z);
  g.scale.setScalar(0.12);
  scene.add(g);
  planted.push({ g, t:0, stage:0, x, z });
}
function updatePlanted(dt){
  for (const p of planted){
    if (p.stage >= 4) continue;
    p.t += dt;
    if (p.t > 18){
      p.t = 0; p.stage++;
      const sc = [0.12, 0.3, 0.6, 1.0, 1.25][p.stage];
      p.g.scale.setScalar(sc);
      if (p.stage === 4){
        const zn = zoneAt(p.x, p.z);
        if (zn) addHealth(zn, 4, 'NATIVE PLANT MATURED');
      }
    }
  }
}

/* ═══════════════════ PARTICLES ═══════════════════ */
const softTexP = (()=>{
  const c = document.createElement('canvas'); c.width=c.height=64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32,32,2,32,32,30);
  gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.55,'rgba(255,255,255,.5)'); gr.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
})();
const parts = [];
function spawnP(o){
  if (parts.length > 420) return;
  const m = new THREE.SpriteMaterial({ map:softTexP, color:o.color??0xffffff, transparent:true,
    opacity:o.opacity??1, depthWrite:false, blending:o.add?THREE.AdditiveBlending:THREE.NormalBlending });
  const s = new THREE.Sprite(m);
  s.position.copy(o.pos);
  const sz = o.size ?? 0.3;
  s.scale.set(sz,sz,1);
  scene.add(s);
  parts.push({ s, vel:o.vel.clone(), life:o.life, max:o.life, grow:o.grow??0, drag:o.drag??0, grav:o.grav??0, o0:o.opacity??1 });
}
function updateParts(dt){
  for (let i=parts.length-1;i>=0;i--){
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0){ scene.remove(p.s); p.s.material.dispose(); parts.splice(i,1); continue; }
    p.vel.multiplyScalar(Math.max(0,1-p.drag*dt));
    p.vel.y += p.grav*dt;
    p.vel.x += windX*dt*0.5; p.vel.z += windZ*dt*0.5;
    p.s.position.addScaledVector(p.vel, dt);
    if (p.grow){ const ns = p.s.scale.x + p.grow*dt; p.s.scale.set(ns,ns,1); }
    p.s.material.opacity = p.o0*(p.life/p.max);
  }
}
/* rain */
const RAIN_N = 1300;
const rainGeo = new THREE.BufferGeometry();
const rainPos = new Float32Array(RAIN_N*3);
for (let i=0;i<RAIN_N;i++){ rainPos[i*3]=0; rainPos[i*3+1]=-10; rainPos[i*3+2]=0; }
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos,3));
const rainPts = new THREE.Points(rainGeo, new THREE.PointsMaterial({ color:0x9fb8c8, size:0.09, transparent:true, opacity:0 }));
scene.add(rainPts);

/* ═══════════════════ AUDIO ═══════════════════ */
let AC = null, engOsc, engGain, noiseBuf, sprayGain, windGain;
function initAudio(){
  if (AC) return;
  try{
    AC = new (window.AudioContext||window.webkitAudioContext)();
    noiseBuf = AC.createBuffer(1, AC.sampleRate*2, AC.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i] = Math.random()*2-1;
    const es = AC.createBufferSource(); es.buffer = noiseBuf; es.loop = true;
    const ef = AC.createBiquadFilter(); ef.type='lowpass'; ef.frequency.value = 300;
    windGain = AC.createGain(); windGain.gain.value = 0.015;
    es.connect(ef); ef.connect(windGain); windGain.connect(AC.destination); es.start();
    engOsc = AC.createOscillator(); engOsc.type = 'sawtooth'; engOsc.frequency.value = 30;
    const e2 = AC.createOscillator(); e2.type='square'; e2.frequency.value = 15;
    const lp = AC.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value = 140;
    engGain = AC.createGain(); engGain.gain.value = 0;
    engOsc.connect(lp); e2.connect(lp); lp.connect(engGain); engGain.connect(AC.destination);
    engOsc.start(); e2.start();
    const ss = AC.createBufferSource(); ss.buffer = noiseBuf; ss.loop = true;
    const sf = AC.createBiquadFilter(); sf.type='bandpass'; sf.frequency.value = 2600; sf.Q.value = 0.6;
    sprayGain = AC.createGain(); sprayGain.gain.value = 0;
    ss.connect(sf); sf.connect(sprayGain); sprayGain.connect(AC.destination); ss.start();
  }catch(e){ AC = null; }
}
function beep(freq=880, dur=0.09, vol=0.12, type='square'){
  if (!AC) return;
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, AC.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime+dur);
  o.connect(g); g.connect(AC.destination);
  o.start(); o.stop(AC.currentTime+dur+0.02);
}
function scanPing(){ beep(920,0.07,0.1,'sine'); setTimeout(()=>beep(1380,0.12,0.1,'sine'), 90); }
function successChime(){ beep(660,0.12,0.12,'triangle'); setTimeout(()=>beep(880,0.12,0.12,'triangle'),120); setTimeout(()=>beep(1180,0.2,0.12,'triangle'),240); }
function servoSound(){ beep(240,0.18,0.08,'sawtooth'); }
function chirp(){
  if (!AC || daylight()<0.3) return;
  const f = 2400+Math.random()*1800;
  beep(f, 0.05, 0.03, 'sine');
  setTimeout(()=>beep(f*1.2, 0.06, 0.03, 'sine'), 80);
}

/* ═══════════════════ GAME STATE ═══════════════════ */
let viewMode = 'cockpit';
let lookYawV = 0, lookPitchV = 0;
let extYaw = 0.7, extPitch = 0.35, extDist = 11;
let speed = 0, steer = 0, heading = 0;
let waterTank = 100, ecoTank = 100, wasteStored = 0, seedsPlanted = 0;
let trackingOn = false;
let sprayingWater = false, sprayingEco = false;
let nightCam = false, thermalCam = false, lightsOn = false;
let elapsed = 0;
let windX = 0.4, windZ = 0.15;
let weather = 'CLEAR';
let weatherTimer = 60;
let armAnim = null;
const flags = { scanned:false, palmScanned:false, palmTreated:false, pond2Scanned:false, oryxScanned:false,
  ibexScanned:false, foxScanned:false, trackingUsed:false, debrisCleared:false };
const dbSet = new Set();

const toastEl = document.getElementById('toast');
const bigToastEl = document.getElementById('bigToast');
let toastTimer = null;
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toastEl.classList.remove('show'), 2600);
}
function bigToast(msg){
  bigToastEl.textContent = msg;
  bigToastEl.classList.add('show');
  setTimeout(()=>bigToastEl.classList.remove('show'), 3200);
}
function addHealth(zn, amt, reason){
  const before = zn.health;
  zn.health = Math.max(0, Math.min(100, zn.health + amt));
  if (zn.health !== before){
    if (reason) toast(`${zn.name}: HEALTH ${Math.round(zn.health)}%${amt>0?' ▲':' ▼'}`);
    refreshVeg(zoneIndex(zn));
    recolorTerrain();
    if (before < 85 && zn.health >= 85) bigToast(`${zn.name} · ECOSYSTEM RESTORED`);
  }
}
function currentZone(){ return zoneAt(veh.position.x, veh.position.z); }

/* ═══════════════════ SCANNING ═══════════════════ */
const raycaster = new THREE.Raycaster();
raycaster.far = 90;
const scanCard = document.getElementById('scanCard');
let listenText = '';
function showScanCard(kind, name, sci, bodyHtml, status, speak){
  document.getElementById('scanKind').textContent = kind;
  document.getElementById('scanName').textContent = name;
  document.getElementById('scanSci').textContent = sci || '';
  document.getElementById('scanBody').innerHTML = bodyHtml;
  const st = document.getElementById('scanStatus');
  if (status){ st.style.display = 'inline-block'; st.textContent = status; } else st.style.display = 'none';
  scanCard.style.display = 'block';
  listenText = speak || name;
}
document.getElementById('btnCloseScan').addEventListener('click', ()=>scanCard.style.display='none');
document.getElementById('btnListen').addEventListener('click', ()=>{
  if ('speechSynthesis' in window && listenText){
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(listenText);
    u.lang = 'en-US'; u.rate = 0.95;
    speechSynthesis.speak(u);
  }
  beep(1200, 0.08, 0.08, 'sine');
});
function kv(k, v){ return `<b>${k}</b>${v}`; }
function doScan(){
  if (viewMode !== 'cockpit' && viewMode !== 'external') return;
  scanPing();
  warnLight.material.emissiveIntensity = 2;
  flags.scanned = true;
  const origin = new THREE.Vector3();
  camera.getWorldPosition(origin);
  const dirV = new THREE.Vector3();
  camera.getWorldDirection(dirV);
  raycaster.set(origin, dirV);
  const targets = [...animalProxies, trunkInst, ...waterMeshes, terrain, ...wasteItems.filter(w=>!w.userData.collected)];
  const hits = raycaster.intersectObjects(targets, false);
  if (!hits.length){ toast('NOTHING IN RANGE'); return; }
  const h = hits[0];
  if (h.object.userData.animal){
    const an = h.object.userData.animal;
    const sp = SPECIES[an.sp];
    flags[an.sp+'Scanned'] = true;
    if (!dbSet.has(an.sp)){
      dbSet.add(an.sp);
      updateDb();
    }
    showScanCard('WILDLIFE SCANNER · SPECIES IDENTIFIED', sp.name, sp.sci,
      kv('HABITAT', sp.habitat) + kv('DIET', sp.diet) + kv('BEHAVIOR', sp.behavior) +
      kv('THREATS', sp.threats) + kv('FACT', sp.fact),
      sp.status, `${sp.name}. ${sp.fact}`);
    return;
  }
  if (h.object === trunkInst && h.instanceId !== undefined){
    const pd = palmDefs[h.instanceId];
    flags.palmScanned = true;
    const pest = pd.pest && pd.health < 75;
    const wl = pd.waterLow && pd.health < 75;
    showScanCard('PLANT SCANNER · PALM TREE', 'Date Palm', 'Phoenix dactylifera',
      kv('PLANT HEALTH', `${Math.round(pd.health)}%`) +
      kv('WATER', wl ? 'LOW' : 'ADEQUATE') +
      kv('PEST ACTIVITY', pest ? 'DETECTED' : 'NONE') +
      kv('SOIL', moistureAt(pd.x, pd.z) > 0.3 ? 'MOIST' : 'DRY'),
      pd.health < 50 ? 'NEEDS ATTENTION' : null,
      `Date palm. Health ${Math.round(pd.health)} percent.`);
    return;
  }
  if (waterMeshes.includes(h.object)){
    const p = h.object.userData.pond;
    if (p === ponds[1]) flags.pond2Scanned = true;
    const zn = zoneAt(p.x, p.cz);
    showScanCard('WATER SCANNER', p.name, 'Surface water source',
      kv('WATER LEVEL', `${Math.round(p.flow*70 + (zn?zn.water*0.3:0))}%`) +
      kv('WATER QUALITY', p.flow > 0.5 ? 'GOOD' : (p.blocked ? 'STAGNANT' : 'LOW')) +
      kv('TEMPERATURE', `${(18 + daylight()*14).toFixed(1)}°C`) +
      kv('POLLUTION', p.blocked ? 'DEBRIS DETECTED UPSTREAM' : 'LOW') +
      kv('FLOW', `${Math.round(p.flow*100)}%`),
      p.flow < 0.3 ? 'FLOW ABNORMAL' : null,
      `Water scan. Flow ${Math.round(p.flow*100)} percent.`);
    return;
  }
  if (h.object.userData.isWaste){
    showScanCard('OBJECT SCANNER', 'WASTE OBJECT', 'Artificial debris',
      kv('TYPE', h.object.userData.kind.toUpperCase()) +
      kv('IMPACT', 'Blocks water · degrades habitat') +
      kv('ACTION', 'The loader arm can collect it (get close, press G)'),
      'REMOVE WHEN POSSIBLE', 'Waste object detected. The loader arm can collect it.');
    return;
  }
  const pt = h.point;
  const moist = moistureAt(pt.x, pt.z);
  const zn = zoneAt(pt.x, pt.z);
  const rainBoost = weather === 'RAINY' ? 0.25 : 0;
  const m = Math.min(1, moist + rainBoost);
  showScanCard('SOIL SCANNER', 'GROUND SAMPLE', zn ? zn.name : 'OPEN TERRAIN',
    kv('SOIL MOISTURE', m > 0.5 ? 'GOOD' : (m > 0.25 ? 'MODERATE' : 'LOW')) +
    kv('TEMPERATURE', `${(14 + daylight()*24).toFixed(1)}°C`) +
    kv('HABITAT TYPE', zn ? zn.name : 'ROCKY HIGHLAND') +
    kv('PLANTING', (m > 0.3 && terrainH(pt.x,pt.z) < 12) ? 'SUITABLE' : 'NOT SUITABLE'),
    null, `Soil sample. Moisture ${Math.round(m*100)} percent.`);
}

const dbPanel = document.getElementById('dbPanel');
function updateDb(){
  const list = document.getElementById('dbList');
  if (!dbSet.size) return;
  list.innerHTML = '';
  for (const k of dbSet){
    const sp = SPECIES[k];
    const div = document.createElement('div');
    div.className = 'dbEntry';
    div.innerHTML = `<b>${sp.name}</b> <i style="color:#8b9671">${sp.sci}</i><br>${sp.status} · ${sp.habitat}`;
    list.appendChild(div);
  }
}
document.getElementById('dbClose').addEventListener('click', ()=>dbPanel.style.display='none');

/* ═══════════════════ ACTIONS ═══════════════════ */
function tryPlant(){
  const fx = veh.position.x + Math.sin(heading)*3.2;
  const fz = veh.position.z + Math.cos(heading)*3.2;
  const moist = moistureAt(fx, fz) + (weather==='RAINY'?0.25:0);
  const y = terrainH(fx, fz);
  if (moist > 0.3 && y < 12){
    plantSeed(fx, fz);
    seedsPlanted++;
    document.getElementById('eqSeeds').textContent = seedsPlanted;
    toast('SEED PLANTED · monitoring growth');
    beep(520, 0.1, 0.1, 'triangle');
  } else {
    toast('NOT SUITABLE · soil too dry or terrain too steep');
    beep(180, 0.16, 0.1, 'square');
  }
}
const v1 = new THREE.Vector3(), q1 = new THREE.Quaternion(), dirVec = new THREE.Vector3();
function updateSpray(dt){
  sprayingWater = (keys['Space']) && waterTank > 0 && !armAnim;
  sprayingEco = (keys['KeyX']) && ecoTank > 0 && !armAnim;
  if (sprayingWater){
    waterTank = Math.max(0, waterTank - 6*dt);
    nozzle.getWorldPosition(v1);
    nozzle.getWorldQuaternion(q1);
    dirVec.set(0,0,1).applyQuaternion(q1);
    for (let i=0;i<3;i++){
      const spread = new THREE.Vector3((Math.random()-0.5)*0.5, -0.3-Math.random()*0.4, (Math.random()-0.5)*0.5);
      spawnP({ pos:v1.clone(), vel:dirVec.clone().multiplyScalar(4+Math.random()*3).add(spread),
        life:0.7+Math.random()*0.4, size:0.16, color:0xbfe4f2, grav:-8, drag:0.3, opacity:0.85 });
    }
    const fx = veh.position.x + Math.sin(heading)*4, fz = veh.position.z + Math.cos(heading)*4;
    for (let pi=0; pi<palmDefs.length; pi++){
      const pd = palmDefs[pi];
      if (pd.waterLow && Math.hypot(pd.x-fx, pd.z-fz) < 6){
        pd.health = Math.min(100, pd.health + 6*dt);
        pd.waterLow = pd.health < 70;
        if (Math.random() < dt*2) updatePalmTint(pi);
        if (pd.health > 65 && !pd.treated){ pd.treated = true; flags.palmTreated = true; addHealth(zoneAt(pd.x,pd.z), 8, 'PALM RECOVERING'); }
      }
    }
    const zn = currentZone();
    if (zn && Math.random() < dt*0.35) addHealth(zn, 0.5, null);
  }
  if (sprayingEco){
    ecoTank = Math.max(0, ecoTank - 7*dt);
    ecoNozzle.getWorldPosition(v1);
    const fwd = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    for (let i=0;i<4;i++){
      spawnP({ pos:v1.clone(), vel:fwd.clone().multiplyScalar(2+Math.random()*1.5).add(new THREE.Vector3((Math.random()-0.5),0.6+Math.random(),(Math.random()-0.5))),
        life:1.4+Math.random()*0.8, size:0.4, color:0xd8eecf, grow:1.1, drag:1.4, opacity:0.3 });
    }
    const fx = veh.position.x + Math.sin(heading)*3.5, fz = veh.position.z + Math.cos(heading)*3.5;
    for (let pi=0; pi<palmDefs.length; pi++){
      const pd = palmDefs[pi];
      if (pd.pest && pd.health < 80 && Math.hypot(pd.x-fx, pd.z-fz) < 7){
        pd.health = Math.min(100, pd.health + 9*dt);
        pd.pest = pd.health < 78;
        if (Math.random() < dt*2) updatePalmTint(pi);
        if (pd.health > 65 && !pd.treated){ pd.treated = true; flags.palmTreated = true; addHealth(zoneAt(pd.x,pd.z), 10, 'ECO TREATMENT EFFECTIVE'); }
      }
    }
  }
  if (AC && sprayGain) sprayGain.gain.setTargetAtTime((sprayingWater||sprayingEco)?0.1:0, AC.currentTime, 0.08);
  for (const p of ponds){
    if (p.flow > 0.6 && Math.hypot(veh.position.x-p.x, veh.position.z-p.cz) < p.r+8){
      if (waterTank < 100){ waterTank = Math.min(100, waterTank + 12*dt); ecoTank = Math.min(100, ecoTank + 8*dt); }
    }
  }
}
/* loader arm — collects waste like the tractor's hay bales */
function armGrab(){
  if (armAnim) return;
  let best = null, bd = 8;
  for (const w of wasteItems){
    if (w.userData.collected) continue;
    const d = Math.hypot(w.position.x-veh.position.x, w.position.z-veh.position.z);
    if (d < bd){ bd = d; best = w; }
  }
  if (!best){ toast('ARM: NO OBJECT IN REACH'); beep(180,0.15,0.1,'square'); return; }
  servoSound();
  armAnim = { phase:0, t:0, item:best };
  toast('ARM: LOWER → COLLECT');
}
function updateArm(dt){
  if (!armAnim) return;
  const A = armAnim;
  A.t += dt;
  if (A.phase === 0){
    const k = Math.min(1, A.t/0.6);
    loader.rotation.x = 0.12 + (-0.55-0.12)*k;
    bucket.rotation.x = 0.6*k;
    if (k >= 1){
      A.phase = 1; A.t = 0;
      A.item.userData.collected = true;
      scene.remove(A.item);
      beep(1500, 0.06, 0.1, 'sine');
      spawnP({ pos:bucketTip.getWorldPosition(v1).clone(), vel:new THREE.Vector3(0,1.4,0), life:0.5, size:0.3, color:0xc8e6a0, grow:1.5, drag:1, opacity:0.6 });
      toast('WASTE GRABBED');
    }
  } else if (A.phase === 1){
    if (A.t > 0.4){ A.phase = 2; A.t = 0; servoSound(); }
  } else if (A.phase === 2){
    const k = Math.min(1, A.t/0.6);
    loader.rotation.x = -0.55 + (0.12-(-0.55))*k;
    bucket.rotation.x = 0.6*(1-k);
    if (k >= 1){
      wasteStored++;
      document.getElementById('eqWaste').textContent = wasteStored;
      const zn = currentZone();
      if (zn) addHealth(zn, 6, 'AREA CLEANED');
      toast('WASTE COLLECTED · stored for recycling');
      successChime();
      if (blockageItems.includes(A.item)){
        blockageItems.splice(blockageItems.indexOf(A.item), 1);
        if (blockageItems.length === 0 && !flags.debrisCleared){
          flags.debrisCleared = true;
          ponds[1].flow = 1; ponds[1].blocked = false;
          zones[1].water = 85;
          addHealth(zones[1], 22, 'WADI HYDROLOGY RESTORED');
          bigToast('WATER RETURNS');
        }
      }
      armAnim = null;
    }
  }
}

/* ═══════════════════ MISSIONS ═══════════════════ */
let level = 1;
const storyMissions = [
  { world:'WORLD 1 · PALM HABITAT', title:'SYSTEMS CHECK',
    hint:'The cabin is alive with screens and switches. Use SCAN (E) on anything — a palm, the water, the ground.',
    check:()=>flags.scanned },
  { world:'WORLD 1 · PALM HABITAT', title:'THE TIRED PALMS',
    hint:'Some fronds look pale. SCAN (E) a palm tree and read what the plant monitor says.',
    check:()=>flags.palmScanned },
  { world:'WORLD 1 · PALM HABITAT', title:'FIND THE CAUSE',
    hint:'The scan showed a problem — pests or thirst. Watch the readings, choose a response, and stay close while it works.',
    check:()=>flags.palmTreated },
  { world:'WORLD 2 · WADI', title:'THE SILENT CHANNEL',
    hint:'WATER FLOW: 0% downstream. Scan the dry wadi water, then follow the channel upstream with your eyes.',
    check:()=>flags.pond2Scanned },
  { world:'WORLD 2 · WADI', title:'WHAT BLOCKS THE WATER',
    hint:'Something piles up in the channel. Drive to it. The loader arm (G) works when you are close.',
    check:()=>flags.debrisCleared },
  { world:'WORLD 3 · PLAINS', title:'WHAT THE SAND REMEMBERS',
    hint:'The plain feels empty — but tracks remain. Enable TRACKING (C) and follow what the sand remembers.',
    check:()=>flags.trackingUsed && flags.oryxScanned },
  { world:'WORLD 3 · PLAINS', title:'SEEDS OF TOMORROW',
    hint:'Scan the soil first. Where it says SUITABLE, plant (P) three native seeds.',
    check:()=>seedsPlanted >= 3 },
  { world:'WORLD 1 · PALM HABITAT', title:'LET THE OASIS BREATHE',
    hint:'Clean, water, treat, plant — and watch the number. Raise PALM OASIS health to 60%.',
    check:()=>zones[0].health >= 60 },
  { world:'WORLD 4 · MOUNTAINS', title:'KEEPERS OF THE CLIFFS',
    hint:'The reserve speaks in echoes. Find the climbers on the high ground and SCAN (E) them.',
    check:()=>flags.ibexScanned },
  { world:'WORLD 5 · NIGHT RESERVE', title:'EYES IN THE DARK',
    hint:'Wait for night (or press T to hurry time). Switch to NIGHT CAMERA (N) and find the small hunter.',
    check:()=>flags.foxScanned },
];
function generatedMission(n){
  const kinds = n % 3;
  if (kinds === 0){
    const zn = zones[n % zones.length];
    const target = Math.min(95, zn.health + 15);
    return { world:`WORLD ${Math.min(7, 5+((n/3)|0))} · RESTORATION`, title:`RESTORE THE ${zn.name}`,
      hint:`Every tool you have feeds this place. Raise its health to ${Math.round(target)}%.`,
      check:()=>zn.health >= target };
  } else if (kinds === 1){
    const need = 3;
    const start = wasteStored;
    return { world:'WORLD 6 · CLEAN LANDS', title:'CLEAR THE LAND',
      hint:`Litter degrades the habitat. Collect ${need} waste objects with the arm.`,
      check:()=>wasteStored - start >= need };
  } else {
    const start = seedsPlanted;
    return { world:'WORLD 7 · GREEN FUTURE', title:'PLANT THE FUTURE',
      hint:`Read the soil before you trust it. Plant ${3} seeds where the ground accepts them.`,
      check:()=>seedsPlanted - start >= 3 };
  }
}
let mission = storyMissions[0];
let missionCooldown = 0;
function setMission(m){
  mission = m;
  document.getElementById('missionWorld').textContent = m.world;
  document.getElementById('missionTitle').textContent = m.title;
  document.getElementById('missionHint').textContent = m.hint;
}
function updateMissions(dt){
  missionCooldown -= dt;
  if (missionCooldown > 0) return;
  if (mission.check()){
    missionCooldown = 3;
    successChime();
    bigToast('MISSION COMPLETE');
    level++;
    setTimeout(()=>{
      const next = level <= storyMissions.length ? storyMissions[level-1] : generatedMission(level);
      setMission(next);
      toast(`MISSION ${level}: ${next.title}`);
    }, 2600);
  }
}

/* ═══════════════════ INPUT ═══════════════════ */
const keys = {};
let rmbDown = false, lmbDown = false, mxLast = 0, myLast = 0;
addEventListener('keydown', e=>{
  keys[e.code] = true;
  if (e.code === 'Space') e.preventDefault();
  if (e.code === 'KeyV'){
    viewMode = viewMode === 'cockpit' ? 'external' : 'cockpit';
    toast(viewMode === 'cockpit' ? 'COCKPIT VIEW' : 'EXTERNAL VEHICLE VIEW');
    beep(700, 0.07, 0.08);
  }
  if (e.code === 'KeyE') doScan();
  if (e.code === 'KeyC'){
    trackingOn = !trackingOn;
    if (trackingOn) flags.trackingUsed = true;
    toast(trackingOn ? 'TRACKING SCANNER: ACTIVE' : 'TRACKING SCANNER: OFF');
    beep(trackingOn?1100:500, 0.08, 0.08);
  }
  if (e.code === 'KeyG') armGrab();
  if (e.code === 'KeyP') tryPlant();
  if (e.code === 'KeyN'){
    nightCam = !nightCam; thermalCam = false;
    document.getElementById('fxNight').style.display = nightCam ? 'block' : 'none';
    document.getElementById('fxThermal').style.display = 'none';
    toast(nightCam ? 'NIGHT CAMERA: ON' : 'NIGHT CAMERA: OFF');
  }
  if (e.code === 'KeyB'){
    thermalCam = !thermalCam; nightCam = false;
    document.getElementById('fxThermal').style.display = thermalCam ? 'block' : 'none';
    document.getElementById('fxNight').style.display = 'none';
    toast(thermalCam ? 'THERMAL CAMERA: ON' : 'THERMAL CAMERA: OFF');
  }
  if (e.code === 'KeyI'){
    dbPanel.style.display = dbPanel.style.display === 'block' ? 'none' : 'block';
  }
  if (e.code === 'KeyL'){
    lightsOn = !lightsOn;
    toast(lightsOn ? 'WORK LIGHTS: ON' : 'WORK LIGHTS: OFF');
  }
  if (e.code === 'KeyT'){
    timeSpeed = timeSpeed === 1 ? 26 : 1;
    toast(timeSpeed === 1 ? 'TIME: NORMAL' : 'TIME: FAST');
  }
});
addEventListener('keyup', e=>keys[e.code] = false);
renderer.domElement.addEventListener('mousedown', e=>{
  if (e.button === 2){ rmbDown = true; }
  if (e.button === 0){ lmbDown = true; clickScan(e); }
  mxLast = e.clientX; myLast = e.clientY;
});
addEventListener('mouseup', e=>{
  if (e.button === 2) rmbDown = false;
  if (e.button === 0) lmbDown = false;
});
addEventListener('mousemove', e=>{
  const dx = e.clientX-mxLast, dy = e.clientY-myLast;
  mxLast = e.clientX; myLast = e.clientY;
  if (rmbDown && viewMode === 'cockpit'){
    lookYawV = THREE.MathUtils.clamp(lookYawV - dx*0.0032, -2.6, 2.6);
    lookPitchV = THREE.MathUtils.clamp(lookPitchV - dy*0.0028, -0.9, 0.75);
  }
  if (lmbDown && viewMode === 'external'){
    extYaw -= dx*0.005;
    extPitch = THREE.MathUtils.clamp(extPitch + dy*0.003, 0.05, 1.2);
  }
});
addEventListener('wheel', e=>{
  if (viewMode === 'external') extDist = THREE.MathUtils.clamp(extDist + e.deltaY*0.01, 6, 26);
}, { passive:true });
renderer.domElement.addEventListener('contextmenu', e=>e.preventDefault());
function clickScan(e){
  if (viewMode !== 'cockpit') return;
  const nx = (e.clientX/innerWidth)*2-1, ny = -(e.clientY/innerHeight)*2+1;
  raycaster.setFromCamera({ x:nx, y:ny }, camera);
  const hits = raycaster.intersectObjects(cockpitButtons, false);
  if (hits.length){
    const b = hits[0].object;
    b.userData.pressT = 1;
    beep(840, 0.06, 0.09);
    const a = b.userData.action;
    if (a === 'scan') doScan();
    else if (a === 'track'){ document.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyC'})); }
    else if (a === 'arm') armGrab();
    else if (a === 'plant') tryPlant();
    else if (a === 'water') toast('HOLD SPACE — WATER SPRAY');
    else if (a === 'eco') toast('HOLD X — ECO MIST');
  }
}

/* ═══════════════════ COCKPIT SCREENS ═══════════════════ */
const mapMini = (()=>{
  const c = document.createElement('canvas'); c.width = c.height = 220;
  const g = c.getContext('2d');
  for (let y=0;y<220;y++){
    for (let x=0;x<220;x++){
      const wx = (x/220-0.5)*800, wz = (y/220-0.5)*800;
      const h = terrainH(wx, wz);
      let col;
      if (h < -3) col = '#8a744e';
      else if (h > 16) col = '#7a6c58';
      else col = `rgb(${150-h*2},${140-h},${86})`;
      g.fillStyle = col;
      g.fillRect(x, y, 1, 1);
    }
  }
  g.strokeStyle = 'rgba(80,140,180,0.9)'; g.lineWidth = 3;
  g.beginPath();
  for (let x=0;x<=220;x+=4){
    const wx = (x/220-0.5)*800;
    const wz = wadiZ(wx);
    const y = (wz/800+0.5)*220;
    if (x===0) g.moveTo(x,y); else g.lineTo(x,y);
  }
  g.stroke();
  return c;
})();
const fogGrid = new Uint8Array(64*64);
function drawMap(){
  const g = scrMap.g;
  g.drawImage(mapMini, 0, 0);
  const vi = Math.floor(((veh.position.x/800)+0.5)*64), vj = Math.floor(((veh.position.z/800)+0.5)*64);
  for (let i=-6;i<=6;i++) for (let j=-6;j<=6;j++){
    const ii = vi+i, jj = vj+j;
    if (ii>=0 && ii<64 && jj>=0 && jj<64 && i*i+j*j <= 36) fogGrid[jj*64+ii] = 1;
  }
  g.fillStyle = 'rgba(8,12,8,0.88)';
  for (let j=0;j<64;j++) for (let i=0;i<64;i++){
    if (!fogGrid[j*64+i]) g.fillRect(i/64*220, j/64*220, 220/64+0.5, 220/64+0.5);
  }
  for (const zn of zones){
    g.strokeStyle = 'rgba(232,178,58,0.5)';
    g.beginPath();
    g.arc((zn.cx/800+0.5)*220, (zn.cz/800+0.5)*220, zn.r/800*220, 0, 6.29);
    g.stroke();
  }
  const vx = (veh.position.x/800+0.5)*220, vy = (veh.position.z/800+0.5)*220;
  g.save();
  g.translate(vx, vy); g.rotate(-heading);
  g.fillStyle = '#ffe08a';
  g.beginPath(); g.moveTo(0,-6); g.lineTo(4,5); g.lineTo(-4,5); g.closePath(); g.fill();
  g.restore();
  scrMap.tx.needsUpdate = true;
}
function drawMainScreen(){
  const g = scrMain.g;
  g.fillStyle = '#0c1410'; g.fillRect(0,0,320,200);
  g.strokeStyle = '#2c4030'; g.strokeRect(2,2,316,196);
  g.fillStyle = '#9db97a'; g.font = '700 13px Chakra Petch';
  g.fillText('RANGER TRACTOR UNIT', 12, 22);
  g.font = '11px Chakra Petch'; g.fillStyle = '#d6e6a8';
  const zn = currentZone();
  const lines = [
    `HABITAT: ${zn ? zn.name : 'HIGHLAND'}`,
    `HEALTH: ${zn ? Math.round(zn.health)+'%' : '--'}   WATER: ${zn ? Math.round(zn.water)+'%' : '--'}`,
    `GPS: ${veh.position.x.toFixed(0)}, ${veh.position.z.toFixed(0)}`,
    `TRACKING: ${trackingOn ? 'ACTIVE' : 'STANDBY'}`,
    `SPECIES LOGGED: ${dbSet.size} / 4`,
  ];
  lines.forEach((l, i)=>g.fillText(l, 12, 46+i*20));
  if (trackingOn){
    let best = null, bd = 1e9;
    for (const ts of trackSets){
      const d = Math.hypot(ts.end.x-veh.position.x, ts.end.z-veh.position.z);
      if (d < bd){ bd = d; best = ts; }
    }
    if (best){
      g.fillStyle = '#ffe08a';
      g.fillText(bd < 28 ? `TRACK DETECTED · ${SPECIES[best.sp].name.toUpperCase()} NEARBY` :
        `TRACK DETECTED · ${bd.toFixed(0)}m · ${SPECIES[best.sp].name.split(' ')[1]||'SIGN'}`, 12, 168);
    }
  }
  scrMain.tx.needsUpdate = true;
}
function drawMissionScreen(){
  const g = scrMission.g;
  g.fillStyle = '#101810'; g.fillRect(0,0,420,96);
  g.fillStyle = '#e8b23a'; g.font = '700 13px Chakra Petch';
  g.fillText(`MISSION ${level} · ${mission.title}`, 12, 24);
  g.fillStyle = '#cfe0a8'; g.font = '11px Chakra Petch';
  const words = mission.hint.split(' ');
  let line = '', y = 46;
  for (const w of words){
    if ((line+w).length > 58){ g.fillText(line, 12, y); y += 17; line = ''; }
    line += w + ' ';
  }
  g.fillText(line, 12, y);
  scrMission.tx.needsUpdate = true;
}
let screenT = 0;

/* ═══════════════════ MAIN LOOP ═══════════════════ */
const clock = new THREE.Clock();
let started = false;
let popT = 0, chirpT = 3;
const hintBar = document.getElementById('hintBar');
function contextualHint(){
  if (armAnim) return 'ARM OPERATING…';
  let nearWaste = false;
  for (const w of wasteItems){
    if (!w.userData.collected && Math.hypot(w.position.x-veh.position.x, w.position.z-veh.position.z) < 8){ nearWaste = true; break; }
  }
  if (nearWaste) return 'Waste in reach — press <b>G</b> to use the loader arm';
  if (trackingOn) return 'Tracking active — follow the old signs';
  return 'Press <b>E</b> to SCAN · <b>V</b> external view · <b>SPACE</b> water · <b>X</b> eco mist';
}
function updateVehicle(dt){
  let throttle = (keys['KeyW']?1:0) - (keys['KeyS']?1:0);
  let steerIn = (keys['KeyD']?1:0) - (keys['KeyA']?1:0);
  if (armAnim){ throttle = 0; steerIn = 0; }
  if (throttle > 0) speed = Math.min(11, speed + 5.5*dt);
  else if (throttle < 0) speed = Math.max(-4, speed - 4.5*dt);
  else speed *= Math.max(0, 1-1.3*dt);
  steer += (steerIn*0.55 - steer)*Math.min(1, dt*5);
  if (Math.abs(speed) > 0.05) heading += steer * (speed/6) * dt * 1.6;
  const fx = Math.sin(heading), fz = Math.cos(heading);
  veh.position.x += fx*speed*dt;
  veh.position.z += fz*speed*dt;
  const rad = Math.hypot(veh.position.x, veh.position.z);
  if (rad > 370){ veh.position.multiplyScalar(370/rad); speed *= 0.4; }
  const yF = terrainH(veh.position.x+fx*1.4, veh.position.z+fz*1.4);
  const yB = terrainH(veh.position.x-fx*1.4, veh.position.z-fz*1.4);
  const yL = terrainH(veh.position.x-fz*1.0, veh.position.z+fx*1.0);
  const yR = terrainH(veh.position.x+fz*1.0, veh.position.z-fx*1.0);
  const baseY = (yF+yB+yL+yR)/4;
  veh.position.y = baseY + Math.sin(elapsed*18)*0.006*Math.min(1, Math.abs(speed)/4);
  veh.rotation.y = heading;
  veh.rotation.x = Math.atan2(yB-yF, 2.8)*0.85;
  veh.rotation.z = Math.atan2(yL-yR, 2.0)*0.85;
  for (const w of wheelPivots){
    w.spin.rotation.x += speed/0.62*dt;
    if (w.front) w.pivot.rotation.y = steer*0.9;
  }
  steerGroup.rotation.z = -steer*2.4;
  if (Math.abs(speed) > 5 && Math.random() < dt*14){
    const bp = new THREE.Vector3(-fx*1.8, 0.25, -fz*1.8).add(veh.position);
    spawnP({ pos:bp, vel:new THREE.Vector3((Math.random()-0.5)*1.5, 0.6+Math.random(), (Math.random()-0.5)*1.5),
      life:0.9, size:0.6, color:0xb0a078, grow:2, drag:1.5, opacity:0.3 });
  }
  if (Math.abs(throttle) > 0 && Math.random() < dt*8){
    exhaustAnchor.getWorldPosition(v1);
    spawnP({ pos:v1.clone(), vel:new THREE.Vector3((Math.random()-0.5)*0.3, 1+Math.random(), (Math.random()-0.5)*0.3),
      life:0.9, size:0.25, color:0x5a5852, grow:1.2, drag:1, opacity:0.35 });
  }
}
function updateCamera(dt){
  if (viewMode === 'cockpit'){
    lookYaw.rotation.y = lookYawV + Math.PI;
    lookPitch.rotation.x = lookPitchV;
  } else {
    extYaw += dt*0.08;
    const cx = veh.position.x + Math.sin(extYaw)*Math.cos(extPitch)*extDist;
    const cz = veh.position.z + Math.cos(extYaw)*Math.cos(extPitch)*extDist;
    const cy = veh.position.y + 1.5 + Math.sin(extPitch)*extDist;
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), Math.min(1, dt*5));
    camera.lookAt(veh.position.x, veh.position.y+1.2, veh.position.z);
  }
}
function updateDayNight(dt){
  timeOfDay = (timeOfDay + dt*timeSpeed/360) % 1;
  const { el } = sunAngles();
  const d = daylight();
  const sx = Math.cos((timeOfDay-0.25)*Math.PI*2);
  sun.position.set(veh.position.x + sx*180, Math.max(8, el*220), veh.position.z + 60);
  sun.target.position.copy(veh.position);
  moonL.position.set(veh.position.x-80, 150, veh.position.z-40);
  let skyC, fogC;
  if (d > 0.55){ skyC = skyDay; fogC = fogDay; }
  else if (d > 0.2){ const t = (d-0.2)/0.35; skyC = skyNight.clone().lerp(skyDusk, t).lerp(skyDay, Math.max(0,t-0.5)*2); fogC = fogNight.clone().lerp(fogDusk, t); }
  else { skyC = skyNight; fogC = fogNight; }
  if (weather === 'DUSTY'){ fogC = fogC.clone().lerp(new THREE.Color(0xd8b878), 0.5); }
  if (weather === 'RAINY'){ skyC = skyC.clone().lerp(new THREE.Color(0x8a98a0), 0.4); fogC = fogC.clone().lerp(new THREE.Color(0x9aa8a8), 0.4); }
  scene.background = skyC;
  scene.fog.color.copy(fogC);
  scene.fog.far = weather === 'DUSTY' ? 220 : (weather === 'RAINY' ? 300 : 420);
  sun.intensity = 2.5*d*(weather==='RAINY'?0.55:1);
  hemi.intensity = 0.25 + d*0.55;
  moonL.intensity = (1-d)*0.5;
  stars.material.opacity = Math.max(0, (1-d*2))*0.9;
  stars.position.copy(veh.position);
  headL.intensity = headR.intensity = (lightsOn || d < 0.3) ? 90 : 0;
}
function updateWeather(dt){
  weatherTimer -= dt;
  if (weatherTimer <= 0){
    weatherTimer = 70 + Math.random()*60;
    const r = Math.random();
    const before = weather;
    weather = r < 0.55 ? 'CLEAR' : r < 0.75 ? 'WINDY' : r < 0.9 ? 'DUSTY' : 'RAINY';
    if (weather !== before){
      toast(`WEATHER: ${weather}`);
      if (weather === 'RAINY'){
        for (const zn of zones){ zn.water = Math.min(100, zn.water + 8); }
        zones.forEach((z,i)=>refreshVeg(i));
      }
    }
  }
  windX = (weather === 'WINDY' ? 2.2 : 0.5) * Math.sin(elapsed*0.2) + 0.4;
  windZ = (weather === 'WINDY' ? 1.6 : 0.3) * Math.cos(elapsed*0.17);
  rainPts.material.opacity = weather === 'RAINY' ? 0.65 : 0;
  if (weather === 'RAINY'){
    const p = rainGeo.attributes.position;
    for (let i=0;i<RAIN_N;i++){
      let y = p.getY(i) - 34*dt;
      if (y < 0 || p.getX(i) === 0){
        p.setXYZ(i, veh.position.x + (Math.random()-0.5)*70, 26+Math.random()*8, veh.position.z + (Math.random()-0.5)*70);
      } else p.setY(i, y);
    }
    p.needsUpdate = true;
  }
  if ((weather === 'DUSTY' || weather === 'WINDY') && Math.random() < dt*3){
    const dp = new THREE.Vector3(veh.position.x+(Math.random()-0.5)*40, terrainH(veh.position.x,veh.position.z)+0.5, veh.position.z+(Math.random()-0.5)*40);
    spawnP({ pos:dp, vel:new THREE.Vector3(windX*2, 0.4, windZ*2), life:2, size:1.4, color:0xc8b088, grow:1.5, drag:0.3, opacity:0.18 });
  }
}
function updateHud(){
  const zn = currentZone();
  document.getElementById('zName').textContent = zn ? zn.name : 'HIGHLAND';
  document.getElementById('zHealth').textContent = zn ? Math.round(zn.health)+'%' : '—';
  document.getElementById('zHealthBar').style.width = (zn ? zn.health : 0)+'%';
  document.getElementById('zWater').textContent = zn ? Math.round(zn.water)+'%' : '—';
  document.getElementById('zWaterBar').style.width = (zn ? zn.water : 0)+'%';
  const hh = Math.floor(timeOfDay*24), mm = Math.floor((timeOfDay*24%1)*60);
  document.getElementById('hudTime').textContent = `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')} ${isNight()?'🌙':'☀'}`;
  document.getElementById('hudWeather').textContent = weather;
  document.getElementById('eqWater').textContent = Math.round(waterTank)+'%';
  document.getElementById('eqWaterBar').style.width = waterTank+'%';
  document.getElementById('eqEco').textContent = Math.round(ecoTank)+'%';
  document.getElementById('eqEcoBar').style.width = ecoTank+'%';
  hintBar.innerHTML = contextualHint();
  gaugeWater.rotation.x = -1.15 + THREE.MathUtils.degToRad((waterTank/100)*270-135)*0;
  gaugeWater.rotation.z = Math.PI*0.75 + (waterTank/100)*Math.PI*1.5;
  gaugeEco.rotation.z = Math.PI*0.75 + (ecoTank/100)*Math.PI*1.5;
}
function updatePonds(dt){
  waterMeshes.forEach(wm=>{
    const p = wm.userData.pond;
    const targetScale = 0.25 + p.flow*0.75;
    wm.scale.x += (targetScale - wm.scale.x)*dt*0.5;
    wm.scale.y = wm.scale.x;
    const muddy = p.flow < 0.4;
    wm.material.color.set(muddy ? 0x7a8a68 : 0x3f8fb0);
    wm.position.y = p.y - (1-p.flow)*1.1 + Math.sin(elapsed*1.2)*0.03;
  });
}
function animate(){
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  if (started){
    updateVehicle(dt);
    updateDayNight(dt);
    updateWeather(dt);
    updateAnimals(dt);
    updateBirds(dt);
    updateSpray(dt);
    updateArm(dt);
    updatePlanted(dt);
    updatePonds(dt);
    updateMissions(dt);
    popT -= dt;
    if (popT <= 0){ popT = 5; updatePopulations(); }
    chirpT -= dt;
    if (chirpT <= 0){ chirpT = 2+Math.random()*5; chirp(); }
    if (AC && engGain){
      engOsc.frequency.setTargetAtTime(28 + Math.abs(speed)*6 + (keys['KeyW']?10:0), AC.currentTime, 0.1);
      engGain.gain.setTargetAtTime(0.03 + Math.abs(speed)*0.006 + (keys['KeyW']?0.03:0), AC.currentTime, 0.1);
      windGain.gain.setTargetAtTime(0.012 + (weather==='WINDY'?0.03:0) + Math.abs(speed)*0.002, AC.currentTime, 0.3);
    }
  }
  updateParts(dt);
  updateCamera(dt);
  for (const b of cockpitButtons){
    if (b.userData.pressT > 0){
      b.userData.pressT = Math.max(0, b.userData.pressT - dt*4);
      b.position.y = b.userData.baseY - Math.sin(b.userData.pressT*Math.PI)*0.02;
    }
  }
  warnLight.material.emissiveIntensity = Math.max(0, warnLight.material.emissiveIntensity - dt*3);
  screenT -= dt;
  if (screenT <= 0){
    screenT = 0.35;
    drawMainScreen(); drawMap(); drawMissionScreen(); updateHud();
  }
  renderer.render(scene, camera);
}
addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
document.getElementById('startBtn').addEventListener('click', ()=>{
  initAudio();
  started = true;
  document.getElementById('intro').style.display = 'none';
  bigToast('PATROL BEGINS');
  setMission(storyMissions[0]);
});
setMission(storyMissions[0]);
animate();
setTimeout(()=>document.getElementById('loading').classList.add('done'), 300);

