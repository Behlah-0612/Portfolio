import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { FluidIntro } from './sections/FluidIntro';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Personal } from './sections/Personal';
import { Contact } from './sections/Contact';
import { BackgroundField } from './components/BackgroundField';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen selection:bg-ink-blue/20 relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink-blue focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <BackgroundField />
      <Navbar isModalOpen={isModalOpen} />

      <main id="main" className="relative z-10">
        <Hero />
        <FluidIntro />
        <About />
        <Projects />
        <Experience />
        <Skills onModalStateChange={setIsModalOpen} />
        <Personal />
        <Contact />
      </main>

      <footer className="py-10 px-6 border-t border-pencil/10 text-pencil/55 text-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <p className="m-0">© {new Date().getFullYear()} Behlah Katleriwala</p>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
