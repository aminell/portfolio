"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

// Barre de progression de scroll + marqueurs de sections.
// Le calcul est fait dans rAF pour rester fluide même sur des longues pages.
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>(content.nav[0]?.id ?? "");
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(ratio);
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        compute();
        frame.current = null;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Section active via IntersectionObserver (mêmes seuils que le header).
  useEffect(() => {
    const sections = content.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Position relative de chaque section dans le doc, calculée une fois (et au resize).
  const [ticks, setTicks] = useState<{ id: string; label: string; index: string; pct: number }[]>([]);
  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setTicks([]);
        return;
      }
      const next = content.nav
        .map((n) => {
          const el = document.getElementById(n.id);
          if (!el) return null;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return { id: n.id, label: n.label, index: n.index, pct: Math.min(1, Math.max(0, top / max)) };
        })
        .filter((t): t is { id: string; label: string; index: string; pct: number } => t !== null);
      setTicks(next);
    };
    compute();
    window.addEventListener("resize", compute);
    // Recompute after a short delay to capture late layout shifts (fonts, images).
    const id = window.setTimeout(compute, 400);
    return () => {
      window.removeEventListener("resize", compute);
      window.clearTimeout(id);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1.5">
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})`, willChange: "transform" }}
      />
      {/* Tics de sections — cliquables */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 h-full">
        {ticks.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            aria-label={`Aller à ${t.label}`}
            className="group absolute top-0 -translate-x-1/2"
            style={{ left: `${t.pct * 100}%` }}
          >
            <span
              className={`block h-1.5 w-[3px] ${
                active === t.id ? "bg-ink" : "bg-ink/40 group-hover:bg-ink"
              }`}
            />
            <span
              className={`pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap brut-border bg-paper px-1.5 py-0.5 mono text-[9px] font-bold uppercase tracking-widest opacity-0 shadow-brut-sm transition-opacity ${
                "group-hover:opacity-100 group-focus-visible:opacity-100"
              }`}
            >
              {t.index} · {t.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
