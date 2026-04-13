import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-dark-lighter/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Kontakt
            </span>
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Bereit für den nächsten Schritt?
            </h2>

            <p className="font-inter text-gray-400 text-lg leading-relaxed mb-8">
              Lassen Sie uns in einem kostenlosen Erstgespräch herausfinden, wie wir
              Ihre Prozesse automatisieren können. Keine Verpflichtungen, nur Klarheit.
            </p>

            <div className="bg-dark border border-dark-border rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-syne font-semibold text-white">
                    Termin vereinbaren
                  </h3>
                  <p className="font-inter text-gray-500 text-sm">Der direkte Weg für Entschlossene</p>
                </div>
              </div>
              <p className="font-inter text-gray-400 text-sm mb-4">
                30 Minuten, kostenlos und unverbindlich. Wir analysieren Ihre Situation und zeigen Ihnen konkrete Möglichkeiten wie z.B. die Anruf-KI.
              </p>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-4">
              <h3 className="font-syne font-bold text-2xl text-white mb-3">
                Erstberatung anfragen
              </h3>
              <p className="font-inter text-gray-400 text-base mb-6">
                Fragen vorab? Wir klären Ihren Bedarf persönlich, bevor Sie sich entscheiden.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-inter text-gray-300">Kostenlose Analyse Ihrer Prozesse</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-inter text-gray-300">Konkrete KI-Lösungsvorschläge</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-inter text-gray-300">Transparente Kostenübersicht</span>
                </div>
              </div>

              <button
                data-tally-open="2Evere"
                className="bg-accent hover:bg-accent/90 text-dark font-syne font-semibold py-4 px-6 rounded-xl w-full text-base flex items-center justify-center gap-2 transition-colors group"
              >
                Jetzt Anfrage stellen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-dark/50 border border-dark-border rounded-xl">
              <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-inter text-gray-400 text-sm">
                Unser KI-Chatbot rechts unten beantwortet die meisten Fragen sofort.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
