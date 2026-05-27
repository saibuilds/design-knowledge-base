# anime.js — Animation Library Reference

**License**: MIT | **Bundle**: 24.5 KB (full) | **npm**: `animejs`
**Repo**: https://github.com/juliangarnier/anime | **Docs**: https://animejs.com

## Why anime.js vs GSAP

| Criteria | anime.js | GSAP |
|---|---|---|
| Size | 24.5 KB | ~70 KB (core) |
| License | MIT | Free (GSAP 3+, Webflow-sponsored) |
| Plugins | Built-in SVG, draggable, scroll | Extensive plugin ecosystem |
| ScrollTrigger | IntersectionObserver DIY | First-class ScrollTrigger plugin |
| Best for | Lightweight, self-contained animations | Complex scroll choreography, production sites |

**Rule**: Use anime.js when you want MIT + smaller bundle for UI micro-animations, SVG morphing, or standalone components. Use GSAP when you need ScrollTrigger, SplitText, or complex timelines on marketing sites.

---

## Install

```bash
npm install animejs
```

```js
import anime from 'animejs';
// or modular:
import { animate, createTimeline, stagger, createDraggable } from 'animejs';
```

---

## Basic Animation

```js
import anime from 'animejs';

// Animate any CSS property or attribute
anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FF851B',
  duration: 800,
  easing: 'easeInOutQuad',
});
```

### Per-property parameters

```js
anime({
  targets: '.el',
  translateX: {
    value: 250,
    duration: 800,
    easing: 'easeInOutQuad',
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine',
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutExpo',
  },
  delay: 250,
});
```

---

## Timelines

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({ defaults: { duration: 600, easing: 'easeOutExpo' } });

tl
  .add('.title',   { opacity: [0, 1], translateY: [30, 0] })
  .add('.subtitle',{ opacity: [0, 1], translateY: [20, 0] }, '-=400') // overlap by 400ms
  .add('.cta',     { opacity: [0, 1], scale: [0.9, 1] }, '-=300');
```

### Time position syntax

```js
tl.add(target, props, '+=200')   // 200ms after previous ends
tl.add(target, props, '-=200')   // 200ms before previous ends
tl.add(target, props, 1000)      // absolute 1000ms from start
tl.add(target, props, '<')       // same start time as previous
```

---

## Stagger

```js
import { animate, stagger } from 'animejs';

// Stagger grid items in from left
animate('.grid-item', {
  opacity:    [0, 1],
  translateY: [20, 0],
  delay: stagger(80),           // 80ms between each
  duration: 600,
  easing: 'easeOutCubic',
});

// Stagger from center outward
animate('.dot', {
  scale: [0, 1],
  delay: stagger(60, { from: 'center' }),
});

// 2D grid stagger
animate('.cell', {
  scale: [0.7, 1],
  delay: stagger(100, { grid: [14, 5], from: 'center' }),
});
```

---

## SVG Morphing

```js
import anime from 'animejs';

anime({
  targets: '#morphPath',
  d: [
    { value: 'M 0 100 L 100 100 L 100 0 L 0 0 Z' },       // square
    { value: 'M 50 0 L 100 100 L 0 100 Z', duration: 800 }, // triangle
  ],
  easing: 'easeInOutSine',
  loop: true,
  direction: 'alternate',
});
```

**Requirements**: Source and target paths must have the same number of points.

### SVG Line Drawing

```js
anime({
  targets: '.path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: (el, i) => i * 250,
  direction: 'alternate',
  loop: true,
});
```

---

## Motion Path Animation

```js
// Animate element along an SVG path
const path = anime.path('#motionPath');

anime({
  targets: '#follower',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 2000,
  loop: true,
});
```

---

## Scroll-Triggered with IntersectionObserver

anime.js has a built-in Scroll Observer API (v4+):

```js
import { animate, onScroll } from 'animejs';

// Trigger when element enters viewport
animate('.reveal-item', {
  opacity:    [0, 1],
  translateY: [40, 0],
  duration: 700,
  easing: 'easeOutCubic',
  delay: stagger(100),
  autoplay: onScroll({
    target: '.reveal-item',
    enter: 'bottom 90%',   // trigger when bottom of viewport is at 90%
    leave: 'top 10%',
    sync: false,
  }),
});
```

### Manual IntersectionObserver pattern (v3 compatible)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        opacity:    [0, 1],
        translateY: [30, 0],
        duration: 700,
        easing: 'easeOutQuad',
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

---

## Scroll-Sync (Scrub) Animation

```js
import { animate, onScroll } from 'animejs';

// Animation scrubs with scroll position
animate('.parallax-el', {
  translateY: [-100, 100],
  autoplay: onScroll({
    sync: true,            // scrub: ties progress to scroll
    axis: 'y',
  }),
});
```

---

## Draggable Elements

```js
import { createDraggable } from 'animejs';

createDraggable('.card', {
  container: '.stage',
  releaseEase: 'spring(1, 80, 10, 0)', // spring physics on release
  onGrab: (draggable) => console.log('grabbed', draggable.x),
});
```

---

## Easing Reference

```js
// Built-in easings
'linear'
'easeInOutQuad'
'easeOutExpo'
'easeOutElastic(1, 0.5)'   // amplitude, period
'spring(mass, stiffness, damping, velocity)'
'cubicBezier(x1, y1, x2, y2)'
'steps(10)'
```

---

## Responsive / Scope API

```js
import { createScope, animate } from 'animejs';

const scope = createScope({ mediaQuery: '(max-width: 768px)' });

scope.add(() => {
  animate('.hero', { translateX: [0, 20] });
});

// Cleans up automatically when media query no longer matches
```

---

## Useful Patterns

### Count-up number

```js
const obj = { count: 0 };
anime({
  targets: obj,
  count: 1000,
  round: 1,
  easing: 'easeOutExpo',
  duration: 1500,
  update: () => {
    document.querySelector('.counter').textContent = obj.count;
  },
});
```

### Looping background position (CSS vars)

```js
anime({
  targets: 'body',
  '--bg-pos': ['0%', '100%'],
  loop: true,
  direction: 'alternate',
  easing: 'linear',
  duration: 4000,
});
```

---

## When NOT to use anime.js

- Complex scroll choreography with pinning → use GSAP ScrollTrigger
- Text splitting effects → use GSAP SplitText
- Heavy SVG path work at 60fps → GSAP handles better
- Need IE11 support → GSAP has better legacy support
