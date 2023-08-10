/*const express = require('express');
const TransactionService = require('../services/transactionService');

const router = express.Router();
const transactionService = new TransactionService();

// Implement your API routes here
*/
const { ethers } = require('ethers');

const express = require('express');
const TransactionService = require('../services/transactionService');

const router = express.Router();
const transactionService = new TransactionService();

/**
 * @swagger
 * /transactions/validateAddress/{address}:
 *   get:
 *     summary: Check if a wallet address is valid
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Ethereum wallet address to validate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns whether the address is valid or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isValid:
 *                   type: boolean
 */
router.get('/validateAddress/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const isValid = await transactionService.validateAddress(address);
    res.json({ isValid });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

/**
 * @swagger
 * /transactions/createWallet:
 *   get:
 *     summary: Create a new Ethereum wallet
 *     responses:
 *       200:
 *         description: Returns the newly created wallet's address and private key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 privateKey:
 *                   type: string
 */
router.get('/createWallet', async (req, res) => {
  try {
    const wallet = await transactionService.createWallet();
    res.json({ address: wallet.address, privateKey: wallet.privateKey });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

/**
 * @swagger
 * /transactions/latest:
 *   get:
 *     summary: Get the latest 1000 Ethereum transactions sorted by ether quantity
 *     responses:
 *       200:
 *         description: Returns the list of latest transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hash:
 *                     type: string
 *                   sender:
 *                     type: string
 *                   receiver:
 *                     type: string
 *                   amount:
 *                     type: string
 *                   blockNumber:
 *                     type: integer
 */
router.get('/latest', async (req, res) => {
  try {
    const transactions = await transactionService.getLatestTransactions();
    res.json({ transactions });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
