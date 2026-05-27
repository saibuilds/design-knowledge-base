'use client'

import React, { useState } from 'react'

interface ServiceOption {
  id: string
  label: string
}

interface MultiStepLeadFormProps {
  services: ServiceOption[]
  webhookUrl: string
  brandColor?: string
  brandName?: string
  onSuccess?: () => void
}

interface FormData {
  selectedServices: string[]
  projectDetails: string
  timeline: string
  name: string
  phone: string
  email: string
}

const TIMELINES = [
  'As soon as possible',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  'Just exploring',
]

const STEP_LABELS = ['Services', 'Project Details', 'Contact Info']

export function MultiStepLeadForm({
  services,
  webhookUrl,
  brandColor = '#f59e0b',
  brandName = '',
  onSuccess,
}: MultiStepLeadFormProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    selectedServices: [],
    projectDetails: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Progress %
  const progress = ((step + 1) / 3) * 100

  function toggleService(id: string) {
    setForm((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(id)
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id],
    }))
  }

  function canAdvance(): boolean {
    if (step === 0) return form.selectedServices.length > 0
    if (step === 1) return form.projectDetails.trim().length > 10 && form.timeline !== ''
    if (step === 2)
      return (
        form.name.trim().length > 1 &&
        /^\+?[\d\s\-()]{7,}$/.test(form.phone) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      )
    return false
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canAdvance()) return
    setSubmitting(true)
    setError('')

    try {
      const payload = {
        brand: brandName,
        services: form.selectedServices,
        project_details: form.projectDetails,
        timeline: form.timeline,
        name: form.name,
        phone: form.phone,
        email: form.email,
        submitted_at: new Date().toISOString(),
      }
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
      onSuccess?.()
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
          style={{ backgroundColor: brandColor + '22', color: brandColor }}
        >
          ✓
        </div>
        <h3 className="text-2xl font-bold">Request Received!</h3>
        <p className="max-w-sm text-sm opacity-70">
          We&apos;ll be in touch within 1 business day. Keep an eye on{' '}
          <strong>{form.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className="text-xs font-medium"
              style={{ color: i <= step ? brandColor : '#9ca3af' }}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: brandColor }}
          />
        </div>
      </div>

      {/* Step 0 — Service selection */}
      {step === 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold">What services are you interested in?</h2>
          <p className="text-sm opacity-60">Select all that apply.</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {services.map((svc) => {
              const checked = form.selectedServices.includes(svc.id)
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => toggleService(svc.id)}
                  className={[
                    'rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all',
                    checked ? 'border-current' : 'border-gray-200 opacity-70 hover:opacity-100',
                  ].join(' ')}
                  style={checked ? { borderColor: brandColor, color: brandColor } : undefined}
                >
                  {svc.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 1 — Project details */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Tell us about your project</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">Project Description</label>
            <textarea
              className="w-full rounded-xl border-2 border-gray-200 bg-transparent p-3 text-sm transition focus:border-current focus:outline-none"
              rows={4}
              placeholder="Describe your project, space size, goals..."
              value={form.projectDetails}
              onChange={(e) => setForm((prev) => ({ ...prev, projectDetails: e.target.value }))}
              style={{ '--tw-ring-color': brandColor } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ideal Timeline</label>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, timeline: t }))}
                  className={[
                    'rounded-full border-2 px-3 py-1 text-xs font-medium transition-all',
                    form.timeline === t ? 'border-current' : 'border-gray-200 opacity-60 hover:opacity-100',
                  ].join(' ')}
                  style={form.timeline === t ? { borderColor: brandColor, color: brandColor } : undefined}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Contact info */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">How can we reach you?</h2>
          {[
            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
            { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (416) 555-0100' },
            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key as keyof FormData] as string}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-gray-200 bg-transparent p-3 text-sm transition focus:outline-none"
                style={{ focusBorderColor: brandColor } as React.CSSProperties}
                onFocus={(e) => (e.currentTarget.style.borderColor = brandColor)}
                onBlur={(e) => (e.currentTarget.style.borderColor = '')}
              />
            </div>
          ))}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 rounded-xl border-2 border-gray-200 py-3 text-sm font-semibold transition hover:border-gray-400"
          >
            Back
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            disabled={!canAdvance()}
            onClick={() => setStep((s) => s + 1)}
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-40"
            style={{ backgroundColor: brandColor }}
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canAdvance() || submitting}
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-40"
            style={{ backgroundColor: brandColor }}
          >
            {submitting ? 'Sending...' : 'Request a Quote'}
          </button>
        )}
      </div>
    </form>
  )
}

export default MultiStepLeadForm
