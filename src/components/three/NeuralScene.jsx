import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars, Text } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function NeuralCore() {
  const groupRef = useRef()
  const nodes = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const radius = 1.2 + Math.random() * 0.9
      const angle = (index / 28) * Math.PI * 2
      const height = (Math.random() - 0.5) * 1.6
      return [Math.cos(angle) * radius, height, Math.sin(angle) * radius]
    })
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.15, 3]} />
        <meshStandardMaterial color="#7dd3fc" wireframe emissive="#38bdf8" emissiveIntensity={0.25} />
      </mesh>

      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#e0f2fe" emissive="#7dd3fc" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function EnergyBeam() {
  const beamRef = useRef()

  useFrame(({ clock }) => {
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.35 + Math.sin(clock.elapsedTime * 3) * 0.18
      beamRef.current.rotation.z = clock.elapsedTime * 0.35
    }
  })

  return (
    <mesh ref={beamRef} position={[-2.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.025, 0.12, 3.2, 32, 1, true]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} side={THREE.DoubleSide} />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 3]} intensity={3.2} color="#7dd3fc" />
      <pointLight position={[-3, -2, 1]} intensity={1.6} color="#a855f7" />
      <Stars radius={60} depth={35} count={900} factor={3} saturation={0} fade speed={0.7} />

      <Float speed={1.25} rotationIntensity={0.35} floatIntensity={0.6}>
        <NeuralCore />
      </Float>

      <EnergyBeam />

      <Text position={[0, -2.25, 0]} fontSize={0.18} color="#e0f2fe" anchorX="center" anchorY="middle">
        NEURAL PORTFOLIO
      </Text>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
    </>
  )
}

export function NeuralScene() {
  return (
    <div className="neural-scene">
      <Canvas camera={{ position: [0, 0.1, 5], fov: 45 }}>
        <SceneContent />
      </Canvas>
    </div>
  )
}
