# Free 3D Assets — Models, HDRI, Textures

## Free GLTF / GLB Models

### Poly Haven (CC0 — fully free, commercial use)
- Site: https://polyhaven.com/models
- Format: GLB, GLTF, FBX
- Top picks for renovation/interior: furniture, kitchen items, plants, architectural elements
- Load: `useGLTF('https://...')` or download and put in /public/models/

### Sketchfab Free Downloads
- Site: https://sketchfab.com/features/free-3d-models
- Filter: downloadable + CC license
- Search: "kitchen", "house", "interior", "abstract"

### Google Poly (archived)
- Moved to: https://poly.pizza (community mirror)
- Low-poly style models, great for stylized sites

### pmndrs market (R3F community)
- Site: https://market.pmnd.rs
- Curated for React Three Fiber
- Many abstract/geometric models perfect for hero sections

### Free3D.com
- https://free3d.com/3d-models/
- Mix of free and paid — filter by free

### TurboSquid Free
- https://www.turbosquid.com/Search/3D-Models/free
- Professional quality, CC0 available

## Free HDRI (Lighting)

### Poly Haven (best source, all CC0)
- Site: https://polyhaven.com/hdris
- Categories: outdoor, indoor, studio, nature
- For product/interior: "studio small", "photo studio", "empty warehouse"
- For outdoor scenes: "golden hour", "overcast sky", "sunset"
- Resolution: use 1K for realtime, 4K for high quality

```tsx
// In R3F
<Environment files="/hdri/studio_small_08_1k.hdr" />
// Or direct URL (slower but no download):
<Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr" />
```

## Free Textures

### Poly Haven Textures (CC0)
- https://polyhaven.com/textures
- PBR ready: diffuse, normal, roughness, metallic maps
- Great for: wood, concrete, marble, metal, fabric

### ambientCG (CC0)
- https://ambientcg.com
- PBR textures, tileable
- Good for: floor tiles, walls, countertops (renovation context)

### TextureCan (CC0)
- https://www.texturecan.com

### In R3F with texture maps
```tsx
import { useTexture } from '@react-three/drei'

function MarbleFloor() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    '/textures/marble_diffuse.jpg',
    '/textures/marble_normal.jpg',
    '/textures/marble_roughness.jpg',
  ])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  )
}
```

## Compress Models (critical for web)

### Draco compression (Google, reduces size 90%)
```bash
npm install three  # includes draco loader
# Or use gltf-pipeline:
npm install -g gltf-pipeline
gltf-pipeline -i model.glb -o model-draco.glb --draco.compressionLevel=10
```

```tsx
import { useGLTF } from '@react-three/drei'
// drei auto-handles draco — just load compressed file:
const { scene } = useGLTF('/models/kitchen-draco.glb')
// Preload:
useGLTF.preload('/models/kitchen-draco.glb')
```

### meshopt compression (even better than draco)
```bash
npm install -g gltfpack
gltfpack -i model.glb -o model-opt.glb -cc
```

## Free Fonts for Text3D
Convert TTF/OTF to JSON for Three.js:
- Tool: https://gero3.github.io/facetype.js/
- Good fonts: Inter, Montserrat, Bebas Neue, Space Grotesk
- Put JSON in /public/fonts/

```tsx
<Text3D font="/fonts/inter_bold.json">
  MOTTA
  <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
</Text3D>
```

## Free Spline Scenes (ready to embed)
Search on https://app.spline.design/community:
- "abstract blob"
- "product hero"
- "geometric shapes"
- "particles"
- "orb"
- "glass sphere"
- "liquid metal"

## Asset Optimization Checklist
- [ ] Compress with gltfpack or draco
- [ ] HDRI: use 1K for realtime
- [ ] Textures: max 1024x1024 for mobile
- [ ] Lazy load with Suspense
- [ ] Preload critical assets: `useGLTF.preload()`
- [ ] Use LOD for complex scenes
- [ ] Dispose on unmount: `scene.traverse(obj => { if (obj.geometry) obj.geometry.dispose() })`
