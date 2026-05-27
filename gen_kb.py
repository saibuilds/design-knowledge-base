import os

B = r'C:\Users\Admin\Downloads\design-knowledge-base'

CSS = ('*{margin:0;padding:0;box-sizing:border-box}'
       'body{background:#0a0a0a;color:#e5e5e5;font-family:Inter,sans-serif;font-size:15px;line-height:1.6}'
       '.sidebar{position:fixed;left:0;top:0;width:220px;height:100vh;background:#111;border-right:1px solid #1f1f1f;padding:20px;overflow-y:auto}'
       '.sidebar h2{font-size:13px;color:#f59e0b;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px}'
       '.sidebar a{display:block;color:#888;text-decoration:none;padding:6px 8px;border-radius:6px;font-size:13px;margin-bottom:2px}'
       '.sidebar a:hover{color:#fff;background:#1a1a1a}'
       '.main{margin-left:220px;padding:48px;max-width:900px}'
       'h1{font-size:32px;font-weight:700;color:#fff;margin-bottom:8px}'
       'h2{font-size:20px;font-weight:600;color:#fff;margin:40px 0 12px;padding-top:40px;border-top:1px solid #1f1f1f}'
       'h3{font-size:15px;font-weight:600;color:#d4d4d4;margin:24px 0 8px}'
       'p{color:#aaa;margin-bottom:12px}'
       '.tag{display:inline-block;background:#f59e0b15;border:1px solid #f59e0b40;color:#f59e0b;font-size:11px;padding:2px 8px;border-radius:4px;margin:2px}'
       '.badge{display:inline-block;background:#1a1a1a;border:1px solid #2a2a2a;color:#888;font-size:11px;padding:2px 8px;border-radius:4px;margin:2px}'
       '.code-block{position:relative;margin:16px 0}'
       '.copy-btn{position:absolute;top:8px;right:8px;background:#1f1f1f;border:1px solid #333;color:#888;padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer}'
       'pre{border-radius:8px;overflow:auto;font-size:13px}'
       'input[type=search]{width:100%;background:#111;border:1px solid #2a2a2a;color:#fff;padding:10px 14px;border-radius:8px;font-size:14px;font-family:inherit;margin-bottom:32px;outline:none}'
       '.note{background:#f59e0b08;border:1px solid #f59e0b20;border-radius:8px;padding:16px;margin:16px 0}'
       '.note p{margin:0;color:#ccc}')

FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
JSLIB = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0'

SB = ('<div class="sidebar"><h2>Design KB</h2>'
      '<a href="../index.html">Home</a>'
      '<a href="../animations/gsap.html">GSAP</a>'
      '<a href="../animations/framer-motion.html">Framer Motion</a>'
      '<a href="../animations/lenis.html">Lenis</a>'
      '<a href="../components/shadcn.html">shadcn/ui</a>'
      '<a href="../components/magicui.html">MagicUI</a>'
      '<a href="../components/aceternity.html">Aceternity</a>'
      '<a href="../components/21st-dev.html">21st.dev</a>'
      '<a href="../3d/r3f.html">React Three Fiber</a>'
      '<a href="../3d/spline-scenes.html">Spline Scenes</a>'
      '<a href="../reference-sites/awwwards.html">Awwwards</a>'
      '<a href="../reference-sites/godly.html">Godly</a>'
      '<a href="../reference-sites/lusion.html">Lusion</a></div>')

JF = ('hljs.highlightAll();'
      'document.querySelectorAll(".code-block").forEach(b=>{'
      'const btn=b.querySelector(".copy-btn");'
      'if(btn)btn.onclick=()=>{'
      'navigator.clipboard.writeText(b.querySelector("code").innerText);'
      'btn.textContent="Copied!";setTimeout(()=>btn.textContent="Copy",1500);}});'
      'function search(q){'
      'document.querySelectorAll("#content h2,#content h3,#content p").forEach(el=>{'
      'el.style.opacity=q&&!el.textContent.toLowerCase().includes(q.toLowerCase())?"0.2":"1";});}')

def page(title, c):
    return ('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
            '<title>' + title + ' - Design KB</title>'
            '<link href="' + FONTS + '" rel="stylesheet">'
            '<link rel="stylesheet" href="' + JSLIB + '/styles/github-dark.min.css">'
            '<script src="' + JSLIB + '/highlight.min.js"></sc' + 'ript>'
            '<style>' + CSS + '</style></head><body>' + SB
            + '<div class="main"><input type="search" placeholder="Search..." oninput="search(this.value)">'
            '<div id="content">' + c + '</div></div>'
            '<script>' + JF + '</sc' + 'ript></body></html>')

def tag(x): return '<span class="tag">' + x + '</span> '
def badge(x): return '<span class="badge">' + x + '</span> '
def note(x): return '<div class="note"><p>' + x + '</p></div>'
def cb(lang, code): return ('<div class="code-block"><button class="copy-btn">Copy</button>'
                             '<pre><code class="language-' + lang + '">' + code + '</code></pre></div>')
def w(path, html):
    full = os.path.join(B, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, 'w', encoding='utf-8').write(html)
    print('wrote', path, str(len(html)) + ' chars')


# =============================================================
# 1. AWWWARDS
# =============================================================
aw = (
    '<h1>Awwwards</h1>'
    '<p>The benchmark for award-winning web design. Awwwards judges the world&#39;s best websites on '
    'design (40%), usability (20%), creativity (20%), and content (20%) — the definitive reference '
    'for cutting-edge digital craft and the current industry standard.</p>'

    '<h2>Overview</h2>'
    '<p>Sites scoring 9.0+ receive Site of the Day; 9.5+ enters Site of the Month contention. '
    'The jury includes Active Theory, Resn, EPIC Agency, and Fantasy. The platform maintains a '
    'searchable archive of thousands of awarded sites — filter by WebGL, Animation, and Portfolios '
    'for the last 12 months to identify current patterns. Awwwards also hosts conferences and runs '
    'an Academy with video courses on design and development excellence.</p>'

    '<h2>Award Tiers</h2>'
    + tag('Site of the Year') + tag('Site of the Month') + tag('Site of the Day')
    + tag('Developer Award') + tag('Honorable Mention') + tag('Mobile Excellence')
    + '<br><br>'
    + badge('9.5+ = SOTM') + badge('9.0+ = SOTD') + badge('8.5+ = Honorable Mention')
    + badge('Usability = 20% of total')

    + '<h2>Design Patterns That Win</h2>'

    '<h3>Cinematic Page Entrances</h3>'
    '<p>Treat the page load as a choreographed sequence. Assets animate in with staggered timing, '
    'typography reveals with purpose, and there is a narrative arc from blank canvas to full '
    'composition within 2 seconds. Every first impression must feel authored, not rendered.</p>'

    '<h3>Scroll as Storytelling Medium</h3>'
    '<p>Scroll-linked 3D camera paths (Three.js + ScrollTrigger), parallax depth layers, pinned '
    'horizontal galleries, and scroll-driven clip-path reveals. The best implementations make users '
    'feel they navigate through space, not down a document.</p>'

    '<h3>Custom Cursor Design</h3>'
    '<p>Magnetic hover with elastic physics, cursor trails with spring-dampened lag, context-sensitive '
    'labels (Drag / View / Open), and SVG cursors that morph between states. A custom cursor is a '
    'near-universal signal of award-level craft.</p>'

    '<h3>WebGL and Three.js Integration</h3>'
    '<p>From subtle GLSL post-processing (displacement on hover, chromatic aberration) to full 3D '
    'environments. Fragment shaders for distortion, mouse-driven displacement maps, particle systems, '
    'and fluid simulations. Even a minimal shader on a hero image raises perceived quality dramatically.</p>'

    '<h3>Typography as Primary Visual Element</h3>'
    '<p>Text splits into characters for staggered entrance, headlines wipe using clip-path masks, '
    'variable font axes animate on scroll, oversized type occupies 40&ndash;60% of the viewport. '
    'Custom or rare display typefaces score higher than commodity Google Fonts.</p>'

    '<h3>Noise, Grain, and Organic Texture</h3>'
    '<p>Perlin/simplex noise in GLSL, grain overlays via SVG feTurbulence as fixed pseudo-elements, '
    'and organic morphing blobs (animated clip-path) add tactility. Flat gradients signal low '
    'creative ambition to experienced jury members.</p>'

    '<h2>Key Techniques</h2>'

    '<h3>Page Transitions</h3>'
    '<p>Abrupt route changes indicate low quality. Use the View Transitions API, Barba.js, or '
    'Next.js App Router + Framer Motion AnimatePresence. The transition reinforces conceptual '
    'identity — luxury brands use slow heavy wipes; tech startups use fast directional slides.</p>'

    '<h3>Microinteractions on Every Element</h3>'
    '<p>Buttons deform on hover (scale + shadow), links have SVG underline draw animations, images '
    'tilt with mouse position, form inputs animate placeholders. Microinteractions are the difference '
    'between a site that feels alive versus inert.</p>'

    '<h3>Performance Under Visual Complexity</h3>'
    '<p>GPU-composited animations only (transform + opacity), code-split JS, lazy-loaded 3D scenes, '
    'compressed AVIF/WebP imagery, and LCP under 2.5s are non-negotiable. Run Chrome Lighthouse '
    'before submitting — a spectacular design with poor performance will not win.</p>'

    '<h3>Horizontal Layouts</h3>'
    '<p>Pinned horizontal galleries break vertical monotony and signal deliberate layout invention. '
    'Implement with GSAP ScrollTrigger horizontal pinning — CSS overflow-x lacks the scroll-sync '
    'precision needed for premium feel.</p>'

    '<h2>Site Categories</h2>'
    + tag('Creative Agency Portfolios') + tag('E-commerce') + tag('Architecture')
    + tag('Fashion &amp; Luxury') + tag('Technology &amp; SaaS') + tag('Film &amp; Music')
    + tag('Games') + tag('Non-profit') + tag('WebGL / 3D') + tag('Photography')
    + tag('Real Estate') + tag('Food &amp; Hospitality')

    + '<h2>Technology Stack Signals</h2>'
    + badge('GSAP + ScrollTrigger') + badge('Three.js / WebGL') + badge('React / Next.js')
    + badge('Lenis smooth scroll') + badge('Barba.js') + badge('Framer Motion')
    + badge('GLSL Shaders') + badge('Svelte / SvelteKit') + badge('Webflow')
    + badge('Spline 3D') + badge('Contentful / Sanity')

    + '<h2>Code Examples</h2>'

    '<h3>Staggered character entrance &mdash; GSAP SplitText</h3>'
    + cb('javascript', '\n'.join([
        "import gsap from 'gsap'",
        "import { SplitText } from 'gsap/SplitText'",
        "gsap.registerPlugin(SplitText)",
        "",
        "const split = new SplitText('h1', { type: 'chars,words' })",
        "gsap.from(split.chars, {",
        "  y: 80, opacity: 0, rotateX: -90,",
        "  transformOrigin: '50% 50% -20px',",
        "  stagger: 0.025, duration: 0.8,",
        "  ease: 'power3.out', delay: 0.3,",
        "})",
        "// Cleanup on unmount: split.revert()",
    ]))

    + '<h3>Magnetic button with elastic return</h3>'
    + cb('javascript', '\n'.join([
        "// Add data-magnetic to any button/link in HTML",
        "document.querySelectorAll('[data-magnetic]').forEach(el => {",
        "  el.addEventListener('mousemove', (e) => {",
        "    const rect = el.getBoundingClientRect()",
        "    const x = e.clientX - rect.left - rect.width / 2",
        "    const y = e.clientY - rect.top - rect.height / 2",
        "    const strength = parseFloat(el.dataset.magneticStrength) || 0.35",
        "    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' })",
        "  })",
        "  el.addEventListener('mouseleave', () => {",
        "    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })",
        "  })",
        "})",
    ]))

    + '<h3>Horizontal scroll gallery with snap</h3>'
    + cb('javascript', '\n'.join([
        "import gsap from 'gsap'",
        "import ScrollTrigger from 'gsap/ScrollTrigger'",
        "gsap.registerPlugin(ScrollTrigger)",
        "",
        "const container = document.querySelector('.h-scroll')",
        "const panels = gsap.utils.toArray('.panel', container)",
        "",
        "gsap.to(panels, {",
        "  xPercent: -100 * (panels.length - 1), ease: 'none',",
        "  scrollTrigger: {",
        "    trigger: container, pin: true, scrub: 1.2,",
        "    snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.2, max: 0.5 } },",
        "    end: () => '+=' + container.offsetWidth,",
        "  },",
        "})",
    ]))

    + '<h3>Smooth lerp cursor with expand state</h3>'
    + cb('javascript', '\n'.join([
        "const cursor = document.querySelector('.cursor')",
        "let mouse = { x: 0, y: 0 }, pos = { x: 0, y: 0 }",
        "document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })",
        "const lerp = (a, b, n) => (1 - n) * a + n * b",
        "",
        ";(function tick() {",
        "  pos.x = lerp(pos.x, mouse.x, 0.1)",
        "  pos.y = lerp(pos.y, mouse.y, 0.1)",
        "  cursor.style.transform = 'translate(' + (pos.x-20) + 'px,' + (pos.y-20) + 'px)'",
        "  requestAnimationFrame(tick)",
        "})()",
        "",
        "document.querySelectorAll('a, button').forEach(el => {",
        "  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'))",
        "  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'))",
        "})",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Design (40%):</strong> Limit palette to 2-3 colors, generous whitespace, clear typographic scale. '
           'Restraint and intentionality score higher than maximalist decoration.')
    + note('<strong>Usability (20%):</strong> Navigation findable in 3 seconds. Design all loading, error, and empty states. '
           'Test mobile at 375px. Basic accessibility (ARIA labels, contrast ratios) is increasingly scored.')
    + note('<strong>Creativity (20%):</strong> Originality means solving the communication problem in an unexpected conceptual form. '
           'Not more effects — a surprising structure. The concept should be statable in one sentence.')
    + note('<strong>Archive strategy:</strong> Filter awwwards.com by WebGL, Animation, Portfolios for the last 12 months. '
           'Build a swipe file of 50+ transitions, cursor behaviors, and scroll patterns — this becomes your design vocabulary.')
)
w(r'reference-sites\awwwards.html', page('Awwwards', aw))


# =============================================================
# 2. GODLY
# =============================================================
godly = (
    '<h1>Godly</h1>'
    '<p>The most carefully curated gallery of web design on the internet. Godly collects the world&#39;s most beautiful, '
    'technically impressive, and aesthetically daring websites — the fastest way to identify contemporary design trends '
    'and extract visual direction for new projects. Updated daily with hand-picked selections.</p>'

    '<h2>Overview</h2>'
    '<p>Godly curates purely on aesthetic taste rather than scored criteria — it skews toward dark, atmospheric, '
    'motion-heavy, and typographically bold work. The collection is a direct window into what the top tier of '
    'independent studios, creative technologists, and brand agencies considers beautiful right now. Use Godly at '
    'the start of a project to establish visual direction, screenshot interactions, and build mood boards.</p>'

    '<h2>Dominant Design Patterns</h2>'

    '<h3>Dark Mode as Default Aesthetic</h3>'
    '<p>The majority of Godly-featured sites use dark backgrounds (#0a0a0a to #111111). Dark mode allows cinematic '
    'imagery to pop, enables glowing/neon accent colors, and creates a premium focused atmosphere. Paired with '
    'near-white text and a single accent color (amber, electric blue, or warm white), this palette appears in ~70% '
    'of featured work. Treat dark mode as the hero experience, not an optional toggle.</p>'

    '<h3>Large, Confident Typography</h3>'
    '<p>Headlines occupy 30-60% of the viewport. Oversized type — often variable fonts at maximum weight — is used '
    'as a primary visual element, not just content delivery. Techniques: viewport-width font sizing (10vw+), '
    'clamp() for fluid scaling, text that bleeds off-screen intentionally, and lettered layouts where '
    'typography IS the layout structure.</p>'

    '<h3>Ambient Video and Canvas Backgrounds</h3>'
    '<p>Autoplay muted video loops, WebGL canvas backgrounds, and CSS gradient animations replace static hero images. '
    'The effect is a living, breathing page that communicates energy before a user reads a word. Common: looping drone '
    'footage, fluid shader simulations, particle fields, and Three.js ambient scenes with soft lighting.</p>'

    '<h3>Reveal Animations on Scroll</h3>'
    '<p>Every content section reveals with intentional animation. Most common patterns: text lines wipe upward behind '
    'a clip-path mask, images scale from 85% to 100% while fading, entire sections slide from horizontal offsets. '
    'The aesthetic quality is <em>weight</em> — reveals should feel deliberate and physical, not floaty or instant.</p>'

    '<h3>Grain and Texture Overlays</h3>'
    '<p>A noise/film grain overlay (3-8% opacity) is applied as a pseudo-element over the entire page. This adds '
    'organic warmth, reduces the clinical flatness of digital screens, and references analog photography and print. '
    'Combine with CSS blend modes (overlay, multiply) for additional depth and richness.</p>'

    '<h3>Elaborate Hover States</h3>'
    '<p>Hover interactions are experiences: images switch or reveal on link hover, text scrambles to reveal new '
    'content, grid cells flip or expand, and 3D perspective shifts occur on mouse position. No hover state is '
    'ignored. The best implementations feel surprising the first time and satisfying on repeat.</p>'

    '<h2>Key Techniques</h2>'

    '<h3>The Reveal Behind Mask Pattern</h3>'
    '<p>Text or images hidden behind clip-path or overflow:hidden container. On scroll/load trigger, the content '
    'translates upward to reveal. This is the single most common animation pattern in premium web design — master '
    'it first before exploring more complex techniques.</p>'

    '<h3>Image Distortion on Hover</h3>'
    '<p>WebGL post-processing applies displacement/warp to images on hover. Libraries: curtains.js, OGL, or custom '
    'Three.js PlaneGeometry with a displacement shader. Even a subtle 2-4px warp elevates a portfolio grid from '
    'ordinary to memorable. The distortion should ease in and out with spring physics.</p>'

    '<h3>Variable Font Animation</h3>'
    '<p>Fonts with variable axes (weight, width, optical size) animated via CSS or JS. A heading that pulses weight '
    'on scroll, or a word that expands letter-spacing on hover, leverages variable fonts as a motion medium. '
    'Combine with GSAP for timeline-controlled variable font transitions.</p>'

    '<h3>Lenis + GSAP Ecosystem</h3>'
    '<p>Virtually all high-motion sites in the Godly gallery use Lenis for smooth scroll, feeding scroll position '
    'into GSAP ScrollTrigger for perfectly synchronized animations. This combination produces the "buttery" scroll '
    'feel that defines the Godly aesthetic. Initialize Lenis first, then pass its scroll event to ScrollTrigger.</p>'

    '<h2>Site Categories Featured</h2>'
    + tag('Creative Agency Portfolios') + tag('Product Launches') + tag('Fashion &amp; Editorial')
    + tag('Music &amp; Sound Artists') + tag('Architecture Studios') + tag('Web3 / NFT Projects')
    + tag('SaaS Product Sites') + tag('Interactive Experiments') + tag('Annual Reports')
    + tag('Film &amp; Documentary') + tag('Luxury Brand Campaigns') + tag('Developer Portfolios')

    + '<h2>Visual Language Vocabulary</h2>'
    + badge('Dark backgrounds') + badge('Oversized headlines') + badge('Film grain overlay')
    + badge('Clip-path reveals') + badge('Ambient video loops') + badge('Magnetic interactions')
    + badge('High contrast') + badge('Monochrome + one accent') + badge('Full-bleed imagery')
    + badge('Kinetic typography') + badge('Lenis smooth scroll') + badge('Variable fonts')

    + '<h2>Code Examples</h2>'

    '<h3>Film grain overlay &mdash; CSS pseudo-element</h3>'
    + cb('css', '\n'.join([
        "/* Animated grain overlay covering entire page */",
        "body::after {",
        "  content: '';",
        "  position: fixed; inset: 0;",
        "  pointer-events: none; z-index: 9999;",
        "  opacity: 0.04;",
        "  background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");",
        "  background-repeat: repeat;",
        "  background-size: 120px 120px;",
        "  animation: grain 0.4s steps(1) infinite;",
        "}",
        "",
        "@keyframes grain {",
        "  0%,100% { transform: translate(0,0) }",
        "  20% { transform: translate(-2%,-3%) }",
        "  40% { transform: translate(3%,-1%) }",
        "  60% { transform: translate(-1%,2%) }",
        "  80% { transform: translate(2%,1%) }",
        "}",
    ]))

    + '<h3>Clip-path text reveal on scroll</h3>'
    + cb('javascript', '\n'.join([
        "// HTML: <div class='line-wrap'><p class='line'>Text</p></div>",
        "// CSS: .line-wrap { overflow: hidden; }",
        "",
        "import gsap from 'gsap'",
        "import ScrollTrigger from 'gsap/ScrollTrigger'",
        "gsap.registerPlugin(ScrollTrigger)",
        "",
        "gsap.utils.toArray('.line').forEach(line => {",
        "  gsap.from(line, {",
        "    yPercent: 110,",
        "    duration: 1,",
        "    ease: 'power3.out',",
        "    scrollTrigger: {",
        "      trigger: line.parentElement,",
        "      start: 'top 85%',",
        "    },",
        "  })",
        "})",
    ]))

    + '<h3>Lenis + GSAP ScrollTrigger integration</h3>'
    + cb('javascript', '\n'.join([
        "import Lenis from '@studio-freight/lenis'",
        "import gsap from 'gsap'",
        "import ScrollTrigger from 'gsap/ScrollTrigger'",
        "gsap.registerPlugin(ScrollTrigger)",
        "",
        "const lenis = new Lenis({",
        "  duration: 1.2,",
        "  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),",
        "  smoothWheel: true,",
        "})",
        "",
        "// Feed Lenis scroll position to ScrollTrigger",
        "lenis.on('scroll', ScrollTrigger.update)",
        "",
        "gsap.ticker.add((time) => lenis.raf(time * 1000))",
        "gsap.ticker.lagSmoothing(0)",
    ]))

    + '<h3>Oversized fluid typography</h3>'
    + cb('css', '\n'.join([
        ".hero-title {",
        "  font-size: clamp(3rem, 11vw, 11rem);",
        "  font-weight: 800;",
        "  line-height: 0.92;",
        "  letter-spacing: -0.03em;",
        "  text-transform: uppercase;",
        "  color: #fff;",
        "}",
        "",
        "/* Intentional bleed off-screen */",
        ".oversize-display {",
        "  font-size: 16vw;",
        "  white-space: nowrap;",
        "  overflow: hidden;",
        "  margin-left: -0.05em; /* optical alignment */",
        "}",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Mood boarding:</strong> Spend 20 minutes on Godly filtered by your project industry before writing code. '
           'Screenshot 10-15 sites that feel right. Extract the common palette, type treatment, and animation vocabulary — '
           'these become your design constraints.')
    + note('<strong>The grain overlay is free polish:</strong> A 3-5% opacity SVG noise overlay as a fixed pseudo-element '
           'is a one-line CSS addition that immediately elevates perceived quality. Every Godly-tier site uses some form of it.')
    + note('<strong>Dark + one accent color:</strong> The Godly aesthetic is almost always: near-black background, near-white '
           'body text, and one saturated accent. Resist the temptation to use more than one accent color.')
    + note('<strong>Weight before polish:</strong> Reveals should feel physical. Use ease: power3.out or custom '
           'cubic-bezier(0.16, 1, 0.3, 1) for entries. Duration 0.8-1.2s for major reveals, 0.3-0.5s for micro-interactions. '
           'Avoid linear or ease-in-out — they feel cheap.')
)
w(r'reference-sites\godly.html', page('Godly', godly))


# =============================================================
# 3. LUSION
# =============================================================
lusion = (
    '<h1>Lusion</h1>'
    '<p>An award-winning creative studio from Bristol, UK specializing in immersive 3D digital experiences. '
    'Lusion integrates design, motion, 3D, and development to create brand worlds that feel visually '
    'distinctive and technically seamless. Their own site is a masterclass in WebGL-first design.</p>'

    '<h2>Overview</h2>'
    '<p>Lusion&#39;s methodology: "create visually distinctive digital experiences that reflect your brand, '
    'engage your audience, and feel original, polished, and built for impact." They emphasize originality '
    'over trend-following. Their work spans interactive web experiences, 3D campaigns, AR/VR, Web3, and '
    'game design. Notable clients include Porsche, Meta, and several AI startups. Studying Lusion&#39;s '
    'work and their technique reveals the ceiling of what is achievable in web-based 3D.</p>'

    '<h2>Core Disciplines</h2>'
    + tag('Web Development') + tag('3D Modeling &amp; Illustration') + tag('Motion Graphics')
    + tag('Interactive Development') + tag('Concept Design') + tag('AR / VR')
    + tag('Web3 / NFT') + tag('Game Design') + tag('Brand Identity')

    + '<h2>Design Philosophy</h2>'

    '<h3>3D as Primary Medium</h3>'
    '<p>Where most agencies use 3D as decoration, Lusion builds entire experiences around it. '
    'Their hero sections are real-time WebGL renders — not video or static images. This requires '
    'deep Three.js/WebGL expertise but produces experiences that are inherently interactive, '
    'responsive to user input, and impossible to replicate with pre-rendered video.</p>'

    '<h3>Originality Over Trends</h3>'
    '<p>Lusion deliberately avoids following web design trends. Each project starts from the brand&#39;s '
    'core identity and builds a unique visual language. The result is work that ages better and feels '
    'more authentic than trend-chasing. For your own work: identify the one thing that is conceptually '
    'unique about the brand and build the visual system around that.</p>'

    '<h3>Seamless Technical Polish</h3>'
    '<p>Lusion&#39;s work is characterized by zero rough edges — every transition, every hover state, '
    'every loading sequence is considered. This level of polish requires systematic QA: test every '
    'interactive state, every browser, every device size. Polish is not a feature to add at the end; '
    'it is a practice maintained throughout development.</p>'

    '<h3>Motion as Brand Expression</h3>'
    '<p>Animation and motion are not decorative — they express brand personality. A fast, snappy '
    'interaction communicates energy and confidence. A slow, weighted transition communicates '
    'luxury and precision. Before animating anything, ask: what does this motion say about the brand?</p>'

    '<h2>Technical Approaches</h2>'

    '<h3>Three.js with Custom GLSL Shaders</h3>'
    '<p>Lusion uses Three.js as the foundation but writes custom fragment and vertex shaders for '
    'visual effects. Displacement maps, noise-driven morphing, custom lighting models, and '
    'post-processing passes (bloom, chromatic aberration, depth of field) are all implemented '
    'in GLSL rather than relying on Three.js defaults. This produces visuals impossible with '
    'standard renderer configurations.</p>'

    '<h3>React Three Fiber Integration</h3>'
    '<p>For component-based projects, Lusion-style work maps naturally to React Three Fiber (R3F) '
    'with Drei helpers. R3F allows Three.js scenes to be composed declaratively, integrated with '
    'React state, and animated via useFrame hooks. Pair with @react-spring/three for physics-based '
    '3D animations.</p>'

    '<h3>Post-Processing Pipeline</h3>'
    '<p>The Lusion aesthetic relies heavily on post-processing: bloom for emissive materials, '
    'chromatic aberration for glassy/lens distortion, SSAO for depth and contact shadows, '
    'and custom tone-mapping for cinematic color grading. In R3F, use the EffectComposer from '
    '@react-three/postprocessing.</p>'

    '<h3>Physics-Based Interactions</h3>'
    '<p>Interactive elements respond with physical simulation — objects react to cursor force, '
    'particles are attracted/repelled by mouse position, and geometry deforms based on pointer '
    'proximity. Libraries: cannon-es or rapier for rigid body physics, custom spring math for '
    'soft-body-like cursor responses.</p>'

    '<h2>Notable Project Techniques</h2>'
    '<h3>Porsche Dream Machine Campaign</h3>'
    '<p>Full-viewport 3D car model with environment mapping, real-time reflections, and scroll-driven '
    'camera animation. The camera path is pre-authored in Blender and baked to a curve that GSAP '
    'scrubs through on scroll. Lighting responds to scroll position via shader uniforms.</p>'

    '<h3>AI Product Experiences</h3>'
    '<p>For AI brands (Oryzo AI, Devin AI), Lusion uses particle systems and fluid simulations to '
    'represent intelligence and data flow. Perlin noise drives particle movement; mouse proximity '
    'creates turbulence. The 3D scene metaphorically communicates the product&#39;s value proposition.</p>'

    '<h2>Technology Stack</h2>'
    + badge('Three.js') + badge('React Three Fiber') + badge('GLSL Shaders') + badge('GSAP')
    + badge('@react-three/postprocessing') + badge('Blender (3D authoring)') + badge('Lenis')
    + badge('cannon-es / rapier') + badge('Drei') + badge('Zustand (state)') + badge('Next.js')

    + '<h2>Code Examples</h2>'

    '<h3>Three.js displacement shader on hover</h3>'
    + cb('glsl', '\n'.join([
        "// Fragment shader — image displacement on hover",
        "uniform sampler2D uTexture;",
        "uniform sampler2D uDisplacement;",
        "uniform float uProgress; // 0 to 1 on hover",
        "varying vec2 vUv;",
        "",
        "void main() {",
        "  vec4 disp = texture2D(uDisplacement, vUv);",
        "  vec2 distortedUv = vUv + disp.rg * uProgress * 0.08;",
        "  vec4 color = texture2D(uTexture, distortedUv);",
        "  gl_FragColor = color;",
        "}",
    ]))

    + '<h3>Scroll-driven camera path (Three.js + GSAP)</h3>'
    + cb('javascript', '\n'.join([
        "import * as THREE from 'three'",
        "import gsap from 'gsap'",
        "import ScrollTrigger from 'gsap/ScrollTrigger'",
        "",
        "// Camera path as a CatmullRom curve",
        "const points = [",
        "  new THREE.Vector3(0, 2, 10),",
        "  new THREE.Vector3(2, 1, 6),",
        "  new THREE.Vector3(-1, 0.5, 2),",
        "  new THREE.Vector3(0, 0, 0),",
        "]",
        "const curve = new THREE.CatmullRomCurve3(points)",
        "",
        "const progress = { t: 0 }",
        "gsap.to(progress, {",
        "  t: 1,",
        "  ease: 'none',",
        "  scrollTrigger: { trigger: '.scene', scrub: 1.5, start: 'top top', end: 'bottom bottom' },",
        "  onUpdate: () => {",
        "    const pos = curve.getPointAt(progress.t)",
        "    camera.position.copy(pos)",
        "    camera.lookAt(0, 0, 0)",
        "  },",
        "})",
    ]))

    + '<h3>Mouse-reactive particle system (R3F)</h3>'
    + cb('jsx', '\n'.join([
        "import { useRef, useMemo } from 'react'",
        "import { useFrame, useThree } from '@react-three/fiber'",
        "import * as THREE from 'three'",
        "",
        "export function Particles({ count = 3000 }) {",
        "  const mesh = useRef()",
        "  const { mouse } = useThree()",
        "",
        "  const positions = useMemo(() => {",
        "    const pos = new Float32Array(count * 3)",
        "    for (let i = 0; i < count; i++) {",
        "      pos.set([",
        "        (Math.random() - 0.5) * 10,",
        "        (Math.random() - 0.5) * 10,",
        "        (Math.random() - 0.5) * 5,",
        "      ], i * 3)",
        "    }",
        "    return pos",
        "  }, [count])",
        "",
        "  useFrame(({ clock }) => {",
        "    const t = clock.elapsedTime",
        "    const pos = mesh.current.geometry.attributes.position",
        "    for (let i = 0; i < count; i++) {",
        "      const ix = i * 3",
        "      pos.array[ix + 1] += Math.sin(t + pos.array[ix] * 0.5) * 0.002",
        "    }",
        "    pos.needsUpdate = true",
        "  })",
        "",
        "  return (",
        "    <points ref={mesh}>",
        "      <bufferGeometry>",
        "        <bufferAttribute attach='attributes-position' args={[positions, 3]} />",
        "      </bufferGeometry>",
        "      <pointsMaterial size={0.02} color='#ffffff' />",
        "    </points>",
        "  )",
        "}",
    ]))

    + '<h3>Post-processing bloom + chromatic aberration (R3F)</h3>'
    + cb('jsx', '\n'.join([
        "import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'",
        "import { BlendFunction } from 'postprocessing'",
        "import * as THREE from 'three'",
        "",
        "export function PostFX() {",
        "  return (",
        "    <EffectComposer>",
        "      <Bloom",
        "        luminanceThreshold={0.2}",
        "        luminanceSmoothing={0.9}",
        "        intensity={0.8}",
        "        blendFunction={BlendFunction.ADD}",
        "      />",
        "      <ChromaticAberration",
        "        offset={new THREE.Vector2(0.0005, 0.0012)}",
        "        blendFunction={BlendFunction.NORMAL}",
        "      />",
        "    </EffectComposer>",
        "  )",
        "}",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Performance budget:</strong> Lusion-level 3D requires a strict performance budget. Target 60fps on '
           'mid-range hardware. Use instanced meshes for repeated geometry, LOD for complex models, and frustum culling. '
           'Profile with Spector.js and Chrome GPU timeline.')
    + note('<strong>Blender to web pipeline:</strong> Model in Blender, optimize geometry (Decimate modifier, remove hidden faces), '
           'export as .glb with Draco compression (gltfpack or Blender glTF exporter). Load with useGLTF from Drei. '
           'Target under 2MB for hero models.')
    + note('<strong>The key insight from Lusion:</strong> 3D is most powerful when it responds to user input. A static 3D hero '
           'is impressive; a 3D hero that reacts to mouse movement, scroll, or click is memorable. Build interactivity '
           'into the concept from the start, not as an afterthought.')
    + note('<strong>Lighting is everything:</strong> The difference between amateur and professional 3D is almost always lighting. '
           'Use environment maps (HDRI) for realistic reflections, three-point lighting for hero objects, and emissive '
           'materials sparingly for glow effects. Spend 40% of 3D development time on lighting.')
)
w(r'reference-sites\lusion.html', page('Lusion', lusion))


# =============================================================
# 4. 21ST.DEV
# =============================================================
dev21 = (
    '<h1>21st.dev</h1>'
    '<p>A community-driven marketplace for discovering and sharing production-ready UI components. '
    '21st.dev functions as a curated library where developers browse pre-made, reusable interface '
    'elements — with a strong emphasis on marketing blocks, interactive UI, and animated components '
    'built for modern React/Next.js applications.</p>'

    '<h2>Overview</h2>'
    '<p>21st.dev organizes components into two primary sections: <strong>Marketing Blocks</strong> '
    'for full page sections (heroes, features, pricing, testimonials) and <strong>UI Components</strong> '
    'for interactive elements (buttons, inputs, cards, modals). The platform features community discovery '
    'mechanisms: Featured, Newest, Best of the Week, Themes, and Top Authors. It is the fastest way to '
    'find polished, copy-paste-ready components beyond the shadcn/ui defaults.</p>'

    '<h2>Marketing Block Categories</h2>'
    + tag('Heroes (73+)') + tag('Features (36+)') + tag('Text Sections (58+)') + tag('CTAs (34+)')
    + tag('Pricing (17+)') + tag('Testimonials (15+)') + tag('Navigation (11+)') + tag('Footers')
    + tag('Logo Clouds') + tag('Stats') + tag('Team Sections') + tag('Blog Sections')

    + '<h2>UI Component Categories</h2>'
    + tag('Buttons (130+)') + tag('Inputs (102+)') + tag('Selects (62+)') + tag('Sliders (45+)')
    + tag('Cards (79+)') + tag('Tabs (38+)') + tag('Modals / Dialogs (37+)') + tag('Calendars (34+)')
    + tag('AI Chat') + tag('Shaders') + tag('Testimonials') + tag('Navigation')

    + '<h2>Design Patterns</h2>'

    '<h3>Hero Sections</h3>'
    '<p>73+ hero variants covering: centered text with animated background, split-layout with '
    'product mockup, full-bleed video/WebGL, gradient mesh backgrounds, word-rotation headlines, '
    'and typewriter-style animated text. Each variant ships as a self-contained React component '
    'with Tailwind classes. Use the hero search to filter by animation style and layout type.</p>'

    '<h3>Feature Grids</h3>'
    '<p>36+ feature section patterns including bento-grid layouts, icon + text cards with hover '
    'animations, screenshot-with-annotation layouts, and animated comparison sliders. The bento '
    'grid variants are especially useful for SaaS products that need to communicate multiple '
    'capabilities simultaneously.</p>'

    '<h3>Button Variety (130+ components)</h3>'
    '<p>The button library is the most comprehensive in any free component collection: gradient '
    'borders, shimmer sweep animations, magnetic hover, ripple effects, icon-morphing states, '
    'loading spinners built in, neon glow variants, and 3D-press tactile buttons. Use this '
    'library to replace every default button in a project with something crafted.</p>'

    '<h3>AI Chat Components</h3>'
    '<p>Specialized components for AI product interfaces: animated message streams, typing '
    'indicators with physics, prompt input fields with expanding textarea, tool-call display '
    'cards, and citation/reference blocks. Particularly valuable for LLM-powered product UIs.</p>'

    '<h2>Technology Stack</h2>'
    + badge('React / Next.js') + badge('Tailwind CSS') + badge('Framer Motion') + badge('shadcn/ui compatible')
    + badge('TypeScript') + badge('Radix UI primitives') + badge('GSAP (select components)')

    + '<h2>How to Use Components</h2>'

    '<h3>Discovery Workflow</h3>'
    '<p>1. Browse by category or use the search. 2. Preview the component in the live demo. '
    '3. Click the code tab to see the full source. 4. Copy-paste into your project. '
    '5. Install any listed peer dependencies (Framer Motion, etc). '
    'Most components are self-contained with no CLI install required.</p>'

    '<h3>Theming and Customization</h3>'
    '<p>Components use Tailwind CSS variables that map to shadcn/ui CSS custom properties. '
    'If you have a configured shadcn/ui setup, most components drop in with correct colors '
    'automatically. Override the accent color with your brand color in globals.css and '
    'components will inherit it.</p>'

    '<h2>Code Examples</h2>'

    '<h3>Animated gradient button (common pattern)</h3>'
    + cb('jsx', '\n'.join([
        "// Shimmer sweep button pattern from 21st.dev",
        "export function ShimmerButton({ children, className, ...props }) {",
        "  return (",
        "    <button",
        "      className={cn(",
        "        'relative overflow-hidden rounded-lg px-6 py-3 font-medium',",
        "        'bg-gradient-to-r from-violet-600 to-indigo-600',",
        "        'text-white shadow-lg transition-all duration-300',",
        "        'before:absolute before:inset-0',",
        "        'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',",
        "        'before:translate-x-[-100%] hover:before:translate-x-[100%]',",
        "        'before:transition-transform before:duration-700',",
        "        className",
        "      )}",
        "      {...props}",
        "    >",
        "      {children}",
        "    </button>",
        "  )",
        "}",
    ]))

    + '<h3>Bento grid layout</h3>'
    + cb('jsx', '\n'.join([
        "// Bento grid — responsive asymmetric layout",
        "export function BentoGrid({ children }) {",
        "  return (",
        "    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]'>",
        "      {children}",
        "    </div>",
        "  )",
        "}",
        "",
        "export function BentoCard({ title, description, className, icon: Icon }) {",
        "  return (",
        "    <div className={cn(",
        "      'group relative overflow-hidden rounded-2xl border border-white/10',",
        "      'bg-gradient-to-br from-zinc-900 to-zinc-800 p-6',",
        "      'hover:border-white/20 transition-all duration-300',",
        "      className",
        "    )}>",
        "      <Icon className='h-8 w-8 text-zinc-400 group-hover:text-white transition-colors' />",
        "      <h3 className='mt-4 text-lg font-semibold text-white'>{title}</h3>",
        "      <p className='mt-2 text-sm text-zinc-400'>{description}</p>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>Animated testimonial card</h3>'
    + cb('jsx', '\n'.join([
        "import { motion } from 'framer-motion'",
        "",
        "export function TestimonialCard({ quote, author, role, avatar }) {",
        "  return (",
        "    <motion.div",
        "      initial={{ opacity: 0, y: 20 }}",
        "      whileInView={{ opacity: 1, y: 0 }}",
        "      viewport={{ once: true }}",
        "      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}",
        "      className='rounded-2xl border border-zinc-800 bg-zinc-900 p-6'",
        "    >",
        "      <p className='text-zinc-300 leading-relaxed'>{quote}</p>",
        "      <div className='mt-4 flex items-center gap-3'>",
        "        <img src={avatar} alt={author} className='h-10 w-10 rounded-full object-cover' />",
        "        <div>",
        "          <p className='font-medium text-white'>{author}</p>",
        "          <p className='text-sm text-zinc-500'>{role}</p>",
        "        </div>",
        "      </div>",
        "    </motion.div>",
        "  )",
        "}",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Start here for marketing pages:</strong> When building a landing page, browse 21st.dev hero and feature '
           'sections before designing from scratch. Find 3-4 components that match the aesthetic direction and adapt them '
           'rather than building from zero.')
    + note('<strong>Button library first:</strong> Replace all default button styles early in a project by picking 2-3 button '
           'variants from 21st.dev that match the brand. Consistent, polished buttons are the first thing users subconsciously '
           'judge about UI quality.')
    + note('<strong>Check peer dependencies:</strong> Some 21st.dev components require Framer Motion, GSAP, or specific Radix '
           'primitives. Check the dependency list before copying — most are already in modern Next.js projects.')
    + note('<strong>Community themes:</strong> Browse the Themes section for full-page design systems contributed by the community. '
           'These are complete design language implementations you can fork as a starting point.')
)
w(r'components\21st-dev.html', page('21st.dev', dev21))


# =============================================================
# 5. MAGICUI
# =============================================================
magicui = (
    '<h1>MagicUI</h1>'
    '<p>A collection of animated, copy-paste React components designed specifically for landing pages '
    'and marketing sites. MagicUI bridges the gap between shadcn/ui&#39;s utility-first approach and '
    'the need for visually distinctive, motion-rich components — with a philosophy that good design '
    'builds trust and communicates organizational competence.</p>'

    '<h2>Overview</h2>'
    '<p>MagicUI is inspired by shadcn/ui but focused on animated, attention-worthy components rather '
    'than functional primitives. Built for Next.js 15 + TypeScript. Copy-paste model — no CLI required '
    'for most components. Components span text animations, background patterns, special effects, buttons, '
    'device mockups, and data display. Over 150+ components across 10 categories. Templates available '
    'for SaaS, AI Agent, Dev Tool, Portfolio, Startup, and more.</p>'

    '<h2>Component Categories</h2>'

    '<h3>Text Animations (18+ components)</h3>'
    + tag('Text Animate') + tag('Typing Animation') + tag('Aurora Text') + tag('Video Text')
    + tag('Number Ticker') + tag('Animated Shiny Text') + tag('Animated Gradient Text')
    + tag('Text Reveal') + tag('Hyper Text') + tag('Word Rotate') + tag('Morphing Text')
    + tag('Spinning Text') + tag('Sparkles Text') + tag('Line Shadow Text') + tag('Scroll Based Velocity')
    + tag('Text 3D Flip') + tag('Text Highlighter') + tag('Dia Text Reveal')

    + '<h3>Background Patterns (10+ components)</h3>'
    + tag('Flickering Grid') + tag('Animated Grid Pattern') + tag('Retro Grid') + tag('Dot Pattern')
    + tag('Grid Pattern') + tag('Hexagon Pattern') + tag('Striped Pattern') + tag('Ripple')
    + tag('Interactive Grid Pattern') + tag('Light Rays') + tag('Noise Texture')

    + '<h3>Special Effects</h3>'
    + tag('Animated Beam') + tag('Border Beam') + tag('Shine Border') + tag('Magic Card')
    + tag('Glare Hover') + tag('Meteors') + tag('Confetti') + tag('Particles') + tag('Globe')
    + tag('Orbiting Circles') + tag('Avatar Circles') + tag('Icon Cloud') + tag('Lens')
    + tag('Smooth Cursor') + tag('Progressive Blur') + tag('Dotted Map') + tag('Pointer')

    + '<h3>Core Components</h3>'
    + tag('Marquee') + tag('Terminal') + tag('Hero Video Dialog') + tag('Bento Grid')
    + tag('Animated List') + tag('Dock') + tag('Tweet Card') + tag('Animated Theme Toggler')

    + '<h3>Buttons</h3>'
    + tag('Rainbow Button') + tag('Shimmer Button') + tag('Ripple Button') + tag('Shiny Button')
    + tag('Pulsating Button') + tag('Interactive Hover Button')

    + '<h3>Device Mockups</h3>'
    + tag('Safari Browser Mockup') + tag('iPhone Mockup') + tag('Android Mockup')

    + '<h2>Key Design Techniques</h2>'

    '<h3>Animated Beam</h3>'
    '<p>Draws an animated SVG path between two elements — perfect for visualizing data flow in '
    'AI product diagrams or architecture overviews. The beam traces a curved path with a glowing '
    'gradient that animates along the path. Extremely effective for showing connections between '
    'components in a product&#39;s system architecture illustration.</p>'

    '<h3>Border Beam</h3>'
    '<p>Animated gradient that sweeps around a card&#39;s border in a continuous loop. Creates a '
    '"glowing border" effect that adds premium visual energy to feature cards, pricing cards, or '
    'hero CTAs. Customize the color, size, and duration to match brand palette.</p>'

    '<h3>Globe Component</h3>'
    '<p>Interactive 3D globe with location dots and animated arcs — visualizes global reach and '
    'connectivity. Built on cobe (a lightweight WebGL globe library). Commonly used in SaaS hero '
    'sections to communicate "worldwide" or "infrastructure" concepts without complex Three.js setup.</p>'

    '<h3>Marquee</h3>'
    '<p>Smooth infinite-scroll marquee with configurable speed, direction, and pause-on-hover. '
    'Used for logo clouds, testimonial tickers, and feature highlight strips. The vertical variant '
    'is useful for scrolling testimonial feeds. A fundamental component for any marketing page '
    'that needs to communicate social proof or partner logos.</p>'

    '<h3>Magic Card</h3>'
    '<p>Card with a spotlight/glow effect that follows the mouse cursor — creates a premium '
    'glass-morphism feel with 3D perspective tilt. The gradient glow tracks the cursor position '
    'within the card, creating a magnetic light effect. Stack multiple Magic Cards in a grid '
    'for a pricing or features section that feels alive.</p>'

    '<h2>Templates</h2>'
    + badge('SaaS') + badge('AI Agent') + badge('Dev Tool') + badge('Mobile') + badge('Startup')
    + badge('Portfolio') + badge('Changelog') + badge('Blog') + badge('CodeForge')

    + '<h2>Technology Stack</h2>'
    + badge('Next.js 15') + badge('TypeScript') + badge('Tailwind CSS') + badge('Framer Motion')
    + badge('shadcn/ui compatible') + badge('cobe (globe)') + badge('canvas-confetti')

    + '<h2>Code Examples</h2>'

    '<h3>Shimmer button</h3>'
    + cb('jsx', '\n'.join([
        "// components/ui/shimmer-button.tsx",
        "import React from 'react'",
        "import { cn } from '@/lib/utils'",
        "",
        "interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {",
        "  shimmerColor?: string",
        "  shimmerSize?: string",
        "  borderRadius?: string",
        "  shimmerDuration?: string",
        "  background?: string",
        "}",
        "",
        "export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(",
        "  ({ children, className, shimmerColor = '#ffffff', shimmerSize = '0.05em',",
        "    shimmerDuration = '3s', borderRadius = '100px', background = 'rgba(0,0,0,1)',",
        "    ...props }, ref) => {",
        "    return (",
        "      <button",
        "        style={{ '--shimmer-color': shimmerColor, '--spread': '90deg',",
        "          '--shimmer-size': shimmerSize, '--radius': borderRadius,",
        "          '--speed': shimmerDuration, '--cut': '0.1em', '--bg': background } as any}",
        "        className={cn(",
        "          'group relative z-0 flex cursor-pointer items-center justify-center',",
        "          'overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3',",
        "          '[border-radius:var(--radius)] [background:var(--bg)]',",
        "          'text-white',",
        "          className",
        "        )}",
        "        ref={ref}",
        "        {...props}",
        "      >",
        "        <div className='absolute inset-0 overflow-visible [container-type:size]'>",
        "          <div className='absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]'>",
        "            <div className='absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]' />",
        "          </div>",
        "        </div>",
        "        <span className='relative z-10'>{children}</span>",
        "      </button>",
        "    )",
        "  }",
        ")",
    ]))

    + '<h3>Animated Beam (connecting two elements)</h3>'
    + cb('jsx', '\n'.join([
        "import { AnimatedBeam } from '@/components/ui/animated-beam'",
        "import { useRef } from 'react'",
        "",
        "export function BeamDemo() {",
        "  const containerRef = useRef<HTMLDivElement>(null)",
        "  const fromRef = useRef<HTMLDivElement>(null)",
        "  const toRef = useRef<HTMLDivElement>(null)",
        "",
        "  return (",
        "    <div ref={containerRef} className='relative flex items-center justify-between p-10'>",
        "      <div ref={fromRef} className='h-12 w-12 rounded-full bg-white shadow-lg' />",
        "      <div ref={toRef} className='h-12 w-12 rounded-full bg-white shadow-lg' />",
        "      <AnimatedBeam",
        "        containerRef={containerRef}",
        "        fromRef={fromRef}",
        "        toRef={toRef}",
        "        gradientStartColor='#ffaa40'",
        "        gradientStopColor='#9c40ff'",
        "        duration={4}",
        "      />",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>Number Ticker (animated counting)</h3>'
    + cb('jsx', '\n'.join([
        "import { NumberTicker } from '@/components/ui/number-ticker'",
        "",
        "// Counts up to the target number when it enters the viewport",
        "export function StatsSection() {",
        "  return (",
        "    <div className='grid grid-cols-3 gap-8 text-center'>",
        "      <div>",
        "        <NumberTicker value={120000} className='text-5xl font-bold text-white' />",
        "        <p className='text-zinc-400 mt-1'>Users worldwide</p>",
        "      </div>",
        "      <div>",
        "        <NumberTicker value={99.9} decimalPlaces={1} className='text-5xl font-bold text-white' />",
        "        <p className='text-zinc-400 mt-1'>Uptime %</p>",
        "      </div>",
        "      <div>",
        "        <NumberTicker value={4} className='text-5xl font-bold text-white' />",
        "        <p className='text-zinc-400 mt-1'>ms avg response</p>",
        "      </div>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>Marquee logo cloud</h3>'
    + cb('jsx', '\n'.join([
        "import { Marquee } from '@/components/ui/marquee'",
        "",
        "const logos = ['Vercel', 'Linear', 'Stripe', 'Loom', 'Raycast', 'Arc']",
        "",
        "export function LogoCloud() {",
        "  return (",
        "    <div className='relative overflow-hidden py-8'>",
        "      {/* Fade edges */}",
        "      <div className='pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10' />",
        "      <div className='pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10' />",
        "      <Marquee pauseOnHover speed={30} className='[--duration:30s]'>",
        "        {logos.map(logo => (",
        "          <div key={logo} className='mx-8 text-zinc-500 font-semibold text-lg hover:text-white transition-colors'>",
        "            {logo}",
        "          </div>",
        "        ))}",
        "      </Marquee>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Install pattern:</strong> Check magicui.design/docs/installation for the CLI command. Most components: '
           'npx magicui-cli add [component-name]. Copy-paste also works for all components.')
    + note('<strong>Best use cases:</strong> MagicUI components excel in hero sections, feature grids, and stats sections '
           'of marketing/SaaS landing pages. The animated text components (Aurora Text, Animated Gradient Text) are '
           'immediately impactful for hero headlines.')
    + note('<strong>Globe for global products:</strong> The Globe component is one of the most-copied elements in modern '
           'SaaS sites. Use it in hero sections to communicate global infrastructure without complex 3D setup.')
    + note('<strong>Combine with shadcn/ui:</strong> MagicUI is designed to layer on top of a shadcn/ui installation. '
           'Use shadcn for functional components (forms, dialogs, dropdowns) and MagicUI for hero/marketing sections.')
)
w(r'components\magicui.html', page('MagicUI', magicui))


# =============================================================
# 6. ACETERNITY UI
# =============================================================
aceternity = (
    '<h1>Aceternity UI</h1>'
    '<p>A premium collection of animated React/Next.js components built with Framer Motion and Tailwind CSS. '
    'Marketed as "shadcn compatible components with microinteractions and animations." 120,000+ users. '
    'Covers background effects, cards, text animations, scroll interactions, 3D components, and '
    'complete design blocks for every section of a marketing site.</p>'

    '<h2>Overview</h2>'
    '<p>Aceternity UI provides the highest density of visually impressive effects in any React component '
    'library. Components range from subtle hover states to full WebGL shaders. Built with Framer Motion '
    'for animation, Tailwind CSS for styling, and SVG-based effects for masks and filters. Free components '
    'plus an All-Access subscription for templates and premium blocks. The library is particularly strong '
    'for: hero background effects, card interactions, and scroll-based animations.</p>'

    '<h2>Background &amp; Effect Components</h2>'
    + tag('Webcam Pixel Grid') + tag('Parallax Hero Images') + tag('Dotted Glow Background')
    + tag('Background Ripple Effect') + tag('Sparkles') + tag('Background Gradient')
    + tag('Wavy Background') + tag('Background Boxes') + tag('Background Beams')
    + tag('Background Beams With Collision') + tag('Background Lines') + tag('Aurora Background')
    + tag('Meteors') + tag('Glowing Stars') + tag('Shooting Stars') + tag('Vortex')
    + tag('Spotlight') + tag('Canvas Reveal Effect') + tag('SVG Mask Effect') + tag('Tracing Beam')
    + tag('Lamp Effect') + tag('Grid &amp; Dot Backgrounds') + tag('Glowing Effect')
    + tag('Google Gemini Effect') + tag('Noise Background') + tag('Dither Shader')

    + '<h2>Card Components</h2>'
    + tag('3D Card Effect') + tag('Evervault Card') + tag('Card Stack') + tag('Card Hover Effect')
    + tag('Wobble Card') + tag('Expandable Card') + tag('Card Spotlight') + tag('Focus Cards')
    + tag('Infinite Moving Cards') + tag('Draggable Card') + tag('Glare Card')
    + tag('Direction Aware Hover') + tag('Comet Card') + tag('Terminal') + tag('Keyboard')
    + tag('ASCII Art') + tag('Pixelated Canvas')

    + '<h2>Text Animation Components</h2>'
    + tag('Canvas Text') + tag('Encrypted Text') + tag('Layout Text Flip') + tag('Colorful Text')
    + tag('Squiggly Text') + tag('Text Generate Effect') + tag('Typewriter Effect') + tag('Flip Words')
    + tag('Text Hover Effect') + tag('Container Text Flip') + tag('Hero Highlight')
    + tag('Text Reveal Card') + tag('Text Flipping Board')

    + '<h2>Scroll &amp; Parallax</h2>'
    + tag('Parallax Scroll') + tag('Sticky Scroll Reveal') + tag('Macbook Scroll')
    + tag('Container Scroll Animation') + tag('Hero Parallax')

    + '<h2>Navigation Components</h2>'
    + tag('Floating Navbar') + tag('Navbar Menu') + tag('Sidebar') + tag('Floating Dock')
    + tag('Tabs') + tag('Resizable Navbar') + tag('Sticky Banner')

    + '<h2>Specialty Components</h2>'
    + tag('3D Globe') + tag('World Map') + tag('3D Pin') + tag('3D Marquee')
    + tag('GitHub Globe') + tag('Timeline') + tag('Compare (diff slider)')
    + tag('Animated Modal') + tag('Animated Tooltip') + tag('Link Preview')
    + tag('Following Pointer') + tag('Lens') + tag('Multi Step Loader')
    + tag('Magnetic Button') + tag('Moving Border') + tag('Stateful Button')
    + tag('Signup Form') + tag('Placeholders &amp; Vanish Input') + tag('File Upload') + tag('Gooey Input')
    + tag('Layout Grid') + tag('Bento Grid') + tag('Apple Cards Carousel') + tag('Animated Testimonials')

    + '<h2>Design Blocks (100+ full sections)</h2>'
    + badge('Hero Sections (21+)') + badge('Shaders (3+)') + badge('Illustrations (22+)')
    + badge('Logo Clouds (6+)') + badge('Bento Grids (6+)') + badge('CTA Sections (6+)')
    + badge('Testimonials (7+)') + badge('Team Sections (4+)') + badge('Feature Sections (18+)')
    + badge('Pricing Sections (6+)') + badge('Cards (4+)') + badge('Navbars (7+)')
    + badge('Footers (4+)') + badge('Login/Signup (6+)') + badge('FAQs (4+)')
    + badge('Stats Sections (4+)') + badge('Backgrounds (11+)') + badge('Text Animations (4+)')

    + '<h2>Standout Components</h2>'

    '<h3>Spotlight Effect</h3>'
    '<p>A radial gradient spotlight that follows the mouse cursor across a dark hero section — creates '
    'the impression of a physical spotlight illuminating content. Extremely effective as a hero '
    'background. The SVG-based implementation is performant and works without WebGL. Use for dark '
    'hero sections where you want dramatic focus on the headline.</p>'

    '<h3>3D Card Effect</h3>'
    '<p>Cards tilt in 3D based on mouse position using CSS perspective transforms. The rotation axis '
    'follows the cursor, creating a physical, tactile card feel. Add a glare overlay for extra realism. '
    'One of the most-copied effects in modern web design — fundamentally changes how product '
    'feature cards feel in a pricing or features section.</p>'

    '<h3>Canvas Reveal Effect</h3>'
    '<p>Content is obscured by an animated pixel/block reveal on hover — the canvas fills with color '
    'blocks that then clear to reveal the underlying content. Based on canvas 2D API drawing routines '
    'with requestAnimationFrame. Creates a dramatic, game-like reveal effect for project cards or '
    'portfolio thumbnails.</p>'

    '<h3>Wavy Background</h3>'
    '<p>Animated SVG wave paths as a hero background using CSS animations on SVG path d-attribute. '
    'Smooth, organic motion without WebGL or canvas. Highly customizable colors. Use as a background '
    'for pricing sections or CTA banners to add life without heavy 3D setup.</p>'

    '<h3>Macbook Scroll</h3>'
    '<p>A 3D Macbook that opens as the user scrolls, revealing a screen content screenshot inside. '
    'Scroll-linked lid-opening animation using GSAP ScrollTrigger with a 3D CSS perspective transform. '
    'Extremely effective for SaaS product demos — it contextualizes the product in a familiar device '
    'and makes the scroll feel purposeful.</p>'

    '<h2>Technology Stack</h2>'
    + badge('Framer Motion') + badge('Tailwind CSS') + badge('React / Next.js') + badge('TypeScript')
    + badge('SVG masks and filters') + badge('Canvas 2D API') + badge('CSS perspective transforms')
    + badge('Radix UI') + badge('shadcn/ui compatible') + badge('CSS custom properties')

    + '<h2>Code Examples</h2>'

    '<h3>Spotlight hero background</h3>'
    + cb('jsx', '\n'.join([
        "import { Spotlight } from '@/components/ui/spotlight'",
        "",
        "export function HeroSection() {",
        "  return (",
        "    <div className='relative min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]'>",
        "      <Spotlight",
        "        className='-top-40 left-0 md:left-60 md:-top-20'",
        "        fill='white'",
        "      />",
        "      <div className='relative z-10 flex flex-col items-center justify-center pt-40 px-4'>",
        "        <h1 className='text-4xl md:text-7xl font-bold text-white text-center'>",
        "          Build something amazing",
        "        </h1>",
        "        <p className='mt-6 text-neutral-300 max-w-2xl text-center text-lg'>",
        "          The spotlight follows your cursor to create a dramatic focus effect.",
        "        </p>",
        "      </div>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>3D card tilt effect</h3>'
    + cb('jsx', '\n'.join([
        "import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'",
        "",
        "export function ProductCard({ title, description, image }) {",
        "  return (",
        "    <CardContainer className='inter-var'>",
        "      <CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>",
        "        <CardItem translateZ='50' className='text-xl font-bold text-neutral-600 dark:text-white'>",
        "          {title}",
        "        </CardItem>",
        "        <CardItem as='p' translateZ='60' className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'>",
        "          {description}",
        "        </CardItem>",
        "        <CardItem translateZ='100' className='w-full mt-4'>",
        "          <img src={image} className='h-60 w-full object-cover rounded-xl' alt={title} />",
        "        </CardItem>",
        "      </CardBody>",
        "    </CardContainer>",
        "  )",
        "}",
    ]))

    + '<h3>Text generate effect (word-by-word reveal)</h3>'
    + cb('jsx', '\n'.join([
        "import { TextGenerateEffect } from '@/components/ui/text-generate-effect'",
        "",
        "// Each word fades in sequentially with a stagger delay",
        "// Perfect for hero taglines and section descriptions",
        "export function AnimatedTagline() {",
        "  return (",
        "    <TextGenerateEffect",
        "      words='Build beautiful products faster than ever before'",
        "      className='text-4xl font-bold text-white'",
        "    />",
        "  )",
        "}",
    ]))

    + '<h3>Vanish input (text disappears on submit)</h3>'
    + cb('jsx', '\n'.join([
        "import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'",
        "",
        "const placeholders = [",
        "  'What do you want to build today?',",
        "  'Search for components...',",
        "  'Ask me anything...',",
        "]",
        "",
        "export function SearchInput() {",
        "  const handleSubmit = (e) => {",
        "    e.preventDefault()",
        "    // Handle submission — input will animate and vanish",
        "  }",
        "",
        "  return (",
        "    <PlaceholdersAndVanishInput",
        "      placeholders={placeholders}",
        "      onChange={(e) => console.log(e.target.value)}",
        "      onSubmit={handleSubmit}",
        "    />",
        "  )",
        "}",
    ]))

    + '<h2>Installation</h2>'
    + cb('bash', '\n'.join([
        "# CLI installation (recommended)",
        "npx shadcn@latest add 'https://ui.aceternity.com/registry/spotlight.json'",
        "",
        "# Or copy component source from ui.aceternity.com/components",
        "# Then install peer dependencies:",
        "npm install framer-motion clsx tailwind-merge",
        "",
        "# Add to tailwind.config.js:",
        "# animation: { spotlight: '...' }",
        "# keyframes: { spotlight: '...' }",
    ]))

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Performance:</strong> Many Aceternity components use canvas or SVG-based animations. '
           'They are designed to be performant but some (Canvas Reveal Effect, Vortex) are heavy — '
           'use them as focal points, not repeated across many cards.')
    + note('<strong>Shadcn compatibility:</strong> Components use the same cn() utility and CSS variable system as shadcn/ui. '
           'If you have a shadcn/ui setup, drop-in installation works without theming conflicts.')
    + note('<strong>Best background effects:</strong> Spotlight, Aurora Background, Wavy Background, and Background Beams '
           'are the highest-impact additions to a dark hero section. Pick one and use it consistently.')
    + note('<strong>Scroll interactions:</strong> The Macbook Scroll, Sticky Scroll Reveal, and Container Scroll Animation '
           'components are outstanding for product demo sections. They make the scroll feel purposeful and contextualize '
           'the product in a memorable way.')
)
w(r'components\aceternity.html', page('Aceternity UI', aceternity))


# =============================================================
# 7. SPLINE SCENES
# =============================================================
spline = (
    '<h1>Spline Scenes</h1>'
    '<p>Spline is a browser-based 3D design platform that exports interactive scenes directly to the web. '
    'It bridges the gap between designer and developer for 3D web content — enabling designers to create '
    'interactive 3D without Three.js code, and developers to embed production-ready scenes with a '
    'single script tag or React component.</p>'

    '<h2>Overview</h2>'
    '<p>Spline operates as a full 3D design tool in the browser: modeling, rigging, animation, physics, '
    'particles, and interactive states are all built within the Spline editor. Scenes are published to '
    'Spline&#39;s CDN and embedded via the spline-viewer web component or the @splinetool/react-spline '
    'package. The community library contains thousands of free scenes spanning product mockups, '
    'abstract 3D objects, characters, UI elements, and environments — all embeddable with one URL.</p>'

    '<h2>How Spline Works for Web</h2>'

    '<h3>Scene Creation</h3>'
    '<p>Design in the Spline editor (browser or desktop app): create 3D geometry with primitives and '
    'Boolean operations, apply materials with PBR shaders, set up animations with keyframe timelines, '
    'configure interactive states triggered by hover/click/scroll, add physics and particle systems. '
    'The editor is closer to Figma UX than Blender — accessible to designers without 3D expertise.</p>'

    '<h3>Export and Embedding</h3>'
    '<p>Publish a scene to get a CDN URL. Embed options: HTML web component (spline-viewer), '
    'React component (@splinetool/react-spline), Next.js with dynamic import (to avoid SSR issues), '
    'Webflow embed block, Framer component, iOS (Swift), and Android (Kotlin). The scene streams '
    'from Spline&#39;s CDN — no build step or asset optimization required on your end.</p>'

    '<h3>Interactivity Without Code</h3>'
    '<p>Spline&#39;s Events system allows hover, click, mousedown, mouseup, and scroll triggers to '
    'change object states, play animations, or emit custom JavaScript events — all configured in '
    'the editor without writing GLSL or Three.js code. For simple interactive 3D (button hover '
    'states, product rotation, floating elements), Spline handles it entirely in the design tool.</p>'

    '<h2>Community Scene Categories</h2>'
    + tag('Product Mockups') + tag('3D Icons &amp; UI Elements') + tag('Abstract Objects')
    + tag('Characters &amp; Avatars') + tag('Environments &amp; Rooms') + tag('Brand Logos in 3D')
    + tag('Glassmorphism Objects') + tag('Particle Systems') + tag('Data Visualizations')
    + tag('Device Mockups') + tag('Material Studies') + tag('Physics Simulations')
    + tag('Animated Typography') + tag('Nature &amp; Organic Forms') + tag('Sci-Fi / Tech Aesthetics')

    + '<h2>Best Use Cases</h2>'

    '<h3>Hero Section 3D Objects</h3>'
    '<p>A floating, slowly rotating 3D object in a hero section communicates product modernity '
    'immediately. Browse the Spline community for abstract shapes, device mockups, or product '
    'representations that match your brand aesthetic. Embed with react-spline and add a subtle '
    'mouse-parallax offset via JavaScript to make it interactive without modifying the Spline scene.</p>'

    '<h3>Interactive Product Showcases</h3>'
    '<p>For physical products (hardware, packaging, devices), a 360-degree interactive Spline scene '
    'is more engaging than static photography. Users drag to rotate, the object responds physically, '
    'and specific angles can trigger state changes (opening a laptop lid, revealing internal components). '
    'Spline handles all of this without custom Three.js code.</p>'

    '<h3>Background Atmospheres</h3>'
    '<p>Subtle animated 3D particle fields, floating geometric shapes, or abstract morphing objects '
    'as page backgrounds add depth and motion without distracting from content. Use Spline&#39;s '
    'particle system for organic ambient motion. Set scene opacity low and blend with CSS mix-blend-mode '
    'for subtle integration with 2D content.</p>'

    '<h3>Loading Screens and Micro-Animations</h3>'
    '<p>Small, focused Spline scenes (spinning logo, animated icon, loader animation) add premium '
    'touch to utility moments. A 3D logo that assembles during page load, or an animated product '
    'icon on a feature card, elevates perceived craft significantly for minimal development effort.</p>'

    '<h2>Technical Integration</h2>'

    '<h3>React / Next.js Integration</h3>'
    '<p>Use @splinetool/react-spline with dynamic import to avoid SSR hydration issues. The Spline '
    'component mounts a WebGL canvas — it must be client-side only. Use Suspense for loading state '
    'and onLoad callback to trigger entrance animations after the scene is ready.</p>'

    '<h3>JavaScript Events API</h3>'
    '<p>Listen to Spline scene events in JavaScript to synchronize 3D interactions with 2D UI. '
    'Trigger HTML state changes when a user clicks a 3D object, or drive Spline animations from '
    'scroll position by passing scroll values as variables via the Spline Application API.</p>'

    '<h3>Performance Considerations</h3>'
    '<p>Spline scenes are WebGL and stream from CDN — they add 200-500KB+ to page weight. '
    'Lazy-load scenes below the fold. Use the loading prop to show a skeleton until the scene '
    'is ready. Avoid multiple heavy Spline scenes on one page — treat each as a focal point.</p>'

    '<h2>Technology Stack</h2>'
    + badge('@splinetool/react-spline') + badge('@splinetool/viewer') + badge('WebGL')
    + badge('Spline Runtime') + badge('Next.js dynamic import') + badge('React.Suspense')
    + badge('Spline Application API')

    + '<h2>Code Examples</h2>'

    '<h3>Basic React/Next.js embed</h3>'
    + cb('jsx', '\n'.join([
        "import dynamic from 'next/dynamic'",
        "import { Suspense } from 'react'",
        "",
        "// Must be dynamic to prevent SSR issues with WebGL",
        "const Spline = dynamic(() => import('@splinetool/react-spline'), {",
        "  ssr: false,",
        "})",
        "",
        "export function HeroScene() {",
        "  return (",
        "    <div className='relative h-screen w-full'>",
        "      <Suspense fallback={<div className='h-full bg-black animate-pulse' />}>",
        "        <Spline",
        "          scene='https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode'",
        "          className='absolute inset-0'",
        "        />",
        "      </Suspense>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>Spline with JavaScript event handling</h3>'
    + cb('jsx', '\n'.join([
        "import dynamic from 'next/dynamic'",
        "import { useRef } from 'react'",
        "",
        "const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })",
        "",
        "export function InteractiveScene() {",
        "  const splineRef = useRef(null)",
        "",
        "  function onLoad(splineApp) {",
        "    splineRef.current = splineApp",
        "    // Listen for custom Spline events",
        "    splineApp.addEventListener('mouseDown', (e) => {",
        "      if (e.target.name === 'Button3D') {",
        "        console.log('3D button clicked')",
        "        // Trigger HTML state change",
        "      }",
        "    })",
        "  }",
        "",
        "  // Drive Spline animation from scroll",
        "  function onScroll(e) {",
        "    const progress = window.scrollY / document.body.offsetHeight",
        "    if (splineRef.current) {",
        "      // Set a Spline variable to control animation",
        "      splineRef.current.setVariable('scrollProgress', progress)",
        "    }",
        "  }",
        "",
        "  return <Spline scene='...' onLoad={onLoad} />",
        "}",
    ]))

    + '<h3>Mouse parallax offset on Spline container</h3>'
    + cb('jsx', '\n'.join([
        "import { useRef, useEffect } from 'react'",
        "import dynamic from 'next/dynamic'",
        "",
        "const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })",
        "",
        "export function ParallaxScene() {",
        "  const containerRef = useRef(null)",
        "",
        "  useEffect(() => {",
        "    const handleMouseMove = (e) => {",
        "      const { innerWidth, innerHeight } = window",
        "      const x = (e.clientX / innerWidth - 0.5) * 30  // -15 to 15",
        "      const y = (e.clientY / innerHeight - 0.5) * 20  // -10 to 10",
        "      if (containerRef.current) {",
        "        containerRef.current.style.transform =",
        "          'translate(' + x + 'px,' + y + 'px)'",
        "      }",
        "    }",
        "    window.addEventListener('mousemove', handleMouseMove)",
        "    return () => window.removeEventListener('mousemove', handleMouseMove)",
        "  }, [])",
        "",
        "  return (",
        "    <div className='overflow-hidden'>",
        "      <div ref={containerRef} style={{ transition: 'transform 0.3s ease-out' }}>",
        "        <Spline scene='...' />",
        "      </div>",
        "    </div>",
        "  )",
        "}",
    ]))

    + '<h3>HTML web component (no framework)</h3>'
    + cb('html', '\n'.join([
        '<!-- No build step required -->',
        '<script type="module" src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></sc' + 'ript>',
        '',
        '<spline-viewer',
        '  url="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"',
        '  style="width: 100%; height: 600px;"',
        '></spline-viewer>',
        '',
        '<!-- Hide Spline watermark (paid feature) -->',
        '<spline-viewer url="..." hide-ui></spline-viewer>',
    ]))

    + '<h2>Community Scene Discovery</h2>'
    '<p>Browse community scenes at spline.design/community. Filter by: Recently Published, Most Liked, '
    'and category tags (UI, Product, Abstract, Character). Scenes can be remixed — clone any public '
    'scene into your own Spline account and modify materials, colors, and animations to match '
    'your brand. This is the fastest way to get production-ready 3D without modeling from scratch.</p>'

    + '<h2>Implementation Notes</h2>'
    + note('<strong>Always use dynamic import:</strong> Spline uses WebGL and window APIs. It will crash during SSR. '
           'Always wrap with next/dynamic with ssr: false, or use a useEffect check for window availability.')
    + note('<strong>Hide the Spline watermark:</strong> The "Built with Spline" watermark requires a paid subscription to remove. '
           'For client work, budget for the Spline Pro plan or use the CSS overlay trick (cover with a same-color div).')
    + note('<strong>Scene performance:</strong> Target scenes under 5MB for hero use. In Spline, optimize by: reducing polygon '
           'count (Reduce modifier), using texture atlases, disabling shadows on non-hero objects, and limiting particle count.')
    + note('<strong>Fallback strategy:</strong> Always provide a static image fallback for users without WebGL support or on '
           'low-power devices. Use a picture element or CSS background-image that renders before the Spline scene loads.')
)
w(r'3d\spline-scenes.html', page('Spline Scenes', spline))

print('All 7 files written successfully.')
