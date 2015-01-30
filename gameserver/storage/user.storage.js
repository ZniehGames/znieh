'use strict';

var User = require('./../model/user');

function UserStorage() {

  this.users =  [];

  this.add = function(user) {
     this.users.push(user);
  };

  this.remove = function(user) {
    var userIndex = this.users.indexOf(user);

    if (this.users[userIndex] !== undefined) {
      this.users[userIndex].disconnectTimeout = setTimeout(function() {
        if (this.users) {
          this.users.splice(userIndex, 1);
        }
      }, 30 * 1000); // 30 seconds
    }
  };

  this.updateSocket = function(user, socket) {
    var userIndex = this.users.indexOf(user);

    if (user.disconnectTimeout !== undefined) {
      clearTimeout(this.users[userIndex].disconnectTimeout);
      this.users[userIndex].disconnectTimeout = undefined;
    }
    this.users[userIndex].socket = socket;
  };

  this.findByUsername = function(username) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        return this.users[i];
      }
    }
    return null;
  }

  this.findBySocket = function(socket) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].socket === socket) {
        return this.users[i];
      }
    }
    return null;
  };

}

module.exports = new UserStorage();
