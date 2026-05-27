import { chromium } from 'C:/Users/Admin/Downloads/design-knowledge-base/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const OUT_DIR = 'C:/Users/Admin/Downloads/design-knowledge-base/md/components';
mkdirSync(OUT_DIR, { recursive: true });

const PAGE_TIMEOUT = 15000;

// ─── helpers ────────────────────────────────────────────────────────────────

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

// ─── Aceternity ─────────────────────────────────────────────────────────────

async function scrapeAceternity(browser) {
  console.log('\n=== Aceternity UI ===');
  const baseUrl = 'https://ui.aceternity.com';

  // Collect component links from the listing page
  const links = await safePage(browser, `${baseUrl}/components`, async (page) => {
    await page.waitForTimeout(2000);
    return page.$$eval('a[href^="/components/"]', (els) =>
      [...new Set(els.map((e) => e.href))].filter((h) => !h.endsWith('/components/'))
    );
  });

  if (!links || links.length === 0) {
    console.error('Aceternity: no component links found');
    return '';
  }

  console.log(`Found ${links.length} component pages`);
  const sections = [];

  for (const url of links) {
    const name = url.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    console.log(`  Scraping: ${name}`);

    const code = await safePage(browser, url, async (page) => {
      // Wait for code tabs to render
      await page.waitForTimeout(2500);

      // Try clicking a "Code" tab if present
      try {
        const codeTab = await page.$('button:has-text("Code"), [role="tab"]:has-text("Code")');
        if (codeTab) {
          await codeTab.click();
          await page.waitForTimeout(1000);
        }
      } catch (_) {}

      // Extract all <code> / <pre> blocks
      const blocks = await page.$$eval('pre code, pre', (els) =>
        els.map((el) => el.innerText?.trim()).filter(Boolean)
      );

      // Prefer the longest block that looks like TSX
      const tsxBlocks = blocks.filter(
        (b) => b.includes('import') || b.includes('export') || b.includes('return (')
      );
      if (tsxBlocks.length) return tsxBlocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      if (blocks.length) return blocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      return null;
    });

    if (code) {
      sections.push(`## ${name}\n> Source: ${url}\n\n\`\`\`tsx\n${code}\n\`\`\``);
    } else {
      console.log(`  [no code] ${name}`);
    }
  }

  return sections.join('\n\n---\n\n');
}

// ─── MagicUI ────────────────────────────────────────────────────────────────

async function scrapeMagicUI(browser) {
  console.log('\n=== MagicUI ===');
  const baseUrl = 'https://magicui.design';

  const links = await safePage(browser, `${baseUrl}/docs/components`, async (page) => {
    await page.waitForTimeout(2000);
    return page.$$eval('a[href^="/docs/components/"]', (els) =>
      [...new Set(els.map((e) => e.href))].filter(
        (h) => !h.endsWith('/docs/components') && !h.endsWith('/docs/components/')
      )
    );
  });

  if (!links || links.length === 0) {
    console.error('MagicUI: no component links found');
    return '';
  }

  console.log(`Found ${links.length} component pages`);
  const sections = [];

  for (const url of links) {
    const name = url.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    console.log(`  Scraping: ${name}`);

    const code = await safePage(browser, url, async (page) => {
      await page.waitForTimeout(2500);

      // Try clicking source / code tabs
      try {
        const tabs = await page.$$('button[role="tab"], [role="tab"]');
        for (const tab of tabs) {
          const text = await tab.innerText();
          if (/source|code/i.test(text)) {
            await tab.click();
            await page.waitForTimeout(800);
            break;
          }
        }
      } catch (_) {}

      const blocks = await page.$$eval('pre code, pre', (els) =>
        els.map((el) => el.innerText?.trim()).filter(Boolean)
      );
      const tsxBlocks = blocks.filter(
        (b) => b.includes('import') || b.includes('export') || b.includes('return (')
      );
      if (tsxBlocks.length) return tsxBlocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      if (blocks.length) return blocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      return null;
    });

    if (code) {
      sections.push(`## ${name}\n> Source: ${url}\n\n\`\`\`tsx\n${code}\n\`\`\``);
    } else {
      console.log(`  [no code] ${name}`);
    }
  }

  return sections.join('\n\n---\n\n');
}

// ─── Origin UI ──────────────────────────────────────────────────────────────

async function scrapeOriginUI(browser) {
  console.log('\n=== Origin UI ===');
  const baseUrl = 'https://originui.com';

  // Origin UI lists components on the home page or /components
  const links = await safePage(browser, baseUrl, async (page) => {
    await page.waitForTimeout(3000);
    const hrefs = await page.$$eval('a[href]', (els) =>
      els.map((e) => e.href)
    );
    return [
      ...new Set(
        hrefs.filter((h) => {
          try {
            const u = new URL(h);
            return (
              u.hostname === 'originui.com' &&
              u.pathname.length > 1 &&
              !u.pathname.startsWith('/blog') &&
              !u.pathname.startsWith('/docs')
            );
          } catch (_) {
            return false;
          }
        })
      ),
    ];
  });

  if (!links || links.length === 0) {
    console.error('Origin UI: no component links found');
    return '';
  }

  console.log(`Found ${links.length} potential component pages`);
  const sections = [];

  for (const url of links) {
    const name = url
      .split('/')
      .pop()
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Unknown';
    console.log(`  Scraping: ${name} (${url})`);

    const code = await safePage(browser, url, async (page) => {
      await page.waitForTimeout(2500);

      // Try clicking code/source tabs
      try {
        const tabs = await page.$$('button[role="tab"], [role="tab"], button');
        for (const tab of tabs) {
          const text = await tab.innerText().catch(() => '');
          if (/^(code|source|tsx|jsx)$/i.test(text.trim())) {
            await tab.click();
            await page.waitForTimeout(800);
            break;
          }
        }
      } catch (_) {}

      const blocks = await page.$$eval('pre code, pre', (els) =>
        els.map((el) => el.innerText?.trim()).filter(Boolean)
      );
      const tsxBlocks = blocks.filter(
        (b) => b.includes('import') || b.includes('export') || b.includes('return (')
      );
      if (tsxBlocks.length) return tsxBlocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      if (blocks.length) return blocks.reduce((a, b) => (b.length > a.length ? b : a), '');
      return null;
    });

    if (code) {
      sections.push(`## ${name}\n> Source: ${url}\n\n\`\`\`tsx\n${code}\n\`\`\``);
    } else {
      console.log(`  [no code] ${name}`);
    }
  }

  return sections.join('\n\n---\n\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    const [aceternityContent, magicuiContent, originuiContent] = await Promise.all([
      scrapeAceternity(browser),
      scrapeMagicUI(browser),
      scrapeOriginUI(browser),
    ]);

    write(
      `${OUT_DIR}/aceternity-full.md`,
      `# Aceternity UI — Full Component Source\n\nScraped: ${new Date().toISOString()}\n\n---\n\n${aceternityContent || '_No content extracted_'}`
    );

    write(
      `${OUT_DIR}/magicui-full.md`,
      `# MagicUI — Full Component Source\n\nScraped: ${new Date().toISOString()}\n\n---\n\n${magicuiContent || '_No content extracted_'}`
    );

    write(
      `${OUT_DIR}/origin-ui-full.md`,
      `# Origin UI — Full Component Source\n\nScraped: ${new Date().toISOString()}\n\n---\n\n${originuiContent || '_No content extracted_'}`
    );
  } finally {
    await browser.close();
  }

  // Git
  const { execSync } = await import('child_process');
  const cwd = 'C:/Users/Admin/Downloads/design-knowledge-base';
  try {
    execSync(
      'git add md/components/aceternity-full.md md/components/magicui-full.md md/components/origin-ui-full.md scripts/scrape-component-libs.mjs',
      { cwd, stdio: 'inherit' }
    );
    execSync(
      'git commit -m "Add full scraped source: aceternity, magicui, origin-ui components"',
      { cwd, stdio: 'inherit' }
    );
    execSync('git push origin master', { cwd, stdio: 'inherit' });
    console.log('\nGit push complete.');
  } catch (e) {
    console.error('Git error:', e.message);
  }
})();
