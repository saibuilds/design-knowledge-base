# Vibe Designing — Complete AI UI Workflow 2026

A practical reference for AI-powered UI design and development. Every tool, workflow, and prompt pattern a Next.js/TypeScript/Tailwind/shadcn developer needs in 2026.

---

## 1. Google Stitch

**URL:** [labs.google/stitch](https://labs.google/stitch)

Stitch is Google's AI design-to-code tool. Describe a visual aesthetic or UI concept in plain text, and it generates production-ready React/Tailwind/HTML with multiple design directions to choose from.

### How It Works

1. Open Stitch and enter a text prompt describing your vibe, not your spec
2. Stitch returns 3 design directions (color palettes, layout approaches, component styles)
3. Select a direction, optionally iterate with follow-up prompts
4. Export in your preferred format

### Voice Canvas

Stitch includes a Voice Canvas mode — activate the microphone and narrate your design direction in real-time. It updates the preview live as you speak. Useful for exploratory sessions where you are not sure what you want until you see it.

Example voice session:
```
"Make it darker... more contrast on the card... 
yeah that border is too harsh, soften it... 
now add a subtle gradient on the hero background..."
```

### Pricing (2026)

| Tier | Generations/Month | Model |
|------|-------------------|-------|
| Free | 350 | Gemini 2.5 Flash |
| Pro | 50 (higher quality) | Gemini 2.5 Pro |

### Export Formats

- **React/JSX** — functional components with inline Tailwind
- **HTML/CSS** — vanilla, no framework dependency
- **Tailwind** — utility-first classes, no custom CSS
- **Figma** — imports directly as editable frames

### Integration Workflow: Stitch → shadcn/ui

```tsx
// 1. Stitch exports this raw JSX
export function HeroCard() {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-white tracking-tight">
        Ship faster
      </h2>
      <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
        Build production-ready interfaces in hours, not weeks.
      </p>
      <button className="mt-6 rounded-lg bg-white text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-100 transition-colors">
        Get started
      </button>
    </div>
  )
}

// 2. Replace Stitch primitives with shadcn/ui equivalents
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HeroCard() {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white tracking-tight">Ship faster</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Build production-ready interfaces in hours, not weeks.
        </p>
        <Button variant="secondary" className="mt-6">
          Get started
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## 2. v0 by Vercel

**URL:** [v0.dev](https://v0.dev)

v0 generates shadcn/ui + Tailwind components directly from text prompts. Output is production-ready and uses the exact shadcn component API — no conversion needed.

### What It Does Best

- Single components and compound components (data tables, forms, dashboards)
- Components that require accessibility (dialogs, dropdowns, comboboxes)
- Anything that maps cleanly to an existing shadcn primitive
- Dark mode variants

### Core Workflow

```bash
# 1. Generate in v0.dev, copy the code block
# 2. Install any shadcn dependencies the output needs
npx shadcn@latest add card button badge dialog table

# 3. Paste component into your project
# 4. Done — it works immediately
```

### 10 Prompts That Work Well

Copy these directly into v0.dev:

```
1. "Dark analytics dashboard card showing monthly revenue with a sparkline chart, 
   trend percentage badge, and subtle grid background. shadcn Card, zinc palette."

2. "Pricing table with three tiers, highlighted middle tier, feature checklist rows, 
   annual/monthly toggle. Minimal, no gradients, clean borders."

3. "Command palette modal triggered by Cmd+K. Shows recent pages, actions, 
   and a search input. Linear-style dark theme."

4. "Data table for user management: avatar, name, email, role badge, status dot, 
   actions dropdown. Sortable columns, row selection checkboxes."

5. "Onboarding stepper with 4 steps, progress line connecting them, 
   current step highlighted, completed steps with checkmark. Vertical layout."

6. "Notification bell with dropdown showing unread count badge, 
   grouped notifications by today/earlier, mark all read button."

7. "File upload dropzone with dashed border, drag active state changes border to blue, 
   shows file preview thumbnails after upload with remove button."

8. "Settings page sidebar layout: grouped nav items with icons, active state indicator, 
   destructive danger zone section at bottom. shadcn dark."

9. "Toast notification system: success/error/warning variants, 
   icon on left, message + description, auto-dismiss progress bar."

10. "Profile dropdown in a top navbar: avatar trigger, name + email header, 
    grouped menu items, keyboard shortcut hints, sign out at bottom with separator."
```

### How to Iterate

After initial generation, send follow-up messages in the same v0 thread:

```
"Make it darker"
"Add a hover animation on the card"
"Make it fully mobile responsive"
"Add a loading skeleton state"
"Switch the button variant to outline"
"Add an empty state when the table has no rows"
"Make the badge colors semantic — green for active, red for inactive"
```

---

## 3. Bolt.new

**URL:** [bolt.new](https://bolt.new)

Bolt spins up a full-stack project in the browser — no local setup. You describe an app, it scaffolds Next.js or Vite, and you can deploy in one click.

### What It Does Best

- MVP prototypes where you need backend + frontend fast
- Demos and proof-of-concepts
- Apps with simple CRUD logic
- Shareable live previews without deployment overhead

### Core Workflow

```
1. Go to bolt.new
2. Type: "Build a Next.js kanban board with drag-and-drop, 
         local storage persistence, and dark mode"
3. Bolt generates the full project — file tree, components, logic
4. Edit files directly in the browser editor
5. Preview live on the right panel
6. Click Deploy → Netlify/Vercel integration
```

### When to Use Bolt vs v0 vs Stitch

| Scenario | Tool |
|----------|------|
| Need a full running app with routing and state | Bolt |
| Need one polished component to drop into a project | v0 |
| Need visual design directions before writing code | Stitch |
| Need to explore multiple aesthetic options quickly | Stitch |
| Need shadcn-exact API output | v0 |
| Need auth + database without setup | Lovable |

---

## 4. Lovable

**URL:** [lovable.dev](https://lovable.dev)

Lovable generates full-stack apps via chat, with native Supabase integration. Auth, database tables, RLS policies, and UI are all generated together.

### What It Does Best

- Apps that need user accounts immediately
- SaaS starters with subscription logic
- Internal tools with real data
- Anything that would take a day to wire up Supabase manually

### Core Workflow

```
1. Describe your app in the chat
   "Build a project management app where users can 
    create workspaces, invite teammates, and assign tasks 
    with due dates. Each user should only see their workspaces."

2. Lovable generates:
   - Supabase schema (tables, relationships)
   - RLS policies for row-level security
   - Auth flow (sign up, login, session)
   - Full UI with Next.js + Tailwind

3. Connect your Supabase project in settings

4. Deploy via the Lovable dashboard
```

### What Gets Generated Automatically

```sql
-- Lovable generates this Supabase schema
create table workspaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table workspace_members (
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'member',
  primary key (workspace_id, user_id)
);

-- RLS policies generated automatically
alter table workspaces enable row level security;

create policy "Users can view their workspaces"
  on workspaces for select
  using (
    owner_id = auth.uid() or
    exists (
      select 1 from workspace_members
      where workspace_id = workspaces.id
      and user_id = auth.uid()
    )
  );
```

---

## 5. Cursor AI

**URL:** [cursor.com](https://cursor.com)

Cursor is a VS Code fork with deeply integrated AI. The model understands your full codebase through `@` context references, not just the open file.

### What It Does Best

- Refining and debugging code generated by Stitch/v0/Bolt
- Adding complex business logic to generated scaffolds
- Refactoring for type safety and consistency
- Multi-file edits that require understanding relationships

### Key Shortcuts

| Shortcut | What It Does |
|----------|--------------|
| `Cmd+K` | Inline edit — select code, describe the change |
| `Cmd+L` | Open chat panel |
| `Cmd+Shift+L` | Add selection to chat context |
| `@file` | Reference a specific file in chat |
| `@codebase` | Search entire codebase semantically |
| `@docs` | Reference external documentation |
| `Tab` | Accept AI autocomplete suggestion |

### Using Cursor with Stitch/v0 Output

```tsx
// 1. Paste Stitch-generated component into your project

// 2. Select the entire component, press Cmd+K, type:
// "Convert all inline style objects to Tailwind classes. 
//  Replace the button with shadcn Button. 
//  Add TypeScript props interface."

// 3. Before (Stitch output):
export function StatCard({ label, value, change }) {
  return (
    <div style={{ borderRadius: 12, background: '#18181b', padding: 24, border: '1px solid #27272a' }}>
      <span style={{ fontSize: 12, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginTop: 8 }}>
        {value}
      </div>
    </div>
  )
}

// 4. After (Cursor refines it):
interface StatCardProps {
  label: string
  value: string | number
  change?: number
}

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl bg-zinc-950 p-6 border border-zinc-800">
      <span className="text-xs text-zinc-400 uppercase tracking-wide">
        {label}
      </span>
      <div className="text-4xl font-bold text-white mt-2">
        {value}
      </div>
      {change !== undefined && (
        <p className={cn("text-sm mt-1", change >= 0 ? "text-emerald-400" : "text-red-400")}>
          {change >= 0 ? "+" : ""}{change}%
        </p>
      )}
    </div>
  )
}
```

### Useful Cursor Chat Prompts for Refinement

```
@file:components/dashboard.tsx 
"This component re-renders on every keystroke. 
 Find the cause and memoize appropriately."

@codebase 
"Find all places we're fetching user data and 
 consolidate them to use the useUser hook."

@file:app/actions.ts 
"Add Zod validation to every server action in this file. 
 Return typed errors, not throws."
```

---

## 6. Claude Code

Claude Code (this tool) is best used for precision implementation work — especially when paired with Figma via MCP.

### Figma MCP Workflow

```typescript
// Claude Code can access Figma design context via MCP
// The get_design_context call retrieves node data, styles, and measurements

// 1. In your Claude Code session, reference the Figma frame:
// "Implement this Figma frame pixel-perfect: [Figma URL]"

// 2. Claude Code calls get_design_context, receives:
{
  "node": "HeroSection",
  "width": 1440,
  "padding": { "top": 96, "horizontal": 80 },
  "background": "#0a0a0a",
  "children": [
    {
      "type": "TEXT",
      "content": "Ship your idea today",
      "fontSize": 72,
      "fontWeight": 700,
      "color": "#ffffff",
      "letterSpacing": -2.5
    }
  ]
}

// 3. Claude Code produces exact Tailwind implementation:
export function HeroSection() {
  return (
    <section className="w-full bg-[#0a0a0a] px-20 pt-24 pb-0">
      <h1 className="text-[72px] font-bold text-white tracking-[-0.035em] leading-none">
        Ship your idea today
      </h1>
    </section>
  )
}
```

### Stitch → Figma → Claude Code Chain

```
1. Generate layout in Stitch (vibe exploration)
2. Export to Figma (refine spacing, typography, assets)
3. Share Figma URL with Claude Code
4. Claude Code implements with pixel precision
5. Result: design-accurate, production-ready code
```

### Best Claude Code Prompts for Component Generation

```
"Implement this component using shadcn/ui primitives only. 
 Match the Figma spacing exactly. Use CSS variables from globals.css 
 for any colors not in the default Tailwind palette."

"Build a CVA variant system for this button. 
 Variants: default, destructive, outline, ghost. 
 Sizes: sm, md, lg. TypeScript types for all props."

"Take this Stitch-generated layout and make it fully responsive. 
 Mobile: single column stack. Tablet: 2 columns. Desktop: 3 columns bento grid."
```

---

## 7. The Master Vibe Workflow

End-to-end from idea to deployed site.

### Step 1 — Vibe Exploration in Stitch

```
Prompt: "Dark SaaS landing page for a developer tool. 
Feels like Linear meets Vercel. Bento grid feature section, 
minimal hero with large type, subtle noise texture on backgrounds."

→ Review 3 directions, pick the one closest to your vision
→ Download JSX export
```

### Step 2 — Component Refinement in v0

```
Prompt: "Pricing section with three tiers. 
Dark background, Pro tier has a glowing border, 
annual/monthly toggle, feature list with check icons. 
Linear-style dark theme, shadcn components."

→ Copy the generated code block
```

### Step 3 — Next.js Project Setup

```bash
# Create project
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-app

# Initialize shadcn/ui
npx shadcn@latest init

# Answer prompts:
# Style: Default
# Base color: Zinc
# CSS variables: Yes

# Add components you know you'll need
npx shadcn@latest add button card badge dialog
npx shadcn@latest add navigation-menu sheet separator
npx shadcn@latest add form input label toast

# Install common utilities
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-icons lucide-react
npm install framer-motion
```

### Step 4 — Integrate Generated Code

```tsx
// src/components/layout/hero.tsx
// Paste Stitch JSX, then swap primitives

// Before (raw Stitch):
<div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
  <button className="rounded-md bg-white text-black px-4 py-2 text-sm">
    Get started
  </button>
</div>

// After (shadcn primitives):
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card className="bg-zinc-900 border-zinc-800 p-6">
  <Button>Get started</Button>
</Card>
```

### Step 5 — Business Logic in Cursor

```
Open project in Cursor

Cmd+L → "Add a useScrollProgress hook that tracks 
         scroll percentage and drives the hero 
         parallax effect in src/components/layout/hero.tsx"

Cmd+K on form component → 
"Add React Hook Form + Zod validation. 
 Email field required, valid format. 
 Show inline error messages below each field."
```

### Step 6 — Precision Work with Claude Code

```
"Implement the Figma design at [URL]. 
 The hero section uses a custom gradient not in Tailwind — 
 add it to globals.css as a CSS variable. 
 Match line-height and letter-spacing exactly."

"The bento grid in src/components/sections/features.tsx 
 needs to animate in on scroll. Each card staggers by 100ms. 
 Use Framer Motion, respect prefers-reduced-motion."
```

### Step 7 — Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "initial"
gh repo create my-app --public --push

# Deploy
npx vercel

# Or connect repo at vercel.com/new
# Auto-deploys on every push to main
```

---

## 8. Prompt Engineering for Vibe Designing

The difference between mediocre and excellent AI-generated UI is almost entirely in how you write the prompt.

### The Wrong Way vs the Right Way

```
WRONG:  "Make a card component"
RIGHT:  "Glassmorphism card with frosted background blur, 
         1px white/10 border, subtle inner glow, 
         dark mode, feels like Linear's command palette"

WRONG:  "Dashboard layout"
RIGHT:  "Bento grid dashboard, dark luxury aesthetic, 
         zinc-950 base with zinc-800 card borders, 
         monospace numbers for metrics, 
         editorial typography hierarchy"
```

### The Vibe Prompt Formula

```
[AESTHETIC] + [SPECIFIC ELEMENTS] + [REFERENCE BRAND/PRODUCT] + [MOOD/FEELING]
```

### 20 Example Prompts with Expected Outputs

```
1. "Glassmorphism pricing card, backdrop-blur-xl, 
   white/5 background, gradient border, dark mode, 
   feels like Apple Vision Pro UI"
   → Frosted glass card with gradient borders, premium feel

2. "Neubrutalist button set, thick black borders, 
   offset box shadows, flat colors (yellow, coral, mint), 
   bold sans-serif labels"
   → Chunky offset-shadow buttons with stark contrast

3. "Aurora hero section, animated gradient background 
   (purple → blue → cyan), large display type, 
   minimal content, feels like Stripe's new homepage"
   → Full-bleed animated gradient with centered type

4. "Bento grid feature section, 6 cards in asymmetric layout, 
   dark zinc, each card has an icon and 2-line description, 
   subtle hover lift effect"
   → Asymmetric bento with hover transforms

5. "Terminal-style code block component, dark background, 
   syntax highlighting in green/cyan monochrome, 
   copy button top-right, optional filename tab"
   → Dev-focused code display with retro terminal vibe

6. "Editorial article header, large serif display font, 
   dropcap first letter, byline with avatar, 
   minimal Swiss design, lots of white space"
   → Magazine-quality article header

7. "Dark luxury navbar, centered logo, nav items spaced wide, 
   CTA button with gold accent, glass effect on scroll, 
   feels like a high-end fashion brand"
   → Premium sticky nav with glass scroll effect

8. "Claymorphism 3D card, pastel blue, soft shadows, 
   rounded corners at 24px, inflated/puffy appearance, 
   playful and friendly"
   → Soft 3D-looking card with pastel palette

9. "Tech noir dashboard sidebar, deep charcoal background, 
   cyan/teal accent colors, subtle scanline texture, 
   monospace font for labels, cyberpunk aesthetic"
   → Dark tech sidebar with sci-fi undertones

10. "Minimal Swiss data table, lots of whitespace, 
    thin borders, Helvetica-style sans, 
    row hover is very subtle gray, 
    sort arrows are tiny and precise"
    → Clean modernist table with Swiss design principles

11. "Gradient mesh background, pastel aurora colors, 
    white text, card with white/20 border, 
    feels like a Y Combinator startup landing page in 2026"
    → Soft gradient mesh with light cards

12. "Flat illustration-style empty state, 
    simple geometric shapes, brand color accent, 
    one-line message, one CTA button, centered layout"
    → Clean empty state with geometric illustration

13. "Vercel-dark inspired component library showcase, 
    zinc-950 background, mono code snippets, 
    tab switcher to show code/preview, 
    clean sans typography"
    → Developer documentation component style

14. "Brutalist grid portfolio layout, 
    high contrast black/white, overlapping elements, 
    visible grid lines, bold uppercase labels, 
    feels like a design magazine from 1994"
    → Grid-heavy brutalist layout

15. "Smooth animated loading state, 
    skeleton screens with shimmer animation, 
    maintains layout shape during load, 
    dark variant, zinc palette"
    → Polished skeleton loading pattern

16. "Sidebar navigation with collapsible groups, 
    icon + label items, active state left border accent, 
    footer with user avatar and settings, 
    Linear-style dark theme"
    → Linear-inspired collapsible sidebar

17. "Form with floating labels, 
    labels animate up on focus, 
    input border glows on focus, 
    inline validation states, 
    Stripe checkout feel"
    → Animated floating label form

18. "Stats section with large numbers, 
    animated count-up on scroll, 
    metric label below, grid of 4, 
    dark background, white numbers, 
    Framer website aesthetic"
    → Impactful metrics display

19. "Mobile app screenshot mockup section, 
    device frame with app screenshot, 
    feature labels pointing to UI elements, 
    gradient background, feels like App Store product page"
    → Marketing screenshot section

20. "Changelog / timeline component, 
    dates on left, entries on right, 
    connecting dots/line, 
    badge for version numbers, 
    Linear changelog aesthetic"
    → Developer changelog timeline
```

### Aesthetic Vocabulary Reference

```
GLASSMORPHISM
Frosted glass effect. backdrop-blur, white/10 backgrounds, 
1px semi-transparent borders, works on gradient backgrounds.
CSS: backdrop-filter: blur(16px); background: rgba(255,255,255,0.05);

NEUBRUTALISM
Thick borders, offset box shadows (no blur), flat colors, 
bold typography. Anti-minimal, confrontational, fun.
CSS: border: 2px solid black; box-shadow: 4px 4px 0px black;

CLAYMORPHISM
Soft, puffy, 3D-looking elements. Multi-layer box shadows 
simulate depth. Pastel colors, high border-radius.
CSS: box-shadow: inset 0 -3px 6px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.15);

AURORA / GRADIENT MESH
Animated or static color mesh gradients. 
Purple/blue/cyan for dark themes. Pink/orange/yellow for light.
CSS: background: conic-gradient(from 0deg, #7c3aed, #2563eb, #06b6d4);

BENTO GRID
Asymmetric grid of cards, each a different size. 
Dashboard-style feature sections. Named after Japanese bento boxes.
CSS: display: grid; grid-template-columns: repeat(3, 1fr); with varying grid-column/row spans.

EDITORIAL / MINIMAL SWISS
Heavy influence from print design. Strict grid, 
generous whitespace, type does all the work. 
Inspired by Swiss International Typographic Style.

BRUTALIST
Raw, utilitarian. System fonts, visible structure, 
almost no decoration. Functional above all else.

DARK LUXURY
Deep blacks, gold or platinum accents, 
wide letter-spacing, elegant serif or refined sans.
Think: Rolls Royce, Chanel digital.

TECH NOIR
Dark backgrounds with cyan/teal/green mono accents. 
Grid textures, monospace fonts, inspired by 
Blade Runner, cyberpunk, terminal UIs.
```

### How to Describe Color Vibes

Instead of hex codes, reference the feeling:

```
"Feels like Vercel dark"
→ zinc-950 base, zinc-800 borders, pure white text, 
  no colored accents, monospace for code

"Linear purple gradient"
→ deep indigo to violet gradient, very subtle, 
  only on hero sections, not backgrounds

"Stripe blue trust"
→ #635bff to #0070f3 gradient, professional, 
  conveys financial reliability

"Framer motion editorial"
→ pure white background, large bold sans, 
  lots of whitespace, single accent color

"Raycast warm dark"
→ slightly warm dark background (not pure zinc), 
  amber/orange accent, refined but approachable

"Arc browser playful"
→ pastel gradients, rounded everything, 
  cheerful without being childish
```

---

## 9. Stitch → shadcn/ui Conversion Cheatsheet

### Common Stitch Patterns → shadcn Equivalents

```tsx
// BUTTONS
// Stitch:
<button className="rounded-md bg-zinc-900 border border-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-800">
  Click me
</button>
// shadcn:
<Button variant="outline">Click me</Button>

// ---

// CARDS
// Stitch:
<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-md">
  ...
</div>
// shadcn:
<Card>
  <CardContent className="p-6">...</CardContent>
</Card>

// ---

// BADGES / TAGS
// Stitch:
<span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
  Active
</span>
// shadcn:
<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
  Active
</Badge>

// ---

// INPUT FIELDS
// Stitch:
<input 
  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
  placeholder="Enter email"
/>
// shadcn:
<Input placeholder="Enter email" />

// ---

// MODALS / OVERLAYS
// Stitch:
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-2xl">
    ...
  </div>
</div>
// shadcn:
<Dialog>
  <DialogContent>
    ...
  </DialogContent>
</Dialog>

// ---

// DROPDOWN MENUS
// Stitch:
<div className="absolute right-0 mt-2 w-48 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl">
  <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800">
    Profile
  </button>
</div>
// shadcn:
<DropdownMenu>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// ---

// TOOLTIPS
// Stitch:
<div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-zinc-800 px-2 py-1 text-xs text-white">
  Tooltip text
</div>
// shadcn:
<Tooltip>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>

// ---

// TABS
// Stitch:
<div className="flex border-b border-zinc-800">
  <button className="border-b-2 border-white px-4 py-2 text-sm font-medium text-white">
    Tab 1
  </button>
  <button className="px-4 py-2 text-sm font-medium text-zinc-400">
    Tab 2
  </button>
</div>
// shadcn:
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
</Tabs>

// ---

// AVATARS
// Stitch:
<div className="h-8 w-8 rounded-full bg-zinc-700 overflow-hidden">
  <img src={src} className="h-full w-full object-cover" />
</div>
// shadcn:
<Avatar>
  <AvatarImage src={src} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Replacing Stitch Inline Styles with Tailwind

```tsx
// Stitch sometimes exports inline style objects
// Cursor Cmd+K: "Convert all style objects to Tailwind classes"

// Before:
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 24px',
  backgroundColor: '#18181b',
  borderRadius: '12px',
  border: '1px solid #27272a',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
}}>

// After:
<div className="flex items-center gap-3 px-6 py-4 bg-zinc-900 rounded-xl border border-zinc-800 shadow-md">
```

### CVA Variants Pattern for Stitch Components

When Stitch generates a component with multiple visual states, refactor to CVA:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Stitch generated these three "states" as separate components.
// Consolidate into one CVA-powered component:

const alertVariants = cva(
  // Base styles (shared across all variants)
  "flex items-start gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "border-zinc-800 bg-zinc-900 text-zinc-100",
        success: "border-emerald-800 bg-emerald-950 text-emerald-300",
        warning: "border-amber-800 bg-amber-950 text-amber-300",
        destructive: "border-red-800 bg-red-950 text-red-300",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
}

export function Alert({ className, variant, size, icon, children, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant, size }), className)} {...props}>
      {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}

// Usage:
<Alert variant="success" icon={<CheckIcon />}>
  Your changes have been saved.
</Alert>

<Alert variant="destructive" size="sm">
  Something went wrong.
</Alert>
```

---

## 10. Tool Comparison Matrix

| | **Stitch** | **v0** | **Bolt** | **Lovable** | **Cursor** | **Claude Code** |
|---|---|---|---|---|---|---|
| **Best for** | Visual exploration, layout directions | shadcn components, production UI | Full-stack MVPs, prototypes | Auth + DB apps fast | Code refinement, debugging | Precision impl, Figma → code |
| **Output quality** | High visual fidelity, needs shadcn swap | Production-ready shadcn | Functional, needs cleanup | Full-stack, production-ready | Depends on input quality | Very high, pixel-accurate |
| **Speed** | Fastest for exploration | Fast for components | Fast for full apps | Fast for data apps | Medium (iterative) | Medium (precise) |
| **Cost** | Free: 350/mo | Free tier available | Free tier available | Free tier available | $20/mo Pro | Usage-based |
| **Stack output** | React/Tailwind/HTML/Figma | Next.js + shadcn/ui | Next.js or Vite | Next.js + Supabase | Refines any stack | Any (TypeScript preferred) |
| **Where in workflow** | Step 1: Vibe | Step 2: Components | Alt to Steps 3–7 | Alt for DB apps | Step 5: Logic | Step 6: Polish |
| **Needs local setup** | No | No | No | No | Yes | Yes |
| **Deploys** | No | No | Yes (one-click) | Yes | No | No |
| **Figma integration** | Export to Figma | No | No | No | Import via plugin | Via MCP (read) |
| **Iteration model** | Prompt → 3 directions | Chat thread | In-browser editor | Chat thread | Inline edit | Chat + file editing |

### When to Reach for Each Tool

```
Starting from scratch, exploring aesthetics?  →  Stitch
Need a specific shadcn component?             →  v0
Want a working app without local setup?       →  Bolt
Need auth + database without config?          →  Lovable
Have generated code that needs polish?        →  Cursor
Have a Figma file to implement exactly?       →  Claude Code
Complex multi-file refactor?                  →  Cursor or Claude Code
Adding business logic to a prototype?         →  Cursor
Pixel-perfect from design spec?               →  Claude Code
```

---

## Quick Reference

### shadcn Add Commands

```bash
# Core layout
npx shadcn@latest add card separator skeleton scroll-area

# Navigation
npx shadcn@latest add navigation-menu breadcrumb tabs

# Forms
npx shadcn@latest add form input textarea select checkbox radio-group switch slider

# Overlays
npx shadcn@latest add dialog drawer sheet alert-dialog tooltip popover

# Feedback
npx shadcn@latest add toast alert badge progress

# Data
npx shadcn@latest add table data-table pagination

# Misc
npx shadcn@latest add avatar command dropdown-menu context-menu
```

### Tailwind Dark Mode Setup

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom design tokens here
      colors: {
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
      },
    },
  },
}
export default config
```

### globals.css CSS Variables (Dark Mode Ready)

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --brand: 262 83% 58%;
    --brand-foreground: 0 0% 100%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --brand: 262 83% 58%;
    --brand-foreground: 0 0% 100%;
  }
}
```

### cn Utility (Required for shadcn)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
