import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Personal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const hobbies = [
    { text: "play minecraft", color: "hover:text-[#4AA02C]", decoration: "bg-[#4AA02C]/20" },
    { text: "dance", color: "hover:text-[#E91E63]", decoration: "bg-[#E91E63]/20" },
    { text: "cook", color: "hover:text-[#FF9800]", decoration: "bg-[#FF9800]/20" },
    { text: "travel", color: "hover:text-[#2196F3]", decoration: "bg-[#2196F3]/20" },
    { text: "paint", color: "hover:text-[#9C27B0]", decoration: "bg-[#9C27B0]/20" },
    { text: "do calisthenics", color: "hover:text-[#333333]", decoration: "bg-pencil/20" }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="personal" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24 transition-colors duration-700"
    >
      {/* Sketchbook Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div 
          style={{ x: mouseX, y: mouseY }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-ink-blue/5 dark:bg-ink-blue/10 rounded-full blur-3xl opacity-50"
        />
        <motion.div 
          style={{ x: useTransform(mouseX, (v) => -v), y: useTransform(mouseY, (v) => -v) }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-ink-red/5 dark:bg-ink-red/10 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header - Matching Site Header Style */}
          <motion.div variants={itemVariants} className="mb-20 relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pencil">Off <span className="text-ink-red">Script</span></h2>
            <p className="text-sm md:text-base text-pencil dark:text-dark-pencil-muted font-sketch relative z-10">Beyond the drafting table.</p>
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-2 text-ink-blue/20"
            >
              <svg viewBox="0 0 200 10" className="w-full h-full fill-none stroke-current stroke-2">
                <path d="M0,5 Q50,0 100,5 T200,5" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-x-8 lg:gap-x-20 max-w-7xl mx-auto relative px-4">
            {/* The Anchor "I" - Scaled beautifully for mobile/desktop */}
            <div className="relative group/anchor">
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="text-8xl sm:text-9xl md:text-[16rem] lg:text-[22rem] font-serif font-bold text-pencil dark:text-white leading-none select-none italic drop-shadow-xl"
              >
                I
              </motion.h2>
              <motion.div 
                className="absolute -top-6 -left-6 md:-top-12 md:-left-12 text-ink-red/20 group-hover/anchor:text-ink-red/40 transition-colors duration-500 scale-75 md:scale-100"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <svg width="60" height="60" viewBox="0 0 100 100" className="fill-current">
                  <path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z" />
                </svg>
              </motion.div>
            </div>

            {/* Stylized List of Hobbies - No bullets, high contrast */}
            <div className="flex flex-col items-center md:items-start gap-y-4 md:gap-y-5 pt-8 md:pt-4 relative">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group/hobby"
                >
                  <motion.span
                    whileHover={{ x: 10 }}
                    className={cn(
                      "text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-sketch transition-all duration-500 cursor-default whitespace-nowrap text-pencil dark:text-white block text-center md:text-left",
                      hobby.color
                    )}
                  >
                    <HobbyWord 
                      word={hobby.text} 
                      isLast={true} 
                      decorationClass={hobby.decoration} 
                    />
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Parallax sketchy elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute left-10 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-ink-blue/20 to-transparent hidden lg:block"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute right-10 bottom-1/4 w-px h-32 bg-gradient-to-b from-transparent via-ink-red/20 to-transparent hidden lg:block"
      />
    </section>
  );
}

function HobbyWord({ word, isLast, decorationClass }: { word: string, isLast: boolean, decorationClass?: string }) {
  return (
    <motion.span 
      className="inline-block relative group px-1"
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 whitespace-nowrap">
        {word}{!isLast && ","}
      </span>
      <motion.span 
        className={cn(
          "absolute -bottom-1 left-0 h-[6px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full -rotate-1",
          decorationClass || "bg-ink-blue/20"
        )}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </motion.span>
  );
}
