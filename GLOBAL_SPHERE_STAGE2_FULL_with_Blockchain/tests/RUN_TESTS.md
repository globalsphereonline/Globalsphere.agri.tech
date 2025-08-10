
Stage 2 tests (overview)
- Unit tests: backend functions, smart contract unit tests (Hardhat)
- Integration tests: Supabase queries with local test db or Supabase test project
- E2E: Cypress flows for marketplace/shop builder/chat/logistics

Run instructions:
- Backend unit tests: cd backend && npm install && npm test (if implemented)
- Smart contract tests: cd smart_contracts && npm install && npx hardhat test
- E2E: run frontend and backend, then run Cypress tests
