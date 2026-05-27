# Micro-Interactions: Complete Pattern Library

All examples use **Framer Motion** + **Tailwind CSS** + **TypeScript**.

---

## 1. Button Hover States

### Scale + Color Shift
```tsx
import { motion } from "framer-motion";

export function ScaleButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium"
      whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
```

### Arrow Reveal on Hover
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ArrowButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
    >
      <span>{children}</span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -8, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: -8, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
```

### Magnetic Button
```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set(distX * 0.35);
    y.set(distY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-white text-black border-2 border-black rounded-full font-semibold cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

### Spotlight / Shine Button
```tsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export function SpotlightButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative px-8 py-3 bg-neutral-900 text-white rounded-xl font-medium overflow-hidden border border-neutral-700"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [x, y],
            ([mx, my]) =>
              `radial-gradient(80px circle at ${mx}px ${my}px, rgba(255,255,255,0.12), transparent 100%)`
          ),
        }}
      />
      {children}
    </motion.button>
  );
}
```

---

## 2. Input Focus Animations

### Border Glow on Focus
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GlowInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className="w-full px-4 py-3 bg-neutral-900 text-white rounded-xl border border-neutral-700 outline-none transition-colors duration-200 focus:border-indigo-500"
      />
      <AnimatePresence>
        {focused && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: "0 0 0 3px rgba(99,102,241,0.35)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Floating Label Input
```tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingLabelInputProps {
  label: string;
  type?: string;
}

export function FloatingLabelInput({ label, type = "text" }: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isActive ? -22 : 0,
          x: isActive ? -4 : 0,
          scale: isActive ? 0.78 : 1,
          color: focused ? "#6366f1" : "#9ca3af",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute left-4 top-3.5 origin-left pointer-events-none text-base font-medium"
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-5 pb-2 bg-neutral-900 text-white rounded-xl border border-neutral-700 outline-none focus:border-indigo-500 transition-colors"
      />
    </div>
  );
}
```

---

## 3. Card Hover Effects

### Lift + Shadow
```tsx
import { motion } from "framer-motion";

export function LiftCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="p-6 bg-white rounded-2xl border border-neutral-200 cursor-pointer"
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
```

### 3D Tilt Card
```tsx
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="p-6 bg-white rounded-2xl border border-neutral-200 cursor-pointer will-change-transform"
    >
      {children}
    </motion.div>
  );
}
```

### Spotlight Card (cursor follows light)
```tsx
import { useRef, useState } from "react";

export function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative p-6 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.15), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

## 4. Link Underline Animations

### Slide In from Left
```tsx
export function SlideUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative text-neutral-900 font-medium group"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
```

### Expand from Center
```tsx
export function CenterUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="relative text-neutral-900 font-medium group">
      {children}
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-indigo-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
    </a>
  );
}
```

### Background Fill (Underline to Background)
```tsx
export function FillLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative inline-block px-1 font-medium text-neutral-900 overflow-hidden group"
    >
      <span className="relative z-10 mix-blend-difference">{children}</span>
      <span className="absolute inset-0 bg-black translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
    </a>
  );
}
```

---

## 5. Loading States

### Skeleton Loader
```tsx
export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-2xl border border-neutral-200 space-y-4">
      <div className="h-4 bg-neutral-200 rounded-full animate-pulse w-3/4" />
      <div className="h-4 bg-neutral-200 rounded-full animate-pulse w-1/2" />
      <div className="h-32 bg-neutral-200 rounded-xl animate-pulse" />
      <div className="flex gap-3">
        <div className="h-4 bg-neutral-200 rounded-full animate-pulse w-1/4" />
        <div className="h-4 bg-neutral-200 rounded-full animate-pulse w-1/4" />
      </div>
    </div>
  );
}

// Generic skeleton primitive
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 rounded-md ${className}`}
    />
  );
}
```

### Spinner
```tsx
import { motion } from "framer-motion";

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <motion.div
      className="rounded-full border-2 border-neutral-200 border-t-indigo-600"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

// Dots spinner
export function DotsLoader() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-600"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
```

### Progress Bar
```tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-indigo-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

// Indeterminate loader bar
export function IndeterminateBar() {
  return (
    <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full w-1/3 bg-indigo-600 rounded-full"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
```

---

## 6. Success / Error Form Feedback

### Animated Form Submit
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function SubmitButton({ onSubmit }: { onSubmit: () => Promise<boolean> }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleClick = async () => {
    setStatus("loading");
    const ok = await onSubmit();
    setStatus(ok ? "success" : "error");
    setTimeout(() => setStatus("idle"), 2500);
  };

  const variants = {
    idle: { backgroundColor: "#6366f1" },
    loading: { backgroundColor: "#818cf8" },
    success: { backgroundColor: "#22c55e" },
    error: { backgroundColor: "#ef4444" },
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={status !== "idle"}
      variants={variants}
      animate={status}
      transition={{ duration: 0.3 }}
      className="relative flex items-center justify-center gap-2 px-8 py-3 text-white rounded-xl font-medium min-w-[140px]"
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Submit
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loader2 size={18} className="animate-spin" />
          </motion.span>
        )}
        {status === "success" && (
          <motion.span
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Check size={18} />
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            key="error"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <X size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
```

### Field-Level Validation Feedback
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

interface ValidatedInputProps {
  error?: string;
  success?: boolean;
  label: string;
}

export function ValidatedInput({ error, success, label }: ValidatedInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <div className="relative">
        <input
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors duration-200 pr-10
            ${error ? "border-red-400 bg-red-50" : success ? "border-green-400 bg-green-50" : "border-neutral-300"}`}
        />
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {error ? (
                <AlertCircle size={18} className="text-red-500" />
              ) : (
                <Check size={18} className="text-green-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 7. Toggle / Checkbox Animations

### Animated Toggle Switch
```tsx
import { motion } from "framer-motion";
import { useState } from "react";

export function AnimatedToggle({
  defaultChecked = false,
  onChange,
}: {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <motion.button
      onClick={toggle}
      animate={{ backgroundColor: checked ? "#6366f1" : "#d1d5db" }}
      transition={{ duration: 0.2 }}
      className="relative w-12 h-6 rounded-full p-0.5 cursor-pointer"
    >
      <motion.div
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow-sm"
      />
    </motion.button>
  );
}
```

### Animated Checkbox
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

export function AnimatedCheckbox({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <motion.div
        onClick={() => setChecked(!checked)}
        animate={{
          backgroundColor: checked ? "#6366f1" : "#ffffff",
          borderColor: checked ? "#6366f1" : "#d1d5db",
          scale: checked ? [1, 0.85, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.25 }}
        className="w-5 h-5 rounded-md border-2 flex items-center justify-center"
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check size={12} strokeWidth={3} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="text-sm font-medium text-neutral-700">{label}</span>
    </label>
  );
}
```

---

## 8. Menu Open / Close Transitions

### Hamburger to X
```tsx
import { motion } from "framer-motion";
import { useState } from "react";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-6 flex flex-col justify-between"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block h-0.5 w-full bg-current rounded-full origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block h-0.5 w-full bg-current rounded-full"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block h-0.5 w-full bg-current rounded-full origin-center"
        />
      </button>

      {/* Dropdown menu */}
      <motion.nav
        initial={false}
        animate={open ? { opacity: 1, height: "auto", y: 0 } : { opacity: 0, height: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ul className="py-4 space-y-2">
          {["Home", "About", "Work", "Contact"].map((item, i) => (
            <motion.li
              key={item}
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: open ? i * 0.07 : 0, duration: 0.25 }}
            >
              <a href="#" className="block py-1 px-4 text-neutral-800 hover:text-indigo-600 font-medium">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
```

### Full-Screen Overlay Menu
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Menu } from "lucide-react";

const menuItems = ["Home", "About", "Services", "Portfolio", "Contact"];

export function FullScreenMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2">
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 48px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-start justify-center px-12"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-8 text-white"
            >
              <X size={28} />
            </button>
            <nav className="space-y-4">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="block text-5xl font-bold text-white hover:text-indigo-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 9. Notification Toast Animations

### Toast System with Framer Motion
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Check, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const icons = {
  success: <Check size={16} className="text-green-500" />,
  error: <AlertCircle size={16} className="text-red-500" />,
  info: <Info size={16} className="text-blue-500" />,
};

const colors = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
  info: "border-blue-200 bg-blue-50",
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return { toasts, addToast, setToasts };
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] ${colors[toast.type]}`}
          >
            {icons[toast.type]}
            <p className="text-sm font-medium text-neutral-800 flex-1">{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Usage
export function ToastDemo() {
  const { toasts, addToast, setToasts } = useToast();

  return (
    <>
      <button onClick={() => addToast("Changes saved!", "success")}>
        Show Toast
      </button>
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </>
  );
}
```

---

## Dependencies
```bash
npm install framer-motion
npm install lucide-react
# Tailwind CSS already required
```
