'use strict';

import Navbar from './Navbar';
import Home from './Home';
import GameSearch from './GameSearch';
import LoginStore from '../stores/LoginStore';

let RouteHandler = ReactRouter.RouteHandler;



const App = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return this._getLoginState();
  },

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  },

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  },

  _onChange() {
    this.setState(this._getLoginState());
  },

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  },

  render() {
    return (
        <div className='App row'>
            <Navbar isLoggedIn={this.state.userLoggedIn} />
            {this.mainContent()}
            <RouteHandler {...this.props} />
        </div>
    );
  },

  mainContent() {
    if (!this.state.userLoggedIn) {
      return (
        <Home />
      );
    }
    return (
      <GameSearch />
    );
  }

});

export default App;
