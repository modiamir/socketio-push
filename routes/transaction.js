const express = require('express');
const Transaction = require('../models/transaction');
const Acl = require('../models/acl');
const router = express.Router();


router.post('/', function(req, res) {
    Transaction.create({
        data: req.body.data,
        playerId: req.body.playerId,
        topic: req.body.topic
    }, function(err, transaction) {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(transaction);
        }
    });
});

module.exports = router;