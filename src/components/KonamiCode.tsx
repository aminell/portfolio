"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

// Easter egg : si l'utilisateur tape la séquence Konami, on déclenche un mode "found you".
// Effet : le site clignote brièvement en accent, un overlay s'affiche, puis tout revient à la normale.
// Respecte prefers-reduced-motion (effet visuel atténué).
export function KonamiCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handler = (e: KeyboardEvent) => {
      // Ignore les frappes dans un input / textarea.
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      buffer = [...buffer, e.key].slice(-SEQUENCE.length);
      if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k.toLowerCase() === SEQUENCE[i].toLowerCase())) {
        buffer = [];
        setActive(true);
        if (!reduce) {
          document.documentElement.classList.add("konami-flash");
          window.setTimeout(() => {
            document.documentElement.classList.remove("konami-flash");
          }, 900);
        }
        window.setTimeout(() => setActive(false), 4200);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center px-6"
    >
      <div className="pointer-events-auto brut-border-thick relative max-w-md bg-paper p-6 shadow-brut-lg konami-card sm:p-8">
        <div className="absolute -top-3 left-4 bg-accent px-2 py-0.5 mono text-[10px] font-bold tracking-widest text-accent-ink">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <p className="mono text-[10px] uppercase tracking-widest text-ink-soft">Easter egg</p>
        <h2 className="display-text mt-2 text-3xl uppercase">Tu as l&apos;œil.</h2>
        <p className="mt-3 text-base">
          Si tu tapes la séquence Konami sur un portfolio, on devrait probablement se parler.
        </p>
        <a
          href="mailto:contact@aminelarbi.com?subject=Konami%20%E2%9C%93"
          className="brut-border brut-press mt-5 inline-flex items-center gap-2 bg-accent px-4 py-2 font-bold uppercase text-accent-ink shadow-brut-sm"
        >
          M&apos;écrire <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
