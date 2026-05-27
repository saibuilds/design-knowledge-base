'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/GS4Y-BASEMENT-SECTION-placeholder/scene.splinecode'

const YELLOW = '#F5C518'
const NAVY = '#0d1b2a'

function BasementCrossSectionFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    let t = 0
    let rafId = 0

    const animate = () => {
      t += 0.016
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = NAVY
      ctx.fillRect(0, 0, W, H)

      // --- Layout constants ---
      const groundY = H * 0.32
      const sectionLeft = W * 0.1
      const sectionRight = W * 0.9
      const sectionWidth = sectionRight - sectionLeft

      // Pulsing yellow accent lines
      const pulse = 0.6 + 0.4 * Math.sin(t * 1.5)

      // =====================
      // ABOVE GRADE
      // =====================

      // Sky above grade
      ctx.fillStyle = '#060f1c'
      ctx.fillRect(0, 0, W, groundY)

      // Stars
      for (let i = 0; i < 40; i++) {
        const sx = (i * 137.5) % W
        const sy = (i * 61.3) % (groundY * 0.85)
        ctx.globalAlpha = 0.15 + 0.15 * Math.sin(t + i * 0.7)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(sx, sy, 1, 1)
      }
      ctx.globalAlpha = 1

      // Small house above grade
      const houseW = sectionWidth * 0.45
      const houseX = W / 2 - houseW / 2
      const houseH = groundY * 0.7
      const houseY = groundY - houseH

      ctx.fillStyle = '#0f2236'
      ctx.fillRect(houseX, houseY, houseW, houseH)
      ctx.strokeStyle = '#1e3a5f'
      ctx.lineWidth = 1.5
      ctx.strokeRect(houseX, houseY, houseW, houseH)

      // Roof
      ctx.fillStyle = '#1e3a5f'
      ctx.beginPath()
      ctx.moveTo(houseX - 10, houseY)
      ctx.lineTo(W / 2, houseY - houseH * 0.6)
      ctx.lineTo(houseX + houseW + 10, houseY)
      ctx.closePath()
      ctx.fill()

      // Upper windows
      const winGlow = 0.3 + 0.1 * Math.sin(t * 0.8)
      ctx.fillStyle = `rgba(245,197,24,${winGlow})`
      ctx.fillRect(houseX + houseW * 0.15, houseY + houseH * 0.25, houseW * 0.2, houseH * 0.3)
      ctx.fillRect(houseX + houseW * 0.62, houseY + houseH * 0.25, houseW * 0.2, houseH * 0.3)

      // Label: above grade
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.font = '10px monospace'
      ctx.fillText('above grade', W / 2 - 30, groundY - 6)

      // =====================
      // SOIL LAYERS
      // =====================

      const layers = [
        { label: 'Topsoil', color: '#3b2109', h: 0.045 },
        { label: 'Compacted Fill / Gravel', color: '#4b5563', h: 0.032 },
        { label: 'Concrete Foundation', color: '#6b7280', h: 0.025 },
        { label: 'Vapour Barrier', color: '#1d4ed8', h: 0.012 },
        { label: 'Rigid Insulation', color: YELLOW, h: 0.018 },
        { label: 'Subfloor', color: '#78350f', h: 0.015 },
        { label: 'Finished Floor', color: '#92400e', h: 0.012 },
      ]

      let layerY = groundY
      const layerData: { y: number; h: number; label: string; color: string }[] = []

      for (const layer of layers) {
        const lh = layer.h * H
        ctx.fillStyle = layer.color === YELLOW
          ? `rgba(245,197,24,${0.4 + 0.15 * Math.sin(t * 2)})`
          : layer.color
        ctx.fillRect(sectionLeft, layerY, sectionWidth, lh)
        // Subtle border
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 0.5
        ctx.strokeRect(sectionLeft, layerY, sectionWidth, lh)
        layerData.push({ y: layerY, h: lh, label: layer.label, color: layer.color })
        layerY += lh
      }

      // Foundation walls (sides going down)
      const fwTop = groundY + layers[0].h * H
      const fwH = layers.slice(1, 6).reduce((s, l) => s + l.h * H, 0)
      ctx.fillStyle = '#374151'
      ctx.fillRect(sectionLeft, fwTop, 12, fwH)
      ctx.fillRect(sectionRight - 12, fwTop, 12, fwH)

      // Yellow accent lines on foundation walls
      ctx.strokeStyle = `rgba(245,197,24,${0.5 * pulse})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(sectionLeft, fwTop)
      ctx.lineTo(sectionLeft, fwTop + fwH)
      ctx.moveTo(sectionRight, fwTop)
      ctx.lineTo(sectionRight, fwTop + fwH)
      ctx.stroke()

      // =====================
      // BASEMENT SUITE INTERIOR
      // =====================

      const suiteTop = layerY
      const suiteH = H - suiteTop - H * 0.04
      const suiteInner = sectionLeft + 12

      // Interior background with warm glow
      ctx.fillStyle = '#08111e'
      ctx.fillRect(suiteInner, suiteTop, sectionWidth - 24, suiteH)

      // Warm ceiling light glow
      const ceilGlow1 = ctx.createRadialGradient(W * 0.35, suiteTop + 5, 0, W * 0.35, suiteTop + 5, 70)
      ceilGlow1.addColorStop(0, `rgba(245,197,24,${0.18 + 0.06 * Math.sin(t)})`)
      ceilGlow1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ceilGlow1
      ctx.fillRect(W * 0.35 - 70, suiteTop, 140, 90)

      const ceilGlow2 = ctx.createRadialGradient(W * 0.65, suiteTop + 5, 0, W * 0.65, suiteTop + 5, 70)
      ceilGlow2.addColorStop(0, `rgba(245,197,24,${0.18 + 0.06 * Math.sin(t + 1)})`)
      ceilGlow2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ceilGlow2
      ctx.fillRect(W * 0.65 - 70, suiteTop, 140, 90)

      // Light fixtures
      ctx.fillStyle = `rgba(254,249,195,${0.85 + 0.15 * Math.sin(t)})`
      ctx.beginPath()
      ctx.arc(W * 0.35, suiteTop + 4, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(W * 0.65, suiteTop + 4, 5, 0, Math.PI * 2)
      ctx.fill()

      // Room divider
      const divX = W / 2
      ctx.fillStyle = '#1e3a5f'
      ctx.fillRect(divX - 2, suiteTop, 4, suiteH)

      // Left room — Living area
      // Sofa
      ctx.fillStyle = '#1e3a5f'
      ctx.beginPath()
      ctx.roundRect(suiteInner + 10, suiteTop + suiteH * 0.45, 80, 35, 4)
      ctx.fill()
      ctx.fillStyle = '#2d5f9e'
      ctx.beginPath()
      ctx.roundRect(suiteInner + 10, suiteTop + suiteH * 0.45, 80, 14, 3)
      ctx.fill()

      // TV glow
      const tvGlow = 0.5 + 0.15 * Math.sin(t * 2.2)
      ctx.fillStyle = `rgba(59,130,246,${tvGlow})`
      ctx.fillRect(suiteInner + 22, suiteTop + suiteH * 0.12, 55, 38)
      ctx.fillStyle = `rgba(147,197,253,${tvGlow * 0.5})`
      ctx.fillRect(suiteInner + 25, suiteTop + suiteH * 0.14, 49, 32)

      // Right room — Bedroom
      // Bed
      ctx.fillStyle = '#1e3a5f'
      ctx.beginPath()
      ctx.roundRect(divX + 20, suiteTop + suiteH * 0.35, 70, 50, 4)
      ctx.fill()
      ctx.fillStyle = '#2d5f9e'
      ctx.beginPath()
      ctx.roundRect(divX + 20, suiteTop + suiteH * 0.35, 70, 16, 3)
      ctx.fill()
      // Pillows
      ctx.fillStyle = '#374151'
      ctx.beginPath()
      ctx.roundRect(divX + 25, suiteTop + suiteH * 0.37, 22, 12, 3)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(divX + 55, suiteTop + suiteH * 0.37, 22, 12, 3)
      ctx.fill()

      // Window wells (below grade windows)
      const wwTop = layerData[1]?.y ?? 0
      const wwH = fwH - 4
      const wwW = 50

      const drawWindowWell = (wx: number) => {
        ctx.fillStyle = '#0f1e30'
        ctx.fillRect(wx, wwTop, wwW, wwH)
        ctx.strokeStyle = '#1e3a5f'
        ctx.lineWidth = 1
        ctx.strokeRect(wx, wwTop, wwW, wwH)
        const wwa = 0.25 + 0.08 * Math.sin(t * 0.7)
        ctx.fillStyle = `rgba(245,197,24,${wwa})`
        ctx.fillRect(wx + 3, wwTop + 3, wwW - 6, wwH - 6)
      }
      drawWindowWell(sectionLeft + 18)
      drawWindowWell(sectionRight - 18 - wwW)

      // Suite label
      ctx.fillStyle = YELLOW
      ctx.globalAlpha = 0.8 + 0.2 * Math.sin(t * 0.9)
      ctx.font = 'bold 11px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('Legal Basement Suite', W / 2, suiteTop + suiteH * 0.92)
      ctx.globalAlpha = 1

      // Layer labels on the right
      for (const ld of layerData) {
        ctx.fillStyle = ld.color === YELLOW ? YELLOW : 'rgba(255,255,255,0.4)'
        ctx.globalAlpha = ld.color === YELLOW ? 0.85 + 0.15 * pulse : 0.7
        ctx.font = '8px monospace'
        ctx.textAlign = 'left'
        ctx.fillText(ld.label, sectionRight + 8, ld.y + ld.h * 0.65 + 3)
      }
      ctx.globalAlpha = 1

      // Yellow accent: floor layer indicator line
      ctx.strokeStyle = `rgba(245,197,24,${0.4 * pulse})`
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(sectionLeft - 20, layerY)
      ctx.lineTo(sectionRight + 80, layerY)
      ctx.stroke()
      ctx.setLineDash([])

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: NAVY }}
    />
  )
}

export function BasementCrossSectionScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div
      className="relative w-full h-[520px] overflow-hidden rounded-2xl"
      style={{ background: NAVY }}
    >
      <Suspense fallback={<BasementCrossSectionFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>

      <div className="absolute bottom-5 left-5 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: YELLOW }} />
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: YELLOW, opacity: 0.75 }}>
          Cross Section · Legal Suite
        </span>
      </div>
    </div>
  )
}

export default BasementCrossSectionScene3D
