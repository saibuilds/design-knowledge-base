"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TorontoSkylineScene3D from "./TorontoSkylineScene3D";
import AgentProfile3D from "./AgentProfile3D";
import PropertyCard3D, { PropertyCard3DProps } from "./PropertyCard3D";
import NeighbourhoodOrb3D from "./NeighbourhoodOrb3D";
import MortgageEstimator3D from "./MortgageEstimator3D";
import ServiceCatalog3D from "./ServiceCatalog3D";

// ─── Sample listings ────────────────────────────────────────────────────────

const LISTINGS: PropertyCard3DProps[] = [
  {
    address: "1001 Bay St, Unit 3208",
    price: 1_195_000,
    beds: 2,
    baths: 2,
    sqft: 920,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    neighbourhood: "Downtown",
    tag: "Featured",
  },
  {
    address: "88 Harbour St, Unit 1502",
    price: 899_000,
    beds: 1,
    baths: 1,
    sqft: 615,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    neighbourhood: "Downtown",
    tag: "New",
  },
  {
    address: "4055 Sheppard Ave E, Unit 812",
    price: 649_000,
    beds: 2,
    baths: 2,
    sqft: 840,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    neighbourhood: "Scarborough",
    tag: "Sold",
  },
  {
    address: "222 Finch Ave W, Unit 404",
    price: 779_000,
    beds: 3,
    baths: 2,
    sqft: 1_100,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    neighbourhood: "North York",
    tag: "Featured",
  },
  {
    address: "1 Bloor St E, Unit 2201",
    price: 1_450_000,
    beds: 2,
    baths: 2,
    sqft: 1_050,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    neighbourhood: "Midtown",
    tag: "New",
  },
  {
    address: "7 Concorde Gate, Unit 910",
    price: 589_000,
    beds: 2,
    baths: 1,
    sqft: 775,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    neighbourhood: "Etobicoke",
  },
];

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">{subtitle}</p>}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3">
        <img src="/logos/logo-tiger.svg" alt="SathiDeals" className="h-7 w-auto" />
        <span className="text-[#c9a96e] font-bold text-base tracking-wide">SathiDeals</span>
      </div>
      <div className="hidden md:flex items-center gap-7 text-xs text-gray-400 font-medium tracking-wide uppercase">
        <a href="#listings" className="hover:text-[#c9a96e] transition-colors">Listings</a>
        <a href="#neighbourhoods" className="hover:text-[#c9a96e] transition-colors">Neighbourhoods</a>
        <a href="#calculator" className="hover:text-[#c9a96e] transition-colors">Calculator</a>
        <a href="#services" className="hover:text-[#c9a96e] transition-colors">Services</a>
        <a href="#agents" className="hover:text-[#c9a96e] transition-colors">Our Team</a>
      </div>
      <button className="text-xs font-semibold bg-[#c9a96e] text-[#0a0a0a] px-4 py-2 rounded-xl hover:bg-[#d4b37a] transition-colors">
        Contact Us
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Skyline bg */}
      <div className="absolute inset-0 z-0">
        <TorontoSkylineScene3D particleCount={900} />
      </div>

      {/* Hero overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-28 pb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="space-y-5 max-w-2xl"
        >
          <img src="/logos/logo-team.png" alt="Sai & Sathi Real Estate" className="h-12 mx-auto" />
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight">
            Toronto&apos;s Most{" "}
            <span className="text-[#c9a96e]">Dedicated</span>{" "}
            Real Estate Team
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Sai & Sathi — Your trusted GTA real estate advisors. From downtown condos to suburban
            family homes, we close deals others can&apos;t.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="#listings"
              className="bg-[#c9a96e] text-[#0a0a0a] text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-[#d4b37a] transition-colors"
            >
              Browse Listings
            </a>
            <a
              href="#agents"
              className="border border-[#c9a96e]/40 text-[#c9a96e] text-sm font-medium px-8 py-3.5 rounded-xl hover:border-[#c9a96e] hover:bg-[#c9a96e]/8 transition-all"
            >
              Meet the Team
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-1 text-gray-600 text-xs"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Agents strip at bottom of hero */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-12">
        <AgentProfile3D />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LandingPageAssembly() {
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string | null>(null);

  const filteredListings = selectedNeighbourhood
    ? LISTINGS.filter((l) => l.neighbourhood === selectedNeighbourhood)
    : LISTINGS;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <TopNav />

      {/* ── Hero ── */}
      <HeroSection />

      <GoldDivider />

      {/* ── Listings ── */}
      <Section id="listings" className="py-20">
        <SectionHeading
          eyebrow="Current Listings"
          title="Properties in the GTA"
          subtitle={
            selectedNeighbourhood
              ? `Showing results for ${selectedNeighbourhood}`
              : "Handpicked listings by Sai & Sathi"
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredListings.map((p) => (
            <PropertyCard3D key={p.address} {...p} />
          ))}
        </div>
        {filteredListings.length === 0 && (
          <p className="text-center text-gray-600 py-16">
            No listings in {selectedNeighbourhood} right now. Check back soon.
          </p>
        )}
      </Section>

      <GoldDivider />

      {/* ── Neighbourhoods orb ── */}
      <Section id="neighbourhoods" className="py-20">
        <SectionHeading
          eyebrow="Explore"
          title="GTA Neighbourhoods"
          subtitle="Rotate the orb and click a neighbourhood to filter listings"
        />
        <NeighbourhoodOrb3D
          onSelect={setSelectedNeighbourhood}
          selected={selectedNeighbourhood}
          className="max-w-lg mx-auto"
        />
        {selectedNeighbourhood && (
          <div className="text-center mt-4">
            <button
              onClick={() => setSelectedNeighbourhood(null)}
              className="text-xs text-gray-500 underline hover:text-[#c9a96e] transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </Section>

      <GoldDivider />

      {/* ── Mortgage calculator ── */}
      <Section id="calculator" className="py-20">
        <SectionHeading
          eyebrow="Tools"
          title="Mortgage Estimator"
          subtitle="Get a rough sense of your monthly payments in seconds"
        />
        <MortgageEstimator3D className="max-w-3xl mx-auto" />
      </Section>

      <GoldDivider />

      {/* ── Services ── */}
      <Section id="services" className="py-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-Service Real Estate"
          subtitle="From your first showing to final closing — and everything in between"
        />
        <ServiceCatalog3D />
      </Section>

      <GoldDivider />

      {/* ── Agents (repeat CTA) ── */}
      <Section id="agents" className="py-20">
        <SectionHeading
          eyebrow="The Team"
          title="Sai & Sathi"
          subtitle="Two agents. One mission. Get you the best deal in Toronto."
        />
        <AgentProfile3D />
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-gray-700 space-y-2">
        <img src="/logos/logo-tiger.svg" alt="SathiDeals" className="h-6 mx-auto mb-3 opacity-40" />
        <p>SathiDeals · Sai & Sathi Real Estate Team · Toronto, ON</p>
        <p className="text-gray-800">
          Royal LePage Real Estate Services Ltd., Brokerage · Not intended to solicit buyers or sellers currently under contract.
        </p>
      </footer>
    </div>
  );
}
