# The Girly Club — site de réservation

Stack : **Next.js 14** (App Router, TypeScript) + **Tailwind CSS** + **Supabase** (base de données) + **Stripe** (paiement).

Pas de compte client, pas de panneau d'admin : les événements sont dans `lib/events.ts` (à modifier toi-même), et les clientes réservent en tant qu'invitées.

---

## 1. Comment ça marche

1. La page d'accueil (`app/page.tsx`) affiche les événements sous forme de cartes, avec les places restantes calculées en temps réel depuis Supabase.
2. Cliquer sur une carte ouvre une modale (`components/BookingModal.tsx`) : nombre de participantes, nom de chacune, coordonnées, calcul du prix total en direct.
3. À la validation, une réservation `pending` est créée dans Supabase, puis la cliente est redirigée vers **Stripe Checkout** pour payer la totalité de la séance.
4. Une fois le paiement effectué, Stripe appelle ton webhook (`app/api/webhook/route.ts`) qui passe la réservation en `confirmed`. La réservation n'est confirmée qu'à ce moment-là — jamais avant paiement.
5. La cliente atterrit sur `/success`, qui affiche le récapitulatif.

---

## 2. Mise en place de Supabase (pas à pas)

Supabase est ici utilisé **uniquement comme base de données** (pas d'authentification, pas d'accès direct depuis le navigateur — tout passe par ton serveur Next.js, c'est plus sûr).

1. Va sur [supabase.com](https://supabase.com), crée un compte gratuit, puis **New project**.
2. Choisis un nom, un mot de passe de base de données (garde-le de côté, mais tu n'en auras pas besoin ici), et une région proche de tes clientes (`eu-west` par exemple).
3. Une fois le projet créé, va dans **SQL Editor** (menu de gauche) → **New query**.
4. Colle le contenu du fichier `supabase/schema.sql` et clique sur **Run**. Cela crée la table `reservations`. (Si tu avais déjà une table `reservations` d'une version précédente avec un système d'acompte, vois la note de migration en bas de `supabase/schema.sql`.)
5. Va dans **Project Settings** (icône engrenage) → **API**.
   - Copie **Project URL** → ce sera `SUPABASE_URL`.
   - Copie la clé **service_role** (⚠️ pas la clé `anon public`) → ce sera `SUPABASE_SERVICE_ROLE_KEY`.

C'est tout pour Supabase. La table est verrouillée (Row Level Security activée sans policy publique) : seule ta clé `service_role`, utilisée uniquement côté serveur, peut y accéder. Le navigateur des clientes n'y touche jamais directement.

---

## 3. Mise en place de Stripe (pas à pas)

1. Crée un compte sur [stripe.com](https://stripe.com).
2. Reste en **mode Test** pour développer (interrupteur en haut à droite du dashboard).
3. Va dans **Developers → API keys** : copie la clé **Secret key** (`sk_test_...`) → ce sera `STRIPE_SECRET_KEY`.
4. Pour le webhook :
   - **En local** : installe la [Stripe CLI](https://stripe.com/docs/stripe-cli), puis lance :
     ```
     stripe listen --forward-to localhost:3000/api/webhook
     ```
     Elle t'affiche un `whsec_...` → mets-le dans `STRIPE_WEBHOOK_SECRET`.
   - **En production** : Developers → Webhooks → **Add endpoint** → URL = `https://ton-domaine.com/api/webhook`, événement à écouter : `checkout.session.completed`. Stripe te donne alors un `whsec_...` de production à mettre dans les variables d'environnement de ton hébergeur.
5. Pour tester un paiement, utilise la carte de test Stripe : `4242 4242 4242 4242`, n'importe quelle date future, n'importe quel CVC.

---

## 4. Lancer le projet en local

```bash
npm install
cp .env.local.example .env.local
# remplis .env.local avec tes vraies valeurs Supabase + Stripe
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

Pense à lancer `stripe listen --forward-to localhost:3000/api/webhook` dans un autre terminal pendant que tu testes une réservation en local, sinon la réservation restera bloquée en `pending` (le paiement Stripe fonctionnera, mais ta base ne sera jamais mise à jour sans le webhook).

---

## 5. Déployer (Vercel, recommandé)

1. Pousse le projet sur un repo GitHub.
2. Va sur [vercel.com](https://vercel.com), **Add New Project**, importe le repo.
3. Dans les paramètres du projet Vercel, ajoute les variables d'environnement (`NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) — les mêmes que dans `.env.local`, mais avec `NEXT_PUBLIC_SITE_URL` = ton vrai domaine, et les clés Stripe **live** (`sk_live_...`) une fois prêt à encaisser pour de vrai.
4. Déploie. Puis crée ton webhook Stripe de production (étape 3 ci-dessus) en pointant vers `https://ton-domaine.com/api/webhook`.

---

## 6. Modifier les événements

Tout se passe dans `lib/events.ts` : chaque événement est un objet avec titre, ville, lieu, date, prix par personne, nombre de places max, etc. Ajoute, modifie ou supprime un objet dans le tableau `events`, puis redéploie — pas besoin de toucher au reste du code.

Le site a un bouton FR/EN dans la navbar (voir `lib/i18n/`). Pour qu'un événement s'affiche aussi en anglais, complète son champ optionnel `en` (`title`, `city`, `venue`, `description`) — si tu ne le remplis pas, le site affiche simplement le texte français par défaut en mode EN, rien ne casse. Les dates/horaires ("25 août 2026", "à confirmer"...) sont traduits automatiquement.

Les autres textes fixes du site (menus, boutons, formulaire, messages) se modifient dans `lib/i18n/translations.ts`.

---

## 7. Ajouter les vraies photos

Pour l'instant, chaque carte affiche un dégradé bordeaux/noir en attendant tes visuels (comme indiqué dans le brief). Pour les remplacer :

1. Héberge tes photos (Supabase Storage, ou tout autre CDN).
2. Renseigne l'URL dans le champ `image` de l'événement concerné, dans `lib/events.ts`.
3. Adapte `components/EventCard.tsx` pour afficher une balise `<Image>` (next/image) à la place du dégradé quand `event.image` n'est pas vide — dis-moi si tu veux que je fasse cette modification une fois tes photos prêtes.

---

## 8. Prochaines étapes possibles

- Emails de confirmation automatiques (ex: via Resend ou Supabase Edge Functions déclenchées sur `checkout.session.completed`).
- Liste d'attente automatique quand un événement est complet.
- Un espace « mes réservations » si tu introduis un système de compte plus tard.
- Un petit panneau d'admin pour créer les événements sans toucher au code, si la gestion via `events.ts` devient limitante.
