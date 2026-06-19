export type CounterKey = 'six' | 'seven' | 'combo' | 'mystery';

export type CounterState = Record<CounterKey, number>;

export type Tone = 'acid' | 'violet' | 'combo' | 'danger';

export type ToastMessage = {
  id: number;
  text: string;
  tone: Tone;
};

export type BurstDigit = {
  id: number;
  value: '6' | '7' | '67';
  tone: Tone;
  x: number;
  y: number;
};
