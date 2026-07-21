'use client';

import { useEffect, useRef } from 'react';
import { flowAngle, makeParticles, particleCountFor, type FlowParticle } from '@/lib/flowField';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: FlowParticle[] = [];
    let time = 0;
    let rafId = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(particleCountFor(window.innerWidth, reduceMotion), width, height);
    }

    function draw() {
      time += reduceMotion ? 0.002 : 0.006;
      ctx!.fillStyle = 'rgba(5,5,5,0.16)';
      ctx!.fillRect(0, 0, width, height);
      ctx!.globalCompositeOperation = 'lighter';

      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, time + p.angleOffset * 0.0001);
        let vx = Math.cos(angle) * p.speed;
        let vy = Math.sin(angle) * p.speed;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const radius = 190;
          if (dist < radius) {
            const f = 1 - dist / radius;
            vx += (-dy / dist) * f * 2.4 + (dx / dist) * f * -0.6;
            vy += (dx / dist) * f * 2.4 + (dy / dist) * f * -0.6;
          }
        }

        p.x += vx;
        p.y += vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx!.beginPath();
        ctx!.fillStyle = p.hue;
        ctx!.globalAlpha = 0.35 + p.z * 0.5;
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';
      rafId = requestAnimationFrame(draw);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onPointerLeave() {
      mouse.active = false;
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas!.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
      mouse.active = true;
    }

    resize();
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);
    rafId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('touchmove', onTouchMove);
    };
    // reduceMotion intentionally excluded from deps beyond mount: changing it mid-session
    // would require a full particle re-seed, which is an acceptable trade-off for simplicity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}
