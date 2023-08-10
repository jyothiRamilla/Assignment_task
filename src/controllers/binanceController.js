const express = require('express');
const BinanceService = require('../services/binanceService');

const router = express.Router();
const binanceService = new BinanceService();

/**
 * @swagger
 * /binance/tradableCoins:
 *   get:
 *     summary: Get the list of coins tradable on Binance
 *     responses:
 *       200:
 *         description: Returns the list of tradable coins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/tradableCoins', async (req, res) => {
  try {
    const tradableCoins = await binanceService.getTradableCoins();
    res.json({ tradableCoins });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

/**
 * @swagger
 * /binance/averagePrices:
 *   get:
 *     summary: Get the average prices of coins based on 100 recent transactions
 *     responses:
 *       200:
 *         description: Returns the average prices of coins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: number
 */
router.get('/averagePrices', async (req, res) => {
  try {
    const averagePrices = await binanceService.getAveragePrices();
    res.json({ averagePrices });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
