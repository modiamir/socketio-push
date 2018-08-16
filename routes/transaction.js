const express = require('express');
const Transaction  = require('../models/transaction');
const router = express.Router();

router.post('/', (req, res) => {
    Transaction.create({
        data: req.body.data,
        playerId: req.body.playerId,
        topic: req.body.topic
    }, (err, task) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(task);
        }
    });
});

module.exports = router;