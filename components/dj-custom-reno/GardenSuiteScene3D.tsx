'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/GARDEN-SUITE-GROW-UUID/scene.splinecode'

interface Leaf {
  x: number; y: number; vx: number; vy: number
  size: number; angle: number; spin: number; alpha: number; life: number
  color: string
}

function GardenSuiteFallback() {
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

    const leaves: Leaf[] = []
    const leafColors = ['#166534', '#15803d', '#16a34a', '#22c55e', '#4ade80', '#86efac']

    const spawnLeaf = (x: number, y: number) => {
      leaves.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2 - 0.5,
        size: 3 + Math.random() * 6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.1,
        alpha: 0.7 + Math.random() * 0.3,
        life: 1,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
      })
    }

    let t = 0
    let frame = 0
    const growStart = 0.5
    const growDuration = 2.5

    const animate = () => {
      t += 0.016
      ctx.fillStyle = 'rgba(5,15,5,1)'
      ctx.fillRect(0, 0, W, H)

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6)
      sky.addColorStop(0, '#0a1f0a')
      sky.addColorStop(1, '#0d2b0d')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H * 0.6)

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      for (let i = 0; i < 60; i++) {
        const sx = (i * 137.5) % W
        const sy = (i * 89.3) % (H * 0.45)
        const twinkle = 0.2 + 0.2 * Math.sin(t * 2 + i)
        ctx.globalAlpha = twinkle
        ctx.fillRect(sx, sy, 1, 1)
      }
      ctx.globalAlpha = 1

      // Ground plane
      const ground = ctx.createLinearGradient(0, H * 0.6, 0, H)
      ground.addColorStop(0, '#1a4a1a')
      ground.addColorStop(0.3, '#166534')
      ground.addColorStop(1, '#14532d')
      ctx.fillStyle = ground
      ctx.fillRect(0, H * 0.6, W, H * 0.4)

      // Ambient ground glow
      const glow = ctx.createRadialGradient(W / 2, H * 0.6, 0, W / 2, H * 0.6, W * 0.4)
      glow.addColorStop(0, 'rgba(250,204,21,0.08)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, H * 0.4, W, H * 0.6)

      // House grow animation
      const growProgress = Math.max(0, Math.min(1, (t - growStart) / growDuration))
      const ease = 1 - Math.pow(1 - growProgress, 3)

      const houseW = 140
      const houseH = 110 * ease
      const houseX = W / 2 - houseW / 2
      const houseY = H * 0.6 - houseH
      const groundY = H * 0.6

      if (ease > 0) {
        // Foundation/base
        ctx.fillStyle = '#374151'
        ctx.fillRect(houseX - 5, groundY - 8, houseW + 10, 8)

        // House body
        ctx.fillStyle = '#1c2c1c'
        ctx.fillRect(houseX, houseY, houseW, houseH)

        // House walls with warm interior glow
        if (ease > 0.3) {
          const warmAlpha = (ease - 0.3) / 0.7
          ctx.fillStyle = `rgba(180,130,50,${warmAlpha * 0.15})`
          ctx.fillRect(houseX + 2, houseY + 2, houseW - 4, houseH - 2)
        }

        // Windows — glow warm amber
        if (ease > 0.5) {
          const winAlpha = (ease - 0.5) / 0.5
          // Left window
          ctx.fillStyle = `rgba(254,243,199,${winAlpha * 0.85})`
          ctx.fillRect(houseX + 14, houseY + houseH * 0.35, 28, 22)
          ctx.strokeStyle = `rgba(180,130,50,${winAlpha})`
          ctx.lineWidth = 1.5
          ctx.strokeRect(houseX + 14, houseY + houseH * 0.35, 28, 22)
          // Cross pane
          ctx.strokeStyle = `rgba(120,80,30,${winAlpha * 0.8})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(houseX + 28, houseY + houseH * 0.35)
          ctx.lineTo(houseX + 28, houseY + houseH * 0.35 + 22)
          ctx.moveTo(houseX + 14, houseY + houseH * 0.35 + 11)
          ctx.lineTo(houseX + 42, houseY + houseH * 0.35 + 11)
          ctx.stroke()

          // Right window
          ctx.fillStyle = `rgba(254,243,199,${winAlpha * 0.85})`
          ctx.fillRect(houseX + houseW - 42, houseY + houseH * 0.35, 28, 22)
          ctx.strokeStyle = `rgba(180,130,50,${winAlpha})`
          ctx.lineWidth = 1.5
          ctx.strokeRect(houseX + houseW - 42, houseY + houseH * 0.35, 28, 22)
          ctx.strokeStyle = `rgba(120,80,30,${winAlpha * 0.8})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(houseX + houseW - 28, houseY + houseH * 0.35)
          ctx.lineTo(houseX + houseW - 28, houseY + houseH * 0.35 + 22)
          ctx.moveTo(houseX + houseW - 42, houseY + houseH * 0.35 + 11)
          ctx.lineTo(houseX + houseW - 14, houseY + houseH * 0.35 + 11)
          ctx.stroke()

          // Window glow spill
          const winGlow = ctx.createRadialGradient(houseX + 28, houseY + houseH * 0.46, 0, houseX + 28, houseY + houseH * 0.46, 40)
          winGlow.addColorStop(0, `rgba(254,243,199,${winAlpha * 0.2})`)
          winGlow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = winGlow
          ctx.fillRect(houseX, houseY + houseH * 0.2, 80, 60)
        }

        // Door
        if (ease > 0.4) {
          const doorAlpha = (ease - 0.4) / 0.6
          ctx.fillStyle = `rgba(120,60,20,${doorAlpha})`
          ctx.fillRect(houseX + houseW / 2 - 14, houseY + houseH - 36, 28, 36)
          ctx.strokeStyle = `rgba(180,100,30,${doorAlpha})`
          ctx.lineWidth = 1
          ctx.strokeRect(houseX + houseW / 2 - 14, houseY + houseH - 36, 28, 36)
          // Doorknob
          ctx.beginPath()
          ctx.arc(houseX + houseW / 2 + 8, houseY + houseH - 18, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(251,191,36,${doorAlpha})`
          ctx.fill()
        }

        // Roof
        ctx.fillStyle = '#1f2937'
        ctx.beginPath()
        ctx.moveTo(houseX - 12, houseY)
        ctx.lineTo(W / 2, houseY - 55 * ease)
        ctx.lineTo(houseX + houseW + 12, houseY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#374151'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Chimney
        if (ease > 0.6) {
          ctx.fillStyle = '#374151'
          ctx.fillRect(houseX + houseW * 0.7, houseY - 45 * ease, 16, 30 * ease)
          // Smoke puffs
          for (let i = 0; i < 3; i++) {
            const smokeT = (t * 0.5 + i * 0.33) % 1
            const smokeY = houseY - 50 * ease - smokeT * 40
            const smokeX = houseX + houseW * 0.7 + 8 + Math.sin(t + i) * 5
            ctx.beginPath()
            ctx.arc(smokeX, smokeY, 5 + smokeT * 8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(100,100,100,${(1 - smokeT) * 0.2})`
            ctx.fill()
          }
        }

        // Spawn leaf particles from trees
        if (ease > 0.5 && Math.random() < 0.3) {
          const treeX = houseX - 30 + (Math.random() > 0.5 ? houseW + 60 : 0)
          spawnLeaf(treeX, H * 0.5 - Math.random() * 40)
        }
      }

      // Left tree
      if (growProgress > 0.3) {
        const treeGrow = Math.min(1, (growProgress - 0.3) / 0.7)
        const tx1 = houseX - 30
        const treeH1 = 80 * treeGrow
        ctx.strokeStyle = '#713f12'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(tx1, groundY)
        ctx.lineTo(tx1, groundY - treeH1)
        ctx.stroke()
        ctx.fillStyle = '#15803d'
        ctx.beginPath()
        ctx.arc(tx1, groundY - treeH1, 25 * treeGrow, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#16a34a'
        ctx.beginPath()
        ctx.arc(tx1 - 12, groundY - treeH1 + 10, 18 * treeGrow, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#22c55e'
        ctx.beginPath()
        ctx.arc(tx1 + 10, groundY - treeH1 - 10, 16 * treeGrow, 0, Math.PI * 2)
        ctx.fill()
      }

      // Right tree
      if (growProgress > 0.4) {
        const treeGrow = Math.min(1, (growProgress - 0.4) / 0.6)
        const tx2 = houseX + houseW + 35
        const treeH2 = 70 * treeGrow
        ctx.strokeStyle = '#713f12'
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(tx2, groundY)
        ctx.lineTo(tx2, groundY - treeH2)
        ctx.stroke()
        ctx.fillStyle = '#166534'
        ctx.beginPath()
        ctx.arc(tx2, groundY - treeH2, 22 * treeGrow, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#15803d'
        ctx.beginPath()
        ctx.arc(tx2 + 10, groundY - treeH2 + 8, 16 * treeGrow, 0, Math.PI * 2)
        ctx.fill()
      }

      // Leaf particles
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]
        l.x += l.vx
        l.y += l.vy
        l.vy += 0.03
        l.angle += l.spin
        l.life -= 0.008
        l.alpha = l.life

        if (l.life <= 0) { leaves.splice(i, 1); continue }

        ctx.save()
        ctx.translate(l.x, l.y)
        ctx.rotate(l.angle)
        ctx.globalAlpha = l.alpha
        ctx.fillStyle = l.color
        ctx.beginPath()
        ctx.ellipse(0, 0, l.size, l.size * 0.6, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        ctx.globalAlpha = 1
      }

      // Path/walkway
      ctx.fillStyle = '#374151'
      ctx.beginPath()
      ctx.moveTo(W / 2 - 14, groundY)
      ctx.lineTo(W / 2 + 14, groundY)
      ctx.lineTo(W / 2 + 25, H)
      ctx.lineTo(W / 2 - 25, H)
      ctx.closePath()
      ctx.fill()

      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: '#050f05' }} />
}

export function GardenSuiteScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#050f05' }}>
      <Suspense fallback={<GardenSuiteFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Garden Suite / ADU
        </span>
      </div>
    </div>
  )
}

export default GardenSuiteScene3D
