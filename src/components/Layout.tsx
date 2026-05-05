import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function SectionWrapper({ 
  children, 
  id, 
  className,
  title,
  subtitle 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-16">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-text-muted max-w-2xl text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  className,
  onClick,
  href
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
    secondary: "bg-white text-text-main hover:bg-zinc-50 border border-zinc-200",
    outline: "border-2 border-accent text-accent hover:bg-accent/5"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </Component>
  );
}
