# Award-Winning 3D Portfolio Patterns

Patterns extracted from: bruno-simon.com (Three.js + cannon.js), lusion.co (immersive WebGL), chartogne-taillet.com (vineyard scroll), and Awwwards SOTD winners.

---

## Architecture Overview

Every award-winning 3D portfolio follows a consistent layered architecture:

```
index.html
└── Application.js          ← singleton bootstrap
    ├── Time.js              ← RAF loop + delta
    ├── Sizes.js             ← viewport + resize
    ├── Resources.js         ← asset loader + progress
    ├── Camera.js            ← camera + easing
    ├── Renderer.js          ← WebGLRenderer config
    ├── Passes.js            ← EffectComposer pipeline
    └── World/
        ├── Physics.js       ← cannon-es world
        ├── Environment.js   ← lights, sky, HDRI
        ├── Floor.js
        └── [Objects].js
```

Bruno Simon's folio-2019 (MIT, 4.7k stars) uses exactly this pattern.
Stack: `three@0.164`, `cannon@0.6.2`, `gsap@3.12`, `howler@2.2`, `vite@5`.

---

## 1. Preloader with Progress Bar

```html
<div id="loading-overlay">
  <div class="progress-bar">
    <div class="progress-fill" id="progress-fill"></div>
  </div>
  <span id="progress-text">0%</span>
</div>
```

```js
// Resources.js — THREE.LoadingManager based
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default class Resources {
  constructor(sources) {
    this.sources = sources          // array of { name, type, path }
    this.items = {}
    this.toLoad = sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader)
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++
    const progress = this.loaded / this.toLoad
    // Update UI
    document.getElementById('progress-fill').style.width = `${progress * 100}%`
    document.getElementById('progress-text').textContent = `${Math.round(progress * 100)}%`

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
      // Animate overlay out
      gsap.to('#loading-overlay', { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById('loading-overlay').style.display = 'none'
      }})
    }
  }
}
```

---

## 2. Loading Screen → Scene Reveal Pattern

```js
// After resources ready, stagger-reveal the scene
onResourcesReady() {
  // 1. Fade out overlay
  gsap.to(overlay, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })

  // 2. Animate camera from high bird-eye to ground level
  gsap.fromTo(camera.position,
    { y: 20, z: 30 },
    { y: 5, z: 15, duration: 3, ease: 'power3.inOut' }
  )

  // 3. Bloom intensity punch then settle
  gsap.fromTo(bloomEffect, { intensity: 3 }, { intensity: 0.4, duration: 2, delay: 0.5 })

  // 4. Reveal objects with staggered scale
  scene.children.forEach((child, i) => {
    gsap.fromTo(child.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.2, delay: i * 0.08, ease: 'back.out(1.7)' }
    )
  })
}
```

---

## 3. Camera Path Animation on Scroll (CatmullRomCurve3)

See `camera-scroll.md` for the full deep-dive. Core pattern:

```js
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2, 10),
  new THREE.Vector3(5, 3, 5),
  new THREE.Vector3(10, 1, 0),
  new THREE.Vector3(5, 2, -5),
  new THREE.Vector3(0, 3, -10),
])

const lookAtCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 5),
  new THREE.Vector3(5, 1, 0),
  new THREE.Vector3(10, 0, -5),
  new THREE.Vector3(0, 1, -10),
])

let scrollProgress = 0

ScrollTrigger.create({
  trigger: '#scroll-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1.5,   // 1.5s lag = cinematic feel
  onUpdate: (self) => {
    scrollProgress = self.progress
  }
})

// In RAF loop:
function tick() {
  const t = scrollProgress
  const targetPos = curve.getPoint(t)
  const targetLook = lookAtCurve.getPoint(Math.min(t + 0.02, 1))

  // Lerp camera for additional smoothing
  camera.position.lerp(targetPos, 0.05)
  cameraTarget.lerp(targetLook, 0.05)
  camera.lookAt(cameraTarget)

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
```

---

## 4. Physics with cannon-es

```bash
npm install cannon-es
```

```js
import * as CANNON from 'cannon-es'

// World setup
const physicsWorld = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0)
})
physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld)
physicsWorld.allowSleep = true

// Material pairs for friction/restitution
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  { friction: 0.1, restitution: 0.7 }
)
physicsWorld.addContactMaterial(defaultContactMaterial)

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body({ mass: 0, material: defaultMaterial })
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2)
physicsWorld.addBody(floorBody)

// Dynamic sphere
function createSphere(radius, position) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff4444 })
  )
  scene.add(mesh)

  const shape = new CANNON.Sphere(radius)
  const body = new CANNON.Body({ mass: 1, material: defaultMaterial })
  body.addShape(shape)
  body.position.copy(position)
  physicsWorld.addBody(body)

  return { mesh, body }
}

// In tick — sync physics → three
const fixedStep = 1 / 60
function tick() {
  physicsWorld.fixedStep()
  for (const obj of objectsToUpdate) {
    obj.mesh.position.copy(obj.body.position)
    obj.mesh.quaternion.copy(obj.body.quaternion)
  }
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
```

---

## 5. Interactive Objects — Click to Pick Up and Throw

```js
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let heldBody = null
let holdDistance = 5

window.addEventListener('mousedown', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(pickableObjects)
  if (intersects.length > 0) {
    const hit = intersects[0]
    heldBody = hit.object.userData.physicsBody
    heldBody.type = CANNON.Body.KINEMATIC  // disable gravity while held
    holdDistance = hit.distance
  }
})

window.addEventListener('mousemove', (e) => {
  if (!heldBody) return
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  const holdPos = new THREE.Vector3()
  raycaster.ray.at(holdDistance, holdPos)
  heldBody.position.copy(holdPos)
  heldBody.velocity.set(0, 0, 0)
})

// Throw on mouseup
let prevMousePos = new THREE.Vector2()
let mouseDelta = new THREE.Vector2()

window.addEventListener('mouseup', () => {
  if (!heldBody) return
  heldBody.type = CANNON.Body.DYNAMIC

  // Compute throw velocity from mouse delta
  const throwDir = new THREE.Vector3()
  raycaster.ray.direction.clone().multiplyScalar(15)
  heldBody.velocity.set(
    mouseDelta.x * 20,
    mouseDelta.y * -20,
    -10
  )
  heldBody = null
})
```

---

## 6. Post-Processing Stack — Cinematic Look

```bash
npm install postprocessing
```

```js
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  ChromaticAberrationEffect,
  VignetteEffect,
  NoiseEffect,
  SMAAEffect,
  ToneMappingEffect,
} from 'postprocessing'
import * as THREE from 'three'

// Renderer must be configured for postprocessing
const renderer = new THREE.WebGLRenderer({
  powerPreference: 'high-performance',
  antialias: false,   // SMAA handles this
  stencil: false,
  depth: false,
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2

// Compose pipeline
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

const bloomEffect = new BloomEffect({
  intensity: 0.4,
  luminanceThreshold: 0.7,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
})

const chromaticAberration = new ChromaticAberrationEffect({
  offset: new THREE.Vector2(0.002, 0.002),
  radialModulation: true,
  modulationOffset: 0.5,
})

const vignette = new VignetteEffect({
  offset: 0.35,
  darkness: 0.6,
})

const filmGrain = new NoiseEffect({
  blendFunction: BlendFunction.SOFT_LIGHT,
  premultiply: true,
})
filmGrain.blendMode.opacity.value = 0.3

const smaa = new SMAAEffect()

composer.addPass(new EffectPass(camera,
  smaa,
  bloomEffect,
  chromaticAberration,
  filmGrain,
  vignette,
))

// Animate chromatic aberration on scroll velocity
function tick() {
  const velocity = Math.abs(scrollVelocity)
  chromaticAberration.offset.set(velocity * 0.005, velocity * 0.005)
  composer.render()
  requestAnimationFrame(tick)
}
```

---

## 7. Audio Reactive (Web Audio API)

```js
// Audio analyzer — react to music beats
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
analyser.fftSize = 256

const audio = new Audio('/sounds/ambient.mp3')
const source = audioContext.createMediaElementSource(audio)
source.connect(analyser)
analyser.connect(audioContext.destination)

const dataArray = new Uint8Array(analyser.frequencyBinCount)

// In tick — read frequency data
function tick() {
  analyser.getByteFrequencyData(dataArray)

  // Bass (0-4): drive bloom intensity
  const bass = dataArray.slice(0, 4).reduce((a, b) => a + b) / 4 / 255
  bloomEffect.intensity = 0.4 + bass * 1.5

  // Mids (10-40): subtle camera shake
  const mids = dataArray.slice(10, 40).reduce((a, b) => a + b) / 30 / 255
  camera.position.x += (Math.random() - 0.5) * mids * 0.05

  // High freq (100+): film grain intensity
  const highs = dataArray.slice(100).reduce((a, b) => a + b) / 156 / 255
  filmGrain.blendMode.opacity.value = 0.2 + highs * 0.3

  composer.render()
  requestAnimationFrame(tick)
}

// Must resume AudioContext on user gesture (browser policy)
document.addEventListener('click', () => {
  if (audioContext.state === 'suspended') audioContext.resume()
  audio.play()
}, { once: true })
```

---

## Key Performance Rules

1. **Draco compress** all GLTF models — 5-10x size reduction
2. **KTX2 / Basis textures** for GPU-native compression
3. Set `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` — never uncapped
4. Use `renderer.shadowMap.type = THREE.PCFSoftShadowMap` with only 1-2 shadow-casting lights
5. `dispose()` geometry, material, texture when removing objects — critical for SPAs
6. `allowSleep = true` on Cannon world — sleeping bodies skip physics calc
7. Post-processing: `antialias: false` on renderer + SMAA pass is faster than built-in MSAA
