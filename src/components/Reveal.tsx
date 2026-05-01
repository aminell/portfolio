"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
};

// Wrapper léger : applique .is-visible à l'entrée dans la viewport.
// Animation gérée par .reveal dans globals.css (respecte prefers-reduced-motion).
export function Reveal({ as: Tag = "div", className = "", delay = 0, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => node.classList.add("is-visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const Component = Tag as keyof JSX.IntrinsicElements;
  // @ts-expect-error - ref générique sur tag dynamique : on accepte la perte de précision.
  return <Component ref={ref} className={`reveal ${className}`} {...rest} />;
}
