-- One account per phone number (issue #285).
--
-- Every account now gives a phone number: at sign up, on /welcome for
-- accounts without one, and kept on /profile. The column stays nullable so
-- accounts from before #285 (and an email sign up whose number has not been
-- copied from metadata yet) still work; the app sends them to /welcome.
-- A number on another account is refused with 23505, which the app shows as
-- "That number is already on another SydCrest account".
--
-- Numbers are stored in E.164 (the existing check), so the same number
-- typed two ways cannot slip past the index.

create unique index if not exists profiles_phone_key
  on public.profiles (phone)
  where phone is not null;

comment on index public.profiles_phone_key is
  'One account per phone number (issue #285). Nulls allowed until /welcome collects one.';
