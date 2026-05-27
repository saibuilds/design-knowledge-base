# MagicUI — 50+ Animated Components

> MIT License. Install via shadcn registry.
> `npx shadcn@latest add "https://magicui.design/r/[component-name]"`

## Install
```bash
npx shadcn@latest add "https://magicui.design/r/animated-beam"
npx shadcn@latest add "https://magicui.design/r/border-beam"
npx shadcn@latest add "https://magicui.design/r/shimmer-button"
npx shadcn@latest add "https://magicui.design/r/magic-card"
npx shadcn@latest add "https://magicui.design/r/meteors"
npx shadcn@latest add "https://magicui.design/r/particles"
npx shadcn@latest add "https://magicui.design/r/ripple"
npx shadcn@latest add "https://magicui.design/r/animated-grid-pattern"
npx shadcn@latest add "https://magicui.design/r/retro-grid"
npx shadcn@latest add "https://magicui.design/r/dot-pattern"
npx shadcn@latest add "https://magicui.design/r/flickering-grid"
npx shadcn@latest add "https://magicui.design/r/globe"
npx shadcn@latest add "https://magicui.design/r/orbiting-circles"
npx shadcn@latest add "https://magicui.design/r/icon-cloud"
npx shadcn@latest add "https://magicui.design/r/bento-grid"
npx shadcn@latest add "https://magicui.design/r/marquee"
npx shadcn@latest add "https://magicui.design/r/blur-fade"
npx shadcn@latest add "https://magicui.design/r/word-rotate"
npx shadcn@latest add "https://magicui.design/r/text-reveal"
npx shadcn@latest add "https://magicui.design/r/number-ticker"
npx shadcn@latest add "https://magicui.design/r/animated-shiny-text"
npx shadcn@latest add "https://magicui.design/r/animated-gradient-text"
npx shadcn@latest add "https://magicui.design/r/hyper-text"
npx shadcn@latest add "https://magicui.design/r/box-reveal"
npx shadcn@latest add "https://magicui.design/r/spinning-text"
```

## Key Components

### Border Beam
```tsx
import { BorderBeam } from "@/components/magicui/border-beam"
<div className="relative rounded-xl overflow-hidden">
  <BorderBeam size={250} duration={12} delay={9} />
  <div className="p-8">Content with animated border beam</div>
</div>
```

### Shimmer Button
```tsx
import { ShimmerButton } from "@/components/magicui/shimmer-button"
<ShimmerButton className="shadow-2xl">
  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
    Shimmer Button
  </span>
</ShimmerButton>
```

### Marquee (infinite scroll)
```tsx
import { Marquee } from "@/components/magicui/marquee"
<Marquee pauseOnHover className="[--duration:20s]">
  {items.map((item) => <ReviewCard key={item.username} {...item} />)}
</Marquee>
<Marquee reverse pauseOnHover className="[--duration:20s]">
  {items.map((item) => <ReviewCard key={item.username} {...item} />)}
</Marquee>
```

### Globe
```tsx
import { Globe } from "@/components/magicui/globe"
// Interactive 3D globe with arcs — great for hero sections
<Globe className="top-28" />
```

### Particles
```tsx
import Particles from "@/components/magicui/particles"
<Particles className="absolute inset-0 z-0" quantity={100} ease={80} color="#ffffff" refresh />
```

### Meteors
```tsx
import { Meteors } from "@/components/magicui/meteors"
<div className="relative overflow-hidden rounded-xl">
  <Meteors number={20} />
  <div className="relative z-10 p-8">Card content</div>
</div>
```

### Bento Grid
```tsx
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
<BentoGrid className="lg:grid-rows-3">
  {features.map((feature) => (
    <BentoCard key={feature.name} {...feature} />
  ))}
</BentoGrid>
```

### Animated Beam (connecting lines between elements)
```tsx
import { AnimatedBeam } from "@/components/magicui/animated-beam"
// Draws an animated beam between two refs
<AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div7Ref} />
```

### Text Reveal (scroll-triggered)
```tsx
import { TextReveal } from "@/components/magicui/text-reveal"
<TextReveal text="Magic UI will change the way you design." />
```

### Number Ticker
```tsx
import { NumberTicker } from "@/components/magicui/number-ticker"
<p className="text-8xl font-bold">
  <NumberTicker value={100} />+
</p>
```

### Blur Fade (stagger entrance)
```tsx
import { BlurFade } from "@/components/magicui/blur-fade"
{images.map((img, idx) => (
  <BlurFade key={img.src} delay={0.25 + idx * 0.05} inView>
    <img src={img.src} />
  </BlurFade>
))}
```

### Hyper Text (letter scramble)
```tsx
import { HyperText } from "@/components/magicui/hyper-text"
<HyperText className="text-4xl font-bold text-white" text="HyperText" />
```

## All 50+ Components List
animations, animated-beam, animated-circular-progress-bar, animated-gradient-text,
animated-grid-pattern, animated-list, animated-shiny-text, animated-subscribe-button,
aurora-text, avatar-circles, bento-grid, blur-fade, blur-in, border-beam, box-reveal,
code-comparison, confetti, cool-mode, dot-pattern, fade-text, file-tree, flickering-grid,
globe, hyper-text, icon-cloud, interactive-hover-button, letter-pullup, line-shadow-text,
magic-card, marquee, meteors, morphing-text, neon-gradient-card, number-ticker,
orbiting-circles, particles, pulsating-button, rainbow-button, retro-grid,
ripple, safari, scratch-to-reveal, script-copy-btn, shimmer-button, shine-border,
shiny-button, sparkles-text, spinning-text, text-animate, text-reveal, ticker, tweet-card,
typing-animation, wavy-text, word-fade-in, word-pullup, word-rotate, zoom-blur
