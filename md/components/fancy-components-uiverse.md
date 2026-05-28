# Fancy Components + UIverse — CSS & Animation Patterns

> Stack: React 18 + TypeScript + Tailwind CSS + Framer Motion
> Fancy Components patterns use canvas/SVG. UIverse CSS patterns converted to React/Tailwind.

---

## Fancy Components (fancycomponents.dev)

### 1. Pixel Trail Cursor Effect — Canvas

```tsx
// components/fancy/PixelTrailCursor.tsx
'use client';
import { useEffect, useRef } from 'react';

interface Pixel {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  decay: number;
}

interface PixelTrailCursorProps {
  color?: string;
  pixelSize?: number;
  trailLength?: number;
  gap?: number;
}

export function PixelTrailCursor({
  color = '#6366f1',
  pixelSize = 8,
  trailLength = 40,
  gap = 12,
}: PixelTrailCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const lastPos = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [color, `${color}cc`, `${color}88`, `${color}44`];

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < gap) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const snapX = Math.floor(e.clientX / pixelSize) * pixelSize;
      const snapY = Math.floor(e.clientY / pixelSize) * pixelSize;

      pixelsRef.current.push({
        x: snapX,
        y: snapY,
        size: pixelSize,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        decay: 0.015 + Math.random() * 0.01,
      });

      if (pixelsRef.current.length > trailLength) {
        pixelsRef.current.shift();
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pixelsRef.current = pixelsRef.current.filter((p) => p.opacity > 0);

      pixelsRef.current.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.opacity -= p.decay;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, pixelSize, trailLength, gap]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}

// Add to layout root: <PixelTrailCursor color="#6366f1" pixelSize={10} />
```

---

### 2. Splash Cursor — Fluid Simulation Canvas

```tsx
// components/fancy/SplashCursor.tsx
'use client';
import { useEffect, useRef } from 'react';

// Simplified fluid simulation — ripple on click/drag
interface SplashPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: [number, number, number];
}

interface SplashCursorProps {
  color?: [number, number, number];
  splashCount?: number;
}

export function SplashCursor({
  color = [99, 102, 241],
  splashCount = 16,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<SplashPoint[]>([]);
  const rafRef = useRef<number>(0);
  const dragging = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const splash = (x: number, y: number, force = 1) => {
      for (let i = 0; i < splashCount; i++) {
        const angle = (i / splashCount) * Math.PI * 2;
        const speed = (2 + Math.random() * 4) * force;
        points.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          color,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => { dragging.current = true; splash(e.clientX, e.clientY, 1.5); };
    const onMouseMove = (e: MouseEvent) => { if (dragging.current) splash(e.clientX, e.clientY, 0.5); };
    const onMouseUp = () => { dragging.current = false; };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.current = points.current.filter((p) => p.life > 0);

      points.current.forEach((p) => {
        const alpha = p.life;
        const radius = 4 * p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(',')},${alpha * 0.7})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vy += 0.05;
        p.life -= 1 / p.maxLife;
      });

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, splashCount]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9997]" />;
}
```

---

### 3. ASCII Image Effect

```tsx
// components/fancy/ASCIIImage.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

const CHARS = '@#S%?*+;:,. ';

interface ASCIIImageProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  fontSize?: number;
}

export function ASCIIImage({
  src,
  width = 80,
  height = 40,
  className,
  color = '#6366f1',
  fontSize = 8,
}: ASCIIImageProps) {
  const [ascii, setAscii] = useState<string[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      const rows: string[][] = [];

      for (let y = 0; y < height; y++) {
        const row: string[] = [];
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          const charIndex = Math.floor(brightness * (CHARS.length - 1));
          row.push(CHARS[charIndex]);
        }
        rows.push(row);
      }
      setAscii(rows);
    };
    img.src = src;
  }, [src, width, height]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <pre
        className={`font-mono leading-none select-none ${className ?? ''}`}
        style={{ fontSize, color, letterSpacing: '0.05em', lineHeight: `${fontSize + 1}px` }}
      >
        {ascii.map((row, i) => (
          <span key={i}>{row.join('')}{'\n'}</span>
        ))}
      </pre>
    </>
  );
}
```

---

### 4. Pixel Transition — Grid Pixel Reveal Page Transition

```tsx
// components/fancy/PixelTransition.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface PixelTransitionProps {
  children: ReactNode;
  pageKey: string;
  gridSize?: number;
  color?: string;
  duration?: number;
}

export function PixelTransition({
  children,
  pageKey,
  gridSize = 10,
  color = '#6366f1',
  duration = 0.04,
}: PixelTransitionProps) {
  const cells = Array.from({ length: gridSize * gridSize });

  const getDelay = (i: number) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    return (row + col) * duration;
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={pageKey}>
          {/* Pixel overlay */}
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial="visible"
            animate="hidden"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}
          >
            {cells.map((_, i) => (
              <motion.div
                key={i}
                style={{ backgroundColor: color }}
                variants={{
                  visible: { scaleY: 1 },
                  hidden: { scaleY: 0, transition: { delay: getDelay(i), duration: 0.3 } },
                }}
                initial="visible"
                animate="hidden"
              />
            ))}
          </motion.div>

          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

---

### 5. Distortion Text — SVG feTurbulence

```tsx
// components/fancy/DistortionText.tsx
'use client';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';

interface DistortionTextProps {
  text: string;
  className?: string;
  baseFrequency?: number;
  hoverIntensity?: number;
}

export function DistortionText({
  text,
  className,
  baseFrequency = 0.01,
  hoverIntensity = 0.05,
}: DistortionTextProps) {
  const id = useId().replace(/:/g, '');
  const [isHovered, setIsHovered] = useState(false);
  const freq = isHovered ? hoverIntensity : baseFrequency;

  return (
    <span
      className={`relative inline-block ${className ?? ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`distortion-${id}`}>
            <motion.feTurbulence
              type="turbulence"
              baseFrequency={freq}
              numOctaves="3"
              result="turbulence"
              animate={{ baseFrequency: freq } as any}
              transition={{ duration: 0.4 }}
            />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={isHovered ? 15 : 0} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <motion.span
        style={{ display: 'inline-block', filter: `url(#distortion-${id})` }}
        animate={{ filter: `url(#distortion-${id})` }}
      >
        {text}
      </motion.span>
    </span>
  );
}
```

---

### 6. Elastic Line — SVG Path Follows Cursor

```tsx
// components/fancy/ElasticLine.tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useCallback } from 'react';

interface ElasticLineProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  height?: number;
}

export function ElasticLine({
  className,
  color = '#6366f1',
  strokeWidth = 2,
  height = 60,
}: ElasticLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cy = useMotionValue(height / 2);
  const cx = useMotionValue(50);
  const springY = useSpring(cy, { stiffness: 200, damping: 20 });
  const springX = useSpring(cx, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = e.clientY - rect.top;
    cx.set(relX);
    cy.set(relY);
  }, [cx, cy]);

  const handleMouseLeave = useCallback(() => {
    cy.set(height / 2);
    cx.set(50);
  }, [cy, cx, height]);

  const pathD = useMotionValue('');

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${className ?? ''}`}
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg width="100%" height={height} className="absolute">
        <motion.path
          d={`M 0 ${height / 2} Q ${springX.get()}% ${springY.get()} 100% ${height / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          style={{
            d: `path("M 0 ${height / 2} Q ${springX.get()}% ${springY.get()} 100% ${height / 2}")`,
          }}
        />
      </svg>
    </div>
  );
}

// Better SVG elastic line using useTransform:
// components/fancy/ElasticLineV2.tsx
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ElasticLineV2({
  color = '#6366f1',
  strokeWidth = 2,
  height = 80,
}: {
  color?: string;
  strokeWidth?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(height / 2);
  const springX = useSpring(mouseX, { stiffness: 250, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 18 });

  const d = useTransform([springX, springY], ([x, y]: number[]) =>
    `M 0 ${height / 2} Q ${x}% ${y} 100% ${height / 2}`
  );

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(50);
        mouseY.set(height / 2);
      }}
    >
      <svg width="100%" height={height}>
        <motion.path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    </div>
  );
}
```

---

### 7. Noise Transition Overlay

```tsx
// components/fancy/NoiseTransition.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface NoiseTransitionProps {
  isActive: boolean;
  children?: ReactNode;
  color?: string;
}

const noiseSVG = `data:image/svg+xml;base64,${
  typeof btoa !== 'undefined'
    ? btoa(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/>
  <feColorMatrix type='saturate' values='0'/></filter>
  <rect width='200' height='200' filter='url(#n)'/></svg>`)
    : ''
}`;

export function NoiseTransition({ isActive, children, color = '#0f0f0f' }: NoiseTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ backgroundColor: color }}
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("${noiseSVG}")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px',
            }}
          />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### 8. Variable Font Hover Animation

```tsx
// components/fancy/VariableFontHover.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface VariableFontHoverProps {
  text: string;
  className?: string;
  fontFamily?: string;
  normalSettings?: string;
  hoverSettings?: string;
}

export function VariableFontHover({
  text,
  className,
  fontFamily = 'inherit',
  normalSettings = '"wght" 400',
  hoverSettings = '"wght" 900, "wdth" 125',
}: VariableFontHoverProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className ?? ''}`} style={{ fontFamily }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          animate={{
            fontVariationSettings: hovered === i ? hoverSettings : normalSettings,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-block cursor-default"
          style={{ fontVariationSettings: normalSettings }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Requires a variable font loaded in your CSS:
// @font-face { font-family: 'MyVar'; src: url('/fonts/MyVar.woff2'); }
```

---

### 9. Magnetic Cursor Attraction

```tsx
// components/fancy/MagneticElement.tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export function MagneticElement({
  children,
  className,
  strength = 0.4,
  radius = 80,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}

// Usage: Wrap any button or icon:
// <MagneticElement strength={0.5}>
//   <Button>Contact</Button>
// </MagneticElement>
```

---

### 10. Scroll Velocity Text — Speed-Based Skew

```tsx
// components/fancy/ScrollVelocityText.tsx
'use client';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollVelocityTextProps {
  children: ReactNode;
  className?: string;
  maxSkew?: number;
  maxScale?: number;
}

export function ScrollVelocityText({
  children,
  className,
  maxSkew = 15,
  maxScale = 0.05,
}: ScrollVelocityTextProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(scrollVelocity, { stiffness: 300, damping: 50 });

  const skewX = useTransform(skewVelocity, [-3000, 0, 3000], [-maxSkew, 0, maxSkew]);
  const scaleX = useTransform(skewVelocity, [-3000, 0, 3000], [1 + maxScale, 1, 1 + maxScale]);

  return (
    <motion.div className={className} style={{ skewX, scaleX }}>
      {children}
    </motion.div>
  );
}
```

---

## UIverse.io — Converted to React/Tailwind

### 1. Neon Toggle Switch

```tsx
// components/uiverse/NeonToggle.tsx
'use client';
import { useState } from 'react';

interface NeonToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: string;
  label?: string;
}

export function NeonToggle({ defaultChecked = false, onChange, color = '#6366f1', label }: NeonToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={toggle}
        className="relative w-14 h-7 rounded-full transition-all duration-300"
        style={{
          backgroundColor: checked ? `${color}30` : '#27272a',
          border: `1px solid ${checked ? color : '#3f3f46'}`,
          boxShadow: checked ? `0 0 12px ${color}60, inset 0 0 8px ${color}20` : 'none',
        }}
      >
        <div
          className="absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 shadow-md"
          style={{
            left: checked ? 'calc(100% - 26px)' : '2px',
            backgroundColor: checked ? color : '#71717a',
            boxShadow: checked ? `0 0 8px ${color}, 0 0 16px ${color}60` : 'none',
          }}
        />
      </div>
      {label && <span className="text-sm text-zinc-300">{label}</span>}
    </label>
  );
}
```

---

### 2. Glassmorphism Card with Hover Tilt

```tsx
// components/uiverse/GlassCard.tsx
'use client';
import { useRef, ReactNode, MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function GlassCard({ children, className, maxTilt = 15 }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current!;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current!;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        rounded-2xl p-6 transition-transform duration-100 ease-out
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        ${className ?? ''}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
```

---

### 3. Animated Gradient Border — CSS @property via Tailwind

```tsx
// components/uiverse/GradientBorderCard.tsx
'use client';
import { ReactNode } from 'react';

interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  animationDuration?: number;
}

export function GradientBorderCard({
  children,
  className,
  borderWidth = 2,
  animationDuration = 4,
}: GradientBorderCardProps) {
  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .gradient-border-anim {
          border: ${borderWidth}px solid transparent;
          background-image: linear-gradient(#0f0f0f, #0f0f0f), conic-gradient(from var(--angle), #6366f1, #8b5cf6, #06b6d4, #10b981, #6366f1);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          animation: rotate-angle ${animationDuration}s linear infinite;
        }
        @keyframes rotate-angle { to { --angle: 360deg; } }
      `}</style>
      <div className={`gradient-border-anim rounded-2xl p-6 ${className ?? ''}`}>
        {children}
      </div>
    </>
  );
}
```

---

### 4. Liquid Button — CSS Blob Animation

```tsx
// components/uiverse/LiquidButton.tsx
'use client';
import { ReactNode } from 'react';

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
}

export function LiquidButton({ children, onClick, color = '#6366f1', className }: LiquidButtonProps) {
  return (
    <>
      <style>{`
        .liquid-btn { position: relative; overflow: hidden; }
        .liquid-btn::before, .liquid-btn::after {
          content: '';
          position: absolute;
          border-radius: 40%;
          background: ${color};
          animation: liquid-wave 6s linear infinite;
          width: 200%;
          height: 200%;
          left: -50%;
        }
        .liquid-btn::before { top: -35%; animation-delay: -3s; opacity: 0.7; }
        .liquid-btn::after  { top: -30%; opacity: 0.5; }
        .liquid-btn:hover::before { top: -50%; }
        .liquid-btn:hover::after  { top: -45%; }
        .liquid-btn::before, .liquid-btn::after { transition: top 0.5s ease; }
        @keyframes liquid-wave { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <button
        onClick={onClick}
        className={`liquid-btn relative h-12 px-8 rounded-full font-semibold text-white z-0 ${className ?? ''}`}
        style={{ backgroundColor: color }}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
```

---

### 5. Checkbox Animations — 10 Variants

```tsx
// components/uiverse/AnimatedCheckbox.tsx
'use client';
import { useState } from 'react';

type CheckboxVariant =
  | 'bounce' | 'scale' | 'rotate' | 'flip' | 'slide'
  | 'glow' | 'shake' | 'pop' | 'draw' | 'pulse';

interface AnimatedCheckboxProps {
  variant?: CheckboxVariant;
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: string;
}

const variantStyles: Record<CheckboxVariant, string> = {
  bounce: 'peer-checked:[animation:checkbox-bounce_0.4s_ease]',
  scale: 'peer-checked:scale-125 transition-transform duration-200',
  rotate: 'peer-checked:rotate-12 transition-transform duration-300',
  flip: 'peer-checked:[transform:rotateY(180deg)] transition-transform duration-500',
  slide: 'peer-checked:translate-x-1 transition-transform duration-200',
  glow: 'peer-checked:[box-shadow:0_0_12px_currentColor]',
  shake: 'peer-checked:[animation:checkbox-shake_0.4s_ease]',
  pop: 'peer-checked:[animation:checkbox-pop_0.3s_ease]',
  draw: 'transition-all duration-300',
  pulse: 'peer-checked:[animation:checkbox-pulse_0.4s_ease]',
};

export function AnimatedCheckbox({
  variant = 'bounce',
  label,
  defaultChecked = false,
  onChange,
  color = '#6366f1',
}: AnimatedCheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <>
      <style>{`
        @keyframes checkbox-bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
        @keyframes checkbox-shake { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-10deg)} 75%{transform:rotate(10deg)} }
        @keyframes checkbox-pop { 0%{transform:scale(0.8)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes checkbox-pulse { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 6px transparent} }
      `}</style>
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => { setChecked(e.target.checked); onChange?.(e.target.checked); }}
        />
        <div
          className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
            border-zinc-300 peer-checked:border-transparent
            ${variantStyles[variant]}
          `}
          style={{ color, backgroundColor: checked ? color : 'transparent' }}
        >
          {checked && (
            <svg viewBox="0 0 12 10" className="w-3 h-3" fill="none" stroke="white" strokeWidth={2}>
              <polyline points="1 5 4.5 8.5 11 1" />
            </svg>
          )}
        </div>
        {label && <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>}
      </label>
    </>
  );
}
```

---

### 6. Radio Button Styles — 5 Variants

```tsx
// components/uiverse/AnimatedRadio.tsx
'use client';
import { useState } from 'react';

type RadioVariant = 'dot' | 'fill' | 'ring' | 'check' | 'slide';

interface RadioOption { value: string; label: string; }
interface AnimatedRadioGroupProps {
  options: RadioOption[];
  variant?: RadioVariant;
  color?: string;
  name: string;
  onChange?: (value: string) => void;
}

export function AnimatedRadioGroup({
  options,
  variant = 'dot',
  color = '#6366f1',
  name,
  onChange,
}: AnimatedRadioGroupProps) {
  const [selected, setSelected] = useState(options[0]?.value);

  const renderIndicator = (value: string) => {
    const active = selected === value;
    switch (variant) {
      case 'dot':
        return (
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
            style={{ borderColor: active ? color : '#d4d4d8' }}>
            {active && <div className="w-2 h-2 rounded-full transition-transform scale-100" style={{ backgroundColor: color }} />}
          </div>
        );
      case 'fill':
        return (
          <div className="w-4 h-4 rounded-full border-2 transition-all"
            style={{ borderColor: color, backgroundColor: active ? color : 'transparent' }} />
        );
      case 'ring':
        return (
          <div className="w-4 h-4 rounded-full border-2 transition-all"
            style={{
              borderColor: active ? color : '#d4d4d8',
              boxShadow: active ? `0 0 0 3px ${color}40` : 'none',
            }} />
        );
      case 'check':
        return (
          <div className="w-4 h-4 rounded-sm border-2 flex items-center justify-center"
            style={{ borderColor: active ? color : '#d4d4d8', backgroundColor: active ? color : 'transparent' }}>
            {active && <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth={2.5}><polyline points="1 5 4.5 8.5 11 1" /></svg>}
          </div>
        );
      case 'slide':
        return (
          <div className="w-8 h-4 rounded-full relative transition-all"
            style={{ backgroundColor: active ? color : '#e4e4e7' }}>
            <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm"
              style={{ left: active ? 'calc(100% - 14px)' : '2px' }} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            className="sr-only"
            checked={selected === opt.value}
            onChange={() => { setSelected(opt.value); onChange?.(opt.value); }}
          />
          {renderIndicator(opt.value)}
          <span className="text-sm text-zinc-700 dark:text-zinc-300">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
```

---

### 7. Loader Animations — 10 Variants

```tsx
// components/uiverse/Loaders.tsx
'use client';

type LoaderVariant = 'dots' | 'bars' | 'spinner' | 'pulse' | 'wave' | 'ring' | 'bounce' | 'orbit' | 'morph' | 'text';

interface LoaderProps {
  variant?: LoaderVariant;
  color?: string;
  size?: number;
  label?: string;
}

export function Loader({ variant = 'spinner', color = '#6366f1', size = 40, label }: LoaderProps) {
  const s = size;

  const loaders: Record<LoaderVariant, JSX.Element> = {
    spinner: (
      <div className="rounded-full border-4 animate-spin" style={{ width: s, height: s, borderColor: `${color}30`, borderTopColor: color }} />
    ),
    dots: (
      <div className="flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-full animate-bounce" style={{ width: s / 5, height: s / 5, backgroundColor: color, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    ),
    bars: (
      <div className="flex gap-1 items-end" style={{ height: s }}>
        {[0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
          <div key={i} className="rounded-sm" style={{ width: s / 8, backgroundColor: color, animation: `bars-wave 1s ease infinite`, animationDelay: `${i * 0.1}s`, height: `${h * 100}%` }} />
        ))}
        <style>{`@keyframes bars-wave { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(1)} }`}</style>
      </div>
    ),
    pulse: (
      <div className="rounded-full animate-ping" style={{ width: s, height: s, backgroundColor: `${color}60` }}>
        <div className="rounded-full" style={{ width: s, height: s, backgroundColor: color, opacity: 0.8 }} />
      </div>
    ),
    wave: (
      <div className="flex gap-1 items-center">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="rounded-full" style={{ width: 4, height: s * 0.6, backgroundColor: color, animation: 'wave-anim 1.2s ease infinite', animationDelay: `${i * 0.1}s` }} />
        ))}
        <style>{`@keyframes wave-anim { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }`}</style>
      </div>
    ),
    ring: (
      <div className="relative" style={{ width: s, height: s }}>
        <div className="absolute inset-0 rounded-full border-4 opacity-20" style={{ borderColor: color }} />
        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: color, borderRightColor: color }} />
      </div>
    ),
    bounce: (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-full" style={{ width: s / 4, height: s / 4, backgroundColor: color, animation: 'bounce-loader 0.8s ease infinite alternate', animationDelay: `${i * 0.15}s` }} />
        ))}
        <style>{`@keyframes bounce-loader { 0%{transform:translateY(0)} 100%{transform:translateY(-${s / 2}px)} }`}</style>
      </div>
    ),
    orbit: (
      <div className="relative" style={{ width: s, height: s }}>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-current opacity-20" style={{ color }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin" style={{ width: s / 5, height: s / 5, backgroundColor: color, transformOrigin: `0 ${s / 2}px`, animationDuration: '1s' }} />
      </div>
    ),
    morph: (
      <div style={{ width: s, height: s, backgroundColor: color, animation: 'morph 2s ease infinite' }}>
        <style>{`@keyframes morph { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }`}</style>
      </div>
    ),
    text: (
      <div className="flex gap-px font-mono font-bold" style={{ fontSize: s / 3, color }}>
        {'Loading'.split('').map((c, i) => (
          <span key={i} style={{ animation: 'text-blink 1.4s ease infinite', animationDelay: `${i * 0.1}s` }}>{c}</span>
        ))}
        <style>{`@keyframes text-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {loaders[variant]}
      {label && <span className="text-xs text-zinc-500">{label}</span>}
    </div>
  );
}
```

---

### 8. Card Flip 3D — CSS Only (React)

```tsx
// components/uiverse/FlipCard.tsx
'use client';
import { ReactNode, useState } from 'react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  width?: string | number;
  height?: string | number;
  className?: string;
  triggerMode?: 'hover' | 'click';
}

export function FlipCard({ front, back, width = 300, height = 200, className, triggerMode = 'hover' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const props = triggerMode === 'click'
    ? { onClick: () => setFlipped((f) => !f) }
    : { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) };

  return (
    <div
      className={`relative cursor-pointer ${className ?? ''}`}
      style={{ width, height, perspective: 1000 }}
      {...props}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </div>
    </div>
  );
}
```

---

### 9. Floating Label Input — CSS Only (React)

```tsx
// components/uiverse/FloatingLabelInput.tsx
'use client';
import { InputHTMLAttributes, useId } from 'react';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
  error?: string;
}

export function FloatingLabelInput({ label, color = '#6366f1', error, className, ...props }: FloatingLabelInputProps) {
  const id = useId();

  return (
    <div className={`relative ${className ?? ''}`}>
      <input
        {...props}
        id={id}
        placeholder=" "
        className={`
          peer w-full border rounded-lg px-4 pt-5 pb-2 text-sm bg-transparent
          outline-none transition-all
          border-zinc-300 dark:border-zinc-600
          text-zinc-900 dark:text-zinc-100
          focus:border-[var(--focus-color)]
          ${error ? 'border-red-500' : ''}
        `}
        style={{ '--focus-color': color } as React.CSSProperties}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 text-zinc-500 transition-all duration-200 pointer-events-none
          top-3.5 text-sm
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--focus-color)]
          peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
        `}
        style={{ '--focus-color': color } as React.CSSProperties}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

---

### 10. Neumorphism Button Set

```tsx
// components/uiverse/NeumorphismButton.tsx
'use client';
import { ReactNode, useState } from 'react';

type NeuVariant = 'flat' | 'pressed' | 'convex' | 'concave' | 'icon';

interface NeumorphismButtonProps {
  children: ReactNode;
  variant?: NeuVariant;
  onClick?: () => void;
  className?: string;
  bg?: string;
}

const neuStyles: Record<NeuVariant, { normal: string; active: string }> = {
  flat: {
    normal: 'shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff]',
    active: 'shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff]',
  },
  pressed: {
    normal: 'shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff]',
    active: 'shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff]',
  },
  convex: {
    normal: 'shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] [background:linear-gradient(145deg,#f0f0f0,#e6e6e6)]',
    active: 'shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff]',
  },
  concave: {
    normal: 'shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] [background:linear-gradient(145deg,#e6e6e6,#f0f0f0)]',
    active: 'shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff]',
  },
  icon: {
    normal: 'shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] rounded-2xl !p-4',
    active: 'shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff]',
  },
};

export function NeumorphismButton({ children, variant = 'flat', onClick, className, bg = '#e0e0e0' }: NeumorphismButtonProps) {
  const [pressed, setPressed] = useState(false);
  const styles = neuStyles[variant];

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`
        px-6 py-3 rounded-xl font-medium text-zinc-600 transition-all duration-150 select-none
        ${pressed ? styles.active : styles.normal}
        ${className ?? ''}
      `}
      style={{ backgroundColor: bg }}
    >
      {children}
    </button>
  );
}

// Usage:
// Dark mode: bg="#1e1e2e" with adjusted shadow colors in CSS vars
```
