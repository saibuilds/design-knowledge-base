# Premium UI Libraries — Vol. 2

---

## Motion Number

> URL: https://motiondivision.com/motion-number
> npm: `motion-number`

Animates between numeric values with spring physics, locale formatting, and per-digit transitions — no canvas, pure DOM.

```tsx
// Basic animated counter
import MotionNumber from 'motion-number';

export function PriceDisplay({ price }: { price: number }) {
  return (
    <MotionNumber
      value={price}
      format={{ style: 'currency', currency: 'USD' }}
      locales="en-US"
      style={{ fontSize: '3rem', fontWeight: 700 }}
    />
  );
}
```

```tsx
// Animated stat with custom transition
import MotionNumber from 'motion-number';

export function LiveStat({ value }: { value: number }) {
  return (
    <div className="stat-card">
      <span className="label">Active Users</span>
      <MotionNumber
        value={value}
        format={{ notation: 'compact' }}
        transition={{
          layout: { type: 'spring', duration: 0.5, bounce: 0 },
          y: { type: 'spring', duration: 0.5, bounce: 0.25 },
          opacity: { duration: 0.2 },
        }}
        style={{ fontSize: '2.5rem', fontVariantNumeric: 'tabular-nums' }}
      />
    </div>
  );
}
```

```tsx
// Countdown timer
import MotionNumber from 'motion-number';
import { useEffect, useState } from 'react';

export function Countdown({ from }: { from: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <MotionNumber
      value={count}
      style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '-0.05em' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
}
```

---

## Lottie React

> URL: https://lottiereact.com
> npm: `lottie-react`

Renders Adobe After Effects animations exported as JSON — frame-accurate, interactive, and scriptable.

**Setup:** Download `.json` animation files from [lottiefiles.com](https://lottiefiles.com) and import them directly.

```tsx
// Basic playback
import Lottie from 'lottie-react';
import successAnimation from './animations/success.json';

export function SuccessState() {
  return (
    <Lottie
      animationData={successAnimation}
      loop={false}
      style={{ width: 200, height: 200 }}
    />
  );
}
```

```tsx
// Controlled animation with ref
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import loadingAnim from './animations/loading.json';
import { useRef } from 'react';

export function ControlledLottie() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handlePlay = () => lottieRef.current?.play();
  const handlePause = () => lottieRef.current?.pause();
  const handleStop = () => lottieRef.current?.stop();

  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={loadingAnim}
        autoplay={false}
        loop
        style={{ width: 150, height: 150 }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}
```

```tsx
// Hover-triggered animation
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import hoverAnim from './animations/hover-effect.json';
import { useRef } from 'react';

export function HoverButton({ label }: { label: string }) {
  const ref = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => {
        ref.current?.goToAndPlay(0, true);
      }}
      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
    >
      <Lottie
        lottieRef={ref}
        animationData={hoverAnim}
        autoplay={false}
        loop={false}
        style={{ width: 24, height: 24 }}
      />
      {label}
    </button>
  );
}
```

---

## React Three Fiber

> URL: https://docs.pmnd.rs/react-three-fiber
> npm: `@react-three/fiber @react-three/drei three`

Declarative Three.js in React — full scene graph as JSX with hooks, suspense, and the entire drei helper ecosystem.

**Setup:**
```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

```tsx
// Basic scene with lighting
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Box() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6366f1" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

export function BasicScene() {
  return (
    <Canvas style={{ height: 400 }} camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Box />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
}
```

```tsx
// Floating animated sphere
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.3;
    meshRef.current.rotation.x = clock.elapsedTime * 0.2;
    meshRef.current.rotation.z = clock.elapsedTime * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.45}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function FloatingSphereScene() {
  return (
    <Canvas style={{ height: 500 }} camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#c4b5fd" />
      <pointLight position={[-5, -5, -3]} intensity={0.5} color="#60a5fa" />
      <FloatingSphere />
    </Canvas>
  );
}
```

```tsx
// Particle field
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Particles({ count = 3000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.04;
    mesh.current.rotation.x = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export function ParticleField() {
  return (
    <Canvas style={{ height: 600, background: '#0a0a0f' }} camera={{ position: [0, 0, 8], fov: 60 }}>
      <Particles count={4000} />
    </Canvas>
  );
}
```

---

## Theatre.js

> URL: https://www.theatrejs.com
> npm: `@theatre/core @theatre/r3f` (+ `@theatre/studio` for dev)

A professional animation sequencer with a visual timeline editor — animate any JS object, React props, or Three.js scene.

**Setup:**
```bash
npm install @theatre/core @theatre/r3f
npm install -D @theatre/studio
```

```tsx
// Project + sheet initialization (theatre-setup.ts)
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';

if (process.env.NODE_ENV === 'development') {
  studio.initialize();
}

export const project = getProject('My Project');
export const sheet = project.sheet('Scene');
```

```tsx
// Animate a DOM element with Theatre
import { useEffect, useRef } from 'react';
import { types } from '@theatre/core';
import { sheet } from './theatre-setup';

export function TheatreBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = sheet.object('Box', {
      x: types.number(0, { range: [-300, 300] }),
      opacity: types.number(1, { range: [0, 1] }),
      scale: types.number(1, { range: [0.1, 3] }),
    });

    const unsubscribe = obj.onValuesChange(({ x, opacity, scale }) => {
      if (!boxRef.current) return;
      boxRef.current.style.transform = `translateX(${x}px) scale(${scale})`;
      boxRef.current.style.opacity = String(opacity);
    });

    sheet.sequence.play({ iterationCount: Infinity, range: [0, 3] });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: 80,
        height: 80,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: 12,
      }}
    />
  );
}
```

```tsx
// Theatre + R3F integration
import { Canvas } from '@react-three/fiber';
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f';
import { sheet } from './theatre-setup';

function AnimatedMesh() {
  return (
    <e.mesh theatreKey="Cube">
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </e.mesh>
  );
}

export function TheatreR3FScene() {
  return (
    <Canvas>
      <SheetProvider sheet={sheet}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <AnimatedMesh />
      </SheetProvider>
    </Canvas>
  );
}
```

---

## Rive React

> URL: https://rive.app/docs/runtimes/react
> npm: `@rive-app/react-canvas`

State-machine-driven animations exported from the Rive editor — interactive, responsive, and performant via WebGL/Canvas.

**Setup:** Export `.riv` files from [rive.app](https://rive.app) and place in `/public`.

```tsx
// Basic Rive animation
import { useRive } from '@rive-app/react-canvas';

export function RiveHero() {
  const { RiveComponent } = useRive({
    src: '/animations/hero.riv',
    autoplay: true,
  });

  return <RiveComponent style={{ width: 600, height: 400 }} />;
}
```

```tsx
// State machine with interactive inputs
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/button.riv',
    stateMachines: 'ButtonSM',
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, 'ButtonSM', 'isHovered');
  const clickInput = useStateMachineInput(rive, 'ButtonSM', 'isClicked');

  return (
    <div
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
      onMouseDown={() => clickInput?.fire()}
      style={{ cursor: 'pointer', width: 200, height: 60 }}
    >
      <RiveComponent />
    </div>
  );
}
```

```tsx
// Rive with numeric input for progress
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export function ProgressIndicator({ progress }: { progress: number }) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/progress.riv',
    stateMachines: 'ProgressSM',
    autoplay: true,
  });

  const progressInput = useStateMachineInput(rive, 'ProgressSM', 'progress');

  if (progressInput) {
    progressInput.value = Math.min(100, Math.max(0, progress));
  }

  return <RiveComponent style={{ width: 300, height: 300 }} />;
}
```

---

## Anime.js

> URL: https://animejs.com
> npm: `animejs` + `@types/animejs`

JavaScript animation engine with a chainable API, SVG support, stagger helpers, and timeline sequencing.

```tsx
// Stagger entrance animation
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function StaggerGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: containerRef.current?.querySelectorAll('.grid-item'),
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(60, { grid: [4, 4], from: 'center' }),
      duration: 600,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: 12 }}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="grid-item"
          style={{
            width: 60,
            height: 60,
            background: `hsl(${i * 22}, 70%, 60%)`,
            borderRadius: 8,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
```

```tsx
// Timeline sequence
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function TimelineSequence() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutExpo', duration: 700 });

    tl.add({
      targets: titleRef.current,
      translateY: [60, 0],
      opacity: [0, 1],
    })
      .add({
        targets: subtitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
      }, '-=400')
      .add({
        targets: ctaRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
      }, '-=300');
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1 ref={titleRef} style={{ opacity: 0, fontSize: '3rem' }}>Hello World</h1>
      <p ref={subtitleRef} style={{ opacity: 0, fontSize: '1.2rem', color: '#666' }}>
        Crafted with care
      </p>
      <button ref={ctaRef} style={{ opacity: 0, padding: '12px 32px', marginTop: 24 }}>
        Get Started
      </button>
    </div>
  );
}
```

```tsx
// Morphing SVG path
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function MorphingShape() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    anime({
      targets: pathRef.current,
      d: [
        { value: 'M 50 10 L 90 90 L 10 90 Z' },
        { value: 'M 50 5 C 80 5, 95 25, 95 50 C 95 75, 80 95, 50 95 C 20 95, 5 75, 5 50 C 5 25, 20 5, 50 5 Z' },
        { value: 'M 50 10 L 90 90 L 10 90 Z' },
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutQuart',
    });
  }, []);

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <path ref={pathRef} d="M 50 10 L 90 90 L 10 90 Z" fill="#6366f1" />
    </svg>
  );
}
```

---

## GSAP ScrollTrigger

> URL: https://gsap.com/docs/v3/Plugins/ScrollTrigger
> npm: `gsap`

Industry-standard scroll animation engine — pinning, scrubbing, parallax, and timeline scrubbing all driven by scroll position.

**Setup:**
```tsx
// _app.tsx or layout.tsx — register once globally
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

```tsx
// Fade-in on scroll with scrub
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

```tsx
// Horizontal scroll section
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CARDS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
        {CARDS.map((color, i) => (
          <div
            key={i}
            style={{
              width: '100vw',
              height: '100vh',
              background: color,
              display: 'grid',
              placeItems: 'center',
              fontSize: '3rem',
              color: 'white',
              fontWeight: 700,
            }}
          >
            Slide {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// Staggered list reveal
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = ['Strategy', 'Design', 'Development', 'Launch', 'Growth'];

export function StaggerRevealList() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.querySelectorAll('li'),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <ul ref={listRef} style={{ listStyle: 'none', padding: 0 }}>
      {ITEMS.map((item) => (
        <li key={item} style={{ padding: '12px 0', fontSize: '1.5rem', borderBottom: '1px solid #eee' }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

---

## Lenis

> URL: https://lenis.darkroom.engineering
> npm: `lenis`

Minimal smooth scroll library that replaces native scroll with buttery lerp-based scrolling — integrates with GSAP ScrollTrigger and Framer Motion.

**Setup:**
```tsx
// providers/SmoothScrollProvider.tsx
'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

```tsx
// Programmatic scroll with Lenis context
'use client';
import Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({ duration: 1.4, smoothWheel: true });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenisRef.current?.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
```

```tsx
// Scroll-to anchor with Lenis
import { useLenis } from './LenisProvider';

export function AnchorNav() {
  const lenis = useLenis();

  const scrollTo = (id: string) => {
    lenis?.scrollTo(`#${id}`, { offset: -80, duration: 1.6 });
  };

  return (
    <nav style={{ display: 'flex', gap: 24 }}>
      {['about', 'work', 'contact'].map((id) => (
        <button key={id} onClick={() => scrollTo(id)} style={{ textTransform: 'capitalize' }}>
          {id}
        </button>
      ))}
    </nav>
  );
}
```

---

## React Bits

> URL: https://reactbits.dev
> npm: N/A — pattern library (copy-paste components)

A curated collection of advanced React component patterns — compound components, polymorphic elements, render props, and more.

```tsx
// Compound component pattern — Tabs
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
} from 'react';

type TabsContextType = { active: string; setActive: (id: string) => void };
const TabsContext = createContext<TabsContextType | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Must be used inside <Tabs>');
  return ctx;
};

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

function TabList({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, borderBottom: '2px solid #e5e7eb' }} {...props}>
      {children}
    </div>
  );
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  const isActive = active === id;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(id)}
      style={{
        padding: '10px 20px',
        border: 'none',
        background: 'transparent',
        borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent',
        color: isActive ? '#6366f1' : '#6b7280',
        fontWeight: isActive ? 600 : 400,
        cursor: 'pointer',
        marginBottom: -2,
      }}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  if (active !== id) return null;
  return <div role="tabpanel" style={{ padding: '24px 0' }}>{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export function TabsDemo() {
  return (
    <Tabs defaultTab="overview">
      <Tabs.List>
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="specs">Specs</Tabs.Tab>
        <Tabs.Tab id="reviews">Reviews</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="overview"><p>Product overview content here.</p></Tabs.Panel>
      <Tabs.Panel id="specs"><p>Technical specifications here.</p></Tabs.Panel>
      <Tabs.Panel id="reviews"><p>Customer reviews here.</p></Tabs.Panel>
    </Tabs>
  );
}
```

```tsx
// Polymorphic component pattern
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type TextProps<T extends ElementType> = {
  as?: T;
  variant?: 'heading' | 'body' | 'caption';
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant'>;

const variants = {
  heading: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
  body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
  caption: { fontSize: '0.75rem', fontWeight: 400, color: '#9ca3af' },
};

export function Text<T extends ElementType = 'p'>({
  as,
  variant = 'body',
  children,
  style,
  ...props
}: TextProps<T>) {
  const Component = as || 'p';
  return (
    <Component style={{ ...variants[variant], ...style }} {...props}>
      {children}
    </Component>
  );
}

// Usage:
// <Text as="h1" variant="heading">Page Title</Text>
// <Text as="span" variant="caption">Metadata</Text>
// <Text variant="body">Paragraph copy</Text>
```

---

## Ark UI

> URL: https://ark-ui.com
> npm: `@ark-ui/react`

Headless, accessible UI primitives from the Chakra UI team — zero styles, full WAI-ARIA compliance, and first-class form support.

**Setup:**
```bash
npm install @ark-ui/react
```

```tsx
// DatePicker
import { DatePicker } from '@ark-ui/react';

export function ArkDatePicker() {
  return (
    <DatePicker.Root>
      <DatePicker.Label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
        Select Date
      </DatePicker.Label>
      <DatePicker.Control style={{ display: 'flex', gap: 8 }}>
        <DatePicker.Input
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            fontSize: '0.9rem',
            width: 200,
          }}
        />
        <DatePicker.Trigger
          style={{ padding: '8px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          📅
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}>
          Clear
        </DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          }}
        >
          <DatePicker.View view="day">
            <DatePicker.Context>
              {(api) => (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <DatePicker.PrevTrigger style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>‹</DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger style={{ background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>›</DatePicker.NextTrigger>
                  </div>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {api.weekDays.map((day, i) => (
                          <DatePicker.TableHeader key={i} style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>
                            {day.narrow}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {api.weeks.map((week, i) => (
                        <DatePicker.TableRow key={i}>
                          {week.map((day, j) => (
                            <DatePicker.TableCell key={j} value={day}>
                              <DatePicker.TableCellTrigger
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 6,
                                  border: 'none',
                                  cursor: 'pointer',
                                  background: 'transparent',
                                }}
                              >
                                {day.day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  );
}
```

```tsx
// FileUpload with drag-and-drop
import { FileUpload } from '@ark-ui/react';

export function ArkFileUpload() {
  return (
    <FileUpload.Root maxFiles={5} accept={{ 'image/*': ['.jpg', '.png', '.webp'] }}>
      <FileUpload.Dropzone
        style={{
          border: '2px dashed #d1d5db',
          borderRadius: 12,
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      >
        <FileUpload.Label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Drop files here
        </FileUpload.Label>
        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>PNG, JPG, WebP up to 10MB</span>
        <FileUpload.Trigger
          style={{
            display: 'block',
            margin: '16px auto 0',
            padding: '8px 20px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Browse Files
        </FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item
                key={file.name}
                file={file}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: '#f9fafb',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                }}
              >
                <FileUpload.ItemName style={{ fontSize: '0.875rem' }} />
                <FileUpload.ItemSizeText style={{ fontSize: '0.75rem', color: '#9ca3af' }} />
                <FileUpload.ItemDeleteTrigger style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                  ✕
                </FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}
```

```tsx
// Slider + RangeSlider
import { Slider } from '@ark-ui/react';

const sliderTrackStyle = {
  position: 'relative' as const,
  height: 6,
  background: '#e5e7eb',
  borderRadius: 3,
  margin: '16px 0',
};

const thumbStyle = {
  width: 20,
  height: 20,
  background: '#6366f1',
  border: '2px solid white',
  borderRadius: '50%',
  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
  cursor: 'grab',
  top: '50%',
  transform: 'translateY(-50%)',
  position: 'absolute' as const,
};

export function ArkSlider() {
  return (
    <Slider.Root min={0} max={100} defaultValue={[40]} style={{ width: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Slider.Label style={{ fontWeight: 500 }}>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track style={sliderTrackStyle}>
          <Slider.Range style={{ position: 'absolute', height: '100%', background: '#6366f1', borderRadius: 3 }} />
        </Slider.Track>
        <Slider.Thumb index={0} style={thumbStyle}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  );
}

export function ArkRangeSlider() {
  return (
    <Slider.Root min={0} max={1000} defaultValue={[200, 800]} style={{ width: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Slider.Label style={{ fontWeight: 500 }}>Price Range</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track style={sliderTrackStyle}>
          <Slider.Range style={{ position: 'absolute', height: '100%', background: '#6366f1', borderRadius: 3 }} />
        </Slider.Track>
        <Slider.Thumb index={0} style={thumbStyle}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1} style={thumbStyle}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 250, 500, 750, 1000].map((val) => (
          <Slider.Marker key={val} value={val} style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
            ${val}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider.Root>
  );
}
```
