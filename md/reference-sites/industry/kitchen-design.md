# Kitchen / Renovation — Design Reference

> Patterns from smallbone.co.uk, henrybuilt.com, milieu.ca, mottakitchen.ca

## Key Observations from Real Sites

### Smallbone (smallbone.co.uk)
- Full-width hero with lifestyle photography, overlaid headline in serif
- Collections named with single-word luxury identifiers: Atherton, Modernist, Iconic
- CTAs: "Request a Brochure", "Arrange a Consultation"
- Heritage language: "handcrafted", "bespoke", "Devizes workshop"
- Virtual showroom tour integration
- Neutral palette: whites, creams, warm grays — photography IS the color

### Henrybuilt (henrybuilt.com)
- Full-screen scroll sections, image-then-text alternating rhythm
- Scroll indicator arrow below fold
- Link pattern: text + right-arrow icon throughout
- Trust builders: "investment-grade quality", "lifetime warranty", "~7,000 projects since 2002"
- Direct client model (no dealers) — communicated as premium positioning
- WebP-optimized images, mobile-responsive image paths

### Motta Kitchen (mottakitchen.ca)
- Toronto-based luxury kitchen company (our client)
- Clean, high-contrast layout with large product photography
- Showcase-first architecture: let kitchens speak visually
- Book consultation CTA prominent

---

## Color Palettes

### Luxury Neutral
```
Cream:      #F5F0E8   (backgrounds, negative space)
Warm White: #FAFAF8   (page base)
Charcoal:   #2C2C2C   (primary text)
Slate Gray: #6B6B6B   (secondary text)
Brass:      #B8975A   (accent, hardware details)
Stone:      #9B9390   (borders, subtle dividers)
Deep Forest:#1A2420   (dark hero overlays)
```

### Typography
- Headings: Cormorant Garamond, Playfair Display, or similar high-contrast serif
- Body: Inter, DM Sans, or Neue Haas Grotesk — neutral, modern
- Size scale: 64px hero → 40px section → 24px subhead → 16px body
- Letter-spacing: 0.08em on headings, 0.15em on uppercase labels

---

## Pattern 1 — Luxury Hero Section

```tsx
// LuxuryHero.tsx
import React from 'react'

interface LuxuryHeroProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  overlayOpacity?: number
}

export function LuxuryHero({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  overlayOpacity = 0.35,
}: LuxuryHeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background photography */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 bg-[#1A2420]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-20 px-8 md:px-16 lg:px-24">
        {eyebrow && (
          <span className="mb-4 block text-xs tracking-[0.2em] uppercase text-[#B8975A] font-light">
            {eyebrow}
          </span>
        )}

        <h1
          className="mb-6 max-w-3xl font-serif text-5xl font-light leading-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'Cormorant Garamond, Playfair Display, Georgia, serif' }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-white/80">
            {subheadline}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <a
            href={primaryCTA.href}
            className="inline-flex items-center border border-white px-8 py-4 text-sm tracking-[0.12em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-[#2C2C2C]"
          >
            {primaryCTA.label}
          </a>

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-[0.12em] uppercase text-white/70 transition-colors hover:text-white"
            >
              {secondaryCTA.label}
              <span className="text-[#B8975A]">→</span>
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator (Henrybuilt pattern) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-white/30" />
      </div>
    </section>
  )
}
```

---

## Pattern 2 — Kitchen Collection Grid

```tsx
// KitchenCollectionGrid.tsx
import React from 'react'

interface KitchenCollection {
  id: string
  name: string
  descriptor: string
  imageSrc: string
  href: string
  tag?: 'New' | 'Featured' | 'Bestseller'
}

interface KitchenCollectionGridProps {
  eyebrow?: string
  title: string
  collections: KitchenCollection[]
}

export function KitchenCollectionGrid({
  eyebrow,
  title,
  collections,
}: KitchenCollectionGridProps) {
  return (
    <section className="bg-[#FAFAF8] py-24 px-8 md:px-16 lg:px-24">
      {/* Section header */}
      <div className="mb-16 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <span className="mb-3 block text-xs tracking-[0.2em] uppercase text-[#B8975A]">
              {eyebrow}
            </span>
          )}
          <h2
            className="font-serif text-4xl font-light text-[#2C2C2C] md:text-5xl"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {title}
          </h2>
        </div>
        <a
          href="/collections"
          className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-[#6B6B6B] transition-colors hover:text-[#2C2C2C]"
        >
          View All Collections <span className="text-[#B8975A]">→</span>
        </a>
      </div>

      {/* Grid — Smallbone/Henrybuilt style */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <a
            key={col.id}
            href={col.href}
            className="group block overflow-hidden"
          >
            {/* Image container with aspect ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0E8]">
              <img
                src={col.imageSrc}
                alt={col.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {col.tag && (
                <span className="absolute top-4 left-4 bg-[#2C2C2C] px-3 py-1 text-xs tracking-[0.15em] uppercase text-white">
                  {col.tag}
                </span>
              )}
            </div>

            {/* Card copy */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h3
                  className="font-serif text-xl font-light text-[#2C2C2C]"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {col.name}
                </h3>
                <p className="mt-1 text-sm text-[#6B6B6B]">{col.descriptor}</p>
              </div>
              <span className="mt-1 text-[#B8975A] transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
```

---

## Pattern 3 — Material / Finish Selector

```tsx
// MaterialFinishSelector.tsx
import React, { useState } from 'react'

interface Finish {
  id: string
  name: string
  swatch: string   // hex or CSS value
  texture?: string // optional texture image URL
  description: string
}

interface MaterialCategory {
  id: string
  label: string
  finishes: Finish[]
}

interface MaterialFinishSelectorProps {
  categories: MaterialCategory[]
  onSelect?: (categoryId: string, finishId: string) => void
}

export function MaterialFinishSelector({
  categories,
  onSelect,
}: MaterialFinishSelectorProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null)

  const currentCategory = categories.find((c) => c.id === activeCategory)

  const handleSelect = (finishId: string) => {
    setSelectedFinish(finishId)
    if (activeCategory) onSelect?.(activeCategory, finishId)
  }

  return (
    <div className="bg-[#F5F0E8] px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl">
        {/* Category tabs */}
        <div className="mb-10 flex gap-6 border-b border-[#9B9390]/30">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setSelectedFinish(null)
              }}
              className={`pb-3 text-sm tracking-[0.1em] uppercase transition-colors ${
                activeCategory === cat.id
                  ? 'border-b-2 border-[#B8975A] text-[#2C2C2C]'
                  : 'text-[#6B6B6B] hover:text-[#2C2C2C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Swatches */}
        {currentCategory && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
            {currentCategory.finishes.map((finish) => (
              <button
                key={finish.id}
                onClick={() => handleSelect(finish.id)}
                className="group flex flex-col items-center gap-2"
                title={finish.name}
              >
                <div
                  className={`h-12 w-12 rounded-full border-2 transition-all duration-200 ${
                    selectedFinish === finish.id
                      ? 'border-[#B8975A] scale-110 shadow-md'
                      : 'border-transparent hover:border-[#9B9390]'
                  }`}
                  style={{
                    background: finish.texture
                      ? `url(${finish.texture}) center/cover`
                      : finish.swatch,
                  }}
                />
                <span className="text-center text-xs text-[#6B6B6B] leading-tight">
                  {finish.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Selected finish detail */}
        {selectedFinish && currentCategory && (
          <div className="mt-8 border-t border-[#9B9390]/30 pt-6">
            {(() => {
              const finish = currentCategory.finishes.find(
                (f) => f.id === selectedFinish
              )
              return finish ? (
                <div className="flex items-start gap-6">
                  <div
                    className="h-16 w-16 shrink-0 rounded border border-[#9B9390]/30"
                    style={{
                      background: finish.texture
                        ? `url(${finish.texture}) center/cover`
                        : finish.swatch,
                    }}
                  />
                  <div>
                    <p className="font-serif text-lg text-[#2C2C2C]">{finish.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">
                      {finish.description}
                    </p>
                  </div>
                </div>
              ) : null
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Pattern 4 — Before / After Gallery

```tsx
// BeforeAfterGallery.tsx
import React, { useState, useRef, useCallback } from 'react'

interface BeforeAfterItem {
  id: string
  before: { src: string; label?: string }
  after: { src: string; label?: string }
  projectName: string
  location?: string
}

function BeforeAfterSlider({
  item,
}: {
  item: BeforeAfterItem
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    )
    setSliderPos(pos)
  }, [])

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[16/9] cursor-ew-resize select-none overflow-hidden bg-[#F5F0E8]"
        onMouseDown={() => { isDragging.current = true }}
        onMouseUp={() => { isDragging.current = false }}
        onMouseLeave={() => { isDragging.current = false }}
        onMouseMove={(e) => { if (isDragging.current) updateSlider(e.clientX) }}
        onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
      >
        {/* Before image (full width underneath) */}
        <img
          src={item.before.src}
          alt={`Before: ${item.projectName}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* After image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={item.after.src}
            alt={`After: ${item.projectName}`}
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-px bg-white/80" />
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-xs text-[#2C2C2C]">⟺</span>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-4 left-4 bg-[#2C2C2C]/70 px-3 py-1 text-xs tracking-[0.1em] uppercase text-white">
          {item.before.label ?? 'Before'}
        </span>
        <span className="absolute bottom-4 right-4 bg-[#B8975A]/90 px-3 py-1 text-xs tracking-[0.1em] uppercase text-white">
          {item.after.label ?? 'After'}
        </span>
      </div>

      <div className="mt-4">
        <p
          className="font-serif text-lg text-[#2C2C2C]"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {item.projectName}
        </p>
        {item.location && (
          <p className="mt-1 text-sm text-[#6B6B6B]">{item.location}</p>
        )}
      </div>
    </div>
  )
}

export function BeforeAfterGallery({ items }: { items: BeforeAfterItem[] }) {
  return (
    <section className="bg-[#FAFAF8] py-24 px-8 md:px-16 lg:px-24">
      <div className="mb-14 text-center">
        <span className="mb-3 block text-xs tracking-[0.2em] uppercase text-[#B8975A]">
          Our Work
        </span>
        <h2
          className="font-serif text-4xl font-light text-[#2C2C2C] md:text-5xl"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Transformations
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {items.map((item) => (
          <BeforeAfterSlider key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
```

---

## Pattern 5 — Consultation CTA Section

```tsx
// ConsultationCTA.tsx
import React from 'react'

interface ConsultationCTAProps {
  backgroundImage?: string
  eyebrow?: string
  headline: string
  body: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  showroomAddress?: string
}

export function ConsultationCTA({
  backgroundImage,
  eyebrow = 'Begin Your Project',
  headline,
  body,
  primaryCTA,
  secondaryCTA,
  showroomAddress,
}: ConsultationCTAProps) {
  return (
    <section
      className="relative overflow-hidden py-32 px-8 md:px-16 lg:px-24"
      style={{
        background: backgroundImage
          ? undefined
          : 'linear-gradient(135deg, #2C2C2C 0%, #1A2420 100%)',
      }}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A2420]/70" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="mb-4 block text-xs tracking-[0.25em] uppercase text-[#B8975A]">
          {eyebrow}
        </span>

        <h2
          className="mb-6 font-serif text-4xl font-light leading-tight text-white md:text-5xl"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {headline}
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-base font-light leading-relaxed text-white/75">
          {body}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={primaryCTA.href}
            className="inline-flex items-center bg-[#B8975A] px-10 py-4 text-sm tracking-[0.12em] uppercase text-white transition-all duration-300 hover:bg-[#a07d45]"
          >
            {primaryCTA.label}
          </a>

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center border border-white/40 px-10 py-4 text-sm tracking-[0.12em] uppercase text-white/80 transition-all duration-300 hover:border-white hover:text-white"
            >
              {secondaryCTA.label}
            </a>
          )}
        </div>

        {showroomAddress && (
          <p className="mt-10 text-xs tracking-[0.1em] uppercase text-white/40">
            {showroomAddress}
          </p>
        )}
      </div>
    </section>
  )
}
```

---

## Usage Example

```tsx
// Example usage combining all patterns
export function KitchenPage() {
  return (
    <>
      <LuxuryHero
        imageSrc="/images/hero-kitchen.jpg"
        imageAlt="Motta Kitchen — custom cabinetry"
        eyebrow="Bespoke Kitchens · Toronto"
        headline="Crafted for the way you live"
        subheadline="Custom kitchen design and installation. Every detail considered."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/portfolio' }}
      />

      <KitchenCollectionGrid
        eyebrow="Collections"
        title="Our Kitchen Lines"
        collections={[
          {
            id: 'modern',
            name: 'Modern',
            descriptor: 'Clean lines, integrated hardware',
            imageSrc: '/images/modern-kitchen.jpg',
            href: '/collections/modern',
            tag: 'Featured',
          },
          {
            id: 'classic',
            name: 'Classic',
            descriptor: 'Timeless profiles, shaker doors',
            imageSrc: '/images/classic-kitchen.jpg',
            href: '/collections/classic',
          },
          {
            id: 'transitional',
            name: 'Transitional',
            descriptor: 'Best of both worlds',
            imageSrc: '/images/transitional-kitchen.jpg',
            href: '/collections/transitional',
          },
        ]}
      />

      <ConsultationCTA
        eyebrow="Begin Your Project"
        headline="Every great kitchen starts with a conversation"
        body="Visit our Toronto showroom or book a free design consultation. Our team works directly with you from concept through installation."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'Visit Our Showroom', href: '/showroom' }}
        showroomAddress="123 Design Street, Toronto, ON M5V 2T6"
      />
    </>
  )
}
```
