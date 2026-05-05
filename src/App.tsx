import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { FluidIntro } from './sections/FluidIntro';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Personal } from './sections/Personal';
import { Contact } from './sections/Contact';
import { Doodle } from './components/Sketchy';
import { ResumeSticky } from './components/ResumeSticky';
import { ScrollSystem } from './components/ScrollSystem';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [easterEgg, setEasterEgg] = useState<string | null>(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key.toLowerCase()].slice(-8);
      setKeys(newKeys);
      
      if (newKeys.join('').includes('optimize')) {
        setIsOptimized(true);
        setEasterEgg("System Optimized! Animations boosted.");
        setTimeout(() => setEasterEgg(null), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys]);

  const triggerEasterEgg = () => {
    const messages = [
      "You found a hidden sketch!",
      "Everything here is hand-drawn (mostly).",
      "Behlah loves systems and sketches.",
      "Keep exploring the storyboard!",
      "Try typing 'optimize' on your keyboard..."
    ];
    setEasterEgg(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setEasterEgg(null), 3000);
  };

  return (
    <div className={`min-h-screen selection:bg-ink-blue/10 selection:text-ink-blue relative ${isOptimized ? 'speed-boost' : ''}`}>
      <ScrollSystem />
      <Navbar isModalOpen={isModalOpen} />
      
      {/* Global Doodles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <Doodle type="scribble" interactive className="absolute top-1/4 -left-10 w-64 h-64 rotate-45" />
        <Doodle type="star" interactive className="absolute bottom-1/4 -right-10 w-48 h-48 -rotate-12" />
        <Doodle type="circle" interactive className="absolute top-3/4 left-1/2 w-32 h-32" />
      </div>

      <main className="relative z-10">
        <div className="relative max-w-7xl mx-auto px-6">
          <ResumeSticky onModalStateChange={setIsModalOpen} />
        </div>
        <Hero />
        <FluidIntro />
        <About />
        <Projects />
        <Experience />
        <Skills onModalStateChange={setIsModalOpen} />
        <Personal />
        <Contact />
      </main>

      <footer className="py-12 px-6 border-t border-pencil/5 text-center text-pencil/40 text-sm font-hand">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <motion.div 
            onClick={triggerEasterEgg}
            className="cursor-pointer hover:jitter"
          >
            <Doodle type="star" interactive className="w-8 h-8 text-ink-red" />
          </motion.div>
          <p>© {new Date().getFullYear()} Behlah Katleriwala. Sketched with React & Tailwind.</p>
        </div>
      </footer>

      {/* Easter Egg Toast */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-pencil text-paper rounded-lg font-hand text-lg paper-shadow z-[100]"
          >
            {easterEgg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
