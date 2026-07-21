'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

/** Animates a number from 0 to `target` once `start` becomes true. Respects reduced motion by jumping straight to the target. */
export function useCountUp(target: number, start: boolean, duration = 1400, reduceMotion = false) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;

    function tick(ts: number) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(1, elapsed / duration);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration, reduceMotion]);

  return value;
}
