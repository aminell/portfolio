# Portfolio — Amine Larbi

Portfolio one-page brutaliste moderne, construit avec **Next.js 14 (App Router)**, **TypeScript** et **Tailwind CSS**. Le contenu (compétences, projets, parcours, contact) est piloté par un seul fichier JSON, pour pouvoir le faire évoluer sans toucher au code.

- **Stack** : Next.js 14 · React 18 · TypeScript · Tailwind 3
- **Hébergement** : Vercel (déploiement auto via GitHub)
- **Domaine** : [aminelarbi.com](https://aminelarbi.com)
- **Direction artistique** : brutaliste moderne — accent **acid yellow `#D4FF00`**
- **Modes** : light + dark (switch en haut à droite, persistant)

---

## 1. Lancer le projet en local

Pré-requis : **Node.js 18.17+** (ou 20+ recommandé), **npm** (ou pnpm / yarn).

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site est ensuite accessible sur **http://localhost:3000**.

Autres scripts utiles :

```bash
npm run build      # build de production (.next/)
npm run start      # démarre le build de production
npm run lint       # vérifie le code avec ESLint
npm run typecheck  # vérifie les types TypeScript sans compiler
```

---

## 2. Modifier le contenu — `content.json`

**Tout le texte du site vit dans [`content.json`](./content.json) à la racine.**
Tu n'as **jamais** besoin de toucher au code des composants pour modifier le contenu.

Le fichier est typé : son schéma est décrit dans [`src/types/content.ts`](./src/types/content.ts). Si tu utilises VS Code, tu auras de l'autocomplétion sur les clés.

### Structure générale

```jsonc
{
  "site":     { /* métadonnées globales (title, description, url) */ },
  "nav":      [ /* liens de navigation : id + label + index */ ],
  "hero":     { /* hero : nom, accroche, intro, CTAs, mots du marquee */ },
  "about":    { /* à propos : paragraphes, soft skills, intérêts */ },
  "skills":   { /* compétences : catégories + items */ },
  "projects": { /* projets : items (peut être vide → empty state s'affiche) */ },
  "timeline": { /* parcours : items avec année / titre / statut */ },
  "contact":  { /* contact : channels (email, github, linkedin, …) */ },
  "footer":   { /* pied de page : tagline */ }
}
```

### Cas d'usage fréquents

#### → Ajouter une compétence

```jsonc
// content.json → skills.items
{
  "name": "JavaScript",
  "level": "À l'aise",          // libre, mais "Apprentissage" / "À l'aise" / "Confirmé" / "Avancé" sont mappés à une jauge visuelle
  "category": "Langages",       // doit correspondre à une entrée de skills.categories
  "note": "Pratique régulière sur des projets perso." // optionnel
}
```

> Ajouter une **nouvelle catégorie** : ajoute son nom dans `skills.categories` (le tableau ordonné des sections affichées), puis utilise ce nom comme `category` dans tes items.

#### → Ajouter un projet

```jsonc
// content.json → projects.items
{
  "title": "Mon premier projet",
  "description": "Un site fait pour apprendre X et Y. C'était l'occasion de tester Z.",
  "technologies": ["Next.js", "Tailwind", "Prisma"],
  "github": "https://github.com/aminell/mon-projet",   // optionnel
  "demo": "https://mon-projet.vercel.app",             // optionnel
  "year": "2026"                                       // optionnel
}
```

> Tant que `projects.items` est vide (`[]`), le site affiche automatiquement un **empty state** « Projets à venir ». Ajoute ton premier projet et il prendra la place du placeholder.

#### → Ajouter une étape dans le parcours

```jsonc
// content.json → timeline.items
{
  "year": "2027",
  "title": "Stage / mission",
  "description": "Description courte.",
  "status": "current"   // "done" | "current" | "upcoming" | "goal"
}
```

#### → Ajouter / changer un canal de contact

```jsonc
// content.json → contact.channels
{
  "label": "Twitter",
  "value": "@aminell",
  "href": "https://twitter.com/aminell"
  // "primary": true  ← un seul canal devrait être primary (style accent)
}
```

#### → Mettre à jour le CV téléchargeable

Dépose ton CV à jour dans `public/cv.pdf`. C'est ce fichier que cible le bouton **« Télécharger le CV »** du hero.

---

## 3. Personnaliser le design

L'identité visuelle vit dans deux endroits seulement :

- **`src/app/globals.css`** — variables CSS (couleurs `--paper`, `--ink`, `--accent`, etc. + variantes light / dark)
- **`tailwind.config.ts`** — extensions Tailwind (ombres `shadow-brut*`, polices, animations)

Pour changer la couleur d'accent, modifie `--accent` dans `globals.css` (light **et** dark) — elle est volontairement identique dans les deux modes pour garder la cohérence.

---

## 4. Déployer sur Vercel

### Première mise en ligne

1. Crée un repo GitHub et pousse le projet :
   ```bash
   git init && git add . && git commit -m "init: portfolio v2"
   git branch -M main
   git remote add origin https://github.com/aminell/portfolio.git
   git push -u origin main
   ```
2. Va sur [vercel.com/new](https://vercel.com/new) → importe le repo → Vercel détecte automatiquement Next.js.
3. Clic sur **Deploy**. Le site est en ligne sur une URL `*.vercel.app`.

À chaque `git push` sur `main`, Vercel redéploie automatiquement.

### Brancher le domaine `aminelarbi.com`

1. Dans le dashboard Vercel du projet : **Settings → Domains → Add** → entre `aminelarbi.com` (puis `www.aminelarbi.com`).
2. Vercel te donne une cible DNS. Deux configurations possibles selon ton registrar :

   - **Apex (`aminelarbi.com`)** :
     - Type **A** · Nom `@` · Valeur `76.76.21.21`
   - **Sous-domaine `www`** :
     - Type **CNAME** · Nom `www` · Valeur `cname.vercel-dns.com`

3. Si le domaine est actuellement utilisé pour les emails (`contact@aminelarbi.com`), **ne touche pas aux enregistrements MX** — seuls A et CNAME sont à modifier.
4. La propagation DNS prend de quelques minutes à quelques heures. Une fois propagée, Vercel délivre automatiquement le certificat SSL.

> ⚠️ Pense à pointer **un seul** des deux (apex ou www) comme principal et à laisser l'autre en redirection — Vercel le propose en un clic dans **Domains**.

---

## 5. Arborescence

```
portfolio-v2/
├── content.json              ← LE fichier à éditer (tout le contenu)
├── public/
│   ├── cv.pdf                ← à déposer toi-même
│   └── README.md             (note sur les fichiers attendus)
├── src/
│   ├── app/
│   │   ├── globals.css       ← variables design + bases Tailwind
│   │   ├── layout.tsx        ← shell HTML, fonts, métadonnées
│   │   ├── page.tsx          ← assemble les sections
│   │   └── not-found.tsx     ← page 404 brutaliste
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Timeline.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeProvider.tsx ← contexte light/dark
│   │   ├── ThemeToggle.tsx
│   │   ├── Marquee.tsx       ← bandeau défilant
│   │   ├── Reveal.tsx        ← animation reveal-on-scroll
│   │   └── SectionHeading.tsx
│   ├── lib/
│   │   └── content.ts        ← loader unique du contenu (à réutiliser partout)
│   └── types/
│       └── content.ts        ← schéma TypeScript du contenu
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── postcss.config.js
├── vercel.json
└── package.json
```

---

## 6. Performance & accessibilité

Choix faits dans le projet :

- **`next/font`** : Space Grotesk + Inter + JetBrains Mono auto-hébergés (zéro requête externe, FOUT évité).
- **Anti-FOUC du thème** : un script inline en `<head>` applique la classe `dark` avant le premier rendu.
- **Reveal-on-scroll** via `IntersectionObserver` (léger, pas de lib).
- **`prefers-reduced-motion`** respecté : toutes les animations sont coupées si l'utilisateur le demande.
- **Skip-link** + `:focus-visible` épais sur l'accent → navigation clavier confortable.
- **Headers de sécurité** dans `vercel.json` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

---

## 7. Roadmap suggérée

- [ ] Déposer ton vrai `cv.pdf` dans `public/`.
- [ ] Ajouter ton premier projet réel dans `content.json` → `projects.items`.
- [ ] Compléter l'établissement du BTS dans `content.json` → `timeline.items[1].description` dès confirmation Parcoursup.
- [ ] (Optionnel) Ajouter une vraie image OG dans `public/og-image.png` + référence dans `layout.tsx`.
- [ ] (Optionnel) Brancher [Vercel Analytics](https://vercel.com/analytics) — `npm i @vercel/analytics` puis ajouter `<Analytics />` dans `layout.tsx`.
