# PixiJS — 2D WebGL Renderer Reference
_Updated: 2026-05-27 | License: MIT_

> PixiJS is the fastest 2D WebGL renderer. Perfect for: image distortion effects, interactive backgrounds, sprite animations, displacement maps, and canvas-heavy landing pages.

## Install

```bash
npm install pixi.js
# v8 (latest)
npm install pixi.js@8
```

---

## 1. Application Setup

```js
import { Application, Assets } from 'pixi.js'

const app = new Application()

await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,      // transparent
  antialias: true,
  resolution: Math.min(window.devicePixelRatio, 2),
  autoDensity: true,
})

document.getElementById('canvas-container').appendChild(app.canvas)

// Resize
window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
})

// Ticker (render loop)
app.ticker.add((ticker) => {
  const delta = ticker.deltaTime   // frames elapsed since last tick
  const elapsed = ticker.lastTime / 1000  // seconds
})
```

---

## 2. Stage, Container, Sprite

```js
import { Container, Sprite, Assets } from 'pixi.js'

// Preload assets
await Assets.load([
  '/images/hero.jpg',
  '/images/displacement.png',
])

// Container (like a div — groups objects)
const container = new Container()
app.stage.addChild(container)

// Sprite
const texture = await Assets.load('/images/hero.jpg')
const sprite  = new Sprite(texture)

// Anchor (pivot point)
sprite.anchor.set(0.5)     // center (0.5, 0.5)

// Position
sprite.x = app.screen.width  / 2
sprite.y = app.screen.height / 2

// Scale to cover
const scale = Math.max(
  app.screen.width  / sprite.width,
  app.screen.height / sprite.height
)
sprite.scale.set(scale)

container.addChild(sprite)
```

---

## 3. Displacement Map Effect (image distortion)

```js
import { Sprite, DisplacementFilter, Assets, TilingSprite } from 'pixi.js'

// Load displacement map (grayscale noise texture)
const dispTexture = await Assets.load('/textures/displacement.png')
const dispSprite  = new Sprite(dispTexture)
dispSprite.texture.source.addressMode = 'repeat'  // tile the map
app.stage.addChild(dispSprite)

const displacementFilter = new DisplacementFilter({
  sprite: dispSprite,
  scale: 30,    // distortion strength
})

// Apply to any container
container.filters = [displacementFilter]

// Animate displacement map
app.ticker.add(() => {
  dispSprite.x += 0.5
  dispSprite.y += 0.3
})
```

---

## 4. Mouse-Reactive Displacement (hover ripple)

```js
import { Sprite, DisplacementFilter, Assets } from 'pixi.js'

const dispTexture = await Assets.load('/textures/ripple.png')
const dispSprite  = new Sprite(dispTexture)
dispSprite.anchor.set(0.5)
app.stage.addChild(dispSprite)

const filter = new DisplacementFilter({ sprite: dispSprite, scale: 0 })
app.stage.filters = [filter]

// Track mouse
let mouseX = app.screen.width  / 2
let mouseY = app.screen.height / 2
let targetX = mouseX
let targetY = mouseY
let strength = 0

app.canvas.addEventListener('mousemove', (e) => {
  targetX = e.clientX
  targetY = e.clientY
  strength = 60
})

app.ticker.add(() => {
  // Lerp position
  mouseX += (targetX - mouseX) * 0.1
  mouseY += (targetY - mouseY) * 0.1

  dispSprite.x = mouseX
  dispSprite.y = mouseY

  // Fade strength
  strength *= 0.95
  filter.scale.set(strength)
})
```

---

## 5. ColorMatrix Filter (color grading)

```js
import { ColorMatrixFilter } from 'pixi.js'

const colorFilter = new ColorMatrixFilter()

// Presets
colorFilter.greyscale(0.5)      // 0 = full color, 1 = full grey
colorFilter.brightness(1.2)
colorFilter.contrast(1.3)
colorFilter.saturate(1.5)       // boost saturation
colorFilter.hue(30)             // rotate hue by 30 degrees
colorFilter.night(0.5)          // night-vision effect
colorFilter.vintage()           // film vintage
colorFilter.technicolor()       // old Technicolor film

// Custom matrix (full control)
colorFilter.matrix = [
  1, 0, 0, 0, 0,   // R
  0, 1, 0, 0, 0,   // G
  0, 0, 1, 0, 0,   // B
  0, 0, 0, 1, 0,   // A
]

sprite.filters = [colorFilter]

// Animate (e.g. grayscale → color on hover)
let progress = 0
sprite.on('pointerenter', () => {
  app.ticker.add(function colorIn() {
    progress = Math.min(1, progress + 0.05)
    colorFilter.saturate(progress * 2 - 1)
    if (progress >= 1) app.ticker.remove(colorIn)
  })
})
```

---

## 6. Blur Filter + Interactive Hover

```js
import { BlurFilter, Sprite } from 'pixi.js'

const blurFilter = new BlurFilter({ strength: 8, quality: 4 })
sprite.filters = [blurFilter]

// Interactive
sprite.eventMode = 'static'     // enables mouse events
sprite.cursor = 'pointer'

sprite.on('pointerenter', () => {
  // Animate blur to 0
  const unblur = app.ticker.add(() => {
    blurFilter.strength = Math.max(0, blurFilter.strength - 0.5)
    if (blurFilter.strength <= 0) app.ticker.remove(unblur)
  })
})

sprite.on('pointerleave', () => {
  const reblur = app.ticker.add(() => {
    blurFilter.strength = Math.min(8, blurFilter.strength + 0.5)
    if (blurFilter.strength >= 8) app.ticker.remove(reblur)
  })
})
```

---

## 7. Sprite Sheet Animation

```js
import { Assets, AnimatedSprite, Spritesheet } from 'pixi.js'

// Load atlas JSON (TexturePacker format)
const sheet = await Assets.load('/sprites/character.json')

// Create animated sprite from frames
const frames = Object.keys(sheet.textures)
  .filter(key => key.startsWith('walk_'))
  .map(key => sheet.textures[key])

const animated = new AnimatedSprite(frames)
animated.animationSpeed = 0.15   // frames per tick
animated.loop = true
animated.anchor.set(0.5)
animated.x = app.screen.width  / 2
animated.y = app.screen.height / 2
animated.scale.set(2)

app.stage.addChild(animated)
animated.play()

// Swap animation
function setState(state) {
  const newFrames = Object.keys(sheet.textures)
    .filter(key => key.startsWith(`${state}_`))
    .map(key => sheet.textures[key])

  animated.textures = newFrames
  animated.play()
}
```

---

## 8. BitmapFont Text (GPU-accelerated text)

```js
import { BitmapFont, BitmapText, Assets } from 'pixi.js'

// Option 1: Install a pre-made bitmap font
await Assets.load('/fonts/headline.fnt')

const text = new BitmapText({
  text: 'HELLO WORLD',
  style: {
    fontFamily: 'Headline',
    fontSize: 72,
    tint: 0xffffff,
    letterSpacing: 4,
  }
})
text.anchor.set(0.5)
text.x = app.screen.width  / 2
text.y = app.screen.height / 2
app.stage.addChild(text)

// Option 2: Generate from HTML font at runtime
BitmapFont.from('MyFont', {
  fontFamily: 'Inter',
  fontSize: 48,
  fill: '#ffffff',
  fontWeight: '700',
}, {
  chars: BitmapFont.ASCII,
  resolution: 2,
})

const label = new BitmapText({ text: 'Dynamic', style: { fontFamily: 'MyFont', fontSize: 48 } })
```

---

## 9. Graphics (procedural shapes)

```js
import { Graphics } from 'pixi.js'

const g = new Graphics()

// Filled rounded rect
g.roundRect(0, 0, 200, 60, 12)
g.fill({ color: 0x6200ea, alpha: 0.9 })

// Stroke
g.roundRect(0, 0, 200, 60, 12)
g.stroke({ color: 0xffffff, width: 2, alpha: 0.3 })

// Circle
g.circle(100, 100, 50)
g.fill({ color: 0xff0055 })

// Animated morph
app.ticker.add((t) => {
  g.clear()
  const r = 40 + Math.sin(t.lastTime * 0.002) * 20
  g.circle(app.screen.width / 2, app.screen.height / 2, r)
  g.fill({ color: 0x00d4ff, alpha: 0.6 })
})

app.stage.addChild(g)
```

---

## 10. Full Interactive Background Pattern

```js
// Grid of images that distort toward mouse — agency landing page effect
import { Application, Container, Sprite, DisplacementFilter, Assets, BlurFilter } from 'pixi.js'

async function initBackground() {
  const app = new Application()
  await app.init({ resizeTo: window, backgroundAlpha: 0 })
  document.getElementById('bg').appendChild(app.canvas)

  const texture = await Assets.load('/images/grid-item.jpg')
  const dispTex = await Assets.load('/textures/cloud.png')

  const COLS = 5, ROWS = 4, GAP = 4
  const W = (app.screen.width  - GAP * (COLS + 1)) / COLS
  const H = (app.screen.height - GAP * (ROWS + 1)) / ROWS

  const grid = new Container()
  app.stage.addChild(grid)

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = new Sprite(texture)
      cell.width  = W
      cell.height = H
      cell.x = GAP + c * (W + GAP)
      cell.y = GAP + r * (H + GAP)
      grid.addChild(cell)
    }
  }

  // Global displacement
  const dispSprite = new Sprite(dispTex)
  dispSprite.anchor.set(0.5)
  app.stage.addChild(dispSprite)

  const dispFilter = new DisplacementFilter({ sprite: dispSprite, scale: 0 })
  const blurFilter = new BlurFilter({ strength: 0 })
  app.stage.filters = [dispFilter, blurFilter]

  let mx = 0, my = 0, tx = 0, ty = 0, str = 0

  app.canvas.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY; str = 40
  })

  app.ticker.add(() => {
    mx += (tx - mx) * 0.08
    my += (ty - my) * 0.08
    str *= 0.93
    dispSprite.x = mx; dispSprite.y = my
    dispFilter.scale.set(str)
    blurFilter.strength = str * 0.05
  })
}

initBackground()
```
