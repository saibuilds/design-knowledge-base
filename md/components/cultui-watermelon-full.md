# Cult UI — Complete Reference

## 3D Flip Card

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  flipDirection?: "horizontal" | "vertical";
  triggerMode?: "hover" | "click";
}

export function FlipCard({
  front,
  back,
  className,
  flipDirection = "horizontal",
  triggerMode = "hover",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const rotateAxis = flipDirection === "horizontal" ? "rotateY" : "rotateX";

  const handleClick = () => {
    if (triggerMode === "click") setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={cn("relative w-64 h-40 cursor-pointer", className)}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => triggerMode === "hover" && setIsFlipped(true)}
      onMouseLeave={() => triggerMode === "hover" && setIsFlipped(false)}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ [rotateAxis]: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform:
              flipDirection === "horizontal"
                ? "rotateY(180deg)"
                : "rotateX(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// Usage example
export function FlipCardDemo() {
  return (
    <FlipCard
      front={
        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center rounded-2xl">
          <span className="text-white text-xl font-bold">Front</span>
        </div>
      }
      back={
        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center rounded-2xl">
          <span className="text-white text-xl font-bold">Back</span>
        </div>
      }
    />
  );
}
```

---

## Animated Beam

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  className?: string;
}

function getCoordinates(
  el: HTMLElement,
  container: HTMLElement
): { x: number; y: number } {
  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    x: elRect.left - containerRect.left + elRect.width / 2,
    y: elRect.top - containerRect.top + elRect.height / 2,
  };
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  className,
}: AnimatedBeamProps) {
  const id = useRef(`beam-${Math.random().toString(36).substr(2, 9)}`);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (
        !containerRef.current ||
        !fromRef.current ||
        !toRef.current ||
        !svgRef.current ||
        !pathRef.current
      )
        return;

      const from = getCoordinates(fromRef.current, containerRef.current);
      const to = getCoordinates(toRef.current, containerRef.current);

      const containerRect = containerRef.current.getBoundingClientRect();
      svgRef.current.setAttribute("width", String(containerRect.width));
      svgRef.current.setAttribute("height", String(containerRect.height));

      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 - curvature;
      const d = `M ${from.x},${from.y} Q ${midX},${midY} ${to.x},${to.y}`;
      pathRef.current.setAttribute("d", d);

      // Animate gradient dash
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      ref={svgRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`${id.current}-gradient`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%" />
          <stop stopColor={gradientStartColor} offset="32.5%" />
          <stop stopColor={gradientStopColor} offset="67.5%" />
          <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%" />
        </linearGradient>
      </defs>
      {/* Static path */}
      <path
        ref={pathRef}
        fill="none"
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
      />
      {/* Animated beam path */}
      <motion.path
        fill="none"
        stroke={`url(#${id.current}-gradient)`}
        strokeWidth={pathWidth}
        initial={{ pathLength: 0, pathOffset: reverse ? -1 : 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        // Copy d from pathRef after mount — done via attribute directly
        style={{ d: pathRef.current?.getAttribute("d") ?? "" }}
      />
    </svg>
  );
}
```

---

## Background Boxes

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

interface BackgroundBoxesProps {
  className?: string;
  rows?: number;
  cols?: number;
}

const colors = [
  "--sky-300",
  "--pink-300",
  "--green-300",
  "--yellow-300",
  "--red-300",
  "--purple-300",
  "--blue-300",
  "--indigo-300",
  "--violet-300",
];

const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

export function BackgroundBoxes({
  className,
  rows = 15,
  cols = 15,
}: BackgroundBoxesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getOpacity = useCallback(
    (index: number) => {
      if (hoveredIndex === null) return 0;
      const hoveredRow = Math.floor(hoveredIndex / cols);
      const hoveredCol = hoveredIndex % cols;
      const currentRow = Math.floor(index / cols);
      const currentCol = index % cols;
      const distance = Math.sqrt(
        Math.pow(hoveredRow - currentRow, 2) +
          Math.pow(hoveredCol - currentCol, 2)
      );
      return Math.max(0, 1 - distance / 3);
    },
    [hoveredIndex, cols]
  );

  return (
    <div
      className={cn(
        "relative h-screen w-full overflow-hidden bg-slate-900",
        className
      )}
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 60%, transparent 100%)",
      }}
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const color = getRandomColor();
          return (
            <motion.div
              key={i}
              className="border border-slate-700/30 relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                backgroundColor:
                  getOpacity(i) > 0.5
                    ? `rgb(var(${color}))`
                    : "transparent",
              }}
              transition={{ duration: 0.2 }}
              style={{ opacity: 0.4 + getOpacity(i) * 0.6 }}
            >
              {getOpacity(i) > 0.7 && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, rgba(var(${color}), 0.8) 0%, transparent 70%)`,
                    filter: "blur(4px)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Border Beam

```tsx
"use client";

import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "[background:linear-gradient(white,white)_padding-box,conic-gradient(from_calc(360deg*(var(--anchor)/100)),transparent_0%,var(--color-from)_var(--start,0%),var(--color-to)_var(--end,100%),transparent_100%)_border-box]",
        "[animation:border-beam_calc(var(--duration)*1s)_infinite_linear]",
        "[animation-delay:var(--delay)]",
        className
      )}
    />
  );
}

// Wrap any card with this as a child. Add these keyframes to your global CSS:
// @keyframes border-beam {
//   100% { --anchor: 490; }
// }

interface BorderBeamCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BorderBeamCard({ children, className }: BorderBeamCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl overflow-hidden",
        className
      )}
    >
      {children}
      <BorderBeam size={250} duration={12} colorFrom="#a855f7" colorTo="#3b82f6" />
    </div>
  );
}
```

---

## Blur Vignette

```tsx
"use client";

import { cn } from "@/lib/utils";

interface BlurVignetteProps {
  children: React.ReactNode;
  className?: string;
  blurAmount?: number;
  spread?: number;
  sides?: ("top" | "bottom" | "left" | "right")[];
  inset?: boolean;
}

export function BlurVignette({
  children,
  className,
  blurAmount = 24,
  spread = 80,
  sides = ["top", "bottom", "left", "right"],
  inset = false,
}: BlurVignetteProps) {
  const gradients: Record<string, string> = {
    top: "linear-gradient(to bottom, black, transparent)",
    bottom: "linear-gradient(to top, black, transparent)",
    left: "linear-gradient(to right, black, transparent)",
    right: "linear-gradient(to left, black, transparent)",
  };

  const positions: Record<string, React.CSSProperties> = {
    top: { top: 0, left: 0, right: 0, height: spread },
    bottom: { bottom: 0, left: 0, right: 0, height: spread },
    left: { top: 0, bottom: 0, left: 0, width: spread },
    right: { top: 0, bottom: 0, right: 0, width: spread },
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {sides.map((side) => (
        <div
          key={side}
          className="pointer-events-none absolute z-10"
          style={{
            ...positions[side],
            maskImage: gradients[side],
            WebkitMaskImage: gradients[side],
            backdropFilter: `blur(${blurAmount}px)`,
          }}
        />
      ))}
    </div>
  );
}
```

---

## Carousel 3D

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Carousel3DProps {
  items: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel3D({
  items,
  className,
  autoPlay = false,
  interval = 3000,
}: Carousel3DProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const count = items.length;

  const getSlideStyle = (offset: number): React.CSSProperties => {
    const angle = offset * (360 / count);
    const radius = 300;
    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      opacity: offset === 0 ? 1 : 0.4,
      zIndex: offset === 0 ? 10 : 1,
      transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
    };
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + count) % count);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % count);
  };

  return (
    <div className={cn("relative flex items-center justify-center h-80", className)}>
      <button
        onClick={prev}
        className="absolute left-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 text-white"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        className="relative w-64 h-64"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: current * -(360 / count) }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {items.map((item, i) => {
            const offset = (i - current + count) % count;
            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={getSlideStyle(i)}
              >
                {item}
              </div>
            );
          })}
        </motion.div>
      </div>

      <button
        onClick={next}
        className="absolute right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 text-white"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
```

---

## Confetti Button

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
}

interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  particleCount?: number;
  className?: string;
}

const COLORS = [
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
  "#ff6bff", "#ff9f43", "#a29bfe", "#fd79a8",
];

export function ConfettiButton({
  children,
  particleCount = 40,
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newParticles: Particle[] = Array.from({ length: particleCount }).map(
      (_, i) => ({
        id: Date.now() + i,
        x: rect.width / 2,
        y: rect.height / 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: (360 / particleCount) * i + Math.random() * 20 - 10,
        speed: 60 + Math.random() * 80,
        size: 4 + Math.random() * 6,
      })
    );
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);
    onClick?.(e);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={cn(
        "relative overflow-visible px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 active:scale-95 transition-all",
        className
      )}
      {...props}
    >
      {children}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              left: p.x,
              top: p.y,
              zIndex: 50,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.speed,
              y: Math.sin((p.angle * Math.PI) / 180) * p.speed,
              opacity: 0,
              scale: 0.3,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
```

---

## Direction Aware Card

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "top" | "bottom" | "left" | "right";

interface DirectionAwareCardProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
}

function getDirection(
  e: React.MouseEvent<HTMLDivElement>,
  el: HTMLDivElement
): Direction {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = (Math.atan2(y, x) * 180) / Math.PI;

  if (angle >= -45 && angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= -135 && angle < -45) return "top";
  return "left";
}

const offsets: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -100 },
  bottom: { x: 0, y: 100 },
  left: { x: -100, y: 0 },
  right: { x: 100, y: 0 },
};

export function DirectionAwareCard({
  children,
  overlay,
  className,
}: DirectionAwareCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("top");
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setDirection(getDirection(e, ref.current));
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setDirection(getDirection(e, ref.current));
    setIsHovered(false);
  };

  const offset = offsets[direction];

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-2xl", className)}
    >
      {children}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ x: offset.x + "%", y: offset.y + "%" }}
        animate={
          isHovered
            ? { x: "0%", y: "0%" }
            : { x: offset.x + "%", y: offset.y + "%" }
        }
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        {overlay ?? (
          <div className="w-full h-full bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Hover</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
```

---

## Dynamic Island

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type IslandState = "idle" | "notification" | "expanded" | "pill";

interface DynamicIslandProps {
  className?: string;
}

export function DynamicIsland({ className }: DynamicIslandProps) {
  const [state, setState] = useState<IslandState>("idle");

  const dimensions: Record<IslandState, { width: number; height: number }> = {
    idle: { width: 120, height: 36 },
    pill: { width: 200, height: 36 },
    notification: { width: 340, height: 80 },
    expanded: { width: 360, height: 180 },
  };

  const dim = dimensions[state];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <motion.div
        className="bg-black rounded-[24px] overflow-hidden flex items-center justify-center"
        animate={{ width: dim.width, height: dim.height }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              className="w-3 h-3 rounded-full bg-zinc-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          {state === "pill" && (
            <motion.div
              key="pill"
              className="flex items-center gap-2 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-xs font-medium">Connected</span>
            </motion.div>
          )}
          {state === "notification" && (
            <motion.div
              key="notif"
              className="flex items-center gap-3 px-4 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <span className="text-white text-xl">🔔</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">New message</p>
                <p className="text-zinc-400 text-xs">You have a new notification</p>
              </div>
            </motion.div>
          )}
          {state === "expanded" && (
            <motion.div
              key="expanded"
              className="flex flex-col gap-3 p-4 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Now Playing</span>
                <span className="text-zinc-500 text-xs">3:45</span>
              </div>
              <div className="w-full h-1 bg-zinc-700 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  animate={{ width: ["20%", "60%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
              <div className="flex justify-center gap-6 text-white">
                <button className="text-zinc-400 hover:text-white">⏮</button>
                <button className="text-white text-xl">⏸</button>
                <button className="text-zinc-400 hover:text-white">⏭</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-2">
        {(["idle", "pill", "notification", "expanded"] as IslandState[]).map(
          (s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-all",
                state === s
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              )}
            >
              {s}
            </button>
          )
        )}
      </div>
    </div>
  );
}
```

---

## Expandable Card

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  thumbnail?: string;
  content: React.ReactNode;
  className?: string;
}

export function ExpandableCard({
  title,
  subtitle,
  thumbnail,
  content,
  className,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${title}`}
        onClick={() => setIsExpanded(true)}
        className={cn(
          "cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 shadow-lg overflow-hidden",
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {thumbnail && (
          <motion.img
            layoutId={`card-image-${title}`}
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <motion.h3
            layoutId={`card-title-${title}`}
            className="font-bold text-lg text-zinc-900 dark:text-white"
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p
              layoutId={`card-subtitle-${title}`}
              className="text-zinc-500 text-sm mt-1"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={`card-${title}`}
                className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
              >
                {thumbnail && (
                  <motion.img
                    layoutId={`card-image-${title}`}
                    src={thumbnail}
                    alt={title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <motion.h3
                        layoutId={`card-title-${title}`}
                        className="font-bold text-2xl text-zinc-900 dark:text-white"
                      >
                        {title}
                      </motion.h3>
                      {subtitle && (
                        <motion.p
                          layoutId={`card-subtitle-${title}`}
                          className="text-zinc-500 mt-1"
                        >
                          {subtitle}
                        </motion.p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 hover:bg-zinc-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {content}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Family Button

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface FamilyButtonItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface FamilyButtonProps {
  items: FamilyButtonItem[];
  className?: string;
}

export function FamilyButton({ items, className }: FamilyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn("relative flex flex-col items-center gap-2", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen &&
          items.map((item, i) => (
            <motion.button
              key={i}
              className="flex items-center gap-2 bg-white dark:bg-zinc-900 shadow-lg rounded-2xl px-4 py-2 text-sm font-medium text-zinc-800 dark:text-white hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{
                delay: (items.length - 1 - i) * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              onClick={item.onClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
      </AnimatePresence>

      <motion.button
        className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Plus size={20} />
      </motion.button>
    </div>
  );
}
```

---

## Folder Component

```tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FolderFile {
  name: string;
  icon?: React.ReactNode;
}

interface FolderProps {
  name: string;
  files?: FolderFile[];
  color?: string;
  className?: string;
}

export function FolderComponent({
  name,
  files = [],
  color = "#FFD700",
  className,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block cursor-pointer select-none", className)}>
      <div onClick={() => setIsOpen((o) => !o)} className="flex flex-col items-center gap-1">
        {/* Folder body */}
        <div className="relative">
          {/* Tab */}
          <div
            className="absolute -top-3 left-0 w-16 h-4 rounded-t-lg"
            style={{ background: color }}
          />
          {/* Body */}
          <motion.div
            className="relative w-32 h-24 rounded-b-xl rounded-tr-xl flex items-end justify-center pb-2"
            style={{ background: color }}
            animate={{
              rotateX: isOpen ? -20 : 0,
              scaleY: isOpen ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Files inside */}
            {files.slice(0, 3).map((file, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded shadow text-xs px-1 py-0.5 flex items-center gap-1"
                style={{
                  bottom: isOpen ? 60 + i * 28 : 8 + i * 4,
                  left: 12 + i * 8,
                  right: 12 + i * 8,
                  zIndex: 3 - i,
                }}
                animate={{
                  bottom: isOpen ? 60 + i * 28 : 8 + i * 4,
                  rotate: isOpen ? (i - 1) * 5 : 0,
                  opacity: isOpen ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
              >
                {file.icon}
                <span className="truncate text-zinc-700">{file.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
      </div>
    </div>
  );
}
```

---

## Glare Card

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  glareOpacity?: number;
  maxRotate?: number;
}

export function GlareCard({
  children,
  className,
  glareOpacity = 0.25,
  maxRotate = 15,
}: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateY: (x - 0.5) * maxRotate * 2,
      rotateX: -(y - 0.5) * maxRotate * 2,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: glareOpacity });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-2xl", className)}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 3}) 0%, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}
```

---

## Globe

```tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  glowColor?: string;
  dotRadius?: number;
  dotSpacing?: number;
}

export function Globe({
  className,
  size = 400,
  dotColor = "#a78bfa",
  glowColor = "#7c3aed",
  dotRadius = 1.5,
  dotSpacing = 6,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const R = size / 2 - 20;
    const cx = size / 2;
    const cy = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Glow
      const grad = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.1);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, glowColor + "40");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();

      const rot = rotationRef.current;

      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        for (let lng = -180; lng <= 180; lng += dotSpacing) {
          const phi = ((90 - lat) * Math.PI) / 180;
          const theta = ((lng + rot) * Math.PI) / 180;

          const x3 = R * Math.sin(phi) * Math.cos(theta);
          const y3 = R * Math.cos(phi);
          const z3 = R * Math.sin(phi) * Math.sin(theta);

          if (z3 < 0) continue;

          const px = cx + x3;
          const py = cy - y3;
          const scale = (z3 / R) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(px, py, dotRadius * scale, 0, Math.PI * 2);
          ctx.fillStyle =
            dotColor +
            Math.floor(scale * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();
        }
      }

      rotationRef.current = (rotationRef.current + 0.15) % 360;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [size, dotColor, glowColor, dotRadius, dotSpacing]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={cn("rounded-full", className)}
    />
  );
}
```

---

## Hero Color Panels

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroPanel {
  label: string;
  color: string;
  textColor?: string;
  content?: React.ReactNode;
}

interface HeroColorPanelsProps {
  panels: HeroPanel[];
  className?: string;
  defaultActive?: number;
}

export function HeroColorPanels({
  panels,
  className,
  defaultActive = 0,
}: HeroColorPanelsProps) {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={cn("relative flex h-screen w-full overflow-hidden", className)}>
      {panels.map((panel, i) => {
        const isActive = i === active;
        const fraction = 1 / panels.length;
        const activeFraction = 0.6;
        const restFraction = (1 - activeFraction) / (panels.length - 1);

        return (
          <motion.div
            key={i}
            className="relative flex items-center justify-center cursor-pointer overflow-hidden"
            style={{ background: panel.color }}
            animate={{
              flexBasis: isActive
                ? `${activeFraction * 100}%`
                : `${restFraction * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setActive(i)}
          >
            <motion.div
              className={cn(
                "flex flex-col items-center gap-4",
                panel.textColor ?? "text-white"
              )}
              animate={{ opacity: isActive ? 1 : 0.6 }}
            >
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center px-8"
                >
                  <h2 className="text-4xl font-bold mb-4">{panel.label}</h2>
                  {panel.content}
                </motion.div>
              ) : (
                <motion.span
                  className="font-bold text-xl"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {panel.label}
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Demo
export function HeroColorPanelsDemo() {
  return (
    <HeroColorPanels
      panels={[
        {
          label: "Design",
          color: "#6d28d9",
          content: <p className="text-white/80 max-w-sm">Crafting beautiful interfaces</p>,
        },
        {
          label: "Build",
          color: "#0f172a",
          content: <p className="text-white/80 max-w-sm">Engineered for performance</p>,
        },
        {
          label: "Ship",
          color: "#dc2626",
          content: <p className="text-white/80 max-w-sm">Deploy with confidence</p>,
        },
      ]}
    />
  );
}
```

---

## Magnetic Button

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  radius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isInRange, setIsInRange] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX ** 2 + distY ** 2);

    if (dist < radius) {
      setIsInRange(true);
      x.set(distX * strength);
      y.set(distY * strength);
    } else {
      setIsInRange(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsInRange(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "px-6 py-3 rounded-xl bg-black text-white font-semibold transition-shadow",
        isInRange && "shadow-xl shadow-black/30",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
```

---

## Multiselect

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronDown, Check } from "lucide-react";

interface MultiselectOption {
  value: string;
  label: string;
  color?: string;
}

interface MultiselectProps {
  options: MultiselectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function Multiselect({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  className,
}: MultiselectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    setSelected(next);
    onChange?.(next);
  };

  const remove = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(val);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedOptions = options.filter((o) => selected.includes(o.value));

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm", className)}>
      <div
        onClick={() => setIsOpen((o) => !o)}
        className="min-h-10 w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 flex flex-wrap gap-1 items-center cursor-pointer bg-white dark:bg-zinc-900"
      >
        <AnimatePresence>
          {selectedOptions.map((opt) => (
            <motion.span
              key={opt.value}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium"
              style={{
                background: opt.color ? opt.color + "20" : "#f4f4f5",
                color: opt.color ?? "#71717a",
              }}
            >
              {opt.label}
              <button onClick={(e) => remove(opt.value, e)} className="hover:opacity-70">
                <X size={10} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        {selected.length === 0 && (
          <span className="text-zinc-400 text-sm">{placeholder}</span>
        )}

        <ChevronDown
          size={16}
          className={cn(
            "ml-auto text-zinc-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-sm"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded flex items-center justify-center border",
                    selected.includes(opt.value)
                      ? "bg-violet-600 border-violet-600"
                      : "border-zinc-300"
                  )}
                >
                  {selected.includes(opt.value) && (
                    <Check size={10} className="text-white" />
                  )}
                </div>
                <span>{opt.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Sidebar

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}

export function AnimatedSidebar({
  items,
  header,
  footer,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [active, setActive] = useState(0);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex flex-col h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 overflow-hidden",
        className
      )}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Header */}
      {header && (
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 overflow-hidden">
          {header}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors relative group",
              active === i
                ? "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            )}
          >
            <span className="shrink-0">{item.icon}</span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {item.badge && !collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-auto text-xs bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                {item.badge}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          {footer}
        </div>
      )}
    </motion.aside>
  );
}
```

---

## Text Scramble

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "mount" | "hover";
  duration?: number;
  revealDelay?: number;
}

export function TextScramble({
  text,
  className,
  trigger = "mount",
  duration = 1000,
  revealDelay = 40,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16);

    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);
      frame++;

      if (frame > totalFrames) {
        clearInterval(frameRef.current!);
        setDisplay(text);
      }
    }, 16);
  };

  useEffect(() => {
    if (trigger === "mount") scramble();
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [text, trigger]);

  return (
    <span
      className={cn("font-mono", className)}
      onMouseEnter={() => trigger === "hover" && scramble()}
    >
      {display || "\u00A0"}
    </span>
  );
}
```

---

## Toolbar Expandable

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToolbarItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface ExpandableToolbarProps {
  items: ToolbarItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function ExpandableToolbar({
  items,
  className,
  orientation = "horizontal",
}: ExpandableToolbarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isHorizontal = orientation === "horizontal";

  const getScale = (i: number) => {
    if (hoveredIndex === null) return 1;
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return 1.6;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.1;
    return 1;
  };

  const getTranslate = (i: number) => {
    if (hoveredIndex === null) return 0;
    const dist = i - hoveredIndex;
    if (Math.abs(dist) > 2) return 0;
    return dist < 0 ? -8 : 8;
  };

  return (
    <div
      className={cn(
        "flex items-end gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl px-3 py-2 shadow-xl border border-zinc-200/50 dark:border-zinc-700/50",
        !isHorizontal && "flex-col items-start",
        className
      )}
    >
      {items.map((item, i) => (
        <motion.button
          key={i}
          className="relative flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          animate={{
            scale: getScale(i),
            x: isHorizontal ? getTranslate(i) : 0,
            y: isHorizontal ? 0 : getTranslate(i),
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.onClick}
        >
          <span className="w-8 h-8 flex items-center justify-center">{item.icon}</span>
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -top-8 bg-black text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}
```

---

---

# Watermelon UI — Complete Reference

## Split Accordion Card

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SplitAccordionItem {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface SplitAccordionCardProps {
  items: SplitAccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function SplitAccordionCard({
  items,
  allowMultiple = false,
  className,
}: SplitAccordionCardProps) {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) => {
    if (allowMultiple) {
      setOpen((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
      );
    } else {
      setOpen((prev) => (prev.includes(i) ? [] : [i]));
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg",
        className
      )}
    >
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const isLast = i === items.length - 1;

        return (
          <div key={i} className={cn(!isLast && "border-b border-zinc-100 dark:border-zinc-800")}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
            >
              {item.icon && (
                <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600">
                  {item.icon}
                </span>
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm text-zinc-900 dark:text-white">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-zinc-500 mt-0.5">{item.subtitle}</p>
                )}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-zinc-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-0 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

---

## Animated Tabs with Sliding Indicator

```tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: "underline" | "pill" | "enclosed";
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  className,
  variant = "pill",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const underlineVariant = (
    <div className="relative flex gap-6 border-b border-zinc-200 dark:border-zinc-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "relative pb-3 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-violet-600"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );

  const pillVariant = (
    <div className="relative inline-flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
            activeTab === tab.id
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );

  const enclosedVariant = (
    <div className="flex">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "relative px-5 py-2.5 text-sm font-medium border transition-colors",
            i === 0 ? "rounded-l-xl" : "",
            i === tabs.length - 1 ? "rounded-r-xl" : "",
            i > 0 ? "-ml-px" : "",
            activeTab === tab.id
              ? "bg-violet-600 border-violet-600 text-white z-10"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 hover:bg-zinc-50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const navMap = { underline: underlineVariant, pill: pillVariant, enclosed: enclosedVariant };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {navMap[variant]}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.find((t) => t.id === activeTab)?.content}
      </motion.div>
    </div>
  );
}
```

---

## Glassmorphism Card Variants

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "frosted" | "colorful" | "border";
  hover?: boolean;
}

const variants = {
  light: "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg",
  dark: "bg-black/30 backdrop-blur-md border border-white/10 shadow-lg",
  frosted: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
  colorful:
    "bg-gradient-to-br from-violet-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 shadow-lg",
  border:
    "bg-transparent backdrop-blur-sm border-2 border-white/40 shadow-inner shadow-white/10",
};

export function GlassCard({
  children,
  className,
  variant = "light",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        hover && "cursor-pointer",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Stacked glass cards demo
export function GlassCardStack() {
  return (
    <div className="relative w-72">
      {(["colorful", "frosted", "light"] as const).map((variant, i) => (
        <GlassCard
          key={variant}
          variant={variant}
          className="absolute"
          style={{
            top: i * 12,
            left: i * 6,
            right: -(i * 6),
            zIndex: 3 - i,
          } as React.CSSProperties}
        >
          {i === 0 && (
            <div>
              <p className="font-bold text-white">Card {i + 1}</p>
              <p className="text-white/60 text-sm">Glassmorphism variant: {variant}</p>
            </div>
          )}
        </GlassCard>
      ))}
    </div>
  );
}
```

---

## Interactive Pricing Toggle

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

interface PricingToggleProps {
  plans: PricingPlan[];
  className?: string;
}

export function PricingToggle({ plans, className }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className={cn("text-sm font-medium", !isYearly ? "text-zinc-900" : "text-zinc-400")}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly((y) => !y)}
          className={cn(
            "relative w-12 h-6 rounded-full transition-colors",
            isYearly ? "bg-violet-600" : "bg-zinc-200"
          )}
        >
          <motion.div
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
            animate={{ x: isYearly ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        </button>
        <span className={cn("text-sm font-medium", isYearly ? "text-zinc-900" : "text-zinc-400")}>
          Yearly
        </span>
        {isYearly && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full"
          >
            Save 20%
          </motion.span>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            layout
            className={cn(
              "rounded-2xl p-6 flex flex-col gap-4 border",
              plan.highlighted
                ? "bg-violet-600 border-violet-600 text-white shadow-xl shadow-violet-200"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            )}
          >
            <div>
              <p className={cn("font-semibold", plan.highlighted ? "text-white" : "text-zinc-900 dark:text-white")}>
                {plan.name}
              </p>
              <div className="flex items-end gap-1 mt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-4xl font-bold"
                  >
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className={cn("text-sm mb-1", plan.highlighted ? "text-violet-200" : "text-zinc-400")}>
                  /mo
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check
                    size={14}
                    className={plan.highlighted ? "text-violet-200" : "text-violet-600"}
                  />
                  <span className={plan.highlighted ? "text-violet-100" : "text-zinc-600 dark:text-zinc-400"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-2.5 rounded-xl font-semibold text-sm transition-all",
                plan.highlighted
                  ? "bg-white text-violet-600 hover:bg-violet-50"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              )}
            >
              {plan.cta ?? "Get started"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

---

## Floating Action Button with Radial Menu

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface RadialMenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: string;
}

interface FloatingRadialMenuProps {
  items: RadialMenuItem[];
  className?: string;
  radius?: number;
}

export function FloatingRadialMenu({
  items,
  className,
  radius = 90,
}: FloatingRadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getItemPosition = (index: number, total: number) => {
    const angle = (index / total) * 180 - 90; // spread across 180 degrees (semicircle up)
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.sin(rad) * radius,
      y: -Math.cos(rad) * radius,
    };
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <AnimatePresence>
        {isOpen &&
          items.map((item, i) => {
            const pos = getItemPosition(i, items.length);
            return (
              <motion.button
                key={i}
                className="absolute flex flex-col items-center gap-1 group"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: i * 0.04,
                }}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg text-white"
                  style={{ background: item.color ?? "#7c3aed" }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="relative z-10 w-14 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-xl shadow-violet-200"
        animate={{ rotate: isOpen ? 45 : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Plus size={24} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Staggered List Animation

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggeredListProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  triggerOnView?: boolean;
}

const directionOffset = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function StaggeredList({
  items,
  className,
  itemClassName,
  staggerDelay = 0.08,
  direction = "up",
  triggerOnView = true,
}: StaggeredListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(!triggerOnView);

  useEffect(() => {
    if (triggerOnView && isInView) setShouldAnimate(true);
  }, [isInView, triggerOnView]);

  const offset = directionOffset[direction];

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          initial={{ opacity: 0, ...offset }}
          animate={
            shouldAnimate
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, ...offset }
          }
          transition={{
            duration: 0.4,
            delay: i * staggerDelay,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}

// Usage with list items
export function StaggeredListDemo() {
  const listItems = [
    "Design with intention",
    "Build with precision",
    "Ship with confidence",
    "Iterate with speed",
    "Scale with grace",
  ];

  return (
    <StaggeredList
      items={listItems.map((text, i) => (
        <div className="flex items-center gap-3 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center text-sm font-bold">
            {i + 1}
          </div>
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{text}</span>
        </div>
      ))}
    />
  );
}
```

---

## Magnetic Hover Links

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  textStrength?: number;
}

export function MagneticLink({
  children,
  href,
  className,
  strength = 0.3,
  textStrength = 0.5,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const containerX = useSpring(0, { stiffness: 200, damping: 20 });
  const containerY = useSpring(0, { stiffness: 200, damping: 20 });
  const textX = useSpring(0, { stiffness: 300, damping: 25 });
  const textY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    containerX.set(dx * strength);
    containerY.set(dy * strength);
    textX.set(dx * textStrength);
    textY.set(dy * textStrength);
  };

  const handleMouseLeave = () => {
    containerX.set(0);
    containerY.set(0);
    textX.set(0);
    textY.set(0);
    setIsHovered(false);
  };

  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      ref={ref as any}
      href={href}
      style={{ x: containerX, y: containerY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-flex items-center justify-center cursor-pointer relative",
        className
      )}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        style={{ x: textX, y: textY }}
        className="relative z-10 px-4 py-2 font-medium text-sm text-zinc-800 dark:text-zinc-200"
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}

export function MagneticNavDemo() {
  const links = ["Home", "Work", "About", "Contact"];
  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => (
        <MagneticLink key={link} href="#">
          {link}
        </MagneticLink>
      ))}
    </nav>
  );
}
```

---

## Scroll Progress Indicator

```tsx
"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  variant?: "line" | "circle" | "dots";
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export function ScrollProgress({
  className,
  variant = "line",
  color = "#7c3aed",
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (variant === "line") {
    return (
      <motion.div
        className={cn(
          "fixed left-0 right-0 z-50 origin-left",
          position === "top" ? "top-0" : "bottom-0",
          className
        )}
        style={{
          scaleX,
          height,
          background: color,
          transformOrigin: "0%",
        }}
      />
    );
  }

  if (variant === "circle") {
    return (
      <div
        className={cn(
          "fixed bottom-8 right-8 z-50 w-12 h-12",
          className
        )}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="3"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={useSpring(
              motion.useTransform(scrollYProgress, (v) => 1 - v),
              { stiffness: 100, damping: 30 }
            )}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color }}
        >
          <motion.span>
            {motion.useTransform(scrollYProgress, (v) =>
              Math.round(v * 100)
            ).get()}
            %
          </motion.span>
        </motion.span>
      </div>
    );
  }

  return null;
}

// Percentage circle with live update
export function ScrollProgressCircle() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="fixed bottom-8 right-8 z-50 w-12 h-12">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="#e4e4e7" strokeWidth="3" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />
      </svg>
    </div>
  );
}
```

---

## Image Reveal on Hover

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  imageSize?: number;
  revealVariant?: "cursor" | "clip" | "fade";
}

export function ImageRevealOnHover({
  src,
  alt,
  children,
  className,
  imageSize = 300,
  revealVariant = "cursor",
}: ImageRevealProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (revealVariant === "cursor") {
    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden cursor-none", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute z-20 overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: imageSize,
            height: imageSize * 0.65,
            left: mousePos.x - imageSize / 2,
            top: mousePos.y - (imageSize * 0.65) / 2,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    );
  }

  if (revealVariant === "clip") {
    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden group", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: isHovered
              ? `circle(${imageSize / 2}px at ${mousePos.x}px ${mousePos.y}px)`
              : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
            transition: "clip-path 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
```

---

## Parallax Card Stack

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxCard {
  title: string;
  description?: string;
  background: string;
  content?: React.ReactNode;
}

interface ParallaxCardStackProps {
  cards: ParallaxCard[];
  className?: string;
}

function useParallaxCard(value: MotionValue<number>, distance: number) {
  return useSpring(useTransform(value, [0, 1], [-distance, distance]), {
    stiffness: 100,
    damping: 30,
  });
}

export function ParallaxCardStack({ cards, className }: ParallaxCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center gap-6 py-16",
        className
      )}
    >
      {cards.map((card, i) => {
        const parallaxY = useTransform(
          scrollYProgress,
          [0, 1],
          [i * 40, i * -40]
        );
        const smoothY = useSpring(parallaxY, { stiffness: 80, damping: 20 });

        return (
          <motion.div
            key={i}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{
              y: smoothY,
              zIndex: cards.length - i,
              background: card.background,
            }}
            whileHover={{ scale: 1.02, zIndex: cards.length + 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 min-h-52 flex flex-col justify-end">
              {card.content}
              <h3 className="text-2xl font-bold text-white mt-4">{card.title}</h3>
              {card.description && (
                <p className="text-white/70 mt-1 text-sm">{card.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ParallaxCardStackDemo() {
  return (
    <ParallaxCardStack
      cards={[
        {
          title: "Immersive Design",
          description: "Craft experiences that feel alive",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          title: "Motion Forward",
          description: "Every interaction tells a story",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
          title: "Pixel Perfect",
          description: "Details that make the difference",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
          title: "Built to Scale",
          description: "Performance without compromise",
          background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        },
      ]}
    />
  );
}
```
