import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=(a=1,b)=>b===undefined?Math.random()*a:a+Math.random()*(b-a);
const toAr=s=>String(s).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[+d]);
const isMobile=matchMedia('(pointer: coarse)').matches;
if(isMobile)document.body.classList.add('touch');

function fail(msg){
  console.error(msg);
  $('bootMsg').textContent=msg;
  $('bootError').style.display='flex';
}
window.addEventListener('unhandledrejection',e=>fail('حدث خطأ أثناء التحميل: '+(e.reason?.message||e.reason||'خطأ غير معروف')));

let renderer,scene,camera,fog,hero,magicPalm,palmGlow;
let started=false,paused=false,muted=false,runtimeFailed=false;
let yaw=.55,pitch=.38,camDist=9,vy=0,grounded=true,airJump=1;
let score=0,datesEaten=0,powerT=0,waveCd=0,invuln=0;
let dateTimer=1,orbTimer=2,wraithTimer=5,portalTimer=12;
let T=0;
const keys=new Set(),dates=[],orbs=[],wraiths=[],waves=[];
let portal=null,joyX=0,joyY=0,jumpQueued=false,waveQueued=false;
const gold=new THREE.Color(0xffd47a),dayFog=new THREE.Color(0xe8cfa0),powerFog=new THREE.Color(0x3a2260);

try{
  if(!('WebGLRenderingContext' in window))throw new Error('هذا المتصفح لا يدعم WebGL.');
  renderer=new THREE.WebGLRenderer({antialias:!isMobile,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,isMobile?1.25:1.7));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  $('app').appendChild(renderer.domElement);

  scene=new THREE.Scene();
  scene.background=new THREE.Color(0xcfa66a);
  fog=new THREE.Fog(dayFog,55,230);
  scene.fog=fog;
  camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
  camera.position.set(8,6,14);

  const hemi=new THREE.HemisphereLight(0xd7e5ef,0xc79b68,1.25);
  scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xffdfb0,3.2);
  sun.position.set(-50,85,-20);
  sun.castShadow=true;
  sun.shadow.mapSize.set(isMobile?1024:2048,isMobile?1024:2048);
  Object.assign(sun.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:1,far:220});
  sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun);

  function groundH(x,z){
    const d=Math.hypot(x,z);
    const fade=clamp((d-15)/35,0,1);
    return (Math.sin(x*.06)*Math.cos(z*.05)*2.5+Math.sin((x+z)*.1)*.8)*fade;
  }

  const groundGeo=new THREE.PlaneGeometry(260,260,isMobile?70:110,isMobile?70:110);
  groundGeo.rotateX(-Math.PI/2);
  const gp=groundGeo.attributes.position;
  for(let i=0;i<gp.count;i++)gp.setY(i,groundH(gp.getX(i),gp.getZ(i)));
  groundGeo.computeVertexNormals();
  const ground=new THREE.Mesh(groundGeo,new THREE.MeshStandardMaterial({color:0xd3aa73,roughness:1}));
  ground.receiveShadow=true;
  scene.add(ground);

  const water=new THREE.Mesh(new THREE.CircleGeometry(7,48),new THREE.MeshStandardMaterial({color:0x2fa7a4,roughness:.22,metalness:.08,transparent:true,opacity:.86}));
  water.rotation.x=-Math.PI/2;
  water.position.set(11,-.35,-7);
  scene.add(water);

  function buildPalm(scale=1,magic=false){
    const g=new THREE.Group();
    const H=6*scale;
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18*scale,.32*scale,H,9,5),new THREE.MeshStandardMaterial({color:0x8a6238,roughness:1}));
    trunk.position.y=H/2;
    trunk.rotation.z=.05;
    trunk.castShadow=true;
    trunk.receiveShadow=true;
    g.add(trunk);

    const crown=new THREE.Group();
    crown.position.set(.18,H,0);
    const frondMat=new THREE.MeshStandardMaterial({color:magic?0x3d9a43:0x347f38,side:THREE.DoubleSide,roughness:.9});
    for(let i=0;i<(magic?18:12);i++){
      const f=new THREE.Mesh(new THREE.PlaneGeometry(.55*scale,3.2*scale,1,5),frondMat);
      f.geometry.translate(0,1.6*scale,0);
      f.rotation.z=(i%2?1:-1)*.18;
      f.rotation.x=-.9-rnd(.28);
      const holder=new THREE.Group();
      holder.rotation.y=i/(magic?18:12)*Math.PI*2;
      holder.add(f);
      crown.add(holder);
    }
    g.add(crown);

    const dateMat=new THREE.MeshStandardMaterial({color:0xbf6c22,emissive:magic?0x7c3100:0,emissiveIntensity:magic?.7:0});
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      const d=new THREE.Mesh(new THREE.SphereGeometry(.12*scale,7,7),dateMat);
      d.position.set(.18+Math.cos(a)*.5*scale,H-.55*scale,Math.sin(a)*.5*scale);
      d.scale.y=1.45;
      g.add(d);
    }
    return g;
  }

  magicPalm=buildPalm(1.5,true);
  magicPalm.position.set(0,groundH(0,0),0);
  scene.add(magicPalm);

  palmGlow=new THREE.PointLight(0xffbb55,4,22,2);
  palmGlow.position.set(.2,9,0);
  scene.add(palmGlow);

  const palmSpots=[[-14,7,1.1],[11,15,1.15],[-9,-15,1],[19,-16,1.05],[-24,-5,1.2],[24,9,1],[-18,20,1.05],[7,-25,1.15],[31,-23,1],[-32,17,1],[17,31,1.1],[-7,35,1],[37,14,1],[-39,-18,1]];
  palmSpots.forEach(p=>{
    const x=p[0],z=p[1],s=p[2],m=buildPalm(s,false);
    m.position.set(x,groundH(x,z),z);
    m.rotation.y=rnd(Math.PI*2);
    scene.add(m);
  });

  const fort=new THREE.Group();
  const fortMat=new THREE.MeshStandardMaterial({color:0xb88b5c,roughness:1});
  const keep=new THREE.Mesh(new THREE.BoxGeometry(13,6.5,9.5),fortMat);
  keep.position.y=3.25;keep.castShadow=true;fort.add(keep);
  const tower=new THREE.Mesh(new THREE.CylinderGeometry(2.3,2.7,10,12),fortMat);
  tower.position.set(8,5,5.5);tower.castShadow=true;fort.add(tower);
  const tower2=tower.clone();tower2.position.set(-8,5,-5.5);fort.add(tower2);
  const door=new THREE.Mesh(new THREE.BoxGeometry(2.3,3.2,.4),new THREE.MeshStandardMaterial({color:0x472d17}));
  door.position.set(0,1.6,4.9);fort.add(door);
  fort.position.set(-31,groundH(-31,-20),-20);
  fort.rotation.y=.55;
  scene.add(fort);

  function makeHero(){
    const g=new THREE.Group();
    const cloth=new THREE.MeshStandardMaterial({color:0xf4f0e5,roughness:.9});
    const skin=new THREE.MeshStandardMaterial({color:0x9b6842,roughness:.85});
    const robe=new THREE.Mesh(new THREE.CylinderGeometry(.26,.48,1.25,10),cloth);robe.position.y=.63;robe.castShadow=true;g.add(robe);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.21,12,12),skin);head.position.y=1.47;head.castShadow=true;g.add(head);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.205,.22,.16,12),new THREE.MeshStandardMaterial({color:0x7b2420}));cap.position.y=1.63;g.add(cap);
    const beard=new THREE.Mesh(new THREE.SphereGeometry(.15,9,9),new THREE.MeshStandardMaterial({color:0x2c1b10}));beard.scale.set(1,.78,.75);beard.position.set(0,1.4,.12);g.add(beard);
    const aura=new THREE.PointLight(0xffb44a,0,15,2);aura.position.y=1.2;g.add(aura);
    const armL=new THREE.Group(),armR=new THREE.Group();
    function arm(side,holder){holder.position.set(.31*side,1.18,0);const m=new THREE.Mesh(new THREE.CylinderGeometry(.065,.085,.6,8),cloth);m.position.y=-.28;holder.add(m);g.add(holder)}
    arm(-1,armL);arm(1,armR);
    return {g,armL,armR,aura};
  }
  hero=makeHero();
  hero.g.position.set(6,groundH(6,9),9);
  scene.add(hero.g);

  const dateGeo=new THREE.SphereGeometry(.21,10,10);
  const dateMat=new THREE.MeshStandardMaterial({color:0xb25b29,emissive:0xff7c2b,emissiveIntensity:1.15});
  const orbGeo=new THREE.OctahedronGeometry(.35);
  const orbMat=new THREE.MeshStandardMaterial({color:0x8efcff,emissive:0x35ccff,emissiveIntensity:2});
  const wraithMat=new THREE.MeshBasicMaterial({color:0x1b1030,transparent:true,opacity:.88});

  function spawnDate(){
    if(dates.length>=5)return;
    const a=rnd(Math.PI*2),r=rnd(1,2.4),m=new THREE.Mesh(dateGeo,dateMat);
    m.position.set(Math.cos(a)*r,8.2,Math.sin(a)*r);
    m.scale.y=1.35;
    scene.add(m);
    dates.push({m,fall:true,ph:rnd(6.28)});
  }
  function spawnOrb(){
    if(orbs.length>=(isMobile?6:9))return;
    const a=rnd(Math.PI*2),r=rnd(14,45),x=Math.cos(a)*r,z=Math.sin(a)*r,m=new THREE.Mesh(orbGeo,orbMat);
    m.position.set(x,groundH(x,z)+2+rnd(1.5),z);
    scene.add(m);orbs.push({m,base:m.position.y,ph:rnd(6.28)});
  }
  function spawnWraith(){
    if(wraiths.length>=(isMobile?4:6))return;
    const g=new THREE.Group();
    const body=new THREE.Mesh(new THREE.SphereGeometry(.7,12,12),wraithMat);g.add(body);
    const eyeMat=new THREE.MeshBasicMaterial({color:0x8ef4ff});
    const e1=new THREE.Mesh(new THREE.SphereGeometry(.08,7,7),eyeMat),e2=e1.clone();
    e1.position.set(.22,.12,.59);e2.position.set(-.22,.12,.59);g.add(e1,e2);
    const a=rnd(Math.PI*2),r=rnd(25,40),x=hero.g.position.x+Math.cos(a)*r,z=hero.g.position.z+Math.sin(a)*r;
    g.position.set(x,groundH(x,z)+1.5,z);scene.add(g);wraiths.push({g,sp:rnd(3.2,4.8),ph:rnd(6.28)});
  }
  function spawnPortal(){
    const g=new THREE.Group();
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.7,.15,10,40),new THREE.MeshBasicMaterial({color:0xb06bff,transparent:true,opacity:.95,side:THREE.DoubleSide}));
    const disc=new THREE.Mesh(new THREE.CircleGeometry(1.55,32),new THREE.MeshBasicMaterial({color:0x6928dd,transparent:true,opacity:.32,side:THREE.DoubleSide}));
    g.add(ring,disc);
    const a=rnd(Math.PI*2),r=rnd(18,28),x=hero.g.position.x+Math.cos(a)*r,z=hero.g.position.z+Math.sin(a)*r;
    g.position.set(x,groundH(x,z)+2,z);g.lookAt(hero.g.position.x,g.position.y,hero.g.position.z);scene.add(g);
    portal={g,ring,life:20};
  }
  function killPortal(){if(portal){scene.remove(portal.g);portal=null}}

  function flash(id,op){
    const el=$(id);el.style.transition='none';el.style.opacity=op;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.transition='opacity .65s';el.style.opacity=0}));
  }

  let AC=null;
  function beep(freq=.001,dur=.12){
    if(muted)return;
    try{
      if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();
      if(AC.state==='suspended')AC.resume();
      const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;
      o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
      o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+dur+.02);
    }catch(e){}
  }

  function virtualTime(rt){
    const n=Math.max(0,Math.round(rt*60)),h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=n%60,p=v=>String(v).padStart(2,'0');
    return toAr(p(h)+':'+p(m)+':'+p(s));
  }

  addEventListener('keydown',e=>{
    if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
    if(e.code==='Escape'&&started){togglePause();return}
    keys.add(e.code);if(e.code==='Space')jumpQueued=true;if(e.code==='KeyE')waveQueued=true;
  });
  addEventListener('keyup',e=>keys.delete(e.code));

  let drag=false,px=0,py=0;
  renderer.domElement.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;py=e.clientY});
  addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;yaw-=dx*.005;pitch=clamp(pitch+dy*.004,.15,1.05)});
  addEventListener('pointerup',()=>drag=false);
  renderer.domElement.addEventListener('wheel',e=>camDist=clamp(camDist+e.deltaY*.01,5,15),{passive:true});

  const joyZone=$('joyZone'),joyBase=$('joyBase'),joyKnob=$('joyKnob');
  let joyId=null,jx0=0,jy0=0;
  joyZone.addEventListener('pointerdown',e=>{joyId=e.pointerId;jx0=e.clientX;jy0=e.clientY;joyBase.style.display='block';joyBase.style.left=e.clientX+'px';joyBase.style.top=e.clientY+'px';joyZone.setPointerCapture(joyId)});
  joyZone.addEventListener('pointermove',e=>{if(e.pointerId!==joyId)return;let dx=e.clientX-jx0,dy=e.clientY-jy0,l=Math.hypot(dx,dy);if(l>45){dx*=45/l;dy*=45/l}joyX=dx/45;joyY=-dy/45;joyKnob.style.transform='translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px))'});
  function joyEnd(e){if(e.pointerId!==joyId)return;joyId=null;joyX=joyY=0;joyBase.style.display='none';joyKnob.style.transform='translate(-50%,-50%)'}
  joyZone.addEventListener('pointerup',joyEnd);joyZone.addEventListener('pointercancel',joyEnd);
  $('btnJump').addEventListener('pointerdown',()=>jumpQueued=true);$('btnWave').addEventListener('pointerdown',()=>waveQueued=true);

  function togglePause(){paused=!paused;$('pause').classList.toggle('on',paused)}
  $('btnPause').onclick=()=>started&&togglePause();
  $('btnResume').onclick=togglePause;
  $('btnMute').onclick=()=>{muted=!muted;$('btnMute').textContent=muted?'🔇':'🔊'};
  $('btnStart').onclick=()=>{if(started)return;started=true;$('intro').style.display='none';$('hud').classList.add('on');for(let i=0;i<3;i++)spawnDate();beep(620,.18)};
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!paused)togglePause()});

  function fireWave(){
    if(powerT<=0||waveCd>0)return;
    waveCd=2.3;beep(180,.25);
    const ring=new THREE.Mesh(new THREE.RingGeometry(.8,1,48),new THREE.MeshBasicMaterial({color:0xffd97a,transparent:true,opacity:.95,side:THREE.DoubleSide}));
    ring.rotation.x=-Math.PI/2;ring.position.set(hero.g.position.x,hero.g.position.y+.12,hero.g.position.z);scene.add(ring);waves.push({m:ring,age:0});
    for(let i=wraiths.length-1;i>=0;i--)if(wraiths[i].g.position.distanceTo(hero.g.position)<9){scene.remove(wraiths[i].g);wraiths.splice(i,1);score+=100}
  }

  const clock=new THREE.Clock();
  const camTarget=new THREE.Vector3(),camPos=new THREE.Vector3(),off=new THREE.Vector3(),temp=new THREE.Vector3();
  function update(dt){
    T+=dt;
    const hp=hero.g.position;
    let ix=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+joyX;
    let iz=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0)+joyY;
    const l=Math.hypot(ix,iz);if(l>1){ix/=l;iz/=l}
    const powered=powerT>0,sprint=keys.has('ShiftLeft')||keys.has('ShiftRight'),speed=powered?(sprint?12:8.5):(sprint?7:4.5);
    const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
    let mx=fx*iz+rx*ix,mz=fz*iz+rz*ix,ml=Math.hypot(mx,mz)||1;mx/=ml;mz/=ml;
    hp.x=clamp(hp.x+mx*speed*Math.min(1,l)*dt,-120,120);hp.z=clamp(hp.z+mz*speed*Math.min(1,l)*dt,-120,120);
    const gy=groundH(hp.x,hp.z);
    if(jumpQueued){if(grounded){vy=9.5;grounded=false;beep(300,.08)}else if(powered&&airJump>0){vy=10.2;airJump--;beep(460,.08)}jumpQueued=false}
    vy-=22*dt;hp.y+=vy*dt;if(hp.y<=gy){hp.y=gy;vy=0;grounded=true;airJump=1}else grounded=false;
    if(l>.1)hero.g.rotation.y=Math.atan2(mx,mz);
    const sw=Math.sin(T*10)*.55*Math.min(1,l);hero.armL.rotation.x=sw;hero.armR.rotation.x=-sw;

    off.set(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)).multiplyScalar(camDist);
    camTarget.copy(hp).add(new THREE.Vector3(0,1.5,0));camPos.copy(camTarget).add(off);camPos.y=Math.max(camPos.y,groundH(camPos.x,camPos.z)+.6);
    camera.position.lerp(camPos,1-Math.pow(.0001,dt));camera.lookAt(camTarget);

    if(powered)powerT=Math.max(0,powerT-dt);
    waveCd=Math.max(0,waveCd-dt);invuln=Math.max(0,invuln-dt);
    if(waveQueued){waveQueued=false;fireWave()}

    const mix=clamp(powerT>0?1:0,0,1);
    fog.color.lerpColors(dayFog,powerFog,mix*.75);fog.near=55-18*mix;fog.far=230-45*mix;
    scene.background=new THREE.Color().lerpColors(new THREE.Color(0xcfa66a),new THREE.Color(0x2b1647),mix*.7);
    $('weird').style.opacity=mix*.48;
    hero.aura.intensity=powerT>0?(isMobile?10:18):0;
    palmGlow.intensity=4+Math.sin(T*2)*1.1;

    dateTimer-=dt;if(dateTimer<=0){dateTimer=rnd(6,9);spawnDate()}
    for(let i=dates.length-1;i>=0;i--){
      const d=dates[i],g=groundH(d.m.position.x,d.m.position.z);
      if(d.fall){d.m.position.y-=4.5*dt;if(d.m.position.y<=g+.35){d.fall=false;d.m.position.y=g+.35}}
      else{d.m.position.y=g+.38+Math.sin(T*3+d.ph)*.1;d.m.rotation.y+=dt*2}
      if(!d.fall&&Math.hypot(d.m.position.x-hp.x,d.m.position.z-hp.z)<1.45){scene.remove(d.m);dates.splice(i,1);datesEaten++;score+=50;powerT=Math.min(180,powerT+60);flash('goldflash',.75);beep(880,.16)}
    }

    if(powerT>0){orbTimer-=dt;wraithTimer-=dt;portalTimer-=dt;if(orbTimer<=0){orbTimer=rnd(3,5);spawnOrb()}if(wraithTimer<=0){wraithTimer=rnd(4,7);spawnWraith()}if(!portal&&portalTimer<=0){portalTimer=rnd(14,20);spawnPortal()}}
    else{for(let i=wraiths.length-1;i>=0;i--){scene.remove(wraiths[i].g);wraiths.splice(i,1)}for(let i=orbs.length-1;i>=0;i--){scene.remove(orbs[i].m);orbs.splice(i,1)}killPortal()}

    temp.copy(hp).y+=1;
    for(let i=orbs.length-1;i>=0;i--){const o=orbs[i];o.m.rotation.x+=dt;o.m.rotation.y+=dt*2;o.m.position.y=o.base+Math.sin(T*2+o.ph)*.3;if(o.m.position.distanceTo(temp)<1.5){scene.remove(o.m);orbs.splice(i,1);score+=20;beep(1300,.08)}}
    for(let i=wraiths.length-1;i>=0;i--){const w=wraiths[i],dir=hp.clone().sub(w.g.position);dir.y=0;const dist=dir.length();if(dist>0)dir.normalize();w.g.position.addScaledVector(dir,w.sp*dt);w.g.position.y=groundH(w.g.position.x,w.g.position.z)+1.5+Math.sin(T*2+w.ph)*.28;w.g.rotation.y=Math.atan2(dir.x,dir.z);if(dist<1.35){if(invuln<=0){powerT=Math.max(0,powerT-3);invuln=1;flash('flash',.7);beep(150,.12)}scene.remove(w.g);wraiths.splice(i,1)}}
    if(portal){portal.ring.rotation.z+=dt*2;portal.life-=dt;if(portal.life<=0||powerT<=0)killPortal();else if(Math.hypot(portal.g.position.x-hp.x,portal.g.position.z-hp.z)<2){score+=150;powerT=Math.min(180,powerT+15);hp.set(rnd(-4,4),groundH(0,8),rnd(6,10));flash('goldflash',.8);beep(520,.2);killPortal()}}

    for(let i=waves.length-1;i>=0;i--){const w=waves[i];w.age+=dt;const s=1+w.age*22;w.m.scale.set(s,s,s);w.m.material.opacity=Math.max(0,1-w.age/.6);if(w.age>.6){scene.remove(w.m);waves.splice(i,1)}}

    $('timerVal').textContent=powerT>0?virtualTime(powerT):'٠٠:٠٠:٠٠';
    $('powerfill').style.width=(powerT/180*100)+'%';
    $('timerCard').classList.toggle('low',powerT>0&&powerT<=10);
    $('warn').style.opacity=powerT>0&&powerT<=10?1:0;
    $('scoreVal').textContent=toAr(score);$('datesVal').textContent=toAr(datesEaten);
    $('hint').textContent=powerT<=0?'التقط التمرة الذهبية قرب النخلة لتبدأ القوة الخارقة':portal?'بوابة سحرية ظهرت! اتجه إليها':wraiths.length?'أشباح الرمل تطاردك — استخدم E أو زر موجة':'اجمع البلورات واستكشف الواحة العُمانية';
  }

  function loop(){
    requestAnimationFrame(loop);
    const dt=Math.min(clock.getDelta(),.05);
    if(started&&!paused&&!runtimeFailed)try{update(dt)}catch(e){runtimeFailed=true;fail('توقفت اللعبة بسبب خطأ: '+e.message)}
    try{renderer.render(scene,camera)}catch(e){runtimeFailed=true;fail('تعذر عرض المشهد: '+e.message)}
  }
  loop();

  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,isMobile?1.25:1.7))});
  for(let i=0;i<3;i++)spawnDate();
  $('btnStart').disabled=false;$('btnStart').textContent='ابدأ المغامرة';
}catch(e){fail('حدث خطأ أثناء تجهيز اللعبة: '+e.message)}
