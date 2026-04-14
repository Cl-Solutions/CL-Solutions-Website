import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
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
const TOTAL = 8;           // total sections
const SPAN = 1 / TOTAL;    // 0.125 per section
const ENTER = SPAN * 0.18; // fade-in window
const EXIT  = SPAN * 0.18; // fade-out window

// ─── Content data ────────────────────────────────────────
const problems = [
  { icon: Globe,  title: 'Veralteter Webauftritt',         desc: 'Ihre Website ist Ihr erster Eindruck. Wer online nicht überzeugt, verliert Kunden noch bevor das erste Gespräch stattfindet.' },
  { icon: UserX,  title: 'Verpasste Leads',                desc: 'Keine sofortige Antwort? Ihr Interessent ist in Sekunden bei der Konkurrenz. Ihre Website muss ein 24/7-Verkäufer sein.' },
  { icon: Clock,  title: 'Manuelle Prozesse & Zeitverlust', desc: 'Stundenlange Routinearbeit frisst wertvolle Zeit. Excel-Listen, Copy-Paste — während Wachstumschancen ungenutzt bleiben.' },
];

const services = [
  { icon: Globe,      title: 'Website',                desc: 'Moderne, schnelle Websites, die Vertrauen schaffen und Besucher zu Kunden machen. SEO-optimiert, responsive, conversion-stark.' },
  { icon: MessageSquare, title: 'KI-Chatbot',          desc: 'Ihr digitaler Mitarbeiter beantwortet Fragen, qualifiziert Leads und bucht Termine automatisch ein — rund um die Uhr.' },
  { icon: Phone,      title: 'Voice Agent',            desc: 'Automatisierte Telefongespräche für Terminvereinbarungen, Erinnerungen und Kundenservice mit natürlicher Sprachverarbeitung.' },
  { icon: Workflow,   title: 'Prozessautomatisierung', desc: 'Wir verbinden Ihre Tools und automatisieren repetitive Aufgaben komplett — von Rechnungsstellung bis E-Mail-Workflows.' },
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
  { q: 'Was kostet das?',                       a: 'Jede Leistung ist einzeln buchbar. Unsere Preise bestehen aus einer einmaligen Setup-Gebühr und einem optionalen monatlichen Support-Paket. Buchen Sie ein kostenloses Erstgespräch für ein unverbindliches Angebot.' },
  { q: 'Wie lange dauert die Umsetzung?',        a: 'Die meisten Projekte sind innerhalb von 2–4 Wochen einsatzbereit. Kleinere Automatisierungen können in wenigen Tagen umgesetzt werden.' },
  { q: 'Brauche ich technisches Wissen?',        a: 'Nein. Wir kümmern uns um alles Technische. Sie müssen nur wissen, welche Prozesse Sie verbessern möchten — wir zeigen Ihnen die Möglichkeiten.' },
  { q: 'Funktioniert das auch für meine Branche?', a: 'Ja. Unsere Lösungen sind branchenunabhängig und werden individuell angepasst. Ob Handwerk, Dienstleistung oder E-Commerce.' },
  { q: 'Ist das DSGVO-konform?',                 a: 'Absolut. Als deutsches Unternehmen legen wir großen Wert auf Datenschutz. Alle Lösungen sind DSGVO-konform.' },
  { q: 'Was passiert nach der Umsetzung?',       a: 'Wir lassen Sie nicht allein. Nach der Implementierung bieten wir Support und können bei Bedarf weitere Optimierungen vornehmen.' },
];

// ─── Section wrapper with scroll-driven transitions ──────
function Panel({
  children,
  scrollYProgress,
  index,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const start = index * SPAN;
  const end   = start + SPAN;
  const s0 = index === 0 ? -0.02 : start;
  const s1 = index === 0 ? 0 : start + ENTER;
  const s2 = end - EXIT;
  const s3 = end;

  const opacity = useTransform(scrollYProgress, [s0, s1, s2, s3], [index === 0 ? 1 : 0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [s0, s1, s2, s3], [0.94, 1, 1, 1.04]);
  const y       = useTransform(scrollYProgress, [s0, s1, s2, s3], [index === 0 ? 0 : 48, 0, 0, -32]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{ opacity, scale, y }}
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
    const dur = 2200;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(e * end));
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
  const [open, setOpen] = useState(false);

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
              <button
                key={item.idx}
                onClick={() => goTo(item.idx)}
                className="font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => goTo(7)}
              className="px-5 py-2.5 bg-accent text-dark font-inter font-medium text-sm rounded-lg hover:bg-accent/90 transition-colors"
            >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 flex flex-col items-center gap-6 p-8 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { goTo(item.idx); setOpen(false); }}
                className="font-inter text-white text-xl"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.05 }}
              onClick={() => { goTo(7); setOpen(false); }}
              className="mt-4 px-8 py-3 bg-accent text-dark font-inter font-medium rounded-lg"
            >
              Erstgespräch buchen
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section dot navigation ──────────────────────────────
function Dots({ scrollYProgress, goTo }: { scrollYProgress: MotionValue<number>; goTo: (i: number) => void }) {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setCur(Math.min(TOTAL - 1, Math.floor(v * TOTAL + 0.5)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: TOTAL }, (_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          className={`rounded-full transition-all duration-300 ${
            i === cur
              ? 'w-2 h-4 bg-accent'
              : 'w-2 h-2 bg-white/20 hover:bg-white/50'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Section content ─────────────────────────────────────

function HeroPanel() {
  const words = 'Wir automatisieren. Ihr Wettbewerb schläft noch.'.split(' ');
  return (
    <div className="max-w-5xl mx-auto text-center w-full">
      <h1 className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-8">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05 }}
        className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
      >
        Automatisierung &amp; KI-Lösungen für deutsche Unternehmen.<br />
        Mehr Zeit. Mehr Umsatz. Weniger Stress.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <a
          href="https://cal.eu/cl-solutions/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-accent text-dark font-inter font-semibold text-lg rounded-lg hover:bg-accent/90 transition-colors animate-pulse-glow"
        >
          Kostenloses Erstgespräch
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-inter text-[10px] text-gray-600 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-accent rounded-full mt-2"
          />
        </motion.div>
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-accent/30 transition-colors"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <p.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-syne font-semibold text-xl text-white mb-3">{p.title}</h3>
            <p className="font-inter text-gray-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ServicesPanel() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">
          Unsere Leistungen
        </span>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Was wir für Sie tun</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="group p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-accent/30 transition-colors"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <s.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-syne font-bold text-2xl text-white mb-3">{s.title}</h3>
            <p className="font-inter text-gray-400 leading-relaxed">{s.desc}</p>
          </motion.div>
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl"
          >
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
          </motion.div>
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Counter end={s.end} suffix={s.suffix} label={s.label} active={active} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase block mb-4">
            Über uns
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-6">
            Wir sind CL-Solutions
          </h2>
          <div className="space-y-5 font-inter text-gray-400 text-lg leading-relaxed">
            <p>
              Zwei junge Gründer mit einer klaren Mission: Deutschen Unternehmen den Zugang zu moderner
              KI-Technologie ermöglichen – ohne Buzzwords, ohne Überflüssiges.
            </p>
            <p>
              Als studierte Wirtschaftsingenieure und Controller verbinden wir fundiertes technisches
              Know-how mit tiefem Verständnis für betriebswirtschaftliche Zusammenhänge.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl">
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
        </motion.div>
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
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full py-5 flex items-center justify-between text-left group"
            >
              <span className="font-syne font-semibold text-white group-hover:text-accent transition-colors pr-8">
                {faq.q}
              </span>
              <div className="w-9 h-9 bg-white/[0.05] rounded-lg flex items-center justify-center flex-shrink-0">
                {open === i
                  ? <Minus className="w-4 h-4 text-accent" />
                  : <Plus className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
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
                  className="overflow-hidden"
                >
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

          <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-syne font-semibold text-white">Termin vereinbaren</h3>
                <p className="font-inter text-gray-500 text-sm">30 Min., kostenlos &amp; unverbindlich</p>
              </div>
            </div>
            <a
              href="https://cal.eu/cl-solutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-accent text-dark font-inter font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group animate-pulse-glow"
            >
              Jetzt Termin buchen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-8">
          <h3 className="font-syne font-bold text-2xl text-white mb-3">Erstberatung anfragen</h3>
          <p className="font-inter text-gray-400 text-base mb-6">
            Wir klären Ihren Bedarf persönlich, bevor Sie sich entscheiden.
          </p>
          <div className="space-y-3 mb-8">
            {['Kostenlose Analyse Ihrer Prozesse', 'Konkrete KI-Lösungsvorschläge', 'Transparente Kostenübersicht'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-inter text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <button
            data-tally-open="2Evere"
            className="w-full py-4 px-6 bg-accent text-dark font-syne font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group"
          >
            Jetzt Anfrage stellen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Home ────────────────────────────────────────────────
export function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const [numbersActive, setNumbersActive] = useState(false);

  // Track when Numbers section (index 4) is active for counter animation
  useEffect(() => {
    const s4start = 4 * SPAN + ENTER;
    const s4end   = 5 * SPAN - EXIT;
    const unsub = scrollYProgress.on('change', (v) => {
      setNumbersActive(v >= s4start && v <= s4end);
    });
    return unsub;
  }, [scrollYProgress]);

  // Scroll to section by index
  const goTo = (index: number) => {
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    const target = (index / TOTAL) * totalH;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  // Footer stays outside the scroll-pinned area — render normally below
  const sections = [
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
    <div className="bg-[#0a0a0a]">
      <Nav goTo={goTo} />
      <Dots scrollYProgress={scrollYProgress} goTo={goTo} />

      {/* Scroll container — defines total scroll height */}
      <div style={{ height: `${TOTAL * 150}vh` }} className="relative">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Starfield canvas */}
          <StarField scrollY={scrollY} />

          {/* Vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.75) 100%)' }}
          />

          {/* Section panels */}
          <div className="absolute inset-0 z-20">
            {sections.map((content, i) => (
              <Panel key={i} scrollYProgress={scrollYProgress} index={i}>
                {content}
              </Panel>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — below scroll area */}
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
                    <button
                      onClick={() => goTo(item.idx)}
                      className="font-inter text-gray-500 hover:text-accent transition-colors text-sm"
                    >
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
            <p className="font-inter text-gray-600 text-sm">
              {new Date().getFullYear()} CL-Solutions. Alle Rechte vorbehalten.
            </p>
            <p className="font-inter text-gray-600 text-sm">Made with precision in Germany</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
