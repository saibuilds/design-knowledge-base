import { chromium } from 'playwright';
import { readdirSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMOS_DIR = resolve(__dirname, '../html-demos');
const SCREENSHOTS_DIR = resolve(__dirname, '../screenshots');

mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const htmlFiles = readdirSync(DEMOS_DIR)
  .filter(f => f.endsWith('.html'))
  .map(f => ({ name: f.replace('.html', ''), path: join(DEMOS_DIR, f) }));

try {
  const patterns = readdirSync(join(DEMOS_DIR, 'patterns'))
    .filter(f => f.endsWith('.html'))
    .map(f => ({ name: 'patterns-' + f.replace('.html', ''), path: join(DEMOS_DIR, 'patterns', f) }));
  htmlFiles.push(...patterns);
} catch {}

// 30 scroll positions evenly spaced (0% to 100%)
const SCROLL_STEPS = 30;

async function screenshotFile(page, file) {
  const url = `file:///${file.path.replace(/\\/g, '/')}`;
  console.log(`📸 ${file.name}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);

    const dir = join(SCREENSHOTS_DIR, file.name);
    mkdirSync(dir, { recursive: true });

    // Full-page
    await page.screenshot({ path: join(dir, '00-fullpage.png'), fullPage: true });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewH = await page.evaluate(() => window.innerHeight);
    const maxScroll = totalHeight - viewH;

    for (let i = 0; i < SCROLL_STEPS; i++) {
      const pct = i / (SCROLL_STEPS - 1);
      const scrollY = Math.floor(pct * maxScroll);
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(200);
      const label = String(i + 1).padStart(2, '0');
      await page.screenshot({
        path: join(dir, `${label}-scroll-${Math.round(pct * 100)}pct.png`),
      });
    }

    console.log(`  ✓ ${SCROLL_STEPS + 1} shots → screenshots/${file.name}/`);
  } catch (err) {
    console.error(`  ✗ ${file.name}: ${err.message}`);
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`\nScreenshotting ${htmlFiles.length} HTML demos (30 shots each)...\n`);

  for (const file of htmlFiles) {
    await screenshotFile(page, file);
  }

  await browser.close();
  console.log(`\n✅ Done. Screenshots saved to: ${SCREENSHOTS_DIR}`);
})();
