import { useEffect, useState } from 'react';

/**
 * Effet machine à écrire : tape puis efface une liste de phrases en boucle.
 * Respecte `prefers-reduced-motion` en affichant simplement la première phrase.
 */
export function useTypewriter(phrases: string[], typeSpeed = 55, deleteSpeed = 28, pause = 1400) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setText(phrases[0] ?? '');
      return;
    }

    const current = phrases[index % phrases.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === current) {
      delay = pause;
    } else if (deleting && text === '') {
      delay = 350;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  return text;
}
