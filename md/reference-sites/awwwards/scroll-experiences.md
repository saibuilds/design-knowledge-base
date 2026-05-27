# Scroll Storytelling — Exceptional Scroll Experiences

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis.

---

## 1. Scroll Design Principles

### Parallax Hierarchy
Use exactly 3 depth layers for readable parallax — more creates visual noise:
1. **Background** (moves at 0.3× scroll speed) — large texture, gradient, or image
2. **Mid** (moves at 0.6× scroll speed) — decorative element, secondary image
3. **Foreground** (moves at 1× scroll speed or faster) — text, CTA, primary image

Never parallax primary text — it causes reading difficulty. Parallax only decorative elements.

### Scrub vs Snap
| Pattern | When to use | Lenis config | GSAP config |
|---------|-------------|--------------|-------------|
| **Scrub** | Continuous storytelling, reveals that feel physical | `duration: 1.2` | `scrub: 1.5` |
| **Snap** | Section-based navigation, presentation-style | `smoothWheel: true` | CSS `scroll-snap-type` |
| **Combined** | Complex sequences with rest points | Both | `snap: 1/(sections-1)` |

### Momentum
Lenis lerp is your primary pacing tool:
- `duration: 0.8` — crisp, product feel (Linear, Vercel)
- `duration: 1.2` — smooth, balanced (Locomotive default)
- `duration: 1.8` — luxurious, slow (Gucci, high-fashion)
- `duration: 2.5+` — extremely slow, cinematic (rare, only for immersive experiences)

### Performance
- Never animate `top`/`left`/`width`/`height` in scroll handlers — use `transform` only
- `will-change: transform` on animated elements, but remove after animation completes
- ScrollTrigger's `scrub` is better than manual `onScroll` listeners
- `invalidateOnRefresh: true` on ScrollTrigger for dynamic content

---

## 2. Site Profiles — Best-in-Class Scroll

---

### Apple iPhone Pages (apple.com/iphone)

**Scroll Technique:** Scroll-linked 3D product rotation. Device rotates, camera orbits, feature callouts appear at precise scroll positions.

**Easing / Timing:** Pure `linear` scrub — Apple intentionally makes it 1:1 with scroll so it feels physically attached.

**GSAP Config:** `scrub: true` (0.5–1 for slight lag), `pin: true` on each feature section.

**Code Pattern — Scroll-Driven Image Sequence (CSS):**

```tsx
// components/ScrollImageSequence.tsx
// For true image sequences (60+ frames), this approach swaps pre-rendered images.
// For simpler use: scroll-linked rotation.
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRotatorProps {
  className?: string;
}

export function ScrollRotator({ className }: ScrollRotatorProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        rotationY: 360,
        ease: "none",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen ${className ?? ""}`}>
      <div
        ref={boxRef}
        className="w-64 h-64 bg-gradient-to-br from-neutral-200 to-neutral-400 rounded-2xl shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
}
```

---

### Stripe (stripe.com)

**Scroll Technique:** Gradient sections with feature reveals. Each feature section has a sticky left panel (product UI) while right column scrolls through feature list.

**Easing / Timing:** Framer Motion `useScroll` + `useTransform` with `easeOut` on individual elements. Fast overall: `duration: 0.8` on Lenis.

**Code Pattern — Sticky Feature Reveal:**

```tsx
// components/StickyFeatureReveal.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturePreview {
  id: string;
  content: React.ReactNode;
}

interface StickyFeatureRevealProps {
  features: Feature[];
  previews: FeaturePreview[];
}

export function StickyFeatureReveal({ features, previews }: StickyFeatureRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Left: sticky preview */}
      <div className="md:sticky md:top-24 h-fit">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-square flex items-center justify-center">
          {previews.map((preview, i) => (
            <FeaturePreviewPane
              key={preview.id}
              content={preview.content}
              index={i}
              total={previews.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>

      {/* Right: scrolling feature list */}
      <div className="flex flex-col">
        {features.map((feature) => (
          <div key={feature.id} className="min-h-[60vh] flex items-center p-12">
            <div>
              <div className="mb-4 text-neutral-400">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed max-w-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturePreviewPane({
  content,
  index,
  total,
  containerRef,
}: {
  content: React.ReactNode;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity }}>
      {content}
    </motion.div>
  );
}
```

---

### Linear (linear.app)

**Scroll Technique:** Speed blur sections — elements enter at high velocity, decelerate to rest. Creates kinetic brand feeling.

**Easing / Timing:** Entry: fast velocity ease `cubic-bezier(0.22, 1, 0.36, 1)` 400ms. Blur applied during motion via `filter: blur(4px)` → `blur(0)`.

**Code Pattern — Speed Blur Entrance:**

```tsx
// components/SpeedBlurReveal.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SpeedBlurRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function SpeedBlurReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: SpeedBlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const dirMap = {
    up: { y: 60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  const initial = { ...dirMap[direction], opacity: 0, filter: "blur(8px)" };
  const animate = isInView
    ? { y: 0, x: 0, opacity: 1, filter: "blur(0px)" }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

### Locomotive Scroll Demo Sites

**Scroll Technique:** Showcase of their own library — each demo shows a different scroll pattern: horizontal, diagonal, inertia values.

**Code Pattern — Diagonal Image Scroll:**

```tsx
// components/DiagonalScrollSection.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface DiagonalScrollSectionProps {
  images: { src: string; alt: string }[];
}

export function DiagonalScrollSection({ images }: DiagonalScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Even images go up, odd images go down — creates diagonal feel
  const yEven = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yOdd = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="py-24 overflow-hidden">
      <div className="grid grid-cols-3 gap-4 px-8">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            style={{ y: i % 2 === 0 ? yEven : yOdd }}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

---

### Superlist (superlist.com)

**Scroll Technique:** Pinned feature sections. Each section is pinned while a product UI animation plays to completion, then unpins and advances.

**Code Pattern:** See `PinnedFeatureSection` in `sotd-winners.md` #7.

---

### Cosmos (cosmos.so)

**Scroll Technique:** Infinite canvas — scroll moves a 2D canvas, items are positioned in 2D space and you "navigate" them by scrolling.

**Code Pattern — 2D Canvas Navigation:**

```tsx
// components/CanvasScroll.tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CanvasItem {
  id: string;
  x: number;
  y: number;
  content: React.ReactNode;
}

export function CanvasScroll({ items }: { items: CanvasItem[] }) {
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const springX = useSpring(canvasX, { stiffness: 80, damping: 20 });
  const springY = useSpring(canvasY, { stiffness: 80, damping: 20 });

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY, cx: canvasX.get(), cy: canvasY.get() };
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      canvasX.set(dragStart.current.cx + (e.clientX - dragStart.current.x));
      canvasY.set(dragStart.current.cy + (e.clientY - dragStart.current.y));
    };
    const onUp = () => { isDragging.current = false; };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [canvasX, canvasY]);

  return (
    <div className="w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing bg-neutral-50">
      <motion.div
        className="relative"
        style={{ x: springX, y: springY, width: "4000px", height: "3000px" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            {item.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
```

---

### Vercel (vercel.com)

**Scroll Technique:** Gradient reveal sections. Dark background with content that "emerges" from dark as user scrolls in.

**Code Pattern — Gradient Section Reveal:**

```tsx
// components/GradientRevealSection.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GradientRevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["60px", "0px"]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient reveal mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: maskOpacity,
          background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
        }}
      />
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </div>
  );
}
```

---

### Basement Studio — Grain + Scroll Depth

**Scroll Technique:** Film grain intensity increases as user scrolls deeper. Foreground elements have more grain than background — creates tactile depth.

**Code Pattern:** See `FilmGrain` component in `sotd-winners.md` #12. Add scroll-linked opacity:

```tsx
// components/ScrollGrain.tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollGrain() {
  const { scrollYProgress } = useScroll();
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.08]);

  return (
    <>
      <svg className="hidden">
        <filter id="scrollgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ opacity: grainOpacity, filter: "url(#scrollgrain)" }}
      />
    </>
  );
}
```

---

## 3. Pattern Library

---

### 3.1 Lenis + GSAP ScrollTrigger Setup (Next.js App Router)

```tsx
// providers/SmoothScrollProvider.tsx
// Full production-ready provider — see agency-portfolios.md for identical implementation.
// Re-export from a single file to avoid duplication:

// lib/scroll.ts
export { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

// Install: npm install lenis gsap
// Lenis docs: https://github.com/darkroomengineering/lenis
```

---

### 3.2 Pinned Horizontal Scroll Section

```tsx
// components/HorizontalPin.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalPinProps {
  children: React.ReactNode[];
  className?: string;
}

export function HorizontalPin({ children, className }: HorizontalPinProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth;

      gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${totalWidth - window.innerWidth}`,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex h-screen will-change-transform">
        {children.map((child, i) => (
          <div key={i} className="flex-none w-screen h-full flex items-center justify-center">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### 3.3 Scroll-Linked Text Reveal (line by line)

```tsx
// components/LineReveal.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LineRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  triggerStart?: string;
}

export function LineReveal({
  text,
  as: Tag = "p",
  className,
  triggerStart = "top 85%",
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into words, wrap each in overflow-hidden span
      const el = containerRef.current?.querySelector("[data-text]");
      if (!el) return;

      const words = text.split(" ");
      el.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span data-word style="display:inline-block">${word}</span></span>`
        )
        .join("");

      gsap.from(el.querySelectorAll("[data-word]"), {
        y: "110%",
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, triggerStart]);

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        <span data-text>{text}</span>
      </Tag>
    </div>
  );
}
```

---

### 3.4 Parallax Image Layers

```tsx
// components/ParallaxLayers.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Layer {
  src: string;
  alt: string;
  depth: 0.3 | 0.6 | 1; // parallax factor
  className?: string;
}

interface ParallaxLayersProps {
  layers: Layer[];
  height?: string;
}

export function ParallaxLayers({ layers, height = "100vh" }: ParallaxLayersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      {layers.map((layer, i) => {
        // Depth 0.3 = slow (background), 1 = same speed as scroll (foreground)
        const yRange = (1 - layer.depth) * 100; // px movement
        const y = useTransform(scrollYProgress, [0, 1], [`${yRange}px`, `-${yRange}px`]);

        return (
          <motion.div
            key={i}
            className={`absolute inset-0 ${layer.className ?? ""}`}
            style={{ y, willChange: "transform" }}
          >
            <Image src={layer.src} alt={layer.alt} fill className="object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
}

// Usage:
// <ParallaxLayers layers={[
//   { src: "/bg-sky.jpg", alt: "sky", depth: 0.3 },
//   { src: "/mid-trees.jpg", alt: "trees", depth: 0.6 },
//   { src: "/fg-house.jpg", alt: "house", depth: 1 },
// ]} />
```

---

### 3.5 Scroll-Snapping Full-Screen Sections

```tsx
// components/SnapSections.tsx
"use client";
import { useRef } from "react";

interface SnapSection {
  id: string;
  children: React.ReactNode;
  bgColor?: string;
}

interface SnapSectionsProps {
  sections: SnapSection[];
}

export function SnapSections({ sections }: SnapSectionsProps) {
  return (
    <div
      className="h-screen overflow-y-scroll"
      style={{
        scrollSnapType: "y mandatory",
        // Lenis must be disabled for this container or configured with snap
      }}
    >
      {sections.map((section) => (
        <section
          key={section.id}
          className="h-screen flex items-center justify-center"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            backgroundColor: section.bgColor,
          }}
        >
          {section.children}
        </section>
      ))}
    </div>
  );
}

// Note: when using CSS scroll-snap with Lenis, either:
// 1. Don't wrap this component in SmoothScrollProvider
// 2. Or configure Lenis with: syncToNative: true on this element
```

---

### 3.6 Number Counter on Scroll

```tsx
// components/ScrollCounter.tsx
// See sotd-winners.md #22 — CounterOnScroll component.
// Identical implementation, re-export:
export { CounterOnScroll } from "@/components/CounterOnScroll";
```

---

### 3.7 SVG Path Draw-On-Scroll

```tsx
// components/ScrollPathDraw.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollPathDrawProps {
  d: string;
  viewBox: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export function ScrollPathDraw({
  d,
  viewBox,
  strokeColor = "#c9a96e",
  strokeWidth = 2,
  className,
}: ScrollPathDrawProps) {
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  // No external plugin — Framer Motion handles pathLength natively
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      className={className}
    >
      <motion.path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />
    </svg>
  );
}

// Usage — animated floor plan outline:
// <ScrollPathDraw
//   d="M10,10 L90,10 L90,90 L50,90 L50,60 L30,60 L30,90 L10,90 Z"
//   viewBox="0 0 100 100"
//   strokeColor="#c9a96e"
//   className="w-full max-w-lg mx-auto"
// />
```

---

## 4. Performance & Accessibility

### will-change Strategy

```tsx
// Only add will-change while animating, remove after
// In GSAP:
gsap.to(el, {
  y: -100,
  onStart: () => el.style.willChange = "transform",
  onComplete: () => el.style.willChange = "auto",
});

// In Framer Motion — handled automatically during animation
// Add manually only for scroll-tracked elements:
<motion.div style={{ y, willChange: "transform" }} />
```

### prefers-reduced-motion

```tsx
// hooks/useReducedMotion.ts
import { useReducedMotion } from "framer-motion";

// In components:
export function AnimatedHero({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.6 }}
    >
      {children}
    </motion.div>
  );
}

// For GSAP:
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!mediaQuery.matches) {
  gsap.to(el, { y: -100, scrollTrigger: { scrub: 1 } });
}
```

### Lenis Destroy on Unmount

```tsx
// Always in cleanup:
useLayoutEffect(() => {
  const lenis = new Lenis({ duration: 1.2 });
  // ...
  return () => {
    lenis.destroy(); // Removes all event listeners, restores native scroll
    ScrollTrigger.getAll().forEach((t) => t.kill()); // Clean GSAP too
  };
}, []);
```

---

## 5. Scroll Patterns for Renovation / Real Estate

---

### Before/After Reveal

```tsx
// components/BeforeAfterReveal.tsx
"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BeforeAfterRevealProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number; // 0–100
}

export function BeforeAfterReveal({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before renovation",
  afterAlt = "After renovation",
  initialPosition = 50,
}: BeforeAfterRevealProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl cursor-ew-resize select-none"
      style={{ touchAction: "none" }}
      onMouseDown={(e) => { isDragging.current = true; updatePosition(e.clientX); }}
      onMouseMove={(e) => { if (isDragging.current) updatePosition(e.clientX); }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* After (full width, underneath) */}
      <div className="relative aspect-[4/3]">
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative w-full h-full" style={{ width: `${(100 / position) * 100}%` }}>
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 5L3 10L7 15M13 5L17 10L13 15" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {/* Labels */}
        <span className="absolute top-4 right-3 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded">Before</span>
        <span className="absolute top-4 left-3 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded">After</span>
      </div>
    </div>
  );
}
```

### Floor Plan Zoom on Scroll

```tsx
// components/FloorPlanZoom.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function FloorPlanZoom({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={ref} className="flex items-center justify-center min-h-screen p-8">
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <Image src={src} alt={alt} width={900} height={600} className="w-full h-auto" />
      </motion.div>
    </div>
  );
}
```

### Material Palette Reveal

```tsx
// components/MaterialPaletteReveal.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Material {
  name: string;
  hex: string;
  texture?: string;
  description: string;
}

export function MaterialPaletteReveal({ materials }: { materials: Material[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {materials.map((mat, i) => (
        <motion.div
          key={mat.name}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group"
        >
          {/* Swatch */}
          <div
            className="aspect-square rounded-xl mb-3 transition-transform duration-300 group-hover:scale-105 shadow-md"
            style={{ backgroundColor: mat.hex }}
          />
          <p className="font-medium text-sm">{mat.name}</p>
          <p className="text-xs text-neutral-500 mt-1">{mat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Usage for renovation:
// <MaterialPaletteReveal materials={[
//   { name: "Brushed Oak", hex: "#c9a96e", description: "Wide plank engineered hardwood" },
//   { name: "Warm Marble", hex: "#e8dfd4", description: "Calacatta Gold countertop" },
//   { name: "Aged Brass", hex: "#b8860b", description: "Hardware + fixtures" },
//   { name: "Slate Grey", hex: "#708090", description: "Exterior cladding" },
// ]} />
```
