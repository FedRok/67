# SIX SEVEN LAB

Creative frontend experiment про абсурдный интернет-феномен **6-7**.

Это самостоятельный мемный интерактивный сайт/easter egg: тёмная cyber/glitch эстетика, coded-анимация рук, неоновые цифры, счётчики, мини-игра и озвучка “six seven” при запуске.

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

- Hero-анимация рук: сначала поднимается 6, затем 7.
- Кнопка “Сказать 6-7” запускает визуальный burst и произносит “six seven”.
- Кнопка “Сломать страницу” включает безопасный glitch/shake-эффект.
- Интерактивные кнопки 6, 7, 6-7 и ??? обновляют мемные сообщения.
- `67 Counter` хранит значения в `localStorage`.
- Мини-игра на 15 секунд начисляет 6 или 7 очков за пойманные цифры.
- FAQ, финальный CTA и кнопка очистки brainrot.
- Адаптивный layout с мобильным меню.

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

Если стандартный порт занят:

```bash
npm run dev -- --port 5677 --strictPort
```

## Проверка

```bash
npm run lint
npm run build
```

## Примечания

В проекте не используются внешние изображения, видео или аудио. Основная графика сделана через React, CSS, SVG и HTML-элементы.
