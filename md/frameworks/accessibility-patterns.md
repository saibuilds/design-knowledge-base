# Accessibility (a11y) — Complete Patterns

---

## ARIA Roles, Labels, and Live Regions — Cheatsheet

```tsx
// Landmark roles
<header role="banner" />
<nav role="navigation" aria-label="Main navigation" />
<main role="main" />
<aside role="complementary" aria-label="Related links" />
<footer role="contentinfo" />

// Widget roles
<div role="button" tabIndex={0} aria-pressed={isActive} />
<div role="checkbox" aria-checked={checked} tabIndex={0} />
<ul role="listbox" aria-label="Options">
  <li role="option" aria-selected={isSelected}>Item</li>
</ul>
<div role="tablist">
  <button role="tab" aria-selected={true} aria-controls="panel-1" id="tab-1" />
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" />

// Live regions
<div aria-live="polite" aria-atomic="true">{statusMessage}</div>
<div aria-live="assertive">{errorMessage}</div> {/* urgent only */}
<div role="status">{toastMessage}</div>        {/* polite shorthand */}
<div role="alert">{criticalError}</div>         {/* assertive shorthand */}
<div aria-live="polite" aria-relevant="additions text">{feed}</div>

// Labels
<button aria-label="Close dialog" aria-describedby="close-hint">X</button>
<input aria-labelledby="label-id hint-id" />
<div id="hint-id">Press Escape to close</div>

// States
<button aria-expanded={isOpen} aria-controls="menu-id">Menu</button>
<div id="menu-id" hidden={!isOpen} />
<input aria-invalid={hasError} aria-errormessage="err-id" />
<span id="err-id" role="alert">{errorText}</span>
<button aria-busy={isLoading} aria-disabled={isDisabled} />
```

---

## Focus Management

### Skip-to-Content Link

```tsx
// components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-4 focus:py-2 focus:bg-white focus:text-black
        focus:rounded focus:shadow-lg focus:outline-none
        focus:ring-2 focus:ring-blue-500
      "
    >
      Skip to main content
    </a>
  );
}

// layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
```

### Focus Trap Hook

```tsx
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}
```

---

## Keyboard Navigation — Roving Tabindex

```tsx
// components/RadioGroup.tsx
'use client';

import { useRef, useState, KeyboardEvent } from 'react';

interface Option { value: string; label: string }

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function RadioGroup({ options, value, onChange, label }: RadioGroupProps) {
  const [focusedIndex, setFocusedIndex] = useState(
    () => options.findIndex(o => o.value === value) ?? 0
  );
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    let next = index;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      next = (index + 1) % options.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      next = (index - 1 + options.length) % options.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = options.length - 1;
    } else {
      return;
    }

    setFocusedIndex(next);
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={label} className="space-y-2">
      {options.map((option, i) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            ref={el => { refs.current[i] = el; }}
            role="radio"
            aria-checked={isSelected}
            tabIndex={focusedIndex === i ? 0 : -1}
            onClick={() => { onChange(option.value); setFocusedIndex(i); }}
            onKeyDown={e => handleKeyDown(e, i)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isSelected ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-700'}
            `}
          >
            <span
              className={`
                w-4 h-4 rounded-full border-2
                ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}
              `}
              aria-hidden="true"
            />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
```

---

## Screen Reader Announcements — useAnnounce Hook

```tsx
// hooks/useAnnounce.ts
import { useCallback, useEffect, useRef } from 'react';

type Politeness = 'polite' | 'assertive';

export function useAnnounce() {
  const politeRef = useRef<HTMLDivElement | null>(null);
  const assertiveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const create = (politeness: Politeness) => {
      const el = document.createElement('div');
      el.setAttribute('aria-live', politeness);
      el.setAttribute('aria-atomic', 'true');
      el.setAttribute('aria-relevant', 'additions text');
      Object.assign(el.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: '0',
      });
      document.body.appendChild(el);
      return el;
    };

    politeRef.current = create('polite');
    assertiveRef.current = create('assertive');

    return () => {
      politeRef.current?.remove();
      assertiveRef.current?.remove();
    };
  }, []);

  const announce = useCallback((message: string, politeness: Politeness = 'polite') => {
    const el = politeness === 'assertive' ? assertiveRef.current : politeRef.current;
    if (!el) return;
    // Clear then set to ensure re-announcement of same message
    el.textContent = '';
    requestAnimationFrame(() => {
      el.textContent = message;
    });
  }, []);

  return announce;
}

// Usage
function SearchResults({ count }: { count: number }) {
  const announce = useAnnounce();

  useEffect(() => {
    announce(`${count} results found`);
  }, [count, announce]);

  return <div>{/* results */}</div>;
}
```

---

## Color Contrast Requirements

```
WCAG AA  — Normal text:  4.5:1   |  Large text (18pt/14pt bold): 3:1
WCAG AAA — Normal text:  7:1     |  Large text: 4.5:1
UI components / graphical objects: 3:1 against adjacent color (AA)

"Large text" = 18px regular OR 14px bold (approximately)
```

```tsx
// tailwind.config.ts — compliant color pairings
// White (#fff) background:
//   text-gray-700  (#374151) → 8.6:1  ✓ AAA
//   text-gray-600  (#4B5563) → 5.9:1  ✓ AA
//   text-gray-500  (#6B7280) → 4.6:1  ✓ AA
//   text-gray-400  (#9CA3AF) → 2.9:1  ✗ Fail
//   text-blue-700  (#1D4ED8) → 7.2:1  ✓ AAA
//   text-red-700   (#B91C1C) → 5.9:1  ✓ AA

// Utility: check contrast in code
function getContrastRatio(hex1: string, hex2: string): number {
  const lum = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const lin = (c: number) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const l1 = lum(hex1);
  const l2 = lum(hex2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}
```

---

## Accessible Form Patterns

```tsx
// components/AccessibleField.tsx
import { useId } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    'aria-required': boolean;
    'aria-invalid': boolean;
    'aria-describedby': string;
  }) => React.ReactNode;
}

export function Field({ label, error, hint, required = false, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>

      {hint && (
        <p id={hintId} className="text-xs text-gray-500">{hint}</p>
      )}

      {children({
        id,
        'aria-required': required,
        'aria-invalid': !!error,
        'aria-describedby': describedBy,
      })}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 flex items-center gap-1">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

// Usage
function SignUpForm() {
  return (
    <Field label="Email" required hint="We'll never share your email." error="Please enter a valid email.">
      {(fieldProps) => (
        <input
          type="email"
          autoComplete="email"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          {...fieldProps}
        />
      )}
    </Field>
  );
}
```

---

## Accessible Modal / Dialog

```tsx
// components/Modal.tsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-desc' : undefined}
        className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md p-6 focus:outline-none"
        onClick={e => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        {description && (
          <p id="modal-desc" className="mt-1 text-sm text-gray-600">{description}</p>
        )}

        <div className="mt-4">{children}</div>

        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1 rounded text-gray-400 hover:text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}
```

---

## Accessible Dropdown / Combobox

```tsx
// components/Combobox.tsx
'use client';

import { useState, useRef, useId, KeyboardEvent } from 'react';

interface ComboboxOption { value: string; label: string }

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

export function Combobox({ options, value, onChange, label, placeholder }: ComboboxProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const select = (option: ComboboxOption) => {
    onChange(option.value);
    setQuery(option.label);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      select(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const activeOptionId = activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
        value={query}
        placeholder={placeholder}
        onChange={e => { setQuery(e.target.value); setIsOpen(true); setActiveIndex(-1); }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        onKeyDown={handleKeyDown}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && filtered.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((option, i) => (
            <li
              key={option.value}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={option.value === value}
              onMouseDown={() => select(option)}
              className={`
                px-3 py-2 cursor-pointer text-sm
                ${i === activeIndex ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
                ${option.value === value ? 'font-medium' : ''}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Accessible Data Table (Sortable, with Caption)

```tsx
// components/DataTable.tsx
'use client';

import { useState } from 'react';

type SortDir = 'asc' | 'desc' | null;

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface DataTableProps<T extends Record<string, unknown>> {
  caption: string;
  columns: Column<T>[];
  data: T[];
}

export function DataTable<T extends Record<string, unknown>>({
  caption,
  columns,
  data,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="text-left font-semibold text-gray-900 mb-2">
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                scope="col"
                aria-sort={
                  sortKey === col.key
                    ? sortDir === 'asc' ? 'ascending' : 'descending'
                    : col.sortable ? 'none' : undefined
                }
                className="border-b-2 border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1 hover:text-blue-600 focus:outline-none
                               focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    {col.label}
                    <span aria-hidden="true">
                      {sortKey === col.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                    </span>
                  </button>
                ) : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="even:bg-gray-50 hover:bg-gray-100">
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-2 border-b border-gray-200">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Reduced Motion

### Tailwind

```tsx
// Tailwind classes with motion-safe / motion-reduce modifiers
<div className="
  transition-transform duration-300
  motion-reduce:transition-none motion-reduce:transform-none
">
  Animated content
</div>

// For hover animations
<button className="
  hover:scale-105 transition-transform
  motion-reduce:hover:scale-100 motion-reduce:transition-none
">
  Hover me
</button>
```

### Framer Motion

```tsx
// hooks/useMotionPreference.ts
import { useReducedMotion } from 'framer-motion';

export function useSafeAnimation() {
  const shouldReduce = useReducedMotion();

  const fadeIn = shouldReduce
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
      };

  const slide = shouldReduce
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
      };

  return { fadeIn, slide };
}

// Usage
import { motion } from 'framer-motion';
import { useSafeAnimation } from '@/hooks/useMotionPreference';

function AnimatedCard() {
  const { fadeIn } = useSafeAnimation();
  return (
    <motion.div {...fadeIn} className="p-4 bg-white rounded shadow">
      Content
    </motion.div>
  );
}
```

---

## Accessible Icon Buttons

```tsx
// components/IconButton.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;           // Always required — becomes aria-label
  tooltip?: boolean;       // Show visible tooltip on hover
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, tooltip = true, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        title={tooltip ? label : undefined}
        className={`
          relative inline-flex items-center justify-center
          w-10 h-10 rounded-full
          text-gray-600 hover:text-gray-900 hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          group
          ${className ?? ''}
        `}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
        {tooltip && (
          <span
            role="tooltip"
            className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap
              opacity-0 pointer-events-none
              group-hover:opacity-100 group-focus:opacity-100
              transition-opacity motion-reduce:transition-none
            "
          >
            {label}
          </span>
        )}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
```

---

## Testing a11y with axe-core in Jest / Vitest

```bash
npm install --save-dev @axe-core/react jest-axe @testing-library/jest-dom
```

```tsx
// vitest.setup.ts
import { configureAxe } from 'jest-axe';
import { expect } from 'vitest';

configureAxe({
  rules: {
    // Example: relax region rule for unit tests
    region: { enabled: false },
  },
});

// Add custom matcher
expect.extend({
  async toHaveNoViolations(results) {
    const violations = results.violations ?? [];
    if (violations.length === 0) return { pass: true, message: () => '' };

    const formatted = violations.map(v =>
      `${v.id}: ${v.description}\n  ${v.nodes.map(n => n.html).join('\n  ')}`
    ).join('\n\n');

    return {
      pass: false,
      message: () => `Found ${violations.length} accessibility violation(s):\n\n${formatted}`,
    };
  },
});

// __tests__/Modal.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Modal } from '@/components/Modal';

describe('Modal accessibility', () => {
  it('has no axe violations when open', async () => {
    const { container } = render(
      <Modal isOpen title="Test Modal" onClose={() => {}}>
        <p>Dialog content</p>
      </Modal>
    );
    const results = await axe(container);
    await expect(results).toHaveNoViolations();
  });

  it('has no axe violations when closed', async () => {
    const { container } = render(
      <Modal isOpen={false} title="Test Modal" onClose={() => {}}>
        <p>Dialog content</p>
      </Modal>
    );
    const results = await axe(container);
    await expect(results).toHaveNoViolations();
  });
});

// __tests__/Form.a11y.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Field } from '@/components/AccessibleField';

describe('Field accessibility', () => {
  it('associates error message with input', async () => {
    render(
      <Field label="Email" required error="Invalid email">
        {(props) => <input type="email" {...props} />}
      </Field>
    );
    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription(/invalid email/i);
  });

  it('passes axe audit', async () => {
    const { container } = render(
      <Field label="Email" required error="Invalid email">
        {(props) => <input type="email" {...props} />}
      </Field>
    );
    const results = await axe(container);
    await expect(results).toHaveNoViolations();
  });
});
```
