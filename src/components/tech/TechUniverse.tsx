'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CATEGORY_COLOR, CATEGORY_LABEL, type TechItem } from '@/lib/techUniverse';
import { TechDetailPanel } from '@/components/tech/TechDetailPanel';

const TechUniverseScene = dynamic(
  () => import('@/components/tech/TechUniverseScene').then((m) => m.TechUniverseScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center font-mono text-xs tracking-[0.2em] text-text-dim uppercase">
        Loading universe…
      </div>
    ),
  },
);

export interface TechUniverseProps {
  /** Called (in addition to the internal detail-panel selection) when a node is clicked, so Projects can filter by it. */
  onTechSelect?: (name: string) => void;
}

export function TechUniverse({ onTechSelect }: TechUniverseProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<TechItem | null>(null);
  const [selected, setSelected] = useState<TechItem | null>(null);

  const active = hovered ?? selected;

  function handleSelect(item: TechItem) {
    setSelected(item);
    onTechSelect?.(item.name);
  }

  return (
    <section id="skills" className="relative border-t border-border bg-bg px-[6vw] py-[110px]">
      <div className="mx-auto mb-14 max-w-[1180px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">
          Tech Universe
        </div>
        <h2 className="mx-auto max-w-[620px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Everything orbits the same core problem.
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.7] text-text-dim">
          Three orbits, grouped by how I actually use them: AI/ML closest to the core,
          full-stack tooling around it, infrastructure furthest out.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-5">
          {(Object.keys(CATEGORY_LABEL) as Array<keyof typeof CATEGORY_LABEL>).map((key) => (
            <div key={key} className="flex items-center gap-2 font-mono text-[11px] text-text-dim uppercase">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: CATEGORY_COLOR[key], boxShadow: `0 0 6px ${CATEGORY_COLOR[key]}` }}
              />
              {CATEGORY_LABEL[key]}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_340px]">
        <div
          data-cursor-hover
          className="relative h-[460px] overflow-hidden rounded-2xl border border-border bg-card/40 sm:h-[560px]"
        >
          <TechUniverseScene
            reduceMotion={reduceMotion}
            activeName={active?.name ?? null}
            onHover={setHovered}
            onSelect={handleSelect}
          />
        </div>

        <div className="lg:min-h-[560px]">
          <TechDetailPanel item={active} />
        </div>
      </div>
    </section>
  );
}
