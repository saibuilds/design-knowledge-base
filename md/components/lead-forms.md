# High-Conversion Lead Forms — Renovation, Real Estate, Services

> Based on Facebook Lead Ad best practices, Unbounce research, and CRO data.
> Key principle: fewer fields = more leads. Every extra field drops conversion ~10%.

## Facebook Lead Form Best Practices
- **3–5 fields max** for top-of-funnel (Name + Phone + 1 qualifying question)
- **Pre-populate** name/email from FB profile — instant friction reduction
- **Qualifying question** = filters serious leads (e.g. "What's your timeline?")
- **Confirmation screen** = set expectations + redirect to calendar link
- **Privacy policy link** required by Meta

## High-Converting Multi-Step Form (renovation/home services)
```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  service: string
  timeline: string
  budget: string
  name: string
  phone: string
  address: string
}

const STEPS = [
  {
    id: 'service',
    question: 'What are you looking to build?',
    type: 'choice',
    options: [
      { value: 'garden-suite', label: '🌿 Garden Suite', sub: 'Detached backyard unit' },
      { value: 'legal-basement', label: '🏠 Legal Basement', sub: 'Licensed income suite' },
      { value: 'kitchen', label: '🍳 Kitchen Renovation', sub: 'Full or partial remodel' },
      { value: 'full-reno', label: '🔨 Full Renovation', sub: 'Whole-home transformation' },
    ]
  },
  {
    id: 'timeline',
    question: 'When are you looking to get started?',
    type: 'choice',
    options: [
      { value: 'asap', label: '⚡ ASAP', sub: 'Ready to begin now' },
      { value: '1-3months', label: '📅 1–3 months', sub: 'Planning phase' },
      { value: '3-6months', label: '🗓️ 3–6 months', sub: 'Later this year' },
      { value: 'exploring', label: '🔍 Just exploring', sub: 'Getting quotes' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your approximate budget?',
    type: 'choice',
    options: [
      { value: 'under-100k', label: 'Under $100K' },
      { value: '100-200k', label: '$100K – $200K' },
      { value: '200-350k', label: '$200K – $350K' },
      { value: '350k-plus', label: '$350K+' },
    ]
  },
  {
    id: 'contact',
    question: 'Where should we send your free quote?',
    type: 'contact',
  }
]

export function LeadForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const currentStep = STEPS[step]
  const progress = ((step) / STEPS.length) * 100

  const handleChoice = (value: string) => {
    const updated = { ...data, [currentStep.id]: value }
    setData(updated)
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const final = {
      ...data,
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      address: fd.get('address') as string,
    } as FormData
    setData(final)
    onSubmit(final)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-black text-zinc-900 mb-2">You're all set!</h3>
        <p className="text-zinc-500">We'll contact you within 2 hours to schedule your free consultation.</p>
        <a href="https://calendly.com/yourlink" target="_blank"
          className="inline-block mt-6 px-6 py-3 bg-amber-500 text-zinc-950 rounded-xl font-bold hover:bg-amber-400 transition-colors">
          Book a Call Now →
        </a>
      </motion.div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{Math.round(progress + 25)}% complete</span>
        </div>
        <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
          <motion.div className="h-full bg-amber-500 rounded-full"
            animate={{ width: `${progress + 25}%` }}
            transition={{ duration: 0.4 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}>
          <h2 className="text-2xl font-black text-zinc-900 mb-6">{currentStep.question}</h2>

          {currentStep.type === 'choice' && (
            <div className="grid grid-cols-2 gap-3">
              {currentStep.options!.map((opt) => (
                <button key={opt.value} onClick={() => handleChoice(opt.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:border-amber-500 hover:bg-amber-50 ${
                    data[currentStep.id as keyof FormData] === opt.value
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-zinc-200 bg-white'
                  }`}>
                  <div className="font-semibold text-zinc-900">{opt.label}</div>
                  {'sub' in opt && opt.sub && <div className="text-xs text-zinc-500 mt-0.5">{opt.sub}</div>}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === 'contact' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" required placeholder="Full name" autoComplete="name"
                className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-amber-500 outline-none text-zinc-900 transition-colors" />
              <input name="phone" required placeholder="Phone number" type="tel" autoComplete="tel"
                className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-amber-500 outline-none text-zinc-900 transition-colors" />
              <input name="address" placeholder="Property address (optional)"
                className="w-full px-4 py-3 rounded-xl border-2 border-zinc-200 focus:border-amber-500 outline-none text-zinc-900 transition-colors" />
              <button type="submit"
                className="w-full py-4 bg-amber-500 text-zinc-950 rounded-xl font-black text-lg hover:bg-amber-400 transition-colors">
                Get My Free Quote →
              </button>
              <p className="text-xs text-zinc-400 text-center">
                No spam. We'll call once within 2 business hours.
              </p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {step > 0 && currentStep.type !== 'contact' && (
        <button onClick={() => setStep(s => s - 1)}
          className="mt-6 text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
          ← Back
        </button>
      )}
    </div>
  )
}
```

## Sticky CTA Bar (mobile)
```tsx
export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/95 backdrop-blur border-t border-zinc-200 flex gap-3">
      <a href="tel:+14165550123"
        className="flex-1 py-3 border border-zinc-300 rounded-xl text-center font-semibold text-zinc-700">
        Call Now
      </a>
      <a href="#quote"
        className="flex-1 py-3 bg-amber-500 text-zinc-950 rounded-xl text-center font-bold">
        Free Quote
      </a>
    </div>
  )
}
```

## Facebook Lead Ad Form Structure (Meta format)
```
Headline (40 chars max): "Get a Free Garden Suite Quote"
Description (60 chars): "Toronto's #1 rated ADU builder. Licensed & insured."

Questions (3 max for best conversion):
1. [Pre-filled] Full Name
2. [Pre-filled] Phone Number  
3. [Custom] "What type of suite are you interested in?"
   - Garden Suite
   - Legal Basement
   - Laneway Suite
   - Not sure yet

Confirmation screen:
  Headline: "We'll be in touch within 2 hours!"
  Body: "In the meantime, check out our portfolio"
  CTA Button: "See Our Work" → link to website
```

## GHL Webhook Integration
```ts
// When form submits, POST to GHL:
async function submitToGHL(data: FormData) {
  await fetch('https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID/webhook-trigger/YOUR_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: data.name.split(' ')[0],
      last_name: data.name.split(' ').slice(1).join(' '),
      phone: data.phone,
      address1: data.address,
      customField: {
        service_type: data.service,
        timeline: data.timeline,
        budget: data.budget,
        source: 'website_lead_form',
      }
    })
  })
}
```

## Trust Elements Near Form
```tsx
const trustItems = [
  { icon: '⭐', text: '4.9/5 on Google (180+ reviews)' },
  { icon: '🏆', text: 'Award Winning Contractor 2024' },
  { icon: '🔒', text: 'Licensed & Insured in Ontario' },
  { icon: '⚡', text: 'Response within 2 hours' },
]

export function FormTrustBar() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {trustItems.map((t) => (
        <div key={t.text} className="flex items-center gap-2 text-sm text-zinc-500">
          <span>{t.icon}</span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  )
}
```
