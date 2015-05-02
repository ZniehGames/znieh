'use strict';

import Fetcher from '../utils/Fetcher';

const Newsletter = React.createClass({

  getInitialState() {
    return {
      email: '',
    };
  },

  render() {
    return (
      <div className='col-xs-10 col-xs-offset-1 newsletter-cta'>
        <h1>Rejoins l'aventure dès maintenant</h1>
        <h2>Entre ton email pour jouer pendant le développement du jeu !</h2>
        <form id="newsletter" role="form">
          <div className='arrow'></div>
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}></button>
          <div className='caption'>Ne vous inquiétez pas, vous pouvez vous désinscrire à tout moment.</div>
        </form>
      </div>
    );
  },

  handleChange(e) {
      this.setState({email: e.target.value});
  },

  success() {
    toastr.success(this.state.email +' est inscrit, tu pourras jouer avant tous les autres !', 'Bienvenue sur Znieh');
    this.setState({email: ''});
  },

  fail() {
    toastr.error('Cette email n\'a pas l\'air valide... Essayes en un autre ;-)', 'Oops !');
  },

  handleSubmit(e) {
    e.preventDefault();

    Fetcher.post(
      'emails',
      {
        email: this.state.email
      },
      this.success,
      this.fail
    );
  }

});

export default Newsletter;
