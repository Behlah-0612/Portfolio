import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from 'motion/react';
import { Doodle } from './Sketchy';
import { cn } from '@/src/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'circle' | 'scribble';
  rotate: number;
  scale: number;
  color: string;
}

export function ScrollSystem() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBurst, setShowBurst] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const burstTriggered = useRef(false);
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  // Squiggly Path for the viewport frame
  const framePath = "M 5,5 C 20,4 35,6 50,5 C 65,4 80,6 95,5 C 96,20 94,35 95,50 C 96,65 94,80 95,95 C 80,96 65,94 50,95 C 35,96 20,94 5,95 C 4,80 6,65 5,50 C 4,35 6,20 5,5 Z";

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      if (latest > 0.98) {
        if (!burstTriggered.current) {
          if (pauseTimer.current) clearTimeout(pauseTimer.current);
          pauseTimer.current = setTimeout(() => {
            triggerBurst();
          }, 300);
        }
      } else {
        if (pauseTimer.current) {
          clearTimeout(pauseTimer.current);
          pauseTimer.current = null;
        }
        // Reset trigger if user scrolls up significantly
        if (latest < 0.9) {
          burstTriggered.current = false;
        }
      }
    });

    return () => {
      unsub();
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [scrollYProgress]);

  const triggerBurst = () => {
    if (burstTriggered.current) return;
    burstTriggered.current = true;
    setShowBurst(true);

    const newParticles: Particle[] = Array.from({ length: 40 }).map((_, i) => {
      const side = Math.floor(Math.random() * 3); // 0: left, 1: right, 2: bottom corners
      let x, y;
      
      if (side === 0) { // Left edge
        x = Math.random() * 10;
        y = Math.random() * 80 + 10;
      } else if (side === 1) { // Right edge
        x = 90 + Math.random() * 10;
        y = Math.random() * 80 + 10;
      } else { // Bottom corners
        x = Math.random() < 0.5 ? (Math.random() * 20) : (80 + Math.random() * 20);
        y = 90 + Math.random() * 10;
      }

      return {
        id: Date.now() + i,
        x,
        y,
        type: ['star', 'circle', 'scribble'][Math.floor(Math.random() * 3)] as any,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8,
        color: ['text-ink-blue', 'text-ink-red', 'text-ink-green', 'text-pencil'][Math.floor(Math.random() * 4)]
      };
    });

    setParticles(newParticles);
    setTimeout(() => {
      setShowBurst(false);
      setParticles([]);
    }, 2500);
  };

  return (
    <>
      {/* Global Scroll Tracker Line */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-visible">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full opacity-30 dark:opacity-20"
        >
          <motion.path
            d={framePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            strokeLinecap="round"
            strokeDasharray="1 1"
            className="text-pencil dark:text-dark-pencil"
            style={{ 
              pathLength: smoothProgress,
              vectorEffect: 'non-scaling-stroke'
            }}
          />
          
          {/* Progress Symbols (appearing at fixed intervals) */}
          {[0.2, 0.4, 0.6, 0.8].map((threshold, i) => (
            <SymbolAtProgress 
              key={threshold} 
              progress={smoothProgress} 
              threshold={threshold}
              i={i}
            />
          ))}
        </svg>
      </div>

      {/* End of Page Celebration */}
      <AnimatePresence>
        {showBurst && (
          <div className="fixed inset-0 pointer-events-none z-[100]">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: `${p.x}vw`, 
                  y: `${p.y}vh`, 
                  opacity: 0, 
                  scale: 0,
                  rotate: p.rotate 
                }}
                animate={{ 
                  x: `${p.x + (p.x < 50 ? 10 : -10) + (Math.random() * 10 - 5)}vw`,
                  y: `110vh`, 
                  opacity: 1, 
                  scale: p.scale,
                  rotate: p.rotate + 360
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className={cn("absolute", p.color)}
              >
                <Doodle type={p.type} className="w-6 h-6" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
            >
              <h3 className="text-3xl md:text-5xl font-sketch text-ink-blue dark:text-dark-ink-blue">
                you made it :)
              </h3>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function SymbolAtProgress({ progress, threshold, i }: { progress: any, threshold: number, i: number, key?: any }) {
  const opacity = useTransform(progress, (v) => ((v as number) >= threshold ? 1 : 0));
  
  // Hand-picked coordinates corresponding to framePath progression
  const coords = [
    { x: 50, y: 5, type: 'star' },    // Top middle
    { x: 95, y: 50, type: 'circle' },  // Right middle
    { x: 50, y: 95, type: 'scribble' }, // Bottom middle
    { x: 5, y: 50, type: 'star' }     // Left middle
  ];

  const { x, y, type } = coords[i];

  return (
    <motion.g style={{ opacity }}>
      <foreignObject x={x - 2} y={y - 2} width="4" height="4">
        <Doodle type={type as any} className="w-full h-full text-pencil/40 dark:text-dark-pencil/40" />
      </foreignObject>
    </motion.g>
  );
}
