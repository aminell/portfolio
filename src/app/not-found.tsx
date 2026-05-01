import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="mono text-sm uppercase tracking-widest text-ink-soft">Erreur 404</p>
      <h1 className="display-text text-9xl">Page introuvable.</h1>
      <p className="max-w-lg text-lg text-ink-soft">
        Cette page n&apos;existe pas (ou plus). Retour à l&apos;accueil pour reprendre la visite.
      </p>
      <Link
        href="/"
        className="brut-border brut-press inline-flex items-center bg-accent px-6 py-3 font-bold text-accent-ink shadow-brut"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
