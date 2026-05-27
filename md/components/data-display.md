# Data Display Components for Renovation / Real Estate Apps

---

## 1. Statistics Card with Animated Number Ticker

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

interface StatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
  trend?: { value: number; label: string }
  duration?: number
}

function StatCard({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  trend,
  duration = 2,
}: StatCardProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const controls = animate(0, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
        }
      },
    })

    return () => controls.stop()
  }, [isInView, value, prefix, suffix, decimals, duration])

  const trendPositive = trend && trend.value >= 0

  return (
    <div className="stat-card group relative overflow-hidden rounded-2xl bg-neutral-900 p-6 transition-all duration-300 hover:bg-neutral-800">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl" />
      </div>

      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">{label}</p>

      <div className="mt-3 flex items-end gap-2">
        <span
          ref={ref}
          className="text-5xl font-bold tabular-nums text-white"
        >
          {prefix}0{suffix}
        </span>
      </div>

      {trend && (
        <div className={`mt-3 flex items-center gap-1 text-sm font-medium ${trendPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          <svg
            className={`h-4 w-4 ${trendPositive ? '' : 'rotate-180'}`}
            viewBox="0 0 16 16" fill="currentColor"
          >
            <path d="M8 3l5 5H3l5-5z" />
          </svg>
          <span>{Math.abs(trend.value)}% {trend.label}</span>
        </div>
      )}
    </div>
  )
}

// Usage
<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <StatCard value={320} label="Projects Completed" suffix="+" trend={{ value: 12, label: 'vs last year' }} />
  <StatCard value={98} label="Client Satisfaction" suffix="%" decimals={0} />
  <StatCard value={1.2} label="Sq Ft Renovated" suffix="M" decimals={1} />
  <StatCard value={32} label="Years Experience" suffix="+" />
</div>
```

---

## 2. Timeline Component (Project Phases)

```tsx
'use client'
import { motion } from 'framer-motion'

interface TimelinePhase {
  id: string
  phase: number
  title: string
  description: string
  duration: string
  status: 'completed' | 'active' | 'upcoming'
  icon?: React.ReactNode
}

const phaseVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function Timeline({ phases }: { phases: TimelinePhase[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[22px] top-0 h-full w-px bg-neutral-800 lg:left-1/2" />

      <div className="space-y-8">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={phaseVariants}
            className={`relative flex items-start gap-6 lg:gap-0 ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Content — left or right */}
            <div className={`flex-1 lg:px-12 ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>
              <div className={`inline-block rounded-xl p-5 transition-all duration-300 ${
                phase.status === 'active'
                  ? 'bg-yellow-400/10 ring-1 ring-yellow-400/30'
                  : phase.status === 'completed'
                  ? 'bg-neutral-900'
                  : 'bg-neutral-950 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Phase {phase.phase}
                  </span>
                  <span className="text-xs text-neutral-600">{phase.duration}</span>
                  {phase.status === 'active' && (
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-yellow-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">{phase.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">{phase.description}</p>
              </div>
            </div>

            {/* Center dot */}
            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-950 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {phase.status === 'completed' ? (
                <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : phase.icon ? (
                phase.icon
              ) : (
                <span className="text-sm font-bold text-neutral-400">{phase.phase}</span>
              )}
            </div>

            {/* Empty space for alternating layout */}
            <div className="hidden flex-1 lg:block" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Usage
const renovationPhases: TimelinePhase[] = [
  { id: '1', phase: 1, title: 'Discovery & Planning', description: 'Site assessment, client briefing, and preliminary design concepts.', duration: '2 weeks', status: 'completed' },
  { id: '2', phase: 2, title: 'Design & Engineering', description: 'Detailed architectural drawings, structural engineering, and material selection.', duration: '4 weeks', status: 'completed' },
  { id: '3', phase: 3, title: 'Permitting', description: 'Submission of plans to local authorities and permit acquisition.', duration: '3–6 weeks', status: 'active' },
  { id: '4', phase: 4, title: 'Construction', description: 'Demolition, structural work, MEP rough-in, and finishes.', duration: '8–16 weeks', status: 'upcoming' },
  { id: '5', phase: 5, title: 'Handover', description: 'Final inspection, punch list, client walkthrough, and key handover.', duration: '1 week', status: 'upcoming' },
]
```

---

## 3. Before/After Image Comparison Slider

```tsx
'use client'
import { useRef, useState, useCallback } from 'react'

interface BeforeAfterProps {
  before: { src: string; alt: string; label?: string }
  after: { src: string; alt: string; label?: string }
  initialPosition?: number  // 0–100
}

function BeforeAfterSlider({ before, after, initialPosition = 50 }: BeforeAfterProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => { if (isDragging.current) updatePosition(e.clientX) },
    [updatePosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => updatePosition(e.touches[0].clientX),
    [updatePosition]
  )

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => { isDragging.current = false }}
      onMouseLeave={() => { isDragging.current = false }}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full width, underneath) */}
      <img src={after.src} alt={after.alt} className="absolute inset-0 h-full w-full object-cover" />

      {/* Before image (clipped to left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before.src} alt={before.alt} className="h-full w-full object-cover" />
      </div>

      {/* Labels */}
      <div
        className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: position > 20 ? 1 : 0 }}
      >
        {before.label ?? 'Before'}
      </div>
      <div
        className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: position < 80 ? 1 : 0 }}
      >
        {after.label ?? 'After'}
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => { e.preventDefault(); isDragging.current = true }}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl shadow-black/30 ring-2 ring-white/20">
          <svg className="h-5 w-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
```

---

## 4. Image Gallery with Lightbox (yet-another-react-lightbox — MIT)

```tsx
'use client'
// npm install yet-another-react-lightbox
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1)

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
    description: img.caption,
  }))

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.07, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            style={{ aspectRatio: i % 5 === 0 ? '4/5' : '4/3' }}
            onClick={() => setIndex(i)}
            aria-label={`Open ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20">
              <div className="flex h-full items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Zoom, Counter]}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.95)' },
        }}
        zoom={{ maxZoomPixelRatio: 3 }}
        thumbnails={{ border: 0, gap: 8, imageFit: 'cover' }}
      />
    </>
  )
}
```

---

## 5. Infinite Scroll List

```tsx
'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Project { id: string; title: string; image: string; status: string }

async function fetchProjects({ pageParam = 1 }): Promise<{ data: Project[]; hasMore: boolean }> {
  const res = await fetch(`/api/projects?page=${pageParam}&limit=12`)
  return res.json()
}

function InfiniteProjectList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['projects', 'infinite'],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (last, _, param) => (last.hasMore ? (param as number) + 1 : undefined),
  })

  const sentinelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sentinelRef, { margin: '200px' })

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (status === 'pending') return <ProjectSkeleton count={12} />
  if (status === 'error') return <ErrorState />

  const projects = data.pages.flatMap((p) => p.data)

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {isFetchingNextPage && <ProjectSkeleton count={3} />}
      </div>

      {/* Invisible sentinel element */}
      <div ref={sentinelRef} className="h-4" aria-hidden="true" />

      {!hasNextPage && projects.length > 0 && (
        <p className="mt-12 text-center text-sm text-neutral-500">All {projects.length} projects loaded</p>
      )}
    </div>
  )
}

function ProjectSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-neutral-900">
          <div className="aspect-video rounded-t-2xl bg-neutral-800" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-3/4 rounded-full bg-neutral-800" />
            <div className="h-3 w-1/2 rounded-full bg-neutral-800" />
          </div>
        </div>
      ))}
    </>
  )
}
```

---

## 6. Masonry Grid (CSS Columns)

```tsx
'use client'
import { motion } from 'framer-motion'

// Pure CSS columns — no JS masonry library needed for most cases
interface MasonryGridProps<T> {
  items: T[]
  columns?: { default: number; md?: number; lg?: number }
  gap?: number
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string
}

function MasonryGrid<T>({
  items,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 16,
  renderItem,
  keyExtractor,
}: MasonryGridProps<T>) {
  return (
    <div
      style={{
        columns: `${columns.default}`,
        columnGap: `${gap}px`,
      }}
      className={`[column-count:var(--cols-default)] md:[column-count:var(--cols-md)] lg:[column-count:var(--cols-lg)]`}
    >
      <style>{`
        :root {
          --cols-default: ${columns.default};
          --cols-md: ${columns.md ?? columns.default};
          --cols-lg: ${columns.lg ?? columns.md ?? columns.default};
        }
      `}</style>
      {items.map((item, i) => (
        <motion.div
          key={keyExtractor(item)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ delay: (i % (columns.lg ?? 3)) * 0.08, duration: 0.5 }}
          className="mb-4 break-inside-avoid"
        >
          {renderItem(item, i)}
        </motion.div>
      ))}
    </div>
  )
}

// react-masonry-css version (npm install react-masonry-css — MIT)
import Masonry from 'react-masonry-css'

function MasonryCSSGrid({ images }: { images: { src: string; alt: string; height: number }[] }) {
  const breakpoints = {
    default: 4,
    1280: 3,
    768: 2,
    480: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {images.map((img) => (
        <div key={img.src} className="mb-4 overflow-hidden rounded-xl">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </Masonry>
  )
}
```

---

## 7. Data Table with Sorting (TanStack Table — MIT)

```tsx
'use client'
// npm install @tanstack/react-table
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'

interface Project {
  id: string
  name: string
  client: string
  status: 'active' | 'completed' | 'on-hold'
  budget: number
  completionDate: string
}

const columnHelper = createColumnHelper<Project>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Project',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-yellow-400/20" />
        <span className="font-medium text-white">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('client', {
    header: 'Client',
    cell: (info) => <span className="text-neutral-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue()
      const styles = {
        active: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
        completed: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
        'on-hold': 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
      }
      return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles[status]}`}>
          {status.replace('-', ' ')}
        </span>
      )
    },
  }),
  columnHelper.accessor('budget', {
    header: 'Budget',
    cell: (info) => (
      <span className="font-mono text-neutral-300">
        ${info.getValue().toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor('completionDate', {
    header: 'Completion',
    cell: (info) => <span className="text-neutral-400">{info.getValue()}</span>,
  }),
]

function ProjectTable({ data }: { data: Project[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <h2 className="font-semibold text-white">Projects</h2>
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-56 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none ring-1 ring-neutral-700 focus:ring-yellow-400/50"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-neutral-800">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 ${
                      header.column.getCanSort() ? 'cursor-pointer select-none hover:text-white' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-neutral-600">
                          {{ asc: '↑', desc: '↓' }[header.column.getIsSorted() as string] ?? '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-neutral-800/50 transition-colors hover:bg-neutral-800/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="py-12 text-center text-neutral-500">No projects found</div>
      )}
    </div>
  )
}
```

---

## 8. Calendar / Date Picker

```tsx
'use client'
import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns'

interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  bookedDates?: Date[]
}

function Calendar({ value, onChange, minDate, maxDate, bookedDates = [] }: CalendarProps) {
  const [viewDate, setViewDate] = useState(value ?? new Date())

  const monthStart = startOfMonth(viewDate)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calEnd = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: calStart, end: calEnd })

  const isBooked = (day: Date) => bookedDates.some((d) => isSameDay(d, day))
  const isSelected = (day: Date) => value ? isSameDay(day, value) : false
  const isDisabled = (day: Date) =>
    (minDate && day < minDate) || (maxDate && day > maxDate) || false

  return (
    <div className="w-80 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          aria-label="Previous month"
        >
          ‹
        </button>
        <h2 className="text-sm font-semibold text-white">
          {format(viewDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d} className="py-1 text-xs font-medium text-neutral-600">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((day) => {
          const inMonth = isSameMonth(day, viewDate)
          const selected = isSelected(day)
          const booked = isBooked(day)
          const disabled = isDisabled(day)
          const today = isToday(day)

          return (
            <button
              key={day.toISOString()}
              disabled={disabled || booked}
              onClick={() => onChange?.(day)}
              className={`
                relative mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-150
                ${!inMonth && 'text-neutral-700'}
                ${inMonth && !selected && !today && !booked && !disabled && 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}
                ${today && !selected && 'font-semibold text-yellow-400'}
                ${selected && 'bg-yellow-400 font-semibold text-black hover:bg-yellow-300'}
                ${booked && 'cursor-not-allowed text-neutral-700 line-through'}
                ${disabled && 'cursor-not-allowed opacity-30'}
              `}
            >
              {format(day, 'd')}
              {booked && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
```
