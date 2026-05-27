# OGL — Lightweight WebGL Library Reference
_Updated: 2026-05-27 | License: MIT | Size: ~20KB gzipped_
_URL: github.com/oframe/ogl_

> OGL is a minimal WebGL framework. No magic, no abstractions — just thin wrappers around WebGL. Used by agency sites for maximum performance where Three.js (600KB) is too heavy.
> Bundle: Core 8KB + Math 6KB + Extras 15KB = **29KB total** (minzipped, tree-shakeable)

## Install

```bash
npm install ogl
```

---

## 1. Renderer / Camera / Scene Setup

```js
import { Renderer, Camera, Transform, Mesh, Geometry, Program, Orbit } from 'ogl'

// Renderer
const renderer = new Renderer({
  dpr: Math.min(window.devicePixelRatio, 2),
  antialias: true,
  alpha: true,
})
const gl = renderer.gl
document.body.appendChild(gl.canvas)

gl.clearColor(0.05, 0.05, 0.1, 1)

// Camera
const camera = new Camera(gl, { fov: 45 })
camera.position.set(0, 0, 5)
camera.lookAt([0, 0, 0])

// Scene (Transform = empty node, root of scene graph)
const scene = new Transform()

// Resize
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
}
window.addEventListener('resize', resize)
resize()

// Orbit controls
const controls = new Orbit(camera, { target: [0, 0, 0] })

// Render loop
let lastTime = performance.now()
requestAnimationFrame(function loop(t) {
  requestAnimationFrame(loop)
  const delta = (t - lastTime) / 1000
  lastTime = t
  controls.update()
  renderer.render({ scene, camera })
})
```

---

## 2. Basic Mesh with Custom Shader

```js
import { Renderer, Camera, Transform, Mesh, Geometry, Program } from 'ogl'

const geometry = new Geometry(gl, {
  position: { size: 3, data: new Float32Array([
    -1, -1, 0,
     1, -1, 0,
     0,  1, 0,
  ])},
  uv: { size: 2, data: new Float32Array([
    0, 0,
    1, 0,
    0.5, 1,
  ])},
})

const program = new Program(gl, {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec2 uv;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;

    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(uTime + position.x * 2.0) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragment: /* glsl */`
    precision highp float;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec3 color = vec3(vUv, 0.5 + 0.5 * sin(uTime));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    uTime: { value: 0 },
  },
  cullFace: null,   // double-sided
})

const mesh = new Mesh(gl, { geometry, program })
mesh.setParent(scene)

// In render loop:
program.uniforms.uTime.value = performance.now() / 1000
```

---

## 3. Plane with Texture

```js
import { Plane, Texture } from 'ogl'

const texture = new Texture(gl)
const img = new Image()
img.onload = () => (texture.image = img)
img.src = '/textures/photo.jpg'

const geometry = new Plane(gl, { width: 2, height: 2, widthSegments: 32, heightSegments: 32 })

const program = new Program(gl, {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(uv.x * 3.14159 + uTime) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragment: /* glsl */`
    precision highp float;
    uniform sampler2D tMap;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 toMouse = uv - uMouse;
      float dist = length(toMouse);
      float wave = sin(dist * 30.0) * 0.03 * smoothstep(0.5, 0.0, dist);
      uv += normalize(toMouse) * wave;
      gl_FragColor = texture2D(tMap, uv);
    }
  `,
  uniforms: {
    tMap:   { value: texture },
    uTime:  { value: 0 },
    uMouse: { value: [0.5, 0.5] },
  },
})

const mesh = new Mesh(gl, { geometry, program })
mesh.setParent(scene)
```

---

## 4. Particle System

```js
import { Geometry, Program, Mesh } from 'ogl'

const COUNT = 8000

const positions = new Float32Array(COUNT * 3)
const randoms   = new Float32Array(COUNT * 3)

for (let i = 0; i < COUNT; i++) {
  // Galaxy-like distribution
  const r = Math.pow(Math.random(), 0.5) * 5
  const theta = Math.random() * Math.PI * 2
  const phi = (Math.random() - 0.5) * 0.5

  positions[i * 3]     = r * Math.cos(theta) * Math.cos(phi)
  positions[i * 3 + 1] = r * Math.sin(phi) * 0.3
  positions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)

  randoms[i * 3]     = Math.random()
  randoms[i * 3 + 1] = Math.random()
  randoms[i * 3 + 2] = Math.random()
}

const geometry = new Geometry(gl, {
  position: { size: 3, data: positions },
  random:   { size: 3, data: randoms },
})

const program = new Program(gl, {
  vertex: /* glsl */`
    attribute vec3 position;
    attribute vec3 random;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;

    varying float vAlpha;

    void main() {
      vec3 pos = position;

      // Spiral rotation
      float angle = uTime * 0.2 + random.x * 6.28318;
      float s = sin(angle); float c = cos(angle);
      pos.xz = mat2(c, -s, s, c) * pos.xz;

      // Vertical oscillation
      pos.y += sin(uTime * 0.5 + random.y * 6.28) * 0.1;

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (2.0 + random.z * 3.0) * (1.0 / -mvPos.z);
      gl_Position  = projectionMatrix * mvPos;

      vAlpha = 0.4 + random.x * 0.6;
    }
  `,
  fragment: /* glsl */`
    precision highp float;
    varying float vAlpha;

    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float alpha = vAlpha * (1.0 - d * 2.0);
      gl_FragColor = vec4(0.6, 0.8, 1.0, alpha);
    }
  `,
  uniforms: { uTime: { value: 0 } },
  transparent: true,
  depthTest:   false,
})

// OGL uses gl.POINTS mode automatically when no index provided
const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })
particles.setParent(scene)
```

---

## 5. Post-Processing with OGL

```js
import { RenderTarget, Triangle } from 'ogl'

// Render to texture
const renderTarget = new RenderTarget(gl, {
  width: gl.canvas.width,
  height: gl.canvas.height,
})

// Full-screen triangle (more efficient than quad)
const postGeometry = new Triangle(gl)

const postProgram = new Program(gl, {
  vertex: /* glsl */`
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0, 1);
    }
  `,
  fragment: /* glsl */`
    precision highp float;
    uniform sampler2D tMap;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Barrel distortion
      vec2 cc = uv - 0.5;
      float dist = dot(cc, cc);
      uv += cc * dist * 0.1;

      vec3 color = texture2D(tMap, uv).rgb;

      // Vignette
      float vignette = 1.0 - dot(cc * 1.5, cc * 1.5);
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    tMap:  { value: renderTarget.texture },
    uTime: { value: 0 },
  },
})

const postMesh = new Mesh(gl, { geometry: postGeometry, program: postProgram })

// In render loop:
// 1. Render scene to renderTarget
renderer.render({ scene, camera, target: renderTarget })
// 2. Render post quad to screen
renderer.render({ scene: postMesh })
```

---

## 6. GLTF Loading

```js
import { GLTFLoader } from 'ogl'

const gltf = await GLTFLoader.load(gl, '/models/scene.glb')
const model = gltf.scene || gltf.scenes[0]
model.setParent(scene)
model.scale.set(0.01, 0.01, 0.01)  // adjust scale

// Access meshes
gltf.meshes.forEach(mesh => {
  console.log(mesh.name, mesh.primitives)
})
```

---

## 7. Mouse Tracking

```js
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

window.addEventListener('mousemove', (e) => {
  mouse.targetX = (e.clientX / window.innerWidth)  *  2 - 1
  mouse.targetY = (e.clientY / window.innerHeight) * -2 + 1
})

// In render loop — smooth follow
mouse.x += (mouse.targetX - mouse.x) * 0.05
mouse.y += (mouse.targetY - mouse.y) * 0.05

program.uniforms.uMouse.value = [mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5]
```

---

## 8. When to Use OGL vs Three.js

| Factor | OGL | Three.js |
|--------|-----|----------|
| Bundle size | ~20KB | ~600KB |
| Learning curve | Higher (closer to raw GL) | Lower |
| Features | Minimal | Full-featured |
| Best for | Custom shaders, agency micro-sites | General 3D apps |
| GLTF support | Basic | Full (Draco, morph, skins) |
| Community | Small | Large |
| Performance | Same GPU | Same GPU |

Use OGL when: bundle size matters, you're writing custom shaders anyway, or building a minimal creative micro-site where Three.js extras would go unused.
