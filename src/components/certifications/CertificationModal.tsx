'use client';

import { useRef, type MutableRefObject } from 'react';
import { X, Award, ExternalLink } from 'lucide-react';
import { CERT_CATEGORY_COLOR, type Certification } from '@/lib/certifications';
import { useModalBehavior } from '@/hooks/useModalBehavior';

interface CertificationModalProps {
  cert: Certification | null;
  onClose: () => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
}

export function CertificationModal({ cert, onClose, returnFocusRef }: CertificationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useModalBehavior(!!cert, onClose, closeButtonRef, returnFocusRef);

  if (!cert) return null;

  const color = CERT_CATEGORY_COLOR[cert.category];

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-bg/90 p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.name} certificate`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[520px] rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2"
            style={{ borderColor: color, color, boxShadow: `0 0 20px ${color}33` }}
          >
            <Award size={24} />
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close certificate view"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-cyan hover:text-cyan"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 font-display text-2xl font-semibold text-text">{cert.name}</div>
        <div className="mt-1.5 text-[14px] text-text-dim">
          {cert.issuer} · {cert.date}
        </div>

        <p className="mt-5 text-[14px] leading-[1.75] text-text-dim">{cert.description}</p>

        <div className="mt-8">
          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan px-5 py-2.5 text-[13px] font-medium text-cyan transition-colors hover:bg-cyan/10"
            >
              <ExternalLink size={14} /> Verify credential
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[13px] font-medium text-text-dim opacity-60">
              <ExternalLink size={14} /> Verification link not added yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
