# Master Audit — Sources, Tools & Verification Guide

---

## Section 1: Component Libraries Scraped/Generated

### shadcn/ui

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| shadcn/ui | https://ui.shadcn.com/docs/components | 48 components | md/components/shadcn-nextui-full.md | Generated |

**Components captured:** accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, combobox, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

**Method:** ChatGPT agent generated from training knowledge (DNS failures prevented live scrape)

**Verify:** File should have 36+ shadcn components as `## ` headings with ` ```tsx ` code blocks

---

### NextUI / HeroUI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| NextUI / HeroUI | https://nextui.org/docs/components | 39 components | md/components/shadcn-nextui-full.md (second half) | Generated |

**Components captured:** accordion, autocomplete, avatar, badge, button, calendar, card, checkbox, chip, circular-progress, code, date-picker, date-range-picker, divider, drawer, dropdown, image, input, kbd, link, listbox, modal, navbar, pagination, popover, progress, radio-group, select, skeleton, slider, snippet, spacer, spinner, switch, table, tabs, textarea, tooltip, user

**Method:** ChatGPT agent generated from training knowledge

**Verify:** File should have 33+ NextUI components as `## ` headings

---

### Origin UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Origin UI | https://originui.com/components | 27 components | md/components/originui-hoverdev-full.md | Generated |

**Components captured:** animated-counter, animated-list, animated-tabs, animated-underline-tabs, blur-fade-in, confetti-button, copy-button, cursor-glow, file-upload-dropzone, flip-words, glowing-button, gradient-text, hero-video-dialog, highlight-text, image-comparison-slider, interactive-grid, keyboard-shortcut, letter-pullup, marquee, meteors, number-ticker, particles-background, shimmer-button, spotlight-card, stagger-list, text-reveal, word-rotate

**Method:** Playwright scraper attempted (DNS issues), ChatGPT agent generated

**Scraper:** scripts/scrape-originui-live.mjs

**Verify:** File should have 27 Origin UI components with full TSX

---

### Hover.dev

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Hover.dev | https://www.hover.dev/components | 20 components | md/components/originui-hoverdev-full.md (second half) | Generated |

**Components captured:** bubble-button, clip-path-links, count-up-stat, drag-cards, fire-button, framer-parallax-scroll, glitch-text, gravity-simulation, hover-image-links, hover-video-player, magnetic-button, ripple-button, scramble-text, shiny-button, spotlight-card, stagger-menu, swipe-carousel, terminal-header, typewriter-effect, underline-links

**Method:** Playwright scraper attempted, ChatGPT agent generated

**Scraper:** scripts/scrape-hoverdev-live.mjs

**Verify:** File should have 20 Hover.dev components with full TSX

---

### Cult UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Cult UI | https://cult-ui.com/components | 20 components | md/components/cultui-watermelon-full.md | Generated |

**Components captured:** 3d-flip-card, animated-beam, background-boxes, border-beam, blur-vignette, carousel-3d, confetti-button, direction-aware-card, dynamic-island, expandable-card, family-button, folder-component, glare-card, globe, hero-color-panels, magnetic-button, multiselect, animated-sidebar, text-scramble, expandable-toolbar

**Method:** ChatGPT agent generated

**Verify:** File should have 20 Cult UI components

---

### Watermelon UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Watermelon UI | https://www.watermelon-ui.com | 10 components | md/components/cultui-watermelon-full.md (second half) | Generated |

**Components captured:** split-accordion-card, animated-tabs, glassmorphism-cards, pricing-toggle, floating-radial-menu, staggered-list, magnetic-hover-links, scroll-progress, image-reveal-hover, parallax-card-stack

**Method:** ChatGPT agent generated

**Verify:** File should have 10 Watermelon UI components

---

### Skiper UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Skiper UI | https://skiper-ui.com | 29 components | md/components/skiper-full.md | Generated |

**Components captured:** MagneticButton, SpotlightButton, ShimmerButton, GradientBorderButton, GlassCard, Tilt3DCard, GlowCard, HeroParticle, HeroAnimatedText, AnimatedUnderlineNav, PillNav, SpringModal, Tooltip, Spinner, DotsLoader, Skeleton, ProgressBar, GradientText, GlitchText, Typewriter, WordReveal, GridPattern, DotPattern, Aurora, MeteorShower, Badge, AnimatedInput, SpringAccordion, SlidingTabs

**Method:** ChatGPT agent generated from training knowledge

**Verify:** File should have 20+ components with framer-motion animations

---

### Magic UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Magic UI | https://magicui.design/components | Multiple components incl. animated beam, border beam, shimmer, blur fade, hyper text | md/components/magicui-full.md + md/components/refero-saas-patterns-2.md | Scraped + Generated |

**Method:** Scraped + ChatGPT agent

**Verify:** magicui-full.md exists and is non-empty with components

---

### Aceternity UI

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Aceternity UI | https://ui.aceternity.com/components | Multiple components | md/components/aceternity-full.md + md/components/refero-saas-patterns-2.md | Scraped + Generated |

**Method:** Scraped + ChatGPT agent

**Verify:** aceternity-full.md exists and is non-empty

---

### 21st.dev

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| 21st.dev | https://21st.dev | Full library | md/components/21stdev-full.md | Scraped + Generated |

**Method:** Playwright scraper (scripts/scrape-21stdev.mjs or similar) + agent

**Verify:** 21stdev-full.md should be very large (~78,000 lines) — this is the full library dump

---

### Tremor

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Tremor | https://tremor.so/components | Component reference | md/components/tremor-flowbite-mantine-reference.md | Generated |

**Method:** ChatGPT agent generated

---

### Flowbite

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Flowbite | https://flowbite.com/docs/components | Component reference | md/components/tremor-flowbite-mantine-reference.md | Generated |

**Method:** ChatGPT agent generated

---

### Mantine

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Mantine | https://mantine.dev/components | Component reference | md/components/tremor-flowbite-mantine-reference.md | Generated |

**Method:** ChatGPT agent generated

---

### Motion Primitives

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Motion Primitives | https://motion-primitives.com/components | Component library | md/components/motion-primitives-lukacho.md | Generated |

**Method:** ChatGPT agent generated

---

### Refero.design SaaS Patterns

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Refero.design | https://refero.design | 32 SaaS UI patterns | md/components/refero-saas-patterns.md + md/components/refero-saas-patterns-2.md | Generated |

**Method:** ChatGPT agent generated 32 patterns based on Refero's SaaS UI pattern library

---

## Section 2: Reference Sites Replicated

### Hero Section Replicas

| Source | URL | What Was Captured | Output File | Status |
|---|---|---|---|---|
| Linear | https://linear.app | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Stripe | https://stripe.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Vercel | https://vercel.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Apple | https://apple.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Framer | https://framer.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Notion | https://notion.so | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Raycast | https://raycast.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |
| Resend | https://resend.com | Hero section replica | md/reference-sites/hero-sections-replicas.md | Generated |

**Method:** ChatGPT agent wrote self-contained HTML/CSS/JS replicas

**Verify:** File has 16 HTML sections (2 per site), no build step needed — open directly in browser

---

## Section 3: Scraper Scripts Used

### Playwright Scrapers (Node.js)

All scripts live in the `scripts/` folder. Run with: `node scripts/[filename]`

| Script | Target | Notes |
|---|---|---|
| scrape-shadcn-live.mjs | https://ui.shadcn.com/docs/components/[name] | Iterates component list |
| scrape-nextui-live.mjs | https://nextui.org/docs/components/[name] | Iterates component list |
| scrape-originui-live.mjs | https://originui.com/components | SPA — clicks through component cards |
| scrape-hoverdev-live.mjs | https://www.hover.dev/components | Clicks Code tab per component |

**Requirements:**
```bash
npm install playwright
npx playwright install chromium
```

**Note:** These require a working internet connection. Set `headless: false` in the script to debug DNS or rendering issues.

---

### Python Scrapers (Scrapling)

| Script | Target | Notes |
|---|---|---|
| scripts/scrape-scrapling.py | SSR/static sites | Does NOT work on JS-rendered SPAs |

**Requirements:**
```bash
.venv/Scripts/python.exe
pip install scrapling browserforge curl-cffi
```

**Note:** Scrapling is unsuitable for shadcn, NextUI, Origin UI, and Hover.dev — all are client-rendered SPAs.

---

## Section 4: Tools & APIs Used

| Tool | Purpose | URL | Notes |
|---|---|---|---|
| Playwright | JS-rendered site scraping | playwright.dev | npm install playwright |
| Scrapling | Static/SSR scraping | github.com/D4Vinci/Scrapling | Python, needs .venv |
| ChatGPT (codex-worker) | Component generation from training knowledge | openai.com | Used when scraping failed |
| Claude Code | Orchestration and file writing | anthropic.com | This tool |
| GitHub CLI (gh) | Repo creation and pushing | cli.github.com | Already authenticated |
| shadcn CLI | Component installation | ui.shadcn.com | npx shadcn@latest add |

---

## Section 5: Vibe Designing Tools

| Tool | URL | What It Does | Cost |
|---|---|---|---|
| Google Stitch | stitch.withgoogle.com | Text to React/Tailwind UI | Free — 350 generations/month |
| v0 by Vercel | v0.dev | shadcn components from prompts | Free tier available |
| Bolt.new | bolt.new | Full-stack prototype in browser | Free tier available |
| Lovable | lovable.dev | Chat to full app + Supabase integration | Paid |
| Cursor | cursor.com | VS Code with AI coding assistant | Free tier available |

---

## Section 6: How To Verify Everything Is Complete

Run these checks after cloning to a new machine:

```bash
# Check all expected directories exist
ls md/components/
ls md/frameworks/
ls md/tools/
ls md/animations/
ls md/3d/
ls md/reference-sites/
ls scripts/

# Check key files are not empty — expected line counts shown
wc -l md/components/shadcn-nextui-full.md           # ~3600 lines
wc -l md/components/cultui-watermelon-full.md        # ~3000 lines
wc -l md/components/originui-hoverdev-full.md        # ~2400 lines
wc -l md/components/21stdev-full.md                  # ~78000 lines
wc -l md/components/landing-page-sections.md         # ~1500 lines
wc -l md/tools/vibe-designing-workflow.md            # ~1100 lines
wc -l md/reference-sites/hero-sections-replicas.md  # ~1300 lines

# Count component headings in main files
grep "^## " md/components/shadcn-nextui-full.md | wc -l      # ~69
grep "^## " md/components/cultui-watermelon-full.md | wc -l  # ~30
grep "^## " md/components/originui-hoverdev-full.md | wc -l  # ~47
```

---

## Section 7: What Was NOT Scraped (Manual Gap Check)

### Partial captures — worth re-running with stable internet

| Library | Attempted | Result | Resolution |
|---|---|---|---|
| shadcn/ui live scrape | Yes | 19/48 components (DNS interruptions) | Replaced by agent-generated content |
| NextUI live scrape | Yes | 12/39 components (DNS interruptions) | Replaced by agent-generated content |
| Origin UI live scrape | Yes | 0 components (all DNS failures) | Replaced by agent-generated content |
| Hover.dev live scrape | Yes | 0 components (all DNS failures) | Replaced by agent-generated content |

### Not attempted — potential additions

| Library | URL | Notes |
|---|---|---|
| Radix Themes | radix-ui.com/themes | Pre-built Radix components with styling |
| Ark UI | ark-ui.com | Headless component primitives |
| Park UI | park-ui.com | Ark UI with pre-applied styles |
| Panda CSS | panda-css.com | CSS-in-JS design system |
| Wedges | lemonsqueezy.com/wedges | Tailwind component library |
| Preline UI | preline.co | Tailwind component library |
| Sailboat UI | sailboatui.com | Tailwind components |
| Tailus UI | tailus.io | Premium component library |

---

## Section 8: Re-Scraping Instructions

To re-scrape any library with a stable internet connection:

```bash
cd C:/[wherever]/design-knowledge-base
npm install
npx playwright install chromium

# Re-scrape shadcn/ui
node scripts/scrape-shadcn-live.mjs

# Re-scrape NextUI
node scripts/scrape-nextui-live.mjs

# Re-scrape Origin UI
node scripts/scrape-originui-live.mjs

# Re-scrape Hover.dev
node scripts/scrape-hoverdev-live.mjs
```

Each script saves its output to `md/components/[library]-full.md` automatically. Existing files will be overwritten — back up first if you want to keep the agent-generated versions as a fallback.

---

## Section 9: Instagram Reels — Reference Analysis & Business Reels Built

### 9A — Reference Reel HTML Templates (Design Inspiration)

**Local path:** `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/reels/`
**Also:** `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/reels-realestate/`

20 HTML reel templates scraped/built from Awwwards/Instagram-style sites, mapped to 15 design archetypes:

| File | Source Site | Archetype |
|---|---|---|
| 01-cartier-watch.html | Cartier Watch microsite | luxury-dark |
| 02-terminal-logistics.html | Terminal Logistics | cinematic-video-saas |
| 03-guilty-mind.html | Guilty Mind | dark-brutalist-grunge |
| 04-gsap-animation-engine.html | GSAP Animation Engine | experimental-dev |
| 05-sidewave-music.html | Sidewave Music | vaporwave-retro-neon |
| 06-of-sakazuki.html | OF Sakazuki | japanese-web3-amber |
| 07-obsidian-dew.html | Obsidian Dew | food-beauty-dtc-dark |
| 08-hashgraph-ventures.html | Hashgraph Ventures | cinematic-video-saas |
| 09-spline-ice-cube.html | Spline Ice Cube | 3d-spline-webgl |
| 10-fall-line-house.html | Fall Line House | architecture-editorial |
| 11-relats-periflex.html | Relats/Periflex | dark-brutalist-grunge |
| 12-maison-de-synergy.html | Maison de Synergy | soft-feminine-editorial |
| 13-design-agency.html | Design Agency | experimental-dev |
| 14-cartier-watches-wonders.html | Cartier Watches & Wonders | soft-feminine-editorial |
| 15-e-c-h-o-active-theory.html | E.C.H.O. / Active Theory | experimental-dev |
| 16-casper-s-caviar.html | Casper's Caviar | food-beauty-dtc-dark |
| 17-villa-maravilha.html | Villa Maravilha | resort-residences |
| 18-jesko-jets.html | Jesko Jets | aviation-luxury |
| 19-alpine-chalets.html | Alpine Chalets | architecture-editorial |
| 20-joyjam.html | Joyjam | experimental-dev |

**Library stack used:** GSAP 3.12.2 + ScrollTrigger + SplitText, Lenis 1.0.42, Three.js r134, Spline viewer 1.0.0, Vanta latest, Lottie 5.12.2, Tailwind v4.3

**Archetype metadata:** `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/notes/reel-techniques.json`
**Archetype-to-site mapping:** `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/notes/reel-to-archetype.json`

---

### 9B — Instagram Archive (Saved Posts)

**File:** `C:/Users/Admin/Downloads/insta 2/your_instagram_activity/saved/saved_posts.html`
**Count:** 7,751 saved reels/posts
**Format:** Instagram archive export — shortcodes only (`instagram.com/reel/{shortcode}/`), no titles or thumbnails
**Note:** Shortcodes require authenticated fetch to resolve to titles/thumbnails. Mapping done heuristically via archetype rubric in `reel-to-archetype.json`

---

### 9C — Business Reels Built (MP4 Output)

**Local path:** `C:/Users/Admin/Desktop/ai-website-learning/reels-out/`
**Build scripts:** `build_may16_reels.sh`, `build_may16_reels_v3.sh`

| File | Subject | Versions |
|---|---|---|
| R1_listing_251A*.mp4 | Real estate listing (251A) | v1, v2 clean/mute/vo, v3 clean/mute/vo |
| R2_gardensuite_251A*.mp4 | Garden suite at 251A | v2 clean/mute/vo, v3 clean/mute/vo |
| R3_kitchen_251A*.mp4 | Kitchen renovation concept | v1, v2 clean/mute/vo, v3 clean/mute/vo |
| R4_epoxy_251A*.mp4 | Epoxy flooring concept | v1, v2 clean/mute/vo, v3 clean/mute/vo |
| R5_authority_251A*.mp4 | Authority/brand positioning | v2 clean/mute/vo, v3 clean/mute/vo |

**Variants per reel:**
- `_clean` — no voiceover, no music bed
- `_mute` — no audio at all
- `_vo` — with voiceover track

**Also:** `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/ads/` — 4 reel-format HTML ads:
- `bg/reel-9x16.html` — background/brand reel
- `dj/reel-9x16.html` — DJ Custom Reno reel
- `mlb/reel-9x16.html` — My Legal Basement reel
- `sathideals/reel-9x16.html` — SathiDeals real estate reel

**Trending sounds:** `reels-out/trending_sounds/` — placeholder audio beds (placeholder_bed.m4a, 14s, 16s variants)
