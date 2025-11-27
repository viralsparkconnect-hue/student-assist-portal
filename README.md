# Academic Support Platform — React (Vite) + Node (Vercel)

Demo monorepo for an academic support website:
- React (Vite) frontend in `/app`
- Serverless Node endpoints in `/api` (Vercel functions)
- Demo data stored in `/data/orders.json` (not for production)
- Uploads folder `/uploads` (demo only; don't store real files here in prod)

## Quick features
- Order form with file upload
- Pricing endpoint
- Simple JSON file data store (demo)
- Ready to push to GitHub & deploy to Vercel

## Local dev (two terminals)
1. Frontend:
```bash
cd app
npm install
npm run dev
```
2. For APIs locally, use `vercel dev` at repo root (recommended) or test deployed endpoints.

## Deploy to Vercel (step-by-step)
1. Push repo to GitHub (commands at bottom).
2. In Vercel dashboard click **New Project → Import Git Repository**.
3. Set Environment Variables:
   - `ADMIN_SECRET` — any secret string for admin actions (demo)
4. Vercel settings (usually auto-detected):
   - Build command: `cd app && npm run build`
   - Output directory: `app/dist`
   - Vercel will automatically deploy `/api` as serverless functions.
5. Deploy—your frontend will be site root and `/api/*` endpoints available under same domain.

## Notes & Production recommendations
- **Uploads:** This demo writes uploads to `/uploads` (not suitable for production). Use S3/GCS with signed uploads in prod.
- **Database:** Replace `data/orders.json` with a real DB (Postgres/MongoDB) in prod.
- **Security:** Add authentication, rate-limiting, input validation, and virus scanning for uploads.
- **Persistence:** Serverless filesystem is ephemeral; don't rely on local disk for persistent storage in production.

## Git commands (example)
```bash
git init
git add .
git commit -m "Initial commit - Academic Support demo"
git remote add origin git@github.com:<your-username>/<repo>.git
git branch -M main
git push -u origin main
```

