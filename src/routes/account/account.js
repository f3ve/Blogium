import React from 'react'
import {Link} from 'react-router-dom'
import Context from '../../context'
import PostsApiService from '../../services/posts-api-services'
import './account.css'

export default class Account extends React.Component {
  static contextType = Context

  state = {
    selectedtFile: null
  }

  // handleSubmit = 

  fileSelectedHandler = e => {
    this.setState({
      selectedtFile: e.target.files[0]
    })
  }

  render() {
    const user = this.context.activeUser
    return (
      <React.Fragment>
        <h2>{this.context.activeUser.username}</h2>
        <form className='account-form'>
          <label htmlFor='img'><img src={user.img} alt={`${user.username}'s icon`} className='userImg'/></label>
          <input type='file' id='img' onChange={e => this.fileSelectedHandler(e)} />

          <label htmlFor='full_name'>Name</label>
          <input type='text' id='full_name' defaultValue={user.full_name} />

          <label htmlFor='username'>Username</label>
          <input type='text' id='username' defaultValue={user.username} />

          <label htmlFor='email'>email</label>
          <input type='email' id='email' defaultValue={user.email} />

          <label htmlFor='bio'>Bio</label>
          <textarea id={user.bio} defaultValue={user.bio}></textarea>

          <button>submit</button>
          <button className='delete'>delete account</button>
        </form>
      </React.Fragment>
    )
  }
}