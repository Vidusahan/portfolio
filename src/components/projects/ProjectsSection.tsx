'use client';

import { useMemo, useRef, useState } from 'react';
import { PROJECTS, type Project, type ProjectCategory } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { FilterChips } from '@/components/projects/FilterChips';
import { ProjectModal } from '@/components/projects/ProjectModal';

interface ProjectsSectionProps {
  /** Set when a Tech Universe node is clicked — filters to projects using that technology. */
  techFilter: string | null;
  onClearTechFilter: () => void;
}

export function ProjectsSection({ techFilter, onClearTechFilter }: ProjectsSectionProps) {
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesTech = !techFilter || p.techStack.includes(techFilter);
      return matchesCategory && matchesTech;
    });
  }, [category, techFilter]);

  function handleOpen(project: Project, trigger: HTMLElement) {
    returnFocusRef.current = trigger;
    setActiveProject(project);
  }

  return (
    <section id="projects" className="relative border-t border-border bg-bg-2 px-[6vw] py-[110px]">
      <div className="mx-auto mb-12 max-w-[1180px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">Projects</div>
        <h2 className="mx-auto max-w-[620px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Things I&apos;ve actually shipped.
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.7] text-text-dim">
          Filter by discipline, or click a technology in the Tech Universe above to see
          where it&apos;s actually been used.
        </p>
      </div>

      <div className="mx-auto mb-12 max-w-[1180px]">
        <FilterChips
          active={category}
          onChange={setCategory}
          techFilter={techFilter}
          onClearTechFilter={onClearTechFilter}
        />
      </div>

      <div className="mx-auto max-w-[1180px]">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-sm text-text-dim">
              Nothing matches that filter combination yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpen={handleOpen} />
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        returnFocusRef={returnFocusRef}
      />
    </section>
  );
}
