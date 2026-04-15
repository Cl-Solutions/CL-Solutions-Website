import { useEffect, useRef } from 'react';

type CursorState = 'default' | 'button' | 'card';

const STATE_SIZE: Record<CursorState, number> = { default: 32, button: 48, card: 64 };
const STATE_FILL: Record<CursorState, number> = { default: 0, button: 0.2, card: 0.15 };

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const rafRef  = useRef<number>();

  // All animation state lives in refs — zero React re-renders
  const mouse    = useRef({ x: -200, y: -200 });
  const ringPos  = useRef({ x: -200, y: -200 });
  const ringSize = useRef(32);
  const ringFill = useRef(0);
  const arrowOp  = useRef(0);
  const visible  = useRef(false);
  const curState = useRef<CursorState>('default');

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const arrow = arrowRef.current;
    if (!dot || !ring) return;

    const setVisible = (v: boolean) => {
      if (visible.current === v) return;
      visible.current = v;
      const o = v ? '1' : '0';
      dot.style.opacity  = o;
      ring.style.opacity = o;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('[data-cursor-card]')) {
        curState.current = 'card';
      } else if (target.closest('button, a, [role="button"]')) {
        curState.current = 'button';
      } else {
        curState.current = 'default';
      }
    };

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);

      const s  = lerp(ringSize.current, STATE_SIZE[curState.current], 0.15);
      const f  = lerp(ringFill.current, STATE_FILL[curState.current], 0.10);
      const ao = lerp(arrowOp.current,  curState.current === 'card' ? 1 : 0, 0.10);

      ringSize.current = s;
      ringFill.current = f;
      arrowOp.current  = ao;

      ring.style.transform       = `translate(${ringPos.current.x - s / 2}px, ${ringPos.current.y - s / 2}px)`;
      ring.style.width           = `${s}px`;
      ring.style.height          = `${s}px`;
      ring.style.backgroundColor = `rgba(0,229,255,${f})`;
      if (arrow) arrow.style.opacity = String(ao);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.body.addEventListener('mouseleave', () => setVisible(false));
    document.body.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      {/* Sharp dot — immediate */}
      <div
        ref={dotRef}
        className="hidden lg:block"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          backgroundColor: '#00E5FF',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Hollow ring — lagged */}
      <div
        ref={ringRef}
        className="hidden lg:flex items-center justify-center"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '32px', height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,229,255,0.4)',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform, width, height',
        }}
      >
        <span
          ref={arrowRef}
          style={{
            color: '#00E5FF',
            fontSize: '14px',
            opacity: 0,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          →
        </span>
      </div>
    </>
  );
}
