'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {SEARCH_GAME} from '../constants/GameConstants';

export default {

  search: () => {

    toastr.info('Recherche en cours', 'Informations');

    AppDispatcher.dispatch({
      actionType: SEARCH_GAME
    });
  }
}
