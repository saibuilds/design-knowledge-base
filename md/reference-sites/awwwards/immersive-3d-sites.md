# Immersive 3D & WebGL Sites — Patterns & Code

> Stack: Next.js 14, React 18, TypeScript, Tailwind v3, React Three Fiber + Drei, GSAP + ScrollTrigger, Lenis.

---

## 1. Overview — Why WebGL Wins Awards

Awwwards judges evaluate WebGL/3D sites on four axes:
1. **Technical innovation** — is this solving a rendering problem in a new way?
2. **Integration** — does the 3D feel native to the content, or bolted on?
3. **Performance** — can it maintain 60fps on a mid-range laptop?
4. **Graceful degradation** — does it work at all on mobile/low-end devices?

Winning 3D sites share a common philosophy: the 3D environment *is* the UI, not a decoration layer on top of it. This means hit-testing, scroll integration, and navigation all happen within or alongside the 3D context. They never use `<iframe>` or `position:fixed` overlays that fight the canvas.

---

## 2. Site Profiles

---

### Bruno Simon (bruno-simon.com)

**Core 3D Technique:** Interactive driving game as portfolio — Three.js + Cannon.js physics. A miniature 3D world, top-down camera, WASD navigation.

**Performance Budget:**
- Target: 60fps, draw calls < 50 via heavy geometry merging
- Textures: baked lighting (no real-time shadows on static geometry)
- Physics: simplified convex hulls for collision meshes

**Code Pattern:**

```tsx
// components/three/DrivingScene.tsx
// Simplified architecture — full implementation requires Cannon.js
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function Car() {
  const groupRef = useRef<THREE.Group>(null!);
  const velocity = useRef({ x: 0, z: 0 });
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useFrame((_, delta) => {
    const SPEED = 4;
    const FRICTION = 0.85;
    const k = keys.current;

    if (k["ArrowUp"] || k["KeyW"]) velocity.current.z -= SPEED * delta;
    if (k["ArrowDown"] || k["KeyS"]) velocity.current.z += SPEED * delta;
    if (k["ArrowLeft"] || k["KeyA"]) velocity.current.x -= SPEED * delta;
    if (k["ArrowRight"] || k["KeyD"]) velocity.current.x += SPEED * delta;

    velocity.current.x *= FRICTION;
    velocity.current.z *= FRICTION;

    groupRef.current.position.x += velocity.current.x;
    groupRef.current.position.z += velocity.current.z;

    if (Math.abs(velocity.current.x) > 0.001 || Math.abs(velocity.current.z) > 0.001) {
      groupRef.current.rotation.y = Math.atan2(velocity.current.x, velocity.current.z);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.2, 1]} />
        <meshStandardMaterial color="#c9a96e" />
      </mesh>
    </group>
  );
}

export function DrivingScene() {
  return (
    <Canvas camera={{ position: [0, 8, 8], fov: 45 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Car />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <Environment preset="city" />
    </Canvas>
  );
}
```

---

### Lusion (lusion.co)

**Core 3D Technique:** GPU particle simulation — compute shader on WebGL2, particles morph between 3D shapes in real time.

**Performance Budget:**
- 60fps at 50,000 particles on mid-range GPU
- Simulation on GPU via ping-pong FBO (framebuffer object)
- Draw calls: 1 (single Points draw call)

**Code Pattern (R3F simplified):**

```tsx
// components/three/LusionParticles.tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = `
  attribute float aIndex;
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float t = uTime * 0.5;

    // Subtle wave based on index and time
    pos.y += sin(aIndex * 0.1 + t) * 0.05;
    pos.x += cos(aIndex * 0.07 + t * 0.8) * 0.03;

    // Mouse repulsion
    vec4 worldPos = modelViewMatrix * vec4(pos, 1.0);
    vec2 screenPos = worldPos.xy;
    float dist = distance(screenPos, uMouse);
    if (dist < 0.5) {
      vec2 dir = normalize(screenPos - uMouse);
      pos.xy += dir * (0.5 - dist) * 0.3;
    }

    vAlpha = 0.4 + sin(aIndex * 0.2 + t) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
`;

const FRAGMENT_SHADER = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, vAlpha * (1.0 - d * 2.0));
  }
`;

export function LusionParticles({
  count = 8000,
  color = "#c9a96e",
}: {
  count?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Points>(null!);
  const { size } = useThree();

  const [positions, indices] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const idx = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      idx[i] = i;
    }
    return [pos, idx];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  );

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(pointer.x * 2, pointer.y * 2);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-aIndex" args={[indices, 1]} count={count} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
```

---

### Active Theory (activetheory.net)

**Core 3D Technique:** Full R3F scene with custom post-processing pipeline. Environment exists as WebGL, DOM UI composited on top.

**Performance Budget:**
- 60fps target, post-processing adds ~3ms
- Bloom: kernel size Small (performance) or Medium (quality)
- Chromatic aberration: only enabled on interaction events, not every frame

**Code Pattern:**

```tsx
// components/three/ActiveTheoryScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { ParticleField } from "./ParticleField"; // from sotd-winners patterns

export function ActiveTheoryScene() {
  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="!fixed inset-0 -z-10"
    >
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.1} />
      <ParticleField count={3000} color="#8b6914" />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.002, 0.002)}
        />
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
```

---

### Aristide Benoist — GLSL Shader Distortion

**Core 3D Technique:** Fullscreen quad with custom GLSL fragment shader, reads a texture (image) and applies noise-based UV distortion. Mouse position drives distortion amplitude.

**Performance Budget:**
- Single draw call, 1 texture sample
- Noise computed in shader (no texture lookup)
- Target: 60fps even on integrated GPU

**Code Pattern:**

```tsx
// components/three/ImageDistortionPlane.tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform sampler2D uTexture;
  uniform float uDistortion;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex-ish noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0,0)), f - vec2(0,0)),
                   dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
               mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
                   dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 4.0 + uMouse * 2.0);
    uv.x += n * uDistortion * 0.08;
    uv.y += n * uDistortion * 0.06;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

export function ImageDistortionPlane({ imageSrc }: { imageSrc: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const texture = useTexture(imageSrc);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uDistortion: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [texture]);

  useFrame(({ pointer }) => {
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.05
    );
    // Decay distortion
    uniforms.uDistortion.value *= 0.95;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerMove={() => { uniforms.uDistortion.value = Math.min(uniforms.uDistortion.value + 0.1, 1); }}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}
```

---

### Ilithya (ilithya.rocks)

**Core 3D Technique:** Generative art with p5.js + Three.js hybrid. Algorithms (Perlin flow fields, Voronoi) create unique artwork per visit.

**Performance Budget:** Single-use generation, not real-time loop after initial render

**Code Pattern — Perlin Flow Field (Canvas 2D):**

```tsx
// components/FlowFieldCanvas.tsx
"use client";
import { useEffect, useRef } from "react";

export function FlowFieldCanvas({ width = 800, height = 600 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Simplex-style noise (using Math.sin approximation)
    const noise = (x: number, y: number) =>
      (Math.sin(x * 0.01 + y * 0.007) + Math.sin(x * 0.007 - y * 0.012) + Math.sin(x * 0.02 + y * 0.015)) / 3;

    const COLS = 60;
    const ROWS = 40;
    const SCALE = width / COLS;
    const PARTICLES = 800;

    const particles = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.5,
      life: Math.random() * 200,
    }));

    ctx.strokeStyle = "rgba(201, 169, 110, 0.15)";
    ctx.lineWidth = 0.8;

    for (let frame = 0; frame < 300; frame++) {
      for (const p of particles) {
        const col = Math.floor(p.x / SCALE);
        const row = Math.floor(p.y / SCALE);
        const angle = noise(col, row) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        p.life--;
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 100 + Math.random() * 200;
        }
      }
    }
  }, [width, height]);

  return <canvas ref={canvasRef} className="block w-full h-auto" />;
}
```

---

### Clément Ruchon — Fluid Simulation

**Core 3D Technique:** Navier-Stokes fluid simulation on GPU via WebGL2 ping-pong FBOs. Curl noise-based velocity advection.

**Performance Budget:** 512×512 sim texture, full-res render texture; 1ms sim, 2ms render per frame

**Code Pattern — CSS Fluid Fallback (mobile-safe):**

```tsx
// components/FluidHero.tsx — see sotd-winners.md ClipRevealImage for full code
// CSS-only fluid gradient for non-WebGL contexts:
// uses the FluidGradientHero component from sotd-winners.md #14
```

---

## 3. R3F Patterns Library

---

### 3.1 Floating Particles Background

```tsx
// components/three/FloatingParticlesBg.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      spd[i] = 0.002 + Math.random() * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    const attr = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      (attr.array as Float32Array)[i * 3 + 1] += speeds[i];
      if ((attr.array as Float32Array)[i * 3 + 1] > 4) {
        (attr.array as Float32Array)[i * 3 + 1] = -4;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c9a96e"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function FloatingParticlesBg() {
  return (
    <Canvas
      className="!absolute inset-0 -z-10"
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false }}
    >
      <Particles />
    </Canvas>
  );
}

// Usage in a section:
// <section className="relative min-h-screen">
//   <FloatingParticlesBg />
//   <div className="relative z-10">content</div>
// </section>
```

---

### 3.2 Scroll-Linked Camera Dolly

```tsx
// components/three/ScrollCamera.tsx
"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Camera path: 3 keyframe positions
const CAMERA_PATH = [
  new THREE.Vector3(0, 2, 8),   // Start: wide establishing
  new THREE.Vector3(2, 1, 4),   // Mid: closer, angled
  new THREE.Vector3(0, 0.5, 2), // End: intimate close-up
];

export function ScrollCamera() {
  const { camera } = useThree();
  const progress = useRef({ t: 0 });

  useEffect(() => {
    const curve = new THREE.CatmullRomCurve3(CAMERA_PATH);

    gsap.to(progress.current, {
      t: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-3d-scroll]",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      onUpdate: () => {
        const pos = curve.getPoint(progress.current.t);
        camera.position.lerp(pos, 0.1);
        camera.lookAt(0, 0, 0);
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [camera]);

  useFrame(() => {
    // handled by GSAP onUpdate
  });

  return null;
}

// In your scene:
// <Canvas>
//   <ScrollCamera />
//   {/* scene content */}
// </Canvas>
// Wrap the canvas + content in a tall div: <div data-3d-scroll className="h-[300vh]">
```

---

### 3.3 GLSL Noise Displacement Shader

```tsx
// components/three/NoiseDisplacementSphere.tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERT = `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex noise 3D
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normal;
    vPosition = position;
    float n = snoise(position * 1.5 + uTime * 0.3);
    vec3 displaced = position + normal * n * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const FRAG = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    float n = dot(normalize(vNormal), vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function NoiseDisplacementSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAmplitude: { value: 0.3 },
    uColorA: { value: new THREE.Color("#8b4513") },
    uColorB: { value: new THREE.Color("#c9a96e") },
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}
```

---

### 3.4 Post-Processing Bloom + Chromatic Aberration

```tsx
// components/three/PostFXScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

// Install: npm install @react-three/postprocessing postprocessing

interface PostFXSceneProps {
  children: React.ReactNode;
  bloomIntensity?: number;
  bloomThreshold?: number;
  chromaticOffset?: number;
}

export function PostFXScene({
  children,
  bloomIntensity = 0.8,
  bloomThreshold = 0.2,
  chromaticOffset = 0.002,
}: PostFXSceneProps) {
  return (
    <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#030303"]} />
      {children}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(chromaticOffset, chromaticOffset)}
        />
        <Vignette
          offset={0.3}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
```

---

### 3.5 Mouse-Tracked Refraction Sphere

```tsx
// components/three/RefractionSphere.tsx
"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Install: npm install @react-three/drei

export function RefractionSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    const targetX = pointer.x * viewport.width * 0.3;
    const targetY = pointer.y * viewport.height * 0.3;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.06;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.06;
  });

  return (
    <Sphere ref={meshRef} args={[0.8, 64, 64]}>
      <MeshTransmissionMaterial
        backside
        samples={16}
        thickness={0.5}
        roughness={0.05}
        anisotropy={0.5}
        chromaticAberration={0.06}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
        iridescence={0.3}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
      />
    </Sphere>
  );
}
```

---

## 4. Performance Checklist for WebGL in Next.js 14

```tsx
// app/three-page/page.tsx — SSR-safe dynamic import
import dynamic from "next/dynamic";

const HeavyScene = dynamic(
  () => import("@/components/three/HeavyScene").then((m) => m.HeavyScene),
  {
    ssr: false,           // Never SSR WebGL
    loading: () => <div className="bg-black h-screen" />, // CSS placeholder during hydration
  }
);
```

**Performance rules:**
- [ ] `ssr: false` on all Canvas imports — WebGL requires `window`
- [ ] `gl={{ antialias: false }}` on mobile — 2–3× fps improvement
- [ ] Use `frameloop="demand"` on static scenes — only renders when state changes
- [ ] `<Suspense>` + `useGLTF.preload()` for model loading
- [ ] Dispose geometries and materials: call `.dispose()` in cleanup
- [ ] `dpr={[1, 1.5]}` limits pixel ratio — prevents 2× rendering on retina when unnecessary
- [ ] Merge static geometry: `BufferGeometryUtils.mergeBufferGeometries()`
- [ ] Use `instancedMesh` for >100 identical objects
- [ ] `depthWrite={false}` on transparent particles — avoids depth sort cost
- [ ] Test on CPU throttle 4× in Chrome DevTools before shipping

```tsx
// Optimal Canvas config for real estate/renovation site:
<Canvas
  dpr={[1, 1.5]}
  gl={{ antialias: false, alpha: true }}
  performance={{ min: 0.5 }} // Auto-degrades quality if FPS drops
  frameloop="demand"         // Use "always" for animated scenes
  camera={{ fov: 45, near: 0.1, far: 100 }}
>
```

---

## 5. Applying 3D to Real Estate / Renovation Sites

| Use Case | Technique | Component | Difficulty |
|----------|-----------|-----------|------------|
| Property exterior viewer | GLTF model + OrbitControls | `<PropertyModel>` | 3 |
| Material/finish selector | R3F plane with texture swap | `<MaterialSelector>` | 2 |
| Neighbourhood flythrough | CatmullRom camera path + terrain | `<NeighbourhoodFly>` | 4 |
| Floor plan 3D extrusion | Extruded SVG path geometry | `<FloorPlan3D>` | 3 |
| Before/after reveal | Split plane with scroll-linked clip | `<BeforeAfter3D>` | 3 |
| Luxury particle hero | Floating particles in brand color | `<FloatingParticlesBg>` | 1 |
| ADU model configurator | React state drives geometry params | `<ADUConfigurator>` | 4 |

```tsx
// components/three/PropertyModel.tsx — GLTF viewer with orbit
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

useGLTF.preload("/models/property.glb");

function Model() {
  const { scene } = useGLTF("/models/property.glb");
  return <primitive object={scene} scale={0.01} />;
}

export function PropertyModel() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ position: [5, 3, 5], fov: 45 }}
      className="h-[500px] w-full rounded-xl"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Suspense fallback={null}>
        <Model />
        <ContactShadows position={[0, -0.01, 0]} opacity={0.4} blur={2} />
        <Environment preset="apartment" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
```
