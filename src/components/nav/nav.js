import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Context from '../../context';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-services';
import './nav.css';
import icon from '../../apple-touch-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Nav extends React.Component {
  static defaultProps = {
    user: {},
  };
  static contextType = Context;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpirey();
    IdleService.unRegisterIdleResets();
    this.context.clearActiveUser();
    this.props.history.push('/main');
  };

  renderLoginLink() {
    return (
      <nav>
        <Link className='clickMe' to='/register'>
          Register
        </Link>
        <Link className='clickMe' to='/login'>
          Log In
        </Link>
      </nav>
    );
  }

  showMenu(e) {
    e.preventDefault();
    const menu = document.querySelector('.hiddenMenu').classList;
    const icon = document.querySelector('.user-icon');
    const button = document.querySelector('.toggleButton');

    button.style.display = 'initial';
    icon.style.display = 'none';
    menu.add('show');
  }

  hideMenu() {
    const menu = document.querySelector('.hiddenMenu').classList;
    const icon = document.querySelector('.user-icon');
    const button = document.querySelector('.toggleButton');

    icon.style.display = 'initial';
    button.style.display = 'none';
    menu.remove('show');
  }

  renderUserIcon(user) {
    return (
      <React.Fragment>
        <button className='clickMe toggleButton'>
          <FontAwesomeIcon icon='plus' className='x' />
        </button>
        <img
          className='user-icon'
          src={user.img}
          alt={`${user.username}'s icon`}
          onClick={(e) => this.showMenu(e)}
        ></img>
        <nav className='navBar' aria-label='Hidden drop down menu for mobile'>
          <Link className='clickMe' to={'/editor'}>
            Create a new post
          </Link>
          <Link className='clickMe' to={'/drafts'}>
            View your drafts
          </Link>
          <Link className='clickMe' to={`/user/${user.id}`}>
            View your page
          </Link>
          <Link className='clickMe' to={`/user/${user.id}/account`}>
            Edit your Account
          </Link>
          <button className='clickMe' onClick={(e) => this.handleLogoutClick()}>
            Logout
          </button>
        </nav>
      </React.Fragment>
    );
  }

  render() {
    const user = this.props.user;

    if (document.querySelector('user.icon')) {
      document.onclick = () => {
        this.hideMenu();
      };
    }

    return (
      <React.Fragment>
        <header>
          <Link to='/main'>
            <h1 className='blogium'>Blogium</h1>
            <img src={icon} className='logo' alt='Blogium logo'></img>
          </Link>
          {TokenService.hasAuthToken()
            ? this.renderUserIcon(user)
            : this.renderLoginLink()}
        </header>
        <nav className='hiddenMenu'>
          <ul className='hiddenList'>
            <li>
              <Link className='clickMe' to={'/editor'}>
                Create a new post
              </Link>
            </li>
            <li>
              <Link className='clickMe' to={'/drafts'}>
                View your drafts
              </Link>
            </li>
            <li>
              <Link className='clickMe' to={`/user/${user.id}`}>
                View your page
              </Link>
            </li>
            <li>
              <Link className='clickMe' to={`/user/${user.id}/account`}>
                Edit your Account
              </Link>
            </li>
            <li>
              <button
                className='clickMe'
                onClick={(e) => this.handleLogoutClick()}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Nav);
