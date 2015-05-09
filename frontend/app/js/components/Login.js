'use strict';

import AuthService from '../services/AuthService';
import LoginStore from '../stores/LoginStore'


const Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  login(e) {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password)
               .catch(function(err) {
                  console.log('Error in login', err);
               });
  },

  render() {
    return (
      <div className='login animated bounceInDown hidden-xs hidden-sm'>
        <div className='login-image'>
        <img src={'images/form.png'} className='img-responsive' />
        <form className="login-form" role="form" noValidate>
          <div className="form-group">
            <input type="text" name="username" valueLink={this.linkState('username')} placeholder="Pseudo ou email" />
          </div>
          <div class="form-group">
            <input type="password" name="password" valueLink={this.linkState('password')} placeholder="Mot de passe" />
          </div>
          <button className='btn btn-default' type="submit" onClick={this.login.bind(this)}>Connexion</button>
        </form>
        </div>
      </div>
    );
  }

});

export default Login;
