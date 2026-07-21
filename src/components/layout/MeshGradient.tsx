export function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <span
        className="absolute -top-[10%] -left-[8%] h-[520px] w-[520px] animate-[drift_22s_ease-in-out_infinite] rounded-full opacity-[0.28] blur-[110px]"
        style={{ background: 'var(--color-cyan)' }}
      />
      <span
        className="absolute -right-[6%] -bottom-[14%] h-[460px] w-[460px] animate-[drift_22s_ease-in-out_infinite_-7s] rounded-full opacity-[0.28] blur-[110px]"
        style={{ background: 'var(--color-purple)' }}
      />
      <span
        className="absolute top-[35%] right-[20%] h-[380px] w-[380px] animate-[drift_22s_ease-in-out_infinite_-14s] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: 'var(--color-emerald)' }}
      />
    </div>
  );
}
