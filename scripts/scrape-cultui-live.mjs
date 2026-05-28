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

function write(path, content) {
  writeFileSync(path, content, 'utf8');
  console.log(`Saved: ${path}`);
}

function extractDeps(code) {
  const lines = code.split('\n').filter((l) => l.trim().startsWith('import '));
  const pkgs = new Set();
  for (const line of lines) {
    const m = line.match(/from\s+['"]([^'"]+)['"]/);
    if (m && !m[1].startsWith('.') && !m[1].startsWith('/')) pkgs.add(m[1]);
  }
  return [...pkgs];
}

async function scrapeCultUI(browser) {
  console.log('\n=== Cult UI ===');
  const baseUrl = 'https://www.cult-ui.com';

  // Try /components page first, then homepage
  let links = await safePage(browser, `${baseUrl}/components`, async (page) => {
    await sleep(2500);
    return page.$$eval('a[href]', (els) => {
      const seen = new Set();
      return els
        .map((e) => e.href)
        .filter((h) => {
          try {
            const u = new URL(h);
            return (
              u.hostname.includes('cult-ui.com') &&
              u.pathname.length > 1 &&
              !seen.has(h) &&
              seen.add(h)
            );
          } catch (_) {
            return false;
          }
        });
    });
  });

  if (!links || links.length < 3) {
    console.log('Trying homepage for links...');
    links = await safePage(browser, baseUrl, async (page) => {
      await sleep(3000);
      return page.$$eval('a[href]', (els) => {
        const seen = new Set();
        return els
          .map((e) => e.href)
          .filter((h) => {
            try {
              const u = new URL(h);
              return (
                u.hostname.includes('cult-ui.com') &&
                u.pathname.length > 1 &&
                !seen.has(h) &&
                seen.add(h)
              );
            } catch (_) {
              return false;
            }
          });
      });
    });
  }

  if (!links || links.length === 0) {
    console.error('Cult UI: no links found');
    return '';
  }

  // Filter to component-like paths: /components/*, /docs/components/*, etc.
  const componentLinks = links.filter((h) => {
    try {
      const u = new URL(h);
      const p = u.pathname;
      return (
        p.split('/').filter(Boolean).length >= 1 &&
        !p.includes('#') &&
        !/\.(png|jpg|svg|ico|css|js)$/i.test(p) &&
        (p.includes('component') || p.includes('docs') || p.split('/').filter(Boolean).length >= 2)
      );
    } catch (_) {
      return false;
    }
  });

  const dedupedLinks = [...new Set(componentLinks)];
  console.log(`Found ${dedupedLinks.length} component pages`);
  const sections = [];

  for (const url of dedupedLinks) {
    const name = url
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Unknown';
    console.log(`  Scraping: ${name}`);

    const result = await safePage(browser, url, async (page) => {
      await sleep(2500);

      // Click Code tab if present
      try {
        const tabs = await page.$$('button[role="tab"], [role="tab"], button');
        for (const tab of tabs) {
          const text = await tab.innerText().catch(() => '');
          if (/^(code|source|tsx|jsx)$/i.test(text.trim())) {
            await tab.click();
            await sleep(800);
            break;
          }
        }
      } catch (_) {}

      const blocks = await page.$$eval('pre code, pre', (els) =>
        els.map((el) => el.innerText?.trim()).filter(Boolean)
      );

      const longBlocks = blocks.filter((b) => b.length > 80);
      const tsxBlocks = longBlocks.filter(
        (b) => b.includes('import') || b.includes('export') || b.includes('return (')
      );
      if (tsxBlocks.length) return tsxBlocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      if (longBlocks.length) return longBlocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      return null;
    });

    if (result) {
      const deps = extractDeps(result);
      const depsNote = deps.length ? `\n> Dependencies: ${deps.join(', ')}` : '';
      sections.push(`## ${name}\n> Source: ${url}${depsNote}\n\n\`\`\`tsx\n${result}\n\`\`\``);
    } else {
      console.log(`  [no code] ${name}`);
    }
  }

  return sections.join('\n\n---\n\n');
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  try {
    const content = await scrapeCultUI(browser);

    write(
      `${OUT_DIR}/cultui-full.md`,
      `# Cult UI — Full Component Source\n\nScraped: ${new Date().toISOString()}\n\n---\n\n${content || '_No content extracted_'}`
    );
  } finally {
    await browser.close();
  }

  const { execSync } = await import('child_process');
  const cwd = 'C:/Users/Admin/Downloads/design-knowledge-base';
  try {
    execSync('git add md/components/cultui-full.md scripts/scrape-cultui-live.mjs', {
      cwd,
      stdio: 'inherit',
    });
    execSync('git commit -m "Add scraped source: cult-ui components"', { cwd, stdio: 'inherit' });
    execSync('git push origin master', { cwd, stdio: 'inherit' });
    console.log('\nGit push complete.');
  } catch (e) {
    console.error('Git error:', e.message);
  }
})();
