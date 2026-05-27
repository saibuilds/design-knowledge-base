# Navigation Patterns for Premium Sites

---

## 1. Minimal Floating Navbar (Pill Style)

```tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export function FloatingNav() {
  const pathname = usePathname()
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 100], [20, 8])
  const width = useTransform(scrollY, [0, 100], ['70%', '56%'])

  return (
    <motion.header
      style={{ y, width, left: '50%', x: '-50%' }}
      className="fixed top-0 z-50"
    >
      <motion.nav
        className="flex items-center justify-between rounded-full border border-white/10 bg-neutral-950/85 px-6 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        {/* Logo */}
        <Link href="/" className="text-sm font-bold tracking-tight text-white">
          MOTTA
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-yellow-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-yellow-400 md:block"
        >
          Get Quote
        </Link>
      </motion.nav>
    </motion.header>
  )
}
```

---

## 2. Fullscreen Hamburger Menu with Stagger Animation

```tsx
'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MENU_LINKS = [
  { href: '/', label: 'Home', num: '01' },
  { href: '/projects', label: 'Projects', num: '02' },
  { href: '/services', label: 'Services', num: '03' },
  { href: '/about', label: 'About', num: '04' },
  { href: '/contact', label: 'Contact', num: '05' },
]

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://houzz.com', label: 'Houzz' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
]

export function FullscreenMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const overlayVariants = {
    closed: { opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' },
    open: {
      opacity: 1,
      clipPath: 'circle(150% at calc(100% - 44px) 44px)',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, x: -40 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <motion.span
          animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="h-px w-6 origin-center bg-white"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="h-px w-4 self-start bg-white"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="h-px w-6 origin-center bg-white"
        />
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={prefersReduced ? {} : overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 flex flex-col bg-neutral-950 px-8 py-24 md:px-16"
          >
            <nav className="mt-auto">
              <ul className="space-y-2">
                {MENU_LINKS.map(({ href, label, num }, i) => (
                  <motion.li
                    key={href}
                    custom={i}
                    variants={prefersReduced ? {} : linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={href}
                      className="group flex items-baseline gap-4 py-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-xs font-medium text-neutral-600 transition-colors group-hover:text-yellow-400">
                        {num}
                      </span>
                      <span className="text-5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-yellow-400 md:text-7xl">
                        {label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.4 } }}
              className="mt-auto flex items-end justify-between pt-8"
            >
              <p className="text-sm text-neutral-500">Premium renovations since 1992</p>
              <ul className="flex items-center gap-6">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## 3. Mega Menu with Hover Panels

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'

interface MegaMenuPanel {
  id: string
  label: string
  links: { href: string; label: string; description: string }[]
  featured?: { href: string; title: string; image: string; tag: string }
}

const MEGA_MENU: MegaMenuPanel[] = [
  {
    id: 'services',
    label: 'Services',
    links: [
      { href: '/services/kitchen', label: 'Kitchen Renovation', description: 'Complete kitchen transformations' },
      { href: '/services/bathroom', label: 'Bathroom Remodel', description: 'Luxury bathroom upgrades' },
      { href: '/services/full-home', label: 'Full Home Renovation', description: 'Whole-home projects' },
      { href: '/services/commercial', label: 'Commercial Spaces', description: 'Office and retail renovations' },
    ],
    featured: {
      href: '/services/kitchen',
      title: 'Kitchen of the Year',
      image: '/images/featured-kitchen.jpg',
      tag: 'Award Winner',
    },
  },
]

function MegaMenu() {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActivePanel(id)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActivePanel(null), 150)
  }

  const panelVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
  }

  const linkContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  }

  const linkItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  }

  return (
    <nav className="relative">
      <ul className="flex items-center gap-1">
        {MEGA_MENU.map((panel) => (
          <li
            key={panel.id}
            onMouseEnter={() => handleEnter(panel.id)}
            onMouseLeave={handleLeave}
          >
            <button
              className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activePanel === panel.id ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {panel.label}
              <motion.svg
                animate={{ rotate: activePanel === panel.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="h-3.5 w-3.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {activePanel === panel.id && (
                <motion.div
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => handleEnter(panel.id)}
                  onMouseLeave={handleLeave}
                  className="absolute left-0 top-full mt-2 w-[640px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl shadow-black/50"
                >
                  <div className="grid grid-cols-[1fr_200px] gap-6">
                    <motion.div
                      variants={linkContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 gap-2"
                    >
                      {panel.links.map((link) => (
                        <motion.div key={link.href} variants={linkItemVariants}>
                          <Link
                            href={link.href}
                            className="group block rounded-xl p-3 transition-colors hover:bg-neutral-800"
                          >
                            <div className="font-medium text-white group-hover:text-yellow-400">{link.label}</div>
                            <div className="mt-0.5 text-xs text-neutral-500">{link.description}</div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>

                    {panel.featured && (
                      <Link
                        href={panel.featured.href}
                        className="group relative overflow-hidden rounded-xl bg-neutral-800"
                      >
                        <img
                          src={panel.featured.image}
                          alt={panel.featured.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4">
                          <span className="mb-1 inline-block rounded-full bg-yellow-400/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
                            {panel.featured.tag}
                          </span>
                          <p className="text-sm font-medium text-white">{panel.featured.title}</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

---

## 4. Sidebar Navigation with Active State

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
  children?: { href: string; label: string }[]
}

function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav className="flex h-full flex-col gap-1 px-3 py-4">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/')
        const hasChildren = item.children && item.children.length > 0

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-yellow-400/10 ring-1 ring-yellow-400/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${active ? 'text-yellow-400' : 'text-neutral-500 group-hover:text-neutral-200'}`}>
                {item.icon}
              </span>
              <span className={`relative z-10 flex-1 ${active ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1.5 text-xs font-bold text-black">
                  {item.badge}
                </span>
              )}
            </Link>

            {hasChildren && active && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden pl-10"
              >
                {item.children!.map((child) => {
                  const childActive = pathname === child.href
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 pl-3 text-sm transition-colors ${
                        childActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {childActive && (
                        <span className="mr-2 inline-block h-1 w-1 rounded-full bg-yellow-400 align-middle" />
                      )}
                      {child.label}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
```

---

## 5. Mobile Drawer Navigation

```tsx
'use client'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DRAWER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const dragControls = useDragControls()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        aria-label="Open navigation"
      >
        <span className="h-px w-6 bg-white" />
        <span className="h-px w-4 self-start bg-white" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.5 }}
              onDragEnd={(_, info) => { if (info.offset.x > 80) setOpen(false) }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(80vw,320px)] bg-neutral-950 shadow-2xl"
            >
              {/* Drag handle strip */}
              <div
                className="absolute right-0 top-0 h-full w-8 cursor-grab touch-none active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              />

              <div className="flex h-full flex-col px-6 py-8">
                <Link href="/" className="text-lg font-bold tracking-tight text-white">
                  MOTTA
                </Link>

                <nav className="mt-10 flex-1">
                  <ul className="space-y-1">
                    {DRAWER_LINKS.map(({ href, label }, i) => {
                      const active = pathname === href
                      return (
                        <motion.li
                          key={href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.06 } }}
                        >
                          <Link
                            href={href}
                            className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                              active
                                ? 'bg-yellow-400/10 text-yellow-400'
                                : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                            }`}
                          >
                            {label}
                            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-yellow-400" />}
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="mt-auto pt-6">
                  <Link
                    href="/contact"
                    className="block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-semibold text-black transition-all hover:bg-yellow-300"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## 6. Breadcrumbs

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

interface BreadcrumbItem { label: string; href?: string }

function Breadcrumbs({
  items,
  separator = '/',
}: {
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
}) {
  const pathname = usePathname()

  const crumbs: BreadcrumbItem[] = items ?? [
    { label: 'Home', href: '/' },
    ...pathname
      .split('/')
      .filter(Boolean)
      .map((segment, i, arr) => ({
        label: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        href: i < arr.length - 1 ? '/' + arr.slice(0, i + 1).join('/') : undefined,
      })),
  ]

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.label}>
            <li>
              {crumb.href ? (
                <Link href={crumb.href} className="text-neutral-500 transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white" aria-current="page">{crumb.label}</span>
              )}
            </li>
            {i < crumbs.length - 1 && (
              <li className="text-neutral-700" aria-hidden="true">{separator}</li>
            )}
          </Fragment>
        ))}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: crumbs.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: crumb.label,
              item: crumb.href ? `https://motta.com${crumb.href}` : undefined,
            })),
          }),
        }}
      />
    </nav>
  )
}
```

---

## 7. Pagination

```tsx
'use client'
import { motion } from 'framer-motion'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  sibling?: number
}

function Pagination({ page, totalPages, onChange, sibling = 1 }: PaginationProps) {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const getPages = (): (number | '...')[] => {
    const totalNumbers = sibling * 2 + 5
    if (totalPages <= totalNumbers) return range(1, totalPages)

    const leftSiblingIndex = Math.max(page - sibling, 1)
    const rightSiblingIndex = Math.min(page + sibling, totalPages)
    const showLeftDots = leftSiblingIndex > 3
    const showRightDots = rightSiblingIndex < totalPages - 2

    if (!showLeftDots && showRightDots)
      return [...range(1, 3 + sibling * 2), '...', totalPages]
    if (showLeftDots && !showRightDots)
      return [1, '...', ...range(totalPages - (3 + sibling * 2) + 1, totalPages)]
    return [1, '...', ...range(leftSiblingIndex, rightSiblingIndex), '...', totalPages]
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous page"
      >
        ‹
      </button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="flex h-9 w-9 items-center justify-center text-neutral-600">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium"
          >
            {p === page && (
              <motion.span
                layoutId="pagination-active"
                className="absolute inset-0 rounded-lg bg-yellow-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${p === page ? 'text-black' : 'text-neutral-400 hover:text-white'}`}>
              {p}
            </span>
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
```

---

## 8. Progress-Based Navigation (Scroll Indicator)

```tsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Top progress bar
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed left-0 top-0 z-[100] h-[2px] w-full bg-yellow-400"
    />
  )
}

// Section dot nav
interface Section { id: string; label: string }

export function SectionNavDots({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id)

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.5 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [sections])

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const active = activeSection === id
        return (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Go to ${label}`}
            title={label}
            className="group flex items-center gap-3"
          >
            <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-md bg-neutral-900 px-0 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:max-w-xs group-hover:px-3 group-hover:opacity-100">
              {label}
            </span>
            <motion.div
              animate={{
                scale: active ? 1 : 0.6,
                backgroundColor: active ? '#F5E642' : 'rgb(64,64,64)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="h-2.5 w-2.5 rounded-full"
            />
          </button>
        )
      })}
    </nav>
  )
}

// Circular percentage indicator
export function ScrollPercentage() {
  const { scrollYProgress } = useScroll()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(40,40,40)" strokeWidth="2" />
        <motion.circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke="#F5E642"
          strokeWidth="2"
          strokeDasharray="100.53"
          strokeDashoffset={100.53 * (1 - pct / 100)}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[10px] font-bold tabular-nums text-white">{pct}</span>
    </div>
  )
}
```

---

## 9. Sticky Header with Blur on Scroll

```tsx
'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef } from 'react'

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (current) => {
    setScrolled(current > 20)
    if (current > lastScrollY.current && current > 80) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastScrollY.current = current
  })

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {children}
      </div>

      {scrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </motion.header>
  )
}

// Usage
function Header() {
  return (
    <StickyHeader>
      <Logo />
      <DesktopNav />
      <HeaderActions />
    </StickyHeader>
  )
}
```
