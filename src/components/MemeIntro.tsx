import { motion } from 'framer-motion';
import { Brain, FlaskConical, ScanLine } from 'lucide-react';

const introCards = [
  {
    icon: Brain,
    title: 'Смысла нет',
    text: '6-7 не просит быть понятым. Он просто появляется, светится и оставляет после себя вопросительный знак.'
  },
  {
    icon: FlaskConical,
    title: 'Зато есть метод',
    text: 'Нажимай кнопки, наблюдай счётчики, фиксируй всплески brainrot. Очень научно, почти подозрительно.'
  },
  {
    icon: ScanLine,
    title: 'Глитч обязателен',
    text: 'Если мем нельзя объяснить, его нужно подсветить, встряхнуть и обвести неоном.'
  }
];

export default function MemeIntro() {
  return (
    <section id="meme" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <Brain className="h-4 w-4" />
          что это вообще
        </p>
        <h2>Слишком серьёзное объяснение бессмысленного мема</h2>
        <p>
          6-7 — абсурдный интернет-феномен без фиксированного смысла. Он живёт в
          повторении, неожиданной подаче и коллективном ощущении: «почему это вообще смешно?»
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {introCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              className="feature-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: index * 0.07 }}
            >
              <Icon className="h-7 w-7 text-acid" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
