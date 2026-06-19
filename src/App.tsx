import { useCallback, useMemo, useState } from 'react';
import { Hero } from './components/hero';
import { BackgroundFx, EffectsOverlay, Footer, Header } from './components/layout';
import {
  AnimationSteps,
  CounterSection,
  FAQ,
  InteractivePanel,
  MemeIntro,
  MiniGame
} from './components/sections';
import { initialCounters, toneByAction } from './constants/counters';
import { memePhrases } from './data/memeData';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { speakSixSeven } from './lib/audio';
import { pickRandom } from './lib/random';
import type { BurstDigit, CounterKey, CounterState, ToastMessage, Tone } from './types';

function App() {
  const [counters, setCounters] = useLocalStorageState<CounterState>(
    'six-seven-lab-counters',
    initialCounters,
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [bursts, setBursts] = useState<BurstDigit[]>([]);
  const [launchKey, setLaunchKey] = useState(0);
  const [isBroken, setIsBroken] = useState(false);

  const addToast = useCallback((text: string, tone: Tone = 'combo') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, text, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
  }, []);

  const addBurst = useCallback((value: BurstDigit['value'], tone: Tone) => {
    const id = Date.now() + Math.random();
    const digit: BurstDigit = {
      id,
      value,
      tone,
      x: 15 + Math.random() * 70,
      y: 18 + Math.random() * 58
    };

    setBursts((current) => [...current, digit]);
    window.setTimeout(() => {
      setBursts((current) => current.filter((item) => item.id !== id));
    }, 1300);
  }, []);

  const handleMemeAction = useCallback(
    (action: CounterKey) => {
      setCounters((current) => ({
        ...current,
        [action]: current[action] + 1
      }));

      const phrase = pickRandom(memePhrases[action]);
      const tone = toneByAction[action];
      addToast(phrase, tone);

      if (action === 'combo') {
        addBurst('67', 'combo');
      } else if (action === 'six') {
        addBurst('6', 'acid');
      } else if (action === 'seven') {
        addBurst('7', 'violet');
      } else {
        addBurst(Math.random() > 0.5 ? '6' : '7', 'danger');
      }

      return phrase;
    },
    [addBurst, addToast, setCounters],
  );

  const launchSixSeven = useCallback(() => {
    speakSixSeven();
    setLaunchKey((current) => current + 1);
    setCounters((current) => ({ ...current, combo: current.combo + 1 }));
    addToast('6-7 сказано вслух. Лаборатория довольна.', 'combo');
    addBurst('6', 'acid');
    window.setTimeout(() => addBurst('7', 'violet'), 170);
    window.setTimeout(() => addBurst('67', 'combo'), 360);
  }, [addBurst, addToast, setCounters]);

  const breakPage = useCallback(() => {
    setIsBroken(true);
    addToast('Страница слегка сломалась, но вежливо.', 'danger');
    addBurst('67', 'danger');
    window.setTimeout(() => addBurst('6', 'acid'), 140);
    window.setTimeout(() => addBurst('7', 'violet'), 260);
    window.setTimeout(() => setIsBroken(false), 900);
  }, [addBurst, addToast]);

  const resetBrainrot = useCallback(() => {
    setCounters(initialCounters);
    addToast('Brainrot очищен. На экране подозрительно тихо.', 'acid');
  }, [addToast, setCounters]);

  const totalClicks = useMemo(
    () => counters.six + counters.seven + counters.combo + counters.mystery,
    [counters],
  );

  return (
    <div className={isBroken ? 'is-page-broken' : undefined}>
      <BackgroundFx />
      <EffectsOverlay bursts={bursts} toasts={toasts} />
      <div className="relative z-10 min-h-screen overflow-hidden text-zinc-100">
        <Header onLaunch={launchSixSeven} />
        <main className="breakable">
          <Hero
            launchKey={launchKey}
            onBreakPage={breakPage}
            onSaySixSeven={launchSixSeven}
            totalClicks={totalClicks}
          />
          <AnimationSteps />
          <MemeIntro />
          <InteractivePanel onAction={handleMemeAction} />
          <CounterSection counters={counters} onReset={resetBrainrot} />
          <MiniGame />
          <FAQ />
          <Footer onLaunch={launchSixSeven} onReset={resetBrainrot} />
        </main>
      </div>
    </div>
  );
}

export default App;
