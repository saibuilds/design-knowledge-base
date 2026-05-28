# Premium UI Design Patterns — React/TSX Reference

---

## 1. Glassmorphism Cards

Three production-ready variants: blur, frosted, and gradient border.

```tsx
// glass-card.tsx
import React from "react";

const styles = `
  .glass-base {
    border-radius: 16px;
    padding: 24px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  /* Variant 1: Blur */
  .glass-blur {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Variant 2: Frosted */
  .glass-frosted {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px) brightness(1.1);
    -webkit-backdrop-filter: blur(20px) brightness(1.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* Variant 3: Gradient border via pseudo-element */
  .glass-gradient-border {
    background: rgba(15, 15, 25, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .glass-gradient-border::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05), rgba(120,80,255,0.6));
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .demo-bg {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    display: flex;
    gap: 24px;
    padding: 48px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; }
  .card-body { font-size: 0.875rem; opacity: 0.7; line-height: 1.6; }
`;

export function GlassCards() {
  return (
    <>
      <style>{styles}</style>
      <div className="demo-bg">
        <div className="glass-base glass-blur" style={{ width: 280 }}>
          <div className="card-title">Blur Glass</div>
          <div className="card-body">Standard blur with rgba background and border.</div>
        </div>

        <div className="glass-base glass-frosted" style={{ width: 280 }}>
          <div className="card-title">Frosted Glass</div>
          <div className="card-body">Higher blur with inner highlight for depth.</div>
        </div>

        <div className="glass-base glass-gradient-border" style={{ width: 280 }}>
          <div className="card-title">Gradient Border</div>
          <div className="card-body">Pseudo-element mask trick for a full gradient stroke.</div>
        </div>
      </div>
    </>
  );
}
```

---

## 2. Noise Texture Overlays

SVG turbulence filter combined with CSS for organic grain.

```tsx
// noise-overlay.tsx
import React from "react";

const styles = `
  .noise-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }

  /* SVG noise via data URI */
  .noise-layer {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    mix-blend-mode: overlay;
  }

  /* Alternative: CSS-only grain via repeating gradient */
  .noise-css {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.15'/%3E%3C/svg%3E");
    opacity: 0.5;
    mix-blend-mode: soft-light;
  }

  .noise-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
`;

export function NoiseOverlay() {
  return (
    <>
      <style>{styles}</style>
      <div className="noise-container">
        <div className="noise-layer" />
        <div className="noise-css" />
        <div className="noise-content">Textured Surface</div>
      </div>
    </>
  );
}
```

---

## 3. Animated Gradient Backgrounds

Mesh gradient, aurora borealis, and moving conic gradient.

```tsx
// animated-gradients.tsx
import React from "react";

const styles = `
  /* === Mesh Gradient === */
  @keyframes mesh-move {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .mesh-gradient {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      -45deg,
      #ee7752, #e73c7e, #23a6d5, #23d5ab
    );
    background-size: 400% 400%;
    animation: mesh-move 12s ease infinite;
  }

  /* === Aurora Borealis === */
  @keyframes aurora-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -50px) scale(1.1); }
    66%       { transform: translate(-20px, 20px) scale(0.9); }
  }
  @keyframes aurora-2 {
    0%, 100% { transform: translate(0, 0) scale(1.1); }
    33%       { transform: translate(-40px, 30px) scale(0.9); }
    66%       { transform: translate(20px, -30px) scale(1.2); }
  }
  .aurora-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #030014;
    overflow: hidden;
  }
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
  }
  .aurora-blob-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, #7c3aed, transparent 70%);
    top: -100px; left: -100px;
    animation: aurora-1 8s ease-in-out infinite;
  }
  .aurora-blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #06b6d4, transparent 70%);
    top: 100px; right: -50px;
    animation: aurora-2 10s ease-in-out infinite;
  }
  .aurora-blob-3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #10b981, transparent 70%);
    bottom: -50px; left: 30%;
    animation: aurora-1 12s ease-in-out infinite reverse;
  }

  /* === Conic Gradient === */
  @keyframes conic-spin {
    from { --conic-angle: 0deg; }
    to   { --conic-angle: 360deg; }
  }
  @property --conic-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .conic-gradient {
    width: 100%;
    height: 100vh;
    background: conic-gradient(
      from var(--conic-angle),
      #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b
    );
    animation: conic-spin 6s linear infinite;
    filter: blur(0px) saturate(1.5);
  }
`;

export function MeshGradient() {
  return (
    <>
      <style>{styles}</style>
      <div className="mesh-gradient" />
    </>
  );
}

export function AuroraBorealis({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <style>{styles}</style>
      <div className="aurora-container">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        {children}
      </div>
    </>
  );
}

export function ConicGradient() {
  return (
    <>
      <style>{styles}</style>
      <div className="conic-gradient" />
    </>
  );
}
```

---

## 4. Spotlight / Cursor Glow Effects

CSS-only radial spotlight and React mouse-tracking variant.

```tsx
// spotlight.tsx
"use client";
import React, { useCallback, useRef } from "react";

const styles = `
  /* CSS-only: spotlight follows :hover on container via CSS custom props trick */
  .spotlight-css {
    position: relative;
    min-height: 100vh;
    background: #0a0a0a;
    overflow: hidden;
  }
  .spotlight-css::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      600px circle at var(--x, 50%) var(--y, 50%),
      rgba(120, 80, 255, 0.15),
      transparent 40%
    );
    pointer-events: none;
    transition: opacity 0.3s;
  }

  /* React variant */
  .spotlight-react {
    position: relative;
    min-height: 100vh;
    background: #080808;
    overflow: hidden;
  }
  .spotlight-glow {
    position: fixed;
    border-radius: 50%;
    width: 600px;
    height: 600px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.18) 0%,
      rgba(99, 102, 241, 0.05) 40%,
      transparent 70%
    );
    transition: opacity 0.3s;
    z-index: 0;
  }
  .spotlight-content {
    position: relative;
    z-index: 1;
    color: white;
    padding: 48px;
    font-size: 2rem;
    font-weight: 700;
  }
`;

// React cursor glow
export function SpotlightReact({ children }: { children?: React.ReactNode }) {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current) return;
    glowRef.current.style.left = `${e.clientX}px`;
    glowRef.current.style.top = `${e.clientY}px`;
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div
        className="spotlight-react"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={glowRef} className="spotlight-glow" style={{ opacity: 0 }} />
        <div className="spotlight-content">{children ?? "Hover over me"}</div>
      </div>
    </>
  );
}

// CSS-only version (requires JS to update --x/--y custom props)
export function SpotlightCSS() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}%`);
    (e.currentTarget as HTMLElement).style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div ref={ref} className="spotlight-css" onMouseMove={handleMouseMove} />
    </>
  );
}
```

---

## 5. Bento Grid Layouts

Asymmetric feature grid inspired by Linear and Vercel.

```tsx
// bento-grid.tsx
import React from "react";

const styles = `
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 12px;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
    background: #0a0a0a;
    min-height: 100vh;
  }

  .bento-cell {
    background: #111111;
    border: 1px solid #1f1f1f;
    border-radius: 16px;
    padding: 28px;
    color: white;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s;
  }
  .bento-cell:hover { border-color: #333; }

  /* Layout spans */
  .bento-wide   { grid-column: span 2; }
  .bento-tall   { grid-row: span 2; }
  .bento-full   { grid-column: span 4; }
  .bento-3      { grid-column: span 3; }

  .bento-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #666;
    margin-bottom: 12px;
  }
  .bento-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 8px;
  }
  .bento-desc {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.6;
  }

  /* Accent cells */
  .bento-accent-purple { background: linear-gradient(135deg, #1a0533, #2d1052); border-color: #4c1d95; }
  .bento-accent-blue   { background: linear-gradient(135deg, #001233, #0a2463); border-color: #1d4ed8; }

  .bento-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 16px;
  }

  .bento-stat {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(135deg, #fff, #888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    .bento-grid { grid-template-columns: repeat(2, 1fr); }
    .bento-wide, .bento-3, .bento-full { grid-column: span 2; }
  }
`;

export function BentoGrid() {
  return (
    <>
      <style>{styles}</style>
      <div className="bento-grid">
        {/* Row 1 */}
        <div className="bento-cell bento-wide bento-accent-purple">
          <div className="bento-icon">⚡</div>
          <div className="bento-label">Performance</div>
          <div className="bento-title">Built for speed at any scale</div>
          <div className="bento-desc">Sub-millisecond response times across 40+ global edge nodes.</div>
        </div>

        <div className="bento-cell">
          <div className="bento-stat">99.9%</div>
          <div className="bento-desc" style={{ marginTop: 8 }}>Uptime SLA</div>
        </div>

        <div className="bento-cell">
          <div className="bento-icon">🔒</div>
          <div className="bento-label">Security</div>
          <div className="bento-title">End-to-end encrypted</div>
        </div>

        {/* Row 2 */}
        <div className="bento-cell bento-tall bento-accent-blue">
          <div className="bento-icon">🌐</div>
          <div className="bento-label">Global</div>
          <div className="bento-title">Deploy in 40+ regions instantly</div>
          <div className="bento-desc" style={{ marginTop: 12 }}>One command to replicate your entire stack worldwide with zero configuration.</div>
        </div>

        <div className="bento-cell bento-wide">
          <div className="bento-label">Integrations</div>
          <div className="bento-title">Connect everything you already use</div>
          <div className="bento-desc">Native integrations with GitHub, Vercel, Linear, Notion and 200+ more tools.</div>
        </div>

        <div className="bento-cell">
          <div className="bento-stat">40ms</div>
          <div className="bento-desc" style={{ marginTop: 8 }}>Avg. cold start</div>
        </div>

        {/* Row 3 */}
        <div className="bento-cell bento-3">
          <div className="bento-label">Developer Experience</div>
          <div className="bento-title">Designed for teams who ship fast</div>
          <div className="bento-desc">Preview deployments, branch-based environments, and instant rollbacks — all in one workflow.</div>
        </div>

        <div className="bento-cell">
          <div className="bento-icon">📊</div>
          <div className="bento-title">Analytics</div>
        </div>
      </div>
    </>
  );
}
```

---

## 6. Floating Navbar with Blur

Sticky nav with backdrop-filter and scroll-reactive shrinking.

```tsx
// floating-navbar.tsx
"use client";
import React, { useEffect, useState } from "react";

const styles = `
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 16px 24px;
    transition: padding 0.3s ease;
  }
  .nav-wrapper.scrolled { padding: 8px 24px; }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
  }
  .nav-wrapper.scrolled .nav-inner {
    border-radius: 10px;
    padding: 8px 16px;
  }

  .nav-logo {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .nav-links {
    display: flex;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links a {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 0.875rem;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-links a:hover {
    color: white;
    background: rgba(255,255,255,0.08);
  }

  .nav-cta {
    background: white;
    color: black;
    border: none;
    border-radius: 8px;
    padding: 7px 16px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .nav-cta:hover { opacity: 0.85; }
`;

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <header className={`nav-wrapper${scrolled ? " scrolled" : ""}`}>
        <nav className="nav-inner">
          <a href="#" className="nav-logo">Acme</a>
          <ul className="nav-links">
            <li><a href="#">Product</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
          <button className="nav-cta">Get Started</button>
        </nav>
      </header>
    </>
  );
}
```

---

## 7. Hero Sections

Text scramble, word swap, and typewriter with cursor.

```tsx
// hero-effects.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";

// --- Text Scramble ---
function useTextScramble(finalText: string, trigger: boolean) {
  const [display, setDisplay] = useState(finalText);
  const frame = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        finalText
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 0.5;
      if (iteration >= finalText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, finalText]);

  return display;
}

export function TextScrambleHero() {
  const [triggered, setTriggered] = useState(false);
  const text = useTextScramble("Ship faster.", triggered);

  useEffect(() => { setTriggered(true); }, []);

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "white", fontWeight: 800, letterSpacing: "-0.03em", cursor: "default", fontFamily: "monospace" }}
        onMouseEnter={() => { setTriggered(false); requestAnimationFrame(() => setTriggered(true)); }}
      >
        {text}
      </h1>
    </div>
  );
}

// --- Word Swap ---
const WORDS = ["faster.", "smarter.", "together.", "at scale."];

export function WordSwapHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "#050505", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "white", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center" }}>
        Build{" "}
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.3s ease",
          }}
        >
          {WORDS[index]}
        </span>
      </h1>
    </div>
  );
}

// --- Typewriter with cursor ---
export function TypewriterHero() {
  const phrases = ["The platform for developers.", "Deploy in seconds.", "Scale without limits."];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 55);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 28);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "white", fontWeight: 700, letterSpacing: "-0.02em", textAlign: "center" }}>
        {text}
        <span style={{ display: "inline-block", width: "3px", height: "1em", background: "#7c3aed", marginLeft: "4px", verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </h1>
    </div>
  );
}
```

---

## 8. Animated Border Gradients

Rotating border and gradient stroke on hover.

```tsx
// animated-borders.tsx
import React from "react";

const styles = `
  /* === Rotating conic border === */
  @keyframes border-spin {
    from { --border-angle: 0deg; }
    to   { --border-angle: 360deg; }
  }
  @property --border-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .rotating-border {
    position: relative;
    border-radius: 14px;
    padding: 1.5px;
    background: conic-gradient(
      from var(--border-angle),
      #7c3aed, #06b6d4, #10b981, #f59e0b, #7c3aed
    );
    animation: border-spin 3s linear infinite;
    display: inline-block;
  }
  .rotating-border-inner {
    background: #0a0a0a;
    border-radius: 13px;
    padding: 20px 32px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }

  /* === Hover gradient stroke === */
  .hover-border-card {
    position: relative;
    background: #111;
    border-radius: 14px;
    padding: 24px;
    color: white;
    width: 280px;
    cursor: default;
  }
  .hover-border-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hover-border-card:hover::before { opacity: 1; }

  /* === Shimmer border === */
  @keyframes shimmer-move {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  .shimmer-border {
    position: relative;
    border-radius: 12px;
    padding: 1.5px;
    background: linear-gradient(
      90deg,
      #1a1a2e 0%,
      #7c3aed 25%,
      #06b6d4 50%,
      #7c3aed 75%,
      #1a1a2e 100%
    );
    background-size: 200% auto;
    animation: shimmer-move 3s linear infinite;
  }
  .shimmer-border-inner {
    background: #0d0d0d;
    border-radius: 11px;
    padding: 20px 28px;
    color: white;
    font-weight: 500;
  }

  .demo-row {
    display: flex;
    gap: 32px;
    padding: 64px;
    background: #050505;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export function AnimatedBorders() {
  return (
    <>
      <style>{styles}</style>
      <div className="demo-row">
        <div className="rotating-border">
          <div className="rotating-border-inner">Rotating Border</div>
        </div>

        <div className="hover-border-card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Hover Border</div>
          <div style={{ fontSize: "0.875rem", color: "#666" }}>Gradient stroke appears on hover.</div>
        </div>

        <div className="shimmer-border">
          <div className="shimmer-border-inner">Shimmer Border</div>
        </div>
      </div>
    </>
  );
}
```

---

## 9. 3D Card Tilt Effect

Mouse-tracking perspective transform with glare layer.

```tsx
// tilt-card.tsx
"use client";
import React, { useCallback, useRef } from "react";

const styles = `
  .tilt-scene {
    perspective: 1000px;
    display: inline-block;
  }
  .tilt-card {
    position: relative;
    width: 320px;
    height: 200px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1a0533, #0f172a);
    border: 1px solid rgba(255,255,255,0.12);
    transform-style: preserve-3d;
    transition: transform 0.1s ease, box-shadow 0.3s ease;
    overflow: hidden;
    cursor: pointer;
    color: white;
    padding: 24px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .tilt-card:hover {
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
  }
  .tilt-glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at var(--gx, 50%) var(--gy, 50%),
      rgba(255,255,255,0.15) 0%,
      transparent 60%
    );
    pointer-events: none;
    transition: opacity 0.3s;
    opacity: 0;
  }
  .tilt-card:hover .tilt-glare { opacity: 1; }
  .tilt-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 8px;
    transform: translateZ(20px);
    position: relative;
  }
  .tilt-card-body {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    transform: translateZ(10px);
    position: relative;
  }
`;

export function TiltCard({ title = "3D Tilt Card", body = "Move your mouse over this card to see the effect." }: { title?: string; body?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    const glare = glareRef.current;
    if (glare) {
      glare.style.setProperty("--gx", `${(x / rect.width) * 100}%`);
      glare.style.setProperty("--gy", `${(y / rect.height) * 100}%`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="tilt-scene">
        <div
          ref={cardRef}
          className="tilt-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={glareRef} className="tilt-glare" />
          <div className="tilt-card-title">{title}</div>
          <div className="tilt-card-body">{body}</div>
        </div>
      </div>
    </>
  );
}
```

---

## 10. Loading Screens

Logo reveal, progress bar, and skeleton pulse.

```tsx
// loading-screens.tsx
"use client";
import React, { useEffect, useState } from "react";

const styles = `
  /* === Logo Reveal === */
  @keyframes logo-reveal {
    0%   { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(8px); }
    60%  { opacity: 1; transform: scale(1.05) translateY(-4px); filter: blur(0); }
    100% { transform: scale(1) translateY(0); }
  }
  @keyframes fade-out-screen {
    0%   { opacity: 1; }
    100% { opacity: 0; pointer-events: none; }
  }
  .logo-screen {
    position: fixed;
    inset: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fade-out-screen 0.5s ease 2.5s forwards;
  }
  .logo-mark {
    font-size: 3rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.04em;
    animation: logo-reveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
  }

  /* === Progress Bar === */
  @keyframes progress-fill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .progress-screen {
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    z-index: 9999;
  }
  .progress-bar-track {
    width: 240px;
    height: 2px;
    background: rgba(255,255,255,0.1);
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #7c3aed, #06b6d4);
    border-radius: 99px;
    animation: progress-fill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* === Skeleton Pulse === */
  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }
  .skeleton {
    background: linear-gradient(90deg, #1a1a1a, #2a2a2a, #1a1a1a);
    background-size: 200% 100%;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
    border-radius: 6px;
  }
  .skeleton-card {
    background: #111;
    border-radius: 12px;
    padding: 20px;
    width: 320px;
    border: 1px solid #1f1f1f;
  }
  .skeleton-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  .skeleton-line { height: 12px; margin-bottom: 8px; }
`;

export function LogoRevealScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { setTimeout(() => setVisible(false), 3100); }, []);
  if (!visible) return null;
  return (
    <>
      <style>{styles}</style>
      <div className="logo-screen">
        <div className="logo-mark">Acme</div>
      </div>
    </>
  );
}

export function ProgressScreen({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => { setTimeout(() => onComplete?.(), 2200); }, [onComplete]);
  return (
    <>
      <style>{styles}</style>
      <div className="progress-screen">
        <div style={{ color: "white", fontWeight: 700, fontSize: "1.25rem" }}>Loading</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" />
        </div>
      </div>
    </>
  );
}

export function SkeletonCard() {
  return (
    <>
      <style>{styles}</style>
      <div className="skeleton-card">
        <div className="skeleton skeleton-avatar" />
        <div className="skeleton skeleton-line" style={{ width: "60%" }} />
        <div className="skeleton skeleton-line" style={{ width: "100%" }} />
        <div className="skeleton skeleton-line" style={{ width: "80%" }} />
        <div className="skeleton skeleton-line" style={{ width: "40%", marginTop: 16 }} />
      </div>
    </>
  );
}
```

---

## 11. Scroll-Triggered Counters

Number animates from 0 to target when entering the viewport.

```tsx
// scroll-counter.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [start, target, duration]);

  return value;
}

function Counter({ target, label, suffix = "", prefix = "" }: {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const value = useCountUp(target, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <div style={{ color: "#666", fontSize: "0.9rem", marginTop: 8 }}>{label}</div>
    </div>
  );
}

export function ScrollCounters() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: "80px", flexWrap: "wrap", justifyContent: "center", padding: "48px" }}>
        <Counter target={50000} label="Active Users" suffix="+" />
        <Counter target={99} label="Uptime SLA" suffix="%" />
        <Counter target={1200} label="Deployments Daily" prefix="~" />
        <Counter target={4} label="Global Regions" suffix="0+" />
      </div>
    </div>
  );
}
```

---

## 12. Marquee / Infinite Scroll

Horizontal logo ticker and vertical testimonial scroller.

```tsx
// marquee.tsx
import React from "react";

const styles = `
  /* === Horizontal === */
  .marquee-wrapper {
    overflow: hidden;
    width: 100%;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  @keyframes marquee-x {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-x 20s linear infinite;
    gap: 0;
  }
  .marquee-track:hover { animation-play-state: paused; }
  .marquee-item {
    display: flex;
    align-items: center;
    padding: 12px 40px;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1rem;
    color: rgba(255,255,255,0.4);
    border-right: 1px solid rgba(255,255,255,0.06);
    transition: color 0.2s;
    flex-shrink: 0;
  }
  .marquee-item:hover { color: rgba(255,255,255,0.9); }

  /* === Vertical === */
  .marquee-v-wrapper {
    overflow: hidden;
    height: 400px;
    mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  @keyframes marquee-y {
    from { transform: translateY(0); }
    to   { transform: translateY(-50%); }
  }
  .marquee-v-track {
    display: flex;
    flex-direction: column;
    animation: marquee-y 18s linear infinite;
    gap: 12px;
  }
  .testimonial-card {
    background: #111;
    border: 1px solid #1f1f1f;
    border-radius: 12px;
    padding: 20px;
    width: 320px;
    color: white;
    flex-shrink: 0;
  }
  .testimonial-text { font-size: 0.875rem; color: #aaa; line-height: 1.6; margin-bottom: 12px; }
  .testimonial-author { font-size: 0.8rem; font-weight: 600; color: #666; }
`;

const LOGOS = ["Vercel", "Linear", "Stripe", "Figma", "GitHub", "Notion", "Loom", "Framer"];
const TESTIMONIALS = [
  { text: "This changed how we ship product entirely.", author: "Alex M., Eng Lead" },
  { text: "The best developer experience I've ever had.", author: "Sarah K., CTO" },
  { text: "We went from 2 weeks to 2 hours for deploys.", author: "James R., DevOps" },
  { text: "Absolutely worth every penny.", author: "Dana L., Founder" },
];

export function HorizontalMarquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <>
      <style>{styles}</style>
      <div style={{ background: "#080808", padding: "32px 0" }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {doubled.map((logo, i) => (
              <div className="marquee-item" key={i}>{logo}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function VerticalMarquee() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <>
      <style>{styles}</style>
      <div style={{ background: "#080808", padding: "32px", display: "flex", justifyContent: "center" }}>
        <div className="marquee-v-wrapper">
          <div className="marquee-v-track">
            {doubled.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-text">"{t.text}"</div>
                <div className="testimonial-author">— {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## 13. Dock Menu

macOS-style magnifying dock with spring animation.

```tsx
// dock.tsx
"use client";
import React, { useRef, useState } from "react";

const BASE_SIZE = 48;
const MAX_SIZE = 80;
const SPREAD = 2;

const styles = `
  .dock-container {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: flex-end;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 10px 12px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
    z-index: 200;
  }
  .dock-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.12);
    cursor: pointer;
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-size: 1.5rem;
    flex-shrink: 0;
    position: relative;
  }
  .dock-item:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .dock-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: white;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .dock-item:hover .dock-tooltip { opacity: 1; }
`;

const ITEMS = [
  { icon: "🏠", label: "Home" },
  { icon: "📁", label: "Files" },
  { icon: "📧", label: "Mail" },
  { icon: "🌐", label: "Browser" },
  { icon: "⚙️", label: "Settings" },
  { icon: "💬", label: "Messages" },
  { icon: "🎵", label: "Music" },
];

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSize = (index: number) => {
    if (mouseX === null || !containerRef.current) return BASE_SIZE;
    const items = containerRef.current.querySelectorAll(".dock-item");
    const item = items[index] as HTMLElement;
    if (!item) return BASE_SIZE;
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenter);
    const maxDist = (BASE_SIZE + 8) * SPREAD;
    if (dist > maxDist) return BASE_SIZE;
    const ratio = 1 - dist / maxDist;
    return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * ratio;
  };

  return (
    <>
      <style>{styles}</style>
      <div
        ref={containerRef}
        className="dock-container"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {ITEMS.map((item, i) => {
          const size = getSize(i);
          return (
            <div
              key={i}
              className="dock-item"
              style={{ width: size, height: size, fontSize: size * 0.5 }}
            >
              {item.icon}
              <div className="dock-tooltip">{item.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
```

---

## 14. Command Palette

Spotlight-style cmdk overlay with keyboard navigation.

```tsx
// command-palette.tsx
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

const styles = `
  .cmd-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20vh;
    animation: cmd-fade-in 0.15s ease;
  }
  @keyframes cmd-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .cmd-panel {
    width: 100%;
    max-width: 560px;
    background: rgba(18, 18, 18, 0.95);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.7);
    animation: cmd-slide-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin: 0 16px;
  }
  @keyframes cmd-slide-in {
    from { transform: translateY(-12px) scale(0.97); opacity: 0; }
    to   { transform: translateY(0) scale(1); opacity: 1; }
  }
  .cmd-input-row {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    gap: 12px;
  }
  .cmd-icon { color: rgba(255,255,255,0.3); font-size: 1rem; }
  .cmd-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: 1rem;
    caret-color: #7c3aed;
  }
  .cmd-input::placeholder { color: rgba(255,255,255,0.25); }
  .cmd-results { max-height: 320px; overflow-y: auto; padding: 6px; }
  .cmd-group-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.3);
    padding: 8px 10px 4px;
  }
  .cmd-result {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.1s;
    color: rgba(255,255,255,0.85);
    font-size: 0.9rem;
  }
  .cmd-result.active { background: rgba(124, 58, 237, 0.25); }
  .cmd-result-icon { font-size: 1rem; width: 20px; text-align: center; }
  .cmd-result-shortcut {
    margin-left: auto;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.06);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
  .cmd-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 0.72rem;
    color: rgba(255,255,255,0.25);
  }
  .cmd-key {
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 2px 5px;
    font-family: monospace;
    font-size: 0.72rem;
  }
`;

const COMMANDS = [
  { group: "Navigation", icon: "🏠", label: "Go to Dashboard", shortcut: "G D" },
  { group: "Navigation", icon: "⚙️", label: "Go to Settings",  shortcut: "G S" },
  { group: "Actions",    icon: "✨", label: "New Project",      shortcut: "⌘ N" },
  { group: "Actions",    icon: "📋", label: "Copy Link",        shortcut: "⌘ L" },
  { group: "Actions",    icon: "🚀", label: "Deploy",           shortcut: "⌘ D" },
  { group: "Help",       icon: "📖", label: "Documentation",    shortcut: "" },
  { group: "Help",       icon: "💬", label: "Contact Support",  shortcut: "" },
];

export function CommandPalette({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setActive(0); }, [query]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Escape")    { onClose?.(); }
    if (e.key === "Enter")     { onClose?.(); }
  }, [filtered.length, onClose]);

  const groups = [...new Set(filtered.map((c) => c.group))];

  return (
    <>
      <style>{styles}</style>
      <div className="cmd-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="cmd-panel" onKeyDown={handleKey}>
          <div className="cmd-input-row">
            <span className="cmd-icon">⌘</span>
            <input
              ref={inputRef}
              className="cmd-input"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="cmd-results">
            {groups.map((group) => (
              <div key={group}>
                <div className="cmd-group-label">{group}</div>
                {filtered
                  .filter((c) => c.group === group)
                  .map((c) => {
                    const globalIndex = filtered.indexOf(c);
                    return (
                      <div
                        key={c.label}
                        className={`cmd-result${globalIndex === active ? " active" : ""}`}
                        onMouseEnter={() => setActive(globalIndex)}
                        onClick={onClose}
                      >
                        <span className="cmd-result-icon">{c.icon}</span>
                        {c.label}
                        {c.shortcut && <span className="cmd-result-shortcut">{c.shortcut}</span>}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
          <div className="cmd-footer">
            <span><span className="cmd-key">↑↓</span> navigate</span>
            <span><span className="cmd-key">↵</span> select</span>
            <span><span className="cmd-key">esc</span> close</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Usage trigger hook
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}
```

---

## 15. Toast Notifications

Stacked toasts with swipe-to-dismiss and auto-expire.

```tsx
// toast.tsx
"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const styles = `
  .toast-viewport {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    align-items: flex-end;
    pointer-events: none;
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateX(120%) scale(0.9); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes toast-out {
    from { opacity: 1; transform: translateX(0) scale(1); max-height: 120px; margin-bottom: 0; }
    to   { opacity: 0; transform: translateX(120%) scale(0.9); max-height: 0; margin-bottom: -8px; }
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    min-width: 280px;
    max-width: 380px;
    pointer-events: all;
    cursor: grab;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    user-select: none;
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
  }
  .toast.exiting { animation: toast-out 0.3s ease forwards; }
  .toast:active  { cursor: grabbing; }

  .toast-default { background: #1a1a1a; color: white; }
  .toast-success { background: #052e16; border-color: #166534; color: #bbf7d0; }
  .toast-error   { background: #2d0a0a; border-color: #991b1b; color: #fca5a5; }
  .toast-warning { background: #2d1a00; border-color: #92400e; color: #fde68a; }

  .toast-icon    { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
  .toast-content { flex: 1; }
  .toast-title   { font-weight: 600; font-size: 0.9rem; line-height: 1.3; }
  .toast-message { font-size: 0.8rem; opacity: 0.7; margin-top: 2px; line-height: 1.4; }
  .toast-close {
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .toast-close:hover { color: rgba(255,255,255,0.8); }

  .toast-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    background: rgba(255,255,255,0.2);
    border-radius: 0 0 12px 12px;
    transform-origin: left;
  }
`;

type ToastType = "default" | "success" | "error" | "warning";

interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration: number;
}

const ICONS: Record<ToastType, string> = {
  default: "💬",
  success: "✓",
  error: "✕",
  warning: "⚠",
};

interface ToastContextValue {
  toast: (title: string, opts?: { message?: string; type?: ToastType; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastItem & { exiting?: boolean })[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 320);
  }, []);

  const toast = useCallback((title: string, opts: { message?: string; type?: ToastType; duration?: number } = {}) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = {
      id,
      title,
      message: opts.message,
      type: opts.type ?? "default",
      duration: opts.duration ?? 4000,
    };
    setToasts((prev) => [...prev, item]);
    setTimeout(() => dismiss(id), item.duration);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      <style>{styles}</style>
      {children}
      <div className="toast-viewport">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  title, message, type, duration, exiting, onDismiss,
}: ToastItem & { exiting?: boolean; onDismiss: () => void }) {
  const startX = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current;
    if (dx > 0 && ref.current) ref.current.style.transform = `translateX(${dx}px)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current;
    if (dx > 80) { onDismiss(); return; }
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={`toast toast-${type}${exiting ? " exiting" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ transition: "transform 0.1s" }}
    >
      <span className="toast-icon">{ICONS[type]}</span>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        {message && <div className="toast-message">{message}</div>}
      </div>
      <button className="toast-close" onClick={onDismiss}>✕</button>
      <div
        className="toast-progress"
        style={{
          animation: `toast-progress-shrink ${duration}ms linear forwards`,
          width: "100%",
        }}
      />
      <style>{`@keyframes toast-progress-shrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }`}</style>
    </div>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

// Demo
export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ padding: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button onClick={() => toast("Saved successfully", { type: "success", message: "Your changes have been committed." })}>Success</button>
      <button onClick={() => toast("Something went wrong", { type: "error", message: "Please try again later." })}>Error</button>
      <button onClick={() => toast("Heads up", { type: "warning", message: "Your trial expires in 3 days." })}>Warning</button>
      <button onClick={() => toast("New message from Alex", { type: "default" })}>Default</button>
    </div>
  );
}
```
