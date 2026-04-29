/**
 * AnimatedDemo — Apple Keynote style motion graphics
 * 4 auto-playing scenes, fully responsive (mobile-first per scene).
 *
 * Scene 1 — KI-Chatbot
 * Scene 2 — Prozessautomatisierung
 * Scene 3 — Lead-Pipeline
 * Scene 4 — Systeme verbinden
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C  = '#00E5FF';
const CL = 'rgba(0,229,255,0.14)';
const CB = 'rgba(0,229,255,0.07)';
const F  = 'Inter, sans-serif';
const FS = 'Syne, sans-serif';

const SCENE_MS     = 9000;
const TOTAL_SCENES = 4;

// ─── Mobile detection ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── Shared: scene label ──────────────────────────────────────────────────────
function SceneLabel({ children, color = C }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', top: 14, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}
    >
      <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </motion.div>
  );
}

// ─── SCENE 1 — KI-Chatbot ─────────────────────────────────────────────────────
const CAL_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);
const BOOKED   = [3, 7, 14];

function Scene1({ active, isMobile }: { active: boolean; isMobile: boolean }) {
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

  const Calendar = (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, ...(isMobile ? { y: 10 } : { x: 16 }) }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        width: isMobile ? '100%' : 180,
        maxWidth: isMobile ? 200 : undefined,
        background: 'rgba(0,0,0,0.5)',
        border: `1px solid ${C}25`,
        borderRadius: 12,
        padding: isMobile ? '8px 10px' : 18,
        flexShrink: 0,
      }}
    >
      <div style={{ fontFamily: FS, fontSize: isMobile ? 9 : 12, color: C, fontWeight: 700, marginBottom: 8, textAlign: 'center', letterSpacing: '0.06em' }}>Mai 2025</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? 1 : 2, marginBottom: isMobile ? 2 : 4 }}>
        {['M','D','M','D','F','S','S'].map((d, i) => (
          <div key={i} style={{ fontFamily: F, fontSize: isMobile ? 7 : 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', paddingBottom: 2 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? 1 : 2 }}>
        {CAL_DAYS.map(d => {
          const isNew = d === 14, isBooked = BOOKED.includes(d) && d !== 14;
          return (
            <motion.div key={d}
              initial={isNew ? { scale: 0 } : {}}
              animate={isNew ? { scale: 1 } : {}}
              transition={isNew ? { delay: 0.3, type: 'spring', stiffness: 300 } : {}}
              style={{ fontFamily: F, fontSize: isMobile ? 7 : 10, textAlign: 'center', padding: isMobile ? '2px 0' : '3px 0', borderRadius: 3, background: isNew ? C : 'transparent', color: isNew ? '#000' : isBooked ? '#34d399' : 'rgba(255,255,255,0.35)', fontWeight: isNew || isBooked ? 700 : 400 }}>
              {d}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '36px 16px 50px' }}>
        <SceneLabel>KI-Chatbot · &lt;1s Reaktionszeit</SceneLabel>

        {/* Chat bubbles — full width on mobile */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px 10px 10px 2px', padding: '7px 10px', fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.8)', maxWidth: '80%', lineHeight: 1.45 }}>
              Wann haben Sie einen freien Termin für ein Angebot?
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ alignSelf: 'flex-end', background: CL, border: `1px solid ${C}35`, borderRadius: '10px 10px 2px 10px', padding: '8px 12px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0,1,2].map(i => (
                <motion.div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: C }}
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }} />
              ))}
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ alignSelf: 'flex-end', background: CB, border: `1px solid ${C}35`, borderRadius: '10px 10px 2px 10px', padding: '7px 10px', fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.82)', maxWidth: '80%', lineHeight: 1.45 }}>
              Gerne! <span style={{ color: C, fontWeight: 600 }}>Di. 14. Mai · 10:00</span> — Termin eintragen?
            </motion.div>
          )}
        </div>

        {/* Calendar + confirmation in a row on mobile */}
        {step >= 4 && (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
            {Calendar}
            {step >= 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ flex: 1, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.28)', borderRadius: 10, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#34d399', fontSize: 18 }}>✓</span>
                <span style={{ fontFamily: F, fontSize: 9, color: '#34d399', fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>Termin automatisch eingetragen</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '50px 40px 60px' }}>
      <SceneLabel>KI-Chatbot · &lt;1 Sekunde Reaktionszeit</SceneLabel>
      <div style={{ flex: 1, maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 12px 2px', padding: '11px 15px', fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.8)', maxWidth: '88%', lineHeight: 1.5 }}>
            Wann haben Sie einen freien Termin für ein Angebot?
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ alignSelf: 'flex-end', background: CL, border: `1px solid ${C}35`, borderRadius: '12px 12px 2px 12px', padding: '12px 18px', display: 'flex', gap: 5, alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: C }}
                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }} />
            ))}
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ alignSelf: 'flex-end', background: CB, border: `1px solid ${C}35`, borderRadius: '12px 12px 2px 12px', padding: '11px 15px', fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.82)', maxWidth: '88%', lineHeight: 1.5 }}>
            Gerne!{' '}<span style={{ color: C, fontWeight: 600 }}>Di. 14. Mai · 10:00 Uhr</span>{' '}— Termin direkt eintragen?
          </motion.div>
        )}
        {step >= 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ alignSelf: 'center', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.28)', borderRadius: 20, padding: '7px 18px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ color: '#34d399', fontSize: 13 }}>✓</span>
            <span style={{ fontFamily: F, fontSize: 13, color: '#34d399', fontWeight: 600 }}>Termin automatisch eingetragen</span>
          </motion.div>
        )}
      </div>
      {step >= 4 && Calendar}
    </div>
  );
}

// ─── SCENE 2 — Prozessautomatisierung ────────────────────────────────────────
const PROC_ACTIONS = [
  { label: 'Rechnung erstellt',      icon: '🧾', delay: 2.2 },
  { label: 'Lager aktualisiert',     icon: '📦', delay: 2.8 },
  { label: 'Versand ausgelöst',      icon: '🚚', delay: 3.4 },
  { label: 'Kunden-E-Mail gesendet', icon: '✉️', delay: 4.0 },
];

function Scene2({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 5200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '36px 16px 50px' }}>
        <SceneLabel>Prozessautomatisierung · Kein manueller Aufwand</SceneLabel>

        {/* Trigger */}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 10, padding: '8px 14px', marginBottom: 0 }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <div>
              <div style={{ fontFamily: F, fontSize: 8, color: 'rgba(255,180,0,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger</div>
              <div style={{ fontFamily: FS, fontSize: 12, color: 'white', fontWeight: 600 }}>Neue Bestellung eingegangen</div>
            </div>
          </motion.div>
        )}

        {step >= 2 && (
          <>
            {/* Vertical line + KI node */}
            <div style={{ width: 1.5, height: 12, background: 'rgba(0,212,255,0.3)', margin: '0 auto' }} />
            <motion.div
              animate={{ boxShadow: [`0 0 0px ${C}40`, `0 0 16px ${C}60`, `0 0 0px ${C}40`] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ background: CB, border: `1.5px solid ${C}60`, borderRadius: 10, padding: '6px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: C }} />
              <span style={{ fontFamily: FS, fontSize: 11, color: C, fontWeight: 700 }}>KI verarbeitet</span>
            </motion.div>
            <div style={{ width: 1.5, height: 12, background: 'rgba(0,212,255,0.3)', margin: '0 auto' }} />

            {/* Action cards — vertical stack on mobile */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROC_ACTIONS.map((action, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: action.delay - 1.5, type: 'spring', stiffness: 220, damping: 18 }}
                  style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid rgba(0,212,255,0.18)`, borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                  <span style={{ fontSize: 14 }}>{action.icon}</span>
                  <span style={{ flex: 1, fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{action.label}</span>
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: action.delay - 1.5 + 0.3, type: 'spring', stiffness: 300 }}
                    style={{ color: '#34d399', fontSize: 13, fontWeight: 700 }}>✓</motion.span>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 6 }}>
            4 Aufgaben · <span style={{ color: '#34d399' }}>automatisch erledigt</span>
          </motion.div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '50px 28px 60px' }}>
      <SceneLabel>Prozessautomatisierung · Kein manueller Aufwand</SceneLabel>
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 12, padding: '10px 24px' }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,180,0,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger</div>
            <div style={{ fontFamily: FS, fontSize: 16, color: 'white', fontWeight: 600 }}>Neue Bestellung eingegangen</div>
          </div>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top' }}>
          <div style={{ width: 2, height: 20, background: 'rgba(0,212,255,0.3)' }} />
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${C}40`, `0 0 18px ${C}60`, `0 0 0px ${C}40`] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ background: CB, border: `1.5px solid ${C}60`, borderRadius: 12, padding: '8px 28px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 9, height: 9, borderRadius: '50%', background: C }} />
            <span style={{ fontFamily: FS, fontSize: 15, color: C, fontWeight: 700 }}>KI verarbeitet</span>
          </motion.div>
          <div style={{ width: 2, height: 20, background: 'rgba(0,212,255,0.3)' }} />
          <svg viewBox="0 0 360 28" style={{ width: 360, height: 28, overflow: 'visible' }}>
            {PROC_ACTIONS.map((_, i) => {
              const targets = [-135, -45, 45, 135];
              return (
                <motion.path key={i} d={`M 180 0 L ${180 + targets[i]} 28`}
                  stroke="rgba(0,212,255,0.25)" strokeWidth={1.5} fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }} />
              );
            })}
          </svg>
        </motion.div>
      )}
      {step >= 2 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PROC_ACTIONS.map((action, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: action.delay - 1.5, type: 'spring', stiffness: 220, damping: 18 }}
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid rgba(0,212,255,0.18)`, borderRadius: 12, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 152 }}>
              <span style={{ fontSize: 18 }}>{action.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, lineHeight: 1.3 }}>{action.label}</div>
              </div>
              <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: action.delay - 1.5 + 0.35, type: 'spring', stiffness: 300 }}
                style={{ color: '#34d399', fontSize: 15, fontWeight: 700 }}>✓</motion.span>
            </motion.div>
          ))}
        </div>
      )}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          4 Aufgaben · <span style={{ color: '#34d399' }}>automatisch erledigt</span> · 0 Minuten manuell
        </motion.div>
      )}
    </div>
  );
}

// ─── SCENE 3 — Lead-Pipeline ──────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { label: 'Website-Besucher', sub: 'Formular ausgefüllt', icon: '🌐', color: 'rgba(255,255,255,0.15)' },
  { label: 'KI-Chatbot',       sub: 'Qualifiziert',        icon: '🤖', color: CL                       },
  { label: 'CRM',              sub: 'Eintrag erstellt',    icon: '📋', color: CL                       },
  { label: 'E-Mail gesendet',  sub: 'Automatisch',         icon: '✉️', color: CL                       },
  { label: 'Termin gebucht',   sub: 'Bestätigt',           icon: '📅', color: 'rgba(52,211,153,0.12)'  },
];

function Scene3({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    const ts = PIPELINE_STEPS.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 700 + i * 1100)
    );
    return () => ts.forEach(clearTimeout);
  }, [active]);

  const isLast   = (i: number) => i === PIPELINE_STEPS.length - 1;
  const isActive = (i: number) => i < visibleCount;

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '36px 16px 50px' }}>
        <SceneLabel>Automatische Lead-Pipeline</SceneLabel>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
          {PIPELINE_STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isActive(i) ? { opacity: 1, x: 0 } : { opacity: 0.18, x: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                style={{
                  width: '100%',
                  background: isActive(i) ? s.color : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive(i) ? (isLast(i) ? 'rgba(52,211,153,0.4)' : `${C}30`) : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: isActive(i) && i === visibleCount - 1 ? `0 0 14px ${C}20` : 'none',
                }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F, fontSize: 11, color: isActive(i) ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontFamily: F, fontSize: 9, color: isActive(i) ? (isLast(i) ? '#34d399' : 'rgba(255,255,255,0.4)') : 'rgba(255,255,255,0.1)' }}>{s.sub}</div>
                </div>
                {isActive(i) && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                    style={{ color: isLast(i) ? '#34d399' : C, fontSize: 12, fontWeight: 700 }}>✓</motion.span>
                )}
              </motion.div>

              {/* Down arrow connector */}
              {i < PIPELINE_STEPS.length - 1 && (
                <motion.div
                  animate={i + 1 < visibleCount ? { opacity: 1 } : { opacity: 0.15 }}
                  style={{ padding: '2px 0' }}>
                  <svg width="14" height="12" viewBox="0 0 14 12">
                    <path d="M7 0 V8 M3 5 L7 10 L11 5" stroke={C} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Status */}
        <motion.div initial={{ opacity: 0 }} animate={visibleCount > 0 ? { opacity: 1 } : {}}
          style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span style={{ fontFamily: F, fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>
            {visibleCount < PIPELINE_STEPS.length
              ? `Schritt ${visibleCount} / ${PIPELINE_STEPS.length} läuft…`
              : <span style={{ color: '#34d399' }}>Lead verarbeitet · 0 manuelle Schritte</span>
            }
          </span>
        </motion.div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '50px 20px 60px' }}>
      <SceneLabel>Automatische Lead-Pipeline</SceneLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', justifyContent: 'center' }}>
        {PIPELINE_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isActive(i) ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              style={{ background: isActive(i) ? s.color : 'rgba(255,255,255,0.03)', border: `1px solid ${isActive(i) ? (isLast(i) ? 'rgba(52,211,153,0.4)' : `${C}30`) : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: '14px 12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 96, boxShadow: isActive(i) && i === visibleCount - 1 ? `0 0 20px ${C}25` : 'none' }}>
              <span style={{ fontSize: 24, lineHeight: 1 }}>{s.icon}</span>
              <div style={{ fontFamily: F, fontSize: 12, color: isActive(i) ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)', fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{s.label}</div>
              <div style={{ fontFamily: F, fontSize: 10, color: isActive(i) ? (isLast(i) ? '#34d399' : 'rgba(255,255,255,0.35)') : 'rgba(255,255,255,0.1)', textAlign: 'center' }}>{s.sub}</div>
            </motion.div>
            {i < PIPELINE_STEPS.length - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={i + 1 < visibleCount ? { opacity: 1 } : { opacity: 0.12 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                <motion.div animate={i + 1 < visibleCount ? { x: [0, 4, 0] } : {}} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}>
                  <svg width="22" height="12" viewBox="0 0 22 12">
                    <path d="M0 6 H16 M11 1 L18 6 L11 11" stroke={C} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={visibleCount > 0 ? { opacity: 1 } : {}}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <motion.div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399' }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
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

function toRad(deg: number) { return (deg * Math.PI) / 180; }

function Scene4({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  // Mobile: larger viewBox with bigger nodes
  const VW = isMobile ? 320 : 400;
  const VH = isMobile ? 320 : 276;
  const CX = isMobile ? 160 : 200;
  const CY = isMobile ? 160 : 138;
  const R  = isMobile ? 110 : 92;
  const NW = isMobile ? 80  : 68;
  const NH = isMobile ? 40  : 34;
  const NFS = isMobile ? 11 : 10;   // node label font size
  const NSS = isMobile ? 9  : 8;    // node sub font size
  const LW  = isMobile ? 2  : 1.5;  // line width
  const HR  = isMobile ? 30 : 24;   // hub circle radius

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '36px 0 44px' : '40px 8px 44px' }}>
      <SceneLabel>Alle Systeme verbunden</SceneLabel>

      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Lines */}
        {HUB_NODES.map((node, i) => {
          const nx = CX + R * Math.cos(toRad(node.angle));
          const ny = CY + R * Math.sin(toRad(node.angle));
          return (
            <motion.path key={`line-${i}`}
              d={`M ${CX} ${CY} L ${nx} ${ny}`}
              stroke="rgba(0,212,255,0.22)" strokeWidth={LW} fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
            />
          );
        })}

        {/* Pulses */}
        {active && HUB_NODES.map((node, i) => {
          const nx = CX + R * Math.cos(toRad(node.angle));
          const ny = CY + R * Math.sin(toRad(node.angle));
          return (
            <motion.circle key={`pulse-${i}`} r={isMobile ? 4.5 : 3.5} fill={C}
              style={{ filter: `drop-shadow(0 0 5px ${C})` }}
              animate={{ cx: [CX, nx, CX], cy: [CY, ny, CY], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, delay: 1.0 + i * 0.28, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
            />
          );
        })}

        {/* Outer nodes */}
        {HUB_NODES.map((node, i) => {
          const nx = CX + R * Math.cos(toRad(node.angle));
          const ny = CY + R * Math.sin(toRad(node.angle));
          return (
            <motion.g key={`node-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 220, damping: 18 }}
              style={{ transformOrigin: `${nx}px ${ny}px` }}
            >
              <rect x={nx - NW/2} y={ny - NH/2} width={NW} height={NH} rx={6}
                fill="rgba(5,5,5,0.85)" stroke="rgba(0,212,255,0.25)" strokeWidth={isMobile ? 1.5 : 1.2} />
              <text x={nx} y={ny - 3} textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize={NFS} fontFamily={F} fontWeight="600">{node.label}</text>
              <text x={nx} y={ny + NH/2 - 6} textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize={NSS} fontFamily={F}>{node.sub}</text>
            </motion.g>
          );
        })}

        {/* Hub rings */}
        <motion.circle cx={CX} cy={CY} r={HR + 16} fill="none" stroke={C} strokeWidth={0.8}
          animate={{ opacity: [0.06, 0.28, 0.06], r: [HR + 14, HR + 22, HR + 14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx={CX} cy={CY} r={HR + 6} fill="none" stroke={C} strokeWidth={1}
          animate={{ opacity: [0.14, 0.50, 0.14] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />

        {/* Hub center */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring', stiffness: 180 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r={HR} fill="rgba(0,212,255,0.08)" stroke={C} strokeWidth={isMobile ? 2.2 : 1.8} />
          <text x={CX} y={CY - 4} textAnchor="middle" fill={C} fontSize={isMobile ? 14 : 12} fontFamily={FS} fontWeight="700">KI</text>
          <text x={CX} y={CY + (isMobile ? 10 : 8)} textAnchor="middle" fill={C} fontSize={isMobile ? 10 : 8} fontFamily={F}>Agent</text>
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Scene registry ────────────────────────────────────────────────────────────
const SCENE_LABELS = ['KI-Chatbot', 'Automatisierung', 'Lead-Pipeline', 'Systeme'];

// ─── AnimatedDemo (main export) ───────────────────────────────────────────────
export function AnimatedDemo() {
  const [scene,    setScene]    = useState(0);
  const [running,  setRunning]  = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView       = useInView(containerRef, { once: false, margin: '-12% 0px' });
  const isMobile     = useIsMobile();

  useEffect(() => {
    if (inView && !running) setRunning(true);
  }, [inView]);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => setScene(s => (s + 1) % TOTAL_SCENES), SCENE_MS);
    return () => clearInterval(iv);
  }, [running, timerKey]);

  const goToScene = (i: number) => {
    setScene(i);
    setTimerKey(k => k + 1);
  };

  const scenes = [
    <Scene1 key="s1" active={running} isMobile={isMobile} />,
    <Scene2 key="s2" active={running} isMobile={isMobile} />,
    <Scene3 key="s3" active={running} isMobile={isMobile} />,
    <Scene4 key="s4" active={running} isMobile={isMobile} />,
  ];

  return (
    <div ref={containerRef} style={{
      position: 'relative',
      width: '100%',
      aspectRatio: isMobile ? undefined : '16/9',
      minHeight: isMobile ? 440 : undefined,
      background: '#080808',
      borderRadius: isMobile ? 12 : 16,
      border: '1px solid rgba(0,212,255,0.12)',
      overflow: 'hidden',
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
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Bottom tabs */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 6,
        padding: isMobile ? '0 8px 10px' : '0 14px 12px',
      }}>
        {SCENE_LABELS.map((label, i) => (
          <button key={i} onClick={() => goToScene(i)} style={{
            flex: 1,
            height: isMobile ? 26 : 28,
            background: i === scene ? 'rgba(0,212,255,0.12)' : 'transparent',
            border: `1px solid ${i === scene ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 6, cursor: 'pointer',
            fontFamily: F,
            fontSize: isMobile ? 8 : 10,
            fontWeight: i === scene ? 700 : 400,
            color: i === scene ? C : 'rgba(255,255,255,0.3)',
            transition: 'all 0.25s ease',
            letterSpacing: isMobile ? '0.02em' : '0.04em',
            padding: '0 2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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
