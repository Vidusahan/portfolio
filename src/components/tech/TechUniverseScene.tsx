'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TECH_RINGS } from '@/lib/techUniverse';
import type { TechItem } from '@/lib/techUniverse';
import { TechCore } from '@/components/tech/TechCore';
import { TechOrbitRing } from '@/components/tech/TechOrbitRing';

interface UniverseProps {
  reduceMotion: boolean;
  activeName: string | null;
  onHover: (item: TechItem | null) => void;
  onSelect: (item: TechItem) => void;
}

function Universe({ reduceMotion, activeName, onHover, onSelect }: UniverseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current || reduceMotion) return;
    // Ease the whole scene's tilt toward the pointer position for a subtle
    // "looking around" interaction, instead of a full orbit-controls rig.
    const targetX = pointer.y * 0.18;
    const targetY = pointer.x * 0.28;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <TechCore reduceMotion={reduceMotion} />
      {TECH_RINGS.map((ring) => (
        <TechOrbitRing
          key={ring.id}
          ring={ring}
          reduceMotion={reduceMotion}
          activeName={activeName}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

interface TechUniverseSceneProps {
  reduceMotion: boolean;
  activeName: string | null;
  onHover: (item: TechItem | null) => void;
  onSelect: (item: TechItem) => void;
}

export function TechUniverseScene({ reduceMotion, activeName, onHover, onSelect }: TechUniverseSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 2.4, 7.2], fov: 45 }}
      onPointerMissed={() => onHover(null)}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 5, 5]} intensity={0.4} color="#9b6bff" />
      <Universe
        reduceMotion={reduceMotion}
        activeName={activeName}
        onHover={onHover}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
