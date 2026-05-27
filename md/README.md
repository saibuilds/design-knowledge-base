# Web Design Knowledge Base
_Updated: 2026-05-27 — 68 files_

> Local design library for Claude Code. Reference with: `~/Downloads/design-knowledge-base/md/[file].md`

## Quick Usage
```
Build a garden suite landing page. Reference:
- md/reference-sites/industry/garden-suites-adu.md for layout + ROI calculator
- md/components/lead-forms.md for multi-step lead capture + GHL webhook
- md/components/magicui.md for animated components
- md/animations/framer-motion.md for scroll reveals
```

---

## components
- [21st-dev.md](components/21st-dev.md) — Shimmer, magnetic, floating pill nav, spotlight card, typewriter, scramble, floating label
- [aceternity.md](components/aceternity.md) — Spotlight, Aurora, 3D card, Lamp, Wavy background, MovingBorder, InfiniteMovingCards, TracingBeam
- [magicui.md](components/magicui.md) — BorderBeam, ShimmerButton, Marquee, Globe, Particles, Meteors, BentoGrid, AnimatedBeam, TextReveal
- [shadcn.md](components/shadcn.md) — All shadcn/ui component install commands and usage patterns
- [tailwind-blocks.md](components/tailwind-blocks.md) — Hero, features, pricing, testimonials, footer blocks
- [navigation.md](components/navigation.md) — Floating pill, fullscreen hamburger, smart hide/show header, mobile drawer, scroll progress
- [hover-effects.md](components/hover-effects.md) — Magnetic button, cursor follower, image reveal, text scramble, card tilt, spotlight card
- [hover-dev.md](components/hover-dev.md) — EncryptButton, BubbleButton, FlipLink, SwipeCards, HoverImageLinks, SpringModal, DragToConfirm
- [page-transitions.md](components/page-transitions.md) — template.tsx, curtain wipe, slide direction, horizontal, stagger children, View Transition API
- [origin-ui.md](components/origin-ui.md) — ShimmerButton, OTPInput, TagInput, StatCard, CommandPalette, TanStack data table
- [data-display.md](components/data-display.md) — Animated stat ticker, timeline, before/after slider, gallery lightbox, infinite scroll, masonry
- [lead-forms.md](components/lead-forms.md) — Multi-step lead form, FB lead ad structure, GHL webhook, sticky CTA, trust elements

## animations
- [framer-motion.md](animations/framer-motion.md) — Scroll reveals, stagger, page transitions, useScroll+useTransform, drag, layout animations
- [gsap.md](animations/gsap.md) — Parallax, stagger, horizontal scroll, pin, character reveal, SVG draw-on, react hook
- [gsap-scrollsmoother.md](animations/gsap-scrollsmoother.md) — ScrollSmoother setup, data-speed/lag, modal pause, scrollTo, SPA cleanup
- [lenis.md](animations/lenis.md) — Lenis smooth scroll setup, GSAP integration, React hook, options
- [locomotive.md](animations/locomotive.md) — Locomotive Scroll v4, data attributes, React wrapper
- [animejs.md](animations/animejs.md) — Timeline, stagger, SVG morph, motion path, scroll observer, draggable
- [micro-interactions.md](animations/micro-interactions.md) — Button hover, input focus, card hover, loaders, toast, toggle animations
- [page-transitions.md](animations/page-transitions.md) — Full-page slide, curtain wipe panels, zoom+blur, SVG morph, GSAP clip-path, React Router
- [css-scroll-animations.md](animations/css-scroll-animations.md) — animation-timeline: scroll()/view(), progress bar, parallax, stacking cards, clip-path reveal

## 3d
- [r3f.md](3d/r3f.md) — React Three Fiber setup, useFrame, lights, materials, performance
- [drei-helpers.md](3d/drei-helpers.md) — Environment, Shadows, Controls, Text, Html, useGLTF, MeshTransmission, Float, Sparkles
- [spline.md](3d/spline.md) — Spline embed in React, event handling, lazy load, free scene tips
- [shaders.md](3d/shaders.md) — GLSL vertex/fragment, simplex noise, distortion, wave, particles, useFrame uniforms
- [three-js-vanilla.md](3d/three-js-vanilla.md) — Full renderer setup, OrbitControls, BufferGeometry particles, GLTF, raycasting, scroll camera
- [immersive-scroll.md](3d/immersive-scroll.md) — Camera path on scroll, section scenes, parallax layers, velocity distortion, fullscreen canvas+HTML
- [scroll-3d-patterns.md](3d/scroll-3d-patterns.md) — ScrollControls, GSAP scrub, horizontal scroll, model reveal, sticky scene, lerp utilities
- [camera-scroll.md](3d/camera-scroll.md) — CatmullRomCurve3 deep dive, tangent look-at, lerp vs spring, Blender workflow
- [postprocessing.md](3d/postprocessing.md) — Cinematic stack: SMAA+Bloom+DoF+ChromaticAberration+Noise+Vignette, scroll-reactive
- [physics.md](3d/physics.md) — @react-three/rapier: basic setup, click-to-throw, stacked boxes, mouse force field
- [theatre-js.md](3d/theatre-js.md) — Project/Sheet/Object, R3F editable(), scroll scrub, GSAP integration, state JSON export
- [rive.md](3d/rive.md) — Rive embed, state machine inputs, scroll-driven, Layout fit, Rive Events, vanilla JS
- [ogl-webgl.md](3d/ogl-webgl.md) — OGL lightweight WebGL: renderer, custom shaders, particles, post-processing, GLTF
- [pixijs.md](3d/pixijs.md) — PixiJS App, displacement filter, mouse ripple, ColorMatrix, spritesheet, interactive grid
- [curtainsjs.md](3d/curtainsjs.md) — Curtains.js hover distortion, scroll warp, gallery cross-fade shader, React integration
- [webgl-image-effects.md](3d/webgl-image-effects.md) — Ripple, pixel disintegration, cloth reveal, noise-warp, RGB split — full GLSL shaders
- [3d-portfolio-patterns.md](3d/3d-portfolio-patterns.md) — folio-2019 architecture, LoadingManager, GSAP reveal, cannon physics, postprocessing stack
- [free-assets.md](3d/free-assets.md) — Poly Haven (CC0), Sketchfab, pmndrs market, ambientCG, Draco/meshopt compression

## frameworks
- [nextjs.md](frameworks/nextjs.md) — App Router, template.tsx, server components, next/font, image optimization, metadata
- [supabase.md](frameworks/supabase.md) — Contact form, auth, file storage, real-time, free tier limits
- [vercel-deploy.md](frameworks/vercel-deploy.md) — Deploy Vite/Next, env vars, custom domains, Edge Functions, CLI reference
- [astro.md](frameworks/astro.md) — .astro anatomy, React islands, Content Collections, image opt, Tailwind, SSR adapters

## reference-sites / industry
- [construction.md](reference-sites/industry/construction.md) — Dark luxury hero, project showcase, testimonials, contact + Maps embed
- [kitchen-design.md](reference-sites/industry/kitchen-design.md) — Smallbone/Henrybuilt patterns: serif type, brass accent, collection grid, material selector, before/after
- [real-estate.md](reference-sites/industry/real-estate.md) — Compass/Zoopla patterns: property card, search hero, dual CTA, agent sidebar
- [property-listings.md](reference-sites/industry/property-listings.md) — Listing grid, filter bar, map+list split view, property hero gallery, mortgage estimate widget
- [mortgage-finance.md](reference-sites/industry/mortgage-finance.md) — Better.com patterns: trust bar, mortgage calculator, process timeline, multi-step form
- [garden-suites-adu.md](reference-sites/industry/garden-suites-adu.md) — Garden suite hero, suite type selector, permit process, ROI calculator (for gardensuites4you.ca)
- [saas.md](reference-sites/industry/saas.md) — Pricing table, feature comparison, testimonial grid

## reference-sites / agencies
- [lusion.md](reference-sites/agencies/lusion.md) — Lusion.co technique breakdown: WebGL shader, smooth scroll, hover distortion
- [active-theory.md](reference-sites/agencies/active-theory.md) — Active Theory patterns: preloader, GLSL transitions, Three.js scene manager
- [bruno-simon.md](reference-sites/bruno-simon.md) — Confirmed stack from package.json, Application.js architecture, cannon.js RaycastVehicle, R3F rebuild
- [codrops.md](reference-sites/codrops.md) — 25+ experiments with URLs: clip-path, GLSL, canvas, SVG, text effects

## tools
- [typescript-patterns.md](tools/typescript-patterns.md) — Generic components, discriminated unions, ComponentProps, Zod+RHF, R3F refs
- [state-management.md](tools/state-management.md) — Zustand, Jotai, TanStack Query, nuqs URL state, GSAP global store
- [figma-to-code.md](tools/figma-to-code.md) — Token pipeline, Style Dictionary, Dev Mode, Builder.io, frame naming → cva variants
- [performance.md](tools/performance.md) — Core Web Vitals, next/image, WebP/AVIF, code splitting, Three.js LOD, Lighthouse CI
- [cms-options.md](tools/cms-options.md) — Sanity, Contentful, Strapi, Prismic, Notion, Directus — when-to-use table
- [omma.md](tools/omma.md) — Omma Build visual 3D builder: 20 free plugins, embed in Next.js, DIY R3F equivalent

## seo
- [seo-renovation-toronto.md](seo/seo-renovation-toronto.md) — Keywords, competitor analysis, LocalBusiness schema, HomeStars/Google Maps Pack strategy
- [seo-garden-suites-adu.md](seo/seo-garden-suites-adu.md) — ADU/garden suite keywords, permit FAQ schema, neighbourhood eligibility content
- [seo-real-estate.md](seo/seo-real-estate.md) — Agent/brokerage keywords, listing schema, neighbourhood pages, dynamic OG images
- [seo-technical-checklist.md](seo/seo-technical-checklist.md) — Next.js 14 Core Web Vitals, JSON-LD templates, sitemap.ts, robots.ts, image optimization
- [seo-content-templates.md](seo/seo-content-templates.md) — Service page, location page, cost guide, meta title formulas, GBP optimization

## assets
- [lucide-phosphor.md](assets/icons/lucide-phosphor.md) — Icon library usage, common icon names for renovation/real estate
- [pairings.md](assets/fonts/pairings.md) — Font pairs for luxury, modern, editorial, tech styles
- [palettes.md](assets/colors/palettes.md) — Color systems: dark luxury, clean white, earth tones, finance blue
