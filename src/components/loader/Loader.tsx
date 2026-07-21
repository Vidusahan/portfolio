'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { sampleTextPoints, makeLoaderParticles, type LoaderParticle } from '@/lib/textParticles';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LoaderProps {
  onFinished: () => void;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function Loader({ onFinished }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontProbeRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [mounted, setMounted] = useState(true);
  const finishedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: LoaderParticle[] = [];
    let bursting = false;
    let burstStart = 0;
    let rafDraw = 0;
    let rafProgress = 0;
    let progressStart: number | null = null;

    function resolvedFontFamily() {
      if (!fontProbeRef.current) return 'sans-serif';
      return getComputedStyle(fontProbeRef.current).fontFamily;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const targets = sampleTextPoints('VP', width, height, resolvedFontFamily());
      particles = makeLoaderParticles(targets, width, height, reduceMotion);
    }

    function draw(ts: number) {
      ctx!.fillStyle = 'rgba(5,5,5,0.22)';
      ctx!.fillRect(0, 0, width, height);
      ctx!.globalCompositeOperation = 'lighter';

      for (const p of particles) {
        if (!bursting) {
          p.x += (p.tx - p.x) * 0.07;
          p.y += (p.ty - p.y) * 0.07;
        } else {
          const elapsed = ts - burstStart;
          const f = Math.min(1, elapsed / 650);
          p.x += p.burstX * (1 - f) * 0.06;
          p.y += p.burstY * (1 - f) * 0.06;
        }
        ctx!.beginPath();
        ctx!.fillStyle = p.hue;
        ctx!.globalAlpha = bursting ? Math.max(0, 1 - (ts - burstStart) / 650) : 0.85;
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';
      rafDraw = requestAnimationFrame(draw);
    }

    function triggerBurst() {
      bursting = true;
      burstStart = performance.now();
      for (const p of particles) {
        p.burstX = (p.x - width / 2) * 3;
        p.burstY = (p.y - height / 2) * 3;
      }
    }

    function stepProgress(ts: number) {
      if (progressStart === null) progressStart = ts;
      const elapsed = ts - progressStart;
      const duration = reduceMotion ? 700 : 2200;
      const pct = Math.min(100, easeOutCubic(Math.min(1, elapsed / duration)) * 100);
      setProgress(pct);
      if (pct < 100) {
        rafProgress = requestAnimationFrame(stepProgress);
      } else {
        finish();
      }
    }

    function finish() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      triggerBurst();
      setTimeout(
        () => {
          setHiding(true);
          onFinished();
          setTimeout(() => setMounted(false), 750);
        },
        reduceMotion ? 80 : 500,
      );
    }

    let cancelled = false;
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      if (cancelled) return;
      resize();
      rafDraw = requestAnimationFrame(draw);
      rafProgress = requestAnimationFrame(stepProgress);
    });
    window.addEventListener('resize', resize);

    // expose a way for the skip button to fast-forward, scoped to this effect instance
    (canvas as HTMLCanvasElement & { __skip?: () => void }).__skip = () => {
      cancelAnimationFrame(rafProgress);
      setProgress(100);
      finish();
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafDraw);
      cancelAnimationFrame(rafProgress);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSkip() {
    const skip = (canvasRef.current as (HTMLCanvasElement & { __skip?: () => void }) | null)?.__skip;
    skip?.();
  }

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading site"
      className={clsx(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-[opacity,filter] duration-[700ms] ease-signature',
        hiding && 'pointer-events-none opacity-0 blur-[12px]',
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span ref={fontProbeRef} className="font-display" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        VP
      </span>

      <div className="relative z-[2] flex flex-col items-center gap-[22px]">
        <div className="font-mono text-[11px] tracking-[0.28em] text-text-dim uppercase">
          Initializing System
        </div>
        <div className="relative h-px w-[220px] overflow-hidden bg-border">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan to-emerald shadow-[0_0_12px_var(--color-cyan)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs tracking-[0.1em] text-text-dim">
          {String(Math.floor(progress)).padStart(2, '0')}%
        </div>
      </div>

      <button
        onClick={handleSkip}
        className="absolute right-8 bottom-7 z-[3] rounded-full border border-border px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] text-text-dim transition-colors hover:border-cyan hover:text-cyan"
      >
        Skip →
      </button>
    </div>
  );
}
