import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

const NUM_STARS = 360;
const DEPTH     = 1000;
const FOCAL     = 420;

interface Star {
  x: number;
  y: number;
  z: number;
}

function makeStar(w: number, h: number, zOverride?: number): Star {
  return {
    x: (Math.random() - 0.5) * w * 3.0,
    y: (Math.random() - 0.5) * h * 3.0,
    z: zOverride ?? Math.random() * DEPTH,
  };
}

interface StarFieldProps {
  scrollY: MotionValue<number>;
  mouseX?: MotionValue<number>; // optional: ±value in px, for parallax
  mouseY?: MotionValue<number>;
}

export function StarField({ scrollY, mouseX, mouseY }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];
    let prevScrollY = 0;
    let speed      = 1.8;
    let targetSpeed = 1.8;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: NUM_STARS }, () =>
        makeStar(canvas.width, canvas.height)
      );
    };

    const frame = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Mouse parallax: shift the projection center slightly
      const mx = (mouseX?.get() ?? 0) * 0.4; // ±24px max
      const my = (mouseY?.get() ?? 0) * 0.4;
      const cx = w / 2 + mx;
      const cy = h / 2 + my;

      const sy    = scrollY.get();
      const delta = Math.abs(sy - prevScrollY);
      prevScrollY = sy;

      targetSpeed = 1.8 + delta * 1.5;
      speed += (targetSpeed - speed) * 0.1;
      speed  = Math.min(speed, 45);

      // Motion-blur trail — partial clear each frame
      ctx.fillStyle = 'rgba(10,10,10,0.26)';
      ctx.fillRect(0, 0, w, h);

      for (const star of stars) {
        const ppx = (star.x / star.z) * FOCAL + cx;
        const ppy = (star.y / star.z) * FOCAL + cy;

        star.z -= speed;

        if (star.z <= 1) {
          const ns = makeStar(w, h, DEPTH);
          star.x = ns.x;
          star.y = ns.y;
          star.z = DEPTH;
          continue;
        }

        const px = (star.x / star.z) * FOCAL + cx;
        const py = (star.y / star.z) * FOCAL + cy;
        const t  = 1 - star.z / DEPTH;
        const size    = Math.max(0.15, t * 3.4);
        const opacity = t * 0.90;

        // Streak line when warping
        if (speed > 4 && star.z < DEPTH * 0.92) {
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgba(160,230,255,${opacity * 0.5})`;
          ctx.lineWidth   = size * 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,242,255,${opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [scrollY, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
}
