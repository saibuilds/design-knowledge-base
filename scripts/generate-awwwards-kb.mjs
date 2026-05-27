#!/usr/bin/env node
/**
 * generate-awwwards-kb.mjs
 * Generates Awwwards pattern breakdown files for the design knowledge base.
 * Uses the automation-assistant model via Ollama MCP to produce detailed MD content.
 *
 * Stack context: Next.js 14, React, TypeScript, Tailwind v3,
 *                Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber
 * Target domain: high-end renovation / real estate / mortgage / garden suite sites
 */

import { Ollama } from "ollama";
import fs from "fs";
import path from "path";

const ollama = new Ollama({ host: "http://127.0.0.1:11434" });
const MODEL = "automation-assistant";

const TARGET_DIR =
  "C:/Users/Admin/Downloads/design-knowledge-base/md/reference-sites/awwwards";

// ─── helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generate(prompt) {
  const res = await ollama.chat({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    options: { num_predict: 8192, temperature: 0.3 },
  });
  return res.message.content.trim();
}

// ─── prompts ─────────────────────────────────────────────────────────────────

const STACK = `
Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS v3,
Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis (smooth scroll), React Three Fiber + Drei.
Target projects: high-end renovation, real estate, mortgage, garden suite / ADU websites.
`;

const CODE_RULES = `
Rules for code snippets:
- All TSX/JS must be complete, importable, and use real library APIs only.
- No hallucinated component names or fake props.
- Framer Motion: use motion.div, useScroll, useTransform, useSpring, AnimatePresence.
- GSAP: gsap.to/from/timeline, ScrollTrigger.create, scrub, pin.
- Lenis: new Lenis(), raf loop with lenis.raf(time).
- R3F: <Canvas>, useFrame, useThree, from @react-three/fiber and @react-three/drei.
- Tailwind: utility classes only, no custom CSS unless necessary.
`;

// ── File 1: SOTD winners ─────────────────────────────────────────────────────
const SOTD_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a Markdown file titled "# Awwwards SOTD Winners — Technique Breakdowns".

Cover these 22 well-known Awwwards Site of the Day / Site of the Month winners
(use your training knowledge of these actual sites):

1. Locomotive (locomotive.ca) — agency portfolio
2. Resn (resn.co.nz) — interactive agency
3. Active Theory (activetheory.net) — WebGL studio
4. Aristide Benoist (aristidebenoist.com) — portfolio
5. Roboto Studio (robotostudio.com) — product studio
6. Monopo (monopo.london) — agency portfolio
7. Superlist (superlist.com) — product
8. Linear (linear.app) — SaaS product
9. Stripe Press (press.stripe.com) — editorial
10. Lusion (lusion.co) — WebGL portfolio
11. Bruno Simon (bruno-simon.com) — 3D portfolio
12. Cédric Pereira (cedricpereira.com) — portfolio
13. Basement Studio (basement.studio) — agency
14. Obys Agency (obys.agency) — agency
15. Clément Ruchon (clementruchon.com) — portfolio
16. Quentin Doiry (quentindoiry.fr) — portfolio
17. YOD Design (yoddesign.ua) — interior design (highly relevant to reno/real estate)
18. Blooming (blooming.digital) — agency
19. Gucci Beauty (beauty.gucci.com) — ecommerce/brand
20. Nextiva (nextiva.com) — SaaS
21. Refokus (refokus.com) — agency portfolio
22. Floor796 (floor796.com) — creative/editorial

For EACH site include these sections:
### [Number]. [Site Name] ([URL])
**Category:** [portfolio | agency | product | ecommerce | immersive 3D | editorial]
**Studio/Agency:** ...
**Tech Stack:** (if known from public sources or inferred)

#### What Makes It Award-Winning
- Bullet list of 4–6 specific techniques (e.g., "Horizontal scroll with GSAP pin", "Noise-based WebGL distortion on hover")

#### Key Animation Patterns
- Describe timing, easing, and choreography specifics

#### Code Pattern (Replicable)
Provide a working TSX/JS snippet implementing the most distinctive technique from this site.
The snippet must be self-contained and use the stack above.

#### Relevance to Renovation/Real Estate
One sentence on how to adapt this pattern to high-end property sites.

End with a ## Summary Table with columns: Site | Category | Primary Technique | Difficulty (1–5).
`;

// ── File 2: Immersive 3D sites ───────────────────────────────────────────────
const THREE_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a Markdown file titled "# Immersive 3D & WebGL Sites — Patterns & Code".

Sections:

## 1. Overview — Why WebGL Wins Awards
Short paragraph on what judges look for.

## 2. Site Profiles
Cover these 10 sites in depth:
- Bruno Simon (bruno-simon.com) — Three.js driving portfolio
- Lusion (lusion.co) — particle WebGL
- Active Theory (activetheory.net) — R3F + post-processing
- Resn projects — WebGL games
- Aristide Benoist — GLSL shader distortion
- Ilithya (ilithya.rocks) — generative art
- Clément Ruchon — fluid sim
- Vite (vitejs.dev) — subtle 3D hero
- Nobel Prize (nobelprize.org) — data 3D
- Awwwards Conference sites — particle tunnels

For each:
### [Site Name]
**Core 3D Technique:** ...
**Performance Budget:** (estimated FPS target, draw calls strategy)
**Code Pattern:**
\`\`\`tsx
// Full working R3F component
\`\`\`

## 3. R3F Patterns Library

### 3.1 Floating Particles Background
Complete TSX component using @react-three/fiber Points + useFrame.

### 3.2 Scroll-Linked Camera Dolly
R3F + GSAP ScrollTrigger camera animation.

### 3.3 GLSL Noise Displacement Shader
Full ShaderMaterial with vertex + fragment GLSL.

### 3.4 Post-Processing Bloom + Chromatic Aberration
Using @react-three/postprocessing EffectComposer.

### 3.5 Mouse-Tracked Refraction Sphere
useRef + useFrame + Sphere + MeshTransmissionMaterial from Drei.

## 4. Performance Checklist
Checklist for keeping WebGL performant in Next.js 14 (SSR safe, dynamic import, etc.)

## 5. Applying 3D to Real Estate / Renovation Sites
Concrete examples: property model viewers, material selector, neighbourhood flythrough.
`;

// ── File 3: Agency portfolios ─────────────────────────────────────────────────
const AGENCY_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a Markdown file titled "# Agency Portfolio Patterns — Awwwards Leaders".

## 1. What Separates Award-Winning Agency Sites
(layout philosophy, motion hierarchy, cursor design, case study structure)

## 2. Agency Profiles

Cover these 12 agencies in depth:
1. Locomotive (locomotive.ca) — Lenis inventors, smooth scroll mastery
2. Resn (resn.co.nz) — narrative web experiences
3. Obys Agency (obys.agency) — editorial grid + kinetic type
4. Basement Studio (basement.studio) — dark mode, grain, glow
5. Refokus (refokus.com) — minimal + bold transitions
6. Monopo (monopo.london) — Japanese-influenced whitespace
7. Active Theory (activetheory.net) — full-WebGL portfolio
8. Hi-ReS! (hi-res.co.uk) — long-standing creative studio
9. HAUS (haus.io) — brand + motion
10. ustwo (ustwo.com) — product-focused
11. Fantasy (fantasy.co) — product design studio
12. Huge (hugeinc.com) — large agency

For each:
### [Agency Name]
**Signature Technique:** ...
**Color System:** (palette description)
**Typography Stack:** (font names + usage)
**Navigation Pattern:** (description)
**Case Study Structure:** (how work is presented)
**Code Pattern:**
\`\`\`tsx
// Replicable TSX snippet for the most distinctive UI pattern
\`\`\`

## 3. Reusable Agency Portfolio Patterns

### 3.1 Magnetic Cursor Component
Full TSX with Framer Motion + mouse tracking.

### 3.2 Work Grid with Hover Video Preview
TSX component: grid of project cards, video plays on hover.

### 3.3 Page Transition with Curtain Wipe
Framer Motion AnimatePresence + layout transition.

### 3.4 Kinetic Typography Hero
GSAP SplitText-style character animation (using vanilla JS split, no plugin needed).

### 3.5 Horizontal Scroll Case Study
GSAP pin + scrub horizontal scroll section in Next.js.

## 4. Applying Agency Patterns to Real Estate / Renovation
How to adapt portfolio-style case study layouts for project showcases, material lookbooks, before/after reveals.
`;

// ── File 4: Scroll experiences ────────────────────────────────────────────────
const SCROLL_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a Markdown file titled "# Scroll Storytelling — Exceptional Scroll Experiences".

## 1. Scroll Design Principles
(parallax hierarchy, scrub vs snap, momentum, performance)

## 2. Site Profiles — Best-in-Class Scroll

Cover these 10 sites:
1. Apple iPhone pages (apple.com/iphone) — scroll-linked 3D
2. Stripe (stripe.com) — gradient scroll + feature reveals
3. Linear (linear.app) — speed-blur scroll sections
4. Awwwards Conference — parallax layers
5. Locomotive Scroll demo sites
6. Lottie Files landing page — scroll-triggered Lottie
7. Superlist (superlist.com) — pinned feature sections
8. Cosmos (cosmos.so) — infinite canvas scroll
9. Vercel (vercel.com) — gradient reveal sections
10. Basement Studio (basement.studio) — grain + scroll depth

For each:
### [Site Name]
**Scroll Technique:** ...
**Easing / Timing:** (specific values where known)
**GSAP / Lenis Config:**
**Code Pattern:**
\`\`\`tsx
// Working implementation
\`\`\`

## 3. Pattern Library

### 3.1 Lenis + GSAP ScrollTrigger Setup (Next.js App Router)
Complete provider component: Lenis RAF loop feeding GSAP ticker.

### 3.2 Pinned Horizontal Scroll Section
GSAP pin + scrub, full TSX with useLayoutEffect.

### 3.3 Scroll-Linked Text Reveal (line by line)
GSAP + SplitText approach without plugin (manual line splitting).

### 3.4 Parallax Image Layers
Multiple depth layers with useScroll + useTransform (Framer Motion).

### 3.5 Scroll-Snapping Full-Screen Sections
CSS scroll-snap + Lenis configuration.

### 3.6 Number Counter on Scroll
GSAP ScrollTrigger + gsap.to with snap for integer counting.

### 3.7 SVG Path Draw-On-Scroll
GSAP drawSVG technique using stroke-dashoffset (no plugin, pure GSAP).

## 4. Performance & Accessibility
- will-change strategy
- prefers-reduced-motion
- Lenis destroy on unmount

## 5. Scroll Patterns for Renovation / Real Estate
Before/after reveal, floor plan zoom, neighbourhood map scroll, material palette reveal.
`;

// ── File 5: Typography + motion ───────────────────────────────────────────────
const TYPO_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a Markdown file titled "# Typography + Motion — Sites Winning on Type & Animation".

## 1. Typography as a Design System
(variable fonts, optical sizing, fluid type scales, kinetic type philosophy)

## 2. Site Profiles — Typography + Motion Leaders

Cover these 10 sites:
1. Obys Agency (obys.agency) — editorial kinetic type
2. Pentagram (pentagram.com) — editorial authority
3. It's Nice That (itsnicethat.com) — magazine hierarchy
4. Stripe Press (press.stripe.com) — long-form typographic excellence
5. Cargo (cargo.site) — creative typography builder
6. Fonts In Use (fontsinuse.com) — typographic reference
7. Klim Type Foundry (klim.co.nz) — typographic brand
8. Grilli Type (grillitype.com) — variable font showcasing
9. Basement Studio (basement.studio) — mono + grotesk contrast
10. Cédric Pereira (cedricpereira.com) — kinetic name animations

For each:
### [Site Name]
**Type Stack:** (font names, weights, sizes)
**Motion Technique:** (how type moves)
**Easing:** (specific cubic-bezier or named easing)
**Color Role:** (how color interacts with type)
**Code Pattern:**
\`\`\`tsx
// Working TSX animation for this typography technique
\`\`\`

## 3. Type Animation Pattern Library

### 3.1 Word-by-Word Stagger Reveal
Framer Motion: split string to words, staggerChildren.

### 3.2 Character Scramble Effect
Vanilla TS: randomize characters then resolve to real text.

### 3.3 Headline Mask Reveal (clip-path)
GSAP clipPath animation from bottom-up mask.

### 3.4 Variable Font Weight Scroll Animation
CSS variable font + GSAP scrollTrigger driving font-variation-settings.

### 3.5 Marquee / Ticker with Pause on Hover
Pure Framer Motion marquee, no external lib needed.

### 3.6 Kinetic Split Hero (each letter independent)
Framer Motion + layout animations for letter rearrangement.

### 3.7 Typewriter with Cursor Blink
React hook + requestAnimationFrame typewriter.

## 4. Fluid Type Scale (Tailwind + clamp)
Complete tailwind.config.ts extension with clamp-based fluid type scale
from 320px to 1920px viewport.

## 5. Font Pairing Recommendations for Renovation / Real Estate
- 5 specific pairings (font names, rationale, weight combos)
- Variable font alternatives
- Google Fonts vs. purchased fonts trade-offs

## 6. Color + Type Palettes for High-End Property Sites
3 complete palettes: Modern Minimal | Warm Organic | Dark Luxury.
Each with: background, surface, text, accent hex codes + Tailwind config snippet.
`;

// ─── main ─────────────────────────────────────────────────────────────────────

const FILES = [
  { name: "sotd-winners.md", prompt: SOTD_PROMPT },
  { name: "immersive-3d-sites.md", prompt: THREE_PROMPT },
  { name: "agency-portfolios.md", prompt: AGENCY_PROMPT },
  { name: "scroll-experiences.md", prompt: SCROLL_PROMPT },
  { name: "typography-motion.md", prompt: TYPO_PROMPT },
];

async function main() {
  ensureDir(TARGET_DIR);

  for (const file of FILES) {
    const outPath = path.join(TARGET_DIR, file.name);
    console.log(`Generating ${file.name} ...`);
    try {
      const content = await generate(file.prompt);
      fs.writeFileSync(outPath, content, "utf8");
      console.log(`  Written: ${outPath} (${content.length} chars)`);
    } catch (err) {
      console.error(`  ERROR generating ${file.name}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\nAll files written. Running git commit...");

  // git operations
  const { execSync } = await import("child_process");
  const cwd = "C:/Users/Admin/Downloads/design-knowledge-base";
  try {
    execSync("git add md/", { cwd, stdio: "inherit" });
    execSync(
      'git commit -m "Add Awwwards pattern breakdowns: SOTD winners, 3D sites, agency portfolios, scroll experiences"',
      { cwd, stdio: "inherit" }
    );
    execSync("git push origin master", { cwd, stdio: "inherit" });
    console.log("git push complete.");
  } catch (gitErr) {
    console.error("git operation failed:", gitErr.message);
    console.log("Files are written — commit manually if needed.");
  }
}

main();
