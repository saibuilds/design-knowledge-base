'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/KITCHEN-ISLAND-ROTATE-UUID/scene.splinecode'

function KitchenFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f00 60%, #2d1a00 100%)' }}
    >
      <svg viewBox="0 0 400 300" className="w-full max-w-md opacity-60" xmlns="http://www.w3.org/2000/svg">
        {/* Island counter top */}
        <rect x="80" y="140" width="240" height="12" rx="3" fill="#b45309" />
        {/* Island body */}
        <rect x="100" y="152" width="200" height="80" rx="4" fill="#92400e" />
        {/* Cabinet doors on island */}
        <rect x="110" y="160" width="55" height="64" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
        <rect x="175" y="160" width="55" height="64" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
        <rect x="240" y="160" width="50" height="64" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
        {/* Handles */}
        <rect x="133" y="190" width="10" height="3" rx="1" fill="#f59e0b" />
        <rect x="198" y="190" width="10" height="3" rx="1" fill="#f59e0b" />
        <rect x="261" y="190" width="9" height="3" rx="1" fill="#f59e0b" />
        {/* Overhead lighting */}
        <ellipse cx="200" cy="90" rx="60" ry="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="200" y1="98" x2="200" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
        {/* Glow under lights */}
        <ellipse cx="200" cy="140" rx="80" ry="20" fill="#f59e0b" opacity="0.08" />
        {/* Countertop shine */}
        <rect x="90" y="141" width="80" height="3" rx="1" fill="#fcd34d" opacity="0.3" />
        {/* Floor reflection */}
        <ellipse cx="200" cy="238" rx="100" ry="10" fill="#f59e0b" opacity="0.05" />
        {/* Copper accent lines */}
        <line x1="80" y1="140" x2="320" y2="140" stroke="#cd7f32" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function KitchenScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#0a0a0a' }}>
      <Suspense fallback={<KitchenFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      {/* Brand overlay */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Kitchen Renovation
        </span>
      </div>
    </div>
  )
}

export default KitchenScene3D
