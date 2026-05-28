# GitHub Resources for Vibe Designing — Repos, Components & Learning

A curated reference for Next.js / TypeScript / Tailwind / shadcn workflows using Google Stitch + Claude Code.

---

## 1. Top Component Library Repos (clone & study)

### shadcn/ui
- **URL:** https://github.com/shadcn-ui/ui
- **What's inside:** Copy-paste components built on Radix UI primitives + Tailwind. Not a package — source lives in your repo.
- **Vibe workflow:** Tell Stitch "design a card like shadcn's Card component but dark glass morphism". Take the JSX output, open Claude Code: "replace inline styles with shadcn Card primitives."
- **Install:** `npx shadcn@latest init` then `npx shadcn@latest add [component]`

### Magic UI
- **URL:** https://github.com/magicuidesign/magicui
- **What's inside:** Animated marketing components — shimmer buttons, bento grids, text animations, particle effects. Built on shadcn + Framer Motion.
- **Vibe workflow:** Browse the site, find the shimmer effect or border beam, paste the source from GitHub into Claude Code: "adapt this to wrap my pricing card."
- **Install:** `npx magicui-cli@latest add [component]`

### Aceternity UI
- **URL:** https://github.com/aceternity/ui (site: ui.aceternity.com)
- **What's inside:** High-drama animated components — moving cards, spotlight effects, typewriter, 3D card tilt, infinite scroll marquees.
- **Vibe workflow:** Screenshot an Aceternity component, feed to Stitch: "create a hero section with this kind of depth and animation style." Paste Stitch JSX into Claude Code with the Aceternity source as reference.
- **Install:** Components are copy-paste from the docs site; Tailwind + Framer Motion required.

### Origin UI
- **URL:** https://github.com/origin-ui/origin-ui
- **What's inside:** Clean, accessible input, form, and UI primitives. High-quality baseline components before adding flair.
- **Vibe workflow:** Use Origin UI as the clean structural layer. Prompt Claude Code: "use Origin UI's input component as the base, then layer Magic UI's shimmer border on the focus state."
- **Install:** `npx shadcn@latest add` — components map to shadcn conventions.

### Cult UI
- **URL:** https://github.com/mxkaske/mxkaske.dev
- **What's inside:** Personal site and component collection from mxkaske — includes a file-tree component, kbd component, and opinionated Tailwind patterns worth studying.
- **Vibe workflow:** Mine the repo for utility component patterns (kbd, file-tree). Drop source into Claude Code: "convert this to accept my navigation data shape."
- **Install:** Copy-paste from source; no CLI.

### Motion Primitives
- **URL:** https://github.com/ibelick/motion-primitives
- **What's inside:** Low-level animation building blocks using Framer Motion — text reveal, stagger containers, scroll-linked animations.
- **Vibe workflow:** Stitch gives you static layout → Claude Code: "wrap each section in a motion-primitives ScrollReveal container from ibelick/motion-primitives."
- **Install:** `npm install framer-motion` then copy primitives from repo.

### Hover.dev Components
- **URL:** https://github.com/hover-dev (site: hover.dev)
- **What's inside:** CSS and Framer Motion hover interaction patterns — magnetic buttons, elastic underlines, cursor followers.
- **Vibe workflow:** Grab a hover effect source, paste into Stitch as reference code: "add an interaction like this to the nav links."
- **Install:** Copy-paste; Tailwind + Framer Motion.

### Fancy Components
- **URL:** https://github.com/fancy-components (site: fancy.dev)
- **What's inside:** Decorative, high-impact single components — noise textures, grain overlays, aurora backgrounds.
- **Vibe workflow:** Pull the aurora background component, tell Claude Code: "integrate this as the hero section background behind my shadcn layout."
- **Install:** Copy-paste from site.

### Lukacho UI
- **URL:** https://github.com/lukacho/ui (site: ui.lukacho.com)
- **What's inside:** Stylized shadcn variants — opinionated color schemes and rounded component overrides.
- **Vibe workflow:** Use as an alternative theme layer. Claude Code: "swap my shadcn Button for the Lukacho variant and reconcile the className differences."
- **Install:** Copy-paste components + update `tailwind.config`.

### Plate (rich text editor)
- **URL:** https://github.com/udecode/plate
- **What's inside:** Plugin-based rich text editor built on Slate.js — 40+ plugins including AI, markdown, tables, slash commands.
- **Vibe workflow:** Stitch designs the editor container shell → Claude Code: "wire the Plate editor into this layout with the basic plugins preset."
- **Install:** `npm install @udecode/plate`

### Vaul (drawer)
- **URL:** https://github.com/emilkowalski/vaul
- **What's inside:** Animated bottom-sheet drawer component. The reference implementation for mobile-native-feeling drawers in React.
- **Vibe workflow:** Tell Stitch "mobile bottom sheet for filters." Paste output → Claude Code: "replace this with Vaul's Drawer.Root and match the snap points to this layout."
- **Install:** `npm install vaul`

### Sonner (toasts)
- **URL:** https://github.com/emilkowalski/sonner
- **What's inside:** Opinionated, beautiful toast notification system. Minimal API, stacking animations.
- **Vibe workflow:** Drop into any project immediately. Claude Code: "replace all react-hot-toast calls with Sonner's toast() API."
- **Install:** `npm install sonner` then add `<Toaster />` to root layout.

### CMDK (command palette)
- **URL:** https://github.com/pacocoursey/cmdk
- **What's inside:** Headless command-menu primitive — the base layer of shadcn's Command component.
- **Vibe workflow:** Study cmdk source to understand how shadcn Command works under the hood. Claude Code: "extend this cmdk menu with fuzzy search over my route list."
- **Install:** `npm install cmdk` (or via `npx shadcn@latest add command`)

---

## 2. Full Site/App Repos to Study & Clone

### vercel/next.js — examples folder
- **URL:** https://github.com/vercel/next.js/tree/canary/examples
- **Learn:** 200+ isolated patterns — MDX, auth, i18n, middleware, ISR, API routes, streaming.
- **Key patterns:** Each example is a standalone minimal repo. Clone one as a proof-of-concept base.
- **Vibe workflow:** "I need middleware-based auth" → clone `examples/auth` → Stitch redesigns the login page → Claude Code drops it in.

### shadcn-ui/taxonomy
- **URL:** https://github.com/shadcn-ui/taxonomy
- **Learn:** The canonical full Next.js 13 app pattern — app router, NextAuth, Stripe billing, MDX blog, dashboard.
- **Key patterns:** `lib/auth.ts`, `app/(dashboard)` layout, `components/ui` structure.
- **Vibe workflow:** Clone as SaaS base. Use Stitch to redesign the dashboard shell. Claude Code: "apply this Stitch design to taxonomy's existing dashboard layout without breaking the auth wrappers."

### steven-tey/precedent
- **URL:** https://github.com/steven-tey/precedent
- **Learn:** Lightweight Next.js starter with Framer Motion page transitions, custom hooks (`useScroll`, `useLocalStorage`), blur-in animations.
- **Key patterns:** `components/shared/page-transition.tsx`, custom hook conventions.
- **Vibe workflow:** Use as animation scaffold. Stitch outputs static layout → drop into Precedent's page wrapper → animations apply automatically.

### steven-tey/dub
- **URL:** https://github.com/steven-tey/dub (now github.com/dubinc/dub)
- **Learn:** Production SaaS — multi-tenant, analytics dashboard, API keys UI, rate limiting patterns, Prisma schema for a real product.
- **Key patterns:** `apps/web`, middleware.ts for tenant routing, API route structure.
- **Vibe workflow:** Study the analytics dashboard components for chart + table layout patterns. Feed those into Stitch as structure reference.

### calcom/cal.com
- **URL:** https://github.com/calcom/cal.com
- **Learn:** One of the largest open-source Next.js apps — booking flows, availability UI, team management, i18n, turborepo monorepo.
- **Key patterns:** `packages/ui`, form wizard patterns, complex scheduling state.
- **Vibe workflow:** Borrow the booking-step wizard pattern. Tell Claude Code: "implement a 3-step onboarding flow following cal.com's step component pattern."

### vercel/platforms
- **URL:** https://github.com/vercel/platforms
- **Learn:** Multi-tenant app with custom domain support via Vercel Edge middleware.
- **Key patterns:** `middleware.ts` subdomain routing, `app/[domain]` structure.
- **Vibe workflow:** Use as the structural base for any multi-tenant SaaS. Stitch designs the per-tenant landing page → Claude Code wires it into the `[domain]` route.

### leerob/leerob.io
- **URL:** https://github.com/leerob/leerob.io
- **Learn:** Clean MDX blog + portfolio patterns, Vercel Postgres, Next.js server components done minimally.
- **Key patterns:** `app/blog`, MDX configuration, server-side view counter.
- **Vibe workflow:** Clone for portfolio or blog base. Stitch redesigns the home page → Claude Code replaces the JSX while keeping server component data fetching intact.

### emilkowalski/ui-snippets
- **URL:** https://github.com/emilkowalski/ui-snippets
- **Learn:** Short, polished animation and interaction snippets — sliding tabs, elastic inputs, morphing icons.
- **Key patterns:** Self-contained snippets, easy to extract.
- **Vibe workflow:** Drop any snippet into Claude Code: "integrate this sliding underline tab pattern into my existing shadcn Tabs component."

### twentyhq/twenty
- **URL:** https://github.com/twentyhq/twenty
- **Learn:** Open-source CRM — complex data table UI, kanban board, command palette, sidebar navigation at scale.
- **Key patterns:** `packages/twenty-front`, record detail page pattern, filter/sort UI.
- **Vibe workflow:** Study the record list + detail layout. Stitch: "design a similar split-view CRM layout for my app." Claude Code adapts the pattern.

### maybe-finance/maybe
- **URL:** https://github.com/maybe-finance/maybe
- **Learn:** Finance dashboard — Recharts integration, account summary cards, transaction tables, date range pickers.
- **Key patterns:** Chart component wrappers, currency formatting utilities.
- **Vibe workflow:** Lift the chart + card layout pattern. Tell Stitch: "design a dashboard inspired by this finance app layout." Claude Code: "port this Recharts config to my data shape."

### lobehub/lobe-chat
- **URL:** https://github.com/lobehub/lobe-chat
- **Learn:** Full AI chat UI — message threading, model switcher, plugin system, sidebar agent list.
- **Key patterns:** `src/app/chat`, message bubble components, streaming render.
- **Vibe workflow:** Study message layout components. Stitch: "design a chat interface with this kind of sidebar + thread layout." Claude Code: "integrate Vercel AI SDK streaming into this Stitch layout."

---

## 3. Animation & 3D Repos

### react-three-fiber
- **URL:** https://github.com/pmndrs/react-three-fiber
- React renderer for Three.js. Write 3D scenes as JSX components.
- **Vibe use:** Stitch gives you 2D hero layout → Claude Code: "add an r3f canvas behind the hero with a slowly rotating abstract mesh."
- **Install:** `npm install @react-three/fiber three`

### drei
- **URL:** https://github.com/pmndrs/drei
- Helper library for react-three-fiber — cameras, environments, text, HTML in 3D space.
- **Vibe use:** Claude Code: "use drei's Environment preset 'city' and OrbitControls in this r3f canvas."
- **Install:** `npm install @react-three/drei`

### Framer Motion
- **URL:** https://github.com/framer/motion
- The standard React animation library. Layout animations, gestures, scroll-linked, variants.
- **Vibe use:** Every Stitch-generated component gets passed to Claude Code: "wrap list items in motion.div with staggerChildren variants."
- **Install:** `npm install framer-motion`

### GSAP
- **URL:** https://github.com/greensock/GSAP
- Professional-grade JS animation — timelines, scroll triggers, morphSVG.
- **Vibe use:** For scroll-driven narrative sections. Claude Code: "add a GSAP ScrollTrigger timeline that pins this section and scrubs the text reveal."
- **Install:** `npm install gsap`

### Lenis
- **URL:** https://github.com/darkroomengineering/lenis
- Smooth scroll library. Pairs with GSAP ScrollTrigger.
- **Vibe use:** Claude Code: "wrap the root layout with Lenis and sync it to GSAP's ticker."
- **Install:** `npm install lenis`

### Theatre.js
- **URL:** https://github.com/theatre-js/theatre
- Animation sequencer with a visual editor — keyframe animations for React and Three.js.
- **Vibe use:** Design motion sequences visually, export as code. Claude Code: "integrate this Theatre.js sequence into the hero component."
- **Install:** `npm install @theatre/core @theatre/studio`

### Rive React
- **URL:** https://github.com/rive-app/rive-react
- Embeds interactive Rive animations in React. State machines for hover/click states.
- **Vibe use:** Export a Rive file from rive.app, Claude Code: "embed this .riv file in the hero using useRive and trigger the hover state machine on mouseenter."
- **Install:** `npm install @rive-app/react-canvas`

---

## 4. Design System & Token Repos

### radix-ui/primitives
- **URL:** https://github.com/radix-ui/primitives
- Unstyled, accessible component primitives — the foundation of shadcn/ui.
- **Vibe use:** When shadcn doesn't have what you need, compose directly from Radix. Claude Code: "build a custom multi-select using Radix Popover + Radix Checkbox."
- **Install:** `npm install @radix-ui/react-[primitive]`

### radix-ui/colors
- **URL:** https://github.com/radix-ui/colors
- Perceptually balanced color scales with dark mode pairs. 30 palettes, P3 wide-gamut variants.
- **Vibe use:** Stitch picks a vibe color → Claude Code maps it to the nearest Radix scale and wires it into `tailwind.config` CSS variables.
- **Install:** `npm install @radix-ui/colors`

### tokens-studio/figma-plugin
- **URL:** https://github.com/tokens-studio/figma-plugin
- Figma plugin that exports design tokens as JSON, syncs to GitHub, integrates with Style Dictionary.
- **Vibe use:** Stitch exports a design → tokens exported from Figma via Tokens Studio → Claude Code: "transform this tokens.json into tailwind.config theme values."

### unocss/unocss
- **URL:** https://github.com/unocss/unocss
- Instant on-demand atomic CSS engine. Useful as reference for utility-first patterns even if you stay on Tailwind.
- **Vibe use:** Study UnoCSS presets for utility patterns not yet in Tailwind. Claude Code: "replicate this UnoCSS gradient utility as a Tailwind plugin."
- **Install:** `npm install unocss` (optional alternative to Tailwind)

### pacocoursey/next-themes
- **URL:** https://github.com/pacocoursey/next-themes
- Theme switching with no flash on load for Next.js. Works with shadcn's CSS variables.
- **Vibe use:** Every project. Claude Code: "add next-themes ThemeProvider to the root layout and wire the shadcn ThemeToggle to it."
- **Install:** `npm install next-themes`

---

## 5. How to Use These with Google Stitch + Claude Code

A repeatable vibe designing loop:

**Step 1 — Find a reference component.**
Browse the repos above. Identify the structural pattern or visual effect closest to your target. Copy the component source URL or paste the raw code.

**Step 2 — Feed the reference to Google Stitch.**
Prompt: "Design something like [repo/component] but with [your vibe — e.g. dark, frosted glass, editorial, brutalist]. Here is the reference component: [paste source or describe structure]."
Stitch produces a visual + JSX output.

**Step 3 — Copy Stitch JSX into your project.**
Create a new file in your component directory. Paste raw Stitch output as-is first.

**Step 4 — Open in Claude Code and refactor.**
Prompt Claude Code: "Refactor this component to use shadcn/ui primitives. Replace the Button with shadcn Button, the modal with shadcn Dialog. Keep the visual output identical."

**Step 5 — Pull the exact base component from the repo.**
`npx shadcn@latest add dialog`
Claude Code: "Merge the Stitch design's className values into the shadcn Dialog component you just added."

**Step 6 — Layer animation.**
Claude Code: "Wrap the card list items with motion-primitives' FadeIn component from ibelick/motion-primitives. Add a 0.1s stagger delay per item."

**Step 7 — Verify and harden.**
Claude Code: "Check this component for missing aria labels, keyboard navigation, and TypeScript prop types."

---

## 6. How to Clone & Strip Starter Templates

### Taxonomy (shadcn full app)
```bash
git clone https://github.com/shadcn-ui/taxonomy.git my-app
cd my-app && npm install
```
**Delete to get clean base:**
- `content/` — remove all MDX blog posts
- `app/(marketing)/blog` — remove blog routes
- `config/marketing.ts` — reset nav links
- Keep: `app/(auth)`, `app/(dashboard)`, `lib/auth.ts`, `lib/db.ts`, `components/ui/`

### Precedent (animations starter)
```bash
npx create-next-app --example https://github.com/steven-tey/precedent my-app
cd my-app && npm install
```
**Delete to get clean base:**
- `app/` — remove demo page content, keep `layout.tsx`
- `components/home/` — remove all demo sections
- Keep: `components/shared/`, `lib/hooks/`, `tailwind.config.ts`, `app/layout.tsx`

### T3 Stack
```bash
npm create t3-app@latest my-app
# Select: Next.js, TypeScript, Tailwind, Prisma, NextAuth, tRPC
```
**Delete to get clean base:**
- `src/pages/index.tsx` — replace content
- `src/server/api/routers/post.ts` — delete example router
- Keep: `src/server/auth.ts`, `src/server/db.ts`, `src/utils/api.ts`, tRPC setup

### Payload CMS Starter
```bash
npx create-payload-app@latest my-app
# Select: blank template, Next.js
```
**Delete to get clean base:**
- `src/collections/` — remove example collections, define your own
- `src/app/(frontend)/` — replace with your Next.js app pages
- Keep: `payload.config.ts`, `src/payload-types.ts` (auto-generated)

### Next.js SaaS Starter
```bash
git clone https://github.com/nextjs/saas-starter.git my-app
cd my-app && npm install
```
**Delete to get clean base:**
- `app/(dashboard)/dashboard/` — replace with your dashboard UI
- `components/` — keep pricing and auth components, replace layout shells
- Keep: Stripe integration in `lib/payments/`, `middleware.ts`, auth setup

---

## 7. Codrops & Creative Dev Resources

### tympanus.net/codrops
- **URL:** https://tympanus.net/codrops
- The highest-quality source of creative frontend tutorials. WebGL distortions, SVG path animations, scroll-driven layouts, cursor effects.
- **Best series to follow:** "On Scroll" tutorials, "Shader" tutorials, grid layout experiments.
- **Vibe use:** Read the tutorial to understand the technique. Then Claude Code: "implement the Codrops hover image distortion technique using r3f and drei instead of plain Three.js."

### nicktindall/cycler
- **URL:** https://github.com/nicktindall/cycler
- Smooth looping carousel/cycler utility.
- **Vibe use:** Claude Code: "integrate cycler into this image gallery component as the scroll loop engine."

### Creative Agency Patterns (Lusion-style)
- **Reference:** lusion.co (study their techniques from Codrops tutorials they publish)
- **What to borrow:** Full-screen WebGL transitions between sections, texture-based hover effects, camera path animations.
- **Vibe use:** Describe the effect to Stitch to get layout structure → implement the WebGL layer in Claude Code using r3f.

### Awwwards Open-Source References
Notable sites that published their code or techniques:
- **stripe.com** — gradient mesh backgrounds, documented by their team
- **linear.app** — their gradient animations have been reverse-engineered publicly
- **vercel.com** — Next.js itself, Geist font (github.com/vercel/geist-font)
- Search GitHub for `awwwards` to find repos recreating specific effects.

### CodePen Collections for Vibe Reference
Bookmark these search terms on CodePen:
- "glassmorphism tailwind"
- "bento grid css"
- "framer motion stagger"
- "webgl displacement"
- "magnetic button gsap"
Use found pens as Stitch prompts: "design a component with the visual style of this CodePen: [url]."

---

## 8. AI/LLM-Friendly Repos

### anthropics/anthropic-cookbook
- **URL:** https://github.com/anthropics/anthropic-cookbook
- Notebooks and examples for Claude API — tool use, vision, prompt caching, streaming.
- **Vibe use:** Claude Code: "use the tool use pattern from anthropic-cookbook/tool_use to add a search function to this chat component."

### vercel/ai (Vercel AI SDK)
- **URL:** https://github.com/vercel/ai
- The standard SDK for streaming AI responses in Next.js — useChat, useCompletion, RSC streaming, multi-provider support.
- **Vibe use:** Stitch designs any AI chat or generation UI → Claude Code: "wire this layout to useChat from @ai-sdk/react with the route handler at app/api/chat/route.ts."
- **Install:** `npm install ai @ai-sdk/openai` (or anthropic, google, etc.)

### a16z-infra/ai-getting-started
- **URL:** https://github.com/a16z-infra/ai-getting-started
- Full-stack AI starter — Next.js, Clerk auth, Pinecone, LangChain, OpenAI.
- **Vibe use:** Clone as AI product base. Stitch redesigns the UI shell → Claude Code: "apply this design to the existing auth and chat route structure without touching the AI logic."

### mckaywrigley/chatbot-ui
- **URL:** https://github.com/mckaywrigley/chatbot-ui
- Production-quality chat UI — conversation management, model switching, system prompt editor, folder organization.
- **Vibe use:** Study the message thread and sidebar pattern. Stitch: "redesign this chat UI with a minimal, editorial aesthetic." Claude Code adapts it while keeping conversation state logic.

### ollama/ollama
- **URL:** https://github.com/ollama/ollama
- Local LLM runtime. Run Llama, Mistral, etc. locally with an OpenAI-compatible API.
- **Vibe use:** Claude Code: "swap the OpenAI endpoint in this project to point to Ollama's local API at localhost:11434/v1 for offline development."
- **Install:** Download from ollama.com; use `npm install ollama` for the JS client.
