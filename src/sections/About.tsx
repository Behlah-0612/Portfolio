import { motion } from 'motion/react';
import { Zap, Cpu, Target } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

const values = [
  {
    icon: Cpu,
    title: 'Systems Thinking',
    description: 'I approach problems by understanding the whole system, not just isolated components.',
  },
  {
    icon: Target,
    title: 'Real-World Focus',
    description: 'Years of hospitality operations, cash handling and audits shape how I build: software has to hold up with real users.',
  },
  {
    icon: Zap,
    title: 'Efficiency First',
    description: 'I prioritize performance and usability, building software that works smoothly under pressure.',
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 max-w-6xl mx-auto relative">
      <SectionHeader eyebrow="About" title="How I Work" subtitle="What I bring to a team." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-pencil/10 bg-surface p-7 paper-shadow"
          >
            <div className="mb-5 inline-flex p-3 rounded-xl bg-ink-blue/15 text-ink-blue">
              <value.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-pencil mb-2">{value.title}</h3>
            <p className="text-pencil/75 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
