-- WhatsApp consent records the number it applies to (#127).
--
-- consents.phone: the E.164 number a WhatsApp consent was given for. Set by
-- the database from profiles.phone when the row is inserted; learners cannot
-- name a number (their insert grant stays limited to profile_id, kind,
-- version, and the trigger overwrites the column on every path anyway).
--
-- consents.revoked_reason: why a consent was revoked when it was not the
-- learner switching it off ('stop' from a STOP reply, 'phone_changed' when the
-- profile number changes). Null means the learner turned it off themselves.
--
-- Changing profiles.phone revokes any live WhatsApp consent given for a
-- different number, so we never message a number nobody agreed for.

alter table public.consents
  add column phone text check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  add column revoked_reason text check (revoked_reason in ('stop', 'phone_changed'));

alter table public.consents
  add constraint consents_phone_whatsapp_only check (phone is null or kind = 'whatsapp'),
  add constraint consents_reason_needs_revoked check (revoked_reason is null or revoked_at is not null);

comment on column public.consents.phone is
  'WhatsApp only: the E.164 number the consent covers, copied from profiles.phone at insert by the database.';
comment on column public.consents.revoked_reason is
  'Why the consent was revoked when not by the learner: stop (STOP reply) or phone_changed. Null otherwise.';

-- Existing live WhatsApp consents were given for the profile number as it is
-- today (nothing could change it without an edit we can't see), so record it.
update public.consents c
   set phone = p.phone
  from public.profiles p
 where p.id = c.profile_id
   and c.kind = 'whatsapp'
   and c.revoked_at is null
   and c.phone is null;

-- Fill phone from the profile on insert. Security definer so the lookup works
-- for any caller; fixed search_path.
create function private.consents_fill_phone()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.kind = 'whatsapp' then
    select p.phone into new.phone from public.profiles p where p.id = new.profile_id;
  else
    new.phone := null;
  end if;
  return new;
end;
$$;

revoke execute on function private.consents_fill_phone() from public, anon, authenticated;

create trigger consents_fill_phone
  before insert on public.consents
  for each row execute function private.consents_fill_phone();

-- A new (or removed) profile number revokes WhatsApp consent given for any
-- other number. Learners have no update grant on consents, hence security
-- definer.
create function private.revoke_whatsapp_on_phone_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.consents
     set revoked_at = now(),
         revoked_reason = 'phone_changed'
   where profile_id = new.id
     and kind = 'whatsapp'
     and revoked_at is null
     and phone is distinct from new.phone;
  return null;
end;
$$;

revoke execute on function private.revoke_whatsapp_on_phone_change() from public, anon, authenticated;

create trigger profiles_phone_revokes_whatsapp
  after update of phone on public.profiles
  for each row
  when (old.phone is distinct from new.phone)
  execute function private.revoke_whatsapp_on_phone_change();

-- STOP lookups match on the consented number.
create index consents_whatsapp_phone_idx
  on public.consents (phone) where kind = 'whatsapp' and revoked_at is null;
