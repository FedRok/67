const sixSevenSoundSrc = '/assets/67.mp3';

let sixSevenAudio: HTMLAudioElement | null = null;

function getSixSevenAudio() {
  if (!sixSevenAudio) {
    sixSevenAudio = new Audio(sixSevenSoundSrc);
    sixSevenAudio.preload = 'auto';
    sixSevenAudio.volume = 0.95;
  }

  return sixSevenAudio;
}

function playFallbackTone() {
  const browserWindow = window as typeof window & {
    webkitAudioContext?: typeof AudioContext;
  };
  const AudioContextConstructor = browserWindow.AudioContext || browserWindow.webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  const audioContext = new AudioContextConstructor();
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.42);
  gain.connect(audioContext.destination);

  [392, 466.16].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + index * 0.16);
    oscillator.connect(gain);
    oscillator.start(audioContext.currentTime + index * 0.16);
    oscillator.stop(audioContext.currentTime + index * 0.16 + 0.18);
  });

  window.setTimeout(() => void audioContext.close(), 650);
}

export function speakSixSeven() {
  const audio = getSixSevenAudio();
  audio.pause();
  audio.currentTime = 0;

  void audio.play().catch(() => {
    playFallbackTone();
  });
}
