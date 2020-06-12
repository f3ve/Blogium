import React from 'react'
import AuthApiService from '../../services/auth-api-service'
import Context from '../../context'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import {withRouter} from 'react-router-dom'
import './login.css'

class Login extends React.Component {
static contextType = Context
  
  clickCancel(e) {
    e.preventDefault()
    this.props.history.push('/')
  }

  handleSuccess() {
    const destination = (this.props.location.state || {}).from || '/'
    const token = TokenService.readJwToken()

    PostsApiService.getUser(token.id)
      .then(u => {
        this.context.setActiveUser(u, () => this.props.history.push(destination))
      })
      .catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault()

    const {username, password} = e.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(() => {
        username.value = ''
        password.value = ''
        this.handleSuccess()
      })
      .catch(res => alert(res.error))
  }

  render() {
    return(
      <section id='login-container'>
        <h2>Login</h2>
        <form id='login-form'onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='username'>Username:</label>
          <input 
            type='text'
            id='username'
            name='username'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            id='password'
            name='password'
            required
          />
          <div className='button-container'>
            <button type='submit'>Login</button>
            <button onClick={e => this.clickCancel(e)}>Cancel</button>
          </div>
        </form>
      </section>
    )
  }
}
 
export default withRouter(Login)