/* Server */
require('colors');

var User = require('./model/user');
var MatchMakingCtrl = require('./controllers/matchmaking.ctrl');
var UserStorage = require('./storage/user.storage.js');
var GameController = require('./controllers/game.ctrl.js');
var GameStorage = require('./storage/game.storage.js');
var config = require('config');

var app = require('http').createServer();
var io = require('socket.io')(app);
var sockets = [];

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log('socket connected'.blue, socket.id);

  socket.on('authenticate', function(auth) { // silly auth... should be replaced by jwt
    console.log(socket.id, 'authenticated as'.blue, auth.username);

    var user = UserStorage.findByUsername(auth.username);
    if (user === null) {
      // new user
      console.log('new user in storage'.blue, auth);
      UserStorage.add(new User(auth, socket));
      return;
    } else if (user.socket !== socket) {
      console.log('update user socket'.blue, auth);
      UserStorage.updateSocket(user, socket);
    }
  });

  socket.on('disconnect', function() {
    console.log('socket disconnected'.blue, socket.id);

    UserStorage.remove(UserStorage.findBySocket(socket));
    GameStorage.remove(GameStorage.findBySocket(socket));
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('search match', function() {
    MatchMakingCtrl.add(socket);
  });

  socket.on('placement done', function(positions) {
    GameController.placementDone(socket, positions);
  });

  socket.on('move unit', function(data) {
    GameController.moveUnit(socket, data.unit, data.to);
  });

  socket.on('attack', function(data) {
    GameController.attack(socket, data.attacker, data.defender);
  });

  socket.on('debug', function(data) {
    console.log('DEBUG:'.magenta, data);
  });

});

app.sockets = sockets; // we export sockets to avoid waiting timeout during tests
module.exports = app;

if (!module.parent) { // lauch server if not required by another file
  app.listen(config.get('port'));
  console.log("✔ Server listening on http://localhost:".green, config.get('port'));
}
