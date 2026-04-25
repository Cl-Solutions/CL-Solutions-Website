/**
 * Animated inline flow visualisations for the showcase gallery.
 * SVG fills whatever flex-1 space is available after emoji + badge.
 * viewBox="0 0 460 88" keeps aspect ratio ~5.2:1 so height stays ~85-95px
 * on typical desktop card widths (≈ 450-500px available after badge).
 */
import { motion } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C  = '#00D4FF';
const CD = 'rgba(0,212,255,0.32)';
const NB = 'rgba(0,0,0,0.50)';
const NS = 'rgba(255,255,255,0.14)';
const NA = 'rgba(0,212,255,0.42)';
const LD = 'rgba(255,255,255,0.78)';
const LA = C;
const F  = 'Inter, sans-serif';

// ─── Layout ───────────────────────────────────────────────────────────────────
// viewBox 460 × 88
// N1: x=8,   y=20, w=88,  h=36   cx=52,  right=96
// N2: x=178, y=20, w=104, h=36   cx=230, right=282
// N3: x=364, y=20, w=88,  h=36   cx=408, right=452
// Arrow1: 98 → 176  (78 px — long visible travel)
// Arrow2: 284 → 362 (78 px)
// Centre-y: 38
const VW = 460, VH = 88;
const CY = 38;
const N1 = { x: 8,   y: 20, w: 88,  h: 36 };
const N2 = { x: 178, y: 20, w: 104, h: 36 };
const N3 = { x: 364, y: 20, w: 88,  h: 36 };
const A1 = { x1: 98,  x2: 176 };
const A2 = { x1: 284, x2: 362 };

// ─── Primitives ───────────────────────────────────────────────────────────────

function Node({ x, y, w, h, label, sub, glow = false }: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; glow?: boolean;
}) {
  const cx = x + w / 2, cy = y + h / 2;
  return (
    <g>
      {glow && (
        <motion.rect
          x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={9}
          fill="none" stroke={C} strokeWidth={1.2}
          animate={{ opacity: [0.12, 0.52, 0.12] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={5}
        fill={NB} stroke={glow ? NA : NS} strokeWidth={1.2} />
      <text
        x={cx} y={cy + (sub ? -3.5 : 4.5)}
        textAnchor="middle"
        fill={glow ? LA : LD}
        fontSize={11} fontFamily={F}
        fontWeight={glow ? '700' : '500'}
      >{label}</text>
      {sub && (
        <text x={cx} y={cy + 9.5} textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily={F}
        >{sub}</text>
      )}
    </g>
  );
}

function Arrow({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <g>
      <line x1={x1} y1={CY} x2={x2} y2={CY} stroke={CD} strokeWidth={2} />
      <polygon points={`${x2},${CY} ${x2 - 7},${CY - 3.5} ${x2 - 7},${CY + 3.5}`} fill={CD} />
    </g>
  );
}

function Pulse({ x1, x2, duration = 1.2, delay = 0, color = C, r = 4.5 }: {
  x1: number; x2: number;
  duration?: number; delay?: number; color?: string; r?: number;
}) {
  return (
    <motion.circle
      r={r} cy={CY} fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }}
      initial={{ cx: x1 }}
      animate={{ cx: [x1, x2] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 0.5, ease: 'linear' }}
    />
  );
}

function Check({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.text x={x} y={y} textAnchor="middle"
      fill="#34d399" fontSize={12} fontFamily={F} fontWeight="700"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 0.4, times: [0, 0.2, 0.75, 1] }}
    >✓</motion.text>
  );
}

// ─── Flow 0 — Prozessautomatisierung ─────────────────────────────────────────
function Flow0() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      <Node {...N1} label="CRM" />
      <Node {...N2} label="Automation" glow />
      <Node {...N3} label="Finanzen" />
      <Pulse {...A1} duration={1.1} delay={0} />
      <Pulse {...A2} duration={1.1} delay={1.15} />
    </svg>
  );
}

// ─── Flow 1 — KI-Kommunikation ────────────────────────────────────────────────
// Rings rendered BEFORE the node rect so the node covers their interior.
// Text (painted last) sits cleanly on top — rings only show outside the box.
function Flow1() {
  const n1cx = N1.x + N1.w / 2; // 52
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      {/* Rings behind the node */}
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx={n1cx} cy={CY} fill="none"
          stroke={C} strokeWidth={1.2}
          initial={{ r: 7, opacity: 0.55 }}
          animate={{ r: [7, 26], opacity: [0.55, 0] }}
          transition={{ duration: 1.6, delay: i * 0.52, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      {/* Nodes on top */}
      <Node {...N1} label="Eingehend" sub="Anruf" />
      <Node {...N2} label="KI-Agent" glow />
      <Node {...N3} label="Termin" sub="gebucht" />
      <Pulse {...A1} duration={1.2} delay={0.3} />
      <Pulse {...A2} duration={1.2} delay={1.5} />
      <Check x={N3.x + N3.w / 2} y={N3.y - 5} delay={1.7} />
    </svg>
  );
}

// ─── Flow 2 — System-Integration ─────────────────────────────────────────────
function Flow2() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      <Node {...N1} label="Shop" />
      <Node {...N2} label="Lager" glow />
      <Node {...N3} label="Versand" />
      <Pulse {...A1} duration={1.1} delay={0}    r={5} />
      <Pulse {...A1} duration={1.1} delay={0.48} color="rgba(0,212,255,0.55)" r={3.5} />
      <Pulse {...A2} duration={1.1} delay={1.2} />
      <Check x={N3.x + N3.w / 2} y={N3.y - 5} delay={1.4} />
    </svg>
  );
}

// ─── Flow 3 — Dokumenten-KI ───────────────────────────────────────────────────
function Flow3() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      <Node {...N1} label="PDF" sub="eingehend" />
      <Node {...N2} label="KI-Analyse" glow />
      <Node {...N3} label="Daten" sub="strukturiert" />
      <Pulse {...A1} duration={1.0} delay={0}    r={4} />
      <Pulse {...A1} duration={1.0} delay={0.34} color="rgba(0,212,255,0.60)" r={4} />
      <Pulse {...A1} duration={1.0} delay={0.68} color="rgba(0,212,255,0.32)" r={4} />
      <Pulse {...A2} duration={1.1} delay={1.2} />
      {[0, 1, 2].map((i) => (
        <motion.rect key={i}
          x={N3.x + 8} y={N3.y + 6 + i * 8} height={4} rx={2}
          fill={i === 0 ? C : i === 1 ? 'rgba(0,212,255,0.55)' : 'rgba(0,212,255,0.28)'}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: [0, N3.w - 16], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.16, repeat: Infinity, repeatDelay: 2.0, times: [0, 0.4, 0.85, 1] }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 4 — Lead-Qualifizierung ─────────────────────────────────────────────
function Flow4() {
  const leads = [
    { y: CY - 9, color: 'rgba(255,255,255,0.22)', delay: 0,    pass: false },
    { y: CY,     color: C,                         delay: 0.28, pass: true  },
    { y: CY + 9, color: 'rgba(255,255,255,0.22)', delay: 0.56, pass: false },
    { y: CY - 4, color: C,                         delay: 0.84, pass: true  },
    { y: CY + 4, color: 'rgba(255,255,255,0.18)', delay: 1.12, pass: false },
  ];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      <Node {...N1} label="Leads" sub="eingehend" />
      <Node {...N2} label="KI-Filter" glow />
      <Node {...N3} label="Sales" sub="qualifiziert" />
      {leads.map((l, i) => (
        <motion.circle key={`in-${i}`} r={3} cy={l.y} fill={l.color}
          initial={{ cx: A1.x1 }} animate={{ cx: [A1.x1, A1.x2] }}
          transition={{ duration: 1.1, delay: l.delay, repeat: Infinity, repeatDelay: 1.2, ease: 'linear' }}
        />
      ))}
      {leads.filter(l => l.pass).map((l, i) => (
        <motion.circle key={`out-${i}`} r={4.5} cy={CY} fill={C}
          style={{ filter: `drop-shadow(0 0 5px ${C})` }}
          initial={{ cx: A2.x1 }} animate={{ cx: [A2.x1, A2.x2] }}
          transition={{ duration: 1.0, delay: l.delay + 1.2, repeat: Infinity, repeatDelay: 2.1, ease: 'linear' }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 5 — KI-Website ──────────────────────────────────────────────────────
// Chatbot node rendered manually: label at top, typing dots in lower half.
function Flow5() {
  const chatCX = N2.x + N2.w / 2;           // 230
  const dotsY  = N2.y + N2.h - 10;          // 46 — lower portion of node
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow {...A1} /><Arrow {...A2} />
      <Node {...N1} label="Besucher" sub="Website" />

      {/* Chatbot node — manual so label + dots don't overlap */}
      <g>
        <motion.rect
          x={N2.x - 4} y={N2.y - 4} width={N2.w + 8} height={N2.h + 8} rx={9}
          fill="none" stroke={C} strokeWidth={1.2}
          animate={{ opacity: [0.12, 0.52, 0.12] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x={N2.x} y={N2.y} width={N2.w} height={N2.h} rx={5}
          fill={NB} stroke={NA} strokeWidth={1.2} />
        {/* Label pinned near top of node */}
        <text x={chatCX} y={N2.y + 15}
          textAnchor="middle" fill={LA}
          fontSize={11} fontFamily={F} fontWeight="700"
        >Chatbot</text>
      </g>

      {/* Typing dots bounce in lower half — well below the label */}
      {[-10, 0, 10].map((offset, i) => (
        <motion.circle key={i} r={3} cx={chatCX + offset}
          fill="rgba(255,255,255,0.52)"
          initial={{ cy: dotsY }}
          animate={{ cy: [dotsY, dotsY - 6, dotsY] }}
          transition={{ duration: 0.68, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <Node {...N3} label="CRM" sub="erfasst" />
      <Pulse {...A1} duration={1.2} delay={0.5} />
      <Pulse {...A2} duration={1.2} delay={1.7} />
      <motion.text x={N3.x + N3.w / 2} y={N3.y - 5}
        textAnchor="middle" fill="#34d399" fontSize={8} fontFamily={F} fontWeight="600"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.0, delay: 1.9, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.2, 0.75, 1] }}
      >Lead ✓</motion.text>
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
const FLOWS = [Flow0, Flow1, Flow2, Flow3, Flow4, Flow5];

export function ShowcaseFlow({ index }: { index: number }) {
  const Flow = FLOWS[index] ?? FLOWS[0];
  return <Flow />;
}
