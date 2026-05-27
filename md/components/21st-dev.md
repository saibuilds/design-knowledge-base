# 21st.dev — Free Copy-Paste Components

> All components are MIT licensed. You own the code 100%.
> Install: copy TSX from site or use Magic MCP (`npx shadcn@latest add "https://21st.dev/r/[name]"`)

## Site
- https://21st.dev (search "free" to filter paid)

## Top Free Categories

### Buttons
```tsx
// Shimmer button
<button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    {children}
  </span>
</button>

// Magnetic button (Framer Motion)
const MagneticButton = ({ children }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    x.set(dx * 0.3); y.set(dy * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x, y }} onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}>
      {children}
    </motion.button>
  )
}
```

### Navbars
```tsx
// Floating pill navbar
<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-black/80 backdrop-blur-md px-3 py-2 shadow-lg">
  {links.map(link => (
    <a key={link.href} href={link.href}
      className="relative px-4 py-1.5 text-sm text-white/70 hover:text-white rounded-full transition-colors hover:bg-white/10">
      {link.label}
    </a>
  ))}
  <button className="ml-2 px-4 py-1.5 text-sm bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
    Get Started
  </button>
</nav>
```

### Hero Sections
```tsx
// Gradient mesh hero
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
  {/* Gradient orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
  <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
    <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
      Build <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">faster</span>
    </h1>
    <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
      Production-ready components for modern web apps.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all">
        Get Started
      </button>
      <button className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all">
        Learn More
      </button>
    </div>
  </div>
</section>
```

### Cards
```tsx
// Spotlight card (follows cursor)
const SpotlightCard = ({ children }) => {
  const divRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  return (
    <div ref={divRef}
      onMouseMove={(e) => {
        const rect = divRef.current.getBoundingClientRect()
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        setOpacity(1)
      }}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity, background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(120,80,255,0.15), transparent 70%)` }} />
      {children}
    </div>
  )
}
```

### Text Animations
```tsx
// Typewriter
import { TypeAnimation } from 'react-type-animation'
<TypeAnimation sequence={['Build websites', 1000, 'Ship products', 1000, 'Make money', 1000]}
  wrapper="span" speed={50} repeat={Infinity} className="text-amber-400" />

// Scramble text
const ScrambleText = ({ text }) => {
  const chars = '!<>-_\\/[]{}—=+*^?#'
  const [output, setOutput] = useState(text)
  const scramble = () => {
    let i = 0
    const interval = setInterval(() => {
      setOutput(text.split('').map((c, idx) => idx < i ? c : chars[Math.floor(Math.random() * chars.length)]).join(''))
      if (++i > text.length) clearInterval(interval)
    }, 30)
  }
  return <span onMouseEnter={scramble}>{output}</span>
}
```

### Inputs / Forms
```tsx
// Floating label input
<div className="relative">
  <input type="text" id="name" placeholder=" "
    className="peer w-full border border-white/20 bg-transparent px-4 pt-5 pb-2 rounded-lg text-white outline-none focus:border-amber-400 transition-colors" />
  <label htmlFor="name"
    className="absolute left-4 top-2 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-amber-400">
    Full Name
  </label>
</div>
```

## Install via shadcn CLI
```bash
# Individual components
npx shadcn@latest add "https://21st.dev/r/magic-button"
npx shadcn@latest add "https://21st.dev/r/spotlight-card"
npx shadcn@latest add "https://21st.dev/r/floating-navbar"
```

## Related
- hover.dev (Framer Motion variants)
- magicui.design (animated wrappers)
- originui.com (shadcn-compatible)
