'use client';

import { Award } from 'lucide-react';
import { CERT_CATEGORY_COLOR, type Certification } from '@/lib/certifications';

interface CertificationCardProps {
  cert: Certification;
  onOpen: (cert: Certification, trigger: HTMLElement) => void;
}

export function CertificationCard({ cert, onOpen }: CertificationCardProps) {
  const color = CERT_CATEGORY_COLOR[cert.category];

  return (
    <button
      onClick={(e) => onOpen(cert, e.currentTarget)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-colors duration-300 hover:border-cyan/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
          style={{ borderColor: color, color }}
        >
          <Award size={17} />
        </div>
        <span className="font-mono text-[11px] tracking-[0.05em] text-text-dim">{cert.date}</span>
      </div>

      <div className="mt-4 font-display text-[15px] font-semibold text-text">{cert.name}</div>
      <div className="mt-1 text-[13px] text-text-dim">{cert.issuer}</div>

      <div className="mt-5 font-mono text-[11px] tracking-[0.08em] text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View details →
      </div>
    </button>
  );
}
