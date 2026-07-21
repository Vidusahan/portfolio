import { PALETTE } from '@/lib/constants';

export interface TextPoint {
  x: number;
  y: number;
}

export interface LoaderParticle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  hue: string;
  size: number;
  burstX: number;
  burstY: number;
}

/** Renders `text` to an offscreen canvas and returns pixel coordinates where it was drawn. */
export function sampleTextPoints(
  text: string,
  width: number,
  height: number,
  fontFamily = 'sans-serif',
): TextPoint[] {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const ctx = off.getContext('2d');
  if (!ctx) return [];

  const fontSize = Math.min(width, height) * 0.32;
  ctx.fillStyle = '#fff';
  ctx.font = `700 ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const points: TextPoint[] = [];
  const step = Math.max(4, Math.floor(Math.min(width, height) / 140));

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alphaIndex = (y * width + x) * 4 + 3;
      if (data[alphaIndex] > 128) points.push({ x, y });
    }
  }
  return points;
}

export function makeLoaderParticles(
  targets: TextPoint[],
  width: number,
  height: number,
  reduceMotion: boolean,
): LoaderParticle[] {
  const count = reduceMotion
    ? Math.min(160, targets.length)
    : Math.min(700, Math.max(targets.length, 300));

  return Array.from({ length: count }, (_, i) => {
    const target = targets[i % targets.length] ?? { x: width / 2, y: height / 2 };
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(width, height) * 0.7;
    return {
      x: width / 2 + Math.cos(angle) * dist,
      y: height / 2 + Math.sin(angle) * dist,
      tx: target.x + (Math.random() - 0.5) * 2,
      ty: target.y + (Math.random() - 0.5) * 2,
      hue: PALETTE[(Math.random() * PALETTE.length) | 0] as string,
      size: 1 + Math.random() * 1.4,
      burstX: 0,
      burstY: 0,
    };
  });
}
