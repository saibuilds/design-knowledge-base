# State Management for Design-Heavy React Apps

## Decision Tree

```
Is data from a server?
  → YES → TanStack Query (caching, background sync, pagination)
  → NO  → Is state truly global across routes?
             → YES → Zustand (stores) or Jotai (atoms)
             → NO  → useState / useReducer at component level
                       → Is it URL-serializable? → nuqs
                       → Is it form state? → React Hook Form
```

---

## Zustand — Lightweight Global State (Best for Most Cases)

```tsx
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Typed store with actions
interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  // Actions
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  // Computed (derived in selectors, not state)
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],
        isOpen: false,

        addItem: (item) =>
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id)
            if (existing) {
              existing.qty += 1
            } else {
              state.items.push({ ...item, qty: 1 })
            }
          }),

        removeItem: (id) =>
          set((state) => {
            state.items = state.items.filter((i) => i.id !== id)
          }),

        updateQty: (id, qty) =>
          set((state) => {
            const item = state.items.find((i) => i.id === id)
            if (item) item.qty = Math.max(0, qty)
            state.items = state.items.filter((i) => i.qty > 0)
          }),

        clearCart: () => set({ items: [] }),
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      })),
      { name: 'cart-store', partialize: (s) => ({ items: s.items }) }
    ),
    { name: 'CartStore' }
  )
)

// Selectors — never subscribe to the whole store
const useCartItems = () => useCartStore((s) => s.items)
const useCartTotal = () =>
  useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.qty, 0))
const useCartCount = () =>
  useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0))
```

```tsx
// Multi-slice pattern — separate stores per domain
interface UIStore {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  activeModal: string | null
  setTheme: (theme: UIStore['theme']) => void
  openModal: (id: string) => void
  closeModal: () => void
}

const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      theme: 'system',
      sidebarOpen: false,
      activeModal: null,
      setTheme: (theme) => set({ theme }),
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),
    }),
    { name: 'UIStore' }
  )
)

// Subscribe outside React for imperative use (e.g., GSAP, analytics)
useCartStore.subscribe(
  (state) => state.items.length,
  (count) => {
    // Trigger animation when cart count changes
    if (count > 0) cartBadgeAnimation.play()
  }
)
```

---

## Jotai — Atomic State (Best for Fine-Grained, Derived State)

```tsx
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage, atomWithReset, RESET } from 'jotai/utils'
import { loadable } from 'jotai/utils'

// Primitive atoms
const searchQueryAtom = atom('')
const selectedFiltersAtom = atom<string[]>([])
const sortByAtom = atom<'price' | 'date' | 'name'>('date')

// Derived atom — recomputes when dependencies change
const filteredProjectsAtom = atom(async (get) => {
  const query = get(searchQueryAtom)
  const filters = get(selectedFiltersAtom)
  const sortBy = get(sortByAtom)

  const projects = await fetch(`/api/projects?q=${query}&sort=${sortBy}`).then((r) => r.json())

  return filters.length
    ? projects.filter((p: any) => filters.some((f) => p.tags.includes(f)))
    : projects
})

// Wrap async atom with loadable to avoid Suspense
const loadableProjectsAtom = loadable(filteredProjectsAtom)

// Persistent atom
const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark')

// Resettable atom
const formAtom = atomWithReset({ name: '', email: '', message: '' })

// Atom family — one atom per project ID
import { atomFamily } from 'jotai/utils'

const projectAtomFamily = atomFamily((id: string) =>
  atom(async () => {
    const res = await fetch(`/api/projects/${id}`)
    return res.json()
  })
)

// Component usage
function ProjectFilters() {
  const [query, setQuery] = useAtom(searchQueryAtom)
  const setFilters = useSetAtom(selectedFiltersAtom)
  const projects = useAtomValue(loadableProjectsAtom)

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {projects.state === 'loading' && <Spinner />}
      {projects.state === 'hasData' && <ProjectList items={projects.data} />}
      {projects.state === 'hasError' && <ErrorState />}
    </div>
  )
}
```

---

## TanStack Query — Server State

```tsx
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Query client with sensible defaults for design apps
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 minutes
      gcTime: 1000 * 60 * 30,      // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false, // Less aggressive for content sites
    },
  },
})

// Typed query hooks — collocate with API layer
interface Project {
  id: string
  title: string
  status: string
  images: { url: string; alt: string }[]
}

function useProjects(filters?: { status?: string; tag?: string }) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () =>
      fetch(`/api/projects?${new URLSearchParams(filters as any)}`).then((r) => {
        if (!r.ok) throw new Error('Failed to fetch projects')
        return r.json() as Promise<Project[]>
      }),
    select: (data) => data.sort((a, b) => a.title.localeCompare(b.title)),
  })
}

function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetch(`/api/projects/${id}`).then((r) => r.json() as Promise<Project>),
    enabled: !!id,
  })
}

// Mutation with optimistic update
function useUpdateProject() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Project> & { id: string }) =>
      fetch(`/api/projects/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: ['projects', data.id] })
      const previous = qc.getQueryData<Project>(['projects', data.id])
      qc.setQueryData(['projects', data.id], (old: Project) => ({ ...old, ...data }))
      return { previous }
    },

    onError: (_err, data, ctx) => {
      qc.setQueryData(['projects', data.id], ctx?.previous)
    },

    onSettled: (_data, _err, data) => {
      qc.invalidateQueries({ queryKey: ['projects', data.id] })
      qc.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

// Infinite scroll query
function useInfiniteProjects() {
  return useInfiniteQuery({
    queryKey: ['projects', 'infinite'],
    queryFn: ({ pageParam = 1 }) =>
      fetch(`/api/projects?page=${pageParam}&limit=12`).then((r) => r.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasMore ? (lastPageParam as number) + 1 : undefined,
  })
}
```

---

## When NOT to Use Redux

Redux adds complexity that pays off only when:
- Large team needs strict unidirectional data flow enforcement
- Complex time-travel debugging is essential
- Existing codebase already uses it heavily

**Skip Redux if:**
- App has < 10 global state slices → Zustand is 10x simpler
- State is mostly server data → TanStack Query handles it
- State is mostly local → useState/useReducer
- You're starting a new project → You'll never need it

```tsx
// Redux-style reducer in Zustand — same pattern, no boilerplate
type Action =
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'TOGGLE_VIEW'; payload: 'grid' | 'list' }
  | { type: 'RESET' }

interface FilterState {
  filter: string
  view: 'grid' | 'list'
  dispatch: (action: Action) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  filter: '',
  view: 'grid',
  dispatch: (action) =>
    set((state) => {
      switch (action.type) {
        case 'SET_FILTER': return { filter: action.payload }
        case 'TOGGLE_VIEW': return { view: action.payload }
        case 'RESET': return { filter: '', view: 'grid' }
        default: return state
      }
    }),
}))
```

---

## Context API Limits

Context is fine for:
- Theme (changes infrequently)
- Auth/user session
- Localization/i18n
- Component composition (slot filling)

Context is bad for:
- High-frequency updates (causes full subtree re-renders)
- Large state objects where only part changes
- State accessed in many unrelated components

```tsx
// Good Context use — stable auth data
interface AuthContext {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthCtx = React.createContext<AuthContext | null>(null)

function useAuth(): AuthContext {
  const ctx = React.useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// BAD Context use — animated counter that updates 60fps
// Every consumer re-renders on each frame — use Zustand instead
const BadCounterCtx = React.createContext({ count: 0 }) // Don't do this for animated values
```

---

## Global Animation State (GSAP Shared Timeline)

```tsx
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import gsap from 'gsap'

interface AnimationStore {
  introComplete: boolean
  pageTransitioning: boolean
  masterTimeline: gsap.core.Timeline | null
  setIntroComplete: () => void
  setPageTransitioning: (v: boolean) => void
  setMasterTimeline: (tl: gsap.core.Timeline) => void
}

const useAnimationStore = create<AnimationStore>()(
  subscribeWithSelector((set) => ({
    introComplete: false,
    pageTransitioning: false,
    masterTimeline: null,
    setIntroComplete: () => set({ introComplete: true }),
    setPageTransitioning: (v) => set({ pageTransitioning: v }),
    setMasterTimeline: (tl) => set({ masterTimeline: tl }),
  }))
)

// Provider that creates master timeline
function AnimationProvider({ children }: { children: React.ReactNode }) {
  const setMasterTimeline = useAnimationStore((s) => s.setMasterTimeline)
  const setIntroComplete = useAnimationStore((s) => s.setIntroComplete)

  React.useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: setIntroComplete,
    })
    setMasterTimeline(tl)

    // Intro sequence
    tl.from('.site-loader', { opacity: 1, duration: 0.5 })
      .from('.nav', { y: -60, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from('.hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return <>{children}</>
}

// Subscribe to intro state for conditional rendering
function PageContent() {
  const introComplete = useAnimationStore((s) => s.introComplete)
  if (!introComplete) return null
  return <main>{/* page content */}</main>
}

// GSAP context per component — safe cleanup
function Section({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLElement>(null)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return <section ref={ref}>{children}</section>
}
```

---

## Cart / Form State with Zustand

```tsx
// Multi-step form store
interface FormStore {
  step: number
  maxStep: number
  data: {
    contact: { name: string; email: string; phone: string }
    project: { type: string; budget: string; timeline: string; description: string }
    property: { address: string; size: number; rooms: number }
  }
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateContact: (data: Partial<FormStore['data']['contact']>) => void
  updateProject: (data: Partial<FormStore['data']['project']>) => void
  updateProperty: (data: Partial<FormStore['data']['property']>) => void
  reset: () => void
}

const initialData: FormStore['data'] = {
  contact: { name: '', email: '', phone: '' },
  project: { type: '', budget: '', timeline: '', description: '' },
  property: { address: '', size: 0, rooms: 0 },
}

const useFormStore = create<FormStore>()(
  devtools(
    immer((set) => ({
      step: 0,
      maxStep: 3,
      data: initialData,
      setStep: (step) => set({ step }),
      nextStep: () => set((s) => { s.step = Math.min(s.step + 1, s.maxStep) }),
      prevStep: () => set((s) => { s.step = Math.max(s.step - 1, 0) }),
      updateContact: (data) => set((s) => { Object.assign(s.data.contact, data) }),
      updateProject: (data) => set((s) => { Object.assign(s.data.project, data) }),
      updateProperty: (data) => set((s) => { Object.assign(s.data.property, data) }),
      reset: () => set({ step: 0, data: initialData }),
    }))
  )
)
```

---

## URL State with nuqs

```tsx
// nuqs — type-safe URL search params (MIT)
// npm install nuqs
import {
  useQueryState,
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
  parseAsArrayOf,
} from 'nuqs'

// Single param
function SearchBar() {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value || null)}
      placeholder="Search projects..."
    />
  )
}

// Multiple params — batched URL update
const ProjectFilters = () => {
  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    status: parseAsStringEnum(['active', 'completed', 'all'] as const).withDefault('all'),
    tags: parseAsArrayOf(parseAsString).withDefault([]),
    sort: parseAsStringEnum(['date', 'price', 'name'] as const).withDefault('date'),
  })

  return (
    <div>
      <select
        value={params.status}
        onChange={(e) => setParams({ status: e.target.value as any, page: 1 })}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={params.sort}
        onChange={(e) => setParams({ sort: e.target.value as any })}
      >
        <option value="date">Newest</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      {/* URL updates: ?status=active&sort=price&page=1 */}
    </div>
  )
}

// Combine nuqs with TanStack Query — URL is source of truth
function ProjectsPage() {
  const [{ page, status, tags, sort }] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    status: parseAsStringEnum(['active', 'completed', 'all'] as const).withDefault('all'),
    tags: parseAsArrayOf(parseAsString).withDefault([]),
    sort: parseAsStringEnum(['date', 'price', 'name'] as const).withDefault('date'),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['projects', { page, status, tags, sort }],
    queryFn: () =>
      fetch(
        `/api/projects?page=${page}&status=${status}&tags=${tags.join(',')}&sort=${sort}`
      ).then((r) => r.json()),
  })

  // Shareable URLs, browser back/forward works, no state sync needed
  return isLoading ? <Skeleton /> : <ProjectGrid projects={data} />
}
```
