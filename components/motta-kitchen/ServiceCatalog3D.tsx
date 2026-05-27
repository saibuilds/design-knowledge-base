'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';

// ─── Service definitions ──────────────────────────────────────────────────────

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  canvasPalette: { bg: string; mid: string; accent: string };
  features: string[];
}

const SERVICES: Service[] = [
  {
    id: 'custom-kitchens',
    title: 'Custom Kitchens',
    subtitle: 'From concept to completion',
    description:
      'Fully bespoke kitchen design and installation. Every cabinet, surface, and fitting is drawn to your exact specification.',
    canvasPalette: { bg: '#0e0d0b', mid: '#1e1c18', accent: '#8b6914' },
    features: ['Material consultation', 'Full CAD drawings', '10-year warranty'],
  },
  {
    id: 'cabinet-spraying',
    title: 'Cabinet Spraying',
    subtitle: 'Precision lacquer application',
    description:
      'Professional spray-painting service breathing new life into existing cabinetry. Any colour, any finish — flawlessly applied.',
    canvasPalette: { bg: '#111010', mid: '#282520', accent: '#c9a040' },
    features: ['2-stage lacquer', 'RAL / NCS matching', '5-year finish warranty'],
  },
  {
    id: 'bathroom-vanities',
    title: 'Bathroom Vanities',
    subtitle: 'Bespoke washroom cabinetry',
    description:
      'Custom vanity units in marble, oak, or lacquer — designed to extend the Motta aesthetic throughout your home.',
    canvasPalette: { bg: '#0c0d0e', mid: '#1a1e22', accent: '#8b9aa8' },
    features: ['Waterproof finishes', 'Integrated storage', 'Matching hardware'],
  },
  {
    id: 'commercial-fitouts',
    title: 'Commercial Fitouts',
    subtitle: 'Hospitality & workplace',
    description:
      'Restaurant kitchens, hotel bars, and office pantries delivered to commercial specification — without compromising on design.',
    canvasPalette: { bg: '#0d0e0c', mid: '#181e16', accent: '#6b8b50' },
    features: ['Commercial-grade materials', 'Project management', 'Fast-track delivery'],
  },
];

// ─── Mini canvas scene per service ───────────────────────────────────────────

function ServiceCanvas({ service, active }: { service: Service; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();

    const { bg, mid, accent } = service.canvasPalette;

    const draw = (ts: number) => {
      const t = ts * 0.0004;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Ambient glow
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.65);
      glow.addColorStop(0, `${mid}cc`);
      glow.addColorStop(1, `${bg}00`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Floating geometric shape — unique per service
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(t * (service.id === 'cabinet-spraying' ? 0.8 : 0.4));

      const size = Math.min(w, h) * 0.28;
      const shimmer = (Math.sin(t * 2) + 1) / 2;

      ctx.strokeStyle = accent + (active ? 'cc' : '60');
      ctx.lineWidth = active ? 1.2 : 0.7;
      ctx.shadowColor = accent;
      ctx.shadowBlur = active ? 10 + shimmer * 14 : 4;

      // Different shape per service
      if (service.id === 'custom-kitchens') {
        // Rectangle (cabinet)
        ctx.strokeRect(-size * 0.7, -size * 0.5, size * 1.4, size);
        ctx.strokeRect(-size * 0.7, -size * 0.5, size * 0.65, size);
      } else if (service.id === 'cabinet-spraying') {
        // Circle (spray nozzle)
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
        ctx.stroke();
      } else if (service.id === 'bathroom-vanities') {
        // Diamond
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.7);
        ctx.lineTo(size * 0.5, 0);
        ctx.lineTo(0, size * 0.7);
        ctx.lineTo(-size * 0.5, 0);
        ctx.closePath();
        ctx.stroke();
      } else {
        // Cross / plus (commercial)
        const arm = size * 0.6;
        const thick = size * 0.2;
        ctx.beginPath();
        ctx.rect(-thick / 2, -arm, thick, arm * 2);
        ctx.rect(-arm, -thick / 2, arm * 2, thick);
        ctx.stroke();
      }

      ctx.restore();

      // Brass accent rule — animated
      const lineY = h * 0.82;
      const lineW = w * 0.3 * (active ? 1 + shimmer * 0.2 : 0.6);
      const lineX = (w - lineW) / 2;
      ctx.fillStyle = `${accent}80`;
      ctx.fillRect(lineX, lineY, lineW, 1);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [service, active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="relative flex flex-col overflow-hidden"
      style={{
        background: '#141412',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '2px',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        borderColor: `rgba(139,105,20,0.45)`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
        y: -4,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Canvas scene */}
      <div className="w-full" style={{ height: '180px' }}>
        <ServiceCanvas service={service} active={hovered} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Brass accent line */}
        <motion.div
          className="mb-5 h-px"
          style={{ background: BRASS }}
          animate={{ width: hovered ? '48px' : '24px' }}
          transition={{ duration: 0.4 }}
        />

        <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#6e6558' }}>
          {service.subtitle}
        </p>

        <h3
          className="mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.5rem',
            fontWeight: 300,
            color: WARM_WHITE,
            lineHeight: 1.1,
          }}
        >
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#7e7568' }}>
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-6">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: '#6e6558' }}>
              <span style={{ color: BRASS }} aria-hidden="true">
                —
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.97 }}
          className="self-start flex items-center gap-2 text-xs uppercase tracking-[0.2em] py-2 px-4 transition-colors"
          style={{
            color: WARM_WHITE,
            border: `1px solid rgba(139,105,20,0.5)`,
            background: 'transparent',
            cursor: 'pointer',
          }}
          aria-label={`Inquire about ${service.title}`}
        >
          <span style={{ color: BRASS }}>◆</span>
          Inquire
        </motion.button>
      </div>
    </motion.article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface ServiceCatalog3DProps {
  className?: string;
}

export default function ServiceCatalog3D({ className = '' }: ServiceCatalog3DProps) {
  return (
    <section
      className={`w-full py-20 px-6 ${className}`}
      style={{ background: '#0e0d0b' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p
            className="uppercase tracking-[0.25em] text-xs mb-3"
            style={{ color: BRASS }}
          >
            Our Services
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: WARM_WHITE,
              lineHeight: 1.05,
            }}
          >
            What We Do
          </h2>
          <div className="mt-6 w-12 h-px mx-auto" style={{ background: BRASS }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
