#!/usr/bin/env node
/**
 * Design KB Scraper
 * Usage: node scraper.js urls.txt
 *
 * Takes a list of URLs from a text file (one per line),
 * scrapes each page, and generates an HTML report in ../reference-sites/scraped/
 */

const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-parser');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// ── Config ────────────────────────────────────────────────────────────────────
const RATE_LIMIT_MS = 1000; // 1 request per second
const OUTPUT_DIR = path.join(__dirname, '..', 'reference-sites', 'scraped');
const USER_AGENT = 'DesignKB-Scraper/1.0 (educational use)';
const TIMEOUT_MS = 10000;

// ── Helpers ───────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function slugify(url) {
  return url
    .replace(/https?:\/\//, '')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .slice(0, 80);
}

function extractColors($) {
  const colors = new Set();
  // Look for inline styles and style tags for CSS custom properties / hex/rgb values
  const styleText = $('style').map((_, el) => $(el).text()).get().join('\n');
  const colorRegex = /(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|hsl\([^)]+\)|--[\w-]+:\s*#[0-9a-fA-F]{3,8})/g;
  const matches = styleText.match(colorRegex) || [];
  matches.slice(0, 20).forEach((c) => colors.add(c.trim()));
  return [...colors];
}

function extractNavLinks($, baseUrl) {
  const links = [];
  $('nav a, header a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && text && text.length < 60) {
      links.push({ text, href });
    }
  });
  return links.slice(0, 20);
}

function extractHeadings($) {
  const headings = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    const tag = el.tagName.toLowerCase();
    if (text) headings.push({ tag, text: text.slice(0, 120) });
  });
  return headings.slice(0, 15);
}

// ── Robots.txt check ──────────────────────────────────────────────────────────
const robotsCache = {};

async function canFetch(url) {
  try {
    const { origin } = new URL(url);
    if (!robotsCache[origin]) {
      const resp = await axios.get(`${origin}/robots.txt`, {
        timeout: 5000,
        headers: { 'User-Agent': USER_AGENT },
        validateStatus: () => true
      });
      robotsCache[origin] = robotsParser(`${origin}/robots.txt`, resp.data || '');
    }
    return robotsCache[origin].isAllowed(url, USER_AGENT) !== false;
  } catch {
    return true; // if robots.txt is unavailable, assume allowed
  }
}

// ── HTML Report Generator ─────────────────────────────────────────────────────
function generateReport({ url, title, description, headings, navLinks, colors, bodyText }) {
  const escapedTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapedDesc = description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapedUrl = url.replace(/</g, '&lt;');

  const headingsHtml = headings.map(h =>
    `<div class="heading-item"><span class="tag">${h.tag}</span> ${h.text.replace(/</g, '&lt;')}</div>`
  ).join('');

  const navHtml = navLinks.map(l =>
    `<div class="nav-item-scraped"><span class="nav-text">${l.text.replace(/</g, '&lt;')}</span><span class="nav-href">${(l.href || '').replace(/</g, '&lt;').slice(0, 80)}</span></div>`
  ).join('');

  const colorHtml = colors.map(c => {
    const isHex = c.startsWith('#');
    const bg = isHex ? c : '#333';
    return `<div class="color-chip" style="background:${bg}" title="${c}"></div>`;
  }).join('');

  const previewText = bodyText.slice(0, 600).replace(/</g, '&lt;').replace(/\n+/g, ' ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapedTitle} — Scraped</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#e5e5e5;padding:40px;max-width:900px;margin:0 auto}
.back{color:#f59e0b;text-decoration:none;font-size:13px;display:inline-block;margin-bottom:24px}
h1{font-size:24px;font-weight:700;margin-bottom:6px}
.url{color:#555;font-size:12px;margin-bottom:24px}
.url a{color:#f59e0b;text-decoration:none}
h2{font-size:15px;font-weight:600;color:#f59e0b;margin:28px 0 12px;border-bottom:1px solid #222;padding-bottom:8px}
.meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px}
.meta-box{background:#111;border:1px solid #222;border-radius:8px;padding:16px}
.meta-label{font-size:10px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.meta-value{font-size:13px;color:#e5e5e5;line-height:1.5}
.heading-item{padding:6px 0;border-bottom:1px solid #1a1a1a;font-size:13px}
.heading-item:last-child{border:none}
.tag{background:#1a1a1a;color:#a3e635;font-size:10px;padding:1px 6px;border-radius:3px;font-family:monospace;margin-right:6px}
.nav-item-scraped{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1a1a1a;font-size:13px}
.nav-item-scraped:last-child{border:none}
.nav-href{color:#555;font-size:11px}
.color-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.color-chip{width:32px;height:32px;border-radius:6px;border:1px solid #333;cursor:pointer}
.preview-text{background:#111;border:1px solid #222;border-radius:8px;padding:16px;font-size:12px;color:#666;line-height:1.7}
.scraped-badge{display:inline-block;background:#1a1a1a;border:1px solid #222;color:#555;font-size:11px;padding:3px 8px;border-radius:4px;margin-bottom:16px}
</style>
</head>
<body>
<a class="back" href="../../index.html">← Design KB</a>
<div class="scraped-badge">Scraped ${new Date().toLocaleDateString()}</div>
<h1>${escapedTitle}</h1>
<div class="url"><a href="${escapedUrl}" target="_blank">${escapedUrl}</a></div>

<div class="meta-grid">
  <div class="meta-box">
    <div class="meta-label">Meta Description</div>
    <div class="meta-value">${escapedDesc || '(none found)'}</div>
  </div>
  <div class="meta-box">
    <div class="meta-label">Colors Found</div>
    <div class="color-chips">${colorHtml || '<span style="color:#555;font-size:12px">None extracted</span>'}</div>
  </div>
</div>

<h2>Headings Structure</h2>
<div style="background:#111;border:1px solid #222;border-radius:8px;padding:12px">
  ${headingsHtml || '<div style="color:#555;font-size:13px">No headings found</div>'}
</div>

<h2>Navigation Links</h2>
<div style="background:#111;border:1px solid #222;border-radius:8px;padding:12px">
  ${navHtml || '<div style="color:#555;font-size:13px">No nav links found</div>'}
</div>

<h2>Body Text Preview</h2>
<div class="preview-text">${previewText}</div>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function scrapeUrl(url) {
  if (!(await canFetch(url))) {
    console.log(chalk.yellow(`  [SKIP] robots.txt disallows: ${url}`));
    return null;
  }

  let resp;
  try {
    resp = await axios.get(url, {
      timeout: TIMEOUT_MS,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml'
      },
      maxRedirects: 5
    });
  } catch (err) {
    const status = err.response?.status;
    if (status === 403 || status === 401) {
      console.log(chalk.yellow(`  [SKIP] Auth required (${status}): ${url}`));
    } else {
      console.log(chalk.red(`  [ERR]  ${err.message}: ${url}`));
    }
    return null;
  }

  const $ = cheerio.load(resp.data);

  // Remove scripts, styles, nav clutter for body text
  $('script, style, noscript, iframe').remove();

  const title = $('title').text().trim() || $('h1').first().text().trim() || url;
  const description = $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') || '';
  const headings = extractHeadings($);
  const navLinks = extractNavLinks($, url);
  const colors = extractColors(cheerio.load(resp.data)); // re-load with styles
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

  return { url, title, description, headings, navLinks, colors, bodyText };
}

async function main() {
  const urlFile = process.argv[2];
  if (!urlFile) {
    console.error(chalk.red('Usage: node scraper.js urls.txt'));
    process.exit(1);
  }

  if (!fs.existsSync(urlFile)) {
    console.error(chalk.red(`File not found: ${urlFile}`));
    process.exit(1);
  }

  const urls = fs.readFileSync(urlFile, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && l.startsWith('http'));

  if (urls.length === 0) {
    console.error(chalk.red('No valid URLs found in file'));
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(chalk.cyan(`\nDesign KB Scraper`));
  console.log(chalk.gray(`Output: ${OUTPUT_DIR}`));
  console.log(chalk.gray(`URLs: ${urls.length}\n`));

  let success = 0;
  let skipped = 0;

  for (const url of urls) {
    console.log(chalk.white(`Scraping: ${url}`));
    const data = await scrapeUrl(url);

    if (data) {
      const filename = slugify(url) + '.html';
      const outputPath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(outputPath, generateReport(data), 'utf-8');
      console.log(chalk.green(`  [OK]   → ${filename}`));
      success++;
    } else {
      skipped++;
    }

    await sleep(RATE_LIMIT_MS);
  }

  console.log(chalk.cyan(`\nDone. ${success} scraped, ${skipped} skipped.`));
  console.log(chalk.gray(`Reports saved to: ${OUTPUT_DIR}\n`));
}

main().catch((err) => {
  console.error(chalk.red('Fatal:', err.message));
  process.exit(1);
});
