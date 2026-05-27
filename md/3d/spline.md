# Spline — 3D Hero Scenes (Free)

> Free tier: unlimited public scenes, embed anywhere.
> Your code is yours — Spline generates embed code or React component.

## Install
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

## Basic Embed
```tsx
import Spline from '@splinetool/react-spline'
import { Suspense } from 'react'

export function SplineHero() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-zinc-950 animate-pulse rounded-xl" />}>
      <Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
    </Suspense>
  )
}
```

## In Hero Section
```tsx
<section className="relative h-screen bg-zinc-950 overflow-hidden">
  {/* 3D scene fills background */}
  <div className="absolute inset-0 z-0">
    <Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
  </div>
  {/* Content overlaid */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-8xl font-black text-white">Your Brand</h1>
  </div>
</section>
```

## Interaction (trigger events)
```tsx
import Spline from '@splinetool/react-spline'
import { Application } from '@splinetool/runtime'
import { useRef } from 'react'

export function InteractiveSpline() {
  const spline = useRef<Application>()
  
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp
  }
  
  const triggerAnimation = () => {
    spline.current?.emitEvent('mouseDown', 'Cube')
  }
  
  return (
    <>
      <Spline scene="https://prod.spline.design/SCENE-ID/scene.splinecode" onLoad={onLoad} />
      <button onClick={triggerAnimation}>Animate</button>
    </>
  )
}
```

## Free Community Scenes
Search at: https://app.spline.design/community

Good search terms for renovation/real-estate:
- "house 3d" — architectural models
- "abstract blob" — hero blobs
- "product showcase" — 3D card/box
- "particles" — floating particles
- "geometric" — abstract shapes
- "room interior" — interior scenes

Popular free scenes:
- Blob hero: https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode
- Earth globe: https://prod.spline.design/kZDDjO5HlWTakHZn/scene.splinecode
- Floating shapes: https://prod.spline.design/l4FZv0q-wFbFBXpJ/scene.splinecode

## Performance Tips
```tsx
// Lazy load Spline — it's large (~500KB)
const Spline = lazy(() => import('@splinetool/react-spline'))

// Only show on desktop
{!isMobile && (
  <Suspense fallback={null}>
    <Spline scene={...} />
  </Suspense>
)}

// Fade in after load
const [loaded, setLoaded] = useState(false)
<div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
  <Spline scene={...} onLoad={() => setLoaded(true)} />
</div>
```

## Creating Your Own Scene (Free)
1. Go to https://app.spline.design
2. Create account (free)
3. New file → design your scene
4. Export → Publish to Web
5. Copy scene URL
6. Use URL in `<Spline scene="URL" />`
