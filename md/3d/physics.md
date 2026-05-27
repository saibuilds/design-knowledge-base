# 3D Physics — R3F + Rapier

> @react-three/rapier: modern physics, WASM-powered, MIT license
> Replaces cannon.js/cannon-es — faster, more stable, actively maintained

## Install
```bash
npm install @react-three/rapier
```

## Basic Setup
```tsx
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier'

export function PhysicsScene() {
  return (
    <Canvas>
      <Physics gravity={[0, -9.81, 0]}>
        {/* Static floor */}
        <RigidBody type="fixed">
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </RigidBody>

        {/* Falling box */}
        <RigidBody position={[0, 5, 0]}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </RigidBody>

        {/* Falling sphere */}
        <RigidBody position={[1, 8, 0]} restitution={0.8}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.1} />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  )
}
```

## Interactive — Click to Throw
```tsx
import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'

function ThrowableBall() {
  const ref = useRef()
  const { camera } = useThree()

  const throwBall = () => {
    const dir = camera.getWorldDirection(new THREE.Vector3())
    ref.current?.applyImpulse(dir.multiplyScalar(15), true)
  }

  return (
    <RigidBody ref={ref} position={[0, 2, -5]} restitution={0.7} friction={0.5}>
      <mesh onClick={throwBall}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  )
}
```

## Cloth Simulation (soft body)
```tsx
// Not yet in rapier — use custom spring mesh instead:
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ClothMesh({ width = 10, height = 10, segments = 20 }) {
  const meshRef = useRef()
  const points = useRef([])

  // Initialize grid of points
  useEffect(() => {
    for (let y = 0; y <= segments; y++) {
      for (let x = 0; x <= segments; x++) {
        points.current.push({
          position: new THREE.Vector3((x / segments - 0.5) * width, (y / segments - 0.5) * height, 0),
          velocity: new THREE.Vector3(),
          pinned: y === segments, // pin top row
        })
      }
    }
  }, [])

  useFrame((_, delta) => {
    // Simple verlet integration + spring constraints
    // ... (full cloth sim is 100+ lines — use a library)
  })

  return <mesh ref={meshRef}>...</mesh>
}
```

## ragdoll / stacked objects (fun hero section)
```tsx
function StackedBoxes({ count = 20 }) {
  return (
    <Physics>
      {Array.from({ length: count }, (_, i) => (
        <RigidBody key={i} position={[(Math.random() - 0.5) * 0.5, i * 1.2 + 1, 0]}
          restitution={0.2} friction={0.8}>
          <RoundedBox args={[1, 1, 1]} radius={0.05}>
            <meshStandardMaterial color={`hsl(${(i / count) * 40 + 20}, 80%, 60%)`} />
          </RoundedBox>
        </RigidBody>
      ))}
      {/* Floor */}
      <RigidBody type="fixed">
        <Box args={[20, 0.5, 20]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
      </RigidBody>
    </Physics>
  )
}
```

## Mouse-based force field
```tsx
function ForceField() {
  const bodies = useRef([])
  const { pointer, viewport } = useThree()

  useFrame(() => {
    const mouseWorld = new THREE.Vector3(
      pointer.x * viewport.width / 2,
      pointer.y * viewport.height / 2,
      0
    )
    bodies.current.forEach((body) => {
      if (!body) return
      const pos = body.translation()
      const dir = new THREE.Vector3(pos.x, pos.y, pos.z).sub(mouseWorld)
      const dist = dir.length()
      if (dist < 3) {
        dir.normalize().multiplyScalar((3 - dist) * 2)
        body.applyImpulse(dir, true)
      }
    })
  })

  return (
    <Physics>
      {Array.from({ length: 30 }, (_, i) => (
        <RigidBody key={i} ref={(r) => bodies.current[i] = r}
          position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, 0]}
          linearDamping={2} angularDamping={1}>
          <Sphere args={[0.2]}>
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
          </Sphere>
        </RigidBody>
      ))}
    </Physics>
  )
}
```

## cannon-es (legacy, still used)
```bash
npm install cannon-es
```
```ts
import * as CANNON from 'cannon-es'
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) })
const body = new CANNON.Body({ mass: 1, shape: new CANNON.Sphere(0.5) })
world.addBody(body)
// In animation loop:
world.fixedStep()
mesh.position.copy(body.position as any)
mesh.quaternion.copy(body.quaternion as any)
```
