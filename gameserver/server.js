/* Server */
require('colors');
var User = require('./model/user');
var MatchMakingCtrl = require('./controllers/matchmaking.ctrl');
var UserStorage = require('./storage/user.storage.js');

var app = require('http').createServer();
var io = require('socket.io')(app);
var sockets = [];

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log('socket connected'.blue, socket.id);

  socket.on('authenticate', function(auth) { // silly auth... should be replaced by jwt
    console.log(socket.id, 'authenticated as'.blue, auth.username);

    var user = UserStorage.findBySocket(socket);
    if (user === null) {
        // new user
        console.log('new user in storage'.blue, auth);
        UserStorage.add(new User(auth, socket));
        return;
    }
  });

  socket.on('disconnect', function() {
      console.log('socket disconnected'.blue, socket.id);
      UserStorage.remove(UserStorage.findBySocket(socket));
      sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('search match', function() {
    MatchMakingCtrl.add(socket);
  });

  socket.on('test', function() {
    console.log('test'.red);
  })

});

app.sockets = sockets; // we export sockets to avoid waiting timeout during tests
module.exports = app;

if (!module.parent) { // lauch server if not required by another file
  app.listen(1337);
  console.log("✔︎ Server listening on http://localhost:1337/".green);
}
