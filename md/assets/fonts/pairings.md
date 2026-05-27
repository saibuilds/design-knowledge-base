# Font Pairings — Premium Web Fonts (All Free on Google Fonts)

## Dark Luxury (renovation/agency)
```css
/* Heading: Syne — geometric, futuristic */
/* Body: Inter — clean, readable */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

h1, h2, h3 { font-family: 'Syne', sans-serif; }
body { font-family: 'Inter', sans-serif; }
```

## Modern SaaS
```css
/* Heading: Plus Jakarta Sans — friendly but premium */
/* Body: Inter */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

## Editorial / Magazine
```css
/* Heading: DM Serif Display — elegant serif */
/* Body: DM Sans */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
```

## Tech / Developer
```css
/* Heading: Space Grotesk — geometric, distinctive */
/* Body: Space Mono (code) + Inter */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
```

## Minimal / Luxury Brand
```css
/* Heading: Cormorant Garamond — ultra-thin luxury */
/* Body: Jost */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap');
```

## Bold Agency
```css
/* Heading: Bebas Neue — all caps, ultra condensed */
/* Body: Barlow */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');
```

## Tailwind Config
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

## next/font (Next.js — zero layout shift)
```tsx
import { Inter, Syne } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '700', '800'] })

export default function Layout({ children }) {
  return (
    <html className={`${inter.variable} ${syne.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

## Variable Fonts (one file, all weights)
```css
/* Inter Variable — best all-rounder */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
/* Outfit Variable */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
```

## Font Size Scale (Tailwind classes)
```
text-xs     12px  — labels, badges, captions
text-sm     14px  — body secondary
text-base   16px  — body primary  
text-lg     18px  — large body
text-xl     20px  — small headings
text-2xl    24px  — section labels
text-3xl    30px  — h3
text-4xl    36px  — h2 mobile
text-5xl    48px  — h2 desktop
text-6xl    60px  — h1 mobile
text-7xl    72px  — h1 desktop
text-8xl    96px  — hero headline
text-9xl   128px  — mega hero
```
