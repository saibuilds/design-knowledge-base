'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRASS = '#8b6914';
const WARM_WHITE = '#fafaf8';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BeforeAfterKitchen3DProps {
  beforeImageUrl?: string;
  afterImageUrl?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number; // 0–100
  className?: string;
}

// ─── Arrow icons ──────────────────────────────────────────────────────────────

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2L4 7L9 12" stroke={WARM_WHITE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 2L10 7L5 12" stroke={WARM_WHITE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Placeholder image ────────────────────────────────────────────────────────

function PlaceholderImage({
  variant,
  label,
}: {
  variant: 'before' | 'after';
  label: string;
}) {
  const bg =
    variant === 'before'
      ? 'linear-gradient(160deg, #2a2520 0%, #3a332a 50%, #252018 100%)'
      : 'linear-gradient(160deg, #0e0d0b 0%, #1a1815 40%, #111008 100%)';

  const accent =
    variant === 'before'
      ? 'rgba(120,100,70,0.3)'
      : 'rgba(139,105,20,0.25)';

  return (
    <div
      className="absolute inset-0 flex items-end pb-8 pl-8"
      style={{ background: bg }}
    >
      {/* Simulated kitchen silhouette */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Counter line */}
        <div
          className="absolute bottom-[28%] left-0 right-0 h-[1px]"
          style={{ background: accent }}
        />
        {/* Cabinet outlines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[28%]"
            style={{
              left: `${8 + i * 18}%`,
              width: '15%',
              height: variant === 'before' ? '28%' : '36%',
              border: `1px solid ${accent}`,
              bottom: '28%',
            }}
          />
        ))}
        {/* Upper cabinet line */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 18}%`,
              width: '15%',
              height: '22%',
              top: '10%',
              border: `1px solid ${accent}`,
            }}
          />
        ))}
      </div>

      <span
        className="relative text-xs uppercase tracking-[0.2em] font-mono"
        style={{ color: 'rgba(250,250,248,0.3)' }}
      >
        {label} / photography placeholder
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BeforeAfterKitchen3D({
  beforeImageUrl,
  afterImageUrl,
  beforeLabel = 'Before',
  afterLabel = 'After Motta',
  initialPosition = 42,
  className = '',
}: BeforeAfterKitchen3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Spring physics for handle
  const rawPosition = useRef(initialPosition);
  const springConfig = { stiffness: 260, damping: 28, mass: 0.8 };
  const positionSpring = useSpring(initialPosition, springConfig);

  // Clip path derived from spring value
  const clipRight = useTransform(positionSpring, (v) => `${v}%`);

  const [position, setPositionState] = useState(initialPosition);

  // Keep local state in sync for label positioning
  useEffect(() => {
    return positionSpring.on('change', (v) => setPositionState(v));
  }, [positionSpring]);

  const getPercentFromEvent = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return rawPosition.current;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(Math.max(pct, 2), 98);
  }, []);

  const setPosition = useCallback(
    (clientX: number) => {
      const pct = getPercentFromEvent(clientX);
      rawPosition.current = pct;
      positionSpring.set(pct);
    },
    [getPercentFromEvent, positionSpring]
  );

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition(e.clientX);
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [setPosition]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      setPosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [setPosition]);

  // Click anywhere on container
  const handleContainerClick = (e: React.MouseEvent) => {
    setPosition(e.clientX);
  };

  return (
    <section
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ background: '#0e0d0b', aspectRatio: '16/9', minHeight: '420px' }}
      ref={containerRef}
      onClick={handleContainerClick}
      aria-label="Before and after kitchen comparison slider"
    >
      {/* BEFORE layer (full width) */}
      <div className="absolute inset-0">
        {beforeImageUrl ? (
          <img
            src={beforeImageUrl}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <PlaceholderImage variant="before" label={beforeLabel} />
        )}
      </div>

      {/* AFTER layer (clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ width: clipRight }}
      >
        {afterImageUrl ? (
          <img
            src={afterImageUrl}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
            draggable={false}
          />
        ) : (
          <div style={{ width: containerRef.current?.offsetWidth ?? '100vw' }} className="absolute inset-0 h-full">
            <PlaceholderImage variant="after" label={afterLabel} />
          </div>
        )}
      </motion.div>

      {/* Divider line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: clipRight, background: `rgba(139,105,20,0.7)` }}
      />

      {/* Brass drag handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-1 rounded-full cursor-ew-resize"
        style={{
          left: clipRight,
          width: 48,
          height: 48,
          background: `radial-gradient(circle at 40% 35%, #d4aa50, ${BRASS} 60%, #5a4010)`,
          boxShadow: `0 0 0 2px rgba(139,105,20,0.4), 0 4px 20px rgba(0,0,0,0.5)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Comparison slider handle"
      >
        <ArrowLeft />
        <ArrowRight />
      </motion.div>

      {/* Labels */}
      <div
        className="absolute bottom-5 left-5 px-3 py-1 text-xs uppercase tracking-[0.2em] pointer-events-none"
        style={{
          color: 'rgba(250,250,248,0.6)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(250,250,248,0.1)',
        }}
      >
        {beforeLabel}
      </div>
      <motion.div
        className="absolute bottom-5 px-3 py-1 text-xs uppercase tracking-[0.2em] pointer-events-none"
        style={{
          left: clipRight,
          marginLeft: '12px',
          color: WARM_WHITE,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          border: `1px solid rgba(139,105,20,0.5)`,
          whiteSpace: 'nowrap',
        }}
      >
        {afterLabel}
      </motion.div>

      {/* Drag hint — fades after first interaction */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] pointer-events-none"
        style={{
          color: 'rgba(250,250,248,0.4)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          padding: '4px 12px',
        }}
      >
        Drag to compare
      </div>
    </section>
  );
}
