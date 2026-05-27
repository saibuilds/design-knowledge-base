'use client';

import React, { Suspense, useRef, useEffect, useState, lazy } from 'react';
import { motion } from 'framer-motion';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SPLINE_URL = 'https://prod.spline.design/MOTTA-ISLAND-placeholder/scene.splinecode';

// ─── Canvas Fallback ──────────────────────────────────────────────────────────

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 3.1 + t) * Math.cos(y * 2.7 - t * 0.5) * 0.5 +
    Math.sin(x * 1.7 - t * 0.3) * Math.sin(y * 4.1 + t * 0.7) * 0.3 +
    Math.cos(x * 5.3 + t * 0.2) * Math.cos(y * 1.9 - t * 0.4) * 0.2
  );
}

interface ParallaxOffset {
  x: number;
  y: number;
}

function IslandCanvas({ parallax }: { parallax: ParallaxOffset }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const draw = (timestamp: number) => {
      timeRef.current = timestamp * 0.0005;
      const t = timeRef.current;
      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);

      // Dark background
      ctx.fillStyle = '#0e0d0b';
      ctx.fillRect(0, 0, w, h);

      // Subtle vignette
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.7)');

      // Parallax offset applied to island center
      const cx = w / 2 + parallax.x * 30;
      const cy = h / 2 + parallax.y * 20;

      // Rotation angle slow drift
      const angle = t * 0.15;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Island countertop — top-down perspective
      const islandW = Math.min(w * 0.55, 320);
      const islandH = Math.min(h * 0.28, 140);

      // Marble texture via noise
      const marbleGrad = ctx.createLinearGradient(-islandW / 2, -islandH / 2, islandW / 2, islandH / 2);
      marbleGrad.addColorStop(0, '#e8e4dc');
      marbleGrad.addColorStop(0.3, '#f2ede5');
      marbleGrad.addColorStop(0.6, '#ddd8ce');
      marbleGrad.addColorStop(1, '#e5e0d6');

      // Island body
      ctx.shadowColor = 'rgba(139,105,20,0.3)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 8;
      ctx.beginPath();
      ctx.roundRect(-islandW / 2, -islandH / 2, islandW, islandH, 4);
      ctx.fillStyle = marbleGrad;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Marble veins
      ctx.save();
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < 6; i++) {
        const vx = -islandW / 2 + (i / 5) * islandW;
        ctx.beginPath();
        ctx.moveTo(vx + Math.sin(t + i) * 8, -islandH / 2);
        ctx.bezierCurveTo(
          vx + 20 * Math.sin(t * 0.7 + i), 0,
          vx - 15 * Math.cos(t * 0.9 + i), 0,
          vx + Math.cos(t + i * 0.8) * 10, islandH / 2
        );
        ctx.strokeStyle = '#8b7355';
        ctx.lineWidth = 0.8 + Math.sin(t + i) * 0.4;
        ctx.stroke();
      }
      ctx.restore();

      // Brass handles — left side
      const handleY = [-islandH * 0.25, islandH * 0.25];
      handleY.forEach((hy) => {
        const shimmer = (Math.sin(t * 3 + hy) + 1) / 2;
        const brassGrad = ctx.createLinearGradient(-islandW / 2 - 18, hy - 4, -islandW / 2 - 4, hy + 4);
        brassGrad.addColorStop(0, `rgba(100,75,10,0.9)`);
        brassGrad.addColorStop(0.4 + shimmer * 0.2, `rgba(220,185,80,${0.9 + shimmer * 0.1})`);
        brassGrad.addColorStop(1, `rgba(139,105,20,0.85)`);

        ctx.beginPath();
        ctx.roundRect(-islandW / 2 - 18, hy - 4, 14, 8, 4);
        ctx.fillStyle = brassGrad;
        ctx.shadowColor = `rgba(220,185,80,${0.4 + shimmer * 0.5})`;
        ctx.shadowBlur = 8 + shimmer * 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Brass handles — right side
      handleY.forEach((hy) => {
        const shimmer = (Math.sin(t * 3 + hy + 1.2) + 1) / 2;
        const brassGrad = ctx.createLinearGradient(islandW / 2 + 4, hy - 4, islandW / 2 + 18, hy + 4);
        brassGrad.addColorStop(0, `rgba(139,105,20,0.85)`);
        brassGrad.addColorStop(0.5 + shimmer * 0.2, `rgba(220,185,80,${0.9 + shimmer * 0.1})`);
        brassGrad.addColorStop(1, `rgba(100,75,10,0.9)`);

        ctx.beginPath();
        ctx.roundRect(islandW / 2 + 4, hy - 4, 14, 8, 4);
        ctx.fillStyle = brassGrad;
        ctx.shadowColor = `rgba(220,185,80,${0.4 + shimmer * 0.5})`;
        ctx.shadowBlur = 8 + shimmer * 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Island edge highlight
      ctx.beginPath();
      ctx.roundRect(-islandW / 2, -islandH / 2, islandW, islandH, 4);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Vignette overlay
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Ambient floor shadow
      const shadowEllipse = ctx.createRadialGradient(cx, h * 0.68, 0, cx, h * 0.68, islandW * 0.6);
      shadowEllipse.addColorStop(0, 'rgba(0,0,0,0.35)');
      shadowEllipse.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadowEllipse;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [parallax]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-label="Rotating kitchen island — canvas fallback"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface KitchenIslandScene3DProps {
  useSpline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function KitchenIslandScene3D({
  useSpline = false,
  className = '',
  children,
}: KitchenIslandScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax({ x, y });
    };

    const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const showSpline = useSpline && !splineError;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#0e0d0b] ${className}`}
      style={{ minHeight: '520px' }}
    >
      {showSpline ? (
        <Suspense fallback={<IslandCanvas parallax={parallax} />}>
          <Spline
            scene={SPLINE_URL}
            onError={() => setSplineError(true)}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <motion.div
          className="w-full h-full"
          style={{
            perspective: '1200px',
            perspectiveOrigin: `${50 + parallax.x * 5}% ${50 + parallax.y * 5}%`,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
          <IslandCanvas parallax={parallax} />
        </motion.div>
      )}

      {/* Overlay content slot */}
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}
