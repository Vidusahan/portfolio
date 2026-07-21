'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ROLES } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RoleRotatorProps {
  /** When false, the rotator stays paused on the first role (used while the loader is still up). */
  active: boolean;
}

export function RoleRotator({ active }: RoleRotatorProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (!active || reduceMotion) return;

    const interval = setInterval(() => {
      setSwapping(true);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setSwapping(false);
      }, 420);
      return () => clearTimeout(timeout);
    }, 2600);

    return () => clearInterval(interval);
  }, [active, reduceMotion]);

  return (
    <div className="flex h-[1.7em] items-center justify-center font-display text-[clamp(1.1rem,2.6vw,1.6rem)] font-medium">
      <span className="mr-2.5 font-normal text-text-dim">I build as an</span>
      <span
        className={clsx(
          'bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent transition-all duration-[450ms] ease-signature',
          swapping && 'translate-y-2.5 opacity-0 blur-[6px]',
        )}
      >
        {ROLES[index]}
      </span>
    </div>
  );
}
