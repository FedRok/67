import { motion } from 'framer-motion';
import { Repeat2 } from 'lucide-react';
import { animationSteps } from '../../data/memeData';

type MiniStepProps = {
  digit: '6' | '7';
  tone: 'acid' | 'violet';
  raised: boolean;
};

function MiniStep({ digit, tone, raised }: MiniStepProps) {
  return (
    <div className="mini-step" aria-hidden="true">
      <span className={`mini-digit mini-digit-${tone} ${raised ? 'mini-raised' : ''}`}>{digit}</span>
      <span className={`mini-arrow ${tone === 'acid' ? 'text-acid' : 'text-violet'}`}>
        {raised ? '↑' : '↓'}
      </span>
      <span className="mini-hand">
        <span className="mini-palm" />
        <span className="mini-thumb" />
        <span className="mini-sleeve" />
      </span>
    </div>
  );
}

export default function AnimationSteps() {
  return (
    <section id="animation" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <Repeat2 className="h-4 w-4" />
          hand cycle
        </p>
        <h2>Анимация рук 6 и 7</h2>
        <p>
          Цикл работает как маленький лабораторный ритуал: сначала 6 получает весь
          лаймовый драматизм, затем 7 отвечает фиолетовым.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {animationSteps.map((step, index) => (
          <motion.article
            key={step.title}
            className="feature-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.42, delay: index * 0.06 }}
          >
            <span className="text-sm font-black uppercase text-zinc-400">0{index + 1}</span>
            <MiniStep digit={step.digit} tone={step.tone} raised={step.raised} />
            <h3>{step.title}</h3>
            <p>{step.label}</p>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-5 text-center text-sm font-bold uppercase text-zinc-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        цикл повторяется
      </motion.p>
    </section>
  );
}
