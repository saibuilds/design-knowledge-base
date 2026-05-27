"use client";

import React, { useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
}

// Toronto skyline silhouette points (normalized 0-1, CN Tower prominent center)
const SKYLINE_POINTS: [number, number][] = [
  // Ground line
  [0, 1], [1, 1],
  // Left shoreline buildings
  [0.02, 0.85], [0.04, 0.75], [0.06, 0.78], [0.08, 0.70],
  [0.10, 0.72], [0.12, 0.65], [0.14, 0.68], [0.16, 0.62],
  [0.18, 0.64], [0.20, 0.58], [0.22, 0.60], [0.24, 0.55],
  // Rogers Centre dome area
  [0.26, 0.62], [0.28, 0.58], [0.30, 0.55], [0.32, 0.60],
  // CN Tower base and tower
  [0.34, 0.60], [0.35, 0.55], [0.36, 0.50], [0.37, 0.42],
  [0.375, 0.35], [0.38, 0.25], [0.382, 0.18], [0.384, 0.12],
  [0.386, 0.08], [0.388, 0.05], [0.390, 0.03], // Antenna tip
  [0.392, 0.05], [0.394, 0.10], [0.396, 0.30], // Pod
  [0.40, 0.38], [0.41, 0.44], [0.42, 0.50],
  // Downtown core east
  [0.44, 0.45], [0.46, 0.40], [0.48, 0.42], [0.50, 0.38],
  [0.52, 0.42], [0.54, 0.36], [0.56, 0.40], [0.58, 0.44],
  [0.60, 0.38], [0.62, 0.42], [0.64, 0.46], [0.66, 0.50],
  // Midtown
  [0.68, 0.55], [0.70, 0.52], [0.72, 0.56], [0.74, 0.60],
  [0.76, 0.58], [0.78, 0.62], [0.80, 0.65], [0.82, 0.68],
  [0.84, 0.70], [0.86, 0.72], [0.88, 0.75], [0.90, 0.78],
  [0.92, 0.80], [0.94, 0.82], [0.96, 0.84], [0.98, 0.87],
];

function generateParticlesFromSkyline(
  width: number,
  height: number,
  count: number
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Pick a random skyline point and scatter near it
    const pt = SKYLINE_POINTS[Math.floor(Math.random() * SKYLINE_POINTS.length)];
    const scatter = 0.015 + Math.random() * 0.025;
    const bx = (pt[0] + (Math.random() - 0.5) * scatter) * width;
    const by = (pt[1] + (Math.random() - 0.5) * scatter) * height;
    particles.push({
      x: bx,
      y: by,
      baseX: bx,
      baseY: by,
      size: 0.6 + Math.random() * 1.4,
      opacity: 0.3 + Math.random() * 0.7,
      speed: 0.2 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

interface TorontoSkylineScene3DProps {
  useSpline?: boolean;
  className?: string;
  particleCount?: number;
}

export default function TorontoSkylineScene3D({
  useSpline = false,
  className = "",
  particleCount = 800,
}: TorontoSkylineScene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = generateParticlesFromSkyline(
        canvas.width,
        canvas.height,
        particleCount
      );
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = (mouseRef.current.x - 0.5) * 30;
      const my = (mouseRef.current.y - 0.5) * 15;

      for (const p of particlesRef.current) {
        p.angle += p.speed * 0.01;
        p.x = p.baseX + Math.sin(p.angle) * 1.5 + mx * (p.baseY / canvas.height);
        p.y = p.baseY + Math.cos(p.angle * 0.7) * 1.0 + my * (p.baseY / canvas.height);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const alpha = Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = `#c9a96e${alpha}`;
        ctx.fill();
      }

      // Subtle horizontal glow line at horizon
      const horizonY = canvas.height * 0.82;
      const grad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 2);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(201,169,110,0.15)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizonY - 2, canvas.width, 4);

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, [particleCount]);

  if (useSpline) {
    return (
      <div className={`relative w-full h-full ${className}`} style={{ background: "#0a0a0a" }}>
        <Suspense
          fallback={
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: "block" }}
            />
          }
        >
          <Spline scene="https://prod.spline.design/SATHI-SKYLINE-placeholder/scene.splinecode" />
        </Suspense>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block", background: "#0a0a0a" }}
      />
      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)",
        }}
      />
    </motion.div>
  );
}
