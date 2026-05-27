import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('screenshots/awwwards-actual-winners');
mkdirSync(OUT, { recursive: true });

// Real Awwwards SOTD winners (verifiable URLs from awwwards.com)
const SITES = [
  { slug: 'resn-co-nz', url: 'https://resn.co.nz' },
  { slug: 'locomotive-ca', url: 'https://locomotive.ca' },
  { slug: 'obys-agency', url: 'https://obys.agency' },
  { slug: 'activetheory', url: 'https://activetheory.net' },
  { slug: 'lusion-co', url: 'https://lusion.co' },
  { slug: 'unit9', url: 'https://unit9.com' },
  { slug: 'jam3', url: 'https://jam3.com' },
  { slug: 'epic-net', url: 'https://epic.net' },
  { slug: 'buildinamsterdam', url: 'https://www.buildinamsterdam.com' },
  { slug: 'immersive-garden', url: 'https://www.immersive-g.com' },
  { slug: 'merci-michel', url: 'https://www.merci-michel.com' },
  { slug: 'aristide-benoist', url: 'https://www.aristidebenoist.com' },
  { slug: 'adrien-gervaix', url: 'https://www.adriengervaix.com' },
  { slug: 'papaya', url: 'https://www.papayafilms.com' },
  { slug: 'dogstudio', url: 'https://dogstudio.co' },
];

const SCROLL_STEPS = 10;

async function shoot(page, site) {
  console.log(`📸 ${site.slug}`);
  const dir = resolve(OUT, site.slug);
  mkdirSync(dir, { recursive: true });
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${dir}/00-fullpage.png`, fullPage: true });
    const maxScroll = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    for (let i = 0; i <= SCROLL_STEPS; i++) {
      const y = Math.floor((i / SCROLL_STEPS) * maxScroll);
      await page.evaluate(s => window.scrollTo(0, s), y);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${dir}/${String(i+1).padStart(2,'0')}-scroll-${Math.round(i/SCROLL_STEPS*100)}pct.png` });
    }
    console.log(`  ✓ ${SCROLL_STEPS + 2} shots`);
  } catch(e) { console.error(`  ✗ ${e.message.slice(0,80)}`); }
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const site of SITES) await shoot(page, site);
  await browser.close();
  console.log('\n✅ Done →', OUT);
})();
