# Immersive 3D Scroll — Lusion-Style Patterns

> The techniques used by lusion.co, active-theory.net, chartogne-taillet.com, and other Awwwards winners.

## Pattern 1: Camera Path on Scroll (most impressive)
```tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Define camera path as Catmull-Rom curve
const CAMERA_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(5, 2, 5),
  new THREE.Vector3(0, 4, 0),
  new THREE.Vector3(-5, 2, -5),
  new THREE.Vector3(0, 0, -10),
], false, 'catmullrom', 0.5)

const LOOK_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(2, 0, 0),
  new THREE.Vector3(0, 2, -5),
  new THREE.Vector3(-2, 0, -8),
  new THREE.Vector3(0, 0, -15),
])

function CameraRig() {
  const scroll = useScroll()
  const target = useRef(new THREE.Vector3())
  
  useFrame((state) => {
    const t = scroll.offset  // 0 to 1
    const pos = CAMERA_PATH.getPoint(t)
    const look = LOOK_PATH.getPoint(t)
    
    // Smooth lerp (not snapping)
    state.camera.position.lerp(pos, 0.05)
    target.current.lerp(look, 0.05)
    state.camera.lookAt(target.current)
  })
  return null
}

export function ScrollScene() {
  return (
    <Canvas>
      <ScrollControls pages={5} damping={0.3}>
        <CameraRig />
        {/* Your 3D objects placed along the path */}
        <mesh position={[5, 2, 3]}><boxGeometry /><meshStandardMaterial /></mesh>
        <mesh position={[-3, 0, -2]}><sphereGeometry /><meshStandardMaterial /></mesh>
      </ScrollControls>
    </Canvas>
  )
}
```

## Pattern 2: Section-based 3D (scenes change per section)
```tsx
function SceneManager() {
  const scroll = useScroll()
  const [scene, setScene] = useState(0)
  
  useFrame(() => {
    const s = Math.floor(scroll.offset * 5)  // 5 scenes
    if (s !== scene) setScene(s)
  })
  
  return (
    <>
      <AnimatePresence mode="wait">
        {scene === 0 && <HeroScene key="hero" />}
        {scene === 1 && <KitchenScene key="kitchen" />}
        {scene === 2 && <BathroomScene key="bathroom" />}
      </AnimatePresence>
    </>
  )
}
```

## Pattern 3: Parallax layers (simplest, most robust)
```tsx
function ParallaxLayers() {
  const scroll = useScroll()
  const bgRef = useRef()
  const mgRef = useRef()
  const fgRef = useRef()
  
  useFrame(() => {
    const y = scroll.offset * 50
    // Background moves slowest
    bgRef.current.position.y = -y * 0.1
    // Midground medium
    mgRef.current.position.y = -y * 0.3
    // Foreground fastest
    fgRef.current.position.y = -y * 0.8
  })
  
  return (
    <>
      <group ref={bgRef}>
        <Stars radius={100} depth={50} count={5000} />
      </group>
      <group ref={mgRef}>
        <FloatingGeometry />
      </group>
      <group ref={fgRef}>
        <ForegroundObjects />
      </group>
    </>
  )
}
```

## Pattern 4: Scroll velocity → distortion effect
```tsx
import { useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'

// Canvas distorts based on scroll speed
export function VelocityCanvas() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useTransform(velocity, [-2000, 0, 2000], [-8, 0, 8])
  const smoothSkew = useSpring(skew, { mass: 3, stiffness: 400, damping: 90 })
  
  return (
    <motion.div style={{ skewY: smoothSkew }} className="w-full h-screen">
      <Canvas>...</Canvas>
    </motion.div>
  )
}
```

## Pattern 5: 3D text that builds on scroll
```tsx
function ScrollText() {
  const ref = useRef()
  const scroll = useScroll()
  
  useFrame(() => {
    // Letters appear as you scroll
    const progress = scroll.range(0, 0.5)  // active from 0% to 50% of scroll
    if (ref.current) {
      ref.current.children.forEach((letter, i) => {
        const letterProgress = Math.max(0, Math.min(1, (progress - i * 0.05) * 5))
        letter.position.y = (1 - letterProgress) * -3
        letter.material.opacity = letterProgress
      })
    }
  })
  
  return (
    <group ref={ref}>
      {['M','O','T','T','A'].map((char, i) => (
        <Text3D key={i} position={[i * 1.2 - 2.5, 0, 0]} font="/fonts/inter_bold.json">
          {char}
          <meshStandardMaterial transparent color="#f59e0b" />
        </Text3D>
      ))}
    </group>
  )
}
```

## Pattern 6: Fullscreen canvas + HTML overlay
```tsx
// Canvas is fixed, content scrolls over it
export function FullscreenSetup() {
  return (
    <>
      {/* Fixed 3D canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ScrollControls pages={4} damping={0.25}>
            <CameraRig />
            <Lights />
            <Scene3D />
          </ScrollControls>
        </Canvas>
      </div>
      
      {/* Scrollable HTML content on top */}
      <div className="relative z-10 pointer-events-none">
        {/* First section: transparent (shows 3D) */}
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-9xl font-black text-white pointer-events-auto">MOTTA</h1>
        </section>
        {/* Subsequent sections: add bg when needed */}
        <section className="h-screen bg-zinc-950/80 backdrop-blur-sm flex items-center">
          <div className="pointer-events-auto">Content</div>
        </section>
      </div>
    </>
  )
}
```

## Pattern 7: Loading screen → reveal
```tsx
function Loader() {
  const { progress, active } = useProgress()
  return (
    <Html center>
      <div className={`fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="text-white font-mono text-sm mb-4">{Math.round(progress)}%</div>
        <div className="w-48 h-0.5 bg-zinc-800">
          <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Html>
  )
}

<Canvas>
  <Suspense fallback={<Loader />}>
    <Scene />
  </Suspense>
</Canvas>
```

## GSAP + Three.js (no R3F) scroll-camera
```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Animate camera on scroll
gsap.to(camera.position, {
  x: 5, y: 2, z: -3,
  scrollTrigger: { trigger: '.section-2', start: 'top bottom', end: 'top top', scrub: 2 },
  onUpdate: () => camera.lookAt(0, 0, 0)
})

// Rotate scene on scroll
gsap.to(scene.rotation, {
  y: Math.PI * 2,
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
})
```
