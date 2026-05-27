# Lusion.co — Agency Reference

> Studio known for immersive WebGL scroll experiences. Benchmark for creative agency sites.
> URL: https://lusion.co

## Key Patterns

### Full-screen WebGL canvas behind content
```tsx
// Canvas fills viewport, HTML overlaid with mix-blend-mode or pointer-events-none
<div className="fixed inset-0 z-0">
  <Canvas>...</Canvas>
</div>
<div className="relative z-10 pointer-events-none">
  <h1>Text over 3D</h1>
</div>
```

### Scroll-hijacked sections
```tsx
// Lock scroll, play animation, then release
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    pin: true,
    scrub: 1,
    start: 'top top',
    end: '+=200%',
  }
})
tl.to('.mesh', { z: -50 })
  .to('.text', { opacity: 1, y: 0 }, '-=0.5')
```

### Fluid cursor follower
```tsx
import { useEffect, useRef } from 'react'
export function FluidCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    let raf: number
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b
    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.08)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.08)
      if (cursor.current) {
        cursor.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])
  return <div ref={cursor} className="fixed w-8 h-8 rounded-full border border-white/50 z-[9999] pointer-events-none mix-blend-difference" />
}
```

### Noise-based vertex displacement (GLSL)
```glsl
// Fragment shader — organic movement
uniform float uTime;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
// ... simplex noise
void main() {
  vec2 uv = vUv;
  float noise = snoise(vec3(uv * 3.0, uTime * 0.5));
  gl_FragColor = vec4(mix(vec3(0.1, 0.0, 0.3), vec3(0.9, 0.5, 0.1), noise), 1.0);
}
```

### Text appear as scene loads
```tsx
const tl = gsap.timeline({ delay: 0.5 })
tl.from('.nav-item', { opacity: 0, y: -20, stagger: 0.08, duration: 0.6, ease: 'power2.out' })
  .from('.hero-title span', { opacity: 0, y: 80, rotateX: -45, stagger: 0.04, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.3')
  .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
```

## Lusion Design System
- Background: #0a0a0a (near black)
- Accent: warm whites + occasional amber/purple
- Typography: very large (8xl-9xl), tight letter-spacing
- Motion: everything lerps, nothing snaps
- Imagery: WebGL renders only, no stock photos
