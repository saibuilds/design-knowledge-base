/**
 * screenshot-more-sites.mjs
 * Screenshots luxury, editorial, and award-winning websites at 10 scroll positions + full-page.
 * Viewport: 1440x900. Fonts and video blocked for speed. Timeout: 20s per site.
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SCREENSHOT_BASE = 'C:/Users/Admin/Downloads/design-knowledge-base/screenshots/reference-sites';

const SITES = [
  // Luxury/Editorial Real Estate
  { url: 'https://www.theagency.com',        folder: 'theagency' },
  { url: 'https://www.elliman.com',           folder: 'elliman' },
  { url: 'https://www.knightfrank.com',       folder: 'knightfrank' },
  // Luxury Hotels
  { url: 'https://www.rosewoodhotels.com',    folder: 'rosewoodhotels' },
  { url: 'https://www.belmond.com',           folder: 'belmond' },
  { url: 'https://www.fourseasons.com',       folder: 'fourseasons' },
  // Kitchen/Interior Design
  { url: 'https://www.smallbone.co.uk',       folder: 'smallbone' },
  { url: 'https://www.henrybuilt.com',        folder: 'henrybuilt' },
  { url: 'https://www.poggenpohlusa.com',     folder: 'poggenpohlusa' },
  // Award-winning agencies
  { url: 'https://www.bye.agency',            folder: 'bye-agency' },
  { url: 'https://obys.agency',               folder: 'obys-agency' },
  { url: 'https://www.flightlessstudio.com',  folder: 'flightlessstudio' },
  { url: 'https://unfoldstudio.com',          folder: 'unfoldstudio' },
  // Renovation/Construction
  { url: 'https://www.penguinbasements.com',  folder: 'penguinbasements' },
  { url: 'https://renomark.ca',               folder: 'renomark' },
];

// 10 scroll positions: 0% through 100%
const SCROLL_PERCENTS = [0, 11, 22, 33, 44, 55, 66, 77, 88, 100];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function screenshotSite(browser, site) {
  const dir = path.join(SCREENSHOT_BASE, site.folder);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  let context;
  try {
    context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: UA,
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    // Block fonts and video for speed
    await page.route('**/*.{mp4,webm,ogg,woff,woff2,ttf,otf,eot}', route => route.abort().catch(() => {}));

    let navigated = false;
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      navigated = true;
    } catch (_) {}

    if (!navigated) {
      try {
        await page.goto(site.url, { waitUntil: 'load', timeout: 20000 });
        navigated = true;
      } catch (err) {
        throw new Error(`Navigation failed: ${err.message}`);
      }
    }

    // Brief wait for lazy images and animations
    await page.waitForTimeout(1800);

    // Dismiss overlays
    try { await page.keyboard.press('Escape'); } catch (_) {}
    await page.waitForTimeout(400);

    // --- Full-page screenshot ---
    try {
      await page.screenshot({
        path: path.join(dir, '00-fullpage.png'),
        fullPage: true,
        timeout: 15000,
      });
      console.log(`  ✓ ${site.folder}/00-fullpage.png`);
    } catch (err) {
      console.error(`  ✗ ${site.folder}/00-fullpage.png — ${err.message}`);
    }

    // --- Scroll position screenshots ---
    const pageHeight = await page.evaluate(() =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    );
    const viewH = 900;
    const maxScroll = Math.max(0, pageHeight - viewH);

    for (let i = 0; i < SCROLL_PERCENTS.length; i++) {
      const pct = SCROLL_PERCENTS[i];
      const scrollY = Math.round((pct / 100) * maxScroll);

      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
      await page.waitForTimeout(500);

      const idx = String(i + 1).padStart(2, '0');
      const filename = `${idx}-scroll-${pct}pct.png`;
      try {
        await page.screenshot({
          path: path.join(dir, filename),
          fullPage: false,
          timeout: 10000,
        });
        console.log(`  ✓ ${site.folder}/${filename}`);
      } catch (err) {
        console.error(`  ✗ ${site.folder}/${filename} — ${err.message}`);
      }
    }

    await context.close();
    console.log(`[DONE] ${site.folder}\n`);
  } catch (err) {
    console.error(`[ERROR] ${site.folder} (${site.url}): ${err.message}\n`);
    if (context) {
      try { await context.close(); } catch (_) {}
    }
  }
}

async function main() {
  await mkdir(SCREENSHOT_BASE, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  console.log(`Screenshotting ${SITES.length} sites...\n`);

  for (const site of SITES) {
    console.log(`[START] ${site.folder} — ${site.url}`);
    await screenshotSite(browser, site);
  }

  await browser.close();
  console.log('[ALL DONE] All screenshots complete.');
}

main().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
