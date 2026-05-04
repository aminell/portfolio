"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { LiveClock } from "./LiveClock";

// Visionneuse PDF avec :
// - raccourcis clavier (D = télécharger, F = plein écran, C = copier email)
// - bouton plein écran natif
// - mini-actions de copie (email, lien) avec feedback
// - indicateur "scroll spy" pour montrer la progression de lecture du PDF dans son conteneur
export function CvViewer() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const emailChannel = content.contact.channels.find((c) => c.label.toLowerCase() === "email");

  const copyValue = useCallback(async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }, []);

  const downloadCv = useCallback(() => {
    const a = document.createElement("a");
    a.href = "/cv.pdf";
    a.download = "Amine-Larbi-CV.pdf";
    a.click();
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const node = wrapperRef.current;
    if (!node) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await node.requestFullscreen();
      }
    } catch {
      /* Plein écran refusé : on ignore (pas de feedback bloquant). */
    }
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Raccourcis clavier dédiés à la page CV.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      const k = e.key.toLowerCase();
      if (k === "d") {
        e.preventDefault();
        downloadCv();
      } else if (k === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (k === "c" && emailChannel) {
        e.preventDefault();
        copyValue(emailChannel.value, "Email copié");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [downloadCv, toggleFullscreen, copyValue, emailChannel]);

  return (
    <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
      {/* Sidebar : aperçu + raccourcis + horloge live */}
      <aside className="brut-border-thick flex flex-col gap-5 bg-paper-alt p-5 shadow-brut-lg lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between">
          <span className="bg-accent px-2 py-1 mono text-xs font-bold uppercase tracking-widest text-accent-ink">
            Aperçu
          </span>
          <LiveClock />
        </div>

        <dl className="grid gap-4 text-sm">
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

        {/* Actions rapides */}
        <div className="grid gap-2">
          <p className="mono text-[10px] uppercase tracking-widest text-ink-soft">Actions rapides</p>
          <button
            type="button"
            onClick={downloadCv}
            className="brut-border flex items-center justify-between bg-paper px-3 py-2 text-sm font-bold uppercase hover:bg-accent"
          >
            Télécharger
            <kbd className="brut-border bg-paper-alt px-1.5 py-0.5 mono text-[10px]">D</kbd>
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="brut-border flex items-center justify-between bg-paper px-3 py-2 text-sm font-bold uppercase hover:bg-accent"
          >
            {fullscreen ? "Quitter plein écran" : "Plein écran"}
            <kbd className="brut-border bg-paper-alt px-1.5 py-0.5 mono text-[10px]">F</kbd>
          </button>
          {emailChannel && (
            <button
              type="button"
              onClick={() => copyValue(emailChannel.value, "Email copié")}
              className="brut-border flex items-center justify-between bg-paper px-3 py-2 text-sm font-bold uppercase hover:bg-accent"
            >
              Copier l&apos;email
              <kbd className="brut-border bg-paper-alt px-1.5 py-0.5 mono text-[10px]">C</kbd>
            </button>
          )}
          <button
            type="button"
            onClick={() => copyValue(window.location.href, "Lien copié")}
            className="brut-border flex items-center justify-between bg-paper px-3 py-2 text-sm font-bold uppercase hover:bg-accent"
          >
            Partager la page
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {copied && (
          <p
            role="status"
            aria-live="polite"
            className="brut-border bg-accent px-3 py-2 mono text-[11px] font-bold uppercase tracking-widest text-accent-ink"
          >
            ✓ {copied}
          </p>
        )}

        <div className="border-t-2 border-ink pt-3 mono text-[10px] uppercase tracking-widest text-ink-soft">
          Astuce : ⌘/Ctrl + K pour la palette de commandes.
        </div>
      </aside>

      {/* Visionneuse PDF */}
      <section
        ref={wrapperRef}
        aria-label="CV PDF"
        className="brut-border-thick flex flex-col bg-paper-alt p-3 shadow-brut-lg sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="mono text-[11px] uppercase tracking-widest text-ink-soft">Aperçu en ligne</p>
          <div className="flex items-center gap-2">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="brut-border bg-paper px-2 py-1 mono text-[10px] font-bold uppercase tracking-widest hover:bg-accent"
            >
              Onglet ↗
            </a>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="brut-border bg-paper px-2 py-1 mono text-[10px] font-bold uppercase tracking-widest hover:bg-accent"
            >
              {fullscreen ? "↙ exit" : "⤢ full"}
            </button>
          </div>
        </div>

        <object
          ref={objectRef}
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
    </div>
  );
}
