'use client';

import { useRef, type MutableRefObject, type ReactNode } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { PROJECT_CATEGORY_COLOR, PROJECT_CATEGORY_LABEL, type Project } from '@/lib/projects';
import { useModalBehavior } from '@/hooks/useModalBehavior';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
}

export function ProjectModal({ project, onClose, returnFocusRef }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalBehavior(!!project, onClose, closeButtonRef, returnFocusRef);

  if (!project) return null;

  const color = PROJECT_CATEGORY_COLOR[project.category];

  return (
    <div
      className="fixed inset-0 z-[150] overflow-y-auto bg-bg/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-auto min-h-full max-w-[860px] px-6 py-20 sm:px-10">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close case study"
          className="fixed top-6 right-6 z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-cyan hover:text-cyan"
        >
          <X size={18} />
        </button>

        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="font-mono text-[11px] tracking-[0.12em] text-text-dim uppercase">
            {PROJECT_CATEGORY_LABEL[project.category]}
          </span>
        </div>

        <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.1] font-semibold tracking-[-0.01em]">
          {project.title}
        </h2>
        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-text-dim">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-text-dim"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium transition-colors hover:border-cyan hover:text-cyan"
            >
              <Github size={14} /> GitHub
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-text-dim opacity-50">
              <Github size={14} /> Repo coming soon
            </span>
          )}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium transition-colors hover:border-emerald hover:text-emerald"
            >
              <ExternalLink size={14} /> Live demo
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-text-dim opacity-50">
              <ExternalLink size={14} /> No live demo
            </span>
          )}
        </div>

        <CaseStudySection title="Problem">{project.problem}</CaseStudySection>
        <CaseStudySection title="Solution">{project.solution}</CaseStudySection>

        <div className="mt-14">
          <SectionLabel>Architecture</SectionLabel>
          <div className="mt-5 flex flex-col gap-0">
            {project.architecture.map((step, i) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]"
                    style={{ borderColor: color, color }}
                  >
                    {i + 1}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-border" style={{ minHeight: '18px' }} />
                  )}
                </div>
                <p className="pb-6 text-[14px] leading-[1.6] text-text-dim">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <SectionLabel>Timeline</SectionLabel>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {project.timeline.map((step) => (
              <div key={step.label} className="rounded-xl border border-border bg-card p-5">
                <div className="font-display text-sm font-medium text-text">{step.label}</div>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-text-dim">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <CaseStudySection title="Challenges">{project.challenges}</CaseStudySection>
        <CaseStudySection title="Lessons learned">{project.lessonsLearned}</CaseStudySection>
        <CaseStudySection title="Future improvements">{project.futureImprovements}</CaseStudySection>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono text-xs tracking-[0.2em] text-text-dim uppercase">{children}</div>;
}

function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-14">
      <SectionLabel>{title}</SectionLabel>
      <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-text-dim">{children}</p>
    </div>
  );
}
