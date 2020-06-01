import React from 'react'
import Context from '../../context'
import {Link} from 'react-router-dom'
import Comments from '../../components/comments/comments'
import CommentForm from '../../components/commentForm/commentForm'
import './postPage.css'

class PostPage extends React.Component {
  static defaultProps = {
    match:{
      params: 3
    }
  }
  static contextType = Context

  state = {
    post: {},
    comments: [],
    user: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const post = this.context.posts.filter(p => p.id === parseInt(id))[0]
    const user = this.context.users.filter(u => u.id === post.user.id)[0]
    const comments = this.context.comments.filter(c => c.post_id === parseInt(id))
    this.setState({
      post,
      comments,
      user
    })
  }

  renderPost() {
    const {post, comments, user} = this.state
    return (
      <React.Fragment>
        <section>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <section className='author-container'>
            <h3>Written by</h3>
            <div className='author-info'>
              <Link to={`/user/${user.id}`}>
                <img src={user.img} alt={`${user.username}'s profile icon`} className='author-img'></img>
              </Link>
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
  
  render() {
    // const {post, comments, user} = this.state
    return (
      <React.Fragment>
        {
          !this.state.post
            ? <h2>Loading</h2>
            : this.renderPost()
        }
      </React.Fragment>
    )
  }
}

export default PostPage