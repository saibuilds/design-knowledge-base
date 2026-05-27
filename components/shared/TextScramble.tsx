'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

type Trigger = 'hover' | 'mount' | 'inView'

interface TextScrambleProps {
  text: string
  trigger?: Trigger
  className?: string
  speed?: number // frames per char cycle (lower = faster)
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'

function scramble(
  target: string,
  onFrame: (display: string) => void,
  onDone: () => void,
  speed: number
) {
  let frame = 0
  let raf: number

  const tick = () => {
    let output = ''
    let complete = 0

    for (let i = 0; i < target.length; i++) {
      if (target[i] === ' ') {
        output += ' '
        complete++
        continue
      }
      if (frame >= i * speed) {
        output += target[i]
        complete++
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
    }

    onFrame(output)
    frame++

    if (complete < target.length) {
      raf = requestAnimationFrame(tick)
    } else {
      onDone()
    }
  }

  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

export function TextScramble({
  text,
  trigger = 'hover',
  className = '',
  speed = 2,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === 'mount' ? '' : text)
  const [running, setRunning] = useState(false)
  const cancelRef = useRef<(() => void) | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const run = useCallback(() => {
    if (running) return
    setRunning(true)
    if (cancelRef.current) cancelRef.current()
    cancelRef.current = scramble(
      text,
      (d) => setDisplay(d),
      () => setRunning(false),
      speed
    )
  }, [text, running, speed])

  // mount trigger
  useEffect(() => {
    if (trigger === 'mount') {
      run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // inView trigger
  useEffect(() => {
    if (trigger !== 'inView' || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [trigger, run])

  return (
    <span
      ref={containerRef}
      className={['font-mono', className].join(' ')}
      onMouseEnter={trigger === 'hover' ? run : undefined}
      aria-label={text}
    >
      {display}
    </span>
  )
}

export default TextScramble
