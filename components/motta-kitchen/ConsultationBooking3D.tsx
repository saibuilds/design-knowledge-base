'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';
const CHARCOAL = '#2C2C2C';

// ─── Project types ────────────────────────────────────────────────────────────

interface ProjectType {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'new-kitchen',
    label: 'New Kitchen',
    description: 'Full kitchen design and installation from the ground up.',
    icon: '◻',
  },
  {
    id: 'renovation',
    label: 'Renovation',
    description: 'Transform your existing kitchen with new cabinetry and surfaces.',
    icon: '◈',
  },
  {
    id: 'cabinet-refinishing',
    label: 'Cabinet Refinishing',
    description: 'Spray-painted finishes breathing new life into existing cabinets.',
    icon: '◇',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Hospitality, restaurant, or office kitchen fitouts.',
    icon: '◉',
  },
];

const CONTACT_TIMES = [
  'Morning (9am–12pm)',
  'Afternoon (12pm–5pm)',
  'Evening (5pm–7pm)',
  'Flexible',
];

// ─── Step 1: Project Type Selector ────────────────────────────────────────────

function ProjectTypeStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-8">
        <p className="uppercase tracking-[0.25em] text-xs mb-2" style={{ color: BRASS }}>
          Step 1 of 2
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 300,
            color: WARM_WHITE,
            lineHeight: 1.1,
          }}
        >
          What can we
          <br />
          help you with?
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {PROJECT_TYPES.map((pt) => {
          const isSelected = selected === pt.id;
          return (
            <motion.button
              key={pt.id}
              onClick={() => onSelect(pt.id)}
              whileHover={{ y: -2, boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,105,20,0.5)` }}
              whileTap={{ scale: 0.98 }}
              className="relative text-left p-5 transition-all duration-200 focus:outline-none"
              style={{
                background: isSelected ? 'rgba(139,105,20,0.12)' : 'rgba(255,255,255,0.03)',
                border: isSelected
                  ? `1px solid rgba(139,105,20,0.7)`
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '2px',
              }}
              aria-pressed={isSelected}
            >
              {/* Brass selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="projectSelected"
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: BRASS }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className="block text-xl mb-2"
                style={{ color: isSelected ? BRASS : '#5a5248' }}
                aria-hidden="true"
              >
                {pt.icon}
              </span>
              <span
                className="block font-medium mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.1rem',
                  color: isSelected ? WARM_WHITE : '#a09888',
                }}
              >
                {pt.label}
              </span>
              <span className="block text-xs leading-relaxed" style={{ color: '#6e6558' }}>
                {pt.description}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        onClick={onNext}
        disabled={!selected}
        whileHover={selected ? { opacity: 0.85 } : {}}
        whileTap={selected ? { scale: 0.98 } : {}}
        className="w-full py-4 text-sm uppercase tracking-[0.25em] transition-opacity"
        style={{
          background: selected
            ? `linear-gradient(135deg, ${BRASS} 0%, #c9a040 50%, ${BRASS} 100%)`
            : 'rgba(255,255,255,0.06)',
          color: selected ? WARM_WHITE : '#5a5248',
          border: 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
          borderRadius: '1px',
        }}
      >
        Continue
      </motion.button>
    </div>
  );
}

// ─── Step 2: Contact Form ─────────────────────────────────────────────────────

interface FormData {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  notes: string;
}

function ContactFormStep({
  projectType,
  webhookUrl,
  onBack,
}: {
  projectType: string | null;
  webhookUrl?: string;
  onBack: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectLabel = PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? projectType;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectType, ...form }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // Simulate network delay in dev
        await new Promise((r) => setTimeout(r, 900));
      }
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '1px',
    color: WARM_WHITE,
    padding: '12px 14px',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 text-center"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(139,105,20,0.15)', border: `1px solid ${BRASS}` }}
        >
          <span style={{ color: BRASS, fontSize: '1.2rem' }}>✓</span>
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '2rem',
            fontWeight: 300,
            color: WARM_WHITE,
            marginBottom: '12px',
          }}
        >
          We'll be in touch.
        </h3>
        <p className="text-sm" style={{ color: '#a09888' }}>
          Thank you, {form.name}. A member of the Motta team will reach out within one business day.
        </p>
        <div className="mt-6 w-8 h-px mx-auto" style={{ background: BRASS }} />
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity"
          style={{ color: '#6e6558' }}
        >
          ← Back
        </button>
        <p className="uppercase tracking-[0.25em] text-xs mb-2" style={{ color: BRASS }}>
          Step 2 of 2 — {projectLabel}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 300,
            color: WARM_WHITE,
            lineHeight: 1.1,
          }}
        >
          Tell us about
          <br />
          your project
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#6e6558' }}>
              Full Name *
            </label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = `rgba(139,105,20,0.6)`)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#6e6558' }}>
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (416) 000-0000"
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = `rgba(139,105,20,0.6)`)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#6e6558' }}>
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            style={inputBase}
            onFocus={(e) => (e.target.style.borderColor = `rgba(139,105,20,0.6)`)}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#6e6558' }}>
            Preferred Contact Time
          </label>
          <select
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            style={{ ...inputBase, cursor: 'pointer' }}
            onFocus={(e) => (e.target.style.borderColor = `rgba(139,105,20,0.6)`)}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          >
            <option value="" style={{ background: CHARCOAL }}>
              Select a time
            </option>
            {CONTACT_TIMES.map((t) => (
              <option key={t} value={t} style={{ background: CHARCOAL }}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#6e6558' }}>
            Project Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Tell us about your space, timeline, or any inspiration you have in mind…"
            style={{ ...inputBase, resize: 'vertical' }}
            onFocus={(e) => (e.target.style.borderColor = `rgba(139,105,20,0.6)`)}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>

        {error && (
          <p className="text-xs" style={{ color: '#c0504d' }}>
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={!submitting ? { opacity: 0.85 } : {}}
          whileTap={!submitting ? { scale: 0.98 } : {}}
          className="w-full py-4 text-sm uppercase tracking-[0.25em] relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${BRASS} 0%, #c9a040 50%, ${BRASS} 100%)`,
            color: WARM_WHITE,
            border: 'none',
            cursor: submitting ? 'wait' : 'pointer',
            borderRadius: '1px',
          }}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
              Sending…
            </span>
          ) : (
            'Request Consultation'
          )}
        </motion.button>

        <p className="text-xs text-center" style={{ color: '#5a5248' }}>
          We typically respond within one business day.
        </p>
      </form>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface ConsultationBooking3DProps {
  webhookUrl?: string;
  className?: string;
}

export default function ConsultationBooking3D({
  webhookUrl,
  className = '',
}: ConsultationBooking3DProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedType) setStep(2);
  };

  const handleBack = () => setStep(1);

  return (
    <section
      className={`w-full py-20 px-6 ${className}`}
      style={{ background: '#111110' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section heading above card */}
        <div className="text-center mb-12">
          <p
            className="uppercase tracking-[0.25em] text-xs mb-3"
            style={{ color: BRASS }}
          >
            Book a Consultation
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: WARM_WHITE,
              lineHeight: 1.05,
            }}
          >
            Begin Your
            <br />
            Kitchen Journey
          </h2>
          <div className="mt-6 w-12 h-px mx-auto" style={{ background: BRASS }} />
        </div>

        {/* Card */}
        <div
          className="relative p-8 sm:p-12"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '2px',
          }}
        >
          {/* Step indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className="h-px flex-1 transition-all duration-500"
                style={{
                  background: s <= step ? BRASS : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectTypeStep
                  selected={selectedType}
                  onSelect={setSelectedType}
                  onNext={handleNext}
                />
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
              >
                <ContactFormStep
                  projectType={selectedType}
                  webhookUrl={webhookUrl}
                  onBack={handleBack}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust line */}
        <p
          className="text-center text-xs mt-8 tracking-widest uppercase"
          style={{ color: '#3e3a34' }}
        >
          Serving Toronto & the GTA · mottakitchen.ca
        </p>
      </div>
    </section>
  );
}
