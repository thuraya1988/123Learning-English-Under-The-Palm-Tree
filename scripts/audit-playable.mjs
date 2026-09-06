/* Is the game actually playable, or does it only fail to throw?
 *
 * The first audit asked "does this page raise a JavaScript error" and answered
 * "no" for 103 of 104 approved pages — which said nothing about whether a child
 * can play them. This asks the questions that matter instead: does the start
 * button lead anywhere, does anything respond to a tap, are the pictures there,
 * and does it depend on a server outside our control that a school network may
 * block.
 *
 *     node scripts/audit-playable.mjs 0 104      # يكتب /tmp/play-<from>.json
 */
import { chromium } from 'playwright';
import fs from 'fs';

const all = JSON.parse(fs.readFileSync('/tmp/approved.json', 'utf8'));
const from = +(process.argv[2] || 0), to = +(process.argv[3] || all.length);
const BASE = 'http://127.0.0.1:8899/';

const b = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required']
});
const out = [];

for (const g of all.slice(from, to)) {
  const ctx = await b.newContext({ viewport: { width: 430, height: 860 } });
  const ext = new Set(), miss = [], errs = [];
  // External hosts are recorded, not blocked: a game that needs a CDN still
  // works today, but it is a dependency a school firewall can take away.
  await ctx.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith(BASE) || u.startsWith('data:') || u.startsWith('blob:')) return r.continue();
    ext.add(u.replace(/^https?:\/\//, '').split('/')[0]);
    return r.abort();
  });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(e.message.slice(0, 80)));
  p.on('console', m => {
    if (m.type() === 'error' && !/ERR_FAILED|Failed to load resource/.test(m.text()))
      errs.push('C:' + m.text().slice(0, 70));
  });
  p.on('response', r => {
    if (r.status() >= 400 && r.url().startsWith(BASE)) miss.push(r.url().split('/').pop().slice(0, 30));
  });

  const snap = () => p.evaluate(() => ({
    text: (document.body.innerText || '').replace(/\s+/g, ' ').trim(),
    canvas: document.querySelectorAll('canvas').length,
    nodes: document.querySelectorAll('*').length,
    live: [...document.querySelectorAll('button,a,input,select,[onclick],[role=button]')]
            .filter(e => e.offsetParent).length,
    imgs: [...document.images].length,
    broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length
  }));

  const r = { f: g.f, title: g.title };
  try {
    await p.goto(BASE + g.f, { waitUntil: 'load', timeout: 40000 });
    await p.waitForTimeout(4000);
    const a = await snap();
    Object.assign(r, { text: a.text.length, canvas: a.canvas, live: a.live,
                       imgs: a.imgs, broken: a.broken });

    /* 1. does the primary action lead anywhere? */
    const label = await p.$$eval('button,a,[role=button]', es => {
      const i = es.findIndex(e => e.offsetParent &&
        /ابدأ|إبدأ|ابداء|ادخل|دخول|العب|إلعب|شغّل|تشغيل|start|play|begin|enter|go/i.test(e.textContent));
      if (i < 0) return null;
      es[i].setAttribute('data-primary', '1');
      return es[i].textContent.trim().slice(0, 22);
    });
    r.startBtn = label || '';
    if (label) {
      try { await p.click('[data-primary="1"]', { timeout: 3000 }); } catch (_) {}
      await p.waitForTimeout(3000);
      const c = await snap();
      r.starts = c.text !== a.text || c.canvas !== a.canvas || Math.abs(c.nodes - a.nodes) > 4;
      Object.assign(r, { text2: c.text.length, live2: c.live });
    }

    /* 2. does anything respond to a tap? Try up to four visible controls. */
    const before = await snap();
    const tried = await p.evaluate(() => {
      const es = [...document.querySelectorAll('button,[role=button],.card,.tile,.option,.choice,li')]
        .filter(e => e.offsetParent && !e.hasAttribute('data-primary')).slice(0, 4);
      es.forEach((e, i) => e.setAttribute('data-probe', String(i)));
      return es.length;
    });
    for (let i = 0; i < tried; i++) {
      try { await p.click(`[data-probe="${i}"]`, { timeout: 1500 }); } catch (_) {}
      await p.waitForTimeout(500);
    }
    const after = await snap();
    r.reacts = tried > 0 && (after.text !== before.text || Math.abs(after.nodes - before.nodes) > 2);
    r.probed = tried;
  } catch (e) {
    r.fail = e.message.split('\n')[0].slice(0, 60);
  }

  r.errs = [...new Set(errs)].slice(0, 2);
  r.miss = [...new Set(miss)].slice(0, 3);
  r.ext = [...ext];

  /* The verdict, in the order a person would judge it. */
  r.verdict =
      r.fail                          ? 'لا تفتح'
    : r.errs.length                   ? 'خطأ برمجيّ'
    : (r.canvas === 0 && (r.text || 0) < 80) ? 'صفحةٌ شبه فارغة'
    : (r.startBtn && r.starts === false)     ? 'زرُّ البدء لا يعمل'
    : (!r.reacts && r.canvas === 0 && (r.live || 0) < 3) ? 'لا تستجيب للّمس'
    : r.broken                        ? 'صورٌ مكسورة'
    : r.miss.length                   ? 'ملفٌّ ناقص'
    : 'تُلعَب';

  out.push(r);
  console.log((r.verdict === 'تُلعَب' ? '✅' : '⚠️'), String(out.length + from).padStart(3),
    r.f.slice(0, 40).padEnd(42), r.verdict.padEnd(18),
    'نص:' + String(r.text || 0).padStart(5),
    'canvas:' + (r.canvas ?? '-'),
    'أزرار:' + String(r.live || 0).padStart(3),
    r.startBtn ? ('بدء:' + (r.starts ? 'يعمل' : 'لا')) : '',
    r.broken ? ('صور مكسورة:' + r.broken) : '',
    r.ext.length ? ('خارجيّ:' + r.ext.join(',')) : '');
  await ctx.close();
}

fs.writeFileSync('/tmp/play-' + from + '.json', JSON.stringify(out));
await b.close();
