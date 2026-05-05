import React from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import { Doodle, FlowArrow, CurvedLine } from '../components/Sketchy';
import { cn } from '@/src/lib/utils';

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
      <Doodle type="star" className="absolute top-0 right-10 text-ink-blue/30 w-32 h-32 hidden md:block" />
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-ink-red font-bold underline decoration-wavy decoration-tape">Projects</span></h2>
        <p className="text-sm md:text-base text-pencil/60 font-sketch">A collection of systems I've built, one frame at a time.</p>
      </div>

      <div className="relative">
        {/* Wavy Flow Line (Desktop Only) */}
        <CurvedLine d="M100,0 Q75,50 50,0 T0,50" className="hidden md:block w-full h-40 top-20 left-0 text-pencil/5" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative",
                "md:translate-y-0", // Reset translate on mobile/tablet
                i % 3 === 1 ? "lg:translate-y-12" : "",
                i % 3 === 2 ? "lg:translate-y-24" : ""
              )}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flow Arrow to Experience */}
      <FlowArrow className="bottom-0 left-10 hidden md:block" rotate={135} />
    </section>
  );
}
