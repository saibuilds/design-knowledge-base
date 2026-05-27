# SEO Strategy: Real Estate Agents & Brokerages (Toronto GTA)

> Research basis: Toronto real estate market SEO patterns, TRREB/CREA data infrastructure, and known ranking strategies of top Canadian real estate portals, agents, and brokerages. Volumes are estimated — not pulled from live keyword tools.

---

## 1. Top Keywords with Search Intent

| Keyword | Intent | Est. Monthly Volume | Competition |
|---|---|---|---|
| Toronto real estate agent | Transactional/Local | 2,400–4,000 | Very High |
| condos for sale Toronto | Transactional | 3,000–5,000 | Very High |
| houses for sale Toronto | Transactional | 2,000–3,500 | Very High |
| Toronto MLS listings | Transactional | 1,500–2,500 | Very High |
| Toronto realtor | Transactional/Local | 1,500–2,500 | Very High |
| buy home Toronto | Transactional | 800–1,500 | High |
| first time home buyer Toronto | Informational/Transactional | 800–1,400 | High |
| Toronto luxury real estate | Transactional | 400–700 | High |
| selling a home Toronto | Transactional | 600–1,000 | High |
| Toronto real estate market 2025 | Informational | 600–1,000 | Medium |

**Neighbourhood + "real estate" long-tails (high conversion):**
- "North York real estate agent"
- "Leslieville real estate agent"
- "The Beaches homes for sale Toronto"
- "Roncesvalles houses for sale"
- "The Annex Toronto real estate"
- "Etobicoke real estate agent"
- "Midtown Toronto condos for sale"
- "Scarborough homes for sale"

**Supporting Long-Tails:**
- "how to buy a condo in Toronto"
- "pre-construction condos Toronto"
- "assignment sale Toronto condo"
- "toronto land transfer tax calculator"
- "best real estate agent toronto reddit"
- "toronto home evaluation"
- "is now a good time to buy in toronto"

---

## 2. Competitor Site Structures

### Top-Ranking Toronto Brokerages (Organic + Brand Search)

**Compass Toronto (compass.com/toronto)**
- Pages: Home, Buy, Sell, Rent, Agents, Neighbourhoods, Collections (Luxury), Blog/Stories
- Title pattern: "Toronto Real Estate | Compass"
- H1 pattern: "Find Your Home in Toronto"
- Trust signals: Global brand recognition, individual agent profiles with reviews, luxury positioning
- Content strategy: Neighbourhood collection pages with IDX feeds, agent profiles that rank individually, market report downloads

**Sotheby's International Realty Canada (sothebysrealty.ca)**
- Pages: Home, Buy, Sell, Luxury Portfolio, Agents, Neighbourhoods, Market Reports, Blog
- Title pattern: "Luxury Real Estate Toronto | Sotheby's International Realty Canada"
- H1 pattern: "Toronto's Luxury Real Estate Specialists"
- Trust signals: Global luxury brand, white-glove positioning, international buyer network
- Content strategy: Premium neighbourhood guides, quarterly luxury market reports, content targeting international buyers relocating to Toronto

**Harvey Kalles Real Estate (harveykalles.com)**
- Pages: Home, MLS Search, Agents, Neighbourhoods, New Developments, Blog, Contact
- Title pattern: "Toronto Real Estate | Harvey Kalles Real Estate"
- H1 pattern: "Toronto's Independent Real Estate Leader Since 1957"
- Trust signals: Founded 1957, independent Toronto brokerage, hyper-local positioning
- Blog topics: monthly market updates, neighbourhood spotlights, buyer/seller guides

**Bosley Real Estate (bosleyrealestate.com)**
- Pages: Home, Listings, Agents, Neighbourhoods, The Bosley Report (blog), Market Stats, About
- Title pattern: "Toronto Real Estate | Bosley Real Estate"
- H1 pattern: "Knowledgeable. Neighbourly. Toronto's Real Estate Company."
- Trust signals: Founded 1928, neighbourhood-first brand, community involvement positioning
- Blog strategy: "The Bosley Report" — consistent market data posts that rank for Toronto market report queries monthly

### Common Page Structure Across Top Brokerages:
```
/                              → Home + featured listings
/buy                           → Buyer hub / MLS search
/sell                          → Seller hub / home evaluation CTA
/listings                      → All active listings
/listings/[neighbourhood]      → Neighbourhood listing pages
/neighbourhoods                → Neighbourhood guide hub
/neighbourhoods/[slug]         → Individual neighbourhood guide
/agents                        → Agent roster
/agents/[slug]                 → Individual agent profile page
/market-reports                → Market data hub
/market-reports/[month-year]   → Monthly market report
/blog                          → Content hub
/pre-construction              → New developments
/about                         → Brokerage story, awards
/contact                       → Office location + form
```

---

## 3. Title Tag Formulas That Work

### Brokerage / Agent Home
```
Toronto Real Estate Agent | [Agent/Company Name] | Buy & Sell in Toronto
[Agent Name] | Toronto Realtor | [Neighbourhood] Specialist | [Brokerage]
Top-Rated Toronto Real Estate Agent | [X] Homes Sold | [Company]
```

### Listing Pages (Dynamic)
```
[N]-Bed Home for Sale in [Neighbourhood], Toronto | [Company]
Condos for Sale in [Neighbourhood] Toronto | [Company]
Homes for Sale in [City] | [N] Active Listings | [Company]
```

### Neighbourhood Guide Pages
```
[Neighbourhood] Real Estate: Homes, Prices & Market Data | [Company]
Living in [Neighbourhood] Toronto: Real Estate Guide [Year] | [Company]
[Neighbourhood] Toronto Homes for Sale | [Company]
```

### Market Report Pages
```
Toronto Real Estate Market Report [Month Year] | [Company]
[Neighbourhood] Home Prices [Month Year]: Market Update | [Company]
Toronto Condo Market Report [Quarter Year] | [Company]
```

### Meta Description Formula
```
[Agent/Company] — [service] in [City/Neighbourhood]. [Trust signal]. Free [evaluation/consultation] — call or book online.
```

Example:
> "Toronto real estate agent specializing in Leslieville, The Annex, and Midtown. 150+ homes sold. Local market expertise, data-driven pricing. Free home evaluation — call or book online."

---

## 4. Real Estate SEO Fundamentals

### IDX Integration — What It Is and Why It Matters

IDX (Internet Data Exchange) is the system that allows real estate agents to display MLS listings on their own websites. In Canada, the equivalent is **DDF (Data Distribution Facility)** operated by CREA.

**In Toronto, the key data source is TRREB (Toronto Regional Real Estate Board).**

#### IDX Provider Options for Toronto
| Provider | Notes | Best For |
|---|---|---|
| **Repliers API** | Toronto-specific, best TRREB integration, used by HouseSigma | Custom Next.js builds |
| **CREA DDF** | National, free but limited update frequency | Budget-conscious agents |
| **iHomeFinder** | US-origin, limited Canadian coverage | Not recommended for Toronto |
| **Showcase IDX** | US-origin, some Canadian support | Limited |
| **Wovax / Realtyna** | WordPress-heavy | Not for Next.js |
| **Lofty (formerly Chime)** | Full CRM + IDX | Agents wanting all-in-one |

**Recommended for Next.js builds:** Repliers API — gives real-time TRREB data, works as a REST API, you control the front-end completely.

#### SEO Strategy for IDX Pages
IDX creates a fundamental SEO conflict: millions of listing pages that are duplicate content across every agent site.

**How to handle:**
1. **Noindex individual listing pages** (`<meta name="robots" content="noindex, follow">`) — avoid duplicate content penalties
2. **DO index neighbourhood search pages** — these aggregate listings and have unique content
3. **DO index price range / property type pages** — "condos for sale in King West"
4. **Canonical URLs** — if syndicating listings, point canonical to your own URL
5. **Schema markup on indexed listing pages** — RealEstateListing schema adds value

```tsx
// Next.js: Noindex individual listing pages
// app/listings/[mlsId]/page.tsx
export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

// But index search/neighbourhood pages
// app/neighbourhoods/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return {
    robots: { index: true, follow: true },
    // ... rest of metadata
  }
}
```

---

### Neighbourhood Landing Pages — The #1 SEO Asset

Neighbourhood pages are the most powerful SEO asset for a Toronto real estate site. They:
- Rank for "[neighbourhood name] real estate" and "homes for sale in [neighbourhood]"
- Build topical authority
- Convert buyers researching specific areas
- Cannot be easily replicated by national portals (they lack hyper-local content)

#### Toronto Neighbourhood Hierarchy

**Downtown Core**
- King West / King St W
- Queen West
- Entertainment District
- St. Lawrence Market
- Distillery District
- Corktown

**Central**
- The Annex
- Yorkville / Rosedale
- Forest Hill
- Leaside
- Davisville / Midtown
- Leslieville
- Riverdale
- Danforth / Greektown
- The Beaches (Beach)

**West End**
- The Junction
- Roncesvalles
- Parkdale
- High Park / Bloor West Village
- Etobicoke / Humber Bay Shores
- Mimico

**North**
- North York (Willowdale, Bayview Village)
- Don Mills
- Lawrence Park
- Bedford Park
- Yonge & Eglinton (Midtown)

**East**
- East York
- Scarborough (Agincourt, Rouge, Cliffside, Guildwood)
- Upper Beaches

**GTA**
- Mississauga (Port Credit, Streetsville, Meadowvale)
- Brampton (Bramalea, Heart Lake, Castlemore)
- Markham (Unionville, Cornell, Buttonville)
- Vaughan (Woodbridge, Maple, Kleinburg)
- Richmond Hill
- Oakville
- Burlington
- Ajax / Whitby / Oshawa

#### Neighbourhood Page Structure (Minimum 800 words)
```
H1: [Neighbourhood Name] Real Estate | Homes for Sale

[Intro: 150 words — neighbourhood character, who it appeals to, what makes it unique]

## [Neighbourhood] Real Estate Market
[Stats: average price, price trend YoY, days on market, list-to-sale ratio]
[Source: TRREB data or HouseSigma — updated monthly]

## Types of Homes in [Neighbourhood]
[Property types available: detached, semi, townhouse, condo — with price ranges]

## Why Buyers Choose [Neighbourhood]
[3–5 lifestyle reasons: walkability, transit, schools, parks, restaurants]

## Schools in [Neighbourhood]
[List public + Catholic + private schools with ratings if available]

## Transit in [Neighbourhood]
[TTC stops, GO stations, transit score]

## [Neighbourhood] Listings
[IDX feed filtered to this neighbourhood]

## Recently Sold in [Neighbourhood]
[Sold prices build trust and rank for "sold prices [neighbourhood]"]

## Frequently Asked Questions
[FAQ schema: Is [neighbourhood] a good place to live? What is the average home price?]

## [Company] in [Neighbourhood]
[Agent expertise, recent transactions, local knowledge]

[CTA: Looking to buy or sell in [Neighbourhood]? Contact us]
```

---

## 2. Long-Tail Keyword Strategy for Toronto Areas

### By Area (High Commercial Intent)
```
condos for sale King West Toronto
detached homes for sale Leslieville
semi-detached Riverdale for sale
townhouse for sale Markham under 900k
pre-construction condos Scarborough 2025
investment property Toronto east end
multiplex for sale Toronto
laneway house for sale Toronto
assignment condo sale Toronto
power of sale Toronto
```

### By Buyer Segment
```
first time home buyer Toronto agent
first time home buyer Toronto grant
toronto home buyer rebate 2025
buying a condo in Toronto tips
how to buy a house in Toronto step by step
toronto real estate agent reviews
best real estate agent toronto reddit
buyer's agent toronto fee
```

### By Property Type
```
luxury condos toronto $1 million+
penthouse for sale toronto
loft condos toronto for sale
live work loft toronto
coach house for sale toronto
heritage home for sale toronto
```

### By Life Stage / Situation
```
downsizing toronto condo agent
upsizing toronto from condo to house
divorce home sale toronto agent
estate sale toronto real estate
relocating to toronto real estate
moving from Vancouver to Toronto real estate
```

### Market Research Queries
```
toronto real estate market 2025
toronto condo prices 2025
is now a good time to buy in toronto
toronto real estate crash prediction
best neighbourhoods to invest toronto 2025
```

### Full Volume Estimates (Top Terms)
| Keyword | Est. Volume | Competition |
|---|---|---|
| Toronto real estate agent | 2,400–4,000/mo | Very High |
| condos for sale Toronto | 3,000–5,000/mo | Very High |
| houses for sale Toronto | 2,000–3,500/mo | Very High |
| buy home Toronto | 800–1,500/mo | High |
| Toronto MLS listings | 1,500–2,500/mo | Very High |
| real estate agent near me Toronto | 600–1,000/mo | High |

---

## 3. Content Types That Rank

### Monthly Market Reports
**Why:** Journalists, buyers, and investors all search for Toronto real estate market data monthly.

**Structure:**
```
Title: "Toronto Real Estate Market Report — [Month] [Year]"
H1: Toronto Real Estate Market: [Month] [Year] Update

Key Stats (above fold):
- Average detached price: $X
- Average condo price: $X
- Sales volume: X
- New listings: X
- Months of inventory: X
- Average days on market: X

## Sales Summary
## Price Trends by Property Type
## Neighbourhood Highlights
## Buyer vs. Seller Market Analysis
## Outlook: What to Expect Next Month
```

**Publishing cadence:** Within 3–5 days of TRREB releasing monthly stats (typically 2nd week of each month).

### Neighbourhood Guides (Evergreen)
- As described in Section 1
- Update market stats quarterly
- Add seasonal content (school year, spring market)
- Target: "best neighbourhoods in Toronto for families", "up and coming neighbourhoods toronto", "most affordable neighbourhoods toronto"

### Calculator Pages (High Ranking, Low Competition)

**Land Transfer Tax Calculator**
- "toronto land transfer tax calculator" — 800–1,200 searches/month
- Ontario LTT + Toronto Municipal LTT combined
- First-time buyer rebate applied automatically
- This page attracts serious buyers researching costs

**Closing Costs Calculator**
- "toronto closing costs calculator" — 400–700 searches/month
- Inputs: purchase price, type (new/resale), residency status
- Outputs: LTT, legal fees, title insurance, home inspection, adjustments

**Mortgage Payment Calculator**
- Already exists on most sites — differentiate by adding:
  - CMHC insurance calculation
  - Stress test calculator
  - Amortization comparison

**Rent vs. Buy Calculator**
- "should i rent or buy toronto calculator" — 200–400/month
- High-intent: these users are decision-makers
- Include: rent, purchase price, down payment, expected appreciation, investment return comparison

### School District Content
Parents frequently search "[school name] real estate" or "homes near [school] toronto"

```
Target searches:
"homes for sale near Rosedale Heights school toronto"
"houses near Northern Secondary School"
"Lawrence Park Collegiate catchment area homes"

Page structure:
- School overview (ratings, programs, specialties)
- Catchment boundary map
- Homes currently listed in catchment (IDX feed)
- Average prices in catchment
- "School catchment boundaries change — contact us to verify"
```

---

## 4. Schema Markup Types — Complete JSON-LD

### RealEstateListing Schema
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "3BR Detached Home in Leslieville, Toronto",
  "description": "Beautiful 3-bedroom detached home in Leslieville. Updated kitchen, hardwood floors, private parking, large backyard.",
  "url": "https://sathideals.com/listings/123-main-st",
  "image": [
    "https://sathideals.com/images/listings/123-main-hero.jpg",
    "https://sathideals.com/images/listings/123-main-kitchen.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M4M 1A1",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6693,
    "longitude": -79.3367
  },
  "offers": {
    "@type": "Offer",
    "price": "1299000",
    "priceCurrency": "CAD",
    "availability": "https://schema.org/InStock"
  },
  "numberOfRooms": 3,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": 1850,
    "unitCode": "FTK"
  }
}
```

### LocalBusiness Schema — Real Estate Agent
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Sathi Deals — Toronto Real Estate",
  "image": "https://sathideals.com/images/logo.jpg",
  "@id": "https://sathideals.com/#business",
  "url": "https://sathideals.com",
  "telephone": "+1-416-555-0200",
  "email": "info@sathideals.com",
  "description": "Toronto real estate agent specializing in residential homes, condos, and investment properties across the GTA.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "456 King St W",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M5V 1L3",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6445,
    "longitude": -79.3996
  },
  "areaServed": [
    {"@type": "City", "name": "Toronto"},
    {"@type": "City", "name": "Mississauga"},
    {"@type": "City", "name": "Brampton"},
    {"@type": "City", "name": "Markham"},
    {"@type": "City", "name": "Vaughan"},
    {"@type": "City", "name": "Richmond Hill"}
  ],
  "sameAs": [
    "https://www.facebook.com/sathideals",
    "https://www.instagram.com/sathideals",
    "https://www.linkedin.com/in/sathi"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "63",
    "bestRating": "5"
  }
}
```

### Person Schema — Agent Profile
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sathi [Last Name]",
  "jobTitle": "Real Estate Agent",
  "worksFor": {
    "@type": "RealEstateAgent",
    "@id": "https://sathideals.com/#business"
  },
  "url": "https://sathideals.com/about",
  "image": "https://sathideals.com/images/sathi-headshot.jpg",
  "telephone": "+1-416-555-0200",
  "email": "sathi@sathideals.com",
  "sameAs": [
    "https://www.linkedin.com/in/sathi",
    "https://www.instagram.com/sathideals"
  ],
  "knowsAbout": ["Toronto Real Estate", "GTA Condos", "Investment Properties", "Pre-Construction"]
}
```

### FAQPage Schema — Real Estate
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the average home price in Toronto in 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As of 2025, the average home price in Toronto is approximately $1.1–$1.2 million for all property types combined. Detached homes average $1.5–$2M+, semi-detached homes $1–$1.3M, townhouses $800K–$1.1M, and condos $650K–$800K. Prices vary significantly by neighbourhood."
      }
    },
    {
      "@type": "Question",
      "name": "How much is land transfer tax in Toronto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toronto buyers pay two land transfer taxes: Ontario's provincial LTT and Toronto's municipal LTT. Combined, on a $1M purchase the total LTT is approximately $32,950. First-time buyers receive a rebate of up to $8,475 on the provincial portion and up to $4,475 on the municipal portion."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a buyer's agent to buy a home in Toronto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You don't legally need a buyer's agent, but it's strongly recommended. The seller pays both agents' commissions in most Toronto transactions, so a buyer's agent costs you nothing. They provide access to off-market listings, negotiation expertise, and legal protection through RECO-regulated representation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the mortgage stress test in Canada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The mortgage stress test requires Canadian borrowers to qualify at the higher of: their contract rate + 2%, or 5.25%. This means if you're offered a 5% mortgage rate, you must qualify as if paying 7%. This reduces the maximum mortgage you can borrow by approximately 20%."
      }
    }
  ]
}
```

### BreadcrumbList — Neighbourhood Page
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://sathideals.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Toronto Neighbourhoods",
      "item": "https://sathideals.com/toronto-neighbourhoods"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Leslieville Real Estate",
      "item": "https://sathideals.com/toronto-neighbourhoods/leslieville"
    }
  ]
}
```

---

## 5. Next.js Metadata API — Listing Pages with Dynamic OG Images

```tsx
// app/listings/[slug]/page.tsx — individual listing with dynamic OG
import type { Metadata } from 'next'

type ListingData = {
  address: string
  neighbourhood: string
  price: number
  beds: number
  baths: number
  sqft: number
  slug: string
}

async function getListing(slug: string): Promise<ListingData> {
  return fetch(`https://yoursite.ca/api/listings/${slug}`).then((r) => r.json())
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const listing = await getListing(params.slug)
  const title = `${listing.beds}-Bed, ${listing.baths}-Bath Home in ${listing.neighbourhood} | YourCompany`
  const description = `${listing.beds} bed · ${listing.baths} bath · ${listing.sqft.toLocaleString()} sq ft in ${listing.neighbourhood}, Toronto. Listed at $${listing.price.toLocaleString()} CAD. View photos and book a showing.`

  return {
    title,
    description,
    // Noindex individual listing pages to avoid duplicate content with realtor.ca/Repliers
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://yoursite.ca/listings/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://yoursite.ca/listings/${params.slug}`,
      siteName: 'YourCompany Real Estate',
      images: [
        {
          // Dynamic OG image via Vercel OG route handler — see below
          url: `https://yoursite.ca/api/og/listing?address=${encodeURIComponent(listing.address)}&neighbourhood=${encodeURIComponent(listing.neighbourhood)}&price=${listing.price}&beds=${listing.beds}`,
          width: 1200,
          height: 630,
          alt: `${listing.address}, ${listing.neighbourhood}, Toronto — ${listing.beds} bed home for sale`,
        },
      ],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
```

```tsx
// app/api/og/listing/route.tsx — dynamic OG image with @vercel/og
// Generates a branded OG image for every listing at build/request time
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address') ?? ''
  const neighbourhood = searchParams.get('neighbourhood') ?? 'Toronto'
  const price = Number(searchParams.get('price') ?? 0)
  const beds = searchParams.get('beds') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          padding: '60px 70px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22, opacity: 0.6, letterSpacing: 2, textTransform: 'uppercase' }}>
            YourCompany Real Estate
          </div>
        </div>

        {/* Listing details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 18, color: '#94a3b8', marginBottom: 12 }}>
            {neighbourhood} · Toronto, ON
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
            {address}
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: '#f59e0b',
              marginBottom: 16,
            }}
          >
            ${price.toLocaleString()} CAD
          </div>
          {beds && (
            <div style={{ fontSize: 24, color: '#94a3b8' }}>{beds} Bedrooms · For Sale</div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.4 }}>
          <div style={{ fontSize: 18 }}>yoursite.ca</div>
          <div style={{ fontSize: 18 }}>RECO Registered</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

```tsx
// app/neighbourhoods/[slug]/page.tsx — neighbourhood guide (DO index these)
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

const neighbourhoodData: Record<string, { name: string; avgPrice: string }> = {
  'leslieville':   { name: 'Leslieville',   avgPrice: '$1.1M–$1.5M' },
  'the-annex':    { name: 'The Annex',      avgPrice: '$1.4M–$2.2M' },
  'the-beaches':  { name: 'The Beaches',    avgPrice: '$1.3M–$1.9M' },
  'roncesvalles': { name: 'Roncesvalles',   avgPrice: '$1.1M–$1.6M' },
  'north-york':   { name: 'North York',     avgPrice: '$900K–$1.4M' },
  'etobicoke':    { name: 'Etobicoke',      avgPrice: '$900K–$1.5M' },
  'scarborough':  { name: 'Scarborough',    avgPrice: '$750K–$1.1M' },
}

export async function generateStaticParams() {
  return Object.keys(neighbourhoodData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = neighbourhoodData[params.slug]
  const name = data?.name ?? params.slug
  return {
    title: `${name} Real Estate: Homes for Sale & Market Data | YourCompany`,
    description: `${name} real estate guide. Current listings, average prices (${data?.avgPrice ?? ''}), market trends, schools, and neighbourhood profile. Updated regularly.`,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://yoursite.ca/neighbourhoods/${params.slug}`,
    },
    openGraph: {
      title: `${name} Real Estate Guide | YourCompany`,
      description: `Homes for sale in ${name}, Toronto. Market data and listings updated regularly.`,
      url: `https://yoursite.ca/neighbourhoods/${params.slug}`,
    },
  }
}
```

---

## 6. Competitive Landscape

### Who Sathi Deals Competes Against

| Competitor | Domain Authority | Strength | Weakness |
|---|---|---|---|
| Realtor.ca | Very high | All MLS listings, CREA-backed | No local personality, generic |
| Zoocasa | High | Market reports, data journalism | No personal relationship |
| REW.ca | High | West coast origin, strong BC | Less Toronto-specific |
| Zolo.ca | High | Data-heavy, sold prices | Content feels automated |
| HouseSigma | Medium–High | Best sold price data | Limited content |
| Condos.ca | Medium | Pre-construction focus | Narrow scope |
| Point2Homes | Medium | International audience | Low quality feel |

### How to Beat Aggregators
1. **Hyper-local content** aggregators can't replicate — personal neighbourhood expertise, community involvement
2. **Video content** — neighbourhood tours, market update videos rank in Google Video results
3. **Social proof from real transactions** — "just sold above asking in Leslieville — here's how"
4. **Response speed** — aggregators send leads to multiple agents; personal agents who respond within 5 min win
5. **Long-tail + specific content** — aggregators chase volume terms; win on "3BR detached homes under $1.5M in Leaside"

---

## 6. Google Business Profile — Real Estate Agent

### Category Setup
- **Primary:** Real Estate Agent
- **Secondary:** Real Estate Agency, Property Management Company (if applicable)

### Services to List
- Buyer Representation
- Seller Representation
- Condo Sales
- Investment Properties
- Pre-Construction Sales
- Relocation Services
- First-Time Buyer Services

### Post Strategy
- **Just Listed:** New listing photos + key details + CTA "Book a showing"
- **Just Sold:** Sold price, days on market, "sold above asking" — social proof
- **Market Update:** Monthly stats with "message me for neighbourhood breakdown"
- **Buyer/Seller Tip:** Educational content — builds authority

### Areas Served
Set up all GTA cities: Toronto, North York, Scarborough, Etobicoke, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, Burlington, Ajax, Whitby
