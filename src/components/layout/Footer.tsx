import { motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

type FooterProps = {
  onLaunch: () => void;
  onReset: () => void;
};

export default function Footer({ onLaunch, onReset }: FooterProps) {
  const handleLaunch = () => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(onLaunch, 240);
  };

  return (
    <footer className="section-shell pb-8">
      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <Sparkles className="h-4 w-4" />
          final protocol
        </p>
        <h2>Если ты понял — ты проиграл</h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="btn btn-acid justify-center" type="button" onClick={handleLaunch}>
            <Sparkles className="h-5 w-5" />
            Запустить ещё раз
          </button>
          <button className="btn btn-violet justify-center" type="button" onClick={onReset}>
            <RotateCcw className="h-5 w-5" />
            Очистить brainrot
          </button>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <a href="#hero" className="focus-ring rounded-md font-display text-lg font-black text-white">
          SIX SEVEN <span className="text-violet">LAB</span>
        </a>
        <p>Сайт создан как creative frontend experiment.</p>
      </div>
    </footer>
  );
}
