## Quick context

- This is a TypeScript Express backend API (entry: `src/server.ts`) using Prisma (generated client at `generated/prisma`) and PostgreSQL.
- Key runtime pieces: `src/app.ts` (Express app + routes + global middleware) and `src/server.ts` (HTTP server, DB connect, `seedAdmin()` on start).

## Architecture (big picture)

- API is organized into `src/app/modules/<feature>`; each module usually contains: `*.controller.ts`, `*.routes.ts`, `*.services.ts`, and `*.zod.schema.ts` (validation lives next to the module).
- Database layer: Prisma schema at `prisma/schema.prisma`. Prisma client is generated into `generated/prisma` and imported in `src/app/lib/prisma.ts`.
- Common utilities: `src/app/utils/*` (e.g. `seedAdmin.ts`, `catchAsyncFn.ts`, `createUserToken.ts`).
- Config & secrets: `src/config/index.ts` (environment-driven). Cloudinary and Stripe are centralized at `src/app/lib/cloudinary.ts` and `src/app/lib/stripe.ts`.

## Important project-specific conventions (be explicit)

- Authorization middleware `src/app/middleware/checkAuth.ts` reads the raw value of `req.headers.authorization` and passes it to the token verifier — do not assume the middleware strips a `Bearer ` prefix unless you add the handling.
- Validation uses Zod. For routes, look for `validatedRequest.ts` middleware and per-module `*.zod.schema.ts` files.
- Error handling: global handler in `src/app/middleware/globalErrorHandaler.ts` — throw `AppError` (found in `src/app/error/custom.error.ts`) for consistent responses.
- Prisma client is created with a custom adapter (`@prisma/adapter-neon`) in `src/app/lib/prisma.ts`; if you change datasource/provider, update the adapter usage.
- Seeder: `seedAdmin()` runs at server start (`src/server.ts`) — be cautious when modifying it (it runs automatically during `npm run dev`).

## Developer workflows & exact commands

- Install deps: `npm install`
- Start dev server (hot reload): `npm run dev` (runs `ts-node-dev --respawn --transpile-only src/server.ts`).
- Prisma (after schema changes):
  - `npx prisma generate` — regenerate client into `generated/prisma`
  - `npx prisma migrate dev --name <migration_name>` — create/apply dev migration
  - `npx prisma studio` — inspect DB
- Build for production: `npx tsc` then run `node dist/server.js` (project uses TypeScript compile step for prod).

## Integration points & external services

- Database: PostgreSQL (Neon adapter configured). Check `prisma/schema.prisma` and `DATABASE_URL` env var.
- Payments: Stripe is wrapped at `src/app/lib/stripe.ts` (configured from `config`).
- File uploads: Cloudinary configured at `src/app/lib/cloudinary.ts` and used with `multer-storage-cloudinary`.
- Email: `nodemailer` usage exists (search `nodemailer`/`SMTP` in `src/app`).

## Things an AI agent should do first when making edits

1. Read `src/app.ts` and `src/server.ts` to understand middleware order, route mount point `/api/v1`, and startup hooks (DB + seeder).
2. If touching DB models, update `prisma/schema.prisma` then run `npx prisma migrate dev --name <name>` and `npx prisma generate` (and update imports that reference generated client paths if needed).
3. When adding a route, follow the pattern in `src/app/modules/*`: add `*.routes.ts`, `*.controller.ts`, `*.services.ts`, and a `*.zod.schema.ts` for validation; register the route in `src/app/routes/index.ts`.
4. For protected routes, use `checkAuth(...)` and be explicit about what the middleware expects for the Authorization header.

## Quick examples (from codebase)

- Import Prisma client:
  - `import { prisma } from "src/app/lib/prisma"` (the actual file imports from `generated/prisma/client`).
- Add new product route (pattern):
  - `src/app/modules/products/product.routes.ts` — define routes
  - `src/app/modules/products/product.controller.ts` — implement handlers
  - `src/app/modules/products/product.services.ts` — DB/business logic
  - `src/app/modules/products/product.zod.schema.ts` — validation

## Known gotchas / notes

- `checkAuth` expects `req.headers.authorization` to contain the token (no automatic `Bearer ` removal). If you send `Bearer <token>` you must trim it before verify.
- Seeder (`seedAdmin`) runs on server start — it may create an admin user during `npm run dev`.
- Generated Prisma client lives at `generated/prisma` — do not move it without updating imports.

## Where to look for more context

- App wiring and routes: `src/app.ts`
- Server startup and seeding: `src/server.ts`
- Prisma config and models: `prisma/schema.prisma` and `prisma/migrations/`
- DB client wrapper: `src/app/lib/prisma.ts`
- Auth flow: `src/app/modules/auth`, `src/app/middleware/checkAuth.ts`, `src/app/utils/verifyToken.ts`

If any section is unclear or you'd like the instructions to include additional examples (e.g., how to add a CI job, or specific code snippets for common tasks), tell me which part to expand and I will iterate.
