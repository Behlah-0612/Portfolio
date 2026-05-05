import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function SketchyBorder({ children, className, color = "currentColor", padding = "p-4", onClick }: { children: React.ReactNode; className?: string; color?: string; padding?: string; onClick?: () => void }) {
  return (
    <div className={cn("relative group/sketch", padding, className)} onClick={onClick}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path
          d="M2,2 Q50,0 98,2 Q100,50 98,98 Q50,100 2,98 Q0,50 2,2"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="group-hover/sketch:stroke-[2] transition-all"
        />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function StickyNote({ children, className, color = "bg-yellow-100", onClick }: { children: React.ReactNode; className?: string; color?: string; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ rotate: Math.random() * 4 - 2 }}
      onClick={onClick}
      className={cn("p-6 paper-shadow relative cursor-pointer transition-shadow hover:shadow-xl", color, className)}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-tape/40 rotate-2 group-hover:bg-tape/60 transition-colors" />
      {children}
    </motion.div>
  );
}

export function Doodle({ type, className, animate = true, interactive = false }: { type: 'star' | 'circle' | 'scribble' | 'arrow' | 'bulb'; className?: string; animate?: boolean; interactive?: boolean }) {
  const paths = {
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    circle: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z",
    scribble: "M2 12c4-4 8 4 12-4s8 4 12-4",
    arrow: "M3 12h18m-6-6l6 6-6 6",
    bulb: "M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"
  };

  return (
    <motion.svg 
      className={cn("w-8 h-8 opacity-40", interactive && "pointer-events-auto cursor-default", className)} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      whileHover={interactive ? { 
        rotate: [0, -10, 10, -5, 5, 0],
        scale: 1.1,
        transition: { duration: 0.5 }
      } : undefined}
    >
      <motion.path
        d={paths[type]}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        animate={animate ? { pathLength: [0, 1] } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </motion.svg>
  );
}

export function HandDrawnArrow({ className }: { className?: string }) {
  return (
    <svg className={cn("w-12 h-12", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.path
        d="M3 12h18m-6-6l6 6-6 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}

export function Hint({ text, className }: { text: string; className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ y: { duration: 2, repeat: Infinity } }}
      className={cn(
        "absolute pointer-events-none font-sketch text-sm whitespace-nowrap z-50",
        "text-ink-blue dark:text-dark-ink-blue opacity-80 dark:opacity-90",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <span>{text}</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </motion.div>
  );
}

export function CurvedLine({ className, d }: { className?: string; d: string }) {
  return (
    <svg className={cn("absolute pointer-events-none overflow-visible", className)} viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function FlowArrow({ className, rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <motion.div
      style={{ rotate }}
      animate={{ x: [0, 5, 0], y: [0, 2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={cn("absolute pointer-events-none text-ink-red/30", className)}
    >
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h18m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
