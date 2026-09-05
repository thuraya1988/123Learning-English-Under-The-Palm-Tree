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
// Runs of spaces are kept. The page aligns some lines into columns —
// «I  + am  + verb-ing» — and the player matches clip text against the screen
// character for character, so collapsing them here left those lines mute.
const strip = s => String(s)
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/[\t\r\n]+/g, ' ')
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

function keep(t, lang, fromSplit) {
  const t2 = t.replace(/^[\s،.:()«»\[\]{}·—–\-→+|]+|[\s،:()«»\[\]{}·—–\-→+|]+$/g, '').trim();
  if (!t2) return null;
  const ar = (t2.match(AR) || []).length;
  const en = (t2.match(EN) || []).length;
  // A run must be wholly in its own script. Anything left over from the other
  // one — a stray "y" inside an Arabic spelling note — would be mispronounced,
  // so that run is simply not given a voice.
  if (lang === 'ar' && en) return null;
  if (lang === 'en' && ar) return null;
  const letters = lang === 'ar' ? ar : en;
  if (letters < 2) return null;

  // A whole line that happens to be one word — a vocabulary entry like "shy"
  // — is worth speaking. A shred left over from splitting a bilingual line is
  // not: reading «at», «ing», «be», «و» aloud one after another is the
  // chopped, letter-by-letter noise Thuraya reported. So anything born of a
  // split has to stand on its own as a phrase.
  if (fromSplit && (letters < 8 || t2.split(/\s+/).length < 2)) return null;
  return t2;
}

/* kind: 'word' for a dictionary entry, 'line' for a line of prose.
 * A one-word clip is worth speaking when it IS the vocabulary item — the card
 * shows «count — يَعُدّ» and the student wants to hear "count". The same clip
 * heard inside a paragraph is a shred. The player needs to tell them apart,
 * so the difference is recorded here rather than guessed at from length. */
function add(raw, kind) {
  const line = strip(raw);
  if (!line) return;
  const rs = runs(line);
  const split = rs.length > 1;
  for (const r of rs) {
    const t = keep(r.text, r.lang, split);
    if (!t) continue;
    if (seen.has(t)) { if (kind === 'word') seen.get(t).kind = 'word'; continue; }
    const id = crypto.createHash('sha1').update(t).digest('hex').slice(0, 10);
    seen.set(t, { id: r.lang[0] + '-' + id, text: t, lang: r.lang, kind: kind || 'line' });
  }
}
const addWord = raw => add(raw, 'word');

/* every line of a multi-line block */
const addLines = s => String(s).split(/\n+/).forEach(x => add(x));

for (const u in VOCAB) for (const cat in VOCAB[u]) {
  // The category name is printed in every word card's footer — «قائمة
  // «المواهب والأفعال»» — so it needs a clip or the card ends mid-sentence.
  add(cat);
  VOCAB[u][cat].forEach(row => {
    const p = row.split('|');
    addWord(p[0]); add(p[3]); addWord(p[2]); add(p[4]);
  });
}

for (const g of [G, EXTRA]) for (const k in g) { add(g[k].title); addLines(g[k].body); }

UNITS.forEach(u => {
  add(u.name); add(u.ar);
  for (const k in u.vocab) { add(k); u.vocab[k].forEach(x => addWord(x)); }
});

for (const k in WRITING) {
  const w = WRITING[k];
  add(w.t); add(w.ar); (w.q || []).forEach(x => add(x)); addLines(w.model);
}

// The table is printed with «·» between the three forms; the clip text must
// match what the page shows, or the player never finds it.
add('Infinitive · Past · Participle');
Object.keys(IRREGULAR).forEach(v => add(v + ' · ' + IRREGULAR[v] + ' · ' + PARTICIPLE[v]));

QBANK.forEach(q => { add(q.q); add(q.a); add(q.hint); });

for (const k in EX) { add(EX[k].t); (EX[k].items || []).forEach(it => { add(it[0]); add(it[1]); }); }

/* Why a word conjugates the way it does. The engines answer «صرّفي big» with a
 * generated form plus a fixed reason, and the reason is the part worth hearing
 * — without these the whole card was silent. */
[...html.matchAll(/why:\s*'((?:\\.|[^'])*)'/g)]
  .forEach(m => add(m[1].replace(/\\'/g, "'")));

/* What the tutor says in her own words.
 *
 * Everything above is curriculum — the words, the rules, the exercises. But
 * half of what a student reads is the tutor talking: the greeting, the menu
 * of rules, «اختبار سريع — ٦ أسئلة», the apology when a question falls
 * outside the book. None of that lives in a data structure, so none of it
 * had a clip — say «مرحبا» to her and the answer was silent, which is the
 * first thing anyone tries.
 *
 * These are the fixed parts of those replies, copied from where the page
 * prints them. Only the fixed parts: a sentence finished at runtime («الإجابة:
 * <code>…</code>») can be matched no further than its seam, so it stops there.
 * Add a line here whenever the tutor learns something new to say.
 */
[
  'أهلاً بك 🌷 أنا مس ثريا، معلّمة الإنجليزيّة للصفّ الخامس.',
  'أهلاً 🌿 أنا مس ثريا V2، معلّمة الصف الخامس لمنهج عُمان 5A.',
  'أستطيع أن',
  '• أعطيك معنى أيّ كلمة وأضعها في جملة — جرّب: ويش يعني count',
  '• أعرض كلمات أيّ وحدة — جرّب: كلمات الوحدة ١',
  '• أشرح أيّ قاعدة بالعربيّة مع أمثلة الكتاب',
  '• أحلّ أسئلة الفراغات وأشرح لماذا',
  '• أدرّبك بـبطاقات الكلمات وتمارين القواعد',
  '• أختبرك باختبارٍ سريع',
  '🔊 تحت كلّ إجابةٍ زرّ استمعي: أقرأ لك البطاقة كاملةً بترتيبها — أنا أنطق الإنجليزيّة، وصديقي الروبوت 🤖 محمد يقرأ العربيّة في موضعها. وزرّ الإنجليزيّة يُسمعك الإنجليزيّة وحدها لتتدرّب على النطق.',
  'اختر من الأزرار تحت، أو اكتب سؤالك.',
  'أدربك سؤالًا سؤالًا، وفي الأنشطة أعطي تلميحًا أولًا.',
  'إذا لم يكن السؤال واضحًا أطلب صورته أو نصّه ولا أخمّن.',
  'وعليكم السلام 🌷 أنا مس ثريا، معلّمتك للصفّ الخامس.',
  'أشرح القواعد، وأحلّ أسئلة الكتاب، وأجيب عن كلّ ما يخصّ المنهج.',
  'اختر من الأزرار تحت، أو اسألني مباشرة.',
  'أيّ وحدةٍ تريد كلماتها؟ اكتب مثلاً كلمات الوحدة ١ أو كلمات يونت ون.',
  'أو اكتب أيّ كلمةٍ إنجليزيّة وأعطيك معناها مع جملةٍ عليها.',
  'هذا السؤال خارج ما أحفظه من الكتاب 📘',
  'جرّب أن تسألني عن:',
  '• قاعدة من قواعد الوحدات الأربع',
  '• كلمة من كلمات الكتاب',
  '• تصريف صفة أو فعل — مثل صرّفي big أو ماضي write',
  '• أو اكتب اختبريني',
  '📚 قواعد الكتاب — اختر واحدة',
  'اكتب اشرحي ومعها اسم القاعدة — مثل اشرحي الماضي البسيط.',
  'أو اكتب تمارين لتتدرّب، أو اختبريني لاختبارٍ سريع.',
  '🧠 اختبار سريع — ٦ أسئلة',
  'اكتب الإجابة فقط.',
  '✅ صحيح!',
  '❌ ليس بعد. الإجابة:',
  '👍 خرجنا من التمرين. اسألني عن أيّ كلمةٍ أو قاعدة.',
  '✏️ التمارين — اختر واحداً:',
  'أو اكتب اختبريني لاختبارٍ شاملٍ من كلّ الوحدات.',
  'اكتب الكلمة الصحيحة فقط.',
  '📘 كتاب النشاط — الصفّ الخامس · الفصل الأوّل (5A)',
  'وفي آخر الكتاب: نماذج الكتابة (ص ٦٦) · الإملاء (ص ٧٠) · الأفعال الشاذّة (ص ٧٤) · قصص القراءة (ص ٧٦).',
  'اكتب مثلاً: الوحدة ٢ لأعرض لك كلماتها وقواعدها.',
  '📖 الأفعال الشاذّة — صفحة ٧٤',
  'اكتب ماضي ثمّ أيّ فعل وأصرّفه لك.',
  '📝 نماذج الكتابة — صفحة ٦٦',
  'اكتب نموذج ٢ مثلاً لتقرأ النموذج كاملاً مع أسئلته.',
  'أسئلة تساعدك',
  'تذكّر: حرف كبير في أوّل كلّ جملة · نقطة في آخرها · استعمل كلمات الربط (and, but, because, so) · تحقّق من الإملاء والخطّ.',
  'في جملة',
  'ما معناها بالعربيّة؟ اكتب معناها، أو اكتب الجواب.',
  'اكتب أيّ كلمةٍ منها لأضعها لك في جملة، أو اكتب بطاقات',
  'اكتب كلمات الوحدة ١ (أو ٢ أو ٣ أو ٤) لترى كلّ كلمات الكتاب بمعانيها.',
  'هل تقصد؟',
  'أرسل الجملة ومعها الكلمة بين قوسين، مثل:',
  'وسأحلّها وأشرح القاعدة.',
  'أو اكتب اختبريني لنتمرّن معاً.',
  'التصريف الثالث:',
  'فعل شاذّ',
  'فعل شاذّ من قائمة صفحة ٧٤.',
  'تعذّر الاتّصال الآن.',
  'تعذّر الاتّصال بالإنترنت. الدماغ المحلّي ما زال يعمل — جرّب سؤالاً من الكتاب.'
].forEach(x => add(x));

const rows = [...seen.values()];
const byLang = rows.reduce((m, r) => (m[r.lang] = (m[r.lang] || 0) + 1, m), {});
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(rows, null, 1));
console.log('lines:', rows.length, JSON.stringify(byLang));
