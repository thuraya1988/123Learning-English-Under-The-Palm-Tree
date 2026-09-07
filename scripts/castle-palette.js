#!/usr/bin/env node
/* لوحةُ الألوان المعتمَدة — ولا ذهبيَّ ولا أصفر.
 *
 * المعتمَد: أخضرُ داكن، عنّابيٌّ داكن، بيجٌ وتدرّجاتُ البنّيّ والحليبيّ،
 * بنّيٌّ داكن. والممنوعُ: الذهبيُّ والأصفر.
 *
 * والذهبيُّ كان لونَ القلعة كلَّها: النصوصُ والحدودُ والأزرارُ والعناوين
 * وأضواءُ الفوانيس وحوافُّ الجدران في الثلاثيّ الأبعاد — مئاتُ المواضع.
 * فبدل تتبُّعها بالعين تُقلَب هنا: ما كانت درجتُه بين ٣٠° و٧٥° على عجلة
 * الألوان — وهو مدى الأصفر والذهبيّ — يُنقَل إلى ٣٢° (بيجٌ مائلٌ إلى
 * البنّيّ) ويُخفَّض إشباعُه إلى الرُّبع فأقلّ، فيصير بيجًا أو بنّيًّا
 * بحسب عتمته. والعتمةُ تبقى كما هي فلا يخفت نصٌّ ولا تنطفئ إضاءة.
 *
 * والبرتقاليُّ الصارخُ (٥°–٣٠°) يُنقَل إلى العنّابيّ الداكن.
 *
 *     node scripts/castle-palette.js --check   # يعرض ولا يكتب
 *     node scripts/castle-palette.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['castle-of-the-palms.html', 'public/js/castle-of-the-palms.js', 'public/js/palm-home.js'];

/* المدى الممنوع ← الوجهةُ المعتمَدة.
   والحدُّ إشباعٌ لا درجةٌ وحدَها: البيجُ والبنّيُّ يقعان في درجة الذهبيّ
   نفسِها ولا يفترقان عنه إلّا بالإشباع، فلو كان الحدُّ درجةً لقلَب
   البيجَ بيجًا إلى الأبد ولَما صحّ الفحصُ ولا عُرف أنّ الصفحة نظيفة. */
const RULES = [
  { lo: 25, hi: 75, minS: .34, hue: 32, sat: .30 },   /* ذهبيٌّ وأصفر ← بيجٌ وبنّيّ */
  { lo: 8, hi: 25, minS: .55, hue: 348, sat: .34 }    /* برتقاليٌّ صارخ ← عنّابيّ   */
];

const rgb2hsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
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
  const rule = RULES.find(x => h >= x.lo && h < x.hi && s > x.minS);
  if (!rule) return null;
  /* الفاتحُ جدًّا يصير حليبيًّا، والداكنُ بنّيًّا، وبينهما البيج */
  return hsl2rgb(rule.hue, Math.min(s, rule.sat * (l > .88 ? .5 : 1)), l);
};
const hx = n => n.toString(16).padStart(2, '0');

const check = process.argv.includes('--check');
let total = 0;
for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log('؟ لا يوجد: ' + rel); continue; }
  const seen = new Map();
  let n = 0;
  const conv = (m, hex, pre) => {
    const c = fix(parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4), 16));
    if (!c) return m;
    const to = pre + c.map(hx).join(''); seen.set(m, to); n++; return to;
  };
  const out = fs.readFileSync(p, 'utf8')
    .replace(/#([0-9a-fA-F]{6})\b/g, (m, h) => conv(m, h, '#'))
    .replace(/0x([0-9a-fA-F]{6})\b/g, (m, h) => conv(m, h, '0x'))
    .replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*([,)])/g, (m, r, g, b, tail) => {
      const c = fix(+r, +g, +b);
      if (!c) return m;
      const to = m.slice(0, m.indexOf('(') + 1) + c.join(',') + tail; seen.set(m, to); n++; return to;
    });
  if (!n) { console.log('لا ذهبيَّ ولا أصفرَ في ' + rel + ' ✅'); continue; }
  total += n;
  console.log('\n' + rel + ': ' + n + ' موضعًا · ' + seen.size + ' درجةً');
  [...seen].forEach(([a, b]) => console.log('   ' + a + '  →  ' + b));
  if (!check) fs.writeFileSync(p, out);
}
console.log(check ? '\n(فحصٌ فقط — لم يُكتب شيء)' : '\nالمجموع: ' + total);
