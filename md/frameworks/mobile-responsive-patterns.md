# Mobile & Responsive Design Patterns

---

## Tailwind Responsive Breakpoint Strategy (Mobile-First)

```
Breakpoint  Prefix   Min-width   Target
─────────────────────────────────────────
Default     (none)   0px         Mobile phones (base)
sm          sm:      640px       Large phones / small tablets
md          md:      768px       Tablets
lg          lg:      1024px      Small laptops / landscape tablets
xl          xl:      1280px      Desktops
2xl         2xl:     1536px      Large desktops
```

```tsx
// Mobile-first layout example
function AppLayout() {
  return (
    // Single column → two column → three column
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 lg:p-8">

      {/* Hide on mobile, show on desktop */}
      <aside className="hidden lg:block">Sidebar</aside>

      {/* Full width mobile, constrained desktop */}
      <main className="col-span-1 md:col-span-2 lg:col-span-2">Main</main>

      {/* Text scaling */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Heading</h1>

      {/* Stack on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded">
          Primary
        </button>
        <button className="w-full sm:w-auto px-4 py-2 border rounded">
          Secondary
        </button>
      </div>
    </div>
  );
}

// Custom breakpoints in tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  theme: {
    screens: {
      xs: '375px',    // small phones
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      // Max-width variants
      'max-sm': { max: '639px' },
      'max-md': { max: '767px' },
    },
  },
} satisfies Config;
```

---

## Touch Gesture Components with Framer Motion

### Swipe to Dismiss

```tsx
// components/SwipeToDismiss.tsx
'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SwipeToDismissProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  threshold?: number;
}

export function SwipeToDismiss({
  children,
  onDismiss,
  threshold = 100,
}: SwipeToDismissProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-threshold * 2, 0, threshold * 2], [0, 1, 0]);
  const background = useTransform(
    x,
    [-threshold, 0, threshold],
    ['#ef4444', '#ffffff', '#22c55e']
  );

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) >= threshold) {
      setIsDismissed(true);
      onDismiss?.();
    }
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          style={{ x, opacity, backgroundColor: background }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
          className="relative touch-pan-y cursor-grab active:cursor-grabbing rounded-lg overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Pull to Refresh

```tsx
// components/PullToRefresh.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

export function PullToRefresh({ onRefresh, children, threshold = 80 }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const indicatorOpacity = useTransform(y, [0, threshold], [0, 1]);
  const indicatorScale = useTransform(y, [0, threshold], [0.5, 1]);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || isRefreshing) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      e.preventDefault();
      y.set(Math.min(delta * 0.5, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    isDragging.current = false;
    if (y.get() >= threshold) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    y.set(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden"
    >
      {/* Pull indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity, scale: indicatorScale, y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10
                   flex items-center justify-center w-10 h-10"
      >
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : {}}
          className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </motion.div>

      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
```

---

## Bottom Sheet Component

```tsx
// components/BottomSheet.tsx
'use client';

import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type SnapPoint = 'closed' | 'half' | 'full';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  snapPoints?: SnapPoint[];
  children: React.ReactNode;
}

const snapHeights: Record<SnapPoint, string> = {
  closed: '0vh',
  half: '50vh',
  full: '92vh',
};

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.3 }}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 500 || info.offset.y > 200) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 z-50
                       bg-white rounded-t-2xl shadow-2xl
                       flex flex-col max-h-[92vh]
                       focus:outline-none"
            tabIndex={-1}
          >
            {/* Drag handle */}
            <div
              onPointerDown={e => dragControls.start(e)}
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
              aria-hidden="true"
            >
              <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {title && (
              <div className="px-6 pb-3 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              </div>
            )}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

---

## Mobile Navigation Patterns

### Bottom Tab Bar

```tsx
// components/BottomTabBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Tab {
  href: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

interface BottomTabBarProps {
  tabs: Tab[];
}

export function BottomTabBar({ tabs }: BottomTabBarProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed bottom-0 left-0 right-0 z-30
        bg-white border-t border-gray-200
        pb-safe             /* respect home bar */
        md:hidden           /* desktop uses sidebar instead */
      "
    >
      <ul className="flex items-stretch">
        {tabs.map(tab => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  flex flex-col items-center justify-center gap-1
                  min-h-[56px] px-2 py-2 text-xs font-medium
                  transition-colors
                  ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}
                `}
              >
                {tab.icon(isActive)}
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

### Hamburger → Full-Screen Menu

```tsx
// components/MobileMenu.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface NavItem { href: string; label: string }

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useFocusTrap(isOpen);

  // Close on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <motion.svg
          animate={isOpen ? 'open' : 'closed'}
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          {/* Top line */}
          <motion.line
            x1="3" y1="6" x2="21" y2="6"
            variants={{ open: { y1: 12, y2: 12, rotate: 45 }, closed: { y1: 6, y2: 6, rotate: 0 } }}
          />
          {/* Middle line */}
          <motion.line
            x1="3" y1="12" x2="21" y2="12"
            variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
          />
          {/* Bottom line */}
          <motion.line
            x1="3" y1="18" x2="21" y2="18"
            variants={{ open: { y1: 12, y2: 12, rotate: -45 }, closed: { y1: 18, y2: 18, rotate: 0 } }}
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="
              fixed inset-0 z-50 bg-white
              flex flex-col p-6 pt-20
              md:hidden
            "
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={`
                        block px-4 py-3 text-xl font-medium rounded-lg
                        transition-colors
                        ${pathname === item.href
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-800 hover:bg-gray-100'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Touch-Friendly Tap Targets

```tsx
// Minimum 44x44px tap targets (WCAG 2.5.5)

// Bad — too small
<button className="p-1 text-sm">X</button>

// Good — padding expands touch area visually and physically
<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center">
  <XIcon className="w-4 h-4" aria-hidden="true" />
</button>

// Good — invisible tap area expansion trick
<button className="relative p-1 before:absolute before:inset-[-10px] before:content-['']">
  <XIcon className="w-4 h-4" />
</button>

// tailwind.config.ts — add tap-target utilities
// plugin: ({ addUtilities }) => addUtilities({
//   '.tap-target': {
//     minWidth: '44px',
//     minHeight: '44px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })

// Spacing between adjacent tap targets — minimum 8px
<div className="flex gap-2">
  <button className="min-w-[44px] min-h-[44px]">A</button>
  <button className="min-w-[44px] min-h-[44px]">B</button>
</div>
```

---

## Viewport Units for Mobile Browsers

```tsx
// The problem: 100vh includes browser chrome on mobile, causing overflow

// Solution: use svh (small viewport height — excludes chrome)
//           dvh (dynamic viewport height — updates as chrome shows/hides)
//           lvh (large viewport height — assumes chrome hidden)

// tailwind.config.ts — extend with mobile viewport utilities
import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      height: {
        'screen-svh': '100svh',
        'screen-dvh': '100dvh',
        'screen-lvh': '100lvh',
      },
      minHeight: {
        'screen-svh': '100svh',
        'screen-dvh': '100dvh',
      },
      maxHeight: {
        'screen-svh': '100svh',
        'screen-dvh': '100dvh',
      },
    },
  },
} satisfies Config;

// Usage
function FullScreenSection() {
  return (
    // Fallback → svh (modern mobile) → dvh (updates dynamically)
    <section className="
      h-screen
      h-[100svh]
      min-h-[100svh]
    ">
      Full height on mobile without address bar overlap
    </section>
  );
}

// For sticky footers that stay above keyboard
function PageWithStickyFooter() {
  return (
    <div className="flex flex-col h-[100dvh]">
      <main className="flex-1 overflow-y-auto">Content</main>
      <footer className="flex-shrink-0">Sticky footer</footer>
    </div>
  );
}
```

---

## Safe Area Insets (iPhone Notch / Home Bar)

```tsx
// tailwind.config.ts — enable safe area support
export default {
  plugins: [
    // Using tailwindcss-safe-area plugin:
    // npm install tailwindcss-safe-area
    require('tailwindcss-safe-area'),
  ],
} satisfies Config;

// Or define manually with CSS variables
// globals.css
// :root {
//   --sat: env(safe-area-inset-top);
//   --sar: env(safe-area-inset-right);
//   --sab: env(safe-area-inset-bottom);
//   --sal: env(safe-area-inset-left);
// }

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* viewport meta is essential */}
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="
        pt-safe     /* top: env(safe-area-inset-top)    */
        pb-safe     /* bottom: env(safe-area-inset-bottom) */
        pl-safe     /* left: env(safe-area-inset-left)  */
        pr-safe     /* right: env(safe-area-inset-right) */
      ">
        {children}
      </body>
    </html>
  );
}

// Header with notch awareness
function Header() {
  return (
    <header className="
      fixed top-0 left-0 right-0 z-30
      bg-white border-b
      pt-safe pl-safe pr-safe
      h-[calc(56px+env(safe-area-inset-top))]
    ">
      <div className="h-14 flex items-center px-4">
        <span className="font-semibold">App Name</span>
      </div>
    </header>
  );
}

// Bottom nav with home bar clearance
function BottomNav() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white border-t
      pb-safe pl-safe pr-safe
    ">
      {/* nav items */}
    </nav>
  );
}
```

---

## Pinch-to-Zoom Image Viewer

```tsx
// components/PinchZoomImage.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface PinchZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function PinchZoomImage({ src, alt, width, height }: PinchZoomImageProps) {
  const [scale, setScale] = useState(1);
  const lastScale = useRef(1);
  const lastDistance = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastDistance.current = getDistance(e.touches);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();

    const distance = getDistance(e.touches);
    const delta = distance / lastDistance.current;
    const newScale = Math.min(Math.max(lastScale.current * delta, 1), 4);
    setScale(newScale);
  };

  const handleTouchEnd = () => {
    lastScale.current = scale;
    if (scale <= 1) {
      x.set(0);
      y.set(0);
    }
  };

  const handleDoubleTap = (() => {
    let lastTap = 0;
    return () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        if (scale > 1) {
          setScale(1);
          lastScale.current = 1;
          x.set(0);
          y.set(0);
        } else {
          setScale(2.5);
          lastScale.current = 2.5;
        }
      }
      lastTap = now;
    };
  })();

  return (
    <div
      className="overflow-hidden touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleDoubleTap}
    >
      <motion.div
        drag={scale > 1}
        dragMomentum={false}
        style={{ x, y, scale }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          className="w-full h-auto pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
```

---

## Swipeable Card Stack (Tinder-Style)

```tsx
// components/SwipeableCardStack.tsx
'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Card {
  id: string;
  content: React.ReactNode;
}

interface SwipeableCardStackProps {
  cards: Card[];
  onSwipeLeft?: (id: string) => void;
  onSwipeRight?: (id: string) => void;
  threshold?: number;
}

export function SwipeableCardStack({
  cards: initialCards,
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
}: SwipeableCardStackProps) {
  const [cards, setCards] = useState(initialCards);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);

  const removeTop = (dir: 'left' | 'right') => {
    const [top, ...rest] = cards;
    setExitDir(dir);
    if (dir === 'left') onSwipeLeft?.(top.id);
    else onSwipeRight?.(top.id);
    setCards(rest);
  };

  return (
    <div className="relative h-96 w-72 mx-auto">
      <AnimatePresence>
        {cards.slice(0, 3).map((card, i) => (
          <Card
            key={card.id}
            card={card}
            isTop={i === 0}
            depth={i}
            threshold={threshold}
            onSwipe={removeTop}
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          No more cards
        </div>
      )}
    </div>
  );
}

function Card({
  card,
  isTop,
  depth,
  threshold,
  onSwipe,
}: {
  card: { id: string; content: React.ReactNode };
  isTop: boolean;
  depth: number;
  threshold: number;
  onSwipe: (dir: 'left' | 'right') => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const leftOpacity = useTransform(x, [-threshold / 2, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, threshold / 2], [0, 1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x > threshold || info.velocity.x > 500) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -500) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - depth * 0.05,
        y: depth * 10,
        zIndex: 10 - depth,
      }}
      drag={isTop ? 'x' : false}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      exit={{ x: 400, opacity: 0, transition: { duration: 0.2 } }}
      className="
        absolute inset-0 bg-white rounded-2xl shadow-xl
        cursor-grab active:cursor-grabbing
        flex items-center justify-center p-6
      "
    >
      {isTop && (
        <>
          <motion.span
            style={{ opacity: leftOpacity }}
            className="absolute top-8 right-8 text-red-500 font-bold text-2xl border-2 border-red-500 px-2 py-1 rounded rotate-12"
          >
            NOPE
          </motion.span>
          <motion.span
            style={{ opacity: rightOpacity }}
            className="absolute top-8 left-8 text-green-500 font-bold text-2xl border-2 border-green-500 px-2 py-1 rounded -rotate-12"
          >
            LIKE
          </motion.span>
        </>
      )}
      {card.content}
    </motion.div>
  );
}
```

---

## Mobile-Optimized Forms

```tsx
// components/MobileForm.tsx
export function MobileForm() {
  return (
    <form className="space-y-4 p-4">

      {/* Correct input types trigger native mobile keyboards */}
      <input
        type="email"          // email keyboard
        autoComplete="email"
        inputMode="email"
        className="w-full border rounded-lg px-4 py-3 text-base" // text-base prevents iOS zoom
      />

      <input
        type="tel"            // phone pad
        autoComplete="tel"
        inputMode="tel"
        className="w-full border rounded-lg px-4 py-3 text-base"
      />

      <input
        type="number"
        inputMode="numeric"   // numeric pad, no e/+/-
        pattern="[0-9]*"
        className="w-full border rounded-lg px-4 py-3 text-base"
      />

      <input
        type="search"
        autoComplete="off"
        enterKeyHint="search" // "Search" on return key
        className="w-full border rounded-lg px-4 py-3 text-base"
      />

      {/* URL input */}
      <input
        type="url"
        autoComplete="url"
        inputMode="url"
        className="w-full border rounded-lg px-4 py-3 text-base"
      />

      {/* Name field with correct autocomplete tokens */}
      <input
        type="text"
        autoComplete="given-name"
        autoCapitalize="words"
        className="w-full border rounded-lg px-4 py-3 text-base"
      />

      {/* One-time password */}
      <input
        type="text"
        autoComplete="one-time-code"
        inputMode="numeric"
        pattern="[0-9]{6}"
        maxLength={6}
        className="w-full border rounded-lg px-4 py-3 text-base text-center tracking-widest"
      />

      {/* Prevent keyboard from covering submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg
                   min-h-[48px]  /* comfortable tap target */
                   active:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

// Keyboard avoidance: wrap content in a scrollable container
// so the visible area scrolls when keyboard opens
function KeyboardAwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
```

---

## PWA Manifest + Service Worker in Next.js

```bash
npm install next-pwa
```

```ts
// next.config.ts
import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'google-fonts-stylesheets' },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /\/api\//,
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', networkTimeoutSeconds: 10 },
    },
  ],
})({
  // your existing next config
});

export default config;
```

```json
// public/manifest.json
{
  "name": "My App",
  "short_name": "MyApp",
  "description": "A fast, installable web app",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "categories": ["productivity", "utilities"],
  "icons": [
    { "src": "/icons/icon-72x72.png",   "sizes": "72x72",   "type": "image/png" },
    { "src": "/icons/icon-96x96.png",   "sizes": "96x96",   "type": "image/png" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Desktop view"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile view"
    }
  ]
}
```

```tsx
// app/layout.tsx — link manifest
export const metadata = {
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My App',
  },
  formatDetection: { telephone: false },
  themeColor: '#2563eb',
};
```

---

## App Install Prompt Component

```tsx
// hooks/usePWAInstall.ts
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWAInstall() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
    };

    const installedHandler = () => setIsInstalled(true);

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) return;
    setIsInstalling(true);
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    setIsInstalling(false);
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setPromptEvent(null);
    }
  };

  return {
    canInstall: !!promptEvent && !isInstalled,
    isInstalled,
    isInstalling,
    install,
  };
}

// components/InstallPrompt.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function InstallPrompt() {
  const { canInstall, isInstalling, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <AnimatePresence>
      {canInstall && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          role="banner"
          aria-label="Install app"
          className="
            fixed bottom-4 left-4 right-4 z-50
            bg-white rounded-2xl shadow-2xl border border-gray-100
            p-4 flex items-center gap-3
            sm:left-auto sm:right-6 sm:w-80
          "
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Install My App</p>
            <p className="text-xs text-gray-500 mt-0.5">Add to home screen for the best experience</p>
          </div>

          <div className="flex flex-col gap-1 flex-shrink-0">
            <button
              onClick={install}
              disabled={isInstalling}
              aria-busy={isInstalling}
              className="
                px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg
                hover:bg-blue-700 transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              "
            >
              {isInstalling ? 'Installing…' : 'Install'}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss install prompt"
              className="
                px-3 py-1.5 text-gray-500 text-xs rounded-lg
                hover:bg-gray-100 transition-colors
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
              "
            >
              Not now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```
