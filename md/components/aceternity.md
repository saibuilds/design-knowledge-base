# Aceternity UI — 100+ Premium-Style Free Components

> MIT License. All code is yours.
> Install: `npx shadcn@latest add "https://ui.aceternity.com/registry/[slug]"`

## Install
```bash
# Dependencies first
npm install framer-motion clsx tailwind-merge

# Components
npx shadcn@latest add "https://ui.aceternity.com/registry/3d-card-effect"
npx shadcn@latest add "https://ui.aceternity.com/registry/aurora-background"
npx shadcn@latest add "https://ui.aceternity.com/registry/background-beams"
npx shadcn@latest add "https://ui.aceternity.com/registry/background-gradient"
npx shadcn@latest add "https://ui.aceternity.com/registry/bento-grid"
npx shadcn@latest add "https://ui.aceternity.com/registry/card-hover-effect"
npx shadcn@latest add "https://ui.aceternity.com/registry/card-spotlight"
npx shadcn@latest add "https://ui.aceternity.com/registry/canvas-reveal-effect"
npx shadcn@latest add "https://ui.aceternity.com/registry/cover"
npx shadcn@latest add "https://ui.aceternity.com/registry/floating-navbar"
npx shadcn@latest add "https://ui.aceternity.com/registry/glowing-stars"
npx shadcn@latest add "https://ui.aceternity.com/registry/hero-highlight"
npx shadcn@latest add "https://ui.aceternity.com/registry/infinite-moving-cards"
npx shadcn@latest add "https://ui.aceternity.com/registry/lamp"
npx shadcn@latest add "https://ui.aceternity.com/registry/moving-border"
npx shadcn@latest add "https://ui.aceternity.com/registry/parallax-scroll"
npx shadcn@latest add "https://ui.aceternity.com/registry/pin-container"
npx shadcn@latest add "https://ui.aceternity.com/registry/placeholders-and-vanish-input"
npx shadcn@latest add "https://ui.aceternity.com/registry/shooting-stars"
npx shadcn@latest add "https://ui.aceternity.com/registry/sparkles"
npx shadcn@latest add "https://ui.aceternity.com/registry/spotlight"
npx shadcn@latest add "https://ui.aceternity.com/registry/sticky-scroll-reveal"
npx shadcn@latest add "https://ui.aceternity.com/registry/tabs"
npx shadcn@latest add "https://ui.aceternity.com/registry/text-generate-effect"
npx shadcn@latest add "https://ui.aceternity.com/registry/text-reveal-card"
npx shadcn@latest add "https://ui.aceternity.com/registry/timeline"
npx shadcn@latest add "https://ui.aceternity.com/registry/tracing-beam"
npx shadcn@latest add "https://ui.aceternity.com/registry/typewriter-effect"
npx shadcn@latest add "https://ui.aceternity.com/registry/wavy-background"
npx shadcn@latest add "https://ui.aceternity.com/registry/wobble-card"
```

## Key Components

### Spotlight (cursor spotlight effect)
```tsx
import { Spotlight } from "@/components/aceternity/spotlight"
<div className="relative overflow-hidden min-h-screen bg-black/[0.96] antialiased">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
  <div className="relative z-10 p-4 max-w-7xl mx-auto">
    <h1 className="text-4xl md:text-7xl font-bold text-white text-center">
      Spotlight Effect
    </h1>
  </div>
</div>
```

### Aurora Background
```tsx
import { AuroraBackground } from "@/components/aceternity/aurora-background"
<AuroraBackground>
  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
    className="relative flex flex-col gap-4 items-center justify-center px-4">
    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
      Background lights are cool you know
    </div>
  </motion.div>
</AuroraBackground>
```

### 3D Card Effect
```tsx
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/3d-card-effect"
<CardContainer className="inter-var">
  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
    <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
      Make things float in air
    </CardItem>
    <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Hover over this card to unleash the power of CSS perspective
    </CardItem>
    <CardItem translateZ="100" className="w-full mt-4">
      <img src="/thumbnail.png" className="h-60 w-full object-cover rounded-xl" />
    </CardItem>
  </CardBody>
</CardContainer>
```

### Lamp Effect
```tsx
import { LampContainer } from "@/components/aceternity/lamp"
<LampContainer>
  <motion.h1 initial={{ opacity: 0.5, y: 100 }} whileInView={{ opacity: 1, y: 80 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
    Build lamps <br /> the right way
  </motion.h1>
</LampContainer>
```

### Wavy Background
```tsx
import { WavyBackground } from "@/components/aceternity/wavy-background"
<WavyBackground className="max-w-4xl mx-auto pb-40" colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}>
  <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
    Hero waves
  </p>
</WavyBackground>
```

### Moving Border (animated gradient border)
```tsx
import { MovingBorder } from "@/components/aceternity/moving-border"
<button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
  <MovingBorder duration={3000} rx="30%" ry="30%">
    <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
  </MovingBorder>
  <span className="relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm bg-slate-950 text-white">
    Moving Borders
  </span>
</button>
```

### Infinite Moving Cards (testimonials)
```tsx
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards"
<InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
```

### Text Generate Effect
```tsx
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
<TextGenerateEffect words="Words are flowing like magic" className="text-white" />
```

### Sticky Scroll Reveal
```tsx
import { StickyScroll } from "@/components/aceternity/sticky-scroll-reveal"
<StickyScroll content={content} contentClassName="bg-amber-900" />
// content: [{ title: "...", description: "...", content: <div /> }]
```

### Background Beams
```tsx
import { BackgroundBeams } from "@/components/aceternity/background-beams"
<div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
  <div className="max-w-2xl mx-auto p-4 relative z-10">
    <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
      Background Beams
    </h1>
  </div>
  <BackgroundBeams />
</div>
```

### Canvas Reveal Effect (on hover)
```tsx
import { CanvasRevealEffect } from "@/components/aceternity/canvas-reveal-effect"
<div className="relative group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
  <AnimatePresence>
    {hovered && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0">
        <CanvasRevealEffect animationSpeed={5} containerClassName="bg-sky-600"
          colors={[[125, 211, 252]]} />
      </motion.div>
    )}
  </AnimatePresence>
  <div className="relative z-20 p-8">Content here</div>
</div>
```

### Tracing Beam (scroll progress line)
```tsx
import { TracingBeam } from "@/components/aceternity/tracing-beam"
<TracingBeam className="px-6">
  <div className="max-w-2xl mx-auto antialiased pt-4 relative">
    {content.map((item, idx) => (
      <div key={`content-${idx}`} className="mb-10">
        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">{item.badge}</h2>
        <p className="text-xl mb-4">{item.title}</p>
        {item.description}
      </div>
    ))}
  </div>
</TracingBeam>
```

### Timeline
```tsx
import { Timeline } from "@/components/aceternity/timeline"
const data = [
  { title: "2024", content: <p>Content for 2024...</p> },
  { title: "2023", content: <p>Content for 2023...</p> },
]
<Timeline data={data} />
```
