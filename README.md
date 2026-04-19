# SAR Burger

Customer-facing site + live admin panel for SAR Burger, a mid-to-upscale
burger spot in Addis Ababa. Admin edits sync to every device in real time
via Supabase (Postgres + realtime channels) — no redeploy required.

## Stack

- React 18 + Vite 4
- Tailwind CSS 3 (custom charcoal / cream / amber theme)
- Framer Motion (hero motion)
- React Router (`/` customer, `/admin` panel)
- Supabase (Postgres + realtime + RLS)

## Getting started

```bash
npm install
cp .env.example .env    # paste your Supabase URL + anon key
npm run dev             # http://localhost:5173
```

### Supabase setup (once)

1. Create a project at <https://supabase.com> (free tier is enough).
2. Project settings → **API** → copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
3. SQL Editor → New query → paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
   This creates the 5 tables, seeds `settings/global` and the 7 hours rows,
   enables realtime, and applies open RLS policies.
4. (Optional) Visit `/admin`, sign in with `sarAdmin2025`, open
   **Settings** → **Seed defaults** if you want a safety-net re-seed.
5. Change the admin password and the phone / address / Google Maps URL
   from the Settings tab.

## Routes

| Path     | Purpose                                                         |
| -------- | --------------------------------------------------------------- |
| `/`      | Customer site (nav, hero, menu, combos, hours, location, footer) |
| `/admin` | Password-gated admin panel                                       |

A small "Admin" link sits in the footer. Session persists until the tab closes.

## What the admin can do

- **Menu** — add / edit / delete items, toggle availability, set category and sort order.
- **Combos** — create featured combo deals with an itemised list and price.
- **Hours** — set open/close per weekday or mark closed; the customer site
  shows an "Open now" indicator computed in Addis Ababa time.
- **Orders** — log WhatsApp orders (customer, items, total, note) for records.
- **Settings** — phone, address, Google Maps embed URL, hero tagline, admin password.

## Realtime

Every customer view and admin tab subscribes to `postgres_changes` on the
relevant table. An admin edit in one tab reflects on `/` in every other open
tab within ~1 s, no reload.

## Deploy on Vercel

`vercel.json` already includes SPA rewrites so `/admin` survives a hard refresh.

1. vercel.com → Add New → Project → import `Abel-Atnafu/surprisee`.
2. Framework: **Vite** (auto-detected).
3. Add the two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
   for Production + Preview.
4. Deploy.

## Security note

The admin password lives in the `settings.admin_password` column and is
compared client-side. With the open RLS policies in `supabase/schema.sql`,
anyone who has the anon key (which ships in the bundle) can read it. That's
acceptable only for a small owner-only panel.

To harden: migrate to **Supabase Auth** (email + password), drop the
`admin_password` column, and replace the open `for all` policies with
`using (auth.role() = 'authenticated')`. The `AuthContext` is isolated so
the swap is a single-file change.

## Handoff checklist

Before handing the keys to the owner, update these:

- [ ] **WhatsApp phone** — admin → Settings → WhatsApp phone (default `251000000000`).
- [ ] **Address** — admin → Settings.
- [ ] **Google Maps embed** — Maps → Share → Embed a map → copy `src` URL.
- [ ] **Admin password** — admin → Settings → Admin password (default `sarAdmin2025`).
- [ ] Schema applied (`supabase/schema.sql`), tables visible in Supabase Studio.
- [ ] `/admin` is reachable and login works on the live URL.
