var GameStorage = require('./game.storage.js');
var Game = require('./../model/game');


describe("Game storage tests", function() {

  it('can add a game', function () {

    expect(GameStorage.games.length).toEqual(0);
    var game = new Game();
    expect(GameStorage.add(game)).toEqual(game);
    expect(GameStorage.games).toContain(game);

  });


});
