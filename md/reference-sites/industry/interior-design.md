# Interior Design Studios — Pattern Reference

> Patterns from Motta Kitchen, Smallbone, Henrybuilt, and comparable luxury interior studios.
> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, Framer Motion 11, GSAP 3.

---

## 1. Design Language

Interior design studio sites treat whitespace as a material. The layout communicates quality before a single word is read.

**Rules observed across Smallbone, Henrybuilt, deVOL Kitchens, and comparable studios:**
- Light background, never pure white — always warm (`#fafaf8`, `#f5f0e8`)
- Serif display type (Cormorant, Playfair, or Freight Display) for headlines
- Sans-serif for all body, labels, navigation (Inter, DM Sans, Neue Montreal)
- Photography IS the color palette — body copy never competes with imagery
- CTAs are conversational: "Book a Consultation", "Request the Brochure", "Visit the Showroom"
- No decorative gradients. No drop shadows on text. No glassmorphism.

---

## 2. Color Palette

```ts
// tokens/colors.ts
export const palette = {
  warmWhite:  "#fafaf8",   // page background
  cream:      "#f5f0e8",   // section alternates, card fills
  charcoal:   "#1a1a1a",   // primary text, headings
  slate:      "#6b6b6b",   // secondary text, captions
  stone:      "#9b9390",   // borders, dividers
  brass:      "#8b6914",   // accent — hardware, hover lines, active states
  brassLight: "#c4a862",   // hover tint
  darkForest: "#1a2420",   // dark hero overlays, footer
} as const;
```

---

## 3. Editorial Hero — Light Background, Serif Type, Generous Space

```tsx
// components/interior/EditorialHero.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface EditorialHeroProps {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
}

export function EditorialHero({
  eyebrow = "Kitchen & Interior Design",
  headline,
  subtext,
  cta,
  imageSrc,
  imageAlt,
}: EditorialHeroProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
      style={{ backgroundColor: "#fafaf8" }}
    >
      {/* Left — text column */}
      <div
        ref={textRef}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-0 opacity-0"
      >
        {eyebrow && (
          <p
            className="text-xs uppercase tracking-[0.18em] mb-8"
            style={{ color: "#8b6914" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] mb-6"
          style={{ color: "#1a1a1a" }}
        >
          {headline}
        </h1>
        {subtext && (
          <p
            className="text-base leading-relaxed max-w-sm mb-10"
            style={{ color: "#6b6b6b" }}
          >
            {subtext}
          </p>
        )}
        <Link
          href={cta.href}
          className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] pb-1 border-b w-fit group transition-colors"
          style={{ color: "#1a1a1a", borderColor: "#8b6914" }}
        >
          {cta.label}
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
            className="transition-transform group-hover:translate-x-1">
            <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Right — image column */}
      <div ref={imageRef} className="relative overflow-hidden opacity-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
```

---

## 4. Collection Grid with Hover Material Overlay

```tsx
// components/interior/CollectionGrid.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  descriptor: string;        // e.g. "Painted | Shaker | Bespoke"
  imageSrc: string;
  materialOverlaySrc?: string; // close-up of finish/grain
  href: string;
}

interface CollectionGridProps {
  collections: Collection[];
  heading?: string;
}

export function CollectionGrid({ collections, heading = "Collections" }: CollectionGridProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 px-8 md:px-16" style={{ backgroundColor: "#fafaf8" }}>
      <div className="mb-12 flex items-end justify-between">
        <h2
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight"
          style={{ color: "#1a1a1a" }}
        >
          {heading}
        </h2>
        <Link
          href="/collections"
          className="text-xs uppercase tracking-[0.14em] pb-0.5 border-b hidden md:block"
          style={{ color: "#6b6b6b", borderColor: "#9b9390" }}
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {collections.map((col) => (
          <Link
            key={col.id}
            href={col.href}
            className="group block relative overflow-hidden"
            onMouseEnter={() => setHovered(col.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Aspect ratio wrapper */}
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* Main image */}
              <img
                src={col.imageSrc}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Material overlay — fades in on hover */}
              {col.materialOverlaySrc && (
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: hovered === col.id ? 1 : 0 }}
                >
                  <img
                    src={col.materialOverlaySrc}
                    alt={`${col.name} finish detail`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Gradient so text remains readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}
            </div>

            {/* Text */}
            <div className="pt-4">
              <h3
                className="font-serif text-xl"
                style={{ color: "#1a1a1a" }}
              >
                {col.name}
              </h3>
              <p
                className="text-xs mt-1 uppercase tracking-[0.12em]"
                style={{ color: "#9b9390" }}
              >
                {col.descriptor}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

---

## 5. Finish / Material Selector Component

```tsx
// components/interior/MaterialSelector.tsx
"use client";
import { useState } from "react";

interface Material {
  id: string;
  name: string;
  finish: string;       // e.g. "Matte", "Brushed", "Polished"
  swatchSrc: string;    // small swatch image
  previewSrc: string;   // full kitchen rendered with this material
  hex?: string;         // fallback if no swatch image
}

interface MaterialSelectorProps {
  materials: Material[];
  heading?: string;
}

export function MaterialSelector({
  materials,
  heading = "Explore Finishes",
}: MaterialSelectorProps) {
  const [active, setActive] = useState<Material>(materials[0]);

  return (
    <section className="py-24 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      style={{ backgroundColor: "#f5f0e8" }}>
      {/* Preview image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <img
          key={active.id}
          src={active.previewSrc}
          alt={active.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "fadeIn 0.4s ease" }}
        />
        <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
      </div>

      {/* Selector panel */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "#8b6914" }}>
          Material & Finish
        </p>
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-tight mb-2"
          style={{ color: "#1a1a1a" }}>
          {heading}
        </h2>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "#6b6b6b" }}>
          Each finish is hand-applied. Samples are available in our showroom.
        </p>

        {/* Swatch grid */}
        <div className="flex flex-wrap gap-3 mb-6">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setActive(mat)}
              title={mat.name}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 focus:outline-none"
              style={{
                borderColor: active.id === mat.id ? "#8b6914" : "transparent",
                boxShadow: active.id === mat.id ? "0 0 0 2px #fafaf8, 0 0 0 4px #8b6914" : "none",
              }}
            >
              {mat.swatchSrc ? (
                <img src={mat.swatchSrc} alt={mat.name}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: mat.hex ?? "#ccc" }} />
              )}
            </button>
          ))}
        </div>

        {/* Active material info */}
        <div className="border-t pt-6" style={{ borderColor: "#9b9390" }}>
          <p className="font-serif text-lg" style={{ color: "#1a1a1a" }}>{active.name}</p>
          <p className="text-xs mt-1 uppercase tracking-[0.12em]" style={{ color: "#6b6b6b" }}>
            {active.finish}
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Process Timeline

```tsx
// components/interior/ProcessTimeline.tsx
const steps = [
  { number: "01", title: "Discovery", body: "We visit your home, discuss your life in the space, and define what success looks like for your project." },
  { number: "02", title: "Design", body: "Our designers develop three concept directions. You select and refine. Nothing moves to production without your sign-off." },
  { number: "03", title: "Production", body: "Every component is built in our workshop. Typical lead time is 14–18 weeks from final approval." },
  { number: "04", title: "Installation", body: "Our installation team works in sequence with your contractor. We manage the site schedule." },
  { number: "05", title: "Aftercare", body: "We return at 30 and 90 days. Adjustments, refinements, and touch-ups are included." },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 px-8 md:px-16 max-w-5xl mx-auto">
      <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "#8b6914" }}>
        How we work
      </p>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] mb-16" style={{ color: "#1a1a1a" }}>
        The Process
      </h2>

      <div className="relative">
        {/* Vertical rule */}
        <div
          className="absolute left-[2.4rem] top-0 bottom-0 w-px hidden md:block"
          style={{ backgroundColor: "#9b9390" }}
        />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-4 md:gap-10 items-start">
              {/* Number */}
              <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-0">
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "#8b6914" }}
                >
                  {step.number}
                </span>
                {/* Dot on the timeline */}
                <div
                  className="hidden md:block w-3 h-3 rounded-full border-2 mt-1 bg-[#fafaf8]"
                  style={{ borderColor: "#8b6914" }}
                />
              </div>

              {/* Content */}
              <div className="pb-4">
                <h3 className="font-serif text-xl mb-2" style={{ color: "#1a1a1a" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. Instagram-Style Gallery Grid

Masonry-style 3-column grid with subtle hover scale. No library needed.

```tsx
// components/interior/GalleryGrid.tsx
"use client";

interface GalleryImage {
  src: string;
  alt: string;
  span?: "normal" | "tall"; // tall = spans 2 rows
}

interface GalleryGridProps {
  images: GalleryImage[];
  heading?: string;
}

export function GalleryGrid({ images, heading = "Spaces" }: GalleryGridProps) {
  return (
    <section className="py-24 px-4 md:px-8" style={{ backgroundColor: "#fafaf8" }}>
      {heading && (
        <h2
          className="font-serif text-[clamp(2rem,4vw,3rem)] text-center mb-12"
          style={{ color: "#1a1a1a" }}
        >
          {heading}
        </h2>
      )}

      {/* CSS grid auto-rows: each row = 240px; tall items span 2 */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
        style={{ gridAutoRows: "240px" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden group relative"
            style={img.span === "tall" ? { gridRow: "span 2" } : {}}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#1a2420]/0 group-hover:bg-[#1a2420]/20 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// Usage
<GalleryGrid
  heading="Recent Projects"
  images={[
    { src: "/gallery/01.jpg", alt: "Pemberton kitchen", span: "tall" },
    { src: "/gallery/02.jpg", alt: "Forest Hill bathoom" },
    { src: "/gallery/03.jpg", alt: "Rosedale living room" },
    { src: "/gallery/04.jpg", alt: "Annex dining room" },
    { src: "/gallery/05.jpg", alt: "Yorkville kitchen", span: "tall" },
    { src: "/gallery/06.jpg", alt: "Lawrence Park library" },
  ]}
/>
```

---

## 8. Typography Tokens

```ts
// tokens/typography.ts
export const type = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body:    "'DM Sans', 'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'Fira Mono', monospace",

  scale: {
    hero:     "clamp(3rem, 6vw, 6rem)",
    h1:       "clamp(2.4rem, 4.5vw, 4rem)",
    h2:       "clamp(1.8rem, 3vw, 3rem)",
    h3:       "clamp(1.2rem, 2vw, 1.8rem)",
    body:     "1rem",        // 16px
    small:    "0.875rem",    // 14px
    label:    "0.6875rem",   // 11px
  },

  tracking: {
    display: "0.02em",
    label:   "0.16em",       // uppercase labels always wide-tracked
    body:    "0",
  },
} as const;
```

---

## 9. Tailwind Config Extensions

```ts
// tailwind.config.ts (relevant extends only)
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "warm-white":  "#fafaf8",
        cream:         "#f5f0e8",
        charcoal:      "#1a1a1a",
        slate:         "#6b6b6b",
        stone:         "#9b9390",
        brass:         "#8b6914",
        "brass-light": "#c4a862",
        "dark-forest": "#1a2420",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans:  ["DM Sans", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```
