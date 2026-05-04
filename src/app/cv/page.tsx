import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { CvViewer } from "@/components/CvViewer";
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
              <div className="mt-5 flex flex-wrap items-center gap-2 mono text-[10px] uppercase tracking-widest text-ink-soft">
                <span className="brut-border bg-paper-alt px-2 py-1">
                  <kbd className="font-bold">D</kbd> télécharger
                </span>
                <span className="brut-border bg-paper-alt px-2 py-1">
                  <kbd className="font-bold">F</kbd> plein écran
                </span>
                <span className="brut-border bg-paper-alt px-2 py-1">
                  <kbd className="font-bold">C</kbd> copier email
                </span>
                <span className="brut-border bg-paper-alt px-2 py-1">
                  <kbd className="font-bold">⌘/Ctrl + K</kbd> palette
                </span>
              </div>
            </div>

            <Magnetic>
              <a
                data-magnetic="true"
                href="/cv.pdf"
                download
                className="brut-border brut-press inline-flex w-fit items-center gap-2 bg-accent px-6 py-3 font-bold uppercase text-accent-ink shadow-brut"
              >
                Télécharger le CV
                <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={120}>
            <CvViewer />
          </Reveal>
        </section>
      </main>
      <Footer topHref="#cv" />
    </>
  );
}
