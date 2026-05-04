"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  /** IANA timezone. Par défaut Paris (UTC+1/+2). */
  timeZone?: string;
  className?: string;
  label?: string;
};

// Petit composant horloge live, mis à jour chaque seconde.
// Évite le mismatch SSR : on attend le mount avant d'afficher la valeur.
export function LiveClock({ timeZone = "Europe/Paris", className = "", label = "Paris" }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // États dérivés : heure formatée + statut "ouvré".
  const timeStr = now
    ? new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
        hour12: false
      }).format(now)
    : "--:--:--";

  // Heure locale Paris pour le calcul "ouvré" (lun-ven 9h-18h).
  const parts = now
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        hour: "2-digit",
        hour12: false,
        timeZone
      })
        .formatToParts(now)
        .reduce<Record<string, string>>((acc, p) => {
          acc[p.type] = p.value;
          return acc;
        }, {})
    : null;

  const isWorkingHours = (() => {
    if (!parts) return false;
    const weekday = parts.weekday?.toLowerCase() ?? "";
    const hour = Number(parts.hour);
    const isWeekday = ["mon", "tue", "wed", "thu", "fri"].includes(weekday);
    return isWeekday && hour >= 9 && hour < 18;
  })();

  return (
    <div
      className={`flex items-center gap-2 mono text-xs uppercase tracking-widest ${className}`}
      aria-label={`Heure ${label} : ${timeStr}`}
    >
      <span className="relative grid h-2 w-2 place-items-center">
        <span
          className={`absolute inset-0 rounded-full ${
            isWorkingHours ? "animate-ping bg-accent" : "bg-ink-soft"
          } opacity-60`}
        />
        <span
          className={`relative h-1.5 w-1.5 rounded-full ${
            isWorkingHours ? "bg-accent" : "bg-ink-soft"
          }`}
        />
      </span>
      <span className="text-ink-soft">{label}</span>
      <span className="font-bold tabular-nums text-ink">{timeStr}</span>
    </div>
  );
}
