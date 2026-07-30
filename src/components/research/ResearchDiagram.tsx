'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { RESEARCH_PIPELINE } from '@/lib/research';

export function ResearchDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = RESEARCH_PIPELINE[activeIndex] ?? RESEARCH_PIPELINE[0]!;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="relative">
        <div className="absolute top-[19px] right-0 left-0 hidden h-px bg-border sm:block" aria-hidden="true" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:justify-between">
          {RESEARCH_PIPELINE.map((node, i) => (
            <button
              key={node.label}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              className="group flex items-center gap-3 text-left sm:flex-col sm:items-center sm:gap-2 sm:text-center"
              aria-pressed={activeIndex === i}
            >
              <span
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-200',
                  activeIndex === i
                    ? 'border-cyan bg-cyan/10 text-cyan'
                    : 'border-border bg-bg-2 text-text-dim group-hover:border-text-dim group-hover:text-text',
                )}
              >
                {i + 1}
              </span>
              <span
                className={clsx(
                  'font-mono text-[11px] tracking-[0.05em] uppercase transition-colors duration-200',
                  activeIndex === i ? 'text-text' : 'text-text-dim',
                )}
              >
                {node.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 min-h-[92px] border-t border-border pt-6">
        <div className="font-display text-lg font-medium text-text">{active.title}</div>
        <p className="mt-2 max-w-[560px] text-[14px] leading-[1.7] text-text-dim">{active.description}</p>
      </div>
    </div>
  );
}
