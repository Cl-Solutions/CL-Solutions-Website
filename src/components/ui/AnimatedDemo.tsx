/**
 * AnimatedDemo — Apple Keynote style motion graphics
 * 4 auto-playing scenes that loop on scroll-into-view.
 *
 * Scene 1 — KI-Chatbot          (instant response + calendar booking)
 * Scene 2 — Prozessautomatisierung (trigger → KI → 4 parallel actions)
 * Scene 3 — Lead-Pipeline        (visitor → chat → CRM → email → termin)
 * Scene 4 — Systeme verbinden    (hub + spoke, glowing lines)
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C  = '#00D4FF';
const CL = 'rgba(0,212,255,0.14)';
const CB = 'rgba(0,212,255,0.07)';
const F  = 'Inter, sans-serif';
const FS = 'Syne, sans-serif';

const SCENE_MS     = 9000;
const TOTAL_SCENES = 4;

// ─── Shared: scene label ──────────────────────────────────────────────────────
function SceneLabel({ children, color = C }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute', top: 18, left: 0, right: 0,
        textAlign: 'center',
      }}
    >
      <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </motion.div>
  );
}

// ─── SCENE 1 — KI-Chatbot ─────────────────────────────────────────────────────
const CAL_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);
const BOOKED   = [3, 7, 14];

function Scene1({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2900),
      setTimeout(() => setStep(4), 4100),
      setTimeout(() => setStep(5), 5200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '44px 20px 48px' }}>
      <SceneLabel>KI-Chatbot · &lt;1 Sekunde Reaktionszeit</SceneLabel>

      <div style={{ flex: 1, maxWidth: 260, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px 10px 10px 2px', padding: '8px 11px', fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.8)', maxWidth: '88%', lineHeight: 1.5 }}>
            Wann haben Sie einen freien Termin für ein Angebot?
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ alignSelf: 'flex-end', background: CL, border: `1px solid ${C}35`, borderRadius: '10px 10px 2px 10px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: C }}
                animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }} />
            ))}
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ alignSelf: 'flex-end', background: CB, border: `1px solid ${C}35`, borderRadius: '10px 10px 2px 10px', padding: '8px 11px', fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.82)', maxWidth: '88%', lineHeight: 1.5 }}>
            Gerne!{' '}<span style={{ color: C, fontWeight: 600 }}>Di. 14. Mai · 10:00 Uhr</span>{' '}— soll ich den Termin direkt eintragen?
          </motion.div>
        )}
        {step >= 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ alignSelf: 'center', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.28)', borderRadius: 20, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#34d399', fontSize: 11 }}>✓</span>
            <span style={{ fontFamily: F, fontSize: 10, color: '#34d399', fontWeight: 600 }}>Termin automatisch eingetragen</span>
          </motion.div>
        )}
      </div>

      {step >= 4 && (
        <motion.div initial={{ opacity: 0, scale: 0.88, x: 16 }} animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ width: 128, background: 'rgba(0,0,0,0.5)', border: `1px solid ${C}25`, borderRadius: 12, padding: 12, flexShrink: 0 }}>
          <div style={{ fontFamily: FS, fontSize: 10, color: C, fontWeight: 700, marginBottom: 8, textAlign: 'center', letterSpacing: '0.06em' }}>Mai 2025</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 2 }}>
            {['M','D','M','D','F','S','S'].map((d, i) => (
              <div key={i} style={{ fontFamily: F, fontSize: 7, color: 'rgba(255,255,255,0.25)', textAlign: 'center', paddingBottom: 3 }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
            {CAL_DAYS.map(d => {
              const isNew = d === 14, isBooked = BOOKED.includes(d) && d !== 14;
              return (
                <motion.div key={d}
                  initial={isNew ? { scale: 0 } : {}}
                  animate={isNew ? { scale: 1 } : {}}
                  transition={isNew ? { delay: 0.3, type: 'spring', stiffness: 300 } : {}}
                  style={{ fontFamily: F, fontSize: 8, textAlign: 'center', padding: '2px 0', borderRadius: 3, background: isNew ? C : 'transparent', color: isNew ? '#000' : isBooked ? '#34d399' : 'rgba(255,255,255,0.35)', fontWeight: isNew || isBooked ? 700 : 400 }}>
                  {d}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── SCENE 2 — Prozessautomatisierung ────────────────────────────────────────
const PROC_ACTIONS = [
  { label: 'Rechnung erstellt',     icon: '🧾', delay: 2.2 },
  { label: 'Lager aktualisiert',    icon: '📦', delay: 2.8 },
  { label: 'Versand ausgelöst',     icon: '🚚', delay: 3.4 },
  { label: 'Kunden-E-Mail gesendet',icon: '✉️', delay: 4.0 },
];

function Scene2({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 600),   // trigger appears
      setTimeout(() => setStep(2), 1500),  // AI processes
      setTimeout(() => setStep(3), 5200),  // all done
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '44px 20px 48px' }}>
      <SceneLabel>Prozessautomatisierung · Kein manueller Aufwand</SceneLabel>

      {/* Trigger */}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 10, padding: '8px 18px' }}>
          <span style={{ fontSize: 16 }}>⚡</span>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,180,0,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger</div>
            <div style={{ fontFamily: FS, fontSize: 13, color: 'white', fontWeight: 600 }}>Neue Bestellung eingegangen</div>
          </div>
        </motion.div>
      )}

      {/* Arrow down */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, transformOrigin: 'top' }}>
          {/* KI node */}
          <div style={{ width: 1.5, height: 16, background: `rgba(0,212,255,0.3)` }} />
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${C}40`, `0 0 18px ${C}60`, `0 0 0px ${C}40`] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ background: CB, border: `1.5px solid ${C}60`, borderRadius: 10, padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: C }} />
            <span style={{ fontFamily: FS, fontSize: 12, color: C, fontWeight: 700 }}>KI verarbeitet</span>
          </motion.div>
          <div style={{ width: 1.5, height: 16, background: `rgba(0,212,255,0.3)` }} />
          {/* Fan-out lines */}
          <svg viewBox="0 0 280 24" style={{ width: 280, height: 24, overflow: 'visible' }}>
            {PROC_ACTIONS.map((_, i) => {
              const targets = [-105, -35, 35, 105];
              return (
                <motion.path key={i}
                  d={`M 140 0 L ${140 + targets[i]} 24`}
                  stroke="rgba(0,212,255,0.25)" strokeWidth={1.5} fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Action cards */}
      {step >= 2 && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PROC_ACTIONS.map((action, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: action.delay - 1.5, type: 'spring', stiffness: 220, damping: 18 }}
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid rgba(0,212,255,0.18)`, borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
              <span style={{ fontSize: 14 }}>{action.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 500, lineHeight: 1.3 }}>{action.label}</div>
              </div>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: action.delay - 1.5 + 0.35, type: 'spring', stiffness: 300 }}
                style={{ color: '#34d399', fontSize: 12, fontWeight: 700 }}>✓</motion.span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          4 Aufgaben · <span style={{ color: '#34d399' }}>automatisch erledigt</span> · 0 Minuten manuell
        </motion.div>
      )}
    </div>
  );
}

// ─── SCENE 3 — Lead-Pipeline ──────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { label: 'Website-Besucher',  sub: 'Formular ausgefüllt', icon: '🌐', color: 'rgba(255,255,255,0.15)' },
  { label: 'KI-Chatbot',        sub: 'Qualifiziert',        icon: '🤖', color: CL                        },
  { label: 'CRM',               sub: 'Eintrag erstellt',    icon: '📋', color: CL                        },
  { label: 'E-Mail gesendet',   sub: 'Automatisch',         icon: '✉️', color: CL                        },
  { label: 'Termin gebucht',    sub: 'Bestätigt',           icon: '📅', color: 'rgba(52,211,153,0.12)'   },
];

function Scene3({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    const ts = PIPELINE_STEPS.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 700 + i * 1100)
    );
    return () => ts.forEach(clearTimeout);
  }, [active]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '44px 16px 48px' }}>
      <SceneLabel>Automatische Lead-Pipeline</SceneLabel>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap', overflowX: 'auto', width: '100%', justifyContent: 'center' }}>
        {PIPELINE_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={i < visibleCount ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              style={{
                background: i < visibleCount ? s.color : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i < visibleCount ? (i === PIPELINE_STEPS.length - 1 ? 'rgba(52,211,153,0.4)' : `${C}30`) : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10, padding: '10px 10px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                minWidth: 72,
                boxShadow: i < visibleCount && i === visibleCount - 1 ? `0 0 16px ${C}25` : 'none',
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{s.icon}</span>
              <div style={{ fontFamily: F, fontSize: 9, color: i < visibleCount ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)', fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{s.label}</div>
              <div style={{ fontFamily: F, fontSize: 8, color: i < visibleCount ? (i === PIPELINE_STEPS.length - 1 ? '#34d399' : 'rgba(255,255,255,0.35)') : 'rgba(255,255,255,0.1)', textAlign: 'center' }}>{s.sub}</div>
            </motion.div>

            {/* Arrow between nodes */}
            {i < PIPELINE_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={i + 1 < visibleCount ? { opacity: 1 } : { opacity: 0.12 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}
              >
                <motion.div
                  animate={i + 1 < visibleCount ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="18" height="10" viewBox="0 0 18 10">
                    <path d="M0 5 H13 M9 1 L14 5 L9 9" stroke={C} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Status line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visibleCount > 0 ? { opacity: 1 } : {}}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <span style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
          {visibleCount < PIPELINE_STEPS.length
            ? `Schritt ${visibleCount} von ${PIPELINE_STEPS.length} läuft…`
            : <span style={{ color: '#34d399' }}>Lead vollständig verarbeitet · 0 manuelle Schritte</span>
          }
        </span>
      </motion.div>
    </div>
  );
}

// ─── SCENE 4 — Systeme verbinden ──────────────────────────────────────────────
const HUB_NODES = [
  { label: 'CRM',      sub: 'Kundendaten',  angle: -90  },
  { label: 'Kalender', sub: 'Termine',      angle: -30  },
  { label: 'WhatsApp', sub: 'Nachrichten',  angle:  30  },
  { label: 'E-Mail',   sub: 'Anfragen',     angle:  90  },
  { label: 'Shopify',  sub: 'Bestellungen', angle:  150 },
  { label: 'n8n',      sub: 'Workflows',    angle:  210 },
];

const HUB_CX = 200, HUB_CY = 138, HUB_R = 92;
function toRad(deg: number) { return (deg * Math.PI) / 180; }

function Scene4({ active }: { active: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 8px 44px' }}>
      <SceneLabel>Alle Systeme verbunden</SceneLabel>

      <svg viewBox="0 0 400 276" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {HUB_NODES.map((node, i) => {
          const nx = HUB_CX + HUB_R * Math.cos(toRad(node.angle));
          const ny = HUB_CY + HUB_R * Math.sin(toRad(node.angle));
          return (
            <motion.path key={`line-${i}`}
              d={`M ${HUB_CX} ${HUB_CY} L ${nx} ${ny}`}
              stroke="rgba(0,212,255,0.22)" strokeWidth={1.5} fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
            />
          );
        })}

        {active && HUB_NODES.map((node, i) => {
          const nx = HUB_CX + HUB_R * Math.cos(toRad(node.angle));
          const ny = HUB_CY + HUB_R * Math.sin(toRad(node.angle));
          return (
            <motion.circle key={`pulse-${i}`} r={3.5} fill={C}
              style={{ filter: `drop-shadow(0 0 5px ${C})` }}
              animate={{ cx: [HUB_CX, nx, HUB_CX], cy: [HUB_CY, ny, HUB_CY], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, delay: 1.0 + i * 0.28, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
            />
          );
        })}

        {HUB_NODES.map((node, i) => {
          const nx = HUB_CX + HUB_R * Math.cos(toRad(node.angle));
          const ny = HUB_CY + HUB_R * Math.sin(toRad(node.angle));
          return (
            <motion.g key={`node-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 220, damping: 18 }}
              style={{ transformOrigin: `${nx}px ${ny}px` }}
            >
              <rect x={nx - 34} y={ny - 17} width={68} height={34} rx={6}
                fill="rgba(5,5,5,0.75)" stroke="rgba(0,212,255,0.2)" strokeWidth={1.2} />
              <text x={nx} y={ny - 2} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={10} fontFamily={F} fontWeight="600">{node.label}</text>
              <text x={nx} y={ny + 9}  textAnchor="middle" fill="rgba(255,255,255,0.3)"  fontSize={8}  fontFamily={F}>{node.sub}</text>
            </motion.g>
          );
        })}

        <motion.circle cx={HUB_CX} cy={HUB_CY} r={40} fill="none" stroke={C} strokeWidth={0.8}
          animate={{ opacity: [0.06, 0.28, 0.06], r: [38, 46, 38] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx={HUB_CX} cy={HUB_CY} r={30} fill="none" stroke={C} strokeWidth={1}
          animate={{ opacity: [0.14, 0.50, 0.14] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring', stiffness: 180 }}
          style={{ transformOrigin: `${HUB_CX}px ${HUB_CY}px` }}>
          <circle cx={HUB_CX} cy={HUB_CY} r={24} fill="rgba(0,212,255,0.08)" stroke={C} strokeWidth={1.8} />
          <text x={HUB_CX} y={HUB_CY - 4} textAnchor="middle" fill={C} fontSize={12} fontFamily={FS} fontWeight="700">KI</text>
          <text x={HUB_CX} y={HUB_CY + 8}  textAnchor="middle" fill={C} fontSize={8}  fontFamily={F}>Agent</text>
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Scene registry ────────────────────────────────────────────────────────────
const SCENES       = [Scene1, Scene2, Scene3, Scene4] as const;
const SCENE_LABELS = ['KI-Chatbot', 'Automatisierung', 'Lead-Pipeline', 'Systeme'];

// ─── AnimatedDemo (main export) ───────────────────────────────────────────────
export function AnimatedDemo() {
  const [scene,    setScene]    = useState(0);
  const [running,  setRunning]  = useState(false);
  const [timerKey, setTimerKey] = useState(0); // bump to restart the interval
  const containerRef = useRef<HTMLDivElement>(null);
  const inView       = useInView(containerRef, { once: false, margin: '-12% 0px' });

  useEffect(() => {
    if (inView && !running) setRunning(true);
  }, [inView]);

  // Restart interval whenever timerKey changes (manual tab click) or running starts
  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => setScene(s => (s + 1) % TOTAL_SCENES), SCENE_MS);
    return () => clearInterval(iv);
  }, [running, timerKey]);

  const goToScene = (i: number) => {
    setScene(i);
    setTimerKey(k => k + 1); // reset timer from zero
  };

  const SceneComponent = SCENES[scene];

  return (
    <div ref={containerRef} style={{
      position: 'relative', width: '100%', aspectRatio: '16/9',
      background: '#080808', borderRadius: 16,
      border: '1px solid rgba(0,212,255,0.12)', overflow: 'hidden',
      boxShadow: '0 0 60px rgba(0,212,255,0.04), 0 24px 80px rgba(0,0,0,0.5)',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: [`linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px)`, `linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)`].join(', '),
        backgroundSize: '44px 44px',
      }} />

      {/* Corner dots */}
      {([{ top: '6px', left: '6px' }, { top: '6px', right: '6px' }, { bottom: '6px', left: '6px' }, { bottom: '6px', right: '6px' }] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,212,255,0.22)' }} />
      ))}

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div key={scene}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <SceneComponent active={running} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom tabs */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px 12px' }}>
        {SCENE_LABELS.map((label, i) => (
          <button key={i} onClick={() => goToScene(i)} style={{
            flex: 1, height: 28,
            background: i === scene ? 'rgba(0,212,255,0.12)' : 'transparent',
            border: `1px solid ${i === scene ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 6, cursor: 'pointer',
            fontFamily: F, fontSize: 10, fontWeight: i === scene ? 600 : 400,
            color: i === scene ? C : 'rgba(255,255,255,0.3)',
            transition: 'all 0.25s ease', letterSpacing: '0.04em',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {running && (
        <motion.div key={`progress-${scene}`}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: SCENE_MS / 1000, ease: 'linear' }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: C, transformOrigin: 'left', opacity: 0.4, zIndex: 3 }}
        />
      )}
    </div>
  );
}
