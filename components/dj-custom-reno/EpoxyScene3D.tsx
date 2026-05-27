'use client'

import { Suspense, lazy, useEffect, useRef, useCallback } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/EPOXY-METALLIC-LIQUID-UUID/scene.splinecode'

interface Ripple {
  x: number; y: number; radius: number; maxRadius: number; alpha: number; speed: number
}

function EpoxyFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const ripplesRef = useRef<Ripple[]>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    mouseRef.current = { x: nx, y: ny }
    // Spawn ripple on move
    if (Math.random() < 0.15) {
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 60 + Math.random() * 80,
        alpha: 0.6,
        speed: 2 + Math.random() * 2,
      })
    }
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    ripplesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 120 + Math.random() * 60,
      alpha: 0.9,
      speed: 3,
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const W = canvas.width
    const H = canvas.height

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    let t = 0
    let frame = 0

    const drawSwirl = (time: number, mx: number, my: number) => {
      // Base floor — near-black with subtle gloss
      ctx.fillStyle = '#080808'
      ctx.fillRect(0, 0, W, H)

      // Metallic swirl layers
      const swirlColors = [
        { r: 212, g: 175, b: 55, a: 0.18 },   // gold
        { r: 192, g: 192, b: 192, a: 0.15 },   // silver
        { r: 255, g: 215, b: 0, a: 0.12 },     // bright gold
        { r: 169, g: 169, b: 169, a: 0.10 },   // grey silver
        { r: 255, g: 255, b: 255, a: 0.06 },   // white highlight
      ]

      // Draw multiple swirl passes
      for (let pass = 0; pass < 5; pass++) {
        const c = swirlColors[pass]
        const freq = 0.008 - pass * 0.001
        const speed = time * (0.15 + pass * 0.05)
        const mxInfluence = (mx - 0.5) * 80
        const myInfluence = (my - 0.5) * 80

        for (let y = 0; y < H; y += 3) {
          ctx.beginPath()
          for (let x = 0; x <= W; x += 4) {
            const distX = x / W - mx
            const distY = y / H - my
            const dist = Math.sqrt(distX * distX + distY * distY)
            const swirl = Math.sin(
              x * freq + y * freq * 0.7 + speed + dist * 3 +
              Math.sin(y * 0.02 + time * 0.3) * 2 +
              mxInfluence * 0.01 + myInfluence * 0.01
            )
            const yOffset = swirl * (8 + pass * 3)
            if (x === 0) ctx.moveTo(x, y + yOffset)
            else ctx.lineTo(x, y + yOffset)
          }
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${c.a})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      // Spreading flow from center-bottom
      const spreadGrad = ctx.createRadialGradient(
        W * mx, H * my, 0,
        W * mx, H * my, W * 0.6
      )
      spreadGrad.addColorStop(0, 'rgba(255,215,0,0.12)')
      spreadGrad.addColorStop(0.3, 'rgba(192,192,192,0.06)')
      spreadGrad.addColorStop(0.7, 'rgba(212,175,55,0.04)')
      spreadGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = spreadGrad
      ctx.fillRect(0, 0, W, H)

      // High-gloss reflection band
      const reflectionAngle = time * 0.3
      const rx = W * 0.5 + Math.cos(reflectionAngle) * W * 0.6
      const ry = H * 0.5 + Math.sin(reflectionAngle * 0.7) * H * 0.4
      const reflGrad = ctx.createLinearGradient(rx - 60, ry - 20, rx + 60, ry + 20)
      reflGrad.addColorStop(0, 'rgba(255,255,255,0)')
      reflGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)')
      reflGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = reflGrad
      ctx.fillRect(0, 0, W, H)

      // Metallic sheen streak
      for (let i = 0; i < 3; i++) {
        const streakX = (W * 0.2 + i * W * 0.3 + Math.sin(time * 0.4 + i) * 30)
        const streakGrad = ctx.createLinearGradient(streakX - 2, 0, streakX + 2, H)
        streakGrad.addColorStop(0, 'rgba(255,255,255,0)')
        streakGrad.addColorStop(0.3, `rgba(255,255,255,${0.03 + i * 0.01})`)
        streakGrad.addColorStop(0.7, `rgba(212,175,55,${0.05 + i * 0.01})`)
        streakGrad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = streakGrad
        ctx.fillRect(streakX - 2, 0, 4, H)
      }
    }

    const drawRipples = () => {
      const ripples = ripplesRef.current
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += r.speed
        r.alpha -= 0.01
        if (r.radius >= r.maxRadius || r.alpha <= 0) {
          ripples.splice(i, 1)
          continue
        }
        const progress = r.radius / r.maxRadius
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,215,0,${r.alpha * (1 - progress)})`
        ctx.lineWidth = 2 * (1 - progress * 0.7)
        ctx.stroke()

        // Inner ripple
        if (r.radius > 15) {
          ctx.beginPath()
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(192,192,192,${r.alpha * 0.5 * (1 - progress)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      t += 0.016
      const { x: mx, y: my } = mouseRef.current
      drawSwirl(t, mx, my)
      drawRipples()
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [handleMouseMove, handleClick])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" style={{ background: '#080808' }} />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <p className="text-xs text-white/20 font-mono tracking-widest">move mouse to interact</p>
      </div>
    </div>
  )
}

export function EpoxyScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#080808' }}>
      <Suspense fallback={<EpoxyFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Epoxy Flooring
        </span>
      </div>
    </div>
  )
}

export default EpoxyScene3D
