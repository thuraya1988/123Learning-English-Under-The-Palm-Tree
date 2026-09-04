#!/usr/bin/env node
/* Collect every line Miss Thuraya can say, so the voice covers whole answers
 * and not just the dictionary.
 *
 * The tutor's answers are built from data that already lives in classic.html —
 * the vocabulary, the grammar explainers, the exercise banks, the writing
 * models, the irregular verb table. This reads those structures straight out
 * of the page (no second copy to keep in sync), flattens them to individual
 * lines, tags each line English or Arabic by which script dominates, and
 * writes audio/lines.json for scripts/build-voice.py to render.
 *
 *     node scripts/extract-lines.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const PAGE = path.join(ROOT, 'miss-thuraya', 'classic.html');
const OUT = path.join(ROOT, 'audio', 'lines.json');

const html = fs.readFileSync(PAGE, 'utf8');

/* Pull one top-level declaration out of the page and evaluate it. */
function grab(decl, endMarker) {
  const a = html.indexOf(decl);
  if (a < 0) throw new Error('not found: ' + decl);
  const b = html.indexOf(endMarker, a);
  if (b < 0) throw new Error('end not found for: ' + decl);
  const name = decl.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)/)[1];
  return new Function(html.slice(a, b) + '; return ' + name + ';')();
}

const VOCAB = grab('const VOCAB = {', '/* فهرسة القاموس */');
const G = grab('const G = {', '/* ---------- ٤) الواجهة ---------- */');
const EXTRA = (() => {
  // The Unit 1 explainers are added later with Object.assign(G,{...}).
  const a = html.indexOf('Object.assign(G,{');
  if (a < 0) return {};
  const b = html.indexOf('});', a) + 3;
  const src = html.slice(a, b).replace('Object.assign(G,', 'const __X = ').replace(/\);$/, ';');
  return new Function(src + ' return __X;')();
})();
const UNITS = grab('const UNITS = [', 'const WRITING');
const WRITING = grab('const WRITING = {', '/* ---------- ٢) محرّكات القواعد ---------- */');
const IRREGULAR = grab('const IRREGULAR = {', 'const PARTICIPLE');
const PARTICIPLE = grab('const PARTICIPLE = {', 'const IRREG_ADJ');
const QBANK = grab('const QBANK=[', 'function startQuiz');
const EX = (() => {
  const a = html.indexOf('const EX={');
  const b = html.indexOf('let ex=null;', a);
  // `solve` closes over the conjugation engines, but a closure is only a
  // reference until it is called — and we never call it — so the block
  // evaluates as written.
  return new Function(html.slice(a, b) + ' return EX;')();
})();

const seen = new Map();
const strip = s => String(s)
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

const AR = /[؀-ۿ]/g;
const EN = /[A-Za-z]/g;
const AR_ONE = /[؀-ۿ]/;
const EN_ONE = /[A-Za-z]/;

/* Split a line at every switch between Arabic and Latin letters. Neutral
 * characters — digits, arrows, brackets, spaces — stay with the run they
 * follow.
 *
 * The tutor writes bilingually: «مثال الكتاب: Zaid is kinder than Qais.»
 * Classifying that whole line by its majority script handed it to one voice,
 * which then had to pronounce the other language — Kareem reading English and
 * Cori reading Arabic. That is the garble. Measured on the real content: 83
 * of 884 lines were mixed. So each language's share becomes its own clip.
 */
function runs(t) {
  const out = [];
  let cur = '', lang = null;
  for (const ch of t) {
    const l = AR_ONE.test(ch) ? 'ar' : (EN_ONE.test(ch) ? 'en' : null);
    if (l && lang && l !== lang) { out.push({ lang, text: cur }); cur = ''; }
    if (l) lang = l;
    cur += ch;
  }
  if (cur.trim() && lang) out.push({ lang, text: cur });
  return out;
}

function keep(t, lang) {
  const t2 = t.replace(/^[\s،.:()«»\[\]{}·—–\-→+|]+|[\s،:()«»\[\]{}·—–\-→+|]+$/g, '').trim();
  if (!t2) return null;
  const ar = (t2.match(AR) || []).length;
  const en = (t2.match(EN) || []).length;
  // A run must be wholly in its own script. Anything left over from the other
  // one — a stray "y" inside an Arabic spelling note — would be mispronounced,
  // so that run is simply not given a voice.
  if (lang === 'ar' && en) return null;
  if (lang === 'en' && ar) return null;
  if ((lang === 'ar' ? ar : en) < 2) return null;
  return t2;
}

function add(raw) {
  const line = strip(raw);
  if (!line) return;
  for (const r of runs(line)) {
    const t = keep(r.text, r.lang);
    if (!t || seen.has(t)) continue;
    const id = crypto.createHash('sha1').update(t).digest('hex').slice(0, 10);
    seen.set(t, { id: r.lang[0] + '-' + id, text: t, lang: r.lang });
  }
}

/* every line of a multi-line block */
const addLines = s => String(s).split(/\n+/).forEach(add);

for (const u in VOCAB) for (const cat in VOCAB[u]) VOCAB[u][cat].forEach(row => {
  const p = row.split('|');
  add(p[0]); add(p[3]); add(p[2]); add(p[4]);
});

for (const g of [G, EXTRA]) for (const k in g) { add(g[k].title); addLines(g[k].body); }

UNITS.forEach(u => {
  add(u.name); add(u.ar);
  for (const k in u.vocab) { add(k); u.vocab[k].forEach(add); }
});

for (const k in WRITING) {
  const w = WRITING[k];
  add(w.t); add(w.ar); (w.q || []).forEach(add); addLines(w.model);
}

Object.keys(IRREGULAR).forEach(v => add(v + ' — ' + IRREGULAR[v] + ' — ' + PARTICIPLE[v]));

QBANK.forEach(q => { add(q.q); add(q.a); add(q.hint); });

for (const k in EX) { add(EX[k].t); (EX[k].items || []).forEach(it => { add(it[0]); add(it[1]); }); }

const rows = [...seen.values()];
const byLang = rows.reduce((m, r) => (m[r.lang] = (m[r.lang] || 0) + 1, m), {});
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(rows, null, 1));
console.log('lines:', rows.length, JSON.stringify(byLang));
