import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Code2, CheckCircle2, Github, ExternalLink, RotateCw, Lock } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  problemSolved: string;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  privateNote?: string;
  features?: string[];
  metrics?: string[];
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [flipped, setFlipped] = useState(false);
  const canHover = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  // Mouse users flip on hover. Touch and keyboard users flip on tap or Enter.
  const handleEnter = () => { if (canHover.current) setFlipped(true); };
  const handleLeave = () => { if (canHover.current) setFlipped(false); };
  const handleClick = () => { if (!canHover.current) setFlipped((f) => !f); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const face = 'rounded-2xl border border-pencil/10 bg-surface paper-shadow flip-face flex flex-col p-6 md:p-7';

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${project.title}. Press Enter to ${flipped ? 'show the overview' : 'show details and links'}.`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ perspective: 1400 }}
      className="h-full cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', display: 'grid' }}
        className="h-full"
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          style={{ gridArea: '1 / 1', pointerEvents: flipped ? 'none' : 'auto' }}
          className={face}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-ink-blue/15 text-ink-blue shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold leading-snug text-pencil">{project.title}</h3>
          </div>

          <p className="text-pencil/80 text-base leading-relaxed mb-5">{project.description}</p>

          <div className="mb-5 rounded-lg bg-ink-blue/10 p-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-pencil/60 mb-1.5">Problem solved</h4>
            <p className="text-sm text-pencil/80 leading-relaxed">{project.problemSolved}</p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md border border-pencil/10 bg-pencil/5 text-[11px] font-mono text-pencil/80">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-pencil/60">
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden [@media(hover:hover)]:inline">Hover for details and links</span>
              <span className="[@media(hover:hover)]:hidden">Tap for details and links</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          style={{ gridArea: '1 / 1', transform: 'rotateY(180deg)', pointerEvents: flipped ? 'auto' : 'none' }}
          className={face}
        >
          <h3 className="text-xl md:text-2xl font-semibold leading-snug text-pencil mb-5">{project.title}</h3>

          <div className="mb-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-pencil/60 mb-3">Key features</h4>
            <ul className="space-y-2.5">
              {(project.features ?? []).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-pencil/90 leading-snug">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-ink-blue" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-pencil/60 mb-3">At a glance</h4>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((metric) => {
                  const [value, label] = metric.split(':');
                  return (
                    <div key={metric} className="rounded-lg border border-pencil/10 bg-pencil/5 px-3 py-2">
                      <p className="text-sm font-semibold text-pencil leading-tight">{value}</p>
                      <p className="text-[11px] text-pencil/60 leading-tight mt-0.5">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-auto pt-2">
            {hasLinks ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={stop}
                    tabIndex={flipped ? 0 : -1}
                    className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-lg bg-ink-blue text-paper text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {project.liveLabel || 'Live Demo'}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={stop}
                    tabIndex={flipped ? 0 : -1}
                    className={cn(
                      'flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-lg border border-pencil/25 text-pencil text-sm font-semibold hover:bg-pencil/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-blue'
                    )}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-pencil/10 bg-pencil/5 px-4 min-h-[44px] text-sm text-pencil/70">
                <Lock className="w-4 h-4 shrink-0" />
                {project.privateNote ?? 'No public repository or demo for this project.'}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
