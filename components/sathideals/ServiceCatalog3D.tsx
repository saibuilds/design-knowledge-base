"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji shorthand for canvas
  splineUrl: string;
  particles: { color: string; pattern: "circle" | "grid" | "wave" | "random" };
}

const SERVICES: ServiceItem[] = [
  {
    id: "buy",
    name: "Buy a Home",
    description: "Expert guidance through every step of your Toronto home purchase.",
    icon: "🏠",
    splineUrl: "https://prod.spline.design/SATHI-BUY-placeholder/scene.splinecode",
    particles: { color: "#c9a96e", pattern: "circle" },
  },
  {
    id: "sell",
    name: "Sell Your Home",
    description: "Maximum exposure, optimal pricing, and fast closings.",
    icon: "📈",
    splineUrl: "https://prod.spline.design/SATHI-SELL-placeholder/scene.splinecode",
    particles: { color: "#e8c98a", pattern: "wave" },
  },
  {
    id: "invest",
    name: "Investment Properties",
    description: "Cap rates, cash flow analysis, and GTA investment strategy.",
    icon: "💼",
    splineUrl: "https://prod.spline.design/SATHI-INVEST-placeholder/scene.splinecode",
    particles: { color: "#c9a96e", pattern: "grid" },
  },
  {
    id: "preconstruct",
    name: "Pre-Construction",
    description: "Exclusive access to new Toronto & GTA condo launches.",
    icon: "🏗️",
    splineUrl: "https://prod.spline.design/SATHI-PRECON-placeholder/scene.splinecode",
    particles: { color: "#d4b37a", pattern: "random" },
  },
  {
    id: "relocation",
    name: "Relocation",
    description: "Seamless transitions into the GTA from across Canada or abroad.",
    icon: "✈️",
    splineUrl: "https://prod.spline.design/SATHI-RELOCATION-placeholder/scene.splinecode",
    particles: { color: "#c9a96e", pattern: "wave" },
  },
  {
    id: "market",
    name: "Market Analysis",
    description: "Data-driven CMA reports and neighbourhood trend breakdowns.",
    icon: "📊",
    splineUrl: "https://prod.spline.design/SATHI-MARKET-placeholder/scene.splinecode",
    particles: { color: "#e0c080", pattern: "grid" },
  },
];

function MiniScene({ service, hovered }: { service: ServiceItem; hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 120;
    canvas.height = canvas.offsetHeight || 80;

    const W = canvas.width;
    const H = canvas.height;
    const { color, pattern } = service.particles;

    const draw = () => {
      tRef.current += hovered ? 0.06 : 0.02;
      const t = tRef.current;

      ctx.clearRect(0, 0, W, H);

      if (pattern === "circle") {
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2 + t;
          const r = 22 + Math.sin(t * 1.5 + i) * 5;
          const x = W / 2 + Math.cos(angle) * r;
          const y = H / 2 + Math.sin(angle) * r * 0.6;
          ctx.beginPath();
          ctx.arc(x, y, hovered ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${hovered ? "cc" : "66"}`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 6 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      } else if (pattern === "grid") {
        const cols = 5;
        const rows = 3;
        const gw = W / (cols + 1);
        const gh = H / (rows + 1);
        for (let r = 1; r <= rows; r++) {
          for (let c = 1; c <= cols; c++) {
            const phase = Math.sin(t + r + c * 0.7);
            const size = (hovered ? 2.5 : 1.5) + phase * 1.2;
            ctx.beginPath();
            ctx.arc(c * gw, r * gh, Math.max(0.5, size), 0, Math.PI * 2);
            ctx.fillStyle = `${color}${Math.floor((0.3 + (phase + 1) * 0.35) * 255).toString(16).padStart(2, "0")}`;
            ctx.fill();
          }
        }
      } else if (pattern === "wave") {
        ctx.beginPath();
        for (let x = 0; x < W; x += 3) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * 3 + t) * 15 + Math.sin((x / W) * Math.PI * 6 + t * 1.5) * 7;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}${hovered ? "99" : "44"}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        for (let x = 0; x < W; x += 3) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * 3 + t + 1) * 10;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}44`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        // random
        if (tRef.current % 8 < 0.1 || canvas.dataset.init !== "1") {
          canvas.dataset.init = "1";
        }
        for (let i = 0; i < 18; i++) {
          const x = ((Math.sin(i * 47.3 + t * 0.3) + 1) / 2) * W;
          const y = ((Math.cos(i * 31.7 + t * 0.2) + 1) / 2) * H;
          const s = (hovered ? 2.5 : 1.5) + Math.sin(i + t) * 1;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, s), 0, Math.PI * 2);
          ctx.fillStyle = `${color}${hovered ? "aa" : "55"}`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, service]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-20 rounded-lg"
      style={{ display: "block", background: "rgba(255,255,255,0.02)" }}
    />
  );
}

export default function ServiceCatalog3D({ className = "" }: { className?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {SERVICES.map((service, i) => {
        const isHov = hoveredId === service.id;
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative rounded-2xl p-5 cursor-pointer overflow-hidden"
            style={{
              background: "#111",
              border: isHov ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.06)",
              transition: "border-color 0.3s",
            }}
          >
            {/* Glow bg */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{
                background: isHov
                  ? "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 70%)"
                  : "transparent",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Mini canvas scene */}
            <MiniScene service={service} hovered={isHov} />

            <div className="mt-4 space-y-1.5 relative z-10">
              <h3
                className="text-white font-semibold text-base"
                style={{ color: isHov ? "#c9a96e" : "white", transition: "color 0.3s" }}
              >
                {service.name}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
            </div>

            <motion.div
              className="mt-4 flex items-center gap-1 text-[#c9a96e] text-xs font-medium"
              animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : -6 }}
              transition={{ duration: 0.25 }}
            >
              Learn more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
