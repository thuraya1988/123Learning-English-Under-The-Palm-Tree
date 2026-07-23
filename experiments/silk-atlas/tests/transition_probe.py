#!/usr/bin/env python3
"""Transition timeline verification with DETERMINISTIC VIRTUAL TIME.
rAF is hijacked before page scripts run; frame() is stepped with synthetic
16.666 ms timestamps, so captures happen at exact transition times:
  150 ms -> old scene mid-slide (04_trans_mid_slide)
  550 ms -> paper-only beat     (05_trans_paper_beat)
  1050 ms -> new scene mid-entrance (06_trans_entrance)
"""
from playwright.sync_api import sync_playwright

URL = 'file:///mnt/agents/output/silk-atlas/index.html'
S = '/mnt/agents/output/shots/v2'
HIJACK = """
window.__vq = [];
window.__step = (ts) => { const q = window.__vq; window.__vq = []; q.forEach(cb => cb(ts)); };
window.requestAnimationFrame = cb => { window.__vq.push(cb); return window.__vq.length; };
"""
DT = 16.666

with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = b.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.add_init_script(HIJACK)
    page.goto(URL)
    page.wait_for_function("window.__DBG && window.__DBG.anchors && window.__DBG.anchors() !== null", timeout=15000)
    # settle the intro (0.9s) with virtual frames
    t = 0.0
    for i in range(80):
        page.evaluate("(ts) => window.__step(ts)", t); t += DT
    # trigger transition china -> japan (dir +1)
    page.evaluate("document.getElementById('cardR').click()")
    shots = [(150, '04_trans_mid_slide'), (550, '05_trans_paper_beat'), (1050, '06_trans_entrance')]
    elapsed = 0.0
    for target, name in shots:
        while elapsed < target - 1:
            page.evaluate("(ts) => window.__step(ts)", t); t += DT; elapsed += DT
        page.screenshot(path=f'{S}/{name}.png')
        print('captured %s at virtual t=%.0f ms (scene=%s)' % (name, elapsed, page.evaluate("window.__DBG.scene()")))
    # finish the transition, verify final state
    for i in range(60):
        page.evaluate("(ts) => window.__step(ts)", t); t += DT
    print('final scene:', page.evaluate("window.__DBG.scene()"), '| hash:', page.evaluate("location.hash"))
    print('page errors:', errs)
    b.close()
