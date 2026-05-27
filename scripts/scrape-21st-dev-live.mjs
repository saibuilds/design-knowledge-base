import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const OUTPUT_FILE = path.resolve(__dirname, '../md/components/21st-dev-full.md');
const TIMEOUT = 30000;

const TARGET_COMPONENTS = [
  'shimmer button',
  'magnetic button',
  'floating navbar',
  'pill nav',
  'spotlight card',
  'typewriter',
  'text scramble',
  'encrypt',
  'floating label input',
  'border beam',
  'animated gradient',
  'glowing button',
  '3d card',
  'card tilt',
  'scroll reveal',
  'animated tabs',
  'dock',
  'confetti button',
];

const scrapedComponents = [];
const skipped = [];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function tryGetCode(page) {
  // Try to find code tab/button
  const codeSelectors = [
    'button:has-text("Code")',
    '[data-tab="code"]',
    'button[aria-label*="code" i]',
    'button[aria-label*="Code"]',
    '[role="tab"]:has-text("Code")',
  ];

  for (const sel of codeSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click();
        await sleep(1500);
        break;
      }
    } catch {}
  }

  // Try to extract code from various sources
  const codeSelectors2 = [
    'pre code',
    '[class*="code"] code',
    '[class*="CodeBlock"]',
    '[class*="codeblock"]',
    'code[class*="language-"]',
    '[data-language]',
    '.hljs',
    'pre',
  ];

  for (const sel of codeSelectors2) {
    try {
      const el = await page.$(sel);
      if (el) {
        const text = await el.innerText();
        if (text && text.trim().length > 50) {
          return text.trim();
        }
      }
    } catch {}
  }

  // Try getting all code blocks and return the longest
  try {
    const codes = await page.$$eval('pre, code', els =>
      els.map(e => e.innerText).filter(t => t && t.trim().length > 100)
    );
    if (codes.length > 0) {
      return codes.sort((a, b) => b.length - a.length)[0].trim();
    }
  } catch {}

  return null;
}

async function scrapeComponentPage(page, url, name) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT });
    await sleep(2500);

    const code = await tryGetCode(page);
    if (!code) {
      skipped.push({ name, url, reason: 'No code found' });
      return null;
    }

    // Try to detect dependencies from import lines
    const importLines = code.match(/^import .+ from ['"][^'"]+['"]/gm) || [];
    const deps = importLines
      .map(l => l.match(/from ['"]([^'"]+)['"]/)?.[1])
      .filter(d => d && !d.startsWith('.') && !d.startsWith('@/') && !d.startsWith('react'))
      .filter(Boolean);

    return { name, url, code, deps: [...new Set(deps)] };
  } catch (err) {
    skipped.push({ name, url, reason: err.message });
    return null;
  }
}

async function search21stDev(page, query) {
  try {
    await page.goto('https://21st.dev', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await sleep(2000);

    // Find search input
    const searchSelectors = [
      'input[placeholder*="search" i]',
      'input[type="search"]',
      'input[name="search"]',
      '[role="searchbox"]',
      'input[placeholder*="component" i]',
      'input[placeholder*="find" i]',
    ];

    let searchInput = null;
    for (const sel of searchSelectors) {
      searchInput = await page.$(sel);
      if (searchInput) break;
    }

    if (!searchInput) {
      // Try clicking a search icon/button first
      const searchBtn = await page.$('[aria-label*="search" i], button:has-text("Search")');
      if (searchBtn) {
        await searchBtn.click();
        await sleep(1000);
        for (const sel of searchSelectors) {
          searchInput = await page.$(sel);
          if (searchInput) break;
        }
      }
    }

    if (!searchInput) {
      console.log(`No search input found for query: ${query}`);
      return [];
    }

    await searchInput.click({ clickCount: 3 });
    await searchInput.type(query, { delay: 50 });
    await sleep(2000);

    // Collect result links
    const links = await page.$$eval('a[href*="/component"], a[href*="/r/"]', els =>
      els.map(e => ({ href: e.href, text: e.innerText.trim() })).filter(e => e.href && e.text)
    );

    return links.slice(0, 3); // top 3 results per query
  } catch (err) {
    console.error(`Search error for "${query}":`, err.message);
    return [];
  }
}

async function browseAllComponents(page) {
  const allLinks = new Set();
  try {
    await page.goto('https://21st.dev', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await sleep(2500);

    // Try to find component listing pages
    const navLinks = await page.$$eval('a[href]', els =>
      els
        .map(e => ({ href: e.href, text: e.innerText.trim() }))
        .filter(e => e.href.includes('21st.dev') && (
          e.href.includes('/component') ||
          e.href.includes('/r/') ||
          e.href.includes('/c/')
        ))
    );

    for (const l of navLinks) allLinks.add(JSON.stringify(l));

    // Try pagination / load more
    const categoryLinks = await page.$$eval('nav a, aside a, [class*="sidebar"] a, [class*="nav"] a', els =>
      els.map(e => ({ href: e.href, text: e.innerText.trim() })).filter(e => e.href)
    );
    for (const l of categoryLinks) allLinks.add(JSON.stringify(l));

  } catch (err) {
    console.error('Browse all error:', err.message);
  }
  return [...allLinks].map(s => JSON.parse(s));
}

async function scrapeAceternity(page) {
  const results = [];
  console.log('\n--- Scraping Aceternity UI ---');
  try {
    await page.goto('https://ui.aceternity.com/components', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await sleep(2500);

    const links = await page.$$eval('a[href*="/components/"]', els =>
      els.map(e => ({ href: e.href, text: e.innerText.trim() })).filter(e => e.href && e.text)
    );

    const unique = [...new Map(links.map(l => [l.href, l])).values()].slice(0, 25);
    console.log(`Found ${unique.length} Aceternity component links`);

    for (const link of unique) {
      console.log(`  Scraping: ${link.text} - ${link.href}`);
      const comp = await scrapeComponentPage(page, link.href, `Aceternity: ${link.text}`);
      if (comp) results.push(comp);
      await sleep(1500);
    }
  } catch (err) {
    console.error('Aceternity error:', err.message);
  }
  return results;
}

async function scrapeMagicUI(page) {
  const results = [];
  console.log('\n--- Scraping MagicUI ---');
  try {
    await page.goto('https://magicui.design/docs/components', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await sleep(2500);

    const links = await page.$$eval('a[href*="/docs/components/"]', els =>
      els.map(e => ({ href: e.href.startsWith('http') ? e.href : 'https://magicui.design' + e.getAttribute('href'), text: e.innerText.trim() }))
        .filter(e => e.text)
    );

    const unique = [...new Map(links.map(l => [l.href, l])).values()].slice(0, 25);
    console.log(`Found ${unique.length} MagicUI component links`);

    for (const link of unique) {
      console.log(`  Scraping: ${link.text} - ${link.href}`);
      const comp = await scrapeComponentPage(page, link.href, `MagicUI: ${link.text}`);
      if (comp) results.push(comp);
      await sleep(1500);
    }
  } catch (err) {
    console.error('MagicUI error:', err.message);
  }
  return results;
}

function buildMarkdown(components) {
  let md = `# 21st.dev + Aceternity + MagicUI Component Source Code\n\n`;
  md += `> Scraped: ${new Date().toISOString()}\n`;
  md += `> Total components: ${components.length}\n\n`;
  md += `---\n\n`;

  for (const comp of components) {
    md += `## ${comp.name}\n`;
    md += `> Source: ${comp.url}\n`;
    if (comp.deps && comp.deps.length > 0) {
      md += `> Dependencies: ${comp.deps.join(', ')}\n`;
    }
    md += `\n\`\`\`tsx\n${comp.code}\n\`\`\`\n\n`;
    md += `---\n\n`;
  }

  if (skipped.length > 0) {
    md += `## Skipped Components\n\n`;
    for (const s of skipped) {
      md += `- **${s.name}** (${s.url}): ${s.reason}\n`;
    }
  }

  return md;
}

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);

  const allComponents = [];

  // --- 21st.dev ---
  console.log('=== Starting 21st.dev scrape ===');

  // First, browse all components from the main page
  const allLinks = await browseAllComponents(page);
  console.log(`Found ${allLinks.length} component links on main page`);

  // Process all links found on main page
  const processedUrls = new Set();
  for (const link of allLinks) {
    if (processedUrls.has(link.href)) continue;
    processedUrls.add(link.href);
    console.log(`  Scraping: ${link.text || link.href}`);
    const comp = await scrapeComponentPage(page, link.href, link.text || link.href);
    if (comp) allComponents.push(comp);
    await sleep(1500);
  }

  // Search for target components
  for (const query of TARGET_COMPONENTS) {
    console.log(`\nSearching 21st.dev for: ${query}`);
    const results = await search21stDev(page, query);
    console.log(`  Found ${results.length} results`);

    for (const result of results) {
      if (processedUrls.has(result.href)) continue;
      processedUrls.add(result.href);
      console.log(`  Scraping: ${result.text} - ${result.href}`);
      const comp = await scrapeComponentPage(page, result.href, result.text || query);
      if (comp) allComponents.push(comp);
      await sleep(1500);
    }
  }

  // Also try browsing category/explore pages on 21st.dev
  const exploreUrls = [
    'https://21st.dev/components',
    'https://21st.dev/explore',
    'https://21st.dev/library',
    'https://21st.dev/ui',
  ];

  for (const url of exploreUrls) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await sleep(2000);
      const links = await page.$$eval('a[href]', els =>
        els.map(e => ({ href: e.href, text: e.innerText.trim() }))
          .filter(e => e.href.includes('21st.dev') && e.href !== url && e.text)
      );
      for (const link of links) {
        if (processedUrls.has(link.href) || !link.href.match(/21st\.dev\/(r|component|c)\//)) continue;
        processedUrls.add(link.href);
        console.log(`  Scraping: ${link.text} - ${link.href}`);
        const comp = await scrapeComponentPage(page, link.href, link.text);
        if (comp) allComponents.push(comp);
        await sleep(1200);
      }
    } catch {}
  }

  // --- Aceternity ---
  const aceternityComps = await scrapeAceternity(page);
  allComponents.push(...aceternityComps);

  // --- MagicUI ---
  const magicComps = await scrapeMagicUI(page);
  allComponents.push(...magicComps);

  // Write output
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const md = buildMarkdown(allComponents);
  fs.writeFileSync(OUTPUT_FILE, md, 'utf8');

  console.log(`\n=== Done ===`);
  console.log(`Scraped: ${allComponents.length} components`);
  console.log(`Skipped: ${skipped.length} components`);
  console.log(`Output: ${OUTPUT_FILE}`);

  await browser.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
