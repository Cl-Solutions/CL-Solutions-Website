/**
 * Aceternity-style Spotlight — radial cyan glow that follows the cursor
 * within its parent. Drop it inside a `relative overflow-hidden` container.
 */
import { useRef, useCallback } from 'react';

interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className = '' }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.parentElement!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,212,255,0.07), transparent 50%)`;
  }, []);

  // Attach to parent on mount
  const attachRef = useCallback((el: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener('mousemove', handleMouseMove);
    return () => parent.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={attachRef}
      className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${className}`}
    />
  );
}
