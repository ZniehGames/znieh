import {SEARCH_GAME, START_GAME} from '../constants/GameConstants';
import BaseStore from './BaseStore';

class GameStore extends BaseStore {

  constructor() {
    super();
    this.register(this._registerToActions.bind(this));
    this._searchStartAt = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case SEARCH_GAME:
        if (this._searchStartAt === null) {
          this._searchStartAt = new Date();
          this.emitChange();
        }
        break;
      case START_GAME:
        this.emitChange();
      default:
        break;
    };
  }

  get _searchStartAt() {
    return this._searchStartAt;
  }

  isSearching() {
    return !!this._searchStartAt;
  }
}

export default new GameStore();

