var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var io = require('socket.io-client');
var expect = chai.expect;

module.exports = function() {

  var socket = null;

    this.Given(/^Gameserver is running$/, function(done) {
      this.server = require('./../../gameserver/server');
      this.server.listen(1337);
      done();
    });

    this.Given(/^Gameserver is running with 1 player in queue$/, function(done) {
      this.server = require('./../../gameserver/server');
      this.server.listen(1337);
      socket = io.connect('http://127.0.0.1:1337', {
        transports: ['websocket'],
        'force new connection': true
      });
      socket.on('connect', function(){
        socket.emit('authenticate', {"id":12,"username":"spyl","roles":["ROLE_USER"]});
        socket.emit('search match');
      });
      done();
    });

    this.Then(/^Game is ready$/, function(done) {
        socket.emit('placement done', [
          {'id': 48, 'x': 4, 'y': 4},
          {'id': 47, 'x': 5, 'y': 4},
          {'id': 46, 'x': 5, 'y': 5},
          {'id': 45, 'x': 4, 'y': 5}
        ]);
        browser.sleep(500);
        done();
    })

    this.When(/^I want to move a unit$/, function(done) {
        socket.emit('move unit', {
          "unit": 48,
          "to": {"x": 0, "y": 0}
        });
        socket.on('unit moved', function(data) {
          console.log(data);
          done();
        });
    });

    this.After(function(done){
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        if (this.server) {
          this.server.close();
          this.server.sockets.forEach(function(socket) {
            socket.disconnect();
          });
        }
        done();
    });

};
