import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE_DIR = 'C:/Users/Admin/Downloads/design-knowledge-base/screenshots/reference-sites/spline';

function ensureDir(dir) {
  try { mkdirSync(dir, { recursive: true }); } catch {}
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 120);
    });
  });
}

async function scrollAndCapture(page, dir, prefix, count = 8) {
  ensureDir(dir);
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const step = Math.floor((totalHeight - viewportHeight) / (count - 1));

  for (let i = 0; i < count; i++) {
    const scrollY = Math.min(step * i, totalHeight - viewportHeight);
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: join(dir, `${prefix}-scroll-${i + 1}.png`),
      fullPage: false
    });
  }
}

async function screenshotFullPage(page, path) {
  await page.screenshot({ path, fullPage: true });
}

(async () => {
  ensureDir(BASE_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  // ── 1. spline.design homepage ─────────────────────────────────────────────
  {
    const page = await context.newPage();
    console.log('Navigating to spline.design...');
    try {
      await page.goto('https://spline.design', { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      await screenshotFullPage(page, join(BASE_DIR, 'homepage-full.png'));
      console.log('Saved homepage-full.png');
      await scrollAndCapture(page, BASE_DIR, 'homepage', 8);
      console.log('Saved 8 homepage scroll screenshots');
    } catch (e) {
      console.error('Homepage error:', e.message);
      try { await page.screenshot({ path: join(BASE_DIR, 'homepage-error.png') }); } catch {}
    }
    await page.close();
  }

  // ── 2. spline.design/examples or /community ───────────────────────────────
  for (const slug of ['examples', 'community']) {
    const page = await context.newPage();
    const url = `https://spline.design/${slug}`;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      const dir = join(BASE_DIR, slug);
      ensureDir(dir);
      await screenshotFullPage(page, join(dir, `${slug}-full.png`));
      await scrollAndCapture(page, dir, slug, 8);
      console.log(`Saved ${slug} screenshots`);
    } catch (e) {
      console.error(`${url} error:`, e.message);
      try {
        ensureDir(join(BASE_DIR, slug));
        await page.screenshot({ path: join(BASE_DIR, slug, `${slug}-error.png`) });
      } catch {}
    }
    await page.close();
  }

  // ── 3. app.spline.design/community ────────────────────────────────────────
  {
    const page = await context.newPage();
    const url = 'https://app.spline.design/community';
    console.log(`Navigating to ${url}...`);
    const dir = join(BASE_DIR, 'app-community');
    ensureDir(dir);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
      await page.waitForTimeout(5000);
      await screenshotFullPage(page, join(dir, 'app-community-full.png'));
      await scrollAndCapture(page, dir, 'app-community', 8);

      // ── 4. Capture individual thumbnails from the community grid ─────────
      const thumbnails = await page.$$eval(
        'img[src*="spline"], img[src*="thumbnail"], [class*="thumbnail"] img, [class*="card"] img, [class*="scene"] img, [class*="preview"] img',
        imgs => imgs.slice(0, 30).map((img, i) => ({ src: img.src, index: i }))
      );
      console.log(`Found ${thumbnails.length} thumbnail candidates`);

      // Also screenshot visible grid items by scrolling
      const gridDir = join(dir, 'grid-thumbnails');
      ensureDir(gridDir);
      let scrollPos = 0;
      const scrollStep = 600;
      let captureCount = 0;
      while (captureCount < 12) {
        await page.evaluate(y => window.scrollTo(0, y), scrollPos);
        await page.waitForTimeout(800);
        await page.screenshot({ path: join(gridDir, `grid-${captureCount + 1}.png`) });
        captureCount++;
        scrollPos += scrollStep;
        const atBottom = await page.evaluate(
          y => y + window.innerHeight >= document.body.scrollHeight,
          scrollPos
        );
        if (atBottom) break;
      }
      console.log(`Saved ${captureCount} grid thumbnail screenshots`);
    } catch (e) {
      console.error('app.spline.design error:', e.message);
      try { await page.screenshot({ path: join(dir, 'app-community-error.png') }); } catch {}
    }
    await page.close();
  }

  // ── 5. spline.design/features ─────────────────────────────────────────────
  {
    const page = await context.newPage();
    const url = 'https://spline.design/features';
    console.log(`Navigating to ${url}...`);
    const dir = join(BASE_DIR, 'features');
    ensureDir(dir);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      await screenshotFullPage(page, join(dir, 'features-full.png'));
      await scrollAndCapture(page, dir, 'features', 10);
      console.log('Saved features screenshots');
    } catch (e) {
      console.error('Features error:', e.message);
      try { await page.screenshot({ path: join(dir, 'features-error.png') }); } catch {}
    }
    await page.close();
  }

  await browser.close();
  console.log('Done. All screenshots saved to:', BASE_DIR);
})();
