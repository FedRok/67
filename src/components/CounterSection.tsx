import { motion } from 'framer-motion';
import { RotateCcw, Save } from 'lucide-react';
import type { CounterState } from '../types';

type CounterSectionProps = {
  counters: CounterState;
  onReset: () => void;
};

const counterLabels = [
  { key: 'six', label: 'Нажато 6', accent: 'text-acid' },
  { key: 'seven', label: 'Нажато 7', accent: 'text-violet' },
  { key: 'combo', label: 'Нажато 6-7', accent: 'text-white' },
  { key: 'mystery', label: 'Нажато ???', accent: 'text-plasma' }
] as const;

export default function CounterSection({ counters, onReset }: CounterSectionProps) {
  const total = counters.six + counters.seven + counters.combo + counters.mystery;
  const brainrot = Math.min(
    100,
    Math.round(counters.six * 4 + counters.seven * 5 + counters.combo * 9 + counters.mystery * 7),
  );

  return (
    <section id="counter" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <Save className="h-4 w-4" />
          localStorage counter
        </p>
        <h2>67 Counter</h2>
        <p>
          Счётчики сохраняются в браузере. Перезагрузка страницы не спасает от статистики.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.44 }}
        >
          {counterLabels.map((item) => (
            <article key={item.key} className="stat-card">
              <p>{item.label}</p>
              <strong className={item.accent}>{counters[item.key]}</strong>
            </article>
          ))}
        </motion.div>

        <motion.article
          className="feature-card justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.44, delay: 0.06 }}
        >
          <div>
            <h3>Уровень brainrot</h3>
            <div className="mt-4 flex items-end justify-between gap-4">
              <span className="font-display text-6xl font-black text-white">{brainrot}%</span>
              <span className="pb-2 text-sm font-bold uppercase text-zinc-500">кликов всего: {total}</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-md border border-white/10 bg-white/5">
              <span
                className="block h-full rounded-md bg-gradient-to-r from-acid via-signal to-violet shadow-violet transition-all duration-500"
                style={{ width: `${brainrot}%` }}
              />
            </div>
          </div>

          <button className="btn btn-violet mt-7 w-full justify-center" type="button" onClick={onReset}>
            <RotateCcw className="h-5 w-5" />
            Очистить brainrot
          </button>
        </motion.article>
      </div>
    </section>
  );
}
