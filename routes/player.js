const express = require('express');
const router = express.Router();
const Player  = require('../models/player');

router.post('/init', (req, res) => {
    Player.find({ uuid: req.body.uuid }).exec((err, result) => {
        if (err) {
            res.status(500).send(err);
            return
        }

        if (result.length > 0) {
            player = result[0];
            res.status(200).json(player);
        } else {
            Player.create({
                playerId: Math.random().toString(36).substr(2,20) + Math.random().toString(36).substr(2,20),
                uuid: req.body.uuid
            }, (err, player) => {
                if (err) {
                    console.log('CREATE Error: ' + err);
                    res.status(500).send('Error');
                } else {
                    res.status(200).json(player);
                }
            });
        }
    });
    //

});

module.exports = router;