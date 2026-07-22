'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { PROJECT_CATEGORY_LABEL, type ProjectCategory } from '@/lib/projects';

interface FilterChipsProps {
  active: ProjectCategory | 'all';
  onChange: (value: ProjectCategory | 'all') => void;
  techFilter: string | null;
  onClearTechFilter: () => void;
}

const CATEGORIES: Array<ProjectCategory | 'all'> = ['all', 'ai', 'ml', 'automation', 'software', 'data', 'research'];

export function FilterChips({ active, onChange, techFilter, onClearTechFilter }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={clsx(
            'rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-200',
            active === cat
              ? 'border-cyan bg-cyan/10 text-cyan'
              : 'border-border text-text-dim hover:border-text-dim hover:text-text',
          )}
        >
          {cat === 'all' ? 'All' : PROJECT_CATEGORY_LABEL[cat]}
        </button>
      ))}

      {techFilter && (
        <button
          onClick={onClearTechFilter}
          className="inline-flex items-center gap-1.5 rounded-full border border-purple bg-purple/10 px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-purple uppercase"
        >
          {techFilter} <X size={12} />
        </button>
      )}
    </div>
  );
}
