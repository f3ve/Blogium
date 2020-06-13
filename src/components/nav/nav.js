import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Context from '../../context'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-services'
import './nav.css'

class Nav extends React.Component {
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
        <Link to='/register'>Register</Link>
          <span> / </span>
        <Link to='/login'>Log In</Link>
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
      <a href='' onClick={e => this.toggleMenu(e)}>
        <img className='user-img' src={user.img} alt={`${user.username}'s icon`}></img>
      </a>
    )
  }

  render() {
    const user = this.props.user
    return (
      <React.Fragment>
        <header>
          <Link to='/'>
            <h1>Blogium</h1>
          </Link>
          {
            TokenService.hasAuthToken()
            ? this.renderUserIcon(user)
            : this.renderLoginLink()
          }
        </header>
        <nav className='hiddenMenu'>
          <ul>
            <li><Link to={'/editor'}>Create a new post</Link></li>
            <li><Link to={'/drafts'}>View your drafts</Link></li>
            <li><Link to={`/user/${user.id}`}>View your page</Link></li>
            <li><Link to={`/user/${user.id}/account`}>Edit your Account</Link></li>
            <li><Link onClick={e => {
              this.handleLogoutClick() 
              this.toggleMenu(e)
            }
          }>Logout</Link></li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default withRouter(Nav)