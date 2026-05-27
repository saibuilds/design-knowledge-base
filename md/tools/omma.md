# Omma Build — Visual 3D Website Builder

> Visual website builder with 3D/WebGL capabilities and ~20 free plugins
> Check: ommadigital.com or omma.build (domain may be intermittently down)

## What It Is
- Drag-and-drop 3D website builder focused on immersive web experiences
- No-code / low-code approach — generates WebGL/Three.js effects visually
- Free plan includes ~20 3D plugins/components

## Known Free Plugins (~20 on free tier)
- 3D Hero sections (rotating objects, floating shapes)
- Particle systems
- Scroll-linked 3D animations
- WebGL background effects (waves, blobs, noise fields)
- 3D text with lighting and metalness
- Interactive cursor effects
- Parallax depth layers
- Animated mesh gradients / aurora backgrounds
- Physics-based floating objects
- Video texture on 3D surfaces
- HDRI environment lighting
- GLTF/GLB model viewer
- Spline scene integration
- Shader backgrounds (simplex noise, voronoi)
- Distortion hover effects
- Lottie animation embed
- Number/counter animations
- Typewriter effect

## Embed in Next.js
```tsx
// iframe embed:
<iframe
  src="https://your-omma-project.ommadigital.com"
  className="w-full h-screen border-0"
  allow="autoplay"
/>

// Script embed (if provided):
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.ommadigital.com/embed.js'
  script.setAttribute('data-project', 'YOUR_PROJECT_ID')
  document.body.appendChild(script)
  return () => document.body.removeChild(script)
}, [])
```

## DIY Equivalent (R3F — free, no limits)
```tsx
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'

export function OmmaStyleHero() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment preset="city" />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 0, 0]}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <MeshDistortMaterial color="#f59e0b" distort={0.4} speed={2} metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <mesh position={[-2, 0.5, -1]}>
            <icosahedronGeometry args={[1.2, 1]} />
            <MeshDistortMaterial color="#7c3aed" distort={0.3} speed={1.5} metalness={0.9} roughness={0.1} />
          </mesh>
        </Float>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </Canvas>
    </div>
  )
}
```

## Related Visual 3D Builders
- **Spline** (spline.design) — best free 3D for web, direct React embed
- **Vectary** (vectary.com) — online 3D editor with web embed
- **Jitter** (jitter.video) — motion graphics / UI animation
- **Rive** (rive.app) — interactive animation, free tier generous
