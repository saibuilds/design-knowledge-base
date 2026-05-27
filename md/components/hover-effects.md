# Hover Effects — Premium Interactions

## Magnetic Button
```tsx
'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * 0.4, y: (e.clientY - cy) * 0.4 })
  }

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={className}
    >
      {children}
    </motion.button>
  )
}
```

## Cursor Follower
```tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 200, damping: 30 })
  const sy = useSpring(y, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      style={{ left: sx, top: sy }}
      className="fixed w-6 h-6 rounded-full border border-white/50 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    />
  )
}
```

## Image Reveal on Hover (cursor tracking)
```tsx
'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function HoverImageReveal({ items }: { items: { label: string; image: string }[] }) {
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div onMouseMove={handleMove}>
      {items.map((item, i) => (
        <div
          key={i}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          className="py-6 border-b border-zinc-800 text-5xl font-black text-white/20 hover:text-white transition-colors cursor-default"
        >
          {item.label}
        </div>
      ))}

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ left: pos.x + 20, top: pos.y - 80 }}
            className="fixed pointer-events-none z-50 w-48 h-32 rounded-xl overflow-hidden shadow-2xl"
          >
            <img src={items[active].image} className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

## Text Scramble on Hover
```tsx
'use client'
import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const interval = useRef<NodeJS.Timeout>()

  const scramble = () => {
    let iteration = 0
    clearInterval(interval.current)
    interval.current = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) =>
          i < iteration ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      )
      if (iteration >= text.length) clearInterval(interval.current)
      iteration += 0.3
    }, 40)
  }

  return (
    <span onMouseEnter={scramble} className="font-mono cursor-pointer">
      {display}
    </span>
  )
}
```

## Card Tilt (3D perspective)
```tsx
'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}
```

## Link Underline Slide (CSS)
```css
.link-underline {
  position: relative;
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.link-underline:hover::after { width: 100%; }
```

## Button Fill Reveal
```css
.btn-fill {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.btn-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  transform: translateY(101%);
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  z-index: -1;
}
.btn-fill:hover::before { transform: translateY(0); }
.btn-fill:hover { color: black; }
```

## Spotlight Card (follows cursor)
```tsx
'use client'
import { useRef, useState } from 'react'

export function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(245,158,11,0.08), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
```
