import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useSpring } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Personal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // Height (and top offset) of the "I" so it spans exactly the ink of the hobby list.
  const [iBox, setIBox] = useState<{ height: number; top: number } | null>(null);
  
  const hobbies = [
    { text: "play minecraft", color: "hover:text-[#4AA02C]", decoration: "bg-[#4AA02C]/20" },
    { text: "dance", color: "hover:text-[#E91E63]", decoration: "bg-[#E91E63]/20" },
    { text: "cook", color: "hover:text-[#FF9800]", decoration: "bg-[#FF9800]/20" },
    { text: "travel", color: "hover:text-[#2196F3]", decoration: "bg-[#2196F3]/20" },
    { text: "paint", color: "hover:text-[#9C27B0]", decoration: "bg-[#9C27B0]/20" },
    { text: "do calisthenics", color: "hover:text-[#333333]", decoration: "bg-pencil/20" }
  ];

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const word = list.querySelector('span');
      if (!word || !list.offsetHeight) return;
      const fontSize = parseFloat(getComputedStyle(word).fontSize);
      // With line-height 1, the visible letters sit slightly inside each line box:
      // about 0.12em of space above the tallest letters of the first line and 0.136em below
      // the baseline of the last line. Trim both so the "I" lines up with the visible text.
      const top = fontSize * 0.12;
      const bottom = fontSize * 0.136;
      setIBox({ height: Math.max(0, list.offsetHeight - top - bottom), top });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

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
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section 
      id="personal" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24 transition-colors duration-700"
    >
      {/* Soft background glows, faded top and bottom so the section has no visible edge */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute top-[10%] right-[4%] h-[34rem] w-[34rem] max-w-[80vw] bg-[radial-gradient(circle_at_center,rgba(111,142,219,0.12),transparent_68%)]"
        />
        <motion.div
          style={{ x: useTransform(mouseX, (v) => -v), y: useTransform(mouseY, (v) => -v) }}
          className="absolute bottom-[10%] left-[4%] h-[34rem] w-[34rem] max-w-[80vw] bg-[radial-gradient(circle_at_center,rgba(229,115,115,0.08),transparent_68%)]"
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-blue">Beyond Code</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-pencil mb-3">Off Script</h2>
            <p className="text-base md:text-lg text-pencil/70 relative z-10">What I do when I am not building software.</p>
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

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-y-8 gap-x-8 lg:gap-x-16 max-w-7xl mx-auto relative px-4">
            {/* The anchor "I": drawn as a shape so its height can match the list exactly */}
            <motion.div
              aria-hidden="true"
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } },
              }}
              style={iBox ? ({ '--i-h': `${iBox.height}px`, '--i-top': `${iBox.top}px` } as React.CSSProperties) : undefined}
              className={cn(
                'shrink-0 h-24 md:self-start',
                iBox ? 'md:h-[var(--i-h)] md:mt-[var(--i-top)]' : 'md:h-[32rem]'
              )}
            >
              <svg viewBox="0 0 110 200" className="h-full w-auto block text-pencil/90" fill="currentColor" role="presentation">
                <g transform="translate(28 0) skewX(-8)">
                  <path d="M18 0H82V13Q62 13 62 30V170Q62 187 82 187V200H18V187Q38 187 38 170V30Q38 13 18 13Z" />
                </g>
              </svg>
            </motion.div>

            {/* Stylized List of Hobbies - No bullets, high contrast */}
            <div ref={listRef} className="flex flex-col items-center md:items-start gap-y-4 md:gap-y-5 relative">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group/hobby"
                >
                  <motion.span
                    whileHover={{ x: 10 }}
                    className={cn(
                      "text-2xl sm:text-3xl md:text-5xl lg:text-7xl leading-none transition-all duration-500 cursor-default whitespace-nowrap text-pencil dark:text-white block text-center md:text-left",
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
