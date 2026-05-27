# Mortgage / Finance / Business Loans — Design Reference

> Patterns from better.com, blend.com, sofi.com, and high-end fintech lenders.

## Hero (trust-forward)
```tsx
<section className="min-h-screen bg-white flex items-center">
  <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <div>
      {/* Trust badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600">🏆</span>
        <span className="text-sm font-medium text-zinc-600">Rated #1 Mortgage Lender 2024</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-zinc-900 leading-tight mb-6">
        Get your mortgage<br />
        <span className="text-blue-600">approved today</span>
      </h1>
      <p className="text-xl text-zinc-500 mb-8 max-w-lg">
        Pre-qualify in 3 minutes. No credit score impact. Rates from 5.2% APR.
      </p>
      {/* Rate teaser */}
      <div className="flex gap-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-200 mb-8">
        {[
          { label: '30-yr fixed', rate: '6.875%' },
          { label: '15-yr fixed', rate: '6.125%' },
          { label: '5/1 ARM', rate: '6.25%' },
        ].map((r) => (
          <div key={r.label}>
            <div className="text-2xl font-black text-zinc-900">{r.rate}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wide">{r.label}</div>
          </div>
        ))}
      </div>
      <button className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
        Get Pre-Approved
      </button>
    </div>
    <div className="relative">
      <img src="/mortgage-family.jpg" className="rounded-2xl w-full shadow-2xl" />
      {/* Floating stat card */}
      <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-zinc-100">
        <div className="text-3xl font-black text-zinc-900">$2.1B+</div>
        <div className="text-sm text-zinc-500">Funded this year</div>
      </div>
    </div>
  </div>
</section>
```

## Mortgage Calculator Component
```tsx
import { useState, useMemo } from 'react'

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(800000)
  const [downPercent, setDownPercent] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const monthly = useMemo(() => {
    const principal = homePrice * (1 - downPercent / 100)
    const r = rate / 100 / 12
    const n = years * 12
    if (r === 0) return principal / n
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }, [homePrice, downPercent, rate, years])

  const fmt = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)
  const fmtMonthly = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-8 max-w-xl">
      <h3 className="text-2xl font-bold text-zinc-900 mb-6">Mortgage Calculator</h3>
      
      {[
        { label: 'Home Price', value: homePrice, setValue: setHomePrice, min: 100000, max: 5000000, step: 10000, format: fmt },
        { label: `Down Payment (${downPercent}%)`, value: downPercent, setValue: setDownPercent, min: 5, max: 50, step: 1, format: (v: number) => `${v}%` },
        { label: 'Interest Rate', value: rate, setValue: setRate, min: 1, max: 15, step: 0.25, format: (v: number) => `${v}%` },
      ].map((field) => (
        <div key={field.label} className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-zinc-700">{field.label}</label>
            <span className="text-sm font-bold text-zinc-900">{field.format(field.value)}</span>
          </div>
          <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
            onChange={(e) => field.setValue(Number(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
      ))}

      <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
        <div className="text-sm text-blue-600 font-medium mb-1">Estimated Monthly Payment</div>
        <div className="text-5xl font-black text-blue-700">{fmtMonthly(monthly)}</div>
        <div className="text-xs text-zinc-500 mt-2">Principal + interest only. Property taxes & insurance not included.</div>
      </div>
    </div>
  )
}
```

## Trust Signals Section
```tsx
<section className="py-16 bg-zinc-50 border-t border-b border-zinc-200">
  <div className="max-w-6xl mx-auto px-8">
    <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-10">Why Clients Trust Us</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { icon: '🔒', title: 'Bank-Level Security', desc: '256-bit SSL encryption' },
        { icon: '⚡', title: 'Fast Decisions', desc: 'Pre-approval in 3 minutes' },
        { icon: '🏆', title: 'Award Winning', desc: 'Rated #1 in Canada 2024' },
        { icon: '📞', title: '24/7 Support', desc: 'Real humans, always available' },
      ].map((t) => (
        <div key={t.title} className="text-center">
          <div className="text-4xl mb-3">{t.icon}</div>
          <h4 className="font-bold text-zinc-900 mb-1">{t.title}</h4>
          <p className="text-sm text-zinc-500">{t.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Multi-Step Application Form
```tsx
const STEPS = ['Your Info', 'Property', 'Finances', 'Review']

function ApplicationForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${i <= step ? 'text-zinc-900' : 'text-zinc-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${i < step ? 'bg-blue-600' : 'bg-zinc-200'}`} />}
          </div>
        ))}
      </div>
      
      {/* Step content here */}
      {step === 0 && <PersonalInfoStep data={data} onChange={(d) => setData({ ...data, ...d })} />}
      {step === 1 && <PropertyStep data={data} onChange={(d) => setData({ ...data, ...d })} />}
      
      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="px-6 py-3 border border-zinc-300 rounded-xl font-medium hover:bg-zinc-50 transition-colors">
            Back
          </button>
        )}
        <button onClick={() => setStep(s => s + 1)}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
          {step === STEPS.length - 1 ? 'Submit Application' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
```

## Color Palette (Finance/Trust)
```css
/* Clean professional — better.com style */
--bg: #ffffff;
--bg-subtle: #f8fafc;
--accent: #2563eb;      /* blue-600 */
--accent-hover: #1d4ed8; /* blue-700 */
--success: #16a34a;     /* green-600 */
--text: #09090b;
--text-muted: #71717a;

/* Dark premium finance */
--bg: #0f172a;          /* slate-900 */
--accent: #3b82f6;      /* blue-500 */
--surface: #1e293b;     /* slate-800 */
```

## Reference Sites
- https://www.better.com — best digital mortgage UX
- https://www.blend.com — B2B fintech
- https://www.rocketmortgage.com — high-volume, trust-heavy
- https://www.sofi.com — full-service fintech
- https://fig.ca — Canadian mortgage
- https://nesto.ca — Canadian digital mortgage
