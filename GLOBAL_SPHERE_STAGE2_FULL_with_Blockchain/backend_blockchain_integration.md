
Backend - Blockchain Integration Notes
-------------------------------------
1. Use ethers.js (server) to interact with deployed contracts (ReferralCommission, ProductTraceability, EscrowPayment).
2. On order creation: deploy EscrowPayment with payer=buyer, payee=seller, arbiter=platform multisig OR admin; store tx hash in orders table.
3. On product batch register: call ProductTraceability.registerBatch(sku, origin, metadataURI) and store blockchain batch id in product metadata.
4. On referral credit: call ReferralCommission.creditCommission(referrer) sending the commission amount (in MATIC or native token).
5. Admin withdrawal and commission payout handled via smart contract functions; backend should keep records for off-chain accounting.
6. Configure Hardhat and provide DEPLOYER_PRIVATE_KEY and RPC (e.g., MUMBAI_RPC) in .env for deployments.
