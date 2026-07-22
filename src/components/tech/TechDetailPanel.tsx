import type { TechItem } from '@/lib/techUniverse';
import { CATEGORY_COLOR, CATEGORY_LABEL } from '@/lib/techUniverse';

interface TechDetailPanelProps {
  item: TechItem | null;
}

export function TechDetailPanel({ item }: TechDetailPanelProps) {
  if (!item) {
    return (
      <div className="flex h-full flex-col justify-center gap-3 rounded-2xl border border-border bg-card p-7">
        <div className="font-mono text-[11px] tracking-[0.12em] text-text-dim uppercase">
          Tech Universe
        </div>
        <p className="text-sm leading-[1.7] text-text-dim">
          Hover a node to see how I&apos;ve used it. Click one to filter the Projects
          section below to work that used it.
        </p>
      </div>
    );
  }

  const color = CATEGORY_COLOR[item.category];

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span className="font-mono text-[11px] tracking-[0.12em] text-text-dim uppercase">
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>

      <div className="font-display text-2xl font-semibold text-text">{item.name}</div>

      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: i < item.level ? color : 'var(--color-border)' }}
          />
        ))}
      </div>

      <p className="text-[13px] leading-[1.7] text-text-dim">{item.blurb}</p>

      <button
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-cyan transition-opacity hover:opacity-80"
      >
        View filtered projects ↓
      </button>
    </div>
  );
}
