const express = require('express');
const Acl = require('../models/acl');
const router = express.Router();

router.post('/', (req, res) => {
    Acl.create({
        owner: req.body.owner,
        topic: req.body.topic,
    }, (err, a) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(a);
        }
    });
});

module.exports = router;