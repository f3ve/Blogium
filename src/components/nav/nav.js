import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'

export default class Nav extends React.Component {
  render() {
    return (
      <header>
        <Link to='/'>
          <h1>Blogium</h1>
        </Link>
        <nav>
          <Link to='/user/page'>Sample user page!</Link>
          <span> / </span>
          <Link to='/editor'>New Post!</Link>
          <span> / </span>
          <Link to='/register'>Register</Link>
          <span> / </span>
          <Link to='/login'>Log In</Link>
        </nav>
      </header>
    )
  }
}