# Codrops — Design Reference & Experiment Library

**Site**: https://tympanus.net/codrops (redirects from codrops.com)
**Webzibition**: https://tympanus.net/codrops/webzibition (2000+ curated sites)
**GitHub**: https://github.com/codrops (all source code, MIT licensed)

Codrops is the gold standard reference for creative web development. Every experiment includes a **full source download** and an **article explaining the technique**. Use it to reverse-engineer effects you see in the wild.

---

## How to Extract Patterns from Codrops Demos

1. Open the demo page
2. Click **"Download Source"** (top of every article)
3. Unzip → open `index.html` in editor
4. Key files to check:
   - `js/` — look for the main animation file
   - `css/` or `style.css` — any CSS-only effects
   - `glsl/` or shader strings in JS — WebGL shaders
5. Use browser DevTools → Sources tab to set breakpoints on animation triggers
6. Search for `gsap.to`, `anime(`, `ScrollTrigger`, `gl.` to find the effect core

---

## Playground Experiments (Latest — May 2026)

### Scroll Effects

| Title | URL | Technique |
|---|---|---|
| On-Scroll 3D Carousel | https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/ | CSS 3D + scroll sync |
| Exploration of On-Scroll Layout Formations | https://tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/ | GSAP ScrollTrigger pin |
| Consecutive Scroll Animations with One Element | https://tympanus.net/codrops/2024/11/20/consecutive-scroll-animations-with-one-element/ | GSAP Flip + ScrollTrigger |
| Scroll-based SVG Filter Animations on Text | https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/ | SVG feTurbulence + scroll |
| Exploring Playful Context-Aware Animations for Fixed Elements | https://tympanus.net/codrops/2024/10/09/exploring-playful-context-aware-animations-for-fixed-elements/ | Scroll-based show/hide |
| Staggered (3D) Grid Animations with Scroll-Triggered Effects | https://tympanus.net/codrops/2024/10/16/staggered-3d-grid-animations-with-scroll-triggered-effects/ | GSAP + CSS 3D grid |
| Blurry Text Reveal on Scroll | https://tympanus.net/codrops/2024/04/23/blurry-text-reveal-on-scroll/ | CSS blur filter + scroll |
| Some On-Scroll Text Highlight Animations | https://tympanus.net/codrops/2024/04/17/some-on-scroll-text-highlight-animations/ | SVG/CSS scroll progress |

### Hover Effects

| Title | URL | Technique |
|---|---|---|
| Hover Animations for Terminal-like Typography | https://tympanus.net/codrops/2024/06/19/hover-animations-for-terminal-like-typography/ | JS char scramble on hover |
| Push Animation on Grid Items | https://tympanus.net/codrops/2024/06/05/push-animation-on-grid-items/ | CSS transform grid push |
| Hover Motion Intro Animation | https://tympanus.net/codrops/2024/05/29/hover-motion-intro-animation/ | Mouse-tracked grid motion |

### GSAP / JavaScript Animations

| Title | URL | Technique |
|---|---|---|
| A Playful Clip Menu with GSAP's easeReverse | https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/ | GSAP easeReverse + clip-path |
| Animating in Frames: Repeating Image Transition | https://tympanus.net/codrops/2025/04/28/animating-in-frames-repeating-image-transition/ | Frame-by-frame path animation |
| Made With GSAP: Building a Fun Gravity-Based Mouse Trail | https://tympanus.net/codrops/2026/05/20/made-with-gsap-building-a-fun-gravity-based-mouse-trail/ | GSAP physics mouse trail |

### WebGL / 3D / WebGPU

| Title | URL | Technique |
|---|---|---|
| WebGPU Scanning Effect with Depth Maps | https://tympanus.net/codrops/2025/03/31/webgpu-scanning-effect-with-depth-maps/ | WebGPU + depth map shaders |
| Interactive 3D with Three.js BatchedMesh and WebGPURenderer | https://tympanus.net/codrops/2024/10/30/interactive-3d-with-three-js-batchedmesh-and-webgpurenderer/ | Three.js BatchedMesh + TSL |
| Origami: 12 Free Animated 3D Objects | https://tympanus.net/codrops/2024/07/30/origami-12-free-animated-3d-objects/ | React Three Fiber + GSAP |
| Model Texture Transition and Procedural Radial Noise using WebGL | https://tympanus.net/codrops/2024/05/02/model-texture-transition-and-procedural-radial-noise-using-webgl/ | Three.js + GLSL noise |
| 80s Business Tech and Seamless Scene Transitions (Shader.se) | https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/ | WebGPU scroll-driven pipeline |

### Tutorials (May 2026)

| Title | URL | Technique |
|---|---|---|
| Building a Scroll-Driven 3D Cube Gallery in Webflow with GSAP | https://tympanus.net/codrops/2026/05/26/building-a-scroll-driven-3d-cube-gallery-in-webflow-with-gsap/ | GSAP + Webflow + CSS 3D |
| Creating Scroll-Driven SVG Map Animations with GSAP | https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/ | GSAP DrawSVG + ScrollTrigger |
| Whooshes, Snaps and Shaders: Interface Motion with Adrien Vanderpotte | https://tympanus.net/codrops/2026/05/27/whooshes-snaps-and-shaders-adrien-vanderpotte-and-the-feeling-of-the-interface/ | Motion design philosophy |

---

## Categories to Bookmark

| Category | URL | What you'll find |
|---|---|---|
| Playground | https://tympanus.net/codrops/category/playground/ | Pure experiments, no tutorial needed |
| Tutorials | https://tympanus.net/codrops/category/tutorials/ | Step-by-step with source |
| Collective | https://tympanus.net/codrops/category/collective/ | Weekly links roundup |
| Webzibition | https://tympanus.net/codrops/webzibition | 2000+ curated award-worthy sites |

---

## Key Recurring Techniques at Codrops

### Page Transitions
- GSAP timeline + `barba.js` for SPA-style transitions
- Curtains.js or Three.js for full-page WebGL morphs
- CSS `clip-path` wipes timed with route changes

### Hover Effects
- `mousemove` → normalized coords → `lerp` to smooth position
- SVG filter `feTurbulence` feDisplacementMap on hover (liquid distort)
- CSS perspective + `rotateX/Y` based on cursor offset (magnetic tilt)
- Text: char-by-char scramble, stagger opacity, clip-path reveal

### Scroll Effects
- GSAP ScrollTrigger `scrub` for parallax layers
- `pin: true` for sticky section storytelling
- CSS `animation-timeline: view()` for pure-CSS reveals
- SplitText + stagger for word/line reveals

### WebGL Patterns
- Three.js + custom GLSL for image distortion
- Curtains.js for DOM-synced WebGL planes
- R3F (React Three Fiber) for React apps
- WebGPU for cutting-edge experiments

---

## Getting the Most from Codrops

**Pattern extraction workflow:**
```
1. Find demo you like → View Source → find the main JS file
2. Search for: `gsap.to(`, `anime(`, `new THREE.`, `new Curtains(`
3. Look at the @keyframes in CSS
4. Check shaders (GLSL strings or .glsl files)
5. Copy the minimal version into your project
6. Strip non-essential parts (UI controls, specific selectors)
```

**Recommended starting demos** for common client requests:
- "Smooth scroll with parallax" → On-Scroll 3D Carousel + GSAP ScrollSmoother
- "Image hover effect" → any WebGL/Curtains.js demo
- "Text animation on scroll" → Blurry Text Reveal, Text Highlight
- "Page transitions" → search "page transitions" in Codrops tutorials
- "3D product viewer" → Origami or Model Texture Transition demos
