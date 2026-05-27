# Color Palettes — Premium Web Design

## Dark Luxury (DJ Custom Reno / Motta Kitchen)
```css
:root {
  --bg-primary: #09090b;      /* zinc-950 */
  --bg-secondary: #111113;    /* slightly lighter */
  --bg-card: #18181b;         /* zinc-900 */
  --border: #27272a;          /* zinc-800 */
  --border-subtle: #3f3f46;   /* zinc-700 */
  --text-primary: #fafafa;    /* zinc-50 */
  --text-secondary: #a1a1aa;  /* zinc-400 */
  --text-muted: #71717a;      /* zinc-500 */
  --accent: #f59e0b;          /* amber-500 */
  --accent-bright: #fbbf24;   /* amber-400 */
  --accent-dark: #d97706;     /* amber-600 */
}
```

## Tailwind Amber Dark Theme
```tsx
// tailwind.config.js
colors: {
  brand: {
    50: '#fffbeb',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
  }
}

// Usage
<div className="bg-zinc-950 text-zinc-50">
  <span className="text-amber-500">Accent</span>
  <div className="border-zinc-800 bg-zinc-900">Card</div>
</div>
```

## Purple/Violet Dark (SaaS)
```css
--accent: #7c3aed;     /* violet-600 */
--accent-light: #a78bfa; /* violet-400 */
--bg-glow: rgba(124, 58, 237, 0.15);
```

## Blue Electric (Tech)
```css
--accent: #3b82f6;     /* blue-500 */
--accent-light: #60a5fa; /* blue-400 */
--bg-glow: rgba(59, 130, 246, 0.15);
```

## Gradient Presets (Tailwind)
```tsx
// Amber gradient text
<span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
  Gradient Text
</span>

// Purple to blue
<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">

// White to gray (subtle)
<span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
```

## CSS Gradient Mesh (Stripe-style)
```css
.gradient-mesh {
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
    #09090b;
}
```

## Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
/* Tailwind: bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl */
```

## Glow Effects
```css
/* Text glow */
.glow-text { text-shadow: 0 0 40px rgba(245, 158, 11, 0.5); }

/* Box glow */
.glow-box { box-shadow: 0 0 40px rgba(245, 158, 11, 0.15), 0 0 80px rgba(245, 158, 11, 0.05); }

/* Hover glow button */
.btn-glow:hover { box-shadow: 0 0 30px rgba(245, 158, 11, 0.4); }
```

## Dark Mode System
```tsx
// Tailwind dark mode (class-based)
// tailwind.config.js: darkMode: 'class'

// Toggle
<button onClick={() => document.documentElement.classList.toggle('dark')}>
  Toggle
</button>

// Usage
<div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
```
