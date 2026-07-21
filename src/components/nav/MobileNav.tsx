'use client';

import clsx from 'clsx';
import { NAV_LINKS } from '@/lib/constants';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <nav
      aria-label="Mobile"
      className={clsx(
        'fixed inset-0 z-[80] flex -translate-y-full transform-gpu flex-col items-center justify-center gap-[26px] bg-bg-2 transition-transform duration-[550ms] ease-signature',
        open && 'translate-y-0',
      )}
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onClose}
          className="font-display text-3xl font-medium text-text-dim transition-colors hover:text-text focus-visible:text-text"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
