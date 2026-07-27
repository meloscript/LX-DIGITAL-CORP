# LX Digital Corp

Site web premium pour **LX Digital Corp**, agence digitale basée au Cameroun.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Shadcn/UI
- next-themes (mode sombre)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Structure

```
src/
├── app/              # Pages, layout, SEO (sitemap, robots)
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Sections de la page d'accueil
│   └── ui/           # Composants Shadcn/UI
├── hooks/            # Hooks personnalisés (scroll, animations)
└── lib/              # Utilitaires et config du site
```

## Personnalisation

Modifier les coordonnées dans `src/lib/utils.ts` :

- Numéro WhatsApp
- Email
- Adresse
- URL du site

## Déploiement

Compatible Vercel, Netlify ou tout hébergeur Node.js.
