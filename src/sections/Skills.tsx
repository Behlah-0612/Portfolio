import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills, SkillDetail } from '../data/experience';
import { SketchyBorder, Doodle, Hint } from '../components/Sketchy';
import { cn } from '@/src/lib/utils';
import { Play, CornerRightUp, X } from 'lucide-react';

export function Skills({ onModalStateChange }: { onModalStateChange?: (isOpen: boolean) => void }) {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [linkingPath, setLinkingPath] = useState<string | null>(null);
  
  const skillRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleSetActiveSkill = (skill: SkillDetail | null) => {
    setActiveSkill(skill);
    onModalStateChange?.(!!skill);
    if (!skill) {
      setLinkingPath(null);
    }
  };

  const handleLinkToProject = (skill: SkillDetail) => {
    onModalStateChange?.(false);
    setActiveSkill(null);
    // Give time for modal exit before drawing line
    setTimeout(() => {
      calculateLinkPath(skill);
    }, 350);
  };

  const calculateLinkPath = useCallback((skill: SkillDetail) => {
    const skillEl = skillRefs.current[skill.name];
    const projectEl = document.getElementById(`project-${skill.projectId}`);
    
    if (skillEl && projectEl) {
      const skillRect = skillEl.getBoundingClientRect();
      const projectRect = projectEl.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Start at skill
      const startX = skillRect.left + skillRect.width / 2;
      const startY = skillRect.top + skillRect.height / 2 + scrollY;
      
      // End at project
      const endX = projectRect.left + projectRect.width / 2;
      const endY = projectRect.top + projectRect.height / 2 + scrollY;

      // Control points for a "hand-drawn" curve
      const cp1x = startX + (endX - startX) * 0.2;
      const cp1y = startY + (endY - startY) * 0.8;
      const cp2x = startX + (endX - startX) * 0.8;
      const cp2y = startY + (endY - startY) * 0.2;

      setLinkingPath(`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);

      // Smooth scroll to project
      projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Clear path after a few seconds
      setTimeout(() => setLinkingPath(null), 3000);
    }
  }, []);

  const categories = [
    { name: 'Programming', items: skills.programming, color: "bg-ink-blue/15 dark:bg-dark-ink-blue/10", ink: "text-ink-blue dark:text-dark-ink-blue", doodle: "text-ink-blue/40 dark:text-dark-ink-blue/30" },
    { name: 'Frameworks', items: skills.frameworks, color: "bg-ink-red/15 dark:bg-dark-ink-red/10", ink: "text-ink-red dark:text-dark-ink-red", doodle: "text-ink-red/40 dark:text-dark-ink-red/30" },
    { name: 'Systems & Architecture', items: skills.systemsArchitecture, color: "bg-tape/50 dark:bg-dark-paper/20", ink: "text-pencil dark:text-dark-pencil", doodle: "text-tape/60 dark:text-dark-pencil/30" },
    { name: 'Tools & DevOps', items: skills.tools, color: "bg-pencil/8 dark:bg-dark-pencil/10", ink: "text-pencil dark:text-dark-pencil", doodle: "text-pencil/40 dark:text-dark-pencil/30" }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative min-h-screen overflow-visible"
    >
      <Doodle type="circle" interactive className="absolute top-10 left-1/4 text-ink-blue/10 w-32 h-32 hidden md:block" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">The <span className="text-ink-blue">Living</span> Toolkit</h2>
        <p className="text-sm md:text-base text-pencil/80 dark:text-dark-pencil/60 font-sketch">Hand-crafted instruments, organized for execution.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: i * 0.05 
            }}
            className="flex flex-col relative z-10"
          >
            <SketchyBorder className={cn(
              "flex-1 h-full transition-all paper-shadow border-2 border-pencil/5 p-5 pb-8 relative group cursor-default", 
              cat.color,
              "hover:scale-[1.02] hover:shadow-xl hover:rotate-0"
            )}>
              <Doodle type="scribble" className={cn("absolute -top-3 -right-3 w-10 h-10 opacity-40 transition-opacity group-hover:opacity-100", cat.doodle)} />
              <h3 className={cn("text-lg font-bold mb-5 font-hand flex items-center gap-2", cat.ink)}>
                <span className="opacity-40 select-none">#</span> {cat.name}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="relative group/skill"
                    ref={(el) => { skillRefs.current[skill.name] = el; }}
                  >
                    <motion.div
                      layout
                      initial={{ scale: 0, rotate: Math.random() * 20 - 10 }}
                      animate={{ scale: 1, rotate: Math.random() * 6 - 3 }}
                      whileHover={{ 
                        scale: 1.15, 
                        y: -8, 
                        rotate: 0,
                        zIndex: 50,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSetActiveSkill(skill)}
                      className="cursor-pointer"
                    >
                      <div className={cn(
                        "px-3 py-1 bg-paper paper-shadow border-pencil/10 border-2 text-[11px] md:text-xs font-medium transition-all dark:bg-dark-paper-elevated",
                        hoveredSkill === skill.name 
                          ? "text-ink-blue border-ink-blue ring-2 ring-ink-blue/10 dark:text-dark-ink-blue dark:border-dark-ink-blue" 
                          : "text-pencil/70 dark:text-dark-pencil/80",
                        activeSkill?.name === skill.name && "border-ink-red text-ink-red ring-4 ring-ink-red/10 animate-pulse"
                      )}>
                        {skill.name}
                      </div>
                    </motion.div>
                    
                    {/* Hover Summary */}
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-pencil text-paper text-[11px] rounded shadow-2xl pointer-events-none text-center leading-relaxed"
                        >
                          <div className="font-bold mb-1 opacity-60 uppercase text-[9px] tracking-widest">{skill.category}</div>
                          {skill.summary}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-pencil" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </SketchyBorder>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-paper/90 backdrop-blur-md"
            onClick={() => handleSetActiveSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full max-h-[90vh] flex flex-col bg-paper dark:bg-dark-paper-elevated paper-shadow wobbly-border relative border-2 border-pencil/10 overflow-hidden"
            >
              {/* Decorative Scroll Lines (sketchy detail) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pencil/5 to-transparent" />
              
              {/* Background Doodle */}
              <Doodle type="scribble" className="absolute -top-10 -left-10 w-40 h-40 text-pencil/5 -rotate-12 pointer-events-none" />
              
              <button 
                onClick={() => handleSetActiveSkill(null)}
                className="absolute top-4 right-4 text-pencil/40 hover:text-pencil transition-colors p-2 dark:text-dark-pencil/40 dark:hover:text-dark-pencil z-30 group"
                aria-label="Close details"
              >
                <div className="relative">
                  <Doodle type="scribble" className="w-8 h-8 group-hover:text-ink-red transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold pointer-events-none">✕</span>
                </div>
              </button>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 pt-12 md:pt-16">
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-pencil/50 py-1 px-3 border border-pencil/10 rounded-full bg-paper/50 dark:bg-dark-paper/50">
                      Inventory: {activeSkill.category}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold font-hand text-ink-blue dark:text-dark-ink-blue leading-tight tracking-tight">
                    {activeSkill.name}
                  </h3>
                </div>

                <div className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="group/item">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-pencil/40 mb-2 font-sans dark:text-dark-pencil/40 flex items-center gap-2">
                          <span className="w-1 h-3 bg-pencil/10 rounded-full" />
                          Context of Deployment
                        </h4>
                        <p className="text-base text-pencil font-medium leading-relaxed dark:text-dark-pencil italic">
                          {activeSkill.where}
                        </p>
                      </div>
                      <div className="group/item">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-pencil/40 mb-2 font-sans dark:text-dark-pencil/40 flex items-center gap-2">
                          <span className="w-1 h-3 bg-pencil/10 rounded-full" />
                          Operational Usage
                        </h4>
                        <p className="text-base text-pencil leading-relaxed dark:text-dark-pencil font-sketch opacity-80">
                          {activeSkill.usage}
                        </p>
                      </div>
                    </div>

                    <div className="p-8 bg-ink-blue/[0.03] rounded-2xl border-l-[6px] border-ink-blue dark:bg-dark-ink-blue/10 dark:border-dark-ink-blue flex flex-col justify-center relative group/why">
                      <Doodle type="star" className="absolute -top-4 -right-4 w-12 h-12 text-ink-blue/5 rotate-12 transition-transform group-hover/why:rotate-45" />
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-blue/60 mb-4 font-sans dark:text-dark-ink-blue/60">Systemic Value</h4>
                      <p className="text-lg md:text-xl text-ink-blue leading-relaxed italic font-medium dark:text-dark-ink-blue">
                        "{activeSkill.why}"
                      </p>
                    </div>
                  </div>

                  {activeSkill.projectId && (
                    <motion.button
                      whileHover={{ scale: 1.01, rotate: -0.5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLinkToProject(activeSkill)}
                      className="w-full p-5 bg-paper dark:bg-dark-paper-elevated paper-shadow border-2 border-ink-blue/20 rounded-2xl flex items-center justify-between group/link cursor-pointer hover:border-ink-blue transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3 bg-ink-blue/10 rounded-xl text-ink-blue group-hover:bg-ink-blue group-hover:text-paper transition-colors shadow-sm">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] uppercase font-mono tracking-widest text-pencil/60 mb-0.5">Integration Reference</p>
                          <p className="text-base font-bold text-ink-blue">Trace Implementation</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-ink-blue">
                        <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Locate System</span>
                        <CornerRightUp className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </motion.button>
                  )}
                </div>

                <div className="mt-16 pt-8 border-t border-pencil/5 flex flex-col md:flex-row gap-4 justify-between items-center dark:border-dark-pencil/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ink-blue animate-pulse shadow-[0_0_8px_rgba(111,142,219,0.5)]" />
                    <span className="text-[10px] font-mono text-pencil/60 uppercase tracking-[0.3em] dark:text-dark-pencil/60">Grit verified • Core active</span>
                  </div>
                  <div className="text-[9px] font-mono text-pencil/20 uppercase tracking-widest bg-pencil/5 px-3 py-1 rounded-full">
                    Asset ID: {activeSkill.name.toUpperCase().slice(0, 3)}-2026
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Linking Path SVG Overlay */}
      <AnimatePresence>
        {linkingPath && (
          <svg className="fixed inset-0 pointer-events-none z-[80] w-full h-full overflow-visible">
            <motion.path
              d={linkingPath}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              fill="none"
              stroke="var(--color-ink-blue)"
              strokeWidth="4"
              strokeDasharray="10 10"
              className="drop-shadow-[0_0_8px_rgba(111,142,219,0.5)]"
            />
          </svg>
        )}
      </AnimatePresence>

      <div className="mt-24 flex flex-col items-center relative z-10">
        <Hint text="Exploring Depth" className="-top-12 left-1/2 -translate-x-1/2" />

      </div>
    </section>
  );
}
