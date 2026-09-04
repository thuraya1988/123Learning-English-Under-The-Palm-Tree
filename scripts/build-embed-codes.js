#!/usr/bin/env node
/* Build embed-codes.html — one copy-ready <iframe> for every approved game.
 *
 * Thuraya needs to paste the games into Google Sites, Classroom, Blogger, a
 * Moodle page — anywhere that accepts an embed. Ninety-eight snippets cannot
 * live in a chat message, and hand-writing them would go stale the moment a
 * game is renamed. So the list is read from games-skills.html, which is the
 * page that decides which games are approved: whatever has a card there gets
 * a snippet here, with the same emoji and the same two names.
 *
 *     node scripts/build-embed-codes.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'games-skills.html');
const OUT = path.join(ROOT, 'embed-codes.html');

const src = fs.readFileSync(SRC, 'utf8');

const unesc = s => String(s)
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const txt = s => unesc(String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

/* Section headings, so the embed page reads in the same order as the site. */
const heads = [...src.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map(m => ({ at: m.index, name: txt(m[1]) }));
const sectionAt = pos => {
  let s = 'الألعاب';
  for (const h of heads) if (h.at < pos) s = h.name;
  return s;
};

const seen = new Set();
const games = [];
for (const m of src.matchAll(/<a class="card" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
  const file = m[1];
  if (seen.has(file) || /^https?:/.test(file)) continue;
  seen.add(file);
  const part = re => { const x = m[2].match(re); return x ? unesc(x[1]) : ''; };
  games.push({
    file,
    em: part(/class="em">([\s\S]*?)</) || '🌴',
    en: part(/class="en">([\s\S]*?)</) || file,
    ar: part(/class="ar">([\s\S]*?)</),
    sec: sectionAt(m.index)
  });
}

const missing = games.filter(g => !fs.existsSync(path.join(ROOT, g.file)));
if (missing.length) {
  console.error('لعبةٌ في القائمة بلا ملف: ' + missing.map(g => g.file).join(', '));
  process.exit(1);
}

const order = [...new Set(games.map(g => g.sec))];
const secs = order.map(name => ({ name, items: games.filter(g => g.sec === name) }));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rows = secs.map(s => `
<section class="sec" data-sec="${esc(s.name)}">
  <h2>${esc(s.name)} <span class="n">${s.items.length}</span>
    <button class="mini" data-all="${esc(s.name)}">نسخ أكواد القسم</button></h2>
  <div class="list">
${s.items.map(g => `    <article class="g" data-file="${esc(g.file)}" data-find="${esc((g.en + ' ' + g.ar + ' ' + g.file).toLowerCase())}">
      <div class="hd"><span class="em">${esc(g.em)}</span>
        <span class="nm"><b>${esc(g.en)}</b><i>${esc(g.ar)}</i></span></div>
      <pre class="code"><code></code></pre>
      <div class="btns">
        <button class="copy">📋 نسخ الكود</button>
        <button class="link">🔗 نسخ الرابط</button>
        <a class="open" href="${esc(g.file)}" target="_blank" rel="noopener">↗ فتح</a>
      </div>
    </article>`).join('\n')}
  </div>
</section>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="أكواد تضمين جاهزة لكلّ ألعاب ومهارات «تحت ظل النخلة» — انسخي الكود وألصقيه في أيّ موقع أو منصّة.">
<title>أكواد التضمين — تحت ظل النخلة</title>
<link href="https://fonts.googleapis.com/css2?family=Ovo&family=Almarai:wght@300;400;700&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="public/favicon.png">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--sand:#F5EDD8;--linen:#EDE0C4;--clay:#C9AA80;--earth:#8C6A3F;--soil:#4A3520;--ok:#3E6B3A}
body{background:var(--sand);color:var(--soil);font-family:'Almarai',sans-serif;padding:30px 16px 70px;line-height:1.7}
.wrap{max-width:1050px;margin:0 auto}
header{text-align:center;margin-bottom:22px}
h1{font-family:'Aref Ruqaa',serif;font-weight:700;font-size:clamp(1.6rem,5vw,2.4rem)}
.tag{color:var(--earth);font-size:.95rem;margin-top:6px}
.deco{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--clay),transparent);margin:14px auto}

.how{background:var(--linen);border:1px solid var(--clay);border-radius:10px;padding:16px 18px;margin-bottom:18px;font-size:.9rem}
.how b{color:var(--soil)}
.how ol{margin:8px 22px 0;padding:0}
.how li{margin:3px 0}

.bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;background:var(--linen);border:1px solid var(--clay);border-radius:10px;padding:12px 14px;margin-bottom:20px;position:sticky;top:0;z-index:5}
.bar label{font-size:.82rem;display:flex;align-items:center;gap:.4em}
.bar input,.bar select{font-family:inherit;font-size:.85rem;padding:.42em .6em;border:1px solid var(--clay);border-radius:6px;background:#fff;color:var(--soil)}
#q{flex:1;min-width:180px}
#base{min-width:250px;flex:1}
button,.open{font-family:inherit;font-size:.8rem;font-weight:700;padding:.5em 1em;border-radius:6px;border:1.5px solid var(--soil);background:var(--soil);color:var(--sand);cursor:pointer;text-decoration:none;display:inline-block;transition:background .2s,border-color .2s}
button:hover,.open:hover{background:var(--earth);border-color:var(--earth)}
button.mini{font-size:.7rem;padding:.35em .8em;background:transparent;color:var(--soil)}
button.mini:hover{background:var(--clay);border-color:var(--clay)}
.link,.open{background:transparent;color:var(--soil)}
.link:hover,.open:hover{background:var(--clay);border-color:var(--clay);color:var(--soil)}
button.done{background:var(--ok)!important;border-color:var(--ok)!important;color:#fff!important}

h2{font-family:'Aref Ruqaa',serif;font-size:1.2rem;margin:26px 0 10px;display:flex;align-items:center;gap:.6em;flex-wrap:wrap}
h2 .n{font-family:'Almarai',sans-serif;font-size:.72rem;background:var(--clay);color:#fff;border-radius:999px;padding:.1em .7em}
.list{display:grid;gap:12px}
.g{background:var(--linen);border:1px solid var(--clay);border-radius:10px;padding:13px 15px}
.hd{display:flex;align-items:center;gap:.6em;margin-bottom:8px}
.hd .em{font-size:1.5rem}
.nm{display:flex;flex-direction:column;line-height:1.35}
.nm b{font-size:.92rem;direction:ltr;text-align:right}
.nm i{font-family:'Aref Ruqaa',serif;font-style:normal;font-size:.85rem;color:var(--earth)}
pre.code{background:#fffdf6;border:1px dashed var(--clay);border-radius:8px;padding:10px 12px;overflow-x:auto;direction:ltr;text-align:left}
pre.code code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.74rem;white-space:pre;color:#3a2a17}
.btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:9px}
.empty{text-align:center;color:var(--earth);padding:30px;display:none}
footer{text-align:center;margin-top:44px;font-size:.75rem;color:var(--earth);opacity:.8}
footer a{color:var(--earth)}
@media(max-width:520px){.bar{position:static}}
</style>
</head>
<body>
<div class="wrap">

<header>
  <h1>أكواد التضمين</h1>
  <div class="tag">كلّ الألعاب والمهارات المعتمَدة — كودٌ جاهزٌ للنسخ لكلّ واحدة</div>
  <div class="deco"></div>
</header>

<div class="how">
  <b>كيف تستعملينها؟</b>
  <ol>
    <li>اضغطي <b>📋 نسخ الكود</b> عند اللعبة التي تريدينها.</li>
    <li>في موقعك (Google Sites أو Blogger أو Moodle أو أيّ محرّر) اختاري «تضمين / Embed» ثمّ «كود / Embed code».</li>
    <li>ألصقي الكود واحفظي — تظهر اللعبة داخل الصفحة نفسها.</li>
  </ol>
  <div style="margin-top:8px">في Google Classroom لا يوجد تضمين، فاستعملي <b>🔗 نسخ الرابط</b> وأضيفيه رابطاً للمهمّة.</div>
</div>

<div class="bar">
  <label>🔎 <input id="q" type="search" placeholder="ابحثي عن لعبة…" autocomplete="off"></label>
  <label>الرابط <input id="base" type="url" value="https://play.under-palm-tree.com"></label>
  <label>الارتفاع
    <select id="h">
      <option value="600">٦٠٠ بكسل</option>
      <option value="700" selected>٧٠٠ بكسل</option>
      <option value="820">٨٢٠ بكسل</option>
      <option value="full">ملء الشاشة</option>
    </select>
  </label>
  <button id="copyAll">📋 نسخ كلّ الأكواد</button>
</div>

${rows}

<div class="empty" id="empty">لا توجد لعبةٌ بهذا الاسم.</div>

<footer>
  ٩٨ لعبةً ومهارة · <a href="games-skills.html">العودة إلى صفحة الألعاب</a>
</footer>
</div>

<script>
(function(){
  var base=document.getElementById('base'), hSel=document.getElementById('h'), q=document.getElementById('q');
  var cards=[].slice.call(document.querySelectorAll('.g'));

  function root(){ return (base.value||'').trim().replace(/\\/+$/,''); }
  function url(f){ var r=root(); return r?r+'/'+f:f; }

  /* The height dropdown offers a real full-screen option because the 3D
   * worlds are unusable in a short box. "ملء الشاشة" is not a pixel value,
   * so it becomes a viewport height with the box allowed to fill it. */
  function code(g){
    var f=g.dataset.file, h=hSel.value;
    var nm=g.querySelector('.nm b').textContent+' — '+g.querySelector('.nm i').textContent;
    var size = h==='full'
      ? 'width="100%" height="100%" style="border:0;border-radius:12px;position:absolute;inset:0"'
      : 'width="100%" height="'+h+'" style="border:0;border-radius:12px;max-width:100%"';
    var frame='<iframe src="'+url(f)+'"\\n        '+size+
      '\\n        allow="autoplay; fullscreen; microphone; gyroscope; accelerometer"'+
      '\\n        allowfullscreen loading="lazy"'+
      '\\n        title="'+nm.replace(/"/g,'&quot;')+'"></iframe>';
    if(h==='full')
      frame='<div style="position:relative;width:100%;height:80vh">\\n  '+frame.replace(/\\n/g,'\\n  ')+'\\n</div>';
    return frame;
  }

  function render(){ cards.forEach(function(g){ g.querySelector('code').textContent=code(g); }); }

  /* navigator.clipboard is blocked on plain http and in some school
   * browsers, so fall back to a hidden textarea rather than failing quietly. */
  function put(text,btn,label){
    function ok(){
      var old=btn.textContent; btn.textContent=label||'✅ نُسخ'; btn.classList.add('done');
      setTimeout(function(){ btn.textContent=old; btn.classList.remove('done'); },1400);
    }
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(text).then(ok,function(){legacy(text,ok);});
    } else legacy(text,ok);
  }
  function legacy(text,ok){
    var ta=document.createElement('textarea');
    ta.value=text; ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); ok(); }catch(e){ prompt('انسخي الكود يدويّاً:',text); }
    document.body.removeChild(ta);
  }

  document.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    var g=e.target.closest('.g');
    if(b.classList.contains('copy')) return put(code(g),b);
    if(b.classList.contains('link')) return put(url(g.dataset.file),b,'✅ نُسخ الرابط');
    if(b.dataset.all!==undefined){
      var sec=e.target.closest('.sec');
      var list=[].slice.call(sec.querySelectorAll('.g')).filter(function(x){return x.style.display!=='none';});
      return put(list.map(code).join('\\n\\n'),b,'✅ نُسخت ('+list.length+')');
    }
    if(b.id==='copyAll'){
      var vis=cards.filter(function(x){return x.style.display!=='none';});
      return put(vis.map(code).join('\\n\\n'),b,'✅ نُسخت ('+vis.length+')');
    }
  });

  function filter(){
    var t=q.value.trim().toLowerCase(), n=0;
    cards.forEach(function(g){
      var show=!t||g.dataset.find.indexOf(t)>=0;
      g.style.display=show?'':'none'; if(show)n++;
    });
    document.querySelectorAll('.sec').forEach(function(s){
      var any=[].slice.call(s.querySelectorAll('.g')).some(function(g){return g.style.display!=='none';});
      s.style.display=any?'':'none';
    });
    document.getElementById('empty').style.display=n?'none':'block';
  }

  q.addEventListener('input',filter);
  base.addEventListener('input',render);
  hSel.addEventListener('change',render);
  render();
})();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('embed-codes.html: %d games in %d sections', games.length, secs.length);
secs.forEach(s => console.log('  %s — %d', s.name, s.items.length));
