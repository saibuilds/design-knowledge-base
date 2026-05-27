# Pure Three.js (Vanilla) — Reference Patterns
_Updated: 2026-05-27_

```bash
npm install three
npm install --save-dev @types/three
```

---

## 1. Scene / Camera / Renderer Setup

```js
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#0a0a0f')
scene.fog = new THREE.FogExp2('#0a0a0f', 0.035)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,                                      // FOV
  window.innerWidth / window.innerHeight,  // aspect
  0.1,                                     // near
  1000                                     // far
)
camera.position.set(0, 2, 8)

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,          // transparent background
  powerPreference: 'high-performance',
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2
document.body.appendChild(renderer.domElement)

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animate loop
const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  const elapsed = clock.getElapsedTime()
  // update scene objects here
  renderer.render(scene, camera)
}
animate()
```

---

## 2. OrbitControls

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.minDistance = 2
controls.maxDistance = 20
controls.maxPolarAngle = Math.PI / 2   // no going underground
controls.autoRotate = true
controls.autoRotateSpeed = 0.5

// In animate loop:
controls.update()
```

---

## 3. PointerLockControls (FPS-style)

```js
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

const controls = new PointerLockControls(camera, document.body)
scene.add(controls.getObject())

document.getElementById('start-btn').addEventListener('click', () => {
  controls.lock()
})

// WASD movement
const keys = {}
document.addEventListener('keydown', (e) => keys[e.code] = true)
document.addEventListener('keyup',   (e) => keys[e.code] = false)

const velocity = new THREE.Vector3()
const direction = new THREE.Vector3()

function updateMovement(delta) {
  velocity.x -= velocity.x * 10.0 * delta
  velocity.z -= velocity.z * 10.0 * delta

  direction.z = Number(keys['KeyW']) - Number(keys['KeyS'])
  direction.x = Number(keys['KeyD']) - Number(keys['KeyA'])
  direction.normalize()

  if (keys['KeyW'] || keys['KeyS']) velocity.z -= direction.z * 400 * delta
  if (keys['KeyA'] || keys['KeyD']) velocity.x -= direction.x * 400 * delta

  controls.moveRight(-velocity.x * delta)
  controls.moveForward(-velocity.z * delta)
}
```

---

## 4. Particle System with BufferGeometry

```js
const COUNT = 10000

// Build geometry
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(COUNT * 3)
const colors    = new Float32Array(COUNT * 3)
const sizes     = new Float32Array(COUNT)

const color = new THREE.Color()

for (let i = 0; i < COUNT; i++) {
  // Sphere distribution
  const r     = Math.random() * 8
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos((Math.random() * 2) - 1)

  positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
  positions[i * 3 + 2] = r * Math.cos(phi)

  // Random hue
  color.setHSL(Math.random(), 0.8, 0.6)
  colors[i * 3]     = color.r
  colors[i * 3 + 1] = color.g
  colors[i * 3 + 2] = color.b

  sizes[i] = Math.random() * 3 + 1
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

const material = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
})

const particles = new THREE.Points(geometry, material)
scene.add(particles)

// Animate: rotate slowly
function animate() {
  particles.rotation.y += 0.0005
  particles.rotation.x += 0.0002
}
```

---

## 5. Custom ShaderMaterial

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime:       { value: 0 },
    uColorA:     { value: new THREE.Color('#ff006e') },
    uColorB:     { value: new THREE.Color('#8338ec') },
  },
  vertexShader: /* glsl */`
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = sin(pos.x * 4.0 + uTime) * 0.15
                      + sin(pos.y * 3.0 + uTime * 1.2) * 0.1;
      pos.z += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixFactor = vElevation * 4.0 + 0.5;
      vec3 color = mix(uColorA, uColorB, clamp(mixFactor, 0.0, 1.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  side: THREE.DoubleSide,
})

// Update in loop:
material.uniforms.uTime.value = elapsed
```

---

## 6. GLTF Loader + Draco Compression

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const dracoLoader = new DRACOLoader()
// Point to Draco decoder (copy from node_modules or use CDN)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
dracoLoader.preload()

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
  '/models/scene.glb',
  (gltf) => {
    const model = gltf.scene

    // Cast + receive shadows
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        // Fix transparency sorting
        if (child.material.transparent) {
          child.renderOrder = 1
        }
      }
    })

    // Center model
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    scene.add(model)

    // Play animations
    const mixer = new THREE.AnimationMixer(model)
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play()
    })

    // Update mixer in loop: mixer.update(delta)
  },
  (progress) => console.log((progress.loaded / progress.total * 100).toFixed(1) + '%'),
  (error) => console.error(error)
)
```

---

## 7. Raycasting — Mouse Hover on 3D Objects

```js
const raycaster = new THREE.Raycaster()
const mouse     = new THREE.Vector2()
let hoveredObject = null

window.addEventListener('mousemove', (e) => {
  // Normalize to -1..1
  mouse.x = (e.clientX / window.innerWidth)  *  2 - 1
  mouse.y = (e.clientY / window.innerHeight) * -2 + 1
})

// In animate loop:
function checkIntersections() {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (intersects.length > 0) {
    const obj = intersects[0].object

    if (obj !== hoveredObject) {
      // Leave previous
      if (hoveredObject) {
        hoveredObject.material.emissive.setHex(0x000000)
        document.body.style.cursor = 'default'
      }
      // Enter new
      hoveredObject = obj
      obj.material.emissive.setHex(0x333333)
      document.body.style.cursor = 'pointer'
    }
  } else {
    if (hoveredObject) {
      hoveredObject.material.emissive.setHex(0x000000)
      document.body.style.cursor = 'default'
      hoveredObject = null
    }
  }
}

// Click detection
window.addEventListener('click', () => {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)
  if (intersects.length > 0) {
    const clicked = intersects[0].object
    console.log('Clicked:', clicked.name)
  }
})
```

---

## 8. Scroll-Linked Camera Movement

```js
// Pattern: lerp camera position toward a target driven by scroll
let scrollY    = 0
let targetZ    = 8
let currentZ   = 8

window.addEventListener('scroll', () => {
  scrollY = window.scrollY
  // Map scroll to camera Z: start at 8, pull in to 2 over 1000px scroll
  targetZ = 8 - (scrollY / 1000) * 6
  // Target Y: rise slightly
  camera.position.y = 2 + scrollY * 0.001
})

// In animate loop — smooth lerp
function updateCamera() {
  currentZ += (targetZ - currentZ) * 0.05
  camera.position.z = currentZ
  camera.lookAt(0, 0, 0)
}
```

```js
// GSAP ScrollTrigger approach (more precise)
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

gsap.to(camera.position, {
  z: 2,
  y: 4,
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: () => camera.lookAt(0, 0, 0)
  }
})
```

---

## 9. Post-Processing

```js
import { EffectComposer }   from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass }       from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass }  from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass }       from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader }       from 'three/examples/jsm/shaders/FXAAShader.js'
import { SMAAPass }         from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { SSAOPass }         from 'three/examples/jsm/postprocessing/SSAOPass.js'

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

// Bloom
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,   // strength
  0.4,   // radius
  0.85   // threshold
)
composer.addPass(bloom)

// FXAA anti-aliasing
const fxaa = new ShaderPass(FXAAShader)
fxaa.uniforms['resolution'].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
)
composer.addPass(fxaa)

// Use composer.render() instead of renderer.render()
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  composer.render()
}
```

---

## 10. Lights Cheatsheet

```js
// Ambient (flat fill)
const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient)

// Directional (sun)
const sun = new THREE.DirectionalLight(0xffffff, 1.5)
sun.position.set(5, 10, 5)
sun.castShadow = true
sun.shadow.mapSize.width = 2048
sun.shadow.mapSize.height = 2048
sun.shadow.camera.near = 0.5
sun.shadow.camera.far = 50
scene.add(sun)

// Point (bulb)
const pointLight = new THREE.PointLight(0xff6040, 2, 10)
pointLight.position.set(-3, 2, -3)
scene.add(pointLight)

// Environment map (IBL — best quality)
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
const rgbe = new RGBELoader()
rgbe.load('/hdri/studio.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = texture    // PBR reflections
  scene.background  = texture   // optional: use as skybox
})
```
