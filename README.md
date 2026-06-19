# Pause

Une petite web-app React conçue pour créer quelques secondes de recul avant
d'ouvrir une application depuis une automatisation Raccourcis sur iPhone.

## Paramètres d'URL

- `app` : nom affiché de l'application, ou `cette application` par défaut.
- `seconds` : durée du compte à rebours, `7` par défaut, limitée de `3` à `30`.

Exemples :

```text
https://votre-domaine.fr/?app=YouTube
https://votre-domaine.fr/?app=TikTok&seconds=10
https://votre-domaine.fr/?app=X&seconds=5
```

Les statistiques sont enregistrées uniquement dans `localStorage`, séparément
pour chaque nom d'application. Aucune donnée ne quitte l'appareil.

## Développement

```bash
npm install
npm run dev
```

Vérifications :

```bash
npm run lint
npm run build
```

Le workflow GitHub Pages publie automatiquement le dossier `dist` après un
push sur `main`.
