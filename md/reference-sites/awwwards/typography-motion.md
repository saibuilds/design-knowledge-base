# Typography + Motion — Sites Winning on Type & Animation

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, Framer Motion 11, GSAP 3.

---

## 1. Typography as a Design System

### Variable Fonts
Variable fonts are a single font file with a continuous axis (weight, width, slant). Award-winning sites animate these axes in response to scroll, hover, or interaction — this is impossible with static fonts.

Key axes:
- `wght` — weight (100–900)
- `wdth` — width (condensed to expanded)
- `ital` — italic angle
- `slnt` — slant
- `opsz` — optical size (affects contrast, spacing at different sizes)

### Optical Sizing
At large sizes (>60px), type looks better with slightly reduced weight and tighter tracking. At small sizes (<14px), slightly heavier weight and looser tracking aids legibility. Use `font-optical-sizing: auto` in CSS, or manually tune `font-variation-settings: "opsz" 72` at display scale.

### Fluid Type Scales
Fluid typography uses `clamp()` to scale continuously from mobile to desktop — no breakpoint jumps. See Section 4 for complete Tailwind implementation.

### Kinetic Type Philosophy
Motion should reinforce meaning:
- **Reveal** (bottom-up mask): information arriving, entering the frame
- **Exit** (top-up mask): information leaving, completing
- **Scramble**: uncertainty, decryption, tech reveal
- **Morph**: transformation, change, before/after
- **Float**: ambient, alive, real-time
- **Stagger**: list items arriving as a group but with individual identity

---

## 2. Site Profiles — Typography + Motion Leaders

---

### 1. Obys Agency (obys.agency)

**Type Stack:**
- Display: `Editorial New` (or `Playfair Display` as free alt) — high contrast, editorial
- Body: `Neue Montreal Regular` 16px / `DM Sans` free alt
- Labels: uppercase, 11px, 0.1em tracking

**Motion Technique:** Every headline character has an independent entrance. Characters arrive bottom-up, with stagger 20ms. The overall effect reads as one motion but has individual character intention.

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — expo ease out, 700ms

**Color Role:** Black on white for maximum readability. Color only in project-specific sections.

**Code Pattern:**

```tsx
// components/typography/ObysHeadline.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ObysHeadlineProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function ObysHeadline({ text, className, once = true }: ObysHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className={`flex flex-wrap gap-x-[0.3em] ${className ?? "text-7xl font-bold"}`}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="flex overflow-hidden">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: (wi * word.length + ci) * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  );
}
```

---

### 2. Pentagram (pentagram.com)

**Type Stack:**
- Display: `GT America Extended Bold` or `Helvetica Neue Extended 95 Black`
- Body: `GT America Regular` 15px, 1.7 line-height — long-form optimized
- Labels: all caps, tracked 0.15em

**Motion Technique:** Restrained. Hover states only — no scroll motion. Hover on a project reveals the project category in a type label that slides in from the right.

**Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — ease-out-quad, 300ms

**Color Role:** Black dominant. Red accent (`#e4002b`) used extremely sparingly — only for active states and key emphasis.

**Code Pattern:**

```tsx
// components/typography/LabelSlideIn.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LabelSlideInProps {
  children: React.ReactNode;
  label: string;
  labelColor?: string;
}

export function LabelSlideIn({ children, label, labelColor = "#e4002b" }: LabelSlideInProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xs uppercase tracking-[0.15em] font-medium"
            style={{ color: labelColor }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

### 3. It's Nice That (itsnicethat.com)

**Type Stack:**
- Headlines: `Graphik` (or `Inter` as free alt) Medium/Semibold
- Body: `Graphik` Regular 16px, 1.65 line-height — long-read optimized
- Article titles: variable weight on hover (regular → bold)

**Motion Technique:** Weight change on hover. Article card titles go from `font-weight: 400` to `700` on hover using variable font, animating through intermediate values.

**Easing:** Linear weight change, 200ms — intentionally mechanical.

**Color Role:** Vibrant category colors from an editorial palette. Each content category has a distinct color — used on tags, borders, hover states.

**Code Pattern:**

```tsx
// components/typography/WeightHoverText.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface WeightHoverTextProps {
  text: string;
  normalWeight?: number;
  hoverWeight?: number;
  className?: string;
  fontFamily?: string;
}

export function WeightHoverText({
  text,
  normalWeight = 400,
  hoverWeight = 700,
  className,
  fontFamily = "Inter, sans-serif",
}: WeightHoverTextProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className={`cursor-pointer ${className ?? ""}`}
      style={{ fontFamily }}
      animate={{ fontVariationSettings: `"wght" ${hovered ? hoverWeight : normalWeight}` }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </motion.span>
  );
}
```

---

### 4. Stripe Press (press.stripe.com)

**Type Stack:**
- Display: `Sohne` (or `DM Serif Display` free alt) at extreme sizes (72–120px)
- Body: `Sohne Buch` (book weight) 18px, 1.75 line-height — best-in-class reading experience
- Footnotes: 13px, hanging indent, numbered

**Motion Technique:** Page load stagger — elements arrive in reading order, top to bottom, each 40ms delayed. The pattern mimics opening a physical book — content populates the page.

**Easing:** `ease-out` on opacity+y, very subtle (y: 12px only). Not aggressive animation.

**Color Role:** Each book has a unique accent color. The site palette shifts globally per book section.

**Code Pattern:**

```tsx
// components/typography/PageLoadStagger.tsx
"use client";
import { motion } from "framer-motion";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface PageLoadStaggerProps {
  children: React.ReactNode[];
  className?: string;
}

export function PageLoadStagger({ children, className }: PageLoadStaggerProps) {
  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={ITEM_VARIANTS}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

### 5. Cargo (cargo.site)

**Type Stack:** User-defined per site. Their own platform showcases extreme typographic diversity.

**Motion Technique:** Builder-generated — each template has its own motion system. Best examples use typeface as the primary UI element.

**Code Pattern — Typeface as UI:**

```tsx
// components/typography/TypeNavigation.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface TypeNavItem { href: string; label: string; }

export function TypeNavigation({ items }: { items: TypeNavItem[] }) {
  return (
    <nav className="flex items-center gap-12">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group relative text-3xl font-bold tracking-tight">
          {item.label}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-current"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </Link>
      ))}
    </nav>
  );
}
```

---

### 6. Grilli Type (grillitype.com)

**Type Stack:** Their own fonts — GT America, GT Sectra, GT Walsheim. Variable font axes demonstrated live.

**Motion Technique:** Interactive font specimen — sliders control weight/width/optical size in real time. Type responds immediately to input.

**Code Pattern — Live Variable Font Slider:**

```tsx
// components/typography/VariableFontDemo.tsx
"use client";
import { useState } from "react";

interface Axis {
  name: string;
  tag: string;
  min: number;
  max: number;
  defaultValue: number;
}

interface VariableFontDemoProps {
  text: string;
  fontFamily: string;
  axes: Axis[];
}

export function VariableFontDemo({ text, fontFamily, axes }: VariableFontDemoProps) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(axes.map((a) => [a.tag, a.defaultValue]))
  );

  const fontVariationSettings = Object.entries(values)
    .map(([tag, val]) => `"${tag}" ${val}`)
    .join(", ");

  return (
    <div className="space-y-8">
      {/* Live specimen */}
      <p
        className="text-6xl leading-tight transition-none"
        style={{ fontFamily, fontVariationSettings }}
      >
        {text}
      </p>

      {/* Controls */}
      <div className="grid gap-4">
        {axes.map((axis) => (
          <div key={axis.tag} className="flex items-center gap-4">
            <label className="w-24 text-sm font-mono text-neutral-500">{axis.name}</label>
            <input
              type="range"
              min={axis.min}
              max={axis.max}
              value={values[axis.tag]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [axis.tag]: Number(e.target.value) }))
              }
              className="flex-1"
            />
            <span className="w-10 text-right text-sm font-mono text-neutral-400">
              {values[axis.tag]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Usage:
// <VariableFontDemo
//   text="Renovation"
//   fontFamily="'Inter Variable', sans-serif"
//   axes={[
//     { name: "Weight", tag: "wght", min: 100, max: 900, defaultValue: 400 },
//     { name: "Width", tag: "wdth", min: 75, max: 125, defaultValue: 100 },
//   ]}
// />
```

---

### 7. Klim Type Foundry (klim.co.nz)

**Type Stack:** Their own fonts — Tiempos, Söhne, Calibre. Site is a specimen in itself.

**Motion Technique:** Specimen PDF previews expand inline — type fills the screen smoothly.

**Code Pattern — Expanding Type Specimen:**

```tsx
// components/typography/ExpandingSpecimen.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ExpandingSpecimenProps {
  fontName: string;
  specimen: string;
  details: string;
}

export function ExpandingSpecimen({ fontName, specimen, details }: ExpandingSpecimenProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="border-b border-neutral-200 overflow-hidden cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      <motion.div layout="position" className="py-6 flex items-center justify-between">
        <span className="text-lg font-medium">{fontName}</span>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl leading-none"
        >
          +
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-12"
          >
            <p className="text-[10vw] leading-[1.1] font-bold tracking-tight mb-6">{specimen}</p>
            <p className="text-sm text-neutral-500 max-w-md">{details}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

---

### 8. Basement Studio (basement.studio)

**Type Stack:** `JetBrains Mono` for UI chrome and labels — strong mono identity. `Neue Haas Grotesk` (or `Inter`) for body.

**Motion Technique:** Mono font with a blinking cursor on nav items. Active state adds `_` at end of label, blinks at 1s interval.

**Code Pattern:**

```tsx
// components/typography/MonoCursor.tsx
"use client";
import { motion } from "framer-motion";

interface MonoCursorProps {
  label: string;
  active?: boolean;
  className?: string;
}

export function MonoCursor({ label, active = false, className }: MonoCursorProps) {
  return (
    <span className={`font-mono inline-flex items-center ${className ?? ""}`}>
      {label}
      {active && (
        <motion.span
          className="inline-block w-[0.6em] h-[1em] bg-current ml-0.5 align-text-bottom"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      )}
    </span>
  );
}
```

---

### 9. Cédric Pereira (cedricpereira.com)

**Type Stack:** Large display type (80–160px on desktop), single font family, weight contrast only.

**Motion Technique:** Letters scatter on page exit — each character is given a random velocity and flies off screen with gravity applied.

**Code Pattern — Letter Scatter Exit:**

```tsx
// components/typography/ScatterText.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ScatterTextProps {
  text: string;
  className?: string;
}

function getRandomVelocity() {
  return {
    x: (Math.random() - 0.5) * 600,
    y: -(Math.random() * 400 + 100),
    rotate: (Math.random() - 0.5) * 360,
  };
}

export function ScatterText({ text, className }: ScatterTextProps) {
  const [visible, setVisible] = useState(true);
  const chars = text.split("");

  return (
    <div>
      <AnimatePresence>
        {visible && (
          <span
            className={`inline-flex flex-wrap ${className ?? "text-8xl font-bold"}`}
            aria-label={text}
          >
            {chars.map((char, i) => {
              const vel = getRandomVelocity();
              return (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                  exit={{
                    y: vel.y,
                    x: vel.x,
                    rotate: vel.rotate,
                    opacity: 0,
                    transition: {
                      duration: 0.8,
                      delay: i * 0.02,
                      ease: [0.36, 0, 0.66, -0.56], // anticipate then overshoot
                    },
                  }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        )}
      </AnimatePresence>
      <button onClick={() => setVisible((v) => !v)} className="block mt-4 text-sm underline">
        Toggle scatter
      </button>
    </div>
  );
}
```

---

### 10. Stripe Press (editorial long-form)

See profile #4 above for core implementation. Extended note: Stripe Press uses optical margin alignment (`hanging-punctuation: first last`) and precise `text-wrap: pretty` (Chrome 117+) for balanced headlines.

```css
/* Optional CSS for text polish */
h1, h2, h3 {
  text-wrap: balance; /* Chrome 114+ */
  hanging-punctuation: first last;
}
p {
  text-wrap: pretty; /* Chrome 117+ */
}
```

---

## 3. Type Animation Pattern Library

---

### 3.1 Word-by-Word Stagger Reveal

```tsx
// components/typography/WordStagger.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordStaggerProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

const CONTAINER = {
  hidden: {},
  visible: (custom: { stagger: number; delay?: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay ?? 0,
    },
  }),
};

const WORD = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function WordStagger({
  text,
  className,
  staggerDelay = 0.07,
  duration = 0.5,
  once = true,
}: WordStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      variants={CONTAINER}
      custom={{ stagger: staggerDelay }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap gap-x-[0.3em] ${className ?? ""}`}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={WORD} aria-hidden className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
```

---

### 3.2 Character Scramble Effect

```tsx
// components/typography/CharScramble.tsx
"use client";
import { useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface CharScrambleProps {
  text: string;
  trigger?: boolean; // toggle to re-run
  duration?: number; // ms
  className?: string;
}

export function CharScramble({
  text,
  trigger = true,
  duration = 800,
  className,
}: CharScrambleProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useCallback((el: number) => clearInterval(el), []);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.floor(duration / 40);

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const resolved = Math.floor(text.length * progress);

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (i < resolved) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text, trigger, duration]);

  return (
    <span className={`font-mono ${className ?? ""}`} aria-label={text}>
      {displayed}
    </span>
  );
}
```

---

### 3.3 Headline Mask Reveal (clip-path)

```tsx
// components/typography/MaskReveal.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function MaskReveal({ children, delay = 0, duration = 0.7, className }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={isInView ? { y: "0%" } : { y: "105%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Usage — each line wrapped individually:
// <MaskReveal><h2 className="text-6xl font-bold">Design</h2></MaskReveal>
// <MaskReveal delay={0.1}><h2 className="text-6xl font-bold">Build</h2></MaskReveal>
// <MaskReveal delay={0.2}><h2 className="text-6xl font-bold">Transform</h2></MaskReveal>
```

---

### 3.4 Variable Font Weight Scroll Animation

```tsx
// components/typography/ScrollWeightText.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollWeightTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
}

export function ScrollWeightText({
  text,
  className,
  minWeight = 100,
  maxWeight = 900,
}: ScrollWeightTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const weight = useTransform(scrollYProgress, [0, 1], [minWeight, maxWeight]);

  return (
    <div ref={ref}>
      <motion.span
        className={className ?? "text-7xl block"}
        style={{
          fontVariationSettings: weight.get ? `"wght" ${weight.get()}` : `"wght" ${minWeight}`,
          // For continuous updates, use style with motion value directly:
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

// Better: use a custom hook to get live value
// components/typography/ScrollWeightTextV2.tsx
"use client";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

export function ScrollWeightTextV2({
  text,
  className,
  minWeight = 100,
  maxWeight = 900,
}: {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const weight = useTransform(scrollYProgress, [0, 1], [minWeight, maxWeight]);
  const fontVariation = useMotionTemplate`"wght" ${weight}`;

  return (
    <div ref={ref}>
      <motion.span
        className={className ?? "text-7xl block"}
        style={{ fontVariationSettings: fontVariation }}
      >
        {text}
      </motion.span>
    </div>
  );
}
```

---

### 3.5 Marquee / Ticker with Pause on Hover

```tsx
// components/typography/Marquee.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full cycle
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  speed = 20,
  separator = "·",
  className,
  itemClassName,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: [0, "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          paused,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-8 ${itemClassName ?? ""}`}>
            <span>{item}</span>
            <span className="text-neutral-400">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Usage:
// <Marquee
//   items={["Renovation", "Real Estate", "Garden Suites", "Interior Design", "Architecture"]}
//   speed={25}
//   className="py-4 border-y border-neutral-200 text-2xl font-medium"
// />
```

---

### 3.6 Kinetic Split Hero (letter rearrangement)

```tsx
// components/typography/KineticSplitHero.tsx
"use client";
import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";

interface KineticSplitHeroProps {
  wordA: string;
  wordB: string;
}

export function KineticSplitHero({ wordA, wordB }: KineticSplitHeroProps) {
  const [state, setState] = useState<"a" | "b">("a");
  const word = state === "a" ? wordA : wordB;

  return (
    <div className="text-center">
      <LayoutGroup>
        <motion.h1 layout className="text-8xl font-bold inline-flex gap-1 flex-wrap justify-center">
          {word.split("").map((char, i) => (
            <motion.span
              key={`${state}-${i}`}
              layout
              layoutId={`char-${char}-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </LayoutGroup>
      <button
        onClick={() => setState((s) => (s === "a" ? "b" : "a"))}
        className="mt-8 text-sm underline text-neutral-500"
      >
        Toggle
      </button>
    </div>
  );
}
```

---

### 3.7 Typewriter with Cursor Blink

```tsx
// components/typography/Typewriter.tsx
"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
  cursorColor?: string;
}

export function Typewriter({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseMs = 1800,
  className,
  cursorColor = "currentColor",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing logic
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayText === "") {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentPhrase.slice(0, displayText.length - 1)
            : currentPhrase.slice(0, displayText.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayText}
      <span
        style={{
          display: "inline-block",
          width: "0.06em",
          height: "1em",
          backgroundColor: cursorColor,
          marginLeft: "0.05em",
          verticalAlign: "text-bottom",
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}

// Usage:
// <h1 className="text-6xl font-bold">
//   We <Typewriter phrases={["Design", "Build", "Renovate", "Transform"]} />
// </h1>
```

---

## 4. Fluid Type Scale (Tailwind + clamp)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontSize: {
        // Fluid scale: clamp(minSize, preferredVw, maxSize)
        // Formula: min at 320px, max at 1920px viewport
        "fluid-xs":   ["clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem)",  { lineHeight: "1.5" }],
        "fluid-sm":   ["clamp(0.875rem, 0.8rem  + 0.375vw, 1rem)",     { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1rem,     0.9rem  + 0.5vw,   1.125rem)", { lineHeight: "1.7" }],
        "fluid-lg":   ["clamp(1.125rem, 1rem    + 0.625vw, 1.25rem)",  { lineHeight: "1.6" }],
        "fluid-xl":   ["clamp(1.25rem,  1rem    + 1.25vw,  1.5rem)",   { lineHeight: "1.5" }],
        "fluid-2xl":  ["clamp(1.5rem,   1.1rem  + 2vw,     2rem)",     { lineHeight: "1.4" }],
        "fluid-3xl":  ["clamp(1.875rem, 1rem    + 3.75vw,  3rem)",     { lineHeight: "1.3" }],
        "fluid-4xl":  ["clamp(2.25rem,  1rem    + 5vw,     4rem)",     { lineHeight: "1.2" }],
        "fluid-5xl":  ["clamp(3rem,     1rem    + 7.5vw,   6rem)",     { lineHeight: "1.1" }],
        "fluid-6xl":  ["clamp(3.75rem,  1rem    + 10vw,    8rem)",     { lineHeight: "1.05" }],
        "fluid-7xl":  ["clamp(4.5rem,   1rem    + 13vw,    12rem)",    { lineHeight: "1" }],
        "fluid-hero": ["clamp(3rem,     -1rem   + 16vw,    16rem)",    { lineHeight: "0.95" }],
      },
      letterSpacing: {
        display: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 5. Font Pairing Recommendations for Renovation / Real Estate

### Pairing 1: Modern Minimal
- **Display:** `Inter` Variable 700–900 (free, Google Fonts) — tight tracking, clean authority
- **Body:** `Inter` 400 — consistent system, no jarring switches
- **Accent labels:** `JetBrains Mono` 400 uppercase — tech credibility for mortgage/data sections
- **Weight combo:** 900/700 display vs 400 body — contrast via weight alone
- **Variable font:** Yes — animate weight on scroll

### Pairing 2: Warm Editorial
- **Display:** `DM Serif Display` 400 (free) — editorial elegance, works at any size
- **Body:** `DM Sans` 400–500 (free, same family ecosystem)
- **Accent labels:** `DM Sans` 400 small caps via CSS `font-variant: small-caps`
- **Weight combo:** Serif display / sans body — the classic editorial contrast
- **Best for:** High-end interior renovation, architectural firms

### Pairing 3: Contemporary Bold
- **Display:** `Syne` Variable 700–800 (free, Google Fonts) — geometric, distinctive
- **Body:** `Outfit` 400–500 (free) — approachable and legible
- **Accent labels:** `Syne Mono` 400 — completes the type family system
- **Weight combo:** Heavy display (800) vs light body (400) — 2:1 contrast ratio
- **Best for:** Modern new-build developers, garden suite companies

### Pairing 4: Luxury Serif (Premium)
- **Display:** `Cormorant Garamond` Variable (free) — extreme thin/thick contrast, high fashion feel
- **Body:** `Nunito Sans` 300–400 (free) — counterbalances the ornate display
- **Accent:** `Cormorant SC` (small caps variant) for section labels
- **Weight combo:** Cormorant at 600 (looks lighter, more editorial) vs Nunito at 300
- **Best for:** Luxury real estate, heritage renovation, custom home builders

### Pairing 5: Brutalist Minimal
- **Display:** `Space Grotesk` Variable 700 (free) — slightly condensed, modern tension
- **Body:** `Space Grotesk` 400 — same family, contrast via size only
- **Accent:** No accent typeface — rely entirely on scale contrast
- **Weight combo:** 700 display, 400 body, 500 for mid-emphasis
- **Best for:** Progressive mortgage fintech, PropTech products

---

## 6. Color + Type Palettes for High-End Property Sites

### Palette 1: Modern Minimal

```ts
// tailwind.config.ts — extend colors:
const modernMinimal = {
  bg: "#f9f7f4",         // warm white — approachable, not clinical
  surface: "#f2ede7",    // card/panel background
  border: "#e4ddd4",     // subtle warm divider
  text: "#1a1714",       // near-black, warm cast
  textMuted: "#857e76",  // warm medium grey
  textSubtle: "#bab3aa", // placeholder/disabled
  accent: "#c9a96e",     // brushed gold — primary CTA
  accentHover: "#b8934f",
  accentText: "#1a1714", // text on accent buttons
};
```

```tsx
// Tailwind classes example:
// bg-[#f9f7f4] text-[#1a1714]
// Or extend in tailwind.config.ts:
// colors: { brand: { bg: "#f9f7f4", text: "#1a1714", accent: "#c9a96e" } }
// Then: bg-brand-bg text-brand-text bg-brand-accent
```

### Palette 2: Warm Organic

```ts
const warmOrganic = {
  bg: "#f0e8dc",         // warm cream — natural materials feel
  surface: "#e8dccf",
  border: "#d4c4b0",
  text: "#2c1e14",       // deep warm brown
  textMuted: "#7a6254",
  textSubtle: "#b5a090",
  accent: "#8b4513",     // saddle brown — earthy, trustworthy
  accentHover: "#73390f",
  accentLight: "#c8956c", // warm terracotta for secondary actions
};
```

### Palette 3: Dark Luxury

```ts
const darkLuxury = {
  bg: "#0f0e0c",         // near-black with warm cast — not pure black
  surface: "#1c1a17",    // subtle elevation
  border: "#2e2b26",
  text: "#f2ede7",       // warm off-white
  textMuted: "#a09880",
  textSubtle: "#5a5448",
  accent: "#c9a96e",     // gold on dark — premium contrast
  accentHover: "#e0c080",
  accentGlow: "rgba(201, 169, 110, 0.2)", // for box-shadow glow effects
};
```

```tsx
// Tailwind config snippet for dark luxury:
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: "#0f0e0c",
          surface: "#1c1a17",
          border: "#2e2b26",
          text: "#f2ede7",
          muted: "#a09880",
          accent: "#c9a96e",
          "accent-hover": "#e0c080",
        },
      },
    },
  },
};
// Usage: bg-luxury-bg text-luxury-text border-luxury-border text-luxury-accent
```
