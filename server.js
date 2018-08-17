const mongoose = require('mongoose');
const api = require('./routes/api');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');
const Player = require('./models/player');
const Acl = require('./models/acl');

mongoose.connect('mongodb://172.17.0.4:27017/push');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('mongo connection opened');
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(api);

    io.use((socket, next) => {
        let playerId = socket.handshake.headers['x-player-id'];
        Player.find({ playerId: playerId }).exec((err, result) => {
            if (err || result.length <= 0) {
                return next(new Error('authentication error'));
            }
            return next();
        });
    });

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    const transactionsCollection = db.collection('transactions');
    io.on('connection', async function(socket){
        let playerId = socket.handshake.headers['x-player-id'];
        let player = await Player.findOne({playerId: playerId}).exec();
        socket.on("subscribe", async function(topic, fn) {
            if (topic === playerId || await Acl.allowedTopic(topic, player.owner)) {
                socket.join(topic);
                fn(true)
            } else {
                fn(false)
            }
        });
    });

    let playerIdPipeline = [
        { $match: { 'fullDocument.playerId': {$exists: true, $not: {$size: 0} }} },
    ];
    const playerIdChangeStream = transactionsCollection.watch(playerIdPipeline);
    playerIdChangeStream.on('change', (change) => {
        io.to(change.fullDocument.playerId).emit('message', change.fullDocument);
    });

    let topicPipeline = [
        { $match: {'fullDocument.topic': { $exists: true }} },
    ];
    const topicChangeStream = transactionsCollection.watch(topicPipeline);
    topicChangeStream.on('change', (change) => {
        console.log(change);
        io.to(change.fullDocument.topic).emit('message', change.fullDocument);
    });

    http.listen(3000, function(){
        console.log('listening on *:3000');
    });
});
