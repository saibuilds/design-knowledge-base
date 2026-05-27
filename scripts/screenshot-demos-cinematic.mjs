/**
 * Cinematic scroll-through screenshotter
 * Simulates a user scrolling through each page at ~60px/tick, 1 frame per second of real scroll time.
 * Each page gets 60-120+ frames depending on page height.
 */
import { chromium } from 'playwright';
import { readdirSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMOS_DIR = resolve(__dirname, '../html-demos');
const OUT_DIR = resolve(__dirname, '../screenshots/demos-cinematic');

mkdirSync(OUT_DIR, { recursive: true });

// Collect all HTML files
const htmlFiles = [];
for (const f of readdirSync(DEMOS_DIR)) {
  if (f.endsWith('.html')) htmlFiles.push({ name: f.replace('.html',''), path: join(DEMOS_DIR, f) });
}
try {
  for (const f of readdirSync(join(DEMOS_DIR, 'patterns'))) {
    if (f.endsWith('.html')) htmlFiles.push({ name: 'patterns-' + f.replace('.html',''), path: join(DEMOS_DIR, 'patterns', f) });
  }
} catch {}

const VIEWPORT = { width: 1440, height: 900 };
const SCROLL_PX_PER_FRAME = 80;   // pixels scrolled per frame
const FRAME_PAUSE_MS = 120;        // pause between frames (fast but captures transitions)
const SETTLE_MS = 2000;            // wait for page load + GSAP init

async function filmPage(page, file) {
  const url = `file:///${file.path.replace(/\\/g, '/')}`;
  console.log(`\n🎬 ${file.name}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(SETTLE_MS);

    const dir = join(OUT_DIR, file.name);
    mkdirSync(dir, { recursive: true });

    // Full-page reference shot
    await page.screenshot({ path: join(dir, '000-fullpage.png'), fullPage: true });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const maxScroll = totalHeight - VIEWPORT.height;
    const totalFrames = Math.ceil(maxScroll / SCROLL_PX_PER_FRAME);

    console.log(`  Page height: ${totalHeight}px → ~${totalFrames} frames`);

    let scrollY = 0;
    let frame = 1;

    while (scrollY <= maxScroll) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
      await page.waitForTimeout(FRAME_PAUSE_MS);
      const label = String(frame).padStart(4, '0');
      await page.screenshot({ path: join(dir, `${label}-y${scrollY}.png`) });
      frame++;
      scrollY = Math.min(scrollY + SCROLL_PX_PER_FRAME, maxScroll);
      if (scrollY === maxScroll && frame > 1) break;
    }

    // Extra: hover states on key interactive elements
    const interactiveSelectors = ['button', 'a.btn', '.project-card', '.suite-tab', '.filter-tab'];
    for (const sel of interactiveSelectors) {
      try {
        const el = page.locator(sel).first();
        await el.scrollIntoViewIfNeeded({ timeout: 1000 });
        await el.hover({ timeout: 1000 });
        await page.waitForTimeout(300);
        const label = String(frame).padStart(4, '0');
        await page.screenshot({ path: join(dir, `${label}-hover-${sel.replace(/[^a-z]/g,'-')}.png`) });
        frame++;
      } catch {}
    }

    console.log(`  ✓ ${frame - 1} frames saved → screenshots/demos-cinematic/${file.name}/`);
  } catch (err) {
    console.error(`  ✗ ${file.name}: ${err.message}`);
  }
}

(async () => {
  console.log(`\n🎬 Cinematic scroll capture — ${htmlFiles.length} demos\n`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize(VIEWPORT);

  for (const file of htmlFiles) {
    await filmPage(page, file);
  }

  await browser.close();
  console.log(`\n✅ All done. Frames at: ${OUT_DIR}`);
  console.log(`\nRun: git add screenshots/ && git commit -m "Add cinematic scroll frames for all HTML demos" && git push origin master`);
})();
