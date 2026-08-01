'use client';

import { useState } from 'react';
import { Loader } from '@/components/loader/Loader';
import { Header } from '@/components/nav/Header';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { TechUniverse } from '@/components/tech/TechUniverse';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ResearchSection } from '@/components/research/ResearchSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { NextTeaser } from '@/components/sections/NextTeaser';
import { Footer } from '@/components/layout/Footer';
import { MeshGradient } from '@/components/layout/MeshGradient';
import { Atmosphere } from '@/components/layout/Atmosphere';
import { CustomCursor } from '@/components/cursor/CustomCursor';

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);
  const [techFilter, setTechFilter] = useState<string | null>(null);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CustomCursor />
      <Atmosphere />
      <MeshGradient />

      <Loader onFinished={() => setRevealed(true)} />

      <Header />

      <main id="main">
        <Hero revealed={revealed} />
        <About />
        <TechUniverse onTechSelect={setTechFilter} />
        <ProjectsSection techFilter={techFilter} onClearTechFilter={() => setTechFilter(null)} />
        <ResearchSection />
        <ExperienceSection />
        <NextTeaser />
      </main>

      <Footer />
    </>
  );
}
