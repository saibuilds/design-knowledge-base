# Origin UI + Hover.dev Component Reference
> React + TypeScript + Tailwind + framer-motion. All components are copy-paste ready for Next.js.

---

# ORIGIN UI

## Animated Counter

```tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ from = 0, to, duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{from}</span>;
}
```

---

## Animated List

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedListProps {
  items: string[];
  interval?: number;
}

export function AnimatedList({ items, interval = 1200 }: AnimatedListProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    if (displayed.length >= items.length) return;
    const t = setTimeout(() => {
      setDisplayed((prev) => [items[prev.length], ...prev]);
    }, interval);
    return () => clearTimeout(t);
  }, [displayed, items, interval]);

  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence>
        {displayed.map((item) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="rounded-xl border border-border bg-card p-3 text-sm shadow-sm"
          >
            {item}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
```

---

## Animated Tabs

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
}

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div className="relative flex gap-1 rounded-xl bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="relative z-10 flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-lg bg-background shadow"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) =>
          tab.id === active ? (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab.content}
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}
```

---

## Animated Underline Tabs

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface UnderlineTabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
}

export function AnimatedUnderlineTabs({ tabs }: UnderlineTabsProps) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) =>
          tab.id === active ? (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab.content}
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}
```

---

## Blur Fade In

```tsx
"use client";
import { motion } from "framer-motion";

interface BlurFadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function BlurFadeIn({ children, delay = 0, duration = 0.5, className }: BlurFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration, delay, ease: [0.21, 1.11, 0.81, 0.99] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Confetti Button

```tsx
"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

function createParticle(x: number, y: number) {
  const el = document.createElement("div");
  const colors = ["#ff595e", "#ffca3a", "#6a4c93", "#1982c4", "#8ac926"];
  el.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;
    background:${colors[Math.floor(Math.random() * colors.length)]};
    border-radius:50%;pointer-events:none;z-index:9999;
  `;
  document.body.appendChild(el);
  const angle = Math.random() * Math.PI * 2;
  const velocity = 4 + Math.random() * 6;
  let vx = Math.cos(angle) * velocity;
  let vy = Math.sin(angle) * velocity - 4;
  let opacity = 1;
  const tick = () => {
    const left = parseFloat(el.style.left) + vx;
    const top = parseFloat(el.style.top) + vy;
    vy += 0.3;
    opacity -= 0.02;
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.opacity = `${opacity}`;
    if (opacity > 0) requestAnimationFrame(tick);
    else el.remove();
  };
  requestAnimationFrame(tick);
}

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ConfettiButton({ children, className, onClick }: ConfettiButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 40; i++) createParticle(cx, cy);
    onClick?.();
  };

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

---

## Copy Button

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted ${className}`}
      aria-label={copied ? "Copied" : "Copy"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-4 w-4 text-green-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
```

---

## Cursor Glow Effect

```tsx
"use client";
import { useEffect, useRef } from "react";

interface CursorGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export function CursorGlow({
  children,
  className,
  glowColor = "rgba(120,119,198,0.3)",
  glowSize = 300,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--glow-x": "-999px",
          "--glow-y": "-999px",
          "--glow-color": glowColor,
          "--glow-size": `${glowSize}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle var(--glow-size) at var(--glow-x) var(--glow-y), var(--glow-color), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

## File Upload Dropzone

```tsx
"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, File } from "lucide-react";

interface FileUploadDropzoneProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUploadDropzone({ onFilesChange, accept, multiple = true }: FileUploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const arr = Array.from(incoming);
      const updated = multiple ? [...files, ...arr] : arr;
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, multiple, onFilesChange]
  );

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className="w-full space-y-3">
      <motion.div
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        animate={{ borderColor: dragging ? "#6366f1" : "#e2e8f0", backgroundColor: dragging ? "#eef2ff" : "#fafafa" }}
        className="cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => addFiles(e.target.files)}
        />
        <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Drop files here or click to upload</p>
        <p className="mt-1 text-xs text-muted-foreground">{accept ?? "Any file type accepted"}</p>
      </motion.div>

      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={`${file.name}-${i}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
          >
            <File className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate text-sm">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
            <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
```

---

## Flip Words

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function FlipWords({ words, interval = 2500, className }: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 50%", display: "inline-block" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
```

---

## Glowing Button

```tsx
"use client";
import { motion } from "framer-motion";

interface GlowingButtonProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function GlowingButton({
  children,
  color = "#6366f1",
  className,
  onClick,
}: GlowingButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all ${className}`}
      style={{ background: color }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        style={{ background: color, filter: "blur(16px)" }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

## Gradient Text

```tsx
"use client";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  via?: string;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  from = "#6366f1",
  to = "#ec4899",
  via,
  className,
  animate: shouldAnimate = false,
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(90deg, ${from}, ${via}, ${to})`
    : `linear-gradient(90deg, ${from}, ${to})`;

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: gradient, backgroundSize: shouldAnimate ? "200%" : "100%" }}
      animate={shouldAnimate ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : undefined}
      transition={shouldAnimate ? { duration: 4, repeat: Infinity, ease: "linear" } : undefined}
    >
      {children}
    </motion.span>
  );
}
```

---

## Hero Video Dialog

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface HeroVideoDialogProps {
  thumbnailSrc: string;
  videoSrc: string;
  thumbnailAlt?: string;
}

export function HeroVideoDialog({ thumbnailSrc, videoSrc, thumbnailAlt = "Video thumbnail" }: HeroVideoDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative cursor-pointer overflow-hidden rounded-2xl" onClick={() => setOpen(true)}>
        <img src={thumbnailSrc} alt={thumbnailAlt} className="w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <Play className="ml-1 h-6 w-6 fill-current text-gray-900" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-1 text-white"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <video src={videoSrc} controls autoPlay className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Highlight Text

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HighlightTextProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function HighlightText({ children, color = "#fef08a", className }: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute inset-0 -z-10 rounded"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{ background: color, originX: 0, height: "90%", top: "10%" }}
      />
      {children}
    </span>
  );
}
```

---

## Image Comparison Slider

```tsx
"use client";
import { useCallback, useRef, useState } from "react";

interface ImageComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: ImageComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl"
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={() => (dragging.current = false)}
      onMouseMove={(e) => dragging.current && updatePosition(e.clientX)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      <img src={afterSrc} alt={afterLabel} className="w-full object-cover" draggable={false} />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeLabel} className="w-full object-cover" draggable={false} />
      </div>
      <div
        className="absolute inset-y-0 flex cursor-ew-resize items-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-0.5 bg-white shadow" />
        <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg">
          <svg className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{beforeLabel}</span>
      <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{afterLabel}</span>
    </div>
  );
}
```

---

## Interactive Grid

```tsx
"use client";
import { useEffect, useRef } from "react";

interface InteractiveGridProps {
  columns?: number;
  rows?: number;
  className?: string;
}

export function InteractiveGrid({ columns = 20, rows = 10, className }: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cells = Array.from(container.querySelectorAll<HTMLDivElement>("[data-cell]"));

    const handleMouseMove = (e: MouseEvent) => {
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const intensity = Math.max(0, 1 - dist / 150);
        cell.style.backgroundColor = `rgba(99,102,241,${intensity * 0.6})`;
      });
    };

    const handleMouseLeave = () => {
      cells.forEach((cell) => (cell.style.backgroundColor = ""));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div
          key={i}
          data-cell
          className="aspect-square border border-border/40 transition-colors duration-300"
        />
      ))}
    </div>
  );
}
```

---

## Keyboard Shortcut Display

```tsx
"use client";
import { motion } from "framer-motion";

interface KeyboardShortcutProps {
  keys: string[];
  separator?: string;
}

export function KeyboardShortcut({ keys, separator = "+" }: KeyboardShortcutProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs">
      {keys.map((key, i) => (
        <span key={key} className="inline-flex items-center gap-1">
          <motion.kbd
            whileHover={{ y: -2 }}
            className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground shadow-sm"
          >
            {key}
          </motion.kbd>
          {i < keys.length - 1 && (
            <span className="text-muted-foreground">{separator}</span>
          )}
        </span>
      ))}
    </span>
  );
}
```

---

## Letter Pullup

```tsx
"use client";
import { motion } from "framer-motion";

interface LetterPullupProps {
  text: string;
  delay?: number;
  className?: string;
}

export function LetterPullup({ text, delay = 0.05, className }: LetterPullupProps) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * delay, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
```

---

## Marquee

```tsx
"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) setContentWidth(trackRef.current.scrollWidth / 2);
  }, []);

  const duration = contentWidth / speed;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        ref={trackRef}
        className="flex w-max"
        animate={{ x: direction === "left" ? [-contentWidth, 0] : [0, -contentWidth] }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

---

## Meteors

```tsx
"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface MeteorsProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3,
        duration: 0.6 + Math.random() * 0.8,
        size: 1 + Math.random() * 1.5,
      })),
    [number]
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <motion.span
          key={m.id}
          className="absolute top-0 inline-block rounded-full"
          style={{
            left: m.left,
            width: `${m.size}px`,
            height: `${m.size * 80}px`,
            background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 1, 0] }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
```

---

## Number Ticker

```tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  duration?: number;
  className?: string;
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  duration = 2,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = `${prefix}${v.toFixed(decimalPlaces)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, decimalPlaces, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
```

---

## Particles Background

```tsx
"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; alpha: number;
}

interface ParticlesBackgroundProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export function ParticlesBackground({ count = 80, color = "99,102,241", speed = 0.4, className }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, color, speed]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
}
```

---

## Shimmer Button

```tsx
"use client";
import { motion } from "framer-motion";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  shimmerColor?: string;
  background?: string;
}

export function ShimmerButton({
  children,
  className,
  onClick,
  shimmerColor = "rgba(255,255,255,0.3)",
  background = "#1a1a2e",
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg px-6 py-2.5 text-sm font-semibold text-white ${className}`}
      style={{ background }}
    >
      <motion.div
        variants={{
          hover: { x: ["-200%", "200%"] },
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0 -skew-x-12"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

## Spotlight Card

```tsx
"use client";
import { useRef, MouseEvent } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(120,119,198,0.15)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current!.style.setProperty("--x", `${x}px`);
    cardRef.current!.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 ${className}`}
      style={{ "--x": "-999px", "--y": "-999px" } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--x) var(--y), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

## Stagger List Animation

```tsx
"use client";
import { motion } from "framer-motion";

interface StaggerListProps {
  items: React.ReactNode[];
  stagger?: number;
  className?: string;
}

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function StaggerList({ items, stagger = 0.08, className }: StaggerListProps) {
  return (
    <motion.ul
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      animate="show"
      className={`space-y-2 ${className}`}
    >
      {items.map((child, i) => (
        <motion.li key={i} variants={itemVariant}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## Text Reveal

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 0.5, delay: delay + i * 0.07, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
```

---

## Word Rotate

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface WordRotateProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function WordRotate({ words, interval = 2000, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`inline-block ${className}`}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
```

---

# HOVER.DEV

## Bubble Button

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface BubbleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BubbleButton({ children, className, onClick }: BubbleButtonProps) {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setBubbles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setBubbles((prev) => prev.filter((b) => b.id !== id)), 700);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 ${className}`}
    >
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full bg-white/30"
          style={{ left: b.x, top: b.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

---

## Clip Path Links

```tsx
"use client";
import { motion } from "framer-motion";

interface ClipPathLinksProps {
  links: { label: string; href: string }[];
}

function ClipPathLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden px-4 py-2 text-sm font-medium"
    >
      <motion.span
        className="absolute inset-0 z-10 flex items-center bg-foreground px-4 text-background"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileHover={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {label}
      </motion.span>
      <span>{label}</span>
    </a>
  );
}

export function ClipPathLinks({ links }: ClipPathLinksProps) {
  return (
    <nav className="flex flex-wrap gap-1">
      {links.map((link) => (
        <ClipPathLink key={link.href} {...link} />
      ))}
    </nav>
  );
}
```

---

## Count Up Stat

```tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CountUpStat({ value, label, prefix = "", suffix = "", duration = 2.5 }: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, duration]);

  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl font-bold tabular-nums">
        {prefix}0{suffix}
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
```

---

## Drag Cards

```tsx
"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface DragCard {
  id: number;
  content: React.ReactNode;
  background?: string;
}

interface DragCardsProps {
  cards: DragCard[];
}

function DraggableCard({ card }: { card: DragCard }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      dragElastic={0.2}
      style={{ x, y, rotate }}
      whileDrag={{ scale: 1.05, zIndex: 10 }}
      className="absolute cursor-grab rounded-2xl p-6 shadow-xl active:cursor-grabbing"
      style={{ x, y, rotate, background: card.background ?? "#ffffff" }}
    >
      {card.content}
    </motion.div>
  );
}

export function DragCards({ cards }: DragCardsProps) {
  return (
    <div className="relative h-64 w-full">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ rotate: (i - Math.floor(cards.length / 2)) * 4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <DraggableCard card={card} />
        </motion.div>
      ))}
    </div>
  );
}
```

---

## Fire Button

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FireButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FireButton({ children, onClick, className }: FireButtonProps) {
  const [active, setActive] = useState(false);

  const flames = Array.from({ length: 8 });

  return (
    <button
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={onClick}
      className={`relative overflow-visible rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500 ${className}`}
    >
      <AnimatePresence>
        {active &&
          flames.map((_, i) => (
            <motion.span
              key={i}
              className="absolute bottom-full left-0 right-0 flex justify-center"
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -(20 + Math.random() * 30), opacity: 0, scale: 1.2 + Math.random() }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 + Math.random() * 0.4, delay: i * 0.04, repeat: Infinity }}
              style={{ left: `${10 + i * 10}%`, width: "10%" }}
            >
              <span
                className="inline-block h-4 w-3 rounded-full"
                style={{
                  background: `hsl(${20 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
                  filter: "blur(2px)",
                }}
              />
            </motion.span>
          ))}
      </AnimatePresence>
      {children}
    </button>
  );
}
```

---

## Framer Parallax Scroll

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxSection({ children, offset = 80, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt?: string;
  offset?: number;
  className?: string;
}

export function ParallaxImage({ src, alt = "", offset = 100, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.2 }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
```

---

## Glitch Text

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-default select-none font-bold ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {text}
      {isGlitching && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 text-red-500 mix-blend-screen"
            animate={{ x: [-2, 2, -1, 1, 0], opacity: [1, 0.8, 1, 0.9, 1] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
          >
            {text}
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 text-cyan-400 mix-blend-screen"
            animate={{ x: [2, -2, 1, -1, 0], opacity: [0.9, 1, 0.8, 1, 0.9] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatType: "mirror" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}
```

---

## Gravity Simulation

```tsx
"use client";
import { useEffect, useRef } from "react";

interface GravityBall {
  x: number; y: number; vx: number; vy: number; radius: number; color: string;
}

interface GravitySimulationProps {
  count?: number;
  className?: string;
}

export function GravitySimulation({ count = 12, className }: GravitySimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const balls: GravityBall[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2,
      radius: 8 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((b) => {
        b.vy += 0.3;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -0.8; }
        if (b.x + b.radius > canvas.width) { b.x = canvas.width - b.radius; b.vx *= -0.8; }
        if (b.y + b.radius > canvas.height) { b.y = canvas.height - b.radius; b.vy *= -0.7; b.vx *= 0.98; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [count]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
}
```

---

## Hover Image Links

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HoverImageLink {
  label: string;
  href: string;
  imageSrc: string;
}

interface HoverImageLinksProps {
  links: HoverImageLink[];
}

export function HoverImageLinks({ links }: HoverImageLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          className="group flex items-center border-b border-border py-4 text-2xl font-semibold transition-colors hover:text-muted-foreground"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span>{link.label}</span>
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute right-0 h-36 w-48 overflow-hidden rounded-xl shadow-2xl"
              >
                <img src={link.imageSrc} alt={link.label} className="h-full w-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}
```

---

## Hover Video Player

```tsx
"use client";
import { useRef } from "react";

interface HoverVideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
}

export function HoverVideoPlayer({ videoSrc, posterSrc, className }: HoverVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
```

---

## Magnetic Button

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, strength = 0.4, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/80 ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

---

## Ripple Button

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
}

export function RippleButton({ children, className, rippleColor = "rgba(255,255,255,0.35)", onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 600);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 ${className}`}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full"
            style={{ left: r.x, top: r.y, background: rippleColor, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

---

## Scramble Text

```tsx
"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  trigger?: "hover" | "mount";
  duration?: number;
  className?: string;
}

export function ScrambleText({ text, trigger = "hover", duration = 800, className }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [running, setRunning] = useState(trigger === "mount");

  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const end = start + duration;
    let raf: number;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * text.length);
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (i < revealed) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (now < end) raf = requestAnimationFrame(tick);
      else { setDisplayed(text); setRunning(false); }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, text, duration]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={() => trigger === "hover" && setRunning(true)}
    >
      {displayed}
    </span>
  );
}
```

---

## Shiny Button

```tsx
"use client";
import { motion } from "framer-motion";

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShinyButton({ children, className, onClick }: ShinyButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm ${className}`}
    >
      <motion.div
        variants={{ hover: { left: "110%" } }}
        initial={{ left: "-30%", top: 0, bottom: 0, width: "30%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{ position: "absolute", top: 0, bottom: 0 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

## Spotlight Card (Hover.dev variant)

```tsx
"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface HoverSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverSpotlightCard({ children, className }: HoverSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`rounded-2xl border border-border bg-card p-6 shadow-xl ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}
```

---

## Stagger Menu

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface StaggerMenuProps {
  trigger: React.ReactNode;
  items: { label: string; href: string; icon?: React.ReactNode }[];
}

const menuVariants = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function StaggerMenu({ trigger, items }: StaggerMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <button onClick={() => setOpen((o) => !o)} className="w-full">
        {trigger}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden rounded-xl border border-border bg-card shadow-xl"
          >
            {items.map((item) => (
              <motion.li key={item.href} variants={itemVariants}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Swipe Carousel

```tsx
"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState } from "react";

interface SwipeCarouselProps {
  slides: React.ReactNode[];
  className?: string;
}

export function SwipeCarousel({ slides, className }: SwipeCarouselProps) {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrent(clamped);
    const width = containerRef.current?.offsetWidth ?? 0;
    animate(x, -clamped * width, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) goTo(current + 1);
    else if (info.offset.x > 50) goTo(current - 1);
    else goTo(current);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="flex"
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full">
            {slide}
          </div>
        ))}
      </motion.div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-foreground" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Terminal Header

```tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalHeaderProps {
  lines: string[];
  title?: string;
  typingSpeed?: number;
}

export function TerminalHeader({ lines, title = "terminal", typingSpeed = 30 }: TerminalHeaderProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + lines[currentLine][currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, typingSpeed]);

  return (
    <div className="w-full overflow-hidden rounded-xl bg-zinc-900 font-mono text-sm text-zinc-100 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-zinc-700 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="mx-auto text-xs text-zinc-400">{title}</span>
      </div>
      <div className="p-4 space-y-1">
        {displayedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <span className="text-green-400 select-none">$</span>
            <span>{line}</span>
            {i === currentLine && currentChar < (lines[currentLine]?.length ?? 0) && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="inline-block w-2 bg-zinc-100"
              >
                &nbsp;
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

---

## Typewriter Effect

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypewriterEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  className,
}: TypewriterEffectProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="ml-0.5 inline-block h-[1em] w-0.5 bg-current"
      />
    </span>
  );
}
```

---

## Underline Links

```tsx
"use client";
import { motion } from "framer-motion";

interface UnderlineLinksProps {
  links: { label: string; href: string }[];
  className?: string;
}

function UnderlineLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="group relative inline-block text-sm font-medium"
      whileHover="hover"
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-current"
        variants={{
          hover: { width: "100%", transition: { duration: 0.25, ease: "easeInOut" } },
        }}
        initial={{ width: "0%" }}
      />
    </motion.a>
  );
}

export function UnderlineLinks({ links, className }: UnderlineLinksProps) {
  return (
    <nav className={`flex flex-wrap gap-6 ${className}`}>
      {links.map((link) => (
        <UnderlineLink key={link.href} {...link} />
      ))}
    </nav>
  );
}
```

---
