# GSAP + ScrollTrigger — Animation Patterns

> GSAP core + ScrollTrigger are free for most uses (no-charge for "qualifying free/open-source" projects and most commercial projects under the "Standard" license).
> Club GSAP plugins (SplitText, MorphSVG, DrawSVG) require a paid membership — but free alternatives exist.

## Install
```bash
npm install gsap
# Free plugins bundled with gsap:
# ScrollTrigger, ScrollSmoother, Observer, CustomEase, Flip, MotionPathPlugin
```

## Setup (always use with Lenis)
```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

## Core Patterns

### Scroll Parallax
```js
gsap.to('.hero-bg', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
})
```

### Stagger Reveal on Scroll
```js
gsap.from('.card', {
  opacity: 0, y: 60, stagger: 0.15, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.cards-section', start: 'top 80%' }
})
```

### Horizontal Scroll Section
```js
const sections = gsap.utils.toArray('.panel')
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: { trigger: '.horizontal-wrap', pin: true, scrub: 1, snap: 1 / (sections.length - 1), end: () => '+=' + document.querySelector('.horizontal-wrap').offsetWidth }
})
```

### Pin Section While Animating
```js
gsap.from('.feature-text', {
  opacity: 0, x: -100,
  scrollTrigger: { trigger: '.feature-section', start: 'top center', end: 'bottom center', pin: '.feature-sticky', scrub: 1 }
})
```

### Text Character Reveal (no SplitText needed)
```js
// Manual split
const text = document.querySelector('.hero-title')
text.innerHTML = text.textContent.replace(/\S/g, '<span class="char">$&</span>')
gsap.from('.char', {
  opacity: 0, y: 80, rotateX: -90, stagger: 0.02, duration: 0.8, ease: 'back.out(1.7)',
  scrollTrigger: { trigger: text, start: 'top 80%' }
})
```

### Word-by-word reveal
```js
const words = document.querySelector('.big-text').textContent.split(' ')
document.querySelector('.big-text').innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ')
gsap.from('.word', {
  opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.big-text', start: 'top 85%' }
})
```

### Counter Animation
```js
const counter = { value: 0 }
gsap.to(counter, {
  value: 2847, duration: 2, ease: 'power1.out',
  onUpdate: () => document.querySelector('.count').textContent = Math.round(counter.value).toLocaleString(),
  scrollTrigger: { trigger: '.stats', start: 'top 80%', once: true }
})
```

### SVG Path Draw-on
```js
// Works without DrawSVG plugin
const path = document.querySelector('path')
const length = path.getTotalLength()
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
gsap.to(path, {
  strokeDashoffset: 0, duration: 2, ease: 'power2.inOut',
  scrollTrigger: { trigger: path, start: 'top 70%' }
})
```

### GSAP Timeline (orchestrated entrance)
```js
const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top 80%' } })
tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.4 })
  .from('.hero-title', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
  .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
  .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1 }, '-=0.3')
  .from('.hero-image', { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' }, '-=0.6')
```

### Image Reveal (mask wipe)
```js
gsap.set('.image-wrap', { overflow: 'hidden' })
gsap.from('.image-wrap img', { scale: 1.3, duration: 1.2, ease: 'power2.out',
  scrollTrigger: { trigger: '.image-wrap', start: 'top 80%' }
})
gsap.from('.image-wrap', { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.image-wrap', start: 'top 80%' }
})
```

### Scroll-linked progress bar
```js
gsap.to('.progress-bar', {
  scaleX: 1, ease: 'none', transformOrigin: 'left center',
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 }
})
```

## React Hook
```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (animation: (el: HTMLElement) => void) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => animation(ref.current!), ref)
    return () => ctx.revert()
  }, [])
  return ref
}
```

## Free Plugins Bundled
- ScrollTrigger — scroll-based animations
- ScrollSmoother — smoother scroll (needs wrapper setup)
- Observer — advanced pointer/scroll tracking
- CustomEase — create any easing curve
- Flip — layout-to-layout morphing animations
- MotionPathPlugin — animate along SVG path
- TextPlugin — type text into element
- CSSRulePlugin — animate CSS pseudo-elements
