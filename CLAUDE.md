# Design Knowledge Base — Claude Context

## What This Is
A complete design + dev reference library for Sai's projects. All components are copy-paste TSX for Next.js + TypeScript + Tailwind CSS + shadcn/ui + framer-motion.

**GitHub:** https://github.com/saibuilds/design-knowledge-base (branch: master)

## Owner
Sai — saieashh@gmail.com — github.com/saibuilds
Stack: Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui, Supabase, Vercel, GHL

## All Other Projects (also on GitHub)
- `saibuilds/djcustomreno-v2` — DJ Custom Reno site v2 (Vite + React + shadcn)
- `saibuilds/SathiDeals` — Real estate site
- `saibuilds/garden-suite-site` — gardensuite4you.ca (active dev)
- `saibuilds/luxwood-kitchens` — Luxwood Kitchens website
- `saibuilds/motta-kitchen-source` — Motta Kitchen Vite rebuild
- `saibuilds/archmind-pro` — ArchMind Pro AI platform (backend + frontend + desktop)
- `saibuilds/marketplace-command-center` — FB Marketplace automation
- `saibuilds/quickquote` — QuickQuote tool (Next.js)
- `saibuilds/train-ai-agents` — Local AI training
- `saibuilds/local-orchestrator` — Local agent orchestration

## Key Files To Load As Context
When building UI → paste relevant file from md/components/
When building auth/db → paste from md/frameworks/
When vibe designing → read md/tools/vibe-designing-workflow.md

## What's In md/components/
- shadcn-nextui-full.md — 69 components
- cultui-watermelon-full.md — 30 components
- originui-hoverdev-full.md — 47 components
- refero-saas-patterns.md + refero-saas-patterns-2.md — 32 SaaS patterns
- skiper-full.md, aceternity-full.md, magicui-full.md, 21stdev-full.md
- tremor-flowbite-mantine-reference.md
- advanced-animation-3d-libraries.md, premium-ui-patterns.md
- motion-primitives-lukacho.md, fancy-components-uiverse.md
- landing-page-sections.md — 15 complete SaaS landing sections

## What's In md/frameworks/
auth-patterns, database-patterns, deployment-devops, email-payments,
accessibility-patterns, testing-patterns, mobile-responsive-patterns,
nextjs, supabase, astro, vercel-deploy

## What's In md/tools/
vibe-designing-workflow.md — Google Stitch + v0 + Bolt + Lovable + Cursor + Claude Code
github-resources-vibe-designing.md — 40+ repos with workflow examples
performance, state-management, typescript-patterns, cms-options, figma-to-code

## Vibe Designing Workflow (Quick Ref)
1. Stitch (stitch.withgoogle.com) → describe vibe → get JSX
2. v0.dev → generate shadcn components
3. Paste into Next.js project, swap shadcn primitives
4. Cursor for logic, Claude Code for precision
5. Deploy Vercel

## How Claude Should Work Here
- Short responses, action + file only
- Run agents in background for large generation tasks
- Push to GitHub after every significant batch
- Match existing file structure in md/
