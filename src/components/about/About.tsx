import { ABOUT_PILLARS, ABOUT_STATS } from '@/lib/constants';
import { AboutBackground } from '@/components/about/AboutBackground';
import { AboutPortrait } from '@/components/about/AboutPortrait';
import { StatCounter } from '@/components/about/StatCounter';

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-border bg-bg-2 px-[6vw] py-[110px]"
    >
      <AboutBackground />

      <div className="relative z-[2] mx-auto grid max-w-[1180px] gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div className="order-2 lg:order-1 lg:sticky lg:top-[120px] lg:self-start">
          <AboutPortrait />
        </div>

        <div className="order-1 flex flex-col gap-14 lg:order-2">
          <div>
            <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">About</div>
            <h2 className="max-w-[560px] font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] font-semibold tracking-[-0.01em]">
              Curiosity first. Rigor right after.
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-[1.8] text-text-dim">
              I&apos;m a Computer Science undergraduate who got pulled toward AI and automation
              the same way most engineers do — by building something that broke in an
              interesting way, and wanting to understand why. That curiosity turned into a
              habit: pick a hard, real problem, ship a working system for it, then go back
              and learn the theory that explains what actually happened.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {ABOUT_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan/40"
              >
                <div className="mb-3 font-mono text-[11px] tracking-[0.12em] text-cyan uppercase">
                  {pillar.label}
                </div>
                <div className="mb-2 font-display text-[15px] font-medium text-text">
                  {pillar.title}
                </div>
                <p className="text-[13px] leading-[1.7] text-text-dim">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-10 border-t border-border pt-10 sm:grid-cols-3 md:grid-cols-5">
            {ABOUT_STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
