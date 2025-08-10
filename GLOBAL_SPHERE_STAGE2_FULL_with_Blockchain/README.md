
GLOBAL SPHERE AGRI TECH - Stage 2 Full Package (Marketplace + Shop Builder + Chat + Logistics + Blockchain)
=================================================================================

This package includes expanded frontend, backend, mobile stubs, tests, Supabase integration placeholders,
DP World logistics integration placeholders, and a smart contract layer (EVM - Polygon recommended).

Important:
- All keys and secrets are placeholders. Replace them with your own in deployment secrets/CI.
- Smart contract artifacts are prepared for local Hardhat compilation & deployment. Configure your wallet and RPC.
- Supabase storage placeholders are included for media uploads.
- DP World integration uses a placeholder adapter; you must supply DP World API credentials and integrate in production.

Contents (high level):
- backend/                (Express + Supabase integration, orders, shops, chat adapter)
- webapp/                 (Next.js marketplace + shop builder + chat UI)
- mobile/                 (Expo stubs and screens)
- smart_contracts/        (Hardhat project, Solidity contracts, deployment scripts)
- design_assets/          (Figma mapping JSON + screen exports)
- tests/                  (Jest unit tests + Cypress E2E scaffolds)
- deployment_instructions/ (Cursor + Supabase + Polygon deployment guides)
