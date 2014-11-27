/* Server */
var User = require('./model/user');
var MatchMakingCtrl = require('./controllers/matchmaking.ctrl');

var app = require('http').createServer();
var io = require('socket.io')(app);
var users = [];
var sockets = [];

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log('a user connected');

  socket.on('authenticate', function(pseudo) { // silly auth... should be replaced by jwt
    console.log('authenticate as', pseudo);
    var user = new User(pseudo, socket);
    users.push(user);
  });

  socket.on('disconnect', function() {
      console.log('user disconnected');
  });

  socket.on('close', function() {
    sockets.splice(sockets.indexOf(socket), 1);
  })

  socket.on('search match', function() {
    MatchMakingCtrl.add(socket);
  });

});

app.sockets = sockets; // we export sockets to avoid waiting timeout during tests
module.exports = app;

if (!module.parent) { // lauch server if not required by another file
  app.listen(1337);
  console.log("Server Started");
}
