import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Was kostet das?',
    answer:
      'Jede Leistung ist einzeln buchbar. Unsere Preise setzen sich aus zwei Komponenten zusammen: einer einmaligen Setup-Gebühr sowie einem optionalen monatlichen Support- und Wartungspaket. Die genauen Kosten hängen vom Projektumfang ab – transparent und individuell. Buchen Sie ein kostenloses Erstgespräch, um ein unverbindliches Angebot zu erhalten.',
  },
  {
    question: 'Wie lange dauert die Umsetzung?',
    answer:
      'Die meisten Projekte sind innerhalb von 2-4 Wochen einsatzbereit. Kleinere Automatisierungen können auch in wenigen Tagen umgesetzt werden. Wir arbeiten agil und liefern schnell erste Ergebnisse.',
  },
  {
    question: 'Brauche ich technisches Wissen?',
    answer:
      'Nein. Wir kümmern uns um alles Technische. Sie müssen nur wissen, welche Prozesse Sie verbessern möchten – wir zeigen Ihnen die Möglichkeiten und setzen sie um.',
  },
  {
    question: 'Funktioniert das auch für meine Branche?',
    answer:
      'Ja. Unsere Lösungen sind branchenunabhängig und werden individuell auf Ihre Bedürfnisse angepasst. Ob Handwerk, Dienstleistung oder E-Commerce – wir finden die richtige Lösung.',
  },
  {
    question: 'Was passiert nach der Umsetzung?',
    answer:
      'Wir lassen Sie nicht allein. Nach der Implementierung bieten wir Support und können bei Bedarf weitere Optimierungen vornehmen. Viele Kunden arbeiten langfristig mit uns zusammen.',
  },
  {
    question: 'Ist das DSGVO-konform?',
    answer:
      'Absolut. Als deutsches Unternehmen legen wir großen Wert auf Datenschutz. Alle unsere Lösungen sind DSGVO-konform und wir beraten Sie auch zu den rechtlichen Aspekten.',
  },
  {
    question: 'Bietet ihr rechtliche oder steuerliche Beratung an?',
    answer:
      'Nein. Wir sind eine Digitalagentur und bieten ausschließlich technische Dienstleistungen an. Für rechtliche oder steuerliche Fragen empfehlen wir einen Fachanwalt oder Steuerberater.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-dark-border"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-syne font-semibold text-lg text-white group-hover:text-accent transition-colors pr-8">
          {question}
        </span>
        <div className="w-10 h-10 bg-dark-lighter rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
          {isOpen ? (
            <Minus className="w-5 h-5 text-accent" />
          ) : (
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-inter text-gray-400 leading-relaxed pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="py-24 lg:py-32 bg-dark">
      <div ref={ref} className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Häufige Fragen
          </h2>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
