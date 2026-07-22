'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { PROJECT_CATEGORY_COLOR, PROJECT_CATEGORY_LABEL, type Project } from '@/lib/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

const MAX_TILT_DEG = 8;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const color = PROJECT_CATEGORY_COLOR[project.category];

  // Mount-triggered fade/slide-in, so cards re-entering after a filter change
  // (which remounts them, since they're conditionally rendered) animate in
  // rather than just popping into place.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * MAX_TILT_DEG * 2;
    const rotateX = -((y / rect.height) - 0.5) * MAX_TILT_DEG * 2;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }

  return (
    <button
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => onOpen(project, e.currentTarget)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-[transform,opacity,border-color] duration-300 ease-signature will-change-transform hover:border-cyan/40"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? undefined : 'translateY(14px)',
      }}
    >
      <span
        className="pointer-events-none absolute h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          left: 'var(--x, 50%)',
          top: 'var(--y, 50%)',
          background: `radial-gradient(circle, ${color}22, transparent 70%)`,
        }}
      />

      <div className="relative z-[1] flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="font-mono text-[11px] tracking-[0.1em] text-text-dim uppercase">
          {PROJECT_CATEGORY_LABEL[project.category]}
        </span>
      </div>

      <div className="relative z-[1] mt-4 font-display text-xl font-semibold text-text">
        {project.title}
      </div>
      <p className="relative z-[1] mt-2 text-[13px] leading-[1.65] text-text-dim">{project.tagline}</p>

      <div className="relative z-[1] mt-5 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-text-dim"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="relative z-[1] mt-6 font-mono text-[11px] tracking-[0.08em] text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View case study →
      </div>
    </button>
  );
}
