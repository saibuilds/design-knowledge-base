# Property Listings — Design Reference

> Patterns from compass.com, zoopla.co.uk, realtor.com

## Key Observations from Real Sites

### Compass.com
- Minimal, high-contrast design — white background, black typography
- Property card: large image thumbnail, price bold/prominent, address secondary
- Navigation: clean top bar with search, agent login, "List your home"
- Map and grid view toggle — side-by-side default on desktop
- Sticky search filter bar (location, price, beds/baths, property type, more filters)
- Agent contact: photo, name, phone, message form in sidebar
- Hero: full-width search box, no hero image — search IS the hero

### Zoopla.co.uk
- Hero-first with large aspirational photography
- Location-based browsing categories (city, coastal, rural)
- Dual CTAs: "Get an instant valuation" + "Find homes to buy or rent"
- Integrated tools: affordability calculator, valuations, mortgage resources
- Geographic taxonomy: browse by region → city → neighborhood
- UK regulatory compliance disclosures in footer
- "Just ask Zoopla" — AI-driven search positioning

### Realtor.com
- Search bar prominently above the fold with location autocomplete
- Property card: photo carousel on hover, price/sqft/beds/baths metadata
- Neighborhood stats: median price, days on market, walk score
- Agent sidebar with social proof (transactions, ratings)

---

## Color Palette

```
Background:      #FFFFFF
Surface:         #F9FAFB
Border:          #E5E7EB
Primary:         #000000  (Compass — high contrast)
Accent Blue:     #1B6FD8  (links, interactive)
Price Color:     #111827  (bold, prominent)
Success Green:   #16A34A  (price drops, status)
Alert Red:       #DC2626  (hot listings, urgent)
Tag Background:  #FEF3C7  (new listing badge)
Text Primary:    #111827
Text Muted:      #6B7280
```

## Typography
- Headings: Inter or system-ui — clean, professional, NOT serif
- Price: Bold, 20-28px, darkest text color
- Address: Regular/medium, 14px, muted
- Metadata (beds/baths/sqft): Regular, 13-14px, with icon
- Filter labels: 13px, medium weight

---

## Pattern 1 — Property Card

```tsx
// PropertyCard.tsx
import React, { useState } from 'react'

interface PropertyCardProps {
  id: string
  images: string[]
  price: number
  pricePerSqft?: number
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
  beds: number
  baths: number
  sqft: number
  propertyType: string
  status?: 'For Sale' | 'New Listing' | 'Price Drop' | 'Open House' | 'Sold'
  daysOnMarket?: number
  href: string
  isFavorited?: boolean
  onFavorite?: (id: string) => void
}

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export function PropertyCard({
  id,
  images,
  price,
  pricePerSqft,
  address,
  beds,
  baths,
  sqft,
  propertyType,
  status,
  daysOnMarket,
  href,
  isFavorited = false,
  onFavorite,
}: PropertyCardProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const statusColors: Record<string, string> = {
    'New Listing': 'bg-[#FEF3C7] text-[#92400E]',
    'Price Drop': 'bg-[#DCFCE7] text-[#166534]',
    'Open House': 'bg-[#DBEAFE] text-[#1E40AF]',
    'For Sale': 'bg-[#F3F4F6] text-[#374151]',
    'Sold': 'bg-[#FEE2E2] text-[#991B1B]',
  }

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-shadow hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image area */}
      <a href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F9FAFB]">
          <img
            src={images[activeImage]}
            alt={address.street}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image pagination dots */}
          {images.length > 1 && isHovered && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveImage(i)
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === activeImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Arrow navigation on hover */}
          {images.length > 1 && isHovered && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setActiveImage((i) => Math.max(0, i - 1))
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setActiveImage((i) => Math.min(images.length - 1, i + 1))
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm hover:bg-white"
              >
                ›
              </button>
            </>
          )}

          {/* Status badge */}
          {status && (
            <span
              className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                statusColors[status] ?? statusColors['For Sale']
              }`}
            >
              {status}
            </span>
          )}

          {/* Days on market */}
          {daysOnMarket !== undefined && daysOnMarket <= 7 && (
            <span className="absolute top-3 right-10 rounded-full bg-[#111827]/70 px-2.5 py-1 text-xs text-white">
              {daysOnMarket === 0 ? 'Listed today' : `${daysOnMarket}d ago`}
            </span>
          )}
        </div>
      </a>

      {/* Favorite button */}
      <button
        onClick={() => onFavorite?.(id)}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        aria-label={isFavorited ? 'Remove from favorites' : 'Save property'}
      >
        <svg
          className={`h-4 w-4 ${isFavorited ? 'fill-[#DC2626] text-[#DC2626]' : 'fill-none text-[#6B7280]'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Card body */}
      <a href={href} className="block p-4">
        {/* Price */}
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-xl font-bold text-[#111827]">
            {formatPrice(price)}
          </span>
          {pricePerSqft && (
            <span className="text-xs text-[#6B7280]">
              ${pricePerSqft}/sqft
            </span>
          )}
        </div>

        {/* Specs */}
        <div className="mb-2 flex items-center gap-3 text-sm text-[#374151]">
          <span>
            <strong>{beds}</strong>{' '}
            <span className="text-[#6B7280]">bd</span>
          </span>
          <span className="text-[#E5E7EB]">·</span>
          <span>
            <strong>{baths}</strong>{' '}
            <span className="text-[#6B7280]">ba</span>
          </span>
          <span className="text-[#E5E7EB]">·</span>
          <span>
            <strong>{sqft.toLocaleString()}</strong>{' '}
            <span className="text-[#6B7280]">sqft</span>
          </span>
        </div>

        {/* Address */}
        <p className="truncate text-sm text-[#6B7280]">
          {address.street}, {address.city}, {address.province}
        </p>

        <p className="mt-0.5 text-xs text-[#9CA3AF]">{propertyType}</p>
      </a>
    </article>
  )
}
```

---

## Pattern 2 — Search / Filter Bar

```tsx
// PropertySearchBar.tsx
import React, { useState } from 'react'

interface SearchFilters {
  location: string
  priceMin: number | null
  priceMax: number | null
  beds: string
  baths: string
  propertyType: string[]
}

interface PropertySearchBarProps {
  onSearch: (filters: SearchFilters) => void
  initialFilters?: Partial<SearchFilters>
  sticky?: boolean
}

const PRICE_OPTIONS = [
  { value: 0, label: 'No Min' },
  { value: 300000, label: '$300K' },
  { value: 500000, label: '$500K' },
  { value: 750000, label: '$750K' },
  { value: 1000000, label: '$1M' },
  { value: 1500000, label: '$1.5M' },
  { value: 2000000, label: '$2M' },
  { value: 3000000, label: '$3M+' },
]

const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Semi-Detached', 'Land']

export function PropertySearchBar({
  onSearch,
  initialFilters,
  sticky = true,
}: PropertySearchBarProps) {
  const [location, setLocation] = useState(initialFilters?.location ?? '')
  const [priceMin, setPriceMin] = useState<number | null>(
    initialFilters?.priceMin ?? null
  )
  const [priceMax, setPriceMax] = useState<number | null>(
    initialFilters?.priceMax ?? null
  )
  const [beds, setBeds] = useState(initialFilters?.beds ?? 'Any')
  const [propertyType, setPropertyType] = useState<string[]>(
    initialFilters?.propertyType ?? []
  )
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const handleSearch = () => {
    onSearch({ location, priceMin, priceMax, beds, baths: 'Any', propertyType })
  }

  const togglePropertyType = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  return (
    <div
      className={`z-30 bg-white shadow-sm ${
        sticky ? 'sticky top-0' : ''
      } border-b border-[#E5E7EB]`}
    >
      {/* Primary search row */}
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
        {/* Location input */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="City, neighbourhood, or postal code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full rounded-lg border border-[#E5E7EB] py-2.5 pl-9 pr-3 text-sm focus:border-[#1B6FD8] focus:outline-none focus:ring-2 focus:ring-[#1B6FD8]/20"
          />
        </div>

        {/* Price range */}
        <div className="hidden items-center gap-1 md:flex">
          <select
            value={priceMin ?? ''}
            onChange={(e) =>
              setPriceMin(e.target.value ? Number(e.target.value) : null)
            }
            className="rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none"
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value || ''}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="text-[#9CA3AF]">—</span>
          <select
            value={priceMax ?? ''}
            onChange={(e) =>
              setPriceMax(e.target.value ? Number(e.target.value) : null)
            }
            className="rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none"
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value || ''}>
                {o.value === 0 ? 'No Max' : o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Beds */}
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="hidden rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none md:block"
        >
          {['Any', '1+', '2+', '3+', '4+', '5+'].map((b) => (
            <option key={b} value={b}>
              {b === 'Any' ? 'Any beds' : `${b} beds`}
            </option>
          ))}
        </select>

        {/* More filters toggle */}
        <button
          onClick={() => setShowMoreFilters((v) => !v)}
          className={`hidden items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm transition-colors md:flex ${
            showMoreFilters
              ? 'border-[#1B6FD8] bg-[#EFF6FF] text-[#1B6FD8]'
              : 'border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF]'
          }`}
        >
          Filters
          {propertyType.length > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1B6FD8] text-xs text-white">
              {propertyType.length}
            </span>
          )}
        </button>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#374151]"
        >
          Search
        </button>
      </div>

      {/* Expanded filters */}
      {showMoreFilters && (
        <div className="border-t border-[#E5E7EB] px-4 py-4">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Property Type
            </p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    propertyType.includes(type)
                      ? 'border-[#1B6FD8] bg-[#EFF6FF] text-[#1B6FD8]'
                      : 'border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Pattern 3 — Grid / Map View Toggle + Listings Page

```tsx
// ListingsPage.tsx
import React, { useState } from 'react'

type ViewMode = 'grid' | 'map'

interface ListingsPageProps {
  totalCount: number
  sortOptions?: { value: string; label: string }[]
  children: React.ReactNode
  mapComponent?: React.ReactNode
}

export function ListingsPageLayout({
  totalCount,
  sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'dom-asc', label: 'Days on Market' },
  ],
  children,
  mapComponent,
}: ListingsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('newest')

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Toolbar */}
      <div className="sticky top-[57px] z-20 border-b border-[#E5E7EB] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-[#6B7280]">
            <span className="font-semibold text-[#111827]">
              {totalCount.toLocaleString()}
            </span>{' '}
            homes
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-sm text-[#374151] focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V2zM1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                  viewMode === 'map'
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      {viewMode === 'grid' ? (
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-120px)]">
          {/* Scrollable list */}
          <div className="w-[420px] shrink-0 overflow-y-auto border-r border-[#E5E7EB] bg-white p-4">
            <div className="space-y-4">{children}</div>
          </div>
          {/* Map panel */}
          <div className="flex-1 bg-[#E5E7EB]">
            {mapComponent ?? (
              <div className="flex h-full items-center justify-center text-[#6B7280]">
                Map component here (Mapbox / Google Maps)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Pattern 4 — Agent Contact Sidebar

```tsx
// AgentContactSidebar.tsx
import React, { useState } from 'react'

interface Agent {
  id: string
  name: string
  photo: string
  title: string
  phone: string
  email: string
  brokerageName: string
  transactionCount?: number
  rating?: number
  reviewCount?: number
  yearsExperience?: number
}

interface AgentContactSidebarProps {
  agent: Agent
  propertyAddress: string
  sticky?: boolean
}

export function AgentContactSidebar({
  agent,
  propertyAddress,
  sticky = true,
}: AgentContactSidebarProps) {
  const [message, setMessage] = useState(
    `Hi ${agent.name.split(' ')[0]}, I'm interested in ${propertyAddress}. Could you please send me more details?`
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <aside
      className={`w-full rounded-xl border border-[#E5E7EB] bg-white shadow-sm ${
        sticky ? 'sticky top-24' : ''
      }`}
    >
      {/* Agent header */}
      <div className="flex items-start gap-4 border-b border-[#E5E7EB] p-5">
        <img
          src={agent.photo}
          alt={agent.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#111827] truncate">{agent.name}</p>
          <p className="text-xs text-[#6B7280] truncate">{agent.title}</p>
          <p className="text-xs text-[#6B7280] truncate">{agent.brokerageName}</p>

          {/* Social proof */}
          {(agent.rating || agent.transactionCount) && (
            <div className="mt-1.5 flex items-center gap-3">
              {agent.rating && (
                <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <svg className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {agent.rating} ({agent.reviewCount})
                </span>
              )}
              {agent.transactionCount && (
                <span className="text-xs text-[#6B7280]">
                  {agent.transactionCount}+ sales
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick contact */}
      <div className="grid grid-cols-2 gap-2 border-b border-[#E5E7EB] p-4">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] py-2.5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F9FAFB]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] py-2.5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F9FAFB]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </a>
      </div>

      {/* Contact form */}
      <div className="p-4">
        {submitted ? (
          <div className="rounded-lg bg-[#DCFCE7] p-4 text-center">
            <p className="font-medium text-[#166534]">Message sent!</p>
            <p className="mt-1 text-sm text-[#166534]/80">
              {agent.name.split(' ')[0]} will reply within 1 hour.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none focus:ring-2 focus:ring-[#1B6FD8]/20"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none focus:ring-2 focus:ring-[#1B6FD8]/20"
            />
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm focus:border-[#1B6FD8] focus:outline-none focus:ring-2 focus:ring-[#1B6FD8]/20"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#111827] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#374151]"
            >
              Send Message
            </button>
            <p className="text-center text-xs text-[#9CA3AF]">
              By submitting, you agree to our Terms of Service
            </p>
          </form>
        )}
      </div>
    </aside>
  )
}
```

---

## Pattern 5 — Neighborhood Stats Section

```tsx
// NeighborhoodStats.tsx
import React from 'react'

interface NeighborhoodStat {
  label: string
  value: string
  change?: { value: string; direction: 'up' | 'down' | 'neutral' }
}

interface NeighborhoodStatsProps {
  neighborhoodName: string
  city: string
  stats: NeighborhoodStat[]
  description?: string
  amenities?: string[]
}

export function NeighborhoodStats({
  neighborhoodName,
  city,
  stats,
  description,
  amenities,
}: NeighborhoodStatsProps) {
  const changeColor = (dir: 'up' | 'down' | 'neutral') =>
    dir === 'up' ? 'text-[#16A34A]' : dir === 'down' ? 'text-[#DC2626]' : 'text-[#6B7280]'

  const changeArrow = (dir: 'up' | 'down' | 'neutral') =>
    dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'

  return (
    <section className="border-t border-[#E5E7EB] bg-white py-10 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#111827]">
            About {neighborhoodName}
          </h2>
          <p className="text-sm text-[#6B7280]">{city}</p>
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              {description}
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
              {stat.change && (
                <p
                  className={`mt-1 text-xs font-medium ${changeColor(
                    stat.change.direction
                  )}`}
                >
                  {changeArrow(stat.change.direction)} {stat.change.value} vs last year
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[#111827]">
              Nearby
            </p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#374151]"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
```
