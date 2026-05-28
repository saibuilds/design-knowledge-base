import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const OUTPUT_FILE = path.resolve(__dirname, '../md/components/aceternity-full.md');
const TIMEOUT = 30000;
const scraped = [];
const skipped = [];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getCode(page) {
  // Click "Code" tab if present
  for (const sel of ['button:has-text("Code")', '[role="tab"]:has-text("Code")', 'button:has-text("code")']) {
    try { const b = await page.$(sel); if (b) { await b.click(); await sleep(1500); break; } } catch {}
  }
  // Get longest code block
  try {
    const codes = await page.$$eval('pre, code', els =>
      els.map(e => e.innerText).filter(t => t && t.trim().length > 100)
    );
    if (codes.length) return codes.sort((a,b) => b.length - a.length)[0].trim();
  } catch {}
  return null;
}

async function scrapeComponentList(page) {
  await page.goto('https://ui.aceternity.com/components', { waitUntil: 'networkidle', timeout: TIMEOUT });
  await sleep(3000);
  const links = await page.$$eval('a[href*="/components/"]', els =>
    els.map(e => ({ href: e.href.startsWith('http') ? e.href : 'https://ui.aceternity.com' + e.getAttribute('href'), text: e.innerText.trim() }))
      .filter(e => e.text && e.href.includes('/components/') && !e.href.endsWith('/components'))
  );
  return [...new Map(links.map(l => [l.href, l])).values()];
}

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);

  console.log('=== Scraping Aceternity UI ===');
  const links = await scrapeComponentList(page);
  console.log(`Found ${links.length} component pages`);

  for (const link of links) {
    console.log(`  Scraping: ${link.text} — ${link.href}`);
    try {
      await page.goto(link.href, { waitUntil: 'networkidle', timeout: TIMEOUT });
      await sleep(2000);
      const code = await getCode(page);
      if (code) {
        const deps = (code.match(/^import .+ from ['"]([^'"]+)['"]/gm) || [])
          .map(l => l.match(/from ['"]([^'"]+)['"]/)?.[1])
          .filter(d => d && !d.startsWith('.') && !d.startsWith('@/') && !d.startsWith('react'))
          .filter(Boolean);
        scraped.push({ name: `Aceternity: ${link.text}`, url: link.href, code, deps: [...new Set(deps)] });
        console.log(`    ✓ ${code.length} chars`);
      } else {
        skipped.push({ name: link.text, url: link.href, reason: 'No code found' });
        console.log(`    ✗ No code`);
      }
    } catch (err) {
      skipped.push({ name: link.text, url: link.href, reason: err.message });
      console.log(`    ✗ ${err.message}`);
    }
    await sleep(1200);
  }

  let md = `# Aceternity UI — Full Component Source Code\n\n> Scraped: ${new Date().toISOString()}\n> Total: ${scraped.length}\n\n---\n\n`;
  for (const c of scraped) {
    md += `## ${c.name}\n> Source: ${c.url}\n`;
    if (c.deps.length) md += `> Dependencies: ${c.deps.join(', ')}\n`;
    md += `\n\`\`\`tsx\n${c.code}\n\`\`\`\n\n---\n\n`;
  }
  if (skipped.length) {
    md += `## Skipped\n`;
    for (const s of skipped) md += `- **${s.name}**: ${s.reason}\n`;
  }
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, md, 'utf8');
  console.log(`\n✓ Done: ${scraped.length} components → ${OUTPUT_FILE}`);
  await browser.close();
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
