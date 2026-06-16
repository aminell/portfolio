import { useEffect, useRef, useState } from 'react';

/**
 * Compteur qui s'incrémente de 0 jusqu'à `target` (easing) la première fois que
 * l'élément référencé entre dans le viewport. Renvoie la ref à poser sur
 * l'élément et la valeur courante.
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(target: number, duration = 1600) {
  const ref = useRef<T>(null);
  const started = useRef(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(() => (prefersReducedMotion ? target : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const frame = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) raf = requestAnimationFrame(frame);
            };
            raf = requestAnimationFrame(frame);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, prefersReducedMotion]);

  return [ref, prefersReducedMotion ? target : value] as const;
}
