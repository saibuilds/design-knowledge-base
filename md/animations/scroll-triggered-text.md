# Scroll-Triggered Text — SplitType, GSAP, ScrollTrigger

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, GSAP 3 + ScrollTrigger, SplitType.

---

## 1. Concepts

Text animation on scroll is split into two concerns:
1. **Splitting** — breaking a text node into `<div>` wrappers per char/word/line so each unit can be animated independently (SplitType).
2. **Triggering** — GSAP ScrollTrigger fires or scrubs the animation as the element enters the viewport.

Install:
```bash
npm install gsap split-type
```

SplitType replaces the older `SplitText` GSAP plugin (paid). It produces `.chars`, `.words`, `.lines` arrays.

---

## 2. Char-by-Char Reveal (bottom-up mask)

Each character is wrapped in an overflow-hidden clip and translated up into view.

```tsx
// components/text/CharReveal.tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CharRevealProps {
  children: string;
  className?: string;
  /** stagger between chars in seconds */
  stagger?: number;
  duration?: number;
}

export function CharReveal({
  children,
  className = "",
  stagger = 0.025,
  duration = 0.7,
}: CharRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, { types: "chars" });

    // Wrap each char in an overflow-hidden div for mask effect
    split.chars?.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      char.parentNode?.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    const anim = gsap.fromTo(
      split.chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, stagger, duration]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
```

```tsx
// Usage
<CharReveal className="text-6xl font-bold text-neutral-900">
  Design that moves.
</CharReveal>
```

---

## 3. Word Stagger Reveal

```tsx
// components/text/WordStagger.tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WordStagger({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "words" });

    const anim = gsap.fromTo(
      split.words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, stagger]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
```

---

## 4. Line Mask Reveal (overflow hidden per line)

Lines clip from below using `clipPath` — the cleanest technique for multi-line body copy.

```tsx
// components/text/LineMaskReveal.tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LineMaskReveal({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "lines" });

    // Wrap each line in overflow:hidden container
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const anim = gsap.fromTo(
      split.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

---

## 5. ScrollTrigger Scrub — Text Opacity Fade Per Word

Words fade from 20% to 100% opacity as user scrolls through the section. Linear.app / Loom style.

```tsx
// components/text/ScrubOpacity.tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrubOpacity({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "words" });

    const anim = gsap.fromTo(
      split.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      }
    );

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
```

---

## 6. Kinetic Typography — Scale + Blur on Scroll

Text scales from 0.8 → 1.0 and blur clears as it enters view. Dramatic for hero statements.

```tsx
// components/text/KineticText.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function KineticText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const anim = gsap.fromTo(
      ref.current,
      {
        scale: 0.85,
        filter: "blur(12px)",
        opacity: 0,
      },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => anim.kill();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

---

## 7. Word-by-Word Highlight (Linear.app Hero Style)

Each word transitions from a muted color to full black as the scroll scrub passes through it.

```tsx
// components/text/WordHighlight.tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WordHighlight({
  children,
  className = "",
  dimColor = "#c8c8c8",
  activeColor = "#1a1a1a",
}: {
  children: string;
  className?: string;
  dimColor?: string;
  activeColor?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "words" });

    // Set all words to dim color initially
    gsap.set(split.words, { color: dimColor });

    const anim = gsap.to(split.words, {
      color: activeColor,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 1,
      },
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, dimColor, activeColor]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
```

---

## 8. Scramble Text on Scroll Enter

Letters cycle through random characters before resolving to the final text. Requires GSAP ScrambleText plugin (Club GSAP) or a vanilla implementation below.

```tsx
// components/text/ScrambleReveal.tsx — vanilla implementation, no Club GSAP
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

function scrambleText(
  el: HTMLElement,
  finalText: string,
  duration = 1200
): () => void {
  const start = performance.now();
  let frame: number;

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const resolvedCount = Math.floor(progress * finalText.length);

    let output = "";
    for (let i = 0; i < finalText.length; i++) {
      if (i < resolvedCount || finalText[i] === " ") {
        output += finalText[i];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = output;
    if (progress < 1) frame = requestAnimationFrame(tick);
  }

  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

export function ScrambleReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        cancelRef.current = scrambleText(el, children, 1000);
      },
    });

    return () => {
      cancelRef.current?.();
    };
  }, [children]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
```

---

## 9. Combining Patterns — Section Example

```tsx
// components/sections/TextShowcaseSection.tsx
import { CharReveal } from "@/components/text/CharReveal";
import { WordHighlight } from "@/components/text/WordHighlight";
import { LineMaskReveal } from "@/components/text/LineMaskReveal";
import { ScrubOpacity } from "@/components/text/ScrubOpacity";

export function TextShowcaseSection() {
  return (
    <section className="min-h-screen py-32 px-8 max-w-4xl mx-auto space-y-24">
      <CharReveal className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-neutral-900">
        Every pixel has a purpose.
      </CharReveal>

      <WordHighlight
        className="text-[clamp(1.5rem,3vw,2.5rem)] leading-relaxed font-light"
        dimColor="#d4d4d4"
        activeColor="#1a1a1a"
      >
        We craft digital experiences that balance rigorous craft with genuine human warmth.
      </WordHighlight>

      <LineMaskReveal className="text-lg leading-relaxed text-neutral-600 max-w-2xl">
        Our process begins with listening. We ask difficult questions, resist easy answers, and move slowly enough to get it right.
      </LineMaskReveal>
    </section>
  );
}
```
