#!/usr/bin/env python3
"""SILK ATLAS v2 visual-refresh acceptance suite.
Covers: console/page errors, generated-asset usage, FPS under violent swiping,
transitions (slide / paper beat / entrance), hash routing, cards, mobile
bottom switcher + touch drag, veil placeholder, title<=5 lines & not cropped,
no horizontal overflow. Screenshots -> /mnt/agents/output/shots/v2/
"""
import time, os, sys
from playwright.sync_api import sync_playwright

URL = 'file:///mnt/agents/output/silk-atlas/index.html'
SHOTS = '/mnt/agents/output/shots/v2'
os.makedirs(SHOTS, exist_ok=True)

console_msgs, page_errors = [], []
def attach(page):
    page.on('console', lambda m: console_msgs.append((m.type, m.text)))
    page.on('pageerror', lambda e: page_errors.append(str(e)))

checks = []
def check(name, ok, detail=''):
    checks.append((name, bool(ok), detail))
    print(('  PASS' if ok else '  FAIL'), name, detail)

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
    attach(page)

    # ---- 1. load: veil placeholder visible before images finish, then hidden
    page.goto(URL, wait_until='domcontentloaded')
    veil_early = page.evaluate("""() => {
      const v = document.getElementById('veil');
      if (!v) return { present: false };
      const cs = getComputedStyle(v);
      return { present: true, opacity: cs.opacity, bg: cs.backgroundColor,
               covered: v.getBoundingClientRect().width >= innerWidth };
    }""")
    check('loading veil present before images ready', veil_early.get('present') and veil_early.get('covered'), str(veil_early))
    page.wait_for_timeout(2500)
    veil_gone = page.evaluate("() => !document.getElementById('veil') || getComputedStyle(document.getElementById('veil')).opacity === '0'")
    check('veil hidden after images ready', veil_gone)

    # ---- 2. generated roof assets in use (not procedural fallback)
    ro = page.evaluate("window.__DBG.roofUsingImage()")
    check('generated roof images in all 3 scenes', ro == [True, True, True], str(ro))

    # ---- 3. china hero screenshot (1920x1080)
    page.screenshot(path=f'{SHOTS}/01_china_1920.png')

    # ---- 4. title <=5 lines, not cropped; desc width/size
    t = page.evaluate("""() => {
      const el = document.getElementById('title');
      const lines = (el.innerHTML.match(/<br>/g) || []).length + 1;
      const r = el.getBoundingClientRect();
      const d = document.getElementById('desc').getBoundingClientRect();
      const cs = getComputedStyle(document.getElementById('desc'));
      return { lines, bottom: r.bottom, top: r.top, vh: innerHeight,
               descW: d.width, descSize: cs.fontSize, descLH: cs.lineHeight };
    }""")
    check('title <=5 lines', t['lines'] <= 5, f"lines={t['lines']}")
    check('title not cropped by bottom edge', t['bottom'] < t['vh'] - 4, f"bottom={t['bottom']:.0f} vh={t['vh']}")
    check('desc 260-320px, >=14px', 260 <= t['descW'] <= 320 and float(t['descSize'][:-2]) >= 14,
          f"w={t['descW']:.0f} size={t['descSize']} lh={t['descLH']}")

    # ---- 5. cards: only prev+next shown, not near edges, kbd focusable
    c = page.evaluate("""() => {
      const L = document.getElementById('cardL'), R = document.getElementById('cardR');
      const rl = L.getBoundingClientRect(), rr = R.getBoundingClientRect();
      return { left: rl.left, rightR: innerWidth - rr.right, w: rl.width, h: rl.height,
               capL: document.getElementById('capL').textContent,
               capR: document.getElementById('capR').textContent,
               imgL: !!document.getElementById('imgL').complete,
               tabL: L.tabIndex, tabR: R.tabIndex };
    }""")
    check('cards show prev+next (KAZAKHSTAN/JAPAN on china)', c['capL'] == 'KAZAKHSTAN' and c['capR'] == 'JAPAN', f"{c['capL']}|{c['capR']}")
    check('cards balanced, >=60px from edges', abs(c['left'] - c['rightR']) < 8 and c['left'] >= 60, f"L={c['left']:.0f} R={c['rightR']:.0f}")
    check('card ~150x190', 148 <= c['w'] <= 152 and 172 <= c['h'] <= 212, f"{c['w']:.0f}x{c['h']:.0f}")
    check('cards keyboard-focusable', c['tabL'] == 0 and c['tabR'] == 0)

    # ---- 6. swipe mid / after (violent swipe through curtain)
    page.mouse.move(760, 640)
    for i in range(1, 7):
        page.mouse.move(760 + (1160 - 760) * i / 12, 640 + 50 * i / 12)
        time.sleep(0.0125)
    page.screenshot(path=f'{SHOTS}/02_swipe_mid.png')
    for i in range(7, 13):
        page.mouse.move(760 + (1160 - 760) * i / 12, 640 + 50 * i / 12)
        time.sleep(0.0125)
    page.wait_for_timeout(400)
    page.screenshot(path=f'{SHOTS}/03_swipe_after.png')
    page.wait_for_timeout(2200)

    # ---- 7. transition frames: click right card -> japan
    page.locator('#cardR').click()
    page.wait_for_timeout(180)
    page.screenshot(path=f'{SHOTS}/04_trans_mid_slide.png')
    page.wait_for_timeout(380)
    page.screenshot(path=f'{SHOTS}/05_trans_paper_beat.png')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{SHOTS}/06_trans_entrance.png')
    page.wait_for_timeout(1800)
    h = page.evaluate("location.hash")
    check('hash routing on card click', h == '#japan', h)
    page.screenshot(path=f'{SHOTS}/07_japan_1920.png')

    # ---- 8. left card -> china, left again -> kazakhstan
    page.locator('#cardL').click(); page.wait_for_timeout(1900)
    page.locator('#cardL').click(); page.wait_for_timeout(1900)
    h = page.evaluate("location.hash")
    check('second left click -> kazakhstan', h == '#kazakhstan', h)
    page.screenshot(path=f'{SHOTS}/08_kazakhstan_1920.png')

    # ---- 9. gallery
    page.evaluate("location.hash='#gallery'")
    page.wait_for_timeout(1800)
    page.screenshot(path=f'{SHOTS}/09_gallery.png')
    nav_dest_active = page.evaluate("document.getElementById('navDest').classList.contains('active')")
    check('nav active indicator in gallery', nav_dest_active)

    # ---- 10. direct loads
    for frag, name in [('#japan', '10_direct_japan'), ('#kazakhstan', '11_direct_kazakhstan'), ('#gallery', '12_direct_gallery')]:
        p2 = browser.new_page(viewport={'width': 1848, 'height': 1080}, device_scale_factor=1)
        attach(p2)
        p2.goto(URL + frag)
        p2.wait_for_timeout(2200)
        p2.screenshot(path=f'{SHOTS}/{name}.png')
        sc = p2.evaluate("window.__DBG.scene()")
        check(f'direct load {frag}', (frag == '#gallery') or sc == frag[1:], f'scene={sc}')
        p2.close()

    # ---- 11. 1440x900
    p3 = browser.new_page(viewport={'width': 1440, 'height': 900}, device_scale_factor=1)
    attach(p3)
    p3.goto(URL)
    p3.wait_for_timeout(2400)
    ov = p3.evaluate("({sw: document.documentElement.scrollWidth, iw: innerWidth, ox: document.body.scrollWidth > innerWidth + 1})")
    check('no horizontal overflow @1440x900', not ov['ox'], str(ov))
    p3.screenshot(path=f'{SHOTS}/13_china_1440x900.png')
    p3.close()

    # ---- 12. mobile 390x844: switcher, touch drag, overflow
    pm = browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2,
                          has_touch=True, is_mobile=True)
    attach(pm)
    pm.goto(URL)
    pm.wait_for_timeout(2600)
    ms = pm.evaluate("""() => {
      const m = document.getElementById('mswitch');
      const r = m.getBoundingClientRect();
      return { visible: getComputedStyle(m).display !== 'none', bottom: r.bottom, vh: innerHeight,
               chips: m.children.length, active: m.querySelector('.active')?.dataset.target,
               overflow: document.body.scrollWidth > innerWidth + 1 };
    }""")
    check('mobile bottom switcher visible w/ 3 chips', ms['visible'] and ms['chips'] == 3 and ms['active'] == 'china', str(ms))
    check('no horizontal overflow @390x844', not ms['overflow'])
    pm.screenshot(path=f'{SHOTS}/14_mobile_390.png')
    # touch drag through curtain (CDP touch events)
    cdp = pm.context.new_cdp_session(pm)
    def touch(t, pts):
        cdp.send('Input.dispatchTouchEvent', {'type': t, 'touchPoints': pts})
    # curtain center on screen ~ (195, 308+0.211*(500..650)) -> y ~ 415-450
    touch('touchStart', [{'x': 130, 'y': 430, 'id': 1}])
    for i in range(1, 10):
        touch('touchMove', [{'x': 130 + i * 14, 'y': 430 + i * 2, 'id': 1}])
        time.sleep(0.02)
    pm.screenshot(path=f'{SHOTS}/15_mobile_touch_drag.png')
    touch('touchEnd', [])
    pm.wait_for_timeout(1200)
    # verify curtain moved (node displacement from anchors)
    disp = pm.evaluate("""() => {
      const a = window.__DBG.anchors(); if (!a) return -1;
      const s = window.__DBG.sample([2,7,12,17,23],[20]); let m = 0;
      for (let i=0;i<5;i++) m = Math.max(m, Math.abs(s[i][0][0]-a[0][0]));
      return m;
    }""")
    check('touch drag moved the curtain', disp > 2, f'max |dx|={disp:.1f}px')
    # switcher tap -> japan
    pm.evaluate("document.querySelectorAll('#mswitch .mchip')[1].click()")
    pm.wait_for_timeout(2200)
    hm = pm.evaluate("location.hash")
    check('mobile switcher navigates', hm == '#japan', hm)
    pm.screenshot(path=f'{SHOTS}/16_mobile_japan.png')
    pm.close()

    # ---- 13. FPS during 3s violent swiping at 1848x1080 DPR1
    # fresh browser, single page — no background rAF loops competing for CPU
    browser.close()
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    pf = browser.new_page(viewport={'width': 1848, 'height': 1080}, device_scale_factor=1)
    attach(pf)
    pf.goto(URL)
    pf.wait_for_timeout(2600)
    pf.evaluate("""() => {
      window.__frames = 0; window.__t0 = performance.now();
      function count(){ window.__frames++; if (performance.now()-window.__t0 < 3000) requestAnimationFrame(count); }
      requestAnimationFrame(count);
    }""")
    t_end = time.time() + 3.0
    i = 0
    while time.time() < t_end:
        x = 700 + (i % 40) * 12
        pf.mouse.move(x, 620 + (i % 7) * 10)
        i += 1
        time.sleep(0.008)
    frames = pf.evaluate("window.__frames")
    fps = frames / 3.0
    check('FPS >= 55 during violent swiping', fps >= 55, f'{fps:.1f} fps')
    pf.screenshot(path=f'{SHOTS}/17_after_fps_swipe.png')
    pf.close()

    browser.close()

errors = [m for m in console_msgs if m[0] == 'error']
print('\n=== SUMMARY ===')
print('console errors:', len(errors))
for t_, m in errors[:8]: print('  [console.error]', m[:180])
warn = [m for m in console_msgs if m[0] == 'warning']
print('console warnings:', len(warn))
for t_, m in warn[:5]: print('  [warning]', m[:180])
print('page errors:', len(page_errors))
for e in page_errors[:8]: print('  [pageerror]', e[:250])
fails = [c for c in checks if not c[1]]
print('checks: %d/%d passed' % (len(checks) - len(fails), len(checks)))
print('screenshots in', SHOTS)
sys.exit(1 if (errors or page_errors or fails) else 0)
