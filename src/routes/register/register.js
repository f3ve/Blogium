import React from 'react'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import Context from '../../context'
import { withRouter } from 'react-router-dom'
import ValidationError from '../../ValidationError'
import './register.css'

class Register extends React.Component {
  static contextType = Context

  state = {
    full_name: {
      value: '',
      changed: false
    }, 
    username: {
      value: '',
      changed: false
    },
    email: {
      value: '',
      changed: false
    },
    password: {
      value: '',
      changed: false
    },
    matchPassword: {
      value: '',
      changed: false
    }
  }

  handleSuccess = () => {
    const {history} = this.props
    const username = this.state.username.value
    const password = this.state.password.value
    AuthApiService.postLogin({
      username,
      password
    })
      .then(res => {
        const token = TokenService.readJwToken()
        
        PostsApiService.getUser(token.id)
        .then(u => {
          this.context.setActiveUser(u, () => history.push(`/user/${token.id}/account`))
        })
      })
      .catch(err => this.context.setError(err.error))

  }

  updateName(e) {
    this.setState({
      full_name: {
        value: e.target.value,
        changed: true
      }
    })
  }

  updateUsername(e){
    this.setState({
      username: {
        value: e.target.value,
        changed: true
      }
    })
  }

  updateEmail(e) {
    this.setState({
      email: {
        value: e.target.value,
        changed: true
      }
    })
  }

  updatePassword(e) {
    this.setState({
      password: {
       value: e.target.value, 
       changed: true
      }
    })
  }

  updateMatchPassword(e) {
    this.setState({
      matchPassword: {
        value: e.target.value,
        changed: true
      }
    })
  }

  validateName() {
    const name = this.state.full_name.value
    if (name.length < 3) {
      return 'Your name must be longer than 3 characters'
    }
  }
  
  validateEmail() {
    const email = this.state.email.value
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return 'You must enter a valid email'
    }
  }

  validateUsername() {
    const username = this.state.username.value
    if (username.length < 4) {
      return 'Username must be at least 4 characters'
    }
    if (username.startsWith(' ') || username.endsWith(' ')) {
      return `Username cannot start or end with empty space`
    }
  }

  validatePassword() {
    const password = this.state.password.value
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/

    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number, and special character'
    }
    // return null
  }

  validateMatchPassword() {
    const password = this.state.password.value
    const matchPassword = this.state.matchPassword.value

    if (password !== matchPassword) {
      return 'Passwords do not match'
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.clearError()
    // const { full_name, username, email, password, matchPassword} = e.target

    AuthApiService.postUser({
      username: this.state.username.value,
      full_name: this.state.full_name.value,
      email: this.state.email.value,
      password: this.state.password.value,
      matchPassword: this.state.matchPassword.value
    })
      .then(u => {
        // full_name.value = ''
        // email.value = ''
        // matchPassword.value = ''
        this.handleSuccess()
      })
      .catch(res => this.context.setError(res.error))
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
            onChange={e => this.updateName(e)}
            required
          />

          {this.state.full_name.changed && (
            <ValidationError message={this.validateName()}/>
          )}

          <label htmlFor='username'>Username:</label>
          <input 
            type='text'
            id='username'
            name='username'
            placeholder='username'
            onChange={e => this.updateUsername(e)}
            required
          />

          {this.state.username.changed && (
            <ValidationError message={this.validateUsername()}/>
          )}

          <label htmlFor='email'>email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='youremail@email.com'
            onChange={e => this.updateEmail(e)}
            required
          />

          {
            this.state.email.changed && (
              <ValidationError message={this.validateEmail()} />
            )
          }

          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={e => this.updatePassword(e)}
            required
          />

          {
            this.state.password.changed && (
              <ValidationError message={this.validatePassword()} />
            )
          }

          <label htmlFor='match'>Re-enter Password:</label>
          <input
            type='password'
            id='matchPassword'
            name='matchPassword'
            placeholder='Password'
            onChange={e => this.updateMatchPassword(e)}
            required
          />

          {
            this.state.matchPassword.changed && (
              <ValidationError message={this.validateMatchPassword()} />
            )
          }

          <div className='button-container'>
            <button 
              className='clickMe'
              type='submit'
              disabled={
                this.validateName() || 
                this.validateUsername() || 
                this.validateEmail() ||
                this.validatePassword() ||
                this.validateMatchPassword()
              }
            >
              Create Account
            </button>
            <button className='clickMe' onClick={e => this.clickCancel(e)}>Cancel</button>
            {
              this.context.error !== null
              ? <p className='error'>{this.context.error}</p>
              : null
            }
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(Register)