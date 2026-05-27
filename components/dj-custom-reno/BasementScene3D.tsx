'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/BASEMENT-CROSS-SECTION-UUID/scene.splinecode'

function BasementFallback() {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex items-center justify-center"
      style={{ background: '#0a0a0a' }}
    >
      <svg viewBox="0 0 480 400" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        {/* Above ground sky */}
        <rect x="0" y="0" width="480" height="150" fill="#0d1117" />
        {/* Ground surface line */}
        <rect x="0" y="148" width="480" height="6" fill="#4a7c59" />
        {/* Grass texture */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 24 + 10} y1="148" x2={i * 24 + 14} y2="138" stroke="#5a9469" strokeWidth="2" />
        ))}

        {/* Underground cross-section layers */}
        {/* Topsoil */}
        <rect x="0" y="154" width="480" height="30" fill="#3d2b1f" />
        <text x="490" y="174" fontSize="9" fill="#6b4c35" fontFamily="monospace">topsoil</text>
        {/* Gravel/compacted fill */}
        <rect x="0" y="184" width="480" height="20" fill="#555555" />
        <text x="490" y="197" fontSize="9" fill="#888" fontFamily="monospace">gravel</text>
        {/* Concrete slab */}
        <rect x="0" y="204" width="480" height="16" fill="#6b7280" />
        <text x="490" y="215" fontSize="9" fill="#9ca3af" fontFamily="monospace">concrete</text>
        {/* Vapour barrier */}
        <rect x="0" y="220" width="480" height="4" fill="#1d4ed8" opacity="0.7" />
        {/* Insulation */}
        <rect x="0" y="224" width="480" height="12" fill="#fbbf24" opacity="0.5" />
        <text x="490" y="233" fontSize="9" fill="#fbbf24" fontFamily="monospace">insulation</text>
        {/* Subfloor */}
        <rect x="0" y="236" width="480" height="8" fill="#92400e" opacity="0.8" />
        {/* Finished floor — warm wood */}
        <rect x="0" y="244" width="480" height="10" fill="#a16207" />

        {/* Basement suite interior */}
        <rect x="60" y="254" width="360" height="110" fill="#111827" />

        {/* Window wells */}
        <rect x="70" y="230" width="50" height="24" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <rect x="360" y="230" width="50" height="24" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        {/* Window light */}
        <rect x="73" y="233" width="44" height="18" fill="#fef3c7" opacity="0.3" />
        <rect x="363" y="233" width="44" height="18" fill="#fef3c7" opacity="0.3" />

        {/* Interior walls */}
        <rect x="60" y="254" width="6" height="110" fill="#1f2937" />
        <rect x="414" y="254" width="6" height="110" fill="#1f2937" />
        {/* Interior room divider */}
        <rect x="240" y="254" width="4" height="110" fill="#1f2937" />

        {/* Left room — living */}
        <rect x="70" y="300" width="55" height="40" rx="2" fill="#292524" stroke="#44403c" strokeWidth="1" />
        {/* Sofa */}
        <rect x="75" y="315" width="45" height="20" rx="3" fill="#374151" />
        <rect x="75" y="315" width="45" height="8" rx="2" fill="#4b5563" />
        {/* TV glow */}
        <rect x="150" y="280" width="60" height="40" rx="2" fill="#1e40af" opacity="0.6" />
        <rect x="153" y="283" width="54" height="34" fill="#3b82f6" opacity="0.4" />

        {/* Right room — bedroom */}
        <rect x="270" y="295" width="70" height="50" rx="3" fill="#292524" stroke="#44403c" strokeWidth="1" />
        {/* Bed */}
        <rect x="275" y="300" width="60" height="40" rx="3" fill="#374151" />
        <rect x="275" y="300" width="60" height="15" rx="2" fill="#4b5563" />
        {/* Pillow */}
        <rect x="280" y="303" width="20" height="10" rx="2" fill="#6b7280" />
        <rect x="310" y="303" width="20" height="10" rx="2" fill="#6b7280" />

        {/* Warm lighting in suite */}
        <ellipse cx="170" cy="258" rx="40" ry="8" fill="#fbbf24" opacity="0.12" />
        <ellipse cx="340" cy="258" rx="40" ry="8" fill="#fbbf24" opacity="0.12" />
        {/* Light fixtures */}
        <circle cx="170" cy="258" r="4" fill="#fef3c7" opacity="0.8" />
        <circle cx="340" cy="258" r="4" fill="#fef3c7" opacity="0.8" />

        {/* Ground level house above */}
        <rect x="140" y="60" width="200" height="90" fill="#111827" stroke="#1f2937" strokeWidth="2" />
        {/* Roof */}
        <polygon points="120,60 240,10 360,60" fill="#1f2937" stroke="#374151" strokeWidth="1.5" />
        {/* Front door */}
        <rect x="215" y="105" width="24" height="45" rx="1" fill="#292524" stroke="#374151" strokeWidth="1" />
        {/* Windows above */}
        <rect x="155" y="75" width="35" height="30" rx="1" fill="#1e293b" stroke="#374151" strokeWidth="1" />
        <rect x="290" y="75" width="35" height="30" rx="1" fill="#1e293b" stroke="#374151" strokeWidth="1" />
        {/* Window glow */}
        <rect x="158" y="78" width="29" height="24" fill="#fef3c7" opacity="0.2" />
        <rect x="293" y="78" width="29" height="24" fill="#fef3c7" opacity="0.2" />

        {/* Foundation walls */}
        <rect x="60" y="150" width="6" height="104" fill="#374151" />
        <rect x="414" y="150" width="6" height="104" fill="#374151" />

        {/* Labels */}
        <text x="240" y="40" textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="monospace">above grade</text>
        <text x="240" y="290" textAnchor="middle" fontSize="11" fill="#f59e0b" fontFamily="monospace" opacity="0.8">legal suite / basement finishing</text>

        {/* Depth indicator */}
        <line x1="22" y1="154" x2="22" y2="244" stroke="#374151" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="17" y1="154" x2="27" y2="154" stroke="#374151" strokeWidth="1" />
        <line x1="17" y1="244" x2="27" y2="244" stroke="#374151" strokeWidth="1" />
        <text x="14" y="202" fontSize="9" fill="#6b7280" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 14 202)">~8ft</text>
      </svg>
    </div>
  )
}

export function BasementScene3D({ sceneUrl = SCENE_URL }: { sceneUrl?: string }) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl" style={{ background: '#0a0a0a' }}>
      <Suspense fallback={<BasementFallback />}>
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-xs text-amber-500/60 font-mono tracking-widest uppercase">
          Basement / Legal Suite
        </span>
      </div>
    </div>
  )
}

export default BasementScene3D
