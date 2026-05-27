#!/usr/bin/env node
/**
 * Design KB Scraper
 * Usage: node scraper.js <url> [url2] [url3]...
 * Output: reference-sites/<domain>.html for each URL
 *
 * Respects robots.txt, rate-limits to 1 req/sec per domain.
 */

'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-parser');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// ─── Config ──────────────────────────────────────────────────────────────────
const RATE_LIMIT_MS = 1000;       // 1 request per second per domain
const REQUEST_TIMEOUT = 15000;    // 15s timeout
const USER_AGENT = 'DesignKB-Scraper/1.0 (+https://github.com/local/design-kb)';
const OUTPUT_DIR = path.join(__dirname, '..', 'reference-sites');

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function domainSlug(url) {
  const { hostname } = new URL(url);
  return hostname.replace(/^www\./, '').replace(/\./g, '-');
}

async function fetchRobots(baseUrl) {
  try {
    const robotsUrl = new URL('/robots.txt', baseUrl).href;
    const { data } = await axios.get(robotsUrl, {
      timeout: 8000,
      headers: { 'User-Agent': USER_AGENT },
    });
    return robotsParser(robotsUrl, data);
  } catch {
    return null; // No robots.txt — proceed
  }
}

async function fetchPage(url) {
  const { data, headers } = await axios.get(url, {
    timeout: REQUEST_TIMEOUT,
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    maxRedirects: 5,
  });
  return { html: data, contentType: headers['content-type'] || '' };
}

// ─── Extractors ──────────────────────────────────────────────────────────────
function extractMeta($) {
  return {
    title: $('title').first().text().trim() || '',
    description:
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '',
    ogTitle: $('meta[property="og:title"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',
    themeColor: $('meta[name="theme-color"]').attr('content') || '',
    canonical: $('link[rel="canonical"]').attr('href') || '',
  };
}

function extractFonts($, html) {
  const fonts = new Set();
  // Google Fonts link tags
  $('link[href*="fonts.googleapis.com"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const match = href.match(/family=([^&]+)/);
    if (match) {
      match[1].split('|').forEach((f) => fonts.add(decodeURIComponent(f).split(':')[0]));
    }
  });
  // @import in style tags
  $('style').each((_, el) => {
    const text = $(el).text();
    const re = /fonts\.googleapis\.com\/css[^'")]*family=([^'")&]+)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      m[1].split('|').forEach((f) => fonts.add(decodeURIComponent(f).split(':')[0]));
    }
  });
  // CSS font-family in inline styles (rough scan)
  const ffRe = /font-family\s*:\s*['"]?([A-Za-z][A-Za-z0-9 _-]+)['"]?/g;
  let m2;
  while ((m2 = ffRe.exec(html)) !== null) {
    const name = m2[1].trim();
    if (!['sans-serif','serif','monospace','cursive','system-ui','inherit','initial'].includes(name)) {
      fonts.add(name);
    }
  }
  return [...fonts];
}

function extractColors(html) {
  const hexRe = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
  const seen = new Map();
  let m;
  while ((m = hexRe.exec(html)) !== null) {
    const raw = m[0].toLowerCase();
    // Normalise 3-digit
    const full =
      raw.length === 4
        ? '#' + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3]
        : raw;
    seen.set(full, (seen.get(full) || 0) + 1);
  }
  // Sort by frequency, return top 20
  return [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([hex, count]) => ({ hex, count }));
}

function extractHeadings($) {
  const headings = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    if (text && text.length < 200) headings.push({ tag: el.tagName, text });
  });
  return headings.slice(0, 20);
}

function extractNavLinks($) {
  const links = new Set();
  $('nav a, header a').each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    const href = $(el).attr('href') || '';
    if (text && text.length < 60 && href) links.add(`${text} → ${href}`);
  });
  return [...links].slice(0, 15);
}

function extractTechStack($, html) {
  const clues = [];
  if (html.includes('__NEXT_DATA__')) clues.push('Next.js');
  if (html.includes('window.__nuxt__') || html.includes('__NUXT_')) clues.push('Nuxt.js');
  if (html.includes('data-reactroot') || html.includes('reactDOM') || html.includes('_reactRootContainer')) clues.push('React');
  if (html.includes('ng-version') || html.includes('ng-app')) clues.push('Angular');
  if (html.includes('__VUE__') || html.includes('data-v-')) clues.push('Vue');
  if (html.includes('svelte')) clues.push('Svelte');
  if (html.includes('wp-content') || html.includes('wp-includes')) clues.push('WordPress');
  if (html.includes('shopify')) clues.push('Shopify');
  if (html.includes('framer.com') || html.includes('framerusercontent')) clues.push('Framer');
  if (html.includes('webflow')) clues.push('Webflow');
  if ($('link[href*="tailwind"]').length || html.includes('class="flex ') || html.includes('class="grid ')) clues.push('Tailwind CSS (likely)');
  if (html.includes('gsap') || html.includes('TweenMax')) clues.push('GSAP');
  if (html.includes('framer-motion') || html.includes('motion.div')) clues.push('Framer Motion');
  if (html.includes('three.js') || html.includes('THREE.')) clues.push('Three.js');
  return [...new Set(clues)];
}

// ─── HTML Generator ──────────────────────────────────────────────────────────
function generateHtml(url, data) {
  const { meta, fonts, colors, headings, navLinks, tech, slug } = data;
  const domain = new URL(url).hostname.replace(/^www\./, '');
  const now = new Date().toISOString().slice(0, 10);

  const colorSwatches = colors
    .map(
      ({ hex, count }) =>
        `<div class="token-swatch"><div class="swatch" style="background:${hex}"></div><div><div class="token-name">${hex}</div><div class="token-val">Used ${count}x in source</div></div></div>`
    )
    .join('\n    ');

  const fontItems = fonts.length
    ? fonts.map((f) => `<li>${f}</li>`).join('\n          ')
    : '<li>No Google Fonts detected</li>';

  const headingItems = headings.length
    ? headings.map((h) => `<li><span class="htag">&lt;${h.tag}&gt;</span> ${escapeHtml(h.text)}</li>`).join('\n          ')
    : '<li>No headings found</li>';

  const navItems = navLinks.length
    ? navLinks.map((n) => `<li>${escapeHtml(n)}</li>`).join('\n          ')
    : '<li>No nav links found</li>';

  const techItems = tech.length
    ? tech.map((t) => `<span class="tag">${t}</span>`).join('\n        ')
    : '<span class="tag">Unknown</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(domain)} — Design KB</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0a;--card:#111111;--border:#1f1f1f;--accent:#f59e0b;--text:#e5e5e5;--muted:#737373;--green:#22c55e}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif}
a{color:inherit;text-decoration:none}
.layout{display:flex;min-height:100vh}
.sidebar{width:240px;background:var(--card);border-right:1px solid var(--border);padding:24px 0;position:fixed;top:0;left:0;height:100vh;overflow-y:auto;z-index:100}
.sidebar-logo{padding:0 20px 24px;border-bottom:1px solid var(--border);margin-bottom:16px}
.sidebar-logo a{font-size:13px;font-weight:600;color:var(--accent);letter-spacing:.05em;text-transform:uppercase}
.sidebar-logo p{font-size:11px;color:var(--muted);margin-top:4px}
.nav-section{padding:8px 20px;font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-top:8px}
.nav-link{display:flex;align-items:center;gap:8px;padding:8px 20px;font-size:13px;color:var(--muted);transition:.15s;border-left:2px solid transparent}
.nav-link:hover,.nav-link.active{color:var(--text);background:rgba(245,158,11,.06);border-left-color:var(--accent)}
.main{margin-left:240px;flex:1;padding:40px;max-width:960px}
.page-header{margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid var(--border)}
.badge{display:inline-block;font-size:10px;font-weight:600;padding:3px 10px;border-radius:20px;background:rgba(245,158,11,.15);color:var(--accent);border:1px solid rgba(245,158,11,.3);margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em}
.page-header h1{font-size:28px;font-weight:700}
.page-header p{color:var(--muted);font-size:14px;margin-top:8px;line-height:1.7;max-width:640px}
.ext-links{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}
.ext-links a{font-size:12px;color:var(--accent);border:1px solid rgba(245,158,11,.3);padding:5px 12px;border-radius:6px;transition:.15s}
.ext-links a:hover{background:rgba(245,158,11,.1)}
.section{margin-bottom:48px}
.section h2{font-size:18px;font-weight:600;margin-bottom:16px;padding-top:8px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px}
.card h3{font-size:13px;font-weight:600;margin-bottom:8px;color:var(--accent)}
.card li{font-size:13px;color:var(--muted);line-height:1.8;list-style:none;padding:2px 0;border-bottom:1px solid var(--border)}
.card li:last-child{border-bottom:none}
.htag{font-size:11px;color:var(--accent);font-weight:600;margin-right:6px}
.token-swatch{display:flex;align-items:center;gap:12px;padding:10px 14px;background:#0d0d0d;border:1px solid var(--border);border-radius:8px;margin-bottom:8px}
.swatch{width:32px;height:32px;border-radius:6px;flex-shrink:0;border:1px solid rgba(255,255,255,.1)}
.token-name{font-size:13px;font-weight:500}
.token-val{font-size:11px;color:var(--muted);margin-top:2px}
.tag{display:inline-block;font-size:11px;padding:2px 8px;border-radius:4px;background:rgba(59,130,246,.1);color:#93c5fd;border:1px solid rgba(59,130,246,.2);margin:2px}
.meta-box{background:#0d0d0d;border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:20px}
.meta-row{display:flex;gap:12px;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px}
.meta-row:last-child{border-bottom:none}
.meta-key{width:120px;flex-shrink:0;color:var(--muted);font-weight:500}
.meta-value{color:var(--text);word-break:break-all}
.scraped-note{font-size:11px;color:var(--muted);margin-top:8px}
@media(max-width:768px){.sidebar{display:none}.main{margin-left:0}.grid2{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="layout">
<nav class="sidebar">
  <div class="sidebar-logo"><a href="../index.html">Design KB</a><p>Web Design Knowledge Base</p></div>
  <div class="nav-section">Hub</div>
  <a class="nav-link" href="../index.html">&#8962; Dashboard</a>
  <div class="nav-section">Animations</div>
  <a class="nav-link" href="../animations/gsap.html">&#9889; GSAP</a>
  <a class="nav-link" href="../animations/framer-motion.html">&#127902; Framer Motion</a>
  <a class="nav-link" href="../animations/lenis.html">~ Lenis</a>
  <div class="nav-section">Components</div>
  <a class="nav-link" href="../components/shadcn.html">&#9672; shadcn/ui</a>
  <a class="nav-link" href="../components/21st-dev.html">&#10022; 21st.dev</a>
  <a class="nav-link" href="../components/magicui.html">&#10022; Magic UI</a>
  <a class="nav-link" href="../components/aceternity.html">&#9670; Aceternity UI</a>
  <div class="nav-section">3D</div>
  <a class="nav-link" href="../3d/r3f.html">&#9677; React Three Fiber</a>
  <div class="nav-section">Reference Sites</div>
  <a class="nav-link" href="index.html">&#9678; Sites Index</a>
  <a class="nav-link active" href="${slug}.html">&#9678; ${escapeHtml(domain)}</a>
</nav>
<main class="main">
  <div class="page-header">
    <div class="badge">Scraped ${now}</div>
    <h1>${escapeHtml(domain)}</h1>
    <p>${escapeHtml(meta.description || meta.ogTitle || 'No description found.')}</p>
    <div class="ext-links">
      <a href="${escapeHtml(url)}" target="_blank">Live Site</a>
    </div>
  </div>

  <div class="section">
    <h2>Meta</h2>
    <div class="meta-box">
      <div class="meta-row"><span class="meta-key">Title</span><span class="meta-value">${escapeHtml(meta.title)}</span></div>
      <div class="meta-row"><span class="meta-key">Description</span><span class="meta-value">${escapeHtml(meta.description)}</span></div>
      <div class="meta-row"><span class="meta-key">OG Title</span><span class="meta-value">${escapeHtml(meta.ogTitle)}</span></div>
      <div class="meta-row"><span class="meta-key">Theme Color</span><span class="meta-value">${escapeHtml(meta.themeColor) || '—'}</span></div>
      <div class="meta-row"><span class="meta-key">Canonical</span><span class="meta-value">${escapeHtml(meta.canonical) || '—'}</span></div>
    </div>
  </div>

  <div class="section">
    <h2>Tech Stack</h2>
    <div style="margin-bottom:16px">
      ${techItems}
    </div>
  </div>

  <div class="section">
    <h2>Typography &amp; Navigation</h2>
    <div class="grid2">
      <div class="card">
        <h3>Detected Fonts</h3>
        <ul>
          ${fontItems}
        </ul>
      </div>
      <div class="card">
        <h3>Nav Links</h3>
        <ul>
          ${navItems}
        </ul>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Headings</h2>
    <div class="card" style="margin-bottom:20px">
      <ul>
        ${headingItems}
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>Colors (top ${colors.length} by frequency)</h2>
    ${colorSwatches}
    <p class="scraped-note">Colors extracted from raw HTML/CSS source — includes framework utility classes, not just brand colors.</p>
  </div>
</main>
</div>
</body>
</html>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function scrapeUrl(url) {
  const parsedUrl = new URL(url);
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;

  console.log(chalk.cyan(`\nScraping: ${url}`));

  // Check robots.txt
  console.log(chalk.gray('  Checking robots.txt...'));
  const robots = await fetchRobots(baseUrl);
  if (robots && !robots.isAllowed(url, USER_AGENT)) {
    console.log(chalk.red(`  Blocked by robots.txt — skipping ${url}`));
    return null;
  }
  console.log(chalk.green('  robots.txt OK'));

  // Fetch page
  console.log(chalk.gray('  Fetching page...'));
  let html, contentType;
  try {
    ({ html, contentType } = await fetchPage(url));
  } catch (err) {
    console.log(chalk.red(`  Fetch failed: ${err.message}`));
    return null;
  }

  if (!contentType.includes('text/html')) {
    console.log(chalk.yellow(`  Not HTML (${contentType}) — skipping`));
    return null;
  }
  console.log(chalk.green(`  Fetched ${(html.length / 1024).toFixed(1)}KB`));

  // Parse
  const $ = cheerio.load(html);
  const meta = extractMeta($);
  const fonts = extractFonts($, html);
  const colors = extractColors(html);
  const headings = extractHeadings($);
  const navLinks = extractNavLinks($);
  const tech = extractTechStack($, html);
  const slug = domainSlug(url);

  console.log(chalk.gray(`  Fonts: ${fonts.join(', ') || 'none'}`));
  console.log(chalk.gray(`  Colors: ${colors.length} found`));
  console.log(chalk.gray(`  Tech: ${tech.join(', ') || 'unknown'}`));

  // Generate output HTML
  const outputHtml = generateHtml(url, { meta, fonts, colors, headings, navLinks, tech, slug });
  const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, outputHtml, 'utf8');

  console.log(chalk.green(`  Saved: ${outputPath}`));
  return { slug, domain: parsedUrl.hostname.replace(/^www\./, ''), title: meta.title, tech };
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.log(chalk.yellow('Usage: node scraper.js <url> [url2] [url3]...'));
    console.log(chalk.gray('Example: node scraper.js https://awwwards.com https://godly.website'));
    process.exit(1);
  }

  const results = [];
  const domainTimestamps = new Map();

  for (const rawUrl of args) {
    let url;
    try {
      url = new URL(rawUrl).href;
    } catch {
      console.log(chalk.red(`Invalid URL: ${rawUrl}`));
      continue;
    }

    // Rate limit per domain
    const domain = new URL(url).hostname;
    const lastRequest = domainTimestamps.get(domain) || 0;
    const elapsed = Date.now() - lastRequest;
    if (elapsed < RATE_LIMIT_MS) {
      const wait = RATE_LIMIT_MS - elapsed;
      console.log(chalk.gray(`Rate limiting — waiting ${wait}ms for ${domain}`));
      await sleep(wait);
    }

    domainTimestamps.set(domain, Date.now());
    const result = await scrapeUrl(url);
    if (result) results.push(result);

    // Always wait between requests
    if (args.indexOf(rawUrl) < args.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  if (results.length) {
    console.log(chalk.bold.green(`\nDone! ${results.length} site(s) scraped:`));
    results.forEach((r) => {
      console.log(chalk.white(`  ${r.domain} — ${r.title}`));
      console.log(chalk.gray(`    Tech: ${r.tech.join(', ') || 'unknown'}`));
    });
    console.log(chalk.cyan(`\nFiles in: ${OUTPUT_DIR}`));
  } else {
    console.log(chalk.yellow('\nNo sites were successfully scraped.'));
  }
}

main().catch((err) => {
  console.error(chalk.red('Fatal:', err.message));
  process.exit(1);
});
