'use strict';

import config from '../config';

const Newsletter = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='col-xs-10 col-xs-offset-1 newsletter-cta'>
        <h1>Rejoins l'aventure dès maintenant</h1>
        <h2>Entre ton email pour jouer pendant le développement du jeu !</h2>
        <form id="newsletter" role="form">
          <input type="text" name="email" placeholder="Email" />
          <button type="submit" onClick={this.handleSubmit}></button>
          <div className='caption'>Ne vous inquiétez pas, vous pouvez vous désinscrire à tout moment.</div>
        </form>
      </div>
    );
  },

  handleSubmit() {
    fetch(config.api);
  }

});

export default Newsletter;
