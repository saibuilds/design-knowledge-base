# @react-three/drei — Essential Helpers

> MIT License. 100+ helpers for React Three Fiber.
> npm install @react-three/drei

## Most Used Helpers

### Environment & Lighting
```tsx
import { Environment, ContactShadows, AccumulativeShadows } from '@react-three/drei'

// HDRI environment (lighting + reflections)
<Environment preset="city" />         // city, sunset, dawn, night, warehouse, forest, studio
<Environment files="/hdri/studio.hdr" />  // custom HDRI

// Soft contact shadows on floor
<ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={10} blur={2} far={10} />
```

### Controls
```tsx
import { OrbitControls, PresentationControls, ScrollControls, useScroll } from '@react-three/drei'

<OrbitControls enablePan={false} minDistance={3} maxDistance={10} />

// Touch-friendly presentation (drag to rotate, no scroll hijack)
<PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI/4, Math.PI/4]} azimuth={[-Math.PI/4, Math.PI/4]} config={{ mass: 2, tension: 400 }} snap>
  <Model />
</PresentationControls>

// Scroll-linked 3D
<ScrollControls pages={5} damping={0.3}>
  <ScrollScene />
</ScrollControls>
// Inside: const scroll = useScroll()  scroll.offset = 0..1
```

### Text
```tsx
import { Text, Text3D, Html } from '@react-three/drei'

// Rendered text in 3D space
<Text fontSize={0.5} color="white" anchorX="center" anchorY="middle" font="/fonts/Inter-Bold.woff">
  Hello World
</Text>

// Extruded 3D text
<Text3D font="/fonts/inter_bold.json" size={0.75} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02}>
  MOTTA
  <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.1} />
</Text3D>

// HTML overlaid on canvas (for labels, tooltips)
<Html position={[1, 1, 0]} center>
  <div className="bg-black text-white px-2 py-1 rounded text-sm">Label</div>
</Html>
```

### Models & Meshes
```tsx
import { useGLTF, useFBX, Clone, Instances, Instance } from '@react-three/drei'

const { scene, nodes, materials } = useGLTF('/models/kitchen.glb')
<primitive object={scene} />

// Instanced meshes (1000s of objects, one draw call)
<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {positions.map((p, i) => <Instance key={i} position={p} />)}
</Instances>
```

### Shapes & Geometry
```tsx
import { Box, Sphere, Cylinder, Plane, RoundedBox, Torus, TorusKnot } from '@react-three/drei'

<RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
  <meshStandardMaterial color="hotpink" />
</RoundedBox>

<Torus args={[1, 0.3, 16, 100]}>
  <meshNormalMaterial />
</Torus>
```

### Materials
```tsx
import { MeshDistortMaterial, MeshWobbleMaterial, MeshReflectorMaterial, MeshTransmissionMaterial } from '@react-three/drei'

// Organic distortion (blobs)
<MeshDistortMaterial color="#7c3aed" distort={0.4} speed={2} roughness={0.1} metalness={0.8} />

// Wobbly jelly
<MeshWobbleMaterial factor={0.4} speed={2} color="#f59e0b" />

// Glass/crystal (physically based)
<MeshTransmissionMaterial backside samples={16} resolution={512} transmission={1} roughness={0} thickness={0.5} ior={1.5} chromaticAberration={0.06} />

// Mirror floor
<MeshReflectorMaterial mirror={0.8} blur={[300, 100]} resolution={2048} mixBlur={1} mixStrength={80} roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#050505" metalness={0.5} />
```

### Animation
```tsx
import { Float, Sparkles, Trail, PointMaterial } from '@react-three/drei'

// Floating hover animation
<Float speed={2} rotationIntensity={1} floatIntensity={2}>
  <mesh>...</mesh>
</Float>

// Sparkle particles around object
<Sparkles count={50} scale={2} size={2} speed={0.4} color="gold" />

// Motion trail
<Trail width={0.05} length={6} color="white" attenuation={(t) => t * t}>
  <mesh ref={movingMesh}>...</mesh>
</Trail>
```

### Performance
```tsx
import { PerformanceMonitor, Detailed, BakeShadows, Preload } from '@react-three/drei'

// Adapt quality to FPS
<PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(window.devicePixelRatio)}>
  <Canvas dpr={dpr}>

// LOD (Level of Detail)
<Detailed distances={[0, 10, 20]}>
  <HighDetailMesh />
  <MediumDetailMesh />
  <LowDetailMesh />
</Detailed>

// Preload all assets before unmounting
<Preload all />
```

### Useful Hooks
```tsx
import { useHelper, useDepthBuffer, useCursor, useBounds } from '@react-three/drei'

// Dev: visualize light
useHelper(lightRef, THREE.DirectionalLightHelper, 1)

// Change cursor on hover
const [hovered, setHover] = useState(false)
useCursor(hovered)
<mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>

// Fit camera to objects
const bounds = useBounds()
<button onClick={() => bounds.refresh().fit()}>Zoom to Fit</button>
```
