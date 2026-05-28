# Top Website Inspiration & Pattern Reference

> Use these sites as design benchmarks. Study their patterns, copy their techniques.
> Each entry includes: what makes it great, key patterns, and how to apply to our 4 brands.

---

## 1. Linear.app
> https://linear.app — Project management SaaS, dark mode, ultra-polished

### Why It's a Benchmark
- Gradient mesh hero that feels alive without being distracting
- Feature grid with subtle glow on hover
- Typography hierarchy: bold headline → short subtitle → CTA
- Section transitions feel seamless (no hard edges)

### Key Patterns
1. **Gradient mesh background** — radial gradients at corners create depth
2. **Feature bento grid** — 2-col and 3-col mixed layout
3. **Social proof strip** — logos of known customers as horizontal scroll
4. **Sticky transparent nav** — blur effect, collapses on scroll
5. **"Built for speed" stat section** — numbers animate in on scroll

### HTML/CSS Replica — Gradient Mesh Hero
```html
<section class="linear-hero">
  <div class="mesh-bg"></div>
  <div class="hero-content">
    <p class="eyebrow">Toronto's Trusted Renovation Team</p>
    <h1>Kitchens. Bathrooms.<br>Garden Suites.</h1>
    <p class="subtitle">Full-service renovation from concept to completion. Licensed, insured, and trusted by 500+ Toronto homeowners.</p>
    <div class="cta-row">
      <a href="#quote" class="btn-primary">Get a Free Quote</a>
      <a href="#work" class="btn-ghost">See Our Work →</a>
    </div>
  </div>
</section>

<style>
.linear-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080808;
  overflow: hidden;
}
.mesh-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 20%, rgba(245,158,11,0.15) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 80%, rgba(245,158,11,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%);
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}
.eyebrow {
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f59e0b;
  margin-bottom: 1.5rem;
}
h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 1.5rem;
}
.subtitle {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.6);
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}
.cta-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  padding: 0.875rem 2rem;
  background: #f59e0b;
  color: #000;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.4); }
.btn-ghost {
  padding: 0.875rem 2rem;
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  border-radius: 9999px;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
</style>
```

### Apply to Our Brands
- **DJ Custom Reno**: amber mesh, headline = "Kitchens. Bathrooms. Epoxy Floors."
- **SathiDeals**: gold mesh, headline = "Buy. Sell. Invest. Toronto."
- **Motta Kitchen**: brass tones on cream background
- **GardenSuites4You**: yellow/navy mesh

---

## 2. Stripe.com
> https://stripe.com — Payments platform, purple gradients, trust-heavy

### Why It's a Benchmark
- Animated gradient background that slowly shifts
- "Works with everything" integration logos section
- Feature sections with icon → headline → paragraph pattern
- Trust signals everywhere: security badges, customer logos

### Key Patterns
1. **Animated gradient** — CSS hue-rotate animation on background
2. **Blurred gradient orbs** — absolute positioned colored blurs create depth
3. **Feature card strip** — icon + title + 2-line description, 3 across
4. **"Used by" logos** — grayscale → color on hover
5. **Sticky navigation** with blur backdrop

### HTML/CSS Replica — Animated Gradient Orb Background
```html
<section class="stripe-hero">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <div class="content">
    <h1>Financial infrastructure<br>for the internet</h1>
    <p>Millions of businesses use Stripe to accept payments.</p>
  </div>
</section>

<style>
.stripe-hero {
  position: relative;
  background: #0a0a0a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: drift 8s ease-in-out infinite alternate;
}
.orb-1 { width: 600px; height: 600px; background: rgba(245,158,11,0.3); top: -200px; left: -100px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: rgba(192,192,192,0.2); bottom: -100px; right: -50px; animation-delay: -3s; }
.orb-3 { width: 300px; height: 300px; background: rgba(255,215,0,0.15); top: 40%; left: 60%; animation-delay: -6s; }
@keyframes drift {
  0% { transform: translate(0,0) scale(1); }
  100% { transform: translate(40px, -30px) scale(1.1); }
}
.content { position: relative; z-index: 1; text-align: center; color: #fff; }
</style>
```

---

## 3. Vercel.com
> https://vercel.com — Deployment platform, dark hero, glow effects

### Key Patterns
1. **Dark hero with center glow** — radial gradient from center, white glow
2. **Deploy card animation** — terminal-style code block with typing animation
3. **Feature tiles** — dark cards with subtle border, icon + text
4. **"Deploy in seconds"** — animated deployment flow diagram

### HTML/CSS Replica — Center Glow Hero
```html
<section class="vercel-hero">
  <div class="center-glow"></div>
  <div class="grid-overlay"></div>
  <div class="content">
    <span class="badge">Now live in Toronto</span>
    <h1>Build and deploy<br>your renovation website</h1>
  </div>
</section>

<style>
.vercel-hero {
  background: #000;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.center-glow {
  position: absolute;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
}
.badge {
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 1.5rem;
}
.content { position: relative; z-index: 1; text-align: center; color: #fff; }
h1 { font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; line-height: 1.1; }
</style>
```

---

## 4. Apple.com
> https://apple.com — Consumer electronics, scroll-pinned reveals, cinematic

### Key Patterns
1. **Scroll-pinned text reveal** — text appears/disappears as you scroll through pinned section
2. **Product zoom** — image scales up on scroll
3. **Dark section → light section** — dramatic contrast between sections
4. **Spec grid** — clean table/grid of technical specs

### JavaScript — Scroll-Pinned Text Reveal
```javascript
// Scroll-triggered text swap (Apple style)
// Each "chapter" of text appears as you scroll through a pinned section
const chapters = document.querySelectorAll('.chapter');
const section = document.querySelector('.pinned-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      chapters.forEach(c => c.classList.remove('active'));
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.5 });

chapters.forEach(c => observer.observe(c));
```

```css
.pinned-section { position: sticky; top: 0; height: 100vh; }
.chapter { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; position: absolute; }
.chapter.active { opacity: 1; transform: translateY(0); }
```

---

## 5. Framer.com
> https://framer.com — Design tool, animated hero, noise texture

### Key Patterns
1. **Noise texture overlay** — SVG/canvas grain over gradients
2. **Animated word swap** — hero headline cycles through words
3. **Floating cards** — cards with shadow, slight rotation, layered
4. **Blur-behind nav** — `backdrop-filter: blur(20px)`

### CSS — Noise Texture Overlay
```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}
```

### JavaScript — Animated Word Swap
```javascript
const words = ['Kitchens', 'Bathrooms', 'Garden Suites', 'Epoxy Floors', 'Basements'];
let i = 0;
const el = document.querySelector('.rotating-word');
setInterval(() => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    el.textContent = words[++i % words.length];
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 300);
}, 2500);
```

---

## 6. Loom.com
> https://loom.com — Video messaging, video hero, overlay CTA

### Key Patterns
1. **Video background hero** — muted autoplay video with dark overlay
2. **Play button CTA** — centered play button opens modal video
3. **Social proof ticker** — scrolling logos strip
4. **Feature demo** — animated product screenshot

### HTML — Video Hero
```html
<section class="video-hero">
  <video autoplay muted loop playsinline class="bg-video">
    <source src="/hero-video.mp4" type="video/mp4">
  </video>
  <div class="overlay"></div>
  <div class="content">
    <h1>See the transformation</h1>
    <button class="play-btn" onclick="openVideo()">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </button>
  </div>
</section>

<style>
.video-hero { position: relative; height: 100vh; overflow: hidden; }
.bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
.content { position: relative; z-index: 1; color: #fff; text-align: center; }
.play-btn {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, background 0.2s;
}
.play-btn:hover { transform: scale(1.1); background: rgba(255,255,255,0.25); }
.play-btn svg { width: 28px; height: 28px; }
</style>
```

---

## 7. Notion.so
> https://notion.so — Productivity, clean white, feature-rich sections

### Key Patterns
1. **Clean white sections** — lots of whitespace, no dark backgrounds
2. **Split layout** — text left, screenshot/mockup right
3. **Feature grid** — 3-col icon cards, minimal
4. **Testimonial wall** — masonry grid of quote cards

### HTML/CSS — Feature Card Grid
```html
<section class="features">
  <div class="features-grid">
    <div class="feature-card">
      <div class="icon">🏗️</div>
      <h3>Full Renovation</h3>
      <p>Kitchen, bathroom, basement — one contractor, one contact, zero surprises.</p>
    </div>
    <div class="feature-card">
      <div class="icon">🎨</div>
      <h3>Cabinet Spraying</h3>
      <p>Factory finish in your existing kitchen. Any colour, any sheen.</p>
    </div>
    <div class="feature-card">
      <div class="icon">🏡</div>
      <h3>Garden Suites</h3>
      <p>Turn your backyard into income. Permits, design, build — all in.</p>
    </div>
  </div>
</section>

<style>
.features { padding: 6rem 2rem; background: #fff; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; max-width: 1100px; margin: 0 auto; }
.feature-card { padding: 2rem; border: 1px solid #e5e7eb; border-radius: 12px; transition: box-shadow 0.2s; }
.feature-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
.icon { font-size: 2rem; margin-bottom: 1rem; }
h3 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #111; }
p { color: #6b7280; line-height: 1.6; font-size: 0.95rem; }
</style>
```

---

## 8. Arc Browser (The Browser Company)
> https://arc.net — Browser app, bold gradients, playful

### Key Patterns
1. **Giant bold headline** — 80-100px font, minimal other content
2. **Gradient text** — headline text has gradient fill
3. **Section-per-feature** — one big thing per screen
4. **Colorful blobs** — organic shape blobs, blurred, layered

### CSS — Gradient Text Headline
```css
.gradient-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 9. Awwwards SOTD Winners (Pattern Library)
> https://awwwards.com/websites/sites_of_the_day/

### Recurring Patterns in Top Sites
1. **Horizontal scroll sections** — carousel that scrolls on mouse wheel
2. **Cursor follower** — custom cursor that grows on hover
3. **Page transitions** — curtain wipe or scale reveal between pages
4. **Parallax depth layers** — foreground/background move at different rates
5. **SVG path animation** — lines draw themselves on scroll

### JavaScript — Custom Cursor
```javascript
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});
```

```css
.custom-cursor {
  position: fixed;
  width: 12px; height: 12px;
  background: #f59e0b;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  z-index: 9999;
  mix-blend-mode: difference;
}
.custom-cursor.grow { width: 40px; height: 40px; background: rgba(245,158,11,0.5); }
```

---

## 10. SaaS Landing Pages (General Pattern)
> Inspired by: Resend.com, Raycast.com, Cal.com

### The Conversion-Optimized Structure
```
1. Nav — logo left, links center, CTA right (sticky + blur)
2. Hero — headline + subtitle + dual CTA + social proof number
3. "As seen in" / trust logos strip
4. Feature section 1 — big image/demo left, text right
5. Feature section 2 — text left, big image/demo right
6. Stats section — 3-4 big numbers
7. Testimonials — 3-col masonry or carousel
8. Pricing — 3 tiers
9. FAQ accordion
10. Final CTA — full-width dark section with single button
11. Footer
```

### Apply to DJ Custom Reno
```
1. Nav: logo + [Services, Gallery, About, Blog] + "Get a Quote"
2. Hero: "Toronto's #1 Cabinet & Renovation Specialists" + stats
3. Trust: Google Reviews 4.9★ | 500+ Projects | Licensed + Insured
4. Feature: Cabinet Spraying — image of spray booth + copy
5. Feature: Garden Suites — render of suite + ROI copy
6. Stats: 500+ Projects | 15,000+ Doors Sprayed | 8 Years | 4.9★
7. Testimonials: 3 homeowner quotes
8. Services grid
9. FAQ: "How long does a kitchen reno take?" etc.
10. CTA: "Ready to Transform Your Space? Get a Free Quote Today"
```

---

## Quick Reference — Which Pattern for Which Brand

| Pattern | DJ Custom Reno | Motta Kitchen | SathiDeals | GardenSuites4You |
|---------|---------------|---------------|------------|-----------------|
| Linear gradient mesh hero | ✓ amber | ✓ brass | ✓ gold | ✓ yellow |
| Scroll-pinned reveals | Before/after | Collection reveal | Listing reveal | Build timeline |
| Video background | Spray booth | Kitchen build | Property tour | Suite construction |
| Feature bento grid | 6 services | Collections | Neighbourhoods | Permit steps |
| Animated counters | Doors sprayed | Projects done | Homes sold | Suites built |
| Custom cursor | ✓ | ✓ premium | ✓ | optional |
| Dark → light sections | ✓ | ✓ | ✓ | ✓ |
| Testimonial wall | Homeowners | Kitchen owners | Buyers/sellers | Suite owners |
