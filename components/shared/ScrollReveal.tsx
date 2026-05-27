'use client'

import React, { useRef, useState, useEffect } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number // ms
  className?: string
  threshold?: number
  duration?: number // ms
}

const initialTransform: Record<Direction, string> = {
  up: 'translateY(40px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
  scale: 'scale(0.88)',
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.15,
  duration = 600,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initialTransform[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
