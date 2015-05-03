'use strict';

import LoginActions from './actions/LoginActions';
import router from './router';

let jwt = localStorage.getItem('jwt');
console.log('jwt', jwt);

if (jwt) {
  LoginActions.loginUser(jwt);
}

router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.body);
});
