'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  initialPosition?: number // 0–100
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getPositionFromEvent = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handleMouseDown = useCallback(() => {
    dragging.current = true
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return
      getPositionFromEvent(e.clientX)
    },
    [getPositionFromEvent]
  )

  const handleMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      getPositionFromEvent(e.touches[0].clientX)
    },
    [getPositionFromEvent]
  )

  // Global mouseup to release drag even when cursor leaves element
  useEffect(() => {
    const up = () => { dragging.current = false }
    window.addEventListener('mouseup', up)
    return () => window.removeEventListener('mouseup', up)
  }, [])

  return (
    <div
      ref={containerRef}
      className={['relative select-none overflow-hidden rounded-2xl', className].join(' ')}
      style={{ touchAction: 'none', cursor: 'col-resize' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* After image (full width, base layer) */}
      <div className="relative w-full h-full">
        <Image
          src={afterSrc}
          alt={afterLabel}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeLabel}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <button
          aria-label="Drag to compare"
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchStart={handleMouseDown}
          className={[
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'bg-white shadow-xl ring-2 ring-white/40',
            'focus:outline-none focus-visible:ring-4',
          ].join(' ')}
          style={{ touchAction: 'none', cursor: 'col-resize' }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M8 4l-4 8 4 8M16 4l4 8-4 8" />
          </svg>
        </button>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  )
}

export default BeforeAfterSlider
