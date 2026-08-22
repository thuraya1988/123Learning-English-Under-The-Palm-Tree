/* فتاة المنارة — سيدة المظلة.
   رسم الشخصية منقول حرفيًّا من what-if-girl.html بلا تغيير.
   الاستعمال: WIGirl.build() مرّة، ثمّ WIGirl.draw(ctx,x,y,scale) كلّ إطار. */
(function(){
'use strict';
var Q=2;
var S={mode:'walk',facing:-1,x:0,yOff:0,vy:0,grounded:true,t:0,time:0,
  nightOn:false,night:0,rainOn:false,rain:0,lastBob:0,jumpQ:false,shift:false,
  poseName:'walk',dirNow:-1,movingNow:true,blinkT:3,
  drops:[],splashes:[],dust:[],spark:[]};

var MODES={idle:{speed:0,freq:1.5},walk:{speed:80,freq:6.5},run:{speed:190,freq:10.5},happy:{speed:105,freq:7.5},sad:{speed:40,freq:3.2},jump:{speed:115,freq:0}};
var AR={idle:'وقوف',walk:'مشي',run:'ركض',happy:'مشي بسعادة',sad:'مشي بحزن',jump:'قفز'};

function hash(i){var s=Math.sin(i*127.1+13.7)*43758.5453;return s-Math.floor(s);}
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function mixc(a,b,t){var r=[],i;for(i=0;i<3;i++)r.push(Math.round(a[i]+(b[i]-a[i])*t));return 'rgb('+r.join(',')+')';}
/* ====== أدوات الفرشاة ====== */
function newC(w,h){var c=document.createElement('canvas');c.width=w*Q;c.height=h*Q;var g=c.getContext('2d');g.scale(Q,Q);return {c:c,g:g};}
function pStroke(g,x1,y1,x2,y2,w,col,al){
  g.save();g.strokeStyle=col;g.globalAlpha=al;g.lineWidth=w;g.lineCap='round';
  var mx=(x1+x2)/2+(Math.random()*2-1)*w*0.5,my=(y1+y2)/2+(Math.random()*2-1)*w*0.5;
  g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo(mx,my,x2,y2);g.stroke();g.restore();
}
function thread(g,x0,y0,c1x,c1y,c2x,c2y,x1,y1,w,col,al){
  g.save();g.strokeStyle=col;g.globalAlpha=al;g.lineWidth=w;g.lineCap='round';
  g.beginPath();g.moveTo(x0,y0);g.bezierCurveTo(c1x,c1y,c2x,c2y,x1,y1);g.stroke();g.restore();
}
function pStrokeD(g,x1,y1,x2,y2,w,col,al,seed){
  g.save();g.strokeStyle=col;g.globalAlpha=al;g.lineWidth=w;g.lineCap='round';
  var j1=(hash(seed)*2-1)*w*0.5,j2=(hash(seed+7)*2-1)*w*0.5;
  g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo((x1+x2)/2+j1,(y1+y2)/2+j2,x2,y2);g.stroke();g.restore();
}
function dab(g,x,y,rx,ry,rot,col,al){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=col;g.globalAlpha=al;g.beginPath();g.ellipse(0,0,rx,ry,0,0,Math.PI*2);g.fill();g.restore();}
function paintArea(g,pathFn,bb,base,dark,light,ang,n,wMax){
  g.save();g.beginPath();pathFn(g);g.clip();
  var gr=g.createLinearGradient(bb[0],bb[1],bb[0]+bb[2]*0.25,bb[1]+bb[3]);
  gr.addColorStop(0,light);gr.addColorStop(0.45,base);gr.addColorStop(1,dark);
  g.fillStyle=gr;g.fillRect(bb[0]-3,bb[1]-3,bb[2]+6,bb[3]+6);
  for(var i=0;i<n;i++){
    var x=bb[0]+Math.random()*bb[2],y=bb[1]+Math.random()*bb[3];
    var len=8+Math.random()*16,a=ang+(Math.random()-0.5)*0.6;
    var cols=[base,dark,light],col=cols[(Math.random()*3)|0];
    pStroke(g,x,y,x+Math.cos(a)*len,y+Math.sin(a)*len,1.2+Math.random()*wMax,col,0.07+Math.random()*0.13);
  }
  g.restore();
  g.save();g.beginPath();pathFn(g);g.strokeStyle=dark;g.globalAlpha=0.22;g.lineWidth=1.1;g.stroke();g.restore();
}
function darken(src,amt){var c=document.createElement('canvas');c.width=src.width;c.height=src.height;var g=c.getContext('2d');g.drawImage(src,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(28,38,58,'+amt+')';g.fillRect(0,0,c.width,c.height);return c;}
/* ====== بناء السبرايتات ====== */
var SPR={};
function headPath(p){
  p.moveTo(-4,-12);
  p.quadraticCurveTo(-12,-10,-15,-10);
  p.quadraticCurveTo(-18,-12,-19,-14);
  p.quadraticCurveTo(-21,-15,-20,-17);
  p.quadraticCurveTo(-22,-18,-21,-20);
  p.quadraticCurveTo(-25,-22,-24,-25);
  p.quadraticCurveTo(-21,-30,-20,-33);
  p.quadraticCurveTo(-21,-38,-19,-44);
  p.quadraticCurveTo(-12,-55,1,-56);
  p.quadraticCurveTo(15,-54,19,-44);
  p.quadraticCurveTo(21,-30,17,-16);
  p.quadraticCurveTo(15,-11,9,-12);
  p.closePath();
}
function hairPath(p){
  p.moveTo(-19,-42);
  p.quadraticCurveTo(-12,-58,1,-59);
  p.quadraticCurveTo(16,-57,20,-42);
  p.quadraticCurveTo(24,-24,19,-6);
  p.lineTo(13,-10);
  p.quadraticCurveTo(15,-26,9,-34);
  p.quadraticCurveTo(0,-42,-9,-38);
  p.quadraticCurveTo(-16,-36,-19,-42);
  p.closePath();
}
function buildHead(){
  var o=newC(96,120),g=o.g;g.translate(52,112);
  var skin='#e8c39a',skinD='#b98a62',skinL='#f8e2c4',hair='#4a3226',hairD='#26160d',hairL='#8a6647';
  thread(g,15,-30,21,-20,20,-8,17,4,1.2,hair,0.85);
  thread(g,17,-28,23,-18,22,-6,19,6,1.0,hair,0.8);
  thread(g,13,-32,17,-22,16,-10,14,0,0.9,hair,0.7);
  thread(g,16,-26,21,-16,20,-6,18,2,0.7,hairL,0.4);
  paintArea(g,function(p){p.moveTo(-6,2);p.quadraticCurveTo(-6,-8,-4,-13);p.lineTo(7,-13);p.quadraticCurveTo(8,-6,9,2);p.closePath();},[-8,-15,20,19],skin,skinD,skinL,1.57,10,1.5);
  dab(g,0,-11,6,2.5,0.2,skinD,0.4);
  paintArea(g,headPath,[-26,-58,48,50],skin,skinD,skinL,0.7,90,2.2);
  dab(g,-13,-40,6,3,0.3,skinL,0.4);
  dab(g,-23,-27,2,3,0.2,skinD,0.35);
  dab(g,-13,-20,4,2.6,0.2,'#d98a70',0.3);
  dab(g,-16,-11,4,2.2,0.2,skinL,0.35);
  g.fillStyle='#fdf6ec';g.beginPath();g.ellipse(-11,-29,3.2,2,-0.08,0,Math.PI*2);g.fill();
  g.fillStyle='#4a3020';g.beginPath();g.arc(-12,-29,1.7,0,Math.PI*2);g.fill();
  g.strokeStyle='#2e1d14';g.lineWidth=1.2;g.lineCap='round';
  g.beginPath();g.moveTo(-15,-30.5);g.quadraticCurveTo(-11,-32.5,-7,-30.5);g.stroke();
  pStroke(g,-15,-33,-7,-32.4,1,'#b98a62',0.5);
  pStroke(g,-15,-37,-6,-36.4,1.6,hair,0.85);
  pStroke(g,-21,-16,-16,-15,1.8,'#b05a4a',0.85);
  pStroke(g,-20,-13.5,-17,-13,1.1,'#e8a08a',0.6);
  dab(g,-23.5,-22,0.9,0.7,0,'#8a5a3a',0.6);
  g.strokeStyle=skinD;g.lineWidth=1.4;g.beginPath();g.arc(4,-24,4,0.6,4.4);g.stroke();
  dab(g,5,-23,2,2.6,0.3,skinD,0.3);
  paintArea(g,hairPath,[-21,-60,46,56],hair,hairD,hairL,0.9,100,2.4);
  paintArea(g,function(p){p.arc(16,-54,12,0,Math.PI*2);},[3,-67,28,28],hair,hairD,hairL,0.5,50,2);
  pStroke(g,10,-58,23,-50,2,hairL,0.55);
  pStroke(g,12,-62,25,-55,1.5,hairL,0.4);
  pStroke(g,7,-49,18,-44,1.4,hairD,0.5);
  thread(g,-16,-46,-21,-36,-20,-26,-17,-14,1.2,hair,0.9);
  thread(g,-14,-47,-18,-36,-17,-24,-14,-12,1.0,hair,0.85);
  thread(g,-18,-44,-22,-36,-21,-28,-19,-20,0.9,hair,0.8);
  thread(g,-15,-40,-18,-30,-17,-22,-15,-16,0.7,hairL,0.45);
  thread(g,7,-36,10,-26,9,-16,7,-6,1.1,hair,0.85);
  thread(g,9,-34,12,-24,11,-14,9,-4,0.9,hair,0.8);
  thread(g,8,-30,10,-20,9,-12,8,-8,0.7,hairL,0.4);
  thread(g,10,-64,6,-60,4,-56,5,-52,0.9,hair,0.7);
  thread(g,24,-60,28,-56,28,-50,26,-46,0.9,hair,0.7);
  thread(g,16,-66,14,-70,18,-72,20,-70,0.8,hair,0.6);
  thread(g,22,-40,26,-34,25,-28,24,-24,0.8,hair,0.55);
  thread(g,-2,-57,4,-61,8,-62,10,-60,0.8,hairL,0.5);
  return {img:o.c,ax:52,ay:112,w:96,h:120};
}
function dressPath(p){
  p.moveTo(-16,0);p.lineTo(16,0);
  p.bezierCurveTo(26,42,42,92,52,140);
  p.quadraticCurveTo(30,150,10,145);
  p.quadraticCurveTo(-10,152,-30,146);
  p.quadraticCurveTo(-46,150,-52,140);
  p.bezierCurveTo(-42,92,-26,42,-16,0);
  p.closePath();
}
function buildDress(){
  var o=newC(140,152),g=o.g;g.translate(70,6);
  paintArea(g,dressPath,[-54,0,108,152],'#d99b23','#96660e','#f6c65a',1.57,140,2.6);
  pStroke(g,-13,3,-10,-8,3.4,'#b9801a',0.95);
  pStroke(g,13,3,10,-8,3.4,'#b9801a',0.95);
  pStroke(g,-14,5,14,5,2.4,'#96660e',0.5);
  var F=[-32,-16,0,16,32],i;
  for(i=0;i<F.length;i++){
    pStroke(g,F[i]*0.35,34,F[i],136,2.4,'#96660e',0.16);
    pStroke(g,F[i]*0.35+5,30,F[i]+6,132,1.8,'#f6c65a',0.14);
  }
  var DD=[[-10,20],[6,16],[16,34],[-20,38],[0,52],[22,58],[-30,62],[-8,76],[14,84],[30,92],[-24,96],[-40,110],[0,110],[24,118],[-12,128],[38,128],[-36,132],[8,140]];
  for(i=0;i<DD.length;i++)dab(g,DD[i][0],DD[i][1],2.4,1.8,0.4,'#f8e8c0',0.75);
  pStroke(g,-40,138,40,140,3,'#96660e',0.3);
  return {img:o.c,ax:70,ay:6,w:140,h:152};
}
function buildUpperArm(){
  var o=newC(16,56),g=o.g;g.translate(8,0);
  paintArea(g,function(p){p.moveTo(-7,0);p.quadraticCurveTo(-8,26,-6,50);p.lineTo(6,50);p.quadraticCurveTo(8,26,7,0);p.closePath();},[-9,0,18,52],'#e8c39a','#b98a62','#f8e2c4',1.57,26,1.6);
  dab(g,0,26,4,2.5,0.2,'#b98a62',0.3);
  return {img:o.c,ax:8,ay:0,w:16,h:56};
}
function buildForeArm(){
  var o=newC(16,62),g=o.g;g.translate(8,0);
  paintArea(g,function(p){p.moveTo(-6,0);p.quadraticCurveTo(-7,16,-5,32);p.lineTo(5,32);p.quadraticCurveTo(7,16,6,0);p.closePath();},[-8,0,16,34],'#e8c39a','#b98a62','#f8e2c4',1.57,20,1.4);
  paintArea(g,function(p){p.moveTo(-5,30);p.quadraticCurveTo(-6,44,-4,52);p.quadraticCurveTo(-2,58,0,58);p.quadraticCurveTo(4,58,5,50);p.quadraticCurveTo(6,42,5,30);p.closePath();},[-7,28,14,32],'#e8c39a','#b98a62','#f8e2c4',1.57,20,1.2);
  pStroke(g,-2,52,-2,56,0.8,'#b98a62',0.5);
  pStroke(g,1,52,1,56,0.8,'#b98a62',0.5);
  dab(g,-3,40,2,3,0,'#f8e2c4',0.4);
  return {img:o.c,ax:8,ay:0,w:16,h:62};
}
function buildThigh(){
  var o=newC(20,80),g=o.g;g.translate(10,0);
  paintArea(g,function(p){p.moveTo(-8,0);p.quadraticCurveTo(-9,40,-7,76);p.lineTo(7,76);p.quadraticCurveTo(9,40,8,0);p.closePath();},[-10,0,20,78],'#5b7f95','#3c5a72','#86a8bd',1.57,40,1.8);
  return {img:o.c,ax:10,ay:0,w:20,h:80};
}
function buildShin(){
  var o=newC(36,78),g=o.g;g.translate(20,0);
  paintArea(g,function(p){p.moveTo(-6,0);p.quadraticCurveTo(-7,32,-5,60);p.lineTo(6,60);p.quadraticCurveTo(7,32,6,0);p.closePath();},[-8,0,16,62],'#5b7f95','#3c5a72','#86a8bd',1.57,30,1.5);
  paintArea(g,function(p){p.moveTo(8,56);p.lineTo(9,70);p.lineTo(-16,70);p.quadraticCurveTo(-20,68,-16,64);p.quadraticCurveTo(-6,60,0,58);p.quadraticCurveTo(5,56,8,56);p.closePath();},[-20,54,30,18],'#a83226','#6e1a12','#d05a4a',0.3,26,1.5);
  pStroke(g,-16,70,9,70,1.6,'#3a0e08',0.6);
  dab(g,-8,64,4,1.6,0.2,'#e8a090',0.5);
  dab(g,2,60,3,1.6,0.2,'#6e1a12',0.5);
  return {img:o.c,ax:20,ay:0,w:36,h:78};
}
function buildUmbrella(){
  var o=newC(190,80),g=o.g;g.translate(95,4);
  paintArea(g,function(p){
    p.moveTo(-90,60);p.quadraticCurveTo(-40,8,0,4);p.quadraticCurveTo(40,8,90,60);
    var x;for(x=90;x>-90;x-=45)p.quadraticCurveTo(x-22.5,70,x-45,60);
    p.closePath();},[-92,2,184,70],'#b8352c','#6e1a12','#e0705f',-1.2,160,2.6);
  g.strokeStyle='#6e1a12';g.globalAlpha=0.4;g.lineWidth=1.3;
  g.beginPath();g.moveTo(0,8);g.lineTo(-88,58);g.moveTo(0,8);g.lineTo(-44,64);g.moveTo(0,8);g.lineTo(0,66);g.moveTo(0,8);g.lineTo(44,64);g.moveTo(0,8);g.lineTo(88,58);g.stroke();g.globalAlpha=1;
  pStroke(g,-60,20,-30,12,2,'#f0a090',0.35);
  pStroke(g,20,14,55,30,2,'#f0a090',0.3);
  dab(g,0,2,3,3,0,'#6e1a12',0.9);
  return {img:o.c,ax:95,ay:4,w:190,h:80};
}
/* ====== الوقفات ====== */
function getPose(p){
  var P={lean:0,bob:0,legA:0,armA:0,knee:0.08,elbow:0.25,arm:'swing',headTilt:0,mouth:'flat',sway:0};
  if(p==='walk'){P.lean=0.05;P.bob=2.2;P.legA=0.48;P.armA=0.36;P.knee=0.5;P.elbow=0.3;P.headTilt=0.02;P.sway=1.2;}
  else if(p==='run'){P.lean=0.2;P.bob=3.6;P.legA=0.85;P.armA=0.65;P.knee=1.0;P.elbow=1.1;P.headTilt=0.06;P.sway=1.8;}
  else if(p==='happy'){P.lean=0.04;P.bob=3.2;P.legA=0.55;P.armA=0.6;P.knee=0.6;P.elbow=0.7;P.headTilt=0.07;P.mouth='smile';P.sway=1.6;}
  else if(p==='sad'){P.lean=0.13;P.bob=1;P.legA=0.22;P.armA=0.06;P.knee=0.2;P.elbow=0.1;P.arm='droop';P.headTilt=-0.33;P.mouth='frown';P.sway=0.2;}
  else if(p==='jump'){P.lean=0.08;P.headTilt=0.05;P.mouth='o';}
  else {P.bob=1;P.legA=0.04;P.armA=0.05;}
  return P;
}

/* ====== رسم الشخصية ====== */
function blit(g,spr,x,y,ang,useD){
  g.save();g.translate(x,y);g.rotate(ang);
  g.drawImage(useD?spr.dimg:spr.img,-spr.ax,-spr.ay,spr.w,spr.h);
  g.restore();
}
function dirv(a){return {x:-Math.sin(a),y:Math.cos(a)};}
function drawCharacter(g,cx,gy,s){
  var P=getPose(S.poseName);
  var m=S.facing===-1?1:-1;
  var k=1-clamp(Math.max(0,-S.yOff)/260,0,1)*0.55;
  dab(g,cx,gy+5,36*s*k,8*s*k,0,'#2a2418',0.3*k);
  dab(g,cx-8*s,gy+6,20*s*k,6*s*k,0,'#2a2418',0.2*k);

  g.save();
  g.translate(cx,gy);
  g.scale(s*m,s);
  g.translate(0,S.yOff);
  g.rotate(-P.lean);
  var t=S.t;
  g.translate(Math.sin(t)*P.sway,0);
  var bobY=(Math.sin(t*2-Math.PI/2)+1)*0.5*P.bob;
  S.lastBob=bobY;
  g.translate(0,-bobY);

  var aN,aF,bN,bF;
  if(S.poseName==='jump'){aN=0.7;bN=1.3;aF=-0.4;bF=1.0;}
  else{
    aN=Math.sin(t)*P.legA;aF=Math.sin(t+Math.PI)*P.legA;
    bN=P.knee*(0.5-0.5*Math.cos(t))+0.05;bF=P.knee*(0.5-0.5*Math.cos(t+Math.PI))+0.05;
  }
  var rainHold=S.rain>0.05;
  function armA(near){
    if(rainHold&&near)return{u:2.5,f:2.9};
    if(S.poseName==='jump'&&!rainHold)return{u:2.2,f:2.6};
    if(P.arm==='droop')return{u:0.12,f:0.06};
    var ph=near?Math.PI:0,u=Math.sin(t+ph)*P.armA;
    return{u:u,f:u+P.elbow};
  }
  var aFar=armA(false),aNr=armA(true);
  var shF={x:4,y:-92},elF={x:shF.x+dirv(aFar.u).x*50,y:shF.y+dirv(aFar.u).y*50};
  blit(g,SPR.upArm,shF.x,shF.y,aFar.u,true);
  blit(g,SPR.foreArm,elF.x,elF.y,aFar.f,true);
  var hipF={x:6,y:2},knF={x:hipF.x+dirv(aF).x*76,y:hipF.y+dirv(aF).y*76};
  blit(g,SPR.thigh,hipF.x,hipF.y,aF,true);
  blit(g,SPR.shin,knF.x,knF.y,aF-bF,true);
  var hipN={x:2,y:2},knN={x:hipN.x+dirv(aN).x*76,y:hipN.y+dirv(aN).y*76};
  blit(g,SPR.thigh,hipN.x,hipN.y,aN,false);
  blit(g,SPR.shin,knN.x,knN.y,aN-bN,false);
  dab(g,0,-99,11,8,0,'#e8c39a',1);
  dab(g,4,-93,6,5,0,'#c99b72',0.9);
  g.save();g.translate(0,-96);g.rotate((S.movingNow?Math.sin(t*2)*0.02:0)+P.lean*0.25);
  g.drawImage(SPR.dress.img,-70,-6,140,152);g.restore();
  var shN={x:0,y:-92},elN={x:shN.x+dirv(aNr.u).x*50,y:shN.y+dirv(aNr.u).y*50};
  var haN={x:elN.x+dirv(aNr.f).x*46,y:elN.y+dirv(aNr.f).y*46};
  blit(g,SPR.upArm,shN.x,shN.y,aNr.u,false);
  blit(g,SPR.foreArm,elN.x,elN.y,aNr.f,false);
  dab(g,0,-93,7,6,0,'#e8c39a',0.95);
  g.save();g.translate(0,-100);g.rotate(P.headTilt);
  g.drawImage(SPR.head.img,-52,-112,96,120);
  if(S.blinkT<0&&P.mouth!=='smile'){
    dab(g,-11,-28.5,4.4,3.2,-0.08,'#e8c39a',1);
    pStrokeD(g,-15,-28.5,-7,-28,1.4,'#2e1d14',0.8,5);
  }
  if(P.mouth==='smile'){
    g.fillStyle='#7a3a2e';
    g.beginPath();
    g.moveTo(-24,-16);
    g.quadraticCurveTo(-19,-13,-14,-16);
    g.quadraticCurveTo(-18,-7,-24,-16);
    g.closePath();g.fill();
    dab(g,-19,-15,3,1.2,0.1,'#ffffff',0.9);
    dab(g,-19,-10,2,1.2,0.2,'#d0706a',0.8);
    dab(g,-12,-20,4.5,3,0.2,'#d98a70',0.4);
    dab(g,-11,-29,4.6,3.4,-0.08,'#e8c39a',1);
    g.strokeStyle='#2e1d14';g.lineWidth=1.5;g.lineCap='round';
    g.beginPath();g.arc(-11,-27,4.2,Math.PI*1.15,Math.PI*1.85);g.stroke();
  }else if(P.mouth==='frown'){
    g.strokeStyle='#8a4a3a';g.lineWidth=1.4;g.lineCap='round';
    g.beginPath();g.arc(-19,-10,3.5,Math.PI+0.3,Math.PI*2-0.3);g.stroke();
  }else if(P.mouth==='o'){
    g.fillStyle='#8a4a3a';g.beginPath();g.arc(-20,-14,2,0,Math.PI*2);g.fill();
  }
  g.restore();
  g.save();g.translate(5,-92);g.rotate(-0.15+Math.sin(S.time*2)*0.05);
  g.drawImage(SPR.bug.img,-12,-9,24,18);g.restore();
  if(rainHold){
    g.save();g.globalAlpha=clamp(S.rain,0,1);
    var tipX=haN.x-1,tipY=haN.y-62;
    g.strokeStyle='#6a4a26';g.lineWidth=3;g.lineCap='round';
    g.beginPath();g.moveTo(haN.x,haN.y+4);g.lineTo(tipX,tipY);g.stroke();
    pStrokeD(g,haN.x+0.8,haN.y,tipX+0.8,tipY+10,1.2,'#a07840',0.5,3);
    g.save();g.translate(tipX,tipY);g.rotate(-0.06);
    g.drawImage(SPR.umbrella.img,-95,-4,190,80);g.restore();
    dab(g,haN.x,haN.y,5,4.5,0,'#e8c39a',1);
    g.restore();
  }
  g.restore();
}


function buildBug(){
  var o=newC(24,18),g=o.g;g.translate(12,9);
  g.strokeStyle='#0e3a1c';g.lineWidth=1;
  g.beginPath();g.moveTo(-3,4);g.lineTo(-5,7);g.moveTo(0,5);g.lineTo(0,8);g.moveTo(3,4);g.lineTo(5,7);g.stroke();
  paintArea(g,function(p){p.ellipse(0,0,8,6,0,0,Math.PI*2);},[-9,-7,18,14],'#3aa04c','#14522a','#7fd489',0.6,26,1.4);
  dab(g,-7.5,-1,3,2.6,0,'#123a1c',0.95);
  dab(g,-1,-2,1.7,1.4,0,'#0e3a1c',0.9);
  dab(g,3,1,1.7,1.4,0,'#0e3a1c',0.9);
  dab(g,-1,2.5,1.4,1.2,0,'#0e3a1c',0.9);
  dab(g,2,-3,1.6,1,0.4,'#eafff0',0.7);
  pStroke(g,-9,-3,-12,-6,0.8,'#123a1c',0.8);
  pStroke(g,-8,-4,-10,-8,0.8,'#123a1c',0.8);
  return {img:o.c,ax:12,ay:9,w:24,h:18};
}

/* ====== الواجهة ====== */
var built=false;
function build(){
  if(built) return;
  SPR.head=buildHead(); SPR.dress=buildDress();
  SPR.upArm=buildUpperArm(); SPR.foreArm=buildForeArm();
  SPR.thigh=buildThigh(); SPR.shin=buildShin(); SPR.umbrella=buildUmbrella(); SPR.bug=buildBug();
  SPR.thigh.dimg=darken(SPR.thigh.img,0.35);
  SPR.shin.dimg=darken(SPR.shin.img,0.35);
  SPR.upArm.dimg=darken(SPR.upArm.img,0.35);
  SPR.foreArm.dimg=darken(SPR.foreArm.img,0.35);
  built=true;
}
window.WIGirl={
  build:build,
  draw:function(g,x,y,s){ build(); drawCharacter(g,x,y,s); },
  step:function(dt,moving,pose){
    S.time+=dt;
    S.poseName=pose||(moving?'walk':'idle');
    S.movingNow=!!moving;
    S.t+=dt*(MODES[S.poseName]?MODES[S.poseName].freq:1.5);
    S.blinkT-=dt; if(S.blinkT<-0.13) S.blinkT=2.2+Math.random()*2.8;
  },
  setFacing:function(f){ S.facing=f<0?-1:1; },
  facing:function(){ return S.facing; },
  setRain:function(v){ S.rain=v?1:0; S.rainOn=!!v; },
  setNight:function(v){ S.night=v?1:0; S.nightOn=!!v; },
  setY:function(o){ S.yOff=o||0; },
  speed:function(pose){ return (MODES[pose]||MODES.walk).speed; }
};
})();
