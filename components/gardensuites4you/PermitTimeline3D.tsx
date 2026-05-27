'use client'

import { useEffect, useRef, useState } from 'react'

const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

interface TimelineStep {
  id: string
  title: string
  description: string
  duration: string
  icon: string
}

const STEPS: TimelineStep[] = [
  {
    id: 'zoning',
    title: 'Zoning Check',
    description: 'Verify your lot permits a garden suite or basement unit under Toronto zoning bylaws.',
    duration: '1–3 days',
    icon: '🗺',
  },
  {
    id: 'site-plan',
    title: 'Site Plan & Design',
    description: 'Architectural drawings, lot coverage calculations, and design development.',
    duration: '2–4 weeks',
    icon: '📐',
  },
  {
    id: 'permit-app',
    title: 'Permit Application',
    description: 'Submit complete drawing package to the City of Toronto Building Division.',
    duration: '1–2 weeks',
    icon: '📋',
  },
  {
    id: 'city-review',
    title: 'City Review',
    description: 'City examiner reviews drawings for Building Code and zoning compliance. Revisions may be requested.',
    duration: '4–12 weeks',
    icon: '🏛',
  },
  {
    id: 'inspections',
    title: 'Build & Inspections',
    description: 'Construction with mandatory inspections: framing, mechanical, insulation, and final.',
    duration: '3–6 months',
    icon: '🔨',
  },
  {
    id: 'occupancy',
    title: 'Occupancy Permit',
    description: 'Final sign-off. Your legal suite is ready to rent or house family members.',
    duration: '1–2 weeks',
    icon: '🔑',
  },
]

function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, options])

  return isVisible
}

interface StepNodeProps {
  step: TimelineStep
  index: number
  isLast: boolean
}

function StepNode({ step, index, isLast }: StepNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(nodeRef as React.RefObject<Element>)

  return (
    <div
      ref={nodeRef}
      className="flex gap-5 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-24px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Spine column */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        {/* Dot */}
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-500 flex-shrink-0"
          style={{
            width: 40,
            height: 40,
            background: isVisible ? YELLOW : 'rgba(255,255,255,0.06)',
            boxShadow: isVisible
              ? `0 0 0 6px rgba(245,197,24,0.12), 0 0 24px rgba(245,197,24,0.4)`
              : 'none',
            transition: `background 0.5s ${index * 80}ms, box-shadow 0.5s ${index * 80}ms`,
          }}
        >
          <span className="text-base leading-none select-none" role="img" aria-label={step.title}>
            {step.icon}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className="flex-1 w-0.5 mt-1 transition-all duration-700 rounded-full"
            style={{
              background: isVisible
                ? `linear-gradient(to bottom, ${YELLOW}80, rgba(255,255,255,0.04))`
                : 'rgba(255,255,255,0.04)',
              minHeight: 32,
              transitionDelay: `${index * 80 + 200}ms`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1 min-w-0">
        {/* Step number + duration */}
        <div className="flex items-center gap-3 mb-1.5">
          <span
            className="text-xs font-mono"
            style={{ color: isVisible ? YELLOW : 'rgba(255,255,255,0.2)', opacity: 0.7 }}
          >
            Step {index + 1}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-mono"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {step.duration}
          </span>
        </div>

        <h3
          className="font-bold text-base mb-1 leading-snug"
          style={{ color: isVisible ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
        >
          {step.title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {step.description}
        </p>

        {/* Yellow accent underline on active */}
        <div
          className="h-px mt-3 rounded-full transition-all duration-700"
          style={{
            background: YELLOW,
            width: isVisible ? '40%' : '0%',
            opacity: 0.35,
            transitionDelay: `${index * 80 + 300}ms`,
          }}
        />
      </div>
    </div>
  )
}

export function PermitTimeline3D() {
  return (
    <section
      className="w-full rounded-3xl overflow-hidden"
      style={{ background: NAVY, border: '1px solid rgba(245,197,24,0.1)' }}
    >
      {/* Header */}
      <div
        className="px-8 py-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: YELLOW }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: YELLOW, opacity: 0.7 }}
          >
            Toronto Permit Process
          </span>
        </div>
        <h2 className="text-white text-2xl font-bold tracking-tight">
          From Idea to Occupancy
        </h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          GardenSuites4You guides you through every step of the City of Toronto permit process.
        </p>
      </div>

      {/* Timeline */}
      <div className="px-8 py-8">
        {STEPS.map((step, i) => (
          <StepNode
            key={step.id}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

      {/* Total duration summary */}
      <div
        className="mx-8 mb-8 px-6 py-4 rounded-2xl flex items-center justify-between"
        style={{
          background: 'rgba(245,197,24,0.06)',
          border: '1px solid rgba(245,197,24,0.2)',
        }}
      >
        <div>
          <span className="text-xs font-mono tracking-widest uppercase block mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Total Estimated Timeline
          </span>
          <span className="text-white font-bold text-lg">6 – 12 months</span>
          <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            from consultation to occupancy
          </span>
        </div>
        <a
          href="https://gardensuites4you.ca/process"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: YELLOW,
            color: NAVY,
            boxShadow: `0 4px 16px rgba(245,197,24,0.35)`,
          }}
        >
          Start Your Permit
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default PermitTimeline3D
