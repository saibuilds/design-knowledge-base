# Rive — Interactive Animations Reference
_Updated: 2026-05-27 | Site: rive.app | Community: rive.app/community_

> Rive is a real-time interactive animation tool. Create once, run everywhere. Free tier includes unlimited personal files.

## Install

```bash
npm install @rive-app/react-canvas
# Lightweight runtime (no React)
npm install @rive-app/canvas
```

---

## 1. Basic Embed

```jsx
import { useRive } from '@rive-app/react-canvas'

export function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: '/animations/hero.riv',
    autoplay: true,
  })

  return (
    <div style={{ width: 400, height: 400 }}>
      <RiveComponent />
    </div>
  )
}
```

---

## 2. State Machine — Hover + Click Triggers

```jsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/button.riv',
    stateMachines: 'ButtonSM',   // name from Rive editor
    autoplay: true,
  })

  // Get inputs defined in the state machine
  const hoverInput = useStateMachineInput(rive, 'ButtonSM', 'isHovered')
  const clickInput = useStateMachineInput(rive, 'ButtonSM', 'onClick')

  return (
    <div
      style={{ width: 200, height: 80, cursor: 'pointer' }}
      onMouseEnter={() => { if (hoverInput) hoverInput.value = true }}
      onMouseLeave={() => { if (hoverInput) hoverInput.value = false }}
      onMouseDown={() =>  { if (clickInput) clickInput.fire() }}
    >
      <RiveComponent />
    </div>
  )
}
```

---

## 3. Number Input (drive with scroll / data)

```jsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useEffect } from 'react'

export function ScrollDrivenRive() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/progress.riv',
    stateMachines: 'ProgressSM',
    autoplay: true,
  })

  const progressInput = useStateMachineInput(rive, 'ProgressSM', 'progress')

  useEffect(() => {
    function onScroll() {
      if (!progressInput) return
      const maxScroll = document.body.scrollHeight - window.innerHeight
      progressInput.value = (window.scrollY / maxScroll) * 100  // 0–100
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [progressInput])

  return (
    <div style={{ width: '100%', height: '100vh', position: 'sticky', top: 0 }}>
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
```

---

## 4. Multiple Artboards (scenes in one file)

```jsx
import { useRive } from '@rive-app/react-canvas'

export function MultiArtboard({ artboard }) {
  const { RiveComponent } = useRive({
    src: '/animations/multi.riv',
    artboard: artboard,       // 'Hero', 'Card', 'Logo' etc.
    stateMachines: 'Main',
    autoplay: true,
  })

  return <RiveComponent style={{ width: '100%', height: '100%' }} />
}
```

---

## 5. Hero Animation Replacement for Video

```jsx
// Pattern: full-screen Rive instead of autoplay video
// Advantages: ~50-200KB vs 5-15MB video, GPU-accelerated, interactive

import { useRive } from '@rive-app/react-canvas'

export function HeroBackground() {
  const { RiveComponent } = useRive({
    src: '/animations/hero-bg.riv',
    stateMachines: 'Ambient',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,          // like object-fit: cover
      alignment: Alignment.Center,
    }),
  })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
```

---

## 6. Layout Fit Options

```js
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

const { RiveComponent } = useRive({
  src: '/animation.riv',
  layout: new Layout({
    fit: Fit.Contain,       // Fit.Cover | Fit.Fill | Fit.FitWidth | Fit.FitHeight | Fit.None
    alignment: Alignment.Center,  // TopLeft | TopCenter | TopRight | etc.
  }),
  autoplay: true,
})
```

---

## 7. Event Listening (Rive Events → JS)

```jsx
import { useRive, EventType } from '@rive-app/react-canvas'
import { useEffect } from 'react'

export function RiveWithEvents() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/interactive.riv',
    stateMachines: 'Main',
    autoplay: true,
  })

  useEffect(() => {
    if (!rive) return

    // Listen for Rive General Events
    const onRiveEvent = (event) => {
      const data = event.data
      console.log('Rive event:', data.name, data.properties)

      if (data.name === 'buttonClicked') {
        // trigger page navigation, analytics, etc.
        analytics.track('rive_cta_clicked')
      }
    }

    rive.on(EventType.RiveEvent, onRiveEvent)
    return () => rive.off(EventType.RiveEvent, onRiveEvent)
  }, [rive])

  return <RiveComponent style={{ width: 400, height: 400 }} />
}
```

---

## 8. Vanilla JS (no React)

```js
import { Rive, Layout, Fit } from '@rive-app/canvas'

const riveInstance = new Rive({
  src: '/animations/hero.riv',
  canvas: document.getElementById('rive-canvas'),
  autoplay: true,
  stateMachines: 'Main',
  layout: new Layout({ fit: Fit.Cover }),
  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas()
  },
})

// Resize
window.addEventListener('resize', () => {
  riveInstance.resizeDrawingSurfaceToCanvas()
})

// Get state machine inputs
const inputs = riveInstance.stateMachineInputs('Main')
const hoverInput = inputs.find(i => i.name === 'isHovered')
hoverInput.value = true
```

---

## 9. Performance Tips

| Tip | Detail |
|-----|--------|
| Use `.riv` not `.json` | Binary format is 2–5x smaller |
| Limit artboard size | Match canvas display size (avoid 4K art at 300px) |
| Disable autoplay when off-screen | Use IntersectionObserver to pause/resume |
| One canvas per Rive | Each Rive instance creates a WebGL/Canvas2D context |
| Prefer state machines over code-driven | SM logic runs in WASM, faster than JS polling |
| Use `@rive-app/canvas-lite` | Smaller runtime, no vector feathering |

```jsx
// Pause when off-screen
import { useRef, useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'

export function LazyRive() {
  const containerRef = useRef()
  const { rive, RiveComponent } = useRive({
    src: '/animation.riv',
    autoplay: false,
    stateMachines: 'Main',
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!rive) return
        entry.isIntersecting ? rive.play() : rive.pause()
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [rive])

  return (
    <div ref={containerRef} style={{ width: 400, height: 400 }}>
      <RiveComponent />
    </div>
  )
}
```

---

## 10. Community Resources

- **rive.app/community** — thousands of free .riv files (logos, buttons, icons, hero animations)
- Filter by: Trending / New / Interactions / Game / UI
- Download `.riv` file → drop in `/public/animations/`
- Check license: most community files are CC-BY or free for commercial use (verify per file)

### Notable free community files:
- Loading spinners (dozens of premium styles)
- Animated icons (hamburger menu, play/pause, check marks)
- Character rigs (walking, idle, react)
- Data visualization (animated charts)
- Button hover states
- Hero backgrounds (particle fields, fluid sims)
