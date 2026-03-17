# Tastevia FullStack

End‑to‑end food ordering experience built with a Vite/React frontend and an Express + Prisma + Postgres backend. Stripe powers payments.

## Stack
- Frontend: Vite + React + TypeScript, Tailwind 4, Framer Motion, React Router, Stripe Elements.
- Backend: Express 5, Prisma ORM (Postgres), JWT auth, Stripe server SDK.
- Tooling: TypeScript everywhere, tsx for live reload, ESLint.

## Project layout
- `frontend/` – client app (Vite).
- `backend/` – API/server (Express + Prisma).
- `backend/prisma/` – Prisma schema and migrations.

## Prerequisites
- Node.js 20+ and npm.
- Postgres database.
- Stripe test keys.

## Setup
1) Install deps  
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2) Environment variables  
   - `backend/.env` (see `.env.example`):
     - `PORT`, `DATABASE_URL`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`
     - `STRIPE_SECRET_KEY`
     - `CLIENT_URLS` (comma-separated origins, e.g. `http://localhost:5173`)
   - `frontend/.env` (see `.env.example`):
     - `VITE_API_BASE_URL` (e.g. `http://localhost:5000/api/v1`)
     - `VITE_APP_URL` (frontend URL for redirects)
     - `VITE_STRIPE_PUBLISHABLE_KEY`
3) Database  
   - Update `DATABASE_URL` then generate/migrate:
     ```bash
     cd backend
     npx prisma generate
     npx prisma migrate deploy   # or migrate dev when developing
     ```
   - Seed sample data (optional): `npm run seed`

## Run locally
- Backend (watch): `cd backend && npm run dev`
- Frontend (Vite dev server): `cd frontend && npm run dev`  
  Ensure `VITE_API_BASE_URL` points to the running backend.

## Production build
- Backend: `cd backend && npm run build` then `npm start`
- Frontend: `cd frontend && npm run build` (outputs `dist/`)

## Payments
- Use Stripe test keys while developing; serve the frontend over HTTPS in production.
- Frontend uses Stripe Elements; backend uses `STRIPE_SECRET_KEY` for intents.

## Troubleshooting
- Windows PowerShell execution policy can block `npm` scripts; run in an elevated shell or use `Set-ExecutionPolicy -Scope Process Bypass`.
- If images feel slow, ensure product `imageUrls` point to optimized assets or a CDN; a built-in placeholder shows while loading.

## API Reference (base: `/api/v1`)
- **Auth**
  - `POST /auth/signup` — body: `{ name, email, password }`
  - `POST /auth/login` — body: `{ email, password }`
  - `POST /auth/logout`
- **Products**
  - `GET /products` — list products
  - `GET /products/:id` — product detail
  - `POST /products` — create (admin) `{ name, description, price, category, imageUrls[] }`
  - `PUT /products/:id` — update (admin)
  - `DELETE /products/:id` — remove (admin)
- **Cart**
  - `POST /cart/add` — `{ userId, productId, quantity }`
  - `GET /cart/:userId` — get cart
  - `PATCH /cart/update` — `{ userId, productId, quantity }`
  - `DELETE /cart/remove` — `{ userId, productId }`
- **Orders + Payments**
  - `POST /orders/stripe/create-intent` — `{ amount, currency, customerId? }` → Stripe client secret
  - `POST /orders` — create order `{ userId, items, total, paymentIntentId }`
  - `GET /orders` — orders for current user (expects auth context)
  - `GET /orders/:id` — order detail
- **Newsletter**
  - `POST /newsletter/subscribe` — `{ email }`

### Auth/CORS
- Allowed origins come from `CLIENT_URLS` (comma-separated) plus Vercel previews; update `.env` accordingly.
- JWT access/refresh secrets required: `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`.

## Deployment (one possible path)
Frontend (Vercel):
1) Set project root to `frontend/`.
2) Build command: `npm run build`; Output dir: `dist`.
3) Env vars: `VITE_API_BASE_URL`, `VITE_APP_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`.

Backend (Render/Fly/Heroku):
1) Deploy from `backend/` with build `npm run build` and start `npm start`.
2) Add env vars from `backend/.env.example` (`DATABASE_URL`, token secrets, `STRIPE_SECRET_KEY`, `CLIENT_URLS`, `PORT`).
3) Ensure Postgres is reachable; run `npx prisma migrate deploy` before start or as a release command.
4) If using Render, enable “Allow insecure HTTP” only for testing; otherwise force HTTPS and update `VITE_API_BASE_URL` to the HTTPS endpoint.

Stripe live go-live checklist:
- Serve frontend over HTTPS and set live publishable key; backend uses live secret key.
- Create live webhook endpoint (if added later) and restrict allowed origins to production domain(s).
