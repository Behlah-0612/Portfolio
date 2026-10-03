import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X, FileText, Mail } from 'lucide-react';
import { AnimatedWord, Emblem } from './BrandMark';
import { EMAIL, RESUME_URL } from '../data/links';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Beyond Code', id: 'personal' },
  { name: 'Contact', id: 'contact' },
];

export function Navbar({ isModalOpen }: { isModalOpen?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [active, setActive] = useState<string>('');
  const [waveKey, setWaveKey] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setBrandVisible(window.scrollY > 520);
      // Highlight the section whose top has passed just under the bar.
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The wordmark catches a wave of light each time the visitor moves to a new section.
  useEffect(() => {
    setWaveKey((k) => k + 1);
  }, [active]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || menuOpen ? 'bg-paper/85 backdrop-blur-md border-b border-pencil/10' : 'bg-transparent border-b border-transparent',
        isModalOpen && 'opacity-0 pointer-events-none'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Primary">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Behlah Katleriwala, back to top"
          aria-hidden={!brandVisible}
          tabIndex={brandVisible ? 0 : -1}
          className={cn(
            'font-display flex items-center gap-3 text-lg font-bold leading-none tracking-[-0.02em] text-pencil transition-all duration-300',
            brandVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
          )}
        >
          <Emblem progress={progress} className="h-9 w-9 shrink-0 text-pencil" />
          <AnimatedWord text="Behlah Katleriwala" mode="trigger" waveKey={waveKey} baseDelay={0.1} />
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                active === item.id ? 'text-ink-blue' : 'text-pencil/70 hover:text-pencil'
              )}
            >
              {item.name}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-lg border border-pencil/25 px-4 py-2 text-sm font-semibold text-pencil hover:bg-pencil/5 transition-colors"
          >
            <FileText className="w-4 h-4" />
            View Resume
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-ink-blue px-4 py-2 text-sm font-semibold text-paper hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden p-2 -mr-2 text-pencil"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-pencil/10 px-6 pb-6 pt-2"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left py-3 text-lg font-medium text-pencil border-b border-pencil/5"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink-blue px-4 min-h-[48px] text-sm font-semibold text-paper"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-pencil/25 px-4 min-h-[48px] text-sm font-semibold text-pencil"
            >
              <Mail className="w-4 h-4" />
              Email Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
