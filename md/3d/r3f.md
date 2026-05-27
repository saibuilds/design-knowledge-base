# React Three Fiber — 3D Patterns

> MIT License. React renderer for Three.js.

## Install
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```

## Basic Scene
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  )
}
```

## Floating Blob Hero (common pattern)
```tsx
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Blob() {
  const mesh = useRef(null)
  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial color="#7c3aed" distort={0.4} speed={2} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  )
}

export function BlobHero() {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#f59e0b" intensity={50} />
      <pointLight position={[-10, -5, 5]} color="#7c3aed" intensity={30} />
      <Blob />
    </Canvas>
  )
}
```

## Particles / Stars
```tsx
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function Stars({ count = 5000 }) {
  const positions = random.inSphere(new Float32Array(count * 3), { radius: 1.5 })
  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#fff" size={0.002} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

export function StarField() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars />
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
```

## GLTF Model
```tsx
import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={0.01} />
}

export function ModelViewer() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model url="/models/house.glb" />
      </Suspense>
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  )
}
// Preload for performance:
useGLTF.preload('/models/house.glb')
```

## Post-Processing (bloom, depth of field)
```tsx
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

<Canvas>
  <Scene />
  <EffectComposer>
    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
    <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
    <Vignette eskil={false} offset={0.1} darkness={0.8} />
  </EffectComposer>
</Canvas>
```

## Scroll-linked 3D (with GSAP)
```tsx
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function ScrollLinked() {
  const scroll = useScroll()
  const meshRef = useRef()
  
  useFrame(() => {
    meshRef.current.rotation.y = scroll.offset * Math.PI * 2
    meshRef.current.position.z = scroll.offset * -5
  })
  
  return <mesh ref={meshRef}><boxGeometry /><meshStandardMaterial /></mesh>
}

<Canvas>
  <ScrollControls pages={3}>
    <ScrollLinked />
  </ScrollControls>
</Canvas>
```

## Text 3D
```tsx
import { Text3D, Center } from '@react-three/drei'
<Center>
  <Text3D font="/fonts/inter_bold.json" size={0.75} height={0.2} curveSegments={12}
    bevelEnabled bevelThickness={0.02} bevelSize={0.02}>
    Hello World
    <meshNormalMaterial />
  </Text3D>
</Center>
```

## Free Resources
- Free GLB models: https://market.pmnd.rs
- Free HDRI: https://polyhaven.com
- Free fonts for Text3D: convert at https://gero3.github.io/facetype.js/
