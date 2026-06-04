# Portal K3 PT Freeport Indonesia — AI Agent Rules

## Project Overview

This is the **Portal K3 (Keselamatan dan Kesehatan Kerja) PT Freeport Indonesia** — a modern, professional safety information portal built with **Next.js 16 (App Router)**, Tailwind CSS, and TypeScript. The portal serves employees, contractors, management, and general visitors.

**Primary language:** Bahasa Indonesia (content) | TypeScript (code)
**Design language:** Dark blue (`#1B3A6B`) primary, amber/gold (`#C9870A`) accent, professional corporate

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSG/ISR/CSR hybrid |
| Styling | Tailwind CSS v3 + CSS Variables | Utility-first |
| Animation | Framer Motion 11+ | All motion effects |
| Icons | Lucide React | Tree-shakeable SVG |
| Map | Leaflet.js + react-leaflet | Client-side only (no SSR) |
| Forms | React Hook Form + Zod | Type-safe validation |
| State | Zustand (global) + useState (local) | Minimal boilerplate |
| Fonts | next/font with Inter | Zero layout shift |
| Images | next/image | Auto WebP/AVIF, lazy |
| Variants | class-variance-authority (CVA) | For UI components |
| Utilities | clsx + tailwind-merge → `cn()` | Always use `cn()` for className |

---

## Project Structure

```
k3-web/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer)
│   ├── template.tsx            # Page transition wrapper (re-mounts on route)
│   ├── page.tsx                # Beranda / Home
│   ├── tentang/
│   │   ├── page.tsx            # Tentang PT Freeport Indonesia
│   │   ├── profil/page.tsx
│   │   ├── sejarah/page.tsx
│   │   └── komitmen/page.tsx
│   ├── visi-misi/page.tsx
│   ├── safety-map/page.tsx
│   ├── struktur-organisasi/page.tsx
│   ├── landasan-hukum/page.tsx
│   ├── video/page.tsx
│   ├── galeri/page.tsx
│   └── kontak/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky top nav + glassmorphism on scroll
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx       # Bottom navigation (5 tabs)
│   ├── ui/                     # Reusable primitives
│   │   ├── Badge.tsx           # Category labels (CVA variants)
│   │   ├── Modal.tsx           # Video lightbox / confirmation
│   │   ├── Accordion.tsx       # FAQ component
│   │   ├── SkeletonLoader.tsx  # Loading placeholders
│   │   └── FilterChip.tsx      # Tab/pill filters
│   ├── shared/
│   │   ├── SectionHeader.tsx   # Consistent section titles with underline
│   │   ├── RevealOnScroll.tsx  # Scroll-triggered animation wrapper
│   │   └── Timeline.tsx        # Company history timeline
│   └── sections/
│       ├── home/
│       │   ├── HeroSection.tsx
│       │   ├── StatCounter.tsx
│       │   └── QuickAccessGrid.tsx
│       ├── video/
│       │   └── VideoCard.tsx
│       ├── galeri/
│       │   └── GalleryGrid.tsx
│       └── safety-map/
│           └── MapContainer.tsx
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── animations.ts           # Framer Motion variant presets
│   └── hooks/
│       ├── useCountUp.ts
│       ├── useDebounce.ts
│       └── useInView.ts
├── data/                       # JSON data layer (MVP — no backend)
│   ├── stats.json
│   ├── videos.json
│   ├── gallery.json
│   ├── regulations.json
│   └── map-markers.json
├── public/
│   └── images/
└── styles/
    └── globals.css
```

---

## Sitemap & Pages

| URL | Page | Rendering | Priority |
|---|---|---|---|
| `/` | Beranda (Home) | SSG | CRITICAL |
| `/tentang` | Tentang PTFI | SSG | HIGH |
| `/visi-misi` | Visi & Misi K3 | SSG | HIGH |
| `/safety-map` | Safety Map | CSR (Leaflet) | HIGH |
| `/landasan-hukum` | Regulasi K3 | SSG | HIGH |
| `/video` | Video Library | ISR (3600s) | HIGH |
| `/galeri` | Galeri Kegiatan | ISR (3600s) | MEDIUM |
| `/struktur-organisasi` | Org Chart | SSG | MEDIUM |
| `/kontak` | Kontak & FAQ | SSG | MEDIUM |

**Rendering rules:**
- Static pages (Beranda, Tentang, Visi-Misi, Struktur Org, Landasan Hukum) → `generateStaticParams` or default SSG
- Dynamic content (Video, Galeri) → ISR with `revalidate: 3600`
- Safety Map → `dynamic import` with `ssr: false` (Leaflet requires DOM)
- Contact form → Server Action

---

## Design System

### Color Palette

```typescript
// tailwind.config.ts — extend colors:
colors: {
  primary: {
    900: '#0D2040',
    700: '#1B3A6B',  // PTFI Blue — main brand color
    500: '#2A5CAA',
    100: '#EEF2F8',
  },
  safety: {
    gold:   '#C9870A',  // Amber accent
    orange: '#E87B0A',
  },
}
```

### Typography

- **Font:** Inter (via `next/font`)
- **Headings:** `font-bold`, dark blue (`text-blue-950` or `text-primary-700`)
- **Body:** `text-slate-600` (light), `text-slate-300` (dark)
- **Accent text:** `text-amber-500`

### Spacing

- Section padding: `py-16` (mobile) → `py-24` (desktop)
- Container: `max-w-6xl mx-auto px-6 lg:px-8`
- Card padding: `p-5` or `p-6`

### Shadows & Elevation

```
shadow-sm    → default card
shadow-md    → hover state
shadow-lg    → modal, floating
shadow-glow-blue → 0 0 20px rgba(27,58,107,0.3)
```

---

## Component Rules

### 1. Always use `cn()` for className

```tsx
// ✅ CORRECT
import { cn } from '@/lib/utils'
<div className={cn('base-class', condition && 'conditional-class', className)} />

// ❌ WRONG
<div className={`base-class ${condition ? 'yes' : ''}`} />
```

### 2. Animation — use presets from `lib/animations.ts`

```tsx
import { fadeUp, staggerContainer, scaleUp } from '@/lib/animations'

// Section entry
<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>

// Grid with stagger
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map(item => <motion.div key={item.id} variants={fadeUp}>...</motion.div>)}
</motion.div>
```

### 3. Always respect `prefers-reduced-motion`

```tsx
import { useReducedMotion } from 'framer-motion'

const prefersReduced = useReducedMotion()
const variants = prefersReduced
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : fadeUp
```

### 4. Images — always use `next/image`

```tsx
import Image from 'next/image'
<Image
  src="/images/example.jpg"
  alt="Deskripsi gambar yang aksesibel"  // Always descriptive Indonesian text
  fill                                    // or width/height
  className="object-cover"
  priority                                // Only for above-the-fold
/>
```

### 5. Safety Map — always dynamic import with `ssr: false`

```tsx
// app/safety-map/page.tsx
const MapContainer = dynamic(
  () => import('@/components/sections/safety-map/MapContainer'),
  { ssr: false, loading: () => <MapSkeleton /> }
)
```

### 6. Data fetching — use JSON files for MVP

```typescript
// data/videos.json → import directly in Server Components
// No API calls needed for MVP
import videos from '@/data/videos.json'
```

---

## Key Components Reference

### `<SectionHeader />` — Use on every page section
```tsx
<SectionHeader
  eyebrow="K3 PTFI"          // Small uppercase label (optional)
  title="Visi Keselamatan"
  subtitle="Deskripsi singkat"
  align="center"              // 'left' | 'center' | 'right'
/>
```

### `<RevealOnScroll />` — Wrap content that should animate on scroll
```tsx
<RevealOnScroll delay={0.1}>
  <YourComponent />
</RevealOnScroll>
```

### `<Badge />` — Category labels
```tsx
<Badge variant="success">Prosedur Aman</Badge>
<Badge variant="danger">Tanggap Darurat</Badge>
<Badge variant="info">Orientasi</Badge>
<Badge variant="warning">Kampanye K3</Badge>
```

### `<Modal />` — Video player & lightbox
```tsx
<Modal open={isOpen} onClose={() => setOpen(false)} title="Judul Video">
  <div className="aspect-video">
    <iframe src="..." className="w-full h-full" />
  </div>
</Modal>
```

### `useCountUp()` — Animated statistics
```tsx
const { count, start } = useCountUp({ target: 50000000, duration: 2200 })
// Call start() when element enters viewport via IntersectionObserver
```

---

## Page-Specific Rules

### Beranda (Home) — `/`
Must contain in order:
1. `<HeroSection />` — full viewport, video/image background, gradient overlay
2. `<StatCounter />` — Safe Man Hours, Zero Accident Days, Karyawan Terlatih, Compliance Rate
3. `<QuickAccessGrid />` — 6 cards: Safety Map, Video K3, Regulasi, Struktur Org, Galeri, Kontak Darurat
4. Company Commitment Section — alternating image/text layout
5. Latest video preview (2-3 cards)
6. CTA banner

### Safety Map — `/safety-map`
- Load Leaflet via dynamic import ONLY (`ssr: false`)
- Provide static map image fallback if Leaflet fails
- Marker categories: Assembly Point (pulse animation), Medis, APAR, Jalur Evakuasi, Pos Keamanan
- Info panel slides in from right on marker click (`slideInRight` variant)
- Layer toggle controls per category

### Video Library — `/video`
- Category tabs: Semua | Orientasi | Prosedur Aman | Tanggap Darurat | Kampanye K3
- Search with 300ms debounce (`useDebounce` hook)
- `<VideoCard />` opens `<Modal />` with YouTube/self-hosted iframe
- Skeleton loaders while filtering
- 12 videos per page or infinite scroll

### Galeri — `/galeri`
- Masonry grid: 4 cols desktop, 2 cols mobile
- Filter with Framer Motion `LayoutGroup` + `AnimatePresence mode="popLayout"`
- Lightbox: full-screen, prev/next navigation, keyboard arrow support
- All photos need descriptive `alt` text in Indonesian

### Landasan Hukum — `/landasan-hukum`
- Cards grouped by category: UU, PP, Permen, Standar Internasional
- PDF download links open in `target="_blank" rel="noopener noreferrer"`
- Search/filter real-time (client-side, no page reload)

---

## Animation Guidelines

### Duration Rules (STRICT)
| Element | Duration | Ease |
|---|---|---|
| Card hover | 150–200ms | `ease-out` |
| Page transition | 300ms | `[0.22, 1, 0.36, 1]` |
| Modal enter | 250–300ms | `[0.22, 1, 0.36, 1]` |
| Section entry | 500ms | `[0.22, 1, 0.36, 1]` |
| Counter animation | 2200ms | Ease-out cubic (RAF) |
| Skeleton shimmer | 1500ms | `linear` |
| Pulse ring (map) | 2000ms | `cubic-bezier(0,0,0.2,1)` infinite |

### Animatable CSS Properties (GPU-friendly)
- ✅ Use: `transform` (translate, scale, rotate), `opacity`
- ❌ Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`

### Stagger Delays
- Cards grid: `staggerChildren: 0.08`
- Never stagger >20 items at once (use virtualization for large lists)

---

## Accessibility Requirements (WCAG 2.1 AA)

- All interactive elements must have `aria-label` or visible label
- Focus ring: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`
- Color contrast minimum 4.5:1 for body text, 3:1 for large text
- All images need descriptive `alt` text in Bahasa Indonesia
- Modal must trap focus and support `Escape` key to close
- Keyboard navigation must work on all interactive elements
- `prefers-reduced-motion` must disable all animations (not just slow them)

---

## SEO Requirements

Every page must have:
```tsx
// app/[page]/page.tsx
export const metadata: Metadata = {
  title: 'Judul Halaman | K3 PT Freeport Indonesia',
  description: 'Deskripsi halaman (120-160 karakter)',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-images/[page].jpg'],
  },
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | 320–767px | Single column, bottom nav |
| Tablet | 768–1023px | 2 columns, simplified nav |
| Desktop | 1024–1279px | Full nav, 3 columns |
| Wide | 1280px+ | Max-width container, 4+ columns |

Mobile-first development: write base styles for mobile, override with `md:`, `lg:`, `xl:`.

---

## Performance Rules

- All images use `next/image` (auto WebP/AVIF + lazy loading)
- Dynamic imports for heavy components: Leaflet, heavy charts
- `priority` on hero images only (above the fold)
- `revalidate: 3600` for ISR pages (Video, Galeri)
- JSON data files in `/data/*.json` for MVP (no external API calls)
- Avoid `will-change` on more than 2-3 elements simultaneously

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `VideoCard.tsx`, `SectionHeader.tsx` |
| Hooks | camelCase with `use` prefix | `useCountUp.ts`, `useDebounce.ts` |
| Pages | `page.tsx` in route folder | `app/video/page.tsx` |
| Data files | kebab-case | `map-markers.json` |
| CSS classes (custom) | kebab-case | `.marker-pulse`, `.skeleton-shimmer` |
| TypeScript interfaces | PascalCase with `Props` suffix | `VideoCardProps`, `BadgeProps` |

---

## Indonesian Language Rules

- All UI text, labels, headings → **Bahasa Indonesia**
- `alt` attributes → descriptive Bahasa Indonesia
- `aria-label` → Bahasa Indonesia
- Error messages → Bahasa Indonesia
- Dates → `id-ID` locale: `new Date().toLocaleDateString('id-ID')`
- Numbers → `id-ID` locale: `count.toLocaleString('id-ID')`

---

## What NOT to Do

- ❌ Never use `<form>` HTML element — use React event handlers (`onClick`, `onChange`)
- ❌ Never import Leaflet at module level — always `dynamic(() => import(...), { ssr: false })`
- ❌ Never use `localStorage` or `sessionStorage` in components (not supported in all environments)
- ❌ Never animate `width`/`height`/`margin`/`padding` — use `transform` + `opacity` only
- ❌ Never use unicode bullet characters `•` — use Tailwind list styles
- ❌ Never hardcode colors outside design system palette
- ❌ Never skip `alt` text on images
- ❌ Never open PDFs/external links without `target="_blank" rel="noopener noreferrer"`
- ❌ Never import full Framer Motion — `import { motion } from 'framer-motion'` only

---

## Quick Install Reference

```bash
# Core
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge

# Map
npm install leaflet react-leaflet
npm install -D @types/leaflet

# Forms
npm install react-hook-form zod @hookform/resolvers

# Tailwind plugins
npm install -D @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp
```

---

*Portal K3 PT Freeport Indonesia — PRD v1.0 | Juni 2026 | Internal Use Only*