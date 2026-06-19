import { AnimatePresence, motion } from 'framer-motion';
import { Play, RotateCcw, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type GameStatus = 'idle' | 'running' | 'finished';
type GameTarget = {
  id: number;
  digit: '6' | '7';
  x: number;
  y: number;
  rotation: number;
};

function createTarget(id: number): GameTarget {
  return {
    id,
    digit: Math.random() > 0.5 ? '7' : '6',
    x: 8 + Math.random() * 82,
    y: 10 + Math.random() * 68,
    rotation: -12 + Math.random() * 24
  };
}

function getResult(score: number) {
  if (score >= 140) {
    return 'brainrot confirmed';
  }

  if (score >= 70) {
    return 'опасный уровень 67';
  }

  return 'нормально';
}

export default function MiniGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<GameTarget[]>([]);
  const nextId = useRef(0);

  const startGame = () => {
    nextId.current = 0;
    setScore(0);
    setTimeLeft(15);
    setTargets([createTarget(++nextId.current), createTarget(++nextId.current)]);
    setStatus('running');
  };

  useEffect(() => {
    if (status !== 'running') {
      return;
    }

    const spawnInterval = window.setInterval(() => {
      setTargets((current) => {
        const nextTargets = [...current.slice(-9), createTarget(++nextId.current)];
        return nextTargets;
      });
    }, 620);

    const decayInterval = window.setInterval(() => {
      setTargets((current) => current.slice(-8));
    }, 1700);

    const timerInterval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setStatus('finished');
          setTargets([]);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(spawnInterval);
      window.clearInterval(decayInterval);
      window.clearInterval(timerInterval);
    };
  }, [status]);

  const clickTarget = (target: GameTarget) => {
    if (status !== 'running') {
      return;
    }

    setScore((current) => current + Number(target.digit));
    setTargets((current) => current.filter((item) => item.id !== target.id));
  };

  return (
    <section id="game" className="section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <p className="kicker">
          <Trophy className="h-4 w-4" />
          mini game
        </p>
        <h2>Поймай 6 и 7</h2>
        <p>
          За 15 секунд кликай по плавающим цифрам. 6 даёт 6 очков, 7 даёт 7 очков.
        </p>
      </motion.div>

      <motion.div
        className="game-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.44 }}
      >
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 text-sm font-bold uppercase text-zinc-300">
            <span className="game-pill">время: {timeLeft}</span>
            <span className="game-pill">очки: {score}</span>
            <span className="game-pill">статус: {status === 'running' ? 'ловим' : 'ожидание'}</span>
          </div>
          <button className="btn btn-acid justify-center" type="button" onClick={startGame}>
            {status === 'running' ? <RotateCcw className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {status === 'running' ? 'Заново' : 'Начать игру'}
          </button>
        </div>

        <div className="game-field" aria-label="Поле мини-игры с плавающими цифрами 6 и 7">
          {status !== 'running' && (
            <div className="game-idle">
              <span className="font-display text-6xl font-black text-white">67</span>
              <p>
                {status === 'finished'
                  ? `Результат: ${score} очков — ${getResult(score)}.`
                  : 'Нажми старт и лови цифры до окончания таймера.'}
              </p>
            </div>
          )}

          <AnimatePresence>
            {targets.map((target) => (
              <motion.button
                key={target.id}
                className={`game-target ${target.digit === '6' ? 'game-target-six' : 'game-target-seven'}`}
                type="button"
                aria-label={`Поймать цифру ${target.digit}`}
                initial={{ opacity: 0, scale: 0.45, rotate: target.rotation }}
                animate={{ opacity: 1, scale: [0.8, 1.08, 1], y: [0, -12, 0] }}
                exit={{ opacity: 0, scale: 0.35 }}
                transition={{ duration: 0.35 }}
                onClick={() => clickTarget(target)}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`
                }}
              >
                {target.digit}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
