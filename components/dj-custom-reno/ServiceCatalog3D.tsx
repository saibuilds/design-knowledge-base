'use client'

import { useState } from 'react'
import { KitchenScene3D } from './KitchenScene3D'
import { CabinetSprayScene3D } from './CabinetSprayScene3D'
import { BathroomScene3D } from './BathroomScene3D'
import { BasementScene3D } from './BasementScene3D'
import { GardenSuiteScene3D } from './GardenSuiteScene3D'
import { EpoxyScene3D } from './EpoxyScene3D'

interface ServiceConfig {
  id: string
  label: string
  tagline: string
  cta: string
  href: string
  component: React.ReactNode
  accentColor: string
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'kitchen',
    label: 'Kitchen Renovation',
    tagline: 'Transform your kitchen into a showpiece with custom cabinetry and premium finishes.',
    cta: 'Get a Quote',
    href: '/services/kitchen',
    component: <KitchenScene3D />,
    accentColor: '#f59e0b',
  },
  {
    id: 'cabinet-spray',
    label: 'Cabinet Spray Finishing',
    tagline: 'Factory-quality lacquer, water-based, and stain finishes applied on-site.',
    cta: 'See Finishes',
    href: '/services/cabinet-spray',
    component: <CabinetSprayScene3D />,
    accentColor: '#e5e7eb',
  },
  {
    id: 'bathroom',
    label: 'Bathroom Renovation',
    tagline: 'Spa-like bathrooms built with precision tile work and custom fixtures.',
    cta: 'View Gallery',
    href: '/services/bathroom',
    component: <BathroomScene3D />,
    accentColor: '#7dd3fc',
  },
  {
    id: 'basement',
    label: 'Basement / Legal Suite',
    tagline: 'Add living space and rental income with a fully finished basement or legal suite.',
    cta: 'Learn More',
    href: '/services/basement',
    component: <BasementScene3D />,
    accentColor: '#6ee7b7',
  },
  {
    id: 'garden-suite',
    label: 'Garden Suite / ADU',
    tagline: 'Detached garden suites designed for Vancouver & Lower Mainland lots.',
    cta: 'Start Planning',
    href: '/services/garden-suite',
    component: <GardenSuiteScene3D />,
    accentColor: '#4ade80',
  },
  {
    id: 'epoxy',
    label: 'Epoxy Flooring',
    tagline: 'High-gloss metallic epoxy floors for garages, commercial spaces, and more.',
    cta: 'Get a Quote',
    href: '/services/epoxy',
    component: <EpoxyScene3D />,
    accentColor: '#fbbf24',
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer"
      style={{
        background: '#111111',
        borderColor: isActive ? service.accentColor : 'rgba(255,255,255,0.06)',
        boxShadow: isActive
          ? `0 0 40px -8px ${service.accentColor}40, 0 0 0 1px ${service.accentColor}30`
          : '0 4px 24px rgba(0,0,0,0.4)',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 3D Scene */}
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        {service.component}
        {/* Scene overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, #111111 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 pb-6 pt-4 gap-3">
        {/* Accent line */}
        <div
          className="h-[2px] rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${service.accentColor}, transparent)`,
            width: isActive ? '60%' : '30%',
          }}
        />

        <h3 className="text-white font-semibold text-lg leading-snug tracking-tight">
          {service.label}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed flex-1">
          {service.tagline}
        </p>

        <a
          href={service.href}
          className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 w-fit"
          style={{
            background: isActive ? service.accentColor : 'rgba(255,255,255,0.06)',
            color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.8)',
            boxShadow: isActive ? `0 4px 20px ${service.accentColor}60` : 'none',
          }}
          onClick={e => e.stopPropagation()}
        >
          {service.cta}
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            viewBox="0 0 24 24"
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
      className="min-h-screen w-full px-4 py-24"
      style={{ background: '#0a0a0a' }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-amber-500 text-xs font-mono tracking-widest uppercase">Our Services</span>
        </div>
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Renovation & Finishing
          <br />
          <span style={{ color: '#f59e0b' }}>Done Right.</span>
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
          DJ Custom Reno delivers precision craftsmanship across every service — from full renovations to specialty coatings.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SERVICES.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={activeId === service.id}
            onHover={setActiveId}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <p className="text-white/30 text-sm mb-4">
          Not sure where to start? We'll help you plan your project from the ground up.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0a0a',
            boxShadow: '0 8px 32px rgba(245,158,11,0.35)',
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
