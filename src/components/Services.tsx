import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, MessageSquare, Phone, Workflow } from 'lucide-react';

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

export function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    <section id="leistungen" className="py-24 lg:py-32 bg-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Unsere Leistungen
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Was wir für Sie tun
          </h2>
        </motion.div>

        {/* Nav cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isActive = activeIdx === idx;
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => scrollToService(idx)}
                className={`flex flex-col items-start p-3 lg:p-4 rounded-xl border transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-accent/10 border-accent/60 text-white'
                    : 'bg-dark-lighter/30 border-dark-border text-gray-400 hover:border-accent/30 hover:text-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 transition-colors ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                <span className="font-syne font-semibold text-sm leading-tight">{service.title}</span>
                <span className="font-inter text-xs text-gray-500 mt-0.5">{service.shortDesc}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Scroll-snap container */}
        <div
          ref={scrollRef}
          data-scroll-no-bar
          style={{
            height: 'clamp(280px, 36vh, 360px)',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
          className="rounded-2xl border border-dark-border bg-dark-lighter/50"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                style={{
                  height: 'clamp(280px, 36vh, 360px)',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                }}
                className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center p-6 lg:p-10"
              >
                {/* Left: icon, title, desc, CTA */}
                <div className="flex flex-col justify-center">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-syne font-bold text-xl lg:text-2xl text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="font-inter text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button
                    onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                    className="self-start px-5 py-2.5 bg-accent text-dark font-inter font-medium text-sm rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Jetzt anfragen
                  </button>
                </div>

                {/* Right: features */}
                <div className="space-y-2.5">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2.5 bg-dark/50 rounded-lg border border-dark-border"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="font-inter text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
