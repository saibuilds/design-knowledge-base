# Icons — Lucide + Phosphor

## Lucide React (used with shadcn)
```bash
npm install lucide-react
```
```tsx
import { ArrowRight, Check, ChevronDown, Menu, X, Star, MapPin, Phone, Mail, Instagram, ExternalLink } from 'lucide-react'
<ArrowRight className="w-4 h-4" />
// All 1400+ icons: https://lucide.dev/icons/
```

### Most useful for renovation/construction sites
```tsx
import {
  // Navigation
  Menu, X, ArrowRight, ArrowLeft, ChevronDown, ChevronRight,
  // Contact
  Phone, Mail, MapPin, Clock,
  // Services  
  Hammer, Wrench, Home, Building2, Layers,
  // Trust signals
  Star, Shield, Award, CheckCircle2, Users,
  // Social
  Instagram, Facebook, Youtube,
  // UI
  Search, Filter, Grid3X3, List, Plus, Minus,
  // Project
  Image, Camera, Video, FileText, Download,
} from 'lucide-react'
```

## Phosphor Icons (more styles)
```bash
npm install @phosphor-icons/react
```
```tsx
import { House, Hammer, Wrench, Star, ArrowRight } from '@phosphor-icons/react'
// Weights: Thin, Light, Regular, Bold, Fill, Duotone
<Hammer size={24} weight="bold" color="#f59e0b" />
// All icons: https://phosphoricons.com
```

## Tabler Icons (2800+ free MIT)
```bash
npm install @tabler/icons-react
```
```tsx
import { IconHammer, IconStar, IconPhone } from '@tabler/icons-react'
<IconHammer size={24} stroke={1.5} />
// All: https://tabler.io/icons
```

## react-icons (all major icon sets)
```bash
npm install react-icons
```
```tsx
// Heroicons
import { HiArrowRight, HiCheck } from 'react-icons/hi2'
// Font Awesome
import { FaInstagram, FaFacebook } from 'react-icons/fa6'
// Material Design
import { MdConstruction, MdKitchen } from 'react-icons/md'
// Simple Icons (brand logos)
import { SiTailwindcss, SiReact } from 'react-icons/si'
```

## SVG Sprite technique (performance)
```tsx
// Define once in HTML
const IconSprite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    <symbol id="icon-arrow" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
    </symbol>
  </svg>
)
// Use anywhere
<svg className="w-5 h-5"><use href="#icon-arrow" /></svg>
```
