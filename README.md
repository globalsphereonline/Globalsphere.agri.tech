# GLOBAL-SPHERE-AGRI-TECH Monorepo

This repository contains:
- `backend`: Node.js/Express API
- `webapp`: React + Tailwind (Vite) dashboard
- `mobileapp`: React Native placeholder (set up locally with Expo or RN CLI)

## Quick start

1) Copy `.env.example` to `.env` and fill values as needed (at least `PORT`).

2) Install dependencies (uses npm workspaces):

```
npm install
```

3) Start backend + webapp (concurrently):

```
npm run dev
```
- Backend: http://localhost:4000
- Webapp: http://localhost:5173

4) Build all workspaces:

```
npm run build
```

## Webapp env

- Configure API base URL via `webapp/.env`:
```
VITE_API_BASE=http://localhost:4000/api
```
Netlify/CI will use `WEBAPP_VITE_API_BASE` secret to set this during builds.

## Deployment

### Webapp (Netlify)
- Netlify config: `netlify.toml` (build in `webapp/`, publish `dist/`)
- GitHub Action: `.github/workflows/deploy-webapp-netlify.yml`
- Required repo secrets:
  - `NETLIFY_AUTH_TOKEN`
  - `NETLIFY_SITE_ID`
  - `WEBAPP_VITE_API_BASE` (e.g., `https://<your-backend-domain>/api`)

### Backend (Render)
- Render blueprint: `render.yaml` (Docker deploy of `Dockerfile.backend`)
- Either connect the repo in Render (auto-deploy) or set repo secrets and use Action:
  - `RENDER_API_KEY`
  - `RENDER_SERVICE_ID`
- Set env vars in Render Dashboard:
  - `PORT=4000`
  - `NODE_ENV=production`
  - `MONGODB_URI` (MongoDB Atlas connection string)

After deploying, update the webapp’s API base to point to the backend public URL.

## Structure (high-level)

- `backend/`: configs, controllers, models, routes, utils, media, onboarding, and `raw_materials.json`
- `webapp/`: React app with Tailwind, components, pages, hooks, assets, i18n
- `mobileapp/`: RN placeholder with `src/App.js`
- `database/`: DB bootstrap scripts (placeholder)
- `scripts/`: Deployment & automation (placeholder)
