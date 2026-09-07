#!/usr/bin/env node
/* يولّد ألغازَ الإنجليزيّة لقصر النخيل من منهج الصفّ الخامس نفسِه.
 *
 * كانت ألغازُ القصر كلُّها من نوعٍ واحد: سؤالٌ عن التراث بأربعة خيارات.
 * ثلاثون منها في الطابق تُشبه بعضها، والموقعُ موقعُ تعليمِ إنجليزيّة لا
 * متحفَ تاريخ. فتُولَّد هنا خمسةُ أنواعٍ أخرى من كلمات الكتاب وقواعده
 * وأفعاله الشاذّة — والمشتّتاتُ تُختار من القائمة نفسِها ليكون الخطأ
 * محتملًا لا سخيفًا.
 *
 *   node scripts/build-castle-riddles.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGE = path.join(ROOT, 'miss-thuraya', 'classic.html');
const OUT = path.join(ROOT, 'public', 'js', 'qasr-riddles-english.js');

const html = fs.readFileSync(PAGE, 'utf8');
function grab(decl, end) {
  const a = html.indexOf(decl), b = html.indexOf(end, a);
  const name = decl.match(/(?:const)\s+([A-Za-z_$][\w$]*)/)[1];
  return new Function(html.slice(a, b) + '; return ' + name + ';')();
}
const VOCAB = grab('const VOCAB = {', '/* فهرسة القاموس */');
const IRREGULAR = grab('const IRREGULAR = {', 'const PARTICIPLE');
const PARTICIPLE = grab('const PARTICIPLE = {', 'const IRREG_ADJ');

const words = [];
for (const u in VOCAB) for (const cat in VOCAB[u]) VOCAB[u][cat].forEach(row => {
  const p = row.split('|');
  words.push({ w: p[0], em: p[1], ar: p[2], ex: p[3], exar: p[4], unit: +u, cat });
});

/* ترتيبٌ ثابتٌ لا يتغيّر بين التوليدات، فيبقى الملفُّ قابلًا للمراجعة */
let seed = 20260907;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const pick = a => a[Math.floor(rnd() * a.length)];
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/* المشتّتات من الحقل نفسِه: ثلاثُ كلماتٍ غيرِها، ويُفضَّل من قائمتها */
function distractors(all, correct, n, key) {
  const same = all.filter(x => x[key] !== correct && x.cat === all.find(y => y[key] === correct)?.cat);
  const rest = all.filter(x => x[key] !== correct);
  const pool = shuffle(same.length >= n ? same : rest);
  const out = [];
  for (const x of pool) { if (!out.includes(x[key]) && x[key] !== correct) out.push(x[key]); if (out.length === n) break; }
  return out;
}
const rows = [];
function add(q, correct, wrong, why, kind) {
  const opts = shuffle([correct, ...wrong]);
  rows.push([q, opts, opts.indexOf(correct), why, kind]);
}

/* ١) معنى الكلمة */
words.forEach(w => {
  const wrong = distractors(words, w.ar, 3, 'ar');
  if (wrong.length < 3) return;
  add(w.em + ' ما معنى «' + w.w + '»؟', w.ar, wrong,
      '«' + w.w + '» تعني ' + w.ar + '. مثال: ' + w.ex, 'مفردات');
});

/* ٢) الكلمة الإنجليزية من المعنى العربيّ */
words.forEach(w => {
  const wrong = distractors(words, w.w, 3, 'w');
  if (wrong.length < 3) return;
  add('كيف نقول «' + w.ar + '» بالإنجليزيّة؟', w.w, wrong,
      w.ar + ' = ' + w.w + '. مثال: ' + w.ex, 'مفردات');
});

/* ٣) الكلمة الناقصة في جملة الكتاب */
words.forEach(w => {
  if (!w.ex || !w.ex.toLowerCase().includes(w.w.toLowerCase())) return;
  const gap = w.ex.replace(new RegExp(w.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '_____');
  const wrong = distractors(words, w.w, 3, 'w');
  if (wrong.length < 3) return;
  add('أكمل جملة الكتاب: ' + gap, w.w, wrong,
      'الجملة كاملةً: ' + w.ex + ' — ' + w.exar, 'إكمال');
});

/* ٤) الوحدة التي منها الكلمة */
const unitName = { 1: 'الوحدة الأولى — Talent show', 2: 'الوحدة الثانية', 3: 'الوحدة الثالثة', 4: 'الوحدة الرابعة' };
words.filter((_, i) => i % 3 === 0).forEach(w => {
  const u = unitName[w.unit]; if (!u) return;
  const wrong = Object.values(unitName).filter(x => x !== u).slice(0, 3);
  if (wrong.length < 3) return;
  add('من أيّ وحدةٍ كلمةُ «' + w.w + '» (' + w.ar + ')؟', u, wrong,
      '«' + w.w + '» من ' + u + '، قائمة «' + w.cat + '».', 'الكتاب');
});

/* ٥) الماضي البسيط للأفعال الشاذّة */
Object.keys(IRREGULAR).forEach(v => {
  const correct = IRREGULAR[v];
  const wrong = shuffle(Object.keys(IRREGULAR).filter(x => x !== v).map(x => IRREGULAR[x]))
    .filter((x, i, a) => a.indexOf(x) === i && x !== correct).slice(0, 3);
  if (wrong.length < 3) return;
  add('ما ماضي الفعل «' + v + '»؟', correct, wrong,
      v + ' → ' + correct + ' → ' + (PARTICIPLE[v] || correct) + '. فعلٌ شاذّ من صفحة ٧٤.', 'تصريف');
});

/* ٦) التصريف الثالث */
Object.keys(PARTICIPLE).filter((_, i) => i % 2 === 0).forEach(v => {
  const correct = PARTICIPLE[v]; if (!correct) return;
  const wrong = shuffle(Object.keys(PARTICIPLE).filter(x => x !== v).map(x => PARTICIPLE[x]))
    .filter((x, i, a) => x && a.indexOf(x) === i && x !== correct).slice(0, 3);
  if (wrong.length < 3) return;
  add('ما التصريف الثالث للفعل «' + v + '»؟', correct, wrong,
      v + ' → ' + IRREGULAR[v] + ' → ' + correct + '.', 'تصريف');
});

const header = `/* ألغازُ الإنجليزيّة — مُولَّدةٌ من منهج الصفّ الخامس (5A).
 *
 * لا تُحرَّر بيدٍ: يُعاد توليدُها بـ
 *     node scripts/build-castle-riddles.js
 * فتتبع الكتابَ إذا تغيّرت كلماتُه. وللإضافةِ اليدويّة استعملي
 * qasr-riddles.js.
 *
 * الصيغة: [السؤال، الخيارات الأربعة، فهرسُ الصحيح، الشرح، النوع]
 */
export const ENGLISH_RIDDLES = [
`;
const body = rows.map(r => JSON.stringify(r)).join(',\n') + '\n];\nexport default ENGLISH_RIDDLES;\n';
fs.writeFileSync(OUT, header + body);

const byKind = rows.reduce((m, r) => (m[r[4]] = (m[r[4]] || 0) + 1, m), {});
console.log('ألغازُ الإنجليزيّة:', rows.length);
Object.entries(byKind).forEach(([k, v]) => console.log('   ' + k + ': ' + v));
