/**
 * Animated mini-flow visualisations for the showcase gallery.
 * One SVG per card (index 0–5) — loops continuously.
 * Framer Motion animates SVG attributes directly (cx, width, opacity, r).
 */
import { motion } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C  = '#00D4FF';                      // cyan accent
const CD = 'rgba(0,212,255,0.20)';         // connector line colour
const NB = 'rgba(0,0,0,0.42)';            // node background
const NS = 'rgba(255,255,255,0.10)';       // node border dim
const NA = 'rgba(0,212,255,0.35)';         // node border active/glow
const LD = 'rgba(255,255,255,0.58)';       // label colour dim
const LA = C;                              // label colour active
const F  = 'Inter, sans-serif';
const VW = 460;                            // viewBox width (all flows share this)
const VH = 80;                             // viewBox height

// ─── Layout constants (consistent across all flows) ───────────────────────────
// Node 1: x=8,  w=84  → right edge 92,  centre 50
// Arrow1: 94 → 170 (76 px gap)
// Node 2: x=172, w=104 → right edge 276, centre 224
// Arrow2: 278 → 356 (78 px gap)
// Node 3: x=358, w=90  → right edge 448, centre 403
// All nodes: y=26, h=28 → centre y=40

const N1 = { x: 8,   y: 26, w: 84,  h: 28 };
const N2 = { x: 172, y: 26, w: 104, h: 28 };
const N3 = { x: 358, y: 26, w: 90,  h: 28 };
const CY = 40; // centre y for all connections

// ─── Shared primitives ────────────────────────────────────────────────────────

function SvgNode({ x, y, w, h, label, sub, glow = false }: {
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
          fill="none" stroke={C} strokeWidth={1}
          animate={{ opacity: [0.10, 0.45, 0.10] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={5}
        fill={NB} stroke={glow ? NA : NS} strokeWidth={1} />
      <text
        x={cx} y={cy + (sub ? -3 : 4.5)}
        textAnchor="middle"
        fill={glow ? LA : LD}
        fontSize={9} fontFamily={F}
        fontWeight={glow ? '600' : '400'}
      >{label}</text>
      {sub && (
        <text x={cx} y={cy + 9.5} textAnchor="middle"
          fill="rgba(255,255,255,0.28)" fontSize={7.5} fontFamily={F}
        >{sub}</text>
      )}
    </g>
  );
}

function SvgArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={CD} strokeWidth={1.5} />
      <polygon
        points={`${x2},${y} ${x2 - 7},${y - 3.5} ${x2 - 7},${y + 3.5}`}
        fill="rgba(0,212,255,0.38)"
      />
    </g>
  );
}

/** A single dot that travels from x1→x2 along cy, then repeats */
function Pulse({ x1, x2, y = CY, duration = 1.1, delay = 0, color = C, r = 3 }: {
  x1: number; x2: number; y?: number;
  duration?: number; delay?: number; color?: string; r?: number;
}) {
  return (
    <motion.circle
      r={r} cy={y}
      initial={{ cx: x1 }}
      animate={{ cx: [x1, x2] }}
      style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      fill={color}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.55,
        ease: 'linear',
      }}
    />
  );
}

/** Fade-in check mark at (x, y) */
function Check({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.text
      x={x} y={y} textAnchor="middle"
      fill="#34d399" fontSize={11} fontFamily={F}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.8, delay,
        repeat: Infinity, repeatDelay: 0.4,
        times: [0, 0.2, 0.75, 1],
      }}
    >✓</motion.text>
  );
}

// ─── Flow 0 — Prozessautomatisierung ─────────────────────────────────────────
// [CRM] ──●──▶ [Automation] ──●──▶ [Buchhaltung]
function Flow0() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="CRM" />
      <SvgNode {...N2} label="Automation" glow />
      <SvgNode {...N3} label="Buchhaltung" />
      <Pulse x1={94} x2={168} duration={1.0} delay={0} />
      <Pulse x1={278} x2={354} duration={1.0} delay={1.05} />
    </svg>
  );
}

// ─── Flow 1 — KI-Kommunikation ────────────────────────────────────────────────
// [Eingehend] ──●──▶ [KI-Agent] ──●──▶ [Termin ✓]
// Pulse rings emanate from the left node; ✓ badge fades in on right.
function Flow1() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      {/* Expanding rings from Eingehend node (centre ~50, 40) */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i} cx={50} cy={CY} fill="none"
          stroke={C} strokeWidth={1}
          initial={{ r: 6, opacity: 0.5 }}
          animate={{ r: [6, 22], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, delay: i * 0.53, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="Eingehend" sub="Anruf" />
      <SvgNode {...N2} label="KI-Agent" glow />
      <SvgNode {...N3} label="Termin" sub="gebucht" />
      <Pulse x1={94}  x2={168} duration={1.1} delay={0.3} />
      <Pulse x1={278} x2={354} duration={1.1} delay={1.4} />
      <Check x={N3.x + N3.w / 2} y={N3.y - 4} delay={1.6} />
    </svg>
  );
}

// ─── Flow 2 — System-Integration ─────────────────────────────────────────────
// [Shop] ══●══▶ [Lager] ──●──▶ [Versand ✓]
// Two staggered package pulses on the first segment; check on Versand.
function Flow2() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="Shop" />
      <SvgNode {...N2} label="Lager" glow />
      <SvgNode {...N3} label="Versand" sub="automatisch" />
      {/* Two pulses representing order + stock */}
      <Pulse x1={94}  x2={168} duration={1.0} delay={0}   r={3.5} />
      <Pulse x1={94}  x2={168} duration={1.0} delay={0.45} color="rgba(0,212,255,0.5)" r={2.5} />
      <Pulse x1={278} x2={354} duration={1.0} delay={1.15} />
      <Check x={N3.x + N3.w / 2} y={N3.y - 4} delay={1.3} />
    </svg>
  );
}

// ─── Flow 3 — Dokumenten-KI ───────────────────────────────────────────────────
// [PDF] ──●──▶ [KI-Analyse] ──●──▶ [Strukturiert]
// Short data-line segments fly from PDF toward KI; result rows grow on right.
function Flow3() {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="PDF" sub="eingehend" />
      <SvgNode {...N2} label="KI-Analyse" glow />
      <SvgNode {...N3} label="Strukturiert" sub="exportiert" />
      {/* Three staggered data pulses (represent extracted text lines) */}
      <Pulse x1={94}  x2={168} duration={0.9} delay={0}    r={2.5} />
      <Pulse x1={94}  x2={168} duration={0.9} delay={0.35} r={2.5} color="rgba(0,212,255,0.55)" />
      <Pulse x1={94}  x2={168} duration={0.9} delay={0.70} r={2.5} color="rgba(0,212,255,0.3)" />
      <Pulse x1={278} x2={354} duration={1.0} delay={1.1} />
      {/* Structured data rows growing on right node */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={N3.x + 8} y={N3.y + 6 + i * 7}
          height={4} rx={2}
          fill={i === 0 ? C : i === 1 ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.25)'}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: [0, N3.w - 16], opacity: [0, 0.85, 0.85, 0] }}
          transition={{
            duration: 0.45,
            delay: 1.4 + i * 0.18,
            repeat: Infinity,
            repeatDelay: 2.0,
            times: [0, 0.4, 0.85, 1],
          }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 4 — Lead-Qualifizierung ─────────────────────────────────────────────
// Many dots (gray + cyan) → [KI-Filter] → only cyan qualified leads exit → [Sales]
function Flow4() {
  const incoming = [
    { y: CY - 8, color: 'rgba(255,255,255,0.25)', delay: 0,    pass: false },
    { y: CY,     color: C,                         delay: 0.28, pass: true  },
    { y: CY + 8, color: 'rgba(255,255,255,0.25)', delay: 0.56, pass: false },
    { y: CY - 4, color: C,                         delay: 0.84, pass: true  },
    { y: CY + 4, color: 'rgba(255,255,255,0.20)', delay: 1.12, pass: false },
  ];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="Leads" sub="eingehend" />
      <SvgNode {...N2} label="KI-Filter" glow />
      <SvgNode {...N3} label="Sales" sub="qualifiziert" />
      {/* All leads approach the filter */}
      {incoming.map((l, i) => (
        <motion.circle
          key={`in-${i}`} r={2.5} cy={l.y} fill={l.color}
          initial={{ cx: 94 }}
          animate={{ cx: [94, 170] }}
          transition={{
            duration: 1.1, delay: l.delay,
            repeat: Infinity, repeatDelay: 1.2, ease: 'linear',
          }}
        />
      ))}
      {/* Only qualified (cyan) leads exit the filter — merged to single line */}
      {incoming.filter(l => l.pass).map((l, i) => (
        <motion.circle
          key={`out-${i}`} r={3} cy={CY} fill={C}
          style={{ filter: `drop-shadow(0 0 3px ${C})` }}
          initial={{ cx: 278 }}
          animate={{ cx: [278, 354] }}
          transition={{
            duration: 1.0,
            delay: l.delay + 1.2,
            repeat: Infinity, repeatDelay: 2.1, ease: 'linear',
          }}
        />
      ))}
    </svg>
  );
}

// ─── Flow 5 — KI-Website ──────────────────────────────────────────────────────
// [Besucher] ──●──▶ [Chatbot ···] ──●──▶ [CRM ✓ Lead erfasst]
// Bouncing typing dots inside the Chatbot node; "Lead erfasst" fades in on CRM.
function Flow5() {
  const chatCX = N2.x + N2.w / 2; // 224
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: VH }}>
      <SvgArrow x1={94} x2={170} y={CY} />
      <SvgArrow x1={278} x2={356} y={CY} />
      <SvgNode {...N1} label="Besucher" sub="Website" />
      <SvgNode {...N2} label="Chatbot" glow />
      <SvgNode {...N3} label="CRM" sub="automatisch" />
      {/* Typing indicator: three bouncing dots inside the chatbot node */}
      {[-10, 0, 10].map((offset, i) => (
        <motion.circle
          key={i} r={2.5} cx={chatCX + offset}
          fill="rgba(255,255,255,0.45)"
          initial={{ cy: CY + 2 }}
          animate={{ cy: [CY + 2, CY - 4, CY + 2] }}
          transition={{
            duration: 0.72,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <Pulse x1={94}  x2={168} duration={1.1} delay={0.5} />
      <Pulse x1={278} x2={354} duration={1.1} delay={1.6} />
      {/* "Lead erfasst" badge fades in on the CRM node */}
      <motion.text
        x={N3.x + N3.w / 2} y={N3.y - 5}
        textAnchor="middle" fill="#34d399" fontSize={7.5} fontFamily={F}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3.0, delay: 1.8,
          repeat: Infinity, repeatDelay: 0.6,
          times: [0, 0.2, 0.75, 1],
        }}
      >Lead erfasst ✓</motion.text>
    </svg>
  );
}

// ─── Wrapper export ───────────────────────────────────────────────────────────
const FLOWS = [Flow0, Flow1, Flow2, Flow3, Flow4, Flow5];

export function ShowcaseFlow({ index }: { index: number }) {
  const Flow = FLOWS[index] ?? FLOWS[0];
  return (
    <div className="rounded-xl bg-black/40 border border-white/[0.07] px-4 pt-3 pb-2.5 mb-6 overflow-hidden">
      <p className="font-inter text-[9px] text-white/22 mb-2 uppercase tracking-widest">
        Ablauf
      </p>
      <Flow />
    </div>
  );
}
