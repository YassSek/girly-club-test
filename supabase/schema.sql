-- -----------------------------------------------------------------------
-- The Girly Club — schéma Supabase
-- À exécuter dans Supabase : Project > SQL Editor > New query > Run
-- -----------------------------------------------------------------------

create extension if not exists "pgcrypto";

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  event_title text not null,
  event_date text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  participants jsonb not null,           -- ex: ["Claire Dupont", "Léa Martin"]
  num_participants integer not null check (num_participants > 0),
  total_price numeric(10, 2) not null,
  session_ids jsonb,                     -- créneaux choisis, ex: ["matin"] — null si l'événement n'a pas de créneaux
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_event_id_idx on reservations (event_id);
create index if not exists reservations_status_idx on reservations (status);

-- Sécurité : la table est fermée à tout accès public (anon/authenticated).
-- Seule la clé "service_role" (utilisée uniquement côté serveur, dans les
-- routes API Next.js) peut lire/écrire. Le navigateur des clientes ne
-- touche jamais directement à cette table.
alter table reservations enable row level security;

-- Aucune policy n'est créée pour les rôles anon/authenticated : par défaut,
-- avec la RLS activée et sans policy, tout accès leur est refusé.
-- La clé service_role, elle, contourne toujours la RLS.

-- -----------------------------------------------------------------------
-- Migration : si tu avais déjà exécuté une version précédente de ce schéma
-- (avec un système d'acompte), lance ceci dans le SQL Editor pour te
-- mettre à jour (le site ne fonctionne plus qu'avec un paiement total) :
--
--   alter table reservations drop column if exists deposit_amount;
--
-- Migration : si ta table existe déjà sans la colonne session_ids
-- (événements avec créneaux, ex: matin/après-midi), lance :
--
--   alter table reservations add column if not exists session_ids jsonb;
-- -----------------------------------------------------------------------
