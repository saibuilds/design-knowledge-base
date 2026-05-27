'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';
const CHARCOAL = '#2C2C2C';

// ─── Collections ──────────────────────────────────────────────────────────────

interface Collection {
  id: string;
  name: string;
  descriptor: string;
  tag: string;
  placeholderGradient: string;
  accentGradient: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'modernist',
    name: 'Modernist',
    descriptor:
      'Flat-front cabinetry, integrated pulls, and a strict material restraint — where function achieves its highest form.',
    tag: 'Signature Line',
    placeholderGradient: 'linear-gradient(160deg, #1a1a1a 0%, #2e2e2e 50%, #1c1c1c 100%)',
    accentGradient: 'linear-gradient(135deg, #8b6914 0%, #c9a040 50%, #8b6914 100%)',
  },
  {
    id: 'atherton',
    name: 'Atherton',
    descriptor:
      'A California-inflected aesthetic — open shelving, warm oak, and the quiet luxury of rooms that breathe.',
    tag: 'Premium Collection',
    placeholderGradient: 'linear-gradient(160deg, #3d2e1e 0%, #5c4530 50%, #3a2b1a 100%)',
    accentGradient: 'linear-gradient(135deg, #c9a040 0%, #8b6914 50%, #d4aa50 100%)',
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    descriptor:
      'Every dimension, material, and detail drawn from a single conversation. Yours, entirely.',
    tag: 'Fully Custom',
    placeholderGradient: 'linear-gradient(160deg, #0e0d0b 0%, #1e1c18 50%, #0e0d0b 100%)',
    accentGradient: 'linear-gradient(135deg, #8b6914 0%, #e0bc58 50%, #8b6914 100%)',
  },
  {
    id: 'blanc',
    name: 'Blanc',
    descriptor:
      'Seven coats of lacquered white. Brass. Light. The kitchen as a study in perfection.',
    tag: 'Flagship Edition',
    placeholderGradient: 'linear-gradient(160deg, #e8e4dc 0%, #f5f0e8 50%, #e0dcd4 100%)',
    accentGradient: 'linear-gradient(135deg, #8b6914 0%, #c9a040 50%, #8b6914 100%)',
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function CollectionCard({ collection }: { collection: Collection }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="relative overflow-hidden cursor-pointer"
      style={{
        background: CHARCOAL,
        borderRadius: '2px',
        aspectRatio: '3/4',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,105,20,0.6)`,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="article"
      aria-label={`${collection.name} kitchen collection`}
    >
      {/* Full-bleed image slot */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ background: collection.placeholderGradient }}
      >
        {/* Placeholder image label */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: WARM_WHITE, fontFamily: 'monospace' }}
          >
            {collection.id} / photography
          </span>
        </div>
      </motion.div>

      {/* Brass shimmer border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          hovered
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, transparent 0%, transparent 40%, rgba(139,105,20,0.15) 60%, transparent 100%)`,
          boxShadow: `inset 0 0 0 1px rgba(139,105,20,0.5)`,
        }}
      />

      {/* Gradient overlay — bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Tag — top right */}
      <div className="absolute top-4 right-4">
        <span
          className="text-xs uppercase tracking-[0.2em] px-2 py-1"
          style={{
            color: BRASS,
            border: `1px solid rgba(139,105,20,0.4)`,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            fontFamily: 'sans-serif',
          }}
        >
          {collection.tag}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Brass accent rule */}
        <motion.div
          className="h-px mb-4"
          style={{ background: collection.accentGradient }}
          animate={{ width: hovered ? '100%' : '32px' }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 300,
            color: WARM_WHITE,
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          {collection.name}
        </h3>

        {/* Descriptor + CTA — revealed on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'rgba(250,250,248,0.75)' }}
              >
                {collection.descriptor}
              </p>
              <button
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                style={{ color: BRASS }}
              >
                Explore
                <span aria-hidden="true" className="text-base leading-none">
                  →
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface CollectionGrid3DProps {
  className?: string;
}

export default function CollectionGrid3D({ className = '' }: CollectionGrid3DProps) {
  return (
    <section
      className={`w-full py-20 px-6 ${className}`}
      style={{ background: '#111110' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p
              className="uppercase tracking-[0.25em] text-xs mb-3"
              style={{ color: BRASS }}
            >
              Collections
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
              Four Expressions
              <br />
              of One Vision
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: '#6e6558' }}
          >
            Each collection begins with a different philosophy — and ends with a kitchen
            that is unmistakably yours.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
