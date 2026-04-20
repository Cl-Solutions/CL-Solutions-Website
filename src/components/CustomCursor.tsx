import { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mouse  = useRef({ x: -200, y: -200 });
  const visible = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window) return;
    const dot = dotRef.current;
    if (!dot) return;

    const setVisible = (v: boolean) => {
      if (visible.current === v) return;
      visible.current = v;
      dot.style.opacity = v ? '1' : '0';
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      setVisible(true);
    };

    // Keep RAF loop alive so future enhancements can plug in easily
    const tick = () => { rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', () => setVisible(false));
    document.body.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
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
  );
}
