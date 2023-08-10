const ccxt = require('ccxt');

class BinanceService {
  constructor() {
    this.exchange = new ccxt.binance();
  }

  async getTradableCoins() {
    const markets = await this.exchange.fetchMarkets();
    return markets.map((market) => market.symbol);
  }

  async getAveragePrices() {
    try {
      const markets = await this.exchange.loadMarkets();
      const coinSymbols = Object.keys(markets);
      console.log(Object.keys(markets).length);
      const averagePrices = {};
  
      for (const symbol of coinSymbols) {
        // Introduce a delay between requests to avoid rate limits
        // Adjust the delay time as needed
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const trades = await this.exchange.fetchTrades(symbol, undefined, 100);

        if (trades.length > 0) {
          const totalAmount = trades.reduce((sum, trade) => sum + trade.amount, 0);
          const totalPrice = trades.reduce((sum, trade) => sum + trade.cost, 0);  
          averagePrices[symbol] = totalPrice / totalAmount;
        }
        console.log(symbol);
        console.log(averagePrices[symbol]);
      }
  
      return averagePrices;
    } catch (error) {
      console.error('Error fetching average prices:', error.message);
      throw new Error('An error occurred while fetching average prices');
    }
  }
  
}

module.exports = BinanceService;
