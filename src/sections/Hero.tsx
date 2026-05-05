import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { SketchyBorder, HandDrawnArrow, Doodle, Hint, FlowArrow } from '../components/Sketchy';

export function Hero() {
  const [isScrolling, setIsScrolling] = useState(false);

  const socials = [
    { icon: Github, href: "https://github.com/Behlah-0612", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/behlah-katleriwala", label: "LinkedIn" },
    { icon: Mail, href: "mailto:bkatleriwala@gmail.com", label: "Email" }
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-6">
      {/* Background Doodles */}
      <Doodle type="star" interactive className="absolute top-40 left-[10%] text-ink-blue/40 rotate-12 hidden md:block" />
      <Doodle type="circle" interactive className="absolute bottom-40 right-[15%] text-ink-red/40 -rotate-12 hidden md:block" />
      <Doodle type="scribble" interactive className="absolute top-1/2 left-[5%] text-pencil/20 w-32 h-32 hidden md:block" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-ink-blue/20 rounded-full text-ink-blue font-sketch text-sm md:text-base mb-8 rotate-1 border border-ink-blue/40">
            <Sparkles className="w-4 h-4" />
            <span>Storyboarding the Future</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight tracking-tight">
            Behlah <span className="text-ink-blue marker-underline">Katleriwala</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-pencil/80 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            A systems-driven developer who turns complex logic into <span className="font-hand text-ink-red font-bold">living sketches</span>.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 relative">
            <Hint text="start here" className="-top-10 left-1/2 -translate-x-1/2 md:left-1/4 md:translate-x-0" />
            <motion.button
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-8 py-4 bg-ink-blue text-white rounded-lg font-hand text-xl paper-shadow flex items-center justify-center gap-2 min-h-[48px] border-2 border-ink-blue/60 hover:bg-ink-blue/90 dark:bg-dark-ink-blue dark:hover:bg-dark-ink-blue/90"
            >
              View Storyboard <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-8 py-4 border-2 border-ink-red bg-ink-red/10 text-ink-red rounded-lg font-hand text-xl paper-shadow flex items-center justify-center gap-2 min-h-[48px] hover:bg-ink-red/20 dark:border-dark-ink-red dark:bg-dark-ink-red/10 dark:text-dark-ink-red dark:hover:bg-dark-ink-red/20"
            >
              Let's Sketch <Mail className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-8">
            {socials.map((social, i) => {
              const isMailto = social.href.startsWith('mailto:');
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  {...(isMailto
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  whileHover={{ y: -5, rotate: i % 2 === 0 ? 10 : -10 }}
                  className="p-3 bg-tape/80 wobbly-border text-pencil hover:text-ink-blue hover:bg-ink-blue/20 transition-colors flex items-center gap-2 dark:bg-dark-paper-elevated dark:text-dark-pencil dark:hover:text-dark-ink-blue dark:hover:bg-dark-ink-blue/10 border-2 border-tape/60 dark:border-dark-paper/40"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>


      {/* Flow Arrow to About */}
      <FlowArrow className="bottom-20 left-1/2 -translate-x-1/2 hidden md:block" rotate={90} />
    </section>
  );
}
