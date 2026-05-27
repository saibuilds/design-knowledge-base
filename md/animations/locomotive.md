# Locomotive Scroll — Alternative Smooth Scroll

> MIT License. Feature-rich alternative to Lenis. Used by many agency sites.
> Note: Lenis is preferred for new projects (lighter, better GSAP compat). Use Locomotive for parallax data attributes.

## Install
```bash
npm install locomotive-scroll
```

## React Setup
```tsx
import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

export const useLocomotiveScroll = () => {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)

  useEffect(() => {
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
    })
    return () => locomotiveScrollRef.current?.destroy()
  }, [])

  return { scrollRef, locomotiveScroll: locomotiveScrollRef }
}
```

## HTML Data Attributes (the killer feature)
```html
<!-- Basic smooth scroll container -->
<div data-scroll-container>
  
  <!-- Parallax image -->
  <div data-scroll data-scroll-speed="-3">
    <img src="/hero.jpg" />
  </div>

  <!-- Sticky element -->
  <div data-scroll data-scroll-sticky data-scroll-target="#sticky-section">
    Sticky sidebar
  </div>

  <!-- Reveal on enter -->
  <div data-scroll data-scroll-class="is-revealed">
    Reveals when in view
  </div>

  <!-- Horizontal scroll offset -->
  <div data-scroll data-scroll-speed="2" data-scroll-direction="horizontal">
    Moves right as you scroll
  </div>

</div>
```

## With GSAP ScrollTrigger
```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'

locomotiveScroll.on('scroll', ({ scroll }) => {
  ScrollTrigger.update()
})
ScrollTrigger.scrollerProxy('#scroll-container', {
  scrollTop(value) {
    return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  },
  pinType: document.querySelector('#scroll-container').style.transform ? 'transform' : 'fixed'
})
```

## Vs Lenis
| Feature | Lenis | Locomotive |
|---------|-------|------------|
| Weight | ~3KB | ~30KB |
| GSAP compat | Native | Requires proxy |
| Data attributes | No | Yes |
| Maintained | Active | Less active |
| Recommendation | **Use this** | Legacy projects |
