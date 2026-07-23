#!/usr/bin/env python3
"""Self-test for silk-atlas/index.html — playwright + system chromium."""
import time, os, sys
from playwright.sync_api import sync_playwright

URL = 'file:///mnt/agents/output/silk-atlas/index.html'
SHOTS = '/mnt/agents/output/shots'
os.makedirs(SHOTS, exist_ok=True)

console_msgs = []
page_errors = []

def attach(page):
    page.on('console', lambda m: console_msgs.append((m.type, m.text)))
    page.on('pageerror', lambda e: page_errors.append(str(e)))

def swipe(page, x0, y0, x1, y1, steps=12, total_ms=150):
    page.mouse.move(x0, y0)
    for i in range(1, steps + 1):
        t = i / steps
        page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)
        time.sleep(total_ms / steps / 1000.0)

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1848, 'height': 1080}, device_scale_factor=1)
    attach(page)

    # 1. china default
    page.goto(URL)
    page.wait_for_timeout(2000)
    page.screenshot(path=f'{SHOTS}/01_china_default.png')

    # 2. fast swipe through curtain center
    page.mouse.move(780, 600)
    page.mouse.move(782, 600)
    # mid-swipe screenshot: do half the swipe, shoot, finish
    for i in range(1, 7):
        page.mouse.move(780 + (1100 - 780) * i / 12, 600 + 40 * i / 12)
        time.sleep(0.0125)
    page.screenshot(path=f'{SHOTS}/02_swipe_mid.png')
    for i in range(7, 13):
        page.mouse.move(780 + (1100 - 780) * i / 12, 600 + 40 * i / 12)
        time.sleep(0.0125)
    page.wait_for_timeout(400)
    page.screenshot(path=f'{SHOTS}/03_swipe_after_04s.png')
    page.wait_for_timeout(1600)
    page.screenshot(path=f'{SHOTS}/04_swipe_after_2s.png')

    # 3. click right card -> japan (directional transition)
    page.mouse.move(1698, 330)  # hover off curtain
    page.mouse.click(1698, 330)
    page.wait_for_timeout(180)   # mid phase A: building sliding off
    page.screenshot(path=f'{SHOTS}/05_trans_slide_off.png')
    page.wait_for_timeout(370)   # ~0.55s in -> empty paper beat
    page.screenshot(path=f'{SHOTS}/06_trans_empty_beat.png')
    page.wait_for_timeout(2050)
    page.screenshot(path=f'{SHOTS}/07_japan_settled.png')

    # 4. left card -> china, then left card again -> kazakhstan
    page.mouse.click(150, 330)
    page.wait_for_timeout(1800)
    page.screenshot(path=f'{SHOTS}/08_back_china.png')
    page.mouse.click(150, 330)
    page.wait_for_timeout(1800)
    page.screenshot(path=f'{SHOTS}/09_kazakhstan.png')

    # 5. gallery via hash
    page.evaluate("location.hash='#gallery'")
    page.wait_for_timeout(1600)
    page.screenshot(path=f'{SHOTS}/10_gallery.png')

    # 6. direct #japan load
    page2 = browser.new_page(viewport={'width': 1848, 'height': 1080}, device_scale_factor=1)
    attach(page2)
    page2.goto(URL + '#japan')
    page2.wait_for_timeout(1600)
    page2.screenshot(path=f'{SHOTS}/11_japan_direct.png')

    # 7. mobile viewport
    page3 = browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    attach(page3)
    page3.goto(URL)
    page3.wait_for_timeout(1800)
    page3.screenshot(path=f'{SHOTS}/12_mobile.png')

    # 8. FPS over 3s during continuous swipe (back on page 1, alone)
    page2.close()
    page3.close()
    page.bring_to_front()
    page.evaluate("location.hash='#china'")
    page.wait_for_timeout(2000)
    page.evaluate("""() => {
      window.__frames = 0; window.__t0 = performance.now();
      function count(){ window.__frames++; if (performance.now()-window.__t0 < 3000) requestAnimationFrame(count); }
      requestAnimationFrame(count);
    }""")
    t_end = time.time() + 3.0
    i = 0
    while time.time() < t_end:
        x = 700 + (i % 40) * 12
        page.mouse.move(x, 600 + (i % 7) * 8)
        i += 1
        time.sleep(0.008)
    frames = page.evaluate("window.__frames")
    fps = frames / 3.0

    browser.close()

errors = [m for m in console_msgs if m[0] in ('error',)]
warnings = [m for m in console_msgs if m[0] == 'warning']
print('=== RESULTS ===')
print('console errors:', len(errors))
for t, m in errors[:10]: print('  [console.error]', m[:200])
print('console warnings:', len(warnings))
for t, m in warnings[:10]: print('  [warning]', m[:200])
print('page errors:', len(page_errors))
for e in page_errors[:10]: print('  [pageerror]', e[:300])
print('FPS during swipe: %.1f' % fps)
print('screenshots in', SHOTS)
