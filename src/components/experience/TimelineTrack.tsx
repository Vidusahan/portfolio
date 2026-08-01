import { TimelineMilestone } from '@/components/experience/TimelineMilestone';
import type { TimelineItem } from '@/lib/experience';

interface TimelineTrackProps {
  items: TimelineItem[];
  color: string;
}

export function TimelineTrack({ items, color }: TimelineTrackProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <TimelineMilestone
          key={`${item.title}-${item.period}`}
          item={item}
          color={color}
          isLast={i === items.length - 1}
          index={i}
        />
      ))}
    </div>
  );
}
