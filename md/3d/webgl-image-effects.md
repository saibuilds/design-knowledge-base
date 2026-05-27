# WebGL Image Distortion Effects

The most impactful visual effects for web — implemented with Three.js `PlaneGeometry + ShaderMaterial` or Curtains.js for the same results with less boilerplate.

---

## Foundation: Three.js Image Plane

All effects below use this same base. The key insight: DOM images stay hidden, WebGL planes take their position on screen.

```js
import * as THREE from 'three'

// Match a DOM image's position and size in WebGL
function createImagePlane(imgElement) {
  const rect = imgElement.getBoundingClientRect()
  const texture = new THREE.TextureLoader().load(imgElement.src)
  texture.minFilter = THREE.LinearFilter

  const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)  // subdivide for vertex effects
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture:   { value: texture },
      uTime:      { value: 0 },
      uMouse:     { value: new THREE.Vector2(0.5, 0.5) },
      uHover:     { value: 0 },
      uResolution:{ value: new THREE.Vector2(rect.width, rect.height) },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  // Scale to match DOM element size in NDC
  mesh.scale.set(rect.width, rect.height, 1)
  return mesh
}

// Convert viewport to world units (orthographic camera setup)
const camera = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
   window.innerWidth / 2,
   window.innerHeight / 2,
  -window.innerHeight / 2,
  0.1, 100
)
camera.position.z = 1
```

---

## Effect 1: Ripple on Hover (Displacement Map)

```glsl
// vertex.glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
// fragment.glsl — ripple displacement
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Distance from mouse
  float dist = distance(uv, uMouse);

  // Ripple wave emanating from cursor
  float wave = sin(dist * 30.0 - uTime * 5.0) * 0.02;
  wave *= smoothstep(0.5, 0.0, dist);  // fade at edges
  wave *= uHover;                       // only when hovered

  // Displace UV
  vec2 displaced = uv + normalize(uv - uMouse) * wave;

  gl_FragColor = texture2D(uTexture, displaced);
}
```

```js
// JS — track mouse, animate hover
imgElement.addEventListener('mousemove', (e) => {
  const rect = imgElement.getBoundingClientRect()
  material.uniforms.uMouse.value.set(
    (e.clientX - rect.left) / rect.width,
    1.0 - (e.clientY - rect.top) / rect.height  // flip Y
  )
})

gsap.to(material.uniforms.uHover, { value: 1, duration: 0.6 })
// mouseout: gsap.to(..., { value: 0, duration: 0.8 })

// RAF
material.uniforms.uTime.value += 0.016
```

---

## Effect 2: Pixel Disintegration Transition

```glsl
// fragment.glsl — disintegrate out, assemble in
uniform sampler2D uTexture;
uniform sampler2D uNextTexture;
uniform float uProgress;  // 0 = current, 1 = next
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  // Pixelate both images
  float pixelSize = mix(1.0, 80.0, uProgress) / 1000.0;
  vec2 pixelatedUV = floor(uv / pixelSize) * pixelSize;

  vec4 current = texture2D(uTexture, pixelatedUV);
  vec4 next    = texture2D(uNextTexture, pixelatedUV);

  // Per-pixel random threshold — staggered disintegration
  float threshold = random(pixelatedUV);
  float mixVal = smoothstep(threshold - 0.1, threshold + 0.1, uProgress);

  gl_FragColor = mix(current, next, mixVal);
}
```

```js
// Trigger transition
function transitionTo(nextSrc) {
  const nextTexture = new THREE.TextureLoader().load(nextSrc)
  material.uniforms.uNextTexture.value = nextTexture

  gsap.to(material.uniforms.uProgress, {
    value: 1,
    duration: 1.2,
    ease: 'power2.inOut',
    onComplete: () => {
      material.uniforms.uTexture.value = nextTexture
      material.uniforms.uProgress.value = 0
    }
  })
}
```

---

## Effect 3: Cloth Simulation Image Reveal

```glsl
// vertex.glsl — cloth physics simulation in vertex shader
uniform float uTime;
uniform float uReveal;   // 0→1 on load
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Gravity pull — top stays fixed, bottom falls
  float gravity = (1.0 - uv.y) * (1.0 - uReveal) * 0.3;

  // Cloth wave along top edge
  float wave = sin(uv.x * 8.0 - uTime * 2.0) * 0.02 * (1.0 - uv.y);
  wave *= (1.0 - uReveal);

  pos.y -= gravity;
  pos.z += wave;

  // Horizontal stretch on reveal
  pos.x *= mix(0.9, 1.0, uReveal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

```glsl
// fragment.glsl
uniform sampler2D uTexture;
uniform float uReveal;
varying vec2 vUv;

void main() {
  // Clip the bottom until revealed (wipe from top)
  float cutoff = 1.0 - uReveal;
  if (vUv.y < cutoff) discard;

  // Soft edge at reveal boundary
  float alpha = smoothstep(cutoff, cutoff + 0.05, vUv.y);
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = vec4(color.rgb, color.a * alpha);
}
```

```js
// Trigger on page load
gsap.to(material.uniforms.uReveal, {
  value: 1,
  duration: 1.8,
  ease: 'power3.inOut',
  delay: 0.3
})
```

---

## Effect 4: Noise-Warped Image

```glsl
// fragment.glsl — organic noise distortion
uniform sampler2D uTexture;
uniform float uTime;
uniform float uDistortion;  // 0 (calm) → 1 (chaos)
varying vec2 vUv;

// 2D value noise
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);  // smoothstep
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = vUv;

  // Sample noise at two scales for organic feel
  float n1 = noise(uv * 3.0 + uTime * 0.2);
  float n2 = noise(uv * 7.0 - uTime * 0.15);
  float n  = (n1 + n2 * 0.5) / 1.5;

  // Warp UV
  float strength = uDistortion * 0.08;
  uv.x += (n - 0.5) * strength;
  uv.y += (n - 0.5) * strength * 0.5;

  gl_FragColor = texture2D(uTexture, uv);
}
```

---

## Effect 5: RGB Split / Chromatic Aberration on Images

```glsl
// fragment.glsl
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAberration;  // 0.0 → 0.02
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 center = vec2(0.5);

  // Aberration increases radially from center
  vec2 dir = normalize(uv - center);
  float dist = length(uv - center);
  vec2 offset = dir * dist * uAberration;

  float r = texture2D(uTexture, uv + offset).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - offset).b;
  float a = texture2D(uTexture, uv).a;

  gl_FragColor = vec4(r, g, b, a);
}
```

```js
// Animate aberration on hover
imgElement.addEventListener('mouseenter', () => {
  gsap.to(material.uniforms.uAberration, { value: 0.015, duration: 0.3 })
})
imgElement.addEventListener('mouseleave', () => {
  gsap.to(material.uniforms.uAberration, { value: 0.0, duration: 0.6 })
})

// Or pulse with scroll velocity
function tick() {
  material.uniforms.uAberration.value = THREE.MathUtils.lerp(
    material.uniforms.uAberration.value,
    Math.abs(scrollVelocity) * 0.0003,
    0.1
  )
}
```

---

## Using Curtains.js (Same Effects, Less Code)

```bash
npm install curtainsjs
```

Curtains.js handles DOM→WebGL positioning, resize, and scroll automatically.

```html
<div id="canvas"></div>
<div class="plane">
  <img src="photo.jpg" data-sampler="uTexture" crossorigin="" />
</div>
```

```js
import { Curtains, Plane } from 'curtainsjs'

const curtains = new Curtains({
  container: 'canvas',
  watchScroll: true,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
})

const params = {
  vertexShader: `
    precision mediump float;
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uMVMatrix, uPMatrix;
    uniform mat4 uTextureMatrix0;
    varying vec2 vUv;
    void main() {
      vUv = (uTextureMatrix0 * vec4(aTextureCoord, 0, 1)).xy;
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1);
    }
  `,
  fragmentShader: `
    precision mediump float;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 25.0 - uTime * 4.0) * 0.015;
      wave *= smoothstep(0.4, 0.0, dist);
      uv += normalize(uv - uMouse) * wave;
      gl_FragColor = texture2D(uTexture, uv);
    }
  `,
  uniforms: {
    time:  { name: 'uTime',  type: '1f', value: 0 },
    mouse: { name: 'uMouse', type: '2f', value: [0.5, 0.5] },
  },
  widthSegments: 20,
  heightSegments: 20,
}

const plane = new Plane(curtains, document.querySelector('.plane'), params)

plane.onRender(() => {
  plane.uniforms.time.value += 0.016
})

plane.onMouseMove((e) => {
  const mousePos = plane.mouseToPlaneCoords(e)
  plane.uniforms.mouse.value = [mousePos.x, mousePos.y]
})
```

### Curtains.js vs Raw Three.js

| Feature | Curtains.js | Three.js |
|---|---|---|
| DOM sync | Automatic | Manual rect tracking |
| Scroll tracking | Built-in | Manual |
| Resize handling | Built-in | Manual |
| GLSL control | Full | Full |
| Bundle size | ~30kb | ~150kb |
| 3D scenes | No | Yes |
| Post-processing | Via ShaderPass | Full pipeline |

**Use Curtains.js** when: image/video effects only, quick prototyping, small bundle matters.
**Use Three.js** when: full 3D scene, custom geometry, post-processing pipeline, more control needed.

---

## PlaneGeometry Subdivision Reference

```js
// Segments matter for vertex-based effects
new THREE.PlaneGeometry(1, 1,  1,  1)  // 2 triangles — flat, no vertex effects
new THREE.PlaneGeometry(1, 1, 16, 16)  // 512 triangles — smooth cloth/wave
new THREE.PlaneGeometry(1, 1, 32, 32)  // 2048 — detailed subdivision
new THREE.PlaneGeometry(1, 1, 64, 64)  // 8192 — use only for hero images
```

More segments = smoother vertex displacement but higher GPU load. 16x16 is the sweet spot for most effects.
