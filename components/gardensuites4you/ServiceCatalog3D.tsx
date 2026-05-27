'use client'

import { useState, Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

// Inline canvas fallbacks per service type
function GardenSuiteMini() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#071a0f' }}>
      <svg viewBox="0 0 200 160" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="160" fill="#071a0f" />
        <rect x="0" y="100" width="200" height="60" fill="#14532d" />
        <rect x="60" y="55" width="80" height="45" fill="#0f2236" />
        <polygon points="48,55 100,20 152,55" fill="#1e3a5f" />
        <rect x="80" y="65" width="20" height="18" fill={YELLOW} opacity="0.7" />
        <rect x="105" y="65" width="20" height="18" fill={YELLOW} opacity="0.7" />
        <rect x="88" y="83" width="14" height="17" fill="#3b1c08" />
        <circle cx="160" cy="85" r="18" fill="#15803d" />
        <circle cx="40" cy="88" r="15" fill="#166534" />
        {/* Hard hat */}
        <ellipse cx="100" cy="36" rx="16" ry="4" fill={YELLOW} />
        <path d="M84,36 Q84,24 100,24 Q116,24 116,36Z" fill={YELLOW} />
      </svg>
    </div>
  )
}

function BasementMini() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: NAVY }}>
      <svg viewBox="0 0 200 160" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="160" fill={NAVY} />
        <rect x="20" y="55" width="160" height="8" fill="#14532d" />
        <rect x="20" y="63" width="160" height="10" fill="#3b2109" />
        <rect x="20" y="73" width="160" height="8" fill="#4b5563" />
        <rect x="20" y="81" width="160" height="7" fill="#6b7280" />
        <rect x="20" y="88" width="160" height="4" fill={YELLOW} opacity="0.5" />
        <rect x="20" y="92" width="160" height="6" fill="#78350f" />
        <rect x="20" y="98" width="160" height="52" fill="#08111e" />
        {/* Interior */}
        <ellipse cx="80" cy="100" rx="28" ry="6" fill={YELLOW} opacity="0.12" />
        <ellipse cx="140" cy="100" rx="28" ry="6" fill={YELLOW} opacity="0.12" />
        <rect x="30" y="120" width="50" height="25" rx="2" fill="#1e3a5f" />
        <rect x="120" y="118" width="55" height="28" rx="2" fill="#1e3a5f" />
        <text x="100" y="145" textAnchor="middle" fontSize="7" fill={YELLOW} fontFamily="monospace" opacity="0.8">Legal Basement Suite</text>
      </svg>
    </div>
  )
}

function LanewayMini() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#0a0f1a' }}>
      <svg viewBox="0 0 200 160" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="160" fill="#0a0f1a" />
        <rect x="0" y="105" width="200" height="55" fill="#1e2d1e" />
        {/* Laneway line */}
        <rect x="0" y="130" width="200" height="30" fill="#111827" />
        <rect x="85" y="132" width="30" height="5" fill="#374151" />
        <rect x="85" y="143" width="30" height="5" fill="#374151" />
        {/* Small rear suite */}
        <rect x="55" y="58" width="90" height="47" fill="#0f2236" />
        <polygon points="42,58 100,22 158,58" fill="#1e3a5f" />
        <rect x="75" y="68" width="18" height="15" fill={YELLOW} opacity="0.65" />
        <rect x="107" y="68" width="18" height="15" fill={YELLOW} opacity="0.65" />
        <rect x="89" y="83" width="12" height="22" fill="#3b1c08" />
        <circle cx="155" cy="75" r="14" fill="#166534" />
        <circle cx="45" cy="78" r="12" fill="#15803d" />
      </svg>
    </div>
  )
}

function GarageMini() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#0f0f1a' }}>
      <svg viewBox="0 0 200 160" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="160" fill="#0f0f1a" />
        <rect x="0" y="105" width="200" height="55" fill="#111827" />
        {/* Garage structure */}
        <rect x="30" y="40" width="140" height="65" fill="#0d1b2a" />
        <rect x="30" y="40" width="140" height="8" fill="#1e3a5f" />
        {/* Garage door (converted) */}
        <rect x="48" y="55" width="100" height="50" fill="#0f2236" stroke="#1e3a5f" strokeWidth="1.5" />
        {/* Door panels */}
        <rect x="50" y="57" width="96" height="12" fill="#132030" />
        <rect x="50" y="71" width="96" height="12" fill="#132030" />
        <rect x="50" y="85" width="96" height="12" fill="#132030" />
        {/* Window insert */}
        <rect x="62" y="59" width="22" height="8" fill={YELLOW} opacity="0.55" />
        <rect x="90" y="59" width="22" height="8" fill={YELLOW} opacity="0.55" />
        <rect x="118" y="59" width="22" height="8" fill={YELLOW} opacity="0.55" />
        {/* Conversion label */}
        <text x="100" y="120" textAnchor="middle" fontSize="7" fill={YELLOW} fontFamily="monospace" opacity="0.7">Garage Conversion</text>
        {/* Hard hat small */}
        <ellipse cx="100" cy="28" rx="12" ry="3" fill={YELLOW} />
        <path d="M88,28 Q88,18 100,18 Q112,18 112,28Z" fill={YELLOW} />
      </svg>
    </div>
  )
}

interface ServiceConfig {
  id: string
  label: string
  tagline: string
  startingPrice: string
  cta: string
  href: string
  sceneUrl: string
  fallback: React.ReactNode
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'garden-suite',
    label: 'Garden Suite',
    tagline: 'Detached backyard suites — maximise your lot and generate rental income.',
    startingPrice: 'From $180,000',
    cta: 'Learn More',
    href: 'https://gardensuites4you.ca/services/garden-suite',
    sceneUrl: 'https://prod.spline.design/GS4Y-GARDEN-SUITE-placeholder/scene.splinecode',
    fallback: <GardenSuiteMini />,
  },
  {
    id: 'legal-basement',
    label: 'Legal Basement Suite',
    tagline: 'Convert your existing basement into a city-approved legal rental unit.',
    startingPrice: 'From $95,000',
    cta: 'Learn More',
    href: 'https://gardensuites4you.ca/services/legal-basement',
    sceneUrl: 'https://prod.spline.design/GS4Y-BASEMENT-placeholder/scene.splinecode',
    fallback: <BasementMini />,
  },
  {
    id: 'laneway-suite',
    label: 'Laneway Suite',
    tagline: 'Laneway-facing suites purpose-built to meet Toronto laneway housing guidelines.',
    startingPrice: 'From $220,000',
    cta: 'Learn More',
    href: 'https://gardensuites4you.ca/services/laneway',
    sceneUrl: 'https://prod.spline.design/GS4Y-LANEWAY-placeholder/scene.splinecode',
    fallback: <LanewayMini />,
  },
  {
    id: 'garage-conversion',
    label: 'Garage Conversion',
    tagline: 'Transform a detached garage into a comfortable, code-compliant dwelling unit.',
    startingPrice: 'From $130,000',
    cta: 'Learn More',
    href: 'https://gardensuites4you.ca/services/garage',
    sceneUrl: 'https://prod.spline.design/GS4Y-GARAGE-placeholder/scene.splinecode',
    fallback: <GarageMini />,
  },
]

interface ServiceCardProps {
  service: ServiceConfig
  isActive: boolean
  onHover: (id: string | null) => void
}

function ServiceCard({ service, isActive, onHover }: ServiceCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: '#081422',
        border: `1px solid ${isActive ? YELLOW : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isActive
          ? `0 0 0 1px ${YELLOW}30, 0 8px 40px rgba(245,197,24,0.18), 0 0 60px rgba(245,197,24,0.08)`
          : '0 4px 24px rgba(0,0,0,0.5)',
        transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.25s ease',
      }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 3D Scene */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <Suspense fallback={service.fallback}>
          <Spline scene={service.sceneUrl} className="w-full h-full" />
        </Suspense>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 50%, #081422 100%)`,
          }}
        />

        {/* Yellow glow overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, rgba(245,197,24,0.12) 0%, transparent 70%)`,
            opacity: isActive ? 1 : 0,
          }}
        />

        {/* Starting price badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold"
          style={{
            background: isActive ? YELLOW : 'rgba(255,255,255,0.07)',
            color: isActive ? NAVY : 'rgba(255,255,255,0.55)',
            border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
            transition: 'background 0.25s, color 0.25s',
            backdropFilter: 'blur(8px)',
          }}
        >
          {service.startingPrice}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pb-5 pt-3 gap-2.5">
        {/* Yellow accent bar */}
        <div
          className="h-0.5 rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${YELLOW}, transparent)`,
            width: isActive ? '55%' : '25%',
          }}
        />

        <h3 className="text-white font-bold text-base leading-snug tracking-tight">
          {service.label}
        </h3>

        <p className="text-sm flex-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {service.tagline}
        </p>

        <a
          href={service.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-250 w-fit mt-1"
          style={{
            background: isActive ? YELLOW : 'rgba(245,197,24,0.08)',
            color: isActive ? NAVY : YELLOW,
            border: `1px solid ${isActive ? 'transparent' : 'rgba(245,197,24,0.2)'}`,
            boxShadow: isActive ? `0 4px 16px rgba(245,197,24,0.4)` : 'none',
          }}
          onClick={e => e.stopPropagation()}
        >
          {service.cta}
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export function ServiceCatalog3D() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section
      className="w-full px-4 py-20"
      style={{ background: NAVY }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-14 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
          style={{
            border: `1px solid rgba(245,197,24,0.2)`,
            background: 'rgba(245,197,24,0.05)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: YELLOW }} />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: YELLOW }}>
            Our Services
          </span>
        </div>

        <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-4">
          Your Suite, Your Way
        </h2>
        <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          GardenSuites4You builds legal secondary suites across Toronto — from permits to occupancy.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {SERVICES.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={activeId === service.id}
            onHover={setActiveId}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Not sure which option fits your property? We offer free consultations.
        </p>
        <a
          href="https://gardensuites4you.ca/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: YELLOW,
            color: NAVY,
            boxShadow: `0 8px 32px rgba(245,197,24,0.4)`,
          }}
        >
          Book a Free Consultation
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default ServiceCatalog3D
