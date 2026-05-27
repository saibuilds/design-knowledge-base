# Camera Animation Along Scroll Path

The #1 technique on award-winning sites (chartogne-taillet.com, lusion.co, every Awwwards SOTD with a 3D scene): the camera flies through the scene as the user scrolls.

---

## Core Concept

Map scroll progress `t ∈ [0, 1]` to a position on a 3D spline. The camera glides through your scene like a film camera dolly — the user controls playback speed with their scroll wheel.

---

## 1. CatmullRomCurve3 Path Setup

```js
import * as THREE from 'three'

// Define waypoints — place these in Blender first, then copy coords
const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,   2,  15),   // start — in front of scene
  new THREE.Vector3(-4,  3,   8),   // arc left
  new THREE.Vector3(-6,  4,   0),   // mid — look at hero object
  new THREE.Vector3(-3,  2,  -6),   // pull back right
  new THREE.Vector3( 0,  1, -12),   // end — deep in scene
], false, 'catmullrom', 0.5)  // closed=false, type, tension

// Separate look-at curve — slightly ahead on path
const lookAtPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,   1,   8),
  new THREE.Vector3(-4,  2,   2),
  new THREE.Vector3(-5,  2,  -4),
  new THREE.Vector3(-2,  1, -10),
  new THREE.Vector3( 0,  0, -16),
], false, 'catmullrom', 0.5)

// Visualize path in dev (remove for production)
const points = cameraPath.getPoints(100)
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000 }))
scene.add(line)
```

**Tension** controls how tightly the curve follows waypoints:
- `0.0` = loose, wandering
- `0.5` = balanced (default)
- `1.0` = sharp, passes through each point exactly

---

## 2. Vanilla Three.js + GSAP ScrollTrigger

```bash
npm install gsap
```

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// HTML: needs a tall scroll container
// <div id="scroll-spacer" style="height: 500vh"></div>

let rawProgress = 0
let smoothProgress = 0
const cameraTarget = new THREE.Vector3()

ScrollTrigger.create({
  trigger: '#scroll-spacer',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1.5,    // seconds of lag — higher = dreamier, 0 = instant
  onUpdate: (self) => {
    rawProgress = self.progress
  }
})

function tick() {
  // Secondary lerp on top of scrub for extra smoothness
  smoothProgress += (rawProgress - smoothProgress) * 0.04

  const t = smoothProgress
  const pos = cameraPath.getPoint(t)
  const look = lookAtPath.getPoint(Math.min(t + 0.02, 1))

  camera.position.copy(pos)
  cameraTarget.lerp(look, 0.08)
  camera.lookAt(cameraTarget)

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
```

---

## 3. React Three Fiber + useScroll (Drei)

```bash
npm install @react-three/fiber @react-three/drei three
```

```jsx
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2, 15),
  new THREE.Vector3(-4, 3, 8),
  new THREE.Vector3(-6, 4, 0),
  new THREE.Vector3(-3, 2, -6),
  new THREE.Vector3(0, 1, -12),
])

const lookAtPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1, 8),
  new THREE.Vector3(-4, 2, 2),
  new THREE.Vector3(-5, 2, -4),
  new THREE.Vector3(-2, 1, -10),
  new THREE.Vector3(0, 0, -16),
])

function CameraRig() {
  const scroll = useScroll()   // offset: 0→1 across pages
  const lookTarget = useRef(new THREE.Vector3())

  useFrame((state) => {
    const t = scroll.offset

    const pos = cameraPath.getPoint(t)
    state.camera.position.lerp(pos, 0.05)

    const look = lookAtPath.getPoint(Math.min(t + 0.02, 1))
    lookTarget.current.lerp(look, 0.05)
    state.camera.lookAt(lookTarget.current)
  })

  return null
}

export default function App() {
  return (
    <Canvas>
      <ScrollControls pages={5} damping={0.1}>
        <CameraRig />
        {/* your scene */}
      </ScrollControls>
    </Canvas>
  )
}
```

`ScrollControls` props:
- `pages` — how many viewport-heights of scroll distance
- `damping` — inertia (0 = instant, 1 = very laggy)
- `infinite` — loop scroll

---

## 4. Look-At Target That Also Follows the Path

Two strategies:

**A. Offset ahead on same curve (simplest)**
```js
const lookT = Math.min(t + 0.03, 1)  // 3% ahead
const lookPos = cameraPath.getPoint(lookT)
camera.lookAt(lookPos)
```

**B. Tangent-based (most accurate flight feel)**
```js
const pos = cameraPath.getPoint(t)
const tangent = cameraPath.getTangent(t)  // normalized direction vector
const lookPos = pos.clone().add(tangent.multiplyScalar(2))
camera.position.copy(pos)
camera.lookAt(lookPos)
```

Tangent-based aligns the camera perfectly with the path direction — great for tunnel/tube fly-throughs.

---

## 5. Easing: lerp vs Spring

### Lerp (exponential decay)
```js
// Simple, predictable
smoothPos.lerp(targetPos, 0.05)  // 0.05 = sluggish, 0.15 = snappy

// Delta-time corrected (frame-rate independent)
const alpha = 1 - Math.pow(0.001, deltaTime)  // 0.001 = very smooth
smoothPos.lerp(targetPos, alpha)
```

### Spring (Damped harmonic — more alive)
```js
// Manual spring
const stiffness = 0.08
const damping = 0.85

velocity.add(direction.clone().multiplyScalar(stiffness))
velocity.multiplyScalar(damping)
position.add(velocity)
```

### With react-spring / @react-spring/three
```jsx
import { useSpring } from '@react-spring/three'

const { pos } = useSpring({
  pos: targetPosition.toArray(),
  config: { mass: 1, tension: 170, friction: 26 }
})
```

**Rule of thumb:** `scrub: 1.5` in GSAP + lerp `0.05` in RAF = cinematic feel. Lower scrub + higher lerp = game-like feel.

---

## 6. Adding Scroll Velocity Tilt

React to *how fast* the user scrolls — adds life and feedback:

```js
let lastScrollY = 0
let scrollVelocity = 0

window.addEventListener('scroll', () => {
  scrollVelocity = window.scrollY - lastScrollY
  lastScrollY = window.scrollY
})

// Decay velocity each frame
function tick() {
  scrollVelocity *= 0.9  // decay

  // Tilt camera roll based on velocity
  camera.rotation.z = THREE.MathUtils.lerp(
    camera.rotation.z,
    scrollVelocity * 0.002,
    0.1
  )

  // Chromatic aberration scales with velocity
  const aberrationStrength = Math.abs(scrollVelocity) * 0.001
  chromaticAberrationEffect.offset.set(aberrationStrength, aberrationStrength)

  // ...render
}
```

In R3F:
```jsx
function CameraRig() {
  const scroll = useScroll()
  const lastOffset = useRef(0)

  useFrame((state) => {
    const delta = scroll.offset - lastOffset.current
    lastOffset.current = scroll.offset

    // Roll tilt
    state.camera.rotation.z = THREE.MathUtils.lerp(
      state.camera.rotation.z,
      -delta * 3,
      0.1
    )
  })
}
```

---

## 7. Practical Workflow

1. **Block out path in Blender** — add empty objects as waypoints, note their XYZ
2. **Copy coords** into your `CatmullRomCurve3` array
3. **Visualize** with a `THREE.Line` during dev
4. **Tune tension** — usually 0.3–0.5
5. **Add look-at curve** — offset ahead by 0.02–0.05 on same path or define separately for dramatic pans
6. **Set scrub** — start at 1.5, tune to taste
7. **Add velocity tilt** last — subtle values only (< 0.005 multiplier)

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Camera snaps/jitters | Always lerp, never directly set position |
| Curve goes underground | Check all waypoint Y values are above floor |
| LookAt flips at poles | Use quaternion slerp instead of lookAt near vertical |
| Mobile scroll hijacking | Use `touch-action: none` + custom touch handler |
| Curve too sharp at waypoints | Lower tension or add intermediate waypoints |
