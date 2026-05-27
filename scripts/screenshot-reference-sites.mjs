/**
 * screenshot-reference-sites.mjs
 * Screenshots award-winning / reference websites at 8 scroll positions + full-page.
 * Requires: npm install playwright (run once), then: npx playwright install chromium
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SCREENSHOT_BASE = 'C:/Users/Admin/Downloads/design-knowledge-base/screenshots/reference-sites';

const SITES = [
  // Luxury Real Estate
  { url: 'https://www.harveykalles.com',      folder: 'harveykalles' },
  { url: 'https://www.sothebysrealty.ca',     folder: 'sothebysrealty' },
  { url: 'https://www.compassrealestate.com', folder: 'compassrealestate' },
  // Renovation / Construction
  { url: 'https://www.penguin-basements.ca',  folder: 'penguin-basements' },
  { url: 'https://www.nusitegroup.com',       folder: 'nusitegroup' },
  { url: 'https://www.builddirect.com',       folder: 'builddirect' },
  // Hotels / Resorts
  { url: 'https://www.aman.com',              folder: 'aman' },
  { url: 'https://www.sixsenses.com',         folder: 'sixsenses' },
  // Garden Suites / ADU
  { url: 'https://lanehomes.ca',              folder: 'lanehomes' },
  { url: 'https://beespace.ca',               folder: 'beespace' },
  // Agency portfolios
  { url: 'https://locomotive.ca',             folder: 'locomotive' },
  { url: 'https://resn.co.nz',               folder: 'resn' },
];

const SCROLL_PERCENTS = [0, 15, 30, 45, 60, 75, 90, 100];

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

    // Block heavy resources to speed things up
    await page.route('**/*.{mp4,webm,ogg,woff,woff2}', route => route.abort().catch(() => {}));

    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    } catch (err) {
      // Try load event as fallback
      await page.goto(site.url, { waitUntil: 'load', timeout: 20000 });
    }

    // Wait briefly for any animations / lazy images
    await page.waitForTimeout(1500);

    // Dismiss cookie/overlay dialogs
    try { await page.keyboard.press('Escape'); } catch (_) {}
    await page.waitForTimeout(300);

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

    for (let i = 0; i < SCROLL_PERCENTS.length; i++) {
      const pct = SCROLL_PERCENTS[i];
      const maxScroll = Math.max(0, pageHeight - viewH);
      const scrollY = Math.round((pct / 100) * maxScroll);

      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
      await page.waitForTimeout(500);

      const filename = `0${i + 1}-scroll-${pct}pct.png`;
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
