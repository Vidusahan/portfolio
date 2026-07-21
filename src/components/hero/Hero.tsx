'use client';

import clsx from 'clsx';
import { HeroCanvas } from '@/components/hero/HeroCanvas';
import { RoleRotator } from '@/components/hero/RoleRotator';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroProps {
  /** Set true once the loader has finished, triggering the reveal transition. */
  revealed: boolean;
}

export function Hero({ revealed }: HeroProps) {
  const reduceMotion = useReducedMotion();

  function scrollToNext() {
    document.getElementById('next')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <HeroCanvas />

      <div
        className={clsx(
          'relative z-[2] flex max-w-[900px] flex-col items-center gap-[26px] text-center opacity-0 blur-[14px] transition-all duration-[1500ms] ease-signature will-change-transform',
          revealed && 'scale-100 opacity-100 blur-none',
          !revealed && 'scale-[1.07]',
        )}
      >
        <div className="font-mono text-xs tracking-[0.3em] text-text-dim uppercase">
          Computer Science Undergraduate <b className="text-cyan font-medium">·</b> Colombo, Sri Lanka
        </div>

        <h1 className="font-display text-[clamp(2.4rem,7vw,5.4rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          <span className="mb-1.5 block text-[0.4em] font-normal text-text-dim">Hello, I&apos;m</span>
          {['Vidusahan', 'Perera'].map((word) => (
            <span key={word} className="inline-block overflow-hidden align-top">
              <span
                className={clsx(
                  'inline-block transition-transform duration-[900ms] ease-signature',
                  revealed ? 'translate-y-0' : 'translate-y-[110%]',
                )}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <RoleRotator active={revealed} />

        <p className="max-w-[520px] text-[15px] leading-[1.7] font-light text-text-dim">
          I design and ship intelligent systems — from machine learning pipelines to automated
          infrastructure — turning research into software that runs in production.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3.5">
          <MagneticButton variant="primary" href="#next">
            View Projects
          </MagneticButton>
          <MagneticButton variant="outline" href="#next">
            Download Resume
          </MagneticButton>
          <MagneticButton variant="ghost" href="#next">
            Contact Me
          </MagneticButton>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-[34px] left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="relative h-[34px] w-px bg-gradient-to-b from-border to-text-dim">
          <span className="absolute -left-[1.5px] top-0 h-1 w-1 animate-[scrolldown_1.8s_ease-in-out_infinite] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-text-dim">SCROLL</span>
      </button>
    </section>
  );
}
