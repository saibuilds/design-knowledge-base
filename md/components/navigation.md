# Navigation Patterns — Premium Sites

## Floating Pill Navbar
```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function FloatingNav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => scrollY.on('change', (y) => setScrolled(y > 50)), [])

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className={`flex items-center gap-1 rounded-full px-3 py-2 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-xl'
          : 'bg-transparent'
      }`}>
        <a href="/" className="px-3 py-1.5 text-sm font-bold text-white mr-2">MOTTA</a>
        {links.map((l) => (
          <a key={l.href} href={l.href}
            className="px-4 py-1.5 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all">
            {l.label}
          </a>
        ))}
        <a href="#contact"
          className="ml-2 px-4 py-1.5 text-sm bg-amber-500 text-zinc-950 rounded-full font-semibold hover:bg-amber-400 transition-colors">
          Get Quote
        </a>
      </div>
    </motion.nav>
  )
}
```

## Fullscreen Hamburger Menu
```tsx
'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const menuLinks = [
  { label: 'Kitchen Renovation', href: '/kitchen', num: '01' },
  { label: 'Bathroom Renovation', href: '/bathroom', num: '02' },
  { label: 'Full Renovation', href: '/full', num: '03' },
  { label: 'Our Portfolio', href: '/portfolio', num: '04' },
  { label: 'About Us', href: '/about', num: '05' },
  { label: 'Get A Quote', href: '/contact', num: '06' },
]

export function FullscreenMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button */}
      <button onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-[60] flex flex-col gap-1.5 w-8 cursor-pointer">
        <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
          className="block h-0.5 w-full bg-white origin-center transition-colors" />
        <motion.span animate={{ opacity: open ? 0 : 1, x: open ? 20 : 0 }}
          className="block h-0.5 w-2/3 bg-white" />
        <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
          className="block h-0.5 w-full bg-white origin-center" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col justify-center px-12 md:px-24"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>

            {/* Links */}
            <nav className="space-y-2">
              {menuLinks.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                  <a href={link.href} onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 text-5xl md:text-7xl font-black text-white/10 hover:text-white transition-colors duration-300 leading-tight">
                    <span className="text-sm font-mono text-amber-500">{link.num}</span>
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Footer info */}
            <motion.div className="absolute bottom-10 left-12 right-12 flex justify-between items-end"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div>
                <p className="text-zinc-500 text-sm">📍 Toronto, Ontario</p>
                <p className="text-zinc-500 text-sm">📞 (416) 555-0123</p>
              </div>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Houzz'].map((s) => (
                  <a key={s} href="#" className="text-zinc-600 hover:text-white text-sm transition-colors">{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

## Sticky Header with Hide on Scroll Down
```tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function SmartHeader() {
  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setAtTop(y < 10)
    setHidden(y > lastY.current && y > 150)
    lastY.current = y
  })

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        atTop ? 'bg-transparent' : 'bg-zinc-950/95 backdrop-blur-xl border-b border-white/5'
      }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-black text-white">MOTTA</a>
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="px-5 py-2 bg-amber-500 text-zinc-950 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors">
          Free Quote
        </a>
      </div>
    </motion.header>
  )
}
```

## Mobile Drawer (shadcn Sheet)
```tsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 text-white"><Menu className="w-6 h-6" /></button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-zinc-950 border-l border-zinc-800">
        <div className="flex flex-col gap-1 pt-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-lg font-medium">
              {l.label}
            </a>
          ))}
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <a href="tel:4165550123" className="flex items-center gap-3 text-zinc-400 hover:text-white px-4 py-2">
              <Phone className="w-4 h-4 text-amber-500" />
              (416) 555-0123
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

## Active Link with Framer Motion Underline
```tsx
function NavLink({ href, label, active }) {
  return (
    <a href={href} className="relative text-sm font-medium text-white/70 hover:text-white transition-colors pb-1">
      {label}
      {active && (
        <motion.div layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
      )}
    </a>
  )
}
```

## Scroll Progress Indicator
```tsx
import { useScroll, useSpring, motion } from 'framer-motion'
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-amber-500 z-[100] origin-left" style={{ scaleX }} />
}
```
