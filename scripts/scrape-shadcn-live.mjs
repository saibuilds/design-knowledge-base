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

// shadcn/ui component list
const COMPONENTS = [
  'accordion','alert','alert-dialog','aspect-ratio','avatar','badge','breadcrumb',
  'button','calendar','card','carousel','chart','checkbox','collapsible','command',
  'combobox','context-menu','data-table','date-picker','dialog','drawer','dropdown-menu',
  'form','hover-card','input','input-otp','label','menubar','navigation-menu',
  'pagination','popover','progress','radio-group','resizable','scroll-area',
  'select','separator','sheet','sidebar','skeleton','slider','sonner','switch',
  'table','tabs','textarea','timeline','toast','toggle','toggle-group','tooltip'
];

async function scrapeShadcn(browser) {
  console.log('\n=== shadcn/ui ===');
  const baseUrl = 'https://ui.shadcn.com/docs/components';
  const scraped = [];

  for (const comp of COMPONENTS) {
    const url = `${baseUrl}/${comp}`;
    const result = await safePage(browser, url, async (page) => {
      await sleep(1000);
      // Click "Code" tab to get source
      try {
        const codeBtn = await page.$('[role="tab"]:has-text("Code"), button:has-text("Code")');
        if (codeBtn) { await codeBtn.click(); await sleep(400); }
      } catch {}
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
    await sleep(200);
  }

  let md = `# shadcn/ui — Full Component Reference\n\n> Scraped: ${new Date().toISOString()}\n> Total: ${scraped.length}\n\n---\n\n`;
  for (const c of scraped) {
    md += `## ${c.name}\n> Source: ${c.url}\n`;
    if (c.deps.length) md += `> Dependencies: ${c.deps.join(', ')}\n`;
    md += `\n\`\`\`tsx\n${c.code}\n\`\`\`\n\n---\n\n`;
  }
  writeFileSync(`${OUT_DIR}/shadcn-full.md`, md, 'utf8');
  console.log(`\nSaved ${scraped.length} components -> ${OUT_DIR}/shadcn-full.md`);
}

const browser = await chromium.launch({ headless: false });
try {
  await scrapeShadcn(browser);
} finally {
  await browser.close();
}
