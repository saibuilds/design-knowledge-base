'use client'

import React, { useRef, useState, useCallback } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        setPos({ x: dx, y: dy })
      })
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      setPos({ x: 0, y: 0 })
    })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={['inline-block cursor-pointer select-none', className].join(' ')}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

export default MagneticButton
