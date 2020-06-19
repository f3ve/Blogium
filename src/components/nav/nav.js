import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Context from '../../context'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-services'
import './nav.css'
import icon from '../../apple-touch-icon.png'

class Nav extends React.Component {
  static defaultProps = {
    user: {}
  }
  static contextType = Context

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpirey()
    IdleService.unRegisterIdleResets()
    this.context.clearActiveUser()
    this.props.history.push('/')
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className='clickMe' to='/register'>Register</Link>
        <Link className='clickMe' to='/login'>Log In</Link>
      </nav>
      )
  }

  toggleMenu(e) {
    e.preventDefault()
    const menu = document.getElementsByClassName('hiddenMenu')[0]

    menu.classList.contains('show')
      ? menu.classList.remove('show')
      : menu.classList.add('show')
  }

  renderUserIcon(user) {
    return (
      <React.Fragment >
        <img className='user-icon' src={user.img} alt={`${user.username}'s icon`} onClick={e => this.toggleMenu(e)}></img>
        <nav className='navBar' aria-label='Hidden drop down menu for mobile'>
          <Link className='clickMe' to={'/editor'}>Create a new post</Link>
          <Link className='clickMe' to={'/drafts'}>View your drafts</Link>
          <Link className='clickMe' to={`/user/${user.id}`}>View your page</Link>
          <Link className='clickMe' to={`/user/${user.id}/account`}>Edit your Account</Link>
          <button className='clickMe' onClick={e => this.handleLogoutClick()}>Logout</button>
        </nav>
    </React.Fragment>
    )
  }

  render() {
    const user = this.props.user
    return (
      <React.Fragment>
        <header>
          <Link to='/'>
            <h1 className='blogium'>Blogium</h1>
            <img src={icon} className='logo' alt='Blogium logo'></img>
          </Link>
          {
            TokenService.hasAuthToken()
            ? this.renderUserIcon(user)
            : this.renderLoginLink()
          }
        </header>
        <nav className='hiddenMenu' onClick={e => this.toggleMenu(e)}>
          <ul className='hiddenList'>
            <li><Link className='clickMe' to={'/editor'}>Create a new post</Link></li>
            <li><Link className='clickMe' to={'/drafts'}>View your drafts</Link></li>
            <li><Link className='clickMe' to={`/user/${user.id}`}>View your page</Link></li>
            <li><Link className='clickMe' to={`/user/${user.id}/account`}>Edit your Account</Link></li>
            <li><button className='clickMe' onClick={e => this.handleLogoutClick()}>Logout</button></li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default withRouter(Nav)