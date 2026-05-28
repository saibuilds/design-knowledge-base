# World-Class Hero & Landing Section Replicas

---

## Linear — Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Linear — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #0a0a0f; }
  /* Animated gradient headline */
  .gradient-text {
    background: linear-gradient(135deg, #fff 0%, #a78bfa 40%, #6366f1 70%, #fff 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s ease infinite;
  }
  @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  /* Radial gradient orb */
  .orb {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%);
    animation: pulse-orb 6s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes pulse-orb { 0%,100%{transform:scale(1) translateY(0)} 50%{transform:scale(1.08) translateY(-20px)} }
  .btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transition: all 0.2s;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(99,102,241,0.4); }
  .btn-secondary { border: 1px solid rgba(255,255,255,0.15); transition: all 0.2s; }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.05); }
  /* Subtle grid background */
  .grid-bg {
    background-image: linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
  }
</style>
</head>
<body class="grid-bg min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <!-- Ambient orb centered behind headline -->
  <div class="orb" style="top:50%;left:50%;transform:translate(-50%,-50%)"></div>

  <!-- Nav -->
  <nav class="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50">
    <span class="text-white font-semibold tracking-tight">Linear</span>
    <div class="flex gap-6 text-sm text-gray-400">
      <a href="#" class="hover:text-white transition-colors">Features</a>
      <a href="#" class="hover:text-white transition-colors">Pricing</a>
      <a href="#" class="hover:text-white transition-colors">Changelog</a>
    </div>
    <button class="text-sm text-white btn-primary px-4 py-1.5 rounded-full">Get started</button>
  </nav>

  <!-- Hero content -->
  <div class="relative z-10 text-center max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs mb-8">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
      Now in public beta
    </div>
    <h1 class="gradient-text text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
      Build software<br>for the future
    </h1>
    <p class="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
      Linear is a purpose-built tool for modern product development. Streamline issues, projects, and roadmaps.
    </p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button class="btn-primary text-white px-6 py-3 rounded-lg font-medium text-sm">Start for free</button>
      <button class="btn-secondary text-gray-300 px-6 py-3 rounded-lg font-medium text-sm">View demo →</button>
    </div>
    <p class="text-gray-600 text-xs mt-4">No credit card required</p>
  </div>
</body>
</html>
```

---

## Linear — Feature Bento Grid
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Linear — Features</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #0a0a0f; }
  /* Bento card hover glow */
  .bento-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .bento-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.12), transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .bento-card:hover::before { opacity: 1; }
  .bento-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); }
  .icon-wrap {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(99,102,241,0.15);
    font-size: 18px;
  }
</style>
</head>
<body class="min-h-screen px-6 py-20">
  <div class="max-w-5xl mx-auto">
    <p class="text-indigo-400 text-sm font-medium text-center mb-3 tracking-wide uppercase">Features</p>
    <h2 class="text-white text-4xl font-bold text-center mb-14 tracking-tight">Everything your team needs</h2>

    <!-- Bento grid: 3 cols, mixed heights -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Wide card -->
      <div class="bento-card md:col-span-2 p-6">
        <div class="icon-wrap mb-4">⚡</div>
        <h3 class="text-white font-semibold text-lg mb-2">Blazing fast</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Linear is built for speed. Every interaction is instant. Keyboard shortcuts work everywhere. No more waiting.</p>
        <div class="mt-6 flex gap-2">
          <span class="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">50ms avg response</span>
          <span class="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Offline mode</span>
        </div>
      </div>
      <!-- Tall card -->
      <div class="bento-card p-6 flex flex-col justify-between">
        <div>
          <div class="icon-wrap mb-4">🔀</div>
          <h3 class="text-white font-semibold text-lg mb-2">Git sync</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Auto-close issues from commits. Branches linked to tasks.</p>
        </div>
        <div class="mt-6 h-12 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center px-3">
          <span class="text-xs text-indigo-300 font-mono">feat/LIN-234-dark-mode</span>
        </div>
      </div>
      <!-- Small card -->
      <div class="bento-card p-6">
        <div class="icon-wrap mb-4">📊</div>
        <h3 class="text-white font-semibold text-lg mb-2">Roadmaps</h3>
        <p class="text-gray-500 text-sm">Visual timelines that stay in sync with your actual work.</p>
      </div>
      <!-- Small card -->
      <div class="bento-card p-6">
        <div class="icon-wrap mb-4">🔔</div>
        <h3 class="text-white font-semibold text-lg mb-2">Smart alerts</h3>
        <p class="text-gray-500 text-sm">Only get notified about what actually matters to you.</p>
      </div>
      <!-- Wide card -->
      <div class="bento-card p-6">
        <div class="icon-wrap mb-4">🧩</div>
        <h3 class="text-white font-semibold text-lg mb-2">Integrations</h3>
        <p class="text-gray-500 text-sm">GitHub, Slack, Figma, and 50+ more out of the box.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Stripe — Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stripe — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; overflow: hidden; }
  /* Animated gradient mesh background */
  .bg-mesh {
    background: linear-gradient(135deg, #0a2540 0%, #1a1a5e 25%, #0d3b6e 50%, #1e0a3c 75%, #0a2540 100%);
    background-size: 400% 400%;
    animation: mesh 8s ease infinite;
  }
  @keyframes mesh { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  /* Floating card animations */
  .card-float { animation: float 6s ease-in-out infinite; }
  .card-float-2 { animation: float 6s ease-in-out 1.5s infinite; }
  .card-float-3 { animation: float 6s ease-in-out 3s infinite; }
  @keyframes float { 0%,100%{transform:translateY(0) rotate(var(--r,0deg))} 50%{transform:translateY(-15px) rotate(var(--r,0deg))} }
  .glass-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
  }
  .cta-btn {
    background: #635bff;
    transition: all 0.2s;
  }
  .cta-btn:hover { background: #7c75ff; transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,91,255,0.5); }
</style>
</head>
<body class="bg-mesh min-h-screen flex items-center justify-center px-6 relative">
  <!-- Floating UI card mockups -->
  <div class="absolute right-16 top-1/4 card-float" style="--r:-6deg">
    <div class="glass-card p-4 w-52 shadow-2xl">
      <div class="text-xs text-blue-200 mb-1">Payment received</div>
      <div class="text-white font-bold text-xl">$2,450.00</div>
      <div class="text-xs text-blue-300 mt-1">Visa •••• 4242</div>
      <div class="mt-3 h-1.5 bg-white/10 rounded-full"><div class="h-full w-4/5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div></div>
    </div>
  </div>
  <div class="absolute right-36 top-1/2 card-float-2" style="--r:4deg">
    <div class="glass-card p-3 w-44 shadow-xl">
      <div class="text-xs text-green-300 flex items-center gap-1"><span>●</span> Live</div>
      <div class="text-white text-sm font-semibold mt-1">$84,219 today</div>
      <div class="flex gap-1 mt-2">
        <div class="h-8 w-3 bg-blue-400/40 rounded-sm self-end"></div>
        <div class="h-12 w-3 bg-blue-400/60 rounded-sm self-end"></div>
        <div class="h-6 w-3 bg-blue-400/40 rounded-sm self-end"></div>
        <div class="h-14 w-3 bg-purple-400/80 rounded-sm self-end"></div>
        <div class="h-10 w-3 bg-blue-400/60 rounded-sm self-end"></div>
        <div class="h-16 w-3 bg-purple-400 rounded-sm self-end"></div>
      </div>
    </div>
  </div>

  <!-- Main content -->
  <div class="relative z-10 max-w-xl">
    <h1 class="text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
      Financial infrastructure for the internet
    </h1>
    <p class="text-blue-200 text-lg leading-relaxed mb-8">
      Millions of companies of all sizes use Stripe to accept payments, send payouts, and manage their businesses online.
    </p>
    <div class="flex flex-wrap gap-3">
      <button class="cta-btn text-white px-6 py-3 rounded-md font-semibold text-sm">Start now</button>
      <button class="text-white border border-white/25 px-6 py-3 rounded-md font-semibold text-sm hover:bg-white/10 transition-colors">Contact sales</button>
    </div>
  </div>
</body>
</html>
```

---

## Stripe — Stats Section
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stripe — Stats</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #0a2540; }
  .stat-val { font-variant-numeric: tabular-nums; }
  /* Count-up animation via CSS */
  @keyframes count-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .stat-card { animation: count-up 0.6s ease both; }
  .stat-card:nth-child(1) { animation-delay: 0.1s; }
  .stat-card:nth-child(2) { animation-delay: 0.25s; }
  .stat-card:nth-child(3) { animation-delay: 0.4s; }
  .divider { width: 1px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent); }
</style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center px-6 py-20">
  <p class="text-blue-400 text-sm font-medium mb-3 tracking-widest uppercase">Trusted globally</p>
  <h2 class="text-white text-4xl font-bold text-center mb-16 max-w-xl">The numbers speak for themselves</h2>

  <div class="flex flex-col md:flex-row items-center justify-center gap-0 max-w-4xl w-full">
    <div class="stat-card flex-1 text-center px-10 py-8">
      <!-- JS counter -->
      <div class="stat-val text-white text-6xl font-extrabold tracking-tight" id="c1">$0</div>
      <div class="text-blue-300 mt-3 font-medium">Billions processed annually</div>
      <div class="text-blue-500 text-sm mt-1">across 195+ countries</div>
    </div>
    <div class="divider hidden md:block self-stretch"></div>
    <div class="stat-card flex-1 text-center px-10 py-8">
      <div class="stat-val text-white text-6xl font-extrabold tracking-tight" id="c2">0%</div>
      <div class="text-blue-300 mt-3 font-medium">Uptime SLA</div>
      <div class="text-blue-500 text-sm mt-1">enterprise-grade reliability</div>
    </div>
    <div class="divider hidden md:block self-stretch"></div>
    <div class="stat-card flex-1 text-center px-10 py-8">
      <div class="stat-val text-white text-6xl font-extrabold tracking-tight" id="c3">0</div>
      <div class="text-blue-300 mt-3 font-medium">Countries supported</div>
      <div class="text-blue-500 text-sm mt-1">local payment methods everywhere</div>
    </div>
  </div>

  <script>
    // Animated counter utility
    function animateCounter(el, end, prefix='', suffix='', duration=1800) {
      let start = 0, step = end / (duration / 16);
      const tick = () => {
        start = Math.min(start + step, end);
        el.textContent = prefix + (Number.isInteger(end) ? Math.round(start) : start.toFixed(2)) + suffix;
        if (start < end) requestAnimationFrame(tick);
      };
      tick();
    }
    // Trigger on viewport entry
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter(document.getElementById('c1'), 640, '$', 'B');
        animateCounter(document.getElementById('c2'), 99.99, '', '%');
        animateCounter(document.getElementById('c3'), 195, '', '+');
        obs.disconnect();
      }
    });
    obs.observe(document.getElementById('c1'));
  </script>
</body>
</html>
```

---

## Vercel — Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vercel — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Geist', 'Inter', sans-serif; background: #000; }
  /* Terminal deploy animation */
  .terminal-line { opacity: 0; animation: appear 0.4s ease forwards; }
  .terminal-line:nth-child(1){animation-delay:0.3s}
  .terminal-line:nth-child(2){animation-delay:0.9s}
  .terminal-line:nth-child(3){animation-delay:1.5s}
  .terminal-line:nth-child(4){animation-delay:2.1s}
  .terminal-line:nth-child(5){animation-delay:2.7s}
  @keyframes appear { to { opacity: 1; } }
  /* Gradient headline */
  .hero-text {
    background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.4) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  /* Glow under terminal */
  .glow { box-shadow: 0 0 80px 10px rgba(255,255,255,0.04); }
  .cursor { animation: blink 1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  /* Radial fade from center */
  .radial-fade {
    background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 70%);
  }
</style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="radial-fade absolute inset-0 pointer-events-none"></div>

  <!-- Nav -->
  <nav class="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50 border-b border-white/5">
    <div class="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 76 65" fill="white"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/></svg>
      <span class="text-white font-semibold">Vercel</span>
    </div>
    <button class="text-sm bg-white text-black px-4 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors">Deploy</button>
  </nav>

  <div class="relative z-10 text-center max-w-3xl mx-auto mt-8">
    <h1 class="hero-text text-6xl md:text-8xl font-black leading-none tracking-tighter mb-6">
      Ship faster.
    </h1>
    <p class="text-gray-400 text-lg max-w-lg mx-auto mb-10">
      Vercel is the platform for frontend developers, providing the speed and reliability innovators need.
    </p>

    <!-- Terminal mockup -->
    <div class="glow mx-auto max-w-md rounded-xl bg-[#111] border border-white/10 text-left overflow-hidden mb-8">
      <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="text-xs text-gray-500 ml-2 font-mono">terminal</span>
      </div>
      <div class="p-4 font-mono text-sm space-y-1">
        <div class="terminal-line text-gray-400">$ vercel deploy</div>
        <div class="terminal-line text-gray-500">Deploying to production...</div>
        <div class="terminal-line text-blue-400">✓ Build completed in 8.2s</div>
        <div class="terminal-line text-green-400">✓ Deployed to https://myapp.vercel.app</div>
        <div class="terminal-line text-gray-300">Ready! <span class="cursor">▋</span></div>
      </div>
    </div>

    <div class="flex gap-3 justify-center">
      <button class="bg-white text-black px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-gray-100 transition-colors">Start deploying</button>
      <button class="text-white border border-white/20 px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-white/5 transition-colors">Get a demo</button>
    </div>
  </div>
</body>
</html>
```

---

## Vercel — Feature Grid
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vercel — Features</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #000; }
  /* Gradient border on hover using pseudo-element */
  .feat-card {
    background: #111;
    border: 1px solid #222;
    border-radius: 12px;
    transition: border-color 0.3s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }
  .feat-card::after {
    content: '';
    position: absolute; inset: 0; border-radius: 12px;
    background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .feat-card:hover { border-color: rgba(255,255,255,0.25); transform: translateY(-3px); }
  .feat-card:hover::after { opacity: 1; }
  .feat-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.07);
    font-size: 16px;
  }
</style>
</head>
<body class="min-h-screen px-6 py-20">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-white text-4xl font-bold text-center mb-4 tracking-tight">Your complete platform</h2>
    <p class="text-gray-500 text-center mb-14 max-w-lg mx-auto">Everything you need to build and ship great products on the web.</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">🌍</div>
        <h3 class="text-white font-semibold mb-2">Edge Network</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Deployed to 100+ cities worldwide. Sub-millisecond cache. Instant invalidation.</p>
      </div>
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">⚡</div>
        <h3 class="text-white font-semibold mb-2">Instant Rollbacks</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Every deploy is immutable. Roll back to any previous deployment in one click.</p>
      </div>
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">🔒</div>
        <h3 class="text-white font-semibold mb-2">Preview Deployments</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Every pull request gets a live URL. Share with your team before merging.</p>
      </div>
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">📈</div>
        <h3 class="text-white font-semibold mb-2">Analytics</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Real user performance metrics. Core Web Vitals tracked automatically.</p>
      </div>
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">🔧</div>
        <h3 class="text-white font-semibold mb-2">Framework-aware</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Zero-config for Next.js, Nuxt, SvelteKit, Astro, Remix, and more.</p>
      </div>
      <div class="feat-card p-6">
        <div class="feat-icon mb-4">🤝</div>
        <h3 class="text-white font-semibold mb-2">Team collaboration</h3>
        <p class="text-gray-500 text-sm leading-relaxed">Comments on previews, environment variables per team, SSO support.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Apple Style — Product Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apple Style — Product Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #000; scroll-behavior: smooth; }
  /* Full-bleed hero */
  .hero-section { min-height: 100vh; background: radial-gradient(ellipse 120% 80% at 50% 80%, #1a1a2e 0%, #000 60%); }
  /* Spec items fade in on scroll simulation */
  .spec-item { opacity: 0; transform: translateY(20px); animation: fadeUp 0.6s ease forwards; }
  .spec-item:nth-child(1){animation-delay:0.1s}.spec-item:nth-child(2){animation-delay:0.2s}
  .spec-item:nth-child(3){animation-delay:0.3s}.spec-item:nth-child(4){animation-delay:0.4s}
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  /* Product image glow */
  .product-glow {
    filter: drop-shadow(0 0 60px rgba(100,150,255,0.3));
    animation: float 8s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  /* Gradient text */
  .rainbow-text {
    background: linear-gradient(90deg, #a0c4ff, #bdb2ff, #ffc6ff, #a0c4ff);
    background-size: 200%;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: slide-gradient 4s linear infinite;
  }
  @keyframes slide-gradient { to { background-position: 200%; } }
</style>
</head>
<body>
  <!-- Sticky nav -->
  <nav class="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-8 py-4">
      <svg width="20" height="24" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.8 268.5-317.8 69.5 0 127.5 45.8 170.5 45.8 41.1 0 105.3-48.3 183.1-48.3zM555.5 150.5c34.7-41.1 59.3-98.5 59.3-155.9 0-8.3-.6-16.5-2.1-23.5-55.9 2.1-123.3 37.3-164 81.5-31.5 35.9-61.5 93.3-61.5 151.7 0 9 1.5 17.9 2.1 20.8 3.5.6 9 1.5 14.5 1.5 50.1 0 112.5-33.9 151.7-76.1z"/></svg>
      <div class="flex gap-8 text-sm text-gray-300">
        <a href="#" class="hover:text-white transition-colors">Store</a>
        <a href="#" class="hover:text-white transition-colors">Mac</a>
        <a href="#" class="hover:text-white transition-colors">iPhone</a>
        <a href="#" class="hover:text-white transition-colors">Watch</a>
      </div>
      <div class="flex gap-4 text-sm">
        <button class="text-blue-400 hover:text-blue-300 transition-colors">Buy</button>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero-section flex flex-col items-center justify-center text-center pt-20 px-4">
    <p class="rainbow-text text-sm font-semibold tracking-widest uppercase mb-4">New — Pro Max</p>
    <h1 class="text-white text-7xl md:text-8xl font-bold tracking-tight leading-none mb-4">iPhone 17 Pro</h1>
    <p class="text-gray-400 text-xl mb-2">Titanium. So strong. So light. So Pro.</p>
    <div class="flex gap-4 mt-6 mb-12">
      <button class="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-400 transition-colors">Learn more</button>
      <button class="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors border border-blue-400/40 px-6 py-2.5 rounded-full">Buy →</button>
    </div>
    <!-- Product image placeholder -->
    <div class="product-glow">
      <div class="w-56 h-[420px] rounded-[3rem] bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-gray-600 relative shadow-2xl flex items-center justify-center">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl border-b border-gray-700"></div>
        <div class="text-5xl">📱</div>
      </div>
    </div>
  </section>

  <!-- Specs below fold -->
  <section class="bg-[#111] py-20 px-6">
    <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="spec-item text-center"><div class="text-3xl font-bold text-white">A19</div><div class="text-gray-500 text-sm mt-1">Pro chip</div></div>
      <div class="spec-item text-center"><div class="text-3xl font-bold text-white">5x</div><div class="text-gray-500 text-sm mt-1">Optical zoom</div></div>
      <div class="spec-item text-center"><div class="text-3xl font-bold text-white">6.9"</div><div class="text-gray-500 text-sm mt-1">ProMotion display</div></div>
      <div class="spec-item text-center"><div class="text-3xl font-bold text-white">48MP</div><div class="text-gray-500 text-sm mt-1">Main camera</div></div>
    </div>
  </section>
</body>
</html>
```

---

## Apple Style — Sticky Nav
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apple Style — Sticky Nav</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #f5f5f7; }
  /* Nav transitions on scroll */
  .site-nav {
    transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .site-nav.scrolled {
    background: rgba(255,255,255,0.72) !important;
    box-shadow: 0 1px 0 rgba(0,0,0,0.08);
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .content-section { min-height: 600px; }
</style>
</head>
<body>
  <!-- The sticky nav that shrinks -->
  <nav id="nav" class="site-nav fixed top-0 w-full z-50 bg-white/60 px-8 py-5 flex items-center justify-between">
    <svg width="18" height="22" viewBox="0 0 814 1000" fill="#1d1d1f"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.8 268.5-317.8 69.5 0 127.5 45.8 170.5 45.8 41.1 0 105.3-48.3 183.1-48.3zM555.5 150.5c34.7-41.1 59.3-98.5 59.3-155.9 0-8.3-.6-16.5-2.1-23.5-55.9 2.1-123.3 37.3-164 81.5-31.5 35.9-61.5 93.3-61.5 151.7 0 9 1.5 17.9 2.1 20.8 3.5.6 9 1.5 14.5 1.5 50.1 0 112.5-33.9 151.7-76.1z"/></svg>
    <div class="flex gap-8 text-sm text-[#1d1d1f]">
      <a href="#" class="hover:text-gray-500 transition-colors">Store</a>
      <a href="#" class="hover:text-gray-500 transition-colors">Mac</a>
      <a href="#" class="hover:text-gray-500 transition-colors">iPad</a>
      <a href="#" class="hover:text-gray-500 transition-colors">iPhone</a>
      <a href="#" class="hover:text-gray-500 transition-colors">Watch</a>
      <a href="#" class="hover:text-gray-500 transition-colors">Vision Pro</a>
    </div>
    <div class="flex gap-4 text-sm text-[#1d1d1f]">
      <button>🔍</button>
      <button>🛍</button>
    </div>
  </nav>

  <!-- Page content to enable scrolling -->
  <section class="content-section pt-24 flex items-center justify-center bg-gradient-to-b from-[#f5f5f7] to-white">
    <div class="text-center"><h1 class="text-5xl font-semibold text-[#1d1d1f] tracking-tight">Scroll to see nav shrink</h1><p class="text-gray-500 mt-4">The navigation blurs and compacts on scroll.</p></div>
  </section>
  <section class="content-section flex items-center justify-center bg-white">
    <div class="text-center"><h2 class="text-4xl font-semibold text-[#1d1d1f]">Beautifully crafted nav</h2><p class="text-gray-500 mt-4 max-w-md">Backdrop blur + dynamic padding gives a native Apple feel on scroll.</p></div>
  </section>

  <script>
    // Apply 'scrolled' class once user has scrolled down
    window.addEventListener('scroll', () => {
      document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
    });
  </script>
</body>
</html>
```

---

## Framer — Motion Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Framer — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #0a0a0a; overflow: hidden; min-height: 100vh; }
  /* Floating UI element animations */
  .float-el { position: absolute; animation: drift linear infinite; }
  @keyframes drift {
    0%   { transform: translate(0,0) rotate(var(--r,0deg)); }
    25%  { transform: translate(10px,-15px) rotate(calc(var(--r,0deg)+2deg)); }
    50%  { transform: translate(-5px,-25px) rotate(var(--r,0deg)); }
    75%  { transform: translate(-12px,-10px) rotate(calc(var(--r,0deg)-2deg)); }
    100% { transform: translate(0,0) rotate(var(--r,0deg)); }
  }
  .glass { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(12px); }
  /* Headline gradient */
  .hero-h { background: linear-gradient(180deg, #fff 50%, rgba(255,255,255,0.5)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .cta { background: #fff; color: #000; border-radius: 8px; font-weight: 600; transition: all 0.2s; }
  .cta:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(255,255,255,0.2); }
</style>
</head>
<body class="flex items-center justify-center min-h-screen relative">
  <!-- Floating UI snippets -->
  <div class="float-el glass p-4 text-xs text-white/70 w-40" style="top:15%;left:5%;--r:-5deg;animation-duration:7s">
    <div class="text-white font-medium mb-1">Button</div>
    <div class="bg-white/10 rounded px-2 py-1 text-center text-white text-xs">Click me</div>
  </div>
  <div class="float-el glass p-3 w-32 text-xs" style="top:60%;left:3%;--r:4deg;animation-duration:9s;animation-delay:-2s">
    <div class="w-full h-16 rounded-lg bg-gradient-to-br from-purple-500/40 to-blue-500/40 mb-2"></div>
    <div class="h-2 bg-white/20 rounded w-3/4 mb-1"></div>
    <div class="h-2 bg-white/10 rounded w-1/2"></div>
  </div>
  <div class="float-el glass p-3 w-36 text-xs" style="top:20%;right:5%;--r:6deg;animation-duration:8s;animation-delay:-4s">
    <div class="text-white/60 text-xs mb-2">Input</div>
    <div class="border border-white/20 rounded px-2 py-1 text-white/40 text-xs">Type here...</div>
  </div>
  <div class="float-el glass px-3 py-2 text-xs text-green-400 flex items-center gap-2" style="bottom:25%;right:8%;--r:-3deg;animation-duration:6s;animation-delay:-1s">
    <span>✓</span><span>Published</span>
  </div>

  <!-- Main content -->
  <div class="relative z-10 text-center max-w-3xl px-6">
    <div class="inline-flex items-center gap-2 glass px-3 py-1.5 text-xs text-white/60 rounded-full mb-8">
      <span class="text-purple-400">✦</span> AI-powered design
    </div>
    <h1 class="hero-h text-6xl md:text-7xl font-black leading-none tracking-tighter mb-6">
      The web<br>is yours.
    </h1>
    <p class="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
      Design and publish sites that feel alive. No code required — unless you want it.
    </p>
    <div class="flex gap-3 justify-center">
      <button class="cta px-6 py-3 text-sm">Start for free</button>
      <button class="glass text-white/70 px-6 py-3 text-sm rounded-lg hover:text-white transition-colors">See showcase →</button>
    </div>
  </div>
</body>
</html>
```

---

## Framer — Template Gallery
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Framer — Templates</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #0a0a0a; }
  /* Masonry-style columns */
  .masonry { columns: 2; column-gap: 16px; }
  @media(min-width:768px){ .masonry { columns: 3; } }
  @media(min-width:1024px){ .masonry { columns: 4; } }
  .masonry-item { break-inside: avoid; margin-bottom: 16px; border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; }
  .masonry-item:hover .overlay { opacity: 1; }
  .overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
  }
  /* Template preview colours (placeholder gradients) */
  .t1{ background: linear-gradient(135deg,#1e1b4b,#3730a3); height:220px; }
  .t2{ background: linear-gradient(135deg,#064e3b,#065f46); height:160px; }
  .t3{ background: linear-gradient(135deg,#1c1917,#44403c); height:280px; }
  .t4{ background: linear-gradient(135deg,#4a044e,#86198f); height:180px; }
  .t5{ background: linear-gradient(135deg,#0c4a6e,#0369a1); height:240px; }
  .t6{ background: linear-gradient(135deg,#450a0a,#991b1b); height:160px; }
  .t7{ background: linear-gradient(135deg,#1a2e05,#3f6212); height:200px; }
  .t8{ background: linear-gradient(135deg,#0f172a,#1e3a5f); height:300px; }
</style>
</head>
<body class="px-6 py-16">
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-white text-3xl font-bold tracking-tight">Templates</h2>
        <p class="text-gray-500 mt-1">Start from a professionally designed template</p>
      </div>
      <div class="flex gap-2">
        <button class="text-xs bg-white/10 text-white px-3 py-1.5 rounded-full">All</button>
        <button class="text-xs text-gray-500 px-3 py-1.5 rounded-full hover:text-white transition-colors">Portfolio</button>
        <button class="text-xs text-gray-500 px-3 py-1.5 rounded-full hover:text-white transition-colors">SaaS</button>
        <button class="text-xs text-gray-500 px-3 py-1.5 rounded-full hover:text-white transition-colors">Agency</button>
      </div>
    </div>
    <!-- Masonry grid -->
    <div class="masonry">
      <div class="masonry-item t1"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t2"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t3"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t4"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t5"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t6"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t7"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
      <div class="masonry-item t8"><div class="overlay"><span class="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur">Use template</span></div></div>
    </div>
  </div>
</body>
</html>
```

---

## Notion — Docs Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notion — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #fff; }
  /* Clean serif headline */
  .serif { font-family: 'Lora', serif; }
  /* Subtle animated underline on CTA */
  .underline-anim { position: relative; }
  .underline-anim::after {
    content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px;
    background: #000; transition: width 0.3s;
  }
  .underline-anim:hover::after { width: 100%; }
  /* Feature icon pills */
  .feat-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 100px;
    background: #f7f7f5; border: 1px solid #e9e9e7;
    font-size: 13px; font-weight: 500; color: #37352f;
    transition: all 0.2s;
  }
  .feat-pill:hover { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transform: translateY(-1px); }
</style>
</head>
<body class="min-h-screen">
  <!-- Nav -->
  <nav class="flex items-center justify-between px-8 py-4 border-b border-gray-100">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">N</div>
      <span class="font-semibold text-gray-900">Notion</span>
    </div>
    <div class="flex gap-6 text-sm text-gray-600">
      <a href="#" class="hover:text-black transition-colors">Product</a>
      <a href="#" class="hover:text-black transition-colors">Teams</a>
      <a href="#" class="hover:text-black transition-colors">Pricing</a>
    </div>
    <div class="flex gap-3">
      <button class="text-sm text-gray-600 hover:text-black transition-colors">Log in</button>
      <button class="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Get Notion free</button>
    </div>
  </nav>

  <!-- Hero -->
  <main class="text-center px-6 py-24 max-w-4xl mx-auto">
    <p class="text-sm text-gray-500 mb-6 tracking-wide">THE CONNECTED WORKSPACE</p>
    <h1 class="serif text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
      Write, plan,<br>share. With AI<br>at your side.
    </h1>
    <p class="text-gray-500 text-xl max-w-lg mx-auto mb-10 leading-relaxed">
      Notion is the connected workspace where better, faster work happens.
    </p>
    <div class="flex gap-3 justify-center mb-16">
      <button class="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">Get Notion free</button>
      <button class="underline-anim text-gray-600 text-sm font-medium px-6 py-3">Request a demo</button>
    </div>

    <!-- Feature icons row -->
    <div class="flex flex-wrap gap-3 justify-center">
      <div class="feat-pill"><span>📝</span> Docs</div>
      <div class="feat-pill"><span>🗓</span> Projects</div>
      <div class="feat-pill"><span>🤖</span> AI</div>
      <div class="feat-pill"><span>📊</span> Wikis</div>
      <div class="feat-pill"><span>🗃</span> Databases</div>
      <div class="feat-pill"><span>📅</span> Calendar</div>
    </div>
  </main>
</body>
</html>
```

---

## Notion — Integration Grid
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notion — Integrations</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #f7f7f5; }
  .serif { font-family: 'Lora', serif; }
  /* Logo card hover */
  .logo-card {
    background: #fff;
    border: 1px solid #e9e9e7;
    border-radius: 12px;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    height: 72px; font-size: 28px;
    cursor: pointer;
  }
  .logo-card:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: #d3d3d0; }
  /* Fade in on stagger */
  .logo-card { opacity: 0; animation: pop 0.4s ease forwards; }
  .logo-card:nth-child(1){animation-delay:0.05s}.logo-card:nth-child(2){animation-delay:0.1s}
  .logo-card:nth-child(3){animation-delay:0.15s}.logo-card:nth-child(4){animation-delay:0.2s}
  .logo-card:nth-child(5){animation-delay:0.25s}.logo-card:nth-child(6){animation-delay:0.3s}
  .logo-card:nth-child(7){animation-delay:0.35s}.logo-card:nth-child(8){animation-delay:0.4s}
  .logo-card:nth-child(9){animation-delay:0.45s}.logo-card:nth-child(10){animation-delay:0.5s}
  .logo-card:nth-child(11){animation-delay:0.55s}.logo-card:nth-child(12){animation-delay:0.6s}
  @keyframes pop { to { opacity: 1; } }
</style>
</head>
<body class="px-6 py-20">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="serif text-4xl font-semibold text-gray-900 mb-4">Connect your tools</h2>
    <p class="text-gray-500 max-w-md mx-auto mb-14">Notion integrates with the apps your team already loves. Everything in one place.</p>

    <!-- Logo cloud grid -->
    <div class="grid grid-cols-4 md:grid-cols-6 gap-3 mb-10">
      <div class="logo-card" title="Slack">💬</div>
      <div class="logo-card" title="GitHub">🐙</div>
      <div class="logo-card" title="Figma">🎨</div>
      <div class="logo-card" title="Google Drive">📁</div>
      <div class="logo-card" title="Jira">📋</div>
      <div class="logo-card" title="Zoom">📹</div>
      <div class="logo-card" title="Gmail">✉️</div>
      <div class="logo-card" title="Asana">📌</div>
      <div class="logo-card" title="Linear">⚡</div>
      <div class="logo-card" title="Loom">🎬</div>
      <div class="logo-card" title="Zapier">⚡</div>
      <div class="logo-card" title="Stripe">💳</div>
    </div>

    <button class="text-sm bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Browse all integrations →</button>
  </div>
</body>
</html>
```

---

## Raycast — Command Palette Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Raycast — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #111; }
  /* Keyboard shortcut tag */
  .kbd { background:#1e1e1e; border:1px solid #333; border-radius:5px; padding:2px 7px; font-size:11px; color:#888; font-mono: true; }
  /* Command palette glow */
  .palette-wrap { box-shadow: 0 0 0 1px #2a2a2a, 0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255,80,60,0.08); }
  /* Result row hover */
  .cmd-row { transition: background 0.1s; cursor: pointer; }
  .cmd-row:hover, .cmd-row.active { background: rgba(255,255,255,0.05); }
  /* Gradient spotlight */
  .spotlight {
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,80,60,0.1) 0%, transparent 70%);
  }
  /* Headline gradient */
  .head-grad { background: linear-gradient(180deg,#fff 60%,rgba(255,255,255,0.5)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  /* Animated cursor blink in search */
  .search-cursor { animation: blink 1s step-end infinite; color: #ff503c; }
  @keyframes blink { 50%{opacity:0} }
</style>
</head>
<body class="min-h-screen spotlight flex flex-col items-center justify-center px-4 py-16">
  <p class="text-sm text-gray-500 mb-3 tracking-widest uppercase">Raycast</p>
  <h1 class="head-grad text-5xl md:text-6xl font-black text-center leading-tight mb-4 tracking-tight">
    Your shortcut<br>to everything
  </h1>
  <p class="text-gray-500 text-center max-w-md mb-12 leading-relaxed">
    A blazingly fast, totally extendable launcher. Replace Spotlight and do much more.
  </p>

  <!-- Command palette mockup -->
  <div class="palette-wrap w-full max-w-xl rounded-2xl bg-[#1a1a1a] overflow-hidden">
    <!-- Search bar -->
    <div class="flex items-center gap-3 px-4 py-4 border-b border-white/5">
      <svg class="text-gray-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <span class="text-white text-sm flex-1 font-light">Search commands<span class="search-cursor">|</span></span>
      <kbd class="kbd">⌘K</kbd>
    </div>
    <!-- Results -->
    <div class="py-2">
      <p class="text-xs text-gray-600 px-4 py-2 uppercase tracking-wider">Recent</p>
      <div class="cmd-row active flex items-center gap-3 px-4 py-2.5">
        <span class="text-lg">📂</span>
        <div class="flex-1"><div class="text-white text-sm">Open Downloads</div><div class="text-gray-600 text-xs">Finder</div></div>
        <kbd class="kbd">↵</kbd>
      </div>
      <div class="cmd-row flex items-center gap-3 px-4 py-2.5">
        <span class="text-lg">🌐</span>
        <div class="flex-1"><div class="text-white text-sm">Search Google</div><div class="text-gray-600 text-xs">Browser</div></div>
        <kbd class="kbd">⌘↵</kbd>
      </div>
      <div class="cmd-row flex items-center gap-3 px-4 py-2.5">
        <span class="text-lg">📋</span>
        <div class="flex-1"><div class="text-white text-sm">Clipboard History</div><div class="text-gray-600 text-xs">Raycast</div></div>
        <kbd class="kbd">⌘⇧V</kbd>
      </div>
      <div class="cmd-row flex items-center gap-3 px-4 py-2.5">
        <span class="text-lg">🤖</span>
        <div class="flex-1"><div class="text-white text-sm">Ask AI</div><div class="text-gray-600 text-xs">Raycast AI</div></div>
      </div>
    </div>
    <!-- Footer -->
    <div class="border-t border-white/5 px-4 py-3 flex gap-4 text-xs text-gray-600">
      <span><kbd class="kbd">↑↓</kbd> navigate</span>
      <span><kbd class="kbd">↵</kbd> select</span>
      <span><kbd class="kbd">esc</kbd> close</span>
    </div>
  </div>
</body>
</html>
```

---

## Raycast — Extension Cards
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Raycast — Extensions</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #111; }
  /* Extension card with gradient accent border on hover */
  .ext-card {
    background: #1a1a1a;
    border: 1px solid #252525;
    border-radius: 14px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .ext-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,80,60,0.8), transparent);
    opacity: 0; transition: opacity 0.25s;
  }
  .ext-card:hover { border-color: #333; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
  .ext-card:hover::before { opacity: 1; }
  .tag { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: rgba(255,255,255,0.06); color: #666; border: 1px solid #2a2a2a; }
  .install-btn { font-size: 12px; color: #888; border: 1px solid #2a2a2a; padding: 4px 12px; border-radius: 6px; background: transparent; transition: all 0.2s; }
  .install-btn:hover { color: #fff; border-color: #444; background: #222; }
</style>
</head>
<body class="px-6 py-16">
  <div class="max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-white text-3xl font-bold tracking-tight">Extensions</h2>
        <p class="text-gray-600 mt-1 text-sm">1,000+ community-built extensions</p>
      </div>
      <input type="text" placeholder="Search extensions..." class="bg-[#1a1a1a] border border-[#252525] text-white text-sm px-4 py-2 rounded-lg w-56 focus:outline-none focus:border-[#ff503c]/50 placeholder-gray-600">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">🐙</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">GitHub</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Search repos, PRs, issues, and actions right from your launcher.</p>
        <div class="flex gap-1.5"><span class="tag">Dev Tools</span><span class="tag">Open Source</span></div>
      </div>

      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">🎨</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">Figma</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Quickly open your Figma files, components, and design tokens.</p>
        <div class="flex gap-1.5"><span class="tag">Design</span><span class="tag">Popular</span></div>
      </div>

      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">💬</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">Slack</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Search messages, open channels, and change your status instantly.</p>
        <div class="flex gap-1.5"><span class="tag">Communication</span></div>
      </div>

      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">📝</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">Linear</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Create and browse issues, projects and teams without leaving the keyboard.</p>
        <div class="flex gap-1.5"><span class="tag">Productivity</span></div>
      </div>

      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">🌤</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">Weather</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Check forecast, air quality, and hourly weather for any city.</p>
        <div class="flex gap-1.5"><span class="tag">Utilities</span><span class="tag">Free</span></div>
      </div>

      <div class="ext-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">🤖</div>
          <button class="install-btn">Install</button>
        </div>
        <h3 class="text-white font-semibold mb-1">ChatGPT</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3">Ask GPT-4 anything, generate text, and summarize clipboard content.</p>
        <div class="flex gap-1.5"><span class="tag">AI</span><span class="tag">Popular</span></div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Resend — Hero
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resend — Hero</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #000; }
  /* Code syntax highlight simulation */
  .kw  { color: #ff6b9d; }
  .fn  { color: #79c0ff; }
  .str { color: #a5d6ff; }
  .obj { color: #ffa657; }
  .cm  { color: #484f58; }
  /* Animated border on code block */
  .code-wrap {
    border: 1px solid #1e1e1e;
    border-radius: 12px;
    background: #0d0d0d;
    position: relative;
    overflow: hidden;
  }
  .code-wrap::before {
    content: '';
    position: absolute; inset: 0; border-radius: 12px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    animation: sweep 3s ease infinite;
  }
  @keyframes sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  .head-text { background: linear-gradient(180deg,#fff 70%,rgba(255,255,255,0.4)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .cta-main { background: #fff; color: #000; transition: all 0.2s; }
  .cta-main:hover { background: #e5e5e5; }
</style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center px-6 py-16">
  <!-- Logo + nav -->
  <nav class="fixed top-0 w-full flex items-center justify-between px-8 py-4 border-b border-white/5 z-50">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-white rounded flex items-center justify-center"><span class="text-black font-bold text-xs">R</span></div>
      <span class="text-white font-semibold">Resend</span>
    </div>
    <div class="flex gap-6 text-sm text-gray-500">
      <a href="#" class="hover:text-white transition-colors">Docs</a>
      <a href="#" class="hover:text-white transition-colors">Changelog</a>
      <a href="#" class="hover:text-white transition-colors">Pricing</a>
    </div>
    <button class="text-sm bg-white text-black px-4 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors">Sign up</button>
  </nav>

  <div class="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center pt-10">
    <!-- Left: copy -->
    <div>
      <div class="inline-flex items-center gap-2 text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-6">
        <span class="text-green-400">●</span> Built for developers
      </div>
      <h1 class="head-text text-5xl font-bold leading-tight tracking-tight mb-5">
        Email for<br>developers
      </h1>
      <p class="text-gray-400 leading-relaxed mb-8">
        The best way to reach humans instead of spam folders. Deliver transactional and marketing emails at scale.
      </p>
      <div class="flex gap-3">
        <button class="cta-main px-5 py-2.5 rounded-lg text-sm font-semibold">Start for free</button>
        <button class="text-gray-400 text-sm px-5 py-2.5 border border-white/10 rounded-lg hover:text-white hover:border-white/25 transition-colors">Read the docs →</button>
      </div>
    </div>

    <!-- Right: code snippet -->
    <div class="code-wrap p-5 font-mono text-sm leading-relaxed">
      <div class="flex gap-1.5 mb-4">
        <span class="w-3 h-3 rounded-full bg-red-500/50"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/50"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/50"></span>
        <span class="text-gray-600 text-xs ml-2">send-email.ts</span>
      </div>
      <div class="cm">// Send your first email</div>
      <div class="mt-2"><span class="kw">import</span> <span class="obj">{"{ Resend }"}</span> <span class="kw">from</span> <span class="str">'resend'</span>;</div>
      <div class="mt-3"><span class="kw">const</span> <span class="obj">resend</span> = <span class="kw">new</span> <span class="fn">Resend</span>(<span class="str">'re_123...'</span>);</div>
      <div class="mt-3">
        <span class="kw">await</span> resend.<span class="fn">emails</span>.<span class="fn">send</span>({
      </div>
      <div class="pl-4"><span class="obj">from</span>: <span class="str">'you@acme.com'</span>,</div>
      <div class="pl-4"><span class="obj">to</span>: <span class="str">'user@example.com'</span>,</div>
      <div class="pl-4"><span class="obj">subject</span>: <span class="str">'Hello!'</span>,</div>
      <div class="pl-4"><span class="obj">react</span>: <span class="fn">&lt;EmailTemplate /&gt;</span></div>
      <div>});</div>
      <div class="mt-3 flex items-center gap-2">
        <span class="text-green-400">✓</span>
        <span class="text-gray-500 text-xs">Email delivered in 142ms</span>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Resend — Pricing Cards
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resend — Pricing</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body { font-family: 'Inter', sans-serif; background: #000; }
  .plan-card {
    background: #0d0d0d;
    border: 1px solid #1e1e1e;
    border-radius: 16px;
    transition: border-color 0.25s, transform 0.2s;
  }
  .plan-card:hover { border-color: #333; transform: translateY(-2px); }
  /* Featured card gets white border + subtle glow */
  .plan-card.featured {
    border-color: rgba(255,255,255,0.2);
    background: #111;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.4);
  }
  .plan-card.featured:hover { border-color: rgba(255,255,255,0.4); }
  .check { color: #22c55e; }
  .price-amt { background: linear-gradient(180deg,#fff,rgba(255,255,255,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
</style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center px-6 py-20">
  <p class="text-gray-500 text-sm mb-2 tracking-widest uppercase">Pricing</p>
  <h2 class="text-white text-4xl font-bold text-center mb-3 tracking-tight">Simple, transparent pricing</h2>
  <p class="text-gray-500 text-center mb-14">Start for free. Scale as you grow.</p>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full">
    <!-- Free -->
    <div class="plan-card p-8">
      <p class="text-gray-400 text-sm font-medium mb-4">Free</p>
      <div class="flex items-end gap-1 mb-1">
        <span class="price-amt text-5xl font-bold">$0</span>
        <span class="text-gray-600 text-sm mb-2">/month</span>
      </div>
      <p class="text-gray-600 text-xs mb-7">Perfect for personal projects</p>
      <button class="w-full py-2.5 text-sm text-white border border-white/15 rounded-lg hover:bg-white/5 transition-colors mb-8">Get started</button>
      <ul class="space-y-3 text-sm text-gray-400">
        <li class="flex gap-2"><span class="check">✓</span> 3,000 emails/month</li>
        <li class="flex gap-2"><span class="check">✓</span> 1 domain</li>
        <li class="flex gap-2"><span class="check">✓</span> API access</li>
        <li class="flex gap-2"><span class="check">✓</span> Email logs (1 day)</li>
      </ul>
    </div>

    <!-- Pro (featured) -->
    <div class="plan-card featured p-8">
      <div class="flex items-center justify-between mb-4">
        <p class="text-white text-sm font-semibold">Pro</p>
        <span class="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">Most popular</span>
      </div>
      <div class="flex items-end gap-1 mb-1">
        <span class="price-amt text-5xl font-bold">$20</span>
        <span class="text-gray-500 text-sm mb-2">/month</span>
      </div>
      <p class="text-gray-500 text-xs mb-7">For growing teams and startups</p>
      <button class="w-full py-2.5 text-sm bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-8">Start free trial</button>
      <ul class="space-y-3 text-sm text-gray-400">
        <li class="flex gap-2"><span class="check">✓</span> 50,000 emails/month</li>
        <li class="flex gap-2"><span class="check">✓</span> 10 domains</li>
        <li class="flex gap-2"><span class="check">✓</span> Webhooks</li>
        <li class="flex gap-2"><span class="check">✓</span> Email logs (3 days)</li>
        <li class="flex gap-2"><span class="check">✓</span> React Email included</li>
      </ul>
    </div>

    <!-- Enterprise -->
    <div class="plan-card p-8">
      <p class="text-gray-400 text-sm font-medium mb-4">Enterprise</p>
      <div class="flex items-end gap-1 mb-1">
        <span class="price-amt text-5xl font-bold">Custom</span>
      </div>
      <p class="text-gray-600 text-xs mb-7">For high-volume senders</p>
      <button class="w-full py-2.5 text-sm text-white border border-white/15 rounded-lg hover:bg-white/5 transition-colors mb-8">Contact sales</button>
      <ul class="space-y-3 text-sm text-gray-400">
        <li class="flex gap-2"><span class="check">✓</span> Unlimited emails</li>
        <li class="flex gap-2"><span class="check">✓</span> Unlimited domains</li>
        <li class="flex gap-2"><span class="check">✓</span> Dedicated IP</li>
        <li class="flex gap-2"><span class="check">✓</span> SLA + priority support</li>
        <li class="flex gap-2"><span class="check">✓</span> SSO / SAML</li>
      </ul>
    </div>
  </div>
</body>
</html>
```
