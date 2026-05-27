# Curtains.js — WebGL Image Distortion Reference

**License**: MIT | **npm**: `curtainsjs`
**Site**: https://curtainsjs.com | **GitHub**: https://github.com/martinlaxenaire/curtainsjs

## What It Is

Curtains.js is a lightweight WebGL library that converts DOM elements (images, videos, canvases) into 3D textured planes that can be animated via GLSL shaders. It solves the hardest part of WebGL-on-the-web: **making WebGL elements match the position and size of real HTML/CSS elements**, including during scroll and resize.

**Key insight**: CSS controls the layout. WebGL handles the distortion/effect. They stay perfectly in sync.

---

## When to Use Curtains.js

- Portfolio image hover distortion effects
- Scroll-driven image warp/displacement
- Image gallery with WebGL transitions
- Video backgrounds with shader effects
- Anywhere you want "that liquid/ripple/wave effect on images"

**Not for**: Full 3D scenes, game-like environments (use Three.js), non-image content.

---

## Install

```bash
npm install curtainsjs
```

```js
import { Curtains, Plane } from 'curtainsjs';
```

Or via CDN:
```html
<script src="https://unpkg.com/curtainsjs/src/index.umd.min.js"></script>
```

React wrapper: `npm install react-curtains`
Vue wrapper: `npm install vue-curtains`

---

## HTML Structure

```html
<!-- WebGL canvas container -->
<div id="canvas"></div>

<!-- This element becomes a WebGL plane -->
<div class="plane">
  <img src="image.jpg" data-sampler="uTexture" alt="Effect image" />
</div>
```

---

## Basic Setup

```js
import { Curtains, Plane } from 'curtainsjs';

// Initialize the WebGL renderer
const curtains = new Curtains({
  container: 'canvas',          // ID of the canvas container
  watchScroll: true,            // auto-update planes on scroll
  pixelRatio: Math.min(1.5, window.devicePixelRatio),
});

curtains.onError(() => {
  // WebGL not supported — show fallback
  document.body.classList.add('no-webgl');
});

// Vertex shader (GLSL)
const vertexShader = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 uTextureMatrix0;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  }
`;

// Fragment shader (GLSL)
const fragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    vec2 uv = vTextureCoord;
    // Basic wave distortion
    uv.x += sin(uv.y * 10.0 + uTime * 0.05) * 0.01;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const plane = new Plane(curtains, document.querySelector('.plane'), {
  vertexShader,
  fragmentShader,
  uniforms: {
    time: {
      name: 'uTime',
      type: '1f',
      value: 0,
    },
  },
});

// Animate
plane.onRender(() => {
  plane.uniforms.time.value++;
});
```

---

## Hover Distortion Effect

The classic portfolio hover distortion pattern:

```js
const fragmentShader = `
  precision mediump float;

  varying vec2 vTextureCoord;

  uniform sampler2D uTexture;
  uniform sampler2D uDisplacement;
  uniform float uHover;         // 0.0 → 1.0 on hover
  uniform float uHoverStrength; // distortion amount

  void main() {
    vec2 uv = vTextureCoord;

    // Sample displacement map (a noise/wave texture)
    vec4 disp = texture2D(uDisplacement, uv);
    vec2 distortedUV = vec2(
      uv.x + uHover * (disp.r - 0.5) * uHoverStrength,
      uv.y + uHover * (disp.g - 0.5) * uHoverStrength
    );

    gl_FragColor = texture2D(uTexture, distortedUV);
  }
`;

const plane = new Plane(curtains, element, {
  vertexShader,
  fragmentShader,
  uniforms: {
    hover: { name: 'uHover', type: '1f', value: 0 },
    hoverStrength: { name: 'uHoverStrength', type: '1f', value: 0.2 },
  },
  // Include a displacement texture
  // Add <img src="displacement.jpg" data-sampler="uDisplacement"> to HTML
});

// Smooth hover via lerp
let targetHover = 0;
let currentHover = 0;

element.addEventListener('mouseenter', () => targetHover = 1);
element.addEventListener('mouseleave', () => targetHover = 0);

plane.onRender(() => {
  currentHover += (targetHover - currentHover) * 0.05; // lerp
  plane.uniforms.hover.value = currentHover;
});
```

---

## Scroll Distortion (Wave on Scroll)

```js
const fragmentShader = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform float uScrollVelocity;

  void main() {
    vec2 uv = vTextureCoord;
    // Distort UV based on scroll speed
    uv.x += sin(uv.y * 12.0) * uScrollVelocity * 0.003;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const plane = new Plane(curtains, element, {
  vertexShader,
  fragmentShader,
  uniforms: {
    scrollVelocity: { name: 'uScrollVelocity', type: '1f', value: 0 },
  },
});

let lastScrollY = 0;
let velocity = 0;
let targetVelocity = 0;

window.addEventListener('scroll', () => {
  targetVelocity = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;
});

plane.onRender(() => {
  velocity += (targetVelocity - velocity) * 0.1;
  targetVelocity *= 0.9; // decay
  plane.uniforms.scrollVelocity.value = velocity;
});
```

---

## Gallery with WebGL Transitions

```js
// Multiple planes for a gallery — cross-fade with distortion
const fragmentShader = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform sampler2D uNextTexture;
  uniform sampler2D uDisplacement;
  uniform float uProgress;  // 0 → 1 transition progress

  void main() {
    vec2 uv = vTextureCoord;
    vec4 disp = texture2D(uDisplacement, uv);

    vec2 distortedUV1 = uv + uProgress * (disp.rg - 0.5) * 2.0;
    vec2 distortedUV2 = uv + (1.0 - uProgress) * (disp.rg - 0.5) * 2.0;

    vec4 t1 = texture2D(uTexture, distortedUV1);
    vec4 t2 = texture2D(uNextTexture, distortedUV2);

    gl_FragColor = mix(t1, t2, uProgress);
  }
`;

// Animate uProgress from 0 → 1 with anime.js or GSAP on click
```

---

## Useful Uniforms Reference

| Uniform type | GLSL | JS value type |
|---|---|---|
| Float | `uniform float uVal;` | `type: '1f', value: 0.0` |
| Vec2 | `uniform vec2 uVec;` | `type: '2f', value: [0, 0]` |
| Vec3 | `uniform vec3 uColor;` | `type: '3f', value: [1, 0, 0]` |
| Int | `uniform int uInt;` | `type: '1i', value: 0` |
| Texture | `uniform sampler2D uTex;` | set via `data-sampler` attribute |

---

## Free Displacement Textures

- https://tympanus.net/codrops/2019/09/03/how-to-create-a-sticky-image-effect-with-three-js/ (download source)
- Search "displacement map noise texture" on Unsplash / Freepik
- Generate with: https://filteredreality.com/noise/

---

## React Integration

```jsx
import { Curtains, Plane } from 'react-curtains';

function DistortedImage({ src }) {
  return (
    <Curtains>
      <Plane className="plane" vertexShader={vs} fragmentShader={fs}>
        <img src={src} data-sampler="uTexture" alt="" />
      </Plane>
    </Curtains>
  );
}
```

---

## Performance Tips

- Set `pixelRatio: Math.min(1.5, window.devicePixelRatio)` — never full ratio on retina
- Use `watchScroll: false` and manually call `curtains.updateScrollValues()` if you control scroll
- Dispose planes when they leave the DOM: `plane.remove()`
- Limit texture size: compress images to <500KB before WebGL
