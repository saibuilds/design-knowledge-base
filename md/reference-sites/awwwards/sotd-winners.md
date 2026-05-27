# Awwwards SOTD Winners — Technique Breakdowns

> Stack context: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS v3,
> Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis, React Three Fiber + Drei.
> Target: high-end renovation / real estate / mortgage / garden suite sites.

---

## Site Profiles

---

### 1. Locomotive (locomotive.ca)

**Category:** Agency portfolio
**Studio/Agency:** Locomotive (Montreal)
**Tech Stack:** Nuxt.js (their own stack), Locomotive Scroll (they built it), custom WebGL

#### What Makes It Award-Winning
- Invented and perfected momentum-based smooth scroll — every pixel has intentional inertia
- Work grid uses a staggered reveal with precise 80ms per-item delay
- Full-bleed video case study heroes with scroll-linked opacity fade
- Custom cursor that morphs (circle → arrow → text label) contextually
- Dark/light mode toggle with a full-page radial wipe transition

#### Key Animation Patterns
- Scroll lerp: `lerp = 0.1` (slow, luxurious feel)
- Reveal easing: `cubic-bezier(0.16, 1, 0.3, 1)` — expo out, 700ms
- Cursor morph: 200ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight spring overshoot)

#### Code Pattern (Replicable) — Magnetic Cursor

```tsx
// components/MagneticCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const isPointer = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isPointer.set(el.closest("a, button, [data-cursor]") ? 1 : 0);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY, isPointer]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{
        width: isPointer.get() ? 40 : 16,
        height: isPointer.get() ? 40 : 16,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    />
  );
}
```

#### Relevance to Renovation/Real Estate
Apply the morphing cursor to project gallery cards — cursor text reads "View Project" on hover over renovation before/after images.

---

### 2. Resn (resn.co.nz)

**Category:** Interactive agency
**Studio/Agency:** Resn (New Zealand)
**Tech Stack:** Custom WebGL engine, Three.js, vanilla JS

#### What Makes It Award-Winning
- Every project is a standalone interactive experience, not a case study page
- Physics-based UI elements (things fall, bounce, respond to gravity)
- Audio-reactive visuals on select projects
- Unexpected interactions — hovering triggers sound design + motion
- Zero predictable layout — each page defies convention

#### Key Animation Patterns
- Physics: spring `mass=1, stiffness=120, damping=14` (noticeable bounce)
- Gravity sim: velocity accumulates at `9.8px/frame²`, dampened at floor collision
- Transitions: 600ms fade with simultaneous scale `0.95 → 1`

#### Code Pattern (Replicable) — Physics Spring Card

```tsx
// components/PhysicsCard.tsx
"use client";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";

interface PhysicsCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PhysicsCard({ children, className }: PhysicsCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14, mass: 1 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14, mass: 1 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 12);
    rotateY.set(dx * 12);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

#### Relevance to Renovation/Real Estate
Use physics tilt on material sample cards or property feature cards — makes premium materials feel tangible.

---

### 3. Active Theory (activetheory.net)

**Category:** Immersive 3D / Agency
**Studio/Agency:** Active Theory (LA)
**Tech Stack:** React Three Fiber, custom GLSL, post-processing pipeline

#### What Makes It Award-Winning
- Full-screen WebGL canvas IS the site — no traditional layout underneath
- Custom post-processing: bloom, chromatic aberration, film grain stacked
- Particle systems that respond to audio and cursor position
- Seamless 3D → 2D transitions using CSS3D + WebGL composite
- Load screen itself is an experience (progress visualized as 3D geometry)

#### Key Animation Patterns
- Camera dolly: ease `power3.inOut`, 1200ms per section transition
- Particles: `useFrame` delta-time based, 60fps target
- Post FX: bloom intensity 0.8, chromatic aberration offset 0.003

#### Code Pattern (Replicable) — Particle Field with Mouse Attraction

```tsx
// components/three/ParticleField.tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export function ParticleField({ count = 2000, color = "#ffffff" }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport, mouse } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.04;
    mesh.current.rotation.x = t * 0.02;
    // Mouse attraction
    mesh.current.position.x += (mouse.x * viewport.width * 0.1 - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (mouse.y * viewport.height * 0.1 - mesh.current.position.y) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}
```

#### Relevance to Renovation/Real Estate
Particle field with warm gold `#c9a96e` tones as a luxury hero background — particles form floor plan shapes.

---

### 4. Aristide Benoist (aristidebenoist.com)

**Category:** Portfolio
**Studio/Agency:** Independent (NY)
**Tech Stack:** Three.js, custom GLSL shaders, GSAP

#### What Makes It Award-Winning
- GLSL displacement shader warps images on hover — liquid distortion effect
- Typography uses a variable font with weight animated on scroll
- Grid layout with precise golden-ratio proportions
- Each project preview uses a custom shader transition (not a crossfade)
- Minimal color palette — black, white, one accent — lets motion do all the work

#### Key Animation Patterns
- Distortion: `uAmplitude` uniform animated from 0 → 0.3 over 400ms, ease `power2.out`
- Variable font weight: 100 → 900 over scroll distance of 200px
- Page transition: 900ms, custom shader wipe

#### Code Pattern (Replicable) — Image Hover Distortion (CSS approach)

```tsx
// components/DistortionImage.tsx
"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface DistortionImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function DistortionImage({ src, alt, width, height }: DistortionImageProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const skewX = useTransform(springX, [0, 1], [-4, 4]);
  const skewY = useTransform(springY, [0, 1], [-4, 4]);
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className="overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
        scale.set(1.04);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        scale.set(1);
      }}
    >
      <motion.div style={{ skewX, skewY, scale: scaleSpring }}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </motion.div>
    </motion.div>
  );
}
```

#### Relevance to Renovation/Real Estate
Apply distortion on before/after renovation images — makes the reveal interactive and premium.

---

### 5. Roboto Studio (robotostudio.com)

**Category:** Product / Agency
**Studio/Agency:** Roboto Studio (Ukraine)
**Tech Stack:** React, GSAP, custom canvas

#### What Makes It Award-Winning
- Scroll-synced 3D product rotation (product turns as user scrolls)
- Precise typographic grid with deliberate negative space
- Color transitions driven by scroll position — background hue shifts
- Each section has a unique entry animation, never repeated
- Sticky navigation that morphs on scroll (full nav → minimal pill)

#### Key Animation Patterns
- Scroll-synced rotation: `gsap.to(obj, { rotation: 360, scrollTrigger: { scrub: 1 } })`
- Background hue shift: CSS custom property animated via GSAP
- Nav morph: 300ms, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

#### Code Pattern (Replicable) — Scroll-Synced Background Color

```tsx
// components/ScrollColorSection.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { bg: "#f5f0ea", text: "#1a1a1a" },
  { bg: "#1a1a2e", text: "#e8e0d5" },
  { bg: "#2d4a22", text: "#f0ede8" },
  { bg: "#f5f0ea", text: "#1a1a1a" },
];

export function ScrollColorSection({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: `[data-section="${i}"]`,
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to("body", { backgroundColor: section.bg, color: section.text, duration: 0.6, ease: "power2.out" }),
          onEnterBack: () =>
            gsap.to("body", { backgroundColor: section.bg, color: section.text, duration: 0.6, ease: "power2.out" }),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
```

#### Relevance to Renovation/Real Estate
Color sections map to project phases: planning (warm cream) → construction (dark slate) → completion (natural green).

---

### 6. Monopo (monopo.london)

**Category:** Agency portfolio
**Studio/Agency:** Monopo (London/Tokyo)
**Tech Stack:** Nuxt, GSAP, Locomotive Scroll

#### What Makes It Award-Winning
- Japanese-influenced ma (negative space) — content breathes
- Bilingual layout (EN/JP) used as a design element, not just translation
- Work presented as an editorial spread, not a card grid
- Hover states reveal project details via a sliding drawer, not a tooltip
- Extremely restrained color — black, white, occasional deep red

#### Key Animation Patterns
- Hover drawer: `height: 0 → auto` via GSAP `gsap.to(el, { height: "auto" })` with clipPath
- Text fade: opacity 0 → 1, y 20 → 0, 500ms, staggered 60ms
- Page enter: clip-path `inset(100% 0 0 0)` → `inset(0% 0 0 0)`, 800ms

#### Code Pattern (Replicable) — Sliding Reveal Drawer

```tsx
// components/HoverDrawer.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HoverDrawerProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export function HoverDrawer({ trigger, content }: HoverDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-10 w-full bg-white pt-3"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Use the drawer pattern for service list items — hover reveals scope, timeline, and starting price without a page navigate.

---

### 7. Superlist (superlist.com)

**Category:** Product (SaaS)
**Studio/Agency:** Superlist + Ueno
**Tech Stack:** React, Framer Motion, custom scroll

#### What Makes It Award-Winning
- Feature sections are pinned — product UI animates in as user scrolls through
- Micro-interactions on every interactive element, nothing is static
- "Momentum" feel — elements have trailing animation, never instant
- Dark-to-light theme transition mid-scroll
- Product screenshots feel 3D (subtle perspective tilt + shadow depth)

#### Key Animation Patterns
- Pinned feature: GSAP `pin: true`, `scrub: 1.5` (extra smooth)
- UI element stagger: 40ms per item, `easeOut` cubic
- Perspective tilt: `rotateX: -8deg` at rest, `0deg` on hover over 300ms

#### Code Pattern (Replicable) — Pinned Feature Scroll

```tsx
// components/PinnedFeatureSection.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PinnedFeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".feature-panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          snap: 1 / (panels.length - 1),
          end: () => `+=${(panelsRef.current?.offsetWidth ?? 0)}`,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div ref={panelsRef} className="flex">
        {["Design", "Build", "Launch"].map((label) => (
          <div key={label} className="feature-panel min-w-full h-screen flex items-center justify-center">
            <h2 className="text-6xl font-bold">{label}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### Relevance to Renovation/Real Estate
Pinned horizontal scroll for renovation phases: Design → Permit → Build → Handover, each panel shows deliverables.

---

### 8. Linear (linear.app)

**Category:** Product (SaaS)
**Studio/Agency:** Linear (in-house)
**Tech Stack:** Next.js, Framer Motion, custom canvas

#### What Makes It Award-Winning
- Speed is the brand — UI animations are fast (150–250ms), never sluggish
- "Speed blur" effect: fast-moving elements get motion blur via box-shadow trail
- Deep dark UI with carefully tuned purple/blue glow accents
- Section transitions use a shared-layout expand, not a page navigate
- Gradient meshes that slowly animate — living backgrounds, not static

#### Key Animation Patterns
- Speed blur: `filter: blur(2px)` applied during movement, removed at rest
- Glow pulse: `box-shadow` animated with `gsap.to`, repeating with `yoyo: true`
- Mesh gradient: CSS `background-position` animated slowly, 8s cycle

#### Code Pattern (Replicable) — Animated Mesh Gradient Background

```tsx
// components/MeshGradientBg.tsx
"use client";
import { motion } from "framer-motion";

const BLOBS = [
  { color: "rgba(139, 92, 246, 0.4)", x: "20%", y: "30%" },
  { color: "rgba(59, 130, 246, 0.3)", x: "70%", y: "20%" },
  { color: "rgba(16, 185, 129, 0.2)", x: "50%", y: "70%" },
];

export function MeshGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-950">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            background: blob.color,
            width: "40vw",
            height: "40vw",
            left: blob.x,
            top: blob.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: ["-10%", "10%", "-5%", "10%", "-10%"],
            y: ["-10%", "5%", "10%", "-5%", "-10%"],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Warm amber/terracotta mesh gradient (`rgba(201, 169, 110, 0.3)`) as hero background for luxury renovation landing pages.

---

### 9. Stripe Press (press.stripe.com)

**Category:** Editorial
**Studio/Agency:** Stripe (in-house design)
**Tech Stack:** Next.js, custom CSS animations, minimal JS

#### What Makes It Award-Winning
- Typographic hierarchy is architectural — size contrast is extreme (8px caption vs. 96px heading)
- Book covers are interactive 3D objects — rotate on hover
- Reading experience rivals print design
- Color-coded by book/topic — system is immediately intuitive
- No trendy animation — instead, perfected micro-interactions on links, buttons, footnotes

#### Key Animation Patterns
- Link underline: custom SVG path draw animation on hover, 200ms
- Book 3D rotate: CSS `transform: perspective(1000px) rotateY()`
- Page load: stagger of `opacity 0 → 1` from top, 60ms delay per element

#### Code Pattern (Replicable) — 3D Book Cover Tilt

```tsx
// components/BookCover3D.tsx
"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface BookCover3DProps {
  src: string;
  title: string;
  width?: number;
  height?: number;
}

export function BookCover3D({ src, title, width = 280, height = 380 }: BookCover3DProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        className="relative shadow-2xl"
      >
        <Image src={src} alt={title} width={width} height={height} className="block" />
        {/* Spine shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              springRotateY,
              [-15, 0, 15],
              [
                "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
                "transparent",
                "linear-gradient(to left, rgba(0,0,0,0.3), transparent)",
              ]
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
```

#### Relevance to Renovation/Real Estate
Use for digital lookbooks / design guide PDFs — present downloadable renovation guides as interactive 3D books.

---

### 10. Lusion (lusion.co)

**Category:** Immersive 3D / Agency
**Studio/Agency:** Lusion (London)
**Tech Stack:** Three.js, custom GLSL, custom rendering pipeline

#### What Makes It Award-Winning
- Particle simulations that form letters and shapes — GPU-computed
- Depth of field post-processing makes 3D feel photographic
- Cursor creates ripple disturbances in particle field
- Extremely tight performance: 8ms frame budget enforced
- Loading sequence is a 3D animation in itself

#### Key Animation Patterns
- Particle morph: lerp positions over 60 frames, ease `smoothstep`
- DOF: focus distance driven by mouse Y position
- Ripple: mouse velocity → amplitude, decays exponentially

#### Code Pattern (Replicable) — GPU Particle System (simplified R3F)

```tsx
// components/three/ParticleMorph.tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const radius = Math.random() * 2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
  }
  return positions;
}

export function ParticleMorph({ count = 5000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const positionsA = useMemo(() => generateParticlePositions(count), [count]);
  const positionsB = useMemo(() => {
    // Target shape: flat disc (logo/floor plan silhouette)
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count]);

  const progress = useRef(0);
  const direction = useRef(1);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    progress.current += delta * 0.3 * direction.current;
    if (progress.current >= 1) direction.current = -1;
    if (progress.current <= 0) direction.current = 1;
    progress.current = Math.max(0, Math.min(1, progress.current));

    const t = progress.current;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      attr.array[i * 3] = positionsA[i * 3] * (1 - t) + positionsB[i * 3] * t;
      attr.array[i * 3 + 1] = positionsA[i * 3 + 1] * (1 - t) + positionsB[i * 3 + 1] * t;
      attr.array[i * 3 + 2] = positionsA[i * 3 + 2] * (1 - t) + positionsB[i * 3 + 2] * t;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsA, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#c9a96e" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}
```

#### Relevance to Renovation/Real Estate
Particles morphing into a house/floor plan silhouette — hero animation for ADU/garden suite builders.

---

### 11. Bruno Simon (bruno-simon.com)

**Category:** Portfolio
**Studio/Agency:** Independent (France)
**Tech Stack:** Three.js, Cannon.js physics, GSAP

#### What Makes It Award-Winning
- The entire portfolio IS a 3D driving game — WASD/arrow keys move a car through a miniature world
- Portfolio items exist as physical objects in 3D space — drive up to them to view
- Physics engine running in real-time: gravity, collisions, friction all live
- Charming low-poly aesthetic that loads fast despite being fully 3D
- Audio design: engine sounds, collision sounds, ambient music tied to gameplay

#### Key Animation Patterns
- Vehicle: rigid body with 4 wheel joints, `chassisBody.velocity` updated per tick
- Camera follow: lerp from current to `target + offset`, lag for cinematics
- Click-to-inspect: smooth camera transition to object, 1.2s ease

#### Code Pattern (Replicable) — Simple 3D Scene with Physics-Feel Bounce

```tsx
// components/three/BouncingBox.tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function BouncingBox() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const velocity = useRef(0);
  const position = useRef(0);
  const GRAVITY = -9.8;
  const FLOOR = 0;
  const RESTITUTION = 0.6;

  useFrame((_, delta) => {
    velocity.current += GRAVITY * delta;
    position.current += velocity.current * delta;

    if (position.current <= FLOOR) {
      position.current = FLOOR;
      velocity.current *= -RESTITUTION;
      if (Math.abs(velocity.current) < 0.1) velocity.current = 0;
    }

    if (meshRef.current) {
      meshRef.current.position.y = position.current + 0.5;
    }
  });

  return (
    <RoundedBox ref={meshRef} args={[1, 1, 1]} radius={0.1} smoothness={4} position={[0, 2, 0]}>
      <meshStandardMaterial color="#c9a96e" roughness={0.3} metalness={0.1} />
    </RoundedBox>
  );
}
```

#### Relevance to Renovation/Real Estate
Isometric 3D property model the user can orbit and click zones to reveal renovation scope — gamified project explorer.

---

### 12. Basement Studio (basement.studio)

**Category:** Agency portfolio
**Studio/Agency:** Basement Studio (Argentina)
**Tech Stack:** Next.js, GSAP, custom CSS grain

#### What Makes It Award-Winning
- Film grain texture overlay (CSS + SVG noise filter) elevates flat UI to tactile
- Monochromatic + one bold accent (electric green `#00ff88` on deep black)
- Glow effects: `box-shadow: 0 0 40px rgba(0,255,136,0.3)` on interactive elements
- Typography: mono font for code/data, grotesque for headlines — sharp contrast
- Work tiles use a horizontal list with overflow-x hint — draggable

#### Key Animation Patterns
- Grain: SVG `feTurbulence` + CSS animation cycling noise seed, 8fps
- Glow pulse: keyframe animation, 2s, ease in-out, intensity 0.2 → 0.6
- Tile drag: Framer Motion `drag="x"` with `dragConstraints`

#### Code Pattern (Replicable) — Film Grain Overlay

```tsx
// components/FilmGrain.tsx
"use client";

export function FilmGrain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <>
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          opacity,
          filter: "url(#grain)",
          animation: "grain 0.12s steps(1) infinite",
        }}
      />
      <style>{`
        @keyframes grain {
          0% { transform: translate(0, 0) }
          10% { transform: translate(-2%, -3%) }
          20% { transform: translate(3%, 1%) }
          30% { transform: translate(-1%, 2%) }
          40% { transform: translate(2%, -1%) }
          50% { transform: translate(-3%, 3%) }
          60% { transform: translate(1%, -2%) }
          70% { transform: translate(-2%, 1%) }
          80% { transform: translate(3%, 2%) }
          90% { transform: translate(-1%, -1%) }
          100% { transform: translate(0, 0) }
        }
      `}</style>
    </>
  );
}
```

#### Relevance to Renovation/Real Estate
Film grain adds warmth and artisanal quality — perfect for renovation/craft-focused sites where clinical cleanliness would feel wrong.

---

### 13. Obys Agency (obys.agency)

**Category:** Agency portfolio
**Studio/Agency:** Obys Agency (Ukraine)
**Tech Stack:** GSAP, custom grid system, vanilla JS

#### What Makes It Award-Winning
- Every headline is kinetic — characters rotate, slide, scale on load
- Swiss-grid layout with deliberate rule-breaking at hero
- Work titles use an oversized number indexing system (01, 02...)
- Cursor changes to a "drag" indicator on scrollable horizontal sections
- Strong editorial color blocking — full-width colored sections per project

#### Key Animation Patterns
- Char animation: each letter has `translateY: 100% → 0`, staggered 20ms, 600ms ease expo-out
- Number index: scale from 2 → 1 on scroll, tied to section entry
- Color block: `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, 800ms

#### Code Pattern (Replicable) — Character Stagger Reveal

```tsx
// components/CharReveal.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CharReveal({ text, className, delay = 0 }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-flex overflow-hidden ${className ?? ""}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ y: "110%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
```

#### Relevance to Renovation/Real Estate
Use for headline reveals on service pages: "Design. Build. Transform." — each word enters character by character.

---

### 14. Clément Ruchon (clementruchon.com)

**Category:** Portfolio
**Studio/Agency:** Independent (France)
**Tech Stack:** Three.js, GLSL fluid simulation

#### What Makes It Award-Winning
- Real-time fluid simulation responds to cursor — viscous, paint-like
- Color palette derived from the fluid: ochre, rust, ivory
- No traditional UI chrome — fluid IS the hero
- Project navigation embedded within the fluid — items float up through it
- Mobile version gracefully degrades to CSS gradient animation

#### Key Animation Patterns
- Fluid: ping-pong FBO, 512x512 simulation texture, curl noise velocity
- Color: HSL space, hue drifts ±30° from base slowly
- Mobile fallback: `@keyframes` CSS gradient shift, 6s cycle

#### Code Pattern (Replicable) — CSS Fluid Gradient Fallback

```tsx
// components/FluidGradientHero.tsx
"use client";
import { motion } from "framer-motion";

export function FluidGradientHero({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, #c9a96e 0%, #8b4513 40%, #2c1810 100%)",
            "radial-gradient(ellipse at 80% 20%, #d4956a 0%, #a0522d 40%, #1a0f0a 100%)",
            "radial-gradient(ellipse at 50% 80%, #e8c99a 0%, #c9a96e 40%, #2c1810 100%)",
            "radial-gradient(ellipse at 20% 50%, #c9a96e 0%, #8b4513 40%, #2c1810 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Warm fluid gradient with earth tones (ochre, terracotta) as hero for a high-end interior renovation firm.

---

### 15. YOD Design (yoddesign.ua)

**Category:** Interior design / Architecture
**Studio/Agency:** YOD Design (Ukraine)
**Tech Stack:** GSAP, ScrollTrigger, custom video management

#### What Makes It Award-Winning
- Full-bleed architectural photography as primary design element
- Scroll reveals project images in a cinematic sequence
- Typography is minimal — the photography speaks
- Project filters use a liquid morphing animation between states
- Awards and credentials presented as a living ticker

#### Key Animation Patterns
- Image reveal: `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)`, scroll-triggered
- Ticker: GSAP marquee, speed increases on hover
- Filter morph: SVG feMorphology animated between erode/dilate states

#### Code Pattern (Replicable) — Clip-Path Image Reveal on Scroll

```tsx
// components/ClipRevealImage.tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ClipRevealImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ClipRevealImage({ src, alt, width, height, className }: ClipRevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      // Subtle scale on the image itself for parallax depth
      gsap.from(imgRef.current, {
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={imgRef}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </div>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Direct application — reveal completed renovation photography on project detail pages.

---

### 16. Refokus (refokus.com)

**Category:** Agency portfolio
**Studio/Agency:** Refokus (Berlin)
**Tech Stack:** Next.js, Framer Motion, Sanity CMS

#### What Makes It Award-Winning
- Bold asymmetric grid: text and images deliberately misaligned at macro level, perfectly aligned at micro
- Page transitions are the signature — a black overlay slides from corner to corner
- Work listed as a simple numbered list with expandable detail rows
- Color system: strictly monochromatic per project, pulled from the brand
- Studio culture section uses candid photography with no hover effects — intentionally still

#### Key Animation Patterns
- Corner wipe transition: `clip-path: circle(0% at 100% 0%)` → `circle(150% at 100% 0%)`, 600ms
- Row expand: `height: 0 → auto` with opacity, 400ms ease-out
- List counter: CSS `counter-increment` with animated appearance

#### Code Pattern (Replicable) — Expandable Work Row

```tsx
// components/WorkRow.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface WorkRowProps {
  index: number;
  title: string;
  category: string;
  year: string;
  description: string;
}

export function WorkRow({ index, title, category, year, description }: WorkRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-neutral-200">
      <button
        className="w-full grid grid-cols-[3rem_1fr_auto_auto] items-center gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm text-neutral-400 font-mono">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-lg font-medium">{title}</span>
        <span className="text-sm text-neutral-500 hidden md:block">{category}</span>
        <span className="text-sm text-neutral-400">{year}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-12 text-neutral-600 max-w-prose">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Use as a project timeline/scope accordion — expand each phase to show deliverables, materials list.

---

### 17. Quentin Doiry (quentindoiry.fr)

**Category:** Portfolio
**Studio/Agency:** Independent (France)
**Tech Stack:** Three.js, GSAP, custom post-processing

#### What Makes It Award-Winning
- First load triggers a 3D camera flythrough that places you "inside" the work
- UI appears from behind 3D planes — depth-sorted with WebGL content
- Extreme contrast: pure black, pure white, single red accent
- Work section: each project is a 3D card stack, can be physically separated
- Motion is deliberate and slow — luxury pacing

#### Key Animation Patterns
- Camera flythrough: spline path using THREE.CatmullRomCurve3, progress 0→1 over 2.4s
- Card stack: cards fanned out on hover via rotateZ 0, -5, -10 + translateX stagger
- Red accent appears after black/white animation completes — dramatic reveal

#### Code Pattern (Replicable) — Stacked Card Fan

```tsx
// components/CardStack.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface CardStackProps {
  cards: { id: string; label: string; color: string }[];
}

export function CardStack({ cards }: CardStackProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-64 w-48 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute inset-0 rounded-xl border border-neutral-200 shadow-lg flex items-end p-4"
          style={{ backgroundColor: card.color, zIndex: cards.length - i }}
          animate={
            hovered
              ? { rotate: (i - cards.length / 2) * 8, x: (i - cards.length / 2) * 20, y: i * -4 }
              : { rotate: (i - cards.length / 2) * 2, x: 0, y: i * -4 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.04 }}
        >
          <span className="text-xs font-medium">{card.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Material sample stack — fan out flooring/tile options on hover, click to select.

---

### 18. Blooming (blooming.digital)

**Category:** Agency
**Studio/Agency:** Blooming (France)
**Tech Stack:** GSAP, Three.js, custom WebGL

#### What Makes It Award-Winning
- Organic, nature-inspired motion — curves everywhere, nothing is angular
- SVG morphing: navigation items deform between geometric states
- Color palette cycles through seasons: spring greens → summer gold → autumn red
- Loading animation is a growing botanical illustration
- Parallax is multi-layer (5+ depth layers) without performance regression

#### Key Animation Patterns
- SVG morph: `MorphSVGPlugin`-style achieved with Flubber.js or custom interpolation
- Season color: CSS custom properties changed on scroll, transitioning over 800ms
- Botanical loader: SVG stroke `stroke-dashoffset` animated over 1.5s

#### Code Pattern (Replicable) — SVG Stroke Draw Animation

```tsx
// components/StrokeDraw.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StrokeDrawProps {
  d: string; // SVG path d attribute
  viewBox: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  className?: string;
}

export function StrokeDraw({
  d,
  viewBox,
  strokeColor = "#c9a96e",
  strokeWidth = 1.5,
  duration = 2,
  className,
}: StrokeDrawProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <svg ref={ref} viewBox={viewBox} fill="none" className={className}>
      <motion.path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  );
}
```

#### Relevance to Renovation/Real Estate
Animate a hand-drawn floor plan outline as user scrolls into the section — organic feel for design-led renovation brands.

---

### 19. Gucci Beauty (beauty.gucci.com)

**Category:** Ecommerce / Brand
**Studio/Agency:** Gucci (in-house) + external creative
**Tech Stack:** React, custom CSS, GSAP

#### What Makes It Award-Winning
- Luxury pacing: everything is slow (1.2s+ transitions) — patience is elegance
- Product photography treated as fine art — extreme close-ups, unusual crops
- Navigation is hidden by default, revealed by upward swipe only
- Color: black, gold, deep red — never compromised
- Cart interaction: product smoothly "flies" from card to cart icon

#### Key Animation Patterns
- Page transition: 1.2s black overlay `ease: "power3.inOut"`
- Product fly-to-cart: clone element, animate via `getBoundingClientRect` path
- Scroll: `lerp 0.06` — very slow inertia, the slowest on this list

#### Code Pattern (Replicable) — Add to Cart Fly Animation

```tsx
// components/FlyToCart.tsx
"use client";
import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface FlyToCartProps {
  cartRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export function FlyToCart({ cartRef, children }: FlyToCartProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const cloneRef = useRef<HTMLDivElement | null>(null);

  const handleAddToCart = () => {
    if (!itemRef.current || !cartRef.current) return;
    const itemRect = itemRef.current.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const clone = document.createElement("div");
    clone.style.cssText = `
      position: fixed;
      left: ${itemRect.left}px;
      top: ${itemRect.top}px;
      width: ${itemRect.width}px;
      height: ${itemRect.height}px;
      background: #1a1a1a;
      border-radius: 50%;
      z-index: 9999;
      pointer-events: none;
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 1;
    `;
    document.body.appendChild(clone);
    cloneRef.current = clone;

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left + cartRect.width / 2}px`;
      clone.style.top = `${cartRect.top + cartRect.height / 2}px`;
      clone.style.width = "8px";
      clone.style.height = "8px";
      clone.style.opacity = "0";
    });

    setTimeout(() => clone.remove(), 900);
  };

  return (
    <div ref={itemRef}>
      {children}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-neutral-900 text-white py-3 text-sm tracking-widest uppercase"
      >
        Add to Collection
      </button>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
"Add to Moodboard" fly animation — select materials/finishes and they fly to a moodboard panel.

---

### 20. Floor796 (floor796.com)

**Category:** Creative / Editorial
**Studio/Agency:** Independent (Alexander Minervus)
**Tech Stack:** Canvas 2D API, vanilla JS, custom animation engine

#### What Makes It Award-Winning
- Massive hand-drawn animated pixel art — infinite scrolling world
- Zero framework — pure Canvas 2D, proving tools don't make the art
- Easter eggs and references throughout — rewards exploration
- Community-contributed elements — living, growing artwork
- Performance: dozens of animated characters on-screen simultaneously

#### Key Animation Patterns
- Sprite animation: requestAnimationFrame with frame index, sheet offset
- Infinite scroll: canvas translate offset wraps at world boundary
- Click to inspect: canvas hit-test via pixel or bounding box

#### Code Pattern (Replicable) — Canvas Sprite Sheet Animation

```tsx
// components/SpriteAnimation.tsx
"use client";
import { useEffect, useRef } from "react";

interface SpriteAnimationProps {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps?: number;
  scale?: number;
}

export function SpriteAnimation({
  src,
  frameWidth,
  frameHeight,
  frameCount,
  fps = 12,
  scale = 2,
}: SpriteAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const lastTime = useRef(0);
  const img = useRef<HTMLImageElement | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = frameWidth * scale;
    canvas.height = frameHeight * scale;

    const image = new Image();
    image.src = src;
    img.current = image;

    const interval = 1000 / fps;

    const animate = (time: number) => {
      rafId.current = requestAnimationFrame(animate);
      if (time - lastTime.current < interval) return;
      lastTime.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!img.current?.complete) return;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        img.current,
        frame.current * frameWidth, 0,
        frameWidth, frameHeight,
        0, 0,
        frameWidth * scale, frameHeight * scale
      );

      frame.current = (frame.current + 1) % frameCount;
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [src, frameWidth, frameHeight, frameCount, fps, scale]);

  return <canvas ref={canvasRef} className="block" />;
}
```

#### Relevance to Renovation/Real Estate
Animated mascot/character on empty states or 404 pages — a small house being built frame by frame.

---

### 21. Cédric Pereira (cedricpereira.com)

**Category:** Portfolio
**Studio/Agency:** Independent (France)
**Tech Stack:** Three.js, GSAP, custom typography engine

#### What Makes It Award-Winning
- Name in hero is 3D extruded type — rotates to face cursor
- Color is deeply intentional: only 2 hues for the whole site
- Transition between projects: old page letters fly off, new page letters fly in
- Every scroll increment has a distinct visual consequence
- Mobile experience is equally considered — not a desktop-first afterthought

#### Key Animation Patterns
- 3D text: THREE.TextGeometry or CSS `perspective` + `rotateY` tracking cursor
- Letter fly: each character gets random velocity vector on exit, gravity applies
- Two-hue system: background hue, type hue, switched per section

#### Code Pattern (Replicable) — 3D Text Cursor Tracker (CSS)

```tsx
// components/CursorTrack3DText.tsx
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface CursorTrack3DTextProps {
  text: string;
  className?: string;
}

export function CursorTrack3DText({ text, className }: CursorTrack3DTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-300, 300], [-25, 25]);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);

  const springY = useSpring(rotateY, { stiffness: 60, damping: 15 });
  const springX = useSpring(rotateX, { stiffness: 60, damping: 15 });

  return (
    <div
      ref={ref}
      className="flex items-center justify-center"
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.h1
        style={{ rotateY: springY, rotateX: springX, transformStyle: "preserve-3d" }}
        className={`font-bold select-none ${className ?? "text-8xl"}`}
      >
        {text}
      </motion.h1>
    </div>
  );
}
```

#### Relevance to Renovation/Real Estate
Use on a company name hero — "Westside Homes" tracking cursor in 3D, immediately memorable.

---

### 22. Nextiva (nextiva.com)

**Category:** Product (SaaS)
**Studio/Agency:** Nextiva (in-house) + agency
**Tech Stack:** Next.js, Framer Motion, Lottie

#### What Makes It Award-Winning
- Complex information hierarchy made scannable through precise spacing system (8px grid)
- Icon animations via Lottie — every feature icon plays on hover
- Section transitions use a shared gradient that morphs between sections
- Social proof (logos, numbers) presented with counting animations
- Clear visual hierarchy — heading → subheading → body text → CTA is never ambiguous

#### Key Animation Patterns
- Number counter: `gsap.to(obj, { innerHTML: target, snap: { innerHTML: 1 }, duration: 2 })`
- Lottie play on hover: `lottiePlayer.play()` on `mouseenter`, `lottiePlayer.stop()` on `mouseleave`
- Section gradient: CSS `background` transition over 600ms

#### Code Pattern (Replicable) — Scroll-Triggered Number Counter

```tsx
// components/CounterOnScroll.tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

interface CounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CounterOnScroll({ to, duration = 2, suffix = "", prefix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current || !ref.current) return;
    animated.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
        }
      },
    });
  }, [isInView, to, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
```

#### Relevance to Renovation/Real Estate
Stats section: "247 Projects Completed" / "$2.4M Saved for Clients" — counter fires when scrolled into view.

---

## Summary Table

| # | Site | Category | Primary Technique | Difficulty (1–5) |
|---|------|----------|-------------------|------------------|
| 1 | Locomotive | Agency | Momentum scroll + magnetic cursor | 3 |
| 2 | Resn | Interactive | Physics spring UI | 4 |
| 3 | Active Theory | Immersive 3D | GPU particle system + post-FX | 5 |
| 4 | Aristide Benoist | Portfolio | GLSL displacement shader | 4 |
| 5 | Roboto Studio | Product | Scroll-synced color transitions | 2 |
| 6 | Monopo | Agency | Negative space + drawer reveals | 2 |
| 7 | Superlist | Product | Pinned horizontal feature scroll | 3 |
| 8 | Linear | Product | Mesh gradient + speed blur | 2 |
| 9 | Stripe Press | Editorial | 3D book cover tilt | 2 |
| 10 | Lusion | Immersive 3D | Particle morph system | 5 |
| 11 | Bruno Simon | Portfolio | Full 3D physics game | 5 |
| 12 | Basement Studio | Agency | Film grain + glow system | 2 |
| 13 | Obys Agency | Agency | Kinetic character reveal | 2 |
| 14 | Clément Ruchon | Portfolio | Real-time fluid simulation | 5 |
| 15 | YOD Design | Interior/Arch | Clip-path image reveals | 2 |
| 16 | Refokus | Agency | Corner wipe transitions | 3 |
| 17 | Quentin Doiry | Portfolio | 3D card stack fan | 3 |
| 18 | Blooming | Agency | SVG stroke draw + organic motion | 3 |
| 19 | Gucci Beauty | Ecommerce | Luxury pacing + fly-to-cart | 3 |
| 20 | Floor796 | Creative | Canvas sprite animation | 3 |
| 21 | Cédric Pereira | Portfolio | 3D text cursor tracking | 3 |
| 22 | Nextiva | Product | Scroll-triggered number counters | 2 |
