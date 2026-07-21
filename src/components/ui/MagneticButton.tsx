'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import clsx from 'clsx';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Variant = 'primary' | 'outline' | 'ghost';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onActivate?: () => void;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan to-emerald text-[#04110d] shadow-[0_0_0_rgba(78,234,255,0)] hover:shadow-[0_0_32px_rgba(78,234,255,0.35)]',
  outline:
    'bg-transparent text-text border border-border hover:border-purple hover:shadow-[0_0_24px_rgba(155,107,255,0.22)]',
  ghost: 'bg-transparent text-text-dim hover:text-text px-2.5',
};

/** Button that eases toward the cursor on hover and shows a soft radial spotlight, per the CTA spec. */
export function MagneticButton({
  children,
  variant = 'primary',
  href = '#next',
  onActivate,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x - rect.width / 2) * 0.28;
    const relY = (y - rect.height / 2) * 0.5;
    ref.current.style.transform = `translate(${relX}px, ${relY}px)`;
    ref.current.style.setProperty('--x', `${x}px`);
    ref.current.style.setProperty('--y', `${y}px`);
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  }

  function handleClick() {
    onActivate?.();
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={clsx(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-[26px] py-3.5 text-sm font-medium transition-transform duration-[250ms] ease-signature',
        VARIANT_CLASSES[variant],
      )}
    >
      {children}
      {variant !== 'ghost' && (
        <span
          className="pointer-events-none absolute h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ left: 'var(--x, 50%)', top: 'var(--y, 50%)' }}
        />
      )}
      {variant === 'ghost' && (
        <span className="absolute right-2.5 bottom-2 left-2.5 h-px origin-left scale-x-0 bg-text-dim transition-transform duration-300 ease-signature group-hover:scale-x-100" />
      )}
    </button>
  );
}
