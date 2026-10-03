import { motion } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { projects } from '../data/projects';
import { NEETCODE_PROFILE, NEETCODE_REPO } from '../data/links';

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
      <SectionHeader
        eyebrow="Projects"
        title="Selected Work"
        subtitle="Things I've built, from a field sales CRM to a published IoT research prototype."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            id={`project-${project.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            className={`relative h-full ${i === projects.length - 1 && projects.length % 3 === 1 ? 'lg:col-start-2' : ''}`}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <p className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-pencil/60">
        Algorithm practice:
        <a href={NEETCODE_PROFILE} target="_blank" rel="noopener noreferrer" className="font-medium text-pencil/80 underline underline-offset-4 hover:text-ink-blue transition-colors">
          NeetCode profile
        </a>
        <span aria-hidden="true">·</span>
        <a href={NEETCODE_REPO} target="_blank" rel="noopener noreferrer" className="font-medium text-pencil/80 underline underline-offset-4 hover:text-ink-blue transition-colors">
          Solutions on GitHub
        </a>
      </p>
    </section>
  );
}
