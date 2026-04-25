/**
 * Primary CTA button with a travelling shimmer highlight.
 */
import { cn } from '../../lib/utils';

interface ShimmerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'a' | 'button';
  onClick?: () => void;
}

export function ShimmerButton({ children, className, as: Tag = 'a', onClick, ...rest }: ShimmerButtonProps) {
  const shared = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden',
    'px-7 py-4 rounded-xl font-inter font-semibold text-base',
    'bg-accent text-dark transition-all duration-300',
    'hover:bg-accent/90 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(0,212,255,0.45)]',
    'active:scale-[0.98]',
    className,
  );

  const shimmer = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer"
      style={{ backgroundSize: '200% 100%' }}
    />
  );

  if (Tag === 'button') {
    return (
      <button className={shared} onClick={onClick}>
        {shimmer}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }

  return (
    <a className={shared} {...rest}>
      {shimmer}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
