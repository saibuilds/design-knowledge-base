# Garden Suites / ADU / Legal Basement — Design Patterns

> For gardensuites4you.ca / mylegalbasementandgardensuites
> Reference: lanehomes.ca, gardensuites.ca, adubuilderscanada.com

## Hero Section (compliance + authority)
```tsx
export function GardenSuitesHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-zinc-900 flex items-center relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          {/* Compliance badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Toronto-Approved ADU Specialists
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Add a Legal Suite.<br />
            <span className="text-amber-500">Double Your Property's</span><br />
            Income.
          </h1>

          <p className="text-xl text-stone-400 mb-8 max-w-lg">
            Garden suites, legal basements & laneway homes. Fully permitted, built to code. Serving Toronto & the GTA.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mb-10">
            {[
              { num: '200+', label: 'Suites Built' },
              { num: '100%', label: 'Permit Success' },
              { num: '$2,500', label: 'Avg Monthly Rental Income' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-amber-500">{s.num}</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#quote" className="px-8 py-4 bg-amber-500 text-zinc-950 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors">
              Get Free Quote
            </a>
            <a href="#portfolio" className="px-8 py-4 border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
              See Our Work
            </a>
          </div>
        </div>

        <div className="relative">
          <img src="/garden-suite-hero.jpg" className="rounded-2xl w-full shadow-2xl shadow-black/50" alt="Garden suite exterior" />
          {/* ROI card */}
          <div className="absolute -bottom-6 -left-6 bg-stone-900 border border-stone-700 rounded-2xl p-5 shadow-xl">
            <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Estimated ROI</div>
            <div className="text-4xl font-black text-green-400">8–12%</div>
            <div className="text-sm text-stone-400">Annual rental yield</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## Suite Type Selector
```tsx
const suiteTypes = [
  {
    type: 'Garden Suite',
    icon: '🌿',
    desc: 'Detached structure in your backyard. Full kitchen, bath, separate entrance.',
    cost: '$180,000–$280,000',
    rental: '$2,200–$3,200/mo',
    permit: 'Zoning By-law Amendment may be required',
    timeframe: '6–10 months',
  },
  {
    type: 'Legal Basement',
    icon: '🏠',
    desc: 'Convert existing basement to self-contained legal unit.',
    cost: '$80,000–$150,000',
    rental: '$1,400–$2,200/mo',
    permit: 'Building permit + inspection',
    timeframe: '3–5 months',
  },
  {
    type: 'Laneway Suite',
    icon: '🛤️',
    desc: 'Detached unit at rear of property facing laneway.',
    cost: '$200,000–$350,000',
    rental: '$2,500–$3,800/mo',
    permit: 'Zoning + building permit',
    timeframe: '8–12 months',
  },
]

export function SuiteTypePicker() {
  const [active, setActive] = useState(0)
  const s = suiteTypes[active]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-black text-zinc-900 mb-12 text-center">What Type of Suite Is Right For You?</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 justify-center">
          {suiteTypes.map((t, i) => (
            <button key={t.type} onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                active === i ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}>
              {t.icon} {t.type}
            </button>
          ))}
        </div>

        {/* Detail card */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 bg-zinc-50 rounded-3xl p-10 border border-zinc-200">
          <div>
            <h3 className="text-3xl font-black text-zinc-900 mb-4">{s.type}</h3>
            <p className="text-zinc-500 text-lg mb-8">{s.desc}</p>
            <a href="#quote" className="px-6 py-3 bg-amber-500 text-zinc-950 rounded-xl font-bold hover:bg-amber-400 transition-colors">
              Get Quote for {s.type}
            </a>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Estimated Cost', value: s.cost },
              { label: 'Rental Income', value: s.rental },
              { label: 'Permit Type', value: s.permit },
              { label: 'Build Timeframe', value: s.timeframe },
            ].map((d) => (
              <div key={d.label} className="flex justify-between py-3 border-b border-zinc-200">
                <span className="text-zinc-500 text-sm">{d.label}</span>
                <span className="font-semibold text-zinc-900 text-sm">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

## Permit Process Steps
```tsx
const steps = [
  { num: '01', title: 'Free Consultation', desc: 'We assess your property, zoning, and feasibility. No charge.' },
  { num: '02', title: 'Design & Drawings', desc: 'Architectural plans prepared by our licensed designers.' },
  { num: '03', title: 'Permit Application', desc: 'We submit all paperwork to the City. 100% approval rate.' },
  { num: '04', title: 'Construction', desc: 'Licensed contractors, on-time, on-budget. Regular updates.' },
  { num: '05', title: 'Final Inspection', desc: 'City inspection, occupancy certificate, ready to rent.' },
]

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-black text-white mb-16 text-center">Our Process</h2>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 relative pb-12">
              {/* Line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-zinc-800" />
              )}
              {/* Number */}
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center font-black text-zinc-950 flex-shrink-0">
                {s.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-zinc-400">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## ROI Calculator
```tsx
export function ROICalculator() {
  const [cost, setCost] = useState(150000)
  const [rent, setRent] = useState(2000)

  const annualIncome = rent * 12
  const roi = ((annualIncome / cost) * 100).toFixed(1)
  const payback = (cost / annualIncome).toFixed(1)

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 text-white max-w-md">
      <h3 className="text-2xl font-black mb-6">ROI Calculator</h3>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-zinc-400">Build Cost</span>
            <span className="font-bold">${cost.toLocaleString()}</span>
          </div>
          <input type="range" min={60000} max={400000} step={5000} value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full accent-amber-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-zinc-400">Monthly Rent</span>
            <span className="font-bold">${rent.toLocaleString()}/mo</span>
          </div>
          <input type="range" min={800} max={4000} step={50} value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
            className="w-full accent-amber-500" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-zinc-800 rounded-2xl p-4">
        <div className="text-center">
          <div className="text-2xl font-black text-green-400">{roi}%</div>
          <div className="text-xs text-zinc-500 mt-1">Annual ROI</div>
        </div>
        <div className="text-center border-x border-zinc-700">
          <div className="text-2xl font-black text-amber-400">${(annualIncome / 1000).toFixed(0)}K</div>
          <div className="text-xs text-zinc-500 mt-1">Yearly Income</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-blue-400">{payback}yr</div>
          <div className="text-xs text-zinc-500 mt-1">Payback Period</div>
        </div>
      </div>
    </div>
  )
}
```

## Color Palette
```css
/* Garden Suites — earthy premium */
--bg: #0c0a09;             /* stone-950 */
--surface: #1c1917;        /* stone-900 */
--accent: #f59e0b;         /* amber-500 */
--accent-hover: #fbbf24;   /* amber-400 */
--success: #4ade80;        /* green-400 */
--text: #fafaf9;
--text-muted: #78716c;     /* stone-500 */
--border: #292524;         /* stone-800 */
```
