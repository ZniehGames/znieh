'use strict';

import Fetcher from './Fetcher';
import SocketContainer from './SocketContainer';

import GameActions from '../actions/GameActions';

class GameService {

  search() {
    console.log('search');
    SocketContainer
    .get()
    .emit('search match');
    GameActions.search();
  }

}

export default new GameService();
