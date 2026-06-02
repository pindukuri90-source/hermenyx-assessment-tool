# Executive Data Modernization Assessment

An online executive assessment tool that guides business leaders through an 11-section discovery process covering data, reporting, analytics, manual processes, and automation readiness. Admins review submissions and send back personalized executive summaries and 30-60-90 day roadmaps.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/assessment run dev` — run the assessment frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter (routing), react-hook-form, framer-motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/assessments.ts` — DB schema for assessments and section_responses
- `artifacts/api-server/src/routes/assessments.ts` — Assessment CRUD routes
- `artifacts/api-server/src/routes/admin.ts` — Admin routes (list, detail, send results)
- `artifacts/assessment/src/` — React frontend

## Architecture decisions

- OpenAPI-first: all API types generated from `lib/api-spec/openapi.yaml` via Orval
- Section responses stored as JSONB blobs (flexible schema per section)
- Admin auth is localStorage-based (`adminAuth === "admin123"`) for easy embedding — can be upgraded to real auth
- Checkout is a placeholder redirect (no real Stripe yet) — easy to wire up with Stripe keys
- Status flow: draft → submitted → paid → approved → completed

## Product

- Landing page introducing the assessment
- Contact info form to begin
- 11-section multi-step assessment covering: Executive Priorities, Reporting Pain Points, Data Quality, Manual Processes, Decision Intelligence, Systems & Tools, Business Verticals, AI Readiness, ROI, Prioritization, Executive Summary
- Payment gate before report delivery
- Admin dashboard to review all submissions, see full responses, and send back results (executive summary + 30-60-90 roadmap)
- User confirmation page once submitted

## User preferences

- No emojis in the UI
- Professional, executive-facing aesthetic
- Embed-ready (designed to integrate into existing website via iframe or separate subdomain)

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml`
- Always run `pnpm run typecheck:libs` after editing `lib/db/src/schema/` before typechecking leaf packages
- Admin password is hardcoded as `admin123` — stored in localStorage key `adminAuth`
- Checkout currently simulates payment by setting status to "paid" — wire up Stripe for real payments

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
