'use client'

import { useState, useEffect, useRef } from 'react'

const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

// Animated count-up number using requestAnimationFrame
function AnimatedNumber({
  value,
  decimals = 1,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const [displayed, setDisplayed] = useState(value)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    const duration = 600

    cancelAnimationFrame(rafRef.current)
    startRef.current = null

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(from + (to - from) * eased)
      fromRef.current = from + (to - from) * eased
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
      else fromRef.current = to
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <span className={className}>
      {prefix}{displayed.toFixed(decimals)}{suffix}
    </span>
  )
}

interface SliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  format: (v: number) => string
}

function BrandSlider({ label, min, max, step, value, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {label}
        </span>
        <span className="text-base font-bold tabular-nums" style={{ color: YELLOW }}>
          {format(value)}
        </span>
      </div>

      <div className="relative h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {/* Track fill */}
        <div
          className="absolute h-full rounded-full transition-none"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(to right, ${YELLOW}cc, ${YELLOW})`,
          }}
        />
        {/* Thumb glow */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: YELLOW,
            borderColor: NAVY,
            boxShadow: `0 0 12px ${YELLOW}80`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
      </div>

      <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: number
  decimals: number
  prefix?: string
  suffix?: string
  sublabel?: string
  highlight?: boolean
}

function MetricCard({ label, value, decimals, prefix = '', suffix = '', sublabel, highlight }: MetricCardProps) {
  return (
    <div
      className="flex flex-col gap-1 rounded-2xl p-5 transition-all duration-300"
      style={{
        background: highlight ? `rgba(245,197,24,0.08)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${highlight ? `rgba(245,197,24,0.3)` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: highlight ? `0 0 30px rgba(245,197,24,0.1)` : 'none',
      }}
    >
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </span>
      <AnimatedNumber
        value={value}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className="text-4xl font-black tabular-nums leading-none"
        style={{ color: highlight ? YELLOW : '#ffffff' } as React.CSSProperties}
      />
      {sublabel && (
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {sublabel}
        </span>
      )}
    </div>
  )
}

export function ROICalculator3D() {
  const [buildCost, setBuildCost] = useState(225000)
  const [monthlyRent, setMonthlyRent] = useState(2500)

  const roi = (monthlyRent * 12) / buildCost * 100
  const payback = buildCost / (monthlyRent * 12)
  const annualIncome = monthlyRent * 12
  const totalReturn10yr = annualIncome * 10

  const formatCurrency = (v: number) =>
    v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`

  const formatRent = (v: number) =>
    `$${v.toLocaleString()}/mo`

  return (
    <section
      className="w-full rounded-3xl overflow-hidden"
      style={{ background: NAVY, border: `1px solid rgba(245,197,24,0.12)` }}
    >
      {/* Header */}
      <div
        className="px-8 py-6 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: YELLOW }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: YELLOW, opacity: 0.7 }}>
              Investment Calculator
            </span>
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Suite ROI Estimator
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Estimate your return on a legal garden or basement suite
          </p>
        </div>

        {/* Hat icon */}
        <svg viewBox="0 0 48 40" className="w-12 h-10 flex-shrink-0" fill="none">
          <ellipse cx="24" cy="28" rx="22" ry="6" fill={YELLOW} />
          <path d="M2 28 Q2 10 24 10 Q46 10 46 28Z" fill={YELLOW} />
          <rect x="2" y="23" width="44" height="5" fill="rgba(0,0,0,0.2)" />
        </svg>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sliders */}
        <div className="flex flex-col gap-8">
          <h3 className="text-white font-semibold text-sm tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Adjust Your Numbers
          </h3>

          <BrandSlider
            label="Build Cost"
            min={150000}
            max={400000}
            step={5000}
            value={buildCost}
            onChange={setBuildCost}
            format={formatCurrency}
          />

          <BrandSlider
            label="Monthly Rental Income"
            min={1800}
            max={3500}
            step={50}
            value={monthlyRent}
            onChange={setMonthlyRent}
            format={formatRent}
          />

          {/* Disclaimer */}
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Estimates based on inputs only. Actual returns vary by location, market conditions, and property. Consult GardenSuites4You for a full assessment.
          </p>
        </div>

        {/* Metrics */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your Projected Returns
          </h3>

          {/* Main ROI — large display */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-2"
            style={{
              background: `linear-gradient(135deg, rgba(245,197,24,0.12), rgba(245,197,24,0.04))`,
              border: `1px solid rgba(245,197,24,0.25)`,
              boxShadow: '0 0 40px rgba(245,197,24,0.08)',
            }}
          >
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Annual ROI
            </span>
            <div className="flex items-end gap-2">
              <AnimatedNumber
                value={roi}
                decimals={1}
                suffix="%"
                className="font-black tabular-nums leading-none"
                style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: YELLOW } as React.CSSProperties}
              />
            </div>
            <div
              className="h-1.5 rounded-full mt-1"
              style={{
                background: `linear-gradient(to right, ${YELLOW}, transparent)`,
                width: `${Math.min(roi * 6, 100)}%`,
                transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          </div>

          {/* Secondary metrics */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Payback Period"
              value={payback}
              decimals={1}
              suffix=" yrs"
              sublabel="to recover build cost"
            />
            <MetricCard
              label="Annual Income"
              value={annualIncome}
              decimals={0}
              prefix="$"
              sublabel="gross rental income"
            />
            <MetricCard
              label="10-Year Return"
              value={totalReturn10yr}
              decimals={0}
              prefix="$"
              sublabel="gross over 10 years"
              highlight
            />
            <MetricCard
              label="Monthly Rent"
              value={monthlyRent}
              decimals={0}
              prefix="$"
              sublabel="per month"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Ready to build? GardenSuites4You handles permits, design, and construction.
        </p>
        <a
          href="https://gardensuites4you.ca/contact"
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: YELLOW,
            color: NAVY,
            boxShadow: `0 4px 20px rgba(245,197,24,0.4)`,
          }}
        >
          Get a Free Quote
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default ROICalculator3D
