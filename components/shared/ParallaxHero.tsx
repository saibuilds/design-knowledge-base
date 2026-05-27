'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface CtaButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

interface ParallaxHeroProps {
  imageSrc: string
  headline: string
  subheadline?: string
  eyebrow?: string
  ctas?: CtaButton[]
  overlayOpacity?: number // 0–1
  children?: React.ReactNode // e.g. 3D Spline scene slot
  accentColor?: string
  className?: string
  minHeight?: string
}

export function ParallaxHero({
  imageSrc,
  headline,
  subheadline,
  eyebrow,
  ctas = [],
  overlayOpacity = 0.55,
  children,
  accentColor = '#f59e0b',
  className = '',
  minHeight = '100vh',
}: ParallaxHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffsetY(window.scrollY * 0.4)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={['relative flex items-center justify-center overflow-hidden', className].join(' ')}
      style={{ minHeight }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `translateY(${offsetY}px) scale(1.12)`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        aria-hidden="true"
      />

      {/* Optional 3D scene slot — renders above overlay, below text */}
      {children && (
        <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
          {children}
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-5xl px-6 py-24 text-center text-white">
        {eyebrow && (
          <p
            className="mb-4 inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {eyebrow}
          </p>
        )}

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {headline}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80 sm:text-xl">{subheadline}</p>
        )}

        {ctas.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={[
                  'rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300',
                  cta.variant === 'secondary'
                    ? 'border-2 border-white/50 text-white hover:bg-white/10'
                    : 'text-gray-900 shadow-lg hover:brightness-110',
                ].join(' ')}
                style={
                  cta.variant !== 'secondary'
                    ? { backgroundColor: accentColor }
                    : undefined
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default ParallaxHero
