import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles, Stars, Text, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { experienceConfig } from '../../data/experienceConfig'

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

function getModelMetrics(object, targetSize) {
  object.updateWorldMatrix(true, true)

  const box = new THREE.Box3().setFromObject(object)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  const maxAxis = Math.max(size.x, size.y, size.z) || 1

  return {
    center,
    scale: targetSize / maxAxis,
  }
}

function StaticNormalizedModel({ path, targetSize = 2.8, position = [0, 0, 0], rotation = [0, 0, 0], tintColor = null }) {
  const { scene } = useGLTF(path)

  const model = useMemo(() => {
    const cloned = scene.clone(true)

    if (tintColor) {
      cloned.traverse((child) => {
        if (!child.isMesh || !child.material) return

        const materials = Array.isArray(child.material) ? child.material : [child.material]
        const nextMaterials = materials.map((material) => {
          const next = material.clone()
          if (next.color) next.color.set(tintColor)
          if (next.emissive) {
            next.emissive.set(tintColor)
            next.emissiveIntensity = experienceConfig.brainEmissiveIntensity ?? 0.32
          }
          next.transparent = true
          next.opacity = next.opacity ?? 1
          next.needsUpdate = true
          return next
        })

        child.material = Array.isArray(child.material) ? nextMaterials : nextMaterials[0]
      })
    }

    return cloned
  }, [scene, tintColor])

  const metrics = useMemo(() => getModelMetrics(model, targetSize), [model, targetSize])

  return (
    <group position={position} rotation={rotation} scale={metrics.scale}>
      <primitive object={model} position={[-metrics.center.x, -metrics.center.y, -metrics.center.z]} />
    </group>
  )
}

function AnimatedNormalizedModel({ path, targetSize = 2.8, position = [0, 0, 0], rotation = [0, 0, 0], animationName, faceTintColor = null }) {
  const { scene, animations } = useGLTF(path)
  const mixerRef = useRef(null)

  const model = useMemo(() => {
    const cloned = scene.clone(true)

    if (faceTintColor) {
      cloned.traverse((child) => {
        if (!child.isMesh || !child.material) return

        const materials = Array.isArray(child.material) ? child.material : [child.material]
        const nextMaterials = materials.map((material) => {
          const next = material.clone()
          const name = `${next.name || ''} ${child.name || ''}`.toLowerCase()

          if (name.includes('face') || name.includes('screen') || name.includes('eye') || name.includes('mouth') || name.includes('material.001')) {
            if (next.color) next.color.set(faceTintColor)
            if (next.emissive) {
              next.emissive.set(faceTintColor)
              next.emissiveIntensity = 1.85
            }
          }

          next.needsUpdate = true
          return next
        })

        child.material = Array.isArray(child.material) ? nextMaterials : nextMaterials[0]
      })
    }

    return cloned
  }, [scene, faceTintColor])
  const metrics = useMemo(() => getModelMetrics(model, targetSize), [model, targetSize])

  useEffect(() => {
    if (!animations?.length) return undefined

    const mixer = new THREE.AnimationMixer(model)
    mixerRef.current = mixer

    const clip = animations.find((item) => item.name === animationName) ?? animations[0]
    const action = mixer.clipAction(clip)
    action.reset().setLoop(THREE.LoopRepeat).play()

    return () => {
      action.stop()
      mixer.stopAllAction()
      mixer.uncacheRoot(model)
      mixerRef.current = null
    }
  }, [animations, animationName, model])

  useFrame((_, delta) => {
    mixerRef.current?.update(delta)
  })

  return (
    <group position={position} rotation={rotation} scale={metrics.scale}>
      <primitive object={model} position={[-metrics.center.x, -metrics.center.y, -metrics.center.z]} />
    </group>
  )
}

function RobotModel() {
  const rotationGroup = useRef(null)
  const basePosition = useMemo(() => new THREE.Vector3(...experienceConfig.avatarPosition), [])

  useFrame(({ clock }) => {
    if (!rotationGroup.current) return

    const baseRotation = experienceConfig.avatarRotationY ?? 0
    const speed = experienceConfig.avatarAutoRotateSpeed ?? 0.12
    rotationGroup.current.rotation.y = baseRotation + clock.elapsedTime * speed

    const t = Math.min(clock.elapsedTime / 1.25, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    rotationGroup.current.position.set(
      basePosition.x,
      basePosition.y + (1 - eased) * 1.25,
      basePosition.z,
    )
  })

  return (
    <group ref={rotationGroup} position={experienceConfig.avatarPosition}>
      <AnimatedNormalizedModel
        path={experienceConfig.avatarModelPath}
        targetSize={experienceConfig.avatarTargetSize}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        animationName={experienceConfig.avatarAnimationName}
        faceTintColor={experienceConfig.robotFaceTintColor}
      />
    </group>
  )
}

function IntroBackdrop({ entering }) {
  return (
    <group position={[0, 0, -1.8]}>
      <Sparkles count={entering ? 58 : 42} scale={[6.4, 4.8, 3]} size={entering ? 2.2 : 1.7} speed={0.14} color="#f8fafc" opacity={0.24} />
      <pointLight position={[0, 1.4, 1.8]} intensity={0.72} color="#ffffff" />
    </group>
  )
}

function BrainFallback() {
  return null
}

const hotspotPositions = {
  sobre: [-1.34, 0.55, 0.14],
  metodo: [-1.46, -0.02, 0.12],
  projetos: [1.34, 0.55, 0.14],
  skills: [1.46, -0.02, 0.12],
  ia: [-1.16, -0.65, 0.1],
  contato: [1.16, -0.65, 0.1],
}

const hotspotAnchors = {
  sobre: [-0.61, 0.34, 0.07],
  metodo: [-0.66, -0.03, 0.06],
  projetos: [0.61, 0.34, 0.07],
  skills: [0.66, -0.03, 0.06],
  ia: [-0.49, -0.43, 0.05],
  contato: [0.49, -0.43, 0.05],
}

function ConnectorLine({ from, to, active, hovered }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [from, to])

  return (
    <line geometry={geometry} renderOrder={1}>
      <lineBasicMaterial
        color={active || hovered ? '#e0faff' : '#38bdf8'}
        transparent
        opacity={active ? 0.72 : hovered ? 0.52 : 0.22}
        depthWrite={false}
      />
    </line>
  )
}

function BrainHotspotLabel({ section, active, hovered, side, rigRef, onSelect, onHover }) {
  const labelRef = useRef(null)
  const { camera } = useThree()
  const isLeft = side === 'left'
  const labelX = isLeft ? -0.034 : 0.034
  const anchorX = isLeft ? 'right' : 'left'
  const baseColor = '#aeeeff'
  const activeColor = active ? '#ffffff' : hovered ? '#e0faff' : baseColor
  const pointColor = active ? '#ffffff' : hovered ? '#7dd3fc' : '#38bdf8'
  const underlineOpacity = active ? 0.8 : hovered ? 0.52 : 0.2
  const tempParentQuaternion = useMemo(() => new THREE.Quaternion(), [])
  const tempLocalQuaternion = useMemo(() => new THREE.Quaternion(), [])

  useFrame(() => {
    if (!labelRef.current) return

    if (rigRef?.current) {
      rigRef.current.getWorldQuaternion(tempParentQuaternion).invert()
      tempLocalQuaternion.copy(tempParentQuaternion).multiply(camera.quaternion)
      labelRef.current.quaternion.copy(tempLocalQuaternion)
      return
    }

    labelRef.current.quaternion.copy(camera.quaternion)
  })

  return (
    <group ref={labelRef} scale={active ? 1.04 : hovered ? 1.02 : 1}>
      <mesh
        position={[0, 0, 0.018]}
        renderOrder={20}
        onPointerEnter={(event) => {
          event.stopPropagation()
          onHover(section.id)
        }}
        onPointerLeave={(event) => {
          event.stopPropagation()
          onHover(null)
        }}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(section.id)
        }}
      >
        <planeGeometry args={[0.28, 0.095]} />
        <meshBasicMaterial transparent opacity={0.001} depthWrite={false} depthTest={false} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[isLeft ? 0.1 : -0.1, 0, 0.02]} renderOrder={12}>
        <sphereGeometry args={[active || hovered ? 0.024 : 0.018, 18, 18]} />
        <meshBasicMaterial color={pointColor} transparent opacity={active ? 1 : 0.82} depthWrite={false} depthTest={false} />
      </mesh>

      <Text
        position={[labelX, 0, 0.024]}
        fontSize={0.054}
        letterSpacing={0.022}
        anchorX={anchorX}
        anchorY="middle"
        color={activeColor}
        material-depthTest={false}
        material-depthWrite={false}
        material-side={THREE.DoubleSide}
        renderOrder={13}
      >
        {section.label.toUpperCase()}
      </Text>

      <mesh position={[isLeft ? -0.07 : 0.07, -0.052, 0.02]} renderOrder={12}>
        <planeGeometry args={[active || hovered ? 0.2 : 0.15, 0.004]} />
        <meshBasicMaterial color={pointColor} transparent opacity={underlineOpacity} depthWrite={false} depthTest={false} side={THREE.DoubleSide} />
      </mesh>

      {(active || hovered) && (
        <mesh position={[isLeft ? 0.1 : -0.1, 0, 0.018]} renderOrder={12}>
          <ringGeometry args={[0.033, 0.047, 28]} />
          <meshBasicMaterial color={pointColor} transparent opacity={active ? 0.62 : 0.36} depthWrite={false} depthTest={false} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function BrainHotspots({ sections = [], activeSection, onSelectSection, rigRef }) {
  const [hoveredSection, setHoveredSection] = useState(null)

  return (
    <group>
      {sections.map((section) => {
        const position = hotspotPositions[section.id] ?? [0, 0, 0]
        const anchor = hotspotAnchors[section.id] ?? [0, 0, 0]
        const side = position[0] < 0 ? 'left' : 'right'
        const nodeOffset = side === 'left' ? [0.1, 0, 0] : [-0.1, 0, 0]
        const endPoint = [position[0] + nodeOffset[0], position[1], position[2]]
        const active = activeSection === section.id
        const hovered = hoveredSection === section.id

        return (
          <group key={section.id}>
            <ConnectorLine from={anchor} to={endPoint} active={active} hovered={hovered} />
            <mesh position={anchor} renderOrder={2}>
              <sphereGeometry args={[active || hovered ? 0.016 : 0.011, 16, 16]} />
              <meshBasicMaterial color={active || hovered ? '#e0faff' : '#38bdf8'} transparent opacity={active ? 0.76 : 0.42} depthWrite={false} />
            </mesh>
            <group position={position}>
              <BrainHotspotLabel
                section={section}
                active={active}
                hovered={hovered}
                side={side}
                rigRef={rigRef}
                onHover={setHoveredSection}
                onSelect={onSelectSection}
              />
            </group>
          </group>
        )
      })}
    </group>
  )
}

function BrainRig({ sections, activeSection, onSelectSection }) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current || !experienceConfig.brainWobbleEnabled) return

    const speed = experienceConfig.brainWobbleSpeed ?? 0.42
    const angle = experienceConfig.brainWobbleAngle ?? 0.26
    group.current.rotation.y = Math.sin(clock.elapsedTime * speed) * angle
    group.current.rotation.x = Math.sin(clock.elapsedTime * speed * 0.62) * 0.035
  })

  return (
    <group ref={group} position={[0, 0.02, 0]}>
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          {experienceConfig.useBrainModel ? (
            <StaticNormalizedModel
              path={experienceConfig.brainModelPath}
              targetSize={experienceConfig.brainTargetSize}
              position={[0, 0, 0]}
              rotation={[0.02, 0, 0]}
              tintColor={experienceConfig.brainTintColor}
            />
          ) : (
            <BrainFallback />
          )}
        </Suspense>
      </ModelErrorBoundary>
      <BrainHotspots sections={sections} activeSection={activeSection} onSelectSection={onSelectSection} rigRef={group} />
    </group>
  )
}

function SceneLights({ mode, entering }) {
  const brain = mode === 'brain'

  return (
    <>
      <ambientLight intensity={brain ? 0.72 : 0.95} />
      <directionalLight position={[0, 5, 5]} intensity={brain ? 0.9 : 1.12} color="#ffffff" />
      <pointLight position={[4, 2, 4]} intensity={brain ? 2.15 : entering ? 2.25 : 2.1} color={brain ? '#38bdf8' : '#ffffff'} />
      <pointLight position={[-4, -1, 3]} intensity={brain ? 1.6 : 1.55} color={brain ? '#7dd3fc' : '#9ca3af'} />
      <pointLight position={[0, 0, 3]} intensity={brain ? 2.35 : 2.7} color={brain ? '#e0faff' : '#f8fafc'} />
      {!brain && <spotLight position={[0, 4, 5]} intensity={2.1} angle={0.38} penumbra={0.82} color="#ffffff" />}
    </>
  )
}

function CameraRig({ mode, entering, controlsRef }) {
  const { camera } = useThree()
  const isBrain = mode === 'brain'

  useFrame((_, delta) => {
    const basePosition = isBrain
      ? experienceConfig.brainCameraPosition
      : entering
        ? experienceConfig.avatarHeadZoomCameraPosition
        : experienceConfig.avatarCameraPosition

    const baseTarget = isBrain
      ? experienceConfig.brainCameraTarget
      : entering
        ? experienceConfig.avatarHeadTarget
        : experienceConfig.avatarOrbitTarget

    const targetPosition = new THREE.Vector3(...basePosition)
    const targetLookAt = new THREE.Vector3(...baseTarget)
    const lerpSpeed = entering ? 0.82 : 1.22

    camera.position.lerp(targetPosition, Math.min(delta * lerpSpeed, 1))
    camera.fov = THREE.MathUtils.lerp(camera.fov, isBrain ? 35 : entering ? 24 : 30, Math.min(delta * 1.05, 1))
    camera.updateProjectionMatrix()

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, Math.min(delta * lerpSpeed, 1))
      controlsRef.current.update()
    }
  })

  return null
}

export function NeuralScene({ mode = 'avatar', entering = false, sections = [], activeSection = null, onSelectSection }) {
  const isBrain = mode === 'brain'
  const controlsRef = useRef(null)
  const camera = isBrain
    ? { position: experienceConfig.brainCameraPosition, fov: 35 }
    : { position: experienceConfig.avatarCameraPosition, fov: 30 }

  return (
    <Canvas camera={camera} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} dpr={[1, 1.8]}>
      <CameraRig mode={mode} entering={entering} controlsRef={controlsRef} />
      <SceneLights mode={mode} entering={entering} />
      <Stars radius={80} depth={38} count={isBrain ? 650 : 520} factor={isBrain ? 2.5 : 2} saturation={0} fade speed={0.24} />

      {isBrain ? (
        <BrainRig sections={sections} activeSection={activeSection} onSelectSection={onSelectSection} />
      ) : (
        <>
          <IntroBackdrop entering={entering} />
          <ModelErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              {experienceConfig.useAvatarModel ? <RobotModel /> : null}
            </Suspense>
          </ModelErrorBoundary>
        </>
      )}

      <OrbitControls
        ref={controlsRef}
        enabled={!entering}
        enablePan={false}
        enableZoom={isBrain}
        minDistance={isBrain ? 3.55 : 4.2}
        maxDistance={isBrain ? 6.2 : 6.2}
        rotateSpeed={isBrain ? 0.55 : 0.35}
        zoomSpeed={0.45}
        minPolarAngle={isBrain ? Math.PI / 2.45 : Math.PI / 2.7}
        maxPolarAngle={isBrain ? Math.PI / 1.58 : Math.PI / 1.7}
        target={isBrain ? experienceConfig.brainCameraTarget : experienceConfig.avatarOrbitTarget}
      />
    </Canvas>
  )
}

useGLTF.preload('/models/avatar.glb')
useGLTF.preload('/models/brain.glb')
