/**
 * Animated inline flow visualisations for the showcase gallery.
 * Rendered right-aligned in the card header row (no wrapper box).
 * Each SVG uses viewBox="0 0 282 96" — scales to whatever container width
 * is applied from the outside (w-48 sm:w-56 is the recommended sizing).
 */
import { motion } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C   = '#00D4FF';                      // cyan accent
const CD  = 'rgba(0,212,255,0.30)';         // connector line
const NB  = 'rgba(0,0,0,0.50)';            // node fill
const NS  = 'rgba(255,255,255,0.14)';       // node stroke (dim)
const NA  = 'rgba(0,212,255,0.42)';         // node stroke (active/glow)
const LD  = 'rgba(255,255,255,0.72)';       // label (dim nodes)
const LA  = C;                              // label (active node)
const F   = 'Inter, sans-serif';

// ─── Layout (shared by all 6 flows) ──────────────────────────────────────────
// viewBox 282 × 96
// N1: x=4,   y=22, w=68, h=34   cx=38,  right=72
// N2: x=110, y=22, w=76, h=34   cx=148, right=186
// N3: x=222, y=22, w=56, h=34   cx=250, right=278
// Arrow1: 74 → 108   Arrow2: 188 → 220
// Shared centre-y: 39
const VW = 282, VH = 96;
const CY = 39;

const N1 = { x: 4,   y: 22, w: 68, h: 34 };
const N2 = { x: 110, y: 22, w: 76, h: 34 };
const N3 = { x: 222, y: 22, w: 56, h: 34 };

// ─── Shared SVG primitives ────────────────────────────────────────────────────

function Node({ x, y, w, h, label, sub, glow = false }: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; glow?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      {glow && (
        <motion.rect
          x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={9}
          fill="none" stroke={C} strokeWidth={1.2}
          animate={{ opacity: [0.12, 0.50, 0.12] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={5}
        fill={NB} stroke={glow ? NA : NS} strokeWidth={1.2} />
      <text
        x={cx} y={cy + (sub ? -3 : 4.5)}
        textAnchor="middle"
        fill={glow ? LA : LD}
        fontSize={10.5} fontFamily={F}
        fontWeight={glow ? '700' : '500'}
      >{label}</text>
      {sub && (
        <text x={cx} y={cy + 9.5} textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize={8} fontFamily={F}
        >{sub}</text>
      )}
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={CD} strokeWidth={2} />
      <polygon
        points={`${x2},${y} ${x2 - 7},${y - 3.5} ${x2 - 7},${y + 3.5}`}
        fill={CD}
      />
    </g>
  );
}

function Pulse({
  x1, x2, y = CY, duration = 1.1, delay = 0,
  color = C, r = 4,
}: {
  x1: number; x2: number; y?: number;
  duration?: number; delay?: number; color?: string; r?: number;
}) {
  return (
    <motion.circle
      r={r} cy={y} fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      initial={{ cx: x1 }}
      animate={{ cx: [x1, x2] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 0.5, ease: 'linear' }}
    />
  );
}

function CheckBadge({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.text
      x={x} y={y} textAnchor="middle"
      fill="#34d399" fontSize={11} fontFamily={F} fontWeight="700"
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
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="CRM" />
      <Node {...N2} label="Automation" glow />
      <Node {...N3} label="Finanzen" />
      <Pulse x1={74} x2={106} duration={1.0} delay={0} />
      <Pulse x1={188} x2={218} duration={1.0} delay={1.05} />
    </svg>
  );
}

// ─── Flow 1 — KI-Kommunikation ────────────────────────────────────────────────
function Flow1() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      {/* Expanding rings out of left node */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i} cx={38} cy={CY} fill="none"
          stroke={C} strokeWidth={1.2}
          initial={{ r: 6, opacity: 0.5 }}
          animate={{ r: [6, 22], opacity: [0.55, 0] }}
          transition={{ duration: 1.6, delay: i * 0.52, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="Eingehend" sub="Anruf" />
      <Node {...N2} label="KI-Agent" glow />
      <Node {...N3} label="Termin" sub="gebucht" />
      <Pulse x1={74} x2={106} duration={1.1} delay={0.3} />
      <Pulse x1={188} x2={218} duration={1.1} delay={1.4} />
      <CheckBadge x={N3.x + N3.w / 2} y={N3.y - 5} delay={1.6} />
    </svg>
  );
}

// ─── Flow 2 — System-Integration ─────────────────────────────────────────────
function Flow2() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="Shop" />
      <Node {...N2} label="Lager" glow />
      <Node {...N3} label="Versand" />
      {/* Two staggered order pulses */}
      <Pulse x1={74} x2={106} duration={1.0} delay={0}   r={4.5} />
      <Pulse x1={74} x2={106} duration={1.0} delay={0.45} color="rgba(0,212,255,0.55)" r={3} />
      <Pulse x1={188} x2={218} duration={1.0} delay={1.1} />
      <CheckBadge x={N3.x + N3.w / 2} y={N3.y - 5} delay={1.3} />
    </svg>
  );
}

// ─── Flow 3 — Dokumenten-KI ───────────────────────────────────────────────────
function Flow3() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="PDF" sub="eingehend" />
      <Node {...N2} label="KI-Analyse" glow />
      <Node {...N3} label="Daten" sub="strukturiert" />
      {/* Three staggered pulses = extracted text lines */}
      <Pulse x1={74} x2={106} duration={0.9} delay={0}    r={3.5} />
      <Pulse x1={74} x2={106} duration={0.9} delay={0.32} r={3.5} color="rgba(0,212,255,0.6)" />
      <Pulse x1={74} x2={106} duration={0.9} delay={0.64} r={3.5} color="rgba(0,212,255,0.3)" />
      <Pulse x1={188} x2={218} duration={1.0} delay={1.1} />
      {/* Data rows growing on output node */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={N3.x + 6} y={N3.y + 5 + i * 8}
          height={4} rx={2}
          fill={i === 0 ? C : i === 1 ? 'rgba(0,212,255,0.55)' : 'rgba(0,212,255,0.28)'}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: [0, N3.w - 12], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: 0.4, delay: 1.45 + i * 0.16,
            repeat: Infinity, repeatDelay: 1.9, times: [0, 0.4, 0.85, 1],
          }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 4 — Lead-Qualifizierung ─────────────────────────────────────────────
function Flow4() {
  const leads = [
    { y: CY - 8, color: 'rgba(255,255,255,0.22)', delay: 0,    pass: false },
    { y: CY,     color: C,                         delay: 0.28, pass: true  },
    { y: CY + 8, color: 'rgba(255,255,255,0.22)', delay: 0.56, pass: false },
    { y: CY - 4, color: C,                         delay: 0.84, pass: true  },
    { y: CY + 4, color: 'rgba(255,255,255,0.18)', delay: 1.12, pass: false },
  ];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="Leads" sub="eingehend" />
      <Node {...N2} label="KI-Filter" glow />
      <Node {...N3} label="Sales" sub="qualifiziert" />
      {/* All leads approach filter */}
      {leads.map((l, i) => (
        <motion.circle
          key={`in-${i}`} r={3} cy={l.y} fill={l.color}
          initial={{ cx: 74 }} animate={{ cx: [74, 108] }}
          transition={{ duration: 1.0, delay: l.delay, repeat: Infinity, repeatDelay: 1.3, ease: 'linear' }}
        />
      ))}
      {/* Only qualified (cyan) leads exit */}
      {leads.filter(l => l.pass).map((l, i) => (
        <motion.circle
          key={`out-${i}`} r={4} cy={CY} fill={C}
          style={{ filter: `drop-shadow(0 0 4px ${C})` }}
          initial={{ cx: 188 }} animate={{ cx: [188, 218] }}
          transition={{ duration: 0.95, delay: l.delay + 1.15, repeat: Infinity, repeatDelay: 2.1, ease: 'linear' }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 5 — KI-Website ──────────────────────────────────────────────────────
function Flow5() {
  const chatCX = N2.x + N2.w / 2; // 148
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full">
      <Arrow x1={74} x2={108} y={CY} />
      <Arrow x1={188} x2={220} y={CY} />
      <Node {...N1} label="Besucher" sub="Website" />
      <Node {...N2} label="Chatbot" glow />
      <Node {...N3} label="CRM" sub="erfasst" />
      {/* Typing indicator dots inside chatbot node */}
      {[-9, 0, 9].map((offset, i) => (
        <motion.circle
          key={i} r={2.8} cx={chatCX + offset}
          fill="rgba(255,255,255,0.50)"
          initial={{ cy: CY + 2 }}
          animate={{ cy: [CY + 2, CY - 4, CY + 2] }}
          transition={{ duration: 0.68, delay: i * 0.19, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <Pulse x1={74} x2={106} duration={1.1} delay={0.5} />
      <Pulse x1={188} x2={218} duration={1.1} delay={1.6} />
      {/* "Lead erfasst ✓" fades onto right node */}
      <motion.text
        x={N3.x + N3.w / 2} y={N3.y - 5}
        textAnchor="middle" fill="#34d399" fontSize={7.5} fontFamily={F} fontWeight="600"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.0, delay: 1.8, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.2, 0.75, 1] }}
      >Lead ✓</motion.text>
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
const FLOWS = [Flow0, Flow1, Flow2, Flow3, Flow4, Flow5];

/** Drop into a sized container; recommended: className="w-48 sm:w-56" */
export function ShowcaseFlow({ index, className = '' }: { index: number; className?: string }) {
  const Flow = FLOWS[index] ?? FLOWS[0];
  return <Flow />;
}
