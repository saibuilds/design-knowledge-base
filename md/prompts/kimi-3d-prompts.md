# Kimi AI Prompts — Web Agency Brand Asset Generation

Brands: DJ Custom Reno | Motta Kitchen | SathiDeals | GardenSuites4You

---

## Section 1: 3D Spline Scene Prompts

### DJ Custom Reno — Toronto Renovation Contractor (Amber / Black)

```
You are a 3D designer working in Spline (spline.design). Build a hero 3D scene for a Toronto renovation contractor brand called DJ Custom Reno. Brand colors are deep amber (#D97706) and matte black (#0A0A0A).

Scene description:
- A dark workshop environment with polished concrete floor reflecting amber light
- A large floating 3D hammer or chisel tool rendered in brushed black metal with amber edge lighting
- Subtle construction grid lines on the floor in amber, fading out toward edges
- Particle dust effect drifting upward slowly from the tool
- Background: near-black with a warm amber radial glow centered behind the object

Lighting:
- Key light: amber/orange (#D97706) coming from upper-left at 45 degrees
- Rim light: deep orange (#C2410C) from behind right
- Fill light: very dim neutral (#1A1A1A) to preserve shadows
- No white or cool-toned lights

Interactions:
- On mouse move: the hammer tool slowly rotates on Y axis following the cursor (parallax, max 15 degrees)
- On hover: amber particle burst emits from the tool edge for 1.5 seconds
- On scroll down: the object scales down and floats upward, fading out

Camera: slightly below subject looking up, perspective FOV 60

Export: Spline viewer embed code (iframe), also export as .splinecode file for React @splinetool/react-spline integration

Material notes: use PBR materials — roughness 0.6 on the metal body, metalness 0.9, amber emissive glow on edges at intensity 0.4
```

---

### Motta Kitchen — Luxury Kitchen Brand (Brass / Warm White)

```
You are a 3D designer working in Spline (spline.design). Build a luxury hero 3D scene for Motta Kitchen, a high-end kitchen brand. Brand colors are aged brass (#B5853A), warm ivory (#FAF7F2), and deep charcoal (#1C1C1E).

Scene description:
- A floating 3D kitchen island slab — clean rectangular form, white marble texture with subtle gold veining
- Brass cabinet pull hardware floating beside it, rendered with high metalness and slight fingerprint roughness
- Soft caustic light patterns projected onto the slab surface simulating light through a window
- Background: warm ivory gradient fading to soft champagne at center, no hard edges

Lighting:
- Primary: warm white (#FFF8EC) diffused area light from above simulating skylight
- Accent: brass-tinted (#C9954C) point light inside/beneath the island slab for a subtle glow
- No harsh shadows — use soft area shadows only
- Light bounce on marble should produce warm golden reflections

Interactions:
- On mouse move: the marble slab subtly tilts on both axes (max 8 degrees) for a floating premium feel
- On click on hardware: brass pull spins 360 degrees smoothly over 1.2s then returns
- On scroll: slab drifts forward toward camera slowly

Camera: straight on, eye level, FOV 50, slight tilt to show marble top surface

Export: Spline viewer embed (iframe) + .splinecode for React @splinetool/react-spline

Material notes: marble — roughness 0.15, metalness 0, normal map with strong veining; brass hardware — roughness 0.3, metalness 1.0, color #B5853A with slight iridescence
```

---

### SathiDeals — Toronto Real Estate Team (Gold / Black)

```
You are a 3D designer working in Spline (spline.design). Build a hero 3D scene for SathiDeals, a luxury real estate team in Toronto. Brand colors are gold (#C9A84C), jet black (#080808), and off-white (#F5F0E8).

Scene description:
- A dark luxury environment with a floating 3D city skyline silhouette of Toronto (CN Tower visible) rendered as minimalist geometric forms
- The skyline sits on a reflective black glass floor plane that mirrors the gold-lit buildings below
- A large semi-transparent gold key or house icon floats in the foreground, slightly larger than the skyline
- Gold light lines (like architectural blueprint lines) streak diagonally across the background — slow animated drift

Lighting:
- Key light: gold (#C9A84C) from upper right, intensity high
- Background: deep black with faint gold horizon glow
- Floor reflection: mirror-like, slightly blurred (roughness 0.05)
- Atmospheric haze: very subtle gold fog in midground

Interactions:
- On mouse move: skyline and key icon have independent parallax (skyline moves slower than key — depth layering effect)
- On hover over key icon: gold ripple effect on the floor reflection
- On scroll: camera slowly zooms in toward the CN Tower geometry

Camera: wide establishing shot, slightly elevated, FOV 70

Export: Spline embed (iframe) + .splinecode for React @splinetool/react-spline

Material notes: skyline buildings — emissive gold (#C9A84C) at intensity 0.6, roughness 0.4; floor plane — metalness 1.0, roughness 0.05, black color; key icon — gold metallic PBR with soft emissive outline
```

---

### GardenSuites4You — Garden Suite Builder (Yellow / Navy)

```
You are a 3D designer working in Spline (spline.design). Build a hero 3D scene for GardenSuites4You, a Toronto garden suite construction company. Brand colors are sunlit yellow (#F5C518), navy blue (#0F1F3D), and clean white (#FFFFFF).

Scene description:
- A floating 3D miniature garden suite (small modern home, flat roof, large window panel, wood-look cladding)
- The suite sits above a green ground plane with simplified tree shapes around it
- A stylized sun or sunburst in yellow floats behind the structure
- Blueprint grid lines in navy subtly visible on the ground plane — like architectural drawings coming to life
- Soft shadow beneath the suite on the ground

Lighting:
- Key light: bright warm white simulating afternoon sun from upper right
- Fill: soft yellow (#F5C518) bounce light from ground plane
- Background: deep navy (#0F1F3D) gradient sky
- No neon or artificial lighting — this is a natural daylight scene

Interactions:
- On mouse move: the suite rotates slowly on Y axis (max 20 degrees) for a 3D product-showcase feel
- On hover: blueprint lines animate (draw themselves in) on the ground plane
- On scroll: suite lifts upward slightly and the sun rotates

Camera: 3/4 angle looking slightly down at the suite, FOV 55

Export: Spline embed (iframe) + .splinecode for React @splinetool/react-spline

Material notes: suite walls — white matte, roughness 0.9; window glass — roughness 0.05, transparency 0.7, slight blue tint; wood cladding — brown PBR roughness 0.8; ground — green matte roughness 1.0
```

---

## Section 2: Image Generation Prompts

### DJ Custom Reno

**Metallic Epoxy Floor Pouring**
```
Hyper-realistic photograph of molten metallic epoxy resin being poured onto a concrete floor, deep amber and obsidian black swirling patterns mid-pour, dramatic overhead lighting, sparkling metallic flakes catching light, industrial workshop background slightly out of focus, close-up macro lens, high contrast, dark moody atmosphere, photorealistic, 8K, shot on Phase One XF, --ar 16:9 --style raw --v 6
```

**Kitchen Cabinet Spray Booth**
```
Cinematic photograph inside a professional cabinet spray booth, technician in protective suit spraying matte black finish on custom kitchen cabinet doors suspended on hooks, amber work lights illuminating fine mist particles in the air, dark industrial environment, motion blur on spray, photorealistic commercial photography, dramatic side lighting, 8K, --ar 16:9 --style raw --v 6
```

---

### Motta Kitchen

**Luxury Kitchen Island Marble**
```
Architectural interior photography of a luxury kitchen island with white Calacatta marble countertop, thick 4cm waterfall edge, dramatic gold veining, soft natural light from floor-to-ceiling windows, brass fixtures and pulls catching warm afternoon light, blurred background showing custom white cabinetry, extreme shallow depth of field, editorial style, shot on Hasselblad, warm tones, --ar 16:9 --style raw --v 6
```

**Brass Hardware Closeup**
```
Extreme macro photograph of aged brass kitchen cabinet pull hardware, fingerprint-smudged surface with warm patina, intricate knurling detail, soft bokeh background in warm ivory and charcoal, single overhead warm light source creating specular highlight, luxury lifestyle product photography, ultra sharp center focus, 8K resolution, --ar 4:5 --style raw --v 6
```

---

### SathiDeals

**Toronto Skyline Dusk Aerial**
```
Aerial drone photograph of Toronto skyline at golden hour dusk, CN Tower centered, warm amber and deep purple sky gradient, city lights beginning to appear, Lake Ontario reflecting the sky in gold and navy tones, luxury high-rises gleaming, editorial real estate photography, shot from helicopter at 1500ft altitude, ultra wide lens, cinematic color grading, 8K, --ar 16:9 --style raw --v 6
```

**Luxury Condo Interior**
```
Interior architectural photograph of a luxury Toronto penthouse condominium, floor-to-ceiling windows with panoramic city view at dusk, warm ambient lighting, gold accent fixtures, marble floors, contemporary furniture in charcoal and ivory, ultra wide 14mm lens, long exposure for city lights, editorial real estate photography, aspirational lifestyle, 8K, --ar 16:9 --style raw --v 6
```

---

### GardenSuites4You

**Modern Backyard Garden Suite**
```
Architectural photography of a modern prefab garden suite in a lush Toronto backyard, flat roof design, floor-to-ceiling glass panel, cedar wood cladding, surrounded by mature trees and landscaping, warm afternoon sunlight, navy blue door as accent, photorealistic exterior rendering, lifestyle real estate photography, clear blue sky, green lawn, --ar 16:9 --style raw --v 6
```

**Permit Drawings Aesthetic**
```
Flat lay photography of architectural permit drawings for a garden suite on white drafting paper, navy blue ink technical lines showing floor plan, elevation, and site plan, yellow highlighter marks on key measurements, brass compass and mechanical pencil as props, soft even studio lighting, clean minimal aesthetic, top-down overhead shot, --ar 1:1 --style raw --v 6
```

---

## Section 3: Kimi Code Generation Prompts

### Animated Counter Stat Block

```
You are a senior React/TypeScript developer. Generate a production-ready animated counter stat block component.

Requirements:
- Framework: React with TypeScript (.tsx)
- Each stat animates its number from 0 to the target value when it enters the viewport
- Use IntersectionObserver to trigger the animation
- Animation duration: 2 seconds, ease-out curve
- Supports an array of stats passed as props: { value: number, suffix: string, label: string }[]
- No external animation libraries — use requestAnimationFrame and vanilla JS math
- Styling: use Tailwind CSS utility classes
- Default display: 3 stats in a row, responsive (stacks on mobile)

Brand variant prop: accept a 'variant' prop that accepts 'amber' | 'brass' | 'gold' | 'yellow' and applies the matching accent color to the number text

Output: complete .tsx component file only, no explanations, no placeholder comments
```

---

### Floating Navigation with Blur

```
You are a senior React/TypeScript developer. Generate a production-ready floating navigation bar component.

Requirements:
- Framework: React with TypeScript (.tsx)
- Floats fixed at top of viewport
- Background: transparent on page load, transitions to backdrop-blur-md + bg-white/10 after scrolling 80px
- Smooth transition: 300ms ease on background and border
- Accepts props: logo (ReactNode), navLinks ({ label: string, href: string }[]), ctaButton ({ label: string, href: string })
- Mobile: hamburger menu that opens a slide-down panel with the same links
- No external libraries except lucide-react for the hamburger/close icon
- Styling: Tailwind CSS only
- z-index: 50

Output: complete .tsx component file only, no explanations
```

---

### Before / After Slider with Drag Handle

```
You are a senior React/TypeScript developer. Generate a production-ready before/after image comparison slider component.

Requirements:
- Framework: React with TypeScript (.tsx)
- Two images laid over each other, a vertical drag handle divides them
- User can click and drag the handle left/right to reveal before vs after
- Works on both mouse and touch events
- Handle: circular drag knob with left/right arrows, customizable color via props
- Props: beforeImage (string URL), afterImage (string URL), beforeLabel (string), afterLabel (string), handleColor (string hex)
- Labels appear in bottom corners of each half (semi-transparent pill)
- Default split: 50%
- No external libraries
- Styling: Tailwind CSS + inline styles for dynamic width values

Output: complete .tsx component file only, no explanations
```

---

### Scroll-Triggered Text Reveal

```
You are a senior React/TypeScript developer. Generate a production-ready scroll-triggered text reveal component.

Requirements:
- Framework: React with TypeScript (.tsx)
- Text reveals word-by-word (each word fades + slides up) when the component enters the viewport
- Use IntersectionObserver with threshold 0.2
- Stagger delay between words: 60ms
- Animation per word: opacity 0→1, translateY 20px→0, duration 500ms, ease-out
- Accepts props: text (string), className (string), tag ('h1' | 'h2' | 'h3' | 'p'), delay (number ms before first word starts)
- Splits text on spaces, wraps each word in a span with overflow: hidden parent
- No external animation libraries
- Styling: Tailwind CSS + inline style for animation delay

Output: complete .tsx component file only, no explanations
```

---

### Magnetic Hover Button

```
You are a senior React/TypeScript developer. Generate a production-ready magnetic hover button component.

Requirements:
- Framework: React with TypeScript (.tsx)
- On mouse enter: the button element smoothly follows the cursor with a magnetic pull effect (cursor within 80px radius activates it)
- Transform uses translateX/Y to shift the button toward the cursor — max displacement: 12px on each axis
- On mouse leave: button springs back to original position with a gentle ease-out transition
- Uses useRef and mousemove event listener on the parent wrapper
- Accepts props: children (ReactNode), href (string | undefined), onClick (() => void | undefined), variant ('primary' | 'outline'), className (string)
- If href is provided renders as <a>, otherwise <button>
- Styling: Tailwind CSS, variant='primary' uses solid fill, variant='outline' uses border only
- No external libraries

Output: complete .tsx component file only, no explanations
```

---

## Section 4: Video / Animation Prompts

### DJ Custom Reno — Hero Brand Video

**For Runway ML / Kling AI**
```
Cinematic brand video prompt for DJ Custom Reno, Toronto renovation contractor. Brand colors: amber (#D97706) and matte black.

Scene sequence (10 seconds):
Open on extreme close-up of a drill bit boring into drywall, dust particles exploding in slow motion. Cut to wide shot of an open-plan renovation in progress — raw framing visible, amber work lights overhead. Slow push-in toward a freshly installed custom kitchen, gleaming amber cabinet hardware catching light. Final frame: logo lockup on black with amber particle dissolve.

Cinematography: handheld feel, shallow depth of field, film grain, warm tungsten color grade, dramatic shadows. Pace: slow and deliberate — this is craftsmanship, not speed.

Camera movement: creeping dolly-in on all shots, no jump cuts. Audio: deep cinematic bass swell (describe this to the AI for reference, actual audio not generated).

Style reference: luxury automotive commercials, dark and textural, aspirational.
```

---

### Motta Kitchen — Hero Brand Video

**For Runway ML / Kling AI**
```
Cinematic brand video prompt for Motta Kitchen, luxury kitchen brand. Brand colors: brass (#B5853A) and warm ivory.

Scene sequence (10 seconds):
Begin with an extreme macro of brass cabinet pull hardware — slow rack focus from blurred to razor sharp. Cut to overhead shot of hands placing a white marble countertop slab, light caustics dancing across the surface. Slow slide along the length of a finished kitchen island, brass fixtures reflecting warm window light. Final frame fades to warm white with logo.

Cinematography: ultra smooth gimbal movement, 4K 60fps slowed to 24fps, golden hour color grade (warm, creamy, high contrast highlights). No fast cuts — every transition is a slow dissolve or wipe.

Mood: silent luxury, restraint, tactile quality. Style reference: Poliform or Bulthaup kitchen brand videos.
```

---

### SathiDeals — Hero Brand Video

**For Runway ML / Kling AI**
```
Cinematic brand video prompt for SathiDeals, Toronto luxury real estate team. Brand colors: gold (#C9A84C) and jet black.

Scene sequence (12 seconds):
Open with aerial drone rising above Toronto at golden hour — CN Tower centered, Lake Ontario gleaming gold behind it. Cut to interior: a penthouse living room at dusk, city lights twinkling through floor-to-ceiling glass. Slow pan across marble floors and gold fixtures. Close on a hand presenting a brass key. Final frame: gold particle burst resolves into the SathiDeals logo on black.

Cinematography: cinematic drone + interior gimbal, anamorphic lens flares, deep blacks, rich gold tones. Color grade: high contrast with crushed shadows and warm highlights.

Pace: confident and aspirational — each shot holds 2-3 seconds. Style reference: luxury real estate agency showreels, Sotheby's International Realty.
```

---

### GardenSuites4You — Hero Brand Video

**For Runway ML / Kling AI**
```
Cinematic brand video prompt for GardenSuites4You, Toronto garden suite builder. Brand colors: sunlit yellow (#F5C518) and navy blue (#0F1F3D).

Scene sequence (10 seconds):
Begin with a time-lapse of a Toronto backyard: framing going up, walls closing in, roof appearing — compressed to 3 seconds. Slow down into real-time for a final reveal: the completed modern garden suite, cedar cladding warm in afternoon sun, navy blue door as an accent. Pull back to show the full backyard with the suite integrated. Final shot: a happy resident opening the suite door, stepping inside. Logo on yellow background.

Cinematography: mix of time-lapse and real-time, stabilized wide shots, warm afternoon light, clean and optimistic color grade — bright whites, saturated greens, yellow accents.

Mood: hopeful, practical, approachable — this is a life upgrade, not just construction. Style reference: Scandinavian prefab home brand videos, clean and human-centered.
```
