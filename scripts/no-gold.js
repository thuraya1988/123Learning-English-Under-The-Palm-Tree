#!/usr/bin/env node
/* لا ذهبيَّ ولا أصفرَ في الموقع — وسائرُ الألوان تُترَك كما هي.
 *
 * «الألوانُ عاديّ خلّيه، إلّا الأصفر والذهبيّ ما أحبّهم، تلغيهم.»
 * فلا يُمَسُّ أزرقُ السواحل ولا أخضرُ الوديان ولا أحمرُ الخطأ: يُنقَل
 * الذهبيُّ والأصفرُ وحدَهما إلى البيج والبنّيّ، وتبقى العتمةُ كما هي
 * فلا يخفت نصٌّ ولا تنطفئ إضاءة.
 *
 * والحدُّ إشباعٌ لا درجةٌ وحدَها: البيجُ والبنّيُّ يقعان في درجة الذهبيّ
 * نفسِها ولا يفترقان عنه إلّا بالإشباع. فلو كان الحدُّ درجةً لقلَب
 * البيجَ بيجًا إلى الأبد، ولَما صحّ الفحصُ ولا عُرف أنّ الموقعَ نظيف.
 *
 *     node scripts/no-gold.js --check    # يعرض ولا يكتب
 *     node scripts/no-gold.js            # يغيّر
 *     node scripts/no-gold.js --check castle-of-the-palms.html   # ملفٌّ بعينه
 *
 * وما لا يُمَسّ: الشعارُ وصورُه (ملفّاتُ صورٍ لا نصّ)، والرواية والكتاب
 * (تصميمُهما منشورٌ قائمٌ بذاته)، والمكتباتُ المنسوخةُ من غيرنا، وحُزَمُ
 * البناء الجاهزة — تغييرُ لونٍ فيها يعني تعديلَ شفرةٍ ليست لنا.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIR = new Set(['node_modules', '.git', 'audit', 'assets', 'games-built', 'dist', 'build']);
const SKIP_FILE = new Set([
  'novel.html', 'under-the-palm-tree-complete-book.html',   /* تصميمُ الرواية والكتاب */
  'three.r128.js', 'no-gold.js', 'castle-palette.js'        /* مكتبةٌ منسوخة، وهذا الملفّ */
]);
const EXT = /\.(html|htm|css|js|svg)$/i;
const MAX = 900 * 1024;    /* أكبرُ من هذا حزمةٌ مبنيّةٌ لا صفحةٌ نكتبها */

/* المدى الممنوع ← الوجهةُ المعتمَدة.
   مداران لا مدًى واحد: الأصفرُ الصريح (٤٠°–٧٥°) يكفي فيه إشباعٌ يسير،
   أمّا الذهبيُّ (٢٥°–٤٠°) فيجاوره رملُ الصحراء وبنّيُّ الجذوع وبيجُ
   الورق — وكلُّها مقبولةٌ — فلا يُؤخَذ منه إلّا المشبَع. */
const RULES = [
  { lo: 40, hi: 75, minS: .30, hue: 32, sat: .30 },   /* أصفرُ صريح  */
  { lo: 25, hi: 40, minS: .55, hue: 32, sat: .30 }    /* ذهبيٌّ مشبَع */
];
const MILKY = .90;   /* الأبيضُ الحليبيُّ ليس أصفر، فلا يُمَسّ      */
const PALE = .78;    /* وما فوقها ورقٌ وقشدة، فيُشدَّد فيها الشرط  */

const rgb2hsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
};
const hsl2rgb = (h, s, l) => {
  h = ((h % 360) + 360) % 360 / 360;
  if (!s) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = t => { t = (t + 1) % 1;
    return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255));
};
const fix = (r, g, b) => {
  const [h, s, l] = rgb2hsl(r, g, b);
  if (l > MILKY) return null;
  /* اللونُ الفاتحُ يبدو قشدةً لا صفرةً وإن كان في درجة الصفرة، فلا
     يُؤخَذ منه إلّا شديدُ الإشباع — وإلّا شحبت أوراقُ الصفحات كلُّها */
  const rule = RULES.find(x => h >= x.lo && h < x.hi && s > x.minS * (l > PALE ? 1.8 : 1));
  if (!rule) return null;
  /* الفاتحُ يصير بيجًا شاحبًا، والداكنُ بنّيًّا، وبينهما البيج */
  return hsl2rgb(rule.hue, Math.min(s, rule.sat * (l > .82 ? .7 : 1)), l);
};
const hx = n => n.toString(16).padStart(2, '0');
const short = h => (h[0] === h[1] && h[2] === h[3] && h[4] === h[5]) ? h[0] + h[2] + h[4] : h;

function sweep(text, isJs) {
  const seen = new Map();
  let n = 0;
  const conv = (m, hex, pre, keepShort) => {
    const full = hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex;
    const c = fix(parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4), 16));
    if (!c) return m;
    let out = c.map(hx).join('');
    if (keepShort) out = short(out);
    const to = pre + out;
    seen.set(m, to); n++; return to;
  };
  let t = text
    .replace(/#([0-9a-fA-F]{6})\b/g, (m, h) => conv(m, h, '#', false))
    .replace(/#([0-9a-fA-F]{3})\b(?![0-9a-fA-F])/g, (m, h) => conv(m, h, '#', true))
    .replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*([,)])/g, (m, r, g, b, tail) => {
      const c = fix(+r, +g, +b);
      if (!c) return m;
      const to = m.slice(0, m.indexOf('(') + 1) + c.join(',') + tail;
      seen.set(m, to); n++; return to;
    });
  /* ‎0xRRGGBB‎ لغةُ ألوان three.js — وفي غير الجافاسكربت قد يكون نصًّا عابرًا */
  if (isJs) t = t.replace(/0x([0-9a-fA-F]{6})\b/g, (m, h) => conv(m, h, '0x', false));
  return { text: t, n, seen };
}

const args = process.argv.slice(2);
const check = args.includes('--check');
const only = args.filter(a => !a.startsWith('--'));

const files = [];
if (only.length) only.forEach(f => files.push(path.resolve(ROOT, f)));
else (function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP_DIR.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!EXT.test(e.name) || SKIP_FILE.has(e.name)) continue;
    try { if (fs.statSync(p).size > MAX) continue; } catch { continue; }
    files.push(p);
  }
})(ROOT);

const hits = [];
const shades = new Map();
let total = 0;
for (const p of files) {
  let src; try { src = fs.readFileSync(p, 'utf8'); } catch { continue; }
  const r = sweep(src, /\.js$/i.test(p));
  if (!r.n) continue;
  total += r.n;
  hits.push([path.relative(ROOT, p), r.n]);
  r.seen.forEach((to, from) => shades.set(from, to));
  if (!check) fs.writeFileSync(p, r.text);
}

if (!total) { console.log('لا ذهبيَّ ولا أصفرَ في الموقع ✅  (فُحص ' + files.length + ' ملفًّا)'); process.exit(0); }
console.log((check ? 'وُجد ' : 'استُبدل ') + total + ' موضعًا في ' + hits.length +
            ' ملفًّا من ' + files.length + ' · ' + shades.size + ' درجةً');
hits.sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([f, n]) => console.log('   ' + n + '× ' + f));
if (hits.length > 30) console.log('   … و' + (hits.length - 30) + ' ملفًّا آخر');
console.log('\nالدرجات:');
[...shades].slice(0, 40).forEach(([a, b]) => console.log('   ' + a + '  →  ' + b));
if (shades.size > 40) console.log('   … و' + (shades.size - 40) + ' درجةً أخرى');
process.exit(check ? 1 : 0);
