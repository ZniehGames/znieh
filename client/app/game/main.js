'use strict';

import Preload from 'states/Preload';
import Placement from 'states/Placement';
import Game from 'states/Game';

var game, GameApp = {};

GameApp.start = function() {

    game = new Phaser.Game(
        864, 480,
        Phaser.AUTO,
        'game-app'
    );

    game.io = null;
    game.side = null;
    game.user = null;

    //game.analytics = new Analytics('phaser-game');

    game.state.add('preload', Preload);
    game.state.add('placement', Placement);
    game.state.add('game', Game);

    game.state.start('preload');

    return game;
};

export default GameApp;
