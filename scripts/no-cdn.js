#!/usr/bin/env node
/* لا شيءَ يُجلَب من الإنترنت — كلُّ الخطوط والمكتبات من المستودع.
 *
 * شبكاتُ المدارس تحجب fonts.googleapis و jsdelivr و cdnjs. وورقةُ
 * الأنماط حاجبةٌ للعرض: المتصفّحُ لا يرسم الصفحةَ حتى تصل أو تنقطع.
 * فإن كان الحجبُ بطيئًا — لا رفضًا سريعًا — بقيت الصفحةُ بيضاءَ أو
 * جامدةً، والضغطُ على «ابدأ» لا يُحدث شيئًا في نظر الطفل. وهذا وحدَه
 * يفسّر شكاوى كثيرةً من «شاشةٌ سوداء» و«أضغط ابدأ وما يفتح».
 *
 *     node scripts/no-cdn.js --check   # يعرض ولا يكتب
 *     node scripts/no-cdn.js           # يستبدل
 *
 * والخطوطُ الموجودةُ عندنا ثلاثة، فتُسنَد إليها العائلاتُ المطلوبةُ
 * بأقربِها شبهًا: العربيّةُ إلى أميري وعريف رقعة، واللاتينيّةُ إلى
 * جارامون. والأسماءُ تبقى كما هي في CSS الصفحات فلا يتغيّر سطرٌ فيها.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIR = new Set(['node_modules', '.git', 'audit', 'games-built', 'dist', 'build', 'vendor']);
const SKIP_FILE = new Set(['novel.html', 'under-the-palm-tree-complete-book.html']);

/* الخطوطُ في المستودع */
const F = {
  amiri: 'assets/book/fonts/Amiri-Regular.ttf',
  amiriB: 'assets/book/fonts/Amiri-Bold.ttf',
  ruqaa: 'assets/book/fonts/ArefRuqaa-Regular.ttf',
  ruqaaB: 'assets/book/fonts/ArefRuqaa-Bold.ttf',
  garamond: 'assets/book/fonts/EBGaramond-Variable.ttf'
};
/* العائلةُ المطلوبة ← أقربُ ما عندنا، و«لا شيء» إن لم يكن لها شبيه.
   ولا تُفرَض جارامون على خطوط الواجهة اللاتينيّة (Nunito وInter
   وأمثالِها): تركُها بلا تعريفٍ يُنزلها إلى خطّ النظام، وهو أقربُ
   إليها من رقعةٍ عربيّةٍ أو سيريفٍ قديم. */
const PICK = fam => {
  const f = fam.toLowerCase();
  if (/ruqaa|lalezar|reem\s*kufi|scheherazade/.test(f)) return [F.ruqaa, F.ruqaaB];
  if (/amiri|cairo|almarai|tajawal|noto|naskh|readex|ibm|baloo|markazi|changa|rubik|harmattan|mada/.test(f))
    return [F.amiri, F.amiriB];
  if (/garamond|cinzel|lora|ovo|playfair|zilla|slab|serif|crimson|merriweather/.test(f))
    return [F.garamond, F.garamond];
  return null;                          /* خطُّ واجهةٍ لاتينيّ: خطُّ النظام */
};

/* المكتباتُ المنسوخة */
const LIBS = [
  { re: /https?:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three(\.min)?\.js/g, to: 'vendor/three-r128/three.min.js' },
  { re: /https?:\/\/cdn\.jsdelivr\.net\/npm\/three@0?\.?128[^"']*three\.min\.js/g, to: 'vendor/three-r128/three.min.js' },
  { re: /https?:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/[\d.]+\/gsap(\.min)?\.js/g, to: 'vendor/gsap.min.js' }
];

/* وسمُ ورقةِ خطٍّ من الشبكة، بأيّ ترتيبٍ للسمات */
const FONT_LINK = /<link\b[^>]*href=["'](https?:)?\/\/(fonts\.googleapis\.com|cdn\.jsdelivr\.net\/(npm\/@fontsource|fontsource))[^"']*["'][^>]*>\s*/gi;
const PRECONNECT = /<link\b[^>]*(?:rel=["'](?:preconnect|dns-prefetch)["'][^>]*href=["'][^"']*(?:gstatic|googleapis|jsdelivr|cdnjs)[^"']*["']|href=["'][^"']*(?:gstatic|googleapis|jsdelivr|cdnjs)[^"']*["'][^>]*rel=["'](?:preconnect|dns-prefetch)["'])[^>]*>\s*/gi;

/* أسماءُ العائلات المطلوبة في الروابط المحذوفة */
function familiesIn(html) {
  const out = new Set();
  for (const m of html.matchAll(/family=([^&"'>]+)/g))
    m[1].split('|').forEach(x => out.add(decodeURIComponent(x.split(':')[0]).replace(/\+/g, ' ').trim()));
  for (const m of html.matchAll(/fontsource(?:\/css)?\/(?:npm\/@fontsource\/)?([a-z0-9-]+)/gi))
    out.add(m[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  for (const m of html.matchAll(/@fontsource\/([a-z0-9-]+)/gi))
    out.add(m[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  ['Css','Latest','','Fonts','Npm','Arabic','Index'].forEach(x => out.delete(x));
  return [...out];
}

const check = process.argv.includes('--check');
const only = process.argv.slice(2).filter(a => !a.startsWith('--'));

const files = [];
if (only.length) only.forEach(f => files.push(path.resolve(ROOT, f)));
else (function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP_DIR.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.html?$/i.test(e.name) || SKIP_FILE.has(e.name)) continue;
    files.push(p);
  }
})(ROOT);

let touched = 0, links = 0, libs = 0;
const famSeen = new Map();
for (const p of files) {
  let src; try { src = fs.readFileSync(p, 'utf8'); } catch { continue; }
  if (!/fonts\.googleapis|fontsource|cdnjs\.cloudflare|jsdelivr/.test(src)) continue;
  /* عمقُ الملفّ يحدّد بادئةَ المسار */
  const up = '../'.repeat(path.relative(ROOT, path.dirname(p)).split(path.sep).filter(Boolean).length);
  let out = src, n = 0;

  const fams = familiesIn(out);
  const hadLink = FONT_LINK.test(out); FONT_LINK.lastIndex = 0;
  out = out.replace(FONT_LINK, () => { n++; links++; return ''; });
  out = out.replace(PRECONNECT, () => { n++; return ''; });

  /* و‎@import‎ أشدُّ حجبًا للعرض من الوسم: المتصفّحُ لا يكتشفه إلّا بعد
     أن يقرأ ورقةَ الأنماط، ثمّ ينتظر. فيُستبدَل بتعريفاتٍ محلّيّة. */
  let hadImport = false;
  out = out.replace(/@import\s+url\(\s*["']?(https?:)?\/\/(?:fonts\.googleapis\.com|cdn\.jsdelivr\.net)[^)]*\)\s*;?\s*/gi,
    m => { hadImport = true; n++; links++;
      return familiesIn(m).map(fam => { const k = PICK(fam); if (!k) return '';
        return `@font-face{font-family:'${fam}';src:url('${up}${k[0]}') format('truetype');font-weight:400;font-display:swap}` +
               `@font-face{font-family:'${fam}';src:url('${up}${k[1]}') format('truetype');font-weight:700;font-display:swap}`;
      }).join('\n') + '\n';
    });

  if (hadLink && !hadImport && fams.length) {
    const faces = fams.map(fam => {
      const pick = PICK(fam);
      famSeen.set(fam, (famSeen.get(fam) || 0) + 1);
      if (!pick) return null;
      const [reg, bold] = pick;
      return `@font-face{font-family:'${fam}';src:url('${up}${reg}') format('truetype');font-weight:400;font-display:swap}\n` +
             `@font-face{font-family:'${fam}';src:url('${up}${bold}') format('truetype');font-weight:700;font-display:swap}`;
    }).filter(Boolean).join('\n');
    const block = '<!-- الخطوطُ من المستودع لا من الشبكة: ورقةُ الأنماط حاجبةٌ للعرض،\n' +
                  '     فإن حُجب النطاقُ حجبًا بطيئًا بقيت الصفحةُ بيضاءَ ولم يعمل زرٌّ. -->\n' +
                  '<style>\n' + faces + '\n</style>\n';
    if (faces) out = /<\/head>/i.test(out) ? out.replace(/<\/head>/i, block + '</head>') : block + out;
  }
  for (const L of LIBS) out = out.replace(L.re, () => { n++; libs++; return up + L.to; });

  /* وبعضُ الصفحات لا تربط ورقةً بل تكتب ‎@font-face‎ بيدها ومصدرُها من
     الشبكة، فلا يلتقطها بحثُ الوسوم. فيُبدَّل المصدرُ في مكانه. */
  out = out.replace(/url\(\s*(["']?)(https?:)?\/\/(?:cdn\.jsdelivr\.net|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)\/[^)"']*\1\s*\)/gi,
    m => {
      const arabic = /arabic|cairo|amiri|almarai|tajawal|naskh|ruqaa/i.test(m);
      n++; links++;
      return "url('" + up + (arabic ? F.amiri : F.garamond) + "') format('truetype')";
    });

  if (!n) continue;
  touched++;
  if (!check) fs.writeFileSync(p, out);
}

console.log((check ? 'سيُغيَّر ' : 'غُيِّر ') + touched + ' ملفًّا من ' + files.length +
            ' · ورقاتُ خطوطٍ أُزيلت: ' + links + ' · مكتباتٌ نُقلت: ' + libs);
if (famSeen.size) {
  console.log('\nالعائلاتُ التي أُسنِدت إلى خطوط المستودع:');
  [...famSeen].sort((a, b) => b[1] - a[1]).forEach(([f, c]) =>
    console.log('   ' + String(c).padStart(3) + '× ' + f + '  →  ' +
      (PICK(f) ? path.basename(PICK(f)[0]) : 'خطُّ النظام')));
}
process.exit(check && touched ? 1 : 0);
