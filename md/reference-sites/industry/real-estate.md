# Real Estate / Renovation Sites — Design Reference

> Patterns from compass.com, sothebys realty, milieu, and high-end reno agencies.

## Hero Patterns

### Full-bleed property photo hero
```tsx
<section className="relative h-screen">
  <img src="/hero-property.jpg" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
    <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">
      Toronto · Renovation Specialists
    </p>
    <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
      Spaces That<br />Inspire Living
    </h1>
    <div className="flex gap-6 items-center">
      <button className="px-8 py-4 bg-amber-500 text-black font-bold rounded-none hover:bg-amber-400 transition-colors">
        View Projects
      </button>
      <button className="px-8 py-4 border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
        Get Quote
      </button>
    </div>
  </div>
</section>
```

### Stats bar (trust signals)
```tsx
<div className="bg-zinc-900 border-t border-b border-zinc-800 py-8">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
    {[
      { num: '500+', label: 'Projects Completed' },
      { num: '15', label: 'Years Experience' },
      { num: '98%', label: 'Client Satisfaction' },
      { num: '$50M+', label: 'In Renovations' },
    ].map((stat) => (
      <div key={stat.label} className="text-center">
        <div className="text-4xl font-black text-amber-400 mb-1">{stat.num}</div>
        <div className="text-sm text-zinc-400 uppercase tracking-wide">{stat.label}</div>
      </div>
    ))}
  </div>
</div>
```

### Project gallery grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
  {projects.map((p) => (
    <motion.div key={p.id} className="group relative overflow-hidden aspect-square cursor-pointer"
      whileHover={{ scale: 1 }}>
      <motion.img src={p.image} alt={p.title} className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end p-6">
        <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <p className="text-amber-400 text-xs font-medium tracking-widest uppercase mb-1">{p.type}</p>
          <h3 className="text-white text-xl font-bold">{p.title}</h3>
          <p className="text-white/70 text-sm">{p.location}</p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
```

### Before/After slider
```tsx
import { useState, useRef } from 'react'
export function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    setPos(((e.clientX - rect.left) / rect.width) * 100)
  }
  return (
    <div ref={ref} className="relative w-full aspect-video overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMove}>
      <img src={after} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <span className="text-zinc-900 text-xs font-bold">⟺</span>
        </div>
      </div>
    </div>
  )
}
```

### Services with icon + accordion
```tsx
{services.map((s, i) => (
  <motion.div key={i} className="border-b border-zinc-800"
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
    <button className="w-full flex items-center justify-between py-6 text-left group"
      onClick={() => setOpen(open === i ? null : i)}>
      <div className="flex items-center gap-4">
        <span className="text-amber-400 text-2xl">{s.icon}</span>
        <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">{s.title}</h3>
      </div>
      <motion.span className="text-white/40" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
    </button>
    <AnimatePresence>
      {open === i && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
          className="overflow-hidden">
          <p className="pb-6 text-zinc-400 pl-14">{s.description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
))}
```

### Process timeline (horizontal)
```tsx
<div className="relative">
  <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-800" />
  <div className="grid grid-cols-4 gap-8">
    {steps.map((step, i) => (
      <motion.div key={i} className="relative"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mb-4 text-black font-bold">
          {i + 1}
        </div>
        <h4 className="text-white font-semibold mb-2">{step.title}</h4>
        <p className="text-zinc-400 text-sm">{step.description}</p>
      </motion.div>
    ))}
  </div>
</div>
```

## Reference Sites
- https://compassdesign.studio — minimal luxury
- https://milieu.ca — Toronto reno firm
- https://henrybuilt.com — kitchen design
- https://smallbone.co.uk — luxury kitchen
- https://deulonder.com — European agency vibes
- https://www.djcustomreno.ca — our own client
