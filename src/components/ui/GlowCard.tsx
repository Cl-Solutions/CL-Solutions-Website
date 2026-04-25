/**
 * Glass card with a moving-gradient border that orbits on hover.
 * Uses a CSS custom property trick — no canvas, pure CSS + Framer Motion.
 */
import { useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowCard({ children, className, intensity = 'medium' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const glowOpacity = { low: 0.06, medium: 0.11, high: 0.18 }[intensity];
  const borderOpacity = { low: 0.12, medium: 0.2, high: 0.3 }[intensity];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--glow-x', `${x}%`);
    card.style.setProperty('--glow-y', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '50%');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': String(glowOpacity),
        '--border-opacity': String(borderOpacity),
        background: `
          radial-gradient(
            circle at var(--glow-x) var(--glow-y),
            rgba(0,212,255,var(--glow-opacity)) 0%,
            rgba(10,10,10,0.95) 60%
          )
        `,
        border: `1px solid rgba(0,212,255,var(--border-opacity))`,
        backdropFilter: 'blur(12px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
        transition: 'background 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      } as React.CSSProperties}
      className={cn(
        'relative rounded-2xl',
        'hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
