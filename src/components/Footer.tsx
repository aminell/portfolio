import { content } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-10 text-paper">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="brut-border-thick grid h-10 w-10 place-items-center bg-accent font-bold text-accent-ink">
            AL
          </span>
          <div>
            <p className="display-text text-lg uppercase">{content.site.name}</p>
            <p className="mono text-[11px] uppercase tracking-widest text-paper/60">
              © {year} · Tous droits réservés
            </p>
          </div>
        </div>

        <p className="mono text-xs uppercase tracking-widest text-paper/70">{content.footer.tagline}</p>

        <a
          href="#accueil"
          className="brut-border-thick brut-press inline-flex items-center gap-2 bg-paper px-4 py-2 text-sm font-bold uppercase text-ink"
        >
          Retour en haut <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
