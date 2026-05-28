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
    console.error(`  [skip] ${url} — ${e.message.slice(0, 80)}`);
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

const COMPONENTS = [
  'accordion','autocomplete','avatar','badge','button','calendar','card','checkbox',
  'chip','circular-progress','code','date-picker','date-range-picker','divider',
  'drawer','dropdown','image','input','kbd','link','listbox','modal','navbar',
  'pagination','popover','progress','radio-group','select','skeleton','slider',
  'snippet','spacer','spinner','switch','table','tabs','textarea','tooltip','user'
];

async function scrapeNextUI(browser) {
  console.log('\n=== NextUI / HeroUI ===');
  const scraped = [];

  for (const comp of COMPONENTS) {
    const url = `https://nextui.org/docs/components/${comp}`;
    const result = await safePage(browser, url, async (page) => {
      await sleep(1200);
      const codes = await page.$$eval('pre code', (els) =>
        els.map((e) => e.innerText).filter((t) => t.length > 100)
      );
      const best = codes.sort((a, b) => b.length - a.length)[0];
      return best ? { name: comp, url, code: best } : null;
    });
    if (result) {
      result.deps = extractDeps(result.code);
      scraped.push(result);
      console.log(`  OK ${comp} (${result.code.length} chars)`);
    } else {
      console.log(`  NO ${comp}`);
    }
    await sleep(300);
  }

  let md = `# NextUI — Full Component Reference\n\n> Scraped: ${new Date().toISOString()}\n> Total: ${scraped.length}\n\n---\n\n`;
  for (const c of scraped) {
    md += `## ${c.name}\n> Source: ${c.url}\n`;
    if (c.deps.length) md += `> Dependencies: ${c.deps.join(', ')}\n`;
    md += `\n\`\`\`tsx\n${c.code}\n\`\`\`\n\n---\n\n`;
  }
  writeFileSync(`${OUT_DIR}/nextui-full.md`, md, 'utf8');
  console.log(`\nSaved ${scraped.length} -> ${OUT_DIR}/nextui-full.md`);
}

const browser = await chromium.launch({ headless: false });
try {
  await scrapeNextUI(browser);
} finally {
  await browser.close();
}
