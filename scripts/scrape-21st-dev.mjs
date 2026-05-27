import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const OUTPUT_PATH = 'C:/Users/Admin/Downloads/design-knowledge-base/md/components/21st-dev-full.md';

const PRIORITY_SEARCH_TERMS = [
  'shimmer button',
  'magnetic button',
  'floating navbar',
  'spotlight card',
  'typewriter',
  'text scramble',
  'floating label',
  'animated button',
  'glitch text',
  'gradient button',
  'dock',
  'bento grid',
  'hero section',
  'blur fade',
  'marquee',
  'orbit',
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function extractCodeFromPage(page) {
  return await page.evaluate(() => {
    const results = [];

    // Try code blocks
    const codeEls = document.querySelectorAll('pre code, [class*="code"] code, [data-language], .shiki, .hljs');
    codeEls.forEach(el => {
      const text = el.innerText || el.textContent || '';
      if (text.length > 80) results.push(text.trim());
    });

    // Fallback: any <pre> blocks
    if (results.length === 0) {
      document.querySelectorAll('pre').forEach(el => {
        const text = el.innerText || el.textContent || '';
        if (text.length > 80) results.push(text.trim());
      });
    }

    return results;
  });
}

async function extractComponentMeta(page) {
  return await page.evaluate(() => {
    const name = document.querySelector('h1')?.innerText?.trim()
      || document.querySelector('[class*="title"]')?.innerText?.trim()
      || document.title?.split('|')[0]?.trim()
      || 'Unknown';

    const deps = [];
    document.querySelectorAll('[class*="depend"], [class*="install"], [class*="package"]').forEach(el => {
      const t = el.innerText?.trim();
      if (t) deps.push(t);
    });

    return { name, deps };
  });
}

async function scrapeComponentPage(browser, url) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);

    // Try clicking "Code" tab if present
    const codeTabs = await page.$$('button, [role="tab"]');
    for (const tab of codeTabs) {
      const text = await tab.innerText().catch(() => '');
      if (/^code$/i.test(text.trim())) {
        await tab.click();
        await sleep(1500);
        break;
      }
    }

    const meta = await extractComponentMeta(page);
    const codeBlocks = await extractCodeFromPage(page);

    return { url, ...meta, codeBlocks };
  } catch (err) {
    console.error(`Failed ${url}: ${err.message}`);
    return null;
  } finally {
    await page.close();
  }
}

async function searchComponents(page, term) {
  try {
    await page.goto('https://21st.dev', { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1500);

    // Find and fill search input
    const searchInput = await page.$('input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]');
    if (!searchInput) return [];

    await searchInput.click({ clickCount: 3 });
    await searchInput.type(term, { delay: 50 });
    await sleep(2000);

    // Collect component links
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href*="/component/"], a[href*="/r/"]'));
      return [...new Set(anchors.map(a => a.href))].slice(0, 3);
    });

    return links;
  } catch (err) {
    console.error(`Search failed for "${term}": ${err.message}`);
    return [];
  }
}

async function browseAllComponents(page) {
  try {
    await page.goto('https://21st.dev', { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);

    // Scroll to load more
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await sleep(800);
    }

    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href*="/component/"], a[href*="/r/"]'));
      return [...new Set(anchors.map(a => a.href))].slice(0, 40);
    });

    return links;
  } catch (err) {
    console.error(`Browse failed: ${err.message}`);
    return [];
  }
}

function formatOutput(components) {
  const lines = [
    '# 21st.dev — Full Component Source Code',
    '',
    `> Scraped: ${new Date().toISOString()}`,
    `> Total components: ${components.length}`,
    '',
    '---',
    '',
  ];

  for (const comp of components) {
    lines.push(`## ${comp.name}`);
    lines.push(`> Source: ${comp.url}`);
    lines.push('');

    if (comp.deps && comp.deps.length > 0) {
      lines.push('**Dependencies:**');
      comp.deps.forEach(d => lines.push(`- ${d}`));
      lines.push('');
    }

    if (comp.codeBlocks && comp.codeBlocks.length > 0) {
      comp.codeBlocks.forEach((block, i) => {
        const lang = block.includes('className') || block.includes('export') ? 'tsx' : 'css';
        lines.push(`\`\`\`${lang}`);
        lines.push(block);
        lines.push('```');
        lines.push('');
      });
    } else {
      lines.push('> No source code extracted from this page.');
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set a realistic viewport
  await page.setViewportSize({ width: 1280, height: 900 });

  console.log('Browsing all components from homepage...');
  const allLinks = await browseAllComponents(page);
  console.log(`Found ${allLinks.length} component links from homepage`);

  // Also search for priority terms
  const searchLinks = new Set(allLinks);
  for (const term of PRIORITY_SEARCH_TERMS) {
    console.log(`Searching: "${term}"...`);
    const found = await searchComponents(page, term);
    found.forEach(l => searchLinks.add(l));
  }

  const uniqueLinks = [...searchLinks].filter(l =>
    l.includes('21st.dev') && (l.includes('/component/') || l.includes('/r/'))
  );

  console.log(`Total unique component URLs: ${uniqueLinks.length}`);

  const scraped = [];
  for (let i = 0; i < uniqueLinks.length; i++) {
    const url = uniqueLinks[i];
    console.log(`[${i + 1}/${uniqueLinks.length}] Scraping: ${url}`);
    const result = await scrapeComponentPage(browser, url);
    if (result) scraped.push(result);
    await sleep(500);
  }

  await browser.close();

  console.log(`Scraped ${scraped.length} components. Writing output...`);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  const content = formatOutput(scraped);
  writeFileSync(OUTPUT_PATH, content, 'utf8');

  console.log(`Saved to: ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
