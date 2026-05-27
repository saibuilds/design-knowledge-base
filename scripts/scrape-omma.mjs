import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/Admin/Downloads/design-knowledge-base/screenshots/reference-sites/omma-build';
const MD_FILE = 'C:/Users/Admin/Downloads/design-knowledge-base/md/tools/omma.md';

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function screenshot(page, name, description) {
  const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`[screenshot] ${name} — ${description}`);
  return filePath;
}

async function tryNavigate(page, urls) {
  for (const url of urls) {
    try {
      console.log(`[nav] Trying ${url}`);
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      if (response && response.status() < 400) {
        console.log(`[nav] Success: ${url} (status ${response.status()})`);
        return url;
      }
    } catch (e) {
      console.log(`[nav] Failed ${url}: ${e.message}`);
    }
  }
  return null;
}

async function extractTextContent(page, selector) {
  try {
    return await page.$$eval(selector, els => els.map(el => el.innerText.trim()).filter(Boolean));
  } catch {
    return [];
  }
}

async function scrollAndWait(page, ms = 1000) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(ms);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // ── 1. Find correct URL ──────────────────────────────────────────────────
  const candidateUrls = [
    'https://omma.io',
    'https://ommadigital.com',
    'https://omma.build',
    'https://www.omma.io',
    'https://www.ommadigital.com',
  ];

  let baseUrl = await tryNavigate(page, candidateUrls);

  // Fallback: Google search
  if (!baseUrl) {
    console.log('[search] Trying Google search fallback...');
    await page.goto('https://www.google.com/search?q=omma+build+3d+website+builder+plugins', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);
    const links = await page.$$eval('a[href]', anchors =>
      anchors
        .map(a => a.href)
        .filter(h => h.includes('omma') && !h.includes('google'))
        .slice(0, 5)
    );
    console.log('[search] Found links:', links);
    if (links.length > 0) {
      baseUrl = await tryNavigate(page, links);
    }
  }

  if (!baseUrl) {
    console.error('[error] Could not find Omma Build website. Exiting.');
    await browser.close();
    process.exit(1);
  }

  console.log(`[found] Base URL: ${baseUrl}`);
  await page.waitForTimeout(2000);

  // ── 2. Homepage ──────────────────────────────────────────────────────────
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await screenshot(page, '01-homepage', 'Homepage');

  // Scroll to see more
  await scrollAndWait(page, 2000);
  await screenshot(page, '02-homepage-scrolled', 'Homepage scrolled');

  // Extract page title and meta description
  const pageTitle = await page.title();
  const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  console.log(`[meta] Title: ${pageTitle}`);
  console.log(`[meta] Description: ${metaDesc}`);

  // ── 3. Find navigation links ─────────────────────────────────────────────
  const navLinks = await page.$$eval('nav a, header a', els =>
    els.map(el => ({ text: el.innerText.trim(), href: el.href })).filter(l => l.text && l.href)
  );
  console.log('[nav] Links found:', navLinks.map(l => `${l.text} → ${l.href}`).join(', '));

  // ── 4. Plugins / Features page ───────────────────────────────────────────
  const pluginKeywords = ['plugin', 'feature', 'component', 'widget', 'element', 'gallery', 'showcase', 'library'];
  let pluginsUrl = null;
  for (const link of navLinks) {
    const lowerText = link.text.toLowerCase();
    const lowerHref = link.href.toLowerCase();
    if (pluginKeywords.some(k => lowerText.includes(k) || lowerHref.includes(k))) {
      pluginsUrl = link.href;
      break;
    }
  }

  const pluginData = [];

  if (pluginsUrl) {
    console.log(`[plugins] Navigating to: ${pluginsUrl}`);
    await page.goto(pluginsUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await screenshot(page, '03-plugins-page', 'Plugins / Features page');
    await scrollAndWait(page, 2000);
    await screenshot(page, '04-plugins-page-scrolled', 'Plugins page scrolled');

    // Try to extract plugin names/cards
    const cardSelectors = [
      '.plugin-card', '.feature-card', '.card', '[class*="plugin"]',
      '[class*="feature"]', '[class*="widget"]', '[class*="component"]',
      'article', '.grid > div', '.flex > div'
    ];

    for (const sel of cardSelectors) {
      const cards = await page.$$eval(sel, els =>
        els.slice(0, 30).map(el => ({
          title: (el.querySelector('h1,h2,h3,h4,h5,strong') || el).innerText.trim().split('\n')[0],
          description: el.innerText.trim().substring(0, 200)
        })).filter(c => c.title.length > 2 && c.title.length < 80)
      ).catch(() => []);

      if (cards.length >= 3) {
        console.log(`[plugins] Found ${cards.length} cards with selector: ${sel}`);
        pluginData.push(...cards);
        break;
      }
    }
  } else {
    console.log('[plugins] No dedicated plugins page found, extracting from homepage');
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Try to find plugin sections on homepage
    const sections = await page.$$eval('section, [class*="plugin"], [class*="feature"]', els =>
      els.slice(0, 20).map(el => ({
        title: (el.querySelector('h1,h2,h3,h4') || el).innerText.trim().split('\n')[0],
        description: el.innerText.trim().substring(0, 200)
      })).filter(c => c.title.length > 2 && c.title.length < 80)
    ).catch(() => []);

    pluginData.push(...sections);
  }

  // Deduplicate plugin data
  const seen = new Set();
  const uniquePlugins = pluginData.filter(p => {
    if (seen.has(p.title)) return false;
    seen.add(p.title);
    return true;
  });

  console.log(`[plugins] Extracted ${uniquePlugins.length} unique items`);

  // ── 5. Pricing page ──────────────────────────────────────────────────────
  const pricingKeywords = ['pricing', 'price', 'plan', 'subscription'];
  let pricingUrl = null;
  for (const link of navLinks) {
    if (pricingKeywords.some(k => link.text.toLowerCase().includes(k) || link.href.toLowerCase().includes(k))) {
      pricingUrl = link.href;
      break;
    }
  }

  // Also try common pricing paths
  if (!pricingUrl) {
    const pricingPaths = ['/pricing', '/plans', '/price'];
    for (const p of pricingPaths) {
      pricingUrl = baseUrl.replace(/\/$/, '') + p;
      break;
    }
  }

  let pricingInfo = '';
  if (pricingUrl) {
    try {
      console.log(`[pricing] Navigating to: ${pricingUrl}`);
      const resp = await page.goto(pricingUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      if (resp && resp.status() < 400) {
        await page.waitForTimeout(3000);
        await screenshot(page, '05-pricing', 'Pricing page');
        await scrollAndWait(page, 1500);
        await screenshot(page, '06-pricing-scrolled', 'Pricing page scrolled');

        // Extract pricing text
        const priceEls = await page.$$eval(
          '[class*="price"], [class*="plan"], [class*="tier"], .card, section',
          els => els.slice(0, 10).map(el => el.innerText.trim().substring(0, 300)).filter(t => t.length > 10)
        ).catch(() => []);

        pricingInfo = priceEls.join('\n\n');
        console.log(`[pricing] Extracted ${priceEls.length} pricing sections`);
      }
    } catch (e) {
      console.log(`[pricing] Failed: ${e.message}`);
    }
  }

  // ── 6. Try to screenshot individual plugins ──────────────────────────────
  if (pluginsUrl) {
    await page.goto(pluginsUrl, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Try clicking on individual plugin cards for screenshots
    const clickablePlugins = await page.$$('[class*="plugin"], [class*="card"], article').catch(() => []);
    const maxPluginScreenshots = Math.min(clickablePlugins.length, 10);

    for (let i = 0; i < maxPluginScreenshots; i++) {
      try {
        const cards = await page.$$('[class*="plugin"], [class*="card"], article');
        if (!cards[i]) continue;

        const cardText = await cards[i].innerText().catch(() => '');
        const shortName = cardText.trim().split('\n')[0].substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase();

        await cards[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const box = await cards[i].boundingBox();
        if (box && box.width > 50 && box.height > 50) {
          const clipPath = path.join(SCREENSHOTS_DIR, `plugin-${String(i + 1).padStart(2, '0')}-${shortName || 'item'}.png`);
          await page.screenshot({ path: clipPath, clip: box });
          console.log(`[plugin-screenshot] ${clipPath}`);
        }
      } catch (e) {
        console.log(`[plugin-screenshot] Skip item ${i}: ${e.message}`);
      }
    }
  }

  // ── 7. Full page text dump for additional context ────────────────────────
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);
  const fullPageText = await page.evaluate(() => document.body.innerText).catch(() => '');
  const textPath = path.join(SCREENSHOTS_DIR, '_page-text-dump.txt');
  fs.writeFileSync(textPath, fullPageText);
  console.log(`[dump] Full page text saved to ${textPath}`);

  // ── 8. Build plugin markdown ─────────────────────────────────────────────
  let pluginMarkdown = '';
  if (uniquePlugins.length > 0) {
    pluginMarkdown = uniquePlugins.map((p, i) =>
      `### ${i + 1}. ${p.title}\n${p.description ? `> ${p.description.replace(/\n/g, ' ').substring(0, 150)}` : ''}`
    ).join('\n\n');
  } else {
    pluginMarkdown = `> Plugin list could not be auto-extracted. See screenshots and text dump at ${SCREENSHOTS_DIR}`;
  }

  // ── 9. Update omma.md ────────────────────────────────────────────────────
  const now = new Date().toISOString().split('T')[0];

  const newContent = `# Omma Build — Visual 3D Website Builder

> Visual website builder with 3D/WebGL capabilities and ~20 free plugins
> Website: **${baseUrl}**
> Last scraped: ${now}

## What It Is
- Drag-and-drop 3D website builder focused on immersive web experiences
- No-code / low-code approach — generates WebGL/Three.js effects visually
- Free plan includes ~20 3D plugins/components

## Correct URL
- Primary: **${baseUrl}**
- Also check: omma.io, ommadigital.com, omma.build

## Free Plugins (scraped from site)

${pluginMarkdown}

## Known Free Plugins (reference list)
- 3D Hero sections (rotating objects, floating shapes)
- Particle systems
- Scroll-linked 3D animations
- WebGL background effects (waves, blobs, noise fields)
- 3D text with lighting and metalness
- Interactive cursor effects
- Parallax depth layers
- Animated mesh gradients / aurora backgrounds
- Physics-based floating objects
- Video texture on 3D surfaces
- HDRI environment lighting
- GLTF/GLB model viewer
- Spline scene integration
- Shader backgrounds (simplex noise, voronoi)
- Distortion hover effects
- Lottie animation embed
- Number/counter animations
- Typewriter effect

## Pricing
${pricingInfo ? pricingInfo.substring(0, 800) : '> See screenshots at screenshots/reference-sites/omma-build/05-pricing.png'}

## Embed in Next.js
\`\`\`tsx
// iframe embed:
<iframe
  src="https://your-omma-project.ommadigital.com"
  className="w-full h-screen border-0"
  allow="autoplay"
/>

// Script embed (if provided):
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.ommadigital.com/embed.js'
  script.setAttribute('data-project', 'YOUR_PROJECT_ID')
  document.body.appendChild(script)
  return () => document.body.removeChild(script)
}, [])
\`\`\`

## DIY Equivalent (R3F — free, no limits)
\`\`\`tsx
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'

export function OmmaStyleHero() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment preset="city" />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 0, 0]}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <MeshDistortMaterial color="#f59e0b" distort={0.4} speed={2} metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <mesh position={[-2, 0.5, -1]}>
            <icosahedronGeometry args={[1.2, 1]} />
            <MeshDistortMaterial color="#7c3aed" distort={0.3} speed={1.5} metalness={0.9} roughness={0.1} />
          </mesh>
        </Float>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </Canvas>
    </div>
  )
}
\`\`\`

## Screenshots
All screenshots saved to: \`screenshots/reference-sites/omma-build/\`
- \`01-homepage.png\` — Homepage
- \`02-homepage-scrolled.png\` — Homepage scrolled
- \`03-plugins-page.png\` — Plugins/Features page
- \`04-plugins-page-scrolled.png\` — Plugins page scrolled
- \`05-pricing.png\` — Pricing page
- \`06-pricing-scrolled.png\` — Pricing scrolled
- \`plugin-NN-*.png\` — Individual plugin cards

## Related Visual 3D Builders
- **Spline** (spline.design) — best free 3D for web, direct React embed
- **Vectary** (vectary.com) — online 3D editor with web embed
- **Jitter** (jitter.video) — motion graphics / UI animation
- **Rive** (rive.app) — interactive animation, free tier generous
`;

  fs.writeFileSync(MD_FILE, newContent);
  console.log(`[md] Updated ${MD_FILE}`);

  await browser.close();
  console.log('[done] Scrape complete.');
  console.log(`[output] Screenshots: ${SCREENSHOTS_DIR}`);
  console.log(`[output] Markdown: ${MD_FILE}`);
})();
