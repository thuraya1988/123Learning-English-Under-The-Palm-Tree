#!/usr/bin/env node
/* بنفسجيُّ القلعة يصير أخضرَ داكنًا.
 *
 * طلبتِ اللونَ الأخضرَ الداكنَ بدلَ البنفسجيّ، وهو في الصفحة عشراتُ
 * درجاتٍ لا درجةً واحدة: خلفيّاتُ الشاشات، ولوحُ الأسئلة، والأزرارُ
 * الشبحيّة، وشريطُ التحميل، وسماءُ «الليل» في المحرّك. فبدل تتبُّعها
 * بالعين، تُقلَب كلُّها هنا: ما كانت درجتُه بين ٢٣٠° و٣٢٥° على عجلة
 * الألوان يُنقَل إلى ١٥٢° — أخضرَ نخيلٍ مائلًا إلى الزُّمُرُّد — ويحتفظ
 * بعتمته وإشباعه كما هما، فلا تختلّ التباينات ولا يُقرأ النصُّ أصعب.
 *
 *     node scripts/castle-green.js --check   # يعرض ما سيتغيّر
 *     node scripts/castle-green.js           # يغيّر
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['castle-of-the-palms.html', 'public/js/castle-of-the-palms.js'];
const HUE = 152;            /* أخضرُ النخيل */
const LO = 230, HI = 325;   /* نطاقُ البنفسجيّ والنيليّ */

const rgb2hsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
};
const hsl2rgb = (h, s, l) => {
  h /= 360;
  if (!s) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = t => { t = (t + 1) % 1;
    return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255));
};
const greenify = (r, g, b) => {
  const [h, s, l] = rgb2hsl(r, g, b);
  if (h < LO || h > HI || s < .04) return null;
  return hsl2rgb(HUE, s, l);
};
const hx = n => n.toString(16).padStart(2, '0');

const check = process.argv.includes('--check');
let changed = 0;
for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log('؟ لا يوجد: ' + rel); continue; }
  const seen = new Map();
  let n = 0;
  const out = fs.readFileSync(p, 'utf8')
    .replace(/#([0-9a-fA-F]{6})\b/g, (m, h) => {
      const c = greenify(parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4), 16));
      if (!c) return m;
      const to = '#' + c.map(hx).join(''); seen.set(m, to); n++; return to;
    })
    .replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*([,)])/g, (m, r, g, b, tail) => {
      const c = greenify(+r, +g, +b);
      if (!c) return m;
      const to = m.slice(0, m.indexOf('(') + 1) + c.join(',') + tail; seen.set(m, to); n++; return to;
    })
    /* ألوانُ الثلاثيّ الأبعاد مكتوبةٌ 0x… لا #… */
    .replace(/0x([0-9a-fA-F]{6})\b/g, (m, h) => {
      const c = greenify(parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4), 16));
      if (!c) return m;
      const to = '0x' + c.map(hx).join(''); seen.set(m, to); n++; return to;
    });
  if (!n) { console.log('لا بنفسجيَّ في ' + rel); continue; }
  changed += n;
  console.log(rel + ': ' + n + ' موضعًا · ' + seen.size + ' درجةً');
  [...seen].forEach(([a, b]) => console.log('   ' + a + '  →  ' + b));
  if (!check) fs.writeFileSync(p, out);
}
console.log(check ? '\n(فحصٌ فقط — لم يُكتب شيء)' : '\nالمجموع: ' + changed);
