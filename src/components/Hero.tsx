import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden border-b-2 border-ink pt-28 sm:pt-32"
    >
      <div aria-hidden="true" className="circuit-grid absolute inset-0 -z-10" />

      <div className="mx-auto grid min-h-[82svh] w-full max-w-[1400px] items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-12 md:py-20">
        <div className="md:col-span-8">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="mono text-xs uppercase tracking-[0.25em] text-ink-soft">
                Portfolio RT · 2026
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

          <Reveal delay={380} className="mt-10 grid gap-3 sm:grid-cols-3">
            {hero.metrics.map((metric) => (
              <div key={metric.label} className="brut-border bg-paper/90 p-4">
                <p className="display-text text-2xl uppercase">{metric.value}</p>
                <p className="mono mt-2 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                  {metric.label}
                </p>
                <p className="mt-1 text-sm font-semibold">{metric.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="md:col-span-4">
          <aside className="brut-border-thick relative overflow-hidden bg-paper shadow-brut-lg">
            <div className="flex items-center justify-between border-b-2 border-ink bg-accent px-4 py-3 text-accent-ink">
              <p className="mono text-xs font-bold uppercase tracking-widest">RT control board</p>
              <LiveClock />
            </div>

            <div className="network-topology border-b-2 border-ink bg-paper-alt">
              <svg className="topo-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="50" y1="50" x2="22" y2="28" />
                <line x1="50" y1="50" x2="78" y2="28" />
                <line x1="50" y1="50" x2="24" y2="74" />
                <line x1="50" y1="50" x2="76" y2="74" />
              </svg>
              <span className="topo-node topo-core">CORE</span>
              <span className="topo-node topo-wan">WAN</span>
              <span className="topo-node topo-lan">LAN</span>
              <span className="topo-node topo-sec">SEC</span>
              <span className="topo-node topo-wifi">WIFI</span>
            </div>

            <dl className="grid grid-cols-2 gap-y-5 p-6 text-sm">
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Nom</dt>
              <dd className="font-bold">Amine Larbi</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Formation</dt>
              <dd className="font-bold">BUT RT 2026</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Terrain</dt>
              <dd className="font-bold">Île-de-France</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Axes</dt>
              <dd className="font-bold">Réseau · Télécom · Cyber</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Labs</dt>
              <dd className="font-bold">VLAN, IP, Linux</dd>
              <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Mode</dt>
              <dd className="font-bold">Tester + documenter</dd>
            </dl>

            <div className="flex items-center justify-between gap-3 border-t-2 border-ink bg-paper-alt px-6 py-4 mono text-xs">
              <span>
                <span className="text-ink-soft">{"// "}</span>signal propre.
              </span>
              <span className="font-bold text-accent">LINK UP</span>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
