"""Deterministic transition frame probe (final).

The natural rAF loop is frozen via the page's own `running` flag, then the
page's own frame() is driven with synthetic timestamps (exact 16.666ms
steps, closed-loop on trans.t). CSS transition animations are paused and
scrubbed to the same virtual time. Result: frames at EXACTLY
150/550/1050/1600ms of transition time — no screenshot-latency skew.

Saves to /mnt/agents/output/shots/trans2/.
"""
import os
from playwright.sync_api import sync_playwright

OUT = '/mnt/agents/output/shots/trans2'
os.makedirs(OUT, exist_ok=True)

STEPS = [150, 550, 1050, 1600]   # cumulative ms after click
FRAME = 1000 / 60

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium',
                                args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1848, 'height': 1080},
                            device_scale_factor=1)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.goto('file:///mnt/agents/output/silk-atlas/index.html')
    page.wait_for_timeout(2200)          # settle: roofs built, curtain at rest

    # trigger the transition (china -> japan, dir +1), freeze natural loop
    page.evaluate("""
      document.getElementById('cardR').click();
      running = false;
      if (trans) trans.t = 0;
      lastTs = -1;
    """)
    page.wait_for_timeout(50)            # let the style engine create fade-out transitions
    n = page.evaluate("""
      (() => {
        const anims = document.getAnimations();
        anims.forEach(a => { a.pause(); a.__cv = 0; a.currentTime = 0; });
        return anims.length;
      })()
    """)
    print('fade-out animations tagged:', n)

    ts = 0.0

    def cur_t():
        return page.evaluate("trans ? trans.t * 1000 : 1e9")

    def step_to(target):
        global ts
        while cur_t() < target - 0.5:
            ts += FRAME
            page.evaluate(f"""
              (() => {{
                lastTs = {ts} - {FRAME};
                running = true;
                frame({ts});
                running = false;
                document.getAnimations().forEach(a => {{
                  if (a.__cv === undefined) {{ a.pause(); a.__cv = trans ? trans.t * 1000 : 0; a.currentTime = 0; }}
                }});
              }})()
            """)
        vt = cur_t()
        # scrub every CSS animation to the exact same virtual time
        page.evaluate(f"""
          document.getAnimations().forEach(a => {{
            a.currentTime = Math.max(0, {vt} - (a.__cv || 0));
          }});
        """)
        return vt

    for target in STEPS:
        vt = step_to(target)
        state = page.evaluate(
            "({ t: trans ? +trans.t.toFixed(3) : null, swapped: trans ? trans.swapped : null,"
            " key: curKey, mode, locked: inputLocked,"
            " titleOp: getComputedStyle(document.getElementById('title')).opacity,"
            " hintOp: getComputedStyle(document.getElementById('hint')).opacity })")
        page.screenshot(path=f'{OUT}/f{target:04d}ms.png')
        print(f'@{target}ms (actual sim {vt:.1f}ms) ->', state)

    vt = step_to(2800)
    state = page.evaluate(
        "({ t: trans ? +trans.t.toFixed(3) : null, key: curKey, mode, locked: inputLocked })")
    page.screenshot(path=f'{OUT}/f2800ms_settled.png')
    print(f'@2800ms (actual sim {vt:.1f}ms) ->', state)

    print('JS errors:', errors if errors else 'none')
    browser.close()
print('saved to', OUT)
