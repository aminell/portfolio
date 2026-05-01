# Dossier `public/`

Tous les fichiers déposés ici sont servis tels quels à la racine du site.
Exemples : `public/cv.pdf` → accessible via `https://aminelarbi.com/cv.pdf`.

## Fichiers à fournir

- **`cv.pdf`** — ton CV à jour. Le bouton « Télécharger le CV » du Hero pointe vers `/cv.pdf`.
  Tant que tu n'as pas déposé ton fichier, le bouton renverra une 404.
  → Glisse-dépose ton PDF dans ce dossier en le nommant exactement `cv.pdf`.

- **`og-image.png`** _(optionnel)_ — image utilisée pour les partages sur réseaux sociaux
  (LinkedIn, Twitter, etc.). Format recommandé : 1200 × 630 px.
  Si tu en ajoutes une, pense à mettre à jour `content.json` → `site.url` ainsi que
  l'objet `metadata.openGraph` dans `src/app/layout.tsx`.
