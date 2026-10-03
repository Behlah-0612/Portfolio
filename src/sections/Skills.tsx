import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CornerRightUp, X } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { skills, SkillDetail } from '../data/skills';
import { cn } from '@/src/lib/utils';

const categories = [
  { name: 'Programming', items: skills.programming, color: 'bg-ink-blue/15 dark:bg-dark-ink-blue/10', ink: 'text-ink-blue dark:text-dark-ink-blue' },
  { name: 'Frameworks', items: skills.frameworks, color: 'bg-ink-red/15 dark:bg-dark-ink-red/10', ink: 'text-ink-red dark:text-dark-ink-red' },
  { name: 'Systems & Architecture', items: skills.systemsArchitecture, color: 'bg-tape/50 dark:bg-dark-paper/20', ink: 'text-pencil dark:text-dark-pencil' },
  { name: 'Tools & DevOps', items: skills.tools, color: 'bg-pencil/8 dark:bg-dark-pencil/10', ink: 'text-pencil dark:text-dark-pencil' },
];

const detailLabel = 'mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-pencil/50 dark:text-dark-pencil/50';

export function Skills({ onModalStateChange }: { onModalStateChange?: (isOpen: boolean) => void }) {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [linkingPath, setLinkingPath] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const skillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSetActiveSkill = useCallback(
    (skill: SkillDetail | null) => {
      setActiveSkill(skill);
      onModalStateChange?.(!!skill);
      if (!skill) setLinkingPath(null);
    },
    [onModalStateChange]
  );

  // Escape closes the details dialog.
  useEffect(() => {
    if (!activeSkill) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSetActiveSkill(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSkill, handleSetActiveSkill]);

  // Draws a dashed line from the skill chip to the project that uses it, then scrolls to the project.
  const calculateLinkPath = useCallback((skill: SkillDetail) => {
    const skillEl = skillRefs.current[skill.name];
    const projectEl = document.getElementById(`project-${skill.projectId}`);
    if (!skillEl || !projectEl) return;

    const skillRect = skillEl.getBoundingClientRect();
    const projectRect = projectEl.getBoundingClientRect();
    const scrollY = window.scrollY;

    const startX = skillRect.left + skillRect.width / 2;
    const startY = skillRect.top + skillRect.height / 2 + scrollY;
    const endX = projectRect.left + projectRect.width / 2;
    const endY = projectRect.top + projectRect.height / 2 + scrollY;

    const cp1x = startX + (endX - startX) * 0.2;
    const cp1y = startY + (endY - startY) * 0.8;
    const cp2x = startX + (endX - startX) * 0.8;
    const cp2y = startY + (endY - startY) * 0.2;

    setLinkingPath(`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
    projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setLinkingPath(null), 3000);
  }, []);

  const handleLinkToProject = (skill: SkillDetail) => {
    onModalStateChange?.(false);
    setActiveSkill(null);
    // Let the dialog finish closing before drawing the line.
    setTimeout(() => calculateLinkPath(skill), 350);
  };

  return (
    <section id="skills" className="relative mx-auto min-h-screen max-w-7xl overflow-visible px-6 py-16 md:py-24">
      <SectionHeader eyebrow="Skills" title="Technical Skills" subtitle="The languages, frameworks and tools I work with." />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: i * 0.05 }}
            className="relative z-10 flex flex-col"
          >
            <div className={cn('paper-shadow group relative h-full flex-1 cursor-default rounded-2xl border-2 border-pencil/5 p-5 pb-8 transition-all hover:scale-[1.02] hover:shadow-xl', cat.color)}>
              <h3 className={cn('mb-5 flex items-center gap-2 text-lg font-bold', cat.ink)}>
                <span className="select-none opacity-40">#</span> {cat.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, j) => (
                  <div
                    key={skill.name}
                    className="group/skill relative"
                    ref={(el) => {
                      skillRefs.current[skill.name] = el;
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                      whileTap={{ scale: 0.97 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(skill.name)}
                      onBlur={() => setHoveredSkill(null)}
                      onClick={() => handleSetActiveSkill(skill)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSetActiveSkill(skill);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-haspopup="dialog"
                      className="cursor-pointer rounded-md"
                    >
                      {/* A one-time glow passes across the chips as the section scrolls into view */}
                      <motion.div
                        whileInView={
                          reduceMotion
                            ? undefined
                            : {
                                boxShadow: [
                                  '0 0 0 0 rgba(111,142,219,0)',
                                  '0 0 0 4px rgba(111,142,219,0.4)',
                                  '0 0 0 0 rgba(111,142,219,0)',
                                ],
                              }
                        }
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.5 + (i * 7 + j) * 0.04, ease: 'easeOut' }}
                        className={cn(
                          'paper-shadow inline-flex items-center gap-2 rounded-md border border-pencil/15 bg-paper px-3 py-1.5 text-[11px] font-medium transition-colors dark:bg-dark-paper-elevated md:text-xs',
                          hoveredSkill === skill.name
                            ? 'border-ink-blue text-ink-blue dark:border-dark-ink-blue dark:text-dark-ink-blue'
                            : 'text-pencil/75 dark:text-dark-pencil/80',
                          activeSkill?.name === skill.name && 'border-ink-red text-ink-red'
                        )}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-blue/70 transition-transform group-hover/skill:scale-125" />
                        {skill.name}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="-ml-1 h-3 w-3 max-w-0 opacity-0 transition-all duration-200 group-focus-within/skill:ml-0 group-focus-within/skill:max-w-[0.75rem] group-focus-within/skill:opacity-100 group-hover/skill:ml-0 group-hover/skill:max-w-[0.75rem] group-hover/skill:opacity-100"
                        />
                      </motion.div>
                    </motion.div>

                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-48 -translate-x-1/2 rounded bg-pencil p-3 text-center text-[11px] leading-relaxed text-paper shadow-2xl"
                        >
                          <div className="mb-1 text-[9px] font-bold uppercase tracking-widest opacity-60">{skill.category}</div>
                          {skill.summary}
                          <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-pencil" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeSkill && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSkill.name} details`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/90 p-4 backdrop-blur-md md:p-6"
            onClick={() => handleSetActiveSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="paper-shadow relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border-2 border-pencil/10 bg-paper dark:bg-dark-paper-elevated"
            >
              <button
                onClick={() => handleSetActiveSkill(null)}
                className="absolute right-4 top-4 z-30 rounded-full p-2 text-pencil/50 transition-colors hover:text-pencil dark:text-dark-pencil/50 dark:hover:text-dark-pencil"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="custom-scrollbar flex-1 overflow-y-auto p-8 pt-14 md:p-12 md:pt-16">
                <span className="rounded-full border border-pencil/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-pencil/50 dark:text-dark-pencil/50">
                  {activeSkill.category}
                </span>
                <h3 className="mb-8 mt-3 text-4xl font-bold leading-tight tracking-tight text-ink-blue dark:text-dark-ink-blue md:text-6xl">
                  {activeSkill.name}
                </h3>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className={detailLabel}>Where I've used it</h4>
                      <p className="text-base font-medium leading-relaxed text-pencil dark:text-dark-pencil">{activeSkill.where}</p>
                    </div>
                    <div>
                      <h4 className={detailLabel}>How</h4>
                      <p className="text-base leading-relaxed text-pencil/80 dark:text-dark-pencil/80">{activeSkill.usage}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center rounded-2xl border-l-[6px] border-ink-blue bg-ink-blue/[0.06] p-8 dark:border-dark-ink-blue dark:bg-dark-ink-blue/10">
                    <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-blue/70 dark:text-dark-ink-blue/70">Why it matters</h4>
                    <p className="text-lg font-medium leading-relaxed text-ink-blue dark:text-dark-ink-blue md:text-xl">{activeSkill.why}</p>
                  </div>
                </div>

                {activeSkill.projectId && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLinkToProject(activeSkill)}
                    className="paper-shadow mt-10 flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-ink-blue/20 bg-paper p-5 text-left transition-colors hover:border-ink-blue dark:bg-dark-paper-elevated"
                  >
                    <span className="text-base font-bold text-ink-blue dark:text-dark-ink-blue">See it in a project</span>
                    <CornerRightUp className="h-6 w-6 text-ink-blue dark:text-dark-ink-blue" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {linkingPath && (
          <svg className="pointer-events-none fixed inset-0 z-[80] h-full w-full overflow-visible">
            <motion.path
              d={linkingPath}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              fill="none"
              stroke="var(--color-ink-blue)"
              strokeWidth="4"
              strokeDasharray="10 10"
              className="drop-shadow-[0_0_8px_rgba(111,142,219,0.5)]"
            />
          </svg>
        )}
      </AnimatePresence>
    </section>
  );
}
