'use client'

import React, { useRef } from 'react'
import Link from 'next/link'

export type ShimmerVariant = 'amber' | 'gold' | 'yellow' | 'white'
export type ShimmerSize = 'sm' | 'md' | 'lg'

interface ShimmerButtonProps {
  children: React.ReactNode
  variant?: ShimmerVariant
  size?: ShimmerSize
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantMap: Record<ShimmerVariant, { base: string; shimmer: string; text: string }> = {
  // DJ Custom Reno — deep amber/orange
  amber: {
    base: 'bg-amber-600 border-amber-500 hover:bg-amber-500',
    shimmer: 'from-transparent via-amber-300/40 to-transparent',
    text: 'text-white',
  },
  // SathiDeals Real Estate — rich gold
  gold: {
    base: 'bg-yellow-700 border-yellow-600 hover:bg-yellow-600',
    shimmer: 'from-transparent via-yellow-200/50 to-transparent',
    text: 'text-white',
  },
  // GardenSuites4You — bright yellow
  yellow: {
    base: 'bg-yellow-400 border-yellow-300 hover:bg-yellow-300',
    shimmer: 'from-transparent via-white/50 to-transparent',
    text: 'text-gray-900',
  },
  // Motta Kitchen — clean white
  white: {
    base: 'bg-white border-gray-200 hover:bg-gray-50',
    shimmer: 'from-transparent via-gray-300/40 to-transparent',
    text: 'text-gray-900',
  },
}

const sizeMap: Record<ShimmerSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function ShimmerButton({
  children,
  variant = 'amber',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ShimmerButtonProps) {
  const { base, shimmer, text } = variantMap[variant]
  const sz = sizeMap[size]

  const baseClass = [
    'relative inline-flex items-center justify-center gap-2 overflow-hidden',
    'rounded-full border font-semibold tracking-wide transition-colors duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    base,
    text,
    sz,
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className,
  ].join(' ')

  const inner = (
    <>
      {/* shimmer sweep */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 -translate-x-full',
          'bg-gradient-to-r',
          shimmer,
          'shimmer-sweep',
        ].join(' ')}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style jsx>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .shimmer-sweep {
          animation: shimmer-sweep 2.4s ease-in-out infinite;
        }
      `}</style>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {inner}
    </button>
  )
}

export default ShimmerButton
