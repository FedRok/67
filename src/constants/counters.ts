import type { CounterKey, CounterState, Tone } from '../types';

export const initialCounters: CounterState = {
  six: 0,
  seven: 0,
  combo: 0,
  mystery: 0
};

export const toneByAction: Record<CounterKey, Tone> = {
  six: 'acid',
  seven: 'violet',
  combo: 'combo',
  mystery: 'danger'
};
