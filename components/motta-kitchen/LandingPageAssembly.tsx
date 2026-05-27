'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import KitchenIslandScene3D from './KitchenIslandScene3D';
import MaterialSelectorScene3D from './MaterialSelectorScene3D';
import CollectionGrid3D from './CollectionGrid3D';
import BeforeAfterKitchen3D from './BeforeAfterKitchen3D';
import ConsultationBooking3D from './ConsultationBooking3D';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';
const CHARCOAL = '#2C2C2C';

// ─── Logo mark ────────────────────────────────────────────────────────────────

function MottaLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.35rem',
          fontWeight: 400,
          letterSpacing: '0.35em',
          color: WARM_WHITE,
          textTransform: 'uppercase',
        }}
      >
        Motta
      </span>
      <div className="w-full h-px" style={{ background: BRASS }} />
      <span
        style={{
          fontFamily: 'sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.35em',
          color: '#6e6558',
          textTransform: 'uppercase',
        }}
      >
        Kitchen
      </span>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav() {
  const links = ['Collections', 'Services', 'Materials', 'Journal', 'Contact'];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background: 'rgba(14,13,11,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-label="Main navigation"
    >
      <MottaLogo />

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:text-white"
              style={{ color: '#7e7568', textDecoration: 'none' }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#consultation"
        className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-opacity hover:opacity-80"
        style={{
          color: WARM_WHITE,
          border: `1px solid rgba(139,105,20,0.6)`,
          background: 'transparent',
          textDecoration: 'none',
        }}
      >
        <span style={{ color: BRASS }}>◆</span>
        Book Consultation
      </a>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: '100svh', minHeight: '600px' }}
      id="hero"
      aria-label="Hero — Crafted for How You Live"
    >
      {/* 3D island canvas fills entire hero */}
      <div className="absolute inset-0">
        <KitchenIslandScene3D useSpline={false} className="w-full h-full" />
      </div>

      {/* Hero gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,13,11,0.3) 0%, rgba(14,13,11,0.1) 40%, rgba(14,13,11,0.65) 80%, rgba(14,13,11,1) 100%)',
        }}
      />

      {/* Hero text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{ y: headlineY, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="uppercase tracking-[0.35em] text-xs mb-6"
          style={{ color: BRASS }}
        >
          Toronto · Custom Kitchens
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 300,
            color: WARM_WHITE,
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            maxWidth: '720px',
          }}
        >
          Crafted for
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(250,250,248,0.85)' }}>
            How You Live
          </em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 w-12 h-px"
          style={{ background: BRASS, transformOrigin: 'left' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-6 text-sm leading-relaxed max-w-sm"
          style={{ color: 'rgba(250,250,248,0.55)' }}
        >
          Bespoke kitchen design and cabinet finishing, built to last a lifetime.
        </motion.p>

        <motion.a
          href="#consultation"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ opacity: 0.8 }}
          className="mt-10 pointer-events-auto inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.25em]"
          style={{
            background: `linear-gradient(135deg, ${BRASS} 0%, #c9a040 50%, ${BRASS} 100%)`,
            color: WARM_WHITE,
            textDecoration: 'none',
            borderRadius: '1px',
          }}
        >
          Begin Your Project
          <span aria-hidden="true">→</span>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity }}
      >
        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#5a5248' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'rgba(139,105,20,0.4)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="flex items-center gap-6 px-6 py-4 max-w-6xl mx-auto"
      aria-hidden="true"
    >
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <span style={{ color: BRASS, fontSize: '0.6rem' }}>◆</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

// ─── Materials intro text ─────────────────────────────────────────────────────

function MaterialsIntro() {
  return (
    <div
      className="w-full py-16 px-6 text-center"
      style={{ background: CHARCOAL }}
      id="materials"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-xs uppercase tracking-[0.3em] mb-4"
        style={{ color: BRASS }}
      >
        Material Intelligence
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 300,
          color: WARM_WHITE,
          lineHeight: 1.1,
        }}
      >
        Every surface tells a story.
        <br />
        We help you choose yours.
      </motion.h2>
    </div>
  );
}

// ─── Before/After section wrapper ────────────────────────────────────────────

function TransformationSection() {
  return (
    <section
      className="w-full"
      style={{ background: '#0e0d0b' }}
      id="transformation"
      aria-label="Before and after kitchen transformation"
    >
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="mb-10 text-center">
          <p className="uppercase tracking-[0.25em] text-xs mb-3" style={{ color: BRASS }}>
            The Motta Difference
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: WARM_WHITE,
              lineHeight: 1.05,
            }}
          >
            See the Transformation
          </h2>
        </div>
      </div>
      <BeforeAfterKitchen3D
        beforeLabel="Before"
        afterLabel="After Motta"
        initialPosition={40}
      />
      <div className="max-w-6xl mx-auto px-6 pb-20 pt-10 text-center">
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: '#6e6558' }}>
          Cabinet refinishing from $4,800 — the most impactful kitchen upgrade available,
          without the disruption of a full renovation.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="w-full py-16 px-6"
      style={{ background: '#0a0908', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <MottaLogo />
          <p className="mt-4 text-xs leading-relaxed max-w-xs" style={{ color: '#5a5248' }}>
            Toronto's premier custom kitchen studio. Crafting bespoke kitchens and
            cabinet finishes for discerning homeowners since 2010.
          </p>
        </div>

        <div className="flex gap-16 text-xs">
          <div>
            <p className="uppercase tracking-widest mb-4" style={{ color: BRASS }}>
              Studio
            </p>
            {['Collections', 'Services', 'Materials', 'Process', 'Journal'].map((l) => (
              <p key={l} className="mb-2">
                <a
                  href={`#${l.toLowerCase()}`}
                  style={{ color: '#5a5248', textDecoration: 'none' }}
                  className="hover:text-white transition-colors"
                >
                  {l}
                </a>
              </p>
            ))}
          </div>
          <div>
            <p className="uppercase tracking-widest mb-4" style={{ color: BRASS }}>
              Contact
            </p>
            <p className="mb-2" style={{ color: '#5a5248' }}>
              Toronto, Ontario
            </p>
            <p className="mb-2">
              <a
                href="https://mottakitchen.ca"
                style={{ color: '#5a5248', textDecoration: 'none' }}
                className="hover:text-white transition-colors"
              >
                mottakitchen.ca
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs" style={{ color: '#3a3630' }}>
          © {new Date().getFullYear()} Motta Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Main Assembly ────────────────────────────────────────────────────────────

export interface LandingPageAssemblyProps {
  consultationWebhookUrl?: string;
}

export default function LandingPageAssembly({
  consultationWebhookUrl,
}: LandingPageAssemblyProps) {
  return (
    <div
      className="w-full antialiased"
      style={{ background: '#0e0d0b', color: WARM_WHITE }}
    >
      {/* Google Fonts import — add to <head> in your layout instead if using Next.js */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Nav />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Collections */}
      <section id="collections">
        <CollectionGrid3D />
      </section>

      <Divider />

      {/* 3. Materials */}
      <MaterialsIntro />
      <MaterialSelectorScene3D />

      <Divider />

      {/* 4. Before / After */}
      <TransformationSection />

      <Divider />

      {/* 5. Consultation booking */}
      <section id="consultation">
        <ConsultationBooking3D webhookUrl={consultationWebhookUrl} />
      </section>

      <Footer />
    </div>
  );
}
