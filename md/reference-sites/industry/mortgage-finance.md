# Mortgage / Finance — Design Reference

> Patterns from better.com, blend.com — digital mortgage and fintech lending

## Key Observations from Real Sites

### Better.com
- Categorical mega-menu: Buy, Refinance, Home Equity, Rates, Better+
- Primary trust signal: phone number prominently displayed ("Call us anytime")
- Friction reducer: "3 min | No credit impact" next to every CTA
- Calculator-driven discovery: Mortgage, Affordability, HELOC calculators above the fold
- Action verb CTAs: "Apply now", "Get started", "Calculate your Cash"
- Innovation labeling: "New" badge on emerging product features
- Clean whites, professional photography of diverse homeowners

### Blend.com
- Hero with customer logos (Wells Fargo, US Bank, Navy Federal) immediately below headline
- Stats-forward: "50% boost deposit conversion", "16+ hours saved per loan", "33% grow loan volume"
- Process messaging: "Go live in as fast as 4 weeks"
- "Request a demo" as consistent primary CTA throughout
- Color: navy blue + white + bright blue CTAs
- Card-based features and testimonials with quantified outcomes
- Alternating text-left/text-right content blocks

---

## Color Palette

```
Background:    #FFFFFF  (dominant, clean)
Surface:       #F7F8FA  (section backgrounds)
Border:        #E5E7EB  (card outlines, dividers)
Primary Blue:  #1D4ED8  (CTAs, links, trust)
Dark Blue:     #1E3A5F  (hero, headers, Blend navy)
Accent Green:  #16A34A  (success, rates, positive metrics)
Text Primary:  #111827
Text Muted:    #6B7280
White:         #FFFFFF
```

## Typography
- Headings: Inter, Manrope, or DM Sans — modern sans-serif (NOT serif)
- Numbers/stats: Bold weight, large scale to communicate confidence
- Body: Regular 16px, line-height 1.6
- Labels/badges: 11-12px, semibold, uppercase with tracking

---

## Pattern 1 — Trust Signal Bar

```tsx
// TrustSignalBar.tsx
import React from 'react'

interface TrustItem {
  icon: React.ReactNode
  label: string
  sublabel?: string
}

interface TrustSignalBarProps {
  items: TrustItem[]
}

export function TrustSignalBar({ items }: TrustSignalBarProps) {
  return (
    <div className="border-b border-[#E5E7EB] bg-white py-4">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 md:justify-between">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-[#1D4ED8]">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
              {item.sublabel && (
                <p className="text-xs text-[#6B7280]">{item.sublabel}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Example usage:
// <TrustSignalBar items={[
//   { icon: <ShieldIcon />, label: "256-bit encryption", sublabel: "Bank-level security" },
//   { icon: <CheckCircle />, label: "NMLS Licensed", sublabel: "All 50 states" },
//   { icon: <StarIcon />, label: "4.8 / 5 rating", sublabel: "12,000+ reviews" },
//   { icon: <PhoneIcon />, label: "Call us anytime", sublabel: "1-800-XXX-XXXX" },
// ]} />
```

---

## Pattern 2 — Mortgage Calculator

```tsx
// MortgageCalculator.tsx
import React, { useState, useMemo } from 'react'

interface MortgageCalculatorProps {
  defaultHomePrice?: number
  defaultDownPayment?: number
  defaultInterestRate?: number
  defaultTermYears?: number
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function MortgageCalculator({
  defaultHomePrice = 850000,
  defaultDownPayment = 170000,
  defaultInterestRate = 5.25,
  defaultTermYears = 25,
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(defaultHomePrice)
  const [downPayment, setDownPayment] = useState(defaultDownPayment)
  const [interestRate, setInterestRate] = useState(defaultInterestRate)
  const [termYears, setTermYears] = useState(defaultTermYears)

  const { monthlyPayment, principal, totalInterest } = useMemo(() => {
    const principal = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const n = termYears * 12

    if (monthlyRate === 0) {
      return { monthlyPayment: principal / n, principal, totalInterest: 0 }
    }

    const mp =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1)

    return {
      monthlyPayment: mp,
      principal,
      totalInterest: mp * n - principal,
    }
  }, [homePrice, downPayment, interestRate, termYears])

  const downPct = Math.round((downPayment / homePrice) * 100)

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] px-6 py-5">
        <h3 className="text-lg font-semibold text-[#111827]">
          Mortgage Calculator
        </h3>
        <p className="mt-0.5 text-sm text-[#6B7280]">
          Estimate your monthly payment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6 p-6">
          {/* Home Price */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-[#111827]">
                Home Price
              </label>
              <span className="text-sm font-semibold text-[#1D4ED8]">
                {formatCurrency(homePrice)}
              </span>
            </div>
            <input
              type="range"
              min={200000}
              max={3000000}
              step={10000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#1D4ED8]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#6B7280]">
              <span>$200K</span><span>$3M</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-[#111827]">
                Down Payment
              </label>
              <span className="text-sm font-semibold text-[#1D4ED8]">
                {formatCurrency(downPayment)}{' '}
                <span className="font-normal text-[#6B7280]">({downPct}%)</span>
              </span>
            </div>
            <input
              type="range"
              min={homePrice * 0.05}
              max={homePrice * 0.5}
              step={5000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#1D4ED8]"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-[#111827]">
                Interest Rate
              </label>
              <span className="text-sm font-semibold text-[#1D4ED8]">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={0.05}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#1D4ED8]"
            />
          </div>

          {/* Amortization */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">
              Amortization Period
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTermYears(yr)}
                  className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                    termYears === yr
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-[#F7F8FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {yr}yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center bg-[#1E3A5F] p-6 text-white">
          <p className="mb-1 text-sm font-medium text-white/60">
            Estimated Monthly Payment
          </p>
          <p className="mb-6 text-5xl font-bold tracking-tight">
            {formatCurrency(monthlyPayment)}
          </p>

          <div className="space-y-3 border-t border-white/10 pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Loan amount</span>
              <span className="font-medium">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Total interest</span>
              <span className="font-medium">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Total cost</span>
              <span className="font-medium">
                {formatCurrency(principal + totalInterest)}
              </span>
            </div>
          </div>

          <a
            href="/apply"
            className="mt-8 block rounded-lg bg-white py-3 text-center text-sm font-semibold text-[#1E3A5F] transition-colors hover:bg-white/90"
          >
            Apply Now — 3 min, no credit impact
          </a>
        </div>
      </div>
    </div>
  )
}
```

---

## Pattern 3 — Step-by-Step Process Timeline

```tsx
// ProcessTimeline.tsx
import React from 'react'

interface ProcessStep {
  number: number
  title: string
  description: string
  duration?: string
  icon?: React.ReactNode
}

interface ProcessTimelineProps {
  eyebrow?: string
  title: string
  subtitle?: string
  steps: ProcessStep[]
  orientation?: 'horizontal' | 'vertical'
}

export function ProcessTimeline({
  eyebrow,
  title,
  subtitle,
  steps,
  orientation = 'horizontal',
}: ProcessTimelineProps) {
  if (orientation === 'vertical') {
    return (
      <section className="bg-[#F7F8FA] py-20 px-4 md:px-8">
        <div className="mx-auto max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1D4ED8]">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-3 text-3xl font-bold text-[#111827]">{title}</h2>
          {subtitle && <p className="mb-12 text-[#6B7280]">{subtitle}</p>}

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-5">
                {/* Spine */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-sm font-bold text-white">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-1 h-full w-px bg-[#1D4ED8]/20" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-[#111827]">{step.title}</h3>
                    {step.duration && (
                      <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-xs font-medium text-[#1D4ED8]">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-[#1D4ED8]">
            {eyebrow}
          </p>
        )}
        <h2 className="mb-3 text-center text-3xl font-bold text-[#111827]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mb-14 max-w-xl text-center text-[#6B7280]">
            {subtitle}
          </p>
        )}

        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute top-5 left-0 right-0 hidden h-px bg-[#E5E7EB] md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1D4ED8] bg-white text-sm font-bold text-[#1D4ED8]">
                {step.number}
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">{step.title}</h3>
              {step.duration && (
                <span className="mb-2 text-xs font-medium text-[#1D4ED8]">
                  {step.duration}
                </span>
              )}
              <p className="text-sm leading-relaxed text-[#6B7280]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Pattern 4 — Stats / Numbers Section (Blend-style)

```tsx
// StatsSection.tsx
import React from 'react'

interface Stat {
  value: string
  label: string
  description?: string
  trend?: 'up' | 'down' | 'neutral'
}

interface StatsSectionProps {
  eyebrow?: string
  title?: string
  stats: Stat[]
  variant?: 'light' | 'dark'
}

export function StatsSection({
  eyebrow,
  title,
  stats,
  variant = 'dark',
}: StatsSectionProps) {
  const isDark = variant === 'dark'

  return (
    <section
      className={`py-20 px-4 md:px-8 ${
        isDark ? 'bg-[#1E3A5F]' : 'bg-[#F7F8FA]'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <p
                className={`mb-2 text-xs font-semibold uppercase tracking-widest ${
                  isDark ? 'text-[#60A5FA]' : 'text-[#1D4ED8]'
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-[#111827]'
                }`}
              >
                {title}
              </h2>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-${Math.min(
            stats.length,
            4
          )}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 text-center ${
                isDark ? 'bg-white/5' : 'bg-white border border-[#E5E7EB]'
              }`}
            >
              <p
                className={`mb-2 text-5xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#1D4ED8]'
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`mb-1 font-semibold ${
                  isDark ? 'text-white/90' : 'text-[#111827]'
                }`}
              >
                {stat.label}
              </p>
              {stat.description && (
                <p
                  className={`text-sm ${
                    isDark ? 'text-white/50' : 'text-[#6B7280]'
                  }`}
                >
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Pattern 5 — FAQ Accordion

```tsx
// FAQAccordion.tsx
import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  eyebrow?: string
  title: string
  items: FAQItem[]
}

export function FAQAccordion({ eyebrow, title, items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1D4ED8]">
            {eyebrow}
          </p>
        )}
        <h2 className="mb-10 text-3xl font-bold text-[#111827]">{title}</h2>

        <div className="divide-y divide-[#E5E7EB]">
          {items.map((item, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <span
                  className={`font-medium ${
                    openIndex === i ? 'text-[#1D4ED8]' : 'text-[#111827]'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`mt-0.5 shrink-0 text-lg font-light transition-transform duration-200 ${
                    openIndex === i
                      ? 'rotate-45 text-[#1D4ED8]'
                      : 'text-[#6B7280]'
                  }`}
                >
                  +
                </span>
              </button>

              {openIndex === i && (
                <p className="mt-3 pr-8 text-sm leading-relaxed text-[#6B7280]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Pattern 6 — Multi-Step Application Form

```tsx
// MultiStepForm.tsx
import React, { useState } from 'react'

interface FormStep {
  id: string
  title: string
  fields: FormField[]
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'radio'
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

interface MultiStepFormProps {
  steps: FormStep[]
  onSubmit: (data: Record<string, string>) => void
}

export function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (!isLast) setCurrentStep((s) => s + 1)
    else onSubmit(formData)
  }

  const handleChange = (name: string, value: string) => {
    setFormData((d) => ({ ...d, [name]: value }))
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E7EB] bg-white shadow-lg">
      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-t-2xl bg-[#E5E7EB]">
        <div
          className="h-full rounded-t-2xl bg-[#1D4ED8] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8">
        {/* Step indicator */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
            Step {currentStep + 1} of {steps.length}
          </span>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-[#1D4ED8]' : 'bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-[#111827]">{step.title}</h2>

        {/* Fields */}
        <div className="space-y-5">
          {step.fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1.5 block text-sm font-medium text-[#111827]">
                {field.label}
                {field.required && (
                  <span className="ml-1 text-[#EF4444]">*</span>
                )}
              </label>

              {field.type === 'select' ? (
                <select
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="">Select…</option>
                  {field.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <div className="grid grid-cols-2 gap-3">
                  {field.options?.map((o) => (
                    <label
                      key={o.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                        formData[field.name] === o.value
                          ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                          : 'border-[#E5E7EB] hover:border-[#93C5FD]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={o.value}
                        checked={formData[field.name] === o.value}
                        onChange={() => handleChange(field.name, o.value)}
                        className="accent-[#1D4ED8]"
                      />
                      <span className="text-sm font-medium text-[#111827]">
                        {o.label}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="text-sm font-medium text-[#6B7280] hover:text-[#111827]"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="rounded-lg bg-[#1D4ED8] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF]"
          >
            {isLast ? 'Submit Application' : 'Continue →'}
          </button>
        </div>

        {/* Friction reducer — Better.com pattern */}
        <p className="mt-4 text-center text-xs text-[#9CA3AF]">
          3 minutes · No credit check · No commitment
        </p>
      </div>
    </div>
  )
}
```
