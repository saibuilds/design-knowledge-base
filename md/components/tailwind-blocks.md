# Free Tailwind Component Libraries

## daisyUI (60+ components, any framework)
```bash
npm install -D daisyui
# tailwind.config.js: plugins: [require("daisyui")]
```
```html
<button class="btn btn-primary">Button</button>
<div class="card bg-base-100 shadow-xl">...</div>
<div class="modal">...</div>
<input class="input input-bordered" />
<!-- Themes: dark, cupcake, cyberpunk, retro, etc. -->
<!-- Site: https://daisyui.com/components/ -->
```

## Flowbite (300+ components)
```bash
npm install flowbite flowbite-react
```
```tsx
import { Button, Card, Modal, Navbar, Footer } from 'flowbite-react'
// Site: https://flowbite-react.com/docs/components
```

## Headless UI (unstyled, Tailwind-ready)
```bash
npm install @headlessui/react
```
```tsx
import { Dialog, Transition, Disclosure, Menu, Tab, Combobox, Listbox, Switch } from '@headlessui/react'
// Accessible by default, style with Tailwind
// Docs: https://headlessui.com
```

## Radix UI (primitives, used by shadcn)
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```
```tsx
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// Full list: https://www.radix-ui.com/primitives
```

## Origin UI (shadcn-compatible blocks)
```
Site: https://originui.com
License: MIT
Install: copy code or `npx shadcn@latest add "https://originui.com/r/[name]"`
```

## Tremor (charts + dashboard)
```bash
npm install @tremor/react
```
```tsx
import { AreaChart, BarChart, LineChart, DonutChart } from '@tremor/react'
import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react'
// Docs: https://tremor.so
```

## Animata (animated components)
```
Site: https://animata.design
License: MIT — copy paste
Categories: bento, cards, text, loaders, buttons, backgrounds
```

## Motion Primitives
```bash
npm install motion-primitives
# or copy from: https://motion-primitives.com
```
```tsx
import { AnimatedGroup, InView, TextEffect, Cursor } from 'motion-primitives'
<TextEffect per="word" as="h3" preset="fade-in-blur">
  Motion Primitives
</TextEffect>
```

## cult/ui (dark aesthetic)
```
Site: https://cult-ui.com
License: MIT — copy paste
Best for: dark themed, shadcn-compatible, dramatic effects
```

## Syntax UI
```
Site: https://syntaxui.com  
License: MIT — copy paste
Tailwind + Framer Motion components
```

## HeroUI (formerly NextUI)
```bash
npm install @heroui/react
```
```tsx
import { Button, Card, Input, Modal, Navbar } from '@heroui/react'
// Docs: https://heroui.com
```

## uiverse.io (pure CSS)
```
Site: https://uiverse.io
License: MIT — copy HTML+CSS
1600+ animated buttons, cards, loaders, checkboxes
No dependencies — pure CSS/HTML
```

## Free Tailwind Block Libraries
- https://tailblocks.cc — 60+ section blocks
- https://merakiui.com — 200+ components
- https://hyperui.dev — 300+ blocks
- https://tailwind-kit.com — 200+ blocks
- https://preline.co — 300+ Tailwind + JS components
- https://kitwind.io — Tailwind UI kit
- https://windstatic.com — static site blocks
