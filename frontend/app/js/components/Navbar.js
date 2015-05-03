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
    console.log(this.props);
    return (
      <div className='col-sm-1 sidebar'>
        <div className='sidebar-part sidebar-part--top'>
        </div>
        <div className='sidebar-part sidebar-part--center'>
            <div className='sidebar-link'>
              <a onClick={this.handleGoClick}>...</a>
            </div>
            <div className='sidebar-link'>
              <a onClick={this.handleGoClick}>...</a>
            </div>
            <div className='sidebar-link'>
              <a onClick={this.handleGoClick}>...</a>
            </div>
        </div>
        <div className='sidebar-part sidebar-part--bottom'>
          <img src={'images/banana.png'} className='img-responsive'/>
        </div>
    </div>
    );
  },

  handleGoClick() {
    this.transitionTo('/' + this.state.item);
  }
});

export default Navbar;
