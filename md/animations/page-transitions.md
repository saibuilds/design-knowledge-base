# Page Transitions: Complete Pattern Library

All examples use **Framer Motion**, **Next.js App Router** or **React Router v6**, and **GSAP** where noted.

---

## 1. Full-Page Slide Transitions

### Next.js App Router — `template.tsx`
```tsx
// app/template.tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### React Router v6 — AnimatePresence wrapper
```tsx
// App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const slideVariants = {
  initial: { x: "100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100vw", opacity: 0 },
};

export function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
```

### Reusable `PageTransition` wrapper
```tsx
// components/PageTransition.tsx
import { motion } from "framer-motion";

const variants = {
  initial: { x: "60px", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-60px", opacity: 0 },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 2. Curtain Wipe Reveal

### Vertical Curtain (top to bottom)
```tsx
// app/template.tsx
"use client";
import { motion } from "framer-motion";

export default function CurtainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {/* Curtain overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-black origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </div>
  );
}
```

### Split Curtain (left + right panels)
```tsx
"use client";
import { motion } from "framer-motion";

export default function SplitCurtain({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 z-50 w-1/2 h-full bg-indigo-600 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed top-0 right-0 z-50 w-1/2 h-full bg-indigo-600 origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />
      {children}
    </div>
  );
}
```

### Staggered Color Curtain (3 panels)
```tsx
"use client";
import { motion } from "framer-motion";

const panels = ["#6366f1", "#8b5cf6", "#a855f7"];

export default function StaggeredCurtain({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {panels.map((color, i) => (
        <motion.div
          key={i}
          className="fixed inset-0 z-50 origin-top"
          style={{ backgroundColor: color }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.07,
          }}
        />
      ))}
      {children}
    </div>
  );
}
```

---

## 3. Zoom In / Out Page Transition

### Zoom In on Enter, Zoom Out on Exit
```tsx
"use client";
import { motion } from "framer-motion";

export default function ZoomTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.05, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
```

### Zoom with Blur
```tsx
"use client";
import { motion } from "framer-motion";

export default function ZoomBlurTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0, filter: "blur(8px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      exit={{ scale: 1.04, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 4. Fade with Slide

### Fade + Subtle Y Slide (most common / recommended)
```tsx
"use client";
import { motion } from "framer-motion";

export default function FadeSlideTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

### Fade + Directional Slide based on route depth
```tsx
// hooks/useTransitionDirection.ts
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const routeOrder = ["/", "/about", "/services", "/contact"];

export function useTransitionDirection() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const prevIndex = routeOrder.indexOf(prevPathRef.current);
  const currIndex = routeOrder.indexOf(location.pathname);
  const direction = currIndex > prevIndex ? 1 : -1;

  useEffect(() => {
    prevPathRef.current = location.pathname;
  });

  return direction;
}

// Usage in page wrapper
function DirectionalPage({ children }: { children: React.ReactNode }) {
  const direction = useTransitionDirection();

  return (
    <motion.div
      initial={{ x: direction * 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction * -60, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Morphing Shapes Between Pages

### SVG Path Morph Transition
```tsx
"use client";
import { motion } from "framer-motion";

const morphPaths = {
  enter: "M0,0 L100,0 L100,0 L0,0",      // flat line at top
  visible: "M0,0 L100,0 L100,100 L0,100", // full rectangle
  exit: "M0,100 L100,100 L100,100 L0,100", // flat line at bottom
};

export default function MorphTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <svg
        className="fixed inset-0 w-full h-full z-50 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="#1a1a2e"
          initial={{ d: morphPaths.enter }}
          animate={{ d: morphPaths.visible }}
          exit={{ d: morphPaths.exit }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      </svg>
      {children}
    </div>
  );
}
```

### Blob Morph Between Pages
```tsx
"use client";
import { motion } from "framer-motion";

export default function BlobTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
        initial={{ scale: 0, borderRadius: "50%" }}
        animate={{ scale: 20, borderRadius: "0%" }}
        exit={{ scale: 0, borderRadius: "50%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#6366f1",
          position: "fixed",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

---

## 6. Next.js App Router Complete Setup

### `app/layout.tsx`
```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/template.tsx` — The key file for transitions
```tsx
// app/template.tsx  ← re-mounts on every navigation
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.main>
  );
}
```

> **Note:** `template.tsx` re-mounts on every route change (unlike `layout.tsx` which persists).
> This is the correct file for page exit/enter animations in Next.js App Router.

### With Loading States
```tsx
// app/loading.tsx
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-indigo-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
```

---

## 7. React Router with AnimatePresence — Full Setup

```tsx
// main.tsx
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// App.tsx
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/PageTransition";
import { HomePage, AboutPage, ContactPage } from "./pages";

export function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
```

> **Key:** Pass `location` and `key={location.key}` to `<Routes>` so AnimatePresence detects the change.

---

## 8. GSAP Page Transitions — Clip-Path Reveal

### Installation
```bash
npm install gsap
```

### GSAP Clip-Path Page Reveal
```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GSAPPageReveal({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Reveal content with clip-path
    tl.fromTo(
      overlayRef.current,
      { clipPath: "inset(0 0 0 0)" },
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      }
    ).fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-indigo-600 pointer-events-none"
      />
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
```

### GSAP Horizontal Clip-Path Wipe
```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GSAPHorizontalWipe({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.to(panelRef.current, {
            clipPath: "inset(0 0 0 100%)",
            duration: 0.6,
            ease: "power4.inOut",
            delay: 0.1,
          });
        },
      }
    );
  }, []);

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 bg-black pointer-events-none"
      />
      <div>{children}</div>
    </div>
  );
}
```

### GSAP Full Transition Manager (custom hooks)
```tsx
// hooks/useGSAPTransition.ts
import { useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export function useGSAPTransition() {
  const router = useRouter();

  const navigateTo = (href: string) => {
    const overlay = document.getElementById("page-overlay");
    if (!overlay) return router.push(href);

    gsap.to(overlay, {
      clipPath: "inset(0 0 0 0)",
      duration: 0.5,
      ease: "power4.inOut",
      onComplete: () => router.push(href),
    });
  };

  useEffect(() => {
    const overlay = document.getElementById("page-overlay");
    if (!overlay) return;

    gsap.to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.6,
      ease: "power4.inOut",
      delay: 0.1,
    });
  }, []);

  return { navigateTo };
}

// Add to layout.tsx:
// <div id="page-overlay" className="fixed inset-0 z-50 bg-indigo-600 pointer-events-none" style={{ clipPath: "inset(0 0 100% 0)" }} />
```

---

## Transition Timing Reference

| Type | Duration | Easing |
|------|----------|--------|
| Subtle fade | 200–300ms | `easeOut` |
| Slide + fade | 350–450ms | `[0.22, 1, 0.36, 1]` |
| Curtain wipe | 500–650ms | `[0.76, 0, 0.24, 1]` |
| GSAP clip reveal | 600–800ms | `power4.inOut` |
| Full dramatic | 700–1000ms | `[0.76, 0, 0.24, 1]` |

## Dependencies
```bash
npm install framer-motion
npm install gsap
npm install react-router-dom   # if using React Router
```
