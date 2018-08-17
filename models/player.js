const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const playerSchema = new Schema({
    playerId: {
        type: String,
        index: true,
    },
    uuid: {
        type: String,
        index: true
    },
    owner: {
        type: String,
    }
});

module.exports = mongoose.model('players', playerSchema);