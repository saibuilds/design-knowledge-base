# Advanced Animation & 3D Libraries — React/TSX Reference

---

## React Three Fiber + Drei

> npm: `@react-three/fiber` `@react-three/drei` `three` `@types/three`
> URL: https://docs.pmnd.rs/react-three-fiber

Declarative Three.js in React — full scene graph as JSX with hooks.

### Basic 3D Scene Setup

```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]} // pixel ratio capped at 2
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />

      {/* Your 3D content goes here */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
    </Canvas>
  )
}
```

### Floating Animated Sphere with MeshDistortMaterial

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Called every frame — mutate ref directly, never setState
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.3
    meshRef.current.rotation.x = clock.elapsedTime * 0.2
    meshRef.current.rotation.z = clock.elapsedTime * 0.1
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.4}      // distortion strength
        speed={2}           // animation speed
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="sunset" />
      <FloatingSphere />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### Particle System with Points

```tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 5000 }) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10  // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10  // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10  // z
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a78bfa"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function ParticleScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Particles count={8000} />
    </Canvas>
  )
}
```

### OrbitControls + Environment Setup

```tsx
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PresentationControls,
} from '@react-three/drei'

export default function ShowcaseScene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      {/* HDR environment for realistic reflections */}
      <Environment preset="warehouse" background={false} />

      {/* Subtle ambient */}
      <ambientLight intensity={0.3} />

      {/* Key light */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Drag-to-rotate without full orbit */}
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <mesh castShadow>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
          <meshStandardMaterial color="#6d28d9" roughness={0.1} metalness={0.9} />
        </mesh>
      </PresentationControls>

      <OrbitControls makeDefault />
    </Canvas>
  )
}
```

---

## GSAP + ScrollTrigger in React

> npm: `gsap` `@gsap/react`
> URL: https://gsap.com/docs/v3/Plugins/ScrollTrigger

The industry standard animation engine — precise, performant, battle-tested.

### useGSAP Hook Setup

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once — do this at module level
gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AnimatedBox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  // useGSAP handles cleanup automatically on unmount
  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: 'power3.inOut',
    })
  }, { scope: containerRef }) // scope keeps selectors scoped to container

  return (
    <div ref={containerRef} className="relative h-screen">
      <div
        ref={boxRef}
        className="w-24 h-24 bg-violet-600 rounded-xl"
      />
    </div>
  )
}
```

### ScrollTrigger Pin + Scrub Animation

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PinnedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Pin the section while scrubbing the animation
    gsap.to(panelRef.current, {
      xPercent: -300, // slides 3 panels worth of content
      ease: 'none',   // linear for scrub
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,              // pin the element in place
        scrub: 1,               // 1s lag — smoother than scrub: true
        snap: 1 / 3,            // snap to each panel
        end: () => `+=${panelRef.current?.offsetWidth ?? 0}`,
        markers: false,         // set true to debug
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="overflow-hidden h-screen">
      <div ref={panelRef} className="flex h-full w-[400vw]">
        {['Panel 1', 'Panel 2', 'Panel 3', 'Panel 4'].map((label) => (
          <div key={label} className="w-screen h-full flex items-center justify-center text-4xl">
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}
```

### Text Reveal on Scroll

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText' // Club GreenSock plugin

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function TextReveal() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!headingRef.current) return

    // Split heading into individual lines
    const split = new SplitText(headingRef.current, { type: 'lines' })

    // Wrap each line in an overflow:hidden container to mask the reveal
    new SplitText(headingRef.current, { type: 'lines', linesClass: 'overflow-hidden' })

    gsap.fromTo(
      split.lines,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => split.revert() // cleanup
  }, {})

  return (
    <h1 ref={headingRef} className="text-6xl font-bold leading-tight max-w-2xl">
      Building the future of digital experiences
    </h1>
  )
}
```

### Stagger Animation Timeline

```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StaggerCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card', containerRef.current)

    // Build a timeline for full control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: {
          amount: 0.6,   // total stagger spread in seconds
          from: 'start',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6 p-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card bg-white rounded-2xl p-8 shadow-lg">
          Card {i + 1}
        </div>
      ))}
    </div>
  )
}
```

---

## Lenis Smooth Scroll + React

> npm: `lenis` `@studio-freight/lenis`
> URL: https://lenis.darkroom.engineering

Butter-smooth native-feeling scroll with precise control and GSAP integration.

### Provider Setup

```tsx
// lenis-provider.tsx
'use client'
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () => useContext(LenisContext)
```

```tsx
// app.tsx — wrap your app
import { LenisProvider } from './lenis-provider'

export default function App() {
  return (
    <LenisProvider>
      <main>{/* your pages */}</main>
    </LenisProvider>
  )
}
```

### useScroll with Lenis

```tsx
import { useEffect, useState } from 'react'
import { useLenis } from './lenis-provider'

export function useScrollProgress() {
  const lenis = useLenis()
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  useEffect(() => {
    if (!lenis) return

    const unsubscribe = lenis.on('scroll', ({ progress: p, velocity: v, direction: d }) => {
      setProgress(p)           // 0 → 1
      setVelocity(Math.abs(v)) // scroll speed
      setDirection(d as 1 | -1)
    })

    return unsubscribe
  }, [lenis])

  return { progress, velocity, direction }
}

// Usage — e.g. progress bar
export function ScrollProgressBar() {
  const { progress } = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 h-[3px] bg-violet-600 z-50 transition-none"
      style={{ width: `${progress * 100}%` }}
    />
  )
}
```

### Parallax Section

```tsx
import { useRef, useEffect, useState } from 'react'
import { useLenis } from './lenis-provider'

function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (!lenis) return

    const unsubscribe = lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffsetY(center * speed)
    })

    return unsubscribe
  }, [lenis, speed])

  return { ref, offsetY }
}

export function ParallaxHero() {
  const { ref, offsetY } = useParallax(0.4)

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background moves slower than scroll — classic parallax */}
      <div
        ref={ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform',
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-8xl font-bold text-white">Hello World</h1>
      </div>
    </section>
  )
}
```

---

## Framer Motion Advanced Patterns

> npm: `framer-motion`
> URL: https://www.framer.com/motion

Production-grade animation for React with the most ergonomic API available.

### useScroll + useTransform Parallax

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxCard() {
  const ref = useRef<HTMLDivElement>(null)

  // Track scroll progress within this element's viewport range
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // element enter → element leave
  })

  // Map scroll progress to transform values
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center">
      <motion.div
        style={{ y, opacity, scale }}
        className="w-96 h-64 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl"
      >
        <p className="text-white text-2xl p-8">Parallax Card</p>
      </motion.div>
    </div>
  )
}
```

### LayoutGroup Shared Layout Animation

```tsx
import { useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

const TABS = ['Design', 'Development', 'Strategy']

export function AnimatedTabs() {
  const [active, setActive] = useState('Design')

  return (
    // LayoutGroup coordinates layout animations across children
    <LayoutGroup id="tabs">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="relative px-4 py-2 text-sm font-medium z-10"
          >
            {active === tab && (
              // layoutId links this element across re-renders — Framer animates it
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  )
}
```

### AnimatePresence Page Transitions

```tsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, x: 40, filter: 'blur(8px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit:    { opacity: 0, x: -40, filter: 'blur(8px)' },
}

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.4,
}

const PAGES = ['Home', 'About', 'Work']

export function PageTransitions() {
  const [page, setPage] = useState('Home')

  return (
    <div className="relative overflow-hidden h-screen">
      {/* mode="wait" — exits before entering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="absolute inset-0 flex items-center justify-center text-5xl font-bold"
        >
          {page}
        </motion.div>
      </AnimatePresence>

      <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {PAGES.map((p) => (
          <button key={p} onClick={() => setPage(p)}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {p}
          </button>
        ))}
      </nav>
    </div>
  )
}
```

### Drag with Momentum (useDragControls)

```tsx
import { useRef } from 'react'
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion'

export function DraggableCard() {
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Spring-backed motion values for smooth momentum
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  return (
    <div
      ref={constraintsRef}
      className="relative w-full h-[600px] bg-gray-50 rounded-3xl overflow-hidden"
    >
      {/* Drag handle — pointer events here initiate drag */}
      <div
        className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => dragControls.start(e)}
      />

      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.1}        // slight bounce at constraints
        dragMomentum={true}      // keeps moving after release
        whileDrag={{ scale: 1.05, boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
        whileHover={{ scale: 1.02 }}
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-64 h-40 bg-gradient-to-br from-violet-600 to-indigo-600
                   rounded-2xl cursor-grab active:cursor-grabbing"
      >
        <p className="text-white p-6 font-semibold">Drag me</p>
      </motion.div>
    </div>
  )
}
```

---

## Theatre.js

> npm: `@theatre/core` `@theatre/studio` `@theatre/r3f`
> URL: https://www.theatrejs.com

A visual animation editor for the browser — animate anything with a timeline GUI then ship to production.

### Studio Setup

```tsx
// theatre-init.ts — import once, at the top of your entry file
import studio from '@theatre/studio'
import { getProject } from '@theatre/core'
import projectState from './project-state.json' // exported from studio

// Only load studio in development
if (import.meta.env.DEV) {
  studio.initialize()
}

// Create or load a project (with saved state for production)
export const project = getProject(
  'My Project',
  { state: import.meta.env.DEV ? undefined : projectState }
)

export const mainSheet = project.sheet('Main Scene')
```

### Animating a Div with Theatre

```tsx
import { useEffect, useRef } from 'react'
import { types } from '@theatre/core'
import { mainSheet } from './theatre-init'

export function TheatreBox() {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!divRef.current) return

    // Declare an object with animatable properties
    const obj = mainSheet.object('Box', {
      x: types.number(0, { range: [-500, 500] }),
      y: types.number(0, { range: [-300, 300] }),
      rotation: types.number(0, { range: [-360, 360] }),
      opacity: types.number(1, { range: [0, 1] }),
      scale: types.number(1, { range: [0, 3] }),
    })

    // Subscribe to value changes — fired on every animation frame
    const unsubscribe = obj.onValuesChange(({ x, y, rotation, opacity, scale }) => {
      if (!divRef.current) return
      divRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
      divRef.current.style.opacity = String(opacity)
    })

    return unsubscribe
  }, [])

  return (
    <div
      ref={divRef}
      className="w-32 h-32 bg-violet-600 rounded-2xl"
      style={{ willChange: 'transform, opacity' }}
    />
  )
}
```

### Export to Production

```tsx
// Step 1: Build your animation in the Theatre.js Studio GUI
// Step 2: Export state via Studio > Export

// Step 3: Save the JSON and reference it
import projectState from './project-state.json'
import { getProject } from '@theatre/core'

// In production — NO studio import, uses baked state
const project = getProject('My Project', { state: projectState })
const sheet = project.sheet('Main Scene')

// Play the sequence programmatically
export function playAnimation() {
  sheet.sequence.play({
    iterationCount: 1,     // Infinity for loop
    direction: 'normal',   // 'reverse' | 'alternate'
    rate: 1,               // playback speed
  })
}

// Or scrub it (e.g. tied to scroll)
export function scrubToProgress(progress: number) {
  // progress: 0 → 1
  const duration = sheet.sequence.duration
  sheet.sequence.position = progress * duration
}
```

---

## Rive React

> npm: `@rive-app/react-canvas`
> URL: https://rive.app/docs/runtimes/overview/react

Interactive vector animations with built-in state machines — replaces Lottie for complex interactivity.

### Loading a .riv File

```tsx
import { useRive } from '@rive-app/react-canvas'

export function RiveAnimation() {
  const { RiveComponent, rive } = useRive({
    src: '/animations/hero.riv',
    artboard: 'Main',          // artboard name from Rive editor
    stateMachines: 'State Machine 1',
    autoplay: true,
    onLoad: () => {
      console.log('Rive loaded')
    },
  })

  return (
    <div className="w-[600px] h-[400px]">
      <RiveComponent className="w-full h-full" />
    </div>
  )
}
```

### State Machine Input Control

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export function InteractiveCharacter() {
  const { RiveComponent, rive } = useRive({
    src: '/animations/character.riv',
    stateMachines: 'CharacterSM',
    autoplay: true,
  })

  // Get references to state machine inputs by name
  const isRunning = useStateMachineInput(rive, 'CharacterSM', 'isRunning', false)
  const speedInput = useStateMachineInput(rive, 'CharacterSM', 'speed', 0)
  const jumpTrigger = useStateMachineInput(rive, 'CharacterSM', 'jump') // trigger type

  return (
    <div>
      <RiveComponent className="w-[400px] h-[400px]" />

      <div className="flex gap-4 mt-4">
        <button onClick={() => {
          if (isRunning) isRunning.value = !isRunning.value
        }}>
          Toggle Run
        </button>

        <input
          type="range" min={0} max={10}
          onChange={(e) => {
            if (speedInput) speedInput.value = Number(e.target.value)
          }}
        />

        <button onClick={() => jumpTrigger?.fire()}>
          Jump
        </button>
      </div>
    </div>
  )
}
```

### Hover Interaction

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export function HoverButton() {
  const { RiveComponent, rive } = useRive({
    src: '/animations/button.riv',
    stateMachines: 'ButtonSM',
    autoplay: true,
  })

  const isHovered = useStateMachineInput(rive, 'ButtonSM', 'isHovered', false)
  const isPressed = useStateMachineInput(rive, 'ButtonSM', 'isPressed', false)

  return (
    <div
      className="cursor-pointer w-48 h-16"
      onMouseEnter={() => { if (isHovered) isHovered.value = true }}
      onMouseLeave={() => {
        if (isHovered) isHovered.value = false
        if (isPressed) isPressed.value = false
      }}
      onMouseDown={() => { if (isPressed) isPressed.value = true }}
      onMouseUp={() => { if (isPressed) isPressed.value = false }}
    >
      <RiveComponent className="w-full h-full" />
    </div>
  )
}
```

---

## Motion Canvas

> npm: `@motion-canvas/core` `@motion-canvas/2d` `@motion-canvas/vite-plugin`
> URL: https://motioncanvas.io

Code-first animation tool for creating precise programmatic video animations — think Manim for JavaScript.

### Basic Scene

```tsx
// src/scenes/intro.tsx
import { makeScene2D } from '@motion-canvas/2d'
import { createRef, waitFor, all } from '@motion-canvas/core'
import { Circle, Rect, Txt } from '@motion-canvas/2d/lib/components'

export default makeScene2D(function* (view) {
  // createRef is like useRef but for generator-based animation
  const circle = createRef<Circle>()
  const label  = createRef<Txt>()

  // Add elements to the scene
  view.add(
    <>
      <Circle
        ref={circle}
        width={0}      // start at 0, animate in
        height={0}
        fill="#7c3aed"
      />
      <Txt
        ref={label}
        text="Hello World"
        fontSize={48}
        fill="white"
        opacity={0}
      />
    </>
  )

  // Generator-based timeline — yield suspends until animation completes
  yield* circle().size(200, 1)           // animate size to 200 over 1s
  yield* label().opacity(1, 0.5)         // fade in label
  yield* waitFor(1)                      // hold for 1s
  yield* all(                            // run simultaneously
    circle().size(0, 0.5),
    label().opacity(0, 0.5),
  )
})
```

### Animating Shapes

```tsx
// src/scenes/shapes.tsx
import { makeScene2D } from '@motion-canvas/2d'
import { createRef, sequence, loop, easeInOutCubic } from '@motion-canvas/core'
import { Rect } from '@motion-canvas/2d/lib/components'

export default makeScene2D(function* (view) {
  const rects = Array.from({ length: 5 }, () => createRef<Rect>())

  // Place 5 bars
  view.add(
    <>
      {rects.map((ref, i) => (
        <Rect
          key={i}
          ref={ref}
          x={(i - 2) * 120}
          width={80}
          height={0}          // start collapsed
          fill={`hsl(${260 + i * 15}, 70%, 60%)`}
          radius={8}
        />
      ))}
    </>
  )

  // sequence() staggers each animation by 0.1s
  yield* sequence(
    0.1,
    ...rects.map((ref) =>
      ref().height(200, 0.6, easeInOutCubic)
    )
  )

  // Loop a bounce animation forever
  yield* loop(Infinity, () =>
    sequence(
      0.08,
      ...rects.map((ref) =>
        ref().y(-30, 0.3).to(0, 0.3)
      )
    )
  )
})
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import motionCanvas from '@motion-canvas/vite-plugin'

export default defineConfig({
  plugins: [motionCanvas()],
})
```

---

## Remotion

> npm: `remotion` `@remotion/player` `@remotion/cli`
> URL: https://www.remotion.dev

Create videos programmatically using React — render to MP4 or stream via Lambda.

### Sequence Composition

```tsx
// src/Root.tsx
import { Composition } from 'remotion'
import { TitleCard } from './TitleCard'
import { LogoAnimation } from './LogoAnimation'

export const RemotionRoot = () => (
  <>
    <Composition
      id="TitleCard"
      component={TitleCard}
      durationInFrames={150} // 5 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: 'Hello World' }}
    />
    <Composition
      id="FullVideo"
      component={FullVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
)

// Composing sequences — like video editing in code
function FullVideo() {
  return (
    <>
      {/* TitleCard plays from frame 0 to 150 */}
      <Sequence from={0} durationInFrames={150}>
        <TitleCard title="Opening" />
      </Sequence>

      {/* LogoAnimation plays from frame 100 — overlaps by 50 frames */}
      <Sequence from={100} durationInFrames={200}>
        <LogoAnimation />
      </Sequence>
    </>
  )
}
```

### Animated Title Card

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

interface TitleCardProps {
  title: string
  subtitle?: string
}

export function TitleCard({ title, subtitle = '' }: TitleCardProps) {
  const frame = useCurrentFrame()           // current frame number
  const { durationInFrames, fps } = useVideoConfig()

  // Fade in over first 20 frames, fade out over last 20 frames
  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Slide up on entry
  const translateY = interpolate(
    frame,
    [0, 30],
    [40, 0],
    { extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 4) }
  )

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <h1 style={{
          color: 'white',
          fontSize: 96,
          fontWeight: 700,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#a78bfa', fontSize: 40, textAlign: 'center', marginTop: 16 }}>
            {subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  )
}
```

### Spring Animations

```tsx
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export function SpringDemo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // spring() is frame-based — no duration, physically simulated
  const scale = spring({
    frame,
    fps,
    config: {
      stiffness: 200,
      damping: 15,
      mass: 1,
    },
    from: 0,
    to: 1,
  })

  const rotation = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 20 },
    from: -180,
    to: 0,
    delay: 10, // delay in frames
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f0a1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          borderRadius: 32,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
      />
    </AbsoluteFill>
  )
}
```

```bash
# Render to MP4
npx remotion render src/index.ts TitleCard out/title.mp4

# Preview in browser
npx remotion preview

# Render via Lambda
npx remotion lambda render
```

---

*All code targets React 18+, TypeScript 5+. Install peer dependencies as needed per library.*
