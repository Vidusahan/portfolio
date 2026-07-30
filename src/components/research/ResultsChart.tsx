'use client';

import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { RESEARCH_RESULTS } from '@/lib/research';

function ResultBar({
  generator,
  accuracy,
  inTrainingSet,
  delay,
  inView,
}: {
  generator: string;
  accuracy: number;
  inTrainingSet: boolean;
  delay: number;
  inView: boolean;
}) {
  const color = inTrainingSet ? 'var(--color-cyan)' : 'var(--color-purple)';

  return (
    <div className="flex items-center gap-4">
      <div className="w-[168px] shrink-0 text-[13px] text-text-dim">{generator}</div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-[width] duration-[1100ms] ease-signature"
          style={{
            width: inView ? `${accuracy}%` : '0%',
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <div className="w-12 shrink-0 text-right font-mono text-[13px] text-text">{accuracy}%</div>
    </div>
  );
}

export function ResultsChart() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-xs tracking-[0.15em] text-text-dim uppercase">
          Detection accuracy by generator
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-text-dim uppercase">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan" /> In training set
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple" /> Held out
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {RESEARCH_RESULTS.map((row, i) => (
          <ResultBar
            key={row.generator}
            generator={row.generator}
            accuracy={row.accuracy}
            inTrainingSet={row.inTrainingSet}
            delay={reduceMotion ? 0 : i * 90}
            inView={inView}
          />
        ))}
      </div>

      <p className="mt-6 text-[12px] text-text-dim italic">
        Illustrative placeholder figures — replace with real experiment results.
      </p>
    </div>
  );
}
