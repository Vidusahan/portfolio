import { PALETTE } from '@/lib/constants';

export interface FlowParticle {
  x: number;
  y: number;
  z: number; // depth: 0 (far) -> 1 (near)
  size: number;
  speed: number;
  hue: string;
  angleOffset: number;
}

/**
 * Cheap pseudo-noise flow field built from layered sine/cosine waves.
 * Avoids pulling in a full simplex-noise dependency for a single effect.
 */
export function flowAngle(x: number, y: number, t: number): number {
  const n =
    Math.sin(x * 0.0022 + t * 0.35) +
    Math.cos(y * 0.0021 - t * 0.28) +
    Math.sin((x + y) * 0.0013 + t * 0.18) +
    Math.cos((x - y) * 0.0017 - t * 0.12);
  return n * Math.PI * 0.6;
}

export function makeParticle(width: number, height: number): FlowParticle {
  const z = Math.random();
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z,
    size: 0.6 + z * 1.8,
    speed: 0.3 + z * 0.9,
    hue: PALETTE[(Math.random() * PALETTE.length) | 0] as string,
    angleOffset: Math.random() * 1000,
  };
}

export function makeParticles(count: number, width: number, height: number): FlowParticle[] {
  return Array.from({ length: count }, () => makeParticle(width, height));
}

export function particleCountFor(viewportWidth: number, reduceMotion: boolean): number {
  if (reduceMotion) return 90;
  return viewportWidth < 720 ? 260 : 620;
}
