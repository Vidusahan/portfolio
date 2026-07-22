'use client';

import { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { TechItem } from '@/lib/techUniverse';
import { CATEGORY_COLOR } from '@/lib/techUniverse';

interface TechNodeProps {
  item: TechItem;
  angle: number;
  radius: number;
  isActive: boolean;
  onHover: (item: TechItem | null) => void;
  onSelect: (item: TechItem) => void;
}

export function TechNode({ item, angle, radius, isActive, onHover, onSelect }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = CATEGORY_COLOR[item.category];
  const baseSize = 0.09 + item.level * 0.026;

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    const targetScale = isActive ? 1.6 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  function handlePointerOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    onHover(item);
  }
  function handlePointerOut(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    onHover(null);
  }
  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    onSelect(item);
  }

  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <sphereGeometry args={[baseSize, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 1.4 : 0.7}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
}
