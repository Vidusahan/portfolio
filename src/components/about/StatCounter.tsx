'use client';

import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { AboutStat } from '@/lib/constants';

export function StatCounter({ stat }: { stat: AboutStat }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const reduceMotion = useReducedMotion();
  const value = useCountUp(stat.value, inView, 1400, reduceMotion);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
      <div className="font-mono text-[clamp(1.7rem,3.4vw,2.4rem)] font-medium text-text">
        {value}
        {stat.suffix ?? ''}
      </div>
      <div className="text-xs tracking-[0.04em] text-text-dim uppercase">{stat.label}</div>
    </div>
  );
}
