import React from 'react';
import { motion } from 'motion/react';
import { Zap, Cpu, Target } from 'lucide-react';
import { StickyNote, Doodle, FlowArrow, CurvedLine } from '../components/Sketchy';
import { cn } from '@/src/lib/utils';

export function About() {
  const values = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Systems Thinking",
      description: "I approach problems by understanding the entire ecosystem, not just isolated components.",
      color: "bg-tape/60 dark:bg-dark-paper/20",
      rotate: -2
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real-World Focus",
      description: "My experience in operations and finance informs my technical decisions, ensuring practical utility.",
      color: "bg-ink-blue/15 dark:bg-dark-ink-blue/10",
      rotate: 1
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Efficiency First",
      description: "I prioritize performance and usability, building systems that work seamlessly under pressure.",
      color: "bg-ink-red/15 dark:bg-dark-ink-red/10",
      rotate: -1
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
      <Doodle type="scribble" className="absolute -top-10 right-20 text-ink-blue/30 w-48 h-48 hidden md:block" />
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The <span className="text-ink-blue font-bold underline decoration-wavy decoration-tape">Drafting</span> Process</h2>
        <p className="text-base md:text-lg text-pencil font-sketch dark:text-dark-pencil">How I architect solutions, one frame at a time.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
        {/* Wavy Flow Lines (Desktop Only) */}
        <CurvedLine d="M0,50 Q25,0 50,50 T100,50" className="hidden md:block w-full h-20 -top-10 left-0 text-pencil/10 dark:text-dark-pencil/5" />

        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20, rotate: value.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={cn(
              "w-full max-w-xs",
              i === 1 ? "md:-translate-y-8" : ""
            )}
          >
            <StickyNote color="bg-paper dark:bg-dark-paper-elevated" className="h-full border-2 border-pencil/10 dark:border-dark-pencil/20">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-pencil/5 dark:bg-dark-paper/30 wobbly-border text-pencil dark:text-dark-pencil">
                  {value.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-hand text-pencil dark:text-dark-pencil">
                  {value.title}
                </h3>
                <p className="text-pencil font-sans font-medium leading-relaxed text-base md:text-lg dark:text-dark-pencil">
                  {value.description}
                </p>
              </div>
            </StickyNote>
          </motion.div>
        ))}
      </div>

      {/* Flow Arrow to Projects */}
      <FlowArrow className="bottom-0 right-10 hidden md:block" rotate={45} />
    </section>
  );
}
