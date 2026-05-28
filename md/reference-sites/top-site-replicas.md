# Top Site Design Replicas — Pattern Reference

**Purpose:** Production-ready HTML/CSS/JS snippets replicating iconic design patterns from best-in-class websites. Copy-paste into any project. No framework required.

**Agency Brands:**
- **DJ Custom Reno** — Toronto renovation contractor
- **Motta Kitchen** — Luxury kitchen brand
- **SathiDeals** — Real estate team
- **GardenSuites4You** — Garden suite builder

---

## 1. Linear.app

### Key Design Patterns
- Deep dark background (`#0a0a0a`) with subtle purple/blue gradient mesh that shifts on scroll
- Feature grid uses thin 1px borders with hover glow — cards feel premium without being heavy
- Hero headline uses tight letter-spacing with a gradient text clip effect on the key word
- Consistent use of `Inter` or similar geometric sans at varied weights (300–700) for hierarchy
- Micro-animations on card hover: slight Y translate + border color shift

### Iconic Element: Gradient Mesh Hero + Feature Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Linear-Style Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --border: rgba(255,255,255,0.08);
    --text: #e8e8e8;
    --muted: #888;
    --accent: #6366f1;
    --accent2: #8b5cf6;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Gradient mesh background */
  .mesh-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .mesh-bg::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    animation: meshFloat1 12s ease-in-out infinite;
  }
  .mesh-bg::after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    animation: meshFloat2 15s ease-in-out infinite;
  }

  @keyframes meshFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.97); }
  }
  @keyframes meshFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, -40px) scale(1.08); }
  }

  /* Hero section */
  .hero {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 120px 24px 80px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.3);
    color: #a5b4fc;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 32px;
  }

  .hero-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .hero h1 {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    max-width: 800px;
    margin-bottom: 24px;
  }

  .gradient-text {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: 18px;
    color: var(--muted);
    max-width: 520px;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .hero-cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: #5254e7; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 12px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: var(--text); transform: translateY(-1px); }

  /* Feature grid */
  .grid-section {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .feature-card {
    background: var(--bg);
    padding: 36px 32px;
    transition: background 0.2s;
    cursor: default;
  }
  .feature-card:hover { background: var(--surface); }

  .feature-icon {
    width: 40px;
    height: 40px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .feature-card h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .feature-card p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
  }
</style>
</head>
<body>

<div class="mesh-bg"></div>

<section class="hero">
  <div class="hero-badge">Now Available in Toronto</div>
  <h1>Build spaces that <span class="gradient-text">last a lifetime</span></h1>
  <p>Premium renovation craftsmanship with transparent pricing, guaranteed timelines, and no surprises.</p>
  <div class="hero-cta">
    <button class="btn-primary">Get a Free Quote</button>
    <button class="btn-ghost">View Our Work</button>
  </div>
</section>

<div class="grid-section">
  <div class="feature-card">
    <div class="feature-icon">🏗</div>
    <h3>Full-Scope Renovations</h3>
    <p>Kitchens, bathrooms, basements, and full home transformations handled end-to-end.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">📋</div>
    <h3>Transparent Estimates</h3>
    <p>Line-item quotes with no hidden costs. You know exactly what you're paying before we start.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">⏱</div>
    <h3>On-Time Guarantee</h3>
    <p>We commit to a schedule and stick to it. Delays cost us, not you.</p>
  </div>
</div>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Direct fit — dark premium feel elevates contractor perception, mesh background adds tech-forward trust |
| **Motta Kitchen** | Use mesh in warm amber/gold tones instead of purple; grid showcases cabinet lines |
| **SathiDeals** | Badge element works perfectly for "Now Selling in [Neighbourhood]" callouts |
| **GardenSuites4You** | Feature grid maps to suite types: Garden Suite, Laneway Suite, Coach House |

---

## 2. Stripe.com

### Key Design Patterns
- Animated gradient that slowly shifts hue — always moving but never distracting (3–6s loop)
- Section layouts use generous whitespace with a single strong left-aligned headline + right-side visual
- Trust badges row (logos of known partners) with very low opacity, subtle scale-in on scroll
- Typography sets scale clearly: 64px hero → 40px section → 20px subhead → 16px body
- Background sections use slight tints (`#f6f9fc`) rather than stark white for depth

### Iconic Element: Animated Gradient Hero + Trust Row

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stripe-Style Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Animated gradient hero */
  .stripe-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
    background: #0d1117;
  }

  .stripe-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99,102,241,0.35) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 60%, rgba(6,182,212,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 50% 0%, rgba(139,92,246,0.2) 0%, transparent 60%);
    animation: stripeShift 8s ease-in-out infinite alternate;
    z-index: 0;
  }

  @keyframes stripeShift {
    0%   { opacity: 0.8; transform: scale(1) rotate(0deg); }
    33%  { opacity: 1;   transform: scale(1.05) rotate(1deg); }
    66%  { opacity: 0.9; transform: scale(0.98) rotate(-1deg); }
    100% { opacity: 1;   transform: scale(1.02) rotate(0.5deg); }
  }

  .stripe-hero > * { position: relative; z-index: 1; }

  .stripe-hero h1 {
    font-size: clamp(36px, 5.5vw, 68px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: #fff;
    max-width: 860px;
    margin-bottom: 24px;
  }

  .stripe-hero p {
    font-size: 20px;
    color: rgba(255,255,255,0.65);
    max-width: 560px;
    line-height: 1.6;
    margin-bottom: 44px;
  }

  .stripe-cta-row {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 80px;
  }

  .btn-stripe {
    background: #635bff;
    color: #fff;
    border: none;
    padding: 14px 32px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.15s;
    box-shadow: 0 4px 15px rgba(99,91,255,0.4);
  }
  .btn-stripe:hover {
    box-shadow: 0 6px 25px rgba(99,91,255,0.6);
    transform: translateY(-2px);
  }

  .btn-stripe-outline {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.25);
    padding: 14px 32px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
  }
  .btn-stripe-outline:hover {
    border-color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.05);
    transform: translateY(-2px);
  }

  /* Trust badges */
  .trust-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .trust-label {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    font-weight: 500;
    margin-right: 8px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .trust-badge {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.02em;
    transition: background 0.2s, color 0.2s;
  }
  .trust-badge:hover {
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.8);
  }

  /* Split content section */
  .split-section {
    background: #f6f9fc;
    padding: 100px 24px;
  }

  .split-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  @media (max-width: 768px) {
    .split-inner { grid-template-columns: 1fr; gap: 40px; }
  }

  .split-text h2 {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #1a1a2e;
    margin-bottom: 20px;
  }

  .split-text p {
    font-size: 17px;
    color: #555;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .split-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #635bff;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: gap 0.2s;
  }
  .split-link:hover { gap: 12px; }

  .split-visual {
    background: linear-gradient(135deg, #635bff15 0%, #06b6d415 100%);
    border: 1px solid rgba(99,91,255,0.15);
    border-radius: 16px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
  }
</style>
</head>
<body>

<section class="stripe-hero">
  <h1>Financial infrastructure for the internet</h1>
  <p>Millions of companies use Stripe to accept payments, send payouts, and manage their businesses online.</p>
  <div class="stripe-cta-row">
    <button class="btn-stripe">Start Now</button>
    <button class="btn-stripe-outline">Contact Sales</button>
  </div>
  <div class="trust-row">
    <span class="trust-label">Trusted by</span>
    <div class="trust-badge">Amazon</div>
    <div class="trust-badge">Google</div>
    <div class="trust-badge">Shopify</div>
    <div class="trust-badge">Salesforce</div>
    <div class="trust-badge">Zoom</div>
  </div>
</section>

<section class="split-section">
  <div class="split-inner">
    <div class="split-text">
      <h2>Everything you need to manage payments</h2>
      <p>Accept credit cards, bank transfers, and 135+ currencies. Set up in minutes, scale to billions.</p>
      <a class="split-link" href="#">Learn more →</a>
    </div>
    <div class="split-visual">💳</div>
  </div>
</section>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Trust badge row with logos: WSIB, BBB, HomeStars, TrustedPros — immediate credibility |
| **Motta Kitchen** | Animated gradient in warm gold (`rgba(251,191,36,0.3)`) over dark background |
| **SathiDeals** | Split section perfectly frames property photos with key stats on left |
| **GardenSuites4You** | Trust badges: City of Toronto Approved, CMHC Partner, Licensed Builder |

---

## 3. Vercel.com

### Key Design Patterns
- Pure black (`#000`) background — not dark grey, pure black — with white text for maximum contrast
- Glow effect achieved with a blurred radial gradient div absolutely positioned behind the hero text
- "Deploy card" pattern: a dark bordered card with a terminal/status feel, uses monospace font for code
- Feature tiles use icon + label only — extreme minimalism, hover reveals description
- Grid lines (subtle 1px stripes) as background texture on some sections

### Iconic Element: Dark Hero with Glow Effect + Deploy Card

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vercel-Style Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
  }

  /* Grid line texture */
  .grid-texture {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* Hero */
  .vercel-hero {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 140px 24px 60px;
    overflow: hidden;
  }

  /* Glow behind headline */
  .hero-glow {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%);
    filter: blur(40px);
    pointer-events: none;
    animation: glowPulse 4s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
  }

  .vercel-hero h1 {
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.0;
    max-width: 900px;
    margin-bottom: 24px;
    position: relative;
  }

  .vercel-hero p {
    font-size: 20px;
    color: rgba(255,255,255,0.55);
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: 40px;
    position: relative;
  }

  .vercel-cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 64px;
    position: relative;
  }

  .btn-vercel-primary {
    background: #fff;
    color: #000;
    border: none;
    padding: 13px 28px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, transform 0.15s;
  }
  .btn-vercel-primary:hover { background: #e0e0e0; transform: translateY(-1px); }

  .btn-vercel-secondary {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 13px 28px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, transform 0.15s;
  }
  .btn-vercel-secondary:hover {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
    transform: translateY(-1px);
  }

  /* Deploy card */
  .deploy-card {
    position: relative;
    background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 24px 28px;
    max-width: 420px;
    width: 100%;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 13px;
  }

  .deploy-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%, rgba(255,255,255,0.05));
    z-index: -1;
  }

  .deploy-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .deploy-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0f0;
    box-shadow: 0 0 8px rgba(0,255,0,0.5);
    animation: deployPulse 2s ease-in-out infinite;
  }

  @keyframes deployPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(0,255,0,0.4); }
    50% { box-shadow: 0 0 14px rgba(0,255,0,0.8); }
  }

  .deploy-status {
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .deploy-status strong { color: #0f0; font-weight: 600; }

  .deploy-line {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 5px 0;
    color: rgba(255,255,255,0.45);
    font-size: 12px;
  }
  .deploy-line .timestamp { color: rgba(255,255,255,0.2); min-width: 60px; }
  .deploy-line .msg { color: rgba(255,255,255,0.6); }
  .deploy-line .msg.success { color: #34d399; }
  .deploy-line .msg.info { color: #60a5fa; }

  .deploy-url {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .deploy-url-text {
    color: rgba(255,255,255,0.4);
    font-size: 12px;
  }
  .deploy-url-link {
    color: #fff;
    font-weight: 600;
    font-size: 13px;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    transition: border-color 0.2s;
  }
  .deploy-url-link:hover { border-color: #fff; }

  /* Feature tiles */
  .feature-tiles {
    max-width: 1000px;
    margin: 80px auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .tile {
    background: #000;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: background 0.2s;
    cursor: default;
  }
  .tile:hover { background: #0d0d0d; }

  .tile-icon { font-size: 24px; }
  .tile-label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .tile-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .tile:hover .tile-desc { max-height: 60px; }
</style>
</head>
<body>

<div class="grid-texture"></div>

<section class="vercel-hero">
  <div class="hero-glow"></div>
  <h1>Develop. Preview. Ship.</h1>
  <p>The platform for the best frontend teams. Build faster, ship smarter, sleep better.</p>
  <div class="vercel-cta">
    <button class="btn-vercel-primary">Start Building Free</button>
    <button class="btn-vercel-secondary">Get a Demo</button>
  </div>

  <div class="deploy-card">
    <div class="deploy-header">
      <div class="deploy-dot"></div>
      <div class="deploy-status">Deployment — <strong>Ready</strong></div>
    </div>
    <div class="deploy-line">
      <span class="timestamp">12:04:01</span>
      <span class="msg info">▶ Cloning repository...</span>
    </div>
    <div class="deploy-line">
      <span class="timestamp">12:04:03</span>
      <span class="msg">Installing dependencies</span>
    </div>
    <div class="deploy-line">
      <span class="timestamp">12:04:18</span>
      <span class="msg">Building project</span>
    </div>
    <div class="deploy-line">
      <span class="timestamp">12:04:24</span>
      <span class="msg success">✓ Build completed — 6.2s</span>
    </div>
    <div class="deploy-url">
      <span class="deploy-url-text">Live at</span>
      <a class="deploy-url-link" href="#">your-project.vercel.app</a>
    </div>
  </div>
</section>

<div class="feature-tiles">
  <div class="tile">
    <div class="tile-icon">⚡</div>
    <div class="tile-label">Instant Deploys</div>
    <div class="tile-desc">Push to Git, live in seconds.</div>
  </div>
  <div class="tile">
    <div class="tile-icon">🌍</div>
    <div class="tile-label">Edge Network</div>
    <div class="tile-desc">Served from 100+ regions globally.</div>
  </div>
  <div class="tile">
    <div class="tile-icon">🔒</div>
    <div class="tile-label">SSL Included</div>
    <div class="tile-desc">Automatic HTTPS on every domain.</div>
  </div>
  <div class="tile">
    <div class="tile-icon">📊</div>
    <div class="tile-label">Analytics</div>
    <div class="tile-desc">Real user performance data.</div>
  </div>
</div>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Deploy card → "Project Timeline Card" showing milestones: Demo → Framing → Finishing → Handoff |
| **Motta Kitchen** | Grid texture as subtle background in spec/materials section |
| **SathiDeals** | Feature tiles for: MLS Listed, Pre-Con Access, VIP Pricing, Market Reports |
| **GardenSuites4You** | Deploy card reframed as permit tracker: Application → Review → Approval → Build Start |

---

## 4. Apple.com

### Key Design Patterns
- Scroll-pinned sections: headline stays fixed while background/image transitions beneath it
- Typography as the primary visual — single headline at 80–96px, nothing else competing on screen
- Product images displayed at near full-viewport scale, perfectly centered, no borders
- Sticky nav shrinks and gains frosted glass effect on scroll (backdrop-filter blur)
- Section transitions use opacity + translateY, never slide from sides

### Iconic Element: Scroll-Pinned Text Reveal + Product Showcase

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apple-Style Scroll Reveal</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
  }

  /* Sticky nav */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    transition: background 0.3s, backdrop-filter 0.3s;
  }
  nav.scrolled {
    background: rgba(0,0,0,0.72);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .nav-brand { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
  .nav-links { display: flex; gap: 24px; list-style: none; }
  .nav-links a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 14px; transition: color 0.2s; }
  .nav-links a:hover { color: #fff; }

  /* Full-viewport hero */
  .apple-hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .apple-hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 100% 60% at 50% 80%, #1a1a2e 0%, #000 60%);
  }

  .apple-hero-content { position: relative; z-index: 1; padding: 0 24px; }

  .apple-eyebrow {
    font-size: 20px;
    font-weight: 600;
    color: #0071e3;
    margin-bottom: 12px;
    letter-spacing: 0.01em;
  }

  .apple-hero h1 {
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.0;
    margin-bottom: 16px;
  }

  .apple-hero .tagline {
    font-size: clamp(18px, 2.5vw, 28px);
    font-weight: 300;
    color: rgba(255,255,255,0.7);
    margin-bottom: 36px;
  }

  .apple-hero-links {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .apple-link {
    font-size: 17px;
    color: #0071e3;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s;
  }
  .apple-link:hover { gap: 10px; }

  /* Scroll reveal sections */
  .reveal-section {
    padding: 120px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal-section.visible { opacity: 1; transform: translateY(0); }

  .reveal-section.light-bg { background: #f5f5f7; color: #1d1d1f; }
  .reveal-section.dark-bg { background: #000; color: #fff; }
  .reveal-section.gray-bg { background: #fbfbfd; color: #1d1d1f; }

  .section-label {
    font-size: 17px;
    font-weight: 600;
    color: #0071e3;
    margin-bottom: 12px;
  }
  .section-label.orange { color: #f56300; }
  .section-label.green { color: #1d7a3e; }

  .reveal-section h2 {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    max-width: 780px;
    margin-bottom: 20px;
  }

  .reveal-section p {
    font-size: 19px;
    font-weight: 300;
    line-height: 1.6;
    max-width: 600px;
    opacity: 0.7;
    margin-bottom: 36px;
  }

  /* Product showcase grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    max-width: 1100px;
    margin: 80px auto;
    padding: 0 24px;
  }

  .product-tile {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .product-tile:hover { transform: scale(1.02); }

  .product-tile.dark { background: #1d1d1f; color: #fff; }
  .product-tile.blue { background: linear-gradient(160deg, #003d82 0%, #0071e3 100%); color: #fff; }
  .product-tile.warm { background: linear-gradient(160deg, #2d1b00 0%, #7c3a0a 100%); color: #fff; }
  .product-tile.light { background: #f5f5f7; color: #1d1d1f; }

  .product-tile-emoji {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
  }

  .product-tile-eyebrow {
    font-size: 14px;
    font-weight: 600;
    opacity: 0.6;
    margin-bottom: 6px;
  }

  .product-tile h3 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .product-tile p {
    font-size: 14px;
    opacity: 0.6;
    line-height: 1.4;
  }
</style>
</head>
<body>

<nav id="mainNav">
  <div class="nav-brand">Brand</div>
  <ul class="nav-links">
    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<section class="apple-hero">
  <div class="apple-hero-bg"></div>
  <div class="apple-hero-content">
    <div class="apple-eyebrow">New Collection</div>
    <h1>Crafted to Perfection.</h1>
    <p class="tagline">Every detail considered. Every material chosen.</p>
    <div class="apple-hero-links">
      <a class="apple-link" href="#">Learn more →</a>
      <a class="apple-link" href="#">Shop now →</a>
    </div>
  </div>
</section>

<section class="reveal-section light-bg" data-reveal>
  <div class="section-label">Introducing</div>
  <h2>The kitchen you've always imagined.</h2>
  <p>Precision-crafted cabinetry, premium stone surfaces, and seamless integrated appliances — all in one cohesive design.</p>
  <a class="apple-link" href="#">See the collection →</a>
</section>

<section class="reveal-section dark-bg" data-reveal>
  <div class="section-label orange">Design Studio</div>
  <h2>Your vision. Brought to life.</h2>
  <p>Work with our designers to create a space that's uniquely yours. From concept renders to final installation.</p>
</section>

<div class="product-grid">
  <div class="product-tile dark" data-reveal style="opacity:0; transform:translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease;">
    <div class="product-tile-emoji">🍳</div>
    <div class="product-tile-eyebrow">Signature Series</div>
    <h3>Chef's Kitchen</h3>
    <p>Professional-grade at home pricing.</p>
  </div>
  <div class="product-tile blue" data-reveal style="opacity:0; transform:translateY(40px); transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;">
    <div class="product-tile-emoji">🪟</div>
    <div class="product-tile-eyebrow">Minimalist</div>
    <h3>Open Concept</h3>
    <p>Seamless flow between living spaces.</p>
  </div>
  <div class="product-tile warm" data-reveal style="opacity:0; transform:translateY(40px); transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;">
    <div class="product-tile-emoji">🏡</div>
    <div class="product-tile-eyebrow">Premium</div>
    <h3>Full Renovation</h3>
    <p>Complete home transformation packages.</p>
  </div>
</div>

<script>
  // Sticky nav
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
</script>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Product grid tiles: Basement Reno, Kitchen Reno, Bathroom Reno, Full Home — each with project photo |
| **Motta Kitchen** | Exact pattern — eyebrow label "Signature Series", full-bleed kitchen photography |
| **SathiDeals** | Tiles become listing type cards: Detached, Semi, Condo, Pre-Con |
| **GardenSuites4You** | Scroll-pinned headline "Your backyard. Reimagined." while suite render transitions in |

---

## 5. Framer.com

### Key Design Patterns
- Noise texture overlay on hero adds tactile depth (SVG filter or repeating PNG at 2–4% opacity)
- Hero uses extra-bold condensed headline with a subtle scale animation on page load
- Gradient orbs (blurred circles) positioned behind content — colors change on scroll via JS
- CTA section at page bottom uses a large, centered "magazine-style" layout with oversized text
- Micro-interactions: button backgrounds use `background-size` animation to reveal fill on hover

### Iconic Element: Noise Texture Hero + Animated CTA Section

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Framer-Style Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #0c0c0c;
    color: #fff;
    overflow-x: hidden;
  }

  /* SVG noise filter */
  .noise-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }

  /* Gradient orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%);
    top: -100px; left: -100px;
    animation: orbFloat1 10s ease-in-out infinite;
  }
  .orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%);
    bottom: 100px; right: -80px;
    animation: orbFloat2 13s ease-in-out infinite;
  }

  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(60px, 40px); }
  }
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-40px, -60px); }
  }

  /* Hero */
  .framer-hero {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 140px 24px 100px;
    min-height: 100vh;
    justify-content: center;
  }

  .framer-hero h1 {
    font-size: clamp(56px, 9vw, 108px);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.95;
    max-width: 900px;
    margin-bottom: 28px;
    animation: heroScaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes heroScaleIn {
    from { opacity: 0; transform: scale(0.94) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .framer-hero p {
    font-size: 18px;
    color: rgba(255,255,255,0.5);
    max-width: 480px;
    line-height: 1.65;
    margin-bottom: 44px;
    animation: heroScaleIn 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* Fill-reveal button */
  .btn-framer {
    position: relative;
    display: inline-block;
    padding: 14px 32px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;
    background: transparent;
    transition: border-color 0.3s, color 0.3s;
    animation: heroScaleIn 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .btn-framer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #a855f7, #3b82f6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }

  .btn-framer:hover::before { transform: scaleX(1); }
  .btn-framer:hover { border-color: transparent; }

  /* Marquee strip */
  .marquee-wrap {
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
    background: rgba(255,255,255,0.03);
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin: 40px 0 0;
    position: relative;
    z-index: 1;
  }

  .marquee-track {
    display: flex;
    gap: 48px;
    width: max-content;
    animation: marqueeScroll 20s linear infinite;
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .marquee-item {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .marquee-item::before {
    content: '✦';
    color: rgba(168,85,247,0.5);
    font-size: 10px;
  }

  /* CTA section — magazine style */
  .cta-section {
    position: relative;
    z-index: 1;
    padding: 140px 24px;
    text-align: center;
    background: linear-gradient(to bottom, transparent, rgba(168,85,247,0.05) 50%, transparent);
  }

  .cta-section h2 {
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
    max-width: 800px;
    margin: 0 auto 40px;
  }

  .cta-section h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cta-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
</head>
<body>

<div class="noise-overlay"></div>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>

<section class="framer-hero">
  <h1>Design that moves.</h1>
  <p>Build stunning websites with fluid animations, clean interactions, and production-ready code — no compromises.</p>
  <button class="btn-framer">Start for Free</button>
</section>

<div class="marquee-wrap">
  <div class="marquee-track">
    <div class="marquee-item">Animation</div>
    <div class="marquee-item">Components</div>
    <div class="marquee-item">Responsive</div>
    <div class="marquee-item">CMS</div>
    <div class="marquee-item">SEO Ready</div>
    <div class="marquee-item">Custom Code</div>
    <div class="marquee-item">Fast Deploy</div>
    <div class="marquee-item">Design Tokens</div>
    <!-- Duplicate for seamless loop -->
    <div class="marquee-item">Animation</div>
    <div class="marquee-item">Components</div>
    <div class="marquee-item">Responsive</div>
    <div class="marquee-item">CMS</div>
    <div class="marquee-item">SEO Ready</div>
    <div class="marquee-item">Custom Code</div>
    <div class="marquee-item">Fast Deploy</div>
    <div class="marquee-item">Design Tokens</div>
  </div>
</div>

<section class="cta-section">
  <h2>Ready to build something <em>remarkable?</em></h2>
  <div class="cta-row">
    <button class="btn-framer">Get Started Free</button>
  </div>
</section>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Marquee strip: "Licensed & Insured · WSIB Certified · HomeStars Verified · 200+ Projects · Toronto-Based" |
| **Motta Kitchen** | Noise texture over warm beige/cream background for tactile luxury feel |
| **SathiDeals** | CTA section: "Ready to find your <em>perfect home?</em>" with fill-reveal button |
| **GardenSuites4You** | Marquee: "Permit Ready · 6-Month Build · Turnkey · CMHC Insured · City Approved" |

---

## 6. Loom.com

### Key Design Patterns
- Full-viewport video hero with a dark overlay gradient (bottom 40% fades to page background)
- Play button centered over video uses a frosted glass circle — not a traditional button
- Feature copy appears overlaid on the video itself, not in a separate section below
- Color palette is warm: off-whites, coral/salmon accents against dark backgrounds
- Testimonial quote cards use large opening quotation marks as decorative elements

### Iconic Element: Video Hero with Overlay CTA

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Loom-Style Video Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #0f0f0f;
    color: #fff;
    overflow-x: hidden;
  }

  /* Video hero */
  .video-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Video placeholder (replace with actual <video> tag) */
  .video-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 40%, #1a2a1a 100%);
    /* In production: replace with <video autoplay muted loop playsinline> */
  }

  /* Simulated video content */
  .video-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 30% 50%, rgba(255,100,80,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 70% 40%, rgba(80,120,255,0.1) 0%, transparent 60%);
    animation: videoBgShift 8s ease-in-out infinite alternate;
  }

  @keyframes videoBgShift {
    from { opacity: 0.7; }
    to { opacity: 1; }
  }

  /* Gradient overlay */
  .video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.3) 0%,
      rgba(0,0,0,0.1) 40%,
      rgba(0,0,0,0.5) 70%,
      rgba(15,15,15,1) 100%
    );
    z-index: 1;
  }

  /* Hero content */
  .video-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 24px;
    max-width: 820px;
  }

  .video-content h1 {
    font-size: clamp(36px, 5.5vw, 66px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 20px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }

  .video-content p {
    font-size: 18px;
    color: rgba(255,255,255,0.7);
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: 36px;
    text-shadow: 0 1px 10px rgba(0,0,0,0.5);
  }

  /* Play button — frosted glass */
  .play-btn-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
    cursor: pointer;
  }

  .play-btn {
    width: 64px;
    height: 64px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .play-btn-wrap:hover .play-btn {
    background: rgba(255,255,255,0.25);
    transform: scale(1.08);
  }

  .play-btn::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 9px 0 9px 18px;
    border-color: transparent transparent transparent #fff;
    margin-left: 4px;
  }

  .play-label {
    font-size: 15px;
    font-weight: 500;
    color: rgba(255,255,255,0.8);
  }

  /* CTA buttons */
  .video-cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-loom-primary {
    background: #ff4f2b;
    color: #fff;
    border: none;
    padding: 13px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(255,79,43,0.4);
  }
  .btn-loom-primary:hover { background: #e8421f; transform: translateY(-1px); }

  .btn-loom-ghost {
    background: rgba(255,255,255,0.1);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 13px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    backdrop-filter: blur(8px);
  }
  .btn-loom-ghost:hover { background: rgba(255,255,255,0.18); transform: translateY(-1px); }

  /* Testimonials */
  .testimonials {
    padding: 80px 24px;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .testimonial-card {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 32px;
    position: relative;
  }

  .testimonial-card::before {
    content: '\201C';
    position: absolute;
    top: 16px;
    left: 24px;
    font-size: 72px;
    line-height: 1;
    color: rgba(255,79,43,0.3);
    font-family: Georgia, serif;
  }

  .testimonial-text {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(255,255,255,0.75);
    margin-bottom: 24px;
    margin-top: 24px;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4f2b, #a855f7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .author-info .name { font-size: 14px; font-weight: 600; }
  .author-info .role { font-size: 13px; color: rgba(255,255,255,0.45); }
</style>
</head>
<body>

<section class="video-hero">
  <div class="video-bg"></div>
  <div class="video-overlay"></div>
  <div class="video-content">
    <h1>See the finished kitchen before we break ground.</h1>
    <p>We create photorealistic 3D renders so you can approve every detail before a single cabinet is ordered.</p>
    <div class="play-btn-wrap">
      <div class="play-btn"></div>
      <span class="play-label">Watch our process (2 min)</span>
    </div>
    <div class="video-cta">
      <button class="btn-loom-primary">Book a Free Design Call</button>
      <button class="btn-loom-ghost">View Completed Projects</button>
    </div>
  </div>
</section>

<div class="testimonials">
  <div class="testimonial-card">
    <p class="testimonial-text">We saw the render and said "yes" immediately. The actual kitchen looked even better. DJ Custom Reno delivered exactly what they showed us.</p>
    <div class="testimonial-author">
      <div class="author-avatar">SR</div>
      <div class="author-info">
        <div class="name">Sarah R.</div>
        <div class="role">Homeowner, North York</div>
      </div>
    </div>
  </div>
  <div class="testimonial-card">
    <p class="testimonial-text">Three quotes, one clear winner. The transparency was unmatched — we knew exactly what we were getting and when.</p>
    <div class="testimonial-author">
      <div class="author-avatar">MK</div>
      <div class="author-info">
        <div class="name">Michael K.</div>
        <div class="role">Property Owner, Scarborough</div>
      </div>
    </div>
  </div>
  <div class="testimonial-card">
    <p class="testimonial-text">From permit to finished suite in under 5 months. The garden suite already has a tenant. Best investment we've made.</p>
    <div class="testimonial-author">
      <div class="author-avatar">PL</div>
      <div class="author-info">
        <div class="name">Priya L.</div>
        <div class="role">Investor, East York</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Video of before/after renovation with play button — immediate social proof |
| **Motta Kitchen** | Video of kitchen reveal moment; frosted play button over countertop close-up |
| **SathiDeals** | Property walkthrough video hero; overlay CTA "Book a Showing" |
| **GardenSuites4You** | Time-lapse build video hero from empty backyard to finished suite |

---

## 7. Notion.so

### Key Design Patterns
- Clean white/off-white backgrounds (`#fff`, `#f7f6f3`) — maximum content legibility
- Feature sections alternate: text-left/visual-right then text-right/visual-left for rhythm
- Icons use a consistent rounded square container with emoji or SVG — no custom icon sets needed
- Testimonial grid is dense: 3 columns, 6–9 cards, each short (2–3 sentences max)
- Typography uses high contrast: black headline, medium-grey body, light-grey labels

### Iconic Element: Clean Feature Sections + Dense Testimonial Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notion-Style Layout</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #fff;
    color: #1a1a1a;
  }

  /* Section header */
  .section-header {
    text-align: center;
    padding: 80px 24px 60px;
    max-width: 640px;
    margin: 0 auto;
  }

  .section-eyebrow {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    color: #828282;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .section-header h2 {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .section-header p {
    font-size: 17px;
    color: #6b7280;
    line-height: 1.65;
  }

  /* Alternating feature sections */
  .feature-alt {
    padding: 60px 24px;
    border-top: 1px solid #f0f0f0;
  }

  .feature-alt-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .feature-alt-inner.reverse { direction: rtl; }
  .feature-alt-inner.reverse > * { direction: ltr; }

  @media (max-width: 768px) {
    .feature-alt-inner, .feature-alt-inner.reverse {
      grid-template-columns: 1fr;
      direction: ltr;
      gap: 36px;
    }
  }

  .feat-icon-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #f7f6f3;
    border-radius: 10px;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .feat-text h3 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .feat-text p {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .feat-checklist {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .feat-checklist li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #374151;
  }

  .feat-checklist li::before {
    content: '✓';
    color: #16a34a;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .feat-visual {
    background: #f7f6f3;
    border-radius: 16px;
    height: 340px;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    position: relative;
    overflow: hidden;
  }

  .feat-visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%);
  }

  /* Stats bar */
  .stats-bar {
    background: #1a1a1a;
    padding: 48px 24px;
    display: flex;
    justify-content: center;
    gap: 80px;
    flex-wrap: wrap;
  }

  .stat-item { text-align: center; }

  .stat-number {
    font-size: 44px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
  }

  /* Testimonial grid */
  .testimonial-section {
    background: #f7f6f3;
    padding: 80px 24px;
  }

  .testimonial-grid {
    max-width: 1100px;
    margin: 40px auto 0;
    columns: 3;
    column-gap: 16px;
  }

  @media (max-width: 900px) { .testimonial-grid { columns: 2; } }
  @media (max-width: 580px) { .testimonial-grid { columns: 1; } }

  .notion-testimonial {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    break-inside: avoid;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .notion-testimonial:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .notion-testimonial p {
    font-size: 14px;
    line-height: 1.65;
    color: #374151;
    margin-bottom: 16px;
  }

  .notion-author {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notion-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #6b7280;
    flex-shrink: 0;
  }

  .notion-author-name { font-size: 13px; font-weight: 600; color: #1a1a1a; }
  .notion-author-role { font-size: 12px; color: #9ca3af; }

  .stars {
    color: #f59e0b;
    font-size: 12px;
    margin-bottom: 10px;
  }
</style>
</head>
<body>

<div class="section-header">
  <span class="section-eyebrow">Why choose us</span>
  <h2>Renovation done right, the first time.</h2>
  <p>From initial quote to final walkthrough, we handle every detail so you don't have to.</p>
</div>

<section class="feature-alt">
  <div class="feature-alt-inner">
    <div class="feat-text">
      <div class="feat-icon-box">📐</div>
      <h3>Design-first approach</h3>
      <p>We build a complete visual plan before any work begins, so there are no surprises mid-project.</p>
      <ul class="feat-checklist">
        <li>3D renders before demo day</li>
        <li>Material samples approved by you</li>
        <li>Detailed scope document included</li>
        <li>Change order protection built-in</li>
      </ul>
    </div>
    <div class="feat-visual">📐</div>
  </div>
</section>

<section class="feature-alt">
  <div class="feature-alt-inner reverse">
    <div class="feat-text">
      <div class="feat-icon-box">🛡</div>
      <h3>Licensed, insured, accountable</h3>
      <p>Every project carries full liability coverage and WSIB clearance. You're protected at every stage.</p>
      <ul class="feat-checklist">
        <li>WSIB Certificate of Clearance</li>
        <li>$5M liability insurance</li>
        <li>City of Toronto licensed</li>
        <li>2-year workmanship warranty</li>
      </ul>
    </div>
    <div class="feat-visual">🛡</div>
  </div>
</section>

<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-number">200+</div>
    <div class="stat-label">Projects Completed</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">98%</div>
    <div class="stat-label">On-Time Completion</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">4.9★</div>
    <div class="stat-label">HomeStars Rating</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">12yr</div>
    <div class="stat-label">In Business</div>
  </div>
</div>

<section class="testimonial-section">
  <div class="section-header" style="background: #f7f6f3;">
    <h2>Trusted by Toronto homeowners.</h2>
  </div>
  <div class="testimonial-grid">
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>Completely transformed our basement. On budget, on time, no drama. We've already referred three neighbours.</p>
      <div class="notion-author">
        <div class="notion-avatar">JT</div>
        <div><div class="notion-author-name">James T.</div><div class="notion-author-role">Etobicoke</div></div>
      </div>
    </div>
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>The kitchen design process was incredible. They showed us exactly what it would look like before touching a thing.</p>
      <div class="notion-author">
        <div class="notion-avatar">AL</div>
        <div><div class="notion-author-name">Amanda L.</div><div class="notion-author-role">Forest Hill</div></div>
      </div>
    </div>
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>Our garden suite was done in 4.5 months. The tenant moved in the next week. Already cash-flow positive.</p>
      <div class="notion-author">
        <div class="notion-avatar">RB</div>
        <div><div class="notion-author-name">Ravi B.</div><div class="notion-author-role">Leslieville</div></div>
      </div>
    </div>
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>Best renovation company in Toronto. The team is professional, clean, and communicates daily. 10/10.</p>
      <div class="notion-author">
        <div class="notion-avatar">MP</div>
        <div><div class="notion-author-name">Michelle P.</div><div class="notion-author-role">Midtown</div></div>
      </div>
    </div>
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>Got quotes from 4 contractors. DJ Custom Reno was the only one who gave us a detailed line-item breakdown. Hired them immediately.</p>
      <div class="notion-author">
        <div class="notion-avatar">DK</div>
        <div><div class="notion-author-name">David K.</div><div class="notion-author-role">North York</div></div>
      </div>
    </div>
    <div class="notion-testimonial">
      <div class="stars">★★★★★</div>
      <p>The Motta kitchen we got is genuinely the best part of our home now. Guests comment on it every time.</p>
      <div class="notion-author">
        <div class="notion-avatar">SC</div>
        <div><div class="notion-author-name">Sophie C.</div><div class="notion-author-role">Rosedale</div></div>
      </div>
    </div>
  </div>
</section>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Full layout fit — feature sections for services, stats bar, testimonial masonry grid |
| **Motta Kitchen** | Alternate features: "Italian Craftsmanship", "Bespoke Dimensions", "10-Year Warranty" |
| **SathiDeals** | Stats bar: Homes Sold, Avg Days on Market, Avg Sale-to-List Ratio, Client Reviews |
| **GardenSuites4You** | Checklist items in features: "City permit included", "Turnkey furnished option" |

---

## 8. Arc Browser

### Key Design Patterns
- Oversized, confident typography — headlines at 80–100px with unconventional line breaks for personality
- Gradient blobs use pastel/candy colors (pinks, purples, teals) against a very dark or very light bg
- Navigation is minimal — wordmark only + 1-2 links + single CTA button, no mega-menus
- Sections have personality through copy voice, not through visual complexity
- Color blocks used as section dividers — each section has its own background tint

### Iconic Element: Bold Typography Hero with Gradient Blobs

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Arc-Style Bold Hero</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  body {
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Minimal nav */
  .arc-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arc-wordmark {
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
  }

  .arc-nav-right { display: flex; align-items: center; gap: 24px; }

  .arc-nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color 0.2s;
  }
  .arc-nav-link:hover { color: #fff; }

  .btn-arc {
    background: #fff;
    color: #000;
    border: none;
    padding: 10px 22px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-arc:hover { background: #e8e8e8; transform: scale(1.03); }

  /* Hero */
  .arc-hero {
    min-height: 100vh;
    background: #0a0010;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    overflow: hidden;
  }

  /* Gradient blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    opacity: 0.6;
  }

  .blob-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, #ff6eb4 0%, #cc4fcf 50%, transparent 70%);
    top: -10%; left: -10%;
    animation: blobDrift1 15s ease-in-out infinite;
  }
  .blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #48dbfb 0%, #0abde3 50%, transparent 70%);
    bottom: 0%; right: -5%;
    animation: blobDrift2 18s ease-in-out infinite;
  }
  .blob-3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #f9ca24 0%, #f0932b 50%, transparent 70%);
    bottom: 20%; left: 30%;
    animation: blobDrift3 12s ease-in-out infinite;
    opacity: 0.25;
  }

  @keyframes blobDrift1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(80px, 40px) scale(1.08); }
    66% { transform: translate(-30px, 60px) scale(0.95); }
  }
  @keyframes blobDrift2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-60px, -50px) scale(1.1); }
  }
  @keyframes blobDrift3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(30px, -40px) rotate(20deg) scale(1.15); }
  }

  /* Hero text */
  .arc-hero-content { position: relative; z-index: 1; max-width: 900px; }

  .arc-hero h1 {
    font-size: clamp(60px, 10vw, 112px);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.92;
    color: #fff;
    margin-bottom: 32px;
  }

  .arc-hero h1 .accent-word {
    display: inline-block;
    background: linear-gradient(135deg, #ff6eb4 0%, #48dbfb 60%, #f9ca24 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: gradientShift 4s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .arc-hero p {
    font-size: 20px;
    color: rgba(255,255,255,0.55);
    max-width: 500px;
    margin: 0 auto 44px;
    line-height: 1.6;
  }

  .arc-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  .btn-arc-large {
    background: linear-gradient(135deg, #ff6eb4, #48dbfb);
    color: #fff;
    border: none;
    padding: 15px 36px;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 30px rgba(255,110,180,0.4);
    letter-spacing: -0.01em;
  }
  .btn-arc-large:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 40px rgba(255,110,180,0.6);
  }

  /* Color block sections */
  .arc-section {
    padding: 100px 24px;
    text-align: center;
  }
  .arc-section.pink-block { background: #fff0f6; }
  .arc-section.blue-block { background: #f0f9ff; }
  .arc-section.dark-block { background: #0a0010; color: #fff; }

  .arc-section h2 {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1.0;
    max-width: 700px;
    margin: 0 auto 20px;
  }

  .arc-section.pink-block h2 { color: #7c2d5e; }
  .arc-section.blue-block h2 { color: #0c4a6e; }

  .arc-section p {
    font-size: 18px;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
    opacity: 0.65;
  }
</style>
</head>
<body>

<nav class="arc-nav">
  <div class="arc-wordmark">Studio</div>
  <div class="arc-nav-right">
    <a class="arc-nav-link" href="#">Work</a>
    <a class="arc-nav-link" href="#">About</a>
    <button class="btn-arc">Contact</button>
  </div>
</nav>

<section class="arc-hero">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>

  <div class="arc-hero-content">
    <h1>Your home,<br><span class="accent-word">reimagined.</span></h1>
    <p>We design and build spaces that feel exactly right — from first render to final walkthrough.</p>
    <div class="arc-cta">
      <button class="btn-arc-large">Start Your Project</button>
    </div>
  </div>
</section>

<section class="arc-section pink-block">
  <h2>Beautiful isn't expensive. It's intentional.</h2>
  <p>Premium results come from planning, not just budget. We design every project with the same obsessive care.</p>
</section>

<section class="arc-section blue-block">
  <h2>Built in Toronto. Trusted across the GTA.</h2>
  <p>From Etobicoke to Scarborough, we've transformed hundreds of homes. Yours is next.</p>
</section>

<section class="arc-section dark-block">
  <h2>Ready to start?<br><span style="background: linear-gradient(135deg, #ff6eb4, #48dbfb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Let's talk.</span></h2>
  <p style="color: rgba(255,255,255,0.5);">Free consultation. No pressure. Just possibilities.</p>
  <br><br>
  <button class="btn-arc-large">Book a Free Call</button>
</section>

</body>
</html>
```

### Brand Application
| Brand | Usage |
|---|---|
| **DJ Custom Reno** | Bold "Your home, reimagined." exactly fits brand voice; color blocks for each service area |
| **Motta Kitchen** | Replace candy colors with warm terracotta + deep forest green blob palette |
| **SathiDeals** | "Your neighbourhood, your future." with gradient on "future" — strong emotional hook |
| **GardenSuites4You** | "More space. More income. More home." — three-line hero with blob background |

---

## Quick Reference: Pattern-to-Brand Matrix

| Pattern | DJ Custom Reno | Motta Kitchen | SathiDeals | GardenSuites4You |
|---|---|---|---|---|
| Linear gradient mesh | Dark hero, service grid | Warm amber mesh | Dark stats section | Dark overview section |
| Stripe trust badges | WSIB, BBB, HomeStars | Award logos | MLS, TRREB logos | City permit badges |
| Vercel glow + grid | Timeline card | — | Market data card | Permit tracker card |
| Apple scroll reveal | Before/after sections | Product showcase | Listing showcase | Build process steps |
| Framer marquee | Certifications strip | Materials strip | Neighbourhoods | Features strip |
| Loom video hero | Reno reveal video | Kitchen reveal | Property walkthroughs | Build time-lapse |
| Notion testimonials | Client reviews | Homeowner quotes | Buyer/seller reviews | Investor reviews |
| Arc bold typography | Brand hero | Luxury positioning | Neighbourhood hero | ROI-focused hero |

---

## Shared Utility CSS

Paste this into any project stylesheet for instant access to the most reused primitives across all patterns above.

```css
/* Shared Utility — Design Knowledge Base */

/* Gradient text */
.gradient-text-purple {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-warm {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-candy {
  background: linear-gradient(135deg, #ff6eb4, #48dbfb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Frosted glass */
.glass {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
}
.glass-dark {
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Reveal on scroll (JS adds .visible) */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal.delay-1 { transition-delay: 0.1s; }
.reveal.delay-2 { transition-delay: 0.2s; }
.reveal.delay-3 { transition-delay: 0.3s; }

/* Glow button */
.btn-glow {
  position: relative;
  overflow: hidden;
  transition: transform 0.15s;
}
.btn-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.15);
  transform: translateX(-100%) skewX(-15deg);
  transition: transform 0.4s ease;
}
.btn-glow:hover { transform: translateY(-2px); }
.btn-glow:hover::after { transform: translateX(150%) skewX(-15deg); }

/* Scrolling marquee */
.marquee-container { overflow: hidden; }
.marquee-content {
  display: flex;
  width: max-content;
  animation: marquee 20s linear infinite;
}
.marquee-content:hover { animation-play-state: paused; }
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Scroll reveal JS snippet */
/*
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
*/
```

---

*Last updated: 2026-05-27 | Design Knowledge Base — Web Agency Internal Reference*
