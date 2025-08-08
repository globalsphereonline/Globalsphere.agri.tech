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

## Structure (high-level)

- `backend/`: configs, controllers, models, routes, utils, media, onboarding, and `raw_materials.json`
- `webapp/`: React app with Tailwind, components, pages, hooks, assets, i18n
- `mobileapp/`: RN placeholder with `src/App.js`
- `database/`: DB bootstrap scripts (placeholder)
- `scripts/`: Deployment & automation (placeholder)
