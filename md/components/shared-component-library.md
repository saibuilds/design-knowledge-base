# Shared Component Library

Reusable production-ready components for 4 client brands:

| Brand | Variant | Accent |
|---|---|---|
| DJ Custom Reno | `amber` | `#f59e0b` / amber-600 |
| SathiDeals Real Estate | `gold` | `#c9a96e` / yellow-700 |
| GardenSuites4You | `yellow` | `#F5C518` / yellow-400 |
| Motta Kitchen | `white` | `#ffffff` / white |

All components are in `components/shared/`. Import from the barrel:

```ts
import { ShimmerButton, FloatingNav, CountUpStat, ... } from '@/components/shared'
```

---

## 1. ShimmerButton

Animated shimmer-sweep CTA button. Renders as `<button>` or Next.js `<Link>`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Button label/content |
| `variant` | `'amber' \| 'gold' \| 'yellow' \| 'white'` | `'amber'` | Brand color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding/font size |
| `href` | `string` | — | Renders as `<Link>` when provided |
| `onClick` | `() => void` | — | Click handler (button mode) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disables interaction |
| `className` | `string` | `''` | Extra Tailwind classes |

### Usage Examples

**DJ Custom Reno (amber)**
```tsx
<ShimmerButton variant="amber" size="lg" href="/contact">
  Get a Free Quote
</ShimmerButton>
```

**SathiDeals (gold)**
```tsx
<ShimmerButton variant="gold" href="/listings">
  Browse Listings
</ShimmerButton>
```

**GardenSuites4You (yellow)**
```tsx
<ShimmerButton variant="yellow" size="lg" href="/get-started">
  Start Your Suite
</ShimmerButton>
```

**Motta Kitchen (white)**
```tsx
<ShimmerButton variant="white" href="/book">
  Book a Consultation
</ShimmerButton>
```

---

## 2. MagneticButton

Wraps any child element with a magnetic pull effect — the element translates toward the cursor on proximity.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to magnetize |
| `strength` | `number` | `0.3` | Pull multiplier (0.1 subtle → 0.6 strong) |
| `className` | `string` | `''` | Extra classes |
| `onClick` | `() => void` | — | Click handler |

### Usage Examples

**DJ Custom Reno**
```tsx
<MagneticButton strength={0.35}>
  <ShimmerButton variant="amber">Call Now</ShimmerButton>
</MagneticButton>
```

**SathiDeals**
```tsx
<MagneticButton strength={0.25}>
  <ShimmerButton variant="gold">Schedule Viewing</ShimmerButton>
</MagneticButton>
```

**GardenSuites4You**
```tsx
<MagneticButton>
  <ShimmerButton variant="yellow">Get ROI Estimate</ShimmerButton>
</MagneticButton>
```

**Motta Kitchen**
```tsx
<MagneticButton strength={0.2}>
  <ShimmerButton variant="white">View Portfolio</ShimmerButton>
</MagneticButton>
```

---

## 3. SpotlightCard

Card wrapper with a radial gradient spotlight that follows the cursor.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Card content |
| `spotlightColor` | `string` | `'rgba(255,180,0,0.15)'` | CSS color for spotlight |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno (orange spotlight)**
```tsx
<SpotlightCard spotlightColor="rgba(249,115,22,0.15)" className="bg-gray-900 p-8 rounded-2xl">
  <h3 className="text-white text-xl font-bold">Kitchen Reno</h3>
</SpotlightCard>
```

**SathiDeals (gold spotlight)**
```tsx
<SpotlightCard spotlightColor="rgba(201,169,110,0.18)" className="bg-yellow-950 p-6 rounded-2xl">
  <PropertyCard />
</SpotlightCard>
```

**GardenSuites4You (yellow spotlight)**
```tsx
<SpotlightCard spotlightColor="rgba(245,197,24,0.2)" className="bg-white border p-6 rounded-2xl">
  <SuiteFeature />
</SpotlightCard>
```

**Motta Kitchen (neutral spotlight)**
```tsx
<SpotlightCard spotlightColor="rgba(180,180,180,0.12)" className="bg-stone-50 p-8 rounded-2xl border">
  <ProductCard />
</SpotlightCard>
```

---

## 4. BorderBeam

Animated luminous beam that travels around the card border using SVG `animateMotion`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Card content |
| `color` | `string` | `'#f59e0b'` | Beam color |
| `duration` | `number` | `4` | Seconds per revolution |
| `borderWidth` | `number` | `2` | Border stroke width (px) |
| `borderRadius` | `string` | `'1rem'` | CSS border-radius |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno**
```tsx
<BorderBeam color="#f97316" duration={3} className="bg-gray-900 p-8">
  <ServiceCard title="Custom Carpentry" />
</BorderBeam>
```

**SathiDeals**
```tsx
<BorderBeam color="#c9a96e" duration={5} className="bg-yellow-950 p-6">
  <AgentCard />
</BorderBeam>
```

**GardenSuites4You**
```tsx
<BorderBeam color="#F5C518" duration={4} className="bg-white p-6">
  <PermitTimeline />
</BorderBeam>
```

**Motta Kitchen**
```tsx
<BorderBeam color="#e5e7eb" duration={6} className="bg-white p-8">
  <CabinetryOption />
</BorderBeam>
```

---

## 5. TextScramble

Scrambles characters with random glyphs before resolving to real text. Triggers on hover, mount, or scroll into view.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Target text to display |
| `trigger` | `'hover' \| 'mount' \| 'inView'` | `'hover'` | When to run the animation |
| `speed` | `number` | `2` | Frames per char resolution (lower = faster) |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno (hover on heading)**
```tsx
<h2 className="text-4xl font-bold text-amber-400">
  <TextScramble text="Transform Your Space" trigger="hover" />
</h2>
```

**SathiDeals (inView on stat)**
```tsx
<TextScramble text="$2.4M Sold This Month" trigger="inView" className="text-yellow-400 font-bold text-2xl" />
```

**GardenSuites4You (mount)**
```tsx
<TextScramble text="Build. Earn. Live." trigger="mount" className="text-gray-900 text-3xl font-extrabold" />
```

**Motta Kitchen (hover on nav)**
```tsx
<TextScramble text="Custom Cabinetry" trigger="hover" className="text-stone-800" />
```

---

## 6. CountUpStat

Counts from 0 to target value on IntersectionObserver trigger. Eased with `easeOutQuart`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Target number |
| `prefix` | `string` | `''` | Text before number (e.g. `'$'`) |
| `suffix` | `string` | `''` | Text after number (e.g. `'+'`) |
| `duration` | `number` | `2000` | Animation duration (ms) |
| `label` | `string` | — | Caption below number |
| `decimals` | `number` | `0` | Decimal places |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno**
```tsx
<CountUpStat value={250} suffix="+" label="Projects Completed" className="text-amber-400" />
```

**SathiDeals**
```tsx
<CountUpStat value={48} prefix="$" suffix="M+" label="Properties Sold" decimals={0} className="text-yellow-400" />
```

**GardenSuites4You**
```tsx
<CountUpStat value={95} suffix="%" label="Permit Success Rate" className="text-yellow-500" />
```

**Motta Kitchen**
```tsx
<CountUpStat value={12} suffix=" yrs" label="Industry Experience" className="text-stone-800" />
```

---

## 7. ScrollReveal

Wraps children in a fade + translate/scale reveal triggered by IntersectionObserver.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to reveal |
| `direction` | `'up' \| 'left' \| 'right' \| 'scale'` | `'up'` | Entry direction |
| `delay` | `number` | `0` | Delay in ms |
| `threshold` | `number` | `0.15` | Intersection threshold (0–1) |
| `duration` | `number` | `600` | Transition duration (ms) |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno (staggered service cards)**
```tsx
{services.map((s, i) => (
  <ScrollReveal key={s.id} direction="up" delay={i * 100}>
    <ServiceCard {...s} />
  </ScrollReveal>
))}
```

**SathiDeals (slide in from left)**
```tsx
<ScrollReveal direction="left" delay={200}>
  <AgentBio />
</ScrollReveal>
```

**GardenSuites4You (scale reveal)**
```tsx
<ScrollReveal direction="scale">
  <ROIChart />
</ScrollReveal>
```

**Motta Kitchen (right reveal)**
```tsx
<ScrollReveal direction="right" delay={150}>
  <ProductShowcase />
</ScrollReveal>
```

---

## 8. FloatingNav

Pill-shaped floating navigation. Hides on scroll down, reappears on scroll up. Includes mobile hamburger menu.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `links` | `{ label: string; href: string }[]` | — | Navigation links |
| `logo` | `ReactNode` | — | Logo slot |
| `ctaLabel` | `string` | — | CTA button text |
| `ctaHref` | `string` | — | CTA button href |
| `variant` | `'dark' \| 'gold' \| 'yellow' \| 'light'` | `'dark'` | Visual theme |

### Usage Examples

**DJ Custom Reno (dark variant)**
```tsx
<FloatingNav
  variant="dark"
  logo={<span>DJ Custom Reno</span>}
  links={[
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
  ]}
  ctaLabel="Get a Quote"
  ctaHref="#contact"
/>
```

**SathiDeals (gold variant)**
```tsx
<FloatingNav
  variant="gold"
  logo={<span>SathiDeals</span>}
  links={[
    { label: 'Listings', href: '/listings' },
    { label: 'Sell', href: '/sell' },
    { label: 'Agents', href: '/agents' },
  ]}
  ctaLabel="Book Showing"
  ctaHref="/contact"
/>
```

**GardenSuites4You (yellow variant)**
```tsx
<FloatingNav
  variant="yellow"
  logo={<span>GardenSuites4You</span>}
  links={[
    { label: 'Process', href: '#process' },
    { label: 'ROI', href: '#roi' },
    { label: 'Gallery', href: '#gallery' },
  ]}
  ctaLabel="Start My Suite"
  ctaHref="#start"
/>
```

**Motta Kitchen (light variant)**
```tsx
<FloatingNav
  variant="light"
  logo={<span>Motta Kitchen</span>}
  links={[
    { label: 'Designs', href: '#designs' },
    { label: 'Materials', href: '#materials' },
    { label: 'Process', href: '#process' },
  ]}
  ctaLabel="Book Consultation"
  ctaHref="#book"
/>
```

---

## 9. MultiStepLeadForm

3-step lead capture form: service selection → project details + timeline → contact info. Submits JSON via `fetch POST` to `webhookUrl`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `services` | `{ id: string; label: string }[]` | — | Checkable service options (step 1) |
| `webhookUrl` | `string` | — | POST endpoint (n8n, Make, etc.) |
| `brandColor` | `string` | `'#f59e0b'` | Accent color for progress bar, buttons, focus |
| `brandName` | `string` | `''` | Included in POST payload |
| `onSuccess` | `() => void` | — | Callback after successful submit |

### Payload Shape

```json
{
  "brand": "DJ Custom Reno",
  "services": ["kitchen", "bathroom"],
  "project_details": "Full kitchen gut and reno...",
  "timeline": "1–3 months",
  "name": "Jane Smith",
  "phone": "+1 416 555 0100",
  "email": "jane@example.com",
  "submitted_at": "2026-05-27T10:00:00.000Z"
}
```

### Usage Examples

**DJ Custom Reno**
```tsx
<MultiStepLeadForm
  services={[
    { id: 'kitchen', label: 'Kitchen Reno' },
    { id: 'bathroom', label: 'Bathroom Reno' },
    { id: 'basement', label: 'Basement Finishing' },
    { id: 'custom', label: 'Custom Carpentry' },
  ]}
  webhookUrl="https://n8n.djcustomreno.ca/webhook/lead"
  brandColor="#f97316"
  brandName="DJ Custom Reno"
/>
```

**SathiDeals**
```tsx
<MultiStepLeadForm
  services={[
    { id: 'buy', label: 'Buy a Home' },
    { id: 'sell', label: 'Sell My Home' },
    { id: 'invest', label: 'Investment Property' },
    { id: 'pre-con', label: 'Pre-Construction' },
  ]}
  webhookUrl="https://hooks.sathideals.com/lead"
  brandColor="#c9a96e"
  brandName="SathiDeals"
/>
```

**GardenSuites4You**
```tsx
<MultiStepLeadForm
  services={[
    { id: 'detached', label: 'Detached Garden Suite' },
    { id: 'laneway', label: 'Laneway House' },
    { id: 'basement-apt', label: 'Basement Apartment' },
    { id: 'permit', label: 'Permit Only' },
  ]}
  webhookUrl="https://hooks.gardensuites4you.ca/lead"
  brandColor="#F5C518"
  brandName="GardenSuites4You"
/>
```

**Motta Kitchen**
```tsx
<MultiStepLeadForm
  services={[
    { id: 'full-kitchen', label: 'Full Kitchen Design' },
    { id: 'cabinetry', label: 'Custom Cabinetry' },
    { id: 'countertops', label: 'Countertops' },
    { id: 'refresh', label: 'Kitchen Refresh' },
  ]}
  webhookUrl="https://crm.mottakitchen.com/leads"
  brandColor="#292524"
  brandName="Motta Kitchen"
/>
```

---

## 10. BeforeAfterSlider

Drag-to-reveal comparison slider. Supports mouse and touch. Clip-path technique for crisp split.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `beforeSrc` | `string` | — | Before image src (Next.js Image compatible) |
| `afterSrc` | `string` | — | After image src |
| `beforeLabel` | `string` | `'Before'` | Label overlay text |
| `afterLabel` | `string` | `'After'` | Label overlay text |
| `initialPosition` | `number` | `50` | Starting split position (0–100) |
| `className` | `string` | `''` | Extra classes (set `aspect-ratio` here) |

### Usage Examples

**DJ Custom Reno**
```tsx
<BeforeAfterSlider
  beforeSrc="/reno/kitchen-before.jpg"
  afterSrc="/reno/kitchen-after.jpg"
  beforeLabel="Before Reno"
  afterLabel="After Reno"
  className="aspect-video w-full max-w-3xl"
/>
```

**SathiDeals**
```tsx
<BeforeAfterSlider
  beforeSrc="/listings/123-empty.jpg"
  afterSrc="/listings/123-staged.jpg"
  beforeLabel="Empty"
  afterLabel="Staged"
  className="aspect-[4/3] rounded-3xl"
/>
```

**GardenSuites4You**
```tsx
<BeforeAfterSlider
  beforeSrc="/projects/backyard-before.jpg"
  afterSrc="/projects/backyard-suite.jpg"
  beforeLabel="Backyard"
  afterLabel="Garden Suite"
  initialPosition={40}
  className="aspect-video w-full"
/>
```

**Motta Kitchen**
```tsx
<BeforeAfterSlider
  beforeSrc="/kitchen/old.jpg"
  afterSrc="/kitchen/new.jpg"
  beforeLabel="Old Kitchen"
  afterLabel="Motta Design"
  className="aspect-[16/9] rounded-2xl shadow-2xl"
/>
```

---

## 11. ParallaxHero

Full-screen hero section with parallax background scroll (pure CSS transform — no framer-motion dependency). Supports eyebrow label, headline, subheadline, multiple CTAs, accent color, and a 3D scene slot.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `imageSrc` | `string` | — | Background image URL |
| `headline` | `string` | — | H1 text |
| `subheadline` | `string` | — | Paragraph below headline |
| `eyebrow` | `string` | — | Small pill label above headline |
| `ctas` | `{ label: string; href: string; variant?: 'primary' \| 'secondary' }[]` | `[]` | CTA buttons |
| `overlayOpacity` | `number` | `0.55` | Dark overlay opacity (0–1) |
| `accentColor` | `string` | `'#f59e0b'` | Primary CTA + eyebrow color |
| `minHeight` | `string` | `'100vh'` | CSS min-height |
| `children` | `ReactNode` | — | Optional 3D/overlay slot (above overlay, below text) |
| `className` | `string` | `''` | Extra classes |

### Usage Examples

**DJ Custom Reno (amber)**
```tsx
<ParallaxHero
  imageSrc="/hero/reno-bg.jpg"
  eyebrow="Toronto's #1 Renovation Team"
  headline="Your Dream Home Starts Here"
  subheadline="Full-service kitchen, bathroom, and basement renovations with guaranteed craftsmanship."
  accentColor="#f97316"
  overlayOpacity={0.6}
  ctas={[
    { label: 'Get a Free Quote', href: '#contact' },
    { label: 'See Our Work', href: '#portfolio', variant: 'secondary' },
  ]}
/>
```

**SathiDeals (gold)**
```tsx
<ParallaxHero
  imageSrc="/hero/toronto-skyline.jpg"
  eyebrow="GTA's Trusted Real Estate Team"
  headline="Find Your Perfect Home"
  subheadline="Over $48M in properties sold. Local expertise, proven results."
  accentColor="#c9a96e"
  overlayOpacity={0.65}
  ctas={[
    { label: 'Browse Listings', href: '/listings' },
    { label: 'Talk to an Agent', href: '/contact', variant: 'secondary' },
  ]}
/>
```

**GardenSuites4You (yellow)**
```tsx
<ParallaxHero
  imageSrc="/hero/garden-suite-bg.jpg"
  eyebrow="Ontario's Garden Suite Specialists"
  headline="Turn Your Backyard Into Income"
  subheadline="Design, permit, and build your garden suite in as little as 6 months."
  accentColor="#F5C518"
  overlayOpacity={0.5}
  ctas={[
    { label: 'Start My Suite', href: '#start' },
    { label: 'See ROI Calculator', href: '#roi', variant: 'secondary' },
  ]}
/>
```

**Motta Kitchen (white/neutral)**
```tsx
<ParallaxHero
  imageSrc="/hero/motta-kitchen-bg.jpg"
  eyebrow="Luxury Italian-Inspired Kitchens"
  headline="Crafted for the Way You Live"
  subheadline="Bespoke cabinetry and kitchen design that blends form with function."
  accentColor="#ffffff"
  overlayOpacity={0.45}
  ctas={[
    { label: 'Book Consultation', href: '#book' },
    { label: 'View Gallery', href: '#gallery', variant: 'secondary' },
  ]}
/>
```

---

## Barrel Export

All components are exported from `components/shared/index.ts`:

```ts
import {
  ShimmerButton,
  MagneticButton,
  SpotlightCard,
  BorderBeam,
  TextScramble,
  CountUpStat,
  ScrollReveal,
  FloatingNav,
  MultiStepLeadForm,
  BeforeAfterSlider,
  ParallaxHero,
} from '@/components/shared'
```

Types also exported:

```ts
import type {
  ShimmerVariant,
  ShimmerSize,
  FloatingNavVariant,
} from '@/components/shared'
```

---

## Dependencies

| Package | Used By |
|---|---|
| `react` | All |
| `next/link` | ShimmerButton, FloatingNav, ParallaxHero |
| `next/image` | BeforeAfterSlider |
| No external UI libs | All components are self-contained |

> `framer-motion` is NOT required — ParallaxHero uses native scroll + `requestAnimationFrame`.
