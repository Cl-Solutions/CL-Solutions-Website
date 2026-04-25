/**
 * Aceternity-style dot-grid + radial fade background.
 * Drop inside any `relative overflow-hidden` section.
 */
export function GridBeam({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%),
          radial-gradient(circle at 1px 1px, rgba(0,212,255,0.15) 1px, transparent 0)
        `,
        backgroundSize: '100% 100%, 32px 32px',
        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 0%, black 40%, transparent 100%)',
      }}
    />
  );
}
