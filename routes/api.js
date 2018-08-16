const express = require('express');
const router = express.Router();
const playerRouter = require('./player');
const transactionRouter = require('./transaction');

router.use("/player", playerRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
