'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TechItem, TechRing } from '@/lib/techUniverse';
import { CATEGORY_COLOR } from '@/lib/techUniverse';
import { TechNode } from '@/components/tech/TechNode';

interface TechOrbitRingProps {
  ring: TechRing;
  reduceMotion: boolean;
  activeName: string | null;
  onHover: (item: TechItem | null) => void;
  onSelect: (item: TechItem) => void;
}

export function TechOrbitRing({ ring, reduceMotion, activeName, onHover, onSelect }: TechOrbitRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringColor = CATEGORY_COLOR[ring.items[0]?.category ?? 'ai'];

  const angles = useMemo(
    () => ring.items.map((_, i) => (i / ring.items.length) * Math.PI * 2),
    [ring.items],
  );

  useFrame((_, delta) => {
    if (!groupRef.current || reduceMotion) return;
    const rotationSpeed = (Math.PI * 2) / ring.periodSeconds;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group rotation={[THREE.MathUtils.degToRad(ring.tiltDeg), 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ring.radius - 0.006, ring.radius + 0.006, 96]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>
      <group ref={groupRef}>
        {ring.items.map((item, i) => (
          <TechNode
            key={item.name}
            item={item}
            angle={angles[i] ?? 0}
            radius={ring.radius}
            isActive={activeName === item.name}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}
