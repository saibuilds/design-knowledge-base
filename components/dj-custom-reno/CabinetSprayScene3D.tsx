'use client'

import { Suspense, lazy, useRef, useEffect, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/CABINET-SPRAY-PARTICLES-UUID/scene.splinecode'

function SprayParticleFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const W = canvas.width
    const H = canvas.height

    // Particles converging to form cabinet door outline
    const cabinetX = W * 0.25
    const cabinetY = H * 0.15
    const cabinetW = W * 0.5
    const cabinetH = H * 0.7

    interface Particle {
      x: number; y: number; tx: number; ty: number
      progress: number; speed: number; size: number
      r: number; g: number; b: number
    }

    const particles: Particle[] = []

    // Generate target points along cabinet door outline
    const targetPoints: [number, number][] = []
    for (let i = 0; i < 120; i++) {
      const t = i / 120
      if (t < 0.25) { targetPoints.push([cabinetX + t * 4 * cabinetW, cabinetY]) }
      else if (t < 0.5) { targetPoints.push([cabinetX + cabinetW, cabinetY + (t - 0.25) * 4 * cabinetH]) }
      else if (t < 0.75) { targetPoints.push([cabinetX + cabinetW - (t - 0.5) * 4 * cabinetW, cabinetY + cabinetH]) }
      else { targetPoints.push([cabinetX, cabinetY + cabinetH - (t - 0.75) * 4 * cabinetH]) }
    }

    targetPoints.forEach(([tx, ty]) => {
      // Start from edges
      const edge = Math.floor(Math.random() * 4)
      let sx = 0, sy = 0
      if (edge === 0) { sx = Math.random() * W; sy = 0 }
      else if (edge === 1) { sx = W; sy = Math.random() * H }
      else if (edge === 2) { sx = Math.random() * W; sy = H }
      else { sx = 0; sy = Math.random() * H }

      particles.push({
        x: sx, y: sy, tx, ty,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 2,
        r: 139 + Math.floor(Math.random() * 80),
        g: 69 + Math.floor(Math.random() * 40),
        b: 19 + Math.floor(Math.random() * 20),
      })
    })

    let frame = 0
    const animate = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.15)'
      ctx.fillRect(0, 0, W, H)

      particles.forEach(p => {
        p.progress = Math.min(1, p.progress + p.speed)
        const ease = 1 - Math.pow(1 - p.progress, 3)
        p.x = p.x + (p.tx - p.x) * p.speed * 3
        p.y = p.y + (p.ty - p.y) * p.speed * 3

        // Color transitions from wood brown → lacquer white as progress increases
        const white = Math.floor(p.progress * 255)
        const r = Math.floor(p.r + (255 - p.r) * p.progress * 0.8)
        const g = Math.floor(p.g + (255 - p.g) * p.progress * 0.8)
        const b = Math.floor(p.b + (255 - p.b) * p.progress * 0.8)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${0.6 + ease * 0.4})`
        ctx.fill()

        // Metallic sheen on converged particles
        if (p.progress > 0.8) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${(p.progress - 0.8) * 3})`
          ctx.fill()
        }

        if (p.progress >= 1) {
          p.progress = Math.random() * 0.2
        }
      })

      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#0a0a0a' }}
    />
  )
}

export function CabinetSprayScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#0a0a0a' }}>
      <Suspense fallback={<SprayParticleFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Cabinet Spray Finishing
        </span>
      </div>
    </div>
  )
}

export default CabinetSprayScene3D
