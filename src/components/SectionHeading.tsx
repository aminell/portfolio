import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
};

// En-tête de section brutaliste : numéro, kicker mono, titre display géant.
export function SectionHeading({ index, kicker, title }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16">
      <div className="flex items-center gap-4">
        <span className="brut-border bg-accent px-2 py-1 text-xs font-bold tracking-widest text-accent-ink mono">
          {index}
        </span>
        <span className="mono text-xs uppercase tracking-[0.25em] text-ink-soft">{kicker}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink-line" />
      </div>
      <h2 className="display-text text-5xl sm:text-6xl md:text-7xl">{title}</h2>
    </Reveal>
  );
}
