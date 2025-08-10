
Smart Contracts - Quick Guide
-----------------------------
Network: Polygon (recommended) or any EVM-compatible chain.
Tooling: Hardhat + ethers.js
Contracts included:
- ReferralCommission.sol  -> tracks referrals and allows admin to distribute commissions
- ProductTraceability.sol -> registers product batches, provenance, and transfer logs
- EscrowPayment.sol       -> simple escrow locking payments until order confirmation

Deployment: use `npx hardhat run scripts/deploy.js --network <network>` after configuring .env with MNEMONIC/RPC keys.
