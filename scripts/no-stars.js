#!/usr/bin/env node
/* لا نجمةَ خماسيّةً في الموقع — النخلةُ مكانَها.
 *
 * كُنست النجومُ مرّةً (٧١٤ منها في ١٣٩ ملفًّا)، ثمّ أضافت جلسةٌ أخرى
 * مجلّدَ treasure-games ففيه نجومٌ من جديد. فالكنسُ مرّةً لا يكفي:
 * هذا يُعاد تشغيلُه متى شئتِ، ولا يلمس ملفًّا ليس فيه نجمة.
 *
 *     node scripts/no-stars.js          # يُصلح
 *     node scripts/no-stars.js --check  # يَفحص فقط، ويفشل إن وجد
 *
 * والمحارفُ مكتوبةٌ هنا بترميزها لا بشكلها، وهذا الملفُّ يستثني نفسَه:
 * أوّلُ تشغيلٍ كتب النجومَ في جدوله فحوّلها إلى نخيلٍ، فصار الجدولُ
 * «نخلةٌ تصير نخلة» وأبلغ عن ألفٍ ومئتين وثلاثٍ وثمانين نجمةً وهمية.
 *
 * ولا يكفي البحثُ عن شكل النجمة: وجدتُ في brain-dump.html نجومًا
 * صفراءَ على الشاشة وليس في الملفّ نجمةٌ واحدة — لأنّها مكتوبةٌ
 * ‎\u2B50‎ لا ‎⭐‎. فصار الكنسُ يشمل ثلاثَ كتاباتٍ للحرف الواحد:
 * الحرفَ نفسَه، وهروبَ الجافاسكربت (ومنه الزوجُ البديلُ لِما فوق
 * ‎FFFF‎)، وكياناتِ HTML العدديّةَ والاسميّة.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'audit']);
const PALM = '\u{1F334}', SEED = '\u{1F331}';
/* الممتلئةُ تصير نخلة، والفارغةُ شتلة — فيبقى الفرقُ بين المكسوب وغيره */
const MAP = new Map([
  ['⭐', PALM], ['\u{1F31F}', PALM], ['★', PALM], ['✦', PALM],
  ['✩', PALM], ['✪', PALM], ['✯', PALM], ['⚝', PALM],
  ['✰', PALM], ['⭑', PALM],
  /* والشهابُ نجمةٌ خماسيّةٌ تجرّ ذيلًا، فيلحق بها. أمّا الدُّوارُ ‎\u{1F4AB}‎
     فدوّامةٌ لا نجمةٌ خماسيّة، وقد كنستُه مرّةً فحوّلتُ في الرواية رمزَ
     كلمتَي presence وconsequential إلى نخلةٍ — وذلك عبثٌ بنصٍّ منشور. */
  ['\u{1F320}', PALM],
  ['☆', SEED], ['⭒', SEED]
]);
/* الجردُ يعرض أسماءَ ملفّاتٍ فيها نجوم، وهذا الملفُّ يحمل الجدول — فلا يُمَسّان */
const EXEMPT = new Set(['checklist.html', 'no-stars.js',
  'novel.html', 'under-the-palm-tree-complete-book.html']);

/* نقطةُ الترميز ← بديلُها، للبحث في الكتابات المهروبة */
const CODES = new Map();
for (const [from, to] of MAP) CODES.set(from.codePointAt(0), to);

const esc = ch => [...ch].map(c => {
  const v = c.codePointAt(0);
  if (v <= 0xffff) return '\\u' + v.toString(16).toUpperCase().padStart(4, '0');
  const u = v - 0x10000;
  return '\\u' + (0xd800 + (u >> 10)).toString(16).toUpperCase() +
         '\\u' + (0xdc00 + (u & 0x3ff)).toString(16).toUpperCase();
}).join('');

/* هروبُ الجافاسكربت: زوجٌ بديلٌ أوّلًا لئلّا يُقرأ نصفُه وحدَه */
const JS_ESC = /\\u[dD][89abAB][0-9a-fA-F]{2}\\u[dD][c-fC-F][0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/g;
const ENTITY = /&#(\d{1,7});|&#[xX]([0-9a-fA-F]{1,6});|&(starf?);/g;

function sweepEscapes(text) {
  let n = 0;
  let out = text.replace(JS_ESC, m => {
    const parts = m.split('\\u').filter(Boolean).map(h => parseInt(h, 16));
    const cp = parts.length === 2 ? (parts[0] - 0xd800) * 0x400 + (parts[1] - 0xdc00) + 0x10000 : parts[0];
    const to = CODES.get(cp);
    if (!to) return m;
    n++; return esc(to);
  });
  out = out.replace(ENTITY, (m, dec, hex, name) => {
    const cp = name ? (name === 'starf' ? 0x2605 : 0x2606) : parseInt(dec || hex, dec ? 10 : 16);
    const to = CODES.get(cp);
    if (!to) return m;
    n++; return '&#' + to.codePointAt(0) + ';';
  });
  return { out, n };
}

const check = process.argv.includes('--check');
const hits = {};
let files = 0, total = 0;

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(html|js|json|md)$/.test(e.name)) continue;
    if (EXEMPT.has(e.name)) continue;
    let t;
    try { t = fs.readFileSync(p, 'utf8'); } catch { continue; }
    let out = t, n = 0;
    for (const [from, to] of MAP) {
      if (out.includes(from)) { n += out.split(from).length - 1; out = out.split(from).join(to); }
    }
    const hidden = sweepEscapes(out); out = hidden.out; n += hidden.n;
    if (!n) continue;
    hits[path.relative(ROOT, p)] = n; files++; total += n;
    if (!check) fs.writeFileSync(p, out);
  }
})(ROOT);

if (!total) { console.log('لا نجمةَ خماسيّةً في الموقع ✅'); process.exit(0); }
console.log((check ? 'وُجدت ' : 'استُبدلت ') + total + ' نجمةً في ' + files + ' ملفًّا:');
Object.entries(hits).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('   ' + n + '× ' + f));
process.exit(check ? 1 : 0);
