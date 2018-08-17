const express = require('express');
const router = express.Router();
const playerRouter = require('./player');
const transactionRouter = require('./transaction');
const aclRouter = require('./acl');

router.use("/player", playerRouter);
router.use("/transaction", transactionRouter);
router.use("/acl", aclRouter);

module.exports = router;
