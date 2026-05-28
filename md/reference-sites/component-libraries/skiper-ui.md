# Skiper UI — Component Reference

> Source: https://ui.skiper.dev
> Style: Modern, animated, dark-first components for Next.js + Tailwind
> Use for: Hero sections, feature grids, bento layouts, animated cards

---

## What It Is
Skiper UI is a free collection of copy-paste React/Tailwind components with heavy animation focus. Components use Framer Motion and CSS animations. Great for landing pages.

## Key Component Categories
- **Hero sections** — gradient mesh, noise texture, animated blobs
- **Bento grids** — asymmetric feature layouts popular in SaaS
- **Cards** — glowing borders, spotlight hover, tilt effects
- **Buttons** — shimmer, magnetic, gradient stroke
- **Backgrounds** — animated gradient, particle field, grid patterns
- **Text effects** — typewriter, scramble, word-by-word reveal

## How to Browse
1. Go to https://ui.skiper.dev
2. Each component has a live preview + "Copy Code" button
3. Code is React + Tailwind — drop into any Next.js project

## Brand Applications

### DJ Custom Reno (amber/black)
- Bento grid for services (kitchen, bathroom, epoxy, garden suite)
- Animated counter for "500+ kitchens renovated"
- Glowing card for cabinet spray finishing CTA

### Motta Kitchen (brass/warm white)
- Noise texture hero background
- Spotlight card for product collections
- Elegant border beam on quote CTA

### SathiDeals (gold/black)
- Toronto neighbourhood bento grid
- Stat counters for listings sold / average sale price
- Magnetic CTA button for "Book a Showing"

### GardenSuites4You (yellow/navy)
- Feature grid for permit steps
- Animated ROI calculator card
- Progress indicator for build timeline

---

## Installation
```bash
# No package — copy-paste components
# Requirements:
npm install framer-motion
npm install tailwindcss
npm install clsx tailwind-merge
```

## Key Tailwind Config Additions
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        shimmer: { '0%, 100%': { 'background-position': '0% 50%' }, '50%': { 'background-position': '100% 50%' } },
      }
    }
  }
}
```

---

## Scraper
Run: `node scripts/scrape-skiper-live.mjs`
Output: `md/components/skiper-full.md`
