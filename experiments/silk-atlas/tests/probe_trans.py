import asyncio, os
from playwright.async_api import async_playwright

OUT = '/mnt/agents/output/shots/trans'
os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width':1848,'height':1080}, device_scale_factor=1)
        await pg.goto('file:///mnt/agents/output/silk-atlas/index.html')
        await pg.wait_for_timeout(2500)
        # click right card (Japan)
        await pg.mouse.click(1698, 330)
        for i in range(14):
            await pg.screenshot(path=f'{OUT}/f{i:02d}_{i*120}ms.png')
            await pg.wait_for_timeout(120)
        await b.close()
asyncio.run(main())
print('done')
