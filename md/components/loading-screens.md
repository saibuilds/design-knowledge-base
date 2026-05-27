# Loading Screens — Preloaders, Skeletons, Progress Bars

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, GSAP 3 + ScrollTrigger.

---

## 1. Concepts

A preloader buys time for critical assets while giving the user a branded first impression. The exit animation is as important as the entrance — a clean curtain wipe or fade-out sets tone for the rest of the site.

Patterns covered:
- **Counter preloader**: 0 → 100% numeric count + logo reveal
- **Curtain wipe exit**: full-screen panel slides up off-screen
- **React context**: global `loaded` state consumed by page components
- **Skeleton loaders**: card and image placeholders with shimmer
- **Progress bar**: top-edge thin bar (YouTube/GitHub style)

---

## 2. React Context — Global Loaded State

```tsx
// context/LoaderContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoaderContextValue {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  loaded: false,
  setLoaded: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoaderContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
```

```tsx
// app/layout.tsx — wrap root with provider
import { LoaderProvider } from "@/context/LoaderContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}
```

---

## 3. Counter 0→100 + Logo Reveal + Curtain Wipe Exit

```tsx
// components/loading/Preloader.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoader } from "@/context/LoaderContext";

export function Preloader() {
  const { setLoaded } = useLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaded(true);
          // Curtain wipe exit — panel slides up
          gsap.to(curtainRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => setVisible(false),
          });
        },
      });

      // Counter 0 → 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate() {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0");
          }
        },
      });

      // Logo reveal (clip-path wipe up)
      tl.fromTo(
        logoRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      // Brief hold so logo is visible
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, [setLoaded]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999]">
      {/* Curtain panel */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center"
      >
        {/* Counter */}
        <span
          ref={countRef}
          className="font-mono text-[clamp(3rem,10vw,8rem)] text-white leading-none tabular-nums"
        >
          000
        </span>

        {/* Logo */}
        <div ref={logoRef} className="mt-8">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
            <rect width="120" height="32" rx="2" fill="white" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
              fill="#1a1a1a" fontFamily="sans-serif" fontSize="14" fontWeight="600">
              STUDIO
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
```

```tsx
// Usage in app/page.tsx
import { Preloader } from "@/components/loading/Preloader";
import { PageContent } from "@/components/PageContent";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <PageContent />
    </>
  );
}
```

---

## 4. Page Content — Animate In After Load

```tsx
// components/PageContent.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoader } from "@/context/LoaderContext";

export function PageContent() {
  const { loaded } = useLoader();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [loaded]);

  return (
    <div ref={ref} style={{ opacity: 0 }} className="min-h-screen p-16">
      <h1 className="text-6xl font-bold">Hello World</h1>
    </div>
  );
}
```

---

## 5. Skeleton Loaders

### Card Skeleton

```tsx
// components/loading/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-neutral-100 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-[4/3] bg-neutral-200" />
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        {/* Subtitle */}
        <div className="h-3 bg-neutral-200 rounded w-1/2" />
        {/* Body lines */}
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="h-3 bg-neutral-200 rounded w-5/6" />
        </div>
        {/* CTA */}
        <div className="h-8 bg-neutral-200 rounded w-28 mt-2" />
      </div>
    </div>
  );
}
```

### Image Skeleton with shimmer (CSS only)

```css
/* globals.css */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #e5e5e5 25%,
    #f0f0f0 50%,
    #e5e5e5 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
}
```

```tsx
// components/loading/SkeletonImage.tsx
export function SkeletonImage({ aspectRatio = "aspect-video" }: { aspectRatio?: string }) {
  return (
    <div className={`w-full ${aspectRatio} rounded-lg skeleton-shimmer`} />
  );
}
```

### Skeleton grid (3 cards)

```tsx
// components/loading/SkeletonGrid.tsx
import { SkeletonCard } from "./SkeletonCard";

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
```

---

## 6. Progress Bar Loader (top-edge, YouTube-style)

```tsx
// components/loading/ProgressBar.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ProgressBarProps {
  /** 0–100 */
  progress: number;
  color?: string;
}

export function ProgressBar({ progress, color = "#8b6914" }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: "power1.out",
    });
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] bg-transparent">
      <div
        ref={barRef}
        style={{ width: "0%", backgroundColor: color }}
        className="h-full transition-none"
      />
    </div>
  );
}
```

```tsx
// Usage — drive with simulated or real progress
"use client";
import { useState, useEffect } from "react";
import { ProgressBar } from "@/components/loading/ProgressBar";

export function PageWithProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate: replace with real asset-load tracking
    const intervals = [
      setTimeout(() => setProgress(30), 200),
      setTimeout(() => setProgress(60), 600),
      setTimeout(() => setProgress(85), 1000),
      setTimeout(() => setProgress(100), 1600),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <>
      {progress < 100 && <ProgressBar progress={progress} />}
      <main>…</main>
    </>
  );
}
```

---

## 7. Tailwind Config — animate-pulse is built-in

`animate-pulse` ships with Tailwind v3. No extra config needed. For custom shimmer, add to `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;
```
