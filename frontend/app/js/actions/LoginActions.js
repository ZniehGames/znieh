'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
// import RouterContainer from '../services/RouterContainer'

export default {

  loginUser: (jwt, user) => {
    // RouterContainer.get().transitionTo('/');
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', user);

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt,
      user: user
    });
  },

  logoutUser: () => {
    // RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
