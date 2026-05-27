'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';
const CHARCOAL = '#2C2C2C';

// ─── Material definitions ─────────────────────────────────────────────────────

interface Material {
  id: string;
  label: string;
  subtitle: string;
  swatchGradient: string;
  panelGradient: string;
  veinColor?: string;
  description: string;
  finish: string;
}

const MATERIALS: Material[] = [
  {
    id: 'calacatta',
    label: 'Calacatta Marble',
    subtitle: 'Italian quarried',
    swatchGradient: 'linear-gradient(135deg, #f5f0eb 0%, #ede5d8 40%, #f8f4ee 60%, #e8dfd0 100%)',
    panelGradient: 'linear-gradient(160deg, #f9f5f0 0%, #ece4d8 25%, #f4ede3 50%, #e5dccf 75%, #f1e9de 100%)',
    veinColor: '#b8a89060',
    description:
      'Prized for its bold, dramatic veining against a luminous white ground. Each slab is unique — a signature of Italian craftsmanship quarried from the Apuan Alps.',
    finish: 'Polished / Honed',
  },
  {
    id: 'brass',
    label: 'Brushed Brass',
    subtitle: 'Hardware & accents',
    swatchGradient: 'linear-gradient(135deg, #a07820 0%, #c9a040 35%, #8b6914 60%, #d4aa50 100%)',
    panelGradient: 'linear-gradient(160deg, #b8922a 0%, #e0bc58 30%, #8b6914 55%, #c9a035 80%, #7a5c10 100%)',
    description:
      'A living metal that develops character over time. Our brushed brass hardware is PVD-coated for longevity while retaining the warmth of unlacquered brass.',
    finish: 'Brushed / PVD Coated',
  },
  {
    id: 'oak',
    label: 'Smoked Oak',
    subtitle: 'European timber',
    swatchGradient: 'linear-gradient(135deg, #6b4e2e 0%, #8b6540 35%, #5c4025 60%, #7a5835 100%)',
    panelGradient: 'linear-gradient(160deg, #7a5c35 0%, #9b7248 30%, #5c4025 55%, #8b6540 80%, #6b4e2e 100%)',
    veinColor: '#4a300f40',
    description:
      'Sourced from sustainably managed European forests. The smoking process deepens the natural grain, lending each panel a moody, architectural quality.',
    finish: 'Wire-brushed / Oiled',
  },
  {
    id: 'anthracite',
    label: 'Matte Anthracite',
    subtitle: 'Lacquered cabinetry',
    swatchGradient: 'linear-gradient(135deg, #383838 0%, #2C2C2C 50%, #404040 100%)',
    panelGradient: 'linear-gradient(160deg, #3a3a3a 0%, #282828 40%, #404040 70%, #2C2C2C 100%)',
    description:
      'A bespoke two-stage lacquer in deep anthracite. The matte finish absorbs light for a quietly dramatic presence — the perfect foil to brass and marble.',
    finish: '5-stage Lacquer, 0° Sheen',
  },
  {
    id: 'limestone',
    label: 'Honed Limestone',
    subtitle: 'Natural stone',
    swatchGradient: 'linear-gradient(135deg, #c8bfb0 0%, #d8d0c0 40%, #bfb8a8 70%, #cec5b5 100%)',
    panelGradient: 'linear-gradient(160deg, #d0c8b8 0%, #e0d8c8 30%, #c0b8a8 55%, #d8cfc0 80%, #b8b0a0 100%)',
    veinColor: '#a09080',
    description:
      'Quarried from ancient seabeds, honed limestone carries subtle fossil impressions and a velvet texture underfoot. Serenely tactile — endlessly refined.',
    finish: 'Honed / Sealed',
  },
  {
    id: 'lacquered-white',
    label: 'Lacquered White',
    subtitle: 'Signature cabinetry',
    swatchGradient: 'linear-gradient(135deg, #fafaf8 0%, #f0efeb 50%, #fafaf8 100%)',
    panelGradient: 'linear-gradient(160deg, #ffffff 0%, #f5f4f0 35%, #fafaf8 65%, #f0efeb 100%)',
    description:
      'Our foundational white — a proprietary formula blended for warmth without coldness. Applied in seven coats, sanded between each, for a surface of glass-like perfection.',
    finish: '7-coat Lacquer, 10° Sheen',
  },
];

// ─── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({
  material,
  isSelected,
  onClick,
}: {
  material: Material;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-center gap-2 focus:outline-none"
      aria-label={`Select ${material.label}`}
      aria-pressed={isSelected}
    >
      {/* Swatch circle */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <div
          className="w-full h-full rounded-full"
          style={{ background: material.swatchGradient }}
        />
        {/* Brass glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={
            isSelected
              ? {
                  boxShadow: `0 0 0 2.5px ${BRASS}, 0 0 14px 4px rgba(139,105,20,0.55)`,
                  opacity: 1,
                }
              : {
                  boxShadow: '0 0 0 1.5px rgba(139,105,20,0)',
                  opacity: 0,
                }
          }
          transition={{ duration: 0.3 }}
          style={{ borderRadius: '50%' }}
        />
      </div>

      {/* Label */}
      <span
        className="text-center leading-tight transition-colors duration-200"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
          color: isSelected ? BRASS : '#a09888',
          maxWidth: '72px',
        }}
      >
        {material.label}
      </span>
    </motion.button>
  );
}

// ─── Panel texture overlay ────────────────────────────────────────────────────

function MaterialPanel({ material }: { material: Material }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: material.panelGradient }}
      />

      {/* Vein / grain overlay for stone/wood materials */}
      {material.veinColor && (
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M ${-20 + i * 55},0 Q ${30 + i * 55},${40 + i * 20} ${10 + i * 55},${100 + i * 10} T ${
                60 + i * 55
              },200`}
              stroke={material.veinColor}
              strokeWidth={0.8 + (i % 3) * 0.5}
              fill="none"
            />
          ))}
        </svg>
      )}

      {/* Subtle sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface MaterialSelectorScene3DProps {
  onMaterialSelect?: (materialId: string) => void;
  defaultSelected?: string;
  className?: string;
}

export default function MaterialSelectorScene3D({
  onMaterialSelect,
  defaultSelected = 'calacatta',
  className = '',
}: MaterialSelectorScene3DProps) {
  const [selectedId, setSelectedId] = useState(defaultSelected);
  const selected = MATERIALS.find((m) => m.id === selectedId) ?? MATERIALS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onMaterialSelect?.(id);
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{ background: CHARCOAL, color: WARM_WHITE }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p
            className="uppercase tracking-[0.25em] text-xs mb-3"
            style={{ color: BRASS }}
          >
            Material Palette
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: WARM_WHITE,
              lineHeight: 1.1,
            }}
          >
            Curated Surfaces
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Large panel */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
                style={{ aspectRatio: '4/3' }}
              >
                <MaterialPanel material={selected} />
              </motion.div>
            </AnimatePresence>

            {/* Material info below panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${selected.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mt-6"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      color: WARM_WHITE,
                    }}
                  >
                    {selected.label}
                  </h3>
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: BRASS }}
                  >
                    {selected.finish}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#a09888' }}>
                  {selected.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swatch carousel */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {MATERIALS.map((m) => (
                <Swatch
                  key={m.id}
                  material={m}
                  isSelected={m.id === selectedId}
                  onClick={() => handleSelect(m.id)}
                />
              ))}
            </div>

            {/* Brass accent rule */}
            <div
              className="mt-10 w-16 h-px mx-auto"
              style={{ background: BRASS }}
            />
            <p
              className="text-center text-xs mt-4 tracking-widest uppercase"
              style={{ color: '#6e6558' }}
            >
              Click a swatch to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
