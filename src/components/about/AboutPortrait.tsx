'use client';

import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PALETTE } from '@/lib/constants';

interface Node {
  x: number;
  y: number;
  r: number;
}
interface Edge {
  from: [number, number];
  to: [number, number];
  faint?: boolean;
}

// Head ring (octagon approximating a circle) + shoulder silhouette + a halo of
// "floating" ambient data nodes — an abstract, geometric stand-in for a portrait,
// deliberately not a literal photo or robot.
const HEAD: Record<string, [number, number]> = {
  top: [180, 74],
  topRight: [233.7, 96.3],
  right: [256, 150],
  bottomRight: [233.7, 203.7],
  bottom: [180, 226],
  bottomLeft: [126.3, 203.7],
  left: [104, 150],
  topLeft: [126.3, 96.3],
};

const BODY: Record<string, [number, number]> = {
  leftShoulder: [70, 335],
  rightShoulder: [290, 335],
  leftBase: [30, 452],
  rightBase: [330, 452],
};

const FLOATING: Node[] = [
  { x: 60, y: 90, r: 3 },
  { x: 300, y: 80, r: 2.4 },
  { x: 330, y: 220, r: 3 },
  { x: 35, y: 240, r: 2.4 },
  { x: 180, y: 34, r: 2.6 },
];

const SILHOUETTE_EDGES: Edge[] = [
  { from: HEAD.top, to: HEAD.topRight },
  { from: HEAD.topRight, to: HEAD.right },
  { from: HEAD.right, to: HEAD.bottomRight },
  { from: HEAD.bottomRight, to: HEAD.bottom },
  { from: HEAD.bottom, to: HEAD.bottomLeft },
  { from: HEAD.bottomLeft, to: HEAD.left },
  { from: HEAD.left, to: HEAD.topLeft },
  { from: HEAD.topLeft, to: HEAD.top },
  { from: HEAD.bottomLeft, to: BODY.leftShoulder },
  { from: HEAD.bottomRight, to: BODY.rightShoulder },
  { from: BODY.leftShoulder, to: BODY.leftBase },
  { from: BODY.rightShoulder, to: BODY.rightBase },
];

const FLOATING_EDGES: Edge[] = [
  { from: [FLOATING[0]!.x, FLOATING[0]!.y], to: HEAD.topLeft, faint: true },
  { from: [FLOATING[1]!.x, FLOATING[1]!.y], to: HEAD.topRight, faint: true },
  { from: [FLOATING[2]!.x, FLOATING[2]!.y], to: HEAD.bottomRight, faint: true },
  { from: [FLOATING[3]!.x, FLOATING[3]!.y], to: HEAD.bottomLeft, faint: true },
  { from: [FLOATING[4]!.x, FLOATING[4]!.y], to: HEAD.top, faint: true },
];

const ALL_NODES: Node[] = [
  ...Object.values(HEAD).map(([x, y]) => ({ x, y, r: 3.4 })),
  ...Object.values(BODY).map(([x, y]) => ({ x, y, r: 3.4 })),
  ...FLOATING,
];

export function AboutPortrait() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduceMotion = useReducedMotion();
  const edges = [...SILHOUETTE_EDGES, ...FLOATING_EDGES];

  return (
    <div ref={ref} className="relative mx-auto aspect-[360/460] w-full max-w-[380px]">
      <svg viewBox="0 0 360 460" className="h-full w-full overflow-visible" aria-hidden="true">
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.from[0]}
            y1={edge.from[1]}
            x2={edge.to[0]}
            y2={edge.to[1]}
            pathLength={1}
            className="transition-[stroke-dashoffset] ease-signature"
            style={{
              stroke: edge.faint ? 'var(--color-purple)' : 'var(--color-cyan)',
              strokeWidth: edge.faint ? 0.6 : 1.2,
              strokeOpacity: edge.faint ? 0.35 : 0.7,
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transitionDuration: '1100ms',
              transitionDelay: `${i * 55}ms`,
            }}
          />
        ))}

        {ALL_NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            className={reduceMotion ? '' : 'animate-[nodeFloat_5s_ease-in-out_infinite]'}
            style={{
              fill: PALETTE[i % PALETTE.length],
              filter: `drop-shadow(0 0 4px ${PALETTE[i % PALETTE.length]})`,
              opacity: inView ? 0.95 : 0,
              transition: 'opacity 600ms var(--ease-signature)',
              transitionDelay: `${i * 45}ms`,
              animationDelay: `${(i % 5) * 0.6}s`,
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
