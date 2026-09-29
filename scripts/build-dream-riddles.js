#!/usr/bin/env node
/* ألغازُ «حلم في مدينة النخيل» — من الرواية نفسِها.
 *
 * الفرقُ بينها وبين ألغاز القلعة (build-novel-riddles.js) أنّ هذه
 * تحمل **مَنبتَها**: من أيّ نخلةٍ جاءت الجملةُ ومن أيّ مشهد. فاللاعبُ
 * لا يجيب عن سؤالٍ معلّقٍ في الفراغ، بل يقف في مشهدٍ من الرواية.
 * ولذلك أخذتُ موضعَ كلِّ كلمةٍ في الملفّ، لا الكلمةَ وحدَها.
 *
 *     node scripts/build-dream-riddles.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NOVEL = path.join(ROOT, 'public', 'story', 'novel.html');
const OUT = path.join(ROOT, 'public', 'js', 'palm-dream-riddles.js');

const html = fs.readFileSync(NOVEL, 'utf8');
const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'",
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–',
  hellip: '…', middot: '·', deg: '°', eacute: 'é', shy: '' };
const unesc = s => s.replace(/&(#?\w+);/g, (m, k) => (k in ENT ? ENT[k] : m))
  .replace(/\s+/g, ' ').trim();
const attr = (tag, k) => { const m = tag.match(new RegExp('data-' + k + '="([^"]*)"')); return m ? unesc(m[1]) : ''; };

const AR_ORD = ['الأولى','الثانية','الثالثة','الرابعة','الخامسة','السادسة','السابعة','الثامنة',
  'التاسعة','العاشرة','الحادية عشرة','الثانية عشرة','الثالثة عشرة','الرابعة عشرة','الخامسة عشرة',
  'السادسة عشرة','السابعة عشرة','الثامنة عشرة','التاسعة عشرة','العشرين','الحادية والعشرين',
  'الثانية والعشرين','الثالثة والعشرين','الرابعة والعشرين','الخامسة والعشرين','السادسة والعشرين',
  'السابعة والعشرين','الثامنة والعشرين','التاسعة والعشرين','الثلاثين','الحادية والثلاثين',
  'الثانية والثلاثين','الثالثة والثلاثين','الرابعة والثلاثين','الخامسة والثلاثين','السادسة والثلاثين'];

/* ── ١) خريطةُ الملفّ: أين تبدأ كلُّ نخلةٍ وكلُّ مشهد ───────────── */
const marks = [];
for (const m of html.matchAll(/<div class="ch-sub">([^<]+)<\/div>|<div class="scene-title">([\s\S]*?)<\/div>/g))
  marks.push(m[1] !== undefined
    ? { palm: unesc(m[1]), at: m.index }
    : { scene: unesc(m[2].replace(/<[^>]+>/g, '')), at: m.index });

const PALMS = [];
for (const k of marks) {
  if (k.palm) PALMS.push({ title: k.palm, n: PALMS.length + 1, at: k.at, scenes: [] });
  else if (PALMS.length && k.scene && k.scene.length > 3)
    PALMS[PALMS.length - 1].scenes.push({ title: k.scene, at: k.at });
}
/* موضعٌ في الملفّ ← النخلةُ والمشهدُ اللذان يحتويانه */
function whereIs(at) {
  let palm = null, scene = null;
  for (const p of PALMS) { if (p.at <= at) palm = p; else break; }
  if (palm) for (const s of palm.scenes) { if (s.at <= at) scene = s; else break; }
  return { palm, scene };
}

/* ── ٢) كلماتُ الرواية، ومعها أوّلُ موضعٍ ظهرت فيه ─────────────── */
const dict = new Map();
for (const m of html.matchAll(/<span class="vw"[^>]*>/g)) {
  const tag = m[0], w = attr(tag, 'w');
  if (!w || dict.has(w)) continue;
  dict.set(w, { w, m: attr(tag, 'm'), s: attr(tag, 's'), x: attr(tag, 'x'),
                e: attr(tag, 'e'), at: m.index });
}
const WORDS = [...dict.values()].filter(r => r.m && r.x);

/* ── ٣) عشوائيّةٌ ثابتة: الملفُّ نفسُه في كلّ توليدٍ فيمكن مراجعتُه ── */
let seed = 20260929;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pickN = (pool, n, reject) => {
  const out = [];
  for (const x of shuffle(pool)) { if (reject(x) || out.includes(x)) continue; out.push(x); if (out.length === n) break; }
  return out;
};

const syns = r => (r.s || '').split(/\s*,\s*/).map(x => x.trim()).filter(Boolean);
const okSyn = s => s.length >= 3 && s.length <= 26 &&
  /^[A-Za-z][A-Za-z'’-]*(?: [A-Za-z][A-Za-z'’-]+){0,2}$/.test(s) &&
  s.split(' ').every(t => t.length >= 2);
const ALL_SYNS = [...new Set(WORDS.flatMap(syns).filter(okSyn))];
const ALL_W = WORDS.map(r => r.w);
const isCap = w => /^[A-Z]/.test(w);
const CAP_W = ALL_W.filter(isCap), LOW_W = ALL_W.filter(w => !isCap(w));
const likeWords = w => { const p = isCap(w) ? CAP_W : LOW_W; return p.length >= 8 ? p : ALL_W; };

/* مَنبتُ اللغز، سطرًا واحدًا يُعرض فوق السؤال */
function origin(at) {
  const { palm, scene } = whereIs(at);
  if (!palm) return '';
  const p = 'النخلةُ ' + AR_ORD[palm.n - 1] + ' · ' + palm.title;
  return scene ? p + ' · ' + scene.title : p;
}

/* ── ٤) الألغاز ───────────────────────────────────────────────── */
const rows = [], seen = new Set();
/* [المنبت، السؤال، الجملة المعروضة، الخيارات، فهرس الصحيح، الشرح، النوع] */
function add(from, q, sent, correct, wrong, why, kind) {
  const key = kind + '|' + q + '|' + sent;
  if (wrong.length < 3 || seen.has(key)) return;
  seen.add(key);
  const opts = shuffle([correct, ...wrong.slice(0, 3)]);
  rows.push([from, q, sent, opts, opts.indexOf(correct), why, kind]);
}

/* (أ) إكمالٌ من جملة الرواية نفسِها — أجملُها، لأنّ النصَّ نصُّها */
WORDS.forEach(r => {
  const re = new RegExp('\\b' + r.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  if (!re.test(r.x)) return;
  add(origin(r.at), 'أكملوا سطرَ الرواية', r.x.replace(re, '______'),
    r.w, pickN(likeWords(r.w), 3, w => w.toLowerCase() === r.w.toLowerCase()),
    r.x + ' — و«' + r.w + '»: ' + r.m, 'سطر');
});

/* (ب) المعنى ← الكلمة */
WORDS.forEach(r => {
  add(origin(r.at), (r.e ? r.e + '  ' : '') + 'أيُّ كلمةٍ تعني هذا؟', r.m,
    r.w, pickN(likeWords(r.w), 3, w => w === r.w),
    '«' + r.w + '» = ' + r.m + '. ومن الرواية: ' + r.x, 'معنى');
});

/* (ج) المرادف */
WORDS.forEach(r => {
  const mine = syns(r), correct = mine.find(okSyn);
  if (!correct) return;
  const bad = new Set([...mine.map(x => x.toLowerCase()), r.w.toLowerCase()]);
  /* المشتّتاتُ على شكل الجواب: كلمةٌ مع كلمة، وعبارةٌ مع عبارة —
     وإلّا دلَّ طولُ الخيار على نفسِه قبل أن يُقرأ */
  const words = s => s.split(' ').length;
  const sameShape = ALL_SYNS.filter(s => words(s) === words(correct));
  const pool = sameShape.length >= 12 ? sameShape : ALL_SYNS;
  add(origin(r.at), 'ما أقربُ كلمةٍ إلى معناها؟', r.w,
    correct, pickN(pool, 3, s => bad.has(s.toLowerCase())),
    '«' + r.w + '» ومرادفاتُها: ' + mine.join('، ') + '. ومعناها: ' + r.m, 'مرادف');
});

/* ── ٥) الكتابة ───────────────────────────────────────────────── */
const byKind = rows.reduce((m, r) => (m[r[6]] = (m[r[6]] || 0) + 1, m), {});
const header = `/* ألغازُ «حلم في مدينة النخيل» — مُولَّدةٌ من الرواية:
 *   «Under the Palm Tree · 36 Palms» — ثريا الناعبية
 *
 * لا تُحرَّر بيدٍ: يُعاد توليدُها بـ
 *     node scripts/build-dream-riddles.js
 *
 * الصيغة: [المنبت، السؤال، السطر المعروض، الخيارات، فهرسُ الصحيح، الشرح، النوع]
 * والمنبتُ يقول من أيّ نخلةٍ ومشهدٍ جاء اللغز، فيُعرض فوق السؤال.
 * الأنواع: ${Object.entries(byKind).map(([k, v]) => k + ' ' + v).join(' · ')}
 */
export const DREAM_RIDDLES = [
`;
fs.writeFileSync(OUT, header + rows.map(r => JSON.stringify(r)).join(',\n') + '\n];\nexport default DREAM_RIDDLES;\n');

const withOrigin = rows.filter(r => r[0]).length;
console.log('كلماتٌ موسومة: ' + WORDS.length + ' · نخيل: ' + PALMS.length +
  ' · مشاهد: ' + PALMS.reduce((n, p) => n + p.scenes.length, 0));
console.log('الألغاز: ' + rows.length + ' · منها ما يعرف منبتَه: ' + withOrigin);
Object.entries(byKind).forEach(([k, v]) => console.log('   ' + k + ': ' + v));
