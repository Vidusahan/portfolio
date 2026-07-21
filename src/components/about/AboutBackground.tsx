'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const GRID_SIZE = 46;
const HIGHLIGHT_RADIUS = 150;

const DIM_GRID_IMAGE =
  'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)';

const BRIGHT_GRID_IMAGE =
  'linear-gradient(var(--color-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)';

/**
 * "Digital Particle Grid" background scoped to the About section.
 * Two layers share the same grid pattern: a dim static one, and a bright one
 * revealed only inside a small radius around the cursor via a radial-gradient
 * mask, so the lines "light up" only in the cursor's immediate range.
 */
export function AboutBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const drift = driftRef.current;
    const highlight = highlightRef.current;
    if (!root || !drift || !highlight) return;

    function updateFromEvent(e: PointerEvent) {
      const rect = root!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      highlight!.style.setProperty('--mx', `${x}px`);
      highlight!.style.setProperty('--my', `${y}px`);

      const relX = x / rect.width - 0.5;
      const relY = y / rect.height - 0.5;
      drift!.style.setProperty('--px', `${relX * -14}px`);
      drift!.style.setProperty('--py', `${relY * -14}px`);
    }

    function onEnter(e: PointerEvent) {
      updateFromEvent(e);
      highlight!.style.opacity = '1';
    }
    function onLeave() {
      highlight!.style.opacity = '0';
    }

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', updateFromEvent, { passive: true });
    root.addEventListener('pointerleave', onLeave);

    return () => {
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', updateFromEvent);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      {/* dim base grid, drifts slightly toward the cursor for a sense of depth */}
      <div
        ref={driftRef}
        className="pointer-events-none absolute inset-[-5%] transition-transform duration-300 ease-out"
        style={
          {
            '--px': '0px',
            '--py': '0px',
            transform: 'translate(var(--px), var(--py))',
            backgroundImage: DIM_GRID_IMAGE,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
          } as CSSProperties
        }
      />

      {/* bright grid, masked to only show within HIGHLIGHT_RADIUS of the cursor */}
      <div
        ref={highlightRef}
        className="pointer-events-none absolute inset-[-5%] opacity-0 transition-opacity duration-300 ease-out"
        style={
          {
            '--mx': '-9999px',
            '--my': '-9999px',
            backgroundImage: BRIGHT_GRID_IMAGE,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            filter:
              'drop-shadow(0 0 5px var(--color-cyan)) drop-shadow(0 0 12px var(--color-cyan))',
            maskImage: `radial-gradient(circle ${HIGHLIGHT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${HIGHLIGHT_RADIUS}px at var(--mx) var(--my), black 0%, transparent 100%)`,
          } as CSSProperties
        }
      />
    </div>
  );
}
