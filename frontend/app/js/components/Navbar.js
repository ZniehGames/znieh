'use strict';

let Navigation = ReactRouter.Navigation;

const Navbar = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      item: 'login'
    };
  },

  render() {
    return (
      <div className='col-sm-1 sidebar'>
        <ul className='nav nav-sidebar'>
          <li>
            <a onClick={this.handleGoClick}>
              <i className='glyphicon glyphicon-tower'></i>
            </a>
          </li>
          <li>
            <a onClick={this.handleGoClick}>
              <i className='glyphicon glyphicon-tower'></i>
            </a>
          </li>
          <li>
            <a onClick={this.handleGoClick}>
              <i className='glyphicon glyphicon-tower'></i>
            </a>
          </li>
        </ul>
        <ul className='nav nav-sidebar bottom'>
          <li>
              <img src={'img/logo.png'} />
          </li>
        </ul>
      </div>
    );
  },

  handleGoClick() {
    this.transitionTo('/' + this.state.item);
  }
});

export default Navbar;
