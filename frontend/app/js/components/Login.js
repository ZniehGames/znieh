'use strict';

import Fetcher from '../utils/Fetcher';

const Login = React.createClass({

  getInitialState() {
    return {
      email: '',
    };
  },

  render() {
    return (
      <div className='login animated bounceInDown'>
        <div className='login-image'>
        <img src={'images/form.png'} className='img-responsive' />
        <form className="login-form" role="form">
          <div className="form-group">
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <input type="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handleChange} />
          </div>
          <button className='btn btn-default' type="submit" onClick={this.handleSubmit}>Connexion</button>
          <p> Pas encore inscrit ?</p>
        </form>
        </div>
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

export default Login;
