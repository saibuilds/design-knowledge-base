# SaaS Design Patterns — Reference

> Patterns from Linear, Vercel, Stripe, Supabase, Raycast, Resend, Clerk.

## Hero Patterns

### Linear-style hero (code + UI screenshot)
```tsx
<section className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 py-24">
  {/* Badge */}
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
    <span className="text-sm text-white/70">Now in public beta</span>
  </div>
  {/* Headline */}
  <h1 className="text-5xl md:text-7xl font-bold text-white text-center leading-tight max-w-4xl mb-6">
    Build products your <span className="text-zinc-400">users will love</span>
  </h1>
  <p className="text-xl text-zinc-400 text-center max-w-xl mb-10">
    The fastest way to go from idea to shipped. Beautifully simple, remarkably powerful.
  </p>
  {/* CTAs */}
  <div className="flex gap-3 mb-16">
    <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-zinc-100 transition-colors">
      Start for free
    </button>
    <button className="px-6 py-3 bg-transparent text-white border border-white/20 rounded-lg font-semibold text-sm hover:bg-white/5 transition-colors">
      View changelog →
    </button>
  </div>
  {/* App screenshot */}
  <div className="relative w-full max-w-5xl">
    <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
      <img src="/app-screenshot.png" alt="App" className="w-full" />
    </div>
    {/* Glow under */}
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-purple-600/20 blur-3xl" />
  </div>
</section>
```

### Feature grid (bento)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-6">
  {/* Large feature */}
  <div className="md:col-span-2 rounded-2xl bg-zinc-900 border border-zinc-800 p-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
    <h3 className="text-xl font-semibold text-white mb-2">Real-time collaboration</h3>
    <p className="text-zinc-400 text-sm mb-6">Work together in real-time with your entire team.</p>
    <img src="/feature-collab.png" className="w-full rounded-lg border border-zinc-700" />
  </div>
  {/* Small feature */}
  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8">
    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
      <span className="text-amber-400">⚡</span>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">Lightning fast</h3>
    <p className="text-zinc-400 text-sm">Optimized for performance. Sub-100ms response times.</p>
  </div>
</div>
```

### Pricing cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
  {plans.map((plan) => (
    <div key={plan.name}
      className={`rounded-2xl p-8 border ${plan.featured ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
      {plan.featured && (
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">Most Popular</div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-5xl font-black text-white">${plan.price}</span>
        <span className="text-zinc-400">/mo</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="text-amber-400">✓</span> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${plan.featured ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
        {plan.cta}
      </button>
    </div>
  ))}
</div>
```

### Logo marquee (social proof)
```tsx
<div className="py-12 border-t border-b border-zinc-800 overflow-hidden">
  <p className="text-center text-zinc-500 text-sm mb-8 uppercase tracking-widest">Trusted by teams at</p>
  <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
    {[...logos, ...logos].map((logo, i) => (
      <img key={i} src={logo} alt="" className="h-6 opacity-40 hover:opacity-70 transition-opacity grayscale" />
    ))}
  </div>
</div>
```

### CTA section
```tsx
<section className="py-32 px-6 text-center relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent" />
  <h2 className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10">
    Ready to ship faster?
  </h2>
  <p className="text-xl text-zinc-400 mb-10 max-w-lg mx-auto relative z-10">
    Join 10,000+ teams already building with us.
  </p>
  <div className="flex gap-4 justify-center relative z-10">
    <button className="px-8 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-lg">
      Start for free
    </button>
    <button className="px-8 py-4 border border-zinc-700 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors text-lg">
      Talk to sales
    </button>
  </div>
</section>
```

## Reference Sites
- https://linear.app — best SaaS design overall
- https://vercel.com — dark glassmorphism
- https://stripe.com — gradient mesh + docs
- https://supabase.com — green accent, open source
- https://raycast.com — macOS-native aesthetic
- https://resend.com — minimal developer tool
- https://clerk.com — auth product, glassmorphism
