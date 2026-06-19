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
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance('six seven');
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 0.76;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
    return;
  }

  playFallbackTone();
}
