'use strict';

function User(auth, socket) {
    this.id = auth.id;
    this.username = auth.username;
    this.roles = auth.roles;
    this.socket = socket;
    this.team = [];
}

module.exports = User;
