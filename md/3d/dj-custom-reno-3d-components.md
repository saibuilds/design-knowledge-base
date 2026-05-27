# DJ Custom Reno — 3D Visual Asset Reference

> Status: Design Knowledge Base — NOT deployed. Components live in `components/dj-custom-reno/`.
> Stack: Next.js App Router · TypeScript · Tailwind CSS · `@splinetool/react-spline`

---

## Brand Tokens

| Token | Value |
|---|---|
| Primary Amber | `#f59e0b` |
| Background | `#0a0a0a` |
| Text | `#ffffff` |
| Text Muted | `rgba(255,255,255,0.4)` |
| Border Subtle | `rgba(255,255,255,0.06)` |

---

## Installation

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

---

## Core Pattern — Lazy-Loaded Spline with Fallback

Every component in this system follows this pattern:

```tsx
'use client'
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function ServiceScene3D({ sceneUrl, fallbackColor }: { sceneUrl: string; fallbackColor: string }) {
  return (
    <div className="relative w-full h-[500px]">
      <Suspense fallback={<div className="w-full h-full animate-pulse" style={{ background: fallbackColor }} />}>
        <Spline scene={sceneUrl} />
      </Suspense>
    </div>
  )
}
```

Key rules:
- All Spline components are `'use client'` — App Router requires this
- Use `lazy()` + `Suspense` so Spline's ~500kb bundle is code-split
- Every component ships a **canvas/SVG fallback** that runs without Spline loaded — this is what users see during lazy load and in environments where Spline fails
- Scene URLs follow format: `https://prod.spline.design/[UUID]/scene.splinecode`

---

## Service 1 — Kitchen Renovation

**File:** `components/dj-custom-reno/KitchenScene3D.tsx`

### Spline Scene Concept

- **Object:** Floating kitchen island counter, centered in scene
- **Animation:** Slow Y-axis rotation (1 RPM), cabinet doors open/close on pointer hover using Spline events
- **Materials:** Copper/brass countertop surface with PBR metallic material (roughness 0.2, metalness 0.85), dark walnut cabinet body
- **Lighting:** One warm key light above (3000K), rim light behind island for separation, no ambient — pure dark background
- **Background:** `#0a0a0a` — pure near-black
- **Camera:** Slight top-down isometric angle, focal length ~50mm equivalent
- **Interaction:** Spline `onLoad` callback fires `startRotation` event; `onMouseEnter` on cabinet doors fires `openDoor` state

### Spline Events to Build

```
Event: pointerEnter → Cabinet Door Object → Play "openDoor" animation (ease: spring)
Event: pointerLeave → Cabinet Door Object → Play "closeDoor" animation
Event: scene load → Island → Play "floatIdle" animation (loop, sine wave Y offset ±5px)
```

### Fallback

SVG illustration of the counter cross-section with copper line accents and a warm glow ellipse beneath. See component for full SVG.

### Landing Page Usage

```tsx
import { KitchenScene3D } from '@/components/dj-custom-reno/KitchenScene3D'

// In a service section:
<section className="grid md:grid-cols-2 gap-12 items-center py-24 px-8 bg-[#0a0a0a]">
  <div>
    <h2 className="text-white text-4xl font-bold mb-4">Kitchen Renovation</h2>
    <p className="text-white/50">Custom kitchens built to last...</p>
    <a href="/contact" className="mt-6 inline-block px-6 py-3 bg-amber-500 text-black rounded-lg font-semibold">
      Get a Quote
    </a>
  </div>
  <KitchenScene3D />
</section>
```

---

## Service 2 — Cabinet Spray Finishing

**File:** `components/dj-custom-reno/CabinetSprayScene3D.tsx`

### Spline Scene Concept

- **Object:** Abstract particle field — 200–400 small sphere particles arranged off-screen at edges
- **Animation:** On scroll enter, particles fly inward converging to form the outline of a cabinet door panel (rectangle with inset frame). Hold 1.5s. Then material transition: cabinet surface shifts from raw wood brown (`#8b4513`) to gloss lacquer white (`#f8f8f8`) with a metallic sheen sweep from left to right
- **Materials:** Particle material starts as matte brown, transitions to chrome/gloss white. Cabinet panel uses a custom gradient material in Spline
- **Lighting:** Studio setup — soft box from upper left, small fill light right, no hard shadows
- **Background:** `#0a0a0a`
- **Scroll trigger:** Use Intersection Observer in wrapper to send `startConverge` Spline event

### Scroll Trigger Wrapper

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { CabinetSprayScene3D } from '@/components/dj-custom-reno/CabinetSprayScene3D'

export function CabinetSectionScrolled() {
  const ref = useRef<HTMLDivElement>(null)
  const splineRef = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && splineRef.current) {
          splineRef.current.emitEvent('mouseDown', 'TriggerNode')
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <CabinetSprayScene3D />
    </div>
  )
}
```

### Fallback

Canvas animation: particles spawn from all four canvas edges and fly toward the center, converging to trace a cabinet door outline. Color transitions from `rgb(139,69,19)` → white as each particle settles. Metallic sheen added as `rgba(255,255,255,x)` overlay on settled particles. Loop resets individual particle progress randomly.

### Landing Page Usage

```tsx
<section className="py-24 px-8 bg-[#0a0a0a] text-center">
  <h2 className="text-white text-4xl font-bold mb-4">Cabinet Spray Finishing</h2>
  <p className="text-white/50 max-w-xl mx-auto mb-12">
    Lacquer, water-based, and stain finishes. Factory quality. Applied on-site.
  </p>
  <CabinetSprayScene3D />
  <div className="mt-8 flex gap-4 justify-center">
    {['Lacquer', 'Water-Based', 'Stain'].map(f => (
      <span key={f} className="px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-sm">{f}</span>
    ))}
  </div>
</section>
```

---

## Service 3 — Bathroom Renovation

**File:** `components/dj-custom-reno/BathroomScene3D.tsx`

### Spline Scene Concept

- **Object:** Grid of 3D square tiles (4×6 grid visible), each tile ~1 unit × 0.15 unit depth
- **Animation:** Tiles fly in from random off-screen positions and Z-depths. Each tile has individual start position (edge-scattered), flies to final grid position with a staggered delay based on `(col + row) * 80ms`. Final settle uses spring easing (overshoot ~5%)
- **Materials:** Main tiles — warm white/cream ceramic (roughness 0.15, metalness 0). Accent tiles (every 5th) — warm terracotta. Grout lines modeled as slight recessed gaps
- **Frosted glass panel:** After tiles settle, a vertical frosted glass rectangle slides in from right (shower panel). Glass material: transmission 0.9, roughness 0.3, IOR 1.45, thin film
- **Lighting:** Warm overhead (2700K, soft). Point light behind frosted glass for backlit glow
- **Background:** `#120c08` — very dark warm brown

### Tile Stagger Formula (Spline Timeline)

Each tile gets: `delay = (col + row) * 80ms`, `duration = 600ms`, `easing = spring(mass:1, stiffness:200, damping:20)`

### Fallback

Canvas animation matching the concept exactly: tiles start at edge-scattered positions and fly to a grid layout. Color transitions from transparent → opaque as they settle. Frosted glass overlay appears on right 32% of canvas after tiles land.

### Landing Page Usage

```tsx
<section className="min-h-screen flex items-center bg-[#120c08] px-8 py-24">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <BathroomScene3D />
    <div>
      <h2 className="text-white text-4xl font-bold mb-6">Bathroom Renovation</h2>
      <ul className="space-y-3 text-white/50">
        {['Custom tile work', 'Walk-in shower design', 'Heated floors', 'Vanity & fixture install'].map(i => (
          <li key={i} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {i}
          </li>
        ))}
      </ul>
      <a href="/contact" className="mt-8 inline-block px-6 py-3 bg-amber-500 text-black rounded-lg font-semibold">
        View Gallery
      </a>
    </div>
  </div>
</section>
```

---

## Service 4 — Basement Finishing / Legal Suite

**File:** `components/dj-custom-reno/BasementScene3D.tsx`

### Spline Scene Concept

- **Object:** Vertical cross-section cut through a residential lot, like a dollhouse side view
- **Layers visible (top to bottom):**
  1. Grass/surface with small house above grade
  2. Topsoil band (dark brown, `#3d2b1f`)
  3. Compacted gravel (grey, `#555`)
  4. Concrete slab (medium grey, `#6b7280`)
  5. Vapour barrier (thin blue line, `#1d4ed8`)
  6. Insulation (amber/gold, `#fbbf24`)
  7. Subfloor + finished floor (wood tone)
  8. Basement interior: two rooms (living + bedroom), warm amber light glowing through small windows
- **Animation:** Camera starts above ground, slowly pulls back and down to reveal the underground level. Window wells glow. Interior lights flicker on one by one
- **Materials:** Each layer has distinct material. Interior walls use emissive material for warmth
- **Background:** `#0a0a0a`

### Spline Camera Animation

```
Keyframe 0ms:   camera pos Y: +200, fov: 35 (looking at house above)
Keyframe 2000ms: camera pos Y: -80, fov: 50 (underground level revealed)
Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
```

### Fallback

SVG illustration of the cross-section with all labeled layers. Warm glow effects via SVG radial gradients on window rects and light fixtures. Grass texture via short `<line>` elements. See component for full SVG code (~120 lines).

### Landing Page Usage

```tsx
<section className="bg-[#0a0a0a] py-24 px-8">
  <div className="max-w-6xl mx-auto">
    <div className="mb-12">
      <h2 className="text-white text-4xl font-bold">Basement & Legal Suite</h2>
      <p className="text-white/40 mt-3 max-w-lg">Turn unused square footage into legal rental income or family living space.</p>
    </div>
    <BasementScene3D />
    <div className="mt-8 grid md:grid-cols-3 gap-4">
      {['Legal suite permits', 'Full insulation & vapor barrier', 'Egress windows'].map(f => (
        <div key={f} className="p-4 rounded-xl border border-white/6 bg-white/2 text-white/50 text-sm">{f}</div>
      ))}
    </div>
  </div>
</section>
```

---

## Service 5 — Garden Suite / ADU

**File:** `components/dj-custom-reno/GardenSuiteScene3D.tsx`

### Spline Scene Concept

- **Object:** Miniature backyard scene — green lawn plane, small 1–2 story modular house centered, 2 trees flanking
- **Grow animation (scroll-triggered):**
  1. Scene starts as bare ground plane
  2. House rises from below ground level (Y: -100 → 0), 1.2s spring
  3. Trees sprout from ground, branches expand outward, 0.8s delay each
  4. Leaves spawn as a particle system — 300 leaf quads attached to tree branches, constant gentle sway
  5. Interior windows glow amber when house is fully revealed
  6. Chimney smoke particle system starts (soft grey puffs rising, fading)
- **Particle systems:**
  - Leaves: 300 particles, random rotation, green spectrum, constant sinusoidal sway
  - Smoke: 20 particles, spawn at chimney top, rise + expand, fade out, loop
- **Lighting:** Soft neutral ambient (sky light), warm point light inside house spilling through windows, subtle HDRI
- **Background:** Deep dark green `#050f05` fading to near-black at top (night sky with stars)
- **Camera:** Fixed slight birds-eye angle, tilted ~30° from horizontal

### Spline Particle Setup

```
Leaf Particle System:
  - Count: 300
  - Emitter: sphere, radius 20, attached to TreeGroup
  - Lifetime: 8–12s
  - Color: random from [#166534, #15803d, #22c55e, #4ade80]
  - Rotation: random initial, constant slow spin on all axes
  - Gravity: -0.02 (slight float)
  - Wind: sine wave X: amplitude 0.5, period 4s

Smoke Particle System:
  - Count: 20
  - Emitter: point at chimney top
  - Lifetime: 3–5s
  - Start size: 2, End size: 15
  - Opacity: 0.3 → 0
  - Color: #646464
  - Velocity: Y: 0.8, X: 0.1 (light drift)
```

### Fallback

Full canvas animation that implements the grow sequence in 2D: ground → house rises → trees grow → leaf particles spawn from tree crowns with physics (gravity + sway). Stars in sky. Walking path down center. Chimney smoke puffs. See component (~200 lines).

### Landing Page Usage

```tsx
<section className="bg-[#050f05] py-24 px-8 overflow-hidden">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <span className="text-green-500 text-xs font-mono tracking-widest uppercase mb-4 block">
        Detached ADU
      </span>
      <h2 className="text-white text-4xl font-bold mb-6">Garden Suite</h2>
      <p className="text-white/40 leading-relaxed mb-8">
        Freestanding suites designed for Vancouver, Burnaby, and Surrey lots. 
        Maximize your property value with a permitted ADU.
      </p>
      <a href="/contact" className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors">
        Start Planning
      </a>
    </div>
    <GardenSuiteScene3D />
  </div>
</section>
```

---

## Service 6 — Epoxy Flooring

**File:** `components/dj-custom-reno/EpoxyScene3D.tsx`

### Spline Scene Concept

- **Object:** Large flat plane (floor surface) filling the view, very slight perspective tilt
- **Material:** Custom metallic liquid shader on the plane surface:
  - Base: near-black (`#080808`)
  - Swirling metallic veins: gold (`#d4af37`), silver (`#c0c0c0`), bright white highlights
  - Material animates: veins shift slowly as if liquid is still moving (loop, ~20s cycle)
  - High specular highlight (roughness ~0.05, metalness 1.0) — extreme gloss
  - Environment map: studio HDRI for realistic reflections
- **Mouse interaction:** Spline `onMouseMove` event creates a 3D ripple distortion in the floor material at cursor position. Ripple ring expands outward, fades over 1.2s
- **Lighting:** Single overhead area light, positioned to create maximum reflection band across surface
- **Camera:** Low angle looking across the floor surface (near horizontal), so the reflections are dramatic
- **Background:** `#080808`

### Spline Mouse Ripple Setup

```
On: pointerMove → FloorPlane
  Action: Set material property "rippleCenter" to [event.point.x, event.point.z]
  Action: Set material property "rippleProgress" to 0
  Action: Animate "rippleProgress": 0 → 1 over 1200ms, easing: ease-out
  
Shader uniform "rippleProgress" drives:
  - Ring radius: 0 → 80 units
  - Ring opacity: 0.6 → 0
  - Ring width: 4 → 1 unit
```

### Fallback

Interactive canvas: swirling metallic wave pattern built with sine functions layered at different frequencies. Gold + silver color palette. Mouse position warps the swirl center. `mousemove` + `click` events spawn 3D-look ripple rings (expanding circles, gold fade). Cursor becomes crosshair. See component for full implementation.

### Landing Page Usage

```tsx
<section className="bg-[#080808] py-24 px-8">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-white text-4xl font-bold">Epoxy Flooring</h2>
    <p className="text-white/40 mt-3">Metallic. Commercial. Residential. Built to last decades.</p>
  </div>
  <EpoxyScene3D />
  <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    {['Garages', 'Warehouses', 'Retail Spaces', 'Basements'].map(t => (
      <div key={t} className="p-5 rounded-xl border border-amber-500/10 bg-amber-500/5 text-white/60 text-sm text-center">
        {t}
      </div>
    ))}
  </div>
</section>
```

---

## ServiceCatalog3D — Full Grid Component

**File:** `components/dj-custom-reno/ServiceCatalog3D.tsx`

This is the primary composite component. It imports all 6 service scenes and renders them in a responsive 3-column grid with hover states, per-service accent colors, and a global CTA footer.

### Props

None — fully self-contained. All service configs are defined internally via `SERVICES` array.

### Features

- `onMouseEnter` → card lifts (`translateY(-4px)`), border glows with service accent color, box shadow activates
- CTA button color matches service accent on hover
- Accent underline bar expands from 30% → 60% on hover
- All 3D scenes are lazy-loaded (each scene's bundle loads independently)
- Responsive: 1 col mobile → 2 col tablet → 3 col desktop

### Usage

```tsx
// app/services/page.tsx
import { ServiceCatalog3D } from '@/components/dj-custom-reno/ServiceCatalog3D'

export default function ServicesPage() {
  return <ServiceCatalog3D />
}
```

### Accent Color Map

| Service | Accent |
|---|---|
| Kitchen Renovation | `#f59e0b` amber |
| Cabinet Spray | `#e5e7eb` cool white |
| Bathroom | `#7dd3fc` sky blue |
| Basement/Legal Suite | `#6ee7b7` teal |
| Garden Suite | `#4ade80` green |
| Epoxy Flooring | `#fbbf24` gold |

---

## Scene URL Placeholder Convention

All placeholder URLs follow:
```
https://prod.spline.design/[SERVICE-DESCRIPTOR-UUID]/scene.splinecode
```

Replace with real Spline scene URLs after building scenes in Spline editor. Each component accepts an optional `sceneUrl` prop to override the default:

```tsx
<KitchenScene3D sceneUrl="https://prod.spline.design/REAL-UUID-HERE/scene.splinecode" />
```

---

## Performance Notes

- Each `Spline` import is code-split via `lazy()` — the ~500kb Spline runtime only loads when the component enters the viewport
- Combine with Intersection Observer for true on-demand loading:

```tsx
'use client'
import { useInView } from 'react-intersection-observer' // or native IntersectionObserver

export function LazyKitchenSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref}>
      {inView && <KitchenScene3D />}
    </div>
  )
}
```

- Fallbacks are pure canvas/SVG — zero external dependencies, render instantly
- Canvas fallbacks use `requestAnimationFrame` and clean up via return value of `useEffect`
- All canvas animations respect reduced motion (TODO: add `prefers-reduced-motion` check to pause animation loops)

---

## Reduced Motion TODO

```tsx
// Add to each canvas-animated fallback:
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) {
  // Draw single static frame, skip animation loop
  drawStaticFrame(ctx, W, H)
  return
}
```

---

## File Index

```
components/dj-custom-reno/
├── KitchenScene3D.tsx          — Rotating island, copper material, SVG fallback
├── CabinetSprayScene3D.tsx     — Particle convergence, canvas fallback  
├── BathroomScene3D.tsx         — Tile assembly animation, canvas fallback
├── BasementScene3D.tsx         — Cross-section SVG, warm suite glow
├── GardenSuiteScene3D.tsx      — House grow + leaf particles, full canvas fallback
├── EpoxyScene3D.tsx            — Metallic swirl + mouse ripple, canvas fallback
└── ServiceCatalog3D.tsx        — Grid catalog, imports all above
```
