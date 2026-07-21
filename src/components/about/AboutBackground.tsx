'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** "Digital Particle Grid" background scoped to the About section only. */
export function AboutBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.setProperty('--px', `${relX * -14}px`);
      el!.style.setProperty('--py', `${relY * -14}px`);
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ '--px': '0px', '--py': '0px' } as CSSProperties}
    >
      <div
        className="absolute inset-[-5%] transition-transform duration-300 ease-out"
        style={{
          transform: 'translate(var(--px), var(--py))',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />
    </div>
  );
}
