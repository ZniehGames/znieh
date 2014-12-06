'use strict';

var User = require('./../model/user');

function UserStorage() {

  this.users =  [];

  this.add = function(user) {
     this.users.push(user);
  };

  this.remove = function(user) {
    this.users.splice(this.users.indexOf(user), 1);
  };

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
