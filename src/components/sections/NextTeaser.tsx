import { UPCOMING_SECTIONS } from '@/lib/constants';

export function NextTeaser() {
  return (
    <section
      id="next"
      className="relative z-[2] border-t border-border bg-bg-2 px-[6vw] py-[110px] pb-[130px] text-center"
    >
      <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">
        Phase 06 <b className="text-cyan font-medium">·</b> Experience
      </div>
      <h2 className="mx-auto mb-[34px] max-w-[640px] font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-[1.4] font-medium text-text-dim">
        Loader through experience are all live.{' '}
        <b className="font-semibold text-text">Certifications, the blog, and the AI assistant</b> are
        being built next in the same visual language.
      </h2>
      <div className="mx-auto flex max-w-[620px] flex-wrap justify-center gap-2.5">
        {UPCOMING_SECTIONS.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-text-dim"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
