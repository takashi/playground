var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/peer'});
console.log('Started PeerServer on port: 9000, path /peer');