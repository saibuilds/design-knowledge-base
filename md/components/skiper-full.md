# Skiper UI — Complete Reference

> Generated: 2026-05-28
> Total: 20+ fully implemented animated components

---

## Animated Buttons

```tsx
// magnetic-button.tsx
"use client";
import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 40 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / (rect.width / 2) * strength);
    y.set((e.clientY - cy) / (rect.height / 2) * strength);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold text-sm overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

```tsx
// spotlight-button.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function SpotlightButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 bg-black text-white font-medium text-sm overflow-hidden ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

```tsx
// shimmer-button.tsx
"use client";
import { motion } from "framer-motion";

export function ShimmerButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden font-semibold text-sm text-white bg-black ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 -skew-x-12"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)" }}
        initial={{ x: "-150%" }}
        animate={{ x: "250%" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

```tsx
// gradient-border-button.tsx
"use client";
import { motion } from "framer-motion";

export function GradientBorderButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const gradient = "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)";
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center p-px rounded-xl overflow-hidden font-medium text-sm ${className}`}
      style={{ background: gradient }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span className="absolute inset-0" style={{ background: gradient }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      <span className="relative z-10 flex items-center justify-center w-full h-full bg-black rounded-[11px] px-6 py-3 text-white">{children}</span>
    </motion.button>
  );
}
```

---

## Cards

```tsx
// glassmorphism-card.tsx
"use client";
import { motion } from "framer-motion";

export function GlassCard({ children, className = "", blur = 16 }: { children: React.ReactNode; className?: string; blur?: number }) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/10 text-white ${className}`}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: `blur(${blur}px)`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}
```

```tsx
// tilt-3d-card.tsx
"use client";
import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Tilt3DCard({ children, className = "", maxTilt = 15 }: { children: React.ReactNode; className?: string; maxTilt?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 30 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - py) * maxTilt * 2);
        rotateY.set((px - 0.5) * maxTilt * 2);
        setGlare({ x: px * 100, y: py * 100 });
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25), transparent 60%)` }} />
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}
```

```tsx
// glow-card.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function GlowCard({ children, className = "", glowColor = "rgba(99,102,241,0.6)" }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden ${className}`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl" style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 60%)` }} />
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}
```

---

## Hero Sections

```tsx
// hero-particle-canvas.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HeroParticle({ headline, subline }: { headline: string; subline?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.6 + 0.2,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath(); ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 100)})`; ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{headline}</motion.h1>
        {subline && <motion.p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>{subline}</motion.p>}
      </div>
    </section>
  );
}
```

```tsx
// hero-animated-words.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroAnimatedText({ staticText, rotatingWords, subline }: { staticText: string; rotatingWords: string[]; subline?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const t = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2800); return () => clearInterval(t); }, [rotatingWords.length]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-center px-6 max-w-5xl mx-auto">
        <div className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          <span>{staticText} </span>
          <span className="relative inline-block">
            <AnimatePresence mode="wait">
              <motion.span key={rotatingWords[index]} className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -40, opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        {subline && <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">{subline}</p>}
      </div>
    </section>
  );
}
```

---

## Navigation

```tsx
// animated-underline-nav.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function AnimatedUnderlineNav({ items }: { items: { label: string; href: string }[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <nav className="flex items-center gap-6">
      {items.map((item, i) => (
        <a key={item.href} href={item.href} onClick={() => setActive(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          className="relative py-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
          {item.label}
          {(hovered === i || (hovered === null && active === i)) && (
            <motion.span layoutId="underline" className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-pink-500" />
          )}
        </a>
      ))}
    </nav>
  );
}
```

```tsx
// pill-indicator-nav.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function PillNav({ items, defaultActive = 0 }: { items: { label: string; icon?: React.ReactNode }[]; defaultActive?: number }) {
  const [active, setActive] = useState(defaultActive);
  return (
    <nav className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      {items.map((item, i) => (
        <button key={item.label} onClick={() => setActive(i)} className="relative px-4 py-2 text-sm font-medium rounded-full z-10 transition-colors" style={{ color: active === i ? "white" : "rgba(255,255,255,0.5)" }}>
          {active === i && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          <span className="relative z-10 flex items-center gap-2">{item.icon}{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
```

---

## Modals

```tsx
// spring-modal.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function SpringModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, [onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-black/60" style={{ backdropFilter: "blur(8px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div className="relative w-full max-w-lg pointer-events-auto rounded-2xl border border-white/10 bg-neutral-950 p-8 shadow-2xl"
              initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 20 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white">×</button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Tooltips

```tsx
// animated-tooltip.tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Tooltip({ content, children, position = "top" }: { content: React.ReactNode; children: React.ReactNode; position?: "top" | "bottom" | "left" | "right" }) {
  const [visible, setVisible] = useState(false);
  const posMap = {
    top: { initial: { y: 8, opacity: 0 }, cls: "bottom-full left-1/2 -translate-x-1/2 mb-2" },
    bottom: { initial: { y: -8, opacity: 0 }, cls: "top-full left-1/2 -translate-x-1/2 mt-2" },
    left: { initial: { x: 8, opacity: 0 }, cls: "right-full top-1/2 -translate-y-1/2 mr-2" },
    right: { initial: { x: -8, opacity: 0 }, cls: "left-full top-1/2 -translate-y-1/2 ml-2" },
  };
  const cfg = posMap[position];
  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div className={`absolute z-50 pointer-events-none ${cfg.cls}`} initial={cfg.initial} animate={{ x: 0, y: 0, opacity: 1 }} exit={cfg.initial} transition={{ duration: 0.18, ease: "easeOut" }}>
            <div className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap shadow-xl">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Loaders

```tsx
// loaders.tsx
"use client";
import { motion } from "framer-motion";

export function Spinner({ size = 40, color = "#8b5cf6", thickness = 3 }: { size?: number; color?: string; thickness?: number }) {
  return <motion.div style={{ width: size, height: size, borderRadius: "50%", border: `${thickness}px solid rgba(255,255,255,0.1)`, borderTopColor: color }} animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />;
}

export function DotsLoader({ color = "#8b5cf6", size = 10 }: { color?: string; size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} style={{ display: "block", width: size, height: size, borderRadius: "50%", background: color }}
          animate={{ y: [0, -size * 1.2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }} />
      ))}
    </div>
  );
}

export function Skeleton({ className = "w-full h-4", rounded = "rounded-md" }: { className?: string; rounded?: string }) {
  return (
    <div className={`relative overflow-hidden bg-white/5 ${rounded} ${className}`}>
      <motion.div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
        animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

export function ProgressBar({ value, max = 100, gradient = "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)" }: { value: number; max?: number; gradient?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ background: gradient }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
    </div>
  );
}
```

---

## Text Effects

```tsx
// text-effects.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Animated gradient text
export function GradientText({ children, className = "", animated = false }: { children: React.ReactNode; className?: string; animated?: boolean }) {
  return (
    <motion.span className={`inline-block bg-clip-text text-transparent font-bold ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #ec4899 60%, #f59e0b 100%)", backgroundSize: animated ? "200% auto" : "100%" }}
      animate={animated ? { backgroundPosition: ["0% center", "200% center"] } : undefined}
      transition={animated ? { duration: 4, repeat: Infinity, ease: "linear" } : undefined}>
      {children}
    </motion.span>
  );
}

// Glitch text on hover
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false);
  return (
    <span className={`relative inline-block cursor-default ${className}`} onMouseEnter={() => setGlitching(true)}>
      <motion.span className="relative inline-block" animate={glitching ? { x: [0, -3, 4, -2, 0], skewX: [0, -2, 3, 0] } : {}} onAnimationComplete={() => setGlitching(false)}>
        {text}
      </motion.span>
      {glitching && (
        <>
          <motion.span className="absolute inset-0 text-cyan-400 mix-blend-screen" style={{ clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)" }} animate={{ x: [0, -6, 4, 0] }} aria-hidden>{text}</motion.span>
          <motion.span className="absolute inset-0 text-pink-500 mix-blend-screen" style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 70%, 0 70%)" }} animate={{ x: [0, 6, -4, 0] }} aria-hidden>{text}</motion.span>
        </>
      )}
    </span>
  );
}

// Typewriter with cursor
export function Typewriter({ words, speed = 80, deleteSpeed = 40, pauseTime = 1600, cursorColor = "#8b5cf6", className = "" }: { words: string[]; speed?: number; deleteSpeed?: number; pauseTime?: number; cursorColor?: string; className?: string }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (paused) { const t = setTimeout(() => { setPaused(false); setDeleting(true); }, pauseTime); return () => clearTimeout(t); }
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setPaused(true);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
      }
    }, deleting ? deleteSpeed : speed);
    return () => clearTimeout(t);
  }, [text, deleting, paused, wordIdx, words, speed, deleteSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <motion.span style={{ background: cursorColor }} className="inline-block w-0.5 h-[1.1em] ml-0.5 rounded-sm" animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} />
    </span>
  );
}

// Word reveal on scroll
export function WordReveal({ text, className = "", delay = 0, stagger = 0.08 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  return (
    <motion.span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span className="inline-block" variants={{ hidden: { y: "110%", opacity: 0, rotate: 4 }, visible: { y: 0, opacity: 1, rotate: 0 } }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```

---

## Background Effects

```tsx
// grid-pattern.tsx
export function GridPattern({ className = "", cellSize = 40, color = "rgba(255,255,255,0.04)", fade = true }: { className?: string; cellSize?: number; color?: string; fade?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
            <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke={color} strokeWidth="1" />
          </pattern>
          {fade && <radialGradient id="gridFade" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient>}
          {fade && <mask id="gridMask"><rect width="100%" height="100%" fill="url(#gridFade)" /></mask>}
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask={fade ? "url(#gridMask)" : undefined} />
      </svg>
    </div>
  );
}
```

```tsx
// dot-pattern.tsx
export function DotPattern({ className = "", dotSize = 1.5, spacing = 24, color = "rgba(255,255,255,0.15)", fade = true }: { className?: string; dotSize?: number; spacing?: number; color?: string; fade?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={color} />
          </pattern>
          {fade && <radialGradient id="dotFade" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient>}
          {fade && <mask id="dotMask"><rect width="100%" height="100%" fill="url(#dotFade)" /></mask>}
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" mask={fade ? "url(#dotMask)" : undefined} />
      </svg>
    </div>
  );
}
```

```tsx
// aurora.tsx
"use client";
import { motion } from "framer-motion";

export function Aurora({ className = "", colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"], intensity = 0.5 }: { className?: string; colors?: string[]; intensity?: number }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {colors.map((color, i) => (
        <motion.div key={i} className="absolute rounded-full blur-3xl"
          style={{ background: color, opacity: intensity * 0.35, width: "60%", height: "60%", left: `${10 + i * 20}%`, top: `${5 + i * 10}%` }}
          animate={{ x: [0, 40, -20, 30, 0], y: [0, -30, 20, -10, 0], scale: [1, 1.15, 0.95, 1.1, 1] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 2 }} />
      ))}
    </div>
  );
}
```

```tsx
// meteor-shower.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MeteorShower({ count = 20, className = "", color = "#a78bfa" }: { count?: number; className?: string; color?: string }) {
  const [meteors, setMeteors] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const gen = () => Array.from({ length: count }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 6, duration: Math.random() * 1.5 + 0.8, size: Math.random() * 1.5 + 0.5 }));
    setMeteors(gen());
    const t = setInterval(() => setMeteors(gen()), 8000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {meteors.map((m) => (
        <motion.div key={m.id} className="absolute top-0" style={{ left: `${m.x}%`, rotate: -25 }}
          initial={{ y: "-10%", opacity: 1 }} animate={{ y: "110vh", opacity: [1, 1, 0] }}
          transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}>
          <div style={{ width: m.size, height: m.size * 80, background: `linear-gradient(to bottom, ${color}, transparent)`, borderRadius: 9999 }} />
        </motion.div>
      ))}
    </div>
  );
}
```

---

## Animated Badges

```tsx
// badge.tsx
"use client";
import { motion } from "framer-motion";

export function Badge({ children, variant = "pulse", color = "#8b5cf6", dot = false, className = "" }: { children: React.ReactNode; variant?: "pulse" | "gradient" | "outline" | "solid"; color?: string; dot?: boolean; className?: string }) {
  const styles = { pulse: "bg-violet-600/20 border border-violet-500/30 text-violet-300", gradient: "border-0 text-white", outline: "bg-transparent border border-white/20 text-white/70", solid: "bg-violet-600 text-white" };
  return (
    <motion.span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[variant]} ${className}`}
      style={variant === "gradient" ? { background: `linear-gradient(135deg, ${color}, #ec4899)` } : undefined}
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      {dot && (
        <span className="relative flex h-2 w-2">
          <motion.span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
        </span>
      )}
      {children}
    </motion.span>
  );
}
```

---

## Animated Input

```tsx
// animated-input.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedInput({ label, type = "text", error, hint, icon, glowColor = "rgba(139,92,246,0.5)" }: { label: string; type?: string; error?: string; hint?: string; icon?: React.ReactNode; glowColor?: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const floating = focused || value.length > 0;
  return (
    <div className="relative w-full">
      <div className="relative rounded-xl overflow-hidden transition-all duration-300" style={{ boxShadow: focused ? `0 0 0 1px ${glowColor}, 0 0 20px ${glowColor}30` : "0 0 0 1px rgba(255,255,255,0.08)" }}>
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 z-10">{icon}</span>}
        <input type={type} value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`w-full bg-white/5 text-white text-sm px-4 pt-6 pb-2 outline-none ${icon ? "pl-10" : ""}`} placeholder={label} />
        <motion.label className="absolute text-white/40 pointer-events-none select-none" style={{ left: icon ? "2.5rem" : "1rem" }}
          animate={{ top: floating ? "0.45rem" : "50%", y: floating ? 0 : "-50%", fontSize: floating ? "0.65rem" : "0.875rem", color: focused ? glowColor : "rgba(255,255,255,0.4)" }}
          transition={{ duration: 0.18 }}>
          {label}
        </motion.label>
      </div>
      <AnimatePresence>
        {error && <motion.p className="text-red-400 text-xs mt-1.5 pl-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</motion.p>}
        {hint && !error && <motion.p className="text-white/30 text-xs mt-1.5 pl-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{hint}</motion.p>}
      </AnimatePresence>
    </div>
  );
}
```

---

## Spring Accordion

```tsx
// spring-accordion.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Accordion({ items, allowMultiple = false }: { items: { title: string; content: React.ReactNode }[]; allowMultiple?: boolean }) {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => allowMultiple ? setOpen((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]) : setOpen((p) => p.includes(i) ? [] : [i]);
  return (
    <div className="w-full space-y-2">
      {items.map((item, i) => (
        <motion.div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden" animate={{ borderColor: open.includes(i) ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)" }}>
          <button onClick={() => toggle(i)} className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-white/80 hover:text-white">
            <span>{item.title}</span>
            <motion.span animate={{ rotate: open.includes(i) ? 180 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="text-white/40">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open.includes(i) && (
              <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 350, damping: 35 }} style={{ overflow: "hidden" }}>
                <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## Sliding Tabs

```tsx
// sliding-tabs.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SlidingTabs({ tabs, defaultTab = 0, variant = "underline" }: { tabs: { label: string; content: React.ReactNode; icon?: React.ReactNode }[]; defaultTab?: number; variant?: "underline" | "pill" | "bordered" }) {
  const [active, setActive] = useState(defaultTab);
  const [dir, setDir] = useState(1);
  const handle = (i: number) => { setDir(i > active ? 1 : -1); setActive(i); };

  return (
    <div className="w-full">
      <div className={`relative flex mb-6 ${variant === "underline" ? "border-b border-white/10 gap-6" : "bg-white/5 rounded-full p-1 gap-1 w-fit"}`}>
        {tabs.map((tab, i) => (
          <button key={tab.label} onClick={() => handle(i)} className={`relative px-4 py-2 text-sm font-medium flex items-center gap-2 z-10 transition-colors ${active === i ? "text-white" : "text-white/40 hover:text-white/70"} ${variant === "underline" ? "pb-3" : "rounded-full"}`}>
            {tab.icon}{tab.label}
            {active === i && variant === "underline" && <motion.span layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-pink-500" />}
            {active === i && variant !== "underline" && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/80 to-purple-600/80" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={active} custom={dir} variants={{ enter: (d: number) => ({ x: d * 24, opacity: 0, filter: "blur(4px)" }), center: { x: 0, opacity: 1, filter: "blur(0px)" }, exit: (d: number) => ({ x: d * -24, opacity: 0 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## Dependencies

```bash
npm install framer-motion clsx tailwind-merge
```
