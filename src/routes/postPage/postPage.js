import React from 'react'
import Context from '../../context'
import dummyStore from '../../dummy-store'
import Comments from '../../components/comments/comments'
import CommentForm from '../../components/commentForm/commentForm'
import './postPage.css'

class PostPage extends React.Component {
  static contextType = Context

  state = {
    post: {},
    comments: [],
    user: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const post = dummyStore.posts.filter(p => p.id === parseInt(id))[0]
    const user = post.user
    const comments = dummyStore.comments.filter(c => c.post_id === parseInt(id))
    this.setState({
      post,
      comments,
      user
    })
  }

  render() {
    const {post, comments, user} = this.state
    return (
      <React.Fragment>
        <section>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <section className='author-container'>
            <h3>Written by</h3>
            <div className='author-info'>
              <img src={user.img} alt={`${user.username}'s profile icon`} className='author-img'></img>
              <p className='author-username'>{user.username}</p>
            </div>
            <p>{user.bio}</p>
          </section>
        </section>
        <section className='comment-section'>
          <h3>Comments</h3>
          <CommentForm />
          <Comments comments={comments} />
        </section>
      </React.Fragment>
    )
  }
}

export default PostPage