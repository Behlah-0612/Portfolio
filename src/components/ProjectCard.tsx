import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Code2, Activity, Scan, Grid3X3, MessageSquare, Lightbulb, Package, CheckCircle2, Sparkles, Github } from 'lucide-react';
import { SketchyBorder, Hint, Doodle, HandDrawnArrow } from './Sketchy';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  problemSolved: string;
  githubUrl: string;
  features?: string[];
  metrics?: string[];
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50, rotate: Math.random() * 4 - 2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        rotate: 0, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="group relative cursor-pointer"
    >
      <SketchyBorder className="bg-tape/20 paper-shadow hover:paper-shadow-hover transition-all duration-200 h-full border-2 border-tape/40 overflow-hidden dark:bg-dark-paper-elevated dark:border-dark-paper/40 group-hover:shadow-[inset_0_0_20px_rgba(111,142,219,0.05)]">
        <div className="relative z-10 flex flex-col h-full p-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-ink-blue/25 rounded-lg text-ink-blue dark:bg-dark-ink-blue/10">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-hand leading-tight dark:text-dark-pencil text-ink-blue">{project.title}</h3>
            </div>
            <Doodle type="star" className={cn("w-5 h-5 transition-colors", isHovered ? "text-ink-red" : "text-ink-blue/40")} />
          </div>

          <p className="text-pencil font-sans text-base md:text-lg leading-relaxed mb-6 dark:text-dark-pencil">
            {project.description}
          </p>

          <div className="mb-6 bg-ink-blue/12 p-3 rounded wobbly-border border-ink-blue/30 dark:bg-dark-paper/30">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pencil/60 mb-2 font-sans dark:text-dark-pencil-muted/40">Problem Solved</h4>
            <p className="text-sm md:text-base text-pencil leading-relaxed italic border-l-2 border-ink-blue/40 pl-3 dark:text-dark-pencil">
              {project.problemSolved}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-pencil/5">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-tape/50 rounded text-[10px] md:text-xs font-mono text-pencil/90 uppercase tracking-wider dark:bg-dark-pencil/10 dark:text-dark-pencil border border-tape/60 dark:border-dark-pencil/20">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-ink-blue font-hand text-lg group-hover:underline dark:text-dark-ink-blue">
                <Github className="w-5 h-5" />
                <span className="italic font-sketch">click to view code</span>
              </div>
              <HandDrawnArrow className="w-6 h-6 text-ink-blue dark:text-dark-ink-blue" />
            </div>
            
            <div className="flex items-center justify-between text-[10px] md:text-xs font-sketch text-pencil/80 dark:text-dark-pencil/60">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-ink-red dark:text-dark-ink-red" />
                <span>hover for deep dive</span>
              </div>
              <span className="opacity-40">Draft v1.0.4</span>
            </div>
          </div>
        </div>

        {/* Deep Dive Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 z-20 bg-paper/95 dark:bg-dark-paper-elevated/95 text-pencil dark:text-dark-pencil p-6 flex flex-col justify-center backdrop-blur-sm"
            >
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-pencil/60 mb-3 font-sans dark:text-dark-pencil-muted/60">Key Features</h4>
                <ul className="space-y-2">
                  {(project.features || ['Modular architecture', 'Optimized performance', 'Scalable design']).map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm font-hand"
                    >
                      <CheckCircle2 className="w-4 h-4 text-ink-red dark:text-dark-ink-red" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {project.metrics && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-pencil/60 mb-3 font-sans dark:text-dark-pencil-muted/60">Impact Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="p-2 bg-ink-blue/20 rounded border border-ink-blue/40 dark:bg-dark-paper/20 dark:border-dark-pencil/5">
                        <p className="text-lg font-bold font-hand text-ink-red leading-none dark:text-dark-ink-red">{metric.split(':')[0]}</p>
                        <p className="text-[10px] uppercase tracking-tighter text-pencil/60 dark:text-dark-pencil-muted">{metric.split(':')[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-pencil/10 flex items-center justify-between dark:border-white/10">
                <span className="text-[10px] font-sketch text-pencil/40 dark:text-dark-pencil/40">Release 1.0.4</span>
                <Doodle type="star" className="w-4 h-4 text-ink-red dark:text-dark-ink-red" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SketchyBorder>
    </motion.div>
  );
};
