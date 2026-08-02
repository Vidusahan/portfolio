'use client';

export function Footer() {
  return (
    <footer className="relative z-[2] flex items-center justify-between border-t border-border bg-bg-2 px-[6vw] py-[26px] font-mono text-[11px] text-text-dim">
      <span>© {new Date().getFullYear()} Vidusahan Perera</span>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="transition-colors hover:text-cyan"
      >
        Back to top ↑
      </button>
    </footer>
  );
}
