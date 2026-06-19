import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../data/memeData';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <HelpCircle className="h-4 w-4" />
          faq
        </p>
        <h2>Вопросы, которые лучше не задавать</h2>
        <p>Но если уже задал — лаборатория ответит максимально уверенно.</p>
      </motion.div>

      <div className="mx-auto max-w-4xl space-y-3">
        {faqItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.article
              key={item.question}
              className="faq-item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.36, delay: index * 0.04 }}
            >
              <button
                className="focus-ring flex w-full items-center justify-between gap-4 rounded-md text-left"
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(isActive ? -1 : index)}
              >
                <span>{item.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isActive ? 'rotate-180' : ''}`} />
              </button>
              {isActive && <p>{item.answer}</p>}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
