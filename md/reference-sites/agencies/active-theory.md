# Active Theory — Agency Reference

> LA-based creative studio. Known for interactive WebGL experiences and immersive brand campaigns.
> URL: https://activetheory.net

## Key Patterns

### Fullscreen video/WebGL hero with scroll reveal
```tsx
<section className="relative h-screen overflow-hidden">
  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-105" src="/hero.mp4" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
  <motion.div className="absolute bottom-16 left-12 z-10"
    initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
    <h1 className="text-9xl font-black text-white leading-none tracking-tighter">
      ACTIVE<br/>THEORY
    </h1>
  </motion.div>
</section>
```

### Case study grid (masonry-like, images that scale on hover)
```tsx
<div className="grid grid-cols-12 gap-4">
  {projects.map((p, i) => (
    <motion.div key={p.id}
      className={`relative overflow-hidden rounded-lg cursor-pointer ${i % 3 === 0 ? 'col-span-7' : 'col-span-5'}`}
      style={{ aspectRatio: i % 3 === 0 ? '16/9' : '4/3' }}
      whileHover="hover">
      <motion.img src={p.image} className="w-full h-full object-cover"
        variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} />
      <motion.div className="absolute inset-0 bg-black/0 flex items-end p-6"
        variants={{ hover: { backgroundColor: 'rgba(0,0,0,0.4)' } }}>
        <motion.p className="text-white text-xl font-bold opacity-0"
          variants={{ hover: { opacity: 1, y: 0 } }} initial={{ y: 20 }}>
          {p.title}
        </motion.p>
      </motion.div>
    </motion.div>
  ))}
</div>
```

### Numbered list reveal
```tsx
{services.map((s, i) => (
  <motion.div key={i} className="border-t border-white/10 py-8 flex gap-8"
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-50px' }}
    transition={{ delay: i * 0.1 }}>
    <span className="text-white/30 font-mono text-sm w-8">0{i + 1}</span>
    <h3 className="text-3xl font-bold text-white">{s.title}</h3>
  </motion.div>
))}
```

## Design System
- Background: very dark navy or pure black
- Typography: grotesque/sans-serif, massive scale, tight tracking
- Grid: asymmetric 12-column
- Motion: viewport-triggered entrance, smooth lerp cursor
- No decorative elements — content IS the design
