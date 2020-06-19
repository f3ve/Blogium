import React from 'react'
import Context from '../../context'
import './commentForm.css'
import PostsApiService from '../../services/posts-api-services'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'

class CommentForm extends React.Component {
  static contextType = Context

  handleSubmit = e => {
    e.preventDefault()
    const content = document.getElementById('comment-input').value

    const newComment = {
      content,
      post_id: this.props.postId
    }

    PostsApiService.postComment(newComment)    
      .then(res => 
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : res.json().then(r => {
            document.querySelector('#comment-input').value = ''
            this.props.handleComment(r)
          })
      )
      .catch(err => this.context.setError(err.error))
  }

  renderLoginLinks() {
    return (
      <div className='comment-message'>
        <Link className='clickMe' to={'/login'}>Log in</Link>
        or
        <Link className='clickMe' to={'/register'}> Create an account</Link>
        to leave a comment
      </div>
    )
  }

  renderCommentForm() {
    return (
      <form
        id='comment-form'
        onSubmit={this.handleSubmit}
      >
        <label htmlFor='comment-input'>Leave a comment</label>
        <textarea 
          required
          placeholder='Leave a comment...'
          id='comment-input'
          aria-label='Type a comment...'
          rows = '4'
          cols='29'
        />
        <button className='clickMe' type='submit'>Comment</button>
      </form>
    )
  }

  render() {
    return (
      <React.Fragment>
        {
          TokenService.hasAuthToken()
          ? this.renderCommentForm()
          : this.renderLoginLinks()
        }
      </React.Fragment>
    )
  }
}

export default CommentForm