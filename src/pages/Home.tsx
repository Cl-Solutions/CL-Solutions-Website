// ─── REDESIGN V3 — Home.tsx ──────────────────────────────────────────────────
// Branch: redesign-v3  |  Normal scroll layout, 11 sections
// Replaces 3D panel system with scroll-triggered animations per section.
// Nav + Footer + dark/cyan theme + StarField + CustomCursor preserved.

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Clock, TrendingUp, Zap, MessageSquare,
  RefreshCw, Link2,
  Search, Cog,
  ArrowRight, ChevronLeft, ChevronRight, ChevronDown,
  Plus, Minus, Menu, X, Calendar,
  Users, MapPin, Target, CheckCircle,
} from 'lucide-react';
import { StarField } from '../components/StarField';
import { CustomCursor } from '../components/CustomCursor';

// ─── Typewriter ──────────────────────────────────────────────────────────────

const TW_WORDS = ['Zeitverlust.', 'verpassten Anfragen.', 'manueller Arbeit.', 'langsamen Prozessen.', 'ungenutztem Potenzial.'];

function useTypewriter(words: string[], typeMs = 80, deleteMs = 40, pauseMs = 2000) {
  const [state, setState] = useState<{ wordIdx: number; display: string; phase: 'typing' | 'pausing' | 'deleting' }>({
    wordIdx: 0, display: '', phase: 'typing',
  });
  useEffect(() => {
    const { wordIdx, display, phase } = state;
    const word = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (display.length < word.length) {
        timer = setTimeout(() => setState(s => ({ ...s, display: word.slice(0, s.display.length + 1) })), typeMs);
      } else {
        timer = setTimeout(() => setState(s => ({ ...s, phase: 'pausing' })), pauseMs);
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setState(s => ({ ...s, phase: 'deleting' })), 0);
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setState(s => ({ ...s, display: s.display.slice(0, -1) })), deleteMs);
      } else {
        setState(s => ({ wordIdx: (s.wordIdx + 1) % words.length, display: '', phase: 'typing' }));
      }
    }
    return () => clearTimeout(timer);
  }, [state, words, typeMs, deleteMs, pauseMs]);
  return state.display;
}

// ─── Shared helpers ──────────────────────────────────────────────────────────

const CARD = [
  'glass-card glass-card-interactive rounded-2xl',
  'hover:-translate-y-1.5 hover:scale-[1.02]',
  'transition-all duration-300 ease-out',
].join(' ');

/** Smooth-scroll to a section by ID, offsetting for the fixed 80px navbar. */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { label: string; id?: string; href?: string }[] = [
  { label: 'Leistungen',  id: 'leistungen' },
  { label: 'Prozess',     id: 'prozess' },
  { label: 'Über uns',    id: 'ueber-uns' },
  { label: 'FAQ',         id: 'faq' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Kontakt',     id: 'kontakt' },
];

const problems = [
  { icon: Clock,          title: 'Täglich Zeit verlieren',           desc: 'Routineaufgaben, manuelle Prozesse, Copy-Paste — euer Tag steckt voller Arbeit, die kein Mensch erledigen müsste.' },
  { icon: TrendingUp,     title: 'Wachsen ohne mehr Aufwand',        desc: 'Mehr Kunden, mehr Umsatz — aber nicht proportional mehr Personal. Automatisierung ist euer stärkster Hebel.' },
  { icon: Zap,            title: 'Systeme reden nicht miteinander',  desc: 'Tools die nicht verbunden sind. Daten die manuell übertragen werden. Das kostet täglich Zeit, Geld und Nerven.' },
  { icon: MessageSquare,  title: 'Anfragen fallen durchs Raster',    desc: 'Keine Reaktion außerhalb der Bürozeiten. Leads die zu spät oder gar nicht bearbeitet werden.' },
];

const services = [
  {
    id: 'automation',
    icon: RefreshCw,
    emoji: '🔄',
    title: 'Prozesse automatisieren',
    text: 'Wir verbinden eure bestehenden Tools und automatisieren Abläufe, die heute manuell laufen. Keine Datenpflege mehr. Keine verpassten Schritte. Alles läuft durch — auch wenn niemand hinschaut.',
    tags: ['n8n', 'Make', 'Zapier', 'Python', 'REST APIs'],
  },
  {
    id: 'integration',
    icon: Link2,
    emoji: '🔗',
    title: 'Systeme verbinden',
    text: 'CRM, ERP, E-Mail, Kalender, Buchhaltung — wir bringen zusammen, was nicht zusammenarbeitet. Daten fließen automatisch, Fehler durch manuelle Übertragung verschwinden.',
    tags: ['API-Integration', 'Webhooks', 'Datenpipelines', 'Custom Middleware'],
  },
  {
    id: 'communication',
    icon: MessageSquare,
    emoji: '💬',
    title: 'Kommunikation automatisieren',
    text: 'Chatbot und Voice Agent, der Anfragen entgegennimmt, qualifiziert und weiterleitet — in eurer Sprache, in eurer Markenstimme, rund um die Uhr.',
    tags: ['Voice Agent', 'Chatbot', 'OpenAI', 'WhatsApp', 'Telefonie-Integration'],
  },
  {
    id: 'custom-ki',
    icon: Zap,
    emoji: '⚡',
    title: 'Custom KI-Lösung',
    text: 'Kein Standardtool passt? Wir entwickeln KI-Systeme, die genau auf euren Prozess zugeschnitten sind — von der Logik bis zur Integration in eure bestehende Infrastruktur.',
    tags: ['Custom LLM', 'Fine-Tuning', 'KI-Agenten', 'RAG', 'Dokumenten-KI'],
  },
];

const showcaseCards = [
  {
    emoji: '🔄',
    category: 'Prozessautomatisierung',
    title: '[Projektname Platzhalter]',
    desc: 'Vollautomatische Synchronisation zwischen CRM und Buchhaltungssystem. Manuelle Datenpflege komplett eliminiert.',
    badge: '8h/Woche eingespart',
  },
  {
    emoji: '💬',
    category: 'KI-Kommunikation',
    title: '[Projektname Platzhalter]',
    desc: 'Voice Agent übernimmt eingehende Anrufe außerhalb der Geschäftszeiten, qualifiziert Anfragen und bucht Termine automatisch.',
    badge: '24/7 Erreichbarkeit',
  },
  {
    emoji: '🔗',
    category: 'System-Integration',
    title: '[Projektname Platzhalter]',
    desc: 'API-Verbindung zwischen Shop-System, Lager und Versanddienstleister. Bestellungen laufen vollautomatisch durch.',
    badge: '0 manuelle Schritte',
  },
  {
    emoji: '⚡',
    category: 'Custom KI-Lösung',
    title: '[Projektname Platzhalter]',
    desc: 'Dokumenten-KI extrahiert relevante Daten aus eingehenden PDFs und überträgt sie strukturiert ins interne System.',
    badge: '90% schneller',
  },
  {
    emoji: '📊',
    category: 'Individuelle KI-Lösung',
    title: '[Projektname Platzhalter]',
    desc: 'KI-Agent qualifiziert eingehende Leads automatisch, scored sie nach Priorität und übergibt nur kaufbereite Kontakte ans Vertriebsteam.',
    badge: '3x schnellere Reaktionszeit',
  },
  {
    emoji: '🌐',
    category: 'KI-Website',
    title: '[Projektname Platzhalter]',
    desc: 'Website von Anfang an mit integriertem KI-Chatbot konzipiert — beantwortet Besucherfragen, qualifiziert Interessenten und leitet Terminbuchungen ein, rund um die Uhr.',
    badge: 'Leads automatisch qualifiziert',
  },
];

const steps = [
  { num: '01', icon: Search,     title: 'Kennenlernen & Analyse',    desc: 'In einem kostenlosen 30-Minuten-Gespräch analysieren wir eure Prozesse, identifizieren die größten Hebel und verstehen euer Ziel.' },
  { num: '02', icon: Cog,        title: 'Konzept & Angebot',         desc: 'Innerhalb von 48 Stunden erhaltet ihr ein maßgeschneidertes Konzept mit konkreten Lösungsvorschlägen und transparenten Kosten — ohne versteckte Posten.' },
  { num: '03', icon: TrendingUp, title: 'Umsetzung & Live-Schaltung', desc: 'Wir entwickeln, testen und implementieren. Erste automatisierte Abläufe sind in der Regel innerhalb von 1–2 Wochen live.' },
];

type StatDef =
  | { kind: 'count';     end: number; suffix: string; label: string }
  | { kind: 'static';    display: string;              label: string }
  | { kind: 'static-white'; display: string;           label: string }
  | { kind: 'countdown';                               label: string };

const stats: StatDef[] = [
  { kind: 'count',        end: 48, suffix: 'h',  label: 'Bis zum ersten Angebot' },
  { kind: 'static-white', display: '1–2',              label: 'Bis zur ersten Live-Lösung' },
  { kind: 'count',     end: 24, suffix: '/7', label: 'Verfügbarkeit eurer KI' },
  { kind: 'countdown',                         label: 'Manuelle Schritte nach Automatisierung' },
];

const techLogos: { type: 'img' | 'text'; src?: string; alt?: string; label?: string }[] = [
  { type: 'text', label: 'OpenAI' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/n8n/ffffff',    alt: 'n8n' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/make/ffffff',   alt: 'Make' },
  { type: 'text', label: 'Anthropic' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/zapier/ffffff', alt: 'Zapier' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/python/ffffff', alt: 'Python' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/vercel/ffffff', alt: 'Vercel' },
  { type: 'text', label: 'Voiceflow' },
];

const faqs = [
  { q: 'Für welche Branchen funktioniert das?',         a: 'Prozessautomatisierung funktioniert branchenunabhängig — überall wo Aufgaben wiederholt werden, Systeme nicht verbunden sind oder Kommunikation manuell läuft. Wir haben Lösungen für Dienstleister, Handel, Handwerk und B2B-Unternehmen umgesetzt.' },
  { q: 'Was kostet das?',                               a: 'Jedes Projekt ist individuell — Umfang, Komplexität und laufende Betreuung beeinflussen den Preis. Was wir sagen können: Ein automatisierter Prozess rechnet sich in der Regel innerhalb weniger Wochen. Im kostenlosen Erstgespräch nennen wir euch konkrete Zahlen — ohne Überraschungen danach.' },
  { q: 'Wie lange dauert die Umsetzung?',               a: 'Erste Ergebnisse sind oft in 1–2 Wochen sichtbar. Komplexere Systeme mit mehreren Integrationen dauern entsprechend länger — das besprechen wir im Konzept transparent.' },
  { q: 'Brauchen wir technisches Wissen?',              a: 'Nein. Ihr beschreibt euren Prozess, wir übernehmen alles Technische. Nach Übergabe bekommt ihr eine verständliche Dokumentation und Einführung.' },
  { q: 'Ist das DSGVO-konform?',                        a: 'Ja. Wir sind ein deutsches Unternehmen und setzen alle Lösungen DSGVO-konform um. Datenspeicherung, Verarbeitung und Zugriffe werden transparent dokumentiert.' },
  { q: 'Was passiert nach der Umsetzung?',              a: 'Wir begleiten den Go-Live, beheben Startschwierigkeiten und stehen für Anpassungen zur Verfügung. Auf Wunsch bieten wir laufende Betreuung und Weiterentwicklung.' },
  { q: 'Was, wenn ich mit dem Ergebnis nicht zufrieden bin?', a: 'Wir arbeiten ergebnisorientiert — nicht stunden- oder projektbasiert. Wenn etwas nicht passt, passen wir es an. Das klären wir vor Projektstart vertraglich.' },
];

// ─── Utilities ───────────────────────────────────────────────────────────────

/** Mouse glow — follows cursor, tightens during scroll. Desktop only. */
function MouseGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (outerRef.current)
        outerRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
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
    <div ref={outerRef} className="fixed pointer-events-none z-[60] hidden lg:block"
      style={{ width: 300, height: 300, top: 0, left: 0, willChange: 'transform' }}>
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 70%)', opacity: scrolling ? 0 : 1, transition: 'opacity 300ms ease' }} />
      <div className="absolute rounded-full"
        style={{ width: 150, height: 150, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0) 70%)', opacity: scrolling ? 1 : 0, transition: 'opacity 300ms ease' }} />
    </div>
  );
}

/**
 * GSAP SplitText reveal for headings, triggered on first inView.
 * headRef → words drop from above; subRef → slides in from left.
 */
function useSplitHeadline(inView: boolean) {
  const headRef = useRef<HTMLElement>(null);
  const subRef  = useRef<HTMLElement>(null);
  const done    = useRef(false);

  useLayoutEffect(() => {
    if (headRef.current) headRef.current.style.opacity = '0';
    if (subRef.current)  subRef.current.style.opacity  = '0';
  }, []);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const head = headRef.current;
    const sub  = subRef.current;
    if (head) {
      gsap.set(head, { opacity: 1 });
      const split = new SplitText(head, { type: 'words' });
      gsap.from(split.words, { y: -50, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out' });
    }
    if (sub) {
      gsap.set(sub, { opacity: 1 });
      gsap.from(sub, { x: -20, opacity: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' });
    }
  }, [inView]);

  return { headRef, subRef };
}

/** Animated count-up number. */
function Counter({ end, suffix, label, active }: { end: number; suffix: string; label: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    // For 0: immediately show without animation
    if (end === 0) { setCount(0); return; }
    let startTs: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return (
    <div className="text-center">
      <div className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white tabular-nums">
        {count}<span className="text-accent">{suffix}</span>
      </div>
      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{label}</p>
    </div>
  );
}

/** Countdown — runs 10 → 0 once when active. */
function CountdownStat({ label, active }: { label: string; active: boolean }) {
  const [count, setCount] = useState(10);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let c = 10;
    const id = setInterval(() => {
      c -= 1;
      setCount(c);
      if (c <= 0) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="text-center">
      <div className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white tabular-nums">
        {count}
      </div>
      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{label}</p>
    </div>
  );
}

/** Thin scroll-progress bar pinned to top of viewport. */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%`, background: 'linear-gradient(to right, #00E5FF, #00b8ff)' }}
      />
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-inter text-accent text-xs font-semibold tracking-[0.18em] uppercase block mb-3">
      {children}
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleNav = (item: typeof NAV_ITEMS[0]) => {
    if (item.id) scrollToId(item.id);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.80)] backdrop-blur-[16px] border-[rgba(0,229,255,0.08)]'
            : 'bg-[rgba(10,10,10,0.50)] backdrop-blur-[16px] border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <img src="/logo.png" alt="CL-Solutions" className="h-16 w-auto" />
            <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              item.href
                ? <Link key={item.href} to={item.href}
                    className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    {item.label}
                  </Link>
                : <button key={item.id} onClick={() => handleNav(item)}
                    className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    {item.label}
                  </button>
            ))}
            <button onClick={() => scrollToId('kontakt')}
              className="px-5 py-2.5 bg-accent text-dark font-inter font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors">
              Prozessanalyse buchen
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
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 flex flex-col items-center gap-6 p-8 md:hidden">
            {NAV_ITEMS.map((item, i) => (
              item.href
                ? <motion.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={item.href} onClick={() => setOpen(false)} className="font-inter text-white text-xl">{item.label}</Link>
                  </motion.div>
                : <motion.button key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => handleNav(item)} className="font-inter text-white text-xl">{item.label}
                  </motion.button>
            ))}
            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_ITEMS.length * 0.05 }}
              onClick={() => { scrollToId('kontakt'); setOpen(false); }}
              className="mt-4 px-8 py-3 bg-accent text-dark font-inter font-semibold rounded-lg">
              Prozessanalyse buchen
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION 1 — Hero ────────────────────────────────────────────────────────
function HeroSection() {
  // One ref for all static text — same pattern as main branch.
  // Two-ref approach caused "Schluss mit" to stay hidden when the typewriter's
  // frequent re-renders disrupted GSAP's split-word animation on line2.
  const staticRef   = useRef<HTMLSpanElement>(null);
  const gsapDone    = useRef(false);
  const word        = useTypewriter(TW_WORDS);
  const [arrowVisible, setArrowVisible] = useState(true);

  useLayoutEffect(() => {
    if (gsapDone.current || !staticRef.current) return;
    gsapDone.current = true;
    const split = new SplitText(staticRef.current, { type: 'words' });
    gsap.from(split.words, { y: -60, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', delay: 0.1 });
  }, []);

  useEffect(() => {
    const h = () => { if (window.scrollY > 120) setArrowVisible(false); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16" style={{ scrollMarginTop: 80 }}>
      <div className="max-w-5xl mx-auto text-center w-full">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <Label>KI-Automatisierung · Made in Germany</Label>
        </motion.div>

        <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 sm:mb-10">
          {/* All static text in one span — GSAP SplitText animates all words together */}
          <span ref={staticRef} className="block">Euer Unternehmen läuft. Schluss mit</span>
          {/* Typewriter span is separate so React re-renders from word changes don't touch the GSAP-split span */}
          <span className="hero-tw-line block" style={{ color: '#00E5FF' }}>
            {word}<span className="tw-cursor">|</span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-inter text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          Wir bauen KI-Systeme, die repetitive Arbeit übernehmen, Systeme verbinden und Anfragen automatisch qualifizieren — damit euer Team sich auf das konzentriert, was wirklich Wert schafft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://cal.eu/cl-solutions/30min" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-inter font-semibold text-base rounded-xl hover:bg-accent/90 transition-colors animate-pulse-glow">
            Kostenlose Prozessanalyse — 30 Min.
            <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={() => scrollToId('prozess')}
            className="inline-flex items-center gap-2 px-7 py-4 font-inter font-medium text-base text-white border border-white/10 rounded-xl hover:border-accent/40 hover:text-accent transition-colors">
            Wie das funktioniert →
          </button>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <AnimatePresence>
        {arrowVisible && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.8 }}
            onClick={() => scrollToId('problem')}
            aria-label="Nach unten scrollen"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-accent/50 hover:text-accent/80 transition-colors animate-scroll-bounce">
            <ChevronDown className="w-5 h-5" />
            <ChevronDown className="w-5 h-5 -mt-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── SECTION 2 — Trust Bar ───────────────────────────────────────────────────
function TrustBar() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  const items = [
    { flag: '🇩🇪', text: 'Made in Germany' },
    { flag: '✓',   text: 'DSGVO-konform' },
    { flag: '⚡',   text: 'Angebot in 48h' },
    { flag: '🚀',  text: 'Erste Ergebnisse in 1–2 Wochen' },
  ];

  return (
    <div ref={ref} className="border-y border-white/5 bg-[rgba(0,229,255,0.02)] py-5 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2 text-center">
              <span className="text-lg leading-none">{item.flag}</span>
              <span className="font-inter text-sm text-gray-300 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION 3 — Problem ─────────────────────────────────────────────────────
function ProblemSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="problem" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>Für wen das passt</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Kommt euch das bekannt vor?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`${CARD} p-6 sm:p-7`}>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-syne font-semibold text-base sm:text-lg text-white mb-2 leading-snug">{p.title}</h3>
              <p className="font-inter text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4 — Services / Personalisierung ─────────────────────────────────
function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  const active = services[activeIdx];

  return (
    <section id="leistungen" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>Euer Einstieg</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Wo liegt euer größter Hebel?
          </h2>
        </div>

        {/* 4 clickable tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                activeIdx === i
                  ? 'bg-accent/10 border-accent/50 shadow-[0_0_20px_rgba(0,229,255,0.08)]'
                  : 'glass-card glass-card-interactive'
              }`}>
              <span className="text-xl mb-2 block">{s.emoji}</span>
              <span className="font-syne font-semibold text-white text-sm sm:text-base leading-tight block">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Expanding content — AnimatePresence for smooth swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <active.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-syne font-bold text-xl text-white">{active.title}</h3>
            </div>
            <p className="font-inter text-gray-300 text-base sm:text-lg leading-relaxed mb-6">{active.text}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span key={tag} className="font-inter text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── SECTION 5 — Über uns ─────────────────────────────────────────────────────
const aboutHighlights = [
  { icon: Users,  title: 'Berkay Aksoy & Marios Lysitsas', desc: 'Wir verstehen euer Business. Dann automatisieren wir es.' },
  { icon: MapPin, title: 'Made in Germany',                 desc: 'Deutsch, zuverlässig, DSGVO-konform' },
  { icon: Target, title: 'Ergebnisorientiert',              desc: 'Wir messen uns an eurem ROI' },
];

function AboutSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="ueber-uns" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — label + headline + text (matches main layout exactly) */}
          <div>
            <span ref={subRef as React.RefObject<HTMLSpanElement>}
              className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-3 sm:mb-4">
              Wer wir sind
            </span>
            <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
              className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
              Wir sind CL-Solutions
            </h2>
            <div className="space-y-3 sm:space-y-5 font-inter text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
              <p>Zwei junge Gründer mit einer klaren Mission: Deutschen Unternehmen den Zugang zu moderner KI-Technologie ermöglichen – ohne Buzzwords, ohne Überflüssiges.</p>
              <p>Als studierte Wirtschaftsingenieure und Controller verbinden wir fundiertes technisches Know-how mit tiefem Verständnis für betriebswirtschaftliche Zusammenhänge.</p>
            </div>
            <p className="font-inter text-gray-600 text-sm">Made in Germany · DSGVO-konform · Ergebnisorientiert</p>
          </div>

          {/* Right — 3 highlight cards + B/M avatar row (matches main layout exactly) */}
          <div className="space-y-3 sm:space-y-4">
            {aboutHighlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`${CARD} flex items-start gap-3 sm:gap-4 p-4 sm:p-5`}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-syne font-semibold text-white text-sm sm:text-base mb-0.5">{h.title}</h3>
                  <p className="font-inter text-gray-400 text-xs sm:text-sm">{h.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Avatar row — identical to main */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">B</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">M</div>
              </div>
              <div>
                <p className="font-inter text-white text-sm">Berkay &amp; Marios</p>
                <p className="font-inter text-gray-500 text-xs">Gründer, CL-Solutions</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6 — Demo Placeholder ────────────────────────────────────────────
function DemoSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="demo" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>In Aktion</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Nicht erklären. Zeigen.
          </h2>
        </div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full rounded-2xl border-2 border-dashed border-accent/40 bg-[rgba(0,229,255,0.03)] overflow-hidden"
          style={{ aspectRatio: '16/9' }}>
          {/* Placeholder badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="font-inter text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              Platzhalter
            </span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-4">
            {/* Play icon */}
            <div className="w-16 h-16 rounded-full border-2 border-accent/40 flex items-center justify-center mb-2">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-accent/60 ml-1" />
            </div>
            <p className="font-syne font-semibold text-white text-lg sm:text-xl">Demo-Video Platzhalter</p>
            <p className="font-inter text-gray-500 text-sm max-w-md">
              Hier kommt ein 90-Sekunden-Screenrecording eines echten automatisierten Workflows.<br />
              <span className="text-gray-600">Format: MP4 · Geplant: KW XX</span>
            </p>
          </div>
        </motion.div>

        <p className="font-inter text-gray-600 text-xs sm:text-sm text-center mt-5">
          Beispiel-Flows: Lead-Qualifizierung · CRM-Automatisierung · Voice Agent Eingang
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 7 — Showcase Slideshow ──────────────────────────────────────────
function ShowcaseSection() {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);
  const total        = showcaseCards.length;
  const touchStartX  = useRef(0);
  const ref          = useRef<HTMLDivElement>(null);
  const inView       = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + total) % total); };
  const next = () => { setDir(1);  setCurrent((c) => (c + 1) % total); };
  const goTo = (i: number) => { setDir(i > current ? 1 : -1); setCurrent(i); };

  const card = showcaseCards[current];

  return (
    <section id="showcase" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>Umgesetzte Lösungen</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Was wir gebaut haben
          </h2>
        </div>

        {/* Slideshow */}
        <div
          role="region"
          aria-label="Projektgalerie"
          tabIndex={0}
          className="outline-none"
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx > 50) prev();
            if (dx < -50) next();
          }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.32 }}
              className="glass-card rounded-2xl p-7 sm:p-10 border-dashed border border-accent/25">

              {/* Top row */}
              <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="font-inter text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                    {card.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-inter text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-3 py-1.5 rounded-full">
                    {card.badge}
                  </span>
                  <span className="font-inter text-xs text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1.5 rounded-full">
                    Platzhalter — wird befüllt
                  </span>
                </div>
              </div>

              <h3 className="font-syne font-bold text-xl sm:text-2xl text-white/50 mb-3 italic">{card.title}</h3>
              <p className="font-inter text-gray-300 text-base sm:text-lg leading-relaxed">{card.desc}</p>

              {/* Card counter */}
              <p className="font-inter text-gray-600 text-xs mt-6">{current + 1} / {total}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={prev} aria-label="Vorheriges Projekt"
            className="w-10 h-10 rounded-full glass-card glass-card-interactive flex items-center justify-center text-gray-400 hover:text-accent transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {showcaseCards.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Projekt ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`} />
          ))}

          <button onClick={next} aria-label="Nächstes Projekt"
            className="w-10 h-10 rounded-full glass-card glass-card-interactive flex items-center justify-center text-gray-400 hover:text-accent transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="font-inter text-gray-600 text-xs text-center mt-4">
          Pfeiltasten ← → zum Navigieren · Touch-Swipe auf Mobile
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 8 — Prozess ─────────────────────────────────────────────────────
function ProcessSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="prozess" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>Drei Schritte bis zu eurer Lösung</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            So starten wir zusammen
          </h2>
        </div>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5"
            style={{ left: 19, background: 'linear-gradient(to bottom, #00E5FF, rgba(0,229,255,0.2))', transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          />

          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 sm:gap-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}>
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: '#00E5FF' }}>
                  <span className="font-syne font-bold text-sm" style={{ color: '#0a0a0a' }}>{step.num}</span>
                </div>
                <div className="pt-1 pb-2">
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-white mb-2">{step.title}</h3>
                  <p className="font-inter text-gray-400 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9 — Zahlen / Stats ──────────────────────────────────────────────
function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="zahlen" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>In Zahlen</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Ergebnisse, die zählen
          </h2>
        </div>

        <div className="glass-card rounded-2xl p-8 sm:p-12">
          {/* 4 stats — 2×2 mobile, 4-col desktop. Each cell gets equal min-width. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                {s.kind === 'count'
                  ? <Counter end={s.end} suffix={s.suffix} label={s.label} active={inView} />
                  : s.kind === 'countdown'
                  ? <CountdownStat label={s.label} active={inView} />
                  : <div className="text-center">
                      <div className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white tabular-nums leading-none">{s.display}</div>
                      <div className="font-syne font-semibold text-lg sm:text-xl text-accent mt-1">Wochen</div>
                      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{s.label}</p>
                    </div>
                }
              </motion.div>
            ))}
          </div>

          {/* Tech logo scrolling banner */}
          <div className="border-t border-white/10 pt-8 overflow-hidden">
            <p className="font-inter text-gray-500 text-sm text-center mb-5">Womit wir arbeiten</p>
            <style>{`
              @keyframes logo-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .logo-track { display: flex; width: max-content; animation: logo-scroll 30s linear infinite; }
            `}</style>
            <div className="relative" style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}>
              <div className="logo-track">
                {[...techLogos, ...techLogos].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center flex-shrink-0 mx-7 sm:mx-9">
                    {logo.type === 'img'
                      ? <img src={logo.src} alt={logo.alt} style={{ height: 26, width: 'auto', opacity: 0.65 }} />
                      : <span className="font-inter font-semibold text-white/60 text-sm tracking-wide whitespace-nowrap">{logo.label}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10 — FAQ ─────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef, subRef } = useSplitHeadline(inView);

  return (
    <section id="faq" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span ref={subRef as React.RefObject<HTMLSpanElement>}>
            <Label>FAQ</Label>
          </span>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Häufige Fragen
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              className="glass-card glass-card-interactive rounded-xl px-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-5 flex items-center justify-between text-left group">
                <span className="font-syne font-semibold text-sm sm:text-base text-white group-hover:text-accent transition-colors pr-6">
                  {faq.q}
                </span>
                <div className="w-9 h-9 bg-white/[0.05] rounded-lg flex items-center justify-center flex-shrink-0">
                  {open === i
                    ? <Minus className="w-4 h-4 text-accent" />
                    : <Plus  className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                  }
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden">
                    <p className="font-inter text-gray-400 leading-relaxed pb-5 text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 11 — Finaler CTA ─────────────────────────────────────────────────
function CTASection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src   = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <section id="kontakt" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden">

          {/* Inner two-column layout */}
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(0,229,255,0.12)]">

            {/* ── Left column ── */}
            <div className="p-7 sm:p-10 flex flex-col">
              <Label>Kontakt</Label>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4 leading-tight">
                Zeigt uns einen Prozess, der euch täglich Zeit kostet.
              </h2>
              <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed mb-1">
                In 30 Minuten analysieren wir gemeinsam, was sich automatisieren lässt — konkret, kostenlos, ohne Verkaufsgespräch.
              </p>
              <p className="font-inter text-gray-600 text-xs sm:text-sm mb-8">
                Kein Risiko — das Erstgespräch ist kostenlos &amp; vollständig unverbindlich.
              </p>

              {/* Termin-Card */}
              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-syne font-semibold text-white text-sm">Termin vereinbaren</p>
                    <p className="font-inter text-gray-500 text-xs">30 Min., kostenlos &amp; unverbindlich</p>
                  </div>
                </div>
                <a href="https://cal.eu/cl-solutions/30min" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-accent text-dark font-syne font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group animate-pulse-glow">
                  Jetzt Termin buchen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="p-7 sm:p-10 flex flex-col">
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-2">Erstberatung anfragen</h3>
              <p className="font-inter text-gray-400 text-sm sm:text-base mb-7">
                Wir klären euren Bedarf persönlich, bevor ihr euch entscheidet.
              </p>

              <div className="space-y-3 mb-8">
                {['Kostenlose Analyse eurer Prozesse', 'Konkrete KI-Lösungsvorschläge', 'Transparente Kostenübersicht'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="font-inter text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                data-tally-open="2Evere"
                className="w-full py-3.5 px-6 bg-accent text-dark font-syne font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group mb-4">
                Jetzt Anfrage stellen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Chatbot hint */}
              <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] mt-auto">
                <MessageSquare className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="font-inter text-gray-400 text-xs sm:text-sm">
                  Unser KI-Chatbot rechts unten beantwortet die meisten Fragen sofort.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export function Home() {
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX    = useSpring(rawMouseX, { stiffness: 60, damping: 25 });
  const mouseY    = useSpring(rawMouseY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawMouseX.set(((e.clientX / window.innerWidth)  - 0.5) * 60);
    rawMouseY.set(((e.clientY / window.innerHeight) - 0.5) * 60);
  };

  const footer = (
    <footer className="bg-[#0a0a0a] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="CL-Solutions Logo" className="h-16 w-auto" />
              <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
            </div>
            <p className="font-inter text-gray-500 leading-relaxed max-w-sm text-sm">
              KI-Automatisierung für deutsche Unternehmen. Wir machen Technologie nutzbar — ohne Buzzwords.
            </p>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4 text-sm">Navigation</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href ?? item.id}>
                  {item.href
                    ? <Link to={item.href} className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{item.label}</Link>
                    : <button onClick={() => scrollToId(item.id!)} className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{item.label}</button>
                  }
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4 text-sm">Rechtliches</h4>
            <ul className="space-y-3">
              <li><Link to="/impressum"   className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">Impressum</Link></li>
              <li><Link to="/datenschutz" className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-sm">© {new Date().getFullYear()} CL-Solutions. Alle Rechte vorbehalten.</p>
          <p className="font-inter text-gray-600 text-sm">DSGVO-konform · Made in Germany · Remote-first</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-[#0a0a0a]" onMouseMove={handleMouseMove}>
      <CustomCursor />
      <ScrollProgressBar />
      <MouseGlow />

      {/* Fixed starfield background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarField mouseX={mouseX} mouseY={mouseY} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 32%, rgba(10,10,10,0.82) 100%)' }} />
      </div>

      {/* All content above starfield */}
      <div className="relative z-10">
        <Nav />
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <ServicesSection />
        <AboutSection />
        <DemoSection />
        <ShowcaseSection />
        <ProcessSection />
        <StatsSection />
        <FAQSection />
        <CTASection />
        {footer}
      </div>
    </div>
  );
}
