import {
  RESEARCH_OBJECTIVES,
  RESEARCH_DATASETS,
  RESEARCH_FUTURE_WORK,
} from '@/lib/research';
import { ResearchDiagram } from '@/components/research/ResearchDiagram';
import { ResultsChart } from '@/components/research/ResultsChart';
import { PublicationCard } from '@/components/research/PublicationCard';
import type { ReactNode } from 'react';

export function ResearchSection() {
  return (
    <section id="research" className="relative border-t border-border bg-bg px-[6vw] py-[110px]">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">Research</div>
        <h2 className="max-w-[620px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Voice deepfake detection
        </h2>
        <p className="mt-6 max-w-[640px] text-[15px] leading-[1.8] text-text-dim">
          Voice-cloning tools have gotten good enough to fool casual listeners, and most
          public detection benchmarks don&apos;t generalize well across the different
          synthesis methods in the wild. This research asks a narrower, more useful
          question than &ldquo;can we detect fake audio&rdquo;: can a detector trained on
          a handful of generators still work on ones it&apos;s never seen?
        </p>
        <a
          href="#projects"
          className="mt-5 inline-block font-mono text-[12px] tracking-[0.06em] text-cyan transition-opacity hover:opacity-80"
        >
          See it as a shipped project →
        </a>

        {/* Objectives */}
        <div className="mt-16">
          <SectionLabel>Objectives</SectionLabel>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {RESEARCH_OBJECTIVES.map((obj) => (
              <div key={obj.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 font-display text-[15px] font-medium text-text">{obj.title}</div>
                <p className="text-[13px] leading-[1.7] text-text-dim">{obj.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology / architecture diagram */}
        <div className="mt-16">
          <SectionLabel>Methodology &amp; architecture</SectionLabel>
          <p className="mt-4 max-w-[600px] text-[14px] leading-[1.7] text-text-dim">
            Hover or click a stage below for detail — the pipeline stays the same across
            every training run; what changes between experiments is which generators are
            held out of training entirely.
          </p>
          <div className="mt-6">
            <ResearchDiagram />
          </div>
        </div>

        {/* Datasets */}
        <div className="mt-16">
          <SectionLabel>Datasets</SectionLabel>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {RESEARCH_DATASETS.map((ds) => (
              <div key={ds.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 font-mono text-[13px] font-medium text-emerald">{ds.name}</div>
                <p className="text-[13px] leading-[1.7] text-text-dim">{ds.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experiments & results */}
        <div className="mt-16">
          <SectionLabel>Experiments &amp; results</SectionLabel>
          <p className="mt-4 max-w-[600px] text-[14px] leading-[1.7] text-text-dim">
            Accuracy holds up well on generators the model trained on, and drops — as
            expected — on held-out ones. That gap is the actual research problem.
          </p>
          <div className="mt-6">
            <ResultsChart />
          </div>
        </div>

        {/* Future work */}
        <div className="mt-16">
          <SectionLabel>Future work</SectionLabel>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.8] text-text-dim">{RESEARCH_FUTURE_WORK}</p>
        </div>

        {/* Publication */}
        <div className="mt-16">
          <SectionLabel>Publication</SectionLabel>
          <div className="mt-6">
            <PublicationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono text-xs tracking-[0.2em] text-text-dim uppercase">{children}</div>;
}
