'use strict';

import LoginActions from './actions/LoginActions';
import router from './router';
import RouterContainer from './services/RouterContainer';

RouterContainer.set(router);

router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.body);
});

let jwt = localStorage.getItem('jwt');
let user = JSON.parse(localStorage.getItem('user'));

if (jwt && user) {
  LoginActions.loginUser(jwt, user);
}
