import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Doodle } from '../components/Sketchy';
import { cn } from '@/src/lib/utils';

export function FluidIntro() {
  const [showAnnotation, setShowAnnotation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="intro" className="py-32 md:py-48 px-6 relative overflow-visible">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-20"
      >
        {/* Line 1: Identity & Role */}
        <motion.div 
          variants={itemVariants}
          className="md:self-start md:ml-12 max-w-2xl"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-pencil font-sans relative">
            Hi, I’m <span className="font-hand font-bold text-ink-blue dark:text-dark-ink-blue text-3xl md:text-5xl">Behlah</span> - a 
            <span className="relative inline-block mx-2 group">
              <span className="font-bold text-pencil transition-all hover:jitter">software developer</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-ink-blue/50 rounded-full" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.6 }}
              />
            </span>
            and recent graduate focused on building systems that are practical, efficient, and thoughtfully designed.
          </div>
        </motion.div>

        {/* Line 2: UI/UX & Philosophy */}
        <motion.div 
          variants={itemVariants}
          className="md:self-end md:mr-12 max-w-2xl text-right md:-rotate-1"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-pencil font-sans italic">
            I’m especially interested in 
            <span className="relative inline-block mx-2 font-sketch text-ink-red dark:text-dark-ink-red hover:scale-110 cursor-default transition-transform group/uiux hover:jitter">
              UI/UX
              <motion.div 
                  className="absolute inset-0 bg-ink-red/15 rounded-full blur-xl opacity-0 group-hover/uiux:opacity-100 transition-opacity"
              />
              <Doodle type="scribble" className="absolute -bottom-4 left-0 w-full h-4 text-ink-red/40 group-hover:text-ink-red transition-colors" animate={false} />
            </span>, 
            where I can turn technical ideas into experiences people actually enjoy using.
          </div>
        </motion.div>

        {/* Line 3: The Quote Intro */}
        <motion.div 
          variants={itemVariants}
          className="md:self-center text-center max-w-2xl"
        >
          <div className="text-xl md:text-2xl text-pencil/70 font-sketch italic">
            I’ve never really limited myself to one path - I prefer exploring and connecting different ideas, which is why the quote
          </div>
        </motion.div>

        {/* Line 4: The Quote (Interactive) */}
        <motion.div 
          variants={itemVariants}
          className="md:self-center max-w-4xl py-6 relative"
        >
          <div className="absolute -top-6 -left-12 opacity-5 hidden md:block">
            <Doodle type="star" className="w-24 h-24" />
          </div>
          
          <button 
            onClick={() => setShowAnnotation(!showAnnotation)}
            className="group/quote relative text-center block w-full outline-none"
          >
            <p className={cn(
              "text-3xl md:text-5xl lg:text-7xl font-hand leading-tight transition-all duration-700",
              showAnnotation ? "text-ink-blue scale-105" : "text-pencil"
            )}>
              “a jack of all trades is a master of none, but oftentimes better than a master of one”
            </p>
            
            <motion.div 
              className="mt-6 mx-auto h-1 bg-pencil/20 dark:bg-dark-pencil-muted/10 rounded-full w-2/3 relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-y-0 left-0 bg-ink-blue"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            <AnimatePresence>
              {showAnnotation && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, y: -20, scale: 1, rotate: 2 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-paper dark:bg-dark-paper-elevated border-2 border-ink-blue/30 paper-shadow-hover px-6 py-2 rounded-lg z-20 pointer-events-none"
                >
                  <span className="font-hand font-bold text-lg text-ink-blue">this is how I approach things ✨</span>
                  <div className="absolute top-0 right-2 -translate-y-1/2 w-4 h-4 bg-tape/30 rotate-12" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Line 5: Closing & CTA */}
        <motion.div 
          variants={itemVariants}
          className="md:self-start md:ml-12 max-w-2xl group/final"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-pencil font-sans mb-10">
            fits me well. This site reflects that approach - take a look around, 
          </div>
          <button 
            onClick={scrollToContact}
            className="text-2xl md:text-4xl lg:text-5xl font-bold font-hand text-ink-blue dark:text-dark-ink-blue hover:scale-105 transition-transform flex flex-wrap items-center gap-4 text-left"
          >
            and if you like what you see, let’s build something together.
              <div className="relative w-16 h-1 bg-ink-blue/40 overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-ink-blue"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ width: "40%" }}
              />
            </div>
          </button>
        </motion.div>

        {/* Explore Down Signal */}
        <div className="flex flex-col items-center mt-12">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sketch text-pencil/60 dark:text-dark-pencil/60 uppercase tracking-widest text-xs">explore projects</span>
            <Doodle type="arrow" className="rotate-90 text-pencil/40 dark:text-dark-pencil/40 w-10 h-10" />
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-pencil/5 dark:bg-dark-pencil/5 -z-10" />
      <Doodle type="scribble" className="absolute top-1/4 right-10 text-pencil/5 w-64 h-64 -rotate-12" />
    </section>
  );
}
