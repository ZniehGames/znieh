'use strict';

import Newsletter from './Newsletter';
import Login from './Login';
import About from './About';
import Contributing from './Contributing';

const Home = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='landscape col-sm-11'>
        <div className='container'>
          <header className='business-header'>
            <h1> Znieh </h1>
            <h2 class="tagline">Le <strong>MMO</strong> de stratégie gratuit sans classes !</h2>
          </header>
          <Newsletter />
          <About />
          <Contributing />
        </div>
        <Login />
      </div>
    );
  },

});

export default Home;
