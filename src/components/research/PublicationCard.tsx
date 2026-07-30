import { FileText } from 'lucide-react';
import { PUBLICATION } from '@/lib/research';

const STATUS_LABEL: Record<typeof PUBLICATION.status, string> = {
  'in-preparation': 'In preparation',
  submitted: 'Submitted',
  published: 'Published',
};

export function PublicationCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-cyan">
          <FileText size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-text-dim uppercase">
              {STATUS_LABEL[PUBLICATION.status]}
            </span>
            <span className="font-mono text-[11px] text-text-dim">{PUBLICATION.venue}</span>
          </div>
          <p className="mt-2 max-w-[440px] text-[13px] leading-[1.6] text-text-dim">{PUBLICATION.note}</p>
        </div>
      </div>

      {PUBLICATION.paperUrl ? (
        <a
          href={PUBLICATION.paperUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-cyan px-5 py-2.5 text-[13px] font-medium text-cyan transition-colors hover:bg-cyan/10"
        >
          Read paper
        </a>
      ) : (
        <span className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-border px-5 py-2.5 text-[13px] font-medium text-text-dim opacity-60">
          Paper not yet available
        </span>
      )}
    </div>
  );
}
