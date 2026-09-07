#!/usr/bin/env node
/* يولّد ألغازَ القلعة من الرواية نفسِها — «Under the Palm Tree · 36 Palms».
 *
 * كنتُ قد ولّدتُها من كتاب الصفّ الخامس، وذلك خطأٌ مني: حين تقول
 * الناشرةُ «منهجي» فهي تعني روايتَها، والقلعةُ من ثقافة عُمان وتاريخها
 * ومن الرواية — لا من كتابٍ مدرسيّ.
 *
 * والروايةُ نفسُها تحمل مادّتَها: كلُّ كلمةٍ صعبةٍ فيها موسومةٌ
 *     <span class="vw" data-w data-m data-s data-x data-e>
 * أي الكلمةُ ومعناها ومرادفاتُها ومثالُها ورمزُها. وهي تسعُ مئةٍ
 * وسبعٌ وأربعون كلمة. ومعها ستٌّ وثلاثون نخلةً (فصلًا) ومئتان وإحدى
 * وعشرون مشهدًا، ولكلٍّ عنوانُه.
 *
 *     node scripts/build-novel-riddles.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NOVEL = path.join(ROOT, 'public', 'story', 'novel.html');
const OUT = path.join(ROOT, 'public', 'js', 'castle-riddles-novel.js');

const html = fs.readFileSync(NOVEL, 'utf8');
const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'",
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–',
  hellip: '…', middot: '·', deg: '°', eacute: 'é', shy: '' };
const unesc = s => s.replace(/&(#?\w+);/g, (m, k) => (k in ENT ? ENT[k] : m))
  .replace(/\s+/g, ' ').trim();

/* ── ١) قاموسُ الرواية ─────────────────────────────────────────── */
const attr = (tag, k) => { const m = tag.match(new RegExp('data-' + k + '="([^"]*)"')); return m ? unesc(m[1]) : ''; };
const dict = new Map();
for (const tag of html.match(/<span class="vw"[^>]*>/g) || []) {
  const w = attr(tag, 'w');
  if (!w || dict.has(w)) continue;
  dict.set(w, { w, m: attr(tag, 'm'), s: attr(tag, 's'), x: attr(tag, 'x'), e: attr(tag, 'e') });
}
const WORDS = [...dict.values()].filter(r => r.m && r.s && r.x);

/* ── ٢) النخيلُ الستّ والثلاثون ومشاهدُها ───────────────────────── */
const ORD = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
  'Nineteen', 'Twenty', 'Twenty-One', 'Twenty-Two', 'Twenty-Three', 'Twenty-Four', 'Twenty-Five',
  'Twenty-Six', 'Twenty-Seven', 'Twenty-Eight', 'Twenty-Nine', 'Thirty', 'Thirty-One',
  'Thirty-Two', 'Thirty-Three', 'Thirty-Four', 'Thirty-Five', 'Thirty-Six'];
const AR_ORD = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة',
  'الثامنة', 'التاسعة', 'العاشرة', 'الحادية عشرة', 'الثانية عشرة', 'الثالثة عشرة',
  'الرابعة عشرة', 'الخامسة عشرة', 'السادسة عشرة', 'السابعة عشرة', 'الثامنة عشرة',
  'التاسعة عشرة', 'العشرين', 'الحادية والعشرين', 'الثانية والعشرين', 'الثالثة والعشرين',
  'الرابعة والعشرين', 'الخامسة والعشرين', 'السادسة والعشرين', 'السابعة والعشرين',
  'الثامنة والعشرين', 'التاسعة والعشرين', 'الثلاثين', 'الحادية والثلاثين', 'الثانية والثلاثين',
  'الثالثة والثلاثين', 'الرابعة والثلاثين', 'الخامسة والثلاثين', 'السادسة والثلاثين'];

/* المشاهدُ تقع بين ترويستَي نخلتين، فالترتيبُ في الملفّ هو النسب */
const marks = [];
for (const m of html.matchAll(/<div class="ch-sub">([^<]+)<\/div>|<div class="scene-title">([\s\S]*?)<\/div>/g))
  marks.push(m[1] !== undefined ? { palm: unesc(m[1]), at: m.index } : { scene: unesc(m[2].replace(/<[^>]+>/g, '')), at: m.index });

const PALMS = [];
for (const k of marks) {
  if (k.palm) PALMS.push({ title: k.palm, n: PALMS.length + 1, scenes: [] });
  else if (PALMS.length && k.scene && k.scene.length > 3) PALMS[PALMS.length - 1].scenes.push(k.scene);
}

/* ── ٣) عشوائيّةٌ ثابتةٌ: الملفُّ نفسُه في كلّ توليد، فيمكن مراجعتُه ── */
let seed = 20260907;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pickN = (pool, n, reject) => {
  const out = [];
  for (const x of shuffle(pool)) { if (reject(x) || out.includes(x)) continue; out.push(x); if (out.length === n) break; }
  return out;
};

const rows = [], seen = new Set();
function add(q, correct, wrong, why, kind) {
  if (wrong.length < 3 || seen.has(q)) return;
  seen.add(q);
  const opts = shuffle([correct, ...wrong.slice(0, 3)]);
  rows.push([q, opts, opts.indexOf(correct), why, kind]);
}

const syns = r => r.s.split(/\s*,\s*/).map(x => x.trim()).filter(Boolean);
/* في مرادفات الرواية سهواتٌ قليلة («deep k»، «snake (in Arabic)») تصلح
   شرحًا ولا تصلح خيارًا، فتُستبعَد من الاختيارات وتبقى في التفسير */
const okSyn = s => s.length >= 3 && s.length <= 26 &&
  /^[A-Za-z][A-Za-z'’-]*(?: [A-Za-z][A-Za-z'’-]+){0,2}$/.test(s) &&
  s.split(' ').every(t => t.length >= 2);
const ALL_SYNS = [...new Set(WORDS.flatMap(syns).filter(okSyn))];
const ALL_W = WORDS.map(r => r.w);
/* «Bosphorus» بين ثلاثِ كلماتٍ صغيرةِ الحرفِ الأوّل تدلّ على نفسِها،
   فالمشتّتاتُ تُؤخَذ من الشكل نفسِه: كبيرةٌ مع كبيرة، وصغيرةٌ مع صغيرة */
const isCap = w => /^[A-Z]/.test(w);
const CAP_W = ALL_W.filter(isCap), LOW_W = ALL_W.filter(w => !isCap(w));
const likeWords = w => { const p = isCap(w) ? CAP_W : LOW_W; return p.length >= 8 ? p : ALL_W; };

/* ── ٤) مفردات: المعنى ثمّ الكلمة ────────────────────────────── */
WORDS.forEach(r => {
  add((r.e ? r.e + ' ' : '') + 'أيُّ كلمةٍ من الرواية تعني: «' + r.m + '»؟',
    r.w, pickN(likeWords(r.w), 3, w => w === r.w),
    '«' + r.w + '» = ' + r.m + '. ومثالُها من الرواية: ' + r.x, 'مفردات');
});

/* ── ٥) مرادف: كلمةٌ ثمّ مرادفُها ────────────────────────────── */
WORDS.forEach(r => {
  const mine = syns(r), correct = mine.find(okSyn);
  if (!correct) return;
  const bad = new Set([...mine.map(x => x.toLowerCase()), r.w.toLowerCase()]);
  add('ما مرادفُ «' + r.w + '» كما وردت في الرواية؟',
    correct, pickN(ALL_SYNS, 3, s => bad.has(s.toLowerCase())),
    '«' + r.w + '» ومرادفاتُها: ' + mine.join('، ') + '. ومعناها: ' + r.m, 'مرادف');
});

/* ── ٦) إكمال: جملةُ المثال وقد سقطت منها الكلمة ─────────────── */
WORDS.forEach(r => {
  const re = new RegExp(r.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  if (!re.test(r.x)) return;
  add('أكمل جملةَ الرواية: ' + r.x.replace(re, '______'),
    r.w, pickN(likeWords(r.w), 3, w => w.toLowerCase() === r.w.toLowerCase()),
    'الجملةُ كاملةً: ' + r.x + ' — و«' + r.w + '» تعني: ' + r.m, 'إكمال');
});

/* ── ٧) الرواية: نخيلُها ومشاهدُها ──────────────────────────── */
const TITLES = PALMS.map(p => p.title);
PALMS.forEach(p => {
  add('ما عنوانُ النخلة ' + AR_ORD[p.n - 1] + ' من الرواية؟',
    p.title, pickN(TITLES, 3, t => t === p.title),
    'النخلةُ ' + AR_ORD[p.n - 1] + ' (Palm ' + ORD[p.n - 1] + '): ' + p.title + '.', 'الرواية');
  add('في أيّ نخلةٍ عنوانُها «' + p.title + '»؟',
    'النخلة ' + AR_ORD[p.n - 1], pickN(PALMS.filter(q => q.n !== p.n).map(q => 'النخلة ' + AR_ORD[q.n - 1]), 3, () => false),
    '«' + p.title + '» هي Palm ' + ORD[p.n - 1] + '، وفيها ' + p.scenes.length + ' مشهدًا.', 'الرواية');
  p.scenes.forEach(sc => {
    add('من أيّ نخلةٍ مشهدُ «' + sc + '»؟',
      p.title, pickN(TITLES, 3, t => t === p.title),
      'مشهدُ «' + sc + '» من النخلة ' + AR_ORD[p.n - 1] + ': ' + p.title + '.', 'الرواية');
  });
});

/* ── ٨) الكتابة ─────────────────────────────────────────────── */
const byKind = rows.reduce((m, r) => (m[r[4]] = (m[r[4]] || 0) + 1, m), {});
const header = `/* ألغازُ الرواية — مُولَّدةٌ من «Under the Palm Tree · 36 Palms».
 *
 * لا تُحرَّر بيدٍ: يُعاد توليدُها بـ
 *     node scripts/build-novel-riddles.js
 * فتتبع الروايةَ إن زِيدت فيها كلمةٌ أو نخلة. وللإضافةِ اليدويّة
 * استعملي castle-riddles-heritage.js (بنكُ التراث).
 *
 * الصيغة: [السؤال، الخيارات الأربعة، فهرسُ الصحيح، الشرح، النوع]
 * والأنواع: ${Object.entries(byKind).map(([k, v]) => k + ' ' + v).join(' · ')}
 */
export const NOVEL_RIDDLES = [
`;
fs.writeFileSync(OUT, header + rows.map(r => JSON.stringify(r)).join(',\n') + '\n];\nexport default NOVEL_RIDDLES;\n');

console.log('كلماتُ الرواية الموسومة: ' + WORDS.length + ' · نخيل: ' + PALMS.length +
  ' · مشاهد: ' + PALMS.reduce((n, p) => n + p.scenes.length, 0));
console.log('الألغاز: ' + rows.length);
Object.entries(byKind).forEach(([k, v]) => console.log('   ' + k + ': ' + v));
