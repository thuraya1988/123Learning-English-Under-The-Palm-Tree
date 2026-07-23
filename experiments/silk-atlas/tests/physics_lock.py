#!/usr/bin/env python3
"""Physics-lock proof for the SILK ATLAS visual refresh.

Drives the SAME synthetic swipe through the curtain on BOTH
  A) silk-atlas/index.before-visual-refresh.html  (pristine backup)
  B) silk-atlas/index.html                        (visual refresh)

Technique: requestAnimationFrame is hijacked BEFORE page scripts run, so every
frame() is driven manually with synthetic 16.666 ms timestamps (deterministic
virtual time). Identical pointermove event streams are dispatched between
frames. A fixed set of curtain nodes is sampled at fixed virtual times and the
trajectories are compared. The refreshed page may only shift the anchor LINE
vertically (topY), so Y is compared relative to each page's anchor line.

The backup file itself is never modified: a temp copy is served with a tiny
read-only __DBG hook appended (classic scripts share the global lexical scope,
so the hook can read the module-level curtain). The refreshed page already
exposes the same read-only hook inline.
"""
import os, shutil, json, sys
from playwright.sync_api import sync_playwright

BACKUP = '/mnt/agents/output/silk-atlas/index.before-visual-refresh.html'
NEW    = '/mnt/agents/output/silk-atlas/index.html'
TMP    = '/tmp/physics_lock'
os.makedirs(TMP, exist_ok=True)

DBG_HOOK = """
<script>
window.__DBG = {
  ready: true,
  topY: key => SCENES[key].topY,
  anchors: () => (curCurtain ? curCurtain.anchors.map(a => [a.x, a.y]) : null),
  sample: (cols, rows) => (curCurtain ? cols.map(c => rows.map(r => {
    const p = curCurtain.pts[c][r]; return [p.x, p.y];
  })) : null),
  reset: () => { if (curCurtain) curCurtain.reset(); }
};
</script>
"""
# harness-only state setup: teleports pointer+actor (what an instant mouse
# jump does) so both pages start the swipe from identical RELATIVE states.
WARP_HOOK = """
<script>
window.__DBG2 = { warp: (x, y) => {
  pointer.x = x; pointer.y = y; actor.x = x; actor.y = y; actor.vx = 0; actor.vy = 0;
} };
</script>
"""

# temp copy of the backup + read-only hook (backup untouched)
src = open(BACKUP).read()
assert '</body>' in src
tmp_before = os.path.join(TMP, 'before.html')
open(tmp_before, 'w').write(src.replace('</body>', DBG_HOOK + WARP_HOOK + '</body>'))
# the new page has the read-only hook inline; add only the harness warp hook
tmp_after = os.path.join(TMP, 'after.html')
shutil.copy(NEW, tmp_after)
srcB = open(tmp_after).read()
open(tmp_after, 'w').write(srcB.replace('</body>', WARP_HOOK + '</body>'))
# after.html references assets/ relatively — symlink them
assets_link = os.path.join(TMP, 'assets')
if not os.path.exists(assets_link):
    os.symlink('/mnt/agents/output/silk-atlas/assets', assets_link)

HIJACK = """
window.__vq = [];
window.__step = (ts) => {
  const q = window.__vq; window.__vq = [];
  q.forEach(cb => { try { cb(ts); } catch (e) { window.__err = String(e && e.stack || e); } });
};
window.requestAnimationFrame = cb => { window.__vq.push(cb); return window.__vq.length; };
"""

COLS = [2, 7, 12, 17, 23]
ROWS = [4, 12, 20, 28, 36]
DT = 16.666           # synthetic frame step (ms)
SETTLE_MS = 1000      # idle settle before the swipe
SWIPE_MS  = 400       # swipe duration
TOTAL_MS  = 4200      # total virtual timeline
X0, Y0 = 700.0, 600.0 # swipe start (design == client px at 1848x1080 DPR1)
X1, Y1 = 1150.0, 640.0

def run_page(pw, url):
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1848, 'height': 1080}, device_scale_factor=1)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script(HIJACK)
    page.goto(url)
    page.wait_for_function("window.__DBG && window.__DBG.anchors && window.__DBG.anchors() !== null", timeout=15000)
    # the refreshed page may shift the anchor LINE vertically; shift the swipe
    # by the same amount so forcing is identical RELATIVE to the curtain
    anchor = page.evaluate("window.__DBG.anchors()[0][1]")
    y_shift = anchor - 384.0   # 384 = backup china topY
    # deterministic start: reset curtain to anchors, enterT = 0, and warp the
    # pointer/actor to the (shifted) swipe start with zero velocity
    page.evaluate("window.__DBG.reset()")
    page.evaluate("([x, y]) => window.__DBG2.warp(x, y)", [X0, Y0 + y_shift])
    samples = []   # (t_ms, flat node list)
    t = 0.0
    frame = 0
    while t <= TOTAL_MS:
        # dispatch pointermove scheduled at this virtual time (during swipe)
        rel = t - SETTLE_MS
        if 0 <= rel <= SWIPE_MS:
            u = rel / SWIPE_MS
            x, y = X0 + (X1 - X0) * u, Y0 + y_shift + (Y1 - Y0) * u
            page.evaluate("""([x, y]) => {
              window.dispatchEvent(new PointerEvent('pointermove',
                { clientX: x, clientY: y, pointerType: 'mouse', bubbles: true }));
            }""", [x, y])
        page.evaluate("(ts) => window.__step(ts)", t)
        if frame % 6 == 0:   # sample every ~100 ms
            s = page.evaluate("([c, r]) => window.__DBG.sample(c, r)", [COLS, ROWS])
            samples.append((round(t, 2), s))
        t += DT
        frame += 1
    err = page.evaluate("window.__err || null")
    if err: errors.append(err)
    browser.close()
    return samples, anchor, errors

with sync_playwright() as pw:
    sA, anchorA, errA = run_page(pw, 'file://' + tmp_before)
    sB, anchorB, errB = run_page(pw, 'file://' + tmp_after)

assert [t for t, _ in sA] == [t for t, _ in sB], 'sample-time mismatch'
max_dev = 0.0
max_where = None
for (tA, nodesA), (tB, nodesB) in zip(sA, sB):
    for ci in range(len(COLS)):
        for ri in range(len(ROWS)):
            xa, ya = nodesA[ci][ri]
            xb, yb = nodesB[ci][ri]
            dx = abs(xa - xb)
            dy = abs((ya - anchorA) - (yb - anchorB))
            if dx > max_dev: max_dev, max_where = dx, (tA, COLS[ci], ROWS[ri], 'x')
            if dy > max_dev: max_dev, max_where = dy, (tA, COLS[ci], ROWS[ri], 'y-rel')

print('=== PHYSICS LOCK RESULT ===')
print('anchor topY before:', anchorA, ' after:', anchorB, ' (vertical line shift only)')
print('samples:', len(sA), 'times x', len(COLS) * len(ROWS), 'nodes')
print('max deviation: %.6f design px' % max_dev)
if max_where: print('  at t=%s col=%s row=%s axis=%s' % max_where)
print('page errors before:', errA)
print('page errors after :', errB)
ok = max_dev < 1e-6 and not errA and not errB
print('VERDICT:', 'PASS — trajectories identical' if ok else 'FAIL')
sys.exit(0 if ok else 1)
