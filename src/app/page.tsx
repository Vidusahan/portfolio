'use client';

import { useState } from 'react';
import { Loader } from '@/components/loader/Loader';
import { Header } from '@/components/nav/Header';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { NextTeaser } from '@/components/sections/NextTeaser';
import { Footer } from '@/components/layout/Footer';
import { MeshGradient } from '@/components/layout/MeshGradient';
import { Atmosphere } from '@/components/layout/Atmosphere';

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Atmosphere />
      <MeshGradient />

      <Loader onFinished={() => setRevealed(true)} />

      <Header />

      <main id="main">
        <Hero revealed={revealed} />
        <About />
        <NextTeaser />
      </main>

      <Footer />
    </>
  );
}
