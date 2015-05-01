'use strict';

import Newsletter from './Newsletter';
import Login from './Login';

const Home = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className='landscape col-sm-11'>
        <div className='container homepage-layer'>
          <header className='business-header'>
            <h1> Znieh </h1>
          </header>
          <h2 class="tagline">Le MMO de stratégie gratuit qui met fin aux classes prédéfinies !</h2>
          <Newsletter />
        </div>
        <Login />
      </div>
    );
  },

});

export default Home;
