import TokenService from './token-service'
import config from '../config'
import Context from '../context'

const PostsApiService = {
  getPosts() {
    return fetch(`${config.API_BASE_URL}/posts`) 
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      ) 
  },

  getPost(id) {
    return fetch(`${config.API_BASE_URL}/posts/${id}`)
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  getDrafts() {
    return fetch(`${config.API_BASE_URL}/posts/drafts`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  getComments(postId) {
    return fetch(`${config.API_BASE_URL}/posts/${postId}/comments`)
      .then(res =>
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  getUser(id) {
    return fetch(`${config.API_BASE_URL}/users/${id}`)
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getUsersPosts(userId) {
    return fetch(`${config.API_BASE_URL}/users/${userId}/posts`)
      .then(res =>
        !res.ok
          ?res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  postPost(post) {
    return fetch(`${config.API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(post)
    })
  },

  postComment(comment) {
    return fetch(`${config.API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(comment)
    })
  },

  patchUser(user) {
    return fetch(`${config.API_BASE_URL}/${user.id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(user)
    })
  }
}

export default PostsApiService