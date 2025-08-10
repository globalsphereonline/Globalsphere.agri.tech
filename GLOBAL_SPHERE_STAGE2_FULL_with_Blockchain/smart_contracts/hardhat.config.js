
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: '0.8.18',
  networks: {
    localhost: { url: 'http://127.0.0.1:8545' },
    polygon_mumbai: { url: process.env.MUMBAI_RPC || '', accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [] }
  }
};
