const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const playerSchema = new Schema({
    playerId: {
        type: String
    },
    uuid: {
        type: String
    }
});

module.exports = mongoose.model('players', playerSchema);