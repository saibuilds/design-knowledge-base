# GardenSuites4You — 3D Visual Component Reference

> Status: Design Knowledge Base — NOT deployed. Components live in `components/gardensuites4you/`.
> Brand: gardensuites4you.ca — Toronto legal basement + garden suite builder.
> Stack: Next.js App Router · TypeScript · Tailwind CSS · `@splinetool/react-spline` · Canvas 2D API

---

## Brand Tokens

| Token | Value | Usage |
|---|---|---|
| Yellow | `#F5C518` | Primary CTA, glows, accents, hard hat |
| Dark Navy | `#0d1b2a` | Page background, card backgrounds |
| White | `#ffffff` | Body text, headlines |
| Text Muted | `rgba(255,255,255,0.4)` | Subtitles, descriptions |
| Border Subtle | `rgba(255,255,255,0.06)` | Card borders inactive |
| Border Active | `rgba(245,197,24,0.3)` | Card borders on hover |

---

## Installation

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

For animations (used in ROICalculator3D):
```bash
# framer-motion optional — ROICalculator3D uses native requestAnimationFrame for count-up
npm install framer-motion
```

---

## Core Pattern — Lazy Spline + Canvas Fallback

Every 3D scene component follows this pattern:

```tsx
'use client'
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function SceneName({ sceneUrl = DEFAULT_URL }) {
  return (
    <div className="relative w-full h-[520px] overflow-hidden rounded-2xl">
      <Suspense fallback={<CanvasFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
    </div>
  )
}
```

The canvas fallback renders immediately with no external dependencies and matches the visual language of the Spline scene.

---

## Component Files

### 1. `GardenGrowScene3D.tsx`

**Scene concept:** Miniature house grows from dark navy ground with eased cubic animation. Green yard with particle trees that shed leaf particles. Glowing warm yellow windows. Yellow construction hat floats above house with sine-wave bob. Full mouse parallax — all scene layers shift on cursor movement (stars at 0.3x, trees at 0.5x, house at 0.6x, hat at 0.3x).

**Spline scene URL placeholder:** `https://prod.spline.design/GS4Y-GARDEN-GROW-placeholder/scene.splinecode`

**Spline build notes:**
- Object: `HouseBody` — grows on Y scale 0→1 over 2.5s with cubic ease
- Object: `ConstructionHat` — follow path, sine oscillation on Y, yellow material `#F5C518`
- Object: `TreeLeft`, `TreeRight` — scale grow delayed 0.5s after house
- Particle system: `LeafParticles` — emitter at tree canopy, green color palette, slow drift
- Mouse event: parallax offset on all groups via `MouseMove` trigger
- Background: dark navy `#0d1b2a`, star field sprite sheet

**Props:**
```tsx
interface Props {
  sceneUrl?: string  // defaults to placeholder URL
}
```

**Canvas fallback features:** grow animation, stars + moon, parallax on mousemove, particle leaves, construction hat with yellow glow, dual trees with canopy glow.

---

### 2. `BasementCrossSectionScene3D.tsx`

**Scene concept:** Animated cross-section showing underground suite below a house. Soil layers animate in from the top. Yellow insulation layer pulses. Interior suite glows with warm ceiling lights. Window wells visible at grade level. Right-side labels for each layer.

**Spline scene URL placeholder:** `https://prod.spline.design/GS4Y-BASEMENT-SECTION-placeholder/scene.splinecode`

**Spline build notes:**
- Objects: `LayerTopsoil`, `LayerGravel`, `LayerConcrete`, `LayerVapour`, `LayerInsulation` (yellow pulsing material), `LayerSubfloor`, `LayerFloor`
- Object: `BasementInterior` — dark background with warm point lights at ceiling
- Object: `FoundationWalls` — yellow stroke on edges `#F5C518` opacity animated
- Object: `WindowWell_L`, `WindowWell_R` — amber glow material pulsing
- Labels: text objects per layer, right-aligned
- Text: `LegalSuiteBadge` — yellow glow text, sine alpha pulse

**Canvas fallback features:** all 7 layer bands drawn per frame, pulsing yellow insulation + accent lines, animated ceiling glow, living room + bedroom furniture sketches, animated dashed floor indicator line, right-side layer labels.

---

### 3. `ROICalculator3D.tsx`

**Type:** Interactive calculator (NOT a 3D scene). Animated number displays + custom sliders.

**Formulae:**
```ts
const roi     = (monthlyRent * 12 / buildCost * 100).toFixed(1)   // %
const payback = (buildCost / (monthlyRent * 12)).toFixed(1)        // years
const annualIncome   = monthlyRent * 12
const totalReturn10yr = annualIncome * 10
```

**Slider ranges:**
- Build Cost: `$150,000` → `$400,000`, step `$5,000`
- Monthly Rent: `$1,800` → `$3,500`, step `$50`

**AnimatedNumber component:** Uses `requestAnimationFrame` with cubic ease-out over 600ms. Interpolates from previous value to new value on each state change. No framer-motion dependency — pure RAF.

**Layout:** Two-column (lg) — sliders left, metrics right. Large ROI display with animated yellow gradient bar. 4-metric grid: Payback, Annual Income, 10-Year Return (highlighted), Monthly Rent.

---

### 4. `PermitTimeline3D.tsx`

**Type:** Animated vertical timeline. Scroll-triggered per step using `IntersectionObserver`.

**Steps:**
| # | Step | Duration |
|---|---|---|
| 1 | Zoning Check | 1–3 days |
| 2 | Site Plan & Design | 2–4 weeks |
| 3 | Permit Application | 1–2 weeks |
| 4 | City Review | 4–12 weeks |
| 5 | Build & Inspections | 3–6 months |
| 6 | Occupancy Permit | 1–2 weeks |

**Activation behaviour:** Each `StepNode` has its own `IntersectionObserver` (threshold 0.15). When the node enters viewport: dot transitions from `rgba(255,255,255,0.06)` to `#F5C518` with yellow box-shadow glow, card fades in from `translateX(-24px)`, yellow accent underline slides out. Each step staggered by `index * 80ms`.

**Connector line:** Gradient `#F5C518 80% → transparent` when active, fades in with 200ms delay after dot activates.

**Total duration bar:** Summary row at bottom: "6–12 months from consultation to occupancy."

---

### 5. `ServiceCatalog3D.tsx`

**Type:** Responsive service grid with per-card inline SVG fallbacks.

**Services:**
| Service | Starting Price | Scene URL |
|---|---|---|
| Garden Suite | From $180,000 | `GS4Y-GARDEN-SUITE-placeholder` |
| Legal Basement Suite | From $95,000 | `GS4Y-BASEMENT-placeholder` |
| Laneway Suite | From $220,000 | `GS4Y-LANEWAY-placeholder` |
| Garage Conversion | From $130,000 | `GS4Y-GARAGE-placeholder` |

**Card hover behaviour:**
- `translateY(-6px)` with cubic spring easing `(0.34, 1.56, 0.64, 1)`
- Border changes to `#F5C518`
- Box shadow: `0 0 0 1px ${YELLOW}30, 0 8px 40px rgba(245,197,24,0.18)`
- Yellow radial glow overlay fades in at bottom of scene
- Starting price badge: background switches to `#F5C518`, text to navy
- Accent bar width: `25% → 55%`
- CTA button: fills yellow, text navy, glow shadow

**Grid:** 1 col (mobile) → 2 col (sm) → 4 col (xl)

**Inline SVG fallbacks:** `GardenSuiteMini`, `BasementMini`, `LanewayMini`, `GarageMini` — all render instantly, no canvas API, match brand aesthetic.

---

### 6. `LandingPageAssembly.tsx`

**Full page layout. Section order:**

```
<HeroSection>          ← GardenGrowScene3D + headline copy + stats
<ROISection>           ← ROICalculator3D
<PermitSection>        ← PermitTimeline3D
<ServicesSection>      ← ServiceCatalog3D
<Footer>
```

**HeroSection layout:** Full-screen two-column (lg). Left: headline "Your Backyard Builds Wealth.", stats (200+ Suites, 6% ROI, 100% Permits), two CTAs. Right: `GardenGrowScene3D`. Nav with logo (SVG hard hat + wordmark), links, yellow CTA button.

**Brand consistency:**
- All sections use `background: #0d1b2a` or darker variations `#060f1c`, `#040c16`
- `SectionLabel` component reused across all sections — yellow pulse dot + monospace label
- Yellow `#F5C518` used exclusively for CTAs, active states, glows, logo, stats
- White for headlines, `rgba(255,255,255,0.4–0.55)` for body

---

## Spline Scene Concepts Summary

| Scene | Key Objects | Animation Type | Mouse |
|---|---|---|---|
| GardenGrow | HouseBody, Hat, Trees, Leaves | Scale grow + sine bob + particles | Parallax all layers |
| BasementSection | 7 layer bands, interior room | Pulse opacity on insulation, glow lights | None (static cross-section) |

---

## Usage Example

```tsx
// Full landing page
import { LandingPageAssembly } from '@/components/gardensuites4you/LandingPageAssembly'

export default function HomePage() {
  return <LandingPageAssembly />
}
```

```tsx
// Individual components
import { GardenGrowScene3D } from '@/components/gardensuites4you/GardenGrowScene3D'
import { ROICalculator3D } from '@/components/gardensuites4you/ROICalculator3D'
import { PermitTimeline3D } from '@/components/gardensuites4you/PermitTimeline3D'
import { ServiceCatalog3D } from '@/components/gardensuites4you/ServiceCatalog3D'
import { BasementCrossSectionScene3D } from '@/components/gardensuites4you/BasementCrossSectionScene3D'
```

---

## File Index

```
components/gardensuites4you/
├── GardenGrowScene3D.tsx           ← Hero 3D scene, Spline + canvas, mouse parallax
├── BasementCrossSectionScene3D.tsx ← Cross-section diagram, animated canvas layers
├── ROICalculator3D.tsx             ← Interactive calculator, RAF count-up, sliders
├── PermitTimeline3D.tsx            ← Scroll-triggered timeline, IntersectionObserver
├── ServiceCatalog3D.tsx            ← 4-service grid, hover glow cards, inline SVG fallbacks
└── LandingPageAssembly.tsx         ← Full page composition
```
