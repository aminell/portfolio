import { content } from "@/lib/content";

type FooterProps = {
  topHref?: string;
};

export function Footer({ topHref = "#accueil" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] py-10 text-[#F5F2EA]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="brut-border-thick grid h-10 w-10 place-items-center bg-accent font-bold text-accent-ink">
            AL
          </span>
          <div>
            <p className="display-text text-lg uppercase">{content.site.name}</p>
            <p className="mono text-[11px] uppercase tracking-widest text-[#F5F2EA]/60">
              © {year} · Tous droits réservés
            </p>
          </div>
        </div>

        <p className="mono text-xs uppercase tracking-widest text-[#F5F2EA]/70">{content.footer.tagline}</p>

        <a
          href={topHref}
          className="border-2 border-[#F5F2EA] bg-[#F5F2EA] px-4 py-2 text-sm font-bold uppercase text-[#0A0A0A] transition-transform hover:-translate-y-0.5"
        >
          Retour en haut <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
