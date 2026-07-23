import asyncio, os
from playwright.async_api import async_playwright

OUT = '/mnt/agents/output/shots/trans_rt'
os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width':1848,'height':1080}, device_scale_factor=1)
        await pg.goto('file:///mnt/agents/output/silk-atlas/index.html')
        await pg.wait_for_timeout(2500)
        await pg.mouse.click(1698, 330)  # right card -> Japan
        for i in range(9):
            # jpeg = fast encode, less skew
            await pg.screenshot(path=f'{OUT}/r{i:02d}.jpg', type='jpeg', quality=60)
            await pg.wait_for_timeout(200)
        # count hint elements after switch
        n = await pg.evaluate("document.querySelectorAll('#hint').length")
        txt = await pg.evaluate("[...document.querySelectorAll('#hint')].map(e=>e.textContent).join('|')")
        print('hint count:', n, 'text:', txt)
        await b.close()
asyncio.run(main())
print('done')
