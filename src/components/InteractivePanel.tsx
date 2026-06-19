import { AnimatePresence, motion } from 'framer-motion';
import { Dices, MousePointerClick } from 'lucide-react';
import { useState } from 'react';
import { randomMemeCards } from '../data/memeData';
import type { CounterKey } from '../types';

type InteractivePanelProps = {
  onAction: (action: CounterKey) => string;
};

const actions: Array<{ key: CounterKey; label: string; className: string; aria: string }> = [
  { key: 'six', label: '6', className: 'meme-button-six', aria: 'Нажать мемную кнопку 6' },
  { key: 'seven', label: '7', className: 'meme-button-seven', aria: 'Нажать мемную кнопку 7' },
  { key: 'combo', label: '6-7', className: 'meme-button-combo', aria: 'Нажать мемную кнопку 6-7' },
  { key: 'mystery', label: '???', className: 'meme-button-mystery', aria: 'Нажать секретную кнопку' }
];

export default function InteractivePanel({ onAction }: InteractivePanelProps) {
  const [phrase, setPhrase] = useState('Нажми любую кнопку. Это не поможет, но будет красиво.');
  const [card, setCard] = useState(randomMemeCards[0]);
  const [pulseKey, setPulseKey] = useState(0);

  const handleClick = (action: CounterKey) => {
    const nextPhrase = onAction(action);
    setPhrase(nextPhrase);
    setPulseKey((current) => current + 1);

    if (Math.random() > 0.55 || action === 'mystery') {
      setCard(randomMemeCards[Math.floor(Math.random() * randomMemeCards.length)]);
    }
  };

  return (
    <section id="interactive" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <MousePointerClick className="h-4 w-4" />
          interactive absurd
        </p>
        <h2>Интерактивная панель 6-7</h2>
        <p>
          Четыре кнопки, ноль гарантий смысла. Каждый клик обновляет счётчики,
          вызывает микроанимацию и иногда выдаёт лабораторную карточку.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.44 }}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action.key}
                className={`meme-button ${action.className}`}
                type="button"
                aria-label={action.aria}
                onClick={() => handleClick(action.key)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="feature-card overflow-hidden"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.44 }}
        >
          <Dices className="h-7 w-7 text-violet" />
          <AnimatePresence mode="wait">
            <motion.div
              key={pulseKey}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <h3>{phrase}</h3>
              <p className="mt-3 rounded-md border border-violet/25 bg-violet/10 p-4 text-zinc-300">
                {card}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
