var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/peer'});
console.log('Started PeerServer on port: 4000, path /peer')