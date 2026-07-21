'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

/**
 * Replaces the system cursor with a two-part virtual cursor:
 * - a small dot that tracks the pointer instantly
 * - a larger ring that eases toward the pointer with a short lag ("floating")
 *
 * Only activates on fine-pointer (mouse/trackpad) devices — touch devices keep
 * their native behavior untouched, and it bails out live if a touch is detected.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;
    let revealed = false;

    // Lower factor = more lag/"float". Reduced-motion users get a snappier,
    // near-1:1 follow instead of a pronounced trailing effect.
    const lerpFactor = reduceMotion ? 0.55 : 0.16;

    function onMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot!.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (!revealed) {
        revealed = true;
        dot!.style.opacity = '1';
        ring!.style.opacity = '1';
      }
    }

    function onWindowLeave() {
      revealed = false;
      dot!.style.opacity = '0';
      ring!.style.opacity = '0';
    }

    function onDown() {
      ring!.classList.add('cursor-active');
    }
    function onUp() {
      ring!.classList.remove('cursor-active');
    }

    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) ring!.classList.add('cursor-hover');
    }
    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) ring!.classList.remove('cursor-hover');
    }

    function disableForTouch() {
      document.documentElement.classList.remove('custom-cursor-active');
      dot!.style.opacity = '0';
      ring!.style.opacity = '0';
      cancelAnimationFrame(rafId);
    }

    function tick() {
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onWindowLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', disableForTouch, { once: true, passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onWindowLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', disableForTouch);
    };
  }, [reduceMotion]);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
