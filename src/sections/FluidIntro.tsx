import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Trophy, ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS_URL } from '../data/links';

const certifications = ['Microsoft 365 Copilot Essentials', 'Microsoft Azure Essentials'];

const highlights: { icon: typeof Award; label: string; title: string; text: string; href?: string; showCertifications?: boolean }[] = [
  {
    icon: Trophy,
    label: 'Hackathon',
    title: 'Runner-up, Kamloops 2026',
    text: 'Hosted by Arc Technologies. Built LiftSafe with a team of three.',
    href: 'https://iyassh.github.io/liftsafe/index.html',
  },
  {
    icon: BookOpen,
    label: 'Publication',
    title: 'First author, Gerontechnology',
    text: 'Peer-reviewed paper on a passive vital sign monitoring chair.',
    href: 'https://doi.org/10.4017/gt.2026.25.2.1516.3',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    title: 'BSc Computing Science',
    text: 'Thompson Rivers University, graduated December 2025.',
  },
  {
    icon: Award,
    label: 'Honours',
    title: "Dean's List, four semesters",
    text: 'Fall 2021, Winter 2024, Fall 2024 and Fall 2025.',
    showCertifications: true,
  },
];

export function FluidIntro() {
  return (
    <section id="intro" className="px-6 pb-16 md:pb-24 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center text-xl md:text-2xl leading-relaxed text-pencil/85 mb-12 md:mb-16"
      >
        I'm a software developer and recent Computing Science graduate. Most of my projects are full stack web apps built with React, Next.js and TypeScript, with Python, Node, Supabase and Firebase behind them. I'm early in my career and looking for a team where I can build real things and keep learning.
      </motion.p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((h, i) => {
          const body = (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-ink-blue/15 text-ink-blue">
                  <h.icon className="w-5 h-5" />
                </div>
                {h.href && <ArrowUpRight className="w-4 h-4 text-pencil/40 group-hover:text-ink-blue transition-colors" />}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-pencil/55 mb-1">{h.label}</p>
              <p className="text-base font-semibold text-pencil leading-snug mb-1.5">{h.title}</p>
              <p className="text-sm text-pencil/70 leading-relaxed">{h.text}</p>
              {h.showCertifications && (
                <div className="mt-4 border-t border-pencil/10 pt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-pencil/55">Certifications</p>
                  <ul className="mb-3 space-y-1">
                    {certifications.map((c) => (
                      <li key={c} className="text-sm leading-snug text-pencil/80">{c}</li>
                    ))}
                  </ul>
                  <a
                    href={CERTIFICATIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-ink-blue underline-offset-4 hover:underline"
                  >
                    View my certifications <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </>
          );
          return (
            <motion.li
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              {h.href ? (
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl border border-pencil/10 bg-surface p-5 paper-shadow hover:border-ink-blue/40 transition-colors"
                >
                  {body}
                </a>
              ) : (
                <div className="h-full rounded-2xl border border-pencil/10 bg-surface p-5 paper-shadow">{body}</div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
