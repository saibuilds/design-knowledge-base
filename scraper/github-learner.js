#!/usr/bin/env node
/**
 * GitHub Design Knowledge Learner
 * Fetches component patterns from top design repos and saves as HTML
 * Usage: node github-learner.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'components');
const DELAY = 1100; // 1.1s between requests

const REPOS = [
  // Component libraries
  { name: 'shadcn-ui', repo: 'shadcn-ui/ui', path: 'apps/www/content/docs', outFile: 'shadcn.html' },
  { name: 'magicui', repo: 'magicuidesign/magicui', path: 'content/docs', outFile: 'magicui.html' },
  { name: 'aceternity', repo: 'aceternity/ui', path: 'components', outFile: 'aceternity.html' },

  // Animation repos
  { name: 'framer-motion-recipes', repo: 'framer/motion', path: 'packages/framer-motion/src', outFile: '../animations/framer-motion-patterns.html' },

  // 3D repos
  { name: 'react-three-fiber', repo: 'pmndrs/react-three-fiber', path: 'packages/fiber/src', outFile: '../3d/r3f-patterns.html' },
  { name: 'drei', repo: 'pmndrs/drei', path: 'src', outFile: '../3d/drei-patterns.html' },

  // Full site clones / references
  { name: 'next-saas-starter', repo: 'leerob/next-saas-starter', path: 'app', outFile: '../reference-sites/next-saas-starter.html' },
  { name: 'taxonomy', repo: 'shadcn/taxonomy', path: 'app', outFile: '../reference-sites/taxonomy.html' },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'design-knowledge-bot/1.0', 'Accept': 'application/vnd.github.v3+json' } };
    https.get(url, opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { resolve({ error: e.message, raw: data.slice(0, 200) }); }
      });
    }).on('error', reject);
  });
}

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'design-knowledge-bot/1.0' } };
    https.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchRaw(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function htmlTemplate(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Design KB</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#e5e5e5;font-family:'Inter',sans-serif;font-size:15px;line-height:1.6}
.sidebar{position:fixed;left:0;top:0;width:220px;height:100vh;background:#111;border-right:1px solid #1f1f1f;padding:20px;overflow-y:auto;z-index:100}
.sidebar h2{font-size:13px;color:#f59e0b;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px}
.sidebar a{display:block;color:#888;text-decoration:none;padding:6px 8px;border-radius:6px;font-size:13px;margin-bottom:2px;transition:.15s}
.sidebar a:hover{color:#fff;background:#1a1a1a}
.main{margin-left:220px;padding:48px;max-width:900px}
h1{font-size:32px;font-weight:700;color:#fff;margin-bottom:8px}
h2{font-size:20px;font-weight:600;color:#fff;margin:40px 0 12px;padding-top:40px;border-top:1px solid #1f1f1f}
h3{font-size:15px;font-weight:600;color:#d4d4d4;margin:24px 0 8px}
p{color:#aaa;margin-bottom:12px}
.badge{display:inline-block;background:#1a1a1a;border:1px solid #2a2a2a;color:#888;font-size:11px;padding:2px 8px;border-radius:4px;margin:2px}
.code-block{position:relative;margin:16px 0}
.copy-btn{position:absolute;top:8px;right:8px;background:#1f1f1f;border:1px solid #333;color:#888;padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer;font-family:inherit;transition:.15s}
.copy-btn:hover{color:#fff;background:#2a2a2a}
pre{border-radius:8px;overflow:auto;font-size:13px}
.tag{display:inline-block;background:#f59e0b15;border:1px solid #f59e0b40;color:#f59e0b;font-size:11px;padding:2px 8px;border-radius:4px;margin:2px}
input[type=search]{width:100%;background:#111;border:1px solid #2a2a2a;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px;font-family:inherit;margin-bottom:32px;outline:none}
input[type=search]:focus{border-color:#f59e0b50}
.file-item{background:#111;border:1px solid #1f1f1f;border-radius:8px;padding:12px 16px;margin-bottom:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#888}
.file-item span{color:#f59e0b}
</style>
</head>
<body>
<div class="sidebar">
  <h2>Design KB</h2>
  <a href="../index.html">🏠 Home</a>
  <a href="../animations/gsap.html">GSAP</a>
  <a href="../animations/framer-motion.html">Framer Motion</a>
  <a href="../animations/lenis.html">Lenis</a>
  <a href="../components/shadcn.html">shadcn/ui</a>
  <a href="../components/magicui.html">MagicUI</a>
  <a href="../components/aceternity.html">Aceternity</a>
  <a href="../components/21st-dev.html">21st.dev</a>
  <a href="../3d/r3f.html">React Three Fiber</a>
  <a href="../reference-sites/index.html">Reference Sites</a>
</div>
<div class="main">
  <input type="search" placeholder="Search..." oninput="search(this.value)">
  <div id="content">${content}</div>
</div>
<script>
hljs.highlightAll();
document.querySelectorAll('.code-block').forEach(block => {
  const btn = block.querySelector('.copy-btn');
  if(btn) btn.onclick = () => {
    navigator.clipboard.writeText(block.querySelector('code').innerText);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  };
});
function search(q) {
  const els = document.querySelectorAll('#content h2, #content h3, #content p, #content .file-item');
  els.forEach(el => { el.style.opacity = q && !el.textContent.toLowerCase().includes(q.toLowerCase()) ? '0.2' : '1'; });
}
</script>
</body>
</html>`;
}

async function fetchRepoFiles(repo, repoPath) {
  const url = `https://api.github.com/repos/${repo}/contents/${repoPath}`;
  console.log(`Fetching ${url}`);
  const items = await fetchJson(url);
  if (!Array.isArray(items)) return [];
  return items.filter(i => i.type === 'file' && (i.name.endsWith('.tsx') || i.name.endsWith('.ts') || i.name.endsWith('.mdx') || i.name.endsWith('.md')));
}

async function fetchFileContent(downloadUrl) {
  await sleep(DELAY);
  return fetchRaw(downloadUrl);
}

async function processRepo(cfg) {
  console.log(`\nProcessing: ${cfg.name}`);
  const files = await fetchRepoFiles(cfg.repo, cfg.path);
  console.log(`  Found ${files.length} files`);

  let content = `<h1>${cfg.name}</h1><p>Patterns extracted from <a href="https://github.com/${cfg.repo}" style="color:#f59e0b">${cfg.repo}</a></p>`;

  const sample = files.slice(0, 15); // top 15 files
  for (const file of sample) {
    await sleep(DELAY);
    const raw = await fetchFileContent(file.download_url).catch(() => '');
    if (!raw) continue;
    const preview = raw.slice(0, 2000);
    content += `
<h2>${file.name}</h2>
<div class="code-block">
  <button class="copy-btn">Copy</button>
  <pre><code class="language-typescript">${preview.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
</div>`;
  }

  const outPath = path.join(OUTPUT_DIR, cfg.outFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, htmlTemplate(cfg.name, content));
  console.log(`  Saved: ${outPath}`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const cfg of REPOS) {
    await processRepo(cfg).catch(e => console.error(`Error on ${cfg.name}:`, e.message));
    await sleep(DELAY * 2);
  }
  console.log('\nDone! All patterns saved.');
}

main();
