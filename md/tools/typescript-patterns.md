# TypeScript Patterns for React Component Libraries

## Generic Components with Proper Typing

```tsx
// Generic list component — preserves item type through the tree
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string
  className?: string
}

function List<T>({ items, renderItem, keyExtractor, className }: ListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  )
}

// Usage — T is inferred
<List
  items={projects}
  keyExtractor={(p) => p.id}
  renderItem={(p) => <ProjectCard project={p} />}
/>
```

```tsx
// Generic Select with value constraint
interface SelectProps<T extends string | number> {
  value: T
  options: { label: string; value: T }[]
  onChange: (value: T) => void
}

function Select<T extends string | number>({ value, options, onChange }: SelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
```

---

## Discriminated Unions for Variants

```tsx
// Button with mutually exclusive variants — no invalid state possible
type ButtonProps =
  | { variant: 'primary'; loading?: boolean; children: React.ReactNode }
  | { variant: 'icon'; icon: React.ReactNode; label: string }
  | { variant: 'ghost'; destructive?: boolean; children: React.ReactNode }

function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, ...rest } = props

  if (variant === 'icon') {
    const { icon, label, ...btnProps } = rest as any
    return (
      <button aria-label={label} {...btnProps}>
        {icon}
      </button>
    )
  }

  if (variant === 'primary') {
    const { loading, children, ...btnProps } = rest as any
    return (
      <button data-loading={loading} {...btnProps}>
        {loading ? <Spinner /> : children}
      </button>
    )
  }

  const { destructive, children, ...btnProps } = rest as any
  return (
    <button data-destructive={destructive} {...btnProps}>
      {children}
    </button>
  )
}
```

```tsx
// Card variants — layout changes per type
type CardProps =
  | { type: 'stat'; value: number; label: string; trend?: number }
  | { type: 'project'; title: string; image: string; status: 'active' | 'done' }
  | { type: 'testimonial'; quote: string; author: string; avatar: string }

function Card(props: CardProps) {
  switch (props.type) {
    case 'stat':
      return <StatCard value={props.value} label={props.label} trend={props.trend} />
    case 'project':
      return <ProjectCard title={props.title} image={props.image} status={props.status} />
    case 'testimonial':
      return <TestimonialCard quote={props.quote} author={props.author} avatar={props.avatar} />
  }
}
```

---

## ComponentProps<typeof X> Inheritance

```tsx
// Extend native elements cleanly
import type { ComponentProps } from 'react'

// Input with design-system styling — all native props pass through
type InputProps = ComponentProps<'input'> & {
  label?: string
  error?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="field">
      {label && <label>{label}</label>}
      <input
        ref={ref}
        className={cn('input', error && 'input--error', className)}
        aria-invalid={!!error}
        {...props}
      />
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  )
)

// Extend a custom component
type IconButtonProps = ComponentProps<typeof Button> & {
  icon: React.ReactNode
  tooltip?: string
}
```

```tsx
// Polymorphic component (as prop pattern)
type PolymorphicProps<E extends React.ElementType, P = {}> = P &
  Omit<React.ComponentPropsWithRef<E>, keyof P> & {
    as?: E
  }

type TextProps<E extends React.ElementType = 'span'> = PolymorphicProps<
  E,
  { size?: 'sm' | 'md' | 'lg'; weight?: 'normal' | 'medium' | 'bold' }
>

function Text<E extends React.ElementType = 'span'>({
  as,
  size = 'md',
  weight = 'normal',
  className,
  ...props
}: TextProps<E>) {
  const Tag = as ?? 'span'
  return <Tag className={cn('text', `text--${size}`, `text--${weight}`, className)} {...props} />
}

// Usage
<Text as="h1" size="lg" weight="bold">Heading</Text>
<Text as="p" size="sm">Paragraph</Text>
```

---

## as const satisfies Pattern

```tsx
// Design tokens — fully typed, no widening
const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const satisfies Record<string, `${number}rem`>

type Spacing = keyof typeof spacing  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Animation variants map
const MOTION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10 },
} as const satisfies Variants  // Variants from framer-motion

// Route config with enforced shape
const ROUTES = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/projects', label: 'Projects', icon: 'folder' },
  { path: '/contact', label: 'Contact', icon: 'mail' },
] as const satisfies { path: string; label: string; icon: string }[]

type Route = (typeof ROUTES)[number]
type RoutePath = Route['path']  // '/' | '/projects' | '/contact'
```

```tsx
// Theme config — satisfies ensures shape, as const prevents widening
const theme = {
  colors: {
    primary: '#0A0A0A',
    accent: '#F5E642',
    surface: '#1A1A1A',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
} as const satisfies {
  colors: Record<string, `#${string}`>
  radii: Record<string, `${number}px` | '9999px'>
}
```

---

## Type-Safe Event Handlers

```tsx
// Strongly-typed form handlers
type FormFields = {
  name: string
  email: string
  budget: number
  projectType: 'residential' | 'commercial' | 'industrial'
}

function ContactForm() {
  const [fields, setFields] = React.useState<FormFields>({
    name: '',
    email: '',
    budget: 0,
    projectType: 'residential',
  })

  // Generic field updater — key is constrained to FormFields keys
  const handleChange = <K extends keyof FormFields>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value as FormFields[K] }))
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    // ...
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={fields.name} onChange={handleChange('name')} />
      <input value={fields.email} onChange={handleChange('email')} />
      <select value={fields.projectType} onChange={handleChange('projectType')}>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
    </form>
  )
}
```

```tsx
// Custom event emitter with typed events
type AppEvents = {
  'cart:add': { productId: string; qty: number }
  'cart:remove': { productId: string }
  'modal:open': { id: string }
  'modal:close': void
}

type EventHandler<T> = T extends void ? () => void : (payload: T) => void

class TypedEmitter {
  private handlers = new Map<string, Set<Function>>()

  on<K extends keyof AppEvents>(event: K, handler: EventHandler<AppEvents[K]>) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set())
    this.handlers.get(event)!.add(handler)
    return () => this.handlers.get(event)?.delete(handler)
  }

  emit<K extends keyof AppEvents>(
    event: K,
    ...args: AppEvents[K] extends void ? [] : [AppEvents[K]]
  ) {
    this.handlers.get(event)?.forEach((h) => h(...args))
  }
}
```

---

## Typing Framer Motion Variants

```tsx
import { Variants, Transition, MotionProps } from 'framer-motion'

// Typed variant factory
function createStaggerVariants(
  delay: number = 0.05,
  duration: number = 0.4
): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: {},
      visible: {
        transition: { staggerChildren: delay, delayChildren: 0.1 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  }
}

const { container, item } = createStaggerVariants(0.07, 0.5)

// Typed page transition
const pageVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

const pageTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
}

// Component with fully typed motion props
interface AnimatedCardProps extends MotionProps {
  children: React.ReactNode
  delay?: number
}

function AnimatedCard({ children, delay = 0, ...motionProps }: AnimatedCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
        },
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
```

```tsx
// useAnimation with typed controls
import { useAnimation, AnimationControls } from 'framer-motion'

function useRevealAnimation(threshold = 0.2) {
  const controls: AnimationControls = useAnimation()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start('visible')
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [controls, threshold])

  return { ref, controls }
}
```

---

## Typing GSAP Timelines in React

```tsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GSAPTimeline, TweenVars } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

// Typed timeline hook
function useGSAPTimeline(deps: React.DependencyList = []) {
  const tlRef = React.useRef<GSAPTimeline | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
    }, containerRef)

    return () => ctx.revert()
  }, deps)

  return { tlRef, containerRef }
}

// Typed scroll-triggered animation
interface ScrollAnimConfig {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
}

function createScrollTimeline(
  targets: gsap.TweenTarget,
  vars: TweenVars,
  scrollConfig: ScrollAnimConfig
): GSAPTimeline {
  return gsap.timeline({
    scrollTrigger: {
      trigger: scrollConfig.trigger,
      start: scrollConfig.start ?? 'top 80%',
      end: scrollConfig.end ?? 'bottom 20%',
      scrub: scrollConfig.scrub ?? false,
      markers: scrollConfig.markers ?? false,
    },
  }).from(targets, vars)
}

// Component usage
function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl: GSAPTimeline = gsap.timeline()

      tl.from('.hero-title', { opacity: 0, y: 60, duration: 1, ease: 'power3.out' })
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">Build Spaces That Inspire</h1>
      <p className="hero-sub">Premium renovation since 1992</p>
      <button className="hero-cta">View Projects</button>
    </div>
  )
}
```

---

## Typing Three.js / R3F Refs

```tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh, Group, PerspectiveCamera, ShaderMaterial } from 'three'

// Typed mesh ref
function RotatingBox() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.5
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    // e.object is typed as THREE.Object3D
  }

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#F5E642" />
    </mesh>
  )
}

// Typed group with multiple children
function Scene() {
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()

  // camera is THREE.Camera but we need PerspectiveCamera methods
  const perspCam = camera as PerspectiveCamera

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.005
  })

  return <group ref={groupRef}>{/* children */}</group>
}

// Custom shader material typing
interface CustomShaderUniforms {
  uTime: { value: number }
  uColor: { value: THREE.Color }
  uOpacity: { value: number }
}

const shaderMaterialRef = useRef<ShaderMaterial & { uniforms: CustomShaderUniforms }>(null)

useFrame(({ clock }) => {
  if (!shaderMaterialRef.current) return
  shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime()
})

// useGLTF with typed result
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

interface ModelGLTF extends GLTF {
  nodes: {
    Building: THREE.Mesh
    Roof: THREE.Mesh
    Windows: THREE.Mesh
  }
  materials: {
    Concrete: THREE.MeshStandardMaterial
    Glass: THREE.MeshPhysicalMaterial
  }
}

function BuildingModel({ url }: { url: string }) {
  const gltf = useGLTF(url) as ModelGLTF
  const { nodes, materials } = gltf

  return (
    <group>
      <mesh geometry={nodes.Building.geometry} material={materials.Concrete} />
      <mesh geometry={nodes.Roof.geometry} material={materials.Concrete} />
      <mesh geometry={nodes.Windows.geometry} material={materials.Glass} />
    </group>
  )
}
```

---

## Zod for Runtime Validation + TypeScript Inference

```tsx
import { z } from 'zod'

// Define schema once, infer type from it
const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  status: z.enum(['planning', 'active', 'completed', 'on-hold']),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime(),
  completedDate: z.string().datetime().nullable(),
  tags: z.array(z.string()).default([]),
  client: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[\d\s-()]{10,}$/).optional(),
  }),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string(),
    isPrimary: z.boolean().default(false),
  })).min(1),
})

// Inferred TypeScript type — no duplication
type Project = z.infer<typeof ProjectSchema>

// Form schema with refinements
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  budget: z.enum(['under-50k', '50k-150k', '150k-500k', 'over-500k']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  preferredContact: z.enum(['email', 'phone', 'either']).default('email'),
}).refine(
  (data) => data.preferredContact !== 'phone' || !!data.phone,
  { message: 'Phone number required when phone contact is preferred', path: ['phone'] }
)

type ContactForm = z.infer<typeof ContactFormSchema>

// API response validation
const APIResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({
      total: z.number(),
      page: z.number(),
      perPage: z.number(),
    }).optional(),
    error: z.string().optional(),
  })

async function fetchProjects(page = 1): Promise<Project[]> {
  const res = await fetch(`/api/projects?page=${page}`)
  const json = await res.json()

  const parsed = APIResponseSchema(z.array(ProjectSchema)).safeParse(json)

  if (!parsed.success) {
    console.error('API response validation failed:', parsed.error.flatten())
    throw new Error('Invalid API response shape')
  }

  return parsed.data.data
}

// React Hook Form + Zod integration
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function ContactFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { preferredContact: 'email' },
  })

  const onSubmit = async (data: ContactForm) => {
    // data is fully typed and validated
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      <button disabled={isSubmitting}>Submit</button>
    </form>
  )
}
```
