import { motion } from 'framer-motion';
import { Bomb, RadioTower, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedHands from './AnimatedHands';

type HeroProps = {
  launchKey: number;
  totalClicks: number;
  onSaySixSeven: () => void;
  onBreakPage: () => void;
};

export default function Hero({ launchKey, totalClicks, onSaySixSeven, onBreakPage }: HeroProps) {
  const [isImpact, setIsImpact] = useState(false);

  useEffect(() => {
    if (launchKey === 0) {
      return;
    }

    setIsImpact(true);
    const timeout = window.setTimeout(() => setIsImpact(false), 780);
    return () => window.clearTimeout(timeout);
  }, [launchKey]);

  return (
    <section id="hero" className="section-shell min-h-screen pt-24">
      <div className="hero-panel">
        <div className="hero-copy">
          <motion.p
            className="kicker"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <RadioTower className="h-4 w-4" />
            протокол абсурда онлайн
          </motion.p>

          <motion.h1
            className={`glitch-title lg:whitespace-nowrap ${isImpact ? 'impact-pop' : ''}`}
            data-text="6 или 7?"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.56 }}
          >
            <span className="text-white">6 или </span>
            <span className="text-violet">7?</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.56 }}
          >
            Интерактивный сайт о самом бессмысленном числе интернета. Серьёзная
            лаборатория, которая изучает две цифры, поднятые с неоправданной драмой.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.56 }}
          >
            <button className="btn btn-acid" type="button" onClick={onSaySixSeven} aria-label="Сказать 6-7">
              <Sparkles className="h-5 w-5" />
              Сказать 6-7
            </button>
            <button
              className="btn btn-violet"
              type="button"
              onClick={onBreakPage}
              aria-label="Запустить безопасный glitch-эффект"
            >
              <Bomb className="h-5 w-5" />
              Сломать страницу
            </button>
          </motion.div>

          <motion.div
            className="hero-status"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.56 }}
          >
            <span>сигналов нажато: {totalClicks}</span>
            <span>цикл: 6 ↑ / 7 ↑ / повтор</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.62 }}
        >
          <AnimatedHands />
          <span className="hero-doodle hero-doodle-left">67?</span>
          <span className="hero-doodle hero-doodle-right">??</span>
          <span className="hero-doodle hero-doodle-bottom">без смысла</span>
        </motion.div>
      </div>
    </section>
  );
}
