import React from 'react'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import Context from '../../context'
import { withRouter } from 'react-router-dom'
import './register.css'

class Register extends React.Component {
  static contextType = Context

  handleSuccess = (username, password) => {
    const {history} = this.props
    AuthApiService.postLogin({
      username,
      password
    })
      .then(res => {
        const token = TokenService.readJwToken()
        username = ''
        password = ''
        
        PostsApiService.getUser(token.id)
        .then(u => {
          this.context.setActiveUser(u, () => history.push(`/user/${token.id}/account`))
        })
      })
      .catch(err => alert(err))

  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { full_name, username, email, password, matchPassword} = e.target

    AuthApiService.postUser({
      username: username.value,
      full_name: full_name.value,
      email: email.value,
      password: password.value,
      matchPassword: matchPassword.value
    })
      .then(u => {
        full_name.value = ''
        email.value = ''
        matchPassword.value = ''
        this.handleSuccess(username.value, password.value)
      })
      .catch(res => alert(res.error))
  }

  clickCancel(e) {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    return (
      <section id='registration-container'>
        <h2>Create Account</h2>
        <form id='registration-form' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='full_name'>Full Name:</label>
          <input 
            type='text'
            id='full_name'
            placeholder='Full Name'
            name='full_name'
            required
          />

          <label htmlFor='username'>Username:</label>
          <input 
            type='text'
            id='username'
            name='username'
            placeholder='username'
            required
          />

          <label htmlFor='email'>email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='youremail@email.com'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            required
          />

          <label htmlFor='match'>Re-enter Password:</label>
          <input
            type='password'
            id='matchPassword'
            name='matchPassword'
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