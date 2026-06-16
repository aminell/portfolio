import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Fond « réseau » animé : des noeuds dérivent et se relient par des segments
 * lorsqu'ils sont proches. Le pointeur repousse légèrement les noeuds alentour.
 * Dessiné sur un <canvas> plein écran, derrière le contenu. Inactif si
 * `prefers-reduced-motion` est demandé, et en pause quand l'onglet est masqué.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Particle[] = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };

    let color = readAccent();

    function readAccent() {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      return value || '#0f766e';
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(96, Math.floor((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      const maxDist = 132;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= width) n.vx *= -1;
        if (n.y <= 0 || n.y >= height) n.vy *= -1;

        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0.001) {
          const push = (150 - dist) / 150;
          n.x += (dx / dist) * push * 1.1;
          n.y += (dy / dist) * push * 1.1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx!.globalAlpha = (1 - d / maxDist) * 0.38;
            ctx!.strokeStyle = color;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        ctx!.globalAlpha = 0.7;
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 1.7, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      raf = window.requestAnimationFrame(tick);
    }

    function start() {
      if (!raf) raf = window.requestAnimationFrame(tick);
    }

    function stop() {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const themeObserver = new MutationObserver(() => {
      color = readAccent();
    });

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
