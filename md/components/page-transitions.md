# Page Transitions — Next.js + Framer Motion

## App Router: template.tsx (correct approach)
```tsx
// app/template.tsx — rerenders on every route change (unlike layout.tsx)
'use client'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

## Curtain Wipe Transition
```tsx
// app/template.tsx
'use client'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="fixed inset-0 z-[200] bg-zinc-950 origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
```

## Slide Direction Transition (based on route depth)
```tsx
'use client'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -60 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Horizontal Slide (mobile-style)
```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-30%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="min-h-screen bg-zinc-950"
    >
      {children}
    </motion.div>
  )
}
```

## Stagger children on page enter
```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Page() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.h1 variants={item} className="text-6xl font-black">Title</motion.h1>
      <motion.p variants={item} className="text-zinc-400">Description</motion.p>
      <motion.div variants={item}>
        <Button>CTA</Button>
      </motion.div>
    </motion.div>
  )
}
```

## Loading Bar (nprogress-style, Framer Motion)
```tsx
// components/progress-bar.tsx
'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function ProgressBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-amber-500 z-[999] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.9 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </AnimatePresence>
  )
}
```

## Shared Element (layoutId) between pages
```tsx
// Page A — portfolio list item
<motion.div layoutId={`project-${id}`} className="rounded-2xl overflow-hidden">
  <img src={project.image} className="w-full h-64 object-cover" />
</motion.div>

// Page B — project detail
<motion.div layoutId={`project-${id}`} className="rounded-2xl overflow-hidden">
  <img src={project.image} className="w-full h-screen object-cover" />
</motion.div>
// Framer Motion automatically animates between the two — like native iOS transitions
```

## View Transition API (CSS, zero JS)
```css
/* globals.css */
@view-transition { navigation: auto; }

::view-transition-old(root) {
  animation: slide-out 0.3s ease forwards;
}
::view-transition-new(root) {
  animation: slide-in 0.3s ease forwards;
}

@keyframes slide-out {
  to { opacity: 0; transform: translateX(-30px); }
}
@keyframes slide-in {
  from { opacity: 0; transform: translateX(30px); }
}
```
