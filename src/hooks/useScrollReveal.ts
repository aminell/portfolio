import { useEffect } from 'react';

/**
 * Observe tous les éléments marqués `[data-reveal]` et leur ajoute la classe
 * `is-visible` lorsqu'ils entrent dans le viewport. Les animations réelles
 * (fondu + translation, barres de compétences, ligne de timeline…) sont gérées
 * en CSS via cette classe, avec un délai optionnel `--reveal-delay`.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (elements.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
