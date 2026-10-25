import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero3D — ambient 3D background for the hero section.
 * A slowly rotating icosahedron wireframe core surrounded by a
 * particle field, rendered with react-three-fiber. Purely decorative
 * and pointer-events-none so it never blocks interaction with the hero.
 */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a78bfa"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function IcosahedronCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = t * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.22;
      innerRef.current.rotation.z = t * 0.1;
      const s = 1 + Math.sin(t * 0.8) * 0.04;
      innerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <IcosahedronCore />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
