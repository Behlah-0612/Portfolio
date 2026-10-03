import { motion } from 'motion/react';

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 md:mb-16"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-blue">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-pencil mb-3">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-base md:text-lg text-pencil/70">{subtitle}</p>}
    </motion.div>
  );
}
