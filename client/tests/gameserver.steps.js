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

    this.When(/^I want to move a unit$/, function(done) {
        socket.emit('move unit', {
          "unit": 45,
          "to": {"x": 0, "y": 0}
        });
      done();
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
