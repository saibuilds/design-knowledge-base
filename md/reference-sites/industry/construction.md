# Construction / Renovation Sites — Design Reference

> For DJ Custom Reno, Motta Kitchen, and similar clients.

## Patterns That Win

### Dark luxury hero with project count
```tsx
<section className="relative min-h-screen bg-zinc-950 flex items-end pb-20">
  {/* Background with subtle texture */}
  <div className="absolute inset-0 bg-[url('/texture-concrete.jpg')] bg-cover opacity-10" />
  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
  
  {/* Project images floating */}
  <motion.div className="absolute top-20 right-20 w-80 h-60 rounded-lg overflow-hidden shadow-2xl"
    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
    <img src="/projects/kitchen-hero.jpg" className="w-full h-full object-cover" />
  </motion.div>
  
  <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
    <motion.p className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase mb-4"
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
      Toronto's Premier Kitchen Specialists
    </motion.p>
    <motion.h1 className="text-7xl md:text-[9rem] font-black text-white leading-[0.9] tracking-tighter mb-8"
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      MOTTA<br />KITCHEN
    </motion.h1>
    <div className="flex gap-16 items-center">
      <button className="px-10 py-4 bg-amber-500 text-zinc-950 font-bold rounded-none text-sm tracking-widest uppercase hover:bg-amber-400 transition-colors">
        View Portfolio
      </button>
      <div className="flex gap-12">
        {[['500+', 'Projects'], ['15yr', 'Experience'], ['4.9★', 'Rating']].map(([n, l]) => (
          <div key={l}>
            <div className="text-2xl font-black text-white">{n}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

### Project showcase with filter tabs
```tsx
const categories = ['All', 'Kitchen', 'Bathroom', 'Basement', 'Full Reno']
const [active, setActive] = useState('All')
const filtered = active === 'All' ? projects : projects.filter(p => p.type === active)

<>
  <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
    {categories.map((c) => (
      <button key={c} onClick={() => setActive(c)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
          active === c ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'
        }`}>
        {c}
      </button>
    ))}
  </div>
  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <AnimatePresence>
      {filtered.map((p) => (
        <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ProjectCard project={p} />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
</>
```

### Testimonial with real photo
```tsx
<section className="py-24 bg-zinc-900">
  <div className="max-w-4xl mx-auto px-8 text-center">
    <div className="text-amber-400 text-5xl mb-6">"</div>
    <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
      {testimonial.quote}
    </blockquote>
    <div className="flex items-center justify-center gap-4">
      <img src={testimonial.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-amber-500" />
      <div className="text-left">
        <p className="text-white font-semibold">{testimonial.name}</p>
        <p className="text-zinc-500 text-sm">{testimonial.location}</p>
      </div>
      <div className="ml-4 text-amber-400 text-sm">★★★★★</div>
    </div>
  </div>
</section>
```

### Contact with map embed
```tsx
<section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
  <div className="bg-zinc-950 p-12 md:p-20 flex flex-col justify-center">
    <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">Get In Touch</p>
    <h2 className="text-5xl font-black text-white mb-8">Start Your<br />Project Today</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="First Name" className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:border-amber-500 focus:outline-none transition-colors" />
        <input placeholder="Last Name" className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:border-amber-500 focus:outline-none transition-colors" />
      </div>
      <input placeholder="Email" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:border-amber-500 focus:outline-none transition-colors" />
      <select className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-3 rounded-lg focus:border-amber-500 focus:outline-none">
        <option value="">Project Type</option>
        <option>Kitchen Renovation</option>
        <option>Bathroom Renovation</option>
        <option>Basement Finishing</option>
        <option>Full Home Renovation</option>
      </select>
      <textarea rows={4} placeholder="Tell us about your project" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:border-amber-500 focus:outline-none resize-none" />
      <button className="w-full py-4 bg-amber-500 text-zinc-950 font-bold text-sm tracking-widest uppercase hover:bg-amber-400 transition-colors">
        Send Message
      </button>
    </form>
  </div>
  <div className="relative min-h-[400px]">
    <iframe src="https://maps.google.com/maps?q=Toronto&output=embed" className="absolute inset-0 w-full h-full" loading="lazy" />
  </div>
</section>
```

## Color Palette for Construction/Renovation
```css
/* Premium Dark Renovation */
--bg: #0a0a0a;
--surface: #111111;
--border: #1f1f1f;
--accent: #f59e0b;  /* amber-500 */
--accent-hover: #fbbf24; /* amber-400 */
--text: #ffffff;
--text-muted: #71717a; /* zinc-500 */

/* Alternative: Warm Premium */
--bg: #0d0b09;
--accent: #d97706; /* amber-600 */
--surface: #1a1612;
```
