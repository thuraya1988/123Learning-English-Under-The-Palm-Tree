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
  ['☆', SEED], ['⭒', SEED]
]);
/* الجردُ يعرض أسماءَ ملفّاتٍ فيها نجوم، وهذا الملفُّ يحمل الجدول — فلا يُمَسّان */
const EXEMPT = new Set(['checklist.html', 'no-stars.js']);

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
    if (!n) continue;
    hits[path.relative(ROOT, p)] = n; files++; total += n;
    if (!check) fs.writeFileSync(p, out);
  }
})(ROOT);

if (!total) { console.log('لا نجمةَ خماسيّةً في الموقع ✅'); process.exit(0); }
console.log((check ? 'وُجدت ' : 'استُبدلت ') + total + ' نجمةً في ' + files + ' ملفًّا:');
Object.entries(hits).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('   ' + n + '× ' + f));
process.exit(check ? 1 : 0);
