import { useRef } from 'react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  max?: number;
}

/**
 * Carte <article> qui s'incline en 3D vers le curseur (effet de profondeur) et
 * révèle une lueur qui suit le pointeur. Conserve la révélation au scroll via
 * `data-reveal`. Neutralisé au tactile et si `prefers-reduced-motion`.
 */
export default function TiltCard({ children, className, delay = 0, max = 7 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * max * 2;
    const rotateY = (px - 0.5) * max * 2;

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      el.style.transition = 'transform 0s';
      el.style.transform = `perspective(820px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transition = 'transform 0.45s ease';
    el.style.transform = '';
  };

  return (
    <article
      ref={ref}
      className={`tilt-card ${className ?? ''}`}
      data-reveal=""
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </article>
  );
}
