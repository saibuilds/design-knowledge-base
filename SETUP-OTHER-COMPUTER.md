# Other Computer Setup — Resume From Here

This file is the complete handoff. Run these commands on the new machine to clone everything, restore Claude memory, and continue exactly where the previous session left off.

---

## Step 1 — Prerequisites

```bash
# Install GitHub CLI if not already installed
winget install --id GitHub.cli

# Authenticate
gh auth login

# Install Node.js (if not installed) — https://nodejs.org
# Install Git — https://git-scm.com
```

---

## Step 2 — Clone All Projects

```bash
mkdir C:/Users/Admin/Downloads && cd C:/Users/Admin/Downloads

# Core knowledge base (start here)
gh repo clone saibuilds/design-knowledge-base

# Business sites
gh repo clone saibuilds/djcustomreno-v2
gh repo clone saibuilds/dj-custom-reno-assets
gh repo clone saibuilds/djcustomreno-original-aws
gh repo clone saibuilds/SathiDeals
gh repo clone saibuilds/garden-suite-site
gh repo clone saibuilds/luxwood-kitchens
gh repo clone saibuilds/motta-kitchen-source
gh repo clone saibuilds/quickquote

mkdir "C:/Users/Admin/Downloads/ArchMind Pro" && cd "C:/Users/Admin/Downloads/ArchMind Pro"
gh repo clone saibuilds/archmind-pro .

# Desktop projects
mkdir C:/Users/Admin/Desktop && cd C:/Users/Admin/Desktop
gh repo clone saibuilds/marketplace-command-center
gh repo clone saibuilds/train-ai-agents
gh repo clone saibuilds/local-orchestrator

# Reference sites
mkdir C:/Users/Admin/Desktop/ai-website-learning && cd C:/Users/Admin/Desktop/ai-website-learning
gh repo clone saibuilds/reference-sites
```

---

## Step 3 — Restore Claude Memory

```bash
# Clone memory repo into Claude's expected path
mkdir -p "C:/Users/Admin/.claude/projects/C--Users-Admin/memory"
cd "C:/Users/Admin/.claude/projects/C--Users-Admin/memory"
gh repo clone saibuilds/claude-memory .
```

Then copy the global CLAUDE.md:

```bash
# The global config lives in the memory repo — copy it to Claude's config dir
cp "C:/Users/Admin/.claude/projects/C--Users-Admin/memory/CLAUDE.md" "C:/Users/Admin/.claude/CLAUDE.md" 2>/dev/null || true
```

---

## Step 4 — Verify Everything Cloned

```bash
# Check design KB structure
ls C:/Users/Admin/Downloads/design-knowledge-base/md/components/
ls C:/Users/Admin/Downloads/design-knowledge-base/md/frameworks/
ls C:/Users/Admin/Downloads/design-knowledge-base/md/tools/
ls C:/Users/Admin/Downloads/design-knowledge-base/md/animations/
ls C:/Users/Admin/Downloads/design-knowledge-base/md/3d/
ls C:/Users/Admin/Downloads/design-knowledge-base/md/reference-sites/

# Confirm AUDIT.md and CLAUDE.md exist
ls C:/Users/Admin/Downloads/design-knowledge-base/AUDIT.md
ls C:/Users/Admin/Downloads/design-knowledge-base/CLAUDE.md

# Confirm memory files
ls "C:/Users/Admin/.claude/projects/C--Users-Admin/memory/"
```

---

## Step 5 — Start Claude Code in Design KB

```bash
cd C:/Users/Admin/Downloads/design-knowledge-base
claude
```

Claude will auto-load `CLAUDE.md` and the memory files. Tell it:

> "Read AUDIT.md and the memory files. Verify the design knowledge base is complete. Then continue from where we left off."

---

## What Was Built (Full Inventory)

### Design Knowledge Base (`saibuilds/design-knowledge-base`)

**Components** (`md/components/`):
- `shadcn-nextui-full.md` — 36 shadcn/ui + 33 NextUI components
- `cultui-watermelon-full.md` — 20 Cult UI + 10 Watermelon UI
- `originui-hoverdev-full.md` — 27 Origin UI + 20 Hover.dev
- `refero-saas-patterns.md` — 10 SaaS patterns (pricing, kanban, auth, onboarding)
- `refero-saas-patterns-2.md` — 22 more patterns (MagicUI, Aceternity, 21st.dev)
- `skiper-full.md` — 20+ framer-motion animated components
- `aceternity-full.md` — Aceternity UI full library
- `magicui-full.md` — Magic UI full library
- `21stdev-full.md` — 21st.dev full library
- `tremor-flowbite-mantine-reference.md` — Tremor, Flowbite, DaisyUI, Mantine, Recharts
- `advanced-animation-3d-libraries.md` — R3F, GSAP, Lenis, Theatre.js, Rive
- `premium-ui-patterns.md` — 15 premium patterns (glassmorphism, aurora, bento, spotlight)
- `premium-ui-libraries-vol2.md` — Lottie, Anime.js, React Bits, Ark UI
- `ui-libraries-reference.md` — Framer Motion, Radix UI, Vaul, Sonner, CMDK, Embla
- `motion-primitives-lukacho.md` — 23 Motion Primitives + Lukacho UI
- `fancy-components-uiverse.md` — Canvas effects, CSS animations, UIverse
- `landing-page-sections.md` — 15 complete SaaS landing sections

**Frameworks** (`md/frameworks/`):
- auth-patterns, database-patterns, deployment-devops, email-payments
- accessibility-patterns, testing-patterns, mobile-responsive-patterns
- nextjs, supabase, astro, vercel-deploy

**Tools** (`md/tools/`):
- `vibe-designing-workflow.md` — full Google Stitch + v0 + Bolt + Lovable + Cursor + Claude Code workflow
- `github-resources-vibe-designing.md` — 40+ repos with examples
- performance, state-management, typescript-patterns, cms-options, figma-to-code

**Animations** (`md/animations/`):
- framer-motion, gsap, gsap-scrollsmoother, lenis, locomotive, animejs
- micro-interactions, page-transitions, scroll-triggered-text, text-effects, css-scroll-animations

**3D** (`md/3d/`):
- r3f, drei, shaders, spline, theatre-js, physics, pixijs, webgl-image-effects
- scroll-3d-patterns, immersive-scroll, camera-scroll, 3d-portfolio-patterns

**Reference Sites** (`md/reference-sites/`):
- `hero-sections-replicas.md` — Linear, Stripe, Vercel, Apple, Framer, Notion, Raycast, Resend replicas

**Root files:**
- `CLAUDE.md` — master context, auto-loaded by Claude Code
- `AUDIT.md` — every source URL, what was captured, verification commands, Instagram reels

---

## Reel Assets (NOT on GitHub — physical transfer needed)

These are large media files not suited for GitHub. Copy from the old machine:

| What | Old Machine Path |
|---|---|
| 20 HTML reel templates | `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/reels/` |
| Real estate reel templates | `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/reels-realestate/` |
| 5 business MP4 reels (all variants) | `C:/Users/Admin/Desktop/ai-website-learning/reels-out/` |
| Reel archetype metadata | `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/notes/` |
| 4 HTML reel ads (DJ, MLB, SathiDeals, BG) | `C:/Users/Admin/Desktop/ai-website-learning/reference-sites/ads/` |
| Instagram archive (7,751 saved posts) | `C:/Users/Admin/Downloads/insta 2/` |

Transfer via USB drive, network share, or Google Drive.

---

## Verification Checklist

```bash
# Count component files
ls C:/Users/Admin/Downloads/design-knowledge-base/md/components/ | wc -l
# Expected: 17+

# Count framework files
ls C:/Users/Admin/Downloads/design-knowledge-base/md/frameworks/ | wc -l
# Expected: 11+

# Spot-check a component file has real content
wc -l C:/Users/Admin/Downloads/design-knowledge-base/md/components/shadcn-nextui-full.md
# Expected: 3600+ lines

# Check memory loaded
ls "C:/Users/Admin/.claude/projects/C--Users-Admin/memory/"
# Expected: MEMORY.md, user-profile.md, all-projects.md, design-knowledge-base.md, workflow-preferences.md, vibe-designing.md
```

---

## How to Use the Knowledge Base

When building UI with Claude Code:
```
"Using the patterns in md/components/shadcn-nextui-full.md, build me a [component]"
"Using md/components/landing-page-sections.md, create a hero section with [vibe]"
"Using md/tools/vibe-designing-workflow.md, help me start a new [project type]"
```

For vibe designing:
1. Google Stitch (stitch.withgoogle.com) — describe vibe → JSX
2. v0.dev — shadcn components from prompts
3. Paste into Next.js, swap shadcn primitives
4. Cursor for logic, Claude Code for precision
5. Deploy Vercel
