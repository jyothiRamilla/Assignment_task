const {ethers,JsonRpcProvider} = require('ethers');
const Transaction = require('../entities/Transaction');
const web3 = require('web3');

class TransactionService {
  constructor() {
   this.provider = new JsonRpcProvider('http://192.168.0.189:7545');
  }

  async validateAddress(address) {
    return web3.utils.isAddress(address); 
    //Tried ethers.utils.isAddress - SOmehow it is not working. May be because of the version issues.
  }

  async createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  /*async getLatestTransactions() {
    const latestBlockNumber = await this.provider.getBlockNumber();
    const startBlock = latestBlockNumber - 1000;

    const transactions = [];

    for (let i = startBlock; i <= latestBlockNumber; i++) {
      const block = await this.provider.getBlockWithTransactions(i); //Faced an issue with getBlockwithTrnsactions so tried different method 
      //const block =  await this.provider.getBlock(i,true);
      for (const tx of block.transactions) {
        const txInfo = new Transaction(
          tx.hash,
          tx.from,
          tx.to,
          ethers.utils.formatEther(tx.value),
          tx.blockNumber
        );
        transactions.push(txInfo);
      }
    }

    transactions.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    console.log(transactions);
    return transactions;
  }

  */

  async getLatestTransactions() {
    const latestBlock = await this.provider.getBlockNumber();
    const startBlock = Math.max(latestBlock - 1000, 0);
    const endBlock = latestBlock;
  
    const filter = {
      fromBlock: `0x${startBlock.toString(16)}`,
      toBlock: `0x${endBlock.toString(16)}`,
    };
  
    const logs = await this.provider.getLogs(filter);
    //console.log(logs);
    const transactions = logs.map(log => ({
      hash: log.transactionHash,
      sender: log.topics[1],
      receiver: log.topics[2],
      amount: web3.utils.fromWei(log.data, 'ether'),
      blockNumber: parseInt(log.blockNumber, 16)
    }));
  
    // Sort transactions by Ether value in descending order
    transactions.sort((a, b) => b.amount - a.amount);
  
    return transactions;
  }
  
}

module.exports = TransactionService;
