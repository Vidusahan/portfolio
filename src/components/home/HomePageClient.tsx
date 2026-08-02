'use client';

import { useState, type ReactNode } from 'react';
import { Loader } from '@/components/loader/Loader';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { TechUniverse } from '@/components/tech/TechUniverse';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ResearchSection } from '@/components/research/ResearchSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { CertificationsSection } from '@/components/certifications/CertificationsSection';

/**
 * Client-side wrapper holding the homepage's interactive state (loader reveal,
 * tech-filter). `children` is used for sections that must stay Server Components
 * (e.g. BlogPreview, which reads the filesystem) — passing them as children from
 * app/page.tsx keeps them server-rendered even though this wrapper is a Client
 * Component. See: https://react.dev/reference/react/use-client#serializable-types
 */
export function HomePageClient({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [techFilter, setTechFilter] = useState<string | null>(null);

  return (
    <>
      <Loader onFinished={() => setRevealed(true)} />

      <main id="main">
        <Hero revealed={revealed} />
        <About />
        <TechUniverse onTechSelect={setTechFilter} />
        <ProjectsSection techFilter={techFilter} onClearTechFilter={() => setTechFilter(null)} />
        <ResearchSection />
        <ExperienceSection />
        <CertificationsSection />
        {children}
      </main>
    </>
  );
}
