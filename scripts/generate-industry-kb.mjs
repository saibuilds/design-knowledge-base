#!/usr/bin/env node
/**
 * generate-industry-kb.mjs
 * Generates Awwwards industry-specific pattern files (real estate, hotels, construction)
 * and standalone HTML demos for the design knowledge base.
 *
 * Stack context: Next.js 14, React, TypeScript, Tailwind v3,
 *                Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber
 * Target domain: renovation contractors, garden suite builders, real estate agents, luxury properties
 */

import { Ollama } from "ollama";
import fs from "fs";
import path from "path";

const ollama = new Ollama({ host: "http://127.0.0.1:11434" });
const MODEL = "automation-assistant";

const MD_DIR =
  "C:/Users/Admin/Downloads/design-knowledge-base/md/reference-sites/awwwards";
const HTML_DIR =
  "C:/Users/Admin/Downloads/design-knowledge-base/html-demos/industry-html-examples";

// ─── helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generate(prompt) {
  const res = await ollama.chat({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    options: { num_predict: 8192, temperature: 0.3 },
  });
  return res.message.content.trim();
}

// ─── shared context ──────────────────────────────────────────────────────────

const STACK = `
Stack context: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS v3,
Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis (smooth scroll), React Three Fiber + Drei.
Target projects: renovation contractors, garden suite / ADU builders, real estate agents, luxury property sites.
`;

const CODE_RULES = `
Rules for code snippets:
- All TSX/JS must be complete, importable, and use real library APIs only.
- No hallucinated component names or fake props.
- Framer Motion: use motion.div, useScroll, useTransform, useSpring, AnimatePresence.
- GSAP: gsap.to/from/timeline, ScrollTrigger.create, scrub, pin.
- Lenis: new Lenis(), raf loop with lenis.raf(time).
- Tailwind: utility classes only, no custom CSS unless necessary.
`;

// ─── prompts ─────────────────────────────────────────────────────────────────

const REAL_ESTATE_ARCH_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a comprehensive Markdown file titled "# Award-Winning Real Estate & Architecture Sites — Awwwards Analysis".

## Context
We build websites for renovation contractors, garden suite builders, real estate agents, and luxury property developers.
The following analysis is drawn from Awwwards category pages:
- https://www.awwwards.com/websites/real-estate/
- https://www.awwwards.com/websites/architecture/
- https://www.awwwards.com/search/?text=real+estate
- https://www.awwwards.com/search/?text=architecture+studio

---

## 1. Overview — What Makes Real Estate / Architecture Sites Win Awards
Write 3–4 paragraphs covering:
- The shift from listing-heavy portals to editorial property storytelling
- Role of large-scale imagery and video in converting luxury buyers
- How architecture firms differentiate with concept-driven web experiences
- Typography as a signal of brand positioning (serif editorial vs. clean sans)

---

## 2. Award-Winning Site Profiles

Cover these 15 real estate and architecture firm sites. Use your training knowledge of sites that have appeared on Awwwards or similar award platforms (Behance, FWA, CSS Design Awards) in the real estate / architecture / property space. Include both actual award winners you know of and sites representative of award-level quality in this sector:

1. Zaha Hadid Architects (zaha-hadid.com)
2. BIG – Bjarke Ingels Group (big.dk)
3. Studio Gang (studiogang.com)
4. Snøhetta (snohetta.com)
5. Foster + Partners (fosterandpartners.com)
6. Henning Larsen (henninglarsen.com)
7. One&Only Private Homes (oneandonlyprivatehomes.com)
8. Related (related.com) — luxury NYC real estate
9. LVMH Real Estate / Louis Vuitton Residences (representative luxury residential)
10. The Boundary (the-boundary.com) — architectural visualization
11. Dwell (dwell.com) — architecture editorial
12. Sotheby's International Realty (sothebysrealty.com)
13. Christie's International Real Estate (christiesrealestate.com)
14. Douglas Elliman (elliman.com)
15. Compass (compass.com)

For EACH site write:

### [Number]. [Site Name] ([URL])
**Category:** [luxury real estate | architecture firm | property developer | editorial | visualization]
**Hero Treatment:** (video bg / full-bleed image / 3D / parallax / Ken Burns — be specific)
**Color Palette:** (describe: dark luxury / earthy organic / clean white / warm neutral — give approximate hex codes)
**Typography:** (serif display / editorial / clean sans / mixed — font names if known)
**Key Interactions:** (scroll behaviors, hover effects, cursor, 3D elements)
**Navigation Style:** (minimal overlay / sidebar / mega menu / sticky transparent)
**What Makes It Award-Worthy:**
- Bullet list of 4–6 specific techniques and design decisions

**Code Pattern (Replicable):**
Provide a working TSX snippet implementing the most distinctive technique from this site.
The snippet must use the stack above and be directly applicable to a renovation or real estate site.

**Relevance to Our Projects:**
1–2 sentences on direct application to renovation contractor, garden suite builder, or real estate agent sites.

---

## 3. Code Patterns Specific to Real Estate

### 3.1 Property Card Component
Full TSX property listing card with:
- Image with Ken Burns hover effect
- Price, bedrooms, bathrooms, sqft overlay
- Framer Motion hover animation
- Tailwind styling

### 3.2 Virtual Tour Embed Wrapper
TSX component wrapping a Matterport or YouTube 360 iframe:
- Lazy load with IntersectionObserver
- Fullscreen toggle
- Loading skeleton

### 3.3 Floor Plan Viewer
TSX component:
- SVG floor plan with room labels
- Click room to highlight + show details panel
- Framer Motion layout animation on panel open

### 3.4 Property Listings Grid (Masonry-style)
TSX grid with:
- CSS columns masonry layout
- Filter by type (sold / available / coming soon)
- Framer Motion stagger on filter change

### 3.5 Scroll-Linked Property Stats Counter
GSAP ScrollTrigger counting up: "142 Properties Sold", "$2.4B in Sales", "12 Years Experience"

---

## 4. Typography Patterns in Luxury Real Estate

List 5 specific font pairings observed across award-winning real estate and architecture sites:
- Font name (display) + Font name (body)
- Usage context
- Weight/size recommendations
- Google Fonts availability or foundry source

Focus on:
- Editorial serif pairings (Canela, Freight Display, Cormorant, Playfair Display)
- Clean architectural sans (Monument Extended, Neue Haas Grotesk, GT Walsheim)
- Mixed editorial approaches

---

## 5. Color Palettes in Luxury Real Estate

### 5.1 Dark Luxury Palette
Hex codes, usage, Tailwind config snippet

### 5.2 Warm Organic Palette (popular for renovation / earthy brands)
Hex codes, usage, Tailwind config snippet

### 5.3 Clean Minimal White (architecture firms)
Hex codes, usage, Tailwind config snippet

---

## 6. Summary Table
| Site | Category | Hero Type | Color Mood | Primary Technique | Difficulty (1–5) |
`;

const HOTELS_RESORTS_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a comprehensive Markdown file titled "# Award-Winning Hotel, Resort & Luxury Brand Sites — Awwwards Analysis".

## Context
We build websites for luxury property developers, renovation contractors targeting high-net-worth clients, and garden suite / ADU builders.
Hotel and resort sites are a goldmine of design patterns directly applicable to luxury residential projects.
Reference Awwwards categories:
- https://www.awwwards.com/websites/hotels/
- https://www.awwwards.com/websites/luxury/
- https://www.awwwards.com/search/?text=hotel+resort

---

## 1. Overview — Why Hotel Sites Are a Design Goldmine for Property Projects
Write 3–4 paragraphs on:
- Emotional storytelling through immersive imagery and video
- The "escape" psychological trigger applicable to renovation/ADU selling
- How booking flows and room showcases translate to property inquiry flows
- Ambient design: how silence, whitespace, and slow transitions signal luxury

---

## 2. Award-Winning Hotel & Resort Site Profiles

Cover these 15 sites. Use your knowledge of actual award-winning hospitality sites or sites of equivalent award-level quality:

1. Aman Resorts (aman.com)
2. Six Senses (sixsenses.com)
3. Four Seasons (fourseasons.com)
4. Rosewood Hotels (rosewoodhotels.com)
5. Banyan Tree (banyantree.com)
6. 1 Hotel (1hotels.com) — biophilic luxury
7. The Lana Dubai (thelanadubai.com)
8. Singita (singita.com) — safari luxury
9. Soneva (soneva.com) — barefoot luxury
10. Minor Hotels / NH Collection (nhcollection.com)
11. Waldorf Astoria (waldorfastoria.com)
12. Belmond (belmond.com)
13. Edition Hotels (editionhotels.com)
14. Nobu Hospitality (nobuhospitality.com)
15. Amanjiwo or Amangiri (representative Aman property page)

For EACH site write:

### [Number]. [Site Name] ([URL])
**Category:** [ultra-luxury / boutique / eco-luxury / lifestyle / heritage]
**Hero Treatment:** (ambient video / full-bleed still / parallax / drone footage — be specific)
**Color Palette:** (hex approximations + mood description: deep forest / warm sand / ocean blue / etc.)
**Typography:** (font names if known, style description: editorial serif / refined sans / etc.)
**Key Interactions:** (parallax sections, horizontal scroll, cursor, room reveal animations)
**Navigation Style:** (overlay / minimal sticky / mega menu with room photos)
**Ambient / Video Strategy:** (how video is used: autoplay muted loop / scroll-triggered / section bg)
**What Makes It Award-Worthy:**
- 4–6 specific techniques and design decisions

**Code Pattern (Replicable):**
TSX snippet of the most distinctive pattern from this site, applicable to luxury property projects.

**Relevance to Our Projects:**
1–2 sentences: direct application to renovation, garden suite, or luxury property sites.

---

## 3. Hotel-Inspired Code Patterns for Property Sites

### 3.1 Ambient Video Hero Component
Full TSX:
- Fullscreen autoplay muted loop video
- Gradient overlay
- Centered headline with fade-in
- Fallback to gradient if video fails
- Lenis-aware parallax on scroll

### 3.2 Room / Suite Showcase Horizontal Scroll
TSX component:
- Horizontal scroll container with GSAP pin + scrub
- Cards: full-height image, room name, size, price per night (adapt: suite/floor plan + price)
- Smooth drag-to-scroll on mobile

### 3.3 Full-Bleed Parallax Section
Framer Motion useScroll + useTransform:
- Background image moves at 0.5x scroll speed
- Foreground text moves at 1x (normal)
- Quote/testimonial overlay

### 3.4 Amenities Grid with Icon + Reveal
TSX:
- Grid of amenity cards
- SVG icon + title + description
- Framer Motion stagger reveal on scroll into view

### 3.5 Booking / Inquiry Widget (Visual)
TSX:
- Check-in / Check-out date pickers (visual, not wired)
- Guest count selector
- "Check Availability" CTA button
- Elegant styling — usable as a property inquiry form

### 3.6 Testimonial with Full-Bleed Atmosphere
TSX:
- Full-width background image (blurred/dimmed)
- Large serif quote
- Guest name, location, rating stars
- Fade-in with Framer Motion

---

## 4. Color Palettes Used by Top Hotel Brands

### 4.1 Deep Warm Dark (Aman / Rosewood style)
Hex codes, RGB, usage rules, Tailwind extension

### 4.2 Sandy Organic (1 Hotel / Soneva biophilic)
Hex codes, usage, Tailwind extension

### 4.3 Ocean Slate (coastal resort style)
Hex codes, usage, Tailwind extension

### 4.4 Noir Luxury (Edition / Nobu dark chic)
Hex codes, usage, Tailwind extension

---

## 5. Ambient Video Best Practices
- File formats and compression (H.264 + WebM fallback)
- Hosting strategy (CDN vs self-hosted)
- Autoplay policies across browsers
- TSX component with proper accessibility (aria-hidden, prefers-reduced-motion)
- Performance: poster image, lazy load below fold

---

## 6. Summary Table
| Site | Category | Hero Type | Color Mood | Primary Technique | Difficulty (1–5) |
`;

const CONSTRUCTION_INTERIOR_PROMPT = `
You are a senior creative technologist writing a design knowledge base.

${STACK}
${CODE_RULES}

Write a comprehensive Markdown file titled "# Award-Winning Construction & Interior Design Sites — Awwwards Analysis".

## Context
We build websites specifically for renovation contractors, garden suite / ADU builders, and interior design studios.
Reference Awwwards categories:
- https://www.awwwards.com/websites/construction/
- https://www.awwwards.com/websites/interior-design/
- https://www.awwwards.com/search/?text=renovation
- https://www.awwwards.com/search/?text=architecture+studio

---

## 1. Overview — The Gap Between Average Contractor Sites and Award-Level Work
Write 3–4 paragraphs on:
- Why most contractor sites lose clients before they read a word (visual trust deficit)
- What award-winning trades/construction sites do differently: editorial project presentation
- Interior design studio patterns: how they sell feeling, not just services
- The "project as hero" approach: case studies over service lists

---

## 2. Award-Winning Construction & Interior Design Profiles

Cover these 12 sites. Use your knowledge of actual award-winning or industry-leading construction, renovation, and interior design studio sites:

1. Bjarke Ingels Group / BIG (big.dk) — construction/architecture crossover
2. Gensler (gensler.com) — large-scale architecture + interiors
3. NBBJ (nbbj.com) — architecture + construction
4. Kengo Kuma (kkaa.co.jp) — Japanese architecture studio
5. Snøhetta (snohetta.com) — cross-disciplinary construction/architecture
6. Ilse Crawford / Studioilse (studioilse.com) — interior design studio
7. Neri&Hu Design (neriandhu.com) — architecture + interior
8. Kelly Wearstler (kellywearstler.com) — luxury interior design
9. Roman and Williams (romanandwilliams.com) — interior/architecture studio
10. Universal Design Studio (universaldesignstudio.com)
11. TOG (theoperativegroup.com or similar award-winning general contractor)
12. A contractor or renovation company that has won a web award — describe the approach taken by the best-performing renovation contractor websites you know of (e.g., Boldt Company, Turner Construction, or high-end residential remodelers with notable web presence)

For EACH site write:

### [Number]. [Site Name] ([URL])
**Category:** [general contractor / renovation / architecture | interior design studio | design-build]
**Project Presentation Style:** (case study / gallery / editorial / before-after)
**Hero Treatment:** (video / image / text-driven / project montage)
**Color Palette:** (hex approximations + mood)
**Typography:** (font names or style)
**What Makes It Stand Out From Average Contractor Sites:**
- 4–6 specific techniques

**Code Pattern (Replicable):**
TSX snippet directly applicable to a renovation contractor or garden suite builder site.

**Relevance to Our Projects:**
1–2 sentences on direct application.

---

## 3. Code Patterns for Renovation / Construction Sites

### 3.1 Project Case Study Layout
Full TSX page section:
- Hero image full-bleed
- Project metadata row: type, location, year, size (sqft)
- Section with problem/process/result copy
- Image gallery with GSAP reveal

### 3.2 Before / After Reveal Slider
TSX component:
- Drag handle dividing before/after images
- Mouse/touch drag interaction
- Label overlays ("Before" / "After")
- Smooth CSS clip-path transition

### 3.3 Material / Finish Palette Showcase
TSX component:
- Grid of material swatches (wood, tile, stone, paint)
- Click to expand: full image + name + supplier
- Framer Motion layout animation

### 3.4 Project Filter Gallery
TSX:
- Filter tabs: Kitchen / Bathroom / Basement / Garden Suite / Full Reno
- Masonry or grid with Framer Motion layout + stagger
- Image hover: project name + year overlay

### 3.5 Process Steps Timeline
TSX:
- Horizontal or vertical timeline: Consultation → Design → Permit → Build → Handover
- GSAP ScrollTrigger: each step animates in as user scrolls
- Icon + step number + description

### 3.6 Contractor Trust Signals Section
TSX:
- Logos of certifications / associations (BBB, RenoMark, CHBA, etc.)
- Years in business counter (GSAP)
- Projects completed counter
- Client satisfaction percentage

---

## 4. Studio Portfolio Patterns for Interior Design

### 4.1 Editorial Project Grid
How top interior design studios present work differently from galleries:
- Curated selection (quality over quantity)
- Strong art direction: consistent color grading across project images
- TSX implementation with editorial aspect ratios

### 4.2 Material Lookbook
- Mood board grid component in TSX
- Sticky sidebar with material details on scroll

### 4.3 Designer / Principal Profile
TSX: editorial headshot + biography + philosophy statement

---

## 5. What Separates Award-Winning Contractor Sites from Average Ones
Checklist / comparison table:
| Element | Average Contractor Site | Award-Level Site |
(10+ rows covering: hero, typography, project photos, copy, social proof, CTA, mobile, speed, color, navigation)

---

## 6. Summary Table
| Site | Category | Project Style | Color Mood | Primary Technique | Difficulty (1–5) |
`;

// ─── HTML file prompts ────────────────────────────────────────────────────────

const REAL_ESTATE_HTML_PROMPT = `
You are an expert front-end developer specializing in award-winning luxury website design.

Write a COMPLETE, STANDALONE HTML file for a luxury real estate website.
The file must work by opening it directly in a browser — no build step, CDN only.

CRITICAL: Output ONLY the HTML file content. No markdown, no explanation, no code fences. Start with <!DOCTYPE html>.

Design requirements:
- Inspired by award-winning real estate sites on Awwwards
- Dark luxury aesthetic
- Colors: #0f0f0f (bg), #c9a96e (gold accent), #f5f0e8 (cream text), #1a1a1a (card bg), #2a2a2a (border)
- Typography: Playfair Display (serif display) + Inter (sans body) via Google Fonts
- Professional, award-level visual quality
- Real copy — no lorem ipsum — use actual real estate language

Sections to include:
1. NAVIGATION: Fixed transparent nav, logo "MERIDIAN ESTATES", nav links: Properties | About | Services | Contact, gold CTA button "Book Viewing"

2. HERO: Full-screen with Ken Burns effect (CSS animation zooming a background-image of a luxury interior — use a Unsplash URL: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)
   - Headline: "Extraordinary Properties." on line 1, "Exceptional Living." on line 2 — in Playfair Display, very large
   - Subheadline: "Toronto's most sought-after properties, curated for discerning buyers."
   - Two CTAs: "Explore Properties" (gold filled) and "Schedule a Consultation" (outlined)
   - Scroll indicator arrow at bottom

3. STATS BAR: Dark bg bar with 3 stats: "142 Properties Sold" | "$2.4B in Sales" | "18 Years of Excellence"

4. FEATURED PROPERTIES GRID: Section title "Featured Listings"
   - 6 property cards in a 3-column grid
   - Each card: property image (use Unsplash luxury home images), price tag (e.g. $3,200,000), address, beds/baths/sqft badges, status badge (Available/Sold/Under Contract)
   - Hover: gold border glow + scale up slightly + overlay with "View Property" button
   - Use these Unsplash images:
     * https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80
     * https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80
     * https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80
     * https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80
     * https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80
     * https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80

5. MAP SECTION: Full-width dark section "Prime Neighbourhoods"
   - Styled static map visual (use CSS to create a dark map-like grid/area representation)
   - Neighbourhood name badges overlaid: Rosedale | Forest Hill | Bridle Path | Yorkville | The Annex
   - Each badge clickable (no JS needed, just styled)

6. AGENT PROFILES: "Meet Your Advisors" — 3 agent cards in a row
   - Agent photo (use Unsplash professional portrait), name, title, phone, email
   - Unsplash portraits:
     * https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80 (James Morrison, Senior Advisor)
     * https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80 (Sarah Chen, Luxury Specialist)
     * https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80 (Marcus Reid, Investment Properties)

7. TESTIMONIALS: "Client Stories" — editorial magazine style
   - Large opening quote mark in gold
   - 3 testimonials in a grid: quote, client name, property sold, year
   - Editorial serif typography

8. NEWSLETTER / CTA SECTION: Full-width dark section
   - Headline: "Stay Ahead of the Market"
   - Subtext: "Receive exclusive listings before they go public."
   - Email input + "Join Our Private List" gold button
   - Fine print: "Discreet. No spam. Unsubscribe anytime."

9. FOOTER: Logo, tagline, nav links, social icons (SVG), legal text, copyright 2025

ANIMATIONS (use GSAP + ScrollTrigger from CDN):
- Hero headline: each word fades + slides up with stagger
- Stats counter: numbers count up when scrolled into view
- Property cards: stagger fade-in from bottom on scroll
- Section headings: clip-path reveal from bottom

GSAP CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
ScrollTrigger CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js

Also add Lenis smooth scroll:
CDN: https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js

Output the complete HTML file. No markdown. No explanation. Just the HTML.
`;

const HOTEL_RESORT_HTML_PROMPT = `
You are an expert front-end developer specializing in award-winning luxury website design.

Write a COMPLETE, STANDALONE HTML file for a luxury hotel/resort website.
The file must work by opening it directly in a browser — no build step, CDN only.

CRITICAL: Output ONLY the HTML file content. No markdown, no explanation, no code fences. Start with <!DOCTYPE html>.

Design requirements:
- Inspired by award-winning hotel sites (Aman, Six Senses, Rosewood aesthetic) on Awwwards
- Deep warm dark aesthetic with peaceful, ambient feel
- Colors: #1a1208 (deep warm dark bg), #d4a853 (gold accent), #f5f0e8 (cream text), #241a0e (card bg), #3a2e1e (border/surface)
- Typography: Cormorant Garamond (serif display) + Lato (sans body) via Google Fonts
- Professional, award-level visual quality — peaceful, unhurried, luxurious
- Real copy — no lorem ipsum — use actual luxury hotel/resort language

Sections to include:
1. NAVIGATION: Fixed transparent nav that becomes dark on scroll
   - Logo "ARAVALI RESORT & SPA" in Cormorant Garamond
   - Nav: Rooms & Suites | Dining | Spa & Wellness | Experiences | Reserve
   - "Reserve Now" gold button

2. HERO: Fullscreen ambient video hero
   - Video element: autoplay muted loop playsinline
   - Video source: use a YouTube embed as iframe fallback OR use CSS gradient animation as video fallback
   - Primary fallback: full-screen gradient animation (CSS animated gradient from #1a1208 to #2d1f0e to #1a1208)
   - Overlay: semi-transparent dark overlay
   - Centered text with fade-in animation:
     * Small caps label: "THE ARAVALI COLLECTION"
     * Large headline in Cormorant Garamond: "Book Your Escape"
     * Subtext: "Where the desert meets the sky. An intimate retreat among ancient hills."
     * Thin divider line
     * Two CTAs: "Explore Suites" (gold outlined) and "Reserve Your Stay" (gold filled)
   - Scroll down indicator with animated bouncing arrow

3. PHILOSOPHY SECTION: Full-width centered text section
   - Large italic serif quote: "We believe in the art of doing nothing beautifully."
   - Attribution: "— The Aravali Philosophy"
   - Surrounding negative space — let the words breathe

4. ROOMS & SUITES HORIZONTAL SCROLL: "Your Private Sanctuary"
   - Horizontal scroll container (CSS overflow-x scroll + scroll-snap, enhanced by GSAP)
   - 5 room cards side by side, each full viewport height:
     * Use Unsplash luxury room images:
       - https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80 (Deluxe Suite)
       - https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80 (Pool Villa)
       - https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80 (Spa Retreat)
       - https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80 (Hillside Residence)
       - https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80 (The Grand Pavilion)
     * Room name in large Cormorant serif
     * Size (sqm), view type, key amenity
     * "From $1,200 / night" in gold
     * "Enquire" button

5. FULL-BLEED PARALLAX SECTION: Uses a landscape image
   - Background: https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80
   - Parallax: image moves slower than scroll (CSS background-attachment: fixed or JS)
   - Dark overlay
   - Centered text: "Where Every Sunset is a Ceremony"

6. SPA & WELLNESS SECTION: "Restore. Renew. Return to Yourself."
   - 2-column layout: left side large image, right side content
   - Spa image: https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80
   - 4 amenity items with elegant icons (SVG): Ayurvedic Treatments | Infinity Pool | Yoga Pavilion | Sound Healing

7. DINING SECTION: "A Table in the Wilderness"
   - 3 restaurant cards: The Pavilion (fine dining), The Garden (all-day), The Bar (sunset cocktails)
   - Dark cards with food/atmosphere images from Unsplash
   - Each: image, name, cuisine type, hours

8. TESTIMONIAL: Full-bleed atmospheric section
   - Background image: https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80
   - Overlay: 70% dark
   - Large serif quote: "Time slows here. We arrived as travellers and left as different people entirely."
   - Attribution: "— Isabella & Marcus T., London"
   - 5 gold stars

9. AVAILABILITY / BOOKING WIDGET: "Plan Your Retreat"
   - Dark elegant form section
   - Fields: Check-in date | Check-out date | Adults | Children | Room Type (dropdown)
   - "Check Availability" gold CTA button
   - Fine print: "Best rates guaranteed. Complimentary airport transfer with 3+ nights."

10. FOOTER: Logo, property address, phone, email, social icons
    - Navigation: Rooms | Dining | Spa | Gallery | Press | Careers | Privacy
    - "A member of the Small Luxury Hotels of the World"
    - Copyright 2025

ANIMATIONS (use GSAP + ScrollTrigger from CDN):
- Hero text: staggered fade-in + slight upward movement
- Room cards: horizontal scroll driven by GSAP pin + scrub
- Section headings: fade up on scroll
- Parallax sections: GSAP scrollTrigger scrub on background-position
- Philosophy quote: character-by-character fade-in

GSAP CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
ScrollTrigger CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js
Lenis CDN: https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js

Add prefers-reduced-motion CSS media query to disable animations for accessibility.

Output the complete HTML file. No markdown. No explanation. Just the HTML.
`;

// ─── main ─────────────────────────────────────────────────────────────────────

const MD_FILES = [
  { name: "real-estate-architecture.md", prompt: REAL_ESTATE_ARCH_PROMPT },
  { name: "hotels-resorts-luxury.md", prompt: HOTELS_RESORTS_PROMPT },
  { name: "construction-interior-design.md", prompt: CONSTRUCTION_INTERIOR_PROMPT },
];

const HTML_FILES = [
  { name: "real-estate-award-style.html", prompt: REAL_ESTATE_HTML_PROMPT },
  { name: "hotel-resort-award-style.html", prompt: HOTEL_RESORT_HTML_PROMPT },
];

async function main() {
  ensureDir(MD_DIR);
  ensureDir(HTML_DIR);

  // Generate MD files
  for (const file of MD_FILES) {
    const outPath = path.join(MD_DIR, file.name);
    console.log(`Generating ${file.name} ...`);
    try {
      const content = await generate(file.prompt);
      fs.writeFileSync(outPath, content, "utf8");
      console.log(`  Written: ${outPath} (${content.length} chars)`);
    } catch (err) {
      console.error(`  ERROR generating ${file.name}:`, err.message);
      process.exit(1);
    }
  }

  // Generate HTML files
  for (const file of HTML_FILES) {
    const outPath = path.join(HTML_DIR, file.name);
    console.log(`Generating ${file.name} ...`);
    try {
      let content = await generate(file.prompt);
      // Strip any markdown code fences the model might wrap around the output
      content = content
        .replace(/^```html\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```\s*$/, "")
        .trim();
      fs.writeFileSync(outPath, content, "utf8");
      console.log(`  Written: ${outPath} (${content.length} chars)`);
    } catch (err) {
      console.error(`  ERROR generating ${file.name}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\nAll files written. Running git operations...");

  const { execSync } = await import("child_process");
  const cwd = "C:/Users/Admin/Downloads/design-knowledge-base";

  try {
    execSync("git add md/ html-demos/", { cwd, stdio: "inherit" });
    execSync(
      'git commit -m "Add Awwwards real estate, hotel/resort, construction patterns + HTML demos"',
      { cwd, stdio: "inherit" }
    );
    execSync("git push origin master", { cwd, stdio: "inherit" });
    console.log("git push complete.");
  } catch (gitErr) {
    console.error("git operation failed:", gitErr.message);
    console.log("Files are written — commit manually if needed.");
  }
}

main();
