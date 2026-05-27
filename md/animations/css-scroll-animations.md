# CSS Scroll-Driven Animations — No JavaScript Required

**Spec**: https://www.w3.org/TR/scroll-animations-1/
**Reference site**: https://scroll-driven-animations.style
**Browser support**: Chrome/Edge 115+, Firefox (behind flag), Safari (partial — use `@supports`)

---

## Core Concepts

Two types of scroll-driven animations:

| Type | API | Tracks |
|---|---|---|
| Scroll progress | `animation-timeline: scroll()` | Scroll position of a container |
| View progress | `animation-timeline: view()` | Element's position in viewport |

Both types **scrub** an `@keyframes` animation using scroll position instead of time. No `requestAnimationFrame`, no JS event listeners.

---

## Browser Support / Fallback

```css
/* Always wrap in @supports */
@supports (animation-timeline: scroll()) {
  .animated-element {
    animation: fadeIn linear both;
    animation-timeline: scroll();
  }
}

/* Fallback for unsupported browsers */
@media not (animation-timeline: scroll()) {
  .animated-element {
    opacity: 1; /* show content without animation */
  }
}
```

---

## 1. Scroll Progress Bar

A reading progress indicator tied to page scroll.

```css
@keyframes grow-width {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #0066ff;
  transform-origin: left center;

  animation: grow-width linear both;
  animation-timeline: scroll(root block); /* root = document, block = vertical */
}
```

---

## 2. Parallax Effect (Pure CSS)

```css
@keyframes parallax-shift {
  from { transform: translateY(-80px); }
  to   { transform: translateY(80px); }
}

.parallax-bg {
  animation: parallax-shift linear both;
  animation-timeline: scroll(root);
}

/* Foreground moves at a different rate */
.parallax-fg {
  animation: parallax-shift linear both;
  animation-timeline: scroll(root);
  animation-duration: 1ms; /* ignored when using scroll timeline */
}
```

---

## 3. Element Reveal on Scroll (view())

Animate an element as it enters the viewport:

```css
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  animation: fade-slide-in ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%; /* play during entry phase, 0–40% of element height */
}
```

### animation-range values

```css
/* Play while element enters viewport */
animation-range: entry 0% entry 100%;

/* Play while element is fully in view */
animation-range: contain 0% contain 100%;

/* Play while element exits */
animation-range: exit 0% exit 100%;

/* Cover full scroll span */
animation-range: cover 0% cover 100%;
```

---

## 4. Staggered Reveals (CSS only)

```css
.card {
  animation: fade-slide-in ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}

/* Stagger using animation-delay doesn't work with view(),
   but you can use nth-child with different ranges */
.card:nth-child(1) { animation-range: entry 0%  entry 40%; }
.card:nth-child(2) { animation-range: entry 10% entry 50%; }
.card:nth-child(3) { animation-range: entry 20% entry 60%; }
```

Or use a small CSS custom property trick:

```css
.card { --i: 0; }
.card:nth-child(1) { --i: 0; }
.card:nth-child(2) { --i: 1; }
.card:nth-child(3) { --i: 2; }

.card {
  animation: fade-slide-in ease-out both;
  animation-timeline: view();
  /* Shift range start by index — requires calc, limited support */
  animation-range: entry calc(var(--i) * 10%) entry calc(var(--i) * 10% + 40%);
}
```

---

## 5. Sticky Header Shrink

```css
@keyframes shrink-header {
  from {
    padding: 24px 40px;
    background: transparent;
    box-shadow: none;
  }
  to {
    padding: 12px 40px;
    background: white;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
  }
}

header {
  position: sticky;
  top: 0;
  animation: shrink-header linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 200px; /* play over first 200px of scroll */
}
```

---

## 6. Horizontal Scroll Section

```css
@keyframes slide-horizontal {
  from { transform: translateX(0); }
  to   { transform: translateX(calc(-100% + 100vw)); }
}

.horizontal-track {
  display: flex;
  width: 400vw; /* total width of all panels */

  animation: slide-horizontal linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 2000px; /* scroll distance to cover full width */
}
```

---

## 7. Cover Flow / Stacking Cards

```css
@keyframes stack-card {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0.6;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.card {
  position: sticky;
  top: 80px;
  animation: stack-card ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
}
```

---

## 8. Text Blur Reveal on Scroll

```css
@keyframes blur-reveal {
  from {
    filter: blur(12px);
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    filter: blur(0px);
    opacity: 1;
    transform: scale(1);
  }
}

.blur-text {
  animation: blur-reveal ease-out both;
  animation-timeline: view();
  animation-range: entry 10% entry 50%;
}
```

---

## 9. Named Scroll Timeline (Custom Container)

Useful when the scroll container isn't the root:

```css
.scroll-container {
  overflow-y: scroll;
  scroll-timeline: --my-timeline block; /* define named timeline */
}

.child-element {
  animation: fade-in linear both;
  animation-timeline: --my-timeline; /* reference by name */
}
```

---

## 10. Image Reveal (clip-path)

```css
@keyframes clip-reveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

.hero-image {
  animation: clip-reveal ease-in-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 70%;
}
```

---

## CSS Properties Quick Reference

| Property | Values | Notes |
|---|---|---|
| `animation-timeline` | `scroll()`, `view()`, `--named`, `auto` | Replaces time with scroll |
| `animation-range` | `normal`, `entry`, `exit`, `contain`, `cover` + offsets | When in scroll span |
| `animation-range-start` | Phase + offset, e.g. `entry 20%` | Start point |
| `animation-range-end` | Phase + offset, e.g. `entry 80%` | End point |
| `scroll-timeline` | `--name axis` | Define on scroll container |
| `view-timeline` | `--name axis` | Define on observed element |
| `animation-fill-mode` | `both` | Keep start/end state |

### scroll() function syntax

```css
animation-timeline: scroll();                    /* nearest scroll ancestor, block axis */
animation-timeline: scroll(root);               /* document root */
animation-timeline: scroll(root inline);        /* horizontal scroll */
animation-timeline: scroll(nearest block);      /* nearest ancestor, vertical */
```

### view() function syntax

```css
animation-timeline: view();                     /* default inset */
animation-timeline: view(block);                /* vertical axis */
animation-timeline: view(inline);               /* horizontal axis */
animation-timeline: view(block 100px);          /* with inset */
```

---

## Demos from scroll-driven-animations.style

| Demo | Technique |
|---|---|
| Reading progress bar | `scroll(root)` + `scaleX` |
| Carousel step indicator | `view()` + `opacity` |
| Reverse-scrolling columns | `scroll()` with negative direction |
| Cover card → fixed header | `scroll()` + `animation-range` |
| Image reveal effects | `view()` + `clip-path` |
| Fly-in / fly-out contact list | `view()` + `translateX` + `exit` range |
| Cover Flow | `view()` + `scale` + `rotateY` |
| Stacking cards | `view()` + `sticky` positioning |
| Horizontal scroll section | `scroll()` + `translateX` |
| 3D shoe explorer | `scroll()` + CSS 3D transforms |
| Shrinking header + shadow | `scroll()` + `animation-range: 0 200px` |
| Scroll shadows | `scroll()` + `background-attachment` trick |

---

## Gotchas

- `animation-duration` is irrelevant for scroll timelines — scroll position controls progress
- Always set `animation-fill-mode: both` to hold start/end states
- `will-change: transform` still helps performance
- View timeline only works if the element has a scrolling ancestor
- Combining with `position: sticky` creates powerful pinned scroll effects
