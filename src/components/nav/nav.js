import React from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import './nav.css'

export default class Nav extends React.Component {

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
    const user = this.props.activeUser
    return (
      <header>
        <Link to='/'>
          <h1>Blogium</h1>
        </Link>
        <nav className='hiddenMenu'>
          <ul>
            <li><Link to={'/editor'}>Create a new post</Link></li>
            <li><Link to={'/drafts'}>View your drafts</Link></li>
            <li><Link to={`/users/${user.id}`}>View your page</Link></li>
            <li><Link to={`/account`}>Edit your Account</Link></li>
            <li><Link>Logout</Link></li>
          </ul>
        </nav>
        {
          TokenService.hasAuthToken()
            ? this.renderUserIcon(this.props.activeUser)
            : this.renderLoginLink()
        }
      </header>
    )
  }
}