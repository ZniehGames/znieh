'use strict';

import Game from 'states/Game';
import Preload from 'states/Preload';

var game, GameApp = {};

GameApp.start = function() {

    game = new Phaser.Game(
        800, 480,
        Phaser.AUTO,
        'game-app'
    );

    //game.analytics = new Analytics('phaser-game');
    this.debug = true;
    this.side = 'left';

    // we add states for constructing code
    game.state.add('preload', Preload);
    game.state.add('game', Game);

    game.state.states.game.parent = this;

    // we start by preloading the assets
    game.state.start('preload');

    return game;
};

export default GameApp;
