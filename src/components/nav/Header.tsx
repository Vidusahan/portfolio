'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { NAV_LINKS } from '@/lib/constants';
import { useScrolled } from '@/hooks/useScrolled';
import { MobileNav } from '@/components/nav/MobileNav';

export function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 right-0 left-0 z-[60] flex items-center justify-between border-b border-transparent px-[5vw] py-[22px] transition-[background,backdrop-filter,border-color] duration-[400ms]',
          scrolled && 'border-border bg-bg/72 backdrop-blur-[16px] backdrop-saturate-[140%]',
        )}
      >
        <a href="/" className="flex items-center gap-[9px] font-display text-[19px] font-semibold tracking-[0.02em]">
          <span className="h-[6px] w-[6px] rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
          VP
        </a>

        <nav className="hidden gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={clsx(
                'group relative px-3 py-2.5 text-[13px] font-medium text-text-dim transition-colors hover:text-text',
                i === 0 && 'text-text',
              )}
            >
              {link.label}
              <span
                className={clsx(
                  'absolute right-3 bottom-1.5 left-3 h-px origin-left scale-x-0 bg-cyan transition-transform duration-[350ms] ease-signature group-hover:scale-x-100',
                  i === 0 && 'scale-x-100',
                )}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-text-dim lg:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald shadow-[0_0_8px_var(--color-emerald)]" />
          Open to work
        </div>

        <button
          className="relative h-10 w-10 rounded-lg border border-border lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={clsx(
              'absolute top-4 right-[11px] left-[11px] h-px bg-text transition-transform duration-300',
              menuOpen && 'translate-y-1 rotate-45',
            )}
          />
          <span
            className={clsx(
              'absolute top-5 right-[11px] left-[11px] h-px bg-text transition-opacity duration-300',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={clsx(
              'absolute top-6 right-[11px] left-[11px] h-px bg-text transition-transform duration-300',
              menuOpen && '-translate-y-1 -rotate-45',
            )}
          />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
