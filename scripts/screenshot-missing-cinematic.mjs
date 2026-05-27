import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMOS_DIR = resolve(__dirname, '../html-demos');
const OUT_DIR = resolve(__dirname, '../screenshots/demos-cinematic');

const MISSING = [
  'awwwards-renovation-luxury',
  'awwwards-real-estate-luxury',
  'awwwards-scroll-storytelling',
  'awwwards-navigation-patterns',
  'awwwards-typography-motion',
  'hotel-resort-award-style',
  'real-estate-award-style',
  'renovation-award-style',
];

const VIEWPORT = { width: 1440, height: 900 };
const SCROLL_PX = 80;
const PAUSE_MS = 120;

async function filmPage(page, name) {
  const filePath = join(DEMOS_DIR, name + '.html');
  const url = `file:///${filePath.replace(/\\/g, '/')}`;
  console.log(`🎬 ${name}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    const dir = join(OUT_DIR, name);
    mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: join(dir, '000-fullpage.png'), fullPage: true });
    const totalH = await page.evaluate(() => document.body.scrollHeight);
    const maxScroll = totalH - VIEWPORT.height;
    let y = 0, frame = 1;
    while (y <= maxScroll) {
      await page.evaluate(s => window.scrollTo({ top: s, behavior: 'instant' }), y);
      await page.waitForTimeout(PAUSE_MS);
      await page.screenshot({ path: join(dir, `${String(frame).padStart(4,'0')}-y${y}.png`) });
      frame++;
      if (y === maxScroll) break;
      y = Math.min(y + SCROLL_PX, maxScroll);
    }
    console.log(`  ✓ ${frame} frames`);
  } catch (e) { console.error(`  ✗ ${e.message}`); }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize(VIEWPORT);
  for (const name of MISSING) await filmPage(page, name);
  await browser.close();
  console.log('\n✅ Done');
})();
