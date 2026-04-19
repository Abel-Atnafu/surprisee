# SAR Burger

Customer-facing site + live admin panel for SAR Burger, a mid-to-upscale burger
spot in Addis Ababa. Admin edits sync to every device in real time via Firebase
Firestore — no redeploy required.

## Stack

- React 18 + Vite 4
- Tailwind CSS 3 (custom charcoal / cream / amber theme)
- Framer Motion (hero motion)
- React Router (`/` customer, `/admin` panel)
- Firebase Firestore (realtime data + settings)

## Getting started

```bash
npm install
cp .env.example .env    # then paste your Firebase web config values
npm run dev             # http://localhost:5173
```

### Firebase setup (once)

1. Create a Firebase project at <https://console.firebase.google.com>.
2. Enable **Cloud Firestore** in production mode.
3. Project settings → "Your apps" → Web app → copy the web config.
4. Fill in `.env` (see `.env.example`) — all six `VITE_FIREBASE_*` keys.
5. Run the app, visit `/admin`, sign in with the default password
   `sarAdmin2025`, open the **Settings** tab and click **Seed defaults** — this
   creates `settings/global` and the seven `hours/{mon..sun}` documents.
6. Change the admin password and phone/address/map URL from the Settings tab.

### Firestore security rules (recommended starting point)

Customer site reads menu/combos/hours/settings; admin writes everything.
Restrict reads on the admin password field — either by splitting `settings`
into `public` and `private` docs or with a rule like:

```
match /databases/{db}/documents {
  match /menuItems/{doc}     { allow read: if true; allow write: if false; }
  match /combos/{doc}        { allow read: if true; allow write: if false; }
  match /hours/{doc}         { allow read: if true; allow write: if false; }
  match /orders/{doc}        { allow read, write: if false; }
  match /settings/global     { allow read: if true;  allow write: if false; }
}
```

Then grant writes via the Firebase console only, or migrate admin auth to
Firebase Auth for production use. **The current implementation compares the
admin password client-side against a Firestore field** — suitable for a small
owner-only panel, not for high-security use.

## Routes

| Path     | Purpose                                 |
| -------- | --------------------------------------- |
| `/`      | Customer site (nav, hero, menu, combos, hours, location, footer) |
| `/admin` | Password-gated admin panel              |

A small "Admin" link sits in the footer. Session persists until the tab closes.

## What the admin can do

- **Menu** — add / edit / delete items, toggle availability, set category and sort order.
- **Combos** — create featured combo deals with an itemised list and price.
- **Hours** — set open/close time per weekday or mark a day closed; the
  customer site shows an "Open now" indicator computed in Addis Ababa time.
- **Orders** — log WhatsApp orders (customer, items, total, note) for records.
- **Settings** — phone, address, Google Maps embed URL, hero tagline, admin password.

## Deploy

Vercel is already configured (`vercel.json` includes SPA rewrites so `/admin`
survives a hard refresh):

```bash
npm run build
# or:
vercel
```

Remember to set the `VITE_FIREBASE_*` env vars in the Vercel project settings.

## Handoff checklist

Before handing the keys to the owner, update these:

- [ ] **WhatsApp phone** — admin → Settings → WhatsApp phone (default `251000000000`).
- [ ] **Address** — admin → Settings.
- [ ] **Google Maps embed** — Maps → Share → Embed a map → copy `src` URL.
- [ ] **Admin password** — admin → Settings → Admin password (default `sarAdmin2025`).
- [ ] **Seed defaults** clicked at least once on first load.
- [ ] Firestore rules applied (see above).
