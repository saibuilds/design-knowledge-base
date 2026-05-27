# SathiDeals — 3D Component System

**Brand:** SathiDeals / Sai & Sathi Real Estate Team, Toronto  
**Stack:** React, TypeScript, Tailwind CSS, Framer Motion, `@splinetool/react-spline` (lazy)  
**Palette:** Gold `#c9a96e` · Deep Black `#0a0a0a` · White  
**Assets:** `logo-tiger.svg`, `agent-sai.jpg`, `agent-sathi.jpg`, `logo-team.png`

---

## Component Index

| File | Purpose |
|------|---------|
| `TorontoSkylineScene3D.tsx` | Hero skyline canvas + optional Spline wrapper |
| `PropertyCard3D.tsx` | Tilt-3D hover property listing card |
| `NeighbourhoodOrb3D.tsx` | Rotating 3D text sphere, click-to-filter |
| `AgentProfile3D.tsx` | Dual agent cards with particle burst hover |
| `MortgageEstimator3D.tsx` | Live mortgage calculator with animated bar chart |
| `ServiceCatalog3D.tsx` | 6-service grid with animated canvas mini-scenes |
| `LandingPageAssembly.tsx` | Full page assembly of all components |

---

## Component Details

### TorontoSkylineScene3D

Canvas-rendered Toronto skyline silhouette built from ~800 gold particle dots. CN Tower is the prominent centerpiece. Particles drift slowly using per-particle angle oscillation. Mouse movement applies a parallax shift (heavier near horizon). Spline lazy-load supported via `useSpline` prop.

**Props:**
```ts
{
  useSpline?: boolean      // use Spline scene instead of canvas
  particleCount?: number   // default 800
  className?: string
}
```

**Spline URL:** `https://prod.spline.design/SATHI-SKYLINE-placeholder/scene.splinecode`

---

### PropertyCard3D

Premium property listing card with CSS 3D perspective tilt on hover (rotateX/rotateY via Framer Motion spring), animated gold shimmer border, and image zoom.

**Props:**
```ts
{
  address: string
  price: string | number        // auto-formats to CAD currency
  beds: number
  baths: number
  sqft: number
  imageUrl: string
  neighbourhood: string
  tag?: "Featured" | "Sold" | "New" | string
}
```

Tag colors: Featured → gold/black, Sold → red, New → emerald.

---

### NeighbourhoodOrb3D

Canvas-rendered 3D text sphere. Each of the 8 GTA neighbourhood names orbits the sphere surface. Sphere is draggable (mouse drag to rotate), auto-spins when idle. Click a label to emit `onSelect`. Front-facing labels are brighter; back-facing fade. Selected label glows gold.

**Props:**
```ts
{
  onSelect?: (neighbourhood: string | null) => void
  selected?: string | null
  className?: string
}
```

**Neighbourhoods:** Etobicoke, Scarborough, North York, Mississauga, Vaughan, Brampton, Downtown, Midtown.

---

### AgentProfile3D

Two-column (stacked mobile, side-by-side desktop) agent cards for Sai and Sathi. On hover: canvas particle burst erupts from the agent photo area. Stats: listings sold, avg days on market. Neighbourhood tags. "Book a Showing" CTA uses gold shimmer button animation.

**Agent image paths:** `/logos/agent-sai.jpg`, `/logos/agent-sathi.jpg`

**No props required** — data is co-located.

Optional: wrap with prop interface to accept dynamic `agents` array for CMS-driven content.

---

### MortgageEstimator3D

Live mortgage calculator with Canadian rules:

- Semi-annual compounding rate (~5.49% default)
- CMHC insurance auto-applied if down payment < 20% (rates: 4% / 3.1% / 2.8%)
- Animated `framer-motion` width bars: principal vs interest breakdown
- Stacked visual bar with percentage labels

**Inputs:** Purchase price, down payment %, amortization (5–30 yrs, default 25)  
**Outputs:** Monthly payment, total interest, CMHC (if applicable), total cost of borrowing

---

### ServiceCatalog3D

6-card grid. Each card has:
- Animated canvas mini-scene (pattern types: `circle`, `grid`, `wave`, `random`)
- Service name + description
- Gold glow border + radial gradient bg on hover
- "Learn more" animated reveal on hover
- Scroll-triggered entrance animation (Framer `whileInView`)

**Services:** Buy a Home, Sell Your Home, Investment Properties, Pre-Construction, Relocation, Market Analysis

**Spline URLs (placeholder pattern):** `https://prod.spline.design/SATHI-[SERVICE]-placeholder/scene.splinecode`

---

### LandingPageAssembly

Full dark luxury landing page. Structure:

```
TopNav (fixed, logo + nav links + CTA)
  └─ HeroSection
       ├─ TorontoSkylineScene3D (absolute bg)
       ├─ Hero headline + CTAs
       └─ AgentProfile3D (hero bottom strip)
Section: PropertyCard3D grid (filtered by neighbourhood state)
Section: NeighbourhoodOrb3D (drives neighbourhood filter)
Section: MortgageEstimator3D
Section: ServiceCatalog3D
Section: AgentProfile3D (repeat CTA)
Footer
```

The `selectedNeighbourhood` state flows from `NeighbourhoodOrb3D` → filters `LISTINGS` → `PropertyCard3D` grid. Clear filter button resets to all listings.

---

## Installation

```bash
npm install @splinetool/react-spline framer-motion
```

Tailwind must be configured. No additional dependencies required.

---

## Asset Paths

Place in `/public/logos/`:
- `logo-tiger.svg`
- `logo-team.png`
- `agent-sai.jpg`
- `agent-sathi.jpg`

---

## Customization

| Concern | Where |
|---------|-------|
| Listings data | `LISTINGS` array in `LandingPageAssembly.tsx` |
| Agent stats/bio | `AGENTS` array in `AgentProfile3D.tsx` |
| Mortgage rate | `rate` param in `calcMortgage()` in `MortgageEstimator3D.tsx` |
| Particle count | `particleCount` prop on `TorontoSkylineScene3D` |
| Spline scenes | Replace placeholder URLs with real Spline scene codes |
