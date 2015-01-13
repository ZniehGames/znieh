var GameCtrl = require('./game.ctrl.js');
var Game = require('./../model/game');
var UserStorage = require('./../storage/user.storage.js');
var UserManager = require('./../services/user.manager.js');
var GameStorage = require('./../storage/game.storage.js');

describe("Game controller tests", function() {

    var Socket = function() {
      this.emit = function() {return ;}
    };
    var socketA = new Socket();
    var socketB = new Socket();

    var playerA = {'socket': socketA};
    var playerB = {'socket': socketB};

    var game = new Game();

  it('can add a game', function () {

    spyOn(UserStorage, "findBySocket").andCallFake(function(socket) {
      if (socket === socketA) return playerA;
      if (socket === socketB) return playerB;
    });
    spyOn(UserManager, "reloadTeam").andCallThrough();
    spyOn(GameStorage, "add").andCallFake(function(game) {
      expect(game.playerA).toBe(playerA);
      expect(game.playerB).toBe(playerB);
    });

    expect(GameCtrl.add(socketA, socketB)).toBe(true);

    expect(UserStorage.findBySocket).toHaveBeenCalledWith(socketA);
    expect(UserStorage.findBySocket).toHaveBeenCalledWith(socketB);
    expect(UserManager.reloadTeam).toHaveBeenCalledWith(playerA);
    expect(UserManager.reloadTeam).toHaveBeenCalledWith(playerB);
    expect(GameStorage.add).toHaveBeenCalled();
  });

  it('can not add a game if player doesn\'t exist', function () {

    spyOn(UserStorage, "findBySocket").andCallFake(function(socket) {
      if (socket === socketA) return null;
      if (socket === socketB) return {};
    });

    expect(GameCtrl.add(socketA, socketB)).toBe(false);
    expect(UserStorage.findBySocket).toHaveBeenCalledWith(socketA);
    expect(UserStorage.findBySocket).toHaveBeenCalledWith(socketB);
  });

  it('can move a unit', function () {
    spyOn(GameStorage, "findBySocket").andReturn(game);
    spyOn(UserStorage, "findBySocket").andReturn(playerA);
    spyOn(game, "findUnitById").andReturn({'x': 2, 'y': 2});
    GameCtrl.moveUnit(socketA, 1, {'x': 0, 'y': 0});
  });

  it('can move a unit', function () {
    spyOn(GameStorage, "findBySocket").andReturn(game);
    spyOn(UserStorage, "findBySocket").andReturn(playerA);
    spyOn(game, "findUnitById").andReturn({'x': 14, 'y': 2});
    GameCtrl.moveUnit(socketA, 1, {'x': 0, 'y': 0});
  });

});
