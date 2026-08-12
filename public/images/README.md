# Dossier images

Dépose ici tes visuels. Tout ce qui est dans `public/` est directement
accessible sur le site à la racine (ex: un fichier dans
`public/images/logo/logo.png` sera accessible via l'URL `/images/logo/logo.png`).

## Organisation

- `logo/` — le logo du Girly Club (idéalement en `.svg` ou `.png` avec fond transparent)
- `events/` — une photo par événement (celle qui remplace le dégradé sur les cartes)
- `gallery/` — photos d'événements passés, pour une future galerie
- `lifestyle/` — photos d'ambiance générales (fondatrices, moments de vie, détails de lieux)

## Comment les brancher dans le code

### Le logo

Une fois `public/images/logo/logo.png` (ou `.svg`) déposé, dis-le-moi et je
remplacerai le titre texte "The Girly Club" du header par ton vrai logo dans
`components/Header.tsx`.

### Les photos d'événements

1. Dépose la photo dans `public/images/events/`, par exemple `pilates-seine-paris.jpg`.
2. Dans `lib/events.ts`, renseigne le champ `image` de l'événement correspondant :
   ```ts
   image: "/images/events/pilates-seine-paris.jpg",
   ```
3. Dis-le-moi et j'adapterai `components/EventCard.tsx` pour afficher la vraie
   photo (avec `next/image`, optimisée automatiquement) à la place du
   dégradé, dès qu'au moins une image est renseignée.

## Format recommandé

- Ratio portrait proche de 4:5 pour les photos d'événements (cohérent avec le
  format des cartes actuelles).
- Poids raisonnable (idéalement < 500 Ko par image) — sinon Next.js
  l'optimisera automatiquement au chargement, mais un fichier plus léger au
  départ accélère toujours les choses.
