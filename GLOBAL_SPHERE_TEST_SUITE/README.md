
GLOBAL SPHERE AGRI TECH - Test Suite Package
===========================================

This package contains:
- Backend API with Supabase integration (mocked for tests)
- Unit & Integration tests using Jest + Supertest
- E2E test scaffolding (Cypress) for web flows (login->browse->purchase->chat->order)
- CI workflow (GitHub Actions) to run tests and collect coverage
- Instructions to run tests locally and in CI

How to run:
1. cd backend
2. cp sample_env.example .env (fill SUPABASE_URL and SUPABASE_SERVICE_KEY if you want integration tests)
3. npm install
4. npm test            # run jest unit/integration tests
5. npm run test:e2e    # run Cypress E2E (requires node and browsers)

Notes:
- Tests by default use mocked Supabase client to avoid hitting production.
- Integration tests can be enabled by setting SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.
