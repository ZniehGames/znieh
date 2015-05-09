'use strict';

const Contributing = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='col-xs-10 col-xs-offset-1 contributing'>
        <div className='col-md-4'>
          <img src={'images/brigand.png'} className='img-responsive'/>
        </div>
        <div className='col-md-8'>
          <h3>Participe au développement du jeu en proposant directement tes patchs !</h3>
          <p>Tu peux dès à présent télécharger les sources du jeu, et proposer tes améliorations aux développeurs.</p>
          <a href='https://github.com/ZniehGames/znieh' target="_blank">
            <img src={'images/github.png'} className='github'/>
          </a>
        </div>
      </div>
    );
  },

});

export default Contributing;
