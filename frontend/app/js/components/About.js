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
          <ul>
            <li>Assemble de toutes pièces tes propres armes et armures.</li>
            <li>Invente les unités du jeu en choissant leurs compétences !</li>
            <li>Et défi les autres joueurs en combattant dans les arènes...</li>
          </ul>
          <img src={'images/map-example.jpg'} className='img-responsive sample-map'/>
        </div>
      </div>
    );
  },

});

export default About;
