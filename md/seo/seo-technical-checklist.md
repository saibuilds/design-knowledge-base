# Technical SEO Checklist: Next.js (App Router)

> For Next.js 14+ using the App Router. All examples are production-ready.

---

## 1. Metadata Setup — App Router Metadata API

### Root Layout — Static Metadata
```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://djcustomreno.ca'),
  title: {
    template: '%s | DJ Custom Reno',
    default: 'DJ Custom Reno | Home Renovation Toronto',
  },
  description: "Toronto's trusted home renovation contractor. Kitchen, bathroom & basement renovations. Licensed, insured, free quotes.",
  keywords: ['kitchen renovation Toronto', 'bathroom renovation Toronto', 'basement renovation Toronto', 'home renovation contractor Toronto'],
  authors: [{ name: 'DJ Custom Reno', url: 'https://djcustomreno.ca' }],
  creator: 'DJ Custom Reno',
  publisher: 'DJ Custom Reno',
  category: 'construction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://djcustomreno.ca',
    siteName: 'DJ Custom Reno',
    title: 'DJ Custom Reno | Home Renovation Toronto',
    description: "Toronto's trusted home renovation contractor.",
    images: [
      {
        url: '/images/og-image.jpg', // 1200x630px
        width: 1200,
        height: 630,
        alt: 'DJ Custom Reno — Home Renovation Toronto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@djcustomreno',
    title: 'DJ Custom Reno | Home Renovation Toronto',
    description: "Toronto's trusted home renovation contractor.",
    images: ['/images/twitter-card.jpg'], // 800x418px minimum
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-search-console-verification-code',
    // yandex: 'xxx', // optional
  },
  alternates: {
    canonical: 'https://djcustomreno.ca',
  },
}
```

### Dynamic Metadata — Service Pages
```typescript
// app/services/[slug]/page.tsx
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
      robots: { index: false },
    }
  }

  return {
    title: `${service.name} in Toronto | DJ Custom Reno`,
    description: `Professional ${service.name.toLowerCase()} in Toronto. ${service.description} Free consultation — licensed & insured.`,
    alternates: {
      canonical: `/services/${params.slug}`,
    },
    openGraph: {
      title: `${service.name} in Toronto | DJ Custom Reno`,
      description: service.description,
      url: `/services/${params.slug}`,
      images: [
        {
          url: service.heroImage || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${service.name} in Toronto by DJ Custom Reno`,
        },
      ],
    },
  }
}
```

### Dynamic OG Image Generation
```typescript
// app/services/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Service page'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#fff', fontSize: 60, fontWeight: 700 }}>
          {service?.name} in Toronto
        </p>
        <p style={{ color: '#aaa', fontSize: 32 }}>DJ Custom Reno</p>
      </div>
    ),
    size
  )
}
```

---

## 2. Structured Data (JSON-LD in Next.js)

### Method: Inline Script Component
```typescript
// components/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### Usage in Page/Layout
```typescript
// app/layout.tsx or app/page.tsx
import { JsonLd } from '@/components/JsonLd'

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'DJ Custom Reno',
  // ... full schema
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={businessSchema} />
        {children}
      </body>
    </html>
  )
}
```

### Multiple Schemas on One Page
```typescript
// app/services/kitchen-renovation/page.tsx
export default function KitchenPage() {
  const schemas = [
    serviceSchema,
    faqSchema,
    breadcrumbSchema,
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {/* page content */}
    </>
  )
}
```

---

## 3. Sitemap Generation

### Option A: next-sitemap (Recommended for Large Sites)

**Install:**
```bash
npm install next-sitemap
```

**next-sitemap.config.js:**
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://djcustomreno.ca',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
  ],
  additionalPaths: async (config) => {
    // Dynamically add paths not in App Router
    const services = await getServices()
    return services.map(s => ({
      loc: `/services/${s.slug}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: s.updatedAt,
    }))
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://djcustomreno.ca/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority per path type
    const priority = path === '/' ? 1.0
      : path.startsWith('/services/') ? 0.9
      : path.startsWith('/blog/') ? 0.7
      : 0.6

    return {
      loc: path,
      changefreq: 'weekly',
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
```

**package.json — add to build:**
```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

### Option B: App Router Native Sitemap
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices()
  const blogPosts = await getBlogPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://djcustomreno.ca', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://djcustomreno.ca/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://djcustomreno.ca/portfolio', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://djcustomreno.ca/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `https://djcustomreno.ca/services/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(p => ({
    url: `https://djcustomreno.ca/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
```

---

## 4. robots.txt — App Router Native

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/', // Optional: block AI scrapers
      },
    ],
    sitemap: [
      'https://djcustomreno.ca/sitemap.xml',
    ],
    host: 'https://djcustomreno.ca',
  }
}
```

---

## 5. Open Graph & Twitter Cards

### Image Requirements
| Format | Dimensions | Max Size | Notes |
|---|---|---|---|
| Open Graph | 1200×630px | 8MB | Primary sharing image |
| Twitter Card | 800×418px minimum | 5MB | summary_large_image type |
| Square OG | 1200×1200px | 8MB | For some social platforms |

### Critical Checks
- [ ] og:image is absolute URL (not relative)
- [ ] og:image is accessible without authentication
- [ ] og:type is set: "website" for most pages, "article" for blog posts
- [ ] og:locale is "en_CA" for Canadian sites
- [ ] twitter:card is "summary_large_image" for pages with images
- [ ] Test with: developers.facebook.com/tools/debug and cards-dev.twitter.com/validator

---

## 6. Canonical URLs

### Rules
1. Every page has exactly one canonical URL
2. Canonical is always the preferred URL (www vs non-www, trailing slash vs none — pick one and stick with it)
3. Self-referential canonicals on all pages (even if no duplicate exists)
4. IDX/listing pages: either canonical to your own URL or noindex

### Implementation
```typescript
// app/services/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://djcustomreno.ca/services/${params.slug}`,
    },
  }
}
```

### Trailing Slash Consistency
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // Choose: true or false — never mix
}
```

### Redirect www to non-www (or vice versa)
```javascript
// next.config.js
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.djcustomreno.ca' }],
      destination: 'https://djcustomreno.ca/:path*',
      permanent: true, // 308 redirect
    },
  ]
},
```

---

## 7. Image Alt Text Patterns

### next/image Requirements
```tsx
// WRONG — empty alt on meaningful image
<Image src="/kitchen.jpg" alt="" width={800} height={600} />

// WRONG — keyword stuffing
<Image src="/kitchen.jpg" alt="kitchen renovation Toronto kitchen remodel Toronto kitchen contractor Toronto" width={800} height={600} />

// CORRECT — descriptive + naturally includes keyword
<Image src="/kitchen.jpg" alt="Custom kitchen renovation in North York with white shaker cabinets and quartz countertops" width={800} height={600} />

// CORRECT — decorative image (truly decorative only)
<Image src="/divider-line.svg" alt="" role="presentation" width={400} height={2} />
```

### Alt Text Formulas by Page Type
| Page Type | Formula | Example |
|---|---|---|
| Service hero | "[Service] project in [City] by [Company]" | "Kitchen renovation in Leslieville by DJ Custom Reno" |
| Portfolio/before | "Before: [description] in [city]" | "Before: outdated kitchen with laminate counters in Etobicoke" |
| Portfolio/after | "After: [description] — [company] renovation" | "After: custom kitchen with waterfall island — DJ Custom Reno" |
| Team photo | "[Name], [Title] at [Company]" | "David, Lead Contractor at DJ Custom Reno" |
| Blog featured | Describe the image naturally | "Contractor installing kitchen cabinets with level tool" |
| Neighbourhood | "[Neighbourhood] streetscape in Toronto" | "Leslieville Victorian homes on Queen St E Toronto" |
| Certifications | "[Org] certification badge — [Company]" | "HomeStars Best of 2024 award — DJ Custom Reno" |

---

## 8. Core Web Vitals Targets & Next.js Optimizations

### Targets
| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP | < 2.5s | 2.5–4s | > 4s |
| CLS | < 0.1 | 0.1–0.25 | > 0.25 |
| INP | < 200ms | 200–500ms | > 500ms |
| TTFB | < 800ms | 800ms–1.8s | > 1.8s |

### LCP Optimization — Target: < 2.5s
```tsx
// 1. Priority on above-fold images
<Image
  src="/hero.webp"
  alt="Kitchen renovation Toronto"
  width={1920}
  height={1080}
  priority  // Preloads the image
  sizes="100vw"
/>

// 2. Preconnect to external image hosts
// app/layout.tsx
<link rel="preconnect" href="https://res.cloudinary.com" />

// 3. Use next/font to eliminate font render-blocking
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})
```

### CLS Optimization — Target: < 0.1
```tsx
// 1. Always specify dimensions on next/image
// next/image handles this automatically when width/height are set

// 2. Reserve space for dynamic content
// Use min-height or aspect-ratio on containers
<div style={{ aspectRatio: '16/9', position: 'relative' }}>
  <Image src="/hero.webp" alt="..." fill sizes="100vw" />
</div>

// 3. Font display swap (next/font handles this automatically)

// 4. Avoid inserting banners/headers after initial load
// Cookie consent banners should be positioned fixed, not pushing content
```

### INP Optimization — Target: < 200ms
```tsx
// 1. Use React Server Components for heavy data fetching
// app/portfolio/page.tsx — Server Component (default in App Router)
export default async function PortfolioPage() {
  const projects = await getProjects() // Server-side, no client JS
  return <PortfolioGrid projects={projects} />
}

// 2. Dynamic imports for heavy client components
import dynamic from 'next/dynamic'
const HeavySlider = dynamic(() => import('@/components/BeforeAfterSlider'), {
  loading: () => <div className="aspect-video bg-gray-100 animate-pulse" />,
  ssr: false,
})

// 3. Debounce search/filter inputs
import { useDeferredValue } from 'react'
const deferredQuery = useDeferredValue(searchQuery)
```

### Image Format Strategy
```typescript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF first, fallback to WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}
```

---

## 9. Schema Types Reference

### WebSite Schema with SearchAction (for Sitelinks Searchbox)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://djcustomreno.ca",
  "name": "DJ Custom Reno",
  "description": "Toronto home renovation contractor",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://djcustomreno.ca/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://djcustomreno.ca/services/kitchen-renovation#service",
  "serviceType": "Kitchen Renovation",
  "name": "Kitchen Renovation in Toronto",
  "description": "Custom kitchen renovations in Toronto including cabinetry, countertops, islands, plumbing, electrical, and flooring.",
  "url": "https://djcustomreno.ca/services/kitchen-renovation",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://djcustomreno.ca/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Toronto"},
    {"@type": "City", "name": "Mississauga"}
  ],
  "offers": {
    "@type": "Offer",
    "priceRange": "$25,000–$100,000+",
    "priceCurrency": "CAD",
    "availability": "https://schema.org/InStock"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kitchen Renovation Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Cabinet Installation"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Countertop Installation"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Kitchen Island Design"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Backsplash Installation"}}
    ]
  }
}
```

### AggregateRating Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://djcustomreno.ca/#business",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### Individual Review Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://djcustomreno.ca/#business"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "datePublished": "2024-11-15",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "DJ Custom Reno completely transformed our kitchen. The team was professional, on time, and the quality is exceptional. Highly recommend for anyone in Toronto."
}
```

---

## 10. Google Search Console Setup

### Verification Methods for Next.js
```typescript
// Method 1: Metadata API (recommended — App Router)
// app/layout.tsx
export const metadata: Metadata = {
  verification: {
    google: 'your-verification-code-from-gsc',
  },
}
// This outputs: <meta name="google-site-verification" content="..." />

// Method 2: File verification
// Create: app/[verification-code].txt/route.ts
// Or: public/googleXXXXXXXX.html

// Method 3: DNS TXT record (best for existing sites)
// Add TXT record to your domain DNS — doesn't touch code
```

### Post-Setup Checklist
- [ ] Submit sitemap: Settings → Sitemaps → Add `sitemap.xml`
- [ ] Request indexing for homepage: URL Inspection → Request Indexing
- [ ] Link Google Analytics 4 property
- [ ] Set preferred domain (www vs non-www)
- [ ] Enable email notifications for manual actions
- [ ] Check Core Web Vitals report after 28 days of data

### Key Reports to Monitor Weekly
1. **Performance** → Clicks, Impressions, CTR, Position — filter by country (Canada) and device
2. **Coverage** → Valid pages vs errors vs excluded — fix any 404s or crawl errors
3. **Core Web Vitals** → LCP/CLS/INP by URL group
4. **Links** → Internal links structure, top external links
5. **Manual Actions** → Should always be 0

---

## 11. Google Analytics 4 Setup in Next.js

### Using @next/third-parties (Recommended — No External Package)
```bash
# Already included in Next.js 14.x — no install needed
```

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### Custom Event Tracking
```typescript
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Usage examples:
trackEvent('quote_request', { service: 'kitchen_renovation', source: 'hero_cta' })
trackEvent('phone_click', { location: 'header' })
trackEvent('portfolio_view', { project_type: 'kitchen', project_id: '123' })
trackEvent('form_submit', { form_name: 'contact_form' })
```

### Key Conversions to Set Up in GA4
| Conversion | Event Name | Trigger |
|---|---|---|
| Quote form submitted | `generate_lead` | Form success |
| Phone number clicked | `phone_click` | Click on tel: link |
| Email clicked | `email_click` | Click on mailto: link |
| Portfolio project viewed | `view_item` | Project detail open |
| Blog post read (scroll) | `scroll` | 75% page scroll |
| Chat started | `chat_initiated` | Chat widget open |

### GA4 → GSC Linking
Google Analytics Admin → Product Links → Search Console Links → Add

---

## 12. Additional Technical Checks

### Pre-Launch Checklist
- [ ] HTTPS enforced (301 redirect from HTTP to HTTPS)
- [ ] WWW redirect configured (to or from www — consistent)
- [ ] Trailing slash consistent throughout
- [ ] Custom 404 page: `app/not-found.tsx`
- [ ] Custom error page: `app/error.tsx` and `app/global-error.tsx`
- [ ] All images have width + height (no layout shift)
- [ ] All images have alt text (no empty alts on meaningful images)
- [ ] No broken internal links
- [ ] No console errors on any page
- [ ] All forms have success and error states
- [ ] Phone numbers are `<a href="tel:+14165550100">` links
- [ ] Addresses link to Google Maps
- [ ] Social links open in new tab with `rel="noopener noreferrer"`
- [ ] Privacy Policy page exists
- [ ] Terms of Service page exists (if e-commerce)
- [ ] Cookie consent if using analytics (PIPEDA compliance for Canada)
- [ ] All external links have `rel="noopener"` (security)

### Redirect Strategy
```typescript
// next.config.js
async redirects() {
  return [
    // Old URL structure → New
    {
      source: '/services.html',
      destination: '/services',
      permanent: true, // 308 (permanent)
    },
    // Temporary redirect
    {
      source: '/promo',
      destination: '/contact',
      permanent: false, // 307 (temporary)
    },
  ]
},
```

### Hreflang (French/English for Canadian Sites)
```typescript
// app/layout.tsx — if bilingual site
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://djcustomreno.ca/en',
    languages: {
      'en-CA': 'https://djcustomreno.ca/en',
      'fr-CA': 'https://djcustomreno.ca/fr',
    },
  },
}
```

### Pagination
```typescript
// For paginated blog/portfolio — canonical each page to itself
export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const page = searchParams.page || 1
  return {
    alternates: {
      canonical: `/blog?page=${page}`,
    },
  }
}
```

### Performance Budget (Next.js)
```javascript
// next.config.js
experimental: {
  optimizeCss: true, // Enable CSS optimization
},
compress: true, // Enable gzip compression
poweredByHeader: false, // Remove X-Powered-By header (security + cleanliness)
```

---

## 13. Reusable LocalBusiness JSON-LD Template

Use this as the base for any industry. Swap `@type` and fields as needed.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "image": "https://[domain]/images/logo.jpg",
  "@id": "https://[domain]/#business",
  "url": "https://[domain]",
  "telephone": "+1-416-555-0000",
  "email": "info@[domain]",
  "priceRange": "$$",
  "description": "[1–2 sentence business description with primary keyword and city]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "[M_X _X_]",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": [
    {"@type": "City", "name": "Toronto"},
    {"@type": "City", "name": "North York"},
    {"@type": "City", "name": "Scarborough"},
    {"@type": "City", "name": "Etobicoke"},
    {"@type": "City", "name": "Mississauga"},
    {"@type": "City", "name": "Brampton"},
    {"@type": "City", "name": "Vaughan"},
    {"@type": "City", "name": "Markham"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "[Service Category Name]",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "[Service 1]"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "[Service 2]"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "[Service 3]"}}
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.google.com/maps?cid=[YOUR_CID]",
    "https://www.facebook.com/[handle]",
    "https://www.instagram.com/[handle]",
    "https://www.homestars.com/companies/[slug]"
  ]
}
```

**`@type` by industry:**
| Industry | `@type` Value |
|---|---|
| General contractor / renovation | `HomeAndConstructionBusiness` |
| Real estate agent | `RealEstateAgent` |
| Garden suite / ADU builder | `HomeAndConstructionBusiness` |
| Interior designer | `ProfessionalService` |
| Architect | `ProfessionalService` |
| Generic business | `LocalBusiness` |

---

## 14. Schema Templates — Complete Collection

### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text — exactly as a user would type it]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer — 40–120 words. Plain text only — no HTML. Be specific and accurate.]"
      }
    },
    {
      "@type": "Question",
      "name": "[Second question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Second answer]"
      }
    }
  ]
}
```

**FAQPage best practices:**
- Minimum 3 questions, maximum ~10 per page
- Questions should match real People Also Ask (PAA) boxes for your keyword
- Answers under 300 words each — Google truncates long answers in SERPs
- Do not repeat FAQ schema across multiple pages with identical Q&A
- Test at: search.google.com/test/rich-results

### HowTo Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a Garden Suite Permit in Toronto",
  "description": "Step-by-step guide to applying for a garden suite building permit with the City of Toronto.",
  "totalTime": "PT6M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "CAD",
    "value": "300"
  },
  "tool": [
    {"@type": "HowToTool", "name": "Architectural drawings"},
    {"@type": "HowToTool", "name": "Site plan"},
    {"@type": "HowToTool", "name": "Toronto Building Permit Application"}
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Confirm property eligibility",
      "text": "Check your property zoning at map.toronto.ca to confirm your lot is in an eligible residential zone (R, RS, RM) and meets minimum lot size requirements (200m²).",
      "url": "https://yoursite.ca/garden-suite-permit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Hire a licensed designer or architect",
      "text": "Engage an Ontario-licensed architect or designer to prepare architectural drawings that meet the Ontario Building Code and City of Toronto zoning bylaw requirements.",
      "url": "https://yoursite.ca/garden-suite-permit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Submit a building permit application",
      "text": "Submit your permit application through the City of Toronto's online permit portal (toronto.ca/building). Include architectural drawings, site plan, and application fee.",
      "url": "https://yoursite.ca/garden-suite-permit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Await permit review and approval",
      "text": "Toronto Building reviews your application. Typical review time for garden suites is 4–12 weeks. You may receive Requests for Information (RFIs) requiring additional clarification.",
      "url": "https://yoursite.ca/garden-suite-permit#step-4"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Begin construction and book inspections",
      "text": "Once your permit is approved, construction can begin. Book required inspections (foundation, framing, plumbing rough-in, electrical rough-in, insulation, final) through the permit portal.",
      "url": "https://yoursite.ca/garden-suite-permit#step-5"
    }
  ]
}
```

### Review Schema (Individual)
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://yoursite.ca/#business"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "datePublished": "2025-01-15",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "[Review text — must be verbatim from a real review. Do not fabricate.]"
}
```

**Review schema rules:**
- Only use for reviews that genuinely exist (Google, HomeStars, etc.)
- Do not self-write reviews and mark them up — this is against Google's guidelines
- AggregateRating on LocalBusiness is preferred if you have enough reviews
- Individual Review schema is useful for testimonial pages

### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yoursite.ca"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://yoursite.ca/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Kitchen Renovation",
      "item": "https://yoursite.ca/services/kitchen-renovation"
    }
  ]
}
```

**BreadcrumbList rules:**
- Add to every page except the homepage
- Position values must be sequential integers starting at 1
- `item` must be the full absolute URL
- `name` matches what appears visually in the breadcrumb nav
- Test at: search.google.com/test/rich-results

### Article / BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Kitchen Renovation Cost in Toronto: 2025 Complete Breakdown",
  "description": "Everything you need to know about kitchen renovation costs in Toronto, including labour, materials, permits, and how to get accurate quotes.",
  "image": "https://yoursite.ca/blog/images/kitchen-renovation-cost-toronto.jpg",
  "datePublished": "2025-01-10",
  "dateModified": "2025-04-01",
  "author": {
    "@type": "Person",
    "name": "David J.",
    "url": "https://yoursite.ca/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DJ Custom Reno",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.ca/images/logo.jpg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yoursite.ca/blog/kitchen-renovation-cost-toronto"
  }
}
```

---

## 15. Structured Data Testing Tools

| Tool | Purpose | URL |
|---|---|---|
| Google Rich Results Test | Test all schema types for rich result eligibility | search.google.com/test/rich-results |
| Schema Markup Validator | Validate schema.org syntax | validator.schema.org |
| Google Search Console | Monitor schema errors in production | search.google.com/search-console |
| Merkle Schema Markup Generator | Generate schema interactively | technicalseo.com/tools/schema-markup-generator |
| OG Debugger (Meta) | Preview Facebook/OG cards | developers.facebook.com/tools/debug |
| Twitter Card Validator | Preview Twitter cards | cards-dev.twitter.com/validator |
| LinkedIn Post Inspector | Preview LinkedIn shares | linkedin.com/post-inspector |
