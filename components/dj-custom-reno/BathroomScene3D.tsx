'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/BATHROOM-TILE-ASSEMBLE-UUID/scene.splinecode'

interface TileData {
  x: number; y: number; col: number; row: number
  startX: number; startY: number; startZ: number
  progress: number; delay: number
}

function TileAssemblyFallback() {
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

    const TILE_SIZE = 44
    const GAP = 3
    const STEP = TILE_SIZE + GAP
    const COLS = Math.floor(W / STEP)
    const ROWS = Math.floor(H / STEP)
    const offsetX = (W - COLS * STEP) / 2
    const offsetY = (H - ROWS * STEP) / 2

    const tiles: TileData[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const angle = Math.random() * Math.PI * 2
        const dist = 200 + Math.random() * 300
        tiles.push({
          x: offsetX + c * STEP,
          y: offsetY + r * STEP,
          col: c, row: r,
          startX: Math.cos(angle) * dist,
          startY: Math.sin(angle) * dist,
          startZ: -200 - Math.random() * 400,
          progress: 0,
          delay: (c + r) * 0.03 + Math.random() * 0.1,
        })
      }
    }

    let t = 0
    let frame = 0

    const drawTile = (tx: number, ty: number, alpha: number, scale: number, col: number, row: number) => {
      const s = TILE_SIZE * scale
      const cx = tx + TILE_SIZE / 2
      const cy = ty + TILE_SIZE / 2

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(scale, scale)

      // Tile base — alternating warm tones
      const isAccent = (col + row) % 5 === 0
      if (isAccent) {
        ctx.fillStyle = `rgba(180,140,100,${alpha})`
      } else {
        ctx.fillStyle = `rgba(220,210,200,${alpha})`
      }
      ctx.fillRect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE)

      // Frosted highlight
      const grad = ctx.createLinearGradient(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2)
      grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`)
      grad.addColorStop(1, `rgba(255,255,255,0)`)
      ctx.fillStyle = grad
      ctx.fillRect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE)

      // Grout gap shadow
      ctx.strokeStyle = `rgba(10,10,10,${alpha * 0.6})`
      ctx.lineWidth = 1
      ctx.strokeRect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE)

      ctx.restore()
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(18,12,8,1)'
      ctx.fillRect(0, 0, W, H)

      // Warm background glow
      const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.6)
      glow.addColorStop(0, 'rgba(180,120,60,0.12)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      t += 0.016
      tiles.forEach(tile => {
        const localT = Math.max(0, t - tile.delay)
        tile.progress = Math.min(1, localT * 0.8)
        const ease = 1 - Math.pow(1 - tile.progress, 4)
        const px = tile.x + tile.startX * (1 - ease)
        const py = tile.y + tile.startY * (1 - ease)
        drawTile(px, py, ease, 0.3 + ease * 0.7, tile.col, tile.row)
      })

      // Frosted glass shower panel overlay (right 30%)
      if (t > 1.5) {
        const panelAlpha = Math.min(0.25, (t - 1.5) * 0.15)
        const panelGrad = ctx.createLinearGradient(W * 0.68, 0, W, 0)
        panelGrad.addColorStop(0, `rgba(200,220,230,0)`)
        panelGrad.addColorStop(0.3, `rgba(200,220,230,${panelAlpha})`)
        panelGrad.addColorStop(1, `rgba(200,220,230,${panelAlpha * 0.5})`)
        ctx.fillStyle = panelGrad
        ctx.fillRect(W * 0.68, 0, W * 0.32, H)
      }

      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas ref={canvasRef} className="w-full h-full" style={{ background: '#120c08' }} />
  )
}

export function BathroomScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#120c08' }}>
      <Suspense fallback={<TileAssemblyFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Bathroom Renovation
        </span>
      </div>
    </div>
  )
}

export default BathroomScene3D
