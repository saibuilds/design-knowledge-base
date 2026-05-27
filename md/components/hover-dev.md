# Hover.dev Component Patterns

Implementations based on hover.dev's design patterns. All built with **React**, **Framer Motion**, and **Tailwind CSS**.

---

## Installation

```bash
npm install framer-motion
npm install lucide-react
```

---

## 1. Buttons

### EncryptButton — Text scramble on hover
```tsx
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

export function EncryptButton({ children }: { children: string }) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [displayText, setDisplayText] = useState(children);
  const iteration = useRef(0);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    iteration.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration.current) return children[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration.current >= children.length) {
        clearInterval(intervalRef.current!);
      }
      iteration.current += 0.5;
    }, 30);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  };

  return (
    <motion.button
      onHoverStart={scramble}
      onHoverEnd={reset}
      className="px-6 py-3 font-mono font-medium bg-black text-green-400 rounded-lg border border-green-400/30 hover:bg-green-400/10 transition-colors"
      whileTap={{ scale: 0.97 }}
    >
      {displayText}
    </motion.button>
  );
}
```

### BubbleButton — Ink blot expand effect
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function BubbleButton({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  return (
    <button
      onClick={addRipple}
      className="relative overflow-hidden px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute block w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

### SplashButton — Liquid fill on click
```tsx
import { motion, useAnimation } from "framer-motion";

export function SplashButton({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();

  const handleClick = async () => {
    await controls.start({
      scaleY: [0, 1.4, 1],
      scaleX: [1, 0.85, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      className="relative px-8 py-3 bg-violet-600 text-white rounded-xl font-semibold overflow-hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ transformOrigin: "bottom center" }}
    >
      {children}
    </motion.button>
  );
}
```

### GlitchButton — RGB shift effect
```tsx
import { useState } from "react";

export function GlitchButton({ children }: { children: string }) {
  const [glitching, setGlitching] = useState(false);

  return (
    <button
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}
      className="relative px-6 py-3 bg-black text-white font-bold font-mono rounded overflow-hidden border border-white/20"
    >
      <span className="relative z-10">{children}</span>
      {glitching && (
        <>
          <span
            className="absolute inset-0 flex items-center justify-center text-red-500 font-bold font-mono"
            style={{
              animation: "glitch-r 0.3s infinite",
              clipPath: "inset(30% 0 30% 0)",
              transform: "translateX(2px)",
              mixBlendMode: "screen",
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold font-mono"
            style={{
              animation: "glitch-b 0.3s infinite 0.1s",
              clipPath: "inset(60% 0 5% 0)",
              transform: "translateX(-2px)",
              mixBlendMode: "screen",
            }}
          >
            {children}
          </span>
        </>
      )}
      <style>{`
        @keyframes glitch-r {
          0%, 100% { clip-path: inset(30% 0 40% 0); transform: translateX(2px); }
          33% { clip-path: inset(10% 0 60% 0); transform: translateX(-3px); }
          66% { clip-path: inset(70% 0 5% 0); transform: translateX(1px); }
        }
        @keyframes glitch-b {
          0%, 100% { clip-path: inset(60% 0 5% 0); transform: translateX(-2px); }
          33% { clip-path: inset(20% 0 50% 0); transform: translateX(3px); }
          66% { clip-path: inset(5% 0 70% 0); transform: translateX(-1px); }
        }
      `}</style>
    </button>
  );
}
```

### DrawOutlineButton — Border draw animation
```tsx
export function DrawOutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative px-6 py-3 font-medium text-black">
      <span>{children}</span>
      {/* Top */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
      {/* Right */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-600 transition-all duration-300 delay-100 group-hover:h-full" />
      {/* Bottom */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 delay-200 group-hover:w-full" />
      {/* Left */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-600 transition-all duration-300 delay-300 group-hover:h-full" />
    </button>
  );
}
```

---

## 2. Links

### FlipLink — 3D vertical flip
```tsx
import { motion } from "framer-motion";

export function FlipLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-2xl font-bold uppercase"
      style={{ perspective: 400 }}
    >
      <motion.span
        className="block"
        initial={{ rotateX: 0 }}
        whileHover={{ rotateX: -90 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 block text-indigo-500"
        initial={{ rotateX: 90, y: "100%" }}
        whileHover={{ rotateX: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.span>
    </a>
  );
}
```

### ScrambleHover — Text scramble on hover
```tsx
import { useState, useRef } from "react";

const CHARS = "!@#$%^&*()_+";

export function ScrambleHover({ children }: { children: string }) {
  const [text, setText] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iteration = useRef(0);

  const onHover = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    iteration.current = 0;

    intervalRef.current = setInterval(() => {
      setText(
        children
          .split("")
          .map((char, i) => {
            if (i < iteration.current) return children[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration.current >= children.length) clearInterval(intervalRef.current!);
      iteration.current += 0.4;
    }, 40);
  };

  return (
    <span
      onMouseEnter={onHover}
      onMouseLeave={() => setText(children)}
      className="font-mono cursor-pointer select-none"
    >
      {text}
    </span>
  );
}
```

### UnderlineToBackground — Fill on hover
```tsx
export function UnderlineToBackground({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative inline-block px-1 overflow-hidden font-semibold text-black"
    >
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black transition-all duration-300 group-hover:h-full" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </a>
  );
}
```

---

## 3. Cards

### SwipeCards — Tinder-style drag to dismiss
```tsx
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Card {
  id: number;
  content: React.ReactNode;
  background: string;
}

export function SwipeCards({ cards: initialCards }: { cards: Card[] }) {
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="relative w-72 h-96">
      <AnimatePresence>
        {cards.map((card, i) => (
          <SwipeCard
            key={card.id}
            card={card}
            index={i}
            total={cards.length}
            onSwipe={() => setCards((prev) => prev.filter((c) => c.id !== card.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function SwipeCard({
  card,
  index,
  total,
  onSwipe,
}: {
  card: { id: number; content: React.ReactNode; background: string };
  index: number;
  total: number;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const isTop = index === total - 1;

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: index,
        scale: 1 - (total - 1 - index) * 0.04,
        y: (total - 1 - index) * -8,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) onSwipe();
      }}
      className={`absolute inset-0 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing ${card.background}`}
      animate={{ scale: 1 - (total - 1 - index) * 0.04, y: (total - 1 - index) * -8 }}
      exit={{ x: 300, opacity: 0, rotate: 20, transition: { duration: 0.3 } }}
    >
      {card.content}
    </motion.div>
  );
}
```

### TiltCard — 3D perspective tilt
```tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative rounded-2xl bg-white border border-neutral-200 p-6 shadow-xl cursor-pointer overflow-hidden"
    >
      {/* Glare */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 70%)`
          ),
        }}
      />
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}
```

### HoverImageLinks — Image reveal on nav hover
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavItem {
  text: string;
  image: string;
}

export function HoverImageLinks({ items }: { items: NavItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item, i) => (
        <a
          key={item.text}
          href="#"
          className="group flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors"
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <span className="text-2xl font-bold text-neutral-800">{item.text}</span>
          <AnimatePresence>
            {activeIndex === i && (
              <motion.img
                src={item.image}
                alt={item.text}
                initial={{ opacity: 0, scale: 0.85, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -5 }}
                transition={{ duration: 0.2 }}
                className="w-24 h-16 rounded-lg object-cover"
              />
            )}
          </AnimatePresence>
        </a>
      ))}
    </nav>
  );
}
```

---

## 4. Navigation / Menus

### FullScreenMenu — Clip-path reveal
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = ["Home", "Work", "About", "Journal", "Contact"];

export function FullScreenMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-40 px-4 py-2 bg-black text-white rounded-full font-medium text-sm"
      >
        Menu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 56px) 40px)" }}
            animate={{ clipPath: "circle(170% at calc(100% - 56px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 56px) 40px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-neutral-900 flex flex-col justify-center px-16"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-sm"
            >
              Close
            </button>

            <ul className="space-y-2">
              {links.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                >
                  <a
                    href="#"
                    className="block text-6xl font-bold text-white hover:text-indigo-400 transition-colors leading-tight"
                    onClick={() => setOpen(false)}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### RevealLinks — Stagger reveal nav list
```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
};

export function RevealLinks({ links }: { links: string[] }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show" className="space-y-2">
      {links.map((link) => (
        <motion.li key={link} variants={item}>
          <a
            href="#"
            className="block text-2xl font-semibold text-neutral-800 hover:text-indigo-600 transition-colors"
          >
            {link}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## 5. Modals / Interactions

### SpringModal — Spring-animated dialog
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

export function SpringModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="pointer-events-auto w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
              >
                <X size={18} />
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### DragToConfirm — Swipe slider confirmation
```tsx
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight, Check } from "lucide-react";

export function DragToConfirm({ onConfirm }: { onConfirm: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const KNOB_SIZE = 52;
  const trackWidth = 280;
  const MAX_X = trackWidth - KNOB_SIZE - 8;

  const background = useTransform(x, [0, MAX_X], ["#e5e7eb", "#6366f1"]);
  const opacity = useTransform(x, [0, MAX_X * 0.5], [1, 0]);

  const handleDragEnd = () => {
    if (x.get() > MAX_X * 0.85) {
      animate(x, MAX_X, { type: "spring", stiffness: 300, damping: 25 });
      setConfirmed(true);
      onConfirm();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <motion.div
      ref={trackRef}
      style={{ background, width: trackWidth }}
      className="relative h-16 rounded-full flex items-center px-1"
    >
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-neutral-500 pointer-events-none select-none"
      >
        Slide to confirm
      </motion.span>

      <motion.div
        style={{ x }}
        drag={confirmed ? false : "x"}
        dragConstraints={{ left: 0, right: MAX_X }}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        className="w-[52px] h-[52px] rounded-full bg-white shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {confirmed ? (
          <Check size={20} className="text-indigo-600" />
        ) : (
          <ChevronRight size={20} className="text-neutral-500" />
        )}
      </motion.div>
    </motion.div>
  );
}
```

---

## 6. Marquee / Scroll

### InfiniteMarquee — Horizontal auto-scroll
```tsx
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface InfiniteMarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: number;
}

export function InfiniteMarquee({
  items,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  gap = 24,
}: InfiniteMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const duplicated = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex"
        style={{ gap }}
        animate={{
          x: reverse ? ["0%", "50%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          paused,
        }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
```

### ScrollVelocityMarquee — Speed based on scroll
```tsx
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";

export function ScrollVelocityMarquee({
  text,
  baseVelocity = -3,
}: {
  text: string;
  baseVelocity?: number;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const baseX = useTransform(velocityFactor, (v) => v * baseVelocity);

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="inline-flex text-5xl font-bold uppercase tracking-tight"
        style={{ x: baseX }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="mr-8">
            {text} <span className="text-indigo-500">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
```

---

## 7. Text Animations

### StaggerReveal — Words animate in sequence
```tsx
import { motion } from "framer-motion";

export function StaggerReveal({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <motion.p
      className="text-3xl font-bold text-neutral-900"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
```

### WordPullUp — Words pull up from below
```tsx
import { motion } from "framer-motion";

export function WordPullUp({ words }: { words: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="text-4xl font-bold text-neutral-900"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {words.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-3">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: {
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
```

### CursorFollow — Custom cursor that follows mouse
```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorFollow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-indigo-600 pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Ring */}
      <motion.div
        style={{ x: springX, y: springY, translateX: -12, translateY: -12 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-600 pointer-events-none z-[9998] mix-blend-difference opacity-60"
      />
    </>
  );
}
```

---

## Dependencies
```bash
npm install framer-motion lucide-react
```
