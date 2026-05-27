'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export type FloatingNavVariant = 'dark' | 'light' | 'gold' | 'yellow'

interface NavLink {
  label: string
  href: string
}

interface FloatingNavProps {
  links: NavLink[]
  logo?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  variant?: FloatingNavVariant
}

const variantStyles: Record<
  FloatingNavVariant,
  { pill: string; link: string; cta: string; logo: string }
> = {
  // DJ Custom Reno — dark with amber accent
  dark: {
    pill: 'bg-gray-950/80 border-gray-800 text-white',
    link: 'text-gray-300 hover:text-amber-400',
    cta: 'bg-amber-600 hover:bg-amber-500 text-white',
    logo: 'text-amber-400',
  },
  // Motta Kitchen — white/light
  light: {
    pill: 'bg-white/80 border-gray-200 text-gray-900',
    link: 'text-gray-600 hover:text-gray-900',
    cta: 'bg-gray-900 hover:bg-gray-700 text-white',
    logo: 'text-gray-900',
  },
  // SathiDeals Real Estate — dark gold
  gold: {
    pill: 'bg-yellow-950/85 border-yellow-700 text-yellow-50',
    link: 'text-yellow-200 hover:text-yellow-400',
    cta: 'bg-yellow-500 hover:bg-yellow-400 text-gray-900',
    logo: 'text-yellow-400',
  },
  // GardenSuites4You — bright yellow
  yellow: {
    pill: 'bg-yellow-400/90 border-yellow-300 text-gray-900',
    link: 'text-gray-800 hover:text-gray-900',
    cta: 'bg-gray-900 hover:bg-gray-700 text-yellow-400',
    logo: 'text-gray-900',
  },
}

export function FloatingNav({
  links,
  logo,
  ctaLabel,
  ctaHref,
  variant = 'dark',
}: FloatingNavProps) {
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const styles = variantStyles[variant]

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 80) {
        setVisible(true)
      } else if (current > lastScrollY.current + 5) {
        setVisible(false)
        setMobileOpen(false)
      } else if (current < lastScrollY.current - 5) {
        setVisible(true)
      }
      lastScrollY.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={[
        'fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      ].join(' ')}
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <nav
        className={[
          'flex items-center gap-4 rounded-full border px-5 py-2.5 shadow-xl',
          'backdrop-blur-md backdrop-saturate-150',
          styles.pill,
        ].join(' ')}
      >
        {/* Logo */}
        {logo && (
          <span className={['shrink-0 font-bold', styles.logo].join(' ')}>{logo}</span>
        )}

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  styles.link,
                ].join(' ')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className={[
              'hidden rounded-full px-4 py-1.5 text-sm font-semibold transition-colors md:inline-flex',
              styles.cta,
            ].join(' ')}
          >
            {ctaLabel}
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={['flex flex-col gap-1 p-1 md:hidden', styles.link].join(' ')}
        >
          <span className={['block h-0.5 w-5 rounded bg-current transition-transform', mobileOpen ? 'translate-y-1.5 rotate-45' : ''].join(' ')} />
          <span className={['block h-0.5 w-5 rounded bg-current transition-opacity', mobileOpen ? 'opacity-0' : ''].join(' ')} />
          <span className={['block h-0.5 w-5 rounded bg-current transition-transform', mobileOpen ? '-translate-y-1.5 -rotate-45' : ''].join(' ')} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className={[
            'mt-2 rounded-2xl border p-4 shadow-xl backdrop-blur-md backdrop-saturate-150',
            styles.pill,
          ].join(' ')}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'block rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                    styles.link,
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {ctaLabel && ctaHref && (
              <li className="mt-2">
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'block rounded-xl px-4 py-2 text-center text-sm font-semibold transition-colors',
                    styles.cta,
                  ].join(' ')}
                >
                  {ctaLabel}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FloatingNav
