'use client';

import type { ReactNode } from 'react';
import { Header } from '@/components/nav/Header';
import { Footer } from '@/components/layout/Footer';
import { MeshGradient } from '@/components/layout/MeshGradient';
import { Atmosphere } from '@/components/layout/Atmosphere';
import { CustomCursor } from '@/components/cursor/CustomCursor';

/**
 * Wraps every route with the persistent site chrome. Lives in the root layout
 * so it survives navigation to non-homepage routes like /blog and /blog/[slug].
 * The loading sequence (Loader) is deliberately NOT here — it's a homepage-only
 * "entering the site" moment, rendered directly in app/page.tsx.
 */
export function ChromeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CustomCursor />
      <Atmosphere />
      <MeshGradient />

      <Header />

      {children}

      <Footer />
    </>
  );
}
