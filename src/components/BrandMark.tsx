import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { cn } from '@/src/lib/utils';

const WAVE_MS = 1800;

/**
 * The K monogram: three drawn strokes (stem, arm, leg) on a rounded tile, so it never depends on a font.
 *  - Hovering it makes the arm wave hello (and, with `greet`, a small "Hi!" appears).
 *  - `progress` traces the tile border as the page scrolls (nav).
 *  - `draw` draws the strokes in on load, in pure CSS so it starts before any JavaScript runs.
 *  - `interactive` adds cursor tilt with a moving highlight and a slow light sweep.
 */
export function Emblem({
  progress,
  draw = false,
  interactive = false,
  greet = false,
  className,
}: {
  progress?: MotionValue<number>;
  draw?: boolean;
  interactive?: boolean;
  greet?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const [waving, setWaving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const rotX = useSpring(0, { stiffness: 90, damping: 14 });
  const rotY = useSpring(0, { stiffness: 90, damping: 14 });
  const hx = useMotionValue(50);
  const hy = useMotionValue(30);
  const glow = useMotionTemplate`radial-gradient(circle at ${hx}% ${hy}%, rgba(255,255,255,0.2), transparent 55%)`;

  useEffect(() => {
    if (!interactive || reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rotY.set(nx * 20);
      rotX.set(-ny * 20);
      hx.set(50 + nx * 80);
      hy.set(35 + ny * 80);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive, reduce, rotX, rotY, hx, hy]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const wave = () => {
    if (reduce || waving) return;
    setWaving(true);
    timer.current = window.setTimeout(() => setWaving(false), WAVE_MS);
  };

  const strokeProps = (delay: number) =>
    draw ? { className: 'emblem-stroke-draw', style: { '--delay': `${delay}s` } as CSSProperties } : {};

  return (
    <motion.div
      style={interactive && !reduce ? { rotateX: rotX, rotateY: rotY, transformPerspective: 800 } : undefined}
      className={cn('emblem relative', interactive && 'cursor-pointer select-none', className)}
      onPointerEnter={wave}
      onClick={wave}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                wave();
              }
            },
          }
        : {})}
    >
      <svg viewBox="0 0 64 64" className="block h-full w-full" role="img" aria-label="K monogram">
        <defs>
          <linearGradient id={`${uid}-arm`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6f8edb" />
            <stop offset="1" stopColor="#b9c9f7" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" width="60" height="60" rx="16" fill="var(--color-surface)" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        {progress && (
          <motion.rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="16"
            fill="none"
            stroke="var(--color-ink-blue)"
            strokeWidth="2.4"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        )}

        {/* The arm and leg are drawn first so they emerge from behind the stem */}
        <g fill="none" strokeWidth="7" strokeLinecap="round">
          <g className={cn('emblem-arm', waving && 'emblem-arm-wave')}>
            <path d="M22 32L42 15" pathLength={1} stroke={`url(#${uid}-arm)`} {...strokeProps(0.8)} />
          </g>
          <path d="M22 32L42 49" pathLength={1} stroke="currentColor" {...strokeProps(1.05)} />
          <path d="M22 15V49" pathLength={1} stroke="currentColor" {...strokeProps(0.5)} />
        </g>
      </svg>

      {greet && waving && (
        <span aria-hidden="true" className="emblem-hi">
          Hi!
        </span>
      )}

      {interactive && !reduce && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[25%]">
          <motion.span className="absolute inset-0" style={{ background: glow }} />
          <span className="tile-shine" />
        </span>
      )}
    </motion.div>
  );
}

/**
 * A word whose letters rise in one by one, then catch a faint wave of light. All CSS, so it runs from
 * the server-rendered HTML without waiting for JavaScript.
 *  - `loop` rises in, then repeats the wave every ten seconds.
 *  - `trigger` has no entrance and plays the wave once each time `waveKey` changes.
 */
export function AnimatedWord({
  text,
  mode = 'loop',
  waveKey = 0,
  baseDelay = 0.15,
  base = 'var(--color-pencil)',
  peak = 'var(--color-ink-blue)',
  className,
}: {
  text: string;
  mode?: 'loop' | 'trigger';
  waveKey?: number;
  baseDelay?: number;
  base?: string;
  peak?: string;
  className?: string;
}) {
  return (
    <span
      aria-label={text}
      className={cn('inline-flex overflow-hidden pt-[0.08em] pb-[0.14em]', className)}
      style={{ '--name-base': base, '--name-peak': peak } as CSSProperties}
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn('inline-block', mode === 'loop' ? 'name-letter' : 'name-letter-once')}
          style={
            {
              '--i': i,
              '--d': `${baseDelay + i * 0.05}s`,
              ...(mode === 'trigger' ? { animationName: waveKey % 2 ? 'name-wave-a' : 'name-wave-b' } : {}),
            } as CSSProperties
          }
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}
