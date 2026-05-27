"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export interface PropertyCard3DProps {
  address: string;
  price: string | number;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  neighbourhood: string;
  tag?: "Featured" | "Sold" | "New" | string;
}

const TAG_COLORS: Record<string, string> = {
  Featured: "bg-[#c9a96e] text-[#0a0a0a]",
  Sold: "bg-red-600 text-white",
  New: "bg-emerald-600 text-white",
};

const formatPrice = (price: string | number) => {
  const num = typeof price === "string" ? parseFloat(price.replace(/[^0-9.]/g, "")) : price;
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(num);
};

export default function PropertyCard3D({
  address,
  price,
  beds,
  baths,
  sqft,
  imageUrl,
  neighbourhood,
  tag,
}: PropertyCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 12);
    rotateX.set(-dy * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
        transition={{ duration: 0.15 }}
      >
        {/* Gold shimmer border */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
          animate={
            hovered
              ? {
                  boxShadow: [
                    "0 0 0px 0px rgba(201,169,110,0)",
                    "0 0 20px 2px rgba(201,169,110,0.6)",
                    "0 0 30px 4px rgba(201,169,110,0.4)",
                    "0 0 20px 2px rgba(201,169,110,0.6)",
                  ],
                }
              : { boxShadow: "0 0 0px 0px rgba(201,169,110,0)" }
          }
          transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
          style={{ border: hovered ? "1.5px solid rgba(201,169,110,0.5)" : "1.5px solid transparent" }}
        />

        {/* Image */}
        <div className="relative overflow-hidden h-52 bg-[#111]">
          <motion.img
            src={imageUrl}
            alt={address}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {tag && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wider ${
                TAG_COLORS[tag] ?? "bg-[#c9a96e] text-[#0a0a0a]"
              }`}
            >
              {tag}
            </span>
          )}
          {/* Dark gradient bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Card body */}
        <div className="bg-[#111111] px-5 py-4 space-y-3">
          <div>
            <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-widest">
              {neighbourhood}
            </p>
            <h3 className="text-white font-semibold text-sm mt-0.5 leading-snug">{address}</h3>
          </div>

          <p className="text-[#c9a96e] text-2xl font-bold tracking-tight">
            {formatPrice(price)}
          </p>

          <div className="flex items-center gap-4 text-gray-400 text-xs border-t border-white/10 pt-3">
            <span className="flex items-center gap-1">
              <BedIcon />
              {beds} {beds === 1 ? "Bed" : "Beds"}
            </span>
            <span className="flex items-center gap-1">
              <BathIcon />
              {baths} {baths === 1 ? "Bath" : "Baths"}
            </span>
            <span className="flex items-center gap-1">
              <SqftIcon />
              {sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
      <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6L9 2M5 6h14a1 1 0 011 1v5H4V7a1 1 0 011-1z" />
      <path d="M4 12v4a4 4 0 008 0v-4" />
    </svg>
  );
}

function SqftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}
