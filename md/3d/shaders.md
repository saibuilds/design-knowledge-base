# GLSL Shaders — R3F + Three.js Reference
_Updated: 2026-05-27_

## Common Uniforms Pattern

```glsl
// Vertex shader standard uniforms
uniform float uTime;
uniform vec2  uMouse;       // normalized -1..1
uniform vec2  uResolution;  // pixels
uniform float uProgress;    // 0..1 for transitions
```

```jsx
// R3F: feed uniforms via useFrame
const matRef = useRef()
useFrame(({ clock, mouse, size }) => {
  matRef.current.uniforms.uTime.value    = clock.getElapsedTime()
  matRef.current.uniforms.uMouse.value   = [mouse.x, mouse.y]
  matRef.current.uniforms.uResolution.value = [size.width, size.height]
})
```

---

## 1. Basic ShaderMaterial in R3F

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */`
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float elevation = sin(pos.x * 3.0 + uTime) * 0.1
                    + sin(pos.y * 2.0 + uTime * 0.8) * 0.08;
    pos.z += elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float t = vElevation * 5.0 + 0.5;
    vec3 color = mix(uColorA, uColorB, t);
    gl_FragColor = vec4(color, 1.0);
  }
`

export function WavePlane() {
  const matRef = useRef()

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uColorA:     { value: new THREE.Color('#1a1a2e') },
    uColorB:     { value: new THREE.Color('#e94560') },
  }), [])

  useFrame(({ clock }) => {
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
```

---

## 2. Simplex Noise (GLSL 300 es compatible)

```glsl
// Classic 2D simplex noise — paste above main()
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((x*34.0+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                         + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x * x0.x  + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
```

---

## 3. Distortion / Ripple Shader

```glsl
// fragment shader — ripple from mouse click
uniform sampler2D uTexture;
uniform vec2  uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 toMouse = vUv - uMouse;
  float dist = length(toMouse);
  float wave = sin(dist * 40.0 - uTime * 6.0) * 0.02;
  wave *= smoothstep(0.4, 0.0, dist);   // fade at edges
  vec2 distortedUv = vUv + normalize(toMouse) * wave;
  gl_FragColor = texture2D(uTexture, distortedUv);
}
```

---

## 4. Gradient Mesh Shader

```glsl
// vertex
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// fragment — animated gradient mesh
uniform float uTime;
varying vec2 vUv;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  for(float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 1.5) - 0.5;
    float d = length(uv) * exp(-length(uv0));
    vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.4);
    d = sin(d * 8.0 + uTime) / 8.0;
    d = abs(d);
    d = pow(0.01 / d, 1.2);
    finalColor += col * d;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
```

---

## 5. Wave / Fluid Surface Shader

```glsl
// vertex — Gerstner waves
uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveHeight;
varying vec3 vNormal;
varying vec2 vUv;

vec3 gerstnerWave(vec3 pos, vec2 dir, float steep, float wavelength, float t) {
  float k = 2.0 * 3.14159 / wavelength;
  float speed = sqrt(9.8 / k);
  float f = k * (dot(dir, pos.xz) - speed * t);
  float a = steep / k;
  return vec3(
    dir.x * a * cos(f),
    a * sin(f),
    dir.y * a * cos(f)
  );
}

void main() {
  vUv = uv;
  vec3 p = position;

  p += gerstnerWave(p, vec2(1.0, 0.0), 0.3, 2.0, uTime * uWaveSpeed);
  p += gerstnerWave(p, vec2(0.7, 0.7), 0.2, 1.2, uTime * uWaveSpeed * 0.9);
  p += gerstnerWave(p, vec2(0.0, 1.0), 0.15, 0.8, uTime * uWaveSpeed * 1.1);

  vec3 tangent = normalize(vec3(1.0, 0.0, 0.0));
  vec3 binormal = normalize(vec3(0.0, 0.0, 1.0));
  vNormal = normalize(cross(binormal, tangent));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}

// fragment — ocean
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
  float diff = max(dot(vNormal, lightDir), 0.0);
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 1.0, 0.0)), 3.0);
  vec3 color = mix(uDeepColor, uShallowColor, fresnel);
  color += diff * 0.3;
  gl_FragColor = vec4(color, 0.9);
}
```

---

## 6. Particle Shader (Points)

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const particleVert = /* glsl */`
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.8 + aPhase) * 0.3;
    pos.x += cos(uTime * 0.6 + aPhase * 1.3) * 0.15;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
    vAlpha = 0.6 + 0.4 * sin(uTime + aPhase);
  }
`

const particleFrag = /* glsl */`
  varying float vAlpha;

  void main() {
    // circular point
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    float alpha = vAlpha * (1.0 - d * 2.0);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`

export function Particles({ count = 5000 }) {
  const matRef = useRef()

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    const phases    = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      sizes[i]  = Math.random() * 3 + 1
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, sizes, phases }
  }, [count])

  useFrame(({ clock }) => {
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

---

## 7. Post-Processing Custom Shader Pass (R3F + @react-three/postprocessing)

```bash
npm install @react-three/postprocessing postprocessing
```

```jsx
import { Effect } from 'postprocessing'
import { Uniform } from 'three'
import { wrapEffect, EffectComposer, RenderPass } from '@react-three/postprocessing'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// 1. Define the Effect class
const glsl = /* glsl */`
  uniform float uTime;
  uniform float uStrength;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 p = uv;
    // chromatic aberration
    float r = texture2D(inputBuffer, p + vec2(uStrength * 0.005, 0.0)).r;
    float g = texture2D(inputBuffer, p).g;
    float b = texture2D(inputBuffer, p - vec2(uStrength * 0.005, 0.0)).b;

    // scanlines
    float scanline = sin(p.y * 800.0) * 0.02 * uStrength;

    outputColor = vec4(r + scanline, g, b, inputColor.a);
  }
`

class GlitchEffectImpl extends Effect {
  constructor() {
    super('GlitchEffect', glsl, {
      uniforms: new Map([
        ['uTime',     new Uniform(0)],
        ['uStrength', new Uniform(1)],
      ])
    })
  }
}

const GlitchEffect = wrapEffect(GlitchEffectImpl)

// 2. Use in scene
export function PostFX() {
  const effectRef = useRef()
  useFrame(({ clock }) => {
    effectRef.current.uniforms.get('uTime').value = clock.getElapsedTime()
  })
  return (
    <EffectComposer>
      <RenderPass />
      <GlitchEffect ref={effectRef} uStrength={0.5} />
    </EffectComposer>
  )
}
```

---

## 8. useRef + useFrame Pattern Cheatsheet

```jsx
// Pattern: single uniforms object, never recreated
const uniforms = useMemo(() => ({
  uTime:    { value: 0 },
  uMouse:   { value: new THREE.Vector2(0, 0) },
  uTexture: { value: texture },
}), [texture])   // only re-create when texture changes

useFrame(({ clock, mouse }) => {
  // Direct mutation — no re-render triggered
  uniforms.uTime.value = clock.getElapsedTime()
  uniforms.uMouse.value.set(mouse.x, mouse.y)
})

// Attach via spread — keeps ref clean
<shaderMaterial uniforms={uniforms} {...} />
```

---

## 9. Screen-space UV (full-screen quad)

```glsl
// vertex — for full-screen effects
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
}
```

```jsx
// Full screen mesh (no camera needed)
<mesh>
  <planeGeometry args={[2, 2]} />
  <shaderMaterial ... />
</mesh>
// + <OrthographicCamera makeDefault position={[0,0,1]} />
```

---

## 10. Noise-based Color Blob (CSS-alternative hero bg)

```glsl
// fragment only — use on full-screen plane
uniform float uTime;
uniform vec2  uResolution;
varying vec2  vUv;

// paste snoise() here

void main() {
  vec2 uv = vUv;
  float n1 = snoise(uv * 2.0 + vec2(uTime * 0.15, 0.0)) * 0.5 + 0.5;
  float n2 = snoise(uv * 3.0 + vec2(0.0, uTime * 0.1))  * 0.5 + 0.5;

  vec3 col1 = vec3(0.08, 0.06, 0.22);  // deep purple
  vec3 col2 = vec3(0.82, 0.12, 0.42);  // pink
  vec3 col3 = vec3(0.05, 0.55, 0.95);  // cyan

  vec3 color = mix(col1, col2, n1);
  color      = mix(color, col3, n2 * 0.5);

  gl_FragColor = vec4(color, 1.0);
}
```
