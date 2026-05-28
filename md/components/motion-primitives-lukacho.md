# Motion Primitives + Lukacho UI — Full Reference

> Stack: React 18 + TypeScript + Framer Motion + Tailwind CSS
> Install: `npm i framer-motion` — all components are copy-paste ready.

---

## Motion Primitives

### 1. Animated Group — Stagger Children on Mount

```tsx
// components/motion/AnimatedGroup.tsx
'use client';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
}

const defaultContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function AnimatedGroup({
  children,
  className,
  staggerDelay = 0.1,
  variants,
}: AnimatedGroupProps) {
  const containerVariants: Variants = variants?.container ?? {
    ...defaultContainerVariants,
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={variants?.item ?? defaultItemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={variants?.item ?? defaultItemVariants}>{children}</motion.div>}
    </motion.div>
  );
}

// Usage:
// <AnimatedGroup className="flex flex-col gap-4" staggerDelay={0.15}>
//   <Card />
//   <Card />
//   <Card />
// </AnimatedGroup>
```

---

### 2. Text Effect — Word/Char Reveal with Variants

```tsx
// components/motion/TextEffect.tsx
'use client';
import { motion, Variants } from 'framer-motion';

type TextEffectMode = 'word' | 'char';
type TextEffectPreset = 'fade-up' | 'fade-in' | 'blur' | 'slide-in' | 'typewriter';

interface TextEffectProps {
  text: string;
  mode?: TextEffectMode;
  preset?: TextEffectPreset;
  className?: string;
  delay?: number;
  duration?: number;
}

const presets: Record<TextEffectPreset, { container: Variants; item: Variants }> = {
  'fade-up': {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
  },
  'fade-in': {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    },
  },
  blur: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } },
    },
  },
  'slide-in': {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    },
  },
  typewriter: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } },
    item: {
      hidden: { opacity: 0, display: 'none' },
      visible: { opacity: 1, display: 'inline', transition: { duration: 0 } },
    },
  },
};

export function TextEffect({
  text,
  mode = 'word',
  preset = 'fade-up',
  className,
  delay = 0,
  duration,
}: TextEffectProps) {
  const segments = mode === 'word' ? text.split(' ') : text.split('');
  const { container, item } = presets[preset];

  const containerWithDelay: Variants = {
    ...container,
    visible: {
      ...(container.visible as object),
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerWithDelay}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={item}
          className="inline-block"
          style={duration ? { transition: `all ${duration}s` } : undefined}
        >
          {segment}
          {mode === 'word' && i < segments.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Usage:
// <TextEffect text="Hello World" mode="word" preset="blur" delay={0.2} className="text-4xl font-bold" />
// <TextEffect text="Type me out" mode="char" preset="typewriter" />
```

---

### 3. Scroll Progress — Page Scroll Indicator

```tsx
// components/motion/ScrollProgress.tsx
'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  color?: string;
  height?: number;
  springConfig?: { stiffness: number; damping: number };
}

export function ScrollProgress({
  position = 'top',
  color = 'hsl(var(--primary))',
  height = 3,
  springConfig = { stiffness: 100, damping: 30 },
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springConfig);

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        scaleX,
        height,
        background: color,
        top: position === 'top' ? 0 : undefined,
        bottom: position === 'bottom' ? 0 : undefined,
      }}
    />
  );
}

// Usage:
// <ScrollProgress position="top" color="linear-gradient(90deg, #6366f1, #8b5cf6)" height={4} />
```

---

### 4. In View — Trigger Animation When Element Enters Viewport

```tsx
// components/motion/InView.tsx
'use client';
import { motion, Variants, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface InViewProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
  amount?: number | 'some' | 'all';
  delay?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function InView({
  children,
  className,
  variants = defaultVariants,
  once = true,
  amount = 0.2,
  delay = 0,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Usage:
// <InView delay={0.2} once>
//   <MyComponent />
// </InView>
```

---

### 5. Transition Panel — Animated Content Switcher

```tsx
// components/motion/TransitionPanel.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface PanelItem {
  id: string | number;
  label: string;
  content: ReactNode;
}

interface TransitionPanelProps {
  items: PanelItem[];
  className?: string;
  tabClassName?: string;
  direction?: 'horizontal' | 'vertical';
}

export function TransitionPanel({
  items,
  className,
  tabClassName,
  direction = 'horizontal',
}: TransitionPanelProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [prev, setPrev] = useState<string | number | null>(null);

  const activeIndex = items.findIndex((i) => i.id === activeId);
  const prevIndex = items.findIndex((i) => i.id === prev);
  const forward = activeIndex >= prevIndex;

  const offset = direction === 'horizontal' ? { x: forward ? 40 : -40 } : { y: forward ? 40 : -40 };

  const handleChange = (id: string | number) => {
    setPrev(activeId);
    setActiveId(id);
  };

  return (
    <div className={className}>
      <div className="flex gap-2 mb-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleChange(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeId === item.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            } ${tabClassName ?? ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeId}
            initial={{ opacity: 0, ...offset }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...Object.fromEntries(Object.entries(offset).map(([k, v]) => [k, -v])) }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {items.find((i) => i.id === activeId)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

### 6. Image Comparison — Before/After Drag Slider

```tsx
// components/motion/ImageComparison.tsx
'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface ImageComparisonProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  className?: string;
  initialPosition?: number;
}

export function ImageComparison({
  before,
  after,
  className,
  initialPosition = 50,
}: ImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const position = useMotionValue(initialPosition);
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    position.set(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none rounded-xl ${className ?? ''}`}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      {/* After image (base layer) */}
      <img src={after.src} alt={after.alt} className="w-full h-full object-cover" draggable={false} />

      {/* Before image (clipped layer) */}
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <img src={before.src} alt={before.alt} className="w-full h-full object-cover" draggable={false} />
      </motion.div>

      {/* Divider */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
        style={{ left: useTransform(position, (v) => `${v}%`) }}
        onPointerDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </motion.div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</span>
      <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">After</span>
    </div>
  );
}
```

---

### 7. Morphing Dialog — Element Expands Into Modal

```tsx
// components/motion/MorphingDialog.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { createContext, useContext, useRef, useState, ReactNode, useId } from 'react';

interface MorphingDialogContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  id: string;
}

const MorphingDialogContext = createContext<MorphingDialogContextType | null>(null);

const useMorphingDialog = () => {
  const ctx = useContext(MorphingDialogContext);
  if (!ctx) throw new Error('useMorphingDialog must be used within MorphingDialog');
  return ctx;
};

export function MorphingDialog({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null!);
  const id = useId();

  return (
    <MorphingDialogContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), triggerRef, id }}
    >
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open, triggerRef, id } = useMorphingDialog();
  return (
    <motion.div
      ref={triggerRef}
      layoutId={`morphing-dialog-${id}`}
      onClick={open}
      className={`cursor-pointer ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen, close, id } = useMorphingDialog();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            layoutId={`morphing-dialog-${id}`}
            className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl ${className ?? 'w-[90vw] max-w-lg p-6'}`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function MorphingDialogClose({ children, className }: { children?: ReactNode; className?: string }) {
  const { close } = useMorphingDialog();
  return (
    <button onClick={close} className={className ?? 'absolute top-4 right-4 text-gray-500 hover:text-gray-900'}>
      {children ?? '✕'}
    </button>
  );
}

// Usage:
// <MorphingDialog>
//   <MorphingDialogTrigger className="rounded-lg bg-zinc-100 p-4 w-48">
//     <img src="/thumbnail.jpg" />
//     <p>Click to expand</p>
//   </MorphingDialogTrigger>
//   <MorphingDialogContent>
//     <MorphingDialogClose />
//     <p>Full content here</p>
//   </MorphingDialogContent>
// </MorphingDialog>
```

---

### 8. Spinning Text — Circular Rotating Text

```tsx
// components/motion/SpinningText.tsx
'use client';
import { motion } from 'framer-motion';

interface SpinningTextProps {
  text: string;
  radius?: number;
  duration?: number;
  className?: string;
  fontSize?: number;
  direction?: 'cw' | 'ccw';
}

export function SpinningText({
  text,
  radius = 60,
  duration = 8,
  className,
  fontSize = 12,
  direction = 'cw',
}: SpinningTextProps) {
  const chars = text.split('');
  const angleStep = 360 / chars.length;

  return (
    <motion.div
      className={`relative ${className ?? ''}`}
      style={{ width: radius * 2, height: radius * 2 }}
      animate={{ rotate: direction === 'cw' ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {chars.map((char, i) => {
        const angle = angleStep * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = radius + radius * Math.cos(rad) - fontSize / 2;
        const y = radius + radius * Math.sin(rad) - fontSize / 2;

        return (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: x,
              top: y,
              fontSize,
              transform: `rotate(${angle + 90}deg)`,
              transformOrigin: 'center',
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}

// Usage:
// <SpinningText text="AVAILABLE FOR WORK • OPEN TO HIRE • " radius={80} duration={10} className="text-zinc-500" />
```

---

### 9. Progressive Blur — Blur Increases with Scroll

```tsx
// components/motion/ProgressiveBlur.tsx
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ProgressiveBlurProps {
  children: ReactNode;
  className?: string;
  maxBlur?: number;
  scrollRange?: [number, number];
}

export function ProgressiveBlur({
  children,
  className,
  maxBlur = 12,
  scrollRange = [0, 0.3],
}: ProgressiveBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const blur = useTransform(scrollYProgress, scrollRange, [0, maxBlur]);
  const filterValue = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div ref={ref} className={className} style={{ filter: filterValue }}>
      {children}
    </motion.div>
  );
}
```

---

### 10. Cursor — Custom Cursor with Follower

```tsx
// components/motion/CustomCursor.tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CustomCursorProps {
  dotSize?: number;
  followerSize?: number;
  dotColor?: string;
  followerColor?: string;
  springConfig?: { stiffness: number; damping: number };
}

export function CustomCursor({
  dotSize = 8,
  followerSize = 32,
  dotColor = '#6366f1',
  followerColor = 'rgba(99,102,241,0.2)',
  springConfig = { stiffness: 150, damping: 20 },
}: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: useTransform(cursorX, (v) => v - dotSize / 2),
          y: useTransform(cursorY, (v) => v - dotSize / 2),
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
      />

      {/* Follower */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border"
        style={{
          x: useTransform(followerX, (v) => v - followerSize / 2),
          y: useTransform(followerY, (v) => v - followerSize / 2),
          width: isPointer ? followerSize * 1.5 : followerSize,
          height: isPointer ? followerSize * 1.5 : followerSize,
          backgroundColor: followerColor,
          borderColor: dotColor,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  );
}

// Add to layout.tsx root, outside main content
```

---

### 11. Dock — macOS Dock Magnification

```tsx
// components/motion/Dock.tsx
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface DockItemProps {
  children: ReactNode;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  label?: string;
}

function DockItem({ children, mouseX, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  const size = useTransform(distance, [-120, 0, 120], [40, 72, 40]);
  const springSize = useSpring(size, { stiffness: 300, damping: 25 });

  return (
    <div className="relative flex flex-col items-center group">
      {label && (
        <span className="absolute -top-9 bg-zinc-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {label}
        </span>
      )}
      <motion.div
        ref={ref}
        style={{ width: springSize, height: springSize }}
        className="flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface DockProps {
  items: { icon: ReactNode; label?: string; onClick?: () => void }[];
  className?: string;
}

export function Dock({ items, className }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className={`flex items-end gap-2 px-4 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl ${className ?? ''}`}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, i) => (
        <div key={i} onClick={item.onClick}>
          <DockItem mouseX={mouseX} label={item.label}>
            {item.icon}
          </DockItem>
        </div>
      ))}
    </motion.div>
  );
}
```

---

### 12. Animated Background — Gradient Mesh

```tsx
// components/motion/AnimatedBackground.tsx
'use client';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  colors?: string[];
  duration?: number;
}

export function AnimatedBackground({
  className,
  colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'],
  duration = 8,
}: AnimatedBackgroundProps) {
  const gradients = [
    `radial-gradient(ellipse at 20% 20%, ${colors[0]}40 0%, transparent 60%)`,
    `radial-gradient(ellipse at 80% 80%, ${colors[1]}40 0%, transparent 60%)`,
    `radial-gradient(ellipse at 80% 20%, ${colors[2]}40 0%, transparent 60%)`,
    `radial-gradient(ellipse at 20% 80%, ${colors[3]}40 0%, transparent 60%)`,
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {gradients.map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: gradient }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, i % 2 === 0 ? 30 : -30, 0],
            y: [0, i < 2 ? -20 : 20, 0],
          }}
          transition={{
            duration: duration + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * (duration / 4),
          }}
        />
      ))}
    </div>
  );
}
```

---

### 13. Noise Pattern — CSS Noise Texture Overlay

```tsx
// components/motion/NoisePattern.tsx
'use client';

interface NoisePatternProps {
  opacity?: number;
  className?: string;
  blendMode?: string;
}

export function NoisePattern({
  opacity = 0.05,
  className,
  blendMode = 'overlay',
}: NoisePatternProps) {
  // SVG-based noise using feTurbulence — no external assets needed
  const svgNoise = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
      <filter id='noise'>
        <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='300' height='300' filter='url(#noise)' opacity='1'/>
    </svg>
  `)}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: `url("${svgNoise}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity,
        mixBlendMode: blendMode as any,
      }}
      aria-hidden="true"
    />
  );
}

// Wrap any section:
// <section className="relative">
//   <NoisePattern opacity={0.04} />
//   <h1>Content here</h1>
// </section>
```

---

## Lukacho UI

### 1. Animated Gradient Button

```tsx
// components/lukacho/GradientButton.tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };

export function GradientButton({
  children,
  onClick,
  className,
  gradient = 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
  size = 'md',
}: GradientButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative font-semibold text-white rounded-xl overflow-hidden ${sizes[size]} ${className ?? ''}`}
      style={{ background: gradient, backgroundSize: '200% 200%' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: gradient, backgroundSize: '200% 200%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

### 2. Glowing Outline Input

```tsx
// components/lukacho/GlowInput.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, InputHTMLAttributes } from 'react';

interface GlowInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  glowColor?: string;
  error?: string;
}

export function GlowInput({ label, glowColor = '#6366f1', error, className, ...props }: GlowInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      )}
      <motion.div
        animate={{
          boxShadow: focused ? `0 0 0 3px ${glowColor}40, 0 0 20px ${glowColor}20` : '0 0 0 1px #e4e4e7',
        }}
        transition={{ duration: 0.2 }}
        className="rounded-lg overflow-hidden"
      >
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none border-0 text-sm placeholder:text-zinc-400 ${className ?? ''}`}
        />
      </motion.div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

---

### 3. Spotlight Hover Card

```tsx
// components/lukacho/SpotlightCard.tsx
'use client';
import { useRef, ReactNode, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ children, className, spotlightColor = 'rgba(99,102,241,0.15)' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden p-6 transition-transform hover:scale-[1.01] ${className ?? ''}`}
      style={
        {
          '--spotlight-x': '50%',
          '--spotlight-y': '50%',
          '--spotlight-color': spotlightColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

### 4. Animated Counter Badge

```tsx
// components/lukacho/CounterBadge.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface CounterBadgeProps {
  count: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md';
}

export function CounterBadge({ count, max = 99, color = 'bg-red-500', size = 'md' }: CounterBadgeProps) {
  const display = count > max ? `${max}+` : count;
  const sizeClass = size === 'sm' ? 'min-w-[18px] h-[18px] text-[10px]' : 'min-w-[22px] h-[22px] text-xs';

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={display}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`inline-flex items-center justify-center rounded-full font-bold text-white px-1 ${color} ${sizeClass}`}
      >
        {display}
      </motion.span>
    </AnimatePresence>
  );
}
```

---

### 5. Morphing Button — Loading State Transition

```tsx
// components/lukacho/MorphingButton.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface MorphingButtonProps {
  onSubmit: () => Promise<void>;
  idleText?: string;
  successText?: string;
  errorText?: string;
  className?: string;
}

export function MorphingButton({
  onSubmit,
  idleText = 'Submit',
  successText = 'Done!',
  errorText = 'Failed',
  className,
}: MorphingButtonProps) {
  const [state, setState] = useState<ButtonState>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onSubmit();
      setState('success');
      setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  };

  const bgColor = { idle: 'bg-indigo-600', loading: 'bg-indigo-500', success: 'bg-green-500', error: 'bg-red-500' }[state];

  return (
    <motion.button
      onClick={handleClick}
      layout
      animate={{ width: state === 'loading' ? 52 : 'auto' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative h-11 rounded-full text-white font-semibold text-sm px-6 overflow-hidden ${bgColor} transition-colors ${className ?? ''}`}
    >
      <AnimatePresence mode="wait">
        {state === 'loading' ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : (
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="block"
          >
            {state === 'success' ? successText : state === 'error' ? errorText : idleText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
```

---

### 6. Neon Glow Text

```tsx
// components/lukacho/NeonText.tsx
'use client';
import { motion } from 'framer-motion';

interface NeonTextProps {
  text: string;
  color?: string;
  className?: string;
  pulse?: boolean;
}

export function NeonText({ text, color = '#6366f1', className, pulse = true }: NeonTextProps) {
  const glowStyles = {
    color,
    textShadow: `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80`,
  };

  if (!pulse) {
    return <span className={className} style={glowStyles}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={glowStyles}
      animate={{
        textShadow: [
          `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80`,
          `0 0 4px ${color}, 0 0 7px ${color}, 0 0 13px ${color}, 0 0 20px ${color}60`,
          `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {text}
    </motion.span>
  );
}
```

---

### 7. Liquid Gradient Background

```tsx
// components/lukacho/LiquidBackground.tsx
'use client';
import { motion } from 'framer-motion';

interface LiquidBackgroundProps {
  className?: string;
  colors?: [string, string, string];
}

export function LiquidBackground({
  className,
  colors = ['#6366f1', '#8b5cf6', '#06b6d4'],
}: LiquidBackgroundProps) {
  const blobs = [
    { size: '70%', x: ['-10%', '20%', '-10%'], y: ['10%', '40%', '10%'], color: colors[0] },
    { size: '60%', x: ['60%', '30%', '60%'], y: ['60%', '20%', '60%'], color: colors[1] },
    { size: '50%', x: ['20%', '60%', '20%'], y: ['50%', '80%', '50%'], color: colors[2] },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-60 blur-3xl"
          style={{ width: blob.size, height: blob.size, backgroundColor: blob.color }}
          animate={{ x: blob.x, y: blob.y }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  );
}
```

---

### 8. Glass Panel Card

```tsx
// components/lukacho/GlassPanel.tsx
'use client';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  dark?: boolean;
}

const blurMap = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-lg', xl: 'backdrop-blur-xl' };

export function GlassPanel({ children, className, blur = 'md', border = true, dark = false }: GlassPanelProps) {
  return (
    <div
      className={`
        rounded-2xl p-6
        ${blurMap[blur]}
        ${dark ? 'bg-black/20' : 'bg-white/10'}
        ${border ? (dark ? 'border border-white/10' : 'border border-white/20') : ''}
        shadow-lg
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
}
```

---

### 9. Shimmer Skeleton

```tsx
// components/lukacho/ShimmerSkeleton.tsx
'use client';

interface ShimmerSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function SkeletonBase({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-700 ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        }}
      />
      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}

export function ShimmerSkeleton({ className, variant = 'rectangular', width, height, lines = 1 }: ShimmerSkeletonProps) {
  const style = { width, height } as React.CSSProperties;

  if (variant === 'text') {
    return (
      <div className={`flex flex-col gap-2 ${className ?? ''}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={`h-4 rounded ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    return <SkeletonBase className={`rounded-full ${className ?? ''}`} />;
  }

  return <SkeletonBase className={`rounded-lg ${className ?? ''}`} />;
}

// Card skeleton:
// <div className="p-4 space-y-3">
//   <ShimmerSkeleton variant="rectangular" height={200} className="w-full" />
//   <ShimmerSkeleton variant="text" lines={3} />
// </div>
```

---

### 10. Animated Progress Ring — SVG Circle

```tsx
// components/lukacho/ProgressRing.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
}

export function ProgressRing({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  color = '#6366f1',
  trackColor = '#e4e4e7',
  showLabel = true,
  label,
  animate: shouldAnimate = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (percentage / 100) * circumference;

  const [displayed, setDisplayed] = useState(shouldAnimate ? 0 : value);

  useEffect(() => {
    if (!shouldAnimate) { setDisplayed(value); return; }
    const start = Date.now();
    const duration = 1200;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(value * ease));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [value, shouldAnimate]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>
      {showLabel && (
        <div className="absolute text-center">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{displayed}</span>
          {label && <p className="text-xs text-zinc-500 mt-0.5">{label}</p>}
        </div>
      )}
    </div>
  );
}
```
