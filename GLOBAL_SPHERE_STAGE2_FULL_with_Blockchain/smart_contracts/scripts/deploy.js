
const hre = require('hardhat');
async function main() {
  const Referral = await hre.ethers.getContractFactory('ReferralCommission');
  const referral = await Referral.deploy();
  await referral.deployed();
  console.log('ReferralCommission deployed to', referral.address);

  const Trace = await hre.ethers.getContractFactory('ProductTraceability');
  const trace = await Trace.deploy();
  await trace.deployed();
  console.log('ProductTraceability deployed to', trace.address);

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deployer address:', deployer.address);
}
main().catch((e)=>{ console.error(e); process.exit(1); });
