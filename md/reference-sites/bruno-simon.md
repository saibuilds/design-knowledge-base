# Bruno Simon — Site Architecture Breakdown

Source: [bruno-simon.com](https://bruno-simon.com) | [GitHub folio-2019](https://github.com/brunosimon/folio-2019) (MIT, 4.7k stars)

Stack confirmed from `package.json`:
- `three@0.164.1` — 3D rendering (WebGL + WebGPU via TSL)
- `cannon@0.6.2` — rigid body physics
- `gsap@3.12.5` — camera animation, UI transitions
- `howler@2.2.4` — positional audio
- `dat.gui@0.7.9` — debug panel
- `vite@5.2.11` — bundler
- `vite-plugin-glsl` — import `.glsl` files as strings

---

## How the Site Works

A top-down 3D world rendered with an orthographic-ish perspective camera. The user drives a car around a map. Each section of the map is a "project" or "about" zone — drive into it to reveal content. No scroll. No React. Pure vanilla Three.js + physics.

Navigation = spatial: you literally drive to different areas.

---

## Architecture: Module System

```
Application.js        ← singleton, bootstraps everything
├── Time.js           ← requestAnimationFrame, delta, elapsed
├── Sizes.js          ← viewport dimensions, resize events
├── Resources.js      ← LoadingManager, GLTFLoader, DRACOLoader
├── Camera.js         ← perspective camera, easing, orbit controls
├── Renderer.js       ← WebGLRenderer, pixel ratio, shadows
├── Passes.js         ← EffectComposer, blur passes, glow
└── World/
    ├── Physics.js    ← cannon.js world + debug renderer
    ├── Car.js        ← chassis body + wheel constraints + controls
    ├── Terrain.js    ← heightfield collision mesh
    ├── Tiles.js      ← GLTF tile chunks, lazy load on proximity
    ├── Projects.js   ← project zones, raycasting for hover
    └── ThreejsJourney.js  ← promotional integration
```

### Application.js constructor (actual code structure)
```js
constructor(options) {
  this.$canvas = options.$canvas
  this.time      = new Time()
  this.sizes     = new Sizes()
  this.resources = new Resources()

  this.setConfig()
  this.setDebug()
  this.setRenderer()
  this.setCamera()
  this.setPasses()
  this.setWorld()
  this.setTitle()
  this.setThreejsJourney()
}
```

Every class receives `{ time, sizes, resources, renderer, debug, config }` via options — dependency injection without a framework.

---

## Camera System

No path-following. Orbital camera that tracks the car chassis:

```js
// Camera.js — simplified
export default class Camera {
  constructor(options) {
    this.time    = options.time
    this.sizes   = options.sizes
    this.debug   = options.debug
    this.easing  = 0.15

    this.target      = new THREE.Vector3()  // desired position
    this.targetEased = new THREE.Vector3()  // current smoothed position

    this.setInstance()
    this.setAngle()
  }

  setAngle() {
    this.angle = {
      default:  { spherical: new THREE.Spherical(/* ... */) },
      projects: { spherical: new THREE.Spherical(/* ... */) },
    }
    // Transition between angles with GSAP
    this.angle.set = (name) => {
      gsap.to(this.instance.position, {
        ...this.angle[name].position,
        duration: 2,
        ease: 'power2.inOut'
      })
    }
  }

  // Called every frame from Application tick
  update() {
    // Follow car position
    this.target.copy(world.physics.car.chassis.position)
    // Smooth follow
    this.targetEased.x += (this.target.x - this.targetEased.x) * this.easing
    this.targetEased.z += (this.target.z - this.targetEased.z) * this.easing

    // Position camera relative to target
    this.instance.position.copy(this.targetEased).add(this.offset)
    this.instance.lookAt(this.targetEased)
  }
}
```

---

## Car Physics (cannon.js)

```js
// Physics.js + Car.js — how the car works
import * as CANNON from 'cannon'  // note: old cannon, not cannon-es

// 1. Physics world
this.world = new CANNON.World()
this.world.gravity.set(0, -9.82, 0)
this.world.broadphase = new CANNON.SAPBroadphase(this.world)
this.world.defaultContactMaterial.friction = 0.3

// 2. Car chassis — box shape
const chassisShape = new CANNON.Box(new CANNON.Vec3(0.85, 0.3, 1.9))
this.chassis = new CANNON.Body({ mass: 150 })
this.chassis.addShape(chassisShape, new CANNON.Vec3(0, 0.3, 0))
this.chassis.position.set(0, 1, 0)
this.world.addBody(this.chassis)

// 3. RaycastVehicle — cannon's built-in vehicle controller
this.vehicle = new CANNON.RaycastVehicle({
  chassisBody: this.chassis,
  indexRightAxis: 0,
  indexForwardAxis: 2,
  indexUpAxis: 1,
})

// 4. Add four wheels
const wheelOptions = {
  radius: 0.35,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 40,
  suspensionRestLength: 0.3,
  frictionSlip: 1.5,
  dampingRelaxation: 2.3,
  dampingCompression: 4.5,
  maxSuspensionForce: 100000,
  rollInfluence: 0.01,
  axleLocal: new CANNON.Vec3(-1, 0, 0),
  chassisConnectionPointLocal: new CANNON.Vec3(0, 0, 0),
  maxSuspensionTravel: 0.3,
  useCustomSlidingRotationalSpeed: true,
  customSlidingRotationalSpeed: -30,
}

// Front left/right, rear left/right
const wheelPositions = [
  new CANNON.Vec3(-0.78,  0,  1.2),
  new CANNON.Vec3( 0.78,  0,  1.2),
  new CANNON.Vec3(-0.78,  0, -1.25),
  new CANNON.Vec3( 0.78,  0, -1.25),
]
wheelPositions.forEach((pos) => {
  wheelOptions.chassisConnectionPointLocal.copy(pos)
  this.vehicle.addWheel(wheelOptions)
})
this.vehicle.addToWorld(this.world)

// 5. Input → vehicle control
const controls = { forward: false, back: false, left: false, right: false, brake: false }
const maxSteerVal = 0.3
const maxForce = 1200
const brakeForce = 20

function applyControls() {
  const engineForce = controls.forward ? -maxForce :
                      controls.back    ?  maxForce : 0

  // Apply to rear wheels (indices 2, 3)
  this.vehicle.applyEngineForce(engineForce, 2)
  this.vehicle.applyEngineForce(engineForce, 3)

  // Steer front wheels (indices 0, 1)
  const steer = controls.right ? -maxSteerVal :
                controls.left  ?  maxSteerVal : 0
  this.vehicle.setSteeringValue(steer, 0)
  this.vehicle.setSteeringValue(steer, 1)

  // Brake
  const brake = controls.brake ? brakeForce : 0
  for (let i = 0; i < 4; i++) this.vehicle.setBrake(brake, i)
}

// 6. Sync Three.js meshes to physics each frame
function updateMeshes() {
  this.world.fixedStep()
  // Chassis
  chassisMesh.position.copy(this.chassis.position)
  chassisMesh.quaternion.copy(this.chassis.quaternion)
  // Wheels
  for (let i = 0; i < 4; i++) {
    this.vehicle.updateWheelTransform(i)
    const t = this.vehicle.wheelInfos[i].worldTransform
    wheelMeshes[i].position.copy(t.position)
    wheelMeshes[i].quaternion.copy(t.quaternion)
  }
}
```

---

## Post-Processing (Passes.js)

```js
// Passes.js — blur + glow (not pmndrs postprocessing — custom passes)
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

this.composer = new EffectComposer(renderer)
this.composer.addPass(new RenderPass(scene, camera))

// Glow/bloom
this.bloomPass = new UnrealBloomPass(
  new THREE.Vector2(sizes.width, sizes.height),
  0.3,   // strength
  0.4,   // radius
  0.75   // threshold
)
this.composer.addPass(this.bloomPass)
```

---

## Loading & Preloader

```js
// Resources.js uses THREE.LoadingManager
this.loadingManager = new THREE.LoadingManager(
  // onLoad
  () => { this.trigger('ready') },
  // onProgress
  (url, loaded, total) => {
    const progress = loaded / total
    // Update CSS progress bar
    document.documentElement.style.setProperty('--progress', progress)
  }
)
```

---

## Building a Simpler Version: 3D Room

A room with clickable objects is easier than a full driving game. Use this as a portfolio starting point:

```js
// Simple 3D room — no car, just click to inspect objects
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100)
camera.position.set(0, 3, 8)

// Load room from Blender
const loader = new GLTFLoader()
loader.load('/room.glb', (gltf) => {
  scene.add(gltf.scene)
  // Set up clickable objects
  clickableObjects = gltf.scene.children.filter(c => c.userData.clickable)
})

// Click to focus
const raycaster = new THREE.Raycaster()
window.addEventListener('click', (e) => {
  raycaster.setFromCamera(
    new THREE.Vector2(
      (e.clientX / innerWidth) * 2 - 1,
      -(e.clientY / innerHeight) * 2 + 1
    ),
    camera
  )
  const hits = raycaster.intersectObjects(clickableObjects, true)
  if (hits.length) {
    const obj = hits[0].object
    gsap.to(camera.position, {
      x: obj.position.x,
      y: obj.position.y + 1,
      z: obj.position.z + 2,
      duration: 1.2,
      ease: 'power3.inOut',
    })
  }
})
```

---

## Modern Rebuild: R3F + Rapier Physics

**2024 approach** — better performance than cannon.js, WASM-powered:

```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier three
```

```jsx
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody, useRevoluteJoint } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'

function Car() {
  const chassisRef = useRef()
  const wheelFL = useRef()
  const wheelFR = useRef()

  // Rapier revolute joints for steering
  const steerJoint = useRevoluteJoint(chassisRef, wheelFL, [
    [0.8, -0.3, 1.2],  // chassis anchor
    [0, 0, 0],          // wheel anchor
    [0, 1, 0],          // axis (Y = steer)
  ])

  useFrame(() => {
    if (keys.ArrowUp)   chassisRef.current.applyImpulse({ x: 0, y: 0, z: -5 })
    if (keys.ArrowDown) chassisRef.current.applyImpulse({ x: 0, y: 0, z: 5 })
    if (keys.ArrowLeft) steerJoint.configureMotorVelocity(-2, 1)
  })

  return (
    <RigidBody ref={chassisRef} mass={150} colliders="cuboid">
      <mesh>
        <boxGeometry args={[1.7, 0.6, 3.8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </RigidBody>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <Physics gravity={[0, -9.82, 0]}>
        <Car />
        <RigidBody type="fixed">
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#888" />
          </mesh>
        </RigidBody>
      </Physics>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
    </Canvas>
  )
}
```

### cannon.js vs rapier.js

| Feature | cannon.js (folio-2019) | @react-three/rapier |
|---|---|---|
| Language | JS | Rust → WASM |
| Performance | Good | 10-50x faster |
| API style | Imperative | Declarative (R3F) |
| Vehicle support | `RaycastVehicle` built-in | Manual joints |
| Bundle size | ~200kb | ~1.5MB WASM |
| Maintenance | Stale (use cannon-es fork) | Active |
| `npm install` | `cannon-es` | `@react-three/rapier` |

For a **portfolio room** (low physics complexity): cannon-es is fine.
For a **driving game** or heavy simulation: rapier is the modern choice.

---

## Key Takeaways

1. Bruno Simon's architecture is the gold standard for vanilla Three.js projects — the module pattern scales perfectly
2. `RaycastVehicle` in cannon.js does the heavy lifting for car suspension — don't reimplement it
3. The camera is the simplest part: lerp follow + lookAt the chassis
4. The world is broken into tile chunks (`Tiles.js`) loaded/unloaded by proximity — critical for large maps
5. Howler.js for audio: positional 3D sound tied to the car engine speed = `howl.rate(carSpeed / maxSpeed)`
