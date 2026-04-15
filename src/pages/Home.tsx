import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, MessageSquare, Phone, Workflow,
  Search, Cog, TrendingUp,
  Users, MapPin, Target,
  Calendar, ArrowRight, CheckCircle,
  UserX, Clock, Plus, Minus, Menu, X,
} from 'lucide-react';
import { StarField } from '../components/StarField';

// ─── Layout constants ────────────────────────────────────
const TOTAL  = 8;
const VH_PER = 200;       // ↓ from 400 — snappier scroll feel
const SPAN   = 1 / TOTAL;

// 3D depth constants — inline perspective per panel (avoids stacking-context
// conflicts that container-level perspective causes with overflow:hidden).
// PERSP=1200, Z_FAR=-22800 → scale = 1200/(1200+22800) ≈ 0.05 (tiny dot)
// PERSP=1200, EXIT_Z=533   → scale = 1200/(1200−533)   ≈ 1.80 (flies past)
const PERSP  = 1200;
const Z_FAR  = -22800;
const EXIT_Z = 533;

// Section timing fractions (of SPAN)
const ENTRY_SPAN     = 0.15;
const DWELL_END_FRAC = 0.45;
const EXIT_END_FRAC  = 0.58;
// Gap between sections = (1 - EXIT_END_FRAC - ENTRY_SPAN) × SPAN ≈ 54 vh

// ─── Content data ────────────────────────────────────────
const problems = [
  { icon: Globe,  title: 'Veralteter Webauftritt',         desc: 'Ihre Website ist Ihr erster Eindruck. Wer online nicht überzeugt, verliert Kunden noch bevor das erste Gespräch stattfindet.' },
  { icon: UserX,  title: 'Verpasste Leads',                desc: 'Keine sofortige Antwort? Ihr Interessent ist in Sekunden bei der Konkurrenz. Ihre Website muss ein 24/7-Verkäufer sein.' },
  { icon: Clock,  title: 'Manuelle Prozesse & Zeitverlust', desc: 'Stundenlange Routinearbeit frisst wertvolle Zeit. Excel-Listen, Copy-Paste — während Wachstumschancen ungenutzt bleiben.' },
];

// Services with full feature lists (matching main branch Services component)
const services = [
  {
    id: 'website',
    icon: Globe,
    title: 'Website',
    shortDesc: 'Professionelle Präsenz',
    description: 'Moderne, schnelle Websites, die Vertrauen schaffen und Besucher zu Kunden machen.',
    features: [
      'Professionelles, individuelles Design',
      'Schnelle Ladezeiten & SEO-optimiert',
      'Responsive für alle Geräte',
      'Kontaktformulare & Lead-Capture',
    ],
  },
  {
    id: 'chatbot',
    icon: MessageSquare,
    title: 'KI-Chatbot',
    shortDesc: '24/7 Kundenservice',
    description: 'Ihr digitaler Mitarbeiter beantwortet Fragen, qualifiziert Leads und bucht Termine automatisch ein.',
    features: [
      'Sofortige Antworten rund um die Uhr',
      'Automatische Lead-Qualifizierung & Terminbuchung',
      'Nahtlose Integration & lernfähig',
      'Testen Sie unseren KI-Experten rechts unten',
    ],
  },
  {
    id: 'voice',
    icon: Phone,
    title: 'Voice Agent',
    shortDesc: 'Telefonische KI',
    description: 'Automatisierte Telefongespräche für Terminvereinbarungen, Erinnerungen und Kundenservice.',
    features: [
      'Natürliche Sprachverarbeitung',
      'Terminbestätigungen per Anruf',
      '24/7-Verfügbarkeit',
      'CRM-Integration',
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Prozessautomatisierung',
    shortDesc: 'Workflows optimieren',
    description: 'Wir verbinden Ihre Tools und automatisieren repetitive Aufgaben komplett.',
    features: [
      'Datenübertragung zwischen Systemen',
      'Automatische Rechnungsstellung',
      'E-Mail-Workflows',
      'Benutzerdefinierte Integrationen',
    ],
  },
];

const steps = [
  { num: '01', icon: Search,     title: 'Analyse',    desc: 'Wir analysieren Ihre Website und Prozesse, um Verbesserungs- und Automatisierungspotenzial zu identifizieren.' },
  { num: '02', icon: Cog,        title: 'Umsetzung',  desc: 'Wir entwickeln und implementieren maßgeschneiderte Lösungen, die nahtlos in Ihr Unternehmen integriert werden.' },
  { num: '03', icon: TrendingUp, title: 'Ergebnisse', desc: 'Schnell geliefert: Sie sparen Zeit, gewinnen Kunden und skalieren ohne zusätzlichen Aufwand.' },
];

const stats = [
  { end: 8,   suffix: '+', label: 'Projekte abgeschlossen' },
  { end: 3,   suffix: 'x', label: 'schnellere Prozesse' },
  { end: 100, suffix: '%', label: 'Remote & flexibel' },
];

const highlights = [
  { icon: Users,  title: 'Berkay Aksoy & Marios Lysitsas', desc: 'Jung, engagiert und motiviert für Ihr Projekt' },
  { icon: MapPin, title: 'Made in Germany',                 desc: 'Deutsch, zuverlässig, DSGVO-konform' },
  { icon: Target, title: 'Ergebnisorientiert',              desc: 'Wir messen uns an Ihrem ROI' },
];

const faqs = [
  { q: 'Was kostet das?',                         a: 'Jede Leistung ist einzeln buchbar. Unsere Preise bestehen aus einer einmaligen Setup-Gebühr und einem optionalen monatlichen Support-Paket. Buchen Sie ein kostenloses Erstgespräch für ein unverbindliches Angebot.' },
  { q: 'Wie lange dauert die Umsetzung?',          a: 'Die meisten Projekte sind innerhalb von 2–4 Wochen einsatzbereit. Kleinere Automatisierungen können in wenigen Tagen umgesetzt werden.' },
  { q: 'Brauche ich technisches Wissen?',          a: 'Nein. Wir kümmern uns um alles Technische. Sie müssen nur wissen, welche Prozesse Sie verbessern möchten — wir zeigen Ihnen die Möglichkeiten.' },
  { q: 'Funktioniert das auch für meine Branche?', a: 'Ja. Unsere Lösungen sind branchenunabhängig und werden individuell angepasst. Ob Handwerk, Dienstleistung oder E-Commerce.' },
  { q: 'Ist das DSGVO-konform?',                   a: 'Absolut. Als deutsches Unternehmen legen wir großen Wert auf Datenschutz. Alle Lösungen sind DSGVO-konform.' },
  { q: 'Was passiert nach der Umsetzung?',         a: 'Wir lassen Sie nicht allein. Nach der Implementierung bieten wir Support und können bei Bedarf weitere Optimierungen vornehmen.' },
];

// ─── Mouse glow cursor ────────────────────────────────────
// Scroll-reactive: large+dim at rest, tight+bright while scrolling.
// Position is set via direct DOM transform (no React state) for 60fps.
// Size crossfades between two CSS layers via opacity transitions.
function MouseGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setScrolling(false), 150);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="fixed pointer-events-none z-[60] hidden lg:block"
      style={{ width: '300px', height: '300px', top: 0, left: 0, willChange: 'transform' }}
    >
      {/* Resting state: large, low-opacity glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 70%)',
          opacity: scrolling ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}
      />
      {/* Warp state: small tight glow pulled toward centre */}
      <div
        className="absolute rounded-full"
        style={{
          width: '150px', height: '150px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0) 70%)',
          opacity: scrolling ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  );
}

// ─── 3D Section Panel ────────────────────────────────────
function Panel({
  children,
  scrollYProgress,
  index,
  isActive,
  isLast = false,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  index: number;
  isActive: boolean;
  isLast?: boolean;
}) {
  const isHero = index === 0;

  const entryStart = isHero ? 0     : Math.max(0.005, (index - ENTRY_SPAN) * SPAN);
  const entryMid   = isHero ? 0.001 : (entryStart + Math.min(index * SPAN, 0.990)) / 2;
  const entryFull  = isHero ? 0.001 : Math.min(index * SPAN, 0.990);
  // exitStart/exitEnd must stay ≤ 1.0 — Chrome's ScrollTimeline API propagates the
  // useTransform input range directly as WAAPI keyframe offsets in bindToMotionValue.
  // Values > 1 crash with "Offsets must be null or in the range [0,1]" (no try/catch).
  const exitStart  = isLast ? 0.991 : (index + DWELL_END_FRAC) * SPAN;
  const exitEnd    = isLast ? 0.999 : Math.min((index + EXIT_END_FRAC) * SPAN, 0.999);

  const z = useTransform(
    scrollYProgress,
    [entryStart, entryFull, exitStart, exitEnd],
    [isHero ? 0 : Z_FAR, 0, 0, isLast ? 0 : EXIT_Z]
  );

  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryMid,    exitStart, exitEnd],
    [isHero ? 1 : 0,    1,    1,         isLast ? 1 : 0]
  );

  // Inline perspective per panel — avoids container stacking-context issues.
  // No blur at any point; sharpness is maintained throughout.
  const transform = useMotionTemplate`perspective(${PERSP}px) translateZ(${z}px)`;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{ opacity, transform, zIndex: isActive ? 20 : 10 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ────────────────────────────────────
function Counter({ end, suffix, label, active }: { end: number; suffix: string; label: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTs: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / 2200, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return (
    <div className="text-center">
      <div className="font-syne font-bold text-7xl md:text-8xl text-white tabular-nums">
        {count}<span className="text-accent">{suffix}</span>
      </div>
      <p className="font-inter text-gray-400 text-lg mt-4">{label}</p>
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Leistungen', idx: 2 },
  { label: 'Prozess',    idx: 3 },
  { label: 'Über uns',   idx: 5 },
  { label: 'FAQ',        idx: 6 },
  { label: 'Kontakt',    idx: 7 },
];

function Nav({ goTo }: { goTo: (i: number) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color] duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={() => goTo(0)} className="flex items-center gap-3">
            <img src="/logo.png" alt="CL-Solutions" className="h-16 w-auto" />
            <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.idx} onClick={() => goTo(item.idx)}
                className="font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
                {item.label}
              </button>
            ))}
            <button onClick={() => goTo(7)}
              className="px-5 py-2.5 bg-accent text-dark font-inter font-medium text-sm rounded-lg hover:bg-accent/90 transition-colors">
              Erstgespräch buchen
            </button>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 flex flex-col items-center gap-6 p-8 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.idx}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { goTo(item.idx); setOpen(false); }}
                className="font-inter text-white text-xl">
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.05 }}
              onClick={() => { goTo(7); setOpen(false); }}
              className="mt-4 px-8 py-3 bg-accent text-dark font-inter font-medium rounded-lg">
              Erstgespräch buchen
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Dot navigation ──────────────────────────────────────
function Dots({ scrollYProgress, goTo }: { scrollYProgress: MotionValue<number>; goTo: (i: number) => void }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setCur(Math.min(TOTAL - 1, Math.floor(v * TOTAL)));
    });
  }, [scrollYProgress]);
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: TOTAL }, (_, i) => (
        <button key={i} onClick={() => goTo(i)}
          className={`rounded-full transition-all duration-300 ${
            i === cur ? 'w-2 h-4 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/50'
          }`} />
      ))}
    </div>
  );
}

// ─── Persistent scroll indicator ─────────────────────────
// Stays fixed at the bottom-centre throughout the scroll journey,
// fading out as the user approaches the final section.
function ScrollArrow({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const fadeStart = (TOTAL - 1.8) * SPAN;
  const fadeEnd   = (TOTAL - 0.6) * SPAN;
  const opacity   = useTransform(scrollYProgress, [fadeStart, fadeEnd], [1, 0]);

  return (
    <motion.div
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-0.5"
      style={{ opacity }}
    >
      <div className="animate-scroll-bounce flex flex-col items-center">
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none">
          <path d="M1 1.5L11 10.5L21 1.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" style={{ marginTop: '-5px' }}>
          <path d="M1 1.5L11 10.5L21 1.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Shared card class ───────────────────────────────────
// Premium hover: lift + cyan glow + subtle scale
const CARD = `
  bg-white/[0.03] border border-white/[0.08] rounded-2xl
  hover:border-accent/40 hover:-translate-y-1.5 hover:scale-[1.02]
  hover:shadow-[0_8px_32px_rgba(0,212,255,0.12)]
  transition-all duration-300 ease-out
`.replace(/\s+/g, ' ').trim();

// ─── Section content ─────────────────────────────────────

function HeroPanel() {
  const words = 'Wir automatisieren. Ihr Wettbewerb schläft noch.'.split(' ');
  return (
    <div className="max-w-5xl mx-auto text-center w-full">
      <h1 className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-8">
        {words.map((word, i) => (
          <motion.span key={i} className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05 }}
        className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
        Automatisierung &amp; KI-Lösungen für deutsche Unternehmen.<br />
        Mehr Zeit. Mehr Umsatz. Weniger Stress.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}>
        <a href="https://cal.eu/cl-solutions/30min" target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-accent text-dark font-inter font-semibold text-lg rounded-lg hover:bg-accent/90 transition-colors animate-pulse-glow">
          Kostenloses Erstgespräch
        </a>
      </motion.div>
    </div>
  );
}

function ProblemPanel() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">
          Ihr unsichtbarer Umsatzverlust
        </span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white leading-tight">
          Während Sie warten, kauft<br />Ihr Kunde woanders
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <div key={i} className={`${CARD} p-8`}>
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <p.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-syne font-semibold text-xl text-white mb-3">{p.title}</h3>
            <p className="font-inter text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Services section rebuilt to match main branch tab + detail + mini-cards layout
function ServicesPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToContact = () => {
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (7 * SPAN + 0.05) * totalH, behavior: 'smooth' });
  };

  const scrollToService = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: idx * el.clientHeight, behavior: 'smooth' });
    setActiveIdx(idx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActiveIdx(Math.min(idx, services.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-6">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-3">
          Unsere Leistungen
        </span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Was wir für Sie tun</h2>
      </div>

      {/* Nav cards — compact, above the scroll content */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {services.map((s, i) => (
          <button key={s.id} onClick={() => scrollToService(i)}
            className={`text-left p-3 lg:p-4 rounded-2xl border transition-all duration-300 ${
              activeIdx === i
                ? 'bg-accent/10 border-accent/60'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.04]'
            }`}>
            <s.icon className={`w-5 h-5 mb-2 transition-colors ${
              activeIdx === i ? 'text-accent' : 'text-gray-500'
            }`} />
            <div className="font-syne font-semibold text-white text-sm leading-tight">{s.title}</div>
            <div className="font-inter text-xs text-gray-500 mt-0.5 leading-tight">{s.shortDesc}</div>
          </button>
        ))}
      </div>

      {/* Vertical scroll container — each service gets one full panel */}
      <div
        ref={scrollRef}
        data-scroll-no-bar
        className="rounded-3xl"
        style={{
          height: 'clamp(280px, 36vh, 360px)',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 lg:p-8"
            style={{
              height: 'clamp(280px, 36vh, 360px)',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              boxSizing: 'border-box',
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
              <div>
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-syne font-bold text-xl lg:text-2xl text-white mb-3">{s.title}</h3>
                <p className="font-inter text-gray-400 leading-relaxed mb-5 text-sm lg:text-base">{s.description}</p>
                <button onClick={goToContact}
                  className="px-5 py-2.5 bg-accent text-dark font-inter font-medium rounded-lg text-sm hover:bg-accent/90 transition-colors">
                  Jetzt anfragen
                </button>
              </div>
              <div className="space-y-2">
                {s.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span className="font-inter text-gray-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessPanel() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-14">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">
          Unser Prozess
        </span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">So arbeiten wir zusammen</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className={`${CARD} relative p-8`}>
            <span className="absolute -top-5 -left-2 font-syne font-bold text-8xl text-accent/10 leading-none select-none">
              {step.num}
            </span>
            <div className="relative pt-10">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-syne font-semibold text-xl text-white mb-3">{step.title}</h3>
              <p className="font-inter text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumbersPanel({ active }: { active: boolean }) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">
          In Zahlen
        </span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Ergebnisse, die zählen</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <div key={i}><Counter end={s.end} suffix={s.suffix} label={s.label} active={active} /></div>
        ))}
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">Über uns</span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-6">Wir sind CL-Solutions</h2>
          <div className="space-y-5 font-inter text-gray-400 text-lg leading-relaxed">
            <p>Zwei junge Gründer mit einer klaren Mission: Deutschen Unternehmen den Zugang zu moderner KI-Technologie ermöglichen – ohne Buzzwords, ohne Überflüssiges.</p>
            <p>Als studierte Wirtschaftsingenieure und Controller verbinden wir fundiertes technisches Know-how mit tiefem Verständnis für betriebswirtschaftliche Zusammenhänge.</p>
          </div>
        </div>
        <div className="space-y-4">
          {highlights.map((h, i) => (
            <div key={i} className={`${CARD} flex items-start gap-4 p-5`}>
              <div className="w-11 h-11 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <h.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-syne font-semibold text-white mb-0.5">{h.title}</h3>
                <p className="font-inter text-gray-400 text-sm">{h.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 p-5">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">B</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">M</div>
            </div>
            <div>
              <p className="font-inter text-white text-sm">Berkay &amp; Marios</p>
              <p className="font-inter text-gray-500 text-xs">Gründer, CL-Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQPanel() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="text-center mb-10">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">FAQ</span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Häufige Fragen</h2>
      </div>
      <div>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-white/[0.07]">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full py-5 flex items-center justify-between text-left group">
              <span className="font-syne font-semibold text-white group-hover:text-accent transition-colors pr-8">{faq.q}</span>
              <div className="w-9 h-9 bg-white/[0.05] rounded-lg flex items-center justify-center flex-shrink-0">
                {open === i ? <Minus className="w-4 h-4 text-accent" /> : <Plus className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />}
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <p className="font-inter text-gray-400 leading-relaxed pb-5 text-sm">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">Kontakt</span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-6">
            Bereit für den<br />nächsten Schritt?
          </h2>
          <p className="font-inter text-gray-400 text-lg leading-relaxed mb-8">
            Lassen Sie uns herausfinden, wie wir Ihre Prozesse automatisieren können. Keine Verpflichtungen, nur Klarheit.
          </p>
          <div className={`${CARD} p-6`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-syne font-semibold text-white">Termin vereinbaren</h3>
                <p className="font-inter text-gray-500 text-sm">30 Min., kostenlos &amp; unverbindlich</p>
              </div>
            </div>
            <a href="https://cal.eu/cl-solutions/30min" target="_blank" rel="noopener noreferrer"
              className="w-full py-3 bg-accent text-dark font-inter font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group animate-pulse-glow">
              Jetzt Termin buchen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div>
          <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-8 mb-4 hover:border-accent/30 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)] transition-all duration-300">
            <h3 className="font-syne font-bold text-2xl text-white mb-3">Erstberatung anfragen</h3>
            <p className="font-inter text-gray-400 text-base mb-6">Wir klären Ihren Bedarf persönlich, bevor Sie sich entscheiden.</p>
            <div className="space-y-3 mb-8">
              {['Kostenlose Analyse Ihrer Prozesse', 'Konkrete KI-Lösungsvorschläge', 'Transparente Kostenübersicht'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-inter text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button data-tally-open="2Evere"
              className="w-full py-4 px-6 bg-accent text-dark font-syne font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group">
              Jetzt Anfrage stellen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Chatbot hint */}
          <div className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="font-inter text-gray-400 text-sm">
              Unser KI-Chatbot rechts unten beantwortet die meisten Fragen sofort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home ────────────────────────────────────────────────
export function Home() {
  const { scrollY, scrollYProgress } = useScroll();

  // ── Readiness gate ──────────────────────────────────────
  // Chrome 115+ uses a native ScrollTimeline for scroll-linked WAAPI animations.
  // If the timeline is created before the page is fully laid out (fonts, images,
  // external scripts all loaded), the scroll extents can be wrong and all panels
  // stay frozen at progress=0. Fix: hold a stable zero-value placeholder until
  // window.load fires and one more rAF confirms the first paint is done.
  const zeroProgress = useMotionValue(0);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const markReady = () => requestAnimationFrame(() => setIsReady(true));
    if (document.readyState === 'complete') {
      markReady();
    } else {
      window.addEventListener('load', markReady, { once: true });
    }
    return () => window.removeEventListener('load', markReady);
  }, []);

  // Before ready: use a stable zero MotionValue so panels render in their
  // initial state (hero visible, rest zoomed-out) without binding to any
  // ScrollTimeline. After ready: switch to the real scrollYProgress.
  const activeProgress = isReady ? scrollYProgress : zeroProgress;

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  useEffect(() => {
    if (!isReady) return;
    return scrollYProgress.on('change', (v) => {
      setActiveSectionIdx(Math.min(TOTAL - 1, Math.floor(v * TOTAL)));
    });
  }, [scrollYProgress, isReady]);

  const [numbersActive, setNumbersActive] = useState(false);
  useEffect(() => {
    if (!isReady) return;
    const s4enter = Math.min(4 * SPAN, 0.990);
    const s4exit  = (4 + DWELL_END_FRAC) * SPAN;
    return scrollYProgress.on('change', (v) => {
      setNumbersActive(v >= s4enter && v <= s4exit);
    });
  }, [scrollYProgress, isReady]);

  // Spring-smoothed mouse for StarField parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX    = useSpring(rawMouseX, { stiffness: 60, damping: 25 });
  const mouseY    = useSpring(rawMouseY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawMouseX.set(((e.clientX / window.innerWidth)  - 0.5) * 60);
    rawMouseY.set(((e.clientY / window.innerHeight) - 0.5) * 60);
  };

  const goTo = (index: number) => {
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, (index * SPAN + 0.05) * totalH), behavior: 'smooth' });
  };

  const sections: React.ReactNode[] = [
    <HeroPanel />,
    <ProblemPanel />,
    <ServicesPanel />,
    <ProcessPanel />,
    <NumbersPanel active={numbersActive} />,
    <AboutPanel />,
    <FAQPanel />,
    <ContactPanel />,
  ];

  return (
    <div className="bg-[#0a0a0a]" onMouseMove={handleMouseMove}>
      <MouseGlow />
      <ScrollArrow scrollYProgress={activeProgress} />
      <Nav goTo={goTo} />
      <Dots scrollYProgress={activeProgress} goTo={goTo} />

      <div style={{ height: `${TOTAL * VH_PER}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <StarField scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} />

          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 32%, rgba(10,10,10,0.82) 100%)' }} />

          <div className="absolute inset-0 z-20">
            {sections.map((content, i) => (
              <Panel key={i} scrollYProgress={activeProgress} index={i}
                isActive={i === activeSectionIdx} isLast={i === TOTAL - 1}>
                {content}
              </Panel>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="CL-Solutions Logo" className="h-16 w-auto" />
                <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
              </div>
              <p className="font-inter text-gray-500 leading-relaxed max-w-sm">
                KI-Automatisierung für deutsche Unternehmen. Wir machen Technologie nutzbar – ohne Buzzwords.
              </p>
            </div>
            <div>
              <h4 className="font-syne font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.idx}>
                    <button onClick={() => goTo(item.idx)}
                      className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-syne font-semibold text-white mb-4">Rechtliches</h4>
              <ul className="space-y-3">
                <li><Link to="/impressum" className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">Impressum</Link></li>
                <li><Link to="/datenschutz" className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-gray-600 text-sm">{new Date().getFullYear()} CL-Solutions. Alle Rechte vorbehalten.</p>
            <p className="font-inter text-gray-600 text-sm">Made with precision in Germany</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
