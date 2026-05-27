# Agency Portfolio Patterns — Awwwards Leaders

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, Framer Motion 11, GSAP + ScrollTrigger, Lenis.

---

## 1. What Separates Award-Winning Agency Sites

### Layout Philosophy
Award-winning agency portfolios treat layout as communication: empty space signals premium, tight density signals productivity. The grid is used deliberately — broken only to create emphasis, never out of laziness. Most use a strict baseline grid (8px increments) but allow one "hero violation" per page where a single element bleeds outside.

### Motion Hierarchy
Motion is never decorative alone — it always encodes meaning:
- **Primary motion**: page transitions, major reveals (600–1200ms)
- **Secondary motion**: hover states, focus rings (150–300ms)
- **Ambient motion**: background gradients, particles (3–10s cycles, very subtle)

Award sites never run all three levels simultaneously at full intensity.

### Cursor Design
A custom cursor is expected on award-winning agency sites. The cursor communicates context:
- Default: small circle (12–16px)
- Over link/button: expanded circle (40px) + label text
- Over draggable: crosshair or "drag" text
- Over video: "play" label

### Case Study Structure
1. Full-bleed hero (image or video)
2. Brief (1–2 sentences, no padding, typographic emphasis)
3. Role + scope (small type, right-aligned)
4. Process content (alternating image/text, breathing room)
5. Results / impact (large stats, minimal decoration)
6. Next project CTA (persistent, bottom-right)

---

## 2. Agency Profiles

---

### 1. Locomotive (locomotive.ca)

**Signature Technique:** Invented Locomotive Scroll (now Lenis). The scroll lerp is the brand.

**Color System:** Deep black `#0a0a0a`, white `#f5f5f5`, electric teal accent `#00ebd6` — used sparingly.

**Typography Stack:**
- Headlines: custom variable sans (or Neue Montreal Bold/Black)
- Body: Neue Montreal Regular 16–18px, 1.6 line-height
- Labels: Suisse Int'l Mono 11px uppercase

**Navigation Pattern:** Full-height sidebar (desktop), logo left + minimal links right. Collapses to hamburger + full-screen overlay (mobile).

**Case Study Structure:** Horizontal scroll panels per project, pinned while user scrolls vertically.

**Code Pattern — Lenis + GSAP ScrollTrigger Provider:**

```tsx
// providers/SmoothScrollProvider.tsx
"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Feed Lenis time into GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Connect Lenis scroll to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}

// app/layout.tsx usage:
// <SmoothScrollProvider>
//   <main>{children}</main>
// </SmoothScrollProvider>
```

---

### 2. Resn (resn.co.nz)

**Signature Technique:** Each project page is a standalone interactive experience — defies typical case study format.

**Color System:** No fixed palette — each project inherits the brand's identity. Agency nav: white on black.

**Typography Stack:** Custom display font per project; agency UI uses Helvetica Neue (intentionally plain to not compete with client work).

**Navigation Pattern:** Minimal — just a logo and a single "Work" link. Trust comes from the work quality, not the nav complexity.

**Case Study Structure:** There is none — the project IS the experience.

**Code Pattern — Full-Screen Interactive Section:**

```tsx
// components/InteractiveSection.tsx
"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface InteractiveSectionProps {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export function InteractiveSection({
  children,
  bgColor = "#0a0a0a",
  textColor = "#f5f5f5",
}: InteractiveSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const bgX = useTransform(mouseX, [0, 1], ["-3%", "3%"]);
  const bgY = useTransform(mouseY, [0, 1], ["-3%", "3%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{ backgroundColor: bgColor, color: textColor }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX / rect.width);
        mouseY.set(e.clientY / rect.height);
      }}
    >
      <motion.div
        className="absolute inset-[-5%]"
        style={{ x: bgX, y: bgY }}
      >
        {/* Background layer moves against cursor */}
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-8">{children}</div>
    </div>
  );
}
```

---

### 3. Obys Agency (obys.agency)

**Signature Technique:** Kinetic typography — every headline element has an independent entrance animation with dramatic stagger.

**Color System:** Black `#000`, white `#fff`, one project-specific accent per case study. No persistent accent globally.

**Typography Stack:** Editorial grotesque (similar to Editorial New or Playfair Display for numerals), Neue Montreal for body. Extreme scale contrast: 12px label vs 120px display headline on same screen.

**Navigation Pattern:** Minimal top bar with index number + project title on scroll. Full-screen overlay menu with project thumbnails.

**Case Study Structure:** Numbered sections, each with a large editorial photograph and oversize index number.

**Code Pattern — Oversized Index Number with Scroll Scale:**

```tsx
// components/IndexedSection.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface IndexedSectionProps {
  index: number;
  title: string;
  children: React.ReactNode;
}

export function IndexedSection({ index, title, children }: IndexedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const numberScale = useTransform(scrollYProgress, [0, 0.5], [2.5, 1]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen py-24 px-8">
      <motion.span
        className="absolute top-8 left-8 text-[20vw] font-bold text-neutral-100 leading-none select-none pointer-events-none"
        style={{ scale: numberScale, opacity: numberOpacity, originX: 0, originY: 0 }}
      >
        {String(index).padStart(2, "0")}
      </motion.span>
      <div className="relative z-10 max-w-4xl mx-auto mt-32">
        <h2 className="text-5xl md:text-7xl font-bold mb-12">{title}</h2>
        {children}
      </div>
    </div>
  );
}
```

---

### 4. Basement Studio (basement.studio)

**Signature Technique:** Film grain + electric green glow on deep black. The aesthetic is "underground tech meets brutalism."

**Color System:** `#000000` background, `#00ff88` accent (electric green), `#1a1a1a` surface, `#666` muted text.

**Typography Stack:** `JetBrains Mono` or `IBM Plex Mono` for code/labels, `Neue Haas Grotesk` or `Inter` for body.

**Navigation Pattern:** Top bar with mono-spaced nav items and a blinking cursor `_` symbol at active item.

**Code Pattern — Glowing Card:**

```tsx
// components/GlowCard.tsx
"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export function GlowCard({
  children,
  glowColor = "#00ff88",
  className = "",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden ${className}`}
      whileHover={{ borderColor: glowColor }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: "0 0 0 rgba(0,255,136,0)",
      }}
      animate={{}}
      whileHover_boxShadow={`0 0 40px ${glowColor}30, 0 0 80px ${glowColor}10`}
    >
      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}15 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
```

---

### 5. Refokus (refokus.com)

**Signature Technique:** Corner-origin page transitions. Bold asymmetric grid.

**Color System:** Monochromatic by project. Agency chrome: `#f2f0eb` warm off-white, `#111` type.

**Typography Stack:** `Neue Montreal` (licensed) or `DM Sans` (free alt) for all levels. Extreme weight contrast: 900 display vs 400 body.

**Navigation Pattern:** Fixed top bar, very small type. Links have underline that extends right on hover.

**Code Pattern — Corner Wipe Page Transition:**

```tsx
// components/PageTransition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const VARIANTS = {
  enter: {
    clipPath: "circle(0% at 100% 0%)",
  },
  center: {
    clipPath: "circle(150% at 100% 0%)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="enter"
        animate="center"
        exit="exit"
        variants={VARIANTS}
        className="min-h-screen"
      >
        {/* Overlay curtain */}
        <motion.div
          className="fixed inset-0 z-[100] bg-neutral-900 pointer-events-none"
          initial={{ clipPath: "circle(150% at 100% 0%)" }}
          animate={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0], delay: 0.1 }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// app/layout.tsx:
// <PageTransition>{children}</PageTransition>
```

---

### 6. Monopo (monopo.london)

**Signature Technique:** Japanese ma (negative space) philosophy. Content is sparse and intentional. Bilingual (EN/JP) used as texture.

**Color System:** Pure white, pure black, rare burgundy `#8b0000` accent.

**Typography Stack:** `Suisse Int'l` for Latin, `Noto Sans JP` for Japanese. Headlines at exactly 50% of viewport width.

**Navigation Pattern:** Ultra-minimal — logo only in top-left, `Menu` text (not hamburger icon) in top-right.

**Code Pattern — Minimalist Work List:**

```tsx
// components/WorkList.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface WorkItem {
  slug: string;
  index: number;
  titleEn: string;
  titleJa?: string;
  category: string;
  year: string;
}

interface WorkListProps {
  items: WorkItem[];
}

export function WorkList({ items }: WorkListProps) {
  return (
    <ul className="divide-y divide-neutral-100">
      {items.map((item, i) => (
        <motion.li
          key={item.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href={`/work/${item.slug}`}
            className="group flex items-baseline justify-between py-6 hover:pl-4 transition-[padding] duration-300"
          >
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-neutral-400 font-mono w-6">
                {String(item.index).padStart(2, "0")}
              </span>
              <span className="text-xl font-medium">{item.titleEn}</span>
              {item.titleJa && (
                <span className="text-sm text-neutral-400 hidden md:block">{item.titleJa}</span>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <span className="hidden md:block">{item.category}</span>
              <span>{item.year}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
```

---

### 7. Active Theory (activetheory.net)

See `immersive-3d-sites.md` for full profile. Portfolio-specific note: project navigation is handled entirely inside the WebGL scene — clicking a particle cluster navigates to that project.

---

### 8. Hi-ReS! (hi-res.co.uk)

**Signature Technique:** Long-standing creative studio — award winner for two decades. Their current site balances heritage (established 1999) with contemporary craft.

**Color System:** Dark charcoal `#1c1c1c`, sand `#e8dcc8`, minimal.

**Typography Stack:** `GT Sectra` (editorial serif) paired with `Helvetica Neue`. The serif/sans contrast does the heavy lifting.

**Navigation Pattern:** Sticky nav shrinks on scroll — full logo + links → icon only.

**Code Pattern — Sticky Nav that Shrinks:**

```tsx
// components/ShrinkingNav.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface NavLink { href: string; label: string; }

export function ShrinkingNav({ links }: { links: NavLink[] }) {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [80, 56]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const bg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]);
  const shadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(0,0,0,0)", "0 2px 20px rgba(0,0,0,0.08)"]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
      style={{ height, backgroundColor: bg, boxShadow: shadow }}
    >
      <motion.div style={{ scale: logoScale, originX: 0 }}>
        <Link href="/" className="text-xl font-bold tracking-tight">
          YourBrand
        </Link>
      </motion.div>
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
```

---

### 9. HAUS (haus.io)

**Signature Technique:** Brand + motion studio — their site IS a brand identity system in motion. Color generates from each project's identity.

**Color System:** White canvas, color injected per project via CSS custom properties.

**Typography Stack:** `ABC Diatype` (licensed), fallback: `DM Sans`. Very tight letter-spacing on display type (-0.04em).

**Code Pattern — CSS Custom Property Theme Switching:**

```tsx
// components/ThemeProvider.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Theme {
  bg: string;
  surface: string;
  text: string;
  accent: string;
}

const THEMES: Record<string, Theme> = {
  default: { bg: "#ffffff", surface: "#f5f5f5", text: "#111111", accent: "#c9a96e" },
  dark: { bg: "#0a0a0a", surface: "#1a1a1a", text: "#f5f5f5", accent: "#c9a96e" },
  warm: { bg: "#f5efe6", surface: "#ede3d4", text: "#2c1810", accent: "#8b4513" },
  green: { bg: "#0f1f0f", surface: "#1a2e1a", text: "#c8dfc8", accent: "#4caf50" },
};

const ThemeContext = createContext<{ theme: Theme; setThemeKey: (k: string) => void }>({
  theme: THEMES.default,
  setThemeKey: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKey] = useState("default");
  const theme = THEMES[themeKey] ?? THEMES.default;

  return (
    <ThemeContext.Provider value={{ theme, setThemeKey }}>
      <div
        style={{
          "--bg": theme.bg,
          "--surface": theme.surface,
          "--text": theme.text,
          "--accent": theme.accent,
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          transition: "background-color 0.6s ease, color 0.4s ease",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

---

### 10. ustwo (ustwo.com)

**Signature Technique:** Product design studio — site mirrors their user-centered process. Clear information hierarchy, purpose before aesthetics.

**Color System:** Slate `#1a1a2e`, white, product-color accents per case study.

**Code Pattern — Case Study Hero:**

```tsx
// components/CaseStudyHero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  client: string;
  services: string[];
  year: string;
  imageSrc: string;
  accentColor?: string;
}

export function CaseStudyHero({
  title, client, services, year, imageSrc, accentColor = "#c9a96e"
}: CaseStudyHeroProps) {
  return (
    <section className="relative min-h-screen grid grid-rows-[1fr_auto]">
      {/* Full-bleed image */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={imageSrc} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Title */}
        <div className="relative z-10 flex items-end h-full p-8 md:p-16 pb-24 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-bold max-w-4xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* Meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-3 border-t"
        style={{ borderColor: accentColor }}
      >
        <div className="p-6 border-r border-neutral-200">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Client</p>
          <p className="font-medium">{client}</p>
        </div>
        <div className="p-6 border-r border-neutral-200">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Services</p>
          <p className="font-medium">{services.join(", ")}</p>
        </div>
        <div className="p-6">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Year</p>
          <p className="font-medium">{year}</p>
        </div>
      </motion.div>
    </section>
  );
}
```

---

### 11. Fantasy (fantasy.co)

**Signature Technique:** Product design studio — work is shown in context (device mockups that are themselves motion-designed).

**Color System:** Deep navy `#0d1117`, electric blue `#0066ff`, white.

**Code Pattern — Device Mockup with Scroll Float:**

```tsx
// components/DeviceMockup.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface DeviceMockupProps {
  screenSrc: string;
  deviceType?: "phone" | "laptop";
}

export function DeviceMockup({ screenSrc, deviceType = "phone" }: DeviceMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);

  const isPhone = deviceType === "phone";

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative mx-auto ${isPhone ? "w-48 md:w-64" : "w-full max-w-2xl"}`}
    >
      {/* Device frame */}
      <div className={`relative ${isPhone ? "rounded-[2.5rem]" : "rounded-xl"} border-4 border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl`}>
        {/* Screen */}
        <div className={`relative ${isPhone ? "aspect-[9/19.5]" : "aspect-[16/10]"} overflow-hidden`}>
          <Image src={screenSrc} alt="App screen" fill className="object-cover" />
        </div>
      </div>
      {/* Reflection */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
```

---

### 12. Huge (hugeinc.com)

**Signature Technique:** Large agency discipline — rigorous grid, case studies structured like annual reports but feel like editorial.

**Code Pattern — Stats Bar:**

```tsx
// components/StatsBar.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Stat { value: string; label: string; }

export function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 border-t border-neutral-200">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 border-r border-b border-neutral-200 last:border-r-0"
        >
          <p className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{stat.value}</p>
          <p className="text-sm text-neutral-500">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 3. Reusable Agency Portfolio Patterns

---

### 3.1 Magnetic Cursor Component

```tsx
// components/MagneticCursor.tsx
// See sotd-winners.md #1 — Locomotive pattern above
// Extended with label support:
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);

  const springX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const cursor = el.closest("[data-cursor-label]");
      if (cursor) {
        setLabel(cursor.getAttribute("data-cursor-label") ?? "");
        setExpanded(true);
      } else if (el.closest("a, button")) {
        setLabel("");
        setExpanded(true);
      } else {
        setExpanded(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{
        width: expanded ? (label ? 96 : 48) : 12,
        height: expanded ? (label ? 96 : 48) : 12,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {label && (
        <motion.span
          className="text-black text-[10px] font-medium uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: expanded ? 1 : 0 }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

// Usage: wrap any element with data-cursor-label="View Work"
// <div data-cursor-label="View Work"><ProjectCard /></div>
```

---

### 3.2 Work Grid with Hover Video Preview

```tsx
// components/WorkGrid.tsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  videoSrc?: string;
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="relative bg-white overflow-hidden group block"
          onMouseEnter={() => setHoveredSlug(project.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Video overlay */}
            <AnimatePresence>
              {hoveredSlug === project.slug && project.videoSrc && (
                <motion.video
                  key="video"
                  src={project.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
          {/* Meta */}
          <div className="p-6 flex items-baseline justify-between">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

---

### 3.3 Page Transition with Curtain Wipe

```tsx
// components/CurtainTransition.tsx
// See Refokus pattern above (PageTransition) for corner variant.
// Below: vertical curtain (top to bottom):
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function CurtainTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Curtain overlay */}
      <AnimatePresence>
        <motion.div
          key={`curtain-${pathname}`}
          className="fixed inset-0 z-[200] bg-neutral-900 origin-top pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
      </AnimatePresence>
    </>
  );
}
```

---

### 3.4 Kinetic Typography Hero

```tsx
// components/KineticHero.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface KineticHeroProps {
  words: string[];
  className?: string;
}

export function KineticHero({ words, className }: KineticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split each word's inner text into characters manually
      const wordEls = containerRef.current?.querySelectorAll("[data-word]");
      wordEls?.forEach((wordEl) => {
        const text = wordEl.textContent ?? "";
        wordEl.innerHTML = text
          .split("")
          .map(
            (char) =>
              `<span style="display:inline-block;overflow:hidden;"><span data-char style="display:inline-block;">${char === " " ? "&nbsp;" : char}</span></span>`
          )
          .join("");
      });

      const chars = containerRef.current?.querySelectorAll("[data-char]");
      gsap.from(chars ?? [], {
        y: "115%",
        duration: 0.8,
        stagger: 0.025,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-4 ${className ?? ""}`}>
      {words.map((word, i) => (
        <span key={i} data-word className="text-6xl md:text-9xl font-bold">
          {word}
        </span>
      ))}
    </div>
  );
}
```

---

### 3.5 Horizontal Scroll Case Study

```tsx
// components/HorizontalCaseStudy.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface CasePanel {
  id: string;
  imageSrc: string;
  caption: string;
}

export function HorizontalCaseStudy({ panels }: { panels: CasePanel[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div ref={trackRef} className="flex h-screen items-center gap-8 pl-[10vw]">
        {panels.map((panel) => (
          <div key={panel.id} className="relative flex-none w-[60vw] h-[70vh] overflow-hidden rounded-xl">
            <Image
              src={panel.imageSrc}
              alt={panel.caption}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm">{panel.caption}</p>
            </div>
          </div>
        ))}
        {/* Trailing space */}
        <div className="flex-none w-[10vw]" />
      </div>
    </section>
  );
}
```

---

## 4. Applying Agency Patterns to Real Estate / Renovation

| Agency Pattern | Real Estate Application | Component |
|---------------|------------------------|-----------|
| Numbered work list | Services / project phase list | `WorkRow` (expandable) |
| Case study hero | Project portfolio hero | `CaseStudyHero` |
| Horizontal scroll panels | Before/during/after photography | `HorizontalCaseStudy` |
| Kinetic title reveal | "Design. Build. Live." hero | `KineticHero` |
| Video hover preview | Project card shows walkthrough video | `WorkGrid` |
| Stats bar | "247 projects / $4.2M saved / 100% on time" | `StatsBar` |
| Film grain | Artisanal renovation brand feel | `FilmGrain` |
| Magnetic cursor | Gallery interaction | `MagneticCursor` |
| Device mockup | App or portal screenshot showcase | `DeviceMockup` |
| Smooth scroll provider | All pages | `SmoothScrollProvider` |

**Color system recommendation for luxury renovation:**
```ts
// Warm Minimal — agency-quality palette for high-end reno
const palette = {
  bg: "#f5f0ea",        // warm parchment
  surface: "#ede4d9",   // slightly deeper warm
  border: "#d4c5b2",    // warm divider
  text: "#1c1510",      // near-black warm
  textMuted: "#8a7a6a", // warm grey
  accent: "#c9a96e",    // brushed gold
  accentDark: "#8b6914",// deep gold
};
```
