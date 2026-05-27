"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface AgentData {
  name: string;
  title: string;
  imageUrl: string;
  listingsSold: number;
  avgDaysOnMarket: number;
  neighbourhoods: string[];
  bio: string;
}

const AGENTS: AgentData[] = [
  {
    name: "Sai",
    title: "Lead Agent · SathiDeals",
    imageUrl: "/logos/agent-sai.jpg",
    listingsSold: 147,
    avgDaysOnMarket: 9,
    neighbourhoods: ["Downtown", "Midtown", "North York", "Vaughan"],
    bio: "Specializing in luxury condos and pre-construction. Known for aggressive negotiation and market insight.",
  },
  {
    name: "Sathi",
    title: "Lead Agent · SathiDeals",
    imageUrl: "/logos/agent-sathi.jpg",
    listingsSold: 163,
    avgDaysOnMarket: 7,
    neighbourhoods: ["Etobicoke", "Mississauga", "Brampton", "Scarborough"],
    bio: "Expert in family homes and investment properties across the GTA. Data-driven approach with a personal touch.",
  },
];

function useParticleBurst(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const runningRef = useRef(false);

  const burst = useCallback(
    (originX: number, originY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.6,
          size: 1.5 + Math.random() * 3,
        });
      }

      if (runningRef.current) return;
      runningRef.current = true;

      const tick = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.life -= 0.025;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,169,110,${Math.max(0, p.life)})`;
          ctx.fill();
        }

        if (particlesRef.current.length > 0) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          runningRef.current = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      tick();
    },
    [canvasRef]
  );

  return burst;
}

function AgentCard({ agent }: { agent: AgentData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const burst = useParticleBurst(canvasRef as React.RefObject<HTMLCanvasElement>);

  const handleMouseEnter = () => {
    setHovered(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    burst(canvas.offsetWidth / 2, canvas.offsetHeight * 0.35);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden bg-[#111] flex-1 min-w-[260px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      animate={{
        boxShadow: hovered
          ? "0 0 40px 4px rgba(201,169,110,0.25), 0 0 0 1px rgba(201,169,110,0.3)"
          : "0 0 0px 0px rgba(201,169,110,0), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Particle canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ display: "block" }}
      />

      {/* Agent photo */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={agent.imageUrl}
          alt={agent.name}
          className="w-full h-full object-cover object-top"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-4">
        <div>
          <h3 className="text-white text-2xl font-bold">{agent.name}</h3>
          <p className="text-[#c9a96e] text-xs font-medium tracking-wider uppercase mt-0.5">
            {agent.title}
          </p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">{agent.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
          <Stat label="Listings Sold" value={agent.listingsSold.toString()} />
          <Stat label="Avg Days on Market" value={`${agent.avgDaysOnMarket} days`} />
        </div>

        {/* Neighbourhoods */}
        <div className="flex flex-wrap gap-1.5">
          {agent.neighbourhoods.map((n) => (
            <span
              key={n}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] font-medium"
            >
              {n}
            </span>
          ))}
        </div>

        {/* CTA */}
        <GoldShimmerButton label={`Book a Showing with ${agent.name}`} />
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#c9a96e] text-xl font-bold">{value}</p>
      <p className="text-gray-500 text-xs mt-0.5">{label}</p>
    </div>
  );
}

function GoldShimmerButton({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative w-full py-3 rounded-xl text-sm font-semibold text-[#0a0a0a] overflow-hidden"
      style={{ background: "#c9a96e" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="absolute inset-0 pointer-events-none"
        animate={
          hov
            ? {
                background: [
                  "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)",
                  "linear-gradient(110deg, transparent 60%, rgba(255,255,255,0.35) 90%, transparent 120%)",
                ],
                backgroundPosition: ["0% 50%", "200% 50%"],
              }
            : {}
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {label}
    </motion.button>
  );
}

interface AgentProfile3DProps {
  className?: string;
}

export default function AgentProfile3D({ className = "" }: AgentProfile3DProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-5 w-full ${className}`}>
      {AGENTS.map((agent) => (
        <AgentCard key={agent.name} agent={agent} />
      ))}
    </div>
  );
}
