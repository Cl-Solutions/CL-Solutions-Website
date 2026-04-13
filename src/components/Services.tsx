import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  const [activeService, setActiveService] = useState(services[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setActiveService(service)}
              className={`px-6 py-3 rounded-full font-inter text-sm transition-all duration-300 ${
                activeService.id === service.id
                  ? 'bg-accent text-dark font-medium'
                  : 'bg-dark-lighter border border-dark-border text-gray-400 hover:border-accent/50 hover:text-white'
              }`}
            >
              {service.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-lighter/50 border border-dark-border rounded-3xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <activeService.icon className="w-8 h-8 text-accent" />
                </div>

                <h3 className="font-syne font-bold text-2xl lg:text-3xl text-white mb-4">
                  {activeService.title}
                </h3>

                <p className="font-inter text-gray-400 text-lg leading-relaxed mb-8">
                  {activeService.description}
                </p>

                <button
                  onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-accent text-dark font-inter font-medium rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Jetzt anfragen
                </button>
              </div>

              <div className="space-y-4">
                {activeService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-dark/50 rounded-xl border border-dark-border"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="font-inter text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveService(service)}
              className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                activeService.id === service.id
                  ? 'bg-accent/10 border-accent/50'
                  : 'bg-dark-lighter/30 border-dark-border hover:border-accent/30'
              }`}
            >
              <service.icon
                className={`w-8 h-8 mb-4 transition-colors ${
                  activeService.id === service.id ? 'text-accent' : 'text-gray-500 group-hover:text-accent'
                }`}
              />
              <h4 className="font-syne font-semibold text-white mb-2">{service.title}</h4>
              <p className="font-inter text-sm text-gray-500">{service.shortDesc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
