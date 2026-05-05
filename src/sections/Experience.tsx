import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experience } from '../data/experience';
import { StickyNote, Doodle, Hint, FlowArrow, CurvedLine } from '../components/Sketchy';
import { cn } from '@/src/lib/utils';

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [clickSequence, setClickSequence] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(false);

  const handleNodeClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    
    const newSequence = [...clickSequence, index].slice(-3);
    setClickSequence(newSequence);
    
    if (newSequence.length === 3 && new Set(newSequence).size === 3) {
      setShowPattern(true);
      setTimeout(() => setShowPattern(false), 3000);
    }
  };

  return (
    <section id="experience" className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
      <Doodle type="star" interactive className="absolute top-0 left-1/2 text-ink-red/30 w-24 h-24 hidden md:block" />
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The <span className="text-ink-red dark:text-dark-ink-red font-bold underline decoration-wavy decoration-tape">Production</span> Timeline</h2>
        <p className="text-base md:text-lg text-pencil font-sketch dark:text-dark-pencil">Key frames from my professional journey.</p>
      </div>

      <div className="relative space-y-16 md:space-y-24">
        {/* Timeline Flow Line (Desktop Only) */}
        <CurvedLine d="M50,0 Q60,50 50,100 T50,200" className="absolute left-1/2 top-0 bottom-0 w-20 -translate-x-1/2 hidden md:block text-pencil/5" />

        {experience.map((exp, i) => {
          const colorIndex = i % 3;
          const cardColors = [
            { bg: "bg-tape/90", text: "text-pencil", accent: "text-ink-red", border: "border-tape/80", darkBg: "dark:bg-dark-paper/30" },
            { bg: "bg-ink-blue/25", text: "text-pencil", accent: "text-ink-blue", border: "border-ink-blue/50", darkBg: "dark:bg-dark-ink-blue/15" },
            { bg: "bg-ink-red/25", text: "text-pencil", accent: "text-ink-red", border: "border-ink-red/50", darkBg: "dark:bg-dark-ink-red/15" },
          ][colorIndex];

          return (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row items-center gap-8 md:gap-12",
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div className="flex-1 w-full max-w-md">
                <Hint text="click to expand" className={i % 2 === 0 ? "-top-8 left-0" : "-top-8 right-0"} />
                
                <StickyNote 
                  color={cn(
                    expandedIndex === i ? "bg-paper dark:bg-dark-paper-elevated" : "bg-paper/95 dark:bg-dark-paper-elevated/95",
                    cardColors.bg,
                    cardColors.darkBg
                  )} 
                  className={cn("h-full border-2 border-pencil/10 dark:border-dark-pencil/20 cursor-pointer", cardColors.border)}
                  onClick={() => handleNodeClick(i)}
                >
                  <div className="flex flex-col gap-2 mb-4">
                    <span className={cn("text-xs font-bold uppercase tracking-widest font-sans dark:text-dark-ink-blue", cardColors.accent)}>
                      {exp.category}
                    </span>
                    <h3 className={cn("text-2xl md:text-3xl font-bold font-hand leading-tight text-pencil dark:text-dark-pencil", cardColors.text)}>{exp.role}</h3>
                    <p className={cn("text-pencil dark:text-dark-pencil font-sketch text-lg", cardColors.text)}>{exp.company}</p>
                  </div>
                  
                  <p className={cn("text-pencil dark:text-dark-pencil font-sans mb-6 leading-relaxed text-base md:text-lg", cardColors.text)}>
                    {exp.description}
                  </p>

                  <AnimatePresence>
                    {expandedIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={cn("pt-4 pb-6 space-y-4 border-t border-pencil/5 dark:border-dark-pencil/20 mt-4", cardColors.border)}>
                          <div>
                            <h4 className={cn("text-xs font-bold uppercase tracking-widest text-ink-blue dark:text-dark-ink-blue mb-2 font-sans", cardColors.accent)}>What I Did</h4>
                            <p className={cn("text-base text-pencil dark:text-dark-pencil font-medium leading-relaxed", cardColors.text)}>{exp.details?.did}</p>
                          </div>
                          <div>
                            <h4 className={cn("text-xs font-bold uppercase tracking-widest text-ink-blue dark:text-dark-ink-blue mb-2 font-sans", cardColors.accent)}>What I Learned</h4>
                            <p className={cn("text-base text-pencil dark:text-dark-pencil font-medium leading-relaxed", cardColors.text)}>{exp.details?.learned}</p>
                          </div>
                          <div className={cn("p-3 bg-ink-blue/25 dark:bg-dark-ink-blue/20 rounded border-l-4 border-ink-blue/60 dark:border-dark-ink-blue/60", cardColors.border)}>
                            <h4 className={cn("text-xs font-bold uppercase tracking-widest text-ink-blue dark:text-dark-ink-blue mb-2 font-sans", cardColors.accent)}>Why It Matters</h4>
                            <p className={cn("text-sm md:text-base text-pencil dark:text-dark-pencil leading-relaxed italic", cardColors.text)}>{exp.details?.matters}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StickyNote>
              </div>

              {/* Key Takeaway Card */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                className="w-full max-w-[280px] relative z-20"
              >
                <div className={cn("p-6 bg-tape/80 dark:bg-dark-paper-elevated wobbly-border border-ink-red/20 dark:border-dark-ink-red/20 paper-shadow rotate-1 border-2", cardColors.bg, cardColors.darkBg)}>
                  <p className={cn("text-sm md:text-base text-pencil dark:text-dark-pencil font-medium italic leading-relaxed", cardColors.text)}>
                    <span className={cn("text-ink-red dark:text-dark-ink-red mr-2 font-bold font-sketch text-lg", cardColors.accent)}>Takeaway:</span>
                    "{exp.takeaway}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Pattern Recognized Easter Egg */}
      <AnimatePresence>
        {showPattern && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
          >
            <div className="p-8 bg-paper dark:bg-dark-paper paper-shadow wobbly-border border-ink-blue text-center">
              <Doodle type="bulb" className="w-12 h-12 text-ink-blue mx-auto mb-4" />
              <h3 className="text-2xl font-hand text-ink-blue dark:text-dark-ink-blue">Pattern Recognized!</h3>
              <p className="font-sketch text-pencil/80 dark:text-dark-pencil">Your curiosity is rewarded.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flow Arrow to Skills */}
      <FlowArrow className="bottom-0 right-1/2 translate-x-1/2" rotate={90} />
    </section>
  );
}
