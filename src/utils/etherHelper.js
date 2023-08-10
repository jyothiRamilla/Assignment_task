const ethers = require('ethers');

module.exports = {
  isAddressValid: (address) => ethers.utils.isAddress(address),
  createWallet: () => ethers.Wallet.createRandom(),
  getLatestTransactions: async () => {
    // Implement fetching latest transactions here
  },
};
