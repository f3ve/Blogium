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

    PostsApiService.getPost(id)
      .then(res => this.setState({
        post: res
      }))
      .catch(err => console.log(err))

    PostsApiService.getComments(id)
      .then(res => this.setState({
        comments: res
      }))
      .catch(err => console.log(err))
  }

  handleComment = (comment) => {
    let comments = this.state.comments
    comments.push(comment)
    // console.log(comments)

    this.setState({
      comments: comments
    })
  }

  renderPost() {
    const {post, comments } = this.state

    if(!post.user) {
      return null
    }
    
    return (
      <React.Fragment>
        <section>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
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