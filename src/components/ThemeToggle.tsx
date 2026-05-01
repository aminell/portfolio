"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="brut-border brut-press inline-flex h-11 items-center gap-2 bg-paper-alt px-3 font-bold uppercase tracking-wide shadow-brut-sm"
    >
      <span aria-hidden="true" className="grid place-items-center text-base">
        {isDark ? "☀" : "☾"}
      </span>
      <span className="hidden text-xs sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
