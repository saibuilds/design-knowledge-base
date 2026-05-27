'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

interface CountUpStatProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number // ms
  label?: string
  className?: string
  decimals?: number
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export function CountUpStat({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  label,
  className = '',
  decimals = 0,
}: CountUpStatProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const runCount = useCallback(() => {
    if (started) return
    setStarted(true)
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      setCount(parseFloat((eased * value).toFixed(decimals)))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(value)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [started, value, duration, decimals])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCount()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [runCount])

  return (
    <div ref={containerRef} className={['text-center', className].join(' ')}>
      <p className="text-4xl font-bold tabular-nums leading-none tracking-tight">
        <span>{prefix}</span>
        <span>{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}</span>
        <span>{suffix}</span>
      </p>
      {label && (
        <p className="mt-1 text-sm font-medium uppercase tracking-widest opacity-70">
          {label}
        </p>
      )}
    </div>
  )
}

export default CountUpStat
