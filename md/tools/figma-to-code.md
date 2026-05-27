# Figma to Code

## Figma → Code Workflow

The core loop:
1. Design in Figma with variables/tokens defined
2. Export design tokens (colors, spacing, type)
3. Convert tokens to Tailwind / CSS custom properties
4. Use Dev Mode to inspect individual components
5. Build components in code matching Figma structure
6. Use plugins (Builder.io / Anima) for acceleration
7. Iterate: update Figma → re-export tokens → update code

---

## Export CSS Variables from Figma

### Manual export via Figma Variables
In Figma: right panel → Variables → Export JSON

```json
// figma-variables-export.json (example shape)
{
  "color/primary/500": { "value": "#7C3AED", "type": "color" },
  "color/primary/400": { "value": "#8B5CF6", "type": "color" },
  "color/gray/900": { "value": "#111827", "type": "color" },
  "spacing/sm": { "value": "8", "type": "number" },
  "spacing/md": { "value": "16", "type": "number" },
  "spacing/lg": { "value": "24", "type": "number" },
  "font/size/base": { "value": "16", "type": "number" },
  "font/size/lg": { "value": "20", "type": "number" },
  "radius/md": { "value": "8", "type": "number" }
}
```

### Convert to CSS custom properties
```css
/* globals.css — generated from Figma tokens */
:root {
  /* Colors */
  --color-primary-500: #7c3aed;
  --color-primary-400: #8b5cf6;
  --color-gray-900: #111827;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Typography */
  --font-size-base: 16px;
  --font-size-lg: 20px;

  /* Border radius */
  --radius-md: 8px;
}
```

---

## Figma Tokens → Tailwind Config

### Using Style Dictionary or manual mapping

```js
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Map Figma color tokens
        primary: {
          400: "#8B5CF6",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
        brand: {
          bg: "#0F0A1E",
          surface: "#1A1030",
          border: "#2D1F5E",
        },
      },
      spacing: {
        // Map Figma spacing tokens
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Figma type scale → Tailwind
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0" }],
        "heading-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
        "heading-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.03em" }],
        "heading-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.04em" }],
        "display-sm": ["48px", { lineHeight: "56px", letterSpacing: "-0.05em" }],
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.05em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        // Match Figma drop shadows
        card: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        elevated: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        modal: "0 25px 50px -12px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Style Dictionary (automated token pipeline)
```bash
npm install -D style-dictionary
```

```js
// sd.config.js
module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
    js: {
      transformGroup: "js",
      buildPath: "src/",
      files: [{ destination: "tokens.js", format: "javascript/es6" }],
    },
  },
};
```

```bash
npx style-dictionary build
```

---

## Figma Dev Mode

Activate: bottom bar → switch to Dev Mode (or `Shift + D`)

### Key panels in Dev Mode
- **Inspect panel** (right): exact CSS values, spacing, colors, fonts
- **Code panel**: auto-generated CSS/Swift/Android XML
- **Annotations**: designer notes for developers
- **Compare**: compare design vs staging URL

### Reading spacing in Dev Mode
Click element → inspect panel shows:
```
Width: 320px   Height: 48px
Padding: 12px 16px
Gap: 8px
Border radius: 8px
Fill: #7C3AED (primary-500)
```

### CSS output from Dev Mode (example)
```css
/* Figma auto-generates something like: */
.button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #7C3AED;
  border-radius: 8px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #FFFFFF;
}
```

Translate to Tailwind:
```tsx
<button className="flex items-center gap-2 px-4 py-3 bg-primary-500 rounded-lg text-sm font-medium leading-5 text-white">
  Click me
</button>
```

---

## Builder.io Figma Plugin

Auto-generates React/HTML/Vue from Figma designs.

### Install
Figma → Plugins → search "Builder.io" → install

### Usage
1. Select frame/component in Figma
2. Open Builder.io plugin
3. Choose output: React / HTML / Vue / Angular
4. Copy generated code

### Generated React output (example)
```tsx
// Builder.io output for a card component
export function ProductCard({
  image,
  title,
  price,
  badge,
}: {
  image: string;
  title: string;
  price: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-card">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
        {badge && (
          <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-body-md font-semibold text-gray-900">{title}</h3>
        <p className="text-heading-sm font-bold text-primary-500">{price}</p>
      </div>
    </div>
  );
}
```

### Builder.io visual CMS (bonus)
```tsx
// Integrate Builder.io as a visual CMS
import { BuilderComponent, builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Page({ params }: { params: { slug: string } }) {
  const content = await builder
    .get("page", { url: `/${params.slug}` })
    .toPromise();

  return <BuilderComponent model="page" content={content} />;
}
```

---

## Anima Figma Plugin

More polished HTML/CSS output, with interactive prototype → code.

### Install
Figma → Plugins → search "Anima" → install

### Features
- Exports responsive HTML/CSS
- React component output
- Preserves hover states from Figma prototyping
- CSS Grid / Flexbox detection

### Workflow
1. Design with auto-layout (Figma)
2. Open Anima plugin
3. Set breakpoints (mobile/tablet/desktop)
4. Export → HTML + CSS or React
5. Copy into project, refactor variable names

### Output cleanup pattern
```tsx
// Anima raw output (rename and clean up)
// Before:
function FrameComponent1() {
  return <div className="frame-1 flex items-center">...</div>;
}

// After cleanup:
function HeroSection() {
  return <section className="flex items-center py-20 px-6 max-w-7xl mx-auto">...</section>;
}
```

---

## CopilotKit for Figma

AI-powered component generation from Figma context.

```bash
npm install @copilotkit/react-core @copilotkit/react-ui
```

```tsx
// Use CopilotKit to describe a Figma component and get code
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

export function App() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <CopilotSidebar
        instructions="You are a UI developer. When given a Figma design description, generate clean React + Tailwind components."
        defaultOpen
      />
      <YourApp />
    </CopilotKit>
  );
}
```

---

## Manual Pattern: Inspect → Implement in Tailwind

### Step-by-step process

**1. Identify component structure**
```
Figma layer hierarchy:
Card (Frame, auto-layout vertical, gap: 16)
  ├── Image (Rectangle, 100% width, 200px height)
  ├── Content (Frame, auto-layout vertical, gap: 8, padding: 16)
  │    ├── Badge (Frame, auto-layout horizontal)
  │    ├── Title (Text)
  │    └── Description (Text)
  └── Footer (Frame, auto-layout horizontal, space-between)
```

**2. Map to Tailwind**
```
auto-layout vertical, gap: 16  → flex flex-col gap-4
100% width                     → w-full
padding: 16                    → p-4
space-between                  → justify-between
```

**3. Implement**
```tsx
function Card({ image, badge, title, description, footer }: CardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl overflow-hidden border border-gray-200 bg-white">
      <img src={image} alt="" className="w-full h-[200px] object-cover" />
      <div className="flex flex-col gap-2 p-4">
        {badge && (
          <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        {footer}
      </div>
    </div>
  );
}
```

---

## Frame to Component Naming Conventions

### Figma naming → code naming

| Figma Frame Name         | Component Name          | File Name             |
|--------------------------|-------------------------|-----------------------|
| Card / ProductCard       | `ProductCard`           | `ProductCard.tsx`     |
| Nav / Header             | `Header`                | `Header.tsx`          |
| Hero Section             | `HeroSection`           | `HeroSection.tsx`     |
| CTA Banner               | `CTABanner`             | `CTABanner.tsx`       |
| Modal / Dialog           | `Dialog`                | `Dialog.tsx`          |
| Button / Btn Primary     | `Button`                | `Button.tsx`          |
| Input / Text Field       | `Input`                 | `Input.tsx`           |
| Badge / Tag              | `Badge`                 | `Badge.tsx`           |
| Sidebar / Side Nav       | `Sidebar`               | `Sidebar.tsx`         |
| Toast / Notification     | `Toast`                 | `Toast.tsx`           |

### Recommended Figma layer naming rules
- Use PascalCase for frames that become components: `ProductCard`, `HeroSection`
- Use kebab-case for variants: `button/primary`, `button/secondary`, `button/ghost`
- Prefix sections: `section/hero`, `section/features`, `section/pricing`
- Mark interactive states: `state/hover`, `state/active`, `state/disabled`
- Use `_` prefix for internal layers (not components): `_bg-overlay`, `_icon-container`

### Component → variant mapping
```tsx
// Figma variants: Button / Size=sm,md,lg / Variant=primary,secondary,ghost

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "text-gray-700 hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2 text-sm gap-2",
        lg: "px-6 py-3 text-base gap-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);
```
