"use client";

import { useEffect } from "react";

// Signature console : message ASCII pour les recruteurs/devs qui ouvrent les DevTools.
// S'exécute une seule fois par chargement (drapeau global pour éviter le double-mount StrictMode).
export function ConsoleSignature() {
  useEffect(() => {
    const w = window as Window & { __amineSignaturePrinted?: boolean };
    if (w.__amineSignaturePrinted) return;
    w.__amineSignaturePrinted = true;

    const banner = `
%c
   █████╗ ███╗   ███╗██╗███╗   ██╗███████╗
  ██╔══██╗████╗ ████║██║████╗  ██║██╔════╝
  ███████║██╔████╔██║██║██╔██╗ ██║█████╗
  ██╔══██║██║╚██╔╝██║██║██║╚██╗██║██╔══╝
  ██║  ██║██║ ╚═╝ ██║██║██║ ╚████║███████╗
  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
`;

    const accent =
      "background:#D4FF00; color:#0A0A0A; font-weight:700; padding:2px 6px; font-family:monospace;";
    const muted = "color:#888; font-family:monospace;";
    const link = "color:#0A0A0A; background:#D4FF00; padding:1px 4px; font-weight:700;";

    /* eslint-disable no-console */
    console.log(banner, "color:#D4FF00; font-family:monospace;");
    console.log("%cBrutaliste, fait main, sans framework UI.", accent);
    console.log("%cTip : essaie %cCtrl/Cmd + K%c pour la palette de commandes.", muted, link, muted);
    console.log("%cEt tente la séquence Konami : ↑ ↑ ↓ ↓ ← → ← → B A", muted);
    console.log("%cContact : contact@aminelarbi.com", muted);
    /* eslint-enable no-console */
  }, []);

  return null;
}
