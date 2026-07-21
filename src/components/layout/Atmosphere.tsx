/**
 * Film-grain texture + edge vignette, layered above the mesh gradient
 * but below interactive content. Purely decorative — aria-hidden.
 */
export function Atmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[4]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </>
  );
}
