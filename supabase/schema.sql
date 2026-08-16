create extension if not exists "pgcrypto";

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  event_title text not null,
  event_date text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  participants jsonb not null,
  num_participants integer not null check (num_participants > 0),
  total_price numeric(10, 2) not null,
  session_ids jsonb,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_event_id_idx on reservations (event_id);
create index if not exists reservations_status_idx on reservations (status);

alter table reservations enable row level security;

-- Migrations (à lancer une seule fois dans le SQL Editor si ta table existait déjà) :
--   alter table reservations drop column if exists deposit_amount;
--   alter table reservations add column if not exists session_ids jsonb;
