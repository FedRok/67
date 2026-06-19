const particles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 29) % 100}%`,
  top: `${(index * 47) % 100}%`,
  delay: `${(index % 9) * 0.55}s`,
  size: index % 4 === 0 ? 'h-1.5 w-1.5' : 'h-1 w-1',
  tone: index % 3 === 0 ? 'bg-acid' : index % 3 === 1 ? 'bg-violet' : 'bg-signal'
}));

const glitchLines = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  top: `${6 + index * 6}%`,
  delay: `${index * 0.28}s`,
  width: `${8 + ((index * 17) % 28)}%`,
  left: `${(index * 23) % 82}%`
}));

export default function BackgroundFx() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(154,255,53,0.12),transparent_32%),radial-gradient(circle_at_72%_8%,rgba(168,85,247,0.17),transparent_30%),radial-gradient(circle_at_55%_82%,rgba(34,211,238,0.08),transparent_34%)]" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
      {glitchLines.map((line) => (
        <span
          key={line.id}
          className="glitch-line"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            animationDelay: line.delay
          }}
        />
      ))}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`particle ${particle.size} ${particle.tone}`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay
          }}
        />
      ))}
      <span className="scribble-note left-[5%] top-[27%] rotate-[-13deg]">67?</span>
      <span className="scribble-note right-[8%] top-[25%] rotate-[6deg]">why not</span>
      <span className="scribble-note left-[8%] bottom-[18%] rotate-[10deg]">без смысла</span>
    </div>
  );
}
