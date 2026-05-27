# Lenis — Smooth Scroll

> MIT License. Industry standard for premium sites.

## Install
```bash
npm install lenis
```

## Setup with GSAP (standard pattern)
```ts
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

## React Hook
```tsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove((time) => lenis.raf(time * 1000)) }
  }, [])
}
```

## With Framer Motion
```tsx
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function Layout({ children }) {
  const lenisRef = useRef<Lenis>()
  useEffect(() => {
    lenisRef.current = new Lenis({ duration: 1.2 })
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenisRef.current?.destroy()
  }, [])
  return <>{children}</>
}
```

## Options
```ts
new Lenis({
  duration: 1.2,             // scroll animation duration
  easing: (t) => ...,        // custom easing function
  orientation: 'vertical',   // 'vertical' | 'horizontal'
  smoothWheel: true,         // smooth on trackpad/mouse wheel
  wheelMultiplier: 1,        // wheel speed multiplier
  touchMultiplier: 2,        // touch speed multiplier
  infinite: false,           // infinite scroll
})
```

## Stop/Start for modals
```ts
// Stop scrolling when modal opens
lenis.stop()
// Resume
lenis.start()

// Or: scroll to element
lenis.scrollTo('#section', { offset: -100, duration: 1.5 })
```
