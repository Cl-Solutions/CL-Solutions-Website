import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  duration?: number;
}

function Counter({ end, suffix, label, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-syne font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-2">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-inter text-gray-400 text-lg">{label}</p>
    </div>
  );
}

const stats = [
  { end: 8, suffix: '+', label: 'Projekte abgeschlossen' },
  { end: 3, suffix: 'x', label: 'schnellere Prozesse' },
  { end: 100, suffix: '%', label: 'Remote & flexibel' },
];

export function Numbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            In Zahlen
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Ergebnisse, die zählen
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Counter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
