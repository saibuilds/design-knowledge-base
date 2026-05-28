import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = 'C:/Users/Admin/Downloads/design-knowledge-base/md/components';
mkdirSync(OUT_DIR, { recursive: true });

const PAGE_TIMEOUT = 45000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function safePage(browser, url, fn) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: PAGE_TIMEOUT });
    return await fn(page);
  } catch (e) {
    console.error(`  [skip] ${url} — ${e.message}`);
    return null;
  } finally {
    await page.close();
  }
}

function extractDeps(code) {
  const pkgs = new Set();
  for (const line of code.split('\n')) {
    const m = line.match(/from\s+['"]([^'"]+)['"]/);
    if (m && !m[1].startsWith('.') && !m[1].startsWith('/')) pkgs.add(m[1]);
  }
  return [...pkgs];
}

async function scrapeOriginUI(browser) {
  console.log('\n=== Origin UI ===');
  const baseUrl = 'https://originui.com';

  const links = await safePage(browser, `${baseUrl}/components`, async (page) => {
    await sleep(2500);
    return page.$$eval('a[href]', (els) => {
      const seen = new Set();
      return els.map((e) => e.href).filter((h) => {
        try {
          const u = new URL(h);
          return u.hostname.includes('originui.com') && u.pathname.startsWith('/components/') && !seen.has(h) && seen.add(h);
        } catch { return false; }
      });
    });
  });

  console.log(`Found ${links?.length || 0} component links`);
  const scraped = [];

  for (const url of (links || []).slice(0, 80)) {
    const result = await safePage(browser, url, async (page) => {
      await sleep(1500);
      const name = url.split('/').pop();
      const codes = await page.$$eval('pre code, [class*="code"] pre, [data-rehype-pretty-code-fragment] code', (els) =>
        els.map((e) => e.innerText).filter((t) => t.length > 80)
      );
      const best = codes.sort((a, b) => b.length - a.length)[0];
      return best ? { name, url, code: best } : null;
    });
    if (result) {
      result.deps = extractDeps(result.code);
      scraped.push(result);
      console.log(`  OK ${result.name} (${result.code.length} chars)`);
    } else {
      console.log(`  NO ${url.split('/').pop()}`);
    }
    await sleep(300);
  }

  let md = `# Origin UI — Components\n\n> Scraped: ${new Date().toISOString()}\n> Total: ${scraped.length}\n\n---\n\n`;
  for (const c of scraped) {
    md += `## ${c.name}\n> Source: ${c.url}\n`;
    if (c.deps.length) md += `> Dependencies: ${c.deps.join(', ')}\n`;
    md += `\n\`\`\`tsx\n${c.code}\n\`\`\`\n\n---\n\n`;
  }
  writeFileSync(`${OUT_DIR}/originui-full.md`, md, 'utf8');
  console.log(`\nSaved ${scraped.length} components -> ${OUT_DIR}/originui-full.md`);
}

const browser = await chromium.launch({ headless: false });
try {
  await scrapeOriginUI(browser);
} finally {
  await browser.close();
}
