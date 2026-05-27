# Before / After Slider — Drag, Touch, Scroll-Reveal Variants

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, GSAP 3 + ScrollTrigger.

---

## 1. Concepts

A before/after slider reveals two images using a draggable divider. The "after" image is clipped via `clip-path` or `clipPath` style — no absolute-positioned duplicate needed.

Variants:
- **CSS clip-path drag** — pure CSS + vanilla JS pointer events
- **React version** — `useRef` + pointer event handlers, TypeScript
- **Touch-friendly** — unified pointer events (works mouse + touch + stylus)
- **Vertical split** — top/bottom instead of left/right
- **Scroll reveal** — auto-animates when entering viewport, no drag needed

---

## 2. CSS + Vanilla JS — clip-path Drag Slider

```html
<!-- Minimal HTML structure -->
<div class="ba-slider" id="slider">
  <div class="ba-before">
    <img src="/before.jpg" alt="Before" />
    <span class="ba-label">Before</span>
  </div>
  <div class="ba-after">
    <img src="/after.jpg" alt="After" />
    <span class="ba-label">After</span>
  </div>
  <div class="ba-handle" id="handle">
    <div class="ba-handle-line"></div>
    <div class="ba-handle-circle">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
        <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="white" strokeWidth="1.5"
          fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div class="ba-handle-line"></div>
  </div>
</div>
```

```css
/* before-after.css */
.ba-slider {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  cursor: ew-resize;
  user-select: none;
}

.ba-before,
.ba-after {
  position: absolute;
  inset: 0;
}

.ba-before img,
.ba-after img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
}

/* After image is clipped — clip-path updates via JS */
.ba-after {
  clip-path: inset(0 50% 0 0);
}

.ba-label {
  position: absolute;
  bottom: 12px;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  pointer-events: none;
}

.ba-before .ba-label { left: 12px; }
.ba-after  .ba-label { right: 12px; }

/* Handle */
.ba-handle {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.ba-handle-line {
  flex: 1;
  width: 2px;
  background: white;
}

.ba-handle-circle {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  flex-shrink: 0;
}
```

```js
// before-after.js — vanilla, no framework
(function () {
  const slider = document.getElementById("slider");
  const afterEl = slider.querySelector(".ba-after");
  const handle = document.getElementById("handle");
  let dragging = false;

  function setPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  }

  slider.addEventListener("pointerdown", (e) => {
    dragging = true;
    slider.setPointerCapture(e.pointerId);
    setPosition(e.clientX);
  });

  slider.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setPosition(e.clientX);
  });

  slider.addEventListener("pointerup",   () => { dragging = false; });
  slider.addEventListener("pointercancel", () => { dragging = false; });
})();
```

---

## 3. React Version — useRef + Pointer Events

```tsx
// components/BeforeAfterSlider.tsx
"use client";
import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number; // 0–100, default 50
  aspectRatio?: string;     // Tailwind aspect class
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  initialPosition = 50,
  aspectRatio = "aspect-video",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const dragging = useRef(false);

  const getPosition = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return position;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, [position]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    setPosition(getPosition(e.clientX));
  }, [getPosition]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setPosition(getPosition(e.clientX));
  }, [getPosition]);

  const stopDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl cursor-ew-resize select-none`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      {/* Before image — full width, always visible */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* After image — clipped to reveal portion */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-full pointer-events-none">
        {beforeAlt}
      </span>
      <span className="absolute bottom-3 right-3 text-white text-xs uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-full pointer-events-none">
        {afterAlt}
      </span>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="flex-1 w-0.5 bg-white" />
        <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l-4 6 4 6M13 4l4 6-4 6"
              stroke="#1a1a1a" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1 w-0.5 bg-white" />
      </div>
    </div>
  );
}
```

```tsx
// Usage
<BeforeAfterSlider
  beforeSrc="/images/kitchen-before.jpg"
  afterSrc="/images/kitchen-after.jpg"
  beforeAlt="Before renovation"
  afterAlt="After renovation"
  initialPosition={40}
  aspectRatio="aspect-[4/3]"
/>
```

---

## 4. Vertical Split Variant (top/bottom)

```tsx
// components/BeforeAfterVertical.tsx
"use client";
import { useRef, useState, useCallback } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  aspectRatio?: string;
}

export function BeforeAfterVertical({ beforeSrc, afterSrc, aspectRatio = "aspect-square" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const getPosition = useCallback((clientY: number): number => {
    const el = containerRef.current;
    if (!el) return position;
    const rect = el.getBoundingClientRect();
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    return (y / rect.height) * 100;
  }, [position]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    setPosition(getPosition(e.clientY));
  }, [getPosition]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setPosition(getPosition(e.clientY));
  }, [getPosition]);

  const stopDrag = useCallback(() => { dragging.current = false; }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl cursor-ns-resize select-none`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      <img src={beforeSrc} alt="Before"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 ${100 - position}% 0)` }}
      >
        <img src={afterSrc} alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Horizontal handle bar */}
      <div
        className="absolute left-0 right-0 flex flex-row items-center pointer-events-none z-10"
        style={{ top: `${position}%`, transform: "translateY(-50%)" }}
      >
        <div className="flex-1 h-0.5 bg-white" />
        <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 7l6-4 6 4M4 13l6 4 6-4"
              stroke="#1a1a1a" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1 h-0.5 bg-white" />
      </div>
    </div>
  );
}
```

---

## 5. Scroll-Reveal Variant (auto-slides on viewport enter)

No drag — the divider auto-animates from 0% to 50% when the element scrolls into view.

```tsx
// components/BeforeAfterScrollReveal.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  beforeSrc: string;
  afterSrc: string;
  aspectRatio?: string;
  revealTo?: number; // final position 0–100, default 55
}

export function BeforeAfterScrollReveal({
  beforeSrc,
  afterSrc,
  aspectRatio = "aspect-video",
  revealTo = 55,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ val: 0 });

  useEffect(() => {
    if (!afterRef.current || !handleRef.current) return;

    const update = () => {
      const p = posRef.current.val;
      if (afterRef.current)  afterRef.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      if (handleRef.current) handleRef.current.style.left = `${p}%`;
    };

    const anim = gsap.to(posRef.current, {
      val: revealTo,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: update,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      },
    });

    return () => anim.kill();
  }, [revealTo]);

  return (
    <div ref={containerRef} className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl select-none`}>
      <img src={beforeSrc} alt="Before"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div ref={afterRef} className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: "inset(0 100% 0 0)" }}>
        <img src={afterSrc} alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div ref={handleRef}
        className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none z-10"
        style={{ left: "0%", transform: "translateX(-50%)" }}
      >
        <div className="flex-1 w-0.5 bg-white/80" />
        <div className="w-8 h-8 rounded-full bg-white shadow-md flex-shrink-0" />
        <div className="flex-1 w-0.5 bg-white/80" />
      </div>
    </div>
  );
}
```

---

## 6. Accessibility Note

Add `role="img"` and a combined `aria-label` on the container so screen readers get context:

```tsx
<div
  role="img"
  aria-label={`Before and after comparison: ${beforeAlt} vs ${afterAlt}`}
  // ...rest of props
>
```
