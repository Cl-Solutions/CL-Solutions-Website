import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, UserX, Clock } from 'lucide-react';

const problems = [
  {
    icon: Globe,
    title: 'Veralteter Webauftritt',
    description: 'Ihre Website ist Ihr erster Eindruck. Wer online nicht überzeugt, verliert Kunden noch bevor das erste Gespräch stattfindet.',
  },
  {
    icon: UserX,
    title: 'Verpasste Leads',
    description: 'Keine sofortige Antwort? Ihr Interessent ist in Sekunden bei der Konkurrenz. Ihre Website muss ein 24/7-Verkäufer sein.',
  },
  {
    icon: Clock,
    title: 'Manuelle Prozesse & Zeitverlust',
    description: 'Stundenlange Routinearbeit frisst wertvolle Zeit. Excel-Listen, Copy-Paste, immer das Gleiche — während Wachstumschancen ungenutzt bleiben.',
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 lg:py-32 bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Ihr unsichtbarer Umsatzverlust
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Während Sie warten, kauft Ihr Kunde woanders
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-8 bg-dark-lighter/50 border border-dark-border rounded-2xl hover:border-accent/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <problem.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="font-syne font-semibold text-xl text-white mb-3">
                  {problem.title}
                </h3>

                <p className="font-inter text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
