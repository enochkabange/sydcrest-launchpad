# Auth email templates

Supabase sends our sign up, password reset and email change emails. This page
is for the founder: how to put our branded templates into the hosted Supabase
projects, and the URL settings for the move to https://sydcrest.com.

## Why

Gmail flagged our auth emails as "might be dangerous" for two reasons:

1. The default Supabase template is bare and generic.
2. Its link went to `<project>.supabase.co/auth/v1/verify` and then on to the
   vercel.app site, so the link's domain did not match the sender
   (`no-reply@mail.sydcrest.com`).

Our templates fix both. They carry the SydCrest brand, and their links go
straight to our own site, `https://sydcrest.com/auth/confirm?...`, which
checks the link (`src/app/auth/confirm/route.ts`). The link's domain now
matches the sender's.

The local stack already uses these templates (`supabase/config.toml`). The
hosted projects do not read that file: each template is pasted in by hand.

## The templates

| Dashboard template | Subject | File to paste |
|---|---|---|
| Confirm sign up | `Confirm your email for SydCrest` | `supabase/templates/confirmation.html` |
| Reset password | `Reset your SydCrest password` | `supabase/templates/recovery.html` |
| Change email address | `Confirm your new email for SydCrest` | `supabase/templates/email_change.html` |

Magic link and Invite user keep the Supabase defaults: the app never sends
them. Reauthentication and the security notifications are unchanged too.

Every link in our templates starts with `{{ .SiteURL }}/auth/confirm`, so the
Site URL setting (below) decides which domain the links use. The old
`{{ .ConfirmationURL }}` must not appear in any of the three templates: that
is the supabase.co link Gmail disliked.

## Order matters

1. **Deploy first.** Merge the pull request that adds `/auth/confirm` and wait
   for production to deploy. Until you paste the templates, emails keep using
   the old link, which still works (it lands on `/auth/callback`). Pasting the
   templates before the deploy would send people to a page that does not
   exist yet.
2. **Make sure https://sydcrest.com serves the app** (domain added in Vercel,
   DNS done). Quick check: open
   `https://sydcrest.com/auth/confirm?type=recovery` in a browser. It should
   land on the reset password form saying the link has expired. If the domain
   does not load, stop here: the new links would not work.
3. **Change the URL configuration** (next section).
4. **Paste the templates** (the section after).
5. **Test** (last section).

## URL configuration (production)

Supabase dashboard, production project, **Authentication**, **URL
Configuration**:

- **Site URL**: `https://sydcrest.com`
- **Redirect URLs**, the allow list. Make sure it has all three:
  - `https://sydcrest.com/**`
  - `https://www.sydcrest.com/**`
  - `https://sydcrest-launchpad.vercel.app/**` (keep it during the move, so
    anyone still on the old address can sign up and sign in; remove it once
    the old address redirects to sydcrest.com)

Click **Save**.

Also in Vercel, production environment: set `NEXT_PUBLIC_SITE_URL` to
`https://sydcrest.com` and redeploy, so share links and page metadata use the
new domain too.

## Paste the templates (production)

Supabase dashboard, production project, **Authentication**, **Emails**,
**Templates**. For each row in the table above:

1. Open the template (for example **Reset password**).
2. Replace the **Subject** with the subject from the table.
3. Open the file from the table in the repository on GitHub, click **Raw**,
   select everything and copy it.
4. In the dashboard, switch the body to the source (HTML) view, select
   everything in it, delete it, and paste.
5. Check the preview shows the SydCrest heading and a blue button.
6. Click **Save**.

While you are there, open **Authentication**, **Providers**, **Email** (or
**Sign In / Providers**, then **Email**), and check:

- **Email OTP expiration** is `3600` seconds. The emails say the link works
  for 1 hour; change the wording in the files if you choose another time.
- **Secure email change** is on. The email change template says both
  addresses get a link.

## Staging

Do the same on the staging project:

- Paste the same three templates and subjects.
- Leave the staging **Site URL** as it is (the address you use to test
  against staging). The templates use whatever it is.
- Make sure its Redirect URLs include the addresses you test from.

## Test

1. On https://sydcrest.com, go to **Forgot your password?** and ask for a
   link for your own email.
2. The email should come from SydCrest with the subject `Reset your SydCrest
   password`, show the logo and a blue **Choose a new password** button.
3. Hover or long press the button: the link must start with
   `https://sydcrest.com/auth/confirm`. If it starts with something else,
   the Site URL is wrong.
4. Follow it, choose a new password, and sign in with it.
5. Sign up with a second address you own and confirm it the same way.

If Gmail still warns after this, check the sender's SPF, DKIM and DMARC
records for `mail.sydcrest.com` with your email provider; that is separate
from the templates.

## Changing a template later

Edit the file in `supabase/templates/`, open a pull request, and once it is
merged paste the new version into both hosted projects as above. Keep inline
styles and tables: email apps ignore stylesheets. Copy rules from
`src/content/CONTENT_GUIDE.md` apply: British English, no dashes, device
neutral.
