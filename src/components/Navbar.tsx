import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Doodle, SketchyBorder, Hint } from './Sketchy';

export function Navbar({ isModalOpen }: { 
  isModalOpen?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navItems = [
    { name: 'About', id: 'about', pos: 'top-10 left-10', rotate: -5 },
    { name: 'Projects', id: 'projects', pos: 'top-40 right-10', rotate: 3 },
    { name: 'Timeline', id: 'experience', pos: 'top-[40%] left-4', rotate: -2 },
    { name: 'Toolkit', id: 'skills', pos: 'top-[60%] right-4', rotate: 5 },
    { name: 'OffScript', id: 'personal', pos: 'bottom-40 left-10', rotate: -3 },
    { name: 'Contact', id: 'contact', pos: 'bottom-10 right-10', rotate: 2 },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Floating Navigation Nodes */}
      <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
        {navItems.map((item) => (
          <NavNode 
            key={item.id} 
            item={item} 
            scrollY={scrollY} 
            onClick={() => scrollTo(item.id)} 
          />
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-6 right-6 z-[60] lg:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-4 bg-paper paper-shadow wobbly-border text-pencil"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-paper z-[55] lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.id)}
                className="text-4xl font-hand hover:text-ink-blue transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

function NavNode({ item, scrollY, onClick }: { item: any; scrollY: any; onClick: () => void; key?: string }) {
  const yOffset = useTransform(scrollY, [0, 2000], [0, (item.id.length % 3 + 1) * 100]);
  
  return (
    <motion.div
      style={{ y: yOffset }}
      className={cn("absolute pointer-events-auto", item.pos)}
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="group relative"
      >
        <SketchyBorder padding="px-6 py-2" className="bg-paper/80 backdrop-blur-sm paper-shadow transition-colors group-hover:text-ink-blue">
          <span className="font-hand text-lg" style={{ transform: `rotate(${item.rotate}deg)`, display: 'inline-block' }}>
            {item.name}
          </span>
          <Hint text="go to" className="-top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </SketchyBorder>
        <Doodle 
          type="scribble" 
          className="absolute -bottom-4 -right-4 w-8 h-8 text-ink-blue opacity-0 group-hover:opacity-100 transition-opacity" 
        />
      </motion.button>
    </motion.div>
  );
}
