/**
 * NetworkField — connected blue-dot particle network with hyperspace warp.
 *
 * At rest:   slow-moving #00D4FF nodes connected by proximity lines.
 *
 * On scroll: scroll velocity is tracked via a scroll event listener
 *            (not MotionValue polling, so it fires reliably).
 *            Each node accumulates a trail of past positions — the trail
 *            length is proportional to scroll speed. Nodes also receive a
 *            centrifugal nudge (away from the viewport centre), making them
 *            stream outward like classic Star-Wars hyperspace streaks.
 *            Connection lines fade out during warp.
 *
 * When scroll stops: trails drain gradually and centrifugal bias is removed
 *                    as velocities ease back to their original base values.
 */
import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

const NODE_COUNT    = 85;
const CONNECT_DIST  = 130;   // px — max connection-line distance
const MAX_WARP_MULT = 14;    // top speed multiplier at full warp
const TRAIL_MAX     = 38;    // max trail history points per node

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  bvx: number; bvy: number;  // base velocity — restored after warp
  size: number;
  trail: { x: number; y: number }[];
}

function makeNode(w: number, h: number): Node {
  const speed = Math.random() * 0.35 + 0.08;
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx, vy,
    bvx: vx, bvy: vy,
    size: Math.random() * 1.8 + 0.8,
    trail: [],
  };
}

interface NetworkFieldProps {
  scrollY?: MotionValue<number>;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export function StarField({ mouseX, mouseY }: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let nodes: Node[] = [];
    let warpFactor  = 0;
    let scrollVel   = 0;
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();

    // Use a scroll event listener (not MotionValue polling) so velocity
    // is sampled precisely at the moment each scroll event fires.
    const onScroll = () => {
      const now = performance.now();
      const dt  = Math.max(1, now - lastScrollT);         // ms since last event
      const dy  = Math.abs(window.scrollY - lastScrollY); // px scrolled
      // Normalise: ~0.25 px/ms ≈ comfortable scroll speed → target ≈ 1.0
      scrollVel   = Math.min((dy / dt) * 4.5, 1);
      lastScrollY = window.scrollY;
      lastScrollT = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = Array.from({ length: NODE_COUNT }, () =>
        makeNode(canvas.width, canvas.height)
      );
    };

    const frame = () => {
      const w  = canvas.width;
      const h  = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Parallax offset from mouse (spring-smoothed upstream)
      const mx = (mouseX?.get() ?? 0) * 0.14;
      const my = (mouseY?.get() ?? 0) * 0.14;

      // Decay scroll velocity per-frame so it fades out ~400 ms after scroll stops
      scrollVel  *= 0.88;
      warpFactor += (scrollVel - warpFactor) * 0.14;

      // ── Background clear (motion-blur layer) ──────────────────
      // Lower alpha = slower clearing = longer visible trails
      const clearAlpha = 0.16 + warpFactor * 0.09;
      ctx.fillStyle = `rgba(10,10,10,${clearAlpha})`;
      ctx.fillRect(0, 0, w, h);

      const speedMult = 1 + warpFactor * MAX_WARP_MULT;

      // ── Connection lines (fade during warp) ───────────────────
      const lineAlpha = Math.max(0, 1 - warpFactor * 2.5);
      if (lineAlpha > 0.01) {
        ctx.lineWidth = 0.8;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx   = nodes[i].x - nodes[j].x;
            const dy   = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
              const a = (1 - dist / CONNECT_DIST) * 0.20 * lineAlpha;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x + mx, nodes[i].y + my);
              ctx.lineTo(nodes[j].x + mx, nodes[j].y + my);
              ctx.strokeStyle = `rgba(0,212,255,${a})`;
              ctx.stroke();
            }
          }
        }
      }

      // ── Nodes + trails ────────────────────────────────────────
      for (const node of nodes) {
        const warping = warpFactor > 0.05;

        if (warping) {
          // Store position BEFORE moving (trail = path the node just came from)
          node.trail.push({ x: node.x, y: node.y });
          const maxLen = Math.max(2, Math.floor(warpFactor * TRAIL_MAX));
          while (node.trail.length > maxLen) node.trail.shift();

          // Centrifugal bias — push nodes away from the viewport centre,
          // simulating the viewer accelerating forward through the field.
          const ddx  = node.x - cx;
          const ddy  = node.y - cy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          node.vx += (ddx / dist) * warpFactor * 0.014;
          node.vy += (ddy / dist) * warpFactor * 0.014;
          // Clamp speed to prevent runaway
          const spd = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (spd > 2.0) { node.vx = (node.vx / spd) * 2.0; node.vy = (node.vy / spd) * 2.0; }
        } else {
          // Drain trail gradually (one point per frame) and ease back to base velocity
          if (node.trail.length > 0) node.trail.shift();
          node.vx += (node.bvx - node.vx) * 0.025;
          node.vy += (node.bvy - node.vy) * 0.025;
          // Gentle center pull — draws edge-drifted particles back into view
          // after warp. Proportional to distance so far particles drift faster.
          // At 600 px from center: ~0.12 px/frame² — visibly back within ~2 s.
          node.vx += (cx - node.x) * 0.0002;
          node.vy += (cy - node.y) * 0.0002;
        }

        // Move node
        node.x += node.vx * speedMult;
        node.y += node.vy * speedMult;
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;

        const nx = node.x + mx;
        const ny = node.y + my;

        // ── Warp streak (trail) ────────────────────────────────
        if (node.trail.length > 1) {
          const first = node.trail[0];
          // Linear gradient: transparent at the tail, opaque at the head
          const grad = ctx.createLinearGradient(
            first.x + mx, first.y + my, nx, ny
          );
          const headAlpha = Math.min(warpFactor * 0.65, 0.6);
          grad.addColorStop(0, 'rgba(0,229,255,0)');
          grad.addColorStop(1, `rgba(0,229,255,${headAlpha})`);

          ctx.beginPath();
          ctx.moveTo(first.x + mx, first.y + my);
          for (let t = 1; t < node.trail.length; t++) {
            ctx.lineTo(node.trail[t].x + mx, node.trail[t].y + my);
          }
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = node.size * 0.8;
          ctx.stroke();
        }

        // ── Node dot ──────────────────────────────────────────
        const dotAlpha = 0.30 + warpFactor * 0.50;
        const dotSize  = node.size * (1 + warpFactor * 0.5);
        ctx.beginPath();
        ctx.arc(nx, ny, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${dotAlpha})`;
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
      window.removeEventListener('scroll', onScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
}
