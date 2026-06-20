import { Menu, Sparkles, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../../data/memeData';

type HeaderProps = {
  onLaunch: () => void;
};

export default function Header({ onLaunch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLaunch = () => {
    setIsOpen(false);
    onLaunch();
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-void/76 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a
          href="#hero"
          className="focus-ring group flex items-center gap-2 rounded-md font-display text-xl font-black uppercase tracking-normal text-white"
          aria-label="SIX SEVEN LAB, перейти на главный экран"
        >
          <Sparkles className="h-5 w-5 text-acid transition-transform group-hover:rotate-12" />
          SIX SEVEN <span className="text-violet">LAB</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-bold uppercase text-zinc-300 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} className="nav-link focus-ring rounded-sm" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="btn btn-violet" type="button" onClick={handleLaunch}>
            <Zap className="h-4 w-4" />
            Запустить 6-7
          </button>
        </div>

        <button
          className="focus-ring relative z-50 ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/25 bg-white/10 text-acid shadow-acid lg:hidden"
          type="button"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-void/95 px-4 py-4 shadow-violet lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 text-sm font-bold uppercase text-zinc-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="focus-ring rounded-md border border-white/10 bg-white/[0.03] px-3 py-3"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="btn btn-violet mt-2 justify-center" type="button" onClick={handleLaunch}>
              <Zap className="h-4 w-4" />
              Запустить 6-7
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
