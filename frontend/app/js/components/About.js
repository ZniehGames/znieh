'use strict';

const About = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='col-xs-10 col-xs-offset-1 about'>
        <div className='col-md-5'>
          <div className='positioning'>
              <p>Un jeu gratuit <strong>stratégique</strong> et <strong>équilibré</strong></p>
          </div>
          <div className='positioning'>
              <p><strong>Certifié</strong> sans Pay To Win</p>
          </div>
          <div className='positioning'>
              <p>Pas d'attente, <strong>jouez quand vous voulez !</strong></p>
          </div>
        </div>
        <div className='col-md-7'>
          <div className='description'>
              <p>Invente les unités du jeu en assemblant tes propres armes, armures et en choissant leurs compétences !</p>
          </div>
          <div className='description'>
              <p>Défi les autres joueurs en combattant dans les arènes...</p>
          </div>
          <img src={'images/map-example.jpg'} className='img-responsive'/>
        </div>
      </div>
    );
  },

});

export default About;
