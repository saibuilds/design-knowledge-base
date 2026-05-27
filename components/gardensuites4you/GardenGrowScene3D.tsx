'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/GS4Y-GARDEN-GROW-placeholder/scene.splinecode'

// Brand tokens
const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; angle: number; spin: number; alpha: number; life: number
  color: string
}

function GardenGrowFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    canvas.addEventListener('mousemove', onMouseMove)

    const particles: Particle[] = []
    const treeColors = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#166534']

    const spawnParticle = (x: number, y: number) => {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -Math.random() * 2.2 - 0.4,
        size: 3 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.12,
        alpha: 0.8,
        life: 1,
        color: treeColors[Math.floor(Math.random() * treeColors.length)],
      })
    }

    let t = 0
    let rafId = 0
    const growStart = 0.4
    const growDuration = 2.8

    const animate = () => {
      t += 0.016
      const W = canvas.width
      const H = canvas.height

      // Parallax offset from mouse
      const px = (mouseRef.current.x - 0.5) * 18
      const py = (mouseRef.current.y - 0.5) * 10

      ctx.clearRect(0, 0, W, H)

      // Sky gradient — dark navy
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65)
      sky.addColorStop(0, '#060f1c')
      sky.addColorStop(1, '#0d1b2a')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // Stars with parallax
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137.5) % W) + px * 0.3
        const sy = ((i * 89.7) % (H * 0.55)) + py * 0.2
        const twinkle = 0.15 + 0.25 * Math.sin(t * 1.8 + i)
        ctx.globalAlpha = twinkle
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(sx, sy, 1.2, 1.2)
      }
      ctx.globalAlpha = 1

      // Moon / ambient glow
      const moonX = W * 0.82 + px * 0.5
      const moonY = H * 0.12 + py * 0.3
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 60)
      moonGlow.addColorStop(0, 'rgba(245,197,24,0.18)')
      moonGlow.addColorStop(0.4, 'rgba(245,197,24,0.05)')
      moonGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = moonGlow
      ctx.fillRect(moonX - 60, moonY - 60, 120, 120)
      ctx.beginPath()
      ctx.arc(moonX, moonY, 14, 0, Math.PI * 2)
      ctx.fillStyle = '#fef9c3'
      ctx.fill()

      // Ground
      const groundY = H * 0.62
      const ground = ctx.createLinearGradient(0, groundY, 0, H)
      ground.addColorStop(0, '#14532d')
      ground.addColorStop(0.4, '#166534')
      ground.addColorStop(1, '#052e16')
      ctx.fillStyle = ground
      ctx.fillRect(0, groundY, W, H - groundY)

      // Ambient ground glow (yellow)
      const gndGlow = ctx.createRadialGradient(W / 2 + px, groundY, 0, W / 2 + px, groundY, W * 0.45)
      gndGlow.addColorStop(0, 'rgba(245,197,24,0.07)')
      gndGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gndGlow
      ctx.fillRect(0, groundY - H * 0.1, W, H * 0.4)

      // Grow progress
      const growProgress = Math.max(0, Math.min(1, (t - growStart) / growDuration))
      const ease = 1 - Math.pow(1 - growProgress, 3)

      const centerX = W / 2 + px * 0.6
      const houseW = Math.min(160, W * 0.35)
      const houseH = 115 * ease
      const houseX = centerX - houseW / 2
      const houseY = groundY - houseH

      // House body
      if (ease > 0) {
        ctx.save()
        ctx.translate(0, py * 0.4)

        // Foundation
        ctx.fillStyle = '#374151'
        ctx.fillRect(houseX - 6, groundY - 9, houseW + 12, 9)

        // Walls
        ctx.fillStyle = '#132238'
        ctx.fillRect(houseX, houseY, houseW, houseH)

        // Interior warm glow
        if (ease > 0.25) {
          const wa = (ease - 0.25) / 0.75
          const intGlow = ctx.createLinearGradient(houseX, houseY, houseX, houseY + houseH)
          intGlow.addColorStop(0, `rgba(245,197,24,${wa * 0.06})`)
          intGlow.addColorStop(1, `rgba(245,197,24,${wa * 0.14})`)
          ctx.fillStyle = intGlow
          ctx.fillRect(houseX + 2, houseY + 2, houseW - 4, houseH - 2)
        }

        // Windows — glowing warm yellow
        if (ease > 0.45) {
          const wa = Math.min(1, (ease - 0.45) / 0.55)
          const drawWindow = (wx: number, wy: number, ww: number, wh: number) => {
            // Glow behind window
            const wg = ctx.createRadialGradient(wx + ww / 2, wy + wh / 2, 0, wx + ww / 2, wy + wh / 2, ww)
            wg.addColorStop(0, `rgba(245,197,24,${wa * 0.35})`)
            wg.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = wg
            ctx.fillRect(wx - ww * 0.5, wy - wh * 0.5, ww * 2, wh * 2)
            // Window pane
            ctx.fillStyle = `rgba(254,249,195,${wa * 0.88})`
            ctx.fillRect(wx, wy, ww, wh)
            ctx.strokeStyle = `rgba(245,197,24,${wa * 0.7})`
            ctx.lineWidth = 1.5
            ctx.strokeRect(wx, wy, ww, wh)
            // Cross divider
            ctx.strokeStyle = `rgba(120,90,20,${wa * 0.6})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(wx + ww / 2, wy)
            ctx.lineTo(wx + ww / 2, wy + wh)
            ctx.moveTo(wx, wy + wh / 2)
            ctx.lineTo(wx + ww, wy + wh / 2)
            ctx.stroke()
          }
          drawWindow(houseX + 12, houseY + houseH * 0.3, 28, 22)
          drawWindow(houseX + houseW - 40, houseY + houseH * 0.3, 28, 22)
        }

        // Door
        if (ease > 0.38) {
          const da = (ease - 0.38) / 0.62
          ctx.fillStyle = `rgba(100,50,15,${da})`
          ctx.fillRect(centerX - 13, houseY + houseH - 38, 26, 38)
          ctx.strokeStyle = `rgba(245,197,24,${da * 0.5})`
          ctx.lineWidth = 1
          ctx.strokeRect(centerX - 13, houseY + houseH - 38, 26, 38)
          // Knob
          ctx.beginPath()
          ctx.arc(centerX + 8, houseY + houseH - 19, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = YELLOW
          ctx.globalAlpha = da
          ctx.fill()
          ctx.globalAlpha = 1
        }

        // Roof
        ctx.fillStyle = '#1e3a5f'
        ctx.beginPath()
        ctx.moveTo(houseX - 14, houseY)
        ctx.lineTo(centerX, houseY - 60 * ease)
        ctx.lineTo(houseX + houseW + 14, houseY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#2d5f9e'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Chimney
        if (ease > 0.55) {
          const ca = (ease - 0.55) / 0.45
          ctx.fillStyle = '#374151'
          ctx.fillRect(houseX + houseW * 0.68, houseY - 44 * ease, 15, 28 * ease)
          // Smoke
          for (let s = 0; s < 3; s++) {
            const st = (t * 0.45 + s * 0.34) % 1
            const sy2 = houseY - 50 * ease - st * 50
            const sx2 = houseX + houseW * 0.68 + 7 + Math.sin(t * 0.8 + s) * 6
            ctx.beginPath()
            ctx.arc(sx2, sy2, 5 + st * 9, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(160,160,180,${(1 - st) * 0.18 * ca})`
            ctx.fill()
          }
        }

        ctx.restore()
      }

      // Construction hat — floats above house
      if (ease > 0.6) {
        const hatA = Math.min(1, (ease - 0.6) / 0.4)
        const hatY = houseY - 80 * ease - 30 + Math.sin(t * 1.2) * 8 + py * 0.3
        const hatX = centerX + px * 0.3

        ctx.save()
        ctx.globalAlpha = hatA
        // Hat brim
        ctx.fillStyle = YELLOW
        ctx.beginPath()
        ctx.ellipse(hatX, hatY + 18, 32, 8, 0, 0, Math.PI * 2)
        ctx.fill()
        // Hat dome
        ctx.beginPath()
        ctx.moveTo(hatX - 24, hatY + 18)
        ctx.bezierCurveTo(hatX - 24, hatY - 10, hatX + 24, hatY - 10, hatX + 24, hatY + 18)
        ctx.closePath()
        ctx.fillStyle = YELLOW
        ctx.fill()
        // Hat stripe
        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.fillRect(hatX - 24, hatY + 8, 48, 6)
        // Glow under hat
        const hatGlow = ctx.createRadialGradient(hatX, hatY + 18, 0, hatX, hatY + 18, 50)
        hatGlow.addColorStop(0, 'rgba(245,197,24,0.22)')
        hatGlow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = hatGlow
        ctx.fillRect(hatX - 50, hatY - 10, 100, 80)
        ctx.restore()
      }

      // Trees (left and right)
      if (growProgress > 0.28) {
        const tg = Math.min(1, (growProgress - 0.28) / 0.72)
        const tx1 = houseX - 36 + px * 0.5
        const th1 = 78 * tg
        ctx.save()
        ctx.translate(0, py * 0.4)
        ctx.strokeStyle = '#713f12'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(tx1, groundY)
        ctx.lineTo(tx1, groundY - th1)
        ctx.stroke()
        const drawCanopy = (cx: number, cy: number, r: number, col: string) => {
          ctx.beginPath()
          ctx.arc(cx, cy, r * tg, 0, Math.PI * 2)
          ctx.fillStyle = col
          ctx.fill()
        }
        drawCanopy(tx1, groundY - th1, 26, '#15803d')
        drawCanopy(tx1 - 14, groundY - th1 + 12, 19, '#16a34a')
        drawCanopy(tx1 + 12, groundY - th1 - 8, 17, '#22c55e')

        // Particle tree glow
        const tglow = ctx.createRadialGradient(tx1, groundY - th1, 0, tx1, groundY - th1, 35)
        tglow.addColorStop(0, 'rgba(34,197,94,0.12)')
        tglow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = tglow
        ctx.fillRect(tx1 - 35, groundY - th1 - 35, 70, 70)
        ctx.restore()

        if (Math.random() < 0.25) spawnParticle(tx1 + (Math.random() - 0.5) * 20, groundY - th1 * 0.6)
      }

      if (growProgress > 0.38) {
        const tg = Math.min(1, (growProgress - 0.38) / 0.62)
        const tx2 = houseX + houseW + 38 + px * 0.5
        const th2 = 68 * tg
        ctx.save()
        ctx.translate(0, py * 0.4)
        ctx.strokeStyle = '#713f12'
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(tx2, groundY)
        ctx.lineTo(tx2, groundY - th2)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(tx2, groundY - th2, 22 * tg, 0, Math.PI * 2)
        ctx.fillStyle = '#166534'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(tx2 + 12, groundY - th2 + 9, 15 * tg, 0, Math.PI * 2)
        ctx.fillStyle = '#15803d'
        ctx.fill()
        ctx.restore()

        if (Math.random() < 0.18) spawnParticle(tx2 + (Math.random() - 0.5) * 18, groundY - th2 * 0.5)
      }

      // Pathway
      ctx.fillStyle = '#1e3a5f'
      ctx.beginPath()
      ctx.moveTo(centerX - 14, groundY)
      ctx.lineTo(centerX + 14, groundY)
      ctx.lineTo(centerX + 28, H)
      ctx.lineTo(centerX - 28, H)
      ctx.closePath()
      ctx.fill()

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025
        p.angle += p.spin
        p.life -= 0.007
        p.alpha = p.life * 0.85
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ background: NAVY }}
    />
  )
}

export function GardenGrowScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div
      className="relative w-full h-[520px] overflow-hidden rounded-2xl"
      style={{ background: NAVY }}
    >
      <Suspense fallback={<GardenGrowFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>

      {/* Yellow accent label */}
      <div className="absolute bottom-5 left-5 pointer-events-none flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: YELLOW }}
        />
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: YELLOW, opacity: 0.75 }}
        >
          Garden Suite · Toronto
        </span>
      </div>

      {/* Construction hat badge */}
      <div
        className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: YELLOW,
          color: NAVY,
          boxShadow: `0 0 20px rgba(245,197,24,0.5)`,
        }}
      >
        gardensuites4you.ca
      </div>
    </div>
  )
}

export default GardenGrowScene3D
