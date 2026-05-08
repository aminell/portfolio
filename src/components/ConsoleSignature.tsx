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
      "background:#00E5A8; color:#04120D; font-weight:700; padding:2px 6px; font-family:monospace;";
    const muted = "color:#888; font-family:monospace;";
    const link = "color:#04120D; background:#00E5A8; padding:1px 4px; font-weight:700;";

    /* eslint-disable no-console */
    console.log(banner, "color:#00E5A8; font-family:monospace;");
    console.log("%cPortfolio BUT RT : réseau, télécoms, systèmes.", accent);
    console.log("%cTip : essaie %cCtrl/Cmd + K%c pour la palette de commandes.", muted, link, muted);
    console.log("%cEt tente la séquence Konami : ↑ ↑ ↓ ↓ ← → ← → B A", muted);
    console.log("%cContact : contact@aminelarbi.com", muted);
    /* eslint-enable no-console */
  }, []);

  return null;
}
