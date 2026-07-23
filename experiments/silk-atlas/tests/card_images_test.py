import asyncio, threading, http.server, socketserver, functools, os, json
from playwright.async_api import async_playwright

ROOT = '/mnt/agents/output/silk-atlas'
PORT = 8931
URL = f'http://127.0.0.1:{PORT}/index.html'

def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    class Q(socketserver.TCPServer):
        allow_reuse_address = True
    srv = Q(('127.0.0.1', PORT), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

async def run():
    srv = serve()
    results = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])

        async def collect(page, label, vw, vh, block=()):
            reqs, resps, errs, perrs = {}, [], [], []
            page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            page.on('pageerror', lambda e: perrs.append(str(e)))
            page.on('response', lambda r: resps.append((r.status, r.url)))
            for pat in block:
                await page.route(pat, lambda rt: rt.abort())
            await page.set_viewport_size({'width': vw, 'height': vh})
            # hard refresh: bypass cache
            await page.goto(URL, wait_until='load')
            await page.evaluate('location.reload(true)')
            await page.wait_for_timeout(2600)
            cards = await page.evaluate('''() => {
              const out = {};
              document.querySelectorAll('.card img, .mchip img').forEach(im => {
                out[im.id || im.closest('.mchip').dataset.target] = {
                  src: im.currentSrc, naturalWidth: im.naturalWidth,
                  complete: im.complete, alt: im.alt,
                  visibility: getComputedStyle(im).visibility
                };
              });
              return out;
            }''')
            asset404 = [u for s, u in resps if s >= 400 and '/assets/' in u]
            asset_req = {u.split('/assets/')[-1]: s for s, u in resps if '/assets/' in u}
            shot = f'/mnt/agents/output/shots/fix_{label}.png'
            await page.screenshot(path=shot)
            results[label] = dict(cards=cards, asset404=asset404, asset_req=asset_req,
                                  console_errors=errs, page_errors=perrs, shot=shot)

        # 1. desktop 1920x1080, hard refresh
        await collect(await b.new_page(), 'desktop1920', 1920, 1080)
        # 2. mobile 390x844
        await collect(await b.new_page(), 'mobile390', 390, 844)
        # 3. japan webp blocked (both sizes) -> must fall through to png, still no broken UI
        await collect(await b.new_page(), 'japan_webp_blocked', 1920, 1080,
                      block=('**/assets/roof_japan.webp', '**/assets/roof_japan_lg.webp'))
        # 4. ALL japan images blocked -> neutral plate, img hidden, no errors
        await collect(await b.new_page(), 'japan_all_blocked', 1920, 1080,
                      block=('**/assets/roof_japan*',))
        await b.close()
    srv.shutdown()
    print(json.dumps(results, indent=1, ensure_ascii=False))

asyncio.run(run())
