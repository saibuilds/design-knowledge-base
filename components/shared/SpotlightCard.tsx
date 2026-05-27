'use client'

import React, { useRef, useState, useCallback } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  spotlightColor?: string
  className?: string
}

export function SpotlightCard({
  children,
  spotlightColor = 'rgba(255, 180, 0, 0.15)',
  className = '',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={['relative overflow-hidden rounded-2xl', className].join(' ')}
      style={{ isolation: 'isolate' }}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  )
}

export default SpotlightCard
