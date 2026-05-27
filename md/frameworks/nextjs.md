# Next.js 14 — Patterns for Design-Heavy Sites

## App Router Setup
```bash
npx create-next-app@latest my-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Fonts (zero layout shift)
```tsx
// app/layout.tsx
import { Inter, Syne } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'], display: 'swap' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans bg-zinc-950 text-zinc-50">{children}</body>
    </html>
  )
}
```

## Metadata
```tsx
// app/layout.tsx
export const metadata = {
  title: { default: 'Motta Kitchen', template: '%s | Motta Kitchen' },
  description: 'Toronto\'s premier kitchen renovation specialists',
  openGraph: {
    images: ['/og-image.jpg'],
    siteName: 'Motta Kitchen',
  },
}
```

## Image optimization
```tsx
import Image from 'next/image'
<Image src="/hero.jpg" alt="Kitchen" fill className="object-cover" priority />
<Image src="/project.jpg" alt="Project" width={800} height={600} className="rounded-xl" />
```

## Page transitions (with Framer Motion)
```tsx
// app/template.tsx (re-mounts on route change)
'use client'
import { motion } from 'framer-motion'
export default function Template({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
```

## Server Components + Client Components
```tsx
// Server component (default) — good for data fetching
async function ProjectList() {
  const projects = await getProjects() // direct DB call, no useEffect
  return <ul>{projects.map(p => <ProjectCard key={p.id} project={p} />)}</ul>
}

// Client component (add 'use client') — for interactivity/animations
'use client'
export function AnimatedCard({ children }) {
  return <motion.div whileHover={{ y: -4 }}>{children}</motion.div>
}
```

## Route Handler (API)
```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const body = await req.json()
  // handle form submission
  return NextResponse.json({ success: true })
}
```

## Parallel/Conditional rendering
```tsx
// Skeleton loading
import { Suspense } from 'react'
<Suspense fallback={<ProjectGridSkeleton />}>
  <ProjectGrid />
</Suspense>
```

## next.config.js for images
```js
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}
```
