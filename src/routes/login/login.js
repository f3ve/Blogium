import React from 'react'
import {withRouter} from 'react-router-dom'
import './login.css'

class Login extends React.Component {

  clickCancel(e) {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    return(
      <section id='login-container'>
        <h2>Login</h2>
        <form id='login-form'>
          <label htmlFor='username'>Username:</label>
          <input 
            type='text'
            id='username'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            id='password'
            required
          />
          <div className='button-container'>
            <button>Login</button>
            <button onClick={e => this.clickCancel(e)}>Cancel</button>
          </div>
        </form>
      </section>
    )
  }
}
 
export default withRouter(Login)