import { AnimatePresence, motion } from 'framer-motion';
import type { BurstDigit, ToastMessage } from '../../types';

type EffectsOverlayProps = {
  bursts: BurstDigit[];
  toasts: ToastMessage[];
};

const toneClass = {
  acid: 'text-acid shadow-acid',
  violet: 'text-violet shadow-violet',
  combo: 'text-white shadow-violet',
  danger: 'text-plasma shadow-violet'
};

export default function EffectsOverlay({ bursts, toasts }: EffectsOverlayProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((digit) => (
          <motion.span
            key={digit.id}
            className={`absolute font-display text-7xl font-black ${toneClass[digit.tone]} md:text-9xl`}
            initial={{ opacity: 0, scale: 0.35, rotate: -9 }}
            animate={{ opacity: [0, 1, 0], scale: [0.35, 1.18, 1.5], rotate: [12, -6, 7] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: 'easeOut' }}
            style={{
              left: `${digit.x}%`,
              top: `${digit.y}%`,
              textShadow:
                digit.tone === 'acid'
                  ? '0 0 35px rgba(154,255,53,.82)'
                  : '0 0 35px rgba(168,85,247,.86)'
            }}
          >
            {digit.value}
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="absolute right-4 top-24 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3 md:right-8">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className="toast-card"
              initial={{ opacity: 0, x: 36, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 28 }}
              transition={{ duration: 0.24 }}
            >
              <span className={`toast-dot toast-${toast.tone}`} />
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
