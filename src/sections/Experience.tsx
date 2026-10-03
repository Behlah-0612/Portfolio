import { SectionHeader } from '../components/SectionHeader';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { experience } from '../data/experience';
import { cn } from '@/src/lib/utils';

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleNodeClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setHasInteracted(true);
  };

  return (
    <section id="experience" className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <SectionHeader eyebrow="Experience" title="Experience and Leadership" subtitle="Roles across software, hospitality and leadership." />
      </div>

      <div className="relative space-y-16 md:space-y-24">
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
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "group/tile paper-shadow relative h-full cursor-pointer rounded-2xl border-2 border-pencil/10 p-6 transition-colors transition-shadow hover:border-ink-blue/60 hover:paper-shadow-hover dark:border-dark-pencil/20",
                    expandedIndex === i ? "bg-paper dark:bg-dark-paper-elevated" : "bg-paper/95 dark:bg-dark-paper-elevated/95",
                    cardColors.bg,
                    cardColors.darkBg,
                    cardColors.border
                  )}
                  onClick={() => handleNodeClick(i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedIndex === i}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNodeClick(i);
                    }
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    animate={
                      hasInteracted || reduceMotion
                        ? { y: 0, boxShadow: '0 0 0 0 rgba(111,142,219,0)' }
                        : i === 0
                          ? { y: [0, 3, 0], boxShadow: ['0 0 0 0 rgba(111,142,219,0.5)', '0 0 0 10px rgba(111,142,219,0)'] }
                          : { y: [0, 3, 0] }
                    }
                    transition={{
                      y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                      boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeOut' },
                    }}
                    className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-pencil/25 bg-paper/70 text-pencil/80 transition-colors group-hover/tile:border-ink-blue group-hover/tile:bg-ink-blue group-hover/tile:text-paper"
                  >
                    <motion.span animate={{ rotate: expandedIndex === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="inline-flex">
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </motion.span>
                  <div className="flex flex-col gap-2 mb-4 pr-12">
                    <span className={cn("text-xs font-bold uppercase tracking-widest font-sans dark:text-dark-ink-blue", cardColors.accent)}>
                      {exp.category}
                    </span>
                    <h3 className={cn("text-2xl md:text-3xl font-bold leading-tight text-pencil dark:text-dark-pencil", cardColors.text)}>{exp.role}</h3>
                    <p className={cn("text-pencil dark:text-dark-pencil text-lg", cardColors.text)}>{exp.company}</p>
                    {exp.period && (
                      <p className="text-xs font-mono uppercase tracking-widest text-pencil/60 dark:text-dark-pencil/60">{exp.period}</p>
                    )}
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
                </motion.div>
              </div>

              {/* Key Takeaway Card */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="w-full max-w-[280px] relative z-20"
              >
                <div className={cn("p-6 bg-tape/80 dark:bg-dark-paper-elevated rounded-xl border-ink-red/20 dark:border-dark-ink-red/20 paper-shadow border-2", cardColors.bg, cardColors.darkBg)}>
                  <p className={cn("text-sm md:text-base text-pencil dark:text-dark-pencil font-medium italic leading-relaxed", cardColors.text)}>
                    <span className={cn("text-ink-red dark:text-dark-ink-red mr-2 font-bold text-lg", cardColors.accent)}>Takeaway:</span>
                    "{exp.takeaway}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
