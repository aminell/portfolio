import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Marquee } from "./Marquee";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] flex-col justify-between border-b-2 border-ink pt-28 sm:pt-32"
    >
      {/* Bandeau dispo en haut */}
      {hero.available && (
        <Reveal className="absolute left-0 right-0 top-20 z-10 mx-auto hidden w-fit md:block">
          <div className="brut-border flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold text-accent-ink shadow-brut-sm">
            <span className="relative grid h-2.5 w-2.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-ink opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-accent-ink" />
            </span>
            {hero.availableLabel}
          </div>
        </Reveal>
      )}

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-12 px-5 py-10 sm:px-8 md:grid-cols-12 md:py-16">
        {/* Bloc nom — colonne gauche, asymétrique */}
        <div className="md:col-span-8">
          <Reveal>
            <p className="mono mb-6 text-xs uppercase tracking-[0.3em] text-ink-soft">
              Portfolio · 2026 · v2
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display-text text-10xl uppercase">
              <span className="block">Amine</span>
              <span className="relative block">
                <span className="relative z-10">Larbi.</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 right-[35%] -z-10 h-[0.45em] bg-accent"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-xl font-semibold sm:text-2xl">{hero.headline}</p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-5 max-w-xl text-base text-ink-soft sm:text-lg">{hero.intro}</p>
          </Reveal>

          <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.ctaPrimary.href}
              className="brut-border brut-press inline-flex items-center gap-2 bg-accent px-6 py-3 font-bold uppercase text-accent-ink shadow-brut"
            >
              {hero.ctaPrimary.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="brut-border brut-press inline-flex items-center gap-2 bg-paper px-6 py-3 font-bold uppercase shadow-brut"
            >
              {hero.ctaSecondary.label}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        {/* Carte d'identité — colonne droite, fixe */}
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
              <dd className="font-bold">BTS SIO SLAM ’26</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Cible</dt>
              <dd className="font-bold">Alternance dev</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Stack</dt>
              <dd className="font-bold">Python, Web</dd>
            </dl>
            <div className="mt-6 border-t-2 border-ink pt-4 mono text-xs">
              <span className="text-ink-soft">{'// '}</span>en construction permanente.
            </div>
          </aside>
        </Reveal>
      </div>

      {/* Marquee bas du hero */}
      <div className="border-t-2 border-ink bg-ink py-3 text-paper">
        <Marquee items={hero.tickerWords} />
      </div>
    </section>
  );
}
