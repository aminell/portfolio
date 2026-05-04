"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { content } from "@/lib/content";

type CommandAction = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigation" | "Liens" | "Actions";
  keywords?: string;
  shortcut?: string;
  run: () => void | Promise<void>;
};

// Détection plateforme côté client uniquement (évite le mismatch SSR).
function useIsMac() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);
  return isMac;
}

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const goToSection = useCallback(
    (id: string) => {
      const target = `#${id}`;
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", target);
      } else {
        router.push(`/${target}`);
      }
    },
    [pathname, router]
  );

  const copy = useCallback(async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* localStorage indisponible : on ignore. */
    }
  }, []);

  const actions: CommandAction[] = useMemo(() => {
    const nav = content.nav.map<CommandAction>((n) => ({
      id: `nav-${n.id}`,
      label: n.label,
      hint: `Section ${n.index}`,
      group: "Navigation",
      keywords: n.id,
      run: () => goToSection(n.id)
    }));

    const links: CommandAction[] = [
      {
        id: "link-cv",
        label: "Voir le CV",
        hint: "/cv",
        group: "Liens",
        keywords: "curriculum pdf",
        run: () => router.push("/cv")
      },
      {
        id: "link-cv-pdf",
        label: "Télécharger le CV (PDF)",
        hint: "/cv.pdf",
        group: "Liens",
        keywords: "download pdf",
        run: () => {
          const a = document.createElement("a");
          a.href = "/cv.pdf";
          a.download = "Amine-Larbi-CV.pdf";
          a.click();
        }
      },
      ...content.contact.channels.map<CommandAction>((c) => ({
        id: `link-${c.label.toLowerCase()}`,
        label: c.label,
        hint: c.value,
        group: "Liens",
        keywords: `${c.label} ${c.value}`,
        run: () => {
          window.open(c.href, c.href.startsWith("http") ? "_blank" : "_self", "noopener");
        }
      }))
    ];

    const emailChannel = content.contact.channels.find((c) => c.label.toLowerCase() === "email");

    const operations: CommandAction[] = [
      {
        id: "act-theme",
        label: "Basculer le thème",
        hint: "Light / Dark",
        group: "Actions",
        keywords: "theme dark light mode",
        shortcut: "T",
        run: toggleTheme
      },
      ...(emailChannel
        ? [
            {
              id: "act-copy-email",
              label: "Copier l'email",
              hint: emailChannel.value,
              group: "Actions" as const,
              keywords: "copy email mail",
              shortcut: "E",
              run: () => copy(emailChannel.value, "Email copié")
            }
          ]
        : []),
      {
        id: "act-share",
        label: "Copier le lien du portfolio",
        hint: content.site.url,
        group: "Actions",
        keywords: "share url link copy",
        run: () => copy(window.location.href, "Lien copié")
      },
      {
        id: "act-print",
        label: "Imprimer la page",
        hint: "Cmd/Ctrl + P",
        group: "Actions",
        keywords: "print pdf",
        run: () => window.print()
      }
    ];

    return [...nav, ...links, ...operations];
  }, [goToSection, router, toggleTheme, copy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      [a.label, a.hint, a.keywords, a.group].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [actions, query]);

  // Groupement par catégorie pour le rendu.
  const grouped = useMemo(() => {
    const map = new Map<string, CommandAction[]>();
    filtered.forEach((a) => {
      const arr = map.get(a.group) ?? [];
      arr.push(a);
      map.set(a.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Index "à plat" pour la navigation clavier (les flèches traversent les groupes).
  const flatIndex = useMemo(() => filtered.map((a) => a.id), [filtered]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const runById = useCallback(
    async (id: string) => {
      const action = actions.find((a) => a.id === id);
      if (!action) return;
      await action.run();
      close();
    },
    [actions, close]
  );

  // Ouverture / fermeture clavier global.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const meta = e.metaKey || e.ctrlKey;
      if (meta && key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  // Focus automatique de l'input + reset à l'ouverture.
  useEffect(() => {
    if (!open) return;
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [open]);

  // Verrouillage du scroll quand la palette est ouverte.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Auto-scroll de l'item actif dans la viewport de la liste.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-cmd-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (flatIndex.length === 0 ? 0 : (i + 1) % flatIndex.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (flatIndex.length === 0 ? 0 : (i - 1 + flatIndex.length) % flatIndex.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const id = flatIndex[active];
      if (id) runById(id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(0, flatIndex.length - 1));
    }
  };

  if (!open) {
    // Pas rendu mais on affiche le hint discret en bas à droite.
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la palette de commandes"
        className="fixed bottom-5 right-5 z-30 hidden items-center gap-2 brut-border bg-paper-alt px-3 py-2 mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-brut-sm transition-transform hover:-translate-y-0.5 hover:shadow-brut sm:inline-flex"
      >
        <kbd className="brut-border bg-paper px-1.5 py-0.5 text-[10px]">{isMac ? "⌘" : "Ctrl"}</kbd>
        <kbd className="brut-border bg-paper px-1.5 py-0.5 text-[10px]">K</kbd>
        <span className="text-ink-soft">menu</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palette de commandes"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" aria-hidden="true" />

      <div
        onKeyDown={onKeyDown}
        className="relative w-full max-w-xl brut-border-thick bg-paper shadow-brut-lg"
      >
        {/* Barre titre brutaliste */}
        <div className="flex items-center justify-between border-b-2 border-ink bg-accent px-4 py-2">
          <p className="mono text-[11px] font-bold uppercase tracking-widest text-accent-ink">
            ⌘ command palette
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="brut-border bg-paper px-2 py-0.5 mono text-[10px] font-bold uppercase tracking-widest"
          >
            ESC
          </button>
        </div>

        {/* Champ de recherche */}
        <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-3">
          <span aria-hidden="true" className="mono text-lg font-bold text-accent">
            ›
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Tape pour filtrer · entrée pour lancer"
            className="flex-1 bg-transparent font-bold outline-none placeholder:font-normal placeholder:text-ink-soft"
            autoComplete="off"
            spellCheck={false}
          />
          {copied && (
            <span className="brut-border bg-accent px-2 py-0.5 mono text-[10px] font-bold uppercase tracking-widest text-accent-ink">
              {copied}
            </span>
          )}
        </div>

        {/* Liste */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
          {flatIndex.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="mono text-xs uppercase tracking-widest text-ink-soft">aucune commande</p>
              <p className="mt-2 text-sm">
                Rien ne correspond à <span className="font-bold">&laquo;{query}&raquo;</span>.
              </p>
            </div>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="px-2 py-1">
                <p className="mono px-3 pb-1 pt-2 text-[10px] uppercase tracking-widest text-ink-soft">
                  {group}
                </p>
                <ul>
                  {items.map((item) => {
                    const flat = flatIndex.indexOf(item.id);
                    const isActive = flat === active;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          data-cmd-index={flat}
                          onMouseEnter={() => setActive(flat)}
                          onClick={() => runById(item.id)}
                          className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors ${
                            isActive ? "bg-accent text-accent-ink" : "hover:bg-paper-alt"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={`mono text-[10px] ${
                                isActive ? "text-accent-ink" : "text-ink-soft"
                              }`}
                            >
                              {isActive ? "▶" : "·"}
                            </span>
                            <span className="font-semibold">{item.label}</span>
                            {item.hint && (
                              <span
                                className={`mono text-[11px] ${
                                  isActive ? "text-accent-ink/70" : "text-ink-soft"
                                }`}
                              >
                                {item.hint}
                              </span>
                            )}
                          </div>
                          {item.shortcut && (
                            <kbd
                              className={`brut-border px-1.5 py-0.5 mono text-[10px] font-bold ${
                                isActive ? "bg-paper text-ink" : "bg-paper-alt"
                              }`}
                            >
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer raccourcis */}
        <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink bg-paper-alt px-4 py-2 mono text-[10px] uppercase tracking-widest text-ink-soft">
          <span className="flex items-center gap-1">
            <kbd className="brut-border bg-paper px-1.5 py-0.5 text-ink">↑↓</kbd> naviguer
          </span>
          <span className="flex items-center gap-1">
            <kbd className="brut-border bg-paper px-1.5 py-0.5 text-ink">↵</kbd> lancer
          </span>
          <span className="flex items-center gap-1">
            <kbd className="brut-border bg-paper px-1.5 py-0.5 text-ink">esc</kbd> fermer
          </span>
        </div>
      </div>
    </div>
  );
}
