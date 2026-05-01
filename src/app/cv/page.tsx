import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `CV · ${content.site.name}`,
  description: `Consultez et telechargez le CV d'${content.site.name}.`
};

export default function CvPage() {
  return (
    <>
      <a href="#cv" className="skip-link">
        Aller au CV
      </a>
      <Header />
      <main id="cv" className="min-h-screen border-b-2 border-ink pt-28 sm:pt-32">
        <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-5 pb-16 pt-8 sm:px-8 md:pb-20">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mono mb-5 text-xs uppercase tracking-[0.3em] text-ink-soft">
                Curriculum vitae · Alternance 2026
              </p>
              <h1 className="display-text max-w-4xl text-7xl uppercase sm:text-8xl md:text-9xl">
                CV
                <span className="relative ml-3 inline-block">
                  <span className="relative z-10">Amine Larbi</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 -z-10 h-[0.32em] bg-accent"
                  />
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold text-ink-soft sm:text-xl">
                Le CV est consultable directement ici, avec une version PDF disponible au
                téléchargement.
              </p>
            </div>

            <a
              href="/cv.pdf"
              download
              className="brut-border brut-press inline-flex w-fit items-center gap-2 bg-accent px-6 py-3 font-bold uppercase text-accent-ink shadow-brut"
            >
              Télécharger le CV
              <span aria-hidden="true">↓</span>
            </a>
          </Reveal>

          <Reveal delay={120} className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <aside className="brut-border-thick bg-paper-alt p-5 shadow-brut-lg lg:sticky lg:top-28 lg:self-start">
              <div className="bg-accent px-2 py-1 mono text-xs font-bold uppercase tracking-widest text-accent-ink">
                Aperçu
              </div>
              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Profil</dt>
                  <dd className="mt-1 font-bold">Étudiant développeur</dd>
                </div>
                <div>
                  <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Objectif</dt>
                  <dd className="mt-1 font-bold">Alternance développement</dd>
                </div>
                <div>
                  <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Rentrée</dt>
                  <dd className="mt-1 font-bold">2026</dd>
                </div>
                <div>
                  <dt className="mono text-xs uppercase tracking-widest text-ink-soft">Localisation</dt>
                  <dd className="mt-1 font-bold">Île-de-France</dd>
                </div>
              </dl>
            </aside>

            <section
              aria-label="CV PDF"
              className="brut-border-thick bg-paper-alt p-3 shadow-brut-lg sm:p-4"
            >
              <object
                data="/cv.pdf#view=FitH"
                type="application/pdf"
                className="h-[72vh] min-h-[560px] w-full bg-paper"
              >
                <div className="grid min-h-[420px] place-items-center bg-paper p-8 text-center">
                  <div>
                    <p className="text-lg font-bold">Impossible d&apos;afficher le PDF ici.</p>
                    <a
                      href="/cv.pdf"
                      className="mt-5 inline-flex font-bold uppercase underline decoration-accent decoration-4 underline-offset-4"
                    >
                      Ouvrir le CV
                    </a>
                  </div>
                </div>
              </object>
            </section>
          </Reveal>
        </section>
      </main>
      <Footer topHref="#cv" />
    </>
  );
}
