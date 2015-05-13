'use strict';

import Contributing from './Contributing';
import GameService from '../services/GameService';


const GameSearch = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='landscape col-sm-11'>
        <div className='container'>
            <a onClick={this.search.bind(this)} className='btn btn-primary'> Recherche </a>
        </div>
      </div>
    );
  },

  search() {
    GameService.search();
  }



});

export default GameSearch;
