# KANTA

A fashion marketplace bringing together **thrift sellers**, **boutiques** and **independent designers**, starting in Ghana.

- Design source of truth: [Figma — KANTA Mobile App Design](https://www.figma.com/design/3rnnmdrV9Yn0oYvJV8h6N1)
- Plan: KANTA — Development Plan (8 stages) and KANTA — Seller Verification & Trust System

## Stage 1 — Foundations (this branch)

| What | Where |
|---|---|
| Kanta colours, fonts and text styles (same names as Figma) | `app/globals.css` |
| Reusable components (logo, search, chips, product card, nav…) | `components/kanta/` |
| Homepage, built exactly from the approved design | `app/page.tsx` |
| Design system page, to compare with Figma | `/design-system` |
| Sign-in with an email link, profile page, sign out | `app/login`, `app/auth`, `app/account` |
| Session refresh on every request | `proxy.ts` |
| Supabase connection | `lib/supabase/` |

Database (Supabase project `kanta-dev`): a `profiles` table, one row per user, created automatically at sign-up. Row Level Security lets each person read and edit only their own name and phone; nobody can change their own role.

## Run it

```bash
cp .env.example .env.local   # add the Supabase publishable key
npm install
npm run dev                  # http://localhost:3000
```

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (Postgres, Auth, Storage) · hosted on Vercel.

Prices are stored in **pesewas** (whole numbers) so money maths never has rounding errors.
