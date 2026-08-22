/* طبقتان تُرسمان فوق كلّ لوحة، بلا أيّ تعديل على ملفّات العوالم:
   back()  = أرض المشي — رصيف وحافّة وشارع، أو درب ترابيّ في العوالم الطبيعيّة.
   front() = ما يقف أمام الفتاة — درابزين وجذوع أشجار على الطرفين ومظلّة أوراق من الأعلى.
   الفتاة تُرسم بين الطبقتين، فتمشي داخل المشهد لا فوقه. */
(function(){
'use strict';

/* عشوائيّة ثابتة: نفس البذرة تعطي نفس الشجرة دائمًا */
function rnd(s){ var x=Math.sin(s*127.1+311.7)*43758.5453; return x-Math.floor(x); }

function shade(hex,k){
  var n=parseInt(hex.slice(1),16);
  var r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  r=Math.max(0,Math.min(255,Math.round(r*k)));
  g=Math.max(0,Math.min(255,Math.round(g*k)));
  b=Math.max(0,Math.min(255,Math.round(b*k)));
  return 'rgb('+r+','+g+','+b+')';
}

/* ============ أرض المشي ============ */
function back(g,o){
  var W=o.W,H=o.H,gy=o.gy,p=o.pal;
  if(gy>=H) return;

  if(o.kind==='path'){
    /* درب ترابيّ بحافّة غير مستقيمة — يليق بالوادي والغابة */
    g.save();
    g.beginPath();
    g.moveTo(0,gy+6);
    for(var x=0;x<=W;x+=W/14){
      var w=Math.sin(x*0.013+o.seed)*4 + Math.sin(x*0.031+o.seed*2)*2.5;
      g.lineTo(x,gy+6+w);
    }
    g.lineTo(W,H); g.lineTo(0,H); g.closePath();
    g.fillStyle=p.walk; g.fill();
    g.strokeStyle=p.curb; g.lineWidth=2; g.globalAlpha=.55; g.stroke(); g.globalAlpha=1;
    /* حصى وأثر أقدام */
    g.fillStyle=shade(p.curb,1);
    for(var i=0;i<70;i++){
      var px=rnd(i+o.seed)*W, py=gy+12+rnd(i*3.1+o.seed)*(H-gy-12);
      var r=0.8+rnd(i*7.7)*1.6;
      g.globalAlpha=.35+rnd(i*2.2)*.4;
      g.beginPath(); g.ellipse(px,py,r*1.6,r,0,0,6.283); g.fill();
    }
    /* أعشاب وزهيرات — حتى لا تكون الأرض مسطّحة فارغة */
    if(p.tuft){
      g.strokeStyle=p.tuft; g.lineCap='round';
      for(var t=0;t<120;t++){
        var bx=rnd(t*2.9+o.seed*3)*W;
        var by=gy+10+rnd(t*6.1+o.seed)*(H-gy-14);
        var bh=4+rnd(t*4.3)*7;
        g.lineWidth=1+rnd(t*8.1)*0.8;
        g.globalAlpha=.35+rnd(t*1.3)*.45;
        g.beginPath();
        g.moveTo(bx,by);
        g.quadraticCurveTo(bx+(rnd(t*5.5)-.5)*5,by-bh*0.6,bx+(rnd(t*7.3)-.5)*9,by-bh);
        g.stroke();
      }
      g.globalAlpha=1;
      if(p.bloom){
        for(var fl=0;fl<26;fl++){
          var fx=rnd(fl*3.3+o.seed*5)*W, fy=gy+14+rnd(fl*9.7+o.seed)*(H-gy-18);
          g.fillStyle=p.bloom; g.globalAlpha=.6+rnd(fl*2.7)*.4;
          g.beginPath(); g.arc(fx,fy,1.2+rnd(fl*4.9)*1.5,0,6.283); g.fill();
        }
        g.globalAlpha=1;
      }
    }
    g.globalAlpha=1;
    g.restore();
    return;
  }

  /* رصيف ← حافّة ← شارع */
  var sw=Math.max(26,Math.round((H-gy)*0.34));   /* عمق الرصيف */
  g.fillStyle=p.walk;  g.fillRect(0,gy,W,sw);
  /* خطّ الحافّة */
  g.fillStyle=p.curb;  g.fillRect(0,gy+sw,W,Math.max(3,Math.round(H*0.006)));
  /* الشارع */
  g.fillStyle=p.road;  g.fillRect(0,gy+sw+3,W,H-(gy+sw));
  /* بلاط الرصيف */
  g.strokeStyle=shade(p.curb,.92); g.lineWidth=1; g.globalAlpha=.5;
  var step=Math.max(34,Math.round(W/11));
  for(var tx=(o.seed*17)%step;tx<W;tx+=step){
    g.beginPath(); g.moveTo(tx,gy+2); g.lineTo(tx,gy+sw-2); g.stroke();
  }
  g.globalAlpha=1;
  /* خطّ ضوء رفيع على طرف الرصيف */
  g.fillStyle=shade(p.walk,1.14); g.fillRect(0,gy,W,2);

  /* أوراق متساقطة */
  if(p.leaf){
    for(var L=0;L<26;L++){
      var lx=rnd(L*5.3+o.seed)*W;
      var ly=gy+4+rnd(L*9.1+o.seed)*(H-gy-6);
      var s=2.2+rnd(L*3.7)*2.6, a=rnd(L*1.9)*3.14;
      g.save(); g.translate(lx,ly); g.rotate(a);
      g.fillStyle=p.leaf; g.globalAlpha=.55+rnd(L*4.4)*.45;
      g.beginPath(); g.ellipse(0,0,s*1.5,s*0.62,0,0,6.283); g.fill();
      g.restore();
    }
    g.globalAlpha=1;
  }
}

/* ============ ما يقف أمام الفتاة ============ */
function branch(g,x,y,len,ang,w,depth,col,leaf,seed){
  if(depth<=0||len<3) return;
  var x2=x+Math.cos(ang)*len, y2=y+Math.sin(ang)*len;
  g.strokeStyle=col; g.lineWidth=w; g.lineCap='round';
  g.beginPath(); g.moveTo(x,y);
  g.quadraticCurveTo((x+x2)/2+Math.cos(ang+1.57)*len*0.10,(y+y2)/2+Math.sin(ang+1.57)*len*0.10,x2,y2);
  g.stroke();
  if(depth<=2 && leaf){
    for(var k=0;k<3;k++){
      g.fillStyle=leaf; g.globalAlpha=.5+rnd(seed*3+k)*.5;
      var r=2+rnd(seed*7+k)*3.4;
      g.beginPath();
      g.ellipse(x2+(rnd(seed+k)-.5)*13,y2+(rnd(seed*2+k)-.5)*13,r,r*.72,0,0,6.283);
      g.fill();
    }
    g.globalAlpha=1;
  }
  var sp=0.46+rnd(seed)*0.30;
  branch(g,x2,y2,len*(0.70+rnd(seed*2)*0.10),ang-sp,w*0.66,depth-1,col,leaf,seed*1.7+1);
  branch(g,x2,y2,len*(0.68+rnd(seed*3)*0.10),ang+sp,w*0.66,depth-1,col,leaf,seed*2.3+2);
  if(depth>3) branch(g,x2,y2,len*0.55,ang+(rnd(seed*5)-.5)*0.5,w*0.5,depth-2,col,leaf,seed*3.1+3);
}

function tree(g,x,baseY,h,col,leaf,seed,sway){
  g.save();
  g.translate(x,baseY);
  g.rotate(sway);
  /* الجذع */
  var tw=Math.max(2.6,h*0.0135);
  g.fillStyle=col;
  g.beginPath();
  g.moveTo(-tw,0);
  g.quadraticCurveTo(-tw*0.75,-h*0.55,-tw*0.34,-h*0.80);
  g.lineTo(tw*0.34,-h*0.80);
  g.quadraticCurveTo(tw*0.75,-h*0.55,tw,0);
  g.closePath(); g.fill();
  /* جذور بارزة */
  g.beginPath();
  g.moveTo(-tw,0); g.quadraticCurveTo(-tw*3.2,-3,-tw*4.4,4); g.lineTo(-tw*0.5,4); g.closePath(); g.fill();
  g.beginPath();
  g.moveTo(tw,0); g.quadraticCurveTo(tw*3.2,-3,tw*4.4,4); g.lineTo(tw*0.5,4); g.closePath(); g.fill();
  /* الأغصان */
  branch(g,0,-h*0.80,h*0.15,-1.57,tw*1.1,5,col,leaf,seed);
  branch(g,-tw*0.5,-h*0.66,h*0.12,-2.35,tw*0.8,4,col,leaf,seed+11);
  branch(g, tw*0.5,-h*0.61,h*0.12,-0.82,tw*0.8,4,col,leaf,seed+23);
  g.restore();
}

function railing(g,o){
  var W=o.W,H=o.H,p=o.pal;
  var top=o.gy+Math.max(26,Math.round((H-o.gy)*0.34))+Math.round((H-o.gy)*0.34);
  if(top>H-16) top=H-Math.max(30,Math.round(H*0.055));
  var hgt=Math.max(22,Math.round(H*0.05));
  g.fillStyle=p.rail;
  g.fillRect(0,top,W,Math.max(3,Math.round(H*0.005)));            /* القضيب العلوي */
  g.fillRect(0,top+hgt,W,Math.max(2,Math.round(H*0.003)));        /* القضيب السفلي */
  var gap=Math.max(20,Math.round(W/17));
  for(var x=gap*0.5;x<W;x+=gap) g.fillRect(Math.round(x),top,Math.max(2,Math.round(W*0.006)),hgt);
  /* أعمدة أعرض */
  for(var px=gap*3;px<W;px+=gap*5.5){
    g.fillRect(Math.round(px)-2,top-6,Math.max(5,Math.round(W*0.012)),hgt+6);
    g.fillRect(Math.round(px)-5,top-9,Math.max(11,Math.round(W*0.025)),5);
  }
}

function canopy(g,o){
  /* مظلّة أوراق تتدلّى من أعلى الإطار، كما في اللوحة المرجع */
  var W=o.W,p=o.pal;
  var col=p.canopy||p.bark;
  for(var i=0;i<7;i++){
    var x=(i/6)*W*1.1-W*0.05 + Math.sin(o.t*0.5+i)*3;
    var h=W*(0.10+rnd(i*3.7+o.seed)*0.11);
    g.save(); g.translate(x,-6); g.rotate((rnd(i*5.1+o.seed)-0.5)*1.5);
    g.fillStyle=col; g.globalAlpha=.92;
    g.beginPath();
    g.moveTo(0,0);
    g.quadraticCurveTo(-h*0.42,h*0.52,-h*0.10,h);
    g.quadraticCurveTo(0,h*0.62,h*0.10,h);
    g.quadraticCurveTo(h*0.42,h*0.52,0,0);
    g.closePath(); g.fill();
    g.restore();
  }
  g.globalAlpha=1;
}

function front(g,o){
  var W=o.W,H=o.H,p=o.pal;
  if(o.kind==='street' && p.rail) railing(g,o);
  var th=H*0.80;
  var sway=Math.sin(o.t*0.55)*0.005;
  /* شجرتان على حافّتَي الإطار — تمرّ الفتاة بينهما */
  tree(g, W*0.040, o.gy+(H-o.gy)*0.34, th, p.bark, p.leaf, 3.2, sway);
  tree(g, W*0.962, o.gy+(H-o.gy)*0.26, th*0.90, p.bark, p.leaf, 8.6, -sway);
  if(p.canopy!==false) canopy(g,o);
}

window.WIStreet={ back:back, front:front };
})();
