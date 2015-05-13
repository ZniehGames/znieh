'use strict';

import Fetcher from '../services/Fetcher';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    return Fetcher
    .post('/login_check', {
      username: username,
      password: password
    })
    .then(function(response) {
      let jwt = response.token;
      let user = response.user;
      LoginActions.loginUser(jwt, user);
      return true;
    });
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(username, password, email) {
    return this.handleAuth(Fetcher.postQ('users', {
      username: username, password: password, email: email
    }));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }

}

export default new AuthService();
