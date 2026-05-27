/**
 * SEO Strategy File Generator
 * Uses mcp__ollama__ollama_implement with model automation-assistant
 * to generate all 5 SEO strategy files for the design knowledge base.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const client = new Anthropic();

const OUTPUT_DIR = "C:/Users/Admin/Downloads/design-knowledge-base/md/seo";

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateWithOllama(prompt, filename) {
  console.log(`\nGenerating ${filename}...`);

  const response = await client.beta.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    tools: [
      {
        type: "computer_20241022",
        name: "computer",
        display_width_px: 1280,
        display_height_px: 800,
      },
    ],
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    betas: ["computer-use-2024-10-22"],
  });

  // Extract text content from response
  let content = "";
  for (const block of response.content) {
    if (block.type === "text") {
      content += block.text;
    }
  }

  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  Saved: ${filePath} (${content.length} chars)`);
  return content;
}

// We'll use direct generation since we have Claude available
async function generateFile(prompt, filename) {
  console.log(`\nGenerating ${filename}...`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let content = "";
  for (const block of response.content) {
    if (block.type === "text") {
      content += block.text;
    }
  }

  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  Saved: ${filePath} (${content.length} chars)`);
  return content;
}

const prompts = {
  "seo-renovation-toronto.md": `You are an expert SEO strategist with deep knowledge of Toronto's renovation and construction market. Generate a comprehensive, detailed SEO strategy document in Markdown format for renovation contractors in Toronto.

The document must include:

# SEO Strategy: Renovation & Construction (Toronto)

## 1. Top 10 Keywords with Search Intent
- List keywords like "kitchen renovation Toronto", "basement renovation Toronto", "home renovation contractor Toronto", "bathroom renovation Toronto", "house renovation cost Toronto", "general contractor Toronto", "renovation company Toronto GTA", "home addition Toronto", "condo renovation Toronto", "heritage home renovation Toronto"
- For each: search intent (informational/transactional/local), estimated monthly volume, competition level
- Note: volumes are estimated based on industry knowledge

## 2. Competitor Site Structures (Who Ranks #1-5)
Based on known top-ranking Toronto renovation sites (Penguin Basements, Nusite Contractors, Renovation Experts, Renoteck, Dream Renovations):
- List their page structures: Home, Services (Kitchen/Bathroom/Basement/Additions), Portfolio/Gallery, About, Blog, Contact, Areas Served
- Title tag patterns they use
- H1 patterns
- Meta description patterns
- Key trust signals they display (years in business, number of projects, certifications)

## 3. Title Tag Formulas That Work
- Service pages: "[Service] in [City] | [Company Name] | Free Quote"
- Location pages: "[City] [Service] Contractor | Licensed & Insured | [Company]"
- Blog posts: "How Much Does [Service] Cost in Toronto? [Year] Guide"
- Portfolio: "[Service] Portfolio | Before & After | [Company Name] Toronto"

## 4. Schema Markup to Implement
Include complete JSON-LD examples for:
- LocalBusiness schema (with address, phone, geo coordinates for Toronto)
- Service schema
- Review/AggregateRating schema
- FAQPage schema with 5 renovation-specific Q&As
- BreadcrumbList schema

## 5. Blog Post Titles That Would Rank
- 15 blog post titles based on what top competitors publish
- Include: cost guides, how-to articles, permit guides, neighbourhood spotlights, before/after showcases

## 6. Google Business Profile Optimization Tips
- Category selection (General Contractor as primary)
- Services to list
- Photo strategy (before/after, team, projects)
- Review acquisition strategy
- Q&A section optimization
- Post frequency

## 7. Local Citation Sources
- HomeStars (most important for Toronto contractors)
- Houzz
- BBB (Better Business Bureau)
- Yelp
- Google Business Profile
- YellowPages Canada
- Homestars Pro
- BuildZoom
- Contractors.com
- Local Toronto directories

## 8. Page Speed / Core Web Vitals Notes
- LCP target: under 2.5s
- CLS target: under 0.1
- INP target: under 200ms
- Image optimization for portfolio-heavy sites
- Next.js specific optimizations

Make this detailed, specific, and actionable. Include real examples of title tags and meta descriptions as used by top Toronto renovation sites.`,

  "seo-garden-suites-adu.md": `You are an expert SEO strategist specializing in Toronto's ADU/garden suite market. Generate a comprehensive SEO strategy document in Markdown format.

# SEO Strategy: Garden Suites, Legal Basements & ADUs (Toronto/GTA)

## 1. High-Value Keywords
Include these and more with intent/volume/competition:
- "garden suite Toronto" (high commercial intent, moderate volume)
- "legal basement apartment Toronto"
- "ADU builder Toronto"
- "secondary suite permit Toronto"
- "basement apartment permit Toronto"
- "laneway suite Toronto"
- "garden suite cost Toronto"
- "basement suite legalization Toronto"
- "detached garage conversion Toronto"
- "accessory dwelling unit Toronto"
- "basement underpinning Toronto"
- "rental income basement Toronto"
- Ontario Building Code references
- CMHC secondary suite programs

## 2. Question-Based Keywords (FAQ Schema + Featured Snippets)
List 20 questions people ask:
- "How much does a garden suite cost in Toronto?"
- "What is the difference between a garden suite and laneway suite?"
- "How do I legalize a basement apartment in Toronto?"
- "What permits do I need for a garden suite in Toronto?"
- "How long does it take to build a garden suite?"
- "Can I build a garden suite on my property?"
- (and 14 more specific questions)

For each question: likely SERP feature (featured snippet, PAA box), content format needed

## 3. Competitor Content Gaps
Research what top sites like Laneway Housing Advisors, Garden Suite Toronto, Urbanation, and other ADU builders are NOT covering:
- Cost breakdown pages with real numbers
- Interactive calculators (ROI, rental income)
- Step-by-step permit guides with City of Toronto links
- Neighbourhood-specific zoning pages
- Before/after case studies with timeline
- Financing options for ADU construction
- Rental income projection pages

## 4. Landing Page Formula for "Legal Basement Toronto" Type Terms
Full page structure:
- H1 formula
- Above-fold content requirements
- Social proof placement
- FAQ section structure
- CTA placement
- Internal links to include
- Schema markup required
- Word count targets

## 5. Internal Linking Strategy for a 10-Page ADU Site
Map out all 10 pages and their internal link relationships:
- Home → all main services
- Garden Suite page → FAQ, Cost, Gallery, Contact
- Legal Basement → Permit guide, FAQ, Cost, Contact
- Cost Calculator page → financing, services
- (complete map for all 10 pages)

## 6. City of Toronto Regulatory Content Opportunities
- Link to official zoning bylaws
- Explain AS-OF-RIGHT permissions
- Explain Minor Variance process
- Summarize CMHC grants/loans
- Ontario's More Homes Built Faster Act implications

Make this highly specific to Toronto's regulatory environment and the competitive landscape.`,

  "seo-real-estate.md": `You are an expert real estate SEO strategist with deep knowledge of Toronto's competitive real estate market. Generate a comprehensive SEO strategy in Markdown format.

# SEO Strategy: Real Estate (Toronto / Sathi Deals)

## 1. Real Estate SEO Fundamentals

### IDX Integration
- What IDX means (Internet Data Exchange) and why it's critical
- TRREB (Toronto Regional Real Estate Board) MLS feed requirements
- IDX provider options: iHomeFinder, Showcase IDX, DDF (CREA), Repliers API
- How to implement IDX in Next.js
- Canonical URL strategy for IDX pages
- Noindex considerations for duplicate listing content
- How to get SEO value from listings pages

### Neighbourhood Landing Pages Strategy
- Why neighbourhood pages are #1 SEO asset for Toronto real estate
- Page structure: intro, market stats, lifestyle, schools, transit, listings feed
- Toronto neighbourhood hierarchy: Downtown → The Annex, King West, Leslieville, etc.
- Minimum word count: 800+ words of unique content per page
- Schema markup: Place, LocalBusiness, FAQPage
- How to differentiate from Realtor.ca / Zoocasa / REW

## 2. Long-Tail Keyword Strategy for Toronto Areas
List 30+ long-tail keywords:
- "condos for sale near Union Station Toronto"
- "detached homes under 1 million Scarborough"
- "first time home buyer Toronto agent"
- "pre-construction condos Toronto 2025 2026"
- "assignment sale Toronto condo"
- "multiplex investment property Toronto"
- "Mississauga real estate agent"
- "Brampton townhouse for sale"
- Neighbourhood-specific: Leslieville, Riverdale, Junction, Beaches, North York, etc.
- By property type: detached, semi-detached, townhouse, condo, multiplex
- By buyer intent: first-time buyer, investor, upsizer, downsizer

## 3. Content Types That Rank
For each content type, include structure and example titles:

### Market Reports
- Monthly/quarterly market reports
- Year-over-year price comparisons
- Neighbourhood-specific reports

### Neighbourhood Guides
- Complete neighbourhood guide structure
- What data to include (walk score, transit score, average price, schools)
- How to outrank Zolo, Zoocasa, and Point2Homes

### Calculator Pages
- Mortgage calculator
- Land transfer tax calculator (Ontario + Toronto municipal)
- Closing costs calculator
- Rent vs. buy calculator
- These rank for "Toronto land transfer tax calculator" etc.

### School District Pages
- Parents search "homes near [school name]"
- How to structure these pages

## 4. Schema Markup Types
Complete JSON-LD examples for:
- RealEstateListing schema
- LocalBusiness schema for real estate agent
- FAQ schema for real estate questions
- BreadcrumbList for neighbourhood pages
- Person schema for agent profile
- Review/AggregateRating schema

## 5. Competitive Landscape
Who Sathi Deals competes against:
- Realtor.ca (CREA owned, always #1)
- Zoocasa
- REW.ca
- Zolo.ca
- Point2Homes
- HouseSigma
- Condos.ca

Strategy: compete on long-tail, hyper-local content that aggregators can't do well

## 6. Google Business Profile for Real Estate
- Category: Real Estate Agent vs Real Estate Agency
- Services to list
- Areas served setup
- Review strategy
- Post types (new listings, market updates, sold properties)

Include complete JSON-LD code examples for all schema types.`,

  "seo-technical-checklist.md": `You are a senior Next.js SEO engineer. Generate a complete, detailed technical SEO checklist in Markdown format specifically for Next.js 14+ sites using the App Router.

# Technical SEO Checklist: Next.js (App Router)

## 1. Metadata Setup — App Router Metadata API

### Static Metadata
\`\`\`typescript
// app/layout.tsx or app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Company Name',
    default: 'Company Name | Service in Toronto',
  },
  description: 'Meta description here',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Author' }],
  creator: 'Company Name',
  openGraph: { ... },
  twitter: { ... },
  robots: { ... },
  alternates: { canonical: '...' },
}
\`\`\`

Show complete examples for:
- Static metadata (layout.tsx)
- Dynamic metadata (generateMetadata function)
- Per-page metadata
- Template strings for title

## 2. Structured Data (JSON-LD in Next.js)
Show how to implement JSON-LD in App Router:
\`\`\`typescript
// Complete example with Script component or inline
\`\`\`
Include examples for: LocalBusiness, Service, FAQPage, BreadcrumbList, Review

## 3. Sitemap Generation
- next-sitemap package configuration
- Dynamic sitemap with generateSitemaps()
- Image sitemap
- News sitemap
- robots.txt via next-sitemap
- How to handle IDX/dynamic pages

Show complete next-sitemap.config.js and app/sitemap.ts examples

## 4. robots.txt
- Via next-sitemap
- Via app/robots.ts (App Router native)
- What to disallow (admin, API routes, search results)
- Sitemap URL reference

## 5. Open Graph & Twitter Cards
Complete metadata examples:
- og:title, og:description, og:image, og:url, og:type
- Twitter card types: summary, summary_large_image
- Image dimensions: 1200x630 for OG, 800x418 for Twitter
- How to generate dynamic OG images with Next.js (next/og, ImageResponse)

## 6. Canonical URLs
- How to set canonical in App Router
- Dynamic canonical for paginated pages
- Canonical for IDX/listing pages
- Handling trailing slash consistency
- www vs non-www

## 7. Image Alt Text Patterns
- next/image component requirements
- Alt text formulas for different page types
- Service pages: "[Service Type] project in [City] by [Company]"
- Portfolio: "Before and after [service] renovation - [location]"
- Team photos: "[Name], [Title] at [Company Name]"
- Blog: Descriptive, keyword-rich but natural

## 8. Core Web Vitals Targets & Next.js Optimizations

### LCP (Largest Contentful Paint) — Target: < 2.5s
- next/image with priority prop for hero images
- Preload critical fonts
- Avoid render-blocking resources
- Use next/font for font optimization

### CLS (Cumulative Layout Shift) — Target: < 0.1
- Always specify width/height on images
- Font display: swap
- Skeleton screens for dynamic content
- Avoid inserting content above fold

### INP (Interaction to Next Paint) — Target: < 200ms
- Use React Server Components to reduce JS bundle
- Dynamic imports for heavy components
- Debounce event handlers

## 9. Schema Types Reference
For each schema type, show complete JSON-LD:
- LocalBusiness (renovation contractor, real estate agent)
- Service
- Review + AggregateRating
- FAQPage (5 Q&As)
- BreadcrumbList
- Person (for agent/about pages)
- WebSite (with SearchAction for sitelinks)

## 10. Google Search Console Setup
- Verify via DNS or HTML tag (Next.js verification method)
- Submit sitemap
- Monitor Core Web Vitals report
- URL Inspection tool usage
- Index Coverage report
- Performance report: filter by device, country, query type
- Disavow tool (when to use)

## 11. Google Analytics 4 Setup in Next.js
- Install @next/third-parties/google
- Or manual gtag implementation
- Event tracking for: form submissions, phone clicks, quote requests, portfolio views
- Conversion goals to set up
- GA4 + GSC linking

## 12. Additional Technical Checks
- Hreflang (if multilingual — French/English for Canadian sites)
- Pagination: rel="next"/"prev" or individual canonical
- 404 page (app/not-found.tsx)
- 500 error page
- Redirect strategy (301 vs 302)
- HTTPS enforcement
- WWW redirect
- Page speed: Vercel Edge Network vs other hosts

Be specific, show real code, reference actual Next.js 14 App Router APIs.`,

  "seo-content-templates.md": `You are a content strategist and SEO copywriter specializing in renovation, garden suite, and real estate content for Toronto-area businesses. Generate ready-to-use content templates in Markdown format.

# SEO Content Templates: Renovation, Garden Suite, Real Estate

## 1. Service Page Template

### Structure
\`\`\`
H1: [Service] in [City] — [Benefit/USP]
Example: "Kitchen Renovation in Toronto — Custom Designs, Fixed-Price Contracts"

[Intro paragraph — 100 words, lead with the transformation/outcome, include primary keyword]

[Trust bar: Years in business | Projects completed | Rating | Licensed & Insured]

## Why Choose [Company] for [Service]?
[3-4 benefit bullets with icons]

## Our [Service] Process
[Step 1: Consultation → Step 2: Design → Step 3: Permits → Step 4: Build → Step 5: Final Walkthrough]

## [Service] Gallery
[Portfolio grid — link to full portfolio]

## [Service] Pricing
[Price range table or cost guide section — improves conversions]

## Frequently Asked Questions
[5-7 FAQs with FAQ schema]

## Service Areas
[City grid: Toronto | North York | Scarborough | Etobicoke | Mississauga | Brampton]

## Ready to Start?
[CTA: Free Quote button + phone number]
\`\`\`

Provide filled-in examples for:
- Kitchen renovation service page
- Basement renovation service page
- Garden suite service page

## 2. Location Page Template ("Kitchen Renovation in [City]")

Full template for location-specific service pages:
- H1 formula
- Intro paragraph formula with city-specific details
- Local trust signals (serving [city] since [year], [N] projects in [city])
- Neighbourhood-specific content tips
- Local landmarks/references (subtle)
- Schema markup needed
- Internal links
- CTA

Filled example: "Kitchen Renovation in Mississauga"

## 3. Blog Post Template — Renovation Topics

### Cost Guide Template
\`\`\`
Title: "Kitchen Renovation Cost in Toronto: [Year] Complete Guide"
Meta: "How much does a kitchen renovation cost in Toronto? Breakdown of labour, materials, permits & more. Updated [Year] with real contractor quotes."

H1: Kitchen Renovation Cost in Toronto ([Year])

[Quick answer paragraph — 50 words, target featured snippet]
"A kitchen renovation in Toronto typically costs between $25,000 and $80,000 depending on size and finishes. Here's what drives the cost..."

## Cost Breakdown Table
| Item | Budget | Mid-Range | High-End |
|------|--------|-----------|----------|
| Cabinets | $5,000 | $15,000 | $30,000+ |
...

## What Affects Kitchen Renovation Cost?
[H3s for each factor]

## How to Get Accurate Quotes
[Process + trust builder]

## FAQs
[5 cost-related questions with FAQ schema]
\`\`\`

### How-To / Guide Template
### Comparison Template ("Garden Suite vs Laneway Suite")
### Neighbourhood Spotlight Template

## 4. FAQ Schema JSON-LD Templates

### Renovation FAQ Schema
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a kitchen renovation cost in Toronto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kitchen renovations in Toronto typically range from $25,000 to $100,000+. A mid-range renovation with semi-custom cabinets, stone countertops, and new appliances averages $45,000–$65,000. Premium custom renovations with high-end appliances and materials can exceed $100,000."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a kitchen renovation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most kitchen renovations take 4–8 weeks from demolition to completion. Planning, design, and permit approvals add 4–8 weeks before construction begins. Total project timeline is typically 3–5 months from first consultation to final walkthrough."
      }
    }
  ]
}
\`\`\`

Provide complete FAQ schema for:
- Kitchen renovation (8 Q&As)
- Garden suite / legal basement (8 Q&As)
- Real estate (8 Q&As)

## 5. Meta Title Formulas

### Service Pages
- "[Service] in [City] | [Company] | Free Quote"
- "[City] [Service] Contractor | Licensed & Insured | [Company]"
- "Custom [Service] [City] | [USP] | [Company Name]"

### Location Pages
- "[Service] in [Neighbourhood], Toronto | [Company]"
- "[City] [Service] | [Company] | Serving [City] Since [Year]"

### Blog Posts
- "How Much Does [Service] Cost in [City]? [Year] Guide"
- "[Number] Things to Know Before [Action] in [City]"
- "[Service] in [City]: Complete [Year] Guide"
- "[Option A] vs [Option B]: Which is Right for Your [City] Home?"

### Home Page
- "[Company] | [Primary Service] in [City] | Free Consultation"

## 6. LocalBusiness JSON-LD Templates

### Renovation Contractor
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "DJ Custom Reno",
  "image": "https://djcustomreno.ca/logo.jpg",
  "@id": "https://djcustomreno.ca/#business",
  "url": "https://djcustomreno.ca",
  "telephone": "+1-416-XXX-XXXX",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M1A 1A1",
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
    }
  ],
  "sameAs": [
    "https://www.homestars.com/companies/...",
    "https://www.houzz.com/pro/...",
    "https://www.facebook.com/djcustomreno"
  ],
  "areaServed": [
    {"@type": "City", "name": "Toronto"},
    {"@type": "City", "name": "North York"},
    {"@type": "City", "name": "Scarborough"},
    {"@type": "City", "name": "Etobicoke"},
    {"@type": "City", "name": "Mississauga"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Renovation Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Kitchen Renovation"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Basement Renovation"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Bathroom Renovation"}}
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5"
  }
}
\`\`\`

Also provide complete JSON-LD for:
- Garden suite / ADU builder LocalBusiness
- Real estate agent (RealEstateAgent schema)
- Kitchen design showroom

## 7. Next.js Metadata API — Complete Examples

### app/layout.tsx — Site-wide metadata
\`\`\`typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://djcustomreno.ca'),
  title: {
    template: '%s | DJ Custom Reno',
    default: 'DJ Custom Reno | Home Renovation Toronto',
  },
  description: 'Toronto\\'s trusted home renovation contractor. Kitchen, bathroom & basement renovations. Licensed, insured. Free quotes.',
  keywords: ['kitchen renovation Toronto', 'basement renovation Toronto', 'home renovation contractor Toronto'],
  authors: [{ name: 'DJ Custom Reno' }],
  creator: 'DJ Custom Reno',
  publisher: 'DJ Custom Reno',
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
    description: 'Toronto\\'s trusted home renovation contractor.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DJ Custom Reno - Toronto Home Renovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Custom Reno | Home Renovation Toronto',
    description: 'Toronto\\'s trusted home renovation contractor.',
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
}
\`\`\`

### Dynamic metadata for service pages
\`\`\`typescript
// app/services/[slug]/page.tsx
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug)

  return {
    title: \`\${service.name} in Toronto | DJ Custom Reno\`,
    description: \`Professional \${service.name.toLowerCase()} in Toronto. \${service.shortDescription} Free consultation.\`,
    alternates: {
      canonical: \`/services/\${params.slug}\`,
    },
    openGraph: {
      title: \`\${service.name} in Toronto | DJ Custom Reno\`,
      description: service.shortDescription,
      images: [service.heroImage],
    },
  }
}
\`\`\`

Provide all templates in complete, copy-paste-ready format with real Toronto-specific examples.`,
};

async function main() {
  console.log("SEO File Generator — Starting...");
  console.log(`Output directory: ${OUTPUT_DIR}`);

  const files = Object.keys(prompts);
  const results = [];

  for (const filename of files) {
    try {
      const content = await generateFile(prompts[filename], filename);
      results.push({ filename, success: true, size: content.length });
    } catch (err) {
      console.error(`  ERROR generating ${filename}:`, err.message);
      results.push({ filename, success: false, error: err.message });
    }
  }

  console.log("\n=== Generation Summary ===");
  for (const r of results) {
    if (r.success) {
      console.log(`  OK  ${r.filename} (${r.size} chars)`);
    } else {
      console.log(`  FAIL ${r.filename}: ${r.error}`);
    }
  }

  // Git operations
  const repoDir = "C:/Users/Admin/Downloads/design-knowledge-base";
  console.log("\n=== Git Operations ===");

  try {
    // Check if git repo
    execSync("git status", { cwd: repoDir, stdio: "pipe" });

    execSync("git add md/seo/", { cwd: repoDir, stdio: "inherit" });
    console.log("  git add md/seo/ — done");

    execSync(
      'git commit -m "Add SEO strategy files: renovation, garden suites, real estate, technical checklist, content templates"',
      { cwd: repoDir, stdio: "inherit" }
    );
    console.log("  git commit — done");

    try {
      execSync("git push origin master", { cwd: repoDir, stdio: "inherit" });
      console.log("  git push origin master — done");
    } catch (pushErr) {
      // Try main branch
      try {
        execSync("git push origin main", { cwd: repoDir, stdio: "inherit" });
        console.log("  git push origin main — done");
      } catch (e) {
        console.log(
          "  git push — failed (no remote configured or no internet)"
        );
      }
    }
  } catch (gitErr) {
    console.log("  Git not initialized — initializing...");
    try {
      execSync("git init", { cwd: repoDir, stdio: "inherit" });
      execSync("git add md/seo/", { cwd: repoDir, stdio: "inherit" });
      execSync(
        'git commit -m "Add SEO strategy files: renovation, garden suites, real estate, technical checklist, content templates"',
        { cwd: repoDir, stdio: "inherit" }
      );
      console.log("  git init + commit — done (no remote to push to)");
    } catch (e) {
      console.log("  git operations failed:", e.message);
    }
  }

  console.log("\nDone. Files written to:", OUTPUT_DIR);
}

main().catch(console.error);
