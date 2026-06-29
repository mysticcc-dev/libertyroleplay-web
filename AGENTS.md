# AGENTS.md — Liberty Roleplay

Guidance for any coding agent (or human) working in this repo. Read this first.

## What this is

A cinematic community website for **Liberty Roleplay**, a console GTA-V roleplay
community. One product, three faces: a public cinematic marketing site, an
authenticated member portal, and a staff back office — plus a separate Discord
bot service that bridges the site to the community's Discord.

This repo is a **Turborepo + pnpm** monorepo. The website and the bot share one
type-safe database schema and one set of validation schemas, so they can never
drift apart.

## Five engineering principles (do not violate)

1. **Server-first rendering.** Public pages render on the server and stay
   static/ISR wherever possible. Interactivity is layered on as client islands.
2. **One source of truth for data.** Persistent world state lives in Postgres,
   accessed only through `@liberty/db`. Editorial copy lives in the CMS (later).
3. **Authorization is never trusted to the client.** Every protected route and
   every mutation re-checks session + role on the server. Middleware is coarse
   gating only — never the authorization boundary.
4. **Heavy effects are gated.** Three.js, scroll choreography and sound are
   opt-in by capability and always respect `prefers-reduced-motion`.
5. **Ship in waves.** Marketing + application funnel first; the persistent world
   and map follow.

## Layout

```
apps/web      Next.js 16 App Router app (the website)
apps/bot      discord.js v14 service (scaffold; built out in M6)
packages/db   Drizzle schema + lazy client + migrations  (@liberty/db)
packages/shared  zod schemas, domain types, constants     (@liberty/shared)
packages/config  shared tsconfig base                      (@liberty/config)
```

`packages/db` and `packages/shared` are the spine. The application wizard's zod
schema in `@liberty/shared` is imported by **both** the web app (to validate
input) and the bot (to render the review embed) — keep it the single source of
truth for what an application contains.

## Stack (pinned — review monthly)

- Node 24 (deploy target; repo runs on >= 22.12). pnpm 10. TypeScript 6, strict.
- Next.js 16 (App Router, Turbopack, React 19). Tailwind CSS v4 (CSS-first
  `@theme` tokens in `apps/web/src/app/globals.css` — there is **no**
  `tailwind.config.js`). shadcn-style primitives, re-themed to the brand.
- Motion (animation), GSAP + ScrollTrigger (scroll choreography), Lenis (smooth
  scroll). All gated behind reduced-motion.
- Drizzle ORM + Neon/Postgres. Auth.js v5 + Discord OAuth (M3). discord.js v14.
- Biome for lint + format (one fast tool, no separate Prettier).

## Conventions

- **CSS-first design tokens.** Add/adjust brand colors, fonts and shadows in the
  `@theme` block of `globals.css`. Utilities (`bg-asphalt`, `text-ignition`,
  `font-display`) are generated from those tokens — don't hardcode hex values in
  components.
- **Reduced motion.** Any animation must degrade to an instant/!static state
  when `prefers-reduced-motion: reduce`. Use the `useReducedMotion` hook /
  `motion-safe:` utilities; never animate unconditionally.
- **Server vs client.** Default to Server Components. Add `"use client"` only on
  the smallest island that needs interactivity (motion, forms, map).
- **Env vars** are validated at startup (`apps/web/src/lib/env.ts`,
  `apps/bot/src/env.ts`). Add new ones to the zod schema **and** `.env.example`.
- **Imports** are organized by Biome. Prefer `import type` for type-only imports.

## Commands

```
pnpm install            # install the workspace
pnpm dev                # run web (and bot) via turbo
pnpm --filter web dev   # just the web app
pnpm lint               # biome check
pnpm typecheck          # tsc --noEmit across the workspace
pnpm build              # production build via turbo
pnpm db:generate        # drizzle-kit: generate a migration
pnpm db:migrate         # apply migrations
pnpm db:seed            # seed factions + sample data
```

## Build status / current milestone

Implemented so far (this wave): **M0** foundation/tooling, **M1** design system,
**M2** public marketing site, and the **M3 data layer** (full Drizzle schema +
shared zod schemas). Auth, the member dashboard, the application wizard, the
bot pipeline, the map, the CMS and payments are scaffolded or deferred to later
milestones — see the development plan. When picking up the next milestone, keep
the principles above and prefer small, reviewed Drizzle migrations (forward-only,
never auto-applied destructively against production).
