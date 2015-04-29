'use strict';

import Navbar from './components/Navbar';
import Home from './components/Home';

let RouteHandler = ReactRouter.RouteHandler;

const App = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
  },

  render() {
    return (
        <div className='App container-fluid'>
            <Navbar />
            <Home />
            <RouteHandler {...this.props} />
        </div>
    );
  }
});

export default App;
