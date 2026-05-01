type MarqueeProps = {
  items: string[];
  className?: string;
  separator?: string;
};

// Bande défilante CSS pure (animation Tailwind `marquee`).
// On duplique la liste pour une boucle visuellement continue.
export function Marquee({ items, className = "", separator = "✦" }: MarqueeProps) {
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max items-center gap-10 whitespace-nowrap animate-marquee">
        {loop.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex items-center gap-10 text-2xl font-bold uppercase tracking-tight">
            <span>{item}</span>
            <span aria-hidden="true" className="text-accent">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
