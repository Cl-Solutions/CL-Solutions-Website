import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Users, Target } from 'lucide-react';

const highlights = [
  {
    icon: Users,
    title: 'Berkay Aksoy & Marios Lysitsas',
    description: 'Jung, engagiert und motiviert für Ihr Projekt',
  },
  {
    icon: MapPin,
    title: 'Made in Germany',
    description: 'Deutsch, zuverlässig, DSGVO-konform',
  },
  {
    icon: Target,
    title: 'Ergebnisorientiert',
    description: 'Wir messen uns an Ihrem ROI',
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ueber-uns" className="py-24 lg:py-32 bg-dark-lighter/30" aria-labelledby="about-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Über uns
            </span>
            <h2 id="about-heading" className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Wir sind CL-Solutions
            </h2>

            <div className="space-y-6 font-inter text-gray-400 text-lg leading-relaxed">
              <p>
                Zwei junge Gründer mit einer klaren Mission: Deutschen Unternehmen den Zugang zu moderner
                KI-Technologie ermöglichen – ohne Buzzwords, ohne Überflüssiges.
              </p>
              <p>
                Wir arbeiten hauptsächlich remote – das bedeutet für Sie: schnelle Umsetzung, keine
                Terminabhängigkeit und volle Flexibilität. Bei Bedarf und wenn die Nähe es erlaubt,
                kommen wir auch persönlich zu Ihnen ins Unternehmen.
              </p>
              <p>
                Als studierte Wirtschaftsingenieure und Controller verbinden wir fundiertes technisches
                Know-how mit tiefem Verständnis für betriebswirtschaftliche Zusammenhänge. Unsere
                Erfahrung aus der deutschen Industrie-, Automotive- und Finanzbranche ermöglicht es uns,
                KI-Lösungen zu entwickeln, die nicht nur technisch funktionieren, sondern echten
                Geschäftswert schaffen.
              </p>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent rounded-3xl blur-2xl" />

            <div className="relative bg-dark border border-dark-border rounded-2xl p-8 lg:p-10">
              <div className="space-y-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-syne font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="font-inter text-gray-400 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-dark-border">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-dark font-syne font-bold">
                      B
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-dark font-syne font-bold">
                      M
                    </div>
                  </div>
                  <div>
                    <p className="font-inter text-white text-sm">Berkay & Marios</p>
                    <p className="font-inter text-gray-500 text-xs">
                      Gründer, CL-Solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
