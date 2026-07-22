'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Generates a small radial-gradient texture on a canvas, used as a billboard glow sprite. */
function useGlowTexture(color: string) {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.4, color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [color]);
}

interface TechCoreProps {
  reduceMotion: boolean;
}

export function TechCore({ reduceMotion }: TechCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowTexture = useGlowTexture('#4eeaff');

  useFrame((_, delta) => {
    if (!meshRef.current || reduceMotion) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.x += delta * 0.08;
    const t = performance.now() * 0.001;
    const pulse = 1 + Math.sin(t * 1.4) * 0.04;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <sprite scale={[3.2, 3.2, 3.2]}>
        <spriteMaterial map={glowTexture} transparent depthWrite={false} opacity={0.55} />
      </sprite>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#0a2a30"
          emissive="#4eeaff"
          emissiveIntensity={1.1}
          roughness={0.35}
          metalness={0.4}
          wireframe
        />
      </mesh>
      <pointLight color="#4eeaff" intensity={8} distance={6} decay={2} />
    </group>
  );
}
