'use client';

import { useInView } from '@/hooks/useInView';
import type { TimelineItem } from '@/lib/experience';

interface TimelineMilestoneProps {
  item: TimelineItem;
  color: string;
  isLast: boolean;
  index: number;
}

export function TimelineMilestone({ item, color, isLast, index }: TimelineMilestoneProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="flex gap-5 sm:gap-6">
      <div className="flex flex-col items-center">
        <span
          className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 transition-[background-color] duration-300"
          style={{
            borderColor: color,
            background: inView ? color : 'transparent',
            boxShadow: inView ? `0 0 10px ${color}` : 'none',
          }}
        />
        {!isLast && <span className="my-1 w-px flex-1 bg-border" style={{ minHeight: '24px' }} />}
      </div>

      <div
        className="mb-10 flex-1 rounded-2xl border border-border bg-card p-6 transition-all duration-500 ease-signature"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transitionDelay: `${Math.min(index, 4) * 60}ms`,
        }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-display text-[17px] font-semibold text-text">{item.title}</div>
          <div className="font-mono text-[11px] tracking-[0.06em] text-text-dim uppercase">{item.period}</div>
        </div>
        <div className="mt-1 text-[13px] text-text-dim">{item.org}</div>
        <p className="mt-3 text-[14px] leading-[1.7] text-text-dim">{item.detail}</p>

        {item.highlights.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[13px] leading-[1.6] text-text-dim">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: color }} />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
