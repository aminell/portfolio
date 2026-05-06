import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="accueil"
      className="relative isolate border-b-2 border-ink pt-28 sm:pt-32"
    >
      <div className="mx-auto grid min-h-[82svh] w-full max-w-[1400px] items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-12 md:py-20">
        <div className="md:col-span-8">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="mono text-xs uppercase tracking-[0.25em] text-ink-soft">
                Portfolio · 2026
              </p>
              {hero.available && (
                <span className="brut-border bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-ink">
                  {hero.availableLabel}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display-text max-w-4xl text-7xl uppercase sm:text-8xl md:text-9xl">
              {hero.name}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-xl font-semibold sm:text-2xl">{hero.headline}</p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">{hero.intro}</p>
          </Reveal>

          <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.ctaPrimary.href}
              className="brut-border inline-flex items-center gap-2 bg-accent px-5 py-3 font-bold uppercase text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary.label}
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="brut-border inline-flex items-center gap-2 bg-paper px-5 py-3 font-bold uppercase transition-colors hover:bg-paper-alt"
            >
              {hero.ctaSecondary.label}
              <span aria-hidden="true">-&gt;</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="md:col-span-4">
          <aside className="brut-border-thick relative bg-paper-alt p-6 shadow-brut-lg">
            <div className="absolute -top-3 left-4 bg-accent px-2 py-0.5 mono text-xs font-bold tracking-widest text-accent-ink">
              ID CARD
            </div>

            <dl className="grid grid-cols-2 gap-y-5 text-sm">
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Nom</dt>
              <dd className="font-bold">Amine Larbi</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Âge</dt>
              <dd className="font-bold">19 ans</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Lieu</dt>
              <dd className="font-bold">Île-de-France</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Statut</dt>
              <dd className="font-bold">BTS SIO SLAM 2026</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Cible</dt>
              <dd className="font-bold">Alternance dev</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Stack</dt>
              <dd className="font-bold">Python, Web, TS</dd>
            </dl>

            <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-ink pt-4 mono text-xs">
              <span>
                <span className="text-ink-soft">{"// "}</span>profil junior.
              </span>
              <LiveClock />
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
