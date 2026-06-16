import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#01ABCDEF';

function scrambleOf(text: string) {
  return Array.from(text, (ch) => (ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join('');
}

interface Props {
  text: string;
  className?: string;
}

/**
 * Titre <h2> qui se « décode » (effet hacker) lorsqu'il entre dans le viewport :
 * chaque caractère défile en aléatoire puis se fige sur la bonne lettre.
 */
export default function ScrambleText({ text, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [display, setDisplay] = useState(() => {
    if (typeof window === 'undefined') return text;
    return prefersReducedMotion ? text : scrambleOf(text);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 850;
      const revealAt = Array.from(text, (_, i) => (i / text.length) * duration * 0.62 + Math.random() * 260);

      const frame = (now: number) => {
        const elapsed = now - start;
        let out = '';
        let done = true;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === ' ') {
            out += ' ';
          } else if (elapsed >= revealAt[i]) {
            out += ch;
          } else {
            done = false;
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(out);
        if (!done) {
          raf = requestAnimationFrame(frame);
        } else {
          setDisplay(text);
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            run();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, text]);

  return (
    <h2 ref={ref} className={className} data-scramble>
      {prefersReducedMotion ? text : display}
    </h2>
  );
}
