import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Cog, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analyse',
    description: 'Wir analysieren Ihre Website und Prozesse, um Verbesserungs- und Automatisierungspotenzial zu identifizieren.',
  },
  {
    number: '02',
    icon: Cog,
    title: 'Umsetzung',
    description: 'Wir entwickeln und implementieren maßgeschneiderte Lösungen, die nahtlos in Ihr Unternehmen integriert werden.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Ergebnisse',
    description: 'Schnell geliefert: Sie sparen Zeit, gewinnen Kunden und skalieren ohne zusätzlichen Aufwand.',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="prozess" className="py-24 lg:py-32 bg-dark-lighter/30">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Unser Prozess
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            So arbeiten wir zusammen
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dark-border to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-dark p-8 rounded-2xl border border-dark-border group hover:border-accent/30 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6">
                    <span className="font-syne font-bold text-6xl lg:text-8xl text-accent/10 group-hover:text-accent/20 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative pt-8 lg:pt-12">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <step.icon className="w-7 h-7 text-accent" />
                    </div>

                    <h3 className="font-syne font-semibold text-xl text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="font-inter text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 w-12 items-center justify-center -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                      className="w-4 h-4 bg-accent rounded-full"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
