const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const transactionSchema = new Schema({
    data: {
        type: Map,
        of: String
    },
    playerId: {
        type: Array,
        of: String
    },
    topic: {
        type: String
    }
});

module.exports = mongoose.model('transactions', transactionSchema);