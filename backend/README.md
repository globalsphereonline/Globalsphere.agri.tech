# Backend API notes

- GET `/api/materials` JSON-backed demo data
- GET `/api/v2/materials` list (MongoDB): supports `page`, `limit`, `sort`, `q`, `category`
- POST `/api/v2/materials` create with optional `media` files (multipart)
- Static uploads served at `/uploads/*`
- POST `/api/payments/stripe/intent` { amount, currency }
- POST `/api/payments/paypal/order` { amount, currency }

If `MONGODB_URI` is unset or unavailable, DB routes may fail; use legacy JSON for demo.