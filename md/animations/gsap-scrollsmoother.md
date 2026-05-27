# GSAP ScrollSmoother — Reference

**Plugin**: ScrollSmoother (part of GSAP, free since Webflow's sponsorship)
**Docs**: https://gsap.com/docs/v3/Plugins/ScrollSmoother/
**Requires**: GSAP 3.11+, ScrollTrigger plugin

---

## What It Does

ScrollSmoother adds smooth/inertia scrolling to a page by wrapping native browser scroll — it intercepts the scroll event, then eases the content to "catch up" over a set duration. Unlike libraries that override the scrollbar, ScrollSmoother **uses native scroll**, so it:

- Works correctly with `position: sticky`
- Doesn't break anchor links
- Is accessible (real scroll position matches visual position)
- Plays well with all other ScrollTrigger animations

---

## Setup

### HTML Structure (required)

```html
<body>
  <div id="smooth-wrapper">   <!-- fills the viewport -->
    <div id="smooth-content"> <!-- all page content goes here -->
      <!-- your content -->
    </div>
  </div>
</body>
```

```css
#smooth-wrapper {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

#smooth-content {
  /* No special styles needed — GSAP handles it */
}
```

### JavaScript

```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',   // the fixed viewport element
  content: '#smooth-content',   // the scrollable content
  smooth: 1.5,                  // seconds for content to catch up (default: 0.8)
  effects: true,                // enable data-speed and data-lag parsing
  smoothTouch: 0.1,             // optional: light smoothing on touch (default: false)
  normalizeScroll: true,        // sync scroll to JS thread (reduces jank)
});
```

---

## data-speed (Parallax)

The simplest way to create parallax — just add an attribute:

```html
<!-- Scrolls at 50% speed (moves up slower = appears to go backward) -->
<div data-speed="0.5">Slow background</div>

<!-- Scrolls at 200% speed (moves up faster = foreground parallax) -->
<div data-speed="2">Fast foreground</div>

<!-- Auto-calculates based on element's natural position in container -->
<div data-speed="auto">Smart parallax</div>

<!-- Prevent the element from going off-screen with clamp() -->
<div data-speed="clamp(0.5)">Clamped parallax</div>
```

**How speed values work:**
- `1.0` = normal scroll speed (no effect)
- `< 1.0` = scrolls slower than page (background-like parallax)
- `> 1.0` = scrolls faster than page (foreground parallax)
- `auto` = GSAP calculates offset so element ends up at its natural position

```js
// Set via JavaScript instead of HTML attribute
smoother.effects('.parallax-img', { speed: 0.75 });
```

---

## data-lag (Inertia / Trailing)

Creates a "lag" — the element catches up to scroll position with a delay:

```html
<!-- Element trails 0.5 seconds behind scroll -->
<div data-lag="0.5">Lagging element</div>

<!-- Heavy inertia feel -->
<div data-lag="1.2">Very laggy</div>
```

```js
// JavaScript version with combined speed + lag
smoother.effects('.card', { speed: 0.8, lag: 0.3 });

// Apply to multiple elements with stagger
gsap.utils.toArray('.grid-item').forEach((el, i) => {
  smoother.effects(el, { speed: 1, lag: i * 0.05 });
});
```

**Visual effect**: Gives elements a "floating" or "magnetic" feel — great for images, decorative elements, and UI cards.

---

## Integration with ScrollTrigger

ScrollSmoother works transparently with ScrollTrigger. ScrollTrigger reads the **native scroll position** (what ScrollSmoother feeds to the browser), not the visual position, so all scroll-triggered animations stay accurate.

```js
// Normal ScrollTrigger usage — works as expected
gsap.from('.section-title', {
  y: 60,
  opacity: 0,
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 85%',
    end: 'top 50%',
    scrub: true,
  },
});

// Pin a section while smoother is active
ScrollTrigger.create({
  trigger: '.sticky-section',
  start: 'top top',
  end: '+=600',
  pin: true,
});
```

---

## Pausing for Modals / Overlays

When a modal opens, you want to freeze scrolling completely:

```js
// Open modal
function openModal() {
  modal.classList.add('open');
  smoother.paused(true);  // Freeze scroll — even dragging the scrollbar is blocked
}

// Close modal
function closeModal() {
  modal.classList.remove('open');
  smoother.paused(false); // Resume
}
```

---

## Programmatic Scrolling

```js
// Scroll to a position (px)
smoother.scrollTo(500);

// Scroll to an element
smoother.scrollTo('#contact-section', true); // true = smooth

// Scroll to element with offset
smoother.scrollTo('#contact-section', true, 'top 100px');

// Get/set scroll position instantly (no animation)
smoother.scrollTop(0);         // scroll to top instantly
const pos = smoother.scrollTop(); // get current position
```

---

## Useful Methods

```js
// Get current scroll velocity (px/sec)
const vel = smoother.getVelocity();

// Destroy instance (e.g., on route change in SPA)
smoother.kill();

// Scroll progress (0–1) — same as ScrollTrigger.getScrollFunc()
const progress = smoother.progress;

// Re-init after DOM changes
smoother.refresh();
```

---

## Common Patterns

### Page Enter Animation + Smooth Scroll

```js
const smoother = ScrollSmoother.create({ smooth: 1.2, effects: true });

// Prevent scroll during page intro animation
smoother.paused(true);

gsap.timeline({ onComplete: () => smoother.paused(false) })
  .from('.hero-title', { y: 80, opacity: 0, duration: 1 })
  .from('.hero-sub',   { y: 40, opacity: 0, duration: 0.8 }, '-=0.5');
```

### Per-Section Parallax Layers

```html
<section class="hero">
  <div class="bg-layer"  data-speed="0.5" data-lag="0">
    <img src="bg.jpg" />
  </div>
  <div class="mid-layer" data-speed="0.8">
    <img src="mountains.png" />
  </div>
  <div class="fg-layer"  data-speed="1.2" data-lag="0.1">
    <img src="foreground.png" />
  </div>
</section>
```

### Refresh on Window Resize

```js
// ScrollSmoother auto-refreshes, but for dynamic content:
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
```

---

## SPA / Framework Integration

```js
// React — cleanup on unmount
useEffect(() => {
  const smoother = ScrollSmoother.create({ smooth: 1, effects: true });
  return () => smoother.kill();
}, []);

// Vue — cleanup on unmount
onMounted(() => { smoother = ScrollSmoother.create({ smooth: 1 }); });
onUnmounted(() => smoother?.kill());
```

---

## Configuration Options Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `smooth` | Number | `0.8` | Seconds for content to catch up to scroll |
| `smoothTouch` | Number/Boolean | `false` | Smoothing on touch devices |
| `effects` | Boolean | `false` | Parse `data-speed` and `data-lag` |
| `normalizeScroll` | Boolean | `false` | Force scroll on JS thread |
| `ignoreMobileResize` | Boolean | `false` | Ignore iOS address bar resize |
| `wrapper` | String/Element | required | The fixed viewport element |
| `content` | String/Element | required | The scrollable content element |
| `onUpdate` | Function | — | Callback on every tick |
| `onStop` | Function | — | Callback when scroll stops |
