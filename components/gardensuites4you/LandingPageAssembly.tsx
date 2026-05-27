'use client'

import { GardenGrowScene3D } from './GardenGrowScene3D'
import { ROICalculator3D } from './ROICalculator3D'
import { PermitTimeline3D } from './PermitTimeline3D'
import { ServiceCatalog3D } from './ServiceCatalog3D'

const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

// ─── Reusable section label ────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
      style={{
        border: `1px solid rgba(245,197,24,0.2)`,
        background: 'rgba(245,197,24,0.05)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: YELLOW }} />
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: YELLOW }}>
        {text}
      </span>
    </div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col"
      style={{ background: NAVY }}
    >
      {/* Nav */}
      <nav
        className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        {/* Logo wordmark */}
        <a href="https://gardensuites4you.ca" className="flex items-center gap-3">
          {/* Hard hat SVG */}
          <svg viewBox="0 0 36 30" className="w-9 h-8" fill="none">
            <ellipse cx="18" cy="22" rx="16" ry="5" fill={YELLOW} />
            <path d="M2,22 Q2,8 18,8 Q34,8 34,22Z" fill={YELLOW} />
            <rect x="2" y="17" width="32" height="5" fill="rgba(0,0,0,0.22)" />
          </svg>
          <span className="font-black text-xl tracking-tight" style={{ color: YELLOW }}>
            GardenSuites<span className="text-white">4You</span>
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Process', 'Gallery', 'About', 'Contact'].map(link => (
            <a
              key={link}
              href={`https://gardensuites4you.ca/${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors duration-200 hover:text-yellow-400"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="https://gardensuites4you.ca/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: YELLOW,
            color: NAVY,
            boxShadow: `0 4px 16px rgba(245,197,24,0.35)`,
          }}
        >
          Free Consultation
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 lg:py-20 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6 max-w-xl">
          <SectionLabel text="Toronto's Legal Suite Specialists" />

          <h1
            className="font-black text-5xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tighter"
            style={{ color: '#ffffff' }}
          >
            Your Backyard
            <br />
            <span style={{ color: YELLOW }}>Builds Wealth.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            GardenSuites4You designs and builds legal basement suites, garden suites, laneway suites, and garage conversions across Toronto — from permit to occupancy.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 pt-2">
            {[
              { value: '200+', label: 'Suites Built' },
              { value: '6%', label: 'Avg ROI' },
              { value: '100%', label: 'Permit Success' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-black text-2xl" style={{ color: YELLOW }}>{stat.value}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://gardensuites4you.ca/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105"
              style={{
                background: YELLOW,
                color: NAVY,
                boxShadow: `0 6px 24px rgba(245,197,24,0.4)`,
              }}
            >
              Start Your Suite
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://gardensuites4you.ca/gallery"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              View Gallery
            </a>
          </div>
        </div>

        {/* Right: 3D scene */}
        <div className="w-full mt-10 lg:mt-0 lg:pl-10">
          <GardenGrowScene3D />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${NAVY})` }}
      />
    </section>
  )
}

// ─── ROI Section ──────────────────────────────────────────────────────────
function ROISection() {
  return (
    <section
      className="w-full px-4 md:px-8 py-20"
      style={{ background: NAVY }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel text="Investment Analysis" />
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">
            Calculate Your
            <span style={{ color: YELLOW }}> Returns</span>
          </h2>
          <p className="text-lg mt-3 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            See how your suite pays for itself in under a decade.
          </p>
        </div>
        <ROICalculator3D />
      </div>
    </section>
  )
}

// ─── Permit Section ───────────────────────────────────────────────────────
function PermitSection() {
  return (
    <section
      className="w-full px-4 md:px-8 py-20"
      style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #060f1c 100%)` }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel text="Permit Process" />
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">
            We Handle
            <span style={{ color: YELLOW }}> Every Step</span>
          </h2>
          <p className="text-lg mt-3 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Toronto's permit process is complex. We've done it 200+ times.
          </p>
        </div>
        <PermitTimeline3D />
      </div>
    </section>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section style={{ background: '#060f1c' }}>
      <ServiceCatalog3D />
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="w-full px-6 md:px-12 py-12"
      style={{
        background: '#040c16',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 36 30" className="w-7 h-6" fill="none">
              <ellipse cx="18" cy="22" rx="16" ry="5" fill={YELLOW} />
              <path d="M2,22 Q2,8 18,8 Q34,8 34,22Z" fill={YELLOW} />
              <rect x="2" y="17" width="32" height="5" fill="rgba(0,0,0,0.22)" />
            </svg>
            <span className="font-black text-base" style={{ color: YELLOW }}>
              GardenSuites<span className="text-white">4You</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Toronto's legal suite specialists.
            <br />
            gardensuites4you.ca
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {['Services', 'Process', 'Gallery', 'About', 'Contact', 'Privacy'].map(link => (
            <a
              key={link}
              href={`https://gardensuites4you.ca/${link.toLowerCase()}`}
              className="text-xs transition-colors hover:text-yellow-400"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {link}
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
          &copy; {new Date().getFullYear()} GardenSuites4You.
          <br className="sm:hidden" /> All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── Full Page Assembly ────────────────────────────────────────────────────
export function LandingPageAssembly() {
  return (
    <div className="min-h-screen w-full" style={{ background: NAVY }}>
      <HeroSection />
      <ROISection />
      <PermitSection />
      <ServicesSection />
      <Footer />
    </div>
  )
}

export default LandingPageAssembly
