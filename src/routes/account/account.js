import React from 'react'
import TokenService from '../../services/token-service'
import IdleService from '../../services/token-service'
import Context from '../../context'
import {storage} from '../../firebase/firebase'
import AuthApiService from '../../services/auth-api-service'
import PostsApiService from '../../services/posts-api-services'
import './account.css'
// import AuthApiService from '../../services/auth-api-service'

export default class Account extends React.Component {
  static contextType = Context

  state = {
    selectedFile: null,
    full_name: {
      value: '',
      changed: false,
    },
    email: {
      value: '',
      changed: false,
    },
    bio: {
      value: '',
      changed: false
    },
    img: {
      context: '',
      changed: false
    }
  }

  upLoadImg = (e, userId) => {
    e.preventDefault()
    const img = this.state.selectedFile

    if (img.type !== 'image/png') {
      console.log('You must upload an image')
    }
    console.log('img upload started')
    console.log(img)

    const uploadTask = storage.ref(`/images/${img.name}`).put(img)

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('images').child(img.name).getDownloadURL()
        .then(url => {
          this.setState({
            url
          })
          const newUser = {
            img: this.state.url
          }

          PostsApiService.patchUser(newUser, userId)
            .then(res => {
              console.log(res)
              this.onSuccessfulUpdate(res)()
            })
            .catch(err => console.log(err))
        })
    })
  }

  updateName = (e) => {
    this.setState({
      fullname: {
        value: e.target.value,
        changed: true
      }
    })
  }

  updateEmail = (e) => {
    this.setState({
      email: {
        value: e.target.value,
        changed: true
      }
    })
  }

  updateBio = (e) => {
    this.setState({
      bio: {
        value: e.target.value,
        changed: true
      }
    })
  }

  handleUpdateName = (e) => {
    e.preventDefault()

    const full_name = document.getElementById('full_name').value

    const updateUser = {
      full_name
    }
    PostsApiService.patchUser(updateUser, this.props.match.params.id)
    .then(res => {
      console.log(res)
      this.onSuccessfulUpdate(res)
    })
      .catch(err => alert(err))
  }

  handleUpdateEmail = (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value

    const updateUser = {
      email
    }

    PostsApiService.patchUser(updateUser, this.context.activeUser.id)
    .then(res => {
      console.log(res)
      this.onSuccessfulUpdate(res)
    })
      .catch(e => console.log(e))
  }

  handleUpdateBio = e => {
    e.preventDefault()
    const bio = document.getElementById('bio').value
    const updateUser = {
      bio
    }

    PostsApiService.patchUser(updateUser, this.context.activeUser.id)
    .then(user => {
      console.log(user)
      this.onSuccessfulUpdate(user)
    })
      .catch(e => console.log(e))
  }

  onSuccessfulUpdate = (user) => {
    this.context.setActiveUser(user, () => console.log('yay!'))
  }


  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  onSuccessfulDelete = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpirey()
    this.context.clearActiveUser(
      () => this.props.history.push('/')
    )
  }

  handleDelete = (e, userId) => {
    e.preventDefault()
    PostsApiService.deleteUser(userId)
      .then(res => {
        !res.ok
          ? res.json().then(res => Promise.reject(res))
          : this.onSuccessfulDelete()
      })
      .catch(err => console.log(err))
  }

  render() {
    const user = this.context.activeUser
    return (
      <React.Fragment>
        <h2>{this.context.activeUser.username}</h2>
        <form className='account-form' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='img'><img src={this.state.url ? this.state.url : user.img} alt={`${user.username}'s icon`} className='userImg'/></label>
          <input type='file' id='img' onChange={e => this.fileSelectedHandler(e)} />
          <button onClick={e => this.upLoadImg(e, user.id)}>Upload</button>

          <label htmlFor='full_name'>Name</label>
          <input type='text' id='full_name' defaultValue={user.full_name} onChange={e => this.updateName(e)}/>
          <button onClick={e => this.handleUpdateName(e)}>update name</button>

          <label htmlFor='email'>email</label>
          <input type='email' id='email' defaultValue={user.email} />
          <button onClick={e => this.handleUpdateEmail(e)}>update email</button>

          <label htmlFor='bio'>Bio</label>
          <textarea id={'bio'} defaultValue={user.bio}></textarea>
          <button onClick={e => this.handleUpdateBio(e)}>update bio</button>

          <button className='delete' onClick={e=> this.handleDelete(e, user.id)}>delete account</button>
        </form>
      </React.Fragment>
    )
  }
}