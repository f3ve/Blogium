import React from 'react'
import { withRouter } from 'react-router-dom'
import './register.css'

class Register extends React.Component {

  clickCancel(e) {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    return (
      <section id='registration-container'>
        <h2>Create Account</h2>
        <form id='registration-form'>
          <label htmlFor='full_name'>Full Name:</label>
          <input 
            type='text'
            id='full_name'
            placeholder='Full Name'
            required
          />

          <label htmlFor='username'>Username:</label>
          <input 
            type='text'
            id='username'
            placeholder='username'
            required
          />

          <label htmlFor='email'>email:</label>
          <input
            type='email'
            id='email'
            placeholder='youremail@email.com'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            id='password'
            placeholder='Password'
            required
          />

          <label htmlFor='match'>Re-enter Password:</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            required
          />

          <div className='button-container'>
            <button type='submit'>Create Account</button>
            <button onClick={e => this.clickCancel(e)}>Cancel</button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(Register)