import { useEffect, useRef } from 'react';

/**
 * Subtle interactive background: a slow-drifting node network that reacts to the cursor and
 * parallaxes with scroll, over two soft gradient glows. Intentionally low contrast so it stays
 * behind the content. Pauses when the tab is hidden and renders a single still frame when the
 * visitor prefers reduced motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number; depth: number; warm: boolean };

const BLUE = '111,142,219';
const WARM = '229,115,115';

export function BackgroundField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let last = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };
    let scrollY = window.scrollY;

    const LINK_DIST = 140;
    const MOUSE_DIST = 170;

    const seed = () => {
      const small = width < 640;
      const count = Math.max(24, Math.min(small ? 36 : 85, Math.floor((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => {
        const depth = 0.35 + Math.random() * 0.65;
        const angle = Math.random() * Math.PI * 2;
        const speed = (6 + Math.random() * 12) * depth; // px per second
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 0.9 + depth * 1.3,
          depth,
          warm: Math.random() < 0.1,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const wrap = (v: number, max: number) => ((v % max) + max) % max;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Resolve on-screen positions once per frame (scroll parallax by depth).
      const pts = nodes.map((n) => ({ n, x: n.x, y: wrap(n.y - scrollY * 0.12 * n.depth, height) }));

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST) {
            const alpha = (1 - d / MOUSE_DIST) * 0.4;
            ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const { n, x, y } of pts) {
        ctx.fillStyle = `rgba(${n.warm ? WARM : BLUE},${0.25 + n.depth * 0.35})`;
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const n of nodes) {
        n.x = wrap(n.x + n.vx * dt, width);
        n.y = wrap(n.y + n.vy * dt, height);
        if (mouse.active) {
          // Gentle push away from the cursor so the network feels responsive without being busy.
          const sy = wrap(n.y - scrollY * 0.12 * n.depth, height);
          const dx = n.x - mouse.x;
          const dy = sy - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < 120) {
            const push = (1 - d / 120) * 30 * dt;
            n.x += (dx / d) * push;
            n.y += (dy / d) * push;
          }
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduceMotion) draw();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-glow bg-glow-a" />
      <div className="bg-glow bg-glow-b" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
