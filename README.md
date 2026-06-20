# SIX SEVEN LAB

Мемный creative frontend experiment про абсурдный интернет-феномен **6-7**.

Это самостоятельный интерактивный сайт/easter egg: тёмная cyber/glitch-эстетика, неоновые цифры, реальные hand-ассеты из локальных референсов, счётчики, мини-игра, безопасная тряска страницы и озвучка “six seven”.

## Стек

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Web Speech API
- Web Audio API fallback

## Возможности

- Hero с референсными руками и неоновыми цифрами 6 и 7.
- Кнопка “Сказать 6-7” запускает визуальный burst и произносит “six seven”.
- Кнопка “Сломать страницу” включает безопасный glitch/shake-эффект.
- Интерактивные кнопки 6, 7, 6-7 и ??? обновляют мемные сообщения.
- `67 Counter` хранит значения в `localStorage`.
- Мини-игра на 15 секунд начисляет 6 или 7 очков за пойманные цифры.
- FAQ, финальный CTA и кнопка очистки brainrot.
- Адаптивный layout с мобильным меню.

## Ассеты

Локальные изображения лежат в `public/assets`:

- `six-seven-cutout.png` — основной hero-ассет с руками и цифрами на прозрачном фоне.
- `six-seven-dark.png` — исходный тёмный hero-референс.
- `six-seven-transparent.png` — дополнительный референсный ассет.
- `hand-six.png`, `hand-seven.png` — отдельные hand-референсы.
- `hand-six-cutout.png`, `hand-seven-cutout.png` — прозрачные мини-ассеты для секции анимации.
- `six.png`, `seven.png` — отдельные неоновые цифры.
- `67.mp3` — звук для кнопок “Запустить 6-7” и “Сказать 6-7”.

## Структура

```text
src/
  components/
    hero/
      AnimatedHands.tsx
      Hero.tsx
    layout/
      BackgroundFx.tsx
      EffectsOverlay.tsx
      Footer.tsx
      Header.tsx
    sections/
      AnimationSteps.tsx
      CounterSection.tsx
      FAQ.tsx
      InteractivePanel.tsx
      MemeIntro.tsx
      MiniGame.tsx
  constants/
    counters.ts
  data/
    memeData.ts
  hooks/
    useLocalStorageState.ts
  lib/
    audio.ts
    random.ts
  types/
    index.ts
  App.tsx
  index.css
  main.tsx
```

## Запуск

```bash
npm install
npm run dev
```

Если нужен фиксированный порт:

```bash
npm run dev -- --port 5677 --strictPort
```

## Проверка

```bash
npm run lint
npm run build
```
