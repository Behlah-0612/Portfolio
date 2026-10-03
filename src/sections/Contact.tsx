import { motion } from 'motion/react';
import { Github, Linkedin, Download, MapPin, Code2 } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CopyEmail } from '../components/CopyEmail';
import { GITHUB_URL, LINKEDIN_URL, NEETCODE_PROFILE, RESUME_FILENAME, RESUME_URL } from '../data/links';

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6 max-w-4xl mx-auto relative">
      <SectionHeader eyebrow="Contact" title="Get in Touch" subtitle="Hiring, or have something in mind? Reach me directly." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-pencil/10 bg-surface p-6 md:p-10 paper-shadow grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold text-pencil mb-1">Email me directly</h3>
            <p className="text-sm text-pencil/65 mb-4">The quickest way to reach me.</p>
            <CopyEmail className="w-full" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pencil mb-3">Resume</h3>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="inline-flex w-full items-center justify-center gap-2 min-h-[48px] rounded-lg bg-ink-blue text-paper font-semibold hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Download Resume (PDF)
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-pencil/65 underline underline-offset-4 hover:text-ink-blue">
              or open it in a new tab
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-pencil mb-3">Elsewhere</h3>
          <div className="flex flex-col gap-2">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-pencil/80 hover:text-ink-blue transition-colors min-h-[40px]">
              <Linkedin className="w-5 h-5 shrink-0" /> linkedin.com/in/behlah-katleriwala
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-pencil/80 hover:text-ink-blue transition-colors min-h-[40px]">
              <Github className="w-5 h-5 shrink-0" /> github.com/Behlah-0612
            </a>
            <a href={NEETCODE_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-pencil/80 hover:text-ink-blue transition-colors min-h-[40px]">
              <Code2 className="w-5 h-5 shrink-0" /> neetcode.io/user/VolatileJutsu68
            </a>
            <span className="inline-flex items-center gap-3 text-pencil/65 min-h-[40px]">
              <MapPin className="w-5 h-5 shrink-0" /> Kamloops, BC
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
