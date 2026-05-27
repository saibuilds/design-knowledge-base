# Scroll-Linked 3D Patterns Reference
_Updated: 2026-05-27_

> Patterns used by Lusion, Active Theory, Unseen Studio, and other top interactive agencies.

---

## 1. R3F ScrollControls (Drei)

```bash
npm install @react-three/drei
```

```jsx
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Wrap your Canvas content
export default function App() {
  return (
    <Canvas>
      <ScrollControls pages={5} damping={0.1}>
        <Scene />
        <Scroll html>
          {/* DOM content that scrolls with the 3D scene */}
          <div style={{ position: 'absolute', top: '100vh', left: '10vw' }}>
            <h1>Section 2</h1>
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}

function Scene() {
  const meshRef = useRef()
  const scroll  = useScroll()

  useFrame(() => {
    const offset = scroll.offset   // 0..1 across all pages
    const range  = scroll.range    // helper: scroll.range(from, distance)

    // Page 0→1: rotate in
    const r0 = scroll.range(0, 1 / 5)
    meshRef.current.rotation.y = r0 * Math.PI * 2

    // Page 1→2: scale up
    const r1 = scroll.range(1 / 5, 1 / 5)
    meshRef.current.scale.setScalar(0.5 + r1 * 1.5)

    // Page 2→3: move camera-relative
    const r2 = scroll.range(2 / 5, 1 / 5)
    meshRef.current.position.x = (r2 - 0.5) * 8
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}
```

---

## 2. GSAP ScrollTrigger + Three.js Camera

```js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Camera moves on scroll — cinematic pull-in
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#scroll-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5,           // smoothness: number = seconds lag
    onUpdate: () => camera.lookAt(0, 0, 0),
  }
})

tl.to(camera.position, { z: 2,   duration: 1 })
  .to(camera.position, { x: 3, y: 1, duration: 1 })
  .to(camera.position, { x: 0, y: 0, z: 8, duration: 1 })
  .to(camera.rotation, { y: Math.PI, duration: 1 }, '<')  // parallel

// Model rotation on scroll
gsap.to(model.rotation, {
  y: Math.PI * 2,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: '+=2000',
    scrub: true,
  }
})
```

---

## 3. Horizontal 3D Scroll Sections

```jsx
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const SECTIONS = 4

function HorizontalScroll() {
  const groupRef = useRef()
  const scroll   = useScroll()

  useFrame(() => {
    // Map vertical scroll to horizontal camera movement
    groupRef.current.position.x = -scroll.offset * (SECTIONS - 1) * 6
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: SECTIONS }, (_, i) => (
        <mesh key={i} position={[i * 6, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={`hsl(${i * 90}, 70%, 60%)`} />
        </mesh>
      ))}
    </group>
  )
}

export function HScene() {
  return (
    <Canvas>
      <ScrollControls pages={SECTIONS} horizontal>
        <HorizontalScroll />
      </ScrollControls>
    </Canvas>
  )
}
```

---

## 4. 3D Parallax Layers

```jsx
// Three planes at different Z depths — scroll moves them at different speeds
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function ParallaxLayer({ z, speed, children }) {
  const ref = useRef()
  const scroll = useScroll()

  useFrame(() => {
    // Deeper layers move slower (parallax effect)
    ref.current.position.y = scroll.offset * speed
  })

  return (
    <group ref={ref} position={[0, 0, z]}>
      {children}
    </group>
  )
}

export function ParallaxScene() {
  return (
    <ScrollControls pages={3}>
      {/* Background — slowest */}
      <ParallaxLayer z={-10} speed={-2}>
        <Stars />
      </ParallaxLayer>

      {/* Midground */}
      <ParallaxLayer z={-4} speed={-4}>
        <Mountains />
      </ParallaxLayer>

      {/* Foreground — fastest */}
      <ParallaxLayer z={0} speed={-8}>
        <HeroMesh />
      </ParallaxLayer>
    </ScrollControls>
  )
}
```

---

## 5. Model Reveal on Scroll (scale from 0, rotate in)

```jsx
import { useScroll } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react'
import * as THREE from 'three'

function ModelReveal() {
  const modelRef = useRef()
  const scroll   = useScroll()
  const gltf     = useLoader(GLTFLoader, '/models/product.glb')

  useFrame(() => {
    // Section 0→0.3: scale from 0 to 1
    const revealProgress = Math.min(1, scroll.offset / 0.3)
    const eased = 1 - Math.pow(1 - revealProgress, 3)   // ease out cubic

    modelRef.current.scale.setScalar(eased)
    modelRef.current.rotation.y = (1 - eased) * -Math.PI + scroll.offset * Math.PI * 2

    // Opacity via material
    modelRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material.opacity = eased
        child.material.transparent = true
      }
    })
  })

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={0}
    />
  )
}
```

---

## 6. Sticky 3D Scene While Text Scrolls

```jsx
// Canvas is position:fixed, DOM text scrolls over it
// The 3D scene reacts to scroll progress

export function StickyScene() {
  const canvasRef = useRef()
  const progress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      progress.current = scrollY / maxScroll
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Fixed canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas>
          <AnimatedScene progress={progress} />
        </Canvas>
      </div>

      {/* Scrollable DOM content (z-index above canvas) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section style={{ height: '100vh' }} />
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '4rem' }}>Section 2</h1>
        </section>
        <section style={{ height: '100vh' }} />
        <section style={{ height: '100vh' }} />
        <section style={{ height: '100vh' }} />
      </div>
    </>
  )
}

function AnimatedScene({ progress }) {
  const meshRef = useRef()
  useFrame(() => {
    const p = progress.current
    meshRef.current.rotation.y = p * Math.PI * 4
    meshRef.current.position.y = Math.sin(p * Math.PI * 2) * 2
  })
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshNormalMaterial />
    </mesh>
  )
}
```

---

## 7. Scroll Velocity — Skew / Stretch Effect

```jsx
// Canvas stretches in scroll direction based on velocity
import { useEffect, useRef } from 'react'

function useScrollVelocity() {
  const velocity = useRef(0)
  const lastY    = useRef(0)

  useEffect(() => {
    let rafId
    const tick = () => {
      velocity.current *= 0.9   // decay
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const onScroll = () => {
      const delta = window.scrollY - lastY.current
      velocity.current = delta
      lastY.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return velocity
}

function VelocityMesh() {
  const meshRef = useRef()
  const velocity = useScrollVelocity()

  useFrame(() => {
    const v = velocity.current
    // Skew the mesh scale on Y based on scroll direction
    meshRef.current.scale.y = 1 + v * 0.002
    meshRef.current.scale.x = 1 - v * 0.001
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshNormalMaterial />
    </mesh>
  )
}
```

---

## 8. Page-Flip 3D Transition

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const PAGES = ['#ff006e', '#8338ec', '#3a86ff', '#06d6a0']

function FlipPage({ index, color }) {
  const ref  = useRef()
  const scroll = useScroll()

  useFrame(() => {
    const pageStart = index / PAGES.length
    const pageEnd   = (index + 1) / PAGES.length
    const t = THREE.MathUtils.clamp(
      (scroll.offset - pageStart) / (1 / PAGES.length),
      0, 1
    )

    // Flip around Y axis
    ref.current.rotation.y = t * -Math.PI
    ref.current.position.z = Math.sin(t * Math.PI) * 2   // arc forward
  })

  return (
    <mesh ref={ref} position={[0, 0, -index * 0.1]}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function FlipBook() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.5} />
      <ScrollControls pages={PAGES.length} damping={0.3}>
        {PAGES.map((color, i) => (
          <FlipPage key={i} index={i} color={color} />
        ))}
      </ScrollControls>
    </Canvas>
  )
}
```

---

## 9. Lerp / Easing Utilities for Scroll

```js
// Linear interpolation — smooth any value toward target
const lerp = (start, end, t) => start + (end - start) * t

// Ease out cubic
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// Map a range to 0..1 (and clamp)
const mapRange = (value, inMin, inMax, outMin = 0, outMax = 1) => {
  const t = (value - inMin) / (inMax - inMin)
  return outMin + Math.max(0, Math.min(1, t)) * (outMax - outMin)
}

// Usage in useFrame:
useFrame(() => {
  const raw    = scroll.offset                           // 0..1
  const section1 = mapRange(raw, 0, 0.25)               // 0→1 in first 25%
  const eased  = easeOutCubic(section1)
  meshRef.current.scale.setScalar(eased * 2)
})
```

---

## 10. Performance Checklist for Scroll-3D

| Issue | Fix |
|-------|-----|
| Janky scrubbing | Use `scrub: 1.5` (GSAP) or `damping={0.1}` (Drei) |
| High CPU | Avoid re-renders — use `useFrame` not `useState` for animations |
| Layout thrash | Read `window.scrollY` only in passive scroll listener |
| Canvas reflow | `position: fixed` canvas, never in DOM flow |
| Too many draw calls | Merge static geo with `BufferGeometryUtils.mergeGeometries()` |
| Heavy models on mobile | Use `useDetectGPU` from `@react-three/drei` to disable effects |

```jsx
import { useDetectGPU } from '@react-three/drei'

function AdaptiveScene() {
  const gpu = useDetectGPU()
  const isLow = gpu.tier < 2

  return (
    <>
      <HeroMesh />
      {!isLow && <ParticleField count={10000} />}
      {!isLow && <PostFX bloom chromatic />}
    </>
  )
}
```
