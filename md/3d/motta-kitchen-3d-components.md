# Motta Kitchen — 3D Component Documentation

**Brand:** mottakitchen.ca · Toronto Luxury Custom Kitchens  
**Brand tokens:** Brass `#8b6914` · Warm White `#fafaf8` · Charcoal `#2C2C2C`  
**Typography:** Cormorant Garamond (300, 400, italic)  
**Motion library:** framer-motion  
**3D runtime:** `@splinetool/react-spline` (lazy-loaded)  
**Style system:** Tailwind CSS

---

## Component Index

| File | Scene concept | Spline scene key |
|------|--------------|-----------------|
| `KitchenIslandScene3D.tsx` | Floating island, top-down rotation, brass handle shimmer | `MOTTA-ISLAND` |
| `MaterialSelectorScene3D.tsx` | Interactive material carousel, 6 swatches | — (CSS only) |
| `CollectionGrid3D.tsx` | 4-card collection grid with reveal on hover | — |
| `BeforeAfterKitchen3D.tsx` | Spring-physics drag slider for before/after photography | — |
| `ConsultationBooking3D.tsx` | 2-step booking widget with webhook POST | — |
| `ServiceCatalog3D.tsx` | Service grid with per-card canvas scene | `MOTTA-SERVICES` |
| `LandingPageAssembly.tsx` | Full page compositor — imports all above | — |

---

## KitchenIslandScene3D

### Scene concept
A kitchen island rendered from a top-down perspective floats in a dark void. It rotates slowly (≈0.15 rad/s) around its vertical axis. Brass handles on both long sides shimmer with a golden glint keyed to a sine-wave time function. The countertop is Calacatta-simulated via layered linear gradients with animated bezier veins.

Mouse parallax shifts the canvas `perspectiveOrigin` ±5% on each axis, giving a convincing 3D tilt without WebGL.

### Spline build notes (MOTTA-ISLAND scene)
- Model: low-poly kitchen island (~1,200 faces), UV-unwrapped for Spline's material system
- Materials: Marble (Spline standard PBR, roughness 0.15, metalness 0), Brass handles (metalness 1.0, roughness 0.35, color `#8b6914`)
- Animation: `Auto-rotate` event on `scene start` → Y-axis, 25°/s
- Interaction: Mouse `Move` → camera orbit constraint ±12° X, ±18° Y
- Lighting: one warm area light (3200K) from top-left, one fill from bottom-right at 20% intensity
- Export: scene URL → replace placeholder `https://prod.spline.design/MOTTA-ISLAND-placeholder/scene.splinecode`

### Props
```tsx
<KitchenIslandScene3D
  useSpline={false}       // true to attempt Spline load; canvas fallback on error
  className="h-screen"
>
  {/* Optional overlay content */}
</KitchenIslandScene3D>
```

### Canvas fallback behavior
- `useSpline={false}` (default): pure canvas, always renders
- `useSpline={true}`: lazy-loads Spline; on error (`onError`) falls back to canvas automatically
- Canvas re-renders via `requestAnimationFrame` — no React re-render loop

---

## MaterialSelectorScene3D

### Scene concept
A two-column layout: left = large material panel (CSS gradient simulation of actual material), right = 6 circular swatches in a 3×2 grid. Clicking a swatch animates the panel in with `AnimatePresence` (fade + slight scale). Selected swatch receives an animated brass glow ring (`box-shadow` framer-motion animation).

### Materials
| ID | Label | Simulation technique |
|----|-------|---------------------|
| `calacatta` | Calacatta Marble | Multi-stop linear gradient + SVG bezier veins |
| `brass` | Brushed Brass | Angled gold gradient, shimmer highlight |
| `oak` | Smoked Oak | Warm brown gradient + vein overlay |
| `anthracite` | Matte Anthracite | Near-black gradient, zero specularity |
| `limestone` | Honed Limestone | Cool grey gradient + fossil SVG lines |
| `lacquered-white` | Lacquered White | Off-white gradient, warm tones |

### Props
```tsx
<MaterialSelectorScene3D
  defaultSelected="calacatta"
  onMaterialSelect={(id) => console.log(id)}
/>
```

### Spline notes
No Spline scene — purely CSS/SVG texture simulation. If a full 3D material preview is desired, create a Spline scene `MOTTA-MATERIALS` with a flat plane, swap material on variable change, and pass the scene URL as a prop.

---

## CollectionGrid3D

### Scene concept
A 4-column (responsive) grid. Each card has:
- Full-bleed image slot (placeholder gradient; swap `background` for `<img>` when photography is ready)
- Top-right collection tag badge
- Bottom content: animated brass accent rule that expands on hover, collection name in Cormorant Garamond
- Hover reveal: descriptor paragraph + "Explore →" CTA slides up via `AnimatePresence height` animation
- Card lifts `y: -6px` with brass shimmer border on hover

### Collections
| ID | Name | Tag |
|----|------|-----|
| `modernist` | Modernist | Signature Line |
| `atherton` | Atherton | Premium Collection |
| `bespoke` | Bespoke | Fully Custom |
| `blanc` | Blanc | Flagship Edition |

### Connecting real photography
Replace the `placeholderGradient` background in each collection entry with an `<img>` tag or a CSS `background-image` pointing to your CDN URL.

### Props
```tsx
<CollectionGrid3D className="my-section-class" />
```

---

## BeforeAfterKitchen3D

### Scene concept
A horizontal split slider for kitchen photography comparison. The "After" layer is clipped by a `motion.div` whose width is driven by a framer-motion `useSpring` value — giving spring-physics resistance on drag. A brass circle handle (radial gradient, `PVD` shimmer) sits on the divider line with left/right SVG arrows.

### Physics config
```ts
const springConfig = { stiffness: 260, damping: 28, mass: 0.8 }
```
Increase `stiffness` for snappier response; increase `damping` to reduce bounce.

### Touch support
Both `touchmove` (passive) and `mousemove` are handled via global `window` listeners attached on mount. The `isDragging` ref gates updates to prevent accidental drags on scroll.

### Props
```tsx
<BeforeAfterKitchen3D
  beforeImageUrl="/photos/kitchen-before.jpg"
  afterImageUrl="/photos/kitchen-after-motta.jpg"
  beforeLabel="Before"
  afterLabel="After Motta"
  initialPosition={42}   // 0–100 percentage
/>
```

### Placeholder mode
When `beforeImageUrl` / `afterImageUrl` are omitted, SVG cabinet silhouettes render as atmospheric placeholders suitable for wireframe presentations.

---

## ConsultationBooking3D

### Scene concept
A card-based 2-step booking flow:
1. **Project type** — 4 hover cards with icon, label, description. `motion.div layoutId` animates a brass dot to the selected card.
2. **Contact form** — name, phone, email, preferred contact time (select), project notes (textarea). All inputs use inline `onFocus`/`onBlur` to shift border to brass on focus.

Step transitions use `AnimatePresence` with directional x-slide.

### Form submission
On submit, POSTs `{ projectType, name, phone, email, preferredTime, notes }` as JSON to `webhookUrl`. If `webhookUrl` is undefined (dev mode), a 900ms timeout simulates the request.

Success state shows a confirmation card. Error state shows an inline message.

### Props
```tsx
<ConsultationBooking3D
  webhookUrl="https://hooks.zapier.com/hooks/catch/XXXXXXX/YYYYYYY/"
/>
```

### CMS / backend integration
The `webhookUrl` can point to:
- Zapier catch hook → Slack/email notification
- Make (Integromat) webhook → CRM entry
- Next.js API route → database write + email via Resend/Sendgrid
- Formspree / Netlify Forms endpoint

---

## ServiceCatalog3D

### Scene concept
A 4-column responsive grid. Each card contains:
- **Canvas mini-scene**: a geometric shape unique to each service (rectangle for kitchens, concentric circles for cabinet spraying, diamond for vanities, plus for commercial) rotates slowly. Shape stroke color, shadow blur, and accent rule animate based on hover state passed down as `active` prop.
- **Brass accent rule** that expands width on hover (framer-motion `animate={{ width }}`)
- Serif heading, description, feature bullets, "Inquire" CTA

### Canvas shapes per service
| Service | Shape | Accent color |
|---------|-------|-------------|
| Custom Kitchens | Cabinet rectangle + divider | `#8b6914` (brass) |
| Cabinet Spraying | Concentric circles | `#c9a040` (gold) |
| Bathroom Vanities | Diamond | `#8b9aa8` (steel blue) |
| Commercial Fitouts | Plus / cross | `#6b8b50` (sage) |

### Spline notes (optional MOTTA-SERVICES scene)
Build a scene with 4 labeled groups, each containing the equivalent 3D mesh. Use a Spline variable to toggle active group. Lazy-load only when user reaches the section (use an IntersectionObserver wrapper).

### Props
```tsx
<ServiceCatalog3D className="my-class" />
```

---

## LandingPageAssembly

### Page structure
```
<Nav />                          fixed, blur backdrop
<HeroSection>                    100svh, KitchenIslandScene3D as bg
  headline: "Crafted for How You Live"
  CTA: "Begin Your Project" → #consultation
</HeroSection>
<CollectionGrid3D />             id="collections"
<Divider />
<MaterialsIntro />               centered heading
<MaterialSelectorScene3D />
<Divider />
<TransformationSection>          id="transformation"
  heading + BeforeAfterKitchen3D
</TransformationSection>
<Divider />
<ConsultationBooking3D />        id="consultation"
<Footer />
```

### Scroll animation
Hero headline uses `useScroll` + `useTransform` to translate upward and fade as the user scrolls past, creating a parallax depth effect without JavaScript-heavy scroll listeners.

### Font loading
The assembly injects an inline `<style>` tag with `@import url(...)` for Cormorant Garamond. In production, move this import to your Next.js `layout.tsx` `<head>` or use `next/font/google`:

```tsx
// app/layout.tsx
import { Cormorant_Garamond } from 'next/font/google'
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
```

### Props
```tsx
<LandingPageAssembly
  consultationWebhookUrl="https://hooks.zapier.com/..."
/>
```

---

## Spline URL reference

All placeholder URLs follow the pattern:
```
https://prod.spline.design/MOTTA-[NAME]-placeholder/scene.splinecode
```

| Component | Placeholder URL segment | Replace with |
|-----------|------------------------|-------------|
| KitchenIslandScene3D | `MOTTA-ISLAND-placeholder` | Published Spline scene URL |
| ServiceCatalog3D (optional) | `MOTTA-SERVICES-placeholder` | Published Spline scene URL |

Spline scenes are lazy-loaded via React `Suspense`. The canvas fallback renders immediately while the Spline bundle (≈900KB gzipped) loads asynchronously.

---

## Dependency requirements

```json
{
  "@splinetool/react-spline": "^2.2.6",
  "framer-motion": "^11.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.4.0"
}
```

All components are `'use client'` — compatible with Next.js App Router. No server-side data dependencies.

---

## Accessibility notes

- `BeforeAfterKitchen3D` handle is a `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `CollectionCard` uses `role="article"` with `aria-label`
- `MaterialSwatch` uses `aria-pressed` on button
- All canvas elements have `aria-label` or `aria-hidden="true"` as appropriate
- Navigation has `aria-label="Main navigation"`
- Color contrast: all body text against dark backgrounds meets WCAG AA at body sizes
