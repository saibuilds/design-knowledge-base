'use client'

import React from 'react'

interface BorderBeamProps {
  children: React.ReactNode
  color?: string
  duration?: number
  className?: string
  borderWidth?: number
  borderRadius?: string
}

export function BorderBeam({
  children,
  color = '#f59e0b',
  duration = 4,
  className = '',
  borderWidth = 2,
  borderRadius = '1rem',
}: BorderBeamProps) {
  const id = React.useId().replace(/:/g, '')

  return (
    <div
      className={['relative inline-block', className].join(' ')}
      style={{ borderRadius }}
    >
      {/* SVG animated border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        style={{ borderRadius }}
      >
        <defs>
          <linearGradient id={`beam-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <rect
            id={`beam-path-${id}`}
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={`calc(100% - ${borderWidth}px)`}
            height={`calc(100% - ${borderWidth}px)`}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
          />
        </defs>
        {/* Static faint border */}
        <use
          href={`#beam-path-${id}`}
          stroke="currentColor"
          strokeWidth={borderWidth}
          strokeOpacity="0.1"
          className="text-gray-400"
        />
        {/* Animated beam */}
        <use
          href={`#beam-path-${id}`}
          stroke={`url(#beam-grad-${id})`}
          strokeWidth={borderWidth + 1}
          fill="none"
          strokeDasharray="120 9999"
          strokeDashoffset="0"
        >
          <animateMotion
            dur={`${duration}s`}
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href={`#beam-path-${id}`} />
          </animateMotion>
        </use>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default BorderBeam
