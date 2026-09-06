#!/usr/bin/env node
/* Build checklist.html — one page that says what exists and what state it is in.
 *
 * The repository grew to hundreds of pages with no record of which are the real
 * ones. Two thirds had no link pointing at them, an old copy of a whole folder
 * sat beside the current one, and nobody could tell an approved game from an
 * abandoned draft by looking. So this turns the audit into a working document:
 * every page, whether it is approved, whether it actually runs, and whether it
 * has the things a game needs — instructions, a score, levels.
 *
 * The ticks are the point. Approve a page or mark it for deletion and the
 * choice is kept in the browser, so the list can be worked through over days
 * rather than in one sitting.
 *
 *     node scripts/audit-pages.mjs 0 285   # يكتب /tmp/audit-*.json
 *     node scripts/build-checklist.js      # يقرأ audit/pages.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'audit', 'pages.json');
const OUT = path.join(ROOT, 'checklist.html');

const rows = JSON.parse(fs.readFileSync(DATA, 'utf8'));

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* A page is "healthy" when it opens, throws nothing, and asks for no file that
 * is not there. Everything else needs a decision, which is what the list is for. */
const health = r => r.fail ? 'fail' : (r.errs && r.errs.length ? 'err'
                 : (r.http && r.http.length ? 'miss' : 'ok'));

const HEALTH = { ok: ['✅', 'تعمل'], err: ['❌', 'خطأ جافاسكربت'],
                 miss: ['⚠️', 'ملفٌّ ناقص'], fail: ['🚫', 'لا تفتح'] };

const kpi = (label, n, cls) =>
  `<div class="kpi ${cls || ''}"><b>${n}</b><span>${label}</span></div>`;

const ap = rows.filter(r => r.approved), un = rows.filter(r => !r.approved);
const count = (g, f) => g.filter(f).length;

const row = r => {
  const h = health(r), [ico, htxt] = HEALTH[h];
  const gaps = [];
  if (!r.instr) gaps.push('تعليمات');
  if (!r.score) gaps.push('نقاط');
  if (!r.level) gaps.push('مستويات');
  return `<tr data-f="${esc(r.f)}" data-ap="${r.approved ? 1 : 0}" data-h="${h}"
   data-gap="${gaps.length}" data-find="${esc((r.f + ' ' + (r.title || '')).toLowerCase())}">
  <td class="tick"><input type="checkbox" class="done" aria-label="أنجزت"></td>
  <td class="nm"><a href="${esc(r.f)}" target="_blank" rel="noopener">${esc(r.title || r.f.split('/').pop())}</a>
      <i>${esc(r.f)}</i></td>
  <td class="st" title="${htxt}">${ico}<span class="only-wide"> ${htxt}</span>
      ${(r.http && r.http.length) ? '<em>' + esc(r.http.join(' · ')) + '</em>' : ''}
      ${(r.errs && r.errs.length) ? '<em>' + esc(r.errs[0]) + '</em>' : ''}</td>
  <td class="g">${gaps.length ? gaps.map(g => '<span class="gap">' + g + '</span>').join('') : '<span class="full">مكتملة</span>'}</td>
  <td class="dec">
    <button class="d keep" data-d="keep" title="نعتمدها ونثبّتها">اعتماد</button>
    <button class="d drop" data-d="drop" title="مكرّرة أو مهجورة — للحذف">حذف</button>
  </td></tr>`;
};

const table = (id, title, list, note) => `
<section class="sec" id="${id}">
  <h2>${title} <span class="n">${list.length}</span></h2>
  ${note ? `<p class="note">${note}</p>` : ''}
  <div class="scroll"><table>
    <thead><tr><th></th><th>الصفحة</th><th>الحالة</th><th>الناقص</th><th>القرار</th></tr></thead>
    <tbody>${list.map(row).join('\n')}</tbody>
  </table></div>
</section>`;

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="جردٌ لكلّ صفحات «تحت ظل النخلة»: ما هو معتمد، وما يعمل، وما ينقصه.">
<title>الجرد — تحت ظل النخلة</title>
<link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="public/favicon.png">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--sand:#F5EDD8;--linen:#EDE0C4;--clay:#C9AA80;--earth:#8C6A3F;--soil:#4A3520;
      --ok:#3E6B3A;--warn:#B07A1E;--bad:#9C3026}
body{background:var(--sand);color:var(--soil);font-family:'Almarai',sans-serif;padding:26px 14px 70px;line-height:1.7}
.wrap{max-width:1180px;margin:0 auto}
header{text-align:center;margin-bottom:18px}
h1{font-family:'Aref Ruqaa',serif;font-size:clamp(1.5rem,5vw,2.2rem)}
.tag{color:var(--earth);font-size:.9rem;margin-top:5px}

.kpis{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:18px 0}
.kpi{background:var(--linen);border:1px solid var(--clay);border-radius:10px;
     padding:9px 15px;text-align:center;min-width:96px}
.kpi b{display:block;font-size:1.35rem;line-height:1.2}
.kpi span{font-size:.72rem;color:var(--earth)}
.kpi.ok b{color:var(--ok)} .kpi.warn b{color:var(--warn)} .kpi.bad b{color:var(--bad)}

.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:var(--linen);
     border:1px solid var(--clay);border-radius:10px;padding:10px 12px;margin-bottom:16px;
     position:sticky;top:0;z-index:5}
.bar input[type=search]{flex:1;min-width:150px;font-family:inherit;font-size:.85rem;
     padding:.42em .6em;border:1px solid var(--clay);border-radius:6px;background:#fff;color:var(--soil)}
.f{font-family:inherit;font-size:.76rem;font-weight:700;padding:.42em .85em;border-radius:999px;
   border:1.5px solid var(--clay);background:transparent;color:var(--soil);cursor:pointer}
.f.on{background:var(--soil);border-color:var(--soil);color:var(--sand)}

h2{font-family:'Aref Ruqaa',serif;font-size:1.15rem;margin:26px 0 6px;display:flex;align-items:center;gap:.6em}
h2 .n{font-family:'Almarai',sans-serif;font-size:.7rem;background:var(--clay);color:#fff;border-radius:999px;padding:.1em .7em}
.note{font-size:.8rem;color:var(--earth);margin-bottom:8px}
.scroll{overflow-x:auto;border:1px solid var(--clay);border-radius:10px;background:var(--linen)}
table{width:100%;border-collapse:collapse;font-size:.82rem;min-width:640px}
th{text-align:right;font-size:.72rem;color:var(--earth);padding:8px 10px;border-bottom:1px solid var(--clay);white-space:nowrap}
td{padding:7px 10px;border-bottom:1px solid rgba(140,106,63,.14);vertical-align:top}
tr:last-child td{border-bottom:0}
tr.hide{display:none}
.tick{width:34px}
.nm a{color:var(--soil);font-weight:700;text-decoration:none}
.nm a:hover{text-decoration:underline}
.nm i{display:block;font-style:normal;font-size:.68rem;color:var(--earth);opacity:.8;direction:ltr;text-align:right}
.st{white-space:nowrap}
.st em{display:block;font-style:normal;font-size:.66rem;color:var(--bad);direction:ltr;text-align:right;max-width:210px}
.gap{display:inline-block;background:rgba(176,122,30,.14);color:var(--warn);border-radius:5px;
     padding:.05em .5em;font-size:.7rem;margin-inline-end:3px}
.full{color:var(--ok);font-size:.72rem}
.dec{white-space:nowrap}
button.d{font-family:inherit;font-size:.7rem;font-weight:700;padding:.3em .8em;border-radius:6px;
     border:1.5px solid var(--clay);background:transparent;color:var(--soil);cursor:pointer;margin-inline-end:4px}
button.d.sel[data-d=keep]{background:var(--ok);border-color:var(--ok);color:#fff}
button.d.sel[data-d=drop]{background:var(--bad);border-color:var(--bad);color:#fff}
tr.done-row{opacity:.5}
footer{text-align:center;margin-top:36px;font-size:.74rem;color:var(--earth)}
footer a{color:var(--earth)}
#out{width:100%;min-height:120px;margin-top:10px;font-family:ui-monospace,monospace;font-size:.72rem;
     direction:ltr;text-align:left;border:1px solid var(--clay);border-radius:8px;padding:8px;display:none}
@media(max-width:640px){.only-wide{display:none}.bar{position:static}}
</style>
</head>
<body>
<div class="wrap">

<header>
  <h1>الجرد</h1>
  <div class="tag">كلّ صفحةٍ في المستودع: ما هي، وهل تعمل، وما ينقصها</div>
</header>

<div class="kpis">
  ${kpi('صفحة', rows.length)}
  ${kpi('معتمدة', ap.length, 'ok')}
  ${kpi('غير معتمدة', un.length, 'warn')}
  ${kpi('فيها خطأ', count(rows, r => health(r) !== 'ok'), 'bad')}
  ${kpi('بلا تعليمات', count(rows, r => !r.instr), 'warn')}
  ${kpi('بلا نقاط', count(rows, r => !r.score), 'warn')}
</div>

<div class="bar">
  <input id="q" type="search" placeholder="ابحثي عن صفحة…" autocomplete="off">
  <button class="f on" data-f="all">الكلّ</button>
  <button class="f" data-f="ap">المعتمدة</button>
  <button class="f" data-f="un">غير المعتمدة</button>
  <button class="f" data-f="bad">فيها خطأ</button>
  <button class="f" data-f="gap">ينقصها شيء</button>
  <button class="f" data-f="undone">لم تُنجَز</button>
  <button class="f" id="exp" style="margin-inline-start:auto">📋 صدّري القرارات</button>
</div>

<textarea id="out" readonly></textarea>

${table('ap', 'المعتمدة — نثبّتها', ap,
  'هذه ما تعرضه صفحة الألعاب. الهدف: كلّها ✅ وبلا نواقص.')}
${table('un', 'غير المعتمدة — نقرّر فيها', un,
  'موجودةٌ في المستودع ولا رابطَ يصل إليها. إمّا تُعتمد وتُربَط، وإمّا تُحذف.')}

<footer>
  الفحص آليّ: كلّ صفحةٍ تُفتَح في متصفّحٍ حقيقيّ ويُسجَّل ما يقع فيها.<br>
  <a href="games-skills.html">صفحة الألعاب</a> · <a href="embed-codes.html">أكواد التضمين</a>
</footer>
</div>

<script>
(function(){
  var KEY='palm-checklist-v1';
  var state={};
  try{ state=JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ state={}; }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){} }

  var rows=[].slice.call(document.querySelectorAll('tbody tr'));
  rows.forEach(function(tr){
    var st=state[tr.dataset.f]||{};
    if(st.done){ tr.querySelector('.done').checked=true; tr.classList.add('done-row'); }
    if(st.d){ var b=tr.querySelector('button[data-d="'+st.d+'"]'); if(b) b.classList.add('sel'); }
  });

  document.addEventListener('change',function(e){
    var cb=e.target.closest('.done'); if(!cb) return;
    var tr=cb.closest('tr'), f=tr.dataset.f;
    state[f]=state[f]||{}; state[f].done=cb.checked;
    tr.classList.toggle('done-row',cb.checked); save(); filter();
  });
  document.addEventListener('click',function(e){
    var b=e.target.closest('button.d'); if(!b) return;
    var tr=b.closest('tr'), f=tr.dataset.f;
    state[f]=state[f]||{};
    var was=state[f].d===b.dataset.d;
    tr.querySelectorAll('button.d').forEach(function(x){ x.classList.remove('sel'); });
    if(was){ delete state[f].d; } else { state[f].d=b.dataset.d; b.classList.add('sel'); }
    save();
  });

  var mode='all', q=document.getElementById('q');
  function filter(){
    var t=q.value.trim().toLowerCase();
    rows.forEach(function(tr){
      var ok=true;
      if(mode==='ap')     ok=tr.dataset.ap==='1';
      else if(mode==='un')ok=tr.dataset.ap==='0';
      else if(mode==='bad')ok=tr.dataset.h!=='ok';
      else if(mode==='gap')ok=tr.dataset.gap!=='0';
      else if(mode==='undone')ok=!tr.classList.contains('done-row');
      if(ok&&t) ok=tr.dataset.find.indexOf(t)>=0;
      tr.classList.toggle('hide',!ok);
    });
    document.querySelectorAll('.sec').forEach(function(s){
      var any=[].slice.call(s.querySelectorAll('tbody tr')).some(function(r){return !r.classList.contains('hide');});
      s.style.display=any?'':'none';
    });
  }
  q.addEventListener('input',filter);
  document.querySelectorAll('.f[data-f]').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.f[data-f]').forEach(function(x){x.classList.remove('on');});
      b.classList.add('on'); mode=b.dataset.f; filter();
    });
  });

  /* القرارات تُصدَّر نصّاً يُنسخ ويُرسَل — لا حاجة إلى خادم */
  document.getElementById('exp').addEventListener('click',function(){
    var keep=[],drop=[];
    rows.forEach(function(tr){
      var st=state[tr.dataset.f]||{};
      if(st.d==='keep') keep.push(tr.dataset.f);
      if(st.d==='drop') drop.push(tr.dataset.f);
    });
    var out=document.getElementById('out');
    out.value='# اعتماد ('+keep.length+')\\n'+keep.join('\\n')+
              '\\n\\n# حذف ('+drop.length+')\\n'+drop.join('\\n');
    out.style.display='block'; out.select();
    try{ document.execCommand('copy'); }catch(e){}
  });

  filter();
})();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('checklist.html: %d صفحة (%d معتمدة، %d غير معتمدة)', rows.length, ap.length, un.length);
