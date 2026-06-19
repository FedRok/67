type CodeHandProps = {
  side: 'left' | 'right';
  id: string;
};

function CodeHand({ side, id }: CodeHandProps) {
  const flip = side === 'right' ? 'translate(280 0) scale(-1 1)' : undefined;

  return (
    <svg className="code-hand" viewBox="0 0 280 240" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-skin`} x1="36" x2="238" y1="56" y2="198">
          <stop offset="0" stopColor="#ffd19f" />
          <stop offset="0.55" stopColor="#f2a86f" />
          <stop offset="1" stopColor="#a75443" />
        </linearGradient>
        <linearGradient id={`${id}-sleeve`} x1="60" x2="210" y1="176" y2="238">
          <stop offset="0" stopColor="#151a24" />
          <stop offset="1" stopColor="#05070d" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <g transform={flip}>
        <ellipse
          cx="150"
          cy="154"
          rx="100"
          ry="21"
          fill="#03050a"
          filter={`url(#${id}-soft)`}
          opacity="0.45"
        />
        <path
          d="M58 154c24-18 54-22 87-13 17 5 36 6 62-3 23-8 42 12 26 31-25 29-65 41-111 35-35-4-62-19-77-35-8-9 2-9 13-15Z"
          fill={`url(#${id}-skin)`}
        />
        <path
          d="M45 151c-16-15-23-31-14-40 11-11 35 17 53 38 6 7-19 19-39 2Z"
          fill={`url(#${id}-skin)`}
        />
        <rect x="88" y="183" width="82" height="58" rx="16" fill={`url(#${id}-sleeve)`} />
        <rect x="78" y="176" width="104" height="28" rx="14" fill="#171c27" />
        <rect x="93" y="176" width="78" height="9" rx="4" fill="#273041" opacity="0.74" />
        <path
          d="M80 151c37 13 94 16 149-10"
          fill="none"
          stroke="#ffe0bd"
          strokeLinecap="round"
          strokeWidth="6"
          opacity="0.55"
        />
        <circle cx="225" cy="151" r="12" fill="#ffd4a3" opacity="0.75" />
      </g>
    </svg>
  );
}

export default function AnimatedHands() {
  return (
    <div className="hands-stage" aria-label="Анимация: сначала поднимается рука с цифрой 6, затем рука с цифрой 7">
      <div className="stage-scanline" />
      <div className="stage-orbit stage-orbit-one" />
      <div className="stage-orbit stage-orbit-two" />

      <div className="hand-rig hand-rig-six">
        <span className="impact-rays impact-rays-six" />
        <span className="digit-beacon digit-beacon-six">6</span>
        <span className="lift-arrow lift-arrow-six">↑</span>
        <CodeHand side="left" id="hero-left" />
      </div>

      <div className="hand-rig hand-rig-seven">
        <span className="impact-rays impact-rays-seven" />
        <span className="digit-beacon digit-beacon-seven">7</span>
        <span className="lift-arrow lift-arrow-seven">↑</span>
        <CodeHand side="right" id="hero-right" />
      </div>
    </div>
  );
}
