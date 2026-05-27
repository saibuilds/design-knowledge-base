# Spline 3D Scene Concepts — Client Brands

> Companion to: `spline-components.md` | Tool: app.spline.design | Packages: `@splinetool/react-spline`, `@splinetool/runtime`

---

## 1. DJ Custom Reno — 3D Scene Concepts

**Brand palette:** `#0a0a0a` background · `#f59e0b` amber glow · warm grays

### Scene Ideas

#### A. Floating Construction Tools Orbit
- Objects: hammer, power drill, measuring tape — modeled as low-poly 3D meshes
- Behavior: each tool orbits a central invisible pivot at different radii and speeds (use Spline's **Follow Path** event)
- Logo sits at center, slightly emissive amber glow material
- Idle loop: tools rotate slowly; on hover they accelerate

#### B. Blueprint Mesh Unfold on Scroll
- Start state: flat grid plane, grid lines in `#f59e0b` on `#0a0a0a` surface
- Scroll trigger: plane folds out like a blueprint unrolling — animate scale.x and rotation.x from 0 to 1 driven by scroll position
- Add subtle grid texture as an emissive material on the plane

#### C. Particle System — House Shape
- Particle count: 800–1200 points
- Idle: random dispersion cloud
- Trigger: particles converge into the silhouette of a house (set target positions via Spline States or use a custom runtime position tween)
- Color: white particles with `#f59e0b` accent cluster at roofline

#### D. Rotating 3D Floor Plan
- Import a flat extruded floor plan model (low-poly, ~500 polygons)
- Material: dark matte body, amber emissive lines for walls
- Behavior: slow Y-axis rotation (0.3 deg/frame), slight float up/down on sine curve
- Camera: 35° isometric angle

### Scroll Reactivity (Next.js)

```tsx
// components/DJRenoScene.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function DJRenoScene() {
  const splineRef = useRef<Application | null>(null);

  function onLoad(spline: Application) {
    splineRef.current = spline;
  }

  useEffect(() => {
    function handleScroll() {
      const app = splineRef.current;
      if (!app) return;

      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

      // Drive blueprint unfold object by scroll
      const blueprint = app.findObjectByName('Blueprint');
      if (blueprint) {
        blueprint.scale.x = scrollProgress;
        blueprint.rotation.x = scrollProgress * Math.PI * 0.5;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0a0a' }} aria-hidden="true">
      <Spline
        scene="https://prod.spline.design/YOUR_DJRENO_SCENE_ID/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
```

---

## 2. Garden Suites 4 You — 3D Scene Concepts

**Brand palette:** `stone-950` (`#0c0a09`) background · `#22c55e` green particles · `#f59e0b` amber accent

### Scene Ideas

#### A. 3D House + Detached Garden Suite
- Main house: mid-poly model, warm stone material
- Garden suite: smaller structure placed 2–3 units behind/left of main house
- Behavior: camera slowly dolly-zooms in on suite; ambient occlusion baked
- Lighting: warm directional (simulating golden hour), green tinted fill light from ground

#### B. Green Particle Swirl — House Formation
- ~1000 green (`#22c55e`) particles scattered in sphere
- On scroll or after 2s delay: particles spiral inward and form house outline
- Use Spline **States** with two position states: dispersed / formed
- Add slight glow bloom effect in Spline post-processing

#### C. Organic Garden Growth (Morphing Mesh)
- Start: flat ground plane
- Morph target: low-poly stylized garden — shrubs, grass blades, small tree
- Animate via Spline morph slider driven by scroll progress
- Materials: subsurface scattering green, amber soil tones

#### D. Floating ROI Counter in 3D Space
- 3D extruded number "+" text objects
- Behavior: numbers float at different depths (parallax), slowly spin on Y-axis
- Example labels: `+40% ROI`, `$120K Value`, `Legal in 2024`
- Font material: gold metallic (`#f59e0b` base, high specular)

### Lazy-Loaded Embed

```tsx
// components/GardenSuitesScene.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function GardenSuitesScene() {
  const splineRef = useRef<Application | null>(null);
  const [loaded, setLoaded] = useState(false);

  function onLoad(spline: Application) {
    splineRef.current = spline;
    setLoaded(true);

    // Trigger idle particle swirl on scene start
    spline.emitEvent('start', 'ParticleSystem');
  }

  useEffect(() => {
    if (!loaded) return;

    function handleScroll() {
      const app = splineRef.current;
      if (!app) return;
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

      const garden = app.findObjectByName('GardenMorph');
      if (garden) {
        // Spline morph targets exposed as custom variables
        (garden as any).morphTargetInfluences = [progress];
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#0c0a09' }} aria-hidden="true">
      <Spline
        scene="https://prod.spline.design/YOUR_GARDENSUITES_SCENE_ID/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
```

---

## 3. SathiDeals Real Estate — 3D Scene Concepts

**Brand palette:** deep navy `#0f1729` · gold `#c9a96e` · white `#ffffff`

### Scene Ideas

#### A. Toronto Skyline — CN Tower Silhouette
- Low-poly city block mesh with CN Tower as centrepiece
- Material: dark navy body, gold emissive windows
- Behavior: slow pan left-to-right camera movement (looping)
- Add subtle volumetric fog layer at ground level

#### B. Rotating Gold Metallic Logo Mark
- Import brand mark as SVG → extrude in Spline (Extrude tool, depth: 20px)
- Material: gold PBR — base `#c9a96e`, metalness 1.0, roughness 0.2
- Behavior: continuous Y-axis rotation at 0.5 deg/frame
- Environment map: HDRI studio for clean reflections

#### C. Particle Field — Property Shape Formation
- ~1500 white/gold particles begin as ambient constellation
- On scroll midpoint: particles sweep (directional wipe left to right) into building silhouette
- Use Spline's **Look At** event + position states for sweep direction

#### D. Luxury Refraction Orb
- Single sphere, material: glass with IOR ~1.45, transmission 1.0, roughness 0
- Subtle internal distortion of background (Spline supports basic refraction in WebGL renderer)
- Behavior: slow float + gentle rotation
- Scene use: hero background overlay, placed off-center right

### Scroll + Hover Embed

```tsx
// components/SathiDealsScene.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SathiDealsScene() {
  const splineRef = useRef<Application | null>(null);

  function onLoad(spline: Application) {
    splineRef.current = spline;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const app = splineRef.current;
    if (!app) return;

    const orb = app.findObjectByName('LuxuryOrb');
    if (!orb) return;

    // Subtle parallax: move orb slightly with cursor
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    orb.position.x = x;
    orb.position.y = y;
  }

  return (
    <div
      style={{ width: '100%', height: '100vh', background: '#0f1729' }}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
    >
      <Spline
        scene="https://prod.spline.design/YOUR_SATHI_SCENE_ID/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
```

---

## 4. Motta Kitchen — 3D Scene Concepts

**Brand palette:** warm white `#faf9f6` · brass `#8b6914` · charcoal `#1c1c1c`

### Scene Ideas

#### A. Floating Rotating Kitchen Island
- Mid-poly kitchen island model: waterfall countertop, base cabinets
- Material: marble countertop (procedural texture or image map), brass hardware
- Behavior: slow Y-axis rotation (0.2 deg/frame), subtle float animation on Y
- Lighting: three-point studio setup, warm key light from above-left

#### B. Brass / Metal Abstract Form
- Free-form organic mesh (blob/ribbon shape)
- Material: PBR brass — base `#8b6914`, metalness 0.95, roughness 0.35
- Behavior: continuous slow morph between two states (organic to geometric)
- Use case: hero decorative element, right-side placement

#### C. Morphing Premium Product Form
- Start: smooth sphere
- Morph: transitions through 3 organic states (like high-end product animation)
- Material: gloss warm white with subtle anisotropic highlight
- Timing: 4s per morph cycle, eased in/out

#### D. Marble Texture Reflection Plane
- Flat plane at slight angle (15° tilt)
- Material: marble image map (white/grey veining), roughness 0.05, metalness 0
- Reflection: environment map captures scene above
- Use case: product-shot base plane, sits below any floating object

### Embed with onLoad Fade-In

```tsx
// components/MottaKitchenScene.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function MottaKitchenScene() {
  const splineRef = useRef<Application | null>(null);
  const [opacity, setOpacity] = useState(0);

  function onLoad(spline: Application) {
    splineRef.current = spline;
    // Fade in once loaded to avoid flash
    setOpacity(1);
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#faf9f6',
        opacity,
        transition: 'opacity 0.8s ease',
      }}
      aria-hidden="true"
    >
      <Spline
        scene="https://prod.spline.design/YOUR_MOTTA_SCENE_ID/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
```

---

## 5. Spline Setup per Project (Next.js)

### Install

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

### Full Pattern — Lazy Load + onLoad + Scroll Reactivity

```tsx
// components/SplineSceneBase.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { Application } from '@splinetool/runtime';

// SSR disabled — Spline is WebGL, cannot run on server
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: 'var(--scene-bg, #000)' }} />
  ),
});

interface Props {
  sceneUrl: string;
  bg?: string;
  onScrollObject?: string; // name of object to drive via scroll
}

export default function SplineSceneBase({ sceneUrl, bg = '#000', onScrollObject }: Props) {
  const splineRef = useRef<Application | null>(null);
  const [mounted, setMounted] = useState(false);

  // Defer load until after LCP — uses requestIdleCallback if available
  useEffect(() => {
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => setMounted(true))
      : setTimeout(() => setMounted(true), 1500) as unknown as number;

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id as number);
      else clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    };
  }, []);

  function onLoad(spline: Application) {
    splineRef.current = spline;
  }

  useEffect(() => {
    if (!onScrollObject) return;

    function handleScroll() {
      const app = splineRef.current;
      if (!app) return;
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      const obj = app.findObjectByName(onScrollObject!);
      if (obj) {
        obj.rotation.y = progress * Math.PI * 2;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollObject]);

  if (!mounted) {
    return <div style={{ width: '100%', height: '100%', background: bg }} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', background: bg }} aria-hidden="true">
      <Spline scene={sceneUrl} onLoad={onLoad} />
    </div>
  );
}
```

### Usage per brand

```tsx
// DJ Custom Reno
<SplineSceneBase
  sceneUrl="https://prod.spline.design/DJRENO_ID/scene.splinecode"
  bg="#0a0a0a"
  onScrollObject="Blueprint"
/>

// Garden Suites 4 You
<SplineSceneBase
  sceneUrl="https://prod.spline.design/GARDEN_ID/scene.splinecode"
  bg="#0c0a09"
  onScrollObject="GardenMorph"
/>

// SathiDeals Real Estate
<SplineSceneBase
  sceneUrl="https://prod.spline.design/SATHI_ID/scene.splinecode"
  bg="#0f1729"
  onScrollObject="Skyline"
/>

// Motta Kitchen
<SplineSceneBase
  sceneUrl="https://prod.spline.design/MOTTA_ID/scene.splinecode"
  bg="#faf9f6"
  onScrollObject="KitchenIsland"
/>
```

---

## 6. Free Community Scenes to Adapt

Browse at: **app.spline.design/community**

| Scene Type | Search Term | Best For |
|---|---|---|
| Abstract blob / orb | `blob`, `orb`, `sphere glass` | SathiDeals luxury orb, Motta product form |
| Particle field | `particles`, `particle swirl` | Garden Suites green swirl, SathiDeals constellation |
| Floating geometric | `floating`, `geometric`, `crystal` | DJ Reno tools, Motta brass form |
| Morphing organic | `morph`, `fluid`, `organic` | Garden growth, Motta product morph |
| Low-poly city | `city`, `skyline`, `architecture` | SathiDeals Toronto skyline |
| Product render | `product`, `minimal`, `studio` | Motta kitchen island |
| Blueprint / grid | `grid`, `wireframe`, `blueprint` | DJ Custom Reno blueprint unfold |

### Workflow to adapt a community scene

1. Open scene in app.spline.design
2. Click **Duplicate to my drafts**
3. Replace materials with brand colors (select object → Material panel)
4. Rename key objects to match the `findObjectByName()` calls above
5. Add/modify States for scroll-driven transitions
6. Export → Web → download `.splinecode`
7. Place in `/public/scenes/brand-name.splinecode`

---

## 7. Exporting for Performance

### Export steps

1. Open scene in app.spline.design
2. Top-right → **Export** → **Web (splinecode)**
3. Download `.splinecode` file
4. Place at `public/scenes/[brand].splinecode`
5. Reference as `scene="/scenes/[brand].splinecode"` (no CDN dependency)

### Polygon budget per brand

| Brand | Recommended Poly Count | Why |
|---|---|---|
| DJ Custom Reno | 5,000–8,000 | Tools + floor plan, mobile visitors common |
| Garden Suites | 4,000–6,000 | Particles dominate, meshes can be low |
| SathiDeals | 6,000–10,000 | Skyline has more geometry |
| Motta Kitchen | 8,000–12,000 | Cabinet detail matters for premium feel |

### Optimization checklist

- Bake lighting into vertex colors where possible (reduces real-time calc)
- Merge static objects into single mesh
- Use texture atlases (one image map for multiple objects)
- Disable shadows on secondary objects
- Set `renderOnDemand: true` when using `@splinetool/runtime` directly
- Always lazy-load: never block LCP with a Spline scene
- Provide static image fallback for mobile:

```tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function ResponsiveSpline({ scene, fallbackImg }: { scene: string; fallbackImg: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  if (isMobile) {
    return <img src={fallbackImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }

  return <Spline scene={scene} />;
}
```

### LCP impact rule

- Hero section: use static image as LCP element, mount Spline **behind** it after `onLoad`
- Below-fold sections: use Intersection Observer pattern (see `spline-components.md` §5 Option B)
- Target: Spline canvas should never be the LCP element

---

## 8. Brand Color Reference

| Brand | Background | Accent 1 | Accent 2 | Particle / Glow |
|---|---|---|---|---|
| DJ Custom Reno | `#0a0a0a` | `#f59e0b` amber | `#78716c` warm gray | `#f59e0b` |
| Garden Suites 4 You | `#0c0a09` stone-950 | `#f59e0b` amber | `#1c1917` stone-900 | `#22c55e` green |
| SathiDeals Real Estate | `#0f1729` navy | `#c9a96e` gold | `#ffffff` white | `#c9a96e` |
| Motta Kitchen | `#faf9f6` warm white | `#8b6914` brass | `#1c1c1c` charcoal | `#d4a847` warm gold |
