# Text Effects — Gradient, Glitch, Typewriter, Counter, Marquee

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, GSAP 3, CSS animations.

---

## 1. Moving Gradient Text (hover + scroll)

The gradient background-size is larger than the element, and `background-position` animates on hover. On scroll, GSAP scrubs the position.

```tsx
// components/text/GradientText.tsx
"use client";
import { useRef, useState } from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className = "",
  from = "#8b6914",
  via = "#c4a862",
  to = "#1a1a1a",
}: GradientTextProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`inline-block transition-all duration-700 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${via}, ${to}, ${from})`,
        backgroundSize: "300% 300%",
        backgroundPosition: hovered ? "100% 100%" : "0% 0%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}
```

```css
/* Infinite moving gradient — CSS-only variant */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text-animated {
  background: linear-gradient(135deg, #8b6914, #c4a862, #1a1a1a, #8b6914);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}
```

```tsx
// Usage
<GradientText className="text-6xl font-bold font-serif">
  Designed to last.
</GradientText>

{/* CSS-only */}
<h1 className="text-6xl font-bold gradient-text-animated">
  Designed to last.
</h1>
```

---

## 2. Outline to Fill Text on Scroll

Text starts as stroke-only (outline) and fills with color as the section scrolls into view. Uses SVG text for true stroke control, or a CSS `-webkit-text-stroke` approach.

```tsx
// components/text/OutlineToFill.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OutlineToFillProps {
  children: string;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export function OutlineToFill({
  children,
  className = "",
  strokeColor = "#1a1a1a",
  fillColor = "#1a1a1a",
}: OutlineToFillProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Start transparent fill, visible stroke
    gsap.set(ref.current, {
      color: "transparent",
      WebkitTextStroke: `1.5px ${strokeColor}`,
    });

    const anim = gsap.to(ref.current, {
      color: fillColor,
      ease: "power2.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });

    return () => anim.kill();
  }, [strokeColor, fillColor]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
```

```tsx
// SVG version — precise stroke-dashoffset fill animation
// components/text/SvgOutlineFill.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SvgOutlineFill({
  text,
  fontSize = 80,
  fontFamily = "Cormorant Garamond, serif",
  strokeColor = "#1a1a1a",
  fillColor = "#1a1a1a",
  width = 800,
  height = 120,
}: {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  strokeColor?: string;
  fillColor?: string;
  width?: number;
  height?: number;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const length = el.getTotalLength?.() ?? 2000;
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: "transparent",
      stroke: strokeColor,
      strokeWidth: 1,
    });

    const anim = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // Draw stroke
    anim.to(el, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" });
    // Fill
    anim.to(el, { fill: fillColor, stroke: "transparent", duration: 0.6, ease: "power2.out" }, "-=0.2");

    return () => anim.kill();
  }, [strokeColor, fillColor]);

  return (
    <svg ref={containerRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto overflow-visible">
      <text
        ref={textRef}
        x="50%"
        y="75%"
        textAnchor="middle"
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight="400"
      >
        {text}
      </text>
    </svg>
  );
}
```

---

## 3. Staggered Letter Drop-In

```tsx
// components/text/LetterDropIn.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LetterDropIn({
  children,
  className = "",
  stagger = 0.04,
  duration = 0.5,
  y = -30,
}: {
  children: string;
  className?: string;
  stagger?: number;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Build spans per character
    const chars = children.split("").map((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.style.display = "inline-block";
      return span;
    });

    el.innerHTML = "";
    chars.forEach((s) => el.appendChild(s));

    const anim = gsap.fromTo(
      chars,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "back.out(1.4)",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
      el.textContent = children;
    };
  }, [children, stagger, duration, y]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
```

---

## 4. Typewriter with Cursor Blink

```tsx
// components/text/Typewriter.tsx
"use client";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;  // ms per char
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
  cursorColor?: string;
}

export function Typewriter({
  phrases,
  typingSpeed = 65,
  deleteSpeed = 35,
  pauseMs = 1800,
  className = "",
  cursorColor = "#8b6914",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [blink, setBlink] = useState(true);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const phrase = phrases[phraseIndex.current];

      if (!deleting.current) {
        charIndex.current += 1;
        setDisplayed(phrase.slice(0, charIndex.current));

        if (charIndex.current === phrase.length) {
          deleting.current = true;
          timer = setTimeout(tick, pauseMs);
          return;
        }
        timer = setTimeout(tick, typingSpeed);
      } else {
        charIndex.current -= 1;
        setDisplayed(phrase.slice(0, charIndex.current));

        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timer = setTimeout(tick, typingSpeed);
          return;
        }
        timer = setTimeout(tick, deleteSpeed);
      }
    }

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [phrases, typingSpeed, deleteSpeed, pauseMs]);

  // Cursor blink interval
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          backgroundColor: cursorColor,
          verticalAlign: "text-bottom",
          marginLeft: "2px",
          opacity: blink ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}
```

```tsx
// Usage
<h1 className="text-5xl font-serif text-neutral-900">
  We design{" "}
  <Typewriter
    phrases={["kitchens.", "interiors.", "experiences.", "homes."]}
    cursorColor="#8b6914"
  />
</h1>
```

---

## 5. Text Glitch Effect (CSS + optional JS randomize)

```css
/* globals.css */
@keyframes glitch-1 {
  0%   { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
  25%  { clip-path: inset(55% 0 10% 0); transform: translate(4px, 0); }
  50%  { clip-path: inset(5%  0 85% 0); transform: translate(-2px, 0); }
  75%  { clip-path: inset(75% 0 5%  0); transform: translate(3px, 0); }
  100% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
}
@keyframes glitch-2 {
  0%   { clip-path: inset(60% 0 20% 0); transform: translate(4px, 0); color: #ff0040; }
  33%  { clip-path: inset(10% 0 55% 0); transform: translate(-4px, 0); color: #00ffe1; }
  66%  { clip-path: inset(85% 0 5%  0); transform: translate(2px, 0);  color: #ff0040; }
  100% { clip-path: inset(60% 0 20% 0); transform: translate(4px, 0);  color: #00ffe1; }
}

.glitch {
  position: relative;
  display: inline-block;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0;
}
.glitch:hover::before {
  opacity: 0.8;
  animation: glitch-1 0.35s steps(1) infinite;
}
.glitch:hover::after {
  opacity: 0.8;
  animation: glitch-2 0.35s steps(1) infinite;
}
```

```tsx
// components/text/GlitchText.tsx
export function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`glitch ${className}`}
      data-text={children}
    >
      {children}
    </span>
  );
}
```

```tsx
// JS-driven glitch — flickers on interval then resolves
// components/text/GlitchReveal.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%";

export function GlitchReveal({
  children,
  className = "",
  duration = 800,
  autoPlay = false,
}: {
  children: string;
  className?: string;
  duration?: number;
  autoPlay?: boolean;
}) {
  const [text, setText] = useState(children);
  const running = useRef(false);

  function runGlitch() {
    if (running.current) return;
    running.current = true;
    const start = performance.now();
    const final = children;

    function frame(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * final.length);

      let out = "";
      for (let i = 0; i < final.length; i++) {
        if (i < resolvedCount || final[i] === " ") {
          out += final[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setText(out);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setText(final);
        running.current = false;
      }
    }
    requestAnimationFrame(frame);
  }

  useEffect(() => {
    if (autoPlay) {
      const id = setTimeout(runGlitch, 400);
      return () => clearTimeout(id);
    }
  }, [autoPlay]);

  return (
    <span
      className={`cursor-pointer font-mono ${className}`}
      onMouseEnter={runGlitch}
    >
      {text}
    </span>
  );
}
```

---

## 6. Number Counter Animation (GSAP)

```tsx
// components/text/NumberCounter.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix?: string;    // e.g. "+" or "%"
  prefix?: string;    // e.g. "$"
  label: string;
  decimals?: number;
}

export function NumberCounter({
  stats,
  className = "",
}: {
  stats: StatItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const counters = stats.map((stat, i) => {
      const el = valueRefs.current[i];
      if (!el) return null;
      const obj = { val: 0 };
      return gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        onUpdate() {
          const decimals = stat.decimals ?? 0;
          el.textContent = obj.val.toFixed(decimals);
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => counters.forEach((c) => c?.kill());
  }, [stats]);

  return (
    <div ref={containerRef} className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-[clamp(2.5rem,5vw,4rem)] font-serif leading-none" style={{ color: "#1a1a1a" }}>
            {stat.prefix ?? ""}
            <span ref={(el) => { valueRefs.current[i] = el; }}>0</span>
            {stat.suffix ?? ""}
          </p>
          <p className="text-xs uppercase tracking-[0.14em] mt-3" style={{ color: "#6b6b6b" }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
```

```tsx
// Usage
<NumberCounter
  stats={[
    { value: 350, suffix: "+", label: "Projects completed" },
    { value: 22,  label: "Years in business" },
    { value: 98,  suffix: "%", label: "Client satisfaction" },
    { value: 14,  label: "Awards won" },
  ]}
/>
```

---

## 7. Marquee / Ticker — CSS Infinite Scroll

```tsx
// components/text/Marquee.tsx
"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;   // seconds for one full pass
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  items,
  speed = 30,
  separator = "·",
  className = "",
  reverse = false,
}: MarqueeProps) {
  // Duplicate items so the loop is seamless
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex gap-8"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            {item}
            <span aria-hidden className="opacity-40">{separator}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
```

```tsx
// Usage — brand tagline ticker
<Marquee
  items={[
    "Bespoke kitchen design",
    "Handcrafted in Toronto",
    "Investment-grade quality",
    "Book a consultation",
  ]}
  speed={25}
  className="py-4 text-sm uppercase tracking-[0.14em]"
  style={{ backgroundColor: "#1a1a1a", color: "#fafaf8" }}
/>

{/* Reverse direction for stacked double marquee */}
<Marquee items={["Smallbone", "Henrybuilt", "deVOL", "Plain English", "Martin Moore"]}
  speed={20} reverse className="py-3 text-xs uppercase tracking-widest opacity-50" />
```

---

## 8. Pausing Marquee on Hover

```tsx
// components/text/MarqueePauseable.tsx
"use client";
import { useRef } from "react";

export function MarqueePauseable({
  items,
  speed = 30,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const track = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
      onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
    >
      <div
        ref={trackRef}
        className="inline-flex gap-10"
        style={{ animation: `marquee ${speed}s linear infinite`, willChange: "transform" }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {item}
            <span aria-hidden className="opacity-30">—</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
```

---

## 9. Combining Effects — Hero with Gradient + Counter + Marquee

```tsx
// components/sections/StatsAndTickerSection.tsx
import { GradientText } from "@/components/text/GradientText";
import { NumberCounter } from "@/components/text/NumberCounter";
import { Marquee } from "@/components/text/Marquee";

export function StatsAndTickerSection() {
  return (
    <section className="py-24" style={{ backgroundColor: "#fafaf8" }}>
      <div className="px-8 md:px-16 mb-16 text-center">
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)]" style={{ color: "#1a1a1a" }}>
          Our work, <GradientText from="#8b6914" via="#c4a862" to="#1a1a1a">by the numbers.</GradientText>
        </h2>
      </div>

      <div className="px-8 md:px-16 mb-16">
        <NumberCounter
          stats={[
            { value: 350, suffix: "+", label: "Kitchens installed" },
            { value: 22,  label: "Years in business" },
            { value: 98,  suffix: "%", label: "Client satisfaction" },
            { value: 14,  label: "Industry awards" },
          ]}
        />
      </div>

      <Marquee
        items={["Bespoke Design", "Premium Materials", "Expert Installation", "Lifetime Support"]}
        speed={20}
        className="py-4 text-sm uppercase tracking-[0.16em] border-y"
        style={{ borderColor: "#9b9390", color: "#6b6b6b" }}
      />
    </section>
  );
}
```
