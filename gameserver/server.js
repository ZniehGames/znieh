/* Server */

var io = require('socket.io').listen(1337);

require('./controllers/connection.ctrl')(io);

console.log("Server Started");
