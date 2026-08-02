'use client';

import { useRef, useState } from 'react';
import { CERTIFICATIONS, type Certification } from '@/lib/certifications';
import { CertificationCard } from '@/components/certifications/CertificationCard';
import { CertificationModal } from '@/components/certifications/CertificationModal';

export function CertificationsSection() {
  const [active, setActive] = useState<Certification | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function handleOpen(cert: Certification, trigger: HTMLElement) {
    returnFocusRef.current = trigger;
    setActive(cert);
  }

  return (
    <section id="certifications" className="relative border-t border-border bg-bg px-[6vw] py-[110px]">
      <div className="mx-auto mb-12 max-w-[1180px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">
          Certifications
        </div>
        <h2 className="mx-auto max-w-[560px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Structured learning, verified.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.name} cert={cert} onOpen={handleOpen} />
        ))}
      </div>

      <CertificationModal cert={active} onClose={() => setActive(null)} returnFocusRef={returnFocusRef} />
    </section>
  );
}
