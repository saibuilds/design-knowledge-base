# Cult UI — Component Reference

> Source: https://cult-ui.com
> Style: Premium, dark, highly polished — "cult-worthy" components
> Use for: Luxury brand websites, high-end CTAs, premium feel

---

## What It Is
Cult UI is a curated set of premium React components with very high visual quality. Dark-first, heavy on gradients, glass morphism, and 3D transforms. Built for brands that want to feel expensive.

## Key Component Categories
- **Bg-animate-btn** — button with animated gradient background
- **Direction-aware-hover** — card that reveals content based on mouse entry direction
- **Glowing card** — card with animated border glow
- **Magnetic button** — cursor-following magnetic CTA
- **Minimal card** — ultra-clean card with subtle hover
- **Neon gradient card** — electric glow card for features
- **Popover** — beautiful floating info panels
- **Text-animate** — character-by-character reveals
- **3D card** — perspective tilt card
- **Typewriter** — smooth typing effect

## How to Browse
1. Go to https://cult-ui.com
2. Click any component to see live demo + source
3. Source is TypeScript React + Tailwind

## Brand Applications

### Motta Kitchen (brass/warm white)
- Direction-aware hover cards for kitchen collections
- 3D tilt card for featured products
- Glowing CTA for "Book a Consultation"
- Text-animate for hero tagline reveal

### SathiDeals (gold/black)
- Neon gradient card for featured listings
- Magnetic button for "Book a Showing"
- Typewriter effect: "Your Toronto Real Estate Team"

### DJ Custom Reno (amber/black)
- Glowing card for before/after showcase
- Bg-animate-btn for "Get a Free Quote"

### GardenSuites4You (yellow/navy)
- Minimal cards for permit steps
- Direction-aware hover for service cards

---

## Installation
```bash
npm install framer-motion
npm install @radix-ui/react-popover  # for popover components
```

## Key Patterns from Cult UI

### Direction-Aware Hover Card
```tsx
// Detects which edge the mouse entered from
// Shows overlay content sliding in from that direction
// Great for: listing cards, service cards, portfolio items
const [direction, setDirection] = useState<'top'|'bottom'|'left'|'right'>('top')
const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const w = rect.width; const h = rect.height
  const edges = { top: y, bottom: h-y, left: x, right: w-x }
  setDirection(Object.entries(edges).sort(([,a],[,b]) => a-b)[0][0] as any)
}
```

### Animated Gradient Button
```tsx
// CSS-only animated gradient border/background
// Works with any brand colors
<button className="relative p-px overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-[length:200%] animate-gradient">
  <span className="relative block rounded-full bg-black px-6 py-3 text-white">
    Get a Quote
  </span>
</button>
```

---

## Scraper
Run: `node scripts/scrape-cultui-live.mjs`
Output: `md/components/cultui-full.md`
