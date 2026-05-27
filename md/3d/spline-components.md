# Spline 3D Component Patterns

> Reference: https://spline.design | Packages: `@splinetool/react-spline`, `@splinetool/runtime`

---

## 1. Embedding in Next.js

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

### Basic embed (App Router)

```tsx
// components/SplineScene.tsx
'use client';

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
  );
}
```

### Pages Router

```tsx
// pages/index.tsx
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function Home() {
  return <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />;
}
```

---

## 2. Triggering Animations from React

Spline exposes an `Application` object via the `onLoad` callback. Use it to trigger named events on objects.

```tsx
'use client';

import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import { useRef } from 'react';

export default function InteractiveScene() {
  const splineRef = useRef<Application | null>(null);

  function onLoad(spline: Application) {
    splineRef.current = spline;
  }

  function triggerAnimation() {
    if (!splineRef.current) return;
    // Emit a named event defined inside the Spline editor
    splineRef.current.emitEvent('mouseDown', 'Button'); // (eventName, objectName)
  }

  return (
    <>
      <Spline
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        onLoad={onLoad}
      />
      <button onClick={triggerAnimation}>Trigger</button>
    </>
  );
}
```

### Getting / setting object variables

```tsx
function manipulateObject() {
  const app = splineRef.current;
  if (!app) return;

  // Find object by name (set in Spline editor)
  const obj = app.findObjectByName('Cube');
  if (obj) {
    obj.position.x = 100;
    obj.scale.x = 2;
  }
}
```

### Available runtime events

```ts
type SplineEvent =
  | 'mouseDown'
  | 'mouseUp'
  | 'mouseHover'
  | 'keyDown'
  | 'keyUp'
  | 'start'
  | 'lookAt'
  | 'follow';
```

---

## 3. Hero Background Pattern

Full-viewport Spline scene behind page content. The scene canvas must be `position: absolute` and non-interactive so pointer events pass through to UI.

```tsx
// components/HeroWithSpline.tsx
'use client';

import dynamic from 'next/dynamic';
import styles from './HeroWithSpline.module.css';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className={styles.placeholder} />,
});

export default function HeroWithSpline() {
  return (
    <section className={styles.hero}>
      {/* 3D background — pointer-events: none so UI is still clickable */}
      <div className={styles.canvas} aria-hidden="true">
        <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
      </div>

      {/* Foreground content */}
      <div className={styles.content}>
        <h1>Your Headline</h1>
        <p>Subheading text.</p>
      </div>
    </section>
  );
}
```

```css
/* HeroWithSpline.module.css */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.canvas canvas {
  width: 100% !important;
  height: 100% !important;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

.placeholder {
  width: 100%;
  height: 100%;
  background: #0a0a0a;
}
```

---

## 4. Common Free Scene Types

These scene categories are consistently available in the Spline community gallery:

| Category | Description | Typical Use |
|---|---|---|
| **Floating objects** | Looping 3D shapes (spheres, blobs, crystals) with idle float animation | Hero backgrounds, loaders |
| **Particle systems** | Interactive or ambient particle fields, dust, sparkles | Background atmosphere |
| **Morphing shapes** | Fluid mesh morphs between organic forms on scroll or hover | Landing page hero |
| **Product renders** | Stylized 3D product mockups (phones, bottles, headphones) | Product marketing sections |
| **Text 3D** | Extruded 3D typography with physics or hover interactions | Headers, titles |
| **Abstract landscapes** | Low-poly terrain, isometric environments | Illustration-style sections |
| **UI mockups** | 3D device frames with embedded UI | Feature showcase |

Search terms that return results in app.spline.design/community: `blob`, `particles`, `product`, `floating`, `abstract`, `hero`, `morphing`.

---

## 5. Lazy-Loading to Avoid LCP Impact

Spline scenes are heavy (WebGL + scene file). Load them only after the LCP element has painted.

### Option A — `next/dynamic` with `loading` placeholder (recommended)

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function LazySpline() {
  const [mounted, setMounted] = useState(false);

  // Defer until after first paint
  useEffect(() => {
    const id = requestIdleCallback
      ? requestIdleCallback(() => setMounted(true))
      : setTimeout(() => setMounted(true), 2000);
    return () => {
      if (requestIdleCallback) cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  if (!mounted) return <div style={{ width: '100%', height: '100%', background: '#000' }} />;

  return (
    <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
  );
}
```

### Option B — Intersection Observer (load only when scrolled into view)

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function InViewSpline() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: 600 }}>
      {inView && (
        <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
      )}
    </div>
  );
}
```

---

## 6. Using the Runtime Directly (no React)

```ts
import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const app = new Application(canvas);

await app.load('https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode');

// Listen for events from Spline objects
app.addEventListener('mouseDown', (e) => {
  console.log('Object clicked:', e.target.name);
});
```

---

## 7. Exporting and Using Scenes Offline

### Export from Spline editor

1. Open your scene in app.spline.design
2. Top-right menu → **Export** → choose **Web (splinecode)**
3. Download the `.splinecode` file

### Serve locally in Next.js

Place the file in `/public/scenes/my-scene.splinecode` and reference it as:

```tsx
<Spline scene="/scenes/my-scene.splinecode" />
```

Or with the runtime:

```ts
await app.load('/scenes/my-scene.splinecode');
```

This removes the CDN dependency and works fully offline / in private deployments.

### Self-hosted with the runtime

```html
<!-- Vanilla HTML -->
<canvas id="canvas3d"></canvas>
<script type="module">
  import { Application } from 'https://unpkg.com/@splinetool/runtime/build/runtime.js';
  const app = new Application(document.getElementById('canvas3d'));
  await app.load('/scenes/my-scene.splinecode');
</script>
```

---

## 8. Performance Notes

- A `.splinecode` file is typically 2–10 MB. Use `loading` placeholders to prevent layout shift.
- Disable Spline's default watermark via export settings (requires a paid Spline plan).
- Set `renderOnDemand: true` in the runtime options to pause rendering when the tab is hidden:

```ts
const app = new Application(canvas, { renderOnDemand: true });
```

- For mobile, consider showing a static image fallback:

```tsx
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (isMobile) return <img src="/hero-fallback.jpg" alt="Hero" />;
return <Spline scene="..." />;
```
