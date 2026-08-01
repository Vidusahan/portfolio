'use client';

import { useState } from 'react';
import clsx from 'clsx';
import {
  TIMELINE_TRACK_LABEL,
  TIMELINE_TRACK_COLOR,
  timelineFor,
  type TimelineTrackId,
} from '@/lib/experience';
import { TimelineTrack } from '@/components/experience/TimelineTrack';

const TRACKS: TimelineTrackId[] = ['experience', 'education', 'ieee'];

export function ExperienceSection() {
  const [active, setActive] = useState<TimelineTrackId>('experience');
  const color = TIMELINE_TRACK_COLOR[active];
  const items = timelineFor(active);

  return (
    <section id="experience" className="relative border-t border-border bg-bg-2 px-[6vw] py-[110px]">
      <div className="mx-auto mb-12 max-w-[760px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">
          Experience
        </div>
        <h2 className="mx-auto max-w-[560px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Where the time actually went.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-text-dim">
          Three tracks — professional work, education, and IEEE leadership — all running
          in parallel.
        </p>
      </div>

      <div className="mx-auto mb-14 flex max-w-[760px] justify-center gap-2.5">
        {TRACKS.map((track) => (
          <button
            key={track}
            onClick={() => setActive(track)}
            className={clsx(
              'rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-200',
              active === track
                ? 'text-bg'
                : 'border-border text-text-dim hover:border-text-dim hover:text-text',
            )}
            style={
              active === track
                ? { borderColor: TIMELINE_TRACK_COLOR[track], background: TIMELINE_TRACK_COLOR[track] }
                : undefined
            }
          >
            {TIMELINE_TRACK_LABEL[track]}
          </button>
        ))}
      </div>

      <div key={active} className="mx-auto max-w-[720px]">
        <TimelineTrack items={items} color={color} />
      </div>
    </section>
  );
}
