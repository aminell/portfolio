"use client";

import { cloneElement, isValidElement, useEffect, useRef, type ReactElement } from "react";

type MagneticProps = {
  children: ReactElement;
  /** Distance d'attraction en pixels autour du bouton. */
  radius?: number;
  /** Intensité (0-1) du déplacement. 0.35 = subtil, 0.6 = plus marqué. */
  strength?: number;
  /** Déplacement maximum en pixels (clamp sur la magnitude). Évite les chevauchements entre voisins. */
  max?: number;
};

// Effet "magnétique" : le bouton suit légèrement le curseur quand il s'en approche.
// Vanilla JS, pas de lib. Désactivé sous prefers-reduced-motion et sur les pointers grossiers (touch).
export function Magnetic({ children, radius = 80, strength = 0.4, max = 14 }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      // Lerp doux pour un retour fluide.
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      node.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf.current = requestAnimationFrame(apply);
      } else {
        raf.current = null;
      }
    };

    const start = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(mx, my);
      const r = radius + Math.max(rect.width, rect.height) / 2;
      if (dist < r) {
        const falloff = 1 - dist / r;
        let nextX = mx * strength * falloff;
        let nextY = my * strength * falloff;
        // Clamp sur la magnitude pour ne pas dépasser `max` (évite que deux voisins se chevauchent).
        const mag = Math.hypot(nextX, nextY);
        if (mag > max) {
          nextX = (nextX / mag) * max;
          nextY = (nextY / mag) * max;
        }
        tx = nextX;
        ty = nextY;
        start();
      } else {
        tx = 0;
        ty = 0;
        start();
      }
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      start();
    };

    window.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      node.style.transform = "";
    };
  }, [radius, strength, max]);

  if (!isValidElement(children)) return children;

  // On clone l'élément pour y greffer notre ref sans wrapper supplémentaire.
  return cloneElement(children, {
    ref: (el: HTMLElement | null) => {
      ref.current = el;
      const original = (children as { ref?: unknown }).ref;
      if (typeof original === "function") (original as (n: HTMLElement | null) => void)(el);
      else if (original && typeof original === "object" && "current" in (original as object)) {
        (original as { current: HTMLElement | null }).current = el;
      }
    }
  } as Partial<typeof children.props>);
}
