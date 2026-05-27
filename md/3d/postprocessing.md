# Post-Processing — Cinematic 3D Effects

> @react-three/postprocessing wraps the `postprocessing` library for R3F.
> npm install @react-three/postprocessing postprocessing

## Full Cinematic Stack
```tsx
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, DepthOfField, SMAA, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'

<Canvas>
  <Scene />
  <EffectComposer multisampling={0}>
    {/* Anti-aliasing */}
    <SMAA />
    {/* Tone mapping (affects how colors are mapped) */}
    <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    {/* Glow on emissive + bright areas */}
    <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
    {/* Depth of field — blurs far objects */}
    <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} height={700} />
    {/* RGB split */}
    <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} radialModulation={false} />
    {/* Film grain */}
    <Noise opacity={0.03} />
    {/* Dark corners */}
    <Vignette eskil={false} offset={0.1} darkness={0.7} />
  </EffectComposer>
</Canvas>
```

## Bloom Only (most common)
```tsx
<EffectComposer>
  <Bloom
    luminanceThreshold={0.2}   // only bloom pixels brighter than this
    luminanceSmoothing={0.9}
    intensity={2}
    mipmapBlur                  // better quality bloom
    radius={0.8}
  />
</EffectComposer>

// Make objects glow: set emissive + emissiveIntensity > 1
<meshStandardMaterial color="black" emissive="#f59e0b" emissiveIntensity={3} />
```

## Scroll-reactive aberration
```tsx
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

function ReactiveEffects() {
  const chromRef = useRef()
  const scroll = useScroll()
  let lastOffset = 0

  useFrame(() => {
    const velocity = Math.abs(scroll.offset - lastOffset) * 100
    lastOffset = scroll.offset
    if (chromRef.current) {
      chromRef.current.offset = new Vector2(velocity * 0.002, velocity * 0.002)
    }
  })
  return <ChromaticAberration ref={chromRef} offset={new Vector2(0, 0)} />
}
```

## Outline selected objects
```tsx
import { Outline, Selection, Select } from '@react-three/postprocessing'

<Selection>
  <EffectComposer multisampling={8} autoClear={false}>
    <Outline blur visibleEdgeColor="white" edgeStrength={5} width={500} />
  </EffectComposer>
  <Select enabled={hovered}>
    <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  </Select>
</Selection>
```

## SSR (Screen Space Reflections)
```tsx
import { SSR } from '@react-three/postprocessing'
<EffectComposer>
  <SSR
    intensity={1}
    exponent={1}
    distance={10}
    fade={10}
    roughnessFade={1}
    thickness={10}
    ior={0.45}
    maxRoughness={1}
    maxDepthDifference={10}
    blend={0.95}
    correction={1}
    correctionRadius={1}
    blur={0}
    blurKernel={1}
    blurSharpness={10}
    jitter={0.75}
    jitterRoughness={0.2}
    steps={40}
    refineSteps={5}
    missedRays={true}
    useNormalMap={true}
    useRoughnessMap={true}
    resolutionScale={1}
    velocityResolutionScale={1}
  />
</EffectComposer>
```

## Glitch effect
```tsx
import { Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

<Glitch
  delay={new Vector2(1.5, 3.5)}
  duration={new Vector2(0.6, 1.0)}
  strength={new Vector2(0.3, 1.0)}
  mode={GlitchMode.SPORADIC}  // or CONSTANT_WILD
  active
  ratio={0.85}
/>
```

## Performance Tips
```tsx
// Enable only when needed
const [enablePP, setEnablePP] = useState(false)

// Lower resolution for mobile
<EffectComposer enabled={enablePP} resolutionScale={isMobile ? 0.5 : 1}>

// Disable multisampling (expensive)
<EffectComposer multisampling={0}>

// Use mipmapBlur on Bloom (faster than standard)
<Bloom mipmapBlur />
```
