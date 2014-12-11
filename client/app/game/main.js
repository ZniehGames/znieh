'use strict';

import Game from 'states/Game';

var game, GameApp = {};

GameApp.start = function() {

    game = new Phaser.Game(
        800, 480,
        Phaser.AUTO,
        'game-app'
    );

    //game.analytics = new Analytics('phaser-game');
    game.io = null; // will be set by angular

    game.state.add('game', Game);
    game.state.states.game.parent = this;
    game.state.start('game');

    return game;
};

export default GameApp;
