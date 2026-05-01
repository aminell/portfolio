"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { content } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(isHome ? content.nav[0]?.id ?? "" : "");
  const homeHref = isHome ? "#accueil" : "/#accueil";
  const getSectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link : lit la section au centre de la viewport.
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }

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
  }, [isHome]);

  // Verrouille le scroll quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-paper/85 backdrop-blur-md transition-[padding] duration-200 data-[scrolled=true]:py-2"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href={homeHref} className="flex items-center gap-3 font-bold" aria-label="Aller à l'accueil">
          <span className="brut-border grid h-10 w-10 place-items-center bg-accent font-bold text-accent-ink">
            AL
          </span>
          <span className="display-text text-xl tracking-tight">{content.site.name}</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {content.nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={getSectionHref(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span className="mono text-[10px] text-accent">{item.index}</span>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-[3px] origin-left bg-accent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="brut-border brut-press grid h-11 w-11 place-items-center bg-paper-alt shadow-brut-sm md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-ink transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-5 bg-ink transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"} border-t-2 border-ink bg-paper`}
      >
        <ul className="flex flex-col">
          {content.nav.map((item) => (
            <li key={item.id} className="border-b border-ink-line last:border-0">
              <a
                href={getSectionHref(item.id)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-4 font-semibold"
              >
                <span className="flex items-center gap-3">
                  <span className="mono text-xs text-accent">{item.index}</span>
                  {item.label}
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
