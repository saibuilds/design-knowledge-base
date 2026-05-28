# Landing Page Sections — Complete SaaS Toolkit

> Stack: React 18 + TypeScript + Tailwind CSS + Framer Motion
> All sections are self-contained. Import and compose in a single page file.

---

## Page Assembly

```tsx
// app/page.tsx
import { HeroSection } from '@/components/sections/Hero';
import { SocialProofBar } from '@/components/sections/SocialProof';
import { FeaturesSection } from '@/components/sections/Features';
import { HowItWorksSection } from '@/components/sections/HowItWorks';
import { PricingSection } from '@/components/sections/Pricing';
import { TestimonialsSection } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQ';
import { CTASection } from '@/components/sections/CTA';
import { FooterSection } from '@/components/sections/Footer';
import { ChangelogSection } from '@/components/sections/Changelog';
import { IntegrationsSection } from '@/components/sections/Integrations';
import { StatsSection } from '@/components/sections/Stats';
import { VideoDemoSection } from '@/components/sections/VideoDemo';
import { TeamSection } from '@/components/sections/Team';
import { BlogPreviewSection } from '@/components/sections/BlogPreview';

export default function LandingPage() {
  return (
    <main className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      <HeroSection />
      <SocialProofBar />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <VideoDemoSection />
      <IntegrationsSection />
      <TeamSection />
      <ChangelogSection />
      <BlogPreviewSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
```

---

## 1. Hero Section

```tsx
// components/sections/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = 700);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(render);
    };
    render();
    const onResize = () => { w = canvas.width = window.innerWidth; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function UIPreviewMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 5 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700"
      style={{ transformPerspective: 1200 }}
    >
      {/* Fake browser chrome */}
      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex-1 mx-3 bg-zinc-200 dark:bg-zinc-700 rounded-md h-5 text-xs flex items-center px-3 text-zinc-500">
          app.yourproduct.com
        </div>
      </div>
      {/* App UI preview */}
      <div className="bg-white dark:bg-zinc-900 p-6 space-y-4">
        <div className="h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg opacity-80 w-1/2" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
              <div className="h-2 bg-zinc-100 dark:bg-zinc-750 rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="h-24 bg-zinc-50 dark:bg-zinc-800 rounded-xl" />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden pt-20 pb-16">
      <ParticleBackground />

      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="space-y-6">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Now in public beta
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Build faster with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              AI-powered tools
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            Ship production-ready features in minutes, not days. Your team's new superpower for building, testing, and deploying at scale.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20">
              Get started free
            </button>
            <button className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch demo
            </button>
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="text-sm text-zinc-400">
            No credit card required · Free forever plan · Cancel anytime
          </motion.p>
        </div>

        {/* Right: UI mockup */}
        <div className="hidden lg:block">
          <UIPreviewMockup />
        </div>
      </div>
    </section>
  );
}
```

---

## 2. Social Proof Bar — Logo Cloud with Marquee

```tsx
// components/sections/SocialProof.tsx
'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const LOGOS = [
  { name: 'Vercel', width: 80 },
  { name: 'Stripe', width: 60 },
  { name: 'Linear', width: 70 },
  { name: 'Notion', width: 70 },
  { name: 'Figma', width: 55 },
  { name: 'GitHub', width: 75 },
  { name: 'Slack', width: 65 },
  { name: 'Loom', width: 60 },
];

function LogoItem({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex-shrink-0 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
      style={{ width }}
    >
      {/* Replace with actual SVG logos */}
      <div className="h-8 bg-zinc-400 dark:bg-zinc-600 rounded-md flex items-center justify-center">
        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{name}</span>
      </div>
    </div>
  );
}

export function SocialProofBar() {
  return (
    <section className="py-12 border-y border-zinc-100 dark:border-zinc-800 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm text-zinc-400 uppercase tracking-wider font-medium">
          Trusted by teams at
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoItem key={i} {...logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 3. Features — Bento Grid Layout

```tsx
// components/sections/Features.tsx
'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const features = [
  {
    title: 'AI Code Generation',
    description: 'Generate production-ready code from natural language. Supports 20+ languages and frameworks.',
    icon: '⚡',
    span: 'lg:col-span-2',
    accent: 'from-indigo-500 to-purple-600',
    large: true,
  },
  {
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real time. No merge conflicts.',
    icon: '👥',
    span: 'lg:col-span-1',
    accent: 'from-cyan-500 to-blue-600',
    large: false,
  },
  {
    title: 'One-click Deploy',
    description: 'Deploy to any cloud provider instantly.',
    icon: '🚀',
    span: 'lg:col-span-1',
    accent: 'from-emerald-500 to-teal-600',
    large: false,
  },
  {
    title: 'Built-in Security',
    description: 'SOC 2 Type II certified. Enterprise-grade security baked into every feature.',
    icon: '🔒',
    span: 'lg:col-span-1',
    accent: 'from-orange-500 to-red-500',
    large: false,
  },
  {
    title: 'Advanced Analytics',
    description: 'Understand how your product is used with deep, actionable analytics and custom dashboards.',
    icon: '📊',
    span: 'lg:col-span-2',
    accent: 'from-pink-500 to-rose-600',
    large: true,
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={`
        group relative rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800
        bg-white dark:bg-zinc-900 overflow-hidden
        hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors
        ${feature.span}
        ${feature.large ? 'min-h-[220px]' : 'min-h-[160px]'}
      `}
    >
      {/* Hover gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.accent}`} />

      <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl mb-4 bg-gradient-to-br ${feature.accent} bg-opacity-10`}>
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Everything you need to ship
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
        >
          A complete toolkit designed for modern engineering teams.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
```

---

## 4. How It Works — Numbered Steps

```tsx
// components/sections/HowItWorks.tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Connect your codebase',
    description: 'Link your GitHub, GitLab, or Bitbucket repository. We support monorepos and all major frameworks.',
  },
  {
    number: '02',
    title: 'Configure your workflow',
    description: 'Set up your build pipelines, environment variables, and deployment targets in minutes.',
  },
  {
    number: '03',
    title: 'Invite your team',
    description: 'Add teammates, set permissions, and start collaborating immediately with real-time sync.',
  },
  {
    number: '04',
    title: 'Ship with confidence',
    description: 'Deploy to production with automated tests, rollback capabilities, and zero-downtime updates.',
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const isLast = index === steps.length - 1;

  return (
    <div ref={ref} className="relative flex gap-6">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            className="w-full bg-indigo-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ height: '100%' }}
          />
        </div>
      )}

      {/* Number bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.15 }}
        className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center z-10 shadow-lg shadow-indigo-500/20"
      >
        {step.number}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
        className="pb-12"
      >
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.description}</p>
      </motion.div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            Up and running in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
          >
            No complex setup. Just connect and ship.
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <Step key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5. Pricing — 3 Tiers with Toggle

```tsx
// components/sections/Pricing.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    description: 'Perfect for solo developers.',
    cta: 'Get started free',
    ctaVariant: 'outline' as const,
    features: ['Up to 3 projects', '5GB storage', 'Community support', 'Basic analytics'],
  },
  {
    name: 'Pro',
    monthly: 29,
    annual: 19,
    description: 'For growing teams.',
    cta: 'Start free trial',
    ctaVariant: 'primary' as const,
    popular: true,
    features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'Custom domains', 'API access'],
  },
  {
    name: 'Enterprise',
    monthly: 99,
    annual: 79,
    description: 'For large organizations.',
    cta: 'Contact sales',
    ctaVariant: 'outline' as const,
    features: ['Everything in Pro', 'SSO / SAML', 'SLA guarantee', 'Dedicated support', 'Custom contracts', 'Audit logs'],
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4"
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 dark:text-zinc-400 mb-8"
        >
          No hidden fees. Cancel anytime.
        </motion.p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${!annual ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${annual ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'}`}
          >
            Annual
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs px-1.5 py-0.5 rounded-full">-35%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-8 flex flex-col ${
              plan.popular
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30 scale-105'
                : 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : ''}`}>{plan.name}</h3>
              <p className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-zinc-500'}`}>{plan.description}</p>
            </div>

            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-end gap-1"
                >
                  <span className="text-4xl font-extrabold">
                    {annual ? plan.annual : plan.monthly === 0 ? 'Free' : `$${annual ? plan.annual : plan.monthly}`}
                  </span>
                  {(annual ? plan.annual : plan.monthly) > 0 && (
                    <span className={`text-sm mb-1.5 ${plan.popular ? 'text-indigo-200' : 'text-zinc-500'}`}>/mo</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-indigo-200' : 'text-indigo-500'}`} viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                  </svg>
                  <span className={plan.popular ? 'text-indigo-100' : 'text-zinc-600 dark:text-zinc-300'}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                plan.popular
                  ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                  : plan.ctaVariant === 'outline'
                  ? 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

## 6. Testimonials — Masonry Grid

```tsx
// components/sections/Testimonials.tsx
'use client';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Sarah Chen', role: 'CTO at Novum', avatar: 'SC', rating: 5, quote: 'This tool cut our deployment time by 80%. Our team ships 3x faster than before.' },
  { name: 'James Park', role: 'Lead Eng. at Flux', avatar: 'JP', rating: 5, quote: "I've tried every tool in this space. Nothing comes close to the DX here." },
  { name: 'Maria Rodriguez', role: 'Founder at Stelo', avatar: 'MR', rating: 5, quote: "Set it up in under 10 minutes. The AI suggestions are actually useful, not just noise." },
  { name: 'Tom Williams', role: 'VP Eng. at Arclight', avatar: 'TW', rating: 5, quote: 'Onboarded our 40-person team in a week. The collaboration features are exceptional.' },
  { name: 'Priya Nair', role: 'Staff Eng. at Drift', avatar: 'PN', rating: 5, quote: "The analytics dashboard alone is worth the price. We finally understand our codebase's health." },
  { name: 'Alex Kowalski', role: 'Solo founder', avatar: 'AK', rating: 5, quote: 'As a solo founder, this replaces an entire DevOps hire. Absolutely essential.' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="break-inside-avoid mb-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <StarRating count={t.rating} />
      <p className="mt-3 mb-5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {t.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm">{t.name}</p>
          <p className="text-xs text-zinc-500">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            Loved by engineers worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 dark:text-zinc-400"
          >
            Join over 12,000 teams shipping faster.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. FAQ — Accordion with Search

```tsx
// components/sections/FAQ.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { q: 'Is there a free plan?', a: 'Yes, our Starter plan is free forever with up to 3 projects and 5GB of storage. No credit card required.' },
  { q: 'Can I change plans at any time?', a: 'Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes take effect immediately.' },
  { q: 'What frameworks do you support?', a: 'We support all major frameworks including Next.js, Nuxt, SvelteKit, Astro, Remix, and any static or Node.js-based project.' },
  { q: 'Is my data secure?', a: "We're SOC 2 Type II certified and use AES-256 encryption at rest and TLS 1.3 in transit. Your code and data never leaves your chosen region." },
  { q: 'Do you offer custom contracts?', a: 'Yes, our Enterprise plan includes custom MSA, DPA, and SLA agreements. Reach out to our sales team to get started.' },
  { q: 'What is your uptime SLA?', a: 'Enterprise customers receive a 99.99% uptime SLA with dedicated infrastructure and priority incident response.' },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left"
      >
        <span className="font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500 mt-0.5"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M6 2v8M2 6h8" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            Frequently asked questions
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative mt-6"
          >
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:border-indigo-400 transition-colors"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6"
        >
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-zinc-400">No questions match your search.</p>
          ) : (
            filtered.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openId === i}
                onToggle={() => setOpenId(openId === i ? null : i)}
              />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 8. CTA Section — Gradient with Email Capture

```tsx
// components/sections/CTA.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 0), radial-gradient(circle at 75% 75%, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold mb-4 max-w-2xl mx-auto"
        >
          Ready to ship 10x faster?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/80 mb-10 max-w-xl mx-auto"
        >
          Join 12,000+ teams already using our platform. Free to start, no credit card required.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full py-3 px-6 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium"
            >
              We will be in touch soon!
            </motion.div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 outline-none focus:border-white/60 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap text-sm"
              >
                Get early access
              </button>
            </>
          )}
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-white/60"
        >
          No spam. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
```

---

## 9. Footer — Multi-column with Newsletter

```tsx
// components/sections/Footer.tsx
'use client';
import { useState } from 'react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Security'],
  Resources: ['Documentation', 'API Reference', 'Blog', 'Community', 'Status'],
  Company: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
};

const socials = [
  { name: 'Twitter', href: '#', icon: 'X' },
  { name: 'GitHub', href: '#', icon: 'GH' },
  { name: 'LinkedIn', href: '#', icon: 'LI' },
  { name: 'Discord', href: '#', icon: 'DC' },
];

export function FooterSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">A</div>
              <span className="font-bold text-lg">Acme</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 max-w-xs">
              The modern deployment platform for engineering teams who want to ship faster.
            </p>
            {/* Newsletter */}
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex gap-2">
              {sent ? (
                <span className="text-sm text-emerald-600 font-medium">Subscribed!</span>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-indigo-400 transition-colors"
                  />
                  <button type="submit" className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-zinc-900 dark:text-zinc-100">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-400">© 2026 Acme Inc. All rights reserved.</p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <a key={l} href="#" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 10. Changelog — Timeline of Updates

```tsx
// components/sections/Changelog.tsx
'use client';
import { motion } from 'framer-motion';

const entries = [
  {
    date: 'May 2026',
    version: 'v3.2.0',
    badge: 'major',
    title: 'AI Code Suggestions',
    description: 'Introducing context-aware AI suggestions powered by our new Orion model. 40% faster completions with improved accuracy.',
  },
  {
    date: 'Apr 2026',
    version: 'v3.1.0',
    badge: 'feature',
    title: 'Team Workspaces',
    description: 'Shared workspaces with role-based access, team activity feeds, and centralized billing management.',
  },
  {
    date: 'Mar 2026',
    version: 'v3.0.5',
    badge: 'fix',
    title: 'Performance Improvements',
    description: 'Reduced build times by 35% through parallelized pipelines and smarter caching strategies.',
  },
  {
    date: 'Feb 2026',
    version: 'v3.0.0',
    badge: 'major',
    title: 'Platform 3.0 Launch',
    description: 'Complete redesign of the dashboard, new API v3 with improved rate limits, and global edge deployment.',
  },
];

const badgeStyles: Record<string, string> = {
  major: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
  feature: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  fix: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
};

export function ChangelogSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            What's new
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 dark:text-zinc-400"
          >
            We ship updates every week.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-700" />

          <div className="space-y-8">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 relative"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 flex items-start justify-center pt-1.5 z-10">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-zinc-50 dark:ring-zinc-900" />
                </div>

                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${badgeStyles[entry.badge]}`}>
                      {entry.badge}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">{entry.version}</span>
                    <span className="text-xs text-zinc-400 ml-auto">{entry.date}</span>
                  </div>
                  <h3 className="font-semibold mb-1.5">{entry.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{entry.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 11. Integrations — Grid with Hover Tooltips

```tsx
// components/sections/Integrations.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const integrations = [
  { name: 'GitHub', category: 'Source Control', color: '#171515', abbr: 'GH' },
  { name: 'Stripe', category: 'Payments', color: '#635BFF', abbr: 'ST' },
  { name: 'Slack', category: 'Communication', color: '#4A154B', abbr: 'SL' },
  { name: 'Postgres', category: 'Database', color: '#336791', abbr: 'PG' },
  { name: 'Datadog', category: 'Monitoring', color: '#774AA4', abbr: 'DD' },
  { name: 'Figma', category: 'Design', color: '#F24E1E', abbr: 'FG' },
  { name: 'Linear', category: 'Project Mgmt', color: '#5E6AD2', abbr: 'LN' },
  { name: 'Notion', category: 'Docs', color: '#000000', abbr: 'NO' },
  { name: 'Twilio', category: 'Messaging', color: '#F22F46', abbr: 'TW' },
  { name: 'Redis', category: 'Cache', color: '#DC382D', abbr: 'RD' },
  { name: 'AWS', category: 'Cloud', color: '#FF9900', abbr: 'AW' },
  { name: 'Vercel', category: 'Deploy', color: '#000000', abbr: 'VC' },
];

function IntegrationItem({ item }: { item: (typeof integrations)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: item.color }}
      >
        {item.abbr}
      </motion.div>
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{item.name}</span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-10"
          >
            {item.category}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4"
        >
          Works with your stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 dark:text-zinc-400"
        >
          Connect to 100+ tools in one click.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-3xl mx-auto"
      >
        {integrations.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <IntegrationItem item={item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

---

## 12. Stats — Animated Count-Up Numbers

```tsx
// components/sections/Stats.tsx
'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 12000, suffix: '+', label: 'Teams worldwide', prefix: '' },
  { value: 99.99, suffix: '%', label: 'Uptime SLA', prefix: '', decimals: 2 },
  { value: 2.4, suffix: 'M', label: 'Deployments per month', prefix: '', decimals: 1 },
  { value: 80, suffix: '%', label: 'Faster deployment', prefix: '', note: 'avg.' },
];

function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, to, prefix, suffix, decimals, motionValue]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-indigo-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl lg:text-5xl font-extrabold mb-2">
                <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals ?? 0} />
              </div>
              <p className="text-indigo-200 text-sm font-medium">
                {stat.label}
                {stat.note && <span className="ml-1 opacity-70">{stat.note}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 13. Video Demo Section — Thumbnail + Modal Player

```tsx
// components/sections/VideoDemo.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface VideoDemoSectionProps {
  videoUrl?: string;
  thumbnailUrl?: string;
}

export function VideoDemoSection({ videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl }: VideoDemoSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4"
        >
          See it in action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 dark:text-zinc-400"
        >
          3-minute walkthrough of the core features.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="Demo thumbnail" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-zinc-900" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          {/* Play button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>

          {/* Duration badge */}
          <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-mono">3:24</span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
              <iframe
                src={`${videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

---

## 14. Team Section — Grid Cards with Hover Flip

```tsx
// components/sections/Team.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const team = [
  { name: 'Emily Stone', role: 'CEO & Co-founder', avatar: 'ES', bio: 'Previously VP Engineering at Scale AI. 12 years building developer tools. MIT CS grad.', twitter: '@emilystone' },
  { name: 'Marcus Lee', role: 'CTO & Co-founder', avatar: 'ML', bio: 'Ex-Stripe engineering lead. Obsessed with distributed systems and great DX.', twitter: '@marcuslee' },
  { name: 'Aisha Patel', role: 'Head of Design', avatar: 'AP', bio: 'Design systems veteran. Formerly at Linear, Figma, and Vercel.', twitter: '@aishapatel' },
  { name: 'David Kim', role: 'Head of Growth', avatar: 'DK', bio: 'Took three SaaS companies from 0 to $10M ARR. Growth at its most scientific.', twitter: '@davidkim' },
  { name: 'Lena Müller', role: 'Lead Engineer', avatar: 'LM', bio: 'Core contributor to several open-source Rust projects. Loves compilers.', twitter: '@lenamuller' },
  { name: 'James Wright', role: 'DevRel Lead', avatar: 'JW', bio: 'Built developer communities at Twilio and HashiCorp. Speaker, educator, builder.', twitter: '@jameswright' },
];

const avatarColors = ['from-indigo-500 to-purple-600', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-red-500', 'from-pink-500 to-rose-600', 'from-amber-500 to-orange-600'];

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="h-64 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
            {member.avatar}
          </div>
          <h3 className="font-semibold text-base text-center">{member.name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-1">{member.role}</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex flex-col items-center justify-center p-6 text-white`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-sm leading-relaxed text-center text-white/90 mb-4">{member.bio}</p>
          <span className="text-xs font-mono bg-white/20 px-2 py-1 rounded-full">{member.twitter}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4"
        >
          Meet the team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 dark:text-zinc-400"
        >
          We are builders who use our own product every day.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {team.map((member, i) => (
          <TeamCard key={i} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}
```

---

## 15. Blog Preview — 3-Card Grid

```tsx
// components/sections/BlogPreview.tsx
'use client';
import { motion } from 'framer-motion';

const posts = [
  {
    category: 'Engineering',
    date: 'May 14, 2026',
    readTime: '5 min read',
    title: 'How we cut build times by 60% with parallelized pipelines',
    excerpt: 'A deep dive into the architecture changes that made our CI/CD pipeline dramatically faster for large monorepos.',
    image: '/blog/post-1.jpg',
    author: { name: 'Marcus Lee', avatar: 'ML' },
  },
  {
    category: 'Product',
    date: 'Apr 28, 2026',
    readTime: '3 min read',
    title: 'Introducing Team Workspaces: collaborate without the chaos',
    excerpt: 'We redesigned how teams work together. Here is what changed and why.',
    image: '/blog/post-2.jpg',
    author: { name: 'Emily Stone', avatar: 'ES' },
  },
  {
    category: 'Tutorial',
    date: 'Apr 10, 2026',
    readTime: '8 min read',
    title: 'Zero-downtime deployments with blue-green strategy',
    excerpt: 'Step-by-step guide to implementing blue-green deployments for your production environment.',
    image: '/blog/post-3.jpg',
    author: { name: 'James Wright', avatar: 'JW' },
  },
];

const categoryColors: Record<string, string> = {
  Engineering: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
  Product: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  Tutorial: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
};

function BlogCard({ post, index }: { post: (typeof posts)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[16/9] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-600 text-4xl">
            ✍
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? 'bg-zinc-100 text-zinc-600'}`}>
            {post.category}
          </span>
          <span className="text-xs text-zinc-400">{post.date}</span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-400">{post.readTime}</span>
        </div>

        <h3 className="font-semibold text-lg leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 pt-4 border-t border-zinc-50 dark:border-zinc-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {post.author.avatar}
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{post.author.name}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-2">From the blog</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Engineering deep dives, product updates, and tutorials.</p>
        </motion.div>
        <motion.a
          href="/blog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline hidden md:block"
        >
          View all posts →
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} index={i} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <a href="/blog" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          View all posts →
        </a>
      </div>
    </section>
  );
}
```
