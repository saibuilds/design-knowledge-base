# Web Performance

## Core Web Vitals Targets

| Metric | Full Name                  | Good      | Needs Work  | Poor       |
|--------|----------------------------|-----------|-------------|------------|
| LCP    | Largest Contentful Paint   | ≤ 2.5s    | 2.5s–4.0s   | > 4.0s     |
| FID    | First Input Delay          | ≤ 100ms   | 100ms–300ms | > 300ms    |
| INP    | Interaction to Next Paint  | ≤ 200ms   | 200ms–500ms | > 500ms    |
| CLS    | Cumulative Layout Shift    | ≤ 0.1     | 0.1–0.25    | > 0.25     |
| FCP    | First Contentful Paint     | ≤ 1.8s    | 1.8s–3.0s   | > 3.0s     |
| TTFB   | Time to First Byte         | ≤ 800ms   | 800ms–1.8s  | > 1.8s     |

> FID is being replaced by INP as the Core Web Vital for interactivity.

---

## Image Optimization

### next/image
```tsx
import Image from "next/image";

// Optimal LCP hero image
export function Hero() {
  return (
    <div className="relative h-[600px]">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        priority              // preload — use on above-fold images
        sizes="100vw"
        className="object-cover"
        quality={85}          // default 75, 85 is sweet spot
        placeholder="blur"    // needs blurDataURL or local image
      />
    </div>
  );
}

// Below-fold images
export function GalleryItem({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      loading="lazy"          // default for non-priority images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

### Sharp (Node.js image processing)
```bash
npm install sharp
```

```ts
import sharp from "sharp";
import path from "path";

// Convert and resize image
async function optimizeImage(inputPath: string, outputPath: string) {
  await sharp(inputPath)
    .resize(800, 600, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile(outputPath);

  // AVIF (smaller, slower to encode)
  await sharp(inputPath)
    .resize(800, 600, { fit: "cover" })
    .avif({ quality: 60 })
    .toFile(outputPath.replace(".webp", ".avif"));
}

// Generate blur placeholder (base64)
async function getBlurDataURL(imagePath: string): Promise<string> {
  const buffer = await sharp(imagePath)
    .resize(10, 10, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}
```

### WebP / AVIF with `<picture>`
```html
<picture>
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" alt="Hero" width="1200" height="600" loading="eager" fetchpriority="high" />
</picture>
```

### Image sizing checklist
- Set explicit `width` and `height` to prevent CLS
- Use `srcset` and `sizes` for responsive images
- `priority` / `fetchpriority="high"` on LCP image only
- Compress: target < 200KB for hero, < 50KB for thumbnails
- Use CDN with automatic WebP/AVIF conversion (Cloudinary, imgix, Vercel)

---

## Font Optimization

### font-display: swap
```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-var.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;       /* show fallback immediately, swap when loaded */
}
```

### Preload critical fonts
```html
<!-- In <head>, before stylesheets -->
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### Next.js font optimization (zero layout shift)
```ts
// app/layout.tsx
import { Inter, Cal_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Self-hosted → no external request
const calSans = Cal_Sans({
  subsets: ["latin"],
  variable: "--font-cal",
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${calSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

```css
/* tailwind.config.ts */
fontFamily: {
  sans: ["var(--font-inter)"],
  display: ["var(--font-cal)"],
}
```

### Subset fonts
```bash
# Install pyftsubset (fonttools)
pip install fonttools

# Subset to Latin only
pyftsubset Inter.ttf \
  --output-file=inter-latin.woff2 \
  --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

### Font loading anti-patterns
```css
/* BAD: font-display: block causes invisible text */
font-display: block;

/* BAD: no preload = late discovery */
/* <link> for font added at end of body */

/* BAD: loading many weights */
font-weight: 100 900; /* OK if variable font */
/* Loading 400, 500, 600, 700 as separate files = 4 requests */
```

---

## Bundle Size

### Code splitting with dynamic imports
```tsx
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";

// Next.js
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg" />,
  ssr: false, // client-only (e.g., Three.js)
});

// React (Vite / SPA)
const ThreeScene = lazy(() => import("@/components/ThreeScene"));

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThreeScene />
    </Suspense>
  );
}
```

### Dynamic imports for libraries
```ts
// Load heavy library only when needed
async function exportToPDF() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.text("Hello", 10, 10);
  doc.save("file.pdf");
}

// Load on user interaction
button.addEventListener("click", async () => {
  const { default: confetti } = await import("canvas-confetti");
  confetti({ particleCount: 100 });
});
```

### Tree shaking
```ts
// BAD: imports entire lodash (~70KB)
import _ from "lodash";
const sorted = _.sortBy(arr, "name");

// GOOD: import only what you need
import sortBy from "lodash/sortBy";

// BEST: use native or lodash-es
import { sortBy } from "lodash-es"; // tree-shakeable ESM
const sorted = sortBy(arr, "name");
```

### Bundle analysis
```bash
# Next.js
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({});

# Run
ANALYZE=true npm run build
```

```bash
# Vite
npm install -D rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from "rollup-plugin-visualizer";
plugins: [visualizer({ open: true })]
```

---

## 3D Performance (Three.js / R3F)

### Level of Detail (LOD)
```tsx
import { LOD } from "three";

const lod = new LOD();
lod.addLevel(highDetailMesh, 0);    // < 10 units away
lod.addLevel(medDetailMesh, 10);    // 10-50 units
lod.addLevel(lowDetailMesh, 50);    // > 50 units

scene.add(lod);
lod.update(camera); // call in animation loop
```

### Dispose resources to prevent memory leaks
```ts
function disposeObject(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        mat.map?.dispose();
        mat.normalMap?.dispose();
        mat.roughnessMap?.dispose();
        mat.metalnessMap?.dispose();
        mat.dispose();
      });
    }
  });
}

// In React cleanup
useEffect(() => {
  return () => disposeObject(sceneRef.current);
}, []);
```

### Offscreen Canvas (move render off main thread)
```ts
// main.ts
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker(new URL("./render.worker.ts", import.meta.url));
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

```ts
// render.worker.ts
import * as THREE from "three";

self.onmessage = ({ data }) => {
  const { canvas } = data;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  // ... full Three.js setup here
};
```

### R3F performance tips
```tsx
import { Canvas } from "@react-three/fiber";
import { Bvh, BakeShadows, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}           // cap device pixel ratio
      performance={{ min: 0.5 }} // auto-reduce quality under load
      gl={{ antialias: false }} // disable for performance
    >
      <AdaptiveDpr pixelated />  {/* reduces DPR when fps drops */}
      <BakeShadows />            {/* freeze shadow maps */}
      <Bvh>                      {/* BVH raycasting for large scenes */}
        <YourScene />
      </Bvh>
    </Canvas>
  );
}
```

---

## Animation Performance

### Only animate transform and opacity (GPU composited)
```css
/* GOOD: GPU composited — no layout, no paint */
.animate-slide {
  transform: translateX(-100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.animate-slide.visible {
  transform: translateX(0);
}

/* BAD: triggers layout recalculation */
.animate-bad {
  left: -100%;         /* layout */
  margin-top: 20px;    /* layout */
  width: 200px;        /* layout */
  transition: left 300ms;
}
```

### will-change
```css
/* Promote to its own GPU layer before animation */
.modal {
  will-change: transform, opacity;
}

/* Remove after animation to free GPU memory */
/* In JS: element.style.willChange = 'auto'; */
```

### GPU compositing with Framer Motion
```tsx
import { motion } from "framer-motion";

// GOOD: only transform/opacity
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// BAD: animating layout properties
<motion.div
  initial={{ height: 0 }}   // triggers layout — use scaleY instead
  animate={{ height: "auto" }}
>

// BETTER: scale instead of height
<motion.div
  initial={{ scaleY: 0, originY: 0 }}
  animate={{ scaleY: 1 }}
>
```

### requestAnimationFrame pattern
```ts
let rafId: number;

function animate() {
  // update state
  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}

animate();

// Cleanup
cancelAnimationFrame(rafId);
```

---

## Lighthouse Audit Workflow

### Run Lighthouse
```bash
# Via CLI
npm install -g lighthouse
lighthouse https://mysite.com --output=html --output-path=./report.html

# Chrome DevTools: F12 → Lighthouse tab → Analyze page load
```

### Common fixes by category

**Performance (LCP)**
```
Issue: LCP image not preloaded
Fix: Add <link rel="preload"> for hero image

Issue: Render-blocking resources
Fix: defer/async scripts, preload fonts

Issue: Large JS bundle
Fix: Code splitting, dynamic imports
```

**Performance (CLS)**
```
Issue: Images without dimensions
Fix: Always set width and height on <img>

Issue: Dynamic content injection above fold
Fix: Reserve space with min-height on containers

Issue: Web fonts causing FOUT
Fix: font-display: swap + preload
```

**Accessibility**
```
Issue: Missing alt text
Fix: Add descriptive alt to all <img>

Issue: Low contrast
Fix: Use contrast ratio >= 4.5:1 for text

Issue: Missing ARIA labels
Fix: aria-label on icon buttons
```

**Best Practices**
```
Issue: Images not using HTTPS
Fix: Update all src to https://

Issue: Console errors
Fix: Fix all JS errors before audit
```

### Automated Lighthouse in CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - run: npx lhci autorun
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": { "url": ["http://localhost:3000"] },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

---

## React DevTools Profiler

### Enable
Chrome/Firefox → install React DevTools extension  
DevTools → Profiler tab → Record → interact → Stop

### Reading the flamegraph
- Width = render time (wider = slower)
- Yellow = slow component (>16ms)
- Gray = not re-rendered

### Common issues and fixes

**Unnecessary re-renders**
```tsx
// Problem: parent re-renders → child re-renders with same props
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveChild data={staticData} /> {/* re-renders on every count change */}
    </>
  );
}

// Fix: memo
const ExpensiveChild = memo(function ExpensiveChild({ data }: { data: Data }) {
  return <div>{/* expensive render */}</div>;
});
```

**Unstable references**
```tsx
// Problem: new object/array on every render breaks memo
function Parent() {
  const options = { color: "red" }; // new ref every render!
  return <Child options={options} />;
}

// Fix: useMemo / useCallback
function Parent() {
  const options = useMemo(() => ({ color: "red" }), []);
  const handleClick = useCallback(() => console.log("clicked"), []);
  return <Child options={options} onClick={handleClick} />;
}
```

**Expensive computations**
```tsx
// Problem: filtering 10k items on every render
function List({ items, query }: { items: Item[]; query: string }) {
  const filtered = items.filter(i => i.name.includes(query)); // runs every render

  // Fix: useMemo
  const filtered = useMemo(
    () => items.filter(i => i.name.includes(query)),
    [items, query]
  );

  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}
```

### Why Did You Render
```bash
npm install -D @welldone-software/why-did-you-render
```

```ts
// src/wdyr.ts (import first in index.tsx)
import React from "react";
if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, { trackAllPureComponents: true });
}
```
