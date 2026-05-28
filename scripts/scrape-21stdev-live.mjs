import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const OUTPUT_FILE = path.resolve(__dirname, '../md/components/21stdev-full.md');
const TIMEOUT = 45000;
const scraped = [];
const skipped = [];

const CATEGORIES = [
  'button', 'hero', 'navbar-navigation', 'card', 'text', 'background',
  'features', 'testimonials', 'pricing-section', 'footer', 'form',
  'modal-dialog', 'tabs', 'accordion', 'dock', 'call-to-action',
  'scroll-area', 'border', 'badge', 'toast', 'input', 'carousel',
  'sidebar', 'spinner-loader', 'tooltip',
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getCode(page) {
  for (const sel of ['button:has-text("Code")', '[role="tab"]:has-text("Code")', '[data-value="code"]']) {
    try { const b = await page.$(sel); if (b) { await b.click(); await sleep(1500); break; } } catch {}
  }
  try {
    const codes = await page.$$eval('pre, code', els =>
      els.map(e => e.innerText).filter(t => t && t.trim().length > 80)
    );
    if (codes.length) return codes.sort((a,b) => b.length - a.length)[0].trim();
  } catch {}
  return null;
}

async function getComponentLinks(page, category) {
  const url = `https://21st.dev/community/components/s/${category}`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await sleep(3000);
    // scroll to load more
    for (let i = 0; i < 3; i++) { await page.keyboard.press('End'); await sleep(1200); }
    const links = await page.$$eval('a[href*="/community/components/"]', els =>
      els.map(e => ({ href: e.href, text: e.innerText.trim() }))
        .filter(e => e.href.match(/\/community\/components\/[^/]+\/[^/]+\//) && !e.href.includes('/community/components/s/'))
    );
    return [...new Map(links.map(l => [l.href, l])).values()];
  } catch (err) {
    console.log(`  Category ${category} error: ${err.message.slice(0,60)}`);
    return [];
  }
}

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);

  console.log('=== Scraping 21st.dev ===');

  const allLinks = new Map();
  for (const cat of CATEGORIES) {
    console.log(`  Category: ${cat}`);
    const links = await getComponentLinks(page, cat);
    for (const l of links) allLinks.set(l.href, l);
    console.log(`    → ${links.length} components (total: ${allLinks.size})`);
    await sleep(800);
  }

  console.log(`\nTotal unique components: ${allLinks.size}`);

  for (const link of allLinks.values()) {
    console.log(`  Scraping: ${link.text || link.href}`);
    try {
      await page.goto(link.href, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
      await sleep(2500);
      const code = await getCode(page);
      if (code) {
        const deps = (code.match(/^import .+ from ['"]([^'"]+)['"]/gm) || [])
          .map(l => l.match(/from ['"]([^'"]+)['"]/)?.[1])
          .filter(d => d && !d.startsWith('.') && !d.startsWith('@/') && !d.startsWith('react'))
          .filter(Boolean);
        scraped.push({ name: `21st.dev: ${link.text || link.href}`, url: link.href, code, deps: [...new Set(deps)] });
        console.log(`    ✓ ${code.length} chars`);
      } else {
        skipped.push({ name: link.text, url: link.href, reason: 'No code found' });
        console.log(`    ✗ No code`);
      }
    } catch (err) {
      skipped.push({ name: link.text, url: link.href, reason: err.message });
      console.log(`    ✗ ${err.message.slice(0,80)}`);
    }
    await sleep(1000);
  }

  let md = `# 21st.dev — Full Component Source Code\n\n> Scraped: ${new Date().toISOString()}\n> Total: ${scraped.length}\n\n---\n\n`;
  for (const c of scraped) {
    md += `## ${c.name}\n> Source: ${c.url}\n`;
    if (c.deps.length) md += `> Dependencies: ${c.deps.join(', ')}\n`;
    md += `\n\`\`\`tsx\n${c.code}\n\`\`\`\n\n---\n\n`;
  }
  if (skipped.length) {
    md += `## Skipped\n`;
    for (const s of skipped) md += `- **${s.name}**: ${s.reason.slice(0,120)}\n`;
  }
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, md, 'utf8');
  console.log(`\n✓ Done: ${scraped.length} components → ${OUTPUT_FILE}`);
  await browser.close();
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
