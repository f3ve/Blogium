import React from 'react'
import Context from '../../context'
import './commentForm.css'

class CommentForm extends React.Component {
  static contextType = Context

  handleSubmit = e => {

  }

  render() {
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
}

export default CommentForm