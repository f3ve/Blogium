import React from 'react'
import Context from '../../context'
import PostsApiService from '../../services/posts-api-services'
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
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.context.clearError()

    PostsApiService.getPost(id)
      .then(res => this.setState({
        post: res
      }))
      .catch(err => alert(err))

    PostsApiService.getComments(id)
      .then(res => this.setState({
        comments: res
      }))
      .catch(err => this.context.setError(err))
  }

  handleComment = (comment) => {
    let comments = this.state.comments
    this.context.clearError()
    comments.push(comment)

    this.setState({
      comments: comments
    })
  }

  renderPost() {
    const {post, comments } = this.state

    const content = document.getElementById('content')
    if (content !== null) {
      content.innerHTML = post.content
    }

    if(!post.user) {
      return null
    }
    
    return (
      <React.Fragment>
        <section>
          <h2 id='title'>{post.title}</h2>
          <div id='content'></div>
          <section className='author-container'>
            <h3>Written by</h3>
            <div className='author-info'>
              <Link to={`/user/${post.user.id}`}>
                <img src={post.user.img} alt={`${post.user.username}'s profile icon`} className='author-img'></img>
              </Link>
              <p className='author-username'>{post.user.username}</p>
            </div>
            <p>{post.user.bio}</p>
          </section>
        </section>
        <section className='comment-section'>
          <h3>Comments</h3>
          <CommentForm postId={post.id} handleComment={this.handleComment}/>
          {
            this.context.error !== null
              ? <p className='error'>{this.context.error}</p>
              : null
          }
          <Comments comments={comments} />
        </section>
      </React.Fragment>
    )
  }
  
  render() {
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