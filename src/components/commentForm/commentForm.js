import React from 'react'
import Context from '../../context'
import './commentForm.css'
import PostsApiService from '../../services/posts-api-services'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'

class CommentForm extends React.Component {
  static contextType = Context

  handleSuccess() {
    this.props.handleComment()
  }

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
          : res.json().then(r => this.props.handleComment(r))
      )
  }

  renderLoginLinks() {
    return (
      <p>
        <Link to={'/login'}>Log in </Link>
        or
        <Link to={'/register'}> creant an account </Link>
        to leave a comment
      </p>
    )
  }

  renderCommentForm() {
    return (
      <form
        id='comment-form'
        onSubmit={this.handleSubmit}
      >
        <textarea 
          required
          placeholder='Leave a comment...'
          id='comment-input'
          aria-label='Type a comment...'
          rows = '4'
          cols='29'
        />
        <button className='comment-button' type='submit'>Comment</button>
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