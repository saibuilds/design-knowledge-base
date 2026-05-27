# Framer Motion — Animation Patterns

> MIT License. Most powerful React animation library.

## Install
```bash
npm install framer-motion
```

## Core API

### Basic motion element
```tsx
import { motion } from 'framer-motion'
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} />
```

### Scroll-triggered entrance
```tsx
<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }} />
```

### Stagger children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

### Page transitions (AnimatePresence)
```tsx
import { AnimatePresence, motion } from 'framer-motion'
// In layout:
<AnimatePresence mode="wait">
  <motion.div key={router.pathname}
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}>
    {children}
  </motion.div>
</AnimatePresence>
```

### Scroll progress
```tsx
import { useScroll, useTransform } from 'framer-motion'
const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
<motion.div style={{ opacity, scale }}>Hero content</motion.div>
```

### Parallax with useScroll
```tsx
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, -150])
<motion.div style={{ y }} className="hero-bg" />
```

### Drag
```tsx
<motion.div drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  dragElastic={0.1} whileDrag={{ scale: 1.1 }} className="w-24 h-24 bg-amber-400 rounded-full cursor-grab" />
```

### Hover / Tap gestures
```tsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: '#f59e0b' }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
  Click me
</motion.button>
```

### Layout animations (shared element transitions)
```tsx
// Same layoutId = Framer auto-animates between positions
<AnimatePresence>
  {selected && (
    <motion.div layoutId="card-modal" className="fixed inset-4 bg-white rounded-2xl z-50">
      <motion.img layoutId="card-image" src={selected.img} />
    </motion.div>
  )}
</AnimatePresence>
{items.map(item => (
  <motion.div key={item.id} layoutId="card-modal" onClick={() => setSelected(item)}>
    <motion.img layoutId="card-image" src={item.img} />
  </motion.div>
))}
```

### Scroll velocity (scroll speed → value)
```tsx
import { useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
const { scrollY } = useScroll()
const scrollVelocity = useVelocity(scrollY)
const skewX = useTransform(scrollVelocity, [-1000, 1000], [-20, 20])
const smoothSkew = useSpring(skewX, { mass: 3, stiffness: 400, damping: 90 })
<motion.div style={{ skewX: smoothSkew }}>Skewing marquee text</motion.div>
```

### Morphing SVG
```tsx
<motion.path animate={{ d: isOpen ? openPath : closedPath }}
  transition={{ duration: 0.4, ease: 'easeInOut' }} />
```

### useMotionValue + useTransform
```tsx
const x = useMotionValue(0)
const background = useTransform(x, [-100, 0, 100], ['#ff0', '#fff', '#0ff'])
<motion.div drag="x" style={{ x, background }} className="w-32 h-32 rounded-full" />
```

### Spring physics
```tsx
<motion.div animate={{ x: isOpen ? 0 : -300 }}
  transition={{ type: 'spring', stiffness: 260, damping: 20 }} />
```

### Exit animations
```tsx
<AnimatePresence>
  {show && (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### Scroll-linked navbar hide/show
```tsx
const { scrollY } = useScroll()
const [visible, setVisible] = useState(true)
let lastY = 0
useEffect(() => scrollY.on('change', (y) => { setVisible(y < lastY || y < 100); lastY = y }), [])
<motion.header animate={{ y: visible ? 0 : -100 }} transition={{ duration: 0.3 }}>
  Navbar
</motion.header>
```

## Easing Reference
```js
// Presets
'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
// Custom cubic bezier
[0.25, 0.1, 0.25, 1]   // ease
[0.4, 0, 0.2, 1]       // material design standard
[0.76, 0, 0.24, 1]     // expo
[0.33, 1, 0.68, 1]     // quint out
// Spring
{ type: 'spring', stiffness: 100, damping: 15 }
{ type: 'spring', bounce: 0.25 }
```
