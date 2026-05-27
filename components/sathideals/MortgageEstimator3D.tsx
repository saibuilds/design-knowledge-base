"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MortgageResult {
  monthly: number;
  totalInterest: number;
  totalPayment: number;
  cmhc: number | null;
  principalRatio: number; // 0-1
}

function calcMortgage(
  price: number,
  downPct: number,
  amortYears: number,
  rate = 0.0549 // ~5.49% default
): MortgageResult {
  const downAmt = price * (downPct / 100);
  let principal = price - downAmt;
  let cmhc: number | null = null;

  if (downPct < 20 && price <= 1_500_000) {
    let cmhcRate = 0;
    if (downPct >= 5 && downPct < 10) cmhcRate = 0.04;
    else if (downPct >= 10 && downPct < 15) cmhcRate = 0.031;
    else if (downPct >= 15) cmhcRate = 0.028;
    cmhc = principal * cmhcRate;
    principal += cmhc;
  }

  const monthlyRate = rate / 2; // Canadian semi-annual compounding
  const n = amortYears * 12;
  const monthly =
    monthlyRate === 0
      ? principal / n
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);

  const totalPayment = monthly * n;
  const totalInterest = totalPayment - principal;
  const principalRatio = principal / totalPayment;

  return { monthly, totalInterest, totalPayment, cmhc, principalRatio };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

function AnimatedBar({ ratio, label, color, value }: { ratio: number; label: string; color: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: `${Math.min(100, ratio * 100).toFixed(1)}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function GoldInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-[#c9a96e] font-semibold text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full bg-white/5 border border-white/10 focus:border-[#c9a96e]/60 rounded-xl py-3 text-white text-sm font-medium outline-none transition-colors"
          style={{ paddingLeft: prefix ? "1.75rem" : "0.875rem", paddingRight: suffix ? "2.5rem" : "0.875rem" }}
        />
        {suffix && (
          <span className="absolute right-3 text-gray-400 text-sm pointer-events-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export default function MortgageEstimator3D({ className = "" }: { className?: string }) {
  const [price, setPrice] = useState(900000);
  const [downPct, setDownPct] = useState(20);
  const [amort, setAmort] = useState(25);

  const result = useMemo(() => calcMortgage(price, downPct, amort), [price, downPct, amort]);
  const interestRatio = 1 - result.principalRatio;

  return (
    <div
      className={`rounded-2xl bg-[#111] border border-white/8 overflow-hidden ${className}`}
      style={{ boxShadow: "0 0 60px -10px rgba(201,169,110,0.1)" }}
    >
      <div className="px-6 pt-6 pb-4 border-b border-white/8">
        <h2 className="text-white text-lg font-bold">Mortgage Estimator</h2>
        <p className="text-gray-500 text-xs mt-0.5">Based on ~5.49% rate · Canadian rules</p>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Inputs */}
        <div className="p-6 space-y-4 border-b md:border-b-0 md:border-r border-white/8">
          <GoldInput label="Home Price" value={price} onChange={setPrice} prefix="$" min={100000} max={5000000} step={5000} />
          <GoldInput label="Down Payment" value={downPct} onChange={setDownPct} suffix="%" min={5} max={80} step={1} />
          <GoldInput label="Amortization" value={amort} onChange={setAmort} suffix="yrs" min={5} max={30} step={5} />

          <div className="text-xs text-gray-600 pt-1">
            Down: {fmt(price * (downPct / 100))} · Remaining: {fmt(price * (1 - downPct / 100))}
          </div>

          {result.cmhc !== null && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-yellow-950/40 border border-yellow-600/20 p-3 text-xs"
            >
              <span className="text-yellow-400 font-semibold">CMHC Insurance: {fmt(result.cmhc)}</span>
              <span className="text-gray-500 ml-1">added to principal (down &lt;20%)</span>
            </motion.div>
          )}
        </div>

        {/* Output */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Monthly Payment</p>
            <motion.p
              key={result.monthly.toFixed(0)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#c9a96e] text-4xl font-bold mt-1"
            >
              {fmt(result.monthly)}
            </motion.p>
          </div>

          <div className="space-y-3 pt-2">
            <AnimatedBar
              label="Principal"
              ratio={result.principalRatio}
              color="#c9a96e"
              value={fmt(result.totalPayment - result.totalInterest)}
            />
            <AnimatedBar
              label="Total Interest"
              ratio={interestRatio}
              color="rgba(201,169,110,0.35)"
              value={fmt(result.totalInterest)}
            />
          </div>

          {/* Stacked visual bar */}
          <div className="h-7 rounded-xl overflow-hidden flex mt-2 border border-white/10">
            <motion.div
              className="h-full"
              style={{ background: "#c9a96e" }}
              animate={{ width: `${(result.principalRatio * 100).toFixed(1)}%` }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="h-full flex-1"
              style={{ background: "rgba(201,169,110,0.18)" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>Principal {(result.principalRatio * 100).toFixed(0)}%</span>
            <span>Interest {(interestRatio * 100).toFixed(0)}%</span>
          </div>

          <div className="pt-2 border-t border-white/8 text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Total Cost of Borrowing</span>
              <span className="text-white">{fmt(result.totalPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span>Amortization Period</span>
              <span className="text-white">{amort} years</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-white/2 text-[10px] text-gray-600 border-t border-white/5">
        Estimates are for informational purposes only. Contact Sai or Sathi for personalized mortgage advice.
      </div>
    </div>
  );
}
